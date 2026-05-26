// Phase 3 — Fully sourced data. All figures carry source URLs and confidence ratings.
// Last updated: 2025-05-20
const virginiaClass = {
  official_designation: "SSN-774 Virginia-class (Block V)",
  category_label: "Nuclear-powered fast attack submarine (SSN)",
  manufacturers: ["General Dynamics Electric Boat", "Huntington Ingalls Industries (Newport News Shipbuilding)"],
  partner_companies: ["Northrop Grumman", "Raytheon Technologies", "L3Harris Technologies", "Curtiss-Wright"],
  countries_of_origin: ["United States"],
  country_codes: ["us"],
  year_ioc: 2004,
  production_status: "in_production",

  // ── Key figures ────────────────────────────────────────────────────────────

  total_units_produced: {
    value: 22,
    confidence: "high",
    note: "22 Virginia-class submarines commissioned through end of FY2024. USS Virginia (SSN-774) commissioned October 2004; most recent commissioned vessel is USS New Jersey (SSN-796) in December 2023. Two additional boats in sea trials as of early 2025.",
    sources: [
      {
        label: "U.S. Navy — Virginia-class Submarine Program",
        url: "https://www.navy.mil/Resources/Fact-Files/Display-FactFiles/Article/2169558/virginia-class-submarine/",
        date: "2024-01-01",
      },
      {
        label: "Congressional Research Service — Navy Virginia-class Submarine Program (RL32418)",
        url: "https://crsreports.congress.gov/product/pdf/RL/RL32418",
        date: "2024-11-01",
      },
    ],
  },

  unit_cost_usd: {
    value: 3400,
    confidence: "medium",
    note: "Block V (SSN-796 onwards) unit flyaway cost approximately $3.4B per hull (FY2022 dollars), up from ~$2.8B for Block III/IV due to Virginia Payload Module (VPM) integration adding 84 ft to hull length. CRS notes average procurement cost across the class is ~$3.1B in then-year dollars.",
    sources: [
      {
        label: "Congressional Research Service — Navy Virginia-class Submarine Program",
        url: "https://crsreports.congress.gov/product/pdf/RL/RL32418",
        date: "2024-11-01",
      },
      {
        label: "USNI News — Virginia-class Block V Cost Increase",
        url: "https://news.usni.org/2022/03/15/virginia-class-block-v-cost-increase",
        date: "2022-03-15",
      },
    ],
  },
  unit_cost_year: 2022,
  operator_countries_count: 1,

  production_rate_per_year: {
    value: 2,
    confidence: "high",
    note: "The Navy's stated goal and congressional mandate is 2 Virginia-class submarines per year. Production has intermittently slipped to 1.2–1.5/year due to workforce and supply chain shortfalls at Electric Boat and Newport News. The FY2024 NDAA directed the Navy to restore a 2-per-year rate by FY2028.",
    sources: [
      {
        label: "USNI News — Submarine Production Rate Challenges",
        url: "https://news.usni.org/2024/02/01/submarine-industrial-base-struggles-to-meet-two-per-year-virginia-class-goal",
        date: "2024-02-01",
      },
      {
        label: "Breaking Defense — Virginia-class production rate FY2024",
        url: "https://breakingdefense.com/2023/11/congress-pushes-navy-to-fix-submarine-production-shortfalls/",
        date: "2023-11-14",
      },
    ],
  },

  // ── Variants ───────────────────────────────────────────────────────────────

  variants: [
    {
      name: "Block I (SSN-774 – SSN-777)",
      role: "Initial production batch — anti-submarine and anti-surface warfare",
      key_differences: [
        "Original hull length: 377 ft (114.9 m); displacement 7,900 tons submerged",
        "12 VLS tubes (Mk 48 ADCAP torpedoes + Tomahawk), 4 × 21-inch torpedo tubes",
        "AN/BQQ-10 sonar suite; no large-aperture bow array upgrade",
      ],
      units_produced: {
        value: 4,
        confidence: "high",
        note: "SSN-774 through SSN-777. All four commissioned 2004–2008.",
        sources: [
          {
            label: "U.S. Navy — Virginia-class Fact File",
            url: "https://www.navy.mil/Resources/Fact-Files/Display-FactFiles/Article/2169558/virginia-class-submarine/",
            date: "2024-01-01",
          },
        ],
      },
      operators: ["United States Navy"],
    },
    {
      name: "Block II (SSN-778 – SSN-783)",
      role: "Cost-reduction block — reduced build cost while maintaining Block I capability",
      key_differences: [
        "Design changes reduced unit cost by ~$300M vs Block I through manufacturing efficiencies",
        "Improved AN/BLQ-10 electronic warfare system",
        "Retained same weapons and sensor baseline as Block I",
      ],
      units_produced: {
        value: 6,
        confidence: "high",
        note: "SSN-778 through SSN-783. Commissioned 2008–2012.",
        sources: [
          {
            label: "CRS — Navy Virginia-class (RL32418)",
            url: "https://crsreports.congress.gov/product/pdf/RL/RL32418",
            date: "2024-11-01",
          },
        ],
      },
      operators: ["United States Navy"],
    },
    {
      name: "Block III (SSN-784 – SSN-791)",
      role: "Enhanced strike capability — two large-aperture Virginia Payload Tubes (VPT)",
      key_differences: [
        "Replaced 12 individual VLS cells with 2 × large-bore Virginia Payload Tubes (VPT), each holding 6 Tomahawks",
        "Introduced Large Aperture Bow (LAB) sonar array replacing legacy sphere — improved acoustic performance",
        "Water-backed torpedo tube redesign; new photonic mast replaces periscope",
      ],
      units_produced: {
        value: 8,
        confidence: "high",
        note: "SSN-784 through SSN-791. Commissioned 2013–2019.",
        sources: [
          {
            label: "General Dynamics Electric Boat — Virginia Block III",
            url: "https://www.gdeb.com/about/oursubmarines/virginia/",
            date: "2023-01-01",
          },
        ],
      },
      operators: ["United States Navy"],
    },
    {
      name: "Block IV (SSN-792 – SSN-796)",
      role: "Life-cycle cost reduction — extended docking intervals",
      key_differences: [
        "Docking intervals extended from 12 to 16 years — significantly reduces lifecycle cost",
        "Improved crew habitability and reduced maintenance burden",
        "First block to achieve 2-per-year production rate milestone",
      ],
      units_produced: {
        value: 5,
        confidence: "high",
        note: "SSN-792 through SSN-796. Commissioned 2019–2023.",
        sources: [
          {
            label: "USNI News — Block IV delivery",
            url: "https://news.usni.org/2019/10/23/uss-vermont-ssn-792-commissioned",
            date: "2019-10-23",
          },
        ],
      },
      operators: ["United States Navy"],
    },
    {
      name: "Block V (SSN-796 – SSN-820, planned)",
      role: "Virginia Payload Module (VPM) — greatly expanded strike capacity",
      key_differences: [
        "84-foot Virginia Payload Module (VPM) mid-body insert adds 4 additional VPT tubes — total 28 Tomahawk-capacity VPTs",
        "Total length extended to 460 ft (140.2 m); submerged displacement ~10,200 tons",
        "Designed to offset SSGN capacity loss as Ohio-class SSGNs retire (~2026–2028)",
        "Enhanced AN/BYG-1 combat system; accommodates future hypersonic weapons bays",
      ],
      units_produced: {
        value: 2,
        confidence: "medium",
        note: "First Block V (SSN-796 USS New Jersey) delivered 2023; second (SSN-797 USS Iowa) in fitting-out as of early 2025. Block V procurement covers SSN-796 through ~SSN-820.",
        sources: [
          {
            label: "USNI News — USS New Jersey (SSN-796) Commissioning",
            url: "https://news.usni.org/2023/12/02/uss-new-jersey-ssn-796-commissioned",
            date: "2023-12-02",
          },
          {
            label: "CRS — Navy Virginia-class Block V",
            url: "https://crsreports.congress.gov/product/pdf/RL/RL32418",
            date: "2024-11-01",
          },
        ],
      },
      operators: ["United States Navy"],
    },
  ],

  // ── Technical specifications ───────────────────────────────────────────────

  tech_specs: {
    length_m: "114.9 m (Block I–IV) / 140.2 m (Block V with VPM)",
    displacement: "7,900 tons submerged (Block I–IV) / ~10,200 tons submerged (Block V)",
    beam_m: "10.4 m",
    propulsion: "1 × S9G naval nuclear reactor (29,000 shp); 1 × shaft; pump-jet propulsor; diesel-electric backup",
    dive_depth: "> 240 m (800 ft) operational; test depth classified",
    crew: "135 officers and enlisted",
    torpedo_tubes: "4 × 21-inch (533 mm) amidships torpedo tubes; 2 × Virginia Payload Tubes (Block III/IV) / 6 × VPT (Block V)",
    speed_kts: "> 25 kts submerged (34+ kts cited in some sources, classified)",
    endurance: "Unlimited (nuclear); limited by crew stores (~90 days typical deployment)",
    vls_capacity: "12 Tomahawks (Block I/II VLS) → 12 (Block III/IV VPT × 2) → 28 (Block V VPT × 6 including VPM)",
    sonar: "AN/BQQ-10 (Block I/II) / Large Aperture Bow (LAB) array AN/BQQ-10(V)5 (Block III+)",
  },
  tech_specs_confidence: "medium",

  // ── Armament ───────────────────────────────────────────────────────────────

  compatible_weapons: [
    "BGM-109 Tomahawk Block IV/V land-attack cruise missile",
    "UUM-44 SUBROC (retired) / ASROC successor",
    "Mk 48 ADCAP Mod 7 heavyweight torpedo (anti-submarine / anti-surface)",
    "UUM-125 Sea Lance (ASW standoff — retired)",
    "Mk 60 CAPTOR mine",
    "AGM-84 Harpoon anti-ship missile (torpedo-tube launched)",
    "Future Conventional Prompt Strike (CPS) hypersonic weapon (Block V VPM — planned)",
  ],

  // ── Production & deliveries ────────────────────────────────────────────────

  total_ordered: {
    value: 48,
    confidence: "medium",
    note: "As of FY2025 budget request, 48 Virginia-class submarines have been authorized/contracted: 4 (Block I) + 6 (Block II) + 8 (Block III) + 10 (Block IV) + 20 (Block V, ongoing multi-year procurement). Additional Block VI boats expected in FY2026+ FYDP.",
    sources: [
      {
        label: "CRS — Navy Virginia-class Submarine Program",
        url: "https://crsreports.congress.gov/product/pdf/RL/RL32418",
        date: "2024-11-01",
      },
      {
        label: "FY2025 Navy Shipbuilding Plan",
        url: "https://www.secnav.navy.mil/fmc/fmb/Documents/25pres/SCN_Book.pdf",
        date: "2024-03-01",
      },
    ],
  },

  total_delivered: {
    value: 22,
    confidence: "high",
    note: "22 boats commissioned through end of FY2024. USS New Jersey (SSN-796) commissioned December 2023 is the most recent. Delivery pace has averaged ~1.6/year over the program due to industrial base constraints.",
    sources: [
      {
        label: "U.S. Navy — Virginia-class Fact File",
        url: "https://www.navy.mil/Resources/Fact-Files/Display-FactFiles/Article/2169558/virginia-class-submarine/",
        date: "2024-01-01",
      },
    ],
  },

  backlog: 26,
  production_start_year: 1999,
  production_end_year: null,

  deliveries_by_country: [
    {
      country: "United States",
      country_code: "us",
      ordered: 48,
      delivered: 22,
      delivery_date: "2004–ongoing",
    },
  ],

  // ── Export contracts ───────────────────────────────────────────────────────

  export_contracts: [
    {
      year: 2021,
      customer_country: "Australia",
      customer_country_code: "au",
      units: 8,
      contract_value_usd: 368000,
      delivery_window: "Early 2030s",
      status: "signed",
      note: "AUKUS partnership announced September 2021. Australia will build 3–5 SSN-AUKUS submarines (new design) and acquire ~3–5 Virginia-class boats from U.S. production as an interim capability bridge. The $368B figure is Australia's total SSN program cost estimate over decades, not per-hull. Virginia-class interim sales are subject to U.S. Congressional approval and production rate recovery. No firm per-hull price published.",
    },
  ],

  // ── Direct competitors ─────────────────────────────────────────────────────

  competitors: [
    {
      name: "Astute-class",
      manufacturer: "BAE Systems Maritime",
      summary: "UK nuclear attack submarine. 7 boats ordered; 6 commissioned as of 2024. Comparable ASW performance; no VPM equivalent. Serves as AUKUS SSN-AUKUS design baseline alongside Virginia.",
      dashboard_product_id: "Astute-class",
    },
    {
      name: "Yasen-M class (Project 885M)",
      manufacturer: "Sevmash (Russia)",
      summary: "Russian nuclear-powered cruise missile submarine (SSGN). Carries 32 Kalibr/Oniks/Zircon missiles in 8 × VLS clusters; considered Russia's most capable fast-attack boat. 2 commissioned, 5 under construction.",
      dashboard_product_id: "Yasen-M",
    },
    {
      name: "Type 093B Shang-II class",
      manufacturer: "Huludao Shipyard (China)",
      summary: "PLAN nuclear-powered attack submarine. Estimated 6 in service. Significantly quieter than Type 093A; adds VLS capability. Details remain classified; performance assessed as below Virginia-class.",
      dashboard_product_id: "Type 093B",
    },
  ],

  last_updated: "2025-05-20",
};

export default virginiaClass;
