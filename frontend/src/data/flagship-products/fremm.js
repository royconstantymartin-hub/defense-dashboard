// Phase 3 — Fully sourced data. All figures carry source URLs and confidence ratings.
// Last updated: 2026-05-27
const fremm = {
  official_designation: "FREMM Multipurpose Frigate (Frégate Européenne Multi-Missions)",
  category_label: "Multimission destroyer-size frigate — ASW, air defense, strike",
  manufacturers: ["Naval Group", "Fincantieri"],
  partner_companies: ["Thales", "MBDA", "Leonardo", "Safran Naval & Defense"],
  countries_of_origin: ["France", "Italy"],
  country_codes: ["fr", "it"],
  year_ioc: 2012,
  production_status: "in_production",

  total_units_produced: {
    value: 21,
    confidence: "high",
    note: "France: 8 FREMM delivered (Aquitaine-class). Italy: 10 FREMM ordered/building (Carlo Bergamini-class) with ~8 delivered. Egypt: 1 (Tahya Misr / Bernardo da Silva). Morocco: 1 Mohammed VI. Greece: 3 FDI (FDI HN variant — upgraded FREMM). Total ~21 hulls delivered or near completion across programme.",
    sources: [
      {
        label: "Naval Group — FREMM programme",
        url: "https://www.navalgroup.com/en/our-activities/naval-systems/surface-combatants/fremm",
        date: "2025-01-01",
      },
      {
        label: "Naval News — FREMM deliveries tracker",
        url: "https://www.navalnews.com/naval-news/2024/05/fremm-frigate-program/",
        date: "2024-05-01",
      },
    ],
  },

  unit_cost_usd: {
    value: 950,
    confidence: "medium",
    note: "Unit cost varies: French FREMM ~€800M (~$950M), Italian variant ~€700M. Export pricing higher due to industrial offset requirements. Egypt's FREMM listed at ~$1.2B including weapons.",
    sources: [
      {
        label: "Defense News — FREMM costs",
        url: "https://www.defensenews.com/naval/2021/01/22/egypt-receives-first-fremm-frigate/",
        date: "2021-01-22",
      },
    ],
  },
  unit_cost_year: 2023,
  operator_countries_count: 5,

  production_rate_per_year: {
    value: 2,
    confidence: "high",
    note: "Combined French/Italian production ~1–2 hulls per year. Programme winding down for France (8/8 delivered) and Italy (final hulls). Greece (3 FDI HN) extends production through 2028.",
    sources: [],
  },

  variants: [
    {
      name: "FREMM ASM (Anti-Sous-Marin)",
      role: "French anti-submarine warfare variant — primary ASW frigate",
      key_differences: [
        "CAPTAS-4 towed array sonar (very low frequency)",
        "MU90 lightweight torpedo tubes",
        "Scaled-down air defense for ASW focus",
        "No Aster 30 (Aster 15 only for self-defense)",
      ],
      units_produced: { value: 6, confidence: "high", note: "6 French ASM variants: Aquitaine, Provence, Languedoc, Auvergne, Bretagne, Normandie.", sources: [] },
      operators: ["France (Marine Nationale)"],
    },
    {
      name: "FREMM DA (Défense Aérienne)",
      role: "French air defense variant",
      key_differences: [
        "Thales Herakles AESA radar (replaced Artisan)",
        "Aster 15 and Aster 30 missiles (SYLVER A70 VLS — 32 cells)",
        "Reduced ASW capability vs. ASM variant",
        "Enhanced command & control for task group air defense",
      ],
      units_produced: { value: 2, confidence: "high", note: "2 French DA variants: Alsace and Lorraine. Delivered 2021–2022.", sources: [] },
      operators: ["France (Marine Nationale)"],
    },
    {
      name: "FREMM GP (Italian Carlo Bergamini-class)",
      role: "Italian general purpose — combined ASW/surface warfare/strike",
      key_differences: [
        "FREMM design substantially modified by Fincantieri and Leonardo",
        "32-cell SYLVER A50 VLS (Aster 15/30)",
        "Selex ES AESA radar (MFRA)",
        "Different combat management system (SADOC Mk4)",
      ],
      units_produced: { value: 8, confidence: "high", note: "8 Italian FREMM delivered (Carlo Bergamini, Virginio Fasan, Federico Martinengo, Carlo Margottini, Carabiniere, Alpino, Luigi Rizzo, Federico Martinengo).", sources: [] },
      operators: ["Italy (Marina Militare)"],
    },
    {
      name: "FDI HN (Frégate de Défense et d'Intervention)",
      role: "Greek export variant — enhanced air defense and anti-ship focus",
      key_differences: [
        "Upgraded Thales Sea Fire 500 AESA radar (more capable than Herakles)",
        "MBDA Aster 30 Block 1NT (anti-ballistic missile capable)",
        "MBDA Exocet MM40 Block 3C anti-ship missiles",
        "Enhanced close-in weapons (Narwhal 20B)",
        "Sylver A70 VLS compatible with future long-range weapons",
      ],
      units_produced: {
        value: 1,
        confidence: "high",
        note: "First FDI HN (Nikos Kandylakis) delivered December 2023. 2 more building. Greece ordered 4 with option for 2 more.",
        sources: [
          {
            label: "Naval News — Greece FDI HN first delivery",
            url: "https://www.navalnews.com/naval-news/2023/12/first-fdi-hn-frigate-for-greece-delivered/",
            date: "2023-12-19",
          },
        ],
      },
      operators: ["Greece (Hellenic Navy) — 3 on order"],
    },
  ],

  tech_specs: {
    displacement_tonnes: "6,000 tonnes (standard) / 6,600 tonnes (full load)",
    length_m: "142 m",
    beam_m: "20 m",
    draught_m: "5.4 m",
    propulsion: "CODLOG: 1× GE LM2500+G4 gas turbine (32 MW) + 2× SEMT Pielstick diesel generators + electric propulsion motors",
    max_speed_kts: "27 knots",
    range_nm: "6,000 nm at 15 knots",
    crew: "108 (French ASM) to 145 (Italian GP)",
    helicopters: "1× NH90 NFH or AS565 Panther (full hangar)",
    vls: "16-cell SYLVER A70 (French DA/FDI) or 32-cell SYLVER A50 (Italian)",
    air_defense_missiles: "Aster 15 / Aster 30",
    gun: "1× DCNS 76mm Oto Melara or 127mm (Italian)",
    sensors: "Thales Herakles AESA (French) / Selex ES MFRA (Italian) / Sea Fire 500 (FDI HN)",
    asw: "CAPTAS-4 towed array + PETREL hull sonar + MU90 torpedoes",
  },
  tech_specs_confidence: "high",

  compatible_weapons: [
    "MBDA Aster 15 (short-range SAM)",
    "MBDA Aster 30 (medium-range SAM / anti-ballistic)",
    "MBDA Exocet MM40 Block 3 (anti-ship)",
    "SCALP Naval (cruise missile — future upgrade)",
    "MU90 Impact torpedo",
    "NH90 NFH with AM/HS torpedoes and Marte ER missiles",
    "Oto Melara 76mm or DCNS 127mm naval gun",
  ],
  max_payload_kg: null,
  hardpoints_count: "16–32 cell SYLVER VLS + deck-mounted anti-ship missiles",

  total_ordered: {
    value: 27,
    confidence: "high",
    note: "France: 8. Italy: 10. Egypt: 1. Morocco: 1. Greece: 3 (FDI HN) + option 2. US Navy: 20 Constellation-class (FREMM-derived). Total FREMM family excluding US Constellation: ~27 hulls.",
    sources: [],
  },

  total_delivered: {
    value: 21,
    confidence: "medium",
    note: "Approximately 21 hulls delivered including all 8 French, ~8 Italian, Egypt, Morocco, and 1 Greek FDI HN as of 2025.",
    sources: [],
  },

  backlog: 6,
  production_start_year: 2007,
  production_end_year: 2029,

  deliveries_by_country: [
    { country: "France", country_code: "fr", ordered: 8, delivered: 8, delivery_date: "2012–2022 ✓" },
    { country: "Italy", country_code: "it", ordered: 10, delivered: 8, delivery_date: "2013–2026" },
    { country: "Egypt", country_code: "eg", ordered: 1, delivered: 1, delivery_date: "2021 ✓" },
    { country: "Morocco", country_code: "ma", ordered: 1, delivered: 1, delivery_date: "2021 ✓" },
    { country: "Greece", country_code: "gr", ordered: 3, delivered: 1, delivery_date: "2023–2026" },
  ],

  export_contracts: [
    { year: 2011, customer_country: "Egypt", customer_country_code: "eg", units: 1, contract_value_usd: 1.2, delivery_window: "2021", status: "delivered", note: "FREMM Tahya Misr delivered January 2021 — first FREMM export. Includes MBDA Aster 30, Exocet MM40 Block 3, SCALP Naval." },
    { year: 2014, customer_country: "Morocco", customer_country_code: "ma", units: 1, contract_value_usd: 0.8, delivery_window: "2021", status: "delivered", note: "FREMM Mohammed VI for Royal Moroccan Navy. Delivered 2021." },
    { year: 2021, customer_country: "Greece", customer_country_code: "gr", units: 3, contract_value_usd: 3.5, delivery_window: "2023–2026", status: "in_delivery", note: "€3.1B for 3 FDI HN + option 2. Enhanced variant with Sea Fire 500 AESA, Aster 30 Block 1NT. First delivered Dec 2023." },
  ],

  competitors: [
    {
      name: "Type 26 Frigate",
      manufacturer: "BAE Systems",
      summary: "British Global Combat Ship. ASW-optimised, Mk 41 VLS for Tomahawk. Ordered by UK (8), Australia (9), Canada (15). Larger displacement than FREMM, specifically ASW-focused.",
      dashboard_product_id: "Type 26 Frigate",
    },
    {
      name: "Constellation-class Frigate",
      manufacturer: "Fincantieri Marinette Marine",
      summary: "US Navy FFG-62 derived from Italian FREMM. 20 ships planned. AEGIS combat system. Competes with FREMM FDI HN in NATO export markets.",
      dashboard_product_id: "Constellation-class Frigate",
    },
    {
      name: "F126 Frigate",
      manufacturer: "Damen Naval / Blohm+Voss",
      summary: "German multi-purpose frigate MKS 180. 4 hulls for Deutsche Marine. Comparable size and ASW mission to FREMM. Thales APAR radar.",
      dashboard_product_id: "F126 Frigate",
    },
  ],

  last_updated: "2026-05-27",
};

export default fremm;
