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
      <radialGradient id="orange"><stop offset="0" stopColor="#ff9b58" /><stop offset=".6" stopColor="#f76826" /><stop offset="1" stopColor="#b7340a" /></radialGradient>
      <filter id="soft-shadow"><feGaussianBlur stdDeviation="14" /></filter>
    </defs>
    <ellipse cx="365" cy="589" rx="159" ry="19" fill="#55564c" opacity=".12" filter="url(#soft-shadow)" />
    <g transform="translate(350 330) rotate(-32)">
      <ellipse rx="200" ry="238" fill="none" stroke="url(#metal)" strokeWidth="32" />
      <ellipse rx="220" ry="115" fill="none" stroke="#eb6226" strokeWidth="17" transform="rotate(65)" />
      <circle r="116" fill="url(#orange)" />
      <path d="M-112-17h224M-106 17h212M-95 49H95M-77 78H77" fill="none" stroke="#9d320e" strokeWidth="4" />
      <ellipse rx="92" ry="185" fill="none" stroke="url(#metal)" strokeWidth="18" transform="rotate(-32)" />
    </g>
    <circle cx="120" cy="150" r="23" fill="#78879a" /><circle cx="570" cy="470" r="13" fill="#e46e37" />
  </svg>;
}

export default function Home() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const settingsRef = useRef({ exploded: false, paused: false });
  const [exploded, setExploded] = useState(false);
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
        scene.setExploded(settingsRef.current.exploded);
        scene.setPaused(settingsRef.current.paused);
        setSceneState('ready');
      } catch {
        setSceneState('fallback');
      }
    }).catch(() => { if (!disposed) setSceneState('fallback'); });
    return () => { disposed = true; sceneRef.current?.dispose(); sceneRef.current = null; };
  }, []);

  useEffect(() => {
    settingsRef.current = { exploded, paused };
    sceneRef.current?.setExploded(exploded);
    sceneRef.current?.setPaused(paused);
  }, [exploded, paused]);

  function handleKeys(event) {
    const rotations = { ArrowLeft: [-0.2, 0], ArrowRight: [0.2, 0], ArrowUp: [0, -0.2], ArrowDown: [0, 0.2] };
    if (rotations[event.key]) {
      event.preventDefault();
      sceneRef.current?.rotate(...rotations[event.key]);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setExploded(value => !value);
    }
  }

  return (
    <div className="kinetic-home">
      <section className="kinetic-hero" aria-labelledby="kinetic-title">
        <div className="kinetic-copy">
          <p className="kinetic-eyebrow"><span /> ENGINEER. RESEARCHER. BUILDER.</p>
          <h1 id="kinetic-title">Ideas in{' '}<br /><span>motion.</span><i aria-hidden="true">*</i></h1>
          <Link className="kinetic-enter" to="/projects"><span>Explore my work</span><span className="kinetic-enter-arrow"><Arrow /></span></Link>
        </div>
        <div className={`kinetic-stage kinetic-stage--${sceneState}`} data-scene-state={sceneState}>
          <div className="kinetic-orbit" aria-hidden="true" />
          <SculptureFallback />
          <canvas ref={canvasRef} className="kinetic-canvas" role="img" aria-label={sceneState === 'fallback' ? 'Orange and chrome kinetic sculpture. 3D interaction is unavailable on this device.' : 'Interactive orange and chrome kinetic sculpture. Drag or use arrow keys to rotate. Press Enter to pull it apart.'} aria-describedby="sculpture-instructions" tabIndex={sceneState === 'ready' ? 0 : -1} onKeyDown={handleKeys} />
          <span className="kinetic-coordinate kinetic-coordinate--top" aria-hidden="true">FIG. 001 — CURIOSITY</span>
          <span className="kinetic-coordinate kinetic-coordinate--bottom" aria-hidden="true">↗&nbsp; BUILT TO BE PLAYED WITH</span>
        </div>
        <div className="kinetic-playbar">
          <span className="kinetic-play-hint" id="sculpture-instructions"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m8 12 2-7c.5-1.7 2.7-1.1 2.4.5l-1 5.5 3-.5c2-.3 3.5 1.2 3.1 3l-1 5c-.3 1.5-1.7 2.5-3.2 2.5h-2.2c-1 0-2-.5-2.6-1.3l-4-5.1c-.8-1 .5-2.5 1.6-1.7L8 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg><span>Go on, give it a spin.</span></span>
          <div className="kinetic-controls" aria-label="Sculpture controls">
            <button className="kinetic-explode" type="button" aria-pressed={exploded} disabled={sceneState !== 'ready'} onClick={() => setExploded(value => !value)}><span aria-hidden="true">{exploded ? '↙' : '↗'}</span>{exploded ? 'Bring it together' : 'Pull it apart'}</button>
            <button className="kinetic-pause" type="button" aria-label={paused ? 'Play sculpture animation' : 'Pause sculpture animation'} aria-pressed={paused} disabled={sceneState !== 'ready'} onClick={() => setPaused(value => !value)}>{paused ? <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m5 3 8 5-8 5z" fill="currentColor" /></svg> : <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3v10M11 3v10" stroke="currentColor" strokeWidth="1.5" /></svg>}</button>
          </div>
          {sceneState === 'fallback' && <span className="kinetic-scene-note" role="status">Still curious? Explore the work.</span>}
        </div>
      </section>
      <footer className="kinetic-footer">
        <span className="kinetic-location"><span aria-hidden="true">⌖</span> Urbana, Illinois <span className="kinetic-footer-muted">/ Earth</span></span>
        <span className="kinetic-footer-center">A small window into my world.</span>
        <Link to="/contact">Have something in mind? <Arrow diagonal /></Link>
      </footer>
    </div>
  );
}
