import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Search,
  Newspaper,
  BookOpen,
  Globe2,
  ShieldCheck,
  BarChart3,
  FileText,
  Calendar,
  ArrowUpRight,
  TrendingUp,
  Lock,
  Unlock,
} from "lucide-react";

// ─── Recent Studies — FREE & openly accessible only ──────────────────────────
const RECENT_STUDIES = [
  {
    id: "sipri-yearbook-2025",
    title: "SIPRI Yearbook 2025",
    subtitle: "Armaments, Disarmament and International Security",
    source: "SIPRI",
    sourceUrl: "https://www.sipri.org",
    date: "2025-06-16",
    url: "https://www.sipri.org/yearbook/2025",
    type: "Annual Report",
    pages: 618,
    tags: ["spending", "nuclear", "arms transfers"],
    highlight: "Global military spending surpassed $2,700 billion in 2024 — a new all-time record.",
    accentColor: "#0d2b4e",
    stripeColor: "#3b82f6",
    logoInitials: "SI",
    free: true,
  },
  {
    id: "nato-expenditure-2025",
    title: "Defence Expenditure of NATO Members 2025",
    subtitle: "Annual data on defence spending across all 32 Alliance members",
    source: "NATO",
    sourceUrl: "https://www.nato.int",
    date: "2025-06-09",
    url: "https://www.nato.int/cps/en/natohq/topics_49198.htm",
    type: "Statistical Report",
    pages: 36,
    tags: ["NATO", "budget", "2% target"],
    highlight: "For the first time, 23 of 32 NATO allies met the 2% of GDP defence spending target.",
    accentColor: "#003478",
    stripeColor: "#60a5fa",
    logoInitials: "NA",
    free: true,
  },
  {
    id: "rand-europe-defence-2025",
    title: "European Defence in an Era of Renewed Great-Power Competition",
    subtitle: "Capabilities, gaps and pathways to strategic autonomy",
    source: "RAND Corporation",
    sourceUrl: "https://www.rand.org",
    date: "2025-03-11",
    url: "https://www.rand.org/topics/european-security.html",
    type: "Research Report",
    pages: 162,
    tags: ["Europe", "capabilities", "gaps"],
    highlight: "European armies face critical shortfalls in air defence, long-range fires and logistics.",
    accentColor: "#14532d",
    stripeColor: "#22c55e",
    logoInitials: "RA",
    free: true,
  },
  {
    id: "csis-dib-2025",
    title: "Defense Industrial Base Assessment 2025",
    subtitle: "Production capacity, workforce, and allied industrial cooperation",
    source: "CSIS",
    sourceUrl: "https://www.csis.org",
    date: "2025-01-28",
    url: "https://www.csis.org/programs/defense-industrial-initiatives-group",
    type: "Policy Brief",
    pages: 64,
    tags: ["USA", "industry", "production"],
    highlight: "US artillery shell output tripled since 2022, but munition stockpile gaps persist across NATO.",
    accentColor: "#1e3a5f",
    stripeColor: "#38bdf8",
    logoInitials: "CS",
    free: true,
  },
  {
    id: "eda-defence-data-2025",
    title: "EDA Defence Data 2025",
    subtitle: "Key figures on European defence expenditure, R&T and procurement",
    source: "EDA",
    sourceUrl: "https://eda.europa.eu",
    date: "2025-04-03",
    url: "https://eda.europa.eu/publications-and-data/defence-data",
    type: "Statistical Report",
    pages: 96,
    tags: ["Europe", "R&D", "procurement"],
    highlight: "EU27 defence spending reached €326 billion in 2024 — up 10% year-on-year.",
    accentColor: "#003399",
    stripeColor: "#facc15",
    logoInitials: "ED",
    free: true,
  },
  {
    id: "irsem-bitd-2025",
    title: "European Defence Industrial Base at the Hour of High-Intensity Warfare",
    subtitle: "Industrial capacity in the face of the return of major conflicts in Europe",
    source: "IRSEM",
    sourceUrl: "https://www.irsem.fr",
    date: "2025-02-20",
    url: "https://www.irsem.fr/en/publications.html",
    type: "Research Report",
    pages: 88,
    tags: ["DTIB", "Europe", "high intensity"],
    highlight: "The European DTIB must double its munitions production capacity by 2026 to meet NATO requirements.",
    accentColor: "#3b1f5e",
    stripeColor: "#a78bfa",
    logoInitials: "IR",
    free: true,
  },
  {
    id: "crs-ukraine-aid-2025",
    title: "U.S. Military Assistance to Ukraine",
    subtitle: "Comprehensive accounting of aid commitments, deliveries and DoD drawdown authority",
    source: "CRS",
    sourceUrl: "https://crsreports.congress.gov",
    date: "2025-03-25",
    url: "https://crsreports.congress.gov/search/#/?terms=ukraine+military&r=3",
    type: "Policy Brief",
    pages: 28,
    tags: ["USA", "Ukraine", "aid"],
    highlight: "The US committed over $61 billion in security assistance to Ukraine since February 2022.",
    accentColor: "#1a3a1a",
    stripeColor: "#86efac",
    logoInitials: "CR",
    free: true,
  },
  {
    id: "atlantic-council-ai-warfare-2025",
    title: "Artificial Intelligence and the Future of Warfare",
    subtitle: "Autonomous systems, AI-enabled ISR and the transformation of military operations",
    source: "Atlantic Council",
    sourceUrl: "https://www.atlanticcouncil.org",
    date: "2025-04-14",
    url: "https://www.atlanticcouncil.org/programs/scowcroft-center-for-strategy-and-security/",
    type: "Research Report",
    pages: 54,
    tags: ["AI", "autonomous", "ISR"],
    highlight: "AI-enabled targeting systems could reduce decision-to-fire cycles from hours to seconds.",
    accentColor: "#1c2e4a",
    stripeColor: "#f97316",
    logoInitials: "AC",
    free: true,
  },
];

// ─── Curated source catalogue ──────────────────────────────────────────────
const CATEGORIES = [
  { id: "all",         label: "All",              icon: Globe2 },
  { id: "press",       label: "Specialty Press",  icon: Newspaper },
  { id: "institution", label: "Institutions",     icon: ShieldCheck },
  { id: "thinktank",   label: "Think Tanks",      icon: BookOpen },
  { id: "market",      label: "Market Data",      icon: BarChart3 },
];

const SOURCES = [
  // ── Specialty Press ────────────────────────────────────────────────────────
  {
    id: "janes",
    name: "Jane's",
    description: "Global reference for defence & security intelligence. Covers equipment programmes, orders of battle and threat assessments across all domains.",
    url: "https://www.janes.com",
    category: "press",
    lang: ["EN"],
    tags: ["equipment", "programmes", "intelligence"],
    paywall: true,
  },
  {
    id: "defensenews",
    name: "Defense News",
    description: "International defence news covering contracts, acquisition policies, and budgets. The reference publication of Sightline Media Group.",
    url: "https://www.defensenews.com",
    category: "press",
    lang: ["EN"],
    tags: ["contracts", "acquisitions", "budget"],
    paywall: false,
  },
  {
    id: "breakingdefense",
    name: "Breaking Defense",
    description: "In-depth coverage of US, European and Indo-Pacific acquisition policies. Strong on Pentagon budget analysis and programme reporting.",
    url: "https://breakingdefense.com",
    category: "press",
    lang: ["EN"],
    tags: ["policy", "budget", "acquisition"],
    paywall: false,
  },
  {
    id: "aviationweek",
    name: "Aviation Week & Space Technology",
    description: "The reference publication for aeronautics, aerospace and defence. Combat aircraft programmes, UAVs, and military space systems.",
    url: "https://aviationweek.com",
    category: "press",
    lang: ["EN"],
    tags: ["aviation", "space", "programmes"],
    paywall: true,
  },
  {
    id: "thewarzone",
    name: "The War Zone (The Drive)",
    description: "Detailed analyses of weapons systems, ongoing conflicts and military doctrine. Exceptionally strong on US technical and operational topics.",
    url: "https://www.thedrive.com/the-war-zone",
    category: "press",
    lang: ["EN"],
    tags: ["systems", "conflicts", "doctrine"],
    paywall: false,
  },
  {
    id: "defenseone",
    name: "Defense One",
    description: "US defence policy and technology news. Pentagon coverage, emerging threats, cyber and future warfare concepts.",
    url: "https://www.defenseone.com",
    category: "press",
    lang: ["EN"],
    tags: ["policy", "cyber", "Pentagon"],
    paywall: false,
  },
  {
    id: "navalnews",
    name: "Naval News",
    description: "Specialised naval defence coverage worldwide. Warships, submarines, aircraft carriers, maritime patrol and naval systems.",
    url: "https://www.navalnews.com",
    category: "press",
    lang: ["EN"],
    tags: ["naval", "maritime", "submarines"],
    paywall: false,
  },
  {
    id: "c4isrnet",
    name: "C4ISRNET",
    description: "US-focused coverage of command, control, communications, computers, ISR, cyber and battlefield networking.",
    url: "https://www.c4isrnet.com",
    category: "press",
    lang: ["EN"],
    tags: ["C4ISR", "cyber", "technology"],
    paywall: false,
  },
  {
    id: "spacenews",
    name: "SpaceNews",
    description: "News on military space programmes, satellite constellations, launch vehicles, space situational awareness and space policy.",
    url: "https://spacenews.com",
    category: "press",
    lang: ["EN"],
    tags: ["space", "satellites", "military"],
    paywall: false,
  },
  {
    id: "opex360",
    name: "Opex 360",
    description: "Leading French-language defence & security news site. External operations, DGA procurement and French armed forces programmes.",
    url: "https://www.opex360.com",
    category: "press",
    lang: ["FR"],
    tags: ["France", "operations", "DGA"],
    paywall: false,
  },
  {
    id: "metadefense",
    name: "Meta-Défense",
    description: "Strategic and industrial analyses of European defence, with a focus on French and European acquisition programmes.",
    url: "https://www.meta-defense.fr",
    category: "press",
    lang: ["FR"],
    tags: ["Europe", "programmes", "industry"],
    paywall: false,
  },
  {
    id: "aircosmos",
    name: "Air & Cosmos",
    description: "The French reference for aerospace and defence. DGA programmes, combat aircraft, military satellites and space policy.",
    url: "https://www.air-cosmos.com",
    category: "press",
    lang: ["FR"],
    tags: ["France", "aviation", "space"],
    paywall: true,
  },
  {
    id: "armyrecognition",
    name: "Army Recognition",
    description: "Global news on ground forces equipment and technology. Armoured fighting vehicles, artillery systems, and dismounted soldier systems.",
    url: "https://www.armyrecognition.com",
    category: "press",
    lang: ["EN"],
    tags: ["land forces", "armour", "artillery"],
    paywall: false,
  },
  {
    id: "shephard",
    name: "Shephard Media",
    description: "UK-based specialist defence and security media covering land, sea, air, C4ISR, training and simulation.",
    url: "https://www.shephardmedia.com",
    category: "press",
    lang: ["EN"],
    tags: ["UK", "systems", "technology"],
    paywall: true,
  },
  {
    id: "euro_sd",
    name: "European Security & Defence",
    description: "German-based publication covering European defence policy, capability programmes and industry developments.",
    url: "https://euro-sd.com",
    category: "press",
    lang: ["EN", "DE"],
    tags: ["Europe", "Germany", "programmes"],
    paywall: false,
  },
  {
    id: "intelligence_online",
    name: "Intelligence Online",
    description: "Specialist journal on the defence industry intelligence, M&A operations and intelligence services activity worldwide.",
    url: "https://www.intelligenceonline.com",
    category: "press",
    lang: ["EN", "FR"],
    tags: ["intelligence", "M&A", "industry"],
    paywall: true,
  },
  {
    id: "europeandefencematters",
    name: "European Defence Matters",
    description: "The magazine of the European Defence Agency. Cooperative programmes, PESCO projects and the European Defence Fund.",
    url: "https://eda.europa.eu/webzine",
    category: "press",
    lang: ["EN"],
    tags: ["Europe", "PESCO", "cooperation"],
    paywall: false,
  },
  {
    id: "kyivindependent_defence",
    name: "Kyiv Independent — Defence",
    description: "Front-line reporting and analysis on the Russia-Ukraine war. Equipment losses, battlefield developments and Western aid tracking.",
    url: "https://kyivindependent.com/tag/military/",
    category: "press",
    lang: ["EN"],
    tags: ["Ukraine", "conflict", "equipment"],
    paywall: false,
  },
  {
    id: "warisboring",
    name: "War Is Boring",
    description: "Long-form journalism on defence, conflicts and military culture. Covers overlooked wars and emerging weapons programmes.",
    url: "https://warisboring.com",
    category: "press",
    lang: ["EN"],
    tags: ["conflicts", "analysis", "journalism"],
    paywall: false,
  },

  // ── Institutions ───────────────────────────────────────────────────────────
  {
    id: "dga",
    name: "DGA – Directorate General of Armaments",
    description: "Official French press releases on armament programmes, awarded contracts, export licences and the annual performance report.",
    url: "https://www.defense.gouv.fr/dga",
    category: "institution",
    lang: ["FR"],
    tags: ["France", "programmes", "contracts"],
    paywall: false,
  },
  {
    id: "nato_newsroom",
    name: "NATO Newsroom",
    description: "Official NATO press releases, speeches, summit communiqués and policy documents. Council decisions, budget commitments and capability targets.",
    url: "https://www.nato.int/cps/en/natohq/news.htm",
    category: "institution",
    lang: ["EN", "FR"],
    tags: ["NATO", "policy", "capabilities"],
    paywall: false,
  },
  {
    id: "dod",
    name: "U.S. Department of Defense — Press Releases",
    description: "Daily contract award announcements, budget news and official Pentagon publications including strategy documents.",
    url: "https://www.defense.gov/News/Releases/",
    category: "institution",
    lang: ["EN"],
    tags: ["USA", "contracts", "budget"],
    paywall: false,
  },
  {
    id: "eda",
    name: "European Defence Agency (EDA)",
    description: "Data on EU defence spending, R&D cooperation, PESCO programmes and collaborative capability development initiatives.",
    url: "https://eda.europa.eu",
    category: "institution",
    lang: ["EN"],
    tags: ["Europe", "R&D", "cooperation"],
    paywall: false,
  },
  {
    id: "uk_mod",
    name: "UK Ministry of Defence",
    description: "Contract announcements, defence strategy and white papers. Annual spending data and Equipment Plan published every year.",
    url: "https://www.gov.uk/government/organisations/ministry-of-defence",
    category: "institution",
    lang: ["EN"],
    tags: ["UK", "contracts", "strategy"],
    paywall: false,
  },
  {
    id: "bundeswehr",
    name: "Bundeswehr / BMVg",
    description: "German Federal Ministry of Defence. Zeitenwende reform programme, major procurement decisions and defence budget developments.",
    url: "https://www.bmvg.de",
    category: "institution",
    lang: ["DE"],
    tags: ["Germany", "programmes", "budget"],
    paywall: false,
  },
  {
    id: "occar",
    name: "OCCAR — Organisation for Joint Armament Cooperation",
    description: "Manages cooperative armament programmes for 8 European nations: A400M, Boxer IFV, FREMM frigates, Eurofighter.",
    url: "https://www.occar.int",
    category: "institution",
    lang: ["EN", "FR"],
    tags: ["Europe", "programmes", "cooperation"],
    paywall: false,
  },
  {
    id: "ministere_armees",
    name: "French Ministry of Armed Forces",
    description: "French defence policy documents, overseas operations, and the Military Programming Law (LPM 2024-2030) implementation.",
    url: "https://www.defense.gouv.fr",
    category: "institution",
    lang: ["FR"],
    tags: ["France", "policy", "LPM"],
    paywall: false,
  },
  {
    id: "crs",
    name: "Congressional Research Service (CRS)",
    description: "Non-partisan research for the US Congress. Defence budgets, weapons programmes, security policy briefs — all free and publicly available.",
    url: "https://crsreports.congress.gov",
    category: "institution",
    lang: ["EN"],
    tags: ["USA", "budget", "policy"],
    paywall: false,
  },
  {
    id: "ec_defence",
    name: "European Commission — Defence Industry & Space",
    description: "EU defence industrial policy, the European Defence Fund (EDF), EDIP and the ReArm Europe / SAFE initiative.",
    url: "https://defence-industry-space.ec.europa.eu",
    category: "institution",
    lang: ["EN", "FR"],
    tags: ["Europe", "EDF", "industry"],
    paywall: false,
  },
  {
    id: "australian_dod",
    name: "Australian Department of Defence",
    description: "Contracts, capability programmes, strategic reviews and the AUKUS nuclear-powered submarine initiative.",
    url: "https://www.defence.gov.au",
    category: "institution",
    lang: ["EN"],
    tags: ["Australia", "AUKUS", "contracts"],
    paywall: false,
  },
  {
    id: "polish_mod",
    name: "Polish Ministry of National Defence",
    description: "Poland's rapid defence modernisation programme — one of the highest defence spending ratios in NATO. K2 tanks, FA-50, HIMARS.",
    url: "https://www.gov.pl/web/national-defence",
    category: "institution",
    lang: ["PL", "EN"],
    tags: ["Poland", "NATO", "modernisation"],
    paywall: false,
  },
  {
    id: "finabel",
    name: "FINABEL — European Army Interoperability Centre",
    description: "European army interoperability coordination body. Doctrinal standardisation and joint operations in support of EU and NATO.",
    url: "https://finabel.org",
    category: "institution",
    lang: ["EN"],
    tags: ["Europe", "army", "interoperability"],
    paywall: false,
  },
  {
    id: "nato_act",
    name: "NATO ACT — Allied Command Transformation",
    description: "NATO's transformation command. Future warfare concepts, capability development, exercises and allied innovation initiatives.",
    url: "https://www.act.nato.int",
    category: "institution",
    lang: ["EN"],
    tags: ["NATO", "transformation", "innovation"],
    paywall: false,
  },
  {
    id: "ukr_mod",
    name: "Ukrainian Ministry of Defence",
    description: "Official communications from the Ukrainian MoD. Battle reports, equipment requests and national defence industry developments.",
    url: "https://www.mil.gov.ua/en/",
    category: "institution",
    lang: ["EN", "UK"],
    tags: ["Ukraine", "war", "updates"],
    paywall: false,
  },

  // ── Think Tanks & Research ─────────────────────────────────────────────────
  {
    id: "sipri",
    name: "SIPRI — Stockholm International Peace Research Institute",
    description: "The global reference database on military spending, arms transfers, nuclear arsenals and armed conflicts. All yearbook data is freely available.",
    url: "https://www.sipri.org",
    category: "thinktank",
    lang: ["EN"],
    tags: ["spending", "transfers", "data"],
    paywall: false,
  },
  {
    id: "iiss",
    name: "IISS — International Institute for Strategic Studies",
    description: "Publishes The Military Balance (annual global capabilities reference) and high-quality strategic analysis and conflict trackers.",
    url: "https://www.iiss.org",
    category: "thinktank",
    lang: ["EN"],
    tags: ["capabilities", "strategy", "Military Balance"],
    paywall: true,
  },
  {
    id: "irsem",
    name: "IRSEM — Strategic Research Institute of the Military School",
    description: "French Ministry of Armed Forces-affiliated think tank. Strategic studies, geopolitics, foreign influence and defence industry.",
    url: "https://www.irsem.fr",
    category: "thinktank",
    lang: ["FR", "EN"],
    tags: ["France", "strategy", "geopolitics"],
    paywall: false,
  },
  {
    id: "ifri_securite",
    name: "IFRI — Security & Defence Programme",
    description: "The French Institute of International Relations. Research on the European DTIB, strategic autonomy and transatlantic relations.",
    url: "https://www.ifri.org/fr/espaces-thematiques/securite-defense",
    category: "thinktank",
    lang: ["FR", "EN"],
    tags: ["Europe", "DTIB", "strategic autonomy"],
    paywall: false,
  },
  {
    id: "csis",
    name: "CSIS — Center for Strategic and International Studies",
    description: "Washington-based think tank. Defence industrial base, acquisition reform, Indo-Pacific security, missile defence and cyber.",
    url: "https://www.csis.org/programs/defense-industrial-initiatives-group",
    category: "thinktank",
    lang: ["EN"],
    tags: ["USA", "acquisition", "industry"],
    paywall: false,
  },
  {
    id: "rand",
    name: "RAND Corporation",
    description: "In-depth studies on capability planning, deterrence, acquisition policy and military strategy. All reports freely downloadable.",
    url: "https://www.rand.org/topics/military.html",
    category: "thinktank",
    lang: ["EN"],
    tags: ["planning", "acquisition", "deterrence"],
    paywall: false,
  },
  {
    id: "fondation_recherche",
    name: "FRS — Foundation for Strategic Research",
    description: "French expertise in non-proliferation, nuclear strategy, arms control, space security and export controls.",
    url: "https://www.frstrategie.org",
    category: "thinktank",
    lang: ["FR"],
    tags: ["nuclear", "export controls", "arms control"],
    paywall: false,
  },
  {
    id: "atlantic_council",
    name: "Atlantic Council — Scowcroft Center",
    description: "Transatlantic security, NATO cohesion, emerging defence technology and threat assessment from the premier transatlantic think tank.",
    url: "https://www.atlanticcouncil.org/programs/scowcroft-center-for-strategy-and-security/",
    category: "thinktank",
    lang: ["EN"],
    tags: ["NATO", "transatlantic", "strategy"],
    paywall: false,
  },
  {
    id: "cnas",
    name: "CNAS — Center for a New American Security",
    description: "US defence strategy, AI and autonomy in warfare, force design, Indo-Pacific competition and future warfare concepts.",
    url: "https://www.cnas.org",
    category: "thinktank",
    lang: ["EN"],
    tags: ["USA", "AI", "strategy"],
    paywall: false,
  },
  {
    id: "chathamhouse",
    name: "Chatham House — Defence & Security",
    description: "The Royal Institute of International Affairs. UK-focused defence, international security and strategic policy research.",
    url: "https://www.chathamhouse.org/topics/defence-security",
    category: "thinktank",
    lang: ["EN"],
    tags: ["UK", "security", "policy"],
    paywall: false,
  },
  {
    id: "ecfr",
    name: "ECFR — European Council on Foreign Relations",
    description: "Pan-European think tank covering strategic autonomy, European defence integration, geopolitics and EU foreign policy.",
    url: "https://ecfr.eu/topics/security-and-defence/",
    category: "thinktank",
    lang: ["EN"],
    tags: ["Europe", "autonomy", "geopolitics"],
    paywall: false,
  },
  {
    id: "carnegie",
    name: "Carnegie Endowment for International Peace",
    description: "Authoritative analysis on nuclear policy, arms control, proliferation risks and global security threats.",
    url: "https://carnegieendowment.org/topics/nuclear-policy",
    category: "thinktank",
    lang: ["EN"],
    tags: ["nuclear", "arms control", "security"],
    paywall: false,
  },
  {
    id: "swp",
    name: "SWP — German Institute for International and Security Affairs",
    description: "Germany's leading foreign and security policy think tank. European defence integration, NATO strategy and German security policy.",
    url: "https://www.swp-berlin.org/en",
    category: "thinktank",
    lang: ["EN", "DE"],
    tags: ["Germany", "Europe", "security"],
    paywall: false,
  },
  {
    id: "dgap",
    name: "DGAP — German Council on Foreign Relations",
    description: "Research on German and European security policy, defence industry competitiveness, and NATO burden-sharing.",
    url: "https://dgap.org/en/research/programs/security-defense",
    category: "thinktank",
    lang: ["EN", "DE"],
    tags: ["Germany", "Europe", "defence"],
    paywall: false,
  },
  {
    id: "iep_crisis",
    name: "ICSR — International Centre for the Study of Radicalisation",
    description: "King's College London. Conflict monitoring, foreign fighters, terrorist financing and the evolving threat landscape.",
    url: "https://icsr.info",
    category: "thinktank",
    lang: ["EN"],
    tags: ["radicalisation", "terrorism", "conflict"],
    paywall: false,
  },
  {
    id: "acled",
    name: "ACLED — Armed Conflict Location & Event Data",
    description: "Real-time conflict data and crisis mapping for over 100 countries. Tracks battles, explosions, protests and strategic developments.",
    url: "https://acleddata.com",
    category: "thinktank",
    lang: ["EN"],
    tags: ["conflict data", "mapping", "real-time"],
    paywall: false,
  },
  {
    id: "ipi",
    name: "International Peace Institute (IPI)",
    description: "Independent think tank on peace, security and development. UN peacekeeping, multilateral frameworks and conflict prevention.",
    url: "https://www.ipinst.org",
    category: "thinktank",
    lang: ["EN"],
    tags: ["UN", "peacekeeping", "prevention"],
    paywall: false,
  },
  {
    id: "rusi",
    name: "RUSI — Royal United Services Institute",
    description: "UK's oldest and most respected defence and security think tank. Battlefield analysis, arms control, nuclear deterrence and defence economics.",
    url: "https://www.rusi.org",
    category: "thinktank",
    lang: ["EN"],
    tags: ["UK", "analysis", "deterrence"],
    paywall: false,
  },
  {
    id: "orion",
    name: "Institut Montaigne — Géopolitique & Défense",
    description: "French liberal think tank with strong defence coverage. European strategic autonomy, French defence industry and NATO relations.",
    url: "https://www.institutmontaigne.org/thematiques/geopolitique-et-defense",
    category: "thinktank",
    lang: ["FR", "EN"],
    tags: ["France", "geopolitics", "industry"],
    paywall: false,
  },

  // ── Market Data ────────────────────────────────────────────────────────────
  {
    id: "sam_gov",
    name: "SAM.gov — U.S. Federal Contract Opportunities",
    description: "The official US source for federal contract opportunities and award notices. Essential for tracking the US defence market.",
    url: "https://sam.gov/content/opportunities",
    category: "market",
    lang: ["EN"],
    tags: ["USA", "contracts", "tenders"],
    paywall: false,
  },
  {
    id: "ted",
    name: "TED — Tenders Electronic Daily (EU)",
    description: "Supplement to the Official Journal of the EU. All European public procurement notices including defence purchases above thresholds.",
    url: "https://ted.europa.eu",
    category: "market",
    lang: ["FR", "EN"],
    tags: ["Europe", "procurement", "tenders"],
    paywall: false,
  },
  {
    id: "nato_nspa",
    name: "NATO Support and Procurement Agency (NSPA)",
    description: "NATO acquisition opportunities, logistics contracts, munitions, fuel and services for Alliance member nations.",
    url: "https://www.nspa.nato.int/business/procurement",
    category: "market",
    lang: ["EN"],
    tags: ["NATO", "logistics", "acquisition"],
    paywall: false,
  },
  {
    id: "aerospace_forecast",
    name: "ASD — AeroSpace and Defence Industries",
    description: "The ASD Eurospace association. Industrial statistics on the European aerospace and defence sector — turnover, employment, R&D.",
    url: "https://www.asd-europe.org",
    category: "market",
    lang: ["EN"],
    tags: ["Europe", "industry", "statistics"],
    paywall: false,
  },
  {
    id: "usaspending",
    name: "USASpending.gov",
    description: "Official database for all US federal spending, searchable by contractor, agency and programme. Covers all DoD contract awards.",
    url: "https://www.usaspending.gov/agency/department-of-defense",
    category: "market",
    lang: ["EN"],
    tags: ["USA", "contracts", "spending"],
    paywall: false,
  },
  {
    id: "cbo",
    name: "Congressional Budget Office (CBO)",
    description: "Non-partisan US budget analysis. Annual assessment of Pentagon spending, programme cost growth and acquisition alternatives.",
    url: "https://www.cbo.gov/topics/defense-and-national-security",
    category: "market",
    lang: ["EN"],
    tags: ["USA", "budget", "analysis"],
    paywall: false,
  },
  {
    id: "boamp",
    name: "BOAMP — French Official Procurement Bulletin",
    description: "The official bulletin for French public procurement notices. Primary source for DGA calls for tender and ministerial contracts.",
    url: "https://www.boamp.fr",
    category: "market",
    lang: ["FR"],
    tags: ["France", "procurement", "DGA"],
    paywall: false,
  },
  {
    id: "globaldata",
    name: "GlobalData — Aerospace & Defence",
    description: "Market intelligence on A&D: revenue forecasts, company profiles, programme tracking and M&A deal analysis.",
    url: "https://www.globaldata.com/industry/aerospace-defense/",
    category: "market",
    lang: ["EN"],
    tags: ["market data", "forecasts", "revenues"],
    paywall: true,
  },
  {
    id: "forecast_intl",
    name: "Forecast International",
    description: "Programme-level defence spending projections and procurement data. Widely used by industry for long-range market planning.",
    url: "https://www.forecastinternational.com",
    category: "market",
    lang: ["EN"],
    tags: ["forecasts", "programmes", "market"],
    paywall: true,
  },
  {
    id: "defenseindustrydaily",
    name: "Defense Industry Daily",
    description: "Independently curated and annotated news on defence contracts, acquisitions and programmes worldwide.",
    url: "https://www.defenseindustrydaily.com",
    category: "market",
    lang: ["EN"],
    tags: ["contracts", "acquisitions", "programmes"],
    paywall: false,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const LANG_COLORS = {
  FR: "bg-blue-50 text-blue-700 border-blue-200",
  EN: "bg-slate-50 text-slate-600 border-slate-200",
  DE: "bg-yellow-50 text-yellow-700 border-yellow-200",
  IT: "bg-green-50 text-green-700 border-green-200",
  PL: "bg-red-50 text-red-700 border-red-200",
  ES: "bg-orange-50 text-orange-700 border-orange-200",
  KO: "bg-cyan-50 text-cyan-700 border-cyan-200",
  UK: "bg-yellow-50 text-yellow-700 border-yellow-300",
};

const TYPE_COLORS = {
  "Annual Report":     "bg-blue-50 text-blue-700 border-blue-200",
  "Research Report":   "bg-violet-50 text-violet-700 border-violet-200",
  "Policy Brief":      "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Statistical Report":"bg-amber-50 text-amber-700 border-amber-200",
};

// Google Favicons API — reliable for all well-known domains
function SourceLogo({ url, size = "sm" }) {
  const domain = url.replace(/^https?:\/\//, "").split("/")[0];
  const [errored, setErrored] = useState(false);
  const dim = size === "lg" ? "w-8 h-8" : "w-5 h-5";
  const px = size === "lg" ? 64 : 32;
  if (errored) return <Globe2 className={`${dim} text-slate-300`} />;
  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=${px}`}
      alt=""
      className={`${dim} object-contain`}
      onError={() => setErrored(true)}
    />
  );
}

function SourceLogoLarge({ url, name }) {
  const domain = url.replace(/^https?:\/\//, "").split("/")[0];
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
        <Globe2 className="w-4 h-4 text-slate-400" />
      </div>
    );
  }
  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
      alt={name}
      className="w-8 h-8 object-contain rounded-md bg-white p-0.5 border border-slate-100"
      onError={() => setErrored(true)}
    />
  );
}

// Pure CSS report cover — zero external dependencies
function ReportCover({ title, source, logoInitials, accentColor, stripeColor, type }) {
  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden select-none"
      style={{ backgroundColor: accentColor || "#1e3a5f" }}
    >
      {/* Top stripe */}
      <div className="h-1.5 w-full flex-shrink-0" style={{ backgroundColor: stripeColor || "#3b82f6" }} />
      {/* Header band */}
      <div className="px-3 pt-3 pb-2 flex items-center gap-2 flex-shrink-0">
        <div
          className="w-5 h-5 rounded-sm flex items-center justify-center text-[7px] font-black flex-shrink-0"
          style={{ backgroundColor: stripeColor, color: accentColor }}
        >
          {logoInitials}
        </div>
        <p className="text-white/70 text-[9px] font-bold uppercase tracking-widest truncate">{source}</p>
      </div>
      {/* Decorative lines */}
      <div className="px-3 flex flex-col gap-0.5 flex-shrink-0">
        <div className="h-px w-full opacity-20" style={{ backgroundColor: stripeColor }} />
        <div className="h-px w-3/4 opacity-10" style={{ backgroundColor: stripeColor }} />
      </div>
      {/* Title */}
      <div className="flex-1 flex flex-col justify-center px-3 py-4 gap-2">
        <p className="text-white font-black text-[11px] leading-tight line-clamp-5 tracking-tight">
          {title}
        </p>
        <div className="h-0.5 w-8 rounded-full" style={{ backgroundColor: stripeColor }} />
      </div>
      {/* Bottom label */}
      <div className="px-3 pb-3 flex-shrink-0">
        <span
          className="text-[8px] font-bold px-1.5 py-0.5 rounded"
          style={{ backgroundColor: stripeColor + "30", color: stripeColor }}
        >
          {type}
        </span>
      </div>
    </div>
  );
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function Follow() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const totalFree = SOURCES.filter(s => !s.paywall).length;

  const filtered = SOURCES.filter(s => {
    const matchCat = activeCategory === "all" || s.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.tags.some(t => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  const countByCategory = Object.fromEntries(
    CATEGORIES.slice(1).map(c => [c.id, SOURCES.filter(s => s.category === c.id).length])
  );

  return (
    <div className="space-y-8 animate-fade-in">

      {/* ── Header ── */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">
            Reference Sources
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Curated catalogue — specialty press, institutions, think tanks &amp; market data
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 max-w-sm">
          <span className="text-amber-500">ℹ</span>
          <span>Direct links to primary publications. No content is reproduced here.</span>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col gap-1">
          <p className="text-2xl font-bold font-mono text-slate-900">{SOURCES.length}</p>
          <p className="text-xs text-slate-500">Total sources</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col gap-1">
          <p className="text-2xl font-bold font-mono text-emerald-600">{totalFree}</p>
          <p className="text-xs text-slate-500">Free access</p>
        </div>
        {CATEGORIES.slice(1).map(cat => (
          <div key={cat.id} className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col gap-1">
            <p className="text-2xl font-bold font-mono text-slate-900">{countByCategory[cat.id]}</p>
            <p className="text-xs text-slate-500">{cat.label}</p>
          </div>
        ))}
      </div>

      {/* ── Recent Studies ── */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <FileText className="w-4 h-4 text-blue-800" />
          <h2 className="font-heading text-lg font-bold text-slate-900">Recent Studies &amp; Reports</h2>
          <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200 ml-1">
            {RECENT_STUDIES.length} free publications
          </Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {RECENT_STUDIES.map(study => (
            <a
              key={study.id}
              href={study.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="flex flex-col rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-200 h-full">
                {/* Cover — portrait format */}
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-slate-100 flex-shrink-0">
                  <ReportCover
                    title={study.title}
                    source={study.source}
                    logoInitials={study.logoInitials}
                    accentColor={study.accentColor}
                    stripeColor={study.stripeColor}
                    type={study.type}
                  />
                  {/* Pages badge */}
                  <div className="absolute top-2 right-2">
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/50 text-white/90">
                      {study.pages}p
                    </span>
                  </div>
                  {/* Free badge */}
                  <div className="absolute bottom-2 left-2">
                    <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-emerald-500/90 text-white">
                      Free
                    </span>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/10 transition-colors duration-200 flex items-end justify-end p-2 opacity-0 group-hover:opacity-100">
                    <ArrowUpRight className="w-5 h-5 text-white drop-shadow" />
                  </div>
                </div>

                {/* Info below cover */}
                <div className="p-2.5 flex flex-col gap-1.5 flex-1">
                  {/* Source logo + name */}
                  <div className="flex items-center gap-1.5">
                    <SourceLogoLarge url={study.sourceUrl} name={study.source} />
                    <p className="text-[9px] font-bold text-blue-800 truncate">{study.source}</p>
                  </div>
                  {/* Title */}
                  <p className="text-[10px] font-semibold text-slate-900 group-hover:text-blue-800 transition-colors leading-snug line-clamp-2">
                    {study.title}
                  </p>
                  {/* Date */}
                  <div className="flex items-center gap-1 text-[9px] text-slate-400">
                    <Calendar className="w-2.5 h-2.5 flex-shrink-0" />
                    <span>{formatDate(study.date)}</span>
                  </div>
                  {/* Highlight */}
                  <div className="mt-auto bg-slate-50 border border-slate-100 rounded-lg px-2 py-1.5">
                    <div className="flex items-start gap-1">
                      <TrendingUp className="w-2.5 h-2.5 text-blue-700 flex-shrink-0 mt-0.5" />
                      <p className="text-[9px] text-slate-600 leading-relaxed line-clamp-3">{study.highlight}</p>
                    </div>
                  </div>
                  {/* Tags */}
                  <div className="flex gap-1 flex-wrap">
                    {study.tags.slice(0, 2).map(tag => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-[8px] px-1 py-0 bg-slate-50 text-slate-500 border border-slate-100 font-normal"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="border-t border-slate-200" />

      {/* ── Search + Category filters ── */}
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
            const count = cat.id === "all" ? SOURCES.length : (countByCategory[cat.id] ?? 0);
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeCategory === cat.id
                    ? "bg-slate-900 text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
                <span className={`ml-0.5 text-[10px] px-1 py-0 rounded font-normal ${activeCategory === cat.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-slate-400 -mt-4">
        {filtered.length} source{filtered.length > 1 ? "s" : ""} shown
      </p>

      {/* ── Source grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(source => {
          const catDef = CATEGORIES.find(c => c.id === source.category);
          const CatIcon = catDef?.icon ?? Globe2;
          return (
            <a
              key={source.id}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <Card className="bg-white border-slate-200 shadow-sm h-full hover:border-blue-200 hover:shadow-lg transition-all duration-200">
                <CardContent className="p-4 flex flex-col gap-3 h-full">
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5 flex-1 min-w-0">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
                        <SourceLogo url={source.url} size="lg" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-slate-900 group-hover:text-blue-800 transition-colors leading-tight">
                          {source.name}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5 font-mono truncate">
                          {source.url.replace("https://", "").replace("http://", "")}
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-blue-500 flex-shrink-0 mt-0.5 transition-colors" />
                  </div>
                  {/* Category chip */}
                  <div className="flex items-center gap-1.5">
                    <CatIcon className="w-3 h-3 text-slate-400" />
                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">{catDef?.label}</span>
                  </div>
                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed flex-1">
                    {source.description}
                  </p>
                  {/* Footer */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                    <div className="flex gap-1 flex-wrap">
                      {source.lang.map(l => (
                        <span
                          key={l}
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${LANG_COLORS[l] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}
                        >
                          {l}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 flex-wrap justify-end">
                      {source.paywall ? (
                        <span className="flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-medium">
                          <Lock className="w-2.5 h-2.5" /> Paid
                        </span>
                      ) : (
                        <span className="flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                          <Unlock className="w-2.5 h-2.5" /> Free
                        </span>
                      )}
                      {source.tags.slice(0, 1).map(tag => (
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
          );
        })}
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
