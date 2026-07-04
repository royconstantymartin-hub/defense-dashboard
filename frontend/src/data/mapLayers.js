// Static OSINT layers for the World Monitor map.
// Everything here is public knowledge (Wikipedia / FAS / IISS / SIPRI /
// official sites); coordinates are approximate site centroids. Bundled with
// the app so the layers work without any external data service.
//
// Layer taxonomy, kept deliberately un-mixed:
//   Conflict  → live incidents · theaters · maritime chokepoints
//   Nuclear & strategic → deterrent FORCES (bases) are separate from
//     PRODUCTION/enrichment sites, which are separate from TEST sites;
//     plus missile defense/early-warning, ballistic-missile test ranges,
//     spaceports and SIGINT stations
//   Military bases → conventional bases keyed by operating nation (flag)
//
// kind: incident | area | badge (emoji glyph) | flag (country flag)

export const LAYER_DEFS = {
  // ── Conflict ──
  incidents:   { group: "Conflict",   label: "Live incidents",        color: "#e11d48", kind: "incident" },
  theaters:    { group: "Conflict",   label: "Theaters of operation", color: "#e11d48", kind: "area" },
  chokepoints: { group: "Conflict",   label: "Strategic chokepoints", color: "#0d9488", kind: "badge", glyph: "⚓" },
  // ── Nuclear & strategic ──
  deterrent:   { group: "Strategic",  label: "Deterrent forces",      color: "#7c3aed", kind: "badge", glyph: "🚀" },
  nuclearProd: { group: "Strategic",  label: "Nuclear production",    color: "#ca8a04", kind: "badge", glyph: "☢️" },
  nuclearTest: { group: "Strategic",  label: "Nuclear test sites",    color: "#dc2626", kind: "badge", glyph: "💥" },
  missileDef:  { group: "Strategic",  label: "Missile defense / EW",  color: "#0891b2", kind: "badge", glyph: "🛡️" },
  missileTest: { group: "Strategic",  label: "Missile test ranges",   color: "#db2777", kind: "badge", glyph: "🎯" },
  spaceports:  { group: "Strategic",  label: "Spaceports",            color: "#4f46e5", kind: "badge", glyph: "🛰️" },
  sigint:      { group: "Strategic",  label: "SIGINT stations",       color: "#16a34a", kind: "badge", glyph: "📡" },
  // ── Military bases (conventional, by operator) ──
  us:          { group: "Bases",      label: "US bases",              color: "#2563eb", kind: "flag" },
  nato:        { group: "Bases",      label: "NATO installations",    color: "#1e3a8a", kind: "flag" },
  france:      { group: "Bases",      label: "French bases",          color: "#0ea5e9", kind: "flag" },
  uk:          { group: "Bases",      label: "UK bases",              color: "#9333ea", kind: "flag" },
  russia:      { group: "Bases",      label: "Russian bases",         color: "#dc2626", kind: "flag" },
  china:       { group: "Bases",      label: "Chinese bases",         color: "#ea580c", kind: "flag" },
};

export const LAYER_GROUPS = ["Conflict", "Strategic", "Bases"];

// ── Theaters of operation (translucent area circles; r ≈ radius in km) ────────
export const THEATERS = [
  { id: "th-ua",  name: "Ukraine front",           cc: "ua", country: "Ukraine",              lat: 48.3, lng: 37.5,  r: 550, note: "Full-scale war since Feb 2022 — main line of contact in the east and south." },
  { id: "th-il",  name: "Gaza & Levant",           cc: "ps", country: "Gaza / Israel / Lebanon", lat: 32.2, lng: 35.2, r: 220, note: "Israel–Hamas war and cross-border exchanges with Hezbollah." },
  { id: "th-rs",  name: "Red Sea / Bab el-Mandeb", cc: "ye", country: "Yemen / Red Sea",       lat: 14.5, lng: 43.0,  r: 400, note: "Houthi attacks on shipping; coalition naval patrols." },
  { id: "th-sd",  name: "Sudan civil war",         cc: "sd", country: "Sudan",                 lat: 15.0, lng: 30.0,  r: 600, note: "SAF vs RSF since April 2023 — world's largest displacement crisis." },
  { id: "th-sah", name: "Sahel insurgency",        cc: "ml", country: "Mali / Burkina / Niger", lat: 15.0, lng: 0.0,  r: 900, note: "Jihadist insurgencies (JNIM, ISSP) across the central Sahel." },
  { id: "th-cd",  name: "Eastern DRC",             cc: "cd", country: "DR Congo",              lat: -1.5, lng: 28.8,  r: 350, note: "M23 offensive and multiple armed groups around the Kivus." },
  { id: "th-mm",  name: "Myanmar civil war",       cc: "mm", country: "Myanmar",              lat: 21.0, lng: 96.0,  r: 500, note: "Junta vs resistance forces and ethnic armed organisations." },
  { id: "th-so",  name: "Somalia",                 cc: "so", country: "Somalia",              lat: 3.5,  lng: 45.0,  r: 450, note: "Al-Shabaab insurgency; AU and US counter-terrorism operations." },
  { id: "th-ht",  name: "Haiti",                   cc: "ht", country: "Haiti",               lat: 18.9, lng: -72.4, r: 120, note: "Gang control of Port-au-Prince; multinational security support mission." },
  { id: "th-scs", name: "South China Sea",         cc: "cn", country: "SCS claimants",        lat: 13.0, lng: 115.0, r: 800, note: "Maritime stand-offs over disputed reefs and shoals." },
  { id: "th-tw",  name: "Taiwan Strait",           cc: "tw", country: "Taiwan",              lat: 24.5, lng: 119.5, r: 250, note: "PLA air/naval pressure across the median line." },
  { id: "th-sy",  name: "Syria",                   cc: "sy", country: "Syria",               lat: 35.0, lng: 38.5,  r: 350, note: "Post-Assad transition, jihadist remnants and foreign military presence." },
  { id: "th-lc",  name: "Lake Chad Basin",         cc: "ng", country: "Nigeria / Chad / Niger", lat: 12.5, lng: 13.5, r: 350, note: "Boko Haram / ISWAP insurgency around Lake Chad." },
];

// ── Strategic maritime chokepoints ────────────────────────────────────────────
export const CHOKEPOINTS = [
  { id: "cp-ho", name: "Strait of Hormuz",    cc: "ir", country: "Iran / Oman",       lat: 26.57, lng: 56.25,  note: "~20% of world oil passes here; recurring Iran–West tension." },
  { id: "cp-bm", name: "Bab-el-Mandeb",       cc: "ye", country: "Yemen / Djibouti",  lat: 12.58, lng: 43.33,  note: "Gate to the Red Sea & Suez; targeted by Houthi attacks." },
  { id: "cp-su", name: "Suez Canal",          cc: "eg", country: "Egypt",             lat: 30.50, lng: 32.35,  note: "~12% of global trade; Europe–Asia shortcut." },
  { id: "cp-ma", name: "Strait of Malacca",   cc: "sg", country: "MY / ID / SG",      lat: 2.5,   lng: 101.3,  note: "Busiest strait — most of East Asia's energy imports." },
  { id: "cp-bo", name: "Turkish Straits",     cc: "tr", country: "Türkiye",           lat: 41.12, lng: 29.07,  note: "Bosphorus & Dardanelles — Black Sea access (Montreux)." },
  { id: "cp-pa", name: "Panama Canal",        cc: "pa", country: "Panama",            lat: 9.08,  lng: -79.68, note: "Atlantic–Pacific shortcut; affected by drought." },
  { id: "cp-gi", name: "Strait of Gibraltar", cc: "es", country: "Spain / Morocco",   lat: 35.95, lng: -5.60,  note: "Mediterranean–Atlantic gate." },
  { id: "cp-dk", name: "Danish Straits",      cc: "dk", country: "Denmark",           lat: 55.70, lng: 12.70,  note: "Baltic exit — key for Russian oil exports." },
  { id: "cp-do", name: "Strait of Dover",     cc: "fr", country: "France / UK",       lat: 51.00, lng: 1.50,   note: "Busiest shipping lane; English Channel." },
  { id: "cp-lo", name: "Lombok Strait",       cc: "id", country: "Indonesia",         lat: -8.70, lng: 115.80, note: "Deep-water alternative to Malacca for large vessels." },
  { id: "cp-tw", name: "Taiwan Strait",       cc: "tw", country: "Taiwan",            lat: 24.50, lng: 119.5,  note: "Critical for East Asian trade & chip supply chains." },
  { id: "cp-ho2",name: "Cape of Good Hope",   cc: "za", country: "South Africa",      lat: -34.35, lng: 18.47, note: "Main detour when the Suez / Red Sea route is disrupted." },
];

// ── Deterrent FORCES: SSBN bases, ICBM silo fields, strategic bombers ─────────
export const DETERRENT = [
  { id: "de-il", name: "Île Longue",         cc: "fr", country: "France",        lat: 48.30, lng: -4.50,  note: "SSBN base — Force océanique stratégique (FOST)." },
  { id: "de-sd", name: "Saint-Dizier AB 113",cc: "fr", country: "France",        lat: 48.63, lng: 4.90,   note: "Rafale ASMP-A airborne deterrent." },
  { id: "de-fa", name: "HMNB Clyde (Faslane)",cc: "gb", country: "United Kingdom",lat: 56.07, lng: -4.82,  note: "Vanguard-class SSBNs — UK Trident." },
  { id: "de-ba", name: "NB Kitsap-Bangor",   cc: "us", country: "United States",  lat: 47.72, lng: -122.71,note: "Pacific SSBN fleet (Ohio, Trident II)." },
  { id: "de-kb", name: "Kings Bay",          cc: "us", country: "United States",  lat: 30.80, lng: -81.52, note: "Atlantic SSBN fleet (Ohio, Trident II)." },
  { id: "de-mi", name: "Minot AFB",          cc: "us", country: "United States",  lat: 48.42, lng: -101.34,note: "Minuteman III ICBMs and B-52H bombers." },
  { id: "de-mm", name: "Malmstrom AFB",      cc: "us", country: "United States",  lat: 47.50, lng: -111.18,note: "Minuteman III ICBM wing." },
  { id: "de-fw", name: "F.E. Warren AFB",    cc: "us", country: "United States",  lat: 41.13, lng: -104.87,note: "Minuteman III ICBM wing." },
  { id: "de-wh", name: "Whiteman AFB",       cc: "us", country: "United States",  lat: 38.73, lng: -93.55, note: "B-2 Spirit stealth bomber wing." },
  { id: "de-bk", name: "Barksdale AFB",      cc: "us", country: "United States",  lat: 32.50, lng: -93.66, note: "B-52H wing — Global Strike Command HQ." },
  { id: "de-ga", name: "Gadzhiyevo (Kola)",  cc: "ru", country: "Russia",         lat: 69.25, lng: 33.33,  note: "Northern Fleet SSBN base." },
  { id: "de-vi", name: "Vilyuchinsk",        cc: "ru", country: "Russia",         lat: 52.93, lng: 158.40, note: "Pacific Fleet SSBN base (Kamchatka)." },
  { id: "de-en", name: "Engels-2 AB",        cc: "ru", country: "Russia",         lat: 51.48, lng: 46.21,  note: "Strategic bombers (Tu-95MS, Tu-160)." },
  { id: "de-uk", name: "Ukrainka AB",        cc: "ru", country: "Russia",         lat: 51.17, lng: 128.45, note: "Far East strategic bomber base (Tu-95)." },
  { id: "de-yu", name: "Yulin (Longpo)",     cc: "cn", country: "China",          lat: 18.20, lng: 109.68, note: "PLAN SSBN base on Hainan." },
  { id: "de-ji", name: "Jilantai / Ordos",   cc: "cn", country: "China",          lat: 39.78, lng: 105.75, note: "New ICBM silo fields (DF-41)." },
  { id: "de-va", name: "INS Varsha",         cc: "in", country: "India",          lat: 17.45, lng: 82.98,  note: "Under-construction SSBN base." },
];

// ── Nuclear PRODUCTION & enrichment (fuel cycle) ─────────────────────────────
export const NUCLEAR_PROD = [
  { id: "np-na", name: "Natanz",             cc: "ir", country: "Iran",           lat: 33.72, lng: 51.73,  note: "Main uranium enrichment complex." },
  { id: "np-fo", name: "Fordow",             cc: "ir", country: "Iran",           lat: 34.88, lng: 50.99,  note: "Deeply buried enrichment site." },
  { id: "np-is", name: "Isfahan UCF",        cc: "ir", country: "Iran",           lat: 32.57, lng: 51.80,  note: "Uranium conversion facility." },
  { id: "np-yb", name: "Yongbyon",           cc: "kp", country: "North Korea",    lat: 39.80, lng: 125.75, note: "Plutonium & enrichment complex." },
  { id: "np-ka", name: "Kahuta (KRL)",       cc: "pk", country: "Pakistan",       lat: 33.62, lng: 73.38,  note: "Uranium enrichment — A.Q. Khan Research Labs." },
  { id: "np-kh", name: "Khushab",            cc: "pk", country: "Pakistan",       lat: 32.03, lng: 72.20,  note: "Plutonium production reactors." },
  { id: "np-lh", name: "La Hague",           cc: "fr", country: "France",         lat: 49.68, lng: -1.88,  note: "Spent-fuel reprocessing plant." },
  { id: "np-tr", name: "Tricastin",          cc: "fr", country: "France",         lat: 44.33, lng: 4.73,   note: "Uranium enrichment (Georges Besse II)." },
  { id: "np-se", name: "Sellafield",         cc: "gb", country: "United Kingdom", lat: 54.42, lng: -3.50,  note: "Reprocessing & nuclear legacy site." },
  { id: "np-y12",name: "Oak Ridge (Y-12)",   cc: "us", country: "United States",  lat: 35.99, lng: -84.26, note: "Uranium processing — weapons complex." },
  { id: "np-sr", name: "Savannah River",     cc: "us", country: "United States",  lat: 33.28, lng: -81.65, note: "Tritium & weapons materials site." },
  { id: "np-ma", name: "Mayak",              cc: "ru", country: "Russia",         lat: 55.70, lng: 60.85,  note: "Plutonium & reprocessing complex." },
  { id: "np-la", name: "Lanzhou enrichment", cc: "cn", country: "China",          lat: 36.06, lng: 103.83, note: "Uranium enrichment plant." },
  { id: "np-tr2",name: "Trombay (BARC)",     cc: "in", country: "India",          lat: 19.02, lng: 72.92,  note: "Plutonium reprocessing & research." },
  { id: "np-di", name: "Dimona (Negev NRC)", cc: "il", country: "Israel",         lat: 31.00, lng: 35.15,  note: "Plutonium production (undeclared)." },
];

// ── Nuclear TEST sites (current & historical) ────────────────────────────────
export const NUCLEAR_TEST = [
  { id: "nt-pu", name: "Punggye-ri",         cc: "kp", country: "North Korea",    lat: 41.28, lng: 129.09, note: "Active nuclear test site." },
  { id: "nt-lo", name: "Lop Nur",            cc: "cn", country: "China",          lat: 41.55, lng: 88.30,  note: "China's nuclear test site." },
  { id: "nt-nz", name: "Novaya Zemlya",      cc: "ru", country: "Russia",         lat: 73.40, lng: 54.90,  note: "Russian Arctic test range." },
  { id: "nt-se", name: "Semipalatinsk",      cc: "kz", country: "Kazakhstan",     lat: 50.12, lng: 78.43,  note: "Former Soviet test site (closed)." },
  { id: "nt-nv", name: "Nevada (NNSS)",      cc: "us", country: "United States",  lat: 37.12, lng: -116.05,note: "US nuclear test site (moratorium)." },
  { id: "nt-mu", name: "Mururoa & Fangataufa",cc: "pf", country: "French Polynesia", lat: -21.83, lng: -138.90, note: "Former French Pacific test site." },
  { id: "nt-po", name: "Pokhran",            cc: "in", country: "India",          lat: 27.08, lng: 71.75,  note: "Indian nuclear test site." },
  { id: "nt-rk", name: "Ras Koh (Chagai)",   cc: "pk", country: "Pakistan",       lat: 28.83, lng: 64.90,  note: "Pakistani nuclear test site." },
  { id: "nt-bi", name: "Bikini Atoll",       cc: "mh", country: "Marshall Is.",   lat: 11.60, lng: 165.38, note: "Former US Pacific test site." },
  { id: "nt-ma", name: "Maralinga",          cc: "au", country: "Australia",      lat: -30.17, lng: 131.62,note: "Former UK test site." },
  { id: "nt-re", name: "Reggane",            cc: "dz", country: "Algeria",        lat: 26.72, lng: 0.05,   note: "First French nuclear tests (1960)." },
];

// ── Missile DEFENSE & early-warning radars ───────────────────────────────────
export const MISSILE_DEF = [
  { id: "md-fy", name: "RAF Fylingdales",    cc: "gb", country: "United Kingdom", lat: 54.36, lng: -0.67,  note: "BMEWS early-warning radar." },
  { id: "md-pi", name: "Pituffik SB (Thule)",cc: "gl", country: "Greenland",     lat: 76.53, lng: -68.70, note: "Missile warning & space surveillance." },
  { id: "md-cl", name: "Clear SFS",          cc: "us", country: "United States",  lat: 64.29, lng: -149.19,note: "Early-warning radar (Alaska)." },
  { id: "md-be", name: "Beale AFB (PAVE PAWS)",cc: "us", country: "United States",lat: 39.14, lng: -121.44,note: "Phased-array early-warning radar." },
  { id: "md-fg", name: "Fort Greely (GMD)",  cc: "us", country: "United States",  lat: 63.97, lng: -145.73,note: "Ground-based midcourse interceptors." },
  { id: "md-de", name: "Aegis Ashore Deveselu",cc: "ro", country: "Romania",     lat: 44.08, lng: 24.42,  note: "NATO BMD site (SM-3)." },
  { id: "md-re", name: "Aegis Ashore Redzikowo",cc: "pl", country: "Poland",     lat: 54.48, lng: 17.11,  note: "NATO BMD site (SM-3)." },
  { id: "md-ar", name: "Voronezh-DM Armavir",cc: "ru", country: "Russia",        lat: 44.93, lng: 41.10,  note: "Russian early-warning radar." },
  { id: "md-le", name: "Voronezh Lekhtusi",  cc: "ru", country: "Russia",        lat: 60.28, lng: 30.62,  note: "Russian early-warning radar (NW)." },
  { id: "md-ss", name: "Sary Shagan",        cc: "kz", country: "Kazakhstan",    lat: 46.00, lng: 73.65,  note: "Russian ABM & radar test range." },
  { id: "md-gp", name: "Green Pine (Arrow)", cc: "il", country: "Israel",        lat: 31.90, lng: 34.70,  note: "Arrow BMD radar & interceptors." },
];

// ── Ballistic-missile TEST ranges / launch sites ─────────────────────────────
export const MISSILE_TEST = [
  { id: "mt-so", name: "Sohae (Tongchang-ri)",cc: "kp", country: "North Korea",  lat: 39.66, lng: 124.71, note: "Satellite & long-range missile launch site." },
  { id: "mt-to", name: "Tonghae (Musudan-ri)",cc: "kp", country: "North Korea",  lat: 40.86, lng: 129.67, note: "Ballistic missile test site." },
  { id: "mt-se", name: "Semnan / Shahroud",  cc: "ir", country: "Iran",          lat: 35.23, lng: 53.95,  note: "Space & ballistic missile launches." },
  { id: "mt-ka", name: "Kapustin Yar",       cc: "ru", country: "Russia",        lat: 48.57, lng: 45.80,  note: "Historic missile test range." },
  { id: "mt-pl", name: "Plesetsk",           cc: "ru", country: "Russia",        lat: 62.93, lng: 40.57,  note: "ICBM tests & military launches." },
  { id: "mt-va", name: "Vandenberg SFB",     cc: "us", country: "United States", lat: 34.74, lng: -120.57,note: "ICBM test launches & polar orbits." },
  { id: "mt-kw", name: "Reagan Test Site",   cc: "mh", country: "Kwajalein",     lat: 8.72,  lng: 167.73, note: "US ICBM impact & missile-defense tests." },
  { id: "mt-wi", name: "APJ Abdul Kalam Is.",cc: "in", country: "India",         lat: 20.76, lng: 87.09,  note: "India's main missile test range." },
  { id: "mt-so2",name: "Sonmiani (SUPARCO)", cc: "pk", country: "Pakistan",      lat: 25.20, lng: 66.73,  note: "Pakistani missile & rocket range." },
  { id: "mt-jq", name: "Jiuquan",            cc: "cn", country: "China",         lat: 40.96, lng: 100.29, note: "Missile & crewed space launches." },
];

// ── Spaceports / satellite launch sites ──────────────────────────────────────
export const SPACEPORTS = [
  { id: "sp-cc", name: "Cape Canaveral / KSC",cc: "us", country: "United States", lat: 28.49, lng: -80.58, note: "Main US launch complex (NASA, SpaceX, ULA)." },
  { id: "sp-va", name: "Vandenberg SFB",     cc: "us", country: "United States",  lat: 34.74, lng: -120.57,note: "Polar & sun-synchronous orbit launches." },
  { id: "sp-wa", name: "Wallops",            cc: "us", country: "United States",  lat: 37.94, lng: -75.47, note: "NASA / Rocket Lab launch site." },
  { id: "sp-ba", name: "Baikonur",           cc: "kz", country: "Kazakhstan",     lat: 45.96, lng: 63.31,  note: "Historic Soviet/Russian cosmodrome (Soyuz)." },
  { id: "sp-pl", name: "Plesetsk",           cc: "ru", country: "Russia",         lat: 62.93, lng: 40.57,  note: "Russia's northern military cosmodrome." },
  { id: "sp-vo", name: "Vostochny",          cc: "ru", country: "Russia",         lat: 51.88, lng: 128.33, note: "Russia's newest civilian cosmodrome." },
  { id: "sp-ko", name: "Kourou (CSG)",       cc: "gf", country: "French Guiana",  lat: 5.24,  lng: -52.77, note: "Europe's spaceport (Ariane, Vega)." },
  { id: "sp-jq", name: "Jiuquan",            cc: "cn", country: "China",          lat: 40.96, lng: 100.29, note: "Crewed spaceflight & satellite launches." },
  { id: "sp-xc", name: "Xichang",            cc: "cn", country: "China",          lat: 28.25, lng: 102.03, note: "GEO & lunar mission launches." },
  { id: "sp-we", name: "Wenchang",           cc: "cn", country: "China",          lat: 19.61, lng: 110.95, note: "Heavy-lift & deep-space launches (Hainan)." },
  { id: "sp-ta", name: "Taiyuan",            cc: "cn", country: "China",          lat: 38.85, lng: 111.61, note: "Polar-orbit satellite launches." },
  { id: "sp-sr", name: "Satish Dhawan",      cc: "in", country: "India",          lat: 13.73, lng: 80.23,  note: "ISRO spaceport (Sriharikota)." },
  { id: "sp-tn", name: "Tanegashima",        cc: "jp", country: "Japan",          lat: 30.40, lng: 130.97, note: "Japan's main launch centre (JAXA)." },
  { id: "sp-na", name: "Naro",               cc: "kr", country: "South Korea",    lat: 34.43, lng: 127.53, note: "South Korean spaceport (KSLV)." },
  { id: "sp-ma", name: "Mahia (Rocket Lab)", cc: "nz", country: "New Zealand",    lat: -39.26, lng: 177.86,note: "Commercial small-launch site." },
  { id: "sp-al", name: "Alcântara",          cc: "br", country: "Brazil",         lat: -2.37, lng: -44.40, note: "Equatorial launch centre." },
  { id: "sp-pa", name: "Palmachim",          cc: "il", country: "Israel",         lat: 31.90, lng: 34.69,  note: "Israeli launch site (Shavit)." },
];

// ── SIGINT / intelligence stations ───────────────────────────────────────────
export const SIGINT = [
  { id: "si-pg", name: "Pine Gap",           cc: "au", country: "Australia",      lat: -23.80, lng: 133.74,note: "Joint US-Australia satellite intelligence station." },
  { id: "si-mh", name: "RAF Menwith Hill",   cc: "gb", country: "United Kingdom", lat: 54.01, lng: -1.68,  note: "Major NSA/GCHQ SIGINT ground station." },
  { id: "si-gc", name: "GCHQ Cheltenham",    cc: "gb", country: "United Kingdom", lat: 51.90, lng: -2.12,  note: "UK signals intelligence headquarters." },
  { id: "si-nsa",name: "NSA Fort Meade",     cc: "us", country: "United States",  lat: 39.11, lng: -76.77, note: "US National Security Agency HQ." },
  { id: "si-ba", name: "Bad Aibling",        cc: "de", country: "Germany",        lat: 47.88, lng: 11.98,  note: "SIGINT station (BND / former NSA)." },
  { id: "si-va", name: "Vardø (GLOBUS)",     cc: "no", country: "Norway",         lat: 70.37, lng: 31.13,  note: "Radar intelligence facing the Arctic." },
  { id: "si-mi", name: "Misawa",             cc: "jp", country: "Japan",          lat: 40.70, lng: 141.37, note: "'Security Hill' SIGINT & ECHELON site." },
  { id: "si-wa", name: "Waihopai",           cc: "nz", country: "New Zealand",    lat: -41.58, lng: 173.74,note: "GCSB satellite interception station." },
  { id: "si-an", name: "Ayios Nikolaos",     cc: "cy", country: "Cyprus (SBA)",   lat: 35.03, lng: 33.98,  note: "UK SIGINT station covering the Middle East." },
  { id: "si-bu", name: "Buckley SFB",        cc: "us", country: "United States",  lat: 39.70, lng: -104.75,note: "Space-based missile warning downlink (Aerospace Data Facility)." },
];

// ── NATO commands & multinational installations ──────────────────────────────
export const NATO_BASES = [
  { id: "na-hq", name: "NATO HQ",            cc: "be", country: "Belgium",        lat: 50.88, lng: 4.42,   note: "Political HQ of the Alliance (Brussels)." },
  { id: "na-sh", name: "SHAPE (Mons)",       cc: "be", country: "Belgium",        lat: 50.45, lng: 3.99,   note: "Supreme HQ Allied Powers Europe — SACEUR." },
  { id: "na-br", name: "JFC Brunssum",       cc: "nl", country: "Netherlands",    lat: 50.95, lng: 5.97,   note: "Joint Force Command, northern flank." },
  { id: "na-np", name: "JFC Naples",         cc: "it", country: "Italy",          lat: 40.88, lng: 14.19,  note: "Joint Force Command, southern flank." },
  { id: "na-nf", name: "JFC Norfolk",        cc: "us", country: "United States",  lat: 36.95, lng: -76.33, note: "Atlantic-focused Joint Force Command." },
  { id: "na-ac", name: "AIRCOM Ramstein",    cc: "de", country: "Germany",        lat: 49.40, lng: 7.55,   note: "Allied Air Command — air & missile defence." },
  { id: "na-ge", name: "Geilenkirchen AB",   cc: "de", country: "Germany",        lat: 50.96, lng: 6.04,   note: "NATO E-3A AWACS home base." },
  { id: "na-si", name: "Šiauliai AB",        cc: "lt", country: "Lithuania",      lat: 55.89, lng: 23.39,  note: "Baltic Air Policing base." },
  { id: "na-am", name: "Ämari AB",           cc: "ee", country: "Estonia",        lat: 59.26, lng: 24.21,  note: "Baltic Air Policing base." },
  { id: "na-mk", name: "Mihail Kogălniceanu",cc: "ro", country: "Romania",        lat: 44.36, lng: 28.49,  note: "Black Sea hub — future largest EU base." },
  { id: "na-rz", name: "Rzeszów-Jasionka",   cc: "pl", country: "Poland",         lat: 50.11, lng: 22.02,  note: "Logistics gateway for support to Ukraine." },
  { id: "na-so", name: "Souda Bay",          cc: "gr", country: "Greece",         lat: 35.53, lng: 24.15,  note: "Deep-water naval & air station (E-Med)." },
];

// ── Major US bases & commands (conventional) ─────────────────────────────────
export const US_BASES = [
  { id: "us-no", name: "NS Norfolk",         cc: "us", country: "United States",  lat: 36.95, lng: -76.33, note: "World's largest naval base." },
  { id: "us-sd", name: "NB San Diego",       cc: "us", country: "United States",  lat: 32.68, lng: -117.13,note: "Major Pacific Fleet homeport." },
  { id: "us-md", name: "MacDill AFB",        cc: "us", country: "United States",  lat: 27.85, lng: -82.52, note: "CENTCOM & SOCOM headquarters." },
  { id: "us-ph", name: "Pearl Harbor-Hickam",cc: "us", country: "United States",  lat: 21.35, lng: -157.94,note: "INDOPACOM & Pacific Fleet HQ." },
  { id: "us-ra", name: "Ramstein AB",        cc: "de", country: "Germany",        lat: 49.44, lng: 7.60,   note: "USAFE HQ & main European airlift hub." },
  { id: "us-st", name: "Stuttgart (Patch)",  cc: "de", country: "Germany",        lat: 48.69, lng: 9.08,   note: "EUCOM & AFRICOM headquarters." },
  { id: "us-av", name: "Aviano AB",          cc: "it", country: "Italy",          lat: 46.03, lng: 12.60,  note: "31st Fighter Wing (F-16)." },
  { id: "us-la", name: "RAF Lakenheath",     cc: "gb", country: "United Kingdom", lat: 52.41, lng: 0.56,   note: "48th Fighter Wing (F-35A, F-15E)." },
  { id: "us-ro", name: "NS Rota",            cc: "es", country: "Spain",          lat: 36.62, lng: -6.35,  note: "Forward-deployed Aegis destroyers." },
  { id: "us-ud", name: "Al Udeid AB",        cc: "qa", country: "Qatar",          lat: 25.12, lng: 51.32,  note: "CENTCOM forward HQ & CAOC." },
  { id: "us-bh", name: "NSA Bahrain",        cc: "bh", country: "Bahrain",        lat: 26.21, lng: 50.61,  note: "US 5th Fleet headquarters." },
  { id: "us-le", name: "Camp Lemonnier",     cc: "dj", country: "Djibouti",       lat: 11.54, lng: 43.15,  note: "Only permanent US base in Africa." },
  { id: "us-dg", name: "Diego Garcia",       cc: "io", country: "BIOT",           lat: -7.31, lng: 72.41,  note: "Indian Ocean bomber & naval hub." },
  { id: "us-yo", name: "Yokosuka",           cc: "jp", country: "Japan",          lat: 35.29, lng: 139.67, note: "US 7th Fleet HQ — forward carrier." },
  { id: "us-ka", name: "Kadena AB",          cc: "jp", country: "Japan",          lat: 26.35, lng: 127.77, note: "Largest US air base in the Pacific." },
  { id: "us-hu", name: "Camp Humphreys",     cc: "kr", country: "South Korea",    lat: 36.96, lng: 127.03, note: "Largest US overseas base — USFK HQ." },
  { id: "us-an", name: "Andersen AFB (Guam)",cc: "gu", country: "Guam",           lat: 13.58, lng: 144.93, note: "Pacific bomber & tanker forward base." },
];

// ── French bases (metropolitan + overseas) ───────────────────────────────────
export const FRENCH_BASES = [
  { id: "fr-to", name: "Toulon",             cc: "fr", country: "France",         lat: 43.11, lng: 5.93,   note: "Main naval base — carrier Charles de Gaulle." },
  { id: "fr-br", name: "Brest",              cc: "fr", country: "France",         lat: 48.37, lng: -4.49,  note: "Atlantic naval base." },
  { id: "fr-is", name: "Istres AB 125",      cc: "fr", country: "France",         lat: 43.52, lng: 4.92,   note: "Strategic tankers (MRTT)." },
  { id: "fr-av", name: "Avord AB 702",       cc: "fr", country: "France",         lat: 47.05, lng: 2.63,   note: "E-3F AWACS fleet." },
  { id: "fr-mm", name: "Mont-de-Marsan AB 118",cc: "fr", country: "France",       lat: 43.91, lng: -0.50,  note: "Rafale fighter & test wing." },
  { id: "fr-dj", name: "FFDj Djibouti",      cc: "dj", country: "Djibouti",       lat: 11.55, lng: 43.16,  note: "Largest French base abroad." },
  { id: "fr-ae", name: "FFEAU Abu Dhabi",    cc: "ae", country: "UAE",            lat: 24.43, lng: 54.46,  note: "Naval & air base in the Gulf." },
  { id: "fr-gy", name: "FAG Guyane",         cc: "gf", country: "French Guiana",  lat: 4.82,  lng: -52.36, note: "Protects the Kourou space centre." },
  { id: "fr-an", name: "FAA Fort-de-France", cc: "mq", country: "Martinique",     lat: 14.60, lng: -61.07, note: "Antilles forces — Caribbean." },
  { id: "fr-re", name: "FAZSOI La Réunion",  cc: "re", country: "La Réunion",     lat: -20.89, lng: 55.45, note: "Southern Indian Ocean forces." },
  { id: "fr-nc", name: "FANC Nouméa",        cc: "nc", country: "New Caledonia",  lat: -22.27, lng: 166.44,note: "Pacific forces — New Caledonia." },
  { id: "fr-pf", name: "FAPF Papeete",       cc: "pf", country: "French Polynesia",lat: -17.53, lng: -149.57, note: "Pacific forces — Polynesia." },
];

// ── UK bases & overseas presence ─────────────────────────────────────────────
export const UK_BASES = [
  { id: "uk-ak", name: "RAF Akrotiri",       cc: "cy", country: "Cyprus (SBA)",   lat: 34.59, lng: 32.99,  note: "Sovereign Base Area — Middle East hub." },
  { id: "uk-gi", name: "Gibraltar",          cc: "gi", country: "Gibraltar",      lat: 36.14, lng: -5.35,  note: "Naval base guarding the strait." },
  { id: "uk-mp", name: "Mount Pleasant",     cc: "fk", country: "Falklands",      lat: -51.82, lng: -58.45,note: "South Atlantic garrison & air bridge." },
  { id: "uk-ba", name: "HMS Jufair (Bahrain)",cc: "bh", country: "Bahrain",       lat: 26.21, lng: 50.61,  note: "UK Naval Support Facility, Gulf." },
  { id: "uk-du", name: "UK Duqm (Oman)",     cc: "om", country: "Oman",           lat: 19.67, lng: 57.70,  note: "Port & logistics support facility." },
  { id: "uk-ke", name: "BATUK Nanyuki",      cc: "ke", country: "Kenya",          lat: 0.02,  lng: 37.07,  note: "British Army Training Unit Kenya." },
  { id: "uk-br", name: "Brunei garrison",    cc: "bn", country: "Brunei",         lat: 4.80,  lng: 114.90, note: "Gurkha battalion & jungle school." },
  { id: "uk-po", name: "HMNB Portsmouth",    cc: "gb", country: "United Kingdom", lat: 50.80, lng: -1.11,  note: "Home port of the carrier strike group." },
];

// ── Russian bases & overseas presence ────────────────────────────────────────
export const RUSSIA_BASES = [
  { id: "ru-se", name: "Severomorsk",        cc: "ru", country: "Russia",         lat: 69.07, lng: 33.42,  note: "Northern Fleet headquarters." },
  { id: "ru-ka", name: "Kaliningrad",        cc: "ru", country: "Russia",         lat: 54.71, lng: 20.50,  note: "Baltic Fleet HQ & militarised exclave." },
  { id: "ru-vl", name: "Vladivostok",        cc: "ru", country: "Russia",         lat: 43.12, lng: 131.89, note: "Pacific Fleet headquarters." },
  { id: "ru-sv", name: "Sevastopol",         cc: "ru", country: "Crimea",         lat: 44.62, lng: 33.53,  note: "Black Sea Fleet main base (contested)." },
  { id: "ru-kh", name: "Khmeimim AB",        cc: "sy", country: "Syria",          lat: 35.40, lng: 35.95,  note: "Main Russian air base in the Mid-East." },
  { id: "ru-ta", name: "Tartus",             cc: "sy", country: "Syria",          lat: 34.90, lng: 35.87,  note: "Russian Mediterranean naval facility." },
  { id: "ru-gy", name: "102nd Base Gyumri",  cc: "am", country: "Armenia",        lat: 40.79, lng: 43.85,  note: "Russian base in the Caucasus." },
  { id: "ru-kt", name: "Kant AB",            cc: "kg", country: "Kyrgyzstan",     lat: 42.85, lng: 74.85,  note: "Russian air base (CSTO)." },
  { id: "ru-ps", name: "Port Sudan (planned)",cc: "sd", country: "Sudan",         lat: 19.62, lng: 37.22,  note: "Planned Red Sea naval base." },
];

// ── Chinese bases & key overseas footholds ───────────────────────────────────
export const CHINA_BASES = [
  { id: "cn-dj", name: "PLA Support Base",   cc: "dj", country: "Djibouti",       lat: 11.59, lng: 43.06,  note: "China's first overseas military base." },
  { id: "cn-qi", name: "Qingdao (North Sea)",cc: "cn", country: "China",          lat: 36.07, lng: 120.33, note: "Northern theatre naval HQ." },
  { id: "cn-fc", name: "Fiery Cross Reef",   cc: "cn", country: "Spratly Is.",    lat: 9.55,  lng: 112.89, note: "Militarised island (airstrip, radar)." },
  { id: "cn-su", name: "Subi Reef",          cc: "cn", country: "Spratly Is.",    lat: 10.92, lng: 114.08, note: "Militarised artificial island." },
  { id: "cn-mi", name: "Mischief Reef",      cc: "cn", country: "Spratly Is.",    lat: 9.90,  lng: 115.53, note: "Militarised artificial island." },
  { id: "cn-wo", name: "Woody Island",       cc: "cn", country: "Paracel Is.",    lat: 16.83, lng: 112.34, note: "Fighters & missiles in the Paracels." },
  { id: "cn-re", name: "Ream (developing)",  cc: "kh", country: "Cambodia",       lat: 10.51, lng: 103.61, note: "Naval base expansion with Chinese backing." },
  { id: "cn-gw", name: "Gwadar (dual-use)",  cc: "pk", country: "Pakistan",       lat: 25.13, lng: 62.33,  note: "Strategic Arabian Sea port (BRI)." },
];

export const POI_LAYERS = {
  theaters: THEATERS,
  chokepoints: CHOKEPOINTS,
  deterrent: DETERRENT,
  nuclearProd: NUCLEAR_PROD,
  nuclearTest: NUCLEAR_TEST,
  missileDef: MISSILE_DEF,
  missileTest: MISSILE_TEST,
  spaceports: SPACEPORTS,
  sigint: SIGINT,
  us: US_BASES,
  nato: NATO_BASES,
  france: FRENCH_BASES,
  uk: UK_BASES,
  russia: RUSSIA_BASES,
  china: CHINA_BASES,
};
