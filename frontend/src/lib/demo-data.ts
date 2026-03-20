import { DollarSign, Globe2, Building2, Handshake } from 'lucide-react';
import type {
  AnnouncementRow,
  Company,
  Country,
  ExpenditureRow,
  FollowEntity,
  FollowItem,
  Kpi,
  MaRow,
  MarketLeader,
  ProductRow,
  RegulationRow,
  SourceMeta,
} from '@/lib/types';

const srcDod: SourceMeta = {
  source_name: 'US Department of Defense',
  source_type: 'official',
  publisher: 'DoD',
  source_url: 'https://www.defense.gov/News/Releases/',
  source_title: 'DoD News Release',
  publication_date: '2026-03-01',
  retrieved_at: '2026-03-01T09:20:00Z',
  last_verified_at: '2026-03-01T10:00:00Z',
  trust_tier: 'official',
};

const srcJanes: SourceMeta = {
  source_name: 'Janes',
  source_type: 'media',
  publisher: 'Janes',
  source_url: 'https://www.janes.com/',
  source_title: 'Janes Defense Insight',
  publication_date: '2026-02-28',
  retrieved_at: '2026-02-28T11:15:00Z',
  last_verified_at: '2026-02-28T12:00:00Z',
  trust_tier: 'specialist',
};

const srcSipri: SourceMeta = {
  source_name: 'SIPRI',
  source_type: 'dataset',
  publisher: 'SIPRI',
  source_url: 'https://www.sipri.org/databases/milex',
  source_title: 'Military Expenditure Database',
  retrieved_at: '2026-02-25T08:00:00Z',
  last_verified_at: '2026-02-25T08:30:00Z',
  trust_tier: 'tier_1',
};

export const dashboardKpis: Kpi[] = [
  { label: 'Total Market Cap', value: '$2,081.2B', trend: { direction: 'up', value: '+2.4%' }, icon: DollarSign },
  { label: 'Global Expenditure', value: '$2,089B', subtitle: 'FY 2024', icon: Globe2 },
  { label: 'Active Players', value: '118', icon: Building2 },
  { label: 'M&A Activities', value: '17', icon: Handshake },
];

export const countries: Country[] = [
  {
    id: 'c-us',
    name: 'United States',
    country_code: 'US',
    flag_emoji: '🇺🇸',
    ministry_of_defense_url: 'https://www.defense.gov/',
    procurement_authority_url: 'https://sam.gov/',
    region: 'North America',
    subregion: 'Northern America',
  },
  {
    id: 'c-fr',
    name: 'France',
    country_code: 'FR',
    flag_emoji: '🇫🇷',
    ministry_of_defense_url: 'https://www.defense.gouv.fr/',
    procurement_authority_url: 'https://www.achats.defense.gouv.fr/',
    region: 'Europe',
  },
  {
    id: 'c-gb',
    name: 'United Kingdom',
    country_code: 'GB',
    flag_emoji: '🇬🇧',
    ministry_of_defense_url: 'https://www.gov.uk/government/organisations/ministry-of-defence',
    procurement_authority_url: 'https://www.des.mod.uk/',
    region: 'Europe',
  },
];

export const companies: Company[] = [
  {
    id: 'cmp-thales',
    name: 'Thales',
    country_code: 'FR',
    country_name: 'France',
    logo_url: '',
    website_url: 'https://www.thalesgroup.com/',
    investor_relations_url: 'https://www.thalesgroup.com/en/investor',
    linkedin_url: 'https://www.linkedin.com/company/thales/',
    x_url: 'https://x.com/thalesgroup',
    short_description: 'Global leader in defense electronics, avionics, and secure communications.',
    segment: 'Defense Electronics',
    status: 'Public',
  },
  {
    id: 'cmp-rhein',
    name: 'Rheinmetall',
    country_code: 'DE',
    country_name: 'Germany',
    website_url: 'https://www.rheinmetall.com/',
    investor_relations_url: 'https://www.rheinmetall.com/en/investor-relations',
    linkedin_url: 'https://www.linkedin.com/company/rheinmetall/',
    short_description: 'Land systems and munitions provider for European modernization programs.',
    segment: 'Land Systems',
    status: 'Public',
  },
  {
    id: 'cmp-lockheed',
    name: 'Lockheed Martin',
    country_code: 'US',
    country_name: 'United States',
    website_url: 'https://www.lockheedmartin.com/',
    investor_relations_url: 'https://investors.lockheedmartin.com/',
    linkedin_url: 'https://www.linkedin.com/company/lockheed-martin/',
    x_url: 'https://x.com/LockheedMartin',
    short_description: 'Prime contractor across air, missile defense, and space domains.',
    segment: 'Aerospace & Missile Defense',
    status: 'Public',
  },
  {
    id: 'cmp-rhein',
    name: 'Rheinmetall',
    country_code: 'DE',
    country_name: 'Germany',
    website_url: 'https://www.rheinmetall.com/',
    investor_relations_url: 'https://www.rheinmetall.com/en/investor-relations',
    linkedin_url: 'https://www.linkedin.com/company/rheinmetall/',
    short_description: 'Land systems and munitions provider for European modernization programs.',
    segment: 'Land Systems',
    status: 'Public',
  },
];

export const announcementRows: AnnouncementRow[] = [
  { id: 'a1', headline: 'NATO ISR procurement expansion', region: 'Europe', status: 'Strategic', company_id: 'cmp-thales', country_code: 'FR', source: srcDod },
  { id: 'a2', headline: 'US hypersonics contract modification', region: 'North America', status: 'Priority', company_id: 'cmp-lockheed', country_code: 'US', source: srcDod },
  { id: 'a3', headline: 'German procurement authority publishes IFV update', region: 'Europe', status: 'Regulatory', company_id: 'cmp-rhein', country_code: 'DE', source: srcJanes },
];

export const maRows: MaRow[] = [
  { id: 'm1', acquirer: 'Lockheed Martin', target: 'Orbital Shield', value: '$2.1B', stage: 'Announced', source: srcJanes },
  { id: 'm2', acquirer: 'Rheinmetall', target: 'BlueCurrent Robotics', value: '$410M', stage: 'Pending', source: srcDod },
];

export const expenditureRows: ExpenditureRow[] = [
  { id: 'e1', country: 'United States', country_code: 'US', year: 2025, spend: '$916B', gdp: '3.4%', source: srcSipri },
  { id: 'e2', country: 'France', country_code: 'FR', year: 2025, spend: '$67B', gdp: '2.1%', source: srcSipri },
  { id: 'e3', country: 'United Kingdom', country_code: 'GB', year: 2025, spend: '$74B', gdp: '2.3%', source: srcSipri },
];

export const regulationRows: RegulationRow[] = [
  { id: 'r1', jurisdiction: 'EU', country_code: 'FR', policy: 'Foreign Subsidies Screening', effective: '2026-01-15', status: 'Pending', source: srcJanes },
  { id: 'r2', jurisdiction: 'US', country_code: 'US', policy: 'CMMC Level 2 Expansion', effective: '2026-04-01', status: 'Priority', source: srcDod },
];

export const marketLeaders: MarketLeader[] = [
  { rank: 1, name: 'Raytheon Technologies', country_code: 'US', ticker: 'RTX', market_cap: '$147.2B', change: '-0.45%', change_direction: 'down' },
  { rank: 2, name: 'Lockheed Martin', country_code: 'US', ticker: 'LMT', market_cap: '$134.5B', change: '+1.23%', change_direction: 'up' },
  { rank: 3, name: 'Boeing Defense', country_code: 'US', ticker: 'BA', market_cap: '$128.5B', change: '-1.12%', change_direction: 'down' },
  { rank: 4, name: 'Airbus Defence', country_code: 'FR', ticker: 'AIR', market_cap: '$112.8B', change: '+0.67%', change_direction: 'up' },
  { rank: 5, name: 'Northrop Grumman', country_code: 'US', ticker: 'NOC', market_cap: '$71.3B', change: '+0.34%', change_direction: 'up' },
  { rank: 6, name: 'General Dynamics', country_code: 'US', ticker: 'GD', market_cap: '$68.9B', change: '-0.21%', change_direction: 'down' },
  { rank: 7, name: 'BAE Systems', country_code: 'GB', ticker: 'BA.', market_cap: '$44.8B', change: '+1.05%', change_direction: 'up' },
  { rank: 8, name: 'Rheinmetall', country_code: 'DE', ticker: 'RHM', market_cap: '$21.9B', change: '+2.31%', change_direction: 'up' },
];

export const productRows: ProductRow[] = [
  // ── Aircraft ──────────────────────────────────────────────────────
  { id: 'p-f35', name: 'F-35 Lightning II', category: 'Aircraft', subcategory: 'Fighter', manufacturer: 'Lockheed Martin', status: 'In Service', source: srcDod, image_url: 'https://upload.wikimedia.org/wikipedia/commons/d/db/New_era_in_combat_air_power_begins_with_F-35A_Lightning_II_151014-F-LS255-230.jpg', wikipedia_url: 'https://en.wikipedia.org/wiki/Lockheed_Martin_F-35_Lightning_II' },
  { id: 'p-f22', name: 'F-22 Raptor', category: 'Aircraft', subcategory: 'Fighter', manufacturer: 'Lockheed Martin', status: 'In Service', source: srcDod, image_url: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/F-22_Raptor_edit1_%28cropped%29.jpg', wikipedia_url: 'https://en.wikipedia.org/wiki/Lockheed_Martin_F-22_Raptor' },
  { id: 'p-f16', name: 'F-16 Fighting Falcon', category: 'Aircraft', subcategory: 'Fighter', manufacturer: 'Lockheed Martin', status: 'In Service', source: srcDod, image_url: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/F-16_June_2008.jpg', wikipedia_url: 'https://en.wikipedia.org/wiki/General_Dynamics_F-16_Fighting_Falcon' },
  { id: 'p-typhoon', name: 'Eurofighter Typhoon', category: 'Aircraft', subcategory: 'Fighter', manufacturer: 'Airbus Defence', status: 'In Service', source: srcJanes, image_url: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Eurofighter_Typhoon_-_RIAT_2013_%2801%29.jpg', wikipedia_url: 'https://en.wikipedia.org/wiki/Eurofighter_Typhoon' },
  { id: 'p-rafale', name: 'Dassault Rafale', category: 'Aircraft', subcategory: 'Fighter', manufacturer: 'Dassault Aviation', status: 'In Service', source: srcJanes, image_url: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Rafale_F3-R_on_approach_%282%29.jpg', wikipedia_url: 'https://en.wikipedia.org/wiki/Dassault_Rafale' },
  { id: 'p-gripen', name: 'Saab JAS 39 Gripen', category: 'Aircraft', subcategory: 'Fighter', manufacturer: 'Saab', status: 'In Service', source: srcJanes, image_url: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Gripen_Demo_at_Avalon_2013.jpg', wikipedia_url: 'https://en.wikipedia.org/wiki/Saab_JAS_39_Gripen' },
  { id: 'p-b21', name: 'B-21 Raider', category: 'Aircraft', subcategory: 'Bomber', manufacturer: 'Northrop Grumman', status: 'In Service', source: srcDod, image_url: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/B-21_Raider_first_flight.jpg', wikipedia_url: 'https://en.wikipedia.org/wiki/Northrop_Grumman_B-21_Raider' },
  { id: 'p-p8', name: 'P-8 Poseidon', category: 'Aircraft', subcategory: 'Maritime Patrol', manufacturer: 'Boeing Defense', status: 'In Service', source: srcDod, image_url: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/P-8A_Poseidon_in_flight.jpg', wikipedia_url: 'https://en.wikipedia.org/wiki/Boeing_P-8_Poseidon' },
  { id: 'p-a400m', name: 'Airbus A400M Atlas', category: 'Aircraft', subcategory: 'Transport', manufacturer: 'Airbus Defence', status: 'In Service', source: srcJanes, image_url: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/A400M_Atlas_F-WWMZ_-_ILA_2010.jpg', wikipedia_url: 'https://en.wikipedia.org/wiki/Airbus_A400M_Atlas' },
  { id: 'p-c130j', name: 'C-130J Super Hercules', category: 'Aircraft', subcategory: 'Transport', manufacturer: 'Lockheed Martin', status: 'In Service', source: srcDod, image_url: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/C-130J-30_Super_Hercules.jpg', wikipedia_url: 'https://en.wikipedia.org/wiki/Lockheed_Martin_C-130J_Super_Hercules' },
  { id: 'p-nh90', name: 'NH90', category: 'Aircraft', subcategory: 'Helicopter', manufacturer: 'NHIndustries', status: 'In Service', source: srcJanes, image_url: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/NH90_in_flight.jpg', wikipedia_url: 'https://en.wikipedia.org/wiki/NHIndustries_NH90' },
  { id: 'p-ah64', name: 'AH-64E Apache', category: 'Aircraft', subcategory: 'Helicopter', manufacturer: 'Boeing Defense', status: 'In Service', source: srcDod, image_url: 'https://upload.wikimedia.org/wikipedia/commons/0/05/US_Army_AH-64D_Apache.jpg', wikipedia_url: 'https://en.wikipedia.org/wiki/Boeing_AH-64_Apache' },
  { id: 'p-tiger', name: 'Airbus Tiger HAD', category: 'Aircraft', subcategory: 'Helicopter', manufacturer: 'Airbus Defence', status: 'In Service', source: srcJanes, image_url: '', wikipedia_url: 'https://en.wikipedia.org/wiki/Eurocopter_Tiger' },

  // ── Land Systems ──────────────────────────────────────────────────
  { id: 'p-lynx-kf41', name: 'Lynx KF41', category: 'Land Systems', subcategory: 'IFV', manufacturer: 'Rheinmetall', status: 'In Service', source: srcJanes, image_url: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Lynx_KF41.jpg', wikipedia_url: 'https://en.wikipedia.org/wiki/Lynx_(Rheinmetall_armoured_fighting_vehicle)' },
  { id: 'p-puma', name: 'Puma IFV', category: 'Land Systems', subcategory: 'IFV', manufacturer: 'Rheinmetall', status: 'In Service', source: srcJanes, image_url: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Puma.IFV.JPG', wikipedia_url: 'https://en.wikipedia.org/wiki/Puma_(German_infantry_fighting_vehicle)' },
  { id: 'p-cv90', name: 'CV90', category: 'Land Systems', subcategory: 'IFV', manufacturer: 'BAE Systems', status: 'In Service', source: srcJanes, image_url: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/CV9030N_Norway.jpg', wikipedia_url: 'https://en.wikipedia.org/wiki/CV90' },
  { id: 'p-leopard2', name: 'Leopard 2A7+', category: 'Land Systems', subcategory: 'MBT', manufacturer: 'Rheinmetall', status: 'In Service', source: srcJanes, image_url: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Leopard_2_A7.jpg', wikipedia_url: 'https://en.wikipedia.org/wiki/Leopard_2' },
  { id: 'p-abrams', name: 'M1A2 SEPv3 Abrams', category: 'Land Systems', subcategory: 'MBT', manufacturer: 'General Dynamics', status: 'In Service', source: srcDod, image_url: 'https://upload.wikimedia.org/wikipedia/commons/7/71/M1A2_Abrams_as_it_crosses_the_berm_into_Iraq.jpg', wikipedia_url: 'https://en.wikipedia.org/wiki/M1_Abrams' },
  { id: 'p-leclerc', name: 'Leclerc XLR', category: 'Land Systems', subcategory: 'MBT', manufacturer: 'Nexter Systems', status: 'In Service', source: srcJanes, image_url: '', wikipedia_url: 'https://en.wikipedia.org/wiki/Leclerc_tank' },
  { id: 'p-challenger3', name: 'Challenger 3', category: 'Land Systems', subcategory: 'MBT', manufacturer: 'BAE Systems', status: 'In Development', source: srcJanes, image_url: '', wikipedia_url: 'https://en.wikipedia.org/wiki/Challenger_3' },
  { id: 'p-caesar', name: 'CAESAR 155mm', category: 'Land Systems', subcategory: 'Artillery', manufacturer: 'Nexter Systems', status: 'In Service', source: srcJanes, image_url: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Caesar_system.jpg', wikipedia_url: 'https://en.wikipedia.org/wiki/CAESAR_self-propelled_howitzer' },
  { id: 'p-pzh2000', name: 'PzH 2000', category: 'Land Systems', subcategory: 'Artillery', manufacturer: 'Rheinmetall', status: 'In Service', source: srcJanes, image_url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/PzH_2000_Bundeswehr_2.jpg', wikipedia_url: 'https://en.wikipedia.org/wiki/PzH_2000' },
  { id: 'p-boxer', name: 'Boxer MRAV', category: 'Land Systems', subcategory: 'APC', manufacturer: 'Rheinmetall', status: 'In Service', source: srcJanes, image_url: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Boxer_MRAV_ILA_2004.jpg', wikipedia_url: 'https://en.wikipedia.org/wiki/Boxer_MRAV' },
  { id: 'p-himars', name: 'M142 HIMARS', category: 'Land Systems', subcategory: 'MLRS', manufacturer: 'Lockheed Martin', status: 'In Service', source: srcDod, image_url: 'https://upload.wikimedia.org/wikipedia/commons/2/21/HIMARS_launch_at_Ft._Sill.jpg', wikipedia_url: 'https://en.wikipedia.org/wiki/M142_HIMARS' },

  // ── Missile Defense ───────────────────────────────────────────────
  { id: 'p-pac3', name: 'PAC-3 MSE', category: 'Missile Defense', subcategory: 'SAM', manufacturer: 'Lockheed Martin', status: 'In Service', source: srcDod, image_url: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/MIM-104_Patriot.JPG', wikipedia_url: 'https://en.wikipedia.org/wiki/MIM-104_Patriot' },
  { id: 'p-sampt', name: 'SAMP/T Mamba', category: 'Missile Defense', subcategory: 'SAM', manufacturer: 'Thales / MBDA', status: 'In Service', source: srcJanes, image_url: '', wikipedia_url: 'https://en.wikipedia.org/wiki/SAMP/T' },
  { id: 'p-thaad', name: 'THAAD', category: 'Missile Defense', subcategory: 'BMD', manufacturer: 'Lockheed Martin', status: 'In Service', source: srcDod, image_url: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/THAAD_Battery_Deployment.jpg', wikipedia_url: 'https://en.wikipedia.org/wiki/Terminal_High_Altitude_Area_Defense' },
  { id: 'p-crotale', name: 'Crotale NG', category: 'Missile Defense', subcategory: 'SHORAD', manufacturer: 'Thales', status: 'In Service', source: srcJanes, image_url: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Unit%C3%A9_de_tir_Crotale.jpg', wikipedia_url: 'https://en.wikipedia.org/wiki/Crotale_(missile)' },
  { id: 'p-spyder', name: 'SPYDER', category: 'Missile Defense', subcategory: 'SAM', manufacturer: 'Rafael / IAI', status: 'In Service', source: srcJanes, image_url: '', wikipedia_url: 'https://en.wikipedia.org/wiki/SPYDER' },

  // ── Naval ─────────────────────────────────────────────────────────
  { id: 'p-fremm', name: 'FREMM Frigate', category: 'Naval', subcategory: 'Frigate', manufacturer: 'Fincantieri / Naval Group', status: 'In Service', source: srcJanes, image_url: 'https://upload.wikimedia.org/wikipedia/commons/a/af/FREMM_Aquitaine_D650.jpg', wikipedia_url: 'https://en.wikipedia.org/wiki/FREMM_multipurpose_frigate' },
  { id: 'p-type26', name: 'Type 26 City Class', category: 'Naval', subcategory: 'Frigate', manufacturer: 'BAE Systems', status: 'In Service', source: srcJanes, image_url: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/HMS_Glasgow_BAE_Systems_Barrow_2024.jpg', wikipedia_url: 'https://en.wikipedia.org/wiki/Type_26_frigate' },
  { id: 'p-iver-huitfeldt', name: 'Iver Huitfeldt Class', category: 'Naval', subcategory: 'Frigate', manufacturer: 'Odense Shipyard', status: 'In Service', source: srcJanes, image_url: '', wikipedia_url: 'https://en.wikipedia.org/wiki/Iver_Huitfeldt-class_frigate' },
  { id: 'p-virginia', name: 'Virginia Class SSN', category: 'Naval', subcategory: 'Submarine', manufacturer: 'General Dynamics', status: 'In Service', source: srcDod, image_url: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/USS_Virginia_SSN-774_sea_trials.jpg', wikipedia_url: 'https://en.wikipedia.org/wiki/Virginia-class_submarine' },
  { id: 'p-astute', name: 'Astute Class SSN', category: 'Naval', subcategory: 'Submarine', manufacturer: 'BAE Systems', status: 'In Service', source: srcJanes, image_url: '', wikipedia_url: 'https://en.wikipedia.org/wiki/Astute-class_submarine' },

  // ── Radar / Electronics ───────────────────────────────────────────
  { id: 'p-gm200', name: 'Ground Master 200', category: 'Radar', subcategory: 'Air Surveillance', manufacturer: 'Thales', status: 'In Service', source: srcJanes, image_url: 'https://upload.wikimedia.org/wikipedia/commons/5/56/GM200_in_Evreux.jpg', wikipedia_url: 'https://en.wikipedia.org/wiki/Ground_Master_200' },
  { id: 'p-globaleye', name: 'GlobalEye AEW&C', category: 'Radar', subcategory: 'Airborne', manufacturer: 'Saab', status: 'In Service', source: srcJanes, image_url: '', wikipedia_url: 'https://en.wikipedia.org/wiki/Saab_GlobalEye' },
  { id: 'p-e7', name: 'E-7 Wedgetail', category: 'Radar', subcategory: 'Airborne', manufacturer: 'Boeing Defense', status: 'In Service', source: srcDod, image_url: 'https://upload.wikimedia.org/wikipedia/commons/3/30/RAAF_Wedgetail.jpg', wikipedia_url: 'https://en.wikipedia.org/wiki/Boeing_E-7' },

  // ── Unmanned Systems ──────────────────────────────────────────────
  { id: 'p-reaper', name: 'MQ-9B Reaper', category: 'Unmanned', subcategory: 'MALE UAV', manufacturer: 'General Atomics', status: 'In Service', source: srcDod, image_url: 'https://upload.wikimedia.org/wikipedia/commons/6/66/MQ-9_Reaper_UAV.jpg', wikipedia_url: 'https://en.wikipedia.org/wiki/General_Atomics_MQ-9_Reaper' },
  { id: 'p-tb2', name: 'Bayraktar TB2', category: 'Unmanned', subcategory: 'MALE UAV', manufacturer: 'Baykar', status: 'In Service', source: srcJanes, image_url: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Bayraktar_TB2_2021.jpg', wikipedia_url: 'https://en.wikipedia.org/wiki/Bayraktar_TB2' },
  { id: 'p-heron-tp', name: 'Heron TP', category: 'Unmanned', subcategory: 'MALE UAV', manufacturer: 'IAI', status: 'In Service', source: srcJanes, image_url: '', wikipedia_url: 'https://en.wikipedia.org/wiki/IAI_Heron' },
  { id: 'p-ghost-x', name: 'Ghost-X UCAV', category: 'Unmanned', subcategory: 'UCAV', manufacturer: 'Airbus Defence', status: 'In Development', source: srcJanes, image_url: '', wikipedia_url: '' },

  // ── C2 / Communications ───────────────────────────────────────────
  { id: 'p-bms', name: 'BMS Scorpion', category: 'C2 Systems', subcategory: 'Land C2', manufacturer: 'Thales', status: 'In Service', source: srcJanes, image_url: '', wikipedia_url: '' },
  { id: 'p-link22', name: 'Link 22 NILE', category: 'C2 Systems', subcategory: 'Tactical Link', manufacturer: 'L3Harris', status: 'In Service', source: srcDod, image_url: '', wikipedia_url: 'https://en.wikipedia.org/wiki/Link_22' },
];

export const followEntities: FollowEntity[] = [
  {
    id: 'f1',
    entity_type: 'authority',
    entity_name: 'NATO Allied Command Transformation',
    country_code: 'BE',
    platform: 'website',
    account_handle: 'nato-act',
    profile_url: 'https://www.act.nato.int/',
    feed_url: 'https://www.act.nato.int/feed/',
    priority_level: 'high',
    is_official: true,
    is_active: true,
    description: 'Capability development and interoperability updates.',
    region: 'Europe',
    category_tags: ['institutional', 'official'],
  },
  {
    id: 'f2',
    entity_type: 'company',
    entity_name: 'Thales',
    related_company_id: 'cmp-thales',
    country_code: 'FR',
    platform: 'linkedin',
    profile_url: 'https://www.linkedin.com/company/thales/',
    priority_level: 'high',
    is_official: true,
    is_active: true,
    description: 'Corporate updates and contract announcements.',
    category_tags: ['company', 'official'],
  },
  {
    id: 'f3',
    entity_type: 'media',
    entity_name: 'Defense News',
    country_code: 'US',
    platform: 'website',
    profile_url: 'https://www.defensenews.com/',
    priority_level: 'medium',
    is_official: false,
    is_active: true,
    description: 'Tier-1 defense specialist media outlet.',
    category_tags: ['media', 'specialist'],
  },
  {
    id: 'f4',
    entity_type: 'analyst',
    entity_name: 'Strategic Defence Analysis Desk',
    country_code: 'GB',
    platform: 'x',
    account_handle: '@SDADesk',
    profile_url: 'https://x.com/SDADesk',
    priority_level: 'low',
    is_official: false,
    is_active: true,
    description: 'Commentary and open-source defense analysis.',
    category_tags: ['analysis', 'commentary'],
  },
];

export const followItems: FollowItem[] = [
  {
    id: 'fi1',
    follow_entity_id: 'f1',
    entity_name: 'NATO Allied Command Transformation',
    platform: 'website',
    headline: 'NATO publishes updated force goals for integrated air defense',
    preview: 'Roadmap emphasizes sensor fusion and interoperable C2 networks.',
    related_country: 'NATO',
    publication_or_retrieval_date: '2026-03-01',
    direct_link: 'https://www.act.nato.int/article/example',
  },
  {
    id: 'fi2',
    follow_entity_id: 'f3',
    entity_name: 'Defense News',
    platform: 'website',
    headline: 'European procurement cycle accelerates for ground systems',
    preview: 'Multi-year procurement plans indicate stronger armored fleet demand.',
    related_country: 'France',
    publication_or_retrieval_date: '2026-02-27',
    direct_link: 'https://www.defensenews.com/example',
  },
  {
    id: 'fi3',
    follow_entity_id: 'f4',
    entity_name: 'Strategic Defence Analysis Desk',
    platform: 'x',
    preview: 'No latest post ingested; profile monitored for high-signal updates.',
    publication_or_retrieval_date: '2026-02-26',
    direct_link: 'https://x.com/SDADesk',
  },
];
