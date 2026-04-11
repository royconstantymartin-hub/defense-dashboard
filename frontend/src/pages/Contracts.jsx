import { useEffect, useState, useMemo } from "react";
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
} from "lucide-react";

// ── Translations ──────────────────────────────────────────────────────────────
const T = {
  title:       { en: "Contracts & Tenders",                             fr: "Contrats & Appels d'offres" },
  subtitle:    { en: "Defense procurement reference — consultants & industry", fr: "Marchés défense publics — référence consultants et industriels" },
  total:       { en: "Total",         fr: "Total" },
  indexed:     { en: "contracts indexed",  fr: "contrats référencés" },
  open:        { en: "Open",          fr: "Ouverts" },
  activeTend:  { en: "active tenders",     fr: "appels d'offres actifs" },
  awarded:     { en: "Awarded",       fr: "Attribués" },
  signed:      { en: "contracts signed",   fr: "contrats signés" },
  totalVal:    { en: "Total Est. Value",   fr: "Valeur totale est." },
  midpoint:    { en: "midpoint estimate",  fr: "milieu fourchette — estimatif" },
  searchPh:    { en: "Search contract, authority, program...", fr: "Rechercher un contrat, une autorité, un programme..." },
  allStatus:   { en: "All Statuses",       fr: "Tous les statuts" },
  allAuth:     { en: "All Authorities",    fr: "Toutes autorités" },
  allCat:      { en: "All Categories",     fr: "Toutes catégories" },
  sourceNote:  { en: "Data sourced from public procurement databases (DGA, OCCAR, NATO NSPA, DoD SAR, OJEU) — reference use only · not a real-time procurement monitoring tool",
                 fr: "Données issues de sources publiques (DGA, OCCAR, NATO NSPA, DoD SAR, OJEU) — usage référentiel uniquement · pas un outil de veille temps réel" },
  shown:       { en: "contracts shown", fr: "contrats affichés" },
  contract:    { en: "contract shown",  fr: "contrat affiché" },
  noMatch:     { en: "No contracts match the selected filters.", fr: "Aucun contrat ne correspond aux filtres sélectionnés." },
  exportCsv:   { en: "Export CSV",     fr: "Export CSV" },
  // Status labels
  sOpen:       { en: "Open",      fr: "Ouvert" },
  sAwarded:    { en: "Awarded",   fr: "Attribué" },
  sClosed:     { en: "Closed",    fr: "Fermé" },
  sCancelled:  { en: "Cancelled", fr: "Annulé" },
  // Authority labels
  aNational:   { en: "National",  fr: "Nationale" },
  aNato:       { en: "NATO",      fr: "OTAN" },
  aEu:         { en: "EU",        fr: "UE" },
  aBilateral:  { en: "Bilateral", fr: "Bilatéral" },
  // Category labels
  cAero:       { en: "Aerospace", fr: "Aérospatial" },
  cNaval:      { en: "Naval",     fr: "Naval" },
  cLand:       { en: "Land",      fr: "Terrestre" },
  cCyber:      { en: "Cyber",     fr: "Cyber" },
  cSvc:        { en: "Services",  fr: "Services" },
  cLog:        { en: "Logistics", fr: "Logistique" },
  cSpace:      { en: "Space",     fr: "Spatial" },
  cMissiles:   { en: "Missiles",  fr: "Missiles" },
  // Recent strip
  recent:      { en: "Recent Activity",  fr: "Activité récente" },
  recentSub:   { en: "Latest contracts & tenders indexed", fr: "Derniers contrats & appels d'offres référencés" },
  // Card fields
  estVal:      { en: "Est. Value",    fr: "Valeur estimée" },
  published:   { en: "Published",     fr: "Publication" },
  deadline:    { en: "Deadline",      fr: "Échéance" },
  awardedTo:   { en: "Awarded To",    fr: "Attributaire" },
  undisclosed: { en: "Undisclosed",   fr: "Non divulgué" },
  officialSrc: { en: "Official source", fr: "Source officielle" },
  noSrc:       { en: "No source",     fr: "Source non renseignée" },
  confirmed:   { en: "✓ Confirmed",   fr: "✓ Confirmé" },
  estimated:   { en: "~ Estimated",   fr: "~ Estimé" },
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
                  ? ` · $${c.amount_min ?? "?"}M–$${c.amount_max ?? "?"}M`
                  : ` · ${tUndis}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContractCard({ contract }) {
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

  function fmtAmount(min, max) {
    if (!min && !max) return tUndis;
    if (min && max) return `$${min}M – $${max}M`;
    if (min) return `≥ $${min}M`;
    return `≤ $${max}M`;
  }

  return (
    <Card className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:shadow-lg hover:border-purple-200 transition-all duration-300">
      <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-sm font-semibold text-slate-900 leading-snug">
              {contract.title}
            </CardTitle>
            <p className="text-xs text-slate-500 mt-1">
              {contract.contracting_authority} · {contract.authority_country}
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
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">{tAwardedTo}</p>
              <p className="text-xs text-emerald-600 font-medium">{contract.awarded_to}</p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          {contract.source_url ? (
            <a href={contract.source_url} target="_blank" rel="noopener noreferrer"
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

export default function Contracts() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedAuthority, setSelectedAuthority] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

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
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <FileCheck size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">{tNoMatch}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((c) => <ContractCard key={c.id} contract={c} />)}
        </div>
      )}
    </div>
  );
}
