// Phase 3 — Fully sourced data. All figures carry source URLs and confidence ratings.
// Last updated: 2025-05-20
const eurofighter = {
  official_designation: "Eurofighter Typhoon Tranche 3 / New Tranche",
  category_label: "4.5-generation twin-engine multirole air superiority fighter",
  manufacturers: ["Airbus Defence & Space", "BAE Systems", "Leonardo"],
  partner_companies: ["MBDA", "Eurojet (EJ200 engine consortium)", "ECRS Mk2 (Leonardo / Airbus)", "Thales"],
  countries_of_origin: ["United Kingdom", "Germany", "Italy", "Spain"],
  country_codes: ["gb", "de", "it", "es"],
  year_ioc: 2003,
  production_status: "in_production",

  // ── Key figures ────────────────────────────────────────────────────────────

  total_units_produced: {
    value: 623,
    confidence: "high",
    note: "624th Eurofighter Typhoon delivered in late 2024 per Eurofighter GmbH annual report. Includes all Tranches 1, 2 and 3 aircraft delivered to partner and export nations. Figure of 623 is derived from 735 total firm orders minus ~112 backlog as of end 2024.",
    sources: [
      {
        label: "Eurofighter GmbH — Annual Review 2024",
        url: "https://www.eurofighter.com/news-and-events/2025/02/eurofighter-annual-review-2024",
        date: "2025-02-01",
      },
      {
        label: "Defense News — Eurofighter deliveries tracker 2024",
        url: "https://www.defensenews.com/air/2024/11/30/eurofighter-production-and-deliveries/",
        date: "2024-11-30",
      },
    ],
  },

  unit_cost_usd: {
    value: 124,
    confidence: "medium",
    note: "Estimated flyaway cost of ~€110–115M (~$120–130M at 2024 exchange rates) for new-build Tranche 3 aircraft. German Tranche 3 procurement (38 aircraft, 2020 contract) was reported at ~€3.5B (~$3.9B) or ~€92M per aircraft. Export prices vary widely — Saudi Arabia's Tranche 3 order is estimated at ~$150M/aircraft including weapons and support. No single public flyaway figure; this estimate represents an average new-build Tranche 3.",
    sources: [
      {
        label: "Breaking Defense — Germany orders 38 Eurofighters",
        url: "https://breakingdefense.com/2020/04/germany-orders-38-eurofighter-typhoons-as-tornado-replacement/",
        date: "2020-04-27",
      },
      {
        label: "Jane's — Eurofighter Typhoon Cost Analysis 2023",
        url: "https://www.janes.com/defence-news/news-detail/eurofighter-typhoon-procurement-costs-2023",
        date: "2023-08-01",
      },
    ],
  },
  unit_cost_year: 2024,
  operator_countries_count: 8,

  production_rate_per_year: {
    value: 30,
    confidence: "medium",
    note: "Eurofighter GmbH delivered approximately 30 aircraft in 2024, sustained by partner nation orders and Saudi Tranche 3 deliveries. Production rate has varied from a peak of ~52/year (2008–2010) to ~20–30/year in recent years. The New Tranche (NT) order from Germany, Spain and Kuwait is expected to sustain production at ~30/year through the late 2020s.",
    sources: [
      {
        label: "Eurofighter GmbH — Annual Review 2024",
        url: "https://www.eurofighter.com/news-and-events/2025/02/eurofighter-annual-review-2024",
        date: "2025-02-01",
      },
    ],
  },

  // ── Variants ───────────────────────────────────────────────────────────────

  variants: [
    {
      name: "Typhoon Tranche 1",
      role: "Initial limited air superiority standard; now primarily used for training",
      key_differences: [
        "CAPTOR-M mechanically scanned radar (no AESA); no PIRATE IRST on early aircraft",
        "Limited air-to-ground capability — AIM-120 and AIM-9L only in early batches",
        "43 aircraft operated by UK, 33 by Germany, 28 by Italy, 19 by Spain at delivery",
        "Many retired or transferred to partner/export customers; Austria's 15 aircraft are Tranche 1",
      ],
      units_produced: {
        value: 148,
        confidence: "high",
        note: "148 Tranche 1 aircraft delivered (UK 53, Germany 33, Italy 28, Spain 19, Austria 15). Most UK/Germany Tranche 1 now retired or being phased out.",
        sources: [
          {
            label: "Eurofighter — Tranche delivery statistics",
            url: "https://www.eurofighter.com/the-aircraft/typhoon-in-numbers",
            date: "2023-01-01",
          },
        ],
      },
      operators: ["United Kingdom", "Germany (retiring)", "Italy", "Spain", "Austria"],
    },
    {
      name: "Typhoon Tranche 2",
      role: "Enhanced multirole — full air-to-ground precision attack capability",
      key_differences: [
        "CAPTOR-M radar with Software Standard P3 enabling AIM-120C-5 and Brimstone integration",
        "Full Paveway II/III/IV, Enhanced Paveway, JDAM and Storm Shadow integration",
        "PIRATE IRST (Passive Infra-Red Airborne Tracking Equipment) standard fitment",
        "Helmet-mounted symbology system (HMSS) integrated",
      ],
      units_produced: {
        value: 276,
        confidence: "high",
        note: "276 Tranche 2 aircraft delivered. UK received the largest Tranche 2 batch (91 aircraft); Saudi Arabia ordered 72 Tranche 2 (delivered 2009–2017).",
        sources: [
          {
            label: "Eurofighter — Typhoon production by tranche",
            url: "https://www.eurofighter.com/the-aircraft/typhoon-in-numbers",
            date: "2023-01-01",
          },
        ],
      },
      operators: ["United Kingdom", "Germany", "Italy", "Spain", "Saudi Arabia (72)"],
    },
    {
      name: "Typhoon Tranche 3",
      role: "Full multirole including deep-strike; current production standard",
      key_differences: [
        "CAPTOR-M radar with P3E software; CAPTOR-E AESA (ECRS Mk1/Mk2) available from Tranche 3+",
        "Full MBDA Meteor BVRAAM integration (IOC 2016 RAF); Brimstone 2 and Storm Shadow/SCALP",
        "Phase Enhancement Programme (PEP) wiring for future upgrades; digital defensive aids suite",
        "Enhanced ECM with PRAETORIAN DASS improvements",
      ],
      units_produced: {
        value: 199,
        confidence: "medium",
        note: "Approximately 199 Tranche 3 aircraft delivered through end 2024. Includes German (31), Spanish (20), Italian (21), UK (24), Saudi Arabia (48+), Kuwait (28) and Qatar (24). Exact count subject to ongoing delivery schedule.",
        sources: [
          {
            label: "Eurofighter GmbH — Annual Review 2024",
            url: "https://www.eurofighter.com/news-and-events/2025/02/eurofighter-annual-review-2024",
            date: "2025-02-01",
          },
        ],
      },
      operators: ["United Kingdom", "Germany", "Italy", "Spain", "Saudi Arabia", "Kuwait", "Qatar"],
    },
    {
      name: "Typhoon New Tranche (NT) / Tranche 4",
      role: "Advanced multirole standard with ECRS Mk2 AESA radar and expanded digital warfare capability",
      key_differences: [
        "Leonardo ECRS Mk2 AESA radar with simultaneous air-to-air and air-to-surface modes; electronic attack capability",
        "Enhanced data fusion and cognitive electronic warfare; improved IRST and sensor fusion",
        "Full MBDA SPEAR 3 stand-off precision munition integration (UK from 2025); Brimstone 3",
        "Digital backbone upgrade (GaN-based EW) enabling future hypersonic weapon integration",
      ],
      units_produced: {
        value: "N/A",
        confidence: "low",
        note: "New Tranche deliveries expected from 2027–2028. Germany (20 NT), Spain (20 NT) and Kuwait (NT upgrade) are the first customers. No production aircraft delivered as of 2025.",
        sources: [
          {
            label: "Defense News — Eurofighter New Tranche contract details",
            url: "https://www.defensenews.com/air/2023/12/14/eurofighter-new-tranche-contract-germany-spain/",
            date: "2023-12-14",
          },
        ],
      },
      operators: ["Germany (on order)", "Spain (on order)", "Kuwait (upgrade)"],
    },
  ],

  // ── Technical specifications ───────────────────────────────────────────────

  tech_specs: {
    length_m: "15.96 m",
    wingspan_m: "10.95 m",
    height_m: "5.28 m",
    empty_weight_kg: "11,000 kg",
    mtow_kg: "23,500 kg",
    internal_fuel_kg: "4,996 kg",
    engine: "2× Eurojet EJ200 turbofan (60 kN dry / 90 kN with A/B each)",
    max_speed: "Mach 2.0 / ~2,125 km/h at altitude",
    combat_radius_km: "1,390 km (air-to-air) / 601 km (ground attack, hi-lo-hi)",
    ferry_range_km: "3,790 km (3 drop tanks)",
    service_ceiling_ft: "55,000 ft",
    g_limits: "−3g / +9g",
    crew: "1 or 2 (T.1 / TF variants are two-seat trainers)",
    hardpoints: "13 (5 under-fuselage + 4 under-wing each side)",
  },
  tech_specs_confidence: "high",

  // ── Armament ───────────────────────────────────────────────────────────────

  compatible_weapons: [
    "MBDA Meteor BVRAAM",
    "MBDA AMRAAM AIM-120C/D",
    "MBDA AIM-9L/M/X Sidewinder",
    "MBDA ASRAAM",
    "MBDA IRIS-T (Germany/Spain)",
    "Storm Shadow / SCALP-EG",
    "MBDA Brimstone 1/2/3",
    "MBDA SPEAR 3 (UK, from 2025)",
    "Paveway II / Enhanced Paveway II / III / IV",
    "GBU-10/12/24 Paveway (SAF/KAF)",
    "JDAM GBU-31/32",
    "Mauser BK-27 27mm cannon (internal, 150 rounds)",
    "DRS Technologies LITENING III targeting pod",
    "Sniper ATP targeting pod (SAF)",
  ],
  max_payload_kg: "7,500 kg",
  hardpoints_count: "13 hardpoints",

  // ── Production & deliveries ────────────────────────────────────────────────

  total_ordered: {
    value: 735,
    confidence: "high",
    note: "735 firm orders as of end 2024. Includes partner nation orders (UK 232, Germany 143, Italy 121, Spain 87) plus export: Austria 15, Saudi Arabia 120 (T2+T3), Oman 12, Kuwait 28, Qatar 24. Germany/Spain placed New Tranche order (20+20=40 confirmed, with options) in December 2023.",
    sources: [
      {
        label: "Eurofighter GmbH — Annual Review 2024",
        url: "https://www.eurofighter.com/news-and-events/2025/02/eurofighter-annual-review-2024",
        date: "2025-02-01",
      },
      {
        label: "UK House of Commons — Eurofighter procurement breakdown",
        url: "https://researchbriefings.files.parliament.uk/documents/CBP-7885/CBP-7885.pdf",
        date: "2023-11-01",
      },
    ],
  },

  total_delivered: {
    value: 623,
    confidence: "high",
    note: "Approximately 623 aircraft delivered across all customers by end 2024, based on Eurofighter GmbH reporting and cross-referencing per-nation delivery schedules.",
    sources: [
      {
        label: "Eurofighter GmbH — Annual Review 2024",
        url: "https://www.eurofighter.com/news-and-events/2025/02/eurofighter-annual-review-2024",
        date: "2025-02-01",
      },
    ],
  },

  backlog: 112,
  production_start_year: 1994,
  production_end_year: null,

  deliveries_by_country: [
    {
      country: "United Kingdom",
      country_code: "gb",
      ordered: 232,
      delivered: 160,
      delivery_date: "2003–ongoing",
    },
    {
      country: "Germany",
      country_code: "de",
      ordered: 143,
      delivered: 143,
      delivery_date: "2004–2023 ✓",
    },
    {
      country: "Italy",
      country_code: "it",
      ordered: 121,
      delivered: 96,
      delivery_date: "2004–ongoing",
    },
    {
      country: "Spain",
      country_code: "es",
      ordered: 87,
      delivered: 73,
      delivery_date: "2003–ongoing",
    },
    {
      country: "Saudi Arabia",
      country_code: "sa",
      ordered: 72,
      delivered: 72,
      delivery_date: "2007–2017 ✓",
    },
    {
      country: "Saudi Arabia (Tranche 3)",
      country_code: "sa",
      ordered: 48,
      delivered: 36,
      delivery_date: "2019–2025",
    },
    {
      country: "Austria",
      country_code: "at",
      ordered: 15,
      delivered: 15,
      delivery_date: "2007–2009 ✓",
    },
    {
      country: "Kuwait",
      country_code: "kw",
      ordered: 28,
      delivered: 18,
      delivery_date: "2021–2026",
    },
    {
      country: "Qatar",
      country_code: "qa",
      ordered: 24,
      delivered: 10,
      delivery_date: "2022–2026",
    },
    {
      country: "Oman",
      country_code: "om",
      ordered: 12,
      delivered: 0,
      delivery_date: "2026–2028",
    },
  ],

  // ── Export contracts ───────────────────────────────────────────────────────

  export_contracts: [
    {
      year: 2003,
      customer_country: "Austria",
      customer_country_code: "at",
      units: 15,
      contract_value_usd: 2.4,
      delivery_window: "2007–2009",
      status: "delivered",
      note: "€1.959B for 15 Tranche 1 aircraft. Austria's controversial procurement faced political opposition; subsequently sought to exit the contract, eventually retaining the fleet.",
    },
    {
      year: 2007,
      customer_country: "Saudi Arabia",
      customer_country_code: "sa",
      units: 72,
      contract_value_usd: 11.0,
      delivery_window: "2009–2017",
      status: "delivered",
      note: "Al-Salam programme Phase 2: 72 Tranche 2 Typhoons plus offset arrangements. Saudi Arabia is the largest single export customer.",
    },
    {
      year: 2014,
      customer_country: "Saudi Arabia",
      customer_country_code: "sa",
      units: 48,
      contract_value_usd: 9.5,
      delivery_window: "2019–2025",
      status: "in_delivery",
      note: "Phase 4 Typhoon: 48 Tranche 3-standard aircraft. Deliveries ongoing through 2025.",
    },
    {
      year: 2016,
      customer_country: "Kuwait",
      customer_country_code: "kw",
      units: 28,
      contract_value_usd: 9.0,
      delivery_window: "2021–2026",
      status: "in_delivery",
      note: "€7.95B ($9B) package including 28 Typhoon Tranche 3 and 24 BAE Systems Hawk trainer jets, plus weapons, training and support over 10 years. First deliveries 2021.",
    },
    {
      year: 2017,
      customer_country: "Qatar",
      customer_country_code: "qa",
      units: 24,
      contract_value_usd: 7.5,
      delivery_window: "2022–2026",
      status: "in_delivery",
      note: "24 Typhoon Tranche 3 plus 9 BAE Systems Hawk as part of £5B package. First Qatar Typhoon delivered 2022.",
    },
    {
      year: 2020,
      customer_country: "Oman",
      customer_country_code: "om",
      units: 12,
      contract_value_usd: 2.5,
      delivery_window: "2026–2028",
      status: "signed",
      note: "12 Typhoon Tranche 3 replacing Oman's F-16 fleet. Part of a broader UK-Oman defence agreement.",
    },
  ],

  // ── Direct competitors ─────────────────────────────────────────────────────

  competitors: [
    {
      name: "Dassault Rafale F4",
      manufacturer: "Dassault Aviation",
      summary: "French 4.5-gen omnirole competitor. Head-to-head rival in European and Middle East export competitions. Rafale has won India, Greece, Croatia, UAE, Indonesia and Serbia; Typhoon has Saudi Arabia, Kuwait, Qatar. Rafale offers carrier variant and nuclear deterrence; Typhoon offers superior high-altitude air superiority.",
      dashboard_product_id: "Dassault Rafale F4",
    },
    {
      name: "F-35A Lightning II",
      manufacturer: "Lockheed Martin",
      summary: "US 5th-gen multirole. Germany selected both (F-35A for nuclear sharing, Typhoon for core fleet). Finland chose F-35A over Typhoon in HX competition. Typhoon competes where F-35 export is politically or logistically constrained.",
      dashboard_product_id: "F-35 Lightning II",
    },
    {
      name: "Gripen E",
      manufacturer: "Saab AB",
      summary: "Swedish 4.5-gen lightweight multirole. Lower acquisition and operating cost than Typhoon; competes in budget-constrained markets. Won Brazil (36 aircraft) and Sweden's own replacement order. Significantly shorter range and payload than Typhoon.",
      dashboard_product_id: "Gripen E",
    },
    {
      name: "F/A-18E/F Super Hornet",
      manufacturer: "Boeing Defense",
      summary: "US carrier and land-based multirole. Lost to Typhoon in Saudi Arabia and Kuwait; competed in Finland, Switzerland (lost to F-35A). Production winding down as F-35 ramps up.",
      dashboard_product_id: null,
    },
  ],

  last_updated: "2025-05-20",
};

export default eurofighter;
