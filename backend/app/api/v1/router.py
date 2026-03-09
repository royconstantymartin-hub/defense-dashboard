from fastapi import APIRouter

router = APIRouter()

MODULES = [
    'dashboard',
    'announcements',
    'mna_tracker',
    'companies_database',
    'defense_expenditures',
    'regulations_offset_policies',
    'defense_product_catalog',
    'follow',
]

SOURCES = [
    {
        'id': 'src-001',
        'source_name': 'US Department of Defense',
        'source_type': 'official',
        'publisher': 'DoD',
        'source_url': 'https://www.defense.gov/News/Releases/',
        'source_title': 'DoD News Releases',
        'publication_date': '2026-03-02T10:00:00Z',
        'retrieved_at': '2026-03-02T10:10:00Z',
        'last_verified_at': '2026-03-02T11:00:00Z',
        'trust_tier': 'official',
        'source_logo_url': 'https://www.defense.gov/portals/1/DesktopModules/ArticleCS/Print/logo.png',
    },
    {
        'id': 'src-002',
        'source_name': 'Defense News',
        'source_type': 'media',
        'publisher': 'Sightline Media Group',
        'source_url': 'https://www.defensenews.com/',
        'source_title': 'Defense News Coverage',
        'publication_date': '2026-02-28T13:20:00Z',
        'retrieved_at': '2026-02-28T14:00:00Z',
        'last_verified_at': '2026-02-28T14:05:00Z',
        'trust_tier': 'specialist',
        'source_logo_url': '',
    },
]

FOLLOW_ENTITIES = [
    {
        'id': 'fe-001',
        'entity_type': 'authority',
        'entity_name': 'NATO Allied Command Transformation',
        'related_company_id': None,
        'related_country_id': None,
        'platform': 'website',
        'account_handle': 'nato-act',
        'profile_url': 'https://www.act.nato.int/',
        'feed_url': 'https://www.act.nato.int/feed/',
        'priority_level': 'high',
        'is_official': True,
        'is_active': True,
        'source_reliability_notes': 'Official NATO body',
        'avatar_url': '',
        'logo_url': '',
        'description': 'Transformation and capability development updates.',
        'language': 'en',
        'region': 'Europe',
        'category_tags': ['institutional', 'nato'],
    },
    {
        'id': 'fe-002',
        'entity_type': 'media',
        'entity_name': 'Janes',
        'related_company_id': None,
        'related_country_id': None,
        'platform': 'website',
        'account_handle': 'janes',
        'profile_url': 'https://www.janes.com/',
        'feed_url': '',
        'priority_level': 'high',
        'is_official': False,
        'is_active': True,
        'source_reliability_notes': 'Defense specialist media',
        'avatar_url': '',
        'logo_url': '',
        'description': 'Specialist defense intelligence reporting.',
        'language': 'en',
        'region': 'Global',
        'category_tags': ['media', 'specialist'],
    },
]

FOLLOW_ITEMS = [
    {
        'id': 'fi-001',
        'follow_entity_id': 'fe-001',
        'entity_name': 'NATO Allied Command Transformation',
        'platform': 'website',
        'headline': 'NATO announces updated capability targets',
        'preview': 'New guidance highlights integrated air and missile defense priorities.',
        'related_company': '',
        'related_country': 'NATO',
        'published_at': '2026-03-01T09:00:00Z',
        'retrieved_at': '2026-03-01T09:20:00Z',
        'link_url': 'https://www.act.nato.int/article/capability-targets/',
    }
]


@router.get('/health')
def health_check() -> dict[str, str]:
    return {'status': 'ok'}


@router.get('/modules')
def list_modules() -> dict[str, list[str]]:
    return {'modules': MODULES}


@router.get('/dashboard/summary')
def dashboard_summary() -> dict[str, int]:
    return {
        'announcements_count': 0,
        'ma_deals_count': 0,
        'companies_count': 0,
        'products_count': 0,
    }


@router.get('/sources')
def list_sources() -> list[dict]:
    return SOURCES


@router.get('/follow/entities')
def list_follow_entities() -> list[dict]:
    return FOLLOW_ENTITIES


@router.get('/follow/items')
def list_follow_items() -> list[dict]:
    return FOLLOW_ITEMS


@router.get('/companies/{company_id}/detail')
def company_detail(company_id: str) -> dict:
    return {
        'id': company_id,
        'name': 'Aegis Dynamics',
        'official_links': {
            'website_url': 'https://www.aegisdynamics.example',
            'investor_relations_url': 'https://investors.aegisdynamics.example',
        },
        'social_links': {
            'linkedin_url': 'https://linkedin.com/company/aegisdynamics',
            'x_url': 'https://x.com/aegisdynamics',
        },
        'related_follow_entities': FOLLOW_ENTITIES,
        'recent_announcements': [],
        'recent_deals': [],
        'recent_products': [],
    }


@router.get('/countries/{country_code}/detail')
def country_detail(country_code: str) -> dict:
    return {
        'country_code': country_code,
        'name': 'United States',
        'official_links': {
            'ministry_of_defense_url': 'https://www.defense.gov/',
            'procurement_authority_url': 'https://sam.gov/',
        },
        'related_follow_entities': FOLLOW_ENTITIES,
        'recent_announcements': [],
        'recent_regulations': [],
        'expenditures_summary': {'year': 2025, 'spend_usd': '916B'},
    }
