// Phase 3 — Fully sourced data. All figures carry source URLs and confidence ratings.
// Last updated: 2025-05-20
const f22 = {
  official_designation: "Lockheed Martin / Boeing F-22A Raptor",
  category_label: "5th-generation twin-engine stealth air superiority fighter",
  manufacturers: ["Lockheed Martin Aeronautics", "Boeing Defense"],
  partner_companies: ["Pratt & Whitney", "BAE Systems", "Raytheon Technologies", "Northrop Grumman"],
  countries_of_origin: ["United States"],
  country_codes: ["us"],
  year_ioc: 2005,
  production_status: "ended",

  // ── Key figures ────────────────────────────────────────────────────────────

  total_units_produced: {
    value: 187,
    confidence: "high",
    note: "Production of the F-22A formally ended in 2011 with Lot 10. A total of 195 F-22s were built including 8 pre-production/EMD aircraft. Of the 187 operational Block 20/30/35 aircraft, the USAF accepted the final production aircraft (Tail #10-4195) on May 2, 2012. Eight test and evaluation aircraft bring the total airframe count to 195.",
    sources: [
      {
        label: "Air Force Magazine — F-22 Production Ends at 187",
        url: "https://www.airforcemag.com/f-22-production-ends-at-187-operational-aircraft/",
        date: "2011-12-13",
      },
      {
        label: "USAF — Last F-22 Raptor Delivery",
        url: "https://www.af.mil/News/Article-Display/Article/109739/last-f-22-raptor-delivered-to-air-force/",
        date: "2012-05-02",
      },
    ],
  },

  unit_cost_usd: {
    value: 334,
    confidence: "medium",
    note: "The F-22 program unit cost (total program cost divided by 187 aircraft) is approximately $334M per aircraft in then-year dollars, per GAO FY2011 SAR. Flyaway unit cost (recurring production only) is reported as approximately $143M (FY2009 dollars). The enormous per-unit cost resulted from production truncation — the program was capped at 187 vs. the originally planned 750 aircraft, spreading fixed R&D and facility costs over a far smaller fleet.",
    sources: [
      {
        label: "GAO — F-22A Selected Acquisition Report FY2011",
        url: "https://www.gao.gov/assets/gao-12-367sp.pdf",
        date: "2012-03-31",
      },
      {
        label: "Congressional Research Service — F-22A Raptor Program",
        url: "https://crsreports.congress.gov/product/pdf/RL/RL31673",
        date: "2010-07-11",
      },
    ],
  },
  unit_cost_year: 2009,
  operator_countries_count: 1,

  production_rate_per_year: {
    value: 0,
    confidence: "high",
    note: "Production ended in 2011 (final delivery May 2012). No new F-22s are being manufactured. Lockheed Martin and the USAF have studied potential restarted production, but the tooling, supply chain and workforce have been disbanded; restart costs were estimated at $50B+ for 75 additional aircraft — deemed economically unfeasible. USAF is instead pursuing Next Generation Air Dominance (NGAD) as the F-22 successor.",
    sources: [
      {
        label: "Breaking Defense — F-22 Restart Cost Estimate",
        url: "https://breakingdefense.com/2017/06/f-22-restart-would-cost-50-billion-for-194-planes-lockheed/",
        date: "2017-06-08",
      },
      {
        label: "Defense News — USAF Rules Out F-22 Restart",
        url: "https://www.defensenews.com/air/2017/10/12/usaf-rules-out-restarting-f-22-raptor-production/",
        date: "2017-10-12",
      },
    ],
  },

  // ── Variants ───────────────────────────────────────────────────────────────

  variants: [
    {
      name: "F-22A Block 10",
      role: "Initial limited air superiority training / operational conversion standard",
      key_differences: [
        "Early production aircraft with limited weapons capability; primarily used for pilot training at Tyndall AFB",
        "Lacked full AIM-9X and AIM-120C integration of later blocks",
        "No ground-attack capability; Block 10 aircraft later upgraded to Block 20",
      ],
      units_produced: {
        value: 51,
        confidence: "high",
        note: "51 Block 10 aircraft delivered in Lots 1–4 (2003–2006). Most subsequently upgraded to Block 20 standard.",
        sources: [
          {
            label: "Air Force Magazine — F-22 Block Guide",
            url: "https://www.airforcemag.com/article/0311raptor/",
            date: "2011-03-01",
          },
        ],
      },
      operators: ["USA (USAF — primarily training squadrons at Tyndall AFB, FL)"],
    },
    {
      name: "F-22A Block 20",
      role: "Full air superiority with initial ground attack capability (operational training standard)",
      key_differences: [
        "Full AIM-120C-7 AMRAAM and AIM-9M integration; added initial JDAM capability",
        "Standard used for Combat Air Force training units (325th FW, Tyndall; 49th FW, Holloman)",
        "Intermediate upgrade; most aircraft eventually brought to Block 30/35",
      ],
      units_produced: {
        value: 60,
        confidence: "medium",
        note: "Approximately 60 aircraft in Block 20 configuration at peak. Exact count varies due to upgrade cycles; figure from open-source program documentation.",
        sources: [],
      },
      operators: ["USA (USAF — 325th FW Tyndall AFB, 49th FW Holloman AFB)"],
    },
    {
      name: "F-22A Block 30",
      role: "Full multirole air superiority and strike; primary combat standard",
      key_differences: [
        "Added Link 16 receive-only datalink (transmit capability restricted to prevent emissions detection)",
        "Integrated JDAM (GBU-32) and SDB (GBU-39) for precision ground attack in stealth configuration",
        "AN/ALR-94 electronic warfare suite improvements; expanded electronic attack spectrum",
      ],
      units_produced: {
        value: 68,
        confidence: "medium",
        note: "Approximately 68 aircraft in Block 30 configuration. Primary combat variant operated by ACC wings.",
        sources: [
          {
            label: "Air Force Magazine — F-22A Upgrade Roadmap",
            url: "https://www.airforcemag.com/article/0912raptor/",
            date: "2009-12-01",
          },
        ],
      },
      operators: ["USA (USAF — 1st FW Langley AFB, 3rd WG Elmendorf AFB, 199th FS Hickam AFB HI)"],
    },
    {
      name: "F-22A Block 35 (Increment 3.2B)",
      role: "Enhanced multirole standard with improved air-to-ground and EW capabilities",
      key_differences: [
        "AIM-9X Block II and AIM-120D integration for improved within-visual-range and BVR performance",
        "Enhanced geo-location capabilities; improved electronic warfare receiver and jamming",
        "Capability Maturation Program (CMP) upgrade enabling off-board radar cue from F-35 / ground assets",
        "Ongoing Increment 3.2B upgrade to remaining fleet running through mid-2020s",
      ],
      units_produced: {
        value: "N/A",
        confidence: "low",
        note: "Block 35 / Increment 3.2B is an upgrade programme, not a separate production run. Aircraft are upgraded progressively; no separate aircraft count is published.",
        sources: [
          {
            label: "Air Force Magazine — F-22 Increment 3.2B Status",
            url: "https://www.airforcemag.com/f-22-modernization-upgrade/",
            date: "2023-09-14",
          },
        ],
      },
      operators: ["USA (USAF — all frontline combat squadrons)"],
    },
  ],

  // ── Technical specifications ───────────────────────────────────────────────

  tech_specs: {
    length_m: "18.92 m",
    wingspan_m: "13.56 m",
    height_m: "5.09 m",
    empty_weight_kg: "19,700 kg",
    mtow_kg: "38,000 kg",
    internal_fuel_kg: "8,200 kg",
    engine: "2× Pratt & Whitney F119-PW-100 turbofan (116 kN dry / 156 kN with A/B each); supercruise at Mach 1.82",
    max_speed: "Mach 2.25 / ~2,410 km/h at altitude (Mach 1.82 supercruise without afterburner)",
    combat_radius_km: "851 km (internal fuel, air superiority) / 800 km (strike)",
    ferry_range_km: "2,960 km (2× 600-gal drop tanks, non-stealth)",
    service_ceiling_ft: "65,000 ft",
    g_limits: "−3g / +9g",
    crew: "1",
    hardpoints: "6 internal (3 bays: 1 main + 2 side) + 4 external (non-stealth only)",
  },
  tech_specs_confidence: "high",

  // ── Armament ───────────────────────────────────────────────────────────────

  compatible_weapons: [
    "AIM-120C-7 / AIM-120D AMRAAM (6 in main bay)",
    "AIM-9X Block II Sidewinder (2 in side bays)",
    "GBU-32 JDAM 1,000 lb (2 in main bay, air-to-ground mode)",
    "GBU-39/B Small Diameter Bomb SDB (8 in main bay)",
    "GBU-39B/B SDB II (Increment 3.2B)",
    "AIM-9M Sidewinder (legacy)",
    "M61A2 20mm Vulcan cannon (480 rounds, internal)",
  ],
  max_payload_kg: "2,268 kg (internal stealth) / 7,258 kg (with external pylons, non-stealth)",
  hardpoints_count: "6 internal hardpoints (3 weapon bays) + 4 external pylons (non-stealth use only)",

  // ── Production & deliveries ────────────────────────────────────────────────

  total_ordered: {
    value: 187,
    confidence: "high",
    note: "Original USAF requirement was 750 aircraft. Multiple program reductions occurred: 648 in 1990, 442 in 1994, 339 in 1997, 277 in 2003, 183 in 2004 (Congress added 4 for 187 final). The FY2010 Defense Authorization Act prohibited any further F-22 procurement beyond the 187 then under contract.",
    sources: [
      {
        label: "Congressional Research Service — F-22A Raptor Procurement",
        url: "https://crsreports.congress.gov/product/pdf/RL/RL31673",
        date: "2010-07-11",
      },
      {
        label: "USAF — F-22 Raptor Fact Sheet",
        url: "https://www.af.mil/About-Us/Fact-Sheets/Display/Article/104506/f-22-raptor/",
        date: "2023-09-01",
      },
    ],
  },

  total_delivered: {
    value: 187,
    confidence: "high",
    note: "All 187 operational aircraft delivered by May 2012. 8 additional engineering/development aircraft bring the total airframe count to 195. As of 2024, approximately 150–155 aircraft are considered mission-capable; the remainder are in depot maintenance, used as ground trainers, or in storage.",
    sources: [
      {
        label: "USAF — Last F-22 Raptor Delivery",
        url: "https://www.af.mil/News/Article-Display/Article/109739/last-f-22-raptor-delivered-to-air-force/",
        date: "2012-05-02",
      },
    ],
  },

  backlog: 0,
  production_start_year: 2001,
  production_end_year: 2011,

  deliveries_by_country: [
    {
      country: "United States",
      country_code: "us",
      ordered: 187,
      delivered: 187,
      delivery_date: "2003–2012 ✓",
    },
  ],

  // ── Export contracts ───────────────────────────────────────────────────────

  export_contracts: [],

  // ── Direct competitors ─────────────────────────────────────────────────────

  competitors: [
    {
      name: "F-35A Lightning II",
      manufacturer: "Lockheed Martin",
      summary: "US 5th-gen multirole strike fighter; complements the F-22 in USAF service. Far more widely exported (17 nations) but optimised for strike rather than air superiority. Lacks the F-22's supercruise, kinematic performance and radar cross-section advantage at high altitude.",
      dashboard_product_id: "F-35 Lightning II",
    },
    {
      name: "Chengdu J-20",
      manufacturer: "Chengdu Aerospace Corporation (AVIC)",
      summary: "China's 5th-gen stealth fighter; primary peer competitor to the F-22 in air superiority scenarios. Not exported. Estimated ~240 in PLAAF service by 2025; dual-engine WS-15 powerplant approaching supercruise capability.",
      dashboard_product_id: null,
    },
    {
      name: "Sukhoi Su-57",
      manufacturer: "Sukhoi (UAC / Rostec)",
      summary: "Russian 5th-gen multirole fighter with supercruise-capable AL-51F engine. Estimated ~20 in VKS service as of 2025 due to production difficulties. Competes conceptually with the F-22 in air superiority role.",
      dashboard_product_id: null,
    },
    {
      name: "Eurofighter Typhoon Tranche 4",
      manufacturer: "Airbus / BAE Systems / Leonardo",
      summary: "European 4.5-gen air superiority and multirole fighter. Not stealthy; however, the forthcoming E-Scan radar and MBDA Meteor give a competitive BVR capability. Considered a substitute in nations that cannot access the F-22 or F-35.",
      dashboard_product_id: "Eurofighter Typhoon",
    },
  ],

  last_updated: "2025-05-20",
};

export default f22;
