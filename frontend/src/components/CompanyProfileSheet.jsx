import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "@/App";
import {
  Sheet, SheetContent,
} from "@/components/ui/sheet";
import { format, formatDistanceToNow } from "date-fns";
import {
  Globe, Linkedin, MapPin, Calendar, ArrowRight, ExternalLink,
  Users, TrendingUp, DollarSign, Building2, Newspaper, X,
} from "lucide-react";

// ── helpers ────────────────────────────────────────────────────────────────

const AVATAR_COLORS = [
  "from-purple-600 to-purple-800",
  "from-blue-600 to-blue-800",
  "from-emerald-600 to-emerald-800",
  "from-amber-600 to-amber-800",
  "from-rose-600 to-rose-800",
  "from-indigo-600 to-indigo-800",
  "from-teal-600 to-teal-800",
  "from-orange-600 to-orange-800",
];

function avatarColor(name = "") {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffff;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

function initials(name = "") {
  return name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function CompanyLogo({ name, domain, size = "lg" }) {
  const [failed, setFailed] = useState(false);
  const sizeClass = size === "lg" ? "w-16 h-16" : "w-10 h-10";
  const textClass = size === "lg" ? "text-xl" : "text-sm";

  if (domain && !failed) {
    return (
      <img
        src={`https://logo.clearbit.com/${domain}`}
        alt={name}
        className={`${sizeClass} rounded-2xl object-contain bg-white border border-white/20 shadow-lg p-1.5`}
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <div className={`${sizeClass} bg-gradient-to-br ${avatarColor(name)} rounded-2xl flex items-center justify-center shadow-lg shrink-0`}>
      <span className={`${textClass} font-bold text-white tracking-tight`}>{initials(name)}</span>
    </div>
  );
}

function getStatusStyle(status) {
  switch (status) {
    case "completed":  return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "pending":    return "bg-amber-50 text-amber-700 border-amber-200";
    case "announced":  return "bg-blue-50 text-blue-700 border-blue-200";
    case "cancelled":  return "bg-rose-50 text-rose-700 border-rose-200";
    default:           return "bg-slate-100 text-slate-600 border-slate-200";
  }
}

function relativeTime(isoStr) {
  try {
    return formatDistanceToNow(new Date(isoStr), { addSuffix: true });
  } catch {
    return "";
  }
}

// ── main component ─────────────────────────────────────────────────────────

export default function CompanyProfileSheet({ name, onClose }) {
  const [data, setData]         = useState(null);
  const [loading, setLoading]   = useState(false);
  const [articles, setArticles] = useState([]);
  const [logoDomain, setLogoDomain] = useState(null);

  useEffect(() => {
    if (!name) { setData(null); setArticles([]); return; }
    setLoading(true);
    setData(null);
    setArticles([]);

    Promise.all([
      axios.get(`${API}/companies/${encodeURIComponent(name)}`),
      axios.get(`${API}/news/company?name=${encodeURIComponent(name)}&limit=5`).catch(() => ({ data: [] })),
    ])
      .then(([profileRes, newsRes]) => {
        setData(profileRes.data);
        setArticles(newsRes.data || []);
        const p = profileRes.data?.profile;
        if (p) {
          setLogoDomain(p.acquirer_logo_domain || p.target_logo_domain || null);
        }
      })
      .catch((e) => console.error("CompanyProfileSheet fetch error:", e))
      .finally(() => setLoading(false));
  }, [name]);

  const p  = data?.profile;
  const ma = data?.ma_activities ?? [];

  const resolvedDomain = logoDomain ?? (() => {
    for (const a of ma) {
      if (a.acquirer?.toLowerCase().includes(name?.toLowerCase() || "")) return a.acquirer_logo_domain;
      if (a.target?.toLowerCase().includes(name?.toLowerCase() || ""))   return a.target_logo_domain;
    }
    return null;
  })();

  return (
    <Sheet open={!!name} onOpenChange={(open) => { if (!open) onClose(); }}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto p-0 gap-0">

        {/* ── Hero Header ── */}
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900 px-6 pt-8 pb-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-4">
            <CompanyLogo name={name || ""} domain={resolvedDomain} size="lg" />
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-white leading-tight">{name}</h2>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                {p?.ticker && (
                  <span className="font-mono text-xs bg-white/15 text-white px-2 py-0.5 rounded-md border border-white/20">
                    {p.ticker}
                  </span>
                )}
                {p?.is_public !== undefined && (
                  <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${
                    p.is_public
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-slate-500/30 text-slate-300 border border-slate-500/30"
                  }`}>
                    {p.is_public ? "Public" : "Private"}
                  </span>
                )}
                {p?.headquarters && (
                  <span className="text-xs text-slate-300 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {p.headquarters}
                  </span>
                )}
              </div>
              {p?.founded_year && (
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Founded {p.founded_year}
                </p>
              )}
            </div>
          </div>

          {/* External links in header */}
          {(p?.website || p?.linkedin) && (
            <div className="flex gap-3 mt-4">
              {p.website && (
                <a
                  href={p.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white bg-white/10 hover:bg-white/20 transition-colors px-3 py-1.5 rounded-lg border border-white/10"
                >
                  <Globe className="w-3.5 h-3.5" />
                  Website
                </a>
              )}
              {p.linkedin && (
                <a
                  href={p.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white bg-white/10 hover:bg-white/20 transition-colors px-3 py-1.5 rounded-lg border border-white/10"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
              )}
            </div>
          )}
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div className="flex justify-center py-16">
            <div className="animate-spin w-7 h-7 border-2 border-purple-600 border-t-transparent rounded-full" />
          </div>
        )}

        {!loading && !p && name && (
          <div className="mt-12 text-sm text-slate-500 text-center px-6">
            No profile data available for &quot;{name}&quot;
          </div>
        )}

        {!loading && p && (
          <div className="divide-y divide-slate-100">

            {/* ── Key Metrics ── */}
            <div className="px-6 py-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Key Figures</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gradient-to-br from-purple-50 to-purple-50/50 border border-purple-100 rounded-xl p-3 text-center">
                  <div className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="w-3.5 h-3.5 text-purple-600" />
                  </div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-purple-500">Market Cap</p>
                  <p className="text-base font-bold text-slate-900 mt-0.5 font-mono">
                    {p.market_cap ? `$${p.market_cap}B` : "—"}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-50/50 border border-emerald-100 rounded-xl p-3 text-center">
                  <div className="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-emerald-500">Revenue</p>
                  <p className="text-base font-bold text-slate-900 mt-0.5 font-mono">
                    {p.revenue ? `$${p.revenue}B` : "—"}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-50/50 border border-blue-100 rounded-xl p-3 text-center">
                  <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-blue-500">Employees</p>
                  <p className="text-base font-bold text-slate-900 mt-0.5 font-mono">
                    {p.employees ? (p.employees >= 1000 ? `${(p.employees / 1000).toFixed(0)}K` : p.employees) : "—"}
                  </p>
                </div>
              </div>
            </div>

            {/* ── About ── */}
            {p.description && (
              <div className="px-6 py-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">About</p>
                <p className="text-sm text-slate-600 leading-relaxed">{p.description}</p>
              </div>
            )}

            {/* ── Specializations ── */}
            {p.specializations?.length > 0 && (
              <div className="px-6 py-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                  Products &amp; Capabilities
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.specializations.map((s) => (
                    <span
                      key={s}
                      className="text-xs bg-purple-50 text-purple-700 border border-purple-100 px-2.5 py-1 rounded-full font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ── Latest News ── */}
            <div className="px-6 py-5">
              <div className="flex items-center gap-2 mb-3">
                <Newspaper className="w-3.5 h-3.5 text-slate-400" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Latest News</p>
              </div>
              {articles.length === 0 ? (
                <p className="text-xs text-slate-400 py-2">No recent articles found.</p>
              ) : (
                <div className="space-y-1">
                  {articles.map((article, i) => (
                    <a
                      key={i}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-100"
                    >
                      {article.image && (
                        <img
                          src={article.image}
                          alt=""
                          className="w-14 h-12 object-cover rounded-lg flex-shrink-0 bg-slate-100"
                          onError={e => { e.target.style.display = "none"; }}
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 group-hover:text-purple-700 transition-colors line-clamp-2 leading-snug">
                          {article.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-slate-400 font-medium">{article.source}</span>
                          <span className="text-slate-200">·</span>
                          <span className="text-xs text-slate-400">{relativeTime(article.publishedAt)}</span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* ── M&A Activity ── */}
            {ma.length > 0 && (
              <div className="px-6 py-5">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    M&amp;A Activity
                  </p>
                </div>
                <div className="space-y-2">
                  {ma.map((a) => (
                    <div
                      key={a.id}
                      className="border border-slate-100 rounded-xl p-3.5 bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all"
                    >
                      <div className="flex justify-between items-start gap-2 mb-1.5">
                        <span className="text-xs font-semibold text-slate-800 leading-snug">
                          {a.acquirer}
                          <ArrowRight className="inline w-3 h-3 mx-1 text-slate-400" />
                          {a.target}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                          {format(new Date(a.announced_date), "MMM yyyy")}
                        </span>
                      </div>
                      {a.description && (
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{a.description}</p>
                      )}
                      <div className="flex items-center gap-3 mt-2">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getStatusStyle(a.status)}`}>
                          {a.status?.toUpperCase()}
                        </span>
                        {a.deal_value && (
                          <span className="text-[10px] text-slate-500 font-mono">${a.deal_value}B</span>
                        )}
                        {a.source_url && (
                          <a
                            href={a.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[10px] text-purple-600 hover:text-purple-800 font-medium ml-auto"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Source
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
