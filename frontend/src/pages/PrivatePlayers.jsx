import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { API } from "@/App";
import { getLogoUrls } from "@/lib/companyLogos";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Search, Lock, Globe, Building2, ExternalLink,
  DollarSign, TrendingUp, ChevronRight, ChevronLeft,
  ChevronDown, Zap, BarChart2, Users,
} from "lucide-react";
import CompanyProfileSheet from "@/components/CompanyProfileSheet";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const isListed = (c) =>
  c.is_public !== false &&
  c.ticker &&
  !c.ticker.includes("-PRIV") &&
  c.ticker !== "PRIVATE" &&
  !c.ticker.includes("PRIV");

const COUNTRY_ISO = {
  "USA": "us", "UK": "gb", "France": "fr", "Germany": "de",
  "Italy": "it", "Spain": "es", "Sweden": "se", "Norway": "no",
  "Finland": "fi", "Netherlands": "nl", "Belgium": "be",
  "Switzerland": "ch", "Poland": "pl", "Czech Republic": "cz",
  "Denmark": "dk", "Estonia": "ee", "Greece": "gr",
  "Portugal": "pt", "Israel": "il", "Turkey": "tr",
  "UAE": "ae", "Saudi Arabia": "sa", "India": "in",
  "China": "cn", "Russia": "ru", "Ukraine": "ua",
  "South Korea": "kr", "Japan": "jp", "Australia": "au",
  "Brazil": "br", "Canada": "ca", "Singapore": "sg",
  "South Africa": "za", "EU": "eu",
};

function formatCap(value) {
  if (!value || value <= 0) return null;
  if (value >= 1) return `$${value % 1 === 0 ? value : value.toFixed(1)}B`;
  const m = value * 1000;
  return `$${m < 10 ? m.toFixed(1) : Math.round(m)}M`;
}

function avatarColor(name = "") {
  const palette = ["bg-slate-600", "bg-slate-500", "bg-slate-700"];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffff;
  return palette[h % palette.length];
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
  const [idx, setIdx] = useState(0);

  if (!urls.length || idx >= urls.length) {
    return (
      <div
        className={`${avatarColor(name)} rounded-lg flex items-center justify-center shrink-0`}
        style={{ width: size, height: size }}
      >
        <span className="font-bold text-white tracking-tight" style={{ fontSize: size < 32 ? 9 : 12 }}>
          {initials(name)}
        </span>
      </div>
    );
  }
  return (
    <img
      src={urls[idx]}
      alt={name}
      className="rounded-lg object-contain bg-white border border-slate-100 shrink-0"
      style={{ width: size, height: size }}
      onError={() => setIdx((i) => i + 1)}
    />
  );
}

// ─── Category icons (SVG silhouettes) ────────────────────────────────────────

function CategoryIcon({ id, className }) {
  const icons = {
    autonomous: (
      <svg viewBox="0 0 40 40" className={className}>
        <line x1="13" y1="13" x2="6" y2="6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <line x1="27" y1="13" x2="34" y2="6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <line x1="13" y1="27" x2="6" y2="34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <line x1="27" y1="27" x2="34" y2="34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <rect x="12" y="12" width="16" height="16" rx="3" fill="currentColor" />
        <circle cx="5" cy="5" r="4.5" fill="currentColor" />
        <circle cx="35" cy="5" r="4.5" fill="currentColor" />
        <circle cx="5" cy="35" r="4.5" fill="currentColor" />
        <circle cx="35" cy="35" r="4.5" fill="currentColor" />
      </svg>
    ),
    missiles: (
      <svg viewBox="0 0 40 40" fill="currentColor" className={className}>
        <polygon points="20,2 15,13 25,13" />
        <rect x="15" y="13" width="10" height="18" rx="1.5" />
        <polygon points="15,27 8,36 15,32" />
        <polygon points="25,27 32,36 25,32" />
        <ellipse cx="20" cy="33" rx="5" ry="2.5" opacity="0.45" />
      </svg>
    ),
    aerospace: (
      <svg viewBox="0 0 40 40" fill="currentColor" className={className}>
        <polygon points="20,2 17.5,25 20,30 22.5,25" />
        <polygon points="17.5,19 2,31 17.5,25" />
        <polygon points="22.5,19 38,31 22.5,25" />
        <polygon points="17.5,26 13,37 19,32" />
        <polygon points="22.5,26 27,37 21,32" />
      </svg>
    ),
    land: (
      <svg viewBox="0 0 40 40" fill="currentColor" className={className}>
        <rect x="4" y="25" width="32" height="10" rx="5" />
        <rect x="7" y="18" width="24" height="9" rx="2" />
        <rect x="11" y="11" width="14" height="9" rx="2" />
        <rect x="23" y="13" width="13" height="3.5" rx="1.75" />
      </svg>
    ),
    naval: (
      <svg viewBox="0 0 40 40" fill="currentColor" className={className}>
        <ellipse cx="20" cy="26" rx="17" ry="8" />
        <rect x="13" y="16" width="11" height="11" rx="2" />
        <rect x="18.5" y="8" width="3" height="10" rx="1.5" />
        <rect x="14" y="7" width="10" height="3.5" rx="1.75" />
      </svg>
    ),
    space: (
      <svg viewBox="0 0 40 40" fill="currentColor" className={className}>
        <rect x="1" y="17" width="11" height="8" rx="1.5" />
        <rect x="12" y="19.5" width="3" height="3" />
        <rect x="13" y="14" width="14" height="14" rx="2" />
        <rect x="27" y="19.5" width="3" height="3" />
        <rect x="30" y="17" width="11" height="8" rx="1.5" />
        <rect x="18.5" y="5" width="3" height="9" rx="1.5" />
        <circle cx="20" cy="4" r="3" />
      </svg>
    ),
    intel: (
      <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor">
        <circle cx="20" cy="20" r="16" strokeWidth="2.5" />
        <circle cx="20" cy="20" r="10" strokeWidth="1.5" opacity="0.5" />
        <circle cx="20" cy="20" r="4" strokeWidth="1.5" opacity="0.5" />
        <line x1="4" y1="20" x2="36" y2="20" strokeWidth="1.2" opacity="0.35" />
        <line x1="20" y1="4" x2="20" y2="36" strokeWidth="1.2" opacity="0.35" />
        <line x1="20" y1="20" x2="34" y2="11" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="31" cy="13" r="2.5" fill="currentColor" stroke="none" />
      </svg>
    ),
    nuclear: (
      <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="20" cy="20" r="4" fill="currentColor" stroke="none" />
        <ellipse cx="20" cy="20" rx="17" ry="6" />
        <ellipse cx="20" cy="20" rx="17" ry="6" transform="rotate(60 20 20)" />
        <ellipse cx="20" cy="20" rx="17" ry="6" transform="rotate(120 20 20)" />
      </svg>
    ),
    industrial: (
      <svg viewBox="0 0 40 40" fill="currentColor" className={className}>
        <rect x="4" y="20" width="32" height="16" rx="1.5" />
        <rect x="7" y="11" width="5" height="11" rx="1" />
        <rect x="15" y="14" width="5" height="8" rx="1" />
        <rect x="28" y="9" width="5" height="13" rx="1" />
        <circle cx="9.5" cy="9.5" r="3.5" />
        <circle cx="17.5" cy="12.5" r="2.5" />
        <circle cx="30.5" cy="7.5" r="3" />
        <rect x="9" y="24" width="5" height="5" rx="1" fill="white" opacity="0.35" />
        <rect x="18" y="24" width="5" height="5" rx="1" fill="white" opacity="0.35" />
        <rect x="27" y="24" width="5" height="5" rx="1" fill="white" opacity="0.35" />
      </svg>
    ),
  };
  return icons[id] || null;
}

// ─── Taxonomy ─────────────────────────────────────────────────────────────────

const MACRO_CATEGORIES = [
  { id: "autonomous", name: "Autonomous & UAV",       description: "Unmanned platforms, loitering munitions, counter-drone", color: "purple",  keywords: ["UAV", "Small UAV", "Loitering Munitions", "Autonomous", "Counter-UAS", "UAS", "Drones"] },
  { id: "missiles",   name: "Missiles & Air Defense", description: "Strike systems, interceptors, rockets, ammunition",       color: "rose",    keywords: ["Missiles", "Air Defense", "Rockets", "Ammunition", "Energetics", "Remote Weapons"] },
  { id: "nuclear",    name: "Nuclear & Advanced Tech", description: "Nuclear, directed energy, advanced propulsion",          color: "orange",  keywords: ["Nuclear", "Electromagnetic", "Directed Energy", "Hypersonic", "Power Systems"] },
  { id: "aerospace",  name: "Aerospace & Aviation",   description: "Fixed-wing, rotorcraft, engines, launch systems",        color: "indigo",  keywords: ["Aircraft", "Helicopters", "Aerospace", "Rotorcraft", "Business Jets", "Engines", "Propulsion", "Launch", "Aerostructures"] },
  { id: "land",       name: "Land Systems",           description: "Armored vehicles, artillery, ground platforms",          color: "amber",   keywords: ["Land Systems", "Tanks", "Artillery", "Military Vehicles", "Armored", "Land"] },
  { id: "naval",      name: "Naval & Maritime",       description: "Ships, submarines, maritime systems",                   color: "blue",    keywords: ["Naval", "Submarines", "Surface Ships", "Shipbuilding", "Maritime", "Sonar", "LCS"] },
  { id: "space",      name: "Space & ISR",            description: "Satellites, imagery, geospatial intelligence",          color: "sky",     keywords: ["Space", "Satellites", "Imagery", "Geospatial", "Launch"] },
  { id: "intel",      name: "Cyber, EW & Intelligence", description: "C2, SIGINT, electronic warfare, AI & analytics",     color: "emerald", keywords: ["Cyber", "AI", "Intelligence", "Analytics", "Software", "Electronic Warfare", "SIGINT", "ISR", "C4I", "Communications", "Radar", "Sensors", "Optronics", "EW"] },
  { id: "industrial", name: "Industrial & Tech Base", description: "Components, electronics, R&D, simulation, IT services", color: "slate",   keywords: ["Components", "Electronics", "Defense Electronics", "R&D", "Testing", "Simulation", "Integration", "Engineering", "MRO", "IT", "Consulting", "Services", "Logistics", "Training"] },
];

const CAT_COLORS = {
  purple:  { border: "border-violet-200", activeBorder: "border-violet-600", activeBg: "bg-violet-50/60", iconBg: "bg-violet-50 border-violet-100", icon: "text-violet-700", badge: "bg-violet-100 text-violet-800", headerBg: "bg-violet-50/80", text: "text-violet-800" },
  rose:    { border: "border-rose-200",   activeBorder: "border-rose-500",   activeBg: "bg-rose-50/60",   iconBg: "bg-rose-50 border-rose-100",     icon: "text-rose-600",   badge: "bg-rose-100 text-rose-700",     headerBg: "bg-rose-50/80",   text: "text-rose-700"   },
  orange:  { border: "border-orange-200", activeBorder: "border-orange-500", activeBg: "bg-orange-50/60", iconBg: "bg-orange-50 border-orange-100", icon: "text-orange-600", badge: "bg-orange-100 text-orange-700", headerBg: "bg-orange-50/80", text: "text-orange-700" },
  indigo:  { border: "border-indigo-200", activeBorder: "border-indigo-500", activeBg: "bg-indigo-50/60", iconBg: "bg-indigo-50 border-indigo-100", icon: "text-indigo-600", badge: "bg-indigo-100 text-indigo-700", headerBg: "bg-indigo-50/80", text: "text-indigo-700" },
  amber:   { border: "border-amber-200",  activeBorder: "border-amber-500",  activeBg: "bg-amber-50/60",  iconBg: "bg-amber-50 border-amber-100",   icon: "text-amber-600",  badge: "bg-amber-100 text-amber-700",  headerBg: "bg-amber-50/80",  text: "text-amber-700"  },
  blue:    { border: "border-blue-200",   activeBorder: "border-blue-500",   activeBg: "bg-blue-50/60",   iconBg: "bg-blue-50 border-blue-100",     icon: "text-blue-600",   badge: "bg-blue-100 text-blue-700",     headerBg: "bg-blue-50/80",   text: "text-blue-700"   },
  sky:     { border: "border-sky-200",    activeBorder: "border-sky-500",    activeBg: "bg-sky-50/60",    iconBg: "bg-sky-50 border-sky-100",       icon: "text-sky-600",    badge: "bg-sky-100 text-sky-700",       headerBg: "bg-sky-50/80",    text: "text-sky-700"    },
  emerald: { border: "border-emerald-200",activeBorder: "border-emerald-500",activeBg: "bg-emerald-50/60",iconBg: "bg-emerald-50 border-emerald-100",icon: "text-emerald-600",badge: "bg-emerald-100 text-emerald-700",headerBg: "bg-emerald-50/80",text: "text-emerald-700"},
  slate:   { border: "border-slate-200",  activeBorder: "border-slate-400",  activeBg: "bg-slate-50",     iconBg: "bg-slate-50 border-slate-100",   icon: "text-slate-500",  badge: "bg-slate-100 text-slate-600",  headerBg: "bg-slate-50",     text: "text-slate-600"  },
};

function assignCategory(company) {
  const specs = new Set((company.specializations || []).map((s) => s.toLowerCase()));
  for (const cat of MACRO_CATEGORIES) {
    if (cat.keywords.some((kw) => specs.has(kw.toLowerCase()))) return cat.id;
  }
  return "industrial";
}

// ─── Company type badge ────────────────────────────────────────────────────────

function TypeBadge({ listed }) {
  if (listed) {
    return (
      <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest px-1.5 py-px rounded-full bg-blue-50 text-blue-700 border border-blue-200">
        <BarChart2 className="w-2.5 h-2.5" />
        Listed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest px-1.5 py-px rounded-full bg-slate-100 text-slate-500 border border-slate-200">
      <Lock className="w-2.5 h-2.5" />
      Private
    </span>
  );
}

// ─── Category tile ────────────────────────────────────────────────────────────

function CategoryTile({ category, companies, isSelected, onSelect }) {
  const clr = CAT_COLORS[category.color];
  const isEmpty = companies.length === 0;
  const listedCount = companies.filter(isListed).length;
  const privateCount = companies.length - listedCount;
  const topLogos = companies.slice(0, 8);

  return (
    <button
      onClick={isEmpty ? undefined : onSelect}
      disabled={isEmpty}
      className={`w-full text-left p-4 rounded-xl border bg-white transition-all duration-150 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] ${
        isEmpty
          ? "opacity-40 cursor-default border-slate-100"
          : isSelected
          ? `${clr.activeBorder} ${clr.activeBg} shadow-md border-2`
          : `${clr.border} hover:shadow-md hover:border-opacity-80`
      }`}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border flex-shrink-0 p-2 ${clr.iconBg}`}>
          <CategoryIcon id={category.id} className={`w-full h-full ${clr.icon}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[13px] text-slate-800 leading-snug">{category.name}</h3>
          <p className="text-[11px] text-slate-400 leading-tight mt-0.5 line-clamp-1">{category.description}</p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${clr.badge}`}>
            {companies.length}
          </span>
          {!isEmpty && (
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isSelected ? "rotate-180" : ""}`} />
          )}
        </div>
      </div>

      {/* Listed / Private split */}
      {companies.length > 0 && (
        <div className="flex items-center gap-2 mb-3">
          {listedCount > 0 && (
            <span className="text-[10px] font-medium text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full flex items-center gap-1">
              <BarChart2 className="w-2.5 h-2.5" />{listedCount} listed
            </span>
          )}
          {privateCount > 0 && (
            <span className="text-[10px] font-medium text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Lock className="w-2.5 h-2.5" />{privateCount} private
            </span>
          )}
        </div>
      )}

      {/* Logo strip */}
      {topLogos.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {topLogos.map((c) => (
            <LogoWithFallback key={c.id || c.name} name={c.name} website={c.website} size={28} />
          ))}
          {companies.length > 8 && (
            <div className={`rounded-lg flex items-center justify-center flex-shrink-0 border ${clr.iconBg}`} style={{ width: 28, height: 28 }}>
              <span className="text-[9px] text-slate-500 font-medium">+{companies.length - 8}</span>
            </div>
          )}
        </div>
      )}
    </button>
  );
}

// ─── Company row ──────────────────────────────────────────────────────────────

function CompanyRow({ company, onClick }) {
  const iso = COUNTRY_ISO[(company.country || "").trim()];
  const cap = formatCap(company.market_cap);
  const rev = formatCap(company.revenue);
  const listed = isListed(company);
  const url = company.website
    ? (company.website.startsWith("http") ? company.website : `https://${company.website}`)
    : null;
  const stage = company.funding_stage
    ? company.funding_stage.replace(/^Private\s*[—–-]\s*/i, "").trim()
    : null;

  return (
    <div
      className="relative flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer group"
      onClick={onClick}
    >
      <div className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r bg-blue-700 opacity-0 group-hover:opacity-100 transition-opacity" />
      <LogoWithFallback name={company.name} website={company.website} size={32} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-[13px] text-slate-800 group-hover:text-slate-900 transition-colors truncate">
            {company.name}
          </span>
          <TypeBadge listed={listed} />
          {listed && company.ticker && (
            <span className="font-mono text-[10px] text-slate-400 bg-slate-100 border border-slate-200 px-1.5 py-px rounded">
              {company.ticker}
            </span>
          )}
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-slate-300 hover:text-slate-600 flex-shrink-0 transition-colors opacity-0 group-hover:opacity-100"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
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
            {company.founded_year && <span className="text-slate-300"> · est. {company.founded_year}</span>}
          </span>
          {!listed && stage && /series|seed|venture|growth|bootstrap|late/i.test(stage) && (
            <span className="text-[10px] text-slate-400 bg-slate-50 border border-slate-100 px-1.5 py-px rounded-full hidden sm:inline">
              {stage}
            </span>
          )}
        </div>
      </div>
      <div className="w-28 text-right flex-shrink-0 hidden sm:block">
        {cap ? (
          <div>
            <span className="text-xs font-mono font-semibold text-slate-700">{cap}</span>
            <p className="text-[9px] text-slate-400 leading-tight">mkt cap</p>
          </div>
        ) : rev ? (
          <div>
            <span className="text-xs font-mono font-semibold text-slate-600">{rev}</span>
            <p className="text-[9px] text-slate-400 leading-tight">revenue</p>
          </div>
        ) : (
          <span className="text-xs text-slate-200">—</span>
        )}
      </div>
      <ChevronRight className="w-3.5 h-3.5 text-slate-200 group-hover:text-blue-400 transition-colors flex-shrink-0" />
    </div>
  );
}

// ─── Expanded category panel ──────────────────────────────────────────────────

function ExpandedList({ category, companies, onCompanyClick }) {
  const clr = CAT_COLORS[category.color];
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
      <div className={`flex items-center gap-2.5 px-4 py-3 border-b border-slate-100 ${clr.headerBg}`}>
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center border p-1.5 flex-shrink-0 ${clr.iconBg}`}>
          <CategoryIcon id={category.id} className={`w-full h-full ${clr.icon}`} />
        </div>
        <span className={`text-sm font-semibold ${clr.text}`}>{category.name}</span>
        <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ml-auto ${clr.badge}`}>
          {companies.length}
        </span>
      </div>
      <div className="flex items-center gap-3 px-4 py-1.5 border-b border-slate-100 bg-slate-50/50">
        <div className="w-9 flex-shrink-0" />
        <div className="flex-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Company</div>
        <div className="w-28 text-[10px] font-semibold text-slate-400 uppercase tracking-wider text-right hidden sm:block">Valuation</div>
        <div className="w-3.5 flex-shrink-0" />
      </div>
      <div className="divide-y divide-slate-50">
        {companies.map((c) => (
          <CompanyRow key={c.id || c.name} company={c} onClick={() => onCompanyClick(c.name)} />
        ))}
      </div>
    </div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

const PAGE_SIZE = 25;

function Pagination({ page, totalPages, total, onChange }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between mt-4 px-1">
      <p className="text-xs text-slate-400">
        {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} of {total} companies
      </p>
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

// ─── Main page ────────────────────────────────────────────────────────────────

const FILTER_OPTIONS = [
  { value: "all",     label: "All companies" },
  { value: "listed",  label: "Listed only" },
  { value: "private", label: "Private only" },
];

export default function DefensePlayers() {
  const [companies, setCompanies]         = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);
  const [search, setSearch]               = useState("");
  const [filterCountry, setFilterCountry] = useState("all");
  const [filterType, setFilterType]       = useState("all");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [page, setPage]                   = useState(1);
  const [profileName, setProfileName]     = useState(null);

  useEffect(() => {
    axios.get(`${API}/defense-players`)
      .then(({ data }) => setCompanies(data))
      .catch(() => setError("Failed to load company data."))
      .finally(() => setLoading(false));
  }, []);

  // Apply type filter first, then country filter
  const typeFiltered = useMemo(() => {
    if (filterType === "listed")  return companies.filter(isListed);
    if (filterType === "private") return companies.filter((c) => !isListed(c));
    return companies;
  }, [companies, filterType]);

  const countryCounts = useMemo(() => {
    const map = {};
    typeFiltered.forEach((c) => { if (c.country) map[c.country] = (map[c.country] || 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [typeFiltered]);

  const maxCountryCount = useMemo(
    () => countryCounts.reduce((m, [, n]) => Math.max(m, n), 0),
    [countryCounts]
  );

  const players = useMemo(() => {
    if (filterCountry === "all") return typeFiltered;
    return typeFiltered.filter((c) => c.country === filterCountry);
  }, [typeFiltered, filterCountry]);

  const categorized = useMemo(() => {
    const map = {};
    MACRO_CATEGORIES.forEach((cat) => { map[cat.id] = []; });
    players.forEach((c) => { map[assignCategory(c)].push(c); });
    return map;
  }, [players]);

  const isSearchActive = search.trim().length > 0;

  const searchResults = useMemo(() => {
    if (!isSearchActive) return [];
    const q = search.toLowerCase();
    return players.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.description || "").toLowerCase().includes(q) ||
        (c.specializations || []).some((s) => s.toLowerCase().includes(q)) ||
        (c.headquarters || "").toLowerCase().includes(q) ||
        (c.country || "").toLowerCase().includes(q) ||
        (c.ticker || "").toLowerCase().includes(q)
    );
  }, [players, search, isSearchActive]);

  const totalSearchPages = Math.ceil(searchResults.length / PAGE_SIZE);
  const paginatedSearch  = searchResults.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => { setPage(1); }, [search, filterCountry, filterType]);

  // KPI totals (always over all companies, not filtered)
  const allListed  = useMemo(() => companies.filter(isListed).length, [companies]);
  const allPrivate = useMemo(() => companies.filter((c) => !isListed(c)).length, [companies]);
  const allCountries = useMemo(() => new Set(companies.map((c) => c.country).filter(Boolean)).size, [companies]);
  const totalEmployees = useMemo(() => companies.reduce((s, c) => s + (c.employees || 0), 0), [companies]);

  const activeCategoryData = selectedCategory
    ? MACRO_CATEGORIES.find((c) => c.id === selectedCategory)
    : null;

  return (
    <div className="space-y-6 animate-fade-in">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">Defense Players</h1>
          <p className="text-slate-500 text-sm mt-1">
            Complete intelligence directory — {companies.length} companies · listed &amp; private
          </p>
        </div>
      </div>

      {/* ── KPI Row ── */}
      {!loading && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 text-blue-800" />
              </div>
              <div>
                <p className="text-2xl font-mono font-bold text-slate-900">{companies.length}</p>
                <p className="text-xs text-slate-500">Total companies</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                <BarChart2 className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <p className="text-2xl font-mono font-bold text-slate-900">{allListed}</p>
                <p className="text-xs text-slate-500">Publicly listed</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0">
                <Lock className="w-5 h-5 text-slate-500" />
              </div>
              <div>
                <p className="text-2xl font-mono font-bold text-slate-900">{allPrivate}</p>
                <p className="text-xs text-slate-500">Private companies</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-slate-500" />
              </div>
              <div>
                <p className="text-2xl font-mono font-bold text-slate-900">{allCountries}</p>
                <p className="text-xs text-slate-500">Countries tracked</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── Search + Type filter ── */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Company, ticker, specialization…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-sm border-slate-200"
          />
        </div>

        {/* Type filter pills */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilterType(opt.value)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                filterType === opt.value
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {(search || filterCountry !== "all" || filterType !== "all") && (
          <button
            onClick={() => { setSearch(""); setFilterCountry("all"); setFilterType("all"); setSelectedCategory(null); }}
            className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1.5 px-3 h-9 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      {/* ── Body ── */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-slate-200 border-t-blue-800 animate-spin" />
          <p className="text-sm text-slate-500">Loading companies…</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-24 gap-2">
          <Building2 className="w-10 h-10 text-rose-400" />
          <p className="text-sm text-rose-600">{error}</p>
        </div>
      ) : (
        <div className="flex gap-6 items-start">

          {/* ── Country sidebar (desktop) ── */}
          <div className="hidden md:block w-44 flex-shrink-0 sticky top-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">Countries</p>
            <div className="flex flex-col gap-0.5">
              <button
                onClick={() => setFilterCountry("all")}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  filterCountry === "all"
                    ? "bg-blue-50 text-blue-900 font-semibold border border-blue-200"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <span>All countries</span>
                <span className={`text-[11px] font-mono px-1.5 py-0.5 rounded-full ${
                  filterCountry === "all" ? "bg-blue-100 text-blue-800" : "bg-slate-100 text-slate-400"
                }`}>
                  {players.length}
                </span>
              </button>
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
                        ? "bg-blue-50 text-blue-900 font-semibold border border-blue-200"
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
                      <span className="text-[13px] leading-tight truncate">{country}</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <div className="w-10 h-1 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${active ? "bg-blue-400" : "bg-slate-300"}`}
                          style={{ width: `${barPct}%` }}
                        />
                      </div>
                      <span className={`text-[11px] font-mono px-1.5 py-0.5 rounded-full ${
                        active ? "bg-blue-100 text-blue-800" : "bg-slate-100 text-slate-400"
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

            {/* Mobile country chips */}
            <div className="flex md:hidden gap-2 overflow-x-auto pb-2 mb-4 -mx-1 px-1">
              <button
                onClick={() => setFilterCountry("all")}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  filterCountry === "all" ? "bg-blue-800 text-white border-blue-800" : "bg-white text-slate-600 border-slate-200"
                }`}
              >
                All ({players.length})
              </button>
              {countryCounts.map(([country, count]) => {
                const iso = COUNTRY_ISO[country];
                const active = filterCountry === country;
                return (
                  <button
                    key={country}
                    onClick={() => setFilterCountry(country)}
                    className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      active ? "bg-blue-800 text-white border-blue-800" : "bg-white text-slate-600 border-slate-200"
                    }`}
                  >
                    {iso && (
                      <img
                        src={`https://flagcdn.com/w20/${iso}.png`}
                        alt={country}
                        className="w-3.5 h-auto rounded-sm"
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                    )}
                    {country} ({count})
                  </button>
                );
              })}
            </div>

            {/* Results count */}
            <p className="text-xs text-slate-400 mb-3 px-0.5">
              {isSearchActive
                ? `${searchResults.length} result${searchResults.length !== 1 ? "s" : ""} for "${search}"`
                : `${players.length} ${filterType !== "all" ? filterType : ""} companies${filterCountry !== "all" ? ` · ${filterCountry}` : ""}`}
            </p>

            {isSearchActive ? (
              searchResults.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-2">
                  <Lock className="w-10 h-10 text-slate-200" />
                  <p className="text-slate-400 text-sm">No companies match your search.</p>
                  <button
                    onClick={() => { setSearch(""); setFilterCountry("all"); setFilterType("all"); setSelectedCategory(null); }}
                    className="mt-1 text-xs text-blue-700 hover:text-blue-900 font-medium underline underline-offset-2"
                  >
                    Clear search
                  </button>
                </div>
              ) : (
                <>
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
                    <div className="flex items-center gap-3 px-4 py-1.5 border-b border-slate-100 bg-slate-50/50">
                      <div className="w-9 flex-shrink-0" />
                      <div className="flex-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Company</div>
                      <div className="w-28 text-[10px] font-semibold text-slate-400 uppercase tracking-wider text-right hidden sm:block">Valuation</div>
                      <div className="w-3.5 flex-shrink-0" />
                    </div>
                    <div className="divide-y divide-slate-50">
                      {paginatedSearch.map((c) => (
                        <CompanyRow key={c.id || c.name} company={c} onClick={() => setProfileName(c.name)} />
                      ))}
                    </div>
                  </div>
                  <Pagination page={page} totalPages={totalSearchPages} total={searchResults.length} onChange={setPage} />
                </>
              )
            ) : (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {MACRO_CATEGORIES.map((cat) => (
                    <CategoryTile
                      key={cat.id}
                      category={cat}
                      companies={categorized[cat.id] || []}
                      isSelected={selectedCategory === cat.id}
                      onSelect={() => setSelectedCategory((prev) => prev === cat.id ? null : cat.id)}
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
