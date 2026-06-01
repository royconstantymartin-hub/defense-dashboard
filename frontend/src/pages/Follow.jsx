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
  TrendingUp,
  Lock,
  Unlock,
  Download,
} from "lucide-react";

// ─── FREE Reports — direct PDF / open-access links only ──────────────────────
const FREE_REPORTS = [
  {
    id: "sipri-yearbook-2025",
    title: "SIPRI Yearbook 2025",
    subtitle: "Armaments, Disarmament and International Security",
    source: "SIPRI",
    sourceUrl: "https://www.sipri.org",
    date: "2025-06-16",
    // Free summary + chapter PDFs available on this page
    url: "https://www.sipri.org/yearbook/2025",
    type: "Annual Report",
    pages: 618,
    tags: ["spending", "nuclear", "arms transfers"],
    highlight: "Global military spending surpassed $2,700 billion in 2024 — a new all-time record.",
    accentColor: "#0d2b4e",
    stripeColor: "#60a5fa",
    spine: "#071a30",
  },
  {
    id: "nato-expenditure-2025",
    title: "Defence Expenditure of NATO Members 2025",
    subtitle: "Annual statistics on defence budgets across 32 allies",
    source: "NATO",
    sourceUrl: "https://www.nato.int",
    date: "2025-06-09",
    // Official free PDF from nato.int
    url: "https://www.nato.int/nato_static_fl2014/assets/pdf/2025/6/pdf/250609-def-exp-2025-en.pdf",
    type: "Statistical Report",
    pages: 36,
    tags: ["NATO", "budget", "2% target"],
    highlight: "23 of 32 NATO allies met the 2% of GDP target in 2025 — first time ever.",
    accentColor: "#003478",
    stripeColor: "#93c5fd",
    spine: "#001f4e",
  },
  {
    id: "rand-ukraine-lessons-2025",
    title: "Lessons from the War in Ukraine for NATO Defence Planning",
    subtitle: "Operational, industrial and doctrinal lessons for European armies",
    source: "RAND Corporation",
    sourceUrl: "https://www.rand.org",
    date: "2025-02-18",
    // Free RAND PDF
    url: "https://www.rand.org/pubs/research_reports/RRA2510-3.html",
    type: "Research Report",
    pages: 184,
    tags: ["Ukraine", "NATO", "doctrine"],
    highlight: "Ukraine war validates combined-arms manoeuvre but exposes Western stockpile and ISR gaps.",
    accentColor: "#1a3d1a",
    stripeColor: "#4ade80",
    spine: "#0f2a0f",
  },
  {
    id: "csis-european-rearmament-2025",
    title: "European Rearmament: Assessing the ReArm Initiative",
    subtitle: "Scale, industrial capacity and credibility of Europe's defence surge",
    source: "CSIS",
    sourceUrl: "https://www.csis.org",
    date: "2025-04-07",
    url: "https://www.csis.org/analysis/european-rearmament",
    type: "Policy Brief",
    pages: 58,
    tags: ["Europe", "rearmament", "EDIP"],
    highlight: "Europe's €800bn ReArm pledge faces a credibility gap without structural procurement reform.",
    accentColor: "#1e3a5f",
    stripeColor: "#38bdf8",
    spine: "#0f2240",
  },
  {
    id: "eda-defence-data-2025",
    title: "EDA Defence Data 2025",
    subtitle: "European defence expenditure, R&T investment and procurement figures",
    source: "EDA",
    sourceUrl: "https://eda.europa.eu",
    date: "2025-04-03",
    url: "https://eda.europa.eu/publications-and-data/defence-data",
    type: "Statistical Report",
    pages: 96,
    tags: ["Europe", "R&D", "procurement"],
    highlight: "EU27 defence spending reached €326 billion in 2024 — a 10% year-on-year increase.",
    accentColor: "#00338a",
    stripeColor: "#fbbf24",
    spine: "#001f5c",
  },
  {
    id: "irsem-dtib-2025",
    title: "European Defence Technological and Industrial Base in a War Economy",
    subtitle: "Capacity, bottlenecks and policy recommendations for the DTIB",
    source: "IRSEM",
    sourceUrl: "https://www.irsem.fr",
    date: "2025-02-20",
    url: "https://www.irsem.fr/en/publications.html",
    type: "Research Report",
    pages: 88,
    tags: ["DTIB", "Europe", "munitions"],
    highlight: "European DTIB must double munitions output by 2026; structural funding reform is critical.",
    accentColor: "#3b1f5e",
    stripeColor: "#a78bfa",
    spine: "#220f3d",
  },
  {
    id: "crs-ukraine-security-2025",
    title: "U.S. Security Assistance to Ukraine: An Overview",
    subtitle: "Aid commitments, drawdown authority and congressional appropriations",
    source: "CRS",
    sourceUrl: "https://crsreports.congress.gov",
    date: "2025-03-25",
    // Real CRS free report URL
    url: "https://crsreports.congress.gov/product/pdf/IF/IF12040",
    type: "Policy Brief",
    pages: 28,
    tags: ["USA", "Ukraine", "security aid"],
    highlight: "Total US security commitments to Ukraine exceeded $65 billion by early 2025.",
    accentColor: "#1a3a1a",
    stripeColor: "#86efac",
    spine: "#0a220a",
  },
  {
    id: "rusi-drone-warfare-2025",
    title: "Drone Warfare in Ukraine: Tactical Evolution and Strategic Implications",
    subtitle: "Lessons from the first drone-intensive industrial-scale conflict",
    source: "RUSI",
    sourceUrl: "https://www.rusi.org",
    date: "2025-05-12",
    url: "https://www.rusi.org/explore-our-research/publications/special-resources/ukraine-research-group",
    type: "Research Report",
    pages: 72,
    tags: ["drones", "Ukraine", "tactics"],
    highlight: "FPV drones now account for the majority of armour kills on both sides of the front line.",
    accentColor: "#2d1515",
    stripeColor: "#fb923c",
    spine: "#1a0808",
  },
  {
    id: "acled-conflict-2025",
    title: "Global Conflict Tracker 2025",
    subtitle: "Armed conflict trends, hotspots and fatality data worldwide",
    source: "ACLED",
    sourceUrl: "https://acleddata.com",
    date: "2025-01-10",
    url: "https://acleddata.com/conflict-watchlist-2025/",
    type: "Annual Report",
    pages: 44,
    tags: ["conflicts", "data", "global"],
    highlight: "2024 saw record levels of political violence globally, surpassing even the 2022 peak.",
    accentColor: "#1f1f3a",
    stripeColor: "#f472b6",
    spine: "#10102a",
  },
  {
    id: "cnas-ai-weapons-2025",
    title: "AI-Enabled Weapons Systems: Governance and Operational Risks",
    subtitle: "Autonomous targeting, human control thresholds and escalation risks",
    source: "CNAS",
    sourceUrl: "https://www.cnas.org",
    date: "2025-04-22",
    url: "https://www.cnas.org/research/technology-and-national-security",
    type: "Policy Brief",
    pages: 48,
    tags: ["AI", "autonomous systems", "governance"],
    highlight: "Without interoperability standards, allied AI weapons risk fratricide and unintended escalation.",
    accentColor: "#1c2e4a",
    stripeColor: "#f97316",
    spine: "#0e1a2e",
  },
];

// ─── PAID / Subscription reports — scrolling banner ──────────────────────────
const PAID_REPORTS = [
  {
    id: "iiss-military-balance-2025",
    title: "The Military Balance 2025",
    source: "IISS",
    sourceUrl: "https://www.iiss.org",
    url: "https://www.iiss.org/publications/the-military-balance/",
    type: "Annual Report",
    pages: 512,
    accentColor: "#6b1a1a",
    stripeColor: "#fca5a5",
    spine: "#3d0f0f",
  },
  {
    id: "janes-world-armies-2025",
    title: "Jane's World Armies 2025",
    source: "Jane's",
    sourceUrl: "https://www.janes.com",
    url: "https://www.janes.com/defence-news/jane-s-world-armies",
    type: "Reference",
    pages: 1240,
    accentColor: "#1a1a1a",
    stripeColor: "#d4af37",
    spine: "#0a0a0a",
  },
  {
    id: "globaldata-a&d-2025",
    title: "A&D Market Forecasts 2025–2035",
    source: "GlobalData",
    sourceUrl: "https://www.globaldata.com",
    url: "https://www.globaldata.com/industry/aerospace-defense/",
    type: "Market Report",
    pages: 320,
    accentColor: "#0a2744",
    stripeColor: "#67e8f9",
    spine: "#051420",
  },
  {
    id: "forecast-intl-missiles-2025",
    title: "Missiles & Munitions Market Forecast 2025",
    source: "Forecast International",
    sourceUrl: "https://www.forecastinternational.com",
    url: "https://www.forecastinternational.com",
    type: "Market Report",
    pages: 280,
    accentColor: "#1a0a2e",
    stripeColor: "#c084fc",
    spine: "#0d0518",
  },
  {
    id: "shephard-uav-2025",
    title: "UAV Market 2025–2035",
    source: "Shephard Media",
    sourceUrl: "https://www.shephardmedia.com",
    url: "https://www.shephardmedia.com/news/uavonline/",
    type: "Market Report",
    pages: 190,
    accentColor: "#1a2e1a",
    stripeColor: "#86efac",
    spine: "#0a180a",
  },
  {
    id: "aviation-week-forecast-2025",
    title: "Aerospace & Defense Forecast 2025",
    source: "Aviation Week",
    sourceUrl: "https://aviationweek.com",
    url: "https://aviationweek.com/defense-space",
    type: "Annual Report",
    pages: 210,
    accentColor: "#2e1a00",
    stripeColor: "#fbbf24",
    spine: "#1a0f00",
  },
  {
    id: "iiss-strategic-survey-2025",
    title: "Strategic Survey 2025",
    source: "IISS",
    sourceUrl: "https://www.iiss.org",
    url: "https://www.iiss.org/publications/strategic-survey/",
    type: "Annual Report",
    pages: 360,
    accentColor: "#6b1a1a",
    stripeColor: "#fca5a5",
    spine: "#3d0f0f",
  },
  {
    id: "janes-defense-budget-2025",
    title: "Jane's Defence Budgets 2025",
    source: "Jane's",
    sourceUrl: "https://www.janes.com",
    url: "https://www.janes.com/defence-news/news-detail/global-defence-budget",
    type: "Reference",
    pages: 480,
    accentColor: "#1a1a1a",
    stripeColor: "#d4af37",
    spine: "#0a0a0a",
  },
];

// ─── Curated source catalogue ──────────────────────────────────────────────
const CATEGORIES = [
  { id: "all",         label: "All",             icon: Globe2 },
  { id: "press",       label: "Specialty Press", icon: Newspaper },
  { id: "institution", label: "Institutions",    icon: ShieldCheck },
  { id: "thinktank",   label: "Think Tanks",     icon: BookOpen },
  { id: "market",      label: "Market Data",     icon: BarChart3 },
];

const SOURCES = [
  // ── Specialty Press ────────────────────────────────────────────────────────
  { id: "janes", name: "Jane's", description: "Global reference for defence & security intelligence. Equipment programmes, orders of battle and threat assessments across all domains.", url: "https://www.janes.com", category: "press", lang: ["EN"], tags: ["equipment", "intelligence"], paywall: true },
  { id: "defensenews", name: "Defense News", description: "International defence news covering contracts, acquisition policies and budgets. The reference publication of Sightline Media Group.", url: "https://www.defensenews.com", category: "press", lang: ["EN"], tags: ["contracts", "budget"], paywall: false },
  { id: "breakingdefense", name: "Breaking Defense", description: "In-depth coverage of US, European and Indo-Pacific acquisition policies. Strong on Pentagon budget analysis and programme reporting.", url: "https://breakingdefense.com", category: "press", lang: ["EN"], tags: ["policy", "acquisition"], paywall: false },
  { id: "aviationweek", name: "Aviation Week & Space Technology", description: "The reference publication for aeronautics, aerospace and defence. Combat aircraft programmes, UAVs and military space systems.", url: "https://aviationweek.com", category: "press", lang: ["EN"], tags: ["aviation", "space"], paywall: true },
  { id: "thewarzone", name: "The War Zone (The Drive)", description: "Detailed analyses of weapons systems, ongoing conflicts and military doctrine. Exceptionally strong on US technical and operational topics.", url: "https://www.thedrive.com/the-war-zone", category: "press", lang: ["EN"], tags: ["systems", "doctrine"], paywall: false },
  { id: "defenseone", name: "Defense One", description: "US defence policy and technology news. Pentagon coverage, emerging threats, cyber and future warfare concepts.", url: "https://www.defenseone.com", category: "press", lang: ["EN"], tags: ["policy", "cyber"], paywall: false },
  { id: "navalnews", name: "Naval News", description: "Specialised naval defence coverage worldwide. Warships, submarines, aircraft carriers and maritime patrol systems.", url: "https://www.navalnews.com", category: "press", lang: ["EN"], tags: ["naval", "submarines"], paywall: false },
  { id: "c4isrnet", name: "C4ISRNET", description: "US-focused coverage of C2, communications, ISR, cyber and battlefield networking.", url: "https://www.c4isrnet.com", category: "press", lang: ["EN"], tags: ["C4ISR", "cyber"], paywall: false },
  { id: "spacenews", name: "SpaceNews", description: "News on military space programmes, satellite constellations, launch vehicles and space policy.", url: "https://spacenews.com", category: "press", lang: ["EN"], tags: ["space", "satellites"], paywall: false },
  { id: "opex360", name: "Opex 360", description: "Leading French-language defence & security news site. External operations, DGA procurement and French armed forces programmes.", url: "https://www.opex360.com", category: "press", lang: ["FR"], tags: ["France", "DGA"], paywall: false },
  { id: "metadefense", name: "Meta-Défense", description: "Strategic and industrial analyses of European defence, focusing on French and European acquisition programmes.", url: "https://www.meta-defense.fr", category: "press", lang: ["FR"], tags: ["Europe", "programmes"], paywall: false },
  { id: "aircosmos", name: "Air & Cosmos", description: "The French reference for aerospace and defence. DGA programmes, combat aircraft, military satellites and space policy.", url: "https://www.air-cosmos.com", category: "press", lang: ["FR"], tags: ["France", "aviation"], paywall: true },
  { id: "armyrecognition", name: "Army Recognition", description: "Global news on ground forces equipment and technology. Armoured vehicles, artillery systems and soldier systems.", url: "https://www.armyrecognition.com", category: "press", lang: ["EN"], tags: ["land forces", "armour"], paywall: false },
  { id: "shephard", name: "Shephard Media", description: "UK-based specialist defence and security media covering land, sea, air, C4ISR, training and simulation.", url: "https://www.shephardmedia.com", category: "press", lang: ["EN"], tags: ["UK", "systems"], paywall: true },
  { id: "euro_sd", name: "European Security & Defence", description: "German-based publication covering European defence policy, capability programmes and industry developments.", url: "https://euro-sd.com", category: "press", lang: ["EN", "DE"], tags: ["Europe", "Germany"], paywall: false },
  { id: "intelligence_online", name: "Intelligence Online", description: "Specialist journal on defence industry intelligence, M&A operations and intelligence services activity worldwide.", url: "https://www.intelligenceonline.com", category: "press", lang: ["EN", "FR"], tags: ["intelligence", "M&A"], paywall: true },
  { id: "europeandefencematters", name: "European Defence Matters", description: "The magazine of the European Defence Agency. Cooperative programmes, PESCO projects and the European Defence Fund.", url: "https://eda.europa.eu/webzine", category: "press", lang: ["EN"], tags: ["Europe", "PESCO"], paywall: false },
  { id: "kyivindependent", name: "Kyiv Independent — Defence", description: "Front-line reporting and analysis on the Russia-Ukraine war. Equipment losses, battlefield developments and Western aid tracking.", url: "https://kyivindependent.com/tag/military/", category: "press", lang: ["EN"], tags: ["Ukraine", "conflict"], paywall: false },
  { id: "warisboring", name: "War Is Boring", description: "Long-form journalism on defence, conflicts and military culture. Covers overlooked wars and emerging weapons programmes.", url: "https://warisboring.com", category: "press", lang: ["EN"], tags: ["conflicts", "journalism"], paywall: false },

  // ── Institutions ───────────────────────────────────────────────────────────
  { id: "dga", name: "DGA – Directorate General of Armaments", description: "Official French press releases on armament programmes, awarded contracts, export licences and the annual performance report.", url: "https://www.defense.gouv.fr/dga", category: "institution", lang: ["FR"], tags: ["France", "contracts"], paywall: false },
  { id: "nato_newsroom", name: "NATO Newsroom", description: "Official NATO press releases, summit communiqués and policy documents. Council decisions, budget commitments and capability targets.", url: "https://www.nato.int/cps/en/natohq/news.htm", category: "institution", lang: ["EN", "FR"], tags: ["NATO", "policy"], paywall: false },
  { id: "dod", name: "U.S. Department of Defense — Press Releases", description: "Daily contract award announcements, budget news and official Pentagon publications including strategy documents.", url: "https://www.defense.gov/News/Releases/", category: "institution", lang: ["EN"], tags: ["USA", "contracts"], paywall: false },
  { id: "eda", name: "European Defence Agency (EDA)", description: "Data on EU defence spending, R&D cooperation, PESCO programmes and collaborative capability development.", url: "https://eda.europa.eu", category: "institution", lang: ["EN"], tags: ["Europe", "R&D"], paywall: false },
  { id: "uk_mod", name: "UK Ministry of Defence", description: "Contract announcements, defence strategy and white papers. Annual spending data and Equipment Plan published every year.", url: "https://www.gov.uk/government/organisations/ministry-of-defence", category: "institution", lang: ["EN"], tags: ["UK", "strategy"], paywall: false },
  { id: "bundeswehr", name: "Bundeswehr / BMVg", description: "German Federal Ministry of Defence. Zeitenwende reform programme, major procurement decisions and defence budget developments.", url: "https://www.bmvg.de", category: "institution", lang: ["DE"], tags: ["Germany", "budget"], paywall: false },
  { id: "occar", name: "OCCAR — Organisation for Joint Armament Cooperation", description: "Manages cooperative armament programmes for 8 European nations: A400M, Boxer IFV, FREMM frigates, Eurofighter.", url: "https://www.occar.int", category: "institution", lang: ["EN", "FR"], tags: ["Europe", "cooperation"], paywall: false },
  { id: "ministere_armees", name: "French Ministry of Armed Forces", description: "French defence policy documents, overseas operations, and the Military Programming Law (LPM 2024-2030) implementation.", url: "https://www.defense.gouv.fr", category: "institution", lang: ["FR"], tags: ["France", "LPM"], paywall: false },
  { id: "crs", name: "Congressional Research Service (CRS)", description: "Non-partisan research for the US Congress. Defence budgets, weapons programmes and security policy briefs — all free and publicly available.", url: "https://crsreports.congress.gov", category: "institution", lang: ["EN"], tags: ["USA", "policy"], paywall: false },
  { id: "ec_defence", name: "European Commission — Defence Industry & Space", description: "EU defence industrial policy, the European Defence Fund (EDF), EDIP and the ReArm Europe / SAFE initiative.", url: "https://defence-industry-space.ec.europa.eu", category: "institution", lang: ["EN", "FR"], tags: ["Europe", "EDF"], paywall: false },
  { id: "australian_dod", name: "Australian Department of Defence", description: "Contracts, capability programmes, strategic reviews and the AUKUS nuclear-powered submarine initiative.", url: "https://www.defence.gov.au", category: "institution", lang: ["EN"], tags: ["Australia", "AUKUS"], paywall: false },
  { id: "polish_mod", name: "Polish Ministry of National Defence", description: "Poland's rapid defence modernisation programme — one of NATO's highest spenders. K2 tanks, FA-50 jets, HIMARS.", url: "https://www.gov.pl/web/national-defence", category: "institution", lang: ["PL", "EN"], tags: ["Poland", "modernisation"], paywall: false },
  { id: "nato_act", name: "NATO ACT — Allied Command Transformation", description: "NATO's transformation command. Future warfare concepts, capability development and allied innovation initiatives.", url: "https://www.act.nato.int", category: "institution", lang: ["EN"], tags: ["NATO", "innovation"], paywall: false },
  { id: "ukr_mod", name: "Ukrainian Ministry of Defence", description: "Official Ukrainian MoD communications. Battle reports, equipment needs and national defence industry developments.", url: "https://www.mil.gov.ua/en/", category: "institution", lang: ["EN", "UK"], tags: ["Ukraine", "war"], paywall: false },
  { id: "finabel", name: "FINABEL — European Army Interoperability Centre", description: "European army interoperability body. Doctrinal standardisation and joint operations in support of EU and NATO.", url: "https://finabel.org", category: "institution", lang: ["EN"], tags: ["Europe", "interoperability"], paywall: false },

  // ── Think Tanks & Research ─────────────────────────────────────────────────
  { id: "sipri", name: "SIPRI — Stockholm International Peace Research Institute", description: "The global reference on military spending, arms transfers, nuclear arsenals and conflicts. All yearbook data freely downloadable.", url: "https://www.sipri.org", category: "thinktank", lang: ["EN"], tags: ["spending", "data"], paywall: false },
  { id: "iiss", name: "IISS — International Institute for Strategic Studies", description: "Publishes The Military Balance and high-quality strategic analysis. Some publications are open-access.", url: "https://www.iiss.org", category: "thinktank", lang: ["EN"], tags: ["capabilities", "strategy"], paywall: true },
  { id: "irsem", name: "IRSEM — Strategic Research Institute of the Military School", description: "French Ministry of Armed Forces-affiliated think tank. Strategic studies, geopolitics, foreign influence and defence industry.", url: "https://www.irsem.fr", category: "thinktank", lang: ["FR", "EN"], tags: ["France", "strategy"], paywall: false },
  { id: "ifri_securite", name: "IFRI — Security & Defence Programme", description: "The French Institute of International Relations. Research on the European DTIB, strategic autonomy and transatlantic relations.", url: "https://www.ifri.org/fr/espaces-thematiques/securite-defense", category: "thinktank", lang: ["FR", "EN"], tags: ["Europe", "DTIB"], paywall: false },
  { id: "csis", name: "CSIS — Center for Strategic and International Studies", description: "Washington-based think tank. Defence industrial base, acquisition reform, Indo-Pacific security and cyber. All reports free.", url: "https://www.csis.org/programs/defense-industrial-initiatives-group", category: "thinktank", lang: ["EN"], tags: ["USA", "industry"], paywall: false },
  { id: "rand", name: "RAND Corporation", description: "In-depth studies on capability planning, deterrence, acquisition and military strategy. All reports freely downloadable as PDF.", url: "https://www.rand.org/topics/military.html", category: "thinktank", lang: ["EN"], tags: ["planning", "deterrence"], paywall: false },
  { id: "rusi", name: "RUSI — Royal United Services Institute", description: "UK's oldest defence and security think tank. Ukraine battlefield analysis, arms control, nuclear deterrence and defence economics.", url: "https://www.rusi.org", category: "thinktank", lang: ["EN"], tags: ["UK", "analysis"], paywall: false },
  { id: "fondation_recherche", name: "FRS — Foundation for Strategic Research", description: "French expertise in non-proliferation, nuclear strategy, arms control, space security and export controls.", url: "https://www.frstrategie.org", category: "thinktank", lang: ["FR"], tags: ["nuclear", "export controls"], paywall: false },
  { id: "atlantic_council", name: "Atlantic Council — Scowcroft Center", description: "Transatlantic security, NATO cohesion and emerging defence technology from the premier transatlantic think tank.", url: "https://www.atlanticcouncil.org/programs/scowcroft-center-for-strategy-and-security/", category: "thinktank", lang: ["EN"], tags: ["NATO", "transatlantic"], paywall: false },
  { id: "cnas", name: "CNAS — Center for a New American Security", description: "US defence strategy, AI and autonomy in warfare, force design, Indo-Pacific competition and future warfare concepts.", url: "https://www.cnas.org", category: "thinktank", lang: ["EN"], tags: ["USA", "AI"], paywall: false },
  { id: "chathamhouse", name: "Chatham House — Defence & Security", description: "The Royal Institute of International Affairs. UK-focused defence, international security and strategic policy research.", url: "https://www.chathamhouse.org/topics/defence-security", category: "thinktank", lang: ["EN"], tags: ["UK", "security"], paywall: false },
  { id: "ecfr", name: "ECFR — European Council on Foreign Relations", description: "Pan-European think tank covering strategic autonomy, European defence integration and geopolitics.", url: "https://ecfr.eu/topics/security-and-defence/", category: "thinktank", lang: ["EN"], tags: ["Europe", "autonomy"], paywall: false },
  { id: "carnegie", name: "Carnegie Endowment for International Peace", description: "Authoritative analysis on nuclear policy, arms control, proliferation risks and global security threats.", url: "https://carnegieendowment.org/topics/nuclear-policy", category: "thinktank", lang: ["EN"], tags: ["nuclear", "arms control"], paywall: false },
  { id: "swp", name: "SWP — German Institute for International and Security Affairs", description: "Germany's leading foreign and security policy think tank. European defence integration and NATO strategy.", url: "https://www.swp-berlin.org/en", category: "thinktank", lang: ["EN", "DE"], tags: ["Germany", "Europe"], paywall: false },
  { id: "acled", name: "ACLED — Armed Conflict Location & Event Data", description: "Real-time conflict data and crisis mapping for over 100 countries. Battles, explosions, protests and strategic developments.", url: "https://acleddata.com", category: "thinktank", lang: ["EN"], tags: ["conflict data", "mapping"], paywall: false },
  { id: "orion", name: "Institut Montaigne — Geopolitics & Defence", description: "French liberal think tank with strong defence coverage. European strategic autonomy and NATO relations.", url: "https://www.institutmontaigne.org/thematiques/geopolitique-et-defense", category: "thinktank", lang: ["FR", "EN"], tags: ["France", "geopolitics"], paywall: false },

  // ── Market Data ────────────────────────────────────────────────────────────
  { id: "sam_gov", name: "SAM.gov — U.S. Federal Contract Opportunities", description: "The official US source for federal contract opportunities and award notices. Essential for tracking the American defence market.", url: "https://sam.gov/content/opportunities", category: "market", lang: ["EN"], tags: ["USA", "contracts"], paywall: false },
  { id: "ted", name: "TED — Tenders Electronic Daily (EU)", description: "Supplement to the Official Journal of the EU. All European public procurement notices including defence purchases.", url: "https://ted.europa.eu", category: "market", lang: ["FR", "EN"], tags: ["Europe", "procurement"], paywall: false },
  { id: "nato_nspa", name: "NATO Support and Procurement Agency (NSPA)", description: "NATO acquisition opportunities, logistics contracts, munitions, fuel and services for Alliance member nations.", url: "https://www.nspa.nato.int/business/procurement", category: "market", lang: ["EN"], tags: ["NATO", "logistics"], paywall: false },
  { id: "usaspending", name: "USASpending.gov", description: "Official database for all US federal spending. Searchable by contractor, agency and programme. Covers all DoD contract awards.", url: "https://www.usaspending.gov/agency/department-of-defense", category: "market", lang: ["EN"], tags: ["USA", "spending"], paywall: false },
  { id: "cbo", name: "Congressional Budget Office (CBO)", description: "Non-partisan US budget analysis. Annual assessment of Pentagon spending, programme cost growth and acquisition alternatives.", url: "https://www.cbo.gov/topics/defense-and-national-security", category: "market", lang: ["EN"], tags: ["USA", "budget"], paywall: false },
  { id: "boamp", name: "BOAMP — French Official Procurement Bulletin", description: "Official bulletin for French public procurement notices. Primary source for DGA calls for tender and ministerial contracts.", url: "https://www.boamp.fr", category: "market", lang: ["FR"], tags: ["France", "DGA"], paywall: false },
  { id: "globaldata", name: "GlobalData — Aerospace & Defence", description: "Market intelligence on A&D: revenue forecasts, company profiles, programme tracking and M&A deal analysis.", url: "https://www.globaldata.com/industry/aerospace-defense/", category: "market", lang: ["EN"], tags: ["forecasts", "revenues"], paywall: true },
  { id: "forecast_intl", name: "Forecast International", description: "Programme-level defence spending projections and procurement data. Widely used by industry for long-range market planning.", url: "https://www.forecastinternational.com", category: "market", lang: ["EN"], tags: ["forecasts", "programmes"], paywall: true },
  { id: "defenseindustrydaily", name: "Defense Industry Daily", description: "Independently curated and annotated news on defence contracts, acquisitions and programmes worldwide.", url: "https://www.defenseindustrydaily.com", category: "market", lang: ["EN"], tags: ["contracts", "acquisitions"], paywall: false },
  { id: "aerospace_forecast", name: "ASD — AeroSpace and Defence Industries", description: "ASD Eurospace association. Industrial statistics on the European A&D sector — turnover, employment and R&D investment.", url: "https://www.asd-europe.org", category: "market", lang: ["EN"], tags: ["Europe", "statistics"], paywall: false },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const LANG_COLORS = {
  FR: "bg-blue-50 text-blue-700 border-blue-200",
  EN: "bg-slate-50 text-slate-600 border-slate-200",
  DE: "bg-yellow-50 text-yellow-700 border-yellow-200",
  IT: "bg-green-50 text-green-700 border-green-200",
  PL: "bg-red-50 text-red-700 border-red-200",
  UK: "bg-yellow-50 text-yellow-700 border-yellow-300",
  ES: "bg-orange-50 text-orange-700 border-orange-200",
  KO: "bg-cyan-50 text-cyan-700 border-cyan-200",
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

// Book miniature — realistic 3D book with spine + cover
function BookCover({ title, source, accentColor, stripeColor, spine, size = "md", paid = false }) {
  const spineW = size === "sm" ? "w-3" : "w-4";
  return (
    <div
      className="relative flex h-full"
      style={{ filter: "drop-shadow(3px 4px 8px rgba(0,0,0,0.35))" }}
    >
      {/* Spine */}
      <div
        className={`${spineW} h-full flex-shrink-0 rounded-l-sm flex flex-col justify-center items-center overflow-hidden`}
        style={{ backgroundColor: spine || "#0a0f1a" }}
      >
        <p
          className="text-white/60 font-bold tracking-widest rotate-180 text-[7px] whitespace-nowrap"
          style={{ writingMode: "vertical-rl" }}
        >
          {source}
        </p>
      </div>

      {/* Cover */}
      <div
        className="flex-1 h-full flex flex-col rounded-r-sm overflow-hidden relative"
        style={{ backgroundColor: accentColor || "#1e3a5f" }}
      >
        {/* Top stripe */}
        <div className="h-1 w-full flex-shrink-0" style={{ backgroundColor: stripeColor }} />

        {/* Source name */}
        <div className="px-2 pt-2 pb-1 flex-shrink-0">
          <p className="text-white/50 font-black uppercase tracking-widest leading-none"
            style={{ fontSize: "7px" }}>
            {source}
          </p>
        </div>

        {/* Title */}
        <div className="flex-1 flex flex-col justify-center px-2 py-1 gap-1.5">
          <p className="text-white font-black leading-tight"
            style={{ fontSize: size === "sm" ? "9px" : "10px" }}>
            {title}
          </p>
          <div className="h-0.5 w-6 rounded-full" style={{ backgroundColor: stripeColor }} />
        </div>

        {/* Bottom */}
        <div className="px-2 pb-2 flex items-center justify-between flex-shrink-0">
          {paid ? (
            <span className="flex items-center gap-0.5 rounded px-1 py-0.5 bg-black/30"
              style={{ fontSize: "7px", color: stripeColor }}>
              <Lock style={{ width: 7, height: 7 }} /> Subscription
            </span>
          ) : (
            <span className="flex items-center gap-0.5 rounded px-1 py-0.5 bg-black/30"
              style={{ fontSize: "7px", color: "#4ade80" }}>
              <Download style={{ width: 7, height: 7 }} /> Free PDF
            </span>
          )}
        </div>

        {/* Right edge gloss */}
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/5" />
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
  const countByCategory = Object.fromEntries(
    CATEGORIES.slice(1).map(c => [c.id, SOURCES.filter(s => s.category === c.id).length])
  );

  const filtered = SOURCES.filter(s => {
    const matchCat = activeCategory === "all" || s.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.tags.some(t => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  // Duplicate for seamless marquee loop
  const marqueeItems = [...PAID_REPORTS, ...PAID_REPORTS];

  return (
    <div className="space-y-8 animate-fade-in">

      {/* ── Header ── */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">Reference Sources</h1>
          <p className="text-slate-500 text-sm mt-1">Curated catalogue — specialty press, institutions, think tanks &amp; market data</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 max-w-sm">
          <span className="text-amber-500">ℹ</span>
          <span>Direct links to primary publications. No content is reproduced here.</span>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-3">
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

      {/* ── Reports section ── */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-800" />
          <h2 className="font-heading text-lg font-bold text-slate-900">Studies &amp; Reports</h2>
        </div>

        {/* FREE REPORTS */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-full">
              <Unlock className="w-3 h-3" /> Free &amp; Open Access — {FREE_REPORTS.length} reports
            </span>
            <p className="text-xs text-slate-400">Direct PDF download or open access</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-3">
            {FREE_REPORTS.map(report => (
              <a
                key={report.id}
                href={report.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
                title={report.title}
              >
                {/* Book card */}
                <div className="flex flex-col gap-0 h-full">
                  {/* Book cover — aspect ratio of a report (A4 portrait) */}
                  <div className="relative w-full aspect-[2/3] group-hover:scale-105 group-hover:-rotate-1 transition-all duration-200">
                    <BookCover
                      title={report.title}
                      source={report.source}
                      accentColor={report.accentColor}
                      stripeColor={report.stripeColor}
                      spine={report.spine}
                      paid={false}
                    />
                  </div>

                  {/* Info below */}
                  <div className="pt-2.5 flex flex-col gap-1.5 px-0.5">
                    {/* Source */}
                    <div className="flex items-center gap-1">
                      <SourceLogo url={report.sourceUrl} size="sm" />
                      <p className="text-[9px] font-bold text-blue-800 truncate">{report.source}</p>
                    </div>

                    {/* Title */}
                    <p className="text-[10px] font-semibold text-slate-800 group-hover:text-blue-800 transition-colors leading-snug line-clamp-2">
                      {report.title}
                    </p>

                    {/* Date + pages */}
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[9px] text-slate-400">{formatDate(report.date)}</span>
                      <span className="text-[9px] font-mono text-slate-400">{report.pages}p</span>
                    </div>

                    {/* Highlight */}
                    <div className="bg-slate-50 border border-slate-100 rounded-md px-1.5 py-1">
                      <div className="flex items-start gap-1">
                        <TrendingUp className="w-2.5 h-2.5 text-blue-700 flex-shrink-0 mt-0.5" />
                        <p className="text-[9px] text-slate-600 leading-relaxed line-clamp-2">{report.highlight}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex gap-1 flex-wrap">
                      {report.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-[8px] px-1 py-0 bg-slate-50 text-slate-500 border border-slate-100 font-normal">
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

        {/* PAID REPORTS — scrolling marquee */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded-full">
              <Lock className="w-3 h-3" /> Subscription / Paid — {PAID_REPORTS.length} references
            </span>
            <p className="text-xs text-slate-400">Institutional subscriptions required</p>
          </div>

          {/* Marquee container */}
          <div className="relative overflow-hidden border border-slate-200 rounded-xl bg-slate-950 py-5 px-0">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

            {/* Scrolling track */}
            <div
              className="flex gap-6 px-6"
              style={{
                animation: "marquee-scroll 40s linear infinite",
                width: "max-content",
              }}
            >
              {marqueeItems.map((report, idx) => (
                <a
                  key={`${report.id}-${idx}`}
                  href={report.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-shrink-0"
                  title={report.title}
                >
                  <div className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-2.5 transition-colors cursor-pointer min-w-[200px]">
                    {/* Mini book */}
                    <div className="w-10 h-14 flex-shrink-0">
                      <BookCover
                        title={report.title}
                        source={report.source}
                        accentColor={report.accentColor}
                        stripeColor={report.stripeColor}
                        spine={report.spine}
                        size="sm"
                        paid={true}
                      />
                    </div>
                    {/* Info */}
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <div className="flex items-center gap-1">
                        <SourceLogo url={report.sourceUrl} size="sm" />
                        <p className="text-[9px] font-bold text-white/50 truncate">{report.source}</p>
                      </div>
                      <p className="text-[10px] font-semibold text-white/80 group-hover:text-white leading-snug line-clamp-2 transition-colors">
                        {report.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[8px] font-mono text-white/30">{report.pages}p</span>
                        <span className="flex items-center gap-0.5 text-[8px] text-amber-400/80">
                          <Lock className="w-2 h-2" /> Paid
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-3 h-3 text-white/20 group-hover:text-white/60 flex-shrink-0 transition-colors" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Marquee keyframe */}
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

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
                  activeCategory === cat.id ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
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

      <p className="text-xs text-slate-400 -mt-4">{filtered.length} source{filtered.length > 1 ? "s" : ""} shown</p>

      {/* ── Source grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(source => {
          const catDef = CATEGORIES.find(c => c.id === source.category);
          const CatIcon = catDef?.icon ?? Globe2;
          return (
            <a key={source.id} href={source.url} target="_blank" rel="noopener noreferrer" className="group block">
              <Card className="bg-white border-slate-200 shadow-sm h-full hover:border-blue-200 hover:shadow-lg transition-all duration-200">
                <CardContent className="p-4 flex flex-col gap-3 h-full">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5 flex-1 min-w-0">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
                        <SourceLogo url={source.url} size="lg" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-slate-900 group-hover:text-blue-800 transition-colors leading-tight">{source.name}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5 font-mono truncate">{source.url.replace("https://", "").replace("http://", "")}</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-blue-500 flex-shrink-0 mt-0.5 transition-colors" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CatIcon className="w-3 h-3 text-slate-400" />
                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">{catDef?.label}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed flex-1">{source.description}</p>
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                    <div className="flex gap-1 flex-wrap">
                      {source.lang.map(l => (
                        <span key={l} className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${LANG_COLORS[l] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}>{l}</span>
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
                        <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0 bg-slate-50 text-slate-500 border border-slate-100 font-normal">{tag}</Badge>
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
