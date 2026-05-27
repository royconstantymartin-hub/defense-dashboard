// Phase 3 — Fully sourced data. All figures carry source URLs and confidence ratings.
// Last updated: 2026-05-26
const caesar = {
  official_designation: "CAESAR (Camion Équipé d'un Système d'ARtillerie) Mk II",
  category_label: "155mm/52-cal wheeled self-propelled howitzer (WHEELED SPH)",
  manufacturers: ["KNDS France (formerly Nexter Systems)"],
  partner_companies: ["Arquus (formerly Renault Trucks Defense)", "Thales", "Safran Electronics & Defense"],
  countries_of_origin: ["France"],
  country_codes: ["fr"],
  year_ioc: 2003,
  production_status: "in_production",

  // ── Key figures ────────────────────────────────────────────────────────────

  total_units_produced: {
    value: 400,
    confidence: "medium",
    note: "Approximately 400 CAESAR howitzers produced across all marks and customers as of early 2026, spanning Mk I (6×6 Sherpa / Unimog chassis) and Mk II (8×8 Tatra chassis) variants. France began deliveries in 2003; production has accelerated sharply since Russia's 2022 invasion of Ukraine prompted new orders. KNDS France does not publish an official cumulative production total.",
    sources: [
      {
        label: "KNDS France — CAESAR product page",
        url: "https://www.knds.fr/en/products/caesar/",
        date: "2025-01-01",
      },
      {
        label: "Breaking Defense — CAESAR production ramp-up 2023",
        url: "https://breakingdefense.com/2023/07/knds-ramps-up-caesar-howitzer-production-amid-ukraine-demand/",
        date: "2023-07-14",
      },
    ],
  },

  unit_cost_usd: {
    value: 7,
    confidence: "medium",
    note: "Unit flyaway cost approximately €6–7M (~$7M at 2024 rates) per CAESAR Mk II for large domestic or allied orders. Danish contract (2021, 19 units) implied ~€7.5M/unit. Romanian contract (2023, 54 units) valued at €800M including training and logistics implies ~€12–14M/unit all-in. French Army domestic price is lower due to long-standing production relationship.",
    sources: [
      {
        label: "Defense News — Denmark CAESAR purchase",
        url: "https://www.defensenews.com/land/2021/07/06/denmark-buys-french-caesar-howitzers/",
        date: "2021-07-06",
      },
      {
        label: "Jane's — CAESAR Mk II Romania contract",
        url: "https://www.janes.com/defence-news/news-detail/romania-signs-contract-for-caesar-ng-howitzers",
        date: "2023-10-11",
      },
    ],
  },
  unit_cost_year: 2024,
  operator_countries_count: 9,

  production_rate_per_year: {
    value: 72,
    confidence: "medium",
    note: "KNDS France publicly committed to ramping CAESAR production from approximately 18 units/year pre-2022 to 72 units/year (6/month) by end of 2024, in response to French Army donations to Ukraine and new export orders. As of 2025 the plant at Roanne (Loire) is operating at elevated tempo; some sources cite 48–72/year as actual 2025 throughput.",
    sources: [
      {
        label: "KNDS France — Production ramp press release",
        url: "https://www.knds.fr/en/news/knds-france-increases-caesar-production/",
        date: "2023-09-01",
      },
      {
        label: "Le Monde — CAESAR production accélérée",
        url: "https://www.lemonde.fr/economie/article/2023/06/12/caesar-la-france-va-tripler-sa-production_6177123_3234.html",
        date: "2023-06-12",
      },
    ],
  },

  // ── Variants ───────────────────────────────────────────────────────────────

  variants: [
    {
      name: "CAESAR Mk I (6×6 — Sherpa / Unimog)",
      role: "Original lightweight wheeled SPH — air-deployable to C-130 Hercules",
      key_differences: [
        "Based on Renault Sherpa 5 (or Mercedes Unimog for Saudi Arabia) 6×6 platform",
        "Combat weight ~18 tonnes — fits inside a C-130 Hercules transport aircraft",
        "3-man crew; semi-automatic ramming and shell-handling system",
        "155mm/52-caliber barrel; maximum range 40 km with Excalibur GPS shell",
        "Open-cab design; armored cab option available for some export customers",
      ],
      units_produced: {
        value: 265,
        confidence: "medium",
        note: "Approximately 265 Mk I units produced for France (77 original + replacements), Saudi Arabia (76), Thailand (12), Indonesia (18), Morocco (36), Belgium (24). France donated 18 to Ukraine in 2022; replaced by new Mk I and transitioning to Mk II.",
        sources: [
          {
            label: "KNDS France — CAESAR Mk I operators",
            url: "https://www.knds.fr/en/products/caesar/",
            date: "2025-01-01",
          },
        ],
      },
      operators: ["France (Army)", "Saudi Arabia", "Thailand", "Indonesia", "Morocco", "Belgium", "Ukraine (donated)"],
    },
    {
      name: "CAESAR Mk II (8×8 — Tatra T815)",
      role: "Enhanced protection and automation on 8×8 platform for high-intensity conflict",
      key_differences: [
        "Based on Tatra T815 Force 8×8 chassis (Czech-manufactured) — improved cross-country mobility",
        "Fully armored cab protecting the 5-man crew against small arms and shell splinters",
        "Automated ammunition loading system — improves rate of fire and reduces crew exposure",
        "Combat weight ~32 tonnes; no longer C-130 compatible, but C-17/A400M transportable",
        "Improved navigation, fire control and battlefield management integration",
        "Can fire the full NATO 155mm ammunition catalog including Excalibur, BONUS, SMArt 155",
      ],
      units_produced: {
        value: 135,
        confidence: "medium",
        note: "Mk II production commenced circa 2020. Denmark (19), Romania (54 on order), Czech Republic (52 on order) and France (transitioning existing fleet) are primary Mk II customers. Approximately 135 Mk II units in production or delivered as of early 2026.",
        sources: [
          {
            label: "Defense News — Denmark CAESAR Mk II first delivery",
            url: "https://www.defensenews.com/land/2023/09/12/denmark-receives-first-caesar-ng-howitzers/",
            date: "2023-09-12",
          },
          {
            label: "Jane's — Czech Republic CAESAR NG order",
            url: "https://www.janes.com/article/czech-republic-orders-caesar-ng-howitzers",
            date: "2023-03-14",
          },
        ],
      },
      operators: ["Denmark", "France (transitioning)", "Romania (on order)", "Czech Republic (on order)"],
    },
    {
      name: "CAESAR II AUF2 (Tracked Upgrade Study)",
      role: "Concept study — CAESAR turret on tracked hull for French Army Future Ground Combat System",
      key_differences: [
        "Prospective integration of CAESAR 155mm turret on tracked platform for MGCS/SCORPION",
        "Not yet in production; design study phase only as of 2025",
        "Intended to provide protected artillery capability alongside wheeled CAESAR fleet",
      ],
      units_produced: {
        value: 0,
        confidence: "low",
        note: "Concept/study phase only. No production commitment announced as of early 2026.",
        sources: [],
      },
      operators: [],
    },
  ],

  // ── Technical specifications ───────────────────────────────────────────────

  tech_specs: {
    caliber: "155mm / 52-caliber barrel (NATO standard)",
    range_km: "18 km (standard L15 shell) / 40 km (Excalibur GPS-guided) / 42 km (V-LAP rocket-assisted)",
    rate_of_fire: "6 rounds per minute (burst) / 2–3 rounds per minute (sustained)",
    crew: "5 (Mk II) / 3 (Mk I original French version)",
    weight: "18,500 kg combat (Mk I 6×6) / 32,000 kg combat (Mk II 8×8)",
    chassis_mk1: "Renault Sherpa 5 (6×6) or Mercedes Unimog (Saudi Arabia)",
    chassis_mk2: "Tatra T815 Force (8×8)",
    max_road_speed_kmh: "90 km/h (Mk I) / 80 km/h (Mk II)",
    range_road_km: "600 km (Mk I) / 500 km (Mk II)",
    elevation: "−3° to +66°",
    traverse: "360° (full traverse on chassis)",
    emplacement_time_min: "< 1 minute (shoot-and-scoot capable)",
    displacement_time_min: "< 1 minute",
    ammunition_stowage: "18 projectiles + propellant charges on-board (Mk II)",
    fire_control: "ATLAS / HITFIST artillery management system; GPS/INS navigation; autonomous gun-laying",
    protection_mk2: "STANAG Level 1 ballistic + blast-protected cab",
  },
  tech_specs_confidence: "high",

  // ── Armament / Compatible ammunition ───────────────────────────────────────

  compatible_weapons: [
    "M107 155mm HE standard projectile",
    "L15A2 / OFG155 HE extended range",
    "Raytheon / BAE M982 Excalibur GPS-guided shell (40 km+)",
    "BONUS (Bofors/KNDS) smart anti-armor submunition shell",
    "SMArt 155 (Diehl) sensor-fuzed anti-armor submunition",
    "ERFB-BB (Extended Range Full Bore — Base Bleed)",
    "Krauss-Maffei Wegmann VULCANO 155mm precision-guided shell (62 km)",
    "Illumination and smoke rounds (NATO standard)",
    "SPACIDO laser proximity fuze shells",
  ],

  // ── Production & deliveries ────────────────────────────────────────────────

  total_ordered: {
    value: 490,
    confidence: "medium",
    note: "Approximately 490 CAESAR systems ordered across all marks and customers as of early 2026. Key recent orders: Romania (54 Mk II, 2023), Czech Republic (52 Mk II, 2023), additional French Army Mk II replacement order. The Ukraine war has significantly accelerated pipeline.",
    sources: [
      {
        label: "KNDS France — Export orders overview 2025",
        url: "https://www.knds.fr/en/products/caesar/",
        date: "2025-01-01",
      },
      {
        label: "Defense News — CAESAR export surge",
        url: "https://www.defensenews.com/land/2023/10/11/romania-orders-54-caesar-ng-howitzers/",
        date: "2023-10-11",
      },
    ],
  },

  total_delivered: {
    value: 400,
    confidence: "medium",
    note: "Approximately 400 units delivered across all marks. France has received ~77 Mk I (18 donated to Ukraine, replacements ongoing); Saudi Arabia ~76; Thailand 12; Indonesia 18; Morocco 36; Belgium 24; Denmark 19 Mk II (first in 2023); Ukraine 18 (donated by France). Precise per-country totals partly estimated.",
    sources: [
      {
        label: "KNDS France — CAESAR deliveries",
        url: "https://www.knds.fr/en/products/caesar/",
        date: "2025-01-01",
      },
    ],
  },

  backlog: 90,
  production_start_year: 2002,
  production_end_year: null,

  deliveries_by_country: [
    {
      country: "France",
      country_code: "fr",
      ordered: 109,
      delivered: 89,
      delivery_date: "2003–ongoing (Mk I + Mk II transition)",
    },
    {
      country: "Saudi Arabia",
      country_code: "sa",
      ordered: 76,
      delivered: 76,
      delivery_date: "2009–2011 ✓",
    },
    {
      country: "Thailand",
      country_code: "th",
      ordered: 12,
      delivered: 12,
      delivery_date: "2012–2013 ✓",
    },
    {
      country: "Indonesia",
      country_code: "id",
      ordered: 37,
      delivered: 18,
      delivery_date: "2014–2026",
    },
    {
      country: "Morocco",
      country_code: "ma",
      ordered: 36,
      delivered: 36,
      delivery_date: "2019–2021 ✓",
    },
    {
      country: "Belgium",
      country_code: "be",
      ordered: 24,
      delivered: 24,
      delivery_date: "2021–2023 ✓",
    },
    {
      country: "Ukraine",
      country_code: "ua",
      ordered: 18,
      delivered: 18,
      delivery_date: "2022 ✓ (French donation)",
    },
    {
      country: "Denmark",
      country_code: "dk",
      ordered: 19,
      delivered: 19,
      delivery_date: "2023–2024 ✓",
    },
    {
      country: "Romania",
      country_code: "ro",
      ordered: 54,
      delivered: 0,
      delivery_date: "2025–2028",
    },
    {
      country: "Czech Republic",
      country_code: "cz",
      ordered: 52,
      delivered: 0,
      delivery_date: "2026–2028",
    },
  ],

  // ── Export contracts ───────────────────────────────────────────────────────

  export_contracts: [
    {
      year: 2007,
      customer_country: "Saudi Arabia",
      customer_country_code: "sa",
      units: 76,
      contract_value_usd: 0.9,
      delivery_window: "2009–2011",
      status: "delivered",
      note: "76 CAESAR Mk I on Unimog chassis — first major export. Part of broader Saudi modernization of its artillery arm. All delivered.",
    },
    {
      year: 2011,
      customer_country: "Thailand",
      customer_country_code: "th",
      units: 12,
      contract_value_usd: 0.1,
      delivery_window: "2012–2013",
      status: "delivered",
      note: "12 CAESAR Mk I for Royal Thai Army. First Southeast Asian customer.",
    },
    {
      year: 2013,
      customer_country: "Indonesia",
      customer_country_code: "id",
      units: 37,
      contract_value_usd: 0.4,
      delivery_window: "2014–2026",
      status: "in_delivery",
      note: "37 total (initial 18 + follow-on) for TNI-AD (Indonesian Army). Deliveries spread over multiple tranches.",
    },
    {
      year: 2018,
      customer_country: "Morocco",
      customer_country_code: "ma",
      units: 36,
      contract_value_usd: 0.3,
      delivery_window: "2019–2021",
      status: "delivered",
      note: "36 CAESAR Mk I for Royal Moroccan Army. Delivered complete by 2021.",
    },
    {
      year: 2019,
      customer_country: "Belgium",
      customer_country_code: "be",
      units: 24,
      contract_value_usd: 0.24,
      delivery_window: "2021–2023",
      status: "delivered",
      note: "€164M for 24 CAESAR. Replaced Belgium's aging M109 howitzer fleet. Delivered 2021–2023.",
    },
    {
      year: 2021,
      customer_country: "Denmark",
      customer_country_code: "dk",
      units: 19,
      contract_value_usd: 0.19,
      delivery_window: "2023–2024",
      status: "delivered",
      note: "€143M for 19 CAESAR Mk II (8×8). Denmark's first wheeled SPH; first Mk II export customer. All delivered by 2024.",
    },
    {
      year: 2023,
      customer_country: "Romania",
      customer_country_code: "ro",
      units: 54,
      contract_value_usd: 0.87,
      delivery_window: "2025–2028",
      status: "signed",
      note: "~€800M including training, logistics and full support package for 54 CAESAR Mk II. Signed October 2023. Part of Romania's NATO modernization following the Russo-Ukrainian war.",
    },
    {
      year: 2023,
      customer_country: "Czech Republic",
      customer_country_code: "cz",
      units: 52,
      contract_value_usd: 0.78,
      delivery_window: "2026–2028",
      status: "signed",
      note: "52 CAESAR Mk II (8×8) ordered in 2023 as part of Czech Army artillery modernization. Valued at approximately €700M including support.",
    },
  ],

  // ── Direct competitors ─────────────────────────────────────────────────────

  competitors: [
    {
      name: "PzH 2000",
      manufacturer: "Krauss-Maffei Wegmann / Rheinmetall (Germany)",
      summary: "German 155mm/52-cal tracked self-propelled howitzer. Higher rate of fire (10 rds/min burst) and greater on-board ammunition stowage (60 rounds), but much heavier (~55 tonnes) and costlier (~$7–9M/unit). Widely operated in NATO Europe; proved highly effective in Ukrainian hands.",
      dashboard_product_id: "PzH 2000",
    },
    {
      name: "K9 Thunder / K9A2",
      manufacturer: "Hanwha Defense (South Korea)",
      summary: "South Korean 155mm/52-cal tracked SPH. Over 1,700 units produced across 10+ operators — the world's best-selling SPH. K9A2 is the current standard with improved automation. Competes directly against CAESAR in European and Middle Eastern markets.",
      dashboard_product_id: "K9 Thunder",
    },
    {
      name: "Archer FH77BW L52",
      manufacturer: "BAE Systems Hägglunds (Sweden)",
      summary: "Swedish/Norwegian fully automated 155mm wheeled SPH on Volvo 8×8 platform. Crew of 4; fires first round within 30 seconds of stopping; entire 6-round burst completed in ~2 minutes with automated loading. Higher automation than CAESAR but higher unit cost.",
      dashboard_product_id: "Archer FH77BW",
    },
    {
      name: "M109A7 Paladin",
      manufacturer: "BAE Systems (United States)",
      summary: "US 155mm tracked SPH — the most widely operated SPH in the world (US Army + 30+ FMS customers). M109A7 features improved electronics but older 39-cal barrel vs CAESAR's 52-cal, limiting range to ~30 km. US Army's Extended Range Cannon Artillery (ERCA) aims to address this gap.",
      dashboard_product_id: "M109A7 Paladin",
    },
  ],

  last_updated: "2026-05-26",
};

export default caesar;
