import { useEffect, useRef, useState } from "react";
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
  "from-purple-600 to-purple-800", "from-blue-600 to-blue-800",
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
  US: { combat_aircraft: 2085, surface_combatants: 107, submarines: 68, tanks: 5500 },
  CN: { combat_aircraft: 1571, surface_combatants: 83,  submarines: 60, tanks: 5800 },
  RU: { combat_aircraft: 769,  surface_combatants: 54,  submarines: 65, tanks: 12420 },
  IN: { combat_aircraft: 628,  surface_combatants: 36,  submarines: 17, tanks: 4614 },
  SA: { combat_aircraft: 356,  surface_combatants: 12,  submarines: 0,  tanks: 1062 },
  GB: { combat_aircraft: 227,  surface_combatants: 24,  submarines: 10, tanks: 213 },
  DE: { combat_aircraft: 146,  surface_combatants: 12,  submarines: 6,  tanks: 321 },
  FR: { combat_aircraft: 228,  surface_combatants: 24,  submarines: 10, tanks: 222 },
  JP: { combat_aircraft: 354,  surface_combatants: 36,  submarines: 22, tanks: 920 },
  KR: { combat_aircraft: 406,  surface_combatants: 28,  submarines: 22, tanks: 2202 },
  AU: { combat_aircraft: 100,  surface_combatants: 12,  submarines: 6,  tanks: 59 },
  IT: { combat_aircraft: 190,  surface_combatants: 22,  submarines: 8,  tanks: 200 },
  BR: { combat_aircraft: 122,  surface_combatants: 16,  submarines: 5,  tanks: 469 },
  CA: { combat_aircraft: 87,   surface_combatants: 12,  submarines: 4,  tanks: 82 },
  IL: { combat_aircraft: 354,  surface_combatants: 6,   submarines: 5,  tanks: 2200 },
  TR: { combat_aircraft: 207,  surface_combatants: 24,  submarines: 12, tanks: 3022 },
  ES: { combat_aircraft: 142,  surface_combatants: 17,  submarines: 4,  tanks: 327 },
  PL: { combat_aircraft: 128,  surface_combatants: 4,   submarines: 4,  tanks: 1009 },
  NL: { combat_aircraft: 61,   surface_combatants: 12,  submarines: 4,  tanks: 18 },
  TW: { combat_aircraft: 422,  surface_combatants: 32,  submarines: 4,  tanks: 1110 },
  SG: { combat_aircraft: 100,  surface_combatants: 8,   submarines: 4,  tanks: 156 },
  GR: { combat_aircraft: 191,  surface_combatants: 21,  submarines: 11, tanks: 1350 },
  NO: { combat_aircraft: 57,   surface_combatants: 6,   submarines: 6,  tanks: 52 },
  SE: { combat_aircraft: 60,   surface_combatants: 7,   submarines: 5,  tanks: 120 },
  FI: { combat_aircraft: 55,   surface_combatants: 4,   submarines: 0,  tanks: 200 },
  AE: { combat_aircraft: 294,  surface_combatants: 8,   submarines: 0,  tanks: 735 },
  PK: { combat_aircraft: 425,  surface_combatants: 14,  submarines: 8,  tanks: 2496 },
  ID: { combat_aircraft: 93,   surface_combatants: 22,  submarines: 4,  tanks: 475 },
  VN: { combat_aircraft: 189,  surface_combatants: 12,  submarines: 6,  tanks: 2575 },
  EG: { combat_aircraft: 601,  surface_combatants: 28,  submarines: 8,  tanks: 4624 },
  UA: { combat_aircraft: 98,   surface_combatants: 4,   submarines: 0,  tanks: 1082 },
  IR: { combat_aircraft: 372,  surface_combatants: 21,  submarines: 29, tanks: 4071 },
  QA: { combat_aircraft: 96,   surface_combatants: 4,   submarines: 0,  tanks: 62 },
  KW: { combat_aircraft: 52,   surface_combatants: 5,   submarines: 0,  tanks: 433 },
  DZ: { combat_aircraft: 237,  surface_combatants: 14,  submarines: 6,  tanks: 2540 },
  MA: { combat_aircraft: 89,   surface_combatants: 14,  submarines: 3,  tanks: 1016 },
  TH: { combat_aircraft: 162,  surface_combatants: 14,  submarines: 0,  tanks: 777 },
  MY: { combat_aircraft: 65,   surface_combatants: 20,  submarines: 2,  tanks: 48 },
  PH: { combat_aircraft: 49,   surface_combatants: 12,  submarines: 0,  tanks: 10 },
  NZ: { combat_aircraft: 0,    surface_combatants: 6,   submarines: 0,  tanks: 0 },
  ZA: { combat_aircraft: 49,   surface_combatants: 6,   submarines: 3,  tanks: 172 },
  NG: { combat_aircraft: 78,   surface_combatants: 3,   submarines: 0,  tanks: 155 },
  AR: { combat_aircraft: 99,   surface_combatants: 14,  submarines: 3,  tanks: 360 },
  CO: { combat_aircraft: 91,   surface_combatants: 8,   submarines: 4,  tanks: 24 },
  CL: { combat_aircraft: 66,   surface_combatants: 12,  submarines: 4,  tanks: 172 },
  MX: { combat_aircraft: 64,   surface_combatants: 14,  submarines: 0,  tanks: 90 },
  PT: { combat_aircraft: 30,   surface_combatants: 9,   submarines: 2,  tanks: 37 },
  BE: { combat_aircraft: 54,   surface_combatants: 2,   submarines: 0,  tanks: 11 },
  CH: { combat_aircraft: 53,   surface_combatants: 0,   submarines: 0,  tanks: 134 },
  AT: { combat_aircraft: 15,   surface_combatants: 0,   submarines: 0,  tanks: 56 },
  DK: { combat_aircraft: 44,   surface_combatants: 6,   submarines: 0,  tanks: 44 },
  CZ: { combat_aircraft: 14,   surface_combatants: 0,   submarines: 0,  tanks: 123 },
  RO: { combat_aircraft: 51,   surface_combatants: 7,   submarines: 1,  tanks: 740 },
  HU: { combat_aircraft: 12,   surface_combatants: 0,   submarines: 0,  tanks: 44 },
  JO: { combat_aircraft: 79,   surface_combatants: 0,   submarines: 0,  tanks: 1351 },
  IQ: { combat_aircraft: 83,   surface_combatants: 0,   submarines: 0,  tanks: 490 },
  AZ: { combat_aircraft: 64,   surface_combatants: 4,   submarines: 0,  tanks: 800 },
  BD: { combat_aircraft: 109,  surface_combatants: 12,  submarines: 2,  tanks: 580 },
  MM: { combat_aircraft: 146,  surface_combatants: 8,   submarines: 0,  tanks: 545 },
  PE: { combat_aircraft: 76,   surface_combatants: 8,   submarines: 6,  tanks: 380 },
};

const CAP_CATEGORIES = [
  {
    key: "combat_aircraft",
    label: "Combat Aircraft",
    sublabel: "Fighters & Bombers",
    Icon: FighterJetIcon,
    scale: 50,
    scaleLabel: "50 aircraft",
    bg: "bg-sky-50/60",
    border: "border-sky-200",
    labelColor: "text-sky-700",
    countColor: "text-sky-900",
    dotColor: "text-sky-400",
    progressColor: "bg-sky-500",
    iconBadgeBg: "bg-sky-500/20",
    iconColor: "text-sky-400",
  },
  {
    key: "surface_combatants",
    label: "Surface Combatants",
    sublabel: "Frigates, Destroyers & Corvettes",
    Icon: WarshipIcon,
    scale: 4,
    scaleLabel: "4 vessels",
    bg: "bg-blue-50/60",
    border: "border-blue-200",
    labelColor: "text-blue-700",
    countColor: "text-blue-900",
    dotColor: "text-blue-400",
    progressColor: "bg-blue-500",
    iconBadgeBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    key: "tanks",
    label: "Main Battle Tanks",
    sublabel: "MBTs & Heavy Armour",
    Icon: TankIcon,
    scale: 300,
    scaleLabel: "300 tanks",
    bg: "bg-emerald-50/60",
    border: "border-emerald-200",
    labelColor: "text-emerald-700",
    countColor: "text-emerald-900",
    dotColor: "text-emerald-400",
    progressColor: "bg-emerald-500",
    iconBadgeBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    key: "submarines",
    label: "Submarines",
    sublabel: "Attack & Ballistic SSBNs",
    Icon: SubmarineIcon,
    scale: 3,
    scaleLabel: "3 submarines",
    bg: "bg-violet-50/60",
    border: "border-violet-200",
    labelColor: "text-violet-700",
    countColor: "text-violet-900",
    dotColor: "text-violet-400",
    progressColor: "bg-violet-500",
    iconBadgeBg: "bg-violet-500/20",
    iconColor: "text-violet-400",
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

function CapabilityTile({ cat, count, rank, maxCount }) {
  const animated = useCountUp(count);
  const iconCount = count === 0 ? 0 : Math.max(1, Math.min(Math.floor(count / cat.scale), 20));
  const pct = maxCount > 0 && count > 0 ? Math.min((count / maxCount) * 100, 100) : 0;

  return (
    <div className={`rounded-xl overflow-hidden border ${cat.border} shadow-sm`}>
      {/* Dark intelligence-style header */}
      <div className="bg-slate-800 px-3 py-2.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`shrink-0 p-1.5 rounded-md ${cat.iconBadgeBg}`}>
            <cat.Icon className={`w-4 h-4 ${cat.iconColor}`} />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-bold text-white leading-tight truncate">{cat.label}</p>
            <p className="text-[10px] text-slate-400 leading-tight truncate">{cat.sublabel}</p>
          </div>
        </div>
        {rank > 0 && count > 0 && (
          <span className={`shrink-0 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${
            rank === 1 ? "bg-amber-500/25 text-amber-400 border-amber-500/40" :
            rank <= 3 ? "bg-slate-500/30 text-slate-300 border-slate-500/40" :
            "bg-slate-700/60 text-slate-400 border-slate-600/50"
          }`}>
            #{rank}
          </span>
        )}
      </div>

      {/* Body */}
      <div className={`${cat.bg} p-3 flex flex-col gap-2`}>
        <p className={`text-3xl font-mono font-bold ${cat.countColor} tabular-nums leading-none`}>
          {count === 0 ? "—" : animated.toLocaleString()}
        </p>

        {count === 0 && (
          <p className="text-[10px] text-slate-400">No data / not applicable</p>
        )}

        {/* Progress bar vs world leader */}
        {count > 0 && (
          <div>
            <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${cat.progressColor}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )}

        {/* ISOTYPE pictogram row */}
        {iconCount > 0 && (
          <div className="flex flex-wrap gap-0.5">
            {Array.from({ length: iconCount }).map((_, i) => (
              <cat.Icon key={i} className={`w-3 h-3 ${cat.dotColor}`} />
            ))}
          </div>
        )}

        {count > 0 && (
          <p className={`text-[10px] ${cat.labelColor} opacity-60`}>
            1 icon ≈ {cat.scaleLabel}
          </p>
        )}
      </div>
    </div>
  );
}

function DefenseCapabilitiesCard({ countryCode }) {
  const cap = DEFENSE_CAPABILITIES[countryCode];

  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-3 bg-slate-50/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-purple-600" />
            <CardTitle className="font-heading text-base text-slate-900">Military Capabilities</CardTitle>
          </div>
          <span className="text-[10px] text-slate-400 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
            IISS Military Balance 2024 · estimates
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {!cap ? (
          <div className="flex items-center justify-center py-8 text-slate-400 text-sm gap-2">
            <Target className="w-4 h-4" />
            No capability data available for this country.
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {CAP_CATEGORIES.map((cat) => {
              const rank = CAP_RANKS[cat.key].indexOf(countryCode) + 1;
              return (
                <CapabilityTile
                  key={cat.key}
                  cat={cat}
                  count={cap[cat.key] ?? 0}
                  rank={rank > 0 ? rank : null}
                  maxCount={CAP_MAX[cat.key]}
                />
              );
            })}
          </div>
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
      className="group flex flex-col rounded-xl border border-slate-100 hover:border-purple-200 hover:shadow-md transition-all bg-white overflow-hidden"
    >
      {/* Photo header area */}
      <div className="relative w-full h-24 overflow-hidden shrink-0">
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
          <p className="text-sm font-bold text-slate-800 group-hover:text-purple-700 leading-tight transition-colors line-clamp-2">
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
      className="group flex flex-col rounded-lg border border-slate-100 hover:border-purple-200 hover:shadow-md transition-all overflow-hidden bg-white"
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
        <p className="text-sm font-semibold text-slate-800 group-hover:text-purple-700 line-clamp-2 leading-snug transition-colors">
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
          <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-purple-400 transition-colors shrink-0 ml-1" />
        </div>
      </div>
    </a>
  );
}

// ── Flag tick for the regional comparison bar chart ───────────────────────────
// FlagOverlay renders flag <img> elements as a HTML overlay aligned with chart bars.
// Plain HTML <img> tags are used instead of SVG <image> / foreignObject to avoid
// cross-origin and iOS-Safari SVG image loading bugs.
function FlagOverlay({ peers, chartMarginTop = 12, chartMarginBottom = 4 }) {
  if (!peers?.length) return null;
  return (
    <div
      className="absolute inset-y-0 left-0 w-10 flex flex-col pointer-events-none"
      style={{ paddingTop: chartMarginTop, paddingBottom: chartMarginBottom }}
    >
      {peers.map(entry => {
        const code = COUNTRY_FLAGS[entry.country_code] || entry.country_code.toLowerCase();
        return (
          <div key={entry.country_code} className="flex-1 flex items-center justify-center">
            <img
              src={`https://flagcdn.com/w40/${code}.png`}
              alt={entry.country}
              width={26}
              height={18}
              className="rounded-sm object-cover"
              onError={e => { e.currentTarget.style.opacity = '0'; }}
            />
          </div>
        );
      })}
    </div>
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
              <Shield className="w-4 h-4 text-purple-600" />
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
              <BarChart2 className="w-4 h-4 text-purple-600" />
              <CardTitle className="font-heading text-base text-slate-900">
                {country.region} — Comparison
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="relative h-[260px]">
              <FlagOverlay peers={regionalPeers} chartMarginTop={12} chartMarginBottom={4} />
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionalPeers} layout="vertical" margin={{ top: 12, left: 0, right: 8, bottom: 4 }}>
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
                    tick={false}
                    axisLine={false}
                    tickLine={false}
                    width={40}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-white border border-slate-200 p-2.5 rounded-lg shadow-lg text-sm">
                            <p className="font-semibold text-slate-800">{d.country}</p>
                            <p className="font-mono text-purple-700">${d.expenditure}B</p>
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
              <span className="w-2 h-2 rounded-full bg-purple-700 inline-block" />
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
              <FileText className="w-4 h-4 text-purple-600" />
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
                    className={`pl-3 pr-3 py-3 rounded-lg border border-slate-100 border-l-4 hover:border-purple-100 hover:bg-slate-50/60 transition-colors ${CONTRACT_CATEGORY_COLOR[c.category] || "border-l-slate-300"}`}
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
                        <span className="text-xs text-purple-600 font-semibold">{c.program}</span>
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
                <Building2 className="w-4 h-4 text-purple-600" />
                <CardTitle className="font-heading text-base text-slate-900">Defense Industry</CardTitle>
              </div>
              {/* National / Multinational tabs */}
              <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5">
                <button
                  onClick={() => { setIndustryTab("national"); setShowAllCompanies(false); }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                    industryTab === "national" ? "bg-white text-purple-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Flag className="w-3 h-3" /> National
                </button>
                <button
                  onClick={() => { setIndustryTab("multinational"); setShowAllCompanies(false); }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                    industryTab === "multinational" ? "bg-white text-purple-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
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
                            : "hover:border-purple-100 hover:bg-slate-50/60 cursor-pointer"
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
                                <span key={si} className="text-[10px] bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded">
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
                      className="w-full text-xs text-purple-600 hover:text-purple-800 font-medium py-2 border border-dashed border-purple-200 rounded-lg hover:bg-purple-50/40 transition-colors"
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
            <Newspaper className="w-4 h-4 text-purple-600" />
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
        <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4 text-slate-500">
        <p className="font-medium">Failed to load expenditure data.</p>
        <button onClick={fetchExpenditures} className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors">
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
            Defense Expenditures
          </h1>
          <p className="text-slate-500 text-sm mt-1">Global Military Spending by Country</p>
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
            <p className="text-2xl font-mono font-bold text-purple-700 mt-2">{avgGdpPercent}%</p>
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
                    chartMode === "absolute" ? "bg-white text-purple-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <BarChart2 className="w-3.5 h-3.5" /> $B
                </button>
                <button
                  onClick={() => setChartMode("gdp")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    chartMode === "gdp" ? "bg-white text-purple-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
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
                            <p className="text-purple-700 font-mono font-semibold">${data.expenditure}B</p>
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
                <span className="w-2 h-2 rounded-full bg-purple-400 inline-block" />
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
                            <p className="font-mono text-purple-700 font-semibold">${payload[0].value.toFixed(1)}B</p>
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
              <SelectItem key={r.value} value={r.value} className="text-slate-700 focus:bg-purple-50">
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
              <SelectItem key={opt.value} value={opt.value} className="text-slate-700 focus:bg-purple-50">
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
                Profil de <span className="font-semibold text-slate-700">{focusCountry.country}</span> — cliquez à nouveau sur la ligne pour fermer
              </p>
              <button
                onClick={() => setPinnedCountry(null)}
                className="text-xs text-slate-400 hover:text-slate-700 underline"
              >
                Fermer
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
                        ? "bg-purple-50 border-l-2 border-l-purple-600"
                        : "hover:bg-purple-50/30"
                    }`}
                    data-testid={`expenditure-row-${exp.id}`}
                  >
                    <td className="p-4">
                      <div className="flex items-center justify-between gap-2">
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
                        <img
                          src={getFlag(exp.country_code)}
                          alt=""
                          className="w-10 h-7 object-cover rounded-md shadow-sm border border-slate-100 opacity-40 shrink-0 hidden sm:block"
                          aria-hidden="true"
                        />
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
                        <span className="inline-flex items-center text-xs font-medium text-purple-700 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-full">
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
                const shade = ["bg-purple-700", "bg-purple-600", "bg-purple-500", "bg-purple-400", "bg-purple-300"];
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
