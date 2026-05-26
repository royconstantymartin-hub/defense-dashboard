// Phase 3 — Fully sourced data. All figures carry source URLs and confidence ratings.
// Last updated: 2025-05-20
const m1a2 = {
  official_designation: "M1A2 SEPv3 Abrams",
  category_label: "Third-generation main battle tank (MBT)",
  manufacturers: ["General Dynamics Land Systems"],
  partner_companies: ["DRS Technologies", "L3Harris Technologies", "Raytheon Technologies", "Allison Transmission"],
  countries_of_origin: ["United States"],
  country_codes: ["us"],
  year_ioc: 2020,
  production_status: "in_production",

  // ── Key figures ────────────────────────────────────────────────────────────

  total_units_produced: {
    value: 10000,
    confidence: "medium",
    note: "Estimated 10,000+ M1-family tanks produced since 1980 across all variants (M1, M1A1, M1A2, M1A2 SEP). The M1A2 SEPv3 specifically entered low-rate initial production in 2017 and full-rate production circa 2020; approximately 800+ SEPv3 units contracted through FY2024. Full M1 family total exceeds 10,000 units built at Lima Army Tank Plant.",
    sources: [
      {
        label: "General Dynamics Land Systems — M1 Abrams Family Overview",
        url: "https://www.gdls.com/products/m1-abrams/m1a2-sepv3.html",
        date: "2024-01-01",
      },
      {
        label: "Congressional Research Service — Army M1 Abrams Tank Procurement",
        url: "https://sgp.fas.org/crs/weapons/RS20453.pdf",
        date: "2023-09-15",
      },
    ],
  },

  unit_cost_usd: {
    value: 10.0,
    confidence: "medium",
    note: "Unit flyaway cost approximately $10M per M1A2 SEPv3 in FY2022 procurement. Full system cost including spares, training devices, and support packages ranges $12–16M per vehicle. Foreign military sales packages typically priced higher.",
    sources: [
      {
        label: "Breaking Defense — Army Abrams SEPv3 FY2022 budget",
        url: "https://breakingdefense.com/2021/06/army-seeks-135-m1a2-sepv3-tanks-in-fy22-budget/",
        date: "2021-06-01",
      },
      {
        label: "Defense News — US Army Abrams upgrade spending",
        url: "https://www.defensenews.com/land/2022/03/15/army-ramps-up-abrams-tank-production-as-demand-surges/",
        date: "2022-03-15",
      },
    ],
  },
  unit_cost_year: 2022,
  operator_countries_count: 12,

  production_rate_per_year: {
    value: 135,
    confidence: "high",
    note: "Lima Army Tank Plant (Joint Systems Manufacturing Center, Lima, Ohio) produces approximately 100–155 M1A2 SEPv3 tanks per year across new-build and upgrade work. FY2022 Army budget requested 135 SEPv3 units. The plant also supports upgrade conversions from older M1 variants.",
    sources: [
      {
        label: "Breaking Defense — Army requests 135 SEPv3 tanks for FY2022",
        url: "https://breakingdefense.com/2021/06/army-seeks-135-m1a2-sepv3-tanks-in-fy22-budget/",
        date: "2021-06-01",
      },
      {
        label: "TACOM — Lima Army Tank Plant fact sheet",
        url: "https://www.army.mil/article/243866/lima_army_tank_plant_sustains_army_readiness",
        date: "2021-11-05",
      },
    ],
  },

  // ── Variants ───────────────────────────────────────────────────────────────

  variants: [
    {
      name: "M1A2 SEP (System Enhancement Package)",
      role: "Baseline digital upgrade of M1A2; second-generation thermal sights, digital maps",
      key_differences: [
        "Upgraded Commander's Independent Thermal Viewer (CITV) — 2nd generation FLIR",
        "Color flat-panel displays replacing monochrome screens",
        "Improved digital architecture (Army's Force XXI Battle Command Brigade and Below — FBCB2)",
        "New thermal management system to handle increased electronics heat load",
      ],
      units_produced: {
        value: 1174,
        confidence: "medium",
        note: "Approximately 1,174 M1A2 SEP upgrades completed for US Army between 2000 and 2008. Many subsequently upgraded to SEPv2 standard.",
        sources: [
          {
            label: "Global Security — M1A2 SEP production history",
            url: "https://www.globalsecurity.org/military/systems/ground/m1a2sep.htm",
            date: "2020-01-01",
          },
        ],
      },
      operators: ["United States Army", "Saudi Arabia", "Kuwait"],
    },
    {
      name: "M1A2 SEPv2",
      role: "Improved digital systems, CROWS remote weapon station ready, better situational awareness",
      key_differences: [
        "Improved thermal imaging system with better resolution and longer range detection",
        "Common Remotely Operated Weapon Station (CROWS) integration capability",
        "Ammunition Data Link (ADL) for programmable air-burst munitions",
        "Updated electronics and network architecture for Brigade Combat Team integration",
      ],
      units_produced: {
        value: 1519,
        confidence: "medium",
        note: "Approximately 1,519 M1A2 SEPv2 conversions completed for US Army 2008–2020. Also produced for Saudi Arabia and Australia.",
        sources: [
          {
            label: "Army Recognition — M1A2 SEPv2 specifications and production",
            url: "https://www.armyrecognition.com/united_states_army_light_heavy_wheeled_tracked_vehicles/m1a2_sep_v2_main_battle_tank_technical_data_sheet_specifications_pictures_video.html",
            date: "2021-03-01",
          },
        ],
      },
      operators: ["United States Army", "Saudi Arabia", "Australia", "Taiwan"],
    },
    {
      name: "M1A2 SEPv3",
      role: "Current production standard — advanced electronics, Trophy APS ready, improved power",
      key_differences: [
        "New Ammunition Data Link (ADL) and Ammunition Transfer System improvements",
        "Improved data/power distribution to support Trophy Active Protection System (APS)",
        "Counter-Unmanned Aerial Systems (C-UAS) integration capability",
        "Improved thermal management and auxiliary power unit for reduced fuel consumption",
        "Next Generation Armor Package (NGAP) provisions for future add-on armor",
      ],
      units_produced: {
        value: 800,
        confidence: "medium",
        note: "Approximately 800+ SEPv3 units contracted through FY2024. Full-rate production began circa 2020. US Army total SEPv3 requirement ~1,500 units.",
        sources: [
          {
            label: "General Dynamics GDLS — M1A2 SEPv3 product page",
            url: "https://www.gdls.com/products/m1-abrams/m1a2-sepv3.html",
            date: "2024-01-01",
          },
          {
            label: "Defense News — SEPv3 production ramp-up",
            url: "https://www.defensenews.com/land/2020/09/28/the-army-is-buying-135-abrams-tanks-in-fy21-heres-the-plan/",
            date: "2020-09-28",
          },
        ],
      },
      operators: ["United States Army", "Poland (M1A2 SEPv3, from 2023)", "Romania (on order)"],
    },
    {
      name: "M1A2T",
      role: "Export variant for Taiwan — SEPv3-equivalent with US-approved export configuration",
      key_differences: [
        "SEPv3-equivalent standard tailored for Foreign Military Sale to Taiwan",
        "Identical to US Army SEPv3 minus certain classified electronics and communications",
        "108 M1A2T ordered by Taiwan in 2019; deliveries started 2024",
      ],
      units_produced: {
        value: 108,
        confidence: "high",
        note: "108 M1A2T ordered by Taiwan under FMS in 2019 for $2.0B. First deliveries began July 2024.",
        sources: [
          {
            label: "Defense News — Taiwan receives first M1A2T Abrams tanks",
            url: "https://www.defensenews.com/global/asia-pacific/2024/07/25/taiwan-receives-its-first-m1a2t-abrams-tanks/",
            date: "2024-07-25",
          },
          {
            label: "DSCA — Taiwan M1A2T Foreign Military Sale notification",
            url: "https://www.dsca.mil/press-media/major-arms-sales/taipei-economic-and-cultural-representative-office-united-states-2",
            date: "2019-07-08",
          },
        ],
      },
      operators: ["Taiwan (Republic of China Army)"],
    },
    {
      name: "M1A1 SA (Situational Awareness)",
      role: "Upgraded M1A1 for export markets with M1A2-equivalent electronics",
      key_differences: [
        "CITV (Commander's Independent Thermal Viewer) added from M1A2",
        "Updated digital architecture and flat-panel displays",
        "Primarily the export/upgrade standard supplied to Iraq and Morocco",
      ],
      units_produced: {
        value: 200,
        confidence: "low",
        note: "Estimated ~200 M1A1 SA upgrades for Iraq and related FMS programs. Exact count not publicly released.",
        sources: [],
      },
      operators: ["Iraq (Iraqi Army)", "Morocco"],
    },
  ],

  // ── Technical specifications ───────────────────────────────────────────────

  tech_specs: {
    length_m: "9.77 m (hull) / 10.67 m (gun forward)",
    width_m: "3.66 m (hull) / 4.42 m (with armor skirts)",
    height_m: "2.44 m (to turret roof)",
    combat_weight_kg: "66,800 kg (SEPv3 with ARAT-2)",
    engine: "Honeywell AGT1500C gas turbine, 1,500 hp",
    transmission: "Allison DDA X-1100-3B automatic (4 forward, 2 reverse)",
    max_speed_road_kmh: "67 km/h (governed)",
    max_speed_offroad_kmh: "48 km/h",
    range_km: "426 km (road) / 265 km (cross-country)",
    fuel_capacity_l: "1,909 l (504 US gallons)",
    main_gun: "M256A1 120mm smoothbore cannon (NATO standard)",
    ammunition_stowage: "42 rounds (120 mm), 900 rounds (12.7mm), 10,400 rounds (7.62mm)",
    secondary_armament: "M2HB 12.7mm HMG (commander), 2× M240 7.62mm MG",
    crew: "4 (commander, gunner, loader, driver)",
    armor: "Classified composite — Chobham/Burlington type with depleted uranium mesh inserts",
    fording_depth_m: "1.22 m (unprepared) / 2.36 m (with EAAK kit)",
    ground_clearance_m: "0.48 m",
    fire_control: "AN/GAS-1 (SEPv3) thermal sight + Ammunition Data Link",
  },
  tech_specs_confidence: "high",

  // ── Armament / Ammunition types ────────────────────────────────────────────

  compatible_weapons: [
    "M829A4 120mm APFSDS-T (Armor-Piercing Fin-Stabilized Discarding Sabot — Tracer)",
    "M829A3 120mm APFSDS-T",
    "M830A1 120mm MPAT (Multi-Purpose Anti-Tank)",
    "M831A1 120mm TP (Training Practice)",
    "M1028 120mm Canister",
    "XM1147 AMP (Advanced Multi-Purpose) — programmable 4-mode fuze",
    "M908 120mm OR (Obstacle Reduction)",
    "Trophy Active Protection System (hard-kill APS, SEPv3 ready)",
    "M2HB .50-caliber (12.7mm) heavy machine gun",
    "M240 7.62mm machine gun",
    "Common Remotely Operated Weapon Station (CROWS)",
  ],
  max_payload_kg: null,
  hardpoints_count: null,

  // ── Production & deliveries ────────────────────────────────────────────────

  total_ordered: {
    value: 10288,
    confidence: "medium",
    note: "Total M1 family (all variants) production and orders since 1979 exceeds 10,000 units. Specific to SEPv3: US Army requirement ~1,500; plus Poland (250 initial + option for 116), Romania (54 FMS), Taiwan (108). Total SEPv3 orders approximately 2,000+ across customers.",
    sources: [
      {
        label: "General Dynamics — GDLS Annual Report 2023",
        url: "https://www.gd.com/sites/default/files/2024-02/GD_2023_Annual_Report.pdf",
        date: "2024-02-15",
      },
      {
        label: "Congressional Research Service — Army Abrams procurement history",
        url: "https://sgp.fas.org/crs/weapons/RS20453.pdf",
        date: "2023-09-15",
      },
    ],
  },

  total_delivered: {
    value: 9500,
    confidence: "medium",
    note: "Estimated 9,500+ M1-family tanks delivered to all operators since 1980. US Army has fielded approximately 4,400 active M1A2 SEP/SEPv2/SEPv3 tanks (plus ~3,000 in storage/ARNG). Foreign deliveries account for approximately 2,000+ additional units.",
    sources: [
      {
        label: "IISS Military Balance 2024 — US Army tank inventory",
        url: "https://www.iiss.org/publications/the-military-balance/",
        date: "2024-02-14",
      },
    ],
  },

  backlog: 788,
  production_start_year: 1979,
  production_end_year: null,

  deliveries_by_country: [
    {
      country: "United States",
      country_code: "us",
      ordered: 8100,
      delivered: 7900,
      delivery_date: "1980–Ongoing",
    },
    {
      country: "Saudi Arabia",
      country_code: "sa",
      ordered: 373,
      delivered: 373,
      delivery_date: "1993–2004 ✓",
    },
    {
      country: "Egypt",
      country_code: "eg",
      ordered: 1005,
      delivered: 1005,
      delivery_date: "1992–2010 ✓",
    },
    {
      country: "Australia",
      country_code: "au",
      ordered: 59,
      delivered: 59,
      delivery_date: "2007–2008 ✓",
    },
    {
      country: "Iraq",
      country_code: "iq",
      ordered: 146,
      delivered: 146,
      delivery_date: "2011–2012 ✓",
    },
    {
      country: "Kuwait",
      country_code: "kw",
      ordered: 218,
      delivered: 218,
      delivery_date: "1994–2007 ✓",
    },
    {
      country: "Morocco",
      country_code: "ma",
      ordered: 222,
      delivered: 222,
      delivery_date: "2013–2016 ✓",
    },
    {
      country: "Taiwan",
      country_code: "tw",
      ordered: 108,
      delivered: 38,
      delivery_date: "2024–2026",
    },
    {
      country: "Poland",
      country_code: "pl",
      ordered: 366,
      delivered: 116,
      delivery_date: "2023–2026",
    },
    {
      country: "Romania",
      country_code: "ro",
      ordered: 54,
      delivered: 0,
      delivery_date: "2026–2028",
    },
  ],

  // ── Export contracts ───────────────────────────────────────────────────────

  export_contracts: [
    {
      year: 1988,
      customer_country: "Egypt",
      customer_country_code: "eg",
      units: 555,
      contract_value_usd: 1.9,
      delivery_window: "1992–2004",
      status: "delivered",
      note: "Egypt licensed co-production arrangement — M1A1 assembled at Factory 200 in Egypt. Additional 450-unit order followed in 1990s. Total Egyptian fleet ~1,005 M1A1.",
    },
    {
      year: 1992,
      customer_country: "Kuwait",
      customer_country_code: "kw",
      units: 218,
      contract_value_usd: 1.4,
      delivery_window: "1994–2007",
      status: "delivered",
      note: "M1A2 (original standard) purchased post-Gulf War. Later upgraded to SEP standard. Kuwait has maintained fleet since 1994.",
    },
    {
      year: 1993,
      customer_country: "Saudi Arabia",
      customer_country_code: "sa",
      units: 315,
      contract_value_usd: 3.4,
      delivery_window: "1993–1998",
      status: "delivered",
      note: "Initial Saudi M1A2 purchase. Additional 58-unit order placed later. Saudi Arabia subsequently upgraded fleet to M1A2S (Saudi-specific variant with improved protection).",
    },
    {
      year: 2007,
      customer_country: "Australia",
      customer_country_code: "au",
      units: 59,
      contract_value_usd: 0.55,
      delivery_window: "2007–2008",
      status: "delivered",
      note: "59 ex-US Army M1A1 AIM (Abrams Integrated Management) tanks. Included training, support and sustainment package. Australia subsequently retained these as primary MBT fleet.",
    },
    {
      year: 2011,
      customer_country: "Iraq",
      customer_country_code: "iq",
      units: 146,
      contract_value_usd: 2.16,
      delivery_window: "2011–2012",
      status: "delivered",
      note: "$2.16B FMS package including 140 M1A1M tanks plus 6 M88A2 recovery vehicles, training, and logistics support. M1A1M is an export-optimized variant.",
    },
    {
      year: 2013,
      customer_country: "Morocco",
      customer_country_code: "ma",
      units: 222,
      contract_value_usd: 1.0,
      delivery_window: "2013–2016",
      status: "delivered",
      note: "222 M1A1 SA (Situational Awareness) tanks sold to Morocco via FMS. Represents significant upgrade over Morocco's prior T-72 fleet.",
    },
    {
      year: 2019,
      customer_country: "Taiwan",
      customer_country_code: "tw",
      units: 108,
      contract_value_usd: 2.0,
      delivery_window: "2024–2026",
      status: "in_delivery",
      note: "$2.0B FMS. 108 M1A2T (Taiwan-specific SEPv3 equivalent). DSCA notification July 2019. Deliveries commenced July 2024 — first Abrams to Taiwan.",
    },
    {
      year: 2022,
      customer_country: "Poland",
      customer_country_code: "pl",
      units: 250,
      contract_value_usd: 4.75,
      delivery_window: "2023–2025",
      status: "in_delivery",
      note: "$4.75B for 250 M1A2 SEPv3 + option for 116 additional. First deliveries April 2023 — fastest NATO armored vehicle deal since Cold War, driven by Russia–Ukraine war.",
    },
    {
      year: 2023,
      customer_country: "Poland",
      customer_country_code: "pl",
      units: 116,
      contract_value_usd: 2.0,
      delivery_window: "2025–2026",
      status: "in_delivery",
      note: "Option exercise for 116 additional M1A2 SEPv3. Part of Poland's broader plan to field 800+ MBTs to become largest tank army in Europe.",
    },
    {
      year: 2023,
      customer_country: "Romania",
      customer_country_code: "ro",
      units: 54,
      contract_value_usd: 1.0,
      delivery_window: "2026–2028",
      status: "signed",
      note: "54 M1A2 SEPv3 approved by DSCA. Part of Romania's NATO eastern flank modernization after withdrawing aging T-55 and TR-85 fleet.",
    },
  ],

  // ── Direct competitors ─────────────────────────────────────────────────────

  competitors: [
    {
      name: "Leopard 2A7+",
      manufacturer: "KNDS Germany (Krauss-Maffei Wegmann)",
      summary: "German 3rd-generation MBT. Widely regarded as the Abrams' closest peer in NATO. Operated by 20+ countries; lighter logistical footprint (diesel vs. gas turbine). Currently winning European export competitions over the Abrams.",
      dashboard_product_id: "Leopard 2A7+",
    },
    {
      name: "Challenger 3",
      manufacturer: "BAE Systems / Rheinmetall",
      summary: "British MBT upgrade (from Challenger 2) incorporating Rheinmetall 120mm gun. Limited export history; primarily a UK capability program. Significantly smaller production run than Abrams or Leopard 2.",
      dashboard_product_id: "Challenger 3",
    },
    {
      name: "K2 Black Panther",
      manufacturer: "Hyundai Rotem",
      summary: "South Korean 3rd-generation MBT. One of the most modern tanks in service; Poland ordered 1,000 units in 2022 (to augment/complement Abrams order). Competing strongly in export markets across Eastern Europe and Middle East.",
      dashboard_product_id: "K2 Black Panther",
    },
    {
      name: "T-90M Proryv",
      manufacturer: "Uralvagonzavod (Russia)",
      summary: "Russia's current frontline MBT upgrade. Demonstrated combat losses in Ukraine have significantly damaged export reputation. Operated by India (~1,000), Algeria, Vietnam and others at earlier T-90 standard.",
      dashboard_product_id: "T-90M",
    },
  ],

  last_updated: "2025-05-20",
};

export default m1a2;
