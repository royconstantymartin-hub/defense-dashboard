import { useEffect, useRef, useState, useCallback } from "react";
import { AlertTriangle, Zap, Crosshair, Radio, Globe2, RefreshCw, Loader2, ExternalLink } from "lucide-react";
import axios from "axios";
import { API } from "@/App";

const TYPE_CONFIG = {
  combat:      { color: "#ef4444", label: "Combat",       icon: Crosshair },
  strike:      { color: "#f97316", label: "Strike",       icon: Zap },
  political:   { color: "#3b82f6", label: "Political",    icon: Radio },
  humanitarian:{ color: "#a855f7", label: "Humanitarian", icon: AlertTriangle },
};

export default function WorldMonitor() {
  const containerRef = useRef(null);
  const [GlobeComponent, setGlobeComponent] = useState(null);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(null);

  useEffect(() => {
    import("react-globe.gl").then((mod) => setGlobeComponent(() => mod.default));
  }, []);

  const loadIncidents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${API}/world-monitor/incidents`, { timeout: 20000 });
      setIncidents(data.incidents ?? []);
      setLastRefresh(new Date());
    } catch {
      setError("Could not fetch live data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadIncidents();
    const t = setInterval(loadIncidents, 15 * 60 * 1000);
    return () => clearInterval(t);
  }, [loadIncidents]);

  const filtered = filter === "all" ? incidents : incidents.filter((i) => i.type === filter);

  return (
    <div className="flex flex-col bg-slate-950 text-slate-100 overflow-hidden" style={{ height: "calc(100vh - 64px)" }}>

      {/* ── Header (single compact row) ── */}
      <div className="flex items-center gap-3 px-4 py-2 border-b border-slate-800 shrink-0">
        <Globe2 size={16} className="text-blue-400 shrink-0" />
        <span className="text-xs font-bold tracking-widest uppercase text-slate-100">World Monitor</span>
        <span className="px-1.5 py-0.5 bg-rose-500/20 text-rose-400 text-[10px] font-mono rounded border border-rose-500/30 animate-pulse">● LIVE</span>
        <span className="px-1.5 py-0.5 bg-amber-500/15 text-amber-400 text-[10px] font-mono rounded border border-amber-500/25">WIP</span>

        {/* Inline stats */}
        <div className="hidden sm:flex items-center gap-3 ml-2 text-xs font-mono">
          <span className="text-slate-400">{loading ? "—" : incidents.length} <span className="text-slate-600">incidents</span></span>
          <span className="text-rose-400">{loading ? "—" : incidents.filter(i => i.intensity >= 8).length} <span className="text-slate-600">critical</span></span>
          <span className="text-blue-400">{loading ? "—" : new Set(incidents.map(i => i.region)).size} <span className="text-slate-600">regions</span></span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {error && <span className="text-rose-400 text-[10px] font-mono">{error}</span>}
          {lastRefresh && <span className="text-[10px] text-slate-600 font-mono">{lastRefresh.toLocaleTimeString("en-GB")}</span>}
          <button
            onClick={loadIncidents}
            disabled={loading}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors disabled:opacity-40"
          >
            {loading ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
          </button>
        </div>
      </div>

      {/* ── Filter pills (horizontal, above globe) ── */}
      <div className="flex items-center gap-1.5 px-4 py-1.5 border-b border-slate-800 shrink-0">
        {[{ key: "all", label: "All" }, ...Object.entries(TYPE_CONFIG).map(([k, v]) => ({ key: k, label: v.label, color: v.color }))].map(({ key, label, color }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono transition-all border ${
              filter === key
                ? "bg-blue-600 border-blue-500 text-white"
                : "bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600"
            }`}
          >
            {color && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />}
            {label}
          </button>
        ))}
        <span className="ml-auto text-[10px] text-slate-600 font-mono">{filtered.length} shown</span>
      </div>

      {/* ── Main layout ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Globe */}
        <div className="flex-1 relative overflow-hidden" ref={containerRef}>
          {loading && incidents.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <Loader2 size={24} className="animate-spin text-blue-400" />
              <span className="text-slate-600 font-mono text-xs">Loading incidents...</span>
            </div>
          ) : GlobeComponent ? (
            <GlobeComponent
              width={containerRef.current?.clientWidth || 700}
              height={containerRef.current?.clientHeight || 500}
              backgroundColor="rgba(2,6,23,1)"
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
              atmosphereColor="#1e40af"
              atmosphereAltitude={0.12}
              pointsData={filtered}
              pointLat="lat"
              pointLng="lng"
              pointColor={(d) => TYPE_CONFIG[d.type]?.color ?? "#fff"}
              pointAltitude={(d) => d.intensity * 0.006}
              pointRadius={(d) => 0.35 + d.intensity * 0.07}
              pointLabel={(d) => `
                <div style="background:#0f172a;border:1px solid #334155;padding:6px 10px;border-radius:6px;font-family:monospace;font-size:11px;color:#e2e8f0;max-width:220px">
                  <div style="color:${TYPE_CONFIG[d.type]?.color};font-weight:bold">${d.region}</div>
                  <div style="color:#94a3b8;margin-top:2px;line-height:1.3">${d.label.slice(0, 80)}${d.label.length > 80 ? "…" : ""}</div>
                  <div style="color:#475569;margin-top:4px;font-size:9px">${d.source} · ${d.date}</div>
                </div>
              `}
              onPointClick={(point) => setSelected(s => s?.id === point.id ? null : point)}
              pointsMerge={false}
              pointOfView={{ altitude: 2.2 }}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-600 font-mono text-xs animate-pulse">
              Loading globe…
            </div>
          )}

          {/* Intensity legend — bottom left, very compact */}
          <div className="absolute bottom-3 left-3 flex items-center gap-3 bg-slate-900/70 border border-slate-800 rounded px-2.5 py-1.5 text-[10px] font-mono text-slate-500">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-600 inline-block" />Low</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />High</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />Critical</span>
          </div>
        </div>

        {/* ── Right panel — compact ── */}
        <div className="hidden md:flex md:w-52 border-l border-slate-800 flex-col shrink-0 overflow-hidden">

          {/* Selected detail — only shown when something is selected */}
          {selected && (
            <div className="border-b border-slate-700 bg-slate-900 p-3 shrink-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold" style={{ color: TYPE_CONFIG[selected.type]?.color }}>
                  {TYPE_CONFIG[selected.type]?.label?.toUpperCase()}  ·  {selected.intensity}/10
                </span>
                <button onClick={() => setSelected(null)} className="text-slate-700 hover:text-slate-400 text-xs leading-none">✕</button>
              </div>
              <div className="text-xs font-semibold text-slate-100 mb-1">{selected.region}</div>
              <div className="text-[11px] text-slate-400 leading-snug line-clamp-3">{selected.label}</div>
              {selected.url && (
                <a href={selected.url} target="_blank" rel="noopener noreferrer"
                  className="mt-1.5 flex items-center gap-1 text-[10px] text-blue-400 hover:text-blue-300">
                  <ExternalLink size={10} /> Source
                </a>
              )}
            </div>
          )}

          {/* List header */}
          <div className="px-3 py-1.5 text-[10px] text-slate-600 uppercase tracking-wider font-mono border-b border-slate-800 shrink-0">
            Incidents
          </div>

          {/* Compact list */}
          <div className="flex-1 overflow-y-auto">
            {[...filtered].sort((a, b) => b.intensity - a.intensity).map((inc) => {
              const cfg = TYPE_CONFIG[inc.type];
              const isActive = selected?.id === inc.id;
              return (
                <button
                  key={inc.id}
                  onClick={() => setSelected(s => s?.id === inc.id ? null : inc)}
                  className={`w-full text-left px-3 py-1.5 border-b border-slate-800/50 hover:bg-slate-800/40 transition-colors ${isActive ? "bg-slate-800" : ""}`}
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: cfg?.color ?? "#fff" }} />
                    <span className="text-[11px] text-slate-300 truncate flex-1">{inc.region}</span>
                    <span
                      className="text-[10px] font-mono shrink-0"
                      style={{ color: inc.intensity >= 8 ? "#ef4444" : inc.intensity >= 5 ? "#f97316" : "#64748b" }}
                    >
                      {inc.intensity}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-600 truncate pl-3 mt-0.5">{inc.label}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
