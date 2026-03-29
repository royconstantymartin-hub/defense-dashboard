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
import { Badge } from "@/components/ui/badge";
import {
  Search,
  FileCheck,
  Calendar,
  Globe,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Download,
  ExternalLink,
  DollarSign,
  Filter,
} from "lucide-react";

const STATUS_OPTIONS = [
  { value: "all", label: "Tous les statuts" },
  { value: "open", label: "Ouvert" },
  { value: "awarded", label: "Attribué" },
  { value: "closed", label: "Fermé" },
  { value: "cancelled", label: "Annulé" },
];

const AUTHORITY_OPTIONS = [
  { value: "all", label: "Toutes autorités" },
  { value: "national", label: "Nationale" },
  { value: "nato", label: "OTAN" },
  { value: "eu", label: "Union Européenne" },
  { value: "bilateral", label: "Bilatéral" },
];

const CATEGORY_OPTIONS = [
  { value: "all", label: "Toutes catégories" },
  { value: "aerospace", label: "Aérospatial" },
  { value: "naval", label: "Naval" },
  { value: "land", label: "Terrestre" },
  { value: "cyber", label: "Cyber" },
  { value: "services", label: "Services" },
  { value: "logistics", label: "Logistique" },
  { value: "space", label: "Spatial" },
  { value: "missiles", label: "Missiles" },
];

const STATUS_CONFIG = {
  open:      { label: "Ouvert",    icon: Clock,        color: "bg-blue-500/10 text-blue-400 border border-blue-500/20" },
  awarded:   { label: "Attribué", icon: CheckCircle2,  color: "bg-green-500/10 text-green-400 border border-green-500/20" },
  closed:    { label: "Fermé",    icon: XCircle,       color: "bg-slate-500/10 text-slate-400 border border-slate-500/20" },
  cancelled: { label: "Annulé",   icon: AlertCircle,   color: "bg-red-500/10 text-red-400 border border-red-500/20" },
};

const AUTHORITY_LABELS = {
  national:  "Nationale",
  nato:      "OTAN",
  eu:        "UE",
  bilateral: "Bilatéral",
};

const CATEGORY_LABELS = {
  aerospace: "Aérospatial",
  naval:     "Naval",
  land:      "Terrestre",
  cyber:     "Cyber",
  services:  "Services",
  logistics: "Logistique",
  space:     "Spatial",
  missiles:  "Missiles",
};

const CATEGORY_COLORS = {
  aerospace: "bg-sky-500/10 text-sky-400",
  naval:     "bg-blue-500/10 text-blue-400",
  land:      "bg-amber-500/10 text-amber-400",
  cyber:     "bg-purple-500/10 text-purple-400",
  services:  "bg-slate-500/10 text-slate-400",
  logistics: "bg-orange-500/10 text-orange-400",
  space:     "bg-indigo-500/10 text-indigo-400",
  missiles:  "bg-red-500/10 text-red-400",
};

function formatAmount(min, max) {
  if (!min && !max) return "Montant non divulgué";
  if (min && max) return `$${min}M – $${max}M`;
  if (min) return `≥ $${min}M`;
  return `≤ $${max}M`;
}

function ContractCard({ contract }) {
  const status = STATUS_CONFIG[contract.status] || STATUS_CONFIG.closed;
  const StatusIcon = status.icon;

  return (
    <Card className="bg-slate-800 border-slate-700 hover:border-slate-500 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-sm font-semibold text-white leading-snug">
              {contract.title}
            </CardTitle>
            <p className="text-xs text-slate-400 mt-1">
              {contract.contracting_authority} · {contract.authority_country}
            </p>
          </div>
          <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${status.color}`}>
            <StatusIcon size={11} />
            {status.label}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
          {contract.description}
        </p>

        <div className="flex flex-wrap gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full ${CATEGORY_COLORS[contract.category] || "bg-slate-600 text-slate-300"}`}>
            {CATEGORY_LABELS[contract.category] || contract.category}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
            {AUTHORITY_LABELS[contract.authority_type] || contract.authority_type}
          </span>
          {contract.program && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-400">
              {contract.program}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">Valeur estimée</p>
            <p className="text-xs font-mono text-white">
              {formatAmount(contract.amount_min, contract.amount_max)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">Publication</p>
            <p className="text-xs text-slate-300">{contract.publication_date?.slice(0, 10)}</p>
          </div>
          {contract.deadline && (
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">Échéance</p>
              <p className="text-xs text-slate-300">{contract.deadline?.slice(0, 10)}</p>
            </div>
          )}
          {contract.awarded_to && (
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">Attributaire</p>
              <p className="text-xs text-emerald-400 font-medium">{contract.awarded_to}</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-slate-700">
          {contract.source_url ? (
            <a
              href={contract.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ExternalLink size={11} />
              Source officielle
            </a>
          ) : (
            <span className="flex items-center gap-1 text-xs text-amber-500">
              <AlertCircle size={11} />
              Source non renseignée
            </span>
          )}
          <span className={`text-xs ${contract.reliability === "confirmed" ? "text-green-400" : "text-amber-400"}`}>
            {contract.reliability === "confirmed" ? "✓ Confirmé" : "~ Estimé"}
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
      const matchStatus = selectedStatus === "all" || c.status === selectedStatus;
      const matchAuth = selectedAuthority === "all" || c.authority_type === selectedAuthority;
      const matchCat = selectedCategory === "all" || c.category === selectedCategory;
      return matchSearch && matchStatus && matchAuth && matchCat;
    });
  }, [contracts, searchTerm, selectedStatus, selectedAuthority, selectedCategory]);

  const kpis = useMemo(() => {
    const open = contracts.filter((c) => c.status === "open").length;
    const awarded = contracts.filter((c) => c.status === "awarded").length;
    const totalMin = contracts.reduce((sum, c) => sum + (c.amount_min || 0), 0);
    const totalMax = contracts.reduce((sum, c) => sum + (c.amount_max || 0), 0);
    const avgMid = contracts.length
      ? ((totalMin + totalMax) / 2 / 1000).toFixed(1)
      : 0;
    return { open, awarded, total: contracts.length, avgMid };
  }, [contracts]);

  const exportCSV = () => {
    const headers = ["Titre", "Statut", "Autorité", "Pays", "Catégorie", "Programme", "Min ($M)", "Max ($M)", "Attributaire", "Publication", "Fiabilité"];
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
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contracts_export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <FileCheck className="text-blue-400" size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Contrats & Appels d'offres</h1>
            <p className="text-slate-400 text-sm">
              Marchés défense publics — référence consultants et industriels
            </p>
          </div>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm rounded-lg transition-colors"
        >
          <Download size={14} />
          Export CSV
        </button>
      </div>

      {/* KPI bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wide">Total</p>
            <p className="text-2xl font-bold text-white mt-1">{kpis.total}</p>
            <p className="text-xs text-slate-500 mt-0.5">contrats référencés</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wide">Ouverts</p>
            <p className="text-2xl font-bold text-blue-400 mt-1">{kpis.open}</p>
            <p className="text-xs text-slate-500 mt-0.5">appels d'offres actifs</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wide">Attribués</p>
            <p className="text-2xl font-bold text-green-400 mt-1">{kpis.awarded}</p>
            <p className="text-xs text-slate-500 mt-0.5">contrats signés</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wide">Valeur totale est.</p>
            <p className="text-2xl font-bold text-white mt-1">${kpis.avgMid}B</p>
            <p className="text-xs text-slate-500 mt-0.5">milieu fourchette — estimatif</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <Input
            placeholder="Rechercher un contrat, une autorité, un programme..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 text-sm"
          />
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-44 bg-slate-800 border-slate-600 text-white text-sm">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600">
            {STATUS_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value} className="text-white hover:bg-slate-700">
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedAuthority} onValueChange={setSelectedAuthority}>
          <SelectTrigger className="w-44 bg-slate-800 border-slate-600 text-white text-sm">
            <SelectValue placeholder="Autorité" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600">
            {AUTHORITY_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value} className="text-white hover:bg-slate-700">
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-44 bg-slate-800 border-slate-600 text-white text-sm">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600">
            {CATEGORY_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value} className="text-white hover:bg-slate-700">
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Source note */}
      <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/60 border border-slate-700 rounded-lg text-xs text-slate-400">
        <Filter size={12} className="text-slate-500" />
        Données issues de sources publiques (DGA, OCCAR, NATO NSPA, DoD SAR, OJEU) —
        usage référentiel uniquement · pas un outil de veille temps réel
      </div>

      {/* Results count */}
      {!loading && (
        <p className="text-xs text-slate-500">
          {filtered.length} contrat{filtered.length !== 1 ? "s" : ""} affiché{filtered.length !== 1 ? "s" : ""}
        </p>
      )}

      {/* Cards grid */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <FileCheck size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">Aucun contrat ne correspond aux filtres sélectionnés.</p>
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
