import { useEffect, useState, useMemo } from "react";
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
  Database,
} from "lucide-react";

const STATUS_OPTIONS = [
  { value: "all",       label: "All Statuses" },
  { value: "open",      label: "Open" },
  { value: "awarded",   label: "Awarded" },
  { value: "closed",    label: "Closed" },
  { value: "cancelled", label: "Cancelled" },
];

const AUTHORITY_OPTIONS = [
  { value: "all",       label: "All Authorities" },
  { value: "national",  label: "National" },
  { value: "nato",      label: "NATO" },
  { value: "eu",        label: "European Union" },
  { value: "bilateral", label: "Bilateral" },
];

const CATEGORY_OPTIONS = [
  { value: "all",       label: "All Categories" },
  { value: "aerospace", label: "Aerospace" },
  { value: "naval",     label: "Naval" },
  { value: "land",      label: "Land Systems" },
  { value: "cyber",     label: "Cyber" },
  { value: "services",  label: "Services" },
  { value: "logistics", label: "Logistics" },
  { value: "space",     label: "Space" },
  { value: "missiles",  label: "Missiles" },
];

const STATUS_CONFIG = {
  open:      { label: "Open",      icon: Clock,        color: "bg-blue-50 text-blue-700 border border-blue-200" },
  awarded:   { label: "Awarded",   icon: CheckCircle2, color: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
  closed:    { label: "Closed",    icon: XCircle,      color: "bg-slate-100 text-slate-600 border border-slate-200" },
  cancelled: { label: "Cancelled", icon: AlertCircle,  color: "bg-rose-50 text-rose-700 border border-rose-200" },
};

const AUTHORITY_LABELS = {
  national:  "National",
  nato:      "NATO",
  eu:        "EU",
  bilateral: "Bilateral",
};

const CATEGORY_LABELS = {
  aerospace: "Aerospace",
  naval:     "Naval",
  land:      "Land Systems",
  cyber:     "Cyber",
  services:  "Services",
  logistics: "Logistics",
  space:     "Space",
  missiles:  "Missiles",
};

const CATEGORY_COLORS = {
  aerospace: "bg-sky-50 text-sky-700",
  naval:     "bg-blue-50 text-blue-700",
  land:      "bg-amber-50 text-amber-700",
  cyber:     "bg-purple-50 text-purple-700",
  services:  "bg-slate-100 text-slate-600",
  logistics: "bg-orange-50 text-orange-700",
  space:     "bg-indigo-50 text-indigo-700",
  missiles:  "bg-rose-50 text-rose-700",
};

function formatAmount(min, max) {
  if (!min && !max) return "Undisclosed";
  if (min && max) return `$${min}M – $${max}M`;
  if (min) return `≥ $${min}M`;
  return `≤ $${max}M`;
}

function ContractCard({ contract }) {
  const status = STATUS_CONFIG[contract.status] || STATUS_CONFIG.closed;
  const StatusIcon = status.icon;

  return (
    <Card className="bg-white border-slate-200 shadow-sm hover:shadow-lg hover:border-purple-200 transition-all duration-300">
      <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-sm font-semibold text-slate-900 leading-snug">
              {contract.title}
            </CardTitle>
            <p className="text-xs text-slate-500 mt-1">
              {contract.contracting_authority} · {contract.authority_country}
            </p>
          </div>
          <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${status.color}`}>
            <StatusIcon size={11} />
            {status.label}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-3">
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
          {contract.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[contract.category] || "bg-slate-100 text-slate-600"}`}>
            {CATEGORY_LABELS[contract.category] || contract.category}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            {AUTHORITY_LABELS[contract.authority_type] || contract.authority_type}
          </span>
          {contract.program && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-mono">
              {contract.program}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">Est. Value</p>
            <p className="text-xs font-mono font-semibold text-slate-900">
              {formatAmount(contract.amount_min, contract.amount_max)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">Published</p>
            <p className="text-xs text-slate-600">
              {contract.publication_date
                ? new Date(contract.publication_date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
                : "—"}
            </p>
          </div>
          {contract.deadline && (
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">Deadline</p>
              <p className="text-xs text-slate-600">
                {new Date(contract.deadline).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
              </p>
            </div>
          )}
          {contract.awarded_to && (
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">Awarded to</p>
              <p className="text-xs text-emerald-700 font-medium">{contract.awarded_to}</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          {contract.source_url ? (
            <a
              href={contract.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-800 font-medium transition-colors"
            >
              <ExternalLink size={11} />
              Official source
            </a>
          ) : (
            <span className="flex items-center gap-1 text-xs text-amber-600">
              <AlertCircle size={11} />
              No source
            </span>
          )}
          <span className={`text-xs font-medium ${contract.reliability === "confirmed" ? "text-emerald-600" : "text-amber-600"}`}>
            {contract.reliability === "confirmed" ? "✓ Confirmed" : "~ Estimated"}
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

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await axios.get(`${API}/contracts`);
        setContracts(response.data);
      } catch (error) {
        console.error("Error fetching contracts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContracts();
  }, []);

  const filtered = useMemo(() => {
    return contracts.filter((c) => {
      const q = searchTerm.toLowerCase();
      const matchSearch =
        !q ||
        c.title?.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q) ||
        c.contracting_authority?.toLowerCase().includes(q) ||
        c.authority_country?.toLowerCase().includes(q) ||
        c.awarded_to?.toLowerCase().includes(q) ||
        c.program?.toLowerCase().includes(q);
      const matchStatus = selectedStatus    === "all" || c.status         === selectedStatus;
      const matchAuth   = selectedAuthority === "all" || c.authority_type === selectedAuthority;
      const matchCat    = selectedCategory  === "all" || c.category       === selectedCategory;
      return matchSearch && matchStatus && matchAuth && matchCat;
    });
  }, [contracts, searchTerm, selectedStatus, selectedAuthority, selectedCategory]);

  const kpis = useMemo(() => {
    const open    = contracts.filter((c) => c.status === "open").length;
    const awarded = contracts.filter((c) => c.status === "awarded").length;
    const totalMin  = contracts.reduce((sum, c) => sum + (c.amount_min || 0), 0);
    const totalMax  = contracts.reduce((sum, c) => sum + (c.amount_max || 0), 0);
    const midRangeB = contracts.length ? ((totalMin + totalMax) / 2 / 1000).toFixed(1) : 0;
    return { open, awarded, total: contracts.length, midRangeB };
  }, [contracts]);

  const exportCSV = () => {
    const headers = ["Title", "Status", "Authority", "Country", "Category", "Program", "Min ($M)", "Max ($M)", "Awarded To", "Published", "Reliability"];
    const rows = filtered.map((c) => [
      `"${c.title}"`,
      c.status,
      c.contracting_authority,
      c.authority_country,
      c.category,
      c.program || "",
      c.amount_min || "",
      c.amount_max || "",
      c.awarded_to || "",
      c.publication_date?.slice(0, 10) || "",
      c.reliability,
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `contracts_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div data-testid="contracts-page" className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">
            Contracts & Tenders
          </h1>
          <p className="text-slate-500 text-sm mt-1">Defense procurement — reference for consultants &amp; industry</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 rounded-lg px-3 py-2">
            <Database className="w-3.5 h-3.5" />
            <span>DGA · OCCAR · NATO NSPA · DoD · OJEU</span>
          </div>
          <button
            onClick={exportCSV}
            disabled={filtered.length === 0}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 hover:border-purple-300 text-slate-700 text-sm rounded-lg transition-colors disabled:opacity-40"
          >
            <Download size={14} />
            Export CSV
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">TOTAL</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-2">{kpis.total}</p>
            <p className="text-xs text-slate-400 mt-1">contracts indexed</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">OPEN</p>
            <p className="text-2xl font-mono font-bold text-blue-700 mt-2">{kpis.open}</p>
            <p className="text-xs text-slate-400 mt-1">active tenders</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">AWARDED</p>
            <p className="text-2xl font-mono font-bold text-emerald-700 mt-2">{kpis.awarded}</p>
            <p className="text-xs text-slate-400 mt-1">contracts signed</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">MID-RANGE EST.</p>
            <p className="text-2xl font-mono font-bold text-purple-700 mt-2">${kpis.midRangeB}B</p>
            <p className="text-xs text-slate-400 mt-1">total value (midpoint)</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <Input
            placeholder="Search by title, authority, program…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm"
          />
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-44 bg-white border-slate-200 text-slate-700 text-sm">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200">
            {STATUS_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value} className="text-slate-700 focus:bg-purple-50">
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedAuthority} onValueChange={setSelectedAuthority}>
          <SelectTrigger className="w-44 bg-white border-slate-200 text-slate-700 text-sm">
            <SelectValue placeholder="Authority" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200">
            {AUTHORITY_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value} className="text-slate-700 focus:bg-purple-50">
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-44 bg-white border-slate-200 text-slate-700 text-sm">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200">
            {CATEGORY_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value} className="text-slate-700 focus:bg-purple-50">
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Source note */}
      <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500">
        <Filter size={12} className="text-slate-400 flex-shrink-0" />
        Reference data only · not a real-time procurement feed
      </div>

      {/* Result count */}
      <p className="text-xs text-slate-500">
        {filtered.length} contract{filtered.length !== 1 ? "s" : ""} displayed
      </p>

      {/* Cards or empty state */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-slate-400">
          <FileCheck size={40} className="opacity-25" />
          <p className="font-medium text-slate-500">
            {contracts.length === 0 ? "No contracts in database" : "No contracts match your filters"}
          </p>
          {contracts.length === 0 && (
            <p className="text-sm text-center max-w-xs text-slate-400">
              Run <strong className="text-slate-600">Seed Data</strong> from the Admin panel to populate contracts.
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <ContractCard key={c.id} contract={c} />
          ))}
        </div>
      )}
    </div>
  );
}
