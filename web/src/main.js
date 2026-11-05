import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Data Loading ──────────────────────────────────────────────────────────────

async function loadData() {
  const tables = [
    ['components', 'components'],
    ['questions', 'research_questions'],
    ['sources', 'sources'],
    ['requirements', 'requirements']
  ];
  const results = await Promise.allSettled(tables.map(async ([, filename]) => {
    const response = await fetch(`/data/${filename}.json`);
    if (!response.ok) throw new Error(`Research file returned ${response.status}`);
    const rows = await response.json();
    if (!Array.isArray(rows)) throw new Error('Research file is not a table');
    return rows;
  }));
  const data = { components: [], questions: [], sources: [], requirements: [], warnings: [] };
  for (const [index, [key]] of tables.entries()) {
    const result = results[index];
    if (result.status === 'fulfilled') {
      data[key] = result.value;
    } else {
      data.warnings.push(key);
    }
  }
  return data;
}

// ─── Three.js Geometry Functions (ported from archived renderer) ──────────────

function rounded(id, center, size, color, radius = 8, material = 'polymer') {
  const [w, h, l] = size.map(v => v / 2);
  const vertices = [];
  const faces = [];
  const n = 32;
  const rings = [[-h, .84], [-h + Math.min(2, h / 2), 1], [h - Math.min(3, h / 2), 1], [h, .87]];

  for (const [y, scale] of rings) {
    for (let corner = 0; corner < 4; corner++) {
      for (let j = 0; j < 8; j++) {
        const angle = corner * Math.PI / 2 + j / 7 * Math.PI / 2;
        const cx = (corner === 0 || corner === 3 ? 1 : -1) * (w - radius);
        const cz = (corner < 2 ? 1 : -1) * (l - radius);
        vertices.push([
          center[0] + (cx + Math.cos(angle) * radius) * scale,
          center[1] + y,
          center[2] + (cz + Math.sin(angle) * radius) * scale
        ]);
      }
    }
  }

  faces.push({ indices: Array.from({ length: n }, (_, i) => i) });
  faces.push({ indices: Array.from({ length: n }, (_, i) => i + n * 3) });
  for (let ring = 0; ring < 3; ring++) {
    for (let i = 0; i < n; i++) {
      faces.push({ indices: [ring * n + i, ring * n + (i + 1) % n, (ring + 1) * n + (i + 1) % n, (ring + 1) * n + i] });
    }
  }

  return { id, vertices, faces, color, alpha: 1, material };
}

function pathTube(id, points, radius, color, material = 'rubber') {
  const vertices = [];
  const faces = [];
  const n = 10;

  for (const p of points) {
    for (let i = 0; i < n; i++) {
      const a = i / n * Math.PI * 2;
      vertices.push([p[0] + Math.cos(a) * radius, p[1] + Math.sin(a) * radius, p[2]]);
    }
  }

  for (let j = 0; j < points.length - 1; j++) {
    for (let i = 0; i < n; i++) {
      faces.push({ indices: [j * n + i, j * n + (i + 1) % n, (j + 1) * n + (i + 1) % n, (j + 1) * n + i] });
    }
  }

  faces.push({ indices: Array.from({ length: n }, (_, i) => i) });
  faces.push({ indices: Array.from({ length: n }, (_, i) => vertices.length - n + i) });

  return { id, vertices, faces, color, material, alpha: 1 };
}

function armMesh() {
  const vertices = [];
  const faces = [];
  const n = 32;

  for (let j = 0; j <= 12; j++) {
    const z = -120 + j * 20;
    const t = j / 12;
    const rx = 30 + 10 * Math.sin(t * Math.PI * .8);
    const ry = 25 + 4 * Math.sin(t * Math.PI);
    for (let i = 0; i < n; i++) {
      const a = i / n * Math.PI * 2;
      vertices.push([Math.cos(a) * rx, -13 + Math.sin(a) * ry, z]);
    }
  }

  for (let j = 0; j < 12; j++) {
    for (let i = 0; i < n; i++) {
      faces.push({ indices: [j * n + i, j * n + (i + 1) % n, (j + 1) * n + (i + 1) % n, (j + 1) * n + i] });
    }
  }

  faces.push({ indices: Array.from({ length: n }, (_, i) => i) });
  faces.push({ indices: Array.from({ length: n }, (_, i) => 12 * n + i) });

  return { id: 'arm', vertices, faces, color: '#bd927e', alpha: 1, material: 'skin' };
}

function box(id, center, size, color, bevel = 3, alpha = 1) {
  const [w, h, l] = size.map(v => v / 2);
  const b = Math.min(bevel, w, l);
  const ring = [[-w + b, -l], [w - b, -l], [w, -l + b], [w, l - b], [w - b, l], [-w + b, l], [-w, l - b], [-w, -l + b]];
  const vertices = [-h, h].flatMap(y => ring.map(([x, z]) => [x + center[0], y + center[1], z + center[2]]));
  const faces = [
    { indices: [7, 6, 5, 4, 3, 2, 1, 0], shade: .65 },
    { indices: [8, 9, 10, 11, 12, 13, 14, 15], shade: 1.14 }
  ];
  for (let i = 0; i < 8; i++) {
    faces.push({ indices: [i, (i + 1) % 8, (i + 1) % 8 + 8, i + 8], shade: .72 + (i % 4) * .1 });
  }
  return { id, vertices, faces, color, alpha, material: 'matte' };
}

// ─── Scene Building ────────────────────────────────────────────────────────────

function buildDeviceMeshes(view = null) {
  const meshes = [];
  const e = view ? view.explode : 0;

  // Housing (main body with rounded edges)
  if (!view || view.layers.housing) {
    meshes.push(rounded('housing', [0, 10 + e * 46, 0], [56, 19, 150], '#5d6972', 12));
    meshes.push(rounded('housing', [0, 1 + e * 46, 0], [55, 2, 148], '#a4b5b9', 11, 'metal'));
    meshes.push(rounded('housing', [0, 20 + e * 46, 9], [34, 3, 84], '#27353d', 10, 'rubber'));

    // Grip texture lines
    for (let i = 0; i < 10; i++) {
      meshes.push(rounded('housing', [0, 22 + e * 46, -17 + i * 5], [26, .65, 1.2], '#42525a', .5, 'rubber'));
    }

    // Status display and indicator lights
    meshes.push(rounded('housing', [0, 21 + e * 46, -45], [24, 1.5, 17], '#152b31', 5, 'glass'));
    meshes.push(rounded('housing', [-7, 22 + e * 46, -45], [7, 1, 4], '#80cfba', 1, 'light'));
    meshes.push(rounded('housing', [7, 22 + e * 46, -45], [5, 1, 4], '#c8742b', 1, 'light'));

    // Corner screws
    for (const x of [-20, 20]) {
      for (const z of [-57, 57]) {
        meshes.push(rounded('housing', [x, 18 + e * 46, z], [4, 1, 4], '#b4bec0', 1.9, 'metal'));
      }
    }

    // Cable connector
    meshes.push(rounded('housing', [0, 8 + e * 46, -77], [18, 11, 9], '#26383e', 4, 'rubber'));
  }

  // Electronics (internal)
  if (!view || view.layers.electronics) {
    meshes.push(box('electronics', [0, 0 + e * 17, 8], [42, 3, 100], '#708d70', 3));
    for (let i = 0; i < 5; i++) {
      meshes.push(box('electronics', [-10 + i * 5, 3 + e * 17, 20], [3, 2, 20], '#c4b99a', 0));
    }
    meshes.push(box('electronics', [0, 4 + e * 17, -13], [18, 5, 23], '#344441', 1));
  }

  // Ultrasound cartridge
  if (!view || view.layers.sensor) {
    meshes.push(box('sensor', [0, -10 - e * 15, -15], [33, 8, 88], '#81aab0', 2));
    meshes.push(rounded('sensor', [0, -14 - e * 15, -15], [35, 2, 90], '#314c59', 3, 'glass'));
    for (let i = 0; i < 16; i++) {
      meshes.push(box('sensor', [0, -14.5 - e * 15, -55 + i * 5], [31, .6, 1.5], '#c3d4d0', 0));
    }
  }

  // Photoacoustic rails (two sides)
  if (!view || view.layers.optics) {
    for (const x of [-23, 23]) {
      meshes.push(box('optics', [x, -6 - e * 40, -10], [6, 7, 110], '#c8742b', 2));
      for (let i = 0; i < 9; i++) {
        meshes.push(box('optics', [x, -10 - e * 40, -52 + i * 11], [4, 1, 5], '#efc695', .5));
      }
    }
  }

  // Passive contact shoe (open design)
  if (!view || view.layers.coupling) {
    for (const x of [-24, 24]) {
      meshes.push(box('coupling', [x, -20 - e * 63, -10], [8, 6, 117], '#a1b7a5', 3));
    }
    meshes.push(box('coupling', [0, -20 - e * 63, 48], [48, 6, 9], '#a1b7a5', 2));
  }

  return meshes;
}

function buildDemoScene(demoTime = 0) {
  const meshes = [];
  const t = Math.min(30, Math.max(0, demoTime));
  const stage = t < 6 ? 0 : t < 15 ? 1 : t < 23 ? 2 : 3;

  // Field mat and bench unit
  meshes.push(rounded('field-mat', [0, -46, 0], [118, 5, 278], '#495c56', 12, 'rubber'));
  for (const x of [-52, 52]) {
    meshes.push(box('field-mat', [x, -42, 0], [2, 1, 245], '#89918a', 0));
  }

  // Bench unit at far end
  meshes.push(rounded('bench', [62, -38, -62], [28, 18, 38], '#7d8b8e', 4, 'metal'));
  meshes.push(box('bench-screen', [62, -28, -60], [20, 12, 1], '#1a2529', 0));

  // Synthetic forearm
  meshes.push(armMesh());

  // Device approaches arm during setup stage
  const setupLift = stage === 0 ? (1 - Math.min(1, t / 5)) * 22 : 0;
  const probeView = { explode: 0, layers: { housing: true, sensor: true, optics: true, coupling: true, electronics: true } };
  for (const mesh of buildDeviceMeshes(probeView).filter(m => m.id !== 'bench')) {
    // Scale down and position on arm
    const scaled = { ...mesh, vertices: mesh.vertices.map(p => [p[0] * .46, p[1] * .46 + 27 + setupLift, p[2] * .46 - 35]) };
    meshes.push(scaled);
  }

  // Tether to bench unit
  const cable = [[0, 30.68 + setupLift, -70.42], [5, 35 + setupLift, -128], [98, -15, -128], [76, -34, -62]];
  const points = Array.from({ length: 33 }, (_, i) => {
    const tt = i / 32;
    return [0, 1, 2].map(axis => (1 - tt) ** 3 * cable[0][axis] + 3 * (1 - tt) ** 2 * tt * cable[1][axis] + 3 * (1 - tt) * tt ** 2 * cable[2][axis] + tt ** 3 * cable[3][axis]);
  });
  meshes.push(pathTube('tether', points, 1.5, '#303c40'));

  // Scan plane during acquisition (moves across arm)
  if (stage >= 1 && stage < 3) {
    const sweepPos = -96 + Math.min(1, (t - 6) / 8) * 192;
    meshes.push({ ...box('scan-plane', [0, 8, sweepPos], [58, 37, 1], '#6dc5c6', 0, .24), material: 'light' });
  }

  // Vessel map appears during mapping stage
  if (stage >= 2) {
    const length = Math.min(1, (t - 15) / 6) * 200;
    const vessel = Array.from({ length: 28 }, (_, i) => {
      const z = -96 + length * i / 27;
      return [Math.sin(z / 47) * 6, 18.5, z];
    });
    meshes.push(pathTube('mapped-vessel', vessel, 2.5, '#63c8cf', 'light'));

    // Branching vessel appears later in mapping
    if (Math.min(1, (t - 15) / 6) > .42) {
      const branch = Array.from({ length: 15 }, (_, i) => {
        const tt = i / 14;
        return [tt * 22, 18, -15 + tt * 70];
      });
      meshes.push(pathTube('mapped-vessel', branch, 1.7, '#63c8cf', 'light'));
    }

    // Uncertainty segments during clinician review stage
    if (stage === 3) {
      for (let i = 0; i < 6; i++) {
        meshes.push(pathTube('uncertainty', [[16, 19, 47 + i * 7], [17, 19, 50 + i * 7]], 1.2, '#e5b377', 'light'));
      }
    }
  }

  return meshes;
}

// ─── Three.js Scene Setup (Single Canvas) ──────────────────────────────────────

let scene, camera, renderer;
let currentScene = 'reveal';
let deviceGroup, demoGroup;
let stageVisible = true;
let lastDemoFrame = -1;

function initThree() {
  const canvas = document.getElementById('three-canvas');

  // Check WebGL support
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch (e) {
    console.error('WebGL not supported:', e);
    showFallback();
    return false;
  }

  // Set size and cap DPR for performance
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);
  renderer.setSize(window.innerWidth, window.innerHeight, false);

  scene = new THREE.Scene();

  // Elevated isometric camera with aspect-aware distance (portrait gets more room)
  const aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 2000);

  // Balanced three-point lighting
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
  keyLight.position.set(100, 150, 100);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xc8d4e0, 0.6);
  fillLight.position.set(-100, 50, -50);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xf5f0e8, 0.4);
  rimLight.position.set(0, -50, -150);
  scene.add(rimLight);

  scene.add(new THREE.AmbientLight(0x607080, 0.5));

  // Build initial device with named component groups
  deviceGroup = new THREE.Group();
  const componentGroups = {};
  ['housing', 'sensor', 'optics', 'coupling', 'electronics'].forEach(id => {
    componentGroups[id] = new THREE.Group();
    componentGroups[id].name = id;
    deviceGroup.add(componentGroups[id]);
  });

  for (const mesh of buildDeviceMeshes()) {
    const geo = createGeometryFromMesh(mesh);
    const mat = materialFor(mesh);
    const obj = new THREE.Mesh(geo, mat);
    if (componentGroups[mesh.id]) {
      componentGroups[mesh.id].add(obj);
    } else {
      deviceGroup.add(obj);
    }
  }
  scene.add(deviceGroup);

  // Store component groups for scroll animations
  window.componentGroups = componentGroups;

  // Handle resize
  window.addEventListener('resize', onResize);

  return true;
}

function createGeometryFromMesh(mesh) {
  // Convert mesh vertices/faces to Three.js BufferGeometry
  const positions = [];
  for (const v of mesh.vertices) {
    positions.push(v[0], v[1], v[2]);
  }

  const indices = [];
  for (const face of mesh.faces) {
    if (face.indices.length === 3) {
      indices.push(...face.indices);
    } else if (face.indices.length >= 4) {
      // Triangulate quads and larger polygons
      for (let i = 1; i < face.indices.length - 1; i++) {
        indices.push(face.indices[0], face.indices[i], face.indices[i + 1]);
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  if (indices.length > 0) {
    geometry.setIndex(indices);
  }
  geometry.computeVertexNormals();
  return geometry;
}

function onResize() {
  if (!renderer) return;
  const height = window.innerWidth <= 768 ? Math.max(window.innerHeight * .5, 288) : window.innerHeight;
  camera.aspect = window.innerWidth / height;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, height, false);
  renderer.domElement.style.height = `${height}px`;
  applyScrollState();
}

// Render only when scroll, viewport, or visibility changes.

function animate() {
  if (renderer && stageVisible && !document.hidden) {
    renderer.render(scene, camera);
    renderer.domElement.dataset.geometries = String(renderer.info.memory.geometries);
  }
}

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) applyScrollState();
});

function showFallback() {
  const fallback = document.createElement('div');
  fallback.className = 'webgl-fallback';
  // Static SVG device illustration as meaningful fallback
  fallback.innerHTML = `
    <svg width="300" height="150" viewBox="0 0 300 150">
      <rect x="25" y="40" width="250" height="70" rx="15" fill="#5d6972"/>
      <rect x="30" y="85" width="240" height="15" rx="5" fill="#a4b5b9"/>
      <circle cx="120" cy="65" r="5" fill="#80cfba"/>
      <circle cx="135" cy="65" r="5" fill="#c8742b"/>
    </svg>
    <p>WebGL not available. Showing static device illustration.</p>
  `;
  document.getElementById('device-reveal').appendChild(fallback);
}

// ─── Scroll-Driven Scene Transitions ──────────────────────────────────────────

const demoProgress = { value: 0 };

function switchToScene(sceneName) {
  if (currentScene === sceneName) return;

  // Remove previous transient demo group without disposing persistent deviceGroup
  if (demoGroup && scene.children.includes(demoGroup)) {
    disposeObject(demoGroup);
    scene.remove(demoGroup);
    demoGroup = null;
  }

  currentScene = sceneName;
  lastDemoFrame = -1;

  if (sceneName === 'reveal' || sceneName === 'explode') {
    // Add persistent device group back to scene (don't dispose it)
    if (!scene.children.includes(deviceGroup)) {
      scene.add(deviceGroup);
    }
  } else if (sceneName === 'demo') {
    // Remove device group from view but keep alive for later reuse
    if (scene.children.includes(deviceGroup)) {
      scene.remove(deviceGroup);
    }
    demoGroup = new THREE.Group();
    scene.add(demoGroup);
  }
}

function materialFor(mesh) {
  const opacity = mesh.alpha ?? 1;
  return new THREE.MeshStandardMaterial({
    color: mesh.color,
    roughness: mesh.material === 'metal' ? .32 : .62,
    metalness: mesh.material === 'metal' ? .4 : .05,
    side: THREE.DoubleSide,
    transparent: opacity < 1,
    opacity,
    depthWrite: opacity === 1,
    ...(mesh.material === 'light' ? { emissive: mesh.color, emissiveIntensity: .5 } : {})
  });
}

function disposeObject(obj) {
  if (!obj) return;
  // Dispose geometry and materials for meshes
  if (obj.geometry) obj.geometry.dispose();
  if (obj.material) {
    if (Array.isArray(obj.material)) {
      obj.material.forEach(m => m && m.dispose());
    } else {
      obj.material.dispose();
    }
  }
  // Recursively dispose children for groups
  if (obj.children) {
    while (obj.children.length > 0) {
      const child = obj.children[0];
      obj.remove(child);
      disposeObject(child);
    }
  }
}

function rebuildDemoScene() {
  // Clear previous demo objects
  while (demoGroup.children.length > 0) {
    const child = demoGroup.children[0];
    demoGroup.remove(child);
    disposeObject(child);
  }

  // Build new demo scene at current progress
  const demoMeshes = buildDemoScene(demoProgress.value * 30);
  for (const mesh of demoMeshes) {
    const geo = createGeometryFromMesh(mesh);
    const mat = materialFor(mesh);
    const obj = new THREE.Mesh(geo, mat);
    demoGroup.add(obj);
  }
}

const clamp01 = value => Math.max(0, Math.min(1, value));
const smooth = value => { const p = clamp01(value); return p * p * (3 - 2 * p); };

function frameActiveScene() {
  const mobile = window.innerWidth <= 768;
  const group = currentScene === 'demo' ? demoGroup : deviceGroup;
  const sphere = new THREE.Box3().setFromObject(group).getBoundingSphere(new THREE.Sphere());
  const availableAspect = camera.aspect * (mobile ? .88 : .48);
  const halfFov = camera.fov * Math.PI / 360;
  const limitingAngle = Math.min(halfFov, Math.atan(Math.tan(halfFov) * availableAspect));
  const distance = sphere.radius / Math.sin(limitingAngle) * 1.1;
  const direction = new THREE.Vector3(1.05, 1.05, 1.3).normalize();
  camera.position.copy(sphere.center).addScaledVector(direction, distance);
  camera.lookAt(sphere.center);
  const width = window.innerWidth;
  const height = mobile ? Math.max(window.innerHeight * .5, 288) : window.innerHeight;
  // Keep the model beside the narrative, or above it on a narrow screen.
  const horizontalCenter = mobile ? .5 : currentScene === 'explode' ? .28 : .70;
  camera.setViewOffset(width, height, width * (.5 - horizontalCenter), 0, width, height);
  camera.updateProjectionMatrix();
}

function applyScrollState() {
  if (!renderer || !deviceGroup) return;
  const exploded = document.getElementById('exploded-anatomy');
  const demo = document.getElementById('onbody-demo');
  const height = window.innerHeight;
  const y = window.scrollY;
  const explodeStart = exploded.offsetTop - height * .5;
  const demoStart = demo.offsetTop - (window.innerWidth <= 768 ? 0 : height * .5);
  const demoEnd = demo.offsetTop + demo.offsetHeight - height * .8;
  stageVisible = y < demo.offsetTop + demo.offsetHeight - height * .25;
  renderer.domElement.style.display = stageVisible ? 'block' : 'none';
  const nextScene = y >= demoStart ? 'demo' : y >= explodeStart ? 'explode' : 'reveal';
  switchToScene(nextScene);
  let explosion = clamp01((y - explodeStart) / Math.min(height * .9, (demoStart - explodeStart) * .5));
  if (prefersReducedMotion) explosion = explosion >= .5 ? 1 : 0;
  const offsets = {
    housing: [0, 46, 0], electronics: [0, 17, 0], sensor: [0, -15, 0],
    optics: [0, -40, 0], coupling: [0, -63, 0]
  };
  Object.entries(offsets).forEach(([id, offset], index) => {
    const partProgress = prefersReducedMotion ? explosion : smooth((explosion - index * .07) / .72);
    window.componentGroups[id].position.fromArray(offset).multiplyScalar(partProgress);
  });
  deviceGroup.rotation.set(0, 0, 0);
  if (nextScene === 'demo') {
    let progress = clamp01((y - demoStart) / Math.max(1, demoEnd - demoStart));
    if (prefersReducedMotion) progress = progress < .2 ? 0 : progress < .5 ? .3 : progress < 23 / 30 ? .64 : .9;
    const frame = Math.round(progress * 180);
    if (frame !== lastDemoFrame) {
      demoProgress.value = frame / 180;
      rebuildDemoScene();
      lastDemoFrame = frame;
    }
    updateStageIndicator(demoProgress.value * 30);
  } else {
    updateStageIndicator(0);
  }
  renderer.domElement.dataset.scene = nextScene;
  renderer.domElement.dataset.progress = nextScene === 'demo' ? demoProgress.value.toFixed(3) : explosion.toFixed(3);
  renderer.domElement.dataset.parts = String(deviceGroup.children.filter(part => part.position.length() > 0).length);
  if (stageVisible) {
    frameActiveScene();
    animate();
  }
}

function setupScrollAnimations() {
  // A single controller owns scene state in both scroll directions.
  ScrollTrigger.create({
    trigger: '#device-reveal',
    start: 'top top',
    end: () => document.documentElement.scrollHeight,
    onUpdate: applyScrollState,
    onRefresh: applyScrollState
  });
  onResize();
}

// ─── UI Population ─────────────────────────────────────────────────────────────

const STAGES = [
  { id: 'setup', label: 'Setup', desc: 'Illustrative probe placement on a synthetic forearm' },
  { id: 'acquisition', label: 'Acquisition', desc: 'Simulated sweep illustrates proposed acquisition' },
  { id: 'map', label: 'Map', desc: 'Synthetic vessel paths appear; no measured scan data' },
  { id: 'review', label: 'Clinician Review', desc: 'Proposed expert review of uncertainty; no treatment decision' }
];

function populateStageIndicator() {
  const container = document.getElementById('stage-indicator');
  if (!container) return;

  STAGES.forEach((stage, i) => {
    const item = document.createElement('button');
    item.className = 'stage-item';
    item.type = 'button';
    item.id = `stage-${stage.id}`;
    item.innerHTML = `<span class="stage-dot"></span><strong>${i + 1}. ${stage.label}</strong><span class="stage-desc"> — ${stage.desc}</span>`;
    item.addEventListener('click', () => jumpToDemoStage(i));
    container.appendChild(item);
  });
  updateStageIndicator(0);
}

function jumpToDemoStage(index) {
  const section = document.getElementById('onbody-demo');
  const start = section.offsetTop - (window.innerWidth <= 768 ? 0 : window.innerHeight * .5);
  const end = section.offsetTop + section.offsetHeight - window.innerHeight * .8;
  window.scrollTo({ top: start + (end - start) * [.1, .32, .64, .9][index], behavior: 'instant' });
  if (!renderer) updateStageIndicator([3, 9.6, 19.2, 27][index]);
  applyScrollState();
}

function updateStageIndicator(demoTime) {
  const stageIndex = demoTime < 6 ? 0 : demoTime < 15 ? 1 : demoTime < 23 ? 2 : 3;

  STAGES.forEach((stage, i) => {
    const el = document.getElementById(`stage-${stage.id}`);
    if (el) {
      el.classList.toggle('active', i === stageIndex);
      el.classList.toggle('completed', i < stageIndex);
      if (i === stageIndex) el.setAttribute('aria-current', 'step');
      else el.removeAttribute('aria-current');
    }
  });
}

function populateComponents(components) {
  const container = document.getElementById('component-list');
  components.forEach(comp => {
    const item = document.createElement('div');
    item.className = 'component-item';
    item.innerHTML = `
      <h3>${comp.number} ${comp.name}</h3>
      <p class="purpose">${comp.purpose}</p>
      <p class="maturity">Maturity: ${comp.maturity}</p>
      <details>
        <summary>Interface &amp; Test</summary>
        <p><strong>Interface:</strong> ${comp.interface}</p>
        <p><strong>Required test:</strong> ${comp.test}</p>
      </details>
    `;
    container.appendChild(item);
  });
}

function populateRequirements(requirements) {
  const container = document.getElementById('requirements-list');
  requirements.forEach(req => {
    const item = document.createElement('div');
    item.className = 'requirement-item';
    item.innerHTML = `
      <h4>${req.item}</h4>
      <p class="target">Target: ${req.target}</p>
      <p class="meaning">${req.meaning}</p>
      <details>
        <summary>Verification</summary>
        <p>${req.verify}</p>
      </details>
    `;
    container.appendChild(item);
  });
}

function populateQuestions(questions) {
  const container = document.getElementById('research-questions');
  questions.forEach(q => {
    const item = document.createElement('div');
    item.className = 'question-item';
    item.innerHTML = `
      <h3>${q.number} ${q.title}</h3>
      <p class="stage">Stage: ${q.stage}</p>
      <p class="maturity">Open research question · Unverified</p>
      <p>${q.prompt}</p>
      <details>
        <summary>Evidence gate</summary>
        <p>${q.gate}</p>
      </details>
    `;
    container.appendChild(item);
  });
}

function populateSources(sources) {
  const container = document.getElementById('sources-list');
  sources.forEach(src => {
    const item = document.createElement('div');
    item.className = 'source-item';

    // Field-aware rendering: evidence sources vs organization references
    let metaLine;
    if (src.setting && src.year) {
      // Evidence source with setting/year
      metaLine = `<p class="setting">${src.setting} · ${src.year}</p>`;
    } else if (src.access) {
      // Organization reference with access/limit
      metaLine = `<p class="setting">Access: ${src.access}</p>`;
    } else {
      metaLine = '';
    }

    let detailsHtml = '<details><summary>Details</summary>';
    if (src.supports) {
      detailsHtml += `<p><strong>Supports:</strong> ${src.supports}</p>`;
    }
    if (src.limits) {
      detailsHtml += `<p><strong>Limits:</strong> ${src.limits}</p>`;
    }
    if (src.limit) {
      detailsHtml += `<p><strong>Limit:</strong> ${src.limit}</p>`;
    }
    if (src.url) {
      detailsHtml += `<p><a href="${src.url}" target="_blank" rel="noopener">Read source ${src.id} (opens new tab)</a></p>`;
    }
    detailsHtml += '</details>';

    item.innerHTML = `
      <h3>${src.id}: ${src.title}</h3>
      ${metaLine}
      ${detailsHtml}
    `;
    container.appendChild(item);
  });
}

function populatePDFLinks() {
  const container = document.getElementById('pdf-links');
  const decks = [
    { name: 'Main Pitch Deck (v2)', file: 'VASCOUT-Pitch-Deck-v2-20261020.pdf' },
    { name: 'University of Michigan', file: 'VASCOUT-michigan-Research-Deck-v1-20261020.pdf' },
    { name: 'MTEC', file: 'VASCOUT-mtec-Research-Deck-v1-20261020.pdf' },
    { name: 'Cyberdyne', file: 'VASCOUT-cyberdyne-Research-Deck-v1-20261020.pdf' },
    { name: 'SonoSite', file: 'VASCOUT-sonosite-Research-Deck-v1-20261020.pdf' },
    { name: 'US Army ISR', file: 'VASCOUT-usaisr-Research-Deck-v1-20261020.pdf' },
    { name: 'Teleflex', file: 'VASCOUT-teleflex-Research-Deck-v1-20261020.pdf' },
    { name: 'Verasonics', file: 'VASCOUT-verasonics-Research-Deck-v1-20261020.pdf' },
    { name: 'BD', file: 'VASCOUT-bd-Research-Deck-v1-20261020.pdf' }
  ];

  decks.forEach(deck => {
    const link = document.createElement('a');
    link.href = `/assets/decks/${deck.file}`;
    link.className = 'pdf-link';
    link.textContent = `${deck.name} · Draft PDF`;
    container.appendChild(link);
  });
}

// ─── Entry Overlay with Keyboard Focus ────────────────────────────────────────

let prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
  prefersReducedMotion = e.matches;
  applyScrollState();
});

function setupEntry() {
  const overlay = document.getElementById('entry-overlay');
  const enterBtn = document.getElementById('enter-btn');

  function enterSite() {
    if (enterBtn.disabled) return;
    enterBtn.disabled = true;
    if (prefersReducedMotion) {
      // Instant transition for reduced motion
      overlay.style.display = 'none';
      document.body.classList.add('entered');
      const mainEl = document.getElementById('scroll-container');
      if (mainEl) mainEl.removeAttribute('inert');
      focusFirstHeading();
    } else {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
          overlay.style.display = 'none';
          document.body.classList.add('entered');
          const mainEl = document.getElementById('scroll-container');
          if (mainEl) mainEl.removeAttribute('inert');
          focusFirstHeading();
        }
      });
    }
  }

  function focusFirstHeading() {
    const firstHeading = document.querySelector('#device-reveal h2');
    if (firstHeading) {
      firstHeading.setAttribute('tabindex', '-1');
      firstHeading.focus({ preventScroll: true });
    }
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }

  enterBtn.addEventListener('click', enterSite);
  document.querySelector('.chapter-nav a[href="#onbody-demo"]').addEventListener('click', event => {
    event.preventDefault();
    jumpToDemoStage(0);
  });
  enterBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      enterSite();
    }
  });
}

// ─── Loading State ─────────────────────────────────────────────────────────────

function showLoading() {
  const loader = document.getElementById('loading');
  if (loader) loader.hidden = false;
  const notice = document.getElementById('data-notice');
  if (notice) {
    notice.hidden = false;
    notice.textContent = 'Loading research details…';
  }
}

function hideLoading() {
  const loader = document.getElementById('loading');
  if (loader) loader.hidden = true;
  const notice = document.getElementById('data-notice');
  if (notice) notice.hidden = true;
}

function showDataWarning(message) {
  for (const id of ['data-notice', 'error-state']) {
    const element = document.getElementById(id);
    if (!element) continue;
    element.hidden = false;
    element.textContent = message;
    const reload = document.createElement('a');
    reload.href = location.pathname;
    reload.textContent = 'Reload';
    element.append(' ', reload);
  }
}

// ─── Main Initialization ──────────────────────────────────────────────────────

async function init() {
  setupEntry();
  showLoading();

  try {
    const data = await loadData();

    // Populate UI with data
    populateComponents(data.components);
    populateRequirements(data.requirements);
    populateQuestions(data.questions);
    populateSources(data.sources);
    populatePDFLinks();
    populateStageIndicator();

    hideLoading();
    if (data.warnings.length) {
      showDataWarning(`Some research details are unavailable (${data.warnings.join(', ')}). Other sections remain available.`);
    }

    // Measure scroll chapters after their content has its natural height.
    const threeOk = initThree();
    if (threeOk) {
      setupScrollAnimations();
    }

    // Refresh ScrollTrigger after all content is populated
    ScrollTrigger.refresh();

  } catch (e) {
    console.error('Initialization failed:', e);
    hideLoading();
    showDataWarning('The visual experience could not finish loading. You can still explore the available research details.');
  }
}

document.addEventListener('toggle', () => ScrollTrigger.refresh(), true);
init().catch(console.error);
