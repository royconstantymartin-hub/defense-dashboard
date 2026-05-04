import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { API, useAuth } from "@/App";
import CompanyProfileSheet from "@/components/CompanyProfileSheet";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Search, ArrowRight, ArrowLeftRight, Plus, CircleDot,
  Clock, Database, Filter, TrendingUp, ChevronDown, ChevronUp,
  ChevronLeft, ChevronRight,
  ExternalLink, Download, Calendar, User, AlertTriangle,
  RefreshCw, Trophy, Info, SlidersHorizontal, FileText, X,
} from "lucide-react";
import { format } from "date-fns";
import {
  ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

// ── Constants ──────────────────────────────────────────────────────────────

const PAGE_SIZE      = 50;
const HIST_PAGE_SIZE = 100;

const MIN_VALUE_OPTIONS = [
  { value: 0,    label: "All" },
  { value: 100,  label: "≥$100M" },
  { value: 500,  label: "≥$500M" },
  { value: 1000, label: "≥$1B" },
  { value: 5000, label: "≥$5B" },
];

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

const INVEST_TYPES = ["strategic_investment", "minority_stake", "funding_round"];

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
  // ── US Primes ────────────────────────────────────────────────────────────────
  "Lockheed Martin":                      "lockheedmartin.com",
  "Raytheon Technologies":               "rtx.com",
  "RTX":                                 "rtx.com",
  "RTX Ventures":                        "rtx.com",
  "L3Harris":                            "l3harris.com",
  "L3Harris Technologies":               "l3harris.com",
  "Harris Corporation":                  "harris.com",
  "L3 Technologies":                     "l3t.com",
  "United Technologies Corporation":     "utc.com",
  "Northrop Grumman":                    "northropgrumman.com",
  "General Dynamics":                    "gd.com",
  "BAE Systems":                         "baesystems.com",
  "Thales":                              "thalesgroup.com",
  "Leonardo":                            "leonardo.com",
  "Leonardo DRS":                        "leonardodrs.com",
  "Airbus":                              "airbus.com",
  "Rheinmetall":                         "rheinmetall.com",
  "Safran":                              "safran-group.com",
  "KNDS":                                "knds.com",
  "KNDS France":                         "knds.com",
  "KNDS Germany":                        "knds.com",
  "Hanwha":                              "hanwha.com",
  "Hanwha Ocean":                        "hanwha.com",
  "Boeing":                              "boeing.com",
  "Teledyne Technologies":               "teledyne.com",
  "FLIR Systems":                        "flir.com",
  "Parker Hannifin":                     "parker.com",
  "Meggitt":                             "meggitt.com",
  "Cobham":                              "cobham.com",
  "Ultra Electronics":                   "ultra.group",
  "TransDigm":                           "transdigm.com",
  "Mercury Systems":                     "mrcy.com",
  "AeroVironment":                       "avinc.com",
  "Shield AI":                           "shield.ai",
  "SAIC":                                "saic.com",
  "Spirit AeroSystems":                  "spiritaero.com",
  "Collins Aerospace Actuation":         "collinsaerospace.com",
  "Ball Aerospace":                      "ball.com",
  "Terran Orbital":                      "terranorbital.com",
  "Dassault Aviation":                   "dassault-aviation.com",
  "Dassault":                            "dassault-aviation.com",
  "Naval Group":                         "naval-group.com",
  "Fincantieri":                         "fincantieri.com",
  "Shark Robotics":                      "shark-robotics.com",
  "RBSL":                                "rbsl.co.uk",
  "KNDS Deutschland":                    "knds.com",
  "Airbus Helicopters":                  "airbus.com",
  "Airbus Defence & Space":              "airbus.com",
  "Airbus Defence and Space":            "airbus.com",
  "Fokker":                              "fokker.com",
  "GKN Fokker":                          "fokker.com",
  "Eurosam":                             "eurosam.com",
  "NHIndustries":                        "nhindustries.com",
  "Tencore":                             "tencore.com",
  "Anduril":                             "anduril.com",
  "Anduril Industries":                  "anduril.com",
  "Palantir":                            "palantir.com",
  "Kratos":                              "kratosdefense.com",
  "Helsing":                             "helsing.ai",
  "Milrem Robotics":                     "milremrobotics.com",
  "Preligens":                           "preligens.com",
  "Capella Space":                       "capellaspace.com",
  "Epirus":                              "epirusinc.com",
  "Harmattan.ai":                        "harmattan.ai",
  "Hermeus":                             "hermeus.com",
  "Skydio":                              "skydio.com",
  "True Anomaly":                        "trueanomaly.space",
  "Ursa Major":                          "ursamajor.com",
  "Mach Industries":                     "machindustries.co",
  // ── Investors / VCs ─────────────────────────────────────────────────────────
  "Andreessen Horowitz":                 "a16z.com",
  "Andreessen Horowitz / Founders Fund": "a16z.com",
  "Founders Fund":                       "foundersfund.com",
  "General Catalyst":                    "generalcatalyst.com",
  "Lux Capital":                         "luxcapital.com",
  "General Atlantic":                    "generalatlantic.com",
  "Tiger Global Management":             "tigerglobal.com",
  "Tikehau Capital":                     "tikehau-capital.com",
  "Carlyle Group":                       "carlyle.com",
  // ── Defense / Aerospace ─────────────────────────────────────────────────────
  "ArianeGroup":                         "arianegroup.com",
  "MBDA":                                "mbda-systems.com",
  "RADA Electronic Industries":          "rada.com",
  "Nightwing Group":                     "nightwinggroup.com",
  "Rebellion Defense":                   "rebelliondefense.com",
  "EDGE Group":                          "edgegroup.ae",
  "Texelis":                             "texelis.com",
  "Texelis Defense":                     "texelis.com",
  "Tomahawk Robotics":                   "tomahawkrobotics.com",
  "Saab":                                "saabgroup.com",
  "Saab AB":                             "saabgroup.com",
  "MD Helicopters":                      "mdhelicopters.com",
  "Calspan Corporation":                 "calspan.com",
  "Kongsberg":                           "kongsberg.com",
  "Kongsberg Defence & Aerospace":       "kongsberg.com",
  "Patria":                              "patriagroup.com",
  "Patria Oyj":                          "patriagroup.com",
  "Leidos":                              "leidos.com",
  "Dynetics":                            "dynetics.com",
  "Loc Performance Products":            "rheinmetall.com",
  "Indra":                               "indracompany.com",
  "Expal Systems":                       "expal.com",
  "Imperva":                             "imperva.com",
  "Aerojet Rocketdyne":                  "aerojetrocketdyne.com",
  "Aerojet":                             "aerojetrocketdyne.com",
  "Hensoldt":                            "hensoldt.net",
  "QinetiQ":                             "qinetiq.com",
  "Babcock":                             "babcock.com",
  "Babcock International":               "babcock.com",
  "Frazer-Nash Consultancy":             "fnc.co.uk",
  "Elbit Systems":                       "elbitsystems.com",
  "IMI Systems":                         "imi-israel.com",
  "HEICO":                               "heico.com",
  "HEICO Corporation":                   "heico.com",
  "Wencor Group":                        "wencorgroup.com",
  "Huntington Ingalls Industries":       "hii.com",
  "HII":                                 "hii.com",
  "Alion Science and Technology":        "alionscience.com",
  "Peraton":                             "peraton.com",
  "Perspecta":                           "perspecta.com",
  "ManTech International":               "mantech.com",
  "Exail":                               "exail.com",
  "iXBlue":                              "ixblue.com",
  "ECA Group":                           "ecagroup.com",
  "Avantus Federal":                     "avantus.com",
  "Condor Systems":                      "condorsystems.com",
  "Blue Canyon Technologies":            "bluecanyontech.com",
  "Martin UAV":                          "martinuav.com",
  "Gibbs & Cox":                         "gibbscox.com",
  "Ercom":                               "ercom.fr",
  "Bombardier":                          "bombardier.com",
  "Bombardier C Series":                 "bombardier.com",
  "Bombardier C Series programme":       "bombardier.com",
  "Adranos":                             "adranos.com",
  "Area-I":                              "area-i.com",
  // ── European deals (Top-30 list) ────────────────────────────────────────────
  "Viasat":                              "viasat.com",
  "Inmarsat":                            "inmarsat.com",
  "Thoma Bravo":                         "thomabravo.com",
  "Darktrace":                           "darktrace.com",
  "SES":                                 "ses.com",
  "Intelsat":                            "intelsat.com",
  "Eutelsat":                            "eutelsat.com",
  "OneWeb":                              "oneweb.net",
  "Bain Capital":                        "baincapital.com",
  "ITP Aero":                            "itp.com",
  "Iveco Defence Vehicles":              "ivecodefence.com",
  "Eaton":                               "eaton.com",
  "Ultra PCS":                           "ultra.group",
  "CPI TMD":                             "cpii.com",
  "Cobham Aerospace Communications":     "cobham.com",
  "KKR":                                 "kkr.com",
  "OHB SE":                              "ohb.de",
  "Hispasat":                            "hispasat.com",
  "Hisdesat":                            "hispasat.com",
  "Fiocchi Munizioni":                   "fiocchi.com",
  "Czechoslovak Group":                  "czechoslovakgroup.cz",
  "ESG Elektroniksystem":                "esg.de",
  "Colt CZ Group":                       "cz-group.eu",
  "Sellier & Bellot":                    "sellier-bellot.cz",
  "AE Industrial Partners":              "aeroequity.com",
  "Beretta Holding":                     "beretta.com",
  "RUAG Ammotec":                        "ruag.com",
  "Kratos Defense":                      "kratosdefense.com",
  "Orbit Intelligence":                  "orbitgt.com",
  "Ondas Holdings":                      "ondasholdings.com",
  "Sentrycs":                            "sentrycs.com",
  "Destinus":                            "destinus.ch",
  "Daedalean":                           "daedalean.ai",
  "Orolia":                              "orolia.com",
  "Ancala Partners":                     "ancalapartners.com",
  "Avincis":                             "avincis.com",
  "S21sec":                              "s21sec.com",
  "Roboteam":                            "roboteam.com",
  "Paragon Solutions":                   "paragon-solutions.co.uk",
  // ── European Defense Startups (2025 funding cohort) ──────────────────────────
  "TEKEVER":                             "tekever.com",
  "Roark Aerospace":                     "roarkaerospace.com",
  "Quantum Systems":                     "quantum-systems.com",
  "ICEYE":                               "iceye.com",
  "Stark":                               "stark.defense",
  "Isembard":                            "isembard.com",
  "UFORCE":                              "uforce.com",
  "Knogin":                              "knogin.com",
  "ARX Robotics":                        "arx-robotics.com",
  "Onodrim Industries":                  "onodrimindustries.com",
  "Cailabs":                             "cailabs.com",
  "Frankenburg Tech":                    "frankenburg.tech",
  "Tytan Technologies":                  "tytantechnologies.com",
  "Optics11":                            "optics11.com",
  "Hypersonica":                         "hypersonica.com",
  "Twentyfour Industries":               "twentyfourindustries.com",
  "Alpine Eagle":                        "alpineeagle.aero",
  "Ammunity":                            "ammunity.com",
  "EGIDE":                               "egide-group.com",
  "Belss":                               "belss.com",
  "Orbotix":                             "orbotix.io",
  "Harmattan AI":                        "harmattan.ai",
  // ── European VCs & deep-tech investors ───────────────────────────────────────
  "Prima Materia":                       "primamateria.com",
  "Lightspeed":                          "lsvp.com",
  "Ventura Capital":                     "ventura.capital",
  "Baillie Gifford":                     "bailliegifford.com",
  "Lakestar":                            "lakestar.com",
  "Index":                               "indexventures.com",
  "Index Ventures":                      "indexventures.com",
  "Balderton":                           "balderton.com",
  "Balderton Capital":                   "balderton.com",
  "HV Capital":                          "hvcapital.com",
  "Bpifrance":                           "bpifrance.fr",
  "A.P. Møller":                         "apmollerholding.com",
  "Sequoia":                             "sequoiacap.com",
  "Thiel Capital":                       "thielcapital.com",
  "Plug and Play":                       "plugandplaytechcenter.com",
  "OneRagtime":                          "oneragtime.com",
  "NATO Innovation Fund":                "natoinnovationfund.nato.int",
  "Hadean Ventures":                     "hadeanventures.com",
  "Plural":                              "plural.vc",
  "Atlantic Bridge":                     "abven.com",
  "Keen Venture Partners":               "keen.vc",
  "Speedinvest":                         "speedinvest.com",
  "PMV":                                 "pmv.eu",
  "Invest-NL":                           "invest-nl.nl",
  "Aismia":                              "aismia.com",
  "UVC Partners":                        "uvcpartners.com",
  "IQ Capital":                          "iqcapital.vc",
  "EFFEN Capital":                       "effencapital.com",
  "Tesi Ventures":                       "tesi.fi",
  "CDF Ventures":                        "cdfventures.com",
  "Early Game Ventures":                 "earlygame.vc",
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

// EU member states (ISO 3166-1 alpha-2)
const EU_MEMBERS = new Set([
  "AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU",
  "IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE",
]);

// Programme structures (no legal entity, no logo)
const PROGRAMME_ENTITIES = new Set([
  "SCAF/FCAS Programme",
  "MGCS Programme Alliance",
  "Eurodrone Programme JV",
]);

// JV from partners in DIFFERENT EU countries → the entity is a European JV → EU flag.
// Same-country JVs (e.g. Airbus FR + Safran FR → ArianeGroup FR) stay with their country.
function resolveTargetCountry(activity) {
  if (
    activity.deal_type === "joint_venture" &&
    activity.acquirer?.includes("+") &&
    activity.acquirer_country &&
    activity.target_country &&
    activity.acquirer_country !== activity.target_country &&
    EU_MEMBERS.has(activity.acquirer_country) &&
    EU_MEMBERS.has(activity.target_country)
  ) {
    return "EU";
  }
  return activity.target_country;
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

  // Programme structures have no company logo — always use initials
  if (PROGRAMME_ENTITIES.has(name)) return null;

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

  function logoBox(src) {
    return (
      <div className="relative shrink-0">
        <div className={`${sizeClass} rounded-xl bg-white border border-slate-100 shadow-sm overflow-hidden flex items-center justify-center`}>
          <img
            src={src}
            alt={name}
            className="w-full h-full object-contain p-1"
            onError={() => setLevel(l => l + 1)}
          />
        </div>
      </div>
    );
  }

  // Level 1 — Clearbit HD logo (size=128 ensures a crisp PNG, not a tiny favicon)
  if (level === 1 && domain) return logoBox(`https://logo.clearbit.com/${domain}?size=128`);

  // Level 2 — Google Favicon V2 (sz=128)
  if (level === 2 && domain) {
    return logoBox(`https://www.google.com/s2/favicons?domain=https://${domain}&sz=128`);
  }

  // Level 3 — Coloured initials avatar (no network call)
  return (
    <div className="relative shrink-0">
      <div className={`${sizeClass} rounded-xl overflow-hidden flex items-center justify-center ${avatarColor(name)}`}>
        <span className={`${textSize} font-bold text-white tracking-tight select-none`}>
          {initials(name)}
        </span>
      </div>
    </div>
  );
}

// ── Defense Tech Leaderboard ───────────────────────────────────────────────

function DefenseTechLeaderboard({ deals, onOpenProfile, onSelectDeal, players = [] }) {
  // Deduplicate by target company — keep entry with highest valuation, then latest date
  const byCompany = new Map();
  for (const d of deals) {
    const prev = byCompany.get(d.target);
    if (!prev) { byCompany.set(d.target, d); continue; }
    const better = (d.valuation || 0) > (prev.valuation || 0) ||
      ((d.valuation || 0) === (prev.valuation || 0) &&
        new Date(d.announced_date) > new Date(prev.announced_date));
    if (better) byCompany.set(d.target, d);
  }

  const rows = [...byCompany.values()].sort((a, b) => {
    const va = a.valuation || a.deal_value || 0;
    const vb = b.valuation || b.deal_value || 0;
    return vb - va;
  });

  const fmtVal = (v) => v >= 1000 ? `$${(v / 1000).toFixed(1)}B` : `$${v}M`;

  if (rows.length === 0) {
    return <div className="text-center py-16 text-slate-400 text-sm">No defense tech companies indexed.</div>;
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-purple-600" />
          <div>
            <p className="text-sm font-bold text-slate-900">Post-Money Valuation Ranking</p>
            <p className="text-[11px] text-slate-400 mt-0.5">{rows.length} companies · based on latest funding rounds</p>
          </div>
        </div>
        <span className="text-[10px] text-slate-400 bg-slate-50 border border-slate-200 px-2 py-1 rounded font-mono uppercase tracking-wider">Post-money</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-400 w-8">#</th>
              <th className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-400">Company</th>
              <th className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-400">Latest Round</th>
              <th className="px-3 py-2.5 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-400">Amount Raised</th>
              <th className="px-3 py-2.5 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-400">Valuation</th>
              <th className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-400">Date</th>
              <th className="px-3 py-2.5 text-center text-[10px] font-semibold uppercase tracking-wider text-slate-400">Source</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((d, i) => (
              <tr
                key={d.id || d.target}
                className={`border-b border-slate-50 hover:bg-purple-50/50 transition-colors cursor-pointer ${i % 2 === 0 ? "bg-white" : "bg-slate-50/30"}`}
                onClick={() => onSelectDeal?.(d)}
              >
                <td className="px-3 py-3 text-slate-400 font-mono text-[11px]">
                  {i === 0 ? <span className="text-amber-500 font-bold">①</span>
                   : i === 1 ? <span className="text-slate-400 font-bold">②</span>
                   : i === 2 ? <span className="text-orange-400 font-bold">③</span>
                   : <span className="text-slate-300">{i + 1}</span>}
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2.5">
                    <button onClick={() => onOpenProfile(resolvePlayerName(d.target) || d.target)} className="shrink-0">
                      <CompanyLogo activity={d} side="target" size="sm" />
                    </button>
                    <div>
                      <button
                        onClick={() => onOpenProfile(resolvePlayerName(d.target) || d.target)}
                        className="font-semibold text-slate-900 hover:text-purple-700 transition-colors text-left text-xs"
                      >
                        {d.target}
                      </button>
                      {d.target_country && (
                        <div className="flex items-center gap-1 mt-0.5">
                          <FlagImg iso2={resolveTargetCountry(d)} />
                          <span className="text-[9px] text-slate-400 font-mono">{resolveTargetCountry(d)}</span>
                        </div>
                      )}
                      {(() => {
                        const player = players.find(p => p.name.toLowerCase() === d.target.toLowerCase());
                        if (!player?.specializations?.length) return null;
                        return (
                          <div className="flex flex-wrap gap-0.5 mt-1">
                            {player.specializations.slice(0, 3).map(s => (
                              <span key={s} className="text-[9px] bg-purple-50 text-purple-600 border border-purple-100 px-1.5 py-0.5 rounded-full font-medium">{s}</span>
                            ))}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3">
                  {d.round_type
                    ? <RoundBadge roundType={d.round_type} />
                    : <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded capitalize">{d.deal_type.replaceAll("_", " ")}</span>
                  }
                </td>
                <td className="px-3 py-3 text-right font-mono font-semibold text-purple-700 whitespace-nowrap">
                  {formatValue(d.deal_value, d.is_disclosed ?? true)}
                </td>
                <td className="px-3 py-3 text-right">
                  {d.valuation
                    ? <span className="font-mono font-bold text-slate-900 text-sm">{fmtVal(d.valuation)}</span>
                    : <span className="text-slate-300 text-[10px]">n/d</span>
                  }
                </td>
                <td className="px-3 py-3 text-slate-500 whitespace-nowrap">
                  {format(new Date(d.announced_date), "MMM yyyy")}
                </td>
                <td className="px-3 py-3 text-center">
                  {d.source_url ? (
                    <a
                      href={d.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-purple-600 transition-colors inline-flex"
                      title="View official press release"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Card ───────────────────────────────────────────────────────────────────

// ── Parse multi-party acquirer strings like "Airbus + BAE Systems + Leonardo" ─
function parseParties(name) {
  if (!name) return [{ name: "", stake: null }];
  return name.split(/\s*\+\s*/).map(n => n.trim()).filter(Boolean).map(n => ({ name: n, stake: null }));
}

// Build a synthetic activity for a single named party (so CompanyLogo works)
function partyActivity(name, activity, side) {
  // Only use LOGO_FALLBACK — never inherit the parent activity's domain.
  // Inheriting causes the first party's logo to duplicate across all unlisted partners.
  const domain = LOGO_FALLBACK[name] ?? null;
  return {
    ...activity,
    acquirer: side === "acquirer" ? name : activity.acquirer,
    target:   side === "target"   ? name : activity.target,
    acquirer_logo_domain: side === "acquirer" ? domain : activity.acquirer_logo_domain,
    target_logo_domain:   side === "target"   ? domain : activity.target_logo_domain,
  };
}

function CompanyNameBtn({ name, onOpenProfile, className = "" }) {
  const canonical = resolvePlayerName(name);
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onOpenProfile(canonical || name); }}
      className={`hover:text-purple-700 transition-colors text-left ${className}`}
    >
      {name}
    </button>
  );
}

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
          <div className="flex items-center gap-3 flex-1 min-w-0 flex-wrap">
            {/* Acquirer — single or multi-party */}
            {(() => {
              const parties = parseParties(activity.acquirer);
              const isMulti = parties.length > 1;
              return (
                <div className="flex flex-col gap-1 shrink-0">
                  <span className="text-[9px] text-slate-400 font-mono tracking-widest uppercase">{labels.left}</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {parties.map((p, idx) => {
                      const synth = partyActivity(p.name, activity, "acquirer");
                      return (
                        <div key={idx} className="flex items-center gap-1.5">
                          {idx > 0 && <span className="text-slate-300 text-xs font-light select-none">+</span>}
                          <button onClick={(e) => { e.stopPropagation(); onOpenProfile(resolvePlayerName(p.name) || p.name); }} className="shrink-0">
                            <CompanyLogo activity={synth} side="acquirer" size={isMulti ? "sm" : "md"} />
                          </button>
                          <div>
                            <CompanyNameBtn
                              name={p.name}
                              onOpenProfile={onOpenProfile}
                              className="text-slate-900 font-semibold text-sm leading-snug"
                            />
                            {activity.stake_percentage != null && isMulti && (
                              <p className="text-[9px] text-emerald-600 font-mono font-semibold">{activity.stake_percentage}%</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            <DealSep type={labels.sep} />

            {/* Target */}
            <div className="flex items-center gap-2.5 min-w-0">
              <button onClick={(e) => { e.stopPropagation(); onOpenProfile(resolvePlayerName(activity.target) || activity.target); }} className="shrink-0">
                <CompanyLogo activity={activity} side="target" />
              </button>
              <div className="min-w-0">
                <CompanyNameBtn
                  name={activity.target}
                  onOpenProfile={onOpenProfile}
                  className="text-slate-900 font-semibold text-sm leading-snug truncate block"
                />
                <span className="text-[9px] text-slate-400 font-mono tracking-widest uppercase">{labels.right}</span>
              </div>
            </div>
          </div>

          {/* Meta strip */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 lg:justify-end">

            {/* Value */}
            <div className="min-w-[70px]">
              <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mb-0.5">
                {["strategic_investment", "minority_stake", "funding_round"].includes(activity.deal_type) ? "Amount Raised" : "Value"}
              </p>
              <p className="text-lg font-mono font-bold text-purple-700 leading-none">
                {formatValue(activity.deal_value, activity.is_disclosed ?? true)}
              </p>
              {activity.stake_percentage != null && (
                <p className="text-[9px] text-emerald-600 font-mono font-semibold mt-0.5">{activity.stake_percentage}% stake</p>
              )}
            </div>

            {/* Type */}
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mb-0.5">Type</p>
              <span className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded capitalize font-medium">
                {["strategic_investment", "minority_stake", "funding_round"].includes(activity.deal_type)
                  ? "Invest. & Funding"
                  : activity.deal_type.replaceAll("_", " ")}
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
                  {open ? "Less" : "Details"}
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

        {/* Accordion — rationale + investment details + source link */}
        {open && (
          <div className="mt-3 pt-3 border-t border-purple-100 space-y-3">
            {activity.rationale && (
              <p className="text-slate-600 text-sm leading-relaxed">{activity.rationale}</p>
            )}

            {/* Investment detail box — shown for investment/funding types */}
            {["strategic_investment", "minority_stake", "funding_round"].includes(activity.deal_type) && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Investment Details</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {activity.deal_value > 0 && (activity.is_disclosed ?? true) && (
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mb-0.5">Amount Raised / Invested</p>
                      <p className="text-base font-mono font-bold text-emerald-700">{formatValue(activity.deal_value, true)}</p>
                    </div>
                  )}
                  {activity.stake_percentage != null && (
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mb-0.5">Equity Acquired</p>
                      <p className="text-base font-mono font-bold text-slate-800">{activity.stake_percentage}%</p>
                    </div>
                  )}
                  {activity.round_type && (
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mb-1">Funding Round</p>
                      <RoundBadge roundType={activity.round_type} />
                    </div>
                  )}
                </div>
                {activity.source_url && (
                  <a
                    href={activity.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-white border border-emerald-300 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View official press release
                  </a>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-3 items-center">
              {activity.acquirer_country && (
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <FlagImg iso2={activity.acquirer_country} /> {activity.acquirer_country}
                  {" → "}
                  {activity.target_country && <><FlagImg iso2={resolveTargetCountry(activity)} /> {resolveTargetCountry(activity)}</>}
                </span>
              )}
              {activity.source_url && !["strategic_investment", "minority_stake", "funding_round"].includes(activity.deal_type) && (
                <a
                  href={activity.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-purple-600 hover:text-purple-800 font-semibold"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Read source
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
          <div className="flex flex-col gap-1">
            <p className="text-[10px] text-slate-400 font-mono">{labels.left}</p>
            <CompanyCell activity={activity} side="acquirer" onOpenProfile={onOpenProfile} />
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="flex flex-col gap-1">
            <p className="text-[10px] text-slate-400 font-mono">{labels.right}</p>
            <CompanyCell activity={activity} side="target" onOpenProfile={onOpenProfile} />
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

// ── Deal-type tabs ─────────────────────────────────────────────────────────

const DEAL_TYPE_TABS = [
  { value: "defense_tech",  label: "Defense Startups",       types: INVEST_TYPES },
  { value: "acquisitions",  label: "Acquisitions",          types: ["acquisition"] },
  { value: "mergers",       label: "Mergers",               types: ["merger"] },
  { value: "investments",   label: "Investments & Funding", types: INVEST_TYPES },
  { value: "jv",            label: "Joint Ventures",        types: ["joint_venture"] },
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
  // European companies in defense_players
  "Indra": "Indra Sistemas",
  "Indra Sistemas": "Indra Sistemas",
  "Hensoldt": "Hensoldt",
  "QinetiQ": "QinetiQ",
  "Ultra Electronics": "Ultra Electronics",
  "Kratos": "Kratos Defense",
  "Kratos Defense": "Kratos Defense",
  "Kratos Defense & Security Solutions": "Kratos Defense",
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
// Supports multi-party strings like "Airbus + BAE Systems + Leonardo"

// Avatar group — overlapping horizontal logo stack, max 3 visible + "+N" badge
function AvatarGroup({ parties, activity, side, onOpenProfile }) {
  const MAX_VIS = 3;
  const visible  = parties.slice(0, MAX_VIS);
  const overflow = parties.length - MAX_VIS;

  return (
    <TooltipProvider>
      <UITooltip>
        <TooltipTrigger asChild>
          {/* Inline-flex so row height tracks logo height, not flex-col */}
          <div className="inline-flex items-center" style={{ lineHeight: 0 }}>
            {visible.map((p, i) => {
              const synth = partyActivity(p.name, activity, side);
              return (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); onOpenProfile(resolvePlayerName(p.name) || p.name); }}
                  className="relative shrink-0 rounded-xl hover:ring-2 hover:ring-purple-300 focus:outline-none transition-all"
                  style={{ marginLeft: i > 0 ? -10 : 0, zIndex: MAX_VIS - i }}
                  aria-label={p.name}
                >
                  <CompanyLogo activity={synth} side={side} size="sm" />
                </button>
              );
            })}
            {overflow > 0 && (
              <div
                className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 border-2 border-white text-[9px] font-bold text-slate-500 shrink-0 select-none"
                style={{ marginLeft: -10, zIndex: 0 }}
              >
                +{overflow}
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent className="text-xs max-w-[240px] p-2">
          <div className="space-y-1">
            {parties.map((p, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="text-slate-400 select-none shrink-0">·</span>
                <span className="font-medium">{p.name}</span>
              </div>
            ))}
          </div>
        </TooltipContent>
      </UITooltip>
    </TooltipProvider>
  );
}

// CompanyCell used in the main deal TABLE — logo + bold name + country flag
// Multi-party: overlapping logos (max 2) + comma-separated names on one line
function CompanyCell({ activity, side, onOpenProfile }) {
  const rawName = activity[side === "acquirer" ? "acquirer" : "target"] ?? "";
  const countryField = side === "acquirer" ? "acquirer_country" : "target_country";
  const country = side === "target" ? resolveTargetCountry(activity) : activity[countryField];
  const parties = parseParties(rawName);
  const isMulti = parties.length > 1;

  if (!isMulti) {
    const canonical = resolvePlayerName(rawName);
    return (
      <div className="flex items-center gap-2.5 min-w-0">
        <button onClick={e => { e.stopPropagation(); onOpenProfile(canonical || rawName); }} className="shrink-0">
          <CompanyLogo activity={activity} side={side} size="sm" />
        </button>
        <div className="min-w-0">
          <button
            onClick={e => { e.stopPropagation(); onOpenProfile(canonical || rawName); }}
            className="block text-[13px] font-semibold text-slate-800 hover:text-purple-700 transition-colors text-left leading-snug truncate max-w-[160px]"
          >
            {rawName}
          </button>
          {country && (
            <div className="flex items-center gap-1 mt-0.5">
              <FlagImg iso2={country} />
              <span className="text-[9px] text-slate-400 font-mono">{country}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Multi-party: 2 overlapping logos + names on a single truncated line
  const visible = parties.slice(0, 2);
  const overflow = parties.length - 2;
  return (
    <div className="flex items-center gap-2 min-w-0">
      {/* Overlapping logos */}
      <div className="inline-flex items-center shrink-0">
        {visible.map((p, i) => (
          <button
            key={i}
            onClick={e => { e.stopPropagation(); onOpenProfile(resolvePlayerName(p.name) || p.name); }}
            className="relative rounded-lg hover:ring-2 hover:ring-purple-300 focus:outline-none transition-all shrink-0"
            style={{ marginLeft: i > 0 ? -8 : 0, zIndex: 2 - i }}
          >
            <CompanyLogo activity={partyActivity(p.name, activity, side)} side={side} size="sm" />
          </button>
        ))}
        {overflow > 0 && (
          <div className="relative w-8 h-8 rounded-lg bg-slate-100 border-2 border-white text-[9px] font-bold text-slate-500 flex items-center justify-center shrink-0" style={{ marginLeft: -8, zIndex: 0 }}>
            +{overflow}
          </div>
        )}
      </div>
      {/* Compact name list — single line */}
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-slate-700 leading-snug truncate max-w-[130px]">
          {parties.map((p, i) => (
            <span key={i}>
              {i > 0 && <span className="text-slate-300 mx-0.5">·</span>}
              <button
                onClick={e => { e.stopPropagation(); onOpenProfile(resolvePlayerName(p.name) || p.name); }}
                className="hover:text-purple-700 transition-colors"
              >{p.name}</button>
            </span>
          ))}
        </p>
        {country && (
          <div className="flex items-center gap-1 mt-0.5">
            <FlagImg iso2={country} />
          </div>
        )}
      </div>
    </div>
  );
}

// ── Table row ──────────────────────────────────────────────────────────────

// Detect URLs that point to a specific article/press-release (not just a homepage)
const SPECIFIC_URL_RE = /\/20\d{2}[/-]|press-release|news-release|newsroom\/20|mediaroom|prnewswire\.com|businesswire\.com|reuters\.com\/|bloomberg\.com\/news|breakingdefense|defensenews|janes\.com|aviationweek|spaceflightnow/i;

// Target cell without logo — used when acquirer and target share the same resolved logo domain
function CompanyCellNoLogo({ activity, side, onOpenProfile }) {
  const rawName = activity[side === "acquirer" ? "acquirer" : "target"] ?? "";
  const country = side === "target" ? resolveTargetCountry(activity) : activity.acquirer_country;
  const canonical = resolvePlayerName(rawName);
  return (
    <div className="flex items-center gap-2.5 min-w-0">
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[9px] font-bold text-white shrink-0 select-none ${avatarColor(rawName)}`}>
        {initials(rawName)}
      </div>
      <div className="min-w-0">
        <button
          onClick={e => { e.stopPropagation(); onOpenProfile(canonical || rawName); }}
          className="block text-[13px] font-semibold text-slate-800 hover:text-purple-700 transition-colors text-left leading-snug truncate max-w-[160px]"
        >
          {rawName}
        </button>
        {country && (
          <div className="flex items-center gap-1 mt-0.5">
            <FlagImg iso2={country} />
            <span className="text-[9px] text-slate-400 font-mono">{country}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function TableRow({ activity, index, onOpenProfile, onSelectDeal }) {
  const acquirerDomain = getLogoDomain(activity, "acquirer");
  const targetDomain   = getLogoDomain(activity, "target");
  const sameLogos      = !!(acquirerDomain && acquirerDomain === targetDomain);
  const isSpecificUrl  = !!(activity.source_url && SPECIFIC_URL_RE.test(activity.source_url));

  const rowBg = index % 2 === 0 ? "bg-white" : "bg-slate-50/40";

  return (
    <tr
      className={`${rowBg} hover:bg-purple-50/60 transition-colors cursor-pointer border-b border-slate-100 group`}
      onClick={() => onSelectDeal(activity)}
    >
      <td className="px-3 py-2 text-[11px] text-slate-400 font-mono w-10 select-none">{index + 1}</td>

      {/* Acquirer */}
      <td className="px-3 py-2">
        <CompanyCell activity={activity} side="acquirer" onOpenProfile={onOpenProfile} />
      </td>

      {/* Arrow */}
      <td className="px-1 py-2 text-slate-300 text-xs">→</td>

      {/* Target — use initials badge when logo would duplicate acquirer's */}
      <td className="px-3 py-2">
        {sameLogos
          ? <CompanyCellNoLogo activity={activity} side="target" onOpenProfile={onOpenProfile} />
          : <CompanyCell activity={activity} side="target" onOpenProfile={onOpenProfile} />
        }
      </td>

      {/* Type */}
      <td className="px-3 py-2">
        <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium capitalize whitespace-nowrap">
          {activity.deal_type.replaceAll("_", " ")}
        </span>
        {activity.round_type && (
          <div className="mt-0.5"><RoundBadge roundType={activity.round_type} /></div>
        )}
      </td>

      {/* Value */}
      <td className="px-3 py-2 text-sm font-mono font-semibold text-purple-700 whitespace-nowrap">
        {formatValue(activity.deal_value, activity.is_disclosed ?? true)}
        {activity.stake_percentage != null && (
          <span className="text-[10px] text-slate-400 ml-1">{activity.stake_percentage}%</span>
        )}
      </td>

      {/* Status */}
      <td className="px-3 py-2">
        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap ${getStatusStyle(activity.status)}`}>
          {formatStatus(activity.status)}
        </span>
      </td>

      {/* Date */}
      <td className="px-3 py-2 text-xs text-slate-500 whitespace-nowrap">
        {format(new Date(activity.announced_date), "MMM yyyy")}
      </td>

      {/* Source — only show for specific article URLs, not homepage links */}
      <td className="px-3 py-2 text-center">
        {isSpecificUrl && (
          <a
            href={activity.source_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="text-slate-300 hover:text-purple-600 transition-colors inline-flex opacity-0 group-hover:opacity-100"
            title="Source"
          >
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </td>

      {/* Open detail hint */}
      <td className="px-2 py-2 w-6">
        <ChevronRight className="w-3.5 h-3.5 text-slate-200 group-hover:text-slate-400 transition-colors" />
      </td>
    </tr>
  );
}

// ── Investment consolidated view ────────────────────────────────────────────
// Target company on LEFT, all investor rounds grouped and expandable.

function InvestmentConsolidatedView({ deals, onOpenProfile, onSelectDeal }) {
  const [expanded, setExpanded] = useState(new Set());

  const groups = useMemo(() => {
    const map = new Map();
    for (const d of deals) {
      if (!map.has(d.target)) {
        map.set(d.target, {
          target: d.target,
          target_country: d.target_country,
          target_logo_domain: d.target_logo_domain,
          rounds: [],
        });
      }
      map.get(d.target).rounds.push(d);
    }
    return [...map.values()].map(g => {
      const sorted = [...g.rounds].sort((a, b) => new Date(b.announced_date) - new Date(a.announced_date));
      const totalRaised = g.rounds
        .filter(r => (r.is_disclosed ?? true) && r.deal_value > 0)
        .reduce((s, r) => s + r.deal_value, 0);
      const latestValuation = Math.max(0, ...g.rounds.map(r => r.valuation || 0));
      return { ...g, rounds: sorted, totalRaised, latestValuation: latestValuation || null };
    }).sort((a, b) => {
      const va = a.latestValuation || a.totalRaised || 0;
      const vb = b.latestValuation || b.totalRaised || 0;
      return vb - va;
    });
  }, [deals]);

  const toggleAll = () => {
    if (expanded.size === groups.length) setExpanded(new Set());
    else setExpanded(new Set(groups.map(g => g.target)));
  };

  function toggle(target) {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(target)) next.delete(target); else next.add(target);
      return next;
    });
  }

  if (groups.length === 0) {
    return <div className="text-center py-16 text-slate-400 text-sm">No investment deals match the selected filters.</div>;
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-600">
          {groups.length} portfolio {groups.length === 1 ? "company" : "companies"}
          <span className="ml-2 text-slate-400 font-normal">{deals.length} total rounds</span>
        </p>
        <button
          onClick={toggleAll}
          className="text-xs text-purple-600 hover:text-purple-800 font-medium"
        >
          {expanded.size === groups.length ? "Collapse all" : "Expand all"}
        </button>
      </div>

      {groups.map((group) => {
        const isOpen = expanded.has(group.target);
        const latestRound = group.rounds[0];
        const synth = { target: group.target, target_country: group.target_country, target_logo_domain: group.target_logo_domain };

        return (
          <div key={group.target} className="border-b border-slate-100 last:border-0">
            <div
              className={`flex items-center gap-4 px-5 py-3.5 cursor-pointer transition-colors ${isOpen ? "bg-purple-50/60" : "hover:bg-slate-50"}`}
              onClick={() => toggle(group.target)}
            >
              {/* Target company — LEFT */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <button onClick={e => { e.stopPropagation(); onOpenProfile(resolvePlayerName(group.target) || group.target); }} className="shrink-0">
                  <CompanyLogo activity={synth} side="target" size="md" />
                </button>
                <div className="min-w-0">
                  <button
                    onClick={e => { e.stopPropagation(); onOpenProfile(resolvePlayerName(group.target) || group.target); }}
                    className="font-semibold text-slate-900 hover:text-purple-700 text-sm leading-snug text-left block truncate"
                  >
                    {group.target}
                  </button>
                  {group.target_country && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <FlagImg iso2={group.target_country} />
                      <span className="text-[9px] text-slate-400 font-mono">{group.target_country}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Consolidated stats — RIGHT */}
              <div className="flex items-center gap-5 shrink-0">
                {group.latestValuation ? (
                  <div className="text-right">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">Valuation</p>
                    <p className="text-sm font-mono font-bold text-slate-900">
                      {group.latestValuation >= 1000 ? `$${(group.latestValuation / 1000).toFixed(1)}B` : `$${group.latestValuation}M`}
                    </p>
                  </div>
                ) : null}
                {group.totalRaised > 0 && (
                  <div className="text-right">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">Total raised</p>
                    <p className="text-sm font-mono font-bold text-purple-700">
                      {group.totalRaised >= 1000 ? `$${(group.totalRaised / 1000).toFixed(1)}B` : `$${group.totalRaised}M`}
                    </p>
                  </div>
                )}
                <div className="text-right">
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">Rounds</p>
                  <p className="text-sm font-mono font-bold text-slate-700">{group.rounds.length}</p>
                </div>
                {latestRound?.round_type && <RoundBadge roundType={latestRound.round_type} />}
                <span className="text-slate-400 ml-1">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </div>
            </div>

            {/* Expanded: investor rounds table */}
            {isOpen && (
              <div className="bg-purple-50/30 border-t border-purple-100">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-purple-100">
                      <th className="px-5 pl-16 py-2 text-[9px] font-semibold uppercase tracking-wider text-slate-400 text-left">Investor</th>
                      <th className="px-3 py-2 text-[9px] font-semibold uppercase tracking-wider text-slate-400 text-left">Round</th>
                      <th className="px-3 py-2 text-[9px] font-semibold uppercase tracking-wider text-slate-400 text-right">Amount</th>
                      <th className="px-3 py-2 text-[9px] font-semibold uppercase tracking-wider text-slate-400">Date</th>
                      <th className="px-3 py-2 w-8" />
                    </tr>
                  </thead>
                  <tbody>
                    {group.rounds.map((r, rIdx) => (
                      <tr key={r.id || rIdx} className={`border-b border-purple-50 last:border-0 cursor-pointer hover:bg-purple-100/40 transition-colors ${rIdx % 2 === 0 ? "bg-white/60" : "bg-purple-50/20"}`} onClick={() => onSelectDeal?.(r)}>
                        <td className="px-5 pl-16 py-2.5">
                          <div className="flex items-center gap-2">
                            <button onClick={e => { e.stopPropagation(); onOpenProfile(resolvePlayerName(r.acquirer) || r.acquirer); }} className="shrink-0">
                              <CompanyLogo activity={r} side="acquirer" size="sm" />
                            </button>
                            <CompanyNameBtn name={r.acquirer} onOpenProfile={onOpenProfile} className="text-slate-800 font-medium" />
                          </div>
                        </td>
                        <td className="px-3 py-2.5">
                          {r.round_type
                            ? <RoundBadge roundType={r.round_type} />
                            : <span className="text-[10px] text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded capitalize">{r.deal_type.replaceAll("_", " ")}</span>
                          }
                        </td>
                        <td className="px-3 py-2.5 text-right font-mono font-semibold text-purple-700 whitespace-nowrap">
                          {formatValue(r.deal_value, r.is_disclosed ?? true)}
                        </td>
                        <td className="px-3 py-2.5 text-slate-500 whitespace-nowrap">
                          {format(new Date(r.announced_date), "MMM yyyy")}
                        </td>
                        <td className="px-3 py-2.5 text-center">
                          {r.source_url && (
                            <a
                              href={r.source_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="text-slate-400 hover:text-purple-600 transition-colors inline-flex"
                              title="Source"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Country filter — shows top countries across all deals ──────────────────

const COUNTRY_LABEL = {
  US: "USA", GB: "UK", FR: "France", DE: "Germany", IT: "Italy",
  ES: "Spain", IL: "Israel", CZ: "Czech Rep.", CH: "Switzerland",
  LU: "Luxembourg", SE: "Sweden", KR: "South Korea", AU: "Australia",
  NO: "Norway", BE: "Belgium", PL: "Poland", NL: "Netherlands",
  UA: "Ukraine", AE: "UAE", TR: "Turkey", IN: "India",
  BR: "Brazil", CA: "Canada", JP: "Japan", CN: "China",
};

function CountryFilter({ allDeals, selected, onSelect }) {
  const counts = useMemo(() => {
    const map = {};
    for (const d of allDeals) {
      if (d.acquirer_country) map[d.acquirer_country] = (map[d.acquirer_country] || 0) + 1;
      if (d.target_country && d.target_country !== d.acquirer_country) {
        map[d.target_country] = (map[d.target_country] || 0) + 1;
      }
    }
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([code, count]) => ({ code, count }));
  }, [allDeals]);

  if (counts.length === 0) return null;

  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Country</p>
      <div className="space-y-0.5">
        <button
          onClick={() => onSelect("all")}
          className={`w-full text-left text-xs px-2 py-1 rounded transition-colors ${
            selected === "all"
              ? "bg-purple-50 text-purple-700 font-semibold"
              : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          All countries
        </button>
        {counts.map(({ code, count }) => (
          <button
            key={code}
            onClick={() => onSelect(selected === code ? "all" : code)}
            className={`w-full text-left text-xs px-2 py-1 rounded transition-colors flex items-center gap-2 ${
              selected === code
                ? "bg-purple-50 text-purple-700 font-semibold"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <FlagImg iso2={code} />
            <span className="flex-1 truncate">{COUNTRY_LABEL[code] || code}</span>
            <span className={`text-[9px] font-mono ${selected === code ? "text-purple-400" : "text-slate-400"}`}>{count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Deal Detail Drawer ─────────────────────────────────────────────────────

function ConfidencePill({ confidence }) {
  const map = {
    high:   "bg-emerald-50 text-emerald-700 border-emerald-200",
    medium: "bg-amber-50 text-amber-700 border-amber-200",
    low:    "bg-slate-100 text-slate-500 border-slate-200",
  };
  const cls = map[confidence] || map.low;
  const label = confidence ? confidence.charAt(0).toUpperCase() + confidence.slice(1) : "Low";
  return (
    <UITooltip>
      <TooltipTrigger asChild>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border cursor-default ${cls}`}>
          {label} confidence
        </span>
      </TooltipTrigger>
      <TooltipContent className="text-xs max-w-xs">
        High = 2+ concordant primary sources. Medium = 1 primary source. Low = unverified / estimated.
      </TooltipContent>
    </UITooltip>
  );
}

function DealDetailDrawer({ deal, onClose, onOpenProfile }) {
  if (!deal) return null;
  const labels = getDealLabels(deal.deal_type);
  const acquirerParties = parseParties(deal.acquirer);
  const isMultiAcquirer = acquirerParties.length > 1;

  return (
    <Sheet open={!!deal} onOpenChange={(open) => { if (!open) onClose(); }}>
      <SheetContent
        className="w-full sm:max-w-lg overflow-y-auto p-0 border-l border-slate-200"
        style={{ maxWidth: 520 }}
      >
        {/* ── Header ── */}
        <div className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Deal Detail
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Acquirer → Target */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="min-w-0">
              <p className="text-[9px] text-slate-400 font-mono uppercase tracking-widest mb-1">{labels.left}</p>
              <div className="flex items-center gap-2 flex-wrap">
                {acquirerParties.map((p, idx) => {
                  const synth = partyActivity(p.name, deal, "acquirer");
                  return (
                    <div key={idx} className="flex items-center gap-1.5">
                      {idx > 0 && <span className="text-slate-300 text-xs">+</span>}
                      <button onClick={() => onOpenProfile(resolvePlayerName(p.name) || p.name)} className="shrink-0">
                        <CompanyLogo activity={synth} side="acquirer" size="sm" />
                      </button>
                      <button
                        onClick={() => onOpenProfile(resolvePlayerName(p.name) || p.name)}
                        className="font-semibold text-slate-900 hover:text-purple-700 text-sm text-left transition-colors"
                      >
                        {p.name}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <DealSep type={labels.sep} />

            <div className="min-w-0">
              <p className="text-[9px] text-slate-400 font-mono uppercase tracking-widest mb-1">{labels.right}</p>
              <div className="flex items-center gap-2">
                <button onClick={() => onOpenProfile(resolvePlayerName(deal.target) || deal.target)} className="shrink-0">
                  <CompanyLogo activity={deal} side="target" size="sm" />
                </button>
                <button
                  onClick={() => onOpenProfile(resolvePlayerName(deal.target) || deal.target)}
                  className="font-semibold text-slate-900 hover:text-purple-700 text-sm text-left transition-colors"
                >
                  {deal.target}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="px-6 py-5 space-y-5">

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
                {["strategic_investment","minority_stake","funding_round"].includes(deal.deal_type) ? "Amount Raised" : "Value"}
              </p>
              <p className="text-2xl font-mono font-bold text-purple-700 leading-none">
                {formatValue(deal.deal_value, deal.is_disclosed ?? true)}
              </p>
              {deal.stake_percentage != null && (
                <p className="text-xs text-emerald-600 font-mono font-semibold mt-0.5">{deal.stake_percentage}% stake</p>
              )}
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mb-1.5">Status</p>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getStatusStyle(deal.status)}`}>
                {formatStatus(deal.status)}
              </span>
              {deal.round_type && <div className="mt-1"><RoundBadge roundType={deal.round_type} /></div>}
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mb-1.5">Type</p>
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded capitalize font-medium">
                {deal.deal_type.replaceAll("_", " ")}
              </span>
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mb-1.5">Data Quality</p>
              <TooltipProvider>
                <ConfidencePill confidence={deal.confidence} />
              </TooltipProvider>
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mb-1">Announced</p>
              <p className="text-sm font-medium text-slate-800">{format(new Date(deal.announced_date), "d MMM yyyy")}</p>
            </div>

            {deal.closed_date ? (
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mb-1">Closed</p>
                <p className="text-sm font-medium text-slate-800">{format(new Date(deal.closed_date), "d MMM yyyy")}</p>
              </div>
            ) : (
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mb-1">Closed</p>
                <p className="text-sm text-slate-400">—</p>
              </div>
            )}
          </div>

          {/* Countries */}
          {(deal.acquirer_country || deal.target_country) && (
            <div className="flex items-center gap-2 py-2 border-t border-slate-100 text-xs text-slate-500">
              {deal.acquirer_country && (
                <span className="flex items-center gap-1.5">
                  <FlagImg iso2={deal.acquirer_country} />
                  {deal.acquirer_country}
                </span>
              )}
              {deal.acquirer_country && deal.target_country && (
                <ArrowRight className="w-3 h-3 text-slate-300 shrink-0" />
              )}
              {deal.target_country && (
                <span className="flex items-center gap-1.5">
                  <FlagImg iso2={resolveTargetCountry(deal)} />
                  {resolveTargetCountry(deal)}
                </span>
              )}
            </div>
          )}

          {/* Description */}
          {deal.description && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Summary</p>
              <p className="text-sm text-slate-600 leading-relaxed">{deal.description}</p>
            </div>
          )}

          {/* Rationale */}
          {deal.rationale && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Strategic Rationale</p>
              <p className="text-sm text-slate-600 leading-relaxed">{deal.rationale}</p>
            </div>
          )}

          {/* Notes (deal structure) */}
          {deal.notes && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 mb-2">Deal Structure Notes</p>
              <p className="text-sm text-amber-900 leading-relaxed">{deal.notes}</p>
            </div>
          )}

          {/* Source */}
          {deal.source_url ? (
            <a
              href={deal.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 hover:bg-emerald-100 transition-colors"
            >
              <ExternalLink className="w-4 h-4 shrink-0" />
              View primary source
            </a>
          ) : (
            <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
              <ExternalLink className="w-4 h-4 shrink-0 opacity-40" />
              No source URL available
            </div>
          )}

          {/* Open profiles */}
          <div className="border-t border-slate-100 pt-4 grid grid-cols-2 gap-3">
            {acquirerParties.slice(0, 1).map((p) => (
              <button
                key={p.name}
                onClick={() => { onClose(); onOpenProfile(resolvePlayerName(p.name) || p.name); }}
                className="flex items-center gap-2 text-xs font-medium text-purple-700 bg-purple-50 border border-purple-200 rounded-lg px-3 py-2 hover:bg-purple-100 transition-colors"
              >
                <CompanyLogo activity={partyActivity(p.name, deal, "acquirer")} side="acquirer" size="sm" />
                <span className="truncate">{p.name}</span>
              </button>
            ))}
            <button
              onClick={() => { onClose(); onOpenProfile(resolvePlayerName(deal.target) || deal.target); }}
              className="flex items-center gap-2 text-xs font-medium text-purple-700 bg-purple-50 border border-purple-200 rounded-lg px-3 py-2 hover:bg-purple-100 transition-colors"
            >
              <CompanyLogo activity={deal} side="target" size="sm" />
              <span className="truncate">{deal.target}</span>
            </button>
          </div>

        </div>
      </SheetContent>
    </Sheet>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────

export default function MAActivity() {
  const { token }                              = useAuth();
  const [activities,     setActivities]        = useState([]);
  const [historical,     setHistorical]        = useState([]);
  const [players,        setPlayers]           = useState([]);
  const [loading,        setLoading]           = useState(true);
  const [histLoading,    setHistLoading]       = useState(false);
  const [error,          setError]             = useState(null);
  const [dealTypeTab,    setDealTypeTab]       = useState("defense_tech");
  const [page,           setPage]              = useState(0);
  const [searchTerm,     setSearchTerm]        = useState("");
  const [selectedStatus, setSelectedStatus]    = useState("all");
  const [selectedYear,   setSelectedYear]      = useState("all");
  const [profileName,    setProfileName]       = useState(null);
  const [selectedDeal,   setSelectedDeal]      = useState(null);
  const [sortField,      setSortField]         = useState("announced_date");
  const [sortDir,        setSortDir]           = useState("desc");
  const [scraping,       setScraping]          = useState(false);
  const [metaTotal,      setMetaTotal]         = useState(null);
  const [metaLastScraped, setMetaLastScraped]  = useState(null);
  const [selectedCountry, setSelectedCountry]  = useState("all");
  const [minValue,       setMinValue]          = useState(0);

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

  useEffect(() => {
    fetchRecent(); fetchHist(); fetchMeta();
    axios.get(`${API}/defense-players`).then(r => setPlayers(r.data)).catch(() => {});
  }, []);

  // Merge + deduplicate recent and historical
  const allDeals = useMemo(() => {
    const seen = new Set();
    return [...activities, ...historical].filter(a => {
      if (seen.has(a.id)) return false;
      seen.add(a.id);
      return true;
    });
  }, [activities, historical]);

  // Tab counts
  const tabCounts = useMemo(() => {
    const raw = {};
    for (const a of allDeals) raw[a.deal_type] = (raw[a.deal_type] || 0) + 1;
    const investDeals = allDeals.filter(a => INVEST_TYPES.includes(a.deal_type));
    const uniqueTargets = new Set(investDeals.map(a => a.target)).size;
    const fundingRounds = (raw.strategic_investment || 0) + (raw.minority_stake || 0) + (raw.funding_round || 0) + (raw.investment || 0);
    return {
      defense_tech:         uniqueTargets,
      defense_tech_rounds:  fundingRounds,   // separate counter: deals vs companies
      acquisitions:         (raw.acquisition || 0) + (raw.asset_acquisition || 0),
      mergers:              raw.merger || 0,
      investments:          fundingRounds,
      jv:                   raw.joint_venture || 0,
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
    if (selectedCountry !== "all") {
      list = list.filter(a =>
        a.acquirer_country === selectedCountry || a.target_country === selectedCountry
      );
    }
    if (minValue > 0) {
      list = list.filter(a => (a.is_disclosed ?? true) && (a.deal_value || 0) >= minValue);
    }
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
  }, [allDeals, dealTypeTab, selectedStatus, selectedYear, searchTerm, sortField, sortDir, selectedCountry, minValue]);

  // Reset page on filter change
  useEffect(() => setPage(0), [dealTypeTab, selectedStatus, selectedYear, searchTerm, selectedCountry, sortField, sortDir, minValue]);

  const pageDeals  = filteredDeals.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(filteredDeals.length / PAGE_SIZE);
  const rangeStart = filteredDeals.length === 0 ? 0 : page * PAGE_SIZE + 1;
  const rangeEnd   = Math.min((page + 1) * PAGE_SIZE, filteredDeals.length);

  const totalValue = filteredDeals.filter(a => a.is_disclosed ?? true).reduce((s, a) => s + (a.deal_value || 0), 0);
  const activeFilterCount = [selectedStatus !== "all", selectedYear !== "all", searchTerm.length > 0, selectedCountry !== "all", minValue > 0].filter(Boolean).length;

  // Quarterly chart — uses the same tab filter as the deal list, but ignores
  // the sidebar filters (status/year/country/value) so the chart always shows
  // the full shape of the tab's deal type over time.
  const chartDeals = useMemo(() => {
    if (dealTypeTab === "all") return allDeals;
    const tabDef = DEAL_TYPE_TABS.find(t => t.value === dealTypeTab);
    return tabDef?.types ? allDeals.filter(a => tabDef.types.includes(a.deal_type)) : allDeals;
  }, [allDeals, dealTypeTab]);

  const quarterlyData = useMemo(() => {
    const map = {};
    chartDeals.forEach(a => {
      const d = new Date(a.announced_date);
      const q = `Q${Math.ceil((d.getMonth() + 1) / 3)} ${d.getFullYear()}`;
      if (!map[q]) map[q] = { quarter: q, count: 0, value: 0, ts: d.getTime() };
      map[q].count += 1;
      map[q].value += a.deal_value || 0;
    });
    return Object.values(map).sort((a, b) => a.ts - b.ts).slice(-8);
  }, [chartDeals]);

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
            {metaTotal != null && (
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <span className="ml-2 font-mono text-slate-700 font-semibold inline-flex items-center gap-1 cursor-default">
                    {metaTotal} deals indexed
                    <Info className="w-3 h-3 text-slate-400" />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs text-xs leading-relaxed">
                  Global count of all unique deals in the database. A deal may appear in multiple tabs
                  (e.g. an acquisition of a Defense Startups company counts in both "Acquisitions" and "Defense Startups").
                  Tab badges count deals; "Companies tracked" counts unique portfolio companies.
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          )}
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3" data-testid="kpi-strip">
        {[
          dealTypeTab === "defense_tech"
            ? { label: "COMPANIES TRACKED", value: tabCounts.defense_tech,        sub: `${tabCounts.defense_tech_rounds} funding rounds`, color: "text-slate-900", testid: "kpi-companies" }
            : { label: "TOTAL DEALS",        value: filteredDeals.length,          sub: DEAL_TYPE_TABS.find(t => t.value === dealTypeTab)?.label, color: "text-slate-900", testid: "kpi-total-deals" },
          { label: "TOTAL VALUE",  value: formatValue(totalValue), sub: "Disclosed only",       color: "text-slate-900",  testid: "kpi-total-value" },
          { label: "IN PROGRESS",  value: filteredDeals.filter(a => ["announced","pending","under_review"].includes(a.status)).length, sub: "Announced + Pending", color: "text-amber-600",  testid: "kpi-in-progress" },
          { label: "CLOSED",       value: filteredDeals.filter(a => ["completed","active"].includes(a.status)).length,                sub: "Completed + Active", color: "text-emerald-600", testid: "kpi-closed" },
        ].map(s => (
          <Card key={s.label} className="bg-white border-slate-200 shadow-sm" data-testid={s.testid}>
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
              <div>
                <p className="text-sm font-semibold text-slate-800">Quarterly Activity</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {DEAL_TYPE_TABS.find(t => t.value === dealTypeTab)?.label ?? "All deals"}
                </p>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-slate-400">
                <span className="flex items-center gap-1"><span className="inline-block w-3 h-2.5 rounded-sm bg-purple-200" /> Deal count</span>
                <span className="flex items-center gap-1"><span className="inline-block w-6 border-t-2 border-dashed border-emerald-400" /> Value ($B)</span>
                <span className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">Last 8 quarters</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={110}>
              <ComposedChart data={quarterlyData} margin={{ top: 4, right: 36, left: 0, bottom: 0 }}>
                <XAxis dataKey="quarter" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis
                  yAxisId="count"
                  allowDecimals={false}
                  tick={{ fill: "#94A3B8", fontSize: 10 }}
                  axisLine={false} tickLine={false} width={22}
                />
                <YAxis
                  yAxisId="value"
                  orientation="right"
                  tickFormatter={v => v >= 1000 ? `$${(v/1000).toFixed(0)}B` : v > 0 ? `$${v}M` : ""}
                  tick={{ fill: "#94A3B8", fontSize: 10 }}
                  axisLine={false} tickLine={false} width={36}
                />
                <Tooltip content={({ active, payload }) => {
                  if (active && payload?.length) {
                    const d = payload[0].payload;
                    return (
                      <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 shadow text-xs">
                        <p className="font-semibold text-slate-700 mb-1">{d.quarter}</p>
                        <p className="text-purple-700 font-mono">{d.count} deal{d.count !== 1 ? "s" : ""}</p>
                        {d.value > 0 && <p className="text-emerald-600 font-mono">{d.value >= 1000 ? `$${(d.value/1000).toFixed(1)}B` : `$${d.value}M`} disclosed</p>}
                      </div>
                    );
                  }
                  return null;
                }} />
                <Bar yAxisId="count" dataKey="count" radius={[3, 3, 0, 0]}>
                  {quarterlyData.map((_, i) => (
                    <Cell key={i} fill={i === quarterlyData.length - 1 ? "#7E22CE" : "#E9D5FF"} />
                  ))}
                </Bar>
                <Line
                  yAxisId="value"
                  type="monotone"
                  dataKey="value"
                  stroke="#10B981"
                  strokeWidth={1.5}
                  strokeDasharray="4 2"
                  dot={false}
                  activeDot={{ r: 3, fill: "#10B981" }}
                />
              </ComposedChart>
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
                  onClick={() => { setSelectedStatus("all"); setSelectedYear("all"); setSearchTerm(""); setSelectedCountry("all"); setMinValue(0); }}
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

            {/* Min deal value */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3" /> Min Value
              </p>
              <div className="flex flex-wrap gap-1">
                {MIN_VALUE_OPTIONS.map(o => (
                  <button
                    key={o.value}
                    onClick={() => setMinValue(o.value)}
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded border transition-colors ${
                      minValue === o.value
                        ? "bg-purple-600 text-white border-purple-600"
                        : "bg-white text-slate-600 border-slate-200 hover:border-purple-300"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Country */}
            <CountryFilter
              allDeals={allDeals}
              selected={selectedCountry}
              onSelect={setSelectedCountry}
            />
          </div>
        </div>

        {/* Right — content */}
        <div className="flex-1 min-w-0 space-y-3">

          {/* ── Defense Tech leaderboard view ── */}
          {dealTypeTab === "defense_tech" && (
            <>
              <p className="text-xs text-slate-500 bg-purple-50 border border-purple-100 rounded-lg px-3 py-2">
                Defense-native startups &amp; scaleups receiving strategic investments, minority stakes, and funding rounds.
                Ranked by latest post-money valuation.
              </p>
              <DefenseTechLeaderboard deals={filteredDeals} onOpenProfile={setProfileName} onSelectDeal={setSelectedDeal} players={players} />
            </>
          )}

          {/* ── Investment consolidated view ── */}
          {dealTypeTab === "investments" && (
            <InvestmentConsolidatedView deals={filteredDeals} onOpenProfile={setProfileName} onSelectDeal={setSelectedDeal} />
          )}

          {/* ── Normal deal table (Acquisitions, Mergers, JV) ── */}
          {!["defense_tech", "investments"].includes(dealTypeTab) && <>

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
                        onSelectDeal={setSelectedDeal}
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

          </> /* end normal deal table */}

        </div>
      </div>

      {/* Company profile slide-over */}
      <CompanyProfileSheet
        name={profileName}
        onClose={() => setProfileName(null)}
      />

      {/* Deal detail drawer */}
      <DealDetailDrawer
        deal={selectedDeal}
        onClose={() => setSelectedDeal(null)}
        onOpenProfile={(name) => { setSelectedDeal(null); setProfileName(name); }}
      />
    </div>
  );
}
