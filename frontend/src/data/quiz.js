// ── Defense Knowledge Quiz — static question bank ─────────────────────────────
// Hand-written questions, grouped by CATEGORY (matching the app's data domains)
// and by LEVEL of difficulty. Each question has 4 options, the index of the
// correct answer, and a short explanation shown after answering.
//
// This is a frontend-only prototype: nothing is saved to the backend. The score
// is computed in the browser at the end of the session and broken down by
// category and by level.

// The six knowledge categories — they mirror the dashboard's data sections.
export const QUIZ_CATEGORIES = [
  { value: "market",       label: "Companies & Market" },
  { value: "ma",           label: "M&A Activity" },
  { value: "contracts",    label: "Contracts" },
  { value: "products",     label: "Products & Systems" },
  { value: "regulations",  label: "Regulations" },
  { value: "expenditures", label: "Defense Budgets" },
];

// The three difficulty levels.
export const QUIZ_LEVELS = [
  { value: "beginner",     label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "expert",       label: "Expert" },
];

// Helper lookups so the UI can show a human label from a stored value.
export const CATEGORY_LABEL = Object.fromEntries(QUIZ_CATEGORIES.map((c) => [c.value, c.label]));
export const LEVEL_LABEL = Object.fromEntries(QUIZ_LEVELS.map((l) => [l.value, l.label]));

export const QUIZ_QUESTIONS = [
  // ── Companies & Market ──────────────────────────────────────────────────────
  {
    id: "market-1",
    category: "market",
    level: "beginner",
    question: "In which country is Lockheed Martin headquartered?",
    options: ["United States", "United Kingdom", "France", "Germany"],
    answer: 0,
    explanation: "Lockheed Martin is a U.S. company based in Bethesda, Maryland — the world's largest defense contractor by revenue.",
  },
  {
    id: "market-2",
    category: "market",
    level: "beginner",
    question: "The stock ticker 'LMT' belongs to which company?",
    options: ["Leonardo", "Lockheed Martin", "L3Harris", "Leidos"],
    answer: 1,
    explanation: "'LMT' is the New York Stock Exchange ticker for Lockheed Martin.",
  },
  {
    id: "market-3",
    category: "market",
    level: "intermediate",
    question: "Which company manufactures the Rafale fighter jet?",
    options: ["Airbus", "Saab", "Dassault Aviation", "Leonardo"],
    answer: 2,
    explanation: "The Rafale is built by France's Dassault Aviation.",
  },
  {
    id: "market-4",
    category: "market",
    level: "intermediate",
    question: "BAE Systems, one of the largest defense firms in the world, is based in which country?",
    options: ["United States", "United Kingdom", "Italy", "Sweden"],
    answer: 1,
    explanation: "BAE Systems is a British multinational headquartered in London.",
  },
  {
    id: "market-5",
    category: "market",
    level: "expert",
    question: "RTX Corporation (formerly Raytheon Technologies) was formed in 2020 by the merger of Raytheon and which company?",
    options: ["United Technologies", "Rockwell Collins", "Pratt & Whitney", "Boeing"],
    answer: 0,
    explanation: "Raytheon merged with United Technologies in 2020. (Pratt & Whitney and Rockwell Collins were already part of UTC.)",
  },

  // ── M&A Activity ────────────────────────────────────────────────────────────
  {
    id: "ma-1",
    category: "ma",
    level: "beginner",
    question: "In business, what does 'M&A' stand for?",
    options: ["Markets & Assets", "Mergers & Acquisitions", "Manufacturing & Assembly", "Military & Aerospace"],
    answer: 1,
    explanation: "M&A means Mergers and Acquisitions — deals where companies combine or one buys another.",
  },
  {
    id: "ma-2",
    category: "ma",
    level: "intermediate",
    question: "In an acquisition, the company being bought is usually called the...?",
    options: ["Acquirer", "Target", "Broker", "Underwriter"],
    answer: 1,
    explanation: "The buyer is the 'acquirer'; the company being purchased is the 'target'.",
  },
  {
    id: "ma-3",
    category: "ma",
    level: "intermediate",
    question: "What does 'deal value' typically describe in an M&A transaction?",
    options: [
      "The yearly profit of the target",
      "The total price paid to acquire the target",
      "The number of employees transferred",
      "The tax owed on the deal",
    ],
    answer: 1,
    explanation: "Deal value is the headline price the acquirer agrees to pay for the target company.",
  },
  {
    id: "ma-4",
    category: "ma",
    level: "expert",
    question: "United Technologies merged with which company in 2020 to create Raytheon Technologies?",
    options: ["Raytheon Company", "Northrop Grumman", "General Dynamics", "Honeywell"],
    answer: 0,
    explanation: "United Technologies and the Raytheon Company merged in April 2020, forming Raytheon Technologies (now RTX).",
  },

  // ── Contracts ───────────────────────────────────────────────────────────────
  {
    id: "contracts-1",
    category: "contracts",
    level: "beginner",
    question: "Which fighter aircraft is the most expensive weapons program in U.S. history?",
    options: ["F-16 Fighting Falcon", "F-22 Raptor", "F-35 Lightning II", "F/A-18 Hornet"],
    answer: 2,
    explanation: "The F-35 Lightning II program, led by Lockheed Martin, is the costliest weapons program ever, valued in the trillions over its lifetime.",
  },
  {
    id: "contracts-2",
    category: "contracts",
    level: "intermediate",
    question: "The Patriot system, often mentioned in defense contracts, is primarily used for...?",
    options: ["Naval transport", "Air and missile defense", "Electronic jamming", "Satellite launch"],
    answer: 1,
    explanation: "The Patriot is a surface-to-air missile system used for air and missile defense, made by RTX (Raytheon).",
  },
  {
    id: "contracts-3",
    category: "contracts",
    level: "intermediate",
    question: "When a contract status is listed as 'awarded', it means...?",
    options: [
      "The contract is still open for bids",
      "A supplier has officially won the contract",
      "The contract was cancelled",
      "The contract is under legal dispute",
    ],
    answer: 1,
    explanation: "'Awarded' means the contracting authority has selected and committed to a supplier.",
  },
  {
    id: "contracts-4",
    category: "contracts",
    level: "expert",
    question: "The Virginia-class, subject of one of the largest U.S. Navy contracts, refers to what type of vessel?",
    options: [
      "Aircraft carrier",
      "Nuclear-powered attack submarine",
      "Guided-missile destroyer",
      "Amphibious assault ship",
    ],
    answer: 1,
    explanation: "Virginia-class boats are nuclear-powered fast-attack submarines built by General Dynamics Electric Boat and Huntington Ingalls.",
  },

  // ── Products & Systems ──────────────────────────────────────────────────────
  {
    id: "products-1",
    category: "products",
    level: "beginner",
    question: "Israel's 'Iron Dome' is a system designed to...?",
    options: [
      "Launch satellites",
      "Intercept short-range rockets and artillery",
      "Detect submarines",
      "Refuel aircraft in flight",
    ],
    answer: 1,
    explanation: "Iron Dome, made by Rafael, intercepts short-range rockets, artillery and mortar shells.",
  },
  {
    id: "products-2",
    category: "products",
    level: "beginner",
    question: "The Bayraktar TB2 is a famous example of which kind of system?",
    options: ["Tank", "Combat drone (UCAV)", "Submarine", "Radar station"],
    answer: 1,
    explanation: "The Bayraktar TB2, made by Turkey's Baykar, is an armed unmanned combat aerial vehicle (drone).",
  },
  {
    id: "products-3",
    category: "products",
    level: "intermediate",
    question: "Which company manufactures the K9 Thunder self-propelled howitzer?",
    options: ["Hanwha", "Rheinmetall", "Nexter", "Hyundai Rotem"],
    answer: 0,
    explanation: "The K9 Thunder artillery system is built by South Korea's Hanwha (Hanwha Aerospace / Defense).",
  },
  {
    id: "products-4",
    category: "products",
    level: "expert",
    question: "The B-21 Raider, a next-generation stealth bomber, is developed by which company?",
    options: ["Boeing", "Lockheed Martin", "Northrop Grumman", "General Dynamics"],
    answer: 2,
    explanation: "The B-21 Raider is developed by Northrop Grumman for the U.S. Air Force.",
  },

  // ── Regulations ─────────────────────────────────────────────────────────────
  {
    id: "regulations-1",
    category: "regulations",
    level: "beginner",
    question: "ITAR, a key set of arms-export rules, comes from which country?",
    options: ["United States", "France", "China", "Russia"],
    answer: 0,
    explanation: "ITAR (International Traffic in Arms Regulations) is U.S. legislation controlling the export of defense articles.",
  },
  {
    id: "regulations-2",
    category: "regulations",
    level: "intermediate",
    question: "What does the acronym 'ITAR' stand for?",
    options: [
      "International Trade and Arms Rules",
      "International Traffic in Arms Regulations",
      "Integrated Tactical Armament Registry",
      "International Treaty on Arms Reduction",
    ],
    answer: 1,
    explanation: "ITAR stands for International Traffic in Arms Regulations, administered by the U.S. State Department.",
  },
  {
    id: "regulations-3",
    category: "regulations",
    level: "expert",
    question: "In defense trade, an 'offset' obligation requires the seller to...?",
    options: [
      "Lower the price below cost",
      "Provide economic benefits back to the buyer's country",
      "Pay an export tax to its own government",
      "Share the weapon's source code publicly",
    ],
    answer: 1,
    explanation: "An offset is industrial or economic compensation (local jobs, tech transfer, investment) the supplier must give the buyer country as a condition of a major arms sale.",
  },

  // ── Defense Budgets ─────────────────────────────────────────────────────────
  {
    id: "expenditures-1",
    category: "expenditures",
    level: "beginner",
    question: "Which country has the largest defense budget in the world?",
    options: ["China", "Russia", "United States", "India"],
    answer: 2,
    explanation: "The United States has by far the largest military budget, exceeding the next several countries combined.",
  },
  {
    id: "expenditures-2",
    category: "expenditures",
    level: "intermediate",
    question: "NATO's long-standing guideline asks members to spend what share of GDP on defense?",
    options: ["1%", "2%", "5%", "10%"],
    answer: 1,
    explanation: "NATO's guideline is that member states spend at least 2% of GDP on defense.",
  },
  {
    id: "expenditures-3",
    category: "expenditures",
    level: "expert",
    question: "SIPRI, often cited for defense-spending figures, is an institute that tracks...?",
    options: [
      "Stock market indices",
      "Military expenditure and arms transfers",
      "Cybersecurity incidents",
      "Oil prices",
    ],
    answer: 1,
    explanation: "SIPRI (Stockholm International Peace Research Institute) is the leading source for global military spending and arms-transfer data.",
  },
];
