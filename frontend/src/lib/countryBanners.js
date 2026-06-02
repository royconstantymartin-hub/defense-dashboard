// Maps each country to the Wikipedia article whose main image best represents
// its military capability. CountryProfileSection fetches the actual image URL
// at runtime via the Wikipedia pageimages API (CORS-friendly, no auth needed).
// Rule: prefer articles with visually striking hero images (aircraft in flight,
// ships at sea, vehicles in exercise). Avoid stub articles or text-heavy pages.
const COUNTRY_WIKI_ARTICLE = {
  // ── Tier 1 — major powers ──────────────────────────────────────────────────
  "United States":        "Lockheed_Martin_F-22_Raptor",
  "China":                "Chengdu_J-20",
  "Russia":               "Sukhoi_Su-57",
  "France":               "Dassault_Rafale",
  "United Kingdom":       "Eurofighter_Typhoon",
  "Germany":              "Leopard_2",
  "India":                "Sukhoi_Su-30MKI",
  "Japan":                "Kawasaki_C-2",
  "South Korea":          "KAI_KF-21_Boramae",
  "Australia":            "F/A-18F_Super_Hornet",
  "Italy":                "Leonardo_M-346_Master",
  "Israel":               "Lockheed_Martin_F-35_Lightning_II",
  "Turkey":               "Baykar_Bayraktar_TB2",
  "Poland":               "Leopard_2A5",
  "Ukraine":              "Baykar_Bayraktar_TB2",
  "Canada":               "CF-18_Hornet",

  // ── Europe — NATO Western ──────────────────────────────────────────────────
  "Sweden":               "Saab_JAS_39_Gripen",
  "Norway":               "Lockheed_Martin_F-35_Lightning_II",
  "Finland":              "Lockheed_Martin_F-35_Lightning_II",
  "Denmark":              "Lockheed_Martin_F-35_Lightning_II",
  "Belgium":              "Lockheed_Martin_F-35_Lightning_II",
  "Netherlands":          "Holland-class_frigate",
  "Spain":                "Eurofighter_Typhoon",
  "Portugal":             "General_Dynamics_F-16_Fighting_Falcon",
  "Greece":               "Dassault_Mirage_2000",
  "Switzerland":          "Boeing_F/A-18_Hornet",
  "Austria":              "Eurofighter_Typhoon",
  "Luxembourg":           "Airbus_A400M_Atlas",

  // ── Europe — NATO Eastern ──────────────────────────────────────────────────
  "Romania":              "Mikoyan_MiG-21",
  "Czech Republic":       "Saab_JAS_39_Gripen",
  "Hungary":              "Saab_JAS_39_Gripen",
  "Bulgaria":             "Mikoyan_MiG-29",
  "Slovakia":             "Saab_JAS_39_Gripen",
  "Croatia":              "Dassault_Rafale",
  "Slovenia":             "Patria_AMV",
  "Estonia":              "Milrem_THeMIS",
  "Latvia":               "Leopard_2",
  "Lithuania":            "Boxer_(APC)",
  "Albania":              "UH-60_Black_Hawk",
  "Montenegro":           "Aérospatiale_Gazelle",
  "North Macedonia":      "Sukhoi_Su-25",
  "Iceland":              "Boeing_P-8_Poseidon",

  // ── Middle East & North Africa ─────────────────────────────────────────────
  "Saudi Arabia":         "McDonnell_Douglas_F-15_Eagle",
  "United Arab Emirates": "Dassault_Rafale",
  "Qatar":                "Dassault_Rafale",
  "Kuwait":               "Eurofighter_Typhoon",
  "Oman":                 "Eurofighter_Typhoon",
  "Iran":                 "Qaher-313",
  "Iraq":                 "General_Dynamics_F-16_Fighting_Falcon",
  "Jordan":               "General_Dynamics_F-16_Fighting_Falcon",
  "Egypt":                "Dassault_Rafale",
  "Algeria":              "Sukhoi_Su-30",
  "Morocco":              "Dassault_Rafale",

  // ── Asia-Pacific ───────────────────────────────────────────────────────────
  "Taiwan":               "Lockheed_Martin_F-16_Fighting_Falcon",
  "Pakistan":             "Chengdu/CAC_JF-17_Thunder",
  "Indonesia":            "Dassault_Rafale",
  "Vietnam":              "Sukhoi_Su-30",
  "Singapore":            "Lockheed_Martin_F-35_Lightning_II",
  "Thailand":             "Saab_JAS_39_Gripen",
  "Malaysia":             "Sukhoi_Su-30",
  "Philippines":          "Korean_Aerospace_Industries_FA-50",
  "Bangladesh":           "Mikoyan_MiG-29",
  "Myanmar":              "Sukhoi_Su-30",
  "New Zealand":          "NH90",
  "Azerbaijan":           "Baykar_Bayraktar_TB2",
  "Kazakhstan":           "Mikoyan_MiG-31",

  // ── Americas ──────────────────────────────────────────────────────────────
  "Brazil":               "Saab_JAS_39_Gripen",
  "Argentina":            "Argentine_Air_Force",
  "Chile":                "General_Dynamics_F-16_Fighting_Falcon",
  "Colombia":             "IAI_Kfir",
  "Peru":                 "Mikoyan_MiG-29",
  "Mexico":               "Lockheed_T-33_Shooting_Star",

  // ── Africa ─────────────────────────────────────────────────────────────────
  "South Africa":         "Denel_Rooivalk",
  "Nigeria":              "Alpha_Jet",

};

// Returns the Wikipedia article title for the country (used to fetch the banner image).
// Falls back to "Military of {Country}" for unmapped countries.
export function getCountryWikiArticle(countryName) {
  return COUNTRY_WIKI_ARTICLE[countryName]
    || `Military_of_${countryName.replace(/ /g, "_")}`;
}
