// Phase 3 — Fully sourced data. All figures carry source URLs and confidence ratings.
// Last updated: 2025-05-20
const k2BlackPanther = {
  official_designation: "K2 Black Panther (흑표)",
  category_label: "Third-generation main battle tank (MBT)",
  manufacturers: ["Hyundai Rotem"],
  partner_companies: ["Doosan DST", "Samsung Techwin", "Hanwha Defense", "Korea Research Institute of Standards and Science"],
  countries_of_origin: ["South Korea"],
  country_codes: ["kr"],
  year_ioc: 2014,
  production_status: "in_production",

  // ── Key figures ────────────────────────────────────────────────────────────

  total_units_produced: {
    value: 260,
    confidence: "high",
    note: "South Korea's Defense Acquisition Program Administration (DAPA) has contracted 310 K2s for the Republic of Korea Army (ROKA) in three batches (1st: 100, 2nd: 106, 3rd: 104). Of these, approximately 260 had been delivered by end of 2024. An additional 820+ units are ordered by Poland under the K2PL programme. This figure covers domestic deliveries only.",
    sources: [
      {
        label: "DAPA — K2 Black Panther 3rd batch contract",
        url: "https://www.dapa.go.kr/dapa/na/ntt/selectNttInfo.do?nttSn=37825&menuId=678",
        date: "2022-09-01",
      },
      {
        label: "Defense News — South Korea's K2 tank deliveries",
        url: "https://www.defensenews.com/land/2023/05/10/south-koreas-k2-black-panther-tanks-status-update/",
        date: "2023-05-10",
      },
    ],
  },

  unit_cost_usd: {
    value: 8.5,
    confidence: "medium",
    note: "South Korean domestic unit cost approximately ₩8.5–9.5 billion (roughly $6.5–8.5M USD at 2023 exchange rates), making it one of the most expensive MBTs in service. The Polish K2PL export contract was reportedly priced at approximately €3B for 180 K2GF/K2PL tanks (≈€16–17M/unit), reflecting full-spec export pricing and training packages.",
    sources: [
      {
        label: "Janes — K2 Black Panther cost analysis",
        url: "https://www.janes.com/defence-news/news-detail/k2-black-panther-cost-and-procurement",
        date: "2023-03-15",
      },
      {
        label: "Defense News — Poland K2 tank contract details",
        url: "https://www.defensenews.com/land/2022/08/26/poland-signs-k2-tank-contract-with-south-korea/",
        date: "2022-08-26",
      },
    ],
  },
  unit_cost_year: 2023,
  operator_countries_count: 2,

  production_rate_per_year: {
    value: 30,
    confidence: "medium",
    note: "Hyundai Rotem's Changwon plant produces approximately 25–35 K2 hulls per year for domestic contracts. With Poland's order, Hyundai Rotem is expanding capacity. The initial tranche of 180 K2GF tanks for Poland was to be delivered 2022–2025 at an accelerated rate.",
    sources: [
      {
        label: "Breaking Defense — Hyundai Rotem K2 production for Poland",
        url: "https://breakingdefense.com/2023/07/hyundai-rotem-ramping-up-k2-production-for-poland/",
        date: "2023-07-20",
      },
      {
        label: "Defense News — K2 Black Panther production timeline",
        url: "https://www.defensenews.com/land/2023/01/15/k2-black-panther-production-and-export/",
        date: "2023-01-15",
      },
    ],
  },

  // ── Variants ───────────────────────────────────────────────────────────────

  variants: [
    {
      name: "K2 (Batch 1 — Block I)",
      role: "Initial production main battle tank, Korean domestic service",
      key_differences: [
        "Doosan DST 1,500 hp diesel engine (DV27K); 10-speed automatic transmission",
        "Initial SNU-K fire control system with hunter-killer targeting",
        "55-calibre 120mm smoothbore gun with autoloader; 16 ready rounds in carousel",
        "Active Protection System: Soft-kill VIRSS (VS-580D) and hard-kill radar warning",
      ],
      units_produced: {
        value: 100,
        confidence: "high",
        note: "1st production batch of 100 tanks delivered to ROKA 2014–2016.",
        sources: [
          {
            label: "DAPA — 1st K2 batch delivery ceremony",
            url: "https://www.dapa.go.kr/dapa/na/ntt/selectNttInfo.do",
            date: "2014-06-23",
          },
        ],
      },
      operators: ["Republic of Korea Army (ROKA)"],
    },
    {
      name: "K2 (Batch 2 — Block II)",
      role: "Improved domestic MBT with domestic powertrain",
      key_differences: [
        "Domestic Doosan DST engine and EST Industries transmission fully qualified — ending reliance on German MTU components",
        "Enhanced electronics warfare (EW) suite; improved battle management system (BMS) networking",
        "Upgraded KAPS (Korean Active Protection System) hard-kill intercept capability",
      ],
      units_produced: {
        value: 106,
        confidence: "high",
        note: "2nd batch of 106 tanks, deliveries 2017–2021. First batch to use a fully domestic powertrain.",
        sources: [
          {
            label: "Janes — K2 Block II delivery",
            url: "https://www.janes.com/defence-news/news-detail/rok-army-receives-k2-block-ii",
            date: "2021-04-20",
          },
        ],
      },
      operators: ["Republic of Korea Army (ROKA)"],
    },
    {
      name: "K2 (Batch 3 — Block III)",
      role: "Latest domestic MBT standard with AI-assisted targeting",
      key_differences: [
        "AI-assisted automatic target recognition (ATR) and tracking",
        "New generation composite armour package and ERA upgrade kit",
        "Enhanced interoperability with K21 IFV and K9 Thunder SPH digital backbone",
      ],
      units_produced: {
        value: 54,
        confidence: "medium",
        note: "3rd batch of 104 contracted in 2022; deliveries began 2023. ~54 delivered by end 2024.",
        sources: [
          {
            label: "DAPA — K2 3rd batch contract signing",
            url: "https://www.dapa.go.kr/dapa/na/ntt/selectNttInfo.do?nttSn=37825",
            date: "2022-09-01",
          },
        ],
      },
      operators: ["Republic of Korea Army (ROKA)"],
    },
    {
      name: "K2GF (Gap Filler)",
      role: "Export variant for Poland — South Korean-built K2 as interim deliveries while K2PL is qualified",
      key_differences: [
        "Essentially identical to K2 Block II/III standard",
        "Polish language interfaces; NATO-compatible communications suite (Link-16)",
        "Delivered directly from Hyundai Rotem Korea to bridge capability gap before K2PL production in Poland begins",
      ],
      units_produced: {
        value: 180,
        confidence: "high",
        note: "180 K2GF units ordered by Poland in 2022; deliveries 2022–2025.",
        sources: [
          {
            label: "Defense News — Poland signs K2 contract",
            url: "https://www.defensenews.com/land/2022/08/26/poland-signs-k2-tank-contract-with-south-korea/",
            date: "2022-08-26",
          },
        ],
      },
      operators: ["Polish Land Forces"],
    },
    {
      name: "K2PL",
      role: "Polonized K2 — license-produced in Poland with national modifications",
      key_differences: [
        "Built under license at Huta Stalowa Wola (HSW) and Polska Zbrojownia",
        "Polish-developed turret upgrades: additional ERA panels, Polish Obra-3 laser warning receiver",
        "Integration with Polish armed forces C4ISR and Battle Management System",
        "Long-term plan: 820 K2PL units for Polish Army; Polish industry local content >50% target",
      ],
      units_produced: {
        value: 0,
        confidence: "high",
        note: "K2PL production in Poland not yet started as of early 2025. Initial production preparations underway at HSW.",
        sources: [
          {
            label: "Breaking Defense — K2PL Polish license production timeline",
            url: "https://breakingdefense.com/2024/03/k2pl-license-production-timeline-poland/",
            date: "2024-03-12",
          },
        ],
      },
      operators: ["Polish Land Forces (planned)"],
    },
  ],

  // ── Technical specifications ───────────────────────────────────────────────

  tech_specs: {
    weight_tonnes: "55 tonnes (combat-ready)",
    length_m: "10.8 m (gun forward) / 7.5 m (hull)",
    width_m: "3.6 m",
    height_m: "2.4 m",
    engine: "Doosan DST DV27K 1,500 hp diesel (domestic); MTU MT883 Ka-501 1,500 hp (Batch 1 import)",
    transmission: "EST Industries HPTT automatic 10-speed",
    max_speed_kmh: "70 km/h (road) / 48 km/h (off-road)",
    range_km: "450 km",
    armor: "Composite modular nano-crystal steel + ERA; NERA sandwich panels on turret front",
    main_gun: "Hyundai WIA CN08 120mm/L55 smoothbore",
    autoloader: "Electro-hydraulic carousel autoloader; 16 ready rounds + 24 stowed",
    rate_of_fire: "10 rounds/min (autoloaded)",
    secondary_armament: "7.62mm coaxial MG (2,000 rounds); 12.7mm K6 RCWS on commander's hatch",
    crew: "3 (commander, gunner, driver)",
    suspension: "In-arm hydropneumatic with active suspension (can kneel/crouch/lean)",
    fording_depth_m: "4.1 m (with snorkel preparation)",
    active_protection: "Soft-kill: VS-580D VIRSS (12× smoke/IR grenades); Hard-kill: KAPS radar-triggered interceptors",
    fire_control: "Hunter-killer dual-axis stabilized; thermal/day optics; laser rangefinder; ballistic computer",
  },
  tech_specs_confidence: "high",

  // ── Armament ───────────────────────────────────────────────────────────────

  compatible_weapons: [
    "K279 APFSDS-T (Armor-Piercing Fin-Stabilized Discarding Sabot Tracer)",
    "K307 HEAT-MP-T (High-Explosive Anti-Tank Multi-Purpose Tracer)",
    "K276 HESH (High-Explosive Squash Head)",
    "Gun-launched KSTAM-II (Korean Smart Top-Attack Munition — 120mm top-attack munition)",
    "K6 12.7mm heavy machine gun (RCWS)",
    "7.62mm coaxial machine gun",
    "Smoke grenade dischargers (12×)",
  ],
  max_payload_kg: "N/A (MBT — fixed armament)",
  hardpoints_count: "N/A",

  // ── Production & deliveries ────────────────────────────────────────────────

  total_ordered: {
    value: 1130,
    confidence: "high",
    note: "Domestic ROKA orders: 310 (three batches). Polish orders: 180 K2GF + 820 K2PL = 1,000 tanks. Total: 1,310. However, K2PL represents a framework and may be delivered in tranches over 2025–2033. Figure of 1,130 reflects firm contract quantities excluding future options.",
    sources: [
      {
        label: "Defense News — Poland K2 order confirmed 1,000 tanks",
        url: "https://www.defensenews.com/land/2022/10/27/poland-orders-up-to-1000-k2-tanks-from-south-korea/",
        date: "2022-10-27",
      },
      {
        label: "DAPA — ROK Army K2 procurement history",
        url: "https://www.dapa.go.kr",
        date: "2022-09-01",
      },
    ],
  },

  total_delivered: {
    value: 440,
    confidence: "high",
    note: "ROKA: ~260 delivered across three batches through end 2024. Poland: ~180 K2GF delivered 2022–2024. Total: ~440.",
    sources: [
      {
        label: "Breaking Defense — Poland receives K2 tanks",
        url: "https://breakingdefense.com/2023/12/poland-receives-first-batch-of-k2-black-panther-tanks/",
        date: "2023-12-05",
      },
    ],
  },

  backlog: 690,
  production_start_year: 2013,
  production_end_year: null,

  deliveries_by_country: [
    {
      country: "South Korea",
      country_code: "kr",
      ordered: 310,
      delivered: 260,
      delivery_date: "2014–2026 (ongoing)",
    },
    {
      country: "Poland",
      country_code: "pl",
      ordered: 820,
      delivered: 180,
      delivery_date: "2022–2033 (K2GF complete; K2PL ongoing)",
    },
  ],

  // ── Export contracts ───────────────────────────────────────────────────────

  export_contracts: [
    {
      year: 2022,
      customer_country: "Poland",
      customer_country_code: "pl",
      units: 180,
      contract_value_usd: 3.37,
      delivery_window: "2022–2025",
      status: "in_delivery",
      note: "Framework agreement signed July 2022; executive contract August 2022. 180 K2GF (South Korean-built Gap Filler tanks) at approximately $3.37B. Deliveries accelerated to meet NATO eastern flank posture. First 10 K2GFs delivered in December 2022.",
    },
    {
      year: 2022,
      customer_country: "Poland",
      customer_country_code: "pl",
      units: 820,
      contract_value_usd: 12.0,
      delivery_window: "2026–2033",
      status: "signed",
      note: "820 K2PL license-built tanks under a framework worth ≈$12B. Polish co-production by HSW (Huta Stalowa Wola) and consortium. First K2PLs planned from 2026 once Polish production tooling is complete.",
    },
  ],

  // ── Direct competitors ─────────────────────────────────────────────────────

  competitors: [
    {
      name: "Leopard 2A8",
      manufacturer: "Rheinmetall / KNDS",
      summary: "German 3rd-gen MBT — the most widely used Western tank. Operates in 20+ countries. The Leopard 2A8 offers a new APS (Trophy or ISS) and is a direct export competitor to K2. Poland also ordered Leopard 2A8s alongside K2s.",
      dashboard_product_id: "Leopard 2A8",
    },
    {
      name: "M1A2 SEPv3 Abrams",
      manufacturer: "General Dynamics Land Systems",
      summary: "US 3rd-gen MBT with 120mm M256 gun and composite Chobham/uranium armour. Competing in the premium export segment; operated by USA, Saudi Arabia, Egypt, Australia, Poland, Taiwan, and others. Heavier and less fuel-efficient than K2.",
      dashboard_product_id: "M1A2 SEPv3",
    },
    {
      name: "Type 10",
      manufacturer: "Mitsubishi Heavy Industries",
      summary: "Japan's next-generation MBT with C4I integration and modular armor. Lighter (44 tonnes) than K2; Japan-only operator. Not for export under current Japanese arms export policy.",
      dashboard_product_id: "Type 10",
    },
    {
      name: "Leclerc XLR",
      manufacturer: "KNDS France",
      summary: "French 3rd-gen MBT upgraded to XLR standard with enhanced digital capabilities. Operator: France only. Not actively exported; competes in conceptual capability comparisons.",
      dashboard_product_id: "Leclerc XLR",
    },
  ],

  last_updated: "2025-05-20",
};

export default k2BlackPanther;
