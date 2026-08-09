import { useEffect, useState } from "react";
import axios from "axios";
import { API, useAuth, useT } from "@/App";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Plus,
  Trash2,
  Newspaper,
  Handshake,
  Sparkles,
  Link2,
  Building2,
  Globe,
  FileText,
  Package,
  Lock,
  Database,
  RefreshCw,
  CheckCircle2,
  Rss,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Tag,
  Star,
  Flame,
  Pin,
  PinOff,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

// ── Admin Setup (role promotion) ────────────────────────────────────────────
// Shown to logged-in users who don't yet have role="admin".
// They enter the ADMIN_SETUP_KEY (or JWT_SECRET) from their Railway config.

function AdminSetup({ token }) {
  const { updateAuth } = useAuth();
  const [setupKey, setSetupKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePromote = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        `${API}/auth/promote-admin`,
        { setup_key: setupKey },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      updateAuth(res.data.access_token, res.data.user);
      toast.success("Admin access activated!");
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid setup key");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-center mb-4">
            <Lock className="w-7 h-7 text-amber-600" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-slate-900">Admin access required</h2>
          <p className="text-slate-500 text-sm mt-2 max-w-sm">
            Your account doesn't have admin privileges yet. Enter the setup key from your
            Railway environment variables (<code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">ADMIN_SETUP_KEY</code> or <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">JWT_SECRET</code>) to activate them.
          </p>
        </div>

        <form onSubmit={handlePromote} className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-4">
          <div>
            <Label className="text-slate-600 text-sm">Setup key</Label>
            <Input
              type="password"
              value={setupKey}
              onChange={(e) => setSetupKey(e.target.value)}
              placeholder="Paste your setup key…"
              className="mt-1 border-slate-200 text-slate-900"
              required
            />
          </div>
          {error && (
            <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          <Button
            type="submit"
            disabled={loading || !setupKey}
            className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "Activating…" : "Activate Admin Access"}
          </Button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-4">
          Find your key in Railway → Variables → <code className="font-mono">JWT_SECRET</code>
        </p>
      </div>
    </div>
  );
}

export default function Admin() {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState(null);
  const [refreshingImages, setRefreshingImages] = useState(false);
  const [imageRefreshResult, setImageRefreshResult] = useState(null);

  const tDbTab      = useT({ en: "Database" });
  const tDbTitle    = useT({ en: "Database Initialization" });
  const tDbDesc     = useT({ en: "Load reference data: companies, M&A, expenditures, regulations, contracts, products." });
  const tNote1      = useT({ en: "• Idempotent — existing entries are not overwritten" });
  const tNote2      = useT({ en: "• M&A records are upserted (existing data enriched)" });
  const tNote3      = useT({ en: "• Admin role required" });
  const tSeedBtn    = useT({ en: "Initialize Database" });
  const tSeeding    = useT({ en: "Initializing…" });
  const tSeedOk     = useT({ en: "Success" });
  const tCompanies  = useT({ en: "companies" });
  const tAnnoun     = useT({ en: "announcements" });
  const tContracts  = useT({ en: "contracts" });

  const authHeaders = {
    Authorization: `Bearer ${token}`
  };

  const handleSeed = async () => {
    setSeeding(true);
    setSeedResult(null);
    try {
      const res = await axios.post(`${API}/seed-data`, {}, { headers: authHeaders });
      setSeedResult({ ok: true, data: res.data });
      toast.success(tSeedOk);
    } catch (err) {
      const msg = err.response?.data?.detail || err.message;
      setSeedResult({ ok: false, msg });
      toast.error(msg);
    } finally {
      setSeeding(false);
    }
  };

  const handleRefreshImages = async () => {
    setRefreshingImages(true);
    setImageRefreshResult(null);
    try {
      const res = await axios.post(`${API}/admin/refresh-article-images`, {}, { headers: authHeaders });
      setImageRefreshResult({ ok: true, updated: res.data.updated, processed: res.data.processed });
      toast.success(`${res.data.updated} images enriched`);
    } catch (err) {
      const msg = err.response?.data?.detail || err.message;
      setImageRefreshResult({ ok: false, msg });
      toast.error(msg);
    } finally {
      setRefreshingImages(false);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4" data-testid="admin-login-required">
        <Lock className="w-16 h-16 text-slate-400" />
        <h2 className="font-heading text-xl text-slate-900">Authentication Required</h2>
        <p className="text-slate-500 text-center max-w-md">
          Please login to access the admin panel and manage defense industry data.
        </p>
        <Link to="/login">
          <Button className="bg-slate-900 hover:bg-slate-800">
            Login to Continue
          </Button>
        </Link>
      </div>
    );
  }

  if (user.role !== "admin") {
    return <AdminSetup token={token} />;
  }

  return (
    <div data-testid="admin-page" className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">
          Admin Panel
        </h1>
        <p className="text-slate-500 text-sm mt-1">Manage Defense Industry Data</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="announcements" className="space-y-6">
        <TabsList className="bg-slate-100 border border-slate-200 p-1 flex-wrap h-auto gap-1">
          <TabsTrigger value="database" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Database className="w-4 h-4 mr-2" />
            {tDbTab}
          </TabsTrigger>
          <TabsTrigger value="announcements" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Newspaper className="w-4 h-4 mr-2" />
            Announcements
          </TabsTrigger>
          <TabsTrigger value="ma" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Handshake className="w-4 h-4 mr-2" />
            M&A
          </TabsTrigger>
          <TabsTrigger value="players" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Building2 className="w-4 h-4 mr-2" />
            Players
          </TabsTrigger>
          <TabsTrigger value="expenditures" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Globe className="w-4 h-4 mr-2" />
            Expenditures
          </TabsTrigger>
          <TabsTrigger value="regulations" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <FileText className="w-4 h-4 mr-2" />
            Regulations
          </TabsTrigger>
          <TabsTrigger value="products" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Package className="w-4 h-4 mr-2" />
            Products
          </TabsTrigger>
          <TabsTrigger value="news-feed" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Rss className="w-4 h-4 mr-2" />
            News Feed
          </TabsTrigger>
        </TabsList>

        {/* Database Tab */}
        <TabsContent value="database">
          <div className="space-y-6 max-w-2xl">
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Database className="w-5 h-5 text-slate-700" />
                </div>
                <div>
                  <h3 className="text-slate-900 font-semibold">{tDbTitle}</h3>
                  <p className="text-slate-500 text-sm">{tDbDesc}</p>
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-500 space-y-1">
                <p>{tNote1}</p>
                <p>{tNote2}</p>
                <p>{tNote3}</p>
              </div>
              <button
                onClick={handleSeed}
                disabled={seeding}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
              >
                {seeding
                  ? <><RefreshCw className="w-4 h-4 animate-spin" /> {tSeeding}</>
                  : <><Database className="w-4 h-4" /> {tSeedBtn}</>
                }
              </button>
              {seedResult && (
                <div className={`flex items-start gap-2 text-sm rounded-lg p-3 border ${
                  seedResult.ok
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                    : "bg-rose-50 border-rose-200 text-rose-600"
                }`}>
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                  {seedResult.ok ? (
                    <span>
                      {tSeedOk} — {seedResult.data.companies} {tCompanies} · {seedResult.data.announcements} {tAnnoun} · {seedResult.data.contracts} {tContracts}
                    </span>
                  ) : (
                    <span>{seedResult.msg}</span>
                  )}
                </div>
              )}
            </div>

            {/* Article Image Enrichment */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <ImageIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-slate-900 font-semibold">Article Image Enrichment</h3>
                  <p className="text-slate-500 text-sm">Fetch missing illustrations for news articles from their source pages (OG images).</p>
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-500 space-y-1">
                <p>• Scans up to 500 articles without images</p>
                <p>• Fetches the Open Graph image from each article page</p>
                <p>• Results are cached in the database permanently</p>
              </div>
              <button
                onClick={handleRefreshImages}
                disabled={refreshingImages}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
              >
                {refreshingImages
                  ? <><RefreshCw className="w-4 h-4 animate-spin" /> Enriching images…</>
                  : <><ImageIcon className="w-4 h-4" /> Refresh Article Images</>
                }
              </button>
              {imageRefreshResult && (
                <div className={`flex items-start gap-2 text-sm rounded-lg p-3 border ${
                  imageRefreshResult.ok
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                    : "bg-rose-50 border-rose-200 text-rose-600"
                }`}>
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                  {imageRefreshResult.ok ? (
                    <span>{imageRefreshResult.updated} images added out of {imageRefreshResult.processed} articles processed</span>
                  ) : (
                    <span>{imageRefreshResult.msg}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Announcements Tab */}
        <TabsContent value="announcements">
          <AnnouncementsAdmin authHeaders={authHeaders} />
        </TabsContent>

        {/* M&A Tab */}
        <TabsContent value="ma">
          <MAAdmin authHeaders={authHeaders} />
        </TabsContent>

        {/* Players Tab */}
        <TabsContent value="players">
          <PlayersAdmin authHeaders={authHeaders} />
        </TabsContent>

        {/* Expenditures Tab */}
        <TabsContent value="expenditures">
          <ExpendituresAdmin authHeaders={authHeaders} />
        </TabsContent>

        {/* Regulations Tab */}
        <TabsContent value="regulations">
          <RegulationsAdmin authHeaders={authHeaders} />
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products">
          <ProductsAdmin authHeaders={authHeaders} />
        </TabsContent>

        {/* News Feed Moderation Tab */}
        <TabsContent value="news-feed">
          <NewsFeedAdmin authHeaders={authHeaders} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ─── News Feed Moderation Component ──────────────────────────────────────────

const NEWS_CATEGORIES_MOD = [
  "CONTRACT", "TECHNOLOGY", "CONFLICT", "POLICY", "GEOPOLITICS", "M&A", "INDUSTRY",
];

function getCatStyle(cat) {
  switch (cat) {
    case "CONTRACT":    return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "POLICY":      return "bg-amber-50   text-amber-700   border-amber-200";
    case "M&A":         return "bg-blue-50    text-blue-700    border-blue-200";
    case "TECHNOLOGY":  return "bg-slate-100   text-slate-700   border-slate-200";
    case "CONFLICT":    return "bg-red-50     text-red-700     border-red-200";
    case "GEOPOLITICS": return "bg-sky-50     text-sky-700     border-sky-200";
    default:            return "bg-slate-100  text-slate-600   border-slate-200";
  }
}

function BreakingIntelPanel({ slots, onUnpin, actionLoading }) {
  const filled = slots.length;
  return (
    <div className="bg-white border-2 border-orange-200 rounded-xl p-5 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-50 rounded-lg">
            <Flame className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <h3 className="text-slate-900 font-semibold">Breaking Intel — Active Slots</h3>
            <p className="text-slate-500 text-sm">
              These 3 articles are featured. Slots auto-cleared at 07:05 and 19:05 UTC.
            </p>
          </div>
        </div>
        <span className={`text-sm font-bold px-3 py-1 rounded-full border ${
          filled >= 3 ? "bg-orange-100 text-orange-700 border-orange-300" :
          filled > 0  ? "bg-amber-50 text-amber-700 border-amber-200" :
                        "bg-slate-100 text-slate-500 border-slate-200"
        }`}>
          {filled}/3
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => {
          const a = slots[i];
          return (
            <div key={i} className={`rounded-xl border p-3 min-h-[80px] flex flex-col justify-between ${
              a ? "border-orange-300 bg-orange-50/40" : "border-dashed border-slate-200 bg-slate-50/50"
            }`}>
              {a ? (
                <>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500 mb-1 block">
                      Slot {i + 1}
                    </span>
                    <p className="text-slate-900 text-xs font-semibold line-clamp-2 leading-snug">{a.title}</p>
                    <p className="text-slate-400 text-[11px] mt-1">{a.source}</p>
                  </div>
                  <button
                    onClick={() => onUnpin(a.url)}
                    disabled={!!actionLoading}
                    className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-rose-500 hover:text-rose-700 transition-colors disabled:opacity-40"
                  >
                    <PinOff className="w-3 h-3" /> Remove
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 text-xs text-center gap-1 py-2">
                  <Pin className="w-4 h-4 opacity-30" />
                  <span>Slot {i + 1} — empty</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NewsFeedAdmin({ authHeaders }) {
  const [articles, setArticles]           = useState([]);
  const [loading, setLoading]             = useState(true);
  const [filter, setFilter]               = useState("all"); // all | pending | approved | rejected
  const [search, setSearch]               = useState("");
  const [actionLoading, setActionLoading] = useState(null); // url + action being updated
  const [breakingSlots, setBreakingSlots] = useState([]);   // up to 3 pinned articles
  const [scraping, setScraping]           = useState(false);
  const [scrapeResult, setScrapeResult]   = useState(null);

  const fetchArticles = async (mod) => {
    setLoading(true);
    try {
      const params = { limit: 100 };
      if (mod && mod !== "all") params.moderation = mod;
      const res = await axios.get(`${API}/admin/news`, { params, headers: authHeaders });
      setArticles(res.data);
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

  const fetchBreakingSlots = async () => {
    try {
      const res = await axios.get(`${API}/admin/breaking-intel`, { headers: authHeaders });
      setBreakingSlots(res.data);
    } catch {
      /* non-fatal */
    }
  };

  useEffect(() => {
    fetchArticles(filter);
    fetchBreakingSlots();
  }, [filter]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleScrapeNow = async () => {
    setScraping(true);
    setScrapeResult(null);
    try {
      const res = await axios.post(`${API}/admin/scrape-news`, {}, { headers: authHeaders });
      setScrapeResult({ ok: true, data: res.data });
      toast.success(`${res.data.articles_saved} articles saved (${res.data.articles_found} found)`);
      fetchArticles(filter);
    } catch (err) {
      const msg = err.response?.data?.detail || err.message;
      setScrapeResult({ ok: false, msg });
      toast.error(msg);
    } finally {
      setScraping(false);
    }
  };

  const moderate = async (url, action, category) => {
    setActionLoading(url + action);
    try {
      await axios.patch(
        `${API}/admin/news/moderate`,
        { url, action, category },
        { headers: authHeaders },
      );

      if (action === "pin") {
        // Fetch fresh slots from server
        const res = await axios.get(`${API}/admin/breaking-intel`, { headers: authHeaders });
        setBreakingSlots(res.data);
        setArticles((prev) =>
          prev.map((a) => a.url !== url ? a : { ...a, breakingIntel: true })
        );
        toast.success("Article pinned to Breaking Intel 🔥");
      } else if (action === "unpin") {
        setBreakingSlots((prev) => prev.filter((a) => a.url !== url));
        setArticles((prev) =>
          prev.map((a) => a.url !== url ? a : { ...a, breakingIntel: false })
        );
        toast.success("Article removed from Breaking Intel slots");
      } else {
        setArticles((prev) =>
          prev.map((a) => {
            if (a.url !== url) return a;
            const updated = { ...a };
            if (action === "approve")      { updated.adminApproved = true;  delete updated.adminRejected; }
            if (action === "reject")       { updated.adminRejected = true;  delete updated.adminApproved; }
            if (action === "reset")        { delete updated.adminApproved;  delete updated.adminRejected; }
            if (action === "recategorize") { updated.category = category; }
            return updated;
          })
        );
        toast.success(
          action === "approve"      ? "Article approved"          :
          action === "reject"       ? "Article removed from feed" :
          action === "reset"        ? "Moderation reset"          :
                                      `Category → ${category}`
        );
      }
    } catch (err) {
      toast.error(err.response?.data?.detail || "Action failed");
    } finally {
      setActionLoading(null);
    }
  };

  const displayed = articles.filter((a) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      a.title?.toLowerCase().includes(q) ||
      a.source?.toLowerCase().includes(q)
    );
  });

  const pendingCount  = articles.filter((a) => !a.adminApproved && !a.adminRejected).length;
  const approvedCount = articles.filter((a) =>  a.adminApproved).length;
  const rejectedCount = articles.filter((a) =>  a.adminRejected).length;

  return (
    <div className="space-y-4">

      {/* ── Breaking Intel slots panel ── */}
      <BreakingIntelPanel
        slots={breakingSlots}
        onUnpin={(url) => moderate(url, "unpin")}
        actionLoading={actionLoading}
      />

      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
        <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg">
              <Rss className="w-5 h-5 text-slate-700" />
            </div>
            <div>
              <h3 className="text-slate-900 font-semibold">News Feed Moderation</h3>
              <p className="text-slate-500 text-sm">
                Pin articles to Breaking Intel, re-categorize or remove off-topic content.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <button
              onClick={handleScrapeNow}
              disabled={scraping}
              title="Runs the scraper immediately instead of waiting for the next scheduled run (01:00 / 07:00 / 13:00 / 19:00 UTC)"
              className="flex items-center gap-2 px-3.5 py-2 bg-blue-800 hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg transition-colors"
            >
              {scraping
                ? <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Refreshing feed…</>
                : <><RefreshCw className="w-3.5 h-3.5" /> Refresh News Now</>
              }
            </button>
            {scrapeResult && (
              <span className={`text-[11px] font-medium ${scrapeResult.ok ? "text-emerald-600" : "text-rose-600"}`}>
                {scrapeResult.ok
                  ? `✓ ${scrapeResult.data.articles_saved} saved (${scrapeResult.data.articles_found} found)`
                  : scrapeResult.msg}
              </span>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { label: "All",      value: "all",      count: articles.length,  color: "bg-slate-100 text-slate-700" },
            { label: "Pending",  value: "pending",  count: pendingCount,     color: "bg-amber-50  text-amber-700" },
            { label: "Approved", value: "approved", count: approvedCount,    color: "bg-emerald-50 text-emerald-700" },
            { label: "Rejected", value: "rejected", count: rejectedCount,    color: "bg-red-50    text-red-700" },
          ].map(({ label, value, count, color }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${color} ${
                filter === value ? "border-current ring-1 ring-current" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              {label} · {count}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or source…"
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Article list */}
      <div className="space-y-2">
        {loading ? (
          <div className="text-center py-12 text-slate-400 text-sm">Loading…</div>
        ) : displayed.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">No articles found.</div>
        ) : displayed.map((article) => (
          <ArticleModerationRow
            key={article.url}
            article={article}
            actionLoading={actionLoading}
            onModerate={moderate}
            slotsCount={breakingSlots.length}
          />
        ))}
      </div>
    </div>
  );
}

function ArticleModerationRow({ article, actionLoading, onModerate, slotsCount }) {
  const [catOpen, setCatOpen] = useState(false);
  const isApproved   = !!article.adminApproved;
  const isRejected   = !!article.adminRejected;
  const isPinned     = !!article.breakingIntel;
  const slotsFull    = slotsCount >= 3;
  const busy = (action) => actionLoading === article.url + action;

  return (
    <div className={`bg-white border rounded-xl p-4 flex flex-col sm:flex-row gap-3 transition-all ${
      isPinned   ? "border-orange-300 bg-orange-50/20" :
      isApproved ? "border-emerald-300 bg-emerald-50/30" :
      isRejected ? "border-red-200   bg-red-50/20 opacity-60" :
                   "border-slate-200"
    }`}>
      {/* Thumbnail */}
      {article.image && (
        <div className="flex-shrink-0 w-full sm:w-20 h-14 sm:h-14 rounded-lg overflow-hidden bg-slate-100">
          <img src={article.image} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = "none"; }} />
        </div>
      )}

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-widest ${getCatStyle(article.category)}`}>
            {article.category || "INDUSTRY"}
          </span>
          <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wide">{article.source}</span>
          {isPinned && (
            <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 border border-orange-300">
              <Flame className="w-3 h-3" /> Breaking Intel
            </span>
          )}
          {isApproved && !isPinned && (
            <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
              <Star className="w-3 h-3" /> Validated
            </span>
          )}
          {isRejected && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-600 border border-red-200">
              Rejected
            </span>
          )}
        </div>
        <a href={article.url} target="_blank" rel="noopener noreferrer"
           className="text-slate-900 font-semibold text-sm leading-snug line-clamp-2 hover:text-slate-700 transition-colors">
          {article.title}
        </a>
        {article.summary && (
          <p className="text-slate-400 text-xs mt-1 line-clamp-1">{article.summary}</p>
        )}
        <p className="text-slate-400 text-[11px] mt-1">
          Score {article.relevanceScore ?? 0} · {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : ""}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-row sm:flex-col gap-1.5 flex-shrink-0 self-start sm:self-center">

        {/* Pin / Unpin Breaking Intel */}
        {isPinned ? (
          <button
            onClick={() => onModerate(article.url, "unpin")}
            disabled={!!actionLoading}
            title="Remove from Breaking Intel slots"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-orange-50 text-orange-600 border border-orange-300 hover:bg-orange-100 transition-all disabled:opacity-40"
          >
            {busy("unpin") ? <RefreshCw className="w-3 h-3 animate-spin" /> : <PinOff className="w-3 h-3" />}
            <span className="hidden sm:inline">Unpin</span>
          </button>
        ) : (
          <button
            onClick={() => onModerate(article.url, "pin")}
            disabled={slotsFull || !!actionLoading}
            title={slotsFull ? "3/3 slots already used — remove an article first" : "Pin to Breaking Intel"}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              slotsFull
                ? "bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed"
                : "bg-white text-orange-500 border-orange-200 hover:bg-orange-50 disabled:opacity-40"
            }`}
          >
            {busy("pin") ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Flame className="w-3 h-3" />}
            <span className="hidden sm:inline">Pin</span>
          </button>
        )}

        {/* Approve */}
        <button
          onClick={() => onModerate(article.url, "approve")}
          disabled={isApproved || !!actionLoading}
          title="Approve article"
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
            isApproved
              ? "bg-emerald-100 text-emerald-700 border-emerald-200 cursor-default"
              : "bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-50 disabled:opacity-40"
          }`}
        >
          {busy("approve") ? <RefreshCw className="w-3 h-3 animate-spin" /> : <ThumbsUp className="w-3 h-3" />}
          <span className="hidden sm:inline">Approve</span>
        </button>

        {/* Reject */}
        <button
          onClick={() => onModerate(article.url, "reject")}
          disabled={isRejected || !!actionLoading}
          title="Remove from feed"
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
            isRejected
              ? "bg-red-100 text-red-600 border-red-200 cursor-default"
              : "bg-white text-red-500 border-red-200 hover:bg-red-50 disabled:opacity-40"
          }`}
        >
          {busy("reject") ? <RefreshCw className="w-3 h-3 animate-spin" /> : <ThumbsDown className="w-3 h-3" />}
          <span className="hidden sm:inline">Reject</span>
        </button>

        {/* Reset */}
        {(isApproved || isRejected) && (
          <button
            onClick={() => onModerate(article.url, "reset")}
            disabled={!!actionLoading}
            title="Reset moderation"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 transition-all disabled:opacity-40"
          >
            {busy("reset") ? <RefreshCw className="w-3 h-3 animate-spin" /> : <RotateCcw className="w-3 h-3" />}
            <span className="hidden sm:inline">Reset</span>
          </button>
        )}

        {/* Recategorize */}
        <div className="relative">
          <button
            onClick={() => setCatOpen((o) => !o)}
            disabled={!!actionLoading}
            title="Change category"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 transition-all disabled:opacity-40"
          >
            <Tag className="w-3 h-3" />
            <span className="hidden sm:inline">Category</span>
          </button>
          {catOpen && (
            <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-slate-200 rounded-xl shadow-lg py-1 min-w-[130px]">
              {NEWS_CATEGORIES_MOD.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { onModerate(article.url, "recategorize", cat); setCatOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-semibold hover:bg-slate-100 transition-colors ${
                    article.category === cat ? "text-slate-900 bg-slate-100" : "text-slate-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Announcements Admin Component
function AnnouncementsAdmin({ authHeaders }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    content: "",
    source: "",
    category: "contract",
    company: ""
  });

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API}/announcements`);
      setItems(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/announcements`, form, { headers: authHeaders });
      toast.success("Announcement created!");
      setForm({ title: "", content: "", source: "", category: "contract", company: "" });
      fetchItems();
    } catch (err) {
      toast.error("Failed to create announcement");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/announcements/${id}`, { headers: authHeaders });
      toast.success("Announcement deleted!");
      fetchItems();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="bg-white border-slate-200">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="text-slate-900 flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add Announcement
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-slate-600">Title</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="bg-white border-slate-200 text-slate-900"
                required
              />
            </div>
            <div>
              <Label className="text-slate-600">Content</Label>
              <Textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="bg-white border-slate-200 text-slate-900"
                rows={3}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-600">Source</Label>
                <Input
                  value={form.source}
                  onChange={(e) => setForm({ ...form, source: e.target.value })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
              <div>
                <Label className="text-slate-600">Category</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger className="bg-white border-slate-200 text-slate-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="product_launch">Product Launch</SelectItem>
                    <SelectItem value="regulatory">Regulatory</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-slate-600">Company (optional)</Label>
              <Input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="bg-white border-slate-200 text-slate-900"
              />
            </div>
            <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800">
              Add Announcement
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-white border-slate-200">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="text-slate-900">Recent Announcements</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 max-h-[500px] overflow-y-auto">
          <div className="space-y-2">
            {items.slice(0, 10).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 text-sm font-medium truncate">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.category}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// M&A Admin Component
const EMPTY_FORM = {
  acquirer: "", target: "",
  deal_value: "", is_disclosed: true,
  status: "announced", deal_type: "acquisition",
  round_type: "", stake_percentage: "",
  acquirer_country: "", target_country: "",
  announced_date: new Date().toISOString().slice(0, 10),
  description: "", rationale: "", source_url: "",
};

function MAAdmin({ authHeaders }) {
  const [items,       setItems]       = useState([]);
  const [piloting,    setPiloting]    = useState(false);
  const [pilotResult, setPilotResult] = useState(null);
  const [euroSeeding, setEuroSeeding] = useState(false);
  const [euroResult,  setEuroResult]  = useState(null);
  const [ilaSeeding,  setIlaSeeding]  = useState(false);
  const [ilaResult,   setIlaResult]   = useState(null);
  const [dtSeeding,   setDtSeeding]   = useState(false);
  const [dtResult,    setDtResult]    = useState(null);
  const [form,        setForm]        = useState(EMPTY_FORM);

  // ── AI extraction state ──────────────────────────────────────────────────
  const [extractMode,    setExtractMode]    = useState("url");   // "url" | "image"
  const [extractUrl,     setExtractUrl]     = useState("");
  const [extracting,     setExtracting]     = useState(false);
  const [extractPreview, setExtractPreview] = useState(null);
  const [extractError,   setExtractError]   = useState(null);
  const [pastedImage,    setPastedImage]    = useState(null);    // { base64, mediaType, preview }

  const fetchItems = async () => {
    const res = await axios.get(`${API}/ma-activities`);
    setItems(res.data);
  };
  useEffect(() => { fetchItems(); }, []);

  // ── Paste handler for screenshots ─────────────────────────────────────────
  const handlePaste = (e) => {
    const item = [...(e.clipboardData?.items || [])].find(i => i.type.startsWith("image/"));
    if (!item) return;
    e.preventDefault();
    const file = item.getAsFile();
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      const [header, base64] = dataUrl.split(",");
      const mediaType = header.match(/:(.*?);/)[1];
      setPastedImage({ base64, mediaType, preview: dataUrl });
      setExtractError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      const [header, base64] = dataUrl.split(",");
      const mediaType = header.match(/:(.*?);/)[1];
      setPastedImage({ base64, mediaType, preview: dataUrl });
      setExtractError(null);
    };
    reader.readAsDataURL(file);
  };

  // ── AI extract ─────────────────────────────────────────────────────────────
  const handleExtract = async () => {
    setExtracting(true);
    setExtractError(null);
    setExtractPreview(null);
    try {
      const body = extractMode === "url"
        ? { url: extractUrl }
        : { image_base64: pastedImage.base64, image_media_type: pastedImage.mediaType };
      const res = await axios.post(`${API}/ma-activities/extract`, body, { headers: authHeaders });
      setExtractPreview(res.data);
    } catch (err) {
      setExtractError(err.response?.data?.detail || err.message);
    } finally {
      setExtracting(false);
    }
  };

  const applyExtracted = () => {
    if (!extractPreview) return;
    const d = extractPreview;
    setForm({
      acquirer:        d.acquirer        ?? "",
      target:          d.target          ?? "",
      deal_value:      d.deal_value      ?? "",
      is_disclosed:    d.is_disclosed    ?? true,
      status:          d.status          ?? "announced",
      deal_type:       d.deal_type       ?? "acquisition",
      round_type:      d.round_type      ?? "",
      stake_percentage:d.stake_percentage ?? "",
      acquirer_country:d.acquirer_country ?? "",
      target_country:  d.target_country  ?? "",
      announced_date:  d.announced_date  ?? new Date().toISOString().slice(0, 10),
      description:     d.description     ?? "",
      rationale:       d.rationale       ?? "",
      source_url:      d.source_url      ?? "",
    });
    setExtractPreview(null);
    toast.success("Form pre-filled — review and submit");
  };

  // ── Pilot seed ─────────────────────────────────────────────────────────────
  const handlePilotSeed = async () => {
    if (!window.confirm("Delete all M&A deals and load the 9 verified pilot deals?")) return;
    setPiloting(true); setPilotResult(null);
    try {
      const res = await axios.post(`${API}/ma-activities/seed-pilot`, {}, { headers: authHeaders });
      setPilotResult({ ok: true, data: res.data });
      toast.success(`Pilot loaded — ${res.data.deals} deals`);
      fetchItems();
    } catch (err) {
      const msg = err.response?.data?.detail || err.message;
      setPilotResult({ ok: false, msg });
      toast.error(msg);
    } finally {
      setPiloting(false);
    }
  };

  // ── Eurosatory 2026 seed (additive — does NOT wipe the collection) ──────────
  const handleEurosatorySeed = async () => {
    setEuroSeeding(true); setEuroResult(null);
    try {
      const res = await axios.post(`${API}/ma-activities/seed-eurosatory`, {}, { headers: authHeaders });
      setEuroResult({ ok: true, data: res.data });
      toast.success(`Eurosatory 2026 — ${res.data.inserted} ajoutés, ${res.data.updated} mis à jour`);
      fetchItems();
    } catch (err) {
      const msg = err.response?.data?.detail || err.message;
      setEuroResult({ ok: false, msg });
      toast.error(msg);
    } finally {
      setEuroSeeding(false);
    }
  };

  // ── ILA Berlin 2026 seed (additive — does NOT wipe the collection) ──────────
  const handleIlaSeed = async () => {
    setIlaSeeding(true); setIlaResult(null);
    try {
      const res = await axios.post(`${API}/ma-activities/seed-ila`, {}, { headers: authHeaders });
      setIlaResult({ ok: true, data: res.data });
      toast.success(`ILA Berlin 2026 — ${res.data.inserted} ajoutés, ${res.data.updated} mis à jour`);
      fetchItems();
    } catch (err) {
      const msg = err.response?.data?.detail || err.message;
      setIlaResult({ ok: false, msg });
      toast.error(msg);
    } finally {
      setIlaSeeding(false);
    }
  };

  // ── Defense-tech funding brief seed (additive — does NOT wipe the collection) ──
  const handleDefensetechSeed = async () => {
    setDtSeeding(true); setDtResult(null);
    try {
      const res = await axios.post(`${API}/ma-activities/seed-defensetech`, {}, { headers: authHeaders });
      setDtResult({ ok: true, data: res.data });
      toast.success(`Defense-tech — ${res.data.inserted} ajoutés, ${res.data.updated} mis à jour`);
      fetchItems();
    } catch (err) {
      const msg = err.response?.data?.detail || err.message;
      setDtResult({ ok: false, msg });
      toast.error(msg);
    } finally {
      setDtSeeding(false);
    }
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        deal_value:       parseFloat(form.deal_value) || 0,
        stake_percentage: form.stake_percentage !== "" ? parseFloat(form.stake_percentage) : null,
        round_type:       form.round_type  || null,
        acquirer_country: form.acquirer_country || null,
        target_country:   form.target_country   || null,
        source_url:       form.source_url  || null,
        rationale:        form.rationale   || null,
        announced_date:   form.announced_date || null,
      };
      await axios.post(`${API}/ma-activities`, payload, { headers: authHeaders });
      toast.success("Deal created!");
      setForm(EMPTY_FORM);
      fetchItems();
    } catch (err) {
      toast.error(err.response?.data?.detail || "Creation error");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/ma-activities/${id}`, { headers: authHeaders });
    toast.success("Deleted");
    fetchItems();
  };

  const f = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  return (
    <div className="space-y-6">

      {/* ── Pilot Seed ── */}
      <Card className="bg-white border-amber-200">
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-slate-900 font-semibold text-sm">M&A Pilot — 9 curated deals</p>
              <p className="text-slate-500 text-xs mt-0.5">Resets the collection with 9 verified deals.</p>
              {pilotResult && (
                <p className={`text-xs mt-1 font-medium ${pilotResult.ok ? "text-emerald-600" : "text-rose-600"}`}>
                  {pilotResult.ok ? `✓ ${pilotResult.data.deals} deals loaded` : pilotResult.msg}
                </p>
              )}
            </div>
            <button onClick={handlePilotSeed} disabled={piloting}
              className="shrink-0 flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors">
              {piloting ? <><RefreshCw className="w-4 h-4 animate-spin" /> Loading…</> : <><Database className="w-4 h-4" /> Load Pilot 9</>}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* ── Eurosatory 2026 Seed (additive) ── */}
      <Card className="bg-white border-emerald-200">
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-slate-900 font-semibold text-sm">Eurosatory 2026 — 11 deals</p>
              <p className="text-slate-500 text-xs mt-0.5">
                Ajoute les deals annoncés à Eurosatory 2026 (EOS/MARSS, EDGE/Safran,
                Rheinmetall/LIG Nex1, Eurenco/Mesko, CSG/FNSS, Renault/Thales, Thales/Hanwha…).
                N'efface rien.
              </p>
              {euroResult && (
                <p className={`text-xs mt-1 font-medium ${euroResult.ok ? "text-emerald-600" : "text-rose-600"}`}>
                  {euroResult.ok
                    ? `✓ ${euroResult.data.inserted} ajoutés, ${euroResult.data.updated} mis à jour`
                    : euroResult.msg}
                </p>
              )}
            </div>
            <button onClick={handleEurosatorySeed} disabled={euroSeeding}
              className="shrink-0 flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors">
              {euroSeeding ? <><RefreshCw className="w-4 h-4 animate-spin" /> Loading…</> : <><Database className="w-4 h-4" /> Seed Eurosatory 2026</>}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* ── ILA Berlin 2026 Seed (additive) ── */}
      <Card className="bg-white border-blue-200">
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-slate-900 font-semibold text-sm">ILA Berlin 2026 — 5 deals</p>
              <p className="text-slate-500 text-xs mt-0.5">
                Ajoute les 5 deals annoncés à l'ILA Berlin 2026 (Airbus/Diehl, Airbus
                Helicopters/Quantum Systems, Airbus/Alta Ares, Rafael/Reflex Aerospace,
                Rheinmetall/ERC System). N'efface rien.
              </p>
              {ilaResult && (
                <p className={`text-xs mt-1 font-medium ${ilaResult.ok ? "text-emerald-600" : "text-rose-600"}`}>
                  {ilaResult.ok
                    ? `✓ ${ilaResult.data.inserted} ajoutés, ${ilaResult.data.updated} mis à jour`
                    : ilaResult.msg}
                </p>
              )}
            </div>
            <button onClick={handleIlaSeed} disabled={ilaSeeding}
              className="shrink-0 flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors">
              {ilaSeeding ? <><RefreshCw className="w-4 h-4 animate-spin" /> Loading…</> : <><Database className="w-4 h-4" /> Seed ILA Berlin 2026</>}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* ── Defense-tech Funding Brief Seed (additive) ── */}
      <Card className="bg-white border-violet-200">
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-slate-900 font-semibold text-sm">Defense-tech brief — 8 deals</p>
              <p className="text-slate-500 text-xs mt-0.5">
                Ajoute les deals du brief financement defense-tech de juillet 2026
                (Space-Eyes/SPAC, Leonardo DRS/Raft, CHAOS/Atropos, K2 Space, Cathedral,
                Twenty, Agon, Array Labs). N'efface rien.
              </p>
              {dtResult && (
                <p className={`text-xs mt-1 font-medium ${dtResult.ok ? "text-emerald-600" : "text-rose-600"}`}>
                  {dtResult.ok
                    ? `✓ ${dtResult.data.inserted} ajoutés, ${dtResult.data.updated} mis à jour`
                    : dtResult.msg}
                </p>
              )}
            </div>
            <button onClick={handleDefensetechSeed} disabled={dtSeeding}
              className="shrink-0 flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors">
              {dtSeeding ? <><RefreshCw className="w-4 h-4 animate-spin" /> Loading…</> : <><Database className="w-4 h-4" /> Seed Defense-tech</>}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* ── AI Extraction ── */}
      <Card className="bg-white border-slate-300">
        <CardHeader className="border-b border-slate-100 pb-3">
          <CardTitle className="text-slate-900 flex items-center gap-2 text-base">
            <Sparkles className="w-4 h-4 text-slate-600" /> AI Extraction — URL or screenshot
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          {/* Mode toggle */}
          <div className="flex gap-2">
            {[{ k: "url", icon: Link2, label: "Article URL" }, { k: "image", icon: ImageIcon, label: "Screenshot" }].map(({ k, icon: Icon, label }) => (
              <button key={k} onClick={() => { setExtractMode(k); setExtractError(null); setExtractPreview(null); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${extractMode === k ? "bg-slate-100 border-slate-400 text-slate-900" : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                <Icon className="w-3.5 h-3.5" />{label}
              </button>
            ))}
          </div>

          {extractMode === "url" ? (
            <div className="flex gap-2">
              <Input
                placeholder="https://www.reuters.com/..."
                value={extractUrl}
                onChange={e => setExtractUrl(e.target.value)}
                className="bg-white border-slate-200 text-slate-900 flex-1"
              />
              <Button onClick={handleExtract} disabled={extracting || !extractUrl.trim()}
                className="bg-slate-900 hover:bg-slate-800 shrink-0">
                {extracting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {extracting ? "Extracting…" : "Extract"}
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <div
                onPaste={handlePaste}
                className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center cursor-default hover:border-slate-400 transition-colors"
              >
                {pastedImage ? (
                  <div className="space-y-2">
                    <img src={pastedImage.preview} alt="preview" className="max-h-40 mx-auto rounded-lg object-contain" />
                    <p className="text-xs text-emerald-600 font-medium">Image ready</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <ImageIcon className="w-8 h-8 text-slate-300 mx-auto" />
                    <p className="text-sm text-slate-500">Paste a screenshot here <span className="font-mono text-xs">(Ctrl+V)</span></p>
                    <p className="text-xs text-slate-400">ou</p>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <label className="flex-1">
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  <div className="flex items-center justify-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors">
                    <ImageIcon className="w-4 h-4" /> Choose a file
                  </div>
                </label>
                <Button onClick={handleExtract} disabled={extracting || !pastedImage}
                  className="bg-slate-900 hover:bg-slate-800 shrink-0">
                  {extracting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  {extracting ? "Extracting…" : "Extract"}
                </Button>
              </div>
            </div>
          )}

          {extractError && (
            <p className="text-rose-600 text-sm bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">{extractError}</p>
          )}

          {extractPreview && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">Extracted result — review before applying</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  ["Acquirer", extractPreview.acquirer],
                  ["Target", extractPreview.target],
                  ["Value", extractPreview.deal_value != null ? `$${extractPreview.deal_value}M` : "—"],
                  ["Status", extractPreview.status],
                  ["Type", extractPreview.deal_type],
                  ["Round", extractPreview.round_type || "—"],
                  ["Stake", extractPreview.stake_percentage ? `${extractPreview.stake_percentage}%` : "—"],
                  ["Date", extractPreview.announced_date],
                  ["Acq. country", extractPreview.acquirer_country || "—"],
                  ["Target country", extractPreview.target_country || "—"],
                ].map(([label, val]) => (
                  <div key={label} className="flex gap-1">
                    <span className="text-slate-400 shrink-0 w-20">{label}:</span>
                    <span className="text-slate-800 font-medium truncate">{val}</span>
                  </div>
                ))}
              </div>
              {extractPreview.description && (
                <p className="text-xs text-slate-600 italic border-t border-slate-200 pt-2">{extractPreview.description}</p>
              )}
              <Button onClick={applyExtracted} className="w-full bg-slate-900 hover:bg-slate-800 text-sm">
                Load into form
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* ── Add Deal Form ── */}
        <Card className="bg-white border-slate-200">
          <CardHeader className="border-b border-slate-200">
            <CardTitle className="text-slate-900 flex items-center gap-2 text-base">
              <Plus className="w-4 h-4" /> Add M&A Deal
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-slate-600 text-xs">Acquirer / Investor</Label>
                  <Input value={form.acquirer} onChange={e => f("acquirer", e.target.value)}
                    className="bg-white border-slate-200 text-slate-900 h-8 text-sm" required />
                </div>
                <div>
                  <Label className="text-slate-600 text-xs">Target / Startup</Label>
                  <Input value={form.target} onChange={e => f("target", e.target.value)}
                    className="bg-white border-slate-200 text-slate-900 h-8 text-sm" required />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label className="text-slate-600 text-xs">Value ($M)</Label>
                  <Input type="number" step="any" value={form.deal_value} onChange={e => f("deal_value", e.target.value)}
                    className="bg-white border-slate-200 text-slate-900 h-8 text-sm" />
                </div>
                <div>
                  <Label className="text-slate-600 text-xs">Stake %</Label>
                  <Input type="number" step="any" placeholder="—" value={form.stake_percentage} onChange={e => f("stake_percentage", e.target.value)}
                    className="bg-white border-slate-200 text-slate-900 h-8 text-sm" />
                </div>
                <div>
                  <Label className="text-slate-600 text-xs">Announced Date</Label>
                  <Input type="date" value={form.announced_date} onChange={e => f("announced_date", e.target.value)}
                    className="bg-white border-slate-200 text-slate-900 h-8 text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-slate-600 text-xs">Status</Label>
                  <Select value={form.status} onValueChange={v => f("status", v)}>
                    <SelectTrigger className="bg-white border-slate-200 text-slate-900 h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200">
                      {["announced","pending","under_review","completed","active","cancelled"].map(s => (
                        <SelectItem key={s} value={s} className="text-sm">{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-600 text-xs">Deal Type</Label>
                  <Select value={form.deal_type} onValueChange={v => f("deal_type", v)}>
                    <SelectTrigger className="bg-white border-slate-200 text-slate-900 h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200">
                      {["acquisition","merger","joint_venture","strategic_investment","minority_stake","funding_round"].map(t => (
                        <SelectItem key={t} value={t} className="text-sm capitalize">{t.replaceAll("_"," ")}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-slate-600 text-xs">Round (if applicable)</Label>
                  <Select value={form.round_type || "none"} onValueChange={v => f("round_type", v === "none" ? "" : v)}>
                    <SelectTrigger className="bg-white border-slate-200 text-slate-900 h-8 text-sm">
                      <SelectValue placeholder="—" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200">
                      <SelectItem value="none">—</SelectItem>
                      {["seed","series_a","series_b","series_c","series_d","growth","buyout"].map(r => (
                        <SelectItem key={r} value={r} className="text-sm capitalize">{r.replaceAll("_"," ")}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end gap-2">
                  <label className="flex items-center gap-2 cursor-pointer mb-1">
                    <input type="checkbox" checked={form.is_disclosed}
                      onChange={e => f("is_disclosed", e.target.checked)}
                      className="accent-slate-600" />
                    <span className="text-xs text-slate-600">Disclosed value</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-slate-600 text-xs">Acquirer country (ISO-2)</Label>
                  <Input placeholder="FR, US, DE…" value={form.acquirer_country} onChange={e => f("acquirer_country", e.target.value.toUpperCase().slice(0,2))}
                    className="bg-white border-slate-200 text-slate-900 h-8 text-sm font-mono" maxLength={2} />
                </div>
                <div>
                  <Label className="text-slate-600 text-xs">Target country (ISO-2)</Label>
                  <Input placeholder="FR, US, DE…" value={form.target_country} onChange={e => f("target_country", e.target.value.toUpperCase().slice(0,2))}
                    className="bg-white border-slate-200 text-slate-900 h-8 text-sm font-mono" maxLength={2} />
                </div>
              </div>

              <div>
                <Label className="text-slate-600 text-xs">Source URL</Label>
                <Input placeholder="https://…" value={form.source_url} onChange={e => f("source_url", e.target.value)}
                  className="bg-white border-slate-200 text-slate-900 h-8 text-sm" />
              </div>

              <div>
                <Label className="text-slate-600 text-xs">Description (une phrase)</Label>
                <Textarea value={form.description} onChange={e => f("description", e.target.value)}
                  className="bg-white border-slate-200 text-slate-900 text-sm" rows={2} required />
              </div>

              <div>
                <Label className="text-slate-600 text-xs">Strategic rationale (optional)</Label>
                <Textarea value={form.rationale} onChange={e => f("rationale", e.target.value)}
                  className="bg-white border-slate-200 text-slate-900 text-sm" rows={2} />
              </div>

              <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800">
                <Plus className="w-4 h-4 mr-1" /> Create deal
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* ── Recent deals list ── */}
        <Card className="bg-white border-slate-200">
          <CardHeader className="border-b border-slate-200">
            <CardTitle className="text-slate-900 text-base">Recent deals</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 max-h-[700px] overflow-y-auto">
            <div className="space-y-2">
              {items.slice(0, 20).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-900 text-sm font-medium truncate">{item.acquirer} → {item.target}</p>
                    <p className="text-xs text-slate-500">
                      {item.deal_value ? `$${item.deal_value}M` : "Undisclosed"} · {item.deal_type?.replaceAll("_"," ")} · {item.status}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}
                    className="text-rose-400 hover:text-rose-600 hover:bg-rose-50 shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Players Admin Component
function PlayersAdmin({ authHeaders }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    ticker: "",
    country: "",
    market_cap: 0,
    stock_price: 0,
    change_percent: 0,
    revenue: 0,
    employees: 0,
    specializations: []
  });
  const [specInput, setSpecInput] = useState("");

  const fetchItems = async () => {
    const res = await axios.get(`${API}/defense-players`);
    setItems(res.data);
  };

  useEffect(() => { fetchItems(); }, []);

  const addSpec = () => {
    if (specInput.trim()) {
      setForm({ ...form, specializations: [...form.specializations, specInput.trim()] });
      setSpecInput("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/defense-players`, form, { headers: authHeaders });
      toast.success("Player created!");
      setForm({ name: "", ticker: "", country: "", market_cap: 0, stock_price: 0, change_percent: 0, revenue: 0, employees: 0, specializations: [] });
      fetchItems();
    } catch (err) {
      toast.error("Failed to create");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/defense-players/${id}`, { headers: authHeaders });
    toast.success("Deleted!");
    fetchItems();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="bg-white border-slate-200">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="text-slate-900 flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add Defense Player
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-600">Company Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
              <div>
                <Label className="text-slate-600">Ticker</Label>
                <Input
                  value={form.ticker}
                  onChange={(e) => setForm({ ...form, ticker: e.target.value })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-slate-600">Country</Label>
                <Input
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
              <div>
                <Label className="text-slate-600">Market Cap (B$)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={form.market_cap}
                  onChange={(e) => setForm({ ...form, market_cap: parseFloat(e.target.value) })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
              <div>
                <Label className="text-slate-600">Stock Price ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={form.stock_price}
                  onChange={(e) => setForm({ ...form, stock_price: parseFloat(e.target.value) })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-slate-600">Change %</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={form.change_percent}
                  onChange={(e) => setForm({ ...form, change_percent: parseFloat(e.target.value) })}
                  className="bg-white border-slate-200 text-slate-900"
                />
              </div>
              <div>
                <Label className="text-slate-600">Revenue (B$)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={form.revenue}
                  onChange={(e) => setForm({ ...form, revenue: parseFloat(e.target.value) })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
              <div>
                <Label className="text-slate-600">Employees</Label>
                <Input
                  type="number"
                  value={form.employees}
                  onChange={(e) => setForm({ ...form, employees: parseInt(e.target.value) })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
            </div>
            <div>
              <Label className="text-slate-600">Specializations</Label>
              <div className="flex gap-2">
                <Input
                  value={specInput}
                  onChange={(e) => setSpecInput(e.target.value)}
                  className="bg-white border-slate-200 text-slate-900"
                  placeholder="Add specialization"
                />
                <Button type="button" onClick={addSpec} variant="secondary">Add</Button>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {form.specializations.map((s, i) => (
                  <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full border border-slate-200">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800">
              Add Player
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-white border-slate-200">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="text-slate-900">Defense Players</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 max-h-[500px] overflow-y-auto">
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.ticker} • ${item.market_cap}B</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Expenditures Admin Component
function ExpendituresAdmin({ authHeaders }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    country: "",
    country_code: "",
    year: 2024,
    expenditure: 0,
    gdp_percent: 0,
    region: ""
  });

  const fetchItems = async () => {
    const res = await axios.get(`${API}/expenditures`);
    setItems(res.data);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/expenditures`, form, { headers: authHeaders });
      toast.success("Expenditure created!");
      setForm({ country: "", country_code: "", year: 2024, expenditure: 0, gdp_percent: 0, region: "" });
      fetchItems();
    } catch (err) {
      toast.error("Failed to create");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/expenditures/${id}`, { headers: authHeaders });
    toast.success("Deleted!");
    fetchItems();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="bg-white border-slate-200">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="text-slate-900 flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add Expenditure
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-600">Country</Label>
                <Input
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
              <div>
                <Label className="text-slate-600">Country Code</Label>
                <Input
                  value={form.country_code}
                  onChange={(e) => setForm({ ...form, country_code: e.target.value })}
                  className="bg-white border-slate-200 text-slate-900"
                  maxLength={2}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-slate-600">Year</Label>
                <Input
                  type="number"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
              <div>
                <Label className="text-slate-600">Expenditure (B$)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={form.expenditure}
                  onChange={(e) => setForm({ ...form, expenditure: parseFloat(e.target.value) })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
              <div>
                <Label className="text-slate-600">% of GDP</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={form.gdp_percent}
                  onChange={(e) => setForm({ ...form, gdp_percent: parseFloat(e.target.value) })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
            </div>
            <div>
              <Label className="text-slate-600">Region</Label>
              <Select value={form.region} onValueChange={(v) => setForm({ ...form, region: v })}>
                <SelectTrigger className="bg-white border-slate-200 text-slate-900">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  <SelectItem value="North America">North America</SelectItem>
                  <SelectItem value="Europe">Europe</SelectItem>
                  <SelectItem value="Asia-Pacific">Asia-Pacific</SelectItem>
                  <SelectItem value="Middle East">Middle East</SelectItem>
                  <SelectItem value="South America">South America</SelectItem>
                  <SelectItem value="Africa">Africa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800">
              Add Expenditure
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-white border-slate-200">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="text-slate-900">Expenditure Data</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 max-h-[500px] overflow-y-auto">
          <div className="space-y-2">
            {items.slice(0, 15).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 text-sm font-medium">{item.country}</p>
                  <p className="text-xs text-slate-500">${item.expenditure}B • {item.gdp_percent}% GDP</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Regulations Admin Component
function RegulationsAdmin({ authHeaders }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    country: "",
    category: "export_control",
    description: "",
    requirements: [],
    effective_date: ""
  });
  const [reqInput, setReqInput] = useState("");

  const fetchItems = async () => {
    const res = await axios.get(`${API}/regulations`);
    setItems(res.data);
  };

  useEffect(() => { fetchItems(); }, []);

  const addReq = () => {
    if (reqInput.trim()) {
      setForm({ ...form, requirements: [...form.requirements, reqInput.trim()] });
      setReqInput("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/regulations`, form, { headers: authHeaders });
      toast.success("Regulation created!");
      setForm({ title: "", country: "", category: "export_control", description: "", requirements: [], effective_date: "" });
      fetchItems();
    } catch (err) {
      toast.error("Failed to create");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/regulations/${id}`, { headers: authHeaders });
    toast.success("Deleted!");
    fetchItems();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="bg-white border-slate-200">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="text-slate-900 flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add Regulation
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-slate-600">Title</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="bg-white border-slate-200 text-slate-900"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-600">Country</Label>
                <Input
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
              <div>
                <Label className="text-slate-600">Category</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger className="bg-white border-slate-200 text-slate-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
                    <SelectItem value="offset">Offset</SelectItem>
                    <SelectItem value="export_control">Export Control</SelectItem>
                    <SelectItem value="procurement">Procurement</SelectItem>
                    <SelectItem value="itar">ITAR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-slate-600">Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="bg-white border-slate-200 text-slate-900"
                rows={2}
                required
              />
            </div>
            <div>
              <Label className="text-slate-600">Effective Date</Label>
              <Input
                type="date"
                value={form.effective_date}
                onChange={(e) => setForm({ ...form, effective_date: e.target.value })}
                className="bg-white border-slate-200 text-slate-900"
                required
              />
            </div>
            <div>
              <Label className="text-slate-600">Requirements</Label>
              <div className="flex gap-2">
                <Input
                  value={reqInput}
                  onChange={(e) => setReqInput(e.target.value)}
                  className="bg-white border-slate-200 text-slate-900"
                  placeholder="Add requirement"
                />
                <Button type="button" onClick={addReq} variant="secondary">Add</Button>
              </div>
              <div className="space-y-1 mt-2">
                {form.requirements.map((r, i) => (
                  <p key={i} className="text-xs text-slate-500">• {r}</p>
                ))}
              </div>
            </div>
            <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800">
              Add Regulation
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-white border-slate-200">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="text-slate-900">Regulations</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 max-h-[500px] overflow-y-auto">
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 text-sm font-medium truncate">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.country} • {item.category}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Products Admin Component
function ProductsAdmin({ authHeaders }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    manufacturer: "",
    category: "aircraft",
    product_type: "",
    specifications: {},
    materials: [],
    status: "active",
    image_url: ""
  });
  const [specKey, setSpecKey] = useState("");
  const [specValue, setSpecValue] = useState("");
  const [materialInput, setMaterialInput] = useState("");

  const fetchItems = async () => {
    const res = await axios.get(`${API}/products`);
    setItems(res.data);
  };

  useEffect(() => { fetchItems(); }, []);

  const addSpec = () => {
    if (specKey.trim() && specValue.trim()) {
      setForm({ ...form, specifications: { ...form.specifications, [specKey]: specValue } });
      setSpecKey("");
      setSpecValue("");
    }
  };

  const addMaterial = () => {
    if (materialInput.trim()) {
      setForm({ ...form, materials: [...form.materials, materialInput.trim()] });
      setMaterialInput("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/products`, form, { headers: authHeaders });
      toast.success("Product created!");
      setForm({ name: "", manufacturer: "", category: "aircraft", product_type: "", specifications: {}, materials: [], status: "active", image_url: "" });
      fetchItems();
    } catch (err) {
      toast.error("Failed to create");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/products/${id}`, { headers: authHeaders });
    toast.success("Deleted!");
    fetchItems();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="bg-white border-slate-200">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="text-slate-900 flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add Product
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-600">Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
              <div>
                <Label className="text-slate-600">Manufacturer</Label>
                <Input
                  value={form.manufacturer}
                  onChange={(e) => setForm({ ...form, manufacturer: e.target.value })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-slate-600">Category</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger className="bg-white border-slate-200 text-slate-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
                    <SelectItem value="aircraft">Aircraft</SelectItem>
                    <SelectItem value="naval">Naval</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                    <SelectItem value="missile">Missile</SelectItem>
                    <SelectItem value="cyber">Cyber</SelectItem>
                    <SelectItem value="space">Space</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-slate-600">Product Type</Label>
                <Input
                  value={form.product_type}
                  onChange={(e) => setForm({ ...form, product_type: e.target.value })}
                  className="bg-white border-slate-200 text-slate-900"
                  placeholder="e.g. fighter"
                  required
                />
              </div>
              <div>
                <Label className="text-slate-600">Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger className="bg-white border-slate-200 text-slate-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-slate-600">Image URL (optional)</Label>
              <Input
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                className="bg-white border-slate-200 text-slate-900"
                placeholder="https://..."
              />
            </div>
            <div>
              <Label className="text-slate-600">Specifications</Label>
              <div className="flex gap-2">
                <Input
                  value={specKey}
                  onChange={(e) => setSpecKey(e.target.value)}
                  className="bg-white border-slate-200 text-slate-900"
                  placeholder="Key"
                />
                <Input
                  value={specValue}
                  onChange={(e) => setSpecValue(e.target.value)}
                  className="bg-white border-slate-200 text-slate-900"
                  placeholder="Value"
                />
                <Button type="button" onClick={addSpec} variant="secondary">Add</Button>
              </div>
              <div className="mt-2 space-y-1">
                {Object.entries(form.specifications).map(([k, v]) => (
                  <p key={k} className="text-xs text-slate-500">{k}: {v}</p>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-slate-600">Materials</Label>
              <div className="flex gap-2">
                <Input
                  value={materialInput}
                  onChange={(e) => setMaterialInput(e.target.value)}
                  className="bg-white border-slate-200 text-slate-900"
                  placeholder="Add material"
                />
                <Button type="button" onClick={addMaterial} variant="secondary">Add</Button>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {form.materials.map((m, i) => (
                  <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full border border-slate-200">{m}</span>
                ))}
              </div>
            </div>
            <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800">
              Add Product
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-white border-slate-200">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="text-slate-900">Products</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 max-h-[500px] overflow-y-auto">
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.manufacturer} • {item.category}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
