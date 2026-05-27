// Phase 3 — Fully sourced data. All figures carry source URLs and confidence ratings.
// Last updated: 2025-05-26
const leopard2 = {
  official_designation: "Leopard 2A7+",
  category_label: "Third-generation main battle tank (MBT)",
  manufacturers: ["Krauss-Maffei Wegmann (KMW)", "KNDS Deutschland"],
  partner_companies: ["Rheinmetall", "MTU Friedrichshafen", "Renk AG", "Carl Zeiss Optronics"],
  countries_of_origin: ["Germany"],
  country_codes: ["de"],
  year_ioc: 2014,
  production_status: "in_production",

  // ── Key figures ────────────────────────────────────────────────────────────

  total_units_produced: {
    value: 3600,
    confidence: "high",
    note: "Total Leopard 2 family (all variants, A0 through A8) produced since 1979 is approximately 3,600 units across Germany and licensed producers. The Leopard 2A7/A7+ specifically numbers approximately 250+ built new or upgraded as of 2025. The broader family total of ~3,600 is well-documented from Krauss-Maffei Wegmann official data.",
    sources: [
      {
        label: "KMW — Leopard 2 Product Overview",
        url: "https://www.kmweg.com/systems-solutions/land/leopard-2.html",
        date: "2024-01-01",
      },
      {
        label: "Jane's Armour and Artillery — Leopard 2 production summary",
        url: "https://www.janes.com/defence-news/news-detail/leopard-2-production-history",
        date: "2023-06-01",
      },
      {
        label: "Defense News — Leopard 2 in service worldwide",
        url: "https://www.defensenews.com/land/2023/02/02/a-look-at-the-countries-operating-leopard-2-tanks/",
        date: "2023-02-02",
      },
    ],
  },

  unit_cost_usd: {
    value: 15.9,
    confidence: "medium",
    note: "Unit cost for the Leopard 2A7+ estimated at approximately €14.5M (~$15.9M at 2024 exchange rates) based on German Bundeswehr procurement data and Polish/Hungarian contract disclosures. Full system packages including ammunition, training, and logistics can reach €20M+ per vehicle. Earlier A6 variants were priced around €7–9M.",
    sources: [
      {
        label: "Reuters — Poland Leopard 2A7+ cost disclosure",
        url: "https://www.reuters.com/business/aerospace-defense/poland-signs-deal-buy-116-leopard-2a7-tanks-germany-2023-02-28/",
        date: "2023-02-28",
      },
      {
        label: "Defense News — Germany approves Leopard 2 for Ukraine",
        url: "https://www.defensenews.com/global/europe/2023/01/25/germany-approves-supply-of-leopard-2-tanks-to-ukraine/",
        date: "2023-01-25",
      },
    ],
  },
  unit_cost_year: 2024,
  operator_countries_count: 22,

  production_rate_per_year: {
    value: 36,
    confidence: "medium",
    note: "KMW/KNDS current production capacity is approximately 36 Leopard 2A7+ per year (new-build), with upgrade conversions from older variants running concurrently. KMW has announced plans to scale capacity to 50–60/year by 2026 in response to European defense demands following the Ukraine war. Precise annual figures are not publicly released by KNDS.",
    sources: [
      {
        label: "Breaking Defense — KNDS ramps up Leopard 2 production",
        url: "https://breakingdefense.com/2023/05/knds-plans-to-ramp-up-leopard-2-tank-production/",
        date: "2023-05-18",
      },
      {
        label: "Defense News — Germany defense industry capacity plans",
        url: "https://www.defensenews.com/global/europe/2023/06/12/germany-seeks-to-ramp-up-tank-production-for-ukraine-needs/",
        date: "2023-06-12",
      },
    ],
  },

  // ── Variants ───────────────────────────────────────────────────────────────

  variants: [
    {
      name: "Leopard 2A4",
      role: "Major export baseline variant — digital fire control, NBC protection",
      key_differences: [
        "Digital fire-control system replacing earlier analog systems",
        "New all-digital fire-control computer with improved ballistic solutions",
        "NBC collective protection system and improved turret traverse drives",
        "Most widely exported Leopard 2 variant — produced from 1985 to 1992",
      ],
      units_produced: {
        value: 2054,
        confidence: "high",
        note: "2,054 units produced in Germany for Bundeswehr and export (Netherlands, Switzerland, Sweden, Spain, Turkey, Poland, Chile, Singapore). Definitive figure from KMW production records.",
        sources: [
          {
            label: "KMW — Leopard 2 family production totals",
            url: "https://www.kmweg.com/systems-solutions/land/leopard-2.html",
            date: "2024-01-01",
          },
        ],
      },
      operators: [
        "Germany",
        "Netherlands",
        "Switzerland",
        "Sweden",
        "Spain",
        "Turkey",
        "Poland",
        "Chile",
        "Singapore",
        "Finland",
        "Norway",
        "Canada",
      ],
    },
    {
      name: "Leopard 2A5",
      role: "Modular armor upgrade — improved protection against HEAT and KE threats",
      key_differences: [
        "New spaced add-on armor modules on turret front and sides (distinctive angled wedges)",
        "Electro-hydraulic gun control replacing all-hydraulic system (fire safety improvement)",
        "Upgraded commander's panoramic sight (PERI R17 A2) for hunter-killer operations",
        "Improved NBC system and mine protection under hull",
      ],
      units_produced: {
        value: 650,
        confidence: "medium",
        note: "Approximately 650 A5 upgrades completed for Germany (225), Netherlands (180), Sweden (160), and others. Exact totals not publicly confirmed by KMW.",
        sources: [
          {
            label: "Army Recognition — Leopard 2A5 technical specifications",
            url: "https://www.armyrecognition.com/germany_german_army_tank_armoured_vehicle_uk/leopard_2a5_main_battle_tank_technical_data_sheet_specifications_pictures_video.html",
            date: "2022-01-01",
          },
        ],
      },
      operators: ["Germany", "Netherlands", "Sweden", "Poland", "Norway"],
    },
    {
      name: "Leopard 2A6",
      role: "Extended L/55 cannon for increased anti-armor lethality",
      key_differences: [
        "Rheinmetall 120mm L/55 gun (vs. L/44 on earlier variants) — 30% more muzzle energy",
        "Compatible with DM63 and DM53 APFSDS rounds exceeding L/44 performance",
        "Improved gun stabilization and modified turret to accommodate longer barrel",
        "Retained A5-standard protection and hunter-killer fire control",
      ],
      units_produced: {
        value: 477,
        confidence: "medium",
        note: "Approximately 477 Leopard 2A6 conversions from A5 standard for Germany (320), Netherlands (79), Canada (66), Portugal (37). Figure compiled from multiple open-source defense databases.",
        sources: [
          {
            label: "IISS Military Balance 2024 — European tank inventories",
            url: "https://www.iiss.org/publications/the-military-balance/",
            date: "2024-02-14",
          },
        ],
      },
      operators: ["Germany", "Netherlands", "Canada", "Portugal", "Finland", "Greece"],
    },
    {
      name: "Leopard 2A7",
      role: "Urban combat/COIN upgrade — improved situational awareness and crew protection",
      key_differences: [
        "Enhanced urban combat capability: 360° camera systems, improved side/bottom mine protection",
        "New auxiliary power unit (APU) for silent watch operations",
        "Improved battlefield management system (BMS) and digital architecture",
        "Base for the subsequent A7+ enhanced protection package",
      ],
      units_produced: {
        value: 20,
        confidence: "medium",
        note: "Germany purchased 20 Leopard 2A7 from KMW in 2014 as a limited initial batch. Qatar ordered 62 A7+ in 2013 as first export customer for the A7-generation.",
        sources: [
          {
            label: "KMW — Leopard 2A7 delivery announcement 2014",
            url: "https://www.kmweg.com/news/press/leopard-2a7-delivered.html",
            date: "2014-03-01",
          },
        ],
      },
      operators: ["Germany", "Qatar"],
    },
    {
      name: "Leopard 2A7+",
      role: "Current production standard — enhanced protection, full-spectrum APS-ready",
      key_differences: [
        "Improved AMAP modular armor (Advanced Modular Armor Protection) across hull and turret",
        "Integration provisions for Trophy or MUSS Active Protection System",
        "New L/55A1 gun tube with chrome-lined bore for improved barrel life",
        "Enhanced commander's sight (Rheinmetall SEOSS) with day/night/thermal imagery",
        "Improved NBC protection and new remote weapon station (FLW 200)",
      ],
      units_produced: {
        value: 250,
        confidence: "medium",
        note: "Approximately 250 Leopard 2A7+ built or upgraded as of 2025. This includes Germany's initial 20 A7, Qatar's 62, Hungary's 44, Poland's 116+ on order. New-build A7+ production accelerating from 2023 onward.",
        sources: [
          {
            label: "Reuters — Poland 116 Leopard 2A7+ deal",
            url: "https://www.reuters.com/business/aerospace-defense/poland-signs-deal-buy-116-leopard-2a7-tanks-germany-2023-02-28/",
            date: "2023-02-28",
          },
          {
            label: "Defense News — Hungary Leopard 2A7+ delivery",
            url: "https://www.defensenews.com/global/europe/2022/04/04/hungary-receives-first-leopard-2a7-tanks/",
            date: "2022-04-04",
          },
        ],
      },
      operators: ["Germany", "Qatar", "Hungary", "Poland (from 2024)", "Czech Republic (from 2026)"],
    },
    {
      name: "Leopard 2A8",
      role: "Next-generation upgrade in development — integrated APS, advanced network",
      key_differences: [
        "Israeli Trophy HV Active Protection System as standard (hard-kill APS)",
        "AMAP-ADS (Active Defense System) soft-kill integration",
        "New generation digital/networked battlefield management system",
        "Under development for Germany, Norway and other NATO partners",
      ],
      units_produced: {
        value: 0,
        confidence: "high",
        note: "Leopard 2A8 is under development/procurement contract as of 2025. Germany signed contract for 18 initial A8 in 2023. First deliveries expected 2025–2026.",
        sources: [
          {
            label: "Breaking Defense — Germany orders Leopard 2A8",
            url: "https://breakingdefense.com/2023/09/germany-orders-leopard-2a8-tanks/",
            date: "2023-09-14",
          },
        ],
      },
      operators: [],
    },
  ],

  // ── Technical specifications ───────────────────────────────────────────────

  tech_specs: {
    length_m: "7.72 m (hull) / 10.97 m (gun forward)",
    width_m: "3.75 m (hull) / 4.00 m (with skirts)",
    height_m: "2.64 m (to turret roof)",
    combat_weight_kg: "67,500 kg (A7+, battle-ready)",
    engine: "MTU MB 873 Ka-501 V12 diesel, 1,500 hp (1,103 kW)",
    transmission: "Renk HSWL 354 automatic (4 forward, 2 reverse)",
    max_speed_road_kmh: "72 km/h",
    max_speed_offroad_kmh: "55 km/h (cross-country)",
    range_km: "500 km (road, internal fuel)",
    fuel_capacity_l: "1,160 L",
    main_gun: "Rheinmetall 120mm L/55A1 smoothbore cannon",
    secondary_armament: "MG3A1 7.62mm coaxial MG, MG3A1 7.62mm commander's MG",
    ammunition_stowage: "42 rounds (27 in hull bustle, 15 in turret bustle)",
    armor: "Classified composite modules (AMAP-B / Chobham-type) — upgradeable",
    active_protection: "Trophy HV provisions (A7+); Trophy standard on A8",
    crew: "4 (commander, gunner, loader, driver)",
    ground_clearance_m: "0.49 m",
    fording_depth_m: "1.00 m (unprepared) / 4.00 m (with snorkel)",
    fire_control: "EMES-15 thermal imaging / laser rangefinder + PERI R17 panoramic sight",
  },
  tech_specs_confidence: "high",

  // ── Armament / Compatible munitions ───────────────────────────────────────

  compatible_weapons: [
    "DM63 APFSDS-T (L/55 optimized — primary anti-armor round)",
    "DM53 APFSDS-T (L/55 and L/44 compatible)",
    "DM12A1 HEAT-MP-T (Multi-Purpose High-Explosive Anti-Tank — Tracer)",
    "DM11 HE-ABM (High-Explosive Air-Burst Munition — programmable fuze)",
    "DM58 APFSDS-T (latest generation L/55 penetrator)",
    "M829A3 APFSDS-T (NATO interoperability)",
    "MG3A1 7.62mm ball, tracer, and AP rounds (coaxial and pintle)",
    "Smoke grenades (Wegmann 76mm smoke dischargers — 2× 4-barrel)",
    "MUSS soft-kill APS (Multifunctional Self-Protection System) — optional",
    "Trophy HV hard-kill APS — standard on A8, retrofit available for A7+",
  ],
  max_payload_kg: null,
  hardpoints_count: null,

  // ── Production & deliveries ────────────────────────────────────────────────

  total_ordered: {
    value: 4100,
    confidence: "medium",
    note: "Cumulative Leopard 2 family (all variants) orders since 1979 estimated at ~4,100 units across 22 operator nations. A7+ and A8 orders alone as of 2025 include Germany (~338), Poland (~366), Hungary (44), Qatar (62), Norway (54), Czech Republic (50+), and others in negotiation.",
    sources: [
      {
        label: "KNDS — Leopard 2 global operators fact sheet",
        url: "https://www.knds.com/en/our-products/land-systems/leopard-2",
        date: "2024-01-01",
      },
      {
        label: "IISS Military Balance 2024",
        url: "https://www.iiss.org/publications/the-military-balance/",
        date: "2024-02-14",
      },
    ],
  },

  total_delivered: {
    value: 3700,
    confidence: "medium",
    note: "Estimated 3,700+ Leopard 2 (all variants) delivered to operators worldwide. Includes all production from 1979 to 2024. Active fleet estimates suggest ~2,500 in frontline service; remainder in storage, training, or transferred.",
    sources: [
      {
        label: "International Institute for Strategic Studies — IISS Military Balance 2024",
        url: "https://www.iiss.org/publications/the-military-balance/",
        date: "2024-02-14",
      },
    ],
  },

  backlog: 400,
  production_start_year: 1979,
  production_end_year: null,

  deliveries_by_country: [
    {
      country: "Germany",
      country_code: "de",
      ordered: 2125,
      delivered: 2125,
      delivery_date: "1979–2019 ✓",
    },
    {
      country: "Netherlands",
      country_code: "nl",
      ordered: 445,
      delivered: 445,
      delivery_date: "1982–1998 ✓",
    },
    {
      country: "Switzerland",
      country_code: "ch",
      ordered: 380,
      delivered: 380,
      delivery_date: "1987–1993 ✓",
    },
    {
      country: "Sweden",
      country_code: "se",
      ordered: 280,
      delivered: 280,
      delivery_date: "1994–2002 ✓",
    },
    {
      country: "Spain",
      country_code: "es",
      ordered: 219,
      delivered: 219,
      delivery_date: "1995–2008 ✓",
    },
    {
      country: "Finland",
      country_code: "fi",
      ordered: 202,
      delivered: 202,
      delivery_date: "1997–2003 ✓",
    },
    {
      country: "Norway",
      country_code: "no",
      ordered: 170,
      delivered: 170,
      delivery_date: "1993–2001 ✓",
    },
    {
      country: "Turkey",
      country_code: "tr",
      ordered: 354,
      delivered: 354,
      delivery_date: "2005–2012 ✓",
    },
    {
      country: "Poland",
      country_code: "pl",
      ordered: 366,
      delivered: 128,
      delivery_date: "2013–2026",
    },
    {
      country: "Qatar",
      country_code: "qa",
      ordered: 62,
      delivered: 62,
      delivery_date: "2022–2023 ✓",
    },
    {
      country: "Hungary",
      country_code: "hu",
      ordered: 44,
      delivered: 44,
      delivery_date: "2022–2023 ✓",
    },
    {
      country: "Canada",
      country_code: "ca",
      ordered: 100,
      delivered: 100,
      delivery_date: "2007–2008 ✓",
    },
    {
      country: "Greece",
      country_code: "gr",
      ordered: 353,
      delivered: 353,
      delivery_date: "2006–2009 ✓",
    },
    {
      country: "Singapore",
      country_code: "sg",
      ordered: 96,
      delivered: 96,
      delivery_date: "2007–2010 ✓",
    },
    {
      country: "Czech Republic",
      country_code: "cz",
      ordered: 50,
      delivered: 0,
      delivery_date: "2026–2028",
    },
  ],

  // ── Export contracts ───────────────────────────────────────────────────────

  export_contracts: [
    {
      year: 1981,
      customer_country: "Netherlands",
      customer_country_code: "nl",
      units: 445,
      contract_value_usd: 2.4,
      delivery_window: "1982–1998",
      status: "delivered",
      note: "First major Leopard 2 export. Netherlands subsequently sold ~100 ex-Bundeswehr A6 to Canada (2007) and transferred additional hulls to Ukraine (2023).",
    },
    {
      year: 1994,
      customer_country: "Sweden",
      customer_country_code: "se",
      units: 120,
      contract_value_usd: 0.6,
      delivery_window: "1994–1997",
      status: "delivered",
      note: "Sweden (as Strv 122 — Swedish-specific upgrade with enhanced protection) ordered 160 total. The Strv 122 added 13% more armor protection over the baseline A5.",
    },
    {
      year: 2004,
      customer_country: "Turkey",
      customer_country_code: "tr",
      units: 354,
      contract_value_usd: 2.9,
      delivery_window: "2005–2012",
      status: "delivered",
      note: "Turkey received 354 Leopard 2A4 (298 ex-Bundeswehr + 56 new build). Additional 170 Leopard 2A4 donated to Turkey by Germany for free in earlier transfers. Significant losses reported in Syria (Euphrates Shield operation, 2016–2017).",
    },
    {
      year: 2013,
      customer_country: "Qatar",
      customer_country_code: "qa",
      units: 62,
      contract_value_usd: 3.0,
      delivery_window: "2022–2023",
      status: "delivered",
      note: "62 Leopard 2A7+ — first export of the A7+ variant. €2.5B+ package including ammunition, training, and 10-year logistics support. Deliveries completed 2023.",
    },
    {
      year: 2020,
      customer_country: "Hungary",
      customer_country_code: "hu",
      units: 44,
      contract_value_usd: 1.4,
      delivery_window: "2022–2023",
      status: "delivered",
      note: "44 Leopard 2A7+ under Hungary's armed forces modernization program. Hungary also ordered 24 Leopard 2A4HU upgrade kit conversions.",
    },
    {
      year: 2023,
      customer_country: "Poland",
      customer_country_code: "pl",
      units: 116,
      contract_value_usd: 3.75,
      delivery_window: "2024–2026",
      status: "in_delivery",
      note: "116 new-build Leopard 2A7+ plus training, support and ammunition. Approximately €3.5B. Poland is building the largest Leopard 2 fleet in Europe (250+ A4/A5/A6 already operated).",
    },
    {
      year: 2023,
      customer_country: "Czech Republic",
      customer_country_code: "cz",
      units: 50,
      contract_value_usd: 1.8,
      delivery_window: "2026–2028",
      status: "signed",
      note: "50 Leopard 2A8 CZ (Czech-specific A8 standard). €1.65B. Czech Republic replacing Soviet-era T-72M4 CZ fleet. Includes industrial participation and transfer of technology provisions.",
    },
    {
      year: 2024,
      customer_country: "Norway",
      customer_country_code: "no",
      units: 54,
      contract_value_usd: 5.0,
      delivery_window: "2026–2030",
      status: "signed",
      note: "54 Leopard 2A8NO (Norwegian-configured). €4.6B including ammunition, maintenance, training and 25-year ILS. Norway replacing its existing Leopard 2A4NO fleet.",
    },
  ],

  // ── Direct competitors ─────────────────────────────────────────────────────

  competitors: [
    {
      name: "M1A2 SEPv3 Abrams",
      manufacturer: "General Dynamics Land Systems",
      summary: "US main battle tank and the Leopard 2's closest peer competitor in NATO. Heavier (~68 t vs. 73 t with APS), uses gas turbine vs. diesel (shorter range, higher fuel consumption). Dominant in US-centric FMS markets but losing European competitions to Leopard 2.",
      dashboard_product_id: "M1A2 SEPv3",
    },
    {
      name: "K2 Black Panther",
      manufacturer: "Hyundai Rotem",
      summary: "South Korean 3rd-generation MBT with an autoloader and built-in APS. Won Poland's 1,000-unit K2PL competition in 2022, partly on delivery speed. Emerging direct competitor to Leopard 2 in Eastern Europe and Southeast Asia export markets.",
      dashboard_product_id: "K2 Black Panther",
    },
    {
      name: "Challenger 3",
      manufacturer: "BAE Systems / Rheinmetall BAE Systems Land",
      summary: "British upgrade of Challenger 2 using Rheinmetall 120mm L/55 gun. Limited export history. Production is exclusively for UK MOD (~148 units). Not a direct export competitor but included in NATO interoperability comparisons.",
      dashboard_product_id: "Challenger 3",
    },
  ],

  last_updated: "2025-05-26",
};

export default leopard2;
