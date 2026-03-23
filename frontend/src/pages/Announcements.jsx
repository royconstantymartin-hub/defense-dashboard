import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "@/App";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Newspaper,
  Calendar,
  ExternalLink,
  Clock,
  Database,
  Filter,
  Globe,
  Rss,
} from "lucide-react";
import { format } from "date-fns";

// ── Internal Announcements ────────────────────────────────────────────────────

const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "contract", label: "Contracts" },
  { value: "partnership", label: "Partnerships" },
  { value: "product_launch", label: "Product Launch" },
  { value: "regulatory", label: "Regulatory" },
];

const SOURCE_LOGOS = {
  "Defense News": "defensenews.com",
  "Jane's Defence": "janes.com",
  "Breaking Defense": "breakingdefense.com",
  "Opex News": "opex360.com",
  "Defense Post": "thedefensepost.com",
  "Naval News": "navalnews.com",
  "Les Echos": "lesechos.fr",
  "Reuters": "reuters.com",
  "Aviation Week": "aviationweek.com",
  "Bloomberg": "bloomberg.com",
};

function getCategoryStyle(category) {
  switch (category) {
    case "contract":      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "product_launch":return "bg-purple-50 text-purple-700 border-purple-200";
    case "regulatory":    return "bg-amber-50 text-amber-700 border-amber-200";
    case "partnership":   return "bg-blue-50 text-blue-700 border-blue-200";
    default:              return "bg-slate-100 text-slate-600 border-slate-200";
  }
}

function getSourceLogo(source) {
  const domain = SOURCE_LOGOS[source];
  return domain ? `https://logo.clearbit.com/${domain}` : null;
}

// ── Live News Feed ────────────────────────────────────────────────────────────

function getNewsCategoryStyle(category) {
  switch (category) {
    case "CONTRACT":   return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "REGULATORY": return "bg-amber-50 text-amber-700 border-amber-200";
    case "M&A":        return "bg-blue-50 text-blue-700 border-blue-200";
    case "TECHNOLOGY": return "bg-purple-50 text-purple-700 border-purple-200";
    case "CONFLICT":   return "bg-red-50 text-red-700 border-red-200";
    default:           return "bg-slate-100 text-slate-600 border-slate-200";
  }
}

function NewsPlaceholder({ source }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800">
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="25,7 28,3 31,7 30,7 30,20 26,20 26,7"
          fill="#4f46e5"
          opacity="0.9"
        />
        <rect x="20" y="20" width="16" height="16" rx="1" fill="#4f46e5" opacity="0.7" />
        <circle cx="28" cy="42" r="6" fill="none" stroke="#4f46e5" strokeWidth="2" opacity="0.6" />
        <line x1="28" y1="36" x2="28" y2="48" stroke="#4f46e5" strokeWidth="1.5" opacity="0.6" />
        <line x1="22" y1="42" x2="34" y2="42" stroke="#4f46e5" strokeWidth="1.5" opacity="0.6" />
      </svg>
      <span className="text-slate-400 text-xs mt-2 font-medium">{source}</span>
    </div>
  );
}

function NewsCard({ article }) {
  const [imgError, setImgError] = useState(false);

  let dateLabel = "";
  try {
    dateLabel = format(new Date(article.publishedAt), "MMM dd, yyyy");
  } catch {
    dateLabel = "";
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      {/* Cover image */}
      <div className="relative h-44 bg-slate-100 overflow-hidden flex-shrink-0">
        {!imgError && article.image ? (
          <img
            src={article.image}
            alt={article.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <NewsPlaceholder source={article.source} />
        )}
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col flex-1">
        {/* Badges */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getNewsCategoryStyle(
              article.category
            )}`}
          >
            {article.category}
          </span>
          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            {article.source}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-slate-900 font-medium text-sm leading-snug line-clamp-2 flex-1">
          {article.title}
        </h3>

        {/* Summary */}
        {article.summary && (
          <p className="text-slate-500 text-xs mt-2 line-clamp-2 leading-relaxed">
            {article.summary}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <Calendar className="w-3 h-3" />
            {dateLabel}
          </span>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-purple-600 hover:text-purple-700 transition-colors"
          >
            Read more
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Page component ────────────────────────────────────────────────────────────

export default function Announcements() {
  // Internal announcements state
  const [announcements, setAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  // Live news feed state
  const [activeTab, setActiveTab] = useState("internal");
  const [newsArticles, setNewsArticles] = useState([]);
  const [newsLoading, setNewsLoading] = useState(false);

  // Fetch internal announcements
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(`${API}/announcements`);
        setAnnouncements(response.data);
        setFilteredAnnouncements(response.data);
        if (response.data.length > 0) {
          setSelectedAnnouncement(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  // Fetch live news when tab is activated
  useEffect(() => {
    if (activeTab !== "live") return;
    const fetchNews = async () => {
      setNewsLoading(true);
      try {
        const response = await axios.get(`${API}/news`);
        setNewsArticles(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setNewsLoading(false);
      }
    };
    fetchNews();
  }, [activeTab]);

  // Client-side filter for internal announcements
  useEffect(() => {
    let filtered = announcements;
    if (selectedCategory !== "all") {
      filtered = filtered.filter((a) => a.category === selectedCategory);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(term) ||
          a.content.toLowerCase().includes(term) ||
          (a.company && a.company.toLowerCase().includes(term))
      );
    }
    setFilteredAnnouncements(filtered);
  }, [searchTerm, selectedCategory, announcements]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div data-testid="announcements-page" className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">
            Announcements
          </h1>
          <p className="text-slate-500 text-sm mt-1">Defense Industry News &amp; Updates</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Source count pill */}
          <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 rounded-lg px-3 py-2">
            <Clock className="w-3.5 h-3.5" />
            <span>Real-time updates</span>
            <span className="text-slate-300">|</span>
            <Database className="w-3.5 h-3.5" />
            <span>12 sources</span>
          </div>

          {/* Tab toggle */}
          <div className="flex rounded-lg border border-slate-200 overflow-hidden">
            <button
              onClick={() => setActiveTab("internal")}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "internal"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Newspaper className="w-4 h-4" />
              Internal
            </button>
            <button
              onClick={() => setActiveTab("live")}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors border-l border-slate-200 ${
                activeTab === "live"
                  ? "bg-purple-600 text-white border-l-purple-600"
                  : "bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Globe className="w-4 h-4" />
              Live News Feed
            </button>
          </div>
        </div>
      </div>

      {/* ── Live News Feed ── */}
      {activeTab === "live" && (
        <div>
          {newsLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full" />
            </div>
          ) : newsArticles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500 bg-white rounded-xl border border-slate-200">
              <Rss className="w-10 h-10 mb-3 text-slate-300" />
              <p className="font-medium">No live articles yet</p>
              <p className="text-sm mt-1 text-slate-400">
                The scraper runs daily at 07:00 UTC, or trigger it manually from Admin.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsArticles.map((article, idx) => (
                <NewsCard key={article.url || idx} article={article} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Internal Announcements ── */}
      {activeTab === "internal" && (
        <>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
                data-testid="search-announcements"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger
                className="w-full sm:w-48 bg-white border-slate-200 text-slate-700"
                data-testid="category-filter"
              >
                <Filter className="w-4 h-4 mr-2 text-slate-400" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                {CATEGORIES.map((cat) => (
                  <SelectItem
                    key={cat.value}
                    value={cat.value}
                    className="text-slate-700 focus:bg-purple-50"
                  >
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Master-Detail Layout */}
          <div className="grid lg:grid-cols-5 gap-6">
            {/* List */}
            <div className="lg:col-span-2 space-y-2" data-testid="announcements-list">
              {filteredAnnouncements.map((announcement) => (
                <div
                  key={announcement.id}
                  onClick={() => setSelectedAnnouncement(announcement)}
                  className={`
                    p-4 border rounded-xl cursor-pointer transition-all duration-200
                    ${
                      selectedAnnouncement?.id === announcement.id
                        ? "bg-purple-50 border-purple-200 shadow-sm"
                        : "bg-white border-slate-200 hover:border-purple-200 hover:shadow-sm"
                    }
                  `}
                  data-testid={`announcement-item-${announcement.id}`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        selectedAnnouncement?.id === announcement.id
                          ? "bg-purple-100"
                          : "bg-slate-100"
                      }`}
                    >
                      <Newspaper
                        className={`w-5 h-5 ${
                          selectedAnnouncement?.id === announcement.id
                            ? "text-purple-600"
                            : "text-slate-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-900 text-sm font-medium line-clamp-2">
                        {announcement.title}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getCategoryStyle(
                            announcement.category
                          )}`}
                        >
                          {announcement.category.replace("_", " ").toUpperCase()}
                        </span>
                        <span className="text-xs text-slate-500">{announcement.source}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {filteredAnnouncements.length === 0 && (
                <div className="text-center py-12 text-slate-500 bg-white rounded-lg border border-slate-200">
                  No announcements found
                </div>
              )}
            </div>

            {/* Detail View */}
            <Card
              className="lg:col-span-3 bg-white border-slate-200 shadow-sm"
              data-testid="announcement-detail"
            >
              {selectedAnnouncement ? (
                <>
                  <CardHeader className="border-b border-slate-100 bg-slate-50/50">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full border ${getCategoryStyle(
                            selectedAnnouncement.category
                          )}`}
                        >
                          {selectedAnnouncement.category.replace("_", " ").toUpperCase()}
                        </span>
                        {selectedAnnouncement.company && (
                          <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                            {selectedAnnouncement.company}
                          </span>
                        )}
                      </div>
                      <CardTitle className="font-heading text-xl text-slate-900">
                        {selectedAnnouncement.title}
                      </CardTitle>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(selectedAnnouncement.date), "MMM dd, yyyy")}
                        </span>
                        <span className="flex items-center gap-1.5">
                          {getSourceLogo(selectedAnnouncement.source) && (
                            <img
                              src={getSourceLogo(selectedAnnouncement.source)}
                              alt={selectedAnnouncement.source}
                              className="w-4 h-4 rounded object-contain"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          )}
                          <ExternalLink className="w-4 h-4" />
                          {selectedAnnouncement.source}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-slate-600 leading-relaxed">
                      {selectedAnnouncement.content}
                    </p>
                  </CardContent>
                </>
              ) : (
                <CardContent className="flex items-center justify-center h-64 text-slate-500">
                  Select an announcement to view details
                </CardContent>
              )}
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
