import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { API, useAuth } from "@/App";
import CompanyProfileSheet from "@/components/CompanyProfileSheet";
import { Card, CardContent } from "@/components/ui/card";
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
  { value: "funding_round",        label: "Funding Round" },
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
  "Hermeus":                     "hermeus.com",
  "Skydio":                      "skydio.com",
  "True Anomaly":                "trueanomaly.space",
  "Ursa Major":                  "ursamajor.com",
  "Mach Industries":             "machindustries.co",
  // ── Investors / VCs ──────────────────────────────────────────────────────────
  "Andreessen Horowitz":         "a16z.com",
  "Founders Fund":               "foundersfund.com",
  "General Catalyst":            "generalcatalyst.com",
  "Lux Capital":                 "luxcapital.com",
  "General Atlantic":            "generalatlantic.com",
  "Tiger Global Management":     "tigerglobal.com",
  "Andreessen Horowitz / Founders Fund": "a16z.com",
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
    case "funding_round":        return { left: "LEAD INVESTOR", right: "STARTUP",    sep: "invest" };
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
  const sizeClass = size === "sm" ? "w-8 h-8" : "w-12 h-12";
  const textSize  = size === "sm" ? "text-[9px]" : "text-[11px]";

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
    <div className="relative shrink-0">
      <div className={`${sizeClass} rounded-xl bg-white border border-slate-100 shadow-sm ring-1 ring-black/5 overflow-hidden flex items-center justify-center`}>
        <img
          src={`https://logo.clearbit.com/${domain}`}
          alt={name}
          className="w-full h-full object-contain p-1.5"
          onError={() => setFailed(true)}
        />
      </div>
      {flag}
    </div>
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
                  <button
                    onClick={(e) => { e.stopPropagation(); onOpenProfile(activity.acquirer); }}
                    className="text-slate-900 font-semibold text-sm leading-snug hover:text-purple-700 transition-colors text-left"
                  >
                    {activity.acquirer}
                  </button>
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
                  <button
                    onClick={(e) => { e.stopPropagation(); onOpenProfile(activity.target); }}
                    className="text-slate-900 font-semibold text-sm leading-snug hover:text-purple-700 transition-colors text-left truncate"
                  >
                    {activity.target}
                  </button>
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
              <button
                onClick={(e) => { e.stopPropagation(); onOpenProfile(activity.acquirer); }}
                className="text-sm text-slate-800 font-medium hover:text-purple-700 transition-colors text-left"
              >
                {activity.acquirer}
              </button>
              <p className="text-[10px] text-slate-400 font-mono">{labels.left}</p>
            </div>
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <CompanyLogo activity={activity} side="target" size="sm" />
            <div>
              <button
                onClick={(e) => { e.stopPropagation(); onOpenProfile(activity.target); }}
                className="text-sm text-slate-800 hover:text-purple-700 transition-colors text-left"
              >
                {activity.target}
              </button>
              <p className="text-[10px] text-slate-400 font-mono">{labels.right}</p>
            </div>
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

// ── Deal-type tabs (strategic_investment + minority_stake merged) ──────────

const DEAL_TYPE_TABS = [
  { value: "all",          label: "All",           types: null },
  { value: "acquisition",  label: "Acquisitions",  types: ["acquisition"] },
  { value: "merger",       label: "Mergers",        types: ["merger"] },
  { value: "joint_venture",label: "Joint Ventures", types: ["joint_venture"] },
  { value: "investments",  label: "Investments",    types: ["strategic_investment", "minority_stake"] },
  { value: "funding_round",label: "Funding Rounds", types: ["funding_round"] },
];

// ── Known defense players: name variant → canonical DB name ───────────────
// Canonical names must match exactly what's stored in defense_players.name

const PROFILE_NAME_MAP = {
  // Lockheed Martin
  "Lockheed Martin": "Lockheed Martin",
  // Raytheon / RTX
  "Raytheon Technologies": "Raytheon Technologies",
  "Raytheon": "Raytheon Technologies",
  "RTX": "Raytheon Technologies",
  "RTX Ventures": "Raytheon Technologies",
  // Northrop Grumman
  "Northrop Grumman": "Northrop Grumman",
  // General Dynamics
  "General Dynamics": "General Dynamics",
  // Boeing
  "Boeing": "Boeing Defense",
  "Boeing Defense": "Boeing Defense",
  // L3Harris
  "L3Harris Technologies": "L3Harris Technologies",
  "L3Harris": "L3Harris Technologies",
  // HII
  "Huntington Ingalls Industries": "Huntington Ingalls",
  "Huntington Ingalls": "Huntington Ingalls",
  "HII": "Huntington Ingalls",
  // Leidos
  "Leidos Holdings": "Leidos Holdings",
  "Leidos": "Leidos Holdings",
  // BAE Systems
  "BAE Systems": "BAE Systems",
  // Thales
  "Thales": "Thales",
  "Thales Group": "Thales",
  // Leonardo
  "Leonardo": "Leonardo",
  "Leonardo DRS": "Leonardo",
  "Leonardo Finmeccanica": "Leonardo",
  // Airbus
  "Airbus": "Airbus Defence & Space",
  "Airbus Defence & Space": "Airbus Defence & Space",
  "Airbus Defense": "Airbus Defence & Space",
  // Rheinmetall
  "Rheinmetall": "Rheinmetall",
  "Rheinmetall AG": "Rheinmetall",
  // Safran
  "Safran": "Safran",
  // KNDS
  "KNDS": "KNDS",
  "KNDS France": "KNDS",
  "KNDS Germany": "KNDS",
  // Hanwha
  "Hanwha": "Hanwha Aerospace",
  "Hanwha Aerospace": "Hanwha Aerospace",
  "Hanwha Defense": "Hanwha Aerospace",
  "Hanwha Ocean": "Hanwha Aerospace",
  // Saab
  "Saab": "Saab AB",
  "Saab AB": "Saab AB",
  // Dassault
  "Dassault": "Dassault Aviation",
  "Dassault Aviation": "Dassault Aviation",
  // Naval Group
  "Naval Group": "Naval Group",
  // MBDA
  "MBDA": "MBDA",
  // Elbit
  "Elbit Systems": "Elbit Systems",
  // Rafael
  "Rafael": "Rafael Advanced Defense",
  "Rafael Advanced Defense Systems": "Rafael Advanced Defense",
  "Rafael Advanced Defense": "Rafael Advanced Defense",
  // Hensoldt
  "Hensoldt": "Hensoldt",
  // QinetiQ
  "QinetiQ": "QinetiQ",
  // Babcock
  "Babcock": "Babcock International",
  "Babcock International": "Babcock International",
  // HEICO
  "HEICO": "HEICO Corporation",
  "HEICO Corporation": "HEICO Corporation",
  // TransDigm
  "TransDigm": "TransDigm",
  // Mercury Systems
  "Mercury Systems": "Mercury Systems",
  // AeroVironment
  "AeroVironment": "AeroVironment",
  // Shield AI
  "Shield AI": "Shield AI",
  // SAIC
  "SAIC": "SAIC",
  // Kratos
  "Kratos": "Kratos Defense",
  "Kratos Defense": "Kratos Defense",
  "Kratos Defense & Security Solutions": "Kratos Defense",
  // Palantir
  "Palantir": "Palantir Technologies",
  "Palantir Technologies": "Palantir Technologies",
  // Anduril
  "Anduril": "Anduril Industries",
  "Anduril Industries": "Anduril Industries",
  // Booz Allen
  "Booz Allen Hamilton": "Booz Allen Hamilton",
  // CACI
  "CACI": "CACI International",
  "CACI International": "CACI International",
  // Teledyne
  "Teledyne Technologies": "Teledyne Technologies",
  "Teledyne": "Teledyne Technologies",
  // Curtiss-Wright
  "Curtiss-Wright": "Curtiss-Wright",
  // Textron
  "Textron": "Textron",
  // Rolls-Royce
  "Rolls-Royce": "Rolls-Royce Holdings",
  "Rolls-Royce Holdings": "Rolls-Royce Holdings",
  // Parker Hannifin
  "Parker Hannifin": "Parker Hannifin",
  // Collins Aerospace
  "Collins Aerospace": "Raytheon Technologies",
};

/**
 * Returns the canonical DB name if the company is a known defense player,
 * or null if it's a fund / VC / unknown entity.
 */
function resolvePlayerName(name) {
  if (!name) return null;
  if (PROFILE_NAME_MAP[name] !== undefined) return PROFILE_NAME_MAP[name];
  // Partial match — first word of a known player contained in the name
  const lower = name.toLowerCase();
  for (const [key, val] of Object.entries(PROFILE_NAME_MAP)) {
    if (key.length >= 5 && lower.includes(key.toLowerCase())) return val;
  }
  return null;
}

// ── Company cell — opens profile sheet for known players, website for others ─

function CompanyCell({ activity, side, onOpenProfile }) {
  const name    = activity[side === "acquirer" ? "acquirer" : "target"] ?? "";
  const canonical = resolvePlayerName(name);
  const domain  = getLogoDomain(activity, side);

  return (
    <div className="flex items-center gap-2">
      <CompanyLogo activity={activity} side={side} size="sm" />
      {canonical ? (
        <button
          onClick={e => { e.stopPropagation(); onOpenProfile(canonical); }}
          className="text-sm font-medium text-slate-800 hover:text-purple-700 transition-colors text-left leading-tight"
        >
          {name}
        </button>
      ) : domain ? (
        <a
          href={`https://${domain}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className="text-sm text-slate-600 hover:text-blue-600 transition-colors text-left leading-tight inline-flex items-center gap-1"
        >
          {name}
          <ExternalLink className="w-2.5 h-2.5 opacity-40 shrink-0" />
        </a>
      ) : (
        <span className="text-sm text-slate-600 leading-tight">{name}</span>
      )}
    </div>
  );
}

// ── Table row ──────────────────────────────────────────────────────────────

function TableRow({ activity, index, onOpenProfile }) {
  const [open, setOpen] = useState(false);
  const hasDetail = !!(activity.rationale || activity.description);

  return (
    <>
      <tr
        className={`${index % 2 === 0 ? "bg-white" : "bg-slate-50/60"} hover:bg-purple-50 transition-colors cursor-pointer border-b border-slate-100`}
        onClick={() => hasDetail && setOpen(v => !v)}
      >
        <td className="px-3 py-2.5 text-xs text-slate-400 font-mono w-10 select-none">{index + 1}</td>

        {/* Acquirer */}
        <td className="px-3 py-2.5">
          <CompanyCell activity={activity} side="acquirer" onOpenProfile={onOpenProfile} />
        </td>

        {/* Arrow */}
        <td className="px-1 py-2.5 text-slate-300 text-xs">→</td>

        {/* Target */}
        <td className="px-3 py-2.5">
          <CompanyCell activity={activity} side="target" onOpenProfile={onOpenProfile} />
        </td>

        {/* Type */}
        <td className="px-3 py-2.5">
          <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium capitalize whitespace-nowrap">
            {activity.deal_type.replaceAll("_", " ")}
          </span>
          {activity.round_type && (
            <div className="mt-0.5"><RoundBadge roundType={activity.round_type} /></div>
          )}
        </td>

        {/* Value */}
        <td className="px-3 py-2.5 text-sm font-mono font-semibold text-purple-700 whitespace-nowrap">
          {formatValue(activity.deal_value, activity.is_disclosed ?? true)}
          {activity.stake_percentage != null && (
            <span className="text-[10px] text-slate-400 ml-1">{activity.stake_percentage}%</span>
          )}
        </td>

        {/* Status */}
        <td className="px-3 py-2.5">
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap ${getStatusStyle(activity.status)}`}>
            {formatStatus(activity.status)}
          </span>
        </td>

        {/* Date */}
        <td className="px-3 py-2.5 text-xs text-slate-500 whitespace-nowrap">
          {format(new Date(activity.announced_date), "MMM yyyy")}
        </td>

        {/* Source */}
        <td className="px-3 py-2.5 text-center">
          {activity.source_url ? (
            <a
              href={activity.source_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="text-slate-400 hover:text-purple-600 transition-colors inline-flex"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : null}
        </td>

        {/* Expand toggle */}
        <td className="px-2 py-2.5 w-6">
          {hasDetail && (
            <span className="text-slate-300">
              {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </span>
          )}
        </td>
      </tr>

      {open && hasDetail && (
        <tr className="bg-purple-50/60">
          <td colSpan={10} className="px-5 py-3 text-sm text-slate-600 leading-relaxed border-b border-purple-100">
            {activity.rationale || activity.description}
          </td>
        </tr>
      )}
    </>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────

export default function MAActivity() {
  const { token }                              = useAuth();
  const [activities,     setActivities]        = useState([]);
  const [historical,     setHistorical]        = useState([]);
  const [loading,        setLoading]           = useState(true);
  const [histLoading,    setHistLoading]       = useState(false);
  const [error,          setError]             = useState(null);
  const [dealTypeTab,    setDealTypeTab]       = useState("all");
  const [page,           setPage]              = useState(0);
  const [searchTerm,     setSearchTerm]        = useState("");
  const [selectedStatus, setSelectedStatus]    = useState("all");
  const [selectedYear,   setSelectedYear]      = useState("all");
  const [profileName,    setProfileName]       = useState(null);
  const [sortField,      setSortField]         = useState("announced_date");
  const [sortDir,        setSortDir]           = useState("desc");
  const [scraping,       setScraping]          = useState(false);
  const [metaTotal,      setMetaTotal]         = useState(null);
  const [metaLastScraped, setMetaLastScraped]  = useState(null);

  const fetchRecent = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API}/ma-activities`, { params: { limit: 200, offset: 0, days: 0 } });
      setActivities(res.data);
    } catch {
      setError("Failed to load M&A deals.");
    } finally {
      setLoading(false);
    }
  };

  const fetchHist = async () => {
    setHistLoading(true);
    try {
      const res = await axios.get(`${API}/ma-activities/historical`, { params: { limit: 500, offset: 0 } });
      setHistorical(res.data);
    } catch { /* silent */ } finally {
      setHistLoading(false);
    }
  };

  const fetchMeta = async () => {
    try {
      const res = await axios.get(`${API}/ma-activities/meta`);
      setMetaTotal(res.data.total);
      setMetaLastScraped(res.data.last_scraped_at);
    } catch { /* silent */ }
  };

  const handleRefresh = async () => {
    if (!token || scraping) return;
    setScraping(true);
    try {
      await axios.post(`${API}/ma-activities/scrape`, {}, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 60000,
      });
    } catch { /* silent */ } finally {
      await fetchRecent();
      await fetchMeta();
      setScraping(false);
    }
  };

  useEffect(() => { fetchRecent(); fetchHist(); fetchMeta(); }, []);

  // Merge + deduplicate recent and historical
  const allDeals = useMemo(() => {
    const seen = new Set();
    return [...activities, ...historical].filter(a => {
      if (seen.has(a.id)) return false;
      seen.add(a.id);
      return true;
    });
  }, [activities, historical]);

  // Tab counts — "investments" tab sums strategic_investment + minority_stake
  const tabCounts = useMemo(() => {
    const raw = { all: allDeals.length };
    for (const a of allDeals) raw[a.deal_type] = (raw[a.deal_type] || 0) + 1;
    return {
      all:          raw.all,
      acquisition:  raw.acquisition  || 0,
      merger:       raw.merger       || 0,
      joint_venture:raw.joint_venture|| 0,
      investments:  (raw.strategic_investment || 0) + (raw.minority_stake || 0),
      funding_round:raw.funding_round|| 0,
    };
  }, [allDeals]);

  const handleSort = (field) => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("desc"); }
  };

  // Apply filters + sort
  const filteredDeals = useMemo(() => {
    let list = allDeals;
    if (dealTypeTab !== "all") {
      const tabDef = DEAL_TYPE_TABS.find(t => t.value === dealTypeTab);
      if (tabDef?.types) list = list.filter(a => tabDef.types.includes(a.deal_type));
    }
    if (selectedStatus !== "all") list = list.filter(a => a.status === selectedStatus);
    if (selectedYear !== "all") list = list.filter(a => String(new Date(a.announced_date).getFullYear()) === selectedYear);
    if (searchTerm) {
      const t = searchTerm.toLowerCase();
      list = list.filter(a =>
        a.acquirer.toLowerCase().includes(t) ||
        a.target.toLowerCase().includes(t) ||
        (a.description || "").toLowerCase().includes(t)
      );
    }
    return [...list].sort((a, b) => {
      const va = sortField === "deal_value" ? (a.deal_value || 0) : new Date(a.announced_date).getTime();
      const vb = sortField === "deal_value" ? (b.deal_value || 0) : new Date(b.announced_date).getTime();
      return sortDir === "asc" ? va - vb : vb - va;
    });
  }, [allDeals, dealTypeTab, selectedStatus, selectedYear, searchTerm, sortField, sortDir]);

  // Reset page on filter change
  useEffect(() => setPage(0), [dealTypeTab, selectedStatus, selectedYear, searchTerm, sortField, sortDir]);

  const pageDeals  = filteredDeals.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(filteredDeals.length / PAGE_SIZE);
  const rangeStart = filteredDeals.length === 0 ? 0 : page * PAGE_SIZE + 1;
  const rangeEnd   = Math.min((page + 1) * PAGE_SIZE, filteredDeals.length);

  const totalValue = filteredDeals.filter(a => a.is_disclosed ?? true).reduce((s, a) => s + (a.deal_value || 0), 0);
  const activeFilterCount = [selectedStatus !== "all", selectedYear !== "all", searchTerm.length > 0].filter(Boolean).length;

  // Quarterly chart
  const quarterlyData = useMemo(() => {
    const map = {};
    allDeals.forEach(a => {
      const d = new Date(a.announced_date);
      const q = `Q${Math.ceil((d.getMonth() + 1) / 3)} ${d.getFullYear()}`;
      if (!map[q]) map[q] = { quarter: q, count: 0, value: 0, ts: d.getTime() };
      map[q].count += 1;
      map[q].value += a.deal_value || 0;
    });
    return Object.values(map).sort((a, b) => a.ts - b.ts).slice(-8);
  }, [allDeals]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div data-testid="ma-activity-page" className="space-y-5 animate-fade-in">
      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">M&amp;A Activity</h1>
          <p className="text-slate-500 text-sm mt-1">
            Mergers, acquisitions &amp; strategic investments
            {metaTotal != null && <span className="ml-2 font-mono text-slate-700 font-semibold">{metaTotal} deals indexed</span>}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {metaLastScraped && (
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {format(new Date(metaLastScraped), "MMM d, HH:mm")}
            </span>
          )}
          {token && (
            <button
              onClick={handleRefresh}
              disabled={scraping}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${scraping ? "animate-spin" : ""}`} />
              {scraping ? "Scraping…" : "Refresh"}
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl px-4 py-3 text-sm">
          <AlertTriangle className="w-4 h-4 shrink-0" /><span>{error}</span>
          <button onClick={fetchRecent} className="ml-auto text-xs font-medium underline">Retry</button>
        </div>
      )}

      {/* ── Deal-type tabs ── */}
      <div className="border-b border-slate-200 flex items-center overflow-x-auto" data-testid="deal-type-tabs">
        {DEAL_TYPE_TABS.map(t => (
          <button
            key={t.value}
            onClick={() => setDealTypeTab(t.value)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-all -mb-px ${
              dealTypeTab === t.value
                ? "border-purple-600 text-purple-700"
                : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
            }`}
          >
            {t.label}
            <span className={`ml-1.5 text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
              dealTypeTab === t.value ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-500"
            }`}>
              {tabCounts[t.value] || 0}
            </span>
          </button>
        ))}
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "TOTAL DEALS",  value: filteredDeals.length,  sub: dealTypeTab === "all" ? "All types" : DEAL_TYPE_TABS.find(t => t.value === dealTypeTab)?.label, color: "text-slate-900" },
          { label: "TOTAL VALUE",  value: formatValue(totalValue), sub: "Disclosed only", color: "text-slate-900" },
          { label: "IN PROGRESS",  value: filteredDeals.filter(a => ["announced","pending","under_review"].includes(a.status)).length, sub: "Announced + Pending", color: "text-amber-600" },
          { label: "CLOSED",       value: filteredDeals.filter(a => ["completed","active"].includes(a.status)).length, sub: "Completed + Active", color: "text-emerald-600" },
        ].map(s => (
          <Card key={s.label} className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{s.label}</p>
              <p className={`text-2xl font-mono font-bold mt-1.5 ${s.color}`}>{s.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Chart ── */}
      {quarterlyData.length > 1 && (
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-slate-800">Quarterly Activity</p>
              <span className="text-xs text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">Last 8 quarters</span>
            </div>
            <ResponsiveContainer width="100%" height={100}>
              <BarChart data={quarterlyData} margin={{ top: 2, right: 8, left: 0, bottom: 0 }}>
                <XAxis dataKey="quarter" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} width={22} />
                <Tooltip content={({ active, payload }) => {
                  if (active && payload?.length) {
                    const d = payload[0].payload;
                    return (
                      <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 shadow text-xs">
                        <p className="font-semibold text-slate-700">{d.quarter}</p>
                        <p className="text-purple-700 font-mono">{d.count} deal{d.count !== 1 ? "s" : ""}</p>
                        {d.value > 0 && <p className="text-slate-500">{d.value >= 1000 ? `$${(d.value/1000).toFixed(1)}B` : `$${d.value}M`}</p>}
                      </div>
                    );
                  }
                  return null;
                }} />
                <Bar dataKey="count" radius={[3, 3, 0, 0]}>
                  {quarterlyData.map((_, i) => (
                    <Cell key={i} fill={i === quarterlyData.length - 1 ? "#7E22CE" : "#E9D5FF"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* ── Two-column layout ── */}
      <div className="flex gap-5 items-start">

        {/* Left sidebar — filters */}
        <div className="w-52 shrink-0 space-y-3 sticky top-4">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5" /> Filters
                {activeFilterCount > 0 && (
                  <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">{activeFilterCount}</span>
                )}
              </span>
              {activeFilterCount > 0 && (
                <button
                  onClick={() => { setSelectedStatus("all"); setSelectedYear("all"); setSearchTerm(""); }}
                  className="text-[11px] text-rose-500 hover:text-rose-700 font-medium"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                placeholder="Search companies…"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                data-testid="search-ma"
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-300"
              />
            </div>

            {/* Status */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Status</p>
              <div className="space-y-0.5">
                {STATUS_OPTIONS.map(o => (
                  <button
                    key={o.value}
                    onClick={() => setSelectedStatus(o.value)}
                    data-testid={o.value === "all" ? "status-filter" : undefined}
                    className={`w-full text-left text-xs px-2 py-1 rounded transition-colors ${
                      selectedStatus === o.value
                        ? "bg-purple-50 text-purple-700 font-semibold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Year */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Year</p>
              <div className="flex flex-wrap gap-1">
                {YEAR_OPTIONS.map(o => (
                  <button
                    key={o.value}
                    onClick={() => setSelectedYear(o.value)}
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded border transition-colors ${
                      selectedYear === o.value
                        ? "bg-purple-600 text-white border-purple-600"
                        : "bg-white text-slate-600 border-slate-200 hover:border-purple-300"
                    }`}
                  >
                    {o.value === "all" ? "All" : o.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right — table */}
        <div className="flex-1 min-w-0 space-y-3">

          {/* Toolbar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              {totalPages > 1 && (
                <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
                  className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
              <span className="font-mono text-slate-600">
                {rangeStart}–{rangeEnd} <span className="text-slate-400">of</span> <span className="font-semibold text-slate-700">{filteredDeals.length}</span> results
              </span>
              {totalPages > 1 && (
                <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}
                  className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => exportCSV(filteredDeals)}
              disabled={filteredDeals.length === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 transition-colors disabled:opacity-40"
            >
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
          </div>

          {/* Table */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden" data-testid="ma-activities-list">
            {(histLoading && allDeals.length === 0) ? (
              <div className="flex items-center justify-center h-40">
                <div className="animate-spin w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full" />
              </div>
            ) : filteredDeals.length === 0 ? (
              <div className="text-center py-16 text-slate-500 text-sm">No deals match the selected filters.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 w-10">#</th>
                      <th className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Acquirer / Investor</th>
                      <th className="px-1 py-2.5 w-4" />
                      <th className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Target / Portfolio Co.</th>
                      <th className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Type</th>
                      <th
                        onClick={() => handleSort("deal_value")}
                        className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 cursor-pointer hover:text-slate-800 select-none whitespace-nowrap"
                      >
                        Value {sortField === "deal_value" ? (sortDir === "asc" ? "↑" : "↓") : <span className="text-slate-300">↕</span>}
                      </th>
                      <th className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Status</th>
                      <th
                        onClick={() => handleSort("announced_date")}
                        className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 cursor-pointer hover:text-slate-800 select-none whitespace-nowrap"
                      >
                        Date {sortField === "announced_date" ? (sortDir === "asc" ? "↑" : "↓") : <span className="text-slate-300">↕</span>}
                      </th>
                      <th className="px-3 py-2.5 w-8" />
                      <th className="px-2 py-2.5 w-6" />
                    </tr>
                  </thead>
                  <tbody>
                    {pageDeals.map((activity, i) => (
                      <TableRow
                        key={activity.id}
                        activity={activity}
                        index={page * PAGE_SIZE + i}
                        onOpenProfile={setProfileName}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Bottom pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Prev
              </button>
              <span className="text-xs text-slate-500 font-mono">Page {page + 1} / {totalPages}</span>
              <button
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Company profile slide-over */}
      <CompanyProfileSheet
        name={profileName}
        onClose={() => setProfileName(null)}
      />
    </div>
  );
}
