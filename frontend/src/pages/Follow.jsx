import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink, Search, Newspaper, BookOpen, Globe2,
  ShieldCheck, BarChart3, FileText, Lock, Unlock, Download, ChevronLeft, ChevronRight,
} from "lucide-react";

// ─── 20 free reports — all cover images and PDF links verified ─────────────────
const REPORTS = [
  // SIPRI
  {
    id: "sipri-yearbook-2025",
    title: "SIPRI Yearbook 2025",
    subtitle: "Armaments, Disarmament and International Security",
    source: "SIPRI", sourceUrl: "https://www.sipri.org",
    date: "Jun 2025", type: "Annual Reference", pages: "620+",
    coverImg: "https://www.sipri.org/sites/default/files/2025-06/2025_yearbook_cover__0.jpg",
    url: "https://www.sipri.org/yearbook/2025",
    pdfUrl: "https://www.sipri.org/sites/default/files/SIPRIYB25c06%266A.pdf",
    highlight: "Global military spending surpassed $2,718 billion in 2024 — a new all-time record.",
    tags: ["spending", "nuclear", "transfers"],
    color: "#0d2b4e", accent: "#60a5fa",
  },
  {
    id: "sipri-milex-2024",
    title: "Trends in World Military Expenditure, 2024",
    subtitle: "Global military spending data and analysis",
    source: "SIPRI", sourceUrl: "https://www.sipri.org",
    date: "Apr 2025", type: "Fact Sheet", pages: "12",
    coverImg: "https://www.sipri.org/sites/default/files/styles/publications_lareg/public/2025-04/2504_fs_milex_2024_cover.png?itok=ZgyU02GI",
    url: "https://www.sipri.org/publications/2025/sipri-fact-sheets/trends-world-military-expenditure-2024",
    pdfUrl: "https://www.sipri.org/sites/default/files/2025-04/2504_fs_milex_2024.pdf",
    highlight: "World military spending reached a record $2,718B in 2024 — steepest rise since 1988.",
    tags: ["spending", "budget", "global"],
    color: "#0d2b4e", accent: "#93c5fd",
  },
  {
    id: "sipri-transfers-2024",
    title: "Trends in International Arms Transfers, 2024",
    subtitle: "Global arms export and import data",
    source: "SIPRI", sourceUrl: "https://www.sipri.org",
    date: "Mar 2025", type: "Fact Sheet", pages: "12",
    coverImg: "https://www.sipri.org/sites/default/files/styles/publications_lareg/public/2025-03/fs_2503_at_2024_cover.png?itok=7nfCefxa",
    url: "https://www.sipri.org/publications/2025/sipri-fact-sheets/trends-international-arms-transfers-2024",
    pdfUrl: "https://www.sipri.org/sites/default/files/2025-03/fs_2503_at_2024_0.pdf",
    highlight: "Arms transfers reached their highest level since the end of the Cold War in 2024.",
    tags: ["transfers", "exports", "imports"],
    color: "#0d2b4e", accent: "#60a5fa",
  },
  {
    id: "sipri-milex-2023",
    title: "Trends in World Military Expenditure, 2023",
    subtitle: "Annual fact sheet with global military spending data",
    source: "SIPRI", sourceUrl: "https://www.sipri.org",
    date: "Apr 2024", type: "Fact Sheet", pages: "12",
    coverImg: "https://www.sipri.org/sites/default/files/styles/publications_lareg/public/2024-04/2404_fs_milex_2023_page_01.png?itok=yk4RigO-",
    url: "https://www.sipri.org/publications/2024/sipri-fact-sheets/trends-world-military-expenditure-2023",
    pdfUrl: "https://www.sipri.org/sites/default/files/2024-04/2404_fs_milex_2023.pdf",
    highlight: "World military expenditure reached $2,443B in 2023 — ninth consecutive annual increase.",
    tags: ["spending", "budget", "2023"],
    color: "#0d2b4e", accent: "#60a5fa",
  },
  // NATO / EDA
  {
    id: "nato-exp-2025",
    title: "Defence Expenditure of NATO Members 2025",
    subtitle: "Annual statistics on defence budgets across 32 allies",
    source: "NATO", sourceUrl: "https://www.nato.int",
    date: "Apr 2025", type: "Statistical Report", pages: "36",
    coverImg: null,
    url: "https://www.nato.int/cps/en/natohq/topics_49198.htm",
    pdfUrl: "https://www.nato.int/content/dam/nato/webready/documents/finance/def-exp-2025-en.pdf",
    highlight: "23 of 32 NATO allies met the 2% of GDP target in 2025 — a historic first.",
    tags: ["NATO", "budget", "2%"],
    color: "#003478", accent: "#93c5fd",
  },
  {
    id: "eda-data-2025",
    title: "EDA Defence Data 2024–2025",
    subtitle: "EU27 defence expenditure, R&T investment and procurement figures",
    source: "EDA", sourceUrl: "https://eda.europa.eu",
    date: "Apr 2025", type: "Statistical Report", pages: "96",
    coverImg: "https://eda.europa.eu/images/default-source/projects-nre/webnews-cover.jpg",
    url: "https://eda.europa.eu/publications-and-data/defence-data",
    pdfUrl: null,
    highlight: "EU27 defence spending reached €326 billion in 2024 — up 10% year-on-year.",
    tags: ["Europe", "R&D", "procurement"],
    color: "#003399", accent: "#fbbf24",
  },
  // IRSEM
  {
    id: "irsem-135",
    title: "How Do Wars End?",
    subtitle: "'Securitisation' and the problem of victory and defeat",
    source: "IRSEM", sourceUrl: "https://www.irsem.fr",
    date: "May 2026", type: "Research Study", pages: "50",
    coverImg: "https://www.irsem.fr/storage/file_manager_files/2026/05/etude-135.jpg",
    url: "https://www.irsem.fr/en/publications/how-do-wars-end-securitisation-and-the-problem-of-victory-and-defeat-1",
    pdfUrl: "https://www.irsem.fr/storage/file_manager_files/2026/05/etude-irsem-135-strachan-a4-v2.pdf",
    highlight: "Wars end not when one side wins, but when both see negotiation as more advantageous than fighting.",
    tags: ["conflict", "termination", "doctrine"],
    color: "#1e1b3a", accent: "#a78bfa",
  },
  {
    id: "irsem-134",
    title: "Sustainability in the Age of War Preparation",
    subtitle: "Environmental constraints and military readiness in Nordic forces",
    source: "IRSEM", sourceUrl: "https://www.irsem.fr",
    date: "Apr 2026", type: "Research Study", pages: "70",
    coverImg: "https://www.irsem.fr/storage/file_manager_files/2026/04/etude-134-69e096f435e6d.png",
    url: "https://www.irsem.fr/en/publications/penser-la-durabilite-a-lair-de-la-preparation-de-la-guerre-1",
    pdfUrl: "https://www.irsem.fr/storage/file_manager_files/2026/04/etude-irsem-134-durabilite-a4.pdf",
    highlight: "Nordic defence forces balance sustainability goals with operational demands under strategic pressure.",
    tags: ["sustainability", "Nordic", "readiness"],
    color: "#1e1b3a", accent: "#a78bfa",
  },
  {
    id: "irsem-bs90",
    title: "Gulf States Defence Posture After the War",
    subtitle: "Rethinking security strategies in the post-conflict Gulf",
    source: "IRSEM", sourceUrl: "https://www.irsem.fr",
    date: "Apr 2026", type: "Strategic Brief", pages: "12",
    coverImg: "https://www.irsem.fr/storage/file_manager_files/2026/04/bs90.png",
    url: "https://www.irsem.fr/en/publications/repenser-la-posture-de-defense-des-etats-du-golfe-apres-la-guerre-1",
    pdfUrl: "https://www.irsem.fr/storage/file_manager_files/2026/04/bs-90-passot.pdf",
    highlight: "Gulf states must fundamentally revise their defence postures to address new regional vulnerabilities.",
    tags: ["Gulf", "Middle East", "strategy"],
    color: "#1e1b3a", accent: "#a78bfa",
  },
  {
    id: "irsem-focus3",
    title: "BAYBRIDGE: A Chinese Influence Ecosystem",
    subtitle: "Anatomy of a Chinese information influence operation",
    source: "IRSEM", sourceUrl: "https://www.irsem.fr",
    date: "Oct 2025", type: "Research Focus", pages: "80",
    coverImg: "https://www.irsem.fr/storage/file_manager_files/2026/02/focus-3.jpg",
    url: "https://www.irsem.fr/en/publications/baybridge-anatomy-of-a-chinese-information-influence-ecosystem-1",
    pdfUrl: "https://www.irsem.fr/storage/file_manager_files/2025/10/focus-3-charon-a4-ok.pdf",
    highlight: "BAYBRIDGE uses hundreds of fake news sites to push pro-China and pro-Russia narratives globally.",
    tags: ["China", "disinformation", "cyber"],
    color: "#1e1b3a", accent: "#a78bfa",
  },
  {
    id: "irsem-bs82",
    title: "The Belt and Road in Central Asia",
    subtitle: "Trade, influence and rivalries along the new Silk Road",
    source: "IRSEM", sourceUrl: "https://www.irsem.fr",
    date: "Mar 2025", type: "Strategic Brief", pages: "12",
    coverImg: "https://www.irsem.fr/storage/file_manager_files/2026/02/bs82-69a05ffbed5ab.jpg",
    url: "https://www.irsem.fr/en/publications/the-belt-and-road-initiative-in-central-asia-trade-influence-and-rivalries",
    pdfUrl: "https://www.irsem.fr/storage/file_manager_files/2025/03/sb-82-hiliquin-bri-en.pdf",
    highlight: "The China-Kyrgyzstan-Uzbekistan railway will transform Central Asian connectivity — and debt burdens.",
    tags: ["China", "BRI", "Central Asia"],
    color: "#1e1b3a", accent: "#a78bfa",
  },
  // Atlantic Council
  {
    id: "ac-nuclear-2026",
    title: "Strategy for a New Nuclear Age",
    subtitle: "Force size, arms control and missile defense in a multi-polar world",
    source: "Atlantic Council", sourceUrl: "https://www.atlanticcouncil.org",
    date: "Mar 2026", type: "Research Report", pages: "~60",
    coverImg: "https://www.atlanticcouncil.org/wp-content/uploads/2026/02/9309829-scaled-e1772602088967-500x350.jpg",
    url: "https://www.atlanticcouncil.org/in-depth-research-reports/report/great-nuclear-debates/",
    pdfUrl: null,
    highlight: "Three nuclear-armed great powers means US policy can no longer plan for dyadic deterrence alone.",
    tags: ["nuclear", "deterrence", "USA"],
    color: "#1e3a5f", accent: "#38bdf8",
  },
  {
    id: "ac-nato-ai-2026",
    title: "How NATO Can Integrate AI for Algorithmic Warfare",
    subtitle: "C2 systems, autonomous weapons and the Alliance's AI readiness gap",
    source: "Atlantic Council", sourceUrl: "https://www.atlanticcouncil.org",
    date: "Mar 2026", type: "Research Report", pages: "~50",
    coverImg: "https://www.atlanticcouncil.org/wp-content/uploads/2026/02/9470308-1-1-500x350.jpg",
    url: "https://www.atlanticcouncil.org/in-depth-research-reports/report/how-nato-can-integrate-ai-to-prevail-in-future-algorithmic-warfare/",
    pdfUrl: null,
    highlight: "Military AI does not create new risks — it amplifies existing risks of human error and miscalculation.",
    tags: ["AI", "NATO", "C2"],
    color: "#1e3a5f", accent: "#38bdf8",
  },
  {
    id: "ac-putin-2026",
    title: "Putin's Next Move: Five Attack Scenarios",
    subtitle: "Russian hybrid and conventional attack scenarios Europe must prepare for",
    source: "Atlantic Council", sourceUrl: "https://www.atlanticcouncil.org",
    date: "Feb 2026", type: "Issue Brief", pages: "~40",
    coverImg: "https://www.atlanticcouncil.org/wp-content/uploads/2026/02/9108544-scaled-e1774306196499-500x350.jpg",
    url: "https://www.atlanticcouncil.org/in-depth-research-reports/report/putins-next-move-five-russian-attack-scenarios-europe-must-prepare-for/",
    pdfUrl: "https://www.atlanticcouncil.org/wp-content/uploads/2026/02/Putins-next-move_Five-Russian-attack-scenarios-Europe-must-prepare-for.pdf",
    highlight: "NATO must plan for five distinct Russian escalation pathways — from sabotage to limited invasion.",
    tags: ["Russia", "Europe", "scenarios"],
    color: "#1e3a5f", accent: "#38bdf8",
  },
  {
    id: "ac-eu-nato-2026",
    title: "Can the EU's Art. 42.7 Replace NATO's Art. 5?",
    subtitle: "Comparing EU and NATO mutual defence guarantees",
    source: "Atlantic Council", sourceUrl: "https://www.atlanticcouncil.org",
    date: "May 2026", type: "Issue Brief", pages: "~30",
    coverImg: "https://www.atlanticcouncil.org/wp-content/uploads/2024/10/Herbst-EU-US-agenda-setting-report-500x350.jpg",
    url: "https://www.atlanticcouncil.org/in-depth-research-reports/issue-brief/can-the-eus-mutual-defense-clause-replace-natos-article-5/",
    pdfUrl: null,
    highlight: "EU Article 42.7 lacks enforcement mechanisms and cannot substitute for NATO's collective defence guarantee.",
    tags: ["EU", "NATO", "defence"],
    color: "#1e3a5f", accent: "#38bdf8",
  },
  // CSIS
  {
    id: "csis-naval-2025",
    title: "Outlining Challenges to US Naval Shipbuilding",
    subtitle: "Industrial capacity, workforce and allied cooperation in naval production",
    source: "CSIS", sourceUrl: "https://www.csis.org",
    date: "Dec 2025", type: "Research Report", pages: "~90",
    coverImg: "https://csis-website-prod.s3.amazonaws.com/s3fs-public/styles/500_x_300/s3/2025-12/251216_Daniels_Naval_Shipbuilding.jpg?VersionId=ywz0xhdLHLimPE_tL2ylw676wXlMaMjQ&h=47ea0187&itok=NQsLTK-H",
    url: "https://www.csis.org/analysis/outlining-challenges-us-naval-shipbuilding",
    pdfUrl: "https://csis-website-prod.s3.amazonaws.com/s3fs-public/2025-12/251216_Daniels_Naval_Shipbuilding.pdf?VersionId=M39F5951zELfazlxjIm7alGsIW2Sc6eK",
    highlight: "The US shipbuilding enterprise has failed to produce ships at the scale, speed and cost required for strategic competition.",
    tags: ["USA", "naval", "industry"],
    color: "#1e3a5f", accent: "#38bdf8",
  },
  {
    id: "csis-industrial-2025",
    title: "Putting the Industrial Base on a Wartime Footing",
    subtitle: "US defence production surge and structural reform priorities",
    source: "CSIS", sourceUrl: "https://www.csis.org",
    date: "Dec 2025", type: "Commentary", pages: "~15",
    coverImg: "https://csis-website-prod.s3.amazonaws.com/s3fs-public/styles/500_x_300/s3/2025-12/GettyImages-2244796674_cropped.jpg",
    url: "https://www.csis.org/analysis/putting-industrial-base-wartime-footing",
    pdfUrl: null,
    highlight: "Without structural reform, the US defence industrial base cannot meet the output demands of peer competition.",
    tags: ["USA", "DIB", "munitions"],
    color: "#1e3a5f", accent: "#38bdf8",
  },
  {
    id: "csis-repair-2025",
    title: "Who Controls the Wrench? The Right to Repair",
    subtitle: "Military equipment maintenance rights and defence contractor dependencies",
    source: "CSIS", sourceUrl: "https://www.csis.org",
    date: "Nov 2025", type: "Critical Questions", pages: "~12",
    coverImg: "https://csis-website-prod.s3.amazonaws.com/s3fs-public/styles/500_x_300/s3/2025-11/GettyImages-1243306908_cropped.jpg",
    url: "https://www.csis.org/analysis/who-controls-wrench-debate-over-right-repair",
    pdfUrl: null,
    highlight: "Sustainment accounts for ~70% of total weapons system lifecycle cost — right-to-repair has strategic implications.",
    tags: ["sustainment", "contracts", "USA"],
    color: "#1e3a5f", accent: "#38bdf8",
  },
  {
    id: "csis-land-2026",
    title: "The Role of Land Power in Future Security",
    subtitle: "US Army mission, structure and resourcing in the future joint force",
    source: "CSIS", sourceUrl: "https://www.csis.org",
    date: "Apr 2026", type: "Commentary", pages: "~15",
    coverImg: "https://csis-website-prod.s3.amazonaws.com/s3fs-public/styles/500_x_300/s3/2026-04/260415_McGin_Land_Power.jpg",
    url: "https://www.csis.org/analysis/role-land-power-future-global-security-environment",
    pdfUrl: null,
    highlight: "Ground forces remain indispensable even in a technology-dominant joint force of the future.",
    tags: ["land", "army", "USA"],
    color: "#1e3a5f", accent: "#38bdf8",
  },
  // ACLED
  {
    id: "acled-watchlist-2025",
    title: "ACLED Conflict Watchlist 2025",
    subtitle: "Ten most fragile and conflict-affected situations worldwide",
    source: "ACLED", sourceUrl: "https://acleddata.com",
    date: "Jan 2025", type: "Annual Report", pages: "44",
    coverImg: null,
    url: "https://acleddata.com/conflict-watchlist-2025/",
    pdfUrl: null,
    highlight: "2024 saw record-high political violence globally — surpassing even the peak of 2022.",
    tags: ["conflicts", "data", "global"],
    color: "#1f1f3a", accent: "#f472b6",
  },
];

// ─── Paid subscription references ────────────────────────────────────────────
const PAID_REFS = [
  { id: "mil-balance",   title: "The Military Balance 2025",      source: "IISS",        url: "https://www.iiss.org/",                                  note: "Annual global armed forces data" },
  { id: "strat-survey",  title: "Strategic Survey 2025",          source: "IISS",        url: "https://www.iiss.org/",                                  note: "Annual strategic assessment" },
  { id: "janes-armies",  title: "Jane's World Armies",            source: "Jane's",      url: "https://www.janes.com/",                                 note: "Ground forces reference" },
  { id: "janes-budgets", title: "Jane's Defence Budgets",         source: "Jane's",      url: "https://www.janes.com/",                                 note: "Defence spending analysis" },
  { id: "globaldata",    title: "GlobalData A&D Intelligence",    source: "GlobalData",  url: "https://www.globaldata.com/industry/aerospace-defense/", note: "Market intelligence & forecasts" },
  { id: "forecast",      title: "Forecast International",         source: "FI",          url: "https://www.forecastinternational.com",                  note: "Programme-level projections" },
  { id: "avweek",        title: "Aviation Week Defense",          source: "Av. Week",    url: "https://aviationweek.com/defense-space",                 note: "Aerospace & defence intelligence" },
  { id: "shephard",      title: "Shephard UAV / Land Warfare",    source: "Shephard",    url: "https://www.shephardmedia.com/",                         note: "Domain-specific journals" },
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
  { id: "ifri",               name: "IFRI — Security & Defence",          url: "https://www.ifri.org/en",                                                            category: "thinktank",   lang: ["FR", "EN"], paywall: false, description: "French Institute of International Relations. Research on the European DTIB, strategic autonomy and transatlantic relations." },
  { id: "csis",               name: "CSIS",                               url: "https://www.csis.org/programs/defense-industrial-initiatives-group",                  category: "thinktank",   lang: ["EN"],       paywall: false, description: "Washington think tank. Defence industrial base, acquisition reform, Indo-Pacific security and cyber. All reports free." },
  { id: "rand",               name: "RAND Corporation",                   url: "https://www.rand.org/",                                                              category: "thinktank",   lang: ["EN"],       paywall: false, description: "In-depth studies on capability planning, deterrence, acquisition and military strategy. All reports freely downloadable as PDF." },
  { id: "rusi",               name: "RUSI",                               url: "https://www.rusi.org",                                                               category: "thinktank",   lang: ["EN"],       paywall: false, description: "UK's oldest defence and security think tank. Ukraine battlefield analysis, arms control, nuclear deterrence and defence economics." },
  { id: "frs",                name: "FRS — Foundation for Strategic Research", url: "https://www.frstrategie.org",                                                   category: "thinktank",   lang: ["FR"],       paywall: false, description: "French expertise in non-proliferation, nuclear strategy, arms control, space security and export controls." },
  { id: "atlantic_council",   name: "Atlantic Council",                   url: "https://www.atlanticcouncil.org/programs/scowcroft-center-for-strategy-and-security/", category: "thinktank", lang: ["EN"],       paywall: false, description: "Transatlantic security, NATO cohesion and emerging defence technology from the premier transatlantic think tank." },
  { id: "cnas",               name: "CNAS",                               url: "https://www.cnas.org",                                                               category: "thinktank",   lang: ["EN"],       paywall: false, description: "US defence strategy, AI and autonomy in warfare, force design, Indo-Pacific competition and future warfare concepts." },
  { id: "chathamhouse",       name: "Chatham House",                      url: "https://www.chathamhouse.org/topics/defence-security",                               category: "thinktank",   lang: ["EN"],       paywall: false, description: "The Royal Institute of International Affairs. UK-focused defence, international security and strategic policy research." },
  { id: "ecfr",               name: "ECFR",                               url: "https://ecfr.eu/",                                                                   category: "thinktank",   lang: ["EN"],       paywall: false, description: "Pan-European think tank covering strategic autonomy, European defence integration and geopolitics." },
  { id: "carnegie",           name: "Carnegie Endowment",                 url: "https://carnegieendowment.org/topics/nuclear-policy",                                category: "thinktank",   lang: ["EN"],       paywall: false, description: "Authoritative analysis on nuclear policy, arms control, proliferation risks and global security threats." },
  { id: "swp",                name: "SWP Berlin",                         url: "https://www.swp-berlin.org/en",                                                      category: "thinktank",   lang: ["EN", "DE"], paywall: false, description: "Germany's leading foreign and security policy think tank. European defence integration and NATO strategy." },
  { id: "acled",              name: "ACLED",                              url: "https://acleddata.com",                                                              category: "thinktank",   lang: ["EN"],       paywall: false, description: "Real-time conflict data and crisis mapping for 100+ countries. Battles, explosions, protests and strategic developments." },
  { id: "montaigne",          name: "Institut Montaigne — Defence",       url: "https://www.institutmontaigne.org/en/",                                              category: "thinktank",   lang: ["FR", "EN"], paywall: false, description: "French liberal think tank. European strategic autonomy, French defence industry and NATO relations." },
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

// ─── Report card with real cover thumbnail ────────────────────────────────────
function ReportCoverCard({ report }) {
  const [imgErr, setImgErr] = useState(false);
  const hasRealCover = report.coverImg && !imgErr;
  const linkUrl = report.pdfUrl || report.url;

  return (
    <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="group block">
      <div className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-200 flex flex-col h-full">

        {/* ── Cover image or CSS fallback ── */}
        {hasRealCover ? (
          <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
            <img
              src={report.coverImg}
              alt={report.title}
              className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
              onError={() => setImgErr(true)}
            />
            {/* Bottom gradient for source badge legibility */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
            {/* Source badge — top left */}
            <div className="absolute top-2 left-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded px-1.5 py-0.5 shadow-sm">
              <Favicon url={report.sourceUrl} className="w-3 h-3" />
              <span className="text-[8px] font-bold text-slate-700 uppercase tracking-wider leading-none">{report.source}</span>
            </div>
            {/* Free badge — top right */}
            <span className="absolute top-2 right-2 text-[8px] font-semibold px-1.5 py-0.5 rounded bg-emerald-500 text-white leading-none">
              Free
            </span>
            {/* Type + PDF indicator — bottom overlay */}
            <div className="absolute bottom-2 inset-x-2 flex items-center justify-between">
              <span className="text-[8px] text-white/80 bg-black/40 rounded px-1.5 py-0.5 leading-none">{report.type}</span>
              {report.pdfUrl && (
                <span className="flex items-center gap-0.5 text-[8px] text-white/90 bg-blue-700/80 rounded px-1.5 py-0.5 leading-none">
                  <Download style={{ width: 8, height: 8 }} /> PDF
                </span>
              )}
            </div>
          </div>
        ) : (
          /* CSS cover fallback */
          <div
            className="relative flex flex-col p-3 gap-2"
            style={{ backgroundColor: report.color || "#1e3a5f", aspectRatio: "3/4" }}
          >
            <div className="absolute inset-x-0 top-0 h-1 rounded-t-xl" style={{ backgroundColor: report.accent || "#60a5fa" }} />
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-1.5">
                <Favicon url={report.sourceUrl} className="w-3.5 h-3.5" />
                <span className="text-white/70 text-[8px] font-bold uppercase tracking-widest">{report.source}</span>
              </div>
              <span className="text-[7px] font-semibold px-1.5 py-0.5 rounded bg-emerald-500/80 text-white">Free</span>
            </div>
            <p className="text-white font-bold text-xs leading-snug flex-1">{report.title}</p>
            <div className="flex items-center justify-between">
              <span className="text-[8px] px-1.5 py-0.5 rounded" style={{ backgroundColor: (report.accent || "#60a5fa") + "30", color: report.accent || "#60a5fa" }}>{report.type}</span>
              {report.pdfUrl && <Download style={{ width: 10, height: 10, color: report.accent || "#60a5fa" }} />}
            </div>
          </div>
        )}

        {/* ── Metadata footer ── */}
        <div className="p-2.5 flex flex-col gap-1 flex-1">
          <p className="text-[11px] font-semibold text-slate-900 leading-snug line-clamp-2 group-hover:text-blue-800 transition-colors">
            {report.title}
          </p>
          <div className="flex items-center justify-between mt-0.5">
            <span className="text-[9px] text-slate-400 font-mono">{report.date}</span>
            {report.pages && <span className="text-[9px] text-slate-400">{report.pages}p</span>}
          </div>
          {report.highlight && (
            <p className="text-[9px] text-slate-500 leading-relaxed line-clamp-2 mt-0.5 flex-1">{report.highlight}</p>
          )}
          <div className="flex gap-1 flex-wrap pt-0.5">
            {(report.tags || []).slice(0, 2).map(t => (
              <span key={t} className="text-[8px] px-1 py-px rounded bg-slate-100 text-slate-500 font-mono">{t}</span>
            ))}
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
  const carouselRef = useRef(null);

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
    <div className="space-y-8 animate-fade-in min-w-0 overflow-x-hidden">

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

      {/* ── Reports section ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-800" />
            <h2 className="font-heading text-lg font-bold text-slate-900">Studies &amp; Reports</h2>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              <Unlock className="w-3 h-3" /> {REPORTS.length} free
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={() => { carouselRef.current.scrollBy({ left: -carouselRef.current.offsetWidth * 0.7, behavior: "smooth" }); }}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-colors shadow-sm">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => { carouselRef.current.scrollBy({ left: carouselRef.current.offsetWidth * 0.7, behavior: "smooth" }); }}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-colors shadow-sm">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Horizontal carousel ── */}
        <div className="overflow-hidden">
          <div
            ref={carouselRef}
            className="flex gap-3 overflow-x-auto pb-3"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#cbd5e1 transparent" }}
          >
            {REPORTS.map(r => (
              <div key={r.id} className="flex-none w-44">
                <ReportCoverCard report={r} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Paid references — compact list ── */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
              <Lock className="w-3 h-3" /> Subscription references — institutional access required
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {PAID_REFS.map(r => (
              <a key={r.id} href={r.url} target="_blank" rel="noopener noreferrer"
                className="group block bg-white border border-slate-200 rounded-lg p-2.5 hover:border-amber-300 hover:shadow-sm transition-all">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Favicon url={r.url} className="w-3.5 h-3.5" />
                  <span className="text-[8px] font-bold text-amber-600 uppercase tracking-wider">{r.source}</span>
                </div>
                <p className="text-[10px] font-semibold text-slate-800 leading-snug line-clamp-2 group-hover:text-amber-700 transition-colors">{r.title}</p>
                <p className="text-[9px] text-slate-400 mt-1 leading-snug">{r.note}</p>
              </a>
            ))}
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

        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
          {filtered.map(source => (
            <a key={source.id} href={source.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-1">
              <div className="w-16 h-16 rounded-lg bg-white border border-slate-200 flex items-center justify-center overflow-hidden hover:border-blue-200 hover:shadow-md transition-all">
                <Favicon url={source.url} className="w-10 h-10" />
              </div>
              <p className="text-[10px] text-slate-600 text-center line-clamp-2 group-hover:text-blue-800">{source.name}</p>
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
    </div>
  );
}
