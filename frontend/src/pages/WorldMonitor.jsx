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

const SELECT_COLOR = "#e879f9"; // magenta selection accent (console style)

const severityColor = (v) => (v >= 8 ? "#f43f5e" : v >= 6 ? "#f59e0b" : "#94a3b8");
const fmtTime = (d) => (d ? d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : "");
const fmtCoord = (lat, lng) =>
  `${Math.abs(lat).toFixed(2)}°${lat >= 0 ? "N" : "S"} ${Math.abs(lng).toFixed(2)}°${lng >= 0 ? "E" : "W"}`;
const timeAgo = (ts) => {
  const m = Math.max(1, Math.round((Date.now() - ts) / 60000));
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  return h < 24 ? `${h}h ago` : `${Math.round(h / 24)}d ago`;
};
const flag = (cc) => `https://flagcdn.com/w40/${cc}.png`;

// USGS live earthquake feed — free, keyless, CORS-enabled
const USGS_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson";

// Basemaps — all free, no API key. Default: dark OSINT style with clean
// labels and street-level detail (maxZoom 19).
const ESRI = (svc) => `https://server.arcgisonline.com/ArcGIS/rest/services/${svc}/MapServer/tile/{z}/{y}/{x}`;
const CARTO = (style) => `https://{s}.basemaps.cartocdn.com/${style}/{z}/{x}/{y}{r}.png`;
const ESRI_ATTR = "Tiles &copy; Esri";
const CARTO_ATTR =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

const BASEMAPS = {
  dark: {
    label: "Dark",
    layers: [{ url: CARTO("dark_all"), attr: CARTO_ATTR, subdomains: "abcd" }],
  },
  satellite: {
    label: "Satellite",
    layers: [
      { url: ESRI("World_Imagery"), attr: ESRI_ATTR },
      { url: ESRI("Reference/World_Boundaries_and_Places"), attr: "" },
    ],
  },
  light: {
    label: "Light",
    layers: [{ url: CARTO("rastertiles/voyager"), attr: CARTO_ATTR, subdomains: "abcd" }],
  },
};

// ── Leaflet marker icon builders ──────────────────────────────────────────────
function incidentIcon(inc) {
  const cfg = INCIDENT_TYPES[inc.type] || {};
  const d = Math.round(14 + inc.intensity * 1.6);
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

// Small swatch matching each layer's on-map style (used in the layer rail)
function LayerSwatch({ def }) {
  if (def.kind === "flag")
    return <span className="inline-block w-3.5 h-2.5 rounded-[2px] border" style={{ borderColor: def.color, background: `${def.color}33` }} />;
  if (def.kind === "area")
    return <span className="inline-block w-3 h-3 rounded-full border-2" style={{ borderColor: def.color, background: `${def.color}33` }} />;
  if (def.kind === "badge")
    return <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full text-[8px]" style={{ background: def.color }}>{def.glyph}</span>;
  if (def.kind === "quake")
    return <span className="inline-block w-3 h-3 rounded-full border-2" style={{ borderColor: def.color, background: `${def.color}55` }} />;
  return <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: def.color, boxShadow: `0 0 6px ${def.color}` }} />;
}

export default function WorldMonitor() {
  const [incidents, setIncidents] = useState([]);
  const [quakes, setQuakes] = useState([]);
  const [updated, setUpdated] = useState(null);
  const [serverWarming, setServerWarming] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [firstLoadDone, setFirstLoadDone] = useState(false);

  // Start with the live conflict picture on; other layers opt-in
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

  // ── Load incidents (backend, GDELT) ──
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

  // ── Load earthquakes (USGS, client-side) ──
  useEffect(() => {
    let timer;
    let alive = true;
    const loadQuakes = async () => {
      try {
        const { data } = await axios.get(USGS_URL, { timeout: 15000 });
        if (!alive) return;
        setQuakes(
          (data.features ?? []).map((f) => ({
            id: f.id,
            mag: f.properties.mag,
            place: f.properties.place || "Unknown location",
            time: f.properties.time,
            url: f.properties.url || "",
            lng: f.geometry.coordinates[0],
            lat: f.geometry.coordinates[1],
            depth: f.geometry.coordinates[2],
          }))
        );
      } catch {
        /* keep previous quakes; layer simply doesn't update */
      }
      timer = setTimeout(loadQuakes, 15 * 60 * 1000);
    };
    loadQuakes();
    return () => { alive = false; clearTimeout(timer); };
  }, []);

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
    // Dedicated top pane so live-incident markers always sit above bases/sites
    map.createPane("wmIncidents");
    map.getPane("wmIncidents").style.zIndex = 650;
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
    const conf = BASEMAPS[basemap] || BASEMAPS.dark;
    baseLayersRef.current = conf.layers.map((l) => {
      const tl = L.tileLayer(l.url, {
        subdomains: l.subdomains || "abc",
        maxZoom: 19,
        attribution: l.attr,
      });
      tl.addTo(map);
      tl.bringToBack();
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
  const selectQuake = useCallback((qk) => {
    setSelected({ kind: "quake", data: qk });
    flyTo(qk.lat, qk.lng, 6);
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
        const m = L.marker([inc.lat, inc.lng], { icon: incidentIcon(inc), pane: "wmIncidents" });
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
              color: def.color, weight: 1.5, opacity: 0.75,
              fillColor: def.color, fillOpacity: 0.12,
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

  // ── Build earthquake markers ──
  useEffect(() => {
    if (!ready) return;
    const g = groupsRef.current.quakes;
    if (!g) return;
    g.clearLayers();
    quakes
      .filter((k) => !q || k.place.toLowerCase().includes(q))
      .forEach((k) => {
        const m = L.circleMarker([k.lat, k.lng], {
          radius: 2 + (k.mag || 2.5) * 1.6,
          color: "#f59e0b", weight: 1.5, opacity: 0.9,
          fillColor: "#f59e0b", fillOpacity: 0.35,
        });
        m.bindTooltip(
          `<b>M${(k.mag ?? 0).toFixed(1)}</b> · ${k.place}<br>${timeAgo(k.time)} · depth ${Math.round(k.depth)} km`,
          { direction: "top", className: "wm-tip" }
        );
        m.on("click", () => selectQuake(k));
        g.addLayer(m);
      });
  }, [ready, quakes, q, selectQuake]);

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

  // ── Magenta highlight ring on the selected entity ──
  useEffect(() => {
    if (!ready) return;
    const map = mapRef.current;
    if (highlightRef.current) { map.removeLayer(highlightRef.current); highlightRef.current = null; }
    if (selected) {
      const { lat, lng } = selected.data;
      highlightRef.current = L.circleMarker([lat, lng], {
        radius: 17, color: SELECT_COLOR, weight: 2, fill: false, dashArray: "4 3",
        interactive: false, pane: "wmIncidents",
      }).addTo(map);
    }
  }, [ready, selected]);

  // ── Derived data ──
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
    sites: Object.keys(POI_LAYERS).reduce((n, k) => n + (layers[k] ? POI_LAYERS[k].length : 0), 0)
      + (layers.quakes ? quakes.length : 0),
  }), [incidents, layers, quakes]);
  const typeCounts = useMemo(() => {
    const c = { all: incidents.length };
    incidents.forEach((i) => { c[i.type] = (c[i.type] ?? 0) + 1; });
    return c;
  }, [incidents]);

  const layerCount = (key) =>
    key === "incidents" ? incidents.length
    : key === "quakes" ? quakes.length
    : POI_LAYERS[key]?.length ?? 0;
  const toggleLayer = (key) => setLayers((l) => ({ ...l, [key]: !l[key] }));
  const setAllLayers = (on) => setLayers((l) => {
    const next = {};
    Object.keys(LAYER_DEFS).forEach((k) => { next[k] = on; });
    return next;
  });

  const phase = incidents.length > 0 ? "ok"
    : !firstLoadDone || serverWarming ? "warming"
    : fetchFailed ? "error" : "warming";

  const statusBadge = phase === "ok" ? (
    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE
    </span>
  ) : phase === "warming" ? (
    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono font-bold">
      <Satellite size={10} className="animate-pulse" /> COLLECTING
    </span>
  ) : (
    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[10px] font-mono font-bold">
      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> OFFLINE
    </span>
  );

  const dossierBody = selected && (
    <div className="px-4 py-3 border-b border-slate-800 bg-slate-900/70">
      <div className="flex items-center justify-between gap-2">
        {selected.kind === "incident" ? (
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: INCIDENT_TYPES[selected.data.type]?.color }}>
            {INCIDENT_TYPES[selected.data.type]?.label} · INTENSITY {selected.data.intensity}/10
          </span>
        ) : selected.kind === "poi" ? (
          <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: LAYER_DEFS[selected.data.layer]?.color }}>
            <LayerSwatch def={LAYER_DEFS[selected.data.layer]} /> {LAYER_DEFS[selected.data.layer]?.label}
          </span>
        ) : (
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
            EARTHQUAKE · M{(selected.data.mag ?? 0).toFixed(1)}
          </span>
        )}
        <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-slate-300"><X size={13} /></button>
      </div>

      {selected.kind === "incident" && (
        <>
          <p className="text-sm font-semibold text-slate-100 mt-1.5">{selected.data.region}</p>
          <p className="text-xs text-slate-300 mt-1 leading-snug">{selected.data.label}</p>
          <p className="text-[10px] text-slate-500 mt-2 font-mono">
            {fmtCoord(selected.data.lat, selected.data.lng)} · {selected.data.source} · {selected.data.date}
          </p>
          {selected.data.url && (
            <a href={selected.data.url} target="_blank" rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-sky-400 hover:text-sky-300">
              Read source <ExternalLink size={11} />
            </a>
          )}
        </>
      )}

      {selected.kind === "poi" && (
        <>
          <p className="text-sm font-semibold text-slate-100 mt-1.5 flex items-center gap-1.5">
            {selected.data.cc && <img src={flag(selected.data.cc)} alt="" className="w-4 h-3 object-cover rounded-sm border border-slate-700" onError={(e) => { e.target.style.display = "none"; }} />}
            {selected.data.name}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">{selected.data.country}</p>
          <p className="text-xs text-slate-300 mt-1.5 leading-snug">{selected.data.note}</p>
          <p className="text-[10px] text-slate-500 mt-2 font-mono">{fmtCoord(selected.data.lat, selected.data.lng)}</p>
        </>
      )}

      {selected.kind === "quake" && (
        <>
          <p className="text-sm font-semibold text-slate-100 mt-1.5">{selected.data.place}</p>
          <p className="text-[10px] text-slate-500 mt-2 font-mono">
            {fmtCoord(selected.data.lat, selected.data.lng)} · depth {Math.round(selected.data.depth)} km · {timeAgo(selected.data.time)}
          </p>
          {selected.data.url && (
            <a href={selected.data.url} target="_blank" rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-sky-400 hover:text-sky-300">
              USGS report <ExternalLink size={11} />
            </a>
          )}
        </>
      )}
    </div>
  );

  return (
    <div className="-m-4 lg:-m-6 flex flex-col bg-slate-950 text-slate-200 lg:h-[calc(100vh-64px)] min-h-[calc(100vh-64px)]">
      {/* Leaflet custom marker styles */}
      <style>{`
        .wm-icon { background: none; border: none; }
        .wm-dot { display:block; position:relative; border-radius:9999px; background:var(--c);
          border:2px solid #fff;
          box-shadow:0 0 0 1px rgba(0,0,0,.55), 0 0 9px 2px var(--c); }
        .wm-pulse::after { content:""; position:absolute; left:50%; top:50%;
          width:100%; height:100%; border-radius:9999px; border:2px solid var(--c);
          transform:translate(-50%,-50%); animation:wmPulse 1.6s ease-out infinite; }
        @keyframes wmPulse { 0%{width:100%;height:100%;opacity:.9;}
          100%{width:340%;height:340%;opacity:0;} }
        .wm-flag { display:flex; width:24px; height:18px; border-radius:3px; overflow:hidden;
          border:2px solid var(--ring); box-shadow:0 0 0 1px rgba(0,0,0,.5),0 1px 4px rgba(0,0,0,.5); background:#fff; }
        .wm-flag img { width:100%; height:100%; object-fit:cover; }
        .wm-badge { display:flex; align-items:center; justify-content:center; width:22px; height:22px;
          border-radius:9999px; background:var(--bg); color:#fff; font-size:12px; line-height:1;
          border:2px solid #fff; box-shadow:0 0 0 1px rgba(0,0,0,.5),0 1px 4px rgba(0,0,0,.5); }
        .wm-tip.leaflet-tooltip { font-size:11px !important; max-width:240px;
          background:#0f172a; color:#f1f5f9; border:1px solid #475569;
          box-shadow:0 2px 10px rgba(0,0,0,.5); }
        .wm-tip.leaflet-tooltip b { color:#fff; }
        .wm-tip.leaflet-tooltip-top:before { border-top-color:#475569; }
        .wm-tip.leaflet-tooltip-bottom:before { border-bottom-color:#475569; }
        .wm-tip.leaflet-tooltip-left:before { border-left-color:#475569; }
        .wm-tip.leaflet-tooltip-right:before { border-right-color:#475569; }
        .leaflet-container { font-family: inherit; background:#0b1220; }
        .leaflet-container .leaflet-control-attribution { background:rgba(15,23,42,.85); color:#cbd5e1; }
        .leaflet-container .leaflet-control-attribution a { color:#e2e8f0; }
      `}</style>

      {/* ── Console top bar ── */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-2.5 border-b border-slate-800 bg-slate-950 shrink-0">
        <h1 className="font-heading text-base font-bold tracking-wide text-slate-100">WORLD MONITOR</h1>
        {statusBadge}
        <span className="px-1.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[9px] font-mono font-semibold tracking-wider rounded">WIP</span>

        {/* Inline console stats */}
        <div className="hidden md:flex items-center gap-3 ml-2 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1"><Activity size={11} className="text-sky-400" />{phase === "ok" ? stats.total : "—"} <span className="text-slate-600">incidents</span></span>
          <span className="flex items-center gap-1"><TriangleAlert size={11} className="text-rose-400" />{phase === "ok" ? stats.critical : "—"} <span className="text-slate-600">critical</span></span>
          <span className="flex items-center gap-1"><Crosshair size={11} className="text-amber-400" />{phase === "ok" ? stats.zones : "—"} <span className="text-slate-600">zones</span></span>
          <span className="flex items-center gap-1"><Layers size={11} className="text-teal-400" />{stats.sites} <span className="text-slate-600">sites</span></span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-500" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search…"
              className="pl-7 pr-2 py-1 w-36 sm:w-48 text-[11px] bg-slate-900 border border-slate-700 rounded-md text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500" />
          </div>
          {updated && <span className="hidden sm:inline text-[10px] text-slate-500 font-mono">upd {fmtTime(updated)}</span>}
          {fetchFailed && incidents.length > 0 && (
            <span className="text-[10px] text-amber-400 font-medium">stale</span>
          )}
          <button onClick={load} disabled={refreshing}
            className="p-1.5 rounded-md bg-slate-900 border border-slate-700 text-slate-400 hover:text-sky-400 hover:border-sky-600 transition-colors disabled:opacity-50">
            <RefreshCw size={12} className={refreshing ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* ── Console body: layer rail · map · dossier ── */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

        {/* Layer rail (left) */}
        <aside className="order-2 lg:order-none lg:w-60 shrink-0 border-t lg:border-t-0 lg:border-r border-slate-800 bg-slate-950 overflow-y-auto">
          <div className="flex items-center justify-between px-3 pt-3 pb-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 flex items-center gap-1.5"><Layers size={11} /> Layers</span>
            <div className="flex items-center gap-1.5 text-[10px] font-medium">
              <button onClick={() => setAllLayers(true)} className="text-slate-500 hover:text-sky-400">all</button>
              <span className="text-slate-700">·</span>
              <button onClick={() => setAllLayers(false)} className="text-slate-500 hover:text-sky-400">none</button>
            </div>
          </div>
          {LAYER_GROUPS.map((group) => (
            <div key={group} className="px-2 pb-1.5">
              <p className="px-1 py-1 text-[9px] font-mono uppercase tracking-widest text-slate-600">{group}</p>
              {Object.entries(LAYER_DEFS).filter(([, d]) => d.group === group).map(([key, def]) => {
                const on = layers[key];
                return (
                  <div key={key}>
                    <button onClick={() => toggleLayer(key)}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[11px] transition-colors ${
                        on ? "text-slate-200 bg-slate-900" : "text-slate-500 hover:text-slate-300 hover:bg-slate-900/50"}`}>
                      <span className={on ? "" : "opacity-40 grayscale"}><LayerSwatch def={def} /></span>
                      <span className="flex-1 text-left truncate">{def.label}</span>
                      <span className="font-mono text-[10px] text-slate-500">{layerCount(key)}</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${on ? "bg-emerald-400" : "bg-slate-700"}`} />
                    </button>
                    {/* Incident type sub-filter under the incidents layer */}
                    {key === "incidents" && on && (
                      <div className="flex flex-wrap gap-1 px-2 pt-1 pb-1.5">
                        {[{ key: "all", label: "All" }, ...Object.entries(INCIDENT_TYPES).map(([k, v]) => ({ key: k, ...v }))].map(({ key: tk, label, color }) => (
                          <button key={tk} onClick={() => setTypeFilter(tk)}
                            className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border transition-colors ${
                              typeFilter === tk
                                ? "bg-sky-500/15 border-sky-500/50 text-sky-300"
                                : "bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300"}`}>
                            {color && <span className="w-1 h-1 rounded-full" style={{ backgroundColor: color }} />}
                            {label} <span className="font-mono text-slate-600">{typeCounts[tk] ?? 0}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
          <p className="px-3 py-2 text-[9px] text-slate-600 border-t border-slate-900">
            Incidents: GDELT · Quakes: USGS · Sites: public OSINT
          </p>
        </aside>

        {/* Map (center) */}
        <div className="order-1 lg:order-none relative flex-1 min-h-[440px]">
          <div ref={mapDivRef} className="absolute inset-0 bg-[#0b1220]" />

          {/* Zoom controls */}
          <div className="absolute top-3 right-3 z-[500] flex flex-col gap-1">
            <button onClick={() => mapRef.current?.zoomIn()} title="Zoom in"
              className="w-8 h-8 flex items-center justify-center bg-slate-900/95 border border-slate-700 rounded-lg shadow text-slate-300 hover:text-sky-400 hover:border-sky-600 transition-colors"><Plus size={15} /></button>
            <button onClick={() => mapRef.current?.zoomOut()} title="Zoom out"
              className="w-8 h-8 flex items-center justify-center bg-slate-900/95 border border-slate-700 rounded-lg shadow text-slate-300 hover:text-sky-400 hover:border-sky-600 transition-colors"><Minus size={15} /></button>
            <button onClick={() => mapRef.current?.setView([25, 15], 3)} title="Reset view"
              className="w-8 h-8 flex items-center justify-center bg-slate-900/95 border border-slate-700 rounded-lg shadow text-slate-300 hover:text-sky-400 hover:border-sky-600 transition-colors"><Locate size={14} /></button>
          </div>

          <div className="absolute top-3 left-3 z-[500] bg-slate-900/85 border border-slate-800 rounded px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
            z{zoom} · scroll or drag
          </div>

          {/* Basemap switcher */}
          <div className="absolute bottom-6 left-3 z-[500] flex items-center bg-slate-900/95 border border-slate-700 rounded-lg shadow overflow-hidden">
            {Object.entries(BASEMAPS).map(([key, conf]) => (
              <button key={key} onClick={() => setBasemap(key)}
                className={`px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  basemap === key ? "bg-sky-600 text-white" : "text-slate-400 hover:bg-slate-800"}`}>
                {conf.label}
              </button>
            ))}
          </div>

          {/* Overlay states */}
          {phase !== "ok" && layers.incidents && (
            <div className="absolute inset-x-0 top-3 z-[500] flex justify-center pointer-events-none">
              <div className="pointer-events-auto bg-slate-900/95 border border-slate-700 rounded-lg shadow px-4 py-2 text-center max-w-sm">
                {phase === "warming" ? (
                  <p className="text-xs text-slate-300 flex items-center gap-1.5 justify-center">
                    <Satellite size={13} className="text-sky-400 animate-pulse" /> Collecting live incidents… other layers work meanwhile.
                  </p>
                ) : (
                  <p className="text-xs text-slate-300 flex items-center gap-2 justify-center">
                    <TriangleAlert size={13} className="text-rose-400" /> Live feed unavailable.
                    <button onClick={load} className="text-sky-400 font-medium hover:underline">Retry</button>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Dossier + feed (right) */}
        <aside className="order-3 lg:w-80 shrink-0 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-950 flex flex-col overflow-hidden max-h-[50vh] lg:max-h-none">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800 shrink-0">
            <h2 className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              {selected ? "Dossier" : "Live Feed"}
            </h2>
            <span className="text-[10px] font-mono text-slate-500">{feed.length} incidents</span>
          </div>

          {dossierBody}

          <div className="flex-1 overflow-y-auto">
            {!layers.incidents ? (
              <div className="px-4 py-10 text-center text-xs text-slate-500">Live incidents layer is off.</div>
            ) : phase !== "ok" ? (
              <div className="px-4 py-10 text-center text-xs text-slate-500">{phase === "warming" ? "Waiting for first data collection…" : "No data available."}</div>
            ) : feed.length === 0 ? (
              <div className="px-4 py-10 text-center text-xs text-slate-500">No incidents match the current filters.</div>
            ) : (
              feed.map((inc) => {
                const cfg = INCIDENT_TYPES[inc.type];
                const isActive = selected?.kind === "incident" && selected.data.id === inc.id;
                return (
                  <button key={inc.id} onClick={() => selectIncident(inc)}
                    className={`w-full text-left px-4 py-2.5 border-b border-slate-900 transition-colors ${
                      isActive ? "bg-fuchsia-500/10 border-l-2 border-l-fuchsia-400" : "hover:bg-slate-900"}`}>
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: cfg?.color, boxShadow: `0 0 5px ${cfg?.color}` }} />
                      <span className="text-xs font-semibold text-slate-200 truncate flex-1">{inc.region}</span>
                      <span className="text-[11px] font-mono font-bold shrink-0" style={{ color: severityColor(inc.intensity) }}>{inc.intensity}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-snug line-clamp-2">{inc.label}</p>
                    <p className="text-[10px] text-slate-600 mt-1 font-mono truncate">{cfg?.label} · {inc.source} · {inc.date}</p>
                  </button>
                );
              })
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
