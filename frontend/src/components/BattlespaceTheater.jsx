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
  { key: "space", name: "Space", color: "#8b90ff", categories: ["space"], model: "sat", pos: [-6, 4.8, 1.5],
    about: "The constellation of military satellites and launch systems operating in orbit. Space doesn't fight directly, but almost every modern capability — navigation, communications, early-warning and reconnaissance — depends on it, which is why it's called the ultimate high ground.",
    interfaces: "Feeds GPS, secure comms, imagery and missile-launch warning to every other domain; protected by ground control and cyber." },
  { key: "air", name: "Air Power", color: "#5aa2ff", categories: ["aircraft"], model: "jet", pos: [2.5, 4.4, -3],
    about: "The use of aircraft to win control of the sky, strike targets deep in enemy territory, move forces and watch the battlefield from above. Whoever controls the air can operate freely on the ground and at sea; whoever loses it is exposed everywhere.",
    interfaces: "Cued by satellites and AWACS, shielded from enemy air-defence by electronic warfare, delivers the missiles that sensors have targeted." },
  { key: "naval", name: "Maritime", color: "#33d6c8", categories: ["naval"], model: "ship", pos: [7.5, 0, 4.5], onSea: true,
    about: "Surface ships and submarines that control the seas and the trade routes crossing them. A carrier or amphibious group is a sovereign, mobile base able to carry air power, missiles and sensors anywhere in the world without asking permission to land.",
    interfaces: "Projects air power and long-range strike from international waters, using over-the-horizon targeting from space, air and submarines." },
  { key: "land", name: "Land", color: "#f2a44e", categories: ["land"], model: "tank", pos: [-3.2, 0, 2.2], onLand: true,
    about: "The forces that seize and hold ground — the only way to truly control territory and populations. Armour, artillery and air-defence combine to break through enemy lines and defend what has been taken. Wars are ultimately decided here.",
    interfaces: "Holds the ground the other domains fight for; cued by ISR, shielded overhead by air-defence, moved and resupplied by air and sea." },
  { key: "missile", name: "Strike", color: "#ff6b6b", categories: ["missile"], model: "arty", pos: [1.6, 0, 3.6], onLand: true,
    about: "Guided missiles are the 'reach' of every domain — the effect at the end of the kill chain. They turn a detected target into a destroyed one, whether that's an aircraft overhead, a warship 300 km away or a bunker across a border.",
    interfaces: "Fired from land, air and sea platforms against tracks handed over by radar and space sensors." },
  { key: "cyber", name: "Cyber & C2", color: "#c9d4e0", categories: ["cyber", "radar"], model: "c2", pos: [0.4, 0, -0.4], onLand: true, hub: true,
    about: "The connective tissue of modern war: command systems, networks, sensors and the fight for the electromagnetic spectrum. Winning here lets a force see first, decide faster and act as one — losing it blinds and scatters everything else.",
    interfaces: "Links every sensor to every shooter, blinds the enemy's, and rides on space communications." },
];

// Curated sub-types per domain — clean names + a mapping to the raw
// product_type values, so the intermediate "type" level reads well and still
// filters the real catalogue. Anything unmatched falls into "Other Systems".
const SUBTYPES = {
  space: [
    { label: "Reconnaissance / ISR", icon: "satellite", types: ["reconnaissance_satellite", "sigint"], role: "Optical & signals intelligence from orbit.", def: "Satellites that photograph the Earth (optical or radar imaging) or intercept enemy signals (SIGINT). They give commanders intelligence on any point of the globe, day or night, without overflying with an aircraft." },
    { label: "Communications Sats", icon: "antenna", types: ["communications_satellite"], role: "Secure global connectivity for the force.", def: "Satellites that relay secure voice and data between headquarters and forces anywhere on Earth, including beyond line-of-sight and in remote theatres where no ground network exists." },
    { label: "Navigation (GNSS)", icon: "satellite", types: ["navigation_satellite"], role: "Positioning & timing that guide precision weapons.", def: "Constellations such as GPS and Galileo that broadcast precise position and timing. Everything from an infantry squad's map to a guided missile's terminal accuracy relies on them." },
    { label: "Early-Warning", icon: "radar", types: ["early_warning_satellite"], role: "Infrared eyes that spot missile launches.", def: "Satellites carrying infrared sensors that detect the hot exhaust plume of a missile launch within seconds of lift-off — the first, earliest warning a nation gets of an attack." },
    { label: "Space Vehicles", icon: "missile", types: ["spaceplane"], role: "Reusable spaceplanes & orbital platforms.", def: "Reusable spaceplanes and manoeuvring orbital platforms — the newest and still-emerging class of military space hardware, used to test payloads and operate flexibly in orbit." },
  ],
  air: [
    { label: "Fixed-Wing", icon: "fighter", types: ["fighter", "bomber", "attack", "gunship"], role: "Fighters & bombers for air superiority and deep strike.", def: "Jet aircraft with fixed wings: fighters that win air-to-air combat and bombers/attack jets that hit ground targets. They secure control of the sky and carry the heaviest, longest-range strike loads." },
    { label: "Rotary-Wing", icon: "heli", types: ["helicopter", "tiltrotor"], role: "Assault, transport & close support without runways.", def: "Helicopters and tiltrotors. Flying low and slow and landing without a runway, they carry out air-assault, transport, medical evacuation and anti-tank / close air support close to the troops." },
    { label: "UAVs / Drones", icon: "uav", types: ["uav", "loitering_munition"], role: "Persistent surveillance & strike, no pilot at risk.", def: "Uncrewed aircraft, flown remotely or autonomously, from hand-launched minis to large armed drones. They provide hours of persistent surveillance and precision strike without risking a pilot." },
    { label: "Support & ISR", icon: "transport", types: ["transport", "tanker", "awacs", "patrol", "reconnaissance"], role: "Tankers, transports & flying radars behind the campaign.", def: "The enablers that make an air campaign possible: tankers that refuel other aircraft in flight, transports that move troops and cargo, and flying radars (AWACS) that see and coordinate the whole air picture." },
  ],
  naval: [
    { label: "Aircraft Carriers", icon: "carrier", types: ["aircraft_carrier"], role: "Floating airbases projecting air power worldwide.", def: "A warship with a full-length flight deck that operates fixed-wing aircraft at sea. It projects air power thousands of kilometres from home without needing access to a friendly airbase — a nation's most visible symbol of reach." },
    { label: "Destroyers", icon: "destroyer", types: ["destroyer"], role: "Heavily-armed multi-mission air-defence & strike ships.", def: "Large, fast, heavily-armed surface combatants. Modern destroyers are the fleet's main air-defence and land-attack platforms, carrying powerful radars and dozens of missiles in vertical launch cells." },
    { label: "Frigates", icon: "frigate", types: ["frigate"], role: "Versatile escorts — the workhorses of the fleet.", def: "Mid-sized multi-role escorts, smaller than destroyers. They screen the fleet against submarines, aircraft and small craft and handle patrol and presence missions — the everyday workhorse of most navies." },
    { label: "Corvettes", icon: "corvette", types: ["corvette"], role: "Small, agile combatants for coastal & littoral waters.", def: "The smallest ocean-going warships, optimised for coastal and littoral waters. Cheap and agile, they patrol economic zones and defend the shore against fast attack craft and submarines." },
    { label: "Submarines", icon: "submarine", types: ["submarine"], role: "Silent undersea strike, ISR and deterrence.", def: "Vessels that operate hidden underwater. They conduct stealthy reconnaissance, sink ships, launch land-attack missiles and — for nuclear-armed states — form the survivable leg of nuclear deterrence." },
    { label: "Amphibious", icon: "amphibious", types: ["amphibious", "littoral_combat_ship"], role: "Put troops ashore and operate in the littorals.", def: "Ships that carry troops, vehicles and helicopters to put a landing force ashore, often through a flooded internal well-deck. They let a nation project ground power directly onto a hostile coast." },
    { label: "Naval Drones (USV/UUV)", icon: "navaldrone", types: ["usv", "uuv"], role: "Uncrewed surface & underwater vehicles extending the fleet.", def: "Uncrewed surface (USV) and underwater (UUV) vehicles. They extend the fleet's reach for mine-hunting, surveillance and strike while keeping crews out of the most dangerous waters." },
  ],
  land: [
    { label: "Main Battle Tanks", icon: "tank", types: ["tank", "mbt"], role: "The armoured fist — firepower, protection and shock.", def: "Heavily armoured tracked vehicles with a large-calibre gun. The tank delivers direct firepower, protection and shock action, leading the assault and breaking through prepared enemy defences." },
    { label: "IFV & APC", icon: "ifv", types: ["ifv", "apc", "armored_vehicle", "active_protection", "autocannon"], role: "Carry and support infantry under armour.", def: "Armoured vehicles that carry infantry into battle. APCs are protected 'battle taxis'; IFVs (infantry fighting vehicles) add a cannon and missiles so they can fight alongside the soldiers they carry." },
    { label: "Artillery & MLRS", icon: "artillery", types: ["artillery", "mlrs"], role: "Massed and precision fires that shape the battle.", def: "Guns and rocket launchers that deliver fires from far behind the front line — from towed howitzers to precision rocket systems like HIMARS. Artillery causes the majority of casualties in high-intensity war." },
    { label: "Reconnaissance", icon: "recon", types: ["reconnaissance", "tactical_vehicle"], role: "Fast, light vehicles that find the enemy first.", def: "Fast, light vehicles that scout ahead of the main force to find the enemy, identify targets and report back before commanders commit their heavier units." },
    { label: "Autonomous (UGV)", icon: "ugv", types: ["ugv"], role: "Ground robots for recon, logistics & dangerous work.", def: "Uncrewed ground vehicles — robots used for reconnaissance, logistics resupply and dangerous tasks such as mine clearance, keeping soldiers out of the line of fire." },
  ],
  missile: [
    { label: "Air Defence (SAM)", icon: "sam", types: ["sam", "shorad", "manpads", "anti_ballistic"], role: "The shield that denies the sky to aircraft & missiles.", def: "Surface-to-air missiles that detect and destroy aircraft, drones and incoming missiles. Layered from short-range to long-range, they form the 'shield' that denies an enemy the use of the sky." },
    { label: "Cruise & Ballistic", icon: "missile", types: ["cruise_missile", "precision_strike", "hypersonic", "ballistic_missile"], role: "Long-range precision, from cruise to hypersonic.", def: "Long-range strike missiles. Cruise missiles fly low and precise like a small aircraft; ballistic missiles arc through the upper atmosphere at high speed. Both hit high-value targets deep in enemy territory." },
    { label: "Anti-Ship", icon: "missile", types: ["anti_ship", "air_to_ship"], role: "Ship-killers launched from sea, air or coast.", def: "Missiles designed to cripple or sink warships, launched from ships, aircraft, submarines or coastal batteries — the primary means of contesting control of the sea." },
    { label: "Air-to-Air", icon: "airair", types: ["air_to_air"], role: "The fighter's teeth — kill other aircraft.", def: "Missiles carried by fighters to destroy other aircraft — either beyond visual range with radar guidance, or in a close dogfight with heat-seeking infrared guidance." },
    { label: "Air-to-Ground", icon: "missile", types: ["air_to_ground", "anti_tank", "atgm", "anti_radiation"], role: "Precision munitions vs tanks, bunkers & radars.", def: "Precision munitions dropped or fired from aircraft and vehicles to destroy tanks, bunkers, vehicles and — with anti-radiation seekers — enemy air-defence radars." },
    { label: "Loitering Munitions", icon: "uav", types: ["loitering_munition"], role: "'Kamikaze' drones that hunt then dive on the target.", def: "'Kamikaze drones' that fly over an area searching for a target, then dive into it and detonate. They blur the line between a reconnaissance drone and a guided missile." },
  ],
  cyber: [
    { label: "Command & Control", icon: "software", types: ["software"], role: "Battle-management that fuses every sensor & shooter.", def: "The software and battle-management systems that fuse data from every sensor into a single common picture and help commanders decide and direct forces in real time." },
    { label: "Electronic Warfare", icon: "ew", types: ["electronic_warfare"], role: "Jam, deceive and blind enemy radars & comms.", def: "Systems that attack and defend across the radio spectrum — jamming enemy radars and communications, deceiving their sensors, and protecting friendly signals from the same." },
    { label: "Directed Energy", icon: "laser", types: ["directed_energy", "c_uas"], role: "Lasers & microwaves that swat drones at light speed.", def: "Lasers and high-power microwaves that destroy or disable targets at the speed of light. They are increasingly used to shoot down drones and rockets cheaply, shot after shot." },
    { label: "Communications", icon: "antenna", types: ["communications", "surveillance"], role: "Resilient links carrying orders across the force.", def: "The resilient, secure radio and data links that carry orders and sensor data across a dispersed force — the nervous system that lets separate units act as one." },
    { label: "Airborne Radar", icon: "radar", types: ["airborne_radar", "multimode_radar"], role: "Flying sensors that see over the horizon.", def: "Radars mounted on aircraft. Flying high, they see far further than ground radar and can track low-flying targets hidden from the surface by the horizon or terrain." },
    { label: "Naval Radar", icon: "radar", types: ["naval_radar"], role: "A warship's eyes in every direction at once.", def: "A warship's primary sensors, scanning in every direction for aircraft, missiles and ships, and cueing the ship's air-defence and strike weapons." },
    { label: "Ground-Based Radar", icon: "radar", types: ["air_surveillance", "radar", "ballistic_missile_radar"], role: "Fixed & mobile radars guarding the airspace.", def: "Fixed and mobile radars that guard national airspace and cue air-defence, including specialised long-range radars that detect and track incoming ballistic missiles." },
  ],
};

// Compact 2D silhouettes for the sub-type cards (viewBox 0 0 48 30).
const SILH = {
  carrier: '<path d="M4 20 H44 L40 26 H8 Z"/><rect x="6" y="16" width="34" height="3"/><rect x="30" y="8" width="5" height="8"/><path d="M13 16 l3 -4 h4 l2 4"/>',
  destroyer: '<path d="M4 18 H43 L37 25 H9 Z"/><path d="M25 18 l2 -12 h6 l2 12"/><line x1="29" y1="6" x2="29" y2="2"/><rect x="8" y="14" width="6" height="4"/>',
  frigate: '<path d="M5 19 H42 L37 25 H10 Z"/><path d="M22 19 l2 -9 h8 l2 9"/><line x1="27" y1="10" x2="27" y2="5"/>',
  corvette: '<path d="M11 20 H37 L33 25 H15 Z"/><path d="M22 20 l2 -6 h6 l1 6"/><line x1="26" y1="14" x2="26" y2="9"/>',
  submarine: '<path d="M6 16 Q6 11 24 11 Q42 11 42 16 Q42 21 24 21 Q6 21 6 16 Z"/><path d="M20 11 v-5 h7 v5"/><line x1="23" y1="6" x2="23" y2="2"/>',
  amphibious: '<path d="M5 18 H43 L40 25 H8 Z"/><rect x="12" y="10" width="20" height="8"/><path d="M43 18 l3 -3"/>',
  navaldrone: '<path d="M8 18 Q8 15 26 15 L40 15 L36 22 H12 Z"/><rect x="20" y="10" width="4" height="5"/><path d="M40 15 a6 6 0 0 1 5 4"/>',
  fighter: '<path d="M4 15 L30 12 L44 9 L44 13 L32 17 L22 17 L16 26 L12 26 L16 17 L4 19 Z"/>',
  heli: '<line x1="8" y1="8" x2="40" y2="8"/><path d="M16 12 q0 -3 12 -3 q14 0 16 4 q0 5 -14 5 q-16 0 -16 -4 Z"/><path d="M44 14 l3 -3"/><line x1="24" y1="8" x2="24" y2="12"/>',
  uav: '<line x1="6" y1="13" x2="42" y2="13"/><line x1="24" y1="6" x2="24" y2="24"/><circle cx="24" cy="9" r="2.5"/><path d="M24 24 l-4 4 M24 24 l4 4"/>',
  transport: '<ellipse cx="22" cy="14" rx="20" ry="3"/><line x1="12" y1="8" x2="30" y2="12"/><line x1="12" y1="20" x2="30" y2="16"/>',
  tank: '<rect x="5" y="18" width="34" height="7" rx="3.5"/><path d="M9 18 v-5 h24 v5"/><path d="M16 13 v-5 h10 l1 5"/><line x1="26" y1="9" x2="45" y2="9"/>',
  ifv: '<rect x="6" y="18" width="30" height="7" rx="2"/><path d="M8 18 v-7 h22 l4 7"/><line x1="24" y1="11" x2="40" y2="8"/>',
  artillery: '<rect x="6" y="18" width="30" height="7" rx="2"/><rect x="8" y="12" width="12" height="6"/><line x1="18" y1="14" x2="43" y2="4"/>',
  recon: '<rect x="8" y="15" width="26" height="7" rx="3"/><path d="M12 15 v-5 h14 l3 5"/><circle cx="14" cy="24" r="2"/><circle cx="30" cy="24" r="2"/>',
  ugv: '<rect x="12" y="17" width="20" height="6" rx="3"/><rect x="16" y="12" width="10" height="5"/><line x1="26" y1="9" x2="26" y2="12"/>',
  missile: '<path d="M22 27 V11 Q24 4 26 11 V27 Z"/><path d="M22 21 l-4 5 h4 M26 21 l4 5 h-4"/>',
  sam: '<rect x="6" y="20" width="24" height="5" rx="2"/><g transform="rotate(-38 20 20)"><rect x="17" y="6" width="6" height="15"/><path d="M17 6 l3 -4 l3 4"/></g>',
  airair: '<path d="M6 15 H36 L44 15 L36 18 H6 Z"/><path d="M10 15 l-3 -4 M10 18 l-3 4"/>',
  radar: '<line x1="20" y1="26" x2="20" y2="16"/><path d="M12 28 H28"/><ellipse cx="19" cy="12" rx="4" ry="9" transform="rotate(-35 19 12)"/><path d="M28 4 a10 10 0 0 1 5 8"/>',
  antenna: '<path d="M24 26 V8"/><path d="M18 14 a8 8 0 0 1 12 0"/><path d="M15 11 a13 13 0 0 1 18 0"/><circle cx="24" cy="8" r="2"/>',
  ew: '<path d="M12 22 l8 -14 l8 14 Z"/><path d="M31 10 a8 8 0 0 1 0 12 M35 6 a14 14 0 0 1 0 20"/>',
  laser: '<circle cx="15" cy="15" r="6"/><line x1="21" y1="15" x2="45" y2="15" stroke-width="3"/>',
  software: '<rect x="14" y="8" width="20" height="16" rx="2"/><rect x="20" y="14" width="8" height="4"/><path d="M14 12 h-4 M14 20 h-4 M34 12 h4 M34 20 h4 M18 8 v-4 M30 8 v-4"/>',
  satellite: '<rect x="20" y="10" width="8" height="10" rx="1"/><rect x="6" y="12" width="12" height="6"/><rect x="30" y="12" width="12" height="6"/><path d="M24 10 v-4"/>',
  default: '<circle cx="24" cy="15" r="8"/>',
};
function Silh({ name }) {
  return (
    <svg viewBox="0 0 48 30" width="30" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" dangerouslySetInnerHTML={{ __html: SILH[name] || SILH.default }} />
  );
}

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

  // products of the active domain, grouped into curated sub-types
  const domainSubtypes = useMemo(() => {
    if (!activeDomain) return [];
    const inDomain = products.filter((p) => activeDomain.categories.includes(p.category));
    const defs = SUBTYPES[activeDomain.key] || [];
    const used = new Set();
    const cards = defs.map((st) => {
      const items = inDomain.filter((p) => st.types.includes(p.product_type));
      items.forEach((p) => used.add(p.id));
      return { ...st, items };
    }).filter((c) => c.items.length > 0);
    const others = inDomain.filter((p) => !used.has(p.id));
    if (others.length) cards.push({ label: "Other Systems", icon: "default", role: "Additional systems in this domain.", items: others });
    return cards;
  }, [activeDomain, products]);

  const activeTypeGroup = nav.type ? domainSubtypes.find((g) => g.label === nav.type) : null;

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
                  <div className="bt-count">{counts[activeDomain.key] || 0} systems · {domainSubtypes.length} types</div>
                  <p className="bt-role">{activeDomain.about}</p>
                  <p className="bt-works"><span className="bt-workslabel">Works with</span>{activeDomain.interfaces}</p>
                  <div className="bt-k">Explore by type</div>
                  <div className="bt-cards">
                    {domainSubtypes.map((st) => (
                      <button key={st.label} className="bt-card" onClick={() => setNav((n) => ({ ...n, type: st.label }))}>
                        <span className="bt-cardic" style={{ color: activeDomain.color }}><Silh name={st.icon} /></span>
                        <span className="bt-cardbody">
                          <span className="bt-cardtop">
                            <span className="bt-cardlabel">{st.label}</span>
                            <span className="bt-cardcount">{st.items.length}</span>
                          </span>
                          <span className="bt-cardrole">{st.role}</span>
                        </span>
                        <ArrowRight size={15} className="bt-cardarw" />
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
                  {activeTypeGroup.def && <p className="bt-def">{activeTypeGroup.def}</p>}
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
.bt-role{font-size:13px;color:#a9bccb;line-height:1.6;margin:14px 0 4px}
.bt-works{font-size:12px;color:#8ba0b5;line-height:1.5;margin:10px 0 4px;border-left:2px solid rgba(51,214,200,.4);padding-left:11px}
.bt-workslabel{color:#7fe6db;font-weight:700;text-transform:uppercase;font-size:9.5px;letter-spacing:.08em;margin-right:6px}
.bt-def{font-size:13px;color:#c4d2de;line-height:1.65;margin:12px 0 4px;background:rgba(255,255,255,.03);border:1px solid var(--line);border-radius:10px;padding:12px 14px}
.bt-k{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#6f8496;margin:18px 0 8px}
.bt-cards{display:flex;flex-direction:column;gap:8px;margin-top:8px}
.bt-card{display:flex;align-items:center;gap:12px;text-align:left;background:rgba(255,255,255,.04);border:1px solid var(--line);border-radius:12px;padding:11px 13px;cursor:pointer;font:inherit;color:#e6edf5;transition:.15s}
.bt-card:hover{border-color:var(--teal);background:rgba(51,214,200,.07);transform:translateY(-1px)}
.bt-cardic{width:46px;height:36px;flex:0 0 46px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.05);border:1px solid var(--line);border-radius:9px}
.bt-cardbody{display:flex;flex-direction:column;gap:2px;min-width:0;flex:1}
.bt-cardtop{display:flex;align-items:center;gap:8px}
.bt-cardlabel{font-size:13.5px;font-weight:600;color:#eef4fa}
.bt-cardcount{font-family:ui-monospace,Menlo,monospace;font-size:11px;color:#7fe6db;background:rgba(51,214,200,.1);border-radius:999px;padding:1px 7px}
.bt-cardrole{font-size:11.5px;color:#8ba0b5;line-height:1.4}
.bt-cardarw{color:#5a6b7a;flex:0 0 auto}
.bt-card:hover .bt-cardarw{color:var(--teal)}
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
