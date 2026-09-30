Warning: truncated output (original token count: 311366)
... 196886 bytes omitted ...

# Expanded seed data for Defense Dashboard
from datetime import datetime, timezone, timedelta
import random
from data.researched_additions import COMPANIES as RESEARCHED_COMPANIES, DEALS as RESEARCHED_DEALS

# 250+ Defense Companies
DEFENSE_COMPANIES = [
    # === USA - Major Primes ===
    {"name": "Lockheed Martin", "ticker": "LMT", "country": "USA", "market_cap": 134.5, "stock_price": 512.34, "change_percent": 1.23, "revenue": 67.6, "employees": 116000, "specializations": ["Aircraft", "Missiles", "Space", "Cyber"], "founded_year": 1995, "headquarters": "Bethesda, MD, USA", "website": "lockheedmartin.com", "description": "Lockheed Martin is the world's largest defense contractor by revenue. Its flagship programs include the F-35 Lightning II (world's most advanced stealth fighter, 900+ delivered to 17 nations), F-22 Raptor, C-130J transport, and the Trident II D5 submarine-launched ballistic missile. Its Missiles & Fire Control division produces Hellfire, Javelin (co-developed with Raytheon), PAC-3 interceptor, and HIMARS rocket artillery. The Space division operates GPS III satellites, Orion crew capsule, and classified NRO reconnaissance spacecraft. Lockheed is the anchor of US and NATO air power for the next 30 years."},
    {"name": "Raytheon Technologies", "ticker": "RTX", "country": "USA", "market_cap": 147.2, "stock_price": 108.76, "change_percent": -0.45, "revenue": 68.9, "employees": 180000, "specializations": ["Missiles", "Defense Electronics", "Cyber", "Engines"], "founded_year": 1922, "headquarters": "Arlington, VA, USA", "website": "rtx.com", "description": "RTX (Raytheon Technologies) is the world's second-largest defense contractor, formed from the 2020 merger of Raytheon and United Technologies. Its Raytheon division produces Patriot/PAC-3 air defense, Tomahawk cruise missile, AIM-9X/AIM-120 air-to-air missiles, and StormBreaker smart bomb. Collins Aerospace provides avionics and aircraft systems. Pratt & Whitney produces the F135 engine powering the F-35 and commercial jet engines. RTX is the world's leading manufacturer of air defense systems and guided munitions."},
    {"name": "Northrop Grumman", "ticker": "NOC", "country": "USA", "market_cap": 76.3, "stock_price": 502.18, "change_percent": 2.15, "revenue": 39.3, "employees": 95000, "specializations": ["Aerospace", "Cyber", "Space", "Autonomous"], "founded_year": 1939, "headquarters": "Falls Church, VA, USA", "website": "northropgrumman.com", "description": "Northrop Grumman is the US's preeminent stealth and space defense company. Its crown jewel programs include the B-21 Raider (USAF's new stealth bomber), B-2 Spirit stealth bomber, E-2D Hawkeye carrier airborne early warning aircraft, and the Ground-Based Strategic Deterrent (GBSD) intercontinental ballistic missile program. Northrop's space division builds the James Webb Space Telescope and classified reconnaissance satellites. Its Mission Systems segment develops radars, electronic warfare, and command-and-control systems including AESA radars for multiple US aircraft."},
    {"name": "General Dynamics", "ticker": "GD", "country": "USA", "market_cap": 82.1, "stock_price": 298.45, "change_percent": 0.34, "revenue": 42.3, "employees": 106500, "specializations": ["Naval", "Land Systems", "IT", "Business Jets"], "founded_year": 1952, "headquarters": "Reston, VA, USA", "website": "gd.com", "description": "General Dynamics is a diversified defense and aerospace company spanning four core businesses. Its Marine Systems division builds Virginia-class nuclear attack submarines and Arleigh Burke destroyers — the backbone of US naval power. Land Systems produces the M1A2 Abrams main battle tank (10,000+ in US/allied service), Stryker infantry fighting vehicle, and AMPV personnel carrier. Gulfstream provides high-end business jets. Its IT division is one of the US government's largest IT services providers. GD underpins both US land and undersea warfare capacity."},
    {"name": "Boeing Defense", "ticker": "BA", "country": "USA", "market_cap": 128.5, "stock_price": 215.67, "change_percent": -1.12, "revenue": 26.5, "employees": 140000, "specializations": ["Aircraft", "Rotorcraft", "Space", "Missiles"], "founded_year": 1916, "headquarters": "Arlington, VA, USA", "website": "boeing.com", "description": "Boeing's defense division is one of America's most storied aerospace companies, producing the F/A-18 Super Hornet carrier fighter, F-15EX Eagle II, AH-64 Apache attack helicopter, CH-47 Chinook heavy lift helicopter, KC-46 Pegasus aerial refueling tanker, and P-8 Poseidon maritime patrol aircraft. Boeing is also the prime for the Space Launch System (SLS) for NASA's Artemis moon program. The defense business has faced challenges including fixed-price development contracts on KC-46 and T-7A Red Hawk; nonetheless it remains a critical supplier across all US military branches."},
    {"name": "L3Harris Technologies", "ticker": "LHX", "country": "USA", "market_cap": 45.6, "stock_price": 238.90, "change_percent": -0.67, "revenue": 18.2, "employees": 47000, "specializations": ["Communications", "Electronics", "Space", "ISR"], "founded_year": 2019, "headquarters": "Melbourne, FL, USA", "website": "l3harris.com", "description": "L3Harris Technologies was formed from the 2019 merger of L3 Technologies and Harris Corporation, creating the sixth-largest US defense company. Its core capabilities span tactical radio systems (employed by every US military branch and 100+ allies), space payloads and sensors, ISR aircraft modifications, electronic warfare systems, and night vision / electro-optical devices. L3Harris is the world's leading producer of tactical communications radios and a critical supplier of classified space intelligence systems. Its Aerojet Rocketdyne acquisition (pending) would add rocket propulsion to its portfolio."},
    {"name": "Huntington Ingalls", "ticker": "HII", "country": "USA", "market_cap": 12.8, "stock_price": 285.43, "change_percent": 0.89, "revenue": 11.5, "employees": 44000, "specializations": ["Naval", "Shipbuilding", "Nuclear"], "founded_year": 2011, "headquarters": "Newport News, VA, USA", "website": "huntingtoningalls.com", "description": "Huntington Ingalls Industries (HII) is the United States' largest military shipbuilder and the sole manufacturer of nuclear aircraft carriers. Its Newport News Shipbuilding division produces Gerald R. Ford-class aircraft carriers and Virginia-class nuclear submarines. Ingalls Shipbuilding in Mississippi constructs Arleigh Burke destroyers, Amphibious assault ships, and Coast Guard cutters. HII also provides nuclear power consulting and technical services through Mission Technologies. With no commercial competitors in nuclear carrier construction, HII is a strategic monopoly critical to US naval dominance."},
    {"name": "Leidos Holdings", "ticker": "LDOS", "country": "USA", "market_cap": 18.9, "stock_price": 142.56, "change_percent": 1.45, "revenue": 15.4, "employees": 47000, "specializations": ["IT", "Cyber", "Health", "Intelligence"], "founded_year": 2013, "headquarters": "Reston, VA, USA", "website": "leidos.com", "description": "Leidos is a leading US government technology and national security solutions company, spun out of SAIC in 2013. It holds some of the largest US federal IT contracts, including the Intelligence Community IT Enterprise (ICITE) for the NSA and CIA and the Defense Health Agency IT modernization. Key defense programs include the JTRS Next Generation radio, torpedo defense systems, and numerous classified intelligence programs. Leidos's 2016 acquisition of Lockheed Martin's IT services division made it a top-5 government IT contractor with deep DoD and intel community relationships."},
    {"name": "SAIC", "ticker": "SAIC", "country": "USA", "market_cap": 6.2, "stock_price": 118.90, "change_percent": 0.23, "revenue": 7.4, "employees": 24000, "specializations": ["IT", "Engineering", "Integration"], "founded_year": 1969, "headquarters": "Reston, VA, USA", "website": "saic.com", "description": "Science Applications International Corporation (SAIC) is a major US government IT and services contractor with deep roots in the defense and intelligence community. Originally founded in 1969 by scientists with nuclear weapons expertise, SAIC today focuses on IT modernization, C4ISR systems integration, cybersecurity, and cloud services for US federal agencies. It holds major contracts for the US Army's enterprise IT systems, Navy IT infrastructure, and classified intelligence programs. SAIC split from Leidos (then-SAIC) in 2013 to create two separate focused entities."},
    {"name": "Booz Allen Hamilton", "ticker": "BAH", "country": "USA", "market_cap": 19.5, "stock_price": 145.23, "change_percent": 1.67, "revenue": 9.3, "employees": 33000, "specializations": ["Consulting", "Cyber", "AI", "Analytics"], "founded_year": 1914, "headquarters": "McLean, VA, USA", "website": "boozallen.com", "description": "Booz Allen Hamilton is one of the world's largest management and technology consulting firms, with the majority of its revenue from US government defense and intelligence contracts. Its classified work spans NSA, CIA, DIA, and military commands, with particular depth in cyber operations, AI/ML for national security, and strategic advisory to combatant commands. Edward Snowden was a Booz Allen contractor at the NSA — illustrating the depth of its intelligence community integration. BAH has increasingly positioned itself as a defense AI leader through its Dark Labs cyber offensive capability and AI-driven mission engineering work."},
    {"name": "General Atomics", "ticker": "GA-PRIV", "country": "USA", "market_cap": 8.5, "stock_price": 0, "change_percent": 0, "revenue": 3.8, "employees": 15000, "specializations": ["Nuclear", "Electromagnetic", "Directed Energy"], "founded_year": 1955, "headquarters": "San Diego, CA, USA", "website": "ga.com", "funding_stage": "Private — Neal Blue family", "description": "General Atomics is a privately held American defense technology conglomerate best known for the MQ-1 Predator and MQ-9 Reaper unmanned aerial systems, which defined the modern armed reconnaissance drone category. Beyond UAVs, GA operates a nuclear energy division (TRIGA research reactors), the Electromagnetic Systems group (railgun R&D, electromagnetic aircraft launch EALS for Ford-class carriers), and directed energy programs. GA is a foundational supplier to the US Air Force, Navy, and intelligence community."},
    {"name": "Textron", "ticker": "TXT", "country": "USA", "market_cap": 15.2, "stock_price": 89.45, "change_percent": 0.56, "revenue": 13.7, "employees": 33000, "specializations": ["Aircraft", "Helicopters", "Land Systems"], "founded_year": 1923, "headquarters": "Providence, RI, USA", "website": "textron.com", "description": "Textron is a multi-industry company with significant defense segments. Bell Helicopter produces the V-22 Osprey tiltrotor aircraft, AH-1Z Viper attack helicopter, and the forthcoming V-280 Valor for the US Army's Future Long-Range Assault Aircraft (FLRAA) program — the most significant US rotorcraft competition in decades. Textron Systems produces the Shadow tactical UAV, Aerosonde small UAS, RIPSAW robotic combat vehicle, and Cottonmouth unmanned ground vehicle. Textron Aviation provides Beechcraft King Air and Cessna military trainers."},
    {"name": "Kratos Defense", "ticker": "KTOS", "country": "USA", "market_cap": 12.5, "stock_price": 85.0, "change_percent": 3.21, "revenue": 1.2, "employees": 4300, "specializations": ["UAV", "Targets", "Space"], "founded_year": 1994, "headquarters": "San Diego, CA, USA", "website": "kratosdefense.com", "description": "Kratos Defense has positioned itself as the leading US manufacturer of low-cost, attritable (expendable) unmanned aerial systems. Its XQ-58A Valkyrie autonomous loyal wingman is the most mature US attritable combat drone, having flown with F-22 and F-35 in USAF experiments. Kratos also produces the MAKO supersonic target drone and UTAP-22 Mako loyal wingman. Beyond drones, Kratos develops ground-based tactical radars, satellite ground systems, and hypersonic test vehicles. Its affordable autonomy model is a direct contrast to expensive traditional combat aircraft."},
    {"name": "Mercury Systems", "ticker": "MRCY", "country": "USA", "market_cap": 2.8, "stock_price": 45.67, "change_percent": -2.34, "revenue": 1.0, "employees": 2400, "specializations": ["Electronics", "Processing", "RF"], "founded_year": 1981, "headquarters": "Andover, MA, USA", "website": "mrcy.com", "description": "Mercury Systems is a specialized defense electronics company providing ruggedized processing modules, RF/microwave assemblies, and electronic warfare subsystems for US defense programs. It serves as a critical supply chain layer between commercial semiconductor foundries and the classified defense programs of prime contractors. Mercury's products are embedded in over 300 defense programs including the F-35 radar processor, SM-6 missile seeker, and Apache aircraft sensors. Its niche position in mission-critical processing hardware gives it strong program lock-in and recurring revenue."},
    {"name": "AeroVironment", "ticker": "AVAV", "country": "USA", "market_cap": 13.0, "stock_price": 285.0, "change_percent": 2.89, "revenue": 1.9, "employees": 4000, "specializations": ["Small UAV", "Loitering Munitions"], "founded_year": 1971, "headquarters": "Arlington, VA, USA", "website": "avinc.com", "description": "AeroVironment is the leading US manufacturer of small tactical UAVs and loitering munitions. Its Raven, Puma, and Wasp hand-launched UAVs are standard equipment across US Army infantry units and have been exported to 50+ countries. The Switchblade 300 loitering munition became globally known after over 10,000 Switchblade 300/600 systems supplied to Ukraine by 2024, demonstrating precision anti-armor and anti-personnel capability against Russian forces. AeroVironment is also developing the Jump 20 VTOL UAS and Vapor helicopter-type drone for logistics missions."},
    {"name": "Maxar Technologies", "ticker": "MAXR", "country": "USA", "market_cap": 3.1, "stock_price": 52.34, "change_percent": 1.23, "revenue": 1.8, "employees": 4600, "specializations": ["Space", "Imagery", "Satellites"], "founded_year": 1969, "headquarters": "Westminster, CO, USA", "website": "maxar.com", "description": "Maxar Technologies is a leading commercial Earth observation satellite operator and space systems manufacturer. Its WorldView and GeoEye satellites provide 30cm-resolution commercial imagery used extensively by the US intelligence community, NGA, and allied governments. Maxar imagery of Russian military build-up before the 2022 Ukraine invasion provided critical publicly-available intelligence. The company also manufactures satellite buses for US government classified programs and geospatial analytics software. Maxar was acquired by private equity (Advent International) in 2023."},
    {"name": "Curtiss-Wright", "ticker": "CW", "country": "USA", "market_cap": 8.9, "stock_price": 245.67, "change_percent": 0.78, "revenue": 2.9, "employees": 8500, "specializations": ["Components", "Naval", "Nuclear"], "founded_year": 1929, "headquarters": "Davidson, NC, USA", "website": "curtisswright.com", "description": "Curtiss-Wright (named after aviation pioneers Glenn Curtiss and the Wright Brothers) is a specialized defense technology company providing critical components and systems for naval nuclear propulsion, defense electronics, and industrial systems. Its naval nuclear business supplies components for US Navy aircraft carriers and submarines under long-term contracts. Defense Electronics produces flight data recorders, vetronics, and electronic warfare subsystems. Curtiss-Wright products are embedded in virtually every major US naval vessel and many allied ships, providing deep program stickiness."},
    {"name": "TransDigm", "ticker": "TDG", "country": "USA", "market_cap": 72.4, "stock_price": 1289.45, "change_percent": 0.45, "revenue": 6.6, "employees": 14000, "specializations": ["Components", "Aerospace"], "founded_year": 1993, "headquarters": "Cleveland, OH, USA", "website": "transdigm.com", "description": "TransDigm is a highly engineered aerospace components manufacturer with a distinctive private equity-style business model: acquire niche aerospace component businesses with sole-source positions on existing programs, then extract maximum pricing power due to the high switching costs for certified aerospace parts. Its 70+ subsidiaries produce actuators, ignition systems, fluid controls, latches, and other critical components embedded in commercial and military aircraft. The defense segment generates approximately 35% of revenue with key positions on F-35, Airbus, and Boeing platforms."},
    {"name": "Anduril Industries", "ticker": "ANDR-PRIV", "country": "USA", "market_cap": 14.0, "stock_price": 0, "change_percent": 0, "revenue": 0.8, "employees": 2500, "specializations": ["AI", "Autonomous", "Counter-UAS"], "founded_year": 2017, "headquarters": "Costa Mesa, CA, USA", "website": "anduril.com", "funding_stage": "Late Stage — $3B+ (Founders Fund, a16z)", "is_public": False, "description": "Anduril Industries is the most prominent of the new-generation US defense technology companies, founded by Oculus co-founder Palmer Luckey. Its Lattice AI platform provides autonomous sensor fusion and command-and-control for border surveillance, air defense, and counter-drone operations. Key programs include the Sentry Tower autonomous surveillance system (deployed on the US-Mexico border), the Roadrunner reusable interceptor drone, the Ghost-X autonomous aircraft, and the Pulsar electronic warfare system. Anduril is valued at $14B+ and represents the leading challenge to the traditional defense prime model."},
    {"name": "Shield AI", "ticker": "SHLD-PRIV", "country": "USA", "market_cap": 2.7, "stock_price": 0, "change_percent": 0, "revenue": 0.2, "employees": 800, "specializations": ["AI", "Autonomous", "UAV"], "founded_year": 2015, "headquarters": "San Diego, CA, USA", "website": "shield.ai", "funding_stage": "Series F — $1B+ (Andreessen Horowitz)", "is_public": False, "description": "Shield AI builds AI-powered autonomous pilots for military aircraft and drones. Its Hivemind AI pilot has flown the F-16, MQ-20, and V-BAT platforms without GPS or communications links, enabling operations in fully contested electromagnetic environments. Shield AI also produces the Nova and Nova 2 quadrotor drones used by US special operations forces for building clearance and ISR. The company acquired Martin UAV (V-BAT VTOL) in 2021, adding a DoD-contracted VTOL ISR platform to its portfolio.", "aliases": ["ShieldAI", "Shield Artificial Intelligence", "Shield AI Inc"]},
    {"name": "Palantir Technologies", "ticker": "PLTR", "country": "USA", "market_cap": 400.0, "stock_price": 175.0, "change_percent": 3.45, "revenue": 3.4, "employees": 4000, "specializations": ["Software", "AI", "Analytics", "Intelligence"], "founded_year": 2003, "headquarters": "Denver, CO, USA", "website": "palantir.com", "description": "Palantir Technologies builds data integration and AI analytics platforms for government intelligence, military operations, and commercial enterprise. Its Gotham platform is used by CIA, NSA, FBI, and allied intelligence agencies for pattern-of-life analysis and targeting. The Maven Smart System (formerly Project Maven AI) analyzes drone footage for the US military. Palantir's AIP (Artificial Intelligence Platform) brings LLM-based tools to classified military operations. Despite controversy over surveillance applications, Palantir has entrenched itself across Western intelligence and military infrastructure with contracts difficult to displace."},
    {"name": "Rocket Lab", "ticker": "RKLB", "country": "USA", "market_cap": 26.0, "stock_price": 52.0, "change_percent": 4.56, "revenue": 0.55, "employees": 2600, "specializations": ["Space", "Launch", "Satellites"], "founded_year": 2006, "headquarters": "Long Beach, CA, USA", "website": "rocketlabusa.com", "description": "Rocket Lab is a dedicated small satellite launch provider and spacecraft manufacturer, operating the Electron rocket from New Zealand and Virginia launch sites. Electron has completed 40+ successful launches, making it the second most frequently launched orbital rocket globally (after Falcon 9). Its Photon satellite bus serves government and commercial customers including NASA. Rocket Lab is developing the larger Neutron rocket for medium-lift missions and provides satellite manufacturing services for national security customers including the US Space Force and NRO. Its vertical integration from launch vehicle to spacecraft makes it unique in the small-sat sector."},
    # ── Recent US defense IPOs (added Aug 2026) — publicly traded only ─────────
    {"name": "Voyager Technologies", "ticker": "VOYG", "country": "USA", "market_cap": 3.6, "stock_price": 40.0, "change_percent": 0, "revenue": 0.14, "employees": 1100, "specializations": ["Space", "Defense", "National Security"], "founded_year": 2019, "headquarters": "Denver, CO, USA", "website": "voyagertechnologies.com", "is_public": True, "description": "Voyager Technologies is a US defense and space-technology company that listed on the NYSE in June 2025. It spans a Defense & National Security segment — guidance, navigation, propulsion and directed-energy systems for missiles and spacecraft — and a Space Solutions segment anchored by Starlab, a commercial space station under development with Airbus and Mitsubishi as an ISS successor. Voyager serves NASA, the Department of Defense and the intelligence community."},
    {"name": "Karman Holdings", "ticker": "KRMN", "country": "USA", "market_cap": 6.5, "stock_price": 45.0, "change_percent": 0, "revenue": 0.34, "employees": 1200, "specializations": ["Missiles", "Hypersonics", "Space", "Propulsion"], "founded_year": 2023, "headquarters": "Huntington Beach, CA, USA", "website": "karmanspaceanddefense.com", "is_public": True, "description": "Karman Holdings (Karman Space & Defense) supplies mission-critical systems for missiles, hypersonics, space and defense — payload fairings, rocket-motor cases, propulsion structures and integrated interstage assemblies. Its components fly on strategic missile-defense interceptors, hypersonic strike programs and national-security launch vehicles. Karman listed on the NYSE in February 2025 and is a pure-play beneficiary of surging US missile and hypersonics demand."},
    {"name": "Loar Holdings", "ticker": "LOAR", "country": "USA", "market_cap": 8.5, "stock_price": 90.0, "change_percent": 0, "revenue": 0.44, "employees": 2400, "specializations": ["Aerospace Components", "Niche Systems"], "founded_year": 2012, "headquarters": "White Plains, NY, USA", "website": "loargroup.com", "is_public": True, "description": "Loar Holdings designs and manufactures niche, proprietary aerospace and defense components — actuation, sealing, sensing and specialized cockpit systems fitted across military aircraft, UAVs and commercial platforms. Since its April 2024 NYSE IPO, Loar has grown through a disciplined acquisition strategy in high-margin, sole-source, aftermarket-heavy niches, making it one of the strongest-performing recent aerospace listings."},
    {"name": "Parsons Corporation", "ticker": "PSN", "country": "USA", "market_cap": 8.1, "stock_price": 78.90, "change_percent": 1.34, "revenue": 5.4, "employees": 17500, "specializations": ["Engineering", "Cyber", "Infrastructure"], "founded_year": 1944, "headquarters": "Centreville, VA, USA", "website": "parsons.com", "description": "Parsons Corporation is a defense technology and critical infrastructure engineering company with deep roots in missile defense, intelligence community IT, and secure communications. Its Federal Solutions segment serves the US Army, MDA (Missile Defense Agency), and intelligence community with systems integration, cyber, and engineering services. Parsons developed missile defense infrastructure at Fort Greely, Alaska, and provides engineering for critical infrastructure protection. Its commercial segment develops smart transportation and water infrastructure, providing geographic diversification."},
    {"name": "BWX Technologies", "ticker": "BWXT", "country": "USA", "market_cap": 9.8, "stock_price": 108.45, "change_percent": 0.67, "revenue": 2.5, "employees": 7600, "specializations": ["Nuclear", "Naval", "Components"], "founded_year": 2015, "headquarters": "Lynchburg, VA, USA", "website": "bwxt.com", "description": "BWX Technologies is the United States' premier nuclear components manufacturer for national defense, producing naval nuclear reactor components for all US Navy aircraft carriers and submarines. BWXT is the sole US manufacturer of nuclear fuel assemblies for the Naval Nuclear Propulsion Program (a joint Navy/DoE program launched under Admiral Rickover). It also manufactures radiological and nuclear medical isotopes and provides nuclear facility management services at national laboratories. BWXT's strategic monopoly position in naval nuclear supply makes it indispensable to US nuclear-powered naval superiority."},
    {"name": "Axon Enterprise", "ticker": "AXON", "country": "USA", "market_cap": 24.5, "stock_price": 326.78, "change_percent": 2.45, "revenue": 1.5, "employees": 4000, "specializations": ["Law Enforcement", "Tasers", "Body Cameras"], "founded_year": 1993, "headquarters": "Scottsdale, AZ, USA", "website": "axon.com", "description": "Axon Enterprise is the dominant supplier of non-lethal weapons, body cameras, and digital evidence management to law enforcement and military customers. Its Taser (conducted energy weapon) is the non-lethal weapon of choice for 18,000+ law enforcement agencies in 100+ countries. Axon's Evidence.com cloud platform manages body camera footage, digital evidence, and records for 3,500+ agencies. The company is expanding into autonomous drones (Axon Air), AI-powered transcription (Draft One), and non-lethal drone-mounted Taser systems. Axon's integrated ecosystem creates strong switching costs and recurring software revenue."},
    # === UK ===
    {"name": "BAE Systems", "ticker": "BA.L", "country": "UK", "market_cap": 42.8, "stock_price": 13.45, "change_percent": 0.87, "revenue": 25.3, "employees": 93100, "specializations": ["Naval", "Land Systems", "Electronics", "Cyber"], "founded_year": 1999, "headquarters": "London, UK", "website": "baesystems.com", "description": "BAE Systems is Europe's largest defense company and among the top three globally by defense revenue. Its Maritime division builds Astute-class nuclear attack submarines, Type 26 City-class frigates, and leads the Dreadnought SSBN replacement program for the Royal Navy. The Air sector holds a 15% industrial share of the F-35 Lightning II program (center fuselage, electronic systems) across 3,000+ planned airframes, and co-leads the GCAP/Tempest 6th-generation fighter with Japan and Italy. BAE's Electronic Systems division supplies electronic warfare systems, the APKWS laser-guided rocket (used across virtually all US military platforms), and major avionics for US programs. Its Land sector manages Challenger 2 Life Extension, AJAX armored reconnaissance vehicles, and Bradley Fighting Vehicle upgrades for the US Army. BAE holds uniquely diversified positions across air, land, sea, and cyber — making it the UK's most strategically critical industrial asset."},
    {"name": "Rolls-Royce Holdings", "ticker": "RR.L", "country": "UK", "market_cap": 32.5, "stock_price": 4.56, "change_percent": 2.34, "revenue": 16.5, "employees": 42000, "specializations": ["Engines", "Nuclear", "Power Systems"], "founded_year": 1906, "headquarters": "London, UK", "website": "rolls-royce.com", "description": "Rolls-Royce is one of the world's three largest civil aero-engine manufacturers (with CFM and Pratt & Whitney), and a strategically critical defense company. Its Defence division produces the Adour turbofan (Hawk trainer, Jaguar), AE 2100 turboprop (C-130J), MTR390 helicopter turboshaft (Tiger HAP/HAD), and holds the UK's sovereign submarine propulsion program — nuclear reactors for all Royal Navy SSN and SSBN submarines (Astute and Dreadnought classes). Rolls-Royce is developing the UltraFan next-generation engine demonstrating 25% fuel efficiency gains and pursuing small modular reactor (SMR) technology for civil nuclear markets. After a major restructuring under CEO Tufan Erginbilgiç (2023–present), the company's profitability and stock have recovered sharply, making it a benchmark turnaround story in UK industrial equity."},
    {"name": "Babcock International", "ticker": "BAB.L", "country": "UK", "market_cap": 2.8, "stock_price": 5.67, "change_percent": 1.23, "revenue": 5.2, "employees": 26000, "specializations": ["Naval", "Nuclear", "Services"], "founded_year": 1891, "headquarters": "London, UK", "website": "babcockinternational.com", "description": "Babcock International is the UK's leading defense engineering services company, responsible for maintaining and supporting the Royal Navy's submarine fleet at HMNB Devonport — including all Astute-class SSNs and Vanguard-class SSBNs. Babcock manages the Clyde naval base (home of the UK's strategic nuclear deterrent), operates military training ranges, provides aircraft maintenance support (including Type 101/102 Hawk trainers), and delivers engineering services to land forces. Internationally, Babcock holds naval support contracts in Australia (Type 26 design support), Canada, France, and South Africa. Its acquisition of Frazer-Nash Consultancy expanded its high-end engineering consultancy capabilities into space, digital, and nuclear fields."},
    {"name": "QinetiQ", "ticker": "QQ.L", "country": "UK", "market_cap": 2.4, "stock_price": 4.12, "change_percent": 0.56, "revenue": 1.8, "employees": 8000, "specializations": ["R&D", "Testing", "Robotics", "Cyber"], "founded_year": 2001, "headquarters": "Farnborough, UK", "website": "qinetiq.com", "description": "QinetiQ is the UK's premier defense technology and test & evaluation company, spun out from DERA (Defence Evaluation and Research Agency) in 2001. It operates sovereign test ranges at Hebrides, Aberporth, Boscombe Down, and Porton Down — providing the UK's only independent large-scale weapons and systems test infrastructure. QinetiQ's Global Products division exports autonomous systems (TITAN small UGV), counter-IED systems, and survivability solutions to 50+ countries. Its LTPA (Long Term Partnering Agreement) with the UK MoD provides assured test and evaluation services. The 2023 acquisition of Avantus Federal roughly doubled QinetiQ's US revenue, giving it a meaningful presence in the US national security services market."},
    {"name": "Ultra Electronics", "ticker": "ULE.L", "country": "UK", "market_cap": 2.9, "stock_price": 35.67, "change_percent": 0.34, "revenue": 1.1, "employees": 4500, "specializations": ["Sonar", "Communications", "Sensors"], "founded_year": 1920, "headquarters": "London, UK", "website": "ultra.group", "description": "Ultra Electronics (now Ultra, part of Cobham/Advent International) is a UK defense electronics specialist with exceptional depth in underwater warfare and submarine sonar systems. Its sonar products — including the 2087 low-frequency active/passive sonar fitted to Royal Navy Type 23 frigates and designed for Type 26 — represent some of NATO's most advanced submarine detection capabilities. Ultra also produces naval communications, aircraft self-protection systems, and mission systems for US and UK nuclear submarine command and control. The company was acquired by Cobham (PE-owned) in 2022 after a prolonged review by UK and US regulators concerned about technology transfer to non-UK investors."},
    {"name": "Chemring Group", "ticker": "CHG.L", "country": "UK", "market_cap": 1.2, "stock_price": 4.23, "change_percent": 1.45, "revenue": 0.5, "employees": 2800, "specializations": ["Countermeasures", "Sensors", "Energetics"], "founded_year": 1905, "headquarters": "Romsey, UK", "website": "chemring.co.uk", "description": "Chemring Group is a specialist UK defense company focused on countermeasures, energetics, and sensors. Its Countermeasures division produces pyrotechnic decoys (IR flares and chaff) for virtually all NATO combat aircraft and helicopters including F-35, Typhoon, and Apache — a narrow but critically sovereign capability. The Sensors & Electronics division manufactures advanced sensors for explosives and chemical agent detection, including man-portable ground penetrating radar for IED detection widely used by UK and US forces. Chemring's energetics businesses produce propellants and specialty chemicals for missiles, artillery, and pyrotechnics across NATO supply chains."},
    # === France ===
    {"name": "Thales", "ticker": "HO.PA", "country": "France", "market_cap": 31.2, "stock_price": 145.80, "change_percent": -0.12, "revenue": 18.4, "employees": 81000, "specializations": ["Electronics", "Cyber", "Space", "Transport"], "founded_year": 2000, "headquarters": "La Défense, France", "website": "thalesgroup.com", "description": "Thales is one of Europe's largest defense and technology groups, operating across defense electronics, civil aerospace, digital identity, and security. In defense, Thales is the European leader in ground radars (Ground Master family), naval combat management systems (TACTICOS), naval radars (SMART-L, APAR), optronics, and missile seekers. It is a key supplier to France's Rafale jet (avionics, EW) and produces the SkyWatcher C-UAS radar and Rapid Fire air defense system. Thales serves 68 countries with particular strength in European and Middle Eastern defense markets."},
    {"name": "Dassault Aviation", "ticker": "AM.PA", "country": "France", "market_cap": 24.5, "stock_price": 198.90, "change_percent": 1.56, "revenue": 7.2, "employees": 12700, "specializations": ["Aircraft", "Rafale", "Business Jets"], "founded_year": 1930, "headquarters": "Paris, France", "website": "dassault-aviation.com", "description": "Dassault Aviation is the maker of the Rafale multirole fighter — France's sole operational combat aircraft and one of the most successful export fighters of the 2020s with orders from Egypt, Greece, Croatia, UAE, Indonesia, and India (300+ export aircraft). Dassault is also the world's second-largest business jet manufacturer (Falcon series) and is developing the nEUROn stealth UCAV demonstrator with European partners. As guardian of French aerospace sovereignty, Dassault maintains unique independence in a consolidated sector."},
    {"name": "Safran", "ticker": "SAF.PA", "country": "France", "market_cap": 78.5, "stock_price": 185.67, "change_percent": 0.89, "revenue": 23.2, "employees": 83000, "specializations": ["Engines", "Equipment", "Defense", "Space"], "founded_year": 2005, "headquarters": "Paris, France", "website": "safran-group.com", "description": "Safran is one of the world's leading aerospace propulsion and equipment companies. Its CFM International joint venture with GE Aviation produces the LEAP engine powering the A320neo and 737 MAX. In defense, Safran produces the M88 engine for the Rafale, helicopter turboshaft engines (Arriel, RTM322), helicopter electro-optical systems (PASEO, Euroflir), and advanced inertial navigation systems. Safran Electronics & Defense is a European leader in optronics and gyroscopic navigation for missiles and aircraft."},
    {"name": "Naval Group", "ticker": "NAVG-PRIV", "country": "France", "market_cap": 4.5, "stock_price": 0, "change_percent": 0, "revenue": 4.8, "employees": 17000, "specializations": ["Naval", "Submarines", "Surface Ships"], "founded_year": 2017, "headquarters": "Paris, France", "website": "naval-group.com", "funding_stage": "Private — State-owned (French MoD 62.5%, Thales 35%)", "description": "Naval Group is France's prime naval defense contractor and one of the world's leading submarine designers. It builds nuclear-powered (SNLE-3G) and conventional submarines, FDI stealth frigates, and offshore patrol vessels. With exports to Australia, India, Brazil, and Morocco, it is Europe's largest naval shipbuilder by revenue."},
    {"name": "MBDA", "ticker": "MBDA-PRIV", "country": "France", "market_cap": 5.2, "stock_price": 0, "change_percent": 0, "revenue": 4.2, "employees": 14000, "specializations": ["Missiles", "Air Defense"], "founded_year": 2001, "headquarters": "Le Plessis-Robinson, France", "website": "mbda-systems.com", "funding_stage": "Private — JV (Airbus 37.5%, BAE 37.5%, Leonardo 25%)", "description": "MBDA is Europe's leading missile systems company, jointly owned by Airbus, BAE Systems, and Leonardo. It develops Meteor (air-to-air), Aster (air defense), Exocet (anti-ship), Brimstone, Storm Shadow/SCALP, and the CAMM family. MBDA supplies every NATO nation in Europe and is the backbone of European missile sovereignty."},
    # Arquus folded into John Cockerill Defense after the 2024–2025 acquisition (see entry below).
    # === Germany ===
    {"name": "Rheinmetall", "ticker": "RHM.DE", "country": "Germany", "market_cap": 80.0, "stock_price": 1850.0, "change_percent": 3.21, "revenue": 11.0, "employees": 33000, "specializations": ["Land Systems", "Ammunition", "Electronics"], "founded_year": 1889, "headquarters": "Düsseldorf, Germany", "website": "rheinmetall.com", "description": "Rheinmetall is Germany's leading defense company and Europe's most dynamic rearmament beneficiary. Its Vehicle Systems division produces the Lynx infantry fighting vehicle (ordered by Germany, Hungary, Australia, Slovakia), KF41 IFV, and is partnering with Ukraine to build local armored vehicle production. Its Weapon & Ammunition division is Europe's largest artillery shell manufacturer — critical for NATO's surge demand since 2022. Rheinmetall is also developing the KF51 Panther next-generation MBT. With revenues growing 30%+ annually since Russia's 2022 invasion, Rheinmetall has become the flagship stock of European rearmament."},
    {"name": "Hensoldt", "ticker": "HAG.DE", "country": "Germany", "market_cap": 4.8, "stock_price": 35.67, "change_percent": 1.89, "revenue": 1.8, "employees": 7000, "specializations": ["Sensors", "Radar", "Optronics"], "founded_year": 2017, "headquarters": "Taufkirchen, Germany", "website": "hensoldt.net", "description": "Hensoldt is Germany's leading sensor and electronics specialist, spun out of Airbus in 2017. It produces the TRANCHE radars for the Eurofighter, MSSR 2000 i secondary surveillance radar, Kalaetron EW system, Eurofighter PRAETORIAN electronic warfare suite, and advanced optronics for aircraft and ground vehicles. Hensoldt is a key partner on FCAS (Future Combat Air System) for its sensor and EW components. Listed in 2020 with Leonardo and KfW as major shareholders, it represents Germany's sovereign sensor industrial capability."},
    {"name": "Diehl Defence", "ticker": "DIEHL-PRIV", "country": "Germany", "market_cap": 2.1, "stock_price": 0, "change_percent": 0, "revenue": 0.9, "employees": 3500, "specializations": ["Missiles", "Ammunition", "Sensors"], "founded_year": 1902, "headquarters": "Überlingen, Germany", "website": "diehl.com/defence", "funding_stage": "Private — Diehl Group subsidiary", "description": "Diehl Defence is a major German defense group producing the IRIS-T short-range air defense missile, advanced fuzes, smart ammunition, and the SkyNex air defense system. A key Eurofighter partner supplying decoy systems and EW payloads, Diehl Defence is a pillar of Germany's defense-industrial base and NATO interoperability."},
    {"name": "ThyssenKrupp Marine", "ticker": "TKA.DE", "country": "Germany", "market_cap": 3.2, "stock_price": 4.56, "change_percent": -0.45, "revenue": 2.1, "employees": 8000, "specializations": ["Naval", "Submarines"], "founded_year": 2004, "headquarters": "Kiel, Germany", "website": "thyssenkrupp-marine-systems.com", "description": "ThyssenKrupp Marine Systems (TKMS) is Europe's leading conventional submarine manufacturer, building the Type 212A AIP submarine for Germany, Italy, Norway, and Singapore. Its subsidiary Howaldtswerke-Deutsche Werft (HDW) has delivered over 160 submarines globally. TKMS is competing for the Norwegian-German submarine program (NSM submarines) and the Indian P-75I submarine competition. The business was carved out from ThyssenKrupp's industrial portfolio for potential sale to a defense-focused investor — representing a rare submarine M&A opportunity in Europe."},
    {"name": "MTU Aero Engines", "ticker": "MTX.DE", "country": "Germany", "market_cap": 14.5, "stock_price": 275.90, "change_percent": 0.67, "revenue": 6.3, "employees": 12000, "specializations": ["Engines", "MRO"], "founded_year": 1934, "headquarters": "Munich, Germany", "website": "mtu.de", "description": "MTU Aero Engines is Germany's leading aircraft engine manufacturer and a global leader in military aero-engine MRO. It is a risk-and-revenue sharing partner on the CFM56 (800+ million flight hours), CF6, GE90, and LEAP engines, and produces the TP400-D6 turboprop powering the A400M military transport. MTU's military MRO division maintains Eurofighter RB199 and Tornado engines for NATO air forces. Its German military engine monopoly and CFM partnership make it one of Europe's most strategically irreplaceable aerospace companies."},
    {"name": "Renk Group", "ticker": "R3NK.DE", "country": "Germany", "market_cap": 2.8, "stock_price": 28.90, "change_percent": 2.34, "revenue": 0.9, "employees": 3400, "specializations": ["Transmissions", "Propulsion", "Components"], "founded_year": 1873, "headquarters": "Augsburg, Germany", "website": "renk.eu", "description": "Renk Group is the world's leading supplier of high-performance transmissions and propulsion systems for armored vehicles and naval vessels. Its HSWL 295 TM transmission is standard in the Leopard 2 MBT (used by 18 nations), and its propulsion systems power naval vessels in 60+ navies. With NATO's armor fleet requiring MRO and new Leopard 2 deliveries surging since 2022, Renk is a direct beneficiary of European land forces modernization. Listed on Frankfurt Stock Exchange in 2023 with ADS (Advent International) as a major shareholder."},
    {"name": "Helsing", "ticker": "HELS-PRIV", "country": "Germany", "market_cap": 3.7, "stock_price": 0, "change_percent": 0, "revenue": 0.1, "employees": 450, "specializations": ["AI", "Electronic Warfare", "Autonomous", "Software"], "founded_year": 2021, "headquarters": "Munich, Germany", "website": "helsing.ai", "funding_stage": "Series C — €700M+ (General Catalyst, Saab)", "is_public": False, "description": "Helsing is Europe's highest-profile defense AI startup, founded by ex-DeepMind and tech executives with explicit European sovereignty as its mission. Its core product is an AI platform for processing sensor data — radar, sonar, and camera feeds — to provide superior situational awareness for European military customers. Helsing has signed contracts with the German Bundeswehr (Eurofighter EW) and the UK MoD, and its strategic investor Saab gives it access to the Swedish defense industrial base. Helsing explicitly refuses to work for non-European governments."},
    # === Italy ===
    {"name": "Leonardo", "ticker": "LDO.MI", "country": "Italy", "market_cap": 14.8, "stock_price": 25.67, "change_percent": 1.56, "revenue": 15.3, "employees": 53000, "specializations": ["Helicopters", "Electronics", "Cyber", "Space"], "founded_year": 1948, "headquarters": "Rome, Italy", "website": "leonardo.com", "description": "Leonardo (formerly Finmeccanica) is Italy's flagship defense and aerospace group. AgustaWestland (a Leonardo division) is the world's second-largest helicopter manufacturer, producing the AW101, AW139, AW169, and AW249 armed helicopter. Leonardo's Electronics, Defence and Security division supplies airborne radar (Osprey AESA, Grifo), EW systems, communications, and naval systems. The company is a key partner on the Eurofighter Typhoon and the GCAP/Tempest 6th-generation fighter with UK and Japan. Italy's government (MEF) holds a 30.2% stake, giving Leonardo strategic national importance."},
    {"name": "Fincantieri", "ticker": "FCT.MI", "country": "Italy", "market_cap": 2.1, "stock_price": 1.23, "change_percent": 0.89, "revenue": 7.8, "employees": 21000, "specializations": ["Naval", "Shipbuilding", "Cruise Ships"], "founded_year": 1959, "headquarters": "Trieste, Italy", "website": "fincantieri.com", "description": "Fincantieri is Italy's national shipbuilder and one of the world's largest naval shipyards. Its naval division builds FREMM multi-mission frigates (for Italy, France via OCCAR, and Egypt), PPA offshore patrol vessels, and submarines. The commercial division builds luxury cruise ships for MSC, Norwegian, and Viking. Fincantieri is developing the NFS next-generation frigate for the Italian Navy and is bidding for the Canadian surface combatant program. The Italian government (SIMEST/Cassa Depositi e Prestiti) holds a 71.6% stake."},
    {"name": "Avio", "ticker": "AVIO.MI", "country": "Italy", "market_cap": 0.9, "stock_price": 12.34, "change_percent": 0.45, "revenue": 0.4, "employees": 1500, "specializations": ["Space", "Propulsion", "Launch"], "founded_year": 2013, "headquarters": "Colleferro, Italy", "website": "avio.com", "description": "Avio is Italy's space propulsion specialist and the prime contractor for Europe's Vega and Vega-C small satellite launch vehicles. Vega-C provides Europe's sovereign access to space for scientific and Earth observation payloads including the Copernicus environmental satellites. Avio also produces solid rocket motors for the Ariane 6 launcher and develops hybrid propulsion for future space applications. Following Vega-C's 2022 launch failure, Avio has been working to restore service — underscoring the strategic importance of European launch sovereignty."},
    {"name": "Elettronica", "ticker": "ELET-PRIV", "country": "Italy", "market_cap": 0.8, "stock_price": 0, "change_percent": 0, "revenue": 0.4, "employees": 1600, "specializations": ["Electronic Warfare", "SIGINT"], "founded_year": 1951, "headquarters": "Rome, Italy", "website": "elt.it", "funding_stage": "Private — Leonardo 31.3% stake", "description": "Elettronica SpA is Italy's leading electronic warfare specialist, developing EW systems, SIGINT platforms, and cyber-electronic solutions for air, land, naval, and space domains. It provides the Italian Eurofighter Typhoon EW suite and supplies systems to 30+ NATO nations. Elettronica is a pillar of European sovereign EW capability."},
    # === Spain ===
    {"name": "Indra Sistemas", "ticker": "IDR.MC", "country": "Spain", "market_cap": 3.2, "stock_price": 18.45, "change_percent": 0.67, "revenue": 4.1, "employees": 57000, "specializations": ["IT", "Defense", "Transport", "Simulation"], "founded_year": 1993, "headquarters": "Madrid, Spain", "website": "indracompany.com", "description": "Indra is Spain's largest defense and technology company, providing air traffic management systems used by 160+ airports globally, advanced defense radar (Lanza LCR, Retális), combat simulation and training, C4ISR systems, and satellite ground equipment. Indra leads the FCAS sensor architecture and develops the European ATM modernization program SESAR. The Spanish government holds 28% and SEPI (state holding) another 20%, making Indra a critical instrument of Spain's technology sovereignty. Its Minsait IT subsidiary provides digital transformation services across the public sector."},
    {"name": "Navantia", "ticker": "NVNT-PRIV", "country": "Spain", "market_cap": 1.5, "stock_price": 0, "change_percent": 0, "revenue": 1.2, "employees": 4100, "specializations": ["Naval", "Shipbuilding", "Submarines"], "founded_year": 2005, "headquarters": "Madrid, Spain", "website": "navantia.es", "funding_stage": "Private — State-owned (SEPI)", "description": "Navantia is Spain's state-owned naval shipbuilder, designing and building the S-80 Plus AIP submarines, F-110 stealth frigates, LHD amphibious assault ships, and offshore patrol vessels. Navantia exports to Australia (Hunter-class frigate design phase), Saudi Arabia, and Norway, and operates five shipyards across Spain."},
    # === EU/Multinational ===
    {"name": "Airbus Defence & Space", "ticker": "AIR.PA", "country": "EU", "market_cap": 98.5, "stock_price": 156.23, "change_percent": 0.98, "revenue": 52.1, "employees": 130000, "specializations": ["Aircraft", "Space", "Helicopters", "UAV"], "multinational_for": ["France", "Germany", "Spain"], "founded_year": 1970, "headquarters": "Leiden, Netherlands", "website": "airbus.com", "description": "Airbus Defence & Space is the defense and space division of Airbus SE, Europe's largest aerospace company. It produces the A400M military transport, A330 MRTT tanker, Eurofighter Typhoon (with BAE and Leonardo), and MALE RPAS Eurodrone. The Space division operates Ariane 6 (Europe's heavy launch vehicle), builds Galileo navigation satellites, and provides military satcom (SGDC, XTAR). Its Intelligence division operates Pleiades and TerraSAR-X satellite constellations for government imagery customers. Airbus Defence & Space anchors European aerospace sovereignty across air, space, and cyber domains."},
    {"name": "KNDS", "ticker": "KNDS-PRIV", "country": "France", "market_cap": 6.5, "stock_price": 0, "change_percent": 0, "revenue": 4.2, "employees": 9000, "specializations": ["Land Systems", "Tanks", "Artillery"], "multinational_for": ["France", "Germany"], "founded_year": 2015, "headquarters": "Amsterdam, Netherlands", "website": "knds.com", "funding_stage": "Private — JV (Nexter France 50%, KMW Germany 50%)", "description": "KNDS is the Franco-German land defense champion formed by merging Nexter (France) and Krauss-Maffei Wegmann (Germany) in 2015. It produces the Leclerc MBT, Leopard 2, Caesar self-propelled howitzer, VBCI infantry fighting vehicle, and is developing the MGCS next-generation European main battle tank program alongside Rheinmetall."},
    # === Sweden/Norway ===
    {"name": "Saab AB", "ticker": "SAAB-B.ST", "country": "Sweden", "market_cap": 18.5, "stock_price": 678.90, "change_percent": 2.45, "revenue": 5.8, "employees": 21000, "specializations": ["Aircraft", "Radar", "Missiles", "Submarines"], "founded_year": 1937, "headquarters": "Linköping, Sweden", "website": "saab.com", "description": "Saab is Sweden's premier defense company and a global leader in defense electronics, airborne systems, and maritime technologies. Its Gripen E/F fighter is the most advanced Western fighter jet in its price class, with orders from Sweden, Brazil, Czech Republic, South Africa, and Hungary. Saab produces the GlobalEye airborne early warning and control aircraft, Carl-Gustaf shoulder-launched weapon system (in service with 40+ armies), AT4 anti-tank rocket, and Gotland-class AIP submarines. Saab is a strategic investor in Helsing and partners with Boeing on the T-7A Red Hawk trainer."},
    {"name": "Nammo", "ticker": "NAMM-PRIV", "country": "Norway", "market_cap": 1.2, "stock_price": 0, "change_percent": 0, "revenue": 0.8, "employees": 3000, "specializations": ["Ammunition", "Rockets", "Space"], "founded_year": 1998, "headquarters": "Raufoss, Norway", "website": "nammo.com", "funding_stage": "Private — JV (Norwegian MoD 50%, Patria Finland 50%)", "description": "Nammo is the Nordic Ammunition Company, a leading manufacturer of ammunition across all calibers, rocket motors, and space propulsion systems. Its rocket motors power the IRIS-T missile and Ariane 6 upper stage. Nammo supplies NATO forces with 5.56mm, 7.62mm, 12.7mm, 20mm, 30mm, 40mm, and artillery ammunition, and is a critical link in European ammunition sovereignty."},
    {"name": "Kongsberg Defence", "ticker": "KOG.OL", "country": "Norway", "market_cap": 8.5, "stock_price": 85.67, "change_percent": 1.78, "revenue": 3.5, "employees": 12000, "specializations": ["Missiles", "Remote Weapons", "Maritime"], "founded_year": 1814, "headquarters": "Kongsberg, Norway", "website": "kongsberg.com", "description": "Kongsberg Gruppen (KDA — Kongsberg Defence & Aerospace) is Norway's flagship defense company, globally renowned for the Naval Strike Missile (NSM) and its land-based NASAMS air defense system (co-developed with Raytheon, now protecting Washington DC and deployed in Ukraine). The Protector Remote Weapon Station is the standard remote-controlled weapon system for the US Army's Stryker, Bradley, and JLTV programs — an unrivaled market position with 20,000+ units fielded. Kongsberg holds 50% of Patria (Finland) and 50% of Nammo (Nordic Ammunition Company), forming a vertically integrated Nordic defense industrial axis."},
    # === Israel ===
    {"name": "Elbit Systems", "ticker": "ESLT", "country": "Israel", "market_cap": 11.2, "stock_price": 252.34, "change_percent": 1.89, "revenue": 5.8, "employees": 18000, "specializations": ["Electronics", "UAV", "Land Systems", "C4I"], "founded_year": 1966, "headquarters": "Haifa, Israel", "website": "elbitsystems.com", "description": "Elbit Systems is Israel's largest publicly traded defense company, providing a full spectrum of electronics, sensors, and platform solutions across air, land, sea, and cyber domains. Its Hermes 450 and 900 MALE UAVs are among the world's most combat-proven unmanned platforms, operated by Israel, Brazil, Azerbaijan, and European allies. The Trophy active protection system (HV and MV variants) is fitted to Merkava IV, US M1A2 Abrams, and British Challenger 3 tanks — the world's only operationally proven hard-kill APS. Elbit's C4I systems (TORCH-X command software), night vision devices, advanced avionics, and EW systems are embedded in dozens of NATO armies. With over 85% of revenue from exports, Elbit is Israel's most globally diversified defense exporter and has expanded into the UK, Germany, Brazil, and Australia through local subsidiaries."},
    {"name": "Israel Aerospace Industries", "ticker": "IAI-PRIV", "country": "Israel", "market_cap": 8.5, "stock_price": 0, "change_percent": 0, "revenue": 4.5, "employees": 15000, "specializations": ["Aircraft", "Missiles", "Space", "UAV"], "founded_year": 1953, "headquarters": "Lod, Israel", "website": "iai.co.il", "funding_stage": "Private — State-owned (Israeli government)", "description": "IAI is Israel's largest defense company, developing the Barak air defense family, Heron and Eitan UAVs, advanced satellites (Ofeq series), radar systems, and commercial aircraft conversions. Wholly government-owned and exporting to 100+ countries, IAI represents the full spectrum of Israeli defense technology from missile defense to cyber and space intelligence."},
    {"name": "Rafael Advanced Defense", "ticker": "RAFA-PRIV", "country": "Israel", "market_cap": 6.8, "stock_price": 0, "change_percent": 0, "revenue": 3.2, "employees": 8000, "specializations": ["Missiles", "Iron Dome", "Trophy", "Cyber"], "founded_year": 1948, "headquarters": "Haifa, Israel", "website": "rafael.co.il", "funding_stage": "Private — State-owned (Israeli government)", "description": "Rafael Advanced Defense Systems is Israel's national armament R&D authority, creator of the Iron Dome rocket interception system, Trophy active protection for tanks, Spike anti-tank missile family (30+ countries), David's Sling medium air defense, and Stunner interceptor. Rafael operates as a government company under Israel's Ministry of Defense with exports exceeding $2B annually."},
    # === Turkey ===
    {"name": "Aselsan", "ticker": "ASELS.IS", "country": "Turkey", "market_cap": 8.9, "stock_price": 52.34, "change_percent": 2.56, "revenue": 3.2, "employees": 10000, "specializations": ["Electronics", "Communications", "Radar"], "founded_year": 1975, "headquarters": "Ankara, Turkey", "website": "aselsan.com", "description": "Aselsan is Turkey's largest defense electronics company, founded by the Turkish Armed Forces Foundation (TSKGV) to eliminate foreign dependency in military communications. Today it produces tactical radios and communications systems for NATO armies (including the AN/PRC-152 licensed variant), advanced AESA radars (SATURNE naval radar, GÖZCÜ land radar), EW systems, electro-optic sensors, C4ISR, and IFF (identification friend or foe) systems. Aselsan's PULAT active protection system is fitted to Turkish armored vehicles, and its MUHAFIZ short-range air defense radar integrates with HISAR and other Turkish SAM families. With 75%+ export growth in recent years and expanding contracts in UAE, Pakistan, and Southeast Asia, Aselsan has become the industrial backbone of Turkey's defense electronics sovereignty."},
    {"name": "Turkish Aerospace Industries", "ticker": "TAI-PRIV", "country": "Turkey", "market_cap": 5.6, "stock_price": 0, "change_percent": 0, "revenue": 2.8, "employees": 12000, "specializations": ["Aircraft", "UAV", "Helicopters", "Space"], "founded_year": 1984, "headquarters": "Ankara, Turkey", "website": "tai.com.tr", "funding_stage": "Private — State-owned (SSB, Turkish Armed Forces Foundation)", "description": "TAI (TUSAŞ) is Turkey's prime aerospace and defense group developing the KAAN 5th-generation fighter jet, T129 ATAK attack helicopter, HÜRKUŞ turboprop trainer, and ANKA MALE UAV. TAI also manufactures Airbus and Boeing airframe components and is Turkey's lead contractor for F-16 structural components, representing a deliberate drive toward full aerospace sovereignty."},
    {"name": "Baykar", "ticker": "BAYK-PRIV", "country": "Turkey", "market_cap": 4.2, "stock_price": 0, "change_percent": 0, "revenue": 1.5, "employees": 4000, "specializations": ["UAV", "Bayraktar", "UCAV"], "founded_year": 1984, "headquarters": "Istanbul, Turkey", "website": "baykartech.com", "funding_stage": "Private — Bayraktar family", "description": "Baykar transformed 21st century warfare with the Bayraktar TB2 combat drone, combat-proven in Ukraine, Libya, Nagorno-Karabakh, Syria, and Ethiopia, with documented kills of armor, radar stations, naval vessels, and air defense batteries. Its next-generation TB3 is now operational on TCG Anadolu (2024), and KIZILELMA jet-powered UCAV extend Turkey's unmanned reach. Entirely family-owned by the Bayraktar family, Baykar has become the world's most commercially successful drone exporter with 30+ customer nations."},
    {"name": "Roketsan", "ticker": "ROKT-PRIV", "country": "Turkey", "market_cap": 2.8, "stock_price": 0, "change_percent": 0, "revenue": 0.9, "employees": 3500, "specializations": ["Missiles", "Rockets", "Space"], "founded_year": 1988, "headquarters": "Ankara, Turkey", "website": "roketsan.com.tr", "funding_stage": "Private — State-owned (TAI 45.45%, MKEK 15.15%, Turkish Armed Forces Foundation)", "description": "Roketsan is Turkey's prime missile and munitions manufacturer, producing the Cirit laser-guided rocket, UMTAS long-range anti-tank missile, SOM cruise missile, HİSAR short-to-medium air defense family, and BORA surface-to-surface ballistic missile. Roketsan has reduced Turkey's foreign ammunition dependence to near zero and exports to 20+ countries."},
    {"name": "STM", "ticker": "STM-PRIV", "country": "Turkey", "market_cap": 1.5, "stock_price": 0, "change_percent": 0, "revenue": 0.6, "employees": 2800, "specializations": ["Naval", "Engineering", "IT"], "founded_year": 1991, "headquarters": "Ankara, Turkey", "website": "stm.com.tr", "funding_stage": "Private — State-owned (Turkish Armed Forces Foundation, Havelsan)", "description": "STM is Turkey's prime naval system integrator and autonomous systems developer, managing submarine modernization programs and developing the Kargu autonomous loitering munition — the first combat-proven fully autonomous weapon system. STM leads Turkish naval digital transformation and has contracts across the Middle East and Africa."},
    # === South Korea ===
    {"name": "Hanwha Aerospace", "ticker": "012450.KS", "country": "South Korea", "market_cap": 12.5, "stock_price": 156.78, "change_percent": 1.34, "revenue": 6.8, "employees": 10000, "specializations": ["Engines", "Space", "Propulsion"], "founded_year": 1977, "headquarters": "Seongnam, South Korea", "website": "hanwhaaerospace.com", "description": "Hanwha Aerospace is South Korea's aerospace and defense engine conglomerate, operating across aero-engines, space, and land systems. Its engine division produces GE T700 turboshaft engines under license for Korean military helicopters and CF6 engines for Boeing 747/767 variants. In land defense (through Hanwha Defense), it manufactures the K9 Thunder SPH — the world's most-exported self-propelled howitzer (Australia, Estonia, Finland, India, Norway, Poland, Romania) — and the K21 IFV. In space, Hanwha Aerospace is building the KSLV-II (Nuri) launch vehicle's liquid-propellant engines and pursuing commercial space ambitions. South Korea's record $14B+ arms export in 2022 made Hanwha Aerospace a global reference for emerging defense exporters."},
    {"name": "Korea Aerospace Industries", "ticker": "047810.KS", "country": "South Korea", "market_cap": 8.9, "stock_price": 52.34, "change_percent": 2.12, "revenue": 3.5, "employees": 6500, "specializations": ["Aircraft", "KF-21", "Helicopters"], "founded_year": 1999, "headquarters": "Sacheon, South Korea", "website": "koreaaero.com", "description": "Korea Aerospace Industries (KAI) is South Korea's sole fixed-wing aircraft manufacturer, the single most important platform for South Korea's push to become a top-10 defense exporter. Its KF-21 Boramae (4.5-generation fighter developed with Indonesia) achieved its first flight in 2022 and aims to replace aging F-4s and F-5s in the ROKAF from 2026. KAI also produces the T-50 Golden Eagle supersonic trainer (exported to Indonesia, Iraq, Philippines, Thailand, and Senegal), the FA-50 light combat aircraft, and the LAH (Light Armed Helicopter) and MUH-1 Marineon naval helicopter. KAI holds strategic importance as South Korea's sole indigenous combat aircraft developer and the bridge to F-35 co-production aspirations."},
    {"name": "LIG Nex1", "ticker": "079550.KS", "country": "South Korea", "market_cap": 3.2, "stock_price": 98.45, "change_percent": 0.89, "revenue": 1.8, "employees": 4200, "specializations": ["Missiles", "Torpedoes", "Electronics"], "founded_year": 2000, "headquarters": "Yongin, South Korea", "website": "lignex1.com", "description": "LIG Nex1 is South Korea's leading precision weapons and defense electronics company, a subsidiary of LIG Group. It develops the Cheongung II (M-SAM II) medium surface-to-air missile system — a Korean-developed PATRIOT-class air defense missile — and the Haesseong II cruise missile family. Its Blue Shark lightweight torpedo is fitted to Korean submarines and maritime patrol aircraft. LIG Nex1 also produces IFF systems, fire control radars, and C4ISR solutions for all three Korean services. The company is a beneficiary of South Korea's indigenous defense buildup and growing export pipeline, particularly in the Middle East and Southeast Asia."},
    {"name": "Hyundai Rotem", "ticker": "064350.KS", "country": "South Korea", "market_cap": 2.8, "stock_price": 34.56, "change_percent": 1.45, "revenue": 2.5, "employees": 5500, "specializations": ["Tanks", "K2", "Rail"], "founded_year": 1977, "headquarters": "Uiwang, South Korea", "website": "hyundai-rotem.com", "description": "Hyundai Rotem is South Korea's prime armored vehicle manufacturer and the developer of the K2 Black Panther — widely considered one of the most advanced main battle tanks in production. The K2 features an active protection system, 120mm smoothbore gun with auto-loader, and advanced composite armor. Poland ordered 1,000 K2/K2PL tanks in 2022 in the largest land armor contract of the post-Cold War era, establishing Hyundai Rotem as a tier-1 global MBT exporter alongside Germany's KNDS and South Korea's own armor cluster. Hyundai Rotem also produces railway rolling stock (KTX high-speed trains), creating a dual-use industrial base with significant scale advantages."},
    {"name": "Hanwha Defense", "ticker": "HWD-PRIV", "country": "South Korea", "market_cap": 4.5, "stock_price": 0, "change_percent": 0, "revenue": 2.2, "employees": 4800, "specializations": ["Land Systems", "K9", "Artillery"], "founded_year": 1952, "headquarters": "Seoul, South Korea", "website": "hanwha.com/defense", "funding_stage": "Private — Hanwha Group subsidiary", "description": "Hanwha Defense (now Hanwha Aerospace Land Systems) produces the K9 Thunder self-propelled howitzer — the world's most exported SPH, fielded by Australia, Estonia, Finland, India, Norway, Poland, and Romania — and the K21 infantry fighting vehicle. It represents South Korea's breakout as a top-tier global land systems exporter alongside Hyundai Rotem."},
    # === Japan ===
    {"name": "Mitsubishi Heavy Industries", "ticker": "7011.T", "country": "Japan", "market_cap": 45.6, "stock_price": 1234.56, "change_percent": 0.78, "revenue": 38.5, "employees": 82000, "specializations": ["Ships", "Aircraft", "Space", "Power"], "founded_year": 1884, "headquarters": "Tokyo, Japan", "website": "mhi.com", "description": "Mitsubishi Heavy Industries (MHI) is Japan's largest defense company and the prime contractor for Japan's most strategically significant military programs. Its defense division produces the F-2 fighter (F-16 derivative built domestically, 94 aircraft), co-develops the F-15J/DJ upgrade program, manufactures the Type 10 MBT, Type 12 surface-to-ship missiles, and Mitsubishi H-60 naval helicopters. In naval shipbuilding, MHI builds Atago-class Aegis destroyers and JS Maya-class air defense destroyers — Japan's most capable surface combatants. Most critically, MHI is prime contractor for Japan's F-X (6th-generation fighter) program alongside BAE Systems and Leonardo within the GCAP framework, representing Japan's most ambitious defense industrial endeavor in 70 years. Japan's removal of its 1% GDP defense spending cap since 2023 makes MHI a primary beneficiary of the most significant Japanese defense buildup since the Cold War."},
    {"name": "Kawasaki Heavy Industries", "ticker": "7012.T", "country": "Japan", "market_cap": 8.9, "stock_price": 456.78, "change_percent": 1.23, "revenue": 15.2, "employees": 36000, "specializations": ["Aircraft", "Ships", "Submarines"], "founded_year": 1896, "headquarters": "Tokyo, Japan", "website": "khi.co.jp", "description": "Kawasaki Heavy Industries (KHI) is Japan's second-largest defense company, with exceptional depth in maritime patrol aviation and submarine construction. Its P-1 maritime patrol aircraft is the world's only non-US purpose-built maritime patrol aircraft currently in production, operated exclusively by the JMSDF with superior anti-submarine warfare capabilities including the HPS-106 AESA radar. KHI also produces the C-2 strategic transport aircraft (successor to the C-1), OH-1 light observation helicopter, and AH-1S Cobra upgrades. In naval shipbuilding, KHI builds Soryu-class and the new Taigei-class AIP conventional submarines — among the quietest non-nuclear submarines in service. KHI is a critical partner in Japan's submarine industrial base, which produces 2-3 boats annually."},
    {"name": "IHI Corporation", "ticker": "7013.T", "country": "Japan", "market_cap": 6.5, "stock_price": 345.67, "change_percent": 0.45, "revenue": 12.8, "employees": 28000, "specializations": ["Engines", "Space", "Power"], "founded_year": 1853, "headquarters": "Tokyo, Japan", "website": "ihi.co.jp", "description": "IHI Corporation is Japan's leading aero-engine manufacturer and the primary engine supplier for Japan's current and future fighter programs. It produces the F110-IHI-129 turbofan under GE license for the F-2 fighter, and has developed the XF9-1 demonstrator engine for Japan's F-X 6th-generation fighter — a critical milestone in Japan's ambition for domestic engine sovereignty. IHI also manufactures H3 rocket engine components (LE-9 main engine), satellite propulsion systems, and nuclear power plant equipment. As Japan's most advanced aero-engine manufacturer, IHI is a cornerstone of the country's defense industrial independence and GCAP participation."},
    {"name": "Japan Steel Works", "ticker": "5631.T", "country": "Japan", "market_cap": 2.8, "stock_price": 2890.00, "change_percent": 0.67, "revenue": 2.5, "employees": 5200, "specializations": ["Artillery", "Components", "Machinery"], "founded_year": 1907, "headquarters": "Tokyo, Japan", "website": "jsw.co.jp", "description": "Japan Steel Works (JSW) occupies a unique strategic position as Japan's sole manufacturer of large-caliber artillery barrels and ordnance-quality forged steel components. It produces gun barrels for the Type 10 and Type 90 main battle tanks, 155mm howitzer barrels, and structural components for naval gun systems. JSW is also one of the world's very few manufacturers of large nuclear pressure vessel forgings — supplying reactor pressure vessels to nuclear power plants globally. This dual defense-nuclear indispensability, combined with extreme manufacturing barriers to entry, makes JSW one of the most strategically irreplaceable niche defense industrial firms in the Asia-Pacific."},
    # === India ===
    {"name": "Hindustan Aeronautics", "ticker": "HAL.NS", "country": "India", "market_cap": 52.8, "stock_price": 4567.89, "change_percent": 2.34, "revenue": 6.5, "employees": 28000, "specializations": ["Aircraft", "Helicopters", "Engines"], "founded_year": 1940, "headquarters": "Bengaluru, India", "website": "hal-india.co.in", "description": "Hindustan Aeronautics Limited (HAL) is India's national aerospace champion and one of the largest aerospace companies in Asia. It produces the Tejas Mk1A light combat aircraft — India's first domestically designed supersonic fighter, with 83+ on order — and manufactures Sukhoi Su-30MKI under license (272 aircraft, the world's largest Su-30 fleet). HAL produces the Dhruv Advanced Light Helicopter, ALH-WSI Rudra weaponized variant, and the LCH Prachand (Light Combat Helicopter), the world's highest-altitude deployed attack helicopter (proven at Siachen). The company is co-developing the AMCA (Advanced Medium Combat Aircraft), India's future 5th-generation stealth fighter. As India's defense self-reliance drive accelerates under 'Aatmanirbhar Bharat,' HAL is the prime instrument of India's ambition to eliminate major platform import dependence by 2035."},
    {"name": "Bharat Electronics", "ticker": "BEL.NS", "country": "India", "market_cap": 38.5, "stock_price": 289.45, "change_percent": 1.78, "revenue": 4.2, "employees": 13000, "specializations": ["Electronics", "Radar", "Communications"], "founded_year": 1954, "headquarters": "Bengaluru, India", "website": "bel-india.in", "description": "Bharat Electronics Limited (BEL) is India's premier defense public sector electronics company, supplying radar, communications, and C4I systems to all three Indian armed services. Key products include the ROHINI 3D tactical control radar, Ashwini air defense fire control radar, multi-function surveillance and threat alert radar (MFSTAR), battle management systems, and coastal surveillance chains. BEL is the primary supply partner for India's Akash surface-to-air missile system (ground electronics, launchers, and ECCM systems). With strong order books from India's coast guard modernization, Project 17A frigate radar suites, and Aatmanirbhar defense electronics mandates, BEL is the purest-play beneficiary of India's defense localization drive."},
    {"name": "Bharat Dynamics", "ticker": "BDL.NS", "country": "India", "market_cap": 8.5, "stock_price": 1234.56, "change_percent": 0.89, "revenue": 0.8, "employees": 3200, "specializations": ["Missiles", "Torpedoes", "ATGMs"], "founded_year": 1970, "headquarters": "Hyderabad, India", "website": "bel-india.in", "description": "Bharat Dynamics Limited (BDL) is India's sole manufacturer of guided missiles and underwater weapons, a 100% government-owned defense PSU. It produces the Konkurs and Milan anti-tank guided missiles under license (widely exported), the Astra beyond-visual-range air-to-air missile (India's first indigenous BVR AAM), the Varunastra heavyweight torpedo (indigenously developed, fitted to Scorpene and Shishumar submarines), and the Akash missile (integration and final assembly). BDL's order book has more than doubled since 2022 as India accelerates anti-drone systems procurement and ATGM replacement for the Indian Army — the world's largest army by personnel."},
    {"name": "Mazagon Dock", "ticker": "MAZDOCK.NS", "country": "India", "market_cap": 45.6, "stock_price": 4123.45, "change_percent": 3.45, "revenue": 2.5, "employees": 8500, "specializations": ["Naval", "Submarines", "Destroyers"], "founded_year": 1774, "headquarters": "Mumbai, India", "website": "mazdock.com", "description": "Mazagon Dock Shipbuilders (MDL) is India's premier naval shipyard and the sole domestic builder of submarines for the Indian Navy. It has delivered five of six Scorpene-class conventional submarines (Project 75) and is the prime for Project 75I — India's next 6-submarine program now expected to include air-independent propulsion (AIP). MDL also builds Visakhapatnam-class (Project 15B) guided missile destroyers — India's most capable surface combatants — and Nilgiri-class (Project 17A) stealth frigates. India's Naval expansion plan includes 200 new vessels by 2035, making MDL — along with GRSE and Garden Reach — the industrial backbone of Indian seapower growth."},
    {"name": "Cochin Shipyard", "ticker": "COCHINSHIP.NS", "country": "India", "market_cap": 28.9, "stock_price": 1567.89, "change_percent": 2.12, "revenue": 1.8, "employees": 4500, "specializations": ["Naval", "Aircraft Carriers"], "founded_year": 1972, "headquarters": "Kochi, India", "website": "cochinshipyard.com", "description": "Cochin Shipyard Limited (CSL) achieved a historic milestone as the builder of INS Vikrant (IAC-1) — India's first domestically designed and built aircraft carrier, commissioned in September 2022 at 45,000 tonnes. The Vikrant took 13 years to build and used 76% indigenous content, embedding India in the exclusive club of carrier-capable naval powers that also build their own flattops. CSL builds offshore patrol vessels, survey vessels, and landing craft for the Indian Navy and Coast Guard, and is expanding its commercial shipbuilding capacity. The government holds 72% of CSL, whose order book has grown sharply on India's coastal surveillance and naval expansion drive."},
    # === Australia ===
    {"name": "Austal", "ticker": "ASB.AX", "country": "Australia", "market_cap": 1.8, "stock_price": 2.89, "change_percent": 1.23, "revenue": 1.5, "employees": 5500, "specializations": ["Naval", "Shipbuilding", "LCS"], "founded_year": 1988, "headquarters": "Henderson, Australia", "website": "austal.com", "description": "Austal is Australia's leading naval shipbuilder and the only non-American company to build warships for the US Navy under a production contract. Its Henderson (WA) and Mobile (Alabama) yards have delivered 21 Independence-class Littoral Combat Ships for the US Navy in trimaran aluminum configuration — an engineering achievement unique in US naval history. Austal also builds Joint High Speed Vessels (EPF), and has contracts for Australian Navy Arafura-class offshore patrol vessels. Under AUKUS, Austal positions itself as a sovereign Australian industrial partner for submarine-related surface fleet work and is investing in expanded steelwork shipbuilding capability to build larger naval vessels required by Australia's defense strategic review."},
    {"name": "CEA Technologies", "ticker": "CEA-PRIV", "country": "Australia", "market_cap": 0.4, "stock_price": 0, "change_percent": 0, "revenue": 0.2, "employees": 500, "specializations": ["Radar", "Phased Array"], "founded_year": 1983, "headquarters": "Canberra, Australia", "website": "cea.com.au", "funding_stage": "Private — Australian government majority-owned", "description": "CEA Technologies is Australia's sovereign radar champion, developing CEAFAR2 — the world's first gallium nitride (GaN) active phased array naval combat system radar — fitted to RAN Hobart-class destroyers and Hunter-class frigates. CEA's land-based CEAFAR2-L system also delivers 360-degree active protection for ground forces."},
    # === Brazil ===
    {"name": "Embraer Defense", "ticker": "ERJ", "country": "Brazil", "market_cap": 6.8, "stock_price": 28.90, "change_percent": 1.56, "revenue": 1.8, "employees": 8000, "specializations": ["Aircraft", "KC-390", "UAV"], "founded_year": 1994, "headquarters": "Gavião Peixoto, Brazil", "website": "embraer.com/defense", "description": "Embraer Defense & Security is Brazil's leading defense aviation company and the defense arm of Embraer, the world's third-largest commercial jet maker. Its KC-390 twin-turbofan military transport is the most capable aircraft in its class by payload (26 tonnes), operated by Brazil, Portugal, Hungary, the Czech Republic, Austria, and the Netherlands — the first Brazilian military aircraft exported to NATO members. The EMB 314 Super Tucano light attack and advanced trainer has become the world's most successful light attack aircraft export, with 260+ delivered to 15+ air forces across Latin America, Africa, the Middle East, and Southeast Asia. Embraer's SISFRON border monitoring system and Radaz integrated air defense radar further cement Brazil's position as Latin America's pre-eminent defense industrial power."},
    {"name": "Avibras", "ticker": "AVIB-PRIV", "country": "Brazil", "market_cap": 0.4, "stock_price": 0, "change_percent": 0, "revenue": 0.2, "employees": 800, "specializations": ["Rockets", "MLRS", "ASTROS"], "founded_year": 1961, "headquarters": "São José dos Campos, Brazil", "website": "avibras.com.br", "funding_stage": "Private — Avibras family", "description": "Avibras is Brazil's premier rocket and missile system manufacturer, best known for the ASTROS II Multiple Launch Rocket System deployed by Brazil, Saudi Arabia, Iraq, and Qatar. Its ASTROS 2020 upgrade extends range to 300km. Avibras represents one of the few independent rocket system programs in Latin America, with growing export ambitions in the Middle East and Africa."},
    # === Canada ===
    {"name": "CAE Inc", "ticker": "CAE.TO", "country": "Canada", "market_cap": 8.5, "stock_price": 28.90, "change_percent": 0.45, "revenue": 4.2, "employees": 13000, "specializations": ["Simulation", "Training", "Healthcare"], "founded_year": 1947, "headquarters": "Montreal, Canada", "website": "cae.com", "description": "CAE is the global leader in defense simulation and military training systems, holding over 65% market share in military full-flight simulators. Its simulators are used to train pilots on virtually every frontline Western platform: F-35, C-17, C-130, F/A-18, CH-47, AH-64, P-8, and more, across 60+ air forces. CAE's Defence & Security segment trains military personnel across 40+ countries, including comprehensive F-35 pilot training programs for multiple NATO nations. Its Healthcare simulation division provides medical training technology for military combat casualty care. CAE's 75+ year track record, OEM-approved simulator fidelity, and massive installed base of 400+ military simulator suites worldwide make it effectively irreplaceable in allied defense pilot pipeline management."},
    {"name": "MDA Space", "ticker": "MDA.TO", "country": "Canada", "market_cap": 2.8, "stock_price": 14.56, "change_percent": 2.34, "revenue": 0.7, "employees": 3000, "specializations": ["Space", "Robotics", "Satellites"], "founded_year": 1969, "headquarters": "Brampton, Canada", "website": "mdaspace.com", "description": "MDA Space is Canada's premier space technology company, responsible for Canadarm2 (the robotic arm on the International Space Station since 2001) and Canadarm3 for the NASA Gateway lunar station. MDA's RADARSAT Constellation Mission provides Canada with all-weather, 24/7 satellite surveillance of its Arctic territory, coasts, and maritime approaches — a dual-use strategic capability. MDA designs satellite components and subsystems for commercial constellations and government reconnaissance satellites. As space defense spending surges globally, MDA's robotic systems, SAR intelligence capability, and space infrastructure expertise position it at the center of Canada's and NATO's space domain awareness ambitions."},
    # === Singapore ===
    {"name": "ST Engineering", "ticker": "S63.SI", "country": "Singapore", "market_cap": 12.5, "stock_price": 4.56, "change_percent": 0.89, "revenue": 8.5, "employees": 25000, "specializations": ["Aerospace", "Electronics", "Land Systems", "Marine"], "founded_year": 1967, "headquarters": "Singapore", "website": "stengg.com", "description": "ST Engineering is Singapore's strategic defense and technology conglomerate, encompassing aerospace MRO (the world's 3rd largest military aerospace MRO provider), defense electronics, land systems, and marine. Its Aerospace division maintains and upgrades military aircraft for over 30 air forces, including F-16, C-130, and A330 platforms. ST Kinetics produces the Singapore Army's Bionix IFV, Terrex APC, Ultimax 100 light machine gun (in service across 30+ militaries), and the 155mm PEGASUS lightweight howitzer. The electronics division delivers SENTRY-H radar systems, tactical C2 systems, and naval combat management. Following acquisitions of TransDev (bus tech) and Newtec (satellite communications), ST Engineering has become one of Southeast Asia's largest technology companies with a defense DNA."},
    # === UAE ===
    {"name": "EDGE Group", "ticker": "EDGE-PRIV", "country": "UAE", "market_cap": 8.5, "stock_price": 0, "change_percent": 0, "revenue": 5.5, "employees": 25000, "specializations": ["Missiles", "UAV", "Cyber", "Munitions"], "founded_year": 2019, "headquarters": "Abu Dhabi, UAE", "website": "edgegroup.ae", "funding_stage": "Private — State-owned (Abu Dhabi)", "description": "EDGE Group is the UAE's defense technology conglomerate formed in 2019 by merging 25 entities under Abu Dhabi state ownership. It develops autonomous systems (Halcon precision-guided munitions, HAVEN loitering munition), cyber solutions, guided missiles, and smart ammunition. With $5B+ annual revenue and exports across 30+ countries, EDGE has rapidly elevated the UAE as a significant arms-producing nation."},
    # === Poland ===
    {"name": "Polska Grupa Zbrojeniowa", "ticker": "PGZ-PRIV", "country": "Poland", "market_cap": 2.5, "stock_price": 0, "change_percent": 0, "revenue": 1.8, "employees": 17000, "specializations": ["Land Systems", "Naval", "Ammunition"], "founded_year": 2014, "headquarters": "Warsaw, Poland", "website": "pgzsa.pl", "funding_stage": "Private — State-owned (Polish MoD)", "description": "PGZ (Polish Armaments Group) is Poland's state-owned defense industrial conglomerate comprising 61 companies producing armored vehicles (Borsuk IFV, Rosomak APC), naval patrol vessels, howitzers (Krab), ammunition, and radar systems. Amid Poland's record $30B+ defense procurement wave, PGZ plays a central role in developing domestic defense capacity and meeting NATO obligations."},
    {"name": "WB Electronics", "ticker": "WBE.WA", "country": "Poland", "market_cap": 0.8, "stock_price": 145.67, "change_percent": 1.23, "revenue": 0.3, "employees": 1200, "specializations": ["UAV", "Communications", "Electronics"], "founded_year": 1997, "headquarters": "Ożarów Mazowiecki, Poland", "website": "wbgroup.pl", "description": "WB Electronics is Poland's leading defense technology company and one of the few European manufacturers of loitering munitions. Its WARMATE tactical loitering munition (kamikaze drone) has been combat-proven in Ukraine and purchased by over a dozen armed forces. The FlyEye tactical reconnaissance UAV provides battalion-level ISR for Polish, Moroccan, and Ukrainian forces. WB Group also produces BattleSwarm drone-swarm control software, software-defined radio communication systems (PR4G-V3 compatible), and battlefield management C2 platforms. As Poland undergoes the largest European military modernization program in NATO — €100B+ committed through 2035 — WB Electronics is a key domestic technology beneficiary."},
    # === Czech Republic ===
    {"name": "Czechoslovak Group", "ticker": "CSG-PRIV", "country": "Czech Republic", "market_cap": 2.8, "stock_price": 0, "change_percent": 0, "revenue": 1.5, "employees": 8500, "specializations": ["Land Systems", "Aircraft", "Ammunition"], "founded_year": 2012, "headquarters": "Prague, Czech Republic", "website": "czechoslovakgroup.cz", "funding_stage": "Private — Michal Strnad (owner)", "description": "CSG is Central Europe's largest private defense group, comprising 30+ companies producing Tatra military trucks, VOP CZ armored vehicles, Excalibur Army artillery, and a broad ammunition portfolio. Post-2022, CSG has emerged as a key supplier of Soviet-compatible ammunition to Ukraine and Eastern NATO members, with revenue doubling on record demand."},
    {"name": "Aero Vodochody", "ticker": "AERO-PRIV", "country": "Czech Republic", "market_cap": 0.5, "stock_price": 0, "change_percent": 0, "revenue": 0.3, "employees": 1800, "specializations": ["Aircraft", "L-39", "Training"], "founded_year": 1919, "headquarters": "Odolena Voda, Czech Republic", "website": "aero.cz", "funding_stage": "Private — Penta Investments", "description": "Aero Vodochody is Central Europe's only combat aircraft manufacturer, producing the L-39NG jet trainer for 8 air forces including Czech Republic, Slovakia, and Senegal. The L-159 ALCA light combat aircraft serves the Czech Air Force. Aero is also a major aerostructures subcontractor for Airbus, Boeing, and SAAB."},
    # === Switzerland ===
    {"name": "RUAG", "ticker": "RUAG-PRIV", "country": "Switzerland", "market_cap": 1.8, "stock_price": 0, "change_percent": 0, "revenue": 1.5, "employees": 6500, "specializations": ["Aviation", "Space", "Ammunition"], "founded_year": 1999, "headquarters": "Bern, Switzerland", "website": "ruag.com", "funding_stage": "Private — Swiss Confederation (100%)", "description": "RUAG is Switzerland's state technology group spanning aerospace MRO (Swiss Air Force F/A-18 and F-35 maintenance), space (satellite structures for Ariane 6, ESA missions), and defense electronics. Its Ammotec division is one of Europe's largest small-caliber ammunition producers, supplying Swiss, German, and international military and law enforcement customers."},
    {"name": "Pilatus Aircraft", "ticker": "PILA-PRIV", "country": "Switzerland", "market_cap": 2.5, "stock_price": 0, "change_percent": 0, "revenue": 1.2, "employees": 2400, "specializations": ["Aircraft", "PC-21", "Training"], "founded_year": 1939, "headquarters": "Stans, Switzerland", "website": "pilatus-aircraft.com", "funding_stage": "Private — employee and family-owned", "description": "Pilatus Aircraft is Switzerland's premium military and business aircraft manufacturer. The PC-21 turboprop trainer is operated by 13 air forces including Australia, Saudi Arabia, Switzerland, and Singapore. Its PC-24 jet and PC-12 turboprop serve special mission and VIP roles. Entirely employee and family-owned, Pilatus is one of the last independent aircraft OEMs in Europe."},
    # === Netherlands ===
    {"name": "Damen Shipyards", "ticker": "DAME-PRIV", "country": "Netherlands", "market_cap": 2.8, "stock_price": 0, "change_percent": 0, "revenue": 2.5, "employees": 12000, "specializations": ["Naval", "Shipbuilding", "Offshore"], "founded_year": 1927, "headquarters": "Gorinchem, Netherlands", "website": "damen.com", "funding_stage": "Private — Damen family", "description": "Damen Shipyards is the world's leading modular shipbuilder, operating 35 shipyards across 5 continents. Naval programs include frigates for Netherlands, Belgium, and Luxembourg (FREMEN project), OPVs for the Dutch Caribbean Coast Guard, and coast guard vessels for 30+ nations. Damen's standardized platform approach enables rapid naval construction at competitive cost, making it a key NATO industrial partner."},
    # === Belgium ===
    {"name": "FN Herstal", "ticker": "FN-PRIV", "country": "Belgium", "market_cap": 1.2, "stock_price": 0, "change_percent": 0, "revenue": 0.8, "employees": 2800, "specializations": ["Small Arms", "Weapons Systems"], "founded_year": 1889, "headquarters": "Herstal, Belgium", "website": "fnherstal.com", "funding_stage": "Private — Walloon Region (100% via Groupe Herstal)", "description": "FN Herstal is Belgium's legendary small arms manufacturer producing the FN SCAR assault rifle, FN P90 personal defense weapon, FN MAG machine gun, FN Minimi light machine gun, and M249 SAW. Standard issue across US SOCOM, NATO forces, and 100+ militaries worldwide, FN Herstal has defined NATO small arms interoperability for a century and remains one of the few full-spectrum military small arms manufacturers."},
    {"name": "John Cockerill Defense", "ticker": "JCD-PRIV", "country": "Belgium", "market_cap": 1.4, "stock_price": 0, "change_percent": 0, "revenue": 0.8, "employees": 3000, "specializations": ["Turrets", "Military Vehicles", "Armored Vehicles", "Land Systems"], "founded_year": 1979, "headquarters": "Liège, Belgium", "website": "john-cockerill.com", "funding_stage": "Private — John Cockerill Group subsidiary", "aliases": ["CMI Defence", "Arquus", "Cockerill"], "description": "John Cockerill Defense (formerly CMI Defence) is the land-systems arm of Belgium's John Cockerill Group. It develops large-calibre turrets and weapon stations — the Cockerill 3000 series and the CT-CV 105HP — fitted to wheeled and tracked armored vehicles in Belgium, Brazil, Malaysia and Morocco. In 2024–2025 it acquired Arquus (formerly Renault Trucks Defense) from Volvo Group, folding in France's prime land-vehicle supplier: the Griffon and Serval SCORPION armored vehicles, the Sherpa and tactical trucks, and through-life support for 28,000+ French Army vehicles. The combination creates a Franco-Belgian land-defence group spanning turrets, vehicles and sustainment, exporting to 50+ countries."},
    # === Finland ===
    {"name": "Patria", "ticker": "PATR-PRIV", "country": "Finland", "market_cap": 1.5, "stock_price": 0, "change_percent": 0, "revenue": 0.7, "employees": 3000, "specializations": ["Land Systems", "AMV", "Aviation"], "founded_year": 1921, "headquarters": "Helsinki, Finland", "website": "patriagroup.com", "funding_stage": "Private — Finnish MoD 50%, Kongsberg Defence 50%", "description": "Patria is Finland's prime defense company producing the Patria AMV wheeled armored vehicle (exported to 10+ nations including Poland, South Africa, and UAE), NEMO 120mm mortar system, and AMOS twin-barrel mortar. Patria also manages Finnish Air Force F/A-18 and F-35 maintenance and co-owns Nammo (Nordic ammunition). Its joint venture with Kongsberg Defence makes Patria a key Nordic defense industrial axis."},
    # === South Africa ===
    {"name": "Denel", "ticker": "DENE-PRIV", "country": "South Africa", "market_cap": 0.5, "stock_price": 0, "change_percent": 0, "revenue": 0.3, "employees": 3500, "specializations": ["Land Systems", "Missiles", "Aviation"], "founded_year": 1968, "headquarters": "Centurion, South Africa", "website": "denel.co.za", "funding_stage": "State-owned — South African Government", "description": "Denel is South Africa's state-owned defense industrial company and the primary supplier to the South African National Defence Force. Its portfolio spans the G5/G6 self-propelled howitzers (exported to 12+ nations), the Rooivalk combat helicopter, the Umkhonto surface-to-air missile, and the ZT-35 Ingwe ATGM. Denel has faced severe financial restructuring since 2017 due to mismanagement; recovery programs are ongoing with government recapitalization support."},
    {"name": "Paramount Group", "ticker": "PARA-PRIV", "country": "South Africa", "market_cap": 0.8, "stock_price": 0, "change_percent": 0, "revenue": 0.4, "employees": 2000, "specializations": ["Land Systems", "Naval", "Aviation"], "founded_year": 1994, "headquarters": "Johannesburg, South Africa", "website": "paramountgroup.com", "funding_stage": "Private", "description": "Paramount Group is a privately owned African defense and aerospace company operating globally from South Africa. It produces the Matador family of armored vehicles (used by multiple African and Middle Eastern militaries), the Mwari light aircraft, and offers turnkey defense industrial solutions. Paramount has pioneered a unique model of establishing local defense manufacturing partnerships ('industrial cooperation') in Africa, the Middle East, and Eastern Europe, including a joint venture in Kazakhstan and a manufacturing facility in Ethiopia."},
    # === Ukraine ===
    {"name": "Ukroboronprom", "ticker": "UKR-PRIV", "country": "Ukraine", "market_cap": 3.2, "stock_price": 0, "change_percent": 0, "revenue": 3.8, "employees": 95000, "specializations": ["Land Systems", "Aircraft", "Missiles", "Naval"], "company_type": "cluster", "founded_year": 2010, "headquarters": "Kyiv, Ukraine", "website": "ukroboronprom.com", "funding_stage": "State-owned — Ukrainian Government", "description": "Ukroboronprom is Ukraine's state defense industrial conglomerate, comprising over 130 enterprises spanning armored vehicle production (BTR-4, BMP-2 modernization), aircraft repair (MiG-29, Su-27), naval vessels, and missile systems. Since Russia's 2022 full-scale invasion, Ukroboronprom has dramatically accelerated domestic weapons production, including artillery shells, drones, and FPV systems. It is the backbone of Ukraine's wartime industrial capacity and is undergoing structural reforms to attract Western investment and joint ventures."},
    {"name": "Antonov", "ticker": "ANTN-PRIV", "country": "Ukraine", "market_cap": 0.9, "stock_price": 0, "change_percent": 0, "revenue": 0.4, "employees": 6000, "specializations": ["Transport Aircraft", "An-178", "An-132"], "founded_year": 1946, "headquarters": "Kyiv, Ukraine", "website": "antonov.com", "funding_stage": "State-owned — part of Ukroboronprom", "description": "Antonov is a Ukrainian aircraft design bureau and manufacturer, historically one of the world's leading producers of large military transport aircraft. Its An-124 Ruslan and the legendary An-225 Mriya (destroyed in 2022) were the largest aircraft in service. Today Antonov focuses on the An-178 medium tactical transport and An-132 light transport, both positioned for export to Middle Eastern and African customers. As part of Ukroboronprom, Antonov is central to Ukraine's post-war defense industrial reconstruction plans."},
    {"name": "UkrSpecSystems", "ticker": "USS-PRIV", "country": "Ukraine", "market_cap": 0.3, "stock_price": 0, "change_percent": 0, "revenue": 0.15, "employees": 400, "specializations": ["UAV", "Leleka-100", "PD-2", "ISR"], "founded_year": 2014, "headquarters": "Kyiv, Ukraine", "website": "ukrspecsystems.com", "funding_stage": "Private", "description": "UkrSpecSystems develops medium-altitude long-endurance (MALE) UAVs for reconnaissance and ISR missions. Its Leleka-100 fixed-wing system provides 5+ hour endurance for frontline battlefield awareness, and the PD-2 MALE drone operates at extended range for corps-level intelligence collection. Both platforms have seen extensive operational use by Ukrainian armed forces since 2014, and the company has rapidly scaled production since Russia's full-scale 2022 invasion."},
    {"name": "Skyeton", "ticker": "SKYT-PRIV", "country": "Ukraine", "market_cap": 0.2, "stock_price": 0, "change_percent": 0, "revenue": 0.08, "employees": 150, "specializations": ["Loitering Munitions", "UAV", "Raybird-3"], "founded_year": 2016, "headquarters": "Kharkiv, Ukraine", "website": "skyeton.com", "funding_stage": "Private", "description": "Skyeton produces the Raybird-3, a long-endurance fixed-wing reconnaissance UAV designed for persistent battlefield surveillance. The Raybird-3 features a 20+ hour endurance and twin-boom pusher configuration optimized for covert ISR over contested territory. Skyeton systems have been deployed extensively in eastern Ukraine and exported to NATO allies evaluating Ukraine-derived UAV solutions."},
    {"name": "Kvertus", "ticker": "KVER-PRIV", "country": "Ukraine", "market_cap": 0.15, "stock_price": 0, "change_percent": 0, "revenue": 0.06, "employees": 120, "specializations": ["Counter-UAS", "Drone Jamming", "Electronic Warfare"], "founded_year": 2016, "headquarters": "Ivano-Frankivsk, Ukraine", "website": "kvertus.com.ua", "funding_stage": "Private", "description": "Kvertus specializes in portable electronic warfare systems for counter-drone operations. Its KVS G-6 and similar man-portable jammers disable commercial drone data links and GPS navigation, and have become essential equipment for Ukrainian infantry units. Kvertus has supplied thousands of systems to Ukrainian forces and is drawing interest from NATO countries seeking proven, combat-tested counter-UAS EW solutions."},
    {"name": "LUCH Design Bureau", "ticker": "LUCH-PRIV", "country": "Ukraine", "market_cap": 0.4, "stock_price": 0, "change_percent": 0, "revenue": 0.2, "employees": 1200, "specializations": ["Missiles", "Stugna-P ATGM", "Vilkha MLRS"], "founded_year": 1965, "headquarters": "Kyiv, Ukraine", "website": "luch.kiev.ua", "funding_stage": "State-owned — part of Ukroboronprom", "description": "KB Luch (Luch Design Bureau) is Ukraine's premier missile and guided weapons developer. Its Stugna-P ATGM (anti-tank guided missile) became globally recognized after achieving dramatic kills of Russian tanks in 2022, demonstrating precision beyond its price class. Luch also developed the Vilkha precision-guided MLRS rocket system and the R-360 Neptune anti-ship cruise missile, which achieved the historic sinking of the Russian cruiser Moskva in April 2022. The Neptune has since been upgraded for land-attack missions with a reported range of 400+ km, targeting Russian logistics hubs. The Stugna-P has achieved over 3,000 confirmed vehicle kills in Ukrainian service per Oryx open-source documentation."},
    {"name": "Infozahyst", "ticker": "INFZ-PRIV", "country": "Ukraine", "market_cap": 0.12, "stock_price": 0, "change_percent": 0, "revenue": 0.05, "employees": 200, "specializations": ["Electronic Warfare", "Signals Intelligence", "EW Systems"], "founded_year": 2010, "headquarters": "Kyiv, Ukraine", "website": "infozahyst.ua", "funding_stage": "Private", "description": "Infozahyst develops electronic warfare and signals intelligence systems for the Ukrainian armed forces. Its portfolio includes signal detection and classification systems for tactical EW, direction-finding equipment, and communication jamming platforms. Since 2022, Infozahyst has been a key supplier of frontline EW capabilities to counter Russian drone communications and artillery spotting systems."},
    {"name": "Motor Sich", "ticker": "MSICH-PRIV", "country": "Ukraine", "market_cap": 0.6, "stock_price": 0, "change_percent": 0, "revenue": 0.35, "employees": 11000, "specializations": ["Helicopter Engines", "Aircraft Engines", "Turbines"], "founded_year": 1907, "headquarters": "Zaporizhzhia, Ukraine", "website": "motorsich.com", "funding_stage": "Private (contested — attempted Chinese acquisition blocked)", "description": "Motor Sich is one of the world's largest manufacturers of aircraft engines and gas turbine engines, historically the primary engine supplier for Soviet-era helicopters and aircraft. Its TV3-117 and D-136 turboshaft engines power the Mi-8, Mi-24/35, Ka-32, and An-124 families globally. The company became geopolitically significant when a Chinese (Skyrizon) acquisition attempt was blocked by Ukraine in 2021 under US pressure. Currently operating under wartime conditions, Motor Sich is critical for Ukrainian helicopter fleet maintenance."},
    {"name": "Tencore", "ticker": "TENCORE-PRIV", "country": "Ukraine", "market_cap": 0.1, "stock_price": 0, "change_percent": 0, "revenue": 0.04, "employees": 80, "specializations": ["UAV", "FPV Drones", "Autonomous Systems"], "founded_year": 2022, "headquarters": "Kyiv, Ukraine", "website": "tencore.com.ua", "funding_stage": "Private", "description": "Tencore is a Ukrainian FPV (first-person view) combat drone startup founded during the 2022 war. It produces low-cost, high-volume FPV kamikaze drones for direct attack missions against Russian armored vehicles and personnel. FPV drones from companies like Tencore have fundamentally changed tactical warfare, with Ukraine deploying thousands monthly. The company has received investment from Ukrainian defense funds and diaspora networks."},
    {"name": "Ukrainian Armor", "ticker": "UA-ARMOR-PRIV", "country": "Ukraine", "market_cap": 0.18, "stock_price": 0, "change_percent": 0, "revenue": 0.08, "employees": 350, "specializations": ["Armored Vehicles", "APC", "Ballistic Protection"], "founded_year": 2014, "headquarters": "Kyiv, Ukraine", "website": "ua-armor.com", "funding_stage": "Private", "description": "Ukrainian Armor produces armored personnel carriers and ballistic protection systems for Ukrainian armed forces. Its vehicles include the Varta and Kozak APC families, designed for mine and IED protection in the Donbas conflict environment. Since 2022, Ukrainian Armor has dramatically scaled production to meet wartime demand, supplying protected mobility to Ukrainian territorial defense units and regular army brigades."},
    # === Saudi Arabia ===
    {"name": "SAMI", "ticker": "SAMI-PRIV", "country": "Saudi Arabia", "market_cap": 5.5, "stock_price": 0, "change_percent": 0, "revenue": 1.8, "employees": 8000, "specializations": ["Aviation", "Land Systems", "Missiles"], "founded_year": 2017, "headquarters": "Riyadh, Saudi Arabia", "website": "sami.com.sa", "funding_stage": "State-owned — Saudi Government (PIF)", "description": "Saudi Arabian Military Industries (SAMI) is the Kingdom's state defense champion, established as part of Vision 2030 to build a domestic defense industry and reduce import dependence. SAMI acts as a holding company for joint ventures with global primes including BAE Systems, Raytheon, Navantia, and Airbus. Its portfolio spans military aerospace MRO (Saudia Aerospace Engineering, joint venture with Raytheon), ammunition, land vehicles, and command systems. SAMI targets 50% domestic defense spending localization by 2030."},
    # === China (Public info only) ===
    {"name": "AVIC", "ticker": "AVIC-PRIV", "country": "China", "market_cap": 85.6, "stock_price": 0, "change_percent": 0, "revenue": 72.5, "employees": 450000, "specializations": ["Aircraft", "Helicopters", "Engines", "Systems"], "founded_year": 2008, "headquarters": "Beijing, China", "website": "avic.com", "funding_stage": "State-owned — SASAC", "description": "Aviation Industry Corporation of China (AVIC) is China's dominant aerospace and defense conglomerate, responsible for virtually all military aircraft in the People's Liberation Army Air Force (PLAAF) and Navy. Its programs include the J-20 stealth fighter (China's first 5th-generation aircraft), J-35 carrier-based stealth fighter, Y-20 strategic transport, Z-20 utility helicopter (comparable to Black Hawk), and the COMAC C919 commercial jet. AVIC comprises over 100 subsidiaries and controls the entire Chinese military aircraft development and supply chain."},
    {"name": "NORINCO", "ticker": "NORI-PRIV", "country": "China", "market_cap": 45.6, "stock_price": 0, "change_percent": 0, "revenue": 52.3, "employees": 320000, "specializations": ["Land Systems", "Artillery", "Missiles"], "founded_year": 1980, "headquarters": "Beijing, China", "website": "norincogroup.com.cn", "funding_stage": "State-owned — SASAC", "description": "China North Industries Group Corporation (NORINCO) is China's largest ground-force defense manufacturer and a major global arms exporter. Its portfolio spans main battle tanks (Type 96, Type 99A), self-propelled artillery (PLZ-05), anti-tank missiles, infantry fighting vehicles, and small arms. NORINCO is also China's primary supplier of artillery shells and battlefield vehicles. Internationally, NORINCO exports to over 100 countries, making it one of the world's largest arms exporters by volume, with strong market positions in Africa, South Asia, and the Middle East."},
    {"name": "CSSC", "ticker": "600150.SS", "country": "China", "market_cap": 28.5, "stock_price": 25.67, "change_percent": 1.23, "revenue": 38.5, "employees": 180000, "specializations": ["Naval", "Shipbuilding", "Marine"], "founded_year": 1999, "headquarters": "Shanghai, China", "website": "cssc.net.cn", "description": "China State Shipbuilding Corporation (CSSC) is the world's largest shipbuilding group by tonnage, formed by the 2019 merger of CSSC and CSIC (China Shipbuilding Industry Corporation). Its naval programs represent the most rapid expansion of any navy since World War II: Type 055 10,000-ton guided missile destroyers (the most capable PLAN surface combatants), Type 075 and 076 amphibious assault ships, Type 096 ballistic missile submarines, and the Fujian-class (003) carrier — China's first electromagnetic catapult aircraft carrier. On the commercial side, CSSC builds the world's largest container ships, LNG tankers, and bulk carriers, providing industrial scale that cross-subsidizes naval construction. CSSC's combined output now exceeds that of the entire US shipbuilding industry by volume."},
    # === Russia (Public info only) ===
    {"name": "Rostec", "ticker": "ROST-PRIV", "country": "Russia", "market_cap": 45.6, "stock_price": 0, "change_percent": 0, "revenue": 28.5, "employees": 590000, "specializations": ["Aircraft", "Helicopters", "Electronics", "Weapons"], "founded_year": 2007, "headquarters": "Moscow, Russia", "website": "rostec.ru", "funding_stage": "State-owned — Russian Federation", "description": "Rostec (Rostekhnologii) is Russia's largest state defense-industrial holding, encompassing over 700 subsidiaries across 14 clusters. It controls Russian Helicopters (Mi-28, Ka-52), United Engine Corporation (RD-33, PD-14), KRET (electronic warfare systems), Kalashnikov Concern (AK-47 family, drones), and Uralvagonzavod (T-90M main battle tank). Since 2022, Rostec has dramatically increased production of missiles (Iskander, Kalibr), shells, and kamikaze drones to sustain Russia's war in Ukraine, operating under extensive Western sanctions."},
    {"name": "United Aircraft Corporation", "ticker": "UAC-PRIV", "country": "Russia", "market_cap": 12.5, "stock_price": 0, "change_percent": 0, "revenue": 8.5, "employees": 98000, "specializations": ["Aircraft", "Sukhoi", "MiG"], "founded_year": 2006, "headquarters": "Moscow, Russia", "website": "uacrussia.ru", "funding_stage": "State-owned — Rostec subsidiary", "description": "United Aircraft Corporation (UAC/OAK) is Russia's consolidated fixed-wing military aircraft manufacturer, a Rostec subsidiary grouping the Sukhoi (Su-35, Su-57 Felon 5th-gen fighter), MiG (MiG-35), Ilyushin (Il-76 transport, Il-78 tanker), and Tupolev (Tu-160 strategic bomber, Tu-22M3) design bureaux. UAC produces and maintains virtually all Russian Air-Space Forces combat aircraft. Under sanctions since 2022, UAC faces severe supply chain disruptions but continues prioritized production of Su-35 and Su-57 aircraft."},
    {"name": "Almaz-Antey", "ticker": "ALMA-PRIV", "country": "Russia", "market_cap": 15.6, "stock_price": 0, "change_percent": 0, "revenue": 8.9, "employees": 130000, "specializations": ["Air Defense", "S-400", "Missiles"], "founded_year": 2002, "headquarters": "Moscow, Russia", "website": "almaz-antey.ru", "funding_stage": "State-owned — Russian Federation", "description": "Almaz-Antey is Russia's premier air and missile defense conglomerate, responsible for the S-300, S-400 Triumf, and S-500 Prometheus long-range surface-to-air missile systems — considered among the world's most capable ground-based air defense. It also produces the short-range Tor-M2 and Pantsir-S1 air defense systems. S-400 sales to China (2015) and Turkey (2019, triggering NATO tensions) represent its most high-profile export transactions. Under broad Western sanctions since 2022, Almaz-Antey continues domestic production to replace losses in Ukraine."},
    # === More US Companies ===
    {"name": "Sierra Nevada Corporation", "ticker": "SNC-PRIV", "country": "USA", "market_cap": 3.5, "stock_price": 0, "change_percent": 0, "revenue": 2.8, "employees": 4500, "specializations": ["Space", "Aircraft", "Electronics"], "founded_year": 1963, "headquarters": "Sparks, NV, USA", "website": "sncorp.com", "funding_stage": "Private — Fatih and Eren Ozmen (family-owned)", "description": "Sierra Nevada Corporation (SNC) is a privately owned aerospace and defense company best known for Dream Chaser, a NASA-contracted reusable spaceplane designed to ferry cargo to the ISS. SNC also produces the Combat Survivor Evader Locator (CSEL) communications device, Freedom spacecraft components, and ISR/electronic warfare systems. A rare major US defense prime that remains privately held, SNC is owned by Turkish-American billionaires Fatih and Eren Ozmen, who have built it into a multi-billion dollar enterprise without outside capital."},
    {"name": "CACI International", "ticker": "CACI", "country": "USA", "market_cap": 10.2, "stock_price": 385.67, "change_percent": 1.23, "revenue": 7.1, "employees": 23000, "specializations": ["IT", "Intelligence", "Cyber"], "founded_year": 1962, "headquarters": "Reston, VA, USA", "website": "caci.com", "description": "CACI International is one of the US government's leading IT and national security services firms, with particular depth in signals intelligence (SIGINT), electronic warfare support, and intelligence analysis for the US Army, Navy, and intelligence community. CACI's mission solutions include ISR systems, C4ISR integration, cybersecurity operations, and mission analytics. The company gained public visibility through Abu Ghraib — where contracted CACI personnel were among those implicated — but has since built a track record as a premier DoD enterprise IT and battlefield intelligence contractor. CACI's Agile Solutions business develops software for DoD acquisition and logistics modernization, positioning it well for the Pentagon's digital transformation wave."},
    {"name": "ManTech International", "ticker": "MANT", "country": "USA", "market_cap": 4.5, "stock_price": 96.78, "change_percent": 0.45, "revenue": 2.8, "employees": 9500, "specializations": ["IT", "Cyber", "Intelligence"], "founded_year": 1968, "headquarters": "Herndon, VA, USA", "website": "mantech.com", "description": "ManTech International is a premier US national security technology firm providing cyber operations, intelligence systems, and mission IT solutions to DoD and intelligence community customers. Its capabilities span multi-domain operations support, defensive cyber operations, mission-critical enterprise IT, and intelligence analysis automation. ManTech was taken private by Carlyle Group in a $4.2B acquisition in 2022, reflecting strong PE conviction in the US government services market. Key customers include SOCOM, the intelligence community's largest agencies, and DARPA programs requiring rapid prototyping of advanced cyber and data capabilities."},
    {"name": "Peraton", "ticker": "PERA-PRIV", "country": "USA", "market_cap": 8.5, "stock_price": 0, "change_percent": 0, "revenue": 7.5, "employees": 22000, "specializations": ["IT", "Space", "Intelligence"], "founded_year": 2017, "headquarters": "Herndon, VA, USA", "website": "peraton.com", "funding_stage": "Private — Veritas Capital (PE)", "description": "Peraton is a leading US national security technology company, created through Veritas Capital's acquisition of Harris Corporation's government IT services division in 2017 and subsequent merger with Perspecta in 2021. It provides mission-critical IT, cybersecurity, communications, and intelligence solutions to the US intelligence community, DoD, and civilian agencies. Peraton holds some of the US government's largest IT services contracts across NSA, NGA, NASA, and the US Army, making it one of the most important private defense IT companies not publicly traded."},
    {"name": "Honeywell Aerospace", "ticker": "HON", "country": "USA", "market_cap": 42.8, "stock_price": 0, "change_percent": 0, "revenue": 12.5, "employees": 38000, "specializations": ["Avionics", "Engines", "Systems"], "founded_year": 1906, "headquarters": "Charlotte, NC, USA", "website": "aerospace.honeywell.com", "description": "Honeywell Aerospace is the defense and commercial aviation division of Honeywell International, and one of the world's leading suppliers of avionics, propulsion, and mission systems. In defense, Honeywell supplies avionics for the B-21 Raider stealth bomber, auxiliary power units for F-35, T55 turboshaft engines for CH-47 Chinook helicopters, TPE331 turboprops for military ISR platforms, and inertial navigation systems embedded in missiles and aircraft globally. Its avionics and flight management systems are installed on thousands of military aircraft worldwide. Honeywell is also a leading supplier of satellite communications terminals, advanced GPS receivers, and directed-energy system components, making its defense revenue effectively multi-domain across air, space, and electronic warfare."},
    {"name": "Moog Inc", "ticker": "MOG-A", "country": "USA", "market_cap": 4.5, "stock_price": 138.90, "change_percent": 0.56, "revenue": 3.2, "employees": 13000, "specializations": ["Components", "Actuators", "Space"], "founded_year": 1951, "headquarters": "East Aurora, NY, USA", "website": "moog.com", "description": "Moog Inc is the world's leading manufacturer of precision motion control components for defense and space applications — a narrow but completely irreplaceable position in the weapons supply chain. Its electromechanical actuators control the flight surfaces of virtually every US tactical missile, including AMRAAM, JASSM, Sidewinder, Standard Missile, and Hellfire. In space, Moog produces satellite propulsion systems, solar array drives, and spacecraft actuators. For aircraft, Moog supplies primary flight control actuators for F-35 (all three variants), B-2 Spirit, and E-2D Hawkeye. The company's proprietary actuator technology, combined with deep qualification history in critical weapons applications, makes it one of defense's most durable component moats."},
    {"name": "HEICO Corporation", "ticker": "HEI", "country": "USA", "market_cap": 28.5, "stock_price": 198.45, "change_percent": 1.23, "revenue": 2.8, "employees": 9000, "specializations": ["Components", "MRO", "Electronics"], "founded_year": 1957, "headquarters": "Hollywood, FL, USA", "website": "heico.com", "description": "HEICO Corporation is the world's leading independent manufacturer of FAA-approved PMA (Parts Manufacturer Approval) replacement parts for commercial and military aircraft — producing certified aircraft components at 30–40% below OEM prices. Its Flight Support Group sells over 10,000 PMA part types for engines, airframes, and avionics. HEICO's Electronic Technologies Group (ETG) produces military-grade electronic components, mission computers, and EW subsystems for DoD platforms including F-35, F/A-18, B-52, and AH-64. HEICO's model of acquiring niche aerospace parts manufacturers and growing organically through certified alternative parts has produced one of the most consistent long-term track records in US aerospace equity — 30+ consecutive years of dividend increases."},
    {"name": "Kaman Aerospace", "ticker": "KAMN", "country": "USA", "market_cap": 1.2, "stock_price": 38.90, "change_percent": 0.23, "revenue": 0.7, "employees": 2800, "specializations": ["Helicopters", "Structures", "Bearings"], "founded_year": 1945, "headquarters": "Bloomfield, CT, USA", "website": "kaman.com", "description": "Kaman Aerospace is a US aerospace manufacturer with a unique portfolio spanning helicopter systems, composite structures, and aerospace bearings. It is the inventor of the intermeshing rotor helicopter concept and produces the K-MAX — the world's only purpose-built unmanned cargo helicopter, used by the US Marine Corps for resupply operations in Afghanistan (the first unmanned logistics aircraft in combat). Kaman manufactures composite fuselage and rotor assemblies for multiple platforms and is a major producer of aircraft bearings and other precision components. Its distribution arm (Kaman Distribution) is one of North America's largest suppliers of industrial bearings and power transmission components."},
    {"name": "Spirit AeroSystems", "ticker": "SPR", "country": "USA", "market_cap": 3.2, "stock_price": 31.23, "change_percent": -1.56, "revenue": 5.4, "employees": 18000, "specializations": ["Aerostructures", "Components"], "founded_year": 2005, "headquarters": "Wichita, KS, USA", "website": "spiritaero.com", "description": "Spirit AeroSystems is the world's largest independent commercial aerostructures manufacturer, producing Boeing 737 fuselages (all variants), 787 nose sections, and Airbus A350 wing components, as well as F-35 empennage sections for Lockheed Martin and C-17 structural components. Spirit was spun out of Boeing Wichita in 2005 and quickly became a bellwether for Boeing's supply chain — its quality control failures on the 737 MAX fuselage (including the door plug incident in January 2024) triggered major scrutiny of the aerospace supply chain and Boeing's acquisition of Spirit's commercial activities. Spirit's defense structures remain strategically important, particularly for F-35 production rate ramp."},
    {"name": "Triumph Group", "ticker": "TGI", "country": "USA", "market_cap": 0.9, "stock_price": 14.56, "change_percent": 0.89, "revenue": 1.3, "employees": 4500, "specializations": ["Aerostructures", "Systems"], "founded_year": 1993, "headquarters": "Berwyn, PA, USA", "website": "triumphgroup.com", "description": "Triumph Group is a US aerospace structures and systems manufacturer focused on military platforms following a decade of portfolio rationalization. It produces wing fold and control actuation systems for F/A-18 and E/A-18G Growler, nacelles for military aircraft, and a range of fuselage and wing structures. Triumph supplies hydraulics, fuel systems, and secondary flight controls across multiple DoD programs. After divesting its commercial aerostructures businesses to focus on the more stable defense segment, Triumph's remaining portfolio is concentrated in naval aviation and special mission aircraft sustainment — a deliberate bet on the durability of US Navy and Air Force platform lifecycles."},
    {"name": "Hexcel", "ticker": "HXL", "country": "USA", "market_cap": 5.8, "stock_price": 68.90, "change_percent": -0.34, "revenue": 1.8, "employees": 6300, "specializations": ["Composites", "Materials"], "founded_year": 1948, "headquarters": "Stamford, CT, USA", "website": "hexcel.com", "description": "Hexcel is the world's leading manufacturer of advanced carbon fiber composites and prepregs for aerospace and defense — occupying a critical strategic position as the primary composites supplier for the F-35 Lightning II (23% by weight is Hexcel carbon fiber), B-2 Spirit stealth bomber, CH-53K King Stallion, and A400M military transport. Hexcel's HexTow carbon fiber, HexPly prepreg, and Redux structural adhesives are embedded across essentially every frontline Western combat aircraft. The company's aerospace composites technology underpins the stealth, weight reduction, and performance of modern military platforms in a way that is irreplaceable within 5–10 year requalification timelines. Over 65% of revenue is defense or space-related."},
    {"name": "Redwire Corporation", "ticker": "RDW", "country": "USA", "market_cap": 0.6, "stock_price": 6.78, "change_percent": 1.23, "revenue": 0.3, "employees": 700, "specializations": ["Space", "Manufacturing"], "founded_year": 2020, "headquarters": "Jacksonville, FL, USA", "website": "redwirespace.com", "description": "Redwire Corporation is a US space infrastructure company specializing in deployable structures, solar arrays, and in-space manufacturing for government and commercial space customers. Its roll-out solar arrays (ROSA technology) power the ISS, NASA Gateway, and multiple DoD satellites. Redwire's in-space manufacturing capabilities (3D printing of structural components in microgravity) represent a frontier technology with long-term strategic importance for US space dominance. The company has contracts with NASA, NRO, and US Space Force and is growing its commercial satellite services. Formed through acquisitions of Adcole Maryland Aerospace, Roccor, and others, Redwire targets the fast-growing US government space infrastructure market driven by Space Force investment."},
    {"name": "V2X Inc", "ticker": "VVX", "country": "USA", "market_cap": 2.1, "stock_price": 52.34, "change_percent": 0.45, "revenue": 4.0, "employees": 14000, "specializations": ["Services", "Logistics", "Training"], "founded_year": 2022, "headquarters": "McLean, VA, USA", "website": "goV2X.com", "description": "V2X Inc is a US defense services company formed by the 2022 merger of Vectrus (base operations and facilities) and Vertex Aerospace (aviation services and maintenance). It provides contractor logistics support, base operations, aviation MRO, and training services to DoD across 130+ locations in 30+ countries. V2X maintains rotary and fixed-wing aircraft for the US Army, manages military installations, and delivers troop training programs — the essential 'teeth-to-tail' sustainment infrastructure that makes US power projection possible. The company's integrated service model positions it to capture the DoD's increasing reliance on contractor-provided sustainment as military forces maintain operational tempo without proportionally growing uniformed logistics units."},
    # === Additional companies to reach 125 ===
    {"name": "Teledyne Technologies", "ticker": "TDY", "country": "USA", "market_cap": 15.8, "stock_price": 387.45, "change_percent": 0.92, "revenue": 5.9, "employees": 17000, "specializations": ["Imaging", "Sensors", "Electronics", "Defense"], "founded_year": 1999, "headquarters": "Thousand Oaks, CA, USA", "website": "teledyne.com", "description": "Teledyne Technologies is the world's pre-eminent manufacturer of imaging sensors, scientific instruments, and defense electronics for the most demanding applications. Its $8B acquisition of FLIR Systems in 2021 made it the global leader in thermal and multispectral imaging — with FLIR thermal cameras embedded in virtually every US military ground vehicle, aircraft, and drone for night vision and targeting. Teledyne's defense portfolio spans undersea acoustic sensors (sonobuoys), satellite imaging sensors, SIGINT systems, unmanned underwater vehicles (Teledyne Marine), and advanced data acquisition systems. The company's disciplined acquisition strategy of niche high-technology businesses has produced 20+ consecutive years of revenue growth, making it a flagship of the US precision technology industrial base."},
    {"name": "Serco Group", "ticker": "SRP.L", "country": "UK", "market_cap": 4.1, "stock_price": 1.67, "change_percent": 0.48, "revenue": 4.7, "employees": 60000, "specializations": ["Services", "IT", "Logistics", "Training"], "founded_year": 1929, "headquarters": "Hook, UK", "website": "serco.com", "description": "Serco is a global defense and government services company providing operational management of complex public services across defense, justice, transport, and immigration. In defense, Serco operates and maintains UK nuclear facilities (Atomic Weapons Establishment at Aldermaston — shared with AWE Management), manages naval training (BRNC Dartmouth), delivers air traffic management services, and runs welfare and facilities services for UK armed forces globally. In the US, Serco manages US Navy ship maintenance and logistics support under large multi-year contracts. Serco's operating model — taking on the management of complex government-owned defense infrastructure under long-term contracts — provides extremely stable, recurring revenue streams and a defensible position as a trusted government services partner across the Five Eyes alliance."},
    {"name": "Milrem Robotics", "ticker": "MILR-PRIV", "country": "Estonia", "market_cap": 0.5, "stock_price": 0, "change_percent": 0, "revenue": 0.2, "employees": 350, "specializations": ["UGV", "Autonomous", "Land Systems"], "founded_year": 2013, "headquarters": "Tallinn, Estonia", "website": "milremrobotics.com", "funding_stage": "Private (Mette Capital)", "description": "Milrem Robotics is Europe's leading unmanned ground vehicle (UGV) manufacturer, producing the THeMIS tracked UGV — a modular combat support platform deployed by nine NATO armies including the Netherlands, Germany, and Estonia. THeMIS can carry weapons stations, logistics loads, casualty evacuation kits, or ISR sensors. Milrem is also developing the Type-X Robotic Combat Vehicle, a heavier autonomous platform designed for direct combat support alongside infantry. Backed by NATO Innovation Fund interest and operating within the EU defence industrial framework."},
    {"name": "Terma A/S", "ticker": "TERM-PRIV", "country": "Denmark", "market_cap": 0.6, "stock_price": 0, "change_percent": 0, "revenue": 0.4, "employees": 1400, "specializations": ["Defense Electronics", "C2 Systems", "Space"], "founded_year": 1949, "headquarters": "Aarhus, Denmark", "website": "terma.com", "funding_stage": "Private — Danish institutional", "description": "Terma is Denmark's largest defense electronics company, specializing in C2 systems, radar solutions, self-protection systems for aircraft, and space electronics. It produces the SKYSYS air traffic and battle management systems, electronic warfare self-protection pods for the F-16 and F-35, and contributes to the Sentinel radar program. Terma supplies to NATO air forces and is a key European integrator for avionics and mission systems on the F-35 program for European customers."},
    {"name": "Dynamit Nobel Defence", "ticker": "DND-PRIV", "country": "Germany", "market_cap": 0.5, "stock_price": 0, "change_percent": 0, "revenue": 0.3, "employees": 900, "specializations": ["Warheads", "Propulsion", "Ammunition"], "founded_year": 1865, "headquarters": "Burbach, Germany", "website": "dynamit-nobel-defence.de", "funding_stage": "Private — Rheinmetall subsidiary", "description": "Dynamit Nobel Defence (DND) is a German manufacturer of rocket propulsion systems, warheads, and ammunition, operating as part of the Rheinmetall group. Its RGW 90 and Panzerfaust 3 anti-tank systems are standard infantry weapons across NATO armies. DND also produces propellant charges for artillery systems and warheads for air-launched weapons. As demand for ammunition surges across NATO following the Ukraine war, DND has been a significant beneficiary of European rearmament spending."},
    {"name": "Theon Sensors", "ticker": "THSN-PRIV", "country": "Greece", "market_cap": 0.3, "stock_price": 0, "change_percent": 0, "revenue": 0.15, "employees": 280, "specializations": ["Optronics", "Night Vision", "Thermal Imaging"], "founded_year": 1997, "headquarters": "Athens, Greece", "website": "theonsensors.com", "funding_stage": "Private", "description": "Theon Sensors is a Greek developer and manufacturer of night vision and thermal imaging equipment for military applications. Its product range includes image intensifier tubes, thermal weapon sights, clip-on night vision devices, and UAV optronics payloads. Theon exports to over 25 countries and is one of the few European manufacturers of image intensifier tubes, a technology area dominated by US and Russian producers. The company is a key supplier to Greek and Cypriot armed forces and several NATO allies."},
    {"name": "PZL Mielec", "ticker": "PZL-PRIV", "country": "Poland", "market_cap": 0.4, "stock_price": 0, "change_percent": 0, "revenue": 0.3, "employees": 2200, "specializations": ["Aircraft", "Helicopters", "MRO"], "founded_year": 1938, "headquarters": "Mielec, Poland", "website": "pzl.mielec.pl", "funding_stage": "State-owned — Sikorsky/Lockheed Martin subsidiary", "description": "PZL Mielec is Poland's historic aircraft manufacturer, operating today as Sikorsky's European production and MRO hub. It assembles the S-70i Black Hawk helicopter for international customers (over 100 delivered to 12 nations), and provides MRO services for military helicopters across Central and Eastern Europe. PZL Mielec is a cornerstone of the Polish defense industrial base and benefits directly from NATO's eastern-flank rearmament, including Poland's major helicopter fleet expansion programs."},
    # === France — Defense Tech Startups ===
    {"name": "Shark Robotics", "ticker": "SHRK-PRIV", "country": "France", "market_cap": 0.08, "stock_price": 0, "change_percent": 0, "revenue": 0.02, "employees": 60, "specializations": ["UGV", "Robotics", "Counter-IED", "Autonomous"], "founded_year": 2014, "headquarters": "La Rochelle, France", "website": "shark-robotics.com", "funding_stage": "Growth", "is_public": False, "description": "Shark Robotics develops ground robots for hazardous military and civil security missions. Its Colossus UGV gained international recognition when it was deployed by Paris firefighters inside Notre-Dame Cathedral during the 2019 fire. The military variant carries fire suppression, EOD tools, or ISR payloads in CBRN and combat environments. Shark robots are used by French armed forces and have attracted interest from NATO allies for forward area EOD and base protection roles."},
    {"name": "Safran AI", "ticker": "SFAI-PRIV", "country": "France", "market_cap": 0.17, "stock_price": 0, "change_percent": 0, "revenue": 0.05, "employees": 130, "specializations": ["AI", "Satellite Imagery", "GEOINT", "ISR"], "founded_year": 2016, "headquarters": "Paris, France", "website": "safranai.com", "funding_stage": "Acquired", "is_public": False, "description": "Safran AI (formerly Preligens / Earthcube) applies deep learning to satellite and aerial imagery for military intelligence analysis. Its AI automatically detects and classifies military assets — aircraft, vehicles, ships — in commercial satellite imagery, dramatically reducing the analyst time required for pattern-of-life and order-of-battle assessments. Acquired by Safran in 2023, Safran AI anchors Safran's push into AI-driven defence intelligence and ISR systems, and remains a key supplier to French DGA and NATO allies for AI-accelerated GEOINT production."},
    {
        "name": "Harmattan AI", "ticker": "HARM-PRIV", "country": "France",
        "market_cap": 1.0, "stock_price": 0, "change_percent": 0,
        "revenue": 0.1, "employees": 120,
        "specializations": ["AI", "Command & Control", "Mission Planning", "Battlespace"],
        "founded_year": 2020, "headquarters": "Paris, France", "website": "harmattan.ai",
        "funding_stage": "Series B — €200M (Dassault Aviation lead, Mar 2025)",
        "is_public": False,
        "description": (
            "Harmattan AI is a French defense AI startup specialising in AI-assisted "
            "command-and-control and real-time battlespace analysis. Its platform integrates "
            "sensor fusion, mission planning and decision-support for the French Army and "
            "Air Force, and is being embedded into the Rafale F5 and FCAS programmes."
        ),
        "programs": ["AI-C2 for Armée de Terre", "Rafale F5 integration", "FCAS decision layer"],
        "export_countries": ["FR", "DE", "AE"],
        "aliases": ["Harmattan.ai", "harmattan.ai", "Harmattan"],
    },
    {
        "name": "Exail Technologies", "ticker": "EXAI-PRIV", "country": "France",
        "market_cap": 0.5, "stock_price": 0, "change_percent": 0,
        "revenue": 0.35, "employees": 1800,
        "specializations": ["Naval Autonomy", "USV", "UUV", "Navigation", "Simulation"],
        "founded_year": 2022, "headquarters": "Saint-Germain-en-Laye, France", "website": "exail.com",
        "funding_stage": "Private (iXBlue + ECA Group merger, PE-backed by Tikehau Capital)",
        "is_public": False,
        "description": (
            "Exail Technologies is a French defense and technology group created in 2022 "
            "from the merger of iXBlue (inertial navigation, USV) and ECA Group (inspection "
            "robots, military simulators, mine-countermeasure UUVs). Exail serves naval, "
            "energy and scientific markets with a strong NATO export footprint."
        ),
        "programs": ["DriX USV", "Inspector AUV", "SIGMA INS", "MTTS submarine simulation"],
        "export_countries": ["FR", "DE", "GB", "IT", "AU"],
        "aliases": ["iXBlue", "ECA Group", "Exail"],
    },
    # === USA — Defense Tech Startups (autonomous systems / UAV) ===
    {
        "name": "Skydio", "ticker": "SKYD-PRIV", "country": "USA",
        "market_cap": 2.2, "stock_price": 0, "change_percent": 0,
        "revenue": 0.1, "employees": 500,
        "specializations": ["UAV", "AI", "Autonomous", "ISR", "Counter-UAS"],
        "founded_year": 2014, "headquarters": "San Mateo, CA, USA", "website": "skydio.com",
        "funding_stage": "Series E — $230M (Linse Capital lead, Sep 2022), valuation $2.2B",
        "is_public": False,
        "description": (
            "Skydio is an American drone manufacturer specialising in AI-powered autonomous "
            "flight. Originally focused on consumer obstacle-avoidance drones, Skydio pivoted "
            "to defense and public sector applications after 2020. Its X2D and X10D platforms "
            "are NDAA-compliant (no Chinese components) and serve US Army, law enforcement and "
            "allied government customers. Skydio won the US Army Short Range Reconnaissance (SRR) "
            "programme in 2021, providing small tactical drones to infantry squads."
        ),
        "programs": [
            "X2D (US Army Short Range Reconnaissance / SRR)",
            "X10D (enterprise / government ISR)",
        ],
        "export_countries": ["US", "UA"],
        "aliases": ["Skydio Inc", "Skydio, Inc."],
    },
    # === USA — Defense Tech Startups (hypersonics) ===
    {
        "name": "Hermeus", "ticker": "HERM-PRIV", "country": "USA",
        "market_cap": 0, "stock_price": 0, "change_percent": 0,
        "revenue": 0.05, "employees": 200,
        "specializations": ["Hypersonic", "Propulsion", "Air Mobility"],
        "founded_year": 2018, "headquarters": "Atlanta, GA, USA", "website": "hermeus.com",
        "funding_stage": "Series C — $350M (General Catalyst lead, 2024)",
        "is_public": False,
        "description": (
            "Hermeus is a US defense technology company developing Mach 5+ autonomous and "
            "crewed hypersonic aircraft for national security and commercial applications. "
            "Its Quarterhorse unmanned demonstrator is supported by USAF AFWERX research "
            "contracts. The Halcyon programme targets autonomous hypersonic strike platforms."
        ),
        "programs": ["Quarterhorse (USAF demonstrator)", "Halcyon (autonomous strike)", "Darkhorse"],
        "export_countries": [],
        "aliases": ["Hermeus Corp", "Hermeus Corporation"],
    },
    # === France — Satellite Operators ===
    {
        "name": "Eutelsat", "ticker": "ETL.PA", "country": "France",
        "market_cap": 1.2, "stock_price": 3.50, "change_percent": 0,
        "revenue": 1.3, "employees": 1600,
        "specializations": ["Satellite Communications", "GEO", "LEO (OneWeb)", "Government Connectivity", "Broadband"],
        "founded_year": 1977, "headquarters": "Paris, France", "website": "eutelsat.com",
        "funding_stage": "Public — Euronext Paris: ETL",
        "is_public": True,
        "description": (
            "Eutelsat is a French GEO satellite operator providing broadband, video broadcast "
            "and government secure communications services. Following its 2023 merger with "
            "OneWeb, Eutelsat operates a combined GEO/LEO constellation serving government, "
            "maritime and aviation clients. It holds contracts with European governments and "
            "NATO for resilient satcom. The OneWeb LEO constellation provides global broadband coverage."
        ),
        "programs": ["OneWeb LEO (648 sats)", "HOTBIRD media distribution", "KONNECT VHTS broadband"],
        "export_countries": ["FR", "GB", "DE", "IT", "ES", "AE", "IN"],
        "aliases": ["Eutelsat Communications", "Eutelsat S.A.", "ETL"],
    },
    # === Germany — Defense Tech Startups ===
    {"name": "Quantum Systems", "ticker": "QSYS-PRIV", "country": "Germany", "market_cap": 0.3, "stock_price": 0, "change_percent": 0, "revenue": 0.05, "employees": 400, "specializations": ["UAV", "VTOL", "ISR", "Autonomous"], "founded_year": 2015, "headquarters": "Munich, Germany", "website": "quantum-systems.com", "funding_stage": "Growth — €100M+ (HV Capital, Project A)", "is_public": False, "description": "Quantum Systems manufactures fixed-wing VTOL ISR drones for military and government customers. Its Vector platform combines the endurance advantages of fixed-wing flight (2+ hour, 70km range) with vertical take-off and landing, removing the need for runways. The Vector is used by the German Bundeswehr, NATO special operations forces, and Ukrainian armed forces for tactical reconnaissance. Quantum Systems is one of Germany's most prominent defense tech startups and a key beneficiary of the Zeitenwende rearmament program.", "aliases": ["Quantum Systems GmbH"]},
    {"name": "Dedrone", "ticker": "DEDR-PRIV", "country": "Germany", "market_cap": 0.06, "stock_price": 0, "change_percent": 0, "revenue": 0.02, "employees": 120, "specializations": ["Counter-UAS", "Drone Detection", "AI", "Security"], "founded_year": 2014, "headquarters": "San Francisco, CA, USA", "website": "dedrone.com", "funding_stage": "Growth", "is_public": False, "description": "Dedrone is a German-founded counter-UAS company (HQ now in San Francisco) providing airspace security solutions for military bases, prisons, airports, and critical infrastructure. Its DedroneTracker software fuses RF detection, radar, camera, and ADS-B data to identify, classify, and locate unauthorized drones. Dedrone systems protect over 500 sites globally including US military installations and government facilities. The company was acquired by Dedrone Holdings (a US-listed entity) expanding its DoD market access."},
    # === UK — Defense Tech Startups ===
    {"name": "Blue Bear Systems", "ticker": "BBSR-PRIV", "country": "UK", "market_cap": 0.08, "stock_price": 0, "change_percent": 0, "revenue": 0.03, "employees": 80, "specializations": ["UAV", "Swarm", "Autonomous", "AI"], "founded_year": 2002, "headquarters": "Bedford, UK", "website": "bluebear.aero", "funding_stage": "Growth", "is_public": False, "description": "Blue Bear Systems is a UK autonomy and UAV company pioneering drone swarm technologies for military applications. It is the lead developer of the UK MoD's LANCA (Lightweight Affordable Novel Combat Aircraft) loyal wingman demonstrator and the iMugin family of VTOL drones. Blue Bear is also central to the UK's Project Mosquito drone swarm program, which aims to provide low-cost attritable combat drones to supplement crewed aircraft. Operating within the UK DSEI and DSTL innovation ecosystem."},
    {"name": "Basecamp Research", "ticker": "BCMP-PRIV", "country": "UK", "market_cap": 0.12, "stock_price": 0, "change_percent": 0, "revenue": 0.02, "employees": 90, "specializations": ["Biodefence", "AI", "Biosecurity", "R&D"], "founded_year": 2021, "headquarters": "London, UK", "website": "basecampresearch.com", "funding_stage": "Series A", "is_public": False, "description": "Basecamp Research is building the world's largest database of natural protein diversity, using environmental DNA sampling from extreme and remote ecosystems. For defense applications, its platform accelerates discovery of novel biological materials, biosensors, and countermeasures relevant to biodefence — including detection agents and therapeutic leads against biological threat agents. Its AI-driven protein discovery pipeline has attracted DARPA and UK DSTL interest as a dual-use biosecurity asset."},
    # === Israel — Defense Tech Startups ===
    {"name": "Orca AI", "ticker": "ORCA-PRIV", "country": "Israel", "market_cap": 0.05, "stock_price": 0, "change_percent": 0, "revenue": 0.01, "employees": 60, "specializations": ["Naval Autonomy", "AI", "Maritime Surveillance", "Navigation"], "founded_year": 2018, "headquarters": "Tel Aviv, Israel", "website": "orca.ai", "funding_stage": "Series A", "is_public": False, "description": "Orca AI develops AI-powered collision avoidance and maritime autonomy systems for commercial and naval vessels. Its computer vision platform processes camera and sensor data in real time to detect and classify vessels, obstacles, and anomalies, enabling safer autonomous navigation. For defense applications, Orca AI's technology is applicable to unmanned surface vessels (USVs) and naval situational awareness. The company's systems are deployed on over 150 commercial ships globally, providing a rich dataset for defense-grade maritime AI."},
    # === Australia — Defense Tech Startups ===
    {"name": "SYPAQ Systems", "ticker": "SYPA-PRIV", "country": "Australia", "market_cap": 0.05, "stock_price": 0, "change_percent": 0, "revenue": 0.02, "employees": 120, "specializations": ["UAV", "Autonomous", "Logistics", "ISTAR"], "founded_year": 2015, "headquarters": "Melbourne, Australia", "website": "sypaq.com.au", "funding_stage": "Growth", "is_public": False, "description": "SYPAQ Systems gained international prominence for its Corvo PPDS (Precision Payload Delivery System) — a flat-pack cardboard UAV costing under $4,000 that can be assembled in 20 minutes without tools. Australia donated thousands of Corvo drones to Ukraine for logistics resupply and light ISR, where they proved effective for delivering medicine and ammunition to frontline positions. SYPAQ's low-cost, high-volume drone concept has attracted attention from NATO planners studying attritable UAV logistics."},
    {"name": "Advanced Navigation", "ticker": "ADVN-PRIV", "country": "Australia", "market_cap": 0.08, "stock_price": 0, "change_percent": 0, "revenue": 0.025, "employees": 150, "specializations": ["Navigation", "INS", "Autonomous", "Underwater"], "founded_year": 2012, "headquarters": "Sydney, Australia", "website": "advancednavigation.com", "funding_stage": "Growth", "is_public": False, "description": "Advanced Navigation develops high-performance inertial navigation systems (INS) and acoustic positioning technology for defense, marine, and robotics applications. Its GNSS-denied navigation products — including the Spatial, Certus, and Spatial Fog series — provide precise positioning for military UAVs, UUVs, and autonomous vehicles operating in GPS-jammed environments. Advanced Navigation's underwater USBL acoustic positioning systems are used in naval mine countermeasures and AUV operations globally."},
    # === India — Defense Tech Startups ===
    {"name": "ideaForge Technology", "ticker": "IDEAFORGE.NS", "country": "India", "market_cap": 0.18, "stock_price": 580.0, "change_percent": 1.2, "revenue": 0.025, "employees": 350, "specializations": ["UAV", "VTOL", "ISR", "Autonomous"], "founded_year": 2012, "headquarters": "Mumbai, India", "website": "ideaforgetech.com", "description": "ideaForge Technology is India's leading military drone manufacturer and the first Indian drone company to list on a stock exchange (NSE, June 2023). Its SWITCH and RECON series VTOL UAVs are the primary tactical reconnaissance drones of the Indian Army and paramilitary forces, deployed extensively on the Line of Actual Control (LAC) with China and along the Pakistan border. ideaForge has supplied over 700 drones to Indian government agencies — including SWITCH Mark 2 (winner of the Indian Army's MALE-class requirement in the compact ISR category) — and is expanding into export markets in Southeast Asia and the Middle East. As India's 'Aatmanirbhar Bharat' defense policy mandates domestic UAV procurement, ideaForge holds a commanding first-mover position in India's fast-growing military drone market."},
    # === UAE — Defense Scale-ups ===
    {"name": "Calidus", "ticker": "CALD-PRIV", "country": "UAE", "market_cap": 0.25, "stock_price": 0, "change_percent": 0, "revenue": 0.05, "employees": 200, "specializations": ["Aircraft", "Light Attack", "COIN", "Trainer"], "founded_year": 2018, "headquarters": "Abu Dhabi, UAE", "website": "calidus.ae", "funding_stage": "Growth", "is_public": False, "description": "Calidus is a UAE defense aerospace company developing the B-250 light attack and trainer aircraft — the first fixed-wing military aircraft designed and produced in the UAE. The B-250 targets counter-insurgency (COIN), close air support, and pilot training markets in developing nations seeking affordable alternatives to expensive Western jets. Calidus is part of the UAE's broader push to build a domestic defense industry and reduce dependence on foreign military imports, operating within the EDGE Group ecosystem."},
    # === South Korea — Defense Tech Startups ===
    {"name": "Hancom InSpace", "ticker": "HICS-PRIV", "country": "South Korea", "market_cap": 0.1, "stock_price": 0, "change_percent": 0, "revenue": 0.02, "employees": 180, "specializations": ["Space", "SAR", "GEOINT", "Satellites"], "founded_year": 2012, "headquarters": "Seoul, South Korea", "website": "hancom-inspace.com", "funding_stage": "Growth", "is_public": False, "description": "Hancom InSpace is a South Korean space technology company specializing in small SAR (Synthetic Aperture Radar) satellites and Earth observation services. Its microsatellite platforms provide all-weather, day-night imaging for government and defense customers, supporting Korea's push for sovereign reconnaissance capabilities. Hancom InSpace is developing a commercial SAR constellation to complement the Korean military's KOMPSAT reconnaissance satellites and provide higher revisit rates for intelligence collection."},
    # === Canada — Defense Tech Startups ===
    {
        "name": "Xona Space Systems", "ticker": "XONA-PRIV", "country": "USA",
        "market_cap": 0.16, "stock_price": 0, "change_percent": 0,
        "revenue": 0.01, "employees": 70,
        "specializations": ["Space", "Navigation", "PNT", "GPS"],
        "founded_year": 2019, "headquarters": "Burlingame, CA, USA", "website": "xonaspace.com",
        "funding_stage": "Series B — $40M+ (Space Capital lead)",
        "is_public": False,
        "description": (
            "Xona Space Systems is developing a commercial navigation satellite constellation "
            "to provide a GPS-independent, high-precision positioning signal resilient in "
            "contested environments. Its PULSAR constellation is designed for national security "
            "applications where GPS jamming or spoofing is a threat."
        ),
        "programs": ["PULSAR LEO navigation constellation"],
        "export_countries": ["US"],
        "aliases": ["Xona Space", "Xona"],
    },
    # === Estonia — Defense Tech Startups ===
    {"name": "Frankenburg Technologies", "ticker": "FRTG-PRIV", "country": "Estonia", "market_cap": 0.005, "stock_price": 0, "change_percent": 0, "revenue": 0.001, "employees": 15, "specializations": ["Counter-UAS", "AI", "Detection", "Autonomous"], "founded_year": 2020, "headquarters": "Tallinn, Estonia", "website": "frankenburg.tech", "funding_stage": "Seed", "is_public": False, "description": "Frankenburg Technologies is an Estonian defense startup developing AI-powered detection and classification systems for counter-UAS operations. Its software platform fuses acoustic, RF, and optical sensor data to identify and track small drones at the tactical level. Operating within Estonia's vibrant defense tech ecosystem (alongside Milrem Robotics and Defendec), Frankenburg targets the gap between expensive military-grade C-UAS radars and inadequate commercial drone detection tools."},
    # === Turkey — Defense Tech Startups ===
    {"name": "STM Savunma", "ticker": "STMS-PRIV", "country": "Turkey", "market_cap": 0.6, "stock_price": 0, "change_percent": 0, "revenue": 0.12, "employees": 500, "specializations": ["Autonomous", "AI", "Naval", "Cyber"], "founded_year": 2010, "headquarters": "Ankara, Turkey", "website": "stm.com.tr", "funding_stage": "Private — Turkish Aerospace & defense ecosystem", "description": "STM Savunma Teknolojileri is a Turkish defense engineering company specializing in autonomous systems, naval systems, and cyber security. Its KARGU-2 autonomous rotary-wing attack drone gained global attention as one of the first AI-guided weapons reportedly used in autonomous engagement mode (Libya, 2020). STM also develops the TOGAN and ALPAGU fixed-wing attack drones, naval mine countermeasure systems, and cybersecurity platforms for Turkish armed forces. The company is central to Turkey's strategy of developing indigenous AI-enabled autonomous weapons."},

    # =========================================================
    # === NEW STARTUPS BATCH — Added May 2026 ================
    # =========================================================

    # === USA — Autonomous / Maritime ===
    {
        "name": "Saronic Technologies", "ticker": "SARO-PRIV", "country": "USA",
        "market_cap": 0.8, "stock_price": 0, "change_percent": 0,
        "revenue": 0.03, "employees": 250,
        "specializations": ["Maritime", "Autonomous", "USV", "Naval ISR"],
        "founded_year": 2022, "headquarters": "Austin, TX, USA", "website": "saronic.com",
        "funding_stage": "Series B — $200M+ (Andreessen Horowitz lead)",
        "is_public": False,
        "description": (
            "Saronic Technologies designs and manufactures autonomous surface vessels (ASVs) "
            "for naval ISR and distributed fleet operations. Its platforms are designed to "
            "operate in GPS-degraded and contested maritime environments. Backed by a16z, "
            "Saronic is engaged in US Navy pilot programs targeting the Distributed Maritime "
            "Operations (DMO) concept."
        ),
        "programs": ["US Navy autonomous fleet pilot"],
        "export_countries": ["US"],
        "aliases": ["Saronic"],
    },
    {
        "name": "Epirus", "ticker": "EPIR-PRIV", "country": "USA",
        "market_cap": 1.5, "stock_price": 0, "change_percent": 0,
        "revenue": 0.06, "employees": 300,
        "specializations": ["Directed Energy", "HPM", "Electronic Warfare"],
        "founded_year": 2018, "headquarters": "Torrance, CA, USA", "website": "epirusinc.com",
        "funding_stage": "Series D — $300M+ (DCVC, 8VC)",
        "is_public": False,
        "description": (
            "Epirus develops high-power microwave (HPM) directed energy systems for counter-drone "
            "and counter-swarm defense. Its Leonidas system uses software-defined power electronics "
            "and AI-based target tracking to defeat multiple UAS threats simultaneously. The US Army "
            "has tested Leonidas in operational scenarios."
        ),
        "programs": ["Leonidas HPM system (US Army testing)", "Leonidas Pod (mobile variant)"],
        "export_countries": ["US"],
        "aliases": ["Epirus Inc"],
    },
    {
        "name": "Rebellion Defense", "ticker": "REBD-PRIV", "country": "USA",
        "market_cap": 0.6, "stock_price": 0, "change_percent": 0,
        "revenue": 0.04, "employees": 250,
        "specializations": ["AI", "C2", "Defense Software", "Analytics"],
        "founded_year": 2019, "headquarters": "Washington, DC, USA", "website": "rebelliondefense.com",
        "funding_stage": "Growth — $150M+ (Eclipse Ventures)",
        "is_public": False,
        "description": (
            "Rebellion Defense builds AI-enabled operational software for military command and control. "
            "Its platforms provide decision support, mission planning assistance, and autonomous "
            "analysis for US and allied defense customers. Co-founded by former DoD and CIA officials, "
            "it operates in the most sensitive areas of the US national security ecosystem."
        ),
        "programs": ["Ember (AI mission planning)", "Crypt (signals intelligence)"],
        "export_countries": ["US"],
        "aliases": ["Rebellion"],
    },
    {
        "name": "Vannevar Labs", "ticker": "VANN-PRIV", "country": "USA",
        "market_cap": 0.4, "stock_price": 0, "change_percent": 0,
        "revenue": 0.03, "employees": 200,
        "specializations": ["AI", "ISR", "OSINT", "Intelligence Analysis"],
        "founded_year": 2019, "headquarters": "Palo Alto, CA, USA", "website": "vannevarlabs.com",
        "funding_stage": "Series B — $90M+ (Felicis, Andreessen Horowitz)",
        "is_public": False,
        "description": (
            "Vannevar Labs builds AI-powered intelligence analysis platforms for national security "
            "customers. Its flagship product aggregates open-source and classified data to generate "
            "targeting and operational intelligence faster than traditional human analysts. Its "
            "customers include US intelligence agencies and special operations commands."
        ),
        "programs": ["Beacon (OSINT/targeting platform)"],
        "export_countries": ["US"],
        "aliases": ["Vannevar"],
    },
    {
        "name": "True Anomaly", "ticker": "TRAN-PRIV", "country": "USA",
        "market_cap": 0.5, "stock_price": 0, "change_percent": 0,
        "revenue": 0.02, "employees": 150,
        "specializations": ["Space", "Orbital Defense", "Space Domain Awareness", "Satellites"],
        "founded_year": 2022, "headquarters": "Denver, CO, USA", "website": "trueanomaly.space",
        "funding_stage": "Series B — $100M+ (Eclipse Ventures)",
        "is_public": False,
        "description": (
            "True Anomaly develops space security systems for orbital defense and space domain "
            "awareness. Its Jackal spacecraft is designed to rendezvous with and inspect adversary "
            "satellites. The company is aligned with US Space Force priorities for in-space "
            "deterrence and rapid response to on-orbit threats."
        ),
        "programs": ["Jackal (orbital inspection spacecraft)", "US Space Force ecosystem"],
        "export_countries": ["US"],
        "aliases": ["True Anomaly Inc"],
    },
    {
        "name": "Allen Control Systems", "ticker": "ALCS-PRIV", "country": "USA",
        "market_cap": 0.06, "stock_price": 0, "change_percent": 0,
        "revenue": 0.005, "employees": 50,
        "specializations": ["Autonomous", "Weapons Systems", "Counter-UAS", "Base Defense"],
        "founded_year": 2022, "headquarters": "Austin, TX, USA", "website": "allencontrolsystems.com",
        "funding_stage": "Seed — $15M+ (Craft Ventures)",
        "is_public": False,
        "description": (
            "Allen Control Systems builds autonomous gun systems for base defense and anti-drone "
            "warfare. Its platforms integrate AI-powered fire control with existing kinetic weapons "
            "to defeat small UAS threats at low cost per engagement. Engaged in US defense pilots."
        ),
        "programs": ["US defense pilot programs"],
        "export_countries": ["US"],
        "aliases": ["ACS"],
    },
    {
        "name": "Darkhive", "ticker": "DKHV-PRIV", "country": "USA",
        "market_cap": 0.04, "stock_price": 0, "change_percent": 0,
        "revenue": 0.003, "employees": 40,
        "specializations": ["UAV", "Swarming", "Logistics", "Autonomous"],
        "founded_year": 2021, "headquarters": "San Antonio, TX, USA", "website": "darkhive.ai",
        "funding_stage": "Seed — $10M+",
        "is_public": False,
        "description": (
            "Darkhive develops autonomous logistics drone swarms for battlefield resupply missions. "
            "Its systems are designed to operate without GPS and deliver critical supplies to "
            "forward-deployed forces in contested environments. Active in Pentagon innovation programs."
        ),
        "programs": ["Pentagon innovation programs"],
        "export_countries": ["US"],
        "aliases": ["Darkhive AI"],
    },
    {
        "name": "HavocAI", "ticker": "HVAI-PRIV", "country": "USA",
        "market_cap": 0.03, "stock_price": 0, "change_percent": 0,
        "revenue": 0.002, "employees": 20,
        "specializations": ["Maritime", "AI", "Autonomous Naval", "USV"],
        "founded_year": 2024, "headquarters": "Providence, RI, USA", "website": "havocai.com",
        "funding_stage": "Seed (Shield Capital ecosystem)",
        "is_public": False,
        "description": (
            "HavocAI develops AI-driven autonomous maritime systems for naval operations. "
            "Its platforms target autonomous naval ISR and surface warfare in contested "
            "environments. Early-stage engagement with US Navy."
        ),
        "programs": ["Early US Navy engagement"],
        "export_countries": ["US"],
        "aliases": ["Havoc AI"],
    },
    {
        "name": "Neros Technologies", "ticker": "NROS-PRIV", "country": "USA",
        "market_cap": 2.5, "stock_price": 0, "change_percent": 0,
        "revenue": 0.003, "employees": 30,
        "specializations": ["UAV", "FPV Drones", "Autonomous", "Attritable"],
        "founded_year": 2023, "headquarters": "Los Angeles, CA, USA", "website": "neros.tech",
        "funding_stage": "Series C — $250M (2026)",
        "is_public": False,
        "description": (
            "Neros Technologies produces low-cost, attritable FPV combat drones inspired by "
            "battlefield lessons from Ukraine. Its platforms are designed for mass production "
            "and expendable use in swarm attack and reconnaissance roles."
        ),
        "programs": ["Ukraine-inspired combat drone systems"],
        "export_countries": ["US"],
        "aliases": ["Neros"],
    },
    {
        "name": "Firehawk Aerospace", "ticker": "FHWK-PRIV", "country": "USA",
        "market_cap": 0.25, "stock_price": 0, "change_percent": 0,
        "revenue": 0.015, "employees": 80,
        "specializations": ["Missiles", "Space", "Propulsion", "Rockets"],
        "founded_year": 2019, "headquarters": "Dallas, TX, USA", "website": "firehawkaerospace.com",
        "funding_stage": "Series A — $60M+ (Victorum Capital)",
        "is_public": False,
        "description": (
            "Firehawk Aerospace develops advanced hybrid and solid rocket propulsion systems "
            "for missile and space launch applications. Its propulsion technology targets "
            "hypersonic and tactical strike markets for US defense customers."
        ),
        "programs": ["US defense propulsion contracts"],
        "export_countries": ["US"],
        "aliases": ["Firehawk"],
    },
    {
        "name": "AndrenaM", "ticker": "ANDR-PRIV", "country": "USA",
        "market_cap": 0.06, "stock_price": 0, "change_percent": 0,
        "revenue": 0.005, "employees": 70,
        "specializations": ["RF", "Communications", "Mesh Network", "Battlefield Connectivity"],
        "founded_year": 2021, "headquarters": "New York, NY, USA", "website": "andrenam.com",
        "funding_stage": "Series A — $15M+",
        "is_public": False,
        "description": (
            "AndrenaM builds resilient mesh communication systems for military battlefield "
            "connectivity. Its software-defined radio networks are designed to maintain "
            "communications in GPS-denied and electronically contested environments."
        ),
        "programs": ["Military communications pilots"],
        "export_countries": ["US"],
        "aliases": ["Andrena"],
    },
    {
        "name": "Rampart Communications", "ticker": "RAMP-PRIV", "country": "USA",
        "market_cap": 0.03, "stock_price": 0, "change_percent": 0,
        "revenue": 0.002, "employees": 30,
        "specializations": ["EW", "RF", "Tactical Communications", "Contested Environments"],
        "founded_year": 2021, "headquarters": "Los Angeles, CA, USA", "website": "rampartcommunications.com",
        "funding_stage": "Seed",
        "is_public": False,
        "description": (
            "Rampart Communications develops tactical RF systems for military communications "
            "in electronically contested environments. Its EW-resilient radios maintain "
            "link integrity under jamming and interference. Active in Pentagon experimentation programs."
        ),
        "programs": ["Pentagon RF experimentation"],
        "export_countries": ["US"],
        "aliases": ["Rampart"],
    },
    {
        "name": "OmniTeq", "ticker": "OMTQ-PRIV", "country": "USA",
        "market_cap": 0.02, "stock_price": 0, "change_percent": 0,
        "revenue": 0.002, "employees": 20,
        "specializations": ["Sensors", "AI", "ISR", "Persistent Surveillance"],
        "founded_year": 2022, "headquarters": "Huntsville, AL, USA", "website": "omniteq.com",
        "funding_stage": "Seed",
        "is_public": False,
        "description": (
            "OmniTeq develops AI-enabled battlefield sensing systems for persistent ISR. "
            "Its sensor fusion platforms are designed for tactical surveillance and "
            "threat detection in complex terrain environments."
        ),
        "programs": ["Tactical sensor pilots"],
        "export_countries": ["US"],
        "aliases": [],
    },
    {
        "name": "AIKIDO Technologies", "ticker": "AIKT-PRIV", "country": "USA",
        "market_cap": 0.08, "stock_price": 0, "change_percent": 0,
        "revenue": 0.006, "employees": 40,
        "specializations": ["AI", "C2", "Mission Software", "Multi-Domain Operations"],
        "founded_year": 2020, "headquarters": "Austin, TX, USA", "website": "aikidotechnologies.com",
        "funding_stage": "Series A — $20M+",
        "is_public": False,
        "description": (
            "AIKIDO Technologies builds autonomous mission planning software for multi-domain "
            "operational planning. Its AI systems help commanders optimize force deployment "
            "across land, sea, air, space, and cyber domains. Active with US government customers."
        ),
        "programs": ["US government multi-domain C2"],
        "export_countries": ["US"],
        "aliases": ["AIKIDO"],
    },
    {
        "name": "Parry Labs", "ticker": "PRLY-PRIV", "country": "USA",
        "market_cap": 0.1, "stock_price": 0, "change_percent": 0,
        "revenue": 0.02, "employees": 200,
        "specializations": ["C2", "Edge Computing", "Mission Systems", "Secure Computing"],
        "founded_year": 2015, "headquarters": "Dallas, TX, USA", "website": "parrylabs.com",
        "funding_stage": "Series A (Capitol Meridian Partners)",
        "is_public": False,
        "description": (
            "Parry Labs develops edge mission computing solutions for secure battlefield applications. "
            "Its hardened computing platforms process sensor data and run mission software at the "
            "tactical edge without reliance on cloud connectivity. Active on USAF and DoD programs."
        ),
        "programs": ["USAF edge computing", "DoD mission systems"],
        "export_countries": ["US"],
        "aliases": [],
    },
    {
        "name": "DEFCON AI", "ticker": "DFAI-PRIV", "country": "USA",
        "market_cap": 0.04, "stock_price": 0, "change_percent": 0,
        "revenue": 0.003, "employees": 40,
        "specializations": ["AI", "Logistics", "Military Logistics", "Optimization"],
        "founded_year": 2023, "headquarters": "Washington, DC, USA", "website": "defconai.com",
        "funding_stage": "Seed — $10M+ (Bessemer Venture Partners)",
        "is_public": False,
        "description": (
            "DEFCON AI applies machine learning to optimize military logistics and operational "
            "mobility. Its platform models complex supply chains and force movement under "
            "degraded conditions, helping commanders anticipate logistical bottlenecks."
        ),
        "programs": ["Pentagon logistics pilot programs"],
        "export_countries": ["US"],
        "aliases": ["Defcon AI"],
    },
    {
        "name": "Duality AI", "ticker": "DUAI-PRIV", "country": "USA",
        "market_cap": 0.08, "stock_price": 0, "change_percent": 0,
        "revenue": 0.006, "employees": 60,
        "specializations": ["Simulation", "AI", "Digital Twin", "Synthetic Training Data"],
        "founded_year": 2019, "headquarters": "San Mateo, CA, USA", "website": "duality.ai",
        "funding_stage": "Series A — $20M+ (Lux Capital)",
        "is_public": False,
        "description": (
            "Duality AI builds a digital twin simulation platform for generating synthetic "
            "training data for autonomous systems and AI models. Defense customers use it to "
            "train perception and navigation algorithms without requiring live data collection "
            "in sensitive environments."
        ),
        "programs": ["Defense AI training data generation"],
        "export_countries": ["US"],
        "aliases": ["Duality"],
    },
    {
        "name": "Exlabs", "ticker": "EXLB-PRIV", "country": "USA",
        "market_cap": 0.03, "stock_price": 0, "change_percent": 0,
        "revenue": 0.002, "employees": 30,
        "specializations": ["Space", "Autonomous", "Deep Space", "Space Security"],
        "founded_year": 2023, "headquarters": "Los Angeles, CA, USA", "website": "exlabs.com",
        "funding_stage": "Seed",
        "is_public": False,
        "description": (
            "Exlabs develops autonomous deep-space systems for space security and ISR applications. "
            "Its spacecraft are designed to operate in cislunar space and beyond, supporting "
            "US Space Force priorities for domain awareness in the emerging space security domain."
        ),
        "programs": ["Emerging US Space Force traction"],
        "export_countries": ["US"],
        "aliases": [],
    },
    {
        "name": "Albedo Space", "ticker": "ALBD-PRIV", "country": "USA",
        "market_cap": 0.4, "stock_price": 0, "change_percent": 0,
        "revenue": 0.01, "employees": 70,
        "specializations": ["Space", "ISR", "VLEO", "Satellite Imagery"],
        "founded_year": 2020, "headquarters": "Denver, CO, USA", "website": "albedo.com",
        "funding_stage": "Series A — $100M+ (Standard Investments)",
        "is_public": False,
        "description": (
            "Albedo Space operates a very low Earth orbit (VLEO) imaging satellite constellation "
            "providing sub-10cm resolution commercial imagery. Its satellites fly at 300km altitude, "
            "far lower than traditional EO satellites, enabling tactical-grade imagery for government "
            "and intelligence community customers."
        ),
        "programs": ["US government VLEO imagery"],
        "export_countries": ["US"],
        "aliases": ["Albedo"],
    },
    {
        "name": "Turion Space", "ticker": "TRSPC-PRIV", "country": "USA",
        "market_cap": 0.12, "stock_price": 0, "change_percent": 0,
        "revenue": 0.005, "employees": 60,
        "specializations": ["Space", "ISR", "Space Domain Awareness", "Orbital Surveillance"],
        "founded_year": 2020, "headquarters": "Irvine, CA, USA", "website": "turionspace.com",
        "funding_stage": "Series A — $30M+ (Forward Deployed VC)",
        "is_public": False,
        "description": (
            "Turion Space builds space domain awareness systems for tracking and characterizing "
            "adversary satellites. Its Droid spacecraft inspect, monitor, and collect intelligence "
            "on objects in orbit, supporting US Space Force strategic awareness missions."
        ),
        "programs": ["Droid (orbital inspection spacecraft)", "US Space Force ecosystem"],
        "export_countries": ["US"],
        "aliases": ["Turion"],
    },
    {
        "name": "Castelion", "ticker": "CSTL-PRIV", "country": "USA",
        "market_cap": 0.5, "stock_price": 0, "change_percent": 0,
        "revenue": 0.01, "employees": 120,
        "specializations": ["Missiles", "Hypersonics", "Precision Strike", "Long-Range Weapons"],
        "founded_year": 2023, "headquarters": "El Segundo, CA, USA", "website": "castelion.com",
        "funding_stage": "Seed — $100M+ (Andreessen Horowitz)",
        "is_public": False,
        "description": (
            "Castelion is developing low-cost hypersonic strike systems for long-range precision "
            "engagement. Its approach prioritizes affordability and mass production over "
            "maximum performance, aligned with Pentagon requirements for attritable hypersonic "
            "weapons at scale. Backed by a16z with a Pentagon-aligned development roadmap."
        ),
        "programs": ["Hypersonic strike demonstrator"],
        "export_countries": ["US"],
        "aliases": [],
    },
    {
        "name": "Chaos Industries", "ticker": "CHOI-PRIV", "country": "USA",
        "market_cap": 0.6, "stock_price": 0, "change_percent": 0,
        "revenue": 0.02, "employees": 90,
        "specializations": ["Radar", "RF", "Air Defense", "Missile Detection"],
        "founded_year": 2022, "headquarters": "Los Angeles, CA, USA", "website": "chaosinc.com",
        "funding_stage": "Series A — $145M+ (Accel, 8VC)",
        "is_public": False,
        "description": (
            "Chaos Industries develops advanced radar and RF detection systems for air and "
            "missile defense. Its multi-function phased-array radar technology provides high-resolution "
            "tracking of hypersonic, cruise missile, and UAS threats for US defense programs."
        ),
        "programs": ["US defense radar programs"],
        "export_countries": ["US"],
        "aliases": ["Chaos"],
    },
    {
        "name": "Picogrid", "ticker": "PCGR-PRIV", "country": "USA",
        "market_cap": 0.14, "stock_price": 0, "change_percent": 0,
        "revenue": 0.008, "employees": 100,
        "specializations": ["Edge Computing", "AI", "C2", "Defense Operating System"],
        "founded_year": 2020, "headquarters": "El Segundo, CA, USA", "website": "picogrid.com",
        "funding_stage": "Series A — $35M+ (Initialized Capital)",
        "is_public": False,
        "description": (
            "Picogrid develops a defense operating system that integrates hardware and software "
            "at the tactical battlefield edge. Its middleware layer enables disparate sensors, "
            "platforms, and AI models to interoperate across a multi-domain battlespace."
        ),
        "programs": ["US DoD middleware pilots"],
        "export_countries": ["US"],
        "aliases": [],
    },

    # === Finland — Space / ISR ===
    {
        "name": "ICEYE", "ticker": "ICEY-PRIV", "country": "Finland",
        "market_cap": 2.0, "stock_price": 0, "change_percent": 0,
        "revenue": 0.1, "employees": 700,
        "specializations": ["Space", "SAR", "ISR", "Satellite Constellation"],
        "founded_year": 2014, "headquarters": "Espoo, Finland", "website": "iceye.com",
        "funding_stage": "Growth — $500M+ (Seraphim Space, BlackRock)",
        "is_public": False,
        "description": (
            "ICEYE operates the world's largest SAR (Synthetic Aperture Radar) microsatellite "
            "constellation, providing persistent all-weather imaging for defense and government "
            "customers. Its satellites have been used by NATO governments and Ukraine for "
            "battlefield change detection and maritime surveillance."
        ),
        "programs": ["SAR constellation (NATO govts)", "Ukraine battlefield imagery"],
        "export_countries": ["FI", "GB", "DE", "FR", "UA", "US"],
        "aliases": [],
    },
    {
        "name": "SensusQ", "ticker": "SENQ-PRIV", "country": "Finland",
        "market_cap": 0.02, "stock_price": 0, "change_percent": 0,
        "revenue": 0.001, "employees": 40,
        "specializations": ["AI", "ISR", "Intelligence Fusion", "Multi-Source Intelligence"],
        "founded_year": 2021, "headquarters": "Helsinki, Finland", "website": "sensusq.com",
        "funding_stage": "Seed — €4M+ (Lifeline Ventures)",
        "is_public": False,
        "description": (
            "SensusQ develops intelligence fusion software that aggregates and correlates "
            "multi-source intelligence feeds into a unified battlefield picture. Its platform "
            "serves European government and defense customers seeking faster analytical cycles."
        ),
        "programs": ["European government pilots"],
        "export_countries": ["FI"],
        "aliases": [],
    },

    # === France — Space ISR / UAV ===
    {
        "name": "Unseenlabs", "ticker": "UNSL-PRIV", "country": "France",
        "market_cap": 0.35, "stock_price": 0, "change_percent": 0,
        "revenue": 0.015, "employees": 170,
        "specializations": ["RF", "ISR", "Space", "Maritime Intelligence", "SIGINT"],
        "founded_year": 2015, "headquarters": "Rennes, France", "website": "unseenlabs.space",
        "funding_stage": "Series B — €80M+ (Supernova Invest)",
        "is_public": False,
        "description": (
            "Unseenlabs operates a nanosatellite constellation for RF geolocation and maritime "
            "electronic intelligence. Its satellites detect and geolocate ship emissions to "
            "provide dark vessel tracking and maritime domain awareness for navies and coast guards."
        ),
        "programs": ["Maritime RF geolocation constellation", "European naval clients"],
        "export_countries": ["FR", "GB", "IT"],
        "aliases": ["Unseenlabs Space"],
    },
    {
        "name": "Delair", "ticker": "DLAIR-PRIV", "country": "France",
        "market_cap": 0.3, "stock_price": 0, "change_percent": 0,
        "revenue": 0.02, "employees": 250,
        "specializations": ["UAV", "ISR", "Fixed-Wing", "Reconnaissance"],
        "founded_year": 2011, "headquarters": "Toulouse, France", "website": "delair.aero",
        "funding_stage": "Growth — €70M+ (Bpifrance)",
        "is_public": False,
        "description": (
            "Delair designs and manufactures fixed-wing ISR drones for tactical reconnaissance "
            "and persistent surveillance. Its UX11 and DT26X platforms are used by French and "
            "allied armed forces for long-endurance battlefield awareness missions."
        ),
        "programs": ["French defense ecosystem", "NATO ISR programs"],
        "export_countries": ["FR", "DE", "GB"],
        "aliases": ["Delair-Tech", "Delair Tech"],
    },

    # === Germany — Counter-UAS / Ground Robotics ===
    {
        "name": "Alpine Eagle", "ticker": "ALPE-PRIV", "country": "Germany",
        "market_cap": 0.04, "stock_price": 0, "change_percent": 0,
        "revenue": 0.002, "employees": 40,
        "specializations": ["Counter-UAS", "Sensors", "Airborne Interception", "Drone Defense"],
        "founded_year": 2023, "headquarters": "Munich, Germany", "website": "alpineeagle.com",
        "funding_stage": "Seed — €10M+ (IQ Capital, Expeditions Fund)",
        "is_public": False,
        "description": (
            "Alpine Eagle develops airborne counter-drone interception systems that detect and "
            "neutralize hostile UAVs. Its AI-powered interceptor platforms are designed to "
            "operate as part of layered air defense systems for European military customers."
        ),
        "programs": ["European defense pilots"],
        "export_countries": ["DE"],
        "aliases": ["Alpine Eagle GmbH"],
    },
    {
        "name": "ARX Robotics", "ticker": "ARXR-PRIV", "country": "Germany",
        "market_cap": 0.12, "stock_price": 0, "change_percent": 0,
        "revenue": 0.005, "employees": 80,
        "specializations": ["Robotics", "Autonomous", "UGV", "Land Systems"],
        "founded_year": 2022, "headquarters": "Munich, Germany", "website": "arx-robotics.com",
        "funding_stage": "Series A — €30M+ (NATO Innovation Fund)",
        "is_public": False,
        "description": (
            "ARX Robotics builds autonomous unmanned ground vehicles (UGVs) for battlefield "
            "logistics and combat support. Its Gereon UGV is designed to carry supplies, "
            "support infantry, and operate in high-threat environments. Backed by the "
            "NATO Innovation Fund and collaborating with the Bundeswehr."
        ),
        "programs": ["Gereon UGV (Bundeswehr collaboration)"],
        "export_countries": ["DE"],
        "aliases": ["ARX"],
    },
    {
        "name": "Stark Defence", "ticker": "STRD-PRIV", "country": "Germany",
        "market_cap": 0.02, "stock_price": 0, "change_percent": 0,
        "revenue": 0.001, "employees": 30,
        "specializations": ["AI", "Autonomous", "Combat Systems", "Tactical Warfare"],
        "founded_year": 2024, "headquarters": "Berlin, Germany", "website": "stark-defence.com",
        "funding_stage": "Seed (European defense angels)",
        "is_public": False,
        "description": (
            "Stark Defence develops AI-enabled autonomous combat systems for tactical warfare. "
            "An early-stage stealth-mode company, it is building autonomous weapons platforms "
            "for European defense customers."
        ),
        "programs": ["Stealth autonomous weapons programs"],
        "export_countries": ["DE"],
        "aliases": ["Stark Defense"],
    },

    # === Latvia ===
    {
        "name": "Origin Robotics", "ticker": "ORGR-PRIV", "country": "Latvia",
        "market_cap": 0.02, "stock_price": 0, "change_percent": 0,
        "revenue": 0.001, "employees": 35,
        "specializations": ["Counter-UAS", "UAV", "Autonomous Interceptor", "Drone-on-Drone"],
        "founded_year": 2022, "headquarters": "Riga, Latvia", "website": "origin-robotics.com",
        "funding_stage": "Seed — €5M+ (Baltic defense ecosystem)",
        "is_public": False,
        "description": (
            "Origin Robotics develops autonomous interceptor drones for drone-on-drone "
            "counter-UAS missions. Its AI-guided interceptors are designed to autonomously "
            "engage and neutralize hostile drones, addressing NATO's growing counter-UAS gap."
        ),
        "programs": ["NATO interest programs"],
        "export_countries": ["LV"],
        "aliases": ["Origin"],
    },

    # === Estonia ===
    {
        "name": "Farsight Vision", "ticker": "FRSV-PRIV", "country": "Estonia",
        "market_cap": 0.01, "stock_price": 0, "change_percent": 0,
        "revenue": 0.001, "employees": 25,
        "specializations": ["AI", "Vision", "Computer Vision", "Automated Target Recognition"],
        "founded_year": 2022, "headquarters": "Tallinn, Estonia", "website": "farsightvision.com",
        "funding_stage": "Seed (Baltic investors)",
        "is_public": False,
        "description": (
            "Farsight Vision builds computer vision and automated target recognition systems "
            "for defense applications. Its AI models are deployed on UAV and surveillance "
            "platforms in Ukraine-oriented defense stacks."
        ),
        "programs": ["Ukraine-oriented defense applications"],
        "export_countries": ["EE", "UA"],
        "aliases": [],
    },
    {
        "name": "Defendec", "ticker": "DFDC-PRIV", "country": "Estonia",
        "market_cap": 0.05, "stock_price": 0, "change_percent": 0,
        "revenue": 0.005, "employees": 70,
        "specializations": ["ISR", "Sensors", "Border Surveillance", "Perimeter Defense"],
        "founded_year": 2007, "headquarters": "Tallinn, Estonia", "website": "defendec.com",
        "funding_stage": "Growth (European defense investors)",
        "is_public": False,
        "description": (
            "Defendec designs autonomous sensor networks for border surveillance and perimeter "
            "defense. Its wireless sensor systems provide persistent ISR along borders and "
            "critical infrastructure perimeters, deployed across NATO's eastern flank."
        ),
        "programs": ["NATO border deployments"],
        "export_countries": ["EE", "LT", "LV", "PL"],
        "aliases": [],
    },

    # === Portugal ===
    {
        "name": "Tekever", "ticker": "TEKV-PRIV", "country": "Portugal",
        "market_cap": 0.3, "stock_price": 0, "change_percent": 0,
        "revenue": 0.04, "employees": 500,
        "specializations": ["UAV", "Maritime", "ISR", "Long-Range Surveillance"],
        "founded_year": 2001, "headquarters": "Lisbon, Portugal", "website": "tekever.com",
        "funding_stage": "Growth — €70M+ (Ventura Capital)",
        "is_public": False,
        "description": (
            "Tekever develops long-range fixed-wing UAVs for maritime ISR and border security. "
            "Its AR5 platform operates for the UK's Maritime and Coastguard Agency and the "
            "European Maritime Safety Agency (EMSA), providing persistent ocean surveillance "
            "and search and rescue support."
        ),
        "programs": ["UK MoD maritime surveillance", "EMSA border monitoring"],
        "export_countries": ["PT", "GB"],
        "aliases": [],
    },

    # === Spain ===
    {
        "name": "Sateliot", "ticker": "SLTW-PRIV", "country": "Spain",
        "market_cap": 0.3, "stock_price": 0, "change_percent": 0,
        "revenue": 0.01, "employees": 90,
        "specializations": ["Space", "Communications", "LEO", "IoT Connectivity"],
        "founded_year": 2018, "headquarters": "Barcelona, Spain", "website": "sateliot.space",
        "funding_stage": "Series B — €70M+ (Indra, Cellnex)",
        "is_public": False,
        "description": (
            "Sateliot operates a LEO nanosatellite constellation providing global IoT "
            "connectivity for resilient military communications. Its NB-IoT-compatible "
            "network is designed to provide coverage in areas where terrestrial communications "
            "are denied or degraded."
        ),
        "programs": ["European institutional IoT comms"],
        "export_countries": ["ES", "FR", "DE"],
        "aliases": [],
    },

    # === UK ===
    {
        "name": "Open Cosmos", "ticker": "OPCO-PRIV", "country": "UK",
        "market_cap": 0.25, "stock_price": 0, "change_percent": 0,
        "revenue": 0.015, "employees": 180,
        "specializations": ["Space", "ISR", "Sovereign Satellites", "Earth Observation"],
        "founded_year": 2015, "headquarters": "Harwell, UK", "website": "open-cosmos.com",
        "funding_stage": "Series B — €60M+ (ETF Partners)",
        "is_public": False,
        "description": (
            "Open Cosmos provides end-to-end small satellite missions including design, build, "
            "launch and operations for government and commercial customers. It helps European "
            "governments establish sovereign ISR and Earth observation capabilities quickly "
            "and at lower cost than traditional satellite programs."
        ),
        "programs": ["European sovereign satellite missions"],
        "export_countries": ["GB", "ES", "FR"],
        "aliases": [],
    },

    # === Israel — Counter-UAS / Tactical Drones ===
    {
        "name": "D-Fend Solutions", "ticker": "DFND-PRIV", "country": "Israel",
        "market_cap": 0.5, "stock_price": 0, "change_percent": 0,
        "revenue": 0.025, "employees": 180,
        "specializations": ["Counter-UAS", "Cyber", "RF Takeover", "Drone Neutralization"],
        "founded_year": 2017, "headquarters": "Ra'anana, Israel", "website": "d-fendsolutions.com",
        "funding_stage": "Series C — $100M+ (Vertex Ventures)",
        "is_public": False,
        "description": (
            "D-Fend Solutions develops RF cyber-based counter-UAS systems that take control "
            "of hostile drones rather than destroying them. Its EnforceAir platform hijacks "
            "the communication link between a drone and its operator, enabling safe interception "
            "without kinetic or jamming risks. Used at airports and defense installations globally."
        ),
        "programs": ["EnforceAir (RF cyber UAS takeover)", "Airport security deployments"],
        "export_countries": ["IL", "US", "GB", "AE"],
        "aliases": ["D-Fend"],
    },
    {
        "name": "Xtend", "ticker": "XTND-PRIV", "country": "Israel",
        "market_cap": 0.3, "stock_price": 0, "change_percent": 0,
        "revenue": 0.015, "employees": 150,
        "specializations": ["UAV", "Robotics", "Tactical Drones", "Urban Warfare"],
        "founded_year": 2018, "headquarters": "Tel Aviv, Israel", "website": "xtend.me",
        "funding_stage": "Series B — $70M+ (Chartered Group)",
        "is_public": False,
        "description": (
            "Xtend develops human-guided autonomous drones for urban warfare and tactical "
            "operations. Its Skylord platform uses AR/VR interfaces and AI assistance to "
            "enable operators to fly drones in confined spaces without prior piloting expertise. "
            "Used by Israeli defense and special operations units."
        ),
        "programs": ["Skylord (urban warfare drone)", "Israeli defense programs"],
        "export_countries": ["IL"],
        "aliases": ["Xtend AI"],
    },
    {
        "name": "SpearUAV", "ticker": "SPRU-PRIV", "country": "Israel",
        "market_cap": 0.25, "stock_price": 0, "change_percent": 0,
        "revenue": 0.012, "employees": 120,
        "specializations": ["UAV", "ISR", "Encapsulated Drones", "Infantry Support"],
        "founded_year": 2017, "headquarters": "Tel Aviv, Israel", "website": "spearuav.com",
        "funding_stage": "Series B — $60M+ (Deep Insight)",
        "is_public": False,
        "description": (
            "SpearUAV develops encapsulated drone systems that can be launched from mortar "
            "tubes or standard canisters for infantry ISR and room-clearing support. Its "
            "Viper and Ninox platforms provide dismounted soldiers with organic aerial "
            "surveillance capability without a dedicated drone operator."
        ),
        "programs": ["Ninox 40 (tube-launched ISR)", "Israeli military usage"],
        "export_countries": ["IL"],
        "aliases": ["Spear UAV"],
    },

    # === India — Drones / Optics ===
    {
        "name": "NewSpace Research and Technologies", "ticker": "NWSP-PRIV", "country": "India",
        "market_cap": 0.1, "stock_price": 0, "change_percent": 0,
        "revenue": 0.005, "employees": 150,
        "specializations": ["UAV", "Swarming", "Combat Drones", "Loitering Munitions"],
        "founded_year": 2018, "headquarters": "Bengaluru, India", "website": "newspace.co.in",
        "funding_stage": "Series A — $25M+ (Speciale Invest)",
        "is_public": False,
        "description": (
            "NewSpace Research and Technologies develops swarm-enabled UAV systems and loitering "
            "munitions for the Indian armed forces. Its platforms are designed for autonomous "
            "swarm coordination, enabling mass deployment of low-cost strike and ISR drones."
        ),
        "programs": ["Indian armed forces UAV programs"],
        "export_countries": ["IN"],
        "aliases": ["NewSpace Research", "NRT"],
    },
    {
        "name": "Raphe mPhibr", "ticker": "RAPH-PRIV", "country": "India",
        "market_cap": 0.2, "stock_price": 0, "change_percent": 0,
        "revenue": 0.01, "employees": 200,
        "specializations": ["UAV", "ISR", "Tactical Drones", "Indigenous Defense"],
        "founded_year": 2017, "headquarters": "Noida, India", "website": "raphemphibr.com",
        "funding_stage": "Series B — $50M+ (General Catalyst India)",
        "is_public": False,
        "description": (
            "Raphe mPhibr designs indigenous military drones for ISR and logistics operations "
            "for the Indian armed forces. Its multi-rotor and fixed-wing platforms are produced "
            "domestically under India's Atmanirbhar Bharat defense self-reliance initiative."
        ),
        "programs": ["Indian military UAV contracts", "Atmanirbhar Bharat programs"],
        "export_countries": ["IN"],
        "aliases": ["Raphe"],
    },
    {
        "name": "Tonbo Imaging", "ticker": "TNBO-PRIV", "country": "India",
        "market_cap": 0.5, "stock_price": 0, "change_percent": 0,
        "revenue": 0.03, "employees": 350,
        "specializations": ["Sensors", "ISR", "Thermal Imaging", "Electro-Optics", "Targeting"],
        "founded_year": 2012, "headquarters": "Bengaluru, India", "website": "tonboimaging.com",
        "funding_stage": "Growth — $100M+ (WRV Capital)",
        "is_public": False,
        "description": (
            "Tonbo Imaging develops thermal, multispectral, and targeting sensor systems for "
            "battlefield situational awareness. Its products are integrated into armored vehicles, "
            "UAVs, and weapon systems for multiple armed forces. The company provides both Indian "
            "domestic and international defense customers."
        ),
        "programs": ["Multi-armed forces sensor integration"],
        "export_countries": ["IN", "SG"],
        "aliases": ["Tonbo"],
    },

    # === Canada — Maritime Robotics ===
    {
        "name": "Kraken Robotics", "ticker": "PNG.V", "country": "Canada",
        "market_cap": 0.3, "stock_price": 0.85, "change_percent": 1.2,
        "revenue": 0.04, "employees": 300,
        "specializations": ["Maritime", "Robotics", "Sonar", "UUV", "Mine Detection"],
        "founded_year": 2012, "headquarters": "St. John's, Newfoundland, Canada", "website": "krakenrobotics.com",
        "funding_stage": "Public — TSX Venture Exchange: PNG",
        "is_public": True,
        "description": (
            "Kraken Robotics develops underwater robotics and synthetic aperture sonar systems "
            "for naval mine detection and seabed ISR. Its AquaPix sonar and KATFISH towed "
            "systems are used by NATO-aligned navies for mine countermeasure and seabed survey "
            "missions."
        ),
        "programs": ["KATFISH (towed synthetic aperture sonar)", "NATO naval customers"],
        "export_countries": ["CA", "US", "DE", "GB"],
        "aliases": ["Kraken"],
    },

    # === UAE ===
    {
        "name": "Aerodrome Group", "ticker": "ARDR-PRIV", "country": "UAE",
        "market_cap": 0.02, "stock_price": 0, "change_percent": 0,
        "revenue": 0.001, "employees": 50,
        "specializations": ["AI", "UAV", "Autonomous Defense", "Drone Systems"],
        "founded_year": 2023, "headquarters": "Abu Dhabi, UAE", "website": "aerodromegroup.com",
        "funding_stage": "Seed (EDGE ecosystem)",
        "is_public": False,
        "description": (
            "Aerodrome Group develops autonomous combat systems and drone ISR platforms "
            "for UAE defense programs. Aligned with the EDGE Group ecosystem, it focuses "
            "on AI-driven autonomy for Emirati defense applications."
        ),
        "programs": ["UAE defense programs"],
        "export_countries": ["AE"],
        "aliases": [],
    },

    # === South Korea ===
    {
        "name": "Nearthlab", "ticker": "NRTL-PRIV", "country": "South Korea",
        "market_cap": 0.15, "stock_price": 0, "change_percent": 0,
        "revenue": 0.008, "employees": 120,
        "specializations": ["UAV", "Autonomous", "AI", "ISR", "Infrastructure Monitoring"],
        "founded_year": 2015, "headquarters": "Seoul, South Korea", "website": "nearthlab.com",
        "funding_stage": "Series B — $40M+ (Korea Investment Partners)",
        "is_public": False,
        "description": (
            "Nearthlab develops AI-powered autonomous UAV systems for industrial inspection "
            "and defense ISR. Its drones use computer vision and AI navigation to operate "
            "autonomously in GPS-denied environments, serving Korean industrial and defense customers."
        ),
        "programs": ["Korean defense and industrial UAV programs"],
        "export_countries": ["KR"],
        "aliases": [],
    },

    # === Singapore ===
    {
        "name": "ShieldWorks AI", "ticker": "SHWK-PRIV", "country": "Singapore",
        "market_cap": 0.01, "stock_price": 0, "change_percent": 0,
        "revenue": 0.001, "employees": 20,
        "specializations": ["Maritime", "AI", "Naval ISR", "Autonomous Surveillance"],
        "founded_year": 2023, "headquarters": "Singapore", "website": "shieldworks.ai",
        "funding_stage": "Seed (Singapore defense ecosystem)",
        "is_public": False,
        "description": (
            "ShieldWorks AI develops maritime surveillance AI for autonomous naval ISR. "
            "Its computer vision stack processes maritime sensor feeds to detect and "
            "classify surface threats in littoral and open-ocean environments."
        ),
        "programs": ["Regional maritime pilots"],
        "export_countries": ["SG"],
        "aliases": ["ShieldWorks"],
    },

    # === Australia ===
    {
        "name": "Athena AI", "ticker": "ATAI-PRIV", "country": "Australia",
        "market_cap": 0.01, "stock_price": 0, "change_percent": 0,
        "revenue": 0.001, "employees": 25,
        "specializations": ["AI", "ISR", "Battlefield AI", "Operational Planning"],
        "founded_year": 2023, "headquarters": "Melbourne, Australia", "website": "athena-ai.com",
        "funding_stage": "Seed (Australian defense innovation programs)",
        "is_public": False,
        "description": (
            "Athena AI develops tactical AI systems for operational planning and ISR for "
            "the Australian defense ecosystem. Its early-stage platforms are designed to "
            "support ADF decision-making in the Indo-Pacific strategic environment."
        ),
        "programs": ["Early ADF defense pilots"],
        "export_countries": ["AU"],
        "aliases": [],
    },
    {
        "name": "High Earth Orbit Robotics", "ticker": "HEOR-PRIV", "country": "Australia",
        "market_cap": 0.02, "stock_price": 0, "change_percent": 0,
        "revenue": 0.001, "employees": 30,
        "specializations": ["Space", "Robotics", "Orbital Servicing", "Orbital Defense"],
        "founded_year": 2021, "headquarters": "Adelaide, Australia", "website": "heorobotics.com",
        "funding_stage": "Seed (Australian space ecosystem)",
        "is_public": False,
        "description": (
            "High Earth Orbit Robotics (HEO Robotics) develops orbital robotic systems "
            "for space servicing and domain awareness. Its dual-use platforms can inspect, "
            "service, or surveil satellites in high Earth orbit, supporting both commercial "
            "and defense space situational awareness missions."
        ),
        "programs": ["Emerging dual-use space traction"],
        "export_countries": ["AU"],
        "aliases": ["HEO Robotics"],
    },

    # =========================================================
    # === FRANCE — Additional private defense players =========
    # =========================================================

    {
        "name": "Turgis & Gaillard", "ticker": "TG-PRIV", "country": "France",
        "market_cap": 0.12, "stock_price": 0, "change_percent": 0,
        "revenue": 0.04, "employees": 120,
        "specializations": ["MALE UAS", "Drone Manufacturing", "Aerospace", "Defense Technology", "ISR"],
        "founded_year": 2012, "headquarters": "Paris, France", "website": "turgis-gaillard.fr",
        "linkedin": "https://www.linkedin.com/company/turgis-gaillard",
        "funding_stage": "Private",
        "is_public": False,
        "description": (
            "Turgis & Gaillard is a French defense industrial company developing advanced unmanned "
            "aerial systems for the French armed forces and export markets. Its subsidiary GASA "
            "(Gaillard Avions et Systèmes Avancés) is developing the AAROK, a 100% French MALE "
            "(Medium Altitude Long Endurance) drone designed for ISR and tactical missions, built "
            "in partnership with Thales. AAROK is positioned as an alternative to foreign MALE UAS "
            "to reinforce French strategic autonomy in the drone domain."
        ),
        "programs": ["AAROK MALE UAS (with Thales)", "French Armed Forces drone programs"],
        "export_countries": ["FR"],
        "aliases": ["T&G", "Turgis Gaillard", "GASA"],
    },
    {
        "name": "Cerbair", "ticker": "CERB-PRIV", "country": "France",
        "market_cap": 0.06, "stock_price": 0, "change_percent": 0,
        "revenue": 0.015, "employees": 70,
        "specializations": ["Counter-UAS", "Detection", "AI", "Electronic Warfare"],
        "founded_year": 2015, "headquarters": "Paris, France", "website": "cerbair.com",
        "funding_stage": "Growth — €20M+ (Bpifrance, Ace Capital)",
        "is_public": False,
        "description": (
            "Cerbair develops RF detection and neutralization systems for counter-drone operations. "
            "Its HYDRA platform provides passive radar detection and classification of hostile UAVs "
            "for military bases, critical infrastructure, and event protection. Deployed with the "
            "French Ministry of Interior and military establishments."
        ),
        "programs": ["HYDRA counter-drone detection", "French Ministry of Interior deployments"],
        "export_countries": ["FR", "AE"],
        "aliases": ["Cerbair SAS"],
    },
    {
        "name": "Lacroix Defense", "ticker": "LACD-PRIV", "country": "France",
        "market_cap": 0.25, "stock_price": 0, "change_percent": 0,
        "revenue": 0.12, "employees": 650,
        "specializations": ["Pyrotechnics", "Countermeasures", "Smoke Systems", "Decoys"],
        "founded_year": 1936, "headquarters": "Muret, France", "website": "lacroix-defense.com",
        "funding_stage": "Private (Lacroix Group subsidiary)",
        "is_public": False,
        "description": (
            "Lacroix Defense is the defense division of the French Lacroix Group, specializing in "
            "pyrotechnic countermeasures, smoke systems, and decoys for armored vehicles, aircraft, "
            "and naval platforms. Its products protect military assets from IR-guided missiles and "
            "provide tactical screening capabilities. Lacroix is a key supplier to French armed forces "
            "and NATO allies, with systems integrated on Leclerc tanks, Rafale aircraft, and FREMM frigates."
        ),
        "programs": ["Vehicle countermeasures (Leclerc, Griffon, VBCI)", "Airborne flares (Rafale, NH90)", "Nav…162152 tokens truncated…he Dauphin/Fennec fleet across the three French armed services. 160 aircraft programmed in total under the joint light helicopter programme.",
        "contracting_authority": "DGA",
        "authority_country": "France",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 2000.0,
        "amount_max": 2500.0,
        "status": "awarded",
        "publication_date": "2022-11-28",
        "deadline": None,
        "awarded_to": "Airbus Helicopters",
        "program": "HIL Guépard",
        "source_url": "https://www.airbus.com/en/newsroom/press-releases/2021-12-france-orders-the-h160m-for-its-joint-light-helicopter-programme",
        "reliability": "confirmed",
    },
    {
        "title": "Australian SSN-AUKUS Submarines — Design Phase",
        "description": "Design and engineering phase for the SSN-AUKUS conventionally-armed nuclear-powered submarines under the AUKUS partnership. Estimated total program $268-368B AUD.",
        "contracting_authority": "Australian DoD / UK MoD",
        "authority_country": "Australia",
        "authority_type": "bilateral",
        "category": "naval",
        "amount_min": 8000.0,
        "amount_max": 12000.0,
        "status": "awarded",
        "publication_date": "2023-03-13",
        "deadline": None,
        "awarded_to": "BAE Systems / ASC",
        "program": "SSN-AUKUS",
        "source_url": "https://www.gov.uk/government/news/4-billion-uk-contracts-progresses-aukus-submarine-design",
        "reliability": "confirmed",
    },
    {
        "title": "Poland F-35A — 32 Aircraft Full Production",
        "description": "Production and delivery contract for 32 F-35A aircraft for the Polish Air Force. Part of Poland's largest ever defense procurement, with first aircraft delivered in late 2024.",
        "contracting_authority": "Polish Ministry of Defence",
        "authority_country": "Poland",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 4600.0,
        "amount_max": 5000.0,
        "status": "awarded",
        "publication_date": "2024-01-30",
        "deadline": None,
        "awarded_to": "Lockheed Martin",
        "program": "F-35 JSF",
        "source_url": "https://news.lockheedmartin.com/2024-08-28-Poland-and-Lockheed-Martin-Celebrate-Debut-of-Polands-First-F-35A-Husarz",
        "reliability": "confirmed",
    },
    {
        "title": "German Puma IFV Modernisation — Full Fleet Upgrade",
        "description": "Full fleet upgrade of 350+ Puma infantry fighting vehicles to the S1 standard for the German Army. Includes integration of new weapon systems and digital connectivity.",
        "contracting_authority": "BAAINBw",
        "authority_country": "Germany",
        "authority_type": "national",
        "category": "land",
        "amount_min": 1800.0,
        "amount_max": 2200.0,
        "status": "awarded",
        "publication_date": "2023-07-14",
        "deadline": None,
        "awarded_to": "Rheinmetall / PSM",
        "program": "Puma S1",
        "source_url": "https://www.rheinmetall.com/en/media/news-watch/news/2023/apr/2023-04-19-order-puma",
        "reliability": "confirmed",
    },
    # ── ESSI / European Air Defence ──────────────────────────────────────────────
    {
        "title": "ESSI Air Defence Integration — German MOD",
        "description": "Framework programme for the European Sky Shield Initiative (ESSI) led by Germany. Integration of Patriot, IRIS-T SLM and Arrow-3 systems into a layered air defence architecture for European NATO members.",
        "contracting_authority": "German MOD (BMVg)",
        "authority_country": "Germany",
        "authority_type": "bilateral",
        "category": "missiles",
        "amount_min": 3000.0,
        "amount_max": 5000.0,
        "status": "open",
        "publication_date": "2024-02-01",
        "deadline": None,
        "awarded_to": None,
        "program": "European Sky Shield Initiative",
        "source_url": "https://www.bmvg.de/de/aktuelles/european-sky-shield-die-initiative-im-ueberblick-5511066",
        "reliability": "estimated",
    },
    # ── OCCAR Programmes ─────────────────────────────────────────────────────────
    {
        "title": "A400M Atlas Sustainment Contract",
        "description": "Long-term performance-based logistics and sustainment contract for the A400M Atlas military transport aircraft fleet across France, Germany, Spain, UK, Belgium and Luxembourg.",
        "contracting_authority": "OCCAR",
        "authority_country": "Europe",
        "authority_type": "bilateral",
        "category": "aerospace",
        "amount_min": 1000.0,
        "amount_max": 2000.0,
        "status": "awarded",
        "publication_date": "2024-05-01",
        "deadline": None,
        "awarded_to": "Airbus Defence & Space",
        "program": "A400M",
        "source_url": "https://www.airbus.com/en/newsroom/press-releases/2024-10-airbus-and-occar-sign-a400m-contractual-framework-update",
        "reliability": "confirmed",
    },
    {
        "title": "Boxer Armoured Vehicle Expansion",
        "description": "Additional production lots of the Boxer modular armoured fighting vehicle for OCCAR member nations. Programme has expanded significantly with new orders from Poland and the Netherlands.",
        "contracting_authority": "OCCAR",
        "authority_country": "Europe",
        "authority_type": "bilateral",
        "category": "land",
        "amount_min": 1000.0,
        "amount_max": 1800.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "KNDS / Rheinmetall / Krauss-Maffei Wegmann",
        "program": "Boxer",
        "source_url": "https://www.occar.int/our-work/programmes/boxer-a-multi-role-armoured-vehicle",
        "reliability": "confirmed",
    },
    {
        "title": "Tiger MkIII Helicopter Upgrade",
        "description": "Mid-life upgrade of Tiger attack helicopters to the MkIII standard for France, Germany and Spain. Includes new sensors, weapons integration and digital architecture.",
        "contracting_authority": "OCCAR",
        "authority_country": "Europe",
        "authority_type": "bilateral",
        "category": "aerospace",
        "amount_min": 2000.0,
        "amount_max": 3500.0,
        "status": "open",
        "publication_date": "2024-04-01",
        "deadline": None,
        "awarded_to": None,
        "program": "Tiger MkIII",
        "source_url": "https://www.airbus.com/en/newsroom/press-releases/2022-03-france-and-spain-launch-tiger-mkiii-programme",
        "reliability": "estimated",
    },
    {
        "title": "HYDIS Hypersonic Defence Interceptor",
        "description": "European research and development programme for a hypersonic defence interceptor. Addresses growing threats from hypersonic glide vehicles and advanced ballistic missiles.",
        "contracting_authority": "OCCAR",
        "authority_country": "Europe",
        "authority_type": "bilateral",
        "category": "missiles",
        "amount_min": 800.0,
        "amount_max": 1500.0,
        "status": "open",
        "publication_date": "2024-04-01",
        "deadline": None,
        "awarded_to": None,
        "program": "HYDIS",
        "source_url": "https://www.occar.int/our-work/programmes/hydis-programme",
        "reliability": "estimated",
    },
    {
        "title": "MMCM Mine Countermeasures Programme",
        "description": "Maritime Mine Countermeasures (MMCM) programme for France and UK. Development of unmanned underwater and surface systems to detect and neutralise sea mines.",
        "contracting_authority": "OCCAR",
        "authority_country": "Europe",
        "authority_type": "bilateral",
        "category": "naval",
        "amount_min": 500.0,
        "amount_max": 900.0,
        "status": "open",
        "publication_date": "2024-05-01",
        "deadline": None,
        "awarded_to": None,
        "program": "MMCM",
        "source_url": "https://www.occar.int/our-work/programmes/mmcm-maritime-mine-counter-measures",
        "reliability": "confirmed",
    },
    {
        "title": "ESSOR Secure Software Defined Radio",
        "description": "European Secure Software Radio (ESSOR) programme developing interoperable secure tactical radios for European land forces under the OCCAR framework.",
        "contracting_authority": "OCCAR",
        "authority_country": "Europe",
        "authority_type": "bilateral",
        "category": "services",
        "amount_min": 300.0,
        "amount_max": 700.0,
        "status": "open",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": None,
        "program": "ESSOR",
        "source_url": "https://www.occar.int/our-work/programmes/essor-european-secure-software-defined-radio",
        "reliability": "confirmed",
    },
    {
        "title": "REACT Electronic Warfare Programme",
        "description": "Research and development programme for next-generation electronic warfare capabilities, covering electronic attack, electronic support and electronic protection for European armed forces.",
        "contracting_authority": "OCCAR",
        "authority_country": "Europe",
        "authority_type": "bilateral",
        "category": "cyber",
        "amount_min": 500.0,
        "amount_max": 1200.0,
        "status": "open",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": None,
        "program": "REACT",
        "source_url": "https://www.occar.int/our-work/programmes/react-responsive-electronic-attack-for-cooperative-tasks",
        "reliability": "estimated",
    },
    {
        "title": "MMPC Corvette Programme",
        "description": "Multi-Mission Patrol Corvette (MMPC) development programme for European navies. Design for a versatile surface combatant capable of ASW, AAW and ASuW missions.",
        "contracting_authority": "OCCAR",
        "authority_country": "Europe",
        "authority_type": "bilateral",
        "category": "naval",
        "amount_min": 3000.0,
        "amount_max": 6000.0,
        "status": "open",
        "publication_date": "2024-05-01",
        "deadline": None,
        "awarded_to": None,
        "program": "MMPC",
        "source_url": "https://www.occar.int/our-work/programmes/mmpc",
        "reliability": "estimated",
    },
    {
        "title": "MUSIS Space Imaging Programme",
        "description": "Multinational Space-based Imaging System (MUSIS) providing satellite reconnaissance imagery to France, Germany, Italy, Spain, Belgium and Greece for defence and security purposes.",
        "contracting_authority": "OCCAR",
        "authority_country": "Europe",
        "authority_type": "bilateral",
        "category": "space",
        "amount_min": 1500.0,
        "amount_max": 2500.0,
        "status": "open",
        "publication_date": "2024-04-01",
        "deadline": None,
        "awarded_to": None,
        "program": "MUSIS",
        "source_url": "https://occar.int/our-work/programmes/musis-the-multinational-space-based-imaging-system-common-interoperability-layer-cil",
        "reliability": "estimated",
    },
    {
        "title": "ASTER Missile Production Series",
        "description": "Production contract for ASTER 15 and ASTER 30 surface-to-air missiles for France, Italy and export customers. ASTER is the main armament of the PAAMS, SAMP/T and Horizon-class systems.",
        "contracting_authority": "OCCAR",
        "authority_country": "Europe",
        "authority_type": "bilateral",
        "category": "missiles",
        "amount_min": 2000.0,
        "amount_max": 4000.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "MBDA",
        "program": "ASTER",
        "source_url": "https://www.occar.int/news/first-aster-missile-deliveries-to-italy-after-production-acceleration-and-increase-contracted-by-occar",
        "reliability": "confirmed",
    },
    {
        "title": "MU90 Torpedo Sustainment",
        "description": "Sustainment and spiral upgrade contract for the MU90 Impact lightweight anti-submarine torpedo in service with France, Germany, Italy and Australia.",
        "contracting_authority": "OCCAR",
        "authority_country": "Europe",
        "authority_type": "bilateral",
        "category": "naval",
        "amount_min": 300.0,
        "amount_max": 700.0,
        "status": "awarded",
        "publication_date": "2024-04-01",
        "deadline": None,
        "awarded_to": "EUROTORP (Thales / Leonardo)",
        "program": "MU90",
        "source_url": "https://www.occar.int/our-work/programmes/lwt-mu90-lightweight-torpedo",
        "reliability": "confirmed",
    },
    {
        "title": "VBAE Armoured Reconnaissance Vehicle",
        "description": "Development of the Véhicule Blindé d'Aide à l'Engagement (VBAE), a light protected vehicle for French Army reconnaissance and fire support missions.",
        "contracting_authority": "OCCAR",
        "authority_country": "Europe",
        "authority_type": "bilateral",
        "category": "land",
        "amount_min": 700.0,
        "amount_max": 1500.0,
        "status": "open",
        "publication_date": "2024-04-01",
        "deadline": None,
        "awarded_to": None,
        "program": "VBAE",
        "source_url": "https://www.occar.int/our-work/programmes/vbae",
        "reliability": "estimated",
    },
    {
        "title": "Wide Wet Gap Crossing Engineering Programme",
        "description": "European programme to develop next-generation wet gap crossing capabilities for heavy armoured forces, including bridge-laying vehicles and assault bridging systems.",
        "contracting_authority": "OCCAR",
        "authority_country": "Europe",
        "authority_type": "bilateral",
        "category": "land",
        "amount_min": 1000.0,
        "amount_max": 2000.0,
        "status": "open",
        "publication_date": "2024-05-01",
        "deadline": None,
        "awarded_to": None,
        "program": "WWGC",
        "source_url": "https://occar.int/our-work/programmes/wwgc-wide-wet-gap-crossing-programme",
        "reliability": "estimated",
    },
    {
        "title": "NH90 Helicopter Sustainment — NATO NSPA",
        "description": "Performance-based logistics contract covering fleet-wide sustainment of NH90 medium utility helicopters across NATO nations through the NATO Support and Procurement Agency.",
        "contracting_authority": "NATO NSPA",
        "authority_country": "NATO",
        "authority_type": "nato",
        "category": "aerospace",
        "amount_min": 800.0,
        "amount_max": 1200.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "Airbus Helicopters / Leonardo",
        "program": "NH90",
        "source_url": "https://www.nspa.nato.int",
        "reliability": "confirmed",
    },
    # ── US Programmes — Air ────────────────────────────────────────────────────
    {
        "title": "B-21 Raider Strategic Bomber — Production Lot 2",
        "description": "Second production lot for the Northrop Grumman B-21 Raider next-generation stealth strategic bomber for the USAF. The B-21 replaces the B-1B Lancer and B-2 Spirit.",
        "contracting_authority": "USAF",
        "authority_country": "United States",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 10000.0,
        "amount_max": 15000.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "Northrop Grumman",
        "program": "B-21 Raider",
        "source_url": "https://www.af.mil/News/Article-Display/Article/4412198/daf-increases-b-21-raider-production-capacity-to-deliver-combat-capability-fast/",
        "reliability": "estimated",
    },
    {
        "title": "NGAD Next Generation Air Dominance Development",
        "description": "Development phase for the Next Generation Air Dominance (NGAD) sixth-generation crewed fighter and its family of systems to replace the F-22 Raptor for the USAF.",
        "contracting_authority": "USAF",
        "authority_country": "United States",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 15000.0,
        "amount_max": 25000.0,
        "status": "open",
        "publication_date": "2025-03-15",
        "deadline": None,
        "awarded_to": None,
        "program": "NGAD",
        "source_url": "https://www.af.mil/News/Article-Display/Article/4131345/air-force-awards-contract-for-next-generation-air-dominance-ngad-platform-f-47/",
        "reliability": "estimated",
    },
    {
        "title": "E-7 Wedgetail AEW Acquisition — USAF",
        "description": "Procurement of Boeing E-7A Wedgetail Airborne Early Warning & Control aircraft to replace the aging E-3 Sentry AWACS fleet for the U.S. Air Force.",
        "contracting_authority": "USAF",
        "authority_country": "United States",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 2500.0,
        "amount_max": 4000.0,
        "status": "open",
        "publication_date": "2024-02-01",
        "deadline": None,
        "awarded_to": None,
        "program": "E-7 Wedgetail",
        "source_url": "https://boeing.mediaroom.com/news-releases-statements?item=131475",
        "reliability": "confirmed",
    },
    {
        "title": "T-7A Red Hawk Advanced Trainer Programme",
        "description": "Production contract for the Boeing T-7A Red Hawk jet trainer to replace the T-38 Talon for USAF undergraduate pilot training. Programme has faced schedule delays.",
        "contracting_authority": "USAF",
        "authority_country": "United States",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 8000.0,
        "amount_max": 12000.0,
        "status": "open",
        "publication_date": "2026-05-01",
        "deadline": None,
        "awarded_to": "Boeing",
        "program": "T-7A Red Hawk",
        "source_url": "https://www.af.mil/News/Article-Display/Article/4477064/air-force-greenlights-t-7a-red-hawk-for-production-following-milestone-c/",
        "reliability": "confirmed",
    },
    {
        "title": "KC-46 Pegasus Tanker Production",
        "description": "Ongoing production contract for the Boeing KC-46A Pegasus aerial refuelling tanker replacing the KC-135 Stratotanker. USAF plans to acquire 179 aircraft total.",
        "contracting_authority": "USAF",
        "authority_country": "United States",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 5000.0,
        "amount_max": 8000.0,
        "status": "awarded",
        "publication_date": "2024-02-01",
        "deadline": None,
        "awarded_to": "Boeing",
        "program": "KC-46 Pegasus",
        "source_url": "https://www.af.mil/About-Us/Fact-Sheets/Display/Article/104537/kc-46a-pegasus/",
        "reliability": "confirmed",
    },
    {
        "title": "FLRAA Future Long-Range Assault Aircraft",
        "description": "Development contract for the Bell V-280 Valor tiltrotor Future Long-Range Assault Aircraft to replace the Black Hawk helicopter for the U.S. Army.",
        "contracting_authority": "US Army",
        "authority_country": "United States",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 7000.0,
        "amount_max": 10000.0,
        "status": "open",
        "publication_date": "2024-02-01",
        "deadline": None,
        "awarded_to": "Bell Textron",
        "program": "FLRAA",
        "source_url": "https://www.army.mil/article/278591/flraa_achieves_milestone_b_enters_next_phase_of_development",
        "reliability": "confirmed",
    },
    {
        "title": "FARA Future Attack Reconnaissance Aircraft",
        "description": "Cancelled competitive development programme for the Future Attack Reconnaissance Aircraft to replace the OH-58D Kiowa. Programme cancelled in Feb 2024 citing cost and capability reviews.",
        "contracting_authority": "US Army",
        "authority_country": "United States",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 5000.0,
        "amount_max": 8000.0,
        "status": "cancelled",
        "publication_date": "2024-02-01",
        "deadline": None,
        "awarded_to": None,
        "program": "FARA",
        "source_url": "https://www.congress.gov/crs-product/IF12592",
        "reliability": "confirmed",
    },
    {
        "title": "CH-53K King Stallion Heavy Lift Procurement",
        "description": "Production contract for the Sikorsky CH-53K King Stallion heavy-lift helicopter for the U.S. Marine Corps. The CH-53K replaces the CH-53E Super Stallion.",
        "contracting_authority": "US Navy / USMC",
        "authority_country": "United States",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 3000.0,
        "amount_max": 5000.0,
        "status": "awarded",
        "publication_date": "2024-02-01",
        "deadline": None,
        "awarded_to": "Sikorsky (Lockheed Martin)",
        "program": "CH-53K",
        "source_url": "https://www.navair.navy.mil",
        "reliability": "confirmed",
    },
    {
        "title": "Apache AH-64E Attack Helicopter Procurement — Poland",
        "description": "Foreign Military Sale of 96 Boeing AH-64E Apache Guardian attack helicopters for the Polish Army. Poland's largest-ever helicopter procurement programme.",
        "contracting_authority": "Polish Ministry of Defence",
        "authority_country": "Poland",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 10000.0,
        "amount_max": 12000.0,
        "status": "awarded",
        "publication_date": "2024-02-01",
        "deadline": None,
        "awarded_to": "Boeing",
        "program": "AH-64E Apache",
        "source_url": "https://www.gov.pl/web/national-defence",
        "reliability": "confirmed",
    },
    {
        "title": "FA-50 Fighter Procurement — Poland",
        "description": "Procurement of 48 FA-50 light combat aircraft from Korea Aerospace Industries (KAI) for the Polish Air Force, partially offsetting the planned fleet gap.",
        "contracting_authority": "Polish Ministry of Defence",
        "authority_country": "Poland",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 2500.0,
        "amount_max": 4000.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "Korea Aerospace Industries",
        "program": "FA-50",
        "source_url": "https://www.gov.pl/web/national-defence",
        "reliability": "confirmed",
    },
    {
        "title": "Black Hawk Replacement — AW149 for Poland",
        "description": "Procurement of AW149 medium utility helicopters from Leonardo to replace ageing Mi-17 helicopters in Polish service. Part of Poland's broad rotary-wing modernisation.",
        "contracting_authority": "Polish Ministry of Defence",
        "authority_country": "Poland",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 2000.0,
        "amount_max": 3500.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "Leonardo",
        "program": "AW149",
        "source_url": "https://www.gov.pl/web/national-defence",
        "reliability": "confirmed",
    },
    {
        "title": "Rafale F5 Standard Development",
        "description": "Development contract for the Rafale F5 standard, the next major upgrade introducing a new radar, stealth enhancements, enhanced electronic warfare and integration of new weapons.",
        "contracting_authority": "French MOD (DGA)",
        "authority_country": "France",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 3000.0,
        "amount_max": 5000.0,
        "status": "open",
        "publication_date": "2024-04-01",
        "deadline": None,
        "awarded_to": "Dassault Aviation",
        "program": "Rafale F5",
        "source_url": "https://www.defense.gouv.fr",
        "reliability": "confirmed",
    },
    {
        "title": "P-8A Poseidon Maritime Patrol Aircraft — Germany",
        "description": "Procurement of P-8A Poseidon maritime patrol and anti-submarine warfare aircraft for the German Navy to replace the ageing P-3C Orion fleet.",
        "contracting_authority": "German MOD (BMVg)",
        "authority_country": "Germany",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 1500.0,
        "amount_max": 2500.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "Boeing",
        "program": "P-8A Poseidon",
        "source_url": "https://www.bmvg.de/en/federal-republic-of-germany-purchases-five-p-8a-poseidon-5102666",
        "reliability": "confirmed",
    },
    {
        "title": "MQ-9B SkyGuardian RPAS — Canada",
        "description": "Procurement of MQ-9B SkyGuardian remotely piloted aircraft systems for the Royal Canadian Air Force to replace the CP-140 Aurora maritime patrol aircraft.",
        "contracting_authority": "Canadian DND",
        "authority_country": "Canada",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 1800.0,
        "amount_max": 2500.0,
        "status": "open",
        "publication_date": "2024-02-01",
        "deadline": None,
        "awarded_to": None,
        "program": "MQ-9B SkyGuardian",
        "source_url": "https://www.canada.ca/en/department-national-defence.html",
        "reliability": "estimated",
    },
    {
        "title": "C-390 Millennium Transport Aircraft — Netherlands",
        "description": "Procurement of five Embraer C-390 Millennium tactical transport aircraft for the Royal Netherlands Air Force to replace the C-130H Hercules.",
        "contracting_authority": "Netherlands MOD",
        "authority_country": "Netherlands",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 1000.0,
        "amount_max": 1800.0,
        "status": "awarded",
        "publication_date": "2024-04-01",
        "deadline": None,
        "awarded_to": "Embraer",
        "program": "C-390 Millennium",
        "source_url": "https://www.government.nl",
        "reliability": "confirmed",
    },
    {
        "title": "KF-21 Boramae Fighter Development",
        "description": "Development and production of the KAI KF-21 Boramae 4.5-generation fighter aircraft for the Republic of Korea Air Force, with technology transfer to Indonesia.",
        "contracting_authority": "South Korean DAPA",
        "authority_country": "South Korea",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 12000.0,
        "amount_max": 18000.0,
        "status": "open",
        "publication_date": "2026-05-01",
        "deadline": None,
        "awarded_to": "Korea Aerospace Industries",
        "program": "KF-21 Boramae",
        "source_url": "https://www.koreatimes.co.kr/southkorea/defense/20260507/after-1600-test-flights-kf-21-is-officially-combat-ready",
        "reliability": "confirmed",
    },
    {
        "title": "F-X Sixth Generation Fighter — Japan",
        "description": "Japanese indigenous sixth-generation fighter development programme, now merged with the UK-Italy GCAP programme. Japan's most ambitious defence acquisition programme.",
        "contracting_authority": "Japanese MOD (ATLA)",
        "authority_country": "Japan",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 30000.0,
        "amount_max": 50000.0,
        "status": "open",
        "publication_date": "2024-04-01",
        "deadline": None,
        "awarded_to": "Mitsubishi Heavy Industries",
        "program": "F-X / GCAP",
        "source_url": "https://www.gcap.gov.uk",
        "reliability": "estimated",
    },
    {
        "title": "Su-57 Felon Production Expansion",
        "description": "Expanded production contract for the Sukhoi Su-57 fifth-generation stealth multirole fighter for the Russian Aerospace Forces.",
        "contracting_authority": "Russian MOD",
        "authority_country": "Russia",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 5000.0,
        "amount_max": 9000.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "United Aircraft Corporation (UAC)",
        "program": "Su-57",
        "source_url": "https://tass.com/defense/1911331",
        "reliability": "estimated",
    },
    {
        "title": "MQ-25 Stingray Carrier-Based Tanker Development",
        "description": "Development and production contract for the Boeing MQ-25A Stingray unmanned aerial refuelling aircraft for the U.S. Navy, providing organic refuelling from aircraft carriers.",
        "contracting_authority": "US Navy",
        "authority_country": "United States",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 5000.0,
        "amount_max": 7000.0,
        "status": "open",
        "publication_date": "2024-04-01",
        "deadline": None,
        "awarded_to": "Boeing",
        "program": "MQ-25 Stingray",
        "source_url": "https://www.navair.navy.mil/product/MQ-25tm-Stingray",
        "reliability": "confirmed",
    },
    {
        "title": "Protector RG1 RPAS Programme — RAF",
        "description": "Production and initial sustainment contract for the General Atomics MQ-9B Protector RG1 RPAS for the Royal Air Force, replacing the MQ-9A Reaper.",
        "contracting_authority": "UK RAF",
        "authority_country": "United Kingdom",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 1500.0,
        "amount_max": 2500.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "General Atomics",
        "program": "Protector RG1",
        "source_url": "https://www.raf.mod.uk",
        "reliability": "confirmed",
    },
    {
        "title": "Heron TP Armed UAV Procurement — Germany",
        "description": "Procurement of IAI Heron TP long-endurance armed UAVs for the German Air Force (Luftwaffe), marking Germany's first armed drone acquisition.",
        "contracting_authority": "German MOD (BMVg)",
        "authority_country": "Germany",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 500.0,
        "amount_max": 900.0,
        "status": "awarded",
        "publication_date": "2024-02-01",
        "deadline": None,
        "awarded_to": "IAI / Rheinmetall",
        "program": "Heron TP",
        "source_url": "https://www.bmvg.de/de/themen/dossiers/heron-tp",
        "reliability": "confirmed",
    },
    {
        "title": "MQ-28 Ghost Bat Loyal Wingman — Australia",
        "description": "Development and initial production of the Boeing MQ-28A Ghost Bat autonomous loyal wingman aircraft for the Royal Australian Air Force.",
        "contracting_authority": "Royal Australian Air Force",
        "authority_country": "Australia",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 1000.0,
        "amount_max": 2000.0,
        "status": "open",
        "publication_date": "2024-04-01",
        "deadline": None,
        "awarded_to": "Boeing Australia",
        "program": "MQ-28 Ghost Bat",
        "source_url": "https://www.airforce.gov.au",
        "reliability": "confirmed",
    },
    {
        "title": "Bayraktar TB2 Export Programme",
        "description": "Turkish defence export programme covering production and delivery of Bayraktar TB2 tactical armed UAVs to multiple export customers across Europe, Africa and Asia.",
        "contracting_authority": "Turkish SSB",
        "authority_country": "Turkey",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 1000.0,
        "amount_max": 3000.0,
        "status": "awarded",
        "publication_date": "2024-04-01",
        "deadline": None,
        "awarded_to": "Baykar",
        "program": "Bayraktar TB2",
        "source_url": "https://www.ssb.gov.tr",
        "reliability": "estimated",
    },
    {
        "title": "Kizilelma UCAV Development",
        "description": "Development of Baykar Kizilelma (Red Apple) unmanned combat aerial vehicle, a carrier-capable supersonic UCAV for the Turkish Navy and Air Force.",
        "contracting_authority": "Turkish SSB",
        "authority_country": "Turkey",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 2000.0,
        "amount_max": 5000.0,
        "status": "open",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "Baykar",
        "program": "Kizilelma",
        "source_url": "https://www.ssb.gov.tr",
        "reliability": "estimated",
    },
    {
        "title": "Tempest GCAP Development Phase",
        "description": "Development of the Global Combat Air Programme (GCAP) sixth-generation fighter aircraft by the UK, Italy and Japan. Programme aims for an entry into service around 2035.",
        "contracting_authority": "GCAP International Government Organisation",
        "authority_country": "Europe",
        "authority_type": "bilateral",
        "category": "aerospace",
        "amount_min": 25000.0,
        "amount_max": 40000.0,
        "status": "open",
        "publication_date": "2024-05-01",
        "deadline": None,
        "awarded_to": "BAE Systems / Leonardo / Mitsubishi Heavy Industries",
        "program": "GCAP",
        "source_url": "https://www.gov.uk/government/news/global-combat-air-programme-gcap",
        "reliability": "estimated",
    },
    # ── US Programmes — Naval ────────────────────────────────────────────────────
    {
        "title": "Columbia-class SSBN Strategic Submarine",
        "description": "Design and construction contract for the Columbia-class ballistic missile submarine to replace the Ohio-class SSBN. The most expensive US Navy shipbuilding programme in history.",
        "contracting_authority": "US Navy",
        "authority_country": "United States",
        "authority_type": "national",
        "category": "naval",
        "amount_min": 12000.0,
        "amount_max": 18000.0,
        "status": "awarded",
        "publication_date": "2024-02-01",
        "deadline": None,
        "awarded_to": "General Dynamics Electric Boat",
        "program": "Columbia-class",
        "source_url": "https://news.usni.org/2024/05/01/report-to-congress-on-columbia-class-ballistic-missile-sub",
        "reliability": "confirmed",
    },
    {
        "title": "Virginia-class Block V Attack Submarine",
        "description": "Multi-ship production contract for Block V Virginia-class attack submarines, featuring the Virginia Payload Module (VPM) that quadruples Tomahawk missile capacity.",
        "contracting_authority": "US Navy",
        "authority_country": "United States",
        "authority_type": "national",
        "category": "naval",
        "amount_min": 9000.0,
        "amount_max": 12000.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "General Dynamics Electric Boat / Huntington Ingalls",
        "program": "Virginia-class Block V",
        "source_url": "https://www.navy.mil/Press-Office/News-Stories/display-news/Article/4170873/navy-awards-contract-modification-for-two-additional-virginia-class-submarines/",
        "reliability": "confirmed",
    },
    {
        "title": "Constellation-class Guided-Missile Frigate FFG-62",
        "description": "Production contract for the Constellation-class (FFG-62) guided-missile frigates for the U.S. Navy, based on the FREMM hull and replacing the Perry-class.",
        "contracting_authority": "US Navy",
        "authority_country": "United States",
        "authority_type": "national",
        "category": "naval",
        "amount_min": 8000.0,
        "amount_max": 12000.0,
        "status": "awarded",
        "publication_date": "2024-04-01",
        "deadline": None,
        "awarded_to": "Fincantieri Marinette Marine",
        "program": "FFG-62 Constellation",
        "source_url": "https://www.navy.mil/Resources/Fact-Files/Display-FactFiles/Article/2633250/constellation-class-ffg/",
        "reliability": "confirmed",
    },
    {
        "title": "Zumwalt-class DDG Modernization — Hypersonic Missiles",
        "description": "Modernisation programme to convert the three Zumwalt-class destroyers to carry the Conventional Prompt Strike (CPS) hypersonic missile in place of the Advanced Gun System.",
        "contracting_authority": "US Navy",
        "authority_country": "United States",
        "authority_type": "national",
        "category": "naval",
        "amount_min": 1000.0,
        "amount_max": 2500.0,
        "status": "open",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": None,
        "program": "Zumwalt Modernization",
        "source_url": "https://news.usni.org/2024/12/06/first-u-s-warship-fitted-for-hypersonic-missiles-back-in-the-water",
        "reliability": "estimated",
    },
    {
        "title": "PPA Multipurpose Patrol Ship — Italy",
        "description": "Production of Pattugliatori Polivalenti d'Altura (PPA) multipurpose offshore patrol vessels for the Italian Navy. The ships provide patrol, logistics and limited combat capabilities.",
        "contracting_authority": "Italian MOD (SEGREDIFESA)",
        "authority_country": "Italy",
        "authority_type": "national",
        "category": "naval",
        "amount_min": 1500.0,
        "amount_max": 2500.0,
        "status": "awarded",
        "publication_date": "2024-02-01",
        "deadline": None,
        "awarded_to": "Fincantieri",
        "program": "PPA",
        "source_url": "https://www.difesa.it",
        "reliability": "confirmed",
    },
    {
        "title": "U212 NFS Near Future Submarine — Italy",
        "description": "Production of five U212 Near Future Submarines (NFS) for the Italian Navy, an enhanced variant of the Type 212 diesel-electric submarine developed with Germany.",
        "contracting_authority": "Italian MOD (SEGREDIFESA)",
        "authority_country": "Italy",
        "authority_type": "national",
        "category": "naval",
        "amount_min": 2200.0,
        "amount_max": 3200.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "Fincantieri / thyssenkrupp Marine Systems",
        "program": "U212 NFS",
        "source_url": "https://www.difesa.it",
        "reliability": "confirmed",
    },
    {
        "title": "FREMM Frigate Sustainment Upgrade — France",
        "description": "Mid-life upgrade programme for French Navy FREMM frigates including enhanced air defence systems, new electronic warfare suite and integration of future ASTER 30 Block 1 NT missiles.",
        "contracting_authority": "French MOD (DGA)",
        "authority_country": "France",
        "authority_type": "national",
        "category": "naval",
        "amount_min": 700.0,
        "amount_max": 1200.0,
        "status": "awarded",
        "publication_date": "2024-04-01",
        "deadline": None,
        "awarded_to": "Naval Group / Thales",
        "program": "FREMM",
        "source_url": "https://www.defense.gouv.fr",
        "reliability": "confirmed",
    },
    {
        "title": "Suffren-class Nuclear Attack Submarine (Barracuda programme)",
        "description": "Production contract for Suffren-class (Barracuda programme) nuclear attack submarines for the French Navy. Programme of six boats to modernise the fleet; lead boat S602 FS Suffren commissioned 2020.",
        "contracting_authority": "French MOD (DGA)",
        "authority_country": "France",
        "authority_type": "national",
        "category": "naval",
        "amount_min": 9000.0,
        "amount_max": 12000.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "Naval Group / TechnicAtome",
        "program": "Barracuda / Suffren-class",
        "source_url": "https://www.defense.gouv.fr",
        "reliability": "confirmed",
    },
    {
        "title": "Dreadnought-class SSBN Programme — UK",
        "description": "Production contract for four Dreadnought-class ballistic missile submarines to replace the Vanguard-class SSBN and maintain the UK's continuous at-sea nuclear deterrent.",
        "contracting_authority": "UK Ministry of Defence",
        "authority_country": "United Kingdom",
        "authority_type": "national",
        "category": "naval",
        "amount_min": 10000.0,
        "amount_max": 15000.0,
        "status": "awarded",
        "publication_date": "2024-04-01",
        "deadline": None,
        "awarded_to": "BAE Systems",
        "program": "Dreadnought-class",
        "source_url": "https://www.gov.uk/government/organisations/ministry-of-defence",
        "reliability": "confirmed",
    },
    {
        "title": "Hunter-class Frigate Programme — Australia",
        "description": "Production of nine Hunter-class (BAE Systems Type 26) anti-submarine warfare frigates for the Royal Australian Navy under the SEA 5000 programme.",
        "contracting_authority": "Australian Department of Defence",
        "authority_country": "Australia",
        "authority_type": "national",
        "category": "naval",
        "amount_min": 25000.0,
        "amount_max": 35000.0,
        "status": "awarded",
        "publication_date": "2024-02-01",
        "deadline": None,
        "awarded_to": "BAE Systems / ASC",
        "program": "Hunter-class",
        "source_url": "https://www.defence.gov.au",
        "reliability": "confirmed",
    },
    {
        "title": "Canadian Surface Combatant — River-class Destroyer (Type 26)",
        "description": "Production of 15 River-class destroyers (formerly 'Canadian Surface Combatant', renamed in 2024) for the Royal Canadian Navy under the National Shipbuilding Strategy, replacing the retired Iroquois-class destroyers and the Halifax-class frigates. Based on BAE Systems' Type 26 Global Combat Ship design; built by Irving Shipbuilding in Halifax with Lockheed Martin Canada as combat-systems integrator. Full-rate construction of the lead ship HMCS Fraser began in 2024.",
        "contracting_authority": "Canadian DND",
        "authority_country": "Canada",
        "authority_type": "national",
        "category": "naval",
        "amount_min": 40000.0,
        "amount_max": 60000.0,
        "status": "awarded",
        "publication_date": "2024-04-01",
        "deadline": None,
        "awarded_to": "Irving Shipbuilding / Lockheed Martin Canada / BAE Systems",
        "program": "Canadian Surface Combatant",
        "source_url": "https://www.canada.ca/en/department-national-defence.html",
        "reliability": "confirmed",
    },
    {
        "title": "Canadian Patrol Submarine Project (CPSP) — up to 12 submarines",
        "description": "Acquisition of up to 12 conventionally-powered, under-ice-capable submarines for the Royal Canadian Navy to replace the four ageing Victoria-class boats. It is one of the largest procurements in Canadian history (acquisition value estimated at ~CAD 20–24B). In 2025 Canada shortlisted two bidders: Hanwha Ocean (KSS-III / Jang Bogo-III design) and ThyssenKrupp Marine Systems (Type 212CD), with a supplier decision targeted for 2026–2028 and first delivery before 2035.",
        "contracting_authority": "Canadian DND / Public Services and Procurement Canada",
        "authority_country": "Canada",
        "authority_type": "national",
        "category": "naval",
        "amount_min": 20000.0,
        "amount_max": 24000.0,
        "status": "open",
        "publication_date": "2024-07-10",
        "deadline": None,
        "awarded_to": None,
        "program": "Canadian Patrol Submarine Project",
        "source_url": "https://www.canada.ca/en/department-national-defence/services/procurement/canadian-patrol-submarine-project.html",
        "reliability": "confirmed",
    },
    {
        "title": "KDDX Next-Generation Destroyer — South Korea",
        "description": "Development and production of the Korea Destroyer Next Generation (KDDX), a 6,000-tonne Aegis-equipped destroyer for the Republic of Korea Navy.",
        "contracting_authority": "South Korean DAPA",
        "authority_country": "South Korea",
        "authority_type": "national",
        "category": "naval",
        "amount_min": 5000.0,
        "amount_max": 9000.0,
        "status": "open",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": None,
        "program": "KDDX",
        "source_url": "https://www.dapa.go.kr",
        "reliability": "estimated",
    },
    {
        "title": "Mogami-class Multi-Function Frigate — Japan",
        "description": "Production of Mogami-class (30FFM) multi-function frigates for the Japan Maritime Self-Defense Force, incorporating advanced stealth design and multi-mission capabilities.",
        "contracting_authority": "Japanese MOD",
        "authority_country": "Japan",
        "authority_type": "national",
        "category": "naval",
        "amount_min": 4000.0,
        "amount_max": 7000.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "Mitsubishi Heavy Industries / Mitsui E&S",
        "program": "Mogami-class (30FFM)",
        "source_url": "https://www.mod.go.jp",
        "reliability": "confirmed",
    },
    {
        "title": "Yasen-M Nuclear Attack Submarine — Russia",
        "description": "Production contract for additional Yasen-M class nuclear-powered cruise missile submarines for the Russian Navy, armed with Kalibr and Oniks cruise missiles.",
        "contracting_authority": "Russian MOD",
        "authority_country": "Russia",
        "authority_type": "national",
        "category": "naval",
        "amount_min": 8000.0,
        "amount_max": 12000.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "Sevmash Shipyard",
        "program": "Yasen-M",
        "source_url": "https://eng.mil.ru",
        "reliability": "estimated",
    },
    {
        "title": "MILGEM-class Frigate Expansion — Turkey",
        "description": "Production and export of additional MILGEM-class corvettes and frigates for the Turkish Navy and export customers, building on the Istanbul and Kinaliada programme.",
        "contracting_authority": "Turkish SSB / Navy",
        "authority_country": "Turkey",
        "authority_type": "national",
        "category": "naval",
        "amount_min": 4000.0,
        "amount_max": 7000.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "STM / ASELSAN",
        "program": "MILGEM",
        "source_url": "https://www.ssb.gov.tr",
        "reliability": "estimated",
    },
    # ── US Programmes — Land ────────────────────────────────────────────────────
    {
        "title": "Abrams SEPv4 Upgrade Contract",
        "description": "Development contract for the M1A2 SEPv4 Abrams upgrade incorporating a new 3rd-generation FLIR, laser rangefinder upgrade and integration of the Trophy Active Protection System.",
        "contracting_authority": "US Army",
        "authority_country": "United States",
        "authority_type": "national",
        "category": "land",
        "amount_min": 1500.0,
        "amount_max": 3000.0,
        "status": "open",
        "publication_date": "2024-04-01",
        "deadline": None,
        "awarded_to": "General Dynamics Land Systems",
        "program": "M1 Abrams SEPv4",
        "source_url": "https://www.army.mil/article/261564/army_awards_abrams_sepv4_upgrade_contract",
        "reliability": "confirmed",
    },
    {
        "title": "JLTV Joint Light Tactical Vehicle Follow-On",
        "description": "Follow-on production contract for the Oshkosh L-ATV Joint Light Tactical Vehicle (JLTV) for the U.S. Army and Marine Corps, replacing the HMMWV.",
        "contracting_authority": "US Army",
        "authority_country": "United States",
        "authority_type": "national",
        "category": "land",
        "amount_min": 2000.0,
        "amount_max": 3500.0,
        "status": "awarded",
        "publication_date": "2024-01-01",
        "deadline": None,
        "awarded_to": "Oshkosh Defense",
        "program": "JLTV",
        "source_url": "https://www.army.mil/article/278300/oshkosh_defense_awarded_jltv_follow_on_contract",
        "reliability": "confirmed",
    },
    {
        "title": "Paladin Integrated Management — M109A7",
        "description": "Production contract for M109A7 Paladin Integrated Management (PIM) self-propelled howitzers for the U.S. Army, incorporating updated automotive components and digital systems.",
        "contracting_authority": "US Army",
        "authority_country": "United States",
        "authority_type": "national",
        "category": "land",
        "amount_min": 1000.0,
        "amount_max": 1800.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "BAE Systems",
        "program": "M109A7 Paladin",
        "source_url": "https://www.army.mil/article/271065/army_awards_paladin_integrated_management_production_contract",
        "reliability": "confirmed",
    },
    {
        "title": "HIMARS Expansion Contract",
        "description": "Expanded production contract for High Mobility Artillery Rocket System (HIMARS) launchers and M30/31 GMLRS rockets for the U.S. Army and Foreign Military Sales customers.",
        "contracting_authority": "US Army",
        "authority_country": "United States",
        "authority_type": "national",
        "category": "land",
        "amount_min": 4000.0,
        "amount_max": 7000.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "Lockheed Martin",
        "program": "HIMARS",
        "source_url": "https://www.army.mil/article/262534/army_awards_himars_expansion_contract",
        "reliability": "confirmed",
    },
    {
        "title": "Leopard 2A8 Main Battle Tank — Germany",
        "description": "Procurement of Leopard 2A8 main battle tanks for the German Army (Bundeswehr) as part of the post-2022 re-equipment programme to restore armoured combat capability.",
        "contracting_authority": "German MOD (BMVg)",
        "authority_country": "Germany",
        "authority_type": "national",
        "category": "land",
        "amount_min": 2500.0,
        "amount_max": 4000.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "Krauss-Maffei Wegmann",
        "program": "Leopard 2A8",
        "source_url": "https://www.bmvg.de/de/aktuelles/beschaffung-leopard-2a8-5437558",
        "reliability": "confirmed",
    },
    {
        "title": "K2 Black Panther Tank Procurement — Poland",
        "description": "Large-scale procurement of Hyundai Rotem K2 Black Panther main battle tanks for the Polish Army under the Wilk programme, with Polish domestic production planned.",
        "contracting_authority": "Polish Ministry of Defence",
        "authority_country": "Poland",
        "authority_type": "national",
        "category": "land",
        "amount_min": 5000.0,
        "amount_max": 9000.0,
        "status": "awarded",
        "publication_date": "2024-04-01",
        "deadline": None,
        "awarded_to": "Hyundai Rotem",
        "program": "K2 Black Panther",
        "source_url": "https://www.gov.pl/web/national-defence",
        "reliability": "confirmed",
    },
    {
        "title": "K9 Thunder Self-Propelled Howitzer — Poland",
        "description": "Mass procurement of Hanwha K9 Thunder 155mm self-propelled howitzers for the Polish Army alongside K9PL licensed production, under the Krab and Krab II programmes.",
        "contracting_authority": "Polish Ministry of Defence",
        "authority_country": "Poland",
        "authority_type": "national",
        "category": "land",
        "amount_min": 3000.0,
        "amount_max": 5000.0,
        "status": "awarded",
        "publication_date": "2024-04-01",
        "deadline": None,
        "awarded_to": "Hanwha / PGZ",
        "program": "K9 Thunder",
        "source_url": "https://www.gov.pl/web/national-defence",
        "reliability": "confirmed",
    },
    {
        "title": "Redback IFV Acquisition — Australia",
        "description": "Procurement of Hanwha AS21 Redback infantry fighting vehicles for the Australian Army under Land 400 Phase 3, replacing the M113 armoured personnel carrier.",
        "contracting_authority": "Australian Department of Defence",
        "authority_country": "Australia",
        "authority_type": "national",
        "category": "land",
        "amount_min": 5000.0,
        "amount_max": 7000.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "Hanwha Defense Australia",
        "program": "Redback IFV (Land 400 Ph3)",
        "source_url": "https://www.defence.gov.au",
        "reliability": "confirmed",
    },
    {
        "title": "Altay Main Battle Tank Production — Turkey",
        "description": "Production contract for the BMC Altay main battle tank for the Turkish Land Forces Command, developed indigenously with technology from Hyundai Rotem and Roketsan.",
        "contracting_authority": "Turkish SSB",
        "authority_country": "Turkey",
        "authority_type": "national",
        "category": "land",
        "amount_min": 3000.0,
        "amount_max": 5000.0,
        "status": "awarded",
        "publication_date": "2024-02-01",
        "deadline": None,
        "awarded_to": "BMC / ASELSAN / Roketsan",
        "program": "Altay MBT",
        "source_url": "https://www.ssb.gov.tr",
        "reliability": "estimated",
    },
    {
        "title": "Scorpion Land Combat System — France",
        "description": "Ongoing production of the Scorpion programme combining the Griffon, Jaguar and Serval vehicles into a digitally-networked armoured combat system for the French Army.",
        "contracting_authority": "French MOD (DGA)",
        "authority_country": "France",
        "authority_type": "national",
        "category": "land",
        "amount_min": 5000.0,
        "amount_max": 8000.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "KNDS (Nexter) / Arquus / Thales",
        "program": "Scorpion",
        "source_url": "https://www.defense.gouv.fr",
        "reliability": "confirmed",
    },
    {
        "title": "Caesar NG Next-Generation Self-Propelled Howitzer",
        "description": "Production contract for the wheeled Caesar NG (New Generation) 155mm/52-calibre self-propelled artillery system for the French Army, with automated loading and improved crew protection.",
        "contracting_authority": "French MOD (DGA)",
        "authority_country": "France",
        "authority_type": "national",
        "category": "land",
        "amount_min": 1000.0,
        "amount_max": 2000.0,
        "status": "awarded",
        "publication_date": "2024-02-01",
        "deadline": None,
        "awarded_to": "KNDS (Nexter)",
        "program": "Caesar NG",
        "source_url": "https://www.defense.gouv.fr",
        "reliability": "confirmed",
    },
    {
        "title": "Eitan Wheeled APC Procurement — Israel",
        "description": "Production contract for the Eitan (Namer 8×8) wheeled armoured personnel carrier for the Israel Defense Forces, replacing legacy M113 APCs.",
        "contracting_authority": "Israeli MOD",
        "authority_country": "Israel",
        "authority_type": "national",
        "category": "land",
        "amount_min": 1500.0,
        "amount_max": 2500.0,
        "status": "awarded",
        "publication_date": "2024-02-01",
        "deadline": None,
        "awarded_to": "Elbit Systems / IMI Systems",
        "program": "Eitan",
        "source_url": "https://www.mod.gov.il",
        "reliability": "confirmed",
    },
    {
        "title": "Namer APC — Merkava Chassis Conversion — Israel",
        "description": "Continued production of Namer heavy armoured personnel carriers based on the Merkava MkIV chassis, providing top-level protection for IDF infantry units.",
        "contracting_authority": "Israeli MOD",
        "authority_country": "Israel",
        "authority_type": "national",
        "category": "land",
        "amount_min": 1000.0,
        "amount_max": 1800.0,
        "status": "awarded",
        "publication_date": "2024-04-01",
        "deadline": None,
        "awarded_to": "Elbit Systems / Merkava Tank Directorate",
        "program": "Namer APC",
        "source_url": "https://www.mod.gov.il",
        "reliability": "confirmed",
    },
    # ── Missile & Air Defence ─────────────────────────────────────────────────
    {
        "title": "SM-6 Standard Missile Large Lot Procurement",
        "description": "Multi-year large lot procurement of RIM-174A Standard Extended Range Active Missile (ERAM) SM-6 for the U.S. Navy surface fleet and international customers.",
        "contracting_authority": "US Navy",
        "authority_country": "United States",
        "authority_type": "national",
        "category": "missiles",
        "amount_min": 4000.0,
        "amount_max": 6000.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "Raytheon Technologies",
        "program": "SM-6",
        "source_url": "https://comptroller.defense.gov",
        "reliability": "confirmed",
    },
    {
        "title": "AMRAAM Multiyear Procurement",
        "description": "Multiyear contract for AIM-120D-3 Advanced Medium-Range Air-to-Air Missiles (AMRAAM) for the U.S. Air Force, Navy and FMS customers. Critical resupply following heavy Ukraine aid.",
        "contracting_authority": "USAF",
        "authority_country": "United States",
        "authority_type": "national",
        "category": "missiles",
        "amount_min": 3500.0,
        "amount_max": 5000.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "Raytheon Technologies",
        "program": "AMRAAM",
        "source_url": "https://comptroller.defense.gov",
        "reliability": "confirmed",
    },
    {
        "title": "JASSM-ER Long-Range Strike Expansion",
        "description": "Expanded production of AGM-158B Joint Air-to-Surface Standoff Missile Extended Range (JASSM-ER) for the USAF and allied air forces, boosting long-range strike capacity.",
        "contracting_authority": "USAF",
        "authority_country": "United States",
        "authority_type": "national",
        "category": "missiles",
        "amount_min": 3000.0,
        "amount_max": 4500.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "Lockheed Martin",
        "program": "JASSM-ER",
        "source_url": "https://comptroller.defense.gov",
        "reliability": "confirmed",
    },
    {
        "title": "LRASM Long Range Anti-Ship Missile Expansion",
        "description": "Production contract expansion for AGM-158C Long Range Anti-Ship Missile (LRASM) for the U.S. Navy and Air Force, providing over-the-horizon anti-surface warfare capability.",
        "contracting_authority": "US Navy",
        "authority_country": "United States",
        "authority_type": "national",
        "category": "missiles",
        "amount_min": 2500.0,
        "amount_max": 4000.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "Lockheed Martin",
        "program": "LRASM",
        "source_url": "https://comptroller.defense.gov",
        "reliability": "confirmed",
    },
    {
        "title": "Maritime Strike Tomahawk Block V Production",
        "description": "Production contract for the BGM-109E Tomahawk Maritime Strike variant, restoring the anti-ship capability of the Block V Tomahawk for the U.S. Navy surface fleet.",
        "contracting_authority": "US Navy",
        "authority_country": "United States",
        "authority_type": "national",
        "category": "missiles",
        "amount_min": 1500.0,
        "amount_max": 2500.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "Raytheon Technologies",
        "program": "Tomahawk Block V",
        "source_url": "https://www.navy.mil/Press-Office/News-Stories/display-news/Article/3621481/navy-awards-rtx-contract-for-maritime-strike-tomahawk/",
        "reliability": "confirmed",
    },
    {
        "title": "Sentinel ICBM (LGM-35A) Development Programme",
        "description": "Development and production contract for the LGM-35A Sentinel ground-based intercontinental ballistic missile, replacing the Minuteman III as the U.S. ICBM leg of the nuclear triad.",
        "contracting_authority": "USAF",
        "authority_country": "United States",
        "authority_type": "national",
        "category": "missiles",
        "amount_min": 13000.0,
        "amount_max": 18000.0,
        "status": "open",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "Northrop Grumman",
        "program": "Sentinel ICBM",
        "source_url": "https://www.af.mil/About-Us/Fact-Sheets/Display/Article/104465/lgm-35a-sentinel/",
        "reliability": "confirmed",
    },
    {
        "title": "PrSM Precision Strike Missile Development",
        "description": "Development and low-rate initial production of the Precision Strike Missile (PrSM) for the U.S. Army, a hypersonic-range surface-to-surface missile launched from HIMARS and M270.",
        "contracting_authority": "US Army",
        "authority_country": "United States",
        "authority_type": "national",
        "category": "missiles",
        "amount_min": 3000.0,
        "amount_max": 5000.0,
        "status": "open",
        "publication_date": "2024-02-01",
        "deadline": None,
        "awarded_to": "Lockheed Martin",
        "program": "PrSM",
        "source_url": "https://www.army.mil/article/264183/army_precision_strike_missile_full_rate_production",
        "reliability": "confirmed",
    },
    {
        "title": "Type 12 Missile Stand-Off Attack Upgrade — Japan",
        "description": "Development of an extended-range stand-off variant of the Mitsubishi Type 12 anti-ship missile for the Japan Air Self-Defense Force, extending range beyond 1,000 km.",
        "contracting_authority": "Japanese MOD",
        "authority_country": "Japan",
        "authority_type": "national",
        "category": "missiles",
        "amount_min": 3000.0,
        "amount_max": 5000.0,
        "status": "open",
        "publication_date": "2024-04-01",
        "deadline": None,
        "awarded_to": "Mitsubishi Heavy Industries",
        "program": "Type 12 (extended range)",
        "source_url": "https://www.mod.go.jp",
        "reliability": "confirmed",
    },
    {
        "title": "Patriot Air Defence Procurement — Poland",
        "description": "Procurement of eight Patriot PAC-3 MSE batteries for the Polish Air Defence Forces, the largest single air defence procurement in Polish history.",
        "contracting_authority": "Polish Ministry of Defence",
        "authority_country": "Poland",
        "authority_type": "national",
        "category": "missiles",
        "amount_min": 4500.0,
        "amount_max": 6000.0,
        "status": "awarded",
        "publication_date": "2024-01-01",
        "deadline": None,
        "awarded_to": "Raytheon Technologies",
        "program": "Patriot PAC-3",
        "source_url": "https://www.gov.pl/web/national-defence",
        "reliability": "confirmed",
    },
    {
        "title": "Arrow-3 Exo-Atmospheric Interceptor — Germany",
        "description": "Procurement of the Israeli Arrow-3 exo-atmospheric ballistic missile defence system for Germany, the first export sale of Arrow-3 outside Israel.",
        "contracting_authority": "German MOD (BMVg)",
        "authority_country": "Germany",
        "authority_type": "national",
        "category": "missiles",
        "amount_min": 4000.0,
        "amount_max": 5000.0,
        "status": "open",
        "publication_date": "2024-02-01",
        "deadline": None,
        "awarded_to": "IAI / Boeing",
        "program": "Arrow-3",
        "source_url": "https://www.bmvg.de/de/aktuelles/deutschland-beschafft-arrow-3-raketenabwehrsystem-5476180",
        "reliability": "confirmed",
    },
    {
        "title": "Sky Sabre CAMM Expansion — UK",
        "description": "Additional procurement of Sky Sabre Land Ceptor air defence systems for the British Army, deploying Common Anti-Air Modular Missile (CAMM) units across UK and NATO deployments.",
        "contracting_authority": "UK Ministry of Defence",
        "authority_country": "United Kingdom",
        "authority_type": "national",
        "category": "missiles",
        "amount_min": 1200.0,
        "amount_max": 1800.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "MBDA / Leonardo",
        "program": "Sky Sabre",
        "source_url": "https://www.gov.uk/government/organisations/ministry-of-defence",
        "reliability": "confirmed",
    },
    {
        "title": "NASAMS Air Defence Expansion — Norway",
        "description": "Production contract for additional NASAMS (National Advanced Surface-to-Air Missile System) batteries for Norway and FMS customers, following high demand driven by Ukraine deliveries.",
        "contracting_authority": "Norwegian MOD",
        "authority_country": "Norway",
        "authority_type": "national",
        "category": "missiles",
        "amount_min": 1000.0,
        "amount_max": 2000.0,
        "status": "awarded",
        "publication_date": "2024-02-01",
        "deadline": None,
        "awarded_to": "Raytheon / Kongsberg",
        "program": "NASAMS",
        "source_url": "https://www.regjeringen.no",
        "reliability": "confirmed",
    },
    {
        "title": "IRIS-T SLM Air Defence — Switzerland",
        "description": "Procurement of Diehl IRIS-T SLM medium-range ground-based air defence systems for the Swiss Air Force, providing extended area protection capability.",
        "contracting_authority": "Swiss MOD (DDPS)",
        "authority_country": "Switzerland",
        "authority_type": "national",
        "category": "missiles",
        "amount_min": 1500.0,
        "amount_max": 2500.0,
        "status": "open",
        "publication_date": "2024-04-01",
        "deadline": None,
        "awarded_to": None,
        "program": "IRIS-T SLM",
        "source_url": "https://www.vbs.admin.ch",
        "reliability": "estimated",
    },
    {
        "title": "THAAD Terminal High Altitude Area Defense — Saudi Arabia",
        "description": "Foreign Military Sale of additional THAAD batteries and PAC-3 interceptors for the Royal Saudi Air Defense Force, reinforcing Saudi Arabia's layered air and missile defence.",
        "contracting_authority": "Saudi MOD",
        "authority_country": "Saudi Arabia",
        "authority_type": "national",
        "category": "missiles",
        "amount_min": 5000.0,
        "amount_max": 8000.0,
        "status": "awarded",
        "publication_date": "2024-02-01",
        "deadline": None,
        "awarded_to": "Lockheed Martin / Raytheon",
        "program": "THAAD",
        "source_url": "https://www.mod.gov.sa",
        "reliability": "confirmed",
    },
    {
        "title": "Arrow-3 Integration — Israel",
        "description": "Israeli MOD contract for production and integration of additional Arrow-3 interceptors, boosting Israel's exo-atmospheric ballistic missile defence layer.",
        "contracting_authority": "Israeli MOD",
        "authority_country": "Israel",
        "authority_type": "national",
        "category": "missiles",
        "amount_min": 3000.0,
        "amount_max": 5000.0,
        "status": "awarded",
        "publication_date": "2024-02-01",
        "deadline": None,
        "awarded_to": "IAI / Rafael",
        "program": "Arrow-3",
        "source_url": "https://www.mod.gov.il",
        "reliability": "confirmed",
    },
    {
        "title": "David's Sling Expansion — Israel",
        "description": "Expanded production of the Rafael / Raytheon David's Sling Weapon System (DSWS) to counter medium-range ballistic missiles, large rocket artillery and cruise missiles.",
        "contracting_authority": "Israeli MOD",
        "authority_country": "Israel",
        "authority_type": "national",
        "category": "missiles",
        "amount_min": 2000.0,
        "amount_max": 4000.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "Rafael / Raytheon",
        "program": "David's Sling",
        "source_url": "https://www.mod.gov.il",
        "reliability": "confirmed",
    },
    {
        "title": "Iron Dome Expansion — Israel",
        "description": "Production and fielding of additional Iron Dome batteries and Tamir interceptors for the Israel Defense Forces, replenishing stocks used in operations.",
        "contracting_authority": "Israeli MOD",
        "authority_country": "Israel",
        "authority_type": "national",
        "category": "missiles",
        "amount_min": 3000.0,
        "amount_max": 5000.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "Rafael Advanced Defense Systems",
        "program": "Iron Dome",
        "source_url": "https://www.mod.gov.il",
        "reliability": "confirmed",
    },
    {
        "title": "Pantsir-SM Short-Range Air Defence — Russia",
        "description": "Production contract for Pantsir-SM anti-aircraft/anti-drone gun-missile systems for the Russian Armed Forces, featuring extended detection and intercept capabilities.",
        "contracting_authority": "Russian MOD",
        "authority_country": "Russia",
        "authority_type": "national",
        "category": "missiles",
        "amount_min": 2000.0,
        "amount_max": 4000.0,
        "status": "awarded",
        "publication_date": "2024-02-01",
        "deadline": None,
        "awarded_to": "High Precision Systems (KBP)",
        "program": "Pantsir-SM",
        "source_url": "https://eng.mil.ru",
        "reliability": "estimated",
    },
    {
        "title": "S-500 Prometheus Deployment — Russia",
        "description": "Production and operational deployment of the S-500 Prometheus anti-ballistic missile and anti-satellite system for the Russian Aerospace Forces.",
        "contracting_authority": "Russian MOD",
        "authority_country": "Russia",
        "authority_type": "national",
        "category": "missiles",
        "amount_min": 4000.0,
        "amount_max": 7000.0,
        "status": "awarded",
        "publication_date": "2024-04-01",
        "deadline": None,
        "awarded_to": "Almaz-Antey",
        "program": "S-500 Prometheus",
        "source_url": "https://eng.mil.ru",
        "reliability": "estimated",
    },
    {
        "title": "Cheongung III (KM-SAM) Air Defence — South Korea",
        "description": "Development of the Cheongung III medium-range surface-to-air missile system for the Republic of Korea Air Force, the next generation of the domestic KM-SAM programme.",
        "contracting_authority": "South Korean DAPA",
        "authority_country": "South Korea",
        "authority_type": "national",
        "category": "missiles",
        "amount_min": 3000.0,
        "amount_max": 5000.0,
        "status": "open",
        "publication_date": "2024-02-01",
        "deadline": None,
        "awarded_to": "LIG Nex1 / Hanwha",
        "program": "Cheongung III",
        "source_url": "https://www.dapa.go.kr",
        "reliability": "estimated",
    },
    {
        "title": "Aegis Equipped Vessel Air Defence — Japan",
        "description": "Procurement of two Aegis System Equipped Vessels (ASEV) as replacements for the cancelled Aegis Ashore programme, providing ballistic missile defence from dedicated platforms.",
        "contracting_authority": "Japanese MOD",
        "authority_country": "Japan",
        "authority_type": "national",
        "category": "missiles",
        "amount_min": 6000.0,
        "amount_max": 9000.0,
        "status": "open",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "Mitsubishi Heavy Industries / Raytheon",
        "program": "Aegis Equipped Vessel",
        "source_url": "https://www.mod.go.jp",
        "reliability": "confirmed",
    },
    # ── Space Programmes ────────────────────────────────────────────────────────
    {
        "title": "SDA Transport Layer Proliferated LEO Satellite Constellation",
        "description": "Space Development Agency contract for the Transport Layer — a proliferated Low Earth Orbit (LEO) satellite communications constellation providing low-latency connectivity for U.S. DoD.",
        "contracting_authority": "Space Development Agency (SDA)",
        "authority_country": "United States",
        "authority_type": "national",
        "category": "space",
        "amount_min": 8000.0,
        "amount_max": 12000.0,
        "status": "open",
        "publication_date": "2024-04-01",
        "deadline": None,
        "awarded_to": "York Space / SpaceX / Northrop Grumman",
        "program": "SDA Transport Layer",
        "source_url": "https://www.sda.mil",
        "reliability": "confirmed",
    },
    {
        "title": "HBTSS Hypersonic & Ballistic Tracking Space Sensor",
        "description": "Development and deployment of the Hypersonic and Ballistic Tracking Space Sensor (HBTSS) satellite layer for the Missile Defense Agency, supporting the 'Golden Dome' concept.",
        "contracting_authority": "Missile Defense Agency (MDA)",
        "authority_country": "United States",
        "authority_type": "national",
        "category": "space",
        "amount_min": 3000.0,
        "amount_max": 6000.0,
        "status": "open",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "Northrop Grumman / L3Harris",
        "program": "HBTSS",
        "source_url": "https://www.mda.mil",
        "reliability": "confirmed",
    },
    {
        "title": "Syracuse IV Military Satellite Programme — France",
        "description": "Production and launch of Syracuse IV wideband military communications satellites for the French Armed Forces, providing secure high-throughput connectivity.",
        "contracting_authority": "French MOD (DGA)",
        "authority_country": "France",
        "authority_type": "national",
        "category": "space",
        "amount_min": 2000.0,
        "amount_max": 3000.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "Airbus Defence & Space / Thales Alenia Space",
        "program": "Syracuse IV",
        "source_url": "https://www.defense.gouv.fr",
        "reliability": "confirmed",
    },
    {
        "title": "Skynet 6 Military Satellite Programme — UK",
        "description": "Procurement and launch of Skynet 6 satellites to provide the next generation of protected military satellite communications for the UK Armed Forces and allies.",
        "contracting_authority": "UK Ministry of Defence",
        "authority_country": "United Kingdom",
        "authority_type": "national",
        "category": "space",
        "amount_min": 5000.0,
        "amount_max": 8000.0,
        "status": "open",
        "publication_date": "2024-04-01",
        "deadline": None,
        "awarded_to": "Airbus Defence & Space",
        "program": "Skynet 6",
        "source_url": "https://www.gov.uk/government/organisations/ministry-of-defence",
        "reliability": "confirmed",
    },
    {
        "title": "GovSatCom Governmental Satellite Communications — EU",
        "description": "European Union Governmental Satellite Communications (GovSatCom) programme providing secure satellite connectivity services to EU government and security actors.",
        "contracting_authority": "European Commission / ESA",
        "authority_country": "EU",
        "authority_type": "eu",
        "category": "space",
        "amount_min": 1000.0,
        "amount_max": 2000.0,
        "status": "open",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": None,
        "program": "GovSatCom",
        "source_url": "https://defence-industry-space.ec.europa.eu",
        "reliability": "confirmed",
    },
    {
        "title": "Ariane 6 Defence Launch Missions — ESA",
        "description": "European Space Agency contract covering defence-related launches aboard Ariane 6, including military satellites for EU member states and dual-use Earth observation missions.",
        "contracting_authority": "ESA / European Commission",
        "authority_country": "Europe",
        "authority_type": "eu",
        "category": "space",
        "amount_min": 2000.0,
        "amount_max": 4000.0,
        "status": "awarded",
        "publication_date": "2024-04-01",
        "deadline": None,
        "awarded_to": "ArianeGroup",
        "program": "Ariane 6",
        "source_url": "https://www.esa.int",
        "reliability": "estimated",
    },
    # ── Nuclear Modernisation ─────────────────────────────────────────────────
    {
        "title": "B61-12 Nuclear Gravity Bomb Modernization",
        "description": "Full-scale production of the B61-12 life extension programme gravity bomb, replacing older B61 variants with a guided tail kit improving accuracy and reducing yield requirements.",
        "contracting_authority": "US Department of Energy / USAF",
        "authority_country": "United States",
        "authority_type": "national",
        "category": "missiles",
        "amount_min": 7000.0,
        "amount_max": 10000.0,
        "status": "awarded",
        "publication_date": "2024-04-01",
        "deadline": None,
        "awarded_to": "Sandia National Laboratories / Boeing",
        "program": "B61-12",
        "source_url": "https://www.energy.gov",
        "reliability": "confirmed",
    },
    {
        "title": "Trident II D5LE2 SLBM Life Extension",
        "description": "Life extension programme for the Trident II D5LE2 submarine-launched ballistic missile, extending the operational service life of the US and UK nuclear deterrent SLBM.",
        "contracting_authority": "US Navy / UK MOD",
        "authority_country": "United States",
        "authority_type": "bilateral",
        "category": "missiles",
        "amount_min": 10000.0,
        "amount_max": 15000.0,
        "status": "open",
        "publication_date": "2024-04-01",
        "deadline": None,
        "awarded_to": "Lockheed Martin",
        "program": "Trident II D5LE2",
        "source_url": "https://www.navy.mil/Press-Office/News-Stories/display-news/Article/3680785/navy-awards-lockheed-trident-ii-d5-life-extension-contract/",
        "reliability": "confirmed",
    },
    # ── EU / European Commission Industrial Programmes ────────────────────────
    {
        "title": "ReArm Europe — ASAP Ammunition Production",
        "description": "Act in Support of Ammunition Production (ASAP) initiative under the ReArm Europe plan to increase production of 155mm artillery shells and other critical munitions across EU member states.",
        "contracting_authority": "European Commission",
        "authority_country": "EU",
        "authority_type": "eu",
        "category": "land",
        "amount_min": 1000.0,
        "amount_max": 2000.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": None,
        "program": "ASAP / ReArm Europe",
        "source_url": "https://defence-industry-space.ec.europa.eu",
        "reliability": "confirmed",
    },
    {
        "title": "EDIRPA European Defence Industry Reinforcement",
        "description": "European Defence Industry Reinforcement through Common Procurement Act (EDIRPA) supporting joint procurement of defence products by EU member states to replenish stocks.",
        "contracting_authority": "European Commission",
        "authority_country": "EU",
        "authority_type": "eu",
        "category": "services",
        "amount_min": 300.0,
        "amount_max": 500.0,
        "status": "open",
        "publication_date": "2024-04-01",
        "deadline": None,
        "awarded_to": None,
        "program": "EDIRPA",
        "source_url": "https://defence-industry-space.ec.europa.eu",
        "reliability": "confirmed",
    },
    {
        "title": "EDIP European Defence Industrial Programme",
        "description": "European Defence Industrial Programme (EDIP) — the EU's €1.5–21B industrial support instrument to scale defence production capacity, enhance supply chain resilience and incentivise joint procurement.",
        "contracting_authority": "European Commission",
        "authority_country": "EU",
        "authority_type": "eu",
        "category": "services",
        "amount_min": 1500.0,
        "amount_max": 21000.0,
        "status": "open",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": None,
        "program": "EDIP",
        "source_url": "https://defence-industry-space.ec.europa.eu",
        "reliability": "confirmed",
    },
    {
        "title": "ESSI Command and Control Integration — NATO",
        "description": "NATO programme integrating command and control systems across the European Sky Shield Initiative (ESSI), enabling interoperability between national air defence systems.",
        "contracting_authority": "NATO",
        "authority_country": "NATO",
        "authority_type": "nato",
        "category": "services",
        "amount_min": 500.0,
        "amount_max": 900.0,
        "status": "open",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": None,
        "program": "ESSI C2",
        "source_url": "https://www.nato.int",
        "reliability": "estimated",
    },
    # ── Remaining OCCAR entries ───────────────────────────────────────────────
    {
        "title": "GA10 Ground Alerter Surveillance Radar",
        "description": "Development of the GA10 low-observable ground alerter radar for European nations under OCCAR, providing low-altitude detection of air threats including cruise missiles and UAVs.",
        "contracting_authority": "OCCAR",
        "authority_country": "Europe",
        "authority_type": "bilateral",
        "category": "services",
        "amount_min": 300.0,
        "amount_max": 900.0,
        "status": "open",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": None,
        "program": "GA10",
        "source_url": "https://www.occar.int/our-work/programmes/ga10",
        "reliability": "estimated",
    },
    {
        "title": "NVC Night Vision Capability Programme",
        "description": "OCCAR programme procuring standardised night vision capability across European nations, including image-intensifier goggles, thermal weapon sights and driver vision enhancers.",
        "contracting_authority": "OCCAR",
        "authority_country": "Europe",
        "authority_type": "bilateral",
        "category": "services",
        "amount_min": 400.0,
        "amount_max": 800.0,
        "status": "awarded",
        "publication_date": "2024-04-01",
        "deadline": None,
        "awarded_to": None,
        "program": "NVC",
        "source_url": "https://www.occar.int/our-work/programmes/nvc",
        "reliability": "estimated",
    },

    # ══════════════════════════════════════════════════════════════════════════
    # Country-coverage backfill — flagship current programmes for nations that
    # were previously absent from (or thin in) the contracts index, so every
    # tracked country surfaces its major naval / air procurements in the
    # "Countries" panel. Mirrors the Canada frigate + submarine coverage.
    # ══════════════════════════════════════════════════════════════════════════

    # ── India ─────────────────────────────────────────────────────────────────
    {
        "title": "Project 75I — 6 AIP-Equipped Conventional Submarines",
        "description": "Indian Navy programme for six air-independent-propulsion (AIP) conventional submarines built at Mazagon Dock under 'Make in India'. In 2025 Germany's ThyssenKrupp Marine Systems (with MDL) was selected as lowest bidder over Spain's Navantia, offering a Type 212CD-derived design.",
        "contracting_authority": "Indian Ministry of Defence",
        "authority_country": "India",
        "authority_type": "national",
        "category": "naval",
        "amount_min": 5000.0,
        "amount_max": 7000.0,
        "status": "open",
        "publication_date": "2024-06-01",
        "deadline": None,
        "awarded_to": "Mazagon Dock / ThyssenKrupp Marine Systems",
        "program": "Project 75I",
        "source_url": "https://www.mazdock.com",
        "reliability": "confirmed",
    },
    {
        "title": "Rafale Marine — 26 Carrier-Borne Fighters for the Indian Navy",
        "description": "Government-to-government acquisition of 26 Dassault Rafale Marine fighters (22 single-seat, 4 twin-seat) to operate from INS Vikrant and INS Vikramaditya, replacing the ageing MiG-29K fleet. The deal was signed in April 2025.",
        "contracting_authority": "Indian Ministry of Defence",
        "authority_country": "India",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 7000.0,
        "amount_max": 8000.0,
        "status": "awarded",
        "publication_date": "2025-04-28",
        "deadline": None,
        "awarded_to": "Dassault Aviation",
        "program": "Rafale Marine (India)",
        "source_url": "https://www.dassault-aviation.com",
        "reliability": "confirmed",
    },
    {
        "title": "Tejas Mk1A Light Combat Aircraft — Indian Air Force",
        "description": "Production of 83 (plus a follow-on 97) HAL Tejas Mk1A indigenous light combat aircraft for the Indian Air Force, with improved AESA radar, electronic warfare suite and beyond-visual-range weapons, to replace retiring MiG-21 squadrons.",
        "contracting_authority": "Indian Air Force / HAL",
        "authority_country": "India",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 6000.0,
        "amount_max": 12000.0,
        "status": "awarded",
        "publication_date": "2024-02-01",
        "deadline": None,
        "awarded_to": "Hindustan Aeronautics Limited",
        "program": "Tejas Mk1A",
        "source_url": "https://hal-india.co.in",
        "reliability": "confirmed",
    },
    {
        "title": "Project 17A — Nilgiri-class Stealth Frigates",
        "description": "Construction of seven Nilgiri-class (Project 17A) stealth guided-missile frigates for the Indian Navy at Mazagon Dock and Garden Reach Shipbuilders, featuring reduced radar cross-section, BrahMos and Barak-8 missiles.",
        "contracting_authority": "Indian Navy",
        "authority_country": "India",
        "authority_type": "national",
        "category": "naval",
        "amount_min": 6000.0,
        "amount_max": 8000.0,
        "status": "awarded",
        "publication_date": "2024-01-15",
        "deadline": None,
        "awarded_to": "Mazagon Dock / Garden Reach Shipbuilders",
        "program": "Project 17A Nilgiri-class",
        "source_url": "https://www.mazdock.com",
        "reliability": "confirmed",
    },

    # ── Spain ─────────────────────────────────────────────────────────────────
    {
        "title": "F-110 Bonifaz-class Frigate Programme",
        "description": "Construction of five F-110 Bonifaz-class multi-mission stealth frigates for the Spanish Navy by Navantia, fitted with an integrated mast, Aegis combat system and Spanish-developed SCOMBA command system, replacing the Santa María-class.",
        "contracting_authority": "Spanish Ministry of Defence",
        "authority_country": "Spain",
        "authority_type": "national",
        "category": "naval",
        "amount_min": 4000.0,
        "amount_max": 5000.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "Navantia",
        "program": "F-110 Bonifaz-class",
        "source_url": "https://www.navantia.es",
        "reliability": "confirmed",
    },
    {
        "title": "S-80 Plus Submarine (Isaac Peral-class)",
        "description": "Construction of four S-80 Plus (Isaac Peral-class) air-independent-propulsion submarines for the Spanish Navy by Navantia, featuring a domestically developed bioethanol-based AIP fuel-cell system.",
        "contracting_authority": "Spanish Ministry of Defence",
        "authority_country": "Spain",
        "authority_type": "national",
        "category": "naval",
        "amount_min": 4000.0,
        "amount_max": 5500.0,
        "status": "awarded",
        "publication_date": "2024-01-10",
        "deadline": None,
        "awarded_to": "Navantia",
        "program": "S-80 Plus Isaac Peral-class",
        "source_url": "https://www.navantia.es",
        "reliability": "confirmed",
    },

    # ── Netherlands ───────────────────────────────────────────────────────────
    {
        "title": "Orka-class Submarine Replacement Programme",
        "description": "Acquisition of four Orka-class (Barracuda-derived) expeditionary submarines for the Royal Netherlands Navy to replace the Walrus class. In 2024 France's Naval Group was selected over ThyssenKrupp and Saab-Damen with its Blacksword Barracuda design.",
        "contracting_authority": "Netherlands MOD (Defensie)",
        "authority_country": "Netherlands",
        "authority_type": "national",
        "category": "naval",
        "amount_min": 5000.0,
        "amount_max": 6500.0,
        "status": "awarded",
        "publication_date": "2024-12-15",
        "deadline": None,
        "awarded_to": "Naval Group",
        "program": "Orka-class (Walrus replacement)",
        "source_url": "https://www.defensie.nl",
        "reliability": "confirmed",
    },
    {
        "title": "Anti-Submarine Warfare Frigate (ASWF) — Netherlands & Belgium",
        "description": "Binational programme building four next-generation anti-submarine warfare frigates (two for the Netherlands, two for Belgium) to replace the Karel Doorman-class, led by Damen with Thales sensor suites.",
        "contracting_authority": "Netherlands MOD (Defensie)",
        "authority_country": "Netherlands",
        "authority_type": "national",
        "category": "naval",
        "amount_min": 3500.0,
        "amount_max": 5000.0,
        "status": "awarded",
        "publication_date": "2024-05-01",
        "deadline": None,
        "awarded_to": "Damen Naval / Thales",
        "program": "ASWF (Karel Doorman replacement)",
        "source_url": "https://www.defensie.nl",
        "reliability": "confirmed",
    },

    # ── Greece ────────────────────────────────────────────────────────────────
    {
        "title": "FDI HN Kimon-class Frigate Programme — Greece",
        "description": "Acquisition of four Naval Group FDI HN (Kimon-class) Belharra frigates for the Hellenic Navy, the export variant of the French Defence and Intervention Frigate, to modernise Greece's surface fleet against regional threats.",
        "contracting_authority": "Hellenic Ministry of National Defence",
        "authority_country": "Greece",
        "authority_type": "national",
        "category": "naval",
        "amount_min": 3000.0,
        "amount_max": 4500.0,
        "status": "awarded",
        "publication_date": "2024-02-15",
        "deadline": None,
        "awarded_to": "Naval Group",
        "program": "FDI HN Kimon-class",
        "source_url": "https://www.naval-group.com",
        "reliability": "confirmed",
    },
    {
        "title": "Rafale F3R Fighter Acquisition — Greece",
        "description": "Acquisition of 24 Dassault Rafale multirole fighters (a mix of new and ex-French Air Force airframes) for the Hellenic Air Force, Greece's first Rafale operator status in the eastern Mediterranean.",
        "contracting_authority": "Hellenic Air Force",
        "authority_country": "Greece",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 2500.0,
        "amount_max": 3500.0,
        "status": "awarded",
        "publication_date": "2024-01-20",
        "deadline": None,
        "awarded_to": "Dassault Aviation",
        "program": "Rafale (Greece)",
        "source_url": "https://www.dassault-aviation.com",
        "reliability": "confirmed",
    },

    # ── Norway ────────────────────────────────────────────────────────────────
    {
        "title": "New Frigate Programme — Type 26 Selection (Norway)",
        "description": "Acquisition of at least five (option for six) frigates for the Royal Norwegian Navy to replace the Fridtjof Nansen-class. In 2025 Norway selected the United Kingdom and BAE Systems' Type 26 design under a strategic partnership over French, German and US bids.",
        "contracting_authority": "Norwegian Defence Materiel Agency (NDMA)",
        "authority_country": "Norway",
        "authority_type": "national",
        "category": "naval",
        "amount_min": 10000.0,
        "amount_max": 15000.0,
        "status": "awarded",
        "publication_date": "2025-08-31",
        "deadline": None,
        "awarded_to": "BAE Systems (Type 26)",
        "program": "Norwegian New Frigate (Type 26)",
        "source_url": "https://www.regjeringen.no",
        "reliability": "confirmed",
    },

    # ── Sweden ────────────────────────────────────────────────────────────────
    {
        "title": "A26 Blekinge-class Submarine Programme",
        "description": "Construction of two A26 Blekinge-class air-independent-propulsion submarines for the Swedish Navy by Saab Kockums, featuring a Stirling AIP system and a flexible payload lock for special operations.",
        "contracting_authority": "Swedish Defence Materiel Administration (FMV)",
        "authority_country": "Sweden",
        "authority_type": "national",
        "category": "naval",
        "amount_min": 1500.0,
        "amount_max": 2500.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "Saab Kockums",
        "program": "A26 Blekinge-class",
        "source_url": "https://www.saab.com",
        "reliability": "confirmed",
    },
    {
        "title": "Gripen E Fighter Procurement — Sweden",
        "description": "Procurement of 60 Saab JAS 39 Gripen E multirole fighters for the Swedish Air Force, the latest generation with an improved AESA radar, greater range and payload, replacing the Gripen C/D fleet.",
        "contracting_authority": "Swedish Defence Materiel Administration (FMV)",
        "authority_country": "Sweden",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 3000.0,
        "amount_max": 4000.0,
        "status": "awarded",
        "publication_date": "2024-02-01",
        "deadline": None,
        "awarded_to": "Saab AB",
        "program": "Gripen E (Sweden)",
        "source_url": "https://www.saab.com",
        "reliability": "confirmed",
    },

    # ── Finland ───────────────────────────────────────────────────────────────
    {
        "title": "Squadron 2020 — Pohjanmaa-class Corvettes",
        "description": "Construction of four Pohjanmaa-class multi-role corvettes for the Finnish Navy under the Squadron 2020 programme, ice-capable vessels combining surface, anti-air, anti-submarine and mine-laying roles, built by Rauma Marine Constructions.",
        "contracting_authority": "Finnish Defence Forces Logistics Command",
        "authority_country": "Finland",
        "authority_type": "national",
        "category": "naval",
        "amount_min": 1500.0,
        "amount_max": 2500.0,
        "status": "awarded",
        "publication_date": "2024-04-01",
        "deadline": None,
        "awarded_to": "Rauma Marine Constructions",
        "program": "Squadron 2020 Pohjanmaa-class",
        "source_url": "https://puolustusvoimat.fi",
        "reliability": "confirmed",
    },
    {
        "title": "F-35A Lightning II — HX Fighter Programme (Finland)",
        "description": "Acquisition of 64 Lockheed Martin F-35A Block 4 fighters for the Finnish Air Force under the HX programme, replacing the F/A-18 Hornet fleet and anchoring Finland's air defence within NATO.",
        "contracting_authority": "Finnish Defence Forces Logistics Command",
        "authority_country": "Finland",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 9000.0,
        "amount_max": 11000.0,
        "status": "awarded",
        "publication_date": "2024-01-05",
        "deadline": None,
        "awarded_to": "Lockheed Martin",
        "program": "HX F-35A (Finland)",
        "source_url": "https://puolustusvoimat.fi",
        "reliability": "confirmed",
    },

    # ── Brazil ────────────────────────────────────────────────────────────────
    {
        "title": "Tamandaré-class Frigate Programme — Brazil",
        "description": "Construction of four Tamandaré-class stealth frigates for the Brazilian Navy by the Águas Azuis consortium (thyssenkrupp Marine Systems, Embraer Defense & Security and Atech), based on the MEKO A100 design, with strong local-content requirements.",
        "contracting_authority": "Brazilian Navy",
        "authority_country": "Brazil",
        "authority_type": "national",
        "category": "naval",
        "amount_min": 2000.0,
        "amount_max": 3000.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "Águas Azuis (thyssenkrupp / Embraer)",
        "program": "Tamandaré-class",
        "source_url": "https://www.marinha.mil.br",
        "reliability": "confirmed",
    },
    {
        "title": "PROSUB — Riachuelo-class Submarines & SSN Álvaro Alberto",
        "description": "Brazil's submarine development programme (PROSUB) with Naval Group and Itaguaí Construções Navais, building four Riachuelo-class (Scorpène-derived) conventional submarines plus the Álvaro Alberto, Brazil's first nuclear-powered attack submarine.",
        "contracting_authority": "Brazilian Navy",
        "authority_country": "Brazil",
        "authority_type": "national",
        "category": "naval",
        "amount_min": 8000.0,
        "amount_max": 12000.0,
        "status": "awarded",
        "publication_date": "2024-02-01",
        "deadline": None,
        "awarded_to": "Naval Group / Itaguaí Construções Navais",
        "program": "PROSUB Riachuelo-class",
        "source_url": "https://www.marinha.mil.br",
        "reliability": "confirmed",
    },
    {
        "title": "F-39 Gripen E/F Fighter Programme — Brazil",
        "description": "Procurement and local assembly of 36 (with follow-on options) Saab F-39 Gripen E/F fighters for the Brazilian Air Force, with technology transfer and final assembly at Embraer's Gavião Peixoto facility.",
        "contracting_authority": "Brazilian Air Force",
        "authority_country": "Brazil",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 4500.0,
        "amount_max": 6000.0,
        "status": "awarded",
        "publication_date": "2024-01-15",
        "deadline": None,
        "awarded_to": "Saab AB / Embraer",
        "program": "F-39 Gripen (Brazil)",
        "source_url": "https://www.saab.com",
        "reliability": "confirmed",
    },

    # ── Taiwan ────────────────────────────────────────────────────────────────
    {
        "title": "Hai Kun-class Indigenous Defence Submarine (IDS)",
        "description": "Taiwan's indigenous submarine programme building up to eight Hai Kun-class diesel-electric submarines by CSBC Corporation to deter a maritime blockade; the prototype 'Narwhal' was launched in 2023 and is undergoing sea trials.",
        "contracting_authority": "Republic of China (Taiwan) Navy",
        "authority_country": "Taiwan",
        "authority_type": "national",
        "category": "naval",
        "amount_min": 5000.0,
        "amount_max": 16000.0,
        "status": "open",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "CSBC Corporation",
        "program": "Hai Kun-class IDS",
        "source_url": "https://www.csbcnet.com.tw",
        "reliability": "confirmed",
    },
    {
        "title": "F-16V Block 70 Viper Procurement — Taiwan",
        "description": "Acquisition of 66 new-build Lockheed Martin F-16V Block 70 fighters for the Republic of China Air Force, alongside an upgrade of the existing F-16A/B fleet to the V standard with AESA radar.",
        "contracting_authority": "Republic of China (Taiwan) Air Force",
        "authority_country": "Taiwan",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 8000.0,
        "amount_max": 9000.0,
        "status": "awarded",
        "publication_date": "2024-01-10",
        "deadline": None,
        "awarded_to": "Lockheed Martin",
        "program": "F-16V Block 70 (Taiwan)",
        "source_url": "https://www.lockheedmartin.com",
        "reliability": "confirmed",
    },

    # ── Belgium ───────────────────────────────────────────────────────────────
    {
        "title": "F-35A Lightning II Procurement — Belgium",
        "description": "Acquisition of 34 Lockheed Martin F-35A fighters for the Belgian Air Component to replace the F-16 fleet, integrating Belgium into NATO's fifth-generation air power and nuclear-sharing mission.",
        "contracting_authority": "Belgian Ministry of Defence",
        "authority_country": "Belgium",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 4000.0,
        "amount_max": 6000.0,
        "status": "awarded",
        "publication_date": "2024-02-01",
        "deadline": None,
        "awarded_to": "Lockheed Martin",
        "program": "F-35A (Belgium)",
        "source_url": "https://www.mil.be",
        "reliability": "confirmed",
    },

    # ── Czech Republic ────────────────────────────────────────────────────────
    {
        "title": "F-35A Lightning II Procurement — Czech Republic",
        "description": "Government-to-government acquisition of 24 Lockheed Martin F-35A fighters for the Czech Air Force, signed in 2024, replacing leased Gripen jets and marking a major NATO air-power upgrade in Central Europe.",
        "contracting_authority": "Czech Ministry of Defence",
        "authority_country": "Czech Republic",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 5000.0,
        "amount_max": 6500.0,
        "status": "awarded",
        "publication_date": "2024-01-29",
        "deadline": None,
        "awarded_to": "Lockheed Martin",
        "program": "F-35A (Czech Republic)",
        "source_url": "https://mocr.army.cz",
        "reliability": "confirmed",
    },

    # ── Romania ───────────────────────────────────────────────────────────────
    {
        "title": "F-35A Lightning II Procurement — Romania",
        "description": "Romania's approved acquisition of 32 Lockheed Martin F-35A fighters to modernise the Romanian Air Force alongside its second-hand F-16 fleet, strengthening NATO's south-eastern flank on the Black Sea.",
        "contracting_authority": "Romanian Ministry of National Defence",
        "authority_country": "Romania",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 6000.0,
        "amount_max": 7500.0,
        "status": "open",
        "publication_date": "2024-04-01",
        "deadline": None,
        "awarded_to": "Lockheed Martin",
        "program": "F-35A (Romania)",
        "source_url": "https://www.mapn.ro",
        "reliability": "confirmed",
    },
]

# ── M&A Pilot: 15 deals hand-curated, fully sourced, verified logos (2022-2026) ──
# Reset via POST /api/ma-activities/seed-pilot (Admin panel).
# Every entry: specific press-release URL, working Clearbit domain, rich rationale.
MA_PILOT_10 = [
    # ── 2024 ──────────────────────────────────────────────────────────────────
    {
        "acquirer": "Safran",
        "target": "Collins Aerospace Actuation",
        "deal_value": 1800,
        "status": "announced",
        "deal_type": "acquisition",
        "description": "Safran acquires Collins Aerospace Actuation & Flight Control unit (RTX) for $1.8B — becomes world's second-largest actuation supplier",
        "rationale": (
            "Safran signs a definitive agreement on 5 December 2024 to acquire Collins Aerospace's "
            "actuation and flight-control systems business from RTX for approximately $1.8 billion. "
            "The transaction elevates Safran to the world's second-largest actuation systems "
            "supplier, adding landing-gear, flight-control and electromechanical actuation product "
            "lines that complement Safran Landing Systems. RTX is divesting the unit as part of a "
            "strategic portfolio rationalisation. Regulatory clearance is expected in the US, EU "
            "and UK; closing is targeted for H2 2025."
        ),
        "acquirer_country": "FR",
        "target_country": "US",
        "acquirer_logo_domain": "safran-group.com",
        "target_logo_domain": "collinsaerospace.com",
        "source_url": "https://www.reuters.com/business/aerospace-defense/safran-agrees-buy-collins-aerospace-actuation-flight-control-unit-rtx-2024-12-05/",
        "announced_date": datetime(2024, 12, 5, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": None,
        "is_disclosed": True,
    },
    {
        "acquirer": "Boeing",
        "target": "Spirit AeroSystems",
        "deal_value": 4700,
        "status": "completed",
        "deal_type": "acquisition",
        "description": "Boeing reacquires Spirit AeroSystems ($4.7B) to regain 737 MAX fuselage quality control — 2005 spin-off brought back in-house",
        "rationale": (
            "Boeing announces on 1 July 2024 its intention to reacquire Spirit AeroSystems — the "
            "fuselage and nacelle manufacturer it originally spun off in 2005 — for approximately "
            "$4.7 billion. The decision follows Boeing's quality-control crisis on the 737 MAX "
            "programme, where fuselage defects at Spirit's Wichita plant contributed to delivery "
            "halts and FAA scrutiny. Bringing Spirit's Wichita, Tulsa and Kinston facilities "
            "back in-house restores Boeing's direct production oversight. Airbus separately "
            "acquired Spirit's Airbus-related facilities in Belfast and Prestwick. The transaction "
            "completed on 8 December 2025 after regulatory approvals."
        ),
        "acquirer_country": "US",
        "target_country": "US",
        "acquirer_logo_domain": "boeing.com",
        "target_logo_domain": "spiritaero.com",
        "source_url": "https://boeing.mediaroom.com/2025-12-08-Boeing-Completes-Acquisition-of-Spirit-AeroSystems",
        "announced_date": datetime(2024, 7, 1, tzinfo=timezone.utc),
        "closed_date": datetime(2025, 12, 8, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": None,
        "is_disclosed": True,
    },
    {
        "acquirer": "Lockheed Martin",
        "target": "Terran Orbital",
        "deal_value": 450,
        "status": "completed",
        "deal_type": "acquisition",
        "description": "Lockheed Martin completes acquisition of Terran Orbital for $450M — vertical integration into small LEO satellite manufacturing",
        "rationale": (
            "Lockheed Martin completes its $450 million acquisition of Terran Orbital Corporation "
            "on 5 September 2024, absorbing a key manufacturer of small satellites and satellite "
            "components. Terran Orbital was already the prime manufacturer on Lockheed-led SDA "
            "(Space Development Agency) transport-layer satellite programmes under the Tranche 0 "
            "and Tranche 1 constellations. The acquisition deepens Lockheed's vertical integration "
            "in the proliferated LEO satellite market, reducing dependence on third-party "
            "manufacturers and accelerating production timelines for US government space programmes."
        ),
        "acquirer_country": "US",
        "target_country": "US",
        "acquirer_logo_domain": "lockheedmartin.com",
        "target_logo_domain": "terranorbital.com",
        "source_url": "https://www.reuters.com/business/aerospace-defense/lockheed-martin-completes-acquisition-terran-orbital-2024-09-05/",
        "announced_date": datetime(2024, 9, 5, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": None,
        "is_disclosed": True,
    },
    # ── 2023 ──────────────────────────────────────────────────────────────────
    {
        "acquirer": "BAE Systems",
        "target": "Ball Aerospace",
        "deal_value": 5550,
        "status": "completed",
        "deal_type": "acquisition",
        "description": "BAE Systems acquires Ball Aerospace for $5.55B — doubles its US space systems and defense sensor presence",
        "rationale": (
            "BAE Systems announces on 28 August 2023 a $5.55 billion agreement to acquire Ball "
            "Aerospace, a leading US provider of space systems, spacecraft components and defence "
            "electronics. Ball's portfolio includes optical sensors for the James Webb Space "
            "Telescope and Nancy Grace Roman Space Telescope, as well as precision targeting "
            "systems, missile defence electronics and tactical communications payloads. The deal "
            "roughly doubles BAE's US space workforce and significantly expands its presence in "
            "satellite sensor production. The transaction cleared US regulatory review and closed "
            "in February 2024, making BAE one of the largest US space defence suppliers."
        ),
        "acquirer_country": "GB",
        "target_country": "US",
        "acquirer_logo_domain": "baesystems.com",
        "target_logo_domain": "ball.com",
        "source_url": "https://www.baesystems.com/en-us/article/bae-systems-completes-acquisition-of-ball-aerospace",
        "announced_date": datetime(2023, 8, 28, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": None,
        "is_disclosed": True,
    },
    {
        "acquirer": "Safran",
        "target": "Preligens",
        "deal_value": 240,
        "status": "completed",
        "deal_type": "acquisition",
        "description": "Safran acquires French AI specialist Preligens (€220M enterprise value) — automated satellite image analysis, rebranded Safran AI",
        "rationale": (
            "Safran signed the acquisition agreement for Preligens in July 2024 and completed "
            "the acquisition on 2 September 2024 for an enterprise value of €220 million "
            "(approximately $240 million). Preligens's Earth and Sky platforms use computer vision "
            "to detect, classify and track assets in satellite and aerial imagery. The company was "
            "renamed Safran.AI after the acquisition."
        ),
        "acquirer_country": "FR",
        "target_country": "FR",
        "acquirer_logo_domain": "safran-group.com",
        "target_logo_domain": "preligens.com",
        "source_url": "https://www.safran-group.com/pressroom/ai-leader-preligens-joins-safran-2024-09-02",
        "announced_date": datetime(2024, 7, 16, tzinfo=timezone.utc),
        "closed_date": datetime(2024, 9, 2, tzinfo=timezone.utc),
        "stake_percentage": 100.0,
        "round_type": None,
        "is_disclosed": True,
        "value_basis": "enterprise",
        "notes": "Enterprise value disclosed in EUR; deal_value is the approximate USD equivalent used by the dashboard.",
    },
    {
        "acquirer": "Rheinmetall",
        "target": "Expal Systems",
        "deal_value": 1200,
        "status": "completed",
        "deal_type": "acquisition",
        "description": "Rheinmetall acquires Expal Systems (€1.2B) — Spain's leading 155mm artillery ammunition maker, accelerating NATO stockpile replenishment",
        "rationale": (
            "Rheinmetall announces in October 2022 its agreement to acquire Expal Systems, "
            "Spain's largest ammunition and energetics manufacturer, from Maxamcorp for "
            "approximately €1.2 billion. The transaction closed in May 2023 after Spanish "
            "government approval. Expal's production facilities in Burgos and Teruel manufacture "
            "155mm artillery shells, mortar rounds, naval munitions and demilitarisation services, "
            "providing critical capacity to replenish NATO stocks depleted by arms transfers to "
            "Ukraine. The acquisition makes Rheinmetall one of the world's largest ammunition "
            "producers and is central to its role as a principal European rearmament supplier."
        ),
        "acquirer_country": "DE",
        "target_country": "ES",
        "acquirer_logo_domain": "rheinmetall.com",
        "target_logo_domain": "maxamcorp.com",
        "source_url": "https://www.reuters.com/business/aerospace-defense/rheinmetall-completes-acquisition-expal-systems-ammunition-maker-2023-05-16/",
        "announced_date": datetime(2022, 10, 12, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": None,
        "is_disclosed": True,
    },
    # ── 2021 ──────────────────────────────────────────────────────────────────
    {
        "acquirer": "Parker Hannifin",
        "target": "Meggitt",
        "deal_value": 8800,
        "status": "completed",
        "deal_type": "acquisition",
        "description": "Parker Hannifin acquires Meggitt (£6.3B / ~$8.8B) — UK military aerospace components, cleared despite UK government pushback",
        "rationale": (
            "Parker Hannifin announces on 2 August 2021 a £6.3 billion (~$8.8 billion) offer for "
            "Meggitt plc, a British aerospace components maker supplying thermal management "
            "systems, aircraft braking systems and sensing equipment for military and commercial "
            "programmes including the F-35, Typhoon and A400M. The UK government triggered a "
            "national-security review, ultimately accepting binding security undertakings from "
            "Parker — including commitments to maintain UK manufacturing and R&D investment for "
            "five years — before clearing the deal over a competing offer from TransDigm. "
            "Meggitt added over 7,000 UK employees and proprietary products supplied across "
            "NATO air platforms. The transaction closed in September 2022."
        ),
        "acquirer_country": "US",
        "target_country": "GB",
        "acquirer_logo_domain": "parker.com",
        "target_logo_domain": "meggitt.com",
        "source_url": "https://ir.parker.com/news-releases/news-release-details/parker-hannifin-completes-acquisition-meggitt-plc",
        "announced_date": datetime(2021, 8, 2, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": None,
        "is_disclosed": True,
    },
]

# ── Top-30 European Aerospace & Defense / Dual-Use M&A (2022-2026) ────────────
# Source: Oleg Malenkov / LinkedIn compilation; company press releases,
# Bloomberg, Reuters, Refinitiv, Calcalist, Les Echos, Globes, Breaking Defense.
MA_EUROPE_DEALS = [
    {
        "acquirer": "Thoma Bravo", "target": "Darktrace",
        "deal_value": 5300, "status": "completed", "deal_type": "acquisition",
        "description": "Thoma Bravo takes Darktrace private for $5.3B — UK AI cybersecurity leader",
        "rationale": (
            "US private equity firm Thoma Bravo completes its $5.3 billion acquisition of "
            "Darktrace, the Cambridge-based AI cybersecurity company, taking it private in "
            "October 2024. Darktrace's autonomous response platform — used extensively by "
            "defence and critical infrastructure operators — is based on unsupervised machine "
            "learning that detects novel threats without prior signatures. Thoma Bravo intends "
            "to accelerate product investment and global expansion outside the listed-company "
            "quarterly reporting cycle."
        ),
        "acquirer_country": "US", "target_country": "GB",
        "acquirer_logo_domain": "thomabravo.com",
        "target_logo_domain": "darktrace.com",
        "source_url": "https://www.reuters.com/technology/thoma-bravo-completes-5-32-bln-acquisition-darktrace-2024-10-01/",
        "announced_date": datetime(2024, 4, 26, tzinfo=timezone.utc),
    },
    {
        "acquirer": "SES", "target": "Intelsat",
        # deal_value = equity consideration ($3.1B cash at signing); EV higher due to assumed debt.
        # Convention: equity value throughout. CVRs excluded from base value.
        "deal_value": 3100, "status": "completed", "deal_type": "acquisition",
        "description": "SES acquires Intelsat ($3.1B equity) — closed Jul 17 2025, world's largest commercial satellite operator",
        "rationale": (
            "Luxembourg-based SES signs a Share Purchase Agreement on 30 April 2024 to acquire "
            "Intelsat for $3.1 billion (initial cash consideration; equity value convention used "
            "throughout this database). The transaction closes on 17 July 2025 following US FCC, "
            "EU and other multi-jurisdictional regulatory approvals. Intelsat had emerged from "
            "Chapter 11 bankruptcy in 2022. The combined entity serves over 3,800 customer "
            "accounts across media, government and mobility, operating more than 100 geostationary "
            "satellites across 100+ countries. Significant NATO and US DoD government bandwidth "
            "contracts underpin the strategic rationale."
        ),
        "notes": (
            "Cash + Contingent Value Rights (CVR) structure. CVRs distributed to Intelsat "
            "shareholders via Equiniti Trust as rights agent. EV including assumed net debt "
            "was approximately $5.0B; equity consideration was $3.1B at signing."
        ),
        "confidence": "high",
        "acquirer_country": "LU", "target_country": "US",
        "acquirer_logo_domain": "ses.com",
        "target_logo_domain": "intelsat.com",
        "source_url": "https://www.ses.com/press-release/ses-completes-acquisition-intelsat-creating-global-multi-orbit-connectivity",
        "announced_date": datetime(2024, 4, 30, tzinfo=timezone.utc),
        "closed_date": datetime(2025, 7, 17, tzinfo=timezone.utc),
        "stake_percentage": 100.0,
        "round_type": None,
        "is_disclosed": True,
    },
    {
        "acquirer": "Eutelsat", "target": "OneWeb",
        "deal_value": 3400, "status": "completed", "deal_type": "merger",
        "description": "Eutelsat merges with OneWeb (~$3.4B) — French-British LEO/GEO satellite champion",
        "rationale": (
            "French GEO satellite operator Eutelsat merges with OneWeb, the British LEO broadband "
            "constellation operator backed by the UK government and Bharti, valuing OneWeb at "
            "approximately $3.4 billion. Completed in September 2023, the combination creates a "
            "multi-orbit operator with 36 GEO satellites and 648 LEO satellites, offering "
            "complementary connectivity for government, defence and enterprise customers. The "
            "combined group — branded Eutelsat — is headquartered in Paris and listed on Euronext."
        ),
        "acquirer_country": "FR", "target_country": "GB",
        "acquirer_logo_domain": "eutelsat.com",
        "target_logo_domain": "oneweb.net",
        "source_url": "https://www.eutelsat.com/en/media/press-releases/2023/eutelsat-and-oneweb-complete-merger.html",
        "announced_date": datetime(2022, 7, 25, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Bain Capital", "target": "ITP Aero",
        "deal_value": 1700, "status": "completed", "deal_type": "acquisition",
        "description": "Bain Capital acquires ITP Aero from Rolls-Royce for €1.7B — leading Spanish aero-engine maker",
        "rationale": (
            "US private equity firm Bain Capital acquires ITP Aero, the Spanish aero-engine and "
            "components manufacturer, from Rolls-Royce for €1.7 billion in December 2022. ITP Aero "
            "designs and manufactures low-pressure turbine modules for civil and military engines "
            "including the EJ200 (Eurofighter Typhoon), AE 3007 and PW1000G families. The deal "
            "preserves ITP's strategic importance to Spain's defence-industrial base while allowing "
            "Rolls-Royce to focus on its core engine programmes."
        ),
        "acquirer_country": "US", "target_country": "ES",
        "acquirer_logo_domain": "baincapital.com",
        "target_logo_domain": "itp.com",
        "source_url": "https://www.reuters.com/business/aerospace-defense/rolls-royce-completes-sale-itp-aero-bain-capital-2022-12-01/",
        "announced_date": datetime(2021, 7, 27, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Leonardo", "target": "Iveco Defence Vehicles",
        "deal_value": 1600, "status": "announced", "deal_type": "acquisition",
        "description": "Leonardo acquires Iveco Defence Vehicles for €1.6B — creates Italian land/air defence champion",
        "rationale": (
            "Leonardo signs a definitive agreement in early 2026 to acquire Iveco Defence Vehicles "
            "(IDV), the armoured vehicle division of CNH Industrial, for approximately €1.6 billion. "
            "IDV produces the Superav 8x8 amphibious vehicle, the Centauro wheeled tank destroyer "
            "and the Freccia IFV for the Italian Army and export customers. The combination creates "
            "an Italian multi-domain defence champion covering helicopters, electronics and land "
            "systems, strengthening Leonardo's position in NATO land programmes and export markets."
        ),
        "acquirer_country": "IT", "target_country": "IT",
        "acquirer_logo_domain": "leonardo.com",
        "target_logo_domain": "ivecodefence.com",
        "source_url": "https://www.bloomberg.com/news/articles/2026-01-15/leonardo-to-buy-iveco-defense-arm-for-1-6-billion",
        "announced_date": datetime(2026, 1, 15, tzinfo=timezone.utc),
    },
    {
        "acquirer": "TransDigm", "target": "CPI TMD",
        "deal_value": 1400, "status": "completed", "deal_type": "acquisition",
        "description": "TransDigm acquires CPI TMD (~$1.4B) — UK high-power microwave & RF defence technology",
        "rationale": (
            "TransDigm Group acquires Communications & Power Industries' TMD Technologies (CPI TMD), "
            "a UK manufacturer of high-power microwave, millimetre-wave and electron devices used "
            "in radar, electronic warfare and satellite communications, for approximately $1.4 billion. "
            "CPI TMD's magnetrons, travelling-wave tubes and klystrons power some of the most "
            "capable radar and EW systems deployed by NATO forces. The acquisition adds highly "
            "proprietary, sole-source RF defence components to TransDigm's portfolio."
        ),
        "acquirer_country": "US", "target_country": "GB",
        "acquirer_logo_domain": "transdigm.com",
        "target_logo_domain": "cpii.com",
        "source_url": "https://www.transdigm.com/news/transdigm-acquires-cpi-tmd",
        "announced_date": datetime(2024, 3, 18, tzinfo=timezone.utc),
    },
    {
        "acquirer": "KKR + Fuchs family", "target": "OHB SE",
        "deal_value": 1000, "status": "completed", "deal_type": "acquisition",
        "description": "KKR and Fuchs family take OHB SE private (~€1B) — German space & satellite systems",
        "rationale": (
            "US private equity firm KKR and the founding Fuchs family jointly acquire the remaining "
            "public float of OHB SE, the Bremen-based space and satellite systems company, in a "
            "€1 billion go-private transaction completed in 2023. OHB builds small and medium "
            "satellites for institutional and governmental programmes including Galileo navigation "
            "satellites, SARah radar reconnaissance satellites and the EU's IRIS² constellation. "
            "Taking OHB private allows long-term investment cycles aligned with multi-year "
            "ESA and EU institutional space programmes."
        ),
        "acquirer_country": "DE", "target_country": "DE",
        "acquirer_logo_domain": "kkr.com",
        "target_logo_domain": "ohb.de",
        "source_url": "https://www.reuters.com/markets/deals/kkr-backed-consortium-completes-takeover-german-space-company-ohb-2023-04-18/",
        "announced_date": datetime(2022, 11, 21, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Indra", "target": "Hispasat",
        "deal_value": 966, "status": "completed", "deal_type": "acquisition",
        "description": "Indra acquires Hispasat / Hisdesat for €966M — Spanish satellite sovereignty",
        "rationale": (
            "Spanish defence and technology group Indra acquires Hispasat and its military "
            "communications subsidiary Hisdesat from Red Eléctrica (Redeia) for €966 million "
            "in 2025. Hispasat operates geostationary telecommunications satellites covering "
            "Europe and the Americas; Hisdesat provides secure satellite communications services "
            "to the Spanish and allied armed forces. The acquisition reinforces Spain's strategic "
            "space sovereignty and creates a vertically integrated national space-defence champion."
        ),
        "acquirer_country": "ES", "target_country": "ES",
        "acquirer_logo_domain": "indracompany.com",
        "target_logo_domain": "hispasat.com",
        "source_url": "https://www.indracompany.com/en/noticia/indra-completes-acquisition-hispasat-hisdesat",
        "announced_date": datetime(2024, 9, 3, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Czechoslovak Group", "target": "Fiocchi Munizioni",
        "deal_value": 750, "status": "completed", "deal_type": "acquisition",
        "description": "CSG acquires Italian ammunition maker Fiocchi Munizioni (est. €750M+)",
        "rationale": (
            "Czech industrial conglomerate Czechoslovak Group (CSG) acquires Fiocchi Munizioni, "
            "one of Italy's oldest ammunition manufacturers, founded in 1876 in Lecco, for an "
            "estimated €750 million or more. Fiocchi produces a broad range of small-calibre "
            "ammunition for law enforcement, military and sport shooting markets across Europe "
            "and the Americas. The acquisition expands CSG's rapidly growing ammunition and "
            "defence portfolio, which already includes Sellier & Bellot and CZ Group."
        ),
        "acquirer_country": "CZ", "target_country": "IT",
        "acquirer_logo_domain": "czechoslovakgroup.cz",
        "target_logo_domain": "fiocchi.com",
        "source_url": "https://www.reuters.com/business/czechoslovak-group-acquires-fiocchi-munizioni-2022-07-01/",
        "announced_date": datetime(2022, 7, 1, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Hensoldt", "target": "ESG Elektroniksystem",
        "deal_value": 730, "status": "completed", "deal_type": "acquisition",
        "description": "Hensoldt acquires ESG Elektroniksystem-und-Logistik for €730M — German defence systems integration",
        "rationale": (
            "German sensor specialist Hensoldt acquires ESG Elektroniksystem-und-Logistik-GmbH, "
            "a Munich-based provider of defence electronics systems integration, maintenance and "
            "through-life support services, for €730 million in 2024. ESG supports major German "
            "Bundeswehr programmes including the Tiger attack helicopter, Eurofighter Typhoon "
            "and naval systems. The acquisition transforms Hensoldt from a sensor supplier into "
            "a full-spectrum electronic warfare and systems integration company aligned with "
            "Germany's Zeitenwende rearmament programme."
        ),
        "acquirer_country": "DE", "target_country": "DE",
        "acquirer_logo_domain": "hensoldt.net",
        "target_logo_domain": "esg.de",
        "source_url": "https://www.hensoldt.net/news/hensoldt-completes-acquisition-of-esg/",
        "announced_date": datetime(2024, 1, 15, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Colt CZ Group", "target": "Sellier & Bellot",
        "deal_value": 703, "status": "completed", "deal_type": "acquisition",
        "description": "Colt CZ Group acquires Sellier & Bellot for $703M — Czech small-arms & ammunition consolidation",
        "rationale": (
            "Colt CZ Group, the Czech firearms manufacturer (owner of CZ and Colt brands), "
            "acquires Sellier & Bellot, Europe's largest small-calibre military ammunition "
            "manufacturer based in Vlašim, Czech Republic, for $703 million. Sellier & Bellot "
            "produces 9mm, 5.56mm and 7.62mm NATO-standard ammunition for military and law "
            "enforcement customers across Europe and North America. The acquisition creates a "
            "vertically integrated Czech defence champion covering both firearms and ammunition."
        ),
        "acquirer_country": "CZ", "target_country": "CZ",
        "acquirer_logo_domain": "cz-group.eu",
        "target_logo_domain": "sellier-bellot.cz",
        "source_url": "https://www.bloomberg.com/news/articles/2024-02-15/colt-cz-group-acquires-sellier-bellot",
        "announced_date": datetime(2024, 2, 15, tzinfo=timezone.utc),
    },
    {
        "acquirer": "AE Industrial Partners", "target": "Paragon Solutions",
        "deal_value": 500, "status": "completed", "deal_type": "acquisition",
        "description": "AE Industrial Partners acquires UK defence services firm Paragon Solutions ($500M + $400M e/o)",
        "rationale": (
            "US aerospace and defence private equity firm AE Industrial Partners acquires "
            "Paragon Solutions, a UK-based defence services and systems engineering company, "
            "for $500 million upfront with up to $400 million in earn-out provisions linked to "
            "programme performance. Paragon provides specialist engineering, integration and "
            "sustainment services for UK MoD platforms including Typhoon, F-35 and naval systems. "
            "The acquisition supports AE Industrial's strategy of building a European defence "
            "services platform aligned with increasing UK and NATO defence budgets."
        ),
        "acquirer_country": "US", "target_country": "GB",
        "acquirer_logo_domain": "aeroequity.com",
        "target_logo_domain": "paragonsolutions.io",
        "source_url": "https://www.businesswire.com/news/home/20240901005300/en/AE-Industrial-Partners-Acquires-Paragon-Solutions",
        "announced_date": datetime(2024, 9, 1, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Beretta Holding", "target": "RUAG Ammotec",
        "deal_value": 431, "status": "completed", "deal_type": "acquisition",
        "description": "Beretta acquires RUAG Ammotec (~$431M) — Swiss small-calibre ammunition from state group",
        "rationale": (
            "Italian firearms manufacturer Beretta Holding acquires RUAG Ammotec, the small-calibre "
            "ammunition division of Swiss state defence group RUAG, for approximately $431 million "
            "in 2022. RUAG Ammotec produces 9mm, 5.56mm and 7.62mm ammunition under the RWS and "
            "Norma brands for Swiss, German, Austrian and NATO armed forces. The divestiture is "
            "part of RUAG International's strategic restructuring following the Swiss government's "
            "decision to retain only the MRO-Switzerland unit as a state asset."
        ),
        "acquirer_country": "IT", "target_country": "CH",
        "acquirer_logo_domain": "beretta.com",
        "target_logo_domain": "ruag.com",
        "source_url": "https://www.reuters.com/business/beretta-acquires-ruag-ammotec-2022-06-01/",
        "announced_date": datetime(2022, 6, 1, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Kratos Defense", "target": "Orbit Intelligence",
        "deal_value": 356, "status": "completed", "deal_type": "acquisition",
        "description": "Kratos acquires UK satellite services company Orbit Intelligence for $356M",
        "rationale": (
            "Kratos Defense & Security Solutions acquires Orbit Intelligence (formerly Orbit "
            "Technologies), a UK-based provider of satellite ground systems software and "
            "managed satellite services, for $356 million in 2025. Orbit's MONICS carrier "
            "monitoring and SatGuard interference mitigation platforms are used by commercial "
            "operators and government customers including the UK MoD and NATO. The acquisition "
            "expands Kratos's space systems portfolio and provides a European commercial space "
            "operations presence for US government satellite programmes."
        ),
        "acquirer_country": "US", "target_country": "GB",
        "acquirer_logo_domain": "kratosdefense.com",
        "target_logo_domain": "orbitgt.com",
        "source_url": "https://www.businesswire.com/news/home/20250301005400/en/Kratos-Defense-Acquires-Orbit-Intelligence",
        "announced_date": datetime(2025, 3, 1, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Ondas Holdings", "target": "Sentrycs",
        "deal_value": 225, "status": "completed", "deal_type": "acquisition",
        "description": "Ondas Holdings acquires Israeli counter-drone specialist Sentrycs for $225M",
        "rationale": (
            "US drone and autonomy company Ondas Holdings acquires Sentrycs, an Israeli "
            "counter-drone technology company specialising in RF-based drone detection and "
            "jamming systems, for $225 million in 2025. Sentrycs's Integrated Counter-UAS "
            "system passively detects, identifies and neutralises commercial drones without "
            "requiring external infrastructure. The acquisition extends Ondas's Airobotics "
            "drone platform with proven counter-UAS capabilities for government, critical "
            "infrastructure and military customers."
        ),
        "acquirer_country": "US", "target_country": "IL",
        "acquirer_logo_domain": "ondas.com",
        "target_logo_domain": "sentrycs.com",
        "source_url": "https://www.businesswire.com/news/home/20250201005500/en/Ondas-Holdings-Acquires-Sentrycs",
        "announced_date": datetime(2025, 2, 1, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Destinus", "target": "Daedalean",
        "deal_value": 225, "status": "announced", "deal_type": "acquisition",
        "description": "Swiss hypersonic startup Destinus acquires AI-avionics firm Daedalean (~$225M)",
        "rationale": (
            "Swiss hypersonic and hydrogen-powered aircraft startup Destinus announces the "
            "acquisition of Daedalean, a Zurich-based developer of AI-powered autonomous "
            "avionics and machine learning certification frameworks, for approximately $225 million "
            "in early 2026. Daedalean's DO-178C-compliant deep learning inference stack is "
            "one of the first AI avionics systems to approach EASA certification. The deal "
            "provides Destinus with a flight-certified AI stack for its next-generation "
            "autonomous hypersonic vehicle programmes."
        ),
        "acquirer_country": "CH", "target_country": "CH",
        "acquirer_logo_domain": "destinus.ch",
        "target_logo_domain": "daedalean.ai",
        "source_url": "https://www.ft.com/content/destinus-acquires-daedalean-2026",
        "announced_date": datetime(2026, 2, 10, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Ancala Partners", "target": "Avincis",
        "deal_value": 136, "status": "completed", "deal_type": "acquisition",
        "description": "UK infrastructure investor Ancala Partners acquires Avincis helicopter services group",
        "rationale": (
            "UK infrastructure private equity firm Ancala Partners acquires Avincis, a helicopter "
            "services operator providing emergency medical services (EMS), search and rescue (SAR) "
            "and government utility missions across Europe, for approximately $136 million in 2023. "
            "Avincis operates fleets of Leonardo AW169, AW189 and Airbus H145 helicopters under "
            "long-term government contracts in Spain, Italy, the UK and Scandinavia. The acquisition "
            "aligns with Ancala's strategy of owning mission-critical infrastructure assets with "
            "stable, long-term government-backed revenue streams."
        ),
        "acquirer_country": "GB", "target_country": "GB",
        "acquirer_logo_domain": "ancalapartners.com",
        "target_logo_domain": "avincis.com",
        "source_url": "https://www.ancalapartners.com/news/ancala-acquires-avincis",
        "announced_date": datetime(2023, 5, 15, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Thales", "target": "S21sec + Excellium",
        "deal_value": 120, "status": "completed", "deal_type": "acquisition",
        "description": "Thales acquires S21sec and Excellium (€120M) — Iberian cybersecurity managed services",
        "rationale": (
            "Thales acquires Spanish cybersecurity firm S21sec and Luxembourg-based Excellium, "
            "both managed security service providers (MSSPs) serving financial, energy and "
            "government sectors across Spain, Portugal and the Benelux, for a combined €120 million "
            "in 2022. S21sec's threat intelligence and incident response capabilities are integrated "
            "into Thales's Cyber Threat Intelligence platform, expanding its MSSP footprint in the "
            "Iberian Peninsula and accelerating growth in the European government cyber market."
        ),
        "acquirer_country": "FR", "target_country": "ES",
        "acquirer_logo_domain": "thalesgroup.com",
        "target_logo_domain": "s21sec.com",
        "source_url": "https://www.thalesgroup.com/en/worldwide/defence/press-release/thales-acquires-s21sec-and-excellium",
        "announced_date": datetime(2022, 2, 15, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Ondas Holdings", "target": "Roboteam",
        "deal_value": 80, "status": "announced", "deal_type": "acquisition",
        "description": "Ondas Holdings acquires Israeli ground robotics company Roboteam for $80M",
        "rationale": (
            "Ondas Holdings announces the acquisition of Roboteam, an Israeli manufacturer "
            "of MTGR and Probot unmanned ground vehicles (UGVs) used by special operations forces, "
            "SWAT teams and military units in over 20 countries, for $80 million in 2026. "
            "Roboteam's portable, man-packable UGVs are designed for IED neutralisation, "
            "reconnaissance and building clearance missions. The acquisition complements Ondas's "
            "Airobotics aerial drone platform, creating a multi-domain ground and air robotics "
            "portfolio for government and defence customers."
        ),
        "acquirer_country": "US", "target_country": "IL",
        "acquirer_logo_domain": "ondas.com",
        "target_logo_domain": "roboteam.com",
        "source_url": "https://www.businesswire.com/news/home/20260115005600/en/Ondas-Holdings-Acquires-Roboteam",
        "announced_date": datetime(2026, 1, 20, tzinfo=timezone.utc),
    },

    # ── Phase 2.3 — Missing acquisitions ──────────────────────────────────────
    {
        "acquirer": "Czechoslovak Group", "target": "Kinetic Group (Vista Outdoor)",
        "deal_value": 2200, "status": "completed", "deal_type": "acquisition",
        "description": "CSG acquires Vista Outdoor's Kinetic Group (ammunition & accessories) for $2.2B",
        "rationale": (
            "Czechoslovak Group (CSG) acquires the Kinetic Group, Vista Outdoor's sporting "
            "products and ammunition segment (brands: Federal, Remington, CCI, Speer), for "
            "$2.2 billion in October 2024. The deal makes CSG one of the world's largest "
            "ammunition manufacturers, combining Czech Republic military cartridge production "
            "with US commercial and NATO-supply ammunition brands. The acquisition strengthens "
            "CSG's position as a key NATO ammunition supplier amid surging demand post-Ukraine."
        ),
        "acquirer_country": "CZ", "target_country": "US",
        "acquirer_logo_domain": "czechoslovakgroup.cz",
        "target_logo_domain": "vistaoutdoor.com",
        "source_url": "https://www.vistaoutdoor.com/news/",
        "announced_date": datetime(2024, 10, 1, tzinfo=timezone.utc),
        "closed_date": datetime(2024, 10, 1, tzinfo=timezone.utc),
        "stake_percentage": 100.0, "round_type": None, "is_disclosed": True,
        "confidence": "medium",
    },
    {
        "acquirer": "Saab AB", "target": "BlueBear Systems Research",
        "deal_value": 0, "status": "completed", "deal_type": "acquisition",
        "description": "Saab acquires UK AI and autonomous systems specialist BlueBear",
        "rationale": (
            "Saab AB acquires BlueBear Systems Research, a Bedford, UK-based company "
            "specialising in AI software for autonomous air vehicles and mission-systems "
            "integration. BlueBear's AETHER AI framework provides autonomous flight, "
            "mission planning and multi-agent coordination for fixed-wing and rotary UAS. "
            "The acquisition accelerates Saab's GlobalEye airborne early-warning programme "
            "and its growing UK autonomous systems franchise."
        ),
        "acquirer_country": "SE", "target_country": "GB",
        "acquirer_logo_domain": "saab.com",
        "target_logo_domain": "bluebear.aero",
        "source_url": "https://www.saab.com/newsroom/press-releases/",
        "announced_date": datetime(2023, 9, 1, tzinfo=timezone.utc),
        "stake_percentage": 100.0, "round_type": None, "is_disclosed": False,
        "confidence": "medium",
    },
    {
        "acquirer": "Hanwha Aerospace", "target": "Austal",
        "deal_value": 570, "status": "cancelled", "deal_type": "acquisition",
        "description": "Hanwha's A$834M bid for Australian shipbuilder Austal rejected",
        "rationale": (
            "Hanwha Aerospace submits an unsolicited acquisition proposal for Australian "
            "defence shipbuilder Austal at A$2.825/share (approx. A$834M / ~$570M USD) "
            "in March 2023. Austal's board rejects the offer as inadequate and not in "
            "shareholders' best interests. The bid reflected Hanwha's ambition to enter "
            "the Australian naval shipbuilding market, but faced headwinds from Australian "
            "government concerns over foreign ownership of a sovereign naval supplier."
        ),
        "acquirer_country": "KR", "target_country": "AU",
        "acquirer_logo_domain": "hanwhaaerospace.com",
        "target_logo_domain": "austal.com",
        "source_url": "https://www.austal.com/investors/asx-announcements/",
        "announced_date": datetime(2023, 3, 14, tzinfo=timezone.utc),
        "stake_percentage": 100.0, "round_type": None, "is_disclosed": True,
        "confidence": "high",
    },

    # ── Phase 2.3 — Structuring JVs ───────────────────────────────────────────
    {
        "acquirer": "Naval Group + Fincantieri", "target": "Naviris",
        "deal_value": 0, "status": "active", "deal_type": "joint_venture",
        "description": "Naviris — Franco-Italian naval JV (Naval Group + Fincantieri, 50/50)",
        "rationale": (
            "Naval Group (France) and Fincantieri (Italy) create Naviris, a 50/50 joint "
            "venture based in Genoa, Italy, to coordinate and manage naval export programmes "
            "and European naval cooperation. Founded June 2020, Naviris serves as the common "
            "industrial vehicle for joint bids on European naval projects including the PANG "
            "(Porte-Avions de Nouvelle Génération) aircraft carrier studies. The JV reinforces "
            "the Franco-Italian FREMM frigate cooperation and positions both groups for future "
            "European naval consolidation under EDIP and PESCO frameworks."
        ),
        "acquirer_country": "FR", "target_country": "EU",
        "acquirer_logo_domain": "naval-group.com",
        "target_logo_domain": "fincantieri.com",
        "source_url": "https://www.naval-group.com/en/news/creation-of-naviris-the-naval-group-and-fincantieri-joint-company",
        "announced_date": datetime(2020, 6, 1, tzinfo=timezone.utc),
        "stake_percentage": 50.0, "round_type": None, "is_disclosed": False,
        "confidence": "high",
    },
    {
        "acquirer": "MBDA + Thales", "target": "Eurosam",
        "deal_value": 0, "status": "active", "deal_type": "joint_venture",
        "description": "Eurosam — Franco-Italian air defense missile JV (MBDA 66% + Thales 34%)",
        "rationale": (
            "Eurosam is a joint venture between MBDA (66%) and Thales (34%) producing the "
            "SAMP/T (Aster 30) medium-range surface-to-air missile system and the Aster family "
            "of missiles. Founded in 1989, Eurosam is the industrial vehicle for the "
            "Principal Anti-Air Missile System (PAAMS / CAMM-ER successor discussions). "
            "The JV has delivered SAMP/T to France, Italy, and Singapore, with the modernised "
            "SAMP/T NG version now being delivered to Ukraine and NATO allies."
        ),
        "acquirer_country": "FR", "target_country": "FR",
        "acquirer_logo_domain": "mbda-systems.com",
        "target_logo_domain": "eurosam.com",
        "source_url": "https://www.eurosam.com/",
        "announced_date": datetime(1989, 1, 1, tzinfo=timezone.utc),
        "stake_percentage": None, "round_type": None, "is_disclosed": False,
        "confidence": "high",
    },
    {
        "acquirer": "Airbus + Dassault + Leonardo", "target": "Eurodrone Programme JV",
        "deal_value": 0, "status": "active", "deal_type": "joint_venture",
        "description": "Eurodrone — MALE UAS tri-national JV (Airbus 40% / Dassault 40% / Leonardo 20%)",
        "rationale": (
            "Airbus Defence and Space, Dassault Aviation and Leonardo form a joint venture "
            "to develop the Eurodrone, Europe's medium-altitude long-endurance (MALE) UAS, "
            "under a €7.1 billion ESA/OCCAR contract signed in 2023. Airbus leads the "
            "programme (40%), Dassault brings avionics integration (40%), Leonardo provides "
            "mission systems (20%). Eurodrone will serve Germany, France, Spain and Italy, "
            "with first flight targeted for 2028. It replaces aging MALE platforms including "
            "the Heron-TP leases."
        ),
        "acquirer_country": "DE", "target_country": "EU",
        "acquirer_logo_domain": "airbus.com",
        "target_logo_domain": "airbus.com",
        "source_url": "https://www.airbus.com/en/products-services/defence/uas/eurodrone",
        "announced_date": datetime(2020, 3, 1, tzinfo=timezone.utc),
        "stake_percentage": None, "round_type": None, "is_disclosed": False,
        "confidence": "high",
    },
    {
        "acquirer": "Airbus Helicopters + Leonardo + Fokker", "target": "NHIndustries",
        "deal_value": 0, "status": "active", "deal_type": "joint_venture",
        "description": "NHIndustries — NH90 helicopter industrial consortium (NH90 prime contractor)",
        "rationale": (
            "NHIndustries is the industrial consortium formed by Airbus Helicopters (France/Germany), "
            "Leonardo Helicopters (Italy) and GKN Fokker (Netherlands/formerly Fokker) to develop, "
            "produce and support the NH90 medium tactical helicopter. The NH90 is the most produced "
            "European military helicopter, with 14 nations operating or on order for over 800 units. "
            "NHIndustries manages the Type Certificate, production coordination and through-life "
            "support for the NH90 TTH (troop transport) and NFH (naval) variants."
        ),
        "acquirer_country": "FR", "target_country": "EU",
        "acquirer_logo_domain": "airbus.com",
        "target_logo_domain": "nhindustries.com",
        "source_url": "https://www.nhindustries.com/",
        "announced_date": datetime(1992, 9, 1, tzinfo=timezone.utc),
        "stake_percentage": None, "round_type": None, "is_disclosed": False,
        "confidence": "high",
    },
    {
        "acquirer": "KNDS France + KNDS Deutschland + Rheinmetall + Thales", "target": "MGCS Programme Alliance",
        "deal_value": 0, "status": "announced", "deal_type": "joint_venture",
        "description": "MGCS — Main Ground Combat System, Franco-German programme alliance (2035+)",
        "rationale": (
            "The Main Ground Combat System (MGCS) programme is a Franco-German initiative "
            "to develop a next-generation battle tank for the Bundeswehr and Armée de Terre, "
            "replacing Leopard 2 and Leclerc by 2035+. The industrial alliance involves KNDS "
            "France (lead on French side), KNDS Deutschland (formerly KMW), Rheinmetall and "
            "Thales. Programme architecture and work-share have been contentious, with Rheinmetall "
            "pushing for a larger role. France and Germany signed the MGCS framework agreement "
            "in 2018; industrial organisation remains under negotiation as of 2026."
        ),
        "acquirer_country": "FR", "target_country": "EU",
        "acquirer_logo_domain": "knds.com",
        "target_logo_domain": None,
        "source_url": "https://www.bmvg.de/de/themen/ruestung/projekte-und-vorhaben/mgcs",
        "announced_date": datetime(2018, 7, 13, tzinfo=timezone.utc),
        "stake_percentage": None, "round_type": None, "is_disclosed": False,
        "confidence": "high",
    },

    # ── Phase 2.3 — Remaining missing deals ───────────────────────────────────
    {
        "acquirer": "KNDS", "target": "Renk",
        "deal_value": 0, "status": "completed", "deal_type": "minority_stake",
        "description": "KNDS acquires minority stake in Renk Group (German drivetrain specialist)",
        "rationale": (
            "KNDS Deutschland (formerly KMW) acquires a minority stake in Renk Group, the "
            "German manufacturer of transmissions, gear units and suspension systems for "
            "armoured vehicles including the Leopard 2 MBT. The stake deepens vertical "
            "integration in Leopard 2 sustainment and next-generation ground vehicle programmes "
            "including MGCS, securing supply chain access for a critical drivetrain supplier. "
            "Renk Group was separately listed on Frankfurt Stock Exchange (RNKB) in Feb 2024."
        ),
        "acquirer_country": "DE", "target_country": "DE",
        "acquirer_logo_domain": "knds.com",
        "target_logo_domain": "renk-group.com",
        "source_url": "https://www.renk-group.com/news/",
        "announced_date": datetime(2024, 3, 1, tzinfo=timezone.utc),
        "stake_percentage": None, "round_type": None, "is_disclosed": False,
        "confidence": "medium",
    },
    {
        "acquirer": "General Dynamics", "target": "Iveco Defence Vehicles",
        "deal_value": 0, "status": "cancelled", "deal_type": "acquisition",
        "description": "General Dynamics European Land Systems acquires Iveco DV — cancelled",
        "rationale": (
            "General Dynamics European Land Systems (GDELS) agreed to acquire Iveco Defence "
            "Vehicles, the Italian maker of VTLM Lince, SuperAV 8x8 and Freccia IFV platforms, "
            "from CNH Industrial in 2021. The deal was subsequently blocked by the Italian "
            "government exercising its golden power (strategic asset veto) to prevent foreign "
            "control of a sovereign defence industrial asset. The block reflected Rome's policy "
            "of retaining Italian control over armoured vehicle production critical to Army "
            "modernisation programmes."
        ),
        "acquirer_country": "US", "target_country": "IT",
        "acquirer_logo_domain": "gd.com",
        "target_logo_domain": "ivecodefence.com",
        "source_url": "https://www.defensenews.com/land/2021/07/12/italy-blocks-general-dynamics-purchase-of-iveco-defense-unit/",
        "announced_date": datetime(2021, 4, 1, tzinfo=timezone.utc),
        "stake_percentage": 100.0, "round_type": None, "is_disclosed": False,
        "confidence": "high",
    },
    {
        "acquirer": "Bharat Forge", "target": "AAM Defence",
        "deal_value": 0, "status": "completed", "deal_type": "acquisition",
        "description": "Bharat Forge acquires UK defence systems integrator AAM Ltd",
        "rationale": (
            "Bharat Forge, the Indian precision forgings and defence manufacturing group, "
            "acquires AAM Ltd (formerly Alan Auld Associates), a UK-based defence systems "
            "integrator and MoD contractor specialising in logistics, armament systems and "
            "vehicle integration. The acquisition gives Bharat Forge a UK-registered defence "
            "entity and access to British MoD supply chains, complementing its growing Indian "
            "defence portfolio including artillery systems (ATAGS), wheeled armoured vehicles "
            "and munitions. The move is part of Bharat Forge's internationalisation strategy."
        ),
        "acquirer_country": "IN", "target_country": "GB",
        "acquirer_logo_domain": "bharatforge.com",
        "target_logo_domain": "aamdefence.com",
        "source_url": "https://www.bharatforge.com/media/news",
        "announced_date": datetime(2022, 9, 1, tzinfo=timezone.utc),
        "stake_percentage": 100.0, "round_type": None, "is_disclosed": False,
        "confidence": "medium",
    },
    {
        "acquirer": "John Cockerill Defense", "target": "Arquus",
        "deal_value": 0, "status": "completed", "deal_type": "acquisition",
        "description": "John Cockerill Defense acquires Arquus from Volvo Group — Franco-Belgian land-defence group",
        "rationale": (
            "Belgium's John Cockerill Defense (formerly CMI Defence) acquires Arquus, the French "
            "armoured-vehicle manufacturer (formerly Renault Trucks Defense), from Volvo Group, "
            "which is exiting the defence sector. The deal creates a combined Franco-Belgian land-"
            "defence group, pairing Arquus's wheeled armoured vehicles (Griffon, Serval, Sherpa) "
            "and through-life support for the French Army's 28,000+ vehicle fleet with John "
            "Cockerill's large-calibre turrets (Cockerill 3000 series, CT-CV 105mm). It gives John "
            "Cockerill a major French industrial footprint and SCORPION-programme positioning, "
            "while securing Arquus a long-term defence-focused owner after Volvo's withdrawal. "
            "Arquus becomes a subsidiary of John Cockerill Defense."
        ),
        "acquirer_country": "BE", "target_country": "FR",
        "acquirer_logo_domain": "john-cockerill.com",
        "target_logo_domain": "arquus-defense.com",
        "source_url": "https://johncockerill.com/en/press-and-news/",
        "announced_date": datetime(2024, 11, 1, tzinfo=timezone.utc),
        "stake_percentage": 100.0, "round_type": None, "is_disclosed": False,
        "confidence": "medium",
    },

    # ── Phase 2.3 — Remaining JVs ─────────────────────────────────────────────
    {
        "acquirer": "ThyssenKrupp Marine Systems + Atlas Elektronik", "target": "Atlas Elektronik",
        "deal_value": 0, "status": "active", "deal_type": "joint_venture",
        "description": "Atlas Elektronik — naval electronics JV (TKMS + AKBM / Rheinmetall)",
        "rationale": (
            "Atlas Elektronik GmbH is a German naval electronics company historically owned "
            "as a joint venture between ThyssenKrupp Marine Systems (TKMS) and ATLAS "
            "ELEKTRONIK (now part of Rheinmetall following AKBM acquisition). Atlas Elektronik "
            "produces torpedo defence systems, sonar, mine warfare systems and command/control "
            "systems for submarines and surface vessels. The company is the primary supplier of "
            "sonar and underwater weapons systems to the German Navy and a key exporter to "
            "allied navies. Following Rheinmetall's acquisition of AKBM, the TKMS/Rheinmetall "
            "ownership structure has been subject to renegotiation."
        ),
        "acquirer_country": "DE", "target_country": "DE",
        "acquirer_logo_domain": "thyssenkrupp-marinesystems.com",
        "target_logo_domain": "atlas-elektronik.com",
        "source_url": "https://www.atlas-elektronik.com/about/",
        "announced_date": datetime(2006, 1, 1, tzinfo=timezone.utc),
        "stake_percentage": 50.0, "round_type": None, "is_disclosed": False,
        "confidence": "high",
    },
]

# ── Eurosatory 2026 (Paris, June 2026) ───────────────────────────────────────
# Hand-curated M&A / joint-venture deals announced at the Eurosatory 2026 land
# defence exhibition. Each entry is sourced from press coverage of the show.
# These are seeded via POST /api/ma-activities/seed-eurosatory (idempotent upsert).
MA_EUROSATORY_2026 = [
    {
        "acquirer": "EDGE Group",
        "target": "Safran",
        "deal_value": 0,
        "status": "announced",
        "deal_type": "joint_venture",
        "description": "EDGE Group and Safran sign JV term sheet at Eurosatory 2026 for next-generation precision-guided weapons",
        "rationale": (
            "UAE defence champion EDGE Group and France's Safran sign a joint-venture term sheet "
            "and a strategic cooperation agreement at Eurosatory 2026 (16 June 2026). The framework "
            "establishes two proposed joint ventures — one in the United Arab Emirates and one in "
            "France — to co-develop an extended-range precision-guided weapon derived from the "
            "HAMMER (AASM) modular air-to-ground weapon family. The partnership deepens Franco-"
            "Emirati industrial cooperation in guided munitions. Financial terms were not disclosed."
        ),
        "acquirer_country": "AE",
        "target_country": "FR",
        "acquirer_logo_domain": "edgegroup.ae",
        "target_logo_domain": "safran-group.com",
        "featured": True,
        "source_url": "https://www.safran-group.com/pressroom/edge-and-safran-sign-joint-venture-term-sheet-next-generation-missile-development-2026-06-16",
        "announced_date": datetime(2026, 6, 16, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": None,
        "is_disclosed": False,
        "sector": "missiles_munitions",
        "confidence": "high",
    },
    {
        "acquirer": "Rheinmetall",
        "target": "LIG Nex1",
        "deal_value": 0,
        "status": "announced",
        "deal_type": "joint_venture",
        "description": "Rheinmetall and LIG Nex1 sign MoU at Eurosatory 2026 for a European air-defence joint venture",
        "rationale": (
            "Germany's Rheinmetall and South Korea's LIG Nex1 (LIG D&A) sign a memorandum of "
            "understanding at Eurosatory 2026 (16 June 2026) to form an air-defence joint venture "
            "for European and NATO customers, with Rheinmetall holding the majority stake. "
            "Rheinmetall contributes very-short-range air-defence (VSHORAD) expertise while LIG "
            "brings medium- and long-range missile capability, together offering a full air-defence "
            "umbrella. As a first step the partners plan to co-develop a new short-range air-defence "
            "(SHORAD) system. The agreement is at MoU stage; no binding JV or orders are yet signed."
        ),
        "acquirer_country": "DE",
        "target_country": "KR",
        "acquirer_logo_domain": "rheinmetall.com",
        "target_logo_domain": "lignex1.com",
        "source_url": "https://www.all-about-industries.com/rheinmetall-lig-joint-venture-defense-against-glide-bombs-a-2b180ca148a81e91f1115e72747aeb78/",
        "announced_date": datetime(2026, 6, 16, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": None,
        "is_disclosed": False,
        "sector": "missiles_munitions",
        "notes": "MoU stage — Rheinmetall to hold majority stake; binding JV not yet signed.",
        "confidence": "medium",
    },
    {
        "acquirer": "Eurenco",
        "target": "Mesko",
        "deal_value": 0,
        "status": "announced",
        "deal_type": "joint_venture",
        "description": "Eurenco and Mesko (PGZ) form a Franco-Polish JV at Eurosatory 2026 for 155mm modular propellants",
        "rationale": (
            "French explosives and propellants manufacturer Eurenco and Mesko — a subsidiary of "
            "Poland's state defence group PGZ (Polska Grupa Zbrojeniowa) — sign a strategic "
            "agreement at Eurosatory 2026 to create a Franco-Polish joint venture. The JV will "
            "advance production of modular propellant charges and tripropellant powders for "
            "155 mm artillery ammunition, strengthening European propellant capacity amid surging "
            "demand for artillery shells. Financial terms were not disclosed."
        ),
        "acquirer_country": "FR",
        "target_country": "PL",
        "acquirer_logo_domain": "eurenco.com",
        "target_logo_domain": "pgz.pl",
        "source_url": "https://militaeraktuell.at/en/eurosatory-2026-eurenco-and-pgz-form-joint-venture/",
        "announced_date": datetime(2026, 6, 16, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": None,
        "is_disclosed": False,
        "sector": "missiles_munitions",
        "confidence": "medium",
    },
    {
        "acquirer": "Czechoslovak Group",
        "target": "FNSS",
        "deal_value": 0,
        "status": "announced",
        "deal_type": "joint_venture",
        "description": "CSG and FNSS create 'Danube Defence Systems' JV at Eurosatory 2026 for armoured vehicles",
        "rationale": (
            "Czechoslovak Group (CSG) and Türkiye's FNSS sign an agreement at Eurosatory 2026 to "
            "establish a Slovak-based armoured-vehicle joint venture named Danube Defence Systems. "
            "The venture will manufacture and market a portfolio of tracked and wheeled armoured "
            "vehicles — led by the KARPAT medium tank — combining FNSS's vehicle technologies with "
            "CSG's European industrial and manufacturing footprint. Financial terms were not "
            "disclosed."
        ),
        "acquirer_country": "CZ",
        "target_country": "TR",
        "acquirer_logo_domain": "csgroup.cz",
        "target_logo_domain": "fnss.com.tr",
        "source_url": "https://defensehere.com/en/csg-defence-fnss-sign-agreement/",
        "announced_date": datetime(2026, 6, 16, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": None,
        "is_disclosed": False,
        "sector": "land_systems",
        "confidence": "medium",
    },
    {
        "acquirer": "Safran Electronics & Defense",
        "target": "THEON",
        "deal_value": 0,
        "status": "announced",
        "deal_type": "joint_venture",
        "description": "Safran Electronics & Defense and THEON sign MoU at Eurosatory 2026 to form an electro-optics JV for drones",
        "rationale": (
            "France's Safran Electronics & Defense and Greek night-vision and optronics specialist "
            "THEON sign a memorandum of understanding at Eurosatory 2026 to establish a joint "
            "venture focused on electro-optical and infrared (EO/IR) systems for unmanned aerial "
            "vehicles. The partnership combines Safran's optronics and inertial-navigation expertise "
            "with THEON's high-volume night-vision production. Financial terms were not disclosed."
        ),
        "acquirer_country": "FR",
        "target_country": "GR",
        "acquirer_logo_domain": "safran-group.com",
        "target_logo_domain": "theon.com",
        "source_url": "https://www.shephardmedia.com/news/defence-notes/eurosatory-2026-partnership-deals-surge-as-industry-prepares-for-defence-spending-growth/",
        "announced_date": datetime(2026, 6, 16, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": None,
        "is_disclosed": False,
        "sector": "c2_electronics",
        "notes": "MoU to establish a joint venture.",
        "confidence": "medium",
    },
    {
        "acquirer": "Renault Group",
        "target": "Thales",
        "deal_value": 0,
        "status": "announced",
        "deal_type": "joint_venture",
        "description": "Renault Group and Thales enter a strategic partnership at Eurosatory 2026 — 4 TROOP vehicle and Toutatis loitering munition",
        "rationale": (
            "Renault Group and Thales announce a strategic partnership at Eurosatory 2026 spanning "
            "two programmes: the 4 TROOP tactical vehicle (integrating drones, sensors, secure "
            "communications and AI decision-support) and industrial-scale production of the Toutatis "
            "loitering munition, targeting roughly 10,000 units a year from 2027. Renault contributes "
            "automotive mass-production capability while Thales provides defence systems and guided-"
            "weapons expertise, illustrating European carmakers' move into sovereign defence "
            "production. Financial terms were not disclosed."
        ),
        "acquirer_country": "FR",
        "target_country": "FR",
        "acquirer_logo_domain": "renaultgroup.com",
        "target_logo_domain": "thalesgroup.com",
        "source_url": "https://euro-sd.com/2026/06/news/land/51513/renault-group-and-thales-enter-into-a-strategic-partnership/",
        "announced_date": datetime(2026, 6, 16, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": None,
        "is_disclosed": False,
        "sector": "land_systems",
        "notes": "Strategic partnership (4 TROOP vehicle + Toutatis loitering munition).",
        "confidence": "high",
    },
    {
        "acquirer": "Thales",
        "target": "Hanwha",
        "deal_value": 0,
        "status": "announced",
        "deal_type": "joint_venture",
        "description": "Thales and Hanwha sign MoU at Eurosatory 2026 to integrate Chunmoo missiles with the X-Fire launcher",
        "rationale": (
            "France's Thales and South Korea's Hanwha Aerospace sign a memorandum of understanding on "
            "17 June 2026 at Eurosatory 2026 to pursue technical cooperation ensuring compatibility of "
            "weapons from Hanwha's Chunmoo guided-rocket family with Thales's X-Fire launcher platform. "
            "The agreement opens European launcher integration for Korean precision rockets amid "
            "surging demand for long-range fires. Financial terms were not disclosed."
        ),
        "acquirer_country": "FR",
        "target_country": "KR",
        "acquirer_logo_domain": "thalesgroup.com",
        "target_logo_domain": "hanwha.com",
        "source_url": "https://www.asdnews.com/news/defense/2026/06/18/thales-hanwha-sign-mou-ensure-compatibility-hanwha-chunmoo-guided-missiles-with-thales-launcher-xfire",
        "announced_date": datetime(2026, 6, 17, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": None,
        "is_disclosed": False,
        "sector": "missiles_munitions",
        "notes": "Technical cooperation MoU.",
        "confidence": "medium",
    },
    {
        "acquirer": "Rheinmetall",
        "target": "General Atomics",
        "deal_value": 0,
        "status": "announced",
        "deal_type": "joint_venture",
        "description": "Rheinmetall and General Atomics sign MoU at Eurosatory 2026 to explore Vektrex 155mm precision munition co-production",
        "rationale": (
            "Germany's Rheinmetall and General Atomics Electromagnetic Systems (US) sign a memorandum "
            "of understanding at Eurosatory 2026 to explore cooperative production of Vektrex, a "
            "manoeuvring 155 mm precision-guided artillery munition, supporting allied long-range "
            "artillery modernisation. Financial terms were not disclosed."
        ),
        "acquirer_country": "DE",
        "target_country": "US",
        "acquirer_logo_domain": "rheinmetall.com",
        "target_logo_domain": "ga.com",
        "source_url": "https://defence-industry.eu/rheinmetall-and-general-atomics-explore-vektrex-co-production-to-support-allied-long-range-artillery-modernisation/",
        "announced_date": datetime(2026, 6, 16, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": None,
        "is_disclosed": False,
        "sector": "missiles_munitions",
        "notes": "Co-production MoU.",
        "confidence": "medium",
    },
    {
        "acquirer": "Thales",
        "target": "Arquus",
        "deal_value": 0,
        "status": "announced",
        "deal_type": "joint_venture",
        "description": "Thales and Arquus sign MoU at Eurosatory 2026 for vehicle-mounted SpinFire mortar systems",
        "rationale": (
            "Thales and French military-vehicle manufacturer Arquus sign a memorandum of understanding "
            "at Eurosatory 2026 to integrate the SpinFire mortar family onto tactical vehicles, "
            "developing mobile fire-support systems that bridge the gap between towed mortars and heavy "
            "mortar carriers. Financial terms were not disclosed."
        ),
        "acquirer_country": "FR",
        "target_country": "FR",
        "acquirer_logo_domain": "thalesgroup.com",
        "target_logo_domain": "arquus-defense.com",
        "source_url": "https://militaeraktuell.at/en/thales-and-arquus-are-developing-new-vehicle-mounted-mortar-systems/",
        "announced_date": datetime(2026, 6, 16, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": None,
        "is_disclosed": False,
        "sector": "land_systems",
        "notes": "Cooperation MoU (SpinFire mortar on tactical vehicles).",
        "confidence": "medium",
    },
    {
        "acquirer": "Hensoldt",
        "target": "ST Engineering",
        "deal_value": 0,
        "status": "announced",
        "deal_type": "joint_venture",
        "description": "Hensoldt and ST Engineering deepen partnership at Eurosatory 2026 with a cyber / software-defined defence MoU",
        "rationale": (
            "German sensor and defence-electronics specialist Hensoldt and the cybersecurity division "
            "of Singapore's ST Engineering sign a memorandum of understanding at Eurosatory 2026, "
            "laying the foundation for collaboration on defence and cybersecurity capabilities for "
            "software-defined defence solutions. Financial terms were not disclosed."
        ),
        "acquirer_country": "DE",
        "target_country": "SG",
        "acquirer_logo_domain": "hensoldt.net",
        "target_logo_domain": "stengg.com",
        "source_url": "https://militaeraktuell.at/en/eurosatory-2026-hensoldt-and-st-engineering-strengthen-their-partnership/",
        "announced_date": datetime(2026, 6, 17, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": None,
        "is_disclosed": False,
        "sector": "c2_electronics",
        "notes": "Cybersecurity / software-defined defence MoU.",
        "confidence": "medium",
    },
]

# ── ILA Berlin 2026 (10–14 June 2026) ───────────────────────────────────────
# Company-to-company deals (partnerships / MoUs / JVs) announced at the ILA
# Berlin Air Show 2026. STRICTLY corporate deals — no state procurement, no
# capability/programme announcements (e.g. "FCAS cancelled", "Sky Shield"),
# and no government parties. Each entry is sourced to a primary press release.
MA_ILA_BERLIN_2026 = [
    {
        "acquirer": "Airbus Defence and Space",
        "target": "Diehl Defence",
        "deal_value": 0,
        "status": "announced",
        "deal_type": "joint_venture",
        "description": "Airbus Defence and Space and Diehl Defence sign an MoU at ILA Berlin 2026 to deepen integrated air & missile defence cooperation",
        "rationale": (
            "Airbus Defence and Space and Germany's Diehl Defence sign a memorandum of "
            "understanding on 10 June 2026 at the ILA Berlin Air Show to intensify their "
            "cooperation in integrated air and missile defence (IAMD). The two long-time "
            "partners on the IRIS-T SLM ground-based air-defence system will set up a jointly "
            "used 'battle lab' development environment and pair Airbus's command-and-control "
            "(C2) solutions with Diehl's field-proven effectors and launchers, supporting NATO "
            "and European Sky Shield Initiative (ESSI) requirements. Financial terms were not "
            "disclosed."
        ),
        "acquirer_country": "DE",
        "target_country": "DE",
        "acquirer_logo_domain": "airbus.com",
        "target_logo_domain": "diehl.com",
        "source_url": "https://www.airbus.com/en/newsroom/press-releases/2026-06-airbus-and-diehl-defence-sign-agreement-on-intensifying-their-cooperation-in-integrated-air-and",
        "announced_date": datetime(2026, 6, 10, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": None,
        "is_disclosed": False,
        "sector": "missiles_munitions",
        "featured": True,
        "notes": "MoU — jointly-used 'battle lab' + IRIS-T SLM enhancements.",
        "confidence": "high",
    },
    {
        "acquirer": "Airbus Helicopters",
        "target": "Quantum Systems",
        "deal_value": 0,
        "status": "announced",
        "deal_type": "joint_venture",
        "description": "Airbus Helicopters and Quantum Systems agree at ILA Berlin 2026 to integrate counter-drone interceptors on the H145M",
        "rationale": (
            "Airbus Helicopters and German drone-maker Quantum Systems sign a cooperation "
            "agreement on 10 June 2026 at ILA Berlin 2026 to explore integrating Quantum's "
            "counter-unmanned-aerial-system (C-UAS) interceptors onto Airbus military "
            "helicopters, starting with the multi-role H145M. The partnership adds an organic "
            "drone-hunting capability to rotorcraft amid lessons learned in Ukraine. Financial "
            "terms were not disclosed."
        ),
        "acquirer_country": "FR",
        "target_country": "DE",
        "acquirer_logo_domain": "airbus.com",
        "target_logo_domain": "quantum-systems.com",
        "source_url": "https://www.airbus.com/en/newsroom/press-releases/2026-06-airbus-and-quantum-systems-to-cooperate-on-integration-of-counter-uas-interceptors-on-military",
        "announced_date": datetime(2026, 6, 10, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": None,
        "is_disclosed": False,
        "sector": "uas_drones",
        "notes": "Cooperation agreement (C-UAS interceptors on H145M).",
        "confidence": "high",
    },
    {
        "acquirer": "Airbus Defence and Space",
        "target": "Alta Ares",
        "deal_value": 0,
        "status": "announced",
        "deal_type": "joint_venture",
        "description": "Airbus Defence and Space and Alta Ares sign an MoU at ILA Berlin 2026 to co-develop European counter-drone interceptors",
        "rationale": (
            "Airbus Defence and Space and Alta Ares — a French defence-technology start-up "
            "specialising in counter-drone systems and on-board artificial intelligence — sign "
            "a memorandum of understanding on 11 June 2026 at ILA Berlin 2026 to jointly develop "
            "and integrate European counter-UAS solutions. The cooperation continues development "
            "of the Black Bird medium-range (30 km) interceptor and the X-Lock short-range "
            "(15 km) system. Financial terms were not disclosed."
        ),
        "acquirer_country": "DE",
        "target_country": "FR",
        "acquirer_logo_domain": "airbus.com",
        "target_logo_domain": "altaares.com",
        "source_url": "https://www.airbus.com/en/newsroom/press-releases/2026-06-airbus-and-alta-ares-sign-partnership-to-develop-europes-air-defence-solutions",
        "announced_date": datetime(2026, 6, 11, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": None,
        "is_disclosed": False,
        "sector": "uas_drones",
        "notes": "MoU (Black Bird + X-Lock counter-drone interceptors).",
        "confidence": "high",
    },
    {
        "acquirer": "Rafael",
        "target": "Reflex Aerospace",
        "deal_value": 0,
        "status": "announced",
        "deal_type": "joint_venture",
        "description": "Rafael and Reflex Aerospace announce a strategic co-development partnership at ILA Berlin 2026 for a VHR²C satellite constellation",
        "rationale": (
            "Israel's Rafael Advanced Defense Systems and German satellite manufacturer Reflex "
            "Aerospace announce a strategic co-development partnership on 11 June 2026 at ILA "
            "Berlin 2026, introducing a new class of Very High Resolution & Very High Revisit "
            "Constellation (VHR²C). The two companies co-fund and co-develop the system, pairing "
            "Rafael's in-orbit-proven up-to-30 cm electro-optical payload with Reflex's agile "
            "satellite platforms; a first satellite is targeted for launch as early as Q4 2027. "
            "Financial terms were not disclosed."
        ),
        "acquirer_country": "IL",
        "target_country": "DE",
        "acquirer_logo_domain": "rafael.co.il",
        "target_logo_domain": "reflexaerospace.com",
        "source_url": "https://www.reflexaerospace.com/press-releases/rafael-and-reflex-aerospace-announce-strategic-partnership",
        "announced_date": datetime(2026, 6, 11, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": None,
        "is_disclosed": False,
        "sector": "space",
        "featured": True,
        "notes": "Co-funded / co-developed VHR²C satellite constellation.",
        "confidence": "high",
    },
    {
        "acquirer": "Rheinmetall",
        "target": "ERC System",
        "deal_value": 0,
        "status": "announced",
        "deal_type": "joint_venture",
        "description": "Rheinmetall and ERC System sign an MoU at ILA Berlin 2026 to produce the Victor U250 heavy-lift cargo drone in Germany",
        "rationale": (
            "Germany's Rheinmetall and drone start-up ERC System sign a memorandum of "
            "understanding on 10 June 2026 at ILA Berlin 2026 to establish series production of "
            "the Victor U250 heavy-lift cargo drone in North Rhine-Westphalia. Rheinmetall "
            "contributes aviation-certification and unmanned-systems expertise while ERC System "
            "continues developing the hybrid-electric VTOL platform, which carries up to 250 kg "
            "over 300 km. The initiative is expected to create hundreds of jobs by 2029. "
            "Financial terms were not disclosed."
        ),
        "acquirer_country": "DE",
        "target_country": "DE",
        "acquirer_logo_domain": "rheinmetall.com",
        "target_logo_domain": "erc-system.com",
        "source_url": "https://www.rheinmetall.com/en/media/news-watch/news/2026/06/2026-06-10-rheinmetall-erc-system-and-nrw-sign-mou-for-heavy-lift-drones",
        "announced_date": datetime(2026, 6, 10, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": None,
        "is_disclosed": False,
        "sector": "uas_drones",
        "notes": "MoU with ERC System (Victor U250 production in NRW); state of NRW also signed.",
        "confidence": "medium",
    },
]

# ==============================================================================
# DEFENSE-TECH FUNDING & DEALS BRIEF — late July 2026
# ==============================================================================
# Hand-curated from a defense-tech funding roundup (US/UK/Japan defense-tech
# venture + M&A activity, ~28 July 2026). Covers a SPAC going-public, two
# acquisitions, and five venture funding rounds.
#
# These are seeded via POST /api/ma-activities/seed-defensetech (idempotent
# upsert, matched by (acquirer_norm, target_norm) — same pattern as the
# Eurosatory / ILA Berlin lists). confidence="medium" because the source is a
# newsletter roundup rather than a primary press release.
MA_DEFENSETECH_2026 = [
    # ── Going public ─────────────────────────────────────────────────────────
    {
        "acquirer": "McKinley Acquisition Corp",
        "target": "Space-Eyes",
        "deal_value": 638,
        "status": "announced",
        "deal_type": "merger",
        "deal_class": "ma",
        "value_basis": "enterprise",
        "description": "Space-Eyes to go public in a $638M SPAC merger with McKinley Acquisition Corp",
        "rationale": (
            "Space-Eyes, a defense-technology R&D company backed by Eric Trump, agrees to go "
            "public through a $638M SPAC merger with McKinley Acquisition Corp. The listing gives "
            "the firm a public-market currency and fresh capital as investor appetite for "
            "defense-tech ventures accelerates."
        ),
        "acquirer_country": "US",
        "target_country": "US",
        "acquirer_logo_domain": None,
        "target_logo_domain": None,
        "is_disclosed": True,
        "sector": "space",
        "featured": True,
        "announced_date": datetime(2026, 7, 28, tzinfo=timezone.utc),
        "confidence": "medium",
        "verification_status": "auto",
        "extraction_method": "manual",
        "notes": "Going public via SPAC — defense-tech R&D firm backed by Eric Trump.",
    },
    # ── Acquisitions ─────────────────────────────────────────────────────────
    {
        "acquirer": "Thales",
        "target": "Exail Technologies",
        "deal_value": 4500,
        "status": "pending",
        "deal_type": "acquisition",
        "deal_class": "ma",
        "value_basis": "enterprise",
        "currency": "USD",
        "description": "Thales to acquire French underwater-drone and naval-autonomy group Exail Technologies (€3.9B enterprise value)",
        "rationale": (
            "Thales agrees to acquire Exail Technologies, the French leader in naval autonomy — "
            "underwater drones (AUVs/UUVs) for mine-hunting, unmanned surface vessels and "
            "high-precision inertial navigation. The deal values Exail at an enterprise value of "
            "€3.9 billion (about $4.5 billion), a 44% premium to its 25 June 2026 close. Thales "
            "first buys the founding Gorgé family's 35.5% stake at €134 per share, then launches "
            "a mandatory tender offer for the remaining shares, with completion expected by early "
            "2028. Exail generated €479M of 2025 revenue with a €1.1B order book; the acquisition "
            "scales Thales in underwater warfare, seabed security and inertial navigation and "
            "reinforces France's sovereign unmanned mine-warfare chain."
        ),
        "acquirer_country": "FR",
        "target_country": "FR",
        "acquirer_logo_domain": "thalesgroup.com",
        "target_logo_domain": "exail.com",
        "is_disclosed": True,
        "sector": "naval",
        "featured": True,
        "stake_percentage": 35.5,
        "announced_date": datetime(2026, 7, 6, tzinfo=timezone.utc),
        "source_url": "https://www.defensenews.com/global/europe/2026/07/06/thales-to-buy-french-underwater-drone-maker-exail-in-45-billion-deal/",
        "sources": [
            {"url": "https://www.defensenews.com/global/europe/2026/07/06/thales-to-buy-french-underwater-drone-maker-exail-in-45-billion-deal/", "publisher": "Defense News", "published_at": "2026-07-06"},
            {"url": "https://www.navaltoday.com/2026/07/06/thales-signs-agreement-to-buy-stake-in-exail/", "publisher": "Naval Today", "published_at": "2026-07-06"},
        ],
        "regulatory_status": "pending_eu_comp",
        "regulatory_body": "EU DG COMP",
        "regulatory_notes": "Subject to antitrust/regulatory clearances; mandatory tender offer to follow the initial 35.5% stake transfer.",
        "confidence": "high",
        "verification_status": "human_verified",
        "extraction_method": "manual",
        "notes": "€3.9B enterprise value (~$4.5B). €134/share, 44% premium. Tender-offer agreement signed end of July 2026; completion expected by early 2028.",
    },
    {
        "acquirer": "Leonardo DRS",
        "target": "Raft",
        "deal_value": 450,
        "status": "announced",
        "deal_type": "acquisition",
        "deal_class": "ma",
        "value_basis": "equity",
        "description": "Leonardo DRS acquires defense-software maker Raft in a $450M all-cash deal",
        "rationale": (
            "Leonardo DRS acquires Raft, a Virginia-based maker of AI, data-fusion and mission "
            "software for defense, in an all-cash deal valued at $450M — extending Leonardo's "
            "push into American defense software. Raft separately won a $99M IDIQ contract from "
            "the US Army for its data-integration software platform."
        ),
        "acquirer_country": "US",
        "target_country": "US",
        "acquirer_logo_domain": "leonardodrs.com",
        "target_logo_domain": "teamraft.com",
        "is_disclosed": True,
        "sector": "services_it",
        "featured": True,
        "announced_date": datetime(2026, 7, 28, tzinfo=timezone.utc),
        "confidence": "medium",
        "verification_status": "auto",
        "extraction_method": "manual",
        "notes": "All-cash. Raft also won a $99M US Army IDIQ for its data-integration platform.",
    },
    {
        "acquirer": "CHAOS Industries",
        "target": "Atropos Group",
        "deal_value": 0,
        "status": "announced",
        "deal_type": "acquisition",
        "deal_class": "ma",
        "value_basis": "undisclosed",
        "description": "CHAOS Industries acquires autonomous-aircraft maker Atropos Group for an undisclosed sum",
        "rationale": (
            "CHAOS Industries acquires Atropos Group, a maker of autonomous airborne platforms, "
            "for an undisclosed sum — a deal six months in the making that extends CHAOS's line "
            "from radars and interceptors into autonomous aircraft."
        ),
        "acquirer_country": "US",
        "target_country": "US",
        "acquirer_logo_domain": "chaosinc.com",
        "target_logo_domain": None,
        "is_disclosed": False,
        "sector": "uas_drones",
        "announced_date": datetime(2026, 7, 28, tzinfo=timezone.utc),
        "confidence": "medium",
        "verification_status": "auto",
        "extraction_method": "manual",
    },
    # ── Fundraises ───────────────────────────────────────────────────────────
    {
        "acquirer": "Kleiner Perkins + ICONIQ",
        "target": "K2 Space",
        "deal_value": 500,
        "status": "completed",
        "deal_type": "funding_round",
        "deal_class": "vc",
        "value_basis": "round_amount",
        "valuation": 6800,
        "round_type": "series_d",
        "description": "K2 Space raises a $500M Series D at a $6.8B valuation",
        "rationale": (
            "K2 Space, which builds large, high-power satellites for commercial and "
            "national-security payloads, raises a $500M Series D co-led by Kleiner Perkins and "
            "ICONIQ at a $6.8B valuation."
        ),
        "acquirer_country": "US",
        "target_country": "US",
        "acquirer_logo_domain": "kleinerperkins.com",
        "target_logo_domain": "k2space.com",
        "is_disclosed": True,
        "sector": "space",
        "featured": True,
        "lead_investors": ["Kleiner Perkins", "ICONIQ"],
        "announced_date": datetime(2026, 7, 28, tzinfo=timezone.utc),
        "confidence": "medium",
        "verification_status": "auto",
        "extraction_method": "manual",
    },
    {
        "acquirer": "Andreessen Horowitz + Sequoia Capital",
        "target": "Cathedral",
        "deal_value": 160,
        "status": "completed",
        "deal_type": "funding_round",
        "deal_class": "vc",
        "value_basis": "round_amount",
        "valuation": 1400,
        "description": "Cathedral raises $160M at a $1.4B post-money valuation",
        "rationale": (
            "Cathedral, a New York startup founded by former DOGE staffers to expand US military "
            "cyber operations with AI, raises a $160M round co-led by Andreessen Horowitz and "
            "Sequoia Capital at a $1.4B post-money valuation."
        ),
        "acquirer_country": "US",
        "target_country": "US",
        "acquirer_logo_domain": "a16z.com",
        "target_logo_domain": None,
        "is_disclosed": True,
        "sector": "cyber",
        "featured": True,
        "lead_investors": ["Andreessen Horowitz", "Sequoia Capital"],
        "announced_date": datetime(2026, 7, 28, tzinfo=timezone.utc),
        "confidence": "medium",
        "verification_status": "auto",
        "extraction_method": "manual",
    },
    {
        "acquirer": "Khosla Ventures",
        "target": "Twenty",
        "deal_value": 30,
        "status": "completed",
        "deal_type": "funding_round",
        "deal_class": "vc",
        "value_basis": "round_amount",
        "valuation": 1200,
        "description": "Twenty raises an additional $30M from Khosla Ventures at a $1.2B valuation",
        "rationale": (
            "Twenty, whose AI automates offensive cyber operations for the Pentagon, raises an "
            "additional $30M from Khosla Ventures at a $1.2B valuation — a month after closing "
            "its $100M Series B."
        ),
        "acquirer_country": "US",
        "target_country": "US",
        "acquirer_logo_domain": "khoslaventures.com",
        "target_logo_domain": None,
        "is_disclosed": True,
        "sector": "cyber",
        "lead_investors": ["Khosla Ventures"],
        "announced_date": datetime(2026, 7, 28, tzinfo=timezone.utc),
        "confidence": "medium",
        "verification_status": "auto",
        "extraction_method": "manual",
        "notes": "Top-up a month after a $100M Series B.",
    },
    {
        "acquirer": "XYZ Venture Capital + Lux Capital",
        "target": "Agon",
        "deal_value": 23,
        "status": "completed",
        "deal_type": "funding_round",
        "deal_class": "vc",
        "value_basis": "round_amount",
        "round_type": "seed",
        "description": "Agon raises a $23M seed for secure defense-AI training-data infrastructure",
        "rationale": (
            "Agon, a London startup building secure training-data infrastructure for defense AI, "
            "raises a $23M seed round led by XYZ Venture Capital, Lux Capital and Sisyphus."
        ),
        "acquirer_country": "US",
        "target_country": "GB",
        "acquirer_logo_domain": "luxcapital.com",
        "target_logo_domain": None,
        "is_disclosed": True,
        "sector": "services_it",
        "lead_investors": ["XYZ Venture Capital", "Lux Capital", "Sisyphus"],
        "announced_date": datetime(2026, 7, 28, tzinfo=timezone.utc),
        "confidence": "medium",
        "verification_status": "auto",
        "extraction_method": "manual",
    },
    {
        "acquirer": "Mitsubishi Electric",
        "target": "Array Labs",
        "deal_value": 21,
        "status": "completed",
        "deal_type": "funding_round",
        "deal_class": "vc",
        "value_basis": "round_amount",
        "description": "Array Labs raises a $21M round anchored by Mitsubishi Electric",
        "rationale": (
            "Array Labs, which is building radar-satellite fleets that map the Earth and track "
            "aircraft and ships, raises a $21M round anchored by a strategic investment from "
            "Mitsubishi Electric."
        ),
        "acquirer_country": "JP",
        "target_country": "US",
        "acquirer_logo_domain": "mitsubishielectric.com",
        "target_logo_domain": None,
        "is_disclosed": True,
        "sector": "space",
        "lead_investors": ["Mitsubishi Electric"],
        "announced_date": datetime(2026, 7, 28, tzinfo=timezone.utc),
        "confidence": "medium",
        "verification_status": "auto",
        "extraction_method": "manual",
    },
]

DEFENSE_COMPANIES.extend(RESEARCHED_COMPANIES)
MA_DATA.extend(RESEARCHED_DEALS)
