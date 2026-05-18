import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API, useT } from "@/App";
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
  FileCheck,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Download,
  ExternalLink,
  Filter,
  History,
  ChevronRight,
  Building2,
  Globe2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CompanyProfileSheet from "@/components/CompanyProfileSheet";
import { getLogoUrl } from "@/lib/companyLogos";

// ── Translations ──────────────────────────────────────────────────────────────
const T = {
  title:       { en: "Contracts & Tenders" },
  subtitle:    { en: "Defense procurement reference — consultants & industry" },
  total:       { en: "Total" },
  indexed:     { en: "contracts indexed" },
  open:        { en: "Open" },
  activeTend:  { en: "active tenders" },
  awarded:     { en: "Awarded" },
  signed:      { en: "contracts signed" },
  totalVal:    { en: "Total Est. Value" },
  midpoint:    { en: "midpoint estimate" },
  searchPh:    { en: "Search contract, authority, program..." },
  allStatus:   { en: "All Statuses" },
  allAuth:     { en: "All Authorities" },
  allCat:      { en: "All Categories" },
  sourceNote:  { en: "Data sourced from public procurement databases (DGA, OCCAR, NATO NSPA, DoD SAR, OJEU) — reference use only · not a real-time procurement monitoring tool" },
  shown:       { en: "contracts shown" },
  contract:    { en: "contract shown" },
  noMatch:     { en: "No contracts match the selected filters." },
  exportCsv:   { en: "Export CSV" },
  // Status labels
  sOpen:       { en: "Open" },
  sAwarded:    { en: "Awarded" },
  sClosed:     { en: "Closed" },
  sCancelled:  { en: "Cancelled" },
  // Authority labels
  aNational:   { en: "National" },
  aNato:       { en: "NATO" },
  aEu:         { en: "EU" },
  aBilateral:  { en: "Bilateral" },
  // Category labels
  cAero:       { en: "Aerospace" },
  cNaval:      { en: "Naval" },
  cLand:       { en: "Land" },
  cCyber:      { en: "Cyber" },
  cSvc:        { en: "Services" },
  cLog:        { en: "Logistics" },
  cSpace:      { en: "Space" },
  cMissiles:   { en: "Missiles" },
  // Recent strip
  recent:      { en: "Recent Activity" },
  recentSub:   { en: "Latest contracts & tenders indexed" },
  // Card fields
  estVal:      { en: "Est. Value" },
  published:   { en: "Published" },
  deadline:    { en: "Deadline" },
  awardedTo:   { en: "Awarded To" },
  undisclosed: { en: "Undisclosed" },
  officialSrc: { en: "Official source" },
  noSrc:       { en: "No source" },
  confirmed:   { en: "✓ Confirmed" },
  estimated:   { en: "~ Estimated" },
  category:    { en: "Category" },
  reliability: { en: "Reliability" },
  viewProfile:  { en: "View profile for" },
  seeExpend:    { en: "Defense budget →" },
  seeExpendTip: { en: "See defense expenditure for this country" },
};

const CATEGORY_COLORS = {
  aerospace: "bg-sky-50 text-sky-700 border-sky-200",
  naval:     "bg-blue-50 text-blue-700 border-blue-200",
  land:      "bg-amber-50 text-amber-700 border-amber-200",
  cyber:     "bg-purple-50 text-purple-700 border-purple-200",
  services:  "bg-slate-100 text-slate-600 border-slate-200",
  logistics: "bg-orange-50 text-orange-700 border-orange-200",
  space:     "bg-indigo-50 text-indigo-700 border-indigo-200",
  missiles:  "bg-rose-50 text-rose-700 border-rose-200",
};

const STATUS_DOT = {
  open:      "bg-blue-500",
  awarded:   "bg-emerald-500",
  closed:    "bg-slate-400",
  cancelled: "bg-rose-400",
};

// ISO codes for flag display in contract authority header
const AUTH_COUNTRY_CODES = {
  "USA": "us", "United States": "us",
  "UK": "gb", "United Kingdom": "gb",
  "France": "fr", "Germany": "de", "Italy": "it", "Spain": "es",
  "Australia": "au", "Poland": "pl", "Japan": "jp", "Canada": "ca",
  "Netherlands": "nl", "Sweden": "se", "Norway": "no", "Denmark": "dk",
  "Belgium": "be", "Finland": "fi", "Greece": "gr", "Portugal": "pt",
  "Czech Republic": "cz", "Romania": "ro", "Turkey": "tr",
  "Israel": "il", "India": "in", "South Korea": "kr", "EU": "eu",
  "Switzerland": "ch", "Saudi Arabia": "sa", "Russia": "ru",
  "Ukraine": "ua", "Singapore": "sg", "Qatar": "qa", "UAE": "ae",
};

function AuthorityFlag({ country, authority = "" }) {
  // OCCAR or multi-nation → globe
  if (authority.includes("OCCAR") || country === "Europe" || country === "Multi-Nation") {
    return (
      <Globe2 size={13} className="text-slate-500 shrink-0" title="Organisation internationale" />
    );
  }
  if (country === "NATO") {
    return (
      <span className="inline-flex items-center text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded px-1 py-0.5 leading-none shrink-0">
        NATO
      </span>
    );
  }
  if (country === "EU") {
    return (
      <span className="inline-flex items-center text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded px-1 py-0.5 leading-none shrink-0">
        EU
      </span>
    );
  }
  const code = AUTH_COUNTRY_CODES[country];
  if (!code) return null;
  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      alt={country}
      title={country}
      className="w-4 h-3 object-cover rounded-sm shadow-sm shrink-0"
      onError={(e) => { e.target.style.display = "none"; }}
    />
  );
}

function AwardedToButton({ name, onOpenProfile }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const logoUrl = getLogoUrl(name);
  const tViewProfile = useT(T.viewProfile);
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onOpenProfile(name); }}
      className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 transition-colors group"
      title={`${tViewProfile} ${name}`}
    >
      {logoUrl && !logoFailed ? (
        <img
          src={logoUrl}
          alt={name}
          className="h-4 w-auto max-w-[48px] object-contain"
          onError={() => setLogoFailed(true)}
        />
      ) : (
        <Building2 size={11} className="text-emerald-600 shrink-0" />
      )}
      <span className="text-xs text-emerald-700 font-medium group-hover:text-emerald-900 leading-none">{name}</span>
      <ChevronRight size={10} className="text-emerald-400 group-hover:text-emerald-600 shrink-0" />
    </button>
  );
}

function fmtVal(n) {
  if (n >= 1000) return `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}B`;
  return `$${n}M`;
}
function fmtRecentAmount(min, max) {
  if (min && max) return `${fmtVal(min)}–${fmtVal(max)}`;
  if (min) return `≥${fmtVal(min)}`;
  return `≤${fmtVal(max)}`;
}

function RecentStrip({ contracts }) {
  const tRecent  = useT(T.recent);
  const tRecentS = useT(T.recentSub);
  const tUndis   = useT(T.undisclosed);

  const recent = [...contracts]
    .sort((a, b) => (b.publication_date || "").localeCompare(a.publication_date || ""))
    .slice(0, 6);

  if (recent.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] p-4">
      <div className="flex items-center gap-2 mb-3">
        <History size={15} className="text-purple-700" />
        <div>
          <p className="text-sm font-semibold text-slate-900">{tRecent}</p>
          <p className="text-xs text-slate-400">{tRecentS}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
        {recent.map((c) => (
          <div key={c.id} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-100 hover:border-purple-200 transition-colors">
            <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${STATUS_DOT[c.status] || "bg-slate-400"}`} />
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-800 leading-snug line-clamp-2">{c.title}</p>
              <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                {c.publication_date?.slice(0, 10)}
                {c.amount_min || c.amount_max
                  ? ` · ${fmtRecentAmount(c.amount_min, c.amount_max)}`
                  : ` · ${tUndis}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContractCard({ contract, onOpenProfile, onSelect, onGoExpend }) {
  const tStatus    = { open: useT(T.sOpen), awarded: useT(T.sAwarded), closed: useT(T.sClosed), cancelled: useT(T.sCancelled) };
  const tAuthority = { national: useT(T.aNational), nato: useT(T.aNato), eu: useT(T.aEu), bilateral: useT(T.aBilateral) };
  const tCategory  = { aerospace: useT(T.cAero), naval: useT(T.cNaval), land: useT(T.cLand), cyber: useT(T.cCyber), services: useT(T.cSvc), logistics: useT(T.cLog), space: useT(T.cSpace), missiles: useT(T.cMissiles) };

  const STATUS_ICON  = { open: Clock, awarded: CheckCircle2, closed: XCircle, cancelled: AlertCircle };
  const STATUS_COLOR = {
    open:      "bg-blue-50 text-blue-700 border border-blue-200",
    awarded:   "bg-emerald-50 text-emerald-700 border border-emerald-200",
    closed:    "bg-slate-100 text-slate-500 border border-slate-200",
    cancelled: "bg-rose-50 text-rose-600 border border-rose-200",
  };

  const StatusIcon = STATUS_ICON[contract.status] || XCircle;
  const statusLabel = tStatus[contract.status] || contract.status;
  const statusColor = STATUS_COLOR[contract.status] || STATUS_COLOR.closed;

  const tEstVal    = useT(T.estVal);
  const tPub       = useT(T.published);
  const tDeadline  = useT(T.deadline);
  const tAwardedTo = useT(T.awardedTo);
  const tUndis     = useT(T.undisclosed);
  const tOfficSrc  = useT(T.officialSrc);
  const tNoSrc     = useT(T.noSrc);
  const tConfirmed = useT(T.confirmed);
  const tEstimated = useT(T.estimated);
  const tSeeExpend = useT(T.seeExpend);
  const tSeeExpendTip = useT(T.seeExpendTip);

  function fmtAmount(min, max) {
    if (!min && !max) return tUndis;
    if (min && max) return `${fmtVal(min)} – ${fmtVal(max)}`;
    if (min) return `≥ ${fmtVal(min)}`;
    return `≤ ${fmtVal(max)}`;
  }

  return (
    <Card
      onClick={() => onSelect(contract)}
      className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:shadow-lg hover:border-purple-200 transition-all duration-300 cursor-pointer"
    >
      <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-sm font-semibold text-slate-900 leading-snug">
              {contract.title}
            </CardTitle>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 flex-wrap">
              <AuthorityFlag country={contract.authority_country} authority={contract.contracting_authority} />
              {contract.contracting_authority}
              {contract.authority_country && (
                <button
                  onClick={(e) => { e.stopPropagation(); onGoExpend(contract.authority_country); }}
                  title={tSeeExpendTip}
                  className="ml-auto text-[10px] text-purple-600 hover:text-purple-800 hover:underline leading-none"
                >
                  {tSeeExpend}
                </button>
              )}
            </p>
          </div>
          <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${statusColor}`}>
            <StatusIcon size={11} />
            {statusLabel}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-3">
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
          {contract.description}
        </p>
        <div className="flex flex-wrap gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[contract.category] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
            {tCategory[contract.category] || contract.category}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            {tAuthority[contract.authority_type] || contract.authority_type}
          </span>
          {contract.program && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-mono">
              {contract.program}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">{tEstVal}</p>
            <p className="text-xs font-mono font-medium text-slate-900">{fmtAmount(contract.amount_min, contract.amount_max)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">{tPub}</p>
            <p className="text-xs text-slate-600">{contract.publication_date?.slice(0, 10)}</p>
          </div>
          {contract.deadline && (
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">{tDeadline}</p>
              <p className="text-xs text-slate-600">{contract.deadline?.slice(0, 10)}</p>
            </div>
          )}
          {contract.awarded_to && (
            <div className="col-span-2">
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">{tAwardedTo}</p>
              <div className="flex flex-wrap gap-1.5">
                {contract.awarded_to.split(" / ").map((company) => (
                  <AwardedToButton key={company} name={company.trim()} onOpenProfile={onOpenProfile} />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          {contract.source_url ? (
            <a href={contract.source_url} target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-xs text-purple-700 hover:text-purple-900 transition-colors">
              <ExternalLink size={11} />
              {tOfficSrc}
            </a>
          ) : (
            <span className="flex items-center gap-1 text-xs text-amber-600">
              <AlertCircle size={11} />
              {tNoSrc}
            </span>
          )}
          <span className={`text-xs font-medium ${contract.reliability === "confirmed" ? "text-emerald-600" : "text-amber-600"}`}>
            {contract.reliability === "confirmed" ? tConfirmed : tEstimated}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function ContractDetailDialog({ contract, onClose, onOpenProfile, onGoExpend }) {
  const tEstVal    = useT(T.estVal);
  const tPub       = useT(T.published);
  const tDeadline  = useT(T.deadline);
  const tCategory  = useT(T.category);
  const tReliab    = useT(T.reliability);
  const tAwardedTo = useT(T.awardedTo);
  const tOfficSrc  = useT(T.officialSrc);
  const tConfirmed = useT(T.confirmed);
  const tEstimated = useT(T.estimated);
  const tUndis     = useT(T.undisclosed);
  const tSeeExpend    = useT(T.seeExpend);
  const tSeeExpendTip = useT(T.seeExpendTip);
  const tStatus    = { open: useT(T.sOpen), awarded: useT(T.sAwarded), closed: useT(T.sClosed), cancelled: useT(T.sCancelled) };

  if (!contract) return null;

  const STATUS_ICON  = { open: Clock, awarded: CheckCircle2, closed: XCircle, cancelled: AlertCircle };
  const STATUS_COLOR = {
    open:      "bg-blue-50 text-blue-700 border border-blue-200",
    awarded:   "bg-emerald-50 text-emerald-700 border border-emerald-200",
    closed:    "bg-slate-100 text-slate-500 border border-slate-200",
    cancelled: "bg-rose-50 text-rose-600 border border-rose-200",
  };
  const StatusIcon = STATUS_ICON[contract.status] || XCircle;

  function fmtAmount(min, max) {
    if (!min && !max) return tUndis;
    if (min && max) return `${fmtVal(min)} – ${fmtVal(max)}`;
    if (min) return `≥ ${fmtVal(min)}`;
    return `≤ ${fmtVal(max)}`;
  }

  return (
    <Dialog open={!!contract} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-2xl bg-white border-slate-200">
        <DialogHeader className="pr-6">
          <div className="flex items-start gap-3 flex-wrap">
            <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${STATUS_COLOR[contract.status] || STATUS_COLOR.closed}`}>
              <StatusIcon size={11} />
              {tStatus[contract.status] || contract.status}
            </span>
            {contract.program && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-mono">
                {contract.program}
              </span>
            )}
          </div>
          <DialogTitle className="font-heading text-base font-bold text-slate-900 leading-snug mt-2">
            {contract.title}
          </DialogTitle>
          <div className="flex items-center justify-between gap-2 mt-1 flex-wrap">
            <p className="text-xs text-slate-500 flex items-center gap-1.5 flex-wrap">
              <AuthorityFlag country={contract.authority_country} authority={contract.contracting_authority} />
              {contract.contracting_authority} · {contract.authority_country}
            </p>
            {contract.authority_country && (
              <button
                onClick={() => { onClose(); onGoExpend(contract.authority_country); }}
                title={tSeeExpendTip}
                className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 hover:bg-purple-100 hover:border-purple-300 transition-colors whitespace-nowrap"
              >
                {tSeeExpend}
              </button>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-1">
          {contract.description && (
            <p className="text-sm text-slate-600 leading-relaxed">
              {contract.description}
            </p>
          )}

          <div className="grid grid-cols-2 gap-3 bg-slate-50 rounded-lg p-3 border border-slate-100">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">{tEstVal}</p>
              <p className="text-sm font-mono font-semibold text-slate-900">{fmtAmount(contract.amount_min, contract.amount_max)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">{tPub}</p>
              <p className="text-sm text-slate-700">{contract.publication_date?.slice(0, 10) || "—"}</p>
            </div>
            {contract.deadline && (
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">{tDeadline}</p>
                <p className="text-sm text-slate-700">{contract.deadline?.slice(0, 10)}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">{tCategory}</p>
              <p className="text-sm text-slate-700 capitalize">{contract.category}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">{tReliab}</p>
              <p className={`text-sm font-medium ${contract.reliability === "confirmed" ? "text-emerald-600" : "text-amber-600"}`}>
                {contract.reliability === "confirmed" ? tConfirmed : tEstimated}
              </p>
            </div>
          </div>

          {contract.awarded_to && (
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-2">{tAwardedTo}</p>
              <div className="flex flex-wrap gap-2">
                {contract.awarded_to.split(" / ").map((company) => (
                  <AwardedToButton key={company} name={company.trim()} onOpenProfile={(name) => { onClose(); onOpenProfile(name); }} />
                ))}
              </div>
            </div>
          )}

          {contract.source_url && (
            <div className="pt-1 border-t border-slate-100">
              <a href={contract.source_url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-purple-700 hover:text-purple-900 transition-colors">
                <ExternalLink size={12} />
                {tOfficSrc}
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Contracts() {
  const navigate = useNavigate();
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedAuthority, setSelectedAuthority] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [profileName, setProfileName] = useState(null);
  const [selectedContract, setSelectedContract] = useState(null);

  const tTitle      = useT(T.title);
  const tSubtitle   = useT(T.subtitle);
  const tTotal      = useT(T.total);
  const tIndexed    = useT(T.indexed);
  const tOpen       = useT(T.open);
  const tActiveTend = useT(T.activeTend);
  const tAwarded    = useT(T.awarded);
  const tSigned     = useT(T.signed);
  const tTotalVal   = useT(T.totalVal);
  const tMidpoint   = useT(T.midpoint);
  const tSearchPh   = useT(T.searchPh);
  const tAllStatus  = useT(T.allStatus);
  const tAllAuth    = useT(T.allAuth);
  const tAllCat     = useT(T.allCat);
  const tSourceNote = useT(T.sourceNote);
  const tExport     = useT(T.exportCsv);
  const tNoMatch    = useT(T.noMatch);
  const tShown1     = useT(T.contract);
  const tShownN     = useT(T.shown);

  const tSOpen      = useT(T.sOpen);
  const tSAwarded   = useT(T.sAwarded);
  const tSClosed    = useT(T.sClosed);
  const tSCancelled = useT(T.sCancelled);
  const tANat       = useT(T.aNational);
  const tANato      = useT(T.aNato);
  const tAEu        = useT(T.aEu);
  const tABilat     = useT(T.aBilateral);
  const tCAero      = useT(T.cAero);
  const tCNaval     = useT(T.cNaval);
  const tCLand      = useT(T.cLand);
  const tCCyber     = useT(T.cCyber);
  const tCSvc       = useT(T.cSvc);
  const tCLog       = useT(T.cLog);
  const tCSpace     = useT(T.cSpace);
  const tCMissiles  = useT(T.cMissiles);

  useEffect(() => {
    axios.get(`${API}/contracts`)
      .then((r) => setContracts(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return contracts.filter((c) => {
      const q = searchTerm.toLowerCase();
      const matchSearch = !q
        || c.title?.toLowerCase().includes(q)
        || c.description?.toLowerCase().includes(q)
        || c.contracting_authority?.toLowerCase().includes(q)
        || c.authority_country?.toLowerCase().includes(q)
        || c.awarded_to?.toLowerCase().includes(q)
        || c.program?.toLowerCase().includes(q);
      const matchStatus = selectedStatus === "all" || c.status === selectedStatus;
      const matchAuth   = selectedAuthority === "all" || c.authority_type === selectedAuthority;
      const matchCat    = selectedCategory === "all" || c.category === selectedCategory;
      return matchSearch && matchStatus && matchAuth && matchCat;
    });
  }, [contracts, searchTerm, selectedStatus, selectedAuthority, selectedCategory]);

  const kpis = useMemo(() => {
    const open    = contracts.filter((c) => c.status === "open").length;
    const awarded = contracts.filter((c) => c.status === "awarded").length;
    const totalMin = contracts.reduce((s, c) => s + (c.amount_min || 0), 0);
    const totalMax = contracts.reduce((s, c) => s + (c.amount_max || 0), 0);
    const midB = contracts.length ? ((totalMin + totalMax) / 2 / 1000).toFixed(1) : 0;
    return { open, awarded, total: contracts.length, midB };
  }, [contracts]);

  const exportCSV = () => {
    const headers = ["Title", "Status", "Authority", "Country", "Category", "Program", "Min ($M)", "Max ($M)", "Awarded To", "Published", "Reliability"];
    const rows = filtered.map((c) => [
      `"${(c.title || "").replace(/"/g, '""')}"`,
      c.status, c.contracting_authority, c.authority_country, c.category,
      c.program || "", c.amount_min || "", c.amount_max || "",
      c.awarded_to || "", c.publication_date?.slice(0, 10) || "", c.reliability,
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contracts_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const statusOptions = [
    { value: "all", label: tAllStatus },
    { value: "open", label: tSOpen },
    { value: "awarded", label: tSAwarded },
    { value: "closed", label: tSClosed },
    { value: "cancelled", label: tSCancelled },
  ];
  const authorityOptions = [
    { value: "all", label: tAllAuth },
    { value: "national", label: tANat },
    { value: "nato", label: tANato },
    { value: "eu", label: tAEu },
    { value: "bilateral", label: tABilat },
  ];
  const categoryOptions = [
    { value: "all", label: tAllCat },
    { value: "aerospace", label: tCAero },
    { value: "naval", label: tCNaval },
    { value: "land", label: tCLand },
    { value: "cyber", label: tCCyber },
    { value: "services", label: tCSvc },
    { value: "logistics", label: tCLog },
    { value: "space", label: tCSpace },
    { value: "missiles", label: tCMissiles },
  ];

  return (
    <div data-testid="contracts-page" className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">
            {tTitle}
          </h1>
          <p className="text-slate-500 text-sm mt-1">{tSubtitle}</p>
        </div>
        <button
          onClick={exportCSV}
          disabled={filtered.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-40 self-start lg:self-auto"
        >
          <Download size={14} />
          {tExport}
        </button>
      </div>

      {/* KPI bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
          <CardContent className="p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">{tTotal}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{kpis.total}</p>
            <p className="text-xs text-slate-400 mt-0.5">{tIndexed}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
          <CardContent className="p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">{tOpen}</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">{kpis.open}</p>
            <p className="text-xs text-slate-400 mt-0.5">{tActiveTend}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
          <CardContent className="p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">{tAwarded}</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">{kpis.awarded}</p>
            <p className="text-xs text-slate-400 mt-0.5">{tSigned}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
          <CardContent className="p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">{tTotalVal}</p>
            <p className="text-2xl font-bold text-purple-700 mt-1">${kpis.midB}B</p>
            <p className="text-xs text-slate-400 mt-0.5">{tMidpoint}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent activity strip */}
      {contracts.length > 0 && <RecentStrip contracts={contracts} />}

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <Input
            placeholder={tSearchPh}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm"
          />
        </div>
        {[
          { value: selectedStatus,    onChange: setSelectedStatus,    options: statusOptions    },
          { value: selectedAuthority, onChange: setSelectedAuthority, options: authorityOptions },
          { value: selectedCategory,  onChange: setSelectedCategory,  options: categoryOptions  },
        ].map((sel, i) => (
          <Select key={i} value={sel.value} onValueChange={sel.onChange}>
            <SelectTrigger className="w-44 bg-white border-slate-200 text-slate-700 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sel.options.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
      </div>

      {/* Source note */}
      <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500">
        <Filter size={12} className="text-slate-400 shrink-0" />
        {tSourceNote}
      </div>

      {!loading && (
        <p className="text-xs text-slate-500">
          {filtered.length} {filtered.length === 1 ? tShown1 : tShownN}
        </p>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700" />
          <p className="text-sm text-slate-400">Loading contracts…</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <FileCheck size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">{tNoMatch}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <ContractCard
              key={c.id}
              contract={c}
              onOpenProfile={setProfileName}
              onSelect={setSelectedContract}
              onGoExpend={(country) => navigate(`/expenditures?country=${encodeURIComponent(country)}`)}
            />
          ))}
        </div>
      )}

      <ContractDetailDialog
        contract={selectedContract}
        onClose={() => setSelectedContract(null)}
        onOpenProfile={setProfileName}
        onGoExpend={(country) => { setSelectedContract(null); navigate(`/expenditures?country=${encodeURIComponent(country)}`); }}
      />
      <CompanyProfileSheet name={profileName} onClose={() => setProfileName(null)} />
    </div>
  );
}
