import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Activity,
  Crosshair,
  ExternalLink,
  Layers,
  Locate,
  Minus,
  Plus,
  RefreshCw,
  Satellite,
  Search,
  TriangleAlert,
  X,
} from "lucide-react";
import { API } from "@/App";
import { LAYER_DEFS, LAYER_GROUPS, POI_LAYERS } from "@/data/mapLayers";

// Incident sub-types (the live "actu" layer)
const INCIDENT_TYPES = {
  combat:       { color: "#e11d48", label: "Combat" },
  strike:       { color: "#ea580c", label: "Strike" },
  political:    { color: "#2563eb", label: "Political" },
  humanitarian: { color: "#0d9488", label: "Humanitarian" },
};

const severityColor = (v) => (v >= 8 ? "#e11d48" : v >= 6 ? "#d97706" : "#64748b");
const fmtTime = (d) => (d ? d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : "");
const flag = (cc) => `https://flagcdn.com/w40/${cc}.png`;

// Basemaps — all free, no API key. Each entry lists the tile layer(s) to
// stack. Default is a dark OSINT-style basemap with clean (non-italic)
// labels and street-level detail when zoomed. Zoom goes to maxZoom 19.
const ESRI = (svc) => `https://server.arcgisonline.com/ArcGIS/rest/services/${svc}/MapServer/tile/{z}/{y}/{x}`;
const CARTO = (style) => `https://{s}.basemaps.cartocdn.com/${style}/{z}/{x}/{y}{r}.png`;
const ESRI_ATTR = "Tiles &copy; Esri";
const CARTO_ATTR =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

const BASEMAPS = {
  dark: {
    label: "Dark",
    dark: true,
    layers: [
      { url: CARTO("dark_all"), attr: CARTO_ATTR, subdomains: "abcd" },
    ],
  },
  satellite: {
    label: "Satellite",
    dark: true,
    layers: [
      { url: ESRI("World_Imagery"), attr: ESRI_ATTR },
      { url: ESRI("Reference/World_Boundaries_and_Places"), attr: "", overlay: true },
    ],
  },
  light: {
    label: "Light",
    layers: [
      { url: CARTO("rastertiles/voyager"), attr: CARTO_ATTR, subdomains: "abcd" },
    ],
  },
};

// ── Leaflet marker icon builders ──────────────────────────────────────────────
function incidentIcon(inc) {
  const cfg = INCIDENT_TYPES[inc.type] || {};
  const d = Math.round(11 + inc.intensity * 1.3);
  const critical = inc.intensity >= 8 ? "wm-pulse" : "";
  return L.divIcon({
    className: "wm-icon",
    html: `<span class="wm-dot ${critical}" style="--c:${cfg.color};width:${d}px;height:${d}px"></span>`,
    iconSize: [d, d],
    iconAnchor: [d / 2, d / 2],
  });
}
function flagIcon(cc, color) {
  return L.divIcon({
    className: "wm-icon",
    html: `<span class="wm-flag" style="--ring:${color}"><img src="${flag(cc)}" alt="" onerror="this.style.display='none'"/></span>`,
    iconSize: [24, 18],
    iconAnchor: [12, 9],
  });
}
function badgeIcon(glyph, color) {
  return L.divIcon({
    className: "wm-icon",
    html: `<span class="wm-badge" style="--bg:${color}">${glyph}</span>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
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

// Small SVG swatch for the legend chips (matches each layer's on-map style)
function LayerSwatch({ def }) {
  if (def.kind === "flag")
    return <span className="inline-block w-3.5 h-2.5 rounded-[2px] border" style={{ borderColor: def.color, background: `${def.color}22` }} />;
  if (def.kind === "area")
    return <span className="inline-block w-3 h-3 rounded-full border-2" style={{ borderColor: def.color, background: `${def.color}22` }} />;
  if (def.kind === "badge")
    return <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full text-[8px] text-white" style={{ background: def.color }}>{def.glyph}</span>;
  return <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: def.color }} />;
}

export default function WorldMonitor() {
  const [incidents, setIncidents] = useState([]);
  const [updated, setUpdated] = useState(null);
  const [serverWarming, setServerWarming] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [firstLoadDone, setFirstLoadDone] = useState(false);

  // Start with all layers off except the live conflict picture
  const [layers, setLayers] = useState(() => {
    const init = {};
    Object.keys(LAYER_DEFS).forEach((k) => { init[k] = k === "incidents" || k === "theaters"; });
    return init;
  });
  const [typeFilter, setTypeFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [zoom, setZoom] = useState(3);
  const [basemap, setBasemap] = useState("dark");
  const [ready, setReady] = useState(false);

  const mapDivRef = useRef(null);
  const mapRef = useRef(null);
  const groupsRef = useRef({});
  const highlightRef = useRef(null);
  const baseLayersRef = useRef([]);

  const q = query.trim().toLowerCase();

  // ── Load incidents ──
  const load = useCallback(async () => {
    setRefreshing(true);
    try {
      const { data } = await axios.get(`${API}/world-monitor/incidents`, { timeout: 30000 });
      setIncidents(data.incidents ?? []);
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

  // ── Init Leaflet map once ──
  useEffect(() => {
    if (mapRef.current || !mapDivRef.current) return;
    const map = L.map(mapDivRef.current, {
      center: [25, 15],
      zoom: 3,
      minZoom: 2,
      maxZoom: 19,
      zoomControl: false,
      worldCopyJump: true,
      attributionControl: true,
    });
    map.on("zoomend", () => setZoom(map.getZoom()));
    // Create one layer group per layer key
    Object.keys(LAYER_DEFS).forEach((k) => { groupsRef.current[k] = L.layerGroup(); });
    mapRef.current = map;
    setReady(true);
    setTimeout(() => map.invalidateSize(), 150);
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  // ── Swap base tile layers when the basemap choice changes ──
  useEffect(() => {
    if (!ready) return;
    const map = mapRef.current;
    baseLayersRef.current.forEach((l) => map.removeLayer(l));
    const conf = BASEMAPS[basemap] || BASEMAPS.terrain;
    baseLayersRef.current = conf.layers.map((l) => {
      const tl = L.tileLayer(l.url, {
        subdomains: l.subdomains || "abc",
        maxZoom: 19,
        attribution: l.attr,
      });
      tl.addTo(map);
      tl.bringToBack(); // keep tiles under all marker/vector layers
      return tl;
    });
  }, [ready, basemap]);

  const flyTo = useCallback((lat, lng, z = 6) => {
    const map = mapRef.current;
    if (!map) return;
    map.flyTo([lat, lng], Math.max(map.getZoom(), z), { duration: 0.8 });
  }, []);

  const selectIncident = useCallback((inc) => {
    setSelected({ kind: "incident", data: inc });
    flyTo(inc.lat, inc.lng, 6);
  }, [flyTo]);
  const selectPOI = useCallback((poi, layer) => {
    setSelected({ kind: "poi", data: { ...poi, layer } });
    flyTo(poi.lat, poi.lng, 6);
  }, [flyTo]);

  // ── Build incident markers ──
  useEffect(() => {
    if (!ready) return;
    const g = groupsRef.current.incidents;
    g.clearLayers();
    incidents
      .filter((i) => (typeFilter === "all" || i.type === typeFilter) &&
        (!q || i.region.toLowerCase().includes(q) || i.label.toLowerCase().includes(q)))
      .forEach((inc) => {
        const m = L.marker([inc.lat, inc.lng], { icon: incidentIcon(inc) });
        m.bindTooltip(
          `<b>${inc.region}</b> · ${inc.intensity}/10<br>${inc.label.slice(0, 90)}`,
          { direction: "top", offset: [0, -6], className: "wm-tip" }
        );
        m.on("click", () => selectIncident(inc));
        g.addLayer(m);
      });
  }, [ready, incidents, typeFilter, q, selectIncident]);

  // ── Build POI markers (per layer) ──
  useEffect(() => {
    if (!ready) return;
    Object.entries(POI_LAYERS).forEach(([key, items]) => {
      const def = LAYER_DEFS[key];
      const g = groupsRef.current[key];
      g.clearLayers();
      items
        .filter((p) => !q || p.name.toLowerCase().includes(q) || p.country.toLowerCase().includes(q))
        .forEach((poi) => {
          if (def.kind === "area") {
            const circle = L.circle([poi.lat, poi.lng], {
              radius: (poi.r || 300) * 1000,
              color: def.color, weight: 1.5, opacity: 0.7,
              fillColor: def.color, fillOpacity: 0.1,
            });
            circle.bindTooltip(`<b>${poi.name}</b><br>${poi.note}`, { direction: "top", className: "wm-tip", sticky: true });
            circle.on("click", () => selectPOI(poi, key));
            g.addLayer(circle);
          } else {
            const icon = def.kind === "flag" ? flagIcon(poi.cc, def.color) : badgeIcon(def.glyph, def.color);
            const m = L.marker([poi.lat, poi.lng], { icon });
            m.bindTooltip(`<b>${poi.name}</b> · ${poi.country}<br>${poi.note}`, { direction: "top", offset: [0, -8], className: "wm-tip" });
            m.on("click", () => selectPOI(poi, key));
            g.addLayer(m);
          }
        });
    });
  }, [ready, q, selectPOI]);

  // ── Toggle layer groups on/off ──
  useEffect(() => {
    if (!ready) return;
    const map = mapRef.current;
    Object.keys(LAYER_DEFS).forEach((k) => {
      const g = groupsRef.current[k];
      if (layers[k]) { if (!map.hasLayer(g)) g.addTo(map); }
      else if (map.hasLayer(g)) map.removeLayer(g);
    });
  }, [ready, layers]);

  // ── Highlight the selected point ──
  useEffect(() => {
    if (!ready) return;
    const map = mapRef.current;
    if (highlightRef.current) { map.removeLayer(highlightRef.current); highlightRef.current = null; }
    if (selected) {
      const { lat, lng } = selected.data;
      highlightRef.current = L.circleMarker([lat, lng], {
        radius: 16, color: "#1e40af", weight: 2, fill: false, dashArray: "4 3",
        interactive: false,
      }).addTo(map);
    }
  }, [ready, selected]);

  // ── Derived data for panels ──
  const filteredIncidents = useMemo(
    () => incidents.filter((i) =>
      (typeFilter === "all" || i.type === typeFilter) &&
      (!q || i.region.toLowerCase().includes(q) || i.label.toLowerCase().includes(q))),
    [incidents, typeFilter, q]
  );
  const feed = useMemo(
    () => [...filteredIncidents].sort((a, b) => b.intensity - a.intensity || (b.date > a.date ? 1 : -1)),
    [filteredIncidents]
  );
  const stats = useMemo(() => ({
    total: incidents.length,
    critical: incidents.filter((i) => i.intensity >= 8).length,
    zones: new Set(incidents.map((i) => i.region)).size,
    sites: Object.keys(POI_LAYERS).reduce((n, k) => n + (layers[k] ? POI_LAYERS[k].length : 0), 0),
  }), [incidents, layers]);
  const typeCounts = useMemo(() => {
    const c = { all: incidents.length };
    incidents.forEach((i) => { c[i.type] = (c[i.type] ?? 0) + 1; });
    return c;
  }, [incidents]);

  const layerCount = (key) => (key === "incidents" ? incidents.length : POI_LAYERS[key]?.length ?? 0);
  const toggleLayer = (key) => setLayers((l) => ({ ...l, [key]: !l[key] }));
  const setAllLayers = (on) => setLayers(() => {
    const next = {};
    Object.keys(LAYER_DEFS).forEach((k) => { next[k] = on; });
    return next;
  });

  const phase = incidents.length > 0 ? "ok"
    : !firstLoadDone || serverWarming ? "warming"
    : fetchFailed ? "error" : "warming";

  const statusBadge = phase === "ok" ? (
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
      {/* Leaflet custom marker styles */}
      <style>{`
        .wm-icon { background: none; border: none; }
        .wm-dot { display:block; border-radius:9999px; background:var(--c); border:2px solid #fff;
          box-shadow:0 0 0 1px rgba(15,23,42,.25); }
        .wm-pulse { animation: wmPulse 1.6s ease-out infinite; }
        @keyframes wmPulse { 0%{box-shadow:0 0 0 0 var(--c),0 0 0 1px rgba(15,23,42,.25);}
          70%{box-shadow:0 0 0 10px transparent,0 0 0 1px rgba(15,23,42,.15);}
          100%{box-shadow:0 0 0 0 transparent,0 0 0 1px rgba(15,23,42,.25);} }
        .wm-flag { display:flex; width:24px; height:18px; border-radius:3px; overflow:hidden;
          border:2px solid var(--ring); box-shadow:0 1px 3px rgba(0,0,0,.3); background:#fff; }
        .wm-flag img { width:100%; height:100%; object-fit:cover; }
        .wm-badge { display:flex; align-items:center; justify-content:center; width:22px; height:22px;
          border-radius:9999px; background:var(--bg); color:#fff; font-size:12px; line-height:1;
          border:2px solid #fff; box-shadow:0 1px 3px rgba(0,0,0,.3); }
        .wm-tip { font-size:11px !important; max-width:230px; }
        .leaflet-container { font-family: inherit; background:#0b1220; }
        .leaflet-container .leaflet-control-attribution { background:rgba(15,23,42,.7); color:#94a3b8; }
        .leaflet-container .leaflet-control-attribution a { color:#cbd5e1; }
      `}</style>

      {/* ── Header ── */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-heading text-2xl font-bold text-slate-900">World Monitor</h1>
            {statusBadge}
            <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 border border-amber-300 text-[9px] font-mono font-semibold tracking-wider rounded">WIP</span>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            OSINT situation map — 16 layers: live incidents, theaters, chokepoints, nuclear & strategic sites, spaceports, SIGINT & military bases
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          {updated && <span className="text-[11px] text-slate-400 font-mono">updated {fmtTime(updated)}</span>}
          {fetchFailed && incidents.length > 0 && (
            <span className="text-[11px] text-amber-600 font-medium">refresh failed — last snapshot</span>
          )}
          <button onClick={load} disabled={refreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:border-blue-300 hover:text-blue-800 transition-colors shadow-sm disabled:opacity-50">
            <RefreshCw size={12} className={refreshing ? "animate-spin" : ""} /> Refresh
          </button>
        </div>
      </div>

      {/* ── Stat tiles ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatTile icon={Activity} tone="blue" label="Active incidents" sub="last 72 h coverage" value={phase === "ok" ? stats.total : "—"} />
        <StatTile icon={TriangleAlert} tone="rose" label="Critical alerts" sub="intensity 8+" value={phase === "ok" ? stats.critical : "—"} />
        <StatTile icon={Crosshair} tone="amber" label="Zones affected" sub="active regions" value={phase === "ok" ? stats.zones : "—"} />
        <StatTile icon={Layers} tone="teal" label="Sites shown" sub="from active layers" value={stats.sites} />
      </div>

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 items-start">
        {/* Map card */}
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] overflow-hidden">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-2 px-4 pt-4 pb-3 border-b border-slate-100">
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search region, base, country…"
                className="pl-8 pr-3 py-1.5 w-56 max-w-full text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300" />
            </div>
            <div className="flex flex-wrap items-center gap-1.5 ml-auto">
              {[{ key: "all", label: "All" }, ...Object.entries(INCIDENT_TYPES).map(([k, v]) => ({ key: k, ...v }))].map(({ key, label, color }) => (
                <button key={key} onClick={() => setTypeFilter(key)} disabled={!layers.incidents}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors disabled:opacity-40 ${
                    typeFilter === key ? "bg-blue-800 border-blue-800 text-white" : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-800"}`}>
                  {color && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />}
                  {label}
                  <span className={`font-mono ${typeFilter === key ? "text-blue-200" : "text-slate-400"}`}>{typeCounts[key] ?? 0}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="relative">
            <div ref={mapDivRef} className="w-full h-[460px] lg:h-[580px] bg-[#0b1220]" />

            {/* Zoom controls */}
            <div className="absolute top-3 right-3 z-[500] flex flex-col gap-1">
              <button onClick={() => mapRef.current?.zoomIn()} title="Zoom in"
                className="w-8 h-8 flex items-center justify-center bg-white/95 border border-slate-200 rounded-lg shadow-sm text-slate-600 hover:text-blue-800 hover:border-blue-300 transition-colors"><Plus size={15} /></button>
              <button onClick={() => mapRef.current?.zoomOut()} title="Zoom out"
                className="w-8 h-8 flex items-center justify-center bg-white/95 border border-slate-200 rounded-lg shadow-sm text-slate-600 hover:text-blue-800 hover:border-blue-300 transition-colors"><Minus size={15} /></button>
              <button onClick={() => mapRef.current?.setView([25, 15], 3)} title="Reset view"
                className="w-8 h-8 flex items-center justify-center bg-white/95 border border-slate-200 rounded-lg shadow-sm text-slate-600 hover:text-blue-800 hover:border-blue-300 transition-colors"><Locate size={14} /></button>
            </div>
            <div className="absolute top-3 left-3 z-[500] flex flex-col gap-1 items-start">
              <span className="bg-white/85 rounded px-1.5 py-0.5 text-[10px] font-mono text-slate-500">
                zoom {zoom} · scroll or drag to explore
              </span>
              <span className="bg-white/80 rounded px-1.5 py-0.5 text-[9px] text-slate-500">
                Incidents: GDELT · Sites: OSINT (public)
              </span>
            </div>

            {/* Basemap switcher */}
            <div className="absolute bottom-3 left-3 z-[500] flex items-center bg-white/95 border border-slate-200 rounded-lg shadow-sm overflow-hidden">
              {Object.entries(BASEMAPS).map(([key, conf]) => (
                <button key={key} onClick={() => setBasemap(key)}
                  className={`px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    basemap === key ? "bg-blue-800 text-white" : "text-slate-600 hover:bg-slate-100"}`}>
                  {conf.label}
                </button>
              ))}
            </div>

            {/* Overlay states */}
            {phase !== "ok" && layers.incidents && (
              <div className="absolute inset-x-0 top-3 z-[500] flex justify-center pointer-events-none">
                <div className="pointer-events-auto bg-white/95 border border-slate-200 rounded-lg shadow-sm px-4 py-2 text-center max-w-sm">
                  {phase === "warming" ? (
                    <p className="text-xs text-slate-600 flex items-center gap-1.5 justify-center">
                      <Satellite size={13} className="text-blue-800 animate-pulse" /> Collecting live incidents… base layers work meanwhile.
                    </p>
                  ) : (
                    <p className="text-xs text-slate-600 flex items-center gap-2 justify-center">
                      <TriangleAlert size={13} className="text-rose-500" /> Live feed unavailable.
                      <button onClick={load} className="text-blue-800 font-medium hover:underline">Retry</button>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Layer toggles — grouped by family */}
          <div className="px-4 py-3 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1"><Layers size={12} /> Layers</span>
              <div className="flex items-center gap-2">
                <button onClick={() => setAllLayers(true)} className="text-[10px] font-medium text-slate-400 hover:text-blue-800">Show all</button>
                <span className="text-slate-200">·</span>
                <button onClick={() => setAllLayers(false)} className="text-[10px] font-medium text-slate-400 hover:text-blue-800">Hide all</button>
              </div>
            </div>
            {LAYER_GROUPS.map((group) => (
              <div key={group} className="flex flex-wrap items-center gap-1.5">
                <span className="text-[9px] font-mono uppercase tracking-wider text-slate-300 w-16 shrink-0">{group}</span>
                {Object.entries(LAYER_DEFS).filter(([, d]) => d.group === group).map(([key, def]) => {
                  const on = layers[key];
                  return (
                    <button key={key} onClick={() => toggleLayer(key)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors ${
                        on ? "bg-white border-slate-300 text-slate-700 shadow-sm" : "bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600"}`}>
                      <span className={on ? "" : "opacity-40"}><LayerSwatch def={def} /></span>
                      {def.label}
                      <span className="font-mono text-slate-400">{layerCount(key)}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-slate-100">
            <h2 className="font-heading font-bold text-slate-900 text-sm">{selected ? "Selection" : "Incident Feed"}</h2>
            <span className="text-[11px] font-mono text-slate-400">{feed.length} incidents</span>
          </div>

          {selected && selected.kind === "incident" && (
            <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: INCIDENT_TYPES[selected.data.type]?.color }}>
                  {INCIDENT_TYPES[selected.data.type]?.label} · {selected.data.intensity}/10
                </span>
                <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600"><X size={13} /></button>
              </div>
              <p className="text-sm font-semibold text-slate-900 mt-1">{selected.data.region}</p>
              <p className="text-xs text-slate-600 mt-1 leading-snug">{selected.data.label}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] text-slate-400 font-mono">{selected.data.source} · {selected.data.date}</span>
                {selected.data.url && (
                  <a href={selected.data.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[11px] font-medium text-blue-800 hover:text-blue-600">
                    Read source <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </div>
          )}

          {selected && selected.kind === "poi" && (
            <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: LAYER_DEFS[selected.data.layer]?.color }}>
                  <LayerSwatch def={LAYER_DEFS[selected.data.layer]} /> {LAYER_DEFS[selected.data.layer]?.label}
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

          <div className="max-h-[560px] overflow-y-auto">
            {!layers.incidents ? (
              <div className="px-4 py-10 text-center text-xs text-slate-400">Live incidents layer is off. Turn it on to see the feed.</div>
            ) : phase !== "ok" ? (
              <div className="px-4 py-10 text-center text-xs text-slate-400">{phase === "warming" ? "Waiting for first data collection…" : "No data available."}</div>
            ) : feed.length === 0 ? (
              <div className="px-4 py-10 text-center text-xs text-slate-400">No incidents match the current filters.</div>
            ) : (
              feed.map((inc) => {
                const cfg = INCIDENT_TYPES[inc.type];
                const isActive = selected?.kind === "incident" && selected.data.id === inc.id;
                return (
                  <button key={inc.id} onClick={() => selectIncident(inc)}
                    className={`w-full text-left px-4 py-2.5 border-b border-slate-100 transition-colors ${isActive ? "bg-blue-50/60" : "hover:bg-slate-50"}`}>
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
    </div>
  );
}
