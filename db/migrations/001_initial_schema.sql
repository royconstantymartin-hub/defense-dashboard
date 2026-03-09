CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE source_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_name TEXT NOT NULL UNIQUE,
    source_type TEXT NOT NULL,
    publisher TEXT,
    trust_tier TEXT NOT NULL,
    source_logo_url TEXT,
    base_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registry_id UUID REFERENCES source_registry(id),
    source_name TEXT NOT NULL,
    source_type TEXT NOT NULL,
    publisher TEXT,
    source_url TEXT NOT NULL,
    source_title TEXT,
    publication_date TIMESTAMPTZ,
    retrieved_at TIMESTAMPTZ,
    last_verified_at TIMESTAMPTZ,
    trust_tier TEXT NOT NULL,
    source_logo_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE countries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    country_code CHAR(2) NOT NULL UNIQUE,
    iso_code CHAR(3) NOT NULL UNIQUE,
    flag_emoji TEXT,
    flag_image_url TEXT,
    ministry_of_defense_url TEXT,
    procurement_authority_url TEXT,
    region TEXT,
    subregion TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    logo_url TEXT,
    website_url TEXT,
    investor_relations_url TEXT,
    linkedin_url TEXT,
    x_url TEXT,
    country_code CHAR(2),
    short_description TEXT,
    headquarters_country_id UUID REFERENCES countries(id),
    company_type TEXT,
    founded_year INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id),
    country_id UUID REFERENCES countries(id),
    source_id UUID NOT NULL REFERENCES sources(id),
    title TEXT NOT NULL,
    summary TEXT,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE mergers_acquisitions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id UUID NOT NULL REFERENCES sources(id),
    acquirer_company_id UUID NOT NULL REFERENCES companies(id),
    target_company_id UUID NOT NULL REFERENCES companies(id),
    announcement_date DATE,
    completion_date DATE,
    deal_value_usd NUMERIC(18, 2),
    status TEXT NOT NULL DEFAULT 'announced',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CHECK (acquirer_company_id <> target_company_id)
);

CREATE TABLE defense_expenditures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id UUID NOT NULL REFERENCES sources(id),
    country_id UUID NOT NULL REFERENCES countries(id),
    year INTEGER NOT NULL,
    expenditure_usd_billions NUMERIC(12, 2) NOT NULL,
    percent_gdp NUMERIC(5, 2),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(country_id, year)
);

CREATE TABLE regulations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id UUID NOT NULL REFERENCES sources(id),
    country_id UUID REFERENCES countries(id),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    policy_type TEXT,
    effective_date DATE,
    details TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id UUID NOT NULL REFERENCES sources(id),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    company_id UUID REFERENCES companies(id),
    country_id UUID REFERENCES countries(id),
    status TEXT,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (name, company_id)
);

CREATE TABLE follow_entities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type TEXT NOT NULL,
    entity_name TEXT NOT NULL,
    related_company_id UUID REFERENCES companies(id),
    related_country_id UUID REFERENCES countries(id),
    platform TEXT NOT NULL,
    account_handle TEXT,
    profile_url TEXT NOT NULL,
    feed_url TEXT,
    priority_level TEXT,
    is_official BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    source_reliability_notes TEXT,
    avatar_url TEXT,
    logo_url TEXT,
    description TEXT,
    language TEXT,
    region TEXT,
    category_tags TEXT[],
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE follow_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    follow_entity_id UUID NOT NULL REFERENCES follow_entities(id),
    source_id UUID REFERENCES sources(id),
    title TEXT,
    preview TEXT,
    link_url TEXT,
    publication_date TIMESTAMPTZ,
    retrieved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE dashboard_kpis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metric_key TEXT NOT NULL UNIQUE,
    metric_name TEXT NOT NULL,
    metric_value NUMERIC(18, 2) NOT NULL,
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
