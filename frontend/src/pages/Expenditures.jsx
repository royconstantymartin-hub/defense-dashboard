import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { API } from "@/App";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CompanyProfileSheet from "@/components/CompanyProfileSheet";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search, TrendingUp, Clock, Database,
  ArrowUpDown, Globe2, BarChart2, Percent, Shield,
  Anchor, Plane, Satellite, Zap, Lock, Flag, ExternalLink,
  FileText, Building2, Newspaper, Users, Globe, Crosshair,
  Target, Gauge,
} from "lucide-react";

// ── Custom military SVG icons ─────────────────────────────────────────────────
function FighterJetIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2 L13.5 7 L20 10 L20 12 L13.5 11 L13 17 L16 18 L16 20 L12 19 L8 20 L8 18 L11 17 L10.5 11 L4 12 L4 10 L10.5 7 Z" />
    </svg>
  );
}
function WarshipIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M3 16 L4 13 L7 13 L7 10 L9 10 L9 8 L11 7 L13 7 L15 8 L15 10 L17 10 L17 13 L20 13 L21 16 Z" />
      <rect x="10" y="4" width="4" height="3" rx="0.5" />
    </svg>
  );
}
function TankIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="3" y="13" width="18" height="5" rx="1.5" />
      <rect x="6" y="10" width="12" height="3" rx="1" />
      <rect x="9" y="7" width="7" height="3" rx="0.5" />
      <line x1="16" y1="8.5" x2="21" y2="8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function SubmarineIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <ellipse cx="11" cy="14" rx="8" ry="4.5" />
      <rect x="9" y="8" width="5" height="4" rx="1" />
      <path d="M19 12.5 L22 11 L22 17 L19 15.5" />
      <circle cx="5.5" cy="14" r="1" fill="white" />
    </svg>
  );
}
import { getLogoUrls } from "@/lib/companyLogos";
import { getCountryWikiArticle } from "@/lib/countryBanners";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const REGIONS = [
  { value: "all", label: "All Regions" },
  { value: "North America", label: "North America" },
  { value: "Europe", label: "Europe" },
  { value: "Asia-Pacific", label: "Asia-Pacific" },
  { value: "Middle East", label: "Middle East" },
  { value: "South America", label: "South America" },
  { value: "Africa", label: "Africa" },
];

const SORT_OPTIONS = [
  { value: "expenditure_desc", label: "Expenditure (High to Low)" },
  { value: "expenditure_asc", label: "Expenditure (Low to High)" },
  { value: "gdp_desc", label: "% GDP (High to Low)" },
  { value: "gdp_asc", label: "% GDP (Low to High)" },
  { value: "name_asc", label: "Country (A-Z)" },
];

const COLORS = ['#7E22CE', '#A855F7', '#10B981', '#F59E0B', '#3B82F6', '#06B6D4', '#EC4899', '#84CC16'];

const COUNTRY_FLAGS = {
  "US": "us", "CN": "cn", "RU": "ru", "IN": "in", "SA": "sa",
  "GB": "gb", "DE": "de", "FR": "fr", "JP": "jp", "KR": "kr",
  "AU": "au", "IT": "it", "BR": "br", "CA": "ca", "IL": "il",
  "TR": "tr", "ES": "es", "PL": "pl", "NL": "nl", "TW": "tw",
  "SG": "sg", "GR": "gr", "NO": "no", "SE": "se", "FI": "fi",
  "AE": "ae", "PK": "pk", "ID": "id", "VN": "vn", "EG": "eg",
  "UA": "ua", "IR": "ir", "QA": "qa", "KW": "kw", "DZ": "dz",
  "MA": "ma", "TH": "th", "MY": "my", "PH": "ph", "NZ": "nz",
  "ZA": "za", "NG": "ng", "AR": "ar", "CO": "co", "CL": "cl",
  "MX": "mx", "PT": "pt", "BE": "be", "CH": "ch", "AT": "at",
  "DK": "dk", "CZ": "cz", "RO": "ro", "HU": "hu", "JO": "jo",
  "IQ": "iq", "AZ": "az", "BD": "bd", "MM": "mm", "PE": "pe",
};

const BRANCH_ICON = {
  army:          <Shield className="w-4 h-4" />,
  navy:          <Anchor className="w-4 h-4" />,
  air:           <Plane className="w-4 h-4" />,
  space:         <Satellite className="w-4 h-4" />,
  special:       <Zap className="w-4 h-4" />,
  cyber:         <Lock className="w-4 h-4" />,
  strategic:     <Flag className="w-4 h-4" />,
  gendarmerie:   <Shield className="w-4 h-4" />,
  coast_guard:   <Anchor className="w-4 h-4" />,
  national_guard:<Shield className="w-4 h-4" />,
};

const BRANCH_COLOR = {
  army:          "bg-emerald-50 text-emerald-700 border-emerald-200",
  navy:          "bg-blue-50 text-blue-700 border-blue-200",
  air:           "bg-sky-50 text-sky-700 border-sky-200",
  space:         "bg-violet-50 text-violet-700 border-violet-200",
  special:       "bg-amber-50 text-amber-700 border-amber-200",
  cyber:         "bg-slate-50 text-slate-700 border-slate-200",
  strategic:     "bg-rose-50 text-rose-700 border-rose-200",
  gendarmerie:   "bg-indigo-50 text-indigo-700 border-indigo-200",
  coast_guard:   "bg-cyan-50 text-cyan-700 border-cyan-200",
  national_guard:"bg-teal-50 text-teal-700 border-teal-200",
};

// Per-branch Wikimedia Commons emblems keyed by exact branch name.
// Uses Special:Redirect/file/ + &width=100 to get a PNG thumbnail — avoids SVG
// cross-origin issues and the unreliable Special:FilePath redirect.
const WP  = "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/";
const WPS = "&width=100";
const BRANCH_LOGOS = {
  // United States
  "U.S. Army":                  WP + "United_States_Army_logo.svg" + WPS,
  "U.S. Navy":                  WP + "United_States_Navy_logo.svg" + WPS,
  "U.S. Air Force":             WP + "United_States_Air_Force_Logo.svg" + WPS,
  "U.S. Marine Corps":          WP + "United_States_Marine_Corps_logo.svg" + WPS,
  "U.S. Space Force":           WP + "United_States_Space_Force_logo.svg" + WPS,
  "U.S. Coast Guard":           WP + "United_States_Coast_Guard_Emblem.svg" + WPS,
  // France — correct Wikimedia Commons filenames for each branch emblem
  "Armée de Terre":             WP + "Insigne_de_l%27arm%C3%A9e_de_Terre.svg" + WPS,
  "Marine Nationale":           WP + "Marine_nationale_(insigne).svg" + WPS,
  "Armée de l'Air et de l'Espace": WP + "Insigne_de_l%27Arm%C3%A9e_de_l%27Air_et_de_l%27Espace.svg" + WPS,
  "Gendarmerie Nationale":      WP + "Insigne_de_la_Gendarmerie_nationale_(France).svg" + WPS,
  "Cyber Défense":              WP + "Insigne_du_commandement_de_la_cyberd%C3%A9fense.svg" + WPS,
  // United Kingdom
  "British Army":               WP + "British_Army_logo_(2022).svg" + WPS,
  "Royal Navy":                 WP + "Naval_Ensign_of_the_United_Kingdom.svg" + WPS,
  "Royal Air Force":            WP + "Royal_Air_Force_roundel.svg" + WPS,
  "Royal Marines":              WP + "Royal_Marines_badge.svg" + WPS,
  // Germany
  "Heer (Army)":                WP + "Bundeswehr_Logo_Heer_with_lettering.svg" + WPS,
  "Marine (Navy)":              WP + "Bundeswehr_Logo_Marine_with_lettering.svg" + WPS,
  "Luftwaffe (Air Force)":      WP + "Bundeswehr_Logo_Luftwaffe_with_lettering.svg" + WPS,
  "Cyber & Information Domain": WP + "Bundeswehr_Logo_CIR_with_lettering.svg" + WPS,
  // Russia
  "Russian Ground Forces":      WP + "Emblem_of_Ground_Forces_of_Russia.svg" + WPS,
  "Russian Navy":               WP + "Emblem_of_the_Russian_Navy.svg" + WPS,
  "Russian Air Force":          WP + "Roundel_of_Russia.svg" + WPS,
  "Strategic Missile Troops":   WP + "Emblem_of_Strategic_Missile_Forces_of_Russia.svg" + WPS,
  // Japan
  "JGSDF (Ground)":             WP + "JGSDF_Camp_Emblem.svg" + WPS,
  "JMSDF (Maritime)":           WP + "JMSDF_Logo.svg" + WPS,
  "JASDF (Air)":                WP + "Japan_Air_Self-Defense_Force_Roundel.svg" + WPS,
  // South Korea
  "Republic of Korea Army":     WP + "Republic_of_Korea_Army_Emblem.svg" + WPS,
  "Republic of Korea Navy":     WP + "Republic_of_Korea_Navy_Emblem.svg" + WPS,
  "Republic of Korea Air Force":WP + "Republic_of_Korea_Air_Force_Roundel.svg" + WPS,
  // Italy
  "Esercito (Army)":            WP + "Italian_Army_Emblem.svg" + WPS,
  "Marina Militare":            WP + "Insegna_Marina_Militare_italiana.svg" + WPS,
  "Aeronautica Militare":       WP + "Italian_Air_Force_roundel.svg" + WPS,
  "Carabinieri":                WP + "Emblem_of_the_Carabinieri.svg" + WPS,
  // Australia
  "Australian Army":            WP + "Australian_Army_logo.svg" + WPS,
  "Royal Australian Navy":      WP + "Royal_Australian_Navy_Ensign.svg" + WPS,
  "Royal Australian Air Force": WP + "RAAF_roundel.svg" + WPS,
  // Spain
  "Guardia Civil":              WP + "Guardia_Civil_Logo.svg" + WPS,
  // India
  "Indian Army":                WP + "Indian_Army_Logo.svg" + WPS,
  "Indian Navy":                WP + "Indian_Naval_Ensign.svg" + WPS,
  "Indian Air Force":           WP + "Indian_Air_Force_Logo.svg" + WPS,
  // Israel
  "IDF Ground Forces":          WP + "IDF_Ground_Forces_Branch_Logo.svg" + WPS,
  "Israeli Air Force (IAF)":    WP + "Israeli_Air_Force_roundel.svg" + WPS,
  // Turkey
  "Turkish Land Forces":        WP + "Turkish_Land_Forces_Logo.svg" + WPS,
  "Turkish Naval Forces":       WP + "Turkish_Naval_Forces_Logo.svg" + WPS,
  "Turkish Air Force":          WP + "Turkish_Air_Force_roundel.svg" + WPS,
  // China — each branch has its own distinct emblem on Wikimedia
  "PLA Ground Force":           WP + "People%27s_Liberation_Army_Ground_Force_emblem.svg" + WPS,
  "PLA Navy (PLAN)":            WP + "People%27s_Liberation_Army_Navy_emblem.svg" + WPS,
  "PLA Air Force (PLAAF)":      WP + "China_Air_Force_roundel.svg" + WPS,
  "PLA Rocket Force":           WP + "People%27s_Liberation_Army_Rocket_Force_emblem.svg" + WPS,
  "PLA Strategic Support":      WP + "People%27s_Liberation_Army_Strategic_Support_Force_emblem.svg" + WPS,
  // Taiwan
  "Republic of China Army":     WP + "Republic_of_China_Army_Seal.svg" + WPS,
  "Republic of China Navy":     WP + "Republic_of_China_Navy_Seal.svg" + WPS,
  "Republic of China Air Force":WP + "Republic_of_China_Air_Force_Roundel.svg" + WPS,
  // Canada
  "Canadian Army":              WP + "Canadian_Army_badge.svg" + WPS,
  "Royal Canadian Navy":        WP + "Naval_Ensign_of_Canada.svg" + WPS,
  "Royal Canadian Air Force":   WP + "RCAF_Roundel.svg" + WPS,
  // Poland
  "Polish Land Forces":         WP + "Polish_Land_Forces.svg" + WPS,
  "Polish Navy":                WP + "Polish_Naval_Ensign.svg" + WPS,
  "Polish Air Force":           WP + "Polish_Air_Force_Roundel.svg" + WPS,
  // Saudi Arabia
  "Royal Saudi Land Forces":    WP + "Saudi_Arabia_land_forces.svg" + WPS,
  "Royal Saudi Naval Forces":   WP + "Royal_Saudi_Naval_Forces_Emblem.svg" + WPS,
  "Royal Saudi Air Force":      WP + "Royal_Saudi_Air_Force_emblem.svg" + WPS,
  // Ukraine
  "Ukrainian Ground Forces":    WP + "Ukrainian_Ground_Forces_Emblem.svg" + WPS,
  "Ukrainian Navy":             WP + "Naval_Ensign_of_Ukraine.svg" + WPS,
  "Ukrainian Air Force":        WP + "Ukraine_Air_Force_Roundel.svg" + WPS,
  // Brazil
  "Brazilian Army":             WP + "Brazilian_Army_Emblem.svg" + WPS,
  "Brazilian Navy":             WP + "Coat_of_arms_of_the_Brazilian_Navy.svg" + WPS,
  "Brazilian Air Force":        WP + "Brazilian_Air_Force_Roundel.svg" + WPS,
  // Netherlands
  "Royal Netherlands Army":     WP + "Royal_Netherlands_Army_emblem.svg" + WPS,
  "Royal Netherlands Navy":     WP + "Royal_Netherlands_Navy_Ensign.svg" + WPS,
  "Royal Netherlands Air Force":WP + "Royal_Netherlands_Air_Force_roundel.svg" + WPS,
  // Sweden
  "Swedish Army":               WP + "Swedish_Army_logo.svg" + WPS,
  "Swedish Navy":               WP + "Naval_Ensign_of_Sweden.svg" + WPS,
  "Swedish Air Force":          WP + "Swedish_Air_Force_roundel.svg" + WPS,
  // Norway
  "Norwegian Army":             WP + "Norwegian_Army_logo.svg" + WPS,
  "Royal Norwegian Navy":       WP + "Naval_Ensign_of_Norway.svg" + WPS,
  "Royal Norwegian Air Force":  WP + "Norwegian_Air_Force_roundel.svg" + WPS,
  // Israel — branches missing from the original list
  "Israeli Navy":               WP + "Emblem_of_the_Israeli_Navy.svg" + WPS,
  "Intelligence Directorate (AMAN)": WP + "IDF_Military_Intelligence_Directorate_emblem.svg" + WPS,
  // Turkey — Jandarma
  "Jandarma (Gendarmerie)":     WP + "Jandarma_Genel_Komutanligi.svg" + WPS,
  // Egypt
  "Egyptian Army":              WP + "Egyptian_Army_logo.svg" + WPS,
  "Egyptian Navy":              WP + "Egyptian_Navy_logo.svg" + WPS,
  "Egyptian Air Force":         WP + "Egyptian_Air_Force_roundel.svg" + WPS,
  // Saudi Arabia — additional
  "Saudi Arabian National Guard": WP + "Saudi_Arabian_National_Guard_Emblem.svg" + WPS,
};

// Wikipedia article titles whose main image best represents each branch type.
// The useBranchTypePhotos hook fetches the actual image URLs at runtime.
const BRANCH_WIKI_ARTICLES = {
  army:          "Infantry",
  navy:          "Guided-missile_destroyer",
  air:           "Fighter_aircraft",
  space:         "United_States_Space_Force",
  special:       "Special_forces",
  cyber:         "Cyberwarfare",
  strategic:     "Intercontinental_ballistic_missile",
  gendarmerie:   "Gendarmerie",
  coast_guard:   "Coast_guard",
  national_guard:"National_Guard_(United_States)",
};

// Module-level cache so photos are fetched only once per session.
const BRANCH_PHOTO_CACHE = {};

// Module-level cache for emblem thumbnail URLs.
const EMBLEM_CACHE = {};

// Maps each branch name to its English Wikipedia article title.
// Wikipedia pageimages with pithumbsize=100 returns the article's representative
// image — for military branch articles this is typically the unit badge/roundel.
const BRANCH_WP_ARTICLE = {
  // United States
  "U.S. Army": "United States Army",
  "U.S. Navy": "United States Navy",
  "U.S. Air Force": "United States Air Force",
  "U.S. Marine Corps": "United States Marine Corps",
  "U.S. Space Force": "United States Space Force",
  "U.S. Coast Guard": "United States Coast Guard",
  // France
  "Armée de Terre": "French Army",
  "Marine Nationale": "French Navy",
  "Armée de l'Air et de l'Espace": "French Air and Space Force",
  "Gendarmerie Nationale": "National Gendarmerie",
  "Cyber Défense": "Commandement de la cyberdéfense",
  // United Kingdom
  "British Army": "British Army",
  "Royal Navy": "Royal Navy",
  "Royal Air Force": "Royal Air Force",
  "Royal Marines": "Royal Marines",
  // Germany
  "Heer (Army)": "German Army",
  "Marine (Navy)": "German Navy",
  "Luftwaffe (Air Force)": "German Air Force",
  "Cyber & Information Domain": "Cyber and Information Domain Service",
  // Russia
  "Russian Ground Forces": "Russian Ground Forces",
  "Russian Navy": "Russian Navy",
  "Russian Air Force": "Russian Aerospace Forces",
  "Strategic Missile Troops": "Strategic Missile Forces",
  "Airborne Forces (VDV)": "Russian Airborne Forces",
  // China
  "PLA Ground Force": "People's Liberation Army Ground Force",
  "PLA Navy (PLAN)": "People's Liberation Army Navy",
  "PLA Air Force (PLAAF)": "People's Liberation Army Air Force",
  "PLA Rocket Force": "People's Liberation Army Rocket Force",
  "PLA Strategic Support": "People's Liberation Army Strategic Support Force",
  // Japan
  "JGSDF (Ground)": "Japan Ground Self-Defense Force",
  "JMSDF (Maritime)": "Japan Maritime Self-Defense Force",
  "JASDF (Air)": "Japan Air Self-Defense Force",
  // South Korea
  "Republic of Korea Army": "Republic of Korea Army",
  "Republic of Korea Navy": "Republic of Korea Navy",
  "Republic of Korea Air Force": "Republic of Korea Air Force",
  "Marine Corps (ROKMC)": "Republic of Korea Marine Corps",
  // India
  "Indian Army": "Indian Army",
  "Indian Navy": "Indian Navy",
  "Indian Air Force": "Indian Air Force",
  // Australia
  "Australian Army": "Australian Army",
  "Royal Australian Navy": "Royal Australian Navy",
  "Royal Australian Air Force": "Royal Australian Air Force",
  // Italy
  "Esercito (Army)": "Italian Army",
  "Marina Militare": "Italian Navy",
  "Aeronautica Militare": "Italian Air Force",
  "Carabinieri": "Carabinieri",
  // Brazil
  "Exército Brasileiro": "Brazilian Army",
  "Marinha do Brasil": "Brazilian Navy",
  "Força Aérea Brasileira": "Brazilian Air Force",
  // Canada
  "Canadian Army": "Canadian Army",
  "Royal Canadian Navy": "Royal Canadian Navy",
  "Royal Canadian Air Force": "Royal Canadian Air Force",
  // Israel
  "IDF Ground Forces": "Israel Defense Forces",
  "Israeli Navy": "Israeli Navy",
  "Israeli Air Force (IAF)": "Israeli Air Force",
  "Intelligence Directorate (AMAN)": "Directorate of Military Intelligence (Israel)",
  // Turkey
  "Turkish Land Forces": "Turkish Land Forces",
  "Turkish Naval Forces": "Turkish Naval Forces",
  "Turkish Air Force": "Turkish Air Force",
  // Saudi Arabia
  "Royal Saudi Land Forces": "Royal Saudi Land Forces",
  "Royal Saudi Naval Forces": "Royal Saudi Naval Forces",
  "Royal Saudi Air Force": "Royal Saudi Air Force",
  "Royal Saudi Air Defense": "Royal Saudi Air Defense Forces",
  "Saudi National Guard": "Saudi Arabian National Guard",
  // Poland
  "Polish Land Forces": "Polish Land Forces",
  "Polish Navy": "Polish Navy",
  "Polish Air Force": "Polish Air Force",
  // Ukraine
  "Ukrainian Ground Forces": "Ukrainian Ground Forces",
  "Ukrainian Navy": "Ukrainian Navy",
  "Ukrainian Air Force": "Ukrainian Air Force",
  // Egypt
  "Egyptian Army": "Egyptian Army",
  "Egyptian Navy": "Egyptian Navy",
  "Egyptian Air Force": "Egyptian Air Force",
  // Sweden
  "Swedish Army": "Swedish Army",
  "Swedish Navy": "Swedish Navy",
  "Swedish Air Force": "Swedish Air Force",
  // Norway
  "Norwegian Army": "Norwegian Army",
  "Royal Norwegian Navy": "Royal Norwegian Navy",
  "Royal Norwegian Air Force": "Royal Norwegian Air Force",
  // Spain
  "Spanish Army": "Spanish Army",
  "Spanish Navy": "Spanish Navy",
  "Spanish Air Force": "Spanish Air Force",
  // Netherlands
  "Royal Netherlands Army": "Royal Netherlands Army",
  "Royal Netherlands Navy": "Royal Netherlands Navy",
  "Royal Netherlands Air Force": "Royal Netherlands Air Force",
  // Taiwan
  "Republic of China Army": "Republic of China Army",
  "Republic of China Navy": "Republic of China Navy",
  "Republic of China Air Force": "Republic of China Air Force",
};

// Fetches branch emblem URLs via the EN Wikipedia pageimages API (same API
// already used for branch-type background photos — proven to work reliably).
function useBranchEmblems(branches) {
  const [emblems, setEmblems] = useState({});
  const branchesKey = branches?.map(b => b.name).join(',') || '';

  useEffect(() => {
    if (!branches?.length) return;
    branches.forEach(branch => {
      if (EMBLEM_CACHE[branch.name] !== undefined) {
        if (EMBLEM_CACHE[branch.name]) {
          setEmblems(prev => ({ ...prev, [branch.name]: EMBLEM_CACHE[branch.name] }));
        }
        return;
      }
      const article = BRANCH_WP_ARTICLE[branch.name];
      if (!article) { EMBLEM_CACHE[branch.name] = null; return; }
      fetch(
        `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(article)}&pithumbsize=100&format=json&origin=*`
      )
        .then(r => r.json())
        .then(data => {
          const thumbUrl = Object.values(data?.query?.pages || {})[0]?.thumbnail?.source || null;
          EMBLEM_CACHE[branch.name] = thumbUrl;
          if (thumbUrl) setEmblems(prev => ({ ...prev, [branch.name]: thumbUrl }));
        })
        .catch(() => { EMBLEM_CACHE[branch.name] = null; });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branchesKey]);

  return emblems;
}

function useBranchTypePhotos() {
  const [photos, setPhotos] = useState({ ...BRANCH_PHOTO_CACHE });
  useEffect(() => {
    Object.entries(BRANCH_WIKI_ARTICLES).forEach(([type, article]) => {
      if (BRANCH_PHOTO_CACHE[type]) return;
      fetch(
        `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(article)}&pithumbsize=600&format=json&origin=*`
      )
        .then(r => r.json())
        .then(data => {
          const url = Object.values(data?.query?.pages || {})[0]?.thumbnail?.source;
          if (url) {
            BRANCH_PHOTO_CACHE[type] = url;
            setPhotos(p => ({ ...p, [type]: url }));
          }
        })
        .catch(() => {});
    });
  }, []);
  return photos;
}

// Dark gradient fallback per branch type (shown while photo loads or if fetch fails).
const BRANCH_BG_GRADIENT = {
  army:          "from-emerald-800 to-emerald-950",
  navy:          "from-blue-800 to-blue-950",
  air:           "from-sky-700 to-blue-900",
  space:         "from-violet-800 to-violet-950",
  special:       "from-amber-700 to-amber-900",
  cyber:         "from-slate-700 to-slate-900",
  strategic:     "from-rose-800 to-rose-950",
  gendarmerie:   "from-indigo-700 to-indigo-900",
  coast_guard:   "from-cyan-700 to-cyan-900",
  national_guard:"from-teal-700 to-teal-900",
};

const CONTRACT_STATUS_STYLE = {
  awarded:   "bg-emerald-50 text-emerald-700",
  open:      "bg-blue-50 text-blue-700",
  closed:    "bg-slate-100 text-slate-500",
  cancelled: "bg-rose-50 text-rose-600",
};

const CONTRACT_CATEGORY_COLOR = {
  aerospace: "border-l-sky-400",
  naval:     "border-l-blue-400",
  land:      "border-l-emerald-400",
  cyber:     "border-l-slate-400",
  services:  "border-l-amber-400",
  logistics: "border-l-orange-400",
  space:     "border-l-violet-400",
};

const CATEGORY_LABEL = {
  aerospace: "Aerospace", naval: "Naval", land: "Land",
  cyber: "Cyber", services: "Services", logistics: "Logistics", space: "Space",
};

// ── Logo helpers (mirrors MarketData.jsx) ────────────────────────────────────
const AVATAR_COLORS = [
  "from-slate-700 to-slate-900", "from-blue-600 to-blue-800",
  "from-emerald-600 to-emerald-800", "from-amber-600 to-amber-800",
  "from-rose-600 to-rose-800", "from-indigo-600 to-indigo-800",
  "from-teal-600 to-teal-800", "from-orange-600 to-orange-800",
];
function avatarColor(name = "") {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffff;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}
function initials(name = "") {
  return name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}
function CompanyLogo({ name, size = "md" }) {
  const urls = getLogoUrls(name);
  const [idx, setIdx] = useState(0);
  const sz = size === "sm" ? "w-7 h-7 text-[9px]" : "w-9 h-9 text-[11px]";
  if (!urls.length || idx >= urls.length) {
    return (
      <div className={`${sz} bg-gradient-to-br ${avatarColor(name)} rounded-lg flex items-center justify-center shrink-0`}>
        <span className="font-bold text-white tracking-tight">{initials(name)}</span>
      </div>
    );
  }
  return (
    <img
      src={urls[idx]}
      alt={name}
      className={`${sz} rounded-lg object-contain bg-white border border-slate-100 shrink-0 p-0.5`}
      onError={() => setIdx(i => i + 1)}
    />
  );
}

function formatPersonnel(n) {
  if (!n) return null;
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${Math.round(n / 1000)}k`;
  return n.toString();
}

function formatAmount(min, max) {
  if (!min && !max) return null;
  const fmt = (v) => v >= 1000 ? `$${(v / 1000).toFixed(1)}B` : `$${v}M`;
  if (min && max && min !== max) return `${fmt(min)} – ${fmt(max)}`;
  return fmt(min || max);
}

// ── Defense Capabilities Data (IISS Military Balance 2024 / Global Firepower) ─
const DEFENSE_CAPABILITIES = {
  US: { fighters: 2085, helicopters: 5000, drones: 500, land_vehicles: 45000, surface_combatants: 107, submarines: 68 },
  CN: { fighters: 1571, helicopters: 1400, drones: 400, land_vehicles: 14800, surface_combatants: 83,  submarines: 60 },
  RU: { fighters: 769,  helicopters: 1400, drones: 60,  land_vehicles: 22000, surface_combatants: 54,  submarines: 65 },
  IN: { fighters: 628,  helicopters: 720,  drones: 50,  land_vehicles: 9500,  surface_combatants: 36,  submarines: 17 },
  SA: { fighters: 356,  helicopters: 250,  drones: 30,  land_vehicles: 5000,  surface_combatants: 12,  submarines: 0  },
  GB: { fighters: 227,  helicopters: 320,  drones: 12,  land_vehicles: 3600,  surface_combatants: 24,  submarines: 10 },
  DE: { fighters: 260,  helicopters: 290,  drones: 10,  land_vehicles: 4200,  surface_combatants: 12,  submarines: 6  },
  FR: { fighters: 228,  helicopters: 310,  drones: 38,  land_vehicles: 6000,  surface_combatants: 24,  submarines: 10 },
  JP: { fighters: 354,  helicopters: 530,  drones: 8,   land_vehicles: 3200,  surface_combatants: 36,  submarines: 22 },
  KR: { fighters: 406,  helicopters: 620,  drones: 12,  land_vehicles: 7500,  surface_combatants: 28,  submarines: 22 },
  AU: { fighters: 100,  helicopters: 175,  drones: 8,   land_vehicles: 2000,  surface_combatants: 12,  submarines: 6  },
  IT: { fighters: 190,  helicopters: 250,  drones: 8,   land_vehicles: 2800,  surface_combatants: 22,  submarines: 8  },
  BR: { fighters: 122,  helicopters: 280,  drones: 6,   land_vehicles: 2200,  surface_combatants: 16,  submarines: 5  },
  CA: { fighters: 87,   helicopters: 180,  drones: 4,   land_vehicles: 1800,  surface_combatants: 12,  submarines: 4  },
  IL: { fighters: 354,  helicopters: 190,  drones: 100, land_vehicles: 4800,  surface_combatants: 6,   submarines: 5  },
  TR: { fighters: 207,  helicopters: 500,  drones: 120, land_vehicles: 8000,  surface_combatants: 24,  submarines: 12 },
  ES: { fighters: 142,  helicopters: 190,  drones: 6,   land_vehicles: 2600,  surface_combatants: 17,  submarines: 4  },
  PL: { fighters: 128,  helicopters: 230,  drones: 10,  land_vehicles: 3800,  surface_combatants: 4,   submarines: 4  },
  NL: { fighters: 61,   helicopters: 50,   drones: 4,   land_vehicles: 600,   surface_combatants: 12,  submarines: 4  },
  TW: { fighters: 422,  helicopters: 240,  drones: 20,  land_vehicles: 3200,  surface_combatants: 32,  submarines: 4  },
  SG: { fighters: 100,  helicopters: 80,   drones: 10,  land_vehicles: 800,   surface_combatants: 8,   submarines: 4  },
  GR: { fighters: 191,  helicopters: 225,  drones: 8,   land_vehicles: 3500,  surface_combatants: 21,  submarines: 11 },
  NO: { fighters: 57,   helicopters: 70,   drones: 4,   land_vehicles: 600,   surface_combatants: 6,   submarines: 6  },
  SE: { fighters: 60,   helicopters: 80,   drones: 6,   land_vehicles: 600,   surface_combatants: 7,   submarines: 5  },
  FI: { fighters: 55,   helicopters: 70,   drones: 4,   land_vehicles: 1400,  surface_combatants: 4,   submarines: 0  },
  AE: { fighters: 294,  helicopters: 150,  drones: 30,  land_vehicles: 3000,  surface_combatants: 8,   submarines: 0  },
  PK: { fighters: 425,  helicopters: 340,  drones: 40,  land_vehicles: 5500,  surface_combatants: 14,  submarines: 8  },
  ID: { fighters: 93,   helicopters: 165,  drones: 6,   land_vehicles: 2000,  surface_combatants: 22,  submarines: 4  },
  VN: { fighters: 189,  helicopters: 180,  drones: 4,   land_vehicles: 3200,  surface_combatants: 12,  submarines: 6  },
  EG: { fighters: 601,  helicopters: 300,  drones: 20,  land_vehicles: 10000, surface_combatants: 28,  submarines: 8  },
  UA: { fighters: 98,   helicopters: 150,  drones: 50,  land_vehicles: 3000,  surface_combatants: 4,   submarines: 0  },
  IR: { fighters: 372,  helicopters: 350,  drones: 80,  land_vehicles: 7000,  surface_combatants: 21,  submarines: 29 },
  QA: { fighters: 96,   helicopters: 28,   drones: 4,   land_vehicles: 400,   surface_combatants: 4,   submarines: 0  },
  KW: { fighters: 52,   helicopters: 40,   drones: 2,   land_vehicles: 800,   surface_combatants: 5,   submarines: 0  },
  DZ: { fighters: 237,  helicopters: 200,  drones: 10,  land_vehicles: 4500,  surface_combatants: 14,  submarines: 6  },
  MA: { fighters: 89,   helicopters: 90,   drones: 8,   land_vehicles: 2200,  surface_combatants: 14,  submarines: 3  },
  TH: { fighters: 162,  helicopters: 180,  drones: 4,   land_vehicles: 1500,  surface_combatants: 14,  submarines: 0  },
  MY: { fighters: 65,   helicopters: 70,   drones: 4,   land_vehicles: 700,   surface_combatants: 20,  submarines: 2  },
  PH: { fighters: 49,   helicopters: 80,   drones: 4,   land_vehicles: 400,   surface_combatants: 12,  submarines: 0  },
  NZ: { fighters: 0,    helicopters: 60,   drones: 4,   land_vehicles: 600,   surface_combatants: 6,   submarines: 0  },
  ZA: { fighters: 49,   helicopters: 90,   drones: 6,   land_vehicles: 1400,  surface_combatants: 6,   submarines: 3  },
  NG: { fighters: 78,   helicopters: 60,   drones: 4,   land_vehicles: 600,   surface_combatants: 3,   submarines: 0  },
  AR: { fighters: 99,   helicopters: 100,  drones: 4,   land_vehicles: 1200,  surface_combatants: 14,  submarines: 3  },
  CL: { fighters: 74,   helicopters: 80,   drones: 4,   land_vehicles: 700,   surface_combatants: 10,  submarines: 4  },
  PT: { fighters: 30,   helicopters: 50,   drones: 4,   land_vehicles: 400,   surface_combatants: 8,   submarines: 2  },
  RO: { fighters: 40,   helicopters: 90,   drones: 4,   land_vehicles: 2200,  surface_combatants: 6,   submarines: 1  },
  CZ: { fighters: 24,   helicopters: 50,   drones: 4,   land_vehicles: 600,   surface_combatants: 0,   submarines: 0  },
  HU: { fighters: 12,   helicopters: 30,   drones: 2,   land_vehicles: 300,   surface_combatants: 0,   submarines: 0  },
  JO: { fighters: 79,   helicopters: 50,   drones: 4,   land_vehicles: 2000,  surface_combatants: 0,   submarines: 0  },
  IQ: { fighters: 83,   helicopters: 80,   drones: 4,   land_vehicles: 1500,  surface_combatants: 0,   submarines: 0  },
  AZ: { fighters: 64,   helicopters: 60,   drones: 30,  land_vehicles: 1800,  surface_combatants: 4,   submarines: 0  },
  BD: { fighters: 109,  helicopters: 80,   drones: 4,   land_vehicles: 1200,  surface_combatants: 12,  submarines: 2  },
  MM: { fighters: 146,  helicopters: 90,   drones: 4,   land_vehicles: 1000,  surface_combatants: 8,   submarines: 0  },
  PE: { fighters: 76,   helicopters: 80,   drones: 4,   land_vehicles: 800,   surface_combatants: 8,   submarines: 6  },
};

const CAP_CATEGORIES = [
  {
    key: "fighters",
    label: "Combat Aircraft",
    sublabel: "Fighters, Bombers & Stealth",
    Icon: FighterJetIcon,
    scale: 50,
    scaleLabel: "50 aircraft",
    bg: "bg-white",
    border: "border-slate-200",
    labelColor: "text-slate-500",
    countColor: "text-slate-700",
    dotColor: "text-slate-400",
    progressColor: "bg-slate-700",
    iconBadgeBg: "bg-slate-50",
    iconColor: "text-slate-500",
  },
  {
    key: "helicopters",
    label: "Rotary Wing",
    sublabel: "Attack, Transport & Naval Helos",
    Icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10h18M12 10V6M8 6h8M6 14l-2 4h16l-2-4"/>
        <circle cx="12" cy="10" r="1"/>
      </svg>
    ),
    scale: 20,
    scaleLabel: "20 helicopters",
    bg: "bg-white",
    border: "border-slate-200",
    labelColor: "text-slate-500",
    countColor: "text-slate-700",
    dotColor: "text-slate-400",
    progressColor: "bg-slate-700",
    iconBadgeBg: "bg-slate-50",
    iconColor: "text-slate-500",
  },
  {
    key: "drones",
    label: "Drones & UAS",
    sublabel: "MALE, HALE & Combat UAS",
    Icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0"/>
        <path d="M5 12H2M22 12h-3M12 5V2M12 22v-3M7.05 7.05L5 5M19 5l-2.05 2.05M7.05 16.95L5 19M19 19l-2.05-2.05"/>
        <path d="M4 12h2a6 6 0 0 0 12 0h2"/>
      </svg>
    ),
    scale: 5,
    scaleLabel: "5 UAS",
    bg: "bg-white",
    border: "border-slate-200",
    labelColor: "text-slate-500",
    countColor: "text-slate-700",
    dotColor: "text-slate-400",
    progressColor: "bg-slate-700",
    iconBadgeBg: "bg-slate-50",
    iconColor: "text-slate-500",
  },
  {
    key: "land_vehicles",
    label: "Land Forces",
    sublabel: "MBTs, IFVs, APCs & Armour",
    Icon: TankIcon,
    scale: 500,
    scaleLabel: "500 vehicles",
    bg: "bg-white",
    border: "border-slate-200",
    labelColor: "text-slate-500",
    countColor: "text-slate-700",
    dotColor: "text-slate-400",
    progressColor: "bg-slate-700",
    iconBadgeBg: "bg-slate-50",
    iconColor: "text-slate-500",
  },
  {
    key: "surface_combatants",
    label: "Surface Combatants",
    sublabel: "Frigates, Destroyers & Corvettes",
    Icon: WarshipIcon,
    scale: 4,
    scaleLabel: "4 vessels",
    bg: "bg-white",
    border: "border-slate-200",
    labelColor: "text-slate-500",
    countColor: "text-slate-700",
    dotColor: "text-slate-400",
    progressColor: "bg-slate-700",
    iconBadgeBg: "bg-slate-50",
    iconColor: "text-slate-500",
  },
  {
    key: "submarines",
    label: "Submarines",
    sublabel: "Attack & Ballistic SSBNs",
    Icon: SubmarineIcon,
    scale: 3,
    scaleLabel: "3 submarines",
    bg: "bg-white",
    border: "border-slate-200",
    labelColor: "text-slate-500",
    countColor: "text-slate-700",
    dotColor: "text-slate-400",
    progressColor: "bg-slate-700",
    iconBadgeBg: "bg-slate-50",
    iconColor: "text-slate-500",
  },
];

// Pre-computed world ranks and max values for capability tiles
const CAP_MAX = {};
const CAP_RANKS = {};
CAP_CATEGORIES.forEach(({ key }) => {
  const sorted = Object.entries(DEFENSE_CAPABILITIES)
    .filter(([, v]) => (v[key] || 0) > 0)
    .sort((a, b) => b[1][key] - a[1][key]);
  CAP_MAX[key] = sorted[0]?.[1][key] ?? 0;
  CAP_RANKS[key] = sorted.map(([code]) => code);
});

// Equipment breakdown — pilot for top 10 spenders
// Sources: IISS Military Balance 2024, Jane's, open military databases
const CAPABILITY_DETAILS = {
  US: {
    fighters: [
      { model: "F-16C/D Fighting Falcon", count: 944, manufacturer: "Lockheed Martin" },
      { model: "F/A-18E/F/G Super Hornet / Growler", count: 635, manufacturer: "Boeing" },
      { model: "F-35A/B/C Lightning II", count: 620, manufacturer: "Lockheed Martin" },
      { model: "A-10C Thunderbolt II", count: 281, manufacturer: "Fairchild-Republic / Boeing" },
      { model: "F-22A Raptor", count: 186, manufacturer: "Lockheed Martin" },
      { model: "B-52H Stratofortress", count: 76, manufacturer: "Boeing" },
      { model: "B-1B Lancer", count: 45, manufacturer: "Boeing" },
      { model: "B-2A Spirit", count: 20, manufacturer: "Northrop Grumman" },
      { model: "F-15C/D/E Strike Eagle", count: 265, manufacturer: "Boeing" },
    ],
    helicopters: [
      { model: "UH-60 Black Hawk (all variants)", count: 2135, manufacturer: "Sikorsky / Lockheed Martin" },
      { model: "AH-64D/E Apache", count: 870, manufacturer: "Boeing" },
      { model: "CH-47F Chinook", count: 472, manufacturer: "Boeing" },
      { model: "OH-58D Kiowa Warrior", count: 300, manufacturer: "Bell Helicopter" },
      { model: "MH-60R/S Seahawk", count: 290, manufacturer: "Sikorsky" },
      { model: "CH-53E/K Super Stallion", count: 135, manufacturer: "Sikorsky" },
      { model: "AH-1Z Viper", count: 160, manufacturer: "Bell Helicopter" },
      { model: "UH-1Y Venom", count: 160, manufacturer: "Bell Helicopter" },
    ],
    drones: [
      { model: "MQ-9A/B Reaper", count: 300, manufacturer: "General Atomics" },
      { model: "MQ-1C Gray Eagle", count: 150, manufacturer: "General Atomics" },
      { model: "RQ-4 Global Hawk / Triton", count: 35, manufacturer: "Northrop Grumman" },
      { model: "MQ-25 Stingray (carrier UAV)", count: 7, manufacturer: "Boeing" },
      { model: "RQ-7B Shadow", count: 140, manufacturer: "Textron" },
    ],
    land_vehicles: [
      { model: "M1A2 SEP v3 Abrams MBT", count: 4400, manufacturer: "General Dynamics Land Systems" },
      { model: "M1A1 Abrams MBT", count: 1100, manufacturer: "General Dynamics Land Systems" },
      { model: "M2A3 Bradley IFV", count: 4000, manufacturer: "BAE Systems" },
      { model: "M113 APC (variants)", count: 3500, manufacturer: "BAE Systems" },
      { model: "Stryker 8×8 (variants)", count: 4300, manufacturer: "General Dynamics Land Systems" },
      { model: "HMMWV (Humvee, variants)", count: 80000, manufacturer: "AM General" },
      { model: "JLTV (Joint Light Tactical)", count: 7000, manufacturer: "Oshkosh Defense" },
    ],
    surface_combatants: [
      { model: "Arleigh Burke-class DDG", count: 73, manufacturer: "Huntington Ingalls / General Dynamics" },
      { model: "Ticonderoga-class CG", count: 22, manufacturer: "Huntington Ingalls Industries" },
      { model: "Freedom / Independence-class LCS", count: 12, manufacturer: "Lockheed Martin / Austal" },
    ],
    submarines: [
      { model: "Ohio-class SSBN / SSGN", count: 18, manufacturer: "General Dynamics Electric Boat" },
      { model: "Virginia-class SSN", count: 22, manufacturer: "General Dynamics / Huntington Ingalls" },
      { model: "Los Angeles-class SSN", count: 28, manufacturer: "General Dynamics / Newport News" },
    ],
  },
  CN: {
    fighters: [
      { model: "J-11/J-11B Flanker-L", count: 370, manufacturer: "Shenyang Aircraft Corporation" },
      { model: "J-16 Flanker-D variant", count: 300, manufacturer: "Shenyang Aircraft Corporation" },
      { model: "J-10C Firebird", count: 290, manufacturer: "Chengdu Aircraft Industry Group" },
      { model: "J-20 Mighty Dragon (stealth)", count: 200, manufacturer: "Chengdu Aircraft Industry Group" },
      { model: "J-7 / J-7A (legacy)", count: 234, manufacturer: "Chengdu Aircraft Industry Group" },
      { model: "H-6K/N Badger (bomber)", count: 80, manufacturer: "Xi'an Aircraft Industrial Corporation" },
      { model: "Su-27 / Su-30MKK", count: 97, manufacturer: "Sukhoi (Russia)" },
    ],
    helicopters: [
      { model: "Z-8 / Z-18 Heavy Transport", count: 120, manufacturer: "Changhe Aircraft Industries" },
      { model: "Z-9 / Z-9W (Dauphin-derived)", count: 350, manufacturer: "Harbin Aircraft Industry Group" },
      { model: "Z-10 Attack", count: 200, manufacturer: "Changhe Aircraft Industries" },
      { model: "Z-19 Scout / Attack", count: 100, manufacturer: "Harbin Aircraft Industry Group" },
      { model: "Mi-17 / Mi-171 Hip", count: 80, manufacturer: "Russian Helicopters (Russia)" },
      { model: "Z-20 (Black Hawk equivalent)", count: 150, manufacturer: "Harbin Aircraft Industry Group" },
    ],
    drones: [
      { model: "Wing Loong II MALE", count: 100, manufacturer: "CAIG / AVIC" },
      { model: "CH-4 / CH-5 Rainbow MALE", count: 120, manufacturer: "CASC" },
      { model: "TB-001 Twin-tailed Scorpion", count: 40, manufacturer: "Tengden Technology" },
      { model: "WZ-7 Soaring Dragon HALE", count: 10, manufacturer: "Guizhou Aircraft Industry" },
      { model: "GJ-11 Sharp Sword UCAV", count: 6, manufacturer: "Hongdu Aviation Industry" },
    ],
    land_vehicles: [
      { model: "Type 99A MBT", count: 1200, manufacturer: "Inner Mongolia First Machinery Group" },
      { model: "Type 96A/B MBT", count: 2400, manufacturer: "Inner Mongolia First Machinery Group" },
      { model: "Type 88 MBT", count: 800, manufacturer: "Inner Mongolia First Machinery Group" },
      { model: "Type 59 MBT (reserve)", count: 1400, manufacturer: "Inner Mongolia First Machinery Group" },
      { model: "ZBD-04A IFV", count: 900, manufacturer: "NORINCO" },
      { model: "ZBL-09 Snow Leopard 8×8 APC", count: 2000, manufacturer: "NORINCO" },
      { model: "Type 63 / WZ-551 APC", count: 3000, manufacturer: "NORINCO" },
    ],
    surface_combatants: [
      { model: "Type 055 Renhai-class CG", count: 8, manufacturer: "Jiangnan / Dalian Shipyard" },
      { model: "Type 052D Luyang III DDG", count: 25, manufacturer: "Jiangnan / Dalian Shipyard" },
      { model: "Type 054A Jiangkai II FFG", count: 30, manufacturer: "Hudong-Zhonghua / Guangzhou" },
      { model: "Type 056/056A Jiangdao corvette", count: 20, manufacturer: "Various CSSC yards" },
    ],
    submarines: [
      { model: "Type 094 Jin-class SSBN", count: 6, manufacturer: "Huludao Shipyard" },
      { model: "Type 093 Shang-class SSN", count: 6, manufacturer: "Huludao Shipyard" },
      { model: "Type 039/A/B Yuan-class SSK", count: 20, manufacturer: "Wuhan / Jiangnan Shipyard" },
      { model: "Type 041 Yuan-class SSK", count: 12, manufacturer: "Jiangnan Shipyard" },
      { model: "Type 035 Ming-class SSK", count: 14, manufacturer: "Wuchang Shipyard" },
      { model: "Type 091 Han-class SSN", count: 2, manufacturer: "Huludao Shipyard" },
    ],
  },
  RU: {
    fighters: [
      { model: "Su-27 Flanker / Su-30SM", count: 190, manufacturer: "Sukhoi (UAC)" },
      { model: "MiG-31 Foxhound", count: 134, manufacturer: "Mikoyan (UAC)" },
      { model: "Su-25 Frogfoot", count: 134, manufacturer: "Sukhoi (UAC)" },
      { model: "Su-34 Fullback", count: 130, manufacturer: "Sukhoi (UAC)" },
      { model: "Su-35S Flanker-E", count: 110, manufacturer: "Sukhoi (UAC)" },
      { model: "MiG-29 Fulcrum", count: 120, manufacturer: "Mikoyan (UAC)" },
      { model: "Tu-95 Bear / Tu-160 Blackjack", count: 80, manufacturer: "Tupolev (UAC)" },
      { model: "Su-57 Felon (stealth)", count: 22, manufacturer: "Sukhoi (UAC)" },
    ],
    helicopters: [
      { model: "Mi-8/Mi-17 Hip (transport)", count: 500, manufacturer: "Russian Helicopters / Kazan" },
      { model: "Mi-24 Hind / Mi-35 Attack", count: 300, manufacturer: "Russian Helicopters / Mil" },
      { model: "Ka-52 Alligator Attack", count: 130, manufacturer: "Russian Helicopters / Kamov" },
      { model: "Mi-28N Night Hunter Attack", count: 110, manufacturer: "Russian Helicopters / Mil" },
      { model: "Ka-27 / Ka-29 Naval", count: 100, manufacturer: "Russian Helicopters / Kamov" },
      { model: "Mi-26 Heavy Lift", count: 50, manufacturer: "Russian Helicopters / Mil" },
    ],
    drones: [
      { model: "Forpost-R MALE (Searcher derivative)", count: 40, manufacturer: "Ural Civil Aviation Plant" },
      { model: "Orion MALE / UCAV", count: 12, manufacturer: "Kronshtadt Group" },
      { model: "Eleron-3 / Orlan-10 tactical", count: 500, manufacturer: "Enics / Special Technology Center" },
    ],
    land_vehicles: [
      { model: "T-72B3 / T-72B3M MBT", count: 2800, manufacturer: "Uralvagonzavod" },
      { model: "T-80BV / T-80U MBT", count: 3000, manufacturer: "Omsk Transmash / Kirovets" },
      { model: "T-90A / T-90M Proryv MBT", count: 620, manufacturer: "Uralvagonzavod" },
      { model: "T-14 Armata MBT (limited)", count: 20, manufacturer: "Uralvagonzavod" },
      { model: "BMP-2 IFV", count: 5000, manufacturer: "Kurganmashzavod" },
      { model: "BMP-3 IFV", count: 600, manufacturer: "Kurganmashzavod" },
      { model: "BTR-80/82A APC", count: 5000, manufacturer: "Arzamas Machine Building Plant" },
      { model: "MT-LB Multi-purpose tractor", count: 4000, manufacturer: "Kharkov Tractor Plant" },
    ],
    surface_combatants: [
      { model: "Buyan-M corvette (Pr.21631)", count: 10, manufacturer: "Zelenodolsk Shipyard" },
      { model: "Karakurt corvette (Pr.22800)", count: 9, manufacturer: "Various Russian yards" },
      { model: "Steregushchy corvette (Pr.20380)", count: 8, manufacturer: "Severnaya Verf" },
      { model: "Udaloy DDG (Pr.1155)", count: 8, manufacturer: "Yantar Shipyard" },
      { model: "Sovremennyy DDG (Pr.956)", count: 6, manufacturer: "Severnaya Verf" },
      { model: "Grigorovich FFG (Pr.11356)", count: 6, manufacturer: "Yantar Shipyard" },
      { model: "Slava-class CG", count: 3, manufacturer: "Nikolayev Shipyard" },
      { model: "Admiral Gorshkov FFG (Pr.22350)", count: 4, manufacturer: "Severnaya Verf" },
    ],
    submarines: [
      { model: "Kilo / Improved Kilo SSK", count: 17, manufacturer: "Admiralty Shipyard" },
      { model: "Delta IV SSBN (Pr.667BDRM)", count: 6, manufacturer: "Sevmash" },
      { model: "Akula SSN (Pr.971)", count: 7, manufacturer: "Amur / Sevmash" },
      { model: "Borei-class SSBN (Pr.955)", count: 5, manufacturer: "Sevmash" },
      { model: "Varshavyanka SSK (Pr.636.3)", count: 12, manufacturer: "Admiralty Shipyard" },
      { model: "Yasen SSN (Pr.885/885M)", count: 4, manufacturer: "Sevmash" },
      { model: "Oscar II SSGN (Pr.949A)", count: 4, manufacturer: "Sevmash" },
      { model: "Borei-A SSBN (Pr.955A)", count: 3, manufacturer: "Sevmash" },
    ],
  },
  IN: {
    fighters: [
      { model: "Su-30MKI Flanker-H", count: 262, manufacturer: "HAL / Sukhoi" },
      { model: "SEPECAT Jaguar IS/IB", count: 120, manufacturer: "BAE Systems / HAL" },
      { model: "MiG-29 / MiG-29UPG", count: 66, manufacturer: "Mikoyan / HAL" },
      { model: "Mirage 2000H/TH", count: 51, manufacturer: "Dassault Aviation" },
      { model: "Tejas Mk.1A LCA", count: 83, manufacturer: "Hindustan Aeronautics Limited" },
      { model: "Rafale", count: 36, manufacturer: "Dassault Aviation" },
      { model: "MiG-21 Bison (phasing out)", count: 56, manufacturer: "Mikoyan / HAL" },
    ],
    helicopters: [
      { model: "Dhruv ALH (all variants)", count: 250, manufacturer: "Hindustan Aeronautics Limited" },
      { model: "Mi-17 / Mi-17V5 Hip", count: 200, manufacturer: "Russian Helicopters" },
      { model: "AH-64E Apache Guardian", count: 22, manufacturer: "Boeing" },
      { model: "Mi-35 Hind Attack", count: 20, manufacturer: "Russian Helicopters" },
      { model: "Chetak (Alouette III)", count: 120, manufacturer: "HAL / Airbus Helicopters" },
      { model: "Sea King Mk.42B/C", count: 20, manufacturer: "Westland / HAL" },
    ],
    drones: [
      { model: "MQ-9B Sea Guardian / Sky Guardian", count: 31, manufacturer: "General Atomics" },
      { model: "Heron I / Heron TP MALE", count: 50, manufacturer: "IAI (Israel)" },
      { model: "Rustom-2 MALE (TAPAS-BH-201)", count: 6, manufacturer: "DRDO / ADE" },
    ],
    land_vehicles: [
      { model: "T-90S Bhishma MBT", count: 1657, manufacturer: "Heavy Vehicles Factory / Uralvagonzavod" },
      { model: "T-72M1 Ajeya MBT", count: 1657, manufacturer: "Heavy Vehicles Factory / UVZ" },
      { model: "Arjun Mk.1A MBT", count: 220, manufacturer: "DRDO / Heavy Vehicles Factory" },
      { model: "BMP-2 Sarath IFV", count: 2600, manufacturer: "Ordnance Factory Board" },
      { model: "PT-76 (amphibious, reserve)", count: 80, manufacturer: "Kirovets-Leningrad" },
    ],
    surface_combatants: [
      { model: "Talwar-class FFG", count: 6, manufacturer: "Yantar Shipyard (Russia)" },
      { model: "Shivalik-class FFG", count: 3, manufacturer: "Mazagon Dock / GRSE" },
      { model: "Kolkata-class DDG", count: 3, manufacturer: "Mazagon Dock Shipbuilders" },
      { model: "Visakhapatnam-class DDG", count: 2, manufacturer: "Mazagon Dock Shipbuilders" },
      { model: "Delhi-class DDG", count: 3, manufacturer: "Mazagon Dock Shipbuilders" },
      { model: "Kamorta-class corvette (ASW)", count: 4, manufacturer: "Garden Reach Shipbuilders" },
      { model: "Brahmaputra-class FFG", count: 3, manufacturer: "Garden Reach Shipbuilders" },
      { model: "Veer-class missile boat", count: 6, manufacturer: "Goa Shipyard Limited" },
    ],
    submarines: [
      { model: "Kalvari-class SSK (Scorpène)", count: 6, manufacturer: "Naval Group / Mazagon Dock" },
      { model: "Sindhughosh-class SSK (Kilo)", count: 7, manufacturer: "Admiralty Shipyard / HSL" },
      { model: "Arihant-class SSBN", count: 2, manufacturer: "Ship Building Centre Visakhapatnam" },
      { model: "Shishumar-class SSK (Type 209)", count: 2, manufacturer: "HDW / Mazagon Dock" },
    ],
  },
  SA: {
    fighters: [
      { model: "Tornado IDS/ADV", count: 80, manufacturer: "Panavia / BAE Systems" },
      { model: "F-15SA Strike Eagle", count: 84, manufacturer: "Boeing" },
      { model: "F-15C/D Eagle", count: 70, manufacturer: "Boeing" },
      { model: "Typhoon", count: 72, manufacturer: "BAE Systems / Eurofighter" },
      { model: "F-5 Tiger II (reserve)", count: 50, manufacturer: "Northrop" },
    ],
    helicopters: [
      { model: "AH-64D Apache", count: 12, manufacturer: "Boeing" },
      { model: "UH-60 Black Hawk", count: 72, manufacturer: "Sikorsky" },
      { model: "AS-532 Cougar", count: 22, manufacturer: "Airbus Helicopters" },
      { model: "MD 530F (light attack)", count: 36, manufacturer: "MD Helicopters" },
      { model: "Bell 412 (utility)", count: 40, manufacturer: "Bell Helicopter" },
      { model: "AB-205/206/212", count: 80, manufacturer: "AgustaWestland" },
    ],
    drones: [
      { model: "Wing Loong I/II MALE", count: 20, manufacturer: "CAIG / AVIC (China)" },
      { model: "CH-4 Rainbow MALE", count: 10, manufacturer: "CASC (China)" },
    ],
    land_vehicles: [
      { model: "M1A2S Abrams MBT", count: 373, manufacturer: "General Dynamics Land Systems" },
      { model: "M60A3 MBT (reserve)", count: 450, manufacturer: "General Dynamics" },
      { model: "AMX-30 MBT (reserve)", count: 290, manufacturer: "GIAT Industries" },
      { model: "M2A2 Bradley IFV", count: 400, manufacturer: "BAE Systems" },
      { model: "LAV-25 / LAV-III APC", count: 600, manufacturer: "General Dynamics Canada" },
      { model: "M113A1/A3 APC", count: 1800, manufacturer: "BAE Systems" },
    ],
    surface_combatants: [
      { model: "Madinah FFG (F2000)", count: 4, manufacturer: "Thomson-CSF / France" },
      { model: "Al Riyadh FFG (La Fayette)", count: 3, manufacturer: "Naval Group / France" },
      { model: "Al Jubail corvette (Avante 2200)", count: 4, manufacturer: "Navantia" },
      { model: "Badr-class corvette", count: 4, manufacturer: "Tacoma Boatbuilding" },
    ],
    submarines: [],
  },
  GB: {
    fighters: [
      { model: "Typhoon FGR4 / F2", count: 137, manufacturer: "BAE Systems / Eurofighter" },
      { model: "F-35B Lightning II", count: 74, manufacturer: "Lockheed Martin / BAE Systems" },
    ],
    helicopters: [
      { model: "AH-64E Apache Guardian", count: 50, manufacturer: "Boeing / AgustaWestland" },
      { model: "Merlin HM2 / HC4 (naval & support)", count: 62, manufacturer: "Leonardo (AgustaWestland)" },
      { model: "Wildcat AH1 / HMA2", count: 62, manufacturer: "Leonardo (AgustaWestland)" },
      { model: "Puma HC2", count: 22, manufacturer: "Airbus Helicopters" },
      { model: "Chinook HC6/6A", count: 60, manufacturer: "Boeing" },
      { model: "Bell Griffin HT1 (training)", count: 24, manufacturer: "Bell Helicopter" },
    ],
    drones: [
      { model: "MQ-9A Reaper", count: 10, manufacturer: "General Atomics" },
      { model: "Protector RG Mk.1 (MQ-9B)", count: 16, manufacturer: "General Atomics" },
      { model: "Watchkeeper WK450 tactical", count: 54, manufacturer: "Thales UK / Elbit" },
    ],
    land_vehicles: [
      { model: "Challenger 2 MBT", count: 213, manufacturer: "BAE Systems" },
      { model: "Warrior IFV", count: 380, manufacturer: "BAE Systems" },
      { model: "Ajax IFV/scout (FRES)", count: 150, manufacturer: "General Dynamics UK" },
      { model: "FV430 Bulldog APC", count: 600, manufacturer: "BAE Systems" },
      { model: "Jackal 2 HMWMV", count: 300, manufacturer: "Coyote / Babcock" },
      { model: "Mastiff / Ridgeback PPV", count: 250, manufacturer: "Force Protection Europe" },
    ],
    surface_combatants: [
      { model: "Type 23 Duke-class FFG", count: 13, manufacturer: "Yarrow / Swan Hunter" },
      { model: "Type 45 Daring-class DDG", count: 6, manufacturer: "BAE Systems Surface Ships" },
      { model: "Queen Elizabeth-class CVF", count: 2, manufacturer: "BAE Systems / Aircraft Carrier Alliance" },
      { model: "River-class OPV Batch 2", count: 3, manufacturer: "BAE Systems Govan" },
    ],
    submarines: [
      { model: "Vanguard-class SSBN", count: 4, manufacturer: "BAE Systems Barrow" },
      { model: "Astute-class SSN", count: 3, manufacturer: "BAE Systems Barrow" },
      { model: "Trafalgar-class SSN", count: 3, manufacturer: "VSEL / BAE Systems" },
    ],
  },
  DE: {
    fighters: [
      { model: "Typhoon", count: 140, manufacturer: "Eurofighter / Airbus Defence" },
      { model: "Tornado IDS (retiring)", count: 85, manufacturer: "Panavia Aircraft" },
      { model: "F/A-18F Super Hornet (nuclear role)", count: 15, manufacturer: "Boeing" },
      { model: "Eurofighter ECR (SEAD)", count: 20, manufacturer: "Eurofighter / Airbus" },
    ],
    helicopters: [
      { model: "Tiger HAD Attack", count: 40, manufacturer: "Airbus Helicopters" },
      { model: "NH90 TTH (army transport)", count: 82, manufacturer: "NHIndustries / Airbus" },
      { model: "NH90 NTH (naval Sea Lion)", count: 18, manufacturer: "NHIndustries / Airbus" },
      { model: "H145M (light utility)", count: 15, manufacturer: "Airbus Helicopters" },
      { model: "CH-53G/GS/GA Sea Stallion", count: 65, manufacturer: "Sikorsky / VFW" },
    ],
    drones: [
      { model: "Heron 1 MALE (leased)", count: 7, manufacturer: "IAI (Israel)" },
      { model: "Luna NG tactical UAS", count: 36, manufacturer: "EMT Penzberg" },
      { model: "KZO battlefield UAS", count: 40, manufacturer: "Rheinmetall / Diehl" },
    ],
    land_vehicles: [
      { model: "Leopard 2A6 / 2A7 MBT", count: 321, manufacturer: "Krauss-Maffei Wegmann" },
      { model: "Puma IFV", count: 350, manufacturer: "PSM (KMW / Rheinmetall)" },
      { model: "Marder 1A3/1A5 IFV", count: 350, manufacturer: "Rheinmetall Landsysteme" },
      { model: "Boxer 8×8 MRAV", count: 272, manufacturer: "ARTEC (KMW / Rheinmetall)" },
      { model: "GTK Boxer troop carrier", count: 400, manufacturer: "ARTEC" },
      { model: "Fuchs 1 / 2 APC", count: 1000, manufacturer: "Rheinmetall Landsysteme" },
    ],
    surface_combatants: [
      { model: "Brandenburg-class F123 FFG", count: 4, manufacturer: "Blohm+Voss / HDW" },
      { model: "Sachsen-class F124 FFG", count: 3, manufacturer: "ARGE F124 / Blohm+Voss" },
      { model: "Braunschweig-class K130 corvette", count: 5, manufacturer: "ARGE K130 consortium" },
    ],
    submarines: [
      { model: "Type 212A SSK", count: 6, manufacturer: "TKMS / Howaldtswerke-Deutsche Werft" },
    ],
  },
  FR: {
    fighters: [
      { model: "Rafale F3-R (Air Force)", count: 102, manufacturer: "Dassault Aviation" },
      { model: "Rafale M (Navy carrier)", count: 83, manufacturer: "Dassault Aviation" },
      { model: "Mirage 2000-5F / 2000D", count: 43, manufacturer: "Dassault Aviation" },
    ],
    helicopters: [
      { model: "Tiger HAP / HCP Attack", count: 67, manufacturer: "Airbus Helicopters" },
      { model: "NH90 TTH (army transport)", count: 56, manufacturer: "NHIndustries / Airbus" },
      { model: "AS 532 Cougar (army)", count: 26, manufacturer: "Airbus Helicopters" },
      { model: "EC725 Caracal (CSAR/special ops)", count: 27, manufacturer: "Airbus Helicopters" },
      { model: "SA 341/342 Gazelle (recon / anti-tank)", count: 130, manufacturer: "Airbus Helicopters" },
      { model: "NH90 NFH (naval Caïman)", count: 27, manufacturer: "NHIndustries / Airbus" },
      { model: "Lynx Mk.4 (naval, retiring)", count: 20, manufacturer: "Westland / Leonardo" },
    ],
    drones: [
      { model: "MQ-9A Reaper MALE", count: 12, manufacturer: "General Atomics" },
      { model: "Patroller MALE (Safran)", count: 6, manufacturer: "Safran Electronics & Defense" },
      { model: "Sperwer / Harfang tactical", count: 12, manufacturer: "Sagem / EADS" },
      { model: "Harmattan Combat UAS", count: 8, manufacturer: "Dassault / Safran" },
    ],
    land_vehicles: [
      { model: "Leclerc MBT", count: 222, manufacturer: "Nexter Systems (KNDS)" },
      { model: "VBCI IFV 8×8", count: 630, manufacturer: "Nexter Systems / Thales" },
      { model: "Griffon VBMR 6×6 APC", count: 600, manufacturer: "Nexter / Thales / Arquus" },
      { model: "Jaguar EBRC 6×6 (recon)", count: 54, manufacturer: "Nexter / Thales / Arquus" },
      { model: "AMX-10RC (wheeled fire support)", count: 170, manufacturer: "Nexter Systems" },
      { model: "VAB APC (variants)", count: 2000, manufacturer: "Arquus (Renault Trucks Defense)" },
    ],
    surface_combatants: [
      { model: "FREMM Aquitaine-class FFG", count: 8, manufacturer: "Naval Group" },
      { model: "La Fayette-class FLF corvette", count: 5, manufacturer: "Naval Group" },
      { model: "D'Estienne d'Orves corvette (A69)", count: 8, manufacturer: "Naval Group" },
      { model: "Forbin-class Horizon DDG", count: 2, manufacturer: "Naval Group / Orizzonte" },
      { model: "Charles de Gaulle CVN", count: 1, manufacturer: "Naval Group / Cherbourg Arsenal" },
    ],
    submarines: [
      { model: "Triomphant-class SSBN", count: 4, manufacturer: "Naval Group / Cherbourg" },
      { model: "Barracuda-class SSN (Suffren)", count: 3, manufacturer: "Naval Group" },
      { model: "Rubis-class SSN", count: 3, manufacturer: "Naval Group" },
    ],
  },
  JP: {
    fighters: [
      { model: "F-15J/DJ Eagle", count: 166, manufacturer: "McDonnell Douglas / Mitsubishi HI" },
      { model: "F-2 Viper Zero", count: 92, manufacturer: "Mitsubishi HI / Lockheed Martin" },
      { model: "F-35A Lightning II", count: 42, manufacturer: "Lockheed Martin / Mitsubishi HI" },
      { model: "F-35B (STOVL)", count: 20, manufacturer: "Lockheed Martin / Mitsubishi HI" },
      { model: "T-4 (OCU / trainer)", count: 34, manufacturer: "Kawasaki Heavy Industries" },
    ],
    helicopters: [
      { model: "AH-64D Apache (JGSDF)", count: 13, manufacturer: "Boeing / Fuji Heavy Industries" },
      { model: "OH-1 Ninja (armed scout)", count: 38, manufacturer: "Kawasaki Heavy Industries" },
      { model: "CH-47JA Chinook", count: 53, manufacturer: "Boeing / Kawasaki" },
      { model: "UH-60JA Black Hawk", count: 40, manufacturer: "Sikorsky / Mitsubishi HI" },
      { model: "SH-60J/K Seahawk (naval ASW)", count: 100, manufacturer: "Sikorsky / Mitsubishi HI" },
      { model: "MCH-101 Merlin (MCM/transport)", count: 14, manufacturer: "Leonardo / Kawasaki" },
      { model: "UH-1J Iroquois", count: 130, manufacturer: "Bell / Fuji Heavy Industries" },
    ],
    drones: [
      { model: "RQ-4B Global Hawk", count: 3, manufacturer: "Northrop Grumman" },
      { model: "MQ-9B Reaper (on order)", count: 3, manufacturer: "General Atomics" },
      { model: "FFR-4 reconnaissance UAS (naval)", count: 10, manufacturer: "Mitsubishi HI / Fuji" },
    ],
    land_vehicles: [
      { model: "Type 74 MBT (reserve)", count: 450, manufacturer: "Mitsubishi Heavy Industries" },
      { model: "Type 90 MBT", count: 340, manufacturer: "Mitsubishi Heavy Industries" },
      { model: "Type 10 MBT", count: 130, manufacturer: "Mitsubishi Heavy Industries" },
      { model: "Type 89 IFV", count: 68, manufacturer: "Mitsubishi Heavy Industries" },
      { model: "Type 96 APC", count: 340, manufacturer: "Mitsubishi Heavy Industries" },
      { model: "Type 73 APC", count: 340, manufacturer: "Mitsubishi Heavy Industries" },
    ],
    surface_combatants: [
      { model: "Murasame-class DD", count: 9, manufacturer: "IHI / Mitsubishi HI" },
      { model: "Akizuki / Asahi-class DD", count: 8, manufacturer: "Mitsubishi HI / Japan Marine United" },
      { model: "Takanami-class DD", count: 5, manufacturer: "IHI Corporation" },
      { model: "Kongō-class DDG (Aegis)", count: 4, manufacturer: "Mitsubishi Heavy Industries" },
      { model: "Atago-class DDG (Aegis)", count: 2, manufacturer: "Mitsubishi Heavy Industries" },
      { model: "Maya-class DDG (Aegis)", count: 2, manufacturer: "Mitsubishi Heavy Industries" },
      { model: "Izumo-class DDH / CVL", count: 2, manufacturer: "IHI Marine United" },
      { model: "Hyuga-class DDH", count: 2, manufacturer: "IHI Corporation" },
    ],
    submarines: [
      { model: "Oyashio-class SSK", count: 8, manufacturer: "Mitsubishi HI / Kawasaki" },
      { model: "Sōryū-class SSK", count: 11, manufacturer: "Mitsubishi HI / Kawasaki" },
      { model: "Taigei-class SSK", count: 3, manufacturer: "Mitsubishi HI / Kawasaki" },
    ],
  },
  KR: {
    fighters: [
      { model: "F-16C/D Fighting Falcon (KF-16)", count: 170, manufacturer: "Lockheed Martin / KAI" },
      { model: "T-50 Golden Eagle / FA-50", count: 128, manufacturer: "Korea Aerospace Industries" },
      { model: "F-15K Slam Eagle", count: 60, manufacturer: "Boeing / Samsung Techwin" },
      { model: "F-35A Lightning II", count: 40, manufacturer: "Lockheed Martin" },
      { model: "KF-21 Boramae (initial batch)", count: 8, manufacturer: "Korea Aerospace Industries" },
    ],
    helicopters: [
      { model: "AH-64E Apache Guardian", count: 36, manufacturer: "Boeing / Korean Air" },
      { model: "UH-60P Black Hawk", count: 180, manufacturer: "Sikorsky / Korean Air" },
      { model: "Surion KUH-1 (utility)", count: 220, manufacturer: "Korea Aerospace Industries" },
      { model: "LAH (Light Armed Helicopter)", count: 40, manufacturer: "Korea Aerospace Industries" },
      { model: "CH-47D Chinook", count: 30, manufacturer: "Boeing" },
      { model: "AH-1S Cobra (reserve)", count: 70, manufacturer: "Bell Helicopter" },
    ],
    drones: [
      { model: "RQ-4 Global Hawk", count: 4, manufacturer: "Northrop Grumman" },
      { model: "Heron TP MALE", count: 4, manufacturer: "IAI (Israel)" },
      { model: "KUS-FS MALE (domestic)", count: 4, manufacturer: "Korea Aerospace Industries" },
    ],
    land_vehicles: [
      { model: "K1E1 / K1A2 MBT", count: 1000, manufacturer: "Hyundai Rotem" },
      { model: "K1E2 MBT", count: 900, manufacturer: "Hyundai Rotem" },
      { model: "K2 Black Panther MBT", count: 260, manufacturer: "Hyundai Rotem" },
      { model: "T-80U MBT (reserve)", count: 42, manufacturer: "Uralvagonzavod (Russia)" },
      { model: "K21 IFV", count: 900, manufacturer: "Hanwha Defense" },
      { model: "AS21 Redback IFV (on order)", count: 100, manufacturer: "Hanwha Defense" },
      { model: "K200 KAAV APC", count: 2400, manufacturer: "Hanwha Defense" },
    ],
    surface_combatants: [
      { model: "FFX Incheon-class FFG", count: 8, manufacturer: "Hyundai Heavy Industries / Daewoo" },
      { model: "KDX-II Chungmugong Yi Sun-sin DDG", count: 6, manufacturer: "Daewoo / Hyundai" },
      { model: "KDX-III Sejong the Great DDG (Aegis)", count: 3, manufacturer: "Hyundai Heavy Industries" },
      { model: "KDX-I Gwanggaeto the Great DDG", count: 3, manufacturer: "Daewoo Shipbuilding" },
      { model: "Pohang-class corvette", count: 8, manufacturer: "Korea Tacoma Marine" },
    ],
    submarines: [
      { model: "Jangbogo-I (Type 209/1200) SSK", count: 10, manufacturer: "HDW / Daewoo" },
      { model: "Jangbogo-II (Type 214) SSK", count: 9, manufacturer: "HDW / DSME" },
      { model: "Jangbogo-III (KSS-III) SSK", count: 3, manufacturer: "Daewoo Shipbuilding (DSME)" },
    ],
  },
};

// Wikipedia article title overrides for capability breakdown platforms.
// Keys match the "model" strings in CAPABILITY_DETAILS exactly.
const PLATFORM_WIKI_TITLES = {
  // ── Fighters / Bombers ───────────────────────────────────────────────────
  "F-35A/B/C Lightning II":             "Lockheed Martin F-35 Lightning II",
  "F-35A Lightning II":                 "Lockheed Martin F-35 Lightning II",
  "F-35B Lightning II":                 "Lockheed Martin F-35 Lightning II",
  "F-35B (STOVL)":                      "Lockheed Martin F-35 Lightning II",
  "F-22A Raptor":                       "Lockheed Martin F-22 Raptor",
  "F-15C/D/E Strike Eagle":             "McDonnell Douglas F-15 Eagle",
  "F-15C/D Eagle":                      "McDonnell Douglas F-15 Eagle",
  "F-15J/DJ Eagle":                     "McDonnell Douglas F-15 Eagle",
  "F-15K Slam Eagle":                   "McDonnell Douglas F-15 Eagle",
  "F-15SA Strike Eagle":                "McDonnell Douglas F-15 Eagle",
  "F-16C/D Fighting Falcon":            "General Dynamics F-16 Fighting Falcon",
  "F-16C/D Fighting Falcon (KF-16)":   "General Dynamics F-16 Fighting Falcon",
  "F-2 Viper Zero":                     "Mitsubishi F-2",
  "F/A-18E/F/G Super Hornet / Growler": "Boeing F/A-18E/F Super Hornet",
  "F/A-18F Super Hornet (nuclear role)":"Boeing F/A-18E/F Super Hornet",
  "Typhoon":                            "Eurofighter Typhoon",
  "Typhoon FGR4 / F2":                  "Eurofighter Typhoon",
  "Eurofighter ECR (SEAD)":             "Eurofighter Typhoon",
  "Rafale":                             "Dassault Rafale",
  "Rafale F3-R (Air Force)":            "Dassault Rafale",
  "Rafale M (Navy carrier)":            "Dassault Rafale",
  "Mirage 2000-5F / 2000D":            "Dassault Mirage 2000",
  "Mirage 2000H/TH":                   "Dassault Mirage 2000",
  "Su-27 Flanker / Su-30SM":           "Sukhoi Su-27",
  "Su-27 / Su-30MKK":                  "Sukhoi Su-27",
  "Su-30MKI Flanker-H":                "Sukhoi Su-30",
  "Su-34 Fullback":                    "Sukhoi Su-34",
  "Su-35S Flanker-E":                  "Sukhoi Su-35",
  "Su-57 Felon (stealth)":             "Sukhoi Su-57",
  "Su-25 Frogfoot":                    "Sukhoi Su-25",
  "MiG-29 Fulcrum":                    "Mikoyan MiG-29",
  "MiG-29 / MiG-29UPG":               "Mikoyan MiG-29",
  "MiG-31 Foxhound":                   "Mikoyan MiG-31",
  "MiG-21 Bison (phasing out)":        "Mikoyan-Gurevich MiG-21",
  "J-20 Mighty Dragon (stealth)":      "Chengdu J-20",
  "J-16 Flanker-D variant":            "Shenyang J-16",
  "J-11/J-11B Flanker-L":              "Shenyang J-11",
  "J-10C Firebird":                    "Chengdu J-10",
  "J-7 / J-7A (legacy)":               "Chengdu J-7",
  "H-6K/N Badger (bomber)":            "Xian H-6",
  "KF-21 Boramae (initial batch)":     "KAI KF-21 Boramae",
  "T-50 Golden Eagle / FA-50":         "KAI T-50 Golden Eagle",
  "Tejas Mk.1A LCA":                   "HAL Tejas",
  "SEPECAT Jaguar IS/IB":              "SEPECAT Jaguar",
  "B-52H Stratofortress":              "Boeing B-52 Stratofortress",
  "B-2A Spirit":                       "Northrop Grumman B-2 Spirit",
  "B-1B Lancer":                       "Rockwell B-1 Lancer",
  "A-10C Thunderbolt II":              "Fairchild Republic A-10 Thunderbolt II",
  "Tornado IDS (retiring)":            "Panavia Tornado",
  "Tornado IDS/ADV":                   "Panavia Tornado",
  // ── Helicopters ─────────────────────────────────────────────────────────
  "AH-64D/E Apache":                   "Boeing AH-64 Apache",
  "AH-64D Apache":                     "Boeing AH-64 Apache",
  "AH-64D Apache (JGSDF)":             "Boeing AH-64 Apache",
  "AH-64E Apache Guardian":            "Boeing AH-64 Apache",
  "AH-1Z Viper":                       "Bell AH-1Z Viper",
  "AH-1S Cobra (reserve)":             "Bell AH-1 Cobra",
  "UH-60 Black Hawk (all variants)":   "Sikorsky UH-60 Black Hawk",
  "UH-60 Black Hawk":                  "Sikorsky UH-60 Black Hawk",
  "UH-60JA Black Hawk":                "Sikorsky UH-60 Black Hawk",
  "UH-60P Black Hawk":                 "Sikorsky UH-60 Black Hawk",
  "MH-60R/S Seahawk":                  "Sikorsky SH-60 Seahawk",
  "SH-60J/K Seahawk (naval ASW)":      "Sikorsky SH-60 Seahawk",
  "CH-47F Chinook":                    "Boeing CH-47 Chinook",
  "CH-47D Chinook":                    "Boeing CH-47 Chinook",
  "CH-47JA Chinook":                   "Boeing CH-47 Chinook",
  "Chinook HC6/6A":                    "Boeing CH-47 Chinook",
  "CH-53E/K Super Stallion":           "Sikorsky CH-53 Sea Stallion",
  "CH-53G/GS/GA Sea Stallion":         "Sikorsky CH-53 Sea Stallion",
  "NH90 NFH (naval Caïman)":           "NHIndustries NH90",
  "NH90 NTH (naval Sea Lion)":         "NHIndustries NH90",
  "NH90 TTH (army transport)":         "NHIndustries NH90",
  "Tiger HAD Attack":                  "Eurocopter Tiger",
  "Tiger HAP / HCP Attack":            "Eurocopter Tiger",
  "EC725 Caracal (CSAR/special ops)":  "Airbus Helicopters H225M",
  "AS-532 Cougar":                     "Airbus Helicopters H215",
  "SA 341/342 Gazelle (recon / anti-tank)": "Aérospatiale Gazelle",
  "Mi-8/Mi-17 Hip (transport)":        "Mil Mi-8",
  "Mi-17 / Mi-17V5 Hip":              "Mil Mi-8",
  "Mi-17 / Mi-171 Hip":               "Mil Mi-8",
  "Mi-24 Hind / Mi-35 Attack":         "Mil Mi-24",
  "Mi-35 Hind Attack":                 "Mil Mi-24",
  "Mi-28N Night Hunter Attack":        "Mil Mi-28",
  "Ka-52 Alligator Attack":            "Kamov Ka-52",
  "Ka-27 / Ka-29 Naval":               "Kamov Ka-27",
  "Mi-26 Heavy Lift":                  "Mil Mi-26",
  "Z-10 Attack":                       "CAIC Z-10",
  "Z-19 Scout / Attack":               "Harbin Z-19",
  "Z-20 (Black Hawk equivalent)":      "Harbin Z-20",
  "Z-9 / Z-9W (Dauphin-derived)":     "Harbin Z-9",
  "Z-8 / Z-18 Heavy Transport":        "Changhe Z-8",
  "Dhruv ALH (all variants)":          "HAL Dhruv",
  "Merlin HM2 / HC4 (naval & support)":"AgustaWestland AW101",
  "MCH-101 Merlin (MCM/transport)":    "AgustaWestland AW101",
  "Wildcat AH1 / HMA2":                "AgustaWestland AW159",
  "Puma HC2":                          "Aérospatiale SA 330 Puma",
  "Surion KUH-1 (utility)":            "KAI KUH-1 Surion",
  "LAH (Light Armed Helicopter)":      "Korea Aerospace Industries LAH",
  "UH-1Y Venom":                       "Bell UH-1Y Venom",
  "OH-58D Kiowa Warrior":              "Bell OH-58 Kiowa",
  "OH-1 Ninja (armed scout)":          "Kawasaki OH-1",
  // ── Drones ──────────────────────────────────────────────────────────────
  "MQ-9A/B Reaper":                    "General Atomics MQ-9 Reaper",
  "MQ-9A Reaper":                      "General Atomics MQ-9 Reaper",
  "MQ-9A Reaper MALE":                 "General Atomics MQ-9 Reaper",
  "MQ-9B Reaper (on order)":           "General Atomics MQ-9 Reaper",
  "MQ-9B Sea Guardian / Sky Guardian": "General Atomics MQ-9 Reaper",
  "MQ-1C Gray Eagle":                  "General Atomics MQ-1C Gray Eagle",
  "MQ-25 Stingray (carrier UAV)":      "Boeing MQ-25 Stingray",
  "RQ-4 Global Hawk / Triton":         "Northrop Grumman RQ-4 Global Hawk",
  "RQ-4 Global Hawk":                  "Northrop Grumman RQ-4 Global Hawk",
  "RQ-4B Global Hawk":                 "Northrop Grumman RQ-4 Global Hawk",
  "RQ-7B Shadow":                      "AAI RQ-7 Shadow",
  "Wing Loong II MALE":                "CAIG Wing Loong II",
  "Wing Loong I/II MALE":              "CAIG Wing Loong II",
  "CH-4 / CH-5 Rainbow MALE":          "CASC CH-4 Rainbow",
  "CH-4 Rainbow MALE":                 "CASC CH-4 Rainbow",
  "Heron I / Heron TP MALE":           "IAI Heron",
  "Heron 1 MALE (leased)":             "IAI Heron",
  "Heron TP MALE":                     "IAI Heron TP",
  "Watchkeeper WK450 tactical":        "Watchkeeper WK450",
  "Protector RG Mk.1 (MQ-9B)":        "General Atomics MQ-9 Reaper",
  "Patroller MALE (Safran)":           "Safran Patroller",
  "Harmattan Combat UAS":              "Dassault nEUROn",
  // ── Land – MBT ──────────────────────────────────────────────────────────
  "M1A2 SEP v3 Abrams MBT":           "M1 Abrams",
  "M1A1 Abrams MBT":                  "M1 Abrams",
  "M1A2S Abrams MBT":                 "M1 Abrams",
  "Leclerc MBT":                      "AMX-56 Leclerc",
  "Leopard 2A6 / 2A7 MBT":            "Leopard 2",
  "Challenger 2 MBT":                 "Challenger 2",
  "Type 10 MBT":                      "Type 10 tank",
  "Type 90 MBT":                      "Type 90 tank",
  "Type 74 MBT (reserve)":            "Type 74 tank",
  "K2 Black Panther MBT":             "K2 Black Panther",
  "K1E1 / K1A2 MBT":                  "K1 88-Tank",
  "K1E2 MBT":                         "K1 88-Tank",
  "T-90S Bhishma MBT":                "T-90",
  "T-72M1 Ajeya MBT":                 "T-72",
  "T-72B3 / T-72B3M MBT":             "T-72",
  "T-80BV / T-80U MBT":               "T-80",
  "T-80U MBT (reserve)":              "T-80",
  "T-90A / T-90M Proryv MBT":         "T-90",
  "T-14 Armata MBT (limited)":        "T-14 Armata",
  "T-59 MBT (reserve)":               "Type 59 tank",
  "Type 59 MBT (reserve)":            "Type 59 tank",
  "Type 88 MBT":                      "Type 88 tank (China)",
  "Type 96A/B MBT":                   "Type 96 tank",
  "Type 99A MBT":                     "Type 99 tank",
  "Arjun Mk.1A MBT":                  "Arjun (tank)",
  "M60A3 MBT (reserve)":              "M60 Patton",
  "AMX-30 MBT (reserve)":             "AMX-30",
  // ── Land – IFV / APC ────────────────────────────────────────────────────
  "M2A3 Bradley IFV":                 "M2 Bradley",
  "M2A2 Bradley IFV":                 "M2 Bradley",
  "Puma IFV":                         "Puma (IFV)",
  "Marder 1A3/1A5 IFV":               "Marder (IFV)",
  "Boxer 8×8 MRAV":                   "Boxer (armoured fighting vehicle)",
  "GTK Boxer troop carrier":          "Boxer (armoured fighting vehicle)",
  "VBCI IFV 8×8":                     "VBCI",
  "Griffon VBMR 6×6 APC":             "Griffon (vehicle)",
  "Jaguar EBRC 6×6 (recon)":          "Jaguar EBRC",
  "AMX-10RC (wheeled fire support)":  "AMX-10 RC",
  "K21 IFV":                          "K21 infantry fighting vehicle",
  "K200 KAAV APC":                    "K200 APC",
  "AS21 Redback IFV (on order)":      "AS21 Redback",
  "BMP-2 IFV":                        "BMP-2",
  "BMP-2 Sarath IFV":                 "BMP-2",
  "BMP-3 IFV":                        "BMP-3",
  "ZBD-04A IFV":                      "ZBD-04",
  "ZBL-09 Snow Leopard 8×8 APC":      "ZBL-09",
  "Type 89 IFV":                      "Type 89 IFV",
  "Type 73 APC":                      "Type 73 armored personnel carrier",
  "M113 APC (variants)":              "M113 armored personnel carrier",
  "M113A1/A3 APC":                    "M113 armored personnel carrier",
  "BTR-80/82A APC":                   "BTR-80",
  "Stryker 8×8 (variants)":           "Stryker",
  "Warrior IFV":                      "Warrior IFV",
  "Ajax IFV/scout (FRES)":            "Ajax (armoured fighting vehicle)",
  "FV430 Bulldog APC":                "FV430",
  "VAB APC (variants)":               "VAB armoured vehicle",
  "JLTV (Joint Light Tactical)":      "Joint Light Tactical Vehicle",
  "HMMWV (Humvee, variants)":         "Humvee",
  // ── Naval – Surface ─────────────────────────────────────────────────────
  "Arleigh Burke-class DDG":          "Arleigh Burke-class destroyer",
  "Ticonderoga-class CG":             "Ticonderoga-class cruiser",
  "Freedom / Independence-class LCS": "Littoral combat ship",
  "Type 45 Daring-class DDG":         "Type 45 destroyer",
  "Type 23 Duke-class FFG":           "Type 23 frigate",
  "Queen Elizabeth-class CVF":        "Queen Elizabeth-class aircraft carrier",
  "Charles de Gaulle CVN":            "French aircraft carrier Charles de Gaulle",
  "FREMM Aquitaine-class FFG":        "FREMM multipurpose frigate",
  "Forbin-class Horizon DDG":         "Horizon-class frigate",
  "La Fayette-class FLF corvette":    "La Fayette-class frigate",
  "D'Estienne d'Orves corvette (A69)":"D'Estienne d'Orves-class aviso",
  "Type 052D Luyang III DDG":         "Type 052D destroyer",
  "Type 055 Renhai-class CG":         "Type 055 destroyer",
  "Type 054A Jiangkai II FFG":        "Type 054A frigate",
  "Sachsen-class F124 FFG":           "Sachsen-class frigate",
  "Brandenburg-class F123 FFG":       "Brandenburg-class frigate",
  "Braunschweig-class K130 corvette": "Braunschweig-class corvette",
  "Kongō-class DDG (Aegis)":          "Kongō-class destroyer",
  "Atago-class DDG (Aegis)":          "Atago-class destroyer",
  "Maya-class DDG (Aegis)":           "Maya-class destroyer",
  "Akizuki / Asahi-class DD":         "Akizuki-class destroyer",
  "Murasame-class DD":                "Murasame-class destroyer",
  "Hyuga-class DDH":                  "Hyūga-class helicopter destroyer",
  "Izumo-class DDH / CVL":            "Izumo-class helicopter destroyer",
  "FFX Incheon-class FFG":            "Incheon-class frigate",
  "KDX-III Sejong the Great DDG (Aegis)": "Sejong the Great-class destroyer",
  "KDX-II Chungmugong Yi Sun-sin DDG": "Chungmugong Yi Sun-sin-class destroyer",
  "KDX-I Gwanggaeto the Great DDG":   "Gwanggaeto the Great-class destroyer",
  "Delhi-class DDG":                  "Delhi-class destroyer",
  "Kolkata-class DDG":                "Kolkata-class destroyer",
  "Shivalik-class FFG":               "Shivalik-class frigate",
  "Brahmaputra-class FFG":            "Brahmaputra-class frigate",
  "Kamorta-class corvette (ASW)":     "Kamorta-class corvette",
  // ── Naval – Submarines ──────────────────────────────────────────────────
  "Virginia-class SSN":               "Virginia-class submarine",
  "Ohio-class SSBN / SSGN":           "Ohio-class submarine",
  "Los Angeles-class SSN":            "Los Angeles-class submarine",
  "Astute-class SSN":                 "Astute-class submarine",
  "Vanguard-class SSBN":              "Vanguard-class submarine",
  "Trafalgar-class SSN":              "Trafalgar-class submarine",
  "Barracuda-class SSN (Suffren)":    "Suffren-class submarine",
  "Triomphant-class SSBN":            "Le Triomphant-class submarine",
  "Rubis-class SSN":                  "Rubis-class submarine",
  "Borei-class SSBN (Pr.955)":        "Borei-class submarine",
  "Borei-A SSBN (Pr.955A)":           "Borei-class submarine",
  "Yasen SSN (Pr.885/885M)":          "Yasen-class submarine",
  "Akula SSN (Pr.971)":               "Akula-class submarine",
  "Kilo / Improved Kilo SSK":         "Kilo-class submarine",
  "Varshavyanka SSK (Pr.636.3)":      "Kilo-class submarine",
  "Oscar II SSGN (Pr.949A)":          "Oscar-class submarine",
  "Delta IV SSBN (Pr.667BDRM)":       "Delta-class submarine",
  "Type 094 Jin-class SSBN":          "Type 094 submarine",
  "Type 093 Shang-class SSN":         "Type 093 submarine",
  "Type 039/A/B Yuan-class SSK":      "Type 039 submarine",
  "Type 041 Yuan-class SSK":          "Type 039 submarine",
  "Type 035 Ming-class SSK":          "Type 035 submarine",
  "Type 091 Han-class SSN":           "Type 091 submarine",
  "Sōryū-class SSK":                  "Sōryū-class submarine",
  "Taigei-class SSK":                 "Taigei-class submarine",
  "Oyashio-class SSK":                "Oyashio-class submarine",
  "Jangbogo-I (Type 209/1200) SSK":   "Type 209 submarine",
  "Jangbogo-II (Type 214) SSK":       "Type 214 submarine",
  "Jangbogo-III (KSS-III) SSK":       "KSS-III submarine",
  "Kalvari-class SSK (Scorpène)":     "Scorpène-class submarine",
  "Sindhughosh-class SSK (Kilo)":     "Kilo-class submarine",
  "Shishumar-class SSK (Type 209)":   "Type 209 submarine",
  "Arihant-class SSBN":               "Arihant-class submarine",
  "Type 212A SSK":                    "Type 212 submarine",
};

function useCountUp(target, duration = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!target) { setValue(0); return; }
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);
  return value;
}

function CapabilityTile({ cat, count, rank, maxCount, onClick, isSelected, isClickable }) {
  const animated = useCountUp(count);
  const pct = maxCount > 0 && count > 0 ? Math.min((count / maxCount) * 100, 100) : 0;

  return (
    <div
      className={`rounded-xl overflow-hidden border bg-white shadow-sm transition-all ${
        isClickable ? "cursor-pointer hover:shadow-md hover:border-slate-300" : ""
      } ${isSelected ? "border-slate-400 ring-2 ring-slate-200 ring-offset-1" : cat.border}`}
      onClick={isClickable ? onClick : undefined}
    >
      {/* Light header */}
      <div className={`${cat.bg} border-b ${cat.border} px-3 py-2.5 flex items-center justify-between gap-2`}>
        <div className="flex items-center gap-2 min-w-0">
          <span className={`shrink-0 p-1.5 rounded-lg ${cat.iconBadgeBg}`}>
            <cat.Icon className={`w-4 h-4 ${cat.iconColor}`} />
          </span>
          <div className="min-w-0">
            <p className={`text-xs font-bold ${cat.labelColor} leading-tight truncate`}>{cat.label}</p>
            <p className="text-[10px] text-slate-400 leading-tight truncate">{cat.sublabel}</p>
          </div>
        </div>
        {rank > 0 && count > 0 && (
          <span className={`shrink-0 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md border ${
            rank === 1 ? "bg-amber-50 text-amber-700 border-amber-200" :
            rank <= 3 ? "bg-slate-100 text-slate-600 border-slate-200" :
            "bg-white text-slate-400 border-slate-200"
          }`}>
            #{rank}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="bg-white p-3 flex flex-col gap-2">
        <p className={`text-3xl font-mono font-bold ${cat.countColor} tabular-nums leading-none`}>
          {count === 0 ? "—" : animated.toLocaleString()}
        </p>

        {count === 0 && (
          <p className="text-[10px] text-slate-400">No data / not applicable</p>
        )}

        {/* Progress bar vs world leader */}
        {count > 0 && (
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${cat.progressColor} transition-all duration-700`}
              style={{ width: `${pct}%` }}
            />
          </div>
        )}

        {count > 0 && (
          <p className="text-[10px] text-slate-400">
            vs world leader ({Math.round(pct)}%)
          </p>
        )}

        {isClickable && count > 0 && !isSelected && (
          <p className={`text-[10px] ${cat.labelColor} font-medium mt-0.5 flex items-center gap-1`}>
            <span>↗</span> View breakdown
          </p>
        )}
        {isSelected && (
          <p className={`text-[10px] ${cat.labelColor} font-semibold mt-0.5`}>
            ▾ Details shown below
          </p>
        )}
      </div>
    </div>
  );
}

function PlatformCard({ item, cat, imgSrc, onImgError, maxCount }) {
  const barPct = maxCount > 0 ? Math.round((item.count / maxCount) * 100) : 0;
  const primaryMfr = item.manufacturer.split(' / ')[0].split(' (')[0];

  return (
    <div className="bg-white border border-slate-100 rounded-xl overflow-hidden hover:border-slate-300 hover:shadow-lg transition-all duration-200 group flex flex-col">
      {/* Image */}
      <div className={`h-32 ${cat.bg} relative overflow-hidden shrink-0`}>
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={item.model}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={onImgError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <cat.Icon className={`w-14 h-14 ${cat.iconColor} opacity-15`} />
          </div>
        )}
        {/* Count badge overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
          <span className={`font-mono font-bold text-lg text-white tabular-nums`}>
            {item.count.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <p className="text-xs font-semibold text-slate-800 leading-snug line-clamp-2">{item.model}</p>

        {/* Bar */}
        <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${cat.progressColor} transition-all duration-700`}
            style={{ width: `${barPct}%` }}
          />
        </div>

        <p className="text-[10px] text-slate-400 truncate mt-0.5">{primaryMfr}</p>

        <a
          href={`/products?manufacturer=${encodeURIComponent(primaryMfr)}`}
          className={`mt-auto inline-flex items-center gap-1 text-[10px] font-semibold ${cat.labelColor} hover:underline`}
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="w-2.5 h-2.5" />
          Browse Products
        </a>
      </div>
    </div>
  );
}

function CapabilityDetailPanel({ cat, countryCode, onClose }) {
  const details = useMemo(
    () => CAPABILITY_DETAILS[countryCode]?.[cat.key] || [],
    [countryCode, cat.key]
  );
  const total = details.reduce((s, d) => s + d.count, 0);
  const maxCount = details.length > 0 ? Math.max(...details.map(d => d.count)) : 0;

  const [platformImages, setPlatformImages] = useState({});
  const [imgErrors, setImgErrors] = useState({});
  const fetchedRef = useRef(new Set());

  const fetchWikiImage = useCallback(async (model) => {
    if (fetchedRef.current.has(model)) return;
    fetchedRef.current.add(model);
    const wikiTitle = PLATFORM_WIKI_TITLES[model] || model;
    const title = wikiTitle.replace(/ /g, '_');
    try {
      const r = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=400&origin=*`
      );
      if (r.ok) {
        const d = await r.json();
        const pages = d.query?.pages;
        const src = pages && Object.values(pages)[0]?.thumbnail?.source;
        if (src) setPlatformImages(prev => ({ ...prev, [model]: src }));
      }
    } catch (_) {}
  }, []);

  useEffect(() => {
    fetchedRef.current = new Set();
    const BATCH = 6;
    const DELAY = 200;
    const timeouts = [];
    details.forEach((item, i) => {
      const delay = Math.floor(i / BATCH) * DELAY;
      if (delay === 0) fetchWikiImage(item.model);
      else timeouts.push(setTimeout(() => fetchWikiImage(item.model), delay));
    });
    return () => timeouts.forEach(clearTimeout);
  }, [details, fetchWikiImage]);

  if (!details.length) return null;

  return (
    <div className={`rounded-xl border ${cat.border} bg-slate-50/50 shadow-sm overflow-hidden`}>
      {/* Light header */}
      <div className={`${cat.bg} border-b ${cat.border} px-4 py-3 flex items-center justify-between gap-3`}>
        <div className="flex items-center gap-2.5">
          <span className={`shrink-0 p-1.5 rounded-lg ${cat.iconBadgeBg}`}>
            <cat.Icon className={`w-4 h-4 ${cat.iconColor}`} />
          </span>
          <div>
            <p className={`text-sm font-bold ${cat.labelColor}`}>{cat.label} — Equipment Breakdown</p>
            <p className="text-[10px] text-slate-500">
              {cat.sublabel} · <span className="font-semibold">{total.toLocaleString()}</span> total · IISS Military Balance 2024
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-700 transition-colors w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/70"
          aria-label="Close"
        >
          ×
        </button>
      </div>

      {/* Card grid */}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {details.map((item, i) => (
          <PlatformCard
            key={i}
            item={item}
            cat={cat}
            maxCount={maxCount}
            imgSrc={!imgErrors[item.model] ? platformImages[item.model] : undefined}
            onImgError={() => setImgErrors(prev => ({ ...prev, [item.model]: true }))}
          />
        ))}
      </div>
    </div>
  );
}

function DefenseCapabilitiesCard({ countryCode }) {
  const cap = DEFENSE_CAPABILITIES[countryCode];
  const [openCat, setOpenCat] = useState(null);

  const hasDetails = !!CAPABILITY_DETAILS[countryCode];

  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-3 bg-slate-50/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-slate-600" />
            <CardTitle className="font-heading text-base text-slate-900">Military Capabilities</CardTitle>
          </div>
          <span className="text-[10px] text-slate-400 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
            IISS Military Balance 2024 · estimates
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {!cap ? (
          <div className="flex items-center justify-center py-8 text-slate-400 text-sm gap-2">
            <Target className="w-4 h-4" />
            No capability data available for this country.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {CAP_CATEGORIES.map((cat) => {
                const rank = CAP_RANKS[cat.key].indexOf(countryCode) + 1;
                const isClickable = hasDetails && (cap[cat.key] ?? 0) > 0;
                return (
                  <CapabilityTile
                    key={cat.key}
                    cat={cat}
                    count={cap[cat.key] ?? 0}
                    rank={rank > 0 ? rank : null}
                    maxCount={CAP_MAX[cat.key]}
                    isClickable={isClickable}
                    isSelected={openCat === cat.key}
                    onClick={() => setOpenCat(prev => prev === cat.key ? null : cat.key)}
                  />
                );
              })}
            </div>

            {openCat && hasDetails && (
              <CapabilityDetailPanel
                cat={CAP_CATEGORIES.find(c => c.key === openCat)}
                countryCode={countryCode}
                onClose={() => setOpenCat(null)}
              />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

function BranchCard({ branch, typePhoto, emblemUrl }) {
  const [photoError, setPhotoError] = useState(false);
  const [emblemError, setEmblemError] = useState(false);
  const icon = BRANCH_ICON[branch.type] || <Shield className="w-5 h-5" />;
  const bgGradient = BRANCH_BG_GRADIENT[branch.type] || "from-slate-700 to-slate-900";

  return (
    <a
      href={branch.website}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-xl border border-slate-100 hover:border-slate-300 hover:shadow-md transition-all bg-white overflow-hidden"
    >
      {/* Photo header area */}
      <div className="relative w-full h-16 overflow-hidden shrink-0">
        {typePhoto && !photoError ? (
          <img
            src={typePhoto}
            alt={branch.type}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setPhotoError(true)}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${bgGradient} flex items-center justify-center`}>
            <span className="text-white/20 scale-[4]">{icon}</span>
          </div>
        )}
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Official emblem / logo in bottom-left corner */}
        <div className="absolute bottom-2 left-2 w-8 h-8 rounded-lg bg-white/90 border border-white/30 flex items-center justify-center overflow-hidden shrink-0 shadow">
          {emblemUrl && !emblemError ? (
            <img
              src={emblemUrl}
              alt={branch.name}
              className="w-6 h-6 object-contain"
              onError={() => setEmblemError(true)}
            />
          ) : (
            <span className={`${(BRANCH_COLOR[branch.type] || "text-slate-600").split(" ").find(c => c.startsWith("text-")) || "text-slate-600"} scale-110`}>{icon}</span>
          )}
        </div>

        {/* External link icon in top-right */}
        <ExternalLink className="absolute top-2 right-2 w-3.5 h-3.5 text-white/40 group-hover:text-white/80 transition-colors" />
      </div>

      {/* Text area */}
      <div className="p-3 flex flex-col gap-1.5">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-slate-800 group-hover:text-slate-900 leading-tight transition-colors line-clamp-2">
            {branch.name}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">{branch.role}</p>
        </div>

        {branch.personnel > 0 && (
          <div className="flex items-center gap-1.5 pt-1.5 border-t border-slate-100">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-sm font-mono font-bold text-slate-700">
              {formatPersonnel(branch.personnel)}
            </span>
            <span className="text-[10px] text-slate-400">personnel</span>
          </div>
        )}
      </div>
    </a>
  );
}

// ── News card — uniform h-36 image area regardless of image presence ──────────
function NewsCard({ article }) {
  const [imgError, setImgError] = useState(false);
  const hasImage = !!article.image && !imgError;

  const fmtDate = (raw) => {
    if (!raw) return null;
    try {
      return new Date(raw).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    } catch { return null; }
  };

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-lg border border-slate-100 hover:border-slate-300 hover:shadow-md transition-all overflow-hidden bg-white"
    >
      {/* Fixed-height image zone — always h-36, always the same visual weight */}
      <div className="w-full h-36 overflow-hidden shrink-0 relative">
        {hasImage ? (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 flex flex-col items-center justify-center gap-2">
            <Newspaper className="w-7 h-7 text-slate-500" />
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center px-4 line-clamp-1">
              {article.source}
            </p>
          </div>
        )}
      </div>

      {/* Text content */}
      <div className="p-3 flex flex-col flex-1">
        <p className="text-sm font-semibold text-slate-800 group-hover:text-slate-900 line-clamp-2 leading-snug transition-colors">
          {article.title}
        </p>
        {article.description && (
          <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug">
            {article.description.replace(/<[^>]+>/g, "")}
          </p>
        )}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-[10px] text-slate-400 bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded truncate max-w-[140px]">
              {article.source}
            </span>
            {fmtDate(article.publishedAt) && (
              <span className="text-[10px] text-slate-300 shrink-0">· {fmtDate(article.publishedAt)}</span>
            )}
          </div>
          <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-slate-500 transition-colors shrink-0 ml-1" />
        </div>
      </div>
    </a>
  );
}

// ── Flag tick for the regional comparison bar chart ───────────────────────────
// SVG <image> is used (not foreignObject) for reliable rendering on all browsers including iOS Safari.
function CustomizedFlagTick({ x, y, payload }) {
  const code = COUNTRY_FLAGS[payload?.value] || payload?.value?.toLowerCase();
  if (!code) return null;
  return (
    <image
      href={`https://flagcdn.com/w40/${code}.png`}
      x={x - 22}
      y={y - 7}
      width={20}
      height={14}
      preserveAspectRatio="xMidYMid slice"
    />
  );
}

// ── Country Profile Section ──────────────────────────────────────────────────

function CountryProfileSection({ country, allExpenditures }) {
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [industryTab, setIndustryTab] = useState("national");
  const [showAllCompanies, setShowAllCompanies] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [bannerUrl, setBannerUrl] = useState(null);
  const branchTypePhotos = useBranchTypePhotos();
  const branchEmblems = useBranchEmblems(profile?.military_branches);

  // Fetch country profile from backend
  useEffect(() => {
    let cancelled = false;
    setLoadingProfile(true);
    setProfile(null);
    axios.get(`${API}/country-profile`, { params: { country_name: country.country } })
      .then(r => { if (!cancelled) setProfile(r.data); })
      .catch(() => { if (!cancelled) setProfile({ military_branches: [], contracts: [], companies: [], news: [] }); })
      .finally(() => { if (!cancelled) setLoadingProfile(false); });
    return () => { cancelled = true; };
  }, [country.country]);

  // Fetch banner image URL from Wikipedia API — returns a direct CDN URL, very reliable
  useEffect(() => {
    let cancelled = false;
    setBannerUrl(null);
    const article = getCountryWikiArticle(country.country);
    fetch(
      `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(article)}&pithumbsize=1280&format=json&origin=*`
    )
      .then(r => r.json())
      .then(data => {
        if (cancelled) return;
        const url = Object.values(data?.query?.pages || {})[0]?.thumbnail?.source;
        if (url) setBannerUrl(url);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [country.country]);

  // Build regional peers data for the comparison bar chart
  const regionalPeers = allExpenditures
    .filter(e => e.region === country.region)
    .sort((a, b) => b.expenditure - a.expenditure)
    .slice(0, 10);

  const getFlag = (code) => {
    const c = COUNTRY_FLAGS[code] || code.toLowerCase();
    return `https://flagcdn.com/w40/${c}.png`;
  };

  return (
    <div className="space-y-5">
      {/* Hero banner */}
      <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-md">
        {bannerUrl ? (
          <img
            src={bannerUrl}
            alt={`${country.country} military`}
            className="w-full h-full object-cover"
            onError={() => setBannerUrl(null)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-slate-800 to-slate-700" />
        )}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        {/* Content over image */}
        <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
          <div className="flex items-center gap-3">
            <img
              src={getFlag(country.country_code)}
              alt={country.country}
              className="w-12 h-8 object-cover rounded shadow-lg border-2 border-white/30"
            />
            <div>
              <h2 className="font-heading text-2xl font-bold text-white tracking-tight drop-shadow">
                {country.country}
              </h2>
              <p className="text-sm text-white/70">{country.region} · Defense Profile</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-right">
            <div>
              <p className="text-xl font-mono font-bold text-white">${country.expenditure}B</p>
              <p className="text-xs text-white/60">Defense budget</p>
            </div>
            <div>
              <p className={`text-xl font-mono font-bold ${country.gdp_percent >= 2 ? "text-emerald-300" : "text-amber-300"}`}>
                {country.gdp_percent}%
              </p>
              <p className="text-xs text-white/60">of GDP</p>
            </div>
          </div>
        </div>
      </div>

      {/* Defense Capabilities Infographic */}
      <DefenseCapabilitiesCard countryCode={country.country_code} />

      {/* Row 1: Military Branches + Regional Comparison */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Military Branches */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-3 bg-slate-50/50">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-slate-600" />
              <CardTitle className="font-heading text-base text-slate-900">Military Branches</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            {loadingProfile ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-32 bg-slate-100 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : profile?.military_branches?.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {profile.military_branches.map((branch, i) => (
                  <BranchCard key={i} branch={branch} typePhoto={branchTypePhotos[branch.type]} emblemUrl={branchEmblems[branch.name]} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400 py-4 text-center">No branch data available for this country.</p>
            )}
          </CardContent>
        </Card>

        {/* Regional Comparison Bar Chart */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-3 bg-slate-50/50">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-slate-600" />
              <CardTitle className="font-heading text-base text-slate-900">
                {country.region} — Comparison
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionalPeers} layout="vertical" margin={{ top: 12, left: 8, right: 8, bottom: 4 }}>
                  <XAxis
                    type="number"
                    tick={{ fill: '#64748B', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `$${v}B`}
                  />
                  <YAxis
                    type="category"
                    dataKey="country_code"
                    tick={<CustomizedFlagTick />}
                    axisLine={false}
                    tickLine={false}
                    width={28}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-white border border-slate-200 p-2.5 rounded-lg shadow-lg text-sm">
                            <p className="font-semibold text-slate-800">{d.country}</p>
                            <p className="font-mono text-slate-900">${d.expenditure}B</p>
                            <p className="text-slate-400 text-xs">{d.gdp_percent}% of GDP</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="expenditure" radius={[0, 5, 5, 0]}>
                    {regionalPeers.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.country_code === country.country_code ? '#7E22CE' : '#DDD6FE'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-700 inline-block" />
              {country.country} highlighted
              <span className="w-2 h-2 rounded-full bg-violet-200 inline-block ml-2" />
              Regional peers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Contracts + Companies */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Key Contracts */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-3 bg-slate-50/50">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-600" />
              <CardTitle className="font-heading text-base text-slate-900">Key Contracts & Programs</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            {loadingProfile ? (
              <div className="space-y-2">
                {[1, 2, 3].map(i => <div key={i} className="h-16 bg-slate-100 rounded-lg animate-pulse" />)}
              </div>
            ) : profile?.contracts?.length > 0 ? (
              <div className="space-y-2">
                {profile.contracts.map((c, i) => (
                  <div
                    key={c.id || i}
                    className={`pl-3 pr-3 py-3 rounded-lg border border-slate-100 border-l-4 hover:border-slate-200 hover:bg-slate-50/60 transition-colors ${CONTRACT_CATEGORY_COLOR[c.category] || "border-l-slate-300"}`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm font-medium text-slate-800 leading-snug line-clamp-2">{c.title}</p>
                      <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${CONTRACT_STATUS_STYLE[c.status] || "bg-slate-100 text-slate-500"}`}>
                        {c.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap mt-1">
                      {c.category && (
                        <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                          {CATEGORY_LABEL[c.category] || c.category}
                        </span>
                      )}
                      {c.program && (
                        <span className="text-xs text-slate-700 font-semibold">{c.program}</span>
                      )}
                      {formatAmount(c.amount_min, c.amount_max) && (
                        <span className="text-xs font-mono text-slate-700 font-semibold ml-auto">
                          {formatAmount(c.amount_min, c.amount_max)}
                        </span>
                      )}
                    </div>
                    {c.awarded_to && (
                      <p className="text-xs text-slate-400 mt-1 truncate">→ {c.awarded_to}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400 py-4 text-center">No contracts found for this country.</p>
            )}
          </CardContent>
        </Card>

        {/* Defense Companies */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-3 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-600" />
                <CardTitle className="font-heading text-base text-slate-900">Defense Industry</CardTitle>
              </div>
              {/* National / Multinational tabs */}
              <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5">
                <button
                  onClick={() => { setIndustryTab("national"); setShowAllCompanies(false); }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                    industryTab === "national" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Flag className="w-3 h-3" /> National
                </button>
                <button
                  onClick={() => { setIndustryTab("multinational"); setShowAllCompanies(false); }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                    industryTab === "multinational" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Globe className="w-3 h-3" /> Multinational
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            {loadingProfile ? (
              <div className="space-y-2">
                {[1, 2, 3].map(i => <div key={i} className="h-14 bg-slate-100 rounded-lg animate-pulse" />)}
              </div>
            ) : (() => {
              const all = (profile?.companies || []).filter(c =>
                industryTab === "national" ? c.is_national !== false : c.is_national === false
              );
              const PREVIEW = 5;
              const list = showAllCompanies ? all : all.slice(0, PREVIEW);
              return all.length > 0 ? (
                <div className="space-y-2">
                  {list.map((c, i) => {
                    const isCluster = c.company_type === "cluster";
                    return (
                      <div
                        key={i}
                        onClick={() => !isCluster && setSelectedCompany(c.name)}
                        className={`flex items-center justify-between p-3 rounded-lg border border-slate-100 transition-colors gap-3 ${
                          isCluster
                            ? "bg-slate-50/80"
                            : "hover:border-slate-200 hover:bg-slate-50/60 cursor-pointer"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <CompanyLogo name={c.name} size="sm" />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-slate-800 truncate">{c.name}</p>
                              {isCluster && (
                                <span className="text-[9px] bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded font-semibold shrink-0">
                                  Conglomérat d'État
                                </span>
                              )}
                            </div>
                            <div className="flex gap-1 flex-wrap mt-0.5">
                              {c.specializations.slice(0, 2).map((s, si) => (
                                <span key={si} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          {c.market_cap > 0 && (
                            <p className="text-xs font-mono text-slate-700 font-semibold">${c.market_cap}B</p>
                          )}
                          <p className="text-[10px] text-slate-400 font-mono">{c.ticker}</p>
                        </div>
                      </div>
                    );
                  })}
                  {all.length > PREVIEW && (
                    <button
                      onClick={() => setShowAllCompanies(v => !v)}
                      className="w-full text-xs text-blue-600 hover:text-blue-800 font-medium py-2 border border-dashed border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      {showAllCompanies ? `Show less` : `See all ${all.length} companies`}
                    </button>
                  )}
                </div>
              ) : (
                <p className="text-sm text-slate-400 py-4 text-center">
                  {industryTab === "multinational" ? "No multinational companies found." : "No national companies found."}
                </p>
              );
            })()}
          </CardContent>
        </Card>
      </div>

      {/* Row 3: Recent News */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100 pb-3 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-slate-600" />
            <CardTitle className="font-heading text-base text-slate-900">
              Recent Defense News — {country.country}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4">
              {loadingProfile ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[1, 2, 3].map(i => <div key={i} className="h-52 bg-slate-100 rounded-lg animate-pulse" />)}
            </div>
          ) : profile?.news?.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {profile.news.slice(0, 6).map((article, i) => (
                <NewsCard key={i} article={article} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 py-4 text-center">No recent news found for this country.</p>
          )}
        </CardContent>
      </Card>
      {selectedCompany && (
        <CompanyProfileSheet name={selectedCompany} onClose={() => setSelectedCompany(null)} />
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function Expenditures() {
  const [searchParams] = useSearchParams();
  const [expenditures, setExpenditures] = useState([]);
  const [filteredExpenditures, setFilteredExpenditures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("country") || "");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [sortBy, setSortBy] = useState("expenditure_desc");
  const [chartMode, setChartMode] = useState("absolute");
  const [pinnedCountry, setPinnedCountry] = useState(null);
  const profileRef = useRef(null);

  const fetchExpenditures = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get(`${API}/expenditures`);
      setExpenditures(response.data);
      setFilteredExpenditures(response.data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchExpenditures(); }, []);

  useEffect(() => {
    let filtered = [...expenditures];
    if (selectedRegion !== "all") {
      filtered = filtered.filter(e => e.region === selectedRegion);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(e =>
        e.country.toLowerCase().includes(term) ||
        e.country_code.toLowerCase().includes(term)
      );
    }
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "expenditure_desc": return b.expenditure - a.expenditure;
        case "expenditure_asc": return a.expenditure - b.expenditure;
        case "gdp_desc": return b.gdp_percent - a.gdp_percent;
        case "gdp_asc": return a.gdp_percent - b.gdp_percent;
        case "name_asc": return a.country.localeCompare(b.country);
        default: return 0;
      }
    });
    setFilteredExpenditures(filtered);
  }, [searchTerm, selectedRegion, sortBy, expenditures]);

  const focusCountry = pinnedCountry
    ?? (filteredExpenditures.length === 1 ? filteredExpenditures[0] : null);

  const handleRowClick = (exp) => {
    setPinnedCountry(prev => prev?.id === exp.id ? null : exp);
    setTimeout(() => profileRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const totalExpenditure = filteredExpenditures.reduce((sum, e) => sum + e.expenditure, 0);
  const avgGdpPercent = filteredExpenditures.length
    ? (filteredExpenditures.reduce((sum, e) => sum + e.gdp_percent, 0) / filteredExpenditures.length).toFixed(1)
    : 0;

  const topCountries = [...filteredExpenditures]
    .sort((a, b) => b.expenditure - a.expenditure)
    .slice(0, 10);

  const regionData = filteredExpenditures.reduce((acc, exp) => {
    const existing = acc.find(r => r.name === exp.region);
    if (existing) { existing.value += exp.expenditure; }
    else { acc.push({ name: exp.region, value: exp.expenditure }); }
    return acc;
  }, []).sort((a, b) => b.value - a.value);

  const getFlag = (countryCode) => {
    const code = COUNTRY_FLAGS[countryCode] || countryCode.toLowerCase();
    return `https://flagcdn.com/w40/${code}.png`;
  };

  const getGdpColor = (gdpPercent) => {
    if (gdpPercent >= 4) return 'text-rose-600 bg-rose-50';
    if (gdpPercent >= 2.5) return 'text-amber-600 bg-amber-50';
    if (gdpPercent >= 2) return 'text-emerald-600 bg-emerald-50';
    return 'text-slate-600 bg-slate-50';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-slate-200 border-t-slate-800 rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4 text-slate-500">
        <p className="font-medium">Failed to load expenditure data.</p>
        <button onClick={fetchExpenditures} className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm hover:bg-slate-800 transition-colors">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div data-testid="expenditures-page" className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">
            Countries & Defense Spending
          </h1>
          <p className="text-slate-500 text-sm mt-1">Military budgets, capabilities & defense profiles by country</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 rounded-lg px-3 py-2">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-medium">Reference FY 2024</span>
            <span className="text-slate-300">|</span>
            <Database className="w-3.5 h-3.5" />
            <span>SIPRI Military Expenditure Database · IISS Military Balance · National government reports</span>
          </div>
          <p className="text-xs text-slate-400 text-right max-w-md">
            Note: reference year may vary by country based on official data availability. Figures in constant USD billions.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">TOTAL SPENDING</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-2">${totalExpenditure.toFixed(0)}B</p>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> YoY change not computed
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">COUNTRIES</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-2">{filteredExpenditures.length}</p>
            <p className="text-xs text-slate-500 mt-1">of {expenditures.length} total</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">AVG % OF GDP</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-2">{avgGdpPercent}%</p>
            <p className="text-xs text-slate-500 mt-1">NATO target: 2%</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">FISCAL YEAR</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-2">2024</p>
            <p className="text-xs text-slate-500 mt-1">Latest data</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts — hidden when a single country is in focus */}
      {!focusCountry && <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Countries Bar Chart */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading text-lg text-slate-900">
                {chartMode === "absolute" ? "Top Countries — Absolute Budget" : "Top Countries — % of GDP"}
              </CardTitle>
              <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5">
                <button
                  onClick={() => setChartMode("absolute")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    chartMode === "absolute" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <BarChart2 className="w-3.5 h-3.5" /> $B
                </button>
                <button
                  onClick={() => setChartMode("gdp")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    chartMode === "gdp" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Percent className="w-3.5 h-3.5" /> GDP
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[300px]" data-testid="top-countries-chart">
              <ResponsiveContainer width="100%" height="100%" minWidth={200}>
                <BarChart
                  data={chartMode === "gdp"
                    ? [...filteredExpenditures].sort((a, b) => b.gdp_percent - a.gdp_percent).slice(0, 10)
                    : topCountries}
                  layout="vertical"
                >
                  <XAxis
                    type="number"
                    tick={{ fill: '#64748B', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={chartMode === "gdp" ? (v) => `${v}%` : (v) => `$${v}B`}
                  />
                  <YAxis
                    type="category"
                    dataKey="country_code"
                    tick={{ fill: '#64748B', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={35}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <img src={getFlag(data.country_code)} alt={data.country} className="w-5 h-4 object-cover rounded-sm" />
                              <span className="text-slate-900 font-medium text-sm">{data.country}</span>
                            </div>
                            <p className="text-slate-900 font-mono font-semibold">${data.expenditure}B</p>
                            <p className="text-slate-500 text-xs">{data.gdp_percent}% of GDP</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey={chartMode === "gdp" ? "gdp_percent" : "expenditure"} fill="#7E22CE" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {chartMode === "gdp" && (
              <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-400 inline-block" />
                NATO 2% target — countries above this threshold are highlighted in the table
              </p>
            )}
          </CardContent>
        </Card>

        {/* Regional Distribution */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50">
            <CardTitle className="font-heading text-lg text-slate-900">Regional Distribution</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[200px]" data-testid="regional-pie-chart">
              <ResponsiveContainer width="100%" height="100%" minWidth={200}>
                <PieChart>
                  <Pie
                    data={regionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {regionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-lg">
                            <p className="text-slate-900 font-medium text-sm">{payload[0].name}</p>
                            <p className="font-mono text-slate-900 font-semibold">${payload[0].value.toFixed(1)}B</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {regionData.map((region, idx) => (
                <div key={region.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                    <span className="text-slate-600">{region.name}</span>
                  </div>
                  <span className="font-mono text-slate-900 font-medium">${region.value.toFixed(1)}B</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search by country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
            data-testid="search-expenditures"
          />
        </div>
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger className="w-full sm:w-48 bg-white border-slate-200 text-slate-700" data-testid="region-filter">
            <Globe2 className="w-4 h-4 mr-2 text-slate-400" />
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200">
            {REGIONS.map(r => (
              <SelectItem key={r.value} value={r.value} className="text-slate-700 focus:bg-slate-50">
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-56 bg-white border-slate-200 text-slate-700" data-testid="sort-filter">
            <ArrowUpDown className="w-4 h-4 mr-2 text-slate-400" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200">
            {SORT_OPTIONS.map(opt => (
              <SelectItem key={opt.value} value={opt.value} className="text-slate-700 focus:bg-slate-50">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* ── Country Profile ── */}
      {focusCountry && (
        <div ref={profileRef}>
          {pinnedCountry && (
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-slate-500">
                Profile of <span className="font-semibold text-slate-700">{focusCountry.country}</span> — click the row again to close
              </p>
              <button
                onClick={() => setPinnedCountry(null)}
                className="text-xs text-slate-400 hover:text-slate-700 underline"
              >
                Close
              </button>
            </div>
          )}
          <CountryProfileSection country={focusCountry} allExpenditures={expenditures} />
        </div>
      )}

      {/* Data Table */}
      <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto" data-testid="expenditures-table">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Country</th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Region</th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Expenditure</th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">% of GDP</th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Year</th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Source</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenditures.map((exp, idx) => (
                  <tr
                    key={exp.id}
                    onClick={() => handleRowClick(exp)}
                    className={`border-b border-slate-100 cursor-pointer transition-colors ${
                      pinnedCountry?.id === exp.id
                        ? "bg-slate-100 border-l-2 border-l-slate-900"
                        : "hover:bg-slate-50"
                    }`}
                    data-testid={`expenditure-row-${exp.id}`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 bg-slate-100 rounded-lg flex items-center justify-center text-xs font-mono text-slate-500 font-medium shrink-0">
                            {idx + 1}
                          </span>
                          <img
                            src={getFlag(exp.country_code)}
                            alt={exp.country}
                            className="w-8 h-6 object-cover rounded shadow-sm border border-slate-100 shrink-0"
                            onError={(e) => { e.target.src = `https://flagcdn.com/w40/${exp.country_code.toLowerCase()}.png`; }}
                          />
                          <div>
                            <p className="text-slate-900 font-medium text-sm">{exp.country}</p>
                            <p className="text-xs text-slate-500 font-mono">{exp.country_code}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">{exp.region}</span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="font-mono text-sm text-slate-900 font-semibold">${exp.expenditure}B</span>
                    </td>
                    <td className="p-4 text-right">
                      <span className={`inline-flex font-mono text-sm px-2.5 py-1 rounded-full font-medium ${getGdpColor(exp.gdp_percent)}`}>
                        {exp.gdp_percent}%
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="font-mono text-sm text-slate-500">{exp.year}</span>
                    </td>
                    <td className="p-4 text-right">
                      {exp.source ? (
                        <span className="inline-flex items-center text-xs font-medium text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                          {exp.source}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Top 5 focus cards */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <CardTitle className="font-heading text-lg text-slate-900">Focus — Top 5 Global Defense Budgets</CardTitle>
            <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-200">
              Source : SIPRI · {filteredExpenditures[0]?.year ?? 2024}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {[...expenditures]
              .sort((a, b) => b.expenditure - a.expenditure)
              .slice(0, 5)
              .map((exp, i) => {
                const shade = ["bg-slate-900", "bg-slate-700", "bg-slate-600", "bg-slate-500", "bg-slate-400"];
                return (
                  <div key={exp.id} className="flex flex-col items-center gap-2 text-center">
                    <span className="text-xs font-mono text-slate-400 font-bold">#{i + 1}</span>
                    <img
                      src={getFlag(exp.country_code)}
                      alt={exp.country}
                      className="w-12 h-8 object-cover rounded shadow-md border-2 border-white"
                      onError={e => { e.target.style.display = "none"; }}
                    />
                    <p className="text-xs font-semibold text-slate-700 leading-tight">{exp.country}</p>
                    <span className={`text-xs font-mono text-white px-2 py-0.5 rounded ${shade[i]}`}>
                      ${exp.expenditure}B
                    </span>
                    <span className="text-[10px] text-slate-400">{exp.gdp_percent}% of GDP</span>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
