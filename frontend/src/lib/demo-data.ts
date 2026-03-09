import type {
  AnnouncementRow,
  Company,
  Country,
  ExpenditureRow,
  FollowEntity,
  FollowItem,
  Kpi,
  MaRow,
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
  { label: 'Tracked Defense Companies', value: '1,284', trend: { direction: 'up', value: '+3.2%' } },
  { label: 'Open M&A Situations', value: '46', trend: { direction: 'up', value: '+8.1%' } },
  { label: 'Verified Sources (30d)', value: '312', trend: { direction: 'up', value: '+11.4%' } },
  { label: 'Active Follow Entities', value: '198', trend: { direction: 'up', value: '+2.1%' } }
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

export const productRows: ProductRow[] = [
  { id: 'p1', name: 'Aquila Radar Block II', category: 'Sensors', manufacturer: 'Thales', status: 'Procurement', source: srcJanes },
  { id: 'p2', name: 'PAC-Next Interceptor', category: 'Missile Defense', manufacturer: 'Lockheed Martin', status: 'In Service', source: srcDod },
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
