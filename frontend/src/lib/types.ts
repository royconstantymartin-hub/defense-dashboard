export type Trend = {
  direction: 'up' | 'down';
  value: string;
};

export type Kpi = {
  label: string;
  value: string;
  trend?: Trend;
};

export type SourceType = 'official' | 'media' | 'filing' | 'dataset' | 'social' | 'analyst';
export type TrustTier = 'official' | 'tier_1' | 'specialist' | 'secondary';

export type SourceMeta = {
  source_name: string;
  source_type: SourceType;
  publisher: string;
  source_url: string;
  source_title: string;
  publication_date?: string;
  retrieved_at: string;
  last_verified_at: string;
  trust_tier: TrustTier;
  source_logo_url?: string;
};

export type Country = {
  id: string;
  name: string;
  country_code: string;
  flag_emoji?: string;
  flag_image_url?: string;
  ministry_of_defense_url?: string;
  procurement_authority_url?: string;
  region: string;
  subregion?: string;
};

export type Company = {
  id: string;
  name: string;
  logo_url?: string;
  website_url?: string;
  investor_relations_url?: string;
  linkedin_url?: string;
  x_url?: string;
  country_code: string;
  short_description: string;
  country_name: string;
  segment: string;
  status: string;
};

export type AnnouncementRow = {
  id: string;
  headline: string;
  region: string;
  status: string;
  company_id?: string;
  country_code?: string;
  source: SourceMeta;
};

export type MaRow = {
  id: string;
  acquirer: string;
  target: string;
  value: string;
  stage: string;
  source: SourceMeta;
};

export type ExpenditureRow = {
  id: string;
  country: string;
  country_code: string;
  year: number;
  spend: string;
  gdp: string;
  source: SourceMeta;
};

export type RegulationRow = {
  id: string;
  jurisdiction: string;
  country_code: string;
  policy: string;
  effective: string;
  status: string;
  source: SourceMeta;
};

export type ProductRow = {
  id: string;
  name: string;
  category: string;
  manufacturer: string;
  status: string;
  source: SourceMeta;
  image_url?: string;
  wikipedia_url?: string;
};

export type FollowEntity = {
  id: string;
  entity_type: 'company' | 'authority' | 'executive' | 'media' | 'regulator' | 'armed_force' | 'analyst';
  entity_name: string;
  related_company_id?: string;
  related_country_id?: string;
  country_code?: string;
  platform: 'x' | 'linkedin' | 'website' | 'rss' | 'youtube';
  account_handle?: string;
  profile_url: string;
  feed_url?: string;
  priority_level: 'high' | 'medium' | 'low';
  is_official: boolean;
  is_active: boolean;
  source_reliability_notes?: string;
  avatar_url?: string;
  logo_url?: string;
  description?: string;
  language?: string;
  region?: string;
  category_tags?: string[];
};

export type FollowItem = {
  id: string;
  follow_entity_id: string;
  entity_name: string;
  platform: string;
  headline?: string;
  preview?: string;
  related_company?: string;
  related_country?: string;
  publication_or_retrieval_date: string;
  direct_link: string;
  avatar_url?: string;
  logo_url?: string;
};
