import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
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
import { Search, TrendingUp, ArrowUpDown, ArrowDown, ArrowUp, Building2, Clock, Database, RefreshCw, X, UserCircle } from "lucide-react";
import CompanyProfileSheet from "@/components/CompanyProfileSheet";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

const COUNTRIES = [
  { value: "all", label: "All Countries" },
  { value: "USA", label: "🇺🇸 United States" },
  { value: "UK", label: "🇬🇧 United Kingdom" },
  { value: "France", label: "🇫🇷 France" },
  { value: "Germany", label: "🇩🇪 Germany" },
  { value: "Italy", label: "🇮🇹 Italy" },
  { value: "EU", label: "🇪🇺 European Union" },
  { value: "Israel", label: "🇮🇱 Israel" },
  { value: "Japan", label: "🇯🇵 Japan" },
  { value: "South Korea", label: "🇰🇷 South Korea" },
  { value: "Turkey", label: "🇹🇷 Turkey" },
  { value: "India", label: "🇮🇳 India" },
];

const SORT_OPTIONS = [
  { value: "market_cap_desc", label: "Market Cap (High to Low)" },
  { value: "market_cap_asc", label: "Market Cap (Low to High)" },
  { value: "change_desc", label: "Change % (Best)" },
  { value: "change_asc", label: "Change % (Worst)" },
  { value: "revenue_desc", label: "Revenue (High to Low)" },
  { value: "name_asc", label: "Name (A-Z)" },
];

// Canonical segment labels for the filter
// Values must match strings that appear in player.specializations arrays
const SEGMENTS = [
  { value: "all",        label: "Tous les segments" },
  { value: "aerospace",  label: "Aérospatial" },
  { value: "naval",      label: "Naval" },
  { value: "land",       label: "Terrestre" },
  { value: "missiles",   label: "Missiles" },
  { value: "cyber",      label: "Cyber / EW" },
  { value: "space",      label: "Espace" },
  { value: "services",   label: "Services / Conseil" },
  { value: "logistics",  label: "Logistique / MRO" },
  { value: "electronics","label": "Électronique défense" },
];

const COUNTRY_FLAGS = {
  "USA": "us", "UK": "gb", "France": "fr", "Germany": "de", "Italy": "it",
  "EU": "eu", "Spain": "es", "Sweden": "se", "Norway": "no", "Israel": "il",
  "Japan": "jp", "South Korea": "kr", "India": "in", "Australia": "au",
  "Brazil": "br", "Canada": "ca", "Turkey": "tr", "UAE": "ae", "Singapore": "sg",
  "China": "cn", "Russia": "ru", "Poland": "pl", "Czech Republic": "cz",
  "Switzerland": "ch", "Netherlands": "nl", "Belgium": "be", "Finland": "fi",
  "South Africa": "za", "Saudi Arabia": "sa"
};

const COMPANY_LOGOS = {
  "Lockheed Martin": "lockheedmartin.com",
  "Raytheon Technologies": "rtx.com",
  "Boeing Defense": "boeing.com",
  "Northrop Grumman": "northropgrumman.com",
  "General Dynamics": "gd.com",
  "L3Harris Technologies": "l3harris.com",
  "BAE Systems": "baesystems.com",
  "Thales": "thalesgroup.com",
  "Leonardo": "leonardo.com",
  "Airbus Defence & Space": "airbus.com",
  "Safran": "safran-group.com",
  "Dassault Aviation": "dassault-aviation.com",
  "Rheinmetall": "rheinmetall.com",
  "Saab AB": "saab.com",
  "Elbit Systems": "elbitsystems.com",
};

const HISTORY_PERIODS = [
  { value: "1d", label: "1D" },
  { value: "1w", label: "1W" },
  { value: "1mo", label: "1M" },
  { value: "1y", label: "1Y" },
];

// All timestamps from the backend are UTC (ISO 8601 with offset).
// Display times in Europe/Paris so they match what users see on financial sites.
const PARIS_TZ = "Europe/Paris";
function formatHistoryTime(isoStr, period) {
  const d = new Date(isoStr);
  if (period === "1d")
    return d.toLocaleTimeString("fr-FR", { timeZone: PARIS_TZ, hour: "2-digit", minute: "2-digit" });
  if (period === "1w")
    return d.toLocaleString("fr-FR", { timeZone: PARIS_TZ, weekday: "short", hour: "2-digit", minute: "2-digit" });
  if (period === "1mo")
    return d.toLocaleDateString("fr-FR", { timeZone: PARIS_TZ, month: "short", day: "numeric" });
  return d.toLocaleDateString("fr-FR", { timeZone: PARIS_TZ, month: "short", year: "2-digit" });
}

function relativeTime(isoStr) {
  const diff = Date.now() - new Date(isoStr).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return "< 1h ago";
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

// Stock History Chart — slides in from the right like CompanyProfileSheet
function StockChartModal({ player, liveData, onClose }) {
  const [period, setPeriod] = useState("1d");
  const [history, setHistory] = useState([]);
  const [dataSource, setDataSource] = useState(null); // 'live' | 'unavailable' | 'private'
  const [dataMessage, setDataMessage] = useState(null);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(false);

  const fetchHistory = useCallback(async (p) => {
    if (!player?.ticker || player.ticker === "Private" || player.ticker.includes("PRIV")) {
      setDataSource("private");
      return;
    }
    setLoadingHistory(true);
    try {
      const res = await axios.get(`${API}/stock-history/${encodeURIComponent(player.ticker)}?period=${p}`);
      setHistory(res.data.data || []);
      setDataSource(res.data.data_source || null);
      setDataMessage(res.data.message || null);
    } catch {
      setHistory([]);
      setDataSource("unavailable");
      setDataMessage(null);
    } finally {
      setLoadingHistory(false);
    }
  }, [player]);

  // Fetch company news once on mount
  useEffect(() => {
    const fetchArticles = async () => {
      setLoadingArticles(true);
      try {
        const res = await axios.get(`${API}/news/company?name=${encodeURIComponent(player.name)}&limit=5`);
        setArticles(res.data || []);
      } catch {
        setArticles([]);
      } finally {
        setLoadingArticles(false);
      }
    };
    fetchArticles();
  }, [player.name]);

  useEffect(() => {
    fetchHistory(period);
  }, [period, fetchHistory]);

  const live = liveData?.[player.ticker];
  const displayPrice = live?.price ?? player.stock_price;
  const liveChange = live?.change_percent ?? player.change_percent;
  // For non-1D periods, compute change from history data
  const periodChange = history.length >= 2
    ? ((history[history.length - 1].price - history[0].price) / history[0].price) * 100
    : liveChange;
  const displayChange = period === "1d" ? liveChange : periodChange;
  const isPositive = displayChange >= 0;
  const color = isPositive ? "#059669" : "#E11D48";
  const colorLight = isPositive ? "#D1FAE5" : "#FFE4E6";

  // Compute a tight domain with ~0.5% padding
  const prices = history.map(d => d.price);
  const chartMin = prices.length ? Math.min(...prices) * 0.995 : undefined;
  const chartMax = prices.length ? Math.max(...prices) * 1.005 : undefined;
  const openPrice = history.length ? history[0].price : null;

  // Reduce X-axis label density based on dataset size
  const tickCount = history.length;
  const xInterval = tickCount <= 12 ? 0
    : tickCount <= 30 ? Math.floor(tickCount / 6)
    : Math.floor(tickCount / 8);

  const chartData = history.map(d => ({
    ...d,
    label: formatHistoryTime(d.time, period),
  }));

  return (
    <Sheet open={true} onOpenChange={(open) => { if (!open) onClose(); }}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto p-0 gap-0 flex flex-col [&>button:first-child]:hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 text-sm">{player.name}</p>
              <p className="text-xs font-mono text-purple-700">{player.ticker}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Price + Change */}
        <div className="px-6 pt-4 pb-2 flex items-end gap-4">
          <p className="text-3xl font-mono font-bold text-slate-900">
            {displayPrice > 0 ? `$${displayPrice.toFixed(2)}` : "Private"}
          </p>
          {displayPrice > 0 && (
            <span className={`inline-flex items-center gap-1 font-mono text-sm px-2.5 py-1 rounded-full mb-1 ${
              isPositive ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50"
            }`}>
              {isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              {isPositive ? "+" : ""}{displayChange.toFixed(2)}%
            </span>
          )}
          {live && (
            <span className="text-xs text-slate-400 mb-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse inline-block" />
              Live
            </span>
          )}
        </div>

        {/* Period selector */}
        <div className="px-6 pb-3 flex gap-1">
          {HISTORY_PERIODS.map(p => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                period === p.value
                  ? "bg-purple-700 text-white"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div className="px-2 pb-1">
          {loadingHistory ? (
            <div className="h-52 flex items-center justify-center">
              <div className="animate-spin w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full" />
            </div>
          ) : dataSource === "private" ? (
            <div className="h-52 flex flex-col items-center justify-center gap-2 text-slate-400 text-sm">
              <span className="text-2xl">🔒</span>
              <p className="font-medium text-slate-500">Société non cotée</p>
              <p className="text-xs text-center max-w-xs">Aucune donnée de marché disponible pour les entreprises privées.</p>
            </div>
          ) : dataSource === "unavailable" || chartData.length === 0 ? (
            <div className="h-52 flex flex-col items-center justify-center gap-2 text-slate-400 text-sm">
              <span className="text-2xl">📊</span>
              <p className="font-medium text-slate-500">Données de marché indisponibles</p>
              <p className="text-xs text-center max-w-xs px-4">
                {dataMessage || "Les données historiques ne sont pas disponibles pour ce ticker sur Yahoo Finance."}
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={chartData} margin={{ top: 6, right: 12, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fill: "#94A3B8", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  interval={xInterval}
                />
                <YAxis
                  domain={[chartMin, chartMax]}
                  tick={{ fill: "#94A3B8", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={v => `$${v % 1 === 0 ? v : v.toFixed(1)}`}
                  width={56}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const val = payload[0].value;
                      const pct = openPrice
                        ? (((val - openPrice) / openPrice) * 100).toFixed(2)
                        : null;
                      return (
                        <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-lg text-sm">
                          <p className="text-slate-400 text-xs mb-1">{payload[0].payload.label}</p>
                          <p className="font-mono font-bold text-slate-900">${val.toFixed(2)}</p>
                          {pct !== null && (
                            <p className={`font-mono text-xs mt-0.5 ${parseFloat(pct) >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                              {parseFloat(pct) >= 0 ? "+" : ""}{pct}% vs open
                            </p>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                {openPrice && (
                  <ReferenceLine
                    y={openPrice}
                    stroke="#CBD5E1"
                    strokeDasharray="4 4"
                    strokeWidth={1}
                  />
                )}
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke={color}
                  strokeWidth={2}
                  fill="url(#priceGradient)"
                  dot={false}
                  activeDot={{ r: 4, fill: color, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
        {/* Data source attribution */}
        {dataSource === "live" && (
          <div className="px-4 pb-3 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            <span className="text-xs text-slate-400">Source : Yahoo Finance · Données en temps réel sous licence</span>
          </div>
        )}
        {(dataSource === "unavailable" || (dataSource !== "private" && chartData.length === 0)) && (
          <div className="px-4 pb-3">
            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded">⚠ Cours non disponible — vérifiez le ticker ou la cotation</span>
          </div>
        )}

        {/* Recent Articles */}
        <div className="px-6 pb-6 border-t border-slate-100 pt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Recent activity
          </p>
          {loadingArticles ? (
            <div className="flex items-center gap-2 text-slate-400 text-sm py-4">
              <div className="animate-spin w-4 h-4 border-2 border-slate-300 border-t-purple-500 rounded-full" />
              Loading articles…
            </div>
          ) : articles.length === 0 ? (
            <p className="text-slate-400 text-sm py-2">No recent articles found for this company.</p>
          ) : (
            <div className="space-y-2">
              {articles.map((article, i) => (
                <a
                  key={i}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 group-hover:text-purple-700 transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-400">{article.source}</span>
                      <span className="text-slate-200">·</span>
                      <span className="text-xs text-slate-400">{relativeTime(article.publishedAt)}</span>
                    </div>
                  </div>
                  {article.image && (
                    <img
                      src={article.image}
                      alt=""
                      className="w-14 h-10 object-cover rounded-md flex-shrink-0 bg-slate-100"
                      onError={e => { e.target.style.display = "none"; }}
                    />
                  )}
                </a>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default function MarketData() {
  const [searchParams] = useSearchParams();
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedSegment, setSelectedSegment] = useState("all");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [chartPlayer, setChartPlayer] = useState(null);
  const [profileName, setProfileName] = useState(null);
  // liveData: { [ticker]: { price, change_percent, prev_close } }
  const [liveData, setLiveData] = useState({});
  const [liveLoading, setLiveLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`${API}/defense-players`);
        setPlayers(response.data);
        setFilteredPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  // Fetch live prices whenever the players list changes
  const fetchLivePrices = useCallback(async (playersList) => {
    const publicTickers = playersList
      .map(p => p.ticker)
      .filter(t => t && t !== "Private" && !t.includes("PRIV"));
    if (!publicTickers.length) return;

    setLiveLoading(true);
    try {
      const chunkSize = 30;
      const combined = {};
      for (let i = 0; i < publicTickers.length; i += chunkSize) {
        const chunk = publicTickers.slice(i, i + chunkSize);
        const res = await axios.get(`${API}/stock-prices?tickers=${chunk.join(",")}`);
        Object.assign(combined, res.data);
      }
      setLiveData(combined);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Live price fetch error:", err);
    } finally {
      setLiveLoading(false);
    }
  }, []);

  useEffect(() => {
    if (players.length > 0) {
      fetchLivePrices(players);
      // Refresh every 5 minutes
      const interval = setInterval(() => fetchLivePrices(players), 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [players, fetchLivePrices]);

  useEffect(() => {
    let filtered = [...players];

    if (selectedCountry !== "all") {
      filtered = filtered.filter(p => p.country === selectedCountry);
    }

    if (selectedSegment !== "all") {
      filtered = filtered.filter(p =>
        Array.isArray(p.specializations) &&
        p.specializations.some(s => s.toLowerCase().includes(selectedSegment.toLowerCase()))
      );
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.ticker.toLowerCase().includes(term) ||
        (Array.isArray(p.specializations) &&
          p.specializations.some(s => s.toLowerCase().includes(term)))
      );
    }

    filtered.sort((a, b) => {
      const changeA = liveData[a.ticker]?.change_percent ?? a.change_percent;
      const changeB = liveData[b.ticker]?.change_percent ?? b.change_percent;
      switch (sortBy) {
        case "market_cap_desc": return b.market_cap - a.market_cap;
        case "market_cap_asc": return a.market_cap - b.market_cap;
        case "change_desc": return changeB - changeA;
        case "change_asc": return changeA - changeB;
        case "revenue_desc": return b.revenue - a.revenue;
        case "name_asc": return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

    setFilteredPlayers(filtered);
  }, [searchTerm, selectedCountry, selectedSegment, sortBy, players, liveData]);

  const totalMarketCap = filteredPlayers.reduce((sum, p) => sum + p.market_cap, 0);
  const totalRevenue = filteredPlayers.reduce((sum, p) => sum + p.revenue, 0);
  const totalEmployees = filteredPlayers.reduce((sum, p) => sum + p.employees, 0);

  const chartData = filteredPlayers.slice(0, 10).map(p => ({
    name: p.ticker || p.name.substring(0, 8),
    value: p.market_cap,
    change: liveData[p.ticker]?.change_percent ?? p.change_percent,
  }));

  const getFlag = (country) => {
    const code = COUNTRY_FLAGS[country];
    return code ? `https://flagcdn.com/w40/${code}.png` : null;
  };

  const getLogo = (companyName) => {
    const domain = COMPANY_LOGOS[companyName];
    return domain ? `https://logo.clearbit.com/${domain}` : null;
  };

  const isPrivate = (ticker) => !ticker || ticker === "Private" || ticker.includes("PRIV");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div data-testid="market-data-page" className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">
            Market Data
          </h1>
          <p className="text-slate-500 text-sm mt-1">Defense Industry Market Capitalization & Live Stock Prices</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 rounded-lg px-3 py-2">
          {liveLoading ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-500" />
          ) : (
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          )}
          <span>
            {lastUpdated
              ? `Live · Updated ${lastUpdated.toLocaleTimeString()}`
              : "Loading live prices…"}
          </span>
          <span className="text-slate-300">|</span>
          <Clock className="w-3.5 h-3.5" />
          <span>Refreshes every 5 min</span>
          <span className="text-slate-300">|</span>
          <Database className="w-3.5 h-3.5" />
          <span>Yahoo Finance</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">TOTAL MARKET CAP</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-2">${totalMarketCap.toFixed(1)}B</p>
            <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Defense sector
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">REVENUS AGRÉGÉS</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-2">${totalRevenue.toFixed(1)}B</p>
            <p className="text-xs text-slate-400 mt-1">Données base — non actualisées en temps réel</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">TOTAL EMPLOYEES</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-2">{(totalEmployees / 1000).toFixed(0)}K</p>
            <p className="text-xs text-slate-500 mt-1">Across all companies</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">COMPANIES</p>
            <p className="text-2xl font-mono font-bold text-purple-700 mt-2">{filteredPlayers.length}</p>
            <p className="text-xs text-slate-500 mt-1">of {players.length} total</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100 pb-4">
          <CardTitle className="font-heading text-lg text-slate-900">Top 10 by Market Cap</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-[280px]" data-testid="market-cap-chart">
            <ResponsiveContainer width="100%" height="100%" minWidth={200}>
              <BarChart data={chartData}>
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#64748B', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#94A3B8', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${v}B`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-lg">
                          <p className="text-slate-900 font-medium text-sm">{data.name}</p>
                          <p className="text-purple-700 font-mono font-semibold">${data.value}B</p>
                          <p className={`font-mono text-sm ${data.change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {data.change >= 0 ? '+' : ''}{data.change.toFixed(2)}%
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.change >= 0 ? '#7E22CE' : '#A855F7'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Société, ticker, segment…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
            data-testid="search-players"
          />
        </div>
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-full sm:w-44 bg-white border-slate-200 text-slate-700" data-testid="country-filter">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200">
            {COUNTRIES.map(c => (
              <SelectItem key={c.value} value={c.value} className="text-slate-700 focus:bg-purple-50">
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedSegment} onValueChange={setSelectedSegment}>
          <SelectTrigger className="w-full sm:w-48 bg-white border-slate-200 text-slate-700" data-testid="segment-filter">
            <SelectValue placeholder="Segment" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200">
            {SEGMENTS.map(s => (
              <SelectItem key={s.value} value={s.value} className="text-slate-700 focus:bg-purple-50">
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-52 bg-white border-slate-200 text-slate-700" data-testid="sort-filter">
            <ArrowUpDown className="w-4 h-4 mr-2 text-slate-400" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200">
            {SORT_OPTIONS.map(opt => (
              <SelectItem key={opt.value} value={opt.value} className="text-slate-700 focus:bg-purple-50">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active filter summary */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-slate-500">{filteredPlayers.length} société{filteredPlayers.length > 1 ? "s" : ""}</span>
        {selectedSegment !== "all" && (
          <span className="flex items-center gap-1 text-xs bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full font-medium">
            {SEGMENTS.find(s => s.value === selectedSegment)?.label}
            <button onClick={() => setSelectedSegment("all")} className="hover:text-purple-900 ml-0.5">
              <X className="w-3 h-3" />
            </button>
          </span>
        )}
        {selectedCountry !== "all" && (
          <span className="flex items-center gap-1 text-xs bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-full font-medium">
            {selectedCountry}
            <button onClick={() => setSelectedCountry("all")} className="hover:text-slate-900 ml-0.5">
              <X className="w-3 h-3" />
            </button>
          </span>
        )}
      </div>

      {/* Players Table */}
      <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto" data-testid="players-table">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Company</th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Ticker</th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Stock Price</th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Market Cap</th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Revenue</th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">
                    Change
                    <span className="ml-1 text-purple-500 normal-case font-normal">(click for chart)</span>
                  </th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Specializations</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlayers.map((player, idx) => {
                  const flagUrl = getFlag(player.country);
                  const logoUrl = getLogo(player.name);
                  const live = liveData[player.ticker];
                  const displayPrice = live?.price ?? player.stock_price;
                  const displayChange = live?.change_percent ?? player.change_percent;
                  const isPos = displayChange >= 0;
                  const priceChanged = live?.price != null && Math.abs(live.price - player.stock_price) > 0.01;

                  return (
                    <tr
                      key={player.id}
                      className="border-b border-slate-100 hover:bg-purple-50/50 transition-colors cursor-pointer"
                      onClick={() => setSelectedPlayer(player)}
                      data-testid={`player-row-${player.id}`}
                    >
                      {/* Company */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 bg-slate-100 rounded-lg flex items-center justify-center text-xs font-mono text-slate-500 font-medium shrink-0">
                            {idx + 1}
                          </span>
                          <button
                            onClick={(e) => { e.stopPropagation(); setProfileName(player.name); }}
                            className="flex items-center gap-2.5 group text-left"
                            title={`View ${player.name} profile`}
                          >
                          {logoUrl ? (
                            <img
                              src={logoUrl}
                              alt={player.name}
                              className="w-8 h-8 rounded-lg object-contain bg-white border border-slate-100 group-hover:border-purple-200 transition-colors shrink-0"
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          ) : (
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                              <Building2 className="w-4 h-4 text-purple-600" />
                            </div>
                          )}
                            <div>
                              <p className="text-slate-900 group-hover:text-purple-700 font-medium text-sm transition-colors">{player.name}</p>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                {flagUrl && (
                                  <img src={flagUrl} alt={player.country} className="w-4 h-3 object-cover rounded-sm" />
                                )}
                                <span className="text-xs text-slate-500">{player.country}</span>
                              </div>
                            </div>
                          </button>
                        </div>
                      </td>

                      {/* Ticker */}
                      <td className="p-4">
                        <span className="font-mono text-sm text-purple-700 font-medium bg-purple-50 px-2 py-0.5 rounded">
                          {player.ticker}
                        </span>
                      </td>

                      {/* Stock Price — live when available */}
                      <td className="p-4 text-right">
                        {isPrivate(player.ticker) ? (
                          <span className="font-mono text-sm text-slate-400">Private</span>
                        ) : (
                          <span className={`font-mono text-sm font-medium ${priceChanged ? "text-purple-700" : "text-slate-900"}`}>
                            {displayPrice > 0 ? `$${displayPrice.toFixed(2)}` : "—"}
                            {priceChanged && (
                              <span className="ml-1 text-xs text-purple-400">live</span>
                            )}
                          </span>
                        )}
                      </td>

                      {/* Market Cap */}
                      <td className="p-4 text-right">
                        <span className="font-mono text-sm text-slate-900 font-semibold">${player.market_cap}B</span>
                      </td>

                      {/* Revenue */}
                      <td className="p-4 text-right">
                        <span className="font-mono text-sm text-slate-600">${player.revenue}B</span>
                      </td>

                      {/* Change — clickable to open chart */}
                      <td className="p-4 text-right">
                        {isPrivate(player.ticker) ? (
                          <span className="text-slate-400 text-sm">—</span>
                        ) : (
                          <button
                            className={`inline-flex items-center gap-1 font-mono text-sm px-2 py-0.5 rounded-full transition-all hover:scale-105 hover:shadow-md cursor-pointer ${
                              isPos
                                ? "text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                                : "text-rose-700 bg-rose-50 hover:bg-rose-100"
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setChartPlayer(player);
                            }}
                            title="Click to view price chart"
                          >
                            {isPos ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                            {isPos ? "+" : ""}{displayChange.toFixed(2)}%
                          </button>
                        )}
                      </td>

                      {/* Specializations */}
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {player.specializations.slice(0, 2).map((spec, i) => (
                            <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                              {spec}
                            </span>
                          ))}
                          {player.specializations.length > 2 && (
                            <span className="text-xs text-slate-400">+{player.specializations.length - 2}</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Stock Chart Modal */}
      {chartPlayer && (
        <StockChartModal
          player={chartPlayer}
          liveData={liveData}
          onClose={() => setChartPlayer(null)}
        />
      )}

      {/* Player Detail Modal */}
      {selectedPlayer && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPlayer(null)}
        >
          <Card
            className="bg-white border-slate-200 w-full max-w-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            data-testid="player-detail-modal"
          >
            <CardHeader className="border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-4">
                {getLogo(selectedPlayer.name) ? (
                  <img
                    src={getLogo(selectedPlayer.name)}
                    alt={selectedPlayer.name}
                    className="w-14 h-14 rounded-xl object-contain bg-white border border-slate-100 shadow-sm"
                  />
                ) : (
                  <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Building2 className="w-7 h-7 text-purple-600" />
                  </div>
                )}
                <div>
                  <CardTitle className="font-heading text-xl text-slate-900">{selectedPlayer.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    {getFlag(selectedPlayer.country) && (
                      <img src={getFlag(selectedPlayer.country)} alt={selectedPlayer.country} className="w-5 h-4 object-cover rounded-sm" />
                    )}
                    <span className="text-sm text-slate-500">{selectedPlayer.country}</span>
                    <span className="text-slate-300">•</span>
                    <span className="font-mono text-sm text-purple-700 font-medium">{selectedPlayer.ticker}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">STOCK PRICE</p>
                  <p className="text-xl font-mono font-bold text-slate-900 mt-1">
                    {(() => {
                      const live = liveData[selectedPlayer.ticker];
                      const price = live?.price ?? selectedPlayer.stock_price;
                      return price > 0 ? `$${price.toFixed(2)}` : "Private";
                    })()}
                  </p>
                  {liveData[selectedPlayer.ticker] && (
                    <p className="text-xs text-purple-500 mt-1 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse inline-block" />
                      Live price
                    </p>
                  )}
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">CHANGE (TODAY)</p>
                  {(() => {
                    const live = liveData[selectedPlayer.ticker];
                    const change = live?.change_percent ?? selectedPlayer.change_percent;
                    const pos = change >= 0;
                    return (
                      <div>
                        <p className={`text-xl font-mono font-bold mt-1 ${pos ? "text-emerald-600" : "text-rose-600"}`}>
                          {pos ? "+" : ""}{change.toFixed(2)}%
                        </p>
                        {!isPrivate(selectedPlayer.ticker) && (
                          <button
                            className="text-xs text-purple-600 underline mt-1 cursor-pointer"
                            onClick={() => {
                              setSelectedPlayer(null);
                              setChartPlayer(selectedPlayer);
                            }}
                          >
                            View chart →
                          </button>
                        )}
                      </div>
                    );
                  })()}
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">MARKET CAP</p>
                  <p className="text-xl font-mono font-bold text-slate-900 mt-1">${selectedPlayer.market_cap}B</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">REVENUE</p>
                  <p className="text-xl font-mono font-bold text-slate-900 mt-1">${selectedPlayer.revenue}B</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">EMPLOYEES</p>
                <p className="text-slate-900 font-medium">{selectedPlayer.employees.toLocaleString()}</p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">SPECIALIZATIONS</p>
                <div className="flex flex-wrap gap-2">
                  {selectedPlayer.specializations.map((spec, idx) => (
                    <span key={idx} className="text-sm bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1 rounded-full font-medium">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => { setSelectedPlayer(null); setProfileName(selectedPlayer.name); }}
                className="w-full flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
              >
                <UserCircle className="w-4 h-4" />
                View Full Company Profile
              </button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Company Profile Sheet */}
      <CompanyProfileSheet name={profileName} onClose={() => setProfileName(null)} />
    </div>
  );
}
