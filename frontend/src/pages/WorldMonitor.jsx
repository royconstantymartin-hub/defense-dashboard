import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import {
  Activity,
  Crosshair,
  ExternalLink,
  HeartPulse,
  Landmark,
  Loader2,
  MapPin,
  RefreshCw,
  Rss,
  Satellite,
  TriangleAlert,
  X,
  Zap,
} from "lucide-react";
import { API } from "@/App";
import { getCachedWorldGeo, loadWorldGeo } from "@/lib/geo";

// Palette validated for colorblind safety on a light surface (dataviz check)
const TYPE_CONFIG = {
  combat:       { color: "#e11d48", label: "Combat",       icon: Crosshair },
  strike:       { color: "#ea580c", label: "Strike",       icon: Zap },
  political:    { color: "#2563eb", label: "Political",    icon: Landmark },
  humanitarian: { color: "#0d9488", label: "Humanitarian", icon: HeartPulse },
};

const severityColor = (v) => (v >= 8 ? "#e11d48" : v >= 6 ? "#d97706" : "#64748b");
const markerRadius = (v) => 2.5 + v * 0.4;
const fmtTime = (d) =>
  d ? d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : "";

function StatTile({ icon: Icon, label, value, sub, tone }) {
  const tones = {
    blue: "bg-blue-50 text-blue-700",
    rose: "bg-rose-50 text-rose-600",
    amber: "bg-amber-50 text-amber-600",
    teal: "bg-teal-50 text-teal-600",
  };
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] p-4 flex items-start justify-between gap-2">
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500 truncate">{label}</p>
        <p className="font-heading text-2xl font-bold text-slate-900 mt-1">{value}</p>
        {sub && <p className="text-[11px] text-slate-400 mt-0.5 truncate">{sub}</p>}
      </div>
      <div className={`p-2 rounded-lg shrink-0 ${tones[tone]}`}>
        <Icon size={16} />
      </div>
    </div>
  );
}

export default function WorldMonitor() {
  const [incidents, setIncidents] = useState([]);
  const [updated, setUpdated] = useState(null);
  const [serverWarming, setServerWarming] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [firstLoadDone, setFirstLoadDone] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState(null);
  const [selected, setSelected] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [geoData, setGeoData] = useState(getCachedWorldGeo);

  useEffect(() => {
    if (!getCachedWorldGeo()) {
      loadWorldGeo().then((d) => { if (d) setGeoData(d); });
    }
  }, []);

  const load = useCallback(async () => {
    setRefreshing(true);
    try {
      const { data } = await axios.get(`${API}/world-monitor/incidents`, { timeout: 30000 });
      const list = data.incidents ?? [];
      setIncidents(list);
      setUpdated(data.updated ? new Date(data.updated) : null);
      setServerWarming(data.status === "warming");
      setFetchFailed(false);
      // Keep the selection across refreshes (ids are renumbered server-side)
      setSelected((prev) =>
        prev ? list.find((i) => i.label === prev.label && i.region === prev.region) ?? prev : null
      );
    } catch {
      setFetchFailed(true);
    } finally {
      setRefreshing(false);
      setFirstLoadDone(true);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // Poll fast while the backend collects its first snapshot, slowly afterwards
  useEffect(() => {
    const delay = (serverWarming || fetchFailed) && incidents.length === 0 ? 20000 : 5 * 60 * 1000;
    const t = setTimeout(load, delay);
    return () => clearTimeout(t);
  }, [load, serverWarming, fetchFailed, incidents.length, updated]);

  const phase = incidents.length > 0
    ? "ok"
    : !firstLoadDone || serverWarming ? "warming"
    : fetchFailed ? "error"
    : "warming";

  const visible = useMemo(
    () =>
      incidents.filter(
        (i) =>
          (typeFilter === "all" || i.type === typeFilter) &&
          (!regionFilter || i.region === regionFilter)
      ),
    [incidents, typeFilter, regionFilter]
  );

  const feed = useMemo(
    () =>
      [...visible].sort(
        (a, b) => b.intensity - a.intensity || (b.date > a.date ? 1 : b.date < a.date ? -1 : 0)
      ),
    [visible]
  );

  const hotspots = useMemo(() => {
    const byRegion = {};
    incidents
      .filter((i) => typeFilter === "all" || i.type === typeFilter)
      .forEach((i) => {
        const h = (byRegion[i.region] ??= { region: i.region, count: 0, max: 0 });
        h.count += 1;
        h.max = Math.max(h.max, i.intensity);
      });
    return Object.values(byRegion)
      .sort((a, b) => b.max - a.max || b.count - a.count)
      .slice(0, 7);
  }, [incidents, typeFilter]);

  const stats = useMemo(
    () => ({
      total: incidents.length,
      critical: incidents.filter((i) => i.intensity >= 8).length,
      zones: new Set(incidents.map((i) => i.region)).size,
      sources: new Set(incidents.map((i) => i.source)).size,
    }),
    [incidents]
  );

  const typeCounts = useMemo(() => {
    const c = { all: incidents.length };
    incidents.forEach((i) => { c[i.type] = (c[i.type] ?? 0) + 1; });
    return c;
  }, [incidents]);

  const statusBadge =
    phase === "ok" ? (
      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-mono font-bold">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        LIVE
      </span>
    ) : phase === "warming" ? (
      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-mono font-bold">
        <Loader2 size={10} className="animate-spin" />
        COLLECTING
      </span>
    ) : (
      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-[10px] font-mono font-bold">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
        OFFLINE
      </span>
    );

  return (
    <div className="space-y-4 max-w-[1500px] mx-auto">
      {/* ── Header ── */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-heading text-2xl font-bold text-slate-900">World Monitor</h1>
            {statusBadge}
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Live conflict &amp; crisis tracking from open-source press coverage — refreshed every 15 minutes
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          {updated && (
            <span className="text-[11px] text-slate-400 font-mono">updated {fmtTime(updated)}</span>
          )}
          {fetchFailed && incidents.length > 0 && (
            <span className="text-[11px] text-amber-600 font-medium">refresh failed — showing last snapshot</span>
          )}
          <button
            onClick={load}
            disabled={refreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:border-blue-300 hover:text-blue-800 transition-colors shadow-sm disabled:opacity-50"
          >
            <RefreshCw size={12} className={refreshing ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>

      {/* ── Stat tiles ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatTile icon={Activity} tone="blue" label="Active incidents" sub="last 72 h coverage"
          value={phase === "ok" ? stats.total : "—"} />
        <StatTile icon={TriangleAlert} tone="rose" label="Critical alerts" sub="intensity 8+"
          value={phase === "ok" ? stats.critical : "—"} />
        <StatTile icon={MapPin} tone="amber" label="Zones affected" sub="monitored regions"
          value={phase === "ok" ? stats.zones : "—"} />
        <StatTile icon={Rss} tone="teal" label="Live sources" sub="press outlets cited"
          value={phase === "ok" ? stats.sources : "—"} />
      </div>

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 items-start">
        {/* ── Map card ── */}
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] overflow-hidden">
          {/* Card header: title + type filters */}
          <div className="flex flex-wrap items-center gap-2 px-4 pt-4 pb-3 border-b border-slate-100">
            <h2 className="font-heading font-bold text-slate-900 text-sm mr-2">Live Situation Map</h2>
            <div className="flex flex-wrap items-center gap-1.5 ml-auto">
              {[{ key: "all", label: "All" }, ...Object.entries(TYPE_CONFIG).map(([k, v]) => ({ key: k, ...v }))].map(
                ({ key, label, color }) => (
                  <button
                    key={key}
                    onClick={() => setTypeFilter(key)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors ${
                      typeFilter === key
                        ? "bg-blue-800 border-blue-800 text-white"
                        : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-800"
                    }`}
                  >
                    {color && (
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                    )}
                    {label}
                    <span className={`font-mono ${typeFilter === key ? "text-blue-200" : "text-slate-400"}`}>
                      {typeCounts[key] ?? 0}
                    </span>
                  </button>
                )
              )}
            </div>
          </div>

          {/* Map */}
          <div className="relative bg-slate-50">
            {geoData ? (
              <ComposableMap
                projection="geoEqualEarth"
                projectionConfig={{ scale: 147, center: [12, 3] }}
                width={800}
                height={400}
                style={{ width: "100%", height: "auto" }}
              >
                <Geographies geography={geoData}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#e2e8f0"
                        stroke="#ffffff"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none", fill: "#e2e8f0" },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>
                {visible.map((inc) => {
                  const cfg = TYPE_CONFIG[inc.type];
                  const r = markerRadius(inc.intensity);
                  const isSelected = selected && selected.id === inc.id;
                  return (
                    <Marker
                      key={inc.id}
                      coordinates={[inc.lng, inc.lat]}
                      onClick={() => setSelected((s) => (s?.id === inc.id ? null : inc))}
                      onMouseEnter={(e) => setTooltip({ x: e.clientX, y: e.clientY, inc })}
                      onMouseLeave={() => setTooltip(null)}
                      style={{ default: { cursor: "pointer" } }}
                    >
                      {inc.intensity >= 8 && (
                        <circle r={r} fill={cfg?.color} opacity="0.35" pointerEvents="none">
                          <animate attributeName="r" values={`${r};${r * 2.8}`} dur="1.6s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.4;0" dur="1.6s" repeatCount="indefinite" />
                        </circle>
                      )}
                      {isSelected && (
                        <circle r={r + 3.5} fill="none" stroke={cfg?.color} strokeWidth={1.4} pointerEvents="none" />
                      )}
                      <circle
                        r={r}
                        fill={cfg?.color ?? "#64748b"}
                        fillOpacity={0.85}
                        stroke="#ffffff"
                        strokeWidth={1.2}
                        style={{ cursor: "pointer" }}
                      />
                    </Marker>
                  );
                })}
              </ComposableMap>
            ) : (
              <div className="flex items-center justify-center" style={{ minHeight: 380 }}>
                <span className="text-xs text-slate-400 animate-pulse">Loading world map…</span>
              </div>
            )}

            {/* Overlay states on top of the map */}
            {phase !== "ok" && geoData && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-[1px]">
                <div className="text-center px-6">
                  {phase === "warming" ? (
                    <>
                      <Satellite size={26} className="mx-auto text-blue-800 animate-pulse" />
                      <p className="text-sm font-semibold text-slate-700 mt-2">Collecting live intelligence…</p>
                      <p className="text-xs text-slate-500 mt-1 max-w-xs">
                        First collection takes a couple of minutes. The feed refreshes automatically.
                      </p>
                    </>
                  ) : (
                    <>
                      <TriangleAlert size={26} className="mx-auto text-rose-500" />
                      <p className="text-sm font-semibold text-slate-700 mt-2">Live feed unavailable</p>
                      <p className="text-xs text-slate-500 mt-1">Check your connection, then retry.</p>
                      <button
                        onClick={load}
                        className="mt-3 px-3 py-1.5 bg-blue-800 hover:bg-blue-900 text-white text-xs font-medium rounded-lg transition-colors"
                      >
                        Retry now
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Type legend */}
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg px-3 py-2 shadow-sm">
              <div className="flex items-center gap-3 flex-wrap">
                {Object.values(TYPE_CONFIG).map((cfg) => (
                  <span key={cfg.label} className="flex items-center gap-1.5 text-[10px] text-slate-600">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.color }} />
                    {cfg.label}
                  </span>
                ))}
                <span className="text-[10px] text-slate-400 border-l border-slate-200 pl-3">size = intensity</span>
              </div>
            </div>

            {/* Attribution */}
            <div className="absolute bottom-3 right-3 text-[10px] text-slate-400 bg-white/80 rounded px-1.5 py-0.5">
              Open data · GDELT Project
            </div>
          </div>

          {/* Hotspot chips */}
          <div className="flex flex-wrap items-center gap-1.5 px-4 py-3 border-t border-slate-100">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mr-1">
              Hotspots
            </span>
            {hotspots.map((h) => (
              <button
                key={h.region}
                onClick={() => setRegionFilter((r) => (r === h.region ? null : h.region))}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors ${
                  regionFilter === h.region
                    ? "bg-blue-50 border-blue-800 text-blue-800"
                    : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-800"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: severityColor(h.max) }} />
                {h.region}
                <span className="font-mono text-slate-400">{h.count}</span>
              </button>
            ))}
            {regionFilter && (
              <button
                onClick={() => setRegionFilter(null)}
                className="flex items-center gap-1 px-2 py-1 text-[11px] text-slate-400 hover:text-slate-600"
              >
                <X size={11} /> clear
              </button>
            )}
          </div>
        </div>

        {/* ── Incident feed ── */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-slate-100">
            <h2 className="font-heading font-bold text-slate-900 text-sm">Incident Feed</h2>
            <span className="text-[11px] font-mono text-slate-400">{feed.length} shown</span>
          </div>

          {/* Selected incident detail */}
          {selected && (
            <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between gap-2">
                <span
                  className="text-[10px] font-mono font-bold uppercase tracking-wider"
                  style={{ color: TYPE_CONFIG[selected.type]?.color }}
                >
                  {TYPE_CONFIG[selected.type]?.label} · {selected.intensity}/10
                </span>
                <button
                  onClick={() => setSelected(null)}
                  className="text-slate-400 hover:text-slate-600"
                  aria-label="Close detail"
                >
                  <X size={13} />
                </button>
              </div>
              <p className="text-sm font-semibold text-slate-900 mt-1">{selected.region}</p>
              <p className="text-xs text-slate-600 mt-1 leading-snug">{selected.label}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] text-slate-400 font-mono">
                  {selected.source} · {selected.date}
                </span>
                {selected.url && (
                  <a
                    href={selected.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] font-medium text-blue-800 hover:text-blue-600"
                  >
                    Read source <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Feed list */}
          <div className="max-h-[520px] overflow-y-auto">
            {phase !== "ok" ? (
              <div className="px-4 py-10 text-center text-xs text-slate-400">
                {phase === "warming" ? "Waiting for first data collection…" : "No data available."}
              </div>
            ) : feed.length === 0 ? (
              <div className="px-4 py-10 text-center text-xs text-slate-400">
                No incidents match the current filters.
              </div>
            ) : (
              feed.map((inc) => {
                const cfg = TYPE_CONFIG[inc.type];
                const isActive = selected?.id === inc.id;
                return (
                  <button
                    key={inc.id}
                    onClick={() => setSelected((s) => (s?.id === inc.id ? null : inc))}
                    className={`w-full text-left px-4 py-2.5 border-b border-slate-100 transition-colors ${
                      isActive ? "bg-blue-50/60" : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: cfg?.color }} />
                      <span className="text-xs font-semibold text-slate-900 truncate flex-1">{inc.region}</span>
                      <span className="text-[11px] font-mono font-bold shrink-0" style={{ color: severityColor(inc.intensity) }}>
                        {inc.intensity}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-snug line-clamp-2">{inc.label}</p>
                    <p className="text-[10px] text-slate-400 mt-1 font-mono truncate">
                      {cfg?.label} · {inc.source} · {inc.date}
                    </p>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Marker hover tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 bg-white border border-slate-200 rounded-lg shadow-xl px-3 py-2 pointer-events-none max-w-[240px]"
          style={{ left: tooltip.x + 14, top: tooltip.y - 60 }}
        >
          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: TYPE_CONFIG[tooltip.inc.type]?.color }}
            />
            <span className="text-xs font-semibold text-slate-900">{tooltip.inc.region}</span>
            <span className="text-[10px] font-mono ml-auto" style={{ color: severityColor(tooltip.inc.intensity) }}>
              {tooltip.inc.intensity}/10
            </span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1 leading-snug line-clamp-2">{tooltip.inc.label}</p>
          <p className="text-[9px] text-slate-400 mt-1 font-mono">
            {TYPE_CONFIG[tooltip.inc.type]?.label} · {tooltip.inc.source} · {tooltip.inc.date}
          </p>
        </div>
      )}
    </div>
  );
}
