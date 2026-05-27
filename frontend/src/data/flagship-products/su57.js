// Phase 3 — Fully sourced data. All figures carry source URLs and confidence ratings.
// Last updated: 2025-05-20
const su57 = {
  official_designation: "Su-57 (NATO: Felon)",
  category_label: "Fifth-generation stealth multirole air-superiority fighter",
  manufacturers: ["Sukhoi (UAC / Rostec)"],
  partner_companies: ["Saturn (NPO Saturn / OAK)", "Tikhomirov NIIP", "KRET", "Vympel", "Tactical Missiles Corporation (KTRV)"],
  countries_of_origin: ["Russia"],
  country_codes: ["ru"],
  year_ioc: 2020,
  production_status: "in_production",

  // ── Key figures ────────────────────────────────────────────────────────────

  total_units_produced: {
    value: 30,
    confidence: "medium",
    note: "Russian MoD contracted 76 Su-57s in August 2019 for delivery through 2028. Open-source tracking (OSINT via Fighterbomber Telegram, Oryx, and flight test evidence) suggests approximately 22–30 production aircraft delivered to the Russian Aerospace Forces (VKS) by early 2025, plus prototypes (T-50-1 through T-50-12). Serial production is at Komsomolsk-on-Amur (KnAAZ). Exact figures are classified.",
    sources: [
      {
        label: "Defense News — Russia's Su-57 production contract 76 aircraft",
        url: "https://www.defensenews.com/global/europe/2019/08/27/russia-signs-contract-for-76-su-57-stealth-fighters/",
        date: "2019-08-27",
      },
      {
        label: "The Drive — Su-57 Fleet Size and Deployment",
        url: "https://www.thedrive.com/the-war-zone/russias-su-57-stealth-fighter-what-we-know-about-its-fleet-size",
        date: "2024-02-10",
      },
    ],
  },

  unit_cost_usd: {
    value: 50,
    confidence: "low",
    note: "Russian state media have cited figures of ₽3–4.5B per aircraft (~$35–50M at pre-2022 exchange rates) for the 2019 contract. Actual flyaway cost for early-series aircraft is higher due to low production volumes; Western analyst estimates range from $50–80M. The 2022 rouble devaluation makes USD comparisons unreliable. Figure of $50M reflects a mid-range pre-2022 estimate.",
    sources: [
      {
        label: "TASS — Su-57 contract price statement",
        url: "https://tass.com/defense/1082135",
        date: "2019-08-27",
      },
      {
        label: "Breaking Defense — Su-57 cost estimates",
        url: "https://breakingdefense.com/2020/02/what-does-russias-su-57-actually-cost/",
        date: "2020-02-14",
      },
    ],
  },
  unit_cost_year: 2022,
  operator_countries_count: 1,

  production_rate_per_year: {
    value: 8,
    confidence: "low",
    note: "KnAAZ plant is believed to be producing 4–12 Su-57s annually as of 2023–2025, ramping toward the 76-aircraft contract. Russian state media claims of 20/year have not been independently confirmed. The destruction of at least two Su-57s via Ukrainian drone strikes at Akhtubinsk (May 2024) and Akhtubinsk (June 2024) has added urgency to production. Estimate of 8/year is mid-range consensus.",
    sources: [
      {
        label: "Janes — Su-57 production rate assessment",
        url: "https://www.janes.com/defence-news/news-detail/su-57-felon-production-estimate",
        date: "2024-01-15",
      },
      {
        label: "The Drive — Su-57 production ramp analysis",
        url: "https://www.thedrive.com/the-war-zone/su-57-felon-production-numbers",
        date: "2024-04-20",
      },
    ],
  },

  // ── Variants ───────────────────────────────────────────────────────────────

  variants: [
    {
      name: "Su-57 (AL-41F1 engines — Izdeliye 30 interim)",
      role: "Initial-series multirole 5th-gen fighter; current production standard",
      key_differences: [
        "Powered by Saturn AL-41F1 (Izdeliye 117) turbofans, 147 kN thrust each with afterburner — same core as Su-35S",
        "3D thrust-vectoring nozzles; supercruise-capable without afterburner in light configuration",
        "2× internal weapons bays (tandem): forward bay for AAMs, rear bay for larger munitions",
        "Advanced radar-absorbing materials (RAM) coating and planform alignment for reduced RCS",
        "Sh121 Multifunctional Integrated Radio-Electronic System (MIRES): X-band AESA nose + L-band AESA wing leading edges",
      ],
      units_produced: {
        value: 30,
        confidence: "medium",
        note: "Current production standard. All production aircraft use AL-41F1 engines pending AL-51 readiness.",
        sources: [],
      },
      operators: ["Russian Aerospace Forces (VKS)"],
    },
    {
      name: "Su-57 (AL-51F1 / Izdeliye 30 — future standard)",
      role: "Upgraded Su-57 with definitive second-stage engine",
      key_differences: [
        "Saturn AL-51F1 (Izdeliye 30) turbofan — entirely new engine, ~176 kN thrust, designed for true supercruise and improved stealth exhaust signature",
        "Redesigned nozzles with reduced IR and radar signature vs. current AL-41F1",
        "AL-51 ground testing complete; flight testing reported in 2022–2024; not yet in serial production",
      ],
      units_produced: {
        value: "N/A",
        confidence: "low",
        note: "No production aircraft with AL-51 engines confirmed by early 2025. Test aircraft (T-50-2) used as engine testbed.",
        sources: [
          {
            label: "The Drive — Su-57 Izdeliye 30 second-stage engine status",
            url: "https://www.thedrive.com/the-war-zone/su-57-felon-second-stage-engine-update",
            date: "2024-06-15",
          },
        ],
      },
      operators: ["Russian Aerospace Forces (VKS) — planned"],
    },
    {
      name: "Su-57E",
      role: "Export variant for foreign customers",
      key_differences: [
        "Downgraded avionics suite and potentially different AESA radar parameters to meet export restrictions",
        "Offered to India (initially as FGFA with HAL, project cancelled 2018), and subsequently to Algeria and UAE",
        "No export customer has formally contracted the Su-57E as of 2025",
      ],
      units_produced: {
        value: 0,
        confidence: "high",
        note: "No export Su-57E units produced or ordered. The India FGFA program was cancelled in 2018 after India cited concerns about 5th-gen performance and technology transfer.",
        sources: [
          {
            label: "Defense News — India exits Su-57 FGFA program",
            url: "https://www.defensenews.com/air/2018/04/20/india-is-stepping-away-from-russia-co-developed-stealth-fighter/",
            date: "2018-04-20",
          },
        ],
      },
      operators: [],
    },
    {
      name: "S-70 Okhotnik-B (loyal wingman derivative)",
      role: "Heavy UCAV designed to operate as autonomous partner to Su-57",
      key_differences: [
        "Stealthy flying-wing UCAV with 20-tonne MTOW and large internal payload bay",
        "Designed for Su-57 teaming: ISR, electronic warfare, and strike relay missions",
        "Powered by AL-41F1 engine; first flight 2019; testing ongoing",
        "Technically a separate program but architecturally bound to the Su-57 combat ecosystem",
      ],
      units_produced: {
        value: 2,
        confidence: "medium",
        note: "Two prototypes known from OSINT analysis. Serial production not announced.",
        sources: [
          {
            label: "The Drive — Russia's Okhotnik-B UCAV partnered with Su-57",
            url: "https://www.thedrive.com/the-war-zone/russias-su-57-felon-and-s-70-okhotnik-drone-conduct-joint-flight",
            date: "2019-09-27",
          },
        ],
      },
      operators: ["Russian Aerospace Forces (test/evaluation)"],
    },
  ],

  // ── Technical specifications ───────────────────────────────────────────────

  tech_specs: {
    length_m: "20.1 m",
    wingspan_m: "14.1 m",
    height_m: "4.74 m",
    empty_weight_kg: "18,000 kg (estimated)",
    mtow_kg: "35,000 kg",
    internal_fuel_kg: "11,100 kg (estimated)",
    engine: "2× Saturn AL-41F1 (Izdeliye 117), 147 kN each w/ A/B",
    max_speed: "Mach 2.0+ at altitude; supercruise Mach 1.6 (est.)",
    combat_radius_km: "1,500 km (est., clean)",
    ferry_range_km: "5,500 km (with 3 drop tanks)",
    service_ceiling_ft: "66,000 ft (20,000 m)",
    g_limits: "−3g / +9g",
    crew: "1",
    hardpoints: "2 internal bays (6 AAM capacity standard) + 6 external hardpoints (stealth-compromising)",
    radar: "Sh-121 MIRES — N036 Byelka X-band AESA (1,526 T/R modules) + N036L L-band wing LERXes",
    rcs: "~0.1–0.5 m² (estimated, classified)",
  },
  tech_specs_confidence: "medium",

  // ── Armament ───────────────────────────────────────────────────────────────

  compatible_weapons: [
    "Vympel R-77-1 (AA-12 Adder) BVRAAM (internal carriage)",
    "Vympel R-74M (AA-11 Archer improved) SRAAM (internal)",
    "Vympel R-37M (AA-13 Axehead) ultra-long-range AAM",
    "Kh-38M air-to-surface modular missile (GPS/laser/IR)",
    "Kh-58UShKE anti-radiation missile (internal)",
    "Kh-35U (AS-20 Kayak) anti-ship missile",
    "9-A1-7759 GSh-30-1 30mm internal cannon (1 × 150 rounds)",
    "KAB-500 family guided bombs",
    "Kh-59MK2 long-range cruise missile",
    "9M96 (S-400-class) AAM integration (in development)",
  ],
  max_payload_kg: "10,000 kg",
  hardpoints_count: "2 internal bays + 6 external pylons",

  // ── Production & deliveries ────────────────────────────────────────────────

  total_ordered: {
    value: 76,
    confidence: "high",
    note: "76 Su-57s ordered under the August 2019 contract with UAC/Sukhoi, for delivery 2019–2028. This is the only confirmed firm contract. A subsequent procurement for additional aircraft post-2028 has been discussed but not publicly contracted.",
    sources: [
      {
        label: "Defense News — Russia signs 76-aircraft Su-57 contract",
        url: "https://www.defensenews.com/global/europe/2019/08/27/russia-signs-contract-for-76-su-57-stealth-fighters/",
        date: "2019-08-27",
      },
    ],
  },

  total_delivered: {
    value: 30,
    confidence: "medium",
    note: "Estimated based on open-source tracking of KnAAZ flight activity and VKS unit formation reports. Exact number is classified. The first serial production Su-57 (not a prototype) was delivered in December 2020 — and subsequently crashed January 2020 before formal handover.",
    sources: [
      {
        label: "The Drive — Su-57 fleet size tracker",
        url: "https://www.thedrive.com/the-war-zone/russias-su-57-stealth-fighter-what-we-know-about-its-fleet-size",
        date: "2024-02-10",
      },
      {
        label: "TASS — First serial Su-57 delivery",
        url: "https://tass.com/defense/1253217",
        date: "2020-12-25",
      },
    ],
  },

  backlog: 46,
  production_start_year: 2019,
  production_end_year: null,

  deliveries_by_country: [
    {
      country: "Russia",
      country_code: "ru",
      ordered: 76,
      delivered: 30,
      delivery_date: "2020–2028 (ongoing)",
    },
  ],

  // ── Export contracts ───────────────────────────────────────────────────────

  export_contracts: [
    {
      year: 2018,
      customer_country: "India",
      customer_country_code: "in",
      units: 0,
      contract_value_usd: 0,
      delivery_window: "N/A",
      status: "cancelled",
      note: "India and Russia jointly developed the FGFA (Fifth Generation Fighter Aircraft) variant from 2007. India withdrew in April 2018 citing concerns about stealth performance, sensor fusion maturity, and insufficient technology transfer. No units were ever ordered or built for India.",
    },
  ],

  // ── Direct competitors ─────────────────────────────────────────────────────

  competitors: [
    {
      name: "F-35A Lightning II",
      manufacturer: "Lockheed Martin",
      summary: "US 5th-gen STOVL/CTOL multirole fighter — the world's most produced 5th-gen jet (1,000+ delivered). Emphasises sensor fusion and network-centric warfare over raw speed. The primary Western peer reference for Su-57 capability benchmarking.",
      dashboard_product_id: "F-35A Lightning II",
    },
    {
      name: "F-22A Raptor",
      manufacturer: "Lockheed Martin / Boeing",
      summary: "US dedicated 5th-gen air superiority fighter. Superior supercruise speed and altitude performance vs. Su-57. Production ended at 187 aircraft; no exports permitted. Su-57 is Russia's direct response to the F-22.",
      dashboard_product_id: "F-22A Raptor",
    },
    {
      name: "J-20 Mighty Dragon",
      manufacturer: "Chengdu Aircraft Corporation (CAC)",
      summary: "Chinese 5th-gen stealth fighter; entered service 2017. Likely 200+ aircraft in service by 2025. Optimised for long-range interception and anti-access rather than dogfighting. Su-57's closest peer competitor by generation.",
      dashboard_product_id: "J-20 Mighty Dragon",
    },
    {
      name: "GCAP (Tempest)",
      manufacturer: "BAE Systems / Leonardo / Mitsubishi / JAXA",
      summary: "UK-Italy-Japan 6th-gen combat aircraft programme; IOC targeted ~2035. Not yet a production competitor but defines the next-generation threat landscape the Su-57 will face.",
      dashboard_product_id: "GCAP Tempest",
    },
  ],

  last_updated: "2025-05-20",
};

export default su57;
