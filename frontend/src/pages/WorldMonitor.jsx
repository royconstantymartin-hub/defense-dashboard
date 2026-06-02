import { useEffect, useRef, useState, useCallback } from "react";
import { AlertTriangle, Zap, Crosshair, Radio, Globe2, RefreshCw, Filter } from "lucide-react";

// ── Mock GDELT-style incident data ────────────────────────────────────────────
// In production: fetch from GDELT API or ACLED
const MOCK_INCIDENTS = [
  // Ukraine / Russia
  { id: 1, lat: 48.3794, lng: 31.1656, type: "combat", label: "Combat operations", region: "Ukraine", intensity: 9, date: "2026-06-02", source: "ACLED" },
  { id: 2, lat: 47.9,   lng: 37.5,    type: "strike", label: "Artillery strike reported", region: "Donetsk", intensity: 8, date: "2026-06-02", source: "ISW" },
  { id: 3, lat: 50.4,   lng: 30.5,    type: "strike", label: "Air defense activation", region: "Kyiv", intensity: 6, date: "2026-06-01", source: "Liveuamap" },
  { id: 4, lat: 46.9,   lng: 32.0,    type: "combat", label: "Front line movement", region: "Kherson", intensity: 7, date: "2026-06-02", source: "ACLED" },
  // Gaza / Middle East
  { id: 5, lat: 31.5,   lng: 34.47,   type: "strike", label: "Airstrikes reported", region: "Gaza Strip", intensity: 9, date: "2026-06-02", source: "Reuters" },
  { id: 6, lat: 31.77,  lng: 35.21,   type: "political", label: "Security cabinet meeting", region: "Jerusalem", intensity: 3, date: "2026-06-01", source: "Haaretz" },
  { id: 7, lat: 33.85,  lng: 35.86,   type: "strike", label: "Cross-border exchange", region: "Lebanon", intensity: 6, date: "2026-06-02", source: "ACLED" },
  // Sudan
  { id: 8, lat: 15.55,  lng: 32.53,   type: "combat", label: "RSF-SAF clashes", region: "Khartoum", intensity: 8, date: "2026-06-02", source: "ACLED" },
  { id: 9, lat: 13.5,   lng: 22.4,    type: "humanitarian", label: "Displacement crisis", region: "Darfur", intensity: 7, date: "2026-06-01", source: "ReliefWeb" },
  // Myanmar
  { id: 10, lat: 21.9,  lng: 96.0,    type: "combat", label: "Resistance operations", region: "Sagaing", intensity: 7, date: "2026-06-02", source: "ACLED" },
  // Sahel
  { id: 11, lat: 14.0,  lng: -2.0,    type: "combat", label: "Armed group activity", region: "Mali", intensity: 6, date: "2026-06-01", source: "ACLED" },
  { id: 12, lat: 12.36, lng: 1.53,    type: "combat", label: "Security incident", region: "Burkina Faso", intensity: 7, date: "2026-06-02", source: "ACLED" },
  // Yemen
  { id: 13, lat: 15.35, lng: 44.2,    type: "strike", label: "Houthi drone activity", region: "Yemen", intensity: 8, date: "2026-06-02", source: "ISW" },
  // Somalia
  { id: 14, lat: 2.04,  lng: 45.34,   type: "combat", label: "Al-Shabaab attack", region: "Mogadishu", intensity: 7, date: "2026-06-01", source: "ACLED" },
  // Ethiopia
  { id: 15, lat: 13.5,  lng: 39.5,    type: "political", label: "Tensions reported", region: "Tigray", intensity: 4, date: "2026-06-01", source: "ReliefWeb" },
  // DRC
  { id: 16, lat: -1.67, lng: 29.22,   type: "combat", label: "M23 clashes", region: "North Kivu", intensity: 8, date: "2026-06-02", source: "ACLED" },
  // Pakistan / India
  { id: 17, lat: 30.37, lng: 76.77,   type: "political", label: "Border tension", region: "Punjab border", intensity: 4, date: "2026-06-01", source: "Reuters" },
  // Taiwan Strait
  { id: 18, lat: 24.0,  lng: 120.96,  type: "political", label: "PLA patrol activity", region: "Taiwan Strait", intensity: 5, date: "2026-06-02", source: "Reuters" },
  // South China Sea
  { id: 19, lat: 11.0,  lng: 114.0,   type: "political", label: "Maritime dispute", region: "South China Sea", intensity: 5, date: "2026-06-02", source: "CSIS" },
  // Haiti
  { id: 20, lat: 18.54, lng: -72.33,  type: "combat", label: "Gang violence surge", region: "Port-au-Prince", intensity: 7, date: "2026-06-02", source: "ACLED" },
];

const TYPE_CONFIG = {
  combat:      { color: "#ef4444", label: "Combat",      icon: Crosshair },
  strike:      { color: "#f97316", label: "Frappe",      icon: Zap },
  political:   { color: "#3b82f6", label: "Politique",   icon: Radio },
  humanitarian:{ color: "#a855f7", label: "Humanitaire", icon: AlertTriangle },
};

const INTENSITY_LABELS = ["", "", "Faible", "Faible", "Modéré", "Modéré", "Élevé", "Élevé", "Critique", "Critique", "Extrême"];

export default function WorldMonitor() {
  const containerRef = useRef(null);
  const globeRef = useRef(null);
  const [GlobeComponent, setGlobeComponent] = useState(null);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [globeReady, setGlobeReady] = useState(false);

  // Dynamically import react-globe.gl (uses Three.js, needs browser env)
  useEffect(() => {
    import("react-globe.gl").then((mod) => {
      setGlobeComponent(() => mod.default);
    });
  }, []);

  const filtered = filter === "all"
    ? MOCK_INCIDENTS
    : MOCK_INCIDENTS.filter((i) => i.type === filter);

  const handlePointClick = useCallback((point) => {
    setSelected(point);
  }, []);

  const handleRefresh = () => {
    setLastRefresh(new Date());
    // Future: re-fetch GDELT/ACLED here
  };

  const totalCritical = MOCK_INCIDENTS.filter((i) => i.intensity >= 8).length;
  const totalCombat   = MOCK_INCIDENTS.filter((i) => i.type === "combat").length;

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-hidden" style={{ minHeight: "calc(100vh - 64px)" }}>

      {/* ── WIP Banner ── */}
      <div className="bg-amber-500/20 border-b border-amber-500/30 px-4 py-2 flex items-center gap-2 text-amber-300 text-xs font-mono shrink-0">
        <AlertTriangle size={13} />
        <span>WORK IN PROGRESS — Données simulées (ACLED/GDELT non connectés). Mise à jour en temps réel à venir.</span>
      </div>

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <Globe2 size={20} className="text-blue-400" />
          <div>
            <h1 className="text-sm font-bold tracking-wider uppercase text-slate-100">World Monitor</h1>
            <p className="text-xs text-slate-500 font-mono">Conflits & incidents globaux</p>
          </div>
          <span className="ml-2 px-2 py-0.5 bg-rose-500/20 text-rose-400 text-xs font-mono rounded border border-rose-500/30 animate-pulse">
            ● LIVE SIM
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 font-mono">
            Màj {lastRefresh.toLocaleTimeString("fr-FR")}
          </span>
          <button
            onClick={handleRefresh}
            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="flex gap-0 border-b border-slate-800 shrink-0">
        {[
          { label: "Incidents actifs", value: MOCK_INCIDENTS.length, color: "text-slate-200" },
          { label: "Critiques (≥8)", value: totalCritical, color: "text-rose-400" },
          { label: "Combats actifs", value: totalCombat, color: "text-orange-400" },
          { label: "Pays touchés",  value: new Set(MOCK_INCIDENTS.map(i => i.region.split(",")[0])).size, color: "text-blue-400" },
        ].map((s) => (
          <div key={s.label} className="flex-1 px-4 py-2.5 border-r border-slate-800 last:border-r-0">
            <div className={`text-lg font-bold font-mono ${s.color}`}>{s.value}</div>
            <div className="text-xs text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Main layout ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Globe */}
        <div className="flex-1 relative overflow-hidden" ref={containerRef}>
          {GlobeComponent ? (
            <GlobeComponent
              ref={globeRef}
              width={containerRef.current?.clientWidth || 800}
              height={containerRef.current?.clientHeight || 600}
              backgroundColor="rgba(2,6,23,1)"
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
              atmosphereColor="#1e40af"
              atmosphereAltitude={0.15}
              pointsData={filtered}
              pointLat="lat"
              pointLng="lng"
              pointColor={(d) => TYPE_CONFIG[d.type]?.color ?? "#fff"}
              pointAltitude={(d) => d.intensity * 0.008}
              pointRadius={(d) => 0.4 + d.intensity * 0.08}
              pointLabel={(d) => `
                <div style="background:#0f172a;border:1px solid #334155;padding:8px 12px;border-radius:8px;font-family:monospace;font-size:12px;color:#e2e8f0;max-width:220px">
                  <div style="color:${TYPE_CONFIG[d.type]?.color};font-weight:bold;margin-bottom:4px">${TYPE_CONFIG[d.type]?.label ?? d.type} — ${INTENSITY_LABELS[d.intensity]}</div>
                  <div style="font-weight:600">${d.region}</div>
                  <div style="color:#94a3b8;margin-top:2px">${d.label}</div>
                  <div style="color:#475569;margin-top:4px;font-size:10px">Source: ${d.source} · ${d.date}</div>
                </div>
              `}
              onPointClick={handlePointClick}
              pointsMerge={false}
              onGlobeReady={() => setGlobeReady(true)}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-slate-500 font-mono text-sm animate-pulse">Chargement du globe...</div>
            </div>
          )}

          {/* Filter overlay */}
          <div className="absolute top-4 left-4 flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 mb-1 text-slate-500 text-xs">
              <Filter size={11} /> Filtrer
            </div>
            {[{ key: "all", label: "Tous" }, ...Object.entries(TYPE_CONFIG).map(([k, v]) => ({ key: k, label: v.label }))].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3 py-1 rounded text-xs font-mono transition-all border ${
                  filter === key
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "bg-slate-900/80 border-slate-700 text-slate-400 hover:text-slate-200"
                }`}
              >
                {key !== "all" && (
                  <span
                    className="inline-block w-2 h-2 rounded-full mr-1.5"
                    style={{ backgroundColor: TYPE_CONFIG[key]?.color }}
                  />
                )}
                {label}
              </button>
            ))}
          </div>

          {/* Legend bottom-left */}
          <div className="absolute bottom-4 left-4 bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-xs font-mono">
            <div className="text-slate-400 mb-2 uppercase tracking-wider text-[10px]">Intensité</div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="inline-block w-3 h-3 rounded-full bg-slate-600" />
              <span className="text-slate-400">Faible (1–4)</span>
            </div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="inline-block w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-slate-400">Élevé (5–7)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-full bg-rose-500" />
              <span className="text-slate-400">Critique (8+)</span>
            </div>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="w-80 border-l border-slate-800 flex flex-col shrink-0 overflow-hidden">

          {/* Selected incident */}
          {selected ? (
            <div className="p-4 border-b border-slate-800">
              <div className="flex items-start justify-between mb-2">
                <span
                  className="px-2 py-0.5 rounded text-xs font-mono font-bold"
                  style={{
                    backgroundColor: `${TYPE_CONFIG[selected.type]?.color}22`,
                    color: TYPE_CONFIG[selected.type]?.color,
                    border: `1px solid ${TYPE_CONFIG[selected.type]?.color}44`,
                  }}
                >
                  {TYPE_CONFIG[selected.type]?.label?.toUpperCase()}
                </span>
                <button onClick={() => setSelected(null)} className="text-slate-600 hover:text-slate-400 text-xs">✕</button>
              </div>
              <h3 className="text-sm font-bold text-slate-100 mb-1">{selected.region}</h3>
              <p className="text-xs text-slate-400 mb-3">{selected.label}</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-800 rounded p-2">
                  <div className="text-xs text-slate-500">Intensité</div>
                  <div className="text-sm font-mono font-bold text-rose-400">{selected.intensity}/10</div>
                </div>
                <div className="bg-slate-800 rounded p-2">
                  <div className="text-xs text-slate-500">Source</div>
                  <div className="text-sm font-mono font-bold text-slate-200">{selected.source}</div>
                </div>
              </div>
              <div className="mt-2 text-xs text-slate-600 font-mono">{selected.date}</div>
            </div>
          ) : (
            <div className="p-4 border-b border-slate-800 text-center text-slate-600 text-xs font-mono">
              ← Cliquez sur un incident
            </div>
          )}

          {/* Incident list */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-4 py-2 text-xs text-slate-500 uppercase tracking-wider font-mono border-b border-slate-800">
              Incidents récents ({filtered.length})
            </div>
            {[...filtered]
              .sort((a, b) => b.intensity - a.intensity)
              .map((inc) => {
                const cfg = TYPE_CONFIG[inc.type];
                const Icon = cfg?.icon ?? AlertTriangle;
                return (
                  <button
                    key={inc.id}
                    onClick={() => setSelected(inc)}
                    className={`w-full text-left px-4 py-3 border-b border-slate-800/60 hover:bg-slate-800/50 transition-colors ${
                      selected?.id === inc.id ? "bg-slate-800" : ""
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <Icon size={14} className="mt-0.5 shrink-0" style={{ color: cfg?.color }} />
                      <div className="min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-semibold text-slate-200 truncate">{inc.region}</span>
                          <span
                            className="text-xs font-mono font-bold shrink-0"
                            style={{ color: inc.intensity >= 8 ? "#ef4444" : inc.intensity >= 5 ? "#f97316" : "#64748b" }}
                          >
                            {inc.intensity}/10
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 truncate mt-0.5">{inc.label}</div>
                        <div className="text-[10px] text-slate-600 font-mono mt-0.5">{inc.source}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
          </div>

          {/* Footer note */}
          <div className="px-4 py-3 border-t border-slate-800 text-[10px] text-slate-600 font-mono">
            Sources futures : ACLED · GDELT · ISW · Bellingcat RSS
          </div>
        </div>
      </div>
    </div>
  );
}
