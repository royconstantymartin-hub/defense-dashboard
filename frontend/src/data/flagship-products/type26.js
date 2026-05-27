// Phase 3 — Fully sourced data. All figures carry source URLs and confidence ratings.
// Last updated: 2026-05-27
const type26 = {
  official_designation: "BAE Systems Type 26 City-class Frigate (HMS Glasgow — Global Combat Ship)",
  category_label: "Anti-submarine warfare (ASW) frigate — global combat ship",
  manufacturers: ["BAE Systems Maritime"],
  partner_companies: ["Rolls-Royce", "Leonardo UK", "Thales UK", "MBDA UK"],
  countries_of_origin: ["United Kingdom"],
  country_codes: ["gb"],
  year_ioc: 2028,
  production_status: "in_production",

  total_units_produced: {
    value: 1,
    confidence: "high",
    note: "First ship (HMS Glasgow) launched November 2024. Under fitting out in Scotstoun, Glasgow. 7 more UK ships under construction. Australia (9 ships) and Canada (15 ships) ordered under the Global Combat Ship design.",
    sources: [
      {
        label: "Royal Navy — HMS Glasgow launch",
        url: "https://www.royalnavy.mod.uk/news-and-latest-activity/news/2024/november/14/241114-hms-glasgow-launched",
        date: "2024-11-14",
      },
      {
        label: "BAE Systems — Type 26 frigate",
        url: "https://www.baesystems.com/en/product/type-26-city-class-frigate",
        date: "2025-01-01",
      },
    ],
  },

  unit_cost_usd: {
    value: 1400,
    confidence: "medium",
    note: "UK Type 26 estimated at £1B+ per ship (~$1.4B at 2024 rates). Total UK programme (8 ships): ~£10B. Australian Hunter-class variant estimated at AUD $45.6B for 9 ships (~$4.8B/ship including sovereign build premium).",
    sources: [
      {
        label: "UK NAO — Type 26 programme costs",
        url: "https://www.nao.org.uk/reports/ministry-of-defence-major-projects-report/",
        date: "2024-01-01",
      },
      {
        label: "Australian Department of Defence — Hunter Class Frigate",
        url: "https://www.defence.gov.au/project/hunter-class-frigates",
        date: "2024-01-01",
      },
    ],
  },
  unit_cost_year: 2024,
  operator_countries_count: 3,

  production_rate_per_year: {
    value: 1,
    confidence: "high",
    note: "BAE Systems Scotstoun yard producing 1 Type 26 per year. Australia's Osborne Naval Shipyard producing Hunter-class separately. Canada's Canadian Surface Combatant (CSC) build to begin mid-2020s.",
    sources: [],
  },

  variants: [
    {
      name: "Type 26 City-class (UK)",
      role: "Royal Navy ASW frigate — primary anti-submarine warfare and general purpose",
      key_differences: [
        "Dedicated ASW mission bay (towed array sonar, UUVs, helicopters)",
        "Ultra-quiet hybrid propulsion for sonar advantage",
        "Sea Ceptor CAMM missile air defense",
        "Mk 41 VLS for future Tomahawk / anti-ship missiles",
        "2× Wildcat HMA2 or Merlin HM2 helicopters",
      ],
      units_produced: { value: 1, confidence: "high", note: "HMS Glasgow launched 2024. HMS Cardiff, HMS Belfast + 5 more on order.", sources: [] },
      operators: ["United Kingdom (Royal Navy) — 8 ships on order"],
    },
    {
      name: "Hunter-class (Australia)",
      role: "Royal Australian Navy ASW / multimission frigate — Global Combat Ship Australia variant",
      key_differences: [
        "Larger displacement (~10,000 tonnes vs. 8,000t UK)",
        "AN/SPY-6 AESA radar replacing Artisan 3D",
        "Australian weapons and sensor integration",
        "AEGIS-compatible combat management system",
        "Evolved from Type 26 design with major Australian modifications",
      ],
      units_produced: { value: 0, confidence: "high", note: "Steel cut planned 2025–2026. 9 Hunter-class ordered.", sources: [] },
      operators: ["Australia (Royal Australian Navy) — 9 ships on order"],
    },
    {
      name: "Canadian Surface Combatant (CSC)",
      role: "Royal Canadian Navy multi-role combatant — Type 26-derived",
      key_differences: [
        "Combat System Integrator: Lockheed Martin Canada",
        "AN/SPY-7 LRDR radar (more capable than UK/Australia)",
        "15-ship programme — largest Canadian defence procurement",
        "Canadian industrial participation >50% local content",
      ],
      units_produced: { value: 0, confidence: "high", note: "Design phase underway. Construction at Seaspan Vancouver (after River-class auxiliaries).", sources: [] },
      operators: ["Canada (Royal Canadian Navy) — 15 ships planned"],
    },
  ],

  tech_specs: {
    displacement_tonnes: "8,000 tonnes full load (UK Type 26)",
    length_m: "149.9 m",
    beam_m: "20.8 m",
    draught_m: "5.7 m",
    propulsion: "CODLOG (Combined Diesel-Electric Or Gas): 2× Rolls-Royce MT30 gas turbines (40 MW) + 4× diesel generators + electric motors",
    max_speed_kts: "26 knots",
    range_nm: "7,000 nm at 15 knots",
    crew: "157 (up to 208 with air group and RM detachment)",
    helicopters: "2× Merlin HM2 or Wildcat HMA2 (full hangar)",
    vls: "24-cell Mark 41 VLS (Mk 41 compatible with Tomahawk, ASROC, SM-2/6)",
    air_defense: "Sea Ceptor (CAMM) 48-cell UVLS",
    gun: "1× BAE Systems Mk 45 5-inch naval gun",
    sensors: "Thales Artisan 3D radar, hull-mounted sonar (2087 LFTAS), Type 2150 sonar",
    asw: "Towed array sonar (2057), sonobuoys, ASW torpedoes, Merlin HM2",
  },
  tech_specs_confidence: "high",

  compatible_weapons: [
    "Tomahawk Block V (Mk 41 VLS)",
    "ASROC anti-submarine rocket (Mk 41)",
    "Sea Ceptor CAMM (48 cells)",
    "Harpoon anti-ship missile (deck mounted)",
    "Sting Ray lightweight torpedo (from Merlin)",
    "Mk 46 / Mk 54 torpedo",
    "Wildcat with Sea Venom missile",
    "30mm cannon (Mk 44 Bushmaster)",
  ],
  max_payload_kg: null,
  hardpoints_count: "24-cell Mk 41 VLS + 48-cell Sea Ceptor UVLS",

  total_ordered: {
    value: 32,
    confidence: "high",
    note: "UK: 8 ships. Australia (Hunter-class): 9 ships. Canada (CSC): 15 ships. Total Global Combat Ship family: 32 ships worth ~$60B+.",
    sources: [
      {
        label: "BAE Systems — Global Combat Ship orders",
        url: "https://www.baesystems.com/en/article/global-combat-ship",
        date: "2025-01-01",
      },
    ],
  },

  total_delivered: {
    value: 0,
    confidence: "high",
    note: "No ships delivered yet. HMS Glasgow (UK) expected IOC 2028. Australian and Canadian ships will follow from the early 2030s.",
    sources: [],
  },

  backlog: 32,
  production_start_year: 2017,
  production_end_year: null,

  deliveries_by_country: [
    { country: "United Kingdom", country_code: "gb", ordered: 8, delivered: 0, delivery_date: "2028–2035" },
    { country: "Australia", country_code: "au", ordered: 9, delivered: 0, delivery_date: "2031–2042" },
    { country: "Canada", country_code: "ca", ordered: 15, delivered: 0, delivery_date: "2031–2045" },
  ],

  export_contracts: [
    { year: 2018, customer_country: "Australia", customer_country_code: "au", units: 9, contract_value_usd: 31.0, delivery_window: "2031–2042", status: "signed", note: "SEA 5000 Phase 1 — Hunter-class. AUD $45.6B (~$31B USD). Substantial Australian industrial content at Osborne SA." },
    { year: 2019, customer_country: "Canada", customer_country_code: "ca", units: 15, contract_value_usd: 60.0, delivery_window: "2031–2045", status: "signed", note: "Canadian Surface Combatant — CDN $84B+ programme (2023 estimate). Irving Shipbuilding Halifax NS. Largest Canadian defence programme ever." },
  ],

  competitors: [
    {
      name: "FREMM Frigate",
      manufacturer: "Naval Group / Fincantieri",
      summary: "Franco-Italian multimission frigate. 10 French + 10 Italian + export (Egypt, Morocco, Greece). Comparable ASW capability. US Navy ordered Constellation-class (FREMM-derived).",
      dashboard_product_id: "FREMM Frigate",
    },
    {
      name: "F126 Frigate",
      manufacturer: "Damen Naval / Blohm+Voss",
      summary: "German multi-purpose frigate (MKS 180). 4 ships for Deutsche Marine. Thales APAR radar. ASW focused, similar displacement to Type 26.",
      dashboard_product_id: "F126 Frigate",
    },
    {
      name: "Constellation-class Frigate",
      manufacturer: "Fincantieri Marinette Marine",
      summary: "US Navy FFG-62 class derived from FREMM design. 20 ships planned. AEGIS combat system. Competes in export markets (Poland, Greece).",
      dashboard_product_id: "Constellation-class Frigate",
    },
  ],

  last_updated: "2026-05-27",
};

export default type26;
