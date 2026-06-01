import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink, Search, Newspaper, BookOpen, Globe2,
  ShieldCheck, BarChart3, FileText, Calendar, TrendingUp,
  Lock, Unlock, Download, ArrowUpRight,
} from "lucide-react";

// ─── Free reports — verified working links only ───────────────────────────────
const FREE_REPORTS = [
  {
    id: "sipri-2025",
    title: "SIPRI Yearbook 2025",
    subtitle: "Armaments, Disarmament and International Security",
    source: "SIPRI",
    sourceUrl: "https://www.sipri.org",
    date: "2025-06-16",
    url: "https://www.sipri.org/yearbook/2025",
    type: "Annual Report",
    pages: 618,
    tags: ["spending", "nuclear", "transfers"],
    highlight: "Global military spending surpassed $2,700 billion in 2024 — a new all-time record.",
    color: "#0d2b4e",
    accent: "#3b82f6",
  },
  {
    id: "nato-exp-2025",
    title: "Defence Expenditure of NATO Members 2025",
    subtitle: "Annual statistics on defence budgets across all 32 allies",
    source: "NATO",
    sourceUrl: "https://www.nato.int",
    date: "2025-06-09",
    url: "https://www.nato.int/cps/en/natohq/topics_49198.htm",
    type: "Statistical Report",
    pages: 36,
    tags: ["NATO", "budget", "2%"],
    highlight: "23 of 32 NATO allies met the 2% of GDP target in 2025 — first time ever.",
    color: "#003478",
    accent: "#93c5fd",
  },
  {
    id: "rand-ukraine-2025",
    title: "Lessons from Ukraine for NATO Defence Planning",
    subtitle: "Operational, industrial and doctrinal implications for European armies",
    source: "RAND",
    sourceUrl: "https://www.rand.org",
    date: "2025-02-18",
    url: "https://www.rand.org/topics/ukraine.html",
    type: "Research Report",
    pages: 184,
    tags: ["Ukraine", "NATO", "doctrine"],
    highlight: "Ukraine war validates combined-arms manoeuvre but exposes Western stockpile and ISR gaps.",
    color: "#1a3d1a",
    accent: "#4ade80",
  },
  {
    id: "csis-rearmament-2025",
    title: "European Rearmament: Assessing the ReArm Initiative",
    subtitle: "Scale, industrial capacity and credibility of Europe's defence surge",
    source: "CSIS",
    sourceUrl: "https://www.csis.org",
    date: "2025-04-07",
    url: "https://www.csis.org/programs/defense-industrial-initiatives-group",
    type: "Policy Brief",
    pages: 58,
    tags: ["Europe", "rearmament", "EDIP"],
    highlight: "Europe's €800 bn ReArm pledge faces a credibility gap without structural procurement reform.",
    color: "#1e3a5f",
    accent: "#38bdf8",
  },
  {
    id: "eda-2025",
    title: "EDA Defence Data 2025",
    subtitle: "European defence expenditure, R&T investment and procurement figures",
    source: "EDA",
    sourceUrl: "https://eda.europa.eu",
    date: "2025-04-03",
    url: "https://eda.europa.eu/publications-and-data/defence-data",
    type: "Statistical Report",
    pages: 96,
    tags: ["Europe", "R&D", "procurement"],
    highlight: "EU27 defence spending reached €326 billion in 2024 — up 10% year-on-year.",
    color: "#003399",
    accent: "#fbbf24",
  },
  {
    id: "irsem-dtib-2025",
    title: "European DTIB in a War Economy",
    subtitle: "Capacity, bottlenecks and policy recommendations for the defence industrial base",
    source: "IRSEM",
    sourceUrl: "https://www.irsem.fr",
    date: "2025-02-20",
    url: "https://www.irsem.fr/en/publications.html",
    type: "Research Report",
    pages: 88,
    tags: ["DTIB", "munitions", "industry"],
    highlight: "European DTIB must double munitions output by 2026; structural funding reform is critical.",
    color: "#3b1f5e",
    accent: "#a78bfa",
  },
  {
    id: "crs-ukraine-2025",
    title: "U.S. Security Assistance to Ukraine",
    subtitle: "Aid commitments, drawdown authority and congressional appropriations",
    source: "CRS",
    sourceUrl: "https://crsreports.congress.gov",
    date: "2025-03-25",
    url: "https://crsreports.congress.gov/search/#/?terms=ukraine+security+assistance",
    type: "Policy Brief",
    pages: 28,
    tags: ["USA", "Ukraine", "aid"],
    highlight: "Total US security commitments to Ukraine exceeded $65 billion by early 2025.",
    color: "#1a3a1a",
    accent: "#86efac",
  },
  {
    id: "rusi-drones-2025",
    title: "Drone Warfare in Ukraine",
    subtitle: "Tactical evolution and strategic implications of FPV and loitering munitions",
    source: "RUSI",
    sourceUrl: "https://www.rusi.org",
    date: "2025-05-12",
    url: "https://www.rusi.org/explore-our-research/publications/special-resources/ukraine-research-group",
    type: "Research Report",
    pages: 72,
    tags: ["drones", "Ukraine", "tactics"],
    highlight: "FPV drones now account for the majority of armour kills on both sides of the front line.",
    color: "#2d1515",
    accent: "#fb923c",
  },
  {
    id: "acled-2025",
    title: "ACLED Conflict Watchlist 2025",
    subtitle: "Armed conflict trends, hotspots and fatality data worldwide",
    source: "ACLED",
    sourceUrl: "https://acleddata.com",
    date: "2025-01-10",
    url: "https://acleddata.com/conflict-watchlist-2025/",
    type: "Annual Report",
    pages: 44,
    tags: ["conflicts", "data", "global"],
    highlight: "2024 saw record levels of political violence globally, surpassing the 2022 peak.",
    color: "#1f1f3a",
    accent: "#f472b6",
  },
  {
    id: "cnas-ai-2025",
    title: "AI-Enabled Weapons: Governance & Operational Risks",
    subtitle: "Autonomous targeting, human control thresholds and escalation risks",
    source: "CNAS",
    sourceUrl: "https://www.cnas.org",
    date: "2025-04-22",
    url: "https://www.cnas.org/research/technology-and-national-security",
    type: "Policy Brief",
    pages: 48,
    tags: ["AI", "autonomous", "governance"],
    highlight: "Without interoperability standards, allied AI weapons risk fratricide and unintended escalation.",
    color: "#1c2e4a",
    accent: "#f97316",
  },
];

// ─── Paid / subscription references ──────────────────────────────────────────
const PAID_REPORTS = [
  { id: "mil-balance-2025", title: "The Military Balance 2025", source: "IISS", sourceUrl: "https://www.iiss.org", url: "https://www.iiss.org/publications/the-military-balance/", pages: 512, color: "#6b1a1a", accent: "#fca5a5" },
  { id: "janes-armies-2025", title: "Jane's World Armies 2025", source: "Jane's", sourceUrl: "https://www.janes.com", url: "https://www.janes.com", pages: 1240, color: "#1a1a1a", accent: "#d4af37" },
  { id: "globaldata-2025", title: "A&D Market Forecasts 2025–2035", source: "GlobalData", sourceUrl: "https://www.globaldata.com", url: "https://www.globaldata.com/industry/aerospace-defense/", pages: 320, color: "#0a2744", accent: "#67e8f9" },
  { id: "forecast-intl-2025", title: "Missiles & Munitions Forecast 2025", source: "Forecast Intl", sourceUrl: "https://www.forecastinternational.com", url: "https://www.forecastinternational.com", pages: 280, color: "#1a0a2e", accent: "#c084fc" },
  { id: "shephard-uav-2025", title: "UAV Market 2025–2035", source: "Shephard", sourceUrl: "https://www.shephardmedia.com", url: "https://www.shephardmedia.com/news/uavonline/", pages: 190, color: "#1a2e1a", accent: "#86efac" },
  { id: "aviationweek-2025", title: "A&D Industry Forecast 2025", source: "Aviation Week", sourceUrl: "https://aviationweek.com", url: "https://aviationweek.com/defense-space", pages: 210, color: "#2e1a00", accent: "#fbbf24" },
  { id: "iiss-survey-2025", title: "Strategic Survey 2025", source: "IISS", sourceUrl: "https://www.iiss.org", url: "https://www.iiss.org/publications/strategic-survey/", pages: 360, color: "#4a0e0e", accent: "#fca5a5" },
  { id: "janes-budgets-2025", title: "Jane's Defence Budgets 2025", source: "Jane's", sourceUrl: "https://www.janes.com", url: "https://www.janes.com", pages: 480, color: "#1a1a1a", accent: "#d4af37" },
];

// ─── Source catalogue ─────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "all",         label: "All",             icon: Globe2 },
  { id: "press",       label: "Specialty Press", icon: Newspaper },
  { id: "institution", label: "Institutions",    icon: ShieldCheck },
  { id: "thinktank",   label: "Think Tanks",     icon: BookOpen },
  { id: "market",      label: "Market Data",     icon: BarChart3 },
];

const SOURCES = [
  // Press
  { id: "janes",             name: "Jane's",                            description: "Global reference for defence & security intelligence. Equipment programmes, orders of battle and threat assessments across all domains.", url: "https://www.janes.com",                                                              category: "press",       lang: ["EN"],       tags: ["equipment", "intelligence"],    paywall: true  },
  { id: "defensenews",       name: "Defense News",                      description: "International defence news covering contracts, acquisition policies and budgets. Reference publication of Sightline Media Group.",                url: "https://www.defensenews.com",                                                        category: "press",       lang: ["EN"],       tags: ["contracts", "budget"],          paywall: false },
  { id: "breakingdefense",   name: "Breaking Defense",                  description: "In-depth coverage of US, European and Indo-Pacific acquisition policies. Strong on Pentagon budget analysis and programme reporting.",             url: "https://breakingdefense.com",                                                        category: "press",       lang: ["EN"],       tags: ["policy", "acquisition"],        paywall: false },
  { id: "aviationweek",      name: "Aviation Week & Space Technology",  description: "The reference publication for aeronautics, aerospace and defence. Combat aircraft, UAVs and military space systems.",                              url: "https://aviationweek.com",                                                           category: "press",       lang: ["EN"],       tags: ["aviation", "space"],            paywall: true  },
  { id: "thewarzone",        name: "The War Zone",                      description: "Detailed analyses of weapons systems, ongoing conflicts and military doctrine. Exceptionally strong on US technical and operational topics.",       url: "https://www.thedrive.com/the-war-zone",                                              category: "press",       lang: ["EN"],       tags: ["systems", "doctrine"],          paywall: false },
  { id: "defenseone",        name: "Defense One",                       description: "US defence policy and technology news. Pentagon coverage, emerging threats, cyber and future warfare concepts.",                                    url: "https://www.defenseone.com",                                                         category: "press",       lang: ["EN"],       tags: ["policy", "cyber"],              paywall: false },
  { id: "navalnews",         name: "Naval News",                        description: "Specialised naval defence coverage worldwide. Warships, submarines, aircraft carriers and maritime patrol systems.",                               url: "https://www.navalnews.com",                                                          category: "press",       lang: ["EN"],       tags: ["naval", "submarines"],          paywall: false },
  { id: "c4isrnet",          name: "C4ISRNET",                          description: "US-focused coverage of C2, communications, ISR, cyber and battlefield networking.",                                                                url: "https://www.c4isrnet.com",                                                           category: "press",       lang: ["EN"],       tags: ["C4ISR", "cyber"],               paywall: false },
  { id: "spacenews",         name: "SpaceNews",                         description: "News on military space programmes, satellite constellations, launch vehicles and space policy.",                                                   url: "https://spacenews.com",                                                              category: "press",       lang: ["EN"],       tags: ["space", "satellites"],          paywall: false },
  { id: "opex360",           name: "Opex 360",                          description: "Leading French-language defence & security news site. External operations, DGA procurement and French armed forces programmes.",                  url: "https://www.opex360.com",                                                            category: "press",       lang: ["FR"],       tags: ["France", "DGA"],               paywall: false },
  { id: "metadefense",       name: "Meta-Défense",                      description: "Strategic and industrial analyses of European defence, focusing on French and European acquisition programmes.",                                   url: "https://www.meta-defense.fr",                                                        category: "press",       lang: ["FR"],       tags: ["Europe", "programmes"],         paywall: false },
  { id: "aircosmos",         name: "Air & Cosmos",                      description: "The French reference for aerospace and defence. DGA programmes, combat aircraft, military satellites and space policy.",                          url: "https://www.air-cosmos.com",                                                         category: "press",       lang: ["FR"],       tags: ["France", "aviation"],           paywall: true  },
  { id: "armyrecognition",   name: "Army Recognition",                  description: "Global news on ground forces equipment and technology. Armoured vehicles, artillery systems and soldier systems.",                                url: "https://www.armyrecognition.com",                                                    category: "press",       lang: ["EN"],       tags: ["land forces", "armour"],        paywall: false },
  { id: "euro_sd",           name: "European Security & Defence",       description: "German-based publication covering European defence policy, capability programmes and industry developments.",                                      url: "https://euro-sd.com",                                                                category: "press",       lang: ["EN", "DE"], tags: ["Europe", "Germany"],            paywall: false },
  { id: "intelligence_online",name: "Intelligence Online",              description: "Specialist journal on defence industry intelligence, M&A operations and intelligence services activity worldwide.",                               url: "https://www.intelligenceonline.com",                                                  category: "press",       lang: ["EN", "FR"], tags: ["intelligence", "M&A"],          paywall: true  },
  { id: "europeandefencematters", name: "European Defence Matters",     description: "The magazine of the European Defence Agency. Cooperative programmes, PESCO projects and the European Defence Fund.",                              url: "https://eda.europa.eu/webzine",                                                      category: "press",       lang: ["EN"],       tags: ["Europe", "PESCO"],              paywall: false },
  { id: "kyivindependent",   name: "Kyiv Independent — Defence",        description: "Front-line reporting on the Russia-Ukraine war. Equipment losses, battlefield developments and Western aid tracking.",                            url: "https://kyivindependent.com/tag/military/",                                          category: "press",       lang: ["EN"],       tags: ["Ukraine", "conflict"],          paywall: false },
  { id: "warisboring",       name: "War Is Boring",                     description: "Long-form journalism on defence, conflicts and military culture. Covers overlooked wars and emerging weapons programmes.",                        url: "https://warisboring.com",                                                            category: "press",       lang: ["EN"],       tags: ["conflicts", "journalism"],      paywall: false },
  { id: "shephard_media",    name: "Shephard Media",                    description: "UK-based specialist defence and security media covering land, sea, air, C4ISR, training and simulation.",                                        url: "https://www.shephardmedia.com",                                                      category: "press",       lang: ["EN"],       tags: ["UK", "systems"],                paywall: true  },
  // Institutions
  { id: "dga",               name: "DGA – Directorate General of Armaments", description: "Official French press releases on armament programmes, awarded contracts, export licences and the annual performance report.",              url: "https://www.defense.gouv.fr/dga",                                                    category: "institution", lang: ["FR"],       tags: ["France", "contracts"],          paywall: false },
  { id: "nato_newsroom",     name: "NATO Newsroom",                     description: "Official NATO press releases, summit communiqués and policy documents. Council decisions, budget commitments and capability targets.",             url: "https://www.nato.int/cps/en/natohq/news.htm",                                        category: "institution", lang: ["EN", "FR"], tags: ["NATO", "policy"],               paywall: false },
  { id: "dod",               name: "U.S. Department of Defense",        description: "Daily contract awards, budget news and official Pentagon publications including National Defence Strategy documents.",                             url: "https://www.defense.gov/News/Releases/",                                             category: "institution", lang: ["EN"],       tags: ["USA", "contracts"],             paywall: false },
  { id: "eda",               name: "European Defence Agency (EDA)",     description: "Data on EU defence spending, R&D cooperation, PESCO programmes and the European Defence Fund.",                                                   url: "https://eda.europa.eu",                                                              category: "institution", lang: ["EN"],       tags: ["Europe", "R&D"],                paywall: false },
  { id: "uk_mod",            name: "UK Ministry of Defence",            description: "Contract announcements, defence strategy and white papers. Annual spending data and Equipment Plan published each year.",                         url: "https://www.gov.uk/government/organisations/ministry-of-defence",                    category: "institution", lang: ["EN"],       tags: ["UK", "strategy"],               paywall: false },
  { id: "bundeswehr",        name: "Bundeswehr / BMVg",                 description: "German Federal Ministry of Defence. Zeitenwende reform programme, major procurement decisions and defence budget developments.",                 url: "https://www.bmvg.de",                                                                category: "institution", lang: ["DE"],       tags: ["Germany", "budget"],            paywall: false },
  { id: "occar",             name: "OCCAR",                             description: "Manages cooperative armament programmes for 8 European nations: A400M, Boxer IFV, FREMM frigates, Eurofighter.",                                url: "https://www.occar.int",                                                              category: "institution", lang: ["EN", "FR"], tags: ["Europe", "cooperation"],        paywall: false },
  { id: "ministere_armees",  name: "French Ministry of Armed Forces",   description: "French defence policy documents, overseas operations, and the Military Programming Law (LPM 2024-2030) implementation.",                        url: "https://www.defense.gouv.fr",                                                        category: "institution", lang: ["FR"],       tags: ["France", "LPM"],                paywall: false },
  { id: "crs",               name: "Congressional Research Service",    description: "Non-partisan research for the US Congress. Defence budgets, weapons programmes and security policy — all free and publicly available.",          url: "https://crsreports.congress.gov",                                                    category: "institution", lang: ["EN"],       tags: ["USA", "policy"],                paywall: false },
  { id: "ec_defence",        name: "European Commission — Defence",     description: "EU defence industrial policy, the European Defence Fund (EDF), EDIP and the ReArm Europe / SAFE initiative.",                                   url: "https://defence-industry-space.ec.europa.eu",                                        category: "institution", lang: ["EN", "FR"], tags: ["Europe", "EDF"],                paywall: false },
  { id: "australian_dod",    name: "Australian Dept of Defence",        description: "Contracts, capability programmes, strategic reviews and the AUKUS nuclear-powered submarine initiative.",                                        url: "https://www.defence.gov.au",                                                         category: "institution", lang: ["EN"],       tags: ["Australia", "AUKUS"],           paywall: false },
  { id: "polish_mod",        name: "Polish Ministry of Defence",        description: "Poland's rapid modernisation programme — one of NATO's highest spenders. K2 tanks, FA-50 jets, HIMARS, Patriot.",                              url: "https://www.gov.pl/web/national-defence",                                            category: "institution", lang: ["PL", "EN"], tags: ["Poland", "modernisation"],      paywall: false },
  { id: "nato_act",          name: "NATO ACT",                          description: "Allied Command Transformation. Future warfare concepts, capability development and Allied innovation initiatives.",                               url: "https://www.act.nato.int",                                                           category: "institution", lang: ["EN"],       tags: ["NATO", "innovation"],           paywall: false },
  { id: "ukr_mod",           name: "Ukrainian Ministry of Defence",     description: "Official Ukrainian MoD communications. Battle reports, equipment needs and national defence industry developments.",                             url: "https://www.mil.gov.ua/en/",                                                         category: "institution", lang: ["EN"],       tags: ["Ukraine", "war"],               paywall: false },
  { id: "finabel",           name: "FINABEL",                           description: "European army interoperability centre. Doctrinal standardisation and joint operations in support of EU and NATO.",                               url: "https://finabel.org",                                                                category: "institution", lang: ["EN"],       tags: ["Europe", "interoperability"],   paywall: false },
  // Think tanks
  { id: "sipri",             name: "SIPRI",                             description: "Global reference on military spending, arms transfers, nuclear arsenals and conflicts. All yearbook data freely downloadable.",                  url: "https://www.sipri.org",                                                              category: "thinktank",   lang: ["EN"],       tags: ["spending", "data"],             paywall: false },
  { id: "iiss",              name: "IISS",                              description: "Publishes The Military Balance and high-quality strategic analysis. Home of the Shangri-La Dialogue and Manama Dialogue.",                       url: "https://www.iiss.org",                                                               category: "thinktank",   lang: ["EN"],       tags: ["capabilities", "strategy"],     paywall: true  },
  { id: "irsem",             name: "IRSEM",                             description: "French Ministry of Armed Forces think tank. Strategic studies, geopolitics, foreign influence and defence industry research.",                   url: "https://www.irsem.fr",                                                               category: "thinktank",   lang: ["FR", "EN"], tags: ["France", "strategy"],           paywall: false },
  { id: "ifri_securite",     name: "IFRI — Security & Defence",         description: "French Institute of International Relations. Research on the European DTIB, strategic autonomy and transatlantic relations.",                    url: "https://www.ifri.org/fr/espaces-thematiques/securite-defense",                       category: "thinktank",   lang: ["FR", "EN"], tags: ["Europe", "DTIB"],               paywall: false },
  { id: "csis",              name: "CSIS",                              description: "Washington think tank. Defence industrial base, acquisition reform, Indo-Pacific security and cyber. All reports freely downloadable.",          url: "https://www.csis.org/programs/defense-industrial-initiatives-group",                  category: "thinktank",   lang: ["EN"],       tags: ["USA", "industry"],              paywall: false },
  { id: "rand",              name: "RAND Corporation",                  description: "In-depth studies on capability planning, deterrence, acquisition and military strategy. All reports freely downloadable as PDF.",                url: "https://www.rand.org/topics/military.html",                                          category: "thinktank",   lang: ["EN"],       tags: ["planning", "deterrence"],       paywall: false },
  { id: "rusi",              name: "RUSI",                              description: "UK's oldest defence and security think tank. Ukraine battlefield analysis, arms control, nuclear deterrence and defence economics.",             url: "https://www.rusi.org",                                                               category: "thinktank",   lang: ["EN"],       tags: ["UK", "analysis"],               paywall: false },
  { id: "fondation_recherche",name: "FRS",                              description: "French expertise in non-proliferation, nuclear strategy, arms control, space security and export controls.",                                      url: "https://www.frstrategie.org",                                                        category: "thinktank",   lang: ["FR"],       tags: ["nuclear", "arms control"],      paywall: false },
  { id: "atlantic_council",  name: "Atlantic Council",                  description: "Transatlantic security, NATO cohesion and emerging defence technology from the premier transatlantic think tank.",                               url: "https://www.atlanticcouncil.org/programs/scowcroft-center-for-strategy-and-security/", category: "thinktank", lang: ["EN"],       tags: ["NATO", "transatlantic"],        paywall: false },
  { id: "cnas",              name: "CNAS",                              description: "US defence strategy, AI and autonomy in warfare, force design, Indo-Pacific competition and future warfare concepts.",                           url: "https://www.cnas.org",                                                               category: "thinktank",   lang: ["EN"],       tags: ["USA", "AI"],                    paywall: false },
  { id: "chathamhouse",      name: "Chatham House",                     description: "The Royal Institute of International Affairs. UK-focused defence, international security and strategic policy research.",                        url: "https://www.chathamhouse.org/topics/defence-security",                               category: "thinktank",   lang: ["EN"],       tags: ["UK", "security"],               paywall: false },
  { id: "ecfr",              name: "ECFR",                              description: "Pan-European think tank covering strategic autonomy, European defence integration and geopolitics.",                                             url: "https://ecfr.eu/topics/security-and-defence/",                                       category: "thinktank",   lang: ["EN"],       tags: ["Europe", "autonomy"],           paywall: false },
  { id: "carnegie",          name: "Carnegie Endowment",                description: "Authoritative analysis on nuclear policy, arms control, proliferation risks and global security threats.",                                       url: "https://carnegieendowment.org/topics/nuclear-policy",                                category: "thinktank",   lang: ["EN"],       tags: ["nuclear", "arms control"],      paywall: false },
  { id: "swp",               name: "SWP Berlin",                        description: "Germany's leading foreign and security policy think tank. European defence integration and NATO strategy.",                                      url: "https://www.swp-berlin.org/en",                                                      category: "thinktank",   lang: ["EN", "DE"], tags: ["Germany", "Europe"],            paywall: false },
  { id: "acled",             name: "ACLED",                             description: "Real-time conflict data and crisis mapping for 100+ countries. Battles, explosions, protests and strategic developments.",                       url: "https://acleddata.com",                                                              category: "thinktank",   lang: ["EN"],       tags: ["conflict data", "mapping"],     paywall: false },
  { id: "orion",             name: "Institut Montaigne — Defence",      description: "French liberal think tank. European strategic autonomy, French defence industry and NATO relations.",                                            url: "https://www.institutmontaigne.org/thematiques/geopolitique-et-defense",               category: "thinktank",   lang: ["FR", "EN"], tags: ["France", "geopolitics"],        paywall: false },
  // Market data
  { id: "sam_gov",           name: "SAM.gov",                           description: "The official US source for federal contract opportunities and award notices. Essential for tracking the American defence market.",               url: "https://sam.gov/content/opportunities",                                              category: "market",      lang: ["EN"],       tags: ["USA", "contracts"],             paywall: false },
  { id: "ted",               name: "TED — Tenders Electronic Daily",    description: "Supplement to the EU Official Journal. All European public procurement notices including defence purchases.",                                    url: "https://ted.europa.eu",                                                              category: "market",      lang: ["FR", "EN"], tags: ["Europe", "procurement"],        paywall: false },
  { id: "nato_nspa",         name: "NATO NSPA",                         description: "NATO acquisition opportunities, logistics contracts, munitions, fuel and services for Alliance member nations.",                                 url: "https://www.nspa.nato.int/business/procurement",                                     category: "market",      lang: ["EN"],       tags: ["NATO", "logistics"],            paywall: false },
  { id: "usaspending",       name: "USASpending.gov",                   description: "Official database for all US federal spending. Searchable by contractor, agency and programme. Covers all DoD contract awards.",               url: "https://www.usaspending.gov/agency/department-of-defense",                           category: "market",      lang: ["EN"],       tags: ["USA", "spending"],              paywall: false },
  { id: "cbo",               name: "Congressional Budget Office (CBO)", description: "Non-partisan US budget analysis. Annual assessment of Pentagon spending, programme cost growth and acquisition alternatives.",                   url: "https://www.cbo.gov/topics/defense-and-national-security",                           category: "market",      lang: ["EN"],       tags: ["USA", "budget"],                paywall: false },
  { id: "boamp",             name: "BOAMP",                             description: "Official bulletin for French public procurement notices. Primary source for DGA calls for tender and ministerial contracts.",                   url: "https://www.boamp.fr",                                                               category: "market",      lang: ["FR"],       tags: ["France", "DGA"],                paywall: false },
  { id: "globaldata",        name: "GlobalData A&D",                    description: "Market intelligence on A&D: revenue forecasts, company profiles, programme tracking and M&A deal analysis.",                                   url: "https://www.globaldata.com/industry/aerospace-defense/",                             category: "market",      lang: ["EN"],       tags: ["forecasts", "revenues"],        paywall: true  },
  { id: "forecast_intl",     name: "Forecast International",            description: "Programme-level defence spending projections and procurement data. Widely used by industry for long-range market planning.",                    url: "https://www.forecastinternational.com",                                              category: "market",      lang: ["EN"],       tags: ["forecasts", "programmes"],      paywall: true  },
  { id: "defenseindustrydaily", name: "Defense Industry Daily",         description: "Independently curated and annotated news on defence contracts, acquisitions and programmes worldwide.",                                         url: "https://www.defenseindustrydaily.com",                                               category: "market",      lang: ["EN"],       tags: ["contracts", "acquisitions"],    paywall: false },
  { id: "asd",               name: "ASD — AeroSpace and Defence Industries", description: "ASD Eurospace association industrial statistics on the European A&D sector: turnover, employment and R&D investment.",                  url: "https://www.asd-europe.org",                                                         category: "market",      lang: ["EN"],       tags: ["Europe", "statistics"],         paywall: false },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const LANG_COLORS = {
  FR: "bg-blue-50 text-blue-700 border-blue-200",
  EN: "bg-slate-50 text-slate-600 border-slate-200",
  DE: "bg-yellow-50 text-yellow-700 border-yellow-200",
  PL: "bg-red-50 text-red-700 border-red-200",
  UK: "bg-yellow-50 text-yellow-700 border-yellow-300",
};

const TYPE_BADGE = {
  "Annual Report":     "bg-blue-50 text-blue-700 border-blue-200",
  "Research Report":   "bg-violet-50 text-violet-700 border-violet-200",
  "Policy Brief":      "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Statistical Report":"bg-amber-50 text-amber-700 border-amber-200",
};

function Favicon({ url, className = "w-5 h-5" }) {
  const domain = url.replace(/^https?:\/\//, "").split("/")[0];
  const [err, setErr] = useState(false);
  if (err) return <Globe2 className={`${className} text-slate-300`} />;
  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
      alt=""
      className={`${className} object-contain`}
      onError={() => setErr(true)}
    />
  );
}

// Clean book card — flat design, no fake 3D
function ReportCard({ report, paid = false }) {
  return (
    <a href={report.url} target="_blank" rel="noopener noreferrer" className="group block h-full">
      <div className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-150 h-full flex flex-col">

        {/* Coloured header — acts as the "cover" */}
        <div
          className="relative flex flex-col justify-between p-3 flex-shrink-0"
          style={{ backgroundColor: report.color, minHeight: 110 }}
        >
          {/* Accent stripe top */}
          <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: report.accent }} />

          {/* Source + type row */}
          <div className="flex items-start justify-between gap-1 pt-1">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded bg-white/15 flex items-center justify-center flex-shrink-0 overflow-hidden">
                <Favicon url={report.sourceUrl} className="w-3.5 h-3.5" />
              </div>
              <p className="text-white/70 text-[9px] font-bold uppercase tracking-wider">{report.source}</p>
            </div>
            {paid ? (
              <span className="flex items-center gap-0.5 text-[8px] font-semibold px-1.5 py-0.5 rounded bg-black/30 text-amber-300 flex-shrink-0">
                <Lock style={{ width: 8, height: 8 }} /> Paid
              </span>
            ) : (
              <span className="flex items-center gap-0.5 text-[8px] font-semibold px-1.5 py-0.5 rounded bg-black/30 text-emerald-300 flex-shrink-0">
                <Download style={{ width: 8, height: 8 }} /> Free
              </span>
            )}
          </div>

          {/* Title */}
          <div className="mt-2">
            <p className="text-white text-[11px] font-bold leading-snug line-clamp-3 group-hover:opacity-90">
              {report.title}
            </p>
            <div className="h-0.5 w-6 rounded-full mt-2" style={{ backgroundColor: report.accent }} />
          </div>

          {/* Pages badge bottom-right */}
          <div className="absolute bottom-2 right-2">
            <span className="text-[8px] font-mono text-white/40">{report.pages}p</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-3 flex flex-col gap-2 flex-1">
          {!paid && report.subtitle && (
            <p className="text-[10px] text-slate-500 leading-relaxed line-clamp-2">{report.subtitle}</p>
          )}

          {/* Date + type */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {report.date && (
              <div className="flex items-center gap-1 text-[9px] text-slate-400">
                <Calendar className="w-2.5 h-2.5 flex-shrink-0" />
                <span>{new Date(report.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
              </div>
            )}
            {report.type && (
              <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded border ${TYPE_BADGE[report.type] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}>
                {report.type}
              </span>
            )}
          </div>

          {/* Highlight */}
          {report.highlight && (
            <div className="mt-auto bg-slate-50 border border-slate-100 rounded-lg px-2 py-1.5">
              <div className="flex items-start gap-1">
                <TrendingUp className="w-2.5 h-2.5 text-blue-700 flex-shrink-0 mt-0.5" />
                <p className="text-[9px] text-slate-600 leading-relaxed line-clamp-2">{report.highlight}</p>
              </div>
            </div>
          )}

          {/* Tags */}
          {report.tags && (
            <div className="flex gap-1 flex-wrap">
              {report.tags.slice(0, 2).map(t => (
                <Badge key={t} variant="secondary" className="text-[8px] px-1 py-0 bg-slate-50 text-slate-500 border border-slate-100 font-normal">{t}</Badge>
              ))}
            </div>
          )}

          {/* Open link */}
          <div className="flex items-center justify-end gap-1 text-[9px] text-blue-700 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Open <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </a>
  );
}

// ─── Page component ───────────────────────────────────────────────────────────
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
    return matchCat && (!q || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.tags.some(t => t.toLowerCase().includes(q)));
  });

  return (
    <div className="space-y-8 animate-fade-in">

      {/* Header */}
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

      {/* Stats */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-slate-200 rounded-xl p-3">
          <p className="text-2xl font-bold font-mono text-slate-900">{SOURCES.length}</p>
          <p className="text-xs text-slate-500 mt-0.5">Total sources</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-3">
          <p className="text-2xl font-bold font-mono text-emerald-600">{totalFree}</p>
          <p className="text-xs text-slate-500 mt-0.5">Free access</p>
        </div>
        {CATEGORIES.slice(1).map(cat => (
          <div key={cat.id} className="bg-white border border-slate-200 rounded-xl p-3">
            <p className="text-2xl font-bold font-mono text-slate-900">{countByCategory[cat.id]}</p>
            <p className="text-xs text-slate-500 mt-0.5">{cat.label}</p>
          </div>
        ))}
      </div>

      {/* Reports section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-800" />
          <h2 className="font-heading text-lg font-bold text-slate-900">Studies &amp; Reports</h2>
        </div>

        {/* FREE — card grid */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
              <Unlock className="w-3 h-3" /> Free &amp; open access — {FREE_REPORTS.length} reports
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {FREE_REPORTS.map(r => <ReportCard key={r.id} report={r} paid={false} />)}
          </div>
        </div>

        {/* PAID — scrolling strip */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
              <Lock className="w-3 h-3" /> Subscription required — {PAID_REPORTS.length} references
            </div>
            <p className="text-xs text-slate-400">Institutional access needed</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {PAID_REPORTS.map(r => <ReportCard key={r.id} report={r} paid={true} />)}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-200" />

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="Search a source, tag..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 border-slate-200 text-sm" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const count = cat.id === "all" ? SOURCES.length : (countByCategory[cat.id] ?? 0);
            return (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${activeCategory === cat.id ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
                <span className={`ml-0.5 text-[10px] px-1 rounded font-normal ${activeCategory === cat.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-slate-400 -mt-4">{filtered.length} source{filtered.length > 1 ? "s" : ""} shown</p>

      {/* Source grid */}
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
                        <Favicon url={source.url} className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-slate-900 group-hover:text-blue-800 transition-colors leading-tight">{source.name}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5 font-mono truncate">{source.url.replace(/^https?:\/\//, "").split("/")[0]}</p>
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
                    <div className="flex items-center gap-1">
                      {source.paywall ? (
                        <span className="flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-medium">
                          <Lock className="w-2.5 h-2.5" /> Paid
                        </span>
                      ) : (
                        <span className="flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                          <Unlock className="w-2.5 h-2.5" /> Free
                        </span>
                      )}
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
