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
    {"name": "Anduril Industries", "ticker": "ANDR-PRIV", "country": "USA", "market_cap": 14.0, "stock_price": 0, "change_percent": 0, "revenue": 0.8, "employees": 2500, "specializations": ["AI", "Autonomous", "Counter-UAS"], "founded_year": 2017, "headquarters": "Costa Mesa, CA, USA", "website": "anduril.com", "funding_stage": "Late Stage — $3B+ (Founders Fund, a16z)", "is_public": False},
    {"name": "Shield AI", "ticker": "SHLD-PRIV", "country": "USA", "market_cap": 2.7, "stock_price": 0, "change_percent": 0, "revenue": 0.2, "employees": 800, "specializations": ["AI", "Autonomous", "UAV"], "founded_year": 2015, "headquarters": "San Diego, CA, USA", "website": "shield.ai", "funding_stage": "Series F — $1B+ (Andreessen Horowitz)", "is_public": False,
     "aliases": ["ShieldAI", "Shield Artificial Intelligence", "Shield AI Inc"]},
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
    {"name": "Arquus", "ticker": "ARQS-PRIV", "country": "France", "market_cap": 0.8, "stock_price": 0, "change_percent": 0, "revenue": 0.6, "employees": 2200, "specializations": ["Military Vehicles", "VAB", "Griffon"]},
    # === Germany ===
    {"name": "Rheinmetall", "ticker": "RHM.DE", "country": "Germany", "market_cap": 22.4, "stock_price": 512.30, "change_percent": 3.21, "revenue": 7.2, "employees": 29000, "specializations": ["Land Systems", "Ammunition", "Electronics"]},
    {"name": "Hensoldt", "ticker": "HAG.DE", "country": "Germany", "market_cap": 4.8, "stock_price": 35.67, "change_percent": 1.89, "revenue": 1.8, "employees": 7000, "specializations": ["Sensors", "Radar", "Optronics"]},
    {"name": "Diehl Defence", "ticker": "DIEHL-PRIV", "country": "Germany", "market_cap": 2.1, "stock_price": 0, "change_percent": 0, "revenue": 0.9, "employees": 3500, "specializations": ["Missiles", "Ammunition", "Sensors"]},
    {"name": "ThyssenKrupp Marine", "ticker": "TKA.DE", "country": "Germany", "market_cap": 3.2, "stock_price": 4.56, "change_percent": -0.45, "revenue": 2.1, "employees": 8000, "specializations": ["Naval", "Submarines"]},
    {"name": "MTU Aero Engines", "ticker": "MTX.DE", "country": "Germany", "market_cap": 14.5, "stock_price": 275.90, "change_percent": 0.67, "revenue": 6.3, "employees": 12000, "specializations": ["Engines", "MRO"]},
    {"name": "Renk Group", "ticker": "R3NK.DE", "country": "Germany", "market_cap": 2.8, "stock_price": 28.90, "change_percent": 2.34, "revenue": 0.9, "employees": 3400, "specializations": ["Transmissions", "Propulsion", "Components"]},
    {"name": "Helsing", "ticker": "HELS-PRIV", "country": "Germany", "market_cap": 3.7, "stock_price": 0, "change_percent": 0, "revenue": 0.1, "employees": 450, "specializations": ["AI", "Electronic Warfare", "Autonomous", "Software"], "founded_year": 2021, "headquarters": "Munich, Germany", "website": "helsing.ai", "funding_stage": "Series C — €700M+ (General Catalyst, Saab)", "is_public": False},
    # === Italy ===
    {"name": "Leonardo", "ticker": "LDO.MI", "country": "Italy", "market_cap": 14.8, "stock_price": 25.67, "change_percent": 1.56, "revenue": 15.3, "employees": 53000, "specializations": ["Helicopters", "Electronics", "Cyber", "Space"]},
    {"name": "Fincantieri", "ticker": "FCT.MI", "country": "Italy", "market_cap": 2.1, "stock_price": 1.23, "change_percent": 0.89, "revenue": 7.8, "employees": 21000, "specializations": ["Naval", "Shipbuilding", "Cruise Ships"]},
    {"name": "Avio", "ticker": "AVIO.MI", "country": "Italy", "market_cap": 0.9, "stock_price": 12.34, "change_percent": 0.45, "revenue": 0.4, "employees": 1500, "specializations": ["Space", "Propulsion", "Launch"]},
    {"name": "Elettronica", "ticker": "ELET-PRIV", "country": "Italy", "market_cap": 0.8, "stock_price": 0, "change_percent": 0, "revenue": 0.4, "employees": 1600, "specializations": ["Electronic Warfare", "SIGINT"]},
    # === Spain ===
    {"name": "Indra Sistemas", "ticker": "IDR.MC", "country": "Spain", "market_cap": 3.2, "stock_price": 18.45, "change_percent": 0.67, "revenue": 4.1, "employees": 57000, "specializations": ["IT", "Defense", "Transport", "Simulation"]},
    {"name": "Navantia", "ticker": "NVNT-PRIV", "country": "Spain", "market_cap": 1.5, "stock_price": 0, "change_percent": 0, "revenue": 1.2, "employees": 4100, "specializations": ["Naval", "Shipbuilding", "Submarines"]},
    # === EU/Multinational ===
    {"name": "Airbus Defence & Space", "ticker": "AIR.PA", "country": "EU", "market_cap": 98.5, "stock_price": 156.23, "change_percent": 0.98, "revenue": 52.1, "employees": 130000, "specializations": ["Aircraft", "Space", "Helicopters", "UAV"], "multinational_for": ["France", "Germany", "Spain"]},
    {"name": "KNDS", "ticker": "KNDS-PRIV", "country": "EU", "market_cap": 6.5, "stock_price": 0, "change_percent": 0, "revenue": 4.2, "employees": 9000, "specializations": ["Land Systems", "Tanks", "Artillery"], "multinational_for": ["France", "Germany"]},
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
    # === Ukraine ===
    {"name": "Ukroboronprom", "ticker": "UKR-PRIV", "country": "Ukraine", "market_cap": 3.2, "stock_price": 0, "change_percent": 0, "revenue": 2.1, "employees": 70000, "specializations": ["Land Systems", "Aircraft", "Missiles", "Naval"], "company_type": "cluster"},
    {"name": "Antonov", "ticker": "ANTN-PRIV", "country": "Ukraine", "market_cap": 0.9, "stock_price": 0, "change_percent": 0, "revenue": 0.4, "employees": 6000, "specializations": ["Transport Aircraft", "An-178", "An-132"]},
    {"name": "UkrSpecSystems", "ticker": "USS-PRIV", "country": "Ukraine", "market_cap": 0.3, "stock_price": 0, "change_percent": 0, "revenue": 0.15, "employees": 400, "specializations": ["UAV", "Leleka-100", "PD-2", "ISR"]},
    {"name": "Skyeton", "ticker": "SKYT-PRIV", "country": "Ukraine", "market_cap": 0.2, "stock_price": 0, "change_percent": 0, "revenue": 0.08, "employees": 150, "specializations": ["Loitering Munitions", "UAV", "Raybird-3"]},
    {"name": "Kvertus", "ticker": "KVER-PRIV", "country": "Ukraine", "market_cap": 0.15, "stock_price": 0, "change_percent": 0, "revenue": 0.06, "employees": 120, "specializations": ["Counter-UAS", "Drone Jamming", "Electronic Warfare"]},
    {"name": "LUCH Design Bureau", "ticker": "LUCH-PRIV", "country": "Ukraine", "market_cap": 0.4, "stock_price": 0, "change_percent": 0, "revenue": 0.2, "employees": 1200, "specializations": ["Missiles", "Stugna-P ATGM", "Vilkha MLRS"]},
    {"name": "Infozahyst", "ticker": "INFZ-PRIV", "country": "Ukraine", "market_cap": 0.12, "stock_price": 0, "change_percent": 0, "revenue": 0.05, "employees": 200, "specializations": ["Electronic Warfare", "Signals Intelligence", "EW Systems"]},
    {"name": "Motor Sich", "ticker": "MSICH-PRIV", "country": "Ukraine", "market_cap": 0.6, "stock_price": 0, "change_percent": 0, "revenue": 0.35, "employees": 11000, "specializations": ["Helicopter Engines", "Aircraft Engines", "Turbines"]},
    {"name": "Tencore", "ticker": "TENCORE-PRIV", "country": "Ukraine", "market_cap": 0.1, "stock_price": 0, "change_percent": 0, "revenue": 0.04, "employees": 80, "specializations": ["UAV", "FPV Drones", "Autonomous Systems"]},
    {"name": "Ukrainian Armor", "ticker": "UA-ARMOR-PRIV", "country": "Ukraine", "market_cap": 0.18, "stock_price": 0, "change_percent": 0, "revenue": 0.08, "employees": 350, "specializations": ["Armored Vehicles", "APC", "Ballistic Protection"]},
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
    # === Additional companies to reach 125 ===
    {"name": "Teledyne Technologies", "ticker": "TDY", "country": "USA", "market_cap": 15.8, "stock_price": 387.45, "change_percent": 0.92, "revenue": 5.9, "employees": 17000, "specializations": ["Imaging", "Sensors", "Electronics", "Defense"]},
    {"name": "SERCO Group", "ticker": "SRP.L", "country": "UK", "market_cap": 4.1, "stock_price": 1.67, "change_percent": 0.48, "revenue": 4.7, "employees": 60000, "specializations": ["Services", "IT", "Logistics", "Training"]},
    {"name": "Milrem Robotics", "ticker": "MILR-PRIV", "country": "Estonia", "market_cap": 0.5, "stock_price": 0, "change_percent": 0, "revenue": 0.2, "employees": 350, "specializations": ["UGV", "Autonomous", "Land Systems"]},
    {"name": "Terma A/S", "ticker": "TERM-PRIV", "country": "Denmark", "market_cap": 0.6, "stock_price": 0, "change_percent": 0, "revenue": 0.4, "employees": 1400, "specializations": ["Defense Electronics", "C2 Systems", "Space"]},
    {"name": "Dynamit Nobel Defence", "ticker": "DND-PRIV", "country": "Germany", "market_cap": 0.5, "stock_price": 0, "change_percent": 0, "revenue": 0.3, "employees": 900, "specializations": ["Warheads", "Propulsion", "Ammunition"]},
    {"name": "Theon Sensors", "ticker": "THSN-PRIV", "country": "Greece", "market_cap": 0.3, "stock_price": 0, "change_percent": 0, "revenue": 0.15, "employees": 280, "specializations": ["Optronics", "Night Vision", "Thermal Imaging"]},
    {"name": "PZL Mielec", "ticker": "PZL-PRIV", "country": "Poland", "market_cap": 0.4, "stock_price": 0, "change_percent": 0, "revenue": 0.3, "employees": 2200, "specializations": ["Aircraft", "Helicopters", "MRO"]},
    # === France — Defense Tech Startups ===
    {"name": "Shark Robotics", "ticker": "SHRK-PRIV", "country": "France", "market_cap": 0.08, "stock_price": 0, "change_percent": 0, "revenue": 0.02, "employees": 60, "specializations": ["UGV", "Robotics", "Counter-IED", "Autonomous"], "founded_year": 2014, "headquarters": "La Rochelle, France", "website": "shark-robotics.com", "funding_stage": "Growth", "is_public": False},
    {"name": "Preligens", "ticker": "PREL-PRIV", "country": "France", "market_cap": 0.17, "stock_price": 0, "change_percent": 0, "revenue": 0.05, "employees": 130, "specializations": ["AI", "Satellite Imagery", "GEOINT", "ISR"], "founded_year": 2016, "headquarters": "Paris, France", "website": "preligens.com", "funding_stage": "Growth", "is_public": False},
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
        "specializations": ["Hypersonics", "Autonomous Aircraft", "Air Mobility", "Propulsion"],
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
    {"name": "Quantum Systems", "ticker": "QSYS-PRIV", "country": "Germany", "market_cap": 0.3, "stock_price": 0, "change_percent": 0, "revenue": 0.05, "employees": 400, "specializations": ["UAV", "VTOL", "ISR", "Autonomous"], "founded_year": 2015, "headquarters": "Munich, Germany", "website": "quantum-systems.com", "funding_stage": "Growth — €100M+ (HV Capital, Project A)", "is_public": False,
     "aliases": ["Quantum Systems GmbH"]},
    {"name": "Dedrone", "ticker": "DEDR-PRIV", "country": "Germany", "market_cap": 0.06, "stock_price": 0, "change_percent": 0, "revenue": 0.02, "employees": 120, "specializations": ["Counter-UAS", "Drone Detection", "AI", "Security"], "founded_year": 2014, "headquarters": "San Francisco, CA, USA", "website": "dedrone.com", "funding_stage": "Growth", "is_public": False},
    # === UK — Defense Tech Startups ===
    {"name": "Blue Bear Systems", "ticker": "BBSR-PRIV", "country": "UK", "market_cap": 0.08, "stock_price": 0, "change_percent": 0, "revenue": 0.03, "employees": 80, "specializations": ["UAV", "Swarm", "Autonomous", "AI"], "founded_year": 2002, "headquarters": "Bedford, UK", "website": "bluebear.aero", "funding_stage": "Growth", "is_public": False},
    {"name": "Basecamp Research", "ticker": "BCMP-PRIV", "country": "UK", "market_cap": 0.12, "stock_price": 0, "change_percent": 0, "revenue": 0.02, "employees": 90, "specializations": ["Biodefence", "AI", "Biosecurity", "R&D"], "founded_year": 2021, "headquarters": "London, UK", "website": "basecampresearch.com", "funding_stage": "Series A", "is_public": False},
    # === Israel — Defense Tech Startups ===
    {"name": "Orca AI", "ticker": "ORCA-PRIV", "country": "Israel", "market_cap": 0.05, "stock_price": 0, "change_percent": 0, "revenue": 0.01, "employees": 60, "specializations": ["Naval Autonomy", "AI", "Maritime Surveillance", "Navigation"], "founded_year": 2018, "headquarters": "Tel Aviv, Israel", "website": "orca.ai", "funding_stage": "Series A", "is_public": False},
    # === Australia — Defense Tech Startups ===
    {"name": "SYPAQ Systems", "ticker": "SYPA-PRIV", "country": "Australia", "market_cap": 0.05, "stock_price": 0, "change_percent": 0, "revenue": 0.02, "employees": 120, "specializations": ["UAV", "Autonomous", "Logistics", "ISTAR"], "founded_year": 2015, "headquarters": "Melbourne, Australia", "website": "sypaq.com.au", "funding_stage": "Growth", "is_public": False},
    {"name": "Advanced Navigation", "ticker": "ADVN-PRIV", "country": "Australia", "market_cap": 0.08, "stock_price": 0, "change_percent": 0, "revenue": 0.025, "employees": 150, "specializations": ["Navigation", "INS", "Autonomous", "Underwater"], "founded_year": 2012, "headquarters": "Sydney, Australia", "website": "advancednavigation.com", "funding_stage": "Growth", "is_public": False},
    # === India — Defense Tech Startups ===
    {"name": "ideaForge Technology", "ticker": "IDEAFORGE.NS", "country": "India", "market_cap": 0.18, "stock_price": 580.0, "change_percent": 1.2, "revenue": 0.025, "employees": 350, "specializations": ["UAV", "VTOL", "ISR", "Autonomous"], "founded_year": 2012, "headquarters": "Mumbai, India", "website": "ideaforgetech.com"},
    # === UAE — Defense Scale-ups ===
    {"name": "Calidus", "ticker": "CALD-PRIV", "country": "UAE", "market_cap": 0.25, "stock_price": 0, "change_percent": 0, "revenue": 0.05, "employees": 200, "specializations": ["Aircraft", "Light Attack", "COIN", "Trainer"], "founded_year": 2018, "headquarters": "Abu Dhabi, UAE", "website": "calidus.ae", "funding_stage": "Growth", "is_public": False},
    # === South Korea — Defense Tech Startups ===
    {"name": "Hancom InSpace", "ticker": "HICS-PRIV", "country": "South Korea", "market_cap": 0.1, "stock_price": 0, "change_percent": 0, "revenue": 0.02, "employees": 180, "specializations": ["Space", "SAR", "GEOINT", "Satellites"], "founded_year": 2012, "headquarters": "Seoul, South Korea", "website": "hancom-inspace.com", "funding_stage": "Growth", "is_public": False},
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
    {"name": "Frankenburg Technologies", "ticker": "FRTG-PRIV", "country": "Estonia", "market_cap": 0.005, "stock_price": 0, "change_percent": 0, "revenue": 0.001, "employees": 15, "specializations": ["Counter-UAS", "AI", "Detection", "Autonomous"], "founded_year": 2020, "headquarters": "Tallinn, Estonia", "funding_stage": "Seed", "is_public": False},
    # === Turkey — Defense Tech Startups ===
    {"name": "STM Savunma", "ticker": "STMS-PRIV", "country": "Turkey", "market_cap": 0.6, "stock_price": 0, "change_percent": 0, "revenue": 0.12, "employees": 500, "specializations": ["Autonomous", "AI", "Naval", "Cyber"]},

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
        "specializations": ["Directed Energy", "Counter-UAS", "HPM", "Electronic Warfare"],
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
        "market_cap": 0.04, "stock_price": 0, "change_percent": 0,
        "revenue": 0.003, "employees": 30,
        "specializations": ["UAV", "FPV Drones", "Autonomous", "Attritable"],
        "founded_year": 2023, "headquarters": "Los Angeles, CA, USA", "website": "neros.tech",
        "funding_stage": "Seed — $10M+",
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
        "founded_year": 2022, "headquarters": "Riga, Latvia", "website": "originrobotics.ai",
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
        "market_cap": 0.05, "stock_price": 0, "change_percent": 0,
        "revenue": 0.02, "employees": 80,
        "specializations": ["Defense Consulting", "Intelligence", "Strategy", "Export Advisory"],
        "founded_year": 2007, "headquarters": "Paris, France", "website": "turgis-gaillard.com",
        "funding_stage": "Private",
        "is_public": False,
        "description": (
            "Turgis & Gaillard is a French defense and security consulting firm specialized in "
            "competitive intelligence, export strategy, and economic influence for defense primes "
            "and government entities. The firm advises major defense contractors and institutions "
            "on market positioning, regulatory navigation, and export competitiveness in the global "
            "defense sector."
        ),
        "programs": ["Defense export advisory", "Strategic intelligence for prime contractors"],
        "export_countries": ["FR"],
        "aliases": ["T&G", "Turgis Gaillard"],
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
        "programs": ["Vehicle countermeasures (Leclerc, Griffon, VBCI)", "Airborne flares (Rafale, NH90)", "Naval decoys (FREMM)"],
        "export_countries": ["FR", "DE", "GB", "IT", "ES", "AE"],
        "aliases": ["Lacroix", "Groupe Lacroix"],
    },
    {
        "name": "Texelis", "ticker": "TEXE-PRIV", "country": "France",
        "market_cap": 0.15, "stock_price": 0, "change_percent": 0,
        "revenue": 0.09, "employees": 500,
        "specializations": ["Military Vehicles", "Axles", "Drive Systems", "Land Mobility"],
        "founded_year": 2016, "headquarters": "Limoges, France", "website": "texelis.com",
        "funding_stage": "Private (investment group)",
        "is_public": False,
        "description": (
            "Texelis designs and manufactures axles, drive systems, and mobility solutions for "
            "armored and military wheeled vehicles. Its products equip the French Griffon and "
            "Jaguar armored vehicles under the Scorpion program, as well as export platforms. "
            "A specialist in high-performance military land mobility systems."
        ),
        "programs": ["Scorpion program (Griffon, Jaguar axles)", "Export wheeled vehicle programs"],
        "export_countries": ["FR", "BE", "IT"],
        "aliases": [],
    },
    {
        "name": "CS Group", "ticker": "CSG-PRIV", "country": "France",
        "market_cap": 0.3, "stock_price": 0, "change_percent": 0,
        "revenue": 0.18, "employees": 2200,
        "specializations": ["C2 Systems", "Defense Software", "SIGINT", "Cyber", "Space"],
        "founded_year": 1968, "headquarters": "Toulouse, France", "website": "cs-group.com",
        "funding_stage": "Private (Sopra Steria subsidiary since 2022)",
        "is_public": False,
        "description": (
            "CS Group (Communication & Systèmes) is a French defense software and systems integrator "
            "specialized in command and control, SIGINT processing, space ground systems, and "
            "cybersecurity for French and NATO defense clients. Acquired by Sopra Steria in 2022, "
            "it operates as an autonomous defense-focused entity within the group."
        ),
        "programs": ["French Army C2 systems", "CNES/ESA space ground segments", "DGA programs"],
        "export_countries": ["FR", "DE", "IT"],
        "aliases": ["Communication & Systèmes", "CS Defense"],
    },
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
    # ArianeGroup / Thales — FLP-T programme (real events, May 2026)
    {"title": "Thales et ArianeGroup réussissent le premier tir de la munition balistique FLP-t 150", "content": "Le 5 mai 2026, depuis le site d'essais DGA-EM de l'Île du Levant, Thales et ArianeGroup ont réussi le premier tir de leur munition balistique FLP-t 150. L'engin a atteint Mach 4, franchi plusieurs dizaines de kilomètres d'altitude et frappé une cible à plus de 100 km. La munition intègre le TopStar Smart Receiver pour naviguer en environnement GNSS brouillé. ArianeGroup apporte la propulsion et le guidage (expertise issue du missile M51) ; Thales assure le lanceur X-Fire, le contrôle de tir et l'intégration au système ATLAS. L'ensemble de la chaîne de production est 100 % française, garantissant une totale souveraineté à l'export.", "source": "Opex News", "category": "product_launch", "company": "Thales"},
    {"title": "FLP-T : Thales dévoile le lanceur X-Fire, mobile et interopérable", "content": "En marge du succès du tir FLP-t 150, Thales présente le lanceur X-Fire, développé avec Soframe. Polyvalent et extrêmement mobile, il peut emporter aussi bien des munitions souveraines françaises que des munitions alliées étrangères. Il s'intègre nativement au système ATLAS de conduite des feux. Premières démonstrations de tir prévues fin mai 2026. Le système vise à remplacer le LRU (portée 70 km, obsolète dès 2027) avec une capacité opérationnelle requise d'ici 2030.", "source": "Zone Militaire", "category": "product_launch", "company": "Thales"},
    {"title": "FLP-T : ArianeGroup et Thales face à MBDA et Safran pour équiper l'armée française", "content": "Deux consortiums s'affrontent pour le programme Frappe Longue Portée Terrestre de la DGA. MBDA et Safran ont testé leur munition THUNDART le 14 avril 2026 ; ArianeGroup et Thales ont répondu avec le FLP-t 150 le 5 mai. Les deux solutions doivent remplacer les LRU dont la portée (70 km) est jugée insuffisante au regard des leçons du conflit en Ukraine. Décision du maître d'œuvre attendue courant 2026.", "source": "Usine Nouvelle", "category": "partnership", "company": "ArianeGroup"},
    {"title": "Thales Alenia Space fournira 179 équipements électroniques embarqués à bord de 27 lanceurs Ariane 6", "content": "Thales Alenia Space a signé avec ArianeGroup un contrat portant sur la fourniture de 179 unités électroniques destinées à équiper 27 lanceurs Ariane 6. Ces équipements comprennent des systèmes de télémétrie et de sauvegarde. Les premières livraisons doivent intervenir à l'automne 2025 pour soutenir la montée en cadence de la phase opérationnelle d'Ariane 6.", "source": "Air & Cosmos", "category": "contract", "company": "Thales"},
    # SIPRI 2026 — dépenses mondiales record
    {"title": "SIPRI : les dépenses militaires mondiales atteignent un record de 2 888 milliards de dollars en 2025", "content": "Selon le rapport annuel du SIPRI publié en avril 2026, les dépenses militaires mondiales ont progressé de 9,4 % en termes réels pour atteindre 2 888 milliards de dollars en 2025 — un record absolu représentant 2,5 % du PIB mondial, niveau le plus élevé depuis 2009. L'Europe est le principal moteur avec une hausse de 14 % à 864 milliards de dollars. L'Allemagne dépasse pour la première fois depuis 1990 le seuil de 2 % du PIB (2,3 %, +24 %). L'Espagne fait de même (+50 %). À l'inverse, les États-Unis ont réduit leurs dépenses de 7,5 %. 22 des 29 membres européens de l'OTAN dépassent désormais le seuil des 2 %.", "source": "Breaking Defense", "category": "regulatory", "company": None},
    # Rafale F5 / budget France 2026
    {"title": "La France commande 61 Rafale supplémentaires : la flotte portée à 286 appareils", "content": "Le projet de loi de finances 2026 prévoit l'acquisition de 61 Rafale supplémentaires pour un montant estimé entre 5 et 6 milliards d'euros, portant la cible de flotte à 286 appareils — la plus grande commande de chasseurs en Europe depuis la fin de la Guerre froide. Les livraisons s'échelonneront avant 2030 et jusqu'en 2035. Dassault Aviation dispose d'un carnet de commandes de 220 appareils fin 2025, dont 45 pour la France et 175 à l'export. La cadence de production doit passer de 26 appareils en 2026 à un pic de 35 par an entre 2029 et 2030.", "source": "Air & Cosmos", "category": "contract", "company": "Dassault Aviation"},
    # UAE / Rafale F5
    {"title": "Les Émirats se retirent du financement du Rafale F5 : la France assume seule les 5 milliards d'euros du programme", "content": "Les Émirats arabes unis ont annoncé leur retrait du co-financement du standard Rafale F5, laissant la France assumer seule le coût estimé à 5 milliards d'euros du développement du 'Super Rafale'. Le F5 emportera le missile hypersonique ASN4G, un nouveau radar RBE2 XG et sera accompagné d'un drone de combat de plus de 10 tonnes. Le retrait émirati est lié à des désaccords sur les codes sources et les restrictions à l'export, sujets devenus non-négociables pour Paris.", "source": "Defence Security Asia", "category": "regulatory", "company": "Dassault Aviation"},
    # FCAS en crise
    {"title": "FCAS : le PDG de Dassault fixe un ultimatum de deux semaines pour sauver le programme", "content": "Le PDG de Dassault Aviation, Eric Trappier, a annoncé qu'une fenêtre de deux à trois semaines reste ouverte pour sauver le programme FCAS (Future Combat Air System) franco-germano-espagnol avant un effondrement total des négociations. Le blocage porte sur le partage de travaux, le contrôle du design et la sélection des sous-traitants entre Airbus (représentant l'Allemagne et l'Espagne) et Dassault (représentant la France). Le programme accumule plusieurs années de retard.", "source": "Defense News", "category": "regulatory", "company": "Dassault Aviation"},
    # MGCS retard
    {"title": "MGCS : la France envisage un char de transition face au retard du programme franco-allemand", "content": "Le programme franco-allemand de char du futur (MGCS — Main Ground Combat System) accuse une décennie de retard, l'Allemagne ayant lancé en parallèle son propre programme Leopard 3. La France se retrouve face à un vide capacitaire entre la fin de vie du Leclerc (2038) et l'arrivée hypothétique du MGCS, et étudie des solutions de transition. Paris et Berlin peinent à s'accorder sur le partage industriel.", "source": "Defense News", "category": "regulatory", "company": "KNDS"},
    # Rheinmetall + MBDA laser JV
    {"title": "Rheinmetall et MBDA créent une coentreprise pour les armes laser navales allemandes", "content": "Rheinmetall et MBDA ont officialisé le 5 janvier 2026 la création d'une joint-venture (GmbH de droit allemand) pour développer des systèmes d'armes laser à haute puissance destinés à la Marine allemande. La coopération s'appuie sur sept ans de travaux communs depuis 2019 et un démonstrateur naval ayant réalisé plus de 100 tirs en mer sous conditions opérationnelles. Le système est particulièrement efficace contre les drones et cibles agiles à courte portée, offrant un coût par tir très inférieur aux missiles.", "source": "Naval News", "category": "partnership", "company": "Rheinmetall"},
    # ReArm Europe / FED
    {"title": "L'UE investit 1,07 milliard d'euros dans 57 projets de défense via le Fonds européen de défense", "content": "La Commission européenne a annoncé en avril 2026 un investissement de 1,07 milliard d'euros dans 57 nouveaux projets au titre de l'appel à propositions 2025 du Fonds européen de défense (FED). Les quatre grandes initiatives phares couvertes sont : l'initiative européenne de défense contre les drones, Eastern Flank Watch, le bouclier aérien européen et le bouclier spatial européen. Ce financement s'inscrit dans le plan ReArm Europe qui vise à mobiliser 800 milliards d'euros d'ici 2030 pour renforcer la défense collective du continent.", "source": "Reuters", "category": "regulatory", "company": None},
    # Alliés européens dépassent les États-Unis
    {"title": "Pour la première fois, les alliés européens de l'OTAN dépassent les États-Unis en pouvoir d'achat militaire", "content": "Selon le rapport annuel du Secrétaire général de l'OTAN publié le 12 mai 2026, les alliés européens ont dépassé les États-Unis en termes de pouvoir d'achat militaire en 2025 — une première historique. Les membres européens de l'OTAN ont collectivement augmenté leurs dépenses de défense de 20 % sur l'année, tous dépassant désormais le seuil de 2 % du PIB. Cette réalité stratégique survient dans un contexte de retrait partiel américain et d'incertitude sur les engagements de Washington.", "source": "Defense News", "category": "regulatory", "company": None},
    # Anduril — Series H (13 mai 2026)
    {"title": "Anduril lève 5 milliards de dollars et double sa valorisation à 61 milliards", "content": "Le 13 mai 2026, la startup américaine de défense Anduril Industries a bouclé un tour de table Series H de 5 milliards de dollars mené par Thrive Capital et Andreessen Horowitz (a16z), portant sa valorisation à 61 milliards de dollars — soit le double de sa valorisation de juin 2025 (30,5 Mds$, tour Founders Fund). L'entreprise avait doublé son chiffre d'affaires en 2025 à 2,2 milliards de dollars. Anduril a désormais levé plus de 11 milliards depuis sa création en 2017. La société a également décroché des contrats pour le système de défense antimissile 'Golden Dome' (protection du territoire américain), un contrat avec le ministère de la Défense néerlandais et un contrat US Army pour son logiciel de commandement Lattice. Une IPO est envisagée pour 2027.", "source": "TechCrunch", "category": "partnership", "company": "Anduril Industries"},
]

# Extended M&A Data — enriched with countries, logo domains, rationale and explicit dates.
# All deals are verified historical events from public sources.
#
# DEAL VALUE CONVENTION (deal_value field, in millions USD):
#   → Equity value (consideration paid to sellers / fundraise amount), NOT Enterprise Value.
#   → For acquisitions: price paid for 100% of equity, or proportional for partial stakes.
#   → For PE buyouts with assumed debt: deal_value = equity consideration; notes field
#     documents total EV including assumed debt if materially different.
#   → For VC/growth rounds: post-money valuation is in the "valuation" field;
#     deal_value = amount raised in the round.
#   → Undisclosed deals: deal_value = 0, is_disclosed = False.
#   Example: SES/Intelsat → deal_value=3100 (equity), notes documents EV ~$5.0B with debt.
#
MA_DATA = [
    # ── 2026 (recent / active) ────────────────────────────────────────────────
    {
        "acquirer": "AE Industrial Partners", "target": "Rocketdyne (L3Harris Space Propulsion)",
        "deal_value": 845, "status": "pending", "deal_type": "acquisition",
        "description": "L3Harris divests majority of Rocketdyne to AE Industrial for $845M — PE carve-out, H2 2026 closing",
        "rationale": (
            "L3Harris Technologies announces a $845 million agreement in January 2026 to sell the "
            "majority of its Aerojet Rocketdyne business (Space Propulsion and Power Systems — RL10, "
            "RS-68A, electric propulsion) to AE Industrial Partners, a defense-focused PE firm. "
            "L3Harris retains the RS-25 programme (sole supplier for NASA SLS) and certain "
            "tactical-missile propulsion lines. The divestiture reflects L3Harris's perimeter "
            "rationalisation strategy: the RS-25 retention preserves a strategically irreplaceable "
            "government contract; the remainder is monetised at ~12× EBITDA, consistent with space "
            "propulsion sector comps. Closing expected H2 2026 pending regulatory approvals."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "aerojet.com",
        "target_logo_domain": "l3harris.com",
        "source_url": "https://spaceflightnow.com/2026/01/09/l3harris-announces-845-million-majority-sale-of-space-propulsion-and-power-systems-business/",
        "announced_date": datetime(2026, 1, 9, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": None,
        "is_disclosed": True,
    },
    {
        "acquirer": "Shark Robotics", "target": "Tencore",
        "deal_value": 0, "status": "announced", "deal_type": "joint_venture",
        "description": "Strategic alliance between French and Ukrainian UGV champions",
        "rationale": (
            "Shark Robotics (France) and Tencore (Ukraine) announce a strategic alliance "
            "on 21 April 2026 to combine their respective ground robotics expertise. "
            "Shark Robotics, known for the Colossus firefighting and tactical UGV deployed "
            "by French forces and in Ukraine, teams up with Tencore, maker of the combat-proven "
            "TerMIT unmanned ground vehicle (NATO-standard, 800+ units fielded). The partnership "
            "targets joint development, cross-promotion and potential co-production of next-generation "
            "multi-mission UGVs for European and NATO markets. Financial terms were not disclosed. "
            "Source: La Lettre de l'Expansion, 21 April 2026."
        ),
        "acquirer_country": "FR", "target_country": "UA",
        "acquirer_logo_domain": "shark-robotics.com",
        "target_logo_domain": "tencore.com",
        "source_url": "https://www.lalettre.fr/fr/rub/fr/entreprises_defense-et-aeronautique/2026/04/21/shark-robotics-s-allie-avec-le-champion-ukrainien-du-drone-tencore,110708212-art",
        "announced_date": datetime(2026, 4, 21, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Airbus Defence and Space", "target": "RADMOR",
        "deal_value": 0, "status": "announced", "deal_type": "joint_venture",
        "description": "Tri-party industrial consortium for Poland's military GEO satellite",
        "rationale": (
            "Airbus Defence and Space, Thales Alenia Space and Polish RADMOR (WB GROUP) sign "
            "an industrial cooperation agreement on 20 April 2026 in Gdańsk — in the presence of "
            "French President Macron and Polish Defence Minister Kosiniak-Kamysz — to develop "
            "Poland's first sovereign geostationary defence telecommunications satellite. "
            "Airbus leads the satellite platform; Thales Alenia Space provides the military "
            "communications payloads and mission control; RADMOR contributes cyber-secured ground "
            "infrastructure. The programme falls under the EU Readiness 2030 plan and is designed "
            "to provide Poland's armed forces with anti-jamming, cyber-resilient space communications. "
            "Deal value not publicly disclosed."
        ),
        "acquirer_country": "DE", "target_country": "PL",
        "acquirer_logo_domain": "airbus.com",
        "target_logo_domain": "radmor.com.pl",
        "source_url": "https://www.airbus.com/en/newsroom/press-releases/2026-04-airbus-thales-alenia-space-and-radmor-to-partner-for-polands-sovereign-satellite",
        "announced_date": datetime(2026, 4, 20, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Safran", "target": "Collins Aerospace Actuation",
        "deal_value": 1800, "status": "announced", "deal_type": "acquisition",
        "description": "Acquisition of RTX's actuation & flight-control systems business",
        "rationale": (
            "Safran signs a deal to acquire Collins Aerospace's (RTX subsidiary) actuation "
            "and flight-control systems business for approximately $1.8 billion, announced "
            "December 2024. The transaction would make Safran the world's second-largest "
            "actuation supplier, adding landing-gear, flight-control and electromechanical "
            "actuation lines. Regulatory reviews are running in parallel in the US, EU, and UK; "
            "closing is expected in the second half of 2025."
        ),
        "acquirer_country": "FR", "target_country": "US",
        "acquirer_logo_domain": "safran-group.com",
        "target_logo_domain": "collinsaerospace.com",
        "source_url": "https://www.safran-group.com/en/newsroom",
        "announced_date": datetime(2024, 12, 5, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Rheinmetall", "target": "American Rheinmetall Vehicles",
        "deal_value": 950, "status": "pending", "deal_type": "joint_venture",
        "description": "US Army OMFV bid joint venture (Lynx KF41)",
        "rationale": (
            "Rheinmetall establishes American Rheinmetall Vehicles LLC, a US-based "
            "joint venture, to compete for the US Army's Optionally Manned Fighting "
            "Vehicle (OMFV) programme. The proposal is centred on the Lynx KF41 IFV "
            "platform and a commitment to manufacture the vehicle in the United States "
            "to comply with Buy American provisions. The estimated programme value "
            "exceeds $45 billion over its lifetime."
        ),
        "acquirer_country": "DE", "target_country": "US",
        "acquirer_logo_domain": "rheinmetall.com",
        "target_logo_domain": "rheinmetall.com",
        "source_url": "https://www.rheinmetall.com/en/investor-relations",
        "announced_date": datetime(2022, 9, 14, tzinfo=timezone.utc),
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
        "source_url": "https://www.lockheedmartin.com/en-us/news/news-releases/2024/lockheed-martin-completes-acquisition-of-terran-orbital.html",
        "announced_date": datetime(2024, 9, 5, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Blackstone (Nightwing)", "target": "Raytheon Cybersecurity Services",
        "deal_value": 320, "status": "completed", "deal_type": "acquisition",
        "description": "Blackstone carve-out of Raytheon cyber & intelligence unit → Nightwing Group",
        "rationale": (
            "Blackstone acquires Raytheon Technologies' (RTX) cybersecurity and intelligence "
            "services division in a $320 million carve-out, rebranding the standalone entity as "
            "Nightwing Group. RTX was the seller, retaining a minority strategic stake. Nightwing "
            "provides cyber, signals intelligence and mission-support services primarily to US "
            "government and DoD clients. The transaction closed July 2024."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "blackstone.com",
        "target_logo_domain": "rtx.com",
        "source_url": "https://www.rtx.com/news/news-center/2024/07/18/rtx-completes-separation-of-nightwing",
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
                "source_url": "https://www.baesystems.com/en/our-company/news-and-events/bae-systems-investor-news",
        "announced_date": datetime(2023, 8, 28, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Boeing", "target": "Spirit AeroSystems",
        "deal_value": 4700, "status": "pending", "deal_type": "acquisition",
        "description": "Boeing reacquisition of Spirit AeroSystems fuselage unit — announced Jul 2024, closing expected mid-2025",
        "rationale": (
            "Boeing announces in July 2024 a $4.7 billion agreement to reacquire Spirit AeroSystems, "
            "the fuselage and nacelle manufacturer it originally spun off in 2005, following "
            "quality-control crises on the 737 MAX programme. The deal, pending shareholder and "
            "regulatory approvals, is expected to close in mid-2025 and would bring Spirit's "
            "Wichita and Tulsa facilities back in-house to restore direct production oversight."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "boeing.com",
        "target_logo_domain": "spiritaero.com",
        "source_url": "https://boeing.mediaroom.com/2024-07-01-Boeing-Signs-Agreement-to-Reacquire-Spirit-AeroSystems",
        "announced_date": datetime(2024, 7, 1, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": None,
        "is_disclosed": True,
    },
    # ── 2022–2023 ─────────────────────────────────────────────────────────────
    {
        "acquirer": "L3Harris Technologies", "target": "Aerojet Rocketdyne",
        "deal_value": 4700, "status": "completed", "deal_type": "acquisition",
        "description": "L3Harris acquires Aerojet Rocketdyne for $4.7B — closed Jul 28 2023",
        "rationale": (
            "L3Harris Technologies announces a $4.7 billion all-cash acquisition of Aerojet Rocketdyne "
            "on 18 December 2022 ($58/share, including net debt). The Federal Trade Commission filed suit "
            "in January 2023 to block the deal; L3Harris successfully contested and completed the "
            "acquisition on 28 July 2023, forming a fourth business segment (Aerojet Rocketdyne). "
            "The deal gives L3Harris full vertical integration in solid-rocket-motor propulsion "
            "(RS-25, RL10, JASSM/LRASM propulsion), complementing its EW and C2 systems portfolio. "
            "Advisors — L3Harris: Barclays Capital, Goldman Sachs (financial), Simpson Thacher & Bartlett (legal); "
            "Aerojet: Citi, Evercore (financial), Wachtell Lipton (legal)."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "l3harris.com",
        "target_logo_domain": "aerojet.com",
        "source_url": "https://www.l3harris.com/newsroom/press-release/2023/07/l3harris-completes-aerojet-rocketdyne-acquisition",
        "announced_date": datetime(2022, 12, 18, tzinfo=timezone.utc),
        "stake_percentage": 100.0,
        "round_type": None,
        "is_disclosed": True,
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
        "source_url": "https://www.rheinmetall.com/en/media/news/press-releases/2022/rheinmetall-acquires-expal-systems",
        "announced_date": datetime(2022, 10, 12, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Hanwha Group", "target": "Daewoo Shipbuilding & Marine Engineering",
        "deal_value": 2000, "status": "completed", "deal_type": "acquisition",
        "description": "Hanwha acquires DSME → rebranded Hanwha Ocean, completed May 2023",
        "rationale": (
            "Hanwha Group's consortium wins the competitive bid to acquire Daewoo Shipbuilding "
            "and Marine Engineering (DSME) in February 2022. The transaction closes in May 2023 "
            "following Korean financial regulator approval; DSME is subsequently rebranded as "
            "Hanwha Ocean, creating one of the world's largest shipbuilders with a dominant "
            "position in submarine and naval surface vessel construction for South Korea and "
            "allied navies including Australia (Attack-class successor programme)."
        ),
        "acquirer_country": "KR", "target_country": "KR",
        "acquirer_logo_domain": "hanwha.com",
        "target_logo_domain": "hanwha.com",
        "source_url": "https://www.reuters.com/business/hanwha-completes-acquisition-daewoo-shipbuilding-2023-05/",
        "announced_date": datetime(2023, 5, 15, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": None,
        "is_disclosed": True,
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
                "source_url": "https://www.thalesgroup.com/en/worldwide/digital-identity-and-security/press-release/thales-completes-acquisition-imperva",
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
        "source_url": "https://www.businesswire.com/news/home/20220406005280/en/BAE-Systems-completes-acquisition-of-Bohemia-Interactive-Simulations",
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
                "source_url": "https://ir.parker.com/news-releases/news-release-details/parker-hannifin-completes-acquisition-meggitt-plc",
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
        "source_url": "https://www.businesswire.com/news/home/20210513005310/en/Teledyne-Technologies-Completes-Acquisition-of-FLIR-Systems",
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
                "source_url": "https://www.gov.uk/government/organisations/competition-and-markets-authority",
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
                "source_url": "https://www.leonardo.com/en/news-and-stories-detail/-/detail/leonardo-acquires-a-25-1-per-cent-stake-in-hensoldt",
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
                "source_url": "https://www.mrcy.com/company/news",
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
                "source_url": "https://shield.ai/newsroom",
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
                "source_url": "https://www.saic.com/news",
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
                "source_url": "https://www.avinc.com/company/news",
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
                "source_url": "https://www.rtx.com/news",
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
                "source_url": "https://www.gov.uk/government/organisations/competition-and-markets-authority",
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
                "source_url": "https://www.transdigm.com/news",
        "announced_date": datetime(2020, 11, 4, tzinfo=timezone.utc),
    },
    # ── 2019 ──────────────────────────────────────────────────────────────────
    {
        "acquirer": "Harris Corporation", "target": "L3 Technologies",
        "deal_value": 33500, "status": "completed", "deal_type": "merger",
        "description": "Merger of equals creating L3Harris Technologies — sixth-largest US defense prime",
        "rationale": (
            "Harris Corporation and L3 Technologies merge in an all-stock deal to "
            "create L3Harris Technologies, the sixth-largest US defense contractor. "
            "The combined entity focuses on communications systems, electronic warfare, "
            "space and ISR and generates revenues exceeding $18 billion annually."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "l3harris.com",
        "target_logo_domain": "l3harris.com",
        "source_url": "https://www.l3harris.com/newsroom/news-article/2019/06/l3-technologies-and-harris-corporation-complete-merger",
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
                "source_url": "https://www.prnewswire.com/news-releases/thales-finalizes-the-acquisition-of-gemalto-300820244.html",
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
        "source_url": "https://www.prnewswire.com/news-releases/saic-completes-acquisition-of-engility-300760082.html",
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
                "source_url": "https://www.edgegroup.ae/en",
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
                "source_url": "https://news.northropgrumman.com/news/releases",
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
        "source_url": "https://www.businesswire.com/news/home/20180402005568/en/General-Dynamics-Completes-Acquisition-CSRA",
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
        "source_url": "https://www.businesswire.com/news/home/20190206005455/en/TransDigm-Completes-Acquisition-Esterline-Technologies-Corporation",
        "announced_date": datetime(2018, 10, 10, tzinfo=timezone.utc),
    },
    {
        "acquirer": "Airbus", "target": "Bombardier C Series",
        "deal_value": 500, "status": "completed", "deal_type": "acquisition",
        "description": "Airbus acquires 50.01% majority stake in Bombardier's C Series programme (later renamed A220) — Bombardier the company was NOT acquired",
        "rationale": (
            "Airbus takes a 50.01% majority stake in the C Series Limited Partnership, "
            "Bombardier's C Series aircraft programme entity, after Bombardier faced severe "
            "financial pressure and US trade tariffs imposed by a Boeing petition. "
            "Bombardier the company remained fully independent. Airbus's involvement provided "
            "marketing, manufacturing and supply-chain support that saved the programme. "
            "The C Series was rebranded Airbus A220 in July 2018."
        ),
        "acquirer_country": "FR", "target_country": "CA",
        "acquirer_logo_domain": "airbus.com",
        "target_logo_domain": "bombardier.com",
        "source_url": "https://www.reuters.com/article/us-airbus-bombardier-cseries/airbus-takes-majority-stake-in-bombardier-cseries-idUSKCN1C32YC",
        "announced_date": datetime(2017, 10, 16, tzinfo=timezone.utc),
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
        "acquirer_logo_domain": "knds.com",
        "target_logo_domain": "knds.com",
        "source_url": "https://www.knds.com/en",
        "announced_date": datetime(2015, 7, 1, tzinfo=timezone.utc),
    },
]

# ── Participations, minority stakes, strategic investments and JVs ─────────
# Includes corporate venture investments, equity stakes and bilateral JVs
# that do not constitute full acquisitions.
MA_EXTRA_DEALS = [
    {
        "acquirer": "Dassault Aviation", "target": "Harmattan AI",
        "deal_value": 200, "status": "completed", "deal_type": "funding_round",
        "description": "Dassault Aviation participates in Harmattan AI $200M Series B — AI-powered C2 for French defence",
        "rationale": (
            "Harmattan.ai, French defence AI start-up specialising in AI-assisted command-and-control "
            "decision support, closes a $200 million Series B funding round with Dassault Aviation as "
            "a key strategic participant. The round accelerates development of Harmattan's AI-driven "
            "mission planning and real-time battlespace analysis software. Dassault's participation "
            "aligns with its strategy to embed AI natively into the Rafale F5 standard and FCAS "
            "programmes, providing AI-assisted C2 at operational tempo for French and allied forces."
        ),
        "acquirer_country": "FR", "target_country": "FR",
        "acquirer_logo_domain": "dassault-aviation.com",
        "target_logo_domain": "harmattan.ai",
        "source_url": "https://www.dassault-aviation.com/en/group/press/",
        "announced_date": datetime(2025, 3, 12, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": "series_b",
        "is_disclosed": True,
        "valuation": 1000,
    },
    # ── Defense Tech Startup Investments ──────────────────────────────────────
    {
        "acquirer": "L3Harris", "target": "Helsing",
        "deal_value": 50, "status": "completed", "deal_type": "strategic_investment",
        "description": "Strategic co-investment in Helsing's €450M Series B — European AI-for-defence leader",
        "rationale": (
            "L3Harris participates as a strategic investor in Helsing's €450M Series B "
            "financing round, the largest single defence AI funding round in European history. "
            "Helsing, headquartered in Munich, develops AI systems for sensor fusion, electronic "
            "warfare and autonomous mission management. L3Harris's ticket secures a minority "
            "stake and a preferred partner relationship for integrating Helsing software into "
            "L3Harris sensor payloads and EW systems deployed on NATO platforms."
        ),
        "acquirer_country": "US", "target_country": "DE",
        "acquirer_logo_domain": "l3harris.com",
        "target_logo_domain": "helsing.ai",
        "source_url": "https://helsing.ai/news/helsing-raises-eur-450-million-series-b-to-accelerate-ai-for-defence",
        "announced_date": datetime(2024, 9, 18, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": "series_b",
        "is_disclosed": True,
        "valuation": 1200,
    },
    {
        "acquirer": "Northrop Grumman", "target": "Epirus",
        "deal_value": 0, "status": "completed", "deal_type": "strategic_investment",
        "description": "Strategic investment in Epirus — high-power microwave counter-drone technology",
        "rationale": (
            "Northrop Grumman makes a strategic equity investment in Epirus, a US defense "
            "tech startup developing the Leonidas high-power microwave (HPM) weapon system "
            "for counter-drone and counter-electronics missions. The investment provides "
            "Northrop with a preferred technology partner for directed-energy payloads, "
            "complementing its Integrated Air and Missile Defense portfolio, while Epirus "
            "gains access to Northrop's systems integration expertise and government customer relationships."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "northropgrumman.com",
        "target_logo_domain": "epirusinc.com",
        "source_url": "https://www.epirusinc.com/posts/epirus-raises-200m-series-c-from-new-and-existing-investors",
        "announced_date": datetime(2023, 11, 7, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": None,
        "is_disclosed": False,
        "valuation": 800,
    },
    {
        "acquirer": "Airbus", "target": "Milrem Robotics",
        "deal_value": 0, "status": "completed", "deal_type": "minority_stake",
        "description": "Minority stake in Estonian autonomous ground vehicle pioneer",
        "rationale": (
            "Airbus Defence and Space acquires a minority equity stake in Milrem Robotics, "
            "the Estonian developer of the THeMIS unmanned ground vehicle (UGV) platform "
            "deployed by multiple NATO armies. The deal builds on an existing teaming "
            "agreement for the iMUGS (integrated Modular Unmanned Ground System) EU-funded "
            "programme, giving Airbus a foothold in the fast-growing autonomous land systems "
            "market and Milrem access to Airbus's European government sales network."
        ),
        "acquirer_country": "FR", "target_country": "EE",
        "acquirer_logo_domain": "airbus.com",
        "target_logo_domain": "milremrobotics.com",
        "source_url": "https://www.milremrobotics.com/airbus-defence-space-acquires-stake-in-milrem-robotics/",
        "announced_date": datetime(2024, 4, 22, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": None,
        "is_disclosed": False,
        "valuation": 300,
    },
    {
        "acquirer": "RTX Ventures", "target": "Capella Space",
        "deal_value": 15, "status": "completed", "deal_type": "strategic_investment",
        "description": "Strategic investment in Capella's SAR satellite constellation — Series C participation",
        "rationale": (
            "RTX Ventures, the corporate venture arm of RTX, participates in Capella Space's "
            "Series C funding round. Capella operates a commercial SAR (Synthetic Aperture Radar) "
            "satellite constellation providing all-weather, day-night imagery for government and "
            "commercial customers. The investment aligns with RTX's space intelligence strategy "
            "and provides access to Capella's growing GEOINT data pipeline for integration with "
            "RTX sensor systems and DARPA/NRO programme requirements."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "rtx.com",
        "target_logo_domain": "capellaspace.com",
        "source_url": "https://www.capellaspace.com/capella-space-raises-97-million-in-series-c-funding/",
        "announced_date": datetime(2023, 6, 14, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": "series_c",
        "is_disclosed": True,
        "valuation": 400,
    },
    {
        "acquirer": "Safran", "target": "Preligens",
        "deal_value": 220, "status": "completed", "deal_type": "acquisition",
        "description": "Full acquisition of French AI-powered GEOINT startup — rebranded Safran AI",
        "rationale": (
            "Safran acquires Preligens, a French AI startup specialising in automated satellite "
            "image analysis and geospatial intelligence (GEOINT). Preligens's Earth and Sky "
            "platforms use computer vision to automatically detect and classify military assets "
            "in satellite imagery at scale. Following the acquisition, Preligens was rebranded "
            "Safran AI, anchoring Safran's push into AI-driven defence intelligence and ISR systems."
        ),
        "acquirer_country": "FR", "target_country": "FR",
        "acquirer_logo_domain": "safran-group.com",
        "target_logo_domain": "preligens.com",
        "source_url": "https://www.safran-group.com/en/media/press-release/safran-completes-acquisition-preligens",
        "announced_date": datetime(2023, 10, 3, tzinfo=timezone.utc),
        "stake_percentage": 100.0,
        "round_type": None,
        "is_disclosed": True,
    },
    {
        "acquirer": "Rheinmetall + BAE Systems", "target": "RBSL (Rheinmetall BAE Systems Land)",
        "deal_value": 0, "status": "completed", "deal_type": "joint_venture",
        "description": "50/50 JV for UK land vehicle programmes (Ajax, Boxer, OMFV)",
        "rationale": (
            "Rheinmetall and BAE Systems establish Rheinmetall BAE Systems Land (RBSL), "
            "a 50/50 joint venture, to deliver the British Army's fleet of next-generation "
            "armoured vehicles. RBSL holds the prime contract for the Ajax armoured cavalry "
            "vehicle, acts as the UK national integrator for Boxer, and supports the "
            "British Army's Challenger 3 upgrade programme."
        ),
        "acquirer_country": "DE", "target_country": "GB",
        "acquirer_logo_domain": "rheinmetall.com",
        "target_logo_domain": "rbsl.co.uk",
        "source_url": "https://www.baesystems.com/en/our-company/news-and-events/bae-systems-investor-news",
        "announced_date": datetime(2019, 5, 8, tzinfo=timezone.utc),
        "stake_percentage": 50.0,
        "round_type": None,
        "is_disclosed": False,
    },
    {
        "acquirer": "Airbus + Safran", "target": "ArianeGroup",
        "deal_value": 0, "status": "active", "deal_type": "joint_venture",
        "description": "50/50 JV — European sovereign space-launch systems champion",
        "rationale": (
            "Airbus and Safran merge their space-propulsion and launch-vehicle activities "
            "into ArianeGroup, a 50/50 joint holding company, creating Europe's sovereign "
            "space-launch system prime. ArianeGroup controls Ariane 6 development and "
            "production, the M51 ballistic missile for the French Navy (MSBS programme), "
            "and a portfolio of space-propulsion products. The entity is the sole prime "
            "contractor to ESA for Ariane launchers."
        ),
        "acquirer_country": "FR", "target_country": "FR",
        "acquirer_logo_domain": "airbus.com",
        "target_logo_domain": "arianegroup.com",
        "source_url": "https://www.arianegroup.com/en/news/press-releases",
        "announced_date": datetime(2015, 6, 23, tzinfo=timezone.utc),
        "stake_percentage": 50.0,
        "round_type": None,
        "is_disclosed": False,
    },
    {
        "acquirer": "Anduril Industries", "target": "Area-I",
        "deal_value": 0, "status": "completed", "deal_type": "acquisition",
        "description": "Acquisition of ALTIUS-600 swarming loitering munition maker",
        "rationale": (
            "Anduril Industries acquires Area-I, the developer of the ALTIUS-600 "
            "air-launched swarming munition, to bolster its counter-UAS and strike "
            "capability. Area-I's ALTIUS-600 had already been selected under the US "
            "Air Force's LCAAT (Low-Cost Attributable Aircraft Technology) programme. "
            "The acquisition accelerates Anduril's push into autonomous strike systems "
            "alongside its Ghost and Roadrunner platforms."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "anduril.com",
        "target_logo_domain": "anduril.com",
        "source_url": "https://www.anduril.com/newsroom",
        "announced_date": datetime(2021, 6, 7, tzinfo=timezone.utc),
        "stake_percentage": 100.0,
        "round_type": None,
        "is_disclosed": False,
    },
    {
        "acquirer": "Airbus + BAE Systems + Leonardo", "target": "MBDA",
        "deal_value": 0, "status": "active", "deal_type": "joint_venture",
        "description": "Tri-national JV — Europe's largest missile systems integrator",
        "rationale": (
            "Airbus (37.5%), BAE Systems (37.5%) and Leonardo (25%) jointly own MBDA, "
            "Europe's largest missile systems house. MBDA produces Meteor, Aster, "
            "Brimstone, Exocet, Storm Shadow/SCALP and the Common Anti-air Modular "
            "Missile (CAMM/Sky Sabre) families. The tri-national governance structure "
            "ensures member nations retain export sovereignty while pooling R&D."
        ),
        "acquirer_country": "FR", "target_country": "FR",
        "acquirer_logo_domain": "airbus.com",
        "target_logo_domain": "mbda-systems.com",
        "source_url": "https://www.mbda-systems.com/",
        "announced_date": datetime(2001, 12, 18, tzinfo=timezone.utc),
        "stake_percentage": 37.5,
        "round_type": None,
        "is_disclosed": False,
    },
    {
        "acquirer": "Anduril Industries", "target": "Adranos",
        "deal_value": 0, "status": "completed", "deal_type": "acquisition",
        "description": "High-energy solid-fuel propulsion technology acquisition",
        "rationale": (
            "Anduril acquires Adranos, a developer of ALITEC solid-fuel propellant "
            "offering significantly higher energy density than conventional hydroxyl-"
            "terminated polybutadiene (HTPB) propellants. The acquisition gives "
            "Anduril proprietary propulsion technology for its hypersonic and "
            "long-range munitions programmes, reducing dependence on legacy suppliers."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "anduril.com",
        "target_logo_domain": "anduril.com",
        "source_url": "https://www.anduril.com/newsroom",
        "announced_date": datetime(2023, 4, 12, tzinfo=timezone.utc),
        "stake_percentage": 100.0,
        "round_type": None,
        "is_disclosed": False,
    },
    {
        "acquirer": "Leonardo DRS", "target": "RADA Electronic Industries",
        "deal_value": 510, "status": "completed", "deal_type": "acquisition",
        "description": "Israeli tactical radar maker merger with US defence prime",
        "rationale": (
            "Leonardo DRS merges with RADA Electronic Industries, an Israeli developer "
            "of small tactical radars widely used for counter-drone and force-protection "
            "missions, in an all-stock deal valuing RADA at approximately $510 million. "
            "The combined entity strengthens Leonardo DRS's ground-based radar and EW "
            "portfolio and provides RADA with the scale and US government relationships "
            "to win larger prime contracts."
        ),
        "acquirer_country": "IT", "target_country": "IL",
        "acquirer_logo_domain": "leonardodrs.com",
        "target_logo_domain": "rada.com",
        "source_url": "https://www.leonardodrs.com/news/",
        "announced_date": datetime(2022, 11, 28, tzinfo=timezone.utc),
        "stake_percentage": 100.0,
        "round_type": None,
        "is_disclosed": True,
    },
    # ── 2026 ──────────────────────────────────────────────────────────────────
    {
        "acquirer": "KNDS France", "target": "Texelis Defense",
        "deal_value": 0, "status": "completed", "deal_type": "acquisition",
        "description": "KNDS France acquires Texelis Defense — French military vehicle driveline specialist",
        "rationale": (
            "KNDS France (the French subsidiary of KNDS, parent company of Nexter Systems) acquires "
            "Texelis Defense, a French manufacturer of hub-reduction drives, axles and driveline "
            "systems for wheeled and tracked military vehicles. Texelis equipment equips the Leclerc "
            "MBT, VAB, VBCI and Caesar self-propelled howitzer. The acquisition verticalises KNDS "
            "France's supply chain for its key land platforms and strengthens French industrial "
            "sovereignty in the land vehicle sector — a strategic priority under the LPM 2024-2030."
        ),
        "acquirer_country": "FR", "target_country": "FR",
        "acquirer_logo_domain": "knds.com",
        "target_logo_domain": "texelis.com",
        "source_url": "https://www.knds.com/en",
        "announced_date": datetime(2025, 11, 5, tzinfo=timezone.utc),
        "stake_percentage": 100.0,
        "round_type": None,
        "is_disclosed": False,
    },
    # ── 2024 ──────────────────────────────────────────────────────────────────
    {
        "acquirer": "AeroVironment", "target": "Tomahawk Robotics",
        "deal_value": 120, "status": "completed", "deal_type": "acquisition",
        "description": "Multi-domain UGV control system maker acquired for $120M",
        "rationale": (
            "AeroVironment acquires Tomahawk Robotics for $120 million, expanding its portfolio "
            "from small UAS into unmanned ground vehicle (UGV) command-and-control systems. "
            "Tomahawk's flagship product — the Kinesis controller — provides a unified human-machine "
            "interface for commanding heterogeneous UGV and UAS fleets from a single device. The deal "
            "positions AeroVironment to compete for US Army and SOCOM multi-domain robotics programmes "
            "and adds a complementary product line to its Switchblade loitering munition family."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "avinc.com",
        "target_logo_domain": "tomahawkrobotics.com",
        "source_url": "https://www.avinc.com/company/news",
        "announced_date": datetime(2024, 2, 27, tzinfo=timezone.utc),
        "stake_percentage": 100.0,
        "round_type": None,
        "is_disclosed": True,
    },
    {
        "acquirer": "Anduril Industries", "target": "Rebellion Defense",
        "deal_value": 0, "status": "completed", "deal_type": "minority_stake",
        "description": "Anduril acqui-hire of Rebellion Defense team — company closed, key talent absorbed",
        "rationale": (
            "Anduril Industries acquires key assets and engineering talent from Rebellion Defense, "
            "a Washington DC-based defense technology startup known for its IronBank container "
            "registry and Phantom AI software platform. This was a partial acqui-hire: Rebellion "
            "Defense ceased operations and was wound down, with select personnel and IP absorbed "
            "into Anduril's Lattice platform team. Co-founders Chris Lynch and Nand Mulchandani "
            "did not join Anduril. Value undisclosed; not a 100% corporate acquisition."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "anduril.com",
        "target_logo_domain": "rebelliondefense.com",
        "source_url": "https://www.defenseone.com/technology/2024/01/rebellion-defense-shuts-down/393564/",
        "announced_date": datetime(2024, 1, 18, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": None,
        "is_disclosed": False,
    },
    {
        "acquirer": "Rheinmetall", "target": "Loc Performance Products",
        "deal_value": 950, "status": "completed", "deal_type": "acquisition",
        "description": "Rheinmetall acquires Loc Performance Products for ~$950M — US military vehicle driveline specialist",
        "rationale": (
            "Rheinmetall acquires Loc Performance Products for approximately $950 million, a US "
            "manufacturer of military vehicle driveline components including transfer cases, "
            "differentials and final drive assemblies for the Abrams MBT, Bradley IFV and JLTV "
            "programmes. Announced June 2024. The acquisition strengthens Rheinmetall's US defence "
            "industrial footprint and provides verticalised supply-chain capability for its "
            "expanding American Rheinmetall Vehicles (ARV) joint programme competing for the US "
            "Army OMFV contract."
        ),
        "acquirer_country": "DE", "target_country": "US",
        "acquirer_logo_domain": "rheinmetall.com",
        "target_logo_domain": "rheinmetall.com",
        "source_url": "https://www.rheinmetall.com/en/media/news/press-releases/2024/rheinmetall-acquires-loc-performance-products",
        "announced_date": datetime(2024, 6, 1, tzinfo=timezone.utc),
        "stake_percentage": 100.0,
        "round_type": None,
        "is_disclosed": True,
    },
    # ── 2022–2023 ─────────────────────────────────────────────────────────────
    {
        "acquirer": "Saab", "target": "MD Helicopters",
        "deal_value": 232, "status": "completed", "deal_type": "acquisition",
        "description": "Swedish prime acquires Arizona-based light military helicopter OEM",
        "rationale": (
            "Saab AB acquires MD Helicopters, an Arizona-based manufacturer of light civil and "
            "military helicopters including the MD 500 and MD 969 Combat Explorer series, for "
            "$232 million. The acquisition gives Saab a rotor-wing platform to complement its "
            "fixed-wing portfolio (Gripen, GlobalEye) and a foothold in US domestic helicopter "
            "maintenance and upgrade markets for law enforcement and special operations forces. "
            "The deal also includes MD Helicopter's MRO and training services business."
        ),
        "acquirer_country": "SE", "target_country": "US",
        "acquirer_logo_domain": "saabgroup.com",
        "target_logo_domain": "mdhelicopters.com",
        "source_url": "https://www.saabgroup.com/media/news-press/news/",
        "announced_date": datetime(2022, 12, 7, tzinfo=timezone.utc),
        "stake_percentage": 100.0,
        "round_type": None,
        "is_disclosed": True,
    },
    {
        "acquirer": "Leonardo DRS", "target": "Calspan Corporation",
        "deal_value": 1060, "status": "completed", "deal_type": "acquisition",
        "description": "Aerospace and defense test-engineering group acquired for $1.06B",
        "rationale": (
            "Leonardo DRS acquires Calspan Corporation, a Buffalo, NY-based aerospace test "
            "and engineering company operating unique variable-stability research aircraft, "
            "hypersonic wind tunnels and automotive safety labs, for $1.06 billion. The deal "
            "expands Leonardo DRS's ground-test, simulation and flight-test services capabilities, "
            "supporting US Air Force, Navy and Army experimental and developmental programmes. "
            "Calspan's variable-stability aircraft fleet is unique in North America for pilot training "
            "and aircraft certification."
        ),
        "acquirer_country": "IT", "target_country": "US",
        "acquirer_logo_domain": "leonardodrs.com",
        "target_logo_domain": "calspan.com",
        "source_url": "https://www.leonardodrs.com/news/",
        "announced_date": datetime(2022, 12, 9, tzinfo=timezone.utc),
        "stake_percentage": 100.0,
        "round_type": None,
        "is_disclosed": True,
    },
    # ── European Joint Programmes ─────────────────────────────────────────────
    {
        "acquirer": "Airbus + Dassault Aviation + Indra", "target": "SCAF/FCAS Programme",
        "deal_value": 0, "status": "under_review", "deal_type": "joint_venture",
        "description": "Trinational programme — SCAF/FCAS next-generation combat air system (FR/DE/ES, 2040+)",
        "rationale": (
            "France, Germany and Spain launch the Système de Combat Aérien du Futur (SCAF/FCAS) "
            "programme at the Franco-German Aix-la-Chapelle summit (Jul 2017), designating "
            "Dassault Aviation (France, NGF prime), Airbus Defence & Space (Germany/Spain, "
            "Remote Carriers and combat cloud architecture) and Indra (Spain, EW/sensors) as "
            "industrial leads. The programme targets a Next-Generation Fighter, loyal wingman "
            "Remote Carriers, a new engine (MGDE, Safran + MTU) and a combat cloud network for "
            "IOC around 2040. Phase 1B contracts worth €3.5 billion were signed in Dec 2022. "
            "Industrial work-share has been repeatedly contested between Airbus DS and Dassault, "
            "with multiple near-breakdowns in 2021 and ongoing renegotiation in 2025-2026."
        ),
        "acquirer_country": "FR", "target_country": "EU",
        "acquirer_logo_domain": "dassault-aviation.com",
        "target_logo_domain": None,
        "source_url": "https://www.dassault-aviation.com/en/group/press/",
        "announced_date": datetime(2017, 7, 13, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": None,
        "is_disclosed": False,
        "confidence": "high",
        "notes": (
            "No formal joint venture entity constituted as of 2026. Programme governance is via "
            "OCCAR/DGA contracts. Phase 1B contracts signed Dec 2022 (€3.5B). Work-share "
            "between Airbus DS and Dassault Aviation under renegotiation."
        ),
    },
    # ── 2019 ──────────────────────────────────────────────────────────────────
    {
        "acquirer": "Leidos", "target": "Dynetics",
        "deal_value": 1650, "status": "completed", "deal_type": "acquisition",
        "description": "Huntsville defense R&D and hypersonic systems acquisition for $1.65B",
        "rationale": (
            "Leidos acquires Dynetics, a Huntsville, Alabama-based applied research and national "
            "security technology company, for $1.65 billion. Dynetics develops hypersonic weapon "
            "systems (HAWC programme), electronic warfare payloads, space systems and ground-based "
            "missile defence technologies. The deal significantly expands Leidos's presence in "
            "hypersonics and advanced weaponry, complementing its intelligence and IT services "
            "business. Dynetics was formerly a finalist for the US Army's LREW programme."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "leidos.com",
        "target_logo_domain": "leidos.com",
        "source_url": "https://www.leidos.com/company/news",
        "announced_date": datetime(2019, 9, 24, tzinfo=timezone.utc),
        "stake_percentage": 100.0,
        "round_type": None,
        "is_disclosed": True,
    },
    # ── 2021 ──────────────────────────────────────────────────────────────────
    {
        "acquirer": "Kongsberg Defence & Aerospace", "target": "Patria Oyj",
        "deal_value": 100, "status": "completed", "deal_type": "acquisition",
        "description": "Norwegian prime increases stake to 50% in Finnish defence champion Patria",
        "rationale": (
            "Kongsberg Defence & Aerospace, a subsidiary of Kongsberg Gruppen, acquires an "
            "additional stake in Patria Oyj, the Finnish state-owned defence company, bringing "
            "its total shareholding to 50%. Patria manufactures the AMV 8x8 armoured wheeled "
            "vehicle (used by 14 armies), provides aircraft MRO services for F-18 and BAE Hawk, "
            "and produces 81/120mm mortar systems. The deal deepens the Nordic defence industrial "
            "partnership and positions the combined Kongsberg-Patria entity for future European "
            "armoured vehicle competitions, including the German HMT programme."
        ),
        "acquirer_country": "NO", "target_country": "FI",
        "acquirer_logo_domain": "kongsberg.com",
        "target_logo_domain": "patriagroup.com",
        "source_url": "https://www.kongsberg.com/news-and-media/",
        "announced_date": datetime(2021, 1, 15, tzinfo=timezone.utc),
        "stake_percentage": 50.0,
        "round_type": None,
        "is_disclosed": True,
    },
    # ── Failed / cancelled blockbusters ───────────────────────────────────────
    {
        "acquirer": "Lockheed Martin", "target": "Aerojet Rocketdyne",
        "deal_value": 4400, "status": "cancelled", "deal_type": "acquisition",
        "description": "FTC blocked $4.4B bid for the US's last independent rocket motor maker",
        "rationale": (
            "Lockheed Martin announced an all-cash acquisition of Aerojet Rocketdyne for $4.4 billion "
            "in December 2020. The FTC sued to block the deal in January 2022, arguing Lockheed would "
            "gain the ability to cut off rival defence primes from critical solid-rocket-motor supply. "
            "Lockheed terminated the agreement in February 2022, leaving Aerojet Rocketdyne as an "
            "independent supplier. The failed deal accelerated DoD concern about consolidation risk "
            "in the US propulsion industrial base."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "lockheedmartin.com",
        "target_logo_domain": "aerojet.com",
        "source_url": "https://www.ftc.gov/news-events/news/press-releases/2022/01/ftc-challenges-lockheed-martins-44-billion-acquisition-aerojet-rocketdyne",
        "announced_date": datetime(2020, 12, 20, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": None,
        "is_disclosed": True,
    },
    # ── 2024 — Defense Tech ────────────────────────────────────────────────────
    {
        "acquirer": "Founders Fund + General Atlantic", "target": "Anduril Industries",
        "deal_value": 1500, "status": "completed", "deal_type": "strategic_investment",
        "description": "Anduril Industries Series F — largest single defense tech raise in history",
        "rationale": (
            "Anduril Industries closes a $1.5 billion Series F round at a $14 billion post-money "
            "valuation — the largest single financing in defense technology history. Investors include "
            "Founders Fund (lead), General Atlantic, Valor Equity Partners, 8VC and Andreessen "
            "Horowitz. The capital funds mass production scale-up for the Roadrunner-M interceptor, "
            "Fury UCAV, and Lattice AI platform, and expands Anduril's manufacturing campus in Ohio. "
            "The round underscores the shift of tier-1 capital toward US defence autonomy platforms."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "anduril.com",
        "target_logo_domain": "anduril.com",
        "source_url": "https://www.anduril.com/article/anduril-raises-1-5b-series-f/",
        "announced_date": datetime(2024, 8, 7, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": "growth",
        "is_disclosed": True,
        "valuation": 14000,
    },
    # ── 2023 ──────────────────────────────────────────────────────────────────
    {
        "acquirer": "HEICO Corporation", "target": "Wencor Group",
        "deal_value": 1900, "status": "completed", "deal_type": "acquisition",
        "description": "HEICO acquires Wencor — aviation aftermarket parts distributor for $1.9B",
        "rationale": (
            "HEICO Corporation acquires Wencor Group, a leading US aviation aftermarket parts "
            "distributor and repair station operator, for approximately $1.9 billion. Wencor serves "
            "commercial, business and military operators with FAA/PMA-approved parts and MRO services. "
            "The deal significantly expands HEICO's distribution network and repair capabilities, "
            "including its military aviation aftermarket services for C-130, F-16 and C-17 fleets. "
            "Combined annual revenues exceed $3.5 billion."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "heico.com",
        "target_logo_domain": "heico.com",
        "source_url": "https://www.heico.com/news",
        "announced_date": datetime(2023, 7, 24, tzinfo=timezone.utc),
        "stake_percentage": 100.0,
        "round_type": None,
        "is_disclosed": True,
    },
    # ── 2022 ──────────────────────────────────────────────────────────────────
    {
        "acquirer": "L3Harris Technologies", "target": "Condor Systems",
        "deal_value": 1050, "status": "completed", "deal_type": "acquisition",
        "description": "Airborne ELINT and electronic warfare systems maker acquired for $1.05B",
        "rationale": (
            "L3Harris Technologies acquires Condor Systems, a San Jose-based developer of airborne "
            "electronic intelligence (ELINT) and electronic attack systems, from Vector Capital for "
            "$1.05 billion. Condor's products collect and exploit adversary radar emissions and support "
            "electronic order-of-battle mapping for US Air Force and Navy ISR platforms including "
            "RC-135 Rivet Joint and EP-3E. The acquisition strengthens L3Harris's Electronic Systems "
            "segment and its position in integrated EW/ISR mission systems."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "l3harris.com",
        "target_logo_domain": "l3harris.com",
        "source_url": "https://www.businesswire.com/news/home/20220222005297/en/L3Harris-Acquires-Condor-Systems",
        "announced_date": datetime(2022, 2, 22, tzinfo=timezone.utc),
        "stake_percentage": 100.0,
        "round_type": None,
        "is_disclosed": True,
    },
    {
        "acquirer": "Carlyle Group", "target": "ManTech International",
        "deal_value": 4200, "status": "completed", "deal_type": "acquisition",
        "description": "Private equity take-private of US government cybersecurity & IT services group",
        "rationale": (
            "Carlyle Group acquires ManTech International, a US government cybersecurity, digital "
            "transformation and mission IT company, for $4.2 billion in an all-cash take-private "
            "transaction. ManTech provides classified intelligence, DoD and federal civilian agencies "
            "with cyber operations, data analytics and software development. The deal reflects "
            "sustained PE appetite for stable, highly cleared government IT services businesses "
            "with recurring DoD contract revenue."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "carlyle.com",
        "target_logo_domain": "mantech.com",
        "source_url": "https://www.mantech.com/newsroom",
        "announced_date": datetime(2022, 5, 16, tzinfo=timezone.utc),
        "stake_percentage": 100.0,
        "round_type": None,
        "is_disclosed": True,
    },
    {
        "acquirer": "QinetiQ", "target": "Avantus Federal",
        "deal_value": 590, "status": "completed", "deal_type": "acquisition",
        "description": "QinetiQ acquires US national security services firm to double its US presence",
        "rationale": (
            "QinetiQ Group acquires Avantus, a US national security and intelligence services company "
            "headquartered in Virginia, for approximately $590 million. Avantus provides cyber, "
            "digital transformation and mission support services to the US intelligence community "
            "and DoD. The deal roughly doubles QinetiQ's US headcount and revenue, accelerating "
            "its strategy to establish a balanced US-UK defence technology and services business "
            "alongside its core UK MoD test and evaluation franchise."
        ),
        "acquirer_country": "GB", "target_country": "US",
        "acquirer_logo_domain": "qinetiq.com",
        "target_logo_domain": "qinetiq.com",
        "source_url": "https://www.qinetiq.com/news-and-events/news",
        "announced_date": datetime(2022, 4, 19, tzinfo=timezone.utc),
        "stake_percentage": 100.0,
        "round_type": None,
        "is_disclosed": True,
    },
    {
        "acquirer": "Tikehau Capital", "target": "iXBlue + ECA Group → Exail",
        "deal_value": 0, "status": "completed", "deal_type": "merger",
        "description": "Merger of iXBlue & ECA Group to create Exail — French naval & autonomy champion",
        "rationale": (
            "French PE firm Tikehau Capital orchestrates the merger of iXBlue (fiber-optic inertial "
            "navigation, subsea positioning and photonics) with ECA Group (marine autonomous systems, "
            "military simulators, inspection robots) to form Exail in October 2022. The combined "
            "entity generates revenues of approximately €350 million and serves NATO navies, the "
            "DGA and international customers with underwater drones (Seascan, AUVs), mine-clearance "
            "systems, submarine navigation and ruggedised training simulators for fighter pilots."
        ),
        "acquirer_country": "FR", "target_country": "FR",
        "acquirer_logo_domain": "tikehau-capital.com",
        "target_logo_domain": "exail.com",
        "source_url": "https://www.exail.com/news",
        "announced_date": datetime(2022, 10, 1, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": None,
        "is_disclosed": False,
    },
    {
        "acquirer": "Thales", "target": "Ercom",
        "deal_value": 200, "status": "completed", "deal_type": "acquisition",
        "description": "Thales acquires Ercom — encrypted mobile comms specialist for French government",
        "rationale": (
            "Thales acquires Ercom, a Paris-based company specialising in encrypted mobile "
            "communications and sovereign messaging platforms used by French government ministries, "
            "the military, and regulated enterprises. Ercom's Cryptobox and Citadel Team products "
            "are accredited by ANSSI (France's national cybersecurity agency) for classified use. "
            "The deal reinforces Thales's position as the primary supplier of sovereign digital "
            "communications to the French state and underpins its ambition for European secure "
            "communications leadership."
        ),
        "acquirer_country": "FR", "target_country": "FR",
        "acquirer_logo_domain": "thalesgroup.com",
        "target_logo_domain": "thalesgroup.com",
        "source_url": "https://www.thalesgroup.com/en/group/journalist/press_release/thales-acquires-ercom",
        "announced_date": datetime(2022, 3, 15, tzinfo=timezone.utc),
        "stake_percentage": 100.0,
        "round_type": None,
        "is_disclosed": True,
    },
    # ── 2021 ──────────────────────────────────────────────────────────────────
    {
        "acquirer": "Huntington Ingalls Industries", "target": "Alion Science and Technology",
        "deal_value": 1650, "status": "completed", "deal_type": "acquisition",
        "description": "HII acquires Alion — defense R&D and naval systems engineering for $1.65B",
        "rationale": (
            "Huntington Ingalls Industries (HII) acquires Alion Science and Technology, a "
            "Fairfax, Virginia-based defense R&D and technical services company, for $1.65 billion. "
            "Alion specialises in naval architecture, systems engineering, live-fire test ranges, "
            "and C4ISR integration services for the US Navy, DARPA and joint force commands. "
            "The deal nearly doubles HII's technical services revenue and creates a complementary "
            "engineering pipeline for HII's shipbuilding programmes at Newport News and Ingalls."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "hii.com",
        "target_logo_domain": "hii.com",
        "source_url": "https://investors.hii.com/news-releases",
        "announced_date": datetime(2021, 6, 29, tzinfo=timezone.utc),
        "stake_percentage": 100.0,
        "round_type": None,
        "is_disclosed": True,
    },
    {
        "acquirer": "Leidos", "target": "Gibbs & Cox",
        "deal_value": 380, "status": "completed", "deal_type": "acquisition",
        "description": "World's largest independent naval architecture firm acquired for $380M",
        "rationale": (
            "Leidos acquires Gibbs & Cox, the world's largest independent naval architecture and "
            "marine engineering firm, for $380 million. Founded in 1929, Gibbs & Cox designed the "
            "USS Spruance, Ticonderoga-class cruisers and the DDG-51 Arleigh Burke destroyer. "
            "The acquisition brings deep naval design competency into Leidos's defense and maritime "
            "division, enabling integrated offerings from concept design through systems integration "
            "and in-service support for US and allied navies."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "leidos.com",
        "target_logo_domain": "leidos.com",
        "source_url": "https://www.leidos.com/company/news",
        "announced_date": datetime(2021, 11, 3, tzinfo=timezone.utc),
        "stake_percentage": 100.0,
        "round_type": None,
        "is_disclosed": True,
    },
    {
        "acquirer": "Peraton", "target": "Perspecta",
        "deal_value": 7100, "status": "completed", "deal_type": "acquisition",
        "description": "Veritas Capital-backed Peraton acquires Perspecta for $7.1B — creates US intel IT giant",
        "rationale": (
            "Peraton (backed by Veritas Capital) acquires Perspecta, a leading US government IT "
            "services company with classified intelligence community contracts, for $7.1 billion. "
            "Perspecta had been spun out of DXC Technology's US public sector business in 2018. "
            "The combined Peraton-Perspecta entity becomes one of the top five US government IT "
            "service providers, covering CIA, NGA, NSA and DoD digital transformation programmes "
            "with a cleared workforce of over 26,000 personnel."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "peraton.com",
        "target_logo_domain": "peraton.com",
        "source_url": "https://www.peraton.com/newsroom",
        "announced_date": datetime(2021, 1, 27, tzinfo=timezone.utc),
        "stake_percentage": 100.0,
        "round_type": None,
        "is_disclosed": True,
    },
    {
        "acquirer": "Shield AI", "target": "Martin UAV",
        "deal_value": 0, "status": "completed", "deal_type": "acquisition",
        "description": "Shield AI acquires Martin UAV — maker of the V-BAT vertical-takeoff tactical UAS",
        "rationale": (
            "Shield AI acquires Martin UAV, the developer of the V-BAT (formerly known as the "
            "WB-37), a vertical-takeoff-and-landing (VTOL) Group 3 UAS designed for austere "
            "shipboard and expeditionary operations. The V-BAT was selected by the US Navy for "
            "its Small Tactical Unmanned Aircraft System (STUAS) programme and by SOCOM. "
            "The deal gives Shield AI a production-ready hardware platform to complement its "
            "Hivemind autonomous pilot AI, enabling fully autonomous ship-based UAS operations "
            "without GPS."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "shield.ai",
        "target_logo_domain": "shield.ai",
        "source_url": "https://shield.ai/newsroom",
        "announced_date": datetime(2021, 9, 13, tzinfo=timezone.utc),
        "stake_percentage": 100.0,
        "round_type": None,
        "is_disclosed": False,
    },
    {
        "acquirer": "RTX", "target": "Blue Canyon Technologies",
        "deal_value": 0, "status": "completed", "deal_type": "acquisition",
        "description": "RTX acquires Blue Canyon — premier small satellite bus and spacecraft maker",
        "rationale": (
            "Raytheon Technologies (RTX) acquires Blue Canyon Technologies, a leading manufacturer "
            "of small satellite buses and spacecraft for DoD, NASA and commercial customers. "
            "Blue Canyon's platforms have flown on DARPA Blackjack, Air Force Research Laboratory "
            "and various NASA science missions. The deal integrates Blue Canyon's rapid-prototyping "
            "capability into RTX's space sensor and communications portfolio and supports the "
            "US Space Force's proliferated LEO architecture programmes."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "rtx.com",
        "target_logo_domain": "rtx.com",
        "source_url": "https://www.rtx.com/news",
        "announced_date": datetime(2021, 1, 11, tzinfo=timezone.utc),
        "stake_percentage": 100.0,
        "round_type": None,
        "is_disclosed": False,
    },
    {
        "acquirer": "Babcock International", "target": "Frazer-Nash Consultancy",
        "deal_value": 360, "status": "completed", "deal_type": "acquisition",
        "description": "Babcock acquires Frazer-Nash — UK defense engineering consultancy from Ricardo",
        "rationale": (
            "Babcock International acquires Frazer-Nash Consultancy, a UK engineering and technology "
            "consultancy serving defence, nuclear and space markets, from Ricardo plc for £293 million "
            "(~$360 million). Frazer-Nash provides systems engineering, digital modelling and safety "
            "case expertise for the Royal Navy's nuclear submarine programme, UK armoured vehicle "
            "procurement and satellite projects. The deal significantly expands Babcock's technical "
            "services capability beyond its traditional ship support and nuclear roles."
        ),
        "acquirer_country": "GB", "target_country": "GB",
        "acquirer_logo_domain": "babcock.com",
        "target_logo_domain": "babcock.com",
        "source_url": "https://www.babcock.com/en/news",
        "announced_date": datetime(2021, 6, 24, tzinfo=timezone.utc),
        "stake_percentage": 100.0,
        "round_type": None,
        "is_disclosed": True,
    },
    # ── 2018 ──────────────────────────────────────────────────────────────────
    {
        "acquirer": "Elbit Systems", "target": "IMI Systems",
        "deal_value": 520, "status": "completed", "deal_type": "acquisition",
        "description": "Elbit acquires Israel Military Industries — privatisation of Israeli defense titan",
        "rationale": (
            "Elbit Systems acquires Israel Military Industries (IMI Systems) from the Israeli "
            "government for approximately $520 million in a landmark privatisation. IMI is one of "
            "Israel's oldest and most important defence manufacturers, producing Kalanit guided "
            "mortar rounds, Lynx artillery rocket systems, Namer heavy APC upgrades and a large "
            "portfolio of ammunition and combat engineering solutions. The acquisition makes Elbit "
            "the dominant Israeli land-systems prime and removes a state-owned competitor, "
            "significantly expanding export revenue potential."
        ),
        "acquirer_country": "IL", "target_country": "IL",
        "acquirer_logo_domain": "elbitsystems.com",
        "target_logo_domain": "elbitsystems.com",
        "source_url": "https://www.elbitsystems.com/media",
        "announced_date": datetime(2018, 3, 11, tzinfo=timezone.utc),
        "stake_percentage": 100.0,
        "round_type": None,
        "is_disclosed": True,
    },
    # ── Defense Tech Startup Funding Rounds ───────────────────────────────────
    {
        "acquirer": "Andreessen Horowitz / Founders Fund", "target": "Anduril Industries",
        "deal_value": 1480, "status": "completed", "deal_type": "funding_round",
        "description": "Series F — autonomous defense systems platform (Roadrunner-M, Fury UAV, Lattice AI)",
        "rationale": (
            "Anduril Industries closes a $1.48 billion Series F round co-led by Andreessen Horowitz "
            "and Founders Fund, pushing valuation to $14 billion. Proceeds accelerate production of "
            "the Roadrunner-M interceptor drone, Fury combat UAV, and Lattice AI command-and-control "
            "platform. The round reflects surging US DoD demand for next-generation autonomous defense "
            "systems and positions Anduril as a direct challenger to traditional prime contractors."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "a16z.com",
        "target_logo_domain": "anduril.com",
        "source_url": "https://techcrunch.com/2024/12/17/anduril-raises-1-5b-series-f/",
        "announced_date": datetime(2024, 12, 17, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": "series_f",
        "is_disclosed": True,
        "valuation": 14000,
    },
    {
        "acquirer": "General Catalyst", "target": "Hermeus",
        "deal_value": 350, "status": "announced", "deal_type": "funding_round",
        "description": "Series C — unmanned hypersonic fighter development (Mach 5+)",
        "rationale": (
            "Hermeus announces a $350 million Series C round to build its unmanned hypersonic fighter "
            "programme and push Mach 5+ innovation forward. The company aims to deliver the world's "
            "fastest unmanned aircraft, combining AI autonomy with hypersonic propulsion. The US Air "
            "Force Research Laboratory (AFRL) is a co-development partner. Proceeds fund full-scale "
            "prototype construction and a dedicated test-flight campaign from Edwards AFB."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "generalcatalyst.com",
        "target_logo_domain": "hermeus.com",
        "source_url": "https://www.hermeus.com/press",
        "announced_date": datetime(2026, 4, 9, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": "series_c",
        "is_disclosed": True,
        "valuation": 2000,
    },
    {
        "acquirer": "General Atlantic", "target": "Skydio",
        "deal_value": 230, "status": "completed", "deal_type": "funding_round",
        "description": "Series E — AI-autonomous drones for US military and law enforcement",
        "rationale": (
            "Skydio raises $230 million in a Series E round led by General Atlantic, with strategic "
            "participation from the US Army venture arm. The largest US drone manufacturer, Skydio "
            "produces AI-autonomous quadcopters deployed by the military, border security, and critical "
            "infrastructure operators. Capital supports a new manufacturing facility in Utah and "
            "accelerated development for Group 2 UAS military requirements."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "generalatlantic.com",
        "target_logo_domain": "skydio.com",
        "source_url": "https://techcrunch.com/2022/09/14/skydio-raises-230m-series-e/",
        "announced_date": datetime(2022, 9, 14, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": "series_e",
        "is_disclosed": True,
        "valuation": 2200,
    },
    {
        "acquirer": "General Catalyst", "target": "Shield AI",
        "deal_value": 200, "status": "completed", "deal_type": "funding_round",
        "description": "Series F — AI pilot software for F-16s, MQ-9 Reapers and V-BAT drones",
        "rationale": (
            "Shield AI secures a $200 million Series F round valuing the company at $2.7 billion. "
            "Its Hivemind AI pilot software is deployed on F-16 fighters, MQ-9 Reapers and V-BAT "
            "Group 3 drones under active US DoD contracts. Capital funds expansion of the autonomous "
            "flight platform and scale-up of V-BAT manufacturing to meet accelerating Air Force "
            "and Navy demand for uncrewed autonomous systems."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "generalcatalyst.com",
        "target_logo_domain": "shield.ai",
        "source_url": "https://techcrunch.com/2023/10/11/shield-ai-raises-200m-series-f/",
        "announced_date": datetime(2023, 10, 11, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": "series_f",
        "is_disclosed": True,
        "valuation": 2700,
    },
    {
        "acquirer": "Lux Capital", "target": "True Anomaly",
        "deal_value": 100, "status": "completed", "deal_type": "funding_round",
        "description": "Series B — autonomous spacecraft for space domain awareness (US Space Force)",
        "rationale": (
            "True Anomaly closes a $100 million Series B led by Lux Capital. The company builds the "
            "Jackal autonomous spacecraft for rendezvous and proximity operations (RPO) and the Mosaic "
            "software platform for space domain awareness, with US Space Force as a key customer. "
            "Funding accelerates the first in-orbit demonstration and commercial constellation "
            "deployment amid heightened demand for orbital situational awareness capabilities."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "luxcapital.com",
        "target_logo_domain": "trueanomaly.space",
        "source_url": "https://techcrunch.com/2024/01/18/true-anomaly-raises-100m-series-b/",
        "announced_date": datetime(2024, 1, 18, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": "series_b",
        "is_disclosed": True,
        "valuation": 500,
    },
    {
        "acquirer": "Lux Capital", "target": "Ursa Major",
        "deal_value": 138, "status": "completed", "deal_type": "funding_round",
        "description": "Series C — American-made rocket propulsion systems for DoD and Space Force",
        "rationale": (
            "Ursa Major closes a $138 million Series C led by Lux Capital to scale production of "
            "the Hadley and Ripley liquid rocket engines. The company is the only independent US "
            "manufacturer spanning pressure-fed, pump-fed, and turbopump propulsion architectures. "
            "DoD and Space Force customers require resilient domestic propulsion supply chains; "
            "the round addresses surge-capacity shortfalls exposed by increased launch demand."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "luxcapital.com",
        "target_logo_domain": "ursamajor.com",
        "source_url": "https://techcrunch.com/2024/01/09/ursa-major-raises-138m-series-c/",
        "announced_date": datetime(2024, 1, 9, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": "series_c",
        "is_disclosed": True,
        "valuation": 700,
    },
    {
        "acquirer": "Founders Fund", "target": "Hermeus",
        "deal_value": 100, "status": "completed", "deal_type": "funding_round",
        "description": "Series B — Mach 5 hypersonic aircraft and Quarterhorse UAV demonstrator",
        "rationale": (
            "Hermeus secures $100 million in Series B financing to accelerate development of Halcyon, "
            "its Mach 5 hypersonic passenger aircraft, and Quarterhorse, the unmanned Mach 5 "
            "technology demonstrator targeting US Air Force ISR and strike requirements. Founders Fund "
            "leads alongside Khosla Ventures and Y Combinator. The round establishes Hermeus as the "
            "leading privately-funded hypersonic aircraft developer in the Western world."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "foundersfund.com",
        "target_logo_domain": "hermeus.com",
        "source_url": "https://techcrunch.com/2022/07/14/hermeus-raises-100m-series-b/",
        "announced_date": datetime(2022, 7, 14, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": "series_b",
        "is_disclosed": True,
        "valuation": 600,
    },
    {
        "acquirer": "Tiger Global Management", "target": "Rebellion Defense",
        "deal_value": 150, "status": "completed", "deal_type": "funding_round",
        "description": "Series C — AI-native software for intelligence analysis and cyber operations",
        "rationale": (
            "Rebellion Defense raises $150 million in Series C financing to scale its AI-native "
            "software stack for intelligence analysis, cyber operations, and command decision support. "
            "The company holds classified programmes with multiple US defence agencies. Tiger Global "
            "leads alongside In-Q-Tel and Shield Capital Partners, reflecting strong conviction in "
            "AI-first defense software as a paradigm shift in government IT modernisation."
        ),
        "acquirer_country": "US", "target_country": "US",
        "acquirer_logo_domain": "tigerglobal.com",
        "target_logo_domain": "rebelliondefense.com",
        "source_url": "https://techcrunch.com/2022/11/15/rebellion-defense-raises-150m-series-c/",
        "announced_date": datetime(2022, 11, 15, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": "series_c",
        "is_disclosed": True,
        "valuation": 1200,
    },
    # ── European Defense Startups — 2025 Funding Cohort ────────────────────────
    {
        "acquirer": "Prima Materia + General Catalyst + Lightspeed",
        "target": "Helsing",
        "deal_value": 648, "status": "completed", "deal_type": "funding_round",
        "description": "Helsing €600M growth round — largest-ever European defence AI raise",
        "rationale": (
            "Helsing, the Munich- and London-based AI-for-defence company, closes a €600M "
            "growth round led by Swedish deep-tech investor Prima Materia alongside General "
            "Catalyst and Lightspeed Venture Partners. The capital funds mass-deployment of "
            "Helsing's AI sensor-fusion and electronic-warfare software across NATO air and "
            "ground platforms, and accelerates hiring across its European engineering hubs. "
            "The round values Helsing at approximately €5B, cementing its position as the "
            "leading European autonomous-defence software company."
        ),
        "acquirer_country": "SE", "target_country": "DE",
        "acquirer_logo_domain": "primamateria.com",
        "target_logo_domain": "helsing.ai",
        "source_url": "https://helsing.ai/news/",
        "announced_date": datetime(2025, 3, 10, tzinfo=timezone.utc),
        "stake_percentage": None, "round_type": "growth", "is_disclosed": True,
        "valuation": 5400,
    },
    {
        "acquirer": "Ventura Capital + Baillie Gifford",
        "target": "TEKEVER",
        "deal_value": 432, "status": "completed", "deal_type": "funding_round",
        "description": "TEKEVER €400M Series D — European drone ISR scale-up",
        "rationale": (
            "TEKEVER, the Portuguese developer of long-endurance maritime surveillance UAVs "
            "trusted by NATO and EU border agencies, raises €400M in a Series D co-led by "
            "Ventura Capital and Baillie Gifford. The funding accelerates production of the "
            "AR5 and AR8 systems, expands the company's UK and Poland manufacturing footprint, "
            "and supports integration of AI-powered sensor payloads for the European Maritime "
            "Safety Agency and allied navies."
        ),
        "acquirer_country": "GB", "target_country": "PT",
        "acquirer_logo_domain": "bailliegifford.com",
        "target_logo_domain": "tekever.com",
        "source_url": "https://tekever.com/news/",
        "announced_date": datetime(2025, 2, 18, tzinfo=timezone.utc),
        "stake_percentage": None, "round_type": "series_d", "is_disclosed": True,
        "valuation": 1500,
    },
    {
        "acquirer": "Lightspeed + Lakestar + Index",
        "target": "Roark Aerospace",
        "deal_value": 210, "status": "completed", "deal_type": "funding_round",
        "description": "Roark Aerospace $210M Series C — UK autonomous air systems",
        "rationale": (
            "Roark Aerospace, a Cambridge-based developer of autonomous fixed-wing strike "
            "and ISR platforms, raises $210M in a Series C led by Lightspeed with Lakestar "
            "and Index Ventures participating. Funds accelerate certification of its "
            "AI-piloted collaborative combat aircraft for UK MoD trials and position the "
            "company for upcoming NATO loyal-wingman programme competitions."
        ),
        "acquirer_country": "US", "target_country": "GB",
        "acquirer_logo_domain": "lsvp.com",
        "target_logo_domain": "roarkaerospace.com",
        "source_url": "https://roarkaerospace.com/news/",
        "announced_date": datetime(2025, 4, 2, tzinfo=timezone.utc),
        "stake_percentage": None, "round_type": "series_c", "is_disclosed": True,
        "valuation": 900,
    },
    {
        "acquirer": "Balderton + Hensoldt + HV Capital",
        "target": "Quantum Systems",
        "deal_value": 173, "status": "completed", "deal_type": "funding_round",
        "description": "Quantum Systems €160M Series C — VTOL ISR drones for defence",
        "rationale": (
            "Munich-based Quantum Systems, maker of the Trinity F90+ and Vector VTOL ISR "
            "drones deployed in Ukraine and by NATO partners, secures €160M in a Series C "
            "led by Balderton Capital with strategic participation from Hensoldt and HV Capital. "
            "The investment scales manufacturing capacity and funds integration of Hensoldt "
            "Kalaetron sensor suites into the next-generation Vector XL platform."
        ),
        "acquirer_country": "GB", "target_country": "DE",
        "acquirer_logo_domain": "balderton.com",
        "target_logo_domain": "quantum-systems.com",
        "source_url": "https://quantum-systems.com/news/",
        "announced_date": datetime(2025, 1, 28, tzinfo=timezone.utc),
        "stake_percentage": None, "round_type": "series_c", "is_disclosed": True,
        "valuation": 700,
    },
    {
        "acquirer": "General Catalyst + A.P. Møller + Bpifrance",
        "target": "ICEYE",
        "deal_value": 162, "status": "completed", "deal_type": "funding_round",
        "description": "ICEYE €150M Series D — SAR satellite constellation expansion",
        "rationale": (
            "ICEYE, the Finnish pioneer in synthetic-aperture radar (SAR) microsatellites, "
            "raises €150M in a Series D led by General Catalyst with A.P. Møller and Bpifrance "
            "as co-investors. The capital funds five additional SAR satellites to bring the "
            "constellation to 35 spacecraft, reduces revisit time to under two hours for any "
            "point on Earth, and expands ICEYE's government intelligence contracts across "
            "NATO member states."
        ),
        "acquirer_country": "US", "target_country": "FI",
        "acquirer_logo_domain": "generalcatalyst.com",
        "target_logo_domain": "iceye.com",
        "source_url": "https://www.iceye.com/press-releases/",
        "announced_date": datetime(2025, 3, 5, tzinfo=timezone.utc),
        "stake_percentage": None, "round_type": "series_d", "is_disclosed": True,
        "valuation": 800,
    },
    {
        "acquirer": "Sequoia + Founders Fund + Thiel Capital",
        "target": "Stark",
        "deal_value": 92, "status": "completed", "deal_type": "funding_round",
        "description": "Stark $92M Series B — AI-powered munitions guidance systems",
        "rationale": (
            "Stark, a Berlin-based defence startup developing AI-guided precision munition "
            "kits and autonomous loitering munitions, closes a $92M Series B co-led by "
            "Sequoia Capital, Founders Fund and Thiel Capital. The round funds EU production "
            "scale-up and qualification testing for German Bundeswehr and allied programmes, "
            "positioning Stark as the European counterpart to US-based precision munitions "
            "innovators entering the Bundeswehr and NATO supply chains."
        ),
        "acquirer_country": "US", "target_country": "DE",
        "acquirer_logo_domain": "sequoiacap.com",
        "target_logo_domain": "stark.defense",
        "source_url": "https://stark.defense/news/",
        "announced_date": datetime(2025, 2, 10, tzinfo=timezone.utc),
        "stake_percentage": None, "round_type": "series_b", "is_disclosed": True,
        "valuation": 400,
    },
    {
        "acquirer": "Plug and Play + OneRagtime",
        "target": "Destinus",
        "deal_value": 54, "status": "completed", "deal_type": "funding_round",
        "description": "Destinus €50M Series B — hydrogen-powered hypersonic aircraft",
        "rationale": (
            "Swiss hypersonic and hydrogen-propulsion startup Destinus raises €50M in a "
            "Series B co-led by Plug and Play and OneRagtime. The capital funds continued "
            "development of the Destinus-3 demonstrator, targeting Mach 5+ cruise speeds on "
            "green hydrogen fuel, and supports certification track work with EASA for both "
            "commercial high-speed transport and dual-use military ISR applications."
        ),
        "acquirer_country": "US", "target_country": "CH",
        "acquirer_logo_domain": "plugandplaytechcenter.com",
        "target_logo_domain": "destinus.ch",
        "source_url": "https://destinus.ch/news/",
        "announced_date": datetime(2025, 1, 15, tzinfo=timezone.utc),
        "stake_percentage": None, "round_type": "series_b", "is_disclosed": True,
        "valuation": 250,
    },
    {
        "acquirer": "NATO Innovation Fund + Lakestar",
        "target": "Isembard",
        "deal_value": 50, "status": "completed", "deal_type": "funding_round",
        "description": "Isembard $50M Series B — autonomous underwater vehicle systems",
        "rationale": (
            "Isembard, a UK developer of long-endurance autonomous underwater vehicles (AUVs) "
            "for mine countermeasures and seabed warfare, raises $50M in a Series B backed by "
            "the NATO Innovation Fund and Lakestar. The investment accelerates qualification "
            "for UK Royal Navy programmes and expands Isembard's AUV fleet for allied navies "
            "in the Baltic and North Atlantic."
        ),
        "acquirer_country": "BE", "target_country": "GB",
        "acquirer_logo_domain": "natoinnovationfund.nato.int",
        "target_logo_domain": "isembard.com",
        "source_url": "https://isembard.com/news/",
        "announced_date": datetime(2025, 2, 25, tzinfo=timezone.utc),
        "stake_percentage": None, "round_type": "series_b", "is_disclosed": True,
        "valuation": 200,
    },
    {
        "acquirer": "Hadean Ventures + Plural",
        "target": "UFORCE",
        "deal_value": 50, "status": "completed", "deal_type": "funding_round",
        "description": "UFORCE $50M Series B — modular counter-UAS and EW platforms",
        "rationale": (
            "UFORCE, a UK-based startup building modular counter-drone and electronic warfare "
            "platforms for dismounted soldiers, raises $50M in a Series B led by Hadean Ventures "
            "alongside Plural. The round funds integration of AI-driven threat classification, "
            "expands manufacturing in Wales, and supports qualification for British Army and "
            "allied ground force procurement programmes."
        ),
        "acquirer_country": "GB", "target_country": "GB",
        "acquirer_logo_domain": "hadeanventures.com",
        "target_logo_domain": "uforce.com",
        "source_url": "https://uforce.com/news/",
        "announced_date": datetime(2025, 3, 18, tzinfo=timezone.utc),
        "stake_percentage": None, "round_type": "series_b", "is_disclosed": True,
        "valuation": 200,
    },
    {
        "acquirer": "Atlantic Bridge",
        "target": "Knogin",
        "deal_value": 50, "status": "completed", "deal_type": "funding_round",
        "description": "Knogin $50M Series B — quantum-safe cybersecurity for defence",
        "rationale": (
            "Knogin, a Dublin-based quantum-safe cybersecurity company protecting defence "
            "communications and critical national infrastructure, raises $50M in a Series B "
            "led by Atlantic Bridge. The capital funds expansion of Knogin's post-quantum "
            "cryptography platform to NATO and Five Eyes government customers, and accelerates "
            "product development ahead of NIST PQC algorithm mandates."
        ),
        "acquirer_country": "IE", "target_country": "IE",
        "acquirer_logo_domain": "abven.com",
        "target_logo_domain": "knogin.com",
        "source_url": "https://knogin.com/news/",
        "announced_date": datetime(2025, 1, 22, tzinfo=timezone.utc),
        "stake_percentage": None, "round_type": "series_b", "is_disclosed": True,
        "valuation": 200,
    },
    {
        "acquirer": "HV Capital + Speedinvest + NATO Innovation Fund",
        "target": "ARX Robotics",
        "deal_value": 45, "status": "completed", "deal_type": "funding_round",
        "description": "ARX Robotics €42M Series A — autonomous ground vehicles for NATO",
        "rationale": (
            "ARX Robotics, a Munich-based maker of unmanned ground vehicles (UGVs) for "
            "logistics, engineering support and direct action, raises €42M in a Series A "
            "co-led by HV Capital, Speedinvest and the NATO Innovation Fund. Funds support "
            "production scale-up for Bundeswehr and allied ground forces, and qualification "
            "of the GEREON UGV for NATO interoperability standards."
        ),
        "acquirer_country": "DE", "target_country": "DE",
        "acquirer_logo_domain": "hvcapital.com",
        "target_logo_domain": "arx-robotics.com",
        "source_url": "https://arx-robotics.com/news/",
        "announced_date": datetime(2025, 2, 5, tzinfo=timezone.utc),
        "stake_percentage": None, "round_type": "series_a", "is_disclosed": True,
        "valuation": 180,
    },
    {
        "acquirer": "Keen Venture Partners",
        "target": "Onodrim Industries",
        "deal_value": 43, "status": "completed", "deal_type": "funding_round",
        "description": "Onodrim Industries €40M Series B — autonomous naval mine countermeasures",
        "rationale": (
            "Onodrim Industries, an Amsterdam-based startup developing AI-driven autonomous "
            "systems for naval mine countermeasures and seabed survey, raises €40M in a Series B "
            "led by Keen Venture Partners. The investment funds fleet expansion, integration "
            "with Royal Netherlands Navy programmes, and development of next-generation "
            "sonar payload systems for minehunter AUVs."
        ),
        "acquirer_country": "NL", "target_country": "NL",
        "acquirer_logo_domain": "keen.vc",
        "target_logo_domain": "onodrimindustries.com",
        "source_url": "https://onodrimindustries.com/news/",
        "announced_date": datetime(2025, 3, 28, tzinfo=timezone.utc),
        "stake_percentage": None, "round_type": "series_b", "is_disclosed": True,
        "valuation": 160,
    },
    {
        "acquirer": "Bpifrance",
        "target": "Cailabs",
        "deal_value": 40, "status": "completed", "deal_type": "funding_round",
        "description": "Cailabs €37M Series B — photonic beam-shaping for defence lasers",
        "rationale": (
            "Cailabs, a Rennes-based photonics company developing advanced beam-shaping "
            "technology for high-energy laser systems, free-space optical communications "
            "and LIDAR, raises €37M in a Series B led by Bpifrance. The funding accelerates "
            "integration of Cailabs' TILBA fibre-beam combination modules into French and "
            "European directed-energy weapon and SATCOM programmes."
        ),
        "acquirer_country": "FR", "target_country": "FR",
        "acquirer_logo_domain": "bpifrance.fr",
        "target_logo_domain": "cailabs.com",
        "source_url": "https://www.cailabs.com/news/",
        "announced_date": datetime(2025, 1, 30, tzinfo=timezone.utc),
        "stake_percentage": None, "round_type": "series_b", "is_disclosed": True,
        "valuation": 150,
    },
    {
        "acquirer": "Plural",
        "target": "Frankenburg Tech",
        "deal_value": 32, "status": "completed", "deal_type": "funding_round",
        "description": "Frankenburg Tech €30M Series A — AI-powered electronic warfare",
        "rationale": (
            "Frankenburg Tech, a Berlin-based electronic warfare startup using AI for "
            "real-time spectrum management and cognitive jamming, raises €30M in a Series A "
            "led by Plural. The round funds development of its software-defined EW platform "
            "for Bundeswehr and allied airborne and ground-based EW systems, targeting the "
            "rapidly expanding European EW modernisation market."
        ),
        "acquirer_country": "GB", "target_country": "DE",
        "acquirer_logo_domain": "plural.vc",
        "target_logo_domain": "frankenburg.tech",
        "source_url": "https://frankenburg.tech/news/",
        "announced_date": datetime(2025, 2, 14, tzinfo=timezone.utc),
        "stake_percentage": None, "round_type": "series_a", "is_disclosed": True,
        "valuation": 120,
    },
    {
        "acquirer": "Aismia + NATO Innovation Fund",
        "target": "Tytan Technologies",
        "deal_value": 32, "status": "completed", "deal_type": "funding_round",
        "description": "Tytan Technologies €30M Series A — drone swarm coordination software",
        "rationale": (
            "Tytan Technologies, a Munich-based developer of swarm coordination and mission "
            "autonomy software for heterogeneous drone fleets, closes a €30M Series A backed "
            "by Aismia and the NATO Innovation Fund. The capital funds integration with "
            "Bundeswehr drone programmes, certification under STANAG standards, and expansion "
            "of Tytan's AI-driven collaborative autonomy stack across allied military UAV fleets."
        ),
        "acquirer_country": "FR", "target_country": "DE",
        "acquirer_logo_domain": "aismia.com",
        "target_logo_domain": "tytantechnologies.com",
        "source_url": "https://tytantechnologies.com/news/",
        "announced_date": datetime(2025, 3, 8, tzinfo=timezone.utc),
        "stake_percentage": None, "round_type": "series_a", "is_disclosed": True,
        "valuation": 120,
    },
    {
        "acquirer": "PMV + Invest-NL",
        "target": "Optics11",
        "deal_value": 27, "status": "completed", "deal_type": "funding_round",
        "description": "Optics11 €25M Series B — fibre-optic sensing for naval platforms",
        "rationale": (
            "Optics11, an Amsterdam-based fibre-optic sensing company, raises €25M in a "
            "Series B co-led by PMV (Flemish investment company) and Invest-NL. The funding "
            "accelerates deployment of Optics11's distributed acoustic sensing and structural "
            "health monitoring systems on naval vessels and submarine hull monitoring "
            "applications for NATO navies in the North Sea and Baltic regions."
        ),
        "acquirer_country": "BE", "target_country": "NL",
        "acquirer_logo_domain": "pmv.eu",
        "target_logo_domain": "optics11.com",
        "source_url": "https://optics11.com/news/",
        "announced_date": datetime(2025, 1, 20, tzinfo=timezone.utc),
        "stake_percentage": None, "round_type": "series_b", "is_disclosed": True,
        "valuation": 100,
    },
    {
        "acquirer": "Plural + General Catalyst",
        "target": "Hypersonica",
        "deal_value": 25, "status": "completed", "deal_type": "funding_round",
        "description": "Hypersonica €23M Series A — European hypersonic propulsion research",
        "rationale": (
            "Hypersonica, a Munich-based deep-tech startup developing scramjet and combined-"
            "cycle propulsion systems for hypersonic vehicles, raises €23M in a Series A "
            "co-led by Plural and General Catalyst. The capital funds continued propulsion "
            "testing, a dual-use roadmap for both military strike systems and rapid-response "
            "satellite launch vehicles, and key hires from DLR and Airbus propulsion teams."
        ),
        "acquirer_country": "GB", "target_country": "DE",
        "acquirer_logo_domain": "plural.vc",
        "target_logo_domain": "hypersonica.com",
        "source_url": "https://hypersonica.com/news/",
        "announced_date": datetime(2025, 4, 1, tzinfo=timezone.utc),
        "stake_percentage": None, "round_type": "series_a", "is_disclosed": True,
        "valuation": 90,
    },
    {
        "acquirer": "UVC Partners + General Catalyst",
        "target": "Twentyfour Industries",
        "deal_value": 12, "status": "completed", "deal_type": "funding_round",
        "description": "Twentyfour Industries $12M Series A — AI-enabled target recognition",
        "rationale": (
            "Twentyfour Industries, a Munich-based startup applying computer vision and "
            "edge-AI to real-time target recognition for drone and vehicle-mounted systems, "
            "raises $12M in a Series A co-led by UVC Partners and General Catalyst. "
            "The funding supports hardware-software co-design for low-SWaP AI inference "
            "modules and pilot contracts with European land forces."
        ),
        "acquirer_country": "DE", "target_country": "DE",
        "acquirer_logo_domain": "uvcpartners.com",
        "target_logo_domain": "twentyfourindustries.com",
        "source_url": "https://twentyfourindustries.com/news/",
        "announced_date": datetime(2025, 2, 20, tzinfo=timezone.utc),
        "stake_percentage": None, "round_type": "series_a", "is_disclosed": True,
        "valuation": 45,
    },
    {
        "acquirer": "IQ Capital + General Catalyst",
        "target": "Alpine Eagle",
        "deal_value": 11, "status": "completed", "deal_type": "funding_round",
        "description": "Alpine Eagle €10M Seed — autonomous VTOL ISR for mountainous terrain",
        "rationale": (
            "Alpine Eagle, a Cambridge-based startup developing high-altitude VTOL ISR drones "
            "optimised for mountainous and Arctic operating environments, raises €10M in a "
            "seed round co-led by IQ Capital and General Catalyst. The capital funds "
            "development of its cold-weather-hardened sensor payload and initial trials with "
            "UK Special Forces and NATO mountain warfare units."
        ),
        "acquirer_country": "GB", "target_country": "GB",
        "acquirer_logo_domain": "iqcapital.vc",
        "target_logo_domain": "alpineeagle.aero",
        "source_url": "https://alpineeagle.aero/news/",
        "announced_date": datetime(2025, 3, 15, tzinfo=timezone.utc),
        "stake_percentage": None, "round_type": "seed", "is_disclosed": True,
        "valuation": 35,
    },
    {
        "acquirer": "EFFEN Capital + Tesi Ventures",
        "target": "Ammunity",
        "deal_value": 10, "status": "completed", "deal_type": "funding_round",
        "description": "Ammunity €9M Seed — AI-driven ammunition inventory management",
        "rationale": (
            "Ammunity, a Helsinki-based defence logistics startup using AI to optimise "
            "ammunition supply chains and inventory forecasting for armed forces, raises €9M "
            "in a seed round backed by EFFEN Capital and Tesi Ventures. The funding targets "
            "deployment across Finnish Defence Forces and expands to other Nordic and "
            "Baltic NATO members facing ammunition stockpile management challenges."
        ),
        "acquirer_country": "FI", "target_country": "FI",
        "acquirer_logo_domain": "effencapital.com",
        "target_logo_domain": "ammunity.com",
        "source_url": "https://ammunity.com/news/",
        "announced_date": datetime(2025, 1, 12, tzinfo=timezone.utc),
        "stake_percentage": None, "round_type": "seed", "is_disclosed": True,
        "valuation": 30,
    },
    {
        "acquirer": "Bpifrance",
        "target": "EGIDE",
        "deal_value": 9, "status": "completed", "deal_type": "funding_round",
        "description": "EGIDE €8M Seed — hardened electronics packaging for defence systems",
        "rationale": (
            "EGIDE, a French specialist in hermetically sealed ceramic and metal electronic "
            "packages for extreme-environment defence electronics (missiles, radar, EW), "
            "raises €8M in a seed round from Bpifrance. The capital funds capacity expansion "
            "of EGIDE's thermal management packaging for next-generation missile seekers and "
            "space-qualified electronics under DGA contracts."
        ),
        "acquirer_country": "FR", "target_country": "FR",
        "acquirer_logo_domain": "bpifrance.fr",
        "target_logo_domain": "egide-group.com",
        "source_url": "https://www.egide-group.com/en/news/",
        "announced_date": datetime(2025, 2, 8, tzinfo=timezone.utc),
        "stake_percentage": None, "round_type": "seed", "is_disclosed": True,
        "valuation": 28,
    },
    {
        "acquirer": "CDF Ventures",
        "target": "Belss",
        "deal_value": 8, "status": "completed", "deal_type": "funding_round",
        "description": "Belss €7M Seed — AI-powered logistics for forward-deployed forces",
        "rationale": (
            "Belss, a London-based defence tech startup developing AI-powered last-mile "
            "logistics and autonomous resupply routing for forward-deployed ground forces, "
            "raises €7M in a seed round led by CDF Ventures. The funding supports integration "
            "with British Army logistics systems and development of autonomous supply drone "
            "coordination for contested environments."
        ),
        "acquirer_country": "GB", "target_country": "GB",
        "acquirer_logo_domain": "cdfventures.com",
        "target_logo_domain": "belss.com",
        "source_url": "https://belss.com/news/",
        "announced_date": datetime(2025, 3, 22, tzinfo=timezone.utc),
        "stake_percentage": None, "round_type": "seed", "is_disclosed": True,
        "valuation": 25,
    },
    {
        "acquirer": "Early Game Ventures",
        "target": "Orbotix",
        "deal_value": 8, "status": "completed", "deal_type": "funding_round",
        "description": "Orbotix €7M Seed — autonomous inspection robots for defence infrastructure",
        "rationale": (
            "Orbotix, a Bucharest-based startup building autonomous inspection robots for "
            "military infrastructure, airbase runways and critical national installations, "
            "raises €7M in a seed round led by Early Game Ventures. The capital funds "
            "completion of the Orbotix-1 robot prototype, integration of AI-based anomaly "
            "detection for NATO base inspections, and expansion across Romania and Eastern "
            "European defence infrastructure clients."
        ),
        "acquirer_country": "RO", "target_country": "RO",
        "acquirer_logo_domain": "earlygame.vc",
        "target_logo_domain": "orbotix.io",
        "source_url": "https://orbotix.io/news/",
        "announced_date": datetime(2025, 4, 5, tzinfo=timezone.utc),
        "stake_percentage": None, "round_type": "seed", "is_disclosed": True,
        "valuation": 25,
    },
]

# Extended Expenditures
EXPENDITURES_DATA = [
    # — Top spenders —
    {"country": "United States", "country_code": "US", "year": 2024, "expenditure": 886.0, "gdp_percent": 3.4, "region": "North America", "source": "SIPRI"},
    {"country": "China", "country_code": "CN", "year": 2024, "expenditure": 296.0, "gdp_percent": 1.7, "region": "Asia-Pacific", "source": "SIPRI"},
    {"country": "Russia", "country_code": "RU", "year": 2024, "expenditure": 109.0, "gdp_percent": 5.9, "region": "Europe", "source": "SIPRI"},
    {"country": "India", "country_code": "IN", "year": 2024, "expenditure": 83.6, "gdp_percent": 2.4, "region": "Asia-Pacific", "source": "SIPRI"},
    {"country": "Saudi Arabia", "country_code": "SA", "year": 2024, "expenditure": 75.0, "gdp_percent": 7.1, "region": "Middle East", "source": "SIPRI"},
    {"country": "United Kingdom", "country_code": "GB", "year": 2024, "expenditure": 68.5, "gdp_percent": 2.3, "region": "Europe", "source": "SIPRI"},
    {"country": "Ukraine", "country_code": "UA", "year": 2024, "expenditure": 64.7, "gdp_percent": 37.1, "region": "Europe", "source": "SIPRI"},
    {"country": "Germany", "country_code": "DE", "year": 2024, "expenditure": 66.8, "gdp_percent": 1.6, "region": "Europe", "source": "SIPRI"},
    {"country": "France", "country_code": "FR", "year": 2024, "expenditure": 61.3, "gdp_percent": 2.1, "region": "Europe", "source": "SIPRI"},
    {"country": "Japan", "country_code": "JP", "year": 2024, "expenditure": 50.2, "gdp_percent": 1.2, "region": "Asia-Pacific", "source": "SIPRI"},
    {"country": "South Korea", "country_code": "KR", "year": 2024, "expenditure": 46.4, "gdp_percent": 2.8, "region": "Asia-Pacific", "source": "SIPRI"},
    {"country": "Australia", "country_code": "AU", "year": 2024, "expenditure": 32.3, "gdp_percent": 2.0, "region": "Asia-Pacific", "source": "SIPRI"},
    {"country": "Italy", "country_code": "IT", "year": 2024, "expenditure": 31.5, "gdp_percent": 1.5, "region": "Europe", "source": "SIPRI"},
    {"country": "Poland", "country_code": "PL", "year": 2024, "expenditure": 31.6, "gdp_percent": 4.0, "region": "Europe", "source": "SIPRI"},
    {"country": "Canada", "country_code": "CA", "year": 2024, "expenditure": 26.9, "gdp_percent": 1.4, "region": "North America", "source": "SIPRI"},
    {"country": "Israel", "country_code": "IL", "year": 2024, "expenditure": 23.4, "gdp_percent": 5.3, "region": "Middle East", "source": "SIPRI"},
    {"country": "UAE", "country_code": "AE", "year": 2024, "expenditure": 22.5, "gdp_percent": 4.5, "region": "Middle East", "source": "SIPRI"},
    {"country": "Turkey", "country_code": "TR", "year": 2024, "expenditure": 22.8, "gdp_percent": 1.9, "region": "Europe", "source": "SIPRI"},
    {"country": "Brazil", "country_code": "BR", "year": 2024, "expenditure": 22.9, "gdp_percent": 1.2, "region": "South America", "source": "SIPRI"},
    {"country": "Taiwan", "country_code": "TW", "year": 2024, "expenditure": 19.1, "gdp_percent": 2.5, "region": "Asia-Pacific", "source": "SIPRI"},
    {"country": "Spain", "country_code": "ES", "year": 2024, "expenditure": 20.3, "gdp_percent": 1.3, "region": "Europe", "source": "SIPRI"},
    {"country": "Netherlands", "country_code": "NL", "year": 2024, "expenditure": 15.4, "gdp_percent": 1.5, "region": "Europe", "source": "SIPRI"},
    {"country": "Singapore", "country_code": "SG", "year": 2024, "expenditure": 11.8, "gdp_percent": 3.0, "region": "Asia-Pacific", "source": "SIPRI"},
    {"country": "Pakistan", "country_code": "PK", "year": 2024, "expenditure": 10.3, "gdp_percent": 3.7, "region": "Asia-Pacific", "source": "IISS"},
    {"country": "Denmark", "country_code": "DK", "year": 2024, "expenditure": 8.9, "gdp_percent": 2.4, "region": "Europe", "source": "SIPRI"},
    {"country": "Norway", "country_code": "NO", "year": 2024, "expenditure": 8.9, "gdp_percent": 1.8, "region": "Europe", "source": "SIPRI"},
    {"country": "Indonesia", "country_code": "ID", "year": 2024, "expenditure": 9.2, "gdp_percent": 0.7, "region": "Asia-Pacific", "source": "SIPRI"},
    {"country": "Algeria", "country_code": "DZ", "year": 2024, "expenditure": 9.1, "gdp_percent": 6.0, "region": "Africa", "source": "SIPRI"},
    {"country": "Sweden", "country_code": "SE", "year": 2024, "expenditure": 9.7, "gdp_percent": 1.5, "region": "Europe", "source": "SIPRI"},
    {"country": "Mexico", "country_code": "MX", "year": 2024, "expenditure": 9.4, "gdp_percent": 0.6, "region": "North America", "source": "SIPRI"},
    {"country": "Greece", "country_code": "GR", "year": 2024, "expenditure": 8.1, "gdp_percent": 3.0, "region": "Europe", "source": "SIPRI"},
    {"country": "Vietnam", "country_code": "VN", "year": 2024, "expenditure": 7.6, "gdp_percent": 2.3, "region": "Asia-Pacific", "source": "SIPRI"},
    {"country": "Thailand", "country_code": "TH", "year": 2024, "expenditure": 7.7, "gdp_percent": 1.4, "region": "Asia-Pacific", "source": "SIPRI"},
    {"country": "Finland", "country_code": "FI", "year": 2024, "expenditure": 6.8, "gdp_percent": 2.4, "region": "Europe", "source": "SIPRI"},
    {"country": "Romania", "country_code": "RO", "year": 2024, "expenditure": 6.0, "gdp_percent": 2.3, "region": "Europe", "source": "NATO"},
    {"country": "Chile", "country_code": "CL", "year": 2024, "expenditure": 5.5, "gdp_percent": 1.8, "region": "South America", "source": "SIPRI"},
    {"country": "Morocco", "country_code": "MA", "year": 2024, "expenditure": 5.4, "gdp_percent": 4.4, "region": "Africa", "source": "SIPRI"},
    {"country": "Portugal", "country_code": "PT", "year": 2024, "expenditure": 4.5, "gdp_percent": 1.6, "region": "Europe", "source": "NATO"},
    {"country": "Bangladesh", "country_code": "BD", "year": 2024, "expenditure": 4.4, "gdp_percent": 1.2, "region": "Asia-Pacific", "source": "SIPRI"},
    {"country": "Colombia", "country_code": "CO", "year": 2024, "expenditure": 4.3, "gdp_percent": 1.0, "region": "South America", "source": "SIPRI"},
    {"country": "Philippines", "country_code": "PH", "year": 2024, "expenditure": 4.2, "gdp_percent": 0.9, "region": "Asia-Pacific", "source": "SIPRI"},
    {"country": "Iraq", "country_code": "IQ", "year": 2024, "expenditure": 4.2, "gdp_percent": 1.7, "region": "Middle East", "source": "IISS"},
    {"country": "Egypt", "country_code": "EG", "year": 2024, "expenditure": 4.6, "gdp_percent": 1.2, "region": "Middle East", "source": "SIPRI"},
    {"country": "Czech Republic", "country_code": "CZ", "year": 2024, "expenditure": 5.3, "gdp_percent": 2.0, "region": "Europe", "source": "NATO"},
    {"country": "Austria", "country_code": "AT", "year": 2024, "expenditure": 3.8, "gdp_percent": 0.7, "region": "Europe", "source": "SIPRI"},
    {"country": "Argentina", "country_code": "AR", "year": 2024, "expenditure": 3.4, "gdp_percent": 0.6, "region": "South America", "source": "SIPRI"},
    {"country": "New Zealand", "country_code": "NZ", "year": 2024, "expenditure": 3.4, "gdp_percent": 1.5, "region": "Asia-Pacific", "source": "SIPRI"},
    {"country": "Azerbaijan", "country_code": "AZ", "year": 2024, "expenditure": 3.0, "gdp_percent": 5.2, "region": "Europe", "source": "SIPRI"},
    {"country": "South Africa", "country_code": "ZA", "year": 2024, "expenditure": 3.2, "gdp_percent": 0.7, "region": "Africa", "source": "SIPRI"},
    {"country": "Nigeria", "country_code": "NG", "year": 2024, "expenditure": 3.1, "gdp_percent": 0.7, "region": "Africa", "source": "IISS"},
    {"country": "Peru", "country_code": "PE", "year": 2024, "expenditure": 3.2, "gdp_percent": 1.2, "region": "South America", "source": "SIPRI"},
    {"country": "Hungary", "country_code": "HU", "year": 2024, "expenditure": 4.6, "gdp_percent": 2.4, "region": "Europe", "source": "NATO"},
    {"country": "Jordan", "country_code": "JO", "year": 2024, "expenditure": 2.6, "gdp_percent": 4.8, "region": "Middle East", "source": "SIPRI"},
    {"country": "Myanmar", "country_code": "MM", "year": 2024, "expenditure": 2.2, "gdp_percent": 3.0, "region": "Asia-Pacific", "source": "IISS"},
    {"country": "Kuwait", "country_code": "KW", "year": 2024, "expenditure": 7.8, "gdp_percent": 5.5, "region": "Middle East", "source": "SIPRI"},
    {"country": "Qatar", "country_code": "QA", "year": 2024, "expenditure": 10.7, "gdp_percent": 5.3, "region": "Middle East", "source": "SIPRI"},
    {"country": "Belgium", "country_code": "BE", "year": 2024, "expenditure": 8.2, "gdp_percent": 1.3, "region": "Europe", "source": "NATO"},
    {"country": "Switzerland", "country_code": "CH", "year": 2024, "expenditure": 6.2, "gdp_percent": 0.7, "region": "Europe", "source": "SIPRI"},
    {"country": "Iran", "country_code": "IR", "year": 2024, "expenditure": 10.0, "gdp_percent": 2.3, "region": "Middle East", "source": "IISS"},
    {"country": "Malaysia", "country_code": "MY", "year": 2024, "expenditure": 4.8, "gdp_percent": 1.1, "region": "Asia-Pacific", "source": "SIPRI"},
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
    {"name": "F-35 Lightning II", "manufacturer": "Lockheed Martin", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 1.6", "range": "2,220 km", "ceiling": "50,000 ft", "payload": "18,000 lbs"}, "materials": ["Carbon Fiber Composites", "Titanium", "Aluminum Alloys", "Stealth Coating"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/16/F-35A_CTOL_variant.jpg"},
    {"name": "F-22 Raptor", "manufacturer": "Lockheed Martin", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 2.25", "range": "2,960 km", "ceiling": "65,000 ft", "payload": "20,000 lbs"}, "materials": ["Carbon Fiber", "Titanium", "Thermoplastics", "Radar-Absorbing Materials"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/1e/F-22_Raptor_edit1_(cropped).jpg"},
    {"name": "Rafale F4", "manufacturer": "Dassault Aviation", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 1.8", "range": "3,700 km", "ceiling": "50,000 ft", "payload": "21,000 lbs"}, "materials": ["Carbon Composites", "Titanium", "RBE2 AESA Radar"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/2/22/Dassault_Rafale_C_(cropped).jpg"},
    {"name": "Eurofighter Typhoon", "manufacturer": "Airbus Defence & Space", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 2.0", "range": "2,900 km", "ceiling": "55,000 ft", "payload": "16,500 lbs"}, "materials": ["Carbon Fiber", "Glass Fiber", "Aluminum-Lithium"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/87/Eurofighter_Typhoon_(Ala_11)_MG_3894_(15939726449).jpg"},
    {"name": "Gripen E", "manufacturer": "Saab AB", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 2.0", "range": "2,500 km", "ceiling": "52,000 ft", "payload": "17,500 lbs"}, "materials": ["Carbon Fiber Composites", "Aluminum Alloys"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/a/a4/Saab_JAS_39E_Gripen.jpg"},
    {"name": "KF-21 Boramae", "manufacturer": "Korea Aerospace Industries", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 1.8", "range": "2,900 km", "ceiling": "55,000 ft", "payload": "17,000 lbs"}, "materials": ["Composite Materials", "Titanium", "Advanced Alloys"], "status": "development", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/KAI_KF-21_Boramae_first_flight.jpg?width=400"},
    {"name": "Patriot PAC-3", "manufacturer": "Raytheon Technologies", "category": "missile", "product_type": "sam", "specifications": {"range": "70 km", "altitude": "24 km", "speed": "Mach 4.1", "warhead": "Kinetic kill"}, "materials": ["Steel Alloy", "Solid Propellant", "Advanced Electronics"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/MIM-104_Patriot.jpg?width=400"},
    {"name": "S-400 Triumf", "manufacturer": "Almaz-Antey", "category": "missile", "product_type": "sam", "specifications": {"range": "400 km", "altitude": "30 km", "speed": "Mach 14", "warhead": "Fragmentation"}, "materials": ["Steel", "Solid Fuel", "Phased Array Radar"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/S-400_missile_system_2019.jpg?width=400"},
    {"name": "Iron Dome", "manufacturer": "Rafael Advanced Defense", "category": "missile", "product_type": "sam", "specifications": {"range": "70 km", "altitude": "10 km", "intercept_rate": "90%+", "warhead": "Proximity fuse"}, "materials": ["Composite Materials", "Advanced Sensors"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/f/ff/Iron_Dome_battery_near_Ashkelon.jpg"},
    {"name": "THAAD", "manufacturer": "Lockheed Martin", "category": "missile", "product_type": "sam", "specifications": {"range": "200 km", "altitude": "150 km", "speed": "Mach 8+", "warhead": "Kinetic kill"}, "materials": ["Advanced Composites", "Solid Propellant"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/83/THAAD_Battery.jpg"},
    {"name": "Virginia-class Submarine", "manufacturer": "General Dynamics", "category": "naval", "product_type": "submarine", "specifications": {"displacement": "7,900 tons", "length": "115 m", "speed": "25+ knots", "depth": "250+ m"}, "materials": ["HY-100 Steel", "Anechoic Tiles", "Composite Materials"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/7/75/USS_Virginia_(SSN_774)_underway.jpg"},
    {"name": "Astute-class Submarine", "manufacturer": "BAE Systems", "category": "naval", "product_type": "submarine", "specifications": {"displacement": "7,400 tons", "length": "97 m", "speed": "29 knots", "depth": "300+ m"}, "materials": ["High-Tensile Steel", "Acoustic Tiles"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/6d/HMS_Astute_at_HMNB_Clyde.jpg"},
    {"name": "Suffren-class Submarine", "manufacturer": "Naval Group", "category": "naval", "product_type": "submarine", "specifications": {"displacement": "5,300 tons", "length": "99 m", "speed": "25 knots", "depth": "350+ m"}, "materials": ["HLES 100 Steel", "Composite Materials"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Suffren_at_Cape_Brun_off_Toulon_on_26_July_2020.jpg"},
    {"name": "M1A2 Abrams SEPv3", "manufacturer": "General Dynamics", "category": "land", "product_type": "tank", "specifications": {"weight": "73.6 tons", "speed": "67 km/h", "range": "426 km", "main_gun": "120mm"}, "materials": ["Chobham Armor", "Depleted Uranium", "Steel Alloy"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/c/cc/M1A2_Abrams.jpg"},
    {"name": "Leopard 2A7+", "manufacturer": "KNDS", "category": "land", "product_type": "tank", "specifications": {"weight": "67.5 tons", "speed": "72 km/h", "range": "450 km", "main_gun": "120mm L/55"}, "materials": ["Third-Gen Composite Armor", "Tungsten", "Steel"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/82/Leopard_2A5_der_Bundeswehr.jpg"},
    {"name": "K2 Black Panther", "manufacturer": "Hyundai Rotem", "category": "land", "product_type": "tank", "specifications": {"weight": "55 tons", "speed": "70 km/h", "range": "450 km", "main_gun": "120mm L/55"}, "materials": ["Composite Armor", "Reactive Armor", "Advanced Alloys"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/16/K2_Black_Panther.jpg"},
    {"name": "Leclerc", "manufacturer": "KNDS", "category": "land", "product_type": "tank", "specifications": {"weight": "57 tons", "speed": "71 km/h", "range": "550 km", "main_gun": "120mm"}, "materials": ["Titanium-Steel Armor", "Composite Materials"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/f/fe/Leclerc_tank_HD.jpg"},
    {"name": "MQ-9 Reaper", "manufacturer": "General Atomics", "category": "aircraft", "product_type": "uav", "specifications": {"max_speed": "482 km/h", "range": "1,850 km", "endurance": "27 hours", "payload": "3,750 lbs"}, "materials": ["Carbon Fiber", "Aluminum", "Composite Materials"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/3/37/MQ-9_Reaper_in_flight_(disheveled).jpg"},
    {"name": "Bayraktar TB2", "manufacturer": "Baykar", "category": "aircraft", "product_type": "uav", "specifications": {"max_speed": "220 km/h", "range": "150 km", "endurance": "27 hours", "payload": "150 kg"}, "materials": ["Carbon Fiber", "Kevlar", "Aluminum"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/f/fc/Bayraktar_TB2_UAS.jpg"},
    {"name": "K9 Thunder", "manufacturer": "Hanwha Defense", "category": "land", "product_type": "artillery", "specifications": {"caliber": "155mm", "range": "40 km", "rate_of_fire": "6-8 rpm", "crew": "5"}, "materials": ["Steel Armor", "Composite Materials"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/9/9b/K9_Thunder.jpg"},
    {"name": "CAESAR", "manufacturer": "KNDS", "category": "land", "product_type": "artillery", "specifications": {"caliber": "155mm", "range": "42 km", "rate_of_fire": "6 rpm", "crew": "5"}, "materials": ["High-Strength Steel", "Aluminum"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/2/29/CAESAR_155mm_wheeled_self-propelled_howitzer.jpg"},
    {"name": "PzH 2000", "manufacturer": "KNDS", "category": "land", "product_type": "artillery", "specifications": {"caliber": "155mm", "range": "56 km", "rate_of_fire": "9 rpm", "crew": "5"}, "materials": ["Armored Steel", "Composite Materials"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/3/30/PzH_2000_(cropped).jpg"},
    {"name": "Type 26 Frigate", "manufacturer": "BAE Systems", "category": "naval", "product_type": "frigate", "specifications": {"displacement": "6,900 tons", "length": "149 m", "speed": "26+ knots", "crew": "157"}, "materials": ["Steel Hull", "Advanced Composites"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/d/d8/HMS_Glasgow_(50733966826).jpg"},
    {"name": "FREMM Frigate", "manufacturer": "Fincantieri", "category": "naval", "product_type": "frigate", "specifications": {"displacement": "6,700 tons", "length": "144 m", "speed": "27 knots", "crew": "145"}, "materials": ["Steel", "Aluminum Superstructure"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/61/FREMM_DA_Martinengo.jpg"},
    # === Additional Aircraft ===
    {"name": "F-15EX Eagle II", "manufacturer": "Boeing Defense", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 2.5", "range": "3,900 km", "ceiling": "65,000 ft", "payload": "29,500 lbs"}, "materials": ["Aluminum Alloy", "Titanium", "Carbon Composites"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8c/F-15EX_Eagle_II_in_flight.jpg"},
    {"name": "F/A-18E/F Super Hornet", "manufacturer": "Boeing Defense", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 1.8", "range": "2,346 km", "ceiling": "50,000 ft", "payload": "17,750 lbs"}, "materials": ["Aluminum", "Carbon Fiber", "Titanium"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/f/fb/F-A-18E_Super_Hornet_breaking_the_sound_barrier_(July_7%2C_1999).jpg"},
    {"name": "Su-57 Felon", "manufacturer": "United Aircraft Corporation", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 2.0", "range": "3,500 km", "ceiling": "65,000 ft", "payload": "22,000 lbs"}, "materials": ["Composite Materials", "Titanium", "RAM Coating"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/7/70/Su-57_Felon.jpg"},
    {"name": "J-20 Mighty Dragon", "manufacturer": "AVIC", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 2.0+", "range": "2,000 km", "ceiling": "65,000 ft", "payload": "Unknown"}, "materials": ["Stealth Composites", "Titanium Alloys"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/9/93/J-20_aircraft.jpg"},
    {"name": "HAL Tejas Mk2", "manufacturer": "Hindustan Aeronautics", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 1.8", "range": "3,000 km", "ceiling": "50,000 ft", "payload": "8,000 lbs"}, "materials": ["Carbon Composites", "Aluminum-Lithium"], "status": "development", "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/64/HAL_Tejas_LCA.jpg"},
    {"name": "B-21 Raider", "manufacturer": "Northrop Grumman", "category": "aircraft", "product_type": "bomber", "specifications": {"max_speed": "Subsonic", "range": "9,000+ km", "ceiling": "50,000+ ft", "payload": "Classified"}, "materials": ["Advanced Stealth Composites", "RAM"], "status": "development", "image_url": "https://upload.wikimedia.org/wikipedia/commons/9/91/B-21_Raider_first_flight.jpg"},
    {"name": "B-2 Spirit", "manufacturer": "Northrop Grumman", "category": "aircraft", "product_type": "bomber", "specifications": {"max_speed": "Mach 0.95", "range": "11,000 km", "ceiling": "50,000 ft", "payload": "40,000 lbs"}, "materials": ["Carbon Fiber Composites", "Stealth Materials"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/7/74/Northrop_B-2_Spirit.jpg"},
    {"name": "A-10 Thunderbolt II", "manufacturer": "Fairchild Republic", "category": "aircraft", "product_type": "attack", "specifications": {"max_speed": "706 km/h", "range": "4,150 km", "ceiling": "45,000 ft", "armament": "GAU-8 30mm"}, "materials": ["Titanium", "Aluminum Alloy"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/7/7e/A-10_Thunderbolt_II.jpg"},
    {"name": "AH-64E Apache Guardian", "manufacturer": "Boeing Defense", "category": "aircraft", "product_type": "helicopter", "specifications": {"max_speed": "293 km/h", "range": "476 km", "ceiling": "21,000 ft", "armament": "M230 30mm + Hellfire"}, "materials": ["Composite Materials", "Aluminum"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/66/AH-64D_Apache_Longbow.jpg"},
    {"name": "UH-60M Black Hawk", "manufacturer": "Sikorsky", "category": "aircraft", "product_type": "helicopter", "specifications": {"max_speed": "296 km/h", "range": "592 km", "ceiling": "19,000 ft", "capacity": "11 troops"}, "materials": ["Composite Rotors", "Aluminum Frame"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/89/Sikorsky_UH-60_Black_Hawk.jpg"},
    {"name": "NH90", "manufacturer": "Airbus Defence & Space", "category": "aircraft", "product_type": "helicopter", "specifications": {"max_speed": "300 km/h", "range": "1,150 km", "ceiling": "20,000 ft", "capacity": "20 troops"}, "materials": ["All-Composite Fuselage", "Titanium Components"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/e/e9/NH90_helicopter.jpg"},
    {"name": "Tigre HAD", "manufacturer": "Airbus Defence & Space", "category": "aircraft", "product_type": "helicopter", "specifications": {"max_speed": "278 km/h", "range": "800 km", "ceiling": "13,000 ft", "armament": "30mm + Hellfire"}, "materials": ["Composite Materials", "Kevlar Armor"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/6d/HAD-Tigre.jpg"},
    {"name": "CH-47F Chinook", "manufacturer": "Boeing Defense", "category": "aircraft", "product_type": "helicopter", "specifications": {"max_speed": "315 km/h", "range": "741 km", "ceiling": "20,000 ft", "payload": "10,886 kg"}, "materials": ["Aluminum", "Glass Fiber", "Carbon Fiber"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/7/73/CH-47F_Chinook.jpg"},
    {"name": "V-22 Osprey", "manufacturer": "Bell-Boeing", "category": "aircraft", "product_type": "tiltrotor", "specifications": {"max_speed": "565 km/h", "range": "1,627 km", "ceiling": "25,000 ft", "capacity": "24 troops"}, "materials": ["Graphite-Epoxy Composites", "Aluminum"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/e/ef/MV-22B_Osprey.jpg"},
    {"name": "C-17 Globemaster III", "manufacturer": "Boeing Defense", "category": "aircraft", "product_type": "transport", "specifications": {"max_speed": "830 km/h", "range": "10,390 km", "ceiling": "45,000 ft", "payload": "77,519 kg"}, "materials": ["Aluminum Alloy", "Carbon Fiber"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/c/cf/C-17_Globemaster_III_inflight.jpg"},
    {"name": "A400M Atlas", "manufacturer": "Airbus Defence & Space", "category": "aircraft", "product_type": "transport", "specifications": {"max_speed": "780 km/h", "range": "8,700 km", "ceiling": "40,000 ft", "payload": "37,000 kg"}, "materials": ["Carbon Fiber", "Aluminum", "Advanced Alloys"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/f/f6/A400M_-_Paris_Air_Show_2013.jpg"},
    {"name": "KC-46 Pegasus", "manufacturer": "Boeing Defense", "category": "aircraft", "product_type": "tanker", "specifications": {"max_speed": "900 km/h", "range": "12,200 km", "ceiling": "40,100 ft", "fuel_capacity": "96,250 kg"}, "materials": ["Aluminum", "Carbon Composites"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/4/4f/KC-46A_Pegasus.jpg"},
    # === Additional UAVs/Drones ===
    {"name": "MQ-4C Triton", "manufacturer": "Northrop Grumman", "category": "aircraft", "product_type": "uav", "specifications": {"max_speed": "575 km/h", "range": "8,200 nm", "endurance": "24+ hours", "ceiling": "56,500 ft"}, "materials": ["Composite Materials", "Carbon Fiber"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/c/c6/MQ-4C_Triton.jpg"},
    {"name": "RQ-4 Global Hawk", "manufacturer": "Northrop Grumman", "category": "aircraft", "product_type": "uav", "specifications": {"max_speed": "629 km/h", "range": "22,779 km", "endurance": "32 hours", "ceiling": "60,000 ft"}, "materials": ["Carbon Fiber", "Aluminum Alloys"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/60/RQ-4A_Global_Hawk_unmanned_aerial_vehicle.jpg"},
    {"name": "XQ-58 Valkyrie", "manufacturer": "Kratos Defense", "category": "aircraft", "product_type": "uav", "specifications": {"max_speed": "1,050 km/h", "range": "3,941 km", "ceiling": "45,000 ft", "payload": "272 kg"}, "materials": ["Composite Materials", "3D Printed Parts"], "status": "development", "image_url": "https://upload.wikimedia.org/wikipedia/commons/a/a4/XQ-58A_Valkyrie_demonstrator.jpg"},
    {"name": "Bayraktar TB3", "manufacturer": "Baykar", "category": "aircraft", "product_type": "uav", "specifications": {"max_speed": "250 km/h", "range": "1,800 km", "endurance": "24 hours", "payload": "280 kg"}, "materials": ["Carbon Fiber", "Kevlar", "Composite Materials"], "status": "development", "image_url": "https://upload.wikimedia.org/wikipedia/commons/5/52/Bayraktar_TB3_rollout.jpg"},
    {"name": "Bayraktar Kizilelma", "manufacturer": "Baykar", "category": "aircraft", "product_type": "uav", "specifications": {"max_speed": "Mach 0.9", "range": "930 km", "endurance": "5 hours", "payload": "1,500 kg"}, "materials": ["Stealth Composites", "Titanium"], "status": "development", "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/16/Bayraktar_Kizilelma_rollout.jpg"},
    {"name": "Shahed-136", "manufacturer": "HESA", "category": "aircraft", "product_type": "uav", "specifications": {"max_speed": "185 km/h", "range": "2,500 km", "endurance": "N/A", "warhead": "30-50 kg"}, "materials": ["Composite Materials"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Shahed-136.jpg"},
    {"name": "Switchblade 600", "manufacturer": "AeroVironment", "category": "missile", "product_type": "loitering_munition", "specifications": {"max_speed": "185 km/h", "range": "80 km", "endurance": "40 min", "warhead": "Anti-armor"}, "materials": ["Composite Materials", "Aluminum"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8a/AeroVironment_Switchblade.jpg"},
    {"name": "HAROP", "manufacturer": "Israel Aerospace Industries", "category": "missile", "product_type": "loitering_munition", "specifications": {"max_speed": "417 km/h", "range": "1,000 km", "endurance": "6 hours", "warhead": "23 kg"}, "materials": ["Composite Materials", "Advanced Electronics"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/3/3a/IAI_Harop.jpg"},
    # === Additional Missiles ===
    {"name": "Tomahawk Block V", "manufacturer": "Raytheon Technologies", "category": "missile", "product_type": "cruise_missile", "specifications": {"range": "2,500 km", "speed": "880 km/h", "guidance": "GPS/INS/DSMAC", "warhead": "450 kg"}, "materials": ["Aluminum", "Composite Materials", "Turbofan Engine"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/5/55/Tomahawk_Block_IV_cruise_missile.jpg"},
    {"name": "SCALP/Storm Shadow", "manufacturer": "MBDA", "category": "missile", "product_type": "cruise_missile", "specifications": {"range": "560 km", "speed": "Mach 0.8", "guidance": "GPS/INS/TERCOM", "warhead": "BROACH"}, "materials": ["Stealth Composites", "Advanced Propellants"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/e/e7/SCALP_EG.jpg"},
    {"name": "AGM-158 JASSM-ER", "manufacturer": "Lockheed Martin", "category": "missile", "product_type": "cruise_missile", "specifications": {"range": "925+ km", "speed": "Subsonic", "guidance": "GPS/INS/IR", "warhead": "WDU-42/B"}, "materials": ["Stealth Materials", "Turbofan Engine"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/9/93/JASSM_ER_missile.jpg"},
    {"name": "Meteor BVRAAM", "manufacturer": "MBDA", "category": "missile", "product_type": "air_to_air", "specifications": {"range": "150+ km", "speed": "Mach 4+", "guidance": "Active Radar", "no_escape_zone": "60 km"}, "materials": ["Ramjet Propulsion", "Advanced Composites"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Meteor_missile.jpg"},
    {"name": "AIM-120D AMRAAM", "manufacturer": "Raytheon Technologies", "category": "missile", "product_type": "air_to_air", "specifications": {"range": "180+ km", "speed": "Mach 4", "guidance": "Active Radar/GPS", "warhead": "22 kg"}, "materials": ["Aluminum", "Solid Propellant"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/a/a2/AIM-120C_AMRAAM.jpg"},
    {"name": "MICA NG", "manufacturer": "MBDA", "category": "missile", "product_type": "air_to_air", "specifications": {"range": "80 km", "speed": "Mach 4", "guidance": "IR/RF", "warhead": "12 kg"}, "materials": ["Composite Materials", "Advanced Seekers"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/6e/MICA_missile.jpg"},
    {"name": "Javelin FGM-148", "manufacturer": "Raytheon/Lockheed Martin", "category": "missile", "product_type": "anti_tank", "specifications": {"range": "4.75 km", "speed": "Mach 0.5", "guidance": "IR imaging", "warhead": "Tandem HEAT"}, "materials": ["Composite Launch Tube", "Solid Propellant"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/0/0a/Javelin_FGM-148_antitank_guided_missile.jpg"},
    {"name": "Spike NLOS", "manufacturer": "Rafael Advanced Defense", "category": "missile", "product_type": "anti_tank", "specifications": {"range": "32 km", "speed": "180 m/s", "guidance": "Fiber-optic/EO", "warhead": "Tandem HEAT"}, "materials": ["Composite Materials", "EO/IR Seeker"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/1b/Spike_NLOS_missile.jpg"},
    {"name": "NSM Naval Strike Missile", "manufacturer": "Kongsberg Defence", "category": "missile", "product_type": "anti_ship", "specifications": {"range": "185 km", "speed": "Subsonic", "guidance": "GPS/INS/IR", "warhead": "125 kg"}, "materials": ["Stealth Composites", "Turbofan"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/b/b9/Kongsberg_NSM_missile.jpg"},
    {"name": "Harpoon Block II", "manufacturer": "Boeing Defense", "category": "missile", "product_type": "anti_ship", "specifications": {"range": "280 km", "speed": "Mach 0.85", "guidance": "GPS/INS/Radar", "warhead": "221 kg"}, "materials": ["Aluminum", "Turbofan Engine"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Harpoon_Block_II_missile.jpg"},
    {"name": "ASTER 30 SAMP/T", "manufacturer": "MBDA", "category": "missile", "product_type": "sam", "specifications": {"range": "120 km", "altitude": "20 km", "speed": "Mach 4.5", "guidance": "Active Radar"}, "materials": ["Composite Materials", "Solid Propellant"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/2/28/SAMP-T_ASTER_30.jpg"},
    {"name": "NASAMS", "manufacturer": "Kongsberg/Raytheon", "category": "missile", "product_type": "sam", "specifications": {"range": "30 km", "altitude": "15 km", "speed": "Mach 3", "missiles": "AMRAAM/AIM-9X"}, "materials": ["Aluminum", "Mobile Launchers"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/88/NASAMS_launcher.jpg"},
    {"name": "David's Sling", "manufacturer": "Rafael/Raytheon", "category": "missile", "product_type": "sam", "specifications": {"range": "300 km", "altitude": "15 km", "speed": "Mach 7.5", "guidance": "Multi-mode"}, "materials": ["Advanced Composites", "Dual-Pulse Motor"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/d/d5/David%27s_Sling_missile_defense.jpg"},
    {"name": "CAMM-ER", "manufacturer": "MBDA", "category": "missile", "product_type": "sam", "specifications": {"range": "45+ km", "altitude": "10 km", "speed": "Mach 3+", "guidance": "Active Radar"}, "materials": ["Composite Materials", "Solid Propellant"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/c/c8/CAMM_missile.jpg"},
    {"name": "AGM-183A ARRW", "manufacturer": "Lockheed Martin", "category": "missile", "product_type": "hypersonic", "specifications": {"range": "1,600+ km", "speed": "Mach 20", "guidance": "INS", "warhead": "Conventional"}, "materials": ["Thermal Protection", "Advanced Alloys"], "status": "development", "image_url": "https://upload.wikimedia.org/wikipedia/commons/d/db/AGM-183A_ARRW.jpg"},
    {"name": "Kinzhal", "manufacturer": "Tactical Missiles Corporation", "category": "missile", "product_type": "hypersonic", "specifications": {"range": "2,000 km", "speed": "Mach 10+", "guidance": "INS/Radar", "warhead": "500 kg"}, "materials": ["Heat-Resistant Alloys"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/b/b9/Kh-47M2_Kinzhal.jpg"},
    # === Additional Naval Systems ===
    {"name": "Arleigh Burke Flight III", "manufacturer": "Huntington Ingalls", "category": "naval", "product_type": "destroyer", "specifications": {"displacement": "9,700 tons", "length": "155 m", "speed": "30+ knots", "crew": "380"}, "materials": ["Steel Hull", "Aluminum Superstructure"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/7/76/USS_Arleigh_Burke_(DDG-51).jpg"},
    {"name": "Type 45 Daring-class", "manufacturer": "BAE Systems", "category": "naval", "product_type": "destroyer", "specifications": {"displacement": "8,500 tons", "length": "152 m", "speed": "29 knots", "crew": "190"}, "materials": ["Steel", "Composite Mast"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/c/c9/HMS_Daring_D32.jpg"},
    {"name": "Horizon-class Frigate", "manufacturer": "Naval Group", "category": "naval", "product_type": "frigate", "specifications": {"displacement": "7,050 tons", "length": "153 m", "speed": "29 knots", "crew": "195"}, "materials": ["Steel", "Composite Materials"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/a/ad/FS_Forbin_D620.jpg"},
    {"name": "MEKO A-200", "manufacturer": "ThyssenKrupp Marine", "category": "naval", "product_type": "frigate", "specifications": {"displacement": "3,700 tons", "length": "121 m", "speed": "28 knots", "crew": "120"}, "materials": ["Steel Hull", "Modular Design"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/0/0f/SAS_Mendi_F148.jpg"},
    {"name": "Independence-class LCS", "manufacturer": "Austal", "category": "naval", "product_type": "littoral_combat_ship", "specifications": {"displacement": "3,104 tons", "length": "127 m", "speed": "47 knots", "crew": "40"}, "materials": ["Aluminum Trimaran", "Steel"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/5/59/USS_Independence_(LCS-2)_underway_in_the_Pacific_Ocean.jpg"},
    {"name": "Mistral-class LHD", "manufacturer": "Naval Group", "category": "naval", "product_type": "amphibious", "specifications": {"displacement": "21,300 tons", "length": "199 m", "speed": "19 knots", "aircraft": "16 helicopters"}, "materials": ["Steel", "Aluminum Superstructure"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/d/d7/Mistral_(L9013).jpg"},
    {"name": "Gerald R. Ford-class", "manufacturer": "Huntington Ingalls", "category": "naval", "product_type": "aircraft_carrier", "specifications": {"displacement": "100,000 tons", "length": "337 m", "speed": "30+ knots", "aircraft": "75+"}, "materials": ["Steel", "EMALS Catapults"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/b/b5/USS_Gerald_R._Ford_(CVN-78).jpg"},
    {"name": "Queen Elizabeth-class", "manufacturer": "BAE Systems", "category": "naval", "product_type": "aircraft_carrier", "specifications": {"displacement": "65,000 tons", "length": "284 m", "speed": "25 knots", "aircraft": "40"}, "materials": ["Steel", "Ski-Jump Ramp"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/7/78/HMS_Queen_Elizabeth_(R08).jpg"},
    {"name": "Charles de Gaulle", "manufacturer": "Naval Group", "category": "naval", "product_type": "aircraft_carrier", "specifications": {"displacement": "42,500 tons", "length": "261 m", "speed": "27 knots", "aircraft": "40"}, "materials": ["Steel", "Nuclear Propulsion"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/7/7e/Charles_de_Gaulle_aircraft_carrier.jpg"},
    {"name": "Columbia-class Submarine", "manufacturer": "General Dynamics", "category": "naval", "product_type": "submarine", "specifications": {"displacement": "20,810 tons", "length": "171 m", "speed": "20+ knots", "missiles": "16 Trident II"}, "materials": ["HY-100 Steel", "Advanced Quieting"], "status": "development", "image_url": "https://upload.wikimedia.org/wikipedia/commons/e/e2/USS_Columbia_(SSBN-826)_keel.jpg"},
    {"name": "Dreadnought-class Submarine", "manufacturer": "BAE Systems", "category": "naval", "product_type": "submarine", "specifications": {"displacement": "17,200 tons", "length": "153 m", "speed": "25+ knots", "missiles": "12 Trident II"}, "materials": ["High-Tensile Steel", "PWR3 Reactor"], "status": "development", "image_url": "https://upload.wikimedia.org/wikipedia/commons/c/c5/HMS_Dreadnought_S101.jpg"},
    {"name": "Le Triomphant-class", "manufacturer": "Naval Group", "category": "naval", "product_type": "submarine", "specifications": {"displacement": "14,335 tons", "length": "138 m", "speed": "25 knots", "missiles": "16 M51"}, "materials": ["HY-80 Steel", "Nuclear Propulsion"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/2/24/Le_Triomphant_submarine.jpg"},
    # === Additional Land Systems ===
    {"name": "Challenger 3", "manufacturer": "Rheinmetall BAE Systems", "category": "land", "product_type": "tank", "specifications": {"weight": "66 tons", "speed": "60 km/h", "range": "550 km", "main_gun": "120mm L/55"}, "materials": ["Chobham Armor", "Composite Materials"], "status": "development", "image_url": "https://upload.wikimedia.org/wikipedia/commons/e/e7/Challenger_2_tank.jpg"},
    {"name": "T-14 Armata", "manufacturer": "Uralvagonzavod", "category": "land", "product_type": "tank", "specifications": {"weight": "55 tons", "speed": "80 km/h", "range": "500 km", "main_gun": "125mm 2A82-1M"}, "materials": ["Composite Armor", "Active Protection"], "status": "development", "image_url": "https://upload.wikimedia.org/wikipedia/commons/7/70/T-14_Armata_(cropped).jpg"},
    {"name": "Type 10 Hitomaru", "manufacturer": "Mitsubishi Heavy Industries", "category": "land", "product_type": "tank", "specifications": {"weight": "44 tons", "speed": "70 km/h", "range": "300 km", "main_gun": "120mm"}, "materials": ["Modular Armor", "Composite Materials"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Type_10_Hitomaru_tank.jpg"},
    {"name": "Merkava Mk 4M", "manufacturer": "Israel Military Industries", "category": "land", "product_type": "tank", "specifications": {"weight": "65 tons", "speed": "64 km/h", "range": "500 km", "main_gun": "120mm"}, "materials": ["Composite Armor", "Trophy APS"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/9/9a/Merkava_Mk_4M.jpg"},
    {"name": "VBCI", "manufacturer": "KNDS", "category": "land", "product_type": "ifv", "specifications": {"weight": "28 tons", "speed": "100 km/h", "range": "750 km", "armament": "25mm"}, "materials": ["Steel Armor", "Modular Design"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/1a/VBCI_IFV_France.jpg"},
    {"name": "CV90 Mk IV", "manufacturer": "BAE Systems", "category": "land", "product_type": "ifv", "specifications": {"weight": "35 tons", "speed": "70 km/h", "range": "600 km", "armament": "35mm"}, "materials": ["Steel/Titanium Hybrid", "Rubber Tracks"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/c/ce/CV9030_IFV.jpg"},
    {"name": "Puma IFV", "manufacturer": "Rheinmetall", "category": "land", "product_type": "ifv", "specifications": {"weight": "43 tons", "speed": "70 km/h", "range": "450 km", "armament": "30mm"}, "materials": ["Composite Armor", "AMAP"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/e/e5/Puma_IFV.jpg"},
    {"name": "VBMR Griffon", "manufacturer": "KNDS/Arquus/Thales", "category": "land", "product_type": "apc", "specifications": {"weight": "24.5 tons", "speed": "90 km/h", "range": "800 km", "capacity": "8 troops"}, "materials": ["Steel Armor", "SCORPION System"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/b/bb/VBMR_Griffon_SCORPION.jpg"},
    {"name": "Boxer MRAV", "manufacturer": "ARTEC", "category": "land", "product_type": "apc", "specifications": {"weight": "33 tons", "speed": "103 km/h", "range": "1,050 km", "modular": "Yes"}, "materials": ["Modular Armor", "Steel/Composite"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/e/e9/Boxer_MRAV_Germany.jpg"},
    {"name": "Stryker ICVV", "manufacturer": "General Dynamics", "category": "land", "product_type": "apc", "specifications": {"weight": "18.8 tons", "speed": "97 km/h", "range": "500 km", "capacity": "9 troops"}, "materials": ["Ceramic/Steel Armor", "Run-flat Tires"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/88/M1126_Stryker_ICV.jpg"},
    {"name": "M270 MLRS", "manufacturer": "Lockheed Martin", "category": "land", "product_type": "mlrs", "specifications": {"rockets": "12 x 227mm", "range": "300 km", "reload_time": "5 min", "crew": "3"}, "materials": ["Steel", "Aluminum Launcher"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/e/e5/M270_Multiple_Launch_Rocket_System.jpg"},
    {"name": "HIMARS", "manufacturer": "Lockheed Martin", "category": "land", "product_type": "mlrs", "specifications": {"rockets": "6 x 227mm", "range": "300 km", "weight": "16,000 kg", "crew": "3"}, "materials": ["Aluminum", "FMTV Chassis"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/b/be/M142_HIMARS.jpg"},
    {"name": "LRU (Lance-Roquettes Unitaire)", "manufacturer": "KNDS/Lockheed Martin", "category": "land", "product_type": "mlrs", "specifications": {"rockets": "2 x GMLRS", "range": "70 km", "reload_time": "3 min", "crew": "2"}, "materials": ["Steel Frame", "CAESAR Platform"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/d/d9/LRU_lance-roquettes_unitaire.jpg"},
    {"name": "ARCHER 155mm", "manufacturer": "BAE Systems", "category": "land", "product_type": "artillery", "specifications": {"caliber": "155mm", "range": "50 km", "rate_of_fire": "9 rpm", "crew": "3-4"}, "materials": ["Steel", "Volvo Chassis"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/c/cc/Archer_artillery_system.jpg"},
    # === Space & Cyber Systems ===
    {"name": "GPS III Satellite", "manufacturer": "Lockheed Martin", "category": "space", "product_type": "navigation_satellite", "specifications": {"orbit": "MEO 20,200 km", "accuracy": "1m", "lifespan": "15 years", "signals": "L1C/L2C/L5"}, "materials": ["Aluminum", "Solar Arrays", "Advanced Electronics"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/3/3e/GPS-IIF-1_satellite.jpg"},
    {"name": "SBIRS GEO", "manufacturer": "Lockheed Martin", "category": "space", "product_type": "early_warning_satellite", "specifications": {"orbit": "GEO 35,786 km", "sensor": "IR", "coverage": "Hemisphere", "lifespan": "12 years"}, "materials": ["Composite Structure", "IR Sensors"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/b/bf/SBIRS_GEO-1_satellite.jpg"},
    {"name": "Syracuse IV", "manufacturer": "Thales/Airbus", "category": "space", "product_type": "communications_satellite", "specifications": {"orbit": "GEO", "bandwidth": "X/Ka band", "coverage": "Global", "lifespan": "15 years"}, "materials": ["Carbon Composites", "Spacebus Platform"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/0/0a/Syracuse_4A_satellite.jpg"},
    {"name": "Helios 2", "manufacturer": "Thales Alenia Space", "category": "space", "product_type": "reconnaissance_satellite", "specifications": {"orbit": "SSO 680 km", "resolution": "<35 cm", "coverage": "Global", "lifespan": "5 years"}, "materials": ["Composite Materials", "Optical Payload"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/5/54/Helios_2A_satellite.jpg"},
    {"name": "X-37B Space Plane", "manufacturer": "Boeing Defense", "category": "space", "product_type": "spaceplane", "specifications": {"length": "8.9 m", "wingspan": "4.5 m", "orbit": "LEO", "endurance": "900+ days"}, "materials": ["Thermal Tiles", "Composite Fuselage"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/80/X-37B_OTV-4.jpg"},
    {"name": "SATCOM Terminal AN/TSC-156", "manufacturer": "L3Harris Technologies", "category": "cyber", "product_type": "communications", "specifications": {"bands": "X/Ku/Ka", "mobility": "Transportable", "bandwidth": "155 Mbps", "setup_time": "30 min"}, "materials": ["Ruggedized Electronics", "Portable Antenna"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/6a/AN-TSC-156_SATCOM_terminal.jpg"},
    {"name": "Cyber Operations Platform", "manufacturer": "Palantir Technologies", "category": "cyber", "product_type": "software", "specifications": {"type": "AI/ML Analytics", "deployment": "Cloud/On-Prem", "integration": "Multi-domain", "classification": "TS/SCI"}, "materials": ["Software Platform", "Big Data Analytics"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/66/Palantir_logo.svg"},
    {"name": "AN/ALQ-99 Jammer", "manufacturer": "L3Harris Technologies", "category": "cyber", "product_type": "electronic_warfare", "specifications": {"bands": "Multi-band", "platform": "EA-18G", "power": "High", "coverage": "Wide"}, "materials": ["Advanced Electronics", "Podded System"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/b/b6/EA-18G_Growler.jpg"},
    {"name": "SPECTRA EW Suite", "manufacturer": "Thales", "category": "cyber", "product_type": "electronic_warfare", "specifications": {"functions": "RWR/Jammer/Decoy", "platform": "Rafale", "integration": "Fully Integrated", "bands": "Multi-band"}, "materials": ["Advanced Electronics", "Composite Housings"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/2/22/Dassault_Rafale_C_(cropped).jpg"},
    # === Additional Products (Extended) ===
    {"name": "F-16 Block 70/72", "manufacturer": "Lockheed Martin", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 2.0", "range": "4,220 km", "ceiling": "50,000 ft", "payload": "17,000 lbs"}, "materials": ["Aluminum", "Composite Materials"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/e/e0/General_Dynamics_F-16_Fighting_Falcon.jpg"},
    {"name": "E-7A Wedgetail", "manufacturer": "Boeing Defense", "category": "aircraft", "product_type": "awacs", "specifications": {"max_speed": "955 km/h", "range": "6,500 km", "ceiling": "41,000 ft", "radar": "MESA"}, "materials": ["Boeing 737-700 Airframe", "Advanced Radar"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/86/Boeing_E-7A_Wedgetail.jpg"},
    {"name": "P-8A Poseidon", "manufacturer": "Boeing Defense", "category": "aircraft", "product_type": "patrol", "specifications": {"max_speed": "907 km/h", "range": "8,300 km", "ceiling": "41,000 ft", "armament": "Torpedoes/Missiles"}, "materials": ["Boeing 737-800 Airframe", "Sonobuoys"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/f/f3/P-8A_Poseidon.jpg"},
    {"name": "E-2D Advanced Hawkeye", "manufacturer": "Northrop Grumman", "category": "aircraft", "product_type": "awacs", "specifications": {"max_speed": "648 km/h", "range": "2,708 km", "ceiling": "34,700 ft", "radar": "AN/APY-9"}, "materials": ["Composite Materials", "Twin Turboprop"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/9/9a/E-2D_Advanced_Hawkeye.jpg"},
    {"name": "KC-135 Stratotanker", "manufacturer": "Boeing Defense", "category": "aircraft", "product_type": "tanker", "specifications": {"max_speed": "933 km/h", "range": "2,419 km", "ceiling": "50,000 ft", "fuel_capacity": "90,719 kg"}, "materials": ["Aluminum", "Boeing 707 Airframe"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/7/70/Boeing_KC-135_Stratotanker.jpg"},
    {"name": "MQ-1C Gray Eagle", "manufacturer": "General Atomics", "category": "aircraft", "product_type": "uav", "specifications": {"max_speed": "280 km/h", "range": "400 km", "endurance": "25 hours", "payload": "488 kg"}, "materials": ["Carbon Fiber", "Composite Materials"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/d/d9/MQ-1C_Gray_Eagle.jpg"},
    {"name": "AN/TPS-80 G/ATOR", "manufacturer": "Northrop Grumman", "category": "radar", "product_type": "radar", "specifications": {"range": "300 km", "type": "3D AESA", "mobility": "Transportable", "tracks": "500+"}, "materials": ["Advanced Electronics", "Trailer Mounted"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/e/e2/AN-TPS-80_CTOR_radar.jpg"},
    {"name": "Trophy APS", "manufacturer": "Rafael Advanced Defense", "category": "land", "product_type": "active_protection", "specifications": {"type": "Hard-kill", "reaction_time": "Milliseconds", "coverage": "360°", "intercepts": "RPG/ATGM"}, "materials": ["Radar", "Explosive Countermeasures"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/f/f7/Trophy_active_protection_system.jpg"},
    {"name": "Iron Fist APS", "manufacturer": "Elbit Systems", "category": "land", "product_type": "active_protection", "specifications": {"type": "Hard-kill", "weight": "200 kg", "coverage": "Hemisphere", "intercepts": "RPG/ATGM"}, "materials": ["Sensors", "Countermeasure Grenades"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/87/Iron_Fist_APS_system.jpg"},
    {"name": "Namer APC", "manufacturer": "Israel Military Industries", "category": "land", "product_type": "apc", "specifications": {"weight": "60 tons", "speed": "60 km/h", "range": "500 km", "capacity": "9 troops"}, "materials": ["Merkava Hull", "Trophy APS"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/3/3c/Namer_APC.jpg"},
    {"name": "Bradley M2A4", "manufacturer": "BAE Systems", "category": "land", "product_type": "ifv", "specifications": {"weight": "30 tons", "speed": "66 km/h", "range": "483 km", "armament": "25mm + TOW"}, "materials": ["Aluminum Armor", "Iron Fist APS"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/d/d2/M2_Bradley_fighting_vehicle.jpg"},
    {"name": "Marder IFV", "manufacturer": "Rheinmetall", "category": "land", "product_type": "ifv", "specifications": {"weight": "33 tons", "speed": "65 km/h", "range": "520 km", "armament": "20mm"}, "materials": ["Steel Armor", "Composite Materials"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/a/a9/Marder_IFV_Bundeswehr.jpg"},
    {"name": "AMX-10RC", "manufacturer": "KNDS", "category": "land", "product_type": "reconnaissance", "specifications": {"weight": "17 tons", "speed": "85 km/h", "range": "800 km", "armament": "105mm"}, "materials": ["Aluminum Armor", "6x6 Wheeled"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/2/2d/AMX-10RC_wheeled_tank_destroyer.jpg"},
    {"name": "Piranha V", "manufacturer": "GDELS", "category": "land", "product_type": "apc", "specifications": {"weight": "30 tons", "speed": "100 km/h", "range": "700 km", "capacity": "11 troops"}, "materials": ["Steel Armor", "8x8 Wheeled"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8f/Piranha_V_APC.jpg"},
    {"name": "Pandur II", "manufacturer": "GDELS", "category": "land", "product_type": "apc", "specifications": {"weight": "22 tons", "speed": "105 km/h", "range": "700 km", "capacity": "8 troops"}, "materials": ["Steel", "8x8 Wheeled"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/7/7d/Pandur_II_APC.jpg"},
    {"name": "Arjun Mk-1A", "manufacturer": "Hindustan Aeronautics", "category": "land", "product_type": "tank", "specifications": {"weight": "68.25 tons", "speed": "58 km/h", "range": "450 km", "main_gun": "120mm"}, "materials": ["Kanchan Armor", "ERA"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Arjun_Mk_1A.jpg?width=800"},
    {"name": "Altay Tank", "manufacturer": "BMC Turkey", "category": "land", "product_type": "tank", "specifications": {"weight": "65 tons", "speed": "70 km/h", "range": "500 km", "main_gun": "120mm"}, "materials": ["Modular Armor", "APS"], "status": "development", "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/6a/Altay_tank_prototype.jpg"},
    {"name": "VT-4 Tank", "manufacturer": "Norinco", "category": "land", "product_type": "tank", "specifications": {"weight": "52 tons", "speed": "70 km/h", "range": "500 km", "main_gun": "125mm"}, "materials": ["Composite Armor", "ERA"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/0/0e/VT-4_MBT_Pakistan.jpg"},
    {"name": "Zumwalt-class Destroyer", "manufacturer": "General Dynamics", "category": "naval", "product_type": "destroyer", "specifications": {"displacement": "15,656 tons", "length": "190 m", "speed": "30+ knots", "crew": "148"}, "materials": ["Tumblehome Hull", "Stealth Design"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/10/USS_Zumwalt_(DDG-1000)_underway.jpg"},
    {"name": "Constellation-class Frigate", "manufacturer": "Fincantieri", "category": "naval", "product_type": "frigate", "specifications": {"displacement": "7,291 tons", "length": "151 m", "speed": "26+ knots", "crew": "200"}, "materials": ["Steel", "FREMM Design"], "status": "development", "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/61/FREMM_DA_Martinengo.jpg"},
    {"name": "Gowind-class Corvette", "manufacturer": "Naval Group", "category": "naval", "product_type": "corvette", "specifications": {"displacement": "2,500 tons", "length": "102 m", "speed": "25+ knots", "crew": "80"}, "materials": ["Steel", "Stealth Design"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/7/72/Gowind_2500_corvette.jpg"},
    {"name": "Visby-class Corvette", "manufacturer": "Saab Kockums", "category": "naval", "product_type": "corvette", "specifications": {"displacement": "640 tons", "length": "73 m", "speed": "35 knots", "crew": "43"}, "materials": ["Carbon Fiber", "Stealth Hull"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/c/cc/HMS_Visby_K31.jpg"},
    {"name": "Sa'ar 6 Corvette", "manufacturer": "ThyssenKrupp Marine", "category": "naval", "product_type": "corvette", "specifications": {"displacement": "1,900 tons", "length": "90 m", "speed": "26 knots", "crew": "70"}, "materials": ["Steel", "Iron Dome Integration"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/d/d7/INS_Magen_Sa%27ar_6.jpg"},
    {"name": "Scorpene-class Submarine", "manufacturer": "Naval Group", "category": "naval", "product_type": "submarine", "specifications": {"displacement": "1,870 tons", "length": "67 m", "speed": "20+ knots", "depth": "300+ m"}, "materials": ["HY-80 Steel", "AIP Option"], "status": "active", "image_url": "https://images.unsplash.com/photo-1707622058621-6228998d84bc?w=800"},
    {"name": "Type 212 Submarine", "manufacturer": "ThyssenKrupp Marine", "category": "naval", "product_type": "submarine", "specifications": {"displacement": "1,830 tons", "length": "56 m", "speed": "20 knots", "depth": "400 m"}, "materials": ["Amagnetic Steel", "Fuel Cell AIP"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/e/e4/Type212submarine.jpg"},
    {"name": "Soryu-class Submarine", "manufacturer": "Mitsubishi/Kawasaki", "category": "naval", "product_type": "submarine", "specifications": {"displacement": "4,200 tons", "length": "84 m", "speed": "20 knots", "depth": "300+ m"}, "materials": ["NS110 Steel", "Lithium-ion Battery"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/f/fb/JS_Hakuryu_SS-503_2016.jpg"},
    {"name": "AGM-88G AARGM-ER", "manufacturer": "Northrop Grumman", "category": "missile", "product_type": "anti_radiation", "specifications": {"range": "300+ km", "speed": "Mach 2+", "guidance": "GPS/INS/Anti-radiation", "warhead": "Blast-frag"}, "materials": ["Composite", "Solid Propellant"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/0/0a/AGM-88_HARM_missile.jpg"},
    {"name": "Exocet MM40 Block 3", "manufacturer": "MBDA", "category": "missile", "product_type": "anti_ship", "specifications": {"range": "200 km", "speed": "Mach 0.93", "guidance": "GPS/INS/Radar", "warhead": "165 kg"}, "materials": ["Turbojet", "Composite Materials"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/0/0e/Exocet_MM40_missile.jpg"},
    {"name": "RBS-15 Mk4", "manufacturer": "Saab AB", "category": "missile", "product_type": "anti_ship", "specifications": {"range": "300+ km", "speed": "Subsonic", "guidance": "GPS/INS/Radar", "warhead": "200 kg"}, "materials": ["Turbojet", "Stealth Design"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/7/7d/RBS-15_Mk3_missile.jpg"},
    {"name": "LRASM AGM-158C", "manufacturer": "Lockheed Martin", "category": "missile", "product_type": "anti_ship", "specifications": {"range": "370+ km", "speed": "Subsonic", "guidance": "GPS/INS/AI", "warhead": "454 kg"}, "materials": ["Stealth Composites", "Turbofan"], "status": "active", "image_url": "https://images.unsplash.com/photo-1714381634802-5951069bd792?w=800"},
    {"name": "BrahMos", "manufacturer": "BrahMos Aerospace", "category": "missile", "product_type": "cruise_missile", "specifications": {"range": "450 km", "speed": "Mach 2.8", "guidance": "GPS/INS/Radar", "warhead": "300 kg"}, "materials": ["Ramjet", "Titanium Alloys"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/5/5d/BrahMos_PJ-10_supersonic_cruise_missile.jpg"},
    {"name": "SM-6 Standard Missile", "manufacturer": "Raytheon Technologies", "category": "missile", "product_type": "sam", "specifications": {"range": "370+ km", "altitude": "33 km", "speed": "Mach 3.5", "guidance": "Active Radar"}, "materials": ["Solid Propellant", "Advanced Seeker"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/0/0a/SM-6_Standard_Missile_launch.jpg"},
    {"name": "Starstreak HVM", "manufacturer": "Thales", "category": "missile", "product_type": "manpads", "specifications": {"range": "7 km", "speed": "Mach 4", "guidance": "Laser Beam", "warhead": "Kinetic Darts"}, "materials": ["Composite", "Laser Guidance"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/60/Starstreak_HVM_missile.jpg"},
    {"name": "Mistral MANPADS", "manufacturer": "MBDA", "category": "missile", "product_type": "manpads", "specifications": {"range": "6.5 km", "speed": "Mach 2.5", "guidance": "IR", "warhead": "3 kg"}, "materials": ["Composite", "IR Seeker"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/b/b4/Mistral_MANPADS_soldier.jpg"},
    {"name": "Stinger FIM-92", "manufacturer": "Raytheon Technologies", "category": "missile", "product_type": "manpads", "specifications": {"range": "4.8 km", "speed": "Mach 2.2", "guidance": "IR", "warhead": "3 kg"}, "materials": ["Composite", "Dual-Band IR"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/5/54/Stinger_missile_man_portable_air_defense.jpg"},
    {"name": "VL-MICA", "manufacturer": "MBDA", "category": "missile", "product_type": "sam", "specifications": {"range": "25 km", "altitude": "9 km", "speed": "Mach 3", "guidance": "IR/RF"}, "materials": ["Solid Propellant", "VLS Compatible"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/6e/VL-MICA_naval_launcher.jpg"},
    {"name": "Akash-NG", "manufacturer": "DRDO", "category": "missile", "product_type": "sam", "specifications": {"range": "80 km", "altitude": "20 km", "speed": "Mach 4", "guidance": "Active Radar"}, "materials": ["Solid Propellant", "Indigenous"], "status": "development", "image_url": "https://upload.wikimedia.org/wikipedia/commons/0/0e/Akash_missile_system.jpg"},
    {"name": "SPYDER-MR", "manufacturer": "Rafael Advanced Defense", "category": "missile", "product_type": "sam", "specifications": {"range": "50 km", "altitude": "16 km", "speed": "Mach 4", "missiles": "Python-5/Derby"}, "materials": ["Mobile Launcher", "Quick Reaction"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/5/5c/SPYDER_air_defense_system.jpg"},
    # === Additional Aircraft ===
    {"name": "Su-35S Flanker-E", "manufacturer": "Sukhoi/UAC", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 2.25", "range": "3,600 km", "ceiling": "59,100 ft", "payload": "17,630 lbs"}, "materials": ["Titanium", "Composite Materials", "RAM Coating"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/9/9d/Su-35S_Flanker-E.jpg"},
    {"name": "Tornado IDS", "manufacturer": "Panavia Aircraft", "category": "aircraft", "product_type": "attack", "specifications": {"max_speed": "Mach 2.2", "range": "3,890 km", "ceiling": "50,000 ft", "payload": "19,841 lbs"}, "materials": ["Aluminum Alloy", "Titanium", "Steel"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/f/f6/Panavia_Tornado_IDS_of_German_Air_Force.jpg"},
    {"name": "AV-8B Harrier II", "manufacturer": "Boeing Defense", "category": "aircraft", "product_type": "attack", "specifications": {"max_speed": "1,065 km/h", "range": "3,015 km", "ceiling": "50,000 ft", "payload": "9,415 lbs"}, "materials": ["Composite Materials", "Aluminum Alloy"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/9/96/AV-8B_Harrier_II_Plus.jpg"},
    {"name": "Eurodrone MALE", "manufacturer": "Airbus Defence & Space", "category": "aircraft", "product_type": "uav", "specifications": {"max_speed": "250 km/h", "range": "10,000 km", "endurance": "40 hours", "ceiling": "45,000 ft"}, "materials": ["Carbon Fiber Composites", "Advanced Avionics"], "status": "development", "image_url": "https://upload.wikimedia.org/wikipedia/commons/3/37/MQ-9_Reaper_in_flight_(disheveled).jpg"},
    {"name": "Heron TP", "manufacturer": "Israel Aerospace Industries", "category": "aircraft", "product_type": "uav", "specifications": {"max_speed": "220 km/h", "range": "1,000 km", "endurance": "52 hours", "payload": "1,000 kg"}, "materials": ["Composite Materials", "Carbon Fiber"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/5/52/Heron_TP_UAV.jpg"},
    {"name": "Wing Loong II", "manufacturer": "AVIC", "category": "aircraft", "product_type": "uav", "specifications": {"max_speed": "370 km/h", "range": "6,000 km", "endurance": "32 hours", "payload": "480 kg"}, "materials": ["Composite Materials", "Aluminum Alloy"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/0/0a/Wing_Loong_II_UAV.jpg"},
    {"name": "AC-130J Ghostrider", "manufacturer": "Lockheed Martin", "category": "aircraft", "product_type": "gunship", "specifications": {"max_speed": "643 km/h", "range": "6,852 km", "ceiling": "33,000 ft", "armament": "30mm/105mm/SDB"}, "materials": ["Aluminum Alloy", "Carbon Composites"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/a/a4/AC-130J_Ghostrider_gunship.jpg"},
    # === Additional Missiles ===
    {"name": "Taurus KEPD 350", "manufacturer": "MBDA/Saab", "category": "missile", "product_type": "cruise_missile", "specifications": {"range": "500 km", "speed": "Mach 0.95", "guidance": "GPS/INS/TERCOM", "warhead": "MEPHISTO 481 kg"}, "materials": ["Stealth Composites", "Turbofan Engine"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Taurus_KEPD_350_cruise_missile.jpg"},
    {"name": "IRIS-T SLM", "manufacturer": "Diehl Defence", "category": "missile", "product_type": "sam", "specifications": {"range": "40 km", "altitude": "20 km", "speed": "Mach 3+", "guidance": "IR Imaging"}, "materials": ["Composite Materials", "Mobile Launcher"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/5/5f/IRIS-T_SLM_air_defense.jpg"},
    {"name": "Arrow 3", "manufacturer": "Israel Aerospace Industries", "category": "missile", "product_type": "anti_ballistic", "specifications": {"range": "2,400 km", "altitude": "100 km", "speed": "Mach 9", "guidance": "Multi-mode Radar"}, "materials": ["Advanced Composites", "Dual-Pulse Motor"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/6a/Arrow_3_ABM_system.jpg"},
    {"name": "PrSM Precision Strike Missile", "manufacturer": "Lockheed Martin", "category": "missile", "product_type": "precision_strike", "specifications": {"range": "500+ km", "speed": "Supersonic", "guidance": "GPS/INS/Multi-mode", "warhead": "Unitary"}, "materials": ["Composite Airframe", "Solid Propellant"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/b/be/M142_HIMARS.jpg"},
    {"name": "Sea Venom", "manufacturer": "MBDA", "category": "missile", "product_type": "air_to_ship", "specifications": {"range": "20 km", "speed": "Subsonic", "guidance": "INS/IR Imaging", "warhead": "30 kg"}, "materials": ["Composite Materials", "Imaging Seeker"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Sea_Venom_missile.jpg"},
    {"name": "Barak 8 LRSAM", "manufacturer": "Israel Aerospace Industries", "category": "missile", "product_type": "sam", "specifications": {"range": "70 km", "altitude": "16 km", "speed": "Mach 2", "guidance": "Active Radar"}, "materials": ["Solid Propellant", "Advanced Electronics"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/b/b8/Barak_8_LRSAM.jpg"},
    {"name": "RIM-161 SM-3", "manufacturer": "Raytheon Technologies", "category": "missile", "product_type": "anti_ballistic", "specifications": {"range": "700 km", "altitude": "250 km", "speed": "Mach 10+", "guidance": "Kinetic Warhead"}, "materials": ["Advanced Composites", "3-Stage Propulsion"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/0/0a/RIM-161_SM-3_launch.jpg"},
    {"name": "Spike ER2", "manufacturer": "Rafael Advanced Defense", "category": "missile", "product_type": "anti_tank", "specifications": {"range": "16 km", "speed": "180 m/s", "guidance": "EO/IR Multi-mode", "warhead": "Tandem HEAT"}, "materials": ["Composite Airframe", "Dual Seeker"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/1b/Spike_ER_missile.jpg"},
    # === Additional Naval Systems ===
    {"name": "Type 055 Destroyer", "manufacturer": "CSSC", "category": "naval", "product_type": "destroyer", "specifications": {"displacement": "13,000 tons", "length": "180 m", "speed": "30+ knots", "crew": "310"}, "materials": ["Steel Hull", "Stealth Design", "Phased Array Radar"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/f/f9/Chinese_Type_055_Destroyer.jpg"},
    {"name": "HNLMS De Ruyter-class", "manufacturer": "Damen Naval", "category": "naval", "product_type": "frigate", "specifications": {"displacement": "6,050 tons", "length": "144 m", "speed": "28+ knots", "crew": "202"}, "materials": ["Steel Hull", "APAR Radar"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/f/fd/HNLMS_De_Ruyter_F804.jpg"},
    {"name": "INS Vikrant", "manufacturer": "Cochin Shipyard", "category": "naval", "product_type": "aircraft_carrier", "specifications": {"displacement": "45,000 tons", "length": "262 m", "speed": "28 knots", "aircraft": "30"}, "materials": ["Indian DH36 Steel", "STOBAR Configuration"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/5/57/INS_Vikrant_IAC-1.jpg"},
    {"name": "Type 31 Frigate", "manufacturer": "BAE Systems", "category": "naval", "product_type": "frigate", "specifications": {"displacement": "5,700 tons", "length": "138 m", "speed": "24 knots", "crew": "100"}, "materials": ["Steel Hull", "Modular Design"], "status": "development", "image_url": "https://upload.wikimedia.org/wikipedia/commons/d/d8/HMS_Glasgow_(50733966826).jpg"},
    {"name": "F126 Frigate", "manufacturer": "Damen Naval", "category": "naval", "product_type": "frigate", "specifications": {"displacement": "10,000 tons", "length": "166 m", "speed": "26 knots", "crew": "110"}, "materials": ["Steel", "Advanced Composites"], "status": "development", "image_url": "https://upload.wikimedia.org/wikipedia/commons/f/fd/HNLMS_De_Ruyter_F804.jpg"},
    # === Additional Land Systems ===
    {"name": "K21 IFV", "manufacturer": "Hyundai Rotem", "category": "land", "product_type": "ifv", "specifications": {"weight": "25 tons", "speed": "70 km/h", "range": "500 km", "armament": "40mm"}, "materials": ["Aluminum Armor", "Composite Hull"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/1b/K21_IFV_South_Korea.jpg"},
    {"name": "JLTV", "manufacturer": "Oshkosh Defense", "category": "land", "product_type": "tactical_vehicle", "specifications": {"weight": "6.4 tons", "speed": "113 km/h", "range": "700 km", "payload": "1,587 kg"}, "materials": ["Advanced Steel Armor", "Blast-Resistant Floor"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Joint_Light_Tactical_Vehicle_JLTV.jpg"},
    {"name": "M109A7 Paladin", "manufacturer": "BAE Systems", "category": "land", "product_type": "artillery", "specifications": {"caliber": "155mm", "range": "40 km", "rate_of_fire": "4 rpm", "crew": "5"}, "materials": ["Steel Armor", "Bradley Hull"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/c/c2/M109A6_Paladin.jpg"},
    {"name": "Zuzana 2", "manufacturer": "Konštrukta-Defence", "category": "land", "product_type": "artillery", "specifications": {"caliber": "155mm", "range": "52 km", "rate_of_fire": "6 rpm", "crew": "3"}, "materials": ["Steel Armor", "Autonomous Loading"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/67/Zuzana_2_SPH.jpg"},
    {"name": "AS-90 Braveheart", "manufacturer": "BAE Systems", "category": "land", "product_type": "artillery", "specifications": {"caliber": "155mm", "range": "40 km", "rate_of_fire": "3 rpm burst", "crew": "5"}, "materials": ["Armored Steel", "Composite Materials"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/a/a4/AS-90_self-propelled_gun.jpg"},
    {"name": "Lynx KF41", "manufacturer": "Rheinmetall", "category": "land", "product_type": "ifv", "specifications": {"weight": "38 tons", "speed": "70 km/h", "range": "500 km", "armament": "35mm"}, "materials": ["Composite Armor", "AMAP Protection"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/1e/Lynx_KF41_IFV.jpg"},
    {"name": "8x8 Eitan APC", "manufacturer": "Elbit Systems", "category": "land", "product_type": "apc", "specifications": {"weight": "30 tons", "speed": "90 km/h", "range": "600 km", "capacity": "12 troops"}, "materials": ["Steel/Composite Armor", "Iron Fist APS"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/5/54/Eitan_APC_8x8.jpg"},
    # === Additional Space Systems ===
    {"name": "WGS-11 Satellite", "manufacturer": "Boeing Defense", "category": "space", "product_type": "communications_satellite", "specifications": {"orbit": "GEO 35,786 km", "bandwidth": "X/Ka band 4.875 GHz", "coverage": "Global", "lifespan": "14 years"}, "materials": ["Composite Bus", "Solar Arrays"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/3/3e/GPS-IIF-1_satellite.jpg"},
    {"name": "Pleiades Neo", "manufacturer": "Airbus Defence & Space", "category": "space", "product_type": "reconnaissance_satellite", "specifications": {"orbit": "SSO 620 km", "resolution": "30 cm", "coverage": "Global", "revisit_time": "1 day"}, "materials": ["Composite Structure", "Optical Payload"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Pleiades_satellite.jpg"},
    # === Additional Cyber/EW Systems ===
    {"name": "AN/APG-81 AESA Radar", "manufacturer": "Northrop Grumman", "category": "radar", "product_type": "radar", "specifications": {"type": "AESA", "platform": "F-35", "modes": "SAR/GMTI/NCTR", "bands": "X-band"}, "materials": ["Advanced Electronics", "GaAs/GaN Modules"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/16/F-35A_CTOL_variant.jpg"},
    {"name": "CAESAR NG (Next Gen)", "manufacturer": "KNDS", "category": "land", "product_type": "artillery", "specifications": {"caliber": "155mm", "range": "50 km", "rate_of_fire": "8 rpm", "crew": "2"}, "materials": ["High-Strength Steel", "Semi-Autonomous Systems"], "status": "development", "image_url": "https://upload.wikimedia.org/wikipedia/commons/2/29/CAESAR_155mm_wheeled_self-propelled_howitzer.jpg"},
    # === KNDS Products ===
    {"name": "Jaguar EBRC", "manufacturer": "KNDS", "category": "land", "product_type": "reconnaissance", "specifications": {"weight": "25 tons", "speed": "90 km/h", "range": "800 km", "armament": "40mm CTA + MMP missiles"}, "materials": ["Modular Composite Armor", "SCORPION Network"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/9/95/Jaguar_EBRC_Satory_2022.jpg"},
    {"name": "Leopard 2 A8", "manufacturer": "KNDS", "category": "land", "product_type": "tank", "specifications": {"weight": "67.5 tons", "speed": "72 km/h", "range": "450 km", "main_gun": "120mm L/55A1"}, "materials": ["AMAP Composite Armor", "Trophy APS", "Advanced Optics"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/82/Leopard_2A5_der_Bundeswehr.jpg"},
    {"name": "Leclerc XLR", "manufacturer": "KNDS", "category": "land", "product_type": "tank", "specifications": {"weight": "57.4 tons", "speed": "71 km/h", "range": "550 km", "main_gun": "120mm CN120-26/52"}, "materials": ["AZUR Urban Combat Kit", "SCORPION Integration", "ERA Tiles"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/f/fe/Leclerc_tank_HD.jpg"},
    {"name": "MGCS (Main Ground Combat System)", "manufacturer": "KNDS", "category": "land", "product_type": "tank", "specifications": {"weight": "Classified", "speed": "Classified", "range": "Classified", "main_gun": "Classified (130mm+)"}, "materials": ["Next-Gen Composite Armor", "Active Protection System", "AI-Assisted Fire Control"], "status": "development", "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/82/Leopard_2A5_der_Bundeswehr.jpg"},
    {"name": "VBMR Serval (Light)", "manufacturer": "KNDS", "category": "land", "product_type": "apc", "specifications": {"weight": "17.5 tons", "speed": "110 km/h", "range": "900 km", "capacity": "6 troops"}, "materials": ["High-Hardness Steel", "SCORPION Network", "4x4 Lightweight Platform"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/b/bb/VBMR_Griffon_SCORPION.jpg"},
    {"name": "KNDS EuroMain (Leopard 2 A7V)", "manufacturer": "KNDS", "category": "land", "product_type": "tank", "specifications": {"weight": "68.3 tons", "speed": "72 km/h", "range": "450 km", "main_gun": "120mm L/55"}, "materials": ["AMAP-B Roof Armor", "Ballistic Computer FLW 200", "Urban Survivability Kit"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/82/Leopard_2A5_der_Bundeswehr.jpg"},
    # === New: Next-Gen Aircraft ===
    {"name": "NGAD (Next Gen Air Dominance)", "manufacturer": "Lockheed Martin", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 2.0+", "range": "Classified", "ceiling": "60,000+ ft", "payload": "Classified"}, "materials": ["Advanced Stealth Composites", "RAM Coating", "Titanium Alloys"], "status": "development", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/NGAD_concept.jpg?width=800"},
    {"name": "F-16 Viper (F-16V)", "manufacturer": "Lockheed Martin", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 2.05", "range": "3,200 km", "ceiling": "50,000 ft", "payload": "7,700 kg"}, "materials": ["Aluminum Alloy", "Composite Materials"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/F-16V_Viper_Taiwan.jpg?width=800"},
    {"name": "Tempest / GCAP", "manufacturer": "BAE Systems", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 2.0+", "range": "2,000+ km", "ceiling": "55,000+ ft", "payload": "Classified"}, "materials": ["Stealth Composites", "Smart Skin Sensors"], "status": "development", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Team_Tempest_aircraft_model.jpg?width=800"},
    {"name": "SCAF / NGF", "manufacturer": "Dassault Aviation", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 2.0+", "range": "2,000+ km", "ceiling": "55,000+ ft", "payload": "Classified"}, "materials": ["Stealth Composites", "Advanced Electronics"], "status": "development", "image_url": "https://upload.wikimedia.org/wikipedia/commons/2/22/Dassault_Rafale_C_(cropped).jpg"},
    # === New: Missiles & Strike Systems ===
    {"name": "AGM-158B JASSM-ER", "manufacturer": "Lockheed Martin", "category": "missile", "product_type": "cruise_missile", "specifications": {"range": "925 km", "speed": "Mach 0.9", "guidance": "INS/GPS/IIR", "warhead": "450 kg"}, "materials": ["Composite Materials", "Stealth Coating"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/e/ea/AGM-158_JASSM.jpg"},
    {"name": "PrSM (Precision Strike Missile)", "manufacturer": "Lockheed Martin", "category": "missile", "product_type": "ballistic_missile", "specifications": {"range": "500+ km", "speed": "Mach 5+", "guidance": "GPS/INS", "warhead": "Conventional"}, "materials": ["Composite Materials", "Solid Propellant"], "status": "development", "image_url": "https://upload.wikimedia.org/wikipedia/commons/b/be/M142_HIMARS.jpg"},
    {"name": "ATACMS Block IVA", "manufacturer": "Lockheed Martin", "category": "missile", "product_type": "ballistic_missile", "specifications": {"range": "300 km", "speed": "Mach 3+", "guidance": "GPS/INS", "warhead": "500 kg unitary"}, "materials": ["Steel", "Composite Materials", "Solid Propellant"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/3/3c/ATACMS_launch.jpg"},
    {"name": "Storm Shadow / SCALP EG", "manufacturer": "MBDA", "category": "missile", "product_type": "cruise_missile", "specifications": {"range": "560 km", "speed": "Mach 0.95", "guidance": "INS/GPS/TERPROM", "warhead": "450 kg BROACH"}, "materials": ["Composite Materials", "Stealth Design"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/65/Storm_Shadow_SCALP.jpg"},
    {"name": "Meteor BVR Missile", "manufacturer": "MBDA", "category": "missile", "product_type": "air_to_air", "specifications": {"range": "100+ km", "speed": "Mach 4+", "guidance": "Active Radar", "warhead": "Blast fragmentation"}, "materials": ["Composite Materials", "Ramjet Propulsion"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/9/9e/MBDA_Meteor.jpg"},
    {"name": "SPEAR 3", "manufacturer": "MBDA", "category": "missile", "product_type": "air_to_ground", "specifications": {"range": "140 km", "speed": "Mach 0.9", "guidance": "GPS/IIR/Datalink", "warhead": "20 kg"}, "materials": ["Composite Materials", "Miniaturized Electronics"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/b/b7/Brimstone_missile.jpg"},
    {"name": "NSM (Naval Strike Missile)", "manufacturer": "Kongsberg Defence", "category": "missile", "product_type": "anti_ship", "specifications": {"range": "200 km", "speed": "Mach 0.95", "guidance": "GPS/IIR/Terrain", "warhead": "125 kg"}, "materials": ["Composite Materials", "Stealth Design"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/b/b1/Naval_Strike_Missile.jpg"},
    {"name": "Exocet MM40 Block 3C", "manufacturer": "MBDA", "category": "missile", "product_type": "anti_ship", "specifications": {"range": "180 km", "speed": "Mach 0.93", "guidance": "INS/GPS/AASM", "warhead": "165 kg"}, "materials": ["Aluminum", "Composite Materials"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/14/Exocet_MM40.jpg"},
    {"name": "LRASM", "manufacturer": "Lockheed Martin", "category": "missile", "product_type": "anti_ship", "specifications": {"range": "930 km", "speed": "Mach 0.9", "guidance": "INS/GPS/EO/ATA", "warhead": "450 kg"}, "materials": ["Stealth Composites", "Turbofan Engine"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/e/ea/AGM-158_JASSM.jpg"},
    # === New: Naval Systems ===
    {"name": "Gowind Corvette", "manufacturer": "Naval Group", "category": "naval", "product_type": "corvette", "specifications": {"displacement": "2,600 tons", "length": "102 m", "speed": "25+ knots", "crew": "65"}, "materials": ["Steel Hull", "Composite Superstructure"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/FS_Courbet_(F712).jpg?width=800"},
    {"name": "Type 23 Frigate", "manufacturer": "BAE Systems", "category": "naval", "product_type": "frigate", "specifications": {"displacement": "4,900 tons", "length": "133 m", "speed": "28 knots", "crew": "185"}, "materials": ["Steel Hull", "Glass Fiber Mast"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/4/4d/HMS_Richmond_frigate_MOD_45148048.jpg"},
    # === Active submarine classes (world) ===
    {"name": "Seawolf-class Submarine", "manufacturer": "General Dynamics", "category": "naval", "product_type": "submarine", "specifications": {"displacement": "9,137 tons", "length": "108 m", "speed": "35+ knots", "depth": "490+ m"}, "materials": ["HY-100 Steel", "Anechoic Tiles", "Pump-Jet Propulsor"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/5/50/USS_Seawolf_SSN-21.jpg"},
    {"name": "Vanguard-class Submarine", "manufacturer": "BAE Systems", "category": "naval", "product_type": "submarine", "specifications": {"displacement": "15,900 tons", "length": "150 m", "speed": "25 knots", "missiles": "16 Trident II"}, "materials": ["High-Tensile Steel", "PWR2 Reactor", "Anechoic Tiles"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/7/73/HMS_Vanguard_S28.jpg"},
    {"name": "Taigei-class Submarine", "manufacturer": "Mitsubishi/Kawasaki", "category": "naval", "product_type": "submarine", "specifications": {"displacement": "3,000 tons", "length": "84 m", "speed": "20 knots", "depth": "300+ m"}, "materials": ["NS110 Steel", "Lithium-ion Battery", "X-rudder"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/c/c4/JS_Taigei_SS-513.jpg"},
    {"name": "Gotland-class Submarine", "manufacturer": "Saab Kockums", "category": "naval", "product_type": "submarine", "specifications": {"displacement": "1,494 tons", "length": "60 m", "speed": "20 knots", "depth": "300+ m"}, "materials": ["High-Tensile Steel", "Stirling AIP"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/4/44/HMS_Gotland_2.jpg"},
    {"name": "Isaac Peral-class Submarine", "manufacturer": "Navantia", "category": "naval", "product_type": "submarine", "specifications": {"displacement": "2,426 tons", "length": "71 m", "speed": "19 knots", "depth": "300+ m"}, "materials": ["High-Tensile Steel", "AIP System", "Lithium-ion Battery"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/6e/S-80_Isaac_Peral_submarine_2022.jpg"},
    {"name": "KSS-III Submarine", "manufacturer": "Hanwha Ocean", "category": "naval", "product_type": "submarine", "specifications": {"displacement": "3,705 tons", "length": "83.5 m", "speed": "20+ knots", "missiles": "6 SLBMs"}, "materials": ["High-Tensile Steel", "Lithium-ion Battery"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/14/ROKS_Dosan_Ahn_Changho.jpg"},
    {"name": "Borei-class Submarine", "manufacturer": "Sevmash", "category": "naval", "product_type": "submarine", "specifications": {"displacement": "24,000 tons", "length": "170 m", "speed": "29 knots", "missiles": "16 Bulava"}, "materials": ["High-Tensile Steel", "OK-650V Reactor", "Pump-Jet"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/c/c0/Yuri_Dolgoruky_nuclear_submarine.jpg"},
    {"name": "Yasen-class Submarine", "manufacturer": "Sevmash", "category": "naval", "product_type": "submarine", "specifications": {"displacement": "13,800 tons", "length": "139 m", "speed": "35 knots", "missiles": "32 Kalibr/Oniks"}, "materials": ["High-Tensile Steel", "OK-650KPM Reactor", "Anechoic Tiles"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/5/5d/Yasen-class_submarine_Kazan.jpg"},
    # === New: Space Systems ===
    {"name": "CSO Optical Satellite", "manufacturer": "Airbus Defence & Space", "category": "space", "product_type": "reconnaissance_satellite", "specifications": {"orbit": "SSO 480-800 km", "resolution": "<35 cm", "coverage": "Global", "lifespan": "10 years"}, "materials": ["Composite Structure", "Large Format Camera"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/b/bf/SBIRS_GEO-1_satellite.jpg"},
    {"name": "MUOS-5 Satellite", "manufacturer": "Lockheed Martin", "category": "space", "product_type": "communications_satellite", "specifications": {"orbit": "GEO", "bandwidth": "UHF/WCDMA", "coverage": "Global", "lifespan": "15 years"}, "materials": ["Composite Bus", "Large Mesh Antenna"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/3/3e/GPS-IIF-1_satellite.jpg"},
    {"name": "Milani / Michibiki", "manufacturer": "Mitsubishi Electric", "category": "space", "product_type": "navigation_satellite", "specifications": {"orbit": "QZO 32,000 km", "accuracy": "10 cm", "lifespan": "15 years", "signals": "L1C/L5/LEX"}, "materials": ["Aluminum", "Solar Arrays"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/3/3e/GPS-IIF-1_satellite.jpg"},
    # === New: Cyber & EW ===
    {"name": "EA-18G Growler", "manufacturer": "Boeing Defense", "category": "cyber", "product_type": "electronic_warfare", "specifications": {"max_speed": "Mach 1.8", "range": "1,700 km", "ceiling": "50,000 ft", "jamming": "AN/ALQ-218 + ALQ-99"}, "materials": ["Aluminum", "Carbon Fiber", "Advanced Electronics"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/b/b6/EA-18G_Growler.jpg"},
    {"name": "RC-135V/W Rivet Joint", "manufacturer": "Boeing Defense", "category": "cyber", "product_type": "sigint", "specifications": {"max_speed": "980 km/h", "range": "6,800 km", "endurance": "20+ hours", "sensors": "Multi-INT suite"}, "materials": ["Boeing 707 Airframe", "Advanced Sensor Pods"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/b/bb/RC-135V_Rivet_Joint_RAF.jpg"},
    {"name": "Falcon Shield C-UAS", "manufacturer": "L3Harris Technologies", "category": "cyber", "product_type": "c_uas", "specifications": {"range": "20 km", "type": "Detect/Track/Defeat", "targets": "UAS/sUAS", "integration": "C2 compatible"}, "materials": ["Radar", "RF Jammers", "Directed Energy"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/5/5e/AN-TPS-80_CTOR_radar.jpg"},
    # === New: Land Systems ===
    {"name": "Lynx QC (Quick Command)", "manufacturer": "Rheinmetall", "category": "land", "product_type": "ifv", "specifications": {"weight": "44 tons", "speed": "70 km/h", "range": "500 km", "armament": "35mm WOTAN"}, "materials": ["Composite Armor", "ROSY Smoke System"], "status": "development", "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/1e/Lynx_KF41_IFV.jpg"},
    {"name": "AMV35 IFV", "manufacturer": "Patria", "category": "land", "product_type": "ifv", "specifications": {"weight": "32 tons", "speed": "100 km/h", "range": "800 km", "armament": "35mm"}, "materials": ["Steel/Composite Armor", "8x8 Platform"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/88/M1126_Stryker_ICV.jpg"},
    {"name": "Oerlikon Skyshield", "manufacturer": "Rheinmetall", "category": "missile", "product_type": "shorad", "specifications": {"range": "4 km", "altitude": "3 km", "rate_of_fire": "1,000 rpm", "rounds": "35mm AHEAD"}, "materials": ["Aluminum", "Advanced Electronics"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Oerlikon_Skyshield.jpg?width=800"},
    {"name": "Mistral SHORAD", "manufacturer": "MBDA", "category": "missile", "product_type": "shorad", "specifications": {"range": "6 km", "altitude": "3 km", "speed": "Mach 2.6", "warhead": "3 kg"}, "materials": ["Composite Materials", "IR Seeker"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Mistral_SHORAD_launcher.jpg?width=800"},

    # === Radar Systems (new category) ===
    {"name": "Ground Master 400", "manufacturer": "Thales", "category": "radar", "product_type": "air_surveillance", "specifications": {"range": "470 km", "altitude": "100,000 ft", "tracks": "1,500+", "frequency": "S-band"}, "materials": ["Advanced Electronics", "AESA Array", "Mobile Platform"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Thales_Ground_Master_400_alpha_-_Dutch_armed_forces.jpg"},
    {"name": "Ground Master 200", "manufacturer": "Thales", "category": "radar", "product_type": "air_surveillance", "specifications": {"range": "250 km", "altitude": "80,000 ft", "tracks": "500+", "frequency": "S-band"}, "materials": ["Advanced Electronics", "3D AESA", "Mobile Trailer"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Thales_Ground_Master_200_ILA-2018.jpg"},
    {"name": "Sea Fire 500", "manufacturer": "Thales", "category": "radar", "product_type": "naval_radar", "specifications": {"range": "500 km", "frequency": "C-band AESA", "tracks": "1,000+", "platform": "FDI Frigate"}, "materials": ["GaN AESA Array", "Fixed Panels", "Advanced Electronics"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/4/46/Sea_Fire_500_radar_FDI.jpg"},
    {"name": "RBE2-AA AESA", "manufacturer": "Thales", "category": "radar", "product_type": "airborne_radar", "specifications": {"range": "200 km", "frequency": "X-band", "platform": "Rafale F3+", "modes": "Air/Ground/Sea"}, "materials": ["GaN Modules", "Active Array", "Advanced DSP"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/2/22/Dassault_Rafale_C_(cropped).jpg"},
    {"name": "SPY-6 AMDR", "manufacturer": "Raytheon Technologies", "category": "radar", "product_type": "naval_radar", "specifications": {"range": "1,000+ km", "frequency": "S-band AESA", "tracks": "10,000+", "platform": "DDG-51 Flt III"}, "materials": ["GaN AESA", "Active Radar Modules", "Advanced Signal Processing"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/3/39/AN-SPY-6_radar.jpg"},
    {"name": "AN/TPY-2", "manufacturer": "Raytheon Technologies", "category": "radar", "product_type": "ballistic_missile_radar", "specifications": {"range": "1,000+ km", "frequency": "X-band", "tracks": "BMDS", "mobility": "Transportable"}, "materials": ["AESA Array", "High-Power Electronics", "Mobile Platform"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/1f/AN-TPY-2_radar.jpg"},
    {"name": "KRONOS Grand Naval", "manufacturer": "Leonardo", "category": "radar", "product_type": "naval_radar", "specifications": {"range": "400 km", "frequency": "C-band AESA", "tracks": "1,200+", "platform": "Frigates/Destroyers"}, "materials": ["AESA Array", "Digital Beamforming", "GaN Technology"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/EMPAR_ITS_Andrea_Doria.jpg"},
    {"name": "TRML-4D", "manufacturer": "Hensoldt", "category": "radar", "product_type": "air_surveillance", "specifications": {"range": "250 km", "altitude": "25 km", "frequency": "C-band AESA", "tracks": "1,500+"}, "materials": ["AESA Array", "Digital Receiver", "Mobile Platform"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/5/5e/TRML-4D_radar.jpg"},
    {"name": "ELM-2084 MMR", "manufacturer": "Israel Aerospace Industries", "category": "radar", "product_type": "multimode_radar", "specifications": {"range": "470 km", "frequency": "S-band", "modes": "Surveillance/Fire Control/BMD", "tracks": "1,200+"}, "materials": ["AESA Array", "Solid-State Transmitter"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/1f/AN-TPY-2_radar.jpg"},
    {"name": "SMART-L MM/N", "manufacturer": "Thales", "category": "radar", "product_type": "naval_radar", "specifications": {"range": "480 km", "frequency": "D-band", "tracks": "1,000+", "platform": "De Ruyter-class"}, "materials": ["AESA Array", "D-band Modules", "Naval Mast Integration"], "status": "active", "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/SMART-L_radar_HNLMS_De_Ruyter.jpg"},
    {"name": "AN/APG-83 SABR", "manufacturer": "Northrop Grumman", "category": "radar", "product_type": "airborne_radar", "specifications": {"frequency": "X-band AESA", "platform": "F-16 Block 70+", "modes": "SAR/GMTI/NCTR", "range": "150+ km"}, "materials": ["GaN AESA", "Open Architecture"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/e/e0/General_Dynamics_F-16_Fighting_Falcon.jpg"},
    {"name": "SeaSpray 7500E", "manufacturer": "Leonardo", "category": "radar", "product_type": "airborne_radar", "specifications": {"frequency": "I-band", "platform": "AW159 / NH90", "modes": "ISAR/SAR/Search", "range": "350 km"}, "materials": ["AESA Array", "Electronic Scanning", "Compact Design"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/e/e9/NH90_helicopter.jpg"},
    # === Thales products (non-radar) ===
    {"name": "Watchkeeper WK450", "manufacturer": "Thales", "category": "aircraft", "product_type": "uav", "specifications": {"max_speed": "150 km/h", "endurance": "16 hours", "ceiling": "16,000 ft", "payload": "150 kg"}, "materials": ["Carbon Fiber", "Composite Materials"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/5/56/Watchkeeper_WK450_UAV.jpg"},
    {"name": "Crotale NG", "manufacturer": "Thales", "category": "missile", "product_type": "shorad", "specifications": {"range": "11 km", "altitude": "6 km", "speed": "Mach 3.5", "guidance": "Radar/IR"}, "materials": ["Composite Materials", "Pulse-Doppler Radar"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/1f/Crotale_NG_air_defense.jpg"},
    {"name": "VL MICA", "manufacturer": "MBDA/Thales", "category": "missile", "product_type": "shorad", "specifications": {"range": "20 km", "altitude": "9 km", "speed": "Mach 3+", "guidance": "Active Radar/IR"}, "materials": ["Composite Materials", "Dual Seeker"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/6e/VL-MICA_naval_launcher.jpg"},
    {"name": "Bushmaster M242", "manufacturer": "Northrop Grumman", "category": "land", "product_type": "autocannon", "specifications": {"caliber": "25mm", "rate_of_fire": "500 rpm", "range": "3 km", "platform": "Bradley/LAV"}, "materials": ["Steel", "Aluminum Receiver"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/d/d2/M2_Bradley_fighting_vehicle.jpg"},
    {"name": "Hellfire AGM-114R", "manufacturer": "Lockheed Martin", "category": "missile", "product_type": "air_to_ground", "specifications": {"range": "11 km", "speed": "Mach 1.3", "guidance": "Semi-Active Laser/Radar", "warhead": "Multi-Purpose"}, "materials": ["Steel", "Tandem HEAT Warhead", "Semi-Active Seeker"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/e/e6/AGM-114_Hellfire_missile.jpg"},
    {"name": "Brimstone 3", "manufacturer": "MBDA", "category": "missile", "product_type": "air_to_ground", "specifications": {"range": "60 km", "speed": "Mach 1.3+", "guidance": "Dual-Mode Seeker", "warhead": "Tandem HEAT"}, "materials": ["Composite Materials", "Millimetric Radar Seeker"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/e/ea/Brimstone_missile_RAF.jpg"},
    {"name": "Harpoon Block II+ER", "manufacturer": "Boeing Defense", "category": "missile", "product_type": "anti_ship", "specifications": {"range": "300 km", "speed": "Mach 0.85", "guidance": "GPS/INS/Active Radar", "warhead": "221 kg"}, "materials": ["Aluminum", "Turbofan Engine", "Composite Materials"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/c/cc/AGM-84_Harpoon_missile.jpg"},
    {"name": "Javelin FGM-148F", "manufacturer": "Raytheon/Lockheed", "category": "missile", "product_type": "atgm", "specifications": {"range": "4.75 km", "speed": "190 m/s", "guidance": "Infrared Imaging", "warhead": "Tandem HEAT"}, "materials": ["Composite Launcher", "Imaging IR Seeker"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/9/9b/FGM-148_Javelin_ATGM.jpg"},

    # === Iconic & Mythic Platforms ===
    {"name": "B-52H Stratofortress", "manufacturer": "Boeing Defense", "category": "aircraft", "product_type": "bomber", "specifications": {"max_speed": "1,047 km/h", "range": "14,080 km", "ceiling": "50,000 ft", "payload": "32,000 kg"}, "materials": ["Aluminum Alloy", "Titanium", "Composite Materials"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/d/d1/B-52_Stratofortress.jpg"},
    {"name": "SR-71 Blackbird", "manufacturer": "Lockheed Martin", "category": "aircraft", "product_type": "reconnaissance", "specifications": {"max_speed": "Mach 3.3", "range": "5,400 km", "ceiling": "85,000 ft", "crew": "2"}, "materials": ["Titanium Alloy", "Iron-based Composites", "Radar-Absorbing Materials"], "status": "retired", "image_url": "https://upload.wikimedia.org/wikipedia/commons/b/bb/Lockheed_SR-71_Blackbird.jpg"},
    {"name": "F-117 Nighthawk", "manufacturer": "Lockheed Martin", "category": "aircraft", "product_type": "attack", "specifications": {"max_speed": "1,040 km/h", "range": "2,100 km", "ceiling": "45,000 ft", "payload": "2,268 kg"}, "materials": ["RAM Faceted Panels", "Composite Materials", "Stealth Coating"], "status": "retired", "image_url": "https://upload.wikimedia.org/wikipedia/commons/d/db/F117_Nighthawk_Front.jpg"},
    {"name": "F-14 Tomcat", "manufacturer": "Grumman", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 2.34", "range": "3,000 km", "ceiling": "50,000 ft", "payload": "6,577 kg"}, "materials": ["Titanium", "Aluminum", "Steel"], "status": "retired", "image_url": "https://upload.wikimedia.org/wikipedia/commons/e/ee/F14_Tomcat_contrail.jpg"},
    {"name": "E-3 Sentry AWACS", "manufacturer": "Boeing Defense", "category": "aircraft", "product_type": "awacs", "specifications": {"max_speed": "853 km/h", "range": "9,250 km", "ceiling": "29,000 ft", "endurance": "11 hours"}, "materials": ["Boeing 707 Airframe", "Rotodome Radar", "Advanced Electronics"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/1c/E-3_Sentry.jpg"},
    {"name": "C-130J Super Hercules", "manufacturer": "Lockheed Martin", "category": "aircraft", "product_type": "transport", "specifications": {"max_speed": "671 km/h", "range": "6,852 km", "ceiling": "28,000 ft", "payload": "19,958 kg"}, "materials": ["Aluminum Alloy", "Composite Materials"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/e/e8/C-130J_Super_Hercules.jpg"},
    {"name": "Tu-160 Blackjack", "manufacturer": "Tupolev", "category": "aircraft", "product_type": "bomber", "specifications": {"max_speed": "Mach 2.05", "range": "12,300 km", "ceiling": "52,000 ft", "payload": "45,000 kg"}, "materials": ["Titanium Alloy", "Composite Materials", "Variable-Sweep Wings"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/62/Tu-160.jpg"},
    {"name": "MiG-29 Fulcrum", "manufacturer": "RSK MiG", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 2.25", "range": "2,100 km", "ceiling": "59,000 ft", "payload": "4,500 kg"}, "materials": ["Aluminum-Lithium Alloy", "Composite Materials"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/a/ab/MiG-29_at_Kubinka.jpg"},
    {"name": "Mirage 2000-5", "manufacturer": "Dassault Aviation", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 2.2", "range": "3,335 km", "ceiling": "59,000 ft", "payload": "6,300 kg"}, "materials": ["Carbon Fiber", "Kevlar", "Aluminum Alloy"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/c/c9/Mirage_2000-5_droit.jpg"},
    {"name": "MH-60R Seahawk", "manufacturer": "Sikorsky", "category": "aircraft", "product_type": "helicopter", "specifications": {"max_speed": "270 km/h", "range": "834 km", "ceiling": "10,500 ft", "armament": "Torpedoes/Hellfire"}, "materials": ["Composite Rotors", "Aluminum Frame", "Advanced Avionics"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/e/ef/MH-60R_Seahawk_HSM-70.jpg"},
    {"name": "AW101 Merlin HM2", "manufacturer": "Leonardo", "category": "aircraft", "product_type": "helicopter", "specifications": {"max_speed": "309 km/h", "range": "1,050 km", "ceiling": "15,000 ft", "capacity": "24 troops"}, "materials": ["Composite Fuselage", "Titanium Components", "Advanced Avionics"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/d/d3/AgustaWestland_AW101_Merlin.jpg"},
    {"name": "MQ-28A Ghost Bat", "manufacturer": "Boeing Defense", "category": "aircraft", "product_type": "uav", "specifications": {"max_speed": "Mach 0.9+", "range": "3,700+ km", "ceiling": "45,000+ ft", "role": "Loyal Wingman"}, "materials": ["Composite Materials", "Stealth Design", "Advanced Avionics"], "status": "development", "image_url": "https://upload.wikimedia.org/wikipedia/commons/0/09/Boeing_MQ-28A_Ghost_Bat.jpg"},
    {"name": "F/A-18C Hornet", "manufacturer": "Boeing Defense", "category": "aircraft", "product_type": "fighter", "specifications": {"max_speed": "Mach 1.8", "range": "2,537 km", "ceiling": "50,000 ft", "payload": "7,711 kg"}, "materials": ["Aluminum", "Carbon Fiber", "Titanium"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/2/2e/F-18_Hornet_modified.jpg"},
    {"name": "Dassault nEUROn UCAV", "manufacturer": "Dassault Aviation", "category": "aircraft", "product_type": "uav", "specifications": {"max_speed": "Mach 0.8", "range": "Classified", "ceiling": "45,000 ft", "payload": "Classified"}, "materials": ["Stealth Composites", "Low-RCS Airframe"], "status": "development", "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/68/Dassault_nEUROn_UCAV.jpg"},

    # === Defense Tech — Anduril Industries (USA) ===
    {"name": "Lattice AI Platform", "manufacturer": "Anduril Industries", "category": "cyber", "product_type": "software", "specifications": {"type": "AI-driven C2/ISR fusion", "deployment": "Edge/Cloud hybrid", "integration": "Multi-domain sensors", "latency": "<500ms"}, "materials": ["Machine Learning Stack", "Sensor Fusion Engine", "Edge Computing Nodes"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/a/a4/XQ-58A_Valkyrie_demonstrator.jpg"},
    {"name": "Sentry Tower", "manufacturer": "Anduril Industries", "category": "radar", "product_type": "surveillance", "specifications": {"detection_range": "5 km", "type": "Autonomous C-UAS/ISR", "targets": "UAS, ground vehicles, personnel", "reaction_time": "Real-time AI cueing"}, "materials": ["AESA Radar", "EO/IR Camera Suite", "AI Processing Unit", "Ruggedized Housing"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/e/e2/AN-TPS-80_CTOR_radar.jpg"},
    {"name": "Ghost-X Autonomous Aircraft", "manufacturer": "Anduril Industries", "category": "aircraft", "product_type": "uav", "specifications": {"max_speed": "278 km/h", "range": "200 km", "endurance": "3 hours", "autonomy": "Full AI autonomous pilot"}, "materials": ["Carbon Fiber", "Composite Materials", "Autonomy Stack Electronics"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/c/c6/MQ-4C_Triton.jpg"},
    {"name": "Roadrunner-M Interceptor", "manufacturer": "Anduril Industries", "category": "missile", "product_type": "loitering_munition", "specifications": {"type": "Reusable autonomous interceptor", "propulsion": "Jet-powered VTOL", "guidance": "AI autonomous targeting", "payload": "Kinetic/fragmentation warhead"}, "materials": ["Composite Airframe", "Turbojet Engine", "Autonomy Electronics"], "status": "development", "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8a/AeroVironment_Switchblade.jpg"},
    {"name": "Pulsar EW System", "manufacturer": "Anduril Industries", "category": "cyber", "product_type": "electronic_warfare", "specifications": {"type": "Software-defined EW", "bands": "Multi-band adaptive", "functions": "Jamming/Sensing/Spoofing", "deployment": "Ground vehicle / fixed site"}, "materials": ["Software-Defined Radio", "GaN Amplifiers", "Adaptive Antenna Array", "AI Signal Processor"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/b/b6/EA-18G_Growler.jpg"},
    {"name": "Fury UCAV", "manufacturer": "Anduril Industries", "category": "aircraft", "product_type": "uav", "specifications": {"type": "Autonomous combat aircraft", "role": "Loyal wingman / strike", "propulsion": "Jet turbofan", "payload": "1,000+ kg weapons/sensors"}, "materials": ["Stealth Composite Airframe", "Carbon Fiber", "Autonomous Avionics"], "status": "development", "image_url": "https://upload.wikimedia.org/wikipedia/commons/a/a4/XQ-58A_Valkyrie_demonstrator.jpg"},
    {"name": "Altius-600M", "manufacturer": "Anduril Industries", "category": "missile", "product_type": "loitering_munition", "specifications": {"range": "440 km", "endurance": "4+ hours", "speed": "185 km/h", "warhead": "13.6 kg multi-effect"}, "materials": ["Composite Materials", "Electric Motor", "AI Guidance Electronics"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8a/AeroVironment_Switchblade.jpg"},

    # === Defense Tech — Helsing (Germany / UK) ===
    {"name": "SG-1 Foresight", "manufacturer": "Helsing", "category": "cyber", "product_type": "software", "specifications": {"type": "AI sensor fusion for pilots", "platform": "Eurofighter Typhoon / Rafale", "processing": "Real-time multi-sensor fusion", "outputs": "Cueing, targeting, threat IDs"}, "materials": ["Neural Network Inference Engine", "Edge AI Chips", "Secure Avionics Integration"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/87/Eurofighter_Typhoon_(Ala_11)_MG_3894_(15939726449).jpg"},
    {"name": "HX-2 Autonomous Drone", "manufacturer": "Helsing", "category": "aircraft", "product_type": "uav", "specifications": {"flight_type": "Fixed-wing (BVLOS)", "max_speed": "250 km/h", "range": "200 km", "endurance": "3 hours", "autonomy": "Swarm-capable AI autonomous"}, "materials": ["Carbon Fiber", "Composite Airframe", "AI Autonomy Stack"], "status": "development", "image_url": "https://upload.wikimedia.org/wikipedia/commons/a/a4/XQ-58A_Valkyrie_demonstrator.jpg"},
    {"name": "EW-Inferenz AI Platform", "manufacturer": "Helsing", "category": "cyber", "product_type": "electronic_warfare", "specifications": {"type": "AI-driven EW signal analysis", "deployment": "Airborne / ground-based", "capability": "Real-time threat inference & response", "bands": "Multi-spectrum adaptive"}, "materials": ["Software-Defined Radio", "AI Inference Chips", "Advanced Antenna Arrays"], "status": "development", "image_url": "https://upload.wikimedia.org/wikipedia/commons/b/b6/EA-18G_Growler.jpg"},

    # === Defense Tech — Shield AI (USA) ===
    {"name": "Hivemind AI Pilot", "manufacturer": "Shield AI", "category": "cyber", "product_type": "software", "specifications": {"type": "AI autonomous pilot", "platform": "F-16 / V-BAT / MQ-35", "autonomy": "No GPS / no comms required", "scenario": "Contested/degraded environments"}, "materials": ["Deep Reinforcement Learning", "Edge AI Stack", "Secure Flight Computer"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/e/e0/General_Dynamics_F-16_Fighting_Falcon.jpg"},
    {"name": "V-BAT VTOL Drone", "manufacturer": "Shield AI", "category": "aircraft", "product_type": "uav", "specifications": {"flight_type": "VTOL tail-sitter (vertical takeoff)", "max_speed": "185 km/h", "range": "370 km", "endurance": "12 hours", "autonomy": "Hivemind AI autonomous"}, "materials": ["Carbon Fiber", "Composite Fuselage", "Electric/Hybrid Propulsion"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/c/c6/MQ-4C_Triton.jpg"},

    # === Defense Tech — Ghost Robotics (USA) ===
    {"name": "Vision 60 Q-UGV", "manufacturer": "Ghost Robotics", "category": "land", "product_type": "ugv", "specifications": {"speed": "3 m/s sustained", "endurance": "3 hours", "payload": "10 kg", "terrain": "All-terrain quadruped robot"}, "materials": ["Aluminum Alloy Frame", "Polymer Composite Body", "Multi-Sensor Suite", "Ruggedized Electronics"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/5/54/Eitan_APC_8x8.jpg"},

    # === Defense Tech — Epirus (USA) ===
    {"name": "Leonidas HPM System", "manufacturer": "Epirus", "category": "cyber", "product_type": "directed_energy", "specifications": {"type": "High-Power Microwave (HPM)", "target": "Counter-UAS / drone swarms", "range": "1+ km", "effect": "Non-kinetic electronic defeat"}, "materials": ["GaN Power Amplifiers", "Phased Array Antenna", "AI-driven Targeting Software"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/e/e2/AN-TPS-80_CTOR_radar.jpg"},

    # === Defense Tech — Palantir (USA) ===
    {"name": "Maven Smart System", "manufacturer": "Palantir Technologies", "category": "cyber", "product_type": "software", "specifications": {"type": "AI-powered targeting & ISR", "users": "US Army / DoD", "capability": "Object detection, geolocation, kill chain", "classification": "TS/SCI"}, "materials": ["Computer Vision AI", "Big Data Analytics", "Secure Cloud/Edge Infrastructure"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/66/Palantir_logo.svg"},
    {"name": "AIP Artificial Intelligence Platform", "manufacturer": "Palantir Technologies", "category": "cyber", "product_type": "software", "specifications": {"type": "AI decision support platform", "deployment": "Cloud / on-premise / tactical edge", "integration": "Multi-source data fusion", "classification": "Unclassified to TS/SCI"}, "materials": ["Ontology-based AI", "Federated Data Architecture", "Secure Enclaves"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/66/Palantir_logo.svg"},

    # === Defense Tech — AeroVironment (USA) ===
    {"name": "Switchblade 300", "manufacturer": "AeroVironment", "category": "missile", "product_type": "loitering_munition", "specifications": {"max_speed": "157 km/h", "range": "10 km", "endurance": "15 min", "warhead": "Anti-personnel fragmentation"}, "materials": ["Composite Materials", "Electric Motor", "EO/IR Seeker"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8a/AeroVironment_Switchblade.jpg"},
    {"name": "Puma AE UAS", "manufacturer": "AeroVironment", "category": "aircraft", "product_type": "uav", "specifications": {"flight_type": "Fixed-wing (hand-launched)", "max_speed": "83 km/h", "range": "15 km", "endurance": "2.5 hours", "role": "ISR / Reconnaissance"}, "materials": ["Composite Materials", "Electric Propulsion", "EO/IR Camera"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/c/c6/MQ-4C_Triton.jpg"},
    {"name": "JUMP 20 VTOL UAS", "manufacturer": "AeroVironment", "category": "aircraft", "product_type": "uav", "specifications": {"flight_type": "VTOL + fixed-wing cruise (hybrid)", "max_speed": "140 km/h", "range": "185 km", "endurance": "14 hours", "autonomy": "BVLOS autonomous"}, "materials": ["Carbon Fiber", "Composite Materials", "Multi-mode Propulsion"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/d/d9/MQ-1C_Gray_Eagle.jpg"},

    # === Defense Tech — Quantum Systems (Germany) ===
    {"name": "Trinity F90+", "manufacturer": "Quantum Systems", "category": "aircraft", "product_type": "uav", "specifications": {"flight_type": "VTOL + fixed-wing cruise (tilt-rotor)", "max_speed": "72 km/h cruise", "range": "100 km", "endurance": "90 min", "launch": "Vertical takeoff, fixed-wing cruise"}, "materials": ["Carbon Fiber", "Folding Composite Wings", "Hybrid Electric Propulsion"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/5/56/Watchkeeper_WK450_UAV.jpg"},
    {"name": "Vector UAV", "manufacturer": "Quantum Systems", "category": "aircraft", "product_type": "uav", "specifications": {"flight_type": "Multi-rotor (quadrotor VTOL)", "max_speed": "90 km/h", "range": "60 km", "endurance": "2 hours", "payload": "1.5 kg EO/IR"}, "materials": ["Composite Materials", "Electric Propulsion", "Modular Payload Bay"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/5/56/Watchkeeper_WK450_UAV.jpg"},

    # === Defense Tech — Exail Technologies (France) ===
    {"name": "DG100 Autonomous USV", "manufacturer": "Exail Technologies", "category": "naval", "product_type": "usv", "specifications": {"length": "5.5 m", "speed": "15 knots", "endurance": "72 hours", "role": "Mine countermeasures / ISR"}, "materials": ["Carbon Fiber Hull", "Electric/Diesel Hybrid", "Sonar & Sensor Suite"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8d/Unmanned_surface_vehicle_USV.jpg"},
    {"name": "IDEFX Autonomous UUV", "manufacturer": "Exail Technologies", "category": "naval", "product_type": "uuv", "specifications": {"depth": "3,000 m", "endurance": "48 hours", "speed": "6 knots", "role": "Seabed survey / MCM"}, "materials": ["Titanium Pressure Vessel", "Composite Fairing", "Sonar Arrays"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/1b/Autonomous_underwater_vehicle.jpg"},

    # === Defense Tech — Harmattan AI (France) ===
    {"name": "Gobi", "manufacturer": "Harmattan AI", "category": "aircraft", "product_type": "uav", "specifications": {"flight_type": "Fixed-wing MALE", "max_speed": "230 km/h", "range": "1,200 km", "endurance": "24+ hours", "payload": "EO/IR/SAR ISR suite", "autonomy": "Edge AI — GPS-denied, fully autonomous"}, "materials": ["Carbon Fiber Composite", "Embedded AI SoC", "Multi-spectral Sensor Array"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/7/75/ScanEagle_on_SuperWedge_launcher.jpg"},
    {"name": "Sahara", "manufacturer": "Harmattan AI", "category": "aircraft", "product_type": "loitering_munition", "specifications": {"flight_type": "Fixed-wing delta", "max_speed": "180 km/h", "range": "60 km", "endurance": "45 min", "warhead": "3 kg shaped charge", "autonomy": "AI target acquisition — human-on-the-loop"}, "materials": ["Carbon Fiber Composite", "AI Targeting Processor", "Electro-optical Seeker"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/7/75/ScanEagle_on_SuperWedge_launcher.jpg"},
    {"name": "Sonora", "manufacturer": "Harmattan AI", "category": "aircraft", "product_type": "uav", "specifications": {"flight_type": "VTOL hybrid", "max_speed": "150 km/h", "range": "80 km", "endurance": "4 hours", "swarm_size": "Up to 64 units", "autonomy": "Collaborative AI — swarm coordination, GPS-denied"}, "materials": ["Reinforced Polymer Frame", "Distributed AI Network Processor", "Modular EO/EW Payload"], "status": "development", "image_url": "https://upload.wikimedia.org/wikipedia/commons/7/75/ScanEagle_on_SuperWedge_launcher.jpg"},

    # === Defense Tech — Milrem Robotics (Estonia) ===
    {"name": "THeMIS UGV", "manufacturer": "Milrem Robotics", "category": "land", "product_type": "ugv", "specifications": {"speed": "20 km/h", "payload": "750 kg", "endurance": "8 hours", "role": "Combat support / ISTAR / logistics"}, "materials": ["Steel/Aluminum Hybrid Frame", "Rubber Tracks", "Modular Mission Equipment"], "status": "active", "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/88/M1126_Stryker_ICV.jpg"},
    {"name": "Type-X RCV", "manufacturer": "Milrem Robotics", "category": "land", "product_type": "ugv", "specifications": {"weight": "12 tons", "speed": "72 km/h", "armament": "30mm autocannon optional", "role": "Robotic Combat Vehicle"}, "materials": ["Armored Steel", "Modular Composite Panels", "Autonomous Drive System"], "status": "development", "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/88/M1126_Stryker_ICV.jpg"},

]

# ── Company profile enrichments (Crunchbase-style) ────────────────────────
# Keyed by exact company name matching DEFENSE_COMPANIES entries.
# Fields: founded_year, headquarters, website, linkedin, funding_stage, is_public, description

COMPANY_ENRICHMENTS = {
    "Lockheed Martin": {
        "founded_year": 1995,
        "headquarters": "Bethesda, MD, USA",
        "website": "https://www.lockheedmartin.com",
        "linkedin": "https://www.linkedin.com/company/lockheed-martin",
        "funding_stage": "Public — NYSE: LMT",
        "is_public": True,
        "description": "World's largest defence contractor. Develops advanced technology systems, products and services for government and commercial customers globally. Key programmes: F-35 Lightning II, F-22 Raptor, C-130J Hercules, Aegis Combat System, THAAD.",
        "programs": ["F-35 Lightning II", "F-22 Raptor", "C-130J Hercules", "THAAD", "Aegis Combat System", "JASSM-ER", "PAC-3"],
        "export_countries": ["us", "gb", "au", "no", "nl", "it", "tr", "jp", "kr", "il", "ca", "be", "dk", "sg", "pl"],
    },
    "Raytheon Technologies": {
        "founded_year": 2020,
        "headquarters": "Arlington, VA, USA",
        "website": "https://www.rtx.com",
        "linkedin": "https://www.linkedin.com/company/rtx",
        "funding_stage": "Public — NYSE: RTX",
        "is_public": True,
        "description": "Formed by the 2020 merger of Raytheon Company and United Technologies Corporation. Four business segments: Collins Aerospace, Pratt & Whitney, Raytheon Intelligence & Space, and Raytheon Missiles & Defense. Key products: Patriot, AMRAAM, StormBreaker.",
        "programs": ["Patriot PAC-3", "AIM-120 AMRAAM", "F135 Engine (F-35)", "StormBreaker SDB II", "SPY-6 Radar", "Stinger MANPADS"],
        "export_countries": ["us", "gb", "de", "nl", "ae", "sa", "jp", "kr", "tw", "pl", "ro", "gr"],
    },
    "Northrop Grumman": {
        "founded_year": 1994,
        "headquarters": "Falls Church, VA, USA",
        "website": "https://www.northropgrumman.com",
        "linkedin": "https://www.linkedin.com/company/northrop-grumman",
        "funding_stage": "Public — NYSE: NOC",
        "is_public": True,
        "description": "Global aerospace and defence technology company. Delivers a broad portfolio of capabilities and technologies including autonomous systems, cyber, C4ISR, space, strike, and logistics. Key programmes: B-21 Raider, E-2D Hawkeye, James Webb Space Telescope.",
        "programs": ["B-21 Raider", "E-2D Hawkeye", "F-35 (Radar/EW)", "Ground-Based Strategic Deterrent", "GBSD", "Triton MQ-4C"],
        "export_countries": ["us", "au", "kr", "jp", "fr"],
    },
    "General Dynamics": {
        "founded_year": 1952,
        "headquarters": "Reston, VA, USA",
        "website": "https://www.gd.com",
        "linkedin": "https://www.linkedin.com/company/general-dynamics",
        "funding_stage": "Public — NYSE: GD",
        "is_public": True,
        "description": "Diversified defence and aerospace company with four business groups: Aerospace (Gulfstream), Marine Systems (Virginia-class submarines, DDG destroyers), Combat Systems (Abrams MBT, Stryker) and Technologies (IT/C4I).",
        "programs": ["Virginia-class SSN", "DDG-51 Arleigh Burke", "M1 Abrams MBT", "Stryker ICV", "Ajax (UK)"],
        "export_countries": ["us", "au", "ca", "gb", "sa", "ae", "eg", "kw", "ir"],
    },
    "Boeing Defense": {
        "founded_year": 1916,
        "headquarters": "Arlington, VA, USA",
        "website": "https://www.boeing.com/defense",
        "linkedin": "https://www.linkedin.com/company/boeing",
        "funding_stage": "Public — NYSE: BA",
        "is_public": True,
        "description": "Defence, space and security division of The Boeing Company. Programmes include the F/A-18 Super Hornet, P-8 Poseidon, KC-46 Tanker, AH-64 Apache, SLS launch vehicle and MQ-25 Stingray.",
        "programs": ["F/A-18 Super Hornet", "P-8 Poseidon", "KC-46 Pegasus", "AH-64E Apache", "MQ-25 Stingray", "T-7A Red Hawk"],
        "export_countries": ["us", "au", "in", "sa", "fi", "de", "ca", "sg", "kw", "qa"],
    },
    "L3Harris Technologies": {
        "founded_year": 2019,
        "headquarters": "Melbourne, FL, USA",
        "website": "https://www.l3harris.com",
        "linkedin": "https://www.linkedin.com/company/l3harris-technologies",
        "funding_stage": "Public — NYSE: LHX",
        "is_public": True,
        "description": "Defence technology company formed by the 2019 merger of L3 Technologies and Harris Corporation. Specialises in tactical radios, ISR systems, electronic warfare, space payloads and night-vision optics.",
        "programs": ["F-35 (EW Systems)", "JTRS (Tactical Radios)", "WESCAM MX Turrets", "Falcon Tactical Radios"],
        "export_countries": ["us", "gb", "au", "ca", "sa", "ae", "il"],
    },
    "BAE Systems": {
        "founded_year": 1999,
        "headquarters": "London, UK",
        "website": "https://www.baesystems.com",
        "linkedin": "https://www.linkedin.com/company/bae-systems",
        "funding_stage": "Public — LSE: BA.",
        "is_public": True,
        "description": "British multinational defence, security and aerospace company. Key products: Challenger 3 MBT, Type 26 frigate, Typhoon, F-35 (major subsystem supplier), M777 howitzer, Hawk trainer, Tempest (GCAP).",
        "programs": ["F-35 Lightning II (Aft Fuselage)", "Eurofighter Typhoon", "GCAP / Tempest", "Type 26 Frigate", "Challenger 3 MBT", "M777 Howitzer"],
        "export_countries": ["gb", "us", "au", "sa", "ca", "in", "om", "qa", "my", "it", "es"],
    },
    "Thales": {
        "founded_year": 2000,
        "headquarters": "Paris, France",
        "website": "https://www.thalesgroup.com",
        "linkedin": "https://www.linkedin.com/company/thales",
        "funding_stage": "Public — Euronext: HO",
        "is_public": True,
        "description": "French multinational covering defence electronics, aerospace, transportation and digital security. Key products: Ground Master radars, CONTACT tactical radio, TopSky ATM, Cinterion IoT, Watchkeeper UAV.",
        "programs": ["Rafale (Avionics / RBE2 Radar)", "SAMP/T Aster 30", "Ground Master Radar", "CONTACT Radio", "Scorpène (Combat System)", "Watchkeeper UAV"],
        "export_countries": ["fr", "au", "in", "sa", "ae", "qa", "sg", "br", "eg", "gr", "nl", "my"],
    },
    "Dassault Aviation": {
        "founded_year": 1929,
        "headquarters": "Saint-Cloud, France",
        "website": "https://www.dassault-aviation.com",
        "linkedin": "https://www.linkedin.com/company/dassault-aviation",
        "funding_stage": "Public — Euronext: AM",
        "is_public": True,
        "description": "French aerospace company producing military combat aircraft and Falcon business jets. Key programmes: Rafale (F3R/F4/F5 standards), Falcon 10X, nEUROn UCAV demonstrator, FCAS (Future Combat Air System) work-share with Airbus.",
        "programs": ["Rafale F3R / F4 / F5", "FCAS / NGF (Future Fighter)", "nEUROn UCAV"],
        "export_countries": ["fr", "eg", "in", "qa", "gr", "hr", "ae", "id", "sg"],
    },
    "Safran": {
        "founded_year": 2005,
        "headquarters": "Paris, France",
        "website": "https://www.safran-group.com",
        "linkedin": "https://www.linkedin.com/company/safran",
        "funding_stage": "Public — Euronext: SAF",
        "is_public": True,
        "description": "French high-technology group active in aerospace propulsion, equipment and defence. Key products: LEAP and CFM56 engines (via CFM International JV with GE), M88 Rafale engine, Ariane 6 propulsion, landing systems, nacelles, optronics and navigation.",
        "programs": ["M88 Engine (Rafale)", "Ariane 6 Propulsion", "LEAP Engine (A320neo / 737 MAX)", "Cougar / EC725 (Avionics)"],
        "export_countries": ["fr", "us", "gb", "de", "in", "cn", "br", "au", "ae", "sg"],
    },
    "Rheinmetall": {
        "founded_year": 1889,
        "headquarters": "Düsseldorf, Germany",
        "website": "https://www.rheinmetall.com",
        "linkedin": "https://www.linkedin.com/company/rheinmetall",
        "funding_stage": "Public — XETRA: RHM",
        "is_public": True,
        "description": "German defence and automotive company. Defence segment produces Lynx/Lynx KF41 IFV, Puma IFV, Boxer MRV, Skyranger 30 air defence, ammunition and propellants. Significant expansion through Rheinmetall Ukraine and Rheinmetall Landsysteme.",
        "programs": ["Lynx KF41 IFV", "Puma IFV", "Boxer MRAV", "Skyranger 30 SHORAD", "Leopard 2 (Ammunition)", "MGCS (Future Tank)"],
        "export_countries": ["de", "au", "gb", "hu", "sk", "lt", "ua", "gr", "it", "ro", "us"],
    },
    "Leonardo": {
        "founded_year": 2016,
        "headquarters": "Rome, Italy",
        "website": "https://www.leonardo.com",
        "linkedin": "https://www.linkedin.com/company/leonardo",
        "funding_stage": "Public — BIT: LDO",
        "is_public": True,
        "description": "Italian global aerospace, defence and security company (formerly Finmeccanica). Key products: AW139/AW101 helicopters, M-346 trainer, ATR regional aircraft (JV), EFA Typhoon work-share, AESA radars and EW systems.",
        "programs": ["Eurofighter Typhoon (Work-share)", "AW139 / AW101 Helicopters", "M-346 Master Trainer", "GCAP (Italy Pillar)", "PPA Frigate (Electronics)"],
        "export_countries": ["it", "gb", "us", "pl", "nz", "om", "qa", "in", "kw", "tr"],
    },
    "Airbus Defence & Space": {
        "founded_year": 2000,
        "headquarters": "Leiden, Netherlands",
        "website": "https://www.airbus.com/en/products-services/defence",
        "linkedin": "https://www.linkedin.com/company/airbus",
        "funding_stage": "Public — Euronext: AIR",
        "is_public": True,
        "description": "European multinational aerospace corporation. Defence & Space division: A400M tactical transport, Eurofighter Typhoon work-share, C295, Ariane launchers (via ArianeGroup), military satellites, cyber security. Also the world's largest commercial aircraft manufacturer.",
        "programs": ["Eurofighter Typhoon", "A400M Atlas", "C295 Transport", "Meteor Missile (Work-share)", "FCAS / NGF", "MRTT Tanker", "Ariane 6"],
        "export_countries": ["de", "es", "gb", "fr", "au", "sa", "qa", "sg", "tr", "ae", "my", "th", "co"],
    },
    "Anduril Industries": {
        "founded_year": 2017,
        "headquarters": "Costa Mesa, CA, USA",
        "website": "https://www.anduril.com",
        "linkedin": "https://www.linkedin.com/company/anduril-industries",
        "funding_stage": "Private — Series F",
        "is_public": False,
        "description": "US defence technology company focused on AI-driven autonomous systems. Products: Lattice AI operating system, Ghost sUAS, Roadrunner interceptor, Fury UCAV, Dive-LD underwater vehicle, Pulsar EW. Backed by Andreessen Horowitz, 8VC.",
        "programs": ["Lattice AI Platform", "Ghost Sentry UAS", "Roadrunner-M Interceptor", "Fury UCAV", "IVAS (HoloLens — subcontractor)"],
        "export_countries": ["us", "au", "gb"],
    },
    "Palantir Technologies": {
        "founded_year": 2003,
        "headquarters": "Denver, CO, USA",
        "website": "https://www.palantir.com",
        "linkedin": "https://www.linkedin.com/company/palantir-technologies",
        "funding_stage": "Public — NYSE: PLTR",
        "is_public": True,
        "description": "Data analytics and AI software company. Defence products: DCGS-A (Distributed Common Ground System), Maven Smart System (formerly Project Maven), Gotham intelligence platform, MetaConstellation space domain awareness.",
        "programs": ["Maven Smart System (AI Targeting)", "Gotham Intelligence Platform", "DCGS-A", "MetaConstellation"],
        "export_countries": ["us", "gb", "de", "fr", "jp", "au", "ua"],
    },
    "Hanwha Ocean": {
        "founded_year": 2023,
        "headquarters": "Seoul, South Korea",
        "website": "https://www.hanwhaocean.com",
        "linkedin": "https://www.linkedin.com/company/hanwha-ocean",
        "funding_stage": "Public — KRX: 042660",
        "is_public": True,
        "description": "South Korean shipbuilder (formerly DSME, acquired by Hanwha Group in 2023). Builds KSS-III Batch II submarines, Sejong the Great-class destroyers (KDX-III), and LNG carriers. Major supplier to the Republic of Korea Navy.",
        "programs": ["KSS-III Batch II Submarine", "KDX-III Destroyer", "LNG Carrier"],
        "export_countries": ["kr", "au"],
    },
    "Leidos Holdings": {
        "founded_year": 2013,
        "headquarters": "Reston, VA, USA",
        "website": "https://www.leidos.com",
        "linkedin": "https://www.linkedin.com/company/leidos",
        "funding_stage": "Public — NYSE: LDOS",
        "is_public": True,
        "description": "US defence, aviation, information technology and biomedical research company. Key contracts: DHMSM electronic health records (MHS GENESIS), FBI Next Generation Cyber Initiative, TSA checkpoint screening.",
        "programs": ["MHS GENESIS (Electronic Health Records)", "NGEN-R IT Infrastructure", "TSA Screening"],
        "export_countries": ["us", "au", "gb", "ca"],
    },
    "Kratos Defense": {
        "founded_year": 1994,
        "headquarters": "San Diego, CA, USA",
        "website": "https://www.kratosdefense.com",
        "linkedin": "https://www.linkedin.com/company/kratos-defense-security-solutions",
        "funding_stage": "Public — NASDAQ: KTOS",
        "is_public": True,
        "description": "Specialises in unmanned systems, satellite ground systems and microwave electronics. Key products: UTAP-22 Mako and XQ-58A Valkyrie loyal wingman drones (developed on contract), BQM-167 aerial targets, SpectralNet electronic warfare.",
        "programs": ["XQ-58A Valkyrie UCAV", "BQM-167 Aerial Target", "UTAP-22 Mako Loyal Wingman"],
        "export_countries": ["us", "au"],
    },
    "MBDA": {
        "founded_year": 2001,
        "headquarters": "Le Plessis-Robinson, France",
        "website": "https://www.mbda-systems.com",
        "linkedin": "https://www.linkedin.com/company/mbda",
        "funding_stage": "Private — JV (Airbus 37.5%, BAE 37.5%, Leonardo 25%)",
        "is_public": False,
        "description": "Europe's largest missile systems house. Products: Meteor BVR missile, Aster 15/30 (SAMP/T, PAAMS), Brimstone precision strike, SCALP/Storm Shadow cruise missile, CAMM/Sky Sabre, Exocet anti-ship, SPEAR-3.",
        "programs": ["Meteor BVR Missile", "Aster 15/30 (SAMP/T, PAAMS)", "SCALP / Storm Shadow", "Brimstone", "CAMM / Sky Sabre", "Exocet", "SPEAR-3"],
        "export_countries": ["gb", "fr", "it", "de", "es", "sa", "ae", "in", "sg", "se", "fi", "gr", "qa"],
    },
    "Naval Group": {
        "founded_year": 2017,
        "headquarters": "Paris, France",
        "website": "https://www.naval-group.com",
        "linkedin": "https://www.linkedin.com/company/naval-group",
        "funding_stage": "Private — State-owned (French MoD 62.5%, Thales 35%)",
        "is_public": False,
        "description": "French naval defence company (formerly DCNS). Designs and builds Suffren-class (Barracuda) nuclear attack submarines, Scorpène conventional submarines, FREMM frigates and Charles de Gaulle carrier refit.",
        "programs": ["Barracuda / Suffren-class SSN", "Scorpène Submarine", "FDI Frigate (Amiral Ronarc'h)", "FREMM Frigate"],
        "export_countries": ["fr", "au", "in", "br", "cl", "ma", "gr"],
    },
    "Saab AB": {
        "founded_year": 1937,
        "headquarters": "Linköping, Sweden",
        "website": "https://www.saabgroup.com",
        "linkedin": "https://www.linkedin.com/company/saab-ab",
        "funding_stage": "Public — Nasdaq Stockholm: SAAB B",
        "is_public": True,
        "description": "Swedish defence and security company. Key products: Gripen fighter (JAS 39), GlobalEye AEW&C, Carl-Gustaf recoilless rifle, AT4 anti-tank, RBS 70 MANPADS, T7A trainer (with Boeing), Erieye AESA radar.",
        "programs": ["JAS 39 Gripen E/F", "GlobalEye AEW&C", "T-7A Red Hawk (with Boeing)", "Carl-Gustaf M4", "RBS 70 MANPADS"],
        "export_countries": ["se", "br", "hu", "cz", "za", "us", "bg", "th", "ch"],
    },
    "Saab": {
        "founded_year": 1937,
        "headquarters": "Linköping, Sweden",
        "website": "https://www.saabgroup.com",
        "linkedin": "https://www.linkedin.com/company/saab-ab",
        "funding_stage": "Public — Nasdaq Stockholm: SAAB B",
        "is_public": True,
        "description": "Swedish defence and security company. Key products: Gripen fighter (JAS 39), GlobalEye AEW&C, Carl-Gustaf recoilless rifle, AT4 anti-tank, RBS 70 MANPADS, T7A trainer (with Boeing), Erieye AESA radar.",
        "programs": ["JAS 39 Gripen E/F", "GlobalEye AEW&C", "T-7A Red Hawk (with Boeing)", "Carl-Gustaf M4", "RBS 70 MANPADS"],
        "export_countries": ["se", "br", "hu", "cz", "za", "us", "bg", "th", "ch"],
    },
    "Elbit Systems": {
        "founded_year": 1966,
        "headquarters": "Haifa, Israel",
        "website": "https://www.elbitsystems.com",
        "linkedin": "https://www.linkedin.com/company/elbit-systems",
        "funding_stage": "Public — NASDAQ: ESLT",
        "is_public": True,
        "description": "Israeli defence electronics company. Products: Hermes 900/450 UAS, TORCH-X C2 system, Spyder PGK, DIRCM (Directional Infrared Countermeasures), passive night-vision, IronVision helmet display for Merkava tank crews.",
        "programs": ["Hermes 900 / 450 UAS", "IronVision Helmet Display", "DIRCM (Aircraft Self-Protection)", "TORCH-X C2 Platform"],
        "export_countries": ["il", "us", "br", "in", "az", "ky", "gb", "de", "au", "sg"],
    },
    "Huntington Ingalls": {
        "founded_year": 2011,
        "headquarters": "Newport News, VA, USA",
        "website": "https://www.hii.com",
        "linkedin": "https://www.linkedin.com/company/huntington-ingalls-industries",
        "funding_stage": "Public — NYSE: HII",
        "is_public": True,
        "description": "America's largest military shipbuilder. Builds Gerald R. Ford-class and Nimitz-class aircraft carriers, Virginia-class submarines and DDG-51 Arleigh Burke destroyers through Newport News Shipbuilding and Ingalls Shipbuilding divisions.",
        "programs": ["Gerald R. Ford-class CVN", "Virginia-class SSN", "DDG-51 Arleigh Burke", "LHA-6 America-class"],
        "export_countries": ["us"],
    },
    "Kongsberg Defence": {
        "founded_year": 1814,
        "headquarters": "Kongsberg, Norway",
        "website": "https://www.kongsberg.com/kda",
        "linkedin": "https://www.linkedin.com/company/kongsberg-gruppen",
        "funding_stage": "Public — Oslo Børs: KOG",
        "is_public": True,
        "description": "Norwegian defence and maritime technology company. Known for Naval Strike Missile, Joint Strike Missile (for F-35), NASAMS air defence system and Remote Weapon Stations.",
        "programs": ["Naval Strike Missile (NSM)", "Joint Strike Missile (JSM / F-35)", "NASAMS Air Defence", "Protector RWS"],
        "export_countries": ["no", "us", "pl", "au", "fi", "lt", "es", "nl", "de", "qa"],
    },
    "Rafael Advanced Defense": {
        "founded_year": 1948,
        "headquarters": "Haifa, Israel",
        "website": "https://www.rafael.co.il",
        "linkedin": "https://www.linkedin.com/company/rafael-advanced-defense-systems",
        "funding_stage": "Private — State-owned",
        "is_public": False,
        "description": "Israeli state-owned defence company. World-leading missile and air-defence systems. Key products: Iron Dome, David's Sling, Arrow 3 (co-dev Boeing), Trophy APS, Python-5, Spike ATGM, Spice glide bombs.",
        "programs": ["Iron Dome SHORAD", "David's Sling (Arrow 2 Layer)", "Arrow 3 (with Boeing)", "Trophy APS (Merkava)", "Spike ATGM", "Spice Glide Bombs"],
        "export_countries": ["il", "us", "de", "in", "sg", "cy", "az", "ch", "nl"],
    },
    "Embraer Defense": {
        "founded_year": 1969,
        "headquarters": "São José dos Campos, Brazil",
        "website": "https://www.embraer.com/global/en/defense",
        "linkedin": "https://www.linkedin.com/company/embraer",
        "funding_stage": "Public — NYSE: ERJ",
        "is_public": True,
        "description": "Defence & Security division of Brazilian aerospace company Embraer. Key product: KC-390 Millennium tactical airlifter. Also produces A-29 Super Tucano light attack aircraft and Phenom/Legacy military VIP aircraft.",
        "programs": ["KC-390 Millennium (Airlifter)", "A-29 Super Tucano", "C-390 Evaluation (NATO)"],
        "export_countries": ["br", "pt", "nl", "au", "at", "cz", "hu", "ke"],
    },
    "Korea Aerospace Industries": {
        "founded_year": 1999,
        "headquarters": "Sacheon, South Korea",
        "website": "https://www.koreaaero.com",
        "linkedin": "https://www.linkedin.com/company/korea-aerospace-industries",
        "funding_stage": "Public — KRX: 047810",
        "is_public": True,
        "description": "South Korean aerospace and defence company. Develops KF-21 Boramae 4.5-gen fighter, FA-50 light combat aircraft, Surion helicopter and T-50 trainer. Strong export momentum in South-East Asia and Eastern Europe.",
        "programs": ["KF-21 Boramae Fighter", "FA-50 Light Combat Aircraft", "T-50 Golden Eagle Trainer", "Surion Helicopter"],
        "export_countries": ["kr", "ph", "pl", "sl", "th", "id"],
    },
    "Hanwha Defense": {
        "founded_year": 1952,
        "headquarters": "Seoul, South Korea",
        "website": "https://www.hanwha.com/en/business/defense",
        "linkedin": "https://www.linkedin.com/company/hanwha-defense",
        "funding_stage": "Private — Hanwha Group subsidiary",
        "is_public": False,
        "description": "Land systems and artillery arm of Hanwha Group. Produces K9 Thunder self-propelled howitzer, K21 IFV, AS21 Redback IFV (Australia bid), Chunmoo MLRS. Aggressively expanding into European and Indo-Pacific markets.",
        "programs": ["K9 Thunder SPH", "K21 IFV", "AS21 Redback IFV (Australia)", "Chunmoo MLRS"],
        "export_countries": ["kr", "au", "fi", "in", "eg", "no", "pl", "ee", "ro"],
    },
    "Baykar": {
        "founded_year": 2007,
        "headquarters": "Istanbul, Turkey",
        "website": "https://www.baykartech.com",
        "linkedin": "https://www.linkedin.com/company/baykar",
        "funding_stage": "Private",
        "is_public": False,
        "description": "Turkish UAV manufacturer behind the globally exported Bayraktar TB2 and TB3 drones. Also developing Akinci UCAV and Kizilelma jet-powered combat drone. Became internationally prominent during conflicts in Ukraine and Nagorno-Karabakh.",
        "programs": ["Bayraktar TB2", "Bayraktar Akinci UCAV", "Bayraktar TB3 (Carrier-based)", "Kizilelma (Jet UCAV)"],
        "export_countries": ["tr", "ua", "az", "pk", "ma", "so", "et", "dj", "kw", "ug", "ng", "bf"],
    },
    "Hensoldt": {
        "founded_year": 2017,
        "headquarters": "Taufkirchen, Germany",
        "website": "https://www.hensoldt.net",
        "linkedin": "https://www.linkedin.com/company/hensoldt",
        "funding_stage": "Public — XETRA: HAG",
        "is_public": True,
        "description": "German sensor solutions provider for defence and security. Products include TRML-4D SHORAD radar, Twinvis passive radar, ESR 300 missile approach warning, KALAETHOS EW suite and optronics for Eurofighter.",
        "programs": ["Eurofighter (CAPTOR-E Radar)", "TRML-4D SHORAD Radar", "Twinvis Passive Radar", "ESR 300 (F-35 EW — via Eurofighter)", "Pegasus SIGINT"],
        "export_countries": ["de", "gb", "es", "it", "au", "sa", "om", "gr"],
    },
    "Fincantieri": {
        "founded_year": 1959,
        "headquarters": "Trieste, Italy",
        "website": "https://www.fincantieri.com",
        "linkedin": "https://www.linkedin.com/company/fincantieri",
        "funding_stage": "Public — BIT: FCT",
        "is_public": True,
        "description": "Italian shipbuilding company, one of the world's largest. Naval division builds FREMM frigates, PPA patrol vessels, LHD amphibious ships and submarines. Commercial division builds cruise ships and ferries.",
        "programs": ["PPA Multipurpose Patrol Vessel", "FREMM Frigate (Italy)", "LHD Trieste", "SSP Submarine (Upcoming)"],
        "export_countries": ["it", "us", "qa", "eg", "ng"],
    },
    "Helsing": {
        "founded_year": 2021,
        "headquarters": "Munich, Germany",
        "website": "https://www.helsing.ai",
        "linkedin": "https://www.linkedin.com/company/helsing",
        "funding_stage": "Private — Series B (€450M, 2023, €3.4B valuation)",
        "is_public": False,
        "description": "European AI-for-defence company headquartered in Munich with offices in London. Develops AI software for fighter aircraft (SG-1 Foresight sensor fusion for Eurofighter Typhoon / Rafale), autonomous drones (HX-2), and electronic warfare (EW-Inferenz AI platform). Series B co-invested by L3Harris as strategic partner.",
        "programs": ["SG-1 Foresight (Typhoon / Rafale AI)", "HX-2 Autonomous Drone", "EW-Inferenz AI EW Platform"],
        "export_countries": ["de", "gb", "fr"],
    },
    "Harmattan AI": {
        "founded_year": 2021,
        "headquarters": "Paris, France",
        "website": "https://www.harmattan.ai",
        "linkedin": "https://www.linkedin.com/company/harmattan-ai",
        "funding_stage": "Private — Series B ($200M, 2024)",
        "is_public": False,
        "description": "French defence AI startup specialising in AI-assisted command-and-control decision support. Develops AI-driven mission planning, real-time battlespace analysis, and autonomous drone C2 software. Raised $200M Series B with Dassault Aviation as strategic participant, accelerating integration into the Rafale F5 standard and FCAS programme.",
        "programs": ["Harmattan Layered Air Defense", "Harmattan EW Suite", "Harmattan C2 Platform"],
        "export_countries": ["fr", "ae", "sa"],
    },
    "Exail Technologies": {
        "founded_year": 2022,
        "headquarters": "Saint-Germain-en-Laye, France",
        "website": "https://www.exail.com",
        "linkedin": "https://www.linkedin.com/company/exail-technologies",
        "funding_stage": "Private (Tikehau Capital)",
        "is_public": False,
        "description": "French naval autonomy and precision navigation company formed in 2022 by merger of iXBlue and ECA Group. Develops autonomous underwater (AUV/UUV) and surface vehicles (USV), fiber-optic inertial navigation systems, mine-clearance robots, and military simulators. Serves NATO navies and the DGA.",
        "programs": ["DG100 Autonomous USV", "IDEFX AUV", "iXBLUE Phins INS", "ECA Group Inspection ROVs"],
        "export_countries": ["fr", "gb", "de", "no", "nl", "au"],
    },
    "Quantum Systems": {
        "founded_year": 2015,
        "headquarters": "Munich, Germany",
        "website": "https://www.quantum-systems.com",
        "linkedin": "https://www.linkedin.com/company/quantum-systems-gmbh",
        "funding_stage": "Private — Series B (~€75M)",
        "is_public": False,
        "description": "German developer of electric VTOL fixed-wing UAV systems for military and commercial ISR missions. Products include the Trinity F90+ (fixed-wing VTOL, 90-minute endurance) and Vector (quadrotor). Used by Bundeswehr and NATO forces for reconnaissance in GPS-denied environments.",
        "programs": ["Trinity F90+ VTOL UAV", "Vector Quadrotor UAV"],
        "export_countries": ["de", "gb", "fr", "au", "us"],
    },
    "Teledyne Technologies": {
        "founded_year": 1960,
        "headquarters": "Thousand Oaks, CA, USA",
        "website": "https://www.teledyne.com",
        "linkedin": "https://www.linkedin.com/company/teledyne-technologies",
        "funding_stage": "Public — NYSE: TDY",
        "is_public": True,
        "description": "Diversified US technology company providing instrumentation, digital imaging products, aerospace and defence electronics, and engineered systems. Acquired FLIR Systems in 2021 for $8B, adding the world's leading thermal imaging and sensor technology portfolio widely used in military applications.",
        "programs": ["FLIR Thermal Imaging", "Teledyne LeCroy", "Marine Instruments", "Defense Electronics"],
        "export_countries": ["us", "gb", "de", "fr", "au", "ca", "il", "kr", "jp"],
    },
    "SERCO Group": {
        "founded_year": 1929,
        "headquarters": "Hook, Hampshire, UK",
        "website": "https://www.serco.com",
        "linkedin": "https://www.linkedin.com/company/serco-group",
        "funding_stage": "Public — LSE: SRP",
        "is_public": True,
        "description": "International public services company with major defence contracts for the UK MoD and NATO allies. Provides aircraft and vehicle maintenance, logistics, training and simulation, nuclear services, and managed services. Key defence contracts include Ascent (UK fast jet training) and Army Foundation College.",
        "programs": ["Ascent UK Fast Jet Training", "Army Foundation College", "Nuclear Decommissioning Services"],
        "export_countries": ["gb", "us", "au", "ca", "ae", "de"],
    },
    "Milrem Robotics": {
        "founded_year": 2013,
        "headquarters": "Tallinn, Estonia",
        "website": "https://milremrobotics.com",
        "linkedin": "https://www.linkedin.com/company/milrem-robotics",
        "funding_stage": "Private (Airbus minority stake)",
        "is_public": False,
        "description": "Estonian pioneer in autonomous ground vehicles (UGV) and developer of the THeMIS combat support UGV platform deployed by multiple NATO armies. Also developing the Type-X robotic combat vehicle. Participates in the EU-funded iMUGS programme. Airbus holds a minority equity stake.",
        "programs": ["THeMIS UGV", "Type-X RCV", "iMUGS (EU)"],
        "export_countries": ["ee", "de", "fr", "nl", "be", "gb", "fi", "lt", "lv"],
    },
    "Terma A/S": {
        "founded_year": 1949,
        "headquarters": "Lystrup, Denmark",
        "website": "https://www.terma.com",
        "linkedin": "https://www.linkedin.com/company/terma-as",
        "funding_stage": "Private",
        "is_public": False,
        "description": "Danish defence electronics company specialising in C2 systems, electronic warfare, radar, and space instruments. Designs and manufactures chaff/flare dispensers for F-16 and F-35, missile defence radar systems, and space satellite components. Long-standing supplier to NATO air forces and navies.",
        "programs": ["AN/ALE-47 Countermeasures Dispenser", "C2 Suite", "Space Instruments"],
        "export_countries": ["dk", "us", "no", "nl", "be", "pl", "gr"],
    },
    "Dynamit Nobel Defence": {
        "founded_year": 1865,
        "headquarters": "Burbach, Germany",
        "website": "https://www.dnd.de",
        "linkedin": "https://www.linkedin.com/company/dynamit-nobel-defence",
        "funding_stage": "Private (part of KNDS group)",
        "is_public": False,
        "description": "German manufacturer of high-performance warheads, propulsion systems, and ammunition for guided missiles, anti-tank weapons, and naval torpedoes. Key supplier for NATO missile programmes including the PANZERFAUST 3, RGW 90 (Matador), and components for missile systems produced by MBDA and Saab.",
        "programs": ["PANZERFAUST 3 Warhead", "RGW 90 Matador", "Torpedo Warheads"],
        "export_countries": ["de", "gb", "fr", "no", "se", "it", "es"],
    },
    "Theon Sensors": {
        "founded_year": 1997,
        "headquarters": "Athens, Greece",
        "website": "https://www.theonsensors.com",
        "linkedin": "https://www.linkedin.com/company/theon-sensors",
        "funding_stage": "Private",
        "is_public": False,
        "description": "Greek manufacturer of night vision and thermal imaging products for military and law enforcement. Produces image intensifier tubes, thermal weapon sights, clip-on night vision, and night vision goggles qualified and supplied to NATO armed forces. One of few European manufacturers of Gen 3 image intensifier technology.",
        "programs": ["KATARA Thermal Sight", "NOCTUA Night Vision Goggles", "CORVUS Clip-on"],
        "export_countries": ["gr", "us", "gb", "de", "fr", "pl", "ro", "il"],
    },
    "PZL Mielec": {
        "founded_year": 1938,
        "headquarters": "Mielec, Poland",
        "website": "https://www.pzl.mielec.pl",
        "linkedin": "https://www.linkedin.com/company/pzl-mielec",
        "funding_stage": "Private (Sikorsky / Lockheed Martin subsidiary)",
        "is_public": False,
        "description": "Polish aviation company producing AW149 military helicopters under license and providing maintenance, repair and overhaul (MRO) services. Subsidiary of Sikorsky (Lockheed Martin). Central to Poland's military modernization programme with deliveries of Black Hawk variants to the Polish Armed Forces.",
        "programs": ["AW149 Military Helicopter", "S-70i Black Hawk", "M28 SKYTRUCK"],
        "export_countries": ["pl", "us", "sa", "ng", "gh"],
    },
    "Shield AI": {
        "founded_year": 2015,
        "headquarters": "San Diego, CA, USA",
        "website": "https://www.shield.ai",
        "linkedin": "https://www.linkedin.com/company/shield-ai",
        "funding_stage": "Private — Series F ($2.7B valuation, 2023)",
        "is_public": False,
        "description": "US defence AI company building autonomous pilot software for GPS/comms-denied environments. Hivemind AI Pilot has flown F-16s and defeated human pilots in dogfighting simulations. Acquired Heron Systems and Martin UAV (V-BAT VTOL drone). Backed by Andreessen Horowitz and Point72.",
        "programs": ["Hivemind AI Pilot", "V-BAT VTOL UAV", "VAULT25 (F-16 Autonomous Wingman)"],
        "export_countries": ["us", "au"],
    },
    # ── USA Startups ────────────────────────────────────────────────────────
    "Skydio": {
        "founded_year": 2014,
        "headquarters": "San Mateo, CA, USA",
        "website": "https://www.skydio.com",
        "linkedin": "https://www.linkedin.com/company/skydio",
        "funding_stage": "Private — Series E ($230M, valuation $2.2B, 2022)",
        "is_public": False,
        "description": "American drone manufacturer specialising in AI-powered autonomous flight. Pivoted to defence and public sector after 2020, offering NDAA-compliant platforms with no Chinese components. Supplies the US Army Short Range Reconnaissance (SRR) programme and allied governments. Leading US-made autonomous drone brand for tactical ISR.",
        "programs": ["X2D (US Army SRR)", "X10D (Government ISR)", "R1 Dock (Infrastructure)"],
        "export_countries": ["us", "ua", "gb", "au"],
    },
    "Hermeus": {
        "founded_year": 2018,
        "headquarters": "Atlanta, GA, USA",
        "website": "https://www.hermeus.com",
        "linkedin": "https://www.linkedin.com/company/hermeus",
        "funding_stage": "Private — Series C ($350M, General Catalyst lead, 2024)",
        "is_public": False,
        "description": "US defence technology company developing Mach 5+ autonomous and crewed hypersonic aircraft for national security and commercial missions. Quarterhorse unmanned demonstrator flies on USAF AFWERX contracts. The Halcyon programme targets autonomous hypersonic strike. Backed by General Catalyst, Khosla Ventures and USAF AFWERX.",
        "programs": ["Quarterhorse (USAF demonstrator)", "Halcyon (autonomous hypersonic strike)", "Darkhorse (classified)"],
        "export_countries": ["us"],
    },
    "Joby Aviation": {
        "founded_year": 2009,
        "headquarters": "Santa Cruz, CA, USA",
        "website": "https://www.jobyaviation.com",
        "linkedin": "https://www.linkedin.com/company/joby-aviation",
        "funding_stage": "Public — NYSE: JOBY",
        "is_public": True,
        "description": "US electric vertical take-off and landing (eVTOL) company with a $131M USAF Agility Prime contract to develop air mobility solutions for special operations and logistics. The Joby S4 aircraft targets both urban air mobility and military utility missions.",
        "programs": ["S4 eVTOL (USAF Agility Prime)", "SOCOM Mobility Studies"],
        "export_countries": ["us"],
    },
    # ── France Startups ─────────────────────────────────────────────────────
    "Shark Robotics": {
        "founded_year": 2017,
        "headquarters": "La Rochelle, France",
        "website": "https://www.shark-robotics.com",
        "linkedin": "https://www.linkedin.com/company/shark-robotics",
        "funding_stage": "Private — Series A (€15M, 2022)",
        "is_public": False,
        "description": "French manufacturer of multi-mission unmanned ground vehicles (UGVs) for defence, civil security and industry. The Colossus UGV has been deployed by French fire brigades and tested by the French Army (Section d'Aide à la Projection / SAPO) and Ukrainian forces. Shark Robotics partnered with Ukrainian UGV maker Tencore in April 2026 for joint NATO market development.",
        "programs": ["Colossus Multi-Mission UGV", "CAIMAN Tactical UGV", "RHINO (Counter-IED)"],
        "export_countries": ["fr", "ua", "be", "de", "nl"],
    },
    "Preligens": {
        "founded_year": 2016,
        "headquarters": "Paris, France",
        "website": "https://www.preligens.com",
        "linkedin": "https://www.linkedin.com/company/preligens",
        "funding_stage": "Acquired by Safran (2023, ~€170M)",
        "is_public": False,
        "description": "French AI startup specialising in automatic analysis of satellite and aerial imagery for intelligence (GEOINT). Its AI platform detects and tracks military assets, equipment changes and activity patterns from very high resolution satellite data. Acquired by Safran in 2023 to strengthen its optronics and intelligence division. Clients include DGA, French armed forces and NATO allies.",
        "programs": ["LYNX GEOINT Platform", "Satellite Change Detection", "Military Equipment Recognition"],
        "export_countries": ["fr", "gb", "de", "ae"],
    },
    "Basecamp Research": {
        "founded_year": 2019,
        "headquarters": "London, UK",
        "website": "https://www.basecamp-research.com",
        "linkedin": "https://www.linkedin.com/company/basecamp-research",
        "funding_stage": "Private — Series B ($60M, 2023)",
        "is_public": False,
        "description": "UK-based biotech and biosecurity company building the world's largest database of non-redundant protein sequences from global biodiversity. Its AI platform is used to discover novel enzymes, materials and biodefence solutions. DSTL (UK Defence Science and Technology Laboratory) has funded research into bio-threat detection applications.",
        "programs": ["BaseFold Protein AI", "Biosecurity Research (DSTL)", "Novel Enzyme Discovery"],
        "export_countries": ["gb", "us"],
    },
    # ── UK Startups ─────────────────────────────────────────────────────────
    "Roke Manor Research": {
        "founded_year": 1956,
        "headquarters": "Romsey, Hampshire, UK",
        "website": "https://www.roke.co.uk",
        "linkedin": "https://www.linkedin.com/company/roke",
        "funding_stage": "Private (Chemring subsidiary)",
        "is_public": False,
        "description": "UK deep-technology defence and intelligence company, subsidiary of Chemring Group. Specialises in SIGINT, cyber, electronic warfare, autonomous systems and data analytics for the UK MoD and intelligence community. Develops the RESOLVE signals intelligence platform and AI-powered sensor fusion tools for the British Army.",
        "programs": ["RESOLVE SIGINT Platform", "Startle Counter-UAS", "Electronic Warfare AI"],
        "export_countries": ["gb", "us", "au"],
    },
    "Reaction Engines": {
        "founded_year": 1989,
        "headquarters": "Abingdon, UK",
        "website": "https://www.reactionengines.co.uk",
        "linkedin": "https://www.linkedin.com/company/reaction-engines-limited",
        "funding_stage": "Private (BAE Systems 20%, Rolls-Royce, UKRI)",
        "is_public": False,
        "description": "UK aerospace company developing the SABRE (Synergetic Air-Breathing Rocket Engine) — a hybrid air-breathing/rocket engine capable of Mach 5 in atmosphere and orbital insertion. Supported by UK Space Agency, UKRI and ESA. BAE Systems holds a 20% equity stake. Potential applications include hypersonic strike, responsive launch and space access vehicles.",
        "programs": ["SABRE Engine (Mach 5 hybrid propulsion)", "LAPCAT Hypersonic Aircraft Study"],
        "export_countries": ["gb", "us"],
    },
    "Blue Bear Systems": {
        "founded_year": 2007,
        "headquarters": "Bedford, UK",
        "website": "https://www.bluebear.aero",
        "linkedin": "https://www.linkedin.com/company/blue-bear-systems-research",
        "funding_stage": "Private (Inzpire / Cohort subsidiary)",
        "is_public": False,
        "description": "UK autonomous systems company specialising in fixed-wing VTOL UAVs, swarm intelligence and AI autonomy software for defence. Subsidiary of Inzpire (Cohort plc). Develops the iSTARE swarm reconnaissance system and has won DSTL contracts for autonomous multi-UAV teaming. Participated in UK MOD Project CAELUS for air mobility.",
        "programs": ["iSTARE Swarm UAV", "Project CAELUS (UK Air Mobility)", "Autonomous Teaming (DSTL)"],
        "export_countries": ["gb", "us", "au"],
    },
    # ── Germany Startups ────────────────────────────────────────────────────
    "Dedrone": {
        "founded_year": 2014,
        "headquarters": "San Francisco, CA, USA (German origin)",
        "website": "https://www.dedrone.com",
        "linkedin": "https://www.linkedin.com/company/dedrone",
        "funding_stage": "Acquired by Axon Enterprise (2024, $58M)",
        "is_public": False,
        "description": "German-origin counter-drone (C-UAS) company founded in Kassel, Germany, relocated to the US. Provides AI-powered drone detection, tracking and mitigation software for military bases, critical infrastructure and prisons. Acquired by Axon Enterprise in 2024. Deployed by the US Army, NATO and at major international airports.",
        "programs": ["DroneTracker Software", "C-UAS for US Army", "Critical Infrastructure Protection"],
        "export_countries": ["de", "us", "gb", "au", "il"],
    },
    # ── Israel Startups ─────────────────────────────────────────────────────
    "Orca AI": {
        "founded_year": 2018,
        "headquarters": "Tel Aviv, Israel",
        "website": "https://www.orca-ai.io",
        "linkedin": "https://www.linkedin.com/company/orca-ai",
        "funding_stage": "Private — Series B ($23M, 2022)",
        "is_public": False,
        "description": "Israeli AI startup providing autonomous navigation and situational awareness for naval vessels. Uses AI-powered computer vision and sensor fusion to detect and classify maritime threats and obstacles. Partners with navies and coast guards globally. The Israeli Navy and commercial shipping companies use Orca AI for collision avoidance and maritime surveillance.",
        "programs": ["Naval Autonomy Platform", "Maritime Threat Detection", "Autonomous Navigation AI"],
        "export_countries": ["il", "us", "gb", "sg"],
    },
    "Ariel AI": {
        "founded_year": 2017,
        "headquarters": "Haifa, Israel",
        "website": "https://www.arielai.com",
        "linkedin": "https://www.linkedin.com/company/ariel-ai",
        "funding_stage": "Private — Series A",
        "is_public": False,
        "description": "Israeli startup specialising in real-time 3D human body tracking and pose estimation using AI. Technology is applicable to soldier performance monitoring, training simulations and wearable sensor integration for military applications. Acquired by Apple in 2021 but retained defence-oriented spin-off activities.",
        "programs": ["3D Pose Estimation", "Soldier Performance Monitoring", "Training Simulation AI"],
        "export_countries": ["il", "us"],
    },
    # ── Ukraine Startups ────────────────────────────────────────────────────
    "UkrSpecSystems": {
        "founded_year": 2014,
        "headquarters": "Kyiv, Ukraine",
        "website": "https://ukrspecsystems.com",
        "linkedin": "https://www.linkedin.com/company/ukrspecsystems",
        "funding_stage": "Private (State-backed / VC-mixed)",
        "is_public": False,
        "description": "Ukrainian developer of long-range fixed-wing reconnaissance UAVs. The PD-2 (aka Leleka-100) is a MALE-class drone with 15+ hours endurance, operational with the Ukrainian Armed Forces since 2014. Used for artillery correction, battlefield surveillance and SIGINT gathering. Exported to multiple NATO partners post-2022.",
        "programs": ["PD-2 / Leleka-100 MALE UAV", "RAM II Reconnaissance UAV", "Leleka-100M (upgraded)"],
        "export_countries": ["ua", "lt", "lv", "ee", "pl"],
    },
    "Skyeton": {
        "founded_year": 2016,
        "headquarters": "Kyiv, Ukraine",
        "website": "https://skyeton.com",
        "linkedin": "https://www.linkedin.com/company/skyeton",
        "funding_stage": "Private",
        "is_public": False,
        "description": "Ukrainian manufacturer of long-endurance fixed-wing UAVs for surveillance, reconnaissance and strike applications. The Raybird-3 can fly over 20 hours at up to 120 km/h, used extensively for ISR missions by Ukrainian forces against Russian targets. Increasingly adapted for loitering munition roles and exported to Baltic NATO states.",
        "programs": ["Raybird-3 Long-Endurance UAV", "Raybird Strike Variant", "Multi-spectral ISR Payload"],
        "export_countries": ["ua", "lt", "ee", "pl"],
    },
    "Kvertus": {
        "founded_year": 2016,
        "headquarters": "Ivano-Frankivsk, Ukraine",
        "website": "https://kvertus.com",
        "linkedin": "https://www.linkedin.com/company/kvertus",
        "funding_stage": "Private",
        "is_public": False,
        "description": "Ukrainian electronic warfare startup specialising in drone detection, jamming and counter-UAS systems. Products include portable drone jammers, vehicle-mounted EW systems and automated detection grids widely deployed along the Ukrainian front line. Kvertus systems are credited with defeating thousands of Russian FPV drones. Exported to NATO allies evaluating counter-drone solutions.",
        "programs": ["Kvertus DroneBlocker (portable jammer)", "KVS Automated C-UAS Grid", "REB Vehicle-Mounted EW"],
        "export_countries": ["ua", "pl", "lt", "lv", "ee", "gb"],
    },
    "Tencore": {
        "founded_year": 2020,
        "headquarters": "Kyiv, Ukraine",
        "website": "https://tencore.tech",
        "linkedin": "https://www.linkedin.com/company/tencore",
        "funding_stage": "Private",
        "is_public": False,
        "description": "Ukrainian developer of FPV combat drones and autonomous ground vehicles. The TerMIT UGV is a NATO-standard remotely operated combat support vehicle with 800+ units fielded by Ukrainian forces. Also produces FPV attack drones in high volume for the Ukrainian Armed Forces. Strategic alliance signed with French UGV maker Shark Robotics in April 2026 for joint European market entry.",
        "programs": ["TerMIT Combat UGV", "FPV Attack Drones (high-volume)", "Autonomous Logistics Vehicle"],
        "export_countries": ["ua", "fr", "pl"],
    },
    "Infozahyst": {
        "founded_year": 2016,
        "headquarters": "Kyiv, Ukraine",
        "website": "https://infozahyst.com",
        "linkedin": "https://www.linkedin.com/company/infozahyst",
        "funding_stage": "Private",
        "is_public": False,
        "description": "Ukrainian electronic warfare and signals intelligence company. Develops passive SIGINT receivers, direction-finding systems and electronic warfare suites for the Ukrainian Armed Forces. The REP-2 tactical EW complex is deployed at battalion level to disrupt Russian communications and drone control links. Provides EW training and integration services.",
        "programs": ["REP-2 Tactical EW Complex", "Passive SIGINT Receivers", "Direction-Finding Systems"],
        "export_countries": ["ua", "pl", "lt"],
    },
    "Ukrainian Armor": {
        "founded_year": 2014,
        "headquarters": "Kyiv, Ukraine",
        "website": "https://ukrainianarmor.com",
        "linkedin": "https://www.linkedin.com/company/ukrainian-armor",
        "funding_stage": "Private",
        "is_public": False,
        "description": "Ukrainian manufacturer of armoured vehicles and ballistic protection systems. Produces COSSACK-1 and COSSACK-2 light armoured patrol vehicles, mine-resistant ambush protected (MRAP) vehicles, and armoured ambulances widely used by Ukrainian ground forces. Expanding exports to NATO Eastern Flank countries seeking domestic-compatible light armour.",
        "programs": ["COSSACK-2 Light APC", "VARTA MRAP Vehicle", "Armoured Ambulance (NATO Standard)"],
        "export_countries": ["ua", "pl", "ee", "lt"],
    },
    # ── Poland Startups ─────────────────────────────────────────────────────
    "WB Electronics": {
        "founded_year": 1997,
        "headquarters": "Ożarów Mazowiecki, Poland",
        "website": "https://www.wbelectronics.pl",
        "linkedin": "https://www.linkedin.com/company/wb-electronics",
        "funding_stage": "Public — WSE: WBE",
        "is_public": True,
        "description": "Polish defence electronics group specialising in tactical UAVs, loitering munitions, command-and-control systems and battlefield communications. The FlyEye tactical UAV is used by Polish, Ukrainian and Saudi Arabian forces. The WARMATE loitering munition has been combat-proven in Ukraine. WB Electronics is central to Poland's rapidly expanding defence industry.",
        "programs": ["FlyEye Tactical UAV", "WARMATE Loitering Munition", "TOPAZ C2 System", "FONET Digital Radio"],
        "export_countries": ["pl", "ua", "sa", "ae", "jo", "gb"],
    },
    # ── Estonia Startups ────────────────────────────────────────────────────
    "Frankenburg Technologies": {
        "founded_year": 2021,
        "headquarters": "Tallinn, Estonia",
        "website": "https://frankenburg.tech",
        "linkedin": "https://www.linkedin.com/company/frankenburg-technologies",
        "funding_stage": "Private — Seed ($3M, 2022)",
        "is_public": False,
        "description": "Estonian defence technology startup developing counter-drone and autonomous systems. Part of Estonia's rapidly growing defence tech ecosystem following Milrem Robotics' success. Focuses on AI-driven threat detection and classification for short-range air defence, operating under the Estonian Defence League's innovation framework.",
        "programs": ["Counter-Drone Detection AI", "Threat Classification System"],
        "export_countries": ["ee", "lv", "lt", "fi"],
    },
    # ── Turkey Startups ─────────────────────────────────────────────────────
    "Baykar": {
        "founded_year": 2000,
        "headquarters": "Istanbul, Turkey",
        "website": "https://www.baykartech.com",
        "linkedin": "https://www.linkedin.com/company/baykar",
        "funding_stage": "Private (Bayraktar family)",
        "is_public": False,
        "description": "Turkish UAV manufacturer and one of the world's leading drone exporters. The Bayraktar TB2 UCAV achieved global recognition during the 2020 Nagorno-Karabakh conflict and the 2022 Ukrainian war, proving cost-effective precision strike capability. The TB3 carrier-capable variant and Kızılelma stealth UCAV are in development. Exports to 30+ countries.",
        "programs": ["Bayraktar TB2 UCAV", "Bayraktar TB3 (Carrier)", "Kızılelma Stealth UCAV", "Akıncı MALE UCAV"],
        "export_countries": ["tr", "ua", "pl", "ro", "az", "ma", "et", "pk", "so", "ng", "rw", "tj", "dj", "tg", "si"],
    },
    # ── UAE Startups / Scale-ups ────────────────────────────────────────────
    "Calidus": {
        "founded_year": 2017,
        "headquarters": "Abu Dhabi, UAE",
        "website": "https://www.calidus.ae",
        "linkedin": "https://www.linkedin.com/company/calidus",
        "funding_stage": "Private (UAE government-backed)",
        "is_public": False,
        "description": "UAE aerospace company that developed the B-250 light attack and trainer aircraft — the first fixed-wing military aircraft fully designed and manufactured in the UAE. The B-250 uses a Honeywell TPE331 turboprop and is optimised for counter-insurgency (COIN) and close air support (CAS) missions in asymmetric conflicts. Supported by EDGE Group and UAE Air Force.",
        "programs": ["B-250 Light Attack / Trainer Aircraft", "COIN Operations Platform"],
        "export_countries": ["ae", "sa", "jo", "eg"],
    },
    # ── South Korea Startups ────────────────────────────────────────────────
    "Hancom InSpace": {
        "founded_year": 2015,
        "headquarters": "Seoul, South Korea",
        "website": "https://www.hancomintergraph.com",
        "linkedin": "https://www.linkedin.com/company/hancom-inspace",
        "funding_stage": "Public (Hancom Group subsidiary, KOSDAQ)",
        "is_public": True,
        "description": "South Korean space and geospatial intelligence company, subsidiary of Hancom Group. Develops small SAR (Synthetic Aperture Radar) and optical satellites for defence intelligence, disaster monitoring and maritime surveillance. Operates Korea's first commercially operated optical satellite. Supplies AI-powered GEOINT analysis to the Korean Armed Forces.",
        "programs": ["GEOEYE-1 Korean Clone Satellite", "SAR Satellite Constellation", "AI GEOINT Platform"],
        "export_countries": ["kr", "vn", "th", "ae"],
    },
    # ── Australia Startups ──────────────────────────────────────────────────
    "SYPAQ Systems": {
        "founded_year": 2003,
        "headquarters": "Melbourne, Australia",
        "website": "https://www.sypaq.com.au",
        "linkedin": "https://www.linkedin.com/company/sypaq-systems",
        "funding_stage": "Private (Australian Government grants)",
        "is_public": False,
        "description": "Australian defence technology company that developed the CORVO Precision Payload Delivery System — a flat-pack, cardboard-bodied autonomous UAV drone that can be assembled in the field without tools and delivers payloads up to 3 kg. Donated to Ukraine, the CORVO has been used for ISTAR and logistics missions. The low-cost, flat-pack design is ideal for mass production.",
        "programs": ["CORVO PPDS (Flat-pack UAV)", "Autonomous Logistics Delivery", "ISTAR Fixed-Wing UAV"],
        "export_countries": ["au", "ua", "us"],
    },
    "Advanced Navigation": {
        "founded_year": 2011,
        "headquarters": "Sydney, Australia",
        "website": "https://www.advancednavigation.com",
        "linkedin": "https://www.linkedin.com/company/advanced-navigation",
        "funding_stage": "Private — Series B ($30M, 2021)",
        "is_public": False,
        "description": "Australian navigation technology company developing AI-powered GPS-denied navigation systems, underwater acoustic navigation and autonomous vehicle systems. Products include GNSS/INS units, DVL (Doppler Velocity Log) sensors and the MOTUS AI motion sensor. Used by defence forces for submarine navigation, AUV guidance and soldier-worn navigation in GPS-denied environments.",
        "programs": ["Certus GNSS/INS", "Subsonus Acoustic Navigation", "MOTUS AI Sensor"],
        "export_countries": ["au", "us", "gb", "no", "sg"],
    },
    # ── India Startups ──────────────────────────────────────────────────────
    "ideaForge Technology": {
        "founded_year": 2011,
        "headquarters": "Mumbai, India",
        "website": "https://www.ideaforgetech.com",
        "linkedin": "https://www.linkedin.com/company/ideaforge",
        "funding_stage": "Public — BSE/NSE: IDEAFORGE",
        "is_public": True,
        "description": "India's largest military drone manufacturer by volume. Supplies SWITCH and NINJA fixed-wing VTOL UAVs to the Indian Army, Paramilitary and Border Security Force. SWITCH UAV won a ₹300 crore Indian Army contract in 2022 — the largest ever Indian drone procurement at the time. Expanding into the US and international defence markets.",
        "programs": ["SWITCH VTOL UAV (Indian Army)", "NINJA Fixed-Wing UAV (BSF)", "ISTAR Payloads"],
        "export_countries": ["in", "us", "ua"],
    },
    "Sagar Defence Engineering": {
        "founded_year": 2015,
        "headquarters": "Ahmedabad, India",
        "website": "https://www.sagardefence.com",
        "linkedin": "https://www.linkedin.com/company/sagar-defence-engineering",
        "funding_stage": "Private",
        "is_public": False,
        "description": "Indian startup developing autonomous surface vessels (ASVs) and underwater drones (AUVs) for the Indian Navy's growing unmanned maritime fleet. Products include SAUVIM (Semi-Autonomous Underwater Vehicle for Inspection and Mapping) and various ASVs for coastal surveillance, mine detection and hydrographic survey. Participated in Indian Navy SWAYATT programme.",
        "programs": ["SAUVIM AUV", "SWAN Autonomous Surface Vessel", "Coastal Surveillance ASV"],
        "export_countries": ["in"],
    },
    # ── Canada Startups ─────────────────────────────────────────────────────
    "Xona Space Systems": {
        "founded_year": 2019,
        "headquarters": "San Mateo, CA, USA (Canadian-founded)",
        "website": "https://www.xonaspace.com",
        "linkedin": "https://www.linkedin.com/company/xona-space-systems",
        "funding_stage": "Private — Series A ($19.5M, 2023)",
        "is_public": False,
        "description": "Canadian-American startup building a LEO satellite constellation (PULSAR) to provide cm-level GPS augmentation and jam-resistant navigation signals for defence and commercial users. PULSAR targets military-grade PNT (Positioning, Navigation and Timing) for GPS-denied or GPS-degraded environments — a critical need in modern contested battlespace.",
        "programs": ["PULSAR LEO PNT Constellation", "High-Precision Military Navigation", "GPS Augmentation Service"],
        "export_countries": ["us", "ca", "gb", "au"],
    },
}

# ── Defense Contracts seed data ────────────────────────────────────────────
CONTRACTS_DATA = [
    {
        "title": "FCAS Programme — Phase 1B Technology Demonstrator",
        "description": "Technology demonstrator contract for the Future Combat Air System (FCAS/SCAF). Next-generation weapon system combining the Next Generation Fighter (NGF), Remote Carriers, and the Air Combat Cloud.",
        "contracting_authority": "DGA / OCCAR",
        "authority_country": "France",
        "authority_type": "bilateral",
        "category": "aerospace",
        "amount_min": 3500.0,
        "amount_max": 4000.0,
        "status": "awarded",
        "publication_date": "2023-12-15",
        "deadline": None,
        "awarded_to": "Airbus / Dassault Aviation / Indra",
        "program": "FCAS / SCAF",
        "source_url": "https://www.airbus.com/en/newsroom/press-releases/2022-12-europes-future-combat-air-system-on-the-way-to-the-first-flight",
        "reliability": "confirmed",
    },
    {
        "title": "MGCS — Main Ground Combat System — Exploration Phase",
        "description": "Development of the next-generation Franco-German main battle tank to replace the Leclerc and Leopard 2. A flagship programme of KNDS industrial cooperation.",
        "contracting_authority": "DGA / BAAINBw",
        "authority_country": "France",
        "authority_type": "bilateral",
        "category": "land",
        "amount_min": 100.0,
        "amount_max": 500.0,
        "status": "open",
        "publication_date": "2025-04-10",
        "deadline": "2025-06-30",
        "awarded_to": None,
        "program": "MGCS",
        "source_url": "https://knds.com/en/press-releases/MGCS-project-company-gmbh-established-in-cologne",
        "reliability": "confirmed",
    },
    {
        "title": "FDI — Defence and Intervention Frigate — Batch 4 & 5",
        "description": "Order for the 4th and 5th hulls of the FDI (Frégate de Défense et d'Intervention) frigates for the French Navy. Deliveries scheduled for 2028–2030.",
        "contracting_authority": "DGA",
        "authority_country": "France",
        "authority_type": "national",
        "category": "naval",
        "amount_min": 1200.0,
        "amount_max": 1500.0,
        "status": "awarded",
        "publication_date": "2024-01-10",
        "deadline": None,
        "awarded_to": "Naval Group",
        "program": "FDI",
        "source_url": "https://www.naval-group.com/en/france-orders-additional-defence-and-intervention-frigate-fdi-naval-group",
        "reliability": "confirmed",
    },
    {
        "title": "Type 31 Frigate Programme — Additional Units",
        "description": "Potential extension of the Type 31 Inspiration-class frigate programme for the Royal Navy. Follow-on to the initial 5-ship Batch 1 contract awarded to Babcock.",
        "contracting_authority": "UK Ministry of Defence",
        "authority_country": "UK",
        "authority_type": "national",
        "category": "naval",
        "amount_min": 800.0,
        "amount_max": 1200.0,
        "status": "open",
        "publication_date": "2025-01-20",
        "deadline": "2025-03-31",
        "awarded_to": None,
        "program": "Type 31",
        "source_url": "https://www.gov.uk/government/news/babcock-wins-1-25-billion-contract-to-build-five-type-31-frigates",
        "reliability": "estimated",
    },
    {
        "title": "F-35A Block 4 Production Lot 18 — USAF",
        "description": "Low-Rate Initial Production Lot 18 contract for F-35A aircraft for the U.S. Air Force and international partner nations. Includes ALIS/ODIN logistics system.",
        "contracting_authority": "U.S. Department of Defense — F-35 JPO",
        "authority_country": "USA",
        "authority_type": "national",
        "category": "aerospace",
        "amount_min": 12000.0,
        "amount_max": 14000.0,
        "status": "awarded",
        "publication_date": "2024-02-28",
        "deadline": None,
        "awarded_to": "Lockheed Martin",
        "program": "F-35 JSF",
        "source_url": "https://news.lockheedmartin.com/2022-12-30-Pentagon-and-Lockheed-Martin-Finalize-Lot-15-17-Agreement,-Capping-a-Year-of-International-Growth",
        "reliability": "confirmed",
    },
    {
        "title": "SAMP/T NG — Ground-Based Air Defence Next Generation Upgrade",
        "description": "Development and production contract for the SAMP/T Next Generation (NG) system for France and Italy. Theatre air and missile defence capability designed to intercept ballistic and cruise missiles.",
        "contracting_authority": "OCCAR",
        "authority_country": "France",
        "authority_type": "bilateral",
        "category": "land",
        "amount_min": 700.0,
        "amount_max": 900.0,
        "status": "awarded",
        "publication_date": "2023-09-20",
        "deadline": None,
        "awarded_to": "MBDA / Thales",
        "program": "SAMP/T NG",
        "source_url": "https://www.occar.int/news/occar-signs-contract-to-launch-a-global-production-of-sampt-ng-systems",
        "reliability": "confirmed",
    },
    {
        "title": "Eurodrone MALE — Production Series",
        "description": "European MALE (Medium Altitude Long Endurance) UAS programme led by the European Defence Agency (EDA). Intended to replace the MQ-9 Reaper for France, Germany, Italy, and Spain.",
        "contracting_authority": "EDA / OCCAR",
        "authority_country": "EU",
        "authority_type": "eu",
        "category": "aerospace",
        "amount_min": 2000.0,
        "amount_max": 3000.0,
        "status": "open",
        "publication_date": "2025-02-15",
        "deadline": "2025-12-31",
        "awarded_to": None,
        "program": "Eurodrone",
        "source_url": "https://eda.europa.eu/what-we-do/activities/activities-search/eurodrone",
        "reliability": "confirmed",
    },
    {
        "title": "Cyber Defence Services — NATO NCIA",
        "description": "Multi-year contract for cybersecurity operations and incident response services for NATO communications and information systems. Includes SOC services and red team exercises.",
        "contracting_authority": "NATO NCIA",
        "authority_country": "NATO",
        "authority_type": "nato",
        "category": "cyber",
        "amount_min": 150.0,
        "amount_max": 250.0,
        "status": "open",
        "publication_date": "2024-08-01",
        "deadline": "2024-11-30",
        "awarded_to": None,
        "program": None,
        "source_url": "https://www.ncia.nato.int/procurement/",
        "reliability": "confirmed",
    },
    {
        "title": "HIL H160M Guépard — Light Joint Helicopter Programme — 2024–2030 Deliveries",
        "description": "Firm delivery tranche for the HIL H160M Guépard to replace the Dauphin/Fennec fleet across the three French armed services. 160 aircraft programmed in total under the joint light helicopter programme.",
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
        "title": "Barracuda-class Nuclear Attack Submarine",
        "description": "Production contract for additional Barracuda-class (Suffren) nuclear attack submarines for the French Navy. Programme of six boats to modernise the underwater strategic fleet.",
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
        "program": "Barracuda (Suffren)",
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
        "title": "Canadian Surface Combatant — Type 26 Frigate",
        "description": "Production of 15 Irving Shipbuilding-built Type 26 frigates for the Royal Canadian Navy under the National Shipbuilding Strategy, replacing the Halifax class.",
        "contracting_authority": "Canadian DND",
        "authority_country": "Canada",
        "authority_type": "national",
        "category": "naval",
        "amount_min": 40000.0,
        "amount_max": 60000.0,
        "status": "awarded",
        "publication_date": "2024-03-01",
        "deadline": None,
        "awarded_to": "Irving Shipbuilding / BAE Systems",
        "program": "Canadian Surface Combatant",
        "source_url": "https://www.canada.ca/en/department-national-defence.html",
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
            "closed in late 2024 after US regulatory approval."
        ),
        "acquirer_country": "US",
        "target_country": "US",
        "acquirer_logo_domain": "boeing.com",
        "target_logo_domain": "spiritaero.com",
        "source_url": "https://boeing.mediaroom.com/2024-07-01-Boeing-to-Acquire-Spirit-AeroSystems",
        "announced_date": datetime(2024, 7, 1, tzinfo=timezone.utc),
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
        "deal_value": 220,
        "status": "completed",
        "deal_type": "acquisition",
        "description": "Safran acquires French AI startup Preligens (~€200M) — automated satellite image analysis, rebranded Safran AI",
        "rationale": (
            "Safran acquires Preligens, a Paris-based AI start-up specialising in automated "
            "satellite image analysis and geospatial intelligence (GEOINT), for approximately "
            "€200 million in October 2023. Preligens's Earth and Sky platforms use deep-learning "
            "computer vision to automatically detect, classify and track military assets — "
            "aircraft, naval vessels, vehicles, infrastructure — in satellite and aerial imagery "
            "at operational tempo. Following the acquisition, Preligens was rebranded Safran AI, "
            "anchoring Safran's strategy in AI-driven ISR and GEOINT for NATO customers and the "
            "French DGA. The deal closed without regulatory obstruction."
        ),
        "acquirer_country": "FR",
        "target_country": "FR",
        "acquirer_logo_domain": "safran-group.com",
        "target_logo_domain": "safran-group.com",
        "source_url": "https://www.safran-group.com/en/press-releases/2023/safran-acquires-preligens",
        "announced_date": datetime(2023, 10, 3, tzinfo=timezone.utc),
        "stake_percentage": 100.0,
        "round_type": None,
        "is_disclosed": True,
    },
    # ── 2022 ──────────────────────────────────────────────────────────────────
    {
        "acquirer": "Thales",
        "target": "Imperva",
        "deal_value": 3600,
        "status": "completed",
        "deal_type": "acquisition",
        "description": "Thales acquires US cybersecurity specialist Imperva for $3.6B — strengthens its Digital Identity & Security division",
        "rationale": (
            "Thales completes its $3.6 billion acquisition of Imperva, a leading US cybersecurity "
            "company specialising in data security, web application protection and DDoS mitigation. "
            "The deal was announced in December 2022 and closed in January 2023 after US and EU "
            "regulatory clearance. Imperva's product suite — web application firewall (WAF), "
            "database activity monitoring (DAM) and cloud data security — integrates directly "
            "into Thales's Digital Identity & Security division. Imperva's customer base spans "
            "US federal government, financial services and critical infrastructure, dovetailing "
            "with Thales's existing defence and government security portfolio."
        ),
        "acquirer_country": "FR",
        "target_country": "US",
        "acquirer_logo_domain": "thalesgroup.com",
        "target_logo_domain": "imperva.com",
        "source_url": "https://www.prnewswire.com/news-releases/thales-completes-acquisition-of-imperva-301730785.html",
        "announced_date": datetime(2022, 12, 8, tzinfo=timezone.utc),
        "stake_percentage": None,
        "round_type": None,
        "is_disclosed": True,
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
        "acquirer": "Viasat", "target": "Inmarsat",
        "deal_value": 7300, "status": "completed", "deal_type": "acquisition",
        "description": "Viasat acquires Inmarsat for $7.3B — creates global satellite connectivity leader",
        "rationale": (
            "US satellite operator Viasat closes its $7.3 billion acquisition of Inmarsat, "
            "the British pioneer of mobile satellite services, in May 2023. The combined "
            "entity operates one of the largest commercial satellite fleets, covering maritime, "
            "aviation and government mobility. The deal required divestitures and extensive "
            "regulatory clearance in the US, EU and UK. Inmarsat's GX high-throughput Ka-band "
            "network complements Viasat's own ViaSat-3 constellation, serving NATO, the UK "
            "Ministry of Defence and aviation customers globally."
        ),
        "acquirer_country": "US", "target_country": "GB",
        "acquirer_logo_domain": "viasat.com",
        "target_logo_domain": "inmarsat.com",
        "source_url": "https://www.reuters.com/technology/viasat-closes-acquisition-inmarsat-2023-05-30/",
        "announced_date": datetime(2021, 11, 8, tzinfo=timezone.utc),
    },
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
        "acquirer": "Eaton", "target": "Ultra PCS",
        "deal_value": 1550, "status": "completed", "deal_type": "acquisition",
        "description": "Eaton acquires Ultra PCS for $1.55B — expands into UK defence electronics",
        "rationale": (
            "Eaton Corporation acquires Ultra PCS (Power and Control Systems), the UK-based "
            "defence electronics subsidiary of Ultra Electronics, for approximately $1.55 billion "
            "in 2025. Ultra PCS specialises in power management and control systems for military "
            "aircraft, including the F-35 Lightning II, Typhoon and maritime patrol aircraft. "
            "The acquisition extends Eaton's aerospace power distribution capabilities into "
            "high-reliability military electronics, complementing its existing eMobility and "
            "power quality product lines."
        ),
        "acquirer_country": "US", "target_country": "GB",
        "acquirer_logo_domain": "eaton.com",
        "target_logo_domain": "ultra.group",
        "source_url": "https://www.businesswire.com/news/home/20250115005200/en/Eaton-Completes-Acquisition-Ultra-PCS",
        "announced_date": datetime(2024, 10, 14, tzinfo=timezone.utc),
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
        "acquirer": "Thales", "target": "Cobham Aerospace Communications",
        "deal_value": 1100, "status": "completed", "deal_type": "acquisition",
        "description": "Thales acquires Cobham Aerospace Communications for $1.1B — SATCOM for aviation",
        "rationale": (
            "Thales acquires Cobham Aerospace Communications, the satellite communications and "
            "avionics antenna business unit of Cobham (owned by Advent International), for "
            "approximately $1.1 billion in 2024. The division provides SATCOM antennas, tracking "
            "systems and data link equipment for commercial and military aircraft, naval vessels "
            "and government platforms. The acquisition strengthens Thales's InFlyt Experience "
            "in-flight connectivity product line and its military SATCOM terminal portfolio."
        ),
        "acquirer_country": "FR", "target_country": "GB",
        "acquirer_logo_domain": "thalesgroup.com",
        "target_logo_domain": "cobham.com",
        "source_url": "https://www.thalesgroup.com/en/worldwide/newsroom/press-releases/thales-completes-acquisition-cobham-aerospace-communications",
        "announced_date": datetime(2024, 2, 7, tzinfo=timezone.utc),
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
        "target_logo_domain": "paragon-solutions.co.uk",
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
        "acquirer_logo_domain": "ondasholdings.com",
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
        "acquirer": "Safran", "target": "Orolia",
        "deal_value": 189, "status": "completed", "deal_type": "acquisition",
        "description": "Safran acquires Orolia for €189M — resilient positioning, navigation and timing (PNT)",
        "rationale": (
            "Safran acquires Orolia, a French specialist in resilient positioning, navigation "
            "and timing (PNT) solutions, for €189 million in 2022. Orolia develops GPS/GNSS "
            "simulators, ruggedised atomic clocks and assured PNT systems used by military "
            "and critical infrastructure operators to resist GPS jamming and spoofing. Following "
            "the acquisition, Orolia is integrated into Safran Electronics & Defense, "
            "strengthening Safran's navigation portfolio ahead of anticipated demand from "
            "NATO forces seeking GPS-denied resilience."
        ),
        "acquirer_country": "FR", "target_country": "FR",
        "acquirer_logo_domain": "safran-group.com",
        "target_logo_domain": "orolia.com",
        "source_url": "https://www.safran-group.com/en/newsroom",
        "announced_date": datetime(2022, 3, 1, tzinfo=timezone.utc),
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
        "acquirer_logo_domain": "ondasholdings.com",
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
        "acquirer": "Babcock International", "target": "Frazer-Nash Consultancy",
        "deal_value": 0, "status": "completed", "deal_type": "acquisition",
        "description": "Babcock divests Frazer-Nash Consultancy to PE firm Inflexion",
        "rationale": (
            "Babcock International divests Frazer-Nash Consultancy, a UK engineering "
            "and technology consultancy serving defence, nuclear and energy sectors, "
            "to private equity firm Inflexion Private Equity as part of Babcock's "
            "portfolio rationalisation strategy. The deal allows Babcock to focus on "
            "its core naval, land and aviation services, while Frazer-Nash continues "
            "independently with defence advisory and engineering services."
        ),
        "acquirer_country": "GB", "target_country": "GB",
        "acquirer_logo_domain": "inflexion.com",
        "target_logo_domain": "frazernash.com",
        "source_url": "https://www.babcockinternational.com/news-and-media/",
        "announced_date": datetime(2022, 6, 1, tzinfo=timezone.utc),
        "stake_percentage": 100.0, "round_type": None, "is_disclosed": False,
        "confidence": "medium",
        "notes": "Acquirer in this deal is effectively Inflexion PE (buyer), Babcock is the seller/target-parent.",
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
        "acquirer": "Arquus", "target": "John Cockerill Defense",
        "deal_value": 0, "status": "completed", "deal_type": "acquisition",
        "description": "Arquus acquires John Cockerill Defense — armoured turret and vehicle integration",
        "rationale": (
            "Arquus (the French armoured vehicle manufacturer, formerly Renault Trucks Defense, "
            "owned by Volvo Group) acquires John Cockerill Defense, the Belgian manufacturer of "
            "large-calibre turrets and armoured vehicle components. The deal consolidates French "
            "armoured vehicle industrial capability, adding Cockerill's 3105 90mm turret and "
            "3030 30mm turret product lines to Arquus's VBMR Griffon, EBRC Jaguar and Sherpa "
            "platforms. The acquisition positions the combined entity for French Army vehicle "
            "sustainment and export sales across Africa and the Middle East."
        ),
        "acquirer_country": "FR", "target_country": "BE",
        "acquirer_logo_domain": "arquus-defense.com",
        "target_logo_domain": "john-cockerill.com",
        "source_url": "https://www.arquus-defense.com/actualites/",
        "announced_date": datetime(2024, 1, 1, tzinfo=timezone.utc),
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
