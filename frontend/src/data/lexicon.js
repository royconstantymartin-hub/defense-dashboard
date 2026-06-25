// ── Defense Lexicon — static reference content ────────────────────────────────
// Each entry powers both the index card (term, abbreviation, tldr) and its
// dedicated page (tldr, definition, examples, keyFacts, related, image).
//
// Images are NOT hardcoded. Each entry has a `wiki` field = the title of an
// English Wikipedia article. The detail page fetches that article's lead image
// at runtime from the public Wikipedia REST API, so images stay correct even if
// files are renamed. A clean fallback is shown if no image is available.

export const LEXICON_CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "trade", label: "Trade & Policy" },
  { value: "missiles", label: "Missiles & Munitions" },
  { value: "systems", label: "Systems & Sensors" },
  { value: "platforms", label: "Platforms" },
  { value: "doctrine", label: "Doctrine & Concepts" },
  { value: "industry", label: "Industry & Programs" },
];

export const LEXICON = [
  // ── Trade & Policy ─────────────────────────────────────────────────────────
  {
    slug: "offset",
    term: "Offset",
    abbreviation: "",
    category: "trade",
    tldr: "When a country buys big weapons, the seller has to give something back to its economy — like local jobs or factories — as part of the deal.",
    summary:
      "Industrial or economic compensation a foreign supplier must provide to a buyer government as a condition of a major arms sale.",
    definition: [
      "An offset is a contractual obligation under which a foreign defense supplier agrees to deliver economic benefits to the purchasing country in return for winning a major weapons contract. Offsets are a standard feature of cross-border arms deals because governments rarely buy big-ticket systems — fighters, frigates, air-defense batteries — without demanding that some of the money flow back into their own economy.",
      "Offsets are usually split into two families. 'Direct' offsets are tied to the product being sold: local assembly of the aircraft, in-country production of components, or transfer of maintenance and repair capability. 'Indirect' offsets are unrelated to the weapon itself and can include investment in civilian industry, technology transfer, training, or export assistance for local firms. The required offset value is often expressed as a percentage of the contract — commonly 50% to 100%, and sometimes more.",
      "For the buyer, offsets are a tool of industrial policy: they build a domestic defense base, create skilled jobs, and reduce long-term dependence on foreign suppliers. For the seller, they are a cost of market access — the price of beating competitors in a global tender. Critics argue offsets inflate prices, are hard to verify, and can mask corruption, which is why bodies such as the EU and WTO scrutinize them and many countries publish formal offset guidelines.",
    ],
    keyFacts: [
      { label: "Type", value: "Trade / industrial policy" },
      { label: "Typical value", value: "50–100%+ of contract" },
      { label: "Forms", value: "Direct & indirect" },
      { label: "Common in", value: "India, UAE, Saudi Arabia, Poland" },
    ],
    examples: [
      {
        title: "India's Rafale deal",
        description:
          "France's Dassault committed to a large offset obligation on India's 36-aircraft Rafale purchase, channeling investment and work into Indian industry under India's Defence Offset Guidelines.",
      },
      {
        title: "F-16 production in Poland & Turkey",
        description:
          "Lockheed Martin sales frequently include local co-production and component manufacturing as direct offsets, building partner-nation aerospace capacity.",
      },
    ],
    related: ["export-control", "foreign-military-sales", "fifth-generation-fighter"],
    wiki: "Dassault Rafale",
    imageAlt: "A Dassault Rafale fighter, the subject of major offset agreements",
  },
  {
    slug: "export-control",
    term: "Export Control",
    abbreviation: "ITAR / EAR",
    category: "trade",
    tldr: "Government rules that decide which military tech can be sold abroad and to whom — so dangerous gear doesn't reach the wrong hands.",
    summary:
      "Government rules that regulate which military and dual-use goods, software, and technical data may be sold abroad, and to whom.",
    definition: [
      "Export control is the body of law a government uses to decide whether sensitive goods, technology, software, and even technical know-how may leave the country and reach a foreign buyer. The purpose is to stop weapons and militarily useful technology from reaching adversaries, sanctioned states, terrorist groups, or programs of concern such as nuclear or missile proliferation.",
      "In the United States — the world's largest arms exporter — two regimes dominate. The International Traffic in Arms Regulations (ITAR), administered by the State Department, govern items on the U.S. Munitions List: dedicated military hardware and the associated technical data. The Export Administration Regulations (EAR), run by the Commerce Department, cover 'dual-use' items that have both civilian and military applications, such as advanced electronics, sensors, and machine tools.",
      "Compliance is strict and the penalties are severe — multimillion-dollar fines, loss of export privileges, and criminal charges. A key concept is the 'deemed export': simply sharing controlled technical data with a foreign national, even inside your own country, can count as an export requiring a license. Companies therefore build elaborate compliance programs, classify every product, screen customers against denied-party lists, and obtain licenses before shipping.",
      "Export control is also a foreign-policy instrument. Allied nations coordinate through arrangements like the Wassenaar Arrangement and the Missile Technology Control Regime, while sanctions regimes can switch off exports to a country overnight.",
    ],
    keyFacts: [
      { label: "US regimes", value: "ITAR (State), EAR (Commerce)" },
      { label: "Covers", value: "Hardware, software, technical data" },
      { label: "Key risk", value: "'Deemed exports' to foreign nationals" },
      { label: "Multilateral", value: "Wassenaar, MTCR" },
    ],
    examples: [
      {
        title: "ITAR-restricted components",
        description:
          "Many U.S.-made avionics and missile seekers are ITAR-controlled, meaning even allied buyers must obtain State Department approval and accept re-export restrictions.",
      },
      {
        title: "The F-22 was never exported",
        description:
          "The F-22 Raptor's technology was considered so sensitive that U.S. law banned its export entirely — a textbook case of export control shaping the market.",
      },
    ],
    related: ["offset", "end-user-certificate", "dual-use", "foreign-military-sales"],
    wiki: "Lockheed Martin F-22 Raptor",
    imageAlt: "The F-22 Raptor, whose technology was barred from export",
  },
  {
    slug: "end-user-certificate",
    term: "End-User Certificate",
    abbreviation: "EUC",
    category: "trade",
    tldr: "A signed promise saying who will really use the weapons, and that they won't be quietly passed on to someone else.",
    summary:
      "An official document certifying who will ultimately own and use exported arms, used to prevent illegal diversion.",
    definition: [
      "An End-User Certificate (EUC) is a document, usually issued or endorsed by the importing government, that states who the final recipient of an arms shipment will be and promises that the goods will not be transferred onward without permission. It is one of the core safeguards in the legal arms trade, designed to keep weapons from being diverted to embargoed states, insurgents, or the black market.",
      "Before approving an export license, the exporting government typically requires an EUC naming the end user, describing the goods and quantities, stating the intended use, and committing the buyer not to re-export the items without the original supplier's consent. This 'no re-transfer' clause is central: it lets the original seller keep control over where its weapons end up long after the sale.",
      "EUCs matter because diversion is a persistent problem. Forged or fraudulent certificates have repeatedly been used to route weapons to sanctioned destinations through a compliant third country acting as a front. Investigators and NGOs treat suspicious EUCs as a red flag for trafficking, and reforms have pushed for harder-to-forge documents, verification visits, and post-shipment checks.",
    ],
    keyFacts: [
      { label: "Issued by", value: "Importing government" },
      { label: "Purpose", value: "Prevent diversion / re-export" },
      { label: "Key clause", value: "No onward transfer without consent" },
      { label: "Framework", value: "Arms Trade Treaty" },
    ],
    examples: [
      {
        title: "Diversion via false EUCs",
        description:
          "Investigations into illicit arms flows have repeatedly found forged end-user certificates used to disguise the true (embargoed) destination of weapons shipments.",
      },
      {
        title: "Post-shipment verification",
        description:
          "Some exporters now conduct on-site checks to confirm delivered arms remain with the certified end user, deterring leakage to third parties.",
      },
    ],
    related: ["export-control", "offset", "foreign-military-sales"],
    wiki: "AK-47",
    imageAlt: "Small arms of the kind subject to end-user certification",
  },
  {
    slug: "foreign-military-sales",
    term: "Foreign Military Sales",
    abbreviation: "FMS",
    category: "trade",
    tldr: "The official, government-to-government way the U.S. sells weapons to allies — like a trusted middleman handling the whole deal.",
    summary:
      "A U.S. government program through which it sells defense equipment, services, and training to allied governments on a government-to-government basis.",
    definition: [
      "Foreign Military Sales (FMS) is the formal U.S. government program for selling American defense articles and services to allied and partner nations. Instead of a foreign government buying directly from a company like Lockheed Martin or Raytheon, the U.S. government acts as the intermediary: it signs the contract with the manufacturer on the buyer's behalf and manages the whole transaction.",
      "This government-to-government model has advantages for the buyer. They get the same pricing and contract terms as the U.S. military, oversight from the Department of Defense, and a structured path for training, spare parts, and long-term support. For the United States, FMS strengthens alliances, standardizes equipment among partners, and gives Washington visibility and leverage over where its most sensitive systems go.",
      "Major FMS cases for advanced systems must be notified to Congress, which can block a sale — making the program a foreign-policy tool as much as a commercial one. The alternative path, 'Direct Commercial Sales', lets a country buy straight from a company under an export license, with less government involvement. Together, FMS and DCS account for tens of billions of dollars in U.S. arms exports each year.",
    ],
    keyFacts: [
      { label: "Run by", value: "U.S. Department of Defense / State" },
      { label: "Model", value: "Government-to-government" },
      { label: "Oversight", value: "Congress can block major sales" },
      { label: "Alternative", value: "Direct Commercial Sales (DCS)" },
    ],
    examples: [
      {
        title: "Patriot & F-35 packages",
        description:
          "Large sales of Patriot air-defense systems and F-35 fighters to allies are frequently structured as FMS cases, bundling missiles, training and support.",
      },
      {
        title: "Congressional notification",
        description:
          "Big-ticket FMS deals are formally notified to Congress, which has occasionally delayed or pressured sales for policy reasons.",
      },
    ],
    related: ["export-control", "offset", "end-user-certificate"],
    wiki: "M1 Abrams",
    imageAlt: "An M1 Abrams tank, a system widely sold through FMS",
  },
  {
    slug: "dual-use",
    term: "Dual-Use Technology",
    abbreviation: "",
    category: "trade",
    tldr: "Stuff that's useful for both everyday life and war — like a drone that can film a wedding or drop a bomb.",
    summary:
      "Goods, software, and technology that have both legitimate civilian applications and potential military or weapons uses.",
    definition: [
      "Dual-use technology is anything that has a normal civilian purpose but could also be used for military ends or to build weapons. A drone can deliver parcels or carry a grenade; a chemical can fertilize crops or feed a weapons program; advanced microchips can run a phone or guide a missile. Because the same item serves both worlds, it sits in a tricky legal grey zone.",
      "Governments regulate dual-use goods through export-control regimes — in the U.S., the Export Administration Regulations (EAR); in the EU, the Dual-Use Regulation — and coordinate internationally through the Wassenaar Arrangement. The aim is to let legitimate trade flow while stopping sensitive technology from reaching weapons programs, sanctioned states, or hostile militaries.",
      "Dual-use has become a central issue in great-power competition. Controls on advanced semiconductors, chip-making equipment, AI, quantum technology, and aerospace components are now front-line tools of national-security policy, because the line between commercial and military capability in these fields is blurry and fast-moving. For companies, correctly classifying whether a product is dual-use determines whether they need a license to sell it abroad.",
    ],
    keyFacts: [
      { label: "Definition", value: "Civilian + military applications" },
      { label: "Examples", value: "Drones, chips, chemicals, AI" },
      { label: "US rules", value: "Export Administration Regulations" },
      { label: "Multilateral", value: "Wassenaar Arrangement" },
    ],
    examples: [
      {
        title: "Advanced semiconductors",
        description:
          "High-end chips power both consumer devices and military systems, which is why their export is increasingly restricted on national-security grounds.",
      },
      {
        title: "Commercial drones in war",
        description:
          "Off-the-shelf quadcopters built for photography have been widely adapted for reconnaissance and attack in recent conflicts.",
      },
    ],
    related: ["export-control", "male-uav", "counter-uas"],
    wiki: "General Atomics MQ-1 Predator",
    imageAlt: "A drone, a classic dual-use technology",
  },

  // ── Missiles & Munitions ───────────────────────────────────────────────────
  {
    slug: "ballistic-missile",
    term: "Ballistic Missile",
    abbreviation: "",
    category: "missiles",
    tldr: "A missile rocket-boosted high into the sky, then falling back onto its target like a thrown stone — but huge and incredibly fast.",
    summary:
      "A rocket-powered weapon that follows a high, arcing free-fall trajectory to deliver a warhead over long distances.",
    definition: [
      "A ballistic missile is a weapon that is powered by rocket engines only during the first, relatively brief 'boost' phase of flight. After the engines cut out, the missile coasts on a high, arcing trajectory shaped almost entirely by gravity and momentum — like a thrown stone, but on a planetary scale — before its warhead re-enters the atmosphere and falls onto the target. This unpowered, predictable arc is what distinguishes it from a cruise missile, which flies under power the whole way.",
      "Ballistic missiles are classified by range: short-range (SRBM, under 1,000 km), medium-range (MRBM), intermediate-range (IRBM), and intercontinental ballistic missiles (ICBM, over 5,500 km). The longest-range types leave the atmosphere entirely, arcing through space before plunging back down at hypersonic speeds, which makes them extremely hard to intercept.",
      "Their strategic importance comes from the warheads they carry. ICBMs are the backbone of nuclear deterrence, and some carry Multiple Independently targetable Re-entry Vehicles (MIRVs) — several warheads on one missile, each aimed at a different target. They can be launched from hardened underground silos, road-mobile launchers, or submarines (SLBMs), the last being prized for their survivability and second-strike capability.",
    ],
    keyFacts: [
      { label: "Flight", value: "Powered boost, then free-fall arc" },
      { label: "Ranges", value: "SRBM → ICBM (5,500+ km)" },
      { label: "Launch", value: "Silo, road-mobile, submarine" },
      { label: "Payload", value: "Conventional or nuclear (incl. MIRV)" },
    ],
    examples: [
      {
        title: "LGM-30 Minuteman III (USA)",
        description:
          "A silo-based intercontinental ballistic missile that has formed the land leg of the U.S. nuclear triad for decades, capable of MIRV payloads.",
      },
      {
        title: "Short-range battlefield use",
        description:
          "SRBMs such as Russia's Iskander have been used in recent conflicts to strike fixed targets hundreds of kilometers away, showing the difficulty of intercepting fast ballistic threats.",
      },
    ],
    related: ["cruise-missile", "hypersonic-weapon", "surface-to-air-missile", "nuclear-deterrence"],
    wiki: "LGM-30 Minuteman",
    imageAlt: "An intercontinental ballistic missile",
  },
  {
    slug: "cruise-missile",
    term: "Cruise Missile",
    abbreviation: "",
    category: "missiles",
    tldr: "A small pilotless plane carrying a bomb; it flies low all the way and hits a precise target far away.",
    summary:
      "A guided missile that flies under continuous power like a small aircraft, hugging the terrain to strike with precision.",
    definition: [
      "A cruise missile is essentially a small, pilotless, one-way aircraft that carries a warhead. Unlike a ballistic missile, it stays powered throughout its flight — typically by a small jet engine — and uses wings and control surfaces to fly a level, often low-altitude path to its target. This lets it fly under radar coverage, follow the contours of the land, and even change course around defenses.",
      "Guidance is what makes the modern cruise missile so effective. Early versions used inertial navigation and terrain-contour matching (TERCOM), comparing the ground below against a stored map. Today they fuse GPS/inertial navigation with scene-matching cameras for pinpoint terminal accuracy, allowing a strike within a few meters of an aim point from hundreds or even thousands of kilometers away.",
      "Cruise missiles come in subsonic and supersonic forms and can be launched from ships, submarines, aircraft, and ground vehicles. Their advantages are precision, range, and the ability to strike heavily defended targets without risking a crew. Their main drawback compared with ballistic missiles is speed: a subsonic cruise missile flies far slower, giving defenders more time to detect and engage it.",
    ],
    keyFacts: [
      { label: "Flight", value: "Powered, low-altitude, terrain-following" },
      { label: "Guidance", value: "INS + GPS + TERCOM / scene-matching" },
      { label: "Speed", value: "Subsonic to supersonic" },
      { label: "Launch", value: "Sea, air, sub, land" },
    ],
    examples: [
      {
        title: "BGM-109 Tomahawk (USA)",
        description:
          "A long-range, subsonic, sea- and submarine-launched cruise missile used extensively for precision land-attack strikes since the 1990s.",
      },
      {
        title: "Storm Shadow / SCALP (UK–France)",
        description:
          "An air-launched stand-off cruise missile designed to penetrate hardened targets from beyond the reach of many air defenses.",
      },
    ],
    related: ["ballistic-missile", "hypersonic-weapon", "precision-guided-munition", "anti-ship-missile"],
    wiki: "Tomahawk (missile)",
    imageAlt: "A Tomahawk cruise missile in flight",
  },
  {
    slug: "air-to-air-missile",
    term: "Air-to-Air Missile",
    abbreviation: "AAM",
    category: "missiles",
    tldr: "A missile that one plane fires to shoot down another plane.",
    summary:
      "A guided missile fired by an aircraft to destroy another aircraft, divided into short-range and beyond-visual-range types.",
    definition: [
      "An air-to-air missile (AAM) is a guided weapon launched from one aircraft to destroy another. It is the primary tool of modern aerial combat, having largely replaced the gun as the way fighters kill each other. AAMs are broadly split into two classes defined by how far and how they engage: short-range, within-visual-range missiles and long-range, beyond-visual-range (BVR) missiles.",
      "Short-range missiles, such as heat-seekers, use infrared guidance to home on the hot exhaust of an enemy engine. They are highly agile, optimized for the close-in 'dogfight', and modern versions can be cued by the pilot's helmet sight to lock onto targets far off the nose. Their range is limited, but within it they are deadly.",
      "Beyond-visual-range missiles use radar guidance to engage targets dozens of kilometers away, often before the enemy is even visible. Many are 'active radar homing': the missile carries its own radar in the nose, so after launch the shooter can turn away while the weapon finds the target itself ('fire-and-forget'). This lets a fighter strike first from stand-off distance, which is why BVR capability is decisive in air superiority.",
    ],
    keyFacts: [
      { label: "Classes", value: "Short-range (IR) & BVR (radar)" },
      { label: "Guidance", value: "Infrared or active/semi-active radar" },
      { label: "Key trait", value: "Fire-and-forget (active radar)" },
      { label: "Counters", value: "Flares, chaff, jamming, maneuver" },
    ],
    examples: [
      {
        title: "AIM-120 AMRAAM (USA)",
        description:
          "A widely exported active-radar-homing BVR missile that lets fighters engage and then maneuver away while the weapon homes autonomously.",
      },
      {
        title: "AIM-9 Sidewinder (USA)",
        description:
          "The classic short-range infrared dogfight missile, continually upgraded with high-off-boresight seekers cued by helmet-mounted sights.",
      },
    ],
    related: ["beyond-visual-range", "fifth-generation-fighter", "surface-to-air-missile"],
    wiki: "Air-to-air missile",
    imageAlt: "Air-to-air missiles carried by a fighter",
  },
  {
    slug: "surface-to-air-missile",
    term: "Surface-to-Air Missile",
    abbreviation: "SAM",
    category: "missiles",
    tldr: "A missile launched from the ground or a ship to shoot down planes, missiles, and drones.",
    summary:
      "A ground- or ship-launched missile designed to shoot down aircraft, missiles, and drones.",
    definition: [
      "A surface-to-air missile (SAM) is a missile fired from the ground or a ship to destroy targets in the air — aircraft, helicopters, cruise missiles, ballistic missiles, and drones. SAMs are the heart of air defense, the systems a country uses to deny its skies to an enemy. They range from a soldier's shoulder-launched weapon to vast, layered networks defending whole regions.",
      "SAMs are usually grouped by the altitude and distance they cover. Short-range, man-portable air-defense systems (MANPADS) protect troops from low-flying threats using infrared homing. Medium- and long-range systems use large radars and powerful missiles to engage high-flying aircraft and incoming missiles at distances of tens to hundreds of kilometers. The longest-range strategic systems can reach targets more than 100 km away and form an umbrella over key cities and bases.",
      "A SAM system is far more than the missile itself. It is a chain of sensors and decisions: search radars detect a target, tracking radars or other sensors refine its position, a command center decides to engage, and the missile is guided to interception. Networking many such systems together produces an Integrated Air Defense System (IADS).",
    ],
    keyFacts: [
      { label: "Targets", value: "Aircraft, missiles, drones" },
      { label: "Tiers", value: "MANPADS → strategic long-range" },
      { label: "Built around", value: "Radars + command + missiles" },
      { label: "Countered by", value: "Stealth, jamming, SEAD" },
    ],
    examples: [
      {
        title: "Patriot (USA)",
        description:
          "A mobile long-range air- and missile-defense system used by many allied nations to intercept aircraft and ballistic missiles.",
      },
      {
        title: "S-400 (Russia)",
        description:
          "A long-range strategic SAM system whose export has triggered major export-control and alliance disputes, illustrating the political weight of air defense.",
      },
    ],
    related: ["integrated-air-defense-system", "ballistic-missile", "electronic-warfare", "stealth"],
    wiki: "MIM-104 Patriot",
    imageAlt: "A surface-to-air missile launching from a ground battery",
  },
  {
    slug: "anti-ship-missile",
    term: "Anti-Ship Missile",
    abbreviation: "AShM",
    category: "missiles",
    tldr: "A missile built to sink ships — it skims low over the sea so the ship barely sees it coming.",
    summary:
      "A guided missile designed to attack and destroy ships, typically by skimming low over the sea to avoid detection.",
    definition: [
      "An anti-ship missile is a guided weapon designed specifically to find and destroy ships. Because the open ocean offers nowhere to hide, these missiles rely on speed, low flight, and clever guidance to get past a warship's defenses. Many are 'sea-skimmers', flying just a few meters above the waves so that the curve of the Earth hides them from a ship's radar until the last possible moment.",
      "Anti-ship missiles can be launched from ships, submarines, aircraft, and coastal batteries, which makes even a small or land-based force a threat to a powerful navy. They typically use a mix of inertial and satellite navigation to reach the target area, then switch on an active radar or infrared seeker to lock onto the ship for the final run-in. Some modern versions fly at supersonic or even hypersonic speed, or maneuver sharply at the end, to defeat point-defense systems.",
      "Their existence shapes naval strategy. The threat of cheap, long-range anti-ship missiles is a core part of 'anti-access' strategies meant to keep enemy fleets — especially aircraft carriers — far from a coastline. Navies counter them with layered defenses: long-range SAMs, close-in guns, electronic jamming, and decoys.",
    ],
    keyFacts: [
      { label: "Target", value: "Surface warships" },
      { label: "Signature trait", value: "Sea-skimming flight" },
      { label: "Launched from", value: "Ships, subs, aircraft, coast" },
      { label: "Countered by", value: "SAMs, CIWS, jamming, decoys" },
    ],
    examples: [
      {
        title: "Harpoon (USA) & Exocet (France)",
        description:
          "Widely exported subsonic sea-skimmers that have proven the lethality of anti-ship missiles in several naval conflicts.",
      },
      {
        title: "Anti-ship ballistic missiles",
        description:
          "Newer 'carrier-killer' missiles aim to strike moving ships from very long range, a centerpiece of modern anti-access strategy.",
      },
    ],
    related: ["cruise-missile", "a2ad", "aircraft-carrier", "hypersonic-weapon"],
    wiki: "Harpoon (missile)",
    imageAlt: "An anti-ship missile launching toward a sea target",
  },
  {
    slug: "loitering-munition",
    term: "Loitering Munition",
    abbreviation: "",
    category: "missiles",
    tldr: "A drone that hangs around in the sky, finds a target, then dives into it and explodes. Nicknamed a 'kamikaze drone'.",
    summary:
      "A weapon that loiters over an area searching for a target, then dives into it — a cross between a drone and a missile.",
    definition: [
      "A loitering munition is a weapon that blends a drone and a missile. Like a drone, it can fly to an area and circle ('loiter') for minutes or hours, searching for a target with onboard cameras. Like a missile, once it finds and locks onto that target, it dives into it and detonates — destroying itself in the process. This is why they are popularly called 'kamikaze drones' or 'suicide drones'.",
      "Their advantage is patience and precision. A commander can launch one to hunt for a target that hasn't appeared yet — a hidden vehicle, a radar that switches on only briefly — and strike it the instant it shows itself. Many have a human 'in the loop' who confirms the target through the live video feed and can wave off the attack at the last second, reducing collateral damage.",
      "Loitering munitions have exploded in popularity because they are relatively cheap, portable, and devastating against high-value targets like tanks, artillery, and air-defense radars. They have featured heavily in recent conflicts, where swarms of low-cost loitering munitions have destroyed equipment worth far more than themselves, forcing armies to invest urgently in counter-drone defenses.",
    ],
    keyFacts: [
      { label: "Nature", value: "Drone + missile hybrid" },
      { label: "Nickname", value: "Kamikaze / suicide drone" },
      { label: "Strength", value: "Patience, precision, low cost" },
      { label: "Targets", value: "Tanks, artillery, radars" },
    ],
    examples: [
      {
        title: "Switchblade (USA)",
        description:
          "A backpack-portable loitering munition a soldier can launch to strike targets beyond line of sight.",
      },
      {
        title: "Mass use in modern war",
        description:
          "Cheap loitering munitions have been used in large numbers in recent conflicts to destroy armor and air defenses at a fraction of their value.",
      },
    ],
    related: ["male-uav", "counter-uas", "precision-guided-munition"],
    wiki: "Loitering munition",
    imageAlt: "A loitering munition / kamikaze drone",
  },
  {
    slug: "precision-guided-munition",
    term: "Precision-Guided Munition",
    abbreviation: "PGM",
    category: "missiles",
    tldr: "A 'smart bomb' that steers itself to hit exactly what you aim at, instead of just dropping and hoping.",
    summary:
      "A bomb or missile that guides itself precisely to a target using laser, GPS, or other seekers — the 'smart bomb'.",
    definition: [
      "A precision-guided munition (PGM), commonly called a 'smart bomb', is a weapon that steers itself to hit a specific point rather than simply being dropped or fired and trusting to ballistics. By correcting its course in flight, a PGM can land within a few meters of its aim point, hugely increasing the chance of destroying the target while reducing the number of weapons needed and the risk to surrounding areas.",
      "Guidance comes in several flavors. Laser-guided weapons home on a spot of laser light shone on the target by an aircraft or a soldier on the ground. GPS/inertial-guided weapons fly to a set of coordinates regardless of weather or visibility. Others use infrared or radar seekers. A common and cheap approach is a strap-on guidance kit, like the U.S. JDAM, that turns an ordinary 'dumb' bomb into a precision weapon.",
      "PGMs transformed warfare from the 1990s onward. Where it once took dozens of bombs to hit a single target, one precision weapon can now do the job, enabling 'surgical' strikes on specific buildings or vehicles. This precision has reshaped both military planning and the political expectations around minimizing civilian harm — though accuracy depends entirely on correct targeting.",
    ],
    keyFacts: [
      { label: "Nickname", value: "Smart bomb" },
      { label: "Guidance", value: "Laser, GPS/INS, IR, radar" },
      { label: "Accuracy", value: "Within a few meters" },
      { label: "Cheap option", value: "Strap-on kits (e.g. JDAM)" },
    ],
    examples: [
      {
        title: "JDAM (USA)",
        description:
          "A low-cost GPS guidance kit bolted onto conventional bombs, turning huge stockpiles of 'dumb' bombs into precision weapons.",
      },
      {
        title: "Laser-guided bombs",
        description:
          "Weapons like the Paveway series home on a laser spot, allowing pinpoint strikes designated by aircraft or ground troops.",
      },
    ],
    related: ["cruise-missile", "loitering-munition", "c4isr"],
    wiki: "Joint Direct Attack Munition",
    imageAlt: "A precision-guided bomb with a guidance kit",
  },
  {
    slug: "hypersonic-weapon",
    term: "Hypersonic Weapon",
    abbreviation: "",
    category: "missiles",
    tldr: "A weapon flying faster than 5x the speed of sound while weaving and dodging, so it's almost impossible to shoot down.",
    summary:
      "A weapon that flies faster than Mach 5 while maneuvering, blending the speed of ballistic missiles with the agility of cruise missiles.",
    definition: [
      "A hypersonic weapon travels at more than five times the speed of sound (Mach 5, roughly 6,000 km/h) while remaining maneuverable for much of its flight. Speed alone is not new — ballistic missile warheads already re-enter at hypersonic speeds. What defines this new class of weapon is the combination of extreme speed with the ability to change course and fly at unpredictable altitudes, which makes them very hard to track and intercept.",
      "There are two main types. A hypersonic glide vehicle (HGV) is boosted high by a rocket, then released to glide and skip along the upper atmosphere toward its target, maneuvering the whole way instead of following a predictable ballistic arc. A hypersonic cruise missile is powered throughout by an advanced air-breathing engine called a scramjet, flying fast and low like a conventional cruise missile but vastly quicker.",
      "Their military appeal is straightforward: they compress the time defenders have to react, can slip around existing missile-defense systems designed for predictable ballistic threats, and can strike high-value targets at long range with little warning. The engineering is brutally hard, though — sustained hypersonic flight generates enormous heat and stress, demanding exotic materials and guidance that works through signal-blocking plasma.",
    ],
    keyFacts: [
      { label: "Speed", value: "Mach 5+ (≈6,000+ km/h)" },
      { label: "Types", value: "Glide vehicle (HGV) & scramjet cruise" },
      { label: "Edge", value: "Maneuvering + low warning time" },
      { label: "Challenge", value: "Heat, materials, guidance" },
    ],
    examples: [
      {
        title: "Hypersonic glide vehicles",
        description:
          "Several nations have tested boost-glide weapons that maneuver through the upper atmosphere to defeat conventional missile defenses.",
      },
      {
        title: "Scramjet-powered missiles",
        description:
          "Air-breathing hypersonic cruise missile programs aim to sustain Mach 5+ flight for long-range, fast-reaction strike.",
      },
    ],
    related: ["ballistic-missile", "cruise-missile", "integrated-air-defense-system"],
    wiki: "Boeing X-51 Waverider",
    imageAlt: "An experimental hypersonic scramjet vehicle",
  },

  // ── Systems & Sensors ──────────────────────────────────────────────────────
  {
    slug: "stealth",
    term: "Stealth",
    abbreviation: "Low Observable",
    category: "systems",
    tldr: "Design tricks that make a plane very hard for radar to spot — not invisible, just really sneaky.",
    summary:
      "A set of technologies that reduce how detectable a platform is to radar, infrared, and other sensors.",
    definition: [
      "Stealth — more formally 'low observable' technology — is the art of making a military platform hard to detect, track, and target. It does not make something invisible; it shrinks the distance and reliability at which sensors can find it, buying time and tactical surprise. A stealth aircraft might be detected only when it is far closer than a conventional one, by which point it may already have struck.",
      "The biggest focus is radar. Radar works by bouncing radio waves off a target and listening for the echo, so stealth design minimizes that echo — the 'radar cross-section'. This is done two ways: shaping and materials. Careful shaping uses flat, angled surfaces and aligned edges to deflect radar energy away from the sender rather than back to it. Radar-absorbent materials and coatings soak up some of the energy that does hit the airframe. Weapons and fuel are carried internally so they don't create bright reflections.",
      "Stealth also addresses other signatures: infrared (hiding or cooling hot engine exhaust), visual, acoustic, and the platform's own radio emissions. The payoff is enormous — stealth lets aircraft penetrate dense air defenses, strike first, and survive where conventional aircraft could not — but it is costly and demands meticulous maintenance of coatings and surfaces.",
    ],
    keyFacts: [
      { label: "Goal", value: "Reduce detectability, not invisibility" },
      { label: "Main signature", value: "Radar cross-section" },
      { label: "Methods", value: "Shaping + absorbent materials" },
      { label: "Other signatures", value: "IR, visual, acoustic, emissions" },
    ],
    examples: [
      {
        title: "F-117 Nighthawk (USA)",
        description:
          "The first operational stealth aircraft, whose faceted shape pioneered radar-evading design and demonstrated the value of low observability in combat.",
      },
      {
        title: "B-2 / B-21 bombers (USA)",
        description:
          "Flying-wing stealth bombers built to penetrate the densest air defenses and strike strategic targets undetected.",
      },
    ],
    related: ["fifth-generation-fighter", "electronic-warfare", "surface-to-air-missile", "aesa-radar"],
    wiki: "Lockheed F-117 Nighthawk",
    imageAlt: "A faceted stealth aircraft designed to evade radar",
  },
  {
    slug: "c4isr",
    term: "C4ISR",
    abbreviation: "C4ISR",
    category: "systems",
    tldr: "All the cameras, radars, radios and computers that let an army see the battlefield and make fast decisions — its 'nervous system'.",
    summary:
      "The integrated network of Command, Control, Communications, Computers, Intelligence, Surveillance and Reconnaissance that links a force together.",
    definition: [
      "C4ISR stands for Command, Control, Communications, Computers, Intelligence, Surveillance, and Reconnaissance. It is the umbrella term for all the systems that let a military sense the battlefield, make decisions, and act on them — the 'nervous system' that ties sensors, commanders, and weapons into a single fighting organism. Modern warfare is won less by individual platforms than by how well they are connected.",
      "Each piece plays a role. Intelligence, Surveillance, and Reconnaissance (ISR) gather information — satellites, radar aircraft, drones, ground sensors, and signals interception build a picture of where the enemy is and what they are doing. Communications and Computers move and process that information securely and fast. Command and Control (C2) is the human and software layer where commanders interpret the picture, decide, and issue orders.",
      "The aim is to shorten the 'decision cycle': sense a target, understand it, decide to engage, and strike before the enemy can react. When C4ISR works, a sensor on one platform can cue a weapon on another — a drone spotting a target that a ship's missile then destroys. Because the network is so central, it is a prime target: jamming, cyber-attack, and anti-satellite weapons all aim to blind an opponent's C4ISR.",
    ],
    keyFacts: [
      { label: "Expands to", value: "Command, Control, Comms, Computers" },
      { label: "Plus", value: "Intelligence, Surveillance, Recon" },
      { label: "Goal", value: "Shorten the sensor-to-shooter cycle" },
      { label: "Threats", value: "Jamming, cyber, anti-satellite" },
    ],
    examples: [
      {
        title: "AWACS airborne radar",
        description:
          "Aircraft like the E-3 Sentry act as flying command-and-control nodes, detecting threats and directing friendly fighters — a classic C4ISR asset.",
      },
      {
        title: "Networked 'kill webs'",
        description:
          "Modern doctrine links many sensors and shooters so any platform can engage a target detected by another, the essence of sensor-to-shooter C4ISR.",
      },
    ],
    related: ["electronic-warfare", "integrated-air-defense-system", "male-uav", "interoperability"],
    wiki: "Boeing E-3 Sentry",
    imageAlt: "An airborne early-warning and control aircraft, a key C4ISR node",
  },
  {
    slug: "electronic-warfare",
    term: "Electronic Warfare",
    abbreviation: "EW",
    category: "systems",
    tldr: "Fighting with radio waves — jamming the enemy's radars and radios while protecting your own.",
    summary:
      "Military use of the electromagnetic spectrum to detect, deceive, jam, or protect against an enemy's radars and communications.",
    definition: [
      "Electronic warfare (EW) is the battle for control of the electromagnetic spectrum — the radio waves, radar pulses, and signals that modern militaries depend on to see, talk, and fight. Whoever dominates the spectrum can find the enemy while blinding and deafening them. EW is invisible but decisive, shaping the outcome of air, sea, and land operations.",
      "It is traditionally divided into three parts. Electronic Attack uses energy to degrade the enemy — jamming radars and radios with noise, sending false signals to deceive them, or even burning out electronics. Electronic Protection hardens friendly systems against these attacks, through techniques like frequency-hopping radios and anti-jam GPS. Electronic Support is the listening side: detecting, identifying, and locating enemy emissions to build intelligence and warn of threats.",
      "In practice EW is everywhere. A fighter's radar-warning receiver tells the pilot a missile's radar has locked on; a jamming pod blinds that radar; chaff and decoys spoof the incoming missile. Because almost every weapon now relies on the spectrum — GPS guidance, data links, radar seekers — EW has become central to warfare, with recent conflicts featuring intense jamming of drones and spoofing of satellite navigation.",
    ],
    keyFacts: [
      { label: "Domain", value: "Electromagnetic spectrum" },
      { label: "Branches", value: "Attack, Protection, Support" },
      { label: "Tools", value: "Jammers, decoys, RWR, anti-jam GPS" },
      { label: "Targets", value: "Radars, comms, GPS, missile seekers" },
    ],
    examples: [
      {
        title: "EA-18G Growler (USA)",
        description:
          "A dedicated airborne electronic-attack aircraft that jams enemy radars and communications to protect strike packages.",
      },
      {
        title: "GPS jamming and spoofing",
        description:
          "Recent conflicts feature widespread interference with satellite navigation, degrading guided weapons and drones — electronic warfare at scale.",
      },
    ],
    related: ["c4isr", "stealth", "surface-to-air-missile", "counter-uas"],
    wiki: "Boeing EA-18G Growler",
    imageAlt: "An electronic-attack aircraft equipped with jamming pods",
  },
  {
    slug: "aesa-radar",
    term: "AESA Radar",
    abbreviation: "AESA",
    category: "systems",
    tldr: "A super-modern radar made of thousands of tiny antennas, so it sees farther, tracks many things at once, and is hard to jam.",
    summary:
      "Active Electronically Scanned Array radar — a modern radar using thousands of small transmitters that steer the beam electronically.",
    definition: [
      "AESA stands for Active Electronically Scanned Array, and it represents the modern generation of military radar. A traditional radar uses one transmitter and a dish or antenna that physically rotates or tilts to point its beam. An AESA radar instead uses an array of hundreds or thousands of tiny transmit/receive modules, each sending its own signal. By controlling these modules electronically, the radar steers its beam almost instantly, with no moving parts.",
      "This brings big advantages. An AESA can track many targets at once, switch between searching, tracking, and mapping in a fraction of a second, and jump frequencies so quickly that it is very hard to jam or even detect. It is also more reliable, because the failure of a few modules only slightly degrades performance rather than knocking the whole radar out. Many AESAs can even act as jammers or high-bandwidth data links themselves.",
      "AESA radars are now a defining feature of advanced fighters, warships, and air-defense systems. The performance gap between an AESA-equipped platform and one with an older mechanical radar is large enough to be decisive, which is why AESA upgrades are among the most sought-after — and export-controlled — improvements in modern combat aircraft.",
    ],
    keyFacts: [
      { label: "Stands for", value: "Active Electronically Scanned Array" },
      { label: "How", value: "Thousands of T/R modules, no moving parts" },
      { label: "Strengths", value: "Multi-target, agile, jam-resistant" },
      { label: "Found on", value: "Fighters, warships, SAM systems" },
    ],
    examples: [
      {
        title: "Fighter fire-control radars",
        description:
          "Modern fighters use AESA radars to detect and track many targets at long range while resisting jamming — a core enabler of beyond-visual-range combat.",
      },
      {
        title: "Naval & air-defense radars",
        description:
          "Warships and SAM systems rely on large AESA arrays to track aircraft and missiles simultaneously across a wide area.",
      },
    ],
    related: ["stealth", "beyond-visual-range", "electronic-warfare", "fifth-generation-fighter"],
    wiki: "Radar",
    imageAlt: "A modern military radar array",
  },
  {
    slug: "directed-energy-weapon",
    term: "Directed-Energy Weapon",
    abbreviation: "DEW",
    category: "systems",
    tldr: "A weapon that shoots a beam of energy, like a laser, instead of bullets — it burns or fries the target at the speed of light.",
    summary:
      "A weapon that damages targets with concentrated energy — such as a laser or microwaves — instead of physical projectiles.",
    definition: [
      "A directed-energy weapon (DEW) attacks a target with focused energy rather than a physical projectile like a bullet or missile. The two main types are high-energy lasers, which burn or melt a target with an intense beam of light, and high-power microwaves, which fry the electronics of drones, missiles, or vehicles with a blast of radio-frequency energy.",
      "Their appeal is striking. A laser travels at the speed of light, so there is no need to 'lead' a moving target, and each shot can cost just a few dollars of electricity compared with the hundreds of thousands of dollars for an interceptor missile. As long as the system has power, its 'magazine' is effectively unlimited. This makes DEWs especially attractive for defending against cheap, mass threats like drone swarms, rockets, and mortars, where using expensive missiles makes little economic sense.",
      "The technology has real limits. Lasers need a lot of power and cooling, their beam can be weakened by rain, fog, dust, and smoke, and they must dwell on a target long enough to burn through it. After decades of research, directed-energy weapons are now beginning to be fielded on ships and ground vehicles for short-range defense, and are seen as a key counter to the growing drone threat.",
    ],
    keyFacts: [
      { label: "Types", value: "High-energy laser, high-power microwave" },
      { label: "Cost per shot", value: "Very low (electricity)" },
      { label: "Best against", value: "Drones, rockets, swarms" },
      { label: "Limits", value: "Power, cooling, weather, dwell time" },
    ],
    examples: [
      {
        title: "Shipboard laser systems",
        description:
          "Navies have begun installing laser weapons to burn down drones and small boats cheaply, sparing expensive missiles for bigger threats.",
      },
      {
        title: "Counter-drone microwaves",
        description:
          "High-power microwave systems can disable multiple drones at once by frying their electronics — a promising answer to drone swarms.",
      },
    ],
    related: ["counter-uas", "surface-to-air-missile", "loitering-munition"],
    wiki: "Directed-energy weapon",
    imageAlt: "A directed-energy / laser weapon system",
  },
  {
    slug: "counter-uas",
    term: "Counter-UAS",
    abbreviation: "C-UAS",
    category: "systems",
    tldr: "Everything used to spot and stop enemy drones — by jamming them, netting them, or shooting them down.",
    summary:
      "The systems and tactics used to detect, track, and defeat hostile drones (unmanned aircraft systems).",
    definition: [
      "Counter-UAS (C-UAS) covers all the ways a force detects and defeats hostile drones — 'UAS' meaning Unmanned Aircraft Systems. As cheap drones have become a serious battlefield and security threat, used for spying, dropping grenades, or attacking as loitering munitions, defeating them has grown into a major field of its own. The challenge is hard because small drones are slow, low-flying, quiet, and hard to spot on radar built for fast aircraft.",
      "C-UAS works in two stages: detection and defeat. Detection uses a mix of radar, cameras, acoustic sensors, and radio-frequency scanners that listen for the control link between a drone and its operator. Defeat options range from 'soft kill' to 'hard kill'. Soft-kill methods jam the drone's control or GPS signal, or take it over electronically, forcing it to land or fly away. Hard-kill methods physically destroy it — with guns, missiles, lasers, nets fired from the ground or from other drones, or even trained birds.",
      "The big problem is cost and scale: it makes little sense to fire a million-dollar missile at a thousand-dollar drone, and swarms can overwhelm defenses. This is driving interest in cheap, reusable solutions like jammers and directed-energy weapons. C-UAS is now a fast-growing priority for militaries and for protecting airports, borders, and critical infrastructure.",
    ],
    keyFacts: [
      { label: "Goal", value: "Detect & defeat hostile drones" },
      { label: "Detection", value: "Radar, RF, optical, acoustic" },
      { label: "Soft kill", value: "Jamming, GPS spoofing, takeover" },
      { label: "Hard kill", value: "Guns, missiles, lasers, nets" },
    ],
    examples: [
      {
        title: "RF jammers ('drone guns')",
        description:
          "Handheld and vehicle-mounted jammers sever the link between a drone and its operator, a common low-cost soft-kill tool.",
      },
      {
        title: "Layered base defense",
        description:
          "Forward bases increasingly combine radar, jammers, guns, and lasers to defend against drone and loitering-munition attacks.",
      },
    ],
    related: ["loitering-munition", "directed-energy-weapon", "electronic-warfare", "male-uav"],
    wiki: "Anti-aircraft warfare",
    imageAlt: "Air-defense systems used against drones",
  },
  {
    slug: "integrated-air-defense-system",
    term: "Integrated Air Defense System",
    abbreviation: "IADS",
    category: "systems",
    tldr: "Lots of radars and anti-air missiles linked together to guard a whole country's sky as one team.",
    summary:
      "A networked combination of radars, missiles, guns, and command centers that defends a region's airspace as one system.",
    definition: [
      "An Integrated Air Defense System (IADS) is what you get when many individual air-defense pieces — radars, surface-to-air missile batteries, anti-aircraft guns, fighter aircraft, and command posts — are knitted together into a single, coordinated whole. Rather than each unit fighting alone, an IADS shares a common air picture and directs the best weapon against each threat, defending a country or theater as one organism.",
      "The structure is layered. Long-range search radars detect incoming aircraft and missiles far out, feeding their tracks into command-and-control centers. There, controllers decide how to respond and assign engagements to the appropriate layer of defense: long-range SAMs for distant high-altitude threats, medium- and short-range systems closer in, and guns or man-portable missiles for anything that leaks through. The layers overlap so that a target slipping past one is caught by the next.",
      "The power of an IADS comes from integration. Networked radars are harder to fool and provide redundancy if one is destroyed; coordinated batteries avoid wasting missiles on the same target. That is exactly why so much of air warfare is devoted to defeating an IADS — through stealth, electronic jamming, decoys, cruise missiles, and 'Suppression of Enemy Air Defenses' missions that hunt the radars and command nodes.",
    ],
    keyFacts: [
      { label: "Combines", value: "Radars + SAMs + guns + fighters" },
      { label: "Structure", value: "Layered, overlapping coverage" },
      { label: "Strength", value: "Networked C2 and redundancy" },
      { label: "Defeated by", value: "Stealth, EW, SEAD, cruise missiles" },
    ],
    examples: [
      {
        title: "Layered national air defense",
        description:
          "Modern states combine long-, medium-, and short-range SAMs with early-warning radars and interceptors into a single coordinated shield.",
      },
      {
        title: "SEAD campaigns",
        description:
          "Opening-night strikes in modern air wars target the radars and command nodes of an IADS first, to open corridors for follow-on aircraft.",
      },
    ],
    related: ["surface-to-air-missile", "electronic-warfare", "stealth", "a2ad"],
    wiki: "S-400 missile system",
    imageAlt: "A long-range SAM system within an integrated air defense network",
  },

  // ── Platforms ──────────────────────────────────────────────────────────────
  {
    slug: "fifth-generation-fighter",
    term: "Fifth-Generation Fighter",
    abbreviation: "5th-gen",
    category: "platforms",
    tldr: "The most advanced fighter jets — stealthy, packed with sensors, and able to share everything they see with friendly forces.",
    summary:
      "The latest class of combat aircraft combining stealth, sensor fusion, and networking into a single survivable platform.",
    definition: [
      "A fifth-generation fighter is the most advanced current class of combat aircraft, defined not by a single feature but by a blend of them working together: low-observable 'stealth' design, advanced sensors whose data is fused into one clear picture for the pilot, the ability to share that picture across a networked force, and high performance including, in some cases, supersonic cruise without afterburner ('supercruise').",
      "What sets it apart from earlier 'fourth-generation' jets is integration. A modern radar, infrared sensors, and electronic-warfare receivers feed a central computer that fuses everything into a single display, so the pilot manages tactics rather than juggling raw sensor feeds. Stealth lets the aircraft approach undetected and shoot first. Internal weapons bays preserve that stealth by hiding missiles and bombs. Secure data links let a flight of fighters act as a connected team.",
      "These capabilities make fifth-generation fighters formidable in contested airspace, able to penetrate dense air defenses and act as airborne command nodes for less stealthy aircraft. They are also extraordinarily expensive to develop, buy, and maintain, which is why only a handful of nations field them and why programs are major instruments of industrial and alliance policy, frequently bundled with offsets and tightly governed by export controls.",
    ],
    keyFacts: [
      { label: "Hallmarks", value: "Stealth + sensor fusion + networking" },
      { label: "Weapons", value: "Carried internally for low observability" },
      { label: "Bonus", value: "Supercruise on some types" },
      { label: "Trait", value: "Very high cost; few operators" },
    ],
    examples: [
      {
        title: "F-35 Lightning II (USA)",
        description:
          "A multinational fifth-generation program with stealth and deep sensor fusion, sold to many allies under extensive industrial and offset arrangements.",
      },
      {
        title: "F-22 Raptor (USA)",
        description:
          "An air-superiority fifth-generation fighter combining stealth, supercruise, and agility; never exported due to strict controls on its technology.",
      },
    ],
    related: ["stealth", "air-to-air-missile", "beyond-visual-range", "aesa-radar"],
    wiki: "Lockheed Martin F-35 Lightning II",
    imageAlt: "An F-35 Lightning II, a fifth-generation stealth fighter",
  },
  {
    slug: "male-uav",
    term: "MALE UAV",
    abbreviation: "MALE UAV",
    category: "platforms",
    tldr: "A drone that can stay in the air for many hours to watch an area, and sometimes strike targets itself.",
    summary:
      "A Medium-Altitude, Long-Endurance unmanned aircraft used for persistent surveillance and precision strike.",
    definition: [
      "A MALE UAV — Medium-Altitude, Long-Endurance Unmanned Aerial Vehicle — is a remotely piloted aircraft built to loiter over an area for many hours, even a full day, at moderate altitude. The category is defined by stamina rather than speed: where a fighter screams over a target in seconds, a MALE drone circles patiently, watching, until it is needed. This persistence has made such drones one of the most influential weapons of recent decades.",
      "Their core job is intelligence, surveillance, and reconnaissance (ISR). Carrying high-resolution cameras, infrared sensors, and radar, a MALE UAV can monitor a road, building, or border for hours and relay live video to commanders far away via satellite link. Many also carry weapons, making them 'hunter-killers' that can find a target and strike it themselves with guided missiles or bombs.",
      "Their appeal is clear: no crew is put at risk, they are far cheaper to buy and operate than manned aircraft, and their endurance gives commanders a persistent eye in the sky. They do have limits — traditional MALE UAVs are relatively slow and not stealthy, making them vulnerable to modern air defenses and to jamming of their control links, which has pushed designers toward stealthier shapes and greater onboard autonomy.",
    ],
    keyFacts: [
      { label: "MALE means", value: "Medium-Altitude, Long-Endurance" },
      { label: "Endurance", value: "Many hours to 24h+" },
      { label: "Roles", value: "ISR and precision strike" },
      { label: "Weakness", value: "Slow, non-stealthy, link-dependent" },
    ],
    examples: [
      {
        title: "MQ-9 Reaper (USA)",
        description:
          "A widely used hunter-killer MALE UAV combining long-endurance surveillance with precision-strike weapons, exported to several allies.",
      },
      {
        title: "Bayraktar TB2 (Turkey)",
        description:
          "A lower-cost armed MALE drone whose battlefield use and wide export reshaped perceptions of drone warfare and the global UAV market.",
      },
    ],
    related: ["c4isr", "loitering-munition", "counter-uas", "dual-use"],
    wiki: "General Atomics MQ-9 Reaper",
    imageAlt: "An MQ-9 Reaper medium-altitude long-endurance drone in flight",
  },
  {
    slug: "main-battle-tank",
    term: "Main Battle Tank",
    abbreviation: "MBT",
    category: "platforms",
    tldr: "The heavy armored fighting vehicle of an army — big gun, thick armor, moves on tracks. The 'fist' of ground forces.",
    summary:
      "A heavily armored, tracked combat vehicle with a powerful main gun — the core of modern mechanized ground forces.",
    definition: [
      "A main battle tank (MBT) is the heavily armored, tracked fighting vehicle at the heart of modern land warfare. It combines three things in one platform: firepower (a large-caliber main gun able to destroy other tanks and fortifications), protection (thick composite and reactive armor), and mobility (powerful engines and tracks that let it cross rough ground). The 'main battle' name reflects that it replaced the older split between light and heavy tanks with a single, do-everything design.",
      "An MBT typically carries a crew of three or four, a main gun of around 120–125 mm, and secondary machine guns. Modern tanks add advanced fire-control computers, thermal sights that see in darkness and smoke, and increasingly 'active protection systems' that detect and shoot down incoming anti-tank missiles before they hit.",
      "Tanks remain central to combined-arms warfare — the coordinated use of armor, infantry, artillery, and air power — because nothing else delivers the same mix of protected, mobile firepower. But they face growing threats from cheap anti-tank missiles, loitering munitions, and mines, which has fueled debate about their survivability and driven heavy investment in new armor and defensive systems rather than their retirement.",
    ],
    keyFacts: [
      { label: "Combines", value: "Firepower + armor + mobility" },
      { label: "Main gun", value: "~120–125 mm" },
      { label: "Crew", value: "Typically 3–4" },
      { label: "Threats", value: "ATGMs, loitering munitions, mines" },
    ],
    examples: [
      {
        title: "Leopard 2, M1 Abrams, Challenger 2",
        description:
          "Leading Western main battle tanks widely exported and used as the benchmark for armored firepower and protection.",
      },
      {
        title: "Active protection systems",
        description:
          "Systems like Trophy intercept incoming anti-tank rockets and missiles, a direct response to the rising threat to armor.",
      },
    ],
    related: ["precision-guided-munition", "loitering-munition", "interoperability"],
    wiki: "Leopard 2",
    imageAlt: "A modern main battle tank",
  },
  {
    slug: "aircraft-carrier",
    term: "Aircraft Carrier",
    abbreviation: "CV / CVN",
    category: "platforms",
    tldr: "A giant warship that's basically a floating airport, letting a country fly jets anywhere in the world's oceans.",
    summary:
      "A large warship that operates as a mobile airbase at sea, projecting air power far from home territory.",
    definition: [
      "An aircraft carrier is a warship designed to carry, launch, and recover combat aircraft — in effect, a mobile airbase that can sail anywhere in the world's oceans. It lets a nation project air power thousands of kilometers from home without needing a friendly airfield nearby. This ability to bring a squadron of fighters to a crisis on short notice makes carriers among the most powerful — and most political — instruments of national strength.",
      "The largest carriers are nuclear-powered (designated CVN) and displace around 100,000 tonnes, carrying dozens of aircraft. They launch jets using a steam or electromagnetic catapult and recover them with arresting wires that catch a hook on the landing aircraft. A carrier never sails alone: it is the centerpiece of a 'carrier strike group' that includes destroyers, cruisers, submarines, and supply ships providing air defense, anti-submarine protection, and logistics.",
      "Carriers are extraordinarily expensive and, because they concentrate so much value in one hull, are prime targets. The spread of long-range anti-ship missiles — especially 'carrier-killer' weapons — has sparked intense debate about their vulnerability and the layered defenses needed to protect them. Even so, only a few nations can build and operate them, and they remain a symbol of first-rank military power.",
    ],
    keyFacts: [
      { label: "Role", value: "Mobile airbase at sea" },
      { label: "Largest", value: "Nuclear-powered (CVN), ~100,000 t" },
      { label: "Launch/recover", value: "Catapults + arresting wires" },
      { label: "Never alone", value: "Carrier strike group escorts" },
    ],
    examples: [
      {
        title: "Nimitz & Ford classes (USA)",
        description:
          "Nuclear-powered supercarriers that form the core of U.S. global power projection, each carrying a full air wing.",
      },
      {
        title: "Carrier-killer missiles",
        description:
          "Long-range anti-ship missiles designed to threaten carriers have driven the development of layered fleet air and missile defenses.",
      },
    ],
    related: ["anti-ship-missile", "a2ad", "submarine", "fifth-generation-fighter"],
    wiki: "Aircraft carrier",
    imageAlt: "A large aircraft carrier at sea",
  },
  {
    slug: "submarine",
    term: "Submarine",
    abbreviation: "SSN / SSBN",
    category: "platforms",
    tldr: "A warship that hides underwater. Some hunt other ships; some carry nuclear missiles and stay hidden as a last-resort deterrent.",
    summary:
      "A warship that operates underwater, used for stealthy attack, intelligence, and — in nuclear-armed forms — secure nuclear deterrence.",
    definition: [
      "A submarine is a warship built to operate beneath the surface of the sea, where the water hides it from radar and most sensors. Stealth is its whole reason for existing: a submarine that cannot be found cannot be attacked, and can strike or gather intelligence by surprise. This makes submarines some of the most strategically important — and secretive — platforms any navy operates.",
      "Modern military submarines come in two broad families, often distinguished by their propulsion and mission. Attack submarines (designated SSN when nuclear-powered) hunt enemy ships and other submarines, launch cruise missiles at land targets, and conduct surveillance. Ballistic-missile submarines (SSBN) carry long-range nuclear missiles and exist to hide in the ocean for months at a time. Because they are nearly impossible to find and destroy, SSBNs guarantee a country can strike back even after a surprise attack — the survivable 'second strike' at the core of nuclear deterrence.",
      "Nuclear-powered submarines can stay submerged for months, limited mainly by food and crew endurance. Quieter diesel-electric and air-independent boats are cheaper and very stealthy in coastal waters. The constant contest between hiding submarines and the anti-submarine forces trying to detect them — using sonar, aircraft, and other submarines — is one of the oldest and hardest games in naval warfare.",
    ],
    keyFacts: [
      { label: "Core trait", value: "Underwater stealth" },
      { label: "SSN", value: "Nuclear attack submarine" },
      { label: "SSBN", value: "Ballistic-missile (deterrent) sub" },
      { label: "Endurance", value: "Nuclear boats: months submerged" },
    ],
    examples: [
      {
        title: "Ballistic-missile submarines",
        description:
          "SSBNs hide in the deep ocean carrying nuclear missiles, forming the most survivable leg of the nuclear triad.",
      },
      {
        title: "AUKUS submarine pact",
        description:
          "The agreement to provide Australia with nuclear-powered attack submarines shows how submarines sit at the center of alliance and industrial policy.",
      },
    ],
    related: ["nuclear-deterrence", "ballistic-missile", "anti-ship-missile", "aircraft-carrier"],
    wiki: "Ohio-class submarine",
    imageAlt: "A ballistic-missile submarine",
  },

  // ── Doctrine & Concepts ────────────────────────────────────────────────────
  {
    slug: "beyond-visual-range",
    term: "Beyond Visual Range",
    abbreviation: "BVR",
    category: "doctrine",
    tldr: "Air combat where you shoot the enemy with radar and long-range missiles before you can even see them with your eyes.",
    summary:
      "Air combat conducted at distances where the enemy cannot yet be seen, relying on radar and long-range missiles.",
    definition: [
      "Beyond Visual Range (BVR) describes air combat that takes place at distances so great the enemy aircraft cannot be seen with the naked eye — often tens of kilometers away. Instead of the close, turning 'dogfights' of earlier eras, BVR combat is fought through sensors and long-range missiles: a pilot detects, identifies, and engages an opponent on radar before the two aircraft ever come within sight of each other.",
      "BVR is made possible by three things working together: a powerful radar (or other long-range sensor) to find and track the target, a reliable way to confirm the target is hostile, and a missile with the range and guidance to reach it. Modern active-radar 'fire-and-forget' missiles are central, letting a fighter shoot from stand-off range and then maneuver away while the missile homes in on its own.",
      "The advantage of fighting at range is enormous: striking first, ideally before the enemy even knows you are there, often decides the engagement. This is why BVR capability — paired with stealth, which delays the moment you are detected — defines modern air superiority. BVR is not absolute, though: rules of engagement often demand positive identification before firing, electronic warfare can spoof radars, and a missed long-range shot can still collapse combat into a close-in fight.",
    ],
    keyFacts: [
      { label: "Means", value: "Engaging before visual contact" },
      { label: "Needs", value: "Radar + ID + long-range missile" },
      { label: "Pairs with", value: "Stealth for first-shot advantage" },
      { label: "Limits", value: "ID rules, EW, missed shots" },
    ],
    examples: [
      {
        title: "AMRAAM-armed engagements",
        description:
          "Active-radar BVR missiles let fighters fire from beyond visual range and turn away, the dominant pattern of modern air-to-air combat.",
      },
      {
        title: "Stealth + BVR synergy",
        description:
          "Fifth-generation fighters exploit stealth to delay detection while using radar and BVR missiles to strike first — air superiority without a dogfight.",
      },
    ],
    related: ["air-to-air-missile", "fifth-generation-fighter", "stealth", "aesa-radar"],
    wiki: "AIM-120 AMRAAM",
    imageAlt: "A beyond-visual-range air-to-air missile",
  },
  {
    slug: "nuclear-deterrence",
    term: "Nuclear Deterrence",
    abbreviation: "",
    category: "doctrine",
    tldr: "Having weapons so destructive that no one dares attack you, because they know you'd hit back just as hard.",
    summary:
      "The strategy of preventing attack by maintaining the credible ability to retaliate with devastating nuclear force.",
    definition: [
      "Nuclear deterrence is the strategy of preventing an attack not by defending against it, but by convincing a potential aggressor that any attack would trigger a retaliation so devastating it would not be worth it. The logic is psychological: if an enemy is certain you can and will strike back with nuclear weapons, they are deterred from attacking in the first place. The weapons succeed precisely by never being used.",
      "For deterrence to work it must be credible. The retaliatory force has to survive a surprise first strike, which is why nuclear powers spread their weapons across a 'triad' — land-based missiles in hardened silos, bombers, and ballistic-missile submarines hidden at sea — so that no single attack could disarm them. The submarine leg is especially valued because it is almost impossible to find and destroy, guaranteeing a 'second strike'.",
      "The grim foundation of the Cold War balance was 'Mutually Assured Destruction' (MAD): if both sides would be annihilated, neither dares start a nuclear war. Deterrence remains the organizing idea behind nuclear arsenals today, shaping arms-control treaties, missile-defense debates, and alliance guarantees in which a nuclear power promises to protect non-nuclear allies under its 'umbrella'.",
    ],
    keyFacts: [
      { label: "Goal", value: "Prevent attack via threat of retaliation" },
      { label: "Key need", value: "Credible, survivable second strike" },
      { label: "Triad", value: "Land missiles, bombers, submarines" },
      { label: "Cold War logic", value: "Mutually Assured Destruction" },
    ],
    examples: [
      {
        title: "The nuclear triad",
        description:
          "Spreading warheads across silos, bombers, and submarines ensures a retaliatory capability survives any first strike — the backbone of deterrence.",
      },
      {
        title: "Extended deterrence",
        description:
          "A nuclear power's 'umbrella' promises to defend allies, letting many nations forgo their own nuclear weapons.",
      },
    ],
    related: ["ballistic-missile", "submarine", "a2ad"],
    wiki: "Nuclear weapon",
    imageAlt: "A nuclear weapon test, symbol of deterrence",
  },
  {
    slug: "a2ad",
    term: "Anti-Access / Area Denial",
    abbreviation: "A2/AD",
    category: "doctrine",
    tldr: "A 'keep out' strategy: using long-range missiles and sensors to make it too dangerous for an enemy to come near your area.",
    summary:
      "A strategy that uses long-range weapons and sensors to stop an enemy from entering or operating freely in a region.",
    definition: [
      "Anti-Access / Area Denial (A2/AD) describes a strategy of keeping a powerful enemy out of a region, or making it too costly for them to operate there. The two halves differ in scale. 'Anti-access' aims to stop enemy forces from reaching the theater at all — for example, threatening their aircraft carriers and airbases from far away. 'Area denial' is about limiting their freedom of movement once they have arrived, contesting the airspace and seas closer in.",
      "A2/AD is built from layers of long-range sensors and weapons working together: over-the-horizon radars and satellites to spot incoming forces, long-range anti-ship and ballistic missiles to threaten ships and bases, dense integrated air defenses to contest the skies, plus submarines, mines, and electronic and cyber warfare. The goal is not necessarily to win a battle but to raise the risk so high that a stronger opponent hesitates to intervene.",
      "The concept became prominent as a way to describe how regional powers might offset the advantages of a globally dominant military by denying it the easy access it once enjoyed. In response, that military develops concepts and weapons to break through or operate inside a contested zone. A2/AD is therefore less a single system than a way of thinking about how geography, missiles, and sensors can hold an adversary at arm's length.",
    ],
    keyFacts: [
      { label: "Anti-access", value: "Stop entry to the theater" },
      { label: "Area denial", value: "Limit movement once inside" },
      { label: "Built from", value: "Missiles, IADS, subs, sensors, EW" },
      { label: "Aim", value: "Raise risk to deter intervention" },
    ],
    examples: [
      {
        title: "Carrier-killer missiles",
        description:
          "Long-range anti-ship ballistic missiles are designed to push aircraft carriers far from a coastline — a centerpiece of anti-access strategy.",
      },
      {
        title: "Layered coastal defense",
        description:
          "Combining air defenses, coastal missile batteries, submarines, and sensors creates a contested zone an adversary enters only at high risk.",
      },
    ],
    related: ["anti-ship-missile", "integrated-air-defense-system", "aircraft-carrier", "ballistic-missile"],
    wiki: "Anti-ship ballistic missile",
    imageAlt: "A long-range missile of the kind used in A2/AD strategies",
  },
  {
    slug: "interoperability",
    term: "Interoperability",
    abbreviation: "",
    category: "doctrine",
    tldr: "Making sure different countries' forces and equipment can work together smoothly — like phones that all use the same charger.",
    summary:
      "The ability of different forces, nations, or systems to operate together effectively by sharing standards, data, and procedures.",
    definition: [
      "Interoperability is the ability of different military forces — whether different countries in a coalition or different branches of one nation's armed forces — to work together smoothly and effectively. It means their equipment, communications, procedures, and even ammunition fit together, so that an ally's aircraft can talk to your command center, refuel from your tankers, and use compatible weapons. Without it, a coalition is just separate forces standing next to each other rather than a single team.",
      "Achieving interoperability relies heavily on common standards. Alliances like NATO publish 'Standardization Agreements' (STANAGs) covering everything from radio protocols and data-link formats to the calibre of rifle rounds and the fittings on fuel hoses, so that members' forces mesh. Beyond hardware, it requires shared doctrine, common procedures, a common language for operations, and regular joint exercises so that personnel are used to working together.",
      "Interoperability is also a powerful commercial and political force. Countries often buy the same aircraft, radios, or missiles as their allies precisely so they can operate together and share logistics, which is why winning a major contract with one nation can pull its partners along too. It is a core selling point of programs like the F-35, and a major reason alliances push members toward common equipment and standards.",
    ],
    keyFacts: [
      { label: "Meaning", value: "Forces & systems working together" },
      { label: "Enabled by", value: "Common standards (e.g. NATO STANAGs)" },
      { label: "Needs", value: "Shared doctrine, training, language" },
      { label: "Effect", value: "Drives allies toward common kit" },
    ],
    examples: [
      {
        title: "NATO standardization (STANAGs)",
        description:
          "Agreed standards for ammunition, fuel, and data links let allied forces share supplies and communicate in combined operations.",
      },
      {
        title: "Common platforms",
        description:
          "Allies operating the same aircraft, like the F-35, gain shared logistics, training, and the ability to fight as one networked force.",
      },
    ],
    related: ["c4isr", "foreign-military-sales", "fifth-generation-fighter"],
    wiki: "NATO",
    imageAlt: "Allied forces operating together",
  },

  // ── More missiles & munitions ──────────────────────────────────────────────
  {
    slug: "atgm",
    term: "Anti-Tank Guided Missile",
    abbreviation: "ATGM",
    category: "missiles",
    tldr: "A missile a soldier or vehicle fires to destroy tanks — it's guided, so it actually steers into the target.",
    summary:
      "A guided missile designed to destroy armored vehicles, often portable and able to defeat heavy tank armor.",
    definition: [
      "An anti-tank guided missile (ATGM) is a guided weapon built to destroy tanks and other armored vehicles. Unlike an unguided rocket, it corrects its flight path on the way to the target, giving a single soldier or light vehicle a realistic chance of knocking out a vehicle that costs hundreds of times more. This has made the ATGM one of the great equalizers of the modern battlefield.",
      "Guidance methods have evolved. Early missiles were steered manually by the operator through a wire; later types ride a laser beam or are guided by the operator keeping the sight on the target. The most advanced are 'fire-and-forget': the operator locks the seeker onto the target and the missile flies in on its own, freeing them to take cover immediately. Many modern ATGMs also use 'top-attack', climbing then diving onto the thin armor on a tank's roof, and tandem warheads to defeat reactive armor.",
      "Cheap, portable ATGMs have repeatedly proven devastating against armor, forcing the development of active protection systems and changing how tanks are used. They are a central example of how relatively low-cost precision weapons can challenge expensive heavy platforms.",
    ],
    keyFacts: [
      { label: "Target", value: "Tanks & armored vehicles" },
      { label: "Guidance", value: "Wire, laser-beam, fire-and-forget" },
      { label: "Tricks", value: "Top-attack, tandem warheads" },
      { label: "Effect", value: "Cheap counter to expensive armor" },
    ],
    examples: [
      {
        title: "FGM-148 Javelin (USA)",
        description:
          "A fire-and-forget, top-attack ATGM a soldier can shoulder-fire, widely supplied to allies and proven against modern tanks.",
      },
      {
        title: "Active protection in response",
        description:
          "The ATGM threat drove the spread of systems like Trophy that intercept incoming missiles before they strike a vehicle.",
      },
    ],
    related: ["main-battle-tank", "active-protection-system", "precision-guided-munition", "manpads"],
    wiki: "FGM-148 Javelin",
    imageAlt: "A shoulder-fired anti-tank guided missile",
  },
  {
    slug: "manpads",
    term: "MANPADS",
    abbreviation: "MANPADS",
    category: "missiles",
    tldr: "A shoulder-fired missile one soldier uses to shoot down low-flying aircraft and helicopters.",
    summary:
      "Man-Portable Air-Defense System — a shoulder-launched surface-to-air missile carried and fired by a single soldier.",
    definition: [
      "MANPADS stands for Man-Portable Air-Defense System: a lightweight, shoulder-fired surface-to-air missile that a single soldier can carry and launch. It exists to give ground troops their own protection against low-flying aircraft, helicopters, and drones, without relying on big, vehicle-mounted air-defense systems. Most use an infrared seeker that homes on the heat of an aircraft's engine, making them 'fire-and-forget'.",
      "Their strengths are portability, low cost, and ease of use, which let small units threaten expensive aircraft and force pilots to fly higher or use countermeasures like flares. Because they are so portable and effective, they are also a serious proliferation and terrorism concern: a single MANPADS in the wrong hands can threaten a civilian airliner, which is why their export and stockpiles are tightly controlled.",
      "MANPADS are the bottom, short-range layer of a broader air-defense network, complementing medium- and long-range surface-to-air missiles. Their widespread use in recent conflicts against helicopters and low-flying jets has reinforced both their battlefield value and the strict controls surrounding them.",
    ],
    keyFacts: [
      { label: "Stands for", value: "Man-Portable Air-Defense System" },
      { label: "Operated by", value: "A single soldier (shoulder-fired)" },
      { label: "Guidance", value: "Usually infrared (heat-seeking)" },
      { label: "Concern", value: "Proliferation / threat to airliners" },
    ],
    examples: [
      {
        title: "FIM-92 Stinger (USA)",
        description:
          "A widely used shoulder-fired infrared MANPADS effective against helicopters and low-flying aircraft.",
      },
      {
        title: "Tight export controls",
        description:
          "Because a single unit could down an airliner, MANPADS transfers and stockpiles are among the most strictly regulated in the arms trade.",
      },
    ],
    related: ["surface-to-air-missile", "atgm", "counter-uas", "end-user-certificate"],
    wiki: "FIM-92 Stinger",
    imageAlt: "A shoulder-fired man-portable air-defense missile",
  },

  // ── More systems & sensors ─────────────────────────────────────────────────
  {
    slug: "military-satellite",
    term: "Military Satellite",
    abbreviation: "MILSATCOM",
    category: "systems",
    tldr: "A spacecraft used by the military to spy, communicate, navigate, or give early warning of attacks.",
    summary:
      "A satellite used for defense purposes — reconnaissance, communications, navigation, missile warning, or surveillance.",
    definition: [
      "A military satellite is a spacecraft operated for defense and intelligence purposes. From orbit, satellites provide capabilities that nothing on the ground can match: a global view, communication across the planet, and precise timing and positioning. They have become so essential that space is now treated as a military domain in its own right, alongside land, sea, air, and cyber.",
      "Military satellites fall into a few main roles. Reconnaissance (or 'spy') satellites image the ground and intercept signals. Communications satellites (MILSATCOM) link forces and headquarters worldwide, including secure, jam-resistant channels. Navigation satellites such as GPS provide the positioning and timing that guide precision weapons and synchronize networks. Early-warning satellites watch for the heat plume of a ballistic-missile launch, giving crucial minutes of warning.",
      "Because so much modern warfare depends on space, satellites are also a vulnerability. Anti-satellite weapons, jamming, and cyber-attacks all aim to blind or disrupt an opponent's space systems, which is why resilience, redundancy, and large 'constellations' of smaller satellites are growing priorities.",
    ],
    keyFacts: [
      { label: "Domain", value: "Space" },
      { label: "Roles", value: "Recon, comms, navigation, warning" },
      { label: "Enables", value: "GPS-guided weapons, global comms" },
      { label: "Threats", value: "ASAT weapons, jamming, cyber" },
    ],
    examples: [
      {
        title: "GPS navigation satellites",
        description:
          "The U.S. GPS constellation provides the positioning and timing that guide precision weapons and synchronize military networks worldwide.",
      },
      {
        title: "Missile early-warning satellites",
        description:
          "Infrared satellites detect the heat of a missile launch within seconds, providing vital warning for missile defense.",
      },
    ],
    related: ["c4isr", "precision-guided-munition", "electronic-warfare", "data-link"],
    wiki: "Reconnaissance satellite",
    imageAlt: "A military reconnaissance satellite",
  },
  {
    slug: "iff",
    term: "Identification Friend or Foe",
    abbreviation: "IFF",
    category: "systems",
    tldr: "A system that lets forces ask 'are you friendly?' and get an automatic coded answer, to avoid shooting their own side.",
    summary:
      "An electronic system that lets military forces quickly tell whether a detected aircraft or vehicle is friendly.",
    definition: [
      "Identification Friend or Foe (IFF) is an electronic system that helps forces tell allies from enemies. When a radar detects an aircraft, it can send a coded radio 'challenge'; a friendly aircraft carrying the right equipment automatically sends back a coded 'reply'. If the correct answer comes back, the contact is a friend. Crucially, the lack of a reply does NOT prove hostility — it may just be a malfunction or a civilian — so IFF identifies friends, not foes.",
      "The system exists to solve one of warfare's deadliest problems: fratricide, or 'friendly fire'. In fast, confusing engagements where targets appear only as blips on a screen, IFF gives operators a quick, reliable way to avoid firing on their own side. It evolved from World War II and now underpins both military identification and, in a related civilian form, air-traffic control transponders.",
      "Because the codes are secret and change regularly, IFF is also a target for spoofing and electronic warfare. Reliable identification remains a hard, high-stakes problem, and IFF is one layer in a broader process of 'combat identification' that also uses radar signatures, flight behavior, and human judgment.",
    ],
    keyFacts: [
      { label: "Purpose", value: "Identify friendly contacts" },
      { label: "How", value: "Coded radio challenge and reply" },
      { label: "Key limit", value: "No reply ≠ confirmed enemy" },
      { label: "Solves", value: "Friendly fire (fratricide)" },
    ],
    examples: [
      {
        title: "Combat aircraft transponders",
        description:
          "Fighters carry IFF transponders so allied radars and pilots can confirm them as friendly before engaging.",
      },
      {
        title: "Air-traffic control link",
        description:
          "Civilian transponder systems used in air-traffic control descend directly from military IFF technology.",
      },
    ],
    related: ["c4isr", "data-link", "rules-of-engagement", "beyond-visual-range"],
    wiki: "Identification friend or foe",
    imageAlt: "An IFF transponder / identification system",
  },
  {
    slug: "data-link",
    term: "Tactical Data Link",
    abbreviation: "Link 16",
    category: "systems",
    tldr: "A secure digital radio that lets aircraft, ships and command centers share what they see, instantly and automatically.",
    summary:
      "A secure, standardized digital network that lets military platforms exchange tactical data automatically in real time.",
    definition: [
      "A tactical data link is a secure digital network that lets military platforms share information automatically and in near real time. Instead of a pilot describing a contact over voice radio, the data link sends the target's position, speed, and identity straight from one aircraft's computer to another's display. This creates a shared, constantly updated picture of the battlefield across many platforms at once.",
      "The best-known example is Link 16, a NATO-standard data link used by fighters, ships, ground units, and command aircraft. It is jam-resistant, encrypted, and lets dozens of participants exchange tracks, orders, and status messages simultaneously. The result is dramatically better situational awareness: every connected unit can 'see' what the others see, enabling coordinated tactics and sensor-to-shooter engagements where one platform fires on a target detected by another.",
      "Tactical data links are a backbone of modern, network-centric warfare and a key enabler of interoperability between allied forces. Because they are so valuable, they are also a focus of electronic warfare and cybersecurity, and a major factor in whether different nations' equipment can actually fight together.",
    ],
    keyFacts: [
      { label: "Function", value: "Auto-share tactical data in real time" },
      { label: "Example", value: "Link 16 (NATO standard)" },
      { label: "Traits", value: "Encrypted, jam-resistant" },
      { label: "Enables", value: "Shared picture, sensor-to-shooter" },
    ],
    examples: [
      {
        title: "Link 16 networks",
        description:
          "Allied fighters, ships, and AWACS share a common air picture over Link 16, coordinating engagements without voice radio.",
      },
      {
        title: "Sensor-to-shooter",
        description:
          "Data links let a sensor on one platform pass a target to a weapon on another, the essence of networked warfare.",
      },
    ],
    related: ["c4isr", "interoperability", "iff", "electronic-warfare"],
    wiki: "Link 16",
    imageAlt: "A tactical data link display",
  },
  {
    slug: "active-protection-system",
    term: "Active Protection System",
    abbreviation: "APS",
    category: "systems",
    tldr: "A shield for tanks that spots an incoming missile and shoots it down before it hits.",
    summary:
      "A vehicle defense system that detects and intercepts incoming anti-tank threats before they strike the armor.",
    definition: [
      "An active protection system (APS) defends an armored vehicle by detecting an incoming threat — such as an anti-tank missile or rocket — and actively stopping it, rather than just relying on thick passive armor to absorb the hit. Small radars and sensors on the vehicle constantly scan for incoming projectiles; when one is detected, the system reacts in a fraction of a second.",
      "There are two broad types. 'Soft-kill' systems try to defeat the threat without touching it — for example by jamming a missile's guidance or firing smoke and decoys to break its lock. 'Hard-kill' systems physically destroy the incoming projectile in mid-air, launching a small interceptor or a burst of fragments to knock it down just before impact. Some vehicles combine both.",
      "APS has become increasingly important as cheap, lethal anti-tank missiles and loitering munitions proliferate. By giving tanks and other vehicles a way to survive hits they could not stop with armor alone, active protection is a direct response to the changing economics of the battlefield, where a low-cost weapon can threaten a multimillion-dollar vehicle.",
    ],
    keyFacts: [
      { label: "Protects", value: "Tanks & armored vehicles" },
      { label: "How", value: "Detect then intercept incoming threats" },
      { label: "Types", value: "Soft-kill & hard-kill" },
      { label: "Counters", value: "ATGMs, RPGs, loitering munitions" },
    ],
    examples: [
      {
        title: "Trophy (Israel)",
        description:
          "A widely adopted hard-kill APS that intercepts incoming anti-tank rockets and missiles before they reach the vehicle.",
      },
      {
        title: "Response to drone threats",
        description:
          "Rising loitering-munition attacks have accelerated interest in active protection for ground vehicles.",
      },
    ],
    related: ["main-battle-tank", "atgm", "loitering-munition", "counter-uas"],
    wiki: "Trophy (countermeasure)",
    imageAlt: "A tank fitted with an active protection system",
  },

  // ── Doctrine & concepts ────────────────────────────────────────────────────
  {
    slug: "combined-arms",
    term: "Combined Arms",
    abbreviation: "",
    category: "doctrine",
    tldr: "Using tanks, infantry, artillery and aircraft together as a team, so each covers the others' weaknesses.",
    summary:
      "The coordinated use of different combat arms — infantry, armor, artillery, and air power — so their strengths reinforce each other.",
    definition: [
      "Combined arms is the principle of using different types of military forces together so that each compensates for the others' weaknesses. Tanks have firepower and protection but are vulnerable to infantry with anti-tank weapons in close terrain; infantry are flexible but fragile in the open; artillery and aircraft deliver heavy firepower but can't hold ground. Used together, they create a problem the enemy cannot easily solve.",
      "The core idea is that countering one arm exposes you to another. If the enemy spreads out to avoid artillery, they become vulnerable to a massed tank thrust; if they bunch up to stop the tanks, the artillery is devastating. Coordinating armor, infantry, artillery, engineers, and air support in time and space is what turns separate units into a coherent, hard-to-beat force.",
      "Combined arms is one of the most enduring concepts in land warfare and the reason armies organize into mixed formations rather than pure tank or pure infantry units. Modern versions extend the idea across all domains — adding cyber, electronic warfare, drones, and space — under the broader banner of 'joint' and 'multi-domain' operations.",
    ],
    keyFacts: [
      { label: "Idea", value: "Different arms cover each other's gaps" },
      { label: "Arms", value: "Infantry, armor, artillery, air" },
      { label: "Logic", value: "Countering one arm exposes you to another" },
      { label: "Modern form", value: "Joint / multi-domain operations" },
    ],
    examples: [
      {
        title: "Mechanized formations",
        description:
          "Armies field mixed brigades of tanks, infantry, artillery, and engineers precisely so they can fight as combined arms.",
      },
      {
        title: "Failures when arms are split",
        description:
          "Tanks advancing without infantry or air cover have repeatedly suffered heavy losses, illustrating why combined arms matters.",
      },
    ],
    related: ["main-battle-tank", "air-superiority", "force-multiplier", "interoperability"],
    wiki: "Combined arms",
    imageAlt: "Combined-arms forces operating together",
  },
  {
    slug: "air-superiority",
    term: "Air Superiority",
    abbreviation: "",
    category: "doctrine",
    tldr: "Controlling the sky enough that your planes can operate freely while the enemy's can't.",
    summary:
      "The degree of control of the air that lets friendly forces operate without serious interference from enemy aircraft.",
    definition: [
      "Air superiority is the condition in which one side controls the skies enough that its own air and ground forces can operate without serious interference from the enemy's air power. It does not mean the enemy is completely gone, but that they are suppressed enough to be a manageable threat. The stronger condition, where the enemy is virtually unable to interfere at all, is called 'air supremacy'.",
      "Winning control of the air typically means defeating both enemy fighters and their ground-based air defenses. This involves air-to-air combat, suppression of enemy air defenses (SEAD), and the use of stealth, electronic warfare, and beyond-visual-range missiles to dominate the airspace. Achieving it is usually the first priority of a campaign.",
      "The reason it matters so much is that almost everything else depends on it. With control of the air, a force can conduct reconnaissance, strike ground targets, move troops and supplies, and protect its own forces, all while denying those same advantages to the enemy. Losing it leaves ground forces exposed to constant air attack, which is why air superiority is often described as the precondition for modern joint operations.",
    ],
    keyFacts: [
      { label: "Meaning", value: "Usable control of the air" },
      { label: "Stronger form", value: "Air supremacy" },
      { label: "Won via", value: "Air combat, SEAD, stealth, EW" },
      { label: "Why it matters", value: "Enables all other operations" },
    ],
    examples: [
      {
        title: "First priority in air campaigns",
        description:
          "Modern campaigns typically open by fighting for control of the air before shifting to sustained strikes on ground targets.",
      },
      {
        title: "Contested skies",
        description:
          "When neither side can win air superiority, dense air defenses can keep both air forces at bay, shaping the whole conflict.",
      },
    ],
    related: ["fifth-generation-fighter", "sead", "beyond-visual-range", "integrated-air-defense-system"],
    wiki: "Air supremacy",
    imageAlt: "Fighters establishing control of the air",
  },
  {
    slug: "sead",
    term: "Suppression of Enemy Air Defenses",
    abbreviation: "SEAD / DEAD",
    category: "doctrine",
    tldr: "Hunting and knocking out the enemy's radars and anti-air missiles so your own planes can fly safely.",
    summary:
      "Operations to neutralize enemy air defenses — temporarily suppressing (SEAD) or permanently destroying (DEAD) them.",
    definition: [
      "Suppression of Enemy Air Defenses (SEAD) is the mission of neutralizing an enemy's ground-based air defenses — their radars, surface-to-air missile batteries, and command posts — so friendly aircraft can operate more safely. A closely related term, DEAD (Destruction of Enemy Air Defenses), means physically destroying those systems rather than just temporarily silencing them. Together they are essential to opening up contested airspace.",
      "SEAD uses a mix of methods. Specialized aircraft carry anti-radiation missiles that home in on the radio waves emitted by enemy radars, so that switching on a radar invites a missile in return. Electronic warfare jams and confuses the defenses, decoys bait them into revealing themselves, and stand-off weapons strike launchers and command nodes. The goal is to force defenders into a no-win choice: stay switched off and blind, or radiate and be destroyed.",
      "Because a dense integrated air defense system can make airspace deadly, SEAD/DEAD is often the dangerous opening act of an air campaign, flown by crews historically nicknamed 'Wild Weasels'. Success unravels the enemy's air-defense network and clears the way for the strikes, reconnaissance, and support that air superiority makes possible.",
    ],
    keyFacts: [
      { label: "SEAD", value: "Suppress (temporarily neutralize)" },
      { label: "DEAD", value: "Destroy permanently" },
      { label: "Tools", value: "Anti-radiation missiles, EW, decoys" },
      { label: "Targets", value: "Radars, SAM batteries, command nodes" },
    ],
    examples: [
      {
        title: "Anti-radiation missiles",
        description:
          "Weapons like the AGM-88 HARM home on the emissions of enemy radars, punishing air defenses for switching on.",
      },
      {
        title: "Opening-night strikes",
        description:
          "Air campaigns often begin with SEAD/DEAD to tear apart the enemy's integrated air defenses before other missions proceed.",
      },
    ],
    related: ["integrated-air-defense-system", "electronic-warfare", "air-superiority", "surface-to-air-missile"],
    wiki: "Wild Weasel",
    imageAlt: "A Wild Weasel aircraft used for suppressing air defenses",
  },
  {
    slug: "rules-of-engagement",
    term: "Rules of Engagement",
    abbreviation: "ROE",
    category: "doctrine",
    tldr: "The official rules telling soldiers when they are and aren't allowed to use force.",
    summary:
      "Directives that define when, where, and how military forces may use force during an operation.",
    definition: [
      "Rules of Engagement (ROE) are the orders that tell military forces when, where, and how they are permitted to use force. They translate political and legal limits into clear, practical instructions for the people actually pulling triggers — for example, whether troops may fire only in self-defense, what counts as a hostile act, and what approvals are needed before striking a target. ROE are how commanders keep the use of force aligned with the mission, the law, and policy.",
      "ROE balance two pressures: giving forces enough freedom to protect themselves and accomplish the mission, while preventing unnecessary harm, escalation, or violations of the laws of armed conflict. They can be restrictive (requiring positive identification and higher approval before firing) or more permissive, and they often change as a situation evolves. Crucially, ROE never override the inherent right of self-defense.",
      "Getting ROE right is both a legal and an operational matter. Rules that are too tight can leave troops exposed or let an enemy escape; rules that are too loose can cause civilian casualties and strategic damage. Clear, well-understood ROE are therefore central to discipline, accountability, and the legitimacy of any operation.",
    ],
    keyFacts: [
      { label: "Define", value: "When/where/how force may be used" },
      { label: "Balance", value: "Mission needs vs. restraint & law" },
      { label: "Range", value: "Restrictive to permissive" },
      { label: "Constant", value: "Right of self-defense preserved" },
    ],
    examples: [
      {
        title: "Positive identification requirements",
        description:
          "ROE may require confirming a target is hostile before firing, sometimes forcing aircraft closer despite long-range weapons.",
      },
      {
        title: "Escalation of force",
        description:
          "Checkpoints often use graduated steps — signal, warn, then fire — defined by ROE to limit unnecessary casualties.",
      },
    ],
    related: ["iff", "beyond-visual-range", "situational-awareness"],
  },
  {
    slug: "force-multiplier",
    term: "Force Multiplier",
    abbreviation: "",
    category: "doctrine",
    tldr: "Something that makes your existing forces much more effective — like a small upgrade that punches way above its weight.",
    summary:
      "A capability that dramatically increases the effectiveness of a force without adding proportional numbers.",
    definition: [
      "A force multiplier is anything that makes a military force far more effective than its raw size would suggest. Rather than simply adding more troops or weapons, a force multiplier lets the forces you already have achieve much more. The term captures the idea that capability, not just quantity, wins battles — a smaller, better-enabled force can defeat a larger one.",
      "Force multipliers come in many forms. Technology is a classic example: surveillance drones, GPS-guided weapons, night-vision, and secure data links all let the same number of soldiers see more, hit more accurately, and coordinate better. But force multipliers are not only hardware — superior training, morale, leadership, intelligence, logistics, and surprise can all multiply combat power dramatically.",
      "The concept is central to how modern, technologically advanced militaries think about their advantage. They often accept smaller numbers in exchange for capabilities — stealth, networking, precision, ISR — that each multiply the punch of every platform. Understanding what truly multiplies force, versus what just adds cost, is a core challenge of defense planning and procurement.",
    ],
    keyFacts: [
      { label: "Idea", value: "Boost effectiveness, not just numbers" },
      { label: "Examples", value: "Drones, PGMs, training, ISR, surprise" },
      { label: "Effect", value: "Smaller force punches above its weight" },
      { label: "Relevance", value: "Core to capability-based planning" },
    ],
    examples: [
      {
        title: "ISR drones",
        description:
          "Persistent surveillance lets a commander use limited forces far more efficiently by striking only confirmed targets.",
      },
      {
        title: "Precision weapons",
        description:
          "One precision-guided bomb can do the work that once took dozens, multiplying the effect of a single aircraft.",
      },
    ],
    related: ["c4isr", "precision-guided-munition", "combined-arms", "situational-awareness"],
  },
  {
    slug: "situational-awareness",
    term: "Situational Awareness",
    abbreviation: "SA",
    category: "doctrine",
    tldr: "Knowing what's going on around you — where everyone is and what they're doing — so you can make good, fast decisions.",
    summary:
      "An accurate, real-time understanding of the battlefield: where friendly, enemy, and neutral forces are and what they are doing.",
    definition: [
      "Situational awareness (SA) is the accurate, up-to-date understanding of what is happening around a force: where friendly, enemy, and neutral elements are, what they are doing, and what is likely to happen next. Good SA lets commanders and individual operators make the right decisions quickly; poor SA leads to surprise, mistakes, and friendly-fire incidents. It is often the difference between winning and losing an engagement.",
      "Building SA means turning raw data from many sensors — radars, drones, satellites, reports from troops — into a clear, shared picture, and then understanding what that picture means. Modern systems like data links and C4ISR exist largely to create and distribute this shared awareness so that everyone, from a pilot to a headquarters, sees the same battlefield in real time.",
      "Because awareness drives decisions, much of warfare is a contest to build your own SA while degrading the enemy's — through reconnaissance and networking on one side, and stealth, deception, and electronic warfare on the other. Speed matters too: a force that understands and acts faster than its opponent can stay perpetually a step ahead.",
    ],
    keyFacts: [
      { label: "Meaning", value: "Real-time understanding of the situation" },
      { label: "Built from", value: "Fused sensors + interpretation" },
      { label: "Enabled by", value: "C4ISR, data links, ISR" },
      { label: "Degraded by", value: "Stealth, deception, EW" },
    ],
    examples: [
      {
        title: "Sensor fusion in cockpits",
        description:
          "Fifth-generation fighters fuse many sensors into one display, giving the pilot superior situational awareness.",
      },
      {
        title: "Common operating picture",
        description:
          "Command centers build a shared, real-time map so all units act on the same understanding of the battlefield.",
      },
    ],
    related: ["c4isr", "data-link", "force-multiplier", "rules-of-engagement"],
  },
  {
    slug: "asymmetric-warfare",
    term: "Asymmetric Warfare",
    abbreviation: "",
    category: "doctrine",
    tldr: "When a weaker side avoids a head-on fight and uses cheap, unconventional tactics to offset a stronger enemy.",
    summary:
      "Conflict between forces of very unequal strength, where the weaker side uses unconventional methods to offset the stronger's advantages.",
    definition: [
      "Asymmetric warfare describes conflict between opponents of very unequal strength, in which the weaker side avoids the stronger side's strengths and instead exploits its weaknesses with unconventional methods. Rather than meeting a powerful conventional army head-on, the weaker actor uses tactics like guerrilla warfare, ambushes, roadside bombs, terrorism, cyber-attacks, or cheap drones to make the conflict costly, long, and politically unsustainable for the stronger side.",
      "The logic is to change the rules of the contest. A small force cannot win a tank battle against a superpower, but it can blend into the population, strike and disappear, target supply lines and morale, and turn the enemy's size and technology into burdens. Time and willpower, not battlefield victory, often become the decisive factors.",
      "Asymmetric approaches have shaped many modern conflicts and force advanced militaries to adapt expensive, high-end forces to messy, drawn-out fights. The rise of cheap, capable technology — commercial drones, loitering munitions, encrypted communications — has further empowered weaker actors, blurring the line between conventional and unconventional war.",
    ],
    keyFacts: [
      { label: "Definition", value: "Conflict between unequal forces" },
      { label: "Weaker side", value: "Avoids strengths, exploits weaknesses" },
      { label: "Methods", value: "Guerrilla, IEDs, terror, cyber, drones" },
      { label: "Decisive factor", value: "Time, cost, and willpower" },
    ],
    examples: [
      {
        title: "Insurgency and IEDs",
        description:
          "Lightly armed groups have used roadside bombs and hit-and-run tactics to impose heavy costs on far stronger conventional forces.",
      },
      {
        title: "Cheap drones vs. expensive systems",
        description:
          "Low-cost drones and loitering munitions let weaker actors threaten tanks, ships, and bases worth far more.",
      },
    ],
    related: ["loitering-munition", "force-multiplier", "a2ad"],
    wiki: "Asymmetric warfare",
    imageAlt: "Irregular forces in asymmetric warfare",
  },
  {
    slug: "logistics",
    term: "Military Logistics",
    abbreviation: "",
    category: "doctrine",
    tldr: "Getting troops everything they need — fuel, food, ammo, spare parts — to the right place at the right time.",
    summary:
      "The planning and movement of supplies, equipment, fuel, and personnel needed to sustain military forces in operations.",
    definition: [
      "Military logistics is the practical business of supplying and sustaining armed forces: moving and maintaining the fuel, ammunition, food, water, spare parts, and personnel that fighting forces need to keep operating. It is often summed up by the saying that 'amateurs talk tactics, professionals talk logistics' — because the most brilliant plan fails if the troops run out of fuel or bullets.",
      "Logistics covers a vast chain: procurement, storage, transport by land, sea, and air, distribution to front-line units, and the maintenance and repair that keep equipment working. It must function across huge distances, under enemy attack, and at enormous scale — a single mechanized division can consume staggering quantities of fuel and supplies every day. Getting the right thing to the right place at the right time is a relentless, complex task.",
      "Because logistics is the lifeline of any force, it is both a war-winning capability and a critical vulnerability. Cutting an enemy's supply lines can be more decisive than defeating them in battle, and the ability to project and sustain forces far from home is one of the clearest markers of a first-rank military power.",
    ],
    keyFacts: [
      { label: "Covers", value: "Supply, transport, maintenance" },
      { label: "Sustains", value: "Fuel, ammo, food, spares, troops" },
      { label: "Challenge", value: "Scale, distance, under attack" },
      { label: "Strategic value", value: "Lifeline and key vulnerability" },
    ],
    examples: [
      {
        title: "Aerial refueling & sealift",
        description:
          "Tanker aircraft and cargo ships let forces project power globally — a logistics capability few nations possess.",
      },
      {
        title: "Cutting supply lines",
        description:
          "Targeting fuel and ammunition resupply has repeatedly stalled advances that looked unstoppable on a map.",
      },
    ],
    related: ["mro", "interoperability", "force-multiplier"],
    wiki: "Military logistics",
    imageAlt: "Military logistics and supply operations",
  },

  // ── Industry & Programs ────────────────────────────────────────────────────
  {
    slug: "mro",
    term: "Maintenance, Repair & Overhaul",
    abbreviation: "MRO",
    category: "industry",
    tldr: "All the work of keeping military gear running — servicing it, fixing it, and rebuilding it — for decades after it's bought.",
    summary:
      "The services that keep defense equipment operational over its life: routine maintenance, repair of faults, and major overhauls.",
    definition: [
      "Maintenance, Repair and Overhaul (MRO) is the work of keeping military equipment in working order throughout its service life. 'Maintenance' is the routine, scheduled care that prevents breakdowns; 'repair' fixes faults and battle damage; and 'overhaul' is the periodic, deep rebuild that restores a worn platform — an aircraft, ship, or vehicle — to like-new condition. Together they keep expensive systems available and safe to use, often for decades.",
      "MRO is a huge and steady part of the defense business. Because military platforms are bought in small numbers but kept for thirty, forty, or more years, the cost of sustaining them over time usually dwarfs the original purchase price. This makes MRO a major, recurring revenue stream for manufacturers and specialist firms, and a key consideration in any procurement decision.",
      "MRO is also strategically important. A nation that can maintain and overhaul its own equipment is far less dependent on a foreign supplier, which is why local MRO capability is a common goal of offset agreements and industrial policy. 'Readiness' — the share of a fleet actually available to fight at any moment — depends directly on how well MRO is organized and funded.",
    ],
    keyFacts: [
      { label: "Stands for", value: "Maintenance, Repair & Overhaul" },
      { label: "Parts", value: "Routine care, repairs, deep rebuilds" },
      { label: "Cost", value: "Often exceeds the original price" },
      { label: "Drives", value: "Fleet readiness & availability" },
    ],
    examples: [
      {
        title: "Sustainment over decades",
        description:
          "Platforms like the B-52 bomber stay in service for generations thanks to continuous maintenance and overhaul programs.",
      },
      {
        title: "MRO as an offset goal",
        description:
          "Buyers often require local MRO facilities so they can service their own fleets and reduce dependence on the seller.",
      },
    ],
    related: ["life-cycle-cost", "logistics", "offset", "defense-procurement"],
    wiki: "Aircraft maintenance",
    imageAlt: "Maintenance and overhaul of military equipment",
  },
  {
    slug: "defense-procurement",
    term: "Defense Procurement",
    abbreviation: "Acquisition",
    category: "industry",
    tldr: "The whole process a government uses to decide what military equipment to buy, choose a supplier, and pay for it.",
    summary:
      "The government process of defining requirements, selecting suppliers, and buying defense equipment and services.",
    definition: [
      "Defense procurement (or 'acquisition') is the process by which a government decides what military equipment it needs, chooses who will build it, and manages the purchase through to delivery and support. It runs from identifying a capability gap, through writing detailed requirements and running a competition, to negotiating a contract and overseeing development and production. It is how defense budgets turn into actual ships, aircraft, and weapons.",
      "The process is deliberately structured and heavily regulated, because it spends large amounts of public money on complex, long-lived systems. It typically involves formal requirements documents, competitive tenders (requests for proposals), evaluation of bids on cost and capability, and contracts with milestones and oversight. Programs pass through review 'gates' where they must prove progress before more money is committed.",
      "Defense procurement is notoriously difficult. Programs are huge, technically risky, and politically sensitive, and cost overruns and delays are common. Balancing capability, cost, schedule, industrial-base health, and accountability — while avoiding waste and corruption — is one of the central challenges of defense management, and the reason acquisition reform is a perennial topic.",
    ],
    keyFacts: [
      { label: "Covers", value: "Requirement → supplier → delivery" },
      { label: "Tools", value: "RFPs, competitions, milestone gates" },
      { label: "Tension", value: "Capability vs. cost vs. schedule" },
      { label: "Risk", value: "Overruns, delays, complexity" },
    ],
    examples: [
      {
        title: "Major fighter competitions",
        description:
          "Nations run multi-year procurement contests to choose a new fighter, weighing cost, capability, offsets, and industrial benefits.",
      },
      {
        title: "Cost overruns",
        description:
          "Large, complex programs frequently exceed their budgets and timelines, driving repeated acquisition-reform efforts.",
      },
    ],
    related: ["request-for-proposal", "prime-contractor", "cost-plus-contract", "life-cycle-cost"],
  },
  {
    slug: "prime-contractor",
    term: "Prime Contractor",
    abbreviation: "Prime",
    category: "industry",
    tldr: "The main company that wins a defense contract and is responsible for the whole project, managing all the smaller suppliers below it.",
    summary:
      "The lead company that holds the main contract for a defense program and integrates the work of subcontractors.",
    definition: [
      "A prime contractor (or 'prime') is the company that holds the main contract with the government for a defense program and bears overall responsibility for delivering it. Big systems — a fighter, a warship, a missile — are far too complex for one firm to build entirely, so the prime acts as the lead integrator: it designs the overall system and coordinates a pyramid of suppliers who provide engines, radars, electronics, and thousands of other parts.",
      "Below the prime sit tiers of subcontractors. 'Tier 1' suppliers provide major subsystems directly to the prime; 'Tier 2' and below supply components and materials further down the chain. The prime manages this supply chain, integrates everything into a working system, and is accountable to the customer for cost, schedule, and performance. This integration role is itself a highly valuable capability.",
      "Being a prime is the most prestigious and lucrative position in the defense industry, which is why a handful of large companies dominate as primes while many others compete for subcontractor work. Governments watch the health and competition among primes closely, since too few can reduce competition and innovation across the whole defense industrial base.",
    ],
    keyFacts: [
      { label: "Role", value: "Lead contractor & system integrator" },
      { label: "Manages", value: "Tiers of subcontractors" },
      { label: "Accountable for", value: "Cost, schedule, performance" },
      { label: "Position", value: "Top of the supply pyramid" },
    ],
    examples: [
      {
        title: "Fighter program primes",
        description:
          "A company like Lockheed Martin acts as prime on a fighter, integrating engines, radars, and systems from many suppliers.",
      },
      {
        title: "Teaming for bids",
        description:
          "Firms often team up, with one acting as prime and others as major subcontractors, to win large competitions.",
      },
    ],
    related: ["defense-industrial-base", "defense-procurement", "offset"],
  },
  {
    slug: "defense-industrial-base",
    term: "Defense Industrial Base",
    abbreviation: "DIB",
    category: "industry",
    tldr: "All the companies and factories a country relies on to design, build, and maintain its weapons and military gear.",
    summary:
      "The network of companies, facilities, and workers that design, produce, and sustain a nation's defense equipment.",
    definition: [
      "The defense industrial base (DIB) is the whole network of companies, factories, laboratories, and skilled workers that a country relies on to design, manufacture, and maintain its military equipment. It spans the big prime contractors, the many tiers of suppliers beneath them, the raw materials and specialized components they need, and the workforce with the skills to build and sustain complex systems.",
      "A healthy DIB is treated as a matter of national security, not just economics. A country that can produce its own weapons is less dependent on foreign suppliers who might cut it off, and can surge production in a crisis. Conversely, gaps — a sole supplier of a critical component, a lost skill, or reliance on a potential adversary for a key material — are strategic vulnerabilities that governments work hard to identify and fix.",
      "Recent conflicts have sharply highlighted the DIB, especially the difficulty of rapidly increasing the production of munitions like artillery shells and missiles after years of low-rate output. This has driven renewed investment, attention to supply-chain resilience, and policies aimed at keeping critical defense-industrial capabilities at home or among trusted allies.",
    ],
    keyFacts: [
      { label: "Includes", value: "Primes, suppliers, materials, workers" },
      { label: "Why it matters", value: "Independence & surge capacity" },
      { label: "Vulnerabilities", value: "Sole suppliers, lost skills" },
      { label: "Hot topic", value: "Munitions production capacity" },
    ],
    examples: [
      {
        title: "Munitions surge",
        description:
          "Efforts to ramp up artillery-shell and missile production exposed the limits of an industrial base optimized for peacetime rates.",
      },
      {
        title: "Supply-chain reshoring",
        description:
          "Governments push to keep critical components and materials within trusted countries to reduce strategic dependence.",
      },
    ],
    related: ["prime-contractor", "defense-procurement", "dual-use", "mro"],
    wiki: "Arms industry",
    imageAlt: "A defense manufacturing facility",
  },
  {
    slug: "cost-plus-contract",
    term: "Cost-Plus Contract",
    abbreviation: "",
    category: "industry",
    tldr: "A deal where the government pays the supplier's actual costs plus an agreed profit — used when the work is too uncertain to price upfront.",
    summary:
      "A contract in which the government reimburses the contractor's allowable costs plus an additional fee for profit.",
    definition: [
      "A cost-plus contract is an agreement in which the government pays the contractor for its actual allowable costs of doing the work, plus an additional amount as profit (the 'plus'). It is used when a project is too uncertain or risky to price accurately in advance — typically cutting-edge research and development, where nobody yet knows exactly what the work will involve or cost.",
      "The arrangement shifts cost risk onto the government rather than the contractor. Because the contractor is reimbursed for what it spends, it is protected from losing money on an unpredictable project, which encourages firms to take on ambitious, high-risk development. The trade-off is the obvious danger: with costs covered, there is less natural pressure to keep them down, so cost-plus contracts require careful government oversight and auditing.",
      "Cost-plus sits at one end of a spectrum of contract types. At the other end is the firm-fixed-price contract, where the contractor agrees a set price and bears the risk of overruns — better suited to well-understood, mature products. Choosing the right contract type for the level of uncertainty is a key skill in defense procurement, balancing risk, incentive, and value for money.",
    ],
    keyFacts: [
      { label: "Government pays", value: "Actual costs + a fee" },
      { label: "Best for", value: "Risky R&D, high uncertainty" },
      { label: "Risk sits with", value: "The government" },
      { label: "Downside", value: "Weak incentive to cut costs" },
    ],
    examples: [
      {
        title: "Development programs",
        description:
          "New, technically risky systems are often developed under cost-plus contracts because the final cost can't be known in advance.",
      },
      {
        title: "Oversight and audits",
        description:
          "Because costs are reimbursed, cost-plus contracts rely on close government auditing to prevent waste.",
      },
    ],
    related: ["defense-procurement", "life-cycle-cost", "prime-contractor"],
  },
  {
    slug: "life-cycle-cost",
    term: "Life-Cycle Cost",
    abbreviation: "LCC / TCO",
    category: "industry",
    tldr: "The true total cost of a weapon over its whole life — not just buying it, but fueling, maintaining and eventually retiring it.",
    summary:
      "The total cost of a system across its entire life: development, purchase, operation, maintenance, and disposal.",
    definition: [
      "Life-cycle cost (LCC), also called total cost of ownership, is the full cost of a military system across its entire life — not just the price tag to buy it. It adds up research and development, the purchase itself, and then the often much larger costs of operating it (fuel, crews), maintaining it (spare parts, repairs, overhauls), upgrading it, and finally disposing of it at the end of its service.",
      "The key insight is that the purchase price is often only a fraction of the true cost. For many platforms, the money spent keeping them running over decades far exceeds what they cost to buy. A cheaper aircraft that is expensive to maintain can end up costing far more than a pricier one that is cheap to operate, so judging value on the sticker price alone is misleading.",
      "Because of this, modern defense procurement increasingly evaluates bids on life-cycle cost rather than purchase price, and looks for designs that are reliable and cheap to sustain. Understanding LCC is essential for honest budgeting, since under-counting future support costs is a common way that programs end up unaffordable.",
    ],
    keyFacts: [
      { label: "Covers", value: "R&D + buy + operate + maintain + dispose" },
      { label: "Key point", value: "Purchase price is only part of it" },
      { label: "Often largest", value: "Operation & support over decades" },
      { label: "Used for", value: "Honest comparison of bids" },
    ],
    examples: [
      {
        title: "Operating cost per flight hour",
        description:
          "Aircraft are compared on cost per flight hour, since sustainment over decades can dwarf the original purchase price.",
      },
      {
        title: "Designing for sustainment",
        description:
          "Programs increasingly favor reliable, easy-to-maintain designs to keep life-cycle costs affordable.",
      },
    ],
    related: ["mro", "defense-procurement", "cost-plus-contract"],
  },
  {
    slug: "request-for-proposal",
    term: "Request for Proposal",
    abbreviation: "RFP / Tender",
    category: "industry",
    tldr: "The official document a government publishes to ask companies to bid for a contract, describing exactly what it needs.",
    summary:
      "A formal solicitation inviting companies to submit competitive bids to meet a defined defense requirement.",
    definition: [
      "A Request for Proposal (RFP), often called a tender, is the formal document a government issues to invite companies to bid for a contract. It describes the requirement in detail — what capability is needed, the technical specifications, the timeline, the budget constraints, and the criteria on which bids will be judged — and asks interested firms to submit proposals explaining how they would meet it and at what price.",
      "The RFP is the heart of competitive procurement. By setting out clear requirements and evaluation criteria in advance, it lets the government compare rival offers fairly on capability, cost, risk, and other factors, and creates a transparent, auditable basis for the decision. Companies invest heavily in preparing proposals, since winning a major defense RFP can mean decades of work.",
      "RFPs are usually one step in a longer process. They may be preceded by a Request for Information (RFI) to survey the market, and followed by clarifications, negotiations, and sometimes prototype evaluations before a contract is finally awarded. Well-written requirements are crucial: vague or unrealistic RFPs lead to poor bids, disputes, and troubled programs down the line.",
    ],
    keyFacts: [
      { label: "What it is", value: "Formal invitation to bid" },
      { label: "Specifies", value: "Requirements, criteria, timeline" },
      { label: "Purpose", value: "Fair, transparent competition" },
      { label: "Related", value: "RFI precedes; contract follows" },
    ],
    examples: [
      {
        title: "Major platform tenders",
        description:
          "Governments issue detailed RFPs for new fighters, ships, or vehicles, then evaluate competing bids against published criteria.",
      },
      {
        title: "Requirements quality",
        description:
          "Clear, realistic RFP requirements are essential; vague ones lead to weak bids and troubled programs.",
      },
    ],
    related: ["defense-procurement", "prime-contractor", "cost-plus-contract"],
  },

  // ── Naval platforms ────────────────────────────────────────────────────────
  {
    slug: "fremm",
    term: "FREMM Frigate",
    abbreviation: "FREMM",
    category: "platforms",
    tldr: "A modern French-Italian warship class — a multi-mission frigate that can fight submarines, ships, aircraft, and land targets.",
    summary:
      "A class of multipurpose frigates jointly developed by France and Italy for anti-submarine, anti-air, anti-ship, and land-attack missions.",
    definition: [
      "FREMM (from the French/Italian for 'European Multi-Mission Frigate') is a class of modern warships jointly developed by France and Italy and built in several variants. A frigate is a mid-sized warship, and the FREMM is designed to be a flexible workhorse: capable of hunting submarines, defending against aircraft and missiles, striking other ships, and even launching cruise missiles at land targets, all from one hull.",
      "The program is a flagship example of European defense cooperation and of export success — variants have been sold to navies including Egypt, Morocco, and, in a derived design, the United States (the Constellation class). Its blend of advanced sonar, radar, vertical-launch missiles, and a helicopter makes it a benchmark for the multi-mission frigates many navies now favor over specialized single-role ships.",
    ],
    keyFacts: [
      { label: "FREMM means", value: "European Multi-Mission Frigate" },
      { label: "Built by", value: "France & Italy (Naval Group, Fincantieri)" },
      { label: "Roles", value: "ASW, anti-air, anti-ship, land attack" },
      { label: "Exported to", value: "Egypt, Morocco, US-derived design" },
    ],
    examples: [
      {
        title: "Aquitaine & Bergamini classes",
        description:
          "The French and Italian FREMM variants form the backbone of both navies' frigate fleets, tuned for different mission emphases.",
      },
      {
        title: "US Constellation class",
        description:
          "The U.S. Navy selected a FREMM-derived design for its new guided-missile frigate, a major export and design win.",
      },
    ],
    related: ["frigate", "vls", "sonar", "anti-submarine-warfare"],
    wiki: "FREMM multipurpose frigate",
    imageAlt: "A FREMM multi-mission frigate at sea",
  },
  {
    slug: "frigate",
    term: "Frigate",
    abbreviation: "FFG",
    category: "platforms",
    tldr: "A mid-sized, do-a-bit-of-everything warship — smaller than a destroyer, used to escort and protect fleets.",
    summary:
      "A mid-sized, general-purpose warship used for escort, patrol, and multi-role combat duties.",
    definition: [
      "A frigate is a mid-sized warship that sits below a destroyer in size and firepower but is more capable than a small corvette. Frigates are the versatile workhorses of most navies, used to escort larger ships and convoys, patrol sea lanes, hunt submarines, and provide air defense for a task group. Their balance of capability and affordability means many navies field them in larger numbers than bigger warships.",
      "Modern frigates carry a mix of sensors and weapons — radar, sonar, surface-to-air and anti-ship missiles, a gun, and usually a helicopter — packed into a hull cheaper to build and operate than a destroyer. The line between frigate and destroyer has blurred over time, with the labels often reflecting national tradition as much as size.",
    ],
    keyFacts: [
      { label: "Size", value: "Below destroyer, above corvette" },
      { label: "Roles", value: "Escort, patrol, ASW, air defense" },
      { label: "Carries", value: "Missiles, gun, sonar, helicopter" },
      { label: "Why common", value: "Capable yet affordable" },
    ],
    examples: [
      {
        title: "FREMM & Type 26",
        description:
          "Modern multi-mission frigates like the FREMM and Britain's Type 26 form the core of many Western surface fleets.",
      },
      {
        title: "Fleet escorts",
        description:
          "Frigates routinely screen aircraft carriers and amphibious ships against submarine and air threats.",
      },
    ],
    related: ["fremm", "destroyer", "corvette", "anti-submarine-warfare"],
    wiki: "Frigate",
    imageAlt: "A general-purpose naval frigate",
  },
  {
    slug: "destroyer",
    term: "Destroyer",
    abbreviation: "DDG",
    category: "platforms",
    tldr: "A large, heavily armed warship that's the main muscle of a modern surface fleet, especially for air and missile defense.",
    summary:
      "A fast, heavily armed warship that provides a fleet's main surface combat power, especially air and missile defense.",
    definition: [
      "A destroyer is a large, fast, heavily armed warship that provides much of a modern fleet's combat power. Once small ships built to 'destroy' torpedo boats, destroyers have grown into the most powerful surface combatants in most navies, often bigger and better armed than frigates. Their signature role today is air and missile defense, shielding aircraft carriers and other ships from attack.",
      "Top destroyers carry powerful radars, dozens of vertical-launch missile cells, and advanced combat systems like Aegis that can track and engage many targets at once. Many are multi-mission, also able to strike land targets with cruise missiles, hunt submarines, and increasingly intercept ballistic missiles, making them among the most expensive and capable non-carrier warships afloat.",
    ],
    keyFacts: [
      { label: "Size", value: "Largest common surface combatant" },
      { label: "Signature role", value: "Air & missile defense" },
      { label: "Armament", value: "VLS cells, radar, guns, missiles" },
      { label: "Combat system", value: "Often Aegis" },
    ],
    examples: [
      {
        title: "Arleigh Burke class (USA)",
        description:
          "Aegis-equipped destroyers that form the backbone of U.S. fleet air and missile defense, widely influential worldwide.",
      },
      {
        title: "Ballistic-missile defense",
        description:
          "Some destroyers can intercept ballistic missiles, extending fleet defense into missile-shield duties.",
      },
    ],
    related: ["frigate", "aegis", "vls", "ballistic-missile"],
    wiki: "Destroyer",
    imageAlt: "A guided-missile destroyer",
  },
  {
    slug: "corvette",
    term: "Corvette",
    abbreviation: "",
    category: "platforms",
    tldr: "A small, agile warship for coastal patrol and defense — cheaper than a frigate but still able to pack a punch.",
    summary:
      "A small, fast warship used mainly for coastal patrol and defense, smaller than a frigate.",
    definition: [
      "A corvette is the smallest class of conventional warship, smaller and cheaper than a frigate. Corvettes are favored by navies that operate close to their own coasts, where their modest size, speed, and lower cost let them patrol, defend territorial waters, and carry out missions without the expense of larger ships. They are popular with smaller navies and for guarding economic zones.",
      "Despite their size, modern corvettes can be heavily armed for their class, carrying anti-ship and surface-to-air missiles, a gun, and sometimes a helicopter or drones. The trade-off is limited endurance, seakeeping, and capability in open ocean compared with frigates and destroyers, so they are best suited to littoral (near-shore) operations.",
    ],
    keyFacts: [
      { label: "Size", value: "Smallest conventional warship" },
      { label: "Best for", value: "Coastal / littoral operations" },
      { label: "Strength", value: "Low cost, agile, punchy" },
      { label: "Limit", value: "Short range, open-ocean ability" },
    ],
    examples: [
      {
        title: "Coastal defense navies",
        description:
          "Smaller navies field corvettes to patrol and defend their waters affordably without large oceangoing fleets.",
      },
      {
        title: "Missile corvettes",
        description:
          "Compact corvettes armed with anti-ship missiles can threaten far larger vessels in confined seas.",
      },
    ],
    related: ["frigate", "littoral-combat-ship", "anti-ship-missile"],
    wiki: "Corvette",
    imageAlt: "A small naval corvette",
  },
  {
    slug: "amphibious-assault-ship",
    term: "Amphibious Assault Ship",
    abbreviation: "LHD / LHA",
    category: "platforms",
    tldr: "A big warship that carries troops, helicopters and landing craft to put a force ashore — like a mini aircraft carrier for marines.",
    summary:
      "A large warship designed to land troops, vehicles, and aircraft on a hostile shore, resembling a small carrier.",
    definition: [
      "An amphibious assault ship is a large warship built to project a ground force from the sea onto a shore. Resembling a small aircraft carrier with a flat flight deck, it carries marines along with the helicopters, vertical-takeoff jets, landing craft, and vehicles needed to put them ashore and support them. It is the centerpiece of amphibious warfare — attacking from the sea — and of disaster-relief operations.",
      "These ships combine an aviation deck for helicopters and sometimes STOVL fighters like the F-35B with a flooded internal 'well deck' from which landing craft and amphibious vehicles launch. Only a few navies operate them, as they are large, expensive, and complex, but they provide unmatched flexibility for crisis response, evacuations, and power projection.",
    ],
    keyFacts: [
      { label: "Role", value: "Land troops & equipment from the sea" },
      { label: "Carries", value: "Marines, helicopters, landing craft" },
      { label: "Feature", value: "Flight deck + flooded well deck" },
      { label: "Also used for", value: "Disaster relief, evacuation" },
    ],
    examples: [
      {
        title: "America & Wasp classes (USA)",
        description:
          "Large U.S. amphibious assault ships that can operate F-35B jets and helicopters alongside an embarked marine force.",
      },
      {
        title: "Crisis response",
        description:
          "Their aviation and sealift capacity makes amphibious ships valuable for evacuations and humanitarian missions.",
      },
    ],
    related: ["aircraft-carrier", "fifth-generation-fighter", "frigate"],
    wiki: "Amphibious assault ship",
    imageAlt: "An amphibious assault ship with a flight deck",
  },
  {
    slug: "littoral-combat-ship",
    term: "Littoral Combat Ship",
    abbreviation: "LCS",
    category: "platforms",
    tldr: "A fast, shallow-water warship meant to fight close to shore, with swappable mission modules — though its real-world record has been rocky.",
    summary:
      "A fast U.S. warship class designed for near-shore operations using interchangeable mission modules.",
    definition: [
      "The Littoral Combat Ship (LCS) is a class of fast, relatively small U.S. Navy warships designed to operate in the 'littorals' — the shallow waters close to shore where larger ships are vulnerable. Its defining idea was modularity: instead of fixed equipment, the ship would swap interchangeable 'mission modules' to specialize in anti-submarine, mine-clearing, or surface warfare as needed.",
      "In practice the LCS program became a cautionary tale in defense procurement, plagued by cost growth, reliability problems, delayed mission modules, and questions about its survivability in serious combat. It is often cited in discussions of acquisition risk and of the trade-offs between ambitious concepts and practical results, even as the ships remain in service.",
    ],
    keyFacts: [
      { label: "Designed for", value: "Shallow, near-shore waters" },
      { label: "Key idea", value: "Swappable mission modules" },
      { label: "Operator", value: "U.S. Navy" },
      { label: "Reputation", value: "Troubled, costly program" },
    ],
    examples: [
      {
        title: "Freedom & Independence variants",
        description:
          "Two very different hull designs were built under the LCS program, complicating support and training.",
      },
      {
        title: "Acquisition lessons",
        description:
          "The LCS is frequently studied as an example of how modular ambitions can collide with cost and reliability realities.",
      },
    ],
    related: ["corvette", "frigate", "defense-procurement", "anti-submarine-warfare"],
    wiki: "Littoral combat ship",
    imageAlt: "A Littoral Combat Ship underway",
  },

  // ── Air platforms ──────────────────────────────────────────────────────────
  {
    slug: "multirole-fighter",
    term: "Multirole Fighter",
    abbreviation: "",
    category: "platforms",
    tldr: "A fighter jet built to do many jobs — dogfighting, bombing, reconnaissance — instead of just one.",
    summary:
      "A combat aircraft designed to perform multiple missions, such as air-to-air combat and ground attack, in one platform.",
    definition: [
      "A multirole fighter is a combat aircraft designed to perform several different missions rather than specializing in just one. The same jet can switch between air-to-air combat, bombing ground targets, reconnaissance, and suppressing air defenses, often within a single sortie by changing its weapons load. This flexibility lets air forces buy one type of aircraft to cover many needs, simplifying training, logistics, and cost.",
      "Most modern fighters are multirole, reflecting tight budgets and the value of versatility. The approach contrasts with earlier eras of dedicated interceptors, bombers, and attack aircraft. The trade-off is that a jack-of-all-trades may not match a specialized design in any single role, which is why some air forces still field a high-end air-superiority fighter alongside cheaper multirole types.",
    ],
    keyFacts: [
      { label: "Idea", value: "One jet, many missions" },
      { label: "Missions", value: "Air combat, strike, recon, SEAD" },
      { label: "Benefit", value: "Cost, logistics, flexibility" },
      { label: "Trade-off", value: "Less optimal than specialists" },
    ],
    examples: [
      {
        title: "F-16, Rafale, Typhoon",
        description:
          "Widely exported 4th/4.5-generation multirole fighters that can swing between air-to-air and ground-attack tasks.",
      },
      {
        title: "High-low mix",
        description:
          "Air forces often pair a few high-end air-superiority jets with many cheaper multirole fighters.",
      },
    ],
    related: ["fifth-generation-fighter", "air-to-air-missile", "precision-guided-munition", "air-superiority"],
    wiki: "Multirole combat aircraft",
    imageAlt: "A multirole fighter jet",
  },
  {
    slug: "attack-helicopter",
    term: "Attack Helicopter",
    abbreviation: "",
    category: "platforms",
    tldr: "A heavily armed helicopter built to destroy tanks and support troops, flying low and slow over the battlefield.",
    summary:
      "An armed helicopter designed to attack ground targets, especially armor, and support ground forces.",
    definition: [
      "An attack helicopter is a military helicopter built specifically to attack ground targets — tanks, vehicles, fortifications, and troops — and to support friendly ground forces. Flying low and slow, it can hide behind terrain, hover, and deliver precise fire with anti-tank missiles, rockets, and cannons. Its ability to loiter over a battlefield and kill armor made it a feared anti-tank weapon.",
      "Attack helicopters carry armor, redundant systems, and sensors for finding targets day or night. But flying low over the battlefield exposes them to man-portable air-defense missiles, anti-aircraft guns, and now cheap drones and loitering munitions, which have made their survivability a growing concern and prompted new tactics and defenses.",
    ],
    keyFacts: [
      { label: "Role", value: "Anti-armor & close support" },
      { label: "Weapons", value: "ATGMs, rockets, cannon" },
      { label: "Strength", value: "Hover, hide, precise fire" },
      { label: "Threats", value: "MANPADS, AAA, drones" },
    ],
    examples: [
      {
        title: "AH-64 Apache (USA)",
        description:
          "A heavily armed attack helicopter widely exported and used as the benchmark for anti-armor rotary firepower.",
      },
      {
        title: "Survivability debate",
        description:
          "Losses to man-portable missiles and drones have sparked debate over how attack helicopters should be used.",
      },
    ],
    related: ["atgm", "manpads", "combined-arms", "main-battle-tank"],
    wiki: "Attack helicopter",
    imageAlt: "An attack helicopter armed with missiles",
  },
  {
    slug: "awacs",
    term: "Airborne Early Warning & Control",
    abbreviation: "AEW&C / AWACS",
    category: "platforms",
    tldr: "A plane with a big radar on its back that watches huge areas of sky and directs friendly fighters — a flying control tower.",
    summary:
      "An aircraft carrying a powerful radar and command systems to detect aircraft far away and direct friendly forces.",
    definition: [
      "Airborne Early Warning and Control (AEW&C, often called AWACS after a famous system) is an aircraft fitted with a powerful surveillance radar — usually in a large rotating dome — and a command center in the cabin. By flying high, it sees much farther than ground radars, which are limited by the horizon, detecting low-flying aircraft and missiles at great range and giving early warning of attack.",
      "Beyond detection, the crew acts as airborne battle managers, tracking hundreds of targets and directing friendly fighters to intercept threats. This makes AWACS a force multiplier and a central C4ISR node: it extends a force's vision and coordination across a vast area. Because it is so valuable, it is also a priority target, and is usually kept well behind the front and heavily protected.",
    ],
    keyFacts: [
      { label: "What it is", value: "Flying radar & command post" },
      { label: "Advantage", value: "Sees over the horizon" },
      { label: "Roles", value: "Early warning + battle management" },
      { label: "Value", value: "Force multiplier, key C4ISR node" },
    ],
    examples: [
      {
        title: "E-3 Sentry (AWACS)",
        description:
          "The classic rotating-dome AWACS used by the U.S. and NATO to detect threats and control air battles.",
      },
      {
        title: "High-value target",
        description:
          "Because losing an AWACS blinds a force, both protecting and hunting them is a major focus of air warfare.",
      },
    ],
    related: ["c4isr", "radar", "air-superiority", "force-multiplier"],
    wiki: "Airborne early warning and control",
    imageAlt: "An AWACS aircraft with a radar dome",
  },
  {
    slug: "strategic-bomber",
    term: "Strategic Bomber",
    abbreviation: "",
    category: "platforms",
    tldr: "A big, long-range aircraft that can fly across the world to drop large amounts of bombs or missiles — including nuclear ones.",
    summary:
      "A long-range bomber able to strike distant strategic targets with heavy conventional or nuclear payloads.",
    definition: [
      "A strategic bomber is a large, long-range aircraft designed to fly great distances and deliver a heavy load of bombs or missiles against an enemy's strategic targets — cities, industry, command centers, and military bases — far from the front line. Distinguished from tactical aircraft that support troops in battle, strategic bombers project power across continents and form one leg of the nuclear triad.",
      "These aircraft emphasize range, payload, and increasingly stealth or stand-off weapons to survive modern air defenses. Their flexibility — able to carry conventional precision weapons, cruise missiles, or nuclear arms — and their long endurance make them potent signaling and deterrence tools, able to be launched, recalled, or repositioned to demonstrate resolve.",
    ],
    keyFacts: [
      { label: "Role", value: "Long-range strikes on strategic targets" },
      { label: "Payload", value: "Heavy; conventional or nuclear" },
      { label: "Triad leg", value: "The airborne leg" },
      { label: "Edge", value: "Range, stealth, stand-off weapons" },
    ],
    examples: [
      {
        title: "B-52, B-2, B-21 (USA)",
        description:
          "From the long-serving B-52 to the stealthy B-2 and new B-21, strategic bombers anchor long-range strike and deterrence.",
      },
      {
        title: "Deterrence signaling",
        description:
          "Bomber deployments are used as visible signals of resolve during crises.",
      },
    ],
    related: ["stealth", "cruise-missile", "nuclear-deterrence", "precision-guided-munition"],
    wiki: "Strategic bomber",
    imageAlt: "A long-range strategic bomber",
  },
  {
    slug: "military-transport-aircraft",
    term: "Military Transport Aircraft",
    abbreviation: "Airlift",
    category: "platforms",
    tldr: "A big cargo plane that flies troops, vehicles and supplies wherever they're needed — the moving van of an air force.",
    summary:
      "A cargo aircraft used to move troops, vehicles, equipment, and supplies — the backbone of military airlift.",
    definition: [
      "A military transport aircraft is a cargo plane built to move troops, vehicles, equipment, and supplies by air. Often called 'airlift', this capability lets a military rush forces to a crisis far faster than by sea and sustain them once there. Strategic transports fly intercontinental distances with heavy loads, while tactical transports operate into short, rough airstrips closer to the action.",
      "These aircraft feature cavernous cargo holds, rear ramps for rolling vehicles on and off, and rugged landing gear. Some also serve as aerial refueling tankers or are converted into command, surveillance, or medical-evacuation platforms. The ability to project and sustain force by air is a hallmark of a global military power, since airlift is expensive and technically demanding.",
    ],
    keyFacts: [
      { label: "Role", value: "Move troops, vehicles, supplies" },
      { label: "Types", value: "Strategic (long-range) & tactical" },
      { label: "Features", value: "Big hold, rear ramp, rugged gear" },
      { label: "Strategic value", value: "Rapid force projection" },
    ],
    examples: [
      {
        title: "C-17 & C-130",
        description:
          "The strategic C-17 and tactical C-130 are workhorses that move outsized loads and operate from short fields.",
      },
      {
        title: "Crisis airlift",
        description:
          "Transport fleets rush forces and aid worldwide, a capability few nations can match at scale.",
      },
    ],
    related: ["logistics", "aerial-refueling", "force-multiplier"],
    wiki: "Military transport aircraft",
    imageAlt: "A military cargo transport aircraft",
  },
  {
    slug: "ucav",
    term: "Unmanned Combat Aerial Vehicle",
    abbreviation: "UCAV",
    category: "platforms",
    tldr: "A combat drone built to fight like a jet — stealthier and faster than a surveillance drone, designed to strike defended targets.",
    summary:
      "A combat-oriented drone designed to carry weapons and operate in contested airspace, often stealthy and high-performance.",
    definition: [
      "An Unmanned Combat Aerial Vehicle (UCAV) is a drone designed primarily for combat in contested airspace, as opposed to slow surveillance drones that loiter over permissive skies. UCAVs emphasize performance and survivability — speed, stealth, and the ability to carry weapons internally — so they can penetrate enemy air defenses and strike, jam, or fight without risking a pilot.",
      "UCAVs are seen as a key part of the future of air power. A major concept is 'loyal wingman' drones that fly alongside crewed fighters, extending their sensors and weapons and absorbing risk. By removing the pilot, designers can build cheaper, more expendable, and more maneuverable aircraft, though challenges remain in autonomy, control links, and the rules around lethal decisions.",
    ],
    keyFacts: [
      { label: "Built for", value: "Combat in contested airspace" },
      { label: "Traits", value: "Stealth, speed, internal weapons" },
      { label: "Key concept", value: "'Loyal wingman' teaming" },
      { label: "Edge", value: "No pilot risk; cheaper, expendable" },
    ],
    examples: [
      {
        title: "Loyal wingman programs",
        description:
          "Several nations are developing drones to fly with crewed fighters as teamed, semi-autonomous wingmen.",
      },
      {
        title: "Stealthy strike drones",
        description:
          "Flying-wing UCAV demonstrators explore penetrating defended airspace without a pilot.",
      },
    ],
    related: ["male-uav", "stealth", "drone-swarm", "fifth-generation-fighter"],
    wiki: "Unmanned combat aerial vehicle",
    imageAlt: "An unmanned combat aerial vehicle",
  },

  // ── Land platforms ─────────────────────────────────────────────────────────
  {
    slug: "ifv",
    term: "Infantry Fighting Vehicle",
    abbreviation: "IFV",
    category: "platforms",
    tldr: "An armored vehicle that carries soldiers into battle AND fights alongside them with its own cannon and missiles.",
    summary:
      "An armored vehicle that transports infantry and fights alongside them with a cannon and often anti-tank missiles.",
    definition: [
      "An Infantry Fighting Vehicle (IFV) carries a squad of soldiers into battle and then fights alongside them, unlike a simple armored 'battle taxi'. It combines troop transport with real combat power: a turret with an autocannon, often anti-tank missiles, and firing ports or supporting weapons, letting the infantry stay protected while the vehicle suppresses enemies and kills light armor.",
      "The IFV emerged to keep mechanized infantry moving with tanks across a battlefield. It is a balance of compromises — more protected and lethal than an armored personnel carrier, but lighter and less survivable than a main battle tank. Modern conflicts have exposed IFVs to anti-tank missiles, mines, and drones, driving upgrades in armor, active protection, and tactics.",
    ],
    keyFacts: [
      { label: "Carries", value: "An infantry squad + fights" },
      { label: "Armament", value: "Autocannon, often ATGMs" },
      { label: "Vs. APC", value: "More firepower & combat role" },
      { label: "Threats", value: "ATGMs, mines, drones" },
    ],
    examples: [
      {
        title: "Bradley, Marder, BMP",
        description:
          "Classic IFVs designed to advance with tanks while carrying and supporting infantry.",
      },
      {
        title: "Combined-arms role",
        description:
          "IFVs let infantry keep pace with armor, a core element of mechanized combined-arms warfare.",
      },
    ],
    related: ["apc", "main-battle-tank", "combined-arms", "active-protection-system"],
    wiki: "Infantry fighting vehicle",
    imageAlt: "An infantry fighting vehicle",
  },
  {
    slug: "apc",
    term: "Armored Personnel Carrier",
    abbreviation: "APC",
    category: "platforms",
    tldr: "An armored 'battle taxi' that protects soldiers as it carries them to the fight — lighter and less armed than a fighting vehicle.",
    summary:
      "An armored vehicle that transports infantry safely to the battlefield, with light defensive armament.",
    definition: [
      "An Armored Personnel Carrier (APC) is an armored vehicle whose main job is to carry infantry safely across a battlefield — often nicknamed a 'battle taxi'. Its armor protects the troops inside from small arms, shrapnel, and mines, but unlike an Infantry Fighting Vehicle, it is meant primarily for transport and self-defense rather than serious combat, usually carrying just a machine gun.",
      "APCs are cheaper, lighter, and simpler than IFVs, making them widely used and easy to adapt into ambulances, command posts, and engineering vehicles. They come in tracked and wheeled forms, with wheeled APCs popular for their speed on roads and lower running costs, especially in peacekeeping and patrol roles.",
    ],
    keyFacts: [
      { label: "Main job", value: "Transport infantry safely" },
      { label: "Nickname", value: "Battle taxi" },
      { label: "Armament", value: "Usually a machine gun" },
      { label: "Vs. IFV", value: "Transport, not a fighting vehicle" },
    ],
    examples: [
      {
        title: "M113 & wheeled APCs",
        description:
          "Widely produced carriers that move infantry and serve as the basis for many specialized variants.",
      },
      {
        title: "Peacekeeping use",
        description:
          "Wheeled APCs are common in patrol and peacekeeping roles for their mobility and lower cost.",
      },
    ],
    related: ["ifv", "mrap", "main-battle-tank"],
    wiki: "Armoured personnel carrier",
    imageAlt: "An armored personnel carrier",
  },
  {
    slug: "mrap",
    term: "MRAP Vehicle",
    abbreviation: "MRAP",
    category: "platforms",
    tldr: "A truck with a V-shaped armored hull built to protect troops from roadside bombs and mines.",
    summary:
      "A heavily armored wheeled vehicle designed to protect occupants from mines and improvised explosive devices.",
    definition: [
      "MRAP stands for Mine-Resistant Ambush Protected vehicle — a class of heavily armored trucks designed to keep troops alive against roadside bombs (IEDs) and mines. Their signature feature is a V-shaped hull that deflects the blast of an explosion outward and upward, away from the crew compartment, dramatically improving survivability compared with flat-bottomed vehicles.",
      "MRAPs were produced in huge numbers during the Iraq and Afghanistan wars in direct response to devastating IED attacks, and they saved many lives. The trade-off is that they are heavy, tall, and less agile off-road, optimized for protection on roads rather than open-field maneuver. They illustrate how the IED threat reshaped vehicle design and procurement almost overnight.",
    ],
    keyFacts: [
      { label: "MRAP means", value: "Mine-Resistant Ambush Protected" },
      { label: "Key feature", value: "V-shaped blast-deflecting hull" },
      { label: "Protects against", value: "IEDs and mines" },
      { label: "Trade-off", value: "Heavy, tall, less agile" },
    ],
    examples: [
      {
        title: "Iraq & Afghanistan surge",
        description:
          "MRAPs were rushed into service to counter IEDs, a rapid-acquisition response that saved many lives.",
      },
      {
        title: "Blast protection",
        description:
          "The V-hull design became a standard feature influencing later armored-vehicle development.",
      },
    ],
    related: ["ied", "apc", "defense-procurement"],
    wiki: "MRAP",
    imageAlt: "An MRAP mine-resistant vehicle",
  },
  {
    slug: "self-propelled-artillery",
    term: "Self-Propelled Artillery",
    abbreviation: "SPG",
    category: "platforms",
    tldr: "A big gun mounted on a tracked or wheeled vehicle so it can shoot, then quickly drive away before the enemy hits back.",
    summary:
      "Artillery mounted on a mobile chassis so it can move, fire, and reposition quickly.",
    definition: [
      "Self-propelled artillery is a large gun or howitzer mounted on its own motorized chassis — usually tracked, sometimes wheeled — so it can move, fire, and move again under its own power. This mobility is its great advantage over towed artillery: it can keep pace with armored forces, and it can 'shoot and scoot', firing a few rounds then quickly relocating before enemy counter-battery fire can hit back.",
      "Often resembling a tank with a big gun, self-propelled guns provide the heavy, long-range indirect firepower that supports ground offensives. The growing threat of fast counter-battery radar and drones has made their mobility ever more important, as a gun that lingers in one place is increasingly likely to be found and destroyed.",
    ],
    keyFacts: [
      { label: "What it is", value: "Artillery on a mobile chassis" },
      { label: "Advantage", value: "Mobility; 'shoot and scoot'" },
      { label: "Vs. towed", value: "Faster to relocate, survivable" },
      { label: "Threat", value: "Counter-battery radar & drones" },
    ],
    examples: [
      {
        title: "Modern howitzer systems",
        description:
          "Tracked and wheeled self-propelled howitzers provide mobile fire support that keeps up with mechanized forces.",
      },
      {
        title: "Shoot and scoot",
        description:
          "Quickly relocating after firing has become essential to survive counter-battery fire and loitering munitions.",
      },
    ],
    related: ["howitzer", "mlrs", "combined-arms"],
    wiki: "Self-propelled artillery",
    imageAlt: "A self-propelled howitzer",
  },

  // ── Missiles & munitions ───────────────────────────────────────────────────
  {
    slug: "mlrs",
    term: "Multiple Launch Rocket System",
    abbreviation: "MLRS",
    category: "missiles",
    tldr: "A vehicle that fires a barrage of rockets to blanket a target area, or precision rockets to hit specific points far away.",
    summary:
      "A vehicle-mounted system that launches salvos of rockets — area saturation or precision-guided long-range strikes.",
    definition: [
      "A Multiple Launch Rocket System (MLRS) is a vehicle carrying a pack of rocket tubes that can fire a rapid salvo to saturate a target area with explosive power. Traditionally used to blanket a zone — troop concentrations, artillery positions — with overwhelming firepower in seconds, modern versions also fire precision-guided rockets and missiles that strike specific targets at long range.",
      "Systems like the wheeled HIMARS have shown how guided rockets let one launcher destroy high-value targets such as command posts and ammunition depots from dozens of kilometers away, then quickly move before being located. This blend of range, precision, and mobility has made rocket artillery a decisive capability in recent conflicts.",
    ],
    keyFacts: [
      { label: "What it does", value: "Fires salvos of rockets" },
      { label: "Modes", value: "Area saturation or precision strike" },
      { label: "Range", value: "Tens to hundreds of km (guided)" },
      { label: "Strength", value: "Range + precision + mobility" },
    ],
    examples: [
      {
        title: "HIMARS & M270",
        description:
          "Guided rocket-artillery systems used to strike command posts and depots precisely at long range, then relocate.",
      },
      {
        title: "Deep precision fires",
        description:
          "Precision rockets let rocket artillery reach far behind the front line at high-value targets.",
      },
    ],
    related: ["self-propelled-artillery", "howitzer", "precision-guided-munition"],
    wiki: "Multiple rocket launcher",
    imageAlt: "A multiple launch rocket system firing",
  },
  {
    slug: "howitzer",
    term: "Howitzer",
    abbreviation: "",
    category: "missiles",
    tldr: "A big artillery gun that lobs heavy shells over long distances in a high arc to hit targets you can't even see.",
    summary:
      "An artillery piece that fires explosive shells over long distances, typically on a high, arcing trajectory.",
    definition: [
      "A howitzer is a type of artillery gun that fires heavy explosive shells over long distances, typically lobbing them on a high, arcing trajectory so they can drop onto targets behind hills or fortifications. Artillery has long been called the 'king of battle' because of the sheer destructive firepower it delivers, and the howitzer is its workhorse, providing indirect fire — striking targets the gun crew often cannot even see.",
      "Howitzers come in towed and self-propelled forms and fire a range of shells, including precision-guided rounds that can hit within meters of a target. They depend on forward observers, drones, or radar to spot targets and adjust fire. Despite the age of the concept, artillery remains devastatingly effective, causing a large share of casualties in modern ground wars.",
    ],
    keyFacts: [
      { label: "Fires", value: "Heavy shells, high arcing trajectory" },
      { label: "Type", value: "Indirect fire (targets out of sight)" },
      { label: "Forms", value: "Towed & self-propelled" },
      { label: "Ammo", value: "Standard & precision-guided shells" },
    ],
    examples: [
      {
        title: "155mm howitzers",
        description:
          "The 155mm calibre is a NATO standard, with towed and self-propelled guns providing the bulk of Western artillery fire.",
      },
      {
        title: "Precision shells",
        description:
          "Guided artillery rounds let a howitzer hit point targets, blending mass firepower with precision.",
      },
    ],
    related: ["self-propelled-artillery", "mlrs", "precision-guided-munition"],
    wiki: "Howitzer",
    imageAlt: "An artillery howitzer",
  },
  {
    slug: "icbm",
    term: "Intercontinental Ballistic Missile",
    abbreviation: "ICBM",
    category: "missiles",
    tldr: "The longest-range missile — it flies through space to strike targets on the other side of the planet, usually carrying nuclear warheads.",
    summary:
      "A ballistic missile with intercontinental range (over 5,500 km), the long-range backbone of nuclear forces.",
    definition: [
      "An Intercontinental Ballistic Missile (ICBM) is a ballistic missile with a range greater than 5,500 km — far enough to strike targets on another continent. Boosted by powerful rockets, it arcs out of the atmosphere and through space before its warheads plunge back down at hypersonic speed. ICBMs are the longest-range missiles and the land-based backbone of nuclear deterrence.",
      "Because they can reach almost anywhere within about half an hour and are extremely hard to intercept, ICBMs are central to strategic stability. They are typically based in hardened underground silos or on road-mobile launchers for survivability, and many carry multiple independently targetable warheads (MIRVs). Their numbers and characteristics are tightly governed by arms-control treaties.",
    ],
    keyFacts: [
      { label: "Range", value: "Over 5,500 km (intercontinental)" },
      { label: "Flight", value: "Through space, hypersonic re-entry" },
      { label: "Basing", value: "Silos or road-mobile launchers" },
      { label: "Payload", value: "Often MIRVed nuclear warheads" },
    ],
    examples: [
      {
        title: "Minuteman III (USA)",
        description:
          "The silo-based ICBM forming the land leg of the U.S. nuclear triad.",
      },
      {
        title: "Arms-control limits",
        description:
          "Treaties cap deployed ICBM warheads and launchers to maintain strategic stability.",
      },
    ],
    related: ["ballistic-missile", "slbm", "mirv", "nuclear-deterrence"],
    wiki: "Intercontinental ballistic missile",
    imageAlt: "An intercontinental ballistic missile",
  },
  {
    slug: "slbm",
    term: "Submarine-Launched Ballistic Missile",
    abbreviation: "SLBM",
    category: "missiles",
    tldr: "A long-range nuclear missile fired from a hidden submarine, making it almost impossible for an enemy to destroy first.",
    summary:
      "A ballistic missile launched from a submarine, prized for its survivability as a second-strike weapon.",
    definition: [
      "A Submarine-Launched Ballistic Missile (SLBM) is a long-range ballistic missile fired from beneath the sea by a ballistic-missile submarine. Its great strategic value is survivability: because a submarine hiding in the ocean is extremely hard to find and destroy, an enemy cannot be confident of wiping out these missiles in a surprise attack. This guarantees a country can strike back — the 'second strike' at the heart of deterrence.",
      "SLBMs are launched from underwater, breaking the surface before their rocket motors ignite, then follow the same space-spanning trajectory as land-based ICBMs and often carry multiple warheads. The combination of long range and a near-invulnerable launch platform makes the submarine leg the most secure part of the nuclear triad.",
    ],
    keyFacts: [
      { label: "Launched from", value: "Ballistic-missile submarines" },
      { label: "Key virtue", value: "Survivability / second strike" },
      { label: "Payload", value: "Often MIRVed nuclear warheads" },
      { label: "Triad leg", value: "Most survivable leg" },
    ],
    examples: [
      {
        title: "Trident (USA/UK)",
        description:
          "A long-range SLBM carried by ballistic-missile submarines, central to U.S. and British deterrence.",
      },
      {
        title: "Second-strike guarantee",
        description:
          "Hidden submarines ensure retaliation survives any first strike, stabilizing deterrence.",
      },
    ],
    related: ["icbm", "submarine", "nuclear-deterrence", "mirv"],
    wiki: "Submarine-launched ballistic missile",
    imageAlt: "A submarine-launched ballistic missile",
  },
  {
    slug: "mirv",
    term: "MIRV",
    abbreviation: "MIRV",
    category: "missiles",
    tldr: "One missile carrying several nuclear warheads, each able to hit a different target — like a shotgun blast across a map.",
    summary:
      "Multiple Independently targetable Re-entry Vehicles — several warheads on one missile, each aimed at a separate target.",
    definition: [
      "MIRV stands for Multiple Independently targetable Re-entry Vehicle. It means a single ballistic missile carries several nuclear warheads, each of which can be released to strike a different target. After the missile's boost phase, a 'bus' maneuvers and dispenses the warheads one by one onto separate trajectories, so one launch can hit many widely spaced targets at once.",
      "MIRVs transformed the nuclear balance. They multiply the number of targets each missile threatens and complicate missile defense, since interceptors must deal with many warheads (and possible decoys) from one launch. This made them a major focus of arms-control treaties, which have at times limited or banned MIRVs on certain missiles to reduce first-strike incentives and the overall warhead count.",
    ],
    keyFacts: [
      { label: "Stands for", value: "Multiple Independently targetable RVs" },
      { label: "Meaning", value: "Many warheads, one missile" },
      { label: "Effect", value: "More targets, harder to defend" },
      { label: "Arms control", value: "A key treaty concern" },
    ],
    examples: [
      {
        title: "MIRVed ICBMs & SLBMs",
        description:
          "Major strategic missiles carry several independently targeted warheads, multiplying their reach.",
      },
      {
        title: "Defense challenge",
        description:
          "MIRVs and decoys overwhelm missile defenses designed around single warheads.",
      },
    ],
    related: ["ballistic-missile", "icbm", "slbm", "nuclear-deterrence"],
    wiki: "Multiple independently targetable reentry vehicle",
    imageAlt: "Diagram of MIRV warhead deployment",
  },
  {
    slug: "anti-radiation-missile",
    term: "Anti-Radiation Missile",
    abbreviation: "ARM",
    category: "missiles",
    tldr: "A missile that homes in on the radio waves from an enemy radar — so switching on the radar invites a missile in return.",
    summary:
      "A missile that homes on the emissions of enemy radars to destroy them, central to suppressing air defenses.",
    definition: [
      "An anti-radiation missile (ARM) is a weapon that homes in on the radio-frequency energy emitted by an enemy radar. Rather than needing its own picture of the target, it simply follows the radar's own signal back to its source and destroys it. This makes ARMs the key weapon for suppressing enemy air defenses: it forces a hard choice on the defender — keep the radar on and risk a missile, or switch it off and go blind.",
      "ARMs are central to SEAD/DEAD missions that clear the way for other aircraft. Defenders counter them by switching radars on and off, using decoy emitters, and networking sensors so the loss of one radar doesn't blind the system. The cat-and-mouse between radars and anti-radiation missiles is a core part of the battle for control of the air.",
    ],
    keyFacts: [
      { label: "Homes on", value: "Enemy radar emissions" },
      { label: "Main use", value: "Suppressing air defenses (SEAD)" },
      { label: "Forces choice", value: "Radiate and die, or go blind" },
      { label: "Countered by", value: "Switching off, decoys, networking" },
    ],
    examples: [
      {
        title: "AGM-88 HARM (USA)",
        description:
          "A widely used high-speed anti-radiation missile that punishes air-defense radars for switching on.",
      },
      {
        title: "Opening-night SEAD",
        description:
          "ARMs are fired early in air campaigns to tear apart the enemy's radar-guided defenses.",
      },
    ],
    related: ["sead", "electronic-warfare", "integrated-air-defense-system", "radar"],
    wiki: "Anti-radiation missile",
    imageAlt: "An anti-radiation missile",
  },
  {
    slug: "torpedo",
    term: "Torpedo",
    abbreviation: "",
    category: "missiles",
    tldr: "An underwater missile that swims to a ship or submarine and explodes — often beneath the hull to break its back.",
    summary:
      "A self-propelled underwater weapon that travels to and detonates against ships or submarines.",
    definition: [
      "A torpedo is a self-propelled weapon that travels underwater to strike ships and submarines. Launched from submarines, surface ships, aircraft, or helicopters, it swims to its target and detonates — modern types often exploding beneath a ship's hull, where the shock and gas bubble can break the vessel's back, doing far more damage than a hit on the side.",
      "Guidance has advanced from simple straight-running designs to homing torpedoes that use their own sonar to track targets, and wire-guided types steered from the launching submarine. Fast, hard to detect, and devastating, torpedoes remain a primary weapon of submarine and anti-submarine warfare, countered by decoys, evasive maneuvering, and anti-torpedo systems.",
    ],
    keyFacts: [
      { label: "What it is", value: "Self-propelled underwater weapon" },
      { label: "Targets", value: "Ships and submarines" },
      { label: "Lethal trick", value: "Detonate under the hull" },
      { label: "Guidance", value: "Sonar homing, wire-guided" },
    ],
    examples: [
      {
        title: "Heavyweight submarine torpedoes",
        description:
          "Wire-guided homing torpedoes are a submarine's primary weapon against ships and other subs.",
      },
      {
        title: "Air-dropped lightweight torpedoes",
        description:
          "Helicopters and aircraft drop homing torpedoes to attack submarines in anti-submarine warfare.",
      },
    ],
    related: ["submarine", "anti-submarine-warfare", "naval-mine", "sonar"],
    wiki: "Torpedo",
    imageAlt: "A naval torpedo",
  },
  {
    slug: "naval-mine",
    term: "Naval Mine",
    abbreviation: "",
    category: "missiles",
    tldr: "An explosive trap left in the water that detonates when a ship comes near — cheap to lay, expensive and slow to clear.",
    summary:
      "An explosive device placed in the water to damage or sink ships that come near it.",
    definition: [
      "A naval mine is an explosive device placed in the water and left to wait for a passing ship or submarine. Mines can float near the surface, sit anchored at depth, or rest on the seabed, and they detonate when a vessel touches them or when sensors detect its magnetic field, noise, or pressure wave. Cheap to produce and lay, they are a classic weapon of the weaker naval power.",
      "Their real power is psychological and economic: a small number of mines, or even the mere suspicion of them, can close a strait or harbor and force the enemy into slow, dangerous, expensive mine-clearing operations. This asymmetry — easy to lay, hard to sweep — makes mines a persistent tool of sea denial and a constant concern for navies and merchant shipping alike.",
    ],
    keyFacts: [
      { label: "What it is", value: "Explosive trap in the water" },
      { label: "Triggers", value: "Contact, magnetic, acoustic, pressure" },
      { label: "Strength", value: "Cheap to lay, hard to clear" },
      { label: "Effect", value: "Sea denial; closes straits/ports" },
    ],
    examples: [
      {
        title: "Mining of straits",
        description:
          "Even a few mines can shut a vital waterway, forcing costly mine-clearing before traffic resumes.",
      },
      {
        title: "Mine countermeasures",
        description:
          "Navies field specialized minehunters and unmanned systems to find and neutralize mines.",
      },
    ],
    related: ["torpedo", "anti-submarine-warfare", "a2ad"],
    wiki: "Naval mine",
    imageAlt: "A naval mine",
  },
  {
    slug: "glide-bomb",
    term: "Glide Bomb",
    abbreviation: "",
    category: "missiles",
    tldr: "A bomb with pop-out wings and guidance, so an aircraft can drop it from far away and let it glide precisely to the target.",
    summary:
      "A bomb fitted with wings and guidance that lets it glide a long distance to strike a target precisely.",
    definition: [
      "A glide bomb is an ordinary bomb fitted with pop-out wings and a guidance kit, turning it into a stand-off weapon. Released from an aircraft, it doesn't just fall — it glides for tens of kilometers toward its target, steering itself with GPS or other guidance. This lets the launching aircraft stay well back, outside the range of many short-range air defenses, while still hitting precisely.",
      "Glide bombs are attractive because they are far cheaper than powered cruise missiles yet provide useful range and precision, often by bolting kits onto existing bomb stockpiles. They have featured heavily in recent conflicts, where mass use of long-range glide bombs has let aircraft strike from relative safety, reshaping how air forces attack defended areas.",
    ],
    keyFacts: [
      { label: "What it is", value: "Bomb + wings + guidance" },
      { label: "Benefit", value: "Stand-off range, low cost" },
      { label: "Guidance", value: "Usually GPS/INS" },
      { label: "Vs. cruise missile", value: "Cheaper, unpowered, shorter range" },
    ],
    examples: [
      {
        title: "Winged guidance kits",
        description:
          "Add-on kits give conventional bombs wings and guidance for long-range precision at low cost.",
      },
      {
        title: "Mass stand-off strikes",
        description:
          "Large numbers of glide bombs let aircraft hit targets from beyond many air defenses.",
      },
    ],
    related: ["precision-guided-munition", "cruise-missile", "air-superiority"],
    wiki: "Glide bomb",
    imageAlt: "A winged glide bomb",
  },
  {
    slug: "cluster-munition",
    term: "Cluster Munition",
    abbreviation: "",
    category: "missiles",
    tldr: "A bomb or shell that bursts open in the air and scatters many small bomblets over a wide area — controversial because duds linger.",
    summary:
      "A weapon that disperses many small submunitions over an area; controversial due to unexploded remnants.",
    definition: [
      "A cluster munition is a bomb, shell, or rocket warhead that opens in the air and scatters dozens or hundreds of small 'submunitions' or bomblets over a wide area. The aim is to blanket a target zone — troops in the open, vehicles, runways — with many small explosions at once, covering far more ground than a single large warhead.",
      "Cluster munitions are highly controversial because some bomblets fail to explode on impact and remain on the ground as de facto landmines, killing and maiming civilians long after a conflict ends. This humanitarian harm led many countries to ban them under the Convention on Cluster Munitions, though several major military powers have not signed and continue to use or stockpile them.",
    ],
    keyFacts: [
      { label: "What it does", value: "Scatters many bomblets over an area" },
      { label: "Purpose", value: "Saturate area targets" },
      { label: "Problem", value: "Unexploded duds harm civilians" },
      { label: "Treaty", value: "Convention on Cluster Munitions" },
    ],
    examples: [
      {
        title: "Area-saturation strikes",
        description:
          "Cluster warheads can blanket troop or vehicle concentrations across a wide footprint.",
      },
      {
        title: "Post-conflict hazard",
        description:
          "Unexploded bomblets contaminate land for years, the core reason for the international ban.",
      },
    ],
    related: ["howitzer", "mlrs", "precision-guided-munition", "end-user-certificate"],
    wiki: "Cluster munition",
    imageAlt: "A cluster munition and its submunitions",
  },
  {
    slug: "shaped-charge",
    term: "Shaped Charge",
    abbreviation: "HEAT",
    category: "missiles",
    tldr: "A clever explosive shaped to focus its blast into a thin jet that punches through thick armor — the trick behind most anti-tank weapons.",
    summary:
      "An explosive shaped to focus its energy into a narrow, armor-piercing jet — the basis of most anti-tank warheads.",
    definition: [
      "A shaped charge is an explosive designed with a hollow, cone-shaped cavity lined with metal, so that when it detonates, its energy is focused into an intensely fast, narrow jet of metal. This jet concentrates enormous force on a tiny spot, letting a relatively small warhead punch through armor far thicker than a simple blast could defeat. It is the principle behind most anti-tank weapons, known as HEAT (High-Explosive Anti-Tank) rounds.",
      "Because shaped charges defeat armor by focused penetration rather than sheer mass, they let infantry and light vehicles threaten heavy tanks. This drove an arms race in protection: reactive armor that disrupts the jet, spaced and composite armor, and 'tandem' warheads with two charges to defeat reactive armor. Understanding the shaped charge is key to understanding the long contest between anti-tank weapons and armor.",
    ],
    keyFacts: [
      { label: "How it works", value: "Focuses blast into a metal jet" },
      { label: "Used in", value: "HEAT anti-tank warheads" },
      { label: "Why it matters", value: "Small warhead beats thick armor" },
      { label: "Countered by", value: "Reactive & spaced armor" },
    ],
    examples: [
      {
        title: "RPGs & ATGMs",
        description:
          "Most rocket-propelled grenades and anti-tank guided missiles use shaped-charge warheads.",
      },
      {
        title: "Tandem warheads",
        description:
          "Two stacked shaped charges defeat reactive armor — the first triggers it, the second penetrates.",
      },
    ],
    related: ["atgm", "reactive-armor", "main-battle-tank"],
    wiki: "Shaped charge",
    imageAlt: "Diagram of a shaped-charge warhead",
  },
  {
    slug: "ied",
    term: "Improvised Explosive Device",
    abbreviation: "IED",
    category: "missiles",
    tldr: "A homemade bomb, often hidden by a road, used by insurgents — cheap to make but deadly and hard to defend against.",
    summary:
      "A homemade bomb built from improvised components, widely used in insurgencies and asymmetric warfare.",
    definition: [
      "An Improvised Explosive Device (IED) is a homemade bomb assembled from whatever explosives and components are available, rather than a manufactured military munition. Often hidden along roads, in vehicles, or carried by a person, IEDs became the signature weapon of insurgents in conflicts like Iraq and Afghanistan, where they inflicted a large share of casualties on far better-equipped forces.",
      "IEDs are devastating in asymmetric warfare precisely because they are cheap, easy to make, and hard to detect, yet can destroy armored vehicles and kill troops. Countering them spawned a whole field — better-armored vehicles like MRAPs, electronic jammers to block radio detonation, route-clearance teams, and intelligence efforts to find the networks that build and plant them.",
    ],
    keyFacts: [
      { label: "What it is", value: "Homemade / improvised bomb" },
      { label: "Used in", value: "Insurgency, asymmetric warfare" },
      { label: "Why effective", value: "Cheap, hidden, deadly" },
      { label: "Countered by", value: "MRAPs, jammers, route clearance" },
    ],
    examples: [
      {
        title: "Roadside bombs",
        description:
          "Hidden IEDs targeting convoys caused heavy casualties and drove the rapid fielding of MRAP vehicles.",
      },
      {
        title: "Counter-IED jamming",
        description:
          "Electronic jammers block the radio signals used to detonate some IEDs remotely.",
      },
    ],
    related: ["mrap", "asymmetric-warfare", "electronic-warfare", "shaped-charge"],
    wiki: "Improvised explosive device",
    imageAlt: "Aftermath of an improvised explosive device",
  },

  // ── Systems & sensors ──────────────────────────────────────────────────────
  {
    slug: "vls",
    term: "Vertical Launching System",
    abbreviation: "VLS",
    category: "systems",
    tldr: "A grid of missile tubes built into a warship's deck that can fire many different missiles straight up, fast.",
    summary:
      "A shipboard array of vertical cells that store and launch missiles, allowing rapid fire of mixed missile types.",
    definition: [
      "A Vertical Launching System (VLS) is a grid of missile tubes, or 'cells', built flush into a warship's deck. Each cell holds a missile ready to fire straight upward, after which the missile tips over toward its target. Replacing older trainable launchers that loaded one or two missiles at a time, the VLS lets a ship store dozens of missiles and fire them in rapid succession in any direction.",
      "Its great strength is flexibility: the same cells can hold a mix of weapons — surface-to-air missiles for defense, anti-ship missiles, cruise missiles for land attack, and anti-submarine weapons — so a captain can tailor the loadout to the mission. The number of VLS cells is a key measure of a modern warship's firepower, and reloading them typically requires returning to port.",
    ],
    keyFacts: [
      { label: "What it is", value: "Deck grid of missile cells" },
      { label: "Strength", value: "Many missiles, mixed types, fast fire" },
      { label: "Holds", value: "SAMs, anti-ship, cruise, ASW missiles" },
      { label: "Measure of", value: "A warship's firepower" },
    ],
    examples: [
      {
        title: "Mk 41 VLS",
        description:
          "A widely used vertical launch system on Western warships, able to fire a broad mix of missiles.",
      },
      {
        title: "Cell count as firepower",
        description:
          "Destroyers and frigates are often compared by their number of VLS cells.",
      },
    ],
    related: ["destroyer", "frigate", "aegis", "surface-to-air-missile"],
    wiki: "Vertical launching system",
    imageAlt: "A warship vertical launching system firing",
  },
  {
    slug: "aegis",
    term: "Aegis Combat System",
    abbreviation: "",
    category: "systems",
    tldr: "A warship's 'brain' — a powerful radar and computer system that tracks hundreds of threats and controls the ship's missiles automatically.",
    summary:
      "An integrated naval combat system combining a powerful radar and computers to detect, track, and engage many threats at once.",
    definition: [
      "The Aegis Combat System is an advanced naval combat system that ties together a ship's powerful radar, computers, and missile launchers into one automated whole. Named after the mythological shield, it was created to defend ships against saturation missile attacks by detecting, tracking, and prioritizing hundreds of targets simultaneously and guiding interceptor missiles to the most dangerous ones — faster than human operators could manage alone.",
      "Aegis is the heart of many of the world's most capable destroyers and cruisers and has been extended to ballistic-missile defense, intercepting missiles in space, and even ashore in fixed installations. It is a prime example of how a combat 'system of systems' — sensors, software, and weapons integrated together — can be more decisive than any single piece of hardware.",
    ],
    keyFacts: [
      { label: "What it is", value: "Integrated naval combat system" },
      { label: "Core", value: "Powerful radar + computers + missiles" },
      { label: "Built for", value: "Defeating saturation attacks" },
      { label: "Extended to", value: "Ballistic-missile defense, ashore" },
    ],
    examples: [
      {
        title: "Aegis destroyers & cruisers",
        description:
          "Aegis equips the most capable air-defense warships of the U.S. and several allied navies.",
      },
      {
        title: "Aegis Ashore",
        description:
          "Land-based Aegis installations extend the system to defend territory against ballistic missiles.",
      },
    ],
    related: ["destroyer", "vls", "radar", "ballistic-missile"],
    wiki: "Aegis Combat System",
    imageAlt: "An Aegis-equipped warship",
  },
  {
    slug: "sonar",
    term: "Sonar",
    abbreviation: "",
    category: "systems",
    tldr: "Underwater 'radar' that uses sound to find submarines, ships, mines and torpedoes — since radio waves don't travel underwater.",
    summary:
      "A system that uses sound waves to detect and locate objects underwater, the primary undersea sensor.",
    definition: [
      "Sonar (SOund Navigation And Ranging) is the underwater equivalent of radar: because radio and light barely travel through water, sonar uses sound instead to detect and locate submarines, ships, mines, and torpedoes. 'Active' sonar sends out a sound pulse — the classic 'ping' — and listens for the echo, revealing a target's range and bearing, but also announcing the sonar's own presence. 'Passive' sonar simply listens for the noise a target makes, staying silent and hidden.",
      "Sonar is the central sensor of undersea warfare. Submarines rely on quiet passive listening to hunt while staying undetected, and surface ships, helicopters, and seabed arrays use sonar to find them. The physics of sound in water — bending around temperature layers, carrying for huge distances or being trapped — makes sonar a subtle art and undersea detection one of the hardest problems in warfare.",
    ],
    keyFacts: [
      { label: "Uses", value: "Sound waves underwater" },
      { label: "Active", value: "'Ping' and listen for echo" },
      { label: "Passive", value: "Silently listen for target noise" },
      { label: "Central to", value: "Submarine & anti-submarine warfare" },
    ],
    examples: [
      {
        title: "Submarine passive sonar",
        description:
          "Submarines hunt by quietly listening, avoiding the giveaway of active pinging.",
      },
      {
        title: "Dipping & towed sonar",
        description:
          "Helicopters lower sonar into the sea and ships tow sonar arrays to detect submarines.",
      },
    ],
    related: ["submarine", "anti-submarine-warfare", "torpedo", "radar"],
    wiki: "Sonar",
    imageAlt: "A sonar display or dome",
  },
  {
    slug: "ciws",
    term: "Close-In Weapon System",
    abbreviation: "CIWS",
    category: "systems",
    tldr: "A ship's last-ditch defense — a radar-guided rapid-fire gun that automatically shreds incoming missiles at very close range.",
    summary:
      "A ship's last-line defense: a radar-guided, rapid-firing gun (or short-range missiles) that destroys incoming threats.",
    definition: [
      "A Close-In Weapon System (CIWS) is a warship's last line of defense against missiles and aircraft that have slipped past its longer-range defenses. The classic CIWS is a radar-guided, rapid-firing rotary cannon that automatically detects an incoming threat, tracks it, and fires a stream of shells to shred it just seconds before impact. Some systems use short-range missiles instead of, or alongside, guns.",
      "Because the threat is so close and fast, a CIWS is highly automated, reacting faster than a human could. It is the innermost layer of a ship's 'layered defense', behind long-range and medium-range surface-to-air missiles. As anti-ship missiles, drones, and saturation attacks grow more dangerous, close-in defenses — including new lasers and microwave weapons — are an active area of development.",
    ],
    keyFacts: [
      { label: "Role", value: "Last-ditch ship self-defense" },
      { label: "Weapon", value: "Rapid-fire gun and/or missiles" },
      { label: "Trait", value: "Radar-guided, highly automated" },
      { label: "Layer", value: "Innermost of layered defense" },
    ],
    examples: [
      {
        title: "Phalanx CIWS",
        description:
          "A self-contained radar-guided rotary cannon widely fitted as a ship's final defense against missiles.",
      },
      {
        title: "Against drones",
        description:
          "Close-in systems increasingly engage cheap drones, spurring interest in laser and microwave options.",
      },
    ],
    related: ["surface-to-air-missile", "anti-ship-missile", "directed-energy-weapon", "counter-uas"],
    wiki: "Close-in weapon system",
    imageAlt: "A close-in weapon system gun mount",
  },
  {
    slug: "irst",
    term: "Infrared Search & Track",
    abbreviation: "IRST",
    category: "systems",
    tldr: "A sensor that spots aircraft by their heat instead of radar — so it can find even stealthy jets without giving itself away.",
    summary:
      "A passive sensor that detects and tracks aircraft by their infrared (heat) emissions rather than radar.",
    definition: [
      "Infrared Search and Track (IRST) is a sensor that finds and follows aircraft by detecting the heat they emit — from their engines, exhaust, and friction with the air — rather than by bouncing radar waves off them. Because it is 'passive', listening for heat instead of transmitting, an IRST gives away nothing about its own position, unlike a radar that can be detected and jammed.",
      "IRST has become especially important against stealth aircraft, which are shaped to defeat radar but still radiate heat. It lets a fighter or ship detect and track targets silently, complementing radar and providing a backup when radar is jammed. Its limits are range, which can be reduced by weather, and that infrared alone gives less precise distance information than radar, so the two sensors are often fused together.",
    ],
    keyFacts: [
      { label: "Detects", value: "Aircraft heat (infrared)" },
      { label: "Type", value: "Passive — emits nothing" },
      { label: "Advantage", value: "Stealthy; can spot stealth jets" },
      { label: "Limit", value: "Range cut by weather; weak on range" },
    ],
    examples: [
      {
        title: "Fighter IRST pods",
        description:
          "Modern fighters carry IRST to detect targets silently and to help counter stealthy threats.",
      },
      {
        title: "Sensor fusion",
        description:
          "IRST data is fused with radar to combine silent detection with precise ranging.",
      },
    ],
    related: ["stealth", "radar", "aesa-radar", "situational-awareness"],
    wiki: "Infrared search and track",
    imageAlt: "An infrared search and track sensor",
  },
  {
    slug: "radar",
    term: "Radar",
    abbreviation: "",
    category: "systems",
    tldr: "A system that sends out radio waves and listens for the echoes to find and track objects far away — the eyes of modern militaries.",
    summary:
      "A sensor that detects objects by transmitting radio waves and measuring the reflections that bounce back.",
    definition: [
      "Radar (RAdio Detection And Ranging) detects objects by sending out radio waves and listening for the echoes that bounce back off them. From the time delay and direction of the echo, it works out an object's distance, bearing, and speed. Invented before World War II, radar became the eyes of modern militaries, able to see aircraft, ships, missiles, and vehicles at great range, in darkness, and through cloud.",
      "Radar underpins almost everything in modern warfare: air-defense early warning, fighter fire-control, missile guidance, naval search, and ground surveillance. Its central weakness is that, by transmitting, it can be detected, jammed, deceived, or attacked by anti-radiation missiles — which is why stealth (reducing the echo), electronic warfare, and passive sensors all revolve around defeating or avoiding radar.",
    ],
    keyFacts: [
      { label: "How it works", value: "Transmit radio waves, read echoes" },
      { label: "Measures", value: "Range, bearing, speed" },
      { label: "Used for", value: "Warning, fire-control, guidance, search" },
      { label: "Weakness", value: "Detectable, jammable, attackable" },
    ],
    examples: [
      {
        title: "Air-defense early warning",
        description:
          "Long-range radars detect incoming aircraft and missiles, the foundation of air defense.",
      },
      {
        title: "Stealth vs. radar",
        description:
          "Stealth design and electronic warfare exist largely to defeat or evade radar detection.",
      },
    ],
    related: ["aesa-radar", "stealth", "electronic-warfare", "anti-radiation-missile"],
    wiki: "Radar",
    imageAlt: "A military radar antenna",
  },
  {
    slug: "gps",
    term: "GPS / Satellite Navigation",
    abbreviation: "GNSS / PNT",
    category: "systems",
    tldr: "Satellites that tell receivers exactly where and when they are — guiding weapons, troops and aircraft. Jam it and a lot stops working.",
    summary:
      "A satellite system providing precise position, navigation, and timing — essential to guided weapons and coordination.",
    definition: [
      "GPS (the Global Positioning System) is a constellation of satellites that lets a receiver anywhere on Earth work out its exact position and time by measuring signals from several satellites at once. Originally built by the U.S. military, it and similar systems (collectively called GNSS, providing 'PNT' — position, navigation, and timing) have become indispensable to modern forces and to civilian life alike.",
      "In the military, satellite navigation guides precision weapons to their targets, lets troops and vehicles know exactly where they are, and provides the precise timing that synchronizes communications and networks. This dependence is also a vulnerability: GPS signals are weak and can be jammed (drowned out) or spoofed (faked), which has become a major feature of recent conflicts. Forces therefore add anti-jam antennas, backups, and inertial systems to keep working when satellite navigation is denied.",
    ],
    keyFacts: [
      { label: "Provides", value: "Position, navigation, timing (PNT)" },
      { label: "Origin", value: "U.S. military system (now global use)" },
      { label: "Enables", value: "Guided weapons, coordination, timing" },
      { label: "Vulnerable to", value: "Jamming and spoofing" },
    ],
    examples: [
      {
        title: "GPS-guided weapons",
        description:
          "Weapons like JDAM use GPS to strike coordinates precisely in any weather.",
      },
      {
        title: "Jamming and spoofing",
        description:
          "Recent conflicts feature heavy interference with satellite navigation, degrading guided weapons and drones.",
      },
    ],
    related: ["precision-guided-munition", "electronic-warfare", "military-satellite", "c4isr"],
    wiki: "Global Positioning System",
    imageAlt: "A GPS navigation satellite",
  },
  {
    slug: "aerial-refueling",
    term: "Aerial Refueling",
    abbreviation: "AAR",
    category: "systems",
    tldr: "Refueling aircraft in mid-air from a flying tanker, so they can fly much farther and stay airborne for many more hours.",
    summary:
      "Transferring fuel from a tanker aircraft to another aircraft in flight, extending range and endurance.",
    definition: [
      "Aerial refueling is the transfer of fuel from a tanker aircraft to another aircraft while both are flying. By topping up in mid-air, combat and transport aircraft can fly intercontinental distances, carry heavier loads, and loiter over an area for many hours instead of being limited by their own fuel tanks. It quietly underpins almost all long-range air operations.",
      "Two main methods exist: a rigid 'boom' that an operator flies into the receiving aircraft, and a flexible 'probe-and-drogue' hose that the receiver plugs into. Tanker aircraft are a scarce, high-value enabler — a force multiplier that turns short-legged fighters into global-reach assets — which is why tanker fleets are a strategic capability that only a few nations possess in quantity.",
    ],
    keyFacts: [
      { label: "What it does", value: "Refuels aircraft in flight" },
      { label: "Benefit", value: "Extends range & endurance" },
      { label: "Methods", value: "Boom; probe-and-drogue" },
      { label: "Value", value: "Scarce, high-value force multiplier" },
    ],
    examples: [
      {
        title: "Tanker aircraft",
        description:
          "Dedicated tankers extend the reach of fighters and bombers across oceans and long campaigns.",
      },
      {
        title: "Global power projection",
        description:
          "Air-refueling capacity is a key marker of a military able to operate worldwide.",
      },
    ],
    related: ["military-transport-aircraft", "logistics", "force-multiplier", "strategic-bomber"],
    wiki: "Aerial refueling",
    imageAlt: "Aircraft refueling in mid-air",
  },
  {
    slug: "ejection-seat",
    term: "Ejection Seat",
    abbreviation: "",
    category: "systems",
    tldr: "A rocket-powered seat that blasts a pilot out of a doomed aircraft and parachutes them to safety in seconds.",
    summary:
      "A system that propels a pilot clear of a stricken aircraft and deploys a parachute to save their life.",
    definition: [
      "An ejection seat is a life-saving system that rapidly propels a pilot or crew member out of a stricken aircraft and lowers them safely to the ground by parachute. When the crew pulls the handle, the canopy is jettisoned, a rocket motor blasts the seat clear of the aircraft, and an automatic sequence stabilizes the seat, separates the occupant, and deploys their parachute — all within a few seconds.",
      "Modern 'zero-zero' seats can save a crew member even at zero altitude and zero speed, such as a failed takeoff. Ejection is violent and not without risk of injury, but it has saved thousands of aircrew. It is a specialized, safety-critical product of the defense industry and a vivid example of the engineering that goes into protecting expensive, hard-to-train aircrew.",
    ],
    keyFacts: [
      { label: "Purpose", value: "Save aircrew from a doomed aircraft" },
      { label: "Sequence", value: "Canopy off, rocket out, parachute" },
      { label: "'Zero-zero'", value: "Works at zero speed & altitude" },
      { label: "Trade-off", value: "Violent; some injury risk" },
    ],
    examples: [
      {
        title: "Zero-zero ejection seats",
        description:
          "Modern seats can save a crew member even during a failed takeoff at ground level.",
      },
      {
        title: "Specialized suppliers",
        description:
          "A few specialist firms dominate the design of ejection seats fitted across many fighter types.",
      },
    ],
    related: ["multirole-fighter", "fifth-generation-fighter"],
    wiki: "Ejection seat",
    imageAlt: "An aircraft ejection seat",
  },
  {
    slug: "thrust-vectoring",
    term: "Thrust Vectoring",
    abbreviation: "TVC",
    category: "systems",
    tldr: "Steering a jet by tilting where its engine exhaust points, giving incredible agility beyond what wings alone allow.",
    summary:
      "Directing an engine's exhaust to steer an aircraft or missile, improving maneuverability and control.",
    definition: [
      "Thrust vectoring is the ability to change the direction of the exhaust coming out of an engine, using it to help steer the aircraft or missile rather than relying only on wings and control surfaces. By tilting the nozzle, a jet can point its thrust up, down, or sideways, generating turning force directly. This gives dramatic agility, especially at low speeds and high angles where normal controls lose effectiveness.",
      "On fighters, thrust vectoring enables spectacular maneuvers and tighter turns that can be an advantage in close combat, and it can also reduce reliance on large tail surfaces, helping stealth. It is also widely used on missiles and rockets for sharp, fast course changes. The trade-off is added weight, complexity, and cost, so designers weigh its benefits against simpler solutions.",
    ],
    keyFacts: [
      { label: "What it is", value: "Steering by aiming engine exhaust" },
      { label: "Benefit", value: "Extreme agility, low-speed control" },
      { label: "Used on", value: "Fighters, missiles, rockets" },
      { label: "Trade-off", value: "Weight, complexity, cost" },
    ],
    examples: [
      {
        title: "Super-maneuverable fighters",
        description:
          "Some fighters use thrust vectoring for extreme agility and post-stall maneuvers.",
      },
      {
        title: "Missile agility",
        description:
          "Thrust vectoring gives missiles the sharp turns needed to hit maneuvering targets.",
      },
    ],
    related: ["supercruise", "fifth-generation-fighter", "air-to-air-missile"],
    wiki: "Thrust vectoring",
    imageAlt: "A jet engine nozzle vectoring thrust",
  },
  {
    slug: "supercruise",
    term: "Supercruise",
    abbreviation: "",
    category: "systems",
    tldr: "Flying faster than sound without using fuel-guzzling afterburners — letting a jet stay supersonic for much longer.",
    summary:
      "The ability of an aircraft to fly at supersonic speed without using fuel-hungry afterburners.",
    definition: [
      "Supercruise is the ability of an aircraft to cruise at supersonic speed — faster than the speed of sound — without using its afterburners. Afterburners produce extra thrust by dumping raw fuel into the exhaust, which lets most fighters briefly go supersonic but burns fuel at an enormous rate, so it can only be used for short bursts. An aircraft that can sustain supersonic flight on dry thrust alone enjoys a major advantage.",
      "Supercruise lets a fighter reach a fight faster, launch missiles with more energy (extending their range), and cover more sky, all while keeping better fuel endurance and a lower heat signature than one straining on afterburner. It is a hallmark capability of some advanced fighters, made possible by powerful, efficient engines and clean aerodynamic design.",
    ],
    keyFacts: [
      { label: "Definition", value: "Supersonic without afterburner" },
      { label: "Why afterburner is bad", value: "Huge fuel burn, short bursts" },
      { label: "Benefits", value: "Speed, range, endurance, lower heat" },
      { label: "Found on", value: "Some advanced fighters" },
    ],
    examples: [
      {
        title: "F-22 Raptor",
        description:
          "An air-superiority fighter able to supercruise, reaching and dominating fights with energy to spare.",
      },
      {
        title: "Missile energy boost",
        description:
          "Launching from supersonic cruise adds range and energy to air-to-air missiles.",
      },
    ],
    related: ["fifth-generation-fighter", "thrust-vectoring", "air-to-air-missile"],
    wiki: "Supercruise",
    imageAlt: "A supersonic fighter in flight",
  },
  {
    slug: "reactive-armor",
    term: "Reactive Armor",
    abbreviation: "ERA",
    category: "systems",
    tldr: "Bricks of armor that explode outward when hit, disrupting an incoming warhead before it can punch through the tank.",
    summary:
      "Add-on armor that detonates outward when struck, defeating shaped-charge and other anti-tank warheads.",
    definition: [
      "Reactive armor is a protective add-on, usually a layer of explosive sandwiched between metal plates and fitted as 'bricks' over a vehicle. When an anti-tank warhead strikes, the reactive element detonates outward, disrupting the incoming jet or projectile before it can penetrate the main armor. The most common form, Explosive Reactive Armor (ERA), is especially effective against the focused jet of a shaped-charge warhead.",
      "Reactive armor lets existing tanks survive threats that would defeat their base armor, and it can be added relatively cheaply. But it has limits: each brick works essentially once, the detonation can endanger nearby infantry, and attackers respond with 'tandem' warheads — two charges, the first to trigger the reactive armor and the second to penetrate. It is one move in the endless contest between armor and anti-armor weapons.",
    ],
    keyFacts: [
      { label: "What it is", value: "Explosive add-on armor 'bricks'" },
      { label: "How", value: "Detonates outward to disrupt warhead" },
      { label: "Best vs.", value: "Shaped-charge (HEAT) jets" },
      { label: "Beaten by", value: "Tandem warheads" },
    ],
    examples: [
      {
        title: "Explosive reactive armor (ERA)",
        description:
          "ERA blocks fitted over tanks defeat many anti-tank rockets and missiles on the first hit.",
      },
      {
        title: "Tandem-charge response",
        description:
          "Modern ATGMs use two charges to defeat reactive armor, continuing the armor arms race.",
      },
    ],
    related: ["main-battle-tank", "shaped-charge", "atgm", "active-protection-system"],
    wiki: "Reactive armour",
    imageAlt: "A tank fitted with reactive armor bricks",
  },

  // ── Doctrine & concepts ────────────────────────────────────────────────────
  {
    slug: "anti-submarine-warfare",
    term: "Anti-Submarine Warfare",
    abbreviation: "ASW",
    category: "doctrine",
    tldr: "The cat-and-mouse hunt for enemy submarines using sonar, ships, aircraft and other subs — one of the hardest jobs at sea.",
    summary:
      "The branch of naval warfare focused on detecting, tracking, and destroying enemy submarines.",
    definition: [
      "Anti-Submarine Warfare (ASW) is the naval mission of finding and defeating enemy submarines. Because submarines hide underwater where they are extremely hard to detect, ASW is often called one of the most difficult tasks in warfare — a patient cat-and-mouse hunt across vast, opaque oceans. Failing at it can be catastrophic, since a single submarine can sink warships or threaten cities with missiles.",
      "ASW uses many tools working together: sonar (active and passive), surface ships, helicopters dipping or dropping sensors, long-range patrol aircraft, seabed listening arrays, and other submarines acting as hunters. Once a submarine is found, it is attacked with homing torpedoes or depth charges. The whole effort blends sensors, platforms, and analysis into a layered search, and the contest between quieter submarines and better detection never ends.",
    ],
    keyFacts: [
      { label: "Goal", value: "Detect & destroy submarines" },
      { label: "Why hard", value: "Subs hide in a vast, opaque sea" },
      { label: "Tools", value: "Sonar, ships, aircraft, subs" },
      { label: "Weapons", value: "Homing torpedoes, depth charges" },
    ],
    examples: [
      {
        title: "Maritime patrol aircraft",
        description:
          "Long-range aircraft drop sonar buoys and torpedoes to hunt submarines over wide ocean areas.",
      },
      {
        title: "Layered ASW screens",
        description:
          "Ships, helicopters, and submarines combine to protect high-value vessels from undersea attack.",
      },
    ],
    related: ["submarine", "sonar", "torpedo", "frigate"],
    wiki: "Anti-submarine warfare",
    imageAlt: "An anti-submarine warfare aircraft or ship",
  },
  {
    slug: "cyberwarfare",
    term: "Cyberwarfare",
    abbreviation: "",
    category: "doctrine",
    tldr: "Attacking or defending computers and networks as a weapon of war — disrupting an enemy's systems instead of bombing them.",
    summary:
      "The use of digital attacks to damage, disrupt, or spy on an adversary's computer systems and networks.",
    definition: [
      "Cyberwarfare is the use of digital attacks as an instrument of conflict — penetrating, disrupting, damaging, or spying on an enemy's computer systems and networks. Instead of (or alongside) physical force, a state can try to shut down power grids, corrupt military command systems, steal secrets, or sow confusion. Cyber is now recognized as a military domain in its own right, alongside land, sea, air, and space.",
      "Cyber operations range from espionage (quietly stealing data) to sabotage (damaging systems or the physical equipment they control) to influence operations. Their appeal is deniability, low cost, and reach — an attack can come from anywhere, instantly, and be hard to attribute. Because modern militaries and societies depend so heavily on networked systems, both attacking and defending in cyberspace have become central to national security, blurring the line between war and peace.",
    ],
    keyFacts: [
      { label: "What it is", value: "Digital attacks as a weapon" },
      { label: "Domain", value: "Cyberspace (5th warfare domain)" },
      { label: "Forms", value: "Espionage, sabotage, influence" },
      { label: "Appeal", value: "Cheap, deniable, global reach" },
    ],
    examples: [
      {
        title: "Attacks on infrastructure",
        description:
          "Cyber operations have targeted power grids and industrial systems, causing real-world disruption.",
      },
      {
        title: "Espionage campaigns",
        description:
          "States use cyber intrusions to steal defense secrets and intellectual property at scale.",
      },
    ],
    related: ["c4isr", "electronic-warfare", "network-centric-warfare", "anti-satellite-weapon"],
    wiki: "Cyberwarfare",
    imageAlt: "A cyberwarfare / network operations concept",
  },
  {
    slug: "anti-satellite-weapon",
    term: "Anti-Satellite Weapon",
    abbreviation: "ASAT",
    category: "doctrine",
    tldr: "A weapon that destroys or disables satellites — blinding an enemy that relies on space for spying, navigation and communication.",
    summary:
      "A weapon designed to destroy or disable satellites, threatening the space systems modern militaries depend on.",
    definition: [
      "An anti-satellite (ASAT) weapon is designed to destroy or disable satellites in orbit. Because modern militaries depend heavily on satellites for reconnaissance, communications, navigation, and early warning, the ability to knock them out is a powerful way to blind and deafen an opponent. ASAT capability has turned space into a potential battleground and a growing concern for strategic stability.",
      "ASAT weapons come in several forms: 'kinetic' interceptors that physically smash into a satellite, ground-based lasers or jammers that dazzle or disrupt sensors and links, and 'co-orbital' systems that maneuver near a target to interfere with or grab it. Kinetic attacks are especially controversial because they create clouds of high-speed debris that can threaten other satellites for years, endangering the very orbits everyone relies on.",
    ],
    keyFacts: [
      { label: "Target", value: "Satellites in orbit" },
      { label: "Why", value: "Blind enemy space systems" },
      { label: "Types", value: "Kinetic, laser/jam, co-orbital" },
      { label: "Big problem", value: "Debris from kinetic kills" },
    ],
    examples: [
      {
        title: "Kinetic ASAT tests",
        description:
          "Several nations have destroyed satellites in tests, creating debris clouds that drew international criticism.",
      },
      {
        title: "Jamming and dazzling",
        description:
          "Non-destructive ASAT methods disrupt satellite links and sensors without creating debris.",
      },
    ],
    related: ["military-satellite", "cyberwarfare", "gps", "deterrence-conventional"],
    wiki: "Anti-satellite weapon",
    imageAlt: "An anti-satellite weapon concept",
  },
  {
    slug: "drone-swarm",
    term: "Drone Swarm",
    abbreviation: "",
    category: "doctrine",
    tldr: "Many cheap drones acting together as one coordinated mass — overwhelming defenses that can't shoot them all down.",
    summary:
      "A large group of drones operating together, often autonomously, to overwhelm defenses through sheer numbers.",
    definition: [
      "A drone swarm is a large group of unmanned systems operating together, ideally coordinating with each other to act as a single mass rather than as separate aircraft. The core idea is overwhelming through numbers: even if defenses can destroy some drones, they may not be able to stop dozens or hundreds attacking at once, and the cost of the interceptors can vastly exceed the cost of the cheap drones.",
      "Swarms can saturate air defenses, spread out to scout wide areas, or combine sensing and attack roles, with future versions using artificial intelligence to self-organize. They represent a shift toward cheap, attritable mass that challenges expensive, high-end platforms. Defending against them is a major driver of counter-UAS efforts, including jammers, guns, and directed-energy weapons able to engage many targets cheaply.",
    ],
    keyFacts: [
      { label: "What it is", value: "Many drones acting as one mass" },
      { label: "Logic", value: "Overwhelm via cheap numbers" },
      { label: "Roles", value: "Saturate defenses, scout, attack" },
      { label: "Countered by", value: "Jammers, guns, directed energy" },
    ],
    examples: [
      {
        title: "Saturation attacks",
        description:
          "Launching many cheap drones at once can overwhelm defenses designed for a few high-end threats.",
      },
      {
        title: "Counter-swarm weapons",
        description:
          "Lasers and microwaves are pursued precisely because they can engage many drones at low cost.",
      },
    ],
    related: ["loitering-munition", "counter-uas", "ucav", "directed-energy-weapon"],
    wiki: "Drone swarm",
    imageAlt: "A swarm of drones",
  },
  {
    slug: "blitzkrieg",
    term: "Blitzkrieg",
    abbreviation: "",
    category: "doctrine",
    tldr: "A 'lightning war' tactic: hit fast and hard with concentrated tanks, aircraft and infantry to punch through and collapse the enemy before they can react.",
    summary:
      "A fast, concentrated offensive using combined armor, air power, and mobility to break through and paralyze the enemy.",
    definition: [
      "Blitzkrieg — German for 'lightning war' — describes a style of fast, concentrated offensive made famous early in World War II. Instead of slowly grinding along a broad front, attackers mass tanks, motorized infantry, and air power at a narrow point, punch through the enemy line, and drive deep into the rear before the defender can react, encircling and paralyzing them through sheer speed and shock.",
      "The key ideas — concentration of force, speed, combined arms, and disrupting the enemy's ability to decide and respond — remain influential in modern maneuver warfare, even though the term itself is historical and was applied loosely at the time. Studying blitzkrieg is a way to understand why tempo, combined arms, and attacking an enemy's cohesion (not just their forces) are central to offensive doctrine.",
    ],
    keyFacts: [
      { label: "Means", value: "'Lightning war'" },
      { label: "Method", value: "Concentrated, fast, combined-arms thrust" },
      { label: "Goal", value: "Break through and paralyze the enemy" },
      { label: "Legacy", value: "Modern maneuver warfare" },
    ],
    examples: [
      {
        title: "Early WWII campaigns",
        description:
          "Rapid armored thrusts supported by air power overran defenders faster than they could respond.",
      },
      {
        title: "Maneuver warfare today",
        description:
          "Modern doctrine still prizes tempo and combined arms to shatter an enemy's cohesion.",
      },
    ],
    related: ["combined-arms", "main-battle-tank", "air-superiority"],
    wiki: "Blitzkrieg",
    imageAlt: "Armored forces conducting a fast offensive",
  },
  {
    slug: "network-centric-warfare",
    term: "Network-Centric Warfare",
    abbreviation: "NCW",
    category: "doctrine",
    tldr: "Linking all your sensors, commanders and weapons into one network so the whole force fights smarter and faster than the enemy.",
    summary:
      "A doctrine that links sensors, decision-makers, and weapons into a network to fight faster and more effectively.",
    definition: [
      "Network-Centric Warfare (NCW) is the idea that a military's power comes not just from its individual platforms but from connecting them all into a single information network. By linking sensors, commanders, and shooters so they share a common, real-time picture, a networked force can decide and act faster than an opponent, concentrate effects without concentrating forces, and let any sensor cue any weapon.",
      "The doctrine grew out of the information-technology revolution and underpins concepts like sensor-to-shooter engagement and modern 'multi-domain' operations. Its promise is dramatically better situational awareness and speed; its risks are dependence on networks that can be jammed, hacked, or saturated, which is why resilience, security, and the ability to keep fighting when the network degrades are central concerns.",
    ],
    keyFacts: [
      { label: "Core idea", value: "Link sensors, deciders, shooters" },
      { label: "Payoff", value: "Faster decisions, sensor-to-shooter" },
      { label: "Built on", value: "Data links, C4ISR" },
      { label: "Risk", value: "Dependence on vulnerable networks" },
    ],
    examples: [
      {
        title: "Sensor-to-shooter kill webs",
        description:
          "Any platform can engage a target detected by another, the practical heart of network-centric warfare.",
      },
      {
        title: "Multi-domain operations",
        description:
          "Modern doctrine extends networking across land, sea, air, space, and cyber.",
      },
    ],
    related: ["c4isr", "data-link", "situational-awareness", "cyberwarfare"],
    wiki: "Network-centric warfare",
    imageAlt: "A networked battlefield concept",
  },
  {
    slug: "deterrence-conventional",
    term: "Conventional Deterrence",
    abbreviation: "",
    category: "doctrine",
    tldr: "Preventing an attack by making clear your normal (non-nuclear) forces would defeat it or make it too costly to be worth trying.",
    summary:
      "Preventing aggression through the credible threat that conventional (non-nuclear) forces would defeat or punish it.",
    definition: [
      "Conventional deterrence is the prevention of aggression using non-nuclear military power. Like nuclear deterrence, it works by convincing a potential aggressor that attacking would not pay — but here the threat is that ordinary armed forces would either defeat the attack outright ('deterrence by denial') or impose costs so painful they outweigh any gains ('deterrence by punishment').",
      "Making it credible requires capable, ready, and visible forces, often forward-deployed near a potential flashpoint, plus the clear political will to use them and reliable allies. It is harder to make convincing than nuclear deterrence, because the outcome of a conventional war is less certain than the guaranteed devastation of a nuclear exchange. Much of peacetime defense posture — exercises, deployments, alliances, and arms purchases — is really about strengthening conventional deterrence so that war never starts.",
    ],
    keyFacts: [
      { label: "Goal", value: "Prevent attack with non-nuclear force" },
      { label: "By denial", value: "Make the attack fail" },
      { label: "By punishment", value: "Make the cost too high" },
      { label: "Needs", value: "Ready, visible, credible forces" },
    ],
    examples: [
      {
        title: "Forward-deployed forces",
        description:
          "Stationing capable forces near a flashpoint signals that aggression would be met and defeated.",
      },
      {
        title: "Exercises and alliances",
        description:
          "Visible readiness and reliable allies strengthen the credibility of conventional deterrence.",
      },
    ],
    related: ["nuclear-deterrence", "a2ad", "interoperability", "force-multiplier"],
    wiki: "Deterrence theory",
    imageAlt: "Military forces on exercise as deterrence",
  },
  {
    slug: "nato",
    term: "NATO",
    abbreviation: "NATO",
    category: "doctrine",
    tldr: "A military alliance of North American and European countries that promises to defend each other — an attack on one is an attack on all.",
    summary:
      "The North Atlantic Treaty Organization — a collective-defense alliance of North American and European democracies.",
    definition: [
      "NATO, the North Atlantic Treaty Organization, is a military alliance founded in 1949 linking North American and European democracies. Its foundation is collective defense, enshrined in Article 5 of its treaty: an armed attack against one member is treated as an attack against all, so an aggressor faces the combined might of the whole alliance. This promise is designed to deter attack in the first place.",
      "Beyond the mutual-defense pledge, NATO shapes the defense world through deep cooperation: common standards (STANAGs) that make allied forces interoperable, joint commands, shared exercises, and pressure on members to invest in defense. For the defense industry, NATO standards and the drive for interoperability heavily influence what equipment is bought and how it must work together, making the alliance a major force in the global arms market.",
    ],
    keyFacts: [
      { label: "Full name", value: "North Atlantic Treaty Organization" },
      { label: "Founded", value: "1949" },
      { label: "Core", value: "Article 5 collective defense" },
      { label: "Industry effect", value: "Standards & interoperability" },
    ],
    examples: [
      {
        title: "Article 5",
        description:
          "The mutual-defense clause — an attack on one is an attack on all — is NATO's central deterrent.",
      },
      {
        title: "Standardization (STANAGs)",
        description:
          "Common NATO standards drive interoperability and shape members' equipment purchases.",
      },
    ],
    related: ["interoperability", "deterrence-conventional", "foreign-military-sales"],
    wiki: "NATO",
    imageAlt: "The NATO emblem and member forces",
  },

  // ── Industry & programs ────────────────────────────────────────────────────
  // ── New entries — additional trade & policy ───────────────────────────────
  {
    slug: "arms-embargo",
    term: "Arms Embargo",
    abbreviation: "",
    category: "trade",
    tldr: "An official ban that stops a country from buying or receiving weapons — usually as punishment or to prevent escalation.",
    summary:
      "An official prohibition on the sale or transfer of arms to a specific country, group, or region, imposed by one nation or an international body.",
    definition: [
      "An arms embargo is an official measure that bans the sale, delivery, or transfer of weapons and military equipment to a targeted country, non-state actor, or conflict zone. It can be imposed unilaterally by a single exporting nation, agreed by a bloc like the European Union, or mandated by the United Nations Security Council — the most binding form, requiring all member states to comply.",
      "Embargoes serve several purposes: punishing a government for human-rights violations, trying to reduce violence in a conflict, pressuring a regime to change behavior, or preventing a weapons buildup that could threaten regional stability. Enforcing them is the hard part — porous borders, third-country transshipment, and private brokers allow weapons to flow around them, so effectiveness varies enormously.",
      "For the defense industry, an embargo immediately removes a customer from the market and can freeze outstanding contracts. For targeted states, it can create serious capability gaps — or drive them to develop domestic production and new supplier relationships, as Iran and North Korea have demonstrated.",
    ],
    keyFacts: [
      { label: "Imposed by", value: "UN, regional bodies, or single states" },
      { label: "Strongest form", value: "UN Security Council mandatory embargo" },
      { label: "Challenge", value: "Enforcement & smuggling routes" },
      { label: "Effect", value: "Cuts off military supply chains" },
    ],
    examples: [
      {
        title: "UN arms embargo on North Korea",
        description:
          "A comprehensive UN embargo bans virtually all arms transfers to North Korea, though illicit networks continue to supply components.",
      },
      {
        title: "EU embargo on Russia (2014/2022)",
        description:
          "The EU imposed arms embargoes following Russia's actions in Ukraine, cutting off European defense exports and technology transfers.",
      },
    ],
    related: ["export-control", "end-user-certificate", "sanctions", "foreign-military-sales"],
    wiki: "Arms embargo",
    imageAlt: "A cargo ship subject to arms embargo inspections",
  },
  {
    slug: "sanctions",
    term: "Defense Sanctions",
    abbreviation: "",
    category: "trade",
    tldr: "Economic penalties that freeze a country's access to money, technology, or trade — used as a weapon short of war.",
    summary:
      "Restrictions on financial transactions, trade, and technology access imposed on a country or entity to change its behavior.",
    definition: [
      "Sanctions are economic and financial measures that governments impose on a country, organization, or individual to force a change in behavior without resorting to military action. In the defense context, they can block arms purchases, freeze the assets of defense companies or officials, deny access to financial systems, and cut off technology and components needed to build weapons.",
      "The United States uses sanctions extensively, through the Office of Foreign Assets Control (OFAC), to restrict adversaries' access to the global financial system and to advanced technology. Entities on the 'Specially Designated Nationals' list cannot deal with U.S. persons or use the U.S. dollar, a powerful lever in a dollar-dominated world. The EU, UK, and other powers have their own regimes, and coordinated 'multilateral' sanctions are much harder to evade than unilateral ones.",
      "Sanctions matter to the defense industry because any company anywhere that does business with a sanctioned entity risks losing its own access to U.S. markets and banking. This 'secondary sanctions' risk extends their reach far beyond U.S. borders and forces defense firms worldwide to screen their customers and supply chains carefully.",
    ],
    keyFacts: [
      { label: "Tool of", value: "Economic statecraft, short of war" },
      { label: "US body", value: "OFAC (Treasury)" },
      { label: "Lever", value: "Dollar access, tech cutoffs" },
      { label: "Extended reach", value: "Secondary sanctions on third parties" },
    ],
    examples: [
      {
        title: "CAATSA (USA)",
        description:
          "Countering America's Adversaries Through Sanctions Act threatens sanctions on any country buying major Russian, Iranian, or North Korean arms.",
      },
      {
        title: "Russia sanctions packages",
        description:
          "Post-2022 Western sanctions targeted Russian defense firms and technology imports, aiming to slow its military production.",
      },
    ],
    related: ["arms-embargo", "export-control", "dual-use"],
    wiki: "Economic sanctions",
    imageAlt: "Sanctions measures affecting defense trade",
  },
  {
    slug: "technology-transfer",
    term: "Technology Transfer",
    abbreviation: "ToT",
    category: "trade",
    tldr: "When the seller of a weapon shares its know-how so the buyer can eventually build or maintain that weapon themselves.",
    summary:
      "The process by which a defense supplier shares technical knowledge, manufacturing rights, or production processes with a purchasing country.",
    definition: [
      "Technology transfer (ToT) occurs when a defense contractor or government shares technical knowledge, manufacturing processes, software, or intellectual property with another country or company as part of — or alongside — an arms deal. Rather than simply buying finished hardware, the recipient gains some ability to understand, produce, or modify the system themselves.",
      "ToT is a powerful tool of industrial development. For buyers, it is often a demand: a country may agree to purchase fighters or frigates only if the seller helps them build a domestic production line, train engineers, or license components for local manufacture. This is closely related to 'direct offsets', and is central to countries trying to build up sovereign defense industries rather than depending permanently on imports.",
      "For sellers, ToT involves real risks — sharing proprietary designs risks losing competitive advantage or seeing the technology spread to unintended recipients. Governments therefore regulate ToT alongside arms exports, requiring licenses and imposing limits on what can be transferred and to whom. The most sensitive technologies (stealth coatings, missile seekers, encryption) are kept tightly controlled even when the platform itself is sold.",
    ],
    keyFacts: [
      { label: "What transfers", value: "Know-how, licenses, production rights" },
      { label: "Buyer goal", value: "Industrial sovereignty, self-sufficiency" },
      { label: "Seller risk", value: "Loss of competitive advantage" },
      { label: "Regulated by", value: "Export-control licenses" },
    ],
    examples: [
      {
        title: "India 'Make in India' demands",
        description:
          "India routinely requires technology transfer as part of major arms deals, building domestic manufacturing capacity for fighters, helicopters, and submarines.",
      },
      {
        title: "Licensed production of F-16s",
        description:
          "Several countries have produced F-16 components or assembled aircraft under license, receiving partial ToT from Lockheed Martin.",
      },
    ],
    related: ["offset", "defense-industrial-base", "export-control", "foreign-military-sales"],
    wiki: "Technology transfer",
    imageAlt: "Engineers working on licensed defense production",
  },

  // ── New entries — additional platforms ────────────────────────────────────
  {
    slug: "stealth-bomber",
    term: "Stealth Bomber",
    abbreviation: "",
    category: "platforms",
    tldr: "A large aircraft designed to fly deep into enemy territory undetected and drop bombs on the most heavily defended targets.",
    summary:
      "A long-range strategic bomber combining stealth technology with heavy payload to strike targets inside the most defended airspace.",
    definition: [
      "A stealth bomber is a large aircraft built to penetrate the densest air defenses undetected and deliver a heavy payload — conventional or nuclear — against strategic targets deep in enemy territory. Unlike a tactical fighter, which briefly darts through defenses, a bomber must carry a large bomb load over intercontinental distances, making its stealth engineering far more demanding.",
      "The flying-wing shape — a smooth, curved body with no vertical tail and no separate fuselage — is the signature of the most advanced stealth bombers. All radar-reflective sharp edges and protrusions are eliminated; engines are buried inside and exhaust is cooled to mask the heat signature; weapons are carried in internal bays. The result is an aircraft with a radar cross-section reportedly the size of a large bird.",
      "Stealth bombers occupy a unique role: they are the delivery platform for the most difficult, highest-value strikes in wartime, and their existence is an instrument of deterrence. Because they are extraordinarily expensive and complex to operate, very few nations can field them, and programs like the U.S. B-21 Raider and China's H-20 are watched closely as measures of strategic capability.",
    ],
    keyFacts: [
      { label: "Role", value: "Deep-penetration strategic strike" },
      { label: "Shape", value: "Flying wing — minimal radar return" },
      { label: "Payload", value: "Conventional & nuclear bombs/missiles" },
      { label: "Examples", value: "B-2 Spirit, B-21 Raider (USA)" },
    ],
    examples: [
      {
        title: "B-2 Spirit (USA)",
        description:
          "The world's first operational stealth bomber, used for precision strikes on heavily defended targets since the 1990s.",
      },
      {
        title: "B-21 Raider (USA)",
        description:
          "Successor to the B-2, designed to penetrate next-generation air defenses and carry conventional and nuclear weapons deep into adversary territory.",
      },
    ],
    related: ["stealth", "nuclear-deterrence", "strategic-bomber", "cruise-missile"],
    wiki: "Northrop Grumman B-2 Spirit",
    imageAlt: "A flying-wing stealth bomber in flight",
  },
  {
    slug: "ground-based-interceptor",
    term: "Ground-Based Interceptor",
    abbreviation: "GBI",
    category: "platforms",
    tldr: "A missile launched from the ground specifically to shoot down an incoming nuclear ICBM in space, before it can reach its target.",
    summary:
      "A ground-launched missile designed to intercept and destroy incoming ballistic missiles during their flight through space.",
    definition: [
      "A ground-based interceptor (GBI) is a defensive missile system launched from silos in the ground to destroy incoming ballistic missiles — particularly intercontinental ones — while they are still flying through space, in the 'midcourse' phase of flight. It is the centerpiece of a country's homeland missile defense against long-range nuclear attack.",
      "Intercepting a warhead in space is one of the hardest engineering problems in defense: the target is very small, traveling at several kilometers per second, and may be accompanied by decoys that look identical on radar. The interceptor carries a 'kill vehicle' that guides itself to the target and destroys it by direct impact — 'hit-to-kill' — without an explosive warhead, relying purely on the kinetic energy of the collision.",
      "The technology is enormously costly and remains controversial: critics argue it cannot reliably work in a real attack, while proponents say even imperfect defense changes the calculus of nuclear deterrence. The U.S. Ground-Based Midcourse Defense (GMD) system with interceptors in Alaska and California is the primary deployed example.",
    ],
    keyFacts: [
      { label: "Intercepts during", value: "Midcourse (space) phase" },
      { label: "Kill method", value: "Direct hit-to-kill impact" },
      { label: "Target", value: "ICBMs & warheads in space" },
      { label: "U.S. system", value: "Ground-Based Midcourse Defense (GMD)" },
    ],
    examples: [
      {
        title: "U.S. GMD system",
        description:
          "Interceptors based in Alaska and California defend the U.S. homeland against limited ICBM attacks from North Korea or Iran.",
      },
      {
        title: "Decoy problem",
        description:
          "Adversaries can deploy decoys alongside warheads in space, making reliable interception extremely difficult and driving continued investment in discrimination sensors.",
      },
    ],
    related: ["ballistic-missile", "nuclear-deterrence", "integrated-air-defense-system", "surface-to-air-missile"],
    wiki: "Ground-Based Midcourse Defense",
    imageAlt: "A ground-based interceptor missile launching",
  },

  // ── New entries — additional systems & sensors ─────────────────────────────
  {
    slug: "space-based-sensor",
    term: "Space-Based Sensor",
    abbreviation: "",
    category: "systems",
    tldr: "Satellites that watch the Earth for missile launches, troop movements, or enemy signals — giving commanders a view from space.",
    summary:
      "Orbiting satellites equipped with sensors that monitor the Earth for military threats, providing early warning, intelligence, and targeting data.",
    definition: [
      "Space-based sensors are satellites equipped with cameras, infrared detectors, radar, or signals-collection equipment that watch the surface and atmosphere of the Earth for military purposes. They provide things ground-based sensors cannot: a global view, coverage over denied territory, and persistence — circling the Earth every few hours or hovering in geostationary orbit to watch a fixed region continuously.",
      "The main military applications are diverse. Infrared early-warning satellites detect the intense heat plume of a ballistic missile seconds after launch, providing critical warning minutes before impact. Optical and radar imagery satellites photograph military facilities, troop deployments, and naval movements at high resolution, feeding intelligence analysts. Signals-intelligence satellites intercept radar emissions and communications. Together these systems give commanders a 'big picture' that was simply impossible before the space age.",
      "As their value became clear, satellites became targets. Anti-satellite (ASAT) weapons, ground-based lasers, jammers, and cyber intrusions can blind or disable them. This drives a shift toward resilient 'constellations' of many smaller satellites — if several are destroyed, enough remain — and toward hardened, jam-resistant designs.",
    ],
    keyFacts: [
      { label: "Orbit types", value: "LEO, MEO, geostationary (GEO)" },
      { label: "Sensors", value: "Infrared, optical, radar, SIGINT" },
      { label: "Key role", value: "Missile launch warning & ISR" },
      { label: "Threats", value: "ASAT, jamming, cyber, lasers" },
    ],
    examples: [
      {
        title: "U.S. SBIRS / Next Gen OPIR",
        description:
          "Infrared satellites in geostationary orbit detect ballistic-missile launches worldwide within seconds, a cornerstone of U.S. nuclear warning.",
      },
      {
        title: "Commercial imagery constellations",
        description:
          "Commercial operators now provide near-daily satellite imagery used by governments and open-source analysts to track military activity.",
      },
    ],
    related: ["military-satellite", "anti-satellite-weapon", "c4isr", "ballistic-missile"],
    wiki: "Reconnaissance satellite",
    imageAlt: "A military early-warning satellite in orbit",
  },
  {
    slug: "signals-intelligence",
    term: "Signals Intelligence",
    abbreviation: "SIGINT",
    category: "systems",
    tldr: "Spying by listening — intercepting an enemy's radio, radar, and phone signals to learn what they're doing.",
    summary:
      "Intelligence gathered by intercepting electronic signals — communications, radar emissions, and telemetry — from an adversary.",
    definition: [
      "Signals intelligence (SIGINT) is intelligence gathered by intercepting and analyzing the electromagnetic signals an adversary emits — their radio communications, radar pulses, data transmissions, mobile phones, and the telemetry from missiles during testing. It is one of the most valuable sources of military and strategic intelligence, because it can reveal intentions, capabilities, and plans that no satellite photograph can capture.",
      "SIGINT divides into sub-categories. COMINT (communications intelligence) intercepts voice and data communications between people and organizations. ELINT (electronic intelligence) collects and analyzes radar and weapons-system emissions — identifying where enemy radars are, what type they are, and how they behave, which is essential for jamming and targeting. MASINT (measurement and signature intelligence) captures unique signatures from weapons and systems.",
      "Dedicated SIGINT platforms include aircraft that fly along borders to sweep up radar and communications signals, satellites that intercept global communications, and ground stations. The intelligence produced shapes targeting, air-defense suppression, and arms-control verification, and SIGINT agencies — like the U.S. NSA or the UK's GCHQ — are among the most important in any intelligence community.",
    ],
    keyFacts: [
      { label: "Branches", value: "COMINT, ELINT, MASINT" },
      { label: "Platforms", value: "Aircraft, satellites, ground stations" },
      { label: "Products", value: "Enemy locations, plans, radar data" },
      { label: "Key agencies", value: "NSA (USA), GCHQ (UK)" },
    ],
    examples: [
      {
        title: "ELINT for SEAD",
        description:
          "Recording enemy radar emissions lets planners build jamming programs and targeting data for Suppression of Enemy Air Defenses missions.",
      },
      {
        title: "RC-135 Rivet Joint",
        description:
          "A dedicated U.S. SIGINT aircraft that flies missions collecting communications and electronic intelligence in crisis regions.",
      },
    ],
    related: ["c4isr", "electronic-warfare", "military-satellite", "sead"],
    wiki: "Signals intelligence",
    imageAlt: "An airborne signals-intelligence collection aircraft",
  },
  {
    slug: "uav-swarm",
    term: "UAV Swarm",
    abbreviation: "",
    category: "systems",
    tldr: "Many small drones acting together like a flock, overwhelming defenses through sheer numbers and coordination.",
    summary:
      "A coordinated group of unmanned aerial vehicles that operates collectively, using numbers and distributed logic to overwhelm defenses.",
    definition: [
      "A UAV swarm is a group of unmanned aerial vehicles that operate in a coordinated, collective manner — sharing information and adapting behavior as a group rather than each being individually piloted. Inspired by the behavior of flocks of birds or swarms of insects, the concept exploits numbers: a swarm can saturate a defense, confuse targeting sensors, and accept the loss of individual members without failing as a whole.",
      "Swarming tactics are particularly powerful against air-defense systems designed to track and engage one or a few targets at a time. A swarm of dozens or hundreds of small drones can approach from multiple directions simultaneously, each too small and cheap for an expensive interceptor missile to be fired at every one. Some can jam radars, others carry warheads, and others serve as decoys — the defense cannot tell which is which until too late.",
      "The technology is advancing rapidly, moving from centrally controlled formations toward genuinely autonomous swarms with onboard AI that allows collective decision-making without a continuous link to a human operator. This raises new challenges for counter-drone systems and new ethical questions about lethal autonomy.",
    ],
    keyFacts: [
      { label: "Key advantage", value: "Saturates defenses through numbers" },
      { label: "Tactics", value: "Multi-axis attack, decoys, jammers mixed in" },
      { label: "Trend", value: "Moving toward onboard AI autonomy" },
      { label: "Counter", value: "Directed energy, EW, networked CIWS" },
    ],
    examples: [
      {
        title: "Atacama drone attacks",
        description:
          "Coordinated drone swarm attacks on energy infrastructure and military bases have demonstrated real-world saturation of defenses.",
      },
      {
        title: "U.S. Perdix micro-UAVs",
        description:
          "An early U.S. demonstration of 103 small drones launched from a fighter that self-organized into a swarm without central control.",
      },
    ],
    related: ["counter-uas", "loitering-munition", "drone-swarm", "directed-energy-weapon"],
    wiki: "Unmanned combat aerial vehicle",
    imageAlt: "A swarm of small unmanned aerial vehicles in formation",
  },
  {
    slug: "autonomous-weapon",
    term: "Autonomous Weapon System",
    abbreviation: "AWS",
    category: "systems",
    tldr: "A weapon that can find and attack targets on its own, without a human deciding each individual shot — raising deep ethical questions.",
    summary:
      "A weapon system capable of selecting and engaging targets without direct human authorization for each individual attack.",
    definition: [
      "An autonomous weapon system (AWS) is a weapon that can detect, identify, select, and engage targets using its own sensors and onboard algorithms, without a human operator deciding to pull the trigger for each individual attack. The degree of autonomy is a spectrum: at one end a human approves every engagement; at the other, a system operates entirely independently once released.",
      "The distinction between semi-autonomous and fully autonomous matters enormously for law and ethics. Most current 'automatic' systems — like a close-in weapon system that shoots down incoming missiles — are pre-authorized by humans but react faster than any human could. Truly autonomous 'lethal autonomous weapon systems' (LAWS) that choose human targets entirely by machine logic are the subject of intense international debate, with critics calling for a treaty ban.",
      "Proponents argue autonomy speeds response time, removes risk to soldiers, and can enable persistent operations. Critics warn that machines cannot reliably apply the laws of war, that accountability disappears when no human pulls the trigger, and that lowering the cost of lethal force could make conflict more frequent. This debate is shaping arms-control discussions, military doctrine, and the design of AI-equipped weapons worldwide.",
    ],
    keyFacts: [
      { label: "Spectrum", value: "Human-in-loop → fully autonomous" },
      { label: "Controversy", value: "LAWS — 'killer robot' debate" },
      { label: "Legal issue", value: "Accountability, laws-of-war compliance" },
      { label: "Current form", value: "CIWS, active protection, loitering munitions" },
    ],
    examples: [
      {
        title: "CIWS auto-engagement",
        description:
          "Phalanx CIWS can detect and engage incoming missiles without human authorization — pre-approved but fully automatic engagement.",
      },
      {
        title: "International ban efforts",
        description:
          "UN discussions on LAWS aim to set red lines against weapons that select and kill humans without meaningful human control.",
      },
    ],
    related: ["counter-uas", "loitering-munition", "uav-swarm", "drone-swarm"],
    wiki: "Lethal autonomous weapon",
    imageAlt: "An autonomous weapon system concept",
  },

  // ── New entries — additional doctrine & concepts ───────────────────────────
  {
    slug: "escalation-dominance",
    term: "Escalation Dominance",
    abbreviation: "",
    category: "doctrine",
    tldr: "The ability to always have a more powerful response ready than your opponent at every level of a conflict — so they back down first.",
    summary:
      "A strategic posture in which a state maintains a credible and superior military option at every rung of the escalation ladder.",
    definition: [
      "Escalation dominance is the idea that a state should be able to match or exceed an adversary at every level of conflict intensity, from low-level skirmishes all the way up to nuclear exchange, so that at no rung of the 'escalation ladder' does the adversary believe it can gain an advantage by raising the stakes. If you can credibly counter any escalation step, you deny your opponent a reason to escalate further.",
      "The concept rests on the 'escalation ladder' — a metaphor for the rising levels of conflict severity. Each rung represents a more intense form of violence. Escalation dominance requires credible, ready capabilities at each rung: conventional superiority for mid-level conventional war, theater nuclear options, and strategic nuclear deterrence at the top.",
      "In practice, escalation dominance is difficult and expensive to achieve across the full spectrum. Modern discussions focus on whether nuclear-armed states can fight and win conventional or 'gray zone' conflicts without triggering nuclear escalation — a problem with no easy answer and one that drives both weapons development and arms-control negotiations.",
    ],
    keyFacts: [
      { label: "Goal", value: "Superior option at every conflict level" },
      { label: "Tool", value: "The escalation ladder concept" },
      { label: "Challenge", value: "Credible across conventional & nuclear" },
      { label: "Links to", value: "Deterrence, proportional response" },
    ],
    examples: [
      {
        title: "NATO conventional + nuclear posture",
        description:
          "NATO combines conventional forces, theater nuclear sharing, and strategic deterrence to maintain credible options across the escalation spectrum against Russia.",
      },
      {
        title: "Gray zone competition",
        description:
          "Adversaries probe below the threshold of open conflict, betting that democracies lack escalation-dominance tools for low-intensity coercion.",
      },
    ],
    related: ["nuclear-deterrence", "deterrence-conventional", "a2ad", "asymmetric-warfare"],
    wiki: "Escalation dominance",
    imageAlt: "A strategic escalation ladder concept diagram",
  },
  {
    slug: "gray-zone",
    term: "Gray Zone Conflict",
    abbreviation: "",
    category: "doctrine",
    tldr: "Coercive actions — like cyberattacks or disinformation — that stay below the level of open war, making them hard to respond to.",
    summary:
      "Hostile activities — coercion, cyber operations, disinformation, proxy forces — that fall between peace and open armed conflict.",
    definition: [
      "Gray zone conflict refers to hostile activities that a state or non-state actor conducts in the ambiguous space between normal peacetime competition and open armed conflict. The activities are designed to achieve strategic goals — seizing territory, weakening an opponent, influencing elections, or undermining alliances — while staying below the threshold that would trigger a conventional military response.",
      "Gray zone tools are diverse: cyberattacks on infrastructure, disinformation campaigns, economic coercion, proxy warfare, provocative but deniable paramilitary operations, or the slow, incremental seizure of contested territory. The 'deniability' is key — the aggressor can claim the actions were not state-sponsored or not hostile enough to justify retaliation.",
      "Responding to gray zone aggression is difficult because conventional military responses seem disproportionate, exposing a gap in strategy. Deterrence built for open war may not deter below-the-threshold harassment. This has pushed militaries and governments to develop counter-gray-zone strategies involving cyber capability, resilience, counter-influence operations, and legal tools alongside military readiness.",
    ],
    keyFacts: [
      { label: "Below the line of", value: "Open armed conflict" },
      { label: "Tools", value: "Cyber, disinformation, proxies, coercion" },
      { label: "Key feature", value: "Deniability and ambiguity" },
      { label: "Challenge", value: "Hard to deter or respond to" },
    ],
    examples: [
      {
        title: "South China Sea island-building",
        description:
          "Incremental construction on disputed reefs expanded territorial control without crossing into open war — a textbook gray zone operation.",
      },
      {
        title: "Election interference",
        description:
          "State-sponsored disinformation and hacking targeting foreign elections are gray zone operations aimed at weakening adversaries from within.",
      },
    ],
    related: ["cyberwarfare", "asymmetric-warfare", "escalation-dominance", "deterrence-conventional"],
    wiki: "Hybrid warfare",
    imageAlt: "Ambiguous state-sponsored covert operations",
  },
  {
    slug: "doctrine-power-projection",
    term: "Power Projection",
    abbreviation: "",
    category: "doctrine",
    tldr: "The ability to send and use military force far from your own country — the ultimate measure of a great power's military reach.",
    summary:
      "The ability of a state to deploy and sustain military force in distant regions to achieve strategic objectives.",
    definition: [
      "Power projection is the capacity of a state to deploy effective military force far from its own territory and sustain it long enough to achieve strategic goals. It is one of the defining attributes that separates great powers from regional ones: a country that can only defend its own borders has far less strategic influence than one that can intervene anywhere on the globe.",
      "Power projection requires more than just capable weapons — it needs the 'enablers' to get them there and keep them fighting: strategic airlift (large cargo aircraft), sealift (transport ships), aerial refueling tankers, forward bases or carrier strike groups, and secure, long-range logistics chains. Without these, even the most capable army is a homeland force.",
      "Aircraft carriers are the most visible symbol of power projection — a sovereign airfield that can appear off any coastline. Expeditionary land forces, long-range bombers, and naval task groups are other tools. Adversaries counter power projection with A2/AD strategies designed to raise the cost of deploying forces into their region.",
    ],
    keyFacts: [
      { label: "Requires", value: "Airlift, sealift, tankers, bases" },
      { label: "Symbol", value: "Aircraft carrier strike group" },
      { label: "Countered by", value: "A2/AD strategies" },
      { label: "Defines", value: "Great-power vs. regional military" },
    ],
    examples: [
      {
        title: "U.S. carrier strike groups",
        description:
          "Constant global deployment of carrier groups lets the U.S. threaten military action anywhere on short notice.",
      },
      {
        title: "Strategic airlift (C-17)",
        description:
          "Large transport aircraft enable rapid deployment of troops and equipment to distant theaters, the logistical backbone of power projection.",
      },
    ],
    related: ["aircraft-carrier", "a2ad", "logistics", "strategic-bomber"],
    wiki: "Power projection",
    imageAlt: "A carrier strike group projecting naval power",
  },
  {
    slug: "joint-operations",
    term: "Joint Operations",
    abbreviation: "",
    category: "doctrine",
    tldr: "Army, Navy, Air Force and Marines working together in one coordinated campaign — combining all military branches as a team.",
    summary:
      "Military operations that integrate forces from two or more services — army, navy, air force, and marines — under unified command.",
    definition: [
      "Joint operations are military campaigns or actions that combine forces from two or more services — typically army, navy, air force, and marines — under a single, unified command. The goal is to exploit the strengths of each service in a coordinated way: air power to win the skies and strike deep, naval forces to control the sea and deliver logistics, land forces to seize and hold ground, and special operations for precision actions.",
      "Modern warfare is almost always joint, because the advantages of combining services outweigh the complexity of coordinating them. Air support for ground forces, naval gunfire on coastal targets, and amphibious landings are classic examples of joint operations in practice. The challenge is 'jointness' — getting services that have different cultures, communications systems, and doctrines to actually mesh in the heat of battle.",
      "Joint doctrine, common communications standards, and dedicated joint commands (like U.S. combatant commands, each responsible for a region) are how modern militaries institutionalize jointness. The concept extends to 'combined joint' operations when allied nations' forces are included alongside multiple services.",
    ],
    keyFacts: [
      { label: "Who", value: "Two or more military services" },
      { label: "Enabled by", value: "Common comms, joint doctrine" },
      { label: "Extended", value: "Combined joint = allied + multi-service" },
      { label: "Challenge", value: "Culture, coordination, interoperability" },
    ],
    examples: [
      {
        title: "D-Day (1944)",
        description:
          "The largest joint amphibious operation in history combined naval, air, and land forces across many allied nations.",
      },
      {
        title: "U.S. Combatant Commands",
        description:
          "Regional commands like CENTCOM and INDOPACOM integrate all U.S. services plus allies for operations in their areas of responsibility.",
      },
    ],
    related: ["combined-arms", "interoperability", "c4isr", "amphibious-assault-ship"],
    wiki: "Joint warfare",
    imageAlt: "Multi-service joint military forces in an operation",
  },

  // ── New entries — additional industry & programs ───────────────────────────
  {
    slug: "sovereign-defense-industry",
    term: "Sovereign Defense Industry",
    abbreviation: "",
    category: "industry",
    tldr: "A country's own domestic ability to design and build weapons — seen as a strategic necessity so it doesn't depend on foreign suppliers.",
    summary:
      "A state's domestic capacity to design, develop, and manufacture its own defense equipment without relying on foreign suppliers.",
    definition: [
      "A sovereign defense industry refers to a country's domestic capability to design, develop, manufacture, and sustain its own military equipment, from rifles and ammunition up to warships, fighters, and missiles. Governments treat this as a strategic imperative: a nation that depends entirely on imports for its weapons is vulnerable — supplies can be cut off by an embargo, political decision, or war precisely when they are most needed.",
      "Building a sovereign industrial base requires sustained investment in engineering talent, manufacturing infrastructure, and research facilities. Smaller countries often cannot afford a full-spectrum capability and focus sovereignty efforts on the systems most critical to their specific strategy: Norway prioritizes naval missiles, Israel autonomous systems, Sweden stealth fighters. The rest is bought abroad under carefully managed dependency.",
      "The tension in sovereign defense industry is cost versus capability. Domestic programs are almost always more expensive per unit than buying proven foreign designs in quantity, because development costs are amortized over a small fleet. Governments justify the premium through job creation, technology spillover into civilian industry, long-term strategic independence, and the export potential of systems developed domestically.",
    ],
    keyFacts: [
      { label: "Why it matters", value: "Immunity from foreign supply cutoffs" },
      { label: "Challenge", value: "High development cost vs. small domestic market" },
      { label: "Trade-off", value: "Strategic independence vs. efficiency" },
      { label: "Examples", value: "Israel, Sweden, India, France" },
    ],
    examples: [
      {
        title: "France's full-spectrum industry",
        description:
          "France maintains domestic capability for nuclear weapons, carriers, fighters, missiles, and satellites — one of the most complete sovereign industries outside the U.S.",
      },
      {
        title: "Israel's niche depth",
        description:
          "Israel has built world-leading capability in specific areas — UAVs, active protection, cyber — to meet its unique threat environment without trying to build everything.",
      },
    ],
    related: ["defense-industrial-base", "technology-transfer", "offset", "arms-race"],
    wiki: "Arms industry",
    imageAlt: "A domestic defense manufacturing facility",
  },
  {
    slug: "foreign-direct-investment-defense",
    term: "Defense FDI Screening",
    abbreviation: "CFIUS / FIRB",
    category: "industry",
    tldr: "Government review of foreign companies buying into defense firms, to block takeovers that could threaten national security.",
    summary:
      "Government processes that review and can block foreign investment in defense and critical technology companies on national-security grounds.",
    definition: [
      "Defense Foreign Direct Investment (FDI) screening is the process by which governments review — and can block or impose conditions on — acquisitions of domestic defense and critical-technology companies by foreign investors. Because a foreign entity controlling a missile manufacturer, a chipmaker, or an AI company could gain access to classified designs, sensitive technology, or strategic supply chains, governments have set up dedicated review bodies.",
      "In the United States, the Committee on Foreign Investment in the United States (CFIUS) reviews deals and can recommend the President block them. The UK, EU, Australia (FIRB), and many other nations have equivalent bodies. After years of gap-filling, most allied nations dramatically strengthened their screening regimes in the late 2010s in response to concerns about Chinese acquisitions of Western technology companies.",
      "For the defense industry, FDI screening shapes M&A activity: some cross-border deals that make commercial sense are blocked on security grounds, and foreign investors must often accept conditions — divestiture of sensitive contracts, restrictions on data access, government 'golden shares' — as the price of approval.",
    ],
    keyFacts: [
      { label: "U.S. body", value: "CFIUS (Treasury-led)" },
      { label: "Can", value: "Block, condition, or unwind deals" },
      { label: "Trigger", value: "Control of sensitive tech or supply chain" },
      { label: "Trend", value: "Expanded globally post-2018" },
    ],
    examples: [
      {
        title: "CFIUS blocking a chip acquisition",
        description:
          "CFIUS has blocked several Chinese bids for U.S. semiconductor companies on the grounds that control of chip technology threatens national security.",
      },
      {
        title: "EU FDI screening regulation",
        description:
          "The 2019 EU regulation created a framework for member states to share information on deals and coordinate screening of sensitive acquisitions.",
      },
    ],
    related: ["defense-industrial-base", "prime-contractor", "dual-use", "sanctions"],
    wiki: "Committee on Foreign Investment in the United States",
    imageAlt: "Government review of a defense industry acquisition",
  },
  {
    slug: "non-proliferation",
    term: "Non-Proliferation",
    abbreviation: "NPT",
    category: "trade",
    tldr: "The global effort to stop more countries from getting nuclear, chemical, or biological weapons of mass destruction.",
    summary:
      "International agreements and norms designed to prevent the spread of nuclear, chemical, and biological weapons to more states or non-state actors.",
    definition: [
      "Non-proliferation refers to the body of international law, treaties, organizations, and norms designed to prevent weapons of mass destruction — primarily nuclear, but also chemical and biological — from spreading to additional states or to non-state actors. The cornerstone is the 1968 Treaty on the Non-Proliferation of Nuclear Weapons (NPT), under which the five recognized nuclear states agreed not to help others acquire nuclear weapons, while non-nuclear signatories agreed not to seek them.",
      "The regime extends beyond the NPT. The Chemical Weapons Convention (CWC) bans the production and use of chemical weapons. The Biological Weapons Convention (BWC) does the same for biological agents. Export controls, intelligence operations, sanctions, and occasionally military action (as with Iraq and Syria's chemical programs) are the tools used to enforce these norms when treaty mechanisms fail.",
      "Non-proliferation is perpetually under stress. North Korea withdrew from the NPT and tested nuclear weapons. Iran's program has remained a source of crisis for decades. The spread of dual-use technology — enrichment equipment, missile motors, biological research — makes policing the line between peaceful and weapons use a permanent challenge.",
    ],
    keyFacts: [
      { label: "Nuclear cornerstone", value: "NPT (1968)" },
      { label: "Chemical", value: "Chemical Weapons Convention (CWC)" },
      { label: "Biological", value: "Biological Weapons Convention (BWC)" },
      { label: "Tools", value: "Inspections, sanctions, export controls" },
    ],
    examples: [
      {
        title: "IAEA safeguards",
        description:
          "The International Atomic Energy Agency inspects nuclear facilities worldwide to verify that civilian programs are not diverted to weapons use.",
      },
      {
        title: "Iran nuclear deal (JCPOA)",
        description:
          "Diplomacy that constrained Iran's enrichment in exchange for sanctions relief — a contested but concrete non-proliferation instrument.",
      },
    ],
    related: ["nuclear-deterrence", "export-control", "sanctions", "arms-embargo"],
    wiki: "Treaty on the Non-Proliferation of Nuclear Weapons",
    imageAlt: "IAEA inspectors at a nuclear facility",
  },
  {
    slug: "multidomain-operations",
    term: "Multi-Domain Operations",
    abbreviation: "MDO",
    category: "doctrine",
    tldr: "Modern war fought simultaneously across land, sea, air, space, and cyber — all five domains linked together.",
    summary:
      "A military concept that integrates operations across all warfighting domains — land, sea, air, space, and cyber — simultaneously.",
    definition: [
      "Multi-Domain Operations (MDO) is the current U.S. Army and broader Western military concept for how to fight and win against a peer adversary who contests all warfighting domains simultaneously — land, sea, air, space, and cyberspace. Where older joint doctrine coordinated across domains sequentially, MDO demands that forces create and exploit fleeting windows of advantage across all domains at once.",
      "The concept emerged from the recognition that adversaries had developed the means to contest or deny access in every domain: long-range missiles threatening airbases, anti-satellite weapons degrading ISR, electronic warfare jamming data links, cyber intrusions disrupting command networks, and A2/AD bubbles limiting sea and air maneuver. MDO answers by attacking those systems simultaneously across all domains to create exploitable gaps.",
      "In practice, MDO requires unprecedented integration: cyber and space capabilities plugged into tactical operations, space-based sensors cueing land fires, electronic warfare supporting air maneuver, and special forces enabling all of it. This demands new doctrine, new equipment investments in cross-domain connectivity, and new training — and it elevates non-traditional domains like space and cyber to the same priority as traditional military branches.",
    ],
    keyFacts: [
      { label: "Domains", value: "Land, sea, air, space, cyber" },
      { label: "Goal", value: "Simultaneous multi-domain exploitation" },
      { label: "Against", value: "Peer adversaries contesting all domains" },
      { label: "Requires", value: "Deep C4ISR integration across domains" },
    ],
    examples: [
      {
        title: "Space-enabled land fires",
        description:
          "MDO envisions satellites cueing long-range artillery or missiles to strike time-sensitive targets detected from orbit.",
      },
      {
        title: "Cyber + EW + kinetic strikes",
        description:
          "Coordinated cyber attacks that degrade air defenses combined with electronic jamming and precision strikes open corridors for air operations.",
      },
    ],
    related: ["joint-operations", "c4isr", "network-centric-warfare", "anti-satellite-weapon"],
    wiki: "Multi-domain operations",
    imageAlt: "Graphic illustrating simultaneous operations across land, sea, air, space, and cyber",
  },
  {
    slug: "theater-missile-defense",
    term: "Theater Missile Defense",
    abbreviation: "TMD",
    category: "systems",
    tldr: "Missile defense for a specific region or combat zone — protecting troops and allies from ballistic and cruise missile attacks during a war.",
    summary:
      "Layered missile defense systems deployed in a combat theater to protect forces, allies, and territory from ballistic and cruise missile attack.",
    definition: [
      "Theater missile defense (TMD) covers the missile-defense systems deployed in a specific geographic theater — a region of military operations — to protect deployed forces, allied territory, and critical infrastructure from attack by ballistic and cruise missiles. It is distinct from homeland missile defense, which protects a nation's own cities from intercontinental attack.",
      "A TMD system is built in layers, each covering a different altitude and range band. The lowest tier intercepts missiles in the final seconds, close to the target (terminal defense). Higher tiers engage missiles earlier in flight at greater altitude (upper-tier defense), before they can disperse submunitions or overwhelm point defenses. Systems like the Patriot, THAAD, and Israel's Arrow form these layers.",
      "TMD has become increasingly important as ballistic and cruise missile arsenals spread to more states and non-state actors. Protecting a carrier strike group, a main operating base, or a capital city in wartime requires a functioning layered defense that can handle saturation attacks, decoys, and the short flight times of short-range missiles that may give only seconds of warning.",
    ],
    keyFacts: [
      { label: "Covers", value: "A regional theater, not homeland" },
      { label: "Layers", value: "Terminal + upper-tier defense" },
      { label: "Examples", value: "Patriot PAC-3, THAAD, Arrow" },
      { label: "Challenge", value: "Saturation, short warning times, decoys" },
    ],
    examples: [
      {
        title: "THAAD in South Korea",
        description:
          "THAAD batteries deployed to South Korea provide upper-tier defense against North Korean ballistic missiles threatening U.S. forces and Korean cities.",
      },
      {
        title: "Israel's multi-layer defense",
        description:
          "Iron Dome (short-range rockets), David's Sling (medium), and Arrow (ballistic) form a complete layered TMD architecture.",
      },
    ],
    related: ["surface-to-air-missile", "integrated-air-defense-system", "ballistic-missile", "ground-based-interceptor"],
    wiki: "Theater High Altitude Area Defense",
    imageAlt: "A THAAD theater missile defense battery",
  },
  {
    slug: "naval-task-force",
    term: "Naval Task Force",
    abbreviation: "",
    category: "platforms",
    tldr: "A group of warships assembled for a specific mission — from a single escort to a full carrier strike group.",
    summary:
      "A temporary grouping of naval vessels assembled from different types to accomplish a specific operational mission.",
    definition: [
      "A naval task force is a temporary grouping of warships from different classes assembled under a single commander to accomplish a specific mission. The task force concept allows navies to tailor forces to the job: an amphibious landing requires different ships from a submarine-hunting patrol or a carrier strike. Task forces are designated by number and organized into groups and units, allowing flexible command and control as the mission evolves.",
      "The most powerful example is the carrier strike group (CSG), built around an aircraft carrier and typically including destroyers for air and missile defense, a cruiser, attack submarines to screen for enemy submarines, and supply ships to sustain the force at sea. The CSG can project air power, strike land targets, control sea lanes, and conduct humanitarian operations — all from a self-contained mobile force.",
      "Naval task forces can form multinational coalitions, with allied ships operating under a common commander. This requires interoperability in communications, fuel and ammunition compatibility, and shared procedures — challenges that NATO, the Combined Maritime Forces in the Middle East, and other alliances have spent decades solving.",
    ],
    keyFacts: [
      { label: "What it is", value: "Mission-specific ship grouping" },
      { label: "Largest type", value: "Carrier strike group (CSG)" },
      { label: "Includes", value: "Carrier, destroyers, subs, supply ships" },
      { label: "Can be", value: "Multinational coalition" },
    ],
    examples: [
      {
        title: "U.S. Carrier Strike Group",
        description:
          "The CSG built around a Nimitz- or Ford-class carrier is the apex naval task force, combining strike, air defense, and anti-submarine capability.",
      },
      {
        title: "Combined Maritime Forces",
        description:
          "A multinational naval coalition in the Middle East that assembles task forces from over 30 nations to counter piracy and threats to shipping.",
      },
    ],
    related: ["aircraft-carrier", "destroyer", "submarine", "anti-ship-missile"],
    wiki: "Carrier strike group",
    imageAlt: "A carrier strike group underway at sea",
  },

  {
    slug: "arms-race",
    term: "Arms Race",
    abbreviation: "",
    category: "industry",
    tldr: "When rival countries keep building more and better weapons to outdo each other, each buildup triggering the next.",
    summary:
      "A competitive spiral in which rival states continually expand or improve their military forces in response to each other.",
    definition: [
      "An arms race is a competition in which rival states keep building up or improving their armed forces, each side's buildup prompting the other to respond in turn. Driven by fear and the desire not to fall behind, an arms race can become a self-reinforcing spiral: one country's new weapon makes its rival feel insecure, so the rival matches or exceeds it, prompting another round.",
      "Arms races can be quantitative (more ships, tanks, or warheads) or qualitative (better technology, like the race for stealth, hypersonics, or AI). They consume vast resources and can increase the risk of war, though some argue they can also stabilize a balance of power. Arms-control treaties are the main tool used to slow or cap them, and the dynamic is a central concept for understanding defense spending and strategic competition.",
    ],
    keyFacts: [
      { label: "What it is", value: "Mutual military buildup spiral" },
      { label: "Driven by", value: "Fear, insecurity, competition" },
      { label: "Forms", value: "Quantitative & qualitative" },
      { label: "Slowed by", value: "Arms-control treaties" },
    ],
    examples: [
      {
        title: "Cold War nuclear buildup",
        description:
          "Superpowers amassed huge nuclear arsenals in a decades-long race, later curbed by arms-control treaties.",
      },
      {
        title: "Emerging-tech races",
        description:
          "Competition now focuses on hypersonics, AI, and space — qualitative arms racing.",
      },
    ],
    related: ["nuclear-deterrence", "military-budget", "hypersonic-weapon"],
    wiki: "Arms race",
    imageAlt: "Symbols of an arms race buildup",
  },
  {
    slug: "military-budget",
    term: "Military Budget",
    abbreviation: "Defense Spending",
    category: "industry",
    tldr: "How much money a government spends on its armed forces — the fuel that drives the whole defense industry.",
    summary:
      "The funding a government allocates to its armed forces, shaping force size, modernization, and the defense industry.",
    definition: [
      "A military (or defense) budget is the amount of money a government dedicates to its armed forces in a given period. It pays for everything military: personnel salaries, operations and training, maintenance, and the purchase and development of new equipment. As the single biggest driver of demand in the defense world, the size and shape of military budgets determine what gets built, bought, and fielded.",
      "Budgets are often compared in absolute terms (total dollars) and as a share of a country's economy (percentage of GDP), with figures like NATO's 2% guideline used as benchmarks. How money is split matters as much as the total — between people, readiness, and new equipment ('modernization'). Defense companies, analysts, and allies watch budget trends closely, because shifts in spending ripple through procurement programs, industrial planning, and the strategic balance.",
    ],
    keyFacts: [
      { label: "Pays for", value: "People, operations, maintenance, kit" },
      { label: "Measured as", value: "Total spend & % of GDP" },
      { label: "Benchmark", value: "NATO 2% of GDP guideline" },
      { label: "Drives", value: "Demand across the defense industry" },
    ],
    examples: [
      {
        title: "% of GDP targets",
        description:
          "NATO members aim to spend at least 2% of GDP on defense, a closely watched political benchmark.",
      },
      {
        title: "Modernization vs. readiness",
        description:
          "How a budget splits between new equipment, training, and personnel shapes a force's future capability.",
      },
    ],
    related: ["defense-procurement", "defense-industrial-base", "arms-race", "life-cycle-cost"],
    wiki: "Military budget",
    imageAlt: "Defense spending and budget concept",
  },
];

// Quick lookup by slug for the detail page.
export const LEXICON_BY_SLUG = LEXICON.reduce((acc, entry) => {
  acc[entry.slug] = entry;
  return acc;
}, {});

export const CATEGORY_LABEL = LEXICON_CATEGORIES.reduce((acc, c) => {
  acc[c.value] = c.label;
  return acc;
}, {});
