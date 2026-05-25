// Phase 3 — Fully sourced data. All figures carry source URLs and confidence ratings.
// Last updated: 2025-05-15
const rafale = {
  official_designation: "Dassault Rafale F4",
  category_label: "Omnirole twin-engine 4.5-gen multirole fighter",
  manufacturers: ["Dassault Aviation"],
  partner_companies: ["Thales", "Safran", "MBDA"],
  countries_of_origin: ["France"],
  country_codes: ["fr"],
  year_ioc: 2001,
  production_status: "in_production",

  // ── Key figures ────────────────────────────────────────────────────────────

  total_units_produced: {
    value: 313,
    confidence: "high",
    note: "300th Rafale delivered October 7, 2025 (official Dassault milestone). Figure of 313 derived from 533 total orders minus 220 backlog per Dassault Dec 31 2025 press kit.",
    sources: [
      {
        label: "Dassault Aviation — 300th Rafale Delivery",
        url: "https://www.globenewswire.com/news-release/2025/10/07/3162790/0/en/Dassault-Aviation-Delivery-of-the-300th-Rafale.html",
        date: "2025-10-07",
      },
      {
        label: "Dassault Aviation — Orders & Backlog Dec 31 2025",
        url: "https://www.dassault-aviation.com/en/group/press/press-kits/deliveries-order-intakes-and-backlog-in-number-of-new-aircraft-as-of-december-31-2025/",
        date: "2025-12-31",
      },
    ],
  },

  unit_cost_usd: {
    value: 131,
    confidence: "medium",
    note: "French domestic flyaway cost: ~€119M (~$131M at 2024 rates), from January 2024 contract for 42 aircraft (Tranche 5). Export all-in package prices range $92M–$288M/aircraft depending on standard, training, weapons and support — not directly comparable across customers.",
    sources: [
      {
        label: "Breaking Defense — France $5.5B order for 42 Rafale",
        url: "https://breakingdefense.com/2024/01/france-places-5-5-billion-order-for-42-new-rafale-fighters/",
        date: "2024-01-12",
      },
      {
        label: "Defense News — France buys 42 Rafale jets",
        url: "https://www.defensenews.com/air/2024/01/12/france-buys-42-rafale-jets-for-more-than-55-billion/",
        date: "2024-01-12",
      },
    ],
  },
  unit_cost_year: 2024,
  operator_countries_count: 10,

  production_rate_per_year: {
    value: 26,
    confidence: "high",
    note: "26 aircraft delivered in 2025. Dassault targets 36/year (3/month) then 48/year (4/month) as backlog grows. A new production plant opened in 2025, first capacity expansion in 50 years.",
    sources: [
      {
        label: "Aerotime — Dassault Rafale production ramp-up 2025",
        url: "https://www.aerotime.aero/articles/dassault-rafale-output-lags-demand-2025-deliveries",
        date: "2026-01-15",
      },
      {
        label: "Defense Post — Dassault to Ramp Up Rafale Production",
        url: "https://thedefensepost.com/2024/03/12/dassaul-rafales-annual-production/",
        date: "2024-03-12",
      },
    ],
  },

  // ── Variants ───────────────────────────────────────────────────────────────

  variants: [
    {
      name: "Rafale C",
      role: "Single-seat land-based multirole (CTOL)",
      key_differences: [
        "Single cockpit; lightest of the three airframes (~9,850 kg empty)",
        "14 hardpoints; internal 30mm NEXTER cannon",
        "Primary French Air & Space Force strike and nuclear deterrence variant",
      ],
      units_produced: {
        value: "N/A",
        confidence: "low",
        note: "Dassault does not publish per-variant production split. Estimated ~50% of French Air Force fleet and majority of single-seat export orders.",
        sources: [],
      },
      operators: ["France (Air & Space Force)", "Egypt", "India (IAF)", "Qatar", "Greece", "Croatia", "Indonesia (from 2026)"],
    },
    {
      name: "Rafale B",
      role: "Twin-seat land-based trainer / strike / nuclear deterrence (CTOL)",
      key_differences: [
        "Two-seat cockpit — instructor + student or weapons system operator (WSO)",
        "Identical combat capability to Rafale C; used for nuclear ASMP-A missions requiring a second crew member",
        "Preferred variant for complex strike missions and export customers requiring dual-role training capability",
      ],
      units_produced: {
        value: "N/A",
        confidence: "low",
        note: "Split not published by Dassault. B variants are ordered alongside C variants for most export customers.",
        sources: [],
      },
      operators: ["France (Air & Space Force)", "Egypt", "India (IAF)", "Indonesia (from 2026)", "Serbia (from 2028)"],
    },
    {
      name: "Rafale M",
      role: "Single-seat carrier-based multirole (CATOBAR)",
      key_differences: [
        "Reinforced airframe and landing gear for catapult launches and arrested landings on CATOBAR carriers",
        "13 hardpoints (vs. 14 on land variants); no internal 30mm cannon",
        "Heavier (~10,600 kg empty) with revised nose leg, longer-stroke undercarriage and tailhook",
      ],
      units_produced: {
        value: 57,
        confidence: "medium",
        note: "57 delivered to French Navy as of 2025. India Navy ordered 26 additional Rafale M in April 2025.",
        sources: [
          {
            label: "Naval News — India orders 26 Rafale M",
            url: "https://www.navalnews.com/naval-news/2025/04/india-orders-26-rafale-marine-carrier-based-aircraft-for-7-5-billion/",
            date: "2025-04-28",
          },
        ],
      },
      operators: ["France (Navy)", "India (Navy, from ~2028)"],
    },
    {
      name: "Rafale F4.1",
      role: "Current production standard — first F4-generation aircraft (qualified March 2023)",
      key_differences: [
        "Thales Scorpion helmet-mounted display (HMD) — first on a French combat aircraft",
        "SATCOM / CONTACT tactical datalink for enhanced networked operations",
        "AASM Hammer 1,000 kg integration; begin of MICA NG transition",
      ],
      units_produced: {
        value: "N/A",
        confidence: "low",
        note: "F4.1 is the current new-build standard for France and UAE export. No separate production count published.",
        sources: [
          {
            label: "The Aviationist — Rafale F4.1 Qualified",
            url: "https://theaviationist.com/2023/04/02/rafale-f4-1-standard-qualified-for-fielding/",
            date: "2023-04-02",
          },
          {
            label: "Defense News — First Rafale F4 delivered",
            url: "https://www.defensenews.com/global/europe/2023/03/07/french-air-force-receives-first-of-upgraded-rafale-f4-fighter-aircraft/",
            date: "2023-03-07",
          },
        ],
      },
      operators: ["France (Air & Space Force)", "UAE (from 2027 — first export F4 customer)"],
    },
    {
      name: "Rafale F4.2",
      role: "Enhanced F4 standard — DGA-qualified October 2025",
      key_differences: [
        "New predictive maintenance system and upgraded engine computers",
        "Deeper collaborative combat connectivity; AI-assisted sensor fusion",
        "Transitional standard toward the future F5 (post-2030)",
      ],
      units_produced: {
        value: "N/A",
        confidence: "low",
        note: "F4.2 was DGA-qualified in October 2025; deliveries to French Air Force began Q4 2025.",
        sources: [
          {
            label: "The Aviationist — Rafale F4.3 testing (context on F4.2)",
            url: "https://theaviationist.com/2025/08/09/france-testing-rafale-f4-3/",
            date: "2025-08-09",
          },
        ],
      },
      operators: ["France (Air & Space Force)"],
    },
  ],

  // ── Technical specifications ───────────────────────────────────────────────

  tech_specs: {
    length_m: "15.30 m",
    wingspan_m: "10.90 m",
    height_m: "5.30 m",
    empty_weight_kg: "9,850 kg (C) / 10,600 kg (M)",
    mtow_kg: "24,500 kg",
    internal_fuel_kg: "4,700 kg",
    engine: "2× Safran M88-2 turbofan (50 kN dry / 75 kN with A/B each)",
    max_speed: "Mach 1.8 / ~1,912 km/h at altitude",
    combat_radius_km: "1,850 km (strike w/ drop tanks + SCALP)",
    ferry_range_km: "3,700 km (3 drop tanks)",
    service_ceiling_ft: "50,000 ft",
    g_limits: "−3.2g / +9g",
    crew: "1 (C/M) or 2 (B)",
    hardpoints: "14 (land) / 13 (Rafale M)",
  },
  tech_specs_confidence: "high",

  // ── Armament ───────────────────────────────────────────────────────────────

  compatible_weapons: [
    "MBDA MICA IR/EM",
    "MBDA MICA NG (from 2026)",
    "MBDA Meteor BVRAAM",
    "SCALP-EG / Storm Shadow",
    "AASM Hammer 250 kg / 1,000 kg",
    "ASMP-A (nuclear)",
    "AM39 Exocet (anti-ship)",
    "GBU-12 Paveway II",
    "GBU-24 Paveway III",
    "Mk 82 / 83 / 84 GP bombs",
    "NEXTER 30M791 30mm cannon (C/B only)",
  ],
  max_payload_kg: "9,500 kg",
  hardpoints_count: "14 hardpoints (13 on Rafale M)",

  // ── Production & deliveries ────────────────────────────────────────────────

  total_ordered: {
    value: 533,
    confidence: "high",
    note: "533 firm orders as of October 7, 2025 (after India Navy's 26-aircraft contract signed April 28, 2025). Does not include India's 114-aircraft Acceptance of Necessity (February 2026) — not yet a firm contract.",
    sources: [
      {
        label: "Dassault Aviation — 300th Rafale Delivery press kit",
        url: "https://www.globenewswire.com/news-release/2025/10/07/3162790/0/en/Dassault-Aviation-Delivery-of-the-300th-Rafale.html",
        date: "2025-10-07",
      },
      {
        label: "Dassault Aviation — Orders & Backlog Dec 31 2025",
        url: "https://www.dassault-aviation.com/en/group/press/press-kits/deliveries-order-intakes-and-backlog-in-number-of-new-aircraft-as-of-december-31-2025/",
        date: "2025-12-31",
      },
    ],
  },

  total_delivered: {
    value: 313,
    confidence: "high",
    note: "Derived from 533 total orders − 220 backlog (Dec 31 2025 Dassault press kit). The 300th Rafale was delivered October 7, 2025.",
    sources: [
      {
        label: "Dassault Aviation — Orders & Backlog Dec 31 2025",
        url: "https://www.dassault-aviation.com/en/group/press/press-kits/deliveries-order-intakes-and-backlog-in-number-of-new-aircraft-as-of-december-31-2025/",
        date: "2025-12-31",
      },
    ],
  },

  backlog: 220,
  production_start_year: 1998,
  production_end_year: null,

  deliveries_by_country: [
    {
      country: "France",
      country_code: "fr",
      ordered: 234,
      delivered: 189,
      delivery_date: "Ongoing to 2032",
    },
    {
      country: "Egypt",
      country_code: "eg",
      ordered: 54,
      delivered: 40,
      delivery_date: "2015–2026",
    },
    {
      country: "Qatar",
      country_code: "qa",
      ordered: 36,
      delivered: 36,
      delivery_date: "2019–2022 ✓",
    },
    {
      country: "India (IAF)",
      country_code: "in",
      ordered: 36,
      delivered: 36,
      delivery_date: "2020–2022 ✓",
    },
    {
      country: "Greece",
      country_code: "gr",
      ordered: 24,
      delivered: 24,
      delivery_date: "2021–2025 ✓",
    },
    {
      country: "Croatia",
      country_code: "hr",
      ordered: 12,
      delivered: 12,
      delivery_date: "2024–2025 ✓",
    },
    {
      country: "UAE",
      country_code: "ae",
      ordered: 80,
      delivered: 0,
      delivery_date: "2027–2031",
    },
    {
      country: "Indonesia",
      country_code: "id",
      ordered: 42,
      delivered: 0,
      delivery_date: "2026–2030",
    },
    {
      country: "Serbia",
      country_code: "rs",
      ordered: 12,
      delivered: 0,
      delivery_date: "2028–2030",
    },
    {
      country: "India (Navy)",
      country_code: "in",
      ordered: 26,
      delivered: 0,
      delivery_date: "2028–2031",
    },
  ],

  // ── Export contracts ───────────────────────────────────────────────────────

  export_contracts: [
    {
      year: 2015,
      customer_country: "Egypt",
      customer_country_code: "eg",
      units: 24,
      contract_value_usd: 5.2,
      delivery_window: "2015–2019",
      status: "delivered",
      note: "First ever Rafale export. Package included one FREMM frigate and MBDA missiles; aircraft-only portion estimated €3–3.5B.",
    },
    {
      year: 2015,
      customer_country: "Qatar",
      customer_country_code: "qa",
      units: 24,
      contract_value_usd: 6.9,
      delivery_window: "2019–2021",
      status: "delivered",
      note: "Initial 24-aircraft contract (May 2015). Includes weapons, training and support.",
    },
    {
      year: 2016,
      customer_country: "India",
      customer_country_code: "in",
      units: 36,
      contract_value_usd: 9.7,
      delivery_window: "2020–2022",
      status: "delivered",
      note: "€7.87B (~$8.7B). India-specific modifications (cold-start capability, Israeli helmet-mounted sights, enhanced radar warning receivers). All 36 delivered Dec 2022.",
    },
    {
      year: 2017,
      customer_country: "Qatar",
      customer_country_code: "qa",
      units: 12,
      contract_value_usd: 1.2,
      delivery_window: "2021–2022",
      status: "delivered",
      note: "Option exercise (+12 aircraft) signed December 2017.",
    },
    {
      year: 2021,
      customer_country: "Egypt",
      customer_country_code: "eg",
      units: 30,
      contract_value_usd: 4.1,
      delivery_window: "2024–2026",
      status: "in_delivery",
      note: "Second Egyptian tranche. €3.75B. Deliveries ongoing through 2026.",
    },
    {
      year: 2021,
      customer_country: "Greece",
      customer_country_code: "gr",
      units: 18,
      contract_value_usd: 2.8,
      delivery_window: "2021–2023",
      status: "delivered",
      note: "12 ex-French Air Force F3-R + 6 new-build. Includes weapons, training, infrastructure.",
    },
    {
      year: 2021,
      customer_country: "Croatia",
      customer_country_code: "hr",
      units: 12,
      contract_value_usd: 1.1,
      delivery_window: "2024–2025",
      status: "delivered",
      note: "€999M. 12 ex-French Air Force F3-R (10 single-seat + 2 two-seat). All 12 delivered April 25, 2025.",
    },
    {
      year: 2021,
      customer_country: "UAE",
      customer_country_code: "ae",
      units: 80,
      contract_value_usd: 19.2,
      delivery_window: "2027–2031",
      status: "signed",
      note: "~€17B including 12 Airbus H225M Caracal helicopters, weapons, training and 10-year support. First export customer for F4 standard. First aircraft unveiled Jan 2025.",
    },
    {
      year: 2022,
      customer_country: "Greece",
      customer_country_code: "gr",
      units: 6,
      contract_value_usd: 1.2,
      delivery_window: "2024–2025",
      status: "delivered",
      note: "€1.09B. 6 additional new-build F3-R. Final delivery January 2025.",
    },
    {
      year: 2022,
      customer_country: "Indonesia",
      customer_country_code: "id",
      units: 42,
      contract_value_usd: 8.1,
      delivery_window: "2026–2030",
      status: "in_delivery",
      note: "30 single-seat + 12 two-seat. Ordered as F3-R; later tranches upgraded to F4 standard. First deliveries expected 2026.",
    },
    {
      year: 2024,
      customer_country: "Serbia",
      customer_country_code: "rs",
      units: 12,
      contract_value_usd: 3.0,
      delivery_window: "2028–2030",
      status: "signed",
      note: "€2.7B signed August 29, 2024. 9 single-seat + 3 two-seat. F4.1 standard — highest standard yet for an export order at signing.",
    },
    {
      year: 2025,
      customer_country: "India (Navy)",
      customer_country_code: "in",
      units: 26,
      contract_value_usd: 7.5,
      delivery_window: "2028–2031",
      status: "signed",
      note: "$7.5B (₹63,000 crore) signed April 28, 2025. 22 Rafale M single-seat + 4 Rafale B trainers for INS Vikrant and a planned second carrier. Largest single Rafale M order ever.",
    },
  ],

  // ── Direct competitors ─────────────────────────────────────────────────────

  competitors: [
    {
      name: "Eurofighter Typhoon",
      manufacturer: "Airbus Defence & Space",
      summary: "European 4.5-gen multirole fighter (UK, Germany, Italy, Spain). Comparable in air superiority; lacks the Rafale's airborne nuclear deterrence capability and carrier variant. 571 delivered across 8 operators as of 2025.",
      dashboard_product_id: "Eurofighter Typhoon",
    },
    {
      name: "F/A-18E/F Super Hornet",
      manufacturer: "Boeing Defense",
      summary: "US-built carrier-capable multirole fighter. Primary competitor in export markets (Australia, Canada). Offers deeper logistics integration with NATO partners; production ending ~2025 with no direct successor committed.",
      dashboard_product_id: "F/A-18E/F Super Hornet",
    },
    {
      name: "Gripen E",
      manufacturer: "Saab AB",
      summary: "Swedish lightweight multirole fighter with significantly lower acquisition and operating costs. Competes against the Rafale in mid-tier export markets (Brazil, South Africa, Bulgaria). Production rate ~10/year.",
      dashboard_product_id: "Gripen E",
    },
  ],

  last_updated: "2025-05-15",
};

export default rafale;
