import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Search,
  Newspaper,
  Building2,
  BookOpen,
  Globe2,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

// ─── Curated source catalogue ──────────────────────────────────────────────
// Each source is manually verified and categorised.
// No scraped content — users navigate directly to the primary source.

const CATEGORIES = [
  { id: "all",        label: "All",             icon: Globe2 },
  { id: "press",      label: "Specialty Press", icon: Newspaper },
  { id: "institution",label: "Institutions",    icon: ShieldCheck },
  { id: "thinktank",  label: "Think Tanks",     icon: BookOpen },
  { id: "market",     label: "Market Data",     icon: BarChart3 },
  { id: "industry",   label: "Industry",        icon: Building2 },
];

const SOURCES = [
  // ── Specialty Press ──────────────────────────────────────────────────────
  {
    id: "janes",
    name: "Jane's",
    description: "Global reference for defense & security intelligence. Coverage of equipment, programs, and orders of battle.",
    url: "https://www.janes.com",
    category: "press",
    lang: ["EN"],
    tags: ["equipment", "programs", "intelligence"],
    paywall: true,
  },
  {
    id: "defensenews",
    name: "Defense News",
    description: "International defense news covering contracts, acquisition policies, and budgets. Reference publication of the Sightline Media group.",
    url: "https://www.defensenews.com",
    category: "press",
    lang: ["EN"],
    tags: ["contracts", "acquisitions", "budget"],
    paywall: false,
  },
  {
    id: "breakingdefense",
    name: "Breaking Defense",
    description: "In-depth coverage of US, European and Indo-Pacific acquisition policies. Strong on budget analysis and Pentagon news.",
    url: "https://breakingdefense.com",
    category: "press",
    lang: ["EN"],
    tags: ["policy", "budget", "acquisition"],
    paywall: false,
  },
  {
    id: "aviationweek",
    name: "Aviation Week & Space Technology",
    description: "Reference publication for aeronautics, aerospace and defense. Combat aircraft programs, UAVs, military space.",
    url: "https://aviationweek.com",
    category: "press",
    lang: ["EN"],
    tags: ["aviation", "space", "programs"],
    paywall: true,
  },
  {
    id: "thewarzone",
    name: "The War Zone (The Drive)",
    description: "Detailed analyses of weapons systems, ongoing conflicts, and military doctrine. Very strong on US technical topics.",
    url: "https://www.thedrive.com/the-war-zone",
    category: "press",
    lang: ["EN"],
    tags: ["systems", "conflicts", "doctrine"],
    paywall: false,
  },
  {
    id: "opex360",
    name: "Opex 360",
    description: "Leading French-language defense & security news site. External operations, DGA, and French programs.",
    url: "https://www.opex360.com",
    category: "press",
    lang: ["FR"],
    tags: ["France", "operations", "DGA"],
    paywall: false,
  },
  {
    id: "metadefense",
    name: "Meta-Défense",
    description: "Strategic and industrial analyses of European defense, with a focus on Franco-European programs.",
    url: "https://www.meta-defense.fr",
    category: "press",
    lang: ["FR"],
    tags: ["Europe", "programs", "industry"],
    paywall: false,
  },
  {
    id: "ttj",
    name: "French Official Defense Public Procurement Bulletin (BOAMP)",
    description: "Official bulletin for public procurement notices. Primary source for DGA and ministry calls for tenders.",
    url: "https://www.boamp.fr",
    category: "press",
    lang: ["FR"],
    tags: ["public procurement", "tenders", "DGA"],
    paywall: false,
  },
  {
    id: "europeandefencematters",
    name: "European Defence Matters",
    description: "Magazine of the European Defence Agency. Cooperative programs, PESCO, European Defence Fund.",
    url: "https://eda.europa.eu/webzine",
    category: "press",
    lang: ["EN"],
    tags: ["Europe", "PESCO", "cooperation"],
    paywall: false,
  },

  // ── Institutions ────────────────────────────────────────────────────────
  {
    id: "dga",
    name: "DGA – Directorate General of Armaments",
    description: "Official press releases, armament programs, awarded contracts, annual performance report. French primary source.",
    url: "https://www.defense.gouv.fr/dga",
    category: "institution",
    lang: ["FR"],
    tags: ["France", "programs", "contracts"],
    paywall: false,
  },
  {
    id: "nato_newsroom",
    name: "NATO Newsroom",
    description: "Press releases, speeches, and official NATO documents. Council decisions, budget, and capabilities.",
    url: "https://www.nato.int/cps/en/natohq/news.htm",
    category: "institution",
    lang: ["EN", "FR"],
    tags: ["NATO", "policy", "capabilities"],
    paywall: false,
  },
  {
    id: "dod",
    name: "U.S. Department of Defense – Press Releases",
    description: "Daily contract awards, budget announcements, and official Pentagon publications.",
    url: "https://www.defense.gov/News/Releases/",
    category: "institution",
    lang: ["EN"],
    tags: ["USA", "contracts", "budget"],
    paywall: false,
  },
  {
    id: "eda",
    name: "European Defence Agency (EDA)",
    description: "Data on European defense spending, R&D cooperation, and PESCO programs.",
    url: "https://eda.europa.eu",
    category: "institution",
    lang: ["EN"],
    tags: ["Europe", "R&D", "cooperation"],
    paywall: false,
  },
  {
    id: "uk_mod",
    name: "UK Ministry of Defence",
    description: "Contract announcements, defense strategy, and white papers. Spending data published annually.",
    url: "https://www.gov.uk/government/organisations/ministry-of-defence",
    category: "institution",
    lang: ["EN"],
    tags: ["UK", "contracts", "strategy"],
    paywall: false,
  },
  {
    id: "bundeswehr",
    name: "Bundeswehr / BMVg",
    description: "German Federal Ministry of Defence. Programs, Zeitenwende, and German defense budget.",
    url: "https://www.bmvg.de",
    category: "institution",
    lang: ["DE"],
    tags: ["Germany", "programs", "budget"],
    paywall: false,
  },

  // ── Think Tanks & Research ───────────────────────────────────────────────
  {
    id: "sipri",
    name: "SIPRI – Stockholm International Peace Research Institute",
    description: "Global reference database on military spending, arms transfers, and nuclear arsenals. Free annual data.",
    url: "https://www.sipri.org",
    category: "thinktank",
    lang: ["EN"],
    tags: ["spending", "transfers", "data"],
    paywall: false,
  },
  {
    id: "iiss",
    name: "IISS – International Institute for Strategic Studies",
    description: "Military Balance (annual reference on global military capabilities) and strategic analyses.",
    url: "https://www.iiss.org",
    category: "thinktank",
    lang: ["EN"],
    tags: ["capabilities", "strategy", "Military Balance"],
    paywall: true,
  },
  {
    id: "irsem",
    name: "IRSEM – Strategic Research Institute of the Military School",
    description: "French think tank affiliated with the Ministry of Armed Forces. Strategic studies, geopolitics, and defense industry.",
    url: "https://www.irsem.fr",
    category: "thinktank",
    lang: ["FR", "EN"],
    tags: ["France", "strategy", "geopolitics"],
    paywall: false,
  },
  {
    id: "ifri_securite",
    name: "IFRI – Security & Defence Program",
    description: "French Institute of International Relations. Work on European defense industry, DTIB, and strategic autonomy.",
    url: "https://www.ifri.org/fr/espaces-thematiques/securite-defense",
    category: "thinktank",
    lang: ["FR", "EN"],
    tags: ["Europe", "DTIB", "strategic autonomy"],
    paywall: false,
  },
  {
    id: "csis",
    name: "CSIS – Center for Strategic and International Studies",
    description: "Washington-based think tank. Defense acquisition, industry, Indo-Pacific, and cybersecurity.",
    url: "https://www.csis.org/programs/defense-industrial-initiatives-group",
    category: "thinktank",
    lang: ["EN"],
    tags: ["USA", "acquisition", "industry"],
    paywall: false,
  },
  {
    id: "rand",
    name: "RAND Corporation",
    description: "In-depth studies on acquisition, capability planning, deterrence, and military strategies.",
    url: "https://www.rand.org/topics/military.html",
    category: "thinktank",
    lang: ["EN"],
    tags: ["planning", "acquisition", "deterrence"],
    paywall: false,
  },
  {
    id: "fondation_recherche",
    name: "FRS – Foundation for Strategic Research",
    description: "French expertise in non-proliferation, nuclear strategy, arms control, and export.",
    url: "https://www.frstrategie.org",
    category: "thinktank",
    lang: ["FR"],
    tags: ["nuclear", "export", "arms control"],
    paywall: false,
  },

  // ── Market Data ──────────────────────────────────────────────────────────
  {
    id: "sam_gov",
    name: "SAM.gov – U.S. Federal Contract Opportunities",
    description: "Official US source for federal contract opportunities and awards. Essential for the American defense market.",
    url: "https://sam.gov/content/opportunities",
    category: "market",
    lang: ["EN"],
    tags: ["USA", "contracts", "tenders"],
    paywall: false,
  },
  {
    id: "ted",
    name: "TED – Tenders Electronic Daily (EU)",
    description: "Supplement to the EU Official Journal. European public procurement including defense purchases.",
    url: "https://ted.europa.eu",
    category: "market",
    lang: ["FR", "EN"],
    tags: ["Europe", "public procurement", "tenders"],
    paywall: false,
  },
  {
    id: "nato_nspa",
    name: "NATO Support and Procurement Agency (NSPA)",
    description: "NATO acquisition opportunities, logistics contracts, munitions, and services.",
    url: "https://www.nspa.nato.int/business/procurement",
    category: "market",
    lang: ["EN"],
    tags: ["NATO", "logistics", "acquisition"],
    paywall: false,
  },
  {
    id: "aerospace_forecast",
    name: "Aerospace & Defense Industry Monitor (ASD)",
    description: "ASD Eurospace association. Industrial data on the European aerospace & defense sector.",
    url: "https://www.asd-europe.org",
    category: "market",
    lang: ["EN"],
    tags: ["Europe", "industry", "statistics"],
    paywall: false,
  },

  // ── Industry ─────────────────────────────────────────────────────────────
  {
    id: "airbus_defence",
    name: "Airbus Defence & Space – Newsroom",
    description: "Official Airbus D&S press releases. Programs, contracts, partnerships, and financial results.",
    url: "https://www.airbus.com/en/newsroom",
    category: "industry",
    lang: ["EN", "FR"],
    tags: ["Airbus", "programs", "contracts"],
    paywall: false,
  },
  {
    id: "thales_newsroom",
    name: "Thales Group – Newsroom",
    description: "Thales news: contracts, innovations, results, and partnerships. Defense & security electronics.",
    url: "https://www.thalesgroup.com/en/worldwide/press_releases",
    category: "industry",
    lang: ["EN", "FR"],
    tags: ["Thales", "electronics", "contracts"],
    paywall: false,
  },
  {
    id: "safran_newsroom",
    name: "Safran – News",
    description: "Engines, aeronautical equipment and defense. LEAP, Rafale, and helicopter programs.",
    url: "https://www.safran-group.com/fr/media/actualites",
    category: "industry",
    lang: ["FR", "EN"],
    tags: ["Safran", "engines", "Rafale"],
    paywall: false,
  },
  {
    id: "mbda_newsroom",
    name: "MBDA – Press Releases",
    description: "European missile manufacturer. Meteor, Mistral, ASMP-A, and CAMM contracts and programs.",
    url: "https://www.mbda-systems.com/press-releases/",
    category: "industry",
    lang: ["EN", "FR"],
    tags: ["missiles", "programs", "MBDA"],
    paywall: false,
  },
  {
    id: "bae_systems",
    name: "BAE Systems – News",
    description: "UK's largest defense group. Combat vehicles, warships, fighter aircraft, electronics, and cyber.",
    url: "https://www.baesystems.com/en/media/index",
    category: "industry",
    lang: ["EN"],
    tags: ["BAE Systems", "UK", "vehicles"],
    paywall: false,
  },
  {
    id: "rheinmetall",
    name: "Rheinmetall – News",
    description: "Leading German defense company. Lynx IFV, KF51 Panther, ammunition, and air defense systems.",
    url: "https://www.rheinmetall.com/en/media/news",
    category: "industry",
    lang: ["EN", "DE"],
    tags: ["Rheinmetall", "Germany", "vehicles"],
    paywall: false,
  },
  {
    id: "leonardo",
    name: "Leonardo – Newsroom",
    description: "Italian aerospace and defense company. AW helicopters, electronic warfare, radars, and cyber.",
    url: "https://www.leonardo.com/en/press-release-detail",
    category: "industry",
    lang: ["EN", "IT"],
    tags: ["Leonardo", "Italy", "helicopters"],
    paywall: false,
  },
  {
    id: "rtx",
    name: "RTX (Raytheon Technologies) – News",
    description: "US defense and aerospace giant. Patriot, AMRAAM, Stinger, avionics, and jet engines.",
    url: "https://www.rtx.com/news",
    category: "industry",
    lang: ["EN"],
    tags: ["RTX", "USA", "missiles"],
    paywall: false,
  },
  {
    id: "northrop",
    name: "Northrop Grumman – News",
    description: "US aerospace and defense. B-21 Raider, GBSD ICBM, space systems, and cyber solutions.",
    url: "https://news.northropgrumman.com",
    category: "industry",
    lang: ["EN"],
    tags: ["Northrop", "USA", "aerospace"],
    paywall: false,
  },
  {
    id: "generaldynamics",
    name: "General Dynamics – News",
    description: "US defense conglomerate. Abrams tank, Stryker, submarines (Virginia class), and IT services.",
    url: "https://www.gd.com/news",
    category: "industry",
    lang: ["EN"],
    tags: ["General Dynamics", "USA", "land systems"],
    paywall: false,
  },
  {
    id: "navalgroup",
    name: "Naval Group – Actualités",
    description: "French warship designer and builder. Barracuda-class SSN, FDI frigates, and export programs.",
    url: "https://www.naval-group.com/fr/actualites",
    category: "industry",
    lang: ["FR", "EN"],
    tags: ["Naval Group", "France", "submarines"],
    paywall: false,
  },
  {
    id: "dassault",
    name: "Dassault Aviation – Presse",
    description: "Manufacturer of the Rafale fighter and Falcon business jets. Contracts and export campaigns.",
    url: "https://www.dassault-aviation.com/fr/presse/",
    category: "industry",
    lang: ["FR", "EN"],
    tags: ["Dassault", "Rafale", "aircraft"],
    paywall: false,
  },
  {
    id: "l3harris",
    name: "L3Harris Technologies – News",
    description: "US defense electronics specialist. ISR systems, communications, electronic warfare, and space.",
    url: "https://www.l3harris.com/news",
    category: "industry",
    lang: ["EN"],
    tags: ["L3Harris", "USA", "electronics"],
    paywall: false,
  },
  {
    id: "hanwha",
    name: "Hanwha Aerospace – News",
    description: "South Korean defense company. K9 self-propelled howitzer, K21 IFV, and missile systems.",
    url: "https://www.hanwhaaerospace.com/news",
    category: "industry",
    lang: ["EN", "KO"],
    tags: ["Korea", "systems", "artillery"],
    paywall: false,
  },

  // ── Additional Specialty Press ────────────────────────────────────────────
  {
    id: "defenseone",
    name: "Defense One",
    description: "US defense policy and technology news. Pentagon coverage, cyber threats, and future warfare.",
    url: "https://www.defenseone.com",
    category: "press",
    lang: ["EN"],
    tags: ["policy", "cyber", "Pentagon"],
    paywall: false,
  },
  {
    id: "navalnews",
    name: "Naval News",
    description: "Specialized naval defense coverage. Warships, submarines, carriers, and maritime systems worldwide.",
    url: "https://www.navalnews.com",
    category: "press",
    lang: ["EN"],
    tags: ["naval", "maritime", "warships"],
    paywall: false,
  },
  {
    id: "aircosmos",
    name: "Air & Cosmos",
    description: "French reference for aerospace and defense. DGA programs, combat aircraft, and space.",
    url: "https://www.air-cosmos.com",
    category: "press",
    lang: ["FR"],
    tags: ["France", "aviation", "space"],
    paywall: true,
  },
  {
    id: "c4isrnet",
    name: "C4ISRNET",
    description: "US-focused coverage of command, control, communications, ISR, cyber, and battlefield networks.",
    url: "https://www.c4isrnet.com",
    category: "press",
    lang: ["EN"],
    tags: ["C4ISR", "cyber", "technology"],
    paywall: false,
  },
  {
    id: "armyrecognition",
    name: "Army Recognition",
    description: "Global news on ground forces equipment and technology. AFVs, artillery, and soldier systems.",
    url: "https://www.armyrecognition.com",
    category: "press",
    lang: ["EN"],
    tags: ["ground forces", "equipment", "systems"],
    paywall: false,
  },
  {
    id: "shephard",
    name: "Shephard Media",
    description: "UK-based specialist defense and security media. Land, sea, air, C4ISR, and training.",
    url: "https://www.shephardmedia.com",
    category: "press",
    lang: ["EN"],
    tags: ["UK", "systems", "technology"],
    paywall: true,
  },
  {
    id: "spacenews",
    name: "SpaceNews",
    description: "News on military space programs, satellite constellations, launch vehicles, and space policy.",
    url: "https://spacenews.com",
    category: "press",
    lang: ["EN"],
    tags: ["space", "satellites", "military"],
    paywall: false,
  },
  {
    id: "euro_sd",
    name: "European Security & Defence",
    description: "German-based publication covering European defense policy, programs, and industry.",
    url: "https://euro-sd.com",
    category: "press",
    lang: ["EN", "DE"],
    tags: ["Europe", "Germany", "programs"],
    paywall: false,
  },
  {
    id: "intelligence_online",
    name: "Intelligence Online",
    description: "Specialist journal on defense industry intelligence, M&A operations, and intelligence services.",
    url: "https://www.intelligenceonline.com",
    category: "press",
    lang: ["EN", "FR"],
    tags: ["intelligence", "M&A", "industry"],
    paywall: true,
  },

  // ── Additional Institutions ───────────────────────────────────────────────
  {
    id: "occar",
    name: "OCCAR – Organisation for Joint Armament Cooperation",
    description: "Manages joint armament programs for 8 European nations: A400M, Boxer, FREMM, Eurofighter.",
    url: "https://www.occar.int",
    category: "institution",
    lang: ["EN", "FR"],
    tags: ["Europe", "programs", "cooperation"],
    paywall: false,
  },
  {
    id: "ministere_armees",
    name: "Ministère des Armées (France)",
    description: "French Ministry of Armed Forces. Policy documents, operations, LPM military programming law.",
    url: "https://www.defense.gouv.fr",
    category: "institution",
    lang: ["FR"],
    tags: ["France", "policy", "LPM"],
    paywall: false,
  },
  {
    id: "difesa_it",
    name: "Italian Ministry of Defence",
    description: "Italian defense programs, procurement notices, and official strategic policy documents.",
    url: "https://www.difesa.it",
    category: "institution",
    lang: ["IT"],
    tags: ["Italy", "programs", "procurement"],
    paywall: false,
  },
  {
    id: "polish_mod",
    name: "Polish Ministry of National Defence",
    description: "Poland's rapid defense modernization programs, NATO commitments, and procurement contracts.",
    url: "https://www.gov.pl/web/national-defence",
    category: "institution",
    lang: ["PL", "EN"],
    tags: ["Poland", "NATO", "programs"],
    paywall: false,
  },
  {
    id: "australian_dod",
    name: "Australian Department of Defence",
    description: "Contracts, programs, strategic reviews, and AUKUS submarine initiative from Australia.",
    url: "https://www.defence.gov.au",
    category: "institution",
    lang: ["EN"],
    tags: ["Australia", "AUKUS", "contracts"],
    paywall: false,
  },
  {
    id: "crs",
    name: "Congressional Research Service (CRS)",
    description: "Independent nonpartisan research for the US Congress. Defense budgets, weapons programs, and policy briefs.",
    url: "https://crsreports.congress.gov",
    category: "institution",
    lang: ["EN"],
    tags: ["USA", "budget", "policy"],
    paywall: false,
  },
  {
    id: "ec_defence",
    name: "European Commission – Defence Industry & Space",
    description: "EU defense industrial policy, EDIDP, European Defence Fund (EDF), and EDIP programs.",
    url: "https://defence-industry-space.ec.europa.eu",
    category: "institution",
    lang: ["EN", "FR"],
    tags: ["Europe", "EDF", "industry"],
    paywall: false,
  },
  {
    id: "finabel",
    name: "FINABEL – European Army Interoperability Centre",
    description: "European army interoperability coordination body. Doctrinal standardization and joint operations.",
    url: "https://finabel.org",
    category: "institution",
    lang: ["EN"],
    tags: ["Europe", "army", "interoperability"],
    paywall: false,
  },

  // ── Additional Think Tanks ────────────────────────────────────────────────
  {
    id: "atlantic_council",
    name: "Atlantic Council – Scowcroft Center",
    description: "Transatlantic security, NATO cohesion, and emerging defense technology programs.",
    url: "https://www.atlanticcouncil.org/programs/scowcroft-center-for-strategy-and-security/",
    category: "thinktank",
    lang: ["EN"],
    tags: ["NATO", "transatlantic", "strategy"],
    paywall: false,
  },
  {
    id: "cnas",
    name: "CNAS – Center for a New American Security",
    description: "US defense strategy, AI, autonomous systems, and future warfare concepts.",
    url: "https://www.cnas.org",
    category: "thinktank",
    lang: ["EN"],
    tags: ["USA", "AI", "strategy"],
    paywall: false,
  },
  {
    id: "swp",
    name: "SWP – German Institute for International and Security Affairs",
    description: "Germany's leading foreign and security policy think tank. European defense and NATO.",
    url: "https://www.swp-berlin.org/en",
    category: "thinktank",
    lang: ["EN", "DE"],
    tags: ["Germany", "Europe", "security"],
    paywall: false,
  },
  {
    id: "chathamhouse",
    name: "Chatham House – Defence & Security",
    description: "Royal Institute of International Affairs. UK-focused defense, security, and strategic policy.",
    url: "https://www.chathamhouse.org/topics/defence-security",
    category: "thinktank",
    lang: ["EN"],
    tags: ["UK", "security", "policy"],
    paywall: false,
  },
  {
    id: "ecfr",
    name: "ECFR – European Council on Foreign Relations",
    description: "Pan-European think tank. Strategic autonomy, European defense integration, and geopolitics.",
    url: "https://ecfr.eu/topics/security-and-defence/",
    category: "thinktank",
    lang: ["EN"],
    tags: ["Europe", "autonomy", "geopolitics"],
    paywall: false,
  },
  {
    id: "carnegie",
    name: "Carnegie Endowment for International Peace",
    description: "Analysis on nuclear policy, arms control, proliferation risks, and global security threats.",
    url: "https://carnegieendowment.org/topics/nuclear-policy",
    category: "thinktank",
    lang: ["EN"],
    tags: ["nuclear", "arms control", "security"],
    paywall: false,
  },
  {
    id: "dgap",
    name: "DGAP – German Council on Foreign Relations",
    description: "Research on German and European security policy, defense industry, and NATO strategy.",
    url: "https://dgap.org/en/research/programs/security-defense",
    category: "thinktank",
    lang: ["EN", "DE"],
    tags: ["Germany", "Europe", "defense"],
    paywall: false,
  },

  // ── Additional Market Data ────────────────────────────────────────────────
  {
    id: "defenseindustrydaily",
    name: "Defense Industry Daily",
    description: "Independently curated news on defense contracts, acquisitions, and programs worldwide.",
    url: "https://www.defenseindustrydaily.com",
    category: "market",
    lang: ["EN"],
    tags: ["contracts", "acquisitions", "programs"],
    paywall: false,
  },
  {
    id: "usaspending",
    name: "USASpending.gov",
    description: "Official database for all US federal spending, including DoD contract awards and grants.",
    url: "https://www.usaspending.gov/agency/department-of-defense",
    category: "market",
    lang: ["EN"],
    tags: ["USA", "contracts", "budget"],
    paywall: false,
  },
  {
    id: "globaldata",
    name: "GlobalData – Aerospace & Defence",
    description: "Market intelligence on A&D: revenue forecasts, company profiles, and program tracking.",
    url: "https://www.globaldata.com/industry/aerospace-defense/",
    category: "market",
    lang: ["EN"],
    tags: ["market data", "forecasts", "revenues"],
    paywall: true,
  },
  {
    id: "cbo",
    name: "Congressional Budget Office (CBO)",
    description: "Non-partisan US budget analysis covering defense spending, program cost estimates, and alternatives.",
    url: "https://www.cbo.gov/topics/defense-and-national-security",
    category: "market",
    lang: ["EN"],
    tags: ["USA", "budget", "analysis"],
    paywall: false,
  },
  {
    id: "forecast_intl",
    name: "Forecast International",
    description: "Defense market forecasts and analysis. Program-level spending projections and procurement data.",
    url: "https://www.forecastinternational.com",
    category: "market",
    lang: ["EN"],
    tags: ["forecasts", "market", "programs"],
    paywall: true,
  },
];

// ─── Component ──────────────────────────────────────────────────────────────

const LANG_COLORS = {
  FR: "bg-blue-50 text-blue-700 border-blue-200",
  EN: "bg-slate-50 text-slate-600 border-slate-200",
  DE: "bg-yellow-50 text-yellow-700 border-yellow-200",
  IT: "bg-green-50 text-green-700 border-green-200",
  PL: "bg-red-50 text-red-700 border-red-200",
  ES: "bg-orange-50 text-orange-700 border-orange-200",
  KO: "bg-cyan-50 text-cyan-700 border-cyan-200",
};

function SourceLogo({ url }) {
  const domain = url.replace(/^https?:\/\//, "").split("/")[0];
  const [errored, setErrored] = useState(false);
  if (errored) return <Globe2 className="w-5 h-5 text-slate-300" />;
  return (
    <img
      src={`https://logo.clearbit.com/${domain}`}
      alt=""
      className="w-5 h-5 object-contain"
      onError={() => setErrored(true)}
    />
  );
}

export default function Follow() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = SOURCES.filter(s => {
    const matchCat = activeCategory === "all" || s.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q
      || s.name.toLowerCase().includes(q)
      || s.description.toLowerCase().includes(q)
      || s.tags.some(t => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">
            Reference Sources
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Curated source catalogue — press, institutions, think tanks, market data
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 max-w-sm">
          <span className="text-amber-500">ℹ</span>
          <span>
            These are direct links to primary publications. No content is reproduced here.
          </span>
        </div>
      </div>

      {/* Search + Category filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search a source, tag..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 border-slate-200 text-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeCategory === cat.id
                    ? "bg-purple-700 text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-slate-400">
        {filtered.length} source{filtered.length > 1 ? "s" : ""} shown
      </p>

      {/* Source grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(source => (
          <a
            key={source.id}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <Card className="bg-white border-slate-200 shadow-sm h-full hover:border-purple-300 hover:shadow-md transition-all duration-200">
              <CardContent className="p-4 flex flex-col gap-3 h-full">
                {/* Top row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5 flex-1 min-w-0">
                    <div className="flex-shrink-0 w-8 h-8 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center">
                      <SourceLogo url={source.url} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-slate-900 group-hover:text-purple-700 transition-colors leading-tight">
                        {source.name}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5 font-mono truncate">{source.url.replace("https://", "")}</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-purple-500 flex-shrink-0 mt-0.5 transition-colors" />
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed flex-1">
                  {source.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                  {/* Languages */}
                  <div className="flex gap-1">
                    {source.lang.map(l => (
                      <span
                        key={l}
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${LANG_COLORS[l] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                  {/* Tags + paywall indicator */}
                  <div className="flex items-center gap-1 flex-wrap justify-end">
                    {source.paywall && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-medium">
                        Paid
                      </span>
                    )}
                    {source.tags.slice(0, 2).map(tag => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-[10px] px-1.5 py-0 bg-slate-50 text-slate-500 border border-slate-100 font-normal"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-slate-400">
          <Search className="w-8 h-8 mb-3 opacity-40" />
          <p className="text-sm">No sources match this search.</p>
        </div>
      )}
    </div>
  );
}
