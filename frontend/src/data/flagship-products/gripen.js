// Phase 3 — Fully sourced data. All figures carry source URLs and confidence ratings.
// Last updated: 2026-05-27
const gripen = {
  official_designation: "Saab JAS 39E/F Gripen",
  category_label: "Lightweight single-engine 4.5-gen multirole fighter",
  manufacturers: ["Saab AB"],
  partner_companies: ["GE Aviation", "Thales", "MBDA", "Raytheon Technologies"],
  countries_of_origin: ["Sweden"],
  country_codes: ["se"],
  year_ioc: 2019,
  production_status: "in_production",

  total_units_produced: {
    value: 271,
    confidence: "medium",
    note: "Includes all Gripen A/B/C/D/E/F variants. Gripen E specifically: ~30 delivered to Sweden and Brazil as of early 2026. Total fleet across all operators.",
    sources: [
      {
        label: "Saab — Gripen Facts & Figures",
        url: "https://www.saab.com/products/gripen/",
        date: "2025-01-01",
      },
    ],
  },

  unit_cost_usd: {
    value: 85,
    confidence: "medium",
    note: "Flyaway cost for Gripen E estimated at ~$85M per aircraft. Brazil's contract (36 aircraft, ~$4.5B) implies ~$125M all-in including training and support. Significantly cheaper to operate than F-35 or Typhoon.",
    sources: [
      {
        label: "Defense News — Brazil Gripen E contract",
        url: "https://www.defensenews.com/air/2014/10/27/brazil-selects-saab-gripen-ng-for-air-force/",
        date: "2014-10-27",
      },
    ],
  },
  unit_cost_year: 2023,
  operator_countries_count: 9,

  production_rate_per_year: {
    value: 12,
    confidence: "medium",
    note: "Saab producing approximately 10–14 Gripen E/F per year for Swedish and Brazilian orders. Production line in Linköping, Sweden.",
    sources: [
      {
        label: "Saab Annual Report 2024",
        url: "https://www.saab.com/investors/",
        date: "2025-03-01",
      },
    ],
  },

  variants: [
    {
      name: "Gripen A/B",
      role: "Original single/twin-seat baseline variant (retired in most fleets)",
      key_differences: [
        "PS-05/A pulse-Doppler radar",
        "Single-seat A and twin-seat B trainer",
        "Limited to AIM-9 and AIM-120 AMRAAM initially",
      ],
      units_produced: { value: 204, confidence: "medium", note: "Swedish original fleet; exported to South Africa (26) and Hungary (14 leased).", sources: [] },
      operators: ["Sweden (retired/reserve)", "South Africa", "Hungary"],
    },
    {
      name: "Gripen C/D",
      role: "Enhanced multirole variant — primary export version",
      key_differences: [
        "PS-05/A Mk3 radar with improved performance",
        "NATO-compatible data links (Link 16)",
        "Expanded weapon compatibility: IRIS-T, Meteor, RBS-15 Mk3",
      ],
      units_produced: { value: 67, confidence: "medium", note: "C/D operated by Sweden, Czech Republic, Hungary, Thailand.", sources: [] },
      operators: ["Sweden", "Czech Republic", "Hungary", "Thailand"],
    },
    {
      name: "Gripen E (JAS 39E)",
      role: "Advanced 4.5-gen single-seat variant — current production standard",
      key_differences: [
        "Raven ES-05 AESA radar — electronically scanned, superior tracking",
        "Larger internal fuel capacity (+40% vs. C/D)",
        "GE F414G engine (98 kN) replacing Volvo RM12",
        "New wide-area display cockpit, advanced EW suite",
        "Full Meteor BVR missile integration",
      ],
      units_produced: {
        value: 30,
        confidence: "medium",
        note: "Sweden ordered 60 Gripen E; first operational delivery 2021. Brazil ordered 36 (first deliveries 2025–2026).",
        sources: [
          {
            label: "The Aviationist — First Gripen E delivered to Sweden",
            url: "https://theaviationist.com/2021/11/04/first-gripen-e-delivered-to-sweden/",
            date: "2021-11-04",
          },
        ],
      },
      operators: ["Sweden (Flygvapnet)", "Brazil (from 2025)"],
    },
    {
      name: "Gripen F (JAS 39F)",
      role: "Twin-seat trainer variant of Gripen E",
      key_differences: [
        "Two-seat cockpit with full combat capability",
        "Used for operational conversion training",
        "Brazil ordered 15 F-models alongside 21 E-models",
      ],
      units_produced: { value: 0, confidence: "low", note: "In production; first Brazilian F deliveries expected 2026.", sources: [] },
      operators: ["Brazil (from 2026)"],
    },
  ],

  tech_specs: {
    length_m: "14.1 m",
    wingspan_m: "8.6 m",
    height_m: "4.5 m",
    empty_weight_kg: "6,800 kg",
    mtow_kg: "16,500 kg",
    internal_fuel_kg: "3,400 kg",
    engine: "1× GE Aviation F414G turbofan (98 kN with afterburner)",
    max_speed: "Mach 2.0 at altitude",
    combat_radius_km: "1,500 km (with external tanks)",
    ferry_range_km: "3,200 km",
    service_ceiling_ft: "50,000 ft",
    g_limits: "−3g / +9g",
    crew: "1 (E) or 2 (F)",
    hardpoints: "10",
  },
  tech_specs_confidence: "high",

  compatible_weapons: [
    "MBDA Meteor BVRAAM",
    "AIM-120 AMRAAM",
    "IRIS-T (short-range IR)",
    "AIM-9 Sidewinder",
    "RBS-15 Mk3 (anti-ship)",
    "KEPD 350 Taurus (cruise missile)",
    "GBU-49 Paveway II",
    "Brimstone (air-to-ground)",
    "AGM-65 Maverick",
    "Mauser BK 27 27mm cannon",
  ],
  max_payload_kg: "6,000 kg",
  hardpoints_count: "10 hardpoints",

  total_ordered: {
    value: 96,
    confidence: "high",
    note: "Sweden: 60 Gripen E. Brazil: 36 Gripen E/F. No new export orders signed as of May 2026, though several evaluations ongoing (Colombia, India, Philippines).",
    sources: [
      {
        label: "Saab — Gripen orders overview",
        url: "https://www.saab.com/products/gripen/orders-and-deliveries/",
        date: "2025-01-01",
      },
    ],
  },

  total_delivered: {
    value: 30,
    confidence: "medium",
    note: "Approximately 30 Gripen E/F delivered as of early 2026, all to Sweden. Brazilian deliveries started 2025.",
    sources: [],
  },

  backlog: 66,
  production_start_year: 2017,
  production_end_year: null,

  deliveries_by_country: [
    { country: "Sweden", country_code: "se", ordered: 60, delivered: 30, delivery_date: "2021–2027" },
    { country: "Brazil", country_code: "br", ordered: 36, delivered: 0, delivery_date: "2025–2030" },
  ],

  export_contracts: [
    {
      year: 2014,
      customer_country: "Brazil",
      customer_country_code: "br",
      units: 36,
      contract_value_usd: 4.5,
      delivery_window: "2025–2030",
      status: "in_delivery",
      note: "Brazil chose Gripen E/F over F/A-18 Super Hornet and Dassault Rafale. Technology transfer included — Brazil to produce fuselage sections locally.",
    },
  ],

  competitors: [
    {
      name: "Rafale F4",
      manufacturer: "Dassault Aviation",
      summary: "French 4.5-gen omnirole fighter. Carrier-capable, nuclear deterrence role. Higher unit cost (~$131M flyaway) but broader global sales. Direct competitor in export markets including Brazil (lost), India, Colombia.",
      dashboard_product_id: "Rafale F4",
    },
    {
      name: "Eurofighter Typhoon",
      manufacturer: "Airbus Defence & Space",
      summary: "European consortium twin-engine fighter. Superior raw performance envelope vs. Gripen but 3–4x higher operating cost. Competes in NATO and export markets.",
      dashboard_product_id: "Eurofighter Typhoon",
    },
    {
      name: "F-16 Block 70/72",
      manufacturer: "Lockheed Martin",
      summary: "US legacy single-engine multirole fighter with massive installed base (4,000+ aircraft). New-build Block 70 competes directly with Gripen E on price and capability. Strong US diplomatic leverage in export competitions.",
      dashboard_product_id: "F-16 Block 70/72",
    },
  ],

  last_updated: "2026-05-27",
};

export default gripen;
