import { useEffect, useState } from "react";
import axios from "axios";
import { API, useAuth } from "@/App";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
  DollarSign,
  Globe,
  Building2,
  Handshake,
  TrendingUp,
  Activity,
  Package,
  Lock,
  ArrowRight,
  Newspaper,
} from "lucide-react";

// ── Greeting based on the time of day ────────────────────────────────────────
// Returns a friendly "Good morning / afternoon / evening" depending on the hour.
function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

// ── Shortcut tiles ───────────────────────────────────────────────────────────
// Each tile is a big clickable card that leads to a main section of the app.
const SHORTCUTS = [
  { to: "/", icon: TrendingUp, label: "Market Activity", desc: "Live stock prices & leaders" },
  { to: "/announcements", icon: Activity, label: "Announcements", desc: "Latest defense intel" },
  { to: "/ma-activity", icon: Handshake, label: "M&A Activity", desc: "Mergers & acquisitions" },
  { to: "/private-players", icon: Lock, label: "Defense Players", desc: "Companies we track" },
  { to: "/expenditures", icon: Globe, label: "Countries", desc: "Defense budgets by country" },
  { to: "/products", icon: Package, label: "Products", desc: "Weapons & systems catalog" },
];

export default function Home() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [statsRes, newsRes] = await Promise.all([
          axios.get(`${API}/dashboard/stats`),
          axios.get(`${API}/news?limit=4&hours=48`).catch(() => ({ data: [] })),
        ]);
        if (!active) return;
        setStats(statsRes.data);
        setNews(newsRes.data || []);
      } catch {
        // keep page usable even if stats fail to load
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. Welcome header */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">
          {greeting()}{user?.name ? `, ${user.name.split(" ")[0]}` : ""} 👋
        </h1>
        <p className="text-slate-500 text-sm mt-1">{today} · Here's your defense intelligence snapshot</p>
      </div>

      {/* 2. Key figures */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="TOTAL MARKET CAP"
          value={loading ? "…" : `$${(stats?.total_market_cap || 0).toFixed(1)}B`}
          icon={DollarSign}
          to="/"
        />
        <StatCard
          label="GLOBAL EXPENDITURE"
          value={loading ? "…" : `$${(stats?.total_expenditure || 0).toFixed(0)}B`}
          icon={Globe}
          to="/expenditures"
        />
        <StatCard
          label="TRACKED PLAYERS"
          value={loading ? "…" : (stats?.players_count ?? 0)}
          icon={Building2}
          to="/private-players"
        />
        <StatCard
          label="M&A TRACKED"
          value={loading ? "…" : (stats?.ma_count ?? 0)}
          icon={Handshake}
          to="/ma-activity"
        />
      </div>

      {/* 3. Quick access shortcuts */}
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

      {/* 4. Latest intel mini-list */}
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
                {loading ? "Loading latest news…" : "No recent news available."}
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {news.map((item, idx) => (
                  <a
                    key={item.url || idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-5 py-3 hover:bg-slate-50 transition-colors"
                  >
                    <p className="text-sm font-medium text-slate-800 line-clamp-2 leading-snug">{item.title}</p>
                    <p className="text-xs text-slate-400 mt-1">{item.source || "—"}</p>
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

// ── Small reusable stat card ─────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, to }) {
  return (
    <Link to={to}>
      <Card className="bg-white border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 cursor-pointer h-full">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
              <p className="text-2xl font-mono font-bold text-slate-900 mt-2">{value}</p>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Icon className="w-5 h-5 text-blue-800" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
