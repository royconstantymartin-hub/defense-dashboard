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
