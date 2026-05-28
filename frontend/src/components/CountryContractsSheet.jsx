import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "@/App";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  FileCheck, FileText, X, CheckCircle2, Clock, XCircle,
  AlertCircle, ExternalLink, ChevronRight,
} from "lucide-react";

const COUNTRY_CODES = {
  "USA": "us", "United States": "us", "UK": "gb", "United Kingdom": "gb",
  "France": "fr", "Germany": "de", "Italy": "it", "Spain": "es",
  "Israel": "il", "Russia": "ru", "China": "cn", "Japan": "jp",
  "South Korea": "kr", "India": "in", "Turkey": "tr", "Sweden": "se",
  "Norway": "no", "Netherlands": "nl", "Australia": "au", "Canada": "ca",
  "Poland": "pl", "Ukraine": "ua", "Brazil": "br", "South Africa": "za",
  "Singapore": "sg", "Switzerland": "ch", "Finland": "fi", "Greece": "gr",
  "Portugal": "pt", "Belgium": "be", "Denmark": "dk", "Czech Republic": "cz",
  "Romania": "ro", "UAE": "ae", "Saudi Arabia": "sa", "EU": "eu",
};

const STATUS_STYLE = {
  open:      { cls: "bg-blue-50 text-blue-700 border-blue-200",    icon: Clock,         label: "Open" },
  awarded:   { cls: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle2, label: "Awarded" },
  closed:    { cls: "bg-slate-100 text-slate-500 border-slate-200", icon: XCircle,       label: "Closed" },
  cancelled: { cls: "bg-rose-50 text-rose-600 border-rose-200",    icon: AlertCircle,   label: "Cancelled" },
};

const CONTRACT_CATEGORY_COLOR = {
  aerospace: "border-l-sky-400", naval: "border-l-blue-400", land: "border-l-emerald-400",
  cyber: "border-l-slate-400", services: "border-l-amber-400", logistics: "border-l-orange-400",
  space: "border-l-violet-400", missiles: "border-l-rose-400",
};

const REG_CATEGORY_STYLE = {
  offset:         "bg-purple-50 text-purple-700 border-purple-200",
  export_control: "bg-rose-50 text-rose-700 border-rose-200",
  procurement:    "bg-blue-50 text-blue-700 border-blue-200",
  itar:           "bg-amber-50 text-amber-700 border-amber-200",
};

function formatAmount(min, max) {
  if (!min && !max) return null;
  const fmt = (v) => v >= 1000 ? `$${(v / 1000).toFixed(1)}B` : `$${v}M`;
  if (min && max && min !== max) return `${fmt(min)} – ${fmt(max)}`;
  return fmt(min || max);
}

function StatusBadge({ status }) {
  const s = STATUS_STYLE[status] || STATUS_STYLE.closed;
  const Icon = s.icon;
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${s.cls}`}>
      <Icon className="w-2.5 h-2.5" /> {s.label}
    </span>
  );
}

export default function CountryContractsSheet({ country, onClose }) {
  const [activeTab, setActiveTab] = useState("contracts");
  const [contracts, setContracts] = useState([]);
  const [regulations, setRegulations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!country || fetched) return;
    setLoading(true);
    Promise.all([
      axios.get(`${API}/contracts`).catch(() => ({ data: [] })),
      axios.get(`${API}/regulations`).catch(() => ({ data: [] })),
    ]).then(([cRes, rRes]) => {
      const name = country.country;
      const code = country.country_code?.toUpperCase();
      const allContracts = cRes.data || [];
      const allRegs = rRes.data || [];

      // Match contracts by authority_country (name or code)
      const filtered = allContracts.filter(c => {
        const ac = c.authority_country || "";
        return ac === name || ac.toUpperCase() === code ||
          ac.toLowerCase() === name.toLowerCase();
      });
      // Sort: open first, then awarded, then the rest
      const order = { open: 0, awarded: 1, closed: 2, cancelled: 3 };
      filtered.sort((a, b) => (order[a.status] ?? 4) - (order[b.status] ?? 4));
      setContracts(filtered);

      // Match regulations by country field
      const regs = allRegs.filter(r => {
        const rc = r.country || "";
        return rc === name || rc === "EU" || rc === "USA" && name === "United States" ||
          rc.toLowerCase() === name.toLowerCase();
      });
      setRegulations(regs);
      setFetched(true);
    }).finally(() => setLoading(false));
  }, [country, fetched]);

  // Reset when country changes
  useEffect(() => {
    setFetched(false);
    setContracts([]);
    setRegulations([]);
    setActiveTab("contracts");
  }, [country?.country]);

  const flagCode = country ? (COUNTRY_CODES[country.country] || country.country_code?.toLowerCase()) : null;

  const openCount = contracts.filter(c => c.status === "open").length;
  const awardedCount = contracts.filter(c => c.status === "awarded").length;

  return (
    <Sheet open={!!country} onOpenChange={(open) => { if (!open) onClose(); }}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto p-0 gap-0">

        {/* Header */}
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 px-6 pt-7 pb-5">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            {flagCode && (
              <img
                src={`https://flagcdn.com/w40/${flagCode}.png`}
                alt={country?.country}
                className="w-12 h-8 object-cover rounded shadow-lg border-2 border-white/20 shrink-0"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            )}
            <div>
              <h2 className="text-xl font-bold text-white leading-tight">{country?.country}</h2>
              <p className="text-xs text-slate-400 mt-0.5">Contracts &amp; Regulations</p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex gap-4 mt-4">
            <div className="text-center">
              <p className="text-base font-mono font-bold text-white">{contracts.length}</p>
              <p className="text-[10px] text-slate-400">contracts</p>
            </div>
            <div className="w-px bg-white/10 self-stretch" />
            <div className="text-center">
              <p className="text-base font-mono font-bold text-blue-300">{openCount}</p>
              <p className="text-[10px] text-slate-400">open</p>
            </div>
            <div className="w-px bg-white/10 self-stretch" />
            <div className="text-center">
              <p className="text-base font-mono font-bold text-emerald-300">{awardedCount}</p>
              <p className="text-[10px] text-slate-400">awarded</p>
            </div>
            <div className="w-px bg-white/10 self-stretch" />
            <div className="text-center">
              <p className="text-base font-mono font-bold text-white">{regulations.length}</p>
              <p className="text-[10px] text-slate-400">regulations</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50/50">
          {[
            { key: "contracts", icon: FileCheck, label: "Contracts" },
            { key: "regulations", icon: FileText, label: "Regulations" },
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold transition-colors border-b-2 ${
                activeTab === key
                  ? "border-blue-700 text-blue-800 bg-white"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                activeTab === key ? "bg-blue-100 text-blue-700" : "bg-slate-200 text-slate-500"
              }`}>
                {key === "contracts" ? contracts.length : regulations.length}
              </span>
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-16">
            <div className="animate-spin w-6 h-6 border-2 border-slate-200 border-t-slate-700 rounded-full" />
          </div>
        )}

        {/* Contracts tab */}
        {!loading && activeTab === "contracts" && (
          <div className="divide-y divide-slate-100">
            {contracts.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <FileCheck className="w-8 h-8 text-slate-200 mx-auto mb-3" />
                <p className="text-sm text-slate-500 font-medium">No contracts indexed</p>
                <p className="text-xs text-slate-400 mt-1">for {country?.country}</p>
              </div>
            ) : (
              contracts.map((c) => {
                const catBorder = CONTRACT_CATEGORY_COLOR[c.category] || "border-l-slate-200";
                const amount = formatAmount(c.amount_min, c.amount_max);
                return (
                  <div
                    key={c.id}
                    className={`px-5 py-4 border-l-4 ${catBorder} hover:bg-slate-50 transition-colors`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-sm font-semibold text-slate-800 leading-snug flex-1">{c.title}</p>
                      <StatusBadge status={c.status} />
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                      {c.authority_type && (
                        <span className="bg-slate-100 text-slate-600 border border-slate-200 px-1.5 py-0.5 rounded-full font-medium">
                          {c.authority_type}
                        </span>
                      )}
                      {c.category && (
                        <span className="capitalize text-slate-500">{c.category}</span>
                      )}
                      {c.contracting_authority && (
                        <>
                          <span className="text-slate-300">·</span>
                          <span className="text-slate-500 truncate max-w-[140px]">{c.contracting_authority}</span>
                        </>
                      )}
                      {amount && (
                        <>
                          <span className="text-slate-300">·</span>
                          <span className="font-mono font-semibold text-slate-700">{amount}</span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Regulations tab */}
        {!loading && activeTab === "regulations" && (
          <div className="divide-y divide-slate-100">
            {regulations.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <FileText className="w-8 h-8 text-slate-200 mx-auto mb-3" />
                <p className="text-sm text-slate-500 font-medium">No regulations indexed</p>
                <p className="text-xs text-slate-400 mt-1">for {country?.country}</p>
              </div>
            ) : (
              regulations.map((r) => {
                const catStyle = REG_CATEGORY_STYLE[r.category] || "bg-slate-100 text-slate-600 border-slate-200";
                return (
                  <div key={r.id} className="px-5 py-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-sm font-semibold text-slate-800 leading-snug flex-1">{r.title}</p>
                      {r.category && (
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border shrink-0 ${catStyle}`}>
                          {r.category.replace("_", " ").toUpperCase()}
                        </span>
                      )}
                    </div>
                    {r.description && (
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-2">{r.description}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                      {r.effective_date && (
                        <span>Effective: <span className="text-slate-600 font-medium">{r.effective_date}</span></span>
                      )}
                      {r.requirements?.length > 0 && (
                        <>
                          <span className="text-slate-300">·</span>
                          <span>{r.requirements.length} requirement{r.requirements.length !== 1 ? "s" : ""}</span>
                        </>
                      )}
                      {r.source_url && (
                        <a
                          href={r.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-auto flex items-center gap-0.5 text-blue-600 hover:text-blue-800 font-medium"
                        >
                          <ExternalLink className="w-3 h-3" /> Source
                        </a>
                      )}
                    </div>
                    {r.requirements?.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {r.requirements.slice(0, 3).map((req, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs text-slate-500">
                            <ChevronRight className="w-3 h-3 text-slate-300 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{req}</span>
                          </li>
                        ))}
                        {r.requirements.length > 3 && (
                          <li className="text-xs text-slate-400 pl-4.5">
                            +{r.requirements.length - 3} more requirements
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

      </SheetContent>
    </Sheet>
  );
}
