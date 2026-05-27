import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { API } from "@/App";
import { Input } from "@/components/ui/input";
import {
  Search,
  Rss,
  RefreshCw,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { differenceInHours } from "date-fns";
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

const ARTICLES_PER_PAGE = 12;

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
  EARNINGS: [
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
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
    const h = differenceInHours(new Date(), new Date(dateStr));
    if (h < 1)  return "Just now";
    if (h < 24) return `${h}h ago`;
    if (h < 48) return "Yesterday";
    const d = Math.floor(h / 24);
    return `${d}d ago`;
  } catch { return ""; }
}

function getFallbackImage(article) {
  const pool = CATEGORY_STOCK_PHOTOS[article.category] || CATEGORY_STOCK_PHOTOS.TECHNOLOGY;
  const idx  = Math.abs((article.title?.charCodeAt(0) || 65) + (article.title?.length || 0)) % pool.length;
  return pool[idx];
}

// ── ArticleCard ────────────────────────────────────────────────────────────────

function ArticleCard({ article, isBookmarked, onBookmark }) {
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

  const displayImage = (!imgError && (article.image || localImage)) || getFallbackImage(article);
  const isNew        = differenceInHours(new Date(), new Date(article.publishedAt)) < 4;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200 group flex flex-col">

      {/* Image */}
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative overflow-hidden bg-slate-100"
        style={{ aspectRatio: "16/9" }}
      >
        <img
          src={displayImage}
          alt={article.title}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* NEW badge */}
        {isNew && (
          <span className="absolute top-2 left-2 bg-slate-900 text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider">
            NEW
          </span>
        )}

        {/* Bookmark button */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onBookmark(article); }}
          className={`absolute top-2 right-2 p-1.5 rounded-lg backdrop-blur-sm transition-all ${
            isBookmarked
              ? "bg-amber-500/90 text-white"
              : "bg-white/80 text-slate-500 opacity-0 group-hover:opacity-100 hover:text-amber-500"
          }`}
        >
          {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
        </button>
      </a>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider w-fit ${getCategoryStyle(article.category)}`}>
          {article.category || "INDUSTRY"}
        </span>

        <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex-1">
          <h3 className="font-bold text-[14px] leading-snug line-clamp-2 text-slate-800 group-hover:text-blue-800 transition-colors">
            {article.title}
          </h3>
        </a>

        {article.summary && (
          <p className="text-[12px] text-slate-400 leading-snug line-clamp-2">
            {article.summary}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-2 gap-2 border-t border-slate-50">
          <span className="text-[11px] text-slate-500 font-medium truncate">
            {article.realSource || article.source}
          </span>
          <span className="text-[11px] text-slate-400 flex-shrink-0">
            {relativeTime(article.publishedAt)}
          </span>
        </div>
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
              <span className={`ml-1.5 text-[10px] font-bold ${selected === cat.value ? "text-white/60" : "text-slate-400"}`}>
                {count}
              </span>
            )}
          </button>
        );
      })}
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
  const { token }  = useAuth();
  const navigate   = useNavigate();

  const [articles,       setArticles]       = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [scraping,       setScraping]       = useState(false);
  const [searchTerm,     setSearchTerm]     = useState("");
  const [selectedCat,    setSelectedCat]    = useState("all");
  const [currentPage,    setCurrentPage]    = useState(1);
  const [bookmarkedUrls, setBookmarkedUrls] = useState(new Set());

  // ── Fetch ─────────────────────────────────────────────────────────────────

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await axios.get(`${API}/news`, { params: { limit: 300, hours: 168 } });
      setArticles(resp.data);
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchNews(); }, [fetchNews]);

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

  // ── Filter & pagination ───────────────────────────────────────────────────

  const filtered = useMemo(() => articles.filter((a) => {
    const matchCat    = selectedCat === "all" || a.category === selectedCat;
    const term        = searchTerm.toLowerCase();
    const matchSearch = !term
      || a.title.toLowerCase().includes(term)
      || (a.summary && a.summary.toLowerCase().includes(term))
      || a.source.toLowerCase().includes(term)
      || (a.company && a.company.toLowerCase().includes(term));
    return matchCat && matchSearch;
  }), [articles, selectedCat, searchTerm]);

  const categoryCounts = useMemo(() => {
    const counts = { all: articles.length };
    NEWS_CATEGORIES.slice(1).forEach(({ value }) => {
      counts[value] = articles.filter((a) => a.category === value).length;
    });
    return counts;
  }, [articles]);

  useEffect(() => { setCurrentPage(1); }, [searchTerm, selectedCat]);

  const totalPages   = Math.max(1, Math.ceil(filtered.length / ARTICLES_PER_PAGE));
  const pageArticles = filtered.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  const handlePageChange = (p) => {
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div data-testid="announcements-page" className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">News</h1>
          <p className="text-slate-500 text-sm mt-1">
            {articles.length > 0
              ? `${filtered.length} article${filtered.length !== 1 ? "s" : ""}${filtered.length < articles.length ? ` of ${articles.length}` : ""} · page ${currentPage} of ${totalPages}`
              : "Defense intelligence from specialty & mainstream media"}
          </p>
        </div>

        {token ? (
          <button
            onClick={() => {
              setScraping(true);
              axios
                .post(`${API}/admin/scrape-news`, {}, { headers: { Authorization: `Bearer ${token}` } })
                .then(() => fetchNews())
                .catch(console.error)
                .finally(() => setScraping(false));
            }}
            disabled={scraping}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50 self-start"
          >
            <RefreshCw className={`w-4 h-4 ${scraping ? "animate-spin" : ""}`} />
            {scraping ? "Refreshing…" : "Refresh Feed"}
          </button>
        ) : (
          <button
            onClick={fetchNews}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50 self-start"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh Feed
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          placeholder="Search by title, source or keyword…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
        />
      </div>

      {/* Topic pills */}
      <CategoryPills
        selected={selectedCat}
        onSelect={(v) => { setSelectedCat(v); setCurrentPage(1); }}
        counts={categoryCounts}
      />

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
              ? "No articles yet — trigger a refresh above"
              : "No articles match your search"}
          </p>
          <p className="text-sm mt-1 text-slate-400">The scraper runs automatically four times daily.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pageArticles.map((a, i) => (
              <ArticleCard
                key={a.url || i}
                article={a}
                isBookmarked={bookmarkedUrls.has(a.url)}
                onBookmark={toggleBookmark}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
