import { useMemo } from "react";
import {
  Satellite, Plane, Ship, Rocket, Radio, Cpu, Target, Shield, Anchor,
  Eye, Network, ArrowRight, ChevronRight, Crosshair, Radar, Layers,
} from "lucide-react";

/**
 * BattlespaceOverview
 * ---------------------------------------------------------------------------
 * A "first page" for the Products section. Instead of dropping the user
 * straight into a grid of ~140 systems, it explains the battlespace: what the
 * macro domains are (Land, Air, Maritime, Strike, Sensors, Cyber/EW, Space),
 * what each one does in combat, how they collaborate (the "kill chain"), and
 * how many products sit inside each. Every domain card links into the catalog,
 * pre-filtered on that category.
 *
 * Props:
 *   products        Array of product objects (used only to count per category).
 *   onSelectDomain  (categoryValue) => void — switch to the catalog filtered.
 *   onExploreAll    () => void — switch to the full catalog, no filter.
 */

// ── The seven macro domains ────────────────────────────────────────────────
// `key` maps 1:1 to the product `category` field so filtering stays exact.
const DOMAINS = [
  {
    key: "land",
    name: "Land Systems",
    Icon: Target,
    role: "Seize, hold and control terrain — the decisive domain where wars are ultimately won or lost.",
    macro: ["Main Battle Tanks", "IFV & APC", "Artillery & MLRS", "Ground Air-Defense", "Reconnaissance", "Autonomous UGV"],
    interfaces: "Cued by radar & satellites, shielded overhead by air-defense, moved and resupplied by air/sea lift, strikes deep with rockets.",
    chain: "Effect",
    accent: { icon: "text-amber-700", chip: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500", ring: "group-hover:border-amber-300" },
  },
  {
    key: "aircraft",
    name: "Air Power",
    Icon: Plane,
    role: "Win air superiority, strike deep, move troops and cargo, and keep a persistent eye over the battlefield.",
    macro: ["Fighters", "Bombers", "UAVs / Drones", "Rotary-Wing", "Transport & Tankers", "ISR & AWACS"],
    interfaces: "Guided by AWACS & space, protected from SAMs by electronic warfare, delivers munitions onto targets that sensors found.",
    chain: "Sense + Effect",
    accent: { icon: "text-blue-700", chip: "bg-blue-50 text-blue-700 border-blue-200", dot: "bg-blue-500", ring: "group-hover:border-blue-300" },
  },
  {
    key: "naval",
    name: "Maritime / Naval",
    Icon: Ship,
    role: "Control the seas, project power from the water, and secure the global trade and supply lines armies depend on.",
    macro: ["Aircraft Carriers", "Destroyers & Frigates", "Submarines", "Corvettes", "Amphibious", "Unmanned USV / UUV"],
    interfaces: "A mobile base for every domain: carriers launch air power, destroyers carry missiles & radar, submarines strike unseen.",
    chain: "Effect",
    accent: { icon: "text-cyan-700", chip: "bg-cyan-50 text-cyan-700 border-cyan-200", dot: "bg-cyan-500", ring: "group-hover:border-cyan-300" },
  },
  {
    key: "missile",
    name: "Strike & Missiles",
    Icon: Rocket,
    role: "Deliver precise long-range effects — from downing an aircraft to hitting a target thousands of kilometres away.",
    macro: ["Air Defense (SAM)", "Cruise & Ballistic", "Anti-Ship", "Air-to-Air", "Air-to-Ground", "Loitering Munitions"],
    interfaces: "The 'effector' of the kill chain — fired by land, air and sea platforms against tracks handed over by radar & space.",
    chain: "Effect",
    accent: { icon: "text-rose-700", chip: "bg-rose-50 text-rose-700 border-rose-200", dot: "bg-rose-500", ring: "group-hover:border-rose-300" },
  },
  {
    key: "radar",
    name: "Sensors & Radar",
    Icon: Radio,
    role: "Detect, track and identify — the eyes that turn the fog of war into precise targeting data.",
    macro: ["Airborne Radar", "Naval Radar", "Ground-Based Radar", "Early-Warning"],
    interfaces: "Feed tracks to command & control, cue missiles and air-defense, and fuse with space & EW into one common picture.",
    chain: "Sense",
    accent: { icon: "text-teal-700", chip: "bg-teal-50 text-teal-700 border-teal-200", dot: "bg-teal-500", ring: "group-hover:border-teal-300" },
  },
  {
    key: "cyber",
    name: "Cyber & EW",
    Icon: Cpu,
    role: "Fight for the electromagnetic spectrum and the networks — jam, deceive, hack and protect the data everything relies on.",
    macro: ["Electronic Warfare", "Cyber & Software", "Directed Energy", "Communications", "C2 / AI Platforms"],
    interfaces: "The invisible glue: protects friendly sensors & comms, blinds enemy radar, and links every domain into a single network.",
    chain: "Decide",
    accent: { icon: "text-slate-700", chip: "bg-slate-100 text-slate-700 border-slate-200", dot: "bg-slate-500", ring: "group-hover:border-slate-400" },
  },
  {
    key: "space",
    name: "Space",
    Icon: Satellite,
    role: "Hold the ultimate high ground — global surveillance, navigation and communications from orbit.",
    macro: ["Reconnaissance / ISR", "Communications Sats", "Navigation (GNSS)", "Early-Warning", "Space Vehicles"],
    interfaces: "Enables everything below: GPS guides the missiles, sat-comms link the force, orbital sensors give the first warning.",
    chain: "Sense + Decide",
    accent: { icon: "text-indigo-700", chip: "bg-indigo-50 text-indigo-700 border-indigo-200", dot: "bg-indigo-500", ring: "group-hover:border-indigo-300" },
  },
];

// ── The four steps of the kill chain (multi-domain operations) ──────────────
const KILL_CHAIN = [
  { step: "Sense", Icon: Eye, color: "text-teal-700 bg-teal-50 border-teal-200", desc: "Find & track the target", who: "Space · Radar · ISR aircraft" },
  { step: "Decide", Icon: Network, color: "text-slate-700 bg-slate-100 border-slate-200", desc: "Fuse data, choose the shooter", who: "Cyber · C2 · AI" },
  { step: "Effect", Icon: Crosshair, color: "text-rose-700 bg-rose-50 border-rose-200", desc: "Strike the target", who: "Missiles · Air · Land · Sea" },
  { step: "Assess", Icon: Target, color: "text-blue-700 bg-blue-50 border-blue-200", desc: "Confirm the result, re-engage", who: "ISR · Sensors" },
];

// ── Diagram nodes ───────────────────────────────────────────────────────────
// All coordinates are percentages of the diagram box (0–100 on both axes).
// The overlay <div>s and the SVG connector lines share these numbers, so they
// always line up regardless of screen size (SVG uses preserveAspectRatio=none).
const NODES = {
  sat:       { x: 74, y: 12, Icon: Satellite, label: "Recon Sat",   accent: "text-indigo-700", kind: "sense" },
  awacs:     { x: 30, y: 27, Icon: Radar,     label: "AWACS / ISR", accent: "text-blue-700",   kind: "sense" },
  fighter:   { x: 55, y: 32, Icon: Plane,     label: "Fighter",     accent: "text-blue-700",   kind: "effect" },
  c2:        { x: 50, y: 51, Icon: Network,   label: "Command & Control", accent: "text-slate-800", kind: "hub" },
  radar:     { x: 20, y: 63, Icon: Radio,     label: "Radar",       accent: "text-teal-700",   kind: "sense" },
  sam:       { x: 37, y: 66, Icon: Rocket,    label: "Air Defense", accent: "text-rose-700",   kind: "effect" },
  tank:      { x: 9,  y: 70, Icon: Target,    label: "Armour",      accent: "text-amber-700",  kind: "effect" },
  ship:      { x: 72, y: 63, Icon: Ship,      label: "Destroyer",   accent: "text-cyan-700",   kind: "effect" },
  sub:       { x: 84, y: 85, Icon: Anchor,    label: "Submarine",   accent: "text-cyan-800",   kind: "effect" },
};

// Connectors: sensors feed C2 (blue "sense"), C2 cues shooters (rose "effect").
const LINKS = [
  { from: "sat", to: "c2", kind: "sense" },
  { from: "awacs", to: "c2", kind: "sense" },
  { from: "radar", to: "c2", kind: "sense" },
  { from: "c2", to: "fighter", kind: "effect" },
  { from: "c2", to: "sam", kind: "effect" },
  { from: "c2", to: "tank", kind: "effect" },
  { from: "c2", to: "ship", kind: "effect" },
  { from: "c2", to: "sub", kind: "effect" },
];

// Horizontal layer bands drawn behind the nodes (y ranges in %).
const LAYERS = [
  { label: "ORBIT",   top: 0,  height: 20, fill: "#eef2ff" },  // indigo-50
  { label: "AIR",     top: 20, height: 26, fill: "#f8fafc" },  // slate-50
  { label: "SURFACE", top: 46, height: 28, fill: "#ffffff" },
  { label: "UNDERSEA",top: 74, height: 26, fill: "#ecfeff" },  // cyan-50
];

function DiagramNode({ node }) {
  const { x, y, Icon, label, accent, kind } = node;
  const isHub = kind === "hub";
  return (
    <div
      className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div
        className={`flex items-center justify-center rounded-full bg-white shadow-sm ${
          isHub ? "w-12 h-12 border-2 border-slate-800" : "w-9 h-9 border border-slate-200"
        }`}
      >
        <Icon className={`${isHub ? "w-6 h-6" : "w-4 h-4"} ${accent}`} />
      </div>
      <span
        className={`mt-1 px-1.5 py-0.5 rounded text-[10px] font-medium leading-none whitespace-nowrap ${
          isHub ? "bg-slate-800 text-white" : "bg-white/80 text-slate-600"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export default function BattlespaceOverview({ products = [], onSelectDomain, onExploreAll }) {
  // Live product count per category.
  const counts = useMemo(() => {
    const c = {};
    for (const p of products) c[p.category] = (c[p.category] || 0) + 1;
    return c;
  }, [products]);

  return (
    <div className="space-y-8">
      {/* ── Intro ─────────────────────────────────────────────────────── */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-800 bg-blue-50 border border-blue-200 rounded-full px-3 py-1">
          <Layers className="w-3.5 h-3.5" />
          The Battlespace
        </div>
        <h2 className="font-heading text-2xl font-bold text-slate-900 mt-3">
          How the domains fight together
        </h2>
        <p className="text-slate-500 text-sm mt-2 leading-relaxed">
          Modern warfare is <span className="font-medium text-slate-700">multi-domain</span>: no single
          system wins alone. Sensors in space and the air find the target, command &amp; control decides,
          and shooters on land, at sea and in the air deliver the effect. Explore each macro domain below —
          what it does, how it collaborates, and the systems inside it.
        </p>
      </div>

      {/* ── Hero battlespace diagram ──────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="px-5 pt-4 pb-2 flex items-center justify-between flex-wrap gap-2">
          <div>
            <p className="text-sm font-semibold text-slate-900">The kill chain, layer by layer</p>
            <p className="text-xs text-slate-500">Sensors feed Command &amp; Control, which cues the shooters across every domain.</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-4 h-0.5 rounded-full" style={{ background: "#2563eb" }} /> Sense (data in)
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-4 h-0.5 rounded-full" style={{ background: "#e11d48" }} /> Effect (orders out)
            </span>
          </div>
        </div>

        <div className="relative w-full" style={{ aspectRatio: "12 / 5" }}>
          {/* Background layer bands + connector lines (SVG, stretched to fill) */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {LAYERS.map((l) => (
              <rect key={l.label} x="0" y={l.top} width="100" height={l.height} fill={l.fill} />
            ))}
            {/* waterline */}
            <line x1="0" y1="46" x2="100" y2="46" stroke="#cbd5e1" strokeWidth="0.3" vectorEffect="non-scaling-stroke" strokeDasharray="2 1.5" />
            {LINKS.map((lk, i) => {
              const a = NODES[lk.from], b = NODES[lk.to];
              const stroke = lk.kind === "sense" ? "#2563eb" : "#e11d48";
              return (
                <line
                  key={i}
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke={stroke}
                  strokeWidth="1.4"
                  strokeOpacity="0.55"
                  strokeDasharray="3 2"
                  vectorEffect="non-scaling-stroke"
                >
                  <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.2s" repeatCount="indefinite" />
                </line>
              );
            })}
          </svg>

          {/* Layer labels (left edge) */}
          {LAYERS.map((l) => (
            <span
              key={l.label}
              className="absolute left-2 text-[9px] font-semibold uppercase tracking-widest text-slate-400 -translate-y-1/2"
              style={{ top: `${l.top + l.height / 2}%` }}
            >
              {l.label}
            </span>
          ))}

          {/* Nodes */}
          {Object.entries(NODES).map(([id, node]) => (
            <DiagramNode key={id} node={node} />
          ))}
        </div>
      </div>

      {/* ── Kill-chain strip ──────────────────────────────────────────── */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
          The kill chain — four steps, every mission
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {KILL_CHAIN.map((k, i) => {
            const Icon = k.Icon;
            return (
              <div key={k.step} className="relative bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${k.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{k.step}</p>
                    <p className="text-xs text-slate-500">{k.desc}</p>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mt-3 font-mono">{k.who}</p>
                {i < KILL_CHAIN.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 bg-slate-50 rounded-full" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Domain "labels" ───────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            The seven macro domains
          </p>
          <button
            onClick={onExploreAll}
            className="text-xs font-medium text-blue-800 hover:text-blue-900 flex items-center gap-1"
          >
            Browse the full catalog <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {DOMAINS.map((d) => {
            const Icon = d.Icon;
            const count = counts[d.key] || 0;
            return (
              <button
                key={d.key}
                onClick={() => onSelectDomain(d.key)}
                className={`group text-left bg-white border border-slate-200 rounded-xl p-5 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:shadow-lg ${d.accent.ring} transition-all flex flex-col`}
              >
                {/* header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                      <Icon className={`w-6 h-6 ${d.accent.icon}`} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-slate-900 leading-tight">{d.name}</h3>
                      <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        <span className={`w-1.5 h-1.5 rounded-full ${d.accent.dot}`} />
                        {d.chain}
                      </span>
                    </div>
                  </div>
                  <span className="shrink-0 text-right">
                    <span className="block font-mono text-xl font-bold text-slate-900">{count}</span>
                    <span className="block text-[10px] uppercase tracking-wider text-slate-400">systems</span>
                  </span>
                </div>

                {/* role */}
                <p className="text-sm text-slate-600 leading-relaxed mt-3">{d.role}</p>

                {/* macro categories */}
                <div className="mt-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Inside this domain</p>
                  <div className="flex flex-wrap gap-1.5">
                    {d.macro.map((m) => (
                      <span key={m} className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${d.accent.chip}`}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* interfaces */}
                <div className="mt-3 flex items-start gap-2 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">
                  <Network className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                  <p className="text-[11px] text-slate-500 leading-relaxed">{d.interfaces}</p>
                </div>

                {/* footer */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400 group-hover:text-slate-600 transition-colors">
                    Explore products
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-blue-800 group-hover:gap-2 transition-all">
                    View <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
