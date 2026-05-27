// Phase 3 — Fully sourced data. All figures carry source URLs and confidence ratings.
// Last updated: 2026-05-27
const b21Raider = {
  official_designation: "Northrop Grumman B-21 Raider",
  category_label: "6th-generation stealth strategic bomber — penetrating strike and ISR platform",
  manufacturers: ["Northrop Grumman"],
  partner_companies: ["Pratt & Whitney", "BAE Systems", "Spirit AeroSystems", "GKN Aerospace"],
  countries_of_origin: ["United States"],
  country_codes: ["us"],
  year_ioc: 2025,
  production_status: "in_production",

  total_units_produced: {
    value: 6,
    confidence: "medium",
    note: "Six B-21s in flight test as of mid-2025 at Edwards AFB. Full-rate production decision (Milestone C) expected 2026. USAF plans 100 aircraft minimum, possibly 145+.",
    sources: [
      {
        label: "Air Force Magazine — B-21 Raider first flight",
        url: "https://www.airforcemag.com/northrop-grumman-b-21-raider-first-flight/",
        date: "2023-11-10",
      },
      {
        label: "Northrop Grumman — B-21 Raider fact sheet",
        url: "https://www.northropgrumman.com/what-we-do/air/b-21-raider/",
        date: "2025-01-01",
      },
    ],
  },

  unit_cost_usd: {
    value: 692,
    confidence: "medium",
    note: "FY2023 unit flyaway cost: $692M per aircraft (reported by HASC). Total program cost (APUC including development) estimated at $2.5B+. Exact cost classified; Northrop Grumman took a $1.56B charge in 2022 on the fixed-price development contract.",
    sources: [
      {
        label: "Breaking Defense — B-21 unit cost revealed",
        url: "https://breakingdefense.com/2023/04/b-21-raider-unit-flyaway-cost-692m-pentagon-budget-justification/",
        date: "2023-04-01",
      },
      {
        label: "Defense News — Northrop Grumman B-21 charge",
        url: "https://www.defensenews.com/air/2022/10/27/northrop-grumman-takes-1-56b-charge-on-b-21-bomber-program/",
        date: "2022-10-27",
      },
    ],
  },
  unit_cost_year: 2023,
  operator_countries_count: 1,

  production_rate_per_year: {
    value: 5,
    confidence: "low",
    note: "Low-rate initial production (LRIP) underway. Full-rate production (10-15/year) targeted post-2026 Milestone C. Palmdale, CA production facility.",
    sources: [
      {
        label: "Air Force Magazine — B-21 production timeline",
        url: "https://www.airforcemag.com/b-21-timeline/",
        date: "2024-06-01",
      },
    ],
  },

  variants: [
    {
      name: "B-21A Raider",
      role: "Primary nuclear and conventional penetrating strike bomber",
      key_differences: [
        "All-aspect broadband low-observable (stealth) design",
        "Open systems architecture for rapid capability insertion",
        "JADC2 (Joint All-Domain Command and Control) native integration",
        "Two internal weapons bays",
        "Can carry both nuclear (B61-12, B83) and conventional munitions",
        "Designed to operate in denied/contested airspace (A2/AD environments)",
      ],
      units_produced: { value: 6, confidence: "medium", note: "6 aircraft in test at Edwards AFB. Production aircraft will follow.", sources: [] },
      operators: ["USA (USAF — Dyess AFB, TX; Ellsworth AFB, SD)"],
    },
    {
      name: "B-21 (Optionally Crewed)",
      role: "Future autonomous or remotely piloted strike variant",
      key_differences: [
        "Designed from outset with optionally manned capability",
        "Remote pilot or fully autonomous operations under study",
        "Timeline and decision not yet publicly confirmed",
      ],
      units_produced: { value: 0, confidence: "low", note: "Future capability — not yet in development.", sources: [] },
      operators: [],
    },
  ],

  tech_specs: {
    wingspan_m: "~52 m (estimated, classified)",
    length_m: "~20 m (estimated, classified)",
    height_m: "Classified",
    empty_weight_kg: "Classified",
    mtow_kg: "Classified",
    internal_fuel_kg: "Classified",
    engine: "2× Pratt & Whitney F135 derivatives (classified variant, non-afterburning for stealth)",
    max_speed: "High subsonic (Mach 0.8–0.9, classified)",
    combat_radius_km: "5,500 km+ (classified, long-range penetrating strike)",
    service_ceiling_ft: "Classified (50,000+ ft estimated)",
    crew: "2 (optionally crewed)",
    weapons_bays: "2 internal weapons bays",
    radar_cross_section: "Comparable to or better than B-2 Spirit (~0.001 m²)",
  },
  tech_specs_confidence: "low",

  compatible_weapons: [
    "B61-12 nuclear gravity bomb",
    "B83-1 nuclear gravity bomb",
    "GBU-57 Massive Ordnance Penetrator (30,000 lb bunker buster)",
    "JDAM (various marks)",
    "JASSM-ER (AGM-158B)",
    "LRASM (anti-ship)",
    "SDB (Small Diameter Bomb)",
    "B21 designed for future hypersonic weapons integration",
  ],
  max_payload_kg: "~18,000 kg (estimated)",
  hardpoints_count: "2 internal weapons bays (no external hardpoints)",

  total_ordered: {
    value: 100,
    confidence: "high",
    note: "USAF minimum requirement: 100 B-21 Raiders. USAF studies suggest 145+ needed to maintain deterrence post B-1B/B-2 retirement. No export planned — US eyes-only classification.",
    sources: [
      {
        label: "USAF — Long-Range Strike Bomber program requirement",
        url: "https://www.af.mil/About-Us/Fact-Sheets/Display/Article/104465/b-21-raider/",
        date: "2025-01-01",
      },
    ],
  },

  total_delivered: {
    value: 6,
    confidence: "medium",
    note: "6 LRIP aircraft. No operational deliveries to combat units yet — all in developmental testing.",
    sources: [],
  },

  backlog: 94,
  production_start_year: 2020,
  production_end_year: null,

  deliveries_by_country: [
    { country: "United States", country_code: "us", ordered: 100, delivered: 6, delivery_date: "2025–2035" },
  ],

  export_contracts: [],

  competitors: [
    {
      name: "B-2 Spirit",
      manufacturer: "Northrop Grumman",
      summary: "Predecessor stealth bomber (1997 IOC). 20 aircraft operational. B-21 replaces B-2 with lower cost, modernized stealth, and open architecture. B-2 to retire as B-21 fleet grows.",
      dashboard_product_id: "B-2 Spirit",
    },
    {
      name: "Tu-160 Blackjack (Russia)",
      manufacturer: "Tupolev/UAC",
      summary: "Russian variable-sweep supersonic strategic bomber. Faster but non-stealthy. Russia announced new Tu-160M2 production. Contrasting design philosophy — speed vs. stealth.",
      dashboard_product_id: "Tu-160 Blackjack",
    },
    {
      name: "H-20 (China, conceptual)",
      manufacturer: "AVIC Xi'an Aircraft",
      summary: "Chinese next-generation stealth bomber under development. Estimated IOC 2030+. Subsonic, flying-wing design similar to B-2/B-21. Status and capabilities not publicly confirmed.",
      dashboard_product_id: null,
    },
  ],

  last_updated: "2026-05-27",
};

export default b21Raider;
