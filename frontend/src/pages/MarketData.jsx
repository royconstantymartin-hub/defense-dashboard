import { useEffect, useState, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { API, useAuth } from "@/App";
import { getLogoUrls } from "@/lib/companyLogos";
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
  Search, TrendingUp, ArrowUpDown, ArrowDown, ArrowUp, Building2, Clock,
  Database, RefreshCw, X, UserCircle, Star, Pin, ChevronLeft, ChevronRight,
  Newspaper, Activity, Zap,
} from "lucide-react";
import CompanyProfileSheet from "@/components/CompanyProfileSheet";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area,
  CartesianGrid, ReferenceLine,
} from "recharts";

// ─── Module-level pure helpers ────────────────────────────────────────────────
const isPrivate = (ticker) => !ticker || ticker === "Private" || ticker.includes("PRIV");

// Market-cap-weighted average of weekly % changes, like a real cap-weighted
// stock index: a $130B prime moves the needle more than a $2B smallcap.
// Falls back to an equal-weighted average only if no market caps are available.
function capWeightedChange(playersList, liveData) {
  let weightedSum = 0, totalCap = 0, plainSum = 0, count = 0;
  for (const p of playersList) {
    const live = liveData[p.ticker];
    if (!live) continue;
    const change = live.week_change_percent ?? live.change_percent;
    if (change == null || !Number.isFinite(change)) continue;
    plainSum += change;
    count++;
    const cap = Number(p.market_cap);
    if (Number.isFinite(cap) && cap > 0) {
      weightedSum += change * cap;
      totalCap += cap;
    }
  }
  if (totalCap > 0) return weightedSum / totalCap;
  if (count > 0) return plainSum / count;
  return null;
}

const CATALYST_CONFIG = {
  contract:    { label: "CONTRACT",    bg: "bg-blue-50",    text: "text-blue-800",   bar: "bg-blue-800" },
  earnings:    { label: "EARNINGS",    bg: "bg-violet-50",  text: "text-violet-700", bar: "bg-violet-600" },
  ipo:         { label: "IPO",         bg: "bg-amber-50",   text: "text-amber-700",  bar: "bg-amber-500" },
  merger:      { label: "M&A",         bg: "bg-orange-50",  text: "text-orange-700", bar: "bg-orange-500" },
  acquisition: { label: "ACQUISITION", bg: "bg-orange-50",  text: "text-orange-700", bar: "bg-orange-500" },
  partnership: { label: "PARTNERSHIP", bg: "bg-emerald-50", text: "text-emerald-700",bar: "bg-emerald-600" },
  product:     { label: "PRODUCT",     bg: "bg-slate-50",   text: "text-slate-600",  bar: "bg-slate-400" },
};

const CATALYST_PRIORITY = {
  ipo: 1, earnings: 2, contract: 3, merger: 4, acquisition: 4, partnership: 5, product: 6,
};

const DOMAINS = [
  { key: "aerospace",   label: "Aerospace",    keywords: ["Aerospace", "Aircraft", "Helicopter", "Rotorcraft", "Aerostructures"] },
  { key: "naval",       label: "Naval",         keywords: ["Naval", "Shipbuilding", "Maritime", "Submarine", "LCS"] },
  { key: "missiles",    label: "Missiles",      keywords: ["Missiles", "Munitions", "Rockets", "Loitering"] },
  { key: "cyber",       label: "Cyber / EW",    keywords: ["Cyber", "Electronic", "ISR", "Intelligence", "SIGINT"] },
  { key: "space",       label: "Space",         keywords: ["Space", "Satellites", "Launch", "Orbital"] },
  { key: "land",        label: "Land Systems",  keywords: ["Land", "Armored", "UGV", "Artillery"] },
  { key: "electronics", label: "Electronics",   keywords: ["Electronics", "Radar", "Sensors", "Communications", "RF"] },
  { key: "services",    label: "Services",      keywords: ["IT", "Services", "Consulting", "Logistics", "Training"] },
];

// ─── Filter / sort constants ──────────────────────────────────────────────────
const COUNTRIES = [
  { value: "all", label: "All Countries" },
  { value: "USA", label: "🇺🇸 United States" },
  { value: "UK", label: "🇬🇧 United Kingdom" },
  { value: "France", label: "🇫🇷 France" },
  { value: "Germany", label: "🇩🇪 Germany" },
  { value: "Italy", label: "🇮🇹 Italy" },
  { value: "Spain", label: "🇪🇸 Spain" },
  { value: "Sweden", label: "🇸🇪 Sweden" },
  { value: "Norway", label: "🇳🇴 Norway" },
  { value: "Finland", label: "🇫🇮 Finland" },
  { value: "Netherlands", label: "🇳🇱 Netherlands" },
  { value: "Belgium", label: "🇧🇪 Belgium" },
  { value: "Switzerland", label: "🇨🇭 Switzerland" },
  { value: "Poland", label: "🇵🇱 Poland" },
  { value: "Czech Republic", label: "🇨🇿 Czech Republic" },
  { value: "EU", label: "🇪🇺 European Union" },
  { value: "Israel", label: "🇮🇱 Israel" },
  { value: "Turkey", label: "🇹🇷 Turkey" },
  { value: "UAE", label: "🇦🇪 UAE" },
  { value: "Saudi Arabia", label: "🇸🇦 Saudi Arabia" },
  { value: "India", label: "🇮🇳 India" },
  { value: "Japan", label: "🇯🇵 Japan" },
  { value: "South Korea", label: "🇰🇷 South Korea" },
  { value: "Singapore", label: "🇸🇬 Singapore" },
  { value: "Australia", label: "🇦🇺 Australia" },
  { value: "Canada", label: "🇨🇦 Canada" },
  { value: "Brazil", label: "🇧🇷 Brazil" },
  { value: "South Africa", label: "🇿🇦 South Africa" },
  { value: "China", label: "🇨🇳 China" },
  { value: "Russia", label: "🇷🇺 Russia" },
  { value: "Ukraine", label: "🇺🇦 Ukraine" },
];

const SORT_OPTIONS = [
  { value: "market_cap_desc", label: "Market Cap (High to Low)" },
  { value: "market_cap_asc", label: "Market Cap (Low to High)" },
  { value: "change_desc", label: "Change % (Best)" },
  { value: "change_asc", label: "Change % (Worst)" },
  { value: "revenue_desc", label: "Revenue (High to Low)" },
  { value: "name_asc", label: "Name (A-Z)" },
];

const NEUTRAL_TAG = "bg-slate-50 text-slate-600 border-slate-200";
function specTagColor(_spec = "") { return NEUTRAL_TAG; }

const SEGMENTS = [
  { value: "all",         label: "All Segments" },
  { value: "aerospace",   label: "Aerospace" },
  { value: "naval",       label: "Naval" },
  { value: "land",        label: "Land / Armored" },
  { value: "missiles",    label: "Missiles" },
  { value: "cyber",       label: "Cyber / EW" },
  { value: "space",       label: "Space" },
  { value: "services",    label: "Services / Consulting" },
  { value: "logistics",   label: "Logistics / MRO" },
  { value: "electronics", label: "Defense Electronics" },
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

const HISTORY_PERIODS = [
  { value: "1d", label: "1D" },
  { value: "1w", label: "1W" },
  { value: "1mo", label: "1M" },
  { value: "1y", label: "1Y" },
];

const PARIS_TZ = "Europe/Paris";
function formatHistoryTime(isoStr, period) {
  const d = new Date(isoStr);
  if (period === "1d")
    return d.toLocaleTimeString("en-GB", { timeZone: PARIS_TZ, hour: "2-digit", minute: "2-digit" });
  if (period === "1w")
    return d.toLocaleString("en-GB", { timeZone: PARIS_TZ, weekday: "short", hour: "2-digit", minute: "2-digit" });
  if (period === "1mo")
    return d.toLocaleDateString("en-GB", { timeZone: PARIS_TZ, month: "short", day: "numeric" });
  return d.toLocaleDateString("en-GB", { timeZone: PARIS_TZ, month: "short", year: "2-digit" });
}

function relativeTime(isoStr) {
  const diff = Date.now() - new Date(isoStr).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return "< 1h ago";
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

const AVATAR_COLORS = ["bg-slate-700"];
function avatarColor(name = "") {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffff;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}
function initials(name = "") {
  return name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function LogoWithFallback({ name, urls, clearbitUrl, sizeClass = "w-8 h-8", textClass = "text-[10px]", rounded = "rounded-lg" }) {
  const urlList = urls ?? (clearbitUrl ? [clearbitUrl] : []);
  const [urlIndex, setUrlIndex] = useState(0);

  if (!urlList.length || urlIndex >= urlList.length) {
    return (
      <div className={`${sizeClass} ${avatarColor(name)} ${rounded} flex items-center justify-center shrink-0`}>
        <span className={`${textClass} font-bold text-white tracking-tight`}>{initials(name)}</span>
      </div>
    );
  }

  return (
    <img
      src={urlList[urlIndex]}
      alt={name}
      className={`${sizeClass} ${rounded} object-contain bg-white border border-slate-100 shrink-0`}
      onError={() => setUrlIndex((i) => i + 1)}
    />
  );
}

// ─── Stock History Chart ──────────────────────────────────────────────────────
function StockChartModal({ player, liveData, onClose }) {
  const [period, setPeriod] = useState("1d");
  const [history, setHistory] = useState([]);
  const [dataSource, setDataSource] = useState(null);
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
  const historyPrice = dataSource === "live" && history.length ? history[history.length - 1].price : null;
  const displayPrice = historyPrice ?? live?.price ?? player.stock_price;
  const liveChange = live?.change_percent ?? player.change_percent;
  const periodChange = history.length >= 2
    ? ((history[history.length - 1].price - history[0].price) / history[0].price) * 100
    : liveChange;
  const displayChange = period !== "1d" ? periodChange : historyPrice !== null ? periodChange : liveChange;
  const isPositive = displayChange >= 0;
  const color = isPositive ? "#059669" : "#E11D48";

  const prices = history.map(d => d.price);
  const chartMin = prices.length ? Math.min(...prices) * 0.995 : undefined;
  const chartMax = prices.length ? Math.max(...prices) * 1.005 : undefined;
  const openPrice = history.length ? history[0].price : null;
  const tickCount = history.length;
  const xInterval = tickCount <= 12 ? 0 : tickCount <= 30 ? Math.floor(tickCount / 6) : Math.floor(tickCount / 8);
  const chartData = history.map(d => ({ ...d, label: formatHistoryTime(d.time, period) }));

  return (
    <Sheet open={true} onOpenChange={(open) => { if (!open) onClose(); }}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto p-0 gap-0 flex flex-col [&>button:first-child]:hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 text-sm">{player.name}</p>
              <p className="text-xs font-mono text-slate-700">{player.ticker}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

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
          {(historyPrice !== null || live) && (
            <span className="text-xs text-slate-400 mb-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse inline-block" />
              {historyPrice !== null && period === "1d" ? "Live · vs open" : "Live"}
            </span>
          )}
        </div>

        <div className="px-6 pb-3 flex gap-1">
          {HISTORY_PERIODS.map(p => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                period === p.value ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="px-2 pb-1">
          {loadingHistory ? (
            <div className="h-52 flex items-center justify-center">
              <div className="animate-spin w-6 h-6 border-2 border-slate-200 border-t-slate-800 rounded-full" />
            </div>
          ) : dataSource === "private" ? (
            <div className="h-52 flex flex-col items-center justify-center gap-2 text-slate-400 text-sm">
              <span className="text-2xl">🔒</span>
              <p className="font-medium text-slate-500">Unlisted company</p>
              <p className="text-xs text-center max-w-xs">No market data available for private companies.</p>
            </div>
          ) : dataSource === "unavailable" || chartData.length === 0 ? (
            <div className="h-52 flex flex-col items-center justify-center gap-2 text-slate-400 text-sm">
              <span className="text-2xl">📊</span>
              <p className="font-medium text-slate-500">Market data unavailable</p>
              <p className="text-xs text-center max-w-xs px-4">
                {dataMessage || "Historical data is not available for this ticker on Yahoo Finance."}
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
                <XAxis dataKey="label" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} interval={xInterval} />
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
                      const pct = openPrice ? (((val - openPrice) / openPrice) * 100).toFixed(2) : null;
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
                {openPrice && <ReferenceLine y={openPrice} stroke="#CBD5E1" strokeDasharray="4 4" strokeWidth={1} />}
                <Area type="monotone" dataKey="price" stroke={color} strokeWidth={2} fill="url(#priceGradient)" dot={false} activeDot={{ r: 4, fill: color, strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {dataSource === "live" && (
          <div className="px-4 pb-3 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            <span className="text-xs text-slate-400">Source: Yahoo Finance · Real-time data</span>
          </div>
        )}
        {dataSource === "indicative" && (
          <div className="px-4 pb-3">
            <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
              Courbe indicative — cours en direct indisponible, reconstruit à partir du dernier prix connu
            </span>
          </div>
        )}
        {(dataSource === "unavailable" || (dataSource !== "private" && chartData.length === 0)) && (
          <div className="px-4 pb-3">
            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded">⚠ Price unavailable — check ticker or exchange listing</span>
          </div>
        )}

        <div className="px-6 pb-6 border-t border-slate-100 pt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Recent activity</p>
          {loadingArticles ? (
            <div className="flex items-center gap-2 text-slate-400 text-sm py-4">
              <div className="animate-spin w-4 h-4 border-2 border-slate-300 border-t-slate-700 rounded-full" />
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
                    <p className="text-sm font-medium text-slate-800 group-hover:text-slate-900 transition-colors line-clamp-2 leading-snug">
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

// ─── Main page ────────────────────────────────────────────────────────────────
export default function MarketData() {
  const { token } = useAuth();
  const [searchParams] = useSearchParams();
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedSegment, setSelectedSegment] = useState("all");
  const [watchlistOnly, setWatchlistOnly] = useState(false);
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [chartPlayer, setChartPlayer] = useState(null);
  const [profileName, setProfileName] = useState(null);
  const [liveData, setLiveData] = useState({});
  const [liveLoading, setLiveLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [watchlist, setWatchlist] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const [pinnedCompanies, setPinnedCompanies] = useState(() => {
    try { return JSON.parse(localStorage.getItem("market_pinned_v1")) || []; }
    catch { return []; }
  });

  // Market Catalysts
  const [catalysts, setCatalysts] = useState([]);
  const [catalystsLoading, setCatalystsLoading] = useState(true);
  const [catalystWindow, setCatalystWindow] = useState("48h");

  // ── Watchlist ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!token) return;
    axios.get(`${API}/watchlist`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => setWatchlist(new Set(r.data)))
      .catch(() => {});
  }, [token]);

  // ── Fetch players — listed companies only on this page ────────────────────
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`${API}/defense-players`);
        const listed = response.data.filter(p => !isPrivate(p.ticker));
        setPlayers(listed);
        setFilteredPlayers(listed);
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  // ── Fetch live prices ──────────────────────────────────────────────────────
  const fetchLivePrices = useCallback(async (playersList) => {
    const publicTickers = playersList
      .map(p => p.ticker)
      .filter(t => t && t !== "Private" && !t.includes("PRIV"));
    if (!publicTickers.length) return;

    setLiveLoading(true);
    const chunkSize = 30;
    const combined = {};
    let anySuccess = false;
    // Fetch each batch independently: if one batch fails (network hiccup or a
    // Yahoo throttle), the others still arrive instead of the whole page going
    // blank. We only overwrite the live data when at least one batch succeeded.
    for (let i = 0; i < publicTickers.length; i += chunkSize) {
      const chunk = publicTickers.slice(i, i + chunkSize);
      try {
        const res = await axios.get(`${API}/stock-prices?tickers=${chunk.join(",")}`);
        Object.assign(combined, res.data);
        anySuccess = true;
      } catch (err) {
        console.error("Live price batch failed:", chunk[0], err);
      }
    }
    if (anySuccess) {
      // Merge over the previous snapshot so a partial refresh never blanks rows
      // that were showing a live price a moment ago.
      setLiveData((prev) => ({ ...prev, ...combined }));
      setLastUpdated(new Date());
    }
    setLiveLoading(false);
  }, []);

  useEffect(() => {
    if (players.length > 0) {
      fetchLivePrices(players);
      const interval = setInterval(() => fetchLivePrices(players), 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [players, fetchLivePrices]);

  // ── Fetch market catalysts from live news feed ────────────────────────────
  const deriveCatalystCategory = (title = "") => {
    const t = title.toLowerCase();
    if (/\b(contract|award|bid|tender|procurement)\b/.test(t))    return "contract";
    if (/\b(earn|revenue|profit|quarter|eps|guidance)\b/.test(t)) return "earnings";
    if (/\b(ipo|listing|goes public|float)\b/.test(t))            return "ipo";
    if (/\b(merger|acqui|takeover|buyout|M&A)\b/.test(t))         return "acquisition";
    if (/\b(partner|joint venture|teaming|agreement|alliance)\b/.test(t)) return "partnership";
    return "product";
  };

  useEffect(() => {
    if (!players.length) return;
    const listedMap = {};
    players.forEach(p => { listedMap[p.name.toLowerCase()] = p; });

    const tryWindow = (hours) =>
      axios.get(`${API}/news`, { params: { hours, limit: 80, language: "en" } })
        .then(res => {
          const out = [];
          for (const a of res.data) {
            const companyNames = Array.isArray(a.companies) ? a.companies : [];
            let player = null;
            for (const cname of companyNames) {
              const key = cname.toLowerCase();
              player = listedMap[key] ?? players.find(p =>
                p.name.toLowerCase().includes(key) || key.includes(p.name.toLowerCase())
              );
              if (player) break;
            }
            if (!player) continue;
            const category = deriveCatalystCategory(a.title);
            out.push({ ...a, date: a.publishedAt, category, _player: player });
          }
          out.sort((a, b) => {
            const pa = CATALYST_PRIORITY[a.category] ?? 99;
            const pb = CATALYST_PRIORITY[b.category] ?? 99;
            if (pa !== pb) return pa - pb;
            return new Date(b.date || 0) - new Date(a.date || 0);
          });
          return out.slice(0, 4);
        });

    setCatalystsLoading(true);
    tryWindow(24)
      .then(result => {
        if (result.length > 0) { setCatalysts(result); setCatalystWindow("last 24h"); return; }
        return tryWindow(48).then(r => {
          if (r.length > 0) { setCatalysts(r); setCatalystWindow("last 48h"); return; }
          return tryWindow(168).then(r7 => {
            setCatalysts(r7); setCatalystWindow(r7.length > 0 ? "last 7 days" : "recent");
          });
        });
      })
      .catch(() => setCatalysts([]))
      .finally(() => setCatalystsLoading(false));
  }, [players]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Computed: Defense Index (weekly, cap-weighted, live only) ─────────────
  const defenseIndex = useMemo(
    () => capWeightedChange(players, liveData),
    [players, liveData]
  );

  // ── Computed: Domain performance (weekly, cap-weighted, live only — no stale DB fallback)
  const domainPerf = useMemo(() => {
    return DOMAINS.map(domain => {
      const matching = players.filter(p =>
        Array.isArray(p.specializations) &&
        p.specializations.some(s =>
          domain.keywords.some(k => s.toLowerCase().includes(k.toLowerCase()))
        ) &&
        liveData[p.ticker] != null
      );
      const change = capWeightedChange(matching, liveData);
      return { ...domain, change, count: matching.length };
    }).filter(d => d.count > 0 && d.change != null);
  }, [players, liveData]);

  // ── Computed: Top movers (5-day, live only — no stale DB fallback) ─────────
  const topMovers = useMemo(() => {
    const withLive = players
      .filter(p => liveData[p.ticker]?.week_change_percent != null)
      .map(p => ({ ...p, _change: liveData[p.ticker].week_change_percent }));
    const sorted = [...withLive].sort((a, b) => b._change - a._change);
    return {
      gainers: sorted.slice(0, 5),
      losers: sorted.slice(-5).reverse(),
    };
  }, [players, liveData]);

  // ── Filtering & sorting ────────────────────────────────────────────────────
  useEffect(() => {
    let filtered = [...players];

    if (selectedCountry !== "all")
      filtered = filtered.filter(p => p.country === selectedCountry);

    if (selectedSegment !== "all")
      filtered = filtered.filter(p =>
        Array.isArray(p.specializations) &&
        p.specializations.some(s => s.toLowerCase().includes(selectedSegment.toLowerCase()))
      );

    if (watchlistOnly)
      filtered = filtered.filter(p => watchlist.has(p.name));

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.ticker.toLowerCase().includes(term) ||
        (Array.isArray(p.specializations) && p.specializations.some(s => s.toLowerCase().includes(term)))
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
    setCurrentPage(1);
  }, [searchTerm, selectedCountry, selectedSegment, watchlistOnly, sortBy, players, liveData, watchlist]);

  // ── Pin / watchlist helpers ────────────────────────────────────────────────
  const togglePin = (e, companyName) => {
    e.stopPropagation();
    setPinnedCompanies((prev) => {
      let next;
      if (prev.includes(companyName)) {
        next = prev.filter((n) => n !== companyName);
      } else if (prev.length < 3) {
        next = [...prev, companyName];
      } else {
        return prev;
      }
      localStorage.setItem("market_pinned_v1", JSON.stringify(next));
      return next;
    });
  };

  const toggleWatch = async (e, companyName) => {
    e.stopPropagation();
    if (!token) return;
    const isWatched = watchlist.has(companyName);
    setWatchlist((prev) => {
      const next = new Set(prev);
      isWatched ? next.delete(companyName) : next.add(companyName);
      return next;
    });
    try {
      if (isWatched) {
        await axios.delete(`${API}/watchlist`, {
          params: { company_name: companyName },
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${API}/watchlist`, null, {
          params: { company_name: companyName },
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch {
      setWatchlist((prev) => {
        const next = new Set(prev);
        isWatched ? next.add(companyName) : next.delete(companyName);
        return next;
      });
    }
  };

  // ── Derived totals ─────────────────────────────────────────────────────────
  const totalMarketCap = filteredPlayers.reduce((sum, p) => sum + p.market_cap, 0);
  const totalRevenue = filteredPlayers.reduce((sum, p) => sum + p.revenue, 0);
  const totalEmployees = filteredPlayers.reduce((sum, p) => sum + p.employees, 0);

  const getFlag = (country) => {
    const code = COUNTRY_FLAGS[country];
    return code ? `https://flagcdn.com/w40/${code}.png` : null;
  };

  const totalPages = Math.ceil(filteredPlayers.length / ITEMS_PER_PAGE);
  const paginatedPlayers = filteredPlayers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const listedCount = players.length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-slate-200 border-t-slate-800 rounded-full" />
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div data-testid="market-data-page" className="space-y-6 animate-fade-in">

      {/* ── Header ── */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">Market Data</h1>
          <p className="text-slate-500 text-sm mt-1">Live prices, market catalysts and performance across the defense universe</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 rounded-lg px-3 py-2">
          {liveLoading ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-slate-500" />
          ) : (
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          )}
          <span>{lastUpdated ? `Live · Updated ${lastUpdated.toLocaleTimeString()}` : "Loading live prices…"}</span>
          <span className="text-slate-300">|</span>
          <Clock className="w-3.5 h-3.5" />
          <span>Refreshes every 5 min</span>
          <span className="text-slate-300">|</span>
          <Database className="w-3.5 h-3.5" />
          <span>Yahoo Finance</span>
        </div>
      </div>

      {/* ── KPI Row ── */}
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
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">AGGREGATE REVENUE</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-2">${totalRevenue.toFixed(1)}B</p>
            <p className="text-xs text-slate-400 mt-1">Base data — not real-time</p>
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
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">LISTED COMPANIES</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-2">{filteredPlayers.length}</p>
            <p className="text-xs text-slate-500 mt-1">publicly traded · {players.length} tracked</p>
          </CardContent>
        </Card>
      </div>

      {/* ── Defense Index + Domain Performance ── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

        {/* Defense Index */}
        <Card className="bg-white border-slate-200 shadow-sm border-t-4 border-t-blue-800">
          <CardContent className="p-5 h-full flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-blue-800" />
                Defense Index
              </p>
              <div className="mt-3">
                {defenseIndex === null ? (
                  <div className="animate-pulse h-10 w-28 bg-slate-100 rounded" />
                ) : (
                  <div className="flex items-end gap-2">
                    <p className={`text-4xl font-mono font-bold leading-none ${defenseIndex >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                      {defenseIndex >= 0 ? "+" : ""}{defenseIndex.toFixed(2)}%
                    </p>
                    <span className={`mb-0.5 inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                      defenseIndex >= 0 ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                    }`}>
                      {defenseIndex >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                      1W
                    </span>
                  </div>
                )}
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4">
              1W · cap-weighted · <span className="font-mono font-medium text-slate-600">{listedCount}</span> listed companies
            </p>
          </CardContent>
        </Card>

        {/* Domain Performance */}
        <Card className="lg:col-span-3 bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Performance by Capability Domain
              </p>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full">
                1W · cap-weighted
              </span>
            </div>
            {domainPerf.length === 0 ? (
              <div className="flex items-center justify-center h-14 text-slate-400 text-sm">
                <div className="animate-spin w-4 h-4 border-2 border-slate-200 border-t-slate-500 rounded-full mr-2" />
                Loading…
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {domainPerf.map(domain => {
                  const isPos = (domain.change ?? 0) >= 0;
                  return (
                    <div
                      key={domain.key}
                      className={`rounded-xl p-3 border transition-colors ${
                        isPos
                          ? "bg-emerald-50 border-emerald-100"
                          : "bg-rose-50 border-rose-100"
                      }`}
                    >
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 truncate leading-none mb-2">
                        {domain.label.split(" / ")[0]}
                      </p>
                      <p className={`text-lg font-mono font-bold leading-none ${isPos ? "text-emerald-700" : "text-rose-700"}`}>
                        {isPos ? "+" : ""}{domain.change.toFixed(2)}%
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1.5 font-mono">{domain.count} co.</p>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ── Market Catalysts ── */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <Activity className="w-4 h-4 text-blue-800" />
            <CardTitle className="font-heading text-lg text-slate-900">Market Catalysts</CardTitle>
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              {catalystWindow} · listed companies · English
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          {catalystsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse rounded-xl border border-slate-100 overflow-hidden">
                  <div className="h-1 w-full bg-slate-100" />
                  <div className="p-4 space-y-3">
                    <div className="h-3 w-16 bg-slate-100 rounded-full" />
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-slate-100 rounded-md" />
                      <div className="space-y-1 flex-1">
                        <div className="h-2.5 w-3/4 bg-slate-100 rounded" />
                        <div className="h-2 w-1/2 bg-slate-100 rounded" />
                      </div>
                    </div>
                    <div className="h-3 w-full bg-slate-100 rounded" />
                    <div className="h-3 w-2/3 bg-slate-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : catalysts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 gap-3 text-slate-400">
              <Newspaper className="w-8 h-8 text-slate-200" />
              <p className="text-sm font-medium text-slate-400">No market-moving news linked to listed companies right now.</p>
              <p className="text-xs text-slate-300">Seed fresh announcements via the Admin panel to populate this section.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {catalysts.map((catalyst, i) => {
                const cfg = CATALYST_CONFIG[catalyst.category?.toLowerCase()] ?? CATALYST_CONFIG.product;
                const player = catalyst._player;
                const change = liveData[player.ticker]?.change_percent ?? player.change_percent;
                const isPos = change >= 0;
                const flagUrl = getFlag(player.country);
                return (
                  <div
                    key={i}
                    className="relative rounded-xl border border-slate-100 overflow-hidden hover:shadow-md hover:border-slate-200 transition-all cursor-pointer group"
                    onClick={() => catalyst.url ? window.open(catalyst.url, "_blank", "noopener") : setSelectedPlayer(player)}
                  >
                    {/* Category colour bar */}
                    <div className={`h-1 w-full ${cfg.bar}`} />

                    <div className="p-4">
                      {/* Badge */}
                      <span className={`inline-block text-[10px] font-bold tracking-widest px-2.5 py-0.5 rounded-full mb-3 ${cfg.bg} ${cfg.text}`}>
                        {cfg.label}
                      </span>

                      {/* Company row */}
                      <div className="flex items-center gap-2 mb-3">
                        <LogoWithFallback
                          name={player.name}
                          urls={getLogoUrls(player.name)}
                          sizeClass="w-7 h-7"
                          textClass="text-[9px]"
                          rounded="rounded-md"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-slate-700 truncate leading-none">{player.name}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span className="font-mono text-[10px] text-slate-400 bg-slate-100 px-1 py-px rounded">{player.ticker}</span>
                            {flagUrl && <img src={flagUrl} alt={player.country} className="w-3.5 h-2.5 object-cover rounded-sm" />}
                          </div>
                        </div>
                        <span className={`text-xs font-mono font-bold shrink-0 ${isPos ? "text-emerald-600" : "text-rose-600"}`}>
                          {isPos ? "+" : ""}{change.toFixed(2)}%
                        </span>
                      </div>

                      {/* Headline */}
                      <p className="text-sm font-medium text-slate-900 leading-snug line-clamp-2 group-hover:text-blue-800 transition-colors">
                        {catalyst.title}
                      </p>

                      {/* Meta */}
                      <p className="text-[11px] text-slate-400 mt-2.5 flex items-center gap-1.5">
                        <span>{catalyst.source}</span>
                        <span className="text-slate-200">·</span>
                        <span>{catalyst.date ? relativeTime(catalyst.date) : "recent"}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Top Movers ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Gainers */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-3">
            <CardTitle className="font-heading text-base text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center justify-center">
                <ArrowUp className="w-3.5 h-3.5 text-emerald-600" />
              </span>
              Top Gainers
              <span className="text-xs font-normal text-slate-400 ml-1">5D · listed companies</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-1 pb-2">
            {topMovers.gainers.map((p, i) => {
              const flagUrl = getFlag(p.country);
              const price = liveData[p.ticker]?.price ?? p.stock_price;
              return (
                <div
                  key={p.id}
                  className="flex items-center gap-3 px-2 py-2.5 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => setSelectedPlayer(p)}
                >
                  <span className="text-xs font-mono text-slate-300 w-4 shrink-0 text-right">{i + 1}</span>
                  <LogoWithFallback
                    name={p.name}
                    urls={getLogoUrls(p.name)}
                    sizeClass="w-7 h-7"
                    textClass="text-[9px]"
                    rounded="rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate leading-none">{p.name}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="font-mono text-[10px] text-slate-400">{p.ticker}</span>
                      {flagUrl && <img src={flagUrl} alt={p.country} className="w-3.5 h-2.5 object-cover rounded-sm" />}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <button
                      className="text-sm font-mono font-bold text-emerald-600 hover:underline cursor-pointer"
                      onClick={(e) => { e.stopPropagation(); setChartPlayer(p); }}
                      title="Click to view price chart"
                    >
                      +{p._change.toFixed(2)}%
                    </button>
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5">${price > 0 ? price.toFixed(2) : "—"}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Losers */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-3">
            <CardTitle className="font-heading text-base text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 bg-rose-50 border border-rose-100 rounded-lg flex items-center justify-center">
                <ArrowDown className="w-3.5 h-3.5 text-rose-600" />
              </span>
              Top Losers
              <span className="text-xs font-normal text-slate-400 ml-1">5D · listed companies</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-1 pb-2">
            {topMovers.losers.map((p, i) => {
              const flagUrl = getFlag(p.country);
              const price = liveData[p.ticker]?.price ?? p.stock_price;
              return (
                <div
                  key={p.id}
                  className="flex items-center gap-3 px-2 py-2.5 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => setSelectedPlayer(p)}
                >
                  <span className="text-xs font-mono text-slate-300 w-4 shrink-0 text-right">{i + 1}</span>
                  <LogoWithFallback
                    name={p.name}
                    urls={getLogoUrls(p.name)}
                    sizeClass="w-7 h-7"
                    textClass="text-[9px]"
                    rounded="rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate leading-none">{p.name}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="font-mono text-[10px] text-slate-400">{p.ticker}</span>
                      {flagUrl && <img src={flagUrl} alt={p.country} className="w-3.5 h-2.5 object-cover rounded-sm" />}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <button
                      className="text-sm font-mono font-bold text-rose-600 hover:underline cursor-pointer"
                      onClick={(e) => { e.stopPropagation(); setChartPlayer(p); }}
                      title="Click to view price chart"
                    >
                      {p._change.toFixed(2)}%
                    </button>
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5">${price > 0 ? price.toFixed(2) : "—"}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* ── Pinned Companies ── */}
      <Card className="bg-white border-slate-200 shadow-sm" data-testid="market-cap-chart">
        <CardHeader className="border-b border-slate-100 pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-heading text-lg text-slate-900 flex items-center gap-2">
                <Pin className="w-4 h-4 text-slate-600" />
                Pinned Companies
              </CardTitle>
              <p className="text-xs text-slate-400 mt-0.5">
                Click the <Pin className="w-3 h-3 inline text-slate-500" /> icon in the table to pin up to 3 companies
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md">
              {pinnedCompanies.length} / 3
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          {pinnedCompanies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-slate-200 rounded-xl gap-3">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                <Pin className="w-5 h-5 text-slate-300" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-slate-500">No pinned companies</p>
                <p className="text-xs text-slate-400 mt-1">Use the <Pin className="w-3 h-3 inline" /> icon in the table to track 1 to 3 companies</p>
              </div>
            </div>
          ) : (
            <div className={`grid gap-3 ${pinnedCompanies.length === 1 ? "grid-cols-1" : pinnedCompanies.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-3"}`}>
              {pinnedCompanies.map((name) => {
                const p = players.find((pl) => pl.name === name);
                if (!p) return null;
                const change = liveData[p.ticker]?.change_percent ?? p.change_percent;
                const isPos = change >= 0;
                const priv = isPrivate(p.ticker);
                const flagUrl = getFlag(p.country);
                const isLarge = pinnedCompanies.length === 1;
                return (
                  <button
                    key={name}
                    onClick={() => setSelectedPlayer(p)}
                    className="relative flex items-center gap-4 p-5 rounded-2xl bg-white border-2 border-blue-200 hover:border-blue-400 hover:shadow-md transition-all text-left border-t-4 border-t-blue-700"
                  >
                    <button
                      onClick={(e) => togglePin(e, name)}
                      title="Unpin"
                      className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <LogoWithFallback
                      name={p.name}
                      urls={getLogoUrls(p.name)}
                      sizeClass={isLarge ? "w-16 h-16" : "w-12 h-12"}
                      textClass={isLarge ? "text-lg" : "text-sm"}
                      rounded="rounded-2xl"
                    />
                    <div className="flex-1 min-w-0 pr-8">
                      <div className="flex items-center gap-2 mb-1">
                        {flagUrl && <img src={flagUrl} alt={p.country} className="w-4 h-3 rounded-sm object-cover" />}
                        <span className="text-[10px] text-slate-500 font-mono">{p.country}</span>
                      </div>
                      <p className={`font-heading font-bold text-slate-900 truncate ${isLarge ? "text-xl" : "text-base"}`}>{p.name}</p>
                      <p className="text-xs font-mono text-slate-500 mt-0.5">{priv ? "Private" : p.ticker}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`font-mono font-bold text-blue-800 ${isLarge ? "text-3xl" : "text-xl"}`}>${p.market_cap}B</p>
                      {!priv && (
                        <span className={`text-sm font-mono font-semibold mt-1 inline-block ${isPos ? "text-emerald-600" : "text-rose-600"}`}>
                          {isPos ? "+" : ""}{change.toFixed(2)}%
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Filters ── */}
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Company, ticker, segment…"
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
              <SelectItem key={c.value} value={c.value} className="text-slate-700 focus:bg-slate-50">{c.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedSegment} onValueChange={setSelectedSegment}>
          <SelectTrigger className="w-full sm:w-48 bg-white border-slate-200 text-slate-700" data-testid="segment-filter">
            <SelectValue placeholder="Segment" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200">
            {SEGMENTS.map(s => (
              <SelectItem key={s.value} value={s.value} className="text-slate-700 focus:bg-slate-50">{s.label}</SelectItem>
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
              <SelectItem key={opt.value} value={opt.value} className="text-slate-700 focus:bg-slate-50">{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active filter chips */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-slate-500">{filteredPlayers.length} {filteredPlayers.length === 1 ? "company" : "companies"}</span>
        {token && (
          <button
            onClick={() => setWatchlistOnly((v) => !v)}
            className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border font-medium transition-colors ${
              watchlistOnly
                ? "bg-amber-50 text-amber-700 border-amber-300"
                : "bg-white text-slate-500 border-slate-200 hover:border-amber-300 hover:text-amber-600"
            }`}
          >
            <Star className={`w-3 h-3 ${watchlistOnly ? "fill-amber-500 text-amber-500" : ""}`} />
            Watchlist {watchlist.size > 0 && `(${watchlist.size})`}
          </button>
        )}
        {selectedSegment !== "all" && (
          <span className="flex items-center gap-1 text-xs bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-full font-medium">
            {SEGMENTS.find(s => s.value === selectedSegment)?.label}
            <button onClick={() => setSelectedSegment("all")} className="hover:text-slate-900 ml-0.5"><X className="w-3 h-3" /></button>
          </span>
        )}
        {selectedCountry !== "all" && (
          <span className="flex items-center gap-1 text-xs bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-full font-medium">
            {selectedCountry}
            <button onClick={() => setSelectedCountry("all")} className="hover:text-slate-900 ml-0.5"><X className="w-3 h-3" /></button>
          </span>
        )}
      </div>

      {/* ── Players Table ── */}
      <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          {/* Mobile card list — shown below md, replaces the wide table */}
          <div className="md:hidden divide-y divide-slate-100" data-testid="players-cards">
            {paginatedPlayers.map((player, idx) => {
              const flagUrl = getFlag(player.country);
              const live = liveData[player.ticker];
              const displayPrice = live?.price ?? player.stock_price;
              const displayChange = live?.change_percent ?? null;
              const isPos = (displayChange ?? 0) >= 0;
              const priv = isPrivate(player.ticker);
              return (
                <div
                  key={player.id}
                  className="flex items-center gap-3 p-3 active:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => setChartPlayer(player)}
                  data-testid={`player-card-${player.id}`}
                >
                  <span className="text-xs font-mono text-slate-300 w-5 shrink-0 text-right">
                    {(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}
                  </span>
                  <LogoWithFallback name={player.name} urls={getLogoUrls(player.name)} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate leading-tight">{player.name}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      {flagUrl && <img src={flagUrl} alt={player.country} className="w-3.5 h-2.5 object-cover rounded-sm" />}
                      <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-1.5 py-px rounded">{player.ticker}</span>
                      <span className="text-[10px] text-slate-400 font-mono">${player.market_cap}B cap</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-mono text-sm font-semibold text-slate-900">
                      {priv ? "Private" : displayPrice > 0 ? `$${displayPrice.toFixed(2)}` : "—"}
                    </p>
                    {priv ? (
                      <span className="text-[11px] text-slate-400">—</span>
                    ) : displayChange === null ? (
                      liveLoading
                        ? <span className="inline-block w-12 h-4 bg-slate-100 rounded-full animate-pulse mt-1" />
                        : <span className="text-[11px] text-slate-400">—</span>
                    ) : (
                      <button
                        className={`inline-flex items-center gap-0.5 font-mono text-xs px-1.5 py-0.5 rounded-full mt-1 ${
                          isPos ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50"
                        }`}
                        onClick={(e) => { e.stopPropagation(); setChartPlayer(player); }}
                        title="View price chart"
                      >
                        {isPos ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                        {isPos ? "+" : ""}{displayChange.toFixed(2)}%
                      </button>
                    )}
                  </div>
                  <button
                    onClick={(e) => togglePin(e, player.name)}
                    title={pinnedCompanies.includes(player.name) ? "Unpin" : "Pin"}
                    disabled={!pinnedCompanies.includes(player.name) && pinnedCompanies.length >= 3}
                    className={`p-1.5 rounded shrink-0 transition-colors ${
                      pinnedCompanies.includes(player.name)
                        ? "text-slate-800"
                        : pinnedCompanies.length >= 3
                        ? "text-slate-200"
                        : "text-slate-300"
                    }`}
                  >
                    <Pin className={`w-4 h-4 ${pinnedCompanies.includes(player.name) ? "fill-slate-800" : ""}`} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Desktop table — shown at md and up */}
          <div className="hidden md:block overflow-x-auto" data-testid="players-table">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 p-4 w-16"></th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Company</th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Ticker</th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Stock Price</th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Market Cap</th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Revenue</th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">
                    Change
                    <span className="ml-1 text-slate-400 normal-case font-normal">(click for chart)</span>
                  </th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Specializations</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPlayers.map((player, idx) => {
                  const flagUrl = getFlag(player.country);
                  const live = liveData[player.ticker];
                  const displayPrice = live?.price ?? player.stock_price;
                  const displayChange = live?.change_percent ?? null;
                  const isPos = (displayChange ?? 0) >= 0;
                  const priceChanged = live?.price != null && Math.abs(live.price - player.stock_price) > 0.01;

                  return (
                    <tr
                      key={player.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                      onClick={() => setChartPlayer(player)}
                      data-testid={`player-row-${player.id}`}
                    >
                      {/* Pin + Watchlist */}
                      <td className="p-4 w-16">
                        <div className="flex items-center gap-0.5">
                          <button
                            onClick={(e) => togglePin(e, player.name)}
                            title={
                              pinnedCompanies.includes(player.name) ? "Unpin"
                              : pinnedCompanies.length >= 3 ? "Maximum 3 companies pinned"
                              : "Pin"
                            }
                            disabled={!pinnedCompanies.includes(player.name) && pinnedCompanies.length >= 3}
                            className={`p-1 rounded transition-colors ${
                              pinnedCompanies.includes(player.name)
                                ? "text-slate-800 hover:text-slate-900"
                                : pinnedCompanies.length >= 3
                                ? "text-slate-200 cursor-not-allowed"
                                : "text-slate-300 hover:text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            <Pin className={`w-3.5 h-3.5 ${pinnedCompanies.includes(player.name) ? "fill-slate-800" : ""}`} />
                          </button>
                          {token && (
                            <button
                              onClick={(e) => toggleWatch(e, player.name)}
                              title={watchlist.has(player.name) ? "Remove from watchlist" : "Add to watchlist"}
                              className="p-1 rounded hover:bg-amber-50 transition-colors"
                            >
                              <Star className={`w-3.5 h-3.5 transition-colors ${watchlist.has(player.name) ? "fill-amber-400 text-amber-400" : "text-slate-300 hover:text-amber-400"}`} />
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Company */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 bg-slate-100 rounded-lg flex items-center justify-center text-xs font-mono text-slate-500 font-medium shrink-0">
                            {(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}
                          </span>
                          <button
                            onClick={(e) => { e.stopPropagation(); setProfileName(player.name); }}
                            className="flex items-center gap-2.5 group text-left"
                            title={`View ${player.name} profile`}
                          >
                            <LogoWithFallback name={player.name} urls={getLogoUrls(player.name)} />
                            <div>
                              <p className="text-slate-900 group-hover:text-slate-700 font-medium text-sm transition-colors">{player.name}</p>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                {flagUrl && <img src={flagUrl} alt={player.country} className="w-4 h-3 object-cover rounded-sm" />}
                                <span className="text-xs text-slate-500">{player.country}</span>
                              </div>
                            </div>
                          </button>
                        </div>
                      </td>

                      {/* Ticker */}
                      <td className="p-4">
                        <span className="font-mono text-sm text-slate-700 font-medium bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                          {player.ticker}
                        </span>
                      </td>

                      {/* Stock Price */}
                      <td className="p-4 text-right">
                        {isPrivate(player.ticker) ? (
                          <span className="font-mono text-sm text-slate-400">Private</span>
                        ) : (
                          <span className="font-mono text-sm font-medium text-slate-900">
                            {displayPrice > 0 ? `$${displayPrice.toFixed(2)}` : "—"}
                            {priceChanged && <span className="ml-1 text-xs text-slate-500">live</span>}
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

                      {/* Change */}
                      <td className="p-4 text-right">
                        {isPrivate(player.ticker) ? (
                          <span className="text-slate-400 text-sm">—</span>
                        ) : displayChange === null ? (
                          liveLoading
                            ? <span className="inline-block w-12 h-5 bg-slate-100 rounded-full animate-pulse" />
                            : <span className="text-slate-400 text-sm">—</span>
                        ) : (
                          <button
                            className={`inline-flex items-center gap-1 font-mono text-sm px-2 py-0.5 rounded-full transition-all hover:scale-105 hover:shadow-md cursor-pointer ${
                              isPos
                                ? "text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                                : "text-rose-700 bg-rose-50 hover:bg-rose-100"
                            }`}
                            onClick={(e) => { e.stopPropagation(); setChartPlayer(player); }}
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
                            <span key={i} className={`text-xs border px-2 py-0.5 rounded-full font-medium ${specTagColor(spec)}`}>
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
              <p className="text-xs text-slate-500">
                {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredPlayers.length)} of {filteredPlayers.length} companies
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                  .reduce((acc, p, i, arr) => {
                    if (i > 0 && p - arr[i - 1] > 1) acc.push("...");
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((item, i) =>
                    item === "..." ? (
                      <span key={`ellipsis-${i}`} className="px-1 text-slate-400 text-sm">…</span>
                    ) : (
                      <button
                        key={item}
                        onClick={() => setCurrentPage(item)}
                        className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                          item === currentPage
                            ? "bg-slate-900 text-white"
                            : "border border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-900"
                        }`}
                      >
                        {item}
                      </button>
                    )
                  )}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Stock Chart Modal ── */}
      {chartPlayer && (
        <StockChartModal player={chartPlayer} liveData={liveData} onClose={() => setChartPlayer(null)} />
      )}

      {/* ── Player Detail Modal ── */}
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
                <LogoWithFallback
                  name={selectedPlayer.name}
                  urls={getLogoUrls(selectedPlayer.name)}
                  sizeClass="w-14 h-14"
                  textClass="text-sm"
                  rounded="rounded-xl"
                />
                <div>
                  <CardTitle className="font-heading text-xl text-slate-900">{selectedPlayer.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    {getFlag(selectedPlayer.country) && (
                      <img src={getFlag(selectedPlayer.country)} alt={selectedPlayer.country} className="w-5 h-4 object-cover rounded-sm" />
                    )}
                    <span className="text-sm text-slate-500">{selectedPlayer.country}</span>
                    <span className="text-slate-300">•</span>
                    <span className="font-mono text-sm text-slate-700 font-medium">{selectedPlayer.ticker}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-blue-700">STOCK PRICE</p>
                  <p className="text-xl font-mono font-bold text-slate-900 mt-1">
                    {(() => {
                      const live = liveData[selectedPlayer.ticker];
                      const price = live?.price ?? selectedPlayer.stock_price;
                      return price > 0 ? `$${price.toFixed(2)}` : "Private";
                    })()}
                  </p>
                  {liveData[selectedPlayer.ticker] && (
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
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
                            className="text-xs text-blue-800 hover:text-blue-900 underline mt-1 cursor-pointer"
                            onClick={() => { setSelectedPlayer(null); setChartPlayer(selectedPlayer); }}
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
                    <span key={idx} className={`text-sm border px-3 py-1 rounded-full font-medium ${specTagColor(spec)}`}>
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => { setSelectedPlayer(null); setProfileName(selectedPlayer.name); }}
                className="w-full flex items-center justify-center gap-2 bg-blue-800 hover:bg-blue-900 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
              >
                <UserCircle className="w-4 h-4" />
                View Full Company Profile
              </button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── Company Profile Sheet ── */}
      <CompanyProfileSheet name={profileName} onClose={() => setProfileName(null)} />
    </div>
  );
}
