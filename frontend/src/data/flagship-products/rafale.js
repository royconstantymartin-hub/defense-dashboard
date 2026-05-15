// MOCK DATA — UI demonstration only. Real sourced data added in Phase 3.
const rafale = {
  official_designation: "Dassault Rafale F4",
  category_label: "Omnirole twin-engine 4.5-gen fighter",
  manufacturers: ["Dassault Aviation"],
  partner_companies: ["Thales", "Safran", "MBDA"],
  countries_of_origin: ["France"],
  country_codes: ["fr"],
  year_ioc: 2001,
  production_status: "in_production",

  total_units_produced: {
    value: 262,
    confidence: "high",
    note: null,
    sources: [{ label: "Dassault Aviation — 2024 Annual Report", url: "https://www.dassault-aviation.com", date: "2025-03-15" }],
  },

  unit_cost_usd: {
    value: 115,
    confidence: "medium",
    note: "Export flyaway cost (2024). French domestic unit cost estimated at $85–90M. Varies by contract.",
    sources: [
      { label: "Air & Cosmos — Rafale export contracts", url: "https://www.air-cosmos.com", date: "2024-11-10" },
      { label: "DGA — LFI 2025", url: "https://www.defense.gouv.fr", date: "2024-10-01" },
    ],
  },
  unit_cost_year: 2024,
  operator_countries_count: 7,

  production_rate_per_year: {
    value: 26,
    confidence: "high",
    note: "Rate expected to rise to 35/year between 2029 and 2030 to fulfil the order backlog.",
    sources: [{ label: "Air & Cosmos — LFI 2026", url: "https://www.air-cosmos.com", date: "2025-01-20" }],
  },

  variants: [
    {
      name: "Rafale C",
      role: "Single-seat land-based multirole",
      key_differences: [
        "Single cockpit",
        "Land-based airframe — standard version",
        "Largest order variant by French Air & Space Force",
      ],
      units_produced: { value: 108, confidence: "medium", note: null, sources: [] },
      operators: ["France"],
    },
    {
      name: "Rafale B",
      role: "Twin-seat land-based trainer / strike",
      key_differences: [
        "Two-seat cockpit — instructor + student or weapons operator",
        "Used for airborne nuclear deterrence missions (ASMP-A)",
        "Primary export variant",
      ],
      units_produced: { value: 117, confidence: "medium", note: null, sources: [] },
      operators: ["France", "Egypt", "Qatar", "Greece", "Croatia", "UAE", "India", "Indonesia", "Serbia"],
    },
    {
      name: "Rafale M",
      role: "Single-seat carrier-based (French Navy)",
      key_differences: [
        "Reinforced undercarriage for catapult launches and arrested landings",
        "Retractable in-flight refuelling probe",
        "Shorter tail hook for carrier deck operations",
      ],
      units_produced: { value: 57, confidence: "medium", note: null, sources: [] },
      operators: ["France (Navy)"],
    },
    {
      name: "Rafale F4.1",
      role: "Current production standard (from 2023 onwards)",
      key_differences: [
        "Upgraded RBE2-AA AESA radar",
        "TALIOS targeting pod integration",
        "New-generation helmet-mounted display (HMD)",
      ],
      units_produced: { value: "N/A", confidence: "low", note: "Not broken out separately in Dassault publications.", sources: [] },
      operators: ["France", "Recent export customers"],
    },
  ],

  tech_specs: {
    length_m: "15.3 m",
    wingspan_m: "10.9 m",
    mtow_kg: "24,500 kg",
    empty_weight_kg: "10,300 kg",
    engine: "2× Safran M88-2E4 (75 kN each with A/B)",
    max_speed: "Mach 1.8 (low-level: Mach 1.1)",
    combat_radius_km: "1,850 km (with drop tanks)",
    service_ceiling_ft: "50,000 ft",
    crew: "1 (C/M) or 2 (B)",
    hardpoints: "14",
  },
  tech_specs_confidence: "high",

  compatible_weapons: [
    "MICA EM/IR",
    "Meteor BVRAAM",
    "SCALP EG",
    "AASM Hammer",
    "Exocet AM39",
    "GBU-12 Paveway II",
    "ASMP-A (nuclear)",
    "Napalm F2",
    "Spike ER",
  ],
  max_payload_kg: "9,500 kg",
  hardpoints_count: "14 hardpoints",

  total_ordered: {
    value: 494,
    confidence: "high",
    note: null,
    sources: [{ label: "Dassault Aviation — Order Book Q1 2025", url: "https://www.dassault-aviation.com", date: "2025-04-01" }],
  },
  total_delivered: {
    value: 262,
    confidence: "high",
    note: null,
    sources: [{ label: "Dassault Aviation — 2024 Annual Report", url: "https://www.dassault-aviation.com", date: "2025-03-15" }],
  },
  backlog: 232,
  production_start_year: 1998,
  production_end_year: null,

  deliveries_by_country: [
    { country: "France",    country_code: "fr", ordered: 286, delivered: 170, delivery_date: "Ongoing through 2035" },
    { country: "Egypt",     country_code: "eg", ordered: 54,  delivered: 54,  delivery_date: "2015–2024" },
    { country: "India",     country_code: "in", ordered: 36,  delivered: 36,  delivery_date: "2022–2024" },
    { country: "Qatar",     country_code: "qa", ordered: 36,  delivered: 36,  delivery_date: "2022–2024" },
    { country: "Greece",    country_code: "gr", ordered: 24,  delivered: 24,  delivery_date: "2021–2023" },
    { country: "Croatia",   country_code: "hr", ordered: 14,  delivered: 10,  delivery_date: "2024–2025" },
    { country: "UAE",       country_code: "ae", ordered: 80,  delivered: 0,   delivery_date: "2026–2031" },
    { country: "Indonesia", country_code: "id", ordered: 42,  delivered: 0,   delivery_date: "2026–2030" },
    { country: "Serbia",    country_code: "rs", ordered: 12,  delivered: 0,   delivery_date: "2027–2030" },
  ],

  export_contracts: [
    { year: 2015, customer_country: "Egypt",     customer_country_code: "eg", units: 24, contract_value_usd: 5.2,  delivery_window: "2015–2017", status: "delivered" },
    { year: 2016, customer_country: "India",     customer_country_code: "in", units: 36, contract_value_usd: 8.8,  delivery_window: "2022–2024", status: "delivered" },
    { year: 2016, customer_country: "Egypt",     customer_country_code: "eg", units: 30, contract_value_usd: null, delivery_window: "2018–2024", status: "delivered" },
    { year: 2021, customer_country: "Greece",    customer_country_code: "gr", units: 24, contract_value_usd: 3.6,  delivery_window: "2021–2023", status: "delivered" },
    { year: 2021, customer_country: "Qatar",     customer_country_code: "qa", units: 36, contract_value_usd: 19.2, delivery_window: "2022–2024", status: "delivered" },
    { year: 2021, customer_country: "Croatia",   customer_country_code: "hr", units: 14, contract_value_usd: 1.05, delivery_window: "2024–2025", status: "in_delivery" },
    { year: 2021, customer_country: "UAE",       customer_country_code: "ae", units: 80, contract_value_usd: 16.0, delivery_window: "2026–2031", status: "signed" },
    { year: 2022, customer_country: "Indonesia", customer_country_code: "id", units: 42, contract_value_usd: 8.1,  delivery_window: "2026–2030", status: "signed" },
    { year: 2023, customer_country: "Serbia",    customer_country_code: "rs", units: 12, contract_value_usd: 3.0,  delivery_window: "2027–2030", status: "signed" },
  ],

  competitors: [
    {
      name: "Eurofighter Typhoon",
      manufacturer: "Airbus Defence & Space",
      summary: "European 4.5-gen multirole fighter developed jointly by the UK, Germany, Italy and Spain. Comparable in air superiority missions; lacks the Rafale's airborne nuclear deterrence capability. Strong export record.",
      dashboard_product_id: "Eurofighter Typhoon",
    },
    {
      name: "F/A-18E/F Super Hornet",
      manufacturer: "Boeing Defense",
      summary: "US-built carrier-capable multirole fighter. Primary competitor in export markets (Australia, Canada). Offers deeper logistics integration with NATO partner nations.",
      dashboard_product_id: "F/A-18E/F Super Hornet",
    },
    {
      name: "Gripen E",
      manufacturer: "Saab AB",
      summary: "Swedish lightweight multirole fighter with lower acquisition and operating costs. Competes directly against the Rafale in mid-tier export markets.",
      dashboard_product_id: "Gripen E",
    },
  ],

  last_updated: "2025-05-15",
  data_disclaimer: "Mock data — will be replaced with fully sourced data in Phase 3.",
};

export default rafale;
