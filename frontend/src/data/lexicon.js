// ── Defense Lexicon — static reference content ────────────────────────────────
// Each entry powers both the index card (term, abbreviation, category, summary)
// and its dedicated page (definition, examples, keyFacts, related, image).
//
// Images use Wikimedia Commons' stable "Special:FilePath" redirect, which the
// browser follows automatically to the actual upload.wikimedia.org file. If a
// file ever moves or fails, the UI shows a category fallback (see LexiconTerm).

export const LEXICON_CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "trade", label: "Trade & Policy" },
  { value: "missiles", label: "Missiles & Munitions" },
  { value: "systems", label: "Systems & Sensors" },
  { value: "platforms", label: "Platforms" },
  { value: "doctrine", label: "Doctrine & Concepts" },
];

const img = (filename) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=1200`;

export const LEXICON = [
  // ── Trade & Policy ─────────────────────────────────────────────────────────
  {
    slug: "offset",
    term: "Offset",
    abbreviation: "",
    category: "trade",
    summary:
      "Industrial or economic compensation a foreign supplier must provide to a buyer government as a condition of a major arms sale.",
    definition: [
      "An offset is a contractual obligation under which a foreign defense supplier agrees to deliver economic benefits to the purchasing country in return for winning a major weapons contract. Offsets are a standard feature of cross-border arms deals because governments rarely buy big-ticket systems — fighters, frigates, air-defense batteries — without demanding that some of the money flow back into their own economy.",
      "Offsets are usually split into two families. 'Direct' offsets are tied to the product being sold: local assembly of the aircraft, in-country production of components, or transfer of maintenance and repair capability. 'Indirect' offsets are unrelated to the weapon itself and can include investment in civilian industry, technology transfer, training, or export assistance for local firms. The required offset value is often expressed as a percentage of the contract — commonly 50% to 100%, and sometimes more.",
      "For the buyer, offsets are a tool of industrial policy: they build a domestic defense base, create skilled jobs, and reduce long-term dependence on foreign suppliers. For the seller, they are a cost of market access — the price of beating competitors in a global tender. Critics argue offsets inflate prices, are hard to verify, and can mask corruption, which is why bodies such as the EU and WTO scrutinize them and many countries publish formal offset guidelines.",
      "Offset obligations are typically tracked over many years through 'credits' that the supplier earns by completing agreed activities, with penalties if targets are missed.",
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
    related: ["export-control", "end-user-certificate", "fifth-generation-fighter"],
    image: img("Dassault Rafale, France - Air Force JP7666534.jpg"),
    imageAlt: "A Dassault Rafale fighter, the subject of major offset agreements",
  },
  {
    slug: "export-control",
    term: "Export Control",
    abbreviation: "ITAR / EAR",
    category: "trade",
    summary:
      "Government rules that regulate which military and dual-use goods, software, and technical data may be sold abroad, and to whom.",
    definition: [
      "Export control is the body of law a government uses to decide whether sensitive goods, technology, software, and even technical know-how may leave the country and reach a foreign buyer. The purpose is to stop weapons and militarily useful technology from reaching adversaries, sanctioned states, terrorist groups, or programs of concern such as nuclear or missile proliferation.",
      "In the United States — the world's largest arms exporter — two regimes dominate. The International Traffic in Arms Regulations (ITAR), administered by the State Department, govern items on the U.S. Munitions List: dedicated military hardware and the associated technical data. The Export Administration Regulations (EAR), run by the Commerce Department, cover 'dual-use' items that have both civilian and military applications, such as advanced electronics, sensors, and machine tools.",
      "Compliance is strict and the penalties are severe — multimillion-dollar fines, loss of export privileges, and criminal charges. A key concept is the 'deemed export': simply sharing controlled technical data with a foreign national, even inside your own country, can count as an export requiring a license. Companies therefore build elaborate compliance programs, classify every product, screen customers against denied-party lists, and obtain licenses before shipping.",
      "Export control is also a foreign-policy instrument. Allied nations coordinate through arrangements like the Wassenaar Arrangement and the Missile Technology Control Regime, while sanctions regimes can switch off exports to a country overnight. For defense firms, navigating export control is as important to closing a deal as the technology itself.",
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
        title: "Semiconductor export curbs",
        description:
          "Under the EAR, the U.S. has restricted exports of advanced chips and chip-making equipment to certain countries on national-security grounds — a dual-use control with global supply-chain impact.",
      },
    ],
    related: ["offset", "end-user-certificate", "stealth"],
    image: img("US Department of State official seal.svg"),
    imageAlt: "Seal of the U.S. State Department, which administers ITAR",
  },
  {
    slug: "end-user-certificate",
    term: "End-User Certificate",
    abbreviation: "EUC",
    category: "trade",
    summary:
      "An official document certifying who will ultimately own and use exported arms, used to prevent illegal diversion.",
    definition: [
      "An End-User Certificate (EUC) is a document, usually issued or endorsed by the importing government, that states who the final recipient of an arms shipment will be and promises that the goods will not be transferred onward without permission. It is one of the core safeguards in the legal arms trade, designed to keep weapons from being diverted to embargoed states, insurgents, or the black market.",
      "Before approving an export license, the exporting government typically requires an EUC naming the end user, describing the goods and quantities, stating the intended use, and committing the buyer not to re-export the items without the original supplier's consent. This 'no re-transfer' clause is central: it lets the original seller keep control over where its weapons end up long after the sale.",
      "EUCs matter because diversion is a persistent problem. Forged or fraudulent certificates have repeatedly been used to route weapons to sanctioned destinations through a compliant third country acting as a front. Investigators and NGOs treat suspicious EUCs as a red flag for trafficking, and reforms have pushed for harder-to-forge documents, verification visits, and post-shipment checks to confirm the goods actually arrived where promised.",
      "Within multilateral frameworks such as the Arms Trade Treaty, robust end-use documentation and post-delivery monitoring are considered best practice. For exporters, a clean, verifiable EUC is both a legal requirement and a reputational shield against accusations of fueling conflict.",
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
    related: ["export-control", "offset"],
    image: img("Various Grenades.jpg"),
    imageAlt: "Munitions of the kind subject to end-user certification",
  },

  // ── Missiles & Munitions ───────────────────────────────────────────────────
  {
    slug: "ballistic-missile",
    term: "Ballistic Missile",
    abbreviation: "",
    category: "missiles",
    summary:
      "A rocket-powered weapon that follows a high, arcing free-fall trajectory to deliver a warhead over long distances.",
    definition: [
      "A ballistic missile is a weapon that is powered by rocket engines only during the first, relatively brief 'boost' phase of flight. After the engines cut out, the missile coasts on a high, arcing trajectory shaped almost entirely by gravity and momentum — like a thrown stone, but on a planetary scale — before its warhead re-enters the atmosphere and falls onto the target. This unpowered, predictable arc is what distinguishes it from a cruise missile, which flies under power the whole way.",
      "Ballistic missiles are classified by range: short-range (SRBM, under 1,000 km), medium-range (MRBM), intermediate-range (IRBM), and intercontinental ballistic missiles (ICBM, over 5,500 km). The longest-range types leave the atmosphere entirely, arcing through space before plunging back down at hypersonic speeds, which makes them extremely hard to intercept.",
      "Their strategic importance comes from the warheads they carry. ICBMs are the backbone of nuclear deterrence, and some carry Multiple Independently targetable Re-entry Vehicles (MIRVs) — several warheads on one missile, each aimed at a different target. They can be launched from hardened underground silos, road-mobile launchers, or submarines (SLBMs), the last being prized for their survivability and second-strike capability.",
      "Because their trajectory is largely predictable once boost ends, ballistic missiles are the target of dedicated missile-defense systems that try to intercept them in flight. But their speed, the brief warning time, and countermeasures such as decoys make reliable defense one of the hardest problems in modern warfare.",
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
          "SRBMs such as Russia's Iskander have been used in recent conflicts to strike fixed targets hundreds of kilometers away, demonstrating the difficulty of intercepting fast ballistic threats.",
      },
    ],
    related: ["cruise-missile", "hypersonic-weapon", "surface-to-air-missile", "integrated-air-defense-system"],
    image: img("Minuteman III MIRV path.svg"),
    imageAlt: "Diagram of an intercontinental ballistic missile trajectory and MIRV path",
  },
  {
    slug: "cruise-missile",
    term: "Cruise Missile",
    abbreviation: "",
    category: "missiles",
    summary:
      "A guided missile that flies under continuous power like a small aircraft, hugging the terrain to strike with precision.",
    definition: [
      "A cruise missile is essentially a small, pilotless, one-way aircraft that carries a warhead. Unlike a ballistic missile, it stays powered throughout its flight — typically by a small jet engine — and uses wings and control surfaces to fly a level, often low-altitude path to its target. This lets it fly under radar coverage, follow the contours of the land, and even change course around defenses.",
      "Guidance is what makes the modern cruise missile so effective. Early versions used inertial navigation and terrain-contour matching (TERCOM), comparing the ground below against a stored map. Today they fuse GPS/inertial navigation with scene-matching cameras for pinpoint terminal accuracy, allowing a strike within a few meters of an aim point from hundreds or even thousands of kilometers away.",
      "Cruise missiles come in subsonic and supersonic forms and can be launched from ships, submarines, aircraft, and ground vehicles. Their advantages are precision, range, and the ability to strike heavily defended targets without risking a crew. Their main drawback compared with ballistic missiles is speed: a subsonic cruise missile flies far slower, giving defenders more time to detect and engage it — though its low, terrain-hugging flight path makes detection hard in the first place.",
      "They occupy a central role in modern strike warfare, used to take out air defenses, command centers, and infrastructure in the opening hours of a campaign, and increasingly to deliver long-range firepower in regional conflicts.",
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
    related: ["ballistic-missile", "hypersonic-weapon", "stealth"],
    image: img("Tomahawk Block IV cruise missile.jpg"),
    imageAlt: "A Tomahawk cruise missile in flight",
  },
  {
    slug: "air-to-air-missile",
    term: "Air-to-Air Missile",
    abbreviation: "AAM",
    category: "missiles",
    summary:
      "A guided missile fired by an aircraft to destroy another aircraft, divided into short-range and beyond-visual-range types.",
    definition: [
      "An air-to-air missile (AAM) is a guided weapon launched from one aircraft to destroy another. It is the primary tool of modern aerial combat, having largely replaced the gun as the way fighters kill each other. AAMs are broadly split into two classes defined by how far and how they engage: short-range, within-visual-range missiles and long-range, beyond-visual-range (BVR) missiles.",
      "Short-range missiles, such as heat-seekers, use infrared guidance to home on the hot exhaust of an enemy engine. They are highly agile, optimized for the close-in 'dogfight', and modern versions can be cued by the pilot's helmet sight to lock onto targets far off the nose. Their range is limited, but within it they are deadly.",
      "Beyond-visual-range missiles use radar guidance to engage targets dozens of kilometers away, often before the enemy is even visible. Many are 'active radar homing': the missile carries its own radar in the nose, so after launch the shooter can turn away while the weapon finds the target itself ('fire-and-forget'). This lets a fighter strike first from stand-off distance, which is why BVR capability is decisive in air superiority.",
      "Key performance factors include range, speed, seeker sensitivity, resistance to countermeasures like flares and jamming, and 'no-escape zone' — the region where a target cannot outrun the missile. The combination of a stealthy aircraft, a powerful radar, and a long-range AAM defines the modern air-combat edge, allowing a pilot to detect, identify, and destroy an opponent before being seen.",
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
    image: img("F-22 Raptor fires AIM-120 AMRAAM.jpg"),
    imageAlt: "A fighter launching an air-to-air missile",
  },
  {
    slug: "surface-to-air-missile",
    term: "Surface-to-Air Missile",
    abbreviation: "SAM",
    category: "missiles",
    summary:
      "A ground- or ship-launched missile designed to shoot down aircraft, missiles, and drones.",
    definition: [
      "A surface-to-air missile (SAM) is a missile fired from the ground or a ship to destroy targets in the air — aircraft, helicopters, cruise missiles, ballistic missiles, and drones. SAMs are the heart of air defense, the systems a country uses to deny its skies to an enemy. They range from a soldier's shoulder-launched weapon to vast, layered networks defending whole regions.",
      "SAMs are usually grouped by the altitude and distance they cover. Short-range, man-portable air-defense systems (MANPADS) protect troops from low-flying threats using infrared homing. Medium- and long-range systems use large radars and powerful missiles to engage high-flying aircraft and incoming missiles at distances of tens to hundreds of kilometers. The longest-range strategic systems can reach targets more than 100 km away and form an umbrella over key cities and bases.",
      "A SAM system is far more than the missile itself. It is a chain of sensors and decisions: search radars detect a target, tracking radars or other sensors refine its position, a command center decides to engage, and the missile is guided to interception — by radar command, semi-active homing, or its own active seeker. Networking many such systems together produces an Integrated Air Defense System (IADS).",
      "Because SAMs make airspace dangerous, much of modern air warfare is about defeating them — through stealth, electronic jamming, decoys, and dedicated 'Suppression of Enemy Air Defenses' (SEAD) missions that hunt and destroy radars and launchers before strike aircraft go in.",
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
    image: img("Patriot missile launch b.jpg"),
    imageAlt: "A surface-to-air missile launching from a ground battery",
  },
  {
    slug: "hypersonic-weapon",
    term: "Hypersonic Weapon",
    abbreviation: "",
    category: "missiles",
    summary:
      "A weapon that flies faster than Mach 5 while maneuvering, blending the speed of ballistic missiles with the agility of cruise missiles.",
    definition: [
      "A hypersonic weapon travels at more than five times the speed of sound (Mach 5, roughly 6,000 km/h) while remaining maneuverable for much of its flight. Speed alone is not new — ballistic missile warheads already re-enter at hypersonic speeds. What defines this new class of weapon is the combination of extreme speed with the ability to change course and fly at unpredictable altitudes, which makes them very hard to track and intercept.",
      "There are two main types. A hypersonic glide vehicle (HGV) is boosted high by a rocket, then released to glide and skip along the upper atmosphere toward its target, maneuvering the whole way instead of following a predictable ballistic arc. A hypersonic cruise missile is powered throughout by an advanced air-breathing engine called a scramjet, flying fast and low like a conventional cruise missile but vastly quicker.",
      "Their military appeal is straightforward: they compress the time defenders have to react, can slip around existing missile-defense systems designed for predictable ballistic threats, and can strike high-value targets at long range with little warning. This has sparked an arms race, with several major powers fielding or developing such weapons and others racing to build sensors and interceptors that can counter them.",
      "The engineering is brutally hard. Sustained hypersonic flight generates enormous heat and stress, demanding exotic materials, precise guidance through plasma that can block signals, and propulsion that works at extreme speeds. These challenges, and the cost, are why hypersonics remain at the cutting edge of defense technology.",
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
    image: img("Boeing X-51A Waverider.jpg"),
    imageAlt: "An experimental hypersonic scramjet vehicle",
  },

  // ── Systems & Sensors ──────────────────────────────────────────────────────
  {
    slug: "stealth",
    term: "Stealth",
    abbreviation: "Low Observable",
    category: "systems",
    summary:
      "A set of technologies that reduce how detectable a platform is to radar, infrared, and other sensors.",
    definition: [
      "Stealth — more formally 'low observable' technology — is the art of making a military platform hard to detect, track, and target. It does not make something invisible; it shrinks the distance and reliability at which sensors can find it, buying time and tactical surprise. A stealth aircraft might be detected only when it is far closer than a conventional one, by which point it may already have struck.",
      "The biggest focus is radar. Radar works by bouncing radio waves off a target and listening for the echo, so stealth design minimizes that echo — the 'radar cross-section'. This is done two ways: shaping and materials. Careful shaping uses flat, angled surfaces and aligned edges to deflect radar energy away from the sender rather than back to it. Radar-absorbent materials and coatings soak up some of the energy that does hit the airframe. Weapons and fuel are carried internally so they don't create bright reflections.",
      "Stealth also addresses other signatures: infrared (hiding or cooling hot engine exhaust), visual, acoustic, and the platform's own radio emissions, which can give it away to passive sensors. A truly stealthy platform manages all of these together.",
      "The payoff is enormous. Stealth lets aircraft penetrate dense air defenses, strike first, and survive where conventional aircraft could not. It is the defining feature of fifth-generation fighters and modern bombers. But it is costly, demands meticulous maintenance of coatings and surfaces, and is the subject of an unending race against ever-more-sensitive radars and networked sensors designed to find low-observable targets.",
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
    related: ["fifth-generation-fighter", "electronic-warfare", "surface-to-air-missile", "integrated-air-defense-system"],
    image: img("F-117 Nighthawk Front.jpg"),
    imageAlt: "A faceted stealth aircraft designed to evade radar",
  },
  {
    slug: "c4isr",
    term: "C4ISR",
    abbreviation: "C4ISR",
    category: "systems",
    summary:
      "The integrated network of Command, Control, Communications, Computers, Intelligence, Surveillance and Reconnaissance that links a force together.",
    definition: [
      "C4ISR stands for Command, Control, Communications, Computers, Intelligence, Surveillance, and Reconnaissance. It is the umbrella term for all the systems that let a military sense the battlefield, make decisions, and act on them — the 'nervous system' that ties sensors, commanders, and weapons into a single fighting organism. Modern warfare is won less by individual platforms than by how well they are connected, and C4ISR is what connects them.",
      "Each piece plays a role. Intelligence, Surveillance, and Reconnaissance (ISR) gather information — satellites, radar aircraft, drones, ground sensors, and signals interception build a picture of where the enemy is and what they are doing. Communications and Computers move and process that information securely and fast. Command and Control (C2) is the human and software layer where commanders interpret the picture, decide, and issue orders.",
      "The aim is to shorten the 'decision cycle': sense a target, understand it, decide to engage, and strike before the enemy can react. When C4ISR works, a sensor on one platform can cue a weapon on another — a drone spotting a target that a ship's missile then destroys. This 'sensor-to-shooter' integration multiplies the effectiveness of every unit.",
      "C4ISR is also a major industrial market in its own right, spanning satellites, radios, data links, battle-management software, and the cybersecurity to protect it all. Because the network is so central, it is a prime target: jamming, cyber-attack, and anti-satellite weapons all aim to blind or confuse an opponent's C4ISR, which is why resilience and redundancy are now design priorities.",
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
    related: ["electronic-warfare", "integrated-air-defense-system", "male-uav"],
    image: img("E-3 Sentry takes off.jpg"),
    imageAlt: "An airborne early-warning and control aircraft, a key C4ISR node",
  },
  {
    slug: "electronic-warfare",
    term: "Electronic Warfare",
    abbreviation: "EW",
    category: "systems",
    summary:
      "Military use of the electromagnetic spectrum to detect, deceive, jam, or protect against an enemy's radars and communications.",
    definition: [
      "Electronic warfare (EW) is the battle for control of the electromagnetic spectrum — the radio waves, radar pulses, and signals that modern militaries depend on to see, talk, and fight. Whoever dominates the spectrum can find the enemy while blinding and deafening them. EW is invisible but decisive, shaping the outcome of air, sea, and land operations.",
      "It is traditionally divided into three parts. Electronic Attack uses energy to degrade the enemy — jamming radars and radios with noise, sending false signals to deceive them, or even burning out electronics. Electronic Protection hardens friendly systems against these attacks, through techniques like frequency-hopping radios and anti-jam GPS. Electronic Support is the listening side: detecting, identifying, and locating enemy emissions to build intelligence and warn of threats.",
      "In practice EW is everywhere. A fighter's radar-warning receiver tells the pilot a missile's radar has locked on; a jamming pod blinds that radar; chaff and decoys spoof the incoming missile. Specialized aircraft escort strike packages to suppress enemy air defenses, and ground convoys carry jammers to defeat radio-controlled bombs. Navies use EW to confuse anti-ship missiles.",
      "Because almost every weapon now relies on the spectrum — GPS guidance, data links, radar seekers, communications — EW has become central to warfare rather than a niche specialty. Recent conflicts have shown intense electronic duels: jamming of drones, spoofing of satellite navigation, and rapid adaptation as each side counters the other. Mastery of the spectrum is increasingly a precondition for everything else on the battlefield.",
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
    related: ["c4isr", "stealth", "surface-to-air-missile", "integrated-air-defense-system"],
    image: img("EA-18G Growler of VAQ-141 in flight 2016.jpg"),
    imageAlt: "An electronic-attack aircraft equipped with jamming pods",
  },
  {
    slug: "integrated-air-defense-system",
    term: "Integrated Air Defense System",
    abbreviation: "IADS",
    category: "systems",
    summary:
      "A networked combination of radars, missiles, guns, and command centers that defends a region's airspace as one system.",
    definition: [
      "An Integrated Air Defense System (IADS) is what you get when many individual air-defense pieces — radars, surface-to-air missile batteries, anti-aircraft guns, fighter aircraft, and command posts — are knitted together into a single, coordinated whole. Rather than each unit fighting alone, an IADS shares a common air picture and directs the best weapon against each threat, defending a country or theater as one organism.",
      "The structure is layered. Long-range search radars detect incoming aircraft and missiles far out, feeding their tracks into command-and-control centers. There, controllers decide how to respond and assign engagements to the appropriate layer of defense: long-range SAMs for distant high-altitude threats, medium- and short-range systems closer in, and guns or man-portable missiles for anything that leaks through. Fighters can be vectored to intercept threats beyond missile range. The layers overlap so that a target slipping past one is caught by the next.",
      "The power of an IADS comes from integration. Networked radars are harder to fool and provide redundancy if one is destroyed; coordinated batteries avoid wasting missiles on the same target; and centralized control lets defenders concentrate fire where it matters. A dense, modern IADS can make airspace lethal and is one of the toughest obstacles an air force can face.",
      "That is exactly why so much of air warfare is devoted to defeating an IADS — through stealth, electronic jamming, decoys, cruise missiles, and 'Suppression of Enemy Air Defenses' missions that hunt the radars and command nodes to unravel the network from within.",
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
    related: ["surface-to-air-missile", "electronic-warfare", "stealth", "c4isr"],
    image: img("S-400 Triumf SAM (3).jpg"),
    imageAlt: "A long-range surface-to-air missile system within an integrated air defense network",
  },

  // ── Platforms ──────────────────────────────────────────────────────────────
  {
    slug: "fifth-generation-fighter",
    term: "Fifth-Generation Fighter",
    abbreviation: "5th-gen",
    category: "platforms",
    summary:
      "The latest class of combat aircraft combining stealth, sensor fusion, and networking into a single survivable platform.",
    definition: [
      "A fifth-generation fighter is the most advanced current class of combat aircraft, defined not by a single feature but by a blend of them working together: low-observable 'stealth' design, advanced sensors whose data is fused into one clear picture for the pilot, the ability to share that picture across a networked force, and high performance including, in some cases, supersonic cruise without afterburner ('supercruise').",
      "What sets a fifth-generation fighter apart from earlier 'fourth-generation' jets is integration. A modern radar, infrared sensors, and electronic-warfare receivers feed a central computer that fuses everything into a single display, so the pilot manages tactics rather than juggling raw sensor feeds. Stealth lets the aircraft approach undetected and shoot first. Internal weapons bays preserve that stealth by hiding missiles and bombs. Secure data links let a flight of fighters — and other platforms — act as a connected team, one aircraft passing targets to another.",
      "These capabilities make fifth-generation fighters formidable in contested airspace, able to penetrate dense air defenses, gather intelligence, and act as airborne command nodes for less stealthy aircraft. They are also extraordinarily expensive to develop, buy, and maintain, which is why only a handful of nations field them and why programs are major instruments of industrial and alliance policy, frequently bundled with offsets and tightly governed by export controls.",
      "The class is now mature enough that attention is turning to 'sixth-generation' concepts — optional crewing, teaming with drones ('loyal wingmen'), and even greater networking — but the fifth-generation fighter remains the benchmark of air power today.",
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
    related: ["stealth", "air-to-air-missile", "beyond-visual-range", "offset"],
    image: img("Lockheed Martin F-22A Raptor JSOH.jpg"),
    imageAlt: "An F-22 Raptor, a fifth-generation stealth fighter",
  },
  {
    slug: "male-uav",
    term: "MALE UAV",
    abbreviation: "MALE UAV",
    category: "platforms",
    summary:
      "A Medium-Altitude, Long-Endurance unmanned aircraft used for persistent surveillance and precision strike.",
    definition: [
      "A MALE UAV — Medium-Altitude, Long-Endurance Unmanned Aerial Vehicle — is a remotely piloted aircraft built to loiter over an area for many hours, even a full day, at moderate altitude. The category is defined by stamina rather than speed: where a fighter screams over a target in seconds, a MALE drone circles patiently, watching, until it is needed. This persistence has made such drones one of the most influential weapons of recent decades.",
      "Their core job is intelligence, surveillance, and reconnaissance (ISR). Carrying high-resolution cameras, infrared sensors, and radar, a MALE UAV can monitor a road, building, or border for hours and relay live video to commanders far away via satellite link. Many also carry weapons, making them 'hunter-killers' that can find a target and strike it themselves with guided missiles or bombs — collapsing the time between detection and engagement.",
      "Their appeal is clear: no crew is put at risk, they are far cheaper to buy and operate than manned aircraft, and their endurance gives commanders a persistent eye in the sky. This has driven explosive proliferation, with armed and unarmed MALE drones now operated by dozens of countries and increasingly central to conflicts large and small.",
      "They have limits. Traditional MALE UAVs are relatively slow and not stealthy, making them vulnerable to modern air defenses and to jamming of their control links, which has pushed designers toward stealthier shapes, hardened communications, and greater onboard autonomy. Even so, the combination of endurance, ISR, and strike at low cost has reshaped how wars are fought.",
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
    related: ["c4isr", "electronic-warfare", "export-control"],
    image: img("MQ-9 Reaper in flight (2007).jpg"),
    imageAlt: "An MQ-9 Reaper medium-altitude long-endurance drone in flight",
  },

  // ── Doctrine & Concepts ────────────────────────────────────────────────────
  {
    slug: "beyond-visual-range",
    term: "Beyond Visual Range",
    abbreviation: "BVR",
    category: "doctrine",
    summary:
      "Air combat conducted at distances where the enemy cannot yet be seen, relying on radar and long-range missiles.",
    definition: [
      "Beyond Visual Range (BVR) describes air combat that takes place at distances so great the enemy aircraft cannot be seen with the naked eye — often tens of kilometers away. Instead of the close, turning 'dogfights' of earlier eras, BVR combat is fought through sensors and long-range missiles: a pilot detects, identifies, and engages an opponent on radar before the two aircraft ever come within sight of each other.",
      "BVR is made possible by three things working together: a powerful radar (or other long-range sensor) to find and track the target, a reliable way to confirm the target is hostile, and a missile with the range and guidance to reach it. Modern active-radar 'fire-and-forget' missiles are central, letting a fighter shoot from stand-off range and then maneuver away while the missile homes in on its own.",
      "The advantage of fighting at range is enormous: striking first, ideally before the enemy even knows you are there, often decides the engagement. This is why BVR capability — paired with stealth, which delays the moment you are detected — defines modern air superiority. A stealthy fighter with a good radar and a long-range missile can win without ever entering a visual fight.",
      "BVR is not absolute, though. Rules of engagement often demand positive identification before firing, which can force aircraft closer; electronic warfare can spoof radars and missiles; and if a long-range shot misses, combat can still collapse into a close-in fight, which is why fighters retain short-range missiles and guns. BVR and within-visual-range skills therefore remain complementary halves of air combat.",
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
    related: ["air-to-air-missile", "fifth-generation-fighter", "stealth", "electronic-warfare"],
    image: img("F-22 Raptor fires AIM-120 AMRAAM.jpg"),
    imageAlt: "A fighter firing a beyond-visual-range air-to-air missile",
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
