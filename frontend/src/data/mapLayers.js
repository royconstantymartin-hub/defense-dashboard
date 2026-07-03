// Static OSINT layers for the World Monitor map.
// All entries are public knowledge (Wikipedia / FAS / official sites);
// coordinates are approximate site centroids. Bundled with the app so the
// layers work offline and never depend on an external service.
//
// Shape/colour pairs are chosen so no two layers share both attributes —
// identity never relies on colour alone (tooltips + zoom labels also name
// every site).

// Colours validated colourblind-safe on the light surface (dataviz check);
// each layer also carries a distinct shape + labels, so identity never
// relies on colour alone.
export const LAYER_DEFS = {
  incidents: { label: "Live incidents",         color: "#e11d48", shape: "circle" },
  theaters:  { label: "Theaters of operation",  color: "#e11d48", shape: "ring" },
  nuclear:   { label: "Nuclear sites",          color: "#b45309", shape: "diamond" },
  nato:      { label: "NATO installations",     color: "#2563eb", shape: "square" },
  us:        { label: "US bases",               color: "#7c3aed", shape: "triangle" },
  france:    { label: "French bases",           color: "#059669", shape: "hexagon" },
};

// ── Theaters of operation (rendered as area rings that grow with zoom) ───────
export const THEATERS = [
  { id: "th-ua",  name: "Ukraine front",        cc: "ua", country: "Ukraine",       lat: 48.0,  lng: 37.5,   note: "Full-scale war since Feb 2022 — main line of contact in the east and south." },
  { id: "th-il",  name: "Gaza & Levant",        cc: "ps", country: "Gaza / Israel / Lebanon", lat: 31.7, lng: 34.8, note: "Israel–Hamas war and cross-border exchanges with Hezbollah." },
  { id: "th-rs",  name: "Red Sea / Bab el-Mandeb", cc: "ye", country: "Yemen",      lat: 13.5,  lng: 43.0,   note: "Houthi attacks on shipping; coalition naval patrols (Prosperity Guardian)." },
  { id: "th-sd",  name: "Sudan civil war",      cc: "sd", country: "Sudan",         lat: 15.0,  lng: 30.0,   note: "SAF vs RSF since April 2023 — world's largest displacement crisis." },
  { id: "th-sah", name: "Sahel insurgency",     cc: "ml", country: "Mali / Burkina / Niger", lat: 14.5, lng: 0.0, note: "Jihadist insurgencies (JNIM, ISSP) across the central Sahel." },
  { id: "th-cd",  name: "Eastern DRC",          cc: "cd", country: "DR Congo",      lat: -1.5,  lng: 29.0,   note: "M23 offensive and multiple armed groups around North & South Kivu." },
  { id: "th-mm",  name: "Myanmar civil war",    cc: "mm", country: "Myanmar",       lat: 21.0,  lng: 96.0,   note: "Junta vs resistance forces and ethnic armed organisations." },
  { id: "th-so",  name: "Somalia",              cc: "so", country: "Somalia",       lat: 3.0,   lng: 45.5,   note: "Al-Shabaab insurgency; AU and US counter-terrorism operations." },
  { id: "th-ht",  name: "Haiti",                cc: "ht", country: "Haiti",         lat: 18.9,  lng: -72.4,  note: "Gang control of Port-au-Prince; multinational security support mission." },
  { id: "th-scs", name: "South China Sea",      cc: "ph", country: "SCS claimants", lat: 12.0,  lng: 115.0,  note: "Maritime stand-offs over disputed reefs and shoals." },
  { id: "th-tw",  name: "Taiwan Strait",        cc: "tw", country: "Taiwan",        lat: 24.0,  lng: 119.5,  note: "PLA air/naval pressure across the median line." },
];

// ── Nuclear weapons-related sites (deterrent bases, sharing bases, programs) ─
export const NUCLEAR_SITES = [
  // France
  { id: "nu-il",  name: "Île Longue",          cc: "fr", country: "France",   lat: 48.30, lng: -4.50,  note: "SSBN base of the Force océanique stratégique (FOST)." },
  { id: "nu-sd",  name: "Saint-Dizier AB 113", cc: "fr", country: "France",   lat: 48.63, lng: 4.90,   note: "Rafale squadrons of the airborne deterrent (ASMP-A)." },
  // United States
  { id: "nu-ba",  name: "Naval Base Kitsap-Bangor", cc: "us", country: "United States", lat: 47.72, lng: -122.71, note: "Pacific SSBN fleet (Ohio-class, Trident II)." },
  { id: "nu-kb",  name: "Kings Bay",           cc: "us", country: "United States", lat: 30.80, lng: -81.52, note: "Atlantic SSBN fleet (Ohio-class, Trident II)." },
  { id: "nu-mi",  name: "Minot AFB",           cc: "us", country: "United States", lat: 48.42, lng: -101.34, note: "Minuteman III ICBMs and B-52H bombers." },
  { id: "nu-ma",  name: "Malmstrom AFB",       cc: "us", country: "United States", lat: 47.50, lng: -111.18, note: "Minuteman III ICBM wing." },
  { id: "nu-fw",  name: "F.E. Warren AFB",     cc: "us", country: "United States", lat: 41.13, lng: -104.87, note: "Minuteman III ICBM wing." },
  { id: "nu-wh",  name: "Whiteman AFB",        cc: "us", country: "United States", lat: 38.73, lng: -93.55, note: "B-2 Spirit stealth bomber wing." },
  { id: "nu-bk",  name: "Barksdale AFB",       cc: "us", country: "United States", lat: 32.50, lng: -93.66, note: "B-52H wing — Air Force Global Strike Command HQ." },
  // United Kingdom
  { id: "nu-fa",  name: "HMNB Clyde (Faslane)", cc: "gb", country: "United Kingdom", lat: 56.07, lng: -4.82, note: "Vanguard-class SSBNs — UK Trident deterrent." },
  // NATO nuclear sharing (B61 bombs)
  { id: "nu-bu",  name: "Büchel AB",           cc: "de", country: "Germany",  lat: 50.17, lng: 7.06,   note: "NATO nuclear sharing — German Tornado/F-35 wing." },
  { id: "nu-kbg", name: "Kleine Brogel AB",    cc: "be", country: "Belgium",  lat: 51.17, lng: 5.47,   note: "NATO nuclear sharing — Belgian F-16/F-35 wing." },
  { id: "nu-vo",  name: "Volkel AB",           cc: "nl", country: "Netherlands", lat: 51.65, lng: 5.70, note: "NATO nuclear sharing — Dutch F-35 wing." },
  { id: "nu-gh",  name: "Ghedi AB",            cc: "it", country: "Italy",    lat: 45.43, lng: 10.27,  note: "NATO nuclear sharing — Italian Tornado/F-35 wing." },
  { id: "nu-av",  name: "Aviano AB (storage)", cc: "it", country: "Italy",    lat: 46.08, lng: 12.65,  note: "US B61 storage site co-located with the USAF wing." },
  { id: "nu-in",  name: "Incirlik AB (storage)", cc: "tr", country: "Turkey", lat: 37.05, lng: 35.48,  note: "US B61 storage site." },
  // Russia
  { id: "nu-ga",  name: "Gadzhiyevo (Kola)",   cc: "ru", country: "Russia",   lat: 69.25, lng: 33.33,  note: "Northern Fleet SSBN base." },
  { id: "nu-vi",  name: "Vilyuchinsk",         cc: "ru", country: "Russia",   lat: 52.93, lng: 158.40, note: "Pacific Fleet SSBN base (Kamchatka)." },
  { id: "nu-en",  name: "Engels-2 AB",         cc: "ru", country: "Russia",   lat: 51.48, lng: 46.21,  note: "Strategic bomber base (Tu-95MS, Tu-160)." },
  // China
  { id: "nu-yu",  name: "Yulin (Longpo)",      cc: "cn", country: "China",    lat: 18.20, lng: 109.68, note: "PLAN SSBN base on Hainan island." },
  // Others
  { id: "nu-pu",  name: "Punggye-ri",          cc: "kp", country: "North Korea", lat: 41.28, lng: 129.09, note: "Nuclear test site." },
  { id: "nu-na",  name: "Natanz",              cc: "ir", country: "Iran",     lat: 33.72, lng: 51.73,  note: "Uranium enrichment complex." },
  { id: "nu-di",  name: "Dimona (Negev NRC)",  cc: "il", country: "Israel",   lat: 31.00, lng: 35.15,  note: "Negev Nuclear Research Center." },
];

// ── NATO commands & multinational installations ──────────────────────────────
export const NATO_BASES = [
  { id: "na-hq",  name: "NATO HQ",             cc: "be", country: "Belgium",  lat: 50.88, lng: 4.42,   note: "Political headquarters of the Alliance (Brussels)." },
  { id: "na-sh",  name: "SHAPE (Mons)",        cc: "be", country: "Belgium",  lat: 50.45, lng: 3.99,   note: "Supreme Headquarters Allied Powers Europe — SACEUR." },
  { id: "na-br",  name: "JFC Brunssum",        cc: "nl", country: "Netherlands", lat: 50.95, lng: 5.97, note: "Joint Force Command for the northern flank." },
  { id: "na-np",  name: "JFC Naples",          cc: "it", country: "Italy",    lat: 40.88, lng: 14.19,  note: "Joint Force Command for the southern flank." },
  { id: "na-ac",  name: "AIRCOM Ramstein",     cc: "de", country: "Germany",  lat: 49.40, lng: 7.55,   note: "Allied Air Command — NATO air & missile defence." },
  { id: "na-ge",  name: "Geilenkirchen AB",    cc: "de", country: "Germany",  lat: 50.96, lng: 6.04,   note: "NATO E-3A AWACS fleet home base." },
  { id: "na-si",  name: "Šiauliai AB",         cc: "lt", country: "Lithuania", lat: 55.89, lng: 23.39, note: "Baltic Air Policing rotation base." },
  { id: "na-am",  name: "Ämari AB",            cc: "ee", country: "Estonia",  lat: 59.26, lng: 24.21,  note: "Baltic Air Policing rotation base." },
  { id: "na-ke",  name: "Keflavik",            cc: "is", country: "Iceland",  lat: 63.98, lng: -22.60, note: "Icelandic Air Policing & maritime patrol hub." },
  { id: "na-rz",  name: "Rzeszów-Jasionka",    cc: "pl", country: "Poland",   lat: 50.11, lng: 22.02,  note: "Main logistics gateway for support to Ukraine." },
  { id: "na-de",  name: "Aegis Ashore Deveselu", cc: "ro", country: "Romania", lat: 44.08, lng: 24.42, note: "Ballistic missile defence site (SM-3)." },
  { id: "na-re",  name: "Aegis Ashore Redzikowo", cc: "pl", country: "Poland", lat: 54.48, lng: 17.11, note: "Ballistic missile defence site (SM-3)." },
  { id: "na-mk",  name: "Mihail Kogălniceanu", cc: "ro", country: "Romania",  lat: 44.36, lng: 28.49,  note: "Black Sea hub — planned to become NATO's largest European base." },
  { id: "na-so",  name: "Souda Bay",           cc: "gr", country: "Greece",   lat: 35.53, lng: 24.15,  note: "Deep-water naval & air station in the eastern Med." },
];

// ── Major US bases & commands worldwide ───────────────────────────────────────
export const US_BASES = [
  { id: "us-ra",  name: "Ramstein AB",         cc: "de", country: "Germany",  lat: 49.44, lng: 7.60,   note: "USAFE HQ and main US airlift hub in Europe." },
  { id: "us-st",  name: "Stuttgart (Patch Barracks)", cc: "de", country: "Germany", lat: 48.69, lng: 9.08, note: "EUCOM and AFRICOM headquarters." },
  { id: "us-av",  name: "Aviano AB",           cc: "it", country: "Italy",    lat: 46.03, lng: 12.60,  note: "31st Fighter Wing (F-16)." },
  { id: "us-la",  name: "RAF Lakenheath",      cc: "gb", country: "United Kingdom", lat: 52.41, lng: 0.56, note: "48th Fighter Wing (F-35A, F-15E)." },
  { id: "us-ro",  name: "NS Rota",             cc: "es", country: "Spain",    lat: 36.62, lng: -6.35,  note: "Forward-deployed Aegis destroyers (BMD)." },
  { id: "us-sg",  name: "NAS Sigonella",       cc: "it", country: "Italy",    lat: 37.40, lng: 14.92,  note: "Mediterranean ISR & maritime patrol hub." },
  { id: "us-bo",  name: "Camp Bondsteel",      cc: "xk", country: "Kosovo",   lat: 42.36, lng: 21.25,  note: "KFOR — main US base in the Balkans." },
  { id: "us-pi",  name: "Pituffik SB (Thule)", cc: "gl", country: "Greenland", lat: 76.53, lng: -68.70, note: "Missile warning & space surveillance." },
  { id: "us-ud",  name: "Al Udeid AB",         cc: "qa", country: "Qatar",    lat: 25.12, lng: 51.32,  note: "CENTCOM forward HQ & CAOC." },
  { id: "us-bh",  name: "NSA Bahrain",         cc: "bh", country: "Bahrain",  lat: 26.21, lng: 50.61,  note: "US 5th Fleet headquarters." },
  { id: "us-dh",  name: "Al Dhafra AB",        cc: "ae", country: "UAE",      lat: 24.25, lng: 54.55,  note: "ISR and fighter deployments in the Gulf." },
  { id: "us-ar",  name: "Camp Arifjan",        cc: "kw", country: "Kuwait",   lat: 28.88, lng: 48.16,  note: "US Army logistics hub for the region." },
  { id: "us-le",  name: "Camp Lemonnier",      cc: "dj", country: "Djibouti", lat: 11.54, lng: 43.15,  note: "Only permanent US base in Africa." },
  { id: "us-dg",  name: "Diego Garcia",        cc: "io", country: "BIOT",     lat: -7.31, lng: 72.41,  note: "Indian Ocean bomber & naval support hub." },
  { id: "us-yo",  name: "Yokosuka",            cc: "jp", country: "Japan",    lat: 35.29, lng: 139.67, note: "US 7th Fleet HQ — forward-deployed carrier." },
  { id: "us-ka",  name: "Kadena AB",           cc: "jp", country: "Japan",    lat: 26.35, lng: 127.77, note: "Largest US air base in the Pacific (Okinawa)." },
  { id: "us-hu",  name: "Camp Humphreys",      cc: "kr", country: "South Korea", lat: 36.96, lng: 127.03, note: "Largest US overseas base — USFK HQ." },
  { id: "us-os",  name: "Osan AB",             cc: "kr", country: "South Korea", lat: 37.09, lng: 127.03, note: "7th Air Force HQ (U-2, F-16)." },
  { id: "us-an",  name: "Andersen AFB (Guam)", cc: "gu", country: "Guam",     lat: 13.58, lng: 144.93, note: "Pacific bomber & tanker forward base." },
  { id: "us-ph",  name: "Pearl Harbor-Hickam", cc: "us", country: "United States", lat: 21.35, lng: -157.94, note: "INDOPACOM & Pacific Fleet headquarters." },
  { id: "us-gu",  name: "Guantanamo Bay",      cc: "cu", country: "Cuba",     lat: 19.90, lng: -75.15, note: "US naval station (leased)." },
];

// ── French bases (metropolitan + overseas) ────────────────────────────────────
export const FRENCH_BASES = [
  // Metropolitan
  { id: "fr-to",  name: "Toulon",              cc: "fr", country: "France",   lat: 43.11, lng: 5.93,   note: "Main naval base — carrier Charles de Gaulle." },
  { id: "fr-br",  name: "Brest",               cc: "fr", country: "France",   lat: 48.37, lng: -4.49,  note: "Atlantic naval base." },
  { id: "fr-is",  name: "Istres AB 125",       cc: "fr", country: "France",   lat: 43.52, lng: 4.92,   note: "Strategic tankers (MRTT) — deterrent support." },
  { id: "fr-av",  name: "Avord AB 702",        cc: "fr", country: "France",   lat: 47.05, lng: 2.63,   note: "E-3F AWACS fleet." },
  { id: "fr-mm",  name: "Mont-de-Marsan AB 118", cc: "fr", country: "France", lat: 43.91, lng: -0.50,  note: "Rafale experimentation & fighter wing." },
  { id: "fr-ob",  name: "Orléans-Bricy AB 123", cc: "fr", country: "France",  lat: 47.98, lng: 1.76,   note: "A400M tactical transport fleet." },
  // Overseas presence
  { id: "fr-dj",  name: "FFDj Djibouti",       cc: "dj", country: "Djibouti", lat: 11.55, lng: 43.16,  note: "Largest French base abroad — joint forces." },
  { id: "fr-ae",  name: "FFEAU Abu Dhabi",     cc: "ae", country: "UAE",      lat: 24.43, lng: 54.46,  note: "Naval & air base in the Gulf (IMFEAU)." },
  { id: "fr-gy",  name: "FAG Guyane (Kourou)", cc: "gf", country: "French Guiana", lat: 4.82, lng: -52.36, note: "Protection of the space centre — 3e REI." },
  { id: "fr-an",  name: "FAA Fort-de-France",  cc: "mq", country: "Martinique", lat: 14.60, lng: -61.07, note: "Antilles forces — Caribbean maritime ops." },
  { id: "fr-re",  name: "FAZSOI La Réunion",   cc: "re", country: "La Réunion", lat: -20.89, lng: 55.45, note: "Southern Indian Ocean forces." },
  { id: "fr-my",  name: "Mayotte detachment",  cc: "yt", country: "Mayotte",  lat: -12.78, lng: 45.25, note: "Foreign Legion detachment (DLEM)." },
  { id: "fr-nc",  name: "FANC Nouméa",         cc: "nc", country: "New Caledonia", lat: -22.27, lng: 166.44, note: "Pacific forces — New Caledonia." },
  { id: "fr-pf",  name: "FAPF Papeete",        cc: "pf", country: "French Polynesia", lat: -17.53, lng: -149.57, note: "Pacific forces — Polynesia." },
];

export const POI_LAYERS = {
  theaters: THEATERS,
  nuclear: NUCLEAR_SITES,
  nato: NATO_BASES,
  us: US_BASES,
  france: FRENCH_BASES,
};
