// Maps company names to their logo domains.
// Used by MarketData, CompanyProfileSheet, and Dashboard to render logos.
export const COMPANY_LOGOS = {
  // USA — Major Primes
  "Lockheed Martin": "lockheedmartin.com",
  "Raytheon Technologies": "rtx.com",
  "Boeing Defense": "boeing.com",
  "Northrop Grumman": "northropgrumman.com",
  "General Dynamics": "gd.com",
  "L3Harris Technologies": "l3harris.com",
  "Huntington Ingalls": "huntingtoningalls.com",
  "Leidos Holdings": "leidos.com",
  "SAIC": "saic.com",
  "Booz Allen Hamilton": "boozallen.com",
  // USA — Mid-Tier
  "General Atomics": "ga.com",
  "Textron": "textron.com",
  "Huntington Ingalls": "hii.com",
  "Axon Enterprise": "axon.com",
  "Kratos Defense": "kratosdefense.com",
  "Mercury Systems": "mrcy.com",
  "AeroVironment": "avinc.com",
  "Maxar Technologies": "maxar.com",
  "Curtiss-Wright": "curtisswright.com",
  "TransDigm": "transdigm.com",
  "Hexcel": "hexcel.com",
  "Spirit AeroSystems": "spiritaero.com",
  "Triumph Group": "triumphgroup.com",
  "Parsons Corporation": "parsons.com",
  "BWX Technologies": "bwxt.com",
  "CACI International": "caci.com",
  "ManTech International": "mantech.com",
  "Palantir Technologies": "palantir.com",
  "Rocket Lab": "rocketlabusa.com",
  "Collins Aerospace": "collinsaerospace.com",
  "Pratt & Whitney": "prattwhitney.com",
  "General Electric Aviation": "ge.com",
  "Honeywell Aerospace": "honeywell.com",
  "Ball Aerospace": "ball.com",
  "HEICO Corporation": "heico.com",
  "Kaman Aerospace": "kaman.com",
  "Astronics Corporation": "astronics.com",
  "Sierra Nevada Corporation": "sncorp.com",
  "Anduril Industries": "anduril.com",
  "Shield AI": "shield.ai",
  "Peraton": "peraton.com",
  "V2X Inc": "v2x.com",
  "Axon Enterprise": "axon.com",
  "OSI Systems": "osi-systems.com",
  "Redwire Corporation": "redwirespace.com",
  "DRS Technologies": "leonardodrs.com",
  "MDA Space": "mda.space",
  "AAR Corp": "aarcorp.com",
  "Ducommun": "ducommun.com",
  "Moog Inc": "mooginc.com",
  "API Technologies": "apitech.com",
  "General Dynamics Mission Systems Canada": "gd.com",
  "Harris Corporation": "l3harris.com",
  "Orbital ATK": "northropgrumman.com",
  // UK
  "BAE Systems": "baesystems.com",
  "Rolls-Royce Holdings": "rolls-royce.com",
  "Babcock International": "babcock.co.uk",
  "QinetiQ": "qinetiq.com",
  "Chemring Group": "chemring.co.uk",
  "Ultra Electronics": "ultra.group",
  "Meggitt": "meggitt.com",
  "Cohort": "cohortplc.com",
  // France
  "Thales": "thalesgroup.com",
  "Thales Nederland": "thalesgroup.com",
  "Airbus Defence & Space": "airbus.com",
  "Airbus Defence Spain": "airbus.com",
  "Leonardo": "leonardo.com",
  "Safran": "safran-group.com",
  "Dassault Aviation": "dassault-aviation.com",
  "MBDA": "mbda-systems.com",
  "Naval Group": "naval-group.com",
  "Nexter Systems": "knds.com",
  "KNDS": "knds.com",
  "KNDS France": "knds.com",
  "Arquus": "arquus-defense.com",
  // Joint programs / subsidiaries
  "Sikorsky": "lockheedmartin.com",
  "Oshkosh Defense": "oshkoshdefense.com",
  "ARTEC": "artec-vehicle.com",
  "Norinco": "norinco.com",
  "Ghost Robotics": "ghostrobotics.io",
  "Quantum Systems": "quantum-systems.com",
  "Harmattan AI": "harmattan.ai",
  "CS Group": "cs-group.com",
  "Sofradir": "lynred.com",
  // Germany
  "Rheinmetall": "rheinmetall.com",
  "Diehl Defence": "diehl.com",
  "Hensoldt": "hensoldt.net",
  "MTU Aero Engines": "mtu.de",
  "Renk Group": "renk.eu",
  "ThyssenKrupp Marine": "thyssenkrupp-marine-systems.com",
  "Helsing": "helsing.ai",
  // Italy
  "Fincantieri": "fincantieri.com",
  "Elettronica": "elt.it",
  "Avio": "avio.com",
  // Scandinavia
  "Saab AB": "saab.com",
  "Saab Kockums": "saabkockums.se",
  "Nammo": "nammo.com",
  "Nammo Lapua": "nammo.com",
  "Kongsberg Defence": "kongsberg.com",
  "Patria": "patria.fi",
  // Iberian Peninsula
  "Indra Sistemas": "indracompany.com",
  "Navantia": "navantia.es",
  // Benelux
  "Damen Shipyards": "damen.com",
  "Damen Naval": "damen.com",
  "CMI Defence": "cmigroupe.com",
  "FN Herstal": "fnherstal.com",
  // Switzerland
  "Pilatus Aircraft": "pilatus-aircraft.com",
  "RUAG": "ruag.com",
  // Eastern Europe
  "Polska Grupa Zbrojeniowa": "pgzsa.pl",
  "WB Electronics": "wbelectronics.pl",
  "Czechoslovak Group": "czechoslovakgroup.cz",
  "Aero Vodochody": "aero.cz",
  "Havelsan": "havelsan.com.tr",
  // Israel
  "Elbit Systems": "elbitsystems.com",
  "Israel Aerospace Industries": "iai.co.il",
  "Rafael Advanced Defense": "rafael.co.il",
  // Japan
  "Mitsubishi Heavy Industries": "mhi.com",
  "Kawasaki Heavy Industries": "khi.co.jp",
  "IHI Corporation": "ihi.co.jp",
  "NEC Corporation": "nec.com",
  "Fujitsu Defense": "fujitsu.com",
  "Japan Steel Works": "jsw.co.jp",
  // South Korea
  "Hanwha Aerospace": "hanwhaaerospace.com",
  "Hanwha Defense": "hanwhadefense.com",
  "Hanwha Ocean": "hanwhaocean.com",
  "Korea Aerospace Industries": "koreaaero.com",
  "Hyundai Rotem": "hyundai-rotem.com",
  "LIG Nex1": "lignex1.com",
  // Singapore
  "ST Engineering": "stengg.com",
  "Singapore Technologies Aerospace": "stengg.com",
  // India
  "Bharat Electronics": "bel-india.in",
  "Hindustan Aeronautics": "hal-india.co.in",
  "Bharat Dynamics": "bdl-india.in",
  "Mazagon Dock": "mazagondock.in",
  "Cochin Shipyard": "cochinshipyard.in",
  "BEML": "bemlindia.in",
  // Australia
  "CEA Technologies": "ceatechnologies.com.au",
  "Electro Optic Systems": "eos-aus.com",
  "Austal": "austal.com",
  // Middle East & Africa
  "EDGE Group": "edgegroup.ae",
  "Emirates Defence Industries": "edi.ae",
  "SAMI": "sami.com.sa",
  "Paramount Group": "paramountgroup.biz",
  "Denel": "denel.co.za",
  // China
  "AVIC": "avic.com.cn",
  "NORINCO": "norinco.com",
  "CSSC": "cssc.net.cn",
  "CASIC": "casic.com.cn",
  "CETC": "cetc.com.cn",
  "CSGC": "csgc.com.cn",
  // Turkey
  "Turkish Aerospace Industries": "tai.com.tr",
  "Aselsan": "aselsan.com",
  "Roketsan": "roketsan.com.tr",
  "STM": "stm.com.tr",
  "Baykar": "baykartech.com",
  // Latin America
  "Taurus Armas": "taurusarmas.com.br",
  "Embraer Defense": "embraer.com",
  "Avibras": "avibras.com.br",
  // Canada
  "CAE Inc": "cae.com",
  // Russia
  "Sevmash": "sevmash.ru",
  "Rostec": "rostec.ru",
  "Almaz-Antey": "almaz-antey.ru",
  "United Aircraft Corporation": "uacrussia.ru",
  // New companies
  "Exail Technologies": "exail-technologies.com",
  "Teledyne Technologies": "teledyne.com",
  "SERCO Group": "serco.com",
  "Milrem Robotics": "milremrobotics.com",
  "Terma A/S": "terma.com",
  "Dynamit Nobel Defence": "dynamit-nobel-defence.de",
  "Theon Sensors": "theonsensors.com",
  "PZL Mielec": "pzl.mielec.pl",
  // France — additional entries
  "Exail Technologies": "exail.com",
  "Eutelsat": "eutelsat.com",
  "Comand AI": "comand.ai",
  "CS Group": "cs-group.com",
  // Ukraine
  "Ukroboronprom": "ukroboronprom.com",
  "Antonov": "antonov.com",
  "UkrSpecSystems": "ukrspecsystems.com",
  "Skyeton": "skyeton.com",
  "Kvertus": "kvertus.com",
  "LUCH Design Bureau": "luch.gov.ua",
  "Infozahyst": "infozahyst.com.ua",
  "Motor Sich": "motorsich.com",
  "Tencore": "tencore.com.ua",
  "Ukrainian Armor": "ukrainianarmor.com",
  // Defense Tech Startups
  "Harmattan AI": "harmattan.ai",
  "Harmattan.ai": "harmattan.ai",
  "Harmattan": "harmattan.ai",
  "Hermeus": "hermeus.com",
  "Saildrone": "saildrone.com",
  "Skydio": "skydio.com",
  "Epirus": "epirusinc.com",
  "True Anomaly": "trueanomaly.space",
  "Ursa Major Technologies": "ursamajor.com",
  "Ursa Major": "ursamajor.com",
  "Mach Industries": "machindustries.co",
  "Capella Space": "capellaspace.com",
  "Rebellion Defense": "rebelliondefense.com",
  "HawkEye 360": "he360.com",
  "Vannevar Labs": "vannevarlabs.com",
  "Dedrone": "dedrone.com",
  "Fortem Technologies": "fortemtech.com",
  "Overland AI": "overlandai.com",
  "Castelion": "castelion.com",
  "Applied Intuition": "appliedintuition.com",
  "Divergent Technologies": "divergent3d.com",
  "Sierra Space": "sierraspace.com",
  "Firestorm Labs": "firestormlabs.co",
  "DroneShield": "droneshield.com",
  "Iris Automation": "irisautomation.ai",
  "Preligens": "preligens.com",
  "Sarcos Technology": "sarcos.com",
  "Palantir Technologies": "palantir.com",
  "Joby Aviation": "jobyaviation.com",
  "Reliable Robotics": "reliable.co",
  "Wisk Aero": "wisk.aero",
  "Archer Aviation": "archer.com",
  "Beta Technologies": "beta.team",
  "Boom Supersonic": "boomsupersonic.com",
  "Relativity Space": "relativityspace.com",
  "ABL Space Systems": "ablspacesystems.com",
  "Voyager Space": "voyagerspace.com",
  // France — Defense startups
  "CAILabs": "cailabs.com",
  "ECA Group": "ecagroup.com",
  "Lacroix Defense": "lacroix-defense.com",
  "Parrot Defense": "parrot.com",
  "Delair": "delair.aero",
  "Cerbair": "cerbair.com",
  "Unseenlabs": "unseenlabs.space",
  "Novadem": "novadem.com",
  "Texelis": "texelis.com",
  "Lynred": "lynred.com",
  "Turgis & Gaillard": "turgis-gaillard.com",
  "Shark Robotics": "shark-robotics.com",
  // USA — New defense tech companies
  "Saronic Technologies": "saronic.com",
  "Allen Control Systems": "allencontrolsystems.com",
  "Darkhive": "darkhive.ai",
  "HavocAI": "havocai.com",
  "Neros Technologies": "neros.tech",
  "Firehawk Aerospace": "firehawkaerospace.com",
  "AndrenaM": "andrenam.com",
  "Rampart Communications": "rampartcommunications.com",
  "OmniTeq": "omniteq.com",
  "AIKIDO Technologies": "aikidotechnologies.com",
  "Parry Labs": "parrylabs.com",
  "DEFCON AI": "defconai.com",
  "Duality AI": "duality.ai",
  "Exlabs": "exlabs.com",
  "Albedo Space": "albedo.space",
  "Turion Space": "turionspace.com",
  "Castelion": "castelion.com",
  "Chaos Industries": "chaosinc.com",
  "Picogrid": "picogrid.com",
  "Xona Space Systems": "xonaspace.com",
  // Finland / Northern Europe
  "ICEYE": "iceye.com",
  "SensusQ": "sensusq.com",
  // Germany — new
  "Alpine Eagle": "alpineeagle.com",
  "ARX Robotics": "arx-robotics.com",
  "Stark Defence": "stark-defence.com",
  // Baltics
  "Origin Robotics": "originrobotics.ai",
  "Farsight Vision": "farsightvision.com",
  "Defendec": "defendec.com",
  "Frankenburg Technologies": "frankenburgtech.com",
  // Southern Europe
  "Tekever": "tekever.com",
  "Sateliot": "sateliot.space",
  // UK — new
  "Open Cosmos": "open-cosmos.com",
  // Israel — new
  "D-Fend Solutions": "d-fendsolutions.com",
  "Xtend": "xtend.me",
  "SpearUAV": "spearuav.com",
  "Orca AI": "orca.ai",
  // India — new
  "NewSpace Research and Technologies": "newspace.co.in",
  "Raphe mPhibr": "raphemphibr.com",
  "Tonbo Imaging": "tonboimaging.com",
  // Canada
  "Kraken Robotics": "krakenrobotics.com",
  // UAE — new
  "Aerodrome Group": "aerodromegroup.com",
  "Calidus": "calidus.ae",
  // South Korea — new
  "Nearthlab": "nearthlab.com",
  "Hancom InSpace": "hancom-inspace.com",
  // Singapore
  "ShieldWorks AI": "shieldworks.ai",
  // Australia — new
  "Athena AI": "athena-ai.com",
  "High Earth Orbit Robotics": "heorobotics.com",
  "SYPAQ Systems": "sypaq.com.au",
  "Advanced Navigation": "advancednavigation.com",
};

// Direct Wikipedia Commons logo URLs — confirmed filenames, never blocked by ad-blockers.
// Special:FilePath redirects to the actual CDN URL transparently in <img> tags.
const WP = "https://commons.wikimedia.org/wiki/Special:FilePath/";
export const COMPANY_WIKI_LOGOS = {
  // USA
  "Lockheed Martin":               WP + "Lockheed_Martin_logo.svg",
  "Raytheon Technologies":         WP + "Raytheon_(RTX)_logo.svg",
  "Boeing Defense":                WP + "Boeing_full_logo.svg",
  "Northrop Grumman":              WP + "Northrop_Grumman_logo_blue-on-clear_2020.svg",
  "General Dynamics":              WP + "General_Dynamics_logo.svg",
  "L3Harris Technologies":         WP + "L3Harris_Technologies_logo.svg",
  "Leidos Holdings":               WP + "Leidos_logo_2013.svg",
  "Booz Allen Hamilton":           WP + "Booz_Allen_Hamilton_logo.svg",
  "Textron":                       WP + "Textron_logo.svg",
  "Palantir Technologies":         WP + "Palantir_Technologies_logo.svg",
  "Honeywell Aerospace":           WP + "Honeywell_logo.svg",
  "General Electric Aviation":     WP + "General_Electric_logo.svg",
  "TransDigm":                     WP + "TransDigm_Group_logo.svg",
  "Rocket Lab":                    WP + "Rocket_Lab_logo.svg",
  // UK
  "BAE Systems":                   WP + "BAE_Systems_logo.svg",
  "Rolls-Royce Holdings":          WP + "Rolls_royce_holdings_logo.svg",
  "Babcock International":         WP + "Babcock_new_logo.svg",
  "QinetiQ":                       WP + "QinetiQ-Logo.svg",
  // France
  "Airbus Defence & Space":        WP + "Airbus_Logo_2017.svg",
  "Airbus Defence Spain":          WP + "Airbus_Logo_2017.svg",
  "Airbus":                        WP + "Airbus_Logo_2017.svg",
  "Airbus Helicopters":            WP + "Airbus_Logo_2017.svg",
  "Indra":                         WP + "Indra_Sistemas_logo.svg",
  "Thales":                        WP + "Thales_Logo.svg",
  "Thales Nederland":              WP + "Thales_Logo.svg",
  "Safran":                        WP + "Logo_Safran.svg",
  "Dassault Aviation":             WP + "Dassault_Aviation_Logo.jpg",
  "MBDA":                          WP + "MBDA-Logo.svg",
  "Naval Group":                   WP + "Naval_Group_logo.svg",
  // France/Germany — KNDS group (merged from Nexter + KMW in 2015)
  "KNDS":                          WP + "KNDS_logo.svg",
  "KNDS France":                   WP + "KNDS_logo.svg",
  "KNDS Deutschland":              WP + "KNDS_logo.svg",
  // Germany
  "Rheinmetall":                   WP + "Rheinmetall_Logo_2021.svg",
  "Diehl Defence":                 WP + "Diehl_Defence_Logo.svg",
  "Hensoldt":                      WP + "Hensoldt_Logo_2020.svg",
  "ThyssenKrupp Marine":           WP + "Thyssenkrupp_Logo.svg",
  // Italy
  "Leonardo":                      WP + "Logo_Leonardo.svg",
  "Fincantieri":                   WP + "Fincantieri_logo.svg",
  // Sweden / Norway
  "Saab AB":                       WP + "Saab_wordmark_blue.svg",
  "Saab Kockums":                  WP + "Saab_wordmark_blue.svg",
  "Kongsberg Defence":             WP + "Kongsberg_logo.svg",
  // Spain
  "Indra Sistemas":                WP + "Indra_Sistemas_logo.svg",
  "Navantia":                      WP + "Navantia.svg",
  // Benelux
  "FN Herstal":                    WP + "FN-Herstal-logo.svg",
  // Switzerland
  "Pilatus Aircraft":              WP + "Pilatus_Aircraft_logo.svg",
  // Israel
  "Elbit Systems":                 WP + "Elbit_Systems_logo.svg",
  "Israel Aerospace Industries":   WP + "IAI_Corporation_Logo.svg",
  "Rafael Advanced Defense":       WP + "RAFAEL_logo.png",
  // Japan
  "Mitsubishi Heavy Industries":   WP + "Mhi_logo_en.svg",
  "Mitsubishi/Kawasaki":           WP + "Mhi_logo_en.svg",
  "Kawasaki Heavy Industries":     WP + "Kawasaki_Heavy_Industries_Logo.svg",
  // South Korea
  "Korea Aerospace Industries":    WP + "Korea_Aerospace_Industries_logo.svg",
  "Hanwha Aerospace":              WP + "Hanwha_Aerospace_logo.svg",
  "Hanwha Defense":                WP + "Hanwha_logo.svg",
  "Hanwha Ocean":                  WP + "Hanwha_logo.svg",
  // Russia
  "Rostec":                        WP + "Rostec_logo.svg",
  "United Shipbuilding Corporation": WP + "United_Shipbuilding_Corporation_logo.svg",
  // Singapore
  "ST Engineering":                WP + "Singapore_Technologies_Engineering_logo.svg",
  // Turkey
  "Turkish Aerospace Industries":  WP + "Turkish_Aerospace_Industries_logo.svg",
  "Aselsan":                       WP + "ASELSAN_logo.svg",
  // Australia
  "Austal":                        WP + "Austal_logo.svg",
  // Canada
  "CAE Inc":                       WP + "CAE_inc._logo_2022.svg",
  // Latin America
  "Embraer Defense":               WP + "Embraer_logo.svg",
  // USA — mid-tier
  "Huntington Ingalls":            WP + "Huntington_Ingalls_Industries_logo.svg",
  "Axon Enterprise":               WP + "Axon_Enterprise_logo.svg",
  "Triumph Group":                 WP + "Triumph_Group_logo.svg",
  "ManTech International":         WP + "ManTech_International_logo.svg",
  "Hexcel":                        WP + "Hexcel_logo.svg",
  "V2X Inc":                       WP + "V2X_Inc_logo.svg",
  "Redwire Corporation":           WP + "Redwire_Space_logo.svg",
  "HEICO Corporation":             WP + "HEICO_logo.png",
  "Parsons Corporation":           WP + "Parsons_Corporation_logo.svg",
  "SAIC":                          WP + "SAIC_logo.svg",
  "Leidos Holdings":               WP + "Leidos_logo_2013.svg",
  "Mercury Systems":               WP + "Mercury_Systems_logo.svg",
  "AeroVironment":                 WP + "AeroVironment_logo.svg",
  "Curtiss-Wright":                WP + "Curtiss-Wright_logo.svg",
  "Moog Inc":                      WP + "Moog_Inc_logo.svg",
  "CACI International":            WP + "CACI_logo.svg",
  "Peraton":                       WP + "Peraton_logo.svg",
  "Collins Aerospace":             WP + "Collins_Aerospace_logo.svg",
  "Pratt & Whitney":               WP + "Pratt_%26_Whitney_logo.svg",
  "General Electric Aviation":     WP + "General_Electric_logo.svg",
  "Kaman Aerospace":               WP + "Kaman_Corporation_logo.svg",
  "Maxar Technologies":            WP + "Maxar_Technologies_logo.svg",
  "Sierra Nevada Corporation":     WP + "Sierra_Nevada_Corporation_logo.svg",
  "Shield AI":                     WP + "Shield_AI_logo.svg",
  "General Atomics":               WP + "General_Atomics_logo.svg",
  "Spirit AeroSystems":            WP + "Spirit_AeroSystems_logo.svg",
  "BWX Technologies":              WP + "BWX_Technologies_logo.svg",
  "TransDigm":                     WP + "TransDigm_Group_logo.svg",
  // Japan — additional
  "IHI Corporation":               WP + "IHI_Corporation_logo.svg",
  "NEC Corporation":               WP + "NEC_logo.svg",
  "Fujitsu Defense":               WP + "Fujitsu_logo.svg",
  // South Korea — additional
  "Hyundai Rotem":                 WP + "Hyundai_Rotem_Logo.svg",
  // India — additional
  "Cochin Shipyard":               WP + "Cochin_Shipyard_logo.svg",
  // Scandinavia
  "Nammo":                         WP + "Nammo_logo.svg",
  "Patria":                        WP + "Patria_logo.svg",
  // Germany — additional
  "MTU Aero Engines":              WP + "MTU_Aero_Engines_Logo.svg",
  "Renk Group":                    WP + "RENK_AG_logo.svg",
  "ThyssenKrupp Marine":           WP + "Thyssenkrupp_AG_logo.svg",
  // Middle East
  "SAMI":                          WP + "SAMI_logo.svg",
  "Paramount Group":               WP + "Paramount_Group_logo.svg",
  // Ukraine
  "Ukroboronprom":                 WP + "Ukroboronprom_logo.svg",
  "Antonov":                       WP + "Antonov_logo.svg",
  "Motor Sich":                    WP + "Motor_Sich_logo.svg",
  "LUCH Design Bureau":            WP + "Luch_Design_Bureau_logo.png",
  "UkrSpecSystems":                WP + "UkrSpecSystems_logo.png",
  // Russia — additional
  "Rostec":                        WP + "Rostec_logo.svg",
  "Almaz-Antey":                   WP + "Almaz-Antey_Logo.svg",
  "Uralvagonzavod":                WP + "Uralvagonzavod_logo.svg",
  "RSK MiG":                       WP + "Mikoyan_logo.svg",
  "Tupolev":                       WP + "Tupolev_logo.svg",
  "Sevmash":                       WP + "Sevmash_logo.svg",
  "Tactical Missiles Corporation": WP + "Tactical_Missiles_Corporation_logo.svg",
  // USA — additional manufacturers
  "Sikorsky":                      WP + "Sikorsky_Aircraft_Corporation_logo.svg",
  "Oshkosh Defense":               WP + "Oshkosh_Corporation_logo.svg",
  "Ghost Robotics":                WP + "Ghost_Robotics_logo.svg",
  // Norinco (case variant used in Products)
  "Norinco":                       "https://iconape.com/wp-content/png_logo_vector/norinco-logo.png",
  // Italy
  "Elettronica":                   WP + "Elettronica_spa_logo.svg",
  "Avio":                          WP + "Avio_logo.svg",
  // UK — additional
  "Cohort":                        WP + "Cohort_plc_logo.svg",
  "Chemring Group":                WP + "Chemring_logo.svg",
  // Switzerland
  "RUAG":                          WP + "RUAG_logo.svg",
  // Poland
  "Polska Grupa Zbrojeniowa":      WP + "PGZ_logo.svg",
  // Benelux
  "Damen Shipyards":               WP + "Damen_Group_logo.svg",
  "CMI Defence":                   WP + "CMI_Defence_logo.svg",
  // UAE
  "Emirates Defence Industries":   WP + "Emirates_Defence_Industries_logo.svg",
  // Canada — additional
  "MDA Space":                     WP + "MDA_Ltd._logo.svg",
  // Australia — additional
  "Austal":                        WP + "Austal_logo.svg",
  // Latin America
  "Taurus Armas":                  WP + "Taurus_Armas_logo.svg",
  // USA — additional
  "Anduril Industries":            WP + "Anduril_Industries_Logo.svg",
  "Kratos Defense":                WP + "Kratos_Defense_%26_Security_Solutions_logo.svg",
  "Teledyne Technologies":         WP + "Teledyne_Technologies_logo.svg",
  "SERCO Group":                   WP + "Serco_logo.svg",
  // Turkey
  "Roketsan":                      WP + "Roketsan_logo.svg",
  "Baykar":                        WP + "Baykar_logo.png",
  "Havelsan":                      WP + "Havelsan_logo.svg",
  // South Korea
  "LIG Nex1":                      WP + "LIG_Nex1_logo.svg",
  "Hyundai Rotem":                 WP + "Hyundai_Rotem_Logo.svg",
  // Estonia
  "Milrem Robotics":               WP + "Milrem_Robotics_logo.svg",
  // Denmark
  "Terma A/S":                     WP + "Terma_logo.svg",
  // India — direct CDN URLs (Wikipedia filenames incorrect; Indian govt sites return globe favicon)
  "Hindustan Aeronautics":         "https://companieslogo.com/img/orig/HAL.NS_BIG-46cfe121.png",
  "Bharat Electronics":            "https://companieslogo.com/img/orig/BEL.NS_BIG-b2d0690e.png",
  "Bharat Dynamics":               "https://bdl-india.in/sites/default/files/bhar-d.png",
  "Mazagon Dock":                  "https://mazagondock.in/Assets/images/logo.svg",
  "BEML":                          "https://companieslogo.com/img/orig/BEML.NS_BIG-9e6d12c7.png",
  // China — direct CDN URLs (Clearbit blocks .cn; Wikipedia filenames unreliable)
  "AVIC":                          "https://cdn.worldvectorlogo.com/logos/aviation-industry-corporation-of-china-avic-.svg",
  "NORINCO":                       "https://iconape.com/wp-content/png_logo_vector/norinco-logo.png",
  "CSSC":                          "https://companieslogo.com/img/orig/600150.SS-2ef2328e.png",
  "CASIC":                         WP + "China_Aerospace_Science_and_Industry_Corporation_logo.svg",
  "CETC":                          WP + "China_Electronics_Technology_Group_Corporation_logo.svg",
  "CSGC":                          WP + "China_South_Industries_Group_Corporation_logo.svg",
  // Russia — direct URLs (Clearbit blocks .ru)
  "Rostec":                        "https://www.rostec.ru/local/templates/rostec2/assets/img/logo.svg",
  "United Aircraft Corporation":   WP + "United_Aircraft_Corporation_logo.svg",
  "United Shipbuilding Corporation": WP + "United_Shipbuilding_Corporation_logo.svg",
  "Almaz-Antey":                   WP + "Almaz-Antey_Logo.svg",
  // South Africa
  "Denel":                         WP + "Denel_logo.svg",
  // UAE
  "EDGE Group":                    WP + "EDGE_Group_logo.svg",
};

export function getLogoDomain(name) {
  return COMPANY_LOGOS[name] ?? null;
}

/**
 * Returns the best available logo URL for a company:
 * 1. Wikipedia Commons (hardcoded, reliable, never blocked)
 * 2. null (caller shows letter avatar)
 */
export function getLogoUrl(name) {
  return COMPANY_WIKI_LOGOS[name] ?? null;
}

// Returns Wikipedia logo if available, then clearbit fallback, then null
export function getClearbitUrl(name) {
  if (COMPANY_WIKI_LOGOS[name]) return COMPANY_WIKI_LOGOS[name];
  const domain = COMPANY_LOGOS[name];
  if (domain) return `https://logo.clearbit.com/${domain}`;
  return null;
}

// Returns ordered list of logo URLs to try: [wikipedia?, clearbit?, google-favicon?]
// Google Favicon is skipped for .cn and .ru domains — those return a generic globe
// icon (HTTP 200) with no custom favicon, which fools the onerror handler.
// These TLDs return a generic globe favicon (HTTP 200) for sites without a custom icon,
// which fools the onerror handler. Skip Google Favicon for these; fall back to initials.
const FAVICON_SKIP_TLDS = [".cn", ".ru", ".gov.in", ".co.in", "-india.in"];

export function getLogoUrls(name) {
  const urls = [];
  if (COMPANY_WIKI_LOGOS[name]) urls.push(COMPANY_WIKI_LOGOS[name]);
  const domain = COMPANY_LOGOS[name];
  if (domain) {
    urls.push(`https://logo.clearbit.com/${domain}`);
    const skipFavicon = FAVICON_SKIP_TLDS.some((tld) => domain.endsWith(tld));
    if (!skipFavicon) urls.push(`https://www.google.com/s2/favicons?domain=https://${domain}&sz=128`);
  }
  return urls;
}
