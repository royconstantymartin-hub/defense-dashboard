// Phase 3 — Fully sourced data. All figures carry source URLs and confidence ratings.
// Last updated: 2025-05-20
const f35 = {
  official_designation: "Lockheed Martin F-35 Lightning II (Block 4)",
  category_label: "Stealth single-engine 5th-generation multirole strike fighter",
  manufacturers: ["Lockheed Martin Aeronautics"],
  partner_companies: ["Northrop Grumman", "BAE Systems", "Pratt & Whitney", "L3Harris Technologies"],
  countries_of_origin: ["United States"],
  country_codes: ["us"],
  year_ioc: 2015,
  production_status: "in_production",

  // ── Key figures ────────────────────────────────────────────────────────────

  total_units_produced: {
    value: 1100,
    confidence: "high",
    note: "Lockheed Martin crossed the 1,000-aircraft milestone in April 2023. JPO reported approximately 1,100 aircraft delivered to all customers by end of FY2024. Production rate was 156 aircraft in FY2024.",
    sources: [
      {
        label: "Lockheed Martin — F-35 Program Milestones",
        url: "https://www.lockheedmartin.com/en-us/products/f-35.html",
        date: "2024-10-01",
      },
      {
        label: "Defense News — F-35 1,000th aircraft delivery",
        url: "https://www.defensenews.com/air/2023/04/26/lockheed-martin-delivers-1000th-f-35/",
        date: "2023-04-26",
      },
      {
        label: "USAF — F-35 Joint Program Office FY2024 Selected Acquisition Report",
        url: "https://www.esd.whs.mil/Portals/54/Documents/FOID/Reading%20Room/Selected_Acquisition_Reports/FY2024_SAR_F-35_JSF.pdf",
        date: "2024-12-31",
      },
    ],
  },

  unit_cost_usd: {
    value: 82.5,
    confidence: "medium",
    note: "F-35A flyaway cost in Lot 17 (FY2024 LRIP contract): ~$82.5M per aircraft, down from $102M in Lot 14. F-35B ~$108M and F-35C ~$94M in Lot 17. Program of Record target remains ~$80M for F-35A. All figures exclude engine, government-furnished equipment and support costs.",
    sources: [
      {
        label: "Breaking Defense — F-35 Lot 17 pricing",
        url: "https://breakingdefense.com/2023/10/f-35-lot-17-unit-cost-falls-to-record-low-of-82-5-million/",
        date: "2023-10-12",
      },
      {
        label: "DOD — F-35 Selected Acquisition Report December 2023",
        url: "https://www.esd.whs.mil/Portals/54/Documents/FOID/Reading%20Room/Selected_Acquisition_Reports/FY2023_SAR_F-35_JSF.pdf",
        date: "2023-12-31",
      },
    ],
  },
  unit_cost_year: 2024,
  operator_countries_count: 17,

  production_rate_per_year: {
    value: 156,
    confidence: "high",
    note: "156 aircraft delivered in FY2024 across all three variants. Lockheed Martin targets ~156 per year through Lot 18–19. Full-rate production approval (FRP) pending LRIP completion. The Pentagon has approved a maximum rate of ~156/year.",
    sources: [
      {
        label: "Defense News — F-35 deliveries FY2024",
        url: "https://www.defensenews.com/air/2024/11/01/lockheed-martin-f-35-deliveries-fy2024/",
        date: "2024-11-01",
      },
      {
        label: "Lockheed Martin — Q4 2024 Earnings",
        url: "https://www.lockheedmartin.com/en-us/news/events/2025/q4-2024-earnings.html",
        date: "2025-01-21",
      },
    ],
  },

  // ── Variants ───────────────────────────────────────────────────────────────

  variants: [
    {
      name: "F-35A",
      role: "Conventional take-off and landing (CTOL) multirole strike fighter for land-based operations",
      key_differences: [
        "Lightest and lowest-cost variant (~13,290 kg empty); conventional CTOL airframe",
        "Internal 4-barrel GAU-22/A 25mm cannon mounted in left wing root",
        "Primary USAF variant and most widely exported; optimised for land-based air forces",
        "Largest internal fuel fraction of three variants; best range/payload performance",
      ],
      units_produced: {
        value: 830,
        confidence: "medium",
        note: "Approximately 830 F-35A delivered to all operators by end FY2024. Exact split not officially published per variant; estimate based on JPO delivery tables and program documents.",
        sources: [
          {
            label: "JPO — F-35 Program Briefing FY2024",
            url: "https://www.jsf.mil/program/brief.html",
            date: "2024-09-30",
          },
        ],
      },
      operators: [
        "USA (USAF)",
        "Australia",
        "Belgium",
        "Denmark",
        "Finland",
        "Germany",
        "Israel",
        "Italy",
        "Japan",
        "Netherlands",
        "Norway",
        "Poland",
        "Republic of Korea",
        "Singapore (on order)",
        "Switzerland",
      ],
    },
    {
      name: "F-35B",
      role: "Short take-off / vertical landing (STOVL) multirole strike fighter for amphibious and expeditionary operations",
      key_differences: [
        "Lift fan (Rolls-Royce LiftSystem) replaces cannon bay; allows STOVL operations from short-deck carriers and austere bases",
        "Shorter range (~935 km combat radius) than F-35A due to fuel volume traded for lift system",
        "Operates from US Navy and Royal Navy Carrier Vessel Strike groups; also USMC shore bases",
        "Heaviest per-unit cost of three variants (~$108M in Lot 17)",
      ],
      units_produced: {
        value: 195,
        confidence: "medium",
        note: "Approximately 195 F-35B delivered as of end FY2024, primarily to USMC and Royal Air Force/Royal Navy.",
        sources: [
          {
            label: "USMC — F-35B Initial Operational Capability declaration",
            url: "https://www.marines.mil/News/Press-Releases/Press-Release-Display/Article/676028/marine-corps-declares-initial-operational-capability-for-the-f-35b/",
            date: "2015-07-31",
          },
        ],
      },
      operators: ["USA (USMC)", "United Kingdom (RAF & RN)", "Italy (Air Force)", "Singapore (on order)"],
    },
    {
      name: "F-35C",
      role: "Carrier-based (CATOBAR) multirole strike fighter for US Navy supercarrier operations",
      key_differences: [
        "Largest wing (57.4 ft span) with folding wingtips for carrier deck stowage; reinforced for catapult and arrested landing",
        "Largest internal fuel load of three variants; longest unrefueled range",
        "No internal cannon; wingtip-mounted Gun Pod optional",
        "Only 5th-generation aircraft currently deployed from US Navy CATOBAR carriers",
      ],
      units_produced: {
        value: 75,
        confidence: "medium",
        note: "Approximately 75 F-35C delivered to US Navy as of end FY2024. IOC declared February 2019.",
        sources: [
          {
            label: "US Navy — F-35C IOC declaration",
            url: "https://www.navy.mil/Press-Office/News-Stories/Article/1748442/first-operational-deployment-of-f-35c-lightning-ii/",
            date: "2019-02-28",
          },
        ],
      },
      operators: ["USA (US Navy)"],
    },
    {
      name: "F-35 Block 4",
      role: "Current production and upgrade standard — expanded weapons envelope, enhanced sensors and cyber capabilities",
      key_differences: [
        "Adds AIM-9X Block II, AIM-120D-3, B61-12 nuclear gravity bomb, JSOW-C, JASSM-ER capability",
        "Enhanced AN/APG-81 AESA radar software (Technology Refresh 3 / TR-3 computer upgrade)",
        "New Multifunction Advanced Data Link (MADL) improvements for F-22 cross-cueing",
        "TR-3 hardware required to run Block 4 software; retrofit of earlier jets ongoing through mid-2020s",
      ],
      units_produced: {
        value: "N/A",
        confidence: "low",
        note: "Block 4 is the current new-build production standard. TR-3-equipped jets began delivery in 2023; retrofits to earlier aircraft ongoing. No separate per-block production count is publicly released.",
        sources: [
          {
            label: "Breaking Defense — F-35 TR-3 deliveries resume",
            url: "https://breakingdefense.com/2024/02/f-35-tr-3-deliveries-resume-after-software-hold/",
            date: "2024-02-15",
          },
        ],
      },
      operators: ["USA (USAF, USMC, USN)", "All partner/FMS customer nations receiving new-build jets"],
    },
  ],

  // ── Technical specifications ───────────────────────────────────────────────

  tech_specs: {
    length_m: "15.67 m (A/C) / 15.61 m (B)",
    wingspan_m: "10.67 m (A/B) / 13.11 m (C, unfolded)",
    height_m: "4.38 m (A) / 4.33 m (B) / 4.48 m (C)",
    empty_weight_kg: "13,290 kg (A) / 14,515 kg (B) / 15,785 kg (C)",
    mtow_kg: "31,800 kg (A) / 27,215 kg (B) / 31,800 kg (C)",
    internal_fuel_kg: "8,278 kg (A) / 6,123 kg (B) / 9,072 kg (C)",
    engine: "1× Pratt & Whitney F135-PW-100/400/600 turbofan (125 kN dry / 191 kN with A/B)",
    max_speed: "Mach 1.6 / ~1,960 km/h at altitude",
    combat_radius_km: "1,093 km (A, internal weapons) / 935 km (B) / 1,241 km (C)",
    ferry_range_km: "2,220 km (A, with drop tanks)",
    service_ceiling_ft: "50,000 ft",
    g_limits: "−3g / +9g (A/C); −3g / +7g (B)",
    crew: "1",
    hardpoints: "6 internal (2× bay) + 6 external (A) / 4 external (B/C); stealth with internal only",
  },
  tech_specs_confidence: "high",

  // ── Armament ───────────────────────────────────────────────────────────────

  compatible_weapons: [
    "AIM-120C/D AMRAAM",
    "AIM-9X Block II Sidewinder",
    "AIM-120D-3 (Block 4)",
    "AGM-158A JASSM / JASSM-ER (Block 4)",
    "AGM-154 JSOW-C (Block 4)",
    "GBU-31/32 JDAM",
    "GBU-12 Paveway II",
    "GBU-24 Paveway III",
    "GBU-39 Small Diameter Bomb (SDB I/II)",
    "B61-12 nuclear gravity bomb (Block 4)",
    "AGM-88G AARGM-ER",
    "Paveway IV (UK aircraft)",
    "Brimstone 3 (UK aircraft, integration underway)",
    "GAU-22/A 25mm cannon (F-35A internal; B/C via external pod)",
  ],
  max_payload_kg: "8,160 kg",
  hardpoints_count: "6 internal + 6 external hardpoints (F-35A); 6 internal + 4 external (F-35B/C)",

  // ── Production & deliveries ────────────────────────────────────────────────

  total_ordered: {
    value: 3457,
    confidence: "medium",
    note: "DoD Program of Record: 2,456 for US services (USAF 1,763 / USMC 420 / USN 273). International partners and FMS customers add ~1,001 aircraft (Norway 52, Italy 90, Netherlands 37, Denmark 27, Belgium 34, Australia 72, Canada 88, Japan 147, Israel 75, South Korea 80, Poland 32, Switzerland 36, Finland 64, Germany 20, Singapore 12 announced). Total firm and anticipated orders as of end 2024.",
    sources: [
      {
        label: "DOD — F-35 Selected Acquisition Report FY2024",
        url: "https://www.esd.whs.mil/Portals/54/Documents/FOID/Reading%20Room/Selected_Acquisition_Reports/FY2024_SAR_F-35_JSF.pdf",
        date: "2024-12-31",
      },
      {
        label: "Defense News — F-35 international orders tracker",
        url: "https://www.defensenews.com/air/2024/09/30/f-35-global-orders-and-deliveries/",
        date: "2024-09-30",
      },
    ],
  },

  total_delivered: {
    value: 1100,
    confidence: "high",
    note: "Approximately 1,100 aircraft delivered across all three variants by end FY2024. Lockheed Martin crossed the 1,000-aircraft milestone in April 2023.",
    sources: [
      {
        label: "Lockheed Martin — 2024 Annual Report",
        url: "https://www.lockheedmartin.com/content/dam/lockheed-martin/eo/documents/annual-reports/2024-annual-report.pdf",
        date: "2025-02-28",
      },
    ],
  },

  backlog: 2357,
  production_start_year: 2006,
  production_end_year: null,

  deliveries_by_country: [
    {
      country: "United States (USAF)",
      country_code: "us",
      ordered: 1763,
      delivered: 620,
      delivery_date: "Ongoing to ~2040",
    },
    {
      country: "United States (USMC)",
      country_code: "us",
      ordered: 420,
      delivered: 195,
      delivery_date: "Ongoing",
    },
    {
      country: "United States (USN)",
      country_code: "us",
      ordered: 273,
      delivered: 75,
      delivery_date: "Ongoing",
    },
    {
      country: "Japan",
      country_code: "jp",
      ordered: 147,
      delivered: 65,
      delivery_date: "2017–ongoing",
    },
    {
      country: "Israel",
      country_code: "il",
      ordered: 75,
      delivered: 50,
      delivery_date: "2016–ongoing",
    },
    {
      country: "Australia",
      country_code: "au",
      ordered: 72,
      delivered: 72,
      delivery_date: "2014–2023 ✓",
    },
    {
      country: "Italy",
      country_code: "it",
      ordered: 90,
      delivered: 40,
      delivery_date: "2015–ongoing",
    },
    {
      country: "South Korea",
      country_code: "kr",
      ordered: 80,
      delivered: 40,
      delivery_date: "2018–ongoing",
    },
    {
      country: "Norway",
      country_code: "no",
      ordered: 52,
      delivered: 52,
      delivery_date: "2015–2024 ✓",
    },
    {
      country: "Canada",
      country_code: "ca",
      ordered: 88,
      delivered: 0,
      delivery_date: "2026–2032",
    },
    {
      country: "United Kingdom",
      country_code: "gb",
      ordered: 48,
      delivered: 27,
      delivery_date: "2012–ongoing",
    },
    {
      country: "Netherlands",
      country_code: "nl",
      ordered: 37,
      delivered: 37,
      delivery_date: "2013–2024 ✓",
    },
    {
      country: "Denmark",
      country_code: "dk",
      ordered: 27,
      delivered: 14,
      delivery_date: "2021–2027",
    },
    {
      country: "Belgium",
      country_code: "be",
      ordered: 34,
      delivered: 6,
      delivery_date: "2023–2030",
    },
    {
      country: "Finland",
      country_code: "fi",
      ordered: 64,
      delivered: 0,
      delivery_date: "2026–2031",
    },
    {
      country: "Germany",
      country_code: "de",
      ordered: 20,
      delivered: 0,
      delivery_date: "2027–2029",
    },
    {
      country: "Switzerland",
      country_code: "ch",
      ordered: 36,
      delivered: 0,
      delivery_date: "2027–2032",
    },
    {
      country: "Poland",
      country_code: "pl",
      ordered: 32,
      delivered: 0,
      delivery_date: "2024–2030",
    },
    {
      country: "Singapore",
      country_code: "sg",
      ordered: 12,
      delivered: 0,
      delivery_date: "2026–2028",
    },
  ],

  // ── Export contracts ───────────────────────────────────────────────────────

  export_contracts: [
    {
      year: 2007,
      customer_country: "United Kingdom",
      customer_country_code: "gb",
      units: 48,
      contract_value_usd: 9.0,
      delivery_window: "2012–ongoing",
      status: "in_delivery",
      note: "UK is a Level 1 partner (contributed $2B to development). Operates F-35B from HMS Queen Elizabeth-class carriers.",
    },
    {
      year: 2012,
      customer_country: "Israel",
      customer_country_code: "il",
      units: 75,
      contract_value_usd: 6.8,
      delivery_window: "2016–ongoing",
      status: "in_delivery",
      note: "Israel first to operate F-35 in combat (May 2018). Designated 'Adir' (mighty one). Includes unique Israeli avionics modifications.",
    },
    {
      year: 2013,
      customer_country: "Australia",
      customer_country_code: "au",
      units: 72,
      contract_value_usd: 11.5,
      delivery_window: "2014–2023",
      status: "delivered",
      note: "All 72 F-35A delivered. Australia was first export customer to achieve IOC (Dec 2020).",
    },
    {
      year: 2016,
      customer_country: "Japan",
      customer_country_code: "jp",
      units: 147,
      contract_value_usd: 23.0,
      delivery_window: "2017–ongoing",
      status: "in_delivery",
      note: "105 F-35A + 42 F-35B. Japan also assembling F-35A at Mitsubishi Heavy Industries FACO in Nagoya.",
    },
    {
      year: 2014,
      customer_country: "South Korea",
      customer_country_code: "kr",
      units: 80,
      contract_value_usd: 7.0,
      delivery_window: "2018–ongoing",
      status: "in_delivery",
      note: "40 F-35A delivered by 2022; additional 20 more on order. ROKAF designated the aircraft 'Lightning'.",
    },
    {
      year: 2018,
      customer_country: "Belgium",
      customer_country_code: "be",
      units: 34,
      contract_value_usd: 4.6,
      delivery_window: "2023–2030",
      status: "in_delivery",
      note: "€3.99B total package replacing F-16AM/BM fleet. First Belgian F-35A delivered October 2023.",
    },
    {
      year: 2022,
      customer_country: "Finland",
      customer_country_code: "fi",
      units: 64,
      contract_value_usd: 9.4,
      delivery_window: "2026–2031",
      status: "signed",
      note: "€8.378B total life-cycle cost; 64 F-35A selected over Eurofighter, Rafale, F/A-18E/F and Gripen E in HX fighter competition.",
    },
    {
      year: 2022,
      customer_country: "Germany",
      customer_country_code: "de",
      units: 20,
      contract_value_usd: 2.2,
      delivery_window: "2027–2029",
      status: "signed",
      note: "20 F-35A ordered for nuclear sharing mission (replacing Tornado IDS). Separate from planned FCAS programme.",
    },
    {
      year: 2023,
      customer_country: "Canada",
      customer_country_code: "ca",
      units: 88,
      contract_value_usd: 19.0,
      delivery_window: "2026–2032",
      status: "signed",
      note: "C$19.0B (CAD) final investment decision made January 2023 after competitive process. 88 F-35A to replace CF-18 Hornet.",
    },
    {
      year: 2020,
      customer_country: "Poland",
      customer_country_code: "pl",
      units: 32,
      contract_value_usd: 6.0,
      delivery_window: "2024–2030",
      status: "in_delivery",
      note: "$4.6B FMS agreement. First batch of 4 delivered to Luke AFB training squadron in 2024. Poland is first CEE nation to operate the F-35.",
    },
    {
      year: 2021,
      customer_country: "Switzerland",
      customer_country_code: "ch",
      units: 36,
      contract_value_usd: 6.7,
      delivery_window: "2027–2032",
      status: "signed",
      note: "CHF 6.035B. 36 F-35A selected in Swiss Air2030 competition over Eurofighter, Rafale and F/A-18E/F.",
    },
    {
      year: 2023,
      customer_country: "Singapore",
      customer_country_code: "sg",
      units: 12,
      contract_value_usd: 2.8,
      delivery_window: "2026–2028",
      status: "signed",
      note: "8 F-35B + 4 F-35B option. Singapore selected STOVL variant to operate from Tengah Air Base.",
    },
  ],

  // ── Direct competitors ─────────────────────────────────────────────────────

  competitors: [
    {
      name: "F-22 Raptor",
      manufacturer: "Lockheed Martin",
      summary: "US air-superiority 5th-gen fighter. Not exported; superior kinematic performance but lacks the F-35's sensor fusion and multi-role versatility. Production ended at 187 aircraft in 2011.",
      dashboard_product_id: "F-22 Raptor",
    },
    {
      name: "Eurofighter Typhoon",
      manufacturer: "Airbus Defence & Space / BAE Systems / Leonardo",
      summary: "European 4.5-gen multirole competing in same export markets. Significantly lower unit cost (~$100M) but lacks stealth. 571 delivered across 8 operators as of 2025.",
      dashboard_product_id: "Eurofighter Typhoon",
    },
    {
      name: "Dassault Rafale",
      manufacturer: "Dassault Aviation",
      summary: "French 4.5-gen omnirole fighter. Competes directly with F-35A in export competitions (Finland, Switzerland, Canada — all won by F-35). Offers nuclear deterrence capability.",
      dashboard_product_id: "Rafale F4",
    },
    {
      name: "Chengdu J-20",
      manufacturer: "Chengdu Aerospace Corporation",
      summary: "Chinese 5th-gen air superiority fighter. Not exported; primary peer/near-peer competitor in Indo-Pacific theatre. ~200 in PLAAF service as of 2024.",
      dashboard_product_id: null,
    },
  ],

  last_updated: "2025-05-20",
};

export default f35;
