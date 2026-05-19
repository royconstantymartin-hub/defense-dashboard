import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { API } from "@/App";
import { getLogoUrls } from "@/lib/companyLogos";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Search, Lock, Globe, Building2, ExternalLink,
  DollarSign, TrendingUp, ChevronRight, ChevronLeft, ChevronDown,
  Plane, Cpu, Anchor, Brain, Satellite, Zap, Wrench, Truck, Shield,
} from "lucide-react";
import CompanyProfileSheet from "@/components/CompanyProfileSheet";

// ── Logo helpers ──────────────────────────────────────────────────────────────

const AVATAR_PALETTE = [
  "bg-purple-600", "bg-blue-600", "bg-emerald-600", "bg-rose-600",
  "bg-amber-600", "bg-indigo-600", "bg-sky-600", "bg-orange-600",
];
function avatarColor(name = "") {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffff;
  return AVATAR_PALETTE[h % AVATAR_PALETTE.length];
}
function initials(name = "") {
  return name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}
function LogoWithFallback({ name, website, size = 40 }) {
  const urls = useMemo(() => {
    const curated = getLogoUrls(name);
    if (curated.length > 0) return curated;
    if (website) {
      const domain = website.replace(/^https?:\/\//, "").split("/")[0].toLowerCase();
      return [`https://logo.clearbit.com/${domain}`];
    }
    return [];
  }, [name, website]);
  const [urlIndex, setUrlIndex] = useState(0);

  if (!urls.length || urlIndex >= urls.length) {
    return (
      <div
        className={`${avatarColor(name)} rounded-lg flex items-center justify-center shrink-0 shadow-sm`}
        style={{ width: size, height: size }}
      >
        <span
          className="font-bold text-white tracking-tight"
          style={{ fontSize: size < 32 ? 9 : size < 40 ? 11 : 13 }}
        >
          {initials(name)}
        </span>
      </div>
    );
  }
  return (
    <img
      src={urls[urlIndex]}
      alt={name}
      className="rounded-lg object-contain bg-white border border-slate-100 shrink-0 shadow-sm"
      style={{ width: size, height: size }}
      onError={() => setUrlIndex((i) => i + 1)}
    />
  );
}

// ── Country ISO codes ─────────────────────────────────────────────────────────

const COUNTRY_ISO = {
  "USA": "us", "UK": "gb", "France": "fr", "Germany": "de",
  "Italy": "it", "Spain": "es", "Sweden": "se", "Norway": "no",
  "Finland": "fi", "Netherlands": "nl", "Belgium": "be",
  "Switzerland": "ch", "Poland": "pl", "Czech Republic": "cz",
  "Denmark": "dk", "Estonia": "ee", "Greece": "gr", "Latvia": "lv",
  "Portugal": "pt", "Lithuania": "lt",
  "Israel": "il", "Turkey": "tr", "UAE": "ae", "Saudi Arabia": "sa",
  "India": "in", "China": "cn", "Russia": "ru", "Ukraine": "ua",
  "South Korea": "kr", "Japan": "jp", "Australia": "au",
  "Brazil": "br", "Canada": "ca", "Singapore": "sg",
  "South Africa": "za", "EU": "eu",
};

// ── Formatters ────────────────────────────────────────────────────────────────

function formatCap(value) {
  if (!value || value <= 0) return null;
  if (value >= 1) return `$${value % 1 === 0 ? value : value.toFixed(1)}B`;
  const m = value * 1000;
  if (m >= 1) return `$${m < 10 ? m.toFixed(1) : Math.round(m)}M`;
  return null;
}

// ── Business logic ────────────────────────────────────────────────────────────

function isPrivatePlayer(company) {
  return (
    company.is_public === false ||
    (company.ticker && (company.ticker.includes("-PRIV") || company.ticker === "PRIVATE"))
  );
}

// ── Macro category taxonomy ───────────────────────────────────────────────────

const MACRO_CATEGORIES = [
  {
    id: "autonomous",
    name: "Autonomous Systems & UAV",
    description: "UAVs, loitering munitions, counter-drone",
    icon: Cpu,
    color: "purple",
    keywords: ["UAV", "Small UAV", "Loitering Munitions", "Autonomous", "Counter-UAS", "UAS", "Drones"],
  },
  {
    id: "missiles",
    name: "Missiles & Air Defense",
    description: "Strike systems, interceptors, rockets, ammunition",
    icon: Shield,
    color: "rose",
    keywords: ["Missiles", "Air Defense", "Iron Dome", "Trophy", "Rockets", "Ammunition", "Energetics", "S-400", "Remote Weapons"],
  },
  {
    id: "nuclear",
    name: "Nuclear & Advanced Tech",
    description: "Nuclear, directed energy, advanced propulsion",
    icon: Zap,
    color: "orange",
    keywords: ["Nuclear", "Electromagnetic", "Directed Energy", "Hypersonic", "Power Systems"],
  },
  {
    id: "aerospace",
    name: "Aerospace & Aviation",
    description: "Fixed-wing, rotorcraft, engines, launch systems",
    icon: Plane,
    color: "indigo",
    keywords: ["Aircraft", "Helicopters", "Aerospace", "Rotorcraft", "Rafale", "MiG", "Sukhoi", "Business Jets", "Engines", "Propulsion", "Launch"],
  },
  {
    id: "land",
    name: "Land Systems",
    description: "Armored vehicles, artillery, ground platforms",
    icon: Truck,
    color: "amber",
    keywords: ["Land Systems", "Tanks", "Artillery", "Military Vehicles", "VAB", "Griffon", "K9", "Armored"],
  },
  {
    id: "naval",
    name: "Naval & Maritime",
    description: "Ships, submarines, maritime systems",
    icon: Anchor,
    color: "blue",
    keywords: ["Naval", "Submarines", "Surface Ships", "Shipbuilding", "Maritime", "Frigates", "Sonar"],
  },
  {
    id: "space",
    name: "Space & ISR",
    description: "Satellites, imagery, geospatial intelligence",
    icon: Satellite,
    color: "sky",
    keywords: ["Space", "Satellites", "Imagery", "Geospatial"],
  },
  {
    id: "intel",
    name: "Intelligence, Cyber & EW",
    description: "C2, SIGINT, cyber & electronic warfare",
    icon: Brain,
    color: "emerald",
    keywords: ["Cyber", "AI", "Intelligence", "Analytics", "Software", "Electronic Warfare", "SIGINT", "ISR", "C4I", "Communications", "Radar", "Sensors", "Optronics"],
  },
  {
    id: "industrial",
    name: "Industrial & Tech Base",
    description: "Components, electronics, R&D, simulation, IT",
    icon: Wrench,
    color: "slate",
    keywords: ["Components", "Electronics", "Defense Electronics", "Transmissions", "R&D", "Testing", "Simulation", "Integration", "Engineering", "MRO", "IT", "Consulting", "Health", "Law Enforcement"],
  },
];

// Each color maps to real Tailwind classes — do not construct these dynamically.
const CAT_COLORS = {
  purple: {
    icon: "text-purple-700",
    iconBg: "bg-purple-50 border-purple-200",
    badge: "bg-purple-100 text-purple-700 border border-purple-200",
    accentBar: "bg-purple-600",
    activeBg: "bg-purple-50/50",
    activeBorder: "border-purple-300",
    hoverBorder: "hover:border-purple-200",
    headerBg: "bg-purple-50/60 border-purple-100",
    rowAccent: "bg-purple-600",
  },
  rose: {
    icon: "text-rose-600",
    iconBg: "bg-rose-50 border-rose-200",
    badge: "bg-rose-100 text-rose-700 border border-rose-200",
    accentBar: "bg-rose-500",
    activeBg: "bg-rose-50/50",
    activeBorder: "border-rose-300",
    hoverBorder: "hover:border-rose-200",
    headerBg: "bg-rose-50/60 border-rose-100",
    rowAccent: "bg-rose-500",
  },
  indigo: {
    icon: "text-indigo-600",
    iconBg: "bg-indigo-50 border-indigo-200",
    badge: "bg-indigo-100 text-indigo-700 border border-indigo-200",
    accentBar: "bg-indigo-500",
    activeBg: "bg-indigo-50/50",
    activeBorder: "border-indigo-300",
    hoverBorder: "hover:border-indigo-200",
    headerBg: "bg-indigo-50/60 border-indigo-100",
    rowAccent: "bg-indigo-500",
  },
  amber: {
    icon: "text-amber-600",
    iconBg: "bg-amber-50 border-amber-200",
    badge: "bg-amber-100 text-amber-700 border border-amber-200",
    accentBar: "bg-amber-500",
    activeBg: "bg-amber-50/50",
    activeBorder: "border-amber-300",
    hoverBorder: "hover:border-amber-200",
    headerBg: "bg-amber-50/60 border-amber-100",
    rowAccent: "bg-amber-500",
  },
  blue: {
    icon: "text-blue-600",
    iconBg: "bg-blue-50 border-blue-200",
    badge: "bg-blue-100 text-blue-700 border border-blue-200",
    accentBar: "bg-blue-500",
    activeBg: "bg-blue-50/50",
    activeBorder: "border-blue-300",
    hoverBorder: "hover:border-blue-200",
    headerBg: "bg-blue-50/60 border-blue-100",
    rowAccent: "bg-blue-500",
  },
  sky: {
    icon: "text-sky-600",
    iconBg: "bg-sky-50 border-sky-200",
    badge: "bg-sky-100 text-sky-700 border border-sky-200",
    accentBar: "bg-sky-500",
    activeBg: "bg-sky-50/50",
    activeBorder: "border-sky-300",
    hoverBorder: "hover:border-sky-200",
    headerBg: "bg-sky-50/60 border-sky-100",
    rowAccent: "bg-sky-500",
  },
  emerald: {
    icon: "text-emerald-600",
    iconBg: "bg-emerald-50 border-emerald-200",
    badge: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    accentBar: "bg-emerald-500",
    activeBg: "bg-emerald-50/50",
    activeBorder: "border-emerald-300",
    hoverBorder: "hover:border-emerald-200",
    headerBg: "bg-emerald-50/60 border-emerald-100",
    rowAccent: "bg-emerald-500",
  },
  orange: {
    icon: "text-orange-600",
    iconBg: "bg-orange-50 border-orange-200",
    badge: "bg-orange-100 text-orange-700 border border-orange-200",
    accentBar: "bg-orange-500",
    activeBg: "bg-orange-50/50",
    activeBorder: "border-orange-300",
    hoverBorder: "hover:border-orange-200",
    headerBg: "bg-orange-50/60 border-orange-100",
    rowAccent: "bg-orange-500",
  },
  slate: {
    icon: "text-slate-600",
    iconBg: "bg-slate-100 border-slate-200",
    badge: "bg-slate-100 text-slate-600 border border-slate-200",
    accentBar: "bg-slate-500",
    activeBg: "bg-slate-50",
    activeBorder: "border-slate-400",
    hoverBorder: "hover:border-slate-300",
    headerBg: "bg-slate-50 border-slate-200",
    rowAccent: "bg-slate-500",
  },
};

function assignCategory(company) {
  const specs = new Set((company.specializations || []).map((s) => s.toLowerCase()));
  for (const cat of MACRO_CATEGORIES) {
    if (cat.keywords.some((kw) => specs.has(kw.toLowerCase()))) return cat.id;
  }
  return "industrial";
}

// ── Category tile ─────────────────────────────────────────────────────────────

function CategoryTile({ category, companies, isSelected, onSelect }) {
  const clr = CAT_COLORS[category.color];
  const Icon = category.icon;
  const topLogos = companies.slice(0, 6);
  const isEmpty = companies.length === 0;

  return (
    <button
      onClick={isEmpty ? undefined : onSelect}
      disabled={isEmpty}
      className={`relative w-full text-left p-4 rounded-xl border transition-all duration-150 bg-white overflow-hidden shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] ${
        isEmpty
          ? "opacity-40 cursor-default border-slate-100"
          : isSelected
          ? `${clr.activeBorder} ${clr.activeBg} shadow-md`
          : `border-slate-200 ${clr.hoverBorder} hover:shadow-md`
      }`}
    >
      {/* Colored left accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${clr.accentBar} ${isEmpty ? "opacity-30" : ""}`} />

      {/* Header row */}
      <div className="flex items-start justify-between mb-3 pl-1">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center border flex-shrink-0 ${clr.iconBg}`}>
            <Icon className={`w-4 h-4 ${clr.icon}`} />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-[13px] text-slate-800 leading-tight">{category.name}</h3>
            <p className="text-[11px] text-slate-400 leading-tight mt-0.5 line-clamp-1">{category.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
          <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full ${clr.badge}`}>
            {companies.length}
          </span>
          {!isEmpty && (
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isSelected ? "rotate-180" : ""}`} />
          )}
        </div>
      </div>

      {/* Logo strip */}
      {topLogos.length > 0 && (
        <div className="flex items-center gap-1.5 mt-2 pl-1">
          {topLogos.map((c) => (
            <LogoWithFallback key={c.id || c.name} name={c.name} website={c.website} size={30} />
          ))}
          {companies.length > 6 && (
            <div
              className={`rounded-lg flex items-center justify-center flex-shrink-0 border ${clr.iconBg}`}
              style={{ width: 30, height: 30 }}
            >
              <span className={`text-[9px] font-bold ${clr.icon}`}>+{companies.length - 6}</span>
            </div>
          )}
        </div>
      )}
    </button>
  );
}

// ── Compact company row ───────────────────────────────────────────────────────

function CompactPlayerRow({ company, onClick, accentColor }) {
  const iso = COUNTRY_ISO[(company.country || "").trim()];
  const cap = formatCap(company.market_cap) || formatCap(company.revenue);
  const isRevenue = !formatCap(company.market_cap) && !!formatCap(company.revenue);
  const url = company.website
    ? (company.website.startsWith("http") ? company.website : `https://${company.website}`)
    : null;
  const stage = company.funding_stage
    ? company.funding_stage.replace(/^Private\s*[—–-]\s*/i, "").trim()
    : null;
  const stageIsNamed = stage && /series|seed|venture|growth|bootstrap/i.test(stage);

  return (
    <div
      className="relative flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer group"
      onClick={onClick}
    >
      {/* Hover accent bar */}
      <div className={`absolute left-0 top-2 bottom-2 w-[3px] rounded-r ${accentColor || "bg-purple-600"} opacity-0 group-hover:opacity-100 transition-opacity`} />

      <LogoWithFallback name={company.name} website={company.website} size={36} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[13px] text-slate-800 group-hover:text-slate-900 transition-colors truncate">
            {company.name}
          </span>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-slate-300 hover:text-blue-500 flex-shrink-0 transition-colors opacity-0 group-hover:opacity-100"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          {iso && (
            <img
              src={`https://flagcdn.com/w20/${iso}.png`}
              alt={company.country}
              className="w-4 h-auto rounded-sm flex-shrink-0"
              onError={(e) => { e.target.style.display = "none"; }}
            />
          )}
          <span className="text-[11px] text-slate-400 truncate">
            {company.headquarters || company.country || "—"}
            {company.founded_year && (
              <span className="text-slate-300"> · est. {company.founded_year}</span>
            )}
          </span>
        </div>
      </div>

      {stageIsNamed && (
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex-shrink-0 hidden sm:block">
          {stage}
        </span>
      )}

      <div className="w-24 text-right flex-shrink-0">
        {cap ? (
          <div>
            <span className="text-xs font-mono font-semibold text-slate-700">{cap}</span>
            {isRevenue && <p className="text-[9px] text-slate-400 leading-tight">revenue</p>}
          </div>
        ) : (
          <span className="text-xs text-slate-200">—</span>
        )}
      </div>

      <ChevronRight className="w-3.5 h-3.5 text-slate-200 group-hover:text-slate-500 transition-colors flex-shrink-0" />
    </div>
  );
}

// ── Expanded category list ────────────────────────────────────────────────────

function ExpandedList({ category, companies, onCompanyClick }) {
  const clr = CAT_COLORS[category.color];
  const Icon = category.icon;
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
      {/* Colored header */}
      <div className={`flex items-center gap-3 px-4 py-3 border-b ${clr.headerBg}`}>
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center border ${clr.iconBg}`}>
          <Icon className={`w-3.5 h-3.5 ${clr.icon}`} />
        </div>
        <span className="text-sm font-semibold text-slate-700">{category.name}</span>
        <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full ml-auto ${clr.badge}`}>
          {companies.length} companies
        </span>
      </div>
      {/* Column headers */}
      <div className="flex items-center gap-3 px-4 py-1.5 border-b border-slate-100 bg-slate-50/50">
        <div className="w-9 flex-shrink-0" />
        <div className="flex-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Company</div>
        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider hidden sm:block" style={{ width: 80 }}>Stage</div>
        <div className="w-24 text-[10px] font-semibold text-slate-400 uppercase tracking-wider text-right">
          Valuation
        </div>
        <div className="w-3.5 flex-shrink-0" />
      </div>
      <div className="divide-y divide-slate-50">
        {companies.map((c) => (
          <CompactPlayerRow
            key={c.id || c.name}
            company={c}
            accentColor={clr.accentBar}
            onClick={() => onCompanyClick(c.name)}
          />
        ))}
      </div>
    </div>
  );
}

// ── Pagination controls ───────────────────────────────────────────────────────

const PAGE_SIZE = 25;

function Pagination({ page, totalPages, total, onChange }) {
  if (totalPages <= 1) return null;
  const from = (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, total);
  return (
    <div className="flex items-center justify-between mt-4 px-1">
      <p className="text-xs text-slate-400">{from}–{to} of {total} companies</p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          className="flex items-center gap-1 px-3 h-8 text-sm rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>
        <span className="text-xs font-mono text-slate-500 px-2">{page} / {totalPages}</span>
        <button
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          className="flex items-center gap-1 px-3 h-8 text-sm rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function PrivatePlayers() {
  const [companies, setCompanies]         = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);
  const [search, setSearch]               = useState("");
  const [filterCountry, setFilterCountry] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [page, setPage]                   = useState(1);
  const [profileName, setProfileName]     = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API}/defense-players`);
        setCompanies(data);
      } catch {
        setError("Failed to load company data.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const players = useMemo(() => companies.filter(isPrivatePlayer), [companies]);

  const countryCounts = useMemo(() => {
    const map = {};
    players.forEach((c) => { if (c.country) map[c.country] = (map[c.country] || 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [players]);

  const maxCountryCount = useMemo(
    () => countryCounts.reduce((m, [, n]) => Math.max(m, n), 0),
    [countryCounts]
  );

  const countryFiltered = useMemo(() => {
    if (filterCountry === "all") return players;
    return players.filter((c) => c.country === filterCountry);
  }, [players, filterCountry]);

  const categorized = useMemo(() => {
    const map = {};
    MACRO_CATEGORIES.forEach((cat) => { map[cat.id] = []; });
    countryFiltered.forEach((c) => { map[assignCategory(c)].push(c); });
    return map;
  }, [countryFiltered]);

  const isSearchActive = search.trim().length > 0;

  const searchResults = useMemo(() => {
    if (!isSearchActive) return [];
    const q = search.toLowerCase();
    return countryFiltered.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.description || "").toLowerCase().includes(q) ||
        (c.specializations || []).some((s) => s.toLowerCase().includes(q)) ||
        (c.headquarters || "").toLowerCase().includes(q) ||
        (c.country || "").toLowerCase().includes(q)
    );
  }, [countryFiltered, search, isSearchActive]);

  const totalSearchPages = Math.ceil(searchResults.length / PAGE_SIZE);
  const paginatedSearch = searchResults.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => { setPage(1); }, [search, filterCountry]);

  const totalValuation = useMemo(
    () => players.reduce((s, c) => s + (c.market_cap || 0), 0),
    [players]
  );
  const totalFunded = useMemo(
    () => players.filter((c) => /series|seed|venture|growth|bootstrap|late stage/i.test(c.funding_stage || "")).length,
    [players]
  );

  function handleCategorySelect(catId) {
    setSelectedCategory((prev) => (prev === catId ? null : catId));
  }

  const activeCategoryData = selectedCategory
    ? MACRO_CATEGORIES.find((c) => c.id === selectedCategory)
    : null;

  return (
    <div className="p-6 max-w-screen-2xl mx-auto">

      {/* Page header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-purple-700 flex items-center justify-center shadow-sm">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-heading">Private Players</h1>
            <p className="text-sm text-slate-500">
              Non-publicly-listed defense companies
            </p>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      {!loading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Companies",       value: players.length,                    icon: Building2,  iconCls: "text-purple-700", bgCls: "bg-purple-50" },
            { label: countryCounts.length === 1 ? "Country" : "Countries", value: countryCounts.length, icon: Globe, iconCls: "text-blue-600", bgCls: "bg-blue-50" },
            { label: "Agg. Valuation*", value: formatCap(totalValuation) || "—",  icon: TrendingUp, iconCls: "text-emerald-600", bgCls: "bg-emerald-50" },
            { label: "VC / PE Backed",  value: totalFunded,                        icon: DollarSign, iconCls: "text-amber-600",  bgCls: "bg-amber-50" },
          ].map(({ label, value, icon: Icon, iconCls, bgCls }) => (
            <Card key={label} className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${bgCls} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${iconCls}`} />
                </div>
                <div>
                  <p className="text-xl font-bold text-slate-900 font-heading">{value}</p>
                  <p className="text-xs text-slate-500">{label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Search bar */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search companies…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-sm border-slate-200"
          />
        </div>
        {(search || filterCountry !== "all") && (
          <button
            onClick={() => { setSearch(""); setFilterCountry("all"); setSelectedCategory(null); }}
            className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1.5 px-3 h-9 rounded-md border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      {/* Body */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-slate-200 border-t-purple-700 animate-spin" />
          <p className="text-sm text-slate-500">Loading companies…</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-24 gap-2">
          <Building2 className="w-10 h-10 text-rose-400" />
          <p className="text-sm text-rose-600">{error}</p>
        </div>
      ) : (
        <div className="flex gap-6 items-start">

          {/* ── Country sidebar ── */}
          <div className="w-56 flex-shrink-0 sticky top-6">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">
              Countries
            </p>
            <div className="flex flex-col gap-0.5">
              {/* All countries row */}
              <button
                onClick={() => setFilterCountry("all")}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  filterCountry === "all"
                    ? "bg-purple-50 text-purple-900 font-semibold border border-purple-200"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <span>All countries</span>
                <span className={`text-[11px] font-mono px-1.5 py-0.5 rounded-full ${
                  filterCountry === "all" ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-400"
                }`}>
                  {players.length}
                </span>
              </button>

              <div className="my-1 border-t border-slate-100" />

              {countryCounts.map(([country, count]) => {
                const iso = COUNTRY_ISO[country];
                const active = filterCountry === country;
                const barPct = maxCountryCount > 0 ? Math.round((count / maxCountryCount) * 100) : 0;
                return (
                  <button
                    key={country}
                    onClick={() => setFilterCountry(country)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      active
                        ? "bg-purple-50 text-purple-900 font-semibold border border-purple-200"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      {iso ? (
                        <img
                          src={`https://flagcdn.com/w20/${iso}.png`}
                          alt={country}
                          className="w-4 h-auto rounded-sm flex-shrink-0"
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                      ) : (
                        <Globe className="w-4 h-4 text-slate-300 flex-shrink-0" />
                      )}
                      <span className="text-[13px] leading-tight">{country}</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {/* Mini proportional bar */}
                      <div className="w-10 h-1 rounded-full bg-slate-100 overflow-hidden hidden sm:block">
                        <div
                          className={`h-full rounded-full transition-all ${active ? "bg-purple-400" : "bg-slate-300"}`}
                          style={{ width: `${barPct}%` }}
                        />
                      </div>
                      <span className={`text-[11px] font-mono px-1.5 py-0.5 rounded-full ${
                        active ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-400"
                      }`}>
                        {count}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0">
            {isSearchActive ? (
              searchResults.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-2">
                  <Lock className="w-10 h-10 text-slate-200" />
                  <p className="text-slate-400 text-sm">No companies match your search.</p>
                  <button
                    onClick={() => { setSearch(""); setFilterCountry("all"); setSelectedCategory(null); }}
                    className="mt-1 text-xs text-purple-600 hover:text-purple-800 font-medium underline underline-offset-2"
                  >
                    Clear search
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-xs text-slate-400 mb-2 px-1">
                    {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for &ldquo;{search}&rdquo;
                  </p>
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
                    <div className="flex items-center gap-3 px-4 py-1.5 border-b border-slate-100 bg-slate-50/50">
                      <div className="w-9 flex-shrink-0" />
                      <div className="flex-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Company</div>
                      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider hidden sm:block" style={{ width: 80 }}>Stage</div>
                      <div className="w-24 text-[10px] font-semibold text-slate-400 uppercase tracking-wider text-right">
                        Valuation
                      </div>
                      <div className="w-3.5 flex-shrink-0" />
                    </div>
                    <div className="divide-y divide-slate-50">
                      {paginatedSearch.map((c) => (
                        <CompactPlayerRow
                          key={c.id || c.name}
                          company={c}
                          onClick={() => setProfileName(c.name)}
                        />
                      ))}
                    </div>
                  </div>
                  <Pagination
                    page={page}
                    totalPages={totalSearchPages}
                    total={searchResults.length}
                    onChange={setPage}
                  />
                </>
              )
            ) : (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {MACRO_CATEGORIES.filter((cat) => (categorized[cat.id] || []).length > 0).map((cat) => (
                    <CategoryTile
                      key={cat.id}
                      category={cat}
                      companies={categorized[cat.id] || []}
                      isSelected={selectedCategory === cat.id}
                      onSelect={() => handleCategorySelect(cat.id)}
                    />
                  ))}
                </div>

                {selectedCategory && activeCategoryData && (categorized[selectedCategory] || []).length > 0 && (
                  <ExpandedList
                    category={activeCategoryData}
                    companies={categorized[selectedCategory]}
                    onCompanyClick={setProfileName}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <CompanyProfileSheet name={profileName} onClose={() => setProfileName(null)} />
    </div>
  );
}
