import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import {
  Activity,
  Crosshair,
  ExternalLink,
  Layers,
  Locate,
  Minus,
  Plus,
  RefreshCw,
  Rss,
  Satellite,
  Search,
  TriangleAlert,
  X,
} from "lucide-react";
import { API } from "@/App";
import { getCachedWorldGeo, loadWorldGeo } from "@/lib/geo";
import { LAYER_DEFS, POI_LAYERS } from "@/data/mapLayers";

// Incident sub-types (the "live actu" layer) keep their own colours
const INCIDENT_TYPES = {
  combat:       { color: "#e11d48", label: "Combat" },
  strike:       { color: "#ea580c", label: "Strike" },
  political:    { color: "#2563eb", label: "Political" },
  humanitarian: { color: "#0d9488", label: "Humanitarian" },
};

const severityColor = (v) => (v >= 8 ? "#e11d48" : v >= 6 ? "#d97706" : "#64748b");
const fmtTime = (d) =>
  d ? d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : "";

const MIN_ZOOM = 1;
const MAX_ZOOM = 8;
const LABEL_ZOOM = 2.6; // show POI name labels once zoomed past this

// ── SVG marker shape for a given layer, drawn at radius r, colour c ──────────
function ShapeMark({ shape, r, color, dimmed }) {
  const common = {
    fill: color,
    fillOpacity: dimmed ? 0.35 : 0.9,
    stroke: "#ffffff",
    strokeWidth: 1.1,
    style: { cursor: "pointer" },
  };
  switch (shape) {
    case "square":
      return <rect x={-r} y={-r} width={r * 2} height={r * 2} rx={r * 0.25} {...common} />;
    case "diamond":
      return <rect x={-r} y={-r} width={r * 2} height={r * 2} transform="rotate(45)" {...common} />;
    case "triangle": {
      const h = r * 1.5;
      return <polygon points={`0,${-h} ${r * 1.15},${h * 0.7} ${-r * 1.15},${h * 0.7}`} {...common} />;
    }
    case "hexagon": {
      const pts = Array.from({ length: 6 }, (_, i) => {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        return `${(r * Math.cos(a)).toFixed(2)},${(r * Math.sin(a)).toFixed(2)}`;
      }).join(" ");
      return <polygon points={pts} {...common} />;
    }
    case "ring":
      return (
        <circle r={r} fill={color} fillOpacity={dimmed ? 0.1 : 0.18} stroke={color}
          strokeWidth={1.4} strokeOpacity={dimmed ? 0.4 : 0.9} style={{ cursor: "pointer" }} />
      );
    case "circle":
    default:
      return <circle r={r} {...common} />;
  }
}

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

const flag = (cc) => (cc ? `https://flagcdn.com/w20/${cc}.png` : null);

export default function WorldMonitor() {
  const [incidents, setIncidents] = useState([]);
  const [updated, setUpdated] = useState(null);
  const [serverWarming, setServerWarming] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [firstLoadDone, setFirstLoadDone] = useState(false);

  // Layer visibility: all on except the four base layers off by default,
  // so first paint stays focused on the live conflict picture.
  const [layers, setLayers] = useState({
    incidents: true, theaters: true, nuclear: false, nato: false, us: false, france: false,
  });
  const [typeFilter, setTypeFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [geoData, setGeoData] = useState(getCachedWorldGeo);
  const [position, setPosition] = useState({ coordinates: [12, 20], zoom: 1 });
  const feedRef = useRef(null);

  useEffect(() => {
    if (!getCachedWorldGeo()) loadWorldGeo().then((d) => d && setGeoData(d));
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
    } catch {
      setFetchFailed(true);
    } finally {
      setRefreshing(false);
      setFirstLoadDone(true);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    const delay = (serverWarming || fetchFailed) && incidents.length === 0 ? 20000 : 5 * 60 * 1000;
    const t = setTimeout(load, delay);
    return () => clearTimeout(t);
  }, [load, serverWarming, fetchFailed, incidents.length, updated]);

  const phase = incidents.length > 0
    ? "ok"
    : !firstLoadDone || serverWarming ? "warming"
    : fetchFailed ? "error" : "warming";

  // ── Zoom controls ──
  const clampZoom = (z) => Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, z));
  const zoomBy = (f) => setPosition((p) => ({ ...p, zoom: clampZoom(p.zoom * f) }));
  const resetView = () => setPosition({ coordinates: [12, 20], zoom: 1 });
  const flyTo = (lng, lat, zoom = 4) =>
    setPosition({ coordinates: [lng, lat], zoom: clampZoom(zoom) });

  const q = query.trim().toLowerCase();

  // ── Visible incident points ──
  const visibleIncidents = useMemo(
    () =>
      layers.incidents
        ? incidents.filter(
            (i) =>
              (typeFilter === "all" || i.type === typeFilter) &&
              (!q || i.region.toLowerCase().includes(q) || i.label.toLowerCase().includes(q))
          )
        : [],
    [incidents, layers.incidents, typeFilter, q]
  );

  // ── Visible POIs per active base/site layer ──
  const visiblePOIs = useMemo(() => {
    const out = [];
    Object.keys(POI_LAYERS).forEach((key) => {
      if (!layers[key]) return;
      POI_LAYERS[key].forEach((poi) => {
        if (!q || poi.name.toLowerCase().includes(q) || poi.country.toLowerCase().includes(q))
          out.push({ ...poi, layer: key });
      });
    });
    return out;
  }, [layers, q]);

  const stats = useMemo(
    () => ({
      total: incidents.length,
      critical: incidents.filter((i) => i.intensity >= 8).length,
      zones: new Set(incidents.map((i) => i.region)).size,
      sites: Object.keys(POI_LAYERS).reduce((n, k) => n + (layers[k] ? POI_LAYERS[k].length : 0), 0),
    }),
    [incidents, layers]
  );

  const typeCounts = useMemo(() => {
    const c = { all: incidents.length };
    incidents.forEach((i) => { c[i.type] = (c[i.type] ?? 0) + 1; });
    return c;
  }, [incidents]);

  const feed = useMemo(
    () => [...visibleIncidents].sort((a, b) => b.intensity - a.intensity || (b.date > a.date ? 1 : -1)),
    [visibleIncidents]
  );

  const layerCount = (key) =>
    key === "incidents" ? incidents.length : POI_LAYERS[key]?.length ?? 0;

  const toggleLayer = (key) => setLayers((l) => ({ ...l, [key]: !l[key] }));

  const selectIncident = (inc) => {
    setSelected({ kind: "incident", data: inc });
    flyTo(inc.lng, inc.lat, Math.max(position.zoom, 4));
  };
  const selectPOI = (poi) => {
    setSelected({ kind: "poi", data: poi });
    flyTo(poi.lng, poi.lat, Math.max(position.zoom, 4));
  };

  // Inverse marker scale so shapes keep a stable pixel size while zooming
  const mScale = 1 / position.zoom;
  const showLabels = position.zoom >= LABEL_ZOOM;

  const statusBadge =
    phase === "ok" ? (
      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-mono font-bold">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE
      </span>
    ) : phase === "warming" ? (
      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-mono font-bold">
        <Satellite size={10} className="animate-pulse" /> COLLECTING
      </span>
    ) : (
      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-[10px] font-mono font-bold">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> OFFLINE
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
            <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 border border-amber-300 text-[9px] font-mono font-semibold tracking-wider rounded">WIP</span>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            OSINT situation map — live incidents plus nuclear sites, theaters, NATO / US / French bases
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          {updated && <span className="text-[11px] text-slate-400 font-mono">updated {fmtTime(updated)}</span>}
          {fetchFailed && incidents.length > 0 && (
            <span className="text-[11px] text-amber-600 font-medium">refresh failed — last snapshot</span>
          )}
          <button
            onClick={load}
            disabled={refreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:border-blue-300 hover:text-blue-800 transition-colors shadow-sm disabled:opacity-50"
          >
            <RefreshCw size={12} className={refreshing ? "animate-spin" : ""} /> Refresh
          </button>
        </div>
      </div>

      {/* ── Stat tiles ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatTile icon={Activity} tone="blue" label="Active incidents" sub="last 72 h coverage"
          value={phase === "ok" ? stats.total : "—"} />
        <StatTile icon={TriangleAlert} tone="rose" label="Critical alerts" sub="intensity 8+"
          value={phase === "ok" ? stats.critical : "—"} />
        <StatTile icon={Crosshair} tone="amber" label="Zones affected" sub="active regions"
          value={phase === "ok" ? stats.zones : "—"} />
        <StatTile icon={Layers} tone="teal" label="Sites shown" sub="from active layers"
          value={stats.sites} />
      </div>

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 items-start">
        {/* ── Map card ── */}
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] overflow-hidden">
          {/* Toolbar: search + incident type filter */}
          <div className="flex flex-wrap items-center gap-2 px-4 pt-4 pb-3 border-b border-slate-100">
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search region, base, country…"
                className="pl-8 pr-3 py-1.5 w-56 max-w-full text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
              />
            </div>
            <div className="flex flex-wrap items-center gap-1.5 ml-auto">
              {[{ key: "all", label: "All" }, ...Object.entries(INCIDENT_TYPES).map(([k, v]) => ({ key: k, ...v }))].map(
                ({ key, label, color }) => (
                  <button
                    key={key}
                    onClick={() => setTypeFilter(key)}
                    disabled={!layers.incidents}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors disabled:opacity-40 ${
                      typeFilter === key
                        ? "bg-blue-800 border-blue-800 text-white"
                        : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-800"
                    }`}
                  >
                    {color && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />}
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
                projectionConfig={{ scale: 165 }}
                width={800}
                height={420}
                style={{ width: "100%", height: "auto" }}
              >
                <ZoomableGroup
                  zoom={position.zoom}
                  center={position.coordinates}
                  minZoom={MIN_ZOOM}
                  maxZoom={MAX_ZOOM}
                  onMoveEnd={(pos) => setPosition(pos)}
                >
                  <Geographies geography={geoData}>
                    {({ geographies }) =>
                      geographies.map((geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill="#e2e8f0"
                          stroke="#ffffff"
                          strokeWidth={0.4}
                          style={{
                            default: { outline: "none" },
                            hover: { outline: "none", fill: "#dbe3ec" },
                            pressed: { outline: "none" },
                          }}
                        />
                      ))
                    }
                  </Geographies>

                  {/* POI markers (bases / nuclear / theaters) */}
                  {visiblePOIs.map((poi) => {
                    const def = LAYER_DEFS[poi.layer];
                    const isTheater = poi.layer === "theaters";
                    const baseR = isTheater ? 9 : 5;
                    const r = baseR * mScale;
                    const isSel = selected?.kind === "poi" && selected.data.id === poi.id;
                    return (
                      <Marker
                        key={poi.id}
                        coordinates={[poi.lng, poi.lat]}
                        onClick={() => selectPOI(poi)}
                        onMouseEnter={(e) => setTooltip({ x: e.clientX, y: e.clientY, poi })}
                        onMouseLeave={() => setTooltip(null)}
                      >
                        {isSel && (
                          <circle r={(baseR + 4) * mScale} fill="none" stroke={def.color}
                            strokeWidth={1.4 * mScale} />
                        )}
                        <ShapeMark shape={def.shape} r={r} color={def.color} />
                        {showLabels && !isTheater && (
                          <text
                            textAnchor="middle"
                            y={-(r + 3)}
                            style={{ fontFamily: "monospace", pointerEvents: "none" }}
                            fontSize={7 * mScale}
                            fill="#0f172a"
                            stroke="#ffffff"
                            strokeWidth={2.2 * mScale}
                            paintOrder="stroke"
                          >
                            {poi.name}
                          </text>
                        )}
                      </Marker>
                    );
                  })}

                  {/* Live incident markers on top */}
                  {visibleIncidents.map((inc) => {
                    const cfg = INCIDENT_TYPES[inc.type];
                    const r = (2.5 + inc.intensity * 0.4) * mScale;
                    const isSel = selected?.kind === "incident" && selected.data.id === inc.id;
                    return (
                      <Marker
                        key={`inc-${inc.id}`}
                        coordinates={[inc.lng, inc.lat]}
                        onClick={() => selectIncident(inc)}
                        onMouseEnter={(e) => setTooltip({ x: e.clientX, y: e.clientY, inc })}
                        onMouseLeave={() => setTooltip(null)}
                      >
                        {inc.intensity >= 8 && (
                          <circle r={r} fill={cfg?.color} opacity="0.35" pointerEvents="none">
                            <animate attributeName="r" values={`${r};${r * 2.8}`} dur="1.6s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.4;0" dur="1.6s" repeatCount="indefinite" />
                          </circle>
                        )}
                        {isSel && (
                          <circle r={r + 3.5 * mScale} fill="none" stroke={cfg?.color} strokeWidth={1.4 * mScale} />
                        )}
                        <circle r={r} fill={cfg?.color ?? "#64748b"} fillOpacity={0.9}
                          stroke="#ffffff" strokeWidth={1.1 * mScale} style={{ cursor: "pointer" }} />
                        {showLabels && (
                          <text
                            textAnchor="middle"
                            y={-(r + 3)}
                            style={{ fontFamily: "monospace", pointerEvents: "none" }}
                            fontSize={7 * mScale}
                            fill="#0f172a"
                            stroke="#ffffff"
                            strokeWidth={2.2 * mScale}
                            paintOrder="stroke"
                          >
                            {inc.region}
                          </text>
                        )}
                      </Marker>
                    );
                  })}
                </ZoomableGroup>
              </ComposableMap>
            ) : (
              <div className="flex items-center justify-center" style={{ minHeight: 400 }}>
                <span className="text-xs text-slate-400 animate-pulse">Loading world map…</span>
              </div>
            )}

            {/* Zoom controls */}
            <div className="absolute top-3 right-3 flex flex-col gap-1">
              <button onClick={() => zoomBy(1.5)} title="Zoom in"
                className="w-8 h-8 flex items-center justify-center bg-white/95 border border-slate-200 rounded-lg shadow-sm text-slate-600 hover:text-blue-800 hover:border-blue-300 transition-colors">
                <Plus size={15} />
              </button>
              <button onClick={() => zoomBy(1 / 1.5)} title="Zoom out"
                className="w-8 h-8 flex items-center justify-center bg-white/95 border border-slate-200 rounded-lg shadow-sm text-slate-600 hover:text-blue-800 hover:border-blue-300 transition-colors">
                <Minus size={15} />
              </button>
              <button onClick={resetView} title="Reset view"
                className="w-8 h-8 flex items-center justify-center bg-white/95 border border-slate-200 rounded-lg shadow-sm text-slate-600 hover:text-blue-800 hover:border-blue-300 transition-colors">
                <Locate size={14} />
              </button>
            </div>
            <div className="absolute top-3 left-3 bg-white/85 rounded px-1.5 py-0.5 text-[10px] font-mono text-slate-500">
              {position.zoom.toFixed(1)}× · scroll or drag to explore
            </div>

            {/* Overlay states */}
            {phase !== "ok" && geoData && layers.incidents && visiblePOIs.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-[1px]">
                <div className="text-center px-6">
                  {phase === "warming" ? (
                    <>
                      <Satellite size={26} className="mx-auto text-blue-800 animate-pulse" />
                      <p className="text-sm font-semibold text-slate-700 mt-2">Collecting live intelligence…</p>
                      <p className="text-xs text-slate-500 mt-1 max-w-xs">
                        First collection takes a couple of minutes. Base layers are available meanwhile.
                      </p>
                    </>
                  ) : (
                    <>
                      <TriangleAlert size={26} className="mx-auto text-rose-500" />
                      <p className="text-sm font-semibold text-slate-700 mt-2">Live feed unavailable</p>
                      <button onClick={load}
                        className="mt-3 px-3 py-1.5 bg-blue-800 hover:bg-blue-900 text-white text-xs font-medium rounded-lg">
                        Retry now
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Attribution */}
            <div className="absolute bottom-3 right-3 text-[10px] text-slate-400 bg-white/80 rounded px-1.5 py-0.5">
              Incidents: GDELT · Sites: OSINT (public)
            </div>
          </div>

          {/* ── Layer legend / toggles ── */}
          <div className="flex flex-wrap items-center gap-1.5 px-4 py-3 border-t border-slate-100">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
              <Layers size={12} /> Layers
            </span>
            {Object.entries(LAYER_DEFS).map(([key, def]) => {
              const on = layers[key];
              return (
                <button
                  key={key}
                  onClick={() => toggleLayer(key)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors ${
                    on
                      ? "bg-white border-slate-300 text-slate-700 shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <svg width="12" height="12" viewBox="-6 -6 12 12" className={on ? "" : "opacity-40"}>
                    <ShapeMark shape={def.shape} r={4.5} color={def.color} />
                  </svg>
                  {def.label}
                  <span className="font-mono text-slate-400">{layerCount(key)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-slate-100">
            <h2 className="font-heading font-bold text-slate-900 text-sm">
              {selected ? "Selection" : "Incident Feed"}
            </h2>
            <span className="text-[11px] font-mono text-slate-400">{feed.length} incidents</span>
          </div>

          {/* Selected detail */}
          {selected && selected.kind === "incident" && (
            <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider"
                  style={{ color: INCIDENT_TYPES[selected.data.type]?.color }}>
                  {INCIDENT_TYPES[selected.data.type]?.label} · {selected.data.intensity}/10
                </span>
                <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600"><X size={13} /></button>
              </div>
              <p className="text-sm font-semibold text-slate-900 mt-1">{selected.data.region}</p>
              <p className="text-xs text-slate-600 mt-1 leading-snug">{selected.data.label}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] text-slate-400 font-mono">{selected.data.source} · {selected.data.date}</span>
                {selected.data.url && (
                  <a href={selected.data.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] font-medium text-blue-800 hover:text-blue-600">
                    Read source <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </div>
          )}

          {selected && selected.kind === "poi" && (
            <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider"
                  style={{ color: LAYER_DEFS[selected.data.layer]?.color }}>
                  <svg width="11" height="11" viewBox="-6 -6 12 12">
                    <ShapeMark shape={LAYER_DEFS[selected.data.layer]?.shape} r={4.5} color={LAYER_DEFS[selected.data.layer]?.color} />
                  </svg>
                  {LAYER_DEFS[selected.data.layer]?.label}
                </span>
                <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600"><X size={13} /></button>
              </div>
              <p className="text-sm font-semibold text-slate-900 mt-1 flex items-center gap-1.5">
                {selected.data.cc && <img src={flag(selected.data.cc)} alt="" className="w-4 h-3 object-cover rounded-sm border border-slate-200" onError={(e) => { e.target.style.display = "none"; }} />}
                {selected.data.name}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">{selected.data.country}</p>
              <p className="text-xs text-slate-600 mt-1.5 leading-snug">{selected.data.note}</p>
            </div>
          )}

          {/* Feed list */}
          <div ref={feedRef} className="max-h-[540px] overflow-y-auto">
            {!layers.incidents ? (
              <div className="px-4 py-10 text-center text-xs text-slate-400">
                Live incidents layer is off. Turn it on to see the feed.
              </div>
            ) : phase !== "ok" ? (
              <div className="px-4 py-10 text-center text-xs text-slate-400">
                {phase === "warming" ? "Waiting for first data collection…" : "No data available."}
              </div>
            ) : feed.length === 0 ? (
              <div className="px-4 py-10 text-center text-xs text-slate-400">No incidents match the current filters.</div>
            ) : (
              feed.map((inc) => {
                const cfg = INCIDENT_TYPES[inc.type];
                const isActive = selected?.kind === "incident" && selected.data.id === inc.id;
                return (
                  <button
                    key={inc.id}
                    onClick={() => selectIncident(inc)}
                    className={`w-full text-left px-4 py-2.5 border-b border-slate-100 transition-colors ${
                      isActive ? "bg-blue-50/60" : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: cfg?.color }} />
                      <span className="text-xs font-semibold text-slate-900 truncate flex-1">{inc.region}</span>
                      <span className="text-[11px] font-mono font-bold shrink-0" style={{ color: severityColor(inc.intensity) }}>{inc.intensity}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-snug line-clamp-2">{inc.label}</p>
                    <p className="text-[10px] text-slate-400 mt-1 font-mono truncate">{cfg?.label} · {inc.source} · {inc.date}</p>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Hover tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 bg-white border border-slate-200 rounded-lg shadow-xl px-3 py-2 pointer-events-none max-w-[240px]"
          style={{ left: tooltip.x + 14, top: tooltip.y - 60 }}
        >
          {tooltip.inc ? (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: INCIDENT_TYPES[tooltip.inc.type]?.color }} />
                <span className="text-xs font-semibold text-slate-900">{tooltip.inc.region}</span>
                <span className="text-[10px] font-mono ml-auto" style={{ color: severityColor(tooltip.inc.intensity) }}>{tooltip.inc.intensity}/10</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug line-clamp-2">{tooltip.inc.label}</p>
              <p className="text-[9px] text-slate-400 mt-1 font-mono">{INCIDENT_TYPES[tooltip.inc.type]?.label} · {tooltip.inc.source}</p>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5">
                <svg width="11" height="11" viewBox="-6 -6 12 12">
                  <ShapeMark shape={LAYER_DEFS[tooltip.poi.layer]?.shape} r={4.5} color={LAYER_DEFS[tooltip.poi.layer]?.color} />
                </svg>
                <span className="text-xs font-semibold text-slate-900">{tooltip.poi.name}</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">{tooltip.poi.country}</p>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug line-clamp-2">{tooltip.poi.note}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
