import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { API, useAuth } from "@/App";
import CompanyProfileSheet from "@/components/CompanyProfileSheet";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Search, ArrowRight, ArrowLeftRight, Plus, CircleDot,
  Clock, Database, Filter, TrendingUp, ChevronDown, ChevronUp,
  ExternalLink, Download, Calendar, User, AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { format } from "date-fns";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

// ── Constants ──────────────────────────────────────────────────────────────

const PAGE_SIZE      = 50;   // items per page — recent view
const HIST_PAGE_SIZE = 100;  // items per page — historical view

const STATUS_OPTIONS = [
  { value: "all",          label: "All Statuses" },
  { value: "announced",    label: "Announced" },
  { value: "pending",      label: "Pending" },
  { value: "under_review", label: "Under Review" },
  { value: "completed",    label: "Completed" },
  { value: "active",       label: "Active (JV/Structure)" },
  { value: "cancelled",    label: "Cancelled" },
  { value: "dissolved",    label: "Dissolved" },
  { value: "exited",       label: "Exited" },
];

const DEAL_TYPE_OPTIONS = [
  { value: "all",                  label: "All Types" },
  { value: "acquisition",          label: "Acquisition" },
  { value: "merger",               label: "Merger" },
  { value: "joint_venture",        label: "Joint Venture" },
  { value: "strategic_investment", label: "Strategic Investment" },
  { value: "minority_stake",       label: "Minority Stake" },
];

const YEAR_OPTIONS = [
  { value: "all", label: "All Years" },
  ...[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018].map((y) => ({
    value: String(y), label: String(y),
  })),
];

const PERIOD_OPTIONS = [
  { value: "7",  label: "7D" },
  { value: "30", label: "30D" },
  { value: "90", label: "90D" },
  { value: "0",  label: "All" },
];

const LOGO_FALLBACK = {
  "Lockheed Martin":             "lockheedmartin.com",
  "Raytheon Technologies":       "rtx.com",
  "RTX":                         "rtx.com",
  "RTX Ventures":                "rtx.com",
  "L3Harris":                    "l3harris.com",
  "L3Harris Technologies":       "l3harris.com",
  "Northrop Grumman":            "northropgrumman.com",
  "General Dynamics":            "gd.com",
  "BAE Systems":                 "baesystems.com",
  "Thales":                      "thalesgroup.com",
  "Leonardo":                    "leonardo.com",
  "Leonardo DRS":                "leonardodrs.com",
  "Airbus":                      "airbus.com",
  "Rheinmetall":                 "rheinmetall.com",
  "Safran":                      "safran-group.com",
  "KNDS":                        "knds.de",
  "Hanwha":                      "hanwha.com",
  "Hanwha Ocean":                "hanwha.com",
  "Boeing":                      "boeing.com",
  "Teledyne Technologies":       "teledyne.com",
  "FLIR Systems":                "flir.com",
  "Parker Hannifin":             "parker.com",
  "Meggitt":                     "meggitt.com",
  "Cobham":                      "cobham.com",
  "Ultra Electronics":           "ultra.group",
  "TransDigm":                   "transdigm.com",
  "Mercury Systems":             "mrcy.com",
  "AeroVironment":               "avinc.com",
  "Shield AI":                   "shield.ai",
  "SAIC":                        "saic.com",
  "Spirit AeroSystems":          "spiritaero.com",
  "Collins Aerospace Actuation": "collinsaerospace.com",
  "Ball Aerospace":              "ball.com",
  "Terran Orbital":              "terranorbital.com",
  "Dassault Aviation":           "dassault-aviation.com",
  "Dassault":                    "dassault-aviation.com",
  "Naval Group":                 "naval-group.com",
  "Anduril":                     "anduril.com",
  "Anduril Industries":          "anduril.com",
  "Palantir":                    "palantir.com",
  "Kratos":                      "kratosdefense.com",
  "Helsing":                     "helsing.ai",
  "Milrem Robotics":             "milremrobotics.com",
  "Preligens":                   "preligens.com",
  "Capella Space":               "capellaspace.com",
  "Epirus":                      "epirusinc.com",
  "Harmattan.ai":                "harmattan.ai",
  "ArianeGroup":                 "arianegroup.com",
  "MBDA":                        "mbda-systems.com",
  "RADA Electronic Industries":  "rada.com",
  "Nightwing Group":             "nightwinggroup.com",
  "Rebellion Defense":           "rebelliondefense.com",
  "KNDS France":                 "knds.com",
  "KNDS Germany":                "knds.com",
  "Texelis Defense":             "texelis.com",
  "Tomahawk Robotics":           "tomahawkrobotics.com",
  "Saab":                        "saabgroup.com",
  "Saab AB":                     "saabgroup.com",
  "MD Helicopters":              "mdhelicopters.com",
  "Leonardo DRS":                "leonardodrs.com",
  "Calspan Corporation":         "calspan.com",
  "Kongsberg":                   "kongsberg.com",
  "Kongsberg Defence & Aerospace": "kongsberg.com",
  "Patria Oyj":                  "patriagroup.com",
  "Leidos":                      "leidos.com",
  "Dynetics":                    "leidos.com",
  "Loc Performance Products":    "rheinmetall.com",
  "Dassault":                    "dassault-aviation.com",
  "Dassault Aviation":           "dassault-aviation.com",
  "Indra":                       "indracompany.com",
  "Expal Systems":               "maxamcorp.com",
  "Hensoldt":                    "hensoldt.net",
  "QinetiQ":                     "qinetiq.com",
  "Babcock":                     "babcock.com",
  "Babcock International":       "babcock.com",
  "Frazer-Nash Consultancy":     "babcock.com",
  "Rheinmetall":                 "rheinmetall.com",
  "Leonardo":                    "leonardo.com",
  "Elbit Systems":               "elbitsystems.com",
  "IMI Systems":                 "elbitsystems.com",
  "HEICO":                       "heico.com",
  "HEICO Corporation":           "heico.com",
  "Wencor Group":                "heico.com",
  "Huntington Ingalls Industries": "hii.com",
  "HII":                         "hii.com",
  "Alion Science and Technology": "hii.com",
  "Peraton":                     "peraton.com",
  "Perspecta":                   "peraton.com",
  "ManTech International":       "mantech.com",
  "Carlyle Group":               "carlyle.com",
  "Exail":                       "exail.com",
  "iXBlue":                      "exail.com",
  "ECA Group":                   "ecagroup.com",
  "Avantus Federal":             "qinetiq.com",
  "Condor Systems":              "l3harris.com",
  "Blue Canyon Technologies":    "rtx.com",
  "Martin UAV":                  "shield.ai",
  "Gibbs & Cox":                 "leidos.com",
  "Dynetics":                    "leidos.com",
  "Ercom":                       "thalesgroup.com",
  // ── Aerospace / Aviation ──────────────────────────────────────────────────
  "Bombardier":                  "bombardier.com",
  "Bombardier C Series":         "bombardier.com",
  "Bombardier C Series programme": "bombardier.com",
  "Spirit AeroSystems":          "spiritaero.com",
  "Blue Canyon Technologies":    "rtx.com",
  // ── Nordic / APAC ─────────────────────────────────────────────────────────
  "Patria":                      "patriagroup.com",
  "Patria Oyj":                  "patriagroup.com",
  "Tomahawk Robotics":           "tomahawkrobotics.com",
  "Adranos":                     "anduril.com",
  "Area-I":                      "anduril.com",
  "Rebellion Defense":           "rebelliondefense.com",
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

// ── Country flag (flagcdn.com image, more reliable than emoji) ────────────
function FlagImg({ iso2, className = "" }) {
  if (!iso2 || iso2.length !== 2) return null;
  return (
    <img
      src={`https://flagcdn.com/w20/${iso2.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/w40/${iso2.toLowerCase()}.png 2x`}
      alt={iso2}
      className={`object-cover rounded-[2px] shadow-sm border border-white/60 ${className}`}
      style={{ width: 16, height: 11 }}
    />
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────

function getStatusStyle(status) {
  switch (status) {
    case "completed":    return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "active":       return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "pending":      return "bg-amber-50 text-amber-700 border-amber-200";
    case "under_review": return "bg-orange-50 text-orange-700 border-orange-200";
    case "announced":    return "bg-blue-50 text-blue-700 border-blue-200";
    case "cancelled":    return "bg-rose-50 text-rose-700 border-rose-200";
    case "dissolved":    return "bg-slate-100 text-slate-500 border-slate-200";
    case "exited":       return "bg-purple-50 text-purple-700 border-purple-200";
    default:             return "bg-slate-100 text-slate-600 border-slate-200";
  }
}

function formatStatus(s) {
  const map = { under_review: "Under Review", joint_venture: "Joint Venture" };
  return map[s] ?? (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");
}

function formatValue(dealValue, isDisclosed = true) {
  if (!isDisclosed) return "Undisclosed";
  if (!dealValue || dealValue === 0) return "—";
  return dealValue >= 1000 ? `$${(dealValue / 1000).toFixed(1)}B` : `$${dealValue}M`;
}

function getStatusAccentBg(status) {
  switch (status) {
    case "completed": case "active":       return "bg-emerald-500";
    case "pending":   case "under_review": return "bg-amber-400";
    case "announced":                      return "bg-blue-500";
    case "cancelled":                      return "bg-rose-500";
    case "dissolved": case "exited":       return "bg-slate-400";
    default:                               return "bg-purple-500";
  }
}

function getDealSizeBadge(value) {
  if (!value || value === 0) return null;
  if (value >= 5000)  return { label: "Mega deal",  cls: "bg-rose-50 text-rose-700 border-rose-200" };
  if (value >= 1000)  return { label: "Large deal",  cls: "bg-orange-50 text-orange-700 border-orange-200" };
  if (value >= 100)   return { label: "Mid-size",    cls: "bg-yellow-50 text-yellow-700 border-yellow-200" };
  return null;
}

function getDealLabels(dealType) {
  switch (dealType) {
    case "merger":               return { left: "PARTY A",    right: "PARTY B",       sep: "merger" };
    case "joint_venture":        return { left: "CO-FOUNDER", right: "JV ENTITY",     sep: "jv" };
    case "minority_stake":       return { left: "INVESTOR",   right: "PORTFOLIO CO.", sep: "invest" };
    case "strategic_investment": return { left: "INVESTOR",   right: "PORTFOLIO CO.", sep: "invest" };
    default:                     return { left: "ACQUIRER",   right: "TARGET",        sep: "arrow" };
  }
}

function DealSep({ type }) {
  const base = "w-9 h-9 rounded-full flex items-center justify-center";
  if (type === "merger")  return <div className="w-10 flex justify-center shrink-0"><div className={`${base} bg-blue-100`}><ArrowLeftRight className="w-4 h-4 text-blue-600" /></div></div>;
  if (type === "jv")      return <div className="w-10 flex justify-center shrink-0"><div className={`${base} bg-teal-100`}><Plus className="w-4 h-4 text-teal-600" /></div></div>;
  if (type === "invest")  return <div className="w-10 flex justify-center shrink-0"><div className={`${base} bg-emerald-100`}><CircleDot className="w-4 h-4 text-emerald-600" /></div></div>;
  return <div className="w-10 flex justify-center shrink-0"><div className={`${base} bg-purple-100`}><ArrowRight className="w-4 h-4 text-purple-600" /></div></div>;
}

function RoundBadge({ roundType }) {
  const map = {
    seed:     "bg-violet-50 text-violet-700 border-violet-200",
    series_a: "bg-blue-50 text-blue-700 border-blue-200",
    series_b: "bg-indigo-50 text-indigo-700 border-indigo-200",
    series_c: "bg-purple-50 text-purple-700 border-purple-200",
    series_d: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
    series_e: "bg-pink-50 text-pink-700 border-pink-200",
    series_f: "bg-rose-50 text-rose-700 border-rose-200",
    growth:   "bg-teal-50 text-teal-700 border-teal-200",
    buyout:   "bg-amber-50 text-amber-700 border-amber-200",
  };
  const label = roundType?.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase());
  if (!map[roundType]) return null;
  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${map[roundType]}`}>{label}</span>;
}

// Corporate suffixes to strip when doing fuzzy name matching
const CORP_SUFFIX_RE = /\s+(se|ag|gmbh|kg|nv|bv|sa|sas|plc|ltd|llc|inc|corp|co\.|group|international|industries|technologies|systems|solutions|defense|defence|aerospace|aviation|naval|digital|ventures|federal|division|holding|holdings)\b.*/gi;

function normalizeName(name) {
  return name.toLowerCase().replace(CORP_SUFFIX_RE, "").trim();
}

function getLogoDomain(activity, side) {
  const domainField = side === "acquirer" ? "acquirer_logo_domain" : "target_logo_domain";
  const nameField   = side === "acquirer" ? "acquirer" : "target";
  const name = activity[nameField] ?? "";

  // 1. Explicit domain from DB
  if (activity[domainField]) return activity[domainField];

  // 2. Exact name match in LOGO_FALLBACK
  if (LOGO_FALLBACK[name]) return LOGO_FALLBACK[name];

  // 3. Fuzzy match: strip corporate suffixes, then compare
  const normName = normalizeName(name);
  for (const [key, domain] of Object.entries(LOGO_FALLBACK)) {
    if (normalizeName(key) === normName) return domain;
  }

  // 4. Partial match: LOGO_FALLBACK key is a prefix of the company name (e.g. "Airbus" in "Airbus Defence")
  for (const [key, domain] of Object.entries(LOGO_FALLBACK)) {
    const normKey = normalizeName(key);
    if (normKey.length >= 4 && normName.startsWith(normKey)) return domain;
  }

  return null;
}

// ── Logo component — Clearbit → Google Favicon → coloured initials ───────────
// Stratégie :
//   1. Clearbit logo.clearbit.com/{domain}  — logo HD, échec silencieux via onError
//   2. Google Favicon V2 (sz=128)           — instantané, fiable pour 100% des domaines
//   3. Initiales colorées déterministes     — dernier recours, pas d'appel réseau

function CompanyLogo({ activity, side, size = "md" }) {
  const [level, setLevel] = useState(1); // 1=clearbit 2=google 3=initials

  const name    = activity[side === "acquirer" ? "acquirer" : "target"] ?? "";
  const country = activity[side === "acquirer" ? "acquirer_country" : "target_country"];
  const domain  = getLogoDomain(activity, side);
  const sizeClass = size === "sm" ? "w-8 h-8" : "w-11 h-11";
  const textSize  = size === "sm" ? "text-[9px]" : "text-xs";

  // Reset when the domain changes (different deal row)
  useEffect(() => { setLevel(1); }, [domain, name]);

  const flag = country ? (
    <div className="absolute -bottom-1 -right-1">
      <FlagImg iso2={country} />
    </div>
  ) : null;

  function logoBox(src) {
    return (
      <div className="relative shrink-0">
        <div className={`${sizeClass} rounded-xl bg-white border border-slate-100 shadow-sm overflow-hidden flex items-center justify-center`}>
          <img
            src={src}
            alt={name}
            className="w-full h-full object-contain p-1"
            onError={() => setLevel((l) => Math.min(l + 1, 3))}
          />
        </div>
        {flag}
      </div>
    );
  }

  // Level 1 — Clearbit HD logo
  if (level === 1 && domain) return logoBox(`https://logo.clearbit.com/${domain}`);

  // Level 2 — Google Favicon V2 (sz=128, instantané, pas d'API key)
  if (level <= 2 && domain) {
    return logoBox(`https://www.google.com/s2/favicons?domain=https://${domain}&sz=128`);
  }

  // Level 3 — Coloured initials avatar
  return (
    <div className={`${sizeClass} ${avatarColor(name)} rounded-xl flex items-center justify-center relative shrink-0 shadow-sm`}>
      <span className={`${textSize} font-bold text-white tracking-tight select-none`}>{initials(name)}</span>
      {flag}
    </div>
  );
}

// ── Inline "View Profile" button ───────────────────────────────────────────

function ProfileLink({ name, onOpen }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onOpen(name); }}
      title={`View ${name} profile`}
      className="text-slate-400 hover:text-purple-600 transition-colors"
    >
      <User className="w-3.5 h-3.5" />
    </button>
  );
}

// ── Card ───────────────────────────────────────────────────────────────────

function MACard({ activity, onOpenProfile }) {
  const [open, setOpen] = useState(false);
  const labels   = getDealLabels(activity.deal_type);
  const accent   = getStatusAccentBg(activity.status);
  const sizeBadge = getDealSizeBadge(activity.is_disclosed !== false ? activity.deal_value : 0);
  const daysAgo  = Math.floor((Date.now() - new Date(activity.announced_date).getTime()) / 86_400_000);

  return (
    <div
      className="relative bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-lg hover:border-purple-200 transition-all duration-300 overflow-hidden"
      data-testid={`ma-item-${activity.id}`}
    >
      {/* Status colour stripe */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${accent}`} />

      <div className="p-5 pl-6">
        {/* ── Top: companies + meta ── */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-5">

          {/* Companies */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Acquirer */}
            <div className="flex items-center gap-2.5 shrink-0">
              <CompanyLogo activity={activity} side="acquirer" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-900 font-semibold text-sm leading-snug">{activity.acquirer}</span>
                  <ProfileLink name={activity.acquirer} onOpen={onOpenProfile} />
                </div>
                <span className="text-[9px] text-slate-400 font-mono tracking-widest uppercase">{labels.left}</span>
              </div>
            </div>

            <DealSep type={labels.sep} />

            {/* Target */}
            <div className="flex items-center gap-2.5 min-w-0">
              <CompanyLogo activity={activity} side="target" />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-900 font-semibold text-sm leading-snug truncate">{activity.target}</span>
                  <ProfileLink name={activity.target} onOpen={onOpenProfile} />
                </div>
                <span className="text-[9px] text-slate-400 font-mono tracking-widest uppercase">{labels.right}</span>
              </div>
            </div>
          </div>

          {/* Meta strip */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 lg:justify-end">

            {/* Value */}
            <div className="min-w-[70px]">
              <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mb-0.5">Value</p>
              <p className="text-lg font-mono font-bold text-purple-700 leading-none">
                {formatValue(activity.deal_value, activity.is_disclosed ?? true)}
              </p>
              {activity.stake_percentage != null && (
                <p className="text-[9px] text-slate-400 font-mono mt-0.5">{activity.stake_percentage}% stake</p>
              )}
            </div>

            {/* Type */}
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mb-0.5">Type</p>
              <span className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded capitalize font-medium">
                {activity.deal_type.replaceAll("_", " ")}
              </span>
            </div>

            {/* Date */}
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mb-0.5">Date</p>
              <p className="text-xs text-slate-700 font-medium whitespace-nowrap">
                {format(new Date(activity.announced_date), "d MMM yyyy")}
              </p>
              {daysAgo >= 0 && daysAgo <= 14 && (
                <p className="text-[9px] text-purple-600 font-semibold mt-0.5">
                  {daysAgo === 0 ? "Today" : `${daysAgo}d ago`}
                </p>
              )}
            </div>

            {/* Status + badges column */}
            <div className="flex flex-col items-start gap-1">
              <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${getStatusStyle(activity.status)}`}>
                {formatStatus(activity.status)}
              </span>
              {activity.round_type && <RoundBadge roundType={activity.round_type} />}
              {sizeBadge && (
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${sizeBadge.cls}`}>
                  {sizeBadge.label}
                </span>
              )}
            </div>

            {/* Source + details */}
            <div className="flex flex-col items-start gap-1">
              {activity.source_url && (
                <a
                  href={activity.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[9px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full hover:bg-emerald-100 transition-colors"
                >
                  <ExternalLink className="w-2.5 h-2.5" /> Source
                </a>
              )}
              {(activity.rationale || activity.description) && (
                <button
                  onClick={() => setOpen((v) => !v)}
                  className="flex items-center gap-0.5 text-[11px] text-purple-600 hover:text-purple-800 font-semibold transition-colors mt-0.5"
                >
                  {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  {open ? "Moins" : "Détails"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Description — always visible */}
        {activity.description && (
          <p className="text-slate-500 text-[13px] mt-4 pt-3 border-t border-slate-100 leading-relaxed">
            {activity.description}
          </p>
        )}

        {/* Accordion — rationale + source link */}
        {open && (
          <div className="mt-3 pt-3 border-t border-purple-100 space-y-3">
            {activity.rationale && (
              <p className="text-slate-600 text-sm leading-relaxed">{activity.rationale}</p>
            )}
            <div className="flex flex-wrap gap-3 items-center">
              {activity.acquirer_country && (
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <FlagImg iso2={activity.acquirer_country} /> {activity.acquirer_country}
                  {" → "}
                  {activity.target_country && <><FlagImg iso2={activity.target_country} /> {activity.target_country}</>}
                </span>
              )}
              {activity.source_url && (
                <a
                  href={activity.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-purple-600 hover:text-purple-800 font-semibold"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Lire la source
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Historical table row ───────────────────────────────────────────────────

function HistoricalRow({ activity, index, onOpenProfile }) {
  const [open, setOpen] = useState(false);
  const hasDetail = !!(activity.rationale || activity.source_url);
  const labels = getDealLabels(activity.deal_type);

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
            <div>
              <span className="text-sm text-slate-800 font-medium">{activity.acquirer}</span>
              <p className="text-[10px] text-slate-400 font-mono">{labels.left}</p>
            </div>
            <ProfileLink name={activity.acquirer} onOpen={onOpenProfile} />
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <CompanyLogo activity={activity} side="target" size="sm" />
            <div>
              <span className="text-sm text-slate-800">{activity.target}</span>
              <p className="text-[10px] text-slate-400 font-mono">{labels.right}</p>
            </div>
            <ProfileLink name={activity.target} onOpen={onOpenProfile} />
          </div>
        </td>
        <td className="px-4 py-3 text-sm font-mono font-semibold text-purple-700">
          <div>
            {formatValue(activity.deal_value, activity.is_disclosed ?? true)}
            {activity.stake_percentage != null && (
              <p className="text-[10px] text-slate-400 font-mono">{activity.stake_percentage}%</p>
            )}
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="flex flex-col gap-1">
            <span className="text-xs capitalize bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
              {activity.deal_type.replaceAll("_", " ")}
            </span>
            <RoundBadge roundType={activity.round_type} />
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="flex flex-col gap-1">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full border w-fit ${getStatusStyle(activity.status)}`}>
              {formatStatus(activity.status)}
            </span>
            {activity.source_url && (
              <a
                href={activity.source_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-[10px] font-medium text-emerald-600 hover:text-emerald-800"
              >
                <ExternalLink className="w-2.5 h-2.5" /> Source
              </a>
            )}
          </div>
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
  const headers = [
    "Date", "Acquirer", "Acquirer Country", "Target", "Target Country",
    "Deal Value (M USD)", "Is Disclosed", "Stake %", "Type", "Round",
    "Status", "Description", "Rationale", "Source URL",
  ];
  const rows = data.map((a) => [
    format(new Date(a.announced_date), "yyyy-MM-dd"),
    `"${a.acquirer}"`,
    a.acquirer_country || "",
    `"${a.target}"`,
    a.target_country || "",
    a.deal_value || 0,
    a.is_disclosed ?? true,
    a.stake_percentage ?? "",
    a.deal_type,
    a.round_type || "",
    a.status,
    `"${(a.description || "").replace(/"/g, "'")}"`,
    `"${(a.rationale || "").replace(/"/g, "'")}"`,
    a.source_url || "",
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
  const { token }                              = useAuth();
  const [activities,     setActivities]        = useState([]);
  const [historical,     setHistorical]        = useState([]);
  const [loading,        setLoading]           = useState(true);
  const [histLoading,    setHistLoading]       = useState(false);
  const [loadingMore,    setLoadingMore]       = useState(false);
  const [histLoadingMore, setHistLoadingMore]  = useState(false);
  const [error,          setError]             = useState(null);
  const [tab,            setTab]               = useState("historical");
  const [searchTerm,     setSearchTerm]        = useState("");
  const [selectedStatus, setSelectedStatus]    = useState("all");
  const [selectedType,   setSelectedType]      = useState("all");
  const [selectedYear,   setSelectedYear]      = useState("all");
  const [profileName,    setProfileName]       = useState(null);
  const [period,         setPeriod]            = useState("0");
  const [sortField,      setSortField]         = useState("announced_date");
  const [sortDir,        setSortDir]           = useState("desc");
  const [hasMore,        setHasMore]           = useState(false);
  const [histHasMore,    setHistHasMore]       = useState(false);
  const [scraping,       setScraping]          = useState(false);
  const [metaTotal,      setMetaTotal]         = useState(null);
  const [metaLastScraped, setMetaLastScraped]  = useState(null);

  const fetchRecent = async (days, append = false) => {
    if (append) setLoadingMore(true);
    else setLoading(true);
    setError(null);
    try {
      const currentOffset = append ? activities.length : 0;
      const params = { limit: PAGE_SIZE, offset: currentOffset };
      if (days === "0") params.days = 0;
      else params.days = Number(days);
      const res = await axios.get(`${API}/ma-activities`, { params });
      if (append) setActivities((prev) => [...prev, ...res.data]);
      else setActivities(res.data);
      setHasMore(res.data.length === PAGE_SIZE);
    } catch {
      setError("Failed to load M&A deals. Check your connection and try again.");
    } finally {
      if (append) setLoadingMore(false);
      else setLoading(false);
    }
  };

  const fetchHist = async (append = false) => {
    if (append) setHistLoadingMore(true);
    else setHistLoading(true);
    try {
      const currentOffset = append ? historical.length : 0;
      const res = await axios.get(`${API}/ma-activities/historical`, {
        params: { limit: HIST_PAGE_SIZE, offset: currentOffset },
      });
      if (append) setHistorical((prev) => [...prev, ...res.data]);
      else setHistorical(res.data);
      setHistHasMore(res.data.length === HIST_PAGE_SIZE);
    } catch {
      // silent — table shows empty state
    } finally {
      if (append) setHistLoadingMore(false);
      else setHistLoading(false);
    }
  };

  const fetchMeta = async () => {
    try {
      const res = await axios.get(`${API}/ma-activities/meta`);
      setMetaTotal(res.data.total);
      setMetaLastScraped(res.data.last_scraped_at);
    } catch {
      // silent
    }
  };

  const handleRefresh = async () => {
    if (!token || scraping) return;
    setScraping(true);
    try {
      await axios.post(`${API}/ma-activities/scrape`, {}, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 60000,
      });
      await fetchRecent(period, false);
      await fetchMeta();
    } catch {
      // silent — new data might still have been saved
      await fetchRecent(period, false);
      await fetchMeta();
    } finally {
      setScraping(false);
    }
  };

  useEffect(() => { fetchRecent(period); }, [period]);
  useEffect(() => { fetchMeta(); }, []);

  useEffect(() => {
    if (tab !== "historical" || historical.length) return;
    fetchHist(false);
  }, [tab, historical.length]);

  const applyFilters = (list) => list.filter((a) => {
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

  const filteredRecent = applyFilters(activities);

  const filteredHist = useMemo(() => {
    let list = applyFilters(historical);
    if (selectedYear !== "all")
      list = list.filter((a) => String(new Date(a.announced_date).getFullYear()) === selectedYear);
    return [...list].sort((a, b) => {
      const va = sortField === "deal_value" ? (a.deal_value || 0) : new Date(a.announced_date).getTime();
      const vb = sortField === "deal_value" ? (b.deal_value || 0) : new Date(b.announced_date).getTime();
      return sortDir === "asc" ? va - vb : vb - va;
    });
  }, [historical, selectedStatus, selectedType, selectedYear, searchTerm, sortField, sortDir]);

  const handleSort = (field) => {
    if (sortField === field) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("desc"); }
  };

  const displayList  = tab === "recent" ? filteredRecent : filteredHist;
  const totalValue   = displayList.filter((a) => a.is_disclosed ?? true).reduce((s, a) => s + (a.deal_value || 0), 0);
  const periodLabel  = PERIOD_OPTIONS.find((p) => p.value === period)?.label ?? "30D";
  const lastDealDate = activities[0] ? format(new Date(activities[0].announced_date), "MMM d, yyyy") : null;

  // Chart from historical if loaded, otherwise recent
  const chartSource = historical.length > 0 ? historical : activities;
  const quarterlyData = (() => {
    const map = {};
    chartSource.forEach((a) => {
      const d = new Date(a.announced_date);
      const q = `Q${Math.ceil((d.getMonth() + 1) / 3)} ${d.getFullYear()}`;
      if (!map[q]) map[q] = { quarter: q, count: 0, value: 0, ts: d.getTime() };
      map[q].count += 1;
      map[q].value += a.deal_value || 0;
    });
    return Object.values(map).sort((a, b) => a.ts - b.ts).slice(-8);
  })();

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
          <p className="text-slate-500 text-sm mt-1">Mergers, Acquisitions &amp; Strategic Investments</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Period selector */}
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
            {PERIOD_OPTIONS.map((p) => (
              <button
                key={p.value}
                onClick={() => setPeriod(p.value)}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  period === p.value ? "bg-white text-purple-700 shadow-sm" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 rounded-lg px-3 py-2">
            <Clock className="w-3.5 h-3.5" />
            <span>{lastDealDate ? `Latest: ${lastDealDate}` : "No deals in range"}</span>
            <span className="text-slate-300">|</span>
            <Database className="w-3.5 h-3.5" />
            <span>
              {metaLastScraped
                ? `Scraped: ${format(new Date(metaLastScraped), "MMM d, HH:mm")}`
                : "17 RSS sources"}
            </span>
            {metaTotal != null && (
              <>
                <span className="text-slate-300">|</span>
                <span className="font-mono font-semibold text-slate-700">{metaTotal} total</span>
              </>
            )}
          </div>
          {token && (
            <button
              onClick={handleRefresh}
              disabled={scraping}
              title="Trigger M&A scraper now"
              className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${scraping ? "animate-spin" : ""}`} />
              {scraping ? "Scraping…" : "Refresh"}
            </button>
          )}
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="flex items-center gap-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl px-4 py-3 text-sm">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
          <button onClick={() => fetchRecent(period)} className="ml-auto text-xs font-medium underline underline-offset-2">
            Retry
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">TOTAL DEALS</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-2">{displayList.length}</p>
            <p className="text-xs text-slate-400 mt-1">{tab === "recent" ? `Last ${periodLabel}` : "Filtered"}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">TOTAL VALUE</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-2">{formatValue(totalValue)}</p>
            <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Disclosed deals only
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">IN PROGRESS</p>
            <p className="text-2xl font-mono font-bold text-amber-600 mt-2">
              {displayList.filter((a) => ["announced", "pending", "under_review"].includes(a.status)).length}
            </p>
            <p className="text-xs text-slate-400 mt-1">Announced + Pending + Under Review</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">CLOSED</p>
            <p className="text-2xl font-mono font-bold text-emerald-600 mt-2">
              {displayList.filter((a) => ["completed", "active"].includes(a.status)).length}
            </p>
            <p className="text-xs text-slate-400 mt-1">Completed + Active structures</p>
          </CardContent>
        </Card>
      </div>

      {/* Quarterly chart */}
      {quarterlyData.length > 1 && (
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-semibold text-slate-800">Quarterly Activity</p>
                <p className="text-xs text-slate-400 mt-0.5">Deals announced per quarter</p>
              </div>
              <span className="text-xs text-slate-400 bg-slate-50 border border-slate-200 px-2 py-1 rounded">
                {historical.length > 0 ? "Full history" : "Recent deals"} · last 8 quarters
              </span>
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={quarterlyData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                <XAxis
                  dataKey="quarter"
                  tick={{ fill: "#94A3B8", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fill: "#94A3B8", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  width={24}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-lg text-xs">
                          <p className="font-semibold text-slate-700">{d.quarter}</p>
                          <p className="text-purple-700 font-mono">{d.count} deal{d.count > 1 ? "s" : ""}</p>
                          {d.value > 0 && (
                            <p className="text-slate-500">
                              {d.value >= 1000 ? `$${(d.value / 1000).toFixed(1)}B` : `$${d.value}M`} total
                            </p>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {quarterlyData.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={i === quarterlyData.length - 1 ? "#7E22CE" : "#E9D5FF"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 w-fit">
        <button
          onClick={() => setTab("recent")}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
            tab === "recent" ? "bg-white text-purple-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          {period === "0" ? "All Deals" : `Last ${periodLabel}`}
        </button>
        <button
          onClick={() => setTab("historical")}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
            tab === "historical" ? "bg-white text-purple-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          Full History
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
          {filteredRecent.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
              <p className="font-medium text-slate-700 mb-1">No deals in the last {periodLabel}</p>
              <p className="text-sm text-slate-400">Try extending the period or clearing filters.</p>
            </div>
          ) : (
            filteredRecent.map((activity) => (
              <MACard key={activity.id} activity={activity} onOpenProfile={setProfileName} />
            ))
          )}
          {hasMore && (
            <div className="flex justify-center pt-2">
              <button
                onClick={() => fetchRecent(period, true)}
                disabled={loadingMore}
                className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 transition-colors disabled:opacity-50"
              >
                {loadingMore
                  ? <><RefreshCw className="w-4 h-4 animate-spin" /> Loading…</>
                  : `Load more deals (showing ${activities.length}${metaTotal ? ` of ${metaTotal}` : ""})`}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Historical: table view ── */}
      {tab === "historical" && (
        <div className="space-y-3">
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
                    {[
                      { label: "Date",  field: "announced_date" },
                      { label: "Value", field: "deal_value" },
                    ].reduce((acc, col) => {
                      acc[col.field] = col;
                      return acc;
                    }, {}) && null /* trick to build map inline — headers below */}
                    <th
                      onClick={() => handleSort("announced_date")}
                      className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 cursor-pointer hover:text-slate-800 select-none"
                    >
                      Date {sortField === "announced_date" ? (sortDir === "asc" ? "↑" : "↓") : <span className="text-slate-300">↕</span>}
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Investor / Acquirer</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Target / Portfolio</th>
                    <th
                      onClick={() => handleSort("deal_value")}
                      className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 cursor-pointer hover:text-slate-800 select-none"
                    >
                      Value {sortField === "deal_value" ? (sortDir === "asc" ? "↑" : "↓") : <span className="text-slate-300">↕</span>}
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Type</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 hidden lg:table-cell">Description</th>
                    <th className="px-4 py-3 w-8" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredHist.map((activity, i) => (
                    <HistoricalRow key={activity.id} activity={activity} index={i} onOpenProfile={setProfileName} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {histHasMore && (
          <div className="flex justify-center">
            <button
              onClick={() => fetchHist(true)}
              disabled={histLoadingMore}
              className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 transition-colors disabled:opacity-50"
            >
              {histLoadingMore
                ? <><RefreshCw className="w-4 h-4 animate-spin" /> Loading…</>
                : `Load more (showing ${historical.length}${metaTotal ? ` of ${metaTotal}` : ""})`}
            </button>
          </div>
        )}
        </div>
      )}

      {/* Company profile slide-over */}
      <CompanyProfileSheet
        name={profileName}
        onClose={() => setProfileName(null)}
      />
    </div>
  );
}
