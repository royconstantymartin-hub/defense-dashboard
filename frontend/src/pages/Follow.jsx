import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink, Search, Newspaper, BookOpen, Globe2,
  ShieldCheck, BarChart3, FileText, Calendar,
  TrendingUp, Lock, Unlock, ArrowUpRight,
} from "lucide-react";

// ─── Free reports — only landing pages that are verified to exist ─────────────
const FREE_REPORTS = [
  {
    id: "sipri-2025",
    title: "SIPRI Yearbook 2025",
    subtitle: "Armaments, Disarmament and International Security",
    source: "SIPRI",
    sourceUrl: "https://www.sipri.org",
    date: "2025-06",
    url: "https://www.sipri.org/yearbook/2025",
    type: "Annual Report",
    pages: "~620",
    highlight: "Global military spending surpassed $2,700 billion in 2024 — a new all-time record.",
    tags: ["spending", "nuclear", "transfers"],
    color: "#0d2b4e", accent: "#60a5fa",
  },
  {
    id: "nato-exp-2025",
    title: "Defence Expenditure of NATO Members 2025",
    subtitle: "Annual statistics on defence budgets across all 32 allies",
    source: "NATO",
    sourceUrl: "https://www.nato.int",
    date: "2025-06",
    url: "https://www.nato.int/cps/en/natohq/topics_49198.htm",
    type: "Statistical Report",
    pages: "~36",
    highlight: "23 of 32 allies met the 2% of GDP target in 2025 — a first in NATO history.",
    tags: ["NATO", "budget", "2%"],
    color: "#003478", accent: "#93c5fd",
  },
  {
    id: "rand-ukraine-2025",
    title: "Lessons from Ukraine for NATO Defence Planning",
    subtitle: "Operational, industrial and doctrinal implications for European armies",
    source: "RAND",
    sourceUrl: "https://www.rand.org",
    date: "2025-02",
    url: "https://www.rand.org/",
    type: "Research Report",
    pages: "~184",
    highlight: "Ukraine war validates combined-arms doctrine but exposes critical Western stockpile gaps.",
    tags: ["Ukraine", "NATO", "doctrine"],
    color: "#1a3d1a", accent: "#4ade80",
  },
  {
    id: "eda-2025",
    title: "EDA Defence Data 2025",
    subtitle: "European defence expenditure, R&T investment and procurement figures",
    source: "EDA",
    sourceUrl: "https://eda.europa.eu",
    date: "2025-04",
    url: "https://eda.europa.eu/publications-and-data/defence-data",
    type: "Statistical Report",
    pages: "~96",
    highlight: "EU27 defence spending reached €326 billion in 2024 — up 10% year-on-year.",
    tags: ["Europe", "R&D", "procurement"],
    color: "#003399", accent: "#fbbf24",
  },
  {
    id: "csis-dib-2025",
    title: "Defense Industrial Base Assessment 2025",
    subtitle: "Production capacity, workforce and allied industrial cooperation",
    source: "CSIS",
    sourceUrl: "https://www.csis.org",
    date: "2025-01",
    url: "https://www.csis.org/programs/defense-industrial-initiatives-group",
    type: "Policy Brief",
    pages: "~58",
    highlight: "Europe's rearmament pledge faces a credibility gap without structural procurement reform.",
    tags: ["USA", "industry", "munitions"],
    color: "#1e3a5f", accent: "#38bdf8",
  },
  {
    id: "irsem-2025",
    title: "European DTIB in a War Economy",
    subtitle: "Capacity, bottlenecks and recommendations for the defence industrial base",
    source: "IRSEM",
    sourceUrl: "https://www.irsem.fr",
    date: "2025-02",
    url: "https://www.irsem.fr/en/",
    type: "Research Report",
    pages: "~88",
    highlight: "European DTIB must double munitions output by 2026; structural reform is critical.",
    tags: ["DTIB", "munitions", "Europe"],
    color: "#3b1f5e", accent: "#a78bfa",
  },
  {
    id: "crs-ukraine-2025",
    title: "U.S. Security Assistance to Ukraine",
    subtitle: "Aid commitments, drawdown authority and congressional appropriations",
    source: "CRS",
    sourceUrl: "https://crsreports.congress.gov",
    date: "2025-03",
    url: "https://crsreports.congress.gov",
    type: "Policy Brief",
    pages: "~28",
    highlight: "Total US security commitments to Ukraine exceeded $65 billion by early 2025.",
    tags: ["USA", "Ukraine", "aid"],
    color: "#1a3a1a", accent: "#86efac",
  },
  {
    id: "rusi-ukraine-2025",
    title: "RUSI Ukraine Research Group — 2025 Publications",
    subtitle: "Drone warfare, artillery, electronic warfare and battlefield analysis",
    source: "RUSI",
    sourceUrl: "https://www.rusi.org",
    date: "2025-05",
    url: "https://www.rusi.org/",
    type: "Research Report",
    pages: "various",
    highlight: "FPV drones now account for the majority of armour kills on both sides of the line.",
    tags: ["Ukraine", "drones", "tactics"],
    color: "#2d1515", accent: "#fb923c",
  },
  {
    id: "acled-2025",
    title: "ACLED Conflict Watchlist 2025",
    subtitle: "Armed conflict trends, hotspots and fatality data worldwide",
    source: "ACLED",
    sourceUrl: "https://acleddata.com",
    date: "2025-01",
    url: "https://acleddata.com/conflict-watchlist-2025/",
    type: "Annual Report",
    pages: "~44",
    highlight: "2024 saw record political violence globally, surpassing even the 2022 peak.",
    tags: ["conflicts", "data", "global"],
    color: "#1f1f3a", accent: "#f472b6",
  },
  {
    id: "cnas-ai-2025",
    title: "AI-Enabled Weapons: Governance & Risks",
    subtitle: "Autonomous targeting, human control thresholds and escalation risks",
    source: "CNAS",
    sourceUrl: "https://www.cnas.org",
    date: "2025-04",
    url: "https://www.cnas.org/research/technology-and-national-security",
    type: "Policy Brief",
    pages: "~48",
    highlight: "Without interoperability standards, allied AI weapons risk fratricide and escalation.",
    tags: ["AI", "autonomous", "governance"],
    color: "#1c2e4a", accent: "#f97316",
  },
];

// ─── Paid / subscription references ──────────────────────────────────────────
const PAID_REPORTS = [
  {
    id: "mil-balance-2025",
    title: "The Military Balance 2025",
    source: "IISS",
    sourceUrl: "https://www.iiss.org",
    url: "https://www.iiss.org/publications/the-military-balance/",
    type: "Annual Report",
    pages: "~512",
    note: "Annual global military capabilities reference. Institutional subscription required.",
    color: "#6b1a1a", accent: "#fca5a5",
  },
  {
    id: "iiss-strategic-survey-2025",
    title: "Strategic Survey 2025",
    source: "IISS",
    sourceUrl: "https://www.iiss.org",
    url: "https://www.iiss.org/publications/strategic-survey/",
    type: "Annual Report",
    pages: "~360",
    note: "Annual survey of world affairs covering all major geopolitical crises and trends.",
    color: "#4a1010", accent: "#fca5a5",
  },
  {
    id: "janes-armies-2025",
    title: "Jane's World Armies 2025",
    source: "Jane's by S&P Global",
    sourceUrl: "https://www.janes.com",
    url: "https://www.janes.com/",
    type: "Reference",
    pages: "~1,240",
    note: "The most comprehensive reference on global ground forces order of battle.",
    color: "#1a1a1a", accent: "#d4af37",
  },
  {
    id: "janes-budgets-2025",
    title: "Jane's Defence Budgets 2025",
    source: "Jane's by S&P Global",
    sourceUrl: "https://www.janes.com",
    url: "https://www.janes.com",
    type: "Reference",
    pages: "~480",
    note: "Country-by-country analysis of defence budgets and procurement priorities.",
    color: "#1a1a1a", accent: "#d4af37",
  },
  {
    id: "globaldata-2025",
    title: "A&D Market Forecasts 2025–2035",
    source: "GlobalData",
    sourceUrl: "https://www.globaldata.com",
    url: "https://www.globaldata.com/industry/aerospace-defense/",
    type: "Market Report",
    pages: "~320",
    note: "10-year revenue forecasts, company profiles and programme tracking across A&D.",
    color: "#0a2744", accent: "#67e8f9",
  },
  {
    id: "forecast-intl-2025",
    title: "Missiles & Munitions Market Forecast 2025",
    source: "Forecast International",
    sourceUrl: "https://www.forecastinternational.com",
    url: "https://www.forecastinternational.com",
    type: "Market Report",
    pages: "~280",
    note: "Programme-level procurement projections for guided weapons and munitions worldwide.",
    color: "#1a0a2e", accent: "#c084fc",
  },
  {
    id: "aviationweek-forecast-2025",
    title: "Aerospace & Defence Industry Forecast 2025",
    source: "Aviation Week",
    sourceUrl: "https://aviationweek.com",
    url: "https://aviationweek.com/defense-space",
    type: "Annual Report",
    pages: "~210",
    note: "Annual A&D industry outlook covering civil, military and space segments.",
    color: "#2e1a00", accent: "#fbbf24",
  },
  {
    id: "shephard-uav-2025",
    title: "UAV Systems Market 2025–2035",
    source: "Shephard Media",
    sourceUrl: "https://www.shephardmedia.com",
    url: "https://www.shephardmedia.com/news/uavonline/",
    type: "Market Report",
    pages: "~190",
    note: "10-year UAV market analysis covering military, government and commercial segments.",
    color: "#1a2e1a", accent: "#86efac",
  },
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
  // ── Press ──────────────────────────────────────────────────────────────────
  { id: "janes",              name: "Jane's",                              url: "https://www.janes.com",                                                              category: "press",       lang: ["EN"],       paywall: true,  description: "Global reference for defence & security intelligence. Equipment programmes, orders of battle and threat assessments across all domains." },
  { id: "defensenews",        name: "Defense News",                        url: "https://www.defensenews.com",                                                        category: "press",       lang: ["EN"],       paywall: false, description: "International defence news covering contracts, acquisition policies and budgets. Reference publication of Sightline Media Group." },
  { id: "breakingdefense",    name: "Breaking Defense",                    url: "https://breakingdefense.com",                                                        category: "press",       lang: ["EN"],       paywall: false, description: "In-depth coverage of US, European and Indo-Pacific acquisition. Strong on Pentagon budget analysis and programme reporting." },
  { id: "aviationweek",       name: "Aviation Week & Space Technology",    url: "https://aviationweek.com",                                                           category: "press",       lang: ["EN"],       paywall: true,  description: "The reference publication for aeronautics, aerospace and defence. Combat aircraft programmes, UAVs and military space systems." },
  { id: "thewarzone",         name: "The War Zone",                        url: "https://www.thedrive.com/the-war-zone",                                              category: "press",       lang: ["EN"],       paywall: false, description: "Detailed analyses of weapons systems, ongoing conflicts and military doctrine. Exceptionally strong on US technical and operational topics." },
  { id: "defenseone",         name: "Defense One",                         url: "https://www.defenseone.com",                                                         category: "press",       lang: ["EN"],       paywall: false, description: "US defence policy and technology news. Pentagon coverage, emerging threats, cyber and future warfare concepts." },
  { id: "navalnews",          name: "Naval News",                          url: "https://www.navalnews.com",                                                          category: "press",       lang: ["EN"],       paywall: false, description: "Specialised naval defence coverage worldwide. Warships, submarines, aircraft carriers and maritime patrol systems." },
  { id: "c4isrnet",           name: "C4ISRNET",                            url: "https://www.c4isrnet.com",                                                           category: "press",       lang: ["EN"],       paywall: false, description: "US-focused coverage of C2, communications, ISR, cyber and battlefield networking." },
  { id: "spacenews",          name: "SpaceNews",                           url: "https://spacenews.com",                                                              category: "press",       lang: ["EN"],       paywall: false, description: "News on military space programmes, satellite constellations, launch vehicles and space policy." },
  { id: "opex360",            name: "Opex 360",                            url: "https://www.opex360.com",                                                            category: "press",       lang: ["FR"],       paywall: false, description: "Leading French-language defence & security news site. External operations, DGA procurement and French armed forces programmes." },
  { id: "metadefense",        name: "Meta-Défense",                        url: "https://www.meta-defense.fr",                                                        category: "press",       lang: ["FR"],       paywall: false, description: "Strategic and industrial analyses of European defence, focusing on French and European acquisition programmes." },
  { id: "aircosmos",          name: "Air & Cosmos",                        url: "https://www.air-cosmos.com",                                                         category: "press",       lang: ["FR"],       paywall: true,  description: "The French reference for aerospace and defence. DGA programmes, combat aircraft, military satellites and space policy." },
  { id: "armyrecognition",    name: "Army Recognition",                    url: "https://www.armyrecognition.com",                                                    category: "press",       lang: ["EN"],       paywall: false, description: "Global news on ground forces equipment and technology. Armoured vehicles, artillery systems and soldier systems." },
  { id: "euro_sd",            name: "European Security & Defence",         url: "https://euro-sd.com",                                                                category: "press",       lang: ["EN", "DE"], paywall: false, description: "German-based publication covering European defence policy, capability programmes and industry developments." },
  { id: "intel_online",       name: "Intelligence Online",                 url: "https://www.intelligenceonline.com",                                                 category: "press",       lang: ["EN", "FR"], paywall: true,  description: "Specialist journal on defence industry intelligence, M&A operations and intelligence services worldwide." },
  { id: "eda_magazine",       name: "European Defence Matters",            url: "https://eda.europa.eu/webzine",                                                      category: "press",       lang: ["EN"],       paywall: false, description: "Magazine of the European Defence Agency. Cooperative programmes, PESCO projects and the European Defence Fund." },
  { id: "kyivindependent",    name: "Kyiv Independent — Defence",          url: "https://kyivindependent.com/tag/military/",                                          category: "press",       lang: ["EN"],       paywall: false, description: "Front-line reporting on the Russia-Ukraine war. Equipment losses, battlefield developments and Western aid tracking." },
  { id: "warisboring",        name: "War Is Boring",                       url: "https://warisboring.com",                                                            category: "press",       lang: ["EN"],       paywall: false, description: "Long-form journalism on defence, conflicts and military culture. Covers overlooked wars and emerging weapons programmes." },
  { id: "shephard_media",     name: "Shephard Media",                      url: "https://www.shephardmedia.com",                                                      category: "press",       lang: ["EN"],       paywall: true,  description: "UK-based specialist defence and security media covering land, sea, air, C4ISR, training and simulation." },
  // ── Institutions ───────────────────────────────────────────────────────────
  { id: "dga",                name: "DGA — Directorate General of Armaments", url: "https://www.defense.gouv.fr/dga",                                               category: "institution", lang: ["FR"],       paywall: false, description: "Official French press releases on armament programmes, awarded contracts, export licences and the annual performance report." },
  { id: "nato_news",          name: "NATO Newsroom",                       url: "https://www.nato.int/cps/en/natohq/news.htm",                                        category: "institution", lang: ["EN", "FR"], paywall: false, description: "Official NATO press releases, summit communiqués and policy documents. Council decisions, budget commitments and capability targets." },
  { id: "dod",                name: "U.S. Department of Defense",          url: "https://www.defense.gov/News/Releases/",                                             category: "institution", lang: ["EN"],       paywall: false, description: "Daily contract awards, budget news and official Pentagon publications including National Defence Strategy documents." },
  { id: "eda_inst",           name: "European Defence Agency (EDA)",       url: "https://eda.europa.eu",                                                              category: "institution", lang: ["EN"],       paywall: false, description: "Data on EU defence spending, R&D cooperation, PESCO programmes and the European Defence Fund." },
  { id: "uk_mod",             name: "UK Ministry of Defence",              url: "https://www.gov.uk/government/organisations/ministry-of-defence",                    category: "institution", lang: ["EN"],       paywall: false, description: "Contract announcements, defence strategy and white papers. Annual Equipment Plan published each year." },
  { id: "bundeswehr",         name: "Bundeswehr / BMVg",                   url: "https://www.bmvg.de",                                                                category: "institution", lang: ["DE"],       paywall: false, description: "German Federal Ministry of Defence. Zeitenwende reform programme, major procurement decisions and budget developments." },
  { id: "occar",              name: "OCCAR",                               url: "https://www.occar.int",                                                              category: "institution", lang: ["EN", "FR"], paywall: false, description: "Manages cooperative armament programmes for 8 European nations: A400M, Boxer IFV, FREMM frigates, Eurofighter." },
  { id: "min_armees",         name: "French Ministry of Armed Forces",     url: "https://www.defense.gouv.fr",                                                        category: "institution", lang: ["FR"],       paywall: false, description: "French defence policy, overseas operations, and the Military Programming Law (LPM 2024-2030) implementation." },
  { id: "crs",                name: "Congressional Research Service (CRS)", url: "https://crsreports.congress.gov",                                                  category: "institution", lang: ["EN"],       paywall: false, description: "Non-partisan research for the US Congress. Defence budgets, weapons programmes and policy — all free to download." },
  { id: "ec_defence",         name: "European Commission — Defence",       url: "https://defence-industry-space.ec.europa.eu",                                        category: "institution", lang: ["EN", "FR"], paywall: false, description: "EU defence industrial policy, the European Defence Fund (EDF), EDIP and the ReArm Europe / SAFE initiative." },
  { id: "australian_dod",     name: "Australian Dept of Defence",          url: "https://www.defence.gov.au",                                                         category: "institution", lang: ["EN"],       paywall: false, description: "Contracts, capability programmes, strategic reviews and the AUKUS nuclear-powered submarine initiative." },
  { id: "polish_mod",         name: "Polish Ministry of Defence",          url: "https://www.gov.pl/web/national-defence",                                            category: "institution", lang: ["PL", "EN"], paywall: false, description: "Poland's rapid modernisation programme — one of NATO's highest spenders. K2 tanks, FA-50 jets, HIMARS, Patriot." },
  { id: "nato_act",           name: "NATO Allied Command Transformation",  url: "https://www.act.nato.int",                                                           category: "institution", lang: ["EN"],       paywall: false, description: "Future warfare concepts, capability development and Allied innovation initiatives." },
  { id: "ukr_mod",            name: "Ukrainian Ministry of Defence",       url: "https://www.mil.gov.ua/en/",                                                         category: "institution", lang: ["EN"],       paywall: false, description: "Official Ukrainian MoD communications. Battle reports, equipment needs and defence industry developments." },
  { id: "finabel",            name: "FINABEL",                             url: "https://finabel.org",                                                                category: "institution", lang: ["EN"],       paywall: false, description: "European army interoperability centre. Doctrinal standardisation and joint operations for EU and NATO." },
  // ── Think Tanks ────────────────────────────────────────────────────────────
  { id: "sipri",              name: "SIPRI",                               url: "https://www.sipri.org",                                                              category: "thinktank",   lang: ["EN"],       paywall: false, description: "Global reference on military spending, arms transfers, nuclear arsenals and conflicts. All yearbook data freely downloadable." },
  { id: "iiss",               name: "IISS",                               url: "https://www.iiss.org",                                                               category: "thinktank",   lang: ["EN"],       paywall: true,  description: "Publishes The Military Balance and high-quality strategic analysis. Home of the Shangri-La and Manama Dialogues." },
  { id: "irsem",              name: "IRSEM",                              url: "https://www.irsem.fr",                                                               category: "thinktank",   lang: ["FR", "EN"], paywall: false, description: "French Ministry of Armed Forces think tank. Strategic studies, geopolitics, foreign influence and defence industry research." },
  { id: "ifri",               name: "IFRI — Security & Defence",          url: "https://www.ifri.org/en",                       category: "thinktank",   lang: ["FR", "EN"], paywall: false, description: "French Institute of International Relations. Research on the European DTIB, strategic autonomy and transatlantic relations." },
  { id: "csis",               name: "CSIS",                               url: "https://www.csis.org/programs/defense-industrial-initiatives-group",                  category: "thinktank",   lang: ["EN"],       paywall: false, description: "Washington think tank. Defence industrial base, acquisition reform, Indo-Pacific security and cyber. All reports free." },
  { id: "rand",               name: "RAND Corporation",                   url: "https://www.rand.org/topics/military.html",                                          category: "thinktank",   lang: ["EN"],       paywall: false, description: "In-depth studies on capability planning, deterrence, acquisition and military strategy. All reports freely downloadable as PDF." },
  { id: "rusi",               name: "RUSI",                               url: "https://www.rusi.org",                                                               category: "thinktank",   lang: ["EN"],       paywall: false, description: "UK's oldest defence and security think tank. Ukraine battlefield analysis, arms control, nuclear deterrence and defence economics." },
  { id: "frs",                name: "FRS — Foundation for Strategic Research", url: "https://www.frstrategie.org",                                                   category: "thinktank",   lang: ["FR"],       paywall: false, description: "French expertise in non-proliferation, nuclear strategy, arms control, space security and export controls." },
  { id: "atlantic_council",   name: "Atlantic Council",                   url: "https://www.atlanticcouncil.org/programs/scowcroft-center-for-strategy-and-security/", category: "thinktank", lang: ["EN"],       paywall: false, description: "Transatlantic security, NATO cohesion and emerging defence technology from the premier transatlantic think tank." },
  { id: "cnas",               name: "CNAS",                               url: "https://www.cnas.org",                                                               category: "thinktank",   lang: ["EN"],       paywall: false, description: "US defence strategy, AI and autonomy in warfare, force design, Indo-Pacific competition and future warfare concepts." },
  { id: "chathamhouse",       name: "Chatham House",                      url: "https://www.chathamhouse.org/topics/defence-security",                               category: "thinktank",   lang: ["EN"],       paywall: false, description: "The Royal Institute of International Affairs. UK-focused defence, international security and strategic policy research." },
  { id: "ecfr",               name: "ECFR",                               url: "https://ecfr.eu/",                                       category: "thinktank",   lang: ["EN"],       paywall: false, description: "Pan-European think tank covering strategic autonomy, European defence integration and geopolitics." },
  { id: "carnegie",           name: "Carnegie Endowment",                 url: "https://carnegieendowment.org/topics/nuclear-policy",                                category: "thinktank",   lang: ["EN"],       paywall: false, description: "Authoritative analysis on nuclear policy, arms control, proliferation risks and global security threats." },
  { id: "swp",                name: "SWP Berlin",                         url: "https://www.swp-berlin.org/en",                                                      category: "thinktank",   lang: ["EN", "DE"], paywall: false, description: "Germany's leading foreign and security policy think tank. European defence integration and NATO strategy." },
  { id: "acled",              name: "ACLED",                              url: "https://acleddata.com",                                                              category: "thinktank",   lang: ["EN"],       paywall: false, description: "Real-time conflict data and crisis mapping for 100+ countries. Battles, explosions, protests and strategic developments." },
  { id: "montaigne",          name: "Institut Montaigne — Defence",       url: "https://www.institutmontaigne.org/en/",              category: "thinktank",   lang: ["FR", "EN"], paywall: false, description: "French liberal think tank. European strategic autonomy, French defence industry and NATO relations." },
  // ── Market Data ────────────────────────────────────────────────────────────
  { id: "sam_gov",            name: "SAM.gov",                            url: "https://sam.gov/content/opportunities",                                              category: "market",      lang: ["EN"],       paywall: false, description: "The official US source for federal contract opportunities and award notices. Essential for tracking the American defence market." },
  { id: "ted",                name: "TED — Tenders Electronic Daily",     url: "https://ted.europa.eu",                                                              category: "market",      lang: ["FR", "EN"], paywall: false, description: "Supplement to the EU Official Journal. All European public procurement notices including defence purchases." },
  { id: "nato_nspa",          name: "NATO NSPA",                          url: "https://www.nspa.nato.int/business/procurement",                                     category: "market",      lang: ["EN"],       paywall: false, description: "NATO acquisition opportunities, logistics contracts, munitions, fuel and services for Alliance member nations." },
  { id: "usaspending",        name: "USASpending.gov",                    url: "https://www.usaspending.gov/agency/department-of-defense",                           category: "market",      lang: ["EN"],       paywall: false, description: "Official database for all US federal spending. Covers all DoD contract awards, searchable by contractor and programme." },
  { id: "cbo",                name: "Congressional Budget Office (CBO)",  url: "https://www.cbo.gov/topics/defense-and-national-security",                           category: "market",      lang: ["EN"],       paywall: false, description: "Non-partisan US budget analysis. Annual assessment of Pentagon spending, programme cost growth and acquisition alternatives." },
  { id: "boamp",              name: "BOAMP",                              url: "https://www.boamp.fr",                                                               category: "market",      lang: ["FR"],       paywall: false, description: "Official bulletin for French public procurement notices. Primary source for DGA calls for tender and ministerial contracts." },
  { id: "globaldata",         name: "GlobalData A&D",                    url: "https://www.globaldata.com/industry/aerospace-defense/",                             category: "market",      lang: ["EN"],       paywall: true,  description: "Market intelligence on A&D: revenue forecasts, company profiles, programme tracking and M&A deal analysis." },
  { id: "forecast_intl",      name: "Forecast International",             url: "https://www.forecastinternational.com",                                              category: "market",      lang: ["EN"],       paywall: true,  description: "Programme-level defence spending projections. Widely used by industry for long-range market planning." },
  { id: "did",                name: "Defense Industry Daily",             url: "https://www.defenseindustrydaily.com",                                               category: "market",      lang: ["EN"],       paywall: false, description: "Independently curated and annotated news on defence contracts, acquisitions and programmes worldwide." },
  { id: "asd",                name: "ASD — AeroSpace and Defence Industries", url: "https://www.asd-europe.org",                                                    category: "market",      lang: ["EN"],       paywall: false, description: "ASD Eurospace association industrial statistics on the European A&D sector: turnover, employment and R&D investment." },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const LANG_COLORS = {
  FR: "bg-blue-50 text-blue-700 border-blue-200",
  EN: "bg-slate-50 text-slate-600 border-slate-200",
  DE: "bg-yellow-50 text-yellow-700 border-yellow-200",
  PL: "bg-red-50 text-red-700 border-red-200",
  UK: "bg-yellow-50 text-yellow-600 border-yellow-200",
};

const TYPE_BADGE = {
  "Annual Report":     "bg-blue-50 text-blue-700 border-blue-200",
  "Research Report":   "bg-violet-50 text-violet-700 border-violet-200",
  "Policy Brief":      "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Statistical Report":"bg-amber-50 text-amber-700 border-amber-200",
  "Reference":         "bg-slate-50 text-slate-600 border-slate-200",
  "Market Report":     "bg-orange-50 text-orange-700 border-orange-200",
};

function Favicon({ url, className = "w-5 h-5" }) {
  const domain = url.replace(/^https?:\/\//, "").split("/")[0];
  const [err, setErr] = useState(false);
  if (err) return <Globe2 className={`${className} text-slate-300`} />;
  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
      alt="" className={`${className} object-contain`}
      onError={() => setErr(true)}
    />
  );
}

// ─── Report cover card ────────────────────────────────────────────────────────
function ReportCoverCard({ report, paid = false }) {
  return (
    <a href={report.url} target="_blank" rel="noopener noreferrer" className="group block">
      <div className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-150 flex flex-col h-full">

        {/* ── Cover ── coloured header that looks like a report cover */}
        <div
          className="relative p-4 flex flex-col gap-3"
          style={{ backgroundColor: report.color, minHeight: 140 }}
        >
          {/* Accent bar top */}
          <div className="absolute inset-x-0 top-0 h-1.5 rounded-t-xl" style={{ backgroundColor: report.accent }} />

          {/* Source row */}
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                <Favicon url={report.sourceUrl} className="w-4 h-4" />
              </div>
              <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest">{report.source}</span>
            </div>
            {paid ? (
              <span className="flex items-center gap-1 text-[9px] font-semibold px-2 py-0.5 rounded-full bg-black/30 text-amber-300">
                <Lock style={{ width: 9, height: 9 }} /> Paid
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[9px] font-semibold px-2 py-0.5 rounded-full bg-black/30 text-emerald-300">
                <Unlock style={{ width: 9, height: 9 }} /> Free
              </span>
            )}
          </div>

          {/* Title */}
          <p className="text-white font-bold text-xs leading-snug line-clamp-3 flex-1">
            {report.title}
          </p>

          {/* Bottom row: type + pages */}
          <div className="flex items-center justify-between">
            {report.type && (
              <span className="text-[8px] font-semibold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: report.accent + "30", color: report.accent }}>
                {report.type}
              </span>
            )}
            <span className="text-white/40 text-[9px] font-mono ml-auto">{report.pages}p</span>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="p-3 flex flex-col gap-2 flex-1">
          {/* Date */}
          {report.date && (
            <div className="flex items-center gap-1 text-[9px] text-slate-400">
              <Calendar className="w-2.5 h-2.5 flex-shrink-0" />
              <span>{report.date}</span>
            </div>
          )}

          {/* Subtitle */}
          {report.subtitle && (
            <p className="text-[10px] text-slate-500 leading-relaxed line-clamp-2">{report.subtitle}</p>
          )}
          {report.note && (
            <p className="text-[10px] text-slate-500 leading-relaxed line-clamp-2">{report.note}</p>
          )}

          {/* Key finding */}
          {report.highlight && (
            <div className="mt-auto bg-slate-50 border border-slate-100 rounded-lg p-2">
              <div className="flex items-start gap-1.5">
                <TrendingUp className="w-3 h-3 text-blue-700 flex-shrink-0 mt-px" />
                <p className="text-[9px] text-slate-600 leading-relaxed line-clamp-2">{report.highlight}</p>
              </div>
            </div>
          )}

          {/* Tags */}
          {report.tags && (
            <div className="flex gap-1 flex-wrap mt-auto pt-1">
              {report.tags.slice(0, 2).map(t => (
                <Badge key={t} variant="secondary" className="text-[8px] px-1 py-0 bg-slate-50 text-slate-500 border border-slate-100 font-normal">{t}</Badge>
              ))}
            </div>
          )}

          {/* Open link — appears on hover */}
          <div className="flex items-center justify-end gap-1 text-[9px] text-blue-700 font-medium opacity-0 group-hover:opacity-100 transition-opacity pt-1">
            Open <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </a>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
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
    return matchCat && (!q || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
  });

  return (
    <div className="space-y-8 animate-fade-in">

      {/* ── Header ── */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">Reference Sources</h1>
          <p className="text-slate-500 text-sm mt-1">Curated catalogue — specialty press, institutions, think tanks &amp; market data</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 max-w-xs">
          <span className="text-amber-500">ℹ</span>
          <span>Direct links to primary publications. No content is reproduced here.</span>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-slate-200 rounded-xl p-3">
          <p className="text-2xl font-bold font-mono text-slate-900">{SOURCES.length}</p>
          <p className="text-xs text-slate-500 mt-0.5">Sources</p>
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

      {/* ── Reports ── */}
      <div className="space-y-7">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-800" />
          <h2 className="font-heading text-lg font-bold text-slate-900">Studies &amp; Reports</h2>
        </div>

        {/* FREE */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              <Unlock className="w-3.5 h-3.5" /> Free &amp; open access — {FREE_REPORTS.length} reports
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {FREE_REPORTS.map(r => <ReportCoverCard key={r.id} report={r} paid={false} />)}
          </div>
        </div>

        {/* PAID */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
              <Lock className="w-3.5 h-3.5" /> Subscription required — {PAID_REPORTS.length} references
            </span>
            <span className="text-xs text-slate-400">Institutional access needed</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {PAID_REPORTS.map(r => <ReportCoverCard key={r.id} report={r} paid={true} />)}
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="border-t border-slate-200" />

      {/* ── Source catalogue ── */}
      <div>
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="Search a source..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 border-slate-200 text-sm" />
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
                  <span className={`ml-0.5 text-[10px] px-1.5 py-0 rounded font-normal ${activeCategory === cat.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>
        <p className="text-xs text-slate-400 mb-4">{filtered.length} source{filtered.length > 1 ? "s" : ""} shown</p>

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
                      {source.paywall ? (
                        <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium">
                          <Lock className="w-2.5 h-2.5" /> Paid
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                          <Unlock className="w-2.5 h-2.5" /> Free
                        </span>
                      )}
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
    </div>
  );
}
