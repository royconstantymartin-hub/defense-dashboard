import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { ArrowRight, X } from "lucide-react";

/**
 * BattlespaceTheater — "Vision 1" of the Products page.
 * ---------------------------------------------------------------------------
 * A real-time WebGL 3D "theater of operations": a smooth relief-terrain block
 * floating in a teal ocean slab, with 3D military models for six macro domains
 * (Land, Maritime, Air, Space, Strike, Cyber/C2) tied together by glowing
 * tactical data-link beams. Drag to orbit; click a domain to dive the camera in
 * and open a panel that drills domain → type → the real products from the DB.
 *
 * Props:
 *   products       array of product objects (real catalogue data)
 *   onOpenProduct  (product) => void  — open the existing product detail modal
 *   onExploreCatalog (categoryOrNull) => void — jump to the classic catalogue
 */

// Domain metadata. `categories` maps each macro domain to the product
// categories it owns, so every product stays reachable (radar folds into Cyber).
const DOMAIN_META = [
  { key: "space",  name: "Space",       color: "#8b90ff", categories: ["space"],           model: "sat",   pos: [-6, 4.8, 1.5],  role: "Orbital reconnaissance, navigation, early-warning and secure communications — the backbone every other domain relies on." },
  { key: "air",    name: "Air Power",   color: "#5aa2ff", categories: ["aircraft"],        model: "jet",   pos: [2.5, 4.4, -3],  role: "Air superiority, deep strike, mobility and airborne ISR — speed and reach across the whole theater." },
  { key: "naval",  name: "Maritime",    color: "#33d6c8", categories: ["naval"],           model: "ship",  pos: [7.5, 0, 4.5], onSea: true,  role: "Sea control and power projection — a mobile base carrying air power, missiles and sensors anywhere." },
  { key: "land",   name: "Land",        color: "#f2a44e", categories: ["land"],            model: "tank",  pos: [-3.2, 0, 2.2], onLand: true, role: "Seize and hold terrain — armour, artillery and air-defence that ultimately decide the outcome." },
  { key: "missile",name: "Strike",      color: "#ff6b6b", categories: ["missile"],         model: "arty",  pos: [1.6, 0, 3.6], onLand: true, role: "Precision effects at range — air-defence, cruise, ballistic and anti-ship missiles fired from every platform." },
  { key: "cyber",  name: "Cyber & C2",  color: "#c9d4e0", categories: ["cyber", "radar"],  model: "c2",    pos: [0.4, 0, -0.4], onLand: true, hub: true, role: "The connective tissue: command & control, networks, electronic warfare and the sensors that fuse the picture." },
];

const prettyType = (t) => (t || "other").replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export default function BattlespaceTheater({ products = [], onOpenProduct, onExploreCatalog }) {
  const mountRef = useRef(null);
  const overlayRef = useRef(null);
  const apiRef = useRef(null);        // { focus(key), unfocus() } from the 3D setup
  const clickRef = useRef(() => {});  // latest React click handler for 3D labels
  const labelElsRef = useRef({});     // domainKey -> count <span>

  // nav state for the React drill-down panel
  const [nav, setNav] = useState({ level: 0, domainKey: null, type: null });

  // per-domain product counts (live from DB)
  const counts = useMemo(() => {
    const c = {};
    for (const d of DOMAIN_META) c[d.key] = products.filter((p) => d.categories.includes(p.category)).length;
    return c;
  }, [products]);
  const countsRef = useRef(counts);
  countsRef.current = counts;

  const activeDomain = nav.domainKey ? DOMAIN_META.find((d) => d.key === nav.domainKey) : null;

  // products of the active domain, grouped into "types" by product_type
  const domainTypes = useMemo(() => {
    if (!activeDomain) return [];
    const inDomain = products.filter((p) => activeDomain.categories.includes(p.category));
    const groups = {};
    for (const p of inDomain) {
      const key = p.product_type || "other";
      (groups[key] = groups[key] || { type: key, label: prettyType(key), items: [] }).items.push(p);
    }
    return Object.values(groups).sort((a, b) => b.items.length - a.items.length);
  }, [activeDomain, products]);

  const activeTypeGroup = nav.type ? domainTypes.find((g) => g.type === nav.type) : null;

  clickRef.current = (key) => setNav({ level: 1, domainKey: key, type: null });

  // ---- build the 3D scene once ----
  useEffect(() => {
    const container = mountRef.current;
    const overlay = overlayRef.current;
    if (!container) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) {
      container.innerHTML = '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#9fb3c6;font:14px/1.6 system-ui;text-align:center;padding:26px">This view needs WebGL, which appears to be disabled in your browser.</div>';
      return;
    }
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, { position: "absolute", inset: "0", width: "100%", height: "100%", display: "block" });

    const scene = new THREE.Scene();
    let W = 1, H = 1;
    const camera = new THREE.PerspectiveCamera(30, 1.6, 0.1, 200);
    scene.add(new THREE.HemisphereLight(0xbcd6f0, 0x1a2836, 0.85));
    const key = new THREE.DirectionalLight(0xfff1dc, 1.35); key.position.set(-14, 20, 10); scene.add(key);
    const rim = new THREE.DirectionalLight(0x5ad6d0, 0.4); rim.position.set(12, 6, -12); scene.add(rim);

    // ----- terrain height field -----
    const mulberry32 = (a) => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const makeNoise = (seed) => { const rng = mulberry32(seed), S = 256, g = new Float32Array(S * S); for (let i = 0; i < g.length; i++) g[i] = rng(); const at = (x, y) => g[((y & 255) * 256) + (x & 255)], sm = (t) => t * t * (3 - 2 * t); return (x, y) => { const x0 = Math.floor(x), y0 = Math.floor(y), fx = sm(x - x0), fy = sm(y - y0); const a = at(x0, y0), b = at(x0 + 1, y0), c = at(x0, y0 + 1), d = at(x0 + 1, y0 + 1); return (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy; }; };
    const noise = makeNoise(24);
    const fbm = (x, y, o) => { let s = 0, a = 0.5, f = 1, n = o || 6; for (let k = 0; k < n; k++) { s += a * noise(x * f, y * f); f *= 2; a *= 0.5; } return s; };
    const smoothstep = (e0, e1, x) => { const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0))); return t * t * (3 - 2 * t); };
    const SIZE = 20, SEA = 0.0, MAXH = 4.4;
    const heightAt = (x, z) => {
      const nx = (x / SIZE) + 0.5, nz = (z / SIZE) + 0.5;
      const wx = fbm(nx * 2 + 1.3, nz * 2 + 7.7, 4) - 0.5, wy = fbm(nx * 2 + 4.1, nz * 2 + 2.3, 4) - 0.5;
      let base = fbm(nx * 3.0 + wx * 0.9 + 5, nz * 3.0 + wy * 0.9 + 9, 6); base = Math.pow(base, 1.25);
      const dx = nx - 0.54, dz = nz - 0.46, d = Math.sqrt(dx * dx + dz * dz);
      const island = smoothstep(0.62, 0.13, d), bay = smoothstep(0, 0.34, (nx * 0.6 + nz * 0.4));
      let h = base * island * (0.5 + 0.5 * bay) * 1.2;
      h += (fbm(nx * 9 + 3, nz * 9 + 6, 3) - 0.5) * 0.05 * island;
      return (h - 0.30) / 0.70 * MAXH;
    };
    const RAMP = [[0, [168, 153, 112]], [0.06, [112, 133, 79]], [0.30, [84, 108, 62]], [0.52, [118, 109, 86]], [0.74, [141, 137, 127]], [0.90, [188, 192, 194]], [1, [232, 236, 240]]];
    const tmp = new THREE.Color();
    const terrainColor = (h) => {
      const t = Math.max(0, Math.min(1, h / MAXH)); let col = RAMP[0][1];
      for (let k = 1; k < RAMP.length; k++) { if (t <= RAMP[k][0]) { const a = RAMP[k - 1], b = RAMP[k], tt = (t - a[0]) / (b[0] - a[0]); col = [a[1][0] + (b[1][0] - a[1][0]) * tt, a[1][1] + (b[1][1] - a[1][1]) * tt, a[1][2] + (b[1][2] - a[1][2]) * tt]; break; } col = RAMP[k][1]; }
      tmp.setRGB(col[0] / 255, col[1] / 255, col[2] / 255);
    };
    const cArid = new THREE.Color(0x936046), cGrassDk = new THREE.Color(0x556b39);
    const SEG = 200, tg = new THREE.PlaneGeometry(SIZE, SIZE, SEG, SEG); tg.rotateX(-Math.PI / 2);
    const tp = tg.attributes.position, tcol = [];
    for (let i = 0; i < tp.count; i++) {
      const x = tp.getX(i), z = tp.getZ(i); let h = heightAt(x, z);
      const land = h > SEA; tp.setY(i, Math.max(h, SEA));
      if (land) {
        terrainColor(h);
        const nx = (x / SIZE) + 0.5, nz = (z / SIZE) + 0.5, biome = fbm(nx * 4 + 50, nz * 4 + 80, 4);
        const arid = smoothstep(0.52, 0.9, nx) * smoothstep(0.42, 0.72, biome) * smoothstep(0.15, 0.4, h / MAXH) * (1 - smoothstep(0.72, 0.92, h / MAXH));
        tmp.lerp(cArid, arid * 0.7);
        const forest = smoothstep(0.55, 0.85, biome) * (1 - smoothstep(0.32, 0.5, h / MAXH));
        tmp.lerp(cGrassDk, forest * 0.35); tmp.multiplyScalar(0.9 + 0.16 * biome);
      } else tmp.setRGB(0.12, 0.55, 0.62);
      tcol.push(tmp.r, tmp.g, tmp.b);
    }
    tg.setAttribute("color", new THREE.Float32BufferAttribute(tcol, 3)); tg.computeVertexNormals();
    const terrain = new THREE.Mesh(tg, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95, metalness: 0.02 })); scene.add(terrain);

    const SLABH = 6.2, slabGeo = new THREE.BoxGeometry(SIZE, SLABH, SIZE);
    const spos = slabGeo.attributes.position, scol = [], ct = new THREE.Color(0x39e0d4), cb = new THREE.Color(0x073042);
    for (let i = 0; i < spos.count; i++) { const y = spos.getY(i), f = (y + SLABH / 2) / SLABH, c = cb.clone().lerp(ct, f * f); scol.push(c.r, c.g, c.b); }
    slabGeo.setAttribute("color", new THREE.Float32BufferAttribute(scol, 3));
    const slab = new THREE.Mesh(slabGeo, new THREE.MeshStandardMaterial({ vertexColors: true, transparent: true, opacity: 0.9, roughness: 0.35, metalness: 0.1, emissive: 0x0a3a3f, emissiveIntensity: 0.35 }));
    slab.position.y = SEA - SLABH / 2 + 0.02; scene.add(slab);
    const water = new THREE.Mesh(new THREE.PlaneGeometry(SIZE, SIZE), new THREE.MeshStandardMaterial({ color: 0x1a8ea0, transparent: true, opacity: 0.72, roughness: 0.15, metalness: 0.4 }));
    water.rotation.x = -Math.PI / 2; water.position.y = SEA + 0.03; scene.add(water);
    const rimLine = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(SIZE, 0.02, SIZE)), new THREE.LineBasicMaterial({ color: 0x7ff5eb })); rimLine.position.y = SEA + 0.02; scene.add(rimLine);

    // ----- materials + model builders -----
    const MAT = {
      olive: new THREE.MeshStandardMaterial({ color: 0x5f6a3c, roughness: 0.7, metalness: 0.15 }),
      oliveL: new THREE.MeshStandardMaterial({ color: 0x6f7a48, roughness: 0.7, metalness: 0.15 }),
      dark: new THREE.MeshStandardMaterial({ color: 0x2a2f26, roughness: 0.6, metalness: 0.3 }),
      grey: new THREE.MeshStandardMaterial({ color: 0x69747f, roughness: 0.62, metalness: 0.18 }),
      greyL: new THREE.MeshStandardMaterial({ color: 0x98a3b0, roughness: 0.6, metalness: 0.18 }),
      steel: new THREE.MeshStandardMaterial({ color: 0xaeb8c4, roughness: 0.5, metalness: 0.28 }),
      panel: new THREE.MeshStandardMaterial({ color: 0x24407e, roughness: 0.4, metalness: 0.5, emissive: 0x0a1836, emissiveIntensity: 0.4 }),
      tealE: new THREE.MeshBasicMaterial({ color: 0x33d6c8 }),
    };
    const boxM = (w, h, d, m, x, y, z) => { const me = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); me.position.set(x, y, z); return me; };
    const cyl = (rt, rb, h, m, s) => new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, s || 20), m);
    const B = {
      tank() { const g = new THREE.Group(); g.add(boxM(1.5, 0.28, 0.9, MAT.dark, 0, 0.14, 0.55)); g.add(boxM(1.5, 0.28, 0.9, MAT.dark, 0, 0.14, -0.55)); g.add(boxM(1.55, 0.42, 1.5, MAT.olive, 0, 0.5, 0)); const gl = boxM(0.5, 0.42, 1.5, MAT.oliveL, 0.85, 0.5, 0); gl.rotation.z = -0.5; g.add(gl); const t = cyl(0.55, 0.62, 0.34, MAT.oliveL, 24); t.position.y = 0.86; g.add(t); const br = cyl(0.06, 0.07, 1.5, MAT.dark, 16); br.rotation.z = Math.PI / 2; br.position.set(0.95, 0.9, 0); g.add(br); const cu = cyl(0.14, 0.16, 0.16, MAT.olive, 16); cu.position.set(-0.15, 1.06, 0.12); g.add(cu); g.scale.setScalar(0.62); return g; },
      ship() { const g = new THREE.Group(); const s = new THREE.Shape(); s.moveTo(-1.7, 0); s.lineTo(1.29, 0); s.quadraticCurveTo(2.11, 0, 2.11, 0.5); s.lineTo(-1.7, 0.5); s.quadraticCurveTo(-2.04, 0.25, -1.7, 0); const geo = new THREE.ExtrudeGeometry(s, { depth: 0.5, bevelEnabled: true, bevelThickness: 0.12, bevelSize: 0.12, bevelSegments: 2 }); geo.rotateX(-Math.PI / 2); geo.translate(0, 0.5, -0.5); g.add(new THREE.Mesh(geo, MAT.grey)); g.add(boxM(1.1, 0.5, 0.7, MAT.greyL, -0.1, 0.72, 0)); g.add(boxM(0.5, 0.4, 0.5, MAT.greyL, 0.2, 1.1, 0)); const ma = cyl(0.03, 0.05, 0.9, MAT.steel, 10); ma.position.set(0.1, 1.6, 0); g.add(ma); g.add(boxM(0.35, 0.16, 0.35, MAT.steel, -1.2, 0.62, 0)); g.scale.setScalar(0.62); return g; },
      jet() { const g = new THREE.Group(); const f = cyl(0.12, 0.16, 2.6, MAT.steel, 20); f.rotation.z = Math.PI / 2; g.add(f); const n = cyl(0.005, 0.13, 0.7, MAT.steel, 20); n.rotation.z = -Math.PI / 2; n.position.x = 1.62; g.add(n); const wS = new THREE.Shape(); wS.moveTo(0, 0); wS.lineTo(-1.1, -1.4); wS.lineTo(-1.5, -1.4); wS.lineTo(-0.2, 0); wS.closePath(); const wg = new THREE.ExtrudeGeometry(wS, { depth: 0.06, bevelEnabled: false }); const wl = new THREE.Mesh(wg, MAT.steel); wl.rotation.x = -Math.PI / 2; wl.position.set(0.2, 0, 0.02); g.add(wl); const wr = new THREE.Mesh(wg, MAT.steel); wr.rotation.x = Math.PI / 2; wr.position.set(0.2, 0, -0.02); g.add(wr); const tS = new THREE.Shape(); tS.moveTo(0, 0); tS.lineTo(-0.5, 0.6); tS.lineTo(-0.7, 0.6); tS.lineTo(-0.2, 0); tS.closePath(); const fin = new THREE.Mesh(new THREE.ExtrudeGeometry(tS, { depth: 0.05, bevelEnabled: false }), MAT.steel); fin.position.set(-1.0, 0.05, -0.025); g.add(fin); g.scale.setScalar(0.6); return g; },
      sat() { const g = new THREE.Group(); g.add(boxM(0.5, 0.7, 0.5, MAT.greyL, 0, 0, 0)); [0.9, -0.9].forEach((z) => g.add(boxM(1.5, 0.5, 0.02, MAT.panel, 0, 0.1, z))); const d = cyl(0.02, 0.18, 0.14, MAT.steel, 18); d.position.set(0, 0.5, 0.28); d.rotation.x = 0.5; g.add(d); g.scale.setScalar(0.7); return g; },
      c2() { const g = new THREE.Group(); g.add(boxM(1.4, 0.6, 1.1, MAT.grey, 0, 0.3, 0)); g.add(boxM(0.7, 0.4, 0.6, MAT.greyL, -0.1, 0.8, 0)); const pts = []; for (let i = 0; i <= 8; i++) { const t = i / 8; pts.push(new THREE.Vector2(t * 0.34, t * t * 0.28)); } const dish = new THREE.Mesh(new THREE.LatheGeometry(pts, 20), MAT.steel); dish.position.set(0.2, 1.15, 0.2); dish.rotation.x = -0.7; dish.rotation.z = 0.3; g.add(dish); const ma = cyl(0.04, 0.05, 1.1, MAT.steel, 10); ma.position.set(0.55, 1.1, -0.2); g.add(ma); const bc = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 16), MAT.tealE); bc.position.set(0.55, 1.7, -0.2); g.add(bc); g.scale.setScalar(0.6); return g; },
      arty() { const g = new THREE.Group(); g.add(boxM(1.5, 0.34, 0.72, MAT.olive, 0, 0.4, 0)); [-0.55, 0.05, 0.55].forEach((x) => [-0.34, 0.34].forEach((z) => { const w = cyl(0.16, 0.16, 0.14, MAT.dark, 14); w.rotation.x = Math.PI / 2; w.position.set(x, 0.18, z); g.add(w); })); g.add(boxM(0.5, 0.42, 0.62, MAT.oliveL, 0.5, 0.68, 0)); const lb = boxM(1.0, 0.42, 0.5, new THREE.MeshStandardMaterial({ color: 0x7a5030, roughness: 0.6, metalness: 0.3 }), -0.25, 0.95, 0); lb.rotation.z = 0.55; g.add(lb); g.scale.setScalar(0.58); return g; },
      awacs() { const g = new THREE.Group(); const f = cyl(0.17, 0.2, 3.0, MAT.greyL, 20); f.rotation.z = Math.PI / 2; g.add(f); const n = cyl(0.01, 0.18, 0.7, MAT.greyL, 18); n.rotation.z = -Math.PI / 2; n.position.x = 1.8; g.add(n); g.add(boxM(0.55, 0.05, 3.7, MAT.steel, -0.1, -0.02, 0)); [-1.3, -0.5, 0.5, 1.3].forEach((z) => { const e = cyl(0.08, 0.08, 0.42, MAT.grey, 12); e.rotation.x = Math.PI / 2; e.position.set(-0.1, -0.14, z); g.add(e); }); g.add(boxM(0.42, 0.05, 1.5, MAT.steel, -1.5, 0, 0)); g.add(boxM(0.05, 0.62, 0.5, MAT.steel, -1.62, 0.32, 0)); [0.22, -0.22].forEach((z) => { const s = cyl(0.03, 0.03, 0.42, MAT.grey, 8); s.position.set(-0.1, 0.32, z); g.add(s); }); const dome = cyl(0.72, 0.72, 0.13, MAT.greyL, 26); dome.position.set(-0.1, 0.56, 0); g.add(dome); g.scale.setScalar(0.58); return g; },
      transport() { const g = new THREE.Group(); const f = cyl(0.28, 0.33, 3.4, MAT.greyL, 20); f.rotation.z = Math.PI / 2; g.add(f); const n = cyl(0.02, 0.3, 0.7, MAT.greyL, 18); n.rotation.z = -Math.PI / 2; n.position.x = 2.0; g.add(n); g.add(boxM(0.72, 0.07, 4.5, MAT.greyL, -0.1, 0.3, 0)); [-1.7, -0.75, 0.75, 1.7].forEach((z) => { const e = cyl(0.12, 0.12, 0.52, MAT.grey, 12); e.rotation.x = Math.PI / 2; e.position.set(0.05, 0.16, z); g.add(e); }); g.add(boxM(0.08, 0.95, 0.5, MAT.greyL, -1.72, 0.55, 0)); g.add(boxM(0.42, 0.06, 1.9, MAT.greyL, -1.8, 1.0, 0)); g.scale.setScalar(0.55); return g; },
      sub() { const g = new THREE.Group(); const hull = new THREE.Mesh(new THREE.CapsuleGeometry(0.4, 2.4, 10, 18), MAT.grey); hull.rotation.z = Math.PI / 2; g.add(hull); g.add(boxM(0.55, 0.5, 0.36, MAT.grey, 0.15, 0.42, 0)); const p = cyl(0.03, 0.03, 0.42, MAT.steel, 8); p.position.set(0.15, 0.8, 0); g.add(p); g.add(boxM(0.06, 0.55, 0.95, MAT.grey, -1.35, 0.08, 0)); g.scale.setScalar(0.6); return g; },
      boat() { const g = B.ship(); g.scale.multiplyScalar(0.62); return g; },
      heli() { const g = new THREE.Group(); const b = new THREE.Mesh(new THREE.SphereGeometry(0.5, 20, 16), MAT.grey); b.scale.set(1.7, 0.8, 0.8); b.position.x = 0.2; g.add(b); const bo = cyl(0.06, 0.1, 1.4, MAT.grey, 12); bo.rotation.z = Math.PI / 2; bo.position.x = -1.0; g.add(bo); g.add(boxM(0.05, 0.4, 0.2, MAT.greyL, -1.7, 0.15, 0)); const rh = cyl(0.05, 0.05, 0.16, MAT.steel, 10); rh.position.set(0.2, 0.55, 0); g.add(rh); g.add(boxM(2.6, 0.02, 0.12, MAT.dark, 0.2, 0.64, 0)); g.add(boxM(0.12, 0.02, 2.6, MAT.dark, 0.2, 0.64, 0)); [0.35, -0.35].forEach((z) => { const sk = cyl(0.03, 0.03, 1.1, MAT.dark, 8); sk.rotation.x = Math.PI / 2; sk.position.set(0.2, -0.35, z); g.add(sk); }); g.scale.setScalar(0.5); return g; },
      drone() { const g = new THREE.Group(); const f = cyl(0.1, 0.14, 1.8, MAT.greyL, 16); f.rotation.z = Math.PI / 2; g.add(f); const ba = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 14), MAT.grey); ba.position.x = 0.95; g.add(ba); g.add(boxM(0.42, 0.04, 3.4, MAT.greyL, -0.05, 0.03, 0)); const v1 = boxM(0.35, 0.04, 0.5, MAT.greyL, -0.8, 0.13, 0.2); v1.rotation.x = 0.6; g.add(v1); const v2 = boxM(0.35, 0.04, 0.5, MAT.greyL, -0.8, 0.13, -0.2); v2.rotation.x = -0.6; g.add(v2); g.scale.setScalar(0.6); return g; },
      quad() { const g = new THREE.Group(); g.add(boxM(0.5, 0.14, 0.5, MAT.grey, 0, 0, 0)); const rm = new THREE.MeshBasicMaterial({ color: 0x88a0b8, transparent: true, opacity: 0.3 }); [[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(([x, z]) => { const arm = boxM(0.75, 0.04, 0.06, MAT.dark, 0, 0.02, 0); arm.position.set(x * 0.22, 0.02, z * 0.22); arm.rotation.y = Math.atan2(z, x); g.add(arm); const r = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.015, 18), rm); r.position.set(x * 0.42, 0.08, z * 0.42); g.add(r); }); g.scale.setScalar(0.7); return g; },
    };

    // ----- place domain models + labels -----
    const objs = [];
    DOMAIN_META.forEach((d) => {
      const g = B[d.model](); let [x, y, z] = d.pos;
      if (d.onLand) y = Math.max(heightAt(x, z), 0) + 0.02;
      if (d.onSea) y = SEA + 0.05;
      g.position.set(x, y, z); g.rotation.y = Math.random() * 0.6 - 0.3; scene.add(g);
      objs.push({ d, g, center: new THREE.Vector3(x, y + 0.4, z), base: g.scale.x });
    });

    // link nodes
    const NODES = [
      { tag: "LINK 16", x: 0.4, z: -0.4 }, { tag: "JREAP", x: -1.9, z: -1.5 }, { tag: "LINK 11/22", x: 2.9, z: 3.0 },
    ];
    NODES.forEach((n) => (n.world = new THREE.Vector3(n.x, Math.max(heightAt(n.x, n.z), 0) + 0.15, n.z)));
    const nearestNode = (v) => { let b = NODES[0], bd = 1e9; for (const n of NODES) { const dd = v.distanceToSquared(n.world); if (dd < bd) { bd = dd; b = n; } } return b.world; };

    // decorative units
    const DECO = [
      { m: "awacs", pos: [-3.4, 4.7, -4.4], link: 1 }, { m: "transport", pos: [5.6, 4.3, 3.6], link: 1 },
      { m: "drone", pos: [-1.0, 4.1, -5.4], link: 1 }, { m: "drone", pos: [6.8, 3.5, -4.6] }, { m: "quad", pos: [-4.8, 2.6, -1.6] },
      { m: "heli", pos: [8.6, 2.3, -1.2], link: 1 }, { m: "heli", pos: [-6.6, 2.0, 3.8] },
      { m: "sub", pos: [5.4, -0.05, 6.4], sea: 1, link: 1 }, { m: "boat", pos: [9.4, 0, 1.8], sea: 1, link: 1 },
      { m: "tank", pos: [-4.8, 0, 0.9], land: 1, link: 1 }, { m: "tank", pos: [-2.4, 0, 3.7], land: 1 }, { m: "sat", pos: [4.7, 5.0, -2.6], s: 0.8 },
    ];
    DECO.forEach((u) => { const g = B[u.m](); let [x, y, z] = u.pos; if (u.land) y = Math.max(heightAt(x, z), 0) + 0.02; if (u.sea) y = SEA - 0.02; g.position.set(x, y, z); g.rotation.y = Math.random() * Math.PI * 2; if (u.s) g.scale.multiplyScalar(u.s); scene.add(g); u._c = new THREE.Vector3(x, y + 0.3, z); });

    // beams
    const beams = [];
    const addBeam = (a, b) => {
      const A = a.clone(), Bp = b.clone(), mid = A.clone().lerp(Bp, 0.5); mid.y += A.distanceTo(Bp) * 0.16 + 0.5;
      const curve = new THREE.QuadraticBezierCurve3(A, mid, Bp);
      scene.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 0.03, 8, false), new THREE.MeshBasicMaterial({ color: 0xff5a4d, transparent: true, opacity: 0.85 })));
      scene.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 0.1, 8, false), new THREE.MeshBasicMaterial({ color: 0xff5a4d, transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending, depthWrite: false })));
      const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffd0a0 })); scene.add(pulse);
      beams.push({ curve, pulse, phase: Math.random() });
    };
    objs.filter((o) => !o.d.hub).forEach((o) => addBeam(o.center, nearestNode(o.center)));
    DECO.forEach((u) => { if (u.link) addBeam(u._c, nearestNode(u._c)); });
    addBeam(NODES[0].world, NODES[1].world); addBeam(NODES[0].world, NODES[2].world);

    // ----- HTML overlay labels + node pings -----
    const labels = [];
    objs.forEach((o) => {
      const el = document.createElement("button");
      el.className = "bt-label";
      el.innerHTML = `<span class="bt-lbl"><span class="bt-dot" style="background:${o.d.color}"></span><span class="bt-nm">${o.d.name}</span><span class="bt-ct" data-k="${o.d.key}">${countsRef.current[o.d.key] || 0}</span></span><span class="bt-stem"></span>`;
      el.addEventListener("click", () => { focusDomain(o); clickRef.current(o.d.key); });
      overlay.appendChild(el); labels.push({ el, o });
      labelElsRef.current[o.d.key] = el.querySelector(".bt-ct");
    });
    const pings = [];
    NODES.forEach((n) => { const el = document.createElement("div"); el.className = "bt-hub"; el.innerHTML = `<div class="bt-ping"><i class="bt-r2"></i><i class="bt-core"></i></div><div class="bt-tag">${n.tag}</div>`; overlay.appendChild(el); pings.push({ el, world: n.world }); });

    // ----- camera + interaction -----
    let az = 0.9, el = 0.6;
    const target = new THREE.Vector3(0, 0.7, 0), desTarget = target.clone();
    let camR = 31, desR = 31;
    const placeCamera = () => { camera.position.set(target.x + camR * Math.cos(el) * Math.cos(az), target.y + camR * Math.sin(el), target.z + camR * Math.cos(el) * Math.sin(az)); camera.lookAt(target); };
    const setHighlight = (o) => objs.forEach((k) => k.g.scale.setScalar(k.base * (k === o ? 1.16 : 1)));
    function focusDomain(o) { desTarget.copy(o.center); desR = 10.5; el = Math.max(el, 0.5); setHighlight(o); }
    function unfocus() { desTarget.set(0, 0.7, 0); desR = 31; setHighlight(null); }
    apiRef.current = { focus: (k) => { const o = objs.find((x) => x.d.key === k); if (o) focusDomain(o); }, unfocus };

    let drag = false, px = 0, py = 0;
    const onDown = (e) => { drag = true; px = e.clientX; py = e.clientY; };
    const onUp = () => (drag = false);
    const onMove = (e) => { if (!drag) return; az -= (e.clientX - px) * 0.006; el = Math.max(0.18, Math.min(1.2, el + (e.clientY - py) * 0.005)); px = e.clientX; py = e.clientY; };
    container.addEventListener("pointerdown", onDown); window.addEventListener("pointerup", onUp); window.addEventListener("pointermove", onMove);

    const toScreen = (v) => { const p = v.clone().project(camera); return [(p.x * 0.5 + 0.5) * W, (-p.y * 0.5 + 0.5) * H, p.z]; };
    const resize = () => { const r = container.getBoundingClientRect(); W = r.width; H = r.height; renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); renderer.setSize(W, H, false); camera.aspect = W / H; camera.updateProjectionMatrix(); };
    const ro = new ResizeObserver(resize); ro.observe(container); resize();

    const clock = new THREE.Clock(); let raf;
    const loop = () => {
      const t = clock.getElapsedTime();
      target.lerp(desTarget, 0.09); camR += (desR - camR) * 0.09; placeCamera();
      beams.forEach((b) => { const u = (t * 0.35 + b.phase) % 1; b.pulse.position.copy(b.curve.getPoint(u)); });
      renderer.render(scene, camera);
      labels.forEach(({ el, o }) => { const s = toScreen(o.center.clone().setY(o.center.y + 0.1)); el.style.left = s[0] + "px"; el.style.top = s[1] + "px"; el.style.display = s[2] < 1 ? "flex" : "none"; });
      pings.forEach((p) => { const s = toScreen(p.world.clone().setY(p.world.y + 0.15)); p.el.style.left = s[0] + "px"; p.el.style.top = s[1] + "px"; p.el.style.display = s[2] < 1 ? "flex" : "none"; });
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf); ro.disconnect();
      container.removeEventListener("pointerdown", onDown); window.removeEventListener("pointerup", onUp); window.removeEventListener("pointermove", onMove);
      labels.forEach((l) => l.el.remove()); pings.forEach((p) => p.el.remove());
      renderer.dispose(); if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) { const m = o.material; (Array.isArray(m) ? m : [m]).forEach((mm) => mm.dispose && mm.dispose()); } });
      apiRef.current = null;
    };
  }, []);

  // keep 3D label counts in sync with live data
  useEffect(() => {
    for (const k in labelElsRef.current) if (labelElsRef.current[k]) labelElsRef.current[k].textContent = counts[k] || 0;
  }, [counts]);

  const closePanel = () => { apiRef.current && apiRef.current.unfocus(); setNav({ level: 0, domainKey: null, type: null }); };

  return (
    <div className="bt-root">
      <style>{BT_CSS}</style>
      <div className="bt-stage">
        <div ref={mountRef} className="bt-mount" />
        <div ref={overlayRef} className="bt-overlay" />
        <div className="bt-hud bt-hud-l">LINK 16 · JREAP · LINK 11/22</div>
        <div className="bt-hud bt-hud-r">COP · REAL-TIME</div>
        <p className="bt-hint">Drag to orbit · click a domain to enter</p>

        {/* React drill-down panel */}
        <div className={`bt-detail ${nav.level > 0 ? "open" : ""}`}>
          {activeDomain && (
            <>
              <button className="bt-x" onClick={closePanel} aria-label="Close"><X size={15} /></button>
              {!activeTypeGroup ? (
                <>
                  <button className="bt-back" onClick={closePanel}>← Theater</button>
                  <div className="bt-bc">Theater › <b>{activeDomain.name}</b></div>
                  <div className="bt-badge"><span className="bt-bdot" style={{ background: activeDomain.color }} /> DOMAIN</div>
                  <h3 className="bt-h3">{activeDomain.name}</h3>
                  <div className="bt-count">{counts[activeDomain.key] || 0} systems · {domainTypes.length} types</div>
                  <p className="bt-role">{activeDomain.role}</p>
                  <div className="bt-k">Systems inside {activeDomain.name}</div>
                  <div className="bt-types">
                    {domainTypes.map((g) => (
                      <button key={g.type} onClick={() => setNav((n) => ({ ...n, type: g.type }))}>
                        {g.label}<span className="bt-tcount">{g.items.length}</span>
                      </button>
                    ))}
                  </div>
                  <button className="bt-cta" onClick={() => onExploreCatalog && onExploreCatalog(activeDomain.categories[0])}>
                    Open {activeDomain.name} in catalogue <ArrowRight size={15} />
                  </button>
                </>
              ) : (
                <>
                  <button className="bt-back" onClick={() => setNav((n) => ({ ...n, type: null }))}>← {activeDomain.name}</button>
                  <div className="bt-bc">Theater › {activeDomain.name} › <b>{activeTypeGroup.label}</b></div>
                  <h3 className="bt-h3">{activeTypeGroup.label}</h3>
                  <div className="bt-count">{activeTypeGroup.items.length} products</div>
                  <div className="bt-k">Products</div>
                  <div className="bt-items">
                    {activeTypeGroup.items.map((p) => (
                      <button key={p.id} className="bt-item" onClick={() => onOpenProduct && onOpenProduct(p)}>
                        <span>{p.name}</span><span className="bt-arw">{p.manufacturer} →</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const BT_CSS = `
.bt-root{--teal:#33d6c8;--line:#1c2836}
.bt-stage{position:relative;width:100%;aspect-ratio:16/10;border-radius:16px;overflow:hidden;border:1px solid var(--line);
  background:radial-gradient(120% 120% at 60% 15%,#0f1826 0%,#0a0e15 60%,#06090e 100%);box-shadow:inset 0 0 120px rgba(0,0,0,.55);cursor:grab;touch-action:none}
.bt-stage:active{cursor:grabbing}
.bt-mount{position:absolute;inset:0}
.bt-overlay{position:absolute;inset:0;pointer-events:none}
.bt-label{position:absolute;transform:translate(-50%,-100%);pointer-events:auto;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px;background:none;border:0;padding:0;font:inherit}
.bt-lbl{display:flex;align-items:center;gap:6px;background:rgba(9,14,22,.82);border:1px solid var(--line);border-radius:999px;padding:3px 10px;white-space:nowrap;backdrop-filter:blur(4px);transition:transform .15s}
.bt-label:hover .bt-lbl{transform:translateY(-2px)}
.bt-nm{font-size:11px;font-weight:600;color:#eaf1f8}.bt-ct{font-family:ui-monospace,Menlo,monospace;font-size:10px;color:#8ba0b5}
.bt-dot{width:7px;height:7px;border-radius:50%}
.bt-stem{width:1px;height:14px;background:linear-gradient(rgba(255,255,255,.5),transparent)}
.bt-hub{position:absolute;transform:translate(-50%,-50%);pointer-events:none;display:flex;flex-direction:column;align-items:center;gap:5px}
.bt-ping{width:30px;height:30px;position:relative}
.bt-ping i{position:absolute;inset:0;margin:auto;border-radius:50%}
.bt-core{width:9px;height:9px;background:var(--teal);box-shadow:0 0 10px var(--teal)}
.bt-r2{width:30px;height:30px;border:1px solid var(--teal);opacity:.4;animation:btp 2.6s ease-out infinite}
@keyframes btp{0%{transform:scale(.4);opacity:.7}80%,100%{transform:scale(1.3);opacity:0}}
.bt-tag{font-family:ui-monospace,Menlo,monospace;font-size:9px;letter-spacing:.12em;color:var(--teal);background:rgba(9,14,22,.7);border:1px solid rgba(51,214,200,.3);border-radius:5px;padding:2px 6px}
.bt-hud{position:absolute;font-family:ui-monospace,Menlo,monospace;font-size:10px;letter-spacing:.16em;color:#7fe6db;background:rgba(9,14,22,.5);border:1px solid rgba(51,214,200,.22);border-radius:6px;padding:4px 9px;pointer-events:none}
.bt-hud-l{left:12px;top:12px}.bt-hud-r{right:12px;top:12px}
.bt-hint{position:absolute;left:14px;bottom:12px;margin:0;font-size:11px;color:#7f93a6;background:rgba(9,14,22,.5);border:1px solid var(--line);border-radius:7px;padding:5px 10px;pointer-events:none}
.bt-detail{position:absolute;top:0;right:0;height:100%;width:min(380px,90%);background:linear-gradient(180deg,rgba(12,19,30,.97),rgba(9,13,20,.98));backdrop-filter:blur(10px);border-left:1px solid var(--line);transform:translateX(101%);transition:transform .32s cubic-bezier(.4,0,.2,1);padding:22px;overflow:auto;color:#e6edf5}
.bt-detail.open{transform:none}
.bt-x{position:absolute;top:14px;right:14px;width:30px;height:30px;border-radius:8px;border:1px solid var(--line);background:rgba(255,255,255,.04);color:#cbd8e6;cursor:pointer;display:flex;align-items:center;justify-content:center}
.bt-back{display:inline-flex;align-items:center;gap:6px;background:none;border:0;color:#8ba0b5;font:inherit;font-size:12px;cursor:pointer;padding:0;margin-bottom:8px}
.bt-back:hover{color:#cbd8e6}
.bt-bc{font-size:11px;color:#6f8496;margin-bottom:8px}.bt-bc b{color:#a9bccb;font-weight:600}
.bt-badge{display:flex;align-items:center;gap:8px;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#8ba0b5}
.bt-bdot{width:10px;height:10px;border-radius:50%}
.bt-h3{font-size:20px;font-weight:800;margin:2px 0 0}
.bt-count{font-family:ui-monospace,Menlo,monospace;font-size:12px;color:#7fe6db;margin-top:3px}
.bt-role{font-size:13px;color:#a9bccb;line-height:1.55;margin:14px 0 4px}
.bt-k{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#6f8496;margin:18px 0 8px}
.bt-types{display:flex;flex-wrap:wrap;gap:7px}
.bt-types button{display:inline-flex;align-items:center;gap:7px;font-size:12px;color:#dbe7f2;background:rgba(255,255,255,.05);border:1px solid var(--line);border-radius:999px;padding:5px 12px;cursor:pointer;font:inherit;transition:.15s}
.bt-types button:hover{border-color:var(--teal);color:#fff}
.bt-tcount{font-family:ui-monospace,Menlo,monospace;font-size:10px;color:#8ba0b5}
.bt-cta{margin-top:22px;display:flex;align-items:center;justify-content:center;gap:8px;width:100%;background:var(--teal);color:#04231f;font-weight:700;font-size:13px;border:0;border-radius:10px;padding:11px;cursor:pointer}
.bt-items{display:flex;flex-direction:column;gap:6px;margin-top:8px}
.bt-item{display:flex;align-items:center;justify-content:space-between;gap:8px;background:rgba(255,255,255,.04);border:1px solid var(--line);border-radius:9px;padding:9px 12px;font-size:13px;color:#e6edf5;cursor:pointer;font:inherit;text-align:left;transition:.15s}
.bt-item:hover{border-color:var(--teal);background:rgba(51,214,200,.08)}
.bt-arw{color:#6f8496;font-size:11px;white-space:nowrap}
`;
