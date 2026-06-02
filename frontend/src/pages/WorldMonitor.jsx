import { useEffect, useRef, useState, useCallback } from "react";
import { AlertTriangle, Zap, Crosshair, Radio, Globe2, RefreshCw, Filter, Loader2 } from "lucide-react";
import axios from "axios";
import { API } from "@/App";

const TYPE_CONFIG = {
  combat:      { color: "#ef4444", label: "Combat",      icon: Crosshair },
  strike:      { color: "#f97316", label: "Strike",      icon: Zap },
  political:   { color: "#3b82f6", label: "Political",   icon: Radio },
  humanitarian:{ color: "#a855f7", label: "Humanitarian",icon: AlertTriangle },
};

const INTENSITY_LABELS = ["", "", "Low", "Low", "Moderate", "Moderate", "High", "High", "Critical", "Critical", "Extreme"];

export default function WorldMonitor() {
  const containerRef = useRef(null);
  const globeRef = useRef(null);
  const [GlobeComponent, setGlobeComponent] = useState(null);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(null);

  // Dynamically import react-globe.gl (Three.js, browser-only)
  useEffect(() => {
    import("react-globe.gl").then((mod) => {
      setGlobeComponent(() => mod.default);
    });
  }, []);

  const loadIncidents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${API}/world-monitor/incidents`, { timeout: 20000 });
      setIncidents(data.incidents ?? []);
      setLastRefresh(new Date());
    } catch (err) {
      setError("Failed to load incident data. Retrying next refresh.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadIncidents();
    const interval = setInterval(loadIncidents, 15 * 60 * 1000); // refresh every 15 min
    return () => clearInterval(interval);
  }, [loadIncidents]);

  const filtered = filter === "all"
    ? incidents
    : incidents.filter((i) => i.type === filter);

  const totalCritical = incidents.filter((i) => i.intensity >= 8).length;
  const totalCombat   = incidents.filter((i) => i.type === "combat").length;
  const uniqueRegions = new Set(incidents.map((i) => i.region)).size;

  return (
    <div className="flex flex-col bg-slate-950 text-slate-100 overflow-hidden" style={{ height: "calc(100vh - 64px)" }}>

      {/* ── WIP Banner ── */}
      <div className="bg-amber-500/20 border-b border-amber-500/30 px-4 py-2 flex items-center gap-2 text-amber-300 text-xs font-mono shrink-0">
        <AlertTriangle size={13} />
        <span>WORK IN PROGRESS — Live data via GDELT & ReliefWeb (15-min cache). ACLED integration coming.</span>
      </div>

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <Globe2 size={20} className="text-blue-400" />
          <div>
            <h1 className="text-sm font-bold tracking-wider uppercase text-slate-100">World Monitor</h1>
            <p className="text-xs text-slate-500 font-mono">Global conflicts & incidents</p>
          </div>
          <span className="ml-2 px-2 py-0.5 bg-rose-500/20 text-rose-400 text-xs font-mono rounded border border-rose-500/30 animate-pulse">
            ● LIVE
          </span>
        </div>

        <div className="flex items-center gap-3">
          {lastRefresh && (
            <span className="text-xs text-slate-500 font-mono">
              Updated {lastRefresh.toLocaleTimeString("en-GB")}
            </span>
          )}
          <button
            onClick={loadIncidents}
            disabled={loading}
            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors disabled:opacity-40"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
          </button>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="flex gap-0 border-b border-slate-800 shrink-0">
        {[
          { label: "Active incidents", value: incidents.length, color: "text-slate-200" },
          { label: "Critical (≥8)",    value: totalCritical,    color: "text-rose-400" },
          { label: "Active combat",    value: totalCombat,      color: "text-orange-400" },
          { label: "Regions affected", value: uniqueRegions,    color: "text-blue-400" },
        ].map((s) => (
          <div key={s.label} className="flex-1 px-4 py-2.5 border-r border-slate-800 last:border-r-0">
            <div className={`text-lg font-bold font-mono ${s.color}`}>
              {loading ? <span className="opacity-30">—</span> : s.value}
            </div>
            <div className="text-xs text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Error bar ── */}
      {error && (
        <div className="bg-rose-500/10 border-b border-rose-500/20 px-4 py-2 text-rose-400 text-xs font-mono shrink-0">
          {error}
        </div>
      )}

      {/* ── Main layout ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Globe */}
        <div className="flex-1 relative overflow-hidden" ref={containerRef}>
          {loading && incidents.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <Loader2 size={28} className="animate-spin text-blue-400" />
              <span className="text-slate-500 font-mono text-sm">Loading live incident data...</span>
            </div>
          ) : GlobeComponent ? (
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
                <div style="background:#0f172a;border:1px solid #334155;padding:8px 12px;border-radius:8px;font-family:monospace;font-size:12px;color:#e2e8f0;max-width:260px">
                  <div style="color:${TYPE_CONFIG[d.type]?.color};font-weight:bold;margin-bottom:4px">${TYPE_CONFIG[d.type]?.label ?? d.type} — ${INTENSITY_LABELS[d.intensity] ?? ""}</div>
                  <div style="font-weight:600">${d.region}</div>
                  <div style="color:#94a3b8;margin-top:4px;line-height:1.4">${d.label}</div>
                  <div style="color:#475569;margin-top:6px;font-size:10px">Source: ${d.source} · ${d.date}</div>
                </div>
              `}
              onPointClick={(point) => setSelected(point)}
              pointsMerge={false}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-slate-500 font-mono text-sm animate-pulse">Loading globe...</div>
            </div>
          )}

          {/* Filter overlay */}
          <div className="absolute top-4 left-4 flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 mb-1 text-slate-500 text-xs">
              <Filter size={11} /> Filter
            </div>
            {[{ key: "all", label: "All" }, ...Object.entries(TYPE_CONFIG).map(([k, v]) => ({ key: k, label: v.label }))].map(({ key, label }) => (
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
            <div className="text-slate-400 mb-2 uppercase tracking-wider text-[10px]">Intensity</div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="inline-block w-3 h-3 rounded-full bg-slate-600" />
              <span className="text-slate-400">Low (1–4)</span>
            </div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="inline-block w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-slate-400">High (5–7)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-full bg-rose-500" />
              <span className="text-slate-400">Critical (8+)</span>
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
              <p className="text-xs text-slate-400 mb-3 leading-relaxed">{selected.label}</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-800 rounded p-2">
                  <div className="text-xs text-slate-500">Intensity</div>
                  <div className="text-sm font-mono font-bold text-rose-400">{selected.intensity}/10</div>
                </div>
                <div className="bg-slate-800 rounded p-2">
                  <div className="text-xs text-slate-500">Source</div>
                  <div className="text-sm font-mono font-bold text-slate-200 truncate">{selected.source}</div>
                </div>
              </div>
              {selected.url && (
                <a
                  href={selected.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-xs text-blue-400 hover:text-blue-300 truncate"
                >
                  → Read source
                </a>
              )}
              <div className="mt-2 text-xs text-slate-600 font-mono">{selected.date}</div>
            </div>
          ) : (
            <div className="p-4 border-b border-slate-800 text-center text-slate-600 text-xs font-mono">
              ← Click an incident on the globe
            </div>
          )}

          {/* Incident list */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-4 py-2 text-xs text-slate-500 uppercase tracking-wider font-mono border-b border-slate-800">
              Recent incidents ({filtered.length})
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
                        <div className="text-xs text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">{inc.label}</div>
                        <div className="text-[10px] text-slate-600 font-mono mt-0.5">{inc.source}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
          </div>

          {/* Footer note */}
          <div className="px-4 py-3 border-t border-slate-800 text-[10px] text-slate-600 font-mono">
            Sources: GDELT · ReliefWeb — refreshes every 15 min
          </div>
        </div>
      </div>
    </div>
  );
}
