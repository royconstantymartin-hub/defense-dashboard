import { useEffect, useRef, useState, useCallback, useMemo, memo } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { API } from "@/App";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CompanyProfileSheet from "@/components/CompanyProfileSheet";
import CountryContractsSheet from "@/components/CountryContractsSheet";
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
  Target, Gauge, Download, FileCheck, Radar, ChevronDown, ChevronRight,
} from "lucide-react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { getCachedWorldGeo, loadWorldGeo } from "@/lib/geo";
import { CAPABILITY_DETAILS, PLATFORM_WIKI_TITLES, WKP, STATIC_PLATFORM_IMAGES, DEFENSE_CAPABILITIES, getCapabilitySummary, GENERIC_WIKI_DENYLIST } from "@/data/defenseCapabilities";
import { DATA_VINTAGE, SOURCES, sourceShortLabel, citationText, buildBibliography, downloadTextFile, capabilitiesSourceLink, spendingSourceLink } from "@/data/sources";
import { getMethodology } from "@/data/metricMethodology";

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
// Wheeled/tracked armoured fighting vehicle (IFV/APC) — distinct from a tank
function ArmoredVehicleIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M2 14 L4 10 L9 10 L11 8 L20 8 L22 12 L22 14 Z" />
      <rect x="13" y="9" width="6" height="2.5" rx="0.5" fill="white" opacity="0.35" />
      <circle cx="7" cy="15.5" r="2.2" />
      <circle cx="17" cy="15.5" r="2.2" />
      <circle cx="7" cy="15.5" r="0.9" fill="white" />
      <circle cx="17" cy="15.5" r="0.9" fill="white" />
    </svg>
  );
}
// AEW&C / support aircraft — airliner silhouette with rotodome (AWACS style)
function AWACSIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <ellipse cx="12" cy="5" rx="5.5" ry="1.8" />
      <rect x="11" y="6.5" width="2" height="2.5" rx="0.5" />
      <path d="M11 9 L13 9 L13.6 13 L21 15 L21 16.8 L13.4 15.6 L13 19 L15.5 20.4 L15.5 21.8 L12 20.8 L8.5 21.8 L8.5 20.4 L11 19 L10.6 15.6 L3 16.8 L3 15 L10.4 13 Z" />
    </svg>
  );
}
// Aircraft carrier — flat-top flight deck with island
function CarrierIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M2 14 L4 17 L20 17 L22 14 Z" />
      <rect x="3" y="11.5" width="18" height="2.5" rx="0.5" />
      <rect x="13" y="6.5" width="3" height="5" rx="0.5" />
      <path d="M5 10.5 L9 8.5 L9 10.5 Z" opacity="0.7" />
    </svg>
  );
}
// ── Drone sub-type icons (used as a meaningful fallback when a UAV has no photo) ─
function FixedWingUAVIcon({ className }) {
  // MALE/HALE fixed-wing silhouette (Reaper/Bayraktar style)
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11 2h2l.5 7 7 2v2l-7-.5-.3 5 2.8 1.5v1.5l-4-1-4 1v-1.5L11 19l-.3-5-7 .5v-2l7-2Z" />
    </svg>
  );
}
function LoiteringMunitionIcon({ className }) {
  // Loitering munition / one-way attack drone — dart with cross tail
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2c2.5 3 3 7 3 11l-3 3-3-3c0-4 .5-8 3-11Z" />
      <path d="M9 16l-4 4M15 16l4 4M12 17v4" />
    </svg>
  );
}
function MultirotorIcon({ className }) {
  // Quad/multirotor (Skydio, DJI-style)
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="5" cy="6" r="2.5" /><circle cx="19" cy="6" r="2.5" />
      <circle cx="5" cy="18" r="2.5" /><circle cx="19" cy="18" r="2.5" />
      <path d="M6.8 7.8 10 11h4l3.2-3.2M6.8 16.2 10 13h4l3.2 3.2" />
      <rect x="10" y="10.5" width="4" height="3" rx="0.6" />
    </svg>
  );
}
function NanoUAVIcon({ className }) {
  // Nano/micro recon UAV (Black Hornet style)
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <ellipse cx="12" cy="13" rx="3" ry="2" />
      <path d="M12 11V7M9 5h6M12 15v3" />
    </svg>
  );
}
// Picks the most representative icon + label for a UAV that has no photo, so the
// card still tells the reader what KIND of drone it is (not a generic outline).
function droneTypeFallback(item) {
  const n = (item?.model || "").toLowerCase();
  if (item?.is_expendable || /loiter|switchblade|kamikaze|one-way|owa|munition|suicide|scythe|lancet|shahed|geran/.test(n))
    return { Icon: LoiteringMunitionIcon, label: "Loitering munition" };
  if (/nano|micro|black hornet|pocket|remoeye|drone40/.test(n))
    return { Icon: NanoUAVIcon, label: "Nano / micro UAV" };
  if (/multicopter|multirotor|quad|copter|hexa|octo|skydio|matrice|mavic|vtol|v-bat|vbat/.test(n))
    return { Icon: MultirotorIcon, label: "Multirotor / VTOL" };
  return { Icon: FixedWingUAVIcon, label: "Fixed-wing UAV" };
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
  { value: "per_capita_desc", label: "Per capita (High to Low)" },
  { value: "per_capita_asc", label: "Per capita (Low to High)" },
  { value: "yoy_desc", label: "YoY Change (Highest)" },
  { value: "yoy_asc", label: "YoY Change (Lowest)" },
  { value: "name_asc", label: "Country (A-Z)" },
];

// ISO 3166-1 numeric → alpha-2 — used by world-atlas GeoJSON features
const ISO_NUM_TO_CODE = {
  '840': 'US', '156': 'CN', '643': 'RU', '356': 'IN', '682': 'SA',
  '826': 'GB', '804': 'UA', '276': 'DE', '250': 'FR', '392': 'JP',
  '410': 'KR', '036': 'AU', '380': 'IT', '616': 'PL', '124': 'CA',
  '376': 'IL', '784': 'AE', '792': 'TR', '076': 'BR', '158': 'TW',
  '724': 'ES', '528': 'NL', '702': 'SG', '586': 'PK', '208': 'DK',
  '578': 'NO', '360': 'ID', '012': 'DZ', '752': 'SE', '484': 'MX',
  // Additional NATO + tracked countries
  '300': 'GR', '246': 'FI', '642': 'RO', '620': 'PT', '203': 'CZ',
  '348': 'HU', '056': 'BE', '008': 'AL', '100': 'BG', '191': 'HR',
  '233': 'EE', '352': 'IS', '428': 'LV', '440': 'LT', '442': 'LU',
  '499': 'ME', '807': 'MK', '703': 'SK', '705': 'SI',
  '704': 'VN', '764': 'TH', '152': 'CL', '504': 'MA', '050': 'BD',
  '170': 'CO', '608': 'PH', '368': 'IQ', '818': 'EG', '040': 'AT',
  '032': 'AR', '554': 'NZ', '031': 'AZ', '710': 'ZA', '566': 'NG',
  '604': 'PE', '400': 'JO', '104': 'MM', '414': 'KW', '634': 'QA',
  '756': 'CH', '364': 'IR', '458': 'MY',
};

// All 32 NATO members (as of April 2024, Sweden being the 32nd)
const NATO_MEMBERS = new Set([
  'US', 'GB', 'DE', 'FR', 'IT', 'PL', 'CA', 'TR', 'ES', 'NL',
  'DK', 'NO', 'SE', 'BE', 'GR', 'PT', 'CZ', 'HU', 'RO', 'FI',
  'AL', 'BG', 'HR', 'EE', 'IS', 'LV', 'LT', 'LU', 'ME', 'MK', 'SK', 'SI',
]);

// Alliance memberships beyond NATO
const AUKUS_MEMBERS  = new Set(['AU', 'GB', 'US']);
const QUAD_MEMBERS   = new Set(['US', 'IN', 'JP', 'AU']);
const FIVEEYES_MEMBERS = new Set(['US', 'GB', 'CA', 'AU', 'NZ']);
const SCO_MEMBERS    = new Set(['CN', 'RU', 'IN', 'PK', 'KZ', 'KG', 'TJ', 'UZ', 'IR']);

// YoY spending change 2023 → 2024 (SIPRI 2025 report, % change rounded to 1dp)
const YOY_DELTA = {
  US: +5.7,  CN: +7.0,  RU: +38.0, IN: +5.0,  SA: -1.1,
  GB: +2.2,  UA: +50.5, DE: +28.0, FR: +7.4,  JP: +14.8,
  KR: +4.1,  AU: +6.2,  IT: +4.9,  PL: +21.9, CA: +8.1,
  IL: +79.8, AE: +2.3,  TR: +6.1,  BR: +4.2,  TW: +10.0,
  ES: +15.2, NL: +25.0, SG: +3.1,  PK: +6.0,  DK: +18.3,
  NO: +12.4, ID: +4.0,  DZ: +5.8,  SE: +34.9, MX: +3.2,
  GR: +7.2,  FI: +27.4, RO: +24.8, PT: +17.2, CZ: +35.8,
  HU: +22.1, BE: +14.5, AL: +9.0,  BG: +47.7, HR: +13.3,
  EE: +16.8, IS: +21.4, LV: +32.7, LT: +19.2, LU: +8.1,
  ME: +16.1, MK: +27.4, SK: +11.9, SI: +51.7,
};

const COLORS = ['#0F172A', '#1e40af', '#3B82F6', '#64748B', '#94A3B8', '#CBD5E1'];

// Population in millions — used for per-capita spending calculations
const POPULATION_M = {
  US: 334,  CN: 1410, RU: 144,  IN: 1428, SA: 36,   GB: 68,   UA: 44,   DE: 84,
  FR: 68,   JP: 124,  KR: 52,   AU: 26,   IT: 60,   PL: 38,   CA: 38,   IL: 9.7,
  AE: 9.9,  TR: 85,   BR: 215,  TW: 23.6, ES: 47.4, NL: 17.9, SG: 5.9,  PK: 231,
  DK: 5.9,  NO: 5.4,  ID: 275,  DZ: 45,   SE: 10.5, MX: 129,  GR: 10.4, FI: 5.5,
  RO: 19,   PT: 10.2, CZ: 10.9, HU: 9.7,  BE: 11.6, AL: 2.8,  BG: 6.5,  HR: 4.0,
  EE: 1.4,  IS: 0.37, LV: 1.8,  LT: 2.8,  LU: 0.66, ME: 0.62, MK: 2.1,  SK: 5.5,
  SI: 2.1,  VN: 98,   EG: 102,  IR: 87,   QA: 2.9,  KW: 4.3,  MA: 37,   TH: 72,
  MY: 33,   PH: 113,  NZ: 5.1,  ZA: 60,   NG: 218,  AR: 45,   CL: 19.6, JO: 10.3,
  IQ: 41,   AZ: 10.1, BD: 169,  MM: 54,   PE: 33,
};

const getFlag = (code) => `https://flagcdn.com/w40/${code.toLowerCase()}.png`;


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
  "bg-blue-800", "bg-blue-700",
  "bg-emerald-700", "bg-amber-600",
  "bg-rose-700", "bg-indigo-700",
  "bg-teal-700", "bg-orange-600",
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
      <div className={`${sz} ${avatarColor(name)} rounded-lg flex items-center justify-center shrink-0`}>
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
    key: "support_aircraft",
    label: "Support Aircraft",
    sublabel: "AEW&C, Tankers, Transport & MPA",
    Icon: AWACSIcon,
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
    key: "drones",
    label: "Drones & UAVs",
    sublabel: "MALE, HALE, Loitering Munitions",
    Icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 0a2 2 0 100-4 2 2 0 000 4zm0 0v2m-6 4H4m0 0a2 2 0 100-4 2 2 0 000 4zm0 0h2m12-4h-2m0 0a2 2 0 100-4 2 2 0 000 4zm0 0h2M6 12l-2 2m14-2l2 2M6 12l2 2m10-2l-2 2M8 14l4 4 4-4" />
      </svg>
    ),
    scale: 50,
    scaleLabel: "50 UAVs",
    bg: "bg-white",
    border: "border-slate-200",
    labelColor: "text-slate-500",
    countColor: "text-slate-700",
    dotColor: "text-slate-400",
    progressColor: "bg-slate-700",
    iconBadgeBg: "bg-slate-50",
    iconColor: "text-slate-500",
    hideCount: true,
  },
  {
    key: "tanks",
    label: "Main Battle Tanks",
    sublabel: "MBTs & Light Tanks",
    Icon: TankIcon,
    scale: 500,
    scaleLabel: "500 tanks",
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
    key: "armored_vehicles",
    label: "Armored Vehicles",
    sublabel: "IFVs, APCs, MRAPs & Recon",
    Icon: ArmoredVehicleIcon,
    scale: 1000,
    scaleLabel: "1,000 vehicles",
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
    key: "aircraft_carriers",
    label: "Aircraft Carriers",
    sublabel: "CVN / CV / Light Carriers & LHDs",
    Icon: CarrierIcon,
    scale: 2,
    scaleLabel: "2 carriers",
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
  {
    key: "air_defense",
    label: "Air Defense",
    sublabel: "SAM Batteries, BMD & SHORAD",
    Icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 L12 8" />
        <path d="M8 5 Q12 3 16 5" />
        <path d="M4 12 Q12 6 20 12" />
        <path d="M2 16 Q12 9 22 16" />
        <line x1="12" y1="8" x2="7" y2="16" />
        <line x1="12" y1="8" x2="17" y2="16" />
        <rect x="9" y="16" width="6" height="4" rx="1" />
      </svg>
    ),
    scale: 20,
    scaleLabel: "20 systems",
    bg: "bg-white",
    border: "border-slate-200",
    labelColor: "text-slate-500",
    countColor: "text-slate-700",
    dotColor: "text-slate-400",
    progressColor: "bg-slate-700",
    iconBadgeBg: "bg-slate-50",
    iconColor: "text-slate-500",
    hideCount: true,
  },
  {
    key: "missiles",
    label: "Missiles",
    sublabel: "Cruise, Ballistic & Strike",
    Icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 L12 14" />
        <path d="M9 5 L12 2 L15 5" />
        <path d="M10 14 L8 18 L12 16 L16 18 L14 14" />
        <line x1="7" y1="9" x2="10" y2="9" />
        <line x1="14" y1="9" x2="17" y2="9" />
      </svg>
    ),
    scale: 500,
    scaleLabel: "500 missiles",
    bg: "bg-white",
    border: "border-slate-200",
    labelColor: "text-slate-500",
    countColor: "text-slate-700",
    dotColor: "text-slate-400",
    progressColor: "bg-slate-700",
    iconBadgeBg: "bg-slate-50",
    iconColor: "text-slate-500",
    hideCount: true,
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

// Group categories into macro sections for display
const CAP_GROUPS = [
  {
    label: "Air Power", Icon: Plane, categoryKeys: ["fighters", "helicopters", "support_aircraft", "drones"],
    accent: "blue", headlineKeys: ["fighters", "helicopters", "support_aircraft", "drones"], headlineLabel: "aircraft & UAVs",
  },
  {
    label: "Land Forces", Icon: TankIcon, categoryKeys: ["tanks", "armored_vehicles"],
    accent: "amber", headlineKeys: ["tanks", "armored_vehicles"], headlineLabel: "armoured units",
  },
  {
    label: "Naval Forces", Icon: Anchor, categoryKeys: ["aircraft_carriers", "surface_combatants", "submarines"],
    accent: "cyan", headlineKeys: ["aircraft_carriers", "surface_combatants", "submarines"], headlineLabel: "warships",
  },
  {
    label: "Strategic & Air Defense", Icon: Radar, categoryKeys: ["air_defense", "missiles"],
    accent: "emerald", headlineKeys: ["air_defense", "missiles"], headlineLabel: "systems & missiles",
  },
];

// Accent palette for the domain (tier-1) cards — sober, single subdued Intel-Blue
// tint for the open state (no bright/fluo colours), per the light design system.
const GROUP_ACCENT = {
  blue:    { ring: "ring-slate-200", border: "border-slate-300", bg: "bg-slate-50", text: "text-slate-800", iconBg: "bg-white", bar: "bg-slate-700" },
  amber:   { ring: "ring-slate-200", border: "border-slate-300", bg: "bg-slate-50", text: "text-slate-800", iconBg: "bg-white", bar: "bg-slate-700" },
  cyan:    { ring: "ring-slate-200", border: "border-slate-300", bg: "bg-slate-50", text: "text-slate-800", iconBg: "bg-white", bar: "bg-slate-700" },
  emerald: { ring: "ring-slate-200", border: "border-slate-300", bg: "bg-slate-50", text: "text-slate-800", iconBg: "bg-white", bar: "bg-slate-700" },
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
  const animated = useCountUp(count ?? 0);
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
        {rank > 0 && count != null && count > 0 && (
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
        {!cat.hideCount && (
          <p className={`text-3xl font-mono font-bold ${cat.countColor} tabular-nums leading-none`}>
            {count === null
              ? <span className="text-xl text-slate-300 font-mono">N/D</span>
              : count === 0 ? "—"
              : animated.toLocaleString()}
          </p>
        )}

        {cat.hideCount && count != null && count > 0 && (
          <p className={`text-sm font-semibold ${cat.countColor}`}>See breakdown</p>
        )}

        {!cat.hideCount && count === null && (
          <p className="text-[10px] text-slate-400">Not documented</p>
        )}

        {!cat.hideCount && count === 0 && (
          <p className="text-[10px] text-slate-400">No data / not applicable</p>
        )}

        {/* Progress bar vs world leader */}
        {!cat.hideCount && count > 0 && (
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${cat.progressColor} transition-all duration-700`}
              style={{ width: `${pct}%` }}
            />
          </div>
        )}

        {!cat.hideCount && count > 0 && (
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


// Color tiers for the choropleth — both modes share the same 5-step palette
// so the legend is easy to read at a glance.
const CHORO_TIERS_ABS = [
  { min: 0,   max: 10,  color: '#DBEAFE', label: '< $10B' },
  { min: 10,  max: 50,  color: '#93C5FD', label: '$10–50B' },
  { min: 50,  max: 150, color: '#3B82F6', label: '$50–150B' },
  { min: 150, max: 400, color: '#1D4ED8', label: '$150–400B' },
  { min: 400, max: Infinity, color: '#1e3a8a', label: '> $400B' },
];
const CHORO_TIERS_GDP = [
  { min: 0,   max: 1,   color: '#DBEAFE', label: '< 1%' },
  { min: 1,   max: 2,   color: '#93C5FD', label: '1–2%' },
  { min: 2,   max: 3,   color: '#3B82F6', label: '2–3%' },
  { min: 3,   max: 5,   color: '#1D4ED8', label: '3–5%' },
  { min: 5,   max: Infinity, color: '#1e3a8a', label: '> 5%' },
];

// Memoized inner layer — prevents all 177 Geography paths from re-rendering
// when only the tooltip state changes (mouse hover events).
const GeographyLayer = memo(function GeographyLayer({
  geoData, spendingByCode, getColor, selectedCode, onCountryClick, onMouseEnter, onMouseLeave
}) {
  return (
    <Geographies geography={geoData || GEO_URL}>
      {({ geographies }) =>
        geographies.map((geo) => {
          const code = ISO_NUM_TO_CODE[String(geo.id).padStart(3, '0')];
          const entry = code ? spendingByCode[code] : null;
          const isSelected = code && selectedCode === code;
          return (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill={isSelected ? '#1e40af' : getColor(entry)}
              stroke="#FFFFFF"
              strokeWidth={0.6}
              style={{
                default: { outline: 'none', cursor: entry ? 'pointer' : 'default' },
                hover:   { fill: entry ? '#2563eb' : '#CBD5E1', outline: 'none' },
                pressed: { outline: 'none' },
              }}
              onClick={() => entry && onCountryClick(entry)}
              onMouseEnter={(evt) => entry && onMouseEnter({ entry, x: evt.clientX, y: evt.clientY })}
              onMouseLeave={onMouseLeave}
            />
          );
        })
      }
    </Geographies>
  );
});

function WorldChoroplethMap({ expenditures, mode, onCountryClick, selectedCode }) {
  const [tooltip, setTooltip] = useState(null);
  const [geoData, setGeoData] = useState(getCachedWorldGeo);

  useEffect(() => { setTooltip(null); }, [mode]);

  useEffect(() => {
    if (!getCachedWorldGeo()) {
      loadWorldGeo().then(d => { if (d) setGeoData(d); });
    }
  }, []);

  const spendingByCode = useMemo(() => {
    const m = {};
    expenditures.forEach(e => { m[e.country_code] = e; });
    return m;
  }, [expenditures]);

  const tiers = mode === 'gdp' ? CHORO_TIERS_GDP : CHORO_TIERS_ABS;

  const getColor = useCallback((entry) => {
    if (!entry) return '#E2E8F0';
    const val = mode === 'gdp' ? entry.gdp_percent : entry.expenditure;
    const tier = tiers.find(t => val >= t.min && val < t.max);
    return tier ? tier.color : tiers[tiers.length - 1].color;
  }, [mode, tiers]);

  const handleMouseEnter = useCallback((data) => setTooltip(data), []);
  const handleMouseLeave = useCallback(() => setTooltip(null), []);

  return (
    <div className="relative">
      {/* Map */}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 118, center: [15, 15] }}
        style={{ width: '100%', height: '340px' }}
      >
        <GeographyLayer
          geoData={geoData}
          spendingByCode={spendingByCode}
          getColor={getColor}
          selectedCode={selectedCode}
          onCountryClick={onCountryClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </ComposableMap>

      {/* Hover tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 bg-white border border-slate-200 rounded-lg shadow-xl px-3 py-2 pointer-events-none min-w-[150px]"
          style={{ left: tooltip.x + 14, top: tooltip.y - 70 }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <img src={getFlag(tooltip.entry.country_code)} alt="" className="w-5 h-3.5 object-cover rounded-sm border border-slate-100" />
            <span className="font-semibold text-slate-900 text-xs">{tooltip.entry.country}</span>
            {NATO_MEMBERS.has(tooltip.entry.country_code) && (
              <span className="text-[8px] font-bold px-1 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200 uppercase">NATO</span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
            <span className="text-[10px] text-slate-400">Budget</span>
            <span className="font-mono text-xs font-semibold text-blue-800">${tooltip.entry.expenditure}B</span>
            <span className="text-[10px] text-slate-400">% of GDP</span>
            <span className="font-mono text-xs text-slate-700">{tooltip.entry.gdp_percent}%</span>
            {YOY_DELTA[tooltip.entry.country_code] != null && (
              <>
                <span className="text-[10px] text-slate-400">YoY</span>
                <span className={`font-mono text-xs font-semibold ${YOY_DELTA[tooltip.entry.country_code] >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {YOY_DELTA[tooltip.entry.country_code] >= 0 ? '▲' : '▼'}{Math.abs(YOY_DELTA[tooltip.entry.country_code]).toFixed(1)}%
                </span>
              </>
            )}
          </div>
          <p className="text-[9px] text-slate-300 mt-1.5 text-center">Click to open profile</p>
        </div>
      )}

      {/* Legend — bottom left, horizontal tiers */}
      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg px-3 py-2 shadow-sm">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
          {mode === 'gdp' ? '% of GDP' : 'Defense Budget'}
        </p>
        <div className="flex items-center gap-1.5 flex-wrap">
          {tiers.map(t => (
            <div key={t.label} className="flex items-center gap-1">
              <span className="w-4 h-3 rounded-sm border border-slate-200/50 inline-block" style={{ backgroundColor: t.color }} />
              <span className="text-[9px] text-slate-500 font-mono">{t.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-1">
            <span className="w-4 h-3 rounded-sm border border-slate-200 inline-block bg-slate-200" />
            <span className="text-[9px] text-slate-400 font-mono">N/A</span>
          </div>
        </div>
      </div>

      {/* Hint — bottom right */}
      <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm rounded-lg px-2 py-1 border border-slate-100">
        <p className="text-[9px] text-slate-400">
          <span className="font-medium text-slate-500">{expenditures.length} tracked</span> · hover = preview · click = profile
        </p>
      </div>
    </div>
  );
}

// Maps model name prefixes → product search query for "Browse Products" links.
// Rafale variants and other multi-variant families link to a single canonical product.
const PLATFORM_PRODUCT_SEARCH = {
  "Rafale":           "Rafale",
  "Mirage 2000":      "Mirage 2000",
  "Tiger HAD":        "Tigre HAD",
  "NH90":             "NH90",
  "EC725":            "EC725 Caracal",
  "AS 532":           "AS 532 Cougar",
  "SA 341":           "SA 342 Gazelle",
  "SA 342":           "SA 342 Gazelle",
  "Leclerc":          "Leclerc",
  "VBCI":             "VBCI",
  "Griffon VBMR":     "VBMR Griffon",
  "Serval VBMR":      "VBMR Serval",
  "CAESAR":           "CAESAR",
  "MQ-9A Reaper":     "MQ-9 Reaper",
  "MQ-9B":            "MQ-9B SkyGuardian",
  "Patroller":        "Patroller MALE",
  "nEUROn":           "Dassault nEUROn UCAV",
  "Harfang":          "Harfang MALE",
  "F-35":             "F-35 Lightning II",
  "F-22":             "F-22 Raptor",
  "F-15":             "F-15EX Eagle II",
  "Leopard 2":        "Leopard 2A7+",
  "K2 Black Panther": "K2 Black Panther",
  "Bayraktar TB2":    "Bayraktar TB2",
  "Eurofighter":      "Eurofighter Typhoon",
  "Typhoon":          "Eurofighter Typhoon",
};

function getProductBrowseLink(model, manufacturer) {
  const key = Object.keys(PLATFORM_PRODUCT_SEARCH).find(k => model.startsWith(k));
  if (key) return `/products?search=${encodeURIComponent(PLATFORM_PRODUCT_SEARCH[key])}`;
  const mfr = manufacturer.split(' / ')[0].split(' (')[0];
  return `/products?manufacturer=${encodeURIComponent(mfr)}`;
}

function PlatformCard({ item, cat, imgSrc, onImgError, maxCount }) {
  const hasCount = item.count != null;
  const dimmed = item.on_order || item.is_dev;
  // Bars compare the *operational* fleet, so ordered / in-development platforms
  // get no comparison bar (they aren't part of the in-service scale).
  const showBar = hasCount && !dimmed && maxCount > 0;
  const barPct = showBar ? Math.min(100, Math.round((item.count / maxCount) * 100)) : 0;
  const primaryMfr = item.manufacturer.split(' / ')[0].split(' (')[0];

  return (
    <div className={`rounded-xl overflow-hidden border transition-all duration-200 group flex flex-col ${dimmed ? "bg-slate-100 border-dashed border-slate-300 hover:border-slate-400" : "bg-white border-slate-100 hover:border-slate-300 hover:shadow-lg"}`}>
      {/* Image */}
      <div className={`h-32 ${cat.bg} relative overflow-hidden shrink-0`}>
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={item.model}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={onImgError}
          />
        ) : cat.key === "drones" ? (
          // No photo for this UAV → show a sub-type icon + label so the reader
          // still knows what kind of drone it is (loitering, multirotor, MALE…).
          (() => {
            const { Icon: DroneIcon, label } = droneTypeFallback(item);
            return (
              <div className="w-full h-full flex flex-col items-center justify-center gap-1 px-2">
                <DroneIcon className={`w-11 h-11 ${cat.iconColor} opacity-40`} />
                <span className="text-[9px] font-semibold uppercase tracking-wide text-slate-400 text-center leading-tight">
                  {label}
                </span>
                <span className="text-[8px] text-slate-300">image unavailable</span>
              </div>
            );
          })()
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <cat.Icon className={`w-14 h-14 ${cat.iconColor} opacity-15`} />
          </div>
        )}
        {/* Count badge overlay — only when a count is provided */}
        {hasCount && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
            <span className={`font-mono font-bold text-lg text-white tabular-nums`}>
              {item.count.toLocaleString()}
            </span>
          </div>
        )}
        {/* Origin tag (top-left) when supplied/foreign */}
        {item.origin && (
          <span className="absolute top-1.5 left-1.5 text-[9px] font-semibold bg-white/85 text-slate-600 border border-white/40 px-1.5 py-0.5 rounded">
            {item.origin}
          </span>
        )}
        {/* Status ribbon (top-right) so on-order / in-development is obvious at a glance */}
        {item.is_dev && (
          <span className="absolute top-1.5 right-1.5 text-[9px] font-bold uppercase tracking-wide bg-slate-700/90 text-white px-1.5 py-0.5 rounded shadow-sm">
            In Development
          </span>
        )}
        {item.on_order && !item.is_dev && (
          <span className="absolute top-1.5 right-1.5 text-[9px] font-bold uppercase tracking-wide bg-amber-500/95 text-white px-1.5 py-0.5 rounded shadow-sm">
            On Order
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <span className={`text-xs font-semibold text-slate-800 leading-snug line-clamp-2 ${dimmed ? "opacity-70" : ""}`}>
          {item.model}
        </span>

        {/* Status badges — kept OUTSIDE the clamped title so they are never clipped */}
        {(item.on_order || item.is_dev || item.is_expendable) && (
          <div className="flex flex-wrap gap-1">
            {item.on_order && (
              <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-semibold">On Order</span>
            )}
            {item.is_dev && (
              <span className="text-[10px] bg-slate-200 text-slate-700 border border-slate-300 px-1.5 py-0.5 rounded font-semibold">In Development</span>
            )}
            {item.is_expendable && (
              <span className="text-[10px] bg-rose-50 text-rose-600 border border-rose-100 px-1.5 py-0.5 rounded font-semibold">Expendable</span>
            )}
          </div>
        )}

        {/* Bar — only for operational platforms (not ordered / in-development) */}
        {showBar && (
          <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${cat.progressColor} transition-all duration-700`}
              style={{ width: `${barPct}%` }}
            />
          </div>
        )}

        <p className="text-[10px] text-slate-400 truncate mt-0.5">{primaryMfr}</p>

        <a
          href={getProductBrowseLink(item.model, item.manufacturer)}
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
  // Operational = in-service only. Ordered, in-development, expendable and
  // trainer platforms are shown but never counted in the headline total.
  const operational = details.filter(d => !d.is_expendable && !d.is_dev && !d.on_order && !d.is_trainer);
  const total = operational.reduce((s, d) => s + (d.count ?? 0), 0);
  const pendingCount = details.filter(d => d.is_dev || d.on_order).length;
  // Scale bars on the operational fleet so they stay meaningful.
  const maxCount = operational.length > 0 ? Math.max(...operational.map(d => d.count ?? 0)) : 0;

  const [platformImages, setPlatformImages] = useState({});
  const [imgErrors, setImgErrors] = useState({});
  const fetchedRef = useRef(new Set());

  const fetchWikiImage = useCallback(async (model) => {
    if (fetchedRef.current.has(model)) return;
    fetchedRef.current.add(model);
    const wikiTitle = PLATFORM_WIKI_TITLES[model] || model;
    // Skip generic class/company articles — their lead image is a wrong, shared
    // photo (e.g. a Reaper for every UAV). Show the clean category icon instead.
    if (GENERIC_WIKI_DENYLIST.has(wikiTitle)) return;
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
              {cat.sublabel} · <span className="font-semibold">{total.toLocaleString()}</span>{" "}
              {getMethodology(cat.key)?.unit || "in service"} ·{" "}
              <span
                title={getMethodology(cat.key)
                  ? `${getMethodology(cat.key).counts} Excludes: ${getMethodology(cat.key).excludes}`
                  : citationText("IISS")}
                className="cursor-help underline decoration-dotted"
              >
                {sourceShortLabel(getMethodology(cat.key)?.primary_source || "IISS")}
              </span>
              {getMethodology(cat.key)?.caveat && (
                <span className="text-amber-600"> · ⚠ {getMethodology(cat.key).caveat}</span>
              )}
              {pendingCount > 0 && (
                <span className="text-slate-400"> · +{pendingCount} on order / in development (not counted)</span>
              )}
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
            imgSrc={!imgErrors[item.model]
              ? (platformImages[item.model] || STATIC_PLATFORM_IMAGES[item.model])
              : undefined}
            onImgError={() => setImgErrors(prev => ({ ...prev, [item.model]: true }))}
          />
        ))}
      </div>
    </div>
  );
}

// Tier-1 domain card (Air / Land / Naval / Strategic) — opens a drawer of sub-categories
function CapabilityDomainCard({ group, cap, countryCode, isOpen, onToggle }) {
  const a = GROUP_ACCENT[group.accent] || GROUP_ACCENT.blue;
  const total = group.headlineKeys.reduce((s, k) => s + (cap[k] ?? 0), 0);
  // Best (lowest) world rank across this domain's categories
  const bestRank = group.categoryKeys.reduce((best, key) => {
    if (!(cap[key] > 0)) return best;
    const r = (CAP_RANKS[key]?.indexOf(countryCode) ?? -1) + 1;
    return r > 0 && (best === null || r < best) ? r : best;
  }, null);
  return (
    <button
      onClick={onToggle}
      className={`text-left rounded-xl border p-3 transition-all ${
        isOpen ? `${a.bg} ${a.border} ring-2 ${a.ring}` : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className={`p-1.5 rounded-lg ${isOpen ? a.iconBg : "bg-slate-100"}`}>
          <group.Icon className={`w-4 h-4 ${isOpen ? a.text : "text-slate-500"}`} />
        </span>
        <div className="flex items-center gap-1">
          {bestRank && bestRank <= 5 && (
            <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md border ${
              bestRank === 1 ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-white text-slate-500 border-slate-200"
            }`}>
              #{bestRank} world
            </span>
          )}
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </div>
      <p className={`mt-2 text-[13px] font-bold leading-tight ${isOpen ? a.text : "text-slate-800"}`}>{group.label}</p>
      <p className="text-[10px] text-slate-400 mt-0.5">
        <span className="font-mono font-semibold text-slate-600">{total.toLocaleString()}</span> {group.headlineLabel}
      </p>
    </button>
  );
}

function DefenseCapabilitiesCard({ countryCode, countryName }) {
  const cap = getCapabilitySummary(countryCode);
  const [openGroup, setOpenGroup] = useState(null);
  const [openCat, setOpenCat] = useState(null);

  const hasDetails = !!CAPABILITY_DETAILS[countryCode];
  const activeGroup = CAP_GROUPS.find(g => g.label === openGroup) || null;
  const verifyUrl = capabilitiesSourceLink(countryCode);

  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-3 bg-slate-50/50">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-slate-600" />
            <CardTitle className="font-heading text-base text-slate-900">Military Capabilities</CardTitle>
          </div>
          {cap && (
            <div className="flex items-center gap-1.5">
              {cap._sourced ? (
                <span
                  title={`Primary reference: ${citationText("IISS")}  —  NOTE: The Military Balance is a subscription publication with no free per-country link. Use the "Verify" link for an open-access equivalent.`}
                  className="text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full cursor-help"
                >
                  Sourced · IISS Military Balance {DATA_VINTAGE.capability_edition}
                </span>
              ) : (
                <span
                  title={SOURCES.ESTIMATE.note}
                  className="text-[10px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full cursor-help"
                >
                  Aggregate estimate · unverified
                </span>
              )}
              {/* Direct, open-access per-country source so a reviewer can verify */}
              <a
                href={verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Open ${countryName || "this country"}'s capability data (Global Firepower, open access)`}
                className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-700 hover:text-blue-900 bg-white border border-blue-200 hover:border-blue-400 px-2 py-0.5 rounded-full transition-colors"
              >
                <ExternalLink className="w-2.5 h-2.5" /> Verify source
              </a>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        {!cap ? (
          <div className="flex items-center justify-center py-8 text-slate-400 text-sm gap-2">
            <Target className="w-4 h-4" />
            No capability data available for this country.
          </div>
        ) : (
          <>
            {/* Tier 1 — domains */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
              {CAP_GROUPS.map(group => (
                <CapabilityDomainCard
                  key={group.label}
                  group={group}
                  cap={cap}
                  countryCode={countryCode}
                  isOpen={openGroup === group.label}
                  onToggle={() => {
                    setOpenGroup(prev => (prev === group.label ? null : group.label));
                    setOpenCat(null);
                  }}
                />
              ))}
            </div>

            {/* Tier 2 + 3 — sub-categories and platform breakdown */}
            {activeGroup && (
              <div className="rounded-xl border border-slate-200 bg-slate-50/40 p-3 space-y-3">
                {/* Breadcrumb */}
                <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                  <activeGroup.Icon className="w-3.5 h-3.5" />
                  <span>{activeGroup.label}</span>
                  {openCat && (
                    <>
                      <ChevronRight className="w-3 h-3 text-slate-300" />
                      <span className="text-slate-700">{CAP_CATEGORIES.find(c => c.key === openCat)?.label}</span>
                    </>
                  )}
                  {!hasDetails && (
                    <span className="ml-auto text-[10px] font-normal text-slate-400">aggregate estimates only</span>
                  )}
                </div>

                {/* Sub-category tiles */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {activeGroup.categoryKeys.map(key => {
                    const cat = CAP_CATEGORIES.find(c => c.key === key);
                    if (!cat) return null;
                    const rank = CAP_RANKS[cat.key].indexOf(countryCode) + 1;
                    const detailCount = (CAPABILITY_DETAILS[countryCode]?.[cat.key] || []).length;
                    const isClickable = detailCount > 0;
                    return (
                      <CapabilityTile
                        key={cat.key}
                        cat={cat}
                        count={cap[cat.key] ?? null}
                        rank={rank > 0 ? rank : null}
                        maxCount={CAP_MAX[cat.key]}
                        isClickable={isClickable}
                        isSelected={openCat === cat.key}
                        onClick={() => setOpenCat(prev => (prev === cat.key ? null : cat.key))}
                      />
                    );
                  })}
                </div>

                {/* Platform breakdown */}
                {openCat && (CAPABILITY_DETAILS[countryCode]?.[openCat] || []).length > 0 && (
                  <CapabilityDetailPanel
                    cat={CAP_CATEGORIES.find(c => c.key === openCat)}
                    countryCode={countryCode}
                    onClose={() => setOpenCat(null)}
                  />
                )}
              </div>
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
// Defense-themed stock photos for news fallback (same Unsplash pool as Announcements page)
const COUNTRY_NEWS_FALLBACKS = [
  "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1668724982255-1a3e0c72b814?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1578241030078-01b38ededda4?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1708342421457-9c59f4843fe1?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1650526087824-163941841b52?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1759610545704-9bbee32cb17c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
];

function getNewsStockPhoto(title) {
  const h = Math.abs(Array.from(title || '').reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) | 0, 0));
  return COUNTRY_NEWS_FALLBACKS[h % COUNTRY_NEWS_FALLBACKS.length];
}

function NewsCard({ article }) {
  const [imgError, setImgError] = useState(false);
  const [fallbackError, setFallbackError] = useState(false);
  const primaryImg = !imgError ? article.image : null;
  const fallbackImg = !fallbackError ? getNewsStockPhoto(article.title) : null;
  const displayImg = primaryImg || fallbackImg;

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
      {/* Fixed-height image zone */}
      <div className="w-full h-36 overflow-hidden shrink-0 relative bg-slate-100">
        {displayImg ? (
          <img
            src={displayImg}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => {
              if (!imgError) setImgError(true);
              else setFallbackError(true);
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-slate-50">
            <Newspaper className="w-7 h-7 text-slate-300" />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center px-4 line-clamp-1">
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

// ── Flag + name tick for bar charts ──────────────────────────────────────────
function CustomizedFlagTick({ x, y, payload, nameMap = {} }) {
  const code = payload?.value?.toLowerCase();
  const name = nameMap[payload?.value] ?? payload?.value ?? '';
  if (!code) return null;
  const label = name.length > 12 ? name.slice(0, 11) + '…' : name;
  // Pure SVG approach — avoids foreignObject namespace issues in React/Recharts
  return (
    <g>
      <text
        x={x - 22}
        y={y + 4}
        textAnchor="end"
        fill="#64748B"
        fontSize={9}
        fontFamily="Inter, system-ui, sans-serif"
      >
        {label}
      </text>
      <image
        href={`https://flagcdn.com/w40/${code}.png`}
        x={x - 20}
        y={y - 7}
        width={18}
        height={13}
        preserveAspectRatio="none"
      />
    </g>
  );
}

// ── Country Profile Section ──────────────────────────────────────────────────

// Module-level caches: avoid re-fetching the same country within a session
const PROFILE_CACHE = new Map();
const BANNER_CACHE = new Map();

function CountryProfileSection({ country, allExpenditures, onOpenContractsSheet }) {
  const [profile, setProfile] = useState(() => PROFILE_CACHE.get(country.country) ?? null);
  const [loadingProfile, setLoadingProfile] = useState(!PROFILE_CACHE.has(country.country));
  const [industryTab, setIndustryTab] = useState("national");
  const [showAllCompanies, setShowAllCompanies] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [bannerUrl, setBannerUrl] = useState(() => BANNER_CACHE.get(country.country) ?? null);
  const branchTypePhotos = useBranchTypePhotos();
  const branchEmblems = useBranchEmblems(profile?.military_branches);

  // Fetch country profile from backend — skip if already cached
  useEffect(() => {
    if (PROFILE_CACHE.has(country.country)) return;
    let cancelled = false;
    setLoadingProfile(true);
    setProfile(null);
    axios.get(`${API}/country-profile`, { params: { country_name: country.country } })
      .then(r => {
        if (cancelled) return;
        PROFILE_CACHE.set(country.country, r.data);
        setProfile(r.data);
      })
      .catch(() => {
        if (cancelled) return;
        const fallback = { military_branches: [], contracts: [], companies: [], news: [] };
        PROFILE_CACHE.set(country.country, fallback);
        setProfile(fallback);
      })
      .finally(() => { if (!cancelled) setLoadingProfile(false); });
    return () => { cancelled = true; };
  }, [country.country]);

  // Fetch banner image URL from Wikipedia API — skip if already cached
  useEffect(() => {
    if (BANNER_CACHE.has(country.country)) return;
    let cancelled = false;
    const article = getCountryWikiArticle(country.country);
    fetch(
      `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(article)}&pithumbsize=1280&format=json&origin=*`
    )
      .then(r => r.json())
      .then(data => {
        if (cancelled) return;
        const url = Object.values(data?.query?.pages || {})[0]?.thumbnail?.source;
        BANNER_CACHE.set(country.country, url ?? "");
        if (url) setBannerUrl(url);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [country.country]);

  const regionalPeers = useMemo(() =>
    allExpenditures
      .filter(e => e.region === country.region)
      .sort((a, b) => b.expenditure - a.expenditure)
      .filter((e, idx, arr) => arr.findIndex(x => x.country_code === e.country_code) === idx)
      .slice(0, 10),
    [allExpenditures, country.region]
  );

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
              <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                <p className="text-sm text-white/70">{country.region} · Defense Profile</p>
                {NATO_MEMBERS.has(country.country_code) && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-700/60 text-blue-100 border border-blue-500/40 uppercase tracking-wide">NATO</span>
                )}
                {AUKUS_MEMBERS.has(country.country_code) && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-sky-600/60 text-sky-100 border border-sky-500/40 uppercase tracking-wide">AUKUS</span>
                )}
                {QUAD_MEMBERS.has(country.country_code) && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-600/60 text-indigo-100 border border-indigo-500/40 uppercase tracking-wide">QUAD</span>
                )}
                {FIVEEYES_MEMBERS.has(country.country_code) && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-700/60 text-emerald-100 border border-emerald-500/40 uppercase tracking-wide">Five Eyes</span>
                )}
                {SCO_MEMBERS.has(country.country_code) && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-700/60 text-rose-100 border border-rose-500/40 uppercase tracking-wide">SCO</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-right">
            <div className="text-right">
              <p className="text-xl font-mono font-bold text-white">${country.expenditure}B</p>
              <p className="text-xs text-white/60">Budget {country.year}</p>
            </div>
            <div className="text-right">
              <p className={`text-xl font-mono font-bold ${
                country.gdp_percent >= 4 ? "text-rose-300" :
                country.gdp_percent >= 2.5 ? "text-amber-300" :
                country.gdp_percent >= 2 ? "text-emerald-300" :
                "text-yellow-200"
              }`}>
                {country.gdp_percent}%
              </p>
              <p className="text-xs text-white/60">of GDP</p>
            </div>
            {YOY_DELTA[country.country_code] != null && (
              <div className="text-right border-l border-white/20 pl-4">
                <p className={`text-base font-mono font-bold ${YOY_DELTA[country.country_code] >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                  {YOY_DELTA[country.country_code] >= 0 ? '▲' : '▼'} {Math.abs(YOY_DELTA[country.country_code]).toFixed(1)}%
                </p>
                <p className="text-xs text-white/60">vs 2023</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contracts & Regulations quick-access */}
      {onOpenContractsSheet && (
        <div className="flex justify-end">
          <button
            onClick={() => onOpenContractsSheet(country)}
            className="flex items-center gap-2 text-xs font-semibold text-blue-700 hover:text-blue-900 bg-white border border-blue-200 hover:border-blue-400 px-3 py-1.5 rounded-lg shadow-sm transition-all"
          >
            <FileCheck className="w-3.5 h-3.5" />
            Contracts &amp; Regulations
          </button>
        </div>
      )}

      {/* Defense Capabilities Infographic */}
      <DefenseCapabilitiesCard countryCode={country.country_code} countryName={country.country} />

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
                <BarChart data={regionalPeers} layout="vertical" margin={{ top: 12, left: 4, right: 8, bottom: 4 }}>
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
                    interval={0}
                    tick={(props) => <CustomizedFlagTick {...props} nameMap={Object.fromEntries(regionalPeers.map(e => [e.country_code, e.country]))} />}
                    axisLine={false}
                    tickLine={false}
                    width={116}
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
                        fill={entry.country_code === country.country_code ? '#1e40af' : '#BFDBFE'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-700 inline-block" />
              {country.country} highlighted
              <span className="w-2 h-2 rounded-full bg-blue-200 inline-block ml-2" />
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
                                  State conglomerate
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
              {profile.news
                .filter(((seen) => (a) => {
                  const key = (a.title ?? '').toLowerCase().replace(/\s+/g, ' ').trim().slice(0, 60);
                  if (seen.has(key)) return false;
                  seen.add(key);
                  return true;
                })(new Set()))
                .slice(0, 6)
                .map((article, i) => (
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

// ── Alliance Tracker ─────────────────────────────────────────────────────────

const ALLIANCES = [
  {
    id: "nato",
    name: "NATO",
    fullName: "North Atlantic Treaty Organization",
    members: NATO_MEMBERS,
    accentBg: "bg-blue-700",
    accentText: "text-white",
    borderActive: "border-blue-300",
    bgActive: "bg-blue-50",
    dot: "bg-blue-700",
    gdpTarget: 2,
    founded: "1949",
    hq: "Brussels, Belgium",
  },
  {
    id: "aukus",
    name: "AUKUS",
    fullName: "Australia–UK–US Security Pact",
    members: AUKUS_MEMBERS,
    accentBg: "bg-indigo-600",
    accentText: "text-white",
    borderActive: "border-indigo-300",
    bgActive: "bg-indigo-50",
    dot: "bg-indigo-600",
    founded: "2021",
    hq: "No permanent HQ",
  },
  {
    id: "quad",
    name: "Quad",
    fullName: "Quadrilateral Security Dialogue",
    members: QUAD_MEMBERS,
    accentBg: "bg-amber-600",
    accentText: "text-white",
    borderActive: "border-amber-300",
    bgActive: "bg-amber-50",
    dot: "bg-amber-600",
    founded: "2007",
    hq: "No permanent HQ",
  },
  {
    id: "fiveeyes",
    name: "Five Eyes",
    fullName: "FVEY Intelligence Alliance",
    members: FIVEEYES_MEMBERS,
    accentBg: "bg-teal-700",
    accentText: "text-white",
    borderActive: "border-teal-300",
    bgActive: "bg-teal-50",
    dot: "bg-teal-700",
    founded: "1946",
    hq: "No permanent HQ",
  },
  {
    id: "sco",
    name: "SCO",
    fullName: "Shanghai Cooperation Organisation",
    members: SCO_MEMBERS,
    accentBg: "bg-rose-700",
    accentText: "text-white",
    borderActive: "border-rose-300",
    bgActive: "bg-rose-50",
    dot: "bg-rose-700",
    founded: "2001",
    hq: "Beijing, China",
  },
];

function AllianceTracker({ expenditures, onCountryClick }) {
  const [activeId, setActiveId] = useState(null);

  const spendByCode = useMemo(() => {
    const m = {};
    expenditures.forEach(e => { m[e.country_code] = e; });
    return m;
  }, [expenditures]);

  const active = ALLIANCES.find(a => a.id === activeId);

  const memberRows = useMemo(() => {
    if (!active) return [];
    return [...active.members]
      .map(code => spendByCode[code])
      .filter(Boolean)
      .sort((a, b) => b.expenditure - a.expenditure);
  }, [active, spendByCode]);

  const totalBudget = useMemo(() =>
    memberRows.reduce((s, e) => s + (e.expenditure || 0), 0).toFixed(0),
    [memberRows]
  );

  const natoCompliance = useMemo(() => {
    if (activeId !== "nato" || !memberRows.length) return null;
    const meeting = memberRows.filter(e => e.gdp_percent >= 2);
    return { meeting: meeting.length, total: memberRows.length };
  }, [activeId, memberRows]);

  return (
    <div className="space-y-3">
      {/* Alliance selector row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {ALLIANCES.map(alliance => {
          const inView = [...alliance.members].filter(c => spendByCode[c]).length;
          const total = [...alliance.members].reduce((s, c) => s + (spendByCode[c]?.expenditure || 0), 0);
          const isActive = activeId === alliance.id;
          return (
            <button
              key={alliance.id}
              onClick={() => setActiveId(isActive ? null : alliance.id)}
              className={`relative text-left rounded-xl border p-3 transition-all hover:shadow-md ${
                isActive
                  ? `${alliance.borderActive} ${alliance.bgActive} shadow-sm`
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-start justify-between gap-1 mb-2">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${alliance.accentBg} ${alliance.accentText} uppercase tracking-wide`}>
                  {alliance.name}
                </span>
                <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">{inView} tracked</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-tight mb-2 line-clamp-1">{alliance.fullName}</p>
              <p className="text-sm font-bold font-mono text-slate-900">
                ${total >= 1000 ? `${(total / 1000).toFixed(1)}T` : `${Math.round(total)}B`}
              </p>
              <p className="text-[10px] text-slate-400">combined budget</p>
              {isActive && (
                <span className={`absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full ${alliance.dot}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Expanded member panel */}
      {active && memberRows.length > 0 && (
        <Card className={`border ${active.borderActive} bg-white shadow-sm`}>
          <CardHeader className="border-b border-slate-100 pb-3 pt-3 px-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${active.accentBg} ${active.accentText} uppercase tracking-wide`}>
                  {active.name}
                </span>
                <span className="text-sm font-semibold text-slate-800">{active.fullName}</span>
                <span className="text-xs text-slate-400">· est. {active.founded}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span>{memberRows.length} of {active.members.size} members tracked</span>
                <span className="font-mono font-semibold text-slate-700">
                  ${totalBudget >= 1000 ? `${(totalBudget / 1000).toFixed(1)}T` : `${totalBudget}B`} total
                </span>
              </div>
            </div>
            {natoCompliance && (
              <div className="flex items-center gap-2 mt-2">
                <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all"
                    style={{ width: `${(natoCompliance.meeting / natoCompliance.total) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">
                  {natoCompliance.meeting}/{natoCompliance.total} meeting 2% GDP target
                </span>
              </div>
            )}
          </CardHeader>
          <CardContent className="p-3">
            <div className="flex flex-wrap gap-1.5">
              {memberRows.map(e => {
                const belowTarget = activeId === "nato" && e.gdp_percent < 2;
                const meetsTarget = activeId === "nato" && e.gdp_percent >= 2;
                return (
                  <button
                    key={e.country_code}
                    onClick={() => onCountryClick(e)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-colors hover:shadow-sm ${
                      meetsTarget
                        ? "border-emerald-200 bg-emerald-50 hover:bg-emerald-100"
                        : belowTarget
                        ? "border-rose-200 bg-rose-50 hover:bg-rose-100"
                        : `border-slate-200 bg-white ${active.bgActive.replace("bg-", "hover:bg-")}`
                    }`}
                  >
                    <img
                      src={getFlag(e.country_code)} alt=""
                      className="w-5 h-3.5 object-cover rounded-sm shrink-0"
                      onError={ev => { ev.target.style.display = 'none'; }}
                    />
                    <span className="text-xs font-medium text-slate-700">{e.country}</span>
                    <span className="text-xs font-mono font-bold text-slate-500">${e.expenditure}B</span>
                    {activeId === "nato" && (
                      <span className={`text-[10px] font-mono font-semibold ${meetsTarget ? "text-emerald-600" : "text-rose-500"}`}>
                        {e.gdp_percent}%
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function Expenditures() {
  const [searchParams] = useSearchParams();
  const [expenditures, setExpenditures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("country") || "");
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [sortBy, setSortBy] = useState("expenditure_desc");
  const [chartMode, setChartMode] = useState("absolute");
  const [mapMode, setMapMode] = useState("absolute");
  const [pinnedCountry, setPinnedCountry] = useState(null);
  const [contractsSheetCountry, setContractsSheetCountry] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const profileRef = useRef(null);
  const PAGE_SIZE = 20;

  const toggleCompare = (exp) => {
    setCompareList(prev => {
      if (prev.some(e => e.country_code === exp.country_code))
        return prev.filter(e => e.country_code !== exp.country_code);
      if (prev.length >= 4) return prev;
      return [...prev, exp];
    });
  };

  // Debounce search input by 300ms to avoid filtering on every keystroke
  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(id);
  }, [searchTerm]);

  const fetchExpenditures = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get(`${API}/expenditures`);
      setExpenditures(response.data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchExpenditures(); }, []);

  const filteredExpenditures = useMemo(() => {
    const perCapita = (e) => POPULATION_M[e.country_code]
      ? (e.expenditure * 1000) / POPULATION_M[e.country_code]
      : 0;
    let filtered = expenditures;
    if (selectedRegion !== "all") {
      filtered = filtered.filter(e => e.region === selectedRegion);
    }
    if (debouncedSearch) {
      const term = debouncedSearch.toLowerCase();
      filtered = filtered.filter(e =>
        e.country.toLowerCase().includes(term) ||
        e.country_code.toLowerCase().includes(term)
      );
    }
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "expenditure_desc": return b.expenditure - a.expenditure;
        case "expenditure_asc": return a.expenditure - b.expenditure;
        case "gdp_desc": return b.gdp_percent - a.gdp_percent;
        case "gdp_asc": return a.gdp_percent - b.gdp_percent;
        case "per_capita_desc": return perCapita(b) - perCapita(a);
        case "per_capita_asc": return perCapita(a) - perCapita(b);
        case "yoy_desc": return (YOY_DELTA[b.country_code] ?? -999) - (YOY_DELTA[a.country_code] ?? -999);
        case "yoy_asc": return (YOY_DELTA[a.country_code] ?? 999) - (YOY_DELTA[b.country_code] ?? 999);
        case "name_asc": return a.country.localeCompare(b.country);
        default: return 0;
      }
    });
  }, [debouncedSearch, selectedRegion, sortBy, expenditures]);

  // Reset to page 1 when filters change
  useEffect(() => { setCurrentPage(1); }, [debouncedSearch, selectedRegion, sortBy]);

  // Single source of truth — all derived computations must use this
  const displayedExpenditures = filteredExpenditures;

  const focusCountry = pinnedCountry
    ?? (filteredExpenditures.length === 1 ? filteredExpenditures[0] : null);

  const handleRowClick = (exp) => {
    setPinnedCountry(prev => prev?.id === exp.id ? null : exp);
    setTimeout(() => profileRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const totalExpenditure = filteredExpenditures.reduce((sum, e) => sum + e.expenditure, 0);
  const avgGdpPercent = filteredExpenditures.length
    ? (filteredExpenditures.reduce((sum, e) => sum + e.gdp_percent, 0) / filteredExpenditures.length).toFixed(1)
    : null;

  const topCountries = [...filteredExpenditures]
    .sort((a, b) => b.expenditure - a.expenditure)
    .filter((e, idx, arr) => arr.findIndex(x => x.country_code === e.country_code) === idx)
    .slice(0, 10);

  const regionData = filteredExpenditures.reduce((acc, exp) => {
    const existing = acc.find(r => r.name === exp.region);
    if (existing) { existing.value += exp.expenditure; }
    else { acc.push({ name: exp.region, value: exp.expenditure }); }
    return acc;
  }, []).sort((a, b) => b.value - a.value);


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
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 rounded-lg px-3 py-2">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-medium">Reference FY {DATA_VINTAGE.expenditure_fy}</span>
            <span className="text-slate-300">|</span>
            <Database className="w-3.5 h-3.5" />
            <span>{SOURCES.SIPRI.label} · {SOURCES.IISS.label} · {SOURCES.NATIONAL.label}</span>
          </div>
          <p className="text-xs text-slate-400 text-right max-w-md">
            Note: reference year may vary by country based on official data availability. Figures in constant USD billions.
            <span className="block mt-0.5">Dataset last reviewed: {DATA_VINTAGE.last_reviewed}.</span>
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">TOTAL SPENDING</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-2">${totalExpenditure.toFixed(1)}B</p>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <Database className="w-3 h-3" /> SIPRI · IISS · NATO · {DATA_VINTAGE.expenditure_fy}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">COUNTRIES</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-2">{filteredExpenditures.length}</p>
            <p className="text-xs text-slate-500 mt-1">
              {filteredExpenditures.length < expenditures.length
                ? `filtered from ${expenditures.length}`
                : `${expenditures.length} countries tracked`}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">AVG % OF GDP</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-2">
              {avgGdpPercent != null ? `${avgGdpPercent}%` : '—'}
            </p>
            <p className="text-xs text-slate-500 mt-1">NATO target: 2%</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">FISCAL YEAR</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-2">
              {filteredExpenditures[0]?.year ?? expenditures[0]?.year ?? '—'}
            </p>
            <p className="text-xs text-slate-500 mt-1">SIPRI · IISS · NATO · {DATA_VINTAGE.expenditure_fy}</p>
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
                    ? [...filteredExpenditures].sort((a, b) => b.gdp_percent - a.gdp_percent).filter((e, idx, arr) => arr.findIndex(x => x.country_code === e.country_code) === idx).slice(0, 10)
                    : topCountries}
                  layout="vertical"
                  margin={{ left: 4, right: 8 }}
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
                    interval={0}
                    tick={(props) => <CustomizedFlagTick {...props} nameMap={Object.fromEntries(filteredExpenditures.map(e => [e.country_code, e.country]))} />}
                    axisLine={false}
                    tickLine={false}
                    width={116}
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
                  <Bar dataKey={chartMode === "gdp" ? "gdp_percent" : "expenditure"} fill="#1e40af" radius={[0, 6, 6, 0]} />
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

      {/* World Map */}
      {!focusCountry && (
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <CardTitle className="font-heading text-lg text-slate-900">Defense Spending — World Map</CardTitle>
                <p className="text-xs text-slate-400 mt-0.5">
                  {displayedExpenditures.length} countries · color = spending intensity · hover = preview · click = full profile
                </p>
              </div>
              <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5">
                <button
                  onClick={() => setMapMode("absolute")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    mapMode === "absolute" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <BarChart2 className="w-3.5 h-3.5" /> $B
                </button>
                <button
                  onClick={() => setMapMode("gdp")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    mapMode === "gdp" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Percent className="w-3.5 h-3.5" /> GDP
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <WorldChoroplethMap
              expenditures={displayedExpenditures}
              mode={mapMode}
              selectedCode={pinnedCountry?.country_code}
              onCountryClick={(entry) => {
                setPinnedCountry(prev => prev?.id === entry.id ? null : entry);
                setTimeout(() => profileRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
              }}
            />
          </CardContent>
        </Card>
      )}

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
        {compareList.length > 0 && (
          <button
            onClick={() => setCompareList([])}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-blue-200 bg-blue-50 text-blue-800 text-xs font-semibold hover:bg-blue-100 transition-colors whitespace-nowrap"
          >
            Compare ({compareList.length}) ✕
          </button>
        )}
      </div>

      {/* ── Military Alliances ── */}
      {!focusCountry && <AllianceTracker expenditures={filteredExpenditures} onCountryClick={handleRowClick} />}

      {/* ── Compare Panel ── */}
      {compareList.length >= 2 && (
        <Card className="bg-white border-blue-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-3 bg-blue-50/50">
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading text-base text-slate-900">Country Comparison</CardTitle>
              <button onClick={() => setCompareList([])} className="text-xs text-slate-400 hover:text-slate-700 underline">Clear</button>
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left text-xs text-slate-500 font-semibold uppercase tracking-wider p-3 w-32">Metric</th>
                  {compareList.map(e => (
                    <th key={e.country_code} className="p-3 text-center min-w-[140px]">
                      <div className="flex flex-col items-center gap-1">
                        <img src={getFlag(e.country_code)} alt={e.country} className="w-8 h-5 object-cover rounded shadow-sm" />
                        <span className="text-xs font-semibold text-slate-900">{e.country}</span>
                        {NATO_MEMBERS.has(e.country_code) && (
                          <span className="text-[9px] font-bold px-1 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200 uppercase">NATO</span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Budget', render: e => <span className="font-mono font-bold text-slate-900">${e.expenditure}B</span> },
                  { label: 'YoY vs 2023', render: e => YOY_DELTA[e.country_code] != null ? (
                    <span className={`font-mono font-semibold ${YOY_DELTA[e.country_code] >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {YOY_DELTA[e.country_code] >= 0 ? '▲' : '▼'}{Math.abs(YOY_DELTA[e.country_code]).toFixed(1)}%
                    </span>
                  ) : <span className="text-slate-300">—</span> },
                  { label: '% of GDP', render: e => <span className={`font-mono font-semibold px-2 py-0.5 rounded-full text-xs ${getGdpColor(e.gdp_percent)}`}>{e.gdp_percent}%</span> },
                  { label: 'Per Capita', render: e => POPULATION_M[e.country_code]
                    ? <span className="font-mono text-slate-700">${Math.round((e.expenditure * 1000) / POPULATION_M[e.country_code]).toLocaleString()}</span>
                    : <span className="text-slate-300">—</span> },
                  { label: 'Fighters', render: e => { const cap = getCapabilitySummary(e.country_code); return cap ? <span className="font-mono text-slate-700">{(cap.fighters ?? 0).toLocaleString()}</span> : <span className="text-slate-300">—</span>; } },
                  { label: 'Helicopters', render: e => { const cap = getCapabilitySummary(e.country_code); return cap ? <span className="font-mono text-slate-700">{(cap.helicopters ?? 0).toLocaleString()}</span> : <span className="text-slate-300">—</span>; } },
                  { label: 'Tanks', render: e => { const cap = getCapabilitySummary(e.country_code); return cap ? <span className="font-mono text-slate-700">{(cap.tanks ?? 0).toLocaleString()}</span> : <span className="text-slate-300">—</span>; } },
                  { label: 'Armored', render: e => { const cap = getCapabilitySummary(e.country_code); return cap ? <span className="font-mono text-slate-700">{(cap.armored_vehicles ?? 0).toLocaleString()}</span> : <span className="text-slate-300">—</span>; } },
                  { label: 'Carriers', render: e => { const cap = getCapabilitySummary(e.country_code); return cap ? <span className="font-mono text-slate-700">{(cap.aircraft_carriers ?? 0)}</span> : <span className="text-slate-300">—</span>; } },
                  { label: 'Warships', render: e => { const cap = getCapabilitySummary(e.country_code); return cap ? <span className="font-mono text-slate-700">{(cap.surface_combatants ?? 0)}</span> : <span className="text-slate-300">—</span>; } },
                  { label: 'Submarines', render: e => { const cap = getCapabilitySummary(e.country_code); return cap ? <span className="font-mono text-slate-700">{(cap.submarines ?? 0)}</span> : <span className="text-slate-300">—</span>; } },
                ].map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="p-3 text-xs font-medium text-slate-500">{row.label}</td>
                    {compareList.map(e => (
                      <td key={e.country_code} className="p-3 text-center">{row.render(e)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* ── Country Profile ── */}
      {focusCountry && (
        <div ref={profileRef} style={{ minHeight: '520px' }}>
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
          <CountryProfileSection
            country={focusCountry}
            allExpenditures={expenditures}
            onOpenContractsSheet={setContractsSheetCountry}
          />
        </div>
      )}

      {/* Data Table */}
      <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-slate-100 pb-3 bg-slate-50/50 pt-3 px-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {filteredExpenditures.length} {filteredExpenditures.length === 1 ? 'country' : 'countries'}
            </p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  // Enriched CSV: every row carries its full citation + access
                  // date (academic traceability requirement).
                  const q = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
                  const headers = ['Country', 'Code', 'NATO', 'Region', 'Expenditure ($B)', 'YoY vs 2023 (%)', 'Per Capita ($)', '% GDP', 'Year', 'Source', 'Source citation', 'Accessed'];
                  const rows = filteredExpenditures.map(e => {
                    const pop = POPULATION_M[e.country_code];
                    const pc = pop ? Math.round((e.expenditure * 1000) / pop) : '';
                    const yoy = YOY_DELTA[e.country_code] != null ? YOY_DELTA[e.country_code].toFixed(1) : '';
                    const nato = NATO_MEMBERS.has(e.country_code) ? 'Yes' : 'No';
                    return [e.country, e.country_code, nato, e.region, e.expenditure, yoy, pc, e.gdp_percent, e.year, sourceShortLabel(e.source), citationText(e.source), DATA_VINTAGE.last_reviewed].map(q).join(',');
                  });
                  const csv = [headers.map(q).join(','), ...rows].join('\n');
                  downloadTextFile(`defense-expenditures-${DATA_VINTAGE.expenditure_fy}.csv`, csv, 'text/csv');
                }}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:border-slate-300"
              >
                <Download className="w-3.5 h-3.5" /> CSV
              </button>
              <button
                onClick={() => {
                  const ids = filteredExpenditures.map(e => e.source);
                  downloadTextFile(`defense-expenditures-${DATA_VINTAGE.expenditure_fy}.bib`, buildBibliography(ids, 'bibtex'), 'application/x-bibtex');
                }}
                title="Export bibliographique (Zotero, LaTeX…)"
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:border-slate-300"
              >
                <FileText className="w-3.5 h-3.5" /> BibTeX
              </button>
              <button
                onClick={() => {
                  const ids = filteredExpenditures.map(e => e.source);
                  downloadTextFile(`defense-expenditures-${DATA_VINTAGE.expenditure_fy}.ris`, buildBibliography(ids, 'ris'), 'application/x-research-info-systems');
                }}
                title="Export RIS (EndNote, Mendeley…)"
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:border-slate-300"
              >
                <FileText className="w-3.5 h-3.5" /> RIS
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto" data-testid="expenditures-table">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="w-8 p-2"></th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Country</th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Region</th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Expenditure</th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">YoY</th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Per Capita</th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">% of GDP</th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Year</th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Source</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenditures.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE).map((exp, idx) => (
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
                    <td className="p-2 w-8">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleCompare(exp); }}
                        title={compareList.some(c => c.country_code === exp.country_code) ? 'Remove from compare' : 'Add to compare (max 4)'}
                        className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold transition-colors ${
                          compareList.some(c => c.country_code === exp.country_code)
                            ? 'bg-blue-700 text-white'
                            : 'bg-slate-100 text-slate-400 hover:bg-blue-100 hover:text-blue-700'
                        }`}
                      >
                        {compareList.some(c => c.country_code === exp.country_code) ? '✓' : '+'}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 bg-slate-100 rounded-lg flex items-center justify-center text-xs font-mono text-slate-500 font-medium shrink-0">
                            {(currentPage - 1) * PAGE_SIZE + idx + 1}
                          </span>
                          <img
                            src={getFlag(exp.country_code)}
                            alt={exp.country}
                            className="w-8 h-6 object-cover rounded shadow-sm border border-slate-100 shrink-0"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <p className="text-slate-900 font-medium text-sm">{exp.country}</p>
                              {NATO_MEMBERS.has(exp.country_code) && (
                                <span className="text-[9px] font-bold px-1 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200 uppercase tracking-wide leading-none">NATO</span>
                              )}
                            </div>
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
                      {YOY_DELTA[exp.country_code] != null ? (
                        <span className={`inline-flex items-center gap-0.5 font-mono text-xs font-semibold px-2 py-0.5 rounded-full ${
                          YOY_DELTA[exp.country_code] >= 0
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}>
                          {YOY_DELTA[exp.country_code] >= 0 ? '▲' : '▼'}
                          {Math.abs(YOY_DELTA[exp.country_code]).toFixed(1)}%
                        </span>
                      ) : (
                        <span className="text-xs text-slate-300">—</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      {POPULATION_M[exp.country_code] ? (
                        <span className="font-mono text-sm text-slate-700">
                          ${Math.round((exp.expenditure * 1000) / POPULATION_M[exp.country_code]).toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-300">—</span>
                      )}
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
                        <a
                          href={/sipri/i.test(exp.source) ? spendingSourceLink() : (SOURCES[String(exp.source).toUpperCase()]?.url || spendingSourceLink())}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          title={`${citationText(exp.source)}  —  Opens the source database (filter for ${exp.country}).`}
                          className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 hover:text-blue-900 bg-slate-100 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 px-2 py-0.5 rounded-full transition-colors"
                        >
                          {sourceShortLabel(exp.source)}
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ) : (
                        <span className="text-xs text-slate-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination controls */}
          {filteredExpenditures.length > PAGE_SIZE && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
              <span className="text-xs text-slate-400 font-mono">
                {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filteredExpenditures.length)} of {filteredExpenditures.length} countries
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-2.5 py-1.5 rounded-md text-xs font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  ← Prev
                </button>
                {Array.from({ length: Math.ceil(filteredExpenditures.length / PAGE_SIZE) }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 rounded-md text-xs font-medium transition-colors ${
                      page === currentPage
                        ? 'bg-blue-700 text-white border border-blue-700'
                        : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredExpenditures.length / PAGE_SIZE), p + 1))}
                  disabled={currentPage === Math.ceil(filteredExpenditures.length / PAGE_SIZE)}
                  className="px-2.5 py-1.5 rounded-md text-xs font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* GDP% color legend */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-slate-500 px-1">
        <span className="font-medium text-slate-400 uppercase tracking-wide text-[10px]">% GDP:</span>
        {[
          { color: 'bg-rose-50 text-rose-600', label: '≥ 4%', desc: 'War footing / over-armed' },
          { color: 'bg-amber-50 text-amber-600', label: '2.5 – 4%', desc: 'Above NATO target' },
          { color: 'bg-emerald-50 text-emerald-600', label: '2 – 2.5%', desc: 'NATO target met' },
          { color: 'bg-slate-50 text-slate-600', label: '< 2%', desc: 'Below NATO target' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${item.color}`}>{item.label}</span>
            <span className="text-slate-400">{item.desc}</span>
          </div>
        ))}
      </div>

      {/* Top 5 focus cards */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <CardTitle className="font-heading text-lg text-slate-900">Focus — Top 5 Global Defense Budgets</CardTitle>
            <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-200">
              Source: SIPRI · {filteredExpenditures[0]?.year ?? 2024}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {[...displayedExpenditures]
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
                      onError={e => {
                        e.target.style.display = "none";
                        const span = document.createElement('span');
                        span.textContent = exp.country_code;
                        span.className = 'text-xs font-mono text-slate-500 bg-slate-100 px-1 rounded';
                        e.target.parentNode?.insertBefore(span, e.target.nextSibling);
                      }}
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
      <CountryContractsSheet
        country={contractsSheetCountry}
        onClose={() => setContractsSheetCountry(null)}
      />
    </div>
  );
}
