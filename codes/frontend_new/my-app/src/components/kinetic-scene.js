import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// A small procedural sculpture: no model downloads, textures, or network requests.
export function createKineticScene(canvas, onContextLost) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 701 ? 1.4 : 1.7));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
  const environment = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environmentMap = pmrem.fromScene(environment, 0.04);
  scene.environment = environmentMap.texture;
  environment.dispose();
  pmrem.dispose();

  scene.add(new THREE.HemisphereLight(0xfff9eb, 0x969d92, 0.8));
  const key = new THREE.DirectionalLight(0xfff6e6, 2);
  key.position.set(-4, 5, 6);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xd7e4ff, 1.3);
  fill.position.set(4, 1, -2);
  scene.add(fill);

  const metal = new THREE.MeshStandardMaterial({ color: 0xcbd0d0, metalness: 1, roughness: 0.22 });
  const brightMetal = new THREE.MeshStandardMaterial({ color: 0xe2e4e1, metalness: 0.94, roughness: 0.15 });
  const darkMetal = new THREE.MeshStandardMaterial({ color: 0x343a3b, metalness: 0.85, roughness: 0.32 });
  const orange = new THREE.MeshPhysicalMaterial({ color: 0x264f68, metalness: 0.4, roughness: 0.28, clearcoat: 0.4, clearcoatRoughness: 0.2 });
  const orangeDark = new THREE.MeshStandardMaterial({ color: 0x122d3d, metalness: 0.6, roughness: 0.35 });
  const blue = new THREE.MeshPhysicalMaterial({ color: 0x7c9aaf, metalness: 0.75, roughness: 0.21, clearcoat: 0.6 });

  const rig = new THREE.Group();
  scene.add(rig);
  const segments = [];

  function mesh(geometry, material, parent, position = [0, 0, 0]) {
    const object = new THREE.Mesh(geometry, material);
    object.position.set(...position);
    parent.add(object);
    return object;
  }

  function ringGeometry(outer, inner, depth, holes = 0) {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, outer, 0, Math.PI * 2, false);
    const hole = new THREE.Path();
    hole.absarc(0, 0, inner, 0, Math.PI * 2, true);
    shape.holes.push(hole);
    for (let i = 0; i < holes; i++) {
      const angle = i / holes * Math.PI * 2;
      const bore = new THREE.Path();
      const radius = (outer + inner) / 2;
      bore.absarc(Math.cos(angle) * radius, Math.sin(angle) * radius, 0.045, 0, Math.PI * 2, true);
      shape.holes.push(bore);
    }
    const geometry = new THREE.ExtrudeGeometry(shape, { depth, steps: 1, bevelEnabled: true, bevelSegments: 2, bevelSize: 0.018, bevelThickness: 0.018, curveSegments: 64 });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function segment(position, explosion) {
    const group = new THREE.Group();
    group.position.set(...position);
    rig.add(group);
    segments.push({ group, rest: new THREE.Vector3(...position), travel: new THREE.Vector3(...explosion) });
    return group;
  }

  function hub(parent, x, radius = 0.15) {
    const hub = mesh(new THREE.CylinderGeometry(radius, radius, 0.22, 32), darkMetal, parent, [x, 0, 0]);
    hub.rotation.z = Math.PI / 2;
    const cap = mesh(new THREE.CylinderGeometry(radius * 0.69, radius * 0.69, 0.235, 32), brightMetal, parent, [x, 0, 0]);
    cap.rotation.z = Math.PI / 2;
  }

  const outer = segment([0, 0, 0], [-0.25, 0.26, -0.75]);
  mesh(ringGeometry(1.98, 1.71, 0.2, 16), metal, outer);
  mesh(new THREE.TorusGeometry(1.98, 0.022, 8, 128), brightMetal, outer, [0, 0, 0.105]);
  mesh(new THREE.TorusGeometry(1.71, 0.016, 8, 128), darkMetal, outer, [0, 0, 0.105]);
  for (let i = 0; i < 48; i++) {
    const angle = i / 48 * Math.PI * 2;
    const tick = mesh(new THREE.BoxGeometry(i % 4 === 0 ? 0.075 : 0.035, 0.013, 0.008), i % 4 === 0 ? orange : darkMetal, outer, [1.845 * Math.cos(angle), 1.845 * Math.sin(angle), 0.125]);
    tick.rotation.z = angle;
  }
  hub(outer, -1.72, 0.17);
  hub(outer, 1.72, 0.17);

  const middle = segment([0, 0, 0], [0.5, 0.1, 0.55]);
  mesh(ringGeometry(1.61, 1.44, 0.16, 0), orange, middle);
  mesh(new THREE.TorusGeometry(1.605, 0.013, 8, 112), orangeDark, middle, [0, 0, 0.09]);
  hub(middle, -1.42, 0.13);
  hub(middle, 1.42, 0.13);

  const inner = segment([0, 0, 0], [-0.6, -0.2, 0.3]);
  mesh(ringGeometry(1.3, 1.15, 0.14, 8), brightMetal, inner);
  mesh(new THREE.TorusGeometry(1.3, 0.014, 8, 112), darkMetal, inner, [0, 0, -0.07]);

  const rotor = segment([0, 0, 0], [0.05, -0.08, 1.3]);
  const profile = [];
  const radius = 0.94;
  for (let i = 0; i <= 160; i++) {
    const angle = i / 160 * Math.PI;
    const y = -Math.cos(angle) * radius;
    const groove = i % 8 < 2 && i > 8 && i < 152 ? 0.035 : 0;
    profile.push(new THREE.Vector2(Math.max(0.001, Math.sin(angle) * radius - groove), y));
  }
  mesh(new THREE.LatheGeometry(profile, 96), orange, rotor);
  const spindle = mesh(new THREE.CylinderGeometry(0.085, 0.085, 2.5, 24), metal, rotor);
  spindle.rotation.z = Math.PI / 2;
  hub(rotor, -1.01, 0.21);
  hub(rotor, 1.01, 0.21);
  const equator = mesh(new THREE.TorusGeometry(0.944, 0.011, 8, 96), orangeDark, rotor);
  equator.rotation.x = Math.PI / 2;
  const north = mesh(new THREE.CylinderGeometry(0.21, 0.24, 0.09, 32), darkMetal, rotor, [0, 0.92, 0]);
  mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.095, 32), brightMetal, north);

  const satelliteGroup = new THREE.Group();
  scene.add(satelliteGroup);
  const satellites = [];
  function satellite(object, position, speed) {
    object.position.set(...position);
    satelliteGroup.add(object);
    satellites.push({ object, rest: object.position.clone(), speed });
    return object;
  }
  satellite(new THREE.Mesh(new THREE.SphereGeometry(0.23, 32, 24), blue), [-2.05, 1.87, -0.1], 0.6);
  const cube = satellite(new THREE.Mesh(new THREE.BoxGeometry(0.37, 0.37, 0.37, 2, 2, 2), metal), [-2.35, -1.13, 0.6], 0.8);
  cube.rotation.set(0.45, 0.65, 0.2);
  mesh(new THREE.BoxGeometry(0.22, 0.012, 0.012), darkMetal, cube, [0, 0, 0.19]);
  satellite(new THREE.Mesh(new THREE.SphereGeometry(0.08, 24, 16), orange), [2.1, 1.52, 0.5], 1.1);
  const coilPoints = [];
  for (let i = 0; i <= 200; i++) {
    const t = i / 200;
    const angle = t * Math.PI * 2 * 5;
    coilPoints.push(new THREE.Vector3(Math.cos(angle) * 0.16, t * 0.68 - 0.34, Math.sin(angle) * 0.16));
  }
  const coil = satellite(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(coilPoints), 200, 0.028, 8, false), brightMetal), [2.1, -1.55, 0.6], 0.7);
  coil.rotation.set(0.3, 0.1, -0.65);

  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = 128;
  shadowCanvas.height = 128;
  const shadowContext = shadowCanvas.getContext('2d');
  const gradient = shadowContext.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(55,60,43,.2)');
  gradient.addColorStop(0.45, 'rgba(55,60,43,.09)');
  gradient.addColorStop(1, 'rgba(55,60,43,0)');
  shadowContext.fillStyle = gradient;
  shadowContext.fillRect(0, 0, 128, 128);
  const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
  const shadow = mesh(new THREE.PlaneGeometry(4.3, 0.62), new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false, opacity: 0.75 }), scene, [0.15, -2.62, -1]);

  let elapsed = 0;
  let previousTime = 0;
  let frameId = 0;
  let disposed = false;
  let contextLost = false;
  let paused = false;
  let visible = !document.hidden;
  let inView = true;
  let explosion = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 0.7;
  let drag = null;
  const pointer = new THREE.Vector2();
  const targetRotation = new THREE.Vector2(0.18, -0.25);
  const rotation = targetRotation.clone();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const listeners = [];
  const listen = (target, type, fn, options) => { target.addEventListener(type, fn, options); listeners.push(() => target.removeEventListener(type, fn, options)); };

  function renderFrame(time = 0) {
    frameId = 0;
    if (disposed || contextLost || !visible || !inView) return;
    const dt = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 1 / 60;
    previousTime = time;
    if (!paused) elapsed += dt;
    const ease = 1 - Math.exp(-dt * 5);
    explosion += -explosion * (reducedMotion.matches || paused ? 1 : ease);
    rotation.lerp(targetRotation, reducedMotion.matches || paused ? 1 : ease);
    rig.rotation.set(rotation.y + (reducedMotion.matches || paused ? 0 : pointer.y * 0.055), rotation.x + (reducedMotion.matches || paused ? 0 : pointer.x * 0.09), -0.34);
    rig.position.y = Math.sin(elapsed * 0.65) * 0.09;
    outer.rotation.set(0.24 + Math.sin(elapsed * 0.17) * 0.11, -0.3, 0.02);
    middle.rotation.set(0.7 + elapsed * 0.12, 0.22, -0.36);
    inner.rotation.set(-0.55, 0.8 + elapsed * 0.15, 0.18);
    rotor.rotation.set(0.1, elapsed * 0.18, -0.23);
    for (const { group, rest, travel } of segments) group.position.copy(rest).addScaledVector(travel, explosion);
    for (const { object, rest, speed } of satellites) {
      object.position.y = rest.y + Math.sin(elapsed * speed + rest.x) * 0.09;
      object.rotation.y = elapsed * speed * 0.2;
    }
    shadow.scale.x = 1 + Math.sin(elapsed * 0.65) * 0.03;
    renderer.render(scene, camera);
    const settling = Math.abs(explosion) > 0.001 || rotation.distanceTo(targetRotation) > 0.001;
    if (!paused || settling) frameId = requestAnimationFrame(renderFrame);
  }
  function requestFrame() { if (!frameId && !disposed && !contextLost && visible && inView) frameId = requestAnimationFrame(renderFrame); }
  function resize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.position.set(0, 0.1, Math.max(9.5, 9.2 / camera.aspect));
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    requestFrame();
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  const intersectionObserver = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; if (inView) { previousTime = 0; requestFrame(); } });
  intersectionObserver.observe(canvas);

  listen(canvas, 'pointerdown', event => {
    if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
    drag = { x: event.clientX, y: event.clientY, rotation: targetRotation.clone() };
    canvas.setPointerCapture(event.pointerId);
  });
  listen(canvas, 'pointermove', event => {
    const bounds = canvas.getBoundingClientRect();
    pointer.set((event.clientX - bounds.left) / bounds.width * 2 - 1, (event.clientY - bounds.top) / bounds.height * 2 - 1);
    if (drag) {
      targetRotation.set(drag.rotation.x + (event.clientX - drag.x) * 0.008, THREE.MathUtils.clamp(drag.rotation.y + (event.clientY - drag.y) * 0.005, -1.1, 1.1));
    }
    requestFrame();
  });
  const endDrag = () => { drag = null; };
  listen(canvas, 'pointerup', endDrag);
  listen(canvas, 'pointercancel', endDrag);
  listen(canvas, 'lostpointercapture', endDrag);
  listen(canvas, 'pointerleave', () => { pointer.set(0, 0); requestFrame(); });
  listen(document, 'visibilitychange', () => { visible = !document.hidden; previousTime = 0; if (visible) requestFrame(); });
  listen(reducedMotion, 'change', requestFrame);
  listen(canvas, 'webglcontextlost', event => { event.preventDefault(); contextLost = true; cancelAnimationFrame(frameId); onContextLost(); });
  resize();
  // First render is synchronous so the static illustration never vanishes into a blank frame.
  cancelAnimationFrame(frameId);
  frameId = 0;
  renderFrame();

  return {
    setPaused(value) { paused = value; previousTime = 0; requestFrame(); },
    rotate(x, y) { targetRotation.x += x; targetRotation.y = THREE.MathUtils.clamp(targetRotation.y + y, -1.1, 1.1); requestFrame(); },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      listeners.forEach(remove => remove());
      const geometries = new Set();
      const materials = new Set();
      scene.traverse(object => {
        if (object.geometry) geometries.add(object.geometry);
        if (object.material) (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => materials.add(material));
      });
      geometries.forEach(geometry => geometry.dispose());
      materials.forEach(material => material.dispose());
      shadowTexture.dispose();
      environmentMap.dispose();
      renderer.dispose();
    },
  };
}
