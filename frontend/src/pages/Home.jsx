import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "@/App";
import { getLogoUrls } from "@/lib/companyLogos";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Globe,
  Handshake,
  TrendingUp,
  Activity,
  Package,
  Lock,
  ArrowRight,
  Newspaper,
} from "lucide-react";

// ── Helpers ──────────────────────────────────────────────────────────────────
const isPrivate = (ticker) => !ticker || ticker === "Private" || ticker.includes("PRIV");

// Colours/labels for each catalyst category (same look as the Market page).
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

// Guess a catalyst category from the headline keywords.
function deriveCatalystCategory(title = "") {
  const t = title.toLowerCase();
  if (/\b(contract|award|bid|tender|procurement)\b/.test(t))    return "contract";
  if (/\b(earn|revenue|profit|quarter|eps|guidance)\b/.test(t)) return "earnings";
  if (/\b(ipo|listing|goes public|float)\b/.test(t))            return "ipo";
  if (/\b(merger|acqui|takeover|buyout|M&A)\b/.test(t))         return "acquisition";
  if (/\b(partner|joint venture|teaming|agreement|alliance)\b/.test(t)) return "partnership";
  return "product";
}

const COUNTRY_FLAGS = {
  "USA": "us", "UK": "gb", "France": "fr", "Germany": "de", "Italy": "it",
  "EU": "eu", "Spain": "es", "Sweden": "se", "Norway": "no", "Israel": "il",
  "Japan": "jp", "South Korea": "kr", "India": "in", "Australia": "au",
  "Brazil": "br", "Canada": "ca", "Turkey": "tr", "UAE": "ae", "Singapore": "sg",
  "China": "cn", "Russia": "ru", "Poland": "pl", "Czech Republic": "cz",
  "Switzerland": "ch", "Netherlands": "nl", "Belgium": "be", "Finland": "fi",
  "South Africa": "za", "Saudi Arabia": "sa",
};
function getFlag(country) {
  const code = COUNTRY_FLAGS[country];
  return code ? `https://flagcdn.com/w40/${code}.png` : null;
}

function relativeTime(isoStr) {
  if (!isoStr) return "recent";
  const diff = Date.now() - new Date(isoStr).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return "< 1h ago";
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function initials(name = "") {
  return name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

// Company logo with graceful fallback to coloured initials.
function CompanyLogo({ name }) {
  const urls = getLogoUrls(name);
  const [idx, setIdx] = useState(0);
  if (!urls.length || idx >= urls.length) {
    return (
      <div className="w-7 h-7 bg-slate-700 rounded-md flex items-center justify-center shrink-0">
        <span className="text-[9px] font-bold text-white tracking-tight">{initials(name)}</span>
      </div>
    );
  }
  return (
    <img
      src={urls[idx]}
      alt={name}
      className="w-7 h-7 rounded-md object-contain bg-white border border-slate-100 shrink-0"
      onError={() => setIdx((i) => i + 1)}
    />
  );
}

// ── Shortcut tiles ───────────────────────────────────────────────────────────
const SHORTCUTS = [
  { to: "/", icon: TrendingUp, label: "Market Activity", desc: "Live stock prices & leaders" },
  { to: "/announcements", icon: Activity, label: "Announcements", desc: "Latest defense intel" },
  { to: "/ma-activity", icon: Handshake, label: "M&A Activity", desc: "Mergers & acquisitions" },
  { to: "/private-players", icon: Lock, label: "Defense Players", desc: "Companies we track" },
  { to: "/expenditures", icon: Globe, label: "Countries", desc: "Defense budgets by country" },
  { to: "/products", icon: Package, label: "Products", desc: "Weapons & systems catalog" },
];

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [catalysts, setCatalysts] = useState([]);
  const [catalystsLoading, setCatalystsLoading] = useState(true);
  const [catalystWindow, setCatalystWindow] = useState("recent");
  const [liveData, setLiveData] = useState({});
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);

  // 1) Load listed companies (needed to link news → a company).
  useEffect(() => {
    axios.get(`${API}/defense-players`)
      .then((res) => setPlayers(res.data.filter((p) => !isPrivate(p.ticker))))
      .catch(() => setPlayers([]));
  }, []);

  // 2) Latest intel — generic news feed (with images), independent of players.
  useEffect(() => {
    axios.get(`${API}/news?limit=5&hours=48`)
      .then((res) => setNews(res.data || []))
      .catch(() => setNews([]))
      .finally(() => setNewsLoading(false));
  }, []);

  // 3) Market Catalysts — news matched to a listed company, like the Market page.
  useEffect(() => {
    if (!players.length) return;
    const listedMap = {};
    players.forEach((p) => { listedMap[p.name.toLowerCase()] = p; });

    const tryWindow = (hours) =>
      axios.get(`${API}/news`, { params: { hours, limit: 80, language: "en" } })
        .then((res) => {
          const out = [];
          for (const a of res.data) {
            const companyNames = Array.isArray(a.companies) ? a.companies : [];
            let player = null;
            for (const cname of companyNames) {
              const key = cname.toLowerCase();
              player = listedMap[key] ?? players.find((p) =>
                p.name.toLowerCase().includes(key) || key.includes(p.name.toLowerCase())
              );
              if (player) break;
            }
            if (!player) continue;
            out.push({ ...a, date: a.publishedAt, category: deriveCatalystCategory(a.title), _player: player });
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
    tryWindow(48)
      .then((r48) => {
        if (r48.length > 0) { setCatalysts(r48); setCatalystWindow("last 48h"); return; }
        return tryWindow(168).then((r7) => {
          setCatalysts(r7); setCatalystWindow(r7.length > 0 ? "last 7 days" : "recent");
        });
      })
      .catch(() => setCatalysts([]))
      .finally(() => setCatalystsLoading(false));
  }, [players]);

  // 4) Live prices for the matched companies (small set — one request).
  useEffect(() => {
    const tickers = catalysts.map((c) => c._player?.ticker).filter(Boolean);
    if (!tickers.length) return;
    axios.get(`${API}/stock-prices?tickers=${tickers.join(",")}`)
      .then((res) => setLiveData(res.data || {}))
      .catch(() => {});
  }, [catalysts]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. Market Catalysts banner */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <Activity className="w-4 h-4 text-blue-800" />
            <CardTitle className="font-heading text-lg text-slate-900">Market Catalysts</CardTitle>
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              {catalystWindow} · listed companies
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
                  <a
                    key={i}
                    href={catalyst.url || undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block rounded-xl border border-slate-100 overflow-hidden hover:shadow-md hover:border-slate-200 transition-all cursor-pointer group"
                  >
                    <div className={`h-1 w-full ${cfg.bar}`} />
                    <div className="p-4">
                      <span className={`inline-block text-[10px] font-bold tracking-widest px-2.5 py-0.5 rounded-full mb-3 ${cfg.bg} ${cfg.text}`}>
                        {cfg.label}
                      </span>
                      <div className="flex items-center gap-2 mb-3">
                        <CompanyLogo name={player.name} />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-slate-700 truncate leading-none">{player.name}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span className="font-mono text-[10px] text-slate-400 bg-slate-100 px-1 py-px rounded">{player.ticker}</span>
                            {flagUrl && <img src={flagUrl} alt={player.country} className="w-3.5 h-2.5 object-cover rounded-sm" />}
                          </div>
                        </div>
                        <span className={`text-xs font-mono font-bold shrink-0 ${isPos ? "text-emerald-600" : "text-rose-600"}`}>
                          {isPos ? "+" : ""}{Number(change).toFixed(2)}%
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-900 leading-snug line-clamp-2 group-hover:text-blue-800 transition-colors">
                        {catalyst.title}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-2.5 flex items-center gap-1.5">
                        <span>{catalyst.source}</span>
                        <span className="text-slate-200">·</span>
                        <span>{relativeTime(catalyst.date)}</span>
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 2. Quick access shortcuts */}
      <div>
        <h2 className="font-heading text-lg font-bold text-slate-900 mb-3">Quick access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SHORTCUTS.map(({ to, icon: Icon, label, desc }) => (
            <Link key={label} to={to}>
              <Card className="bg-white border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 cursor-pointer group h-full">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-blue-800" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-semibold text-slate-900">{label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-700 transition-colors shrink-0" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. Latest intel — with article images */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-heading text-lg font-bold text-slate-900">Latest intel</h2>
          <Link to="/announcements" className="text-xs text-blue-700 hover:text-blue-900 flex items-center gap-1 font-medium">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-0">
            {news.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm flex flex-col items-center gap-2">
                <Newspaper className="w-6 h-6 text-slate-300" />
                {newsLoading ? "Loading latest news…" : "No recent news available."}
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {news.map((item, idx) => (
                  <a
                    key={item.url || idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 hover:bg-slate-50 transition-colors group"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-100 flex items-center justify-center">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling && (e.target.nextSibling.style.display = "flex");
                          }}
                        />
                      ) : null}
                      <div
                        className="w-full h-full items-center justify-center"
                        style={{ display: item.image ? "none" : "flex" }}
                      >
                        <Newspaper className="w-5 h-5 text-slate-300" />
                      </div>
                    </div>
                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 line-clamp-2 leading-snug group-hover:text-slate-900 transition-colors">
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1.5">
                        <span>{item.source || "—"}</span>
                        {item.publishedAt && (
                          <>
                            <span className="text-slate-200">·</span>
                            <span>{relativeTime(item.publishedAt)}</span>
                          </>
                        )}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
