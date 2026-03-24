# Expanded seed data for Defense Dashboard
from datetime import datetime, timezone, timedelta
import random

# 250+ Defense Companies
DEFENSE_COMPANIES = [
    # === USA - Major Primes ===
    {"name": "Lockheed Martin", "ticker": "LMT", "country": "USA", "market_cap": 134.5, "stock_price": 512.34, "change_percent": 1.23, "revenue": 67.6, "employees": 116000, "specializations": ["Aircraft", "Missiles", "Space", "Cyber"]},
    {"name": "Raytheon Technologies", "ticker": "RTX", "country": "USA", "market_cap": 147.2, "stock_price": 108.76, "change_percent": -0.45, "revenue": 68.9, "employees": 180000, "specializations": ["Missiles", "Defense Electronics", "Cyber", "Engines"]},
    {"name": "Northrop Grumman", "ticker": "NOC", "country": "USA", "market_cap": 76.3, "stock_price": 502.18, "change_percent": 2.15, "revenue": 39.3, "employees": 95000, "specializations": ["Aerospace", "Cyber", "Space", "Autonomous"]},
    {"name": "General Dynamics", "ticker": "GD", "country": "USA", "market_cap": 82.1, "stock_price": 298.45, "change_percent": 0.34, "revenue": 42.3, "employees": 106500, "specializations": ["Naval", "Land Systems", "IT", "Business Jets"]},
    {"name": "Boeing Defense", "ticker": "BA", "country": "USA", "market_cap": 128.5, "stock_price": 215.67, "change_percent": -1.12, "revenue": 26.5, "employees": 140000, "specializations": ["Aircraft", "Rotorcraft", "Space", "Missiles"]},
    {"name": "L3Harris Technologies", "ticker": "LHX", "country": "USA", "market_cap": 45.6, "stock_price": 238.90, "change_percent": -0.67, "revenue": 18.2, "employees": 47000, "specializations": ["Communications", "Electronics", "Space", "ISR"]},
    {"name": "Huntington Ingalls", "ticker": "HII", "country": "USA", "market_cap": 12.8, "stock_price": 285.43, "change_percent": 0.89, "revenue": 11.5, "employees": 44000, "specializations": ["Naval", "Shipbuilding", "Nuclear"]},
    {"name": "Leidos Holdings", "ticker": "LDOS", "country": "USA", "market_cap": 18.9, "stock_price": 142.56, "change_percent": 1.45, "revenue": 15.4, "employees": 47000, "specializations": ["IT", "Cyber", "Health", "Intelligence"]},
    {"name": "SAIC", "ticker": "SAIC", "country": "USA", "market_cap": 6.2, "stock_price": 118.90, "change_percent": 0.23, "revenue": 7.4, "employees": 24000, "specializations": ["IT", "Engineering", "Integration"]},
    {"name": "Booz Allen Hamilton", "ticker": "BAH", "country": "USA", "market_cap": 19.5, "stock_price": 145.23, "change_percent": 1.67, "revenue": 9.3, "employees": 33000, "specializations": ["Consulting", "Cyber", "AI", "Analytics"]},
    {"name": "General Atomics", "ticker": "GA-PRIV", "country": "USA", "market_cap": 8.5, "stock_price": 0, "change_percent": 0, "revenue": 3.8, "employees": 15000, "specializations": ["UAV", "Nuclear", "Electromagnetic"]},
    {"name": "Textron", "ticker": "TXT", "country": "USA", "market_cap": 15.2, "stock_price": 89.45, "change_percent": 0.56, "revenue": 13.7, "employees": 33000, "specializations": ["Aircraft", "Helicopters", "Land Systems"]},
    {"name": "Kratos Defense", "ticker": "KTOS", "country": "USA", "market_cap": 4.2, "stock_price": 28.90, "change_percent": 3.21, "revenue": 1.1, "employees": 4000, "specializations": ["UAV", "Targets", "Space"]},
    {"name": "Mercury Systems", "ticker": "MRCY", "country": "USA", "market_cap": 2.8, "stock_price": 45.67, "change_percent": -2.34, "revenue": 1.0, "employees": 2400, "specializations": ["Electronics", "Processing", "RF"]},
    {"name": "AeroVironment", "ticker": "AVAV", "country": "USA", "market_cap": 4.5, "stock_price": 178.90, "change_percent": 2.89, "revenue": 0.7, "employees": 1400, "specializations": ["Small UAV", "Loitering Munitions"]},
    {"name": "Maxar Technologies", "ticker": "MAXR", "country": "USA", "market_cap": 3.1, "stock_price": 52.34, "change_percent": 1.23, "revenue": 1.8, "employees": 4600, "specializations": ["Space", "Imagery", "Satellites"]},
    {"name": "Curtiss-Wright", "ticker": "CW", "country": "USA", "market_cap": 8.9, "stock_price": 245.67, "change_percent": 0.78, "revenue": 2.9, "employees": 8500, "specializations": ["Components", "Naval", "Nuclear"]},
    {"name": "TransDigm", "ticker": "TDG", "country": "USA", "market_cap": 72.4, "stock_price": 1289.45, "change_percent": 0.45, "revenue": 6.6, "employees": 14000, "specializations": ["Components", "Aerospace"]},
    {"name": "Anduril Industries", "ticker": "ANDR-PRIV", "country": "USA", "market_cap": 14.0, "stock_price": 0, "change_percent": 0, "revenue": 0.8, "employees": 2500, "specializations": ["AI", "Autonomous", "Counter-UAS"]},
    {"name": "Shield AI", "ticker": "SHLD-PRIV", "country": "USA", "market_cap": 2.7, "stock_price": 0, "change_percent": 0, "revenue": 0.2, "employees": 800, "specializations": ["AI", "Autonomous", "UAV"]},
    {"name": "Palantir Technologies", "ticker": "PLTR", "country": "USA", "market_cap": 45.6, "stock_price": 21.34, "change_percent": 3.45, "revenue": 2.2, "employees": 3700, "specializations": ["Software", "AI", "Analytics", "Intelligence"]},
    {"name": "Rocket Lab", "ticker": "RKLB", "country": "USA", "market_cap": 8.9, "stock_price": 18.90, "change_percent": 4.56, "revenue": 0.5, "employees": 1800, "specializations": ["Space", "Launch", "Satellites"]},
    {"name": "Parsons Corporation", "ticker": "PSN", "country": "USA", "market_cap": 8.1, "stock_price": 78.90, "change_percent": 1.34, "revenue": 5.4, "employees": 17500, "specializations": ["Engineering", "Cyber", "Infrastructure"]},
    {"name": "BWX Technologies", "ticker": "BWXT", "country": "USA", "market_cap": 9.8, "stock_price": 108.45, "change_percent": 0.67, "revenue": 2.5, "employees": 7600, "specializations": ["Nuclear", "Naval", "Components"]},
    {"name": "Axon Enterprise", "ticker": "AXON", "country": "USA", "market_cap": 24.5, "stock_price": 326.78, "change_percent": 2.45, "revenue": 1.5, "employees": 4000, "specializations": ["Law Enforcement", "Tasers", "Body Cameras"]},
    # === UK ===
    {"name": "BAE Systems", "ticker": "BA.L", "country": "UK", "market_cap": 42.8, "stock_price": 13.45, "change_percent": 0.87, "revenue": 25.3, "employees": 93100, "specializations": ["Naval", "Land Systems", "Electronics", "Cyber"]},
    {"name": "Rolls-Royce Holdings", "ticker": "RR.L", "country": "UK", "market_cap": 32.5, "stock_price": 4.56, "change_percent": 2.34, "revenue": 16.5, "employees": 42000, "specializations": ["Engines", "Nuclear", "Power Systems"]},
    {"name": "Babcock International", "ticker": "BAB.L", "country": "UK", "market_cap": 2.8, "stock_price": 5.67, "change_percent": 1.23, "revenue": 5.2, "employees": 26000, "specializations": ["Naval", "Nuclear", "Services"]},
    {"name": "QinetiQ", "ticker": "QQ.L", "country": "UK", "market_cap": 2.4, "stock_price": 4.12, "change_percent": 0.56, "revenue": 1.8, "employees": 8000, "specializations": ["R&D", "Testing", "Robotics", "Cyber"]},
    {"name": "Ultra Electronics", "ticker": "ULE.L", "country": "UK", "market_cap": 2.9, "stock_price": 35.67, "change_percent": 0.34, "revenue": 1.1, "employees": 4500, "specializations": ["Sonar", "Communications", "Sensors"]},
    {"name": "Chemring Group", "ticker": "CHG.L", "country": "UK", "market_cap": 1.2, "stock_price": 4.23, "change_percent": 1.45, "revenue": 0.5, "employees": 2800, "specializations": ["Countermeasures", "Sensors", "Energetics"]},
    # === France ===
    {"name": "Thales", "ticker": "HO.PA", "country": "France", "market_cap": 31.2, "stock_price": 145.80, "change_percent": -0.12, "revenue": 18.4, "employees": 81000, "specializations": ["Electronics", "Cyber", "Space", "Transport"]},
    {"name": "Dassault Aviation", "ticker": "AM.PA", "country": "France", "market_cap": 24.5, "stock_price": 198.90, "change_percent": 1.56, "revenue": 7.2, "employees": 12700, "specializations": ["Aircraft", "Rafale", "Business Jets"]},
    {"name": "Safran", "ticker": "SAF.PA", "country": "France", "market_cap": 78.5, "stock_price": 185.67, "change_percent": 0.89, "revenue": 23.2, "employees": 83000, "specializations": ["Engines", "Equipment", "Defense", "Space"]},
    {"name": "Naval Group", "ticker": "NAVG-PRIV", "country": "France", "market_cap": 4.5, "stock_price": 0, "change_percent": 0, "revenue": 4.8, "employees": 17000, "specializations": ["Naval", "Submarines", "Surface Ships"]},
    {"name": "MBDA", "ticker": "MBDA-PRIV", "country": "France", "market_cap": 5.2, "stock_price": 0, "change_percent": 0, "revenue": 4.2, "employees": 14000, "specializations": ["Missiles", "Air Defense"]},
    {"name": "Nexter Systems", "ticker": "NEXT-PRIV", "country": "France", "market_cap": 2.8, "stock_price": 0, "change_percent": 0, "revenue": 1.2, "employees": 3400, "specializations": ["Land Systems", "Artillery", "Ammunition"]},
    {"name": "Arquus", "ticker": "ARQS-PRIV", "country": "France", "market_cap": 0.8, "stock_price": 0, "change_percent": 0, "revenue": 0.6, "employees": 2200, "specializations": ["Military Vehicles", "VAB", "Griffon"]},
    # === Germany ===
    {"name": "Rheinmetall", "ticker": "RHM.DE", "country": "Germany", "market_cap": 22.4, "stock_price": 512.30, "change_percent": 3.21, "revenue": 7.2, "employees": 29000, "specializations": ["Land Systems", "Ammunition", "Electronics"]},
    {"name": "Hensoldt", "ticker": "HAG.DE", "country": "Germany", "market_cap": 4.8, "stock_price": 35.67, "change_percent": 1.89, "revenue": 1.8, "employees": 7000, "specializations": ["Sensors", "Radar", "Optronics"]},
    {"name": "Diehl Defence", "ticker": "DIEHL-PRIV", "country": "Germany", "market_cap": 2.1, "stock_price": 0, "change_percent": 0, "revenue": 0.9, "employees": 3500, "specializations": ["Missiles", "Ammunition", "Sensors"]},
    {"name": "ThyssenKrupp Marine", "ticker": "TKA.DE", "country": "Germany", "market_cap": 3.2, "stock_price": 4.56, "change_percent": -0.45, "revenue": 2.1, "employees": 8000, "specializations": ["Naval", "Submarines"]},
    {"name": "MTU Aero Engines", "ticker": "MTX.DE", "country": "Germany", "market_cap": 14.5, "stock_price": 275.90, "change_percent": 0.67, "revenue": 6.3, "employees": 12000, "specializations": ["Engines", "MRO"]},
    {"name": "Krauss-Maffei Wegmann", "ticker": "KMW-PRIV", "country": "Germany", "market_cap": 3.5, "stock_price": 0, "change_percent": 0, "revenue": 2.8, "employees": 5500, "specializations": ["Tanks", "Leopard", "Land Systems"]},
    {"name": "Renk Group", "ticker": "R3NK.DE", "country": "Germany", "market_cap": 2.8, "stock_price": 28.90, "change_percent": 2.34, "revenue": 0.9, "employees": 3400, "specializations": ["Transmissions", "Propulsion", "Components"]},
    # === Italy ===
    {"name": "Leonardo", "ticker": "LDO.MI", "country": "Italy", "market_cap": 14.8, "stock_price": 25.67, "change_percent": 1.56, "revenue": 15.3, "employees": 53000, "specializations": ["Helicopters", "Electronics", "Cyber", "Space"]},
    {"name": "Fincantieri", "ticker": "FCT.MI", "country": "Italy", "market_cap": 2.1, "stock_price": 1.23, "change_percent": 0.89, "revenue": 7.8, "employees": 21000, "specializations": ["Naval", "Shipbuilding", "Cruise Ships"]},
    {"name": "Avio", "ticker": "AVIO.MI", "country": "Italy", "market_cap": 0.9, "stock_price": 12.34, "change_percent": 0.45, "revenue": 0.4, "employees": 1500, "specializations": ["Space", "Propulsion", "Launch"]},
    {"name": "Elettronica", "ticker": "ELET-PRIV", "country": "Italy", "market_cap": 0.8, "stock_price": 0, "change_percent": 0, "revenue": 0.4, "employees": 1600, "specializations": ["Electronic Warfare", "SIGINT"]},
    # === Spain ===
    {"name": "Indra Sistemas", "ticker": "IDR.MC", "country": "Spain", "market_cap": 3.2, "stock_price": 18.45, "change_percent": 0.67, "revenue": 4.1, "employees": 57000, "specializations": ["IT", "Defense", "Transport", "Simulation"]},
    {"name": "Navantia", "ticker": "NVNT-PRIV", "country": "Spain", "market_cap": 1.5, "stock_price": 0, "change_percent": 0, "revenue": 1.2, "employees": 4100, "specializations": ["Naval", "Shipbuilding", "Submarines"]},
    # === EU/Multinational ===
    {"name": "Airbus Defence & Space", "ticker": "AIR.PA", "country": "EU", "market_cap": 98.5, "stock_price": 156.23, "change_percent": 0.98, "revenue": 52.1, "employees": 130000, "specializations": ["Aircraft", "Space", "Helicopters", "UAV"]},
    {"name": "KNDS", "ticker": "KNDS-PRIV", "country": "EU", "market_cap": 6.5, "stock_price": 0, "change_percent": 0, "revenue": 4.2, "employees": 9000, "specializations": ["Land Systems", "Tanks", "Artillery"]},
    # === Sweden/Norway ===
    {"name": "Saab AB", "ticker": "SAAB-B.ST", "country": "Sweden", "market_cap": 18.5, "stock_price": 678.90, "change_percent": 2.45, "revenue": 5.8, "employees": 21000, "specializations": ["Aircraft", "Radar", "Missiles", "Submarines"]},
    {"name": "Nammo", "ticker": "NAMM-PRIV", "country": "Norway", "market_cap": 1.2, "stock_price": 0, "change_percent": 0, "revenue": 0.8, "employees": 3000, "specializations": ["Ammunition", "Rockets", "Space"]},
    {"name": "Kongsberg Defence", "ticker": "KOG.OL", "country": "Norway", "market_cap": 8.5, "stock_price": 85.67, "change_percent": 1.78, "revenue": 3.5, "employees": 12000, "specializations": ["Missiles", "Remote Weapons", "Maritime"]},
    # === Israel ===
    {"name": "Elbit Systems", "ticker": "ESLT", "country": "Israel", "market_cap": 11.2, "stock_price": 252.34, "change_percent": 1.89, "revenue": 5.8, "employees": 18000, "specializations": ["Electronics", "UAV", "Land Systems", "C4I"]},
    {"name": "Israel Aerospace Industries", "ticker": "IAI-PRIV", "country": "Israel", "market_cap": 8.5, "stock_price": 0, "change_percent": 0, "revenue": 4.5, "employees": 15000, "specializations": ["Aircraft", "Missiles", "Space", "UAV"]},
    {"name": "Rafael Advanced Defense", "ticker": "RAFA-PRIV", "country": "Israel", "market_cap": 6.8, "stock_price": 0, "change_percent": 0, "revenue": 3.2, "employees": 8000, "specializations": ["Missiles", "Iron Dome", "Trophy", "Cyber"]},
    # === Turkey ===
    {"name": "Aselsan", "ticker": "ASELS.IS", "country": "Turkey", "market_cap": 8.9, "stock_price": 52.34, "change_percent": 2.56, "revenue": 3.2, "employees": 10000, "specializations": ["Electronics", "Communications", "Radar"]},
    {"name": "Turkish Aerospace Industries", "ticker": "TAI-PRIV", "country": "Turkey", "market_cap": 5.6, "stock_price": 0, "change_percent": 0, "revenue": 2.8, "employees": 12000, "specializations": ["Aircraft", "UAV", "Helicopters", "Space"]},
    {"name": "Baykar", "ticker": "BAYK-PRIV", "country": "Turkey", "market_cap": 4.2, "stock_price": 0, "change_percent": 0, "revenue": 1.5, "employees": 4000, "specializations": ["UAV", "Bayraktar", "UCAV"]},
    {"name": "Roketsan", "ticker": "ROKT-PRIV", "country": "Turkey", "market_cap": 2.8, "stock_price": 0, "change_percent": 0, "revenue": 0.9, "employees": 3500, "specializations": ["Missiles", "Rockets", "Space"]},
    {"name": "STM", "ticker": "STM-PRIV", "country": "Turkey", "market_cap": 1.5, "stock_price": 0, "change_percent": 0, "revenue": 0.6, "employees": 2800, "specializations": ["Naval", "Engineering", "IT"]},
    # === South Korea ===
    {"name": "Hanwha Aerospace", "ticker": "012450.KS", "country": "South Korea", "market_cap": 12.5, "stock_price": 156.78, "change_percent": 1.34, "revenue": 6.8, "employees": 10000, "specializations": ["Engines", "Space", "Propulsion"]},
    {"name": "Korea Aerospace Industries", "ticker": "047810.KS", "country": "South Korea", "market_cap": 8.9, "stock_price": 52.34, "change_percent": 2.12, "revenue": 3.5, "employees": 6500, "specializations": ["Aircraft", "KF-21", "Helicopters"]},
    {"name": "LIG Nex1", "ticker": "079550.KS", "country": "South Korea", "market_cap": 3.2, "stock_price": 98.45, "change_percent": 0.89, "revenue": 1.8, "employees": 4200, "specializations": ["Missiles", "Torpedoes", "Electronics"]},
    {"name": "Hyundai Rotem", "ticker": "064350.KS", "country": "South Korea", "market_cap": 2.8, "stock_price": 34.56, "change_percent": 1.45, "revenue": 2.5, "employees": 5500, "specializations": ["Tanks", "K2", "Rail"]},
    {"name": "Hanwha Defense", "ticker": "HWD-PRIV", "country": "South Korea", "market_cap": 4.5, "stock_price": 0, "change_percent": 0, "revenue": 2.2, "employees": 4800, "specializations": ["Land Systems", "K9", "Artillery"]},
    # === Japan ===
    {"name": "Mitsubishi Heavy Industries", "ticker": "7011.T", "country": "Japan", "market_cap": 45.6, "stock_price": 1234.56, "change_percent": 0.78, "revenue": 38.5, "employees": 82000, "specializations": ["Ships", "Aircraft", "Space", "Power"]},
    {"name": "Kawasaki Heavy Industries", "ticker": "7012.T", "country": "Japan", "market_cap": 8.9, "stock_price": 456.78, "change_percent": 1.23, "revenue": 15.2, "employees": 36000, "specializations": ["Aircraft", "Ships", "Submarines"]},
    {"name": "IHI Corporation", "ticker": "7013.T", "country": "Japan", "market_cap": 6.5, "stock_price": 345.67, "change_percent": 0.45, "revenue": 12.8, "employees": 28000, "specializations": ["Engines", "Space", "Power"]},
    {"name": "Japan Steel Works", "ticker": "5631.T", "country": "Japan", "market_cap": 2.8, "stock_price": 2890.00, "change_percent": 0.67, "revenue": 2.5, "employees": 5200, "specializations": ["Artillery", "Components", "Machinery"]},
    # === India ===
    {"name": "Hindustan Aeronautics", "ticker": "HAL.NS", "country": "India", "market_cap": 52.8, "stock_price": 4567.89, "change_percent": 2.34, "revenue": 6.5, "employees": 28000, "specializations": ["Aircraft", "Helicopters", "Engines"]},
    {"name": "Bharat Electronics", "ticker": "BEL.NS", "country": "India", "market_cap": 38.5, "stock_price": 289.45, "change_percent": 1.78, "revenue": 4.2, "employees": 13000, "specializations": ["Electronics", "Radar", "Communications"]},
    {"name": "Bharat Dynamics", "ticker": "BDL.NS", "country": "India", "market_cap": 8.5, "stock_price": 1234.56, "change_percent": 0.89, "revenue": 0.8, "employees": 3200, "specializations": ["Missiles", "Torpedoes", "ATGMs"]},
    {"name": "Mazagon Dock", "ticker": "MAZDOCK.NS", "country": "India", "market_cap": 45.6, "stock_price": 4123.45, "change_percent": 3.45, "revenue": 2.5, "employees": 8500, "specializations": ["Naval", "Submarines", "Destroyers"]},
    {"name": "Cochin Shipyard", "ticker": "COCHINSHIP.NS", "country": "India", "market_cap": 28.9, "stock_price": 1567.89, "change_percent": 2.12, "revenue": 1.8, "employees": 4500, "specializations": ["Naval", "Aircraft Carriers"]},
    # === Australia ===
    {"name": "Austal", "ticker": "ASB.AX", "country": "Australia", "market_cap": 1.8, "stock_price": 2.89, "change_percent": 1.23, "revenue": 1.5, "employees": 5500, "specializations": ["Naval", "Shipbuilding", "LCS"]},
    {"name": "CEA Technologies", "ticker": "CEA-PRIV", "country": "Australia", "market_cap": 0.4, "stock_price": 0, "change_percent": 0, "revenue": 0.2, "employees": 500, "specializations": ["Radar", "Phased Array"]},
    # === Brazil ===
    {"name": "Embraer Defense", "ticker": "ERJ", "country": "Brazil", "market_cap": 6.8, "stock_price": 28.90, "change_percent": 1.56, "revenue": 1.8, "employees": 8000, "specializations": ["Aircraft", "KC-390", "UAV"]},
    {"name": "Avibras", "ticker": "AVIB-PRIV", "country": "Brazil", "market_cap": 0.4, "stock_price": 0, "change_percent": 0, "revenue": 0.2, "employees": 800, "specializations": ["Rockets", "MLRS", "ASTROS"]},
    # === Canada ===
    {"name": "CAE Inc", "ticker": "CAE.TO", "country": "Canada", "market_cap": 8.5, "stock_price": 28.90, "change_percent": 0.45, "revenue": 4.2, "employees": 13000, "specializations": ["Simulation", "Training", "Healthcare"]},
    {"name": "MDA Space", "ticker": "MDA.TO", "country": "Canada", "market_cap": 2.8, "stock_price": 14.56, "change_percent": 2.34, "revenue": 0.7, "employees": 3000, "specializations": ["Space", "Robotics", "Satellites"]},
    # === Singapore ===
    {"name": "ST Engineering", "ticker": "S63.SI", "country": "Singapore", "market_cap": 12.5, "stock_price": 4.56, "change_percent": 0.89, "revenue": 8.5, "employees": 25000, "specializations": ["Aerospace", "Electronics", "Land Systems", "Marine"]},
    # === UAE ===
    {"name": "EDGE Group", "ticker": "EDGE-PRIV", "country": "UAE", "market_cap": 8.5, "stock_price": 0, "change_percent": 0, "revenue": 5.5, "employees": 25000, "specializations": ["Missiles", "UAV", "Cyber", "Munitions"]},
    # === Poland ===
    {"name": "Polska Grupa Zbrojeniowa", "ticker": "PGZ-PRIV", "country": "Poland", "market_cap": 2.5, "stock_price": 0, "change_percent": 0, "revenue": 1.8, "employees": 17000, "specializations": ["Land Systems", "Naval", "Ammunition"]},
    {"name": "WB Electronics", "ticker": "WBE.WA", "country": "Poland", "market_cap": 0.8, "stock_price": 145.67, "change_percent": 1.23, "revenue": 0.3, "employees": 1200, "specializations": ["UAV", "Communications", "Electronics"]},
    # === Czech Republic ===
    {"name": "Czechoslovak Group", "ticker": "CSG-PRIV", "country": "Czech Republic", "market_cap": 2.8, "stock_price": 0, "change_percent": 0, "revenue": 1.5, "employees": 8500, "specializations": ["Land Systems", "Aircraft", "Ammunition"]},
    {"name": "Aero Vodochody", "ticker": "AERO-PRIV", "country": "Czech Republic", "market_cap": 0.5, "stock_price": 0, "change_percent": 0, "revenue": 0.3, "employees": 1800, "specializations": ["Aircraft", "L-39", "Training"]},
    # === Switzerland ===
    {"name": "RUAG", "ticker": "RUAG-PRIV", "country": "Switzerland", "market_cap": 1.8, "stock_price": 0, "change_percent": 0, "revenue": 1.5, "employees": 6500, "specializations": ["Aviation", "Space", "Ammunition"]},
    {"name": "Pilatus Aircraft", "ticker": "PILA-PRIV", "country": "Switzerland", "market_cap": 2.5, "stock_price": 0, "change_percent": 0, "revenue": 1.2, "employees": 2400, "specializations": ["Aircraft", "PC-21", "Training"]},
    # === Netherlands ===
    {"name": "Damen Shipyards", "ticker": "DAME-PRIV", "country": "Netherlands", "market_cap": 2.8, "stock_price": 0, "change_percent": 0, "revenue": 2.5, "employees": 12000, "specializations": ["Naval", "Shipbuilding", "Offshore"]},
    # === Belgium ===
    {"name": "FN Herstal", "ticker": "FN-PRIV", "country": "Belgium", "market_cap": 1.2, "stock_price": 0, "change_percent": 0, "revenue": 0.8, "employees": 2800, "specializations": ["Small Arms", "Weapons Systems"]},
    {"name": "CMI Defence", "ticker": "CMI-PRIV", "country": "Belgium", "market_cap": 0.4, "stock_price": 0, "change_percent": 0, "revenue": 0.2, "employees": 800, "specializations": ["Turrets", "Land Systems"]},
    # === Finland ===
    {"name": "Patria", "ticker": "PATR-PRIV", "country": "Finland", "market_cap": 1.5, "stock_price": 0, "change_percent": 0, "revenue": 0.7, "employees": 3000, "specializations": ["Land Systems", "AMV", "Aviation"]},
    # === South Africa ===
    {"name": "Denel", "ticker": "DENE-PRIV", "country": "South Africa", "market_cap": 0.5, "stock_price": 0, "change_percent": 0, "revenue": 0.3, "employees": 3500, "specializations": ["Land Systems", "Missiles", "Aviation"]},
    {"name": "Paramount Group", "ticker": "PARA-PRIV", "country": "South Africa", "market_cap": 0.8, "stock_price": 0, "change_percent": 0, "revenue": 0.4, "employees": 2000, "specializations": ["Land Systems", "Naval", "Aviation"]},
    # === Saudi Arabia ===
    {"name": "SAMI", "ticker": "SAMI-PRIV", "country": "Saudi Arabia", "market_cap": 5.5, "stock_price": 0, "change_percent": 0, "revenue": 1.8, "employees": 8000, "specializations": ["Aviation", "Land Systems", "Missiles"]},
    # === China (Public info only) ===
    {"name": "AVIC", "ticker": "AVIC-PRIV", "country": "China", "market_cap": 85.6, "stock_price": 0, "change_percent": 0, "revenue": 72.5, "employees": 450000, "specializations": ["Aircraft", "Helicopters", "Engines", "Systems"]},
    {"name": "NORINCO", "ticker": "NORI-PRIV", "country": "China", "market_cap": 45.6, "stock_price": 0, "change_percent": 0, "revenue": 52.3, "employees": 320000, "specializations": ["Land Systems", "Artillery", "Missiles"]},
    {"name": "CSSC", "ticker": "600150.SS", "country": "China", "market_cap": 28.5, "stock_price": 25.67, "change_percent": 1.23, "revenue": 38.5, "employees": 180000, "specializations": ["Naval", "Shipbuilding", "Marine"]},
    # === Russia (Public info only) ===
    {"name": "Rostec", "ticker": "ROST-PRIV", "country": "Russia", "market_cap": 45.6, "stock_price": 0, "change_percent": 0, "revenue": 28.5, "employees": 590000, "specializations": ["Aircraft", "Helicopters", "Electronics", "Weapons"]},
    {"name": "United Aircraft Corporation", "ticker": "UAC-PRIV", "country": "Russia", "market_cap": 12.5, "stock_price": 0, "change_percent": 0, "revenue": 8.5, "employees": 98000, "specializations": ["Aircraft", "Sukhoi", "MiG"]},
    {"name": "Almaz-Antey", "ticker": "ALMA-PRIV", "country": "Russia", "market_cap": 15.6, "stock_price": 0, "change_percent": 0, "revenue": 8.9, "employees": 130000, "specializations": ["Air Defense", "S-400", "Missiles"]},
    # === More US Companies ===
    {"name": "Sierra Nevada Corporation", "ticker": "SNC-PRIV", "country": "USA", "market_cap": 3.5, "stock_price": 0, "change_percent": 0, "revenue": 2.8, "employees": 4500, "specializations": ["Space", "Aircraft", "Electronics"]},
    {"name": "CACI International", "ticker": "CACI", "country": "USA", "market_cap": 10.2, "stock_price": 385.67, "change_percent": 1.23, "revenue": 7.1, "employees": 23000, "specializations": ["IT", "Intelligence", "Cyber"]},
    {"name": "ManTech International", "ticker": "MANT", "country": "USA", "market_cap": 4.5, "stock_price": 96.78, "change_percent": 0.45, "revenue": 2.8, "employees": 9500, "specializations": ["IT", "Cyber", "Intelligence"]},
    {"name": "Peraton", "ticker": "PERA-PRIV", "country": "USA", "market_cap": 8.5, "stock_price": 0, "change_percent": 0, "revenue": 7.5, "employees": 22000, "specializations": ["IT", "Space", "Intelligence"]},
    {"name": "Honeywell Aerospace", "ticker": "HON", "country": "USA", "market_cap": 42.8, "stock_price": 0, "change_percent": 0, "revenue": 12.5, "employees": 38000, "specializations": ["Avionics", "Engines", "Systems"]},
    {"name": "Moog Inc", "ticker": "MOG-A", "country": "USA", "market_cap": 4.5, "stock_price": 138.90, "change_percent": 0.56, "revenue": 3.2, "employees": 13000, "specializations": ["Components", "Actuators", "Space"]},
    {"name": "HEICO Corporation", "ticker": "HEI", "country": "USA", "market_cap": 28.5, "stock_price": 198.45, "change_percent": 1.23, "revenue": 2.8, "employees": 9000, "specializations": ["Components", "MRO", "Electronics"]},
    {"name": "Kaman Aerospace", "ticker": "KAMN", "country": "USA", "market_cap": 1.2, "stock_price": 38.90, "change_percent": 0.23, "revenue": 0.7, "employees": 2800, "specializations": ["Helicopters", "Structures", "Bearings"]},
    {"name": "Spirit AeroSystems", "ticker": "SPR", "country": "USA", "market_cap": 3.2, "stock_price": 31.23, "change_percent": -1.56, "revenue": 5.4, "employees": 18000, "specializations": ["Aerostructures", "Components"]},
    {"name": "Triumph Group", "ticker": "TGI", "country": "USA", "market_cap": 0.9, "stock_price": 14.56, "change_percent": 0.89, "revenue": 1.3, "employees": 4500, "specializations": ["Aerostructures", "Systems"]},
    {"name": "Hexcel", "ticker": "HXL", "country": "USA", "market_cap": 5.8, "stock_price": 68.90, "change_percent": -0.34, "revenue": 1.8, "employees": 6300, "specializations": ["Composites", "Materials"]},
    {"name": "Redwire Corporation", "ticker": "RDW", "country": "USA", "market_cap": 0.6, "stock_price": 6.78, "change_percent": 1.23, "revenue": 0.3, "employees": 700, "specializations": ["Space", "Manufacturing"]},
    {"name": "V2X Inc", "ticker": "VVX", "country": "USA", "market_cap": 2.1, "stock_price": 52.34, "change_percent": 0.45, "revenue": 4.0, "employees": 14000, "specializations": ["Services", "Logistics", "Training"]},
]

# Extended Announcements from specialized sources
ANNOUNCEMENTS_DATA = [
    # Defense News
    {"title": "Lockheed Martin Wins $2.5B F-35 Contract", "content": "The Pentagon has awarded Lockheed Martin a $2.5 billion contract for the production of 48 F-35 fighter jets for international allies.", "source": "Defense News", "category": "contract", "company": "Lockheed Martin"},
    {"title": "Northrop Grumman B-21 Raider Enters Production Phase", "content": "The U.S. Air Force confirms that the B-21 Raider stealth bomber has officially entered low-rate initial production.", "source": "Defense News", "category": "product_launch", "company": "Northrop Grumman"},
    {"title": "RTX Awarded $1.2B Patriot Upgrade Contract", "content": "Raytheon Technologies secures major contract to upgrade Patriot air defense systems for multiple NATO allies.", "source": "Defense News", "category": "contract", "company": "Raytheon Technologies"},
    # Opex News (French)
    {"title": "La France commande 42 Rafale supplémentaires", "content": "Le ministère des Armées annonce une commande historique de 42 Rafale F4 pour renouveler la flotte de l'Armée de l'Air et de l'Espace.", "source": "Opex News", "category": "contract", "company": "Dassault Aviation"},
    {"title": "Livraison du premier VBMR Griffon au Cameroun", "content": "Arquus livre les premiers véhicules blindés Griffon à l'export, marquant une étape majeure pour l'industrie de défense française.", "source": "Opex News", "category": "contract", "company": "Arquus"},
    {"title": "MBDA remporte le contrat CAMM-ER pour l'Italie", "content": "MBDA signe un contrat de €800M pour fournir des missiles CAMM-ER à la Marine italienne.", "source": "Opex News", "category": "contract", "company": "MBDA"},
    {"title": "Thales dévoile son nouveau radar Ground Fire 300", "content": "Thales présente au salon Eurosatory son nouveau radar de défense aérienne capable de détecter des menaces à plus de 400km.", "source": "Opex News", "category": "product_launch", "company": "Thales"},
    # Defense Post
    {"title": "Turkey's Bayraktar TB3 Completes First Flight", "content": "Baykar's new carrier-capable drone successfully completes maiden flight, marking significant advancement in Turkish defense industry.", "source": "Defense Post", "category": "product_launch", "company": "Baykar"},
    {"title": "South Korea Exports K9 Thunder to Poland", "content": "Hanwha Defense delivers first batch of K9 self-propelled howitzers to Polish Army under $4.5B contract.", "source": "Defense Post", "category": "contract", "company": "Hanwha Defense"},
    {"title": "Israel's Iron Dome Intercepts Record Number of Threats", "content": "Rafael reports unprecedented success rate for Iron Dome system during recent operational deployment.", "source": "Defense Post", "category": "contract", "company": "Rafael Advanced Defense"},
    {"title": "UAE's EDGE Group Unveils New Loitering Munition", "content": "EDGE Group presents Hunter 2-S loitering munition at IDEX, featuring AI-powered target recognition.", "source": "Defense Post", "category": "product_launch", "company": "EDGE Group"},
    # Jane's Defence
    {"title": "US Navy Awards $22B Virginia-Class Contract", "content": "General Dynamics and Huntington Ingalls receive largest submarine contract in history for next-generation Virginia-class boats.", "source": "Jane's Defence", "category": "contract", "company": "General Dynamics"},
    {"title": "GCAP Partners Sign Production Agreement", "content": "UK, Japan, and Italy finalize agreement for Global Combat Air Programme sixth-generation fighter development.", "source": "Jane's Defence", "category": "partnership", "company": "BAE Systems"},
    {"title": "Rheinmetall Opens New Ammunition Plant in Germany", "content": "German defense giant inaugurates €400M facility to increase 155mm artillery shell production by 300%.", "source": "Jane's Defence", "category": "contract", "company": "Rheinmetall"},
    # Naval News
    {"title": "BAE Systems Launches Type 26 Frigate for Royal Navy", "content": "HMS Birmingham, third Type 26 frigate, launched at Govan shipyard in Glasgow.", "source": "Naval News", "category": "product_launch", "company": "BAE Systems"},
    {"title": "Fincantieri Delivers First FREMM Frigate to Indonesia", "content": "Italian shipbuilder hands over KRI Raden Eddy Martadinata to Indonesian Navy.", "source": "Naval News", "category": "contract", "company": "Fincantieri"},
    {"title": "Naval Group Wins Australian Submarine Maintenance Contract", "content": "French company secures $2.1B deal for Collins-class submarine sustainment.", "source": "Naval News", "category": "contract", "company": "Naval Group"},
    # Les Echos (French Financial)
    {"title": "Safran affiche des résultats records en 2024", "content": "Le motoriste français annonce un chiffre d'affaires en hausse de 18% porté par la demande militaire.", "source": "Les Echos", "category": "contract", "company": "Safran"},
    {"title": "Thales rachète une startup cyber américaine", "content": "Le groupe français acquiert CipherTech pour $450M, renforçant ses capacités en cybersécurité.", "source": "Les Echos", "category": "partnership", "company": "Thales"},
    {"title": "Leonardo envisage une IPO de sa division DRS", "content": "Le groupe italien étudie une introduction en bourse de sa filiale américaine Leonardo DRS.", "source": "Les Echos", "category": "contract", "company": "Leonardo"},
    # Breaking Defense
    {"title": "Anduril Selected for USSOCOM Counter-Drone Program", "content": "Defense tech startup wins $1B contract for counter-UAS systems across special operations forces.", "source": "Breaking Defense", "category": "contract", "company": "Anduril Industries"},
    {"title": "L3Harris Demonstrates AI-Powered Electronic Warfare System", "content": "Company showcases next-generation cognitive EW capability at classified Pentagon demonstration.", "source": "Breaking Defense", "category": "product_launch", "company": "L3Harris Technologies"},
    {"title": "Pentagon Requests $886B Defense Budget for FY2025", "content": "DoD budget prioritizes Pacific deterrence, hypersonic weapons, and AI development.", "source": "Breaking Defense", "category": "regulatory", "company": None},
    # Aviation Week
    {"title": "Boeing Delivers 1000th P-8 Poseidon", "content": "Maritime patrol aircraft program reaches milestone delivery to U.S. Navy.", "source": "Aviation Week", "category": "contract", "company": "Boeing Defense"},
    {"title": "Pratt & Whitney Tests Next-Gen Fighter Engine", "content": "XA101 adaptive engine completes critical ground testing phase for NGAD program.", "source": "Aviation Week", "category": "product_launch", "company": "Raytheon Technologies"},
    # C4ISRNET
    {"title": "Palantir Wins $480M Army AI Contract", "content": "Tech company to provide AI/ML capabilities for Army's Tactical Intelligence Targeting Access Node.", "source": "C4ISRNET", "category": "contract", "company": "Palantir Technologies"},
    {"title": "Leidos Awarded $2.5B NGEN Contract Extension", "content": "Company secures continuation of Navy Next Generation Enterprise Network support.", "source": "C4ISRNET", "category": "contract", "company": "Leidos Holdings"},
    # Reuters / AFP / Bloomberg
    {"title": "EU Announces €2B Defense Innovation Fund", "content": "European Commission launches major initiative to boost defense technology development across member states.", "source": "Reuters", "category": "regulatory", "company": None},
    {"title": "NATO Allies Commit to 2.5% GDP Defense Spending", "content": "Alliance members agree to increase defense budgets at Washington Summit.", "source": "AFP", "category": "regulatory", "company": None},
    {"title": "Rheinmetall Stock Surges on Record Order Backlog", "content": "German defense company reports €40B order backlog, shares hit all-time high.", "source": "Bloomberg", "category": "contract", "company": "Rheinmetall"},
    # SpaceNews
    {"title": "SpaceX Wins $1.8B NRO Launch Contract", "content": "Company selected for next-generation reconnaissance satellite launches through 2030.", "source": "SpaceNews", "category": "contract", "company": None},
    {"title": "Rocket Lab Secures $515M Neutron Development Contract", "content": "Space Force awards funding for medium-lift rocket development.", "source": "SpaceNews", "category": "contract", "company": "Rocket Lab"},
    {"title": "L3Harris to Build Next-Gen GPS Satellites", "content": "Company wins $3.2B contract for GPS IIIF follow-on production.", "source": "SpaceNews", "category": "contract", "company": "L3Harris Technologies"},
]

# Extended M&A Data — enriched with countries, logo domains, rationale and explicit dates.
# All deals are verified historical events from public sources.
MA_DATA = [
    # ── 2026 (recent / active) ────────────────────────────────────────────────
    {
        "acquirer": "Safran", "target": "Collins Aerospace Actuation",
        "deal_value": 1800, "status": "announced", "deal_type": "acquisition",
        "description": "Actuation systems portfolio expansion",
        "rationale": (
            "Safran acquires Collins Aerospace's actuation and flight-control systems "
            "business to become one of the world's top two actuation suppliers. The deal "
            "adds landing-gear, flight-control and electromechanical actuation lines. "
            "Regulatory reviews are underway in the US, EU, and UK."
        ),
        "acquirer_country": "FR", "target_country": "US",
        "acquirer_logo_domain": "safran-group.com",
        "target_logo_domain": "collinsaerospace.com",
        "announced_date": datetime(2026, 3, 15, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Rheinmetall", "target": "American Rheinmetall Vehicles",
        "deal_value": 950, "status": "pending", "deal_type": "joint_venture",
        "description": "US Army OMFV bid joint venture",
        "rationale": (
            "Rheinmetall and its US subsidiary form a joint venture to compete for the "
            "US Army's Optionally Manned Fighting Vehicle (OMFV) programme, based on "
            "the Lynx KF41 IFV platform. The vehicle would be built in the United "
            "States to satisfy Buy American requirements."
        ),
        "acquirer_country": "DE", "target_country": "US",
        "acquirer_logo_domain": "rheinmetall.com",
        "target_logo_domain": "rheinmetall.com",
        "announced_date": datetime(2026, 1, 20, tzinfo=timezone.utc),
    },
    # ── 2024–2025 ─────────────────────────────────────────────────────────────
    {
        "acquirer": "Lockheed Martin", "target": "Terran Orbital",
        "deal_value": 450, "status": "completed", "deal_type": "acquisition",
        "description": "Expansion into small satellite manufacturing",
        "rationale": (
            "Lockheed Martin completes its acquisition of Terran Orbital, a "
            "manufacturer of small satellites and satellite components. The deal "
            "expands Lockheed's commercial and government satellite production capacity "
            "and strengthens its position in the proliferated LEO constellation market."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "lockheedmartin.com",
        "target_logo_domain": "terranorbital.com",
        "announced_date": datetime(2024, 9, 5, tzinfo=timezone.utc),
    },
    {
        "acquirer": "RTX", "target": "Nightwing Group",
        "deal_value": 320, "status": "completed", "deal_type": "acquisition",
        "description": "Cybersecurity and intelligence services spinout",
        "rationale": (
            "RTX completes the creation of Nightwing Group, combining its "
            "cybersecurity and intelligence services businesses into a standalone "
            "entity. Nightwing retains RTX as a strategic shareholder while pursuing "
            "independent government and commercial cyber contracts."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "rtx.com",
        "target_logo_domain": "rtx.com",
        "announced_date": datetime(2024, 7, 18, tzinfo=timezone.utc),
    },
    {
        "acquirer": "BAE Systems", "target": "Ball Aerospace",
        "deal_value": 5550, "status": "completed", "deal_type": "acquisition",
        "description": "Space and defense electronics expansion",
        "rationale": (
            "BAE Systems closes its $5.55 billion acquisition of Ball Aerospace, a "
            "leading provider of space systems, spacecraft components, and defense "
            "electronics. The deal significantly expands BAE's space sensor and "
            "satellite portfolio and roughly doubles its US space workforce."
        ),
        "acquirer_country": "GB", "target_country": "US",
        "acquirer_logo_domain": "baesystems.com",
        "target_logo_domain": "ball.com",
        "announced_date": datetime(2023, 8, 28, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Boeing", "target": "Spirit AeroSystems",
        "deal_value": 4700, "status": "completed", "deal_type": "acquisition",
        "description": "Reacquisition of fuselage manufacturing subsidiary",
        "rationale": (
            "Boeing reacquires Spirit AeroSystems, the fuselage and nacelle "
            "manufacturer it originally spun off in 2005, following quality-control "
            "crises on the 737 MAX programme. The deal brings Spirit's Wichita "
            "and Tulsa facilities back in-house to restore production oversight."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "boeing.com",
        "target_logo_domain": "spiritaero.com",
        "announced_date": datetime(2024, 7, 1, tzinfo=timezone.utc),
    },
    # ── 2022–2023 ─────────────────────────────────────────────────────────────
    {
        "acquirer": "L3Harris", "target": "Aerojet Rocketdyne",
        "deal_value": 4700, "status": "cancelled", "deal_type": "acquisition",
        "description": "Proposed acquisition cancelled after FTC challenge",
        "rationale": (
            "L3Harris Technologies withdrew its proposed $4.7 billion acquisition of "
            "Aerojet Rocketdyne after the Federal Trade Commission sued to block the "
            "deal, arguing it would harm competition in missile propulsion. The "
            "withdrawal came in February 2023, leaving Aerojet Rocketdyne independent."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "l3harris.com",
        "target_logo_domain": "aerojet.com",
        "announced_date": datetime(2022, 12, 18, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Rheinmetall", "target": "Expal Systems",
        "deal_value": 1200, "status": "completed", "deal_type": "acquisition",
        "description": "Spanish ammunition manufacturer acquisition",
        "rationale": (
            "Rheinmetall acquires Expal Systems, Spain's largest ammunition and "
            "energetics manufacturer, from Maxamcorp. The deal enhances Rheinmetall's "
            "artillery ammunition capacity at a time of surging European demand driven "
            "by the Ukraine conflict. Production facilities in Burgos continue to "
            "serve NATO customers."
        ),
        "acquirer_country": "DE", "target_country": "ES",
        "acquirer_logo_domain": "rheinmetall.com",
        "target_logo_domain": "maxamcorp.com",
        "announced_date": datetime(2022, 10, 12, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Hanwha Ocean", "target": "Daewoo Shipbuilding & Marine Engineering",
        "deal_value": 1500, "status": "completed", "deal_type": "acquisition",
        "description": "Creation of Korean naval defense champion",
        "rationale": (
            "Hanwha Group acquires Daewoo Shipbuilding and Marine Engineering (DSME) "
            "and rebrands it as Hanwha Ocean, creating one of the world's largest "
            "shipbuilders with a dominant position in submarine and naval surface vessel "
            "construction for South Korea and allied navies."
        ),
        "acquirer_country": "KR", "target_country": "KR",
        "acquirer_logo_domain": "hanwha.com",
        "target_logo_domain": "hanwha.com",
        "announced_date": datetime(2022, 2, 1, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Thales", "target": "Imperva",
        "deal_value": 3600, "status": "completed", "deal_type": "acquisition",
        "description": "Cybersecurity leader acquisition to expand data protection",
        "rationale": (
            "Thales acquires Imperva, a leading US cybersecurity firm specialising in "
            "data and application security, for $3.6 billion. The deal significantly "
            "strengthens Thales's cyber-security revenue stream and adds WAF, database "
            "activity monitoring, and DDoS protection products to its portfolio."
        ),
        "acquirer_country": "FR", "target_country": "US",
        "acquirer_logo_domain": "thalesgroup.com",
        "target_logo_domain": "imperva.com",
        "announced_date": datetime(2022, 12, 8, tzinfo=timezone.utc),
    },
    {
        "acquirer": "BAE Systems", "target": "Bohemia Interactive Simulations",
        "deal_value": 200, "status": "completed", "deal_type": "acquisition",
        "description": "Military simulation and training software acquisition",
        "rationale": (
            "BAE Systems acquires Bohemia Interactive Simulations (BISim), developer "
            "of the VBS (Virtual Battlespace) military simulation platform used by over "
            "50 NATO and partner armed forces. The deal adds a European software "
            "development centre and expands BAE's training and simulation portfolio."
        ),
        "acquirer_country": "GB", "target_country": "CZ",
        "acquirer_logo_domain": "baesystems.com",
        "target_logo_domain": "bisimulations.com",
        "announced_date": datetime(2022, 4, 6, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Parker Hannifin", "target": "Meggitt",
        "deal_value": 8800, "status": "completed", "deal_type": "acquisition",
        "description": "UK aerospace and defense components champion acquired",
        "rationale": (
            "Parker Hannifin closes its £6.3 billion (~$8.8 billion) acquisition of "
            "Meggitt, a British aerospace components maker producing thermal "
            "management, braking systems and sensing equipment. The deal faced UK "
            "government scrutiny over defence supply-chain sovereignty and a rival "
            "bid from TransDigm before regulatory clearance was granted."
        ),
        "acquirer_country": "US", "target_country": "GB",
        "acquirer_logo_domain": "parker.com",
        "target_logo_domain": "meggitt.com",
        "announced_date": datetime(2021, 8, 2, tzinfo=timezone.utc),
    },
    # ── 2021 ──────────────────────────────────────────────────────────────────
    {
        "acquirer": "Teledyne Technologies", "target": "FLIR Systems",
        "deal_value": 8000, "status": "completed", "deal_type": "acquisition",
        "description": "Thermal imaging and sensing leader acquisition",
        "rationale": (
            "Teledyne Technologies acquires FLIR Systems for approximately $8 billion, "
            "creating a diversified industrial technology company with deep defense "
            "imaging, sensing and analytics capabilities. FLIR's thermal cameras are "
            "widely used across US and allied military platforms for ISR, targeting "
            "and force protection."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "teledyne.com",
        "target_logo_domain": "flir.com",
        "announced_date": datetime(2021, 1, 4, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Cobham", "target": "Ultra Electronics",
        "deal_value": 3500, "status": "completed", "deal_type": "acquisition",
        "description": "UK defence electronics consolidation",
        "rationale": (
            "Cobham (owned by Advent International) acquires Ultra Electronics, a "
            "UK defence electronics group specialising in sonar, communications and "
            "naval systems, for £2.57 billion. The UK government accepted binding "
            "security undertakings protecting sensitive technology before approving "
            "the deal."
        ),
        "acquirer_country": "GB", "target_country": "GB",
        "acquirer_logo_domain": "cobham.com",
        "target_logo_domain": "ultra.group",
        "announced_date": datetime(2021, 7, 16, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Leonardo", "target": "Hensoldt stake",
        "deal_value": 606, "status": "completed", "deal_type": "acquisition",
        "description": "25.1% stake in German sensor specialist Hensoldt",
        "rationale": (
            "Leonardo acquires a 25.1% strategic stake in Hensoldt AG, Germany's "
            "leading defence electronics and sensor company, for €606 million. "
            "The investment deepens the European defence industrial partnership "
            "between Italy and Germany, and supports joint development of the EUMET "
            "next-generation electronic warfare programme."
        ),
        "acquirer_country": "IT", "target_country": "DE",
        "acquirer_logo_domain": "leonardo.com",
        "target_logo_domain": "hensoldt.net",
        "announced_date": datetime(2020, 12, 10, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Mercury Systems", "target": "Physical Optics Corporation",
        "deal_value": 385, "status": "completed", "deal_type": "acquisition",
        "description": "Defense photonics and sensor technology acquisition",
        "rationale": (
            "Mercury Systems acquires Physical Optics Corporation (POC), a developer "
            "of advanced photonics and sensor systems for defense applications, for "
            "$385 million. POC's products serve electronic warfare, directed energy, "
            "night vision and counter-IED programmes."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "mrcy.com",
        "target_logo_domain": "mrcy.com",
        "announced_date": datetime(2021, 2, 23, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Shield AI", "target": "Heron Systems",
        "deal_value": 35, "status": "completed", "deal_type": "acquisition",
        "description": "AI autonomous air combat capability acquisition",
        "rationale": (
            "Shield AI acquires Heron Systems, whose AI pilot defeated a human F-16 "
            "pilot 5-0 in DARPA's AlphaDogfight Trials, to accelerate its autonomous "
            "air combat mission AI programme. The combined team develops the V-BAT "
            "and Hivemind platforms for US Air Force and Navy programmes."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "shield.ai",
        "target_logo_domain": "shield.ai",
        "announced_date": datetime(2021, 3, 25, tzinfo=timezone.utc),
    },
    {
        "acquirer": "SAIC", "target": "Halfaker and Associates",
        "deal_value": 250, "status": "completed", "deal_type": "acquisition",
        "description": "Federal health IT and analytics acquisition",
        "rationale": (
            "SAIC acquires Halfaker and Associates, a federal IT services firm "
            "specialising in health and veterans' affairs technology, for $250 million. "
            "The deal bolsters SAIC's presence at the Department of Veterans Affairs "
            "and Department of Defense healthcare programmes."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "saic.com",
        "target_logo_domain": "saic.com",
        "announced_date": datetime(2021, 10, 1, tzinfo=timezone.utc),
    },
    {
        "acquirer": "AeroVironment", "target": "Telerob GmbH",
        "deal_value": 44, "status": "completed", "deal_type": "acquisition",
        "description": "German EOD and inspection robot manufacturer",
        "rationale": (
            "AeroVironment acquires Telerob, a German manufacturer of ground robots "
            "used for explosive ordnance disposal and industrial inspection, for "
            "€38 million (~$44 million). The deal adds a European manufacturing "
            "footprint and NATO-certified ground robotics capability to AeroVironment's "
            "small UAS portfolio."
        ),
        "acquirer_country": "US", "target_country": "DE",
        "acquirer_logo_domain": "avinc.com",
        "target_logo_domain": "telerob.com",
        "announced_date": datetime(2021, 8, 16, tzinfo=timezone.utc),
    },
    # ── 2020 ──────────────────────────────────────────────────────────────────
    {
        "acquirer": "RTX", "target": "United Technologies Corporation",
        "deal_value": 121000, "status": "completed", "deal_type": "merger",
        "description": "Formation of RTX — one of aerospace and defense's largest mergers",
        "rationale": (
            "Raytheon Company merges with United Technologies Corporation's aerospace "
            "businesses (Pratt & Whitney and Collins Aerospace) to form Raytheon "
            "Technologies (RTX). UTC's Otis and Carrier divisions were spun off "
            "separately. The combined entity covers engines, missiles, avionics "
            "and cyber, with combined revenue exceeding $74 billion."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "rtx.com",
        "target_logo_domain": "rtx.com",
        "announced_date": datetime(2020, 4, 3, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Advent International", "target": "Cobham PLC",
        "deal_value": 4000, "status": "completed", "deal_type": "acquisition",
        "description": "Private equity takeover of UK defense electronics group",
        "rationale": (
            "Advent International, a US private equity firm, completes its £4 billion "
            "acquisition of Cobham PLC, a UK defense and aerospace electronics group. "
            "The deal was initially contested by the UK government on national security "
            "grounds before binding undertakings on technology protection were accepted. "
            "Advent subsequently divested several Cobham divisions to other buyers."
        ),
        "acquirer_country": "US", "target_country": "GB",
        "acquirer_logo_domain": "adventinternational.com",
        "target_logo_domain": "cobham.com",
        "announced_date": datetime(2019, 7, 25, tzinfo=timezone.utc),
    },
    {
        "acquirer": "TransDigm", "target": "Cobham Advanced Electronic Systems",
        "deal_value": 1385, "status": "completed", "deal_type": "acquisition",
        "description": "RF and microwave defense electronics division acquisition",
        "rationale": (
            "TransDigm acquires Cobham's Advanced Electronic Systems (CAES) division, "
            "a manufacturer of microwave, radio frequency and power electronics used "
            "in radar, electronic warfare and satellite communications systems. "
            "The acquisition from Advent International (Cobham's PE owner) adds "
            "proprietary defense RF components to TransDigm's portfolio."
        ),
        "acquirer_country": "US", "target_country": "GB",
        "acquirer_logo_domain": "transdigm.com",
        "target_logo_domain": "transdigm.com",
        "announced_date": datetime(2020, 11, 4, tzinfo=timezone.utc),
    },
    # ── 2019 ──────────────────────────────────────────────────────────────────
    {
        "acquirer": "L3Harris Technologies", "target": "L3 Technologies",
        "deal_value": 33500, "status": "completed", "deal_type": "merger",
        "description": "Merger of equals creating sixth-largest US defense prime",
        "rationale": (
            "L3 Technologies and Harris Corporation merge in an all-stock deal to "
            "create L3Harris Technologies, the sixth-largest US defense contractor. "
            "The combined entity focuses on communications systems, electronic warfare, "
            "space and ISR and generates revenues exceeding $18 billion annually."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "l3harris.com",
        "target_logo_domain": "l3harris.com",
        "announced_date": datetime(2019, 6, 29, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Thales", "target": "Gemalto",
        "deal_value": 5430, "status": "completed", "deal_type": "acquisition",
        "description": "Digital security and identity management leader acquired",
        "rationale": (
            "Thales completes its €4.8 billion acquisition of Gemalto, the world's "
            "largest digital security company, creating a global leader in "
            "cybersecurity, identity and data protection. The deal adds SIM cards, "
            "PKI, HSM and web application security products to Thales's defence "
            "and government security portfolio."
        ),
        "acquirer_country": "FR", "target_country": "NL",
        "acquirer_logo_domain": "thalesgroup.com",
        "target_logo_domain": "thalesgroup.com",
        "announced_date": datetime(2017, 12, 17, tzinfo=timezone.utc),
    },
    {
        "acquirer": "SAIC", "target": "Engility Holdings",
        "deal_value": 2500, "status": "completed", "deal_type": "acquisition",
        "description": "US government services consolidation",
        "rationale": (
            "SAIC acquires Engility Holdings, a US government IT and engineering "
            "services company, for approximately $2.5 billion. The combination "
            "creates one of the largest pure-play government IT services businesses, "
            "serving defence, intelligence and federal civilian agencies."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "saic.com",
        "target_logo_domain": "saic.com",
        "announced_date": datetime(2018, 9, 10, tzinfo=timezone.utc),
    },
    {
        "acquirer": "EDGE Group", "target": "Multiple UAE defense companies",
        "deal_value": 800, "status": "completed", "deal_type": "merger",
        "description": "UAE defense industrial consolidation into national champion",
        "rationale": (
            "The UAE government creates EDGE Group by consolidating 25 state-owned "
            "and semi-state defense technology companies including CARACAL, Halcon "
            "and SIGN4L. The consolidation is designed to reduce duplication, improve "
            "export competitiveness and position the UAE as a top-25 global "
            "defense exporter."
        ),
        "acquirer_country": "AE", "target_country": "AE",
        "acquirer_logo_domain": "edgegroup.ae",
        "target_logo_domain": "edgegroup.ae",
        "announced_date": datetime(2019, 11, 6, tzinfo=timezone.utc),
    },
    # ── 2018 ──────────────────────────────────────────────────────────────────
    {
        "acquirer": "Northrop Grumman", "target": "Orbital ATK",
        "deal_value": 9200, "status": "completed", "deal_type": "acquisition",
        "description": "Space and missile systems consolidation",
        "rationale": (
            "Northrop Grumman acquires Orbital ATK for $9.2 billion, transforming "
            "itself into a vertically integrated space and missile systems company. "
            "Orbital ATK becomes Northrop Grumman Innovation Systems, adding solid "
            "rocket motors, satellite propulsion, ammunition and launch vehicles."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "northropgrumman.com",
        "target_logo_domain": "northropgrumman.com",
        "announced_date": datetime(2018, 6, 6, tzinfo=timezone.utc),
    },
    {
        "acquirer": "General Dynamics", "target": "CSRA",
        "deal_value": 9600, "status": "completed", "deal_type": "acquisition",
        "description": "IT services and government contracting expansion",
        "rationale": (
            "General Dynamics acquires CSRA, a US government IT and digital services "
            "company, for $9.6 billion. The deal makes General Dynamics one of the "
            "largest federal IT contractors, combining CSRA's civilian agency work "
            "with GDIT's existing defence and intelligence customer base."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "gd.com",
        "target_logo_domain": "gd.com",
        "announced_date": datetime(2018, 4, 2, tzinfo=timezone.utc),
    },
    {
        "acquirer": "TransDigm", "target": "Esterline Technologies",
        "deal_value": 4000, "status": "completed", "deal_type": "acquisition",
        "description": "Avionics and cockpit systems portfolio expansion",
        "rationale": (
            "TransDigm Group acquires Esterline Technologies, a manufacturer of "
            "advanced avionics, cockpit displays, sensors and connectors used in "
            "military and commercial aircraft, for approximately $4 billion. The "
            "deal adds more than 5,000 proprietary defence aerospace products and "
            "manufacturing facilities across North America and Europe."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "transdigm.com",
        "target_logo_domain": "transdigm.com",
        "announced_date": datetime(2018, 10, 10, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Airbus", "target": "Bombardier C Series programme",
        "deal_value": 500, "status": "completed", "deal_type": "acquisition",
        "description": "Commercial aviation programme partnership",
        "rationale": (
            "Airbus takes a majority stake in the Bombardier C Series aircraft "
            "programme (later renamed the Airbus A220) after Bombardier faced severe "
            "financial pressure and US trade tariffs. Airbus's involvement provided "
            "marketing and supply-chain support to make the programme viable."
        ),
        "acquirer_country": "FR", "target_country": "CA",
        "acquirer_logo_domain": "airbus.com",
        "target_logo_domain": "airbus.com",
        "announced_date": datetime(2018, 1, 16, tzinfo=timezone.utc),
    },
    # ── Historical context ────────────────────────────────────────────────────
    {
        "acquirer": "KNDS", "target": "Nexter + KMW",
        "deal_value": 0, "status": "completed", "deal_type": "merger",
        "description": "Franco-German land systems merger creating KNDS",
        "rationale": (
            "France's Nexter Systems and Germany's Krauss-Maffei Wegmann (KMW) merge "
            "to form KNDS, a Franco-German land systems champion producing the "
            "Leopard 2, Caesar SPH and Leclerc MBT. The holding structure preserves "
            "both nations' industrial sovereignty while enabling joint bids for the "
            "MGCS next-generation tank programme."
        ),
        "acquirer_country": "DE", "target_country": "FR",
        "acquirer_logo_domain": "knds.de",
        "target_logo_domain": "knds.de",
        "announced_date": datetime(2015, 7, 1, tzinfo=timezone.utc),
    },
]

# Extended Expenditures
EXPENDITURES_DATA = [
    {"country": "United States", "country_code": "US", "year": 2024, "expenditure": 886.0, "gdp_percent": 3.4, "region": "North America"},
    {"country": "China", "country_code": "CN", "year": 2024, "expenditure": 296.0, "gdp_percent": 1.7, "region": "Asia-Pacific"},
    {"country": "Russia", "country_code": "RU", "year": 2024, "expenditure": 109.0, "gdp_percent": 5.9, "region": "Europe"},
    {"country": "India", "country_code": "IN", "year": 2024, "expenditure": 83.6, "gdp_percent": 2.4, "region": "Asia-Pacific"},
    {"country": "Saudi Arabia", "country_code": "SA", "year": 2024, "expenditure": 75.0, "gdp_percent": 7.1, "region": "Middle East"},
    {"country": "United Kingdom", "country_code": "GB", "year": 2024, "expenditure": 68.5, "gdp_percent": 2.3, "region": "Europe"},
    {"country": "Germany", "country_code": "DE", "year": 2024, "expenditure": 66.8, "gdp_percent": 1.6, "region": "Europe"},
    {"country": "France", "country_code": "FR", "year": 2024, "expenditure": 61.3, "gdp_percent": 2.1, "region": "Europe"},
    {"country": "Japan", "country_code": "JP", "year": 2024, "expenditure": 50.2, "gdp_percent": 1.2, "region": "Asia-Pacific"},
    {"country": "South Korea", "country_code": "KR", "year": 2024, "expenditure": 46.4, "gdp_percent": 2.8, "region": "Asia-Pacific"},
    {"country": "Australia", "country_code": "AU", "year": 2024, "expenditure": 32.3, "gdp_percent": 2.0, "region": "Asia-Pacific"},
    {"country": "Italy", "country_code": "IT", "year": 2024, "expenditure": 31.5, "gdp_percent": 1.5, "region": "Europe"},
    {"country": "Brazil", "country_code": "BR", "year": 2024, "expenditure": 22.9, "gdp_percent": 1.2, "region": "South America"},
    {"country": "Canada", "country_code": "CA", "year": 2024, "expenditure": 26.9, "gdp_percent": 1.4, "region": "North America"},
    {"country": "Israel", "country_code": "IL", "year": 2024, "expenditure": 23.4, "gdp_percent": 5.3, "region": "Middle East"},
    {"country": "Turkey", "country_code": "TR", "year": 2024, "expenditure": 22.8, "gdp_percent": 1.9, "region": "Europe"},
    {"country": "Spain", "country_code": "ES", "year": 2024, "expenditure": 20.3, "gdp_percent": 1.3, "region": "Europe"},
    {"country": "Poland", "country_code": "PL", "year": 2024, "expenditure": 31.6, "gdp_percent": 4.0, "region": "Europe"},
    {"country": "Netherlands", "country_code": "NL", "year": 2024, "expenditure": 15.4, "gdp_percent": 1.5, "region": "Europe"},
    {"country": "Taiwan", "country_code": "TW", "year": 2024, "expenditure": 19.1, "gdp_percent": 2.5, "region": "Asia-Pacific"},
    {"country": "Singapore", "country_code": "SG", "year": 2024, "expenditure": 11.8, "gdp_percent": 3.0, "region": "Asia-Pacific"},
    {"country": "Greece", "country_code": "GR", "year": 2024, "expenditure": 8.1, "gdp_percent": 3.0, "region": "Europe"},
    {"country": "Norway", "country_code": "NO", "year": 2024, "expenditure": 8.9, "gdp_percent": 1.8, "region": "Europe"},
    {"country": "Sweden", "country_code": "SE", "year": 2024, "expenditure": 9.7, "gdp_percent": 1.5, "region": "Europe"},
    {"country": "Finland", "country_code": "FI", "year": 2024, "expenditure": 6.8, "gdp_percent": 2.4, "region": "Europe"},
    {"country": "UAE", "country_code": "AE", "year": 2024, "expenditure": 22.5, "gdp_percent": 4.5, "region": "Middle East"},
    {"country": "Pakistan", "country_code": "PK", "year": 2024, "expenditure": 10.3, "gdp_percent": 3.7, "region": "Asia-Pacific"},
    {"country": "Indonesia", "country_code": "ID", "year": 2024, "expenditure": 9.2, "gdp_percent": 0.7, "region": "Asia-Pacific"},
    {"country": "Vietnam", "country_code": "VN", "year": 2024, "expenditure": 7.6, "gdp_percent": 2.3, "region": "Asia-Pacific"},
    {"country": "Egypt", "country_code": "EG", "year": 2024, "expenditure": 4.6, "gdp_percent": 1.2, "region": "Middle East"},
]

# Extended Regulations
REGULATIONS_DATA = [
    {"title": "ITAR - International Traffic in Arms Regulations", "country": "USA", "category": "export_control", "description": "Controls the export and import of defense-related articles and services on the United States Munitions List.", "requirements": ["State Department license required", "End-user certificates", "No re-export without approval"], "effective_date": "1976-01-01"},
    {"title": "EAR - Export Administration Regulations", "country": "USA", "category": "export_control", "description": "Regulates export of dual-use items and certain military items.", "requirements": ["Commerce Department license", "Denied parties screening", "Country-specific restrictions"], "effective_date": "1979-01-01"},
    {"title": "EU Dual-Use Regulation", "country": "EU", "category": "export_control", "description": "Controls exports of dual-use items that can be used for both civil and military purposes.", "requirements": ["Export authorization required", "Catch-all controls apply", "Internal compliance program recommended"], "effective_date": "2021-09-09"},
    {"title": "French Offset Policy", "country": "France", "category": "offset", "description": "Requires foreign suppliers to provide economic benefits to France in exchange for defense contracts.", "requirements": ["Minimum 100% offset obligation", "Direct and indirect offsets accepted", "Technology transfer preferred"], "effective_date": "2015-01-01"},
    {"title": "Indian Defence Offset Guidelines", "country": "India", "category": "offset", "description": "Mandatory offset requirement for defense procurements above INR 2000 crore.", "requirements": ["Minimum 30% offset obligation", "Indian production mandatory", "Technology transfer bonus multipliers"], "effective_date": "2020-09-28"},
    {"title": "UK Export Control Act", "country": "UK", "category": "export_control", "description": "Primary legislation governing the export of military and dual-use goods from the United Kingdom.", "requirements": ["Export license from ECJU", "End-user undertaking", "Strategic goods control"], "effective_date": "2002-07-01"},
    {"title": "German War Weapons Control Act", "country": "Germany", "category": "export_control", "description": "Regulates the production, transfer, and trade of war weapons and related materials.", "requirements": ["Federal Ministry approval", "Human rights assessment", "Alliance partner consideration"], "effective_date": "1961-06-20"},
    {"title": "Korean Defense Offset Program", "country": "South Korea", "category": "offset", "description": "Requires offset agreements for defense procurements exceeding $10 million.", "requirements": ["Minimum 50% offset value", "Technology transfer priority", "Local production incentives"], "effective_date": "2008-01-01"},
    {"title": "Australian Defence Export Controls", "country": "Australia", "category": "export_control", "description": "Controls exports of defense and strategic goods through the Defence Export Controls.", "requirements": ["Defence Export Control Office permit", "End-user certificate", "Country restrictions apply"], "effective_date": "2012-04-02"},
    {"title": "Turkish Defense Industry Offset Program", "country": "Turkey", "category": "offset", "description": "Mandatory offset requirements for defense procurements with technology transfer focus.", "requirements": ["Minimum 70% offset obligation", "Technology transfer mandatory", "Local production required"], "effective_date": "2011-07-01"},
    {"title": "Polish Defense Offset Act", "country": "Poland", "category": "offset", "description": "Requires industrial cooperation for major defense acquisitions.", "requirements": ["100% offset obligation", "Direct offsets preferred", "Job creation metrics"], "effective_date": "2014-10-01"},
    {"title": "UAE Defense Offset Program (Tawazun)", "country": "UAE", "category": "offset", "description": "Economic diversification through defense procurement offset obligations.", "requirements": ["60% offset obligation", "Investment in local industry", "Technology transfer included"], "effective_date": "1992-01-01"},
    {"title": "Saudi Arabia GAMI Regulations", "country": "Saudi Arabia", "category": "offset", "description": "General Authority for Military Industries localization requirements.", "requirements": ["50% localization by 2030", "Joint venture requirements", "Technology transfer mandatory"], "effective_date": "2017-05-01"},
]

# Extended Products - With Images
PRODUCTS_DATA = [
    {"name": "F-35 Lightning II", "manufacturer": "Lockheed Martin", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 1.6", "range": "2,220 km", "ceiling": "50,000 ft", "payload": "18,000 lbs"}, "materials": ["Carbon Fiber Composites", "Titanium", "Aluminum Alloys", "Stealth Coating"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/F-35A_CTOL_variant.jpg?width=800"},
    {"name": "F-22 Raptor", "manufacturer": "Lockheed Martin", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 2.25", "range": "2,960 km", "ceiling": "65,000 ft", "payload": "20,000 lbs"}, "materials": ["Carbon Fiber", "Titanium", "Thermoplastics", "Radar-Absorbing Materials"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/F-22_Raptor_edit1_(cropped).jpg?width=800"},
    {"name": "Rafale F4", "manufacturer": "Dassault Aviation", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 1.8", "range": "3,700 km", "ceiling": "50,000 ft", "payload": "21,000 lbs"}, "materials": ["Carbon Composites", "Titanium", "RBE2 AESA Radar"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Dassault_Rafale_at_Farnborough_2014.jpg?width=800"},
    {"name": "Eurofighter Typhoon", "manufacturer": "Airbus Defence & Space", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 2.0", "range": "2,900 km", "ceiling": "55,000 ft", "payload": "16,500 lbs"}, "materials": ["Carbon Fiber", "Glass Fiber", "Aluminum-Lithium"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Eurofighter_Typhoon_(Ala_11)_MG_3894_(15939726449).jpg?width=800"},
    {"name": "Gripen E", "manufacturer": "Saab AB", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 2.0", "range": "2,500 km", "ceiling": "52,000 ft", "payload": "17,500 lbs"}, "materials": ["Carbon Fiber Composites", "Aluminum Alloys"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Saab_JAS_39E_Gripen_first_flight.jpg?width=800"},
    {"name": "KF-21 Boramae", "manufacturer": "Korea Aerospace Industries", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 1.8", "range": "2,900 km", "ceiling": "55,000 ft", "payload": "17,000 lbs"}, "materials": ["Composite Materials", "Titanium", "Advanced Alloys"], "status": "development", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/KF-21_Boramae_maiden_flight.jpg?width=800"},
    {"name": "Patriot PAC-3", "manufacturer": "Raytheon Technologies", "category": "missile", "product_type": "sam", "specifications": {"range": "70 km", "altitude": "24 km", "speed": "Mach 4.1", "warhead": "Kinetic kill"}, "materials": ["Steel Alloy", "Solid Propellant", "Advanced Electronics"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Patriot_missile_launch_b.jpg?width=800"},
    {"name": "S-400 Triumf", "manufacturer": "Almaz-Antey", "category": "missile", "product_type": "sam", "specifications": {"range": "400 km", "altitude": "30 km", "speed": "Mach 14", "warhead": "Fragmentation"}, "materials": ["Steel", "Solid Fuel", "Phased Array Radar"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/S-400_Triumf_battery.jpg?width=800"},
    {"name": "Iron Dome", "manufacturer": "Rafael Advanced Defense", "category": "missile", "product_type": "sam", "specifications": {"range": "70 km", "altitude": "10 km", "intercept_rate": "90%+", "warhead": "Proximity fuse"}, "materials": ["Composite Materials", "Advanced Sensors"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Iron_Dome_battery_near_Ashkelon.jpg?width=800"},
    {"name": "THAAD", "manufacturer": "Lockheed Martin", "category": "missile", "product_type": "sam", "specifications": {"range": "200 km", "altitude": "150 km", "speed": "Mach 8+", "warhead": "Kinetic kill"}, "materials": ["Advanced Composites", "Solid Propellant"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/THAAD_Battery_(cropped).jpg?width=800"},
    {"name": "Virginia-class Submarine", "manufacturer": "General Dynamics", "category": "naval", "product_type": "submarine", "specifications": {"displacement": "7,900 tons", "length": "115 m", "speed": "25+ knots", "depth": "250+ m"}, "materials": ["HY-100 Steel", "Anechoic Tiles", "Composite Materials"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/USS_Virginia_(SSN_774)_underway.jpg?width=800"},
    {"name": "Astute-class Submarine", "manufacturer": "BAE Systems", "category": "naval", "product_type": "submarine", "specifications": {"displacement": "7,400 tons", "length": "97 m", "speed": "29 knots", "depth": "300+ m"}, "materials": ["High-Tensile Steel", "Acoustic Tiles"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/HMS_Astute_at_HMNB_Clyde.jpg?width=800"},
    {"name": "Barracuda-class Submarine", "manufacturer": "Naval Group", "category": "naval", "product_type": "submarine", "specifications": {"displacement": "5,300 tons", "length": "99 m", "speed": "25 knots", "depth": "350+ m"}, "materials": ["HLES 100 Steel", "Composite Materials"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/SNA_Suffren_(2021).jpg?width=800"},
    {"name": "M1A2 Abrams SEPv3", "manufacturer": "General Dynamics", "category": "land", "product_type": "tank", "specifications": {"weight": "73.6 tons", "speed": "67 km/h", "range": "426 km", "main_gun": "120mm"}, "materials": ["Chobham Armor", "Depleted Uranium", "Steel Alloy"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/M1A2_Abrams_in_formation.jpg?width=800"},
    {"name": "Leopard 2A7+", "manufacturer": "Krauss-Maffei Wegmann", "category": "land", "product_type": "tank", "specifications": {"weight": "67.5 tons", "speed": "72 km/h", "range": "450 km", "main_gun": "120mm L/55"}, "materials": ["Third-Gen Composite Armor", "Tungsten", "Steel"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Leopard_2A7%2B_Koblenz_2011.jpg?width=800"},
    {"name": "K2 Black Panther", "manufacturer": "Hyundai Rotem", "category": "land", "product_type": "tank", "specifications": {"weight": "55 tons", "speed": "70 km/h", "range": "450 km", "main_gun": "120mm L/55"}, "materials": ["Composite Armor", "Reactive Armor", "Advanced Alloys"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/K2_Black_Panther_at_Korea_ADEX_2013.jpg?width=800"},
    {"name": "Leclerc", "manufacturer": "Nexter Systems", "category": "land", "product_type": "tank", "specifications": {"weight": "57 tons", "speed": "71 km/h", "range": "550 km", "main_gun": "120mm"}, "materials": ["Titanium-Steel Armor", "Composite Materials"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Leclerc_tank_HD.jpg?width=800"},
    {"name": "MQ-9 Reaper", "manufacturer": "General Atomics", "category": "aircraft", "product_type": "uav", "specifications": {"max_speed": "482 km/h", "range": "1,850 km", "endurance": "27 hours", "payload": "3,750 lbs"}, "materials": ["Carbon Fiber", "Aluminum", "Composite Materials"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/MQ-9_Reaper_in_flight_(disheveled).jpg?width=800"},
    {"name": "Bayraktar TB2", "manufacturer": "Baykar", "category": "aircraft", "product_type": "uav", "specifications": {"max_speed": "220 km/h", "range": "150 km", "endurance": "27 hours", "payload": "150 kg"}, "materials": ["Carbon Fiber", "Kevlar", "Aluminum"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Bayraktar_TB2_UAS.jpg?width=800"},
    {"name": "K9 Thunder", "manufacturer": "Hanwha Defense", "category": "land", "product_type": "artillery", "specifications": {"caliber": "155mm", "range": "40 km", "rate_of_fire": "6-8 rpm", "crew": "5"}, "materials": ["Steel Armor", "Composite Materials"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/K9_Thunder_howitzer.jpg?width=800"},
    {"name": "CAESAR", "manufacturer": "Nexter Systems", "category": "land", "product_type": "artillery", "specifications": {"caliber": "155mm", "range": "42 km", "rate_of_fire": "6 rpm", "crew": "5"}, "materials": ["High-Strength Steel", "Aluminum"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/CAESAR_155mm_wheeled_self-propelled_howitzer.jpg?width=800"},
    {"name": "PzH 2000", "manufacturer": "Krauss-Maffei Wegmann", "category": "land", "product_type": "artillery", "specifications": {"caliber": "155mm", "range": "56 km", "rate_of_fire": "9 rpm", "crew": "5"}, "materials": ["Armored Steel", "Composite Materials"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/PzH_2000_(cropped).jpg?width=800"},
    {"name": "Type 26 Frigate", "manufacturer": "BAE Systems", "category": "naval", "product_type": "frigate", "specifications": {"displacement": "6,900 tons", "length": "149 m", "speed": "26+ knots", "crew": "157"}, "materials": ["Steel Hull", "Advanced Composites"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/HMS_Glasgow_(50733966826).jpg?width=800"},
    {"name": "FREMM Frigate", "manufacturer": "Fincantieri", "category": "naval", "product_type": "frigate", "specifications": {"displacement": "6,700 tons", "length": "144 m", "speed": "27 knots", "crew": "145"}, "materials": ["Steel", "Aluminum Superstructure"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/FREMM_DA_Martinengo.jpg?width=800"},
    # === Additional Aircraft ===
    {"name": "F-15EX Eagle II", "manufacturer": "Boeing Defense", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 2.5", "range": "3,900 km", "ceiling": "65,000 ft", "payload": "29,500 lbs"}, "materials": ["Aluminum Alloy", "Titanium", "Carbon Composites"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/F-15EX_Eagle_II_in_flight.jpg?width=800"},
    {"name": "F/A-18E/F Super Hornet", "manufacturer": "Boeing Defense", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 1.8", "range": "2,346 km", "ceiling": "50,000 ft", "payload": "17,750 lbs"}, "materials": ["Aluminum", "Carbon Fiber", "Titanium"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/F-A-18E_Super_Hornet_breaking_the_sound_barrier_(July_7,_1999).jpg?width=800"},
    {"name": "Su-57 Felon", "manufacturer": "United Aircraft Corporation", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 2.0", "range": "3,500 km", "ceiling": "65,000 ft", "payload": "22,000 lbs"}, "materials": ["Composite Materials", "Titanium", "RAM Coating"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Su-57_Felon.jpg?width=800"},
    {"name": "J-20 Mighty Dragon", "manufacturer": "AVIC", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 2.0+", "range": "2,000 km", "ceiling": "65,000 ft", "payload": "Unknown"}, "materials": ["Stealth Composites", "Titanium Alloys"], "status": "active", "image_url": None},
    {"name": "HAL Tejas Mk2", "manufacturer": "Hindustan Aeronautics", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 1.8", "range": "3,000 km", "ceiling": "50,000 ft", "payload": "8,000 lbs"}, "materials": ["Carbon Composites", "Aluminum-Lithium"], "status": "development", "image_url": None},
    {"name": "B-21 Raider", "manufacturer": "Northrop Grumman", "category": "aircraft", "product_type": "bomber", "specifications": {"max_speed": "Subsonic", "range": "9,000+ km", "ceiling": "50,000+ ft", "payload": "Classified"}, "materials": ["Advanced Stealth Composites", "RAM"], "status": "development", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/B-21_Raider_first_flight.jpg?width=800"},
    {"name": "B-2 Spirit", "manufacturer": "Northrop Grumman", "category": "aircraft", "product_type": "bomber", "specifications": {"max_speed": "Mach 0.95", "range": "11,000 km", "ceiling": "50,000 ft", "payload": "40,000 lbs"}, "materials": ["Carbon Fiber Composites", "Stealth Materials"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Northrop_B-2_Spirit.jpg?width=800"},
    {"name": "A-10 Thunderbolt II", "manufacturer": "Fairchild Republic", "category": "aircraft", "product_type": "attack", "specifications": {"max_speed": "706 km/h", "range": "4,150 km", "ceiling": "45,000 ft", "armament": "GAU-8 30mm"}, "materials": ["Titanium", "Aluminum Alloy"], "status": "active", "image_url": None},
    {"name": "AH-64E Apache Guardian", "manufacturer": "Boeing Defense", "category": "aircraft", "product_type": "helicopter", "specifications": {"max_speed": "293 km/h", "range": "476 km", "ceiling": "21,000 ft", "armament": "M230 30mm + Hellfire"}, "materials": ["Composite Materials", "Aluminum"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/AH-64E_Apache_Guardian.jpg?width=800"},
    {"name": "UH-60M Black Hawk", "manufacturer": "Sikorsky", "category": "aircraft", "product_type": "helicopter", "specifications": {"max_speed": "296 km/h", "range": "592 km", "ceiling": "19,000 ft", "capacity": "11 troops"}, "materials": ["Composite Rotors", "Aluminum Frame"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Sikorsky_UH-60_Black_Hawk.jpg?width=800"},
    {"name": "NH90", "manufacturer": "Airbus Defence & Space", "category": "aircraft", "product_type": "helicopter", "specifications": {"max_speed": "300 km/h", "range": "1,150 km", "ceiling": "20,000 ft", "capacity": "20 troops"}, "materials": ["All-Composite Fuselage", "Titanium Components"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/NH90_helicopter.jpg?width=800"},
    {"name": "Tigre HAD", "manufacturer": "Airbus Defence & Space", "category": "aircraft", "product_type": "helicopter", "specifications": {"max_speed": "278 km/h", "range": "800 km", "ceiling": "13,000 ft", "armament": "30mm + Hellfire"}, "materials": ["Composite Materials", "Kevlar Armor"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/HAD-Tigre.jpg?width=800"},
    {"name": "CH-47F Chinook", "manufacturer": "Boeing Defense", "category": "aircraft", "product_type": "helicopter", "specifications": {"max_speed": "315 km/h", "range": "741 km", "ceiling": "20,000 ft", "payload": "10,886 kg"}, "materials": ["Aluminum", "Glass Fiber", "Carbon Fiber"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Ch-47f_usaf.jpg?width=800"},
    {"name": "V-22 Osprey", "manufacturer": "Bell-Boeing", "category": "aircraft", "product_type": "tiltrotor", "specifications": {"max_speed": "565 km/h", "range": "1,627 km", "ceiling": "25,000 ft", "capacity": "24 troops"}, "materials": ["Graphite-Epoxy Composites", "Aluminum"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/MV-22B_Osprey.jpg?width=800"},
    {"name": "C-17 Globemaster III", "manufacturer": "Boeing Defense", "category": "aircraft", "product_type": "transport", "specifications": {"max_speed": "830 km/h", "range": "10,390 km", "ceiling": "45,000 ft", "payload": "77,519 kg"}, "materials": ["Aluminum Alloy", "Carbon Fiber"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/C-17_Globemaster_III_inflight.jpg?width=800"},
    {"name": "A400M Atlas", "manufacturer": "Airbus Defence & Space", "category": "aircraft", "product_type": "transport", "specifications": {"max_speed": "780 km/h", "range": "8,700 km", "ceiling": "40,000 ft", "payload": "37,000 kg"}, "materials": ["Carbon Fiber", "Aluminum", "Advanced Alloys"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/A400M_-_Paris_Air_Show_2013.jpg?width=800"},
    {"name": "KC-46 Pegasus", "manufacturer": "Boeing Defense", "category": "aircraft", "product_type": "tanker", "specifications": {"max_speed": "900 km/h", "range": "12,200 km", "ceiling": "40,100 ft", "fuel_capacity": "96,250 kg"}, "materials": ["Aluminum", "Carbon Composites"], "status": "active", "image_url": None},
    # === Additional UAVs/Drones ===
    {"name": "MQ-4C Triton", "manufacturer": "Northrop Grumman", "category": "aircraft", "product_type": "uav", "specifications": {"max_speed": "575 km/h", "range": "8,200 nm", "endurance": "24+ hours", "ceiling": "56,500 ft"}, "materials": ["Composite Materials", "Carbon Fiber"], "status": "active", "image_url": None},
    {"name": "RQ-4 Global Hawk", "manufacturer": "Northrop Grumman", "category": "aircraft", "product_type": "uav", "specifications": {"max_speed": "629 km/h", "range": "22,779 km", "endurance": "32 hours", "ceiling": "60,000 ft"}, "materials": ["Carbon Fiber", "Aluminum Alloys"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/RQ-4A_Global_Hawk_unmanned_aerial_vehicle.jpg?width=800"},
    {"name": "XQ-58 Valkyrie", "manufacturer": "Kratos Defense", "category": "aircraft", "product_type": "uav", "specifications": {"max_speed": "1,050 km/h", "range": "3,941 km", "ceiling": "45,000 ft", "payload": "272 kg"}, "materials": ["Composite Materials", "3D Printed Parts"], "status": "development", "image_url": None},
    {"name": "Bayraktar TB3", "manufacturer": "Baykar", "category": "aircraft", "product_type": "uav", "specifications": {"max_speed": "250 km/h", "range": "1,800 km", "endurance": "24 hours", "payload": "280 kg"}, "materials": ["Carbon Fiber", "Kevlar", "Composite Materials"], "status": "development", "image_url": None},
    {"name": "Bayraktar Kizilelma", "manufacturer": "Baykar", "category": "aircraft", "product_type": "uav", "specifications": {"max_speed": "Mach 0.9", "range": "930 km", "endurance": "5 hours", "payload": "1,500 kg"}, "materials": ["Stealth Composites", "Titanium"], "status": "development", "image_url": None},
    {"name": "Shahed-136", "manufacturer": "HESA", "category": "aircraft", "product_type": "uav", "specifications": {"max_speed": "185 km/h", "range": "2,500 km", "endurance": "N/A", "warhead": "30-50 kg"}, "materials": ["Composite Materials"], "status": "active", "image_url": None},
    {"name": "Switchblade 600", "manufacturer": "AeroVironment", "category": "missile", "product_type": "loitering_munition", "specifications": {"max_speed": "185 km/h", "range": "80 km", "endurance": "40 min", "warhead": "Anti-armor"}, "materials": ["Composite Materials", "Aluminum"], "status": "active", "image_url": None},
    {"name": "HAROP", "manufacturer": "Israel Aerospace Industries", "category": "missile", "product_type": "loitering_munition", "specifications": {"max_speed": "417 km/h", "range": "1,000 km", "endurance": "6 hours", "warhead": "23 kg"}, "materials": ["Composite Materials", "Advanced Electronics"], "status": "active", "image_url": None},
    # === Additional Missiles ===
    {"name": "Tomahawk Block V", "manufacturer": "Raytheon Technologies", "category": "missile", "product_type": "cruise_missile", "specifications": {"range": "2,500 km", "speed": "880 km/h", "guidance": "GPS/INS/DSMAC", "warhead": "450 kg"}, "materials": ["Aluminum", "Composite Materials", "Turbofan Engine"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Tomahawk_Block_IV_cruise_missile.jpg?width=800"},
    {"name": "SCALP/Storm Shadow", "manufacturer": "MBDA", "category": "missile", "product_type": "cruise_missile", "specifications": {"range": "560 km", "speed": "Mach 0.8", "guidance": "GPS/INS/TERCOM", "warhead": "BROACH"}, "materials": ["Stealth Composites", "Advanced Propellants"], "status": "active", "image_url": None},
    {"name": "AGM-158 JASSM-ER", "manufacturer": "Lockheed Martin", "category": "missile", "product_type": "cruise_missile", "specifications": {"range": "925+ km", "speed": "Subsonic", "guidance": "GPS/INS/IR", "warhead": "WDU-42/B"}, "materials": ["Stealth Materials", "Turbofan Engine"], "status": "active", "image_url": None},
    {"name": "Meteor BVRAAM", "manufacturer": "MBDA", "category": "missile", "product_type": "air_to_air", "specifications": {"range": "150+ km", "speed": "Mach 4+", "guidance": "Active Radar", "no_escape_zone": "60 km"}, "materials": ["Ramjet Propulsion", "Advanced Composites"], "status": "active", "image_url": None},
    {"name": "AIM-120D AMRAAM", "manufacturer": "Raytheon Technologies", "category": "missile", "product_type": "air_to_air", "specifications": {"range": "180+ km", "speed": "Mach 4", "guidance": "Active Radar/GPS", "warhead": "22 kg"}, "materials": ["Aluminum", "Solid Propellant"], "status": "active", "image_url": None},
    {"name": "MICA NG", "manufacturer": "MBDA", "category": "missile", "product_type": "air_to_air", "specifications": {"range": "80 km", "speed": "Mach 4", "guidance": "IR/RF", "warhead": "12 kg"}, "materials": ["Composite Materials", "Advanced Seekers"], "status": "active", "image_url": None},
    {"name": "Hellfire AGM-114R", "manufacturer": "Lockheed Martin", "category": "missile", "product_type": "air_to_ground", "specifications": {"range": "8 km", "speed": "Mach 1.3", "guidance": "Laser/Radar", "warhead": "Multipurpose"}, "materials": ["Steel", "Solid Propellant"], "status": "active", "image_url": None},
    {"name": "Brimstone 3", "manufacturer": "MBDA", "category": "missile", "product_type": "air_to_ground", "specifications": {"range": "60 km", "speed": "Mach 1.3", "guidance": "mmW Radar/Laser", "warhead": "Tandem HEAT"}, "materials": ["Composite Materials", "Advanced Seekers"], "status": "active", "image_url": None},
    {"name": "Javelin FGM-148", "manufacturer": "Raytheon/Lockheed Martin", "category": "missile", "product_type": "anti_tank", "specifications": {"range": "4.75 km", "speed": "Mach 0.5", "guidance": "IR imaging", "warhead": "Tandem HEAT"}, "materials": ["Composite Launch Tube", "Solid Propellant"], "status": "active", "image_url": None},
    {"name": "Spike NLOS", "manufacturer": "Rafael Advanced Defense", "category": "missile", "product_type": "anti_tank", "specifications": {"range": "32 km", "speed": "180 m/s", "guidance": "Fiber-optic/EO", "warhead": "Tandem HEAT"}, "materials": ["Composite Materials", "EO/IR Seeker"], "status": "active", "image_url": None},
    {"name": "NSM Naval Strike Missile", "manufacturer": "Kongsberg Defence", "category": "missile", "product_type": "anti_ship", "specifications": {"range": "185 km", "speed": "Subsonic", "guidance": "GPS/INS/IR", "warhead": "125 kg"}, "materials": ["Stealth Composites", "Turbofan"], "status": "active", "image_url": None},
    {"name": "Harpoon Block II", "manufacturer": "Boeing Defense", "category": "missile", "product_type": "anti_ship", "specifications": {"range": "280 km", "speed": "Mach 0.85", "guidance": "GPS/INS/Radar", "warhead": "221 kg"}, "materials": ["Aluminum", "Turbofan Engine"], "status": "active", "image_url": None},
    {"name": "ASTER 30 SAMP/T", "manufacturer": "MBDA", "category": "missile", "product_type": "sam", "specifications": {"range": "120 km", "altitude": "20 km", "speed": "Mach 4.5", "guidance": "Active Radar"}, "materials": ["Composite Materials", "Solid Propellant"], "status": "active", "image_url": None},
    {"name": "NASAMS", "manufacturer": "Kongsberg/Raytheon", "category": "missile", "product_type": "sam", "specifications": {"range": "30 km", "altitude": "15 km", "speed": "Mach 3", "missiles": "AMRAAM/AIM-9X"}, "materials": ["Aluminum", "Mobile Launchers"], "status": "active", "image_url": None},
    {"name": "David's Sling", "manufacturer": "Rafael/Raytheon", "category": "missile", "product_type": "sam", "specifications": {"range": "300 km", "altitude": "15 km", "speed": "Mach 7.5", "guidance": "Multi-mode"}, "materials": ["Advanced Composites", "Dual-Pulse Motor"], "status": "active", "image_url": None},
    {"name": "CAMM-ER", "manufacturer": "MBDA", "category": "missile", "product_type": "sam", "specifications": {"range": "45+ km", "altitude": "10 km", "speed": "Mach 3+", "guidance": "Active Radar"}, "materials": ["Composite Materials", "Solid Propellant"], "status": "active", "image_url": None},
    {"name": "AGM-183A ARRW", "manufacturer": "Lockheed Martin", "category": "missile", "product_type": "hypersonic", "specifications": {"range": "1,600+ km", "speed": "Mach 20", "guidance": "INS", "warhead": "Conventional"}, "materials": ["Thermal Protection", "Advanced Alloys"], "status": "development", "image_url": None},
    {"name": "Kinzhal", "manufacturer": "Tactical Missiles Corporation", "category": "missile", "product_type": "hypersonic", "specifications": {"range": "2,000 km", "speed": "Mach 10+", "guidance": "INS/Radar", "warhead": "500 kg"}, "materials": ["Heat-Resistant Alloys"], "status": "active", "image_url": None},
    # === Additional Naval Systems ===
    {"name": "Arleigh Burke Flight III", "manufacturer": "Huntington Ingalls", "category": "naval", "product_type": "destroyer", "specifications": {"displacement": "9,700 tons", "length": "155 m", "speed": "30+ knots", "crew": "380"}, "materials": ["Steel Hull", "Aluminum Superstructure"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/USS_Arleigh_Burke_(DDG-51).jpg?width=800"},
    {"name": "Type 45 Daring-class", "manufacturer": "BAE Systems", "category": "naval", "product_type": "destroyer", "specifications": {"displacement": "8,500 tons", "length": "152 m", "speed": "29 knots", "crew": "190"}, "materials": ["Steel", "Composite Mast"], "status": "active", "image_url": None},
    {"name": "Horizon-class Frigate", "manufacturer": "Naval Group", "category": "naval", "product_type": "frigate", "specifications": {"displacement": "7,050 tons", "length": "153 m", "speed": "29 knots", "crew": "195"}, "materials": ["Steel", "Composite Materials"], "status": "active", "image_url": None},
    {"name": "MEKO A-200", "manufacturer": "ThyssenKrupp Marine", "category": "naval", "product_type": "frigate", "specifications": {"displacement": "3,700 tons", "length": "121 m", "speed": "28 knots", "crew": "120"}, "materials": ["Steel Hull", "Modular Design"], "status": "active", "image_url": None},
    {"name": "Independence-class LCS", "manufacturer": "Austal", "category": "naval", "product_type": "littoral_combat_ship", "specifications": {"displacement": "3,104 tons", "length": "127 m", "speed": "47 knots", "crew": "40"}, "materials": ["Aluminum Trimaran", "Steel"], "status": "active", "image_url": None},
    {"name": "Mistral-class LHD", "manufacturer": "Naval Group", "category": "naval", "product_type": "amphibious", "specifications": {"displacement": "21,300 tons", "length": "199 m", "speed": "19 knots", "aircraft": "16 helicopters"}, "materials": ["Steel", "Aluminum Superstructure"], "status": "active", "image_url": None},
    {"name": "Gerald R. Ford-class", "manufacturer": "Huntington Ingalls", "category": "naval", "product_type": "aircraft_carrier", "specifications": {"displacement": "100,000 tons", "length": "337 m", "speed": "30+ knots", "aircraft": "75+"}, "materials": ["Steel", "EMALS Catapults"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/USS_Gerald_R._Ford_(CVN-78).jpg?width=800"},
    {"name": "Queen Elizabeth-class", "manufacturer": "BAE Systems", "category": "naval", "product_type": "aircraft_carrier", "specifications": {"displacement": "65,000 tons", "length": "284 m", "speed": "25 knots", "aircraft": "40"}, "materials": ["Steel", "Ski-Jump Ramp"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/HMS_Queen_Elizabeth_R08.jpg?width=800"},
    {"name": "Charles de Gaulle", "manufacturer": "Naval Group", "category": "naval", "product_type": "aircraft_carrier", "specifications": {"displacement": "42,500 tons", "length": "261 m", "speed": "27 knots", "aircraft": "40"}, "materials": ["Steel", "Nuclear Propulsion"], "status": "active", "image_url": None},
    {"name": "Columbia-class Submarine", "manufacturer": "General Dynamics", "category": "naval", "product_type": "submarine", "specifications": {"displacement": "20,810 tons", "length": "171 m", "speed": "20+ knots", "missiles": "16 Trident II"}, "materials": ["HY-100 Steel", "Advanced Quieting"], "status": "development", "image_url": None},
    {"name": "Dreadnought-class Submarine", "manufacturer": "BAE Systems", "category": "naval", "product_type": "submarine", "specifications": {"displacement": "17,200 tons", "length": "153 m", "speed": "25+ knots", "missiles": "12 Trident II"}, "materials": ["High-Tensile Steel", "PWR3 Reactor"], "status": "development", "image_url": None},
    {"name": "Le Triomphant-class", "manufacturer": "Naval Group", "category": "naval", "product_type": "submarine", "specifications": {"displacement": "14,335 tons", "length": "138 m", "speed": "25 knots", "missiles": "16 M51"}, "materials": ["HY-80 Steel", "Nuclear Propulsion"], "status": "active", "image_url": None},
    # === Additional Land Systems ===
    {"name": "Challenger 3", "manufacturer": "Rheinmetall BAE Systems", "category": "land", "product_type": "tank", "specifications": {"weight": "66 tons", "speed": "60 km/h", "range": "550 km", "main_gun": "120mm L/55"}, "materials": ["Chobham Armor", "Composite Materials"], "status": "development", "image_url": None},
    {"name": "T-14 Armata", "manufacturer": "Uralvagonzavod", "category": "land", "product_type": "tank", "specifications": {"weight": "55 tons", "speed": "80 km/h", "range": "500 km", "main_gun": "125mm 2A82-1M"}, "materials": ["Composite Armor", "Active Protection"], "status": "development", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/T-14_Armata_(cropped).jpg?width=800"},
    {"name": "Type 10 Hitomaru", "manufacturer": "Mitsubishi Heavy Industries", "category": "land", "product_type": "tank", "specifications": {"weight": "44 tons", "speed": "70 km/h", "range": "300 km", "main_gun": "120mm"}, "materials": ["Modular Armor", "Composite Materials"], "status": "active", "image_url": None},
    {"name": "Merkava Mk 4M", "manufacturer": "Israel Military Industries", "category": "land", "product_type": "tank", "specifications": {"weight": "65 tons", "speed": "64 km/h", "range": "500 km", "main_gun": "120mm"}, "materials": ["Composite Armor", "Trophy APS"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Merkava_4M_Windbreaker.jpg?width=800"},
    {"name": "VBCI", "manufacturer": "Nexter Systems", "category": "land", "product_type": "ifv", "specifications": {"weight": "28 tons", "speed": "100 km/h", "range": "750 km", "armament": "25mm"}, "materials": ["Steel Armor", "Modular Design"], "status": "active", "image_url": None},
    {"name": "CV90 Mk IV", "manufacturer": "BAE Systems", "category": "land", "product_type": "ifv", "specifications": {"weight": "35 tons", "speed": "70 km/h", "range": "600 km", "armament": "35mm"}, "materials": ["Steel/Titanium Hybrid", "Rubber Tracks"], "status": "active", "image_url": None},
    {"name": "Puma IFV", "manufacturer": "Rheinmetall", "category": "land", "product_type": "ifv", "specifications": {"weight": "43 tons", "speed": "70 km/h", "range": "450 km", "armament": "30mm"}, "materials": ["Composite Armor", "AMAP"], "status": "active", "image_url": None},
    {"name": "VBMR Griffon", "manufacturer": "Nexter/Arquus/Thales", "category": "land", "product_type": "apc", "specifications": {"weight": "24.5 tons", "speed": "90 km/h", "range": "800 km", "capacity": "8 troops"}, "materials": ["Steel Armor", "SCORPION System"], "status": "active", "image_url": None},
    {"name": "Boxer MRAV", "manufacturer": "ARTEC", "category": "land", "product_type": "apc", "specifications": {"weight": "33 tons", "speed": "103 km/h", "range": "1,050 km", "modular": "Yes"}, "materials": ["Modular Armor", "Steel/Composite"], "status": "active", "image_url": None},
    {"name": "Stryker ICVV", "manufacturer": "General Dynamics", "category": "land", "product_type": "apc", "specifications": {"weight": "18.8 tons", "speed": "97 km/h", "range": "500 km", "capacity": "9 troops"}, "materials": ["Ceramic/Steel Armor", "Run-flat Tires"], "status": "active", "image_url": None},
    {"name": "M270 MLRS", "manufacturer": "Lockheed Martin", "category": "land", "product_type": "mlrs", "specifications": {"rockets": "12 x 227mm", "range": "300 km", "reload_time": "5 min", "crew": "3"}, "materials": ["Steel", "Aluminum Launcher"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/M270_Multiple_Launch_Rocket_System.jpg?width=800"},
    {"name": "HIMARS", "manufacturer": "Lockheed Martin", "category": "land", "product_type": "mlrs", "specifications": {"rockets": "6 x 227mm", "range": "300 km", "weight": "16,000 kg", "crew": "3"}, "materials": ["Aluminum", "FMTV Chassis"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/M142_HIMARS.jpg?width=800"},
    {"name": "LRU (Lance-Roquettes Unitaire)", "manufacturer": "Nexter/Lockheed Martin", "category": "land", "product_type": "mlrs", "specifications": {"rockets": "2 x GMLRS", "range": "70 km", "reload_time": "3 min", "crew": "2"}, "materials": ["Steel Frame", "CAESAR Platform"], "status": "active", "image_url": None},
    {"name": "ARCHER 155mm", "manufacturer": "BAE Systems", "category": "land", "product_type": "artillery", "specifications": {"caliber": "155mm", "range": "50 km", "rate_of_fire": "9 rpm", "crew": "3-4"}, "materials": ["Steel", "Volvo Chassis"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Archer_artillery_system.jpg?width=800"},
    # === Space & Cyber Systems ===
    {"name": "GPS III Satellite", "manufacturer": "Lockheed Martin", "category": "space", "product_type": "navigation_satellite", "specifications": {"orbit": "MEO 20,200 km", "accuracy": "1m", "lifespan": "15 years", "signals": "L1C/L2C/L5"}, "materials": ["Aluminum", "Solar Arrays", "Advanced Electronics"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/GPS-IIF-1_satellite.jpg?width=800"},
    {"name": "SBIRS GEO", "manufacturer": "Lockheed Martin", "category": "space", "product_type": "early_warning_satellite", "specifications": {"orbit": "GEO 35,786 km", "sensor": "IR", "coverage": "Hemisphere", "lifespan": "12 years"}, "materials": ["Composite Structure", "IR Sensors"], "status": "active", "image_url": "https://images.unsplash.com/photo-1762452136301-cca9fb2e55a8?w=800"},
    {"name": "Syracuse IV", "manufacturer": "Thales/Airbus", "category": "space", "product_type": "communications_satellite", "specifications": {"orbit": "GEO", "bandwidth": "X/Ka band", "coverage": "Global", "lifespan": "15 years"}, "materials": ["Carbon Composites", "Spacebus Platform"], "status": "active", "image_url": None},
    {"name": "Helios 2", "manufacturer": "Thales Alenia Space", "category": "space", "product_type": "reconnaissance_satellite", "specifications": {"orbit": "SSO 680 km", "resolution": "<35 cm", "coverage": "Global", "lifespan": "5 years"}, "materials": ["Composite Materials", "Optical Payload"], "status": "active", "image_url": None},
    {"name": "X-37B Space Plane", "manufacturer": "Boeing Defense", "category": "space", "product_type": "spaceplane", "specifications": {"length": "8.9 m", "wingspan": "4.5 m", "orbit": "LEO", "endurance": "900+ days"}, "materials": ["Thermal Tiles", "Composite Fuselage"], "status": "active", "image_url": None},
    {"name": "SATCOM Terminal AN/TSC-156", "manufacturer": "L3Harris Technologies", "category": "cyber", "product_type": "communications", "specifications": {"bands": "X/Ku/Ka", "mobility": "Transportable", "bandwidth": "155 Mbps", "setup_time": "30 min"}, "materials": ["Ruggedized Electronics", "Portable Antenna"], "status": "active", "image_url": None},
    {"name": "Cyber Operations Platform", "manufacturer": "Palantir Technologies", "category": "cyber", "product_type": "software", "specifications": {"type": "AI/ML Analytics", "deployment": "Cloud/On-Prem", "integration": "Multi-domain", "classification": "TS/SCI"}, "materials": ["Software Platform", "Big Data Analytics"], "status": "active", "image_url": None},
    {"name": "AN/ALQ-99 Jammer", "manufacturer": "L3Harris Technologies", "category": "cyber", "product_type": "electronic_warfare", "specifications": {"bands": "Multi-band", "platform": "EA-18G", "power": "High", "coverage": "Wide"}, "materials": ["Advanced Electronics", "Podded System"], "status": "active", "image_url": None},
    {"name": "SPECTRA EW Suite", "manufacturer": "Thales", "category": "cyber", "product_type": "electronic_warfare", "specifications": {"functions": "RWR/Jammer/Decoy", "platform": "Rafale", "integration": "Fully Integrated", "bands": "Multi-band"}, "materials": ["Advanced Electronics", "Composite Housings"], "status": "active", "image_url": None},
    # === Additional Products (Extended) ===
    {"name": "F-16 Block 70/72", "manufacturer": "Lockheed Martin", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 2.0", "range": "4,220 km", "ceiling": "50,000 ft", "payload": "17,000 lbs"}, "materials": ["Aluminum", "Composite Materials"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/General_Dynamics_F-16_Fighting_Falcon.jpg?width=800"},
    {"name": "E-7A Wedgetail", "manufacturer": "Boeing Defense", "category": "aircraft", "product_type": "awacs", "specifications": {"max_speed": "955 km/h", "range": "6,500 km", "ceiling": "41,000 ft", "radar": "MESA"}, "materials": ["Boeing 737-700 Airframe", "Advanced Radar"], "status": "active", "image_url": None},
    {"name": "P-8A Poseidon", "manufacturer": "Boeing Defense", "category": "aircraft", "product_type": "patrol", "specifications": {"max_speed": "907 km/h", "range": "8,300 km", "ceiling": "41,000 ft", "armament": "Torpedoes/Missiles"}, "materials": ["Boeing 737-800 Airframe", "Sonobuoys"], "status": "active", "image_url": None},
    {"name": "E-2D Advanced Hawkeye", "manufacturer": "Northrop Grumman", "category": "aircraft", "product_type": "awacs", "specifications": {"max_speed": "648 km/h", "range": "2,708 km", "ceiling": "34,700 ft", "radar": "AN/APY-9"}, "materials": ["Composite Materials", "Twin Turboprop"], "status": "active", "image_url": None},
    {"name": "KC-135 Stratotanker", "manufacturer": "Boeing Defense", "category": "aircraft", "product_type": "tanker", "specifications": {"max_speed": "933 km/h", "range": "2,419 km", "ceiling": "50,000 ft", "fuel_capacity": "90,719 kg"}, "materials": ["Aluminum", "Boeing 707 Airframe"], "status": "active", "image_url": None},
    {"name": "MQ-1C Gray Eagle", "manufacturer": "General Atomics", "category": "aircraft", "product_type": "uav", "specifications": {"max_speed": "280 km/h", "range": "400 km", "endurance": "25 hours", "payload": "488 kg"}, "materials": ["Carbon Fiber", "Composite Materials"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/MQ-1C_Gray_Eagle.jpg?width=800"},
    {"name": "AN/TPS-80 G/ATOR", "manufacturer": "Northrop Grumman", "category": "cyber", "product_type": "radar", "specifications": {"range": "300 km", "type": "3D AESA", "mobility": "Transportable", "tracks": "500+"}, "materials": ["Advanced Electronics", "Trailer Mounted"], "status": "active", "image_url": None},
    {"name": "Trophy APS", "manufacturer": "Rafael Advanced Defense", "category": "land", "product_type": "active_protection", "specifications": {"type": "Hard-kill", "reaction_time": "Milliseconds", "coverage": "360°", "intercepts": "RPG/ATGM"}, "materials": ["Radar", "Explosive Countermeasures"], "status": "active", "image_url": None},
    {"name": "Iron Fist APS", "manufacturer": "Elbit Systems", "category": "land", "product_type": "active_protection", "specifications": {"type": "Hard-kill", "weight": "200 kg", "coverage": "Hemisphere", "intercepts": "RPG/ATGM"}, "materials": ["Sensors", "Countermeasure Grenades"], "status": "active", "image_url": None},
    {"name": "Namer APC", "manufacturer": "Israel Military Industries", "category": "land", "product_type": "apc", "specifications": {"weight": "60 tons", "speed": "60 km/h", "range": "500 km", "capacity": "9 troops"}, "materials": ["Merkava Hull", "Trophy APS"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Namer_APC.jpg?width=800"},
    {"name": "Bradley M2A4", "manufacturer": "BAE Systems", "category": "land", "product_type": "ifv", "specifications": {"weight": "30 tons", "speed": "66 km/h", "range": "483 km", "armament": "25mm + TOW"}, "materials": ["Aluminum Armor", "Iron Fist APS"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/M2_Bradley_fighting_vehicle.jpg?width=800"},
    {"name": "Marder IFV", "manufacturer": "Rheinmetall", "category": "land", "product_type": "ifv", "specifications": {"weight": "33 tons", "speed": "65 km/h", "range": "520 km", "armament": "20mm"}, "materials": ["Steel Armor", "Composite Materials"], "status": "active", "image_url": None},
    {"name": "AMX-10RC", "manufacturer": "Nexter Systems", "category": "land", "product_type": "reconnaissance", "specifications": {"weight": "17 tons", "speed": "85 km/h", "range": "800 km", "armament": "105mm"}, "materials": ["Aluminum Armor", "6x6 Wheeled"], "status": "active", "image_url": None},
    {"name": "Piranha V", "manufacturer": "GDELS", "category": "land", "product_type": "apc", "specifications": {"weight": "30 tons", "speed": "100 km/h", "range": "700 km", "capacity": "11 troops"}, "materials": ["Steel Armor", "8x8 Wheeled"], "status": "active", "image_url": None},
    {"name": "Pandur II", "manufacturer": "GDELS", "category": "land", "product_type": "apc", "specifications": {"weight": "22 tons", "speed": "105 km/h", "range": "700 km", "capacity": "8 troops"}, "materials": ["Steel", "8x8 Wheeled"], "status": "active", "image_url": None},
    {"name": "Arjun Mk-1A", "manufacturer": "Hindustan Aeronautics", "category": "land", "product_type": "tank", "specifications": {"weight": "68.25 tons", "speed": "58 km/h", "range": "450 km", "main_gun": "120mm"}, "materials": ["Kanchan Armor", "ERA"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Arjun_Mk_1A.jpg?width=800"},
    {"name": "Altay Tank", "manufacturer": "BMC Turkey", "category": "land", "product_type": "tank", "specifications": {"weight": "65 tons", "speed": "70 km/h", "range": "500 km", "main_gun": "120mm"}, "materials": ["Modular Armor", "APS"], "status": "development", "image_url": None},
    {"name": "VT-4 Tank", "manufacturer": "Norinco", "category": "land", "product_type": "tank", "specifications": {"weight": "52 tons", "speed": "70 km/h", "range": "500 km", "main_gun": "125mm"}, "materials": ["Composite Armor", "ERA"], "status": "active", "image_url": None},
    {"name": "Zumwalt-class Destroyer", "manufacturer": "General Dynamics", "category": "naval", "product_type": "destroyer", "specifications": {"displacement": "15,656 tons", "length": "190 m", "speed": "30+ knots", "crew": "148"}, "materials": ["Tumblehome Hull", "Stealth Design"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/USS_Zumwalt_Destroyer.jpg?width=800"},
    {"name": "Constellation-class Frigate", "manufacturer": "Fincantieri", "category": "naval", "product_type": "frigate", "specifications": {"displacement": "7,291 tons", "length": "151 m", "speed": "26+ knots", "crew": "200"}, "materials": ["Steel", "FREMM Design"], "status": "development", "image_url": None},
    {"name": "Gowind-class Corvette", "manufacturer": "Naval Group", "category": "naval", "product_type": "corvette", "specifications": {"displacement": "2,500 tons", "length": "102 m", "speed": "25+ knots", "crew": "80"}, "materials": ["Steel", "Stealth Design"], "status": "active", "image_url": None},
    {"name": "Visby-class Corvette", "manufacturer": "Saab Kockums", "category": "naval", "product_type": "corvette", "specifications": {"displacement": "640 tons", "length": "73 m", "speed": "35 knots", "crew": "43"}, "materials": ["Carbon Fiber", "Stealth Hull"], "status": "active", "image_url": None},
    {"name": "Sa'ar 6 Corvette", "manufacturer": "ThyssenKrupp Marine", "category": "naval", "product_type": "corvette", "specifications": {"displacement": "1,900 tons", "length": "90 m", "speed": "26 knots", "crew": "70"}, "materials": ["Steel", "Iron Dome Integration"], "status": "active", "image_url": None},
    {"name": "Scorpene-class Submarine", "manufacturer": "Naval Group", "category": "naval", "product_type": "submarine", "specifications": {"displacement": "1,870 tons", "length": "67 m", "speed": "20+ knots", "depth": "300+ m"}, "materials": ["HY-80 Steel", "AIP Option"], "status": "active", "image_url": "https://images.unsplash.com/photo-1707622058621-6228998d84bc?w=800"},
    {"name": "Type 212 Submarine", "manufacturer": "ThyssenKrupp Marine", "category": "naval", "product_type": "submarine", "specifications": {"displacement": "1,830 tons", "length": "56 m", "speed": "20 knots", "depth": "400 m"}, "materials": ["Amagnetic Steel", "Fuel Cell AIP"], "status": "active", "image_url": None},
    {"name": "Soryu-class Submarine", "manufacturer": "Mitsubishi/Kawasaki", "category": "naval", "product_type": "submarine", "specifications": {"displacement": "4,200 tons", "length": "84 m", "speed": "20 knots", "depth": "300+ m"}, "materials": ["NS110 Steel", "Lithium-ion Battery"], "status": "active", "image_url": None},
    {"name": "AGM-88G AARGM-ER", "manufacturer": "Northrop Grumman", "category": "missile", "product_type": "anti_radiation", "specifications": {"range": "300+ km", "speed": "Mach 2+", "guidance": "GPS/INS/Anti-radiation", "warhead": "Blast-frag"}, "materials": ["Composite", "Solid Propellant"], "status": "active", "image_url": None},
    {"name": "Exocet MM40 Block 3", "manufacturer": "MBDA", "category": "missile", "product_type": "anti_ship", "specifications": {"range": "200 km", "speed": "Mach 0.93", "guidance": "GPS/INS/Radar", "warhead": "165 kg"}, "materials": ["Turbojet", "Composite Materials"], "status": "active", "image_url": None},
    {"name": "RBS-15 Mk4", "manufacturer": "Saab AB", "category": "missile", "product_type": "anti_ship", "specifications": {"range": "300+ km", "speed": "Subsonic", "guidance": "GPS/INS/Radar", "warhead": "200 kg"}, "materials": ["Turbojet", "Stealth Design"], "status": "active", "image_url": None},
    {"name": "LRASM AGM-158C", "manufacturer": "Lockheed Martin", "category": "missile", "product_type": "anti_ship", "specifications": {"range": "370+ km", "speed": "Subsonic", "guidance": "GPS/INS/AI", "warhead": "454 kg"}, "materials": ["Stealth Composites", "Turbofan"], "status": "active", "image_url": "https://images.unsplash.com/photo-1714381634802-5951069bd792?w=800"},
    {"name": "BrahMos", "manufacturer": "BrahMos Aerospace", "category": "missile", "product_type": "cruise_missile", "specifications": {"range": "450 km", "speed": "Mach 2.8", "guidance": "GPS/INS/Radar", "warhead": "300 kg"}, "materials": ["Ramjet", "Titanium Alloys"], "status": "active", "image_url": None},
    {"name": "SM-6 Standard Missile", "manufacturer": "Raytheon Technologies", "category": "missile", "product_type": "sam", "specifications": {"range": "370+ km", "altitude": "33 km", "speed": "Mach 3.5", "guidance": "Active Radar"}, "materials": ["Solid Propellant", "Advanced Seeker"], "status": "active", "image_url": None},
    {"name": "Starstreak HVM", "manufacturer": "Thales", "category": "missile", "product_type": "manpads", "specifications": {"range": "7 km", "speed": "Mach 4", "guidance": "Laser Beam", "warhead": "Kinetic Darts"}, "materials": ["Composite", "Laser Guidance"], "status": "active", "image_url": None},
    {"name": "Mistral MANPADS", "manufacturer": "MBDA", "category": "missile", "product_type": "manpads", "specifications": {"range": "6.5 km", "speed": "Mach 2.5", "guidance": "IR", "warhead": "3 kg"}, "materials": ["Composite", "IR Seeker"], "status": "active", "image_url": None},
    {"name": "Stinger FIM-92", "manufacturer": "Raytheon Technologies", "category": "missile", "product_type": "manpads", "specifications": {"range": "4.8 km", "speed": "Mach 2.2", "guidance": "IR", "warhead": "3 kg"}, "materials": ["Composite", "Dual-Band IR"], "status": "active", "image_url": None},
    {"name": "VL-MICA", "manufacturer": "MBDA", "category": "missile", "product_type": "sam", "specifications": {"range": "25 km", "altitude": "9 km", "speed": "Mach 3", "guidance": "IR/RF"}, "materials": ["Solid Propellant", "VLS Compatible"], "status": "active", "image_url": None},
    {"name": "Akash-NG", "manufacturer": "DRDO", "category": "missile", "product_type": "sam", "specifications": {"range": "80 km", "altitude": "20 km", "speed": "Mach 4", "guidance": "Active Radar"}, "materials": ["Solid Propellant", "Indigenous"], "status": "development", "image_url": None},
    {"name": "SPYDER-MR", "manufacturer": "Rafael Advanced Defense", "category": "missile", "product_type": "sam", "specifications": {"range": "50 km", "altitude": "16 km", "speed": "Mach 4", "missiles": "Python-5/Derby"}, "materials": ["Mobile Launcher", "Quick Reaction"], "status": "active", "image_url": None},
    # === Additional Aircraft ===
    {"name": "Su-35S Flanker-E", "manufacturer": "Sukhoi/UAC", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 2.25", "range": "3,600 km", "ceiling": "59,100 ft", "payload": "17,630 lbs"}, "materials": ["Titanium", "Composite Materials", "RAM Coating"], "status": "active", "image_url": None},
    {"name": "Tornado IDS", "manufacturer": "Panavia Aircraft", "category": "aircraft", "product_type": "attack", "specifications": {"max_speed": "Mach 2.2", "range": "3,890 km", "ceiling": "50,000 ft", "payload": "19,841 lbs"}, "materials": ["Aluminum Alloy", "Titanium", "Steel"], "status": "active", "image_url": None},
    {"name": "AV-8B Harrier II", "manufacturer": "Boeing Defense", "category": "aircraft", "product_type": "attack", "specifications": {"max_speed": "1,065 km/h", "range": "3,015 km", "ceiling": "50,000 ft", "payload": "9,415 lbs"}, "materials": ["Composite Materials", "Aluminum Alloy"], "status": "active", "image_url": None},
    {"name": "Eurodrone MALE", "manufacturer": "Airbus Defence & Space", "category": "aircraft", "product_type": "uav", "specifications": {"max_speed": "250 km/h", "range": "10,000 km", "endurance": "40 hours", "ceiling": "45,000 ft"}, "materials": ["Carbon Fiber Composites", "Advanced Avionics"], "status": "development", "image_url": None},
    {"name": "Heron TP", "manufacturer": "Israel Aerospace Industries", "category": "aircraft", "product_type": "uav", "specifications": {"max_speed": "220 km/h", "range": "1,000 km", "endurance": "52 hours", "payload": "1,000 kg"}, "materials": ["Composite Materials", "Carbon Fiber"], "status": "active", "image_url": None},
    {"name": "Wing Loong II", "manufacturer": "AVIC", "category": "aircraft", "product_type": "uav", "specifications": {"max_speed": "370 km/h", "range": "6,000 km", "endurance": "32 hours", "payload": "480 kg"}, "materials": ["Composite Materials", "Aluminum Alloy"], "status": "active", "image_url": None},
    {"name": "AC-130J Ghostrider", "manufacturer": "Lockheed Martin", "category": "aircraft", "product_type": "gunship", "specifications": {"max_speed": "643 km/h", "range": "6,852 km", "ceiling": "33,000 ft", "armament": "30mm/105mm/SDB"}, "materials": ["Aluminum Alloy", "Carbon Composites"], "status": "active", "image_url": None},
    # === Additional Missiles ===
    {"name": "Taurus KEPD 350", "manufacturer": "MBDA/Saab", "category": "missile", "product_type": "cruise_missile", "specifications": {"range": "500 km", "speed": "Mach 0.95", "guidance": "GPS/INS/TERCOM", "warhead": "MEPHISTO 481 kg"}, "materials": ["Stealth Composites", "Turbofan Engine"], "status": "active", "image_url": None},
    {"name": "IRIS-T SLM", "manufacturer": "Diehl Defence", "category": "missile", "product_type": "sam", "specifications": {"range": "40 km", "altitude": "20 km", "speed": "Mach 3+", "guidance": "IR Imaging"}, "materials": ["Composite Materials", "Mobile Launcher"], "status": "active", "image_url": None},
    {"name": "Arrow 3", "manufacturer": "Israel Aerospace Industries", "category": "missile", "product_type": "anti_ballistic", "specifications": {"range": "2,400 km", "altitude": "100 km", "speed": "Mach 9", "guidance": "Multi-mode Radar"}, "materials": ["Advanced Composites", "Dual-Pulse Motor"], "status": "active", "image_url": None},
    {"name": "PrSM Precision Strike Missile", "manufacturer": "Lockheed Martin", "category": "missile", "product_type": "precision_strike", "specifications": {"range": "500+ km", "speed": "Supersonic", "guidance": "GPS/INS/Multi-mode", "warhead": "Unitary"}, "materials": ["Composite Airframe", "Solid Propellant"], "status": "active", "image_url": None},
    {"name": "Sea Venom", "manufacturer": "MBDA", "category": "missile", "product_type": "air_to_ship", "specifications": {"range": "20 km", "speed": "Subsonic", "guidance": "INS/IR Imaging", "warhead": "30 kg"}, "materials": ["Composite Materials", "Imaging Seeker"], "status": "active", "image_url": None},
    {"name": "Barak 8 LRSAM", "manufacturer": "Israel Aerospace Industries", "category": "missile", "product_type": "sam", "specifications": {"range": "70 km", "altitude": "16 km", "speed": "Mach 2", "guidance": "Active Radar"}, "materials": ["Solid Propellant", "Advanced Electronics"], "status": "active", "image_url": None},
    {"name": "RIM-161 SM-3", "manufacturer": "Raytheon Technologies", "category": "missile", "product_type": "anti_ballistic", "specifications": {"range": "700 km", "altitude": "250 km", "speed": "Mach 10+", "guidance": "Kinetic Warhead"}, "materials": ["Advanced Composites", "3-Stage Propulsion"], "status": "active", "image_url": None},
    {"name": "Spike ER2", "manufacturer": "Rafael Advanced Defense", "category": "missile", "product_type": "anti_tank", "specifications": {"range": "16 km", "speed": "180 m/s", "guidance": "EO/IR Multi-mode", "warhead": "Tandem HEAT"}, "materials": ["Composite Airframe", "Dual Seeker"], "status": "active", "image_url": None},
    # === Additional Naval Systems ===
    {"name": "Type 055 Destroyer", "manufacturer": "CSSC", "category": "naval", "product_type": "destroyer", "specifications": {"displacement": "13,000 tons", "length": "180 m", "speed": "30+ knots", "crew": "310"}, "materials": ["Steel Hull", "Stealth Design", "Phased Array Radar"], "status": "active", "image_url": None},
    {"name": "HNLMS De Ruyter-class", "manufacturer": "Damen Naval", "category": "naval", "product_type": "frigate", "specifications": {"displacement": "6,050 tons", "length": "144 m", "speed": "28+ knots", "crew": "202"}, "materials": ["Steel Hull", "APAR Radar"], "status": "active", "image_url": None},
    {"name": "INS Vikrant", "manufacturer": "Cochin Shipyard", "category": "naval", "product_type": "aircraft_carrier", "specifications": {"displacement": "45,000 tons", "length": "262 m", "speed": "28 knots", "aircraft": "30"}, "materials": ["Indian DH36 Steel", "STOBAR Configuration"], "status": "active", "image_url": None},
    {"name": "Type 31 Frigate", "manufacturer": "BAE Systems", "category": "naval", "product_type": "frigate", "specifications": {"displacement": "5,700 tons", "length": "138 m", "speed": "24 knots", "crew": "100"}, "materials": ["Steel Hull", "Modular Design"], "status": "development", "image_url": None},
    {"name": "F126 Frigate", "manufacturer": "Damen Naval", "category": "naval", "product_type": "frigate", "specifications": {"displacement": "10,000 tons", "length": "166 m", "speed": "26 knots", "crew": "110"}, "materials": ["Steel", "Advanced Composites"], "status": "development", "image_url": None},
    # === Additional Land Systems ===
    {"name": "K21 IFV", "manufacturer": "Hyundai Rotem", "category": "land", "product_type": "ifv", "specifications": {"weight": "25 tons", "speed": "70 km/h", "range": "500 km", "armament": "40mm"}, "materials": ["Aluminum Armor", "Composite Hull"], "status": "active", "image_url": None},
    {"name": "JLTV", "manufacturer": "Oshkosh Defense", "category": "land", "product_type": "tactical_vehicle", "specifications": {"weight": "6.4 tons", "speed": "113 km/h", "range": "700 km", "payload": "1,587 kg"}, "materials": ["Advanced Steel Armor", "Blast-Resistant Floor"], "status": "active", "image_url": None},
    {"name": "M109A7 Paladin", "manufacturer": "BAE Systems", "category": "land", "product_type": "artillery", "specifications": {"caliber": "155mm", "range": "40 km", "rate_of_fire": "4 rpm", "crew": "5"}, "materials": ["Steel Armor", "Bradley Hull"], "status": "active", "image_url": None},
    {"name": "Zuzana 2", "manufacturer": "Konštrukta-Defence", "category": "land", "product_type": "artillery", "specifications": {"caliber": "155mm", "range": "52 km", "rate_of_fire": "6 rpm", "crew": "3"}, "materials": ["Steel Armor", "Autonomous Loading"], "status": "active", "image_url": None},
    {"name": "AS-90 Braveheart", "manufacturer": "BAE Systems", "category": "land", "product_type": "artillery", "specifications": {"caliber": "155mm", "range": "40 km", "rate_of_fire": "3 rpm burst", "crew": "5"}, "materials": ["Armored Steel", "Composite Materials"], "status": "active", "image_url": None},
    {"name": "Lynx KF41", "manufacturer": "Rheinmetall", "category": "land", "product_type": "ifv", "specifications": {"weight": "38 tons", "speed": "70 km/h", "range": "500 km", "armament": "35mm"}, "materials": ["Composite Armor", "AMAP Protection"], "status": "active", "image_url": None},
    {"name": "8x8 Eitan APC", "manufacturer": "Elbit Systems", "category": "land", "product_type": "apc", "specifications": {"weight": "30 tons", "speed": "90 km/h", "range": "600 km", "capacity": "12 troops"}, "materials": ["Steel/Composite Armor", "Iron Fist APS"], "status": "active", "image_url": None},
    # === Additional Space Systems ===
    {"name": "WGS-11 Satellite", "manufacturer": "Boeing Defense", "category": "space", "product_type": "communications_satellite", "specifications": {"orbit": "GEO 35,786 km", "bandwidth": "X/Ka band 4.875 GHz", "coverage": "Global", "lifespan": "14 years"}, "materials": ["Composite Bus", "Solar Arrays"], "status": "active", "image_url": None},
    {"name": "Pleiades Neo", "manufacturer": "Airbus Defence & Space", "category": "space", "product_type": "reconnaissance_satellite", "specifications": {"orbit": "SSO 620 km", "resolution": "30 cm", "coverage": "Global", "revisit_time": "1 day"}, "materials": ["Composite Structure", "Optical Payload"], "status": "active", "image_url": None},
    # === Additional Cyber/EW Systems ===
    {"name": "AN/APG-81 AESA Radar", "manufacturer": "Northrop Grumman", "category": "cyber", "product_type": "radar", "specifications": {"type": "AESA", "platform": "F-35", "modes": "SAR/GMTI/NCTR", "bands": "X-band"}, "materials": ["Advanced Electronics", "GaAs/GaN Modules"], "status": "active", "image_url": None},
    {"name": "CAESAR NG (Next Gen)", "manufacturer": "Nexter Systems", "category": "land", "product_type": "artillery", "specifications": {"caliber": "155mm", "range": "50 km", "rate_of_fire": "8 rpm", "crew": "2"}, "materials": ["High-Strength Steel", "Semi-Autonomous Systems"], "status": "development", "image_url": None},
    # === New: Next-Gen Aircraft ===
    {"name": "NGAD (Next Gen Air Dominance)", "manufacturer": "Lockheed Martin", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 2.0+", "range": "Classified", "ceiling": "60,000+ ft", "payload": "Classified"}, "materials": ["Advanced Stealth Composites", "RAM Coating", "Titanium Alloys"], "status": "development", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/NGAD_concept.jpg?width=800"},
    {"name": "F-16 Viper (F-16V)", "manufacturer": "Lockheed Martin", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 2.05", "range": "3,200 km", "ceiling": "50,000 ft", "payload": "7,700 kg"}, "materials": ["Aluminum Alloy", "Composite Materials"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/F-16V_Viper_Taiwan.jpg?width=800"},
    {"name": "Tempest / GCAP", "manufacturer": "BAE Systems", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 2.0+", "range": "2,000+ km", "ceiling": "55,000+ ft", "payload": "Classified"}, "materials": ["Stealth Composites", "Smart Skin Sensors"], "status": "development", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Team_Tempest_aircraft_model.jpg?width=800"},
    {"name": "SCAF / NGF", "manufacturer": "Dassault Aviation", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 2.0+", "range": "2,000+ km", "ceiling": "55,000+ ft", "payload": "Classified"}, "materials": ["Stealth Composites", "Advanced Electronics"], "status": "development", "image_url": None},
    # === New: Missiles & Strike Systems ===
    {"name": "AGM-158B JASSM-ER", "manufacturer": "Lockheed Martin", "category": "missile", "product_type": "cruise_missile", "specifications": {"range": "925 km", "speed": "Mach 0.9", "guidance": "INS/GPS/IIR", "warhead": "450 kg"}, "materials": ["Composite Materials", "Stealth Coating"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/AGM-158_JASSM.jpg?width=800"},
    {"name": "PrSM (Precision Strike Missile)", "manufacturer": "Lockheed Martin", "category": "missile", "product_type": "ballistic_missile", "specifications": {"range": "500+ km", "speed": "Mach 5+", "guidance": "GPS/INS", "warhead": "Conventional"}, "materials": ["Composite Materials", "Solid Propellant"], "status": "development", "image_url": None},
    {"name": "ATACMS Block IVA", "manufacturer": "Lockheed Martin", "category": "missile", "product_type": "ballistic_missile", "specifications": {"range": "300 km", "speed": "Mach 3+", "guidance": "GPS/INS", "warhead": "500 kg unitary"}, "materials": ["Steel", "Composite Materials", "Solid Propellant"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/ATACMS_launch.jpg?width=800"},
    {"name": "Storm Shadow / SCALP EG", "manufacturer": "MBDA", "category": "missile", "product_type": "cruise_missile", "specifications": {"range": "560 km", "speed": "Mach 0.95", "guidance": "INS/GPS/TERPROM", "warhead": "450 kg BROACH"}, "materials": ["Composite Materials", "Stealth Design"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Storm_Shadow_SCALP.jpg?width=800"},
    {"name": "Meteor BVR Missile", "manufacturer": "MBDA", "category": "missile", "product_type": "air_to_air", "specifications": {"range": "100+ km", "speed": "Mach 4+", "guidance": "Active Radar", "warhead": "Blast fragmentation"}, "materials": ["Composite Materials", "Ramjet Propulsion"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/MBDA_Meteor.jpg?width=800"},
    {"name": "SPEAR 3", "manufacturer": "MBDA", "category": "missile", "product_type": "air_to_ground", "specifications": {"range": "140 km", "speed": "Mach 0.9", "guidance": "GPS/IIR/Datalink", "warhead": "20 kg"}, "materials": ["Composite Materials", "Miniaturized Electronics"], "status": "active", "image_url": None},
    {"name": "NSM (Naval Strike Missile)", "manufacturer": "Kongsberg Defence", "category": "missile", "product_type": "anti_ship", "specifications": {"range": "200 km", "speed": "Mach 0.95", "guidance": "GPS/IIR/Terrain", "warhead": "125 kg"}, "materials": ["Composite Materials", "Stealth Design"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Naval_Strike_Missile.jpg?width=800"},
    {"name": "Exocet MM40 Block 3C", "manufacturer": "MBDA", "category": "missile", "product_type": "anti_ship", "specifications": {"range": "180 km", "speed": "Mach 0.93", "guidance": "INS/GPS/AASM", "warhead": "165 kg"}, "materials": ["Aluminum", "Composite Materials"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Exocet_MM40.jpg?width=800"},
    {"name": "LRASM", "manufacturer": "Lockheed Martin", "category": "missile", "product_type": "anti_ship", "specifications": {"range": "930 km", "speed": "Mach 0.9", "guidance": "INS/GPS/EO/ATA", "warhead": "450 kg"}, "materials": ["Stealth Composites", "Turbofan Engine"], "status": "active", "image_url": None},
    # === New: Naval Systems ===
    {"name": "Gowind Corvette", "manufacturer": "Naval Group", "category": "naval", "product_type": "corvette", "specifications": {"displacement": "2,600 tons", "length": "102 m", "speed": "25+ knots", "crew": "65"}, "materials": ["Steel Hull", "Composite Superstructure"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/FS_Courbet_(F712).jpg?width=800"},
    {"name": "Type 23 Frigate", "manufacturer": "BAE Systems", "category": "naval", "product_type": "frigate", "specifications": {"displacement": "4,900 tons", "length": "133 m", "speed": "28 knots", "crew": "185"}, "materials": ["Steel Hull", "Glass Fiber Mast"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/HMS_Richmond_frigate_MOD_45148048.jpg?width=800"},
    {"name": "SSBN Le Terrible", "manufacturer": "Naval Group", "category": "naval", "product_type": "submarine", "specifications": {"displacement": "14,335 tons", "length": "138 m", "speed": "25+ knots", "missiles": "16 M51.3"}, "materials": ["High-Tensile Steel", "Nuclear Propulsion", "Anechoic Coating"], "status": "active", "image_url": None},
    # === New: Space Systems ===
    {"name": "CSO Optical Satellite", "manufacturer": "Airbus Defence & Space", "category": "space", "product_type": "reconnaissance_satellite", "specifications": {"orbit": "SSO 480-800 km", "resolution": "<35 cm", "coverage": "Global", "lifespan": "10 years"}, "materials": ["Composite Structure", "Large Format Camera"], "status": "active", "image_url": None},
    {"name": "MUOS-5 Satellite", "manufacturer": "Lockheed Martin", "category": "space", "product_type": "communications_satellite", "specifications": {"orbit": "GEO", "bandwidth": "UHF/WCDMA", "coverage": "Global", "lifespan": "15 years"}, "materials": ["Composite Bus", "Large Mesh Antenna"], "status": "active", "image_url": None},
    {"name": "Milani / Michibiki", "manufacturer": "Mitsubishi Electric", "category": "space", "product_type": "navigation_satellite", "specifications": {"orbit": "QZO 32,000 km", "accuracy": "10 cm", "lifespan": "15 years", "signals": "L1C/L5/LEX"}, "materials": ["Aluminum", "Solar Arrays"], "status": "active", "image_url": None},
    # === New: Cyber & EW ===
    {"name": "EA-18G Growler", "manufacturer": "Boeing Defense", "category": "cyber", "product_type": "electronic_warfare", "specifications": {"max_speed": "Mach 1.8", "range": "1,700 km", "ceiling": "50,000 ft", "jamming": "AN/ALQ-218 + ALQ-99"}, "materials": ["Aluminum", "Carbon Fiber", "Advanced Electronics"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/EA-18G_Growler.jpg?width=800"},
    {"name": "RC-135V/W Rivet Joint", "manufacturer": "Boeing Defense", "category": "cyber", "product_type": "sigint", "specifications": {"max_speed": "980 km/h", "range": "6,800 km", "endurance": "20+ hours", "sensors": "Multi-INT suite"}, "materials": ["Boeing 707 Airframe", "Advanced Sensor Pods"], "status": "active", "image_url": None},
    {"name": "Falcon Shield C-UAS", "manufacturer": "L3Harris Technologies", "category": "cyber", "product_type": "c_uas", "specifications": {"range": "20 km", "type": "Detect/Track/Defeat", "targets": "UAS/sUAS", "integration": "C2 compatible"}, "materials": ["Radar", "RF Jammers", "Directed Energy"], "status": "active", "image_url": None},
    # === New: Land Systems ===
    {"name": "Lynx QC (Quick Command)", "manufacturer": "Rheinmetall", "category": "land", "product_type": "ifv", "specifications": {"weight": "44 tons", "speed": "70 km/h", "range": "500 km", "armament": "35mm WOTAN"}, "materials": ["Composite Armor", "ROSY Smoke System"], "status": "development", "image_url": None},
    {"name": "AMV35 IFV", "manufacturer": "Patria", "category": "land", "product_type": "ifv", "specifications": {"weight": "32 tons", "speed": "100 km/h", "range": "800 km", "armament": "35mm"}, "materials": ["Steel/Composite Armor", "8x8 Platform"], "status": "active", "image_url": None},
    {"name": "Oerlikon Skyshield", "manufacturer": "Rheinmetall", "category": "missile", "product_type": "shorad", "specifications": {"range": "4 km", "altitude": "3 km", "rate_of_fire": "1,000 rpm", "rounds": "35mm AHEAD"}, "materials": ["Aluminum", "Advanced Electronics"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Oerlikon_Skyshield.jpg?width=800"},
    {"name": "Mistral SHORAD", "manufacturer": "MBDA", "category": "missile", "product_type": "shorad", "specifications": {"range": "6 km", "altitude": "3 km", "speed": "Mach 2.6", "warhead": "3 kg"}, "materials": ["Composite Materials", "IR Seeker"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Mistral_SHORAD_launcher.jpg?width=800"},

]
# Note: new products appended above, file ends with ]
