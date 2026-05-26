import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { API } from "@/App";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  ExternalLink,
  Rss,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Bookmark,
  BookmarkCheck,
  Globe,
  MapPin,
  Download,
  ChevronLeft,
  ChevronRight,
  BarChart2,
  Tag,
  Clock,
  Building2,
  Zap,
  Newspaper,
} from "lucide-react";
import { format, differenceInHours } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/App";

// ── Constants ──────────────────────────────────────────────────────────────────

const NEWS_CATEGORIES = [
  { value: "all",         label: "All" },
  { value: "CONTRACT",    label: "Contracts" },
  { value: "TECHNOLOGY",  label: "Technology" },
  { value: "CONFLICT",    label: "Conflict" },
  { value: "POLICY",      label: "Policy" },
  { value: "GEOPOLITICS", label: "Geopolitics" },
  { value: "M&A",         label: "M&A" },
  { value: "EARNINGS",    label: "Earnings" },
  { value: "INDUSTRY",    label: "Industry" },
];

const REGION_OPTIONS = [
  { value: "all",          label: "All Regions",  flag: "🌍" },
  { value: "us",           label: "US & Canada",  flag: "🇺🇸" },
  { value: "europe",       label: "Europe",       flag: "🇪🇺" },
  { value: "asia-pacific", label: "Asia-Pacific", flag: "🌏" },
  { value: "middle-east",  label: "Middle East",  flag: "🌍" },
  { value: "africa",       label: "Africa",       flag: "🌍" },
  { value: "global",       label: "Global",       flag: "🌐" },
];

const LANG_OPTIONS = [
  { value: "en",  label: "EN", flag: "🇬🇧" },
  { value: "all", label: "All", flag: "🌐" },
  { value: "fr",  label: "FR", flag: "🇫🇷" },
];

const ARTICLES_PER_PAGE = 20;

const HOT_KEYWORDS = [
  "F-35", "F-22", "drone", "NATO", "Ukraine", "Russia", "China",
  "AI", "hypersonic", "cyber", "missile", "nuclear", "AUKUS",
  "Taiwan", "satellite", "submarine", "HIMARS", "Patriot", "Javelin",
  "B-21", "Rafale", "Eurofighter",
];

// ── Defense tickers ────────────────────────────────────────────────────────────

const DEFENSE_TICKERS = [
  { ticker: "LMT",    name: "Lockheed Martin",   country: "us", keywords: ["lockheed", "f-35", "f-22", "sikorsky"] },
  { ticker: "RTX",    name: "Raytheon",           country: "us", keywords: ["raytheon", "patriot", "javelin", "collins"] },
  { ticker: "NOC",    name: "Northrop Grumman",   country: "us", keywords: ["northrop", "grumman", "b-21", "global hawk"] },
  { ticker: "GD",     name: "General Dynamics",   country: "us", keywords: ["general dynamics", "gulfstream", "abrams", "stryker"] },
  { ticker: "BA",     name: "Boeing Defense",     country: "us", keywords: ["boeing", "f/a-18", "f-15", "apache", "chinook"] },
  { ticker: "LHX",    name: "L3Harris",           country: "us", keywords: ["l3harris", "harris", "l3 technologies"] },
  { ticker: "HII",    name: "Huntington Ingalls", country: "us", keywords: ["huntington ingalls", "hii", "newport news"] },
  { ticker: "LDOS",   name: "Leidos",             country: "us", keywords: ["leidos"] },
  { ticker: "BAH",    name: "Booz Allen",         country: "us", keywords: ["booz allen"] },
  { ticker: "RHM.DE", name: "Rheinmetall",        country: "de", keywords: ["rheinmetall", "lynx ifv", "panther"] },
  { ticker: "AIR.PA", name: "Airbus",             country: "fr", keywords: ["airbus", "eurofighter", "a400m", "nh90"] },
  { ticker: "HO.PA",  name: "Thales",             country: "fr", keywords: ["thales"] },
  { ticker: "AM.PA",  name: "Dassault",           country: "fr", keywords: ["dassault", "rafale", "falcon"] },
  { ticker: "SAF.PA", name: "Safran",             country: "fr", keywords: ["safran"] },
  { ticker: "LDO.MI", name: "Leonardo",           country: "it", keywords: ["leonardo", "finmeccanica", "aw101", "aw139"] },
  { ticker: "BA.L",   name: "BAE Systems",        country: "gb", keywords: ["bae systems", "bae", "challenger", "typhoon"] },
  { ticker: "RR.L",   name: "Rolls-Royce",        country: "gb", keywords: ["rolls-royce", "rolls royce"] },
  { ticker: "IDR.MC", name: "Indra",              country: "es", keywords: ["indra sistemas", "indra"] },
  { ticker: "HAG.DE", name: "Hensoldt",           country: "de", keywords: ["hensoldt"] },
];

const CATEGORY_STOCK_PHOTOS = {
  TECHNOLOGY: [
    "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1759610545704-9bbee32cb17c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1712747153465-2637c38cc28e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1612529784443-40a86b856d14?auto=format&fit=crop&w=800&q=80",
  ],
  CONTRACT: [
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  ],
  CONFLICT: [
    "https://images.unsplash.com/photo-1668724982255-1a3e0c72b814?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1578241030078-01b38ededda4?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1708342421457-9c59f4843fe1?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1759610545704-9bbee32cb17c?auto=format&fit=crop&w=800&q=80",
  ],
  POLICY: [
    "https://images.unsplash.com/photo-1742252306330-453455bd7526?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1755975856018-93951b519ed7?auto=format&fit=crop&w=800&q=80",
  ],
  GEOPOLITICS: [
    "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1650526087824-163941841b52?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1531266752426-aad472b7bbf4?auto=format&fit=crop&w=800&q=80",
  ],
  "M&A": [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=800&q=80",
  ],
  INDUSTRY: [
    "https://images.unsplash.com/photo-1720036236855-9a1a2e4d3f26?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1720036236697-018370867320?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1708342421457-9c59f4843fe1?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1759610545704-9bbee32cb17c?auto=format&fit=crop&w=800&q=80",
  ],
};

// ── Helpers ────────────────────────────────────────────────────────────────────

function getCategoryStyle(category) {
  switch (category) {
    case "CONTRACT":    return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "POLICY":      return "bg-amber-50   text-amber-700   border-amber-200";
    case "M&A":         return "bg-blue-50    text-blue-700    border-blue-200";
    case "TECHNOLOGY":  return "bg-slate-100  text-slate-700   border-slate-200";
    case "CONFLICT":    return "bg-red-50     text-red-700     border-red-200";
    case "GEOPOLITICS": return "bg-sky-50     text-sky-700     border-sky-200";
    case "EARNINGS":    return "bg-teal-50    text-teal-700    border-teal-200";
    default:            return "bg-slate-100  text-slate-600   border-slate-200";
  }
}

function relativeTime(dateStr) {
  try {
    const d = new Date(dateStr);
    const h = differenceInHours(new Date(), d);
    if (h < 1)  return "Just now";
    if (h < 24) return `${h}h ago`;
    if (h < 48) return "Yesterday";
    return format(d, "MMM d");
  } catch { return ""; }
}

const SPECIALTY_DEFENSE_SOURCES = new Set([
  "Breaking Defense", "Defense News", "The Defense Post", "Defense One",
  "Aviation Week", "Jane's", "Janes", "USNI News", "Stars and Stripes",
  "Air Force Magazine", "Army Times", "Navy Times", "Marine Corps Times",
  "Air Force Times", "Defense Daily", "C4ISRNET", "National Defense",
  "War on the Rocks", "The War Zone", "Bellingcat",
  "Defense Scoop", "Army Recognition", "Naval Post", "Naval News",
  "IISS", "SIPRI", "NTI", "Atlantic Council", "ASD News",
  "Defense Review", "Defense Aerospace Report", "ASPI Strategist",
  "Warrior Maven", "DoD News", "Federal News Network",
  "Modern War Institute", "The Cipher Brief", "ISW",
  "Opex360", "Meta-Défense", "Air & Cosmos", "TTU", "Mer et Marine",
  "La Tribune Défense", "Forces Operations", "Zone Militaire",
]);

const FR_SOURCES = new Set([
  "Opex360", "Meta-Défense", "Le Monde", "Le Figaro", "Les Echos",
  "Usine Nouvelle", "Challenges", "La Tribune", "La Tribune Défense",
  "Air & Cosmos", "L'Agefi", "Capital", "BFM Business", "Le Point",
  "TTU", "Mer et Marine",
]);

function isBreakingIntel(article) {
  return !!article.breakingIntel;
}

function isAlgoBreakingIntel(article) {
  if (article.adminApproved) return true;
  const score   = article.relevanceScore ?? 0;
  const sources = article.source_count   ?? 1;
  const cat     = article.category       ?? "";
  const ageH    = differenceInHours(new Date(), new Date(article.publishedAt));
  if (ageH > 24) return false;
  if (sources >= 2 && score >= 65) return true;
  if (score >= 85 && ["CONTRACT", "M&A", "POLICY", "TECHNOLOGY", "CONFLICT", "GEOPOLITICS"].includes(cat)) return true;
  if (score >= 92) return true;
  return false;
}

function getArticleImage(article) {
  if (article.image) return article.image;
  const pool = CATEGORY_STOCK_PHOTOS[article.category] || CATEGORY_STOCK_PHOTOS.TECHNOLOGY;
  const idx  = Math.abs((article.title?.charCodeAt(0) || 65) + (article.title?.length || 0)) % pool.length;
  return pool[idx];
}

function articleMentionsCompany(article, ticker) {
  const def = DEFENSE_TICKERS.find((d) => d.ticker === ticker);
  if (!def) return false;
  const text = (
    (article.title   || "") + " " +
    (article.summary || "") + " " +
    (article.company || "")
  ).toLowerCase();
  return def.keywords.some((kw) => text.includes(kw));
}

function detectArticleCompany(article, stockData) {
  const text = (
    (article.title   || "") + " " +
    (article.summary || "") + " " +
    (article.company || "")
  ).toLowerCase();
  for (const def of DEFENSE_TICKERS) {
    if (def.keywords.some((kw) => text.includes(kw))) {
      const stock = stockData[def.ticker];
      return { ticker: def.ticker, name: def.name, change: stock?.change_percent ?? null };
    }
  }
  return null;
}

function detectCompaniesHeat(articles, hours = 24) {
  const counts        = {};
  const latestArticle = {};
  const cutoff        = new Date(Date.now() - hours * 3_600_000);

  articles.forEach((article) => {
    if (new Date(article.publishedAt) < cutoff) return;
    const text = (
      (article.title   || "") + " " +
      (article.summary || "") + " " +
      (article.company || "")
    ).toLowerCase();
    DEFENSE_TICKERS.forEach(({ keywords, ticker }) => {
      if (keywords.some((kw) => text.includes(kw))) {
        counts[ticker] = (counts[ticker] || 0) + 1;
        const prev = latestArticle[ticker];
        if (!prev || new Date(article.publishedAt) > new Date(prev.publishedAt)) {
          latestArticle[ticker] = article;
        }
      }
    });
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([ticker, count]) => ({
      ...DEFENSE_TICKERS.find((d) => d.ticker === ticker),
      count,
      latestArticle: latestArticle[ticker],
    }));
}

function getTopSources(articles, limit = 6) {
  const counts = {};
  articles.forEach((a) => {
    const src = a.realSource || a.source;
    if (src) counts[src] = (counts[src] || 0) + 1;
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([source, count]) => ({ source, count }));
}

function getHotTopics(articles, limit = 10) {
  const counts = {};
  articles.forEach((a) => {
    const text = ((a.title || "") + " " + (a.summary || "")).toLowerCase();
    HOT_KEYWORDS.forEach((kw) => {
      if (text.includes(kw.toLowerCase())) {
        counts[kw] = (counts[kw] || 0) + 1;
      }
    });
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([keyword, count]) => ({ keyword, count }));
}

function timeBand(article) {
  const h = differenceInHours(new Date(), new Date(article.publishedAt));
  if (h < 24)  return "today";
  if (h < 48)  return "yesterday";
  if (h < 168) return "this_week";
  return "earlier";
}

const CAT_LEFT_BORDER = {
  CONTRACT:    "border-l-emerald-400",
  TECHNOLOGY:  "border-l-blue-400",
  CONFLICT:    "border-l-red-400",
  POLICY:      "border-l-amber-400",
  GEOPOLITICS: "border-l-sky-400",
  "M&A":       "border-l-blue-400",
  INDUSTRY:    "border-l-slate-300",
  EARNINGS:    "border-l-teal-400",
};

const TIME_BAND_DISPLAY = [
  { key: "today",     label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "this_week", label: "This Week" },
  { key: "earlier",   label: "Earlier" },
];

// ── SourceFavicon ──────────────────────────────────────────────────────────────

function SourceFavicon({ url, source, sourceLogo }) {
  const [err, setErr] = useState(false);

  const isGoogleLogo = sourceLogo?.includes("news.google.com");
  let logoUrl = (!isGoogleLogo && sourceLogo) || null;
  if (!logoUrl) {
    let domain = "";
    try { domain = new URL(url).hostname; } catch { /* empty */ }
    if (domain && !domain.includes("google.com")) {
      logoUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    }
  }

  const initial     = source ? source.charAt(0).toUpperCase() : "?";
  const isSpecialty = SPECIALTY_DEFENSE_SOURCES.has(source);

  return (
    <span className="flex items-center gap-1.5 min-w-0">
      <span className={`w-4 h-4 rounded flex-shrink-0 overflow-hidden flex items-center justify-center ${isSpecialty ? "bg-blue-50" : "bg-slate-100"}`}>
        {logoUrl && !err ? (
          <img src={logoUrl} alt="" width={16} height={16} className="w-full h-full object-contain" onError={() => setErr(true)} />
        ) : (
          <span className="text-[8px] font-bold text-slate-500 leading-none">{initial}</span>
        )}
      </span>
      <span className={`text-[11px] font-medium truncate max-w-[120px] ${isSpecialty ? "text-blue-700" : "text-slate-500"}`}>
        {source}
      </span>
    </span>
  );
}

// ── ArticleCard — single unified card format ───────────────────────────────────

function ArticleCard({ article, isBookmarked, onBookmark, isBreaking = false, stockData = {} }) {
  const [imgError,   setImgError]   = useState(false);
  const [localImage, setLocalImage] = useState(null);

  useEffect(() => {
    if (!article.image && !localImage && article.url) {
      axios
        .get(`${API}/news/og-image`, { params: { url: article.url } })
        .then((r) => { if (r.data.image) setLocalImage(r.data.image); })
        .catch(() => {});
    }
  }, [article.url, article.image, localImage]);

  const displayImage = article.image || localImage;
  const hasImage     = !imgError && !!displayImage;
  const isNew        = differenceInHours(new Date(), new Date(article.publishedAt)) < 4;
  const srcCount     = article.source_count ?? 1;
  const coveredBy    = article.covered_by   ?? [];
  const countryCode  = article.country_code?.toLowerCase();
  const companyHit   = detectArticleCompany(article, stockData);

  const accentClass = isBreaking
    ? "border-l-orange-400"
    : (CAT_LEFT_BORDER[article.category] || "border-l-slate-300");

  const borderClass = isBreaking
    ? "border-orange-100 hover:border-orange-200"
    : "border-slate-200 hover:border-slate-300";

  return (
    <div className={`bg-white rounded-xl overflow-hidden transition-all duration-200 group border-l-2 ${accentClass} border ${borderClass} shadow-sm hover:shadow-md`}>
      <div className="flex min-h-[88px]">

        {/* Text block */}
        <div className="flex-1 min-w-0 p-4 flex flex-col gap-2">

          {/* Meta row */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <SourceFavicon
              url={article.url}
              source={article.realSource || article.source}
              sourceLogo={article.sourceLogo}
            />
            <span className="text-[11px] text-slate-300">·</span>
            <span className="text-[11px] text-slate-400 font-medium">{relativeTime(article.publishedAt)}</span>
            {countryCode && (
              <img
                src={`https://flagcdn.com/w20/${countryCode}.png`}
                alt={countryCode.toUpperCase()}
                className="w-5 h-3.5 object-cover rounded-sm opacity-75 flex-shrink-0"
              />
            )}
            {isNew && (
              <span className="bg-slate-800 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full tracking-wider">
                NEW
              </span>
            )}
            {srcCount >= 2 && (
              <span
                className="bg-orange-100 text-orange-700 text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wide"
                title={`Covered by: ${coveredBy.join(", ")}`}
              >
                {srcCount} sources
              </span>
            )}
            {companyHit && companyHit.change != null && (
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full font-mono flex-shrink-0 ${
                companyHit.change > 0
                  ? "bg-emerald-50 text-emerald-700"
                  : companyHit.change < 0
                  ? "bg-rose-50 text-rose-700"
                  : "bg-slate-100 text-slate-500"
              }`}>
                {companyHit.ticker} {companyHit.change > 0 ? "+" : ""}{companyHit.change.toFixed(2)}%
              </span>
            )}
          </div>

          {/* Title */}
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex-1">
            <h3 className="font-bold text-[14px] leading-snug line-clamp-2 text-slate-800 group-hover:text-blue-800 transition-colors">
              {article.title}
            </h3>
          </a>

          {/* Summary */}
          {article.summary && (
            <p className="text-[12px] text-slate-400 leading-snug line-clamp-2">
              {article.summary}
            </p>
          )}

          {/* Action row */}
          <div className="flex items-center gap-2 mt-auto pt-1">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider flex-shrink-0 ${getCategoryStyle(article.category)}`}>
              {article.category === "GEOPOLITICS" ? "GEO" : article.category === "EARNINGS" ? "EARN" : (article.category || "INDUSTRY")}
            </span>
            <div className="ml-auto flex items-center gap-1">
              <button
                onClick={(e) => { e.stopPropagation(); onBookmark(article); }}
                className={`p-1.5 rounded-lg transition-colors ${
                  isBookmarked
                    ? "text-amber-500 bg-amber-50"
                    : "text-slate-300 hover:text-amber-500 hover:bg-amber-50"
                }`}
              >
                {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
              </button>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-semibold hover:bg-blue-800 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Read <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Thumbnail */}
        {hasImage && (
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-[100px] self-stretch relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={displayImage}
              alt={article.title}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </a>
        )}
      </div>
    </div>
  );
}

// ── CategoryPills ──────────────────────────────────────────────────────────────

function CategoryPills({ selected, onSelect, counts }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {NEWS_CATEGORIES.map((cat) => {
        const count = counts?.[cat.value];
        return (
          <button
            key={cat.value}
            onClick={() => onSelect(cat.value)}
            className={`px-3 py-1.5 text-[12px] font-semibold rounded-full transition-all border whitespace-nowrap ${
              selected === cat.value
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            {cat.label}
            {count !== undefined && count > 0 && (
              <span className={`ml-1.5 text-[10px] font-bold ${
                selected === cat.value ? "text-white/60" : "text-slate-400"
              }`}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ── SectionHeader ──────────────────────────────────────────────────────────────

function SectionHeader({ label, sublabel, isBreaking = false }) {
  return (
    <div className="flex items-center gap-3 py-1 mb-4">
      {isBreaking
        ? <Zap className="w-3.5 h-3.5 flex-shrink-0 text-orange-500" />
        : <Clock className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
      }
      <h2 className={`text-xs font-semibold uppercase tracking-widest flex-shrink-0 ${
        isBreaking ? "text-orange-700" : "text-slate-500"
      }`}>
        {label}
      </h2>
      {sublabel && (
        <span className="text-xs text-slate-400 font-normal normal-case tracking-normal flex-shrink-0">
          {sublabel}
        </span>
      )}
      <div className={`flex-1 h-px ${isBreaking ? "bg-orange-100" : "bg-slate-200"}`} />
    </div>
  );
}

// ── EnhancedSidebar ────────────────────────────────────────────────────────────

function EnhancedSidebar({ articles, selectedCompany, onSelectCompany, stockData }) {
  const [heatWindow, setHeatWindow] = useState(24);

  const companies  = useMemo(() => detectCompaniesHeat(articles, heatWindow), [articles, heatWindow]);
  const topSources = useMemo(() => getTopSources(articles), [articles]);
  const hotTopics  = useMemo(() => getHotTopics(articles), [articles]);

  const maxSourceCount = topSources[0]?.count || 1;

  return (
    <div className="w-72 flex-shrink-0">
      <div className="flex flex-col gap-4 sticky top-4">

        {/* Market Pulse */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">Market Pulse</span>
            </div>
            <div className="flex rounded-lg border border-slate-200 overflow-hidden bg-white">
              {[24, 48].map((h) => (
                <button
                  key={h}
                  onClick={() => setHeatWindow(h)}
                  className={`px-2.5 py-1 text-[10px] font-bold transition-colors ${
                    heatWindow === h ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {h}H
                </button>
              ))}
            </div>
          </div>

          {companies.length === 0 ? (
            <div className="px-4 py-6 text-center text-[12px] text-slate-400">
              No company activity in the past {heatWindow}h
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {companies.map(({ ticker, name, country, count, latestArticle }) => {
                const stock    = stockData[ticker];
                const change   = stock?.change_percent ?? null;
                const price    = stock?.price          ?? null;
                const isPos    = change > 0;
                const isNeg    = change < 0;
                const isActive = selectedCompany === ticker;

                return (
                  <button
                    key={ticker}
                    onClick={() => onSelectCompany(isActive ? null : ticker)}
                    className={`w-full text-left px-4 py-3 transition-colors hover:bg-slate-50 ${
                      isActive ? "bg-blue-50 border-l-2 border-l-blue-600" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        {country && (
                          <img
                            src={`https://flagcdn.com/w20/${country}.png`}
                            alt=""
                            className="w-4 h-3 object-cover rounded-sm opacity-80 flex-shrink-0"
                          />
                        )}
                        <div className="min-w-0">
                          <div className="text-[12px] font-bold text-slate-800 truncate">{name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{ticker}</div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        {price != null && (
                          <div className="text-[11px] text-slate-600 font-mono">{price.toFixed(2)}</div>
                        )}
                        {change != null ? (
                          <div className={`text-[11px] font-bold flex items-center gap-0.5 justify-end ${
                            isPos ? "text-emerald-600" : isNeg ? "text-rose-600" : "text-slate-400"
                          }`}>
                            {isPos ? <TrendingUp className="w-3 h-3" /> : isNeg ? <TrendingDown className="w-3 h-3" /> : null}
                            {isPos ? "+" : ""}{change.toFixed(2)}%
                          </div>
                        ) : (
                          <div className="text-[11px] text-slate-300">—</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mb-1.5">
                      <Tag className="w-3 h-3 text-slate-300" />
                      <span className="text-[10px] text-slate-400">
                        {count} article{count > 1 ? "s" : ""} · {heatWindow}h
                      </span>
                    </div>
                    {latestArticle && (
                      <p className="text-[11px] text-slate-500 leading-snug line-clamp-2 border-l-2 border-slate-200 pl-2">
                        {latestArticle.title}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {selectedCompany && (
            <div className="px-4 py-2.5 border-t border-slate-100 bg-blue-50">
              <button
                onClick={() => onSelectCompany(null)}
                className="w-full text-[11px] text-blue-700 hover:text-blue-900 font-medium text-center"
              >
                × Clear company filter
              </button>
            </div>
          )}
        </div>

        {/* Top Sources */}
        {topSources.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100">
              <Newspaper className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">Top Sources</span>
            </div>
            <div className="px-4 py-3 flex flex-col gap-2.5">
              {topSources.map(({ source, count }) => (
                <div key={source} className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-600 flex-1 truncate min-w-0">{source}</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-400 rounded-full transition-all"
                        style={{ width: `${(count / maxSourceCount) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono w-5 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hot Topics */}
        {hotTopics.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">Hot Topics</span>
            </div>
            <div className="px-4 py-3 flex flex-wrap gap-2">
              {hotTopics.map(({ keyword, count }) => (
                <span
                  key={keyword}
                  className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-50 text-slate-600 border border-slate-200"
                >
                  {keyword}
                  <span className="text-[10px] text-slate-400 font-mono">{count}</span>
                </span>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// ── Pagination ─────────────────────────────────────────────────────────────────

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const delta = 2;
  const left  = Math.max(1, currentPage - delta);
  const right = Math.min(totalPages, currentPage + delta);
  const pages = [];

  if (left > 1)           { pages.push(1);            if (left > 2)           pages.push("dots-l"); }
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < totalPages) { if (right < totalPages - 1) pages.push("dots-r"); pages.push(totalPages); }

  return (
    <div className="flex items-center justify-center gap-1.5 pt-8 pb-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((p) =>
        typeof p === "string" ? (
          <span key={p} className="px-1 text-slate-400 text-sm select-none">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
              p === currentPage
                ? "bg-slate-900 text-white"
                : "border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function Announcements() {
  const { token } = useAuth();
  const navigate  = useNavigate();

  const [articles,        setArticles]        = useState([]);
  const [loading,         setLoading]         = useState(true);
  const [scraping,        setScraping]        = useState(false);
  const [searchTerm,      setSearchTerm]      = useState("");
  const [selectedCat,     setSelectedCat]     = useState("all");
  const [selectedLang,    setSelectedLang]    = useState("en");
  const [selectedRegion,  setSelectedRegion]  = useState("all");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [currentPage,     setCurrentPage]     = useState(1);
  const [lastUpdated,     setLastUpdated]     = useState(null);
  const [bookmarkedUrls,  setBookmarkedUrls]  = useState(new Set());
  const [stockData,       setStockData]       = useState({});

  // ── Fetch ─────────────────────────────────────────────────────────────────

  const fetchNews = useCallback(async (lang = "all", region = "all") => {
    setLoading(true);
    try {
      const params = { limit: 300, hours: 168 };
      if (lang   !== "all") params.language = lang;
      if (region !== "all") params.region   = region;
      const resp = await axios.get(`${API}/news`, { params });
      setArticles(resp.data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchNews("en", "all"); }, [fetchNews]);

  useEffect(() => {
    const tickers = DEFENSE_TICKERS.map((d) => d.ticker).join(",");
    axios
      .get(`${API}/stocks/prices`, { params: { tickers } })
      .then((r) => setStockData(r.data))
      .catch(() => {});
  }, []);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleLangChange = (lang) => {
    setSelectedLang(lang);
    setCurrentPage(1);
    fetchNews(lang, selectedRegion);
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    setCurrentPage(1);
    fetchNews(selectedLang, region);
  };

  // ── Bookmarks ─────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!token) return;
    axios
      .get(`${API}/bookmarks`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => setBookmarkedUrls(new Set(r.data.map((b) => b.article?.url).filter(Boolean))))
      .catch(() => {});
  }, [token]);

  const toggleBookmark = async (article) => {
    if (!token) { navigate("/login"); return; }
    const url   = article.url;
    const saved = bookmarkedUrls.has(url);
    setBookmarkedUrls((prev) => {
      const next = new Set(prev);
      saved ? next.delete(url) : next.add(url);
      return next;
    });
    try {
      if (saved) {
        await axios.delete(`${API}/bookmarks`, {
          params: { url },
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${API}/bookmarks`, { article }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch {
      setBookmarkedUrls((prev) => {
        const next = new Set(prev);
        saved ? next.add(url) : next.delete(url);
        return next;
      });
    }
  };

  // ── Filter ────────────────────────────────────────────────────────────────

  const filtered = useMemo(() => articles.filter((a) => {
    const matchCat     = selectedCat === "all" || a.category === selectedCat;
    const term         = searchTerm.toLowerCase();
    const matchSearch  = !term
      || a.title.toLowerCase().includes(term)
      || (a.summary && a.summary.toLowerCase().includes(term))
      || a.source.toLowerCase().includes(term)
      || (a.company && a.company.toLowerCase().includes(term));
    const matchCompany = !selectedCompany || articleMentionsCompany(a, selectedCompany);
    return matchCat && matchSearch && matchCompany;
  }), [articles, selectedCat, searchTerm, selectedCompany]);

  const categoryCounts = useMemo(() => {
    const counts = { all: articles.length };
    NEWS_CATEGORIES.slice(1).forEach(({ value }) => {
      counts[value] = articles.filter((a) => a.category === value).length;
    });
    return counts;
  }, [articles]);

  useEffect(() => { setCurrentPage(1); }, [searchTerm, selectedCat, selectedCompany]);

  // ── Breaking Intel ────────────────────────────────────────────────────────

  const pinnedArticles   = filtered.filter(isBreakingIntel).slice(0, 3);
  const algoArticles     = pinnedArticles.length < 3
    ? filtered
        .filter((a) => !isBreakingIntel(a) && isAlgoBreakingIntel(a))
        .slice(0, 3 - pinnedArticles.length)
    : [];
  const breakingArticles = [...pinnedArticles, ...algoArticles];
  const breakingUrls     = new Set(breakingArticles.map((a) => a.url));
  const regularArticles  = filtered.filter((a) => !breakingUrls.has(a.url));

  // ── Pagination ────────────────────────────────────────────────────────────

  const totalPages   = Math.max(1, Math.ceil(regularArticles.length / ARTICLES_PER_PAGE));
  const pageArticles = regularArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  const groupedByBand = { today: [], yesterday: [], this_week: [], earlier: [] };
  pageArticles.forEach((a) => { groupedByBand[timeBand(a)].push(a); });

  const highCount = filtered.filter((a) => (a.relevanceScore ?? 0) >= 70).length;

  // ── Export ────────────────────────────────────────────────────────────────

  const exportCSV = () => {
    const headers = ["Title", "Source", "Category", "Date", "URL"];
    const rows = filtered.map((a) => [
      `"${(a.title || "").replace(/"/g, '""')}"`,
      `"${a.source || ""}"`,
      a.category || "",
      a.publishedAt ? new Date(a.publishedAt).toISOString().slice(0, 10) : "",
      a.url || "",
    ]);
    const csv  = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `news-export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePageChange = (p) => {
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div data-testid="announcements-page" className="space-y-5 animate-fade-in">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">Live News Feed</h1>
          <p className="text-slate-500 text-sm mt-1">Defense intelligence from specialty &amp; mainstream media</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {articles.length > 0 && (
            <div className="flex items-center gap-2 text-xs bg-white border border-slate-200 rounded-lg px-3 py-2">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              {highCount > 0 && (
                <span className="text-emerald-700 font-semibold">{highCount} high relevance</span>
              )}
              {highCount > 0 && <span className="text-slate-300">·</span>}
              <span className="text-slate-500">
                {filtered.length}{filtered.length < articles.length ? ` / ${articles.length}` : ""} articles
              </span>
              {uniqueSourceCount > 0 && (
                <>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-400">{uniqueSourceCount} sources</span>
                </>
              )}
            </div>
          )}
          {lastUpdated && (
            <span className="text-xs text-slate-400">
              {(() => {
                const mins = Math.floor((Date.now() - lastUpdated.getTime()) / 60000);
                if (mins < 1)  return "Updated just now";
                if (mins < 60) return `Updated ${mins}m ago`;
                const hrs = Math.floor(mins / 60);
                return `Updated ${hrs}h ago`;
              })()}
            </span>
          )}
          {filtered.length > 0 && (
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Download className="w-4 h-4" /> Export
            </button>
          )}
          {token ? (
            <button
              onClick={() => {
                setScraping(true);
                axios
                  .post(`${API}/admin/scrape-news`, {}, { headers: { Authorization: `Bearer ${token}` } })
                  .then(() => fetchNews(selectedLang, selectedRegion))
                  .catch(console.error)
                  .finally(() => setScraping(false));
              }}
              disabled={scraping}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${scraping ? "animate-spin" : ""}`} />
              {scraping ? "Scraping…" : "Refresh now"}
            </button>
          ) : (
            <button
              onClick={() => fetchNews(selectedLang, selectedRegion)}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh Feed
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <CategoryPills
        selected={selectedCat}
        onSelect={(v) => { setSelectedCat(v); setCurrentPage(1); }}
        counts={categoryCounts}
      />

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search by title, source, company or keyword…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
          />
        </div>

        <Select value={selectedRegion} onValueChange={handleRegionChange}>
          <SelectTrigger className="w-full sm:w-44 bg-white border-slate-200 text-slate-700">
            <MapPin className="w-4 h-4 mr-2 text-slate-400" />
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200">
            {REGION_OPTIONS.map((r) => (
              <SelectItem key={r.value} value={r.value} className="text-slate-700 focus:bg-slate-50">
                <span className="mr-1.5">{r.flag}</span>{r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Globe className="w-4 h-4 text-slate-400" />
          <div className="flex rounded-lg border border-slate-200 overflow-hidden bg-white">
            {LANG_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleLangChange(opt.value)}
                className={`px-3 py-2 text-xs font-semibold transition-colors ${
                  selectedLang === opt.value
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {opt.flag} {opt.label}
              </button>
            ))}
          </div>
        </div>

        {(selectedLang !== "en" || selectedRegion !== "all" || selectedCompany || selectedCat !== "all") && (
          <button
            onClick={() => {
              setSelectedLang("en");
              setSelectedRegion("all");
              setSelectedCompany(null);
              setSelectedCat("all");
              setCurrentPage(1);
              fetchNews("en", "all");
            }}
            className="text-xs text-slate-400 hover:text-slate-600 underline whitespace-nowrap flex-shrink-0"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Active company chip */}
      {selectedCompany && (
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg w-fit">
          <Building2 className="w-3.5 h-3.5 text-blue-700" />
          <span className="text-xs text-blue-800 font-semibold">
            {DEFENSE_TICKERS.find((d) => d.ticker === selectedCompany)?.name}
          </span>
          <button
            onClick={() => setSelectedCompany(null)}
            className="text-blue-400 hover:text-blue-800 ml-1 font-bold text-sm leading-none"
          >
            ×
          </button>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-2 border-slate-200 border-t-slate-800 rounded-full" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500 bg-white rounded-xl border border-slate-200">
          <Rss className="w-10 h-10 mb-3 text-slate-300" />
          <p className="font-medium">
            {articles.length === 0
              ? "No articles yet — trigger a scrape above"
              : "No articles match your filters"}
          </p>
          <p className="text-sm mt-1 text-slate-400">The scraper runs automatically four times daily.</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* Articles column */}
          <div className="flex-1 min-w-0 space-y-8">

            {/* Breaking Intel */}
            {breakingArticles.length > 0 && (
              <section>
                <SectionHeader
                  label="Breaking Intel"
                  sublabel={`— ${breakingArticles.length} key ${breakingArticles.length === 1 ? "story" : "stories"}`}
                  isBreaking
                />
                <div className="flex flex-col gap-3">
                  {breakingArticles.map((a, i) => (
                    <ArticleCard
                      key={a.url || `breaking-${i}`}
                      article={a}
                      isBookmarked={bookmarkedUrls.has(a.url)}
                      onBookmark={toggleBookmark}
                      isBreaking
                      stockData={stockData}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Main feed */}
            {regularArticles.length > 0 && (
              <section className="space-y-8">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    {filtered.length} articles · page {currentPage} of {totalPages}
                  </span>
                </div>

                {TIME_BAND_DISPLAY.map(({ key, label }) => {
                  const bandArticles = groupedByBand[key];
                  if (!bandArticles.length) return null;
                  return (
                    <div key={key}>
                      <SectionHeader label={label} sublabel={`— ${bandArticles.length}`} />
                      <div className="flex flex-col gap-3">
                        {bandArticles.map((a, i) => (
                          <ArticleCard
                            key={a.url || `${key}-${i}`}
                            article={a}
                            isBookmarked={bookmarkedUrls.has(a.url)}
                            onBookmark={toggleBookmark}
                            stockData={stockData}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </section>
            )}
          </div>

          {/* Enhanced Sidebar */}
          <div className="hidden lg:block">
            <EnhancedSidebar
              articles={filtered}
              selectedCompany={selectedCompany}
              onSelectCompany={(ticker) => {
                setSelectedCompany(ticker);
                setCurrentPage(1);
              }}
              stockData={stockData}
            />
          </div>
        </div>
      )}
    </div>
  );
}
