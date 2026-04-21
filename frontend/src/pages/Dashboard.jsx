import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import axios from "axios";
import { API, useAuth, useT } from "@/App";
import { getClearbitUrl } from "@/lib/companyLogos";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Building2,
  Newspaper,
  Handshake,
  Globe,
  ArrowRight,
  Clock,
  Database,
  Zap,
  Info,
  Settings,
  RefreshCw,
  ExternalLink,
  Search,
  X,
} from "lucide-react";
import CompanyProfileSheet from "@/components/CompanyProfileSheet";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const COLORS = ['#7E22CE', '#A855F7', '#10B981', '#F59E0B', '#3B82F6', '#06B6D4', '#EC4899'];

const AVATAR_COLORS = [
  "from-purple-600 to-purple-800", "from-blue-600 to-blue-800",
  "from-emerald-600 to-emerald-800", "from-amber-600 to-amber-800",
  "from-rose-600 to-rose-800", "from-indigo-600 to-indigo-800",
  "from-teal-600 to-teal-800", "from-orange-600 to-orange-800",
];
function avatarColor(name = "") {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffff;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}
function initials(name = "") {
  return name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}
function CompanyLogoCell({ name, url }) {
  const [failed, setFailed] = useState(false);
  if (!url || failed) {
    return (
      <div className={`w-8 h-8 bg-gradient-to-br ${avatarColor(name)} rounded-lg flex items-center justify-center shrink-0`}>
        <span className="text-[10px] font-bold text-white tracking-tight">{initials(name)}</span>
      </div>
    );
  }
  return (
    <img src={url} alt={name}
      className="w-8 h-8 rounded-lg object-contain bg-white border border-slate-100 shrink-0"
      onError={() => setFailed(true)} />
  );
}

// Country code mapping for flags
const COUNTRY_FLAGS = {
  "USA": "us", "UK": "gb", "France": "fr", "Germany": "de", "Italy": "it",
  "EU": "eu", "Spain": "es", "Sweden": "se", "Norway": "no", "Israel": "il",
  "Japan": "jp", "South Korea": "kr", "India": "in", "Australia": "au",
  "Brazil": "br", "Canada": "ca", "Turkey": "tr", "UAE": "ae", "Singapore": "sg",
  "China": "cn", "Russia": "ru", "Poland": "pl", "Czech Republic": "cz",
  "Switzerland": "ch", "Netherlands": "nl", "Belgium": "be", "Finland": "fi",
  "South Africa": "za", "Saudi Arabia": "sa", "United States": "us",
  "United Kingdom": "gb"
};


// Relative time formatter (e.g. "2h ago", "yesterday", "Apr 8")
function relativeTime(dateStr) {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  if (isNaN(date)) return null;
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffH = Math.floor(diffMin / 60);
  const diffD = Math.floor(diffH / 24);
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffH < 24) return `${diffH}h ago`;
  if (diffD === 1) return "yesterday";
  if (diffD < 7) return `${diffD}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// Extract hostname from URL for favicons
function hostFromUrl(url) {
  try { return new URL(url).hostname; } catch { return null; }
}

export default function Dashboard() {
  const { user } = useAuth();
  const tBannerTitle   = useT({ en: "Database not initialized",   fr: "Base de données non initialisée" });
  const tBannerDesc    = useT({ en: "The dashboard is empty. An administrator must initialize the database to load reference data (companies, M&A, contracts, expenditures…).", fr: "Le dashboard est vide. Pour charger les données de référence (entreprises, M&A, contrats, dépenses…), un administrateur doit initialiser la base de données." });
  const tBannerAdmin   = useT({ en: "Admin → Seed",               fr: "Admin → Seed" });
  const tBannerContact = useT({ en: "Contact an admin",           fr: "Contacter un admin" });
  const [stats, setStats] = useState(null);
  const [players, setPlayers] = useState([]);
  const [recentNews, setRecentNews] = useState([]);
  const [recentMA, setRecentMA] = useState([]);
  const [expenditures, setExpenditures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // Timestamp set once at fetch time — not on every render
  const [fetchedAt, setFetchedAt] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const searchRef = useRef(null);

  // Live stock prices state
  const [livePrices, setLivePrices] = useState({});
  const [pricesRefreshedAt, setPricesRefreshedAt] = useState(null);
  const [pricesRefreshing, setPricesRefreshing] = useState(false);
  const liveIntervalRef = useRef(null);

  const fetchLivePrices = useCallback(async (currentPlayers) => {
    const tickers = (currentPlayers || players)
      .slice(0, 5)
      .map((p) => p.ticker)
      .filter(Boolean)
      .join(",");
    if (!tickers) return;
    setPricesRefreshing(true);
    try {
      const res = await axios.get(`${API}/stock-prices?tickers=${tickers}`);
      setLivePrices(res.data);
      setPricesRefreshedAt(new Date());
    } catch {
      // silently fail — keep old prices
    } finally {
      setPricesRefreshing(false);
    }
  }, [players]);

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const [statsRes, playersRes, newsRes, expendituresRes, maRes] = await Promise.all([
        axios.get(`${API}/dashboard/stats`),
        axios.get(`${API}/defense-players`),
        axios.get(`${API}/news?limit=5`),
        axios.get(`${API}/expenditures?year=2024`),
        axios.get(`${API}/ma-activities`),
      ]);
      setStats(statsRes.data);
      setPlayers(playersRes.data);
      setRecentNews(newsRes.data);
      setExpenditures(expendituresRes.data);
      setRecentMA(maRes.data);
      setFetchedAt(new Date());
      // Fetch live prices right after players load
      fetchLivePrices(playersRes.data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-refresh live prices every 60 seconds
  useEffect(() => {
    if (players.length === 0) return;
    liveIntervalRef.current = setInterval(() => fetchLivePrices(), 60000);
    return () => clearInterval(liveIntervalRef.current);
  }, [players, fetchLivePrices]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return players
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.ticker && p.ticker.toLowerCase().includes(q))
      )
      .slice(0, 6);
  }, [players, searchQuery]);

  const getFlag = (country) => {
    const code = COUNTRY_FLAGS[country];
    return code ? `https://flagcdn.com/w40/${code}.png` : null;
  };


  // "Cette semaine" — deals M&A et news des 7 derniers jours
  const weekAgo = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d;
  }, []);

  const weeklyMA = useMemo(
    () => recentMA.filter(a => new Date(a.announced_date) >= weekAgo),
    [recentMA, weekAgo]
  );
  const weeklyNews = useMemo(
    () => recentNews.filter(n => n.publishedAt && new Date(n.publishedAt) >= weekAgo),
    [recentNews, weekAgo]
  );
  const contractNews = useMemo(
    () => recentNews.filter(n => n.category === "CONTRACT"),
    [recentNews]
  );

  // Sort by publishedAt descending so the hero is always the newest article,
  // regardless of the relevance-first ordering returned by the API.
  const sortedNews = useMemo(
    () => [...recentNews].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)),
    [recentNews]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4 text-slate-500">
        <p className="font-medium">Failed to load dashboard data.</p>
        <button onClick={fetchData} className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors">Retry</button>
      </div>
    );
  }

  const topPlayers = players.slice(0, 5);
  const topExpenditures = expenditures.slice(0, 7);

  const regionData = expenditures.reduce((acc, exp) => {
    const existing = acc.find(r => r.name === exp.region);
    if (existing) {
      existing.value += exp.expenditure;
    } else {
      acc.push({ name: exp.region, value: exp.expenditure });
    }
    return acc;
  }, []).sort((a, b) => b.value - a.value);

  return (
    <div data-testid="dashboard-page" className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">
            Mission Control
          </h1>
          <p className="text-slate-500 text-sm mt-1">Global Defense Intelligence Overview</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Search bar */}
          <div className="relative" ref={searchRef}>
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100 transition-all w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search companies…"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setShowSearch(true); }}
                onFocus={() => setShowSearch(true)}
                className="flex-1 text-xs bg-transparent outline-none text-slate-700 placeholder-slate-400"
              />
              {searchQuery && (
                <button onClick={() => { setSearchQuery(""); setShowSearch(false); }} className="text-slate-400 hover:text-slate-600">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Dropdown results */}
            {showSearch && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
                {searchResults.map((company) => {
                  const flagUrl = getFlag(company.country);
                  return (
                    <button
                      key={company.id}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-purple-50 transition-colors text-left"
                      onClick={() => { setSelectedCompany(company.name); setShowSearch(false); setSearchQuery(""); }}
                    >
                      <CompanyLogoCell name={company.name} url={getClearbitUrl(company.name)} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">{company.name}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          {flagUrl && <img src={flagUrl} alt={company.country} className="w-3.5 h-2.5 object-cover rounded-sm" />}
                          <span className="text-xs text-slate-500">{company.country}</span>
                        </div>
                      </div>
                      {company.ticker && (
                        <span className="font-mono text-xs text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded shrink-0">
                          {company.ticker}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* No results hint */}
            {showSearch && searchQuery.trim() && searchResults.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 px-4 py-3 text-xs text-slate-500">
                No company found for "<span className="font-medium text-slate-700">{searchQuery}</span>"
              </div>
            )}
          </div>

          {/* Timestamp badge */}
          <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 rounded-lg px-3 py-2">
            <Clock className="w-3.5 h-3.5" />
            <span>
              {fetchedAt
                ? `Data loaded at ${fetchedAt.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`
                : "Loading…"}
            </span>
            <span className="text-slate-300">|</span>
            <Database className="w-3.5 h-3.5" />
            <span>SIPRI · Yahoo Finance · Defense press</span>
          </div>
        </div>
      </div>

      {/* Onboarding banner — shown when DB is empty */}
      {stats?.players_count === 0 && (
        <div className="flex items-start gap-4 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-semibold text-amber-800">{tBannerTitle}</p>
            <p className="text-xs text-amber-700">{tBannerDesc}</p>
          </div>
          {user?.role === "admin" ? (
            <Link
              to="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium rounded-lg transition-colors whitespace-nowrap"
            >
              <Settings className="w-3.5 h-3.5" />
              {tBannerAdmin}
            </Link>
          ) : (
            <span className="text-xs text-amber-600 whitespace-nowrap">{tBannerContact}</span>
          )}
        </div>
      )}

      {/* This week summary strip */}
      <div className="bg-gradient-to-r from-purple-50 to-slate-50 border border-purple-100 rounded-xl px-5 py-4 flex flex-wrap gap-6 items-center">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-purple-600" />
          <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">This week</span>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-1.5">
            <span className={`text-sm font-mono font-bold ${weeklyMA.length > 0 ? "text-purple-700" : "text-slate-400"}`}>
              {weeklyMA.length}
            </span>
            <span className="text-xs text-slate-500">M&amp;A deal{weeklyMA.length !== 1 ? "s" : ""}</span>
            {weeklyMA.length > 0 && (
              <Link to="/ma-activity" className="text-[10px] text-purple-500 hover:text-purple-700 font-medium ml-1">→</Link>
            )}
          </div>
          <div className="w-px h-4 bg-slate-200 self-center" />
          <div className="flex items-center gap-1.5">
            <span className={`text-sm font-mono font-bold ${contractNews.length > 0 ? "text-emerald-700" : "text-slate-400"}`}>
              {contractNews.length}
            </span>
            <span className="text-xs text-slate-500">contract {contractNews.length !== 1 ? "updates" : "update"}</span>
          </div>
          <div className="w-px h-4 bg-slate-200 self-center" />
          <div className="flex items-center gap-1.5">
            <span className={`text-sm font-mono font-bold ${recentNews.length > 0 ? "text-slate-700" : "text-slate-400"}`}>
              {recentNews.length}
            </span>
            <span className="text-xs text-slate-500">indexed news</span>
          </div>
        </div>
        {weeklyMA.length === 0 && weeklyNews.length === 0 && (
          <span className="text-xs text-slate-400 ml-auto">No notable activity detected this week</span>
        )}
      </div>

      {/* Key Metrics — cliquables */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/market-data">
          <MetricCard
            label="TOTAL MARKET CAP"
            value={`$${(stats?.total_market_cap || 0).toFixed(1)}B`}
            icon={DollarSign}
            subtext="Aggregated market cap"
            testId="metric-market-cap"
          />
        </Link>
        <Link to="/expenditures">
          <MetricCard
            label="GLOBAL EXPENDITURE"
            value={`$${(stats?.total_expenditure || 0).toFixed(0)}B`}
            subtext={`Source SIPRI · FY ${stats?.expenditure_year || 2024}`}
            icon={Globe}
            testId="metric-expenditure"
          />
        </Link>
        <Link to="/market-data">
          <MetricCard
            label="TRACKED PLAYERS"
            value={stats?.players_count || 0}
            subtext="Defense contractors & industry"
            icon={Building2}
            testId="metric-players"
          />
        </Link>
        <Link to="/ma-activity">
          <MetricCard
            label="M&A TRACKED"
            value={stats?.ma_count || 0}
            subtext="Deals in database"
            icon={Handshake}
            testId="metric-ma"
          />
        </Link>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Market Leaders */}
        <Card className="lg:col-span-2 bg-white border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CardTitle className="font-heading text-lg text-slate-900">Market Leaders</CardTitle>
                {/* LIVE badge + refresh time */}
                <div className="flex items-center gap-1.5">
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full">
                    <span className={`w-1.5 h-1.5 rounded-full bg-emerald-500 ${pricesRefreshing ? "animate-pulse" : "animate-ping"}`} style={{ animationDuration: "2s" }} />
                    LIVE
                  </span>
                  {pricesRefreshedAt && (
                    <span className="text-[10px] text-slate-400">
                      {pricesRefreshing ? (
                        <RefreshCw className="w-2.5 h-2.5 animate-spin inline" />
                      ) : (
                        `upd. ${pricesRefreshedAt.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`
                      )}
                    </span>
                  )}
                </div>
              </div>
              <Link
                to="/market-data"
                className="text-xs text-purple-600 hover:text-purple-700 flex items-center gap-1 font-medium"
                data-testid="view-all-market"
              >
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full" data-testid="market-leaders-table">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/30">
                    <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Company</th>
                    <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Ticker</th>
                    <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Price</th>
                    <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Since Open</th>
                  </tr>
                </thead>
                <tbody>
                  {topPlayers.map((player, idx) => {
                    const flagUrl = getFlag(player.country);
                    const live = livePrices[player.ticker];
                    const price = live?.price ?? player.stock_price;
                    const change = live?.change_since_open ?? live?.change_percent ?? player.change_percent;
                    const isLive = !!live;
                    return (
                      <tr key={player.id} className="border-b border-slate-100 hover:bg-purple-50/30 transition-colors cursor-pointer" onClick={() => setSelectedCompany(player.name)}>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 bg-slate-100 rounded-lg flex items-center justify-center text-xs font-mono text-slate-500 font-medium">
                              {idx + 1}
                            </span>
                            <CompanyLogoCell name={player.name} url={getClearbitUrl(player.name)} />
                            <div>
                              <p className="text-slate-900 font-medium text-sm">{player.name}</p>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                {flagUrl && (
                                  <img src={flagUrl} alt={player.country} className="w-4 h-3 object-cover rounded-sm" />
                                )}
                                <span className="text-xs text-slate-500">{player.country}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <span className="font-mono text-sm text-purple-700 font-medium bg-purple-50 px-2 py-0.5 rounded">
                            {player.ticker}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <span className="font-mono text-sm text-slate-900 font-semibold">
                              ${price != null ? Number(price).toFixed(2) : "—"}
                            </span>
                            {isLive && (
                              <span className="w-1 h-1 rounded-full bg-emerald-500 shrink-0" title="Live price" />
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <span className={`font-mono text-sm flex items-center justify-end gap-1 ${
                            change >= 0 ? 'text-emerald-600' : 'text-rose-600'
                          }`}>
                            {change >= 0 ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            {change >= 0 ? '+' : ''}{Number(change).toFixed(2)}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Regional Distribution */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50">
            <CardTitle className="font-heading text-lg text-slate-900">Regional Spending</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[200px]" data-testid="regional-chart">
              <ResponsiveContainer width="100%" height="100%" minWidth={200}>
                <PieChart>
                  <Pie
                    data={regionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {regionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-lg">
                            <p className="text-slate-900 text-sm font-medium">{payload[0].name}</p>
                            <p className="font-mono text-purple-700 font-semibold">${payload[0].value.toFixed(1)}B</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {regionData.slice(0, 4).map((region, idx) => (
                <div key={region.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: COLORS[idx] }}
                    />
                    <span className="text-slate-600">{region.name}</span>
                  </div>
                  <span className="font-mono text-slate-900 font-medium">${region.value.toFixed(1)}B</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Expenditures Chart */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading text-lg text-slate-900">Top Defense Budgets</CardTitle>
              <Link 
                to="/expenditures" 
                className="text-xs text-purple-600 hover:text-purple-700 flex items-center gap-1 font-medium"
              >
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[250px]" data-testid="expenditure-chart">
              <ResponsiveContainer width="100%" height="100%" minWidth={200}>
                <BarChart data={topExpenditures} layout="vertical">
                  <XAxis 
                    type="number" 
                    tick={{ fill: '#64748B', fontSize: 11 }} 
                    axisLine={false} 
                    tickLine={false}
                    tickFormatter={(v) => `$${v}B`}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="country_code" 
                    tick={{ fill: '#64748B', fontSize: 11 }} 
                    axisLine={false} 
                    tickLine={false}
                    width={35}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-lg">
                            <p className="text-slate-900 text-sm font-medium">{payload[0].payload.country}</p>
                            <p className="font-mono text-purple-700 font-semibold">${payload[0].value}B</p>
                            <p className="text-xs text-slate-500">{payload[0].payload.gdp_percent}% of GDP</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="expenditure" fill="#7E22CE" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Intel */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading text-lg text-slate-900">Recent Intel</CardTitle>
              <Link
                to="/announcements"
                className="text-xs text-purple-600 hover:text-purple-700 flex items-center gap-1 font-medium"
              >
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0" data-testid="recent-announcements">
            {sortedNews.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">No recent news</div>
            ) : (
              <>
                {/* Hero article — most recent item */}
                {(() => {
                  const item = sortedNews[0];
                  const host = hostFromUrl(item.url);
                  const ago = relativeTime(item.publishedAt);
                  return (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group relative overflow-hidden"
                    >
                      {/* Image or gradient fallback */}
                      <div className="relative h-44 bg-slate-100 overflow-hidden">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => { e.target.style.display = "none"; }}
                          />
                        ) : (
                          <div className={`w-full h-full flex items-center justify-center ${
                            item.category === 'CONTRACT'    ? 'bg-emerald-900' :
                            item.category === 'TECHNOLOGY'  ? 'bg-purple-900'  :
                            item.category === 'CONFLICT'    ? 'bg-rose-900'    :
                            item.category === 'POLICY'      ? 'bg-amber-900'   :
                            item.category === 'GEOPOLITICS' ? 'bg-sky-900'     :
                            item.category === 'M&A'         ? 'bg-blue-900'    :
                            'bg-slate-800'
                          }`}>
                            <Newspaper className="w-10 h-10 text-white/20" />
                          </div>
                        )}
                        {/* Dark gradient overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        {/* Category badge top-left */}
                        <div className="absolute top-3 left-3">
                          <IntelCategoryBadge category={item.category} />
                        </div>
                        {item.source_count > 1 && (
                          <div className="absolute top-3 right-3">
                            <span className="text-xs bg-orange-500 text-white font-semibold px-2 py-0.5 rounded-full">
                              🔥 {item.source_count} sources
                            </span>
                          </div>
                        )}
                        {/* Title overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p className="text-white font-semibold text-sm leading-snug line-clamp-3 group-hover:text-purple-200 transition-colors">
                            {item.title}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            {host && (
                              <img
                                src={`https://www.google.com/s2/favicons?domain=${host}&sz=16`}
                                alt=""
                                className="w-3.5 h-3.5 rounded-sm opacity-80"
                                onError={(e) => { e.target.style.display = "none"; }}
                              />
                            )}
                            <span className="text-white/70 text-xs">{item.source}</span>
                            {ago && <span className="text-white/50 text-xs">· {ago}</span>}
                            <ExternalLink className="w-3 h-3 text-white/40 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </div>
                    </a>
                  );
                })()}

                {/* Compact rows — remaining articles */}
                <div className="divide-y divide-slate-100">
                  {sortedNews.slice(1).map((item, idx) => {
                    const host = hostFromUrl(item.url);
                    const ago = relativeTime(item.publishedAt);
                    return (
                      <a
                        key={item.url || idx}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 p-3 hover:bg-purple-50/40 transition-colors group"
                      >
                        {/* Thumbnail or colored placeholder */}
                        <div className="w-16 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-100 relative">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt=""
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              onError={(e) => { e.target.parentNode.classList.add("flex", "items-center", "justify-center"); e.target.style.display = "none"; }}
                            />
                          ) : (
                            <div className={`w-full h-full flex items-center justify-center ${
                              item.category === 'CONTRACT'    ? 'bg-emerald-50' :
                              item.category === 'TECHNOLOGY'  ? 'bg-purple-50'  :
                              item.category === 'CONFLICT'    ? 'bg-rose-50'    :
                              item.category === 'POLICY'      ? 'bg-amber-50'   :
                              item.category === 'GEOPOLITICS' ? 'bg-sky-50'     :
                              item.category === 'M&A'         ? 'bg-blue-50'    :
                              'bg-slate-50'
                            }`}>
                              <Newspaper className={`w-5 h-5 ${
                                item.category === 'CONTRACT'    ? 'text-emerald-400' :
                                item.category === 'TECHNOLOGY'  ? 'text-purple-400'  :
                                item.category === 'CONFLICT'    ? 'text-rose-400'    :
                                item.category === 'POLICY'      ? 'text-amber-400'   :
                                item.category === 'GEOPOLITICS' ? 'text-sky-400'     :
                                item.category === 'M&A'         ? 'text-blue-400'    :
                                'text-slate-300'
                              }`} />
                            </div>
                          )}
                        </div>

                        {/* Text content */}
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-800 text-xs font-medium leading-snug line-clamp-2 group-hover:text-purple-700 transition-colors">
                            {item.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                            <IntelCategoryBadge category={item.category} small />
                            <div className="flex items-center gap-1">
                              {host && (
                                <img
                                  src={`https://www.google.com/s2/favicons?domain=${host}&sz=16`}
                                  alt=""
                                  className="w-3 h-3 rounded-sm"
                                  onError={(e) => { e.target.style.display = "none"; }}
                                />
                              )}
                              <span className="text-[10px] text-slate-500">{item.source}</span>
                            </div>
                            {ago && <span className="text-[10px] text-slate-400">{ago}</span>}
                            {item.source_count > 1 && (
                              <span className="text-[10px] text-orange-500 font-medium">🔥 {item.source_count}</span>
                            )}
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Company profile sheet — opened from search or market leaders row */}
      {selectedCompany && (
        <CompanyProfileSheet
          name={selectedCompany}
          onClose={() => setSelectedCompany(null)}
        />
      )}
    </div>
  );
}

function IntelCategoryBadge({ category, small = false }) {
  const styles = {
    CONTRACT:    "bg-emerald-50 text-emerald-700 border-emerald-200",
    TECHNOLOGY:  "bg-purple-50  text-purple-700  border-purple-200",
    CONFLICT:    "bg-red-50     text-red-700     border-red-200",
    POLICY:      "bg-amber-50   text-amber-700   border-amber-200",
    GEOPOLITICS: "bg-sky-50     text-sky-700     border-sky-200",
    "M&A":       "bg-blue-50    text-blue-700    border-blue-200",
  };
  const cls = styles[category] || "bg-slate-50 text-slate-600 border-slate-200";
  return (
    <span className={`border font-medium rounded-full ${small ? "text-[9px] px-1.5 py-px" : "text-xs px-2 py-0.5"} ${cls}`}>
      {category || "INDUSTRY"}
    </span>
  );
}

function MetricCard({ label, value, subtext, icon: Icon, testId }) {
  return (
    <Card
      className="bg-white border-slate-200 shadow-sm hover:shadow-lg hover:border-purple-200 transition-all duration-300 cursor-pointer"
      data-testid={testId}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-2">{value}</p>
            {subtext && <p className="text-xs text-slate-500 mt-1">{subtext}</p>}
          </div>
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
            <Icon className="w-5 h-5 text-purple-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
