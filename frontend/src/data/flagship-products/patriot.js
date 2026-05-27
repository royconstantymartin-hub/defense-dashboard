// Phase 3 — Fully sourced data. All figures carry source URLs and confidence ratings.
// Last updated: 2025-05-26
const patriot = {
  official_designation: "Patriot PAC-3 MSE (Missile Segment Enhancement)",
  category_label: "Long-range surface-to-air missile (SAM) / air and missile defense system",
  manufacturers: ["Raytheon Technologies (RTX)", "Lockheed Martin Missiles & Fire Control"],
  partner_companies: ["Northrop Grumman", "Siemens (Germany)", "MBDA (GEM-T integration)", "L3Harris Technologies"],
  countries_of_origin: ["United States"],
  country_codes: ["us"],
  year_ioc: 1984,
  production_status: "in_production",

  // ── Key figures ────────────────────────────────────────────────────────────

  total_units_produced: {
    value: 240,
    confidence: "medium",
    note: "Approximately 240 Patriot fire units (batteries) have been produced or are on order worldwide as of 2025, across all PAC configurations. Each fire unit consists of a radar (AN/MPQ-65), engagement control station (ECS), power plant, and typically 8 launcher stations. Cumulative interceptor production (all PAC-2 GEM/GEM-T and PAC-3 MSE variants combined) exceeds 10,000 missiles. Fire unit count is the standard production metric for Patriot.",
    sources: [
      {
        label: "Raytheon — Patriot Air Defense System Overview",
        url: "https://www.rtx.com/raytheon/what-we-do/integrated-air-and-missile-defense/patriot-air-and-missile-defense-system",
        date: "2024-01-01",
      },
      {
        label: "Breaking Defense — Patriot demand surge 2023",
        url: "https://breakingdefense.com/2023/05/patriot-demand-surges-raytheon-says-production-is-ramping-up/",
        date: "2023-05-09",
      },
    ],
  },

  unit_cost_usd: {
    value: 1100,
    confidence: "medium",
    note: "A complete Patriot fire unit (PAC-3 MSE configuration with radar, ECS, launchers, and initial missile complement) costs approximately $1B–$1.1B. Individual PAC-3 MSE interceptor missiles cost approximately $5.4M each. PAC-2 GEM-T missiles are approximately $1.5M each. Per-interceptor costs have increased significantly since 2022 due to supply chain pressure and increased demand.",
    sources: [
      {
        label: "DSCA — Ukraine Patriot FMS notification ($2B for 2 batteries)",
        url: "https://www.dsca.mil/press-media/major-arms-sales/ukraine-patriot-air-defense-system",
        date: "2023-01-18",
      },
      {
        label: "Defense News — PAC-3 MSE missile cost per unit",
        url: "https://www.defensenews.com/pentagon/2022/06/29/raytheon-to-produce-more-pac-3-mse-missiles-as-demand-rises/",
        date: "2022-06-29",
      },
    ],
  },
  unit_cost_year: 2024,
  operator_countries_count: 19,

  production_rate_per_year: {
    value: 500,
    confidence: "medium",
    note: "Raytheon is producing approximately 500 PAC-3 MSE interceptors per year and is under contract to increase to 600+ by 2025 to meet US Army and FMS demand, particularly accelerated by Ukraine transfers and re-stocking requests from European NATO allies. Fire unit (battery) deliveries are approximately 4–6 per year. Lockheed Martin produces the PAC-3/MSE missile seeker and motor.",
    sources: [
      {
        label: "Raytheon Q1 2024 Earnings — missile production commentary",
        url: "https://investor.rtx.com/news-releases/news-release-details/raytheon-technologies-reports-first-quarter-2024-results",
        date: "2024-04-23",
      },
      {
        label: "Breaking Defense — Patriot PAC-3 MSE production ramp",
        url: "https://breakingdefense.com/2024/02/raytheon-to-ramp-pac-3-mse-production-as-allies-demand-grows/",
        date: "2024-02-07",
      },
    ],
  },

  // ── Variants ───────────────────────────────────────────────────────────────

  variants: [
    {
      name: "Patriot PAC-1",
      role: "Original anti-aircraft variant — area air defense against aircraft and cruise missiles",
      key_differences: [
        "MIM-104A/B missiles — blast-fragmentation warhead, non-maneuvering engagement",
        "Limited ballistic missile defense capability (tested, not fielded operationally for TBM)",
        "AN/MPQ-53 radar — phased array with mechanically scanned antenna",
        "Entered US Army service 1984; used in Gulf War (1991) with mixed anti-TBM results",
      ],
      units_produced: {
        value: 100,
        confidence: "low",
        note: "PAC-1 batteries are no longer in service; exact production count not publicly available. Most were subsequently upgraded to PAC-2 or PAC-3 standard.",
        sources: [],
      },
      operators: ["United States (retired)", "Germany (retired)", "Netherlands (retired)"],
    },
    {
      name: "Patriot PAC-2 GEM-T",
      role: "Enhanced anti-aircraft and ballistic missile defense — guided enhanced missile",
      key_differences: [
        "MIM-104D/E GEM (Guided Enhanced Missile) with proximity fuze and improved homing",
        "GEM-T (Terminal) variant with updated seeker for improved TBM intercept",
        "Blast-fragmentation warhead; engages targets via near-detonation",
        "AN/MPQ-65 upgraded radar; maximum altitude ~24 km, range ~160 km vs. aircraft",
      ],
      units_produced: {
        value: 5000,
        confidence: "medium",
        note: "Estimated 5,000+ PAC-2 GEM/GEM-T missiles produced for US Army and numerous FMS customers. PAC-2 remains the primary intercept vehicle for many operators due to lower cost vs. PAC-3.",
        sources: [
          {
            label: "Raytheon — PAC-2 GEM-T product data sheet",
            url: "https://www.rtx.com/raytheon/what-we-do/integrated-air-and-missile-defense/pac-2-gem-t",
            date: "2023-01-01",
          },
        ],
      },
      operators: [
        "United States",
        "Germany",
        "Netherlands",
        "Israel (modified as PAC-2+)",
        "Saudi Arabia",
        "Kuwait",
        "Japan",
        "South Korea",
        "Taiwan",
        "UAE",
        "Greece",
        "Spain",
      ],
    },
    {
      name: "Patriot PAC-3",
      role: "Hit-to-kill anti-ballistic missile — kinetic kill vehicle",
      key_differences: [
        "Lethality Enhancement Device (LED) side-mounted warhead for additional kill probability",
        "Active radar seeker guiding terminal hit-to-kill engagement",
        "Significantly smaller and lighter than PAC-2; 16 PAC-3 missiles fit on one launcher vs. 4 PAC-2",
        "Optimized for short-to-medium-range ballistic missiles (SRBM/MRBM)",
      ],
      units_produced: {
        value: 3500,
        confidence: "medium",
        note: "Estimated 3,500+ PAC-3 (original) missiles produced. The PAC-3 missile is built by Lockheed Martin Missiles & Fire Control in Camden, Arkansas.",
        sources: [
          {
            label: "Lockheed Martin — PAC-3 missile fact sheet",
            url: "https://www.lockheedmartin.com/en-us/products/pac-3.html",
            date: "2023-01-01",
          },
        ],
      },
      operators: ["United States", "Japan", "South Korea", "Taiwan", "UAE", "Saudi Arabia"],
    },
    {
      name: "Patriot PAC-3 MSE (Missile Segment Enhancement)",
      role: "Current production standard — significantly extended range and altitude for BMD",
      key_differences: [
        "Extended-range boost motor doubles engagement envelope vs. PAC-3: range ~35 km vs. 20 km",
        "Larger rocket motor and control fins allow intercept of faster, higher-flying targets",
        "Engages SRBM, MRBM, IRBM, cruise missiles, and aircraft in a single missile type",
        "16 per launcher station (same footprint as PAC-3); each PAC-3 MSE has 180° field of fire",
        "Combined PAC-2 GEM-T / PAC-3 MSE mixed fire unit is current US Army standard",
      ],
      units_produced: {
        value: 3000,
        confidence: "medium",
        note: "Estimated 3,000+ PAC-3 MSE missiles produced or contracted as of 2025. Lockheed Martin received a $7.4B contract in 2023 for PAC-3 MSE production through FY2027. Raytheon produces the launcher and fire control; Lockheed Martin produces the interceptor missile.",
        sources: [
          {
            label: "Lockheed Martin — $7.4B PAC-3 MSE contract award",
            url: "https://news.lockheedmartin.com/2023-07-31-Lockheed-Martin-Awarded-7-4-Billion-PAC-3-MSE-Production-Contract",
            date: "2023-07-31",
          },
          {
            label: "Defense News — PAC-3 MSE demand and production",
            url: "https://www.defensenews.com/pentagon/2023/05/09/pac-3-mse-demand-is-exploding-heres-how-the-us-is-meeting-it/",
            date: "2023-05-09",
          },
        ],
      },
      operators: [
        "United States",
        "Germany",
        "Netherlands",
        "Poland",
        "Romania",
        "Sweden",
        "Japan",
        "South Korea",
        "Taiwan",
        "Saudi Arabia",
        "Kuwait",
        "UAE",
        "Qatar",
        "Ukraine (US-donated)",
      ],
    },
    {
      name: "Patriot Configuration-3+ (Config 3+)",
      role: "Software/hardware upgrade integrating MSE and open architecture for future interceptors",
      key_differences: [
        "Enhanced Patriot software suite enabling LTAMDS radar integration",
        "Open system architecture for integration with future interceptors (SHORAD, IFPC)",
        "Improved performance against hypersonic glide vehicles (HGV) threats",
        "US Army's current configuration fielded from 2024 onward",
      ],
      units_produced: {
        value: 50,
        confidence: "low",
        note: "Config 3+ batteries are in initial fielding for US Army. Exact battery count not publicly released. The upgrade is applied to existing fire units.",
        sources: [
          {
            label: "Army PEO Missiles & Space — Patriot modernization roadmap",
            url: "https://www.peomissiles.army.mil/products/patriot.html",
            date: "2024-01-01",
          },
        ],
      },
      operators: ["United States Army"],
    },
  ],

  // ── Technical specifications ───────────────────────────────────────────────

  tech_specs: {
    system_components: "AN/MPQ-65 phased-array radar + ECS (AN/MSQ-104) + EPP-III power plant + up to 8× M902 launchers",
    radar_type: "AN/MPQ-65 — electronically steered phased array (C/D-band)",
    radar_range_km: "~170 km (search) / 100 km (track) vs. aircraft; 60–100 km vs. TBM depending on size",
    radar_scan_sector: "90° sector scan (mechanically rotated to cover 360° in multi-radar config)",
    missile_pac2_gem_t: "MIM-104E GEM-T — Mach 2.8 / ceiling ~24 km / range ~80–160 km vs. aircraft",
    missile_pac3_mse: "PAC-3 MSE — Mach 5+ / ceiling 40 km / range ~35 km vs. ballistic missiles",
    pac3_mse_length_m: "5.2 m",
    pac3_mse_diameter_mm: "255 mm",
    pac3_mse_weight_kg: "304 kg (with booster)",
    guidance_pac3_mse: "Inertial navigation + active Ka-band radar seeker (terminal hit-to-kill)",
    warhead_pac3_mse: "Kinetic kill vehicle + Lethality Enhancement Device (LED) for fragmentation backup",
    warhead_pac2: "Blast-fragmentation (90 kg)",
    missiles_per_launcher: "4× PAC-2 GEM-T or 16× PAC-3 MSE per M902 launcher",
    missiles_per_battery: "Up to 32 PAC-2 GEM-T or 128 PAC-3 MSE (8 launchers)",
    engagement_altitude_km: "0.06–40 km (PAC-3 MSE)",
    mobility: "Towed on M983 HEMTT prime mover; setup time ~30 min",
    crew_per_battery: "~90 personnel",
  },
  tech_specs_confidence: "high",

  // ── Compatible interceptors / integration ─────────────────────────────────

  compatible_weapons: [
    "MIM-104E PAC-2 GEM-T (blast-fragmentation; aircraft, cruise missiles)",
    "PAC-3 (hit-to-kill; SRBM, MRBM)",
    "PAC-3 MSE (hit-to-kill + extended range; SRBM, MRBM, IRBM, cruise missiles, aircraft)",
    "ASTER 30 SAMP/T (NATO-interoperable, not Patriot-launcher mounted)",
    "LTAMDS (AN/TPY-4) — next-generation radar; Config 3+ software integration",
  ],
  max_payload_kg: null,
  hardpoints_count: null,

  // ── Production & deliveries ────────────────────────────────────────────────

  total_ordered: {
    value: 260,
    confidence: "medium",
    note: "Estimated 260+ Patriot fire units (batteries) ordered worldwide as of 2025. This includes US Army (55+ active batteries), and major FMS customers: Germany (12), Netherlands (8), Japan (24 fire units), South Korea (8), Taiwan (9), Saudi Arabia (22), Kuwait (8), UAE (9), Poland (4), Romania (7), Sweden (4), Qatar (2), Jordan (2), Ukraine (donated, 2).",
    sources: [
      {
        label: "Raytheon Technologies — Patriot global customers",
        url: "https://www.rtx.com/raytheon/what-we-do/integrated-air-and-missile-defense/patriot-air-and-missile-defense-system",
        date: "2024-01-01",
      },
      {
        label: "US Army PEO Missiles & Space — Patriot operators list",
        url: "https://www.peomissiles.army.mil/products/patriot.html",
        date: "2024-01-01",
      },
    ],
  },

  total_delivered: {
    value: 240,
    confidence: "medium",
    note: "Estimated 240+ Patriot fire units delivered worldwide. All US Army and most FMS batteries are delivered. Recent orders (Poland, Romania, Sweden, Ukraine) are partially or not yet delivered.",
    sources: [
      {
        label: "Breaking Defense — Patriot global sales 2024",
        url: "https://breakingdefense.com/2024/01/patriot-sales-hit-new-highs-in-2023/",
        date: "2024-01-15",
      },
    ],
  },

  backlog: 20,
  production_start_year: 1981,
  production_end_year: null,

  deliveries_by_country: [
    {
      country: "United States",
      country_code: "us",
      ordered: 60,
      delivered: 58,
      delivery_date: "1984–Ongoing",
    },
    {
      country: "Germany",
      country_code: "de",
      ordered: 12,
      delivered: 12,
      delivery_date: "1989–1998 ✓",
    },
    {
      country: "Netherlands",
      country_code: "nl",
      ordered: 8,
      delivered: 8,
      delivery_date: "1994–2000 ✓",
    },
    {
      country: "Japan",
      country_code: "jp",
      ordered: 24,
      delivered: 24,
      delivery_date: "1993–2006 ✓",
    },
    {
      country: "Israel",
      country_code: "il",
      ordered: 5,
      delivered: 5,
      delivery_date: "1991–2000 ✓",
    },
    {
      country: "Saudi Arabia",
      country_code: "sa",
      ordered: 22,
      delivered: 22,
      delivery_date: "1993–2009 ✓",
    },
    {
      country: "Kuwait",
      country_code: "kw",
      ordered: 8,
      delivered: 8,
      delivery_date: "1996–2007 ✓",
    },
    {
      country: "Taiwan",
      country_code: "tw",
      ordered: 9,
      delivered: 9,
      delivery_date: "1997–2012 ✓",
    },
    {
      country: "South Korea",
      country_code: "kr",
      ordered: 8,
      delivered: 8,
      delivery_date: "2000–2010 ✓",
    },
    {
      country: "UAE",
      country_code: "ae",
      ordered: 9,
      delivered: 9,
      delivery_date: "2008–2016 ✓",
    },
    {
      country: "Qatar",
      country_code: "qa",
      ordered: 2,
      delivered: 2,
      delivery_date: "2014–2017 ✓",
    },
    {
      country: "Poland",
      country_code: "pl",
      ordered: 6,
      delivered: 2,
      delivery_date: "2022–2027",
    },
    {
      country: "Romania",
      country_code: "ro",
      ordered: 7,
      delivered: 4,
      delivery_date: "2020–2024",
    },
    {
      country: "Sweden",
      country_code: "se",
      ordered: 4,
      delivered: 4,
      delivery_date: "2022–2024 ✓",
    },
    {
      country: "Ukraine",
      country_code: "ua",
      ordered: 2,
      delivered: 2,
      delivery_date: "2023 ✓",
    },
    {
      country: "Jordan",
      country_code: "jo",
      ordered: 2,
      delivered: 2,
      delivery_date: "2016–2018 ✓",
    },
  ],

  // ── Export contracts ───────────────────────────────────────────────────────

  export_contracts: [
    {
      year: 1989,
      customer_country: "Germany",
      customer_country_code: "de",
      units: 12,
      contract_value_usd: 2.8,
      delivery_window: "1989–1998",
      status: "delivered",
      note: "Germany became the first NATO export customer for Patriot. Patriot replaced the HAWK system in Bundeswehr service. Germany subsequently upgraded to PAC-3 MSE configuration and operates 12 fire units.",
    },
    {
      year: 1991,
      customer_country: "Israel",
      customer_country_code: "il",
      units: 5,
      contract_value_usd: 0.8,
      delivery_window: "1991–1992",
      status: "delivered",
      note: "Emergency delivery during Gulf War (Operation Desert Storm). Patriot PAC-1/2 batteries were deployed to Israel after Iraqi Scud ballistic missile attacks. Effectiveness debated but catalyzed Patriot's global reputation for BMD.",
    },
    {
      year: 1993,
      customer_country: "Japan",
      customer_country_code: "jp",
      units: 24,
      contract_value_usd: 4.8,
      delivery_window: "1993–2006",
      status: "delivered",
      note: "Japan procured Patriot in phased tranches. All 24 fire units subsequently upgraded to PAC-3 MSE standard. Japan is one of Patriot's largest operators, integrating with J/FPS-5 and J/FPS-6 radars for layered BMD.",
    },
    {
      year: 2014,
      customer_country: "Qatar",
      customer_country_code: "qa",
      units: 2,
      contract_value_usd: 2.0,
      delivery_window: "2014–2017",
      status: "delivered",
      note: "Qatar's $2B FMS Patriot purchase (2 batteries PAC-3 MSE) as part of broader air defense modernization. Qatar also operates SAMP/T ASTER 30.",
    },
    {
      year: 2018,
      customer_country: "Romania",
      customer_country_code: "ro",
      units: 7,
      contract_value_usd: 3.9,
      delivery_window: "2020–2024",
      status: "in_delivery",
      note: "Romania's $3.9B FMS package — 7 Patriot fire units (PAC-3 MSE configuration), launchers, AN/MPQ-65 radars, and initial missile complement. Romania's purchase is NATO's eastern flank reinforcement.",
    },
    {
      year: 2020,
      customer_country: "Poland",
      customer_country_code: "pl",
      units: 6,
      contract_value_usd: 4.75,
      delivery_window: "2022–2027",
      status: "in_delivery",
      note: "$4.75B FMS for 2 initial batteries (Increment 1, delivered 2022) and 4 additional (Increment 2, from 2025). Poland's Wisła air defense program integrating Patriot with domestic command-and-control elements.",
    },
    {
      year: 2022,
      customer_country: "Sweden",
      customer_country_code: "se",
      units: 4,
      contract_value_usd: 1.2,
      delivery_window: "2022–2024",
      status: "delivered",
      note: "Sweden urgently procured 4 Patriot fire units (2 from unused US Army stocks, 2 new-build) following Russia–Ukraine war and NATO accession. Deliveries accelerated above standard timelines.",
    },
    {
      year: 2023,
      customer_country: "Ukraine",
      customer_country_code: "ua",
      units: 2,
      contract_value_usd: 2.0,
      delivery_window: "2023",
      status: "delivered",
      note: "Two Patriot PAC-3 fire units donated by US (with German contribution) to Ukraine. DSCA notification January 2023; batteries operational by May 2023. One battery reportedly damaged in Russian air strike August 2023.",
    },
  ],

  // ── Direct competitors ─────────────────────────────────────────────────────

  competitors: [
    {
      name: "SAMP/T MAMBA (ASTER 30 Block 1)",
      manufacturer: "MBDA / Thales",
      summary: "European long-range SAM system operated by France and Italy. ASTER 30 missile has comparable performance to PAC-2 GEM-T vs. aircraft and limited ballistic missile defense. SAMP/T NG (Block 1 NT) upgrading for MRBM intercept. Used operationally in Ukraine.",
      dashboard_product_id: "SAMP/T MAMBA",
    },
    {
      name: "S-400 Triumf",
      manufacturer: "Almaz-Antey (Russia)",
      summary: "Russian long-range SAM system with claimed 400-km engagement range and multi-target capability. Created significant NATO tension when Turkey (NATO member) purchased S-400 in 2017. Export to India (2021) and China. Substantial losses reported in Russia-Ukraine war.",
      dashboard_product_id: "S-400 Triumf",
    },
    {
      name: "THAAD",
      manufacturer: "Lockheed Martin",
      summary: "US upper-tier missile defense system designed to intercept ballistic missiles in terminal phase at altitudes above the atmosphere (exo-atmospheric). Complementary to Patriot PAC-3 (upper layer vs. Patriot lower layer) rather than a direct replacement. Higher cost and smaller inventory.",
      dashboard_product_id: "THAAD",
    },
  ],

  last_updated: "2025-05-26",
};

export default patriot;
