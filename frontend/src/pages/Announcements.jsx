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
  LogIn,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  ChevronDown,
  Globe,
  MapPin,
} from "lucide-react";
import { format, formatDistanceToNow, differenceInHours } from "date-fns";
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
    return format(d, "MMM d");
  } catch { return ""; }
}

// Map source name → language for display fallback (old articles without field)
const FR_SOURCES = new Set(["Opex360", "Meta-Défense", "Le Monde", "Le Figaro", "Les Echos"]);

function resolveLanguage(article) {
  if (article.language === "fr" || article.language === "en") return article.language;
  return FR_SOURCES.has(article.source) ? "fr" : "en";
}

function langFlag(lang) {
  return lang === "fr" ? "🇫🇷" : "🇬🇧";
}

// ── Placeholder SVG ───────────────────────────────────────────────────────────

function NewsPlaceholder({ source }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800">
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <polygon points="25,7 28,3 31,7 30,7 30,20 26,20 26,7" fill="#4f46e5" opacity="0.9" />
        <rect x="20" y="20" width="16" height="16" rx="1" fill="#4f46e5" opacity="0.7" />
        <circle cx="28" cy="42" r="6" fill="none" stroke="#4f46e5" strokeWidth="2" opacity="0.6" />
        <line x1="28" y1="36" x2="28" y2="48" stroke="#4f46e5" strokeWidth="1.5" opacity="0.6" />
        <line x1="22" y1="42" x2="34" y2="42" stroke="#4f46e5" strokeWidth="1.5" opacity="0.6" />
      </svg>
      <span className="text-slate-400 text-xs mt-2 font-medium">{source}</span>
    </div>
  );
}

// ── SourceFavicon ─────────────────────────────────────────────────────────────

function SourceFavicon({ url, source }) {
  const [err, setErr] = useState(false);
  let domain = "";
  try { domain = new URL(url).hostname; } catch { /* empty */ }
  const initial = source ? source.charAt(0).toUpperCase() : "?";
  const faviconUrl = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64` : null;

  return (
    <span className="flex items-center gap-2 min-w-0">
      <span className="w-5 h-5 rounded-md flex-shrink-0 overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
        {faviconUrl && !err ? (
          <img src={faviconUrl} alt="" width={20} height={20} className="w-full h-full object-contain" onError={() => setErr(true)} />
        ) : (
          <span className="text-[9px] font-bold text-slate-500 leading-none">{initial}</span>
        )}
      </span>
      <span className="text-xs text-slate-500 font-medium truncate max-w-[130px]">{source}</span>
    </span>
  );
}

// ── NewsCard ──────────────────────────────────────────────────────────────────

function NewsCard({ article, isBookmarked, onBookmark, summaryState, onSummary }) {
  const [imgError, setImgError] = useState(false);
  const score = article.relevanceScore ?? 0;
  const isNew = differenceInHours(new Date(), new Date(article.publishedAt)) < 4;

  const scoreBadge = score >= 70
    ? <span className="absolute top-2 left-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide">HIGH</span>
    : score >= 35
    ? <span className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-white" title={`Score ${score}`} />
    : null;

  const showSummary = summaryState && (summaryState.loading || summaryState.bullets);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden hover:shadow-lg hover:border-purple-200 transition-all flex flex-col group">

      {/* Cover image — clicking navigates to article */}
      <a href={article.url} target="_blank" rel="noopener noreferrer" className="relative h-44 bg-slate-100 overflow-hidden flex-shrink-0 block">
        {!imgError && article.image ? (
          <img
            src={article.image}
            alt={article.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <NewsPlaceholder source={article.source} />
        )}
        {scoreBadge}
        {isNew && (
          <span className="absolute top-2 right-2 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide">NEW</span>
        )}
        {/* Language flag */}
        {(() => { const lang = resolveLanguage(article); return (
          <span className="absolute bottom-2 right-2 text-base leading-none" title={lang === "fr" ? "French" : "English"}>
            {langFlag(lang)}
          </span>
        ); })()}
      </a>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        {/* Source row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <SourceFavicon url={article.url} source={article.source} />
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 uppercase tracking-wide ${getCategoryStyle(article.category)}`}>
            {article.category === "GEOPOLITICS" ? "GEO" : article.category}
          </span>
        </div>

        {/* Title */}
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex-1">
          <h3 className="text-slate-900 font-semibold text-sm leading-snug line-clamp-3 group-hover:text-purple-700 transition-colors">
            {article.title}
          </h3>
        </a>

        {/* Summary */}
        {article.summary && !showSummary && (
          <p className="text-slate-400 text-xs mt-2 line-clamp-2 leading-relaxed">
            {article.summary}
          </p>
        )}

        {/* AI Summary panel */}
        {showSummary && (
          <div className="mt-3 bg-purple-50 border border-purple-100 rounded-lg p-3">
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

        {/* Footer actions */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 gap-2">
          <span className="text-xs text-slate-400">{relativeTime(article.publishedAt)}</span>

          <div className="flex items-center gap-1.5">
            {/* AI Summary toggle */}
            <button
              onClick={(e) => { e.stopPropagation(); onSummary(article); }}
              title="AI Brief (3 key points)"
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                showSummary
                  ? "bg-purple-100 text-purple-700"
                  : "bg-slate-50 text-slate-500 hover:bg-purple-50 hover:text-purple-600"
              }`}
            >
              <Sparkles className="w-3 h-3" />
              Brief
            </button>

            {/* Bookmark */}
            <button
              onClick={(e) => { e.stopPropagation(); onBookmark(article); }}
              title={isBookmarked ? "Remove bookmark" : "Save article"}
              className={`p-1.5 rounded-md transition-colors ${
                isBookmarked
                  ? "text-amber-500 bg-amber-50 hover:bg-amber-100"
                  : "text-slate-400 hover:text-amber-500 hover:bg-amber-50"
              }`}
            >
              {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
            </button>

            {/* Read more */}
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-medium text-purple-600 hover:text-purple-800 transition-colors"
            >
              Read <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Announcements() {
  const { token } = useAuth();
  const navigate   = useNavigate();

  const [articles,      setArticles]      = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [scraping,      setScraping]      = useState(false);
  const [searchTerm,    setSearchTerm]    = useState("");
  const [selectedCat,   setSelectedCat]   = useState("all");
  const [selectedLang,  setSelectedLang]  = useState("all");
  const [selectedRegion,setSelectedRegion]= useState("all");
  const [lastUpdated,   setLastUpdated]   = useState(null);

  // Bookmarks — set of saved article URLs
  const [bookmarkedUrls, setBookmarkedUrls] = useState(new Set());

  // AI summaries — url → { loading, bullets, error }
  const [summaries, setSummaries] = useState({});

  // ── Fetch news (server-side lang/region filter) ──────────────────────────

  const fetchNews = useCallback(async (lang = "all", region = "all") => {
    setLoading(true);
    try {
      const params = { limit: 40 };
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
    const url = article.url;
    const saved = bookmarkedUrls.has(url);

    // Optimistic update
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
        await axios.post(
          `${API}/bookmarks`,
          { article },
          { headers: { Authorization: `Bearer ${token}` } },
        );
      }
    } catch {
      // Revert on error
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

    // If already loaded, toggle off
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

  const highCount = articles.filter((a) => (a.relevanceScore ?? 0) >= 70).length;

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
              onClick={() => { setScraping(true); axios.post(`${API}/admin/scrape-news`, {}, { headers: { Authorization: `Bearer ${token}` } }).then(() => fetchNews(selectedLang, selectedRegion)).catch(console.error).finally(() => setScraping(false)); }}
              disabled={scraping}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${scraping ? "animate-spin" : ""}`} />
              {scraping ? "Scraping…" : "Refresh now"}
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Log in to refresh
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
            The scraper runs automatically every day at 07:00 UTC.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article, idx) => (
            <NewsCard
              key={article.url || idx}
              article={article}
              isBookmarked={bookmarkedUrls.has(article.url)}
              onBookmark={toggleBookmark}
              summaryState={summaries[article.url]}
              onSummary={toggleSummary}
            />
          ))}
        </div>
      )}
    </div>
  );
}
