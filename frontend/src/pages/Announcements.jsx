import { useEffect, useState, useCallback } from "react";
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
  Bookmark,
  BookmarkCheck,
  Sparkles,
  Globe,
  MapPin,
  Download,
  ChevronDown,
} from "lucide-react";
import { format, differenceInHours, differenceInDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/App";

// ── Constants ─────────────────────────────────────────────────────────────────

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
  { value: "all",          label: "All Regions",    flag: "🌍" },
  { value: "us",           label: "US & Canada",    flag: "🇺🇸" },
  { value: "europe",       label: "Europe",         flag: "🇪🇺" },
  { value: "asia-pacific", label: "Asia-Pacific",   flag: "🌏" },
  { value: "middle-east",  label: "Middle East",    flag: "🌍" },
  { value: "africa",       label: "Africa",         flag: "🌍" },
  { value: "global",       label: "Global",         flag: "🌐" },
];

const LANG_OPTIONS = [
  { value: "en",  label: "EN" },
  { value: "all", label: "All" },
  { value: "fr",  label: "FR" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function getCategoryStyle(category) {
  switch (category) {
    case "CONTRACT":    return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "POLICY":      return "bg-amber-50   text-amber-700   border-amber-200";
    case "M&A":         return "bg-blue-50    text-blue-700    border-blue-200";
    case "TECHNOLOGY":  return "bg-purple-50  text-purple-700  border-purple-200";
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
    const days = differenceInDays(new Date(), d);
    if (days < 7) return `${days}d ago`;
    return format(d, "MMM d");
  } catch { return ""; }
}

// Map source name → language for display fallback (old articles without field)
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

function langFlag(lang) {
  return lang === "fr" ? "🇫🇷" : "🇬🇧";
}

/**
 * Determine if an article qualifies as "Breaking Intel".
 *
 * Priority 1 — Admin explicitly pinned the article (breakingIntel: true).
 * Priority 2 — Algorithmic fallback when no manual pins exist:
 *   a. adminApproved = true
 *   b. 2+ sources AND relevance ≥ 50, within last 24h
 *   c. Relevance ≥ 80 AND major category, within 24h
 *   d. Relevance ≥ 90 regardless of category, within 24h
 *
 * The caller (page component) selects pinned articles first and uses
 * algorithmic ones only when there are fewer than 3 pinned articles.
 */
function isBreakingIntel(article) {
  if (article.breakingIntel) return true;
  return false;
}

function isAlgoBreakingIntel(article) {
  if (article.adminApproved) return true;
  const score  = article.relevanceScore ?? 0;
  const sources = article.source_count  ?? 1;
  const cat    = article.category      ?? "";
  const ageH   = differenceInHours(new Date(), new Date(article.publishedAt));
  if (ageH > 24) return false;
  if (sources >= 2 && score >= 50) return true;
  if (score >= 80 && ["CONTRACT", "M&A", "POLICY", "TECHNOLOGY"].includes(cat)) return true;
  if (score >= 90) return true;
  return false;
}

/**
 * Bucket an article into a time band.
 * Returns one of: "today" | "yesterday" | "this_week" | "earlier"
 */
function timeBand(dateStr) {
  try {
    const h    = differenceInHours(new Date(), new Date(dateStr));
    const days = differenceInDays(new Date(), new Date(dateStr));
    if (h < 24)        return "today";
    if (h < 48)        return "yesterday";
    if (days < 7)      return "this_week";
    return "earlier";
  } catch { return "earlier"; }
}

const TIME_BAND_LABELS = {
  today:     "Today",
  yesterday: "Yesterday",
  this_week: "This Week",
  earlier:   "Earlier",
};

// ── Placeholder ───────────────────────────────────────────────────────────────

const PLACEHOLDER_GRADIENT = {
  CONTRACT:    "from-emerald-950 via-emerald-900 to-emerald-800",
  TECHNOLOGY:  "from-purple-950 via-purple-900 to-purple-800",
  CONFLICT:    "from-red-950 via-red-900 to-red-800",
  POLICY:      "from-amber-950 via-amber-900 to-amber-800",
  GEOPOLITICS: "from-sky-950 via-sky-900 to-sky-800",
  "M&A":       "from-blue-950 via-blue-900 to-blue-800",
  INDUSTRY:    "from-slate-900 via-slate-800 to-slate-700",
};

// Curated stock photos per category — all IDs verified on unsplash.com, fallback to gradient if all fail
const CATEGORY_STOCK_PHOTOS = {
  TECHNOLOGY: [
    "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800&q=80", // military helicopter
    "https://images.unsplash.com/photo-1759610545704-9bbee32cb17c?auto=format&fit=crop&w=800&q=80", // F16 jets formation
    "https://images.unsplash.com/photo-1712747153465-2637c38cc28e?auto=format&fit=crop&w=800&q=80", // fighter jet on runway
    "https://images.unsplash.com/photo-1612529784443-40a86b856d14?auto=format&fit=crop&w=800&q=80", // satellite dish close-up
  ],
  CONTRACT: [
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80", // man signing contract
    "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=800&q=80", // person writing on paper
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80", // corporate buildings
  ],
  CONFLICT: [
    "https://images.unsplash.com/photo-1668724982255-1a3e0c72b814?auto=format&fit=crop&w=800&q=80", // group of soldiers
    "https://images.unsplash.com/photo-1578241030078-01b38ededda4?auto=format&fit=crop&w=800&q=80", // soldier with rifle
    "https://images.unsplash.com/photo-1708342421457-9c59f4843fe1?auto=format&fit=crop&w=800&q=80", // navy warship
    "https://images.unsplash.com/photo-1759610545704-9bbee32cb17c?auto=format&fit=crop&w=800&q=80", // F16 jets
  ],
  POLICY: [
    "https://images.unsplash.com/photo-1742252306330-453455bd7526?auto=format&fit=crop&w=800&q=80", // Big Ben & parliament at dusk
    "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800&q=80", // military helicopter
    "https://images.unsplash.com/photo-1755975856018-93951b519ed7?auto=format&fit=crop&w=800&q=80", // Big Ben clear sky
  ],
  GEOPOLITICS: [
    "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80", // world map blue-green
    "https://images.unsplash.com/photo-1650526087824-163941841b52?auto=format&fit=crop&w=800&q=80", // world map with pins
    "https://images.unsplash.com/photo-1531266752426-aad472b7bbf4?auto=format&fit=crop&w=800&q=80", // terrestrial globe
  ],
  "M&A": [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80", // corporate skyscrapers
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80", // signing documents
    "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=800&q=80", // business paperwork
  ],
  INDUSTRY: [
    "https://images.unsplash.com/photo-1720036236855-9a1a2e4d3f26?auto=format&fit=crop&w=800&q=80", // factory machinery
    "https://images.unsplash.com/photo-1720036236697-018370867320?auto=format&fit=crop&w=800&q=80", // industrial plant lights
    "https://images.unsplash.com/photo-1708342421457-9c59f4843fe1?auto=format&fit=crop&w=800&q=80", // navy warship
    "https://images.unsplash.com/photo-1759610545704-9bbee32cb17c?auto=format&fit=crop&w=800&q=80", // F16 jets
  ],
};

function NewsPlaceholder({ source, category, url, sourceLogo, articleSeed }) {
  const [logoErr, setLogoErr] = useState(false);
  const photos = CATEGORY_STOCK_PHOTOS[category] || CATEGORY_STOCK_PHOTOS.INDUSTRY;
  const [photoIdx, setPhotoIdx] = useState(() => {
    const seed = articleSeed || source || category || "";
    const hash = [...seed].reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return hash % photos.length;
  });
  const [allPhotosFailed, setAllPhotosFailed] = useState(false);

  const domain = (() => { try { return url ? new URL(url).hostname : ""; } catch { return ""; } })();
  const isGoogleDomain = !domain || domain.includes("google.com");
  const isGoogleLogo = sourceLogo?.includes("news.google.com");
  const effectiveLogo = !isGoogleLogo ? sourceLogo : null;

  const logoUrl = !logoErr
    ? (effectiveLogo || (!isGoogleDomain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : null))
    : null;

  const gradient = PLACEHOLDER_GRADIENT[category] || "from-slate-900 via-slate-800 to-slate-700";

  const handlePhotoError = () => {
    if (photoIdx + 1 < photos.length) {
      setPhotoIdx(photoIdx + 1);
    } else {
      setAllPhotosFailed(true);
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden">
      {!allPhotosFailed ? (
        <img
          src={photos[photoIdx]}
          alt=""
          className="w-full h-full object-cover"
          onError={handlePhotoError}
        />
      ) : (
        <div className={`w-full h-full bg-gradient-to-br ${gradient}`} />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-lg mb-2">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={source}
              className="w-10 h-10 object-contain"
              onError={() => setLogoErr(true)}
            />
          ) : (
            <span className="text-white/80 text-2xl font-bold">{source?.charAt(0)?.toUpperCase() || "?"}</span>
          )}
        </div>
        <span className="text-white/70 text-[11px] font-semibold tracking-wide uppercase mt-1">{source}</span>
        {category && (
          <span className="text-white/40 text-[9px] mt-0.5 tracking-widest uppercase">{category}</span>
        )}
      </div>
    </div>
  );
}

// ── SourceFavicon ─────────────────────────────────────────────────────────────

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

  const initial = source ? source.charAt(0).toUpperCase() : "?";

  return (
    <span className="flex items-center gap-1.5 min-w-0">
      <span className="w-4 h-4 rounded flex-shrink-0 overflow-hidden bg-slate-100 flex items-center justify-center">
        {logoUrl && !err ? (
          <img src={logoUrl} alt="" width={16} height={16} className="w-full h-full object-contain" onError={() => setErr(true)} />
        ) : (
          <span className="text-[8px] font-bold text-slate-500 leading-none">{initial}</span>
        )}
      </span>
      <span className="text-[11px] text-slate-500 font-semibold truncate max-w-[120px] uppercase tracking-wide">{source}</span>
    </span>
  );
}

// ── NewsCard ──────────────────────────────────────────────────────────────────

function NewsCard({ article, isBookmarked, onBookmark, summaryState, onSummary, isHot }) {
  const [imgError, setImgError] = useState(false);
  const [localImage, setLocalImage] = useState(null);

  // If the article has no image stored, try fetching the OG image on-demand.
  // The backend caches the result in the DB so subsequent loads are instant.
  useEffect(() => {
    if (!article.image && !localImage && article.url) {
      axios
        .get(`${API}/news/og-image`, { params: { url: article.url } })
        .then((r) => { if (r.data.image) setLocalImage(r.data.image); })
        .catch(() => {});
    }
  }, [article.url, article.image, localImage]);

  const displayImage = article.image || localImage;

  const score     = article.relevanceScore ?? 0;
  const isNew     = differenceInHours(new Date(), new Date(article.publishedAt)) < 4;
  const srcCount  = article.source_count ?? 1;
  const coveredBy = article.covered_by ?? [];
  const lang      = resolveLanguage(article);

  const showSummary = summaryState && (summaryState.loading || summaryState.bullets);

  return (
    <div className={`rounded-2xl overflow-hidden flex flex-col group cursor-pointer transition-all duration-200 ${
      isHot
        ? "bg-white border-2 border-orange-300 shadow-md hover:shadow-xl hover:border-orange-400 hover:-translate-y-0.5"
        : "bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-purple-200 hover:-translate-y-0.5"
    }`}>

      {/* ── Cover image ── */}
      <a href={article.url} target="_blank" rel="noopener noreferrer" className="relative block flex-shrink-0 overflow-hidden" style={{ height: "220px" }}>
        {!imgError && displayImage ? (
          <img
            src={displayImage}
            alt={article.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
          />
        ) : (
          <NewsPlaceholder source={article.source} category={article.category} url={article.url} sourceLogo={article.sourceLogo} articleSeed={article.id || article.title} />
        )}

        {/* Bottom scrim for badge legibility */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

        {/* Score badge — top left */}
        {score >= 70 && (
          <span className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider shadow">
            HIGH
          </span>
        )}

        {/* NEW badge — top right */}
        {isNew && (
          <span className="absolute top-3 right-3 bg-purple-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider shadow">
            NEW
          </span>
        )}

        {/* Bottom row: multi-source + lang flag */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
          {srcCount >= 2 ? (
            <span
              className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide flex items-center gap-1 shadow"
              title={`Covered by: ${coveredBy.join(", ")}`}
            >
              🔥 {srcCount} sources
            </span>
          ) : <span />}
          <span className="text-base leading-none drop-shadow" title={lang === "fr" ? "French" : "English"}>
            {langFlag(lang)}
          </span>
        </div>
      </a>

      {/* ── Body ── */}
      <div className="p-4 flex flex-col flex-1 gap-3">

        {/* Source + category row */}
        <div className="flex items-center justify-between gap-2">
          <SourceFavicon
            url={article.url}
            source={article.realSource || article.source}
            sourceLogo={article.sourceLogo}
          />
          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border flex-shrink-0 uppercase tracking-widest ${getCategoryStyle(article.category)}`}>
            {article.category === "GEOPOLITICS" ? "GEO" : (article.category || "INDUSTRY")}
          </span>
        </div>

        {/* Title — larger, bolder, clickable */}
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex-1 group/title">
          <h3 className="text-slate-900 font-bold text-[15px] leading-snug line-clamp-3 group-hover/title:text-purple-700 transition-colors duration-150">
            {article.title}
          </h3>
        </a>

        {/* AI Summary panel */}
        {showSummary && (
          <div className="bg-purple-50 border border-purple-100 rounded-xl p-3">
            {summaryState.loading ? (
              <div className="flex items-center gap-2 text-purple-500 text-xs">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                Generating brief…
              </div>
            ) : summaryState.error ? (
              <p className="text-red-500 text-xs">Failed to generate summary.</p>
            ) : (
              <ul className="space-y-1.5">
                {(summaryState.bullets || []).map((b, i) => (
                  <li key={i} className="flex gap-2 text-xs text-slate-700 leading-snug">
                    <span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-2 mt-auto">
          <span className="text-[11px] text-slate-400 font-medium">{relativeTime(article.publishedAt)}</span>

          <div className="flex items-center gap-1">
            {/* AI Brief */}
            <button
              onClick={(e) => { e.stopPropagation(); onSummary(article); }}
              title="AI Brief"
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                showSummary
                  ? "bg-purple-100 text-purple-700"
                  : "text-slate-400 hover:bg-purple-50 hover:text-purple-600"
              }`}
            >
              <Sparkles className="w-3 h-3" />
              Brief
            </button>

            {/* Bookmark */}
            <button
              onClick={(e) => { e.stopPropagation(); onBookmark(article); }}
              title={isBookmarked ? "Remove bookmark" : "Save"}
              className={`p-1.5 rounded-lg transition-colors ${
                isBookmarked
                  ? "text-amber-500 bg-amber-50"
                  : "text-slate-300 hover:text-amber-500 hover:bg-amber-50"
              }`}
            >
              {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
            </button>

            {/* Read CTA */}
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-semibold hover:bg-purple-700 transition-colors"
            >
              Read <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SectionHeader ─────────────────────────────────────────────────────────────

function SectionHeader({ emoji, label, sublabel, color = "slate" }) {
  const dividerColor = color === "orange" ? "bg-orange-200" : "bg-slate-200";
  return (
    <div className="flex items-center gap-2 mb-4">
      {emoji && <span className="text-base">{emoji}</span>}
      <h2 className="text-sm font-bold text-slate-700 uppercase tracking-widest">{label}</h2>
      {sublabel && (
        <span className="text-xs text-slate-400 font-normal normal-case tracking-normal">{sublabel}</span>
      )}
      <div className={`flex-1 h-px ${dividerColor} ml-2`} />
    </div>
  );
}

// ── ArticleGrid ───────────────────────────────────────────────────────────────

function ArticleGrid({ articles, bookmarkedUrls, summaries, onBookmark, onSummary, isHot = false }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, idx) => (
        <NewsCard
          key={article.url || `${isHot ? "hot" : "reg"}-${idx}`}
          article={article}
          isBookmarked={bookmarkedUrls.has(article.url)}
          onBookmark={onBookmark}
          summaryState={summaries[article.url]}
          onSummary={onSummary}
          isHot={isHot}
        />
      ))}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Announcements() {
  const { token } = useAuth();
  const navigate   = useNavigate();

  const [articles,      setArticles]      = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [loadingMore,   setLoadingMore]   = useState(false);
  const [scraping,      setScraping]      = useState(false);
  const [searchTerm,    setSearchTerm]    = useState("");
  const [selectedCat,   setSelectedCat]   = useState("all");
  const [selectedLang,  setSelectedLang]  = useState("en");
  const [selectedRegion,setSelectedRegion]= useState("all");
  const [lastUpdated,   setLastUpdated]   = useState(null);
  // Whether to show the "Earlier" (>7 days) bucket
  const [showEarlier,   setShowEarlier]   = useState(false);
  // Offset for load-more older articles
  const [olderOffset,   setOlderOffset]   = useState(0);
  const [hasMore,       setHasMore]       = useState(false);

  const [bookmarkedUrls, setBookmarkedUrls] = useState(new Set());
  const [summaries,      setSummaries]      = useState({});

  // ── Fetch news — last 7 days (168 h) ──────────────────────────────────────

  const fetchNews = useCallback(async (lang = "all", region = "all") => {
    setLoading(true);
    setOlderOffset(0);
    setHasMore(false);
    setShowEarlier(false);
    try {
      const params = { limit: 300, hours: 168 };
      if (lang   !== "all") params.language = lang;
      if (region !== "all") params.region   = region;
      const resp = await axios.get(`${API}/news`, { params });
      setArticles(resp.data);
      setHasMore(resp.data.length >= 200);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchNews(selectedLang, selectedRegion); }, [fetchNews]);

  // Re-fetch when language or region filter changes
  const handleLangChange = (lang) => {
    setSelectedLang(lang);
    fetchNews(lang, selectedRegion);
  };
  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    fetchNews(selectedLang, region);
  };

  // ── Load older articles (beyond 7-day window) ─────────────────────────────

  const loadOlderArticles = async () => {
    setLoadingMore(true);
    const newOffset = olderOffset + 120;
    try {
      const params = { limit: 60, hours: 0, offset: newOffset };
      if (selectedLang   !== "all") params.language = selectedLang;
      if (selectedRegion !== "all") params.region   = selectedRegion;
      const resp = await axios.get(`${API}/news`, { params });
      if (resp.data.length > 0) {
        setArticles((prev) => {
          // Merge, dedup by URL
          const existingUrls = new Set(prev.map((a) => a.url));
          const newOnes = resp.data.filter((a) => !existingUrls.has(a.url));
          return [...prev, ...newOnes];
        });
        setOlderOffset(newOffset);
        setHasMore(resp.data.length >= 60);
        setShowEarlier(true);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error loading older articles:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  // ── Load bookmarks ────────────────────────────────────────────────────────

  useEffect(() => {
    if (!token) return;
    axios.get(`${API}/bookmarks`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => setBookmarkedUrls(new Set(r.data.map((b) => b.article?.url).filter(Boolean))))
      .catch(() => {});
  }, [token]);

  // ── Bookmark toggle ───────────────────────────────────────────────────────

  const toggleBookmark = async (article) => {
    if (!token) { navigate("/login"); return; }
    const url  = article.url;
    const saved = bookmarkedUrls.has(url);
    setBookmarkedUrls((prev) => {
      const next = new Set(prev);
      saved ? next.delete(url) : next.add(url);
      return next;
    });
    try {
      if (saved) {
        await axios.delete(`${API}/bookmarks`, { params: { url }, headers: { Authorization: `Bearer ${token}` } });
      } else {
        await axios.post(`${API}/bookmarks`, { article }, { headers: { Authorization: `Bearer ${token}` } });
      }
    } catch {
      setBookmarkedUrls((prev) => {
        const next = new Set(prev);
        saved ? next.add(url) : next.delete(url);
        return next;
      });
    }
  };

  // ── AI Summary ────────────────────────────────────────────────────────────

  const toggleSummary = async (article) => {
    if (!token) { navigate("/login"); return; }
    const url = article.url;
    if (summaries[url]?.bullets) {
      setSummaries((prev) => { const n = { ...prev }; delete n[url]; return n; });
      return;
    }
    setSummaries((prev) => ({ ...prev, [url]: { loading: true } }));
    try {
      const resp = await axios.post(
        `${API}/news/ai-summary`,
        { url, title: article.title, summary: article.summary || "" },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setSummaries((prev) => ({ ...prev, [url]: { loading: false, bullets: resp.data.bullets } }));
    } catch {
      setSummaries((prev) => ({ ...prev, [url]: { loading: false, error: true } }));
    }
  };

  // ── Client-side category + search filter ─────────────────────────────────

  const filtered = articles.filter((a) => {
    const matchCat    = selectedCat === "all" || a.category === selectedCat;
    const term        = searchTerm.toLowerCase();
    const matchSearch = !term
      || a.title.toLowerCase().includes(term)
      || (a.summary && a.summary.toLowerCase().includes(term))
      || a.source.toLowerCase().includes(term);
    return matchCat && matchSearch;
  });

  // ── Section splits ────────────────────────────────────────────────────────

  // Admin-pinned articles fill the Breaking Intel slots first (max 3).
  // If fewer than 3 are pinned, algorithmic picks fill remaining slots.
  const pinnedArticles = filtered.filter(isBreakingIntel).slice(0, 3);
  const algoArticles   = pinnedArticles.length < 3
    ? filtered
        .filter((a) => !isBreakingIntel(a) && isAlgoBreakingIntel(a))
        .slice(0, 3 - pinnedArticles.length)
    : [];
  const breakingArticles = [...pinnedArticles, ...algoArticles];
  const breakingUrls     = new Set(breakingArticles.map((a) => a.url));
  const regularArticles  = filtered.filter((a) => !breakingUrls.has(a.url));

  // Time-band grouping for regular articles
  const todayArticles     = regularArticles.filter((a) => timeBand(a.publishedAt) === "today");
  const yesterdayArticles = regularArticles.filter((a) => timeBand(a.publishedAt) === "yesterday");
  const weekArticles      = regularArticles.filter((a) => timeBand(a.publishedAt) === "this_week");
  const earlierArticles   = regularArticles.filter((a) => timeBand(a.publishedAt) === "earlier");

  const highCount = articles.filter((a) => (a.relevanceScore ?? 0) >= 70).length;

  const exportCSV = () => {
    const headers = ["Title", "Source", "Category", "Date", "URL"];
    const rows = filtered.map((a) => [
      `"${(a.title || "").replace(/"/g, '""')}"`,
      `"${a.source || ""}"`,
      a.category || "",
      a.publishedAt ? new Date(a.publishedAt).toISOString().slice(0, 10) : "",
      a.url || "",
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `news-export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Shared card props ─────────────────────────────────────────────────────

  const cardProps = {
    bookmarkedUrls,
    summaries,
    onBookmark: toggleBookmark,
    onSummary: toggleSummary,
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div data-testid="announcements-page" className="space-y-6 animate-fade-in">

      {/* ── Header ── */}
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
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          )}
          {articles.length > 0 && (
            <div className="flex items-center gap-2 text-xs bg-white border border-slate-200 rounded-lg px-3 py-2">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              {highCount > 0 && <span className="text-emerald-700 font-semibold">{highCount} high priority</span>}
              {highCount > 0 && <span className="text-slate-300">·</span>}
              <span className="text-slate-500">{articles.length} articles</span>
            </div>
          )}
          {lastUpdated && (
            <span className="text-xs text-slate-400">Updated {format(lastUpdated, "HH:mm")}</span>
          )}
          {token ? (
            <button
              onClick={() => {
                setScraping(true);
                axios.post(`${API}/admin/scrape-news`, {}, { headers: { Authorization: `Bearer ${token}` } })
                  .then(() => fetchNews(selectedLang, selectedRegion))
                  .catch(console.error)
                  .finally(() => setScraping(false));
              }}
              disabled={scraping}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors disabled:opacity-50"
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

      {/* ── Filters ── */}
      <div className="flex flex-col gap-3">

        {/* Row 1 — search + category + region */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search by title, source or keyword…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
            />
          </div>

          {/* Category */}
          <Select value={selectedCat} onValueChange={setSelectedCat}>
            <SelectTrigger className="w-full sm:w-48 bg-white border-slate-200 text-slate-700">
              <Filter className="w-4 h-4 mr-2 text-slate-400" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200">
              {NEWS_CATEGORIES.map((cat) => (
                <SelectItem key={cat.value} value={cat.value} className="text-slate-700 focus:bg-purple-50">
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Region */}
          <Select value={selectedRegion} onValueChange={handleRegionChange}>
            <SelectTrigger className="w-full sm:w-48 bg-white border-slate-200 text-slate-700">
              <MapPin className="w-4 h-4 mr-2 text-slate-400" />
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200">
              {REGION_OPTIONS.map((r) => (
                <SelectItem key={r.value} value={r.value} className="text-slate-700 focus:bg-purple-50">
                  <span className="mr-1.5">{r.flag}</span>{r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Row 2 — language toggle */}
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <span className="text-xs text-slate-500 font-medium mr-1">Language:</span>
          <div className="flex rounded-lg border border-slate-200 overflow-hidden bg-white">
            {LANG_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleLangChange(opt.value)}
                className={`px-4 py-1.5 text-xs font-semibold transition-colors ${
                  selectedLang === opt.value
                    ? "bg-purple-600 text-white"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {opt.value === "en" && "🇬🇧 "}
                {opt.value === "fr" && "🇫🇷 "}
                {opt.label}
              </button>
            ))}
          </div>
          {(selectedLang !== "all" || selectedRegion !== "all") && (
            <button
              onClick={() => { setSelectedLang("all"); setSelectedRegion("all"); fetchNews("all", "all"); }}
              className="text-xs text-slate-400 hover:text-slate-600 underline ml-1"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Grid ── */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full" />
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
            The scraper runs automatically twice a day at 07:00 and 19:00 UTC.
          </p>
        </div>
      ) : (
        <div className="space-y-10">

          {/* ── BREAKING INTEL — admin-pinned + algo fill, max 3 ── */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <SectionHeader
                emoji="🔥"
                label="Breaking Intel"
                sublabel={`— ${pinnedArticles.length}/3 slots curated · refreshes at 07:05 &amp; 19:05 UTC`}
                color="orange"
              />
            </div>
            {breakingArticles.length > 0 ? (
              <ArticleGrid articles={breakingArticles} {...cardProps} isHot />
            ) : (
              <div className="flex items-center gap-3 px-5 py-4 bg-white border border-orange-100 rounded-xl text-slate-500 text-sm">
                <span className="text-xl">📡</span>
                <span>No high-priority news for now — next slot refresh at 07:05 or 19:05 UTC.</span>
              </div>
            )}
          </div>

          {/* ── TODAY ── */}
          {todayArticles.length > 0 && (
            <div>
              <SectionHeader label="Today" sublabel={`— last 24 hours · ${todayArticles.length} articles`} />
              <ArticleGrid articles={todayArticles} {...cardProps} />
            </div>
          )}

          {/* ── YESTERDAY ── */}
          {yesterdayArticles.length > 0 && (
            <div>
              <SectionHeader label="Yesterday" sublabel={`— ${yesterdayArticles.length} articles`} />
              <ArticleGrid articles={yesterdayArticles} {...cardProps} />
            </div>
          )}

          {/* ── THIS WEEK ── */}
          {weekArticles.length > 0 && (
            <div>
              <SectionHeader label="This Week" sublabel={`— past 7 days · ${weekArticles.length} articles`} />
              <ArticleGrid articles={weekArticles} {...cardProps} />
            </div>
          )}

          {/* ── EARLIER (only shown after expanding) ── */}
          {showEarlier && earlierArticles.length > 0 && (
            <div>
              <SectionHeader label="Earlier" sublabel={`— ${earlierArticles.length} older articles`} />
              <ArticleGrid articles={earlierArticles} {...cardProps} />
            </div>
          )}

          {/* ── Load older / Show more ── */}
          <div className="flex justify-center pt-2">
            {hasMore ? (
              <button
                onClick={loadOlderArticles}
                disabled={loadingMore}
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-purple-200 hover:text-purple-700 transition-colors disabled:opacity-50"
              >
                {loadingMore ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
                {loadingMore ? "Loading…" : "Load older articles"}
              </button>
            ) : articles.length > 0 ? (
              <p className="text-xs text-slate-400">
                All articles loaded · {articles.length} total
              </p>
            ) : null}
          </div>

        </div>
      )}
    </div>
  );
}
