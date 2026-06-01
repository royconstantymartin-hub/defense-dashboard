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
  FileText,
  Calendar,
  ArrowUpRight,
  TrendingUp,
  Lock,
  Unlock,
} from "lucide-react";

// ─── Recent Studies ──────────────────────────────────────────────────────────
const RECENT_STUDIES = [
  {
    id: "sipri-yearbook-2024",
    title: "SIPRI Yearbook 2024",
    subtitle: "Armaments, Disarmament and International Security",
    source: "SIPRI",
    sourceId: "sipri",
    date: "2024-06-17",
    url: "https://www.sipri.org/yearbook/2024",
    type: "Annual Report",
    tags: ["spending", "nuclear", "arms transfers"],
    highlight: "Global military spending reached $2,443 billion in 2023 — an all-time high.",
  },
  {
    id: "iiss-military-balance-2024",
    title: "The Military Balance 2024",
    subtitle: "Global forces, capabilities and defence economics",
    source: "IISS",
    sourceId: "iiss",
    date: "2024-02-13",
    url: "https://www.iiss.org/publications/the-military-balance/",
    type: "Annual Report",
    tags: ["capabilities", "forces", "expenditure"],
    highlight: "European defence spending rose 16% in real terms since Russia's invasion of Ukraine.",
  },
  {
    id: "rand-ai-autonomous-2024",
    title: "Autonomous Weapons and the Future of War",
    subtitle: "Legal, ethical, and strategic implications of lethal autonomous systems",
    source: "RAND Corporation",
    sourceId: "rand",
    date: "2024-03-05",
    url: "https://www.rand.org/topics/autonomous-weapons.html",
    type: "Research Report",
    tags: ["AI", "autonomous", "ethics"],
    highlight: "Assesses risk escalation pathways from autonomous engagement systems.",
  },
  {
    id: "csis-defense-industrial-2024",
    title: "U.S. Defense Industrial Base Capacity",
    subtitle: "Assessment of munitions production surge capacity post-Ukraine",
    source: "CSIS",
    sourceId: "csis",
    date: "2024-01-22",
    url: "https://www.csis.org/programs/defense-industrial-initiatives-group",
    type: "Policy Brief",
    tags: ["USA", "industry", "munitions"],
    highlight: "155mm shell production ramped 4× but still below NATO stockpile targets.",
  },
  {
    id: "irsem-europe-defence-2024",
    title: "L'industrie européenne de défense à l'heure de la guerre de haute intensité",
    subtitle: "Capacités industrielles face au retour des conflits majeurs en Europe",
    source: "IRSEM",
    sourceId: "irsem",
    date: "2024-04-10",
    url: "https://www.irsem.fr",
    type: "Étude stratégique",
    tags: ["Europe", "industrie", "haute intensité"],
    highlight: "La BITD européenne doit doubler sa capacité de production de munitions d'ici 2026.",
  },
  {
    id: "eda-defence-data-2023",
    title: "Defence Data 2022–2023",
    subtitle: "Key figures on European defence expenditure and investment",
    source: "EDA",
    sourceId: "eda",
    date: "2023-11-28",
    url: "https://eda.europa.eu/publications-and-data/defence-data",
    type: "Statistical Report",
    tags: ["Europe", "spending", "R&D"],
    highlight: "EU27 defence spending hit €214 billion — up 6% year-on-year in real terms.",
  },
];

// ─── Curated source catalogue ──────────────────────────────────────────────
const CATEGORIES = [
  { id: "all",         label: "Toutes",           icon: Globe2 },
  { id: "press",       label: "Presse spécialisée", icon: Newspaper },
  { id: "institution", label: "Institutions",      icon: ShieldCheck },
  { id: "thinktank",   label: "Think Tanks",       icon: BookOpen },
  { id: "market",      label: "Données marché",    icon: BarChart3 },
  { id: "industry",    label: "Industrie",         icon: Building2 },
];

const SOURCES = [
  // ── Specialty Press ──────────────────────────────────────────────────────
  {
    id: "janes",
    name: "Jane's",
    description: "Référence mondiale en intelligence défense & sécurité. Couverture des équipements, programmes et ordres de bataille.",
    url: "https://www.janes.com",
    category: "press",
    lang: ["EN"],
    tags: ["équipements", "programmes", "intelligence"],
    paywall: true,
  },
  {
    id: "defensenews",
    name: "Defense News",
    description: "Actualité défense internationale : contrats, politiques d'acquisition et budgets. Publication de référence du groupe Sightline Media.",
    url: "https://www.defensenews.com",
    category: "press",
    lang: ["EN"],
    tags: ["contrats", "acquisitions", "budget"],
    paywall: false,
  },
  {
    id: "breakingdefense",
    name: "Breaking Defense",
    description: "Analyse approfondie des politiques d'acquisition US, européennes et indo-pacifiques. Très fort sur l'analyse budgétaire.",
    url: "https://breakingdefense.com",
    category: "press",
    lang: ["EN"],
    tags: ["politique", "budget", "acquisition"],
    paywall: false,
  },
  {
    id: "aviationweek",
    name: "Aviation Week & Space Technology",
    description: "Publication de référence en aéronautique, espace et défense. Programmes d'avions de combat, drones, espace militaire.",
    url: "https://aviationweek.com",
    category: "press",
    lang: ["EN"],
    tags: ["aviation", "espace", "programmes"],
    paywall: true,
  },
  {
    id: "thewarzone",
    name: "The War Zone (The Drive)",
    description: "Analyses détaillées des systèmes d'armes, conflits en cours et doctrine militaire. Très fort sur les sujets techniques US.",
    url: "https://www.thedrive.com/the-war-zone",
    category: "press",
    lang: ["EN"],
    tags: ["systèmes", "conflits", "doctrine"],
    paywall: false,
  },
  {
    id: "opex360",
    name: "Opex 360",
    description: "Premier site francophone d'actualité défense & sécurité. Opérations extérieures, DGA et programmes français.",
    url: "https://www.opex360.com",
    category: "press",
    lang: ["FR"],
    tags: ["France", "opérations", "DGA"],
    paywall: false,
  },
  {
    id: "metadefense",
    name: "Meta-Défense",
    description: "Analyses stratégiques et industrielles de la défense européenne, focus sur les programmes franco-européens.",
    url: "https://www.meta-defense.fr",
    category: "press",
    lang: ["FR"],
    tags: ["Europe", "programmes", "industrie"],
    paywall: false,
  },
  {
    id: "europeandefencematters",
    name: "European Defence Matters",
    description: "Magazine de l'Agence Européenne de Défense. Programmes coopératifs, PESCO, Fonds européen de défense.",
    url: "https://eda.europa.eu/webzine",
    category: "press",
    lang: ["EN"],
    tags: ["Europe", "PESCO", "coopération"],
    paywall: false,
  },
  {
    id: "defenseone",
    name: "Defense One",
    description: "Politique de défense et technologie US. Couverture du Pentagone, cybermenaces et guerre future.",
    url: "https://www.defenseone.com",
    category: "press",
    lang: ["EN"],
    tags: ["politique", "cyber", "Pentagone"],
    paywall: false,
  },
  {
    id: "navalnews",
    name: "Naval News",
    description: "Couverture spécialisée de la défense navale. Navires de guerre, sous-marins, porte-avions et systèmes maritimes.",
    url: "https://www.navalnews.com",
    category: "press",
    lang: ["EN"],
    tags: ["naval", "maritime", "sous-marins"],
    paywall: false,
  },
  {
    id: "aircosmos",
    name: "Air & Cosmos",
    description: "Référence française en aérospatiale et défense. Programmes DGA, avions de combat et espace.",
    url: "https://www.air-cosmos.com",
    category: "press",
    lang: ["FR"],
    tags: ["France", "aviation", "espace"],
    paywall: true,
  },
  {
    id: "c4isrnet",
    name: "C4ISRNET",
    description: "Couverture US des systèmes C2, communications, ISR, cyber et réseaux de combat.",
    url: "https://www.c4isrnet.com",
    category: "press",
    lang: ["EN"],
    tags: ["C4ISR", "cyber", "technologie"],
    paywall: false,
  },
  {
    id: "armyrecognition",
    name: "Army Recognition",
    description: "Actualité mondiale sur les équipements et technologies des forces terrestres. Blindés, artillerie et systèmes du combattant.",
    url: "https://www.armyrecognition.com",
    category: "press",
    lang: ["EN"],
    tags: ["terrestre", "équipements", "blindés"],
    paywall: false,
  },
  {
    id: "shephard",
    name: "Shephard Media",
    description: "Média défense & sécurité britannique. Terrestre, naval, aérien, C4ISR et entraînement.",
    url: "https://www.shephardmedia.com",
    category: "press",
    lang: ["EN"],
    tags: ["UK", "systèmes", "technologie"],
    paywall: true,
  },
  {
    id: "spacenews",
    name: "SpaceNews",
    description: "Actualité des programmes militaires spatiaux, constellations de satellites, lanceurs et politique spatiale.",
    url: "https://spacenews.com",
    category: "press",
    lang: ["EN"],
    tags: ["espace", "satellites", "militaire"],
    paywall: false,
  },
  {
    id: "euro_sd",
    name: "European Security & Defence",
    description: "Publication allemande couvrant la politique de défense européenne, les programmes et l'industrie.",
    url: "https://euro-sd.com",
    category: "press",
    lang: ["EN", "DE"],
    tags: ["Europe", "Allemagne", "programmes"],
    paywall: false,
  },
  {
    id: "intelligence_online",
    name: "Intelligence Online",
    description: "Journal spécialisé sur le renseignement économique dans la défense, les fusions-acquisitions et les services de renseignement.",
    url: "https://www.intelligenceonline.com",
    category: "press",
    lang: ["EN", "FR"],
    tags: ["renseignement", "M&A", "industrie"],
    paywall: true,
  },

  // ── Institutions ────────────────────────────────────────────────────────
  {
    id: "dga",
    name: "DGA – Direction Générale de l'Armement",
    description: "Communiqués officiels, programmes d'armement, contrats attribués, rapport annuel de performance. Source primaire française.",
    url: "https://www.defense.gouv.fr/dga",
    category: "institution",
    lang: ["FR"],
    tags: ["France", "programmes", "contrats"],
    paywall: false,
  },
  {
    id: "nato_newsroom",
    name: "NATO Newsroom",
    description: "Communiqués de presse, discours et documents OTAN officiels. Décisions du Conseil, budget et capacités.",
    url: "https://www.nato.int/cps/en/natohq/news.htm",
    category: "institution",
    lang: ["EN", "FR"],
    tags: ["OTAN", "politique", "capacités"],
    paywall: false,
  },
  {
    id: "dod",
    name: "U.S. Department of Defense – Press Releases",
    description: "Attributions de contrats quotidiennes, annonces budgétaires et publications officielles du Pentagone.",
    url: "https://www.defense.gov/News/Releases/",
    category: "institution",
    lang: ["EN"],
    tags: ["USA", "contrats", "budget"],
    paywall: false,
  },
  {
    id: "eda",
    name: "European Defence Agency (EDA)",
    description: "Données sur les dépenses de défense européennes, coopération R&D et programmes PESCO.",
    url: "https://eda.europa.eu",
    category: "institution",
    lang: ["EN"],
    tags: ["Europe", "R&D", "coopération"],
    paywall: false,
  },
  {
    id: "uk_mod",
    name: "UK Ministry of Defence",
    description: "Annonces de contrats, stratégie de défense et livres blancs. Données de dépenses publiées annuellement.",
    url: "https://www.gov.uk/government/organisations/ministry-of-defence",
    category: "institution",
    lang: ["EN"],
    tags: ["UK", "contrats", "stratégie"],
    paywall: false,
  },
  {
    id: "bundeswehr",
    name: "Bundeswehr / BMVg",
    description: "Ministère fédéral allemand de la Défense. Programmes, Zeitenwende et budget de défense allemand.",
    url: "https://www.bmvg.de",
    category: "institution",
    lang: ["DE"],
    tags: ["Allemagne", "programmes", "budget"],
    paywall: false,
  },
  {
    id: "occar",
    name: "OCCAR – Organisation Conjointe de Coopération en matière d'Armement",
    description: "Gère les programmes d'armement coopératifs de 8 nations européennes : A400M, Boxer, FREMM, Eurofighter.",
    url: "https://www.occar.int",
    category: "institution",
    lang: ["EN", "FR"],
    tags: ["Europe", "programmes", "coopération"],
    paywall: false,
  },
  {
    id: "ministere_armees",
    name: "Ministère des Armées (France)",
    description: "Documents de politique française, opérations, Loi de Programmation Militaire (LPM 2024-2030).",
    url: "https://www.defense.gouv.fr",
    category: "institution",
    lang: ["FR"],
    tags: ["France", "politique", "LPM"],
    paywall: false,
  },
  {
    id: "crs",
    name: "Congressional Research Service (CRS)",
    description: "Recherche indépendante et non partisane pour le Congrès US. Budgets de défense, programmes d'armes et analyses politiques.",
    url: "https://crsreports.congress.gov",
    category: "institution",
    lang: ["EN"],
    tags: ["USA", "budget", "politique"],
    paywall: false,
  },
  {
    id: "ec_defence",
    name: "Commission Européenne – Industrie de Défense & Espace",
    description: "Politique industrielle de défense de l'UE, EDIDP, Fonds européen de défense (FED) et programmes EDIP.",
    url: "https://defence-industry-space.ec.europa.eu",
    category: "institution",
    lang: ["EN", "FR"],
    tags: ["Europe", "FED", "industrie"],
    paywall: false,
  },
  {
    id: "australian_dod",
    name: "Australian Department of Defence",
    description: "Contrats, programmes, revues stratégiques et initiative de sous-marins AUKUS.",
    url: "https://www.defence.gov.au",
    category: "institution",
    lang: ["EN"],
    tags: ["Australie", "AUKUS", "contrats"],
    paywall: false,
  },

  // ── Think Tanks & Research ───────────────────────────────────────────────
  {
    id: "sipri",
    name: "SIPRI – Stockholm International Peace Research Institute",
    description: "Base de données mondiale de référence sur les dépenses militaires, transferts d'armes et arsenaux nucléaires. Données annuelles gratuites.",
    url: "https://www.sipri.org",
    category: "thinktank",
    lang: ["EN"],
    tags: ["dépenses", "transferts", "données"],
    paywall: false,
  },
  {
    id: "iiss",
    name: "IISS – International Institute for Strategic Studies",
    description: "Military Balance (référence annuelle sur les capacités militaires mondiales) et analyses stratégiques approfondies.",
    url: "https://www.iiss.org",
    category: "thinktank",
    lang: ["EN"],
    tags: ["capacités", "stratégie", "Military Balance"],
    paywall: true,
  },
  {
    id: "irsem",
    name: "IRSEM – Institut de Recherche Stratégique de l'École Militaire",
    description: "Think tank français rattaché au Ministère des Armées. Études stratégiques, géopolitique et industrie de défense.",
    url: "https://www.irsem.fr",
    category: "thinktank",
    lang: ["FR", "EN"],
    tags: ["France", "stratégie", "géopolitique"],
    paywall: false,
  },
  {
    id: "ifri_securite",
    name: "IFRI – Programme Sécurité & Défense",
    description: "Institut Français des Relations Internationales. Travaux sur l'industrie de défense européenne, BITD et autonomie stratégique.",
    url: "https://www.ifri.org/fr/espaces-thematiques/securite-defense",
    category: "thinktank",
    lang: ["FR", "EN"],
    tags: ["Europe", "BITD", "autonomie stratégique"],
    paywall: false,
  },
  {
    id: "csis",
    name: "CSIS – Center for Strategic and International Studies",
    description: "Think tank de Washington. Acquisition de défense, industrie, Indo-Pacifique et cybersécurité.",
    url: "https://www.csis.org/programs/defense-industrial-initiatives-group",
    category: "thinktank",
    lang: ["EN"],
    tags: ["USA", "acquisition", "industrie"],
    paywall: false,
  },
  {
    id: "rand",
    name: "RAND Corporation",
    description: "Études approfondies sur l'acquisition, la planification des capacités, la dissuasion et les stratégies militaires.",
    url: "https://www.rand.org/topics/military.html",
    category: "thinktank",
    lang: ["EN"],
    tags: ["planification", "acquisition", "dissuasion"],
    paywall: false,
  },
  {
    id: "fondation_recherche",
    name: "FRS – Fondation pour la Recherche Stratégique",
    description: "Expertise française en non-prolifération, stratégie nucléaire, contrôle des armements et exportations.",
    url: "https://www.frstrategie.org",
    category: "thinktank",
    lang: ["FR"],
    tags: ["nucléaire", "exportations", "contrôle"],
    paywall: false,
  },
  {
    id: "atlantic_council",
    name: "Atlantic Council – Scowcroft Center",
    description: "Sécurité transatlantique, cohésion OTAN et technologies de défense émergentes.",
    url: "https://www.atlanticcouncil.org/programs/scowcroft-center-for-strategy-and-security/",
    category: "thinktank",
    lang: ["EN"],
    tags: ["OTAN", "transatlantique", "stratégie"],
    paywall: false,
  },
  {
    id: "cnas",
    name: "CNAS – Center for a New American Security",
    description: "Stratégie de défense US, IA, systèmes autonomes et concepts de guerre future.",
    url: "https://www.cnas.org",
    category: "thinktank",
    lang: ["EN"],
    tags: ["USA", "IA", "stratégie"],
    paywall: false,
  },
  {
    id: "chathamhouse",
    name: "Chatham House – Defence & Security",
    description: "Royal Institute of International Affairs. Défense, sécurité et politique stratégique avec focus britannique.",
    url: "https://www.chathamhouse.org/topics/defence-security",
    category: "thinktank",
    lang: ["EN"],
    tags: ["UK", "sécurité", "politique"],
    paywall: false,
  },
  {
    id: "ecfr",
    name: "ECFR – European Council on Foreign Relations",
    description: "Think tank paneuropéen. Autonomie stratégique, intégration de la défense européenne et géopolitique.",
    url: "https://ecfr.eu/topics/security-and-defence/",
    category: "thinktank",
    lang: ["EN"],
    tags: ["Europe", "autonomie", "géopolitique"],
    paywall: false,
  },
  {
    id: "carnegie",
    name: "Carnegie Endowment for International Peace",
    description: "Analyses sur la politique nucléaire, le contrôle des armements, les risques de prolifération et les menaces sécuritaires.",
    url: "https://carnegieendowment.org/topics/nuclear-policy",
    category: "thinktank",
    lang: ["EN"],
    tags: ["nucléaire", "contrôle", "sécurité"],
    paywall: false,
  },
  {
    id: "swp",
    name: "SWP – Stiftung Wissenschaft und Politik",
    description: "Principal think tank allemand en politique étrangère et sécurité. Défense européenne et OTAN.",
    url: "https://www.swp-berlin.org/en",
    category: "thinktank",
    lang: ["EN", "DE"],
    tags: ["Allemagne", "Europe", "sécurité"],
    paywall: false,
  },
  {
    id: "dgap",
    name: "DGAP – German Council on Foreign Relations",
    description: "Recherche sur la politique de sécurité allemande et européenne, industrie de défense et stratégie OTAN.",
    url: "https://dgap.org/en/research/programs/security-defense",
    category: "thinktank",
    lang: ["EN", "DE"],
    tags: ["Allemagne", "Europe", "défense"],
    paywall: false,
  },

  // ── Market Data ──────────────────────────────────────────────────────────
  {
    id: "sam_gov",
    name: "SAM.gov – U.S. Federal Contract Opportunities",
    description: "Source officielle US pour les opportunités et attributions de contrats fédéraux. Indispensable pour le marché américain.",
    url: "https://sam.gov/content/opportunities",
    category: "market",
    lang: ["EN"],
    tags: ["USA", "contrats", "appels d'offres"],
    paywall: false,
  },
  {
    id: "ted",
    name: "TED – Tenders Electronic Daily (UE)",
    description: "Supplément au Journal officiel de l'UE. Marchés publics européens incluant les achats de défense.",
    url: "https://ted.europa.eu",
    category: "market",
    lang: ["FR", "EN"],
    tags: ["Europe", "marchés publics", "appels d'offres"],
    paywall: false,
  },
  {
    id: "nato_nspa",
    name: "NATO Support and Procurement Agency (NSPA)",
    description: "Opportunités d'acquisition OTAN, contrats logistiques, munitions et services.",
    url: "https://www.nspa.nato.int/business/procurement",
    category: "market",
    lang: ["EN"],
    tags: ["OTAN", "logistique", "acquisition"],
    paywall: false,
  },
  {
    id: "aerospace_forecast",
    name: "ASD – AeroSpace and Defence Industries",
    description: "Association ASD Eurospace. Données industrielles sur le secteur aérospatial & défense européen.",
    url: "https://www.asd-europe.org",
    category: "market",
    lang: ["EN"],
    tags: ["Europe", "industrie", "statistiques"],
    paywall: false,
  },
  {
    id: "usaspending",
    name: "USASpending.gov",
    description: "Base de données officielle de toutes les dépenses fédérales US, dont les contrats DoD et les subventions.",
    url: "https://www.usaspending.gov/agency/department-of-defense",
    category: "market",
    lang: ["EN"],
    tags: ["USA", "contrats", "budget"],
    paywall: false,
  },
  {
    id: "globaldata",
    name: "GlobalData – Aerospace & Defence",
    description: "Intelligence de marché A&D : prévisions de revenus, profils d'entreprises et suivi des programmes.",
    url: "https://www.globaldata.com/industry/aerospace-defense/",
    category: "market",
    lang: ["EN"],
    tags: ["données marché", "prévisions", "revenus"],
    paywall: true,
  },
  {
    id: "cbo",
    name: "Congressional Budget Office (CBO)",
    description: "Analyse budgétaire US non partisane couvrant les dépenses de défense et les estimations de coûts de programmes.",
    url: "https://www.cbo.gov/topics/defense-and-national-security",
    category: "market",
    lang: ["EN"],
    tags: ["USA", "budget", "analyse"],
    paywall: false,
  },
  {
    id: "boamp",
    name: "BOAMP – Bulletin Officiel des Annonces de Marchés Publics",
    description: "Bulletin officiel des marchés publics français. Source primaire pour les appels d'offres DGA et ministériels.",
    url: "https://www.boamp.fr",
    category: "market",
    lang: ["FR"],
    tags: ["France", "marchés publics", "DGA"],
    paywall: false,
  },

  // ── Industry ─────────────────────────────────────────────────────────────
  {
    id: "airbus_defence",
    name: "Airbus Defence & Space – Newsroom",
    description: "Communiqués officiels Airbus D&S. Programmes, contrats, partenariats et résultats financiers.",
    url: "https://www.airbus.com/en/newsroom",
    category: "industry",
    lang: ["EN", "FR"],
    tags: ["Airbus", "programmes", "contrats"],
    paywall: false,
  },
  {
    id: "thales_newsroom",
    name: "Thales Group – Newsroom",
    description: "Actualités Thales : contrats, innovations, résultats et partenariats. Électronique de défense & sécurité.",
    url: "https://www.thalesgroup.com/en/worldwide/press_releases",
    category: "industry",
    lang: ["EN", "FR"],
    tags: ["Thales", "électronique", "contrats"],
    paywall: false,
  },
  {
    id: "safran_newsroom",
    name: "Safran – Actualités",
    description: "Moteurs, équipements aéronautiques et défense. Programmes LEAP, Rafale et hélicoptères.",
    url: "https://www.safran-group.com/fr/media/actualites",
    category: "industry",
    lang: ["FR", "EN"],
    tags: ["Safran", "moteurs", "Rafale"],
    paywall: false,
  },
  {
    id: "mbda_newsroom",
    name: "MBDA – Press Releases",
    description: "Missilier européen. Contrats et programmes Meteor, Mistral, ASMP-A et CAMM.",
    url: "https://www.mbda-systems.com/press-releases/",
    category: "industry",
    lang: ["EN", "FR"],
    tags: ["missiles", "programmes", "MBDA"],
    paywall: false,
  },
  {
    id: "bae_systems",
    name: "BAE Systems – News",
    description: "Premier groupe de défense britannique. Véhicules de combat, navires de guerre, avions, électronique et cyber.",
    url: "https://www.baesystems.com/en/media/index",
    category: "industry",
    lang: ["EN"],
    tags: ["BAE Systems", "UK", "véhicules"],
    paywall: false,
  },
  {
    id: "rheinmetall",
    name: "Rheinmetall – News",
    description: "Leader allemand de la défense. Lynx IFV, KF51 Panther, munitions et systèmes de défense aérienne.",
    url: "https://www.rheinmetall.com/en/media/news",
    category: "industry",
    lang: ["EN", "DE"],
    tags: ["Rheinmetall", "Allemagne", "véhicules"],
    paywall: false,
  },
  {
    id: "leonardo",
    name: "Leonardo – Newsroom",
    description: "Entreprise italienne d'aérospatiale et défense. Hélicoptères AW, guerre électronique, radars et cyber.",
    url: "https://www.leonardo.com/en/press-release-detail",
    category: "industry",
    lang: ["EN", "IT"],
    tags: ["Leonardo", "Italie", "hélicoptères"],
    paywall: false,
  },
  {
    id: "rtx",
    name: "RTX (Raytheon Technologies) – News",
    description: "Géant américain de la défense et de l'aérospatiale. Patriot, AMRAAM, Stinger, avionique et réacteurs.",
    url: "https://www.rtx.com/news",
    category: "industry",
    lang: ["EN"],
    tags: ["RTX", "USA", "missiles"],
    paywall: false,
  },
  {
    id: "northrop",
    name: "Northrop Grumman – News",
    description: "Aérospatiale et défense US. B-21 Raider, GBSD ICBM, systèmes spatiaux et solutions cyber.",
    url: "https://news.northropgrumman.com",
    category: "industry",
    lang: ["EN"],
    tags: ["Northrop", "USA", "aérospatiale"],
    paywall: false,
  },
  {
    id: "generaldynamics",
    name: "General Dynamics – News",
    description: "Conglomérat américain de défense. Char Abrams, Stryker, sous-marins classe Virginia et services IT.",
    url: "https://www.gd.com/news",
    category: "industry",
    lang: ["EN"],
    tags: ["General Dynamics", "USA", "terrestre"],
    paywall: false,
  },
  {
    id: "navalgroup",
    name: "Naval Group – Actualités",
    description: "Concepteur et constructeur de navires de guerre français. SSN Barracuda, frégates FDI et programmes export.",
    url: "https://www.naval-group.com/fr/actualites",
    category: "industry",
    lang: ["FR", "EN"],
    tags: ["Naval Group", "France", "sous-marins"],
    paywall: false,
  },
  {
    id: "dassault",
    name: "Dassault Aviation – Presse",
    description: "Constructeur du Rafale et des jets d'affaires Falcon. Contrats et campagnes export.",
    url: "https://www.dassault-aviation.com/fr/presse/",
    category: "industry",
    lang: ["FR", "EN"],
    tags: ["Dassault", "Rafale", "aviation"],
    paywall: false,
  },
  {
    id: "l3harris",
    name: "L3Harris Technologies – News",
    description: "Spécialiste américain de l'électronique de défense. Systèmes ISR, communications, guerre électronique et espace.",
    url: "https://www.l3harris.com/news",
    category: "industry",
    lang: ["EN"],
    tags: ["L3Harris", "USA", "électronique"],
    paywall: false,
  },
  {
    id: "hanwha",
    name: "Hanwha Aerospace – News",
    description: "Entreprise de défense sud-coréenne. Obusier autopropulsé K9, VCI K21 et systèmes de missiles.",
    url: "https://www.hanwhaaerospace.com/news",
    category: "industry",
    lang: ["EN", "KO"],
    tags: ["Corée", "systèmes", "artillerie"],
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
};

const TYPE_COLORS = {
  "Annual Report":     "bg-blue-50 text-blue-700 border-blue-200",
  "Research Report":   "bg-violet-50 text-violet-700 border-violet-200",
  "Policy Brief":      "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Étude stratégique": "bg-indigo-50 text-indigo-700 border-indigo-200",
  "Statistical Report":"bg-amber-50 text-amber-700 border-amber-200",
};

function SourceLogo({ url, size = "sm" }) {
  const domain = url.replace(/^https?:\/\//, "").split("/")[0];
  const [errored, setErrored] = useState(false);
  const dim = size === "lg" ? "w-8 h-8" : "w-5 h-5";
  if (errored) return <Globe2 className={`${dim} text-slate-300`} />;
  return (
    <img
      src={`https://logo.clearbit.com/${domain}`}
      alt=""
      className={`${dim} object-contain`}
      onError={() => setErrored(true)}
    />
  );
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
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
            Sources de référence
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Catalogue curé : presse, institutions, think tanks, données de marché et industrie
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 max-w-sm">
          <span className="text-amber-500">ℹ</span>
          <span>Liens directs vers les publications primaires. Aucun contenu n'est reproduit ici.</span>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col gap-1">
          <p className="text-2xl font-bold font-mono text-slate-900">{SOURCES.length}</p>
          <p className="text-xs text-slate-500">Sources totales</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col gap-1">
          <p className="text-2xl font-bold font-mono text-emerald-600">{totalFree}</p>
          <p className="text-xs text-slate-500">Accès gratuit</p>
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
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-4 h-4 text-blue-800" />
          <h2 className="font-heading text-lg font-bold text-slate-900">Études & rapports récents</h2>
          <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200 ml-1">
            {RECENT_STUDIES.length} publications
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {RECENT_STUDIES.map(study => (
            <a
              key={study.id}
              href={study.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <Card className="bg-white border-slate-200 shadow-sm h-full hover:border-blue-200 hover:shadow-lg transition-all duration-200">
                <CardContent className="p-4 flex flex-col gap-3 h-full">
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
                        <SourceLogo url={study.url} size="lg" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-blue-800 truncate">{study.source}</p>
                        <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                          <Calendar className="w-3 h-3 flex-shrink-0" />
                          <span>{formatDate(study.date)}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border flex-shrink-0 ${TYPE_COLORS[study.type] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}>
                      {study.type}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-slate-900 group-hover:text-blue-800 transition-colors leading-snug">
                      {study.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{study.subtitle}</p>
                  </div>

                  {/* Highlight */}
                  <div className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">
                    <div className="flex items-start gap-1.5">
                      <TrendingUp className="w-3 h-3 text-blue-700 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-700 leading-relaxed">{study.highlight}</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                    <div className="flex gap-1 flex-wrap">
                      {study.tags.slice(0, 2).map(tag => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-[10px] px-1.5 py-0 bg-slate-50 text-slate-500 border border-slate-100 font-normal"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-blue-700 font-medium group-hover:underline">
                      Lire <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </CardContent>
              </Card>
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
            placeholder="Rechercher une source, un tag..."
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
        {filtered.length} source{filtered.length > 1 ? "s" : ""} affichée{filtered.length > 1 ? "s" : ""}
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
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
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
                    {/* Languages */}
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
                    {/* Tags + paywall */}
                    <div className="flex items-center gap-1 flex-wrap justify-end">
                      {source.paywall ? (
                        <span className="flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-medium">
                          <Lock className="w-2.5 h-2.5" /> Payant
                        </span>
                      ) : (
                        <span className="flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                          <Unlock className="w-2.5 h-2.5" /> Gratuit
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
          <p className="text-sm">Aucune source ne correspond à cette recherche.</p>
        </div>
      )}
    </div>
  );
}
