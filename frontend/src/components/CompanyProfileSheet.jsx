import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "@/App";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { format } from "date-fns";
import {
  Globe, Linkedin, MapPin, Calendar, ArrowRight, ExternalLink,
} from "lucide-react";

// ── helpers ────────────────────────────────────────────────────────────────

const AVATAR_COLORS = [
  "bg-purple-600", "bg-blue-600", "bg-emerald-600", "bg-amber-600",
  "bg-rose-600",   "bg-indigo-600","bg-teal-600",   "bg-orange-600",
];
function avatarColor(name = "") {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffff;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}
function initials(name = "") {
  return name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function CompanyAvatar({ name, domain }) {
  const [failed, setFailed] = useState(false);
  if (domain && !failed) {
    return (
      <img
        src={`https://logo.clearbit.com/${domain}`}
        alt={name}
        className="w-14 h-14 rounded-xl object-contain bg-white border border-slate-100 shadow-sm p-1"
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <div className={`w-14 h-14 ${avatarColor(name)} rounded-xl flex items-center justify-center shrink-0`}>
      <span className="text-base font-bold text-white tracking-tight">{initials(name)}</span>
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

// ── main component ─────────────────────────────────────────────────────────

export default function CompanyProfileSheet({ name, onClose }) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(false);
  const [logoDomain, setLogoDomain] = useState(null);

  useEffect(() => {
    if (!name) { setData(null); return; }
    setLoading(true);
    setData(null);
    axios.get(`${API}/companies/${encodeURIComponent(name)}`)
      .then((r) => {
        setData(r.data);
        // Pick a logo domain from MA activities if player has none
        const p = r.data?.profile;
        if (p) {
          const domain = p.acquirer_logo_domain || p.target_logo_domain || null;
          setLogoDomain(domain);
        }
      })
      .catch((e) => console.error("CompanyProfileSheet fetch error:", e))
      .finally(() => setLoading(false));
  }, [name]);

  const p  = data?.profile;
  const ma = data?.ma_activities ?? [];

  // Try to determine logo domain from MA activity entries
  const resolvedDomain = logoDomain ?? (() => {
    for (const a of ma) {
      if (a.acquirer?.toLowerCase().includes(name?.toLowerCase() || "")) return a.acquirer_logo_domain;
      if (a.target?.toLowerCase().includes(name?.toLowerCase() || ""))   return a.target_logo_domain;
    }
    return null;
  })();

  return (
    <Sheet open={!!name} onOpenChange={(open) => { if (!open) onClose(); }}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">

        {/* Header */}
        <SheetHeader className="mb-5">
          <div className="flex items-center gap-4">
            <CompanyAvatar name={name || ""} domain={resolvedDomain} />
            <div>
              <SheetTitle className="text-lg font-bold leading-tight">{name}</SheetTitle>
              {p?.ticker && (
                <span className="text-xs text-slate-500 font-mono">{p.ticker}</span>
              )}
              {p?.is_public !== undefined && (
                <span className={`ml-2 text-xs px-2 py-0.5 rounded font-medium ${p.is_public ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}>
                  {p.is_public ? "Public" : "Private"}
                </span>
              )}
            </div>
          </div>
        </SheetHeader>

        {loading && (
          <div className="flex justify-center py-10">
            <div className="animate-spin w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full" />
          </div>
        )}

        {!loading && p && (
          <div className="space-y-5">

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-2 text-sm text-slate-700">
              {p.founded_year && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Founded {p.founded_year}</span>
                </div>
              )}
              {p.headquarters && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">{p.headquarters}</span>
                </div>
              )}
              {p.funding_stage && (
                <div className="col-span-2 flex items-center gap-2">
                  <span className="text-xs bg-purple-50 text-purple-700 border border-purple-100 px-2 py-0.5 rounded">
                    {p.funding_stage}
                  </span>
                </div>
              )}
            </div>

            {/* Financials row */}
            <div className="grid grid-cols-3 gap-2 bg-slate-50 rounded-xl p-3 text-center">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Market Cap</p>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">
                  {p.market_cap ? `$${p.market_cap}B` : "—"}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Revenue</p>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">
                  {p.revenue ? `$${p.revenue}B` : "—"}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Employees</p>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">
                  {p.employees ? p.employees.toLocaleString() : "—"}
                </p>
              </div>
            </div>

            {/* Description */}
            {p.description && (
              <p className="text-sm text-slate-600 leading-relaxed">{p.description}</p>
            )}

            {/* Specializations */}
            {p.specializations?.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Products &amp; Services
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.specializations.map((s) => (
                    <span
                      key={s}
                      className="text-xs bg-purple-50 text-purple-700 border border-purple-100 px-2 py-0.5 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* External links */}
            {(p.website || p.linkedin) && (
              <div className="flex gap-4 pt-1">
                {p.website && (
                  <a
                    href={p.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-medium"
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
                    className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    LinkedIn
                  </a>
                )}
              </div>
            )}

            {/* M&A activity */}
            {ma.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  M&amp;A Activity
                </p>
                <div className="space-y-2">
                  {ma.map((a) => (
                    <div
                      key={a.id}
                      className="text-xs border border-slate-100 rounded-lg p-3 bg-white shadow-sm"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-medium text-slate-800 leading-snug">
                          {a.acquirer}
                          <ArrowRight className="inline w-3 h-3 mx-1 text-slate-400" />
                          {a.target}
                        </span>
                        <span className="text-slate-400 shrink-0">
                          {format(new Date(a.announced_date), "MMM yyyy")}
                        </span>
                      </div>
                      <p className="text-slate-500 mt-1 leading-relaxed">{a.description}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${getStatusStyle(a.status)}`}>
                          {a.status.toUpperCase()}
                        </span>
                        {a.source_url && (
                          <a
                            href={a.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-purple-600 hover:text-purple-800 font-medium"
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

        {!loading && !p && name && (
          <div className="mt-8 text-sm text-slate-500 text-center">
            No profile data available for &quot;{name}&quot;
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
