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
  Filter,
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
} from "lucide-react";
import { format, differenceInHours } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/App";

// ── Constants ──────────────────────────────────────────────────────────────────

const NEWS_CATEGORIES = [
  { value: "all",         label: "All Categories" },
  { value: "CONTRACT",    label: "Contracts" },
  { value: "TECHNOLOGY",  label: "Technology" },
  { value: "CONFLICT",    label: "Conflict" },
  { value: "POLICY",      label: "Policy" },
  { value: "GEOPOLITICS", label: "Geopolitics" },
  { value: "M&A",         label: "M&A" },
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
  { value: "en",  label: "EN" },
  { value: "all", label: "All" },
  { value: "fr",  label: "FR" },
];

const ARTICLES_PER_PAGE = 20;

// ── Defense company tickers ────────────────────────────────────────────────────

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

// ── Stock photos (always-available fallbacks per category) ─────────────────────

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
  "Opex360", "Meta-Défense", "Air & Cosmos", "TTU", "Mer et Marine",
  "La Tribune Défense",
]);

const FR_SOURCES = new Set([
  "Opex360", "Meta-Défense", "Le Monde", "Le Figaro", "Les Echos",
  "Usine Nouvelle", "Challenges", "La Tribune", "La Tribune Défense",
  "Air & Cosmos", "L'Agefi", "Capital", "BFM Business", "Le Point",
  "TTU", "Mer et Marine",
]);

function resolveLanguage(article) {
  if (article.language === "fr" || article.language === "en") return article.language;
  return FR_SOURCES.has(article.source) ? "fr" : "en";
}

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

// Returns a guaranteed image URL for any article — never a colored placeholder
function getArticleImage(article) {
  if (article.image) return article.image;
  const pool = CATEGORY_STOCK_PHOTOS[article.category] || CATEGORY_STOCK_PHOTOS.TECHNOLOGY;
  const idx  = Math.abs((article.title?.charCodeAt(0) || 65) + (article.title?.length || 0)) % pool.length;
  return pool[idx];
}

const TIME_BAND_LABELS = {
  today:     "Today",
  yesterday: "Yesterday",
  this_week: "This Week",
  earlier:   "Earlier",
};

// ── Placeholder ───────────────────────────────────────────────────────────────

const PLACEHOLDER_GRADIENT = {
  CONTRACT:    "bg-emerald-900",
  TECHNOLOGY:  "bg-slate-800",
  CONFLICT:    "bg-red-900",
  POLICY:      "bg-amber-900",
  GEOPOLITICS: "bg-sky-900",
  "M&A":       "bg-blue-900",
  INDUSTRY:    "bg-slate-800",
};

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

  const initial    = source ? source.charAt(0).toUpperCase() : "?";
  const isSpecialty = SPECIALTY_DEFENSE_SOURCES.has(source);

  return (
    <span className="flex items-center gap-1.5 min-w-0">
      <span className="w-4 h-4 rounded flex-shrink-0 overflow-hidden bg-slate-100 flex items-center justify-center">
        {logoUrl && !err ? (
          <img src={logoUrl} alt="" width={16} height={16} className="w-full h-full object-contain" onError={() => setErr(true)} />
        ) : (
          <span className="text-[8px] font-bold text-slate-500 leading-none">{initial}</span>
        )}
      </span>
      <span className="text-[11px] text-slate-500 font-semibold truncate max-w-[120px] uppercase tracking-wide">
        {source}
      </span>
      {isSpecialty && (
        <span className="flex-shrink-0 text-[8px] font-bold px-1 py-px rounded bg-purple-100 text-purple-700 uppercase tracking-wide leading-tight">
          Specialty
        </span>
      )}
    </span>
  );
}

// ── HeroCard — full-width editorial hero (page 1, first article) ───────────────

function HeroCard({ article, isBookmarked, onBookmark }) {
  const [imgError, setImgError] = useState(false);
  const image     = imgError ? getArticleImage({ ...article, image: null }) : getArticleImage(article);
  const isNew     = differenceInHours(new Date(), new Date(article.publishedAt)) < 4;
  const srcCount  = article.source_count ?? 1;
  const countryCode = article.country_code?.toLowerCase();

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:border-purple-200 transition-all duration-200 group">
      {/* Large image */}
      <a href={article.url} target="_blank" rel="noopener noreferrer"
        className="block relative h-[300px] overflow-hidden">
        <img
          src={image}
          alt={article.title}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Bottom-left: category + flag */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider backdrop-blur-sm bg-white/90 ${getCategoryStyle(article.category)}`}>
            {article.category || "INDUSTRY"}
          </span>
          {countryCode && (
            <img src={`https://flagcdn.com/w20/${countryCode}.png`} alt="" className="w-6 h-4 object-cover rounded-sm shadow" />
          )}
        </div>

        {isNew && (
          <div className="absolute top-3 left-3">
            <span className="bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm tracking-wider">
              NEW
            </span>
          </div>
        )}
        {srcCount >= 2 && (
          <div className="absolute top-3 right-3">
            <span className="bg-orange-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
              {srcCount} sources
            </span>
          </div>
        )}
      </a>

      {/* Text block */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <SourceFavicon
            url={article.url}
            source={article.realSource || article.source}
            sourceLogo={article.sourceLogo}
          />
          <span className="text-slate-200">·</span>
          <span className="text-[11px] text-slate-400">{relativeTime(article.publishedAt)}</span>
        </div>

        <a href={article.url} target="_blank" rel="noopener noreferrer">
          <h2 className="text-[22px] font-bold text-slate-900 leading-tight group-hover:text-purple-700 transition-colors line-clamp-3 mb-4">
            {article.title}
          </h2>
        </a>

        <div className="flex items-center justify-end gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onBookmark(article); }}
            className={`p-2 rounded-lg transition-colors ${
              isBookmarked ? "text-amber-500 bg-amber-50" : "text-slate-300 hover:text-amber-500 hover:bg-amber-50"
            }`}
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-purple-700 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Read <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

// ── MediumCard — half-width card (featured grid, breaking intel) ───────────────

function MediumCard({ article, isBookmarked, onBookmark, isBreaking = false }) {
  const [imgError, setImgError]   = useState(false);
  const image       = imgError ? getArticleImage({ ...article, image: null }) : getArticleImage(article);
  const countryCode = article.country_code?.toLowerCase();
  const srcCount    = article.source_count ?? 1;

  return (
    <div className={`bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group flex flex-col ${
      isBreaking
        ? "border-orange-200 hover:border-orange-300"
        : "border-slate-200 hover:border-purple-200"
    }`}>
      {/* Image */}
      <a href={article.url} target="_blank" rel="noopener noreferrer"
        className="block relative h-[190px] overflow-hidden flex-shrink-0">
        <img
          src={image}
          alt={article.title}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider backdrop-blur-sm bg-white/90 ${getCategoryStyle(article.category)}`}>
            {article.category === "GEOPOLITICS" ? "GEO" : (article.category || "INDUSTRY")}
          </span>
          {countryCode && (
            <img src={`https://flagcdn.com/w20/${countryCode}.png`} alt="" className="w-5 h-3.5 object-cover rounded-sm" />
          )}
        </div>
        {srcCount >= 2 && (
          <div className="absolute top-2 right-2">
            <span className="bg-orange-500/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
              {srcCount} sources
            </span>
          </div>
        )}
      </a>

      {/* Text */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-1.5">
          <SourceFavicon
            url={article.url}
            source={article.realSource || article.source}
            sourceLogo={article.sourceLogo}
          />
          <span className="text-[10px] text-slate-300">·</span>
          <span className="text-[10px] text-slate-400">{relativeTime(article.publishedAt)}</span>
        </div>
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex-1">
          <h3 className="text-slate-800 font-bold text-[14px] leading-snug line-clamp-3 group-hover:text-purple-700 transition-colors">
            {article.title}
          </h3>
        </a>
        <div className="flex items-center justify-end gap-1 pt-1">
          <button
            onClick={(e) => { e.stopPropagation(); onBookmark(article); }}
            className={`p-1 rounded-lg transition-colors ${
              isBookmarked ? "text-amber-500 bg-amber-50" : "text-slate-300 hover:text-amber-500 hover:bg-amber-50"
            }`}
          >
            {isBookmarked ? <BookmarkCheck className="w-3 h-3" /> : <Bookmark className="w-3 h-3" />}
          </button>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-semibold hover:bg-purple-700 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Read <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

// ── NewsCard — compact list row with optional thumbnail ────────────────────────

const CAT_LEFT_BORDER = {
  CONTRACT:    "border-l-emerald-400",
  TECHNOLOGY:  "border-l-purple-400",
  CONFLICT:    "border-l-red-400",
  POLICY:      "border-l-amber-400",
  GEOPOLITICS: "border-l-sky-400",
  "M&A":       "border-l-blue-400",
  INDUSTRY:    "border-l-slate-300",
  EARNINGS:    "border-l-teal-400",
};

function NewsCard({ article, isBookmarked, onBookmark, isHot }) {
  const [imgError,    setImgError]    = useState(false);
  const [localImage,  setLocalImage]  = useState(null);

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
  const accent       = CAT_LEFT_BORDER[article.category] || CAT_LEFT_BORDER.INDUSTRY;

  return (
    <div className={`bg-white rounded-xl overflow-hidden transition-all duration-200 group border-l-2 ${accent} ${
      isHot
        ? "border border-orange-200 shadow-sm hover:shadow-md hover:border-orange-300"
        : "border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300"
    }`}>
      <div className="flex min-h-[88px]">
        {/* Text */}
        <div className="flex-1 min-w-0 p-4 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <SourceFavicon
              url={article.url}
              source={article.realSource || article.source}
              sourceLogo={article.sourceLogo}
            />
            <span className="text-[11px] text-slate-300">·</span>
            <span className="text-[11px] text-slate-400 font-medium">{relativeTime(article.publishedAt)}</span>
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
          </div>

          <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex-1">
            <h3 className={`font-bold leading-snug line-clamp-2 group-hover:text-slate-900 transition-colors ${
              isHot ? "text-[15px] text-slate-900" : "text-[14px] text-slate-800"
            }`}>
              {article.title}
            </h3>
          </a>

          <div className="flex items-center gap-2 mt-auto">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider flex-shrink-0 ${getCategoryStyle(article.category)}`}>
              {article.category === "GEOPOLITICS" ? "GEO" : (article.category || "INDUSTRY")}
            </span>
            {countryCode && (
              <img
                src={`https://flagcdn.com/w20/${countryCode}.png`}
                alt={countryCode.toUpperCase()}
                className="w-5 h-3.5 object-cover rounded-sm opacity-75 flex-shrink-0"
              />
            )}
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
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-semibold hover:bg-slate-800 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Read <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Thumbnail — only when a real scraped image exists */}
        {hasImage && (
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-[120px] self-stretch relative overflow-hidden"
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

// ── CompanyHeatWidget ──────────────────────────────────────────────────────────

function CompanyHeatWidget({ articles, selectedCompany, onSelectCompany }) {
  const [heatWindow, setHeatWindow] = useState(24);
  const [stockData,  setStockData]  = useState({});

  const companies = useMemo(
    () => detectCompaniesHeat(articles, heatWindow),
    [articles, heatWindow]
  );

  useEffect(() => {
    if (companies.length === 0) return;
    const tickers = companies.map((c) => c.ticker).join(",");
    axios
      .get(`${API}/stocks/prices`, { params: { tickers } })
      .then((r) => setStockData(r.data))
      .catch(() => {});
  }, [companies]);

  if (companies.length === 0) return null;

  return (
    <div className="w-72 flex-shrink-0">
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm sticky top-4 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">
              Market Pulse
            </span>
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

        {/* Company rows */}
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
                  isActive ? "bg-purple-50 border-l-2 border-l-purple-500" : ""
                }`}
              >
                {/* Name + stock */}
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

                {/* Article count */}
                <div className="flex items-center gap-1 mb-1.5">
                  <Tag className="w-3 h-3 text-slate-300" />
                  <span className="text-[10px] text-slate-400">
                    {count} article{count > 1 ? "s" : ""} · {heatWindow}h
                  </span>
                </div>

                {/* Latest article headline */}
                {latestArticle && (
                  <p className="text-[11px] text-slate-500 leading-snug line-clamp-2 border-l-2 border-slate-200 pl-2 hover:border-purple-300 transition-colors">
                    {latestArticle.title}
                  </p>
                )}
              </button>
            );
          })}
        </div>

        {selectedCompany && (
          <div className="px-4 py-2.5 border-t border-slate-100 bg-purple-50">
            <button
              onClick={() => onSelectCompany(null)}
              className="w-full text-[11px] text-purple-600 hover:text-purple-800 font-medium text-center"
            >
              × Clear company filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── SectionHeader ──────────────────────────────────────────────────────────────

function SectionHeader({ label, sublabel, color = "slate" }) {
  const divider = color === "orange" ? "bg-orange-200" : "bg-slate-200";
  return (
    <div className="flex items-center gap-2 mb-4">
      <h2 className="text-sm font-bold text-slate-700 uppercase tracking-widest">{label}</h2>
      {sublabel && (
        <span className="text-xs text-slate-400 font-normal normal-case tracking-normal">{sublabel}</span>
      )}
      <div className={`flex-1 h-px ${divider} ml-2`} />
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
    const matchCat    = selectedCat === "all" || a.category === selectedCat;
    const term        = searchTerm.toLowerCase();
    const matchSearch = !term
      || a.title.toLowerCase().includes(term)
      || (a.summary && a.summary.toLowerCase().includes(term))
      || a.source.toLowerCase().includes(term)
      || (a.company && a.company.toLowerCase().includes(term));
    const matchCompany = !selectedCompany || articleMentionsCompany(a, selectedCompany);
    return matchCat && matchSearch && matchCompany;
  }), [articles, selectedCat, searchTerm, selectedCompany]);

  // Reset to page 1 whenever any filter changes
  useEffect(() => { setCurrentPage(1); }, [searchTerm, selectedCat, selectedCompany]);

  // ── Breaking Intel ────────────────────────────────────────────────────────

  const pinnedArticles = filtered.filter(isBreakingIntel).slice(0, 3);
  const algoArticles   = pinnedArticles.length < 3
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

  // Page 1 gets editorial layout; page 2+ gets flat list
  const heroArticle   = currentPage === 1 ? pageArticles[0]      : null;
  const mediumArticles = currentPage === 1 ? pageArticles.slice(1, 3) : [];
  const listArticles   = currentPage === 1 ? pageArticles.slice(3)    : pageArticles;

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

  const cardProps = { bookmarkedUrls, onBookmark: toggleBookmark };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div data-testid="announcements-page" className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">
            Live News Feed
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Defense intelligence from specialty &amp; mainstream media
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {filtered.length > 0 && (
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
          )}
          {articles.length > 0 && (
            <div className="flex items-center gap-2 text-xs bg-white border border-slate-200 rounded-lg px-3 py-2">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              {highCount > 0 && (
                <span className="text-emerald-700 font-semibold">{highCount} high priority</span>
              )}
              {highCount > 0 && <span className="text-slate-300">·</span>}
              <span className="text-slate-500">
                {filtered.length}
                {filtered.length < articles.length ? ` / ${articles.length}` : ""} articles
              </span>
            </div>
          )}
          {lastUpdated && (
            <span className="text-xs text-slate-400">Updated {format(lastUpdated, "HH:mm")}</span>
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

      {/* Filters */}
      <div className="flex flex-col gap-3">

        {/* Row 1: search + category + region */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search by title, source, company or keyword…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <Select value={selectedCat} onValueChange={(v) => { setSelectedCat(v); setCurrentPage(1); }}>
            <SelectTrigger className="w-full sm:w-48 bg-white border-slate-200 text-slate-700">
              <Filter className="w-4 h-4 mr-2 text-slate-400" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200">
              {NEWS_CATEGORIES.map((cat) => (
                <SelectItem key={cat.value} value={cat.value} className="text-slate-700 focus:bg-slate-50">
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedRegion} onValueChange={handleRegionChange}>
            <SelectTrigger className="w-full sm:w-48 bg-white border-slate-200 text-slate-700">
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
        </div>

        {/* Row 2: language toggle + active company chip */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span className="text-xs text-slate-500 font-medium">Language:</span>
            <div className="flex rounded-lg border border-slate-200 overflow-hidden bg-white">
              {LANG_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleLangChange(opt.value)}
                  className={`px-4 py-1.5 text-xs font-semibold transition-colors ${
                    selectedLang === opt.value
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {opt.value === "en" && "🇬🇧 "}
                  {opt.value === "fr" && "🇫🇷 "}
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {selectedCompany && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-lg">
              <Building2 className="w-3.5 h-3.5 text-purple-600" />
              <span className="text-xs text-purple-700 font-semibold">
                {DEFENSE_TICKERS.find((d) => d.ticker === selectedCompany)?.name}
              </span>
              <button
                onClick={() => setSelectedCompany(null)}
                className="text-purple-400 hover:text-purple-700 ml-1 font-bold text-sm leading-none"
              >
                ×
              </button>
            </div>
          )}

          {(selectedLang !== "all" || selectedRegion !== "all" || selectedCompany) && (
            <button
              onClick={() => {
                setSelectedLang("all");
                setSelectedRegion("all");
                setSelectedCompany(null);
                setCurrentPage(1);
                fetchNews("all", "all");
              }}
              className="text-xs text-slate-400 hover:text-slate-600 underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

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
          <p className="text-sm mt-1 text-slate-400">
            The scraper runs automatically four times daily.
          </p>
        </div>
      ) : (
        <div className="space-y-10">

          {/* ── BREAKING INTEL ── */}
          {breakingArticles.length > 0 && (
            <div>
              <SectionHeader
                label="Breaking Intel"
                sublabel={`— ${breakingArticles.length} key ${breakingArticles.length === 1 ? "story" : "stories"}`}
                color="orange"
              />
              <div className={`grid gap-4 ${
                breakingArticles.length === 1
                  ? "grid-cols-1"
                  : breakingArticles.length === 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1 md:grid-cols-3"
              }`}>
                {breakingArticles.map((a, i) => (
                  <MediumCard
                    key={a.url || `breaking-${i}`}
                    article={a}
                    isBookmarked={bookmarkedUrls.has(a.url)}
                    onBookmark={toggleBookmark}
                    isBreaking
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── MAIN FEED + COMPANY HEAT ── */}
          {regularArticles.length > 0 && (
            <div>
              <SectionHeader
                label={currentPage === 1 ? "Latest" : `Page ${currentPage}`}
                sublabel={`— ${regularArticles.length} articles · page ${currentPage} of ${totalPages}`}
              />

              <div className="flex flex-col lg:flex-row gap-6 items-start">

                {/* Articles column */}
                <div className="flex-1 min-w-0 space-y-5">

                  {/* Page 1: Hero → 2 Medium → list */}
                  {currentPage === 1 && (
                    <>
                      {heroArticle && (
                        <HeroCard
                          article={heroArticle}
                          isBookmarked={bookmarkedUrls.has(heroArticle.url)}
                          onBookmark={toggleBookmark}
                        />
                      )}
                      {mediumArticles.length > 0 && (
                        <div className={`grid gap-4 ${
                          mediumArticles.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
                        }`}>
                          {mediumArticles.map((a, i) => (
                            <MediumCard
                              key={a.url || `medium-${i}`}
                              article={a}
                              isBookmarked={bookmarkedUrls.has(a.url)}
                              onBookmark={toggleBookmark}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  )}

                  {/* List (page 1: articles 4+, page 2+: all) */}
                  {listArticles.length > 0 && (
                    <div className="flex flex-col gap-3">
                      {listArticles.map((a, i) => (
                        <NewsCard
                          key={a.url || `list-${i}`}
                          article={a}
                          isBookmarked={bookmarkedUrls.has(a.url)}
                          onBookmark={toggleBookmark}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Company Heat panel */}
                <div className="hidden lg:block">
                  <CompanyHeatWidget
                    articles={filtered}
                    selectedCompany={selectedCompany}
                    onSelectCompany={(ticker) => {
                      setSelectedCompany(ticker);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── PAGINATION ── */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

        </div>
      )}
    </div>
  );
}
