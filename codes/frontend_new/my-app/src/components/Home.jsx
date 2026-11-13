import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './kinetic-home.css';

function Arrow({ diagonal = false }) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h15m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.5" /></svg>;
}

function SculptureFallback() {
  return <svg className="kinetic-fallback" viewBox="0 0 700 700" aria-hidden="true">
    <defs>
      <linearGradient id="metal" x1="0" x2="1" y2="1"><stop stopColor="#fff" /><stop offset=".25" stopColor="#a2a6a7" /><stop offset=".55" stopColor="#ecece8" /><stop offset=".8" stopColor="#6d7478" /><stop offset="1" stopColor="#d4d7d5" /></linearGradient>
      <radialGradient id="orange"><stop offset="0" stopColor="#7292a3" /><stop offset=".6" stopColor="#31576c" /><stop offset="1" stopColor="#142d3c" /></radialGradient>
      <filter id="soft-shadow"><feGaussianBlur stdDeviation="14" /></filter>
    </defs>
    <ellipse cx="365" cy="589" rx="159" ry="19" fill="#55564c" opacity=".12" filter="url(#soft-shadow)" />
    <g transform="translate(350 330) rotate(-32)">
      <ellipse rx="200" ry="238" fill="none" stroke="url(#metal)" strokeWidth="32" />
      <ellipse rx="220" ry="115" fill="none" stroke="#355d72" strokeWidth="17" transform="rotate(65)" />
      <circle r="116" fill="url(#orange)" />
      <path d="M-112-17h224M-106 17h212M-95 49H95M-77 78H77" fill="none" stroke="#173647" strokeWidth="4" />
      <ellipse rx="92" ry="185" fill="none" stroke="url(#metal)" strokeWidth="18" transform="rotate(-32)" />
    </g>
    <circle cx="120" cy="150" r="23" fill="#78879a" /><circle cx="570" cy="470" r="13" fill="#355d72" />
  </svg>;
}

export default function Home() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const settingsRef = useRef({ paused: false });
  const [paused, setPaused] = useState(() => typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [sceneState, setSceneState] = useState('loading');

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return undefined;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = event => setPaused(event.matches);
    preference.addEventListener('change', updatePreference);
    return () => preference.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    let disposed = false;
    import('./kinetic-scene.js').then(({ createKineticScene }) => {
      if (disposed) return;
      try {
        const scene = createKineticScene(canvasRef.current, () => setSceneState('fallback'));
        sceneRef.current = scene;
        scene.setPaused(settingsRef.current.paused);
        setSceneState('ready');
      } catch {
        setSceneState('fallback');
      }
    }).catch(() => { if (!disposed) setSceneState('fallback'); });
    return () => { disposed = true; sceneRef.current?.dispose(); sceneRef.current = null; };
  }, []);

  useEffect(() => {
    settingsRef.current = { paused };
    sceneRef.current?.setPaused(paused);
  }, [paused]);

  function handleKeys(event) {
    const rotations = { ArrowLeft: [-0.2, 0], ArrowRight: [0.2, 0], ArrowUp: [0, -0.2], ArrowDown: [0, 0.2] };
    if (rotations[event.key]) {
      event.preventDefault();
      sceneRef.current?.rotate(...rotations[event.key]);
    }
  }

  return (
    <section className="kinetic-hero" aria-labelledby="kinetic-title">
      <div className="kinetic-copy">
        <h1 id="kinetic-title">Shivam{' '}<br />Garg</h1>
        <Link className="kinetic-enter" to="/projects">Work <Arrow /></Link>
      </div>
      <div className={'kinetic-stage kinetic-stage--' + sceneState} data-scene-state={sceneState}>
        <SculptureFallback />
        <canvas ref={canvasRef} className="kinetic-canvas" role="img" aria-label={sceneState === 'fallback' ? 'Kinetic sculpture. 3D interaction is unavailable on this device.' : 'Interactive kinetic sculpture. Drag or use arrow keys to rotate.'} aria-describedby="sculpture-instructions" tabIndex={sceneState === 'ready' ? 0 : -1} onKeyDown={handleKeys} />
      </div>
      <p id="sculpture-instructions" className="sr-only">Drag or use arrow keys to rotate.</p>
      <div className="kinetic-controls" aria-label="Sculpture controls">
        <button className="kinetic-pause" type="button" aria-label={paused ? 'Play sculpture animation' : 'Pause sculpture animation'} aria-pressed={paused} disabled={sceneState !== 'ready'} onClick={() => setPaused(value => !value)}>{paused ? <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m5 3 8 5-8 5z" fill="currentColor" /></svg> : <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3v10M11 3v10" stroke="currentColor" strokeWidth="1.5" /></svg>}</button>
        {sceneState === 'fallback' && <span className="sr-only" role="status">3D unavailable</span>}
      </div>
    </section>
  );
}
