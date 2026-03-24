import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "@/App";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search, ArrowRight, Clock, Database,
  Filter, TrendingUp, ChevronDown, ChevronUp,
  ExternalLink, Download, Calendar, User,
} from "lucide-react";
import { format } from "date-fns";

// ── Constants ──────────────────────────────────────────────────────────────

const STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "announced", label: "Announced" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const DEAL_TYPE_OPTIONS = [
  { value: "all", label: "All Types" },
  { value: "acquisition", label: "Acquisition" },
  { value: "merger", label: "Merger" },
  { value: "joint_venture", label: "Joint Venture" },
];

const YEAR_OPTIONS = [
  { value: "all", label: "All Years" },
  ...[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018].map((y) => ({
    value: String(y),
    label: String(y),
  })),
];

// Static domain fallback for companies not yet enriched in DB
const LOGO_FALLBACK = {
  "Lockheed Martin":                  "lockheedmartin.com",
  "Raytheon Technologies":            "rtx.com",
  "RTX":                              "rtx.com",
  "L3Harris":                         "l3harris.com",
  "L3Harris Technologies":            "l3harris.com",
  "Northrop Grumman":                 "northropgrumman.com",
  "General Dynamics":                 "gd.com",
  "BAE Systems":                      "baesystems.com",
  "Thales":                           "thalesgroup.com",
  "Leonardo":                         "leonardo.com",
  "Airbus":                           "airbus.com",
  "Rheinmetall":                      "rheinmetall.com",
  "Safran":                           "safran-group.com",
  "KNDS":                             "knds.de",
  "Hanwha":                           "hanwha.com",
  "Hanwha Ocean":                     "hanwha.com",
  "Boeing":                           "boeing.com",
  "Teledyne Technologies":            "teledyne.com",
  "FLIR Systems":                     "flir.com",
  "Parker Hannifin":                  "parker.com",
  "Meggitt":                          "meggitt.com",
  "Cobham":                           "cobham.com",
  "Ultra Electronics":                "ultra.group",
  "TransDigm":                        "transdigm.com",
  "Mercury Systems":                  "mrcy.com",
  "AeroVironment":                    "avinc.com",
  "Shield AI":                        "shield.ai",
  "SAIC":                             "saic.com",
  "Spirit AeroSystems":               "spiritaero.com",
  "Collins Aerospace Actuation":      "collinsaerospace.com",
  "Ball Aerospace":                   "ball.com",
  "Terran Orbital":                   "terranorbital.com",
};

// Initials avatar colour palette (deterministic by name)
const AVATAR_COLORS = [
  "bg-purple-600", "bg-blue-600", "bg-emerald-600", "bg-amber-600",
  "bg-rose-600",   "bg-indigo-600","bg-teal-600",   "bg-orange-600",
];
function avatarColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffff;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}
function initials(name) {
  return name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

// ISO-2 → emoji flag
function flagEmoji(iso2) {
  if (!iso2 || iso2.length !== 2) return "";
  return iso2
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join("");
}

// ── Helpers ────────────────────────────────────────────────────────────────

function getStatusStyle(status) {
  switch (status) {
    case "completed":  return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "pending":    return "bg-amber-50 text-amber-700 border-amber-200";
    case "announced":  return "bg-blue-50 text-blue-700 border-blue-200";
    case "cancelled":  return "bg-rose-50 text-rose-700 border-rose-200";
    default:           return "bg-slate-100 text-slate-600 border-slate-200";
  }
}

function formatValue(v) {
  if (!v) return "Undisclosed";
  return v >= 1000 ? `$${(v / 1000).toFixed(1)}B` : `$${v}M`;
}

function getLogoDomain(activity, side) {
  const domainField = side === "acquirer" ? "acquirer_logo_domain" : "target_logo_domain";
  const nameField   = side === "acquirer" ? "acquirer" : "target";
  return activity[domainField] || LOGO_FALLBACK[activity[nameField]] || null;
}

// ── Logo component — 3-tier fallback: Clearbit → Google favicon → initials ──

function CompanyLogo({ activity, side, size = "md" }) {
  // 0 = try Clearbit, 1 = try Google favicon, 2 = show initials
  const [tier, setTier] = useState(0);
  const name    = activity[side === "acquirer" ? "acquirer" : "target"];
  const country = activity[side === "acquirer" ? "acquirer_country" : "target_country"];
  const domain  = getLogoDomain(activity, side);
  const sizeClass = size === "sm" ? "w-8 h-8" : "w-12 h-12";
  const textSize  = size === "sm" ? "text-[10px]" : "text-sm";

  const flag = country ? (
    <span className="absolute -bottom-1 -right-1 text-xs leading-none">
      {flagEmoji(country)}
    </span>
  ) : null;

  if (domain && tier === 0) {
    return (
      <div className="relative shrink-0">
        <img
          src={`https://logo.clearbit.com/${domain}`}
          alt={name}
          className={`${sizeClass} rounded-xl object-contain bg-white border border-slate-100 shadow-sm`}
          onError={() => setTier(1)}
        />
        {flag}
      </div>
    );
  }

  if (domain && tier === 1) {
    return (
      <div className="relative shrink-0">
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
          alt={name}
          className={`${sizeClass} rounded-xl object-contain bg-white border border-slate-100 shadow-sm p-1`}
          onError={() => setTier(2)}
        />
        {flag}
      </div>
    );
  }

  // Initials fallback
  return (
    <div className={`${sizeClass} ${avatarColor(name)} rounded-xl flex items-center justify-center relative shrink-0`}>
      <span className={`${textSize} font-bold text-white tracking-tight`}>{initials(name)}</span>
      {flag}
    </div>
  );
}

// ── Inline "View Profile" button ───────────────────────────────────────────

function ProfileLink({ name }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/market-data?q=${encodeURIComponent(name)}`)}
      title={`View ${name} profile`}
      className="text-slate-400 hover:text-purple-600 transition-colors"
    >
      <User className="w-3.5 h-3.5" />
    </button>
  );
}

// ── Card expand section ────────────────────────────────────────────────────

function MACard({ activity }) {
  const [open, setOpen] = useState(false);

  return (
    <Card
      className="bg-white border-slate-200 shadow-sm hover:shadow-lg hover:border-purple-200 transition-all duration-300"
      data-testid={`ma-item-${activity.id}`}
    >
      <CardContent className="p-6">
        {/* Main row */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          {/* Companies */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <CompanyLogo activity={activity} side="acquirer" />
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-slate-900 font-medium leading-tight">{activity.acquirer}</p>
                  <ProfileLink name={activity.acquirer} />
                </div>
                <p className="text-xs text-slate-500 font-mono">ACQUIRER</p>
              </div>
            </div>

            <div className="w-10 flex justify-center shrink-0">
              <div className="w-9 h-9 bg-purple-100 rounded-full flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-purple-600" />
              </div>
            </div>

            <div className="flex items-center gap-3 min-w-0">
              <CompanyLogo activity={activity} side="target" />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-slate-900 font-medium leading-tight truncate">{activity.target}</p>
                  <ProfileLink name={activity.target} />
                </div>
                <p className="text-xs text-slate-500 font-mono">TARGET</p>
              </div>
            </div>
          </div>

          {/* Deal meta */}
          <div className="flex flex-wrap items-center gap-5">
            <div className="text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">DEAL VALUE</p>
              <p className="text-xl font-mono font-bold text-purple-700 mt-1">
                {formatValue(activity.deal_value)}
              </p>
            </div>

            <div className="text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">TYPE</p>
              <p className="text-sm text-slate-700 mt-1 capitalize bg-slate-100 px-2 py-0.5 rounded">
                {activity.deal_type.replace("_", " ")}
              </p>
            </div>

            <div className="text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">DATE</p>
              <p className="text-sm text-slate-700 mt-1">
                {format(new Date(activity.announced_date), "MMM yyyy")}
              </p>
            </div>

            <span className={`text-xs font-medium px-3 py-1.5 rounded-full border ${getStatusStyle(activity.status)}`}>
              {activity.status.toUpperCase()}
            </span>

            {/* Expand toggle */}
            {(activity.rationale || activity.source_url) && (
              <button
                onClick={() => setOpen((v) => !v)}
                className="ml-auto flex items-center gap-1 text-xs text-purple-600 hover:text-purple-800 font-medium transition-colors"
                aria-label="Toggle details"
              >
                {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                {open ? "Less" : "Details"}
              </button>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-500 text-sm mt-4 border-t border-slate-100 pt-4">
          {activity.description}
        </p>

        {/* Accordion: rationale + source */}
        {open && (activity.rationale || activity.source_url) && (
          <div className="mt-3 pt-3 border-t border-purple-100 space-y-2 animate-fade-in">
            {activity.rationale && (
              <p className="text-slate-600 text-sm leading-relaxed">{activity.rationale}</p>
            )}
            {activity.source_url && (
              <a
                href={activity.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-purple-600 hover:text-purple-800 font-medium"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Source article
              </a>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ── Historical table row ───────────────────────────────────────────────────

function HistoricalRow({ activity, index }) {
  const [open, setOpen] = useState(false);
  const hasDetail = !!(activity.rationale || activity.source_url);

  return (
    <>
      <tr
        className={`${index % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-purple-50 transition-colors cursor-pointer`}
        onClick={() => hasDetail && setOpen((v) => !v)}
      >
        <td className="px-4 py-3 text-sm text-slate-700 font-medium">
          {format(new Date(activity.announced_date), "MMM yyyy")}
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <CompanyLogo activity={activity} side="acquirer" size="sm" />
            <span className="text-sm text-slate-800 font-medium">{activity.acquirer}</span>
            <ProfileLink name={activity.acquirer} />
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <CompanyLogo activity={activity} side="target" size="sm" />
            <span className="text-sm text-slate-800">{activity.target}</span>
            <ProfileLink name={activity.target} />
          </div>
        </td>
        <td className="px-4 py-3 text-sm font-mono font-semibold text-purple-700">
          {formatValue(activity.deal_value)}
        </td>
        <td className="px-4 py-3">
          <span className="text-xs capitalize bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
            {activity.deal_type.replace("_", " ")}
          </span>
        </td>
        <td className="px-4 py-3">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${getStatusStyle(activity.status)}`}>
            {activity.status.toUpperCase()}
          </span>
        </td>
        <td className="px-4 py-3 text-xs text-slate-500 hidden lg:table-cell max-w-xs truncate">
          {activity.description}
        </td>
        <td className="px-4 py-3 text-center">
          {hasDetail && (
            <button className="text-purple-400 hover:text-purple-700 transition-colors" aria-label="Expand">
              {open ? <ChevronUp className="w-4 h-4 mx-auto" /> : <ChevronDown className="w-4 h-4 mx-auto" />}
            </button>
          )}
        </td>
      </tr>

      {open && hasDetail && (
        <tr className="bg-purple-50">
          <td colSpan={8} className="px-6 py-4">
            {activity.rationale && (
              <p className="text-slate-600 text-sm leading-relaxed mb-2">{activity.rationale}</p>
            )}
            {activity.source_url && (
              <a
                href={activity.source_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-xs text-purple-600 hover:text-purple-800 font-medium"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Source article
              </a>
            )}
          </td>
        </tr>
      )}
    </>
  );
}

// ── CSV export ─────────────────────────────────────────────────────────────

function exportCSV(data) {
  const headers = ["Date", "Acquirer", "Acquirer Country", "Target", "Target Country",
                   "Deal Value (M USD)", "Type", "Status", "Description"];
  const rows = data.map((a) => [
    format(new Date(a.announced_date), "yyyy-MM-dd"),
    `"${a.acquirer}"`,
    a.acquirer_country || "",
    `"${a.target}"`,
    a.target_country || "",
    a.deal_value || 0,
    a.deal_type,
    a.status,
    `"${(a.description || "").replace(/"/g, "'")}"`,
  ]);
  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `defense-ma-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Main page ──────────────────────────────────────────────────────────────

export default function MAActivity() {
  const [activities,     setActivities]     = useState([]);
  const [historical,     setHistorical]     = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [histLoading,    setHistLoading]    = useState(false);
  const [tab,            setTab]            = useState("recent");   // "recent" | "historical"
  const [searchTerm,     setSearchTerm]     = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType,   setSelectedType]   = useState("all");
  const [selectedYear,   setSelectedYear]   = useState("all");

  // Fetch recent deals (cards view)
  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await axios.get(`${API}/ma-activities`);
        setActivities(res.data);
      } catch (e) {
        console.error("Error fetching M&A activities:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchRecent();
  }, []);

  // Fetch historical data when tab switches
  useEffect(() => {
    if (tab !== "historical" || historical.length) return;
    const fetchHist = async () => {
      setHistLoading(true);
      try {
        const res = await axios.get(`${API}/ma-activities/historical`);
        setHistorical(res.data);
      } catch (e) {
        console.error("Error fetching historical M&A:", e);
      } finally {
        setHistLoading(false);
      }
    };
    fetchHist();
  }, [tab, historical.length]);

  // Filter recent cards
  const filteredRecent = activities.filter((a) => {
    if (selectedStatus !== "all" && a.status !== selectedStatus) return false;
    if (selectedType   !== "all" && a.deal_type !== selectedType) return false;
    if (searchTerm) {
      const t = searchTerm.toLowerCase();
      if (!a.acquirer.toLowerCase().includes(t) &&
          !a.target.toLowerCase().includes(t) &&
          !(a.description || "").toLowerCase().includes(t)) return false;
    }
    return true;
  });

  // Filter historical table
  const filteredHist = historical.filter((a) => {
    if (selectedStatus !== "all" && a.status !== selectedStatus) return false;
    if (selectedType   !== "all" && a.deal_type !== selectedType) return false;
    if (selectedYear   !== "all") {
      const y = new Date(a.announced_date).getFullYear();
      if (String(y) !== selectedYear) return false;
    }
    if (searchTerm) {
      const t = searchTerm.toLowerCase();
      if (!a.acquirer.toLowerCase().includes(t) &&
          !a.target.toLowerCase().includes(t) &&
          !(a.description || "").toLowerCase().includes(t)) return false;
    }
    return true;
  });

  const displayList = tab === "recent" ? filteredRecent : filteredHist;
  const totalValue  = displayList.reduce((s, a) => s + (a.deal_value || 0), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div data-testid="ma-activity-page" className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">
            M&A Activity
          </h1>
          <p className="text-slate-500 text-sm mt-1">Mergers, Acquisitions &amp; Strategic Deals</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 rounded-lg px-3 py-2">
          <Clock className="w-3.5 h-3.5" />
          <span>Updated: {new Date().toLocaleDateString()}</span>
          <span className="text-slate-300">|</span>
          <Database className="w-3.5 h-3.5" />
          <span>Bloomberg, Reuters, SEC</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">TOTAL DEALS</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-2">{displayList.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">TOTAL VALUE</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-2">{formatValue(totalValue)}</p>
            <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Strategic consolidation
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">PENDING</p>
            <p className="text-2xl font-mono font-bold text-amber-600 mt-2">
              {displayList.filter((a) => a.status === "pending").length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">COMPLETED</p>
            <p className="text-2xl font-mono font-bold text-emerald-600 mt-2">
              {displayList.filter((a) => a.status === "completed").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 w-fit">
        <button
          onClick={() => setTab("recent")}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
            tab === "recent"
              ? "bg-white text-purple-700 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Recent Deals
        </button>
        <button
          onClick={() => setTab("historical")}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
            tab === "historical"
              ? "bg-white text-purple-700 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          5-Year History
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search by company name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
            data-testid="search-ma"
          />
        </div>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full sm:w-44 bg-white border-slate-200 text-slate-700" data-testid="status-filter">
            <Filter className="w-4 h-4 mr-2 text-slate-400" />
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

        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-full sm:w-44 bg-white border-slate-200 text-slate-700">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200">
            {DEAL_TYPE_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value} className="text-slate-700 focus:bg-purple-50">
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {tab === "historical" && (
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-full sm:w-36 bg-white border-slate-200 text-slate-700">
              <Calendar className="w-4 h-4 mr-2 text-slate-400" />
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200">
              {YEAR_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value} className="text-slate-700 focus:bg-purple-50">
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {tab === "historical" && filteredHist.length > 0 && (
          <button
            onClick={() => exportCSV(filteredHist)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-md text-sm text-slate-700 hover:bg-purple-50 hover:border-purple-200 transition-colors font-medium"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        )}
      </div>

      {/* ── Recent: card view ── */}
      {tab === "recent" && (
        <div className="space-y-4" data-testid="ma-activities-list">
          {filteredRecent.map((activity) => (
            <MACard key={activity.id} activity={activity} />
          ))}
          {filteredRecent.length === 0 && (
            <div className="text-center py-12 text-slate-500 bg-white rounded-lg border border-slate-200">
              No M&A activities found
            </div>
          )}
        </div>
      )}

      {/* ── Historical: table view ── */}
      {tab === "historical" && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          {histLoading ? (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full" />
            </div>
          ) : filteredHist.length === 0 ? (
            <div className="text-center py-12 text-slate-500">No deals found for selected filters</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Date</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Acquirer</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Target</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Value</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Type</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 hidden lg:table-cell">Description</th>
                    <th className="px-4 py-3 w-8" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredHist.map((activity, i) => (
                    <HistoricalRow key={activity.id} activity={activity} index={i} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
