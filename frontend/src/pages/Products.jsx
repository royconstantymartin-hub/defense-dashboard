import { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { API } from "@/App";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Package, Building2, Plane, Ship, Target, Cpu, Rocket, Satellite, GitCompare, X, Check, Clock, Database, Filter, ExternalLink, Radio, Youtube, Play } from "lucide-react";
import CompanyProfileSheet from "@/components/CompanyProfileSheet";
import { getLogoUrl, getClearbitUrl } from "@/lib/companyLogos";
import ProductIllustration from "@/components/ProductIllustration";

const CATEGORIES = [
  { value: "all", label: "All Categories", icon: Package },
  { value: "aircraft", label: "Aircraft", icon: Plane },
  { value: "naval", label: "Naval", icon: Ship },
  { value: "land", label: "Land Systems", icon: Target },
  { value: "missile", label: "Missiles", icon: Rocket },
  { value: "radar", label: "Radar Systems", icon: Radio },
  { value: "cyber", label: "Cyber / EW", icon: Cpu },
  { value: "space", label: "Space", icon: Satellite },
];

const MANUFACTURERS = [
  { value: "all", label: "All Manufacturers" },
  { value: "AeroVironment", label: "AeroVironment" },
  { value: "Airbus Defence & Space", label: "Airbus Defence & Space" },
  { value: "Almaz-Antey", label: "Almaz-Antey" },
  { value: "Anduril Industries", label: "Anduril Industries" },
  { value: "ARTEC", label: "ARTEC" },
  { value: "Austal", label: "Austal" },
  { value: "AVIC", label: "AVIC" },
  { value: "BAE Systems", label: "BAE Systems" },
  { value: "Baykar", label: "Baykar" },
  { value: "Bell-Boeing", label: "Bell-Boeing" },
  { value: "BMC Turkey", label: "BMC Turkey" },
  { value: "Boeing Defense", label: "Boeing Defense" },
  { value: "BrahMos Aerospace", label: "BrahMos Aerospace" },
  { value: "Cochin Shipyard", label: "Cochin Shipyard" },
  { value: "CSSC", label: "CSSC" },
  { value: "Damen Naval", label: "Damen Naval" },
  { value: "Dassault Aviation", label: "Dassault Aviation" },
  { value: "Diehl Defence", label: "Diehl Defence" },
  { value: "DRDO", label: "DRDO" },
  { value: "Elbit Systems", label: "Elbit Systems" },
  { value: "Epirus", label: "Epirus" },
  { value: "Exail Technologies", label: "Exail Technologies" },
  { value: "Fairchild Republic", label: "Fairchild Republic" },
  { value: "Fincantieri", label: "Fincantieri" },
  { value: "GDELS", label: "GDELS" },
  { value: "General Atomics", label: "General Atomics" },
  { value: "General Dynamics", label: "General Dynamics" },
  { value: "Ghost Robotics", label: "Ghost Robotics" },
  { value: "Grumman", label: "Grumman" },
  { value: "Hanwha Defense", label: "Hanwha Defense" },
  { value: "Hanwha Ocean", label: "Hanwha Ocean" },
  { value: "Harmattan AI", label: "Harmattan AI" },
  { value: "Helsing", label: "Helsing" },
  { value: "Hensoldt", label: "Hensoldt" },
  { value: "HESA", label: "HESA" },
  { value: "Hindustan Aeronautics", label: "Hindustan Aeronautics" },
  { value: "Huntington Ingalls", label: "Huntington Ingalls" },
  { value: "Hyundai Rotem", label: "Hyundai Rotem" },
  { value: "Israel Aerospace Industries", label: "Israel Aerospace Industries" },
  { value: "Israel Military Industries", label: "Israel Military Industries" },
  { value: "KNDS", label: "KNDS" },
  { value: "Kongsberg Defence", label: "Kongsberg Defence" },
  { value: "Kongsberg/Raytheon", label: "Kongsberg/Raytheon" },
  { value: "Konštrukta-Defence", label: "Konštrukta-Defence" },
  { value: "Korea Aerospace Industries", label: "Korea Aerospace Industries" },
  { value: "Krauss-Maffei Wegmann", label: "Krauss-Maffei Wegmann" },
  { value: "Kratos Defense", label: "Kratos Defense" },
  { value: "L3Harris Technologies", label: "L3Harris Technologies" },
  { value: "Leonardo", label: "Leonardo" },
  { value: "Lockheed Martin", label: "Lockheed Martin" },
  { value: "MBDA", label: "MBDA" },
  { value: "MBDA/Saab", label: "MBDA/Saab" },
  { value: "MBDA/Thales", label: "MBDA/Thales" },
  { value: "Milrem Robotics", label: "Milrem Robotics" },
  { value: "Mitsubishi Electric", label: "Mitsubishi Electric" },
  { value: "Mitsubishi Heavy Industries", label: "Mitsubishi Heavy Industries" },
  { value: "Mitsubishi/Kawasaki", label: "Mitsubishi/Kawasaki" },
  { value: "Naval Group", label: "Naval Group" },
  { value: "Navantia", label: "Navantia" },
  { value: "Nexter/Arquus/Thales", label: "Nexter/Arquus/Thales" },
  { value: "Nexter/Lockheed Martin", label: "Nexter/Lockheed Martin" },
  { value: "Norinco", label: "Norinco" },
  { value: "Northrop Grumman", label: "Northrop Grumman" },
  { value: "Oshkosh Defense", label: "Oshkosh Defense" },
  { value: "Palantir Technologies", label: "Palantir Technologies" },
  { value: "Panavia Aircraft", label: "Panavia Aircraft" },
  { value: "Patria", label: "Patria" },
  { value: "Quantum Systems", label: "Quantum Systems" },
  { value: "Rafael Advanced Defense", label: "Rafael Advanced Defense" },
  { value: "Rafael/Raytheon", label: "Rafael/Raytheon" },
  { value: "Raytheon Technologies", label: "Raytheon Technologies" },
  { value: "Raytheon/Lockheed Martin", label: "Raytheon/Lockheed Martin" },
  { value: "Rheinmetall", label: "Rheinmetall" },
  { value: "Rheinmetall BAE Systems", label: "Rheinmetall BAE Systems" },
  { value: "RSK MiG", label: "RSK MiG" },
  { value: "Saab AB", label: "Saab AB" },
  { value: "Saab Kockums", label: "Saab Kockums" },
  { value: "Sevmash", label: "Sevmash" },
  { value: "Shield AI", label: "Shield AI" },
  { value: "Sikorsky", label: "Sikorsky" },
  { value: "Sukhoi/UAC", label: "Sukhoi/UAC" },
  { value: "Tactical Missiles Corporation", label: "Tactical Missiles Corporation" },
  { value: "Thales", label: "Thales" },
  { value: "Thales Alenia Space", label: "Thales Alenia Space" },
  { value: "Thales/Airbus", label: "Thales/Airbus" },
  { value: "ThyssenKrupp Marine", label: "ThyssenKrupp Marine" },
  { value: "Tupolev", label: "Tupolev" },
  { value: "United Aircraft Corporation", label: "United Aircraft Corporation" },
  { value: "Uralvagonzavod", label: "Uralvagonzavod" },
];

// Wikipedia article title overrides for products whose names differ from their article titles
const WIKI_TITLES = {
  "F-35 Lightning II": "Lockheed Martin F-35 Lightning II",
  "F-22 Raptor": "Lockheed Martin F-22 Raptor",
  "Rafale F4": "Dassault Rafale",
  "Eurofighter Typhoon": "Eurofighter Typhoon",
  "Gripen E": "Saab JAS 39 Gripen",
  "KF-21 Boramae": "KAI KF-21 Boramae",
  "Patriot PAC-3": "MIM-104 Patriot",
  "S-400 Triumf": "S-400 missile system",
  "Iron Dome": "Iron Dome",
  "THAAD": "Terminal High Altitude Area Defense",
  "Virginia-class Submarine": "Virginia-class submarine",
  "Astute-class Submarine": "Astute-class submarine",
  "Suffren-class Submarine": "Suffren-class submarine",
  "M1A2 Abrams SEPv3": "M1 Abrams",
  "Leopard 2A7+": "Leopard 2",
  "K2 Black Panther": "K2 Black Panther",
  "Leclerc": "AMX-56 Leclerc",
  "MQ-9 Reaper": "General Atomics MQ-9 Reaper",
  "Bayraktar TB2": "Bayraktar TB2",
  "K9 Thunder": "K9 Thunder",
  "CAESAR": "CAESAR howitzer",
  "PzH 2000": "Panzerhaubitze 2000",
  "Type 26 Frigate": "Type 26 frigate",
  "FREMM Frigate": "FREMM multipurpose frigate",
  "F-15EX Eagle II": "McDonnell Douglas F-15 Eagle",
  "F/A-18E/F Super Hornet": "Boeing F/A-18E/F Super Hornet",
  "Su-57 Felon": "Sukhoi Su-57",
  "J-20 Mighty Dragon": "Chengdu J-20",
  "HAL Tejas Mk2": "HAL Tejas",
  "B-21 Raider": "Northrop Grumman B-21 Raider",
  "B-2 Spirit": "Northrop Grumman B-2 Spirit",
  "A-10 Thunderbolt II": "Fairchild Republic A-10 Thunderbolt II",
  "AH-64E Apache Guardian": "Boeing AH-64 Apache",
  "UH-60M Black Hawk": "Sikorsky UH-60 Black Hawk",
  "NH90": "NHIndustries NH90",
  "Tigre HAD": "Eurocopter Tiger",
  "CH-47F Chinook": "Boeing CH-47 Chinook",
  "V-22 Osprey": "Bell Boeing V-22 Osprey",
  "C-17 Globemaster III": "Boeing C-17 Globemaster III",
  "A400M Atlas": "Airbus A400M Atlas",
  "KC-46 Pegasus": "Boeing KC-46 Pegasus",
  "MQ-4C Triton": "Northrop Grumman MQ-4C Triton",
  "RQ-4 Global Hawk": "Northrop Grumman RQ-4 Global Hawk",
  "XQ-58 Valkyrie": "Kratos XQ-58 Valkyrie",
  "Bayraktar TB3": "Bayraktar TB3",
  "Switchblade 600": "AeroVironment Switchblade",
  "Tomahawk Block V": "Tomahawk (missile)",
  "SCALP/Storm Shadow": "Storm Shadow",
  "AGM-158 JASSM-ER": "AGM-158 JASSM",
  "Meteor BVRAAM": "MBDA Meteor",
  "AIM-120D AMRAAM": "AIM-120 AMRAAM",
  "Hellfire AGM-114R": "AGM-114 Hellfire",
  "Javelin FGM-148": "FGM-148 Javelin",
  "NSM Naval Strike Missile": "Naval Strike Missile",
  "Harpoon Block II": "AGM-84 Harpoon",
  "ASTER 30 SAMP/T": "Aster 30",
  "David's Sling": "David's Sling",
  "AGM-183A ARRW": "AGM-183 ARRW",
  "Kinzhal": "Kh-47M2 Kinzhal",
  "Arleigh Burke Flight III": "Arleigh Burke-class destroyer",
  "Type 45 Daring-class": "Type 45 destroyer",
  "Horizon-class Frigate": "Horizon-class frigate",
  "Mistral-class LHD": "Mistral-class amphibious assault ship",
  "Gerald R. Ford-class": "Gerald R. Ford-class aircraft carrier",
  "Queen Elizabeth-class": "Queen Elizabeth-class aircraft carrier",
  "Charles de Gaulle": "French aircraft carrier Charles de Gaulle",
  "Columbia-class Submarine": "Columbia-class submarine",
  "Dreadnought-class Submarine": "Dreadnought-class submarine",
  "Le Triomphant-class": "Le Triomphant-class submarine",
  "Challenger 3": "Challenger 2",
  "T-14 Armata": "T-14 Armata",
  "Merkava Mk 4M": "Merkava",
  "VBCI": "VBCI",
  "CV90 Mk IV": "CV90",
  "Puma IFV": "Puma (IFV)",
  "Boxer MRAV": "Boxer (armoured fighting vehicle)",
  "Stryker ICVV": "Stryker",
  "M270 MLRS": "M270 Multiple Launch Rocket System",
  "HIMARS": "M142 HIMARS",
  "ARCHER 155mm": "Archer artillery system",
  "GPS III Satellite": "GPS Block III",
  "SBIRS GEO": "Space Based Infrared System",
  "X-37B Space Plane": "Boeing X-37",
  "AN/ALQ-99 Jammer": "EA-18G Growler",
  "F-16 Block 70/72": "General Dynamics F-16 Fighting Falcon",
  "E-7A Wedgetail": "Boeing E-7",
  "P-8A Poseidon": "Boeing P-8 Poseidon",
  "E-2D Advanced Hawkeye": "Northrop Grumman E-2 Hawkeye",
  "KC-135 Stratotanker": "Boeing KC-135 Stratotanker",
  "MQ-1C Gray Eagle": "General Atomics MQ-1C Gray Eagle",
  "Namer APC": "Namer",
  "Bradley M2A4": "M2 Bradley",
  "Zumwalt-class Destroyer": "Zumwalt-class destroyer",
  "Starstreak HVM": "Starstreak",
  "BrahMos": "BrahMos",
  "SM-6 Standard Missile": "RIM-174 Standard ERAM",
  "Arjun Mk-1A": "Arjun (tank)",
  "Su-35S Flanker-E": "Sukhoi Su-35",
  "Tornado IDS": "Panavia Tornado",
  "AV-8B Harrier II": "McDonnell Douglas AV-8B Harrier II",
  "Heron TP": "IAI Heron",
  "Wing Loong II": "CAIG Wing Loong II",
  "AC-130J Ghostrider": "Lockheed AC-130",
  "Taurus KEPD 350": "Taurus (missile)",
  "IRIS-T SLM": "IRIS-T",
  "Arrow 3": "Arrow 3",
  "Barak 8 LRSAM": "Barak 8",
  "RIM-161 SM-3": "RIM-161 Standard Missile 3",
  "Type 055 Destroyer": "Type 055 destroyer",
  "INS Vikrant": "INS Vikrant (2013)",
  "K21 IFV": "K21 infantry fighting vehicle",
  "JLTV": "Joint Light Tactical Vehicle",
  "M109A7 Paladin": "M109 howitzer",
  "AS-90 Braveheart": "AS-90",
  "SPY-6 AMDR": "AN/SPY-6",
  "AN/TPY-2": "AN/TPY-2",
  "EA-18G Growler": "Boeing EA-18G Growler",
  "RC-135V/W Rivet Joint": "Boeing RC-135",
  "Exocet MM40 Block 3": "Exocet",
  "RBS-15 Mk4": "RBS-15",
  "Visby-class Corvette": "Visby-class corvette",
  "Type 212 Submarine": "Type 212 submarine",
  "Soryu-class Submarine": "Sōryū-class submarine",
  "AGM-88G AARGM-ER": "AGM-88 HARM",
  "Seawolf-class Submarine": "Seawolf-class submarine",
  "Vanguard-class Submarine": "Vanguard-class submarine",
  "Taigei-class Submarine": "Taigei-class submarine",
  "Gotland-class Submarine": "Gotland-class submarine",
  "Isaac Peral-class Submarine": "Isaac Peral-class submarine",
  "KSS-III Submarine": "KSS-III submarine",
  "Borei-class Submarine": "Borei-class submarine",
  "Yasen-class Submarine": "Yasen-class submarine",
  "Marder IFV": "Marder (IFV)",
  "AMX-10RC": "AMX-10 RC",
  "Altay Tank": "Altay (tank)",
  "Sa'ar 6 Corvette": "Sa'ar 6-class corvette",
  "Gowind-class Corvette": "Gowind-class corvette",
  "Constellation-class Frigate": "Constellation-class frigate",
  "MEKO A-200": "MEKO",
  "Independence-class LCS": "Independence-class littoral combat ship",
  "NASAMS": "NASAMS",
  "Mistral MANPADS": "Mistral (missile)",
  "Stinger FIM-92": "FIM-92 Stinger",
  "Spike NLOS": "Spike (missile)",
  "Spike ER2": "Spike (missile)",
  // Iconic / newly added
  "B-52H Stratofortress": "Boeing B-52 Stratofortress",
  "SR-71 Blackbird": "Lockheed SR-71 Blackbird",
  "F-117 Nighthawk": "Lockheed F-117 Nighthawk",
  "F-14 Tomcat": "Grumman F-14 Tomcat",
  "E-3 Sentry AWACS": "Boeing E-3 Sentry",
  "C-130J Super Hercules": "Lockheed C-130 Hercules",
  "Tu-160 Blackjack": "Tupolev Tu-160",
  "MiG-29 Fulcrum": "Mikoyan MiG-29",
  "Mirage 2000-5": "Dassault Mirage 2000",
  "MH-60R Seahawk": "Sikorsky SH-60 Seahawk",
  "AW101 Merlin HM2": "AgustaWestland AW101",
  "MQ-28A Ghost Bat": "Boeing MQ-28 Ghost Bat",
  "F/A-18C Hornet": "McDonnell Douglas F/A-18 Hornet",
  "Dassault nEUROn UCAV": "Dassault nEUROn",
  // Extended product catalog
  "Bayraktar Kizilelma": "Baykar Kızılelma",
  "Shahed-136": "Shahed-136",
  "HAROP": "IAI Harop",
  "MICA NG": "MICA (missile)",
  "Brimstone 3": "Brimstone (missile)",
  "CAMM-ER": "CAMM (missile)",
  "Type 10 Hitomaru": "Type 10 tank",
  "VBMR Griffon": "Griffon (vehicle)",
  "LRU (Lance-Roquettes Unitaire)": "M270 Multiple Launch Rocket System",
  "Syracuse IV": "Syracuse (satellite)",
  "Helios 2": "Hélios 2",
  "SATCOM Terminal AN/TSC-156": "Wideband Global SATCOM",
  "Cyber Operations Platform": "Cyberattack",
  "SPECTRA EW Suite": "SPECTRA (avionics)",
  "AN/TPS-80 G/ATOR": "AN/TPS-80",
  "Trophy APS": "Trophy (countermeasure)",
  "Iron Fist APS": "Iron Fist (countermeasure)",
  "Piranha V": "Piranha (armored personnel carrier)",
  "Pandur II": "Pandur II",
  "VT-4 Tank": "VT-4",
  "Scorpene-class Submarine": "Scorpène-class submarine",
  "LRASM AGM-158C": "Long Range Anti-Ship Missile",
  "VL-MICA": "MICA (missile)",
  "Akash-NG": "Akash (missile)",
  "SPYDER-MR": "SPYDER (missile)",
  "Eurodrone MALE": "Eurodrone",
  "PrSM Precision Strike Missile": "Precision Strike Missile",
  "Sea Venom": "Sea Venom (missile)",
  "HNLMS De Ruyter-class": "De Zeven Provinciën-class frigate",
  "Type 31 Frigate": "Type 31 frigate",
  "F126 Frigate": "F126 frigate",
  "Zuzana 2": "Zuzana howitzer",
  "Lynx KF41": "Lynx (IFV)",
  "8x8 Eitan APC": "Eitan (APC)",
  "WGS-11 Satellite": "Wideband Global SATCOM",
  "Pleiades Neo": "Pléiades Neo",
  "AN/APG-81 AESA Radar": "AN/APG-81",
  "CAESAR NG (Next Gen)": "CAESAR howitzer",
  "NGAD (Next Gen Air Dominance)": "Next Generation Air Dominance",
  "F-16 Viper (F-16V)": "General Dynamics F-16 Fighting Falcon",
  "Tempest / GCAP": "BAE Systems Tempest",
  "SCAF / NGF": "Future Combat Air System",
  "AGM-158B JASSM-ER": "AGM-158 JASSM",
  "PrSM (Precision Strike Missile)": "Precision Strike Missile",
  "ATACMS Block IVA": "MGM-140 ATACMS",
  "Storm Shadow / SCALP EG": "Storm Shadow",
  "Meteor BVR Missile": "MBDA Meteor",
  "SPEAR 3": "MBDA SPEAR",
  "NSM (Naval Strike Missile)": "Naval Strike Missile",
  "Exocet MM40 Block 3C": "Exocet",
  "LRASM": "Long Range Anti-Ship Missile",
  "Gowind Corvette": "Gowind-class corvette",
  "Type 23 Frigate": "Type 23 frigate",
  "CSO Optical Satellite": "Composante Spatiale Optique",
  "MUOS-5 Satellite": "Mobile User Objective System",
  "Milani / Michibiki": "Michibiki",
  "Falcon Shield C-UAS": "Counter-drone technology",
  "Lynx QC (Quick Command)": "Lynx (IFV)",
  "AMV35 IFV": "AMV (armored vehicle)",
  "Oerlikon Skyshield": "Skyshield",
  "Mistral SHORAD": "Mistral SHORAD",
  "Sea Fire 500": "Frégate de défense et d'intervention",
  "RBE2-AA AESA": "Dassault Rafale",
  "KRONOS Grand Naval": "EMPAR",
  "TRML-4D": "TRML-4D",
  "ELM-2084 MMR": "ELM-2084",
  "SMART-L MM/N": "SMART-L",
  "AN/APG-83 SABR": "AN/APG-83",
  "SeaSpray 7500E": "Seaspray (radar)",
  "Watchkeeper WK450": "Watchkeeper WK450",
  "Crotale NG": "Crotale NG",
  "VL MICA": "MICA (missile)",
  "Bushmaster M242": "M242 Bushmaster",
  "Harpoon Block II+ER": "AGM-84 Harpoon",
  "Javelin FGM-148F": "FGM-148 Javelin",
  // AI / Autonomous systems — mapped to visually similar real systems
  "Lattice AI Platform": "Anduril Industries",
  "Sentry Tower": "Anduril Industries",
  "Ghost-X Autonomous Aircraft": "Kratos XQ-58 Valkyrie",
  "Roadrunner-M Interceptor": "Anduril Industries",
  "Pulsar EW System": "EC-130H Compass Call",
  "Fury UCAV": "Northrop Grumman X-47B",
  "Altius-600M": "STM Kargu",
  "SG-1 Foresight": "Shield AI",
  "HX-2 Autonomous Drone": "General Atomics MQ-20 Avenger",
  "EW-Inferenz AI Platform": "AN/ALQ-99",
  "Heron Systems AI Dogfighter": "DARPA Air Combat Evolution",
  "Hivemind AI Pilot": "Shield AI",
  "V-BAT VTOL Drone": "Martin UAV V-Bat",
  "Vision 60 Q-UGV": "Ghost Robotics",
  "Leonidas HPM System": "Counter-electronics High Power Microwave Advanced Missile Project",
  "Maven Smart System": "Project Maven",
  "AIP Artificial Intelligence Platform": "Joint All-Domain Command and Control",
  "Switchblade 300": "AeroVironment Switchblade",
  "Puma AE UAS": "AeroVironment Puma",
  "JUMP 20 VTOL UAS": "AeroVironment",
  "Trinity F90+": "Quantum-Systems",
  "Vector UAV": "Quantum-Systems",
  "DG100 Autonomous USV": "Sea Hunter (ship)",
  "IDEFX Autonomous UUV": "Boeing Orca (autonomous underwater vehicle)",
  "Harmattan Combat Drone": "ScanEagle",
  "Harmattan Layered Air Defense": "Sky Sabre",
  "Harmattan EW Suite": "EC-130H Compass Call",
  "Harmattan C2 Platform": "Blue Force Tracking",
  "THeMIS UGV": "THeMIS",
  "Type-X RCV": "Milrem Robotics",
};

// YouTube presentation video IDs — verified directly from official manufacturer websites
// Format: product name (must match seed data exactly) → YouTube video ID
const YOUTUBE_VIDEOS = {
  "F-35 Lightning II":     "9GLxUGQwYbk", // lockheedmartin.com – F-35 Capabilities: Stealth
  "F-22 Raptor":           "fnmMebmEHaw", // lockheedmartin.com – Designed to Dominate
  "B-21 Raider":           "chJlJgrvfBY", // northropgrumman.com – B-21 Raider Unveiling (Dec 2022)
  "B-2 Spirit":            "ORyn0Zm3oeM", // northropgrumman.com – The B-2 at 30
  "RQ-4 Global Hawk":      "mprYM6eTwoc", // northropgrumman.com – Global Hawk first mission
  "E-2D Advanced Hawkeye": "u9LmpUS6-pE", // northropgrumman.com – FLOW: E-2D Enhancement
};


export default function Products() {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedManufacturer, setSelectedManufacturer] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get("manufacturer") || "all";
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(false);
  const [profileName, setProfileName] = useState(null);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const [showComparison, setShowComparison]= useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 24;

  // YouTube video availability: track which product names have a broken/deleted video
  const [brokenVideos, setBrokenVideos] = useState(new Set());

  // Wikipedia image cache: fetched client-side for every product on load
  const [wikiImages, setWikiImages] = useState({});     // productId → url
  const [primaryErr, setPrimaryErr] = useState({});     // productId → true when DB url failed
  const [wikiErr, setWikiErr] = useState({});           // productId → true when wiki url failed
  const fetchedIds = useRef(new Set());

  const fetchWikiImage = useCallback(async (productId, productName) => {
    if (fetchedIds.current.has(productId)) return;
    fetchedIds.current.add(productId);
    const title = (WIKI_TITLES[productName] || productName).replace(/ /g, '_');

    // Primary: MediaWiki pageimages API — returns pre-generated thumbs at the exact size requested.
    // More reliable than the REST summary API which can return full-res URLs or sizes Wikimedia
    // hasn't pre-generated (causing 404s on the <img> element).
    try {
      const r = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=400&origin=*`
      );
      if (r.ok) {
        const d = await r.json();
        const pages = d.query?.pages;
        const src = pages && Object.values(pages)[0]?.thumbnail?.source;
        if (src) {
          setWikiImages(prev => ({ ...prev, [productId]: src }));
          return;
        }
      }
    } catch (e) {
      console.warn('[Products] Wikipedia pageimages fetch failed for', productName, e?.message);
    }

    // Fallback: REST summary API — use the thumbnail URL as-is (it's a pre-generated size)
    try {
      const r = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
      );
      if (r.ok) {
        const d = await r.json();
        const src = d.thumbnail?.source || d.originalimage?.source;
        if (src) setWikiImages(prev => ({ ...prev, [productId]: src }));
      }
    } catch (e) {
      console.warn('[Products] Wikipedia REST fetch failed for', productName, e?.message);
    }
  }, []);

  // Pre-fetch Wikipedia images, staggered in batches to avoid rate-limiting
  // the Wikipedia REST API when the full catalog (140+ products) is visible.
  useEffect(() => {
    const BATCH_SIZE = 8;
    const BATCH_DELAY_MS = 250;
    const timeouts = [];
    filteredProducts.forEach((p, i) => {
      const delay = Math.floor(i / BATCH_SIZE) * BATCH_DELAY_MS;
      if (delay === 0) {
        fetchWikiImage(p.id, p.name);
      } else {
        timeouts.push(setTimeout(() => fetchWikiImage(p.id, p.name), delay));
      }
    });
    return () => timeouts.forEach(clearTimeout);
  }, [filteredProducts, fetchWikiImage]);


  // Convert a raw Wikimedia upload URL to its thumb variant (more reliably served).
  // e.g. .../commons/a/ab/file.jpg  →  .../commons/thumb/a/ab/file.jpg/400px-file.jpg
  const toWikiThumb = (url) => {
    if (!url) return null;
    if (url.includes('/thumb/')) return url;
    const m = url.match(/\/commons\/([a-f0-9]\/[a-f0-9]{2})\/(.+?)(\?.*)?$/i);
    if (!m) return url;
    return `https://upload.wikimedia.org/wikipedia/commons/thumb/${m[1]}/${m[2]}/400px-${m[2]}`;
  };

  // Choose which image URL to show for a product.
  // Prefers the fresh Wikipedia thumbnail; falls back to the raw DB url.
  // Returns null when both have failed (triggering the icon placeholder).
  const resolveImgSrc = (productId, dbUrl) => {
    const wikiSrc = wikiImages[productId];
    if (wikiSrc && !wikiErr[productId]) return wikiSrc;
    if (dbUrl && !primaryErr[productId]) return dbUrl;
    return null;
  };

  const handleImgError = (ev, productId, imgSrc) => {
    const wikiSrc = wikiImages[productId];
    ev.target.style.display = 'none';
    if (imgSrc === wikiSrc) {
      setWikiErr(prev => ({ ...prev, [productId]: true }));
    } else {
      setPrimaryErr(prev => ({ ...prev, [productId]: true }));
    }
  };

  const goToCompanyProfile = (e, manufacturer) => {
    e.stopPropagation();
    setProfileName(manufacturer);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API}/products`);
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Reset inline video player when a different product is opened
  useEffect(() => {
    setPlayingVideo(false);
  }, [selectedProduct]);

  useEffect(() => {
    let filtered = products;
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    if (selectedManufacturer !== "all") {
      filtered = filtered.filter(p => p.manufacturer === selectedManufacturer);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.product_type.toLowerCase().includes(term) ||
        p.manufacturer.toLowerCase().includes(term)
      );
    }
    
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedManufacturer, products]);

  const getCategoryIcon = (category) => {
    const cat = CATEGORIES.find(c => c.value === category);
    return cat?.icon || Package;
  };

  const toggleProductForCompare = (product) => {
    if (selectedForCompare.find(p => p.id === product.id)) {
      setSelectedForCompare(selectedForCompare.filter(p => p.id !== product.id));
    } else if (selectedForCompare.length < 3) {
      setSelectedForCompare([...selectedForCompare, product]);
    }
  };

  const startComparison = () => {
    if (selectedForCompare.length >= 2) {
      setShowComparison(true);
    }
  };

  const clearComparison = () => {
    setSelectedForCompare([]);
    setCompareMode(false);
    setShowComparison(false);
  };

  const getAllSpecKeys = () => {
    const keys = new Set();
    selectedForCompare.forEach(p => {
      Object.keys(p.specifications).forEach(k => keys.add(k));
    });
    return Array.from(keys);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'development':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'retired':
        return 'bg-slate-100 text-slate-500 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-500 border-slate-200';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'aircraft': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'naval': return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'land': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'missile': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'radar': return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'cyber': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'space': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div data-testid="products-page" className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">
            Product Portfolio
          </h1>
          <p className="text-slate-500 text-sm mt-1">Defense Systems & Equipment Catalog</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 rounded-lg px-3 py-2">
          <Clock className="w-3.5 h-3.5" />
          <span>Last updated: {new Date().toLocaleDateString()}</span>
          <span className="text-slate-300">|</span>
          <Database className="w-3.5 h-3.5" />
          <span>Source: Manufacturers, Jane's</span>
        </div>
      </div>

      {/* Compare Mode Bar */}
      {compareMode && (
        <Card className="bg-purple-50 border-purple-200 shadow-sm">
          <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <GitCompare className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-slate-900 font-medium">Compare Mode Active</p>
                <p className="text-sm text-slate-600">
                  Select 2-3 products to compare ({selectedForCompare.length}/3 selected)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                onClick={startComparison}
                disabled={selectedForCompare.length < 2}
                className="bg-purple-700 hover:bg-purple-800 text-white"
                data-testid="start-comparison-btn"
              >
                Compare ({selectedForCompare.length})
              </Button>
              <Button 
                variant="outline" 
                onClick={clearComparison}
                className="border-slate-300 text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Selected Products Preview */}
      {compareMode && selectedForCompare.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedForCompare.map(product => (
            <div 
              key={product.id}
              className="flex items-center gap-2 bg-white border border-purple-200 rounded-lg px-3 py-2 shadow-sm"
            >
              <span className="text-sm text-slate-900 font-medium">{product.name}</span>
              <button 
                onClick={() => toggleProductForCompare(product)}
                className="text-slate-400 hover:text-rose-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">TOTAL</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-1">{products.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">AIRCRAFT</p>
            <p className="text-2xl font-mono font-bold text-blue-600 mt-1">
              {products.filter(p => p.category === 'aircraft').length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">MISSILES</p>
            <p className="text-2xl font-mono font-bold text-rose-600 mt-1">
              {products.filter(p => p.category === 'missile').length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">LAND</p>
            <p className="text-2xl font-mono font-bold text-amber-600 mt-1">
              {products.filter(p => p.category === 'land').length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">RADAR</p>
            <p className="text-2xl font-mono font-bold text-teal-600 mt-1">
              {products.filter(p => p.category === 'radar').length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">ACTIVE</p>
            <p className="text-2xl font-mono font-bold text-emerald-600 mt-1">
              {products.filter(p => p.status === 'active').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
            data-testid="search-products"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48 bg-white border-slate-200 text-slate-700" data-testid="category-filter">
            <Filter className="w-4 h-4 mr-2 text-slate-400" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200">
            {CATEGORIES.map(c => (
              <SelectItem key={c.value} value={c.value} className="text-slate-700 focus:bg-purple-50">
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedManufacturer} onValueChange={setSelectedManufacturer}>
          <SelectTrigger className="w-full sm:w-56 bg-white border-slate-200 text-slate-700" data-testid="manufacturer-filter">
            <Building2 className="w-4 h-4 mr-2 text-slate-400" />
            <SelectValue placeholder="Manufacturer" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200 max-h-80">
            {MANUFACTURERS.map(m => (
              <SelectItem key={m.value} value={m.value} className="text-slate-700 focus:bg-purple-50">
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant={compareMode ? "default" : "outline"}
          onClick={() => setCompareMode(!compareMode)}
          className={compareMode 
            ? "bg-purple-700 hover:bg-purple-800 text-white" 
            : "border-slate-200 text-slate-700 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200"
          }
          data-testid="compare-mode-btn"
        >
          <GitCompare className="w-4 h-4 mr-2" />
          Compare
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" data-testid="products-grid">
        {filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((product) => {
          const Icon = getCategoryIcon(product.category);
          const isSelectedForCompare = selectedForCompare.find(p => p.id === product.id);
          const logoUrl = getClearbitUrl(product.manufacturer);
          return (
            <Card 
              key={product.id}
              className={`bg-white border-slate-200 shadow-sm hover:shadow-lg hover:border-purple-200 transition-all duration-300 cursor-pointer overflow-hidden ${
                isSelectedForCompare ? 'ring-2 ring-purple-500 border-purple-500' : ''
              }`}
              onClick={(e) => compareMode ? toggleProductForCompare(product) : setSelectedProduct(product)}
              data-testid={`product-card-${product.id}`}
            >
              {/* Image or Placeholder */}
              <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-50 relative">
                {(() => {
                  const imgSrc = resolveImgSrc(product.id, product.image_url);
                  return imgSrc ? (
                    <img
                      key={imgSrc}
                      src={imgSrc}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(ev) => handleImgError(ev, product.id, imgSrc)}
                    />
                  ) : (
                    <ProductIllustration
                      category={product.category}
                      productType={product.product_type}
                      name={product.name}
                    />
                  );
                })()}
                <span className={`absolute top-2 right-2 text-xs font-medium px-2 py-0.5 rounded-full border ${getStatusStyle(product.status)}`}>
                  {product.status.toUpperCase()}
                </span>
                {compareMode && (
                  <div className={`absolute top-2 left-2 w-6 h-6 rounded-lg flex items-center justify-center ${
                    isSelectedForCompare ? 'bg-purple-600' : 'bg-white border border-slate-200'
                  }`}>
                    {isSelectedForCompare && <Check className="w-4 h-4 text-white" />}
                  </div>
                )}
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-slate-900 font-medium text-sm">{product.name}</h3>
                    <button
                      onClick={(e) => goToCompanyProfile(e, product.manufacturer)}
                      className="flex items-center gap-1.5 mt-1.5 group text-left bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-200 rounded-lg px-2 py-1 transition-all"
                      title={`View ${product.manufacturer} profile`}
                    >
                      <span className="w-5 h-5 rounded-full bg-white ring-1 ring-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                        {logoUrl ? (
                          <img
                            src={logoUrl}
                            alt=""
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextElementSibling.style.display = 'block';
                            }}
                          />
                        ) : null}
                        <Building2
                          className="w-3 h-3 text-slate-400 group-hover:text-purple-500 transition-colors"
                          style={{ display: logoUrl ? 'none' : 'block' }}
                        />
                      </span>
                      <p className="text-xs text-slate-600 group-hover:text-purple-700 font-medium transition-colors truncate max-w-[120px]">
                        {product.manufacturer}
                      </p>
                      <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-purple-500 transition-colors shrink-0" />
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${getCategoryColor(product.category)}`}>
                    {product.category}
                  </span>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full capitalize">
                    {product.product_type.replace('_', ' ')}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-slate-500 bg-white rounded-lg border border-slate-200">
          No products found matching your criteria
        </div>
      )}

      {/* Pagination */}
      {filteredProducts.length > ITEMS_PER_PAGE && (() => {
        const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
        const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
        const end = Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length);
        return (
          <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-3">
            <p className="text-sm text-slate-500">
              Showing <span className="font-medium text-slate-900">{start}–{end}</span> of{' '}
              <span className="font-medium text-slate-900">{filteredProducts.length}</span> products
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="border-slate-200 text-slate-700 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 disabled:opacity-40"
              >
                ← Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                .reduce((acc, p, idx, arr) => {
                  if (idx > 0 && p - arr[idx - 1] > 1) acc.push('…');
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, idx) =>
                  p === '…' ? (
                    <span key={`ellipsis-${idx}`} className="px-2 text-slate-400 text-sm">…</span>
                  ) : (
                    <Button
                      key={p}
                      variant={p === currentPage ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(p)}
                      className={p === currentPage
                        ? 'bg-purple-700 hover:bg-purple-800 text-white border-purple-700 min-w-[36px]'
                        : 'border-slate-200 text-slate-700 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 min-w-[36px]'
                      }
                    >
                      {p}
                    </Button>
                  )
                )
              }
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="border-slate-200 text-slate-700 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 disabled:opacity-40"
              >
                Next →
              </Button>
            </div>
          </div>
        );
      })()}

      {/* Comparison Modal – portaled to body to escape CSS transform containing block */}
      {showComparison && createPortal(
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
          onClick={() => setShowComparison(false)}
        >
          <Card 
            className="bg-white border-slate-200 w-full max-w-6xl my-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            data-testid="comparison-modal"
          >
            <CardHeader className="border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <GitCompare className="w-5 h-5 text-purple-600" />
                  </div>
                  <CardTitle className="font-heading text-xl text-slate-900">Product Comparison</CardTitle>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={() => setShowComparison(false)}
                  className="text-slate-400 hover:text-slate-900"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 p-4 w-40">
                      ATTRIBUTE
                    </th>
                    {selectedForCompare.map(product => (
                      <th key={product.id} className="text-center p-4">
                        <div className="flex flex-col items-center gap-2">
                          {(() => {
                            const CmpIcon = getCategoryIcon(product.category);
                            return (
                              <div className="w-20 h-20 rounded-lg border border-slate-200 overflow-hidden bg-slate-100 relative flex items-center justify-center">
                                <ProductIllustration category={product.category} productType={product.product_type} name={product.name} className="absolute inset-0" />
                                {resolveImgSrc(product.id, product.image_url) && (
                                  <img
                                    key={resolveImgSrc(product.id, product.image_url)}
                                    src={resolveImgSrc(product.id, product.image_url)}
                                    alt={product.name}
                                    className="w-full h-full object-cover relative z-10"
                                    onError={(ev) => handleImgError(ev, product.id, resolveImgSrc(product.id, product.image_url))}
                                  />
                                )}
                              </div>
                            );
                          })()}
                          <span className="text-slate-900 font-medium text-sm">{product.name}</span>
                          <span className="text-xs text-slate-500">{product.manufacturer}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Category */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Category</td>
                    {selectedForCompare.map(product => (
                      <td key={product.id} className="p-4 text-center">
                        <span className={`text-sm font-medium px-3 py-1 rounded-full border capitalize ${getCategoryColor(product.category)}`}>
                          {product.category}
                        </span>
                      </td>
                    ))}
                  </tr>
                  {/* Type */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Type</td>
                    {selectedForCompare.map(product => (
                      <td key={product.id} className="p-4 text-center">
                        <span className="text-sm text-slate-700 capitalize">{product.product_type.replace('_', ' ')}</span>
                      </td>
                    ))}
                  </tr>
                  {/* Status */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</td>
                    {selectedForCompare.map(product => (
                      <td key={product.id} className="p-4 text-center">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${getStatusStyle(product.status)}`}>
                          {product.status.toUpperCase()}
                        </span>
                      </td>
                    ))}
                  </tr>
                  {/* Specifications */}
                  {getAllSpecKeys().map(specKey => (
                    <tr key={specKey} className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        {specKey.replace('_', ' ')}
                      </td>
                      {selectedForCompare.map(product => (
                        <td key={product.id} className="p-4 text-center">
                          <span className="text-sm font-mono text-slate-900">
                            {product.specifications[specKey] || '-'}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* Materials */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Materials</td>
                    {selectedForCompare.map(product => (
                      <td key={product.id} className="p-4">
                        <div className="flex flex-wrap justify-center gap-1">
                          {product.materials.map((m, idx) => (
                            <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                              {m}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>,
        document.body
      )}

      {/* Product Detail Modal – portaled to body to escape CSS transform containing block */}
      {selectedProduct && createPortal(
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: 'min(90vh, 720px)' }}
            onClick={(e) => e.stopPropagation()}
            data-testid="product-detail-modal"
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 z-20 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Image – fixed height, never collapses */}
            <div className="h-52 bg-gradient-to-br from-slate-100 to-slate-50 flex-shrink-0 relative">
              {(() => {
                const modalImgSrc = resolveImgSrc(selectedProduct.id, selectedProduct.image_url);
                if (modalImgSrc) {
                  return (
                    <img
                      key={modalImgSrc}
                      src={modalImgSrc}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                      onError={(ev) => handleImgError(ev, selectedProduct.id, modalImgSrc)}
                    />
                  );
                }
                return (
                  <ProductIllustration
                    category={selectedProduct.category}
                    productType={selectedProduct.product_type}
                    name={selectedProduct.name}
                    className="absolute inset-0"
                  />
                );
              })()}
              <span className={`absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full border ${getStatusStyle(selectedProduct.status)}`}>
                {selectedProduct.status.toUpperCase()}
              </span>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 p-6 space-y-5">
              {/* Title + manufacturer */}
              <div>
                <h2 className="font-heading text-xl font-bold text-slate-900 leading-tight">{selectedProduct.name}</h2>
                <button
                  onClick={(e) => goToCompanyProfile(e, selectedProduct.manufacturer)}
                  className="flex items-center gap-2 mt-2 group text-left bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-200 rounded-lg px-2.5 py-1.5 transition-all"
                  title={`View ${selectedProduct.manufacturer} profile`}
                >
                  {getClearbitUrl(selectedProduct.manufacturer) ? (
                    <img
                      src={getClearbitUrl(selectedProduct.manufacturer)}
                      alt={selectedProduct.manufacturer}
                      className="w-5 h-5 rounded object-contain shrink-0"
                      onError={(ev) => { ev.target.style.display = 'none'; ev.target.nextElementSibling.style.display = 'block'; }}
                    />
                  ) : null}
                  <Building2
                    className="w-4 h-4 text-slate-400 group-hover:text-purple-500 shrink-0 transition-colors"
                    style={{ display: getClearbitUrl(selectedProduct.manufacturer) ? 'none' : 'block' }}
                  />
                  <span className="text-sm text-slate-600 group-hover:text-purple-700 font-medium transition-colors">
                    {selectedProduct.manufacturer}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-purple-500 transition-colors" />
                </button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full border capitalize ${getCategoryColor(selectedProduct.category)}`}>
                  {selectedProduct.category}
                </span>
                <span className="text-xs bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-full capitalize">
                  {selectedProduct.product_type.replace(/_/g, ' ')}
                </span>
              </div>

              {/* YouTube Presentation Video */}
              {YOUTUBE_VIDEOS[selectedProduct.name] && !brokenVideos.has(selectedProduct.name) && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Presentation Video</p>
                  {playingVideo ? (
                    /* Inline iframe player — video plays directly in the modal */
                    <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-black" style={{ aspectRatio: '16/9' }}>
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEOS[selectedProduct.name]}?autoplay=1&rel=0`}
                        title={`${selectedProduct.name} presentation`}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    /* Clickable thumbnail — click to play inline */
                    <button
                      onClick={(e) => { e.stopPropagation(); setPlayingVideo(true); }}
                      className="group block w-full relative rounded-xl overflow-hidden border border-slate-200 hover:border-red-300 transition-all shadow-sm hover:shadow-md cursor-pointer"
                    >
                      <div className="relative w-full bg-slate-800" style={{ aspectRatio: '16/9' }}>
                        <img
                          src={`https://img.youtube.com/vi/${YOUTUBE_VIDEOS[selectedProduct.name]}/hqdefault.jpg`}
                          alt={`${selectedProduct.name} presentation`}
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={(ev) => { ev.target.style.display = 'none'; }}
                        />
                        {/* Fallback icon if thumbnail unavailable */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <Youtube className="w-12 h-12 text-slate-600" />
                        </div>
                      </div>
                      {/* Play overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/35 transition-colors">
                        <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-white ml-1" fill="white" />
                        </div>
                      </div>
                      {/* Badge */}
                      <div className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-black/70 rounded px-2 py-1">
                        <Youtube className="w-3.5 h-3.5 text-red-500" />
                        <span className="text-white text-xs font-medium">Lire ici</span>
                      </div>
                    </button>
                  )}
                </div>
              )}

              {/* Specs */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Technical Specifications</p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                    <div key={key} className="bg-slate-50 border border-slate-100 px-3 py-2.5 rounded-lg">
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{key.replace(/_/g, ' ')}</p>
                      <p className="text-slate-900 font-mono text-sm mt-0.5">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Materials & Composites</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProduct.materials.map((material, idx) => (
                    <span key={idx} className="text-xs bg-purple-50 text-purple-700 border border-purple-100 px-2.5 py-1 rounded-full">
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Company Profile Sheet */}
      <CompanyProfileSheet name={profileName} onClose={() => setProfileName(null)} />
    </div>
  );
}
