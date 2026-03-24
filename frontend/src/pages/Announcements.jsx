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
} from "lucide-react";
import { format, formatDistanceToNow, differenceInHours } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/App";

// ── Constants ─────────────────────────────────────────────────────────────────

const NEWS_CATEGORIES = [
  { value: "all",        label: "All Categories" },
  { value: "CONTRACT",   label: "Contracts" },
  { value: "REGULATORY", label: "Regulatory" },
  { value: "M&A",        label: "M&A" },
  { value: "TECHNOLOGY", label: "Technology" },
  { value: "CONFLICT",   label: "Conflict" },
  { value: "INDUSTRY",   label: "Industry" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function getCategoryStyle(category) {
  switch (category) {
    case "CONTRACT":   return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "REGULATORY": return "bg-amber-50  text-amber-700  border-amber-200";
    case "M&A":        return "bg-blue-50   text-blue-700   border-blue-200";
    case "TECHNOLOGY": return "bg-purple-50 text-purple-700 border-purple-200";
    case "CONFLICT":   return "bg-red-50    text-red-700    border-red-200";
    default:           return "bg-slate-100 text-slate-600  border-slate-200";
  }
}

function getRelevanceMeta(score) {
  if (score >= 70) return { label: "High",   color: "bg-emerald-500" };
  if (score >= 35) return { label: "Medium", color: "bg-amber-400"   };
  return               { label: "Low",    color: "bg-slate-300"   };
}

// ── Helpers ── relative time ──────────────────────────────────────────────────

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

// ── Placeholder SVG ───────────────────────────────────────────────────────────

function NewsPlaceholder({ source }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800">
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
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

// ── NewsCard ──────────────────────────────────────────────────────────────────

function SourceFavicon({ url, source }) {
  const [err, setErr] = useState(false);
  let domain = "";
  try { domain = new URL(url).hostname; } catch { /* empty */ }

  // First letter of source name as fallback avatar
  const initial = source ? source.charAt(0).toUpperCase() : "?";
  const faviconUrl = domain
    ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
    : null;

  return (
    <span className="flex items-center gap-2 min-w-0">
      <span className="w-5 h-5 rounded-md flex-shrink-0 overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
        {faviconUrl && !err ? (
          <img
            src={faviconUrl}
            alt=""
            width={20}
            height={20}
            className="w-full h-full object-contain"
            onError={() => setErr(true)}
          />
        ) : (
          <span className="text-[9px] font-bold text-slate-500 leading-none">{initial}</span>
        )}
      </span>
      <span className="text-xs text-slate-500 font-medium truncate max-w-[130px]">{source}</span>
    </span>
  );
}

function NewsCard({ article }) {
  const [imgError, setImgError] = useState(false);
  const score = article.relevanceScore ?? 0;
  const isNew = differenceInHours(new Date(), new Date(article.publishedAt)) < 4;

  // Score badge: only show for high; medium gets a subtle dot; low hidden
  const scoreBadge = score >= 70
    ? <span className="absolute top-2 left-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide">HIGH</span>
    : score >= 35
    ? <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-white" title={`Score ${score}`} />
    : null;

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden hover:shadow-lg hover:border-purple-200 transition-all flex flex-col group cursor-pointer"
    >
      {/* Cover image */}
      <div className="relative h-44 bg-slate-100 overflow-hidden flex-shrink-0">
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
          <span className="absolute top-2 right-2 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide">
            NEW
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        {/* Source row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <SourceFavicon url={article.url} source={article.source} />
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 uppercase tracking-wide ${getCategoryStyle(article.category)}`}>
            {article.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-slate-900 font-semibold text-sm leading-snug line-clamp-3 flex-1 group-hover:text-purple-700 transition-colors">
          {article.title}
        </h3>

        {/* Summary */}
        {article.summary && (
          <p className="text-slate-400 text-xs mt-2 line-clamp-2 leading-relaxed">
            {article.summary}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
          <span className="text-xs text-slate-400">
            {relativeTime(article.publishedAt)}
          </span>
          <span className="flex items-center gap-1 text-xs font-medium text-purple-600 group-hover:gap-1.5 transition-all">
            Read more <ExternalLink className="w-3 h-3" />
          </span>
        </div>
      </div>
    </a>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Announcements() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [articles, setArticles]           = useState([]);
  const [loading, setLoading]             = useState(true);
  const [scraping, setScraping]           = useState(false);
  const [searchTerm, setSearchTerm]       = useState("");
  const [selectedCat, setSelectedCat]     = useState("all");
  const [lastUpdated, setLastUpdated]     = useState(null);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await axios.get(`${API}/news`);
      setArticles(resp.data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchNews(); }, [fetchNews]);

  const triggerScrape = async () => {
    if (!token) return;
    setScraping(true);
    try {
      await axios.post(
        `${API}/admin/scrape-news`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchNews();
    } catch (err) {
      console.error("Scrape error:", err);
    } finally {
      setScraping(false);
    }
  };

  // Client-side filter
  const filtered = articles.filter((a) => {
    const matchCat = selectedCat === "all" || a.category === selectedCat;
    const term = searchTerm.toLowerCase();
    const matchSearch =
      !term ||
      a.title.toLowerCase().includes(term) ||
      (a.summary && a.summary.toLowerCase().includes(term)) ||
      a.source.toLowerCase().includes(term);
    return matchCat && matchSearch;
  });

  // Stats for header bar
  const highCount = articles.filter((a) => (a.relevanceScore ?? 0) >= 70).length;

  return (
    <div data-testid="announcements-page" className="space-y-6 animate-fade-in">

      {/* ── Header ── */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">
            Live News Feed
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Defense industry news — top 15 by relevance score, last 24 h
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Stats pill */}
          {articles.length > 0 && (
            <div className="flex items-center gap-2 text-xs bg-white border border-slate-200 rounded-lg px-3 py-2">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              {highCount > 0 && <span className="text-emerald-700 font-semibold">{highCount} high priority</span>}
              {highCount > 0 && <span className="text-slate-300">·</span>}
              <span className="text-slate-500">{articles.length} articles</span>
            </div>
          )}

          {/* Last updated */}
          {lastUpdated && (
            <span className="text-xs text-slate-400">
              Updated {format(lastUpdated, "HH:mm")}
            </span>
          )}

          {/* Manual scrape trigger — always visible; redirects to login if not authed */}
          {token ? (
            <button
              onClick={triggerScrape}
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
              title="Log in to trigger a manual scrape"
            >
              <LogIn className="w-4 h-4" />
              Log in to refresh
            </button>
          )}
        </div>
      </div>

      {/* ── Filters ── */}
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
        <Select value={selectedCat} onValueChange={setSelectedCat}>
          <SelectTrigger className="w-full sm:w-52 bg-white border-slate-200 text-slate-700">
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
            <NewsCard key={article.url || idx} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
