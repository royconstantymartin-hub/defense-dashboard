from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.responses import FileResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import asyncio
import jwt
import bcrypt
from apscheduler.schedulers.asyncio import AsyncIOScheduler

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=5000)
db = client[os.environ['DB_NAME']]

# JWT Configuration
JWT_SECRET = os.environ.get('JWT_SECRET', 'defense-dashboard-secret-key-2024')
JWT_ALGORITHM = "HS256"

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")
security = HTTPBearer()
scheduler = AsyncIOScheduler(timezone="UTC")

# ============= MODELS =============

# Auth Models
class UserCreate(BaseModel):
    email: str
    password: str
    name: str

class UserLogin(BaseModel):
    email: str
    password: str

class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    name: str
    role: str = "user"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict

# Announcement Model
class AnnouncementCreate(BaseModel):
    title: str
    content: str
    source: str
    category: str  # contract, partnership, product_launch, regulatory
    company: Optional[str] = None

class Announcement(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    content: str
    source: str
    category: str
    company: Optional[str] = None
    date: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# M&A Model
class MAActivityCreate(BaseModel):
    acquirer: str
    target: str
    deal_value: float  # in millions USD
    status: str  # announced, pending, completed, cancelled
    deal_type: str  # acquisition, merger, joint_venture
    description: str
    acquirer_country: Optional[str] = None   # ISO 3166-1 alpha-2
    target_country: Optional[str] = None
    acquirer_logo_domain: Optional[str] = None
    target_logo_domain: Optional[str] = None
    source_url: Optional[str] = None
    rationale: Optional[str] = None          # 2-3 sentence strategic context

class MAActivity(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    acquirer: str
    target: str
    deal_value: float
    status: str
    deal_type: str
    description: str
    announced_date: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    acquirer_country: Optional[str] = None
    target_country: Optional[str] = None
    acquirer_logo_domain: Optional[str] = None
    target_logo_domain: Optional[str] = None
    source_url: Optional[str] = None
    rationale: Optional[str] = None

# Defense Player Model
class DefensePlayerCreate(BaseModel):
    name: str
    ticker: str
    country: str
    market_cap: float  # in billions USD
    stock_price: float
    change_percent: float
    revenue: float  # in billions USD
    employees: int
    specializations: List[str]

class DefensePlayer(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    ticker: str
    country: str
    market_cap: float
    stock_price: float
    change_percent: float
    revenue: float
    employees: int
    specializations: List[str]
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Defense Expenditure Model
class ExpenditureCreate(BaseModel):
    country: str
    country_code: str
    year: int
    expenditure: float  # in billions USD
    gdp_percent: float
    region: str

class Expenditure(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    country: str
    country_code: str
    year: int
    expenditure: float
    gdp_percent: float
    region: str

# Regulation Model
class RegulationCreate(BaseModel):
    title: str
    country: str
    category: str  # offset, export_control, procurement, itar
    description: str
    requirements: List[str]
    effective_date: str

class Regulation(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    country: str
    category: str
    description: str
    requirements: List[str]
    effective_date: str

# Product Portfolio Model
class ProductCreate(BaseModel):
    name: str
    manufacturer: str
    category: str  # aircraft, naval, land, missile, cyber, space
    product_type: str  # fighter, bomber, frigate, tank, etc.
    specifications: dict  # speed, range, payload, etc.
    materials: List[str]
    status: str  # active, development, retired
    image_url: Optional[str] = None

class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    manufacturer: str
    category: str
    product_type: str
    specifications: dict
    materials: List[str]
    status: str
    image_url: Optional[str] = None

# News Article Model
class NewsArticle(BaseModel):
    model_config = ConfigDict(extra="ignore")
    title: str
    url: str
    image: Optional[str] = None
    summary: str = ""
    source: str
    publishedAt: datetime
    scrapedAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    category: str = "INDUSTRY"

# ============= AUTH HELPERS =============

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode(), hashed.encode())

def create_token(user_id: str, email: str, role: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "role": role,
        "exp": datetime.now(timezone.utc).timestamp() + 86400  # 24 hours
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ============= AUTH ROUTES =============

@api_router.post("/auth/register", response_model=TokenResponse)
async def register(user_data: UserCreate):
    existing = await db.users.find_one({"email": user_data.email}, {"_id": 0})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user = User(email=user_data.email, name=user_data.name)
    user_dict = user.model_dump()
    user_dict['password_hash'] = hash_password(user_data.password)
    user_dict['created_at'] = user_dict['created_at'].isoformat()
    
    await db.users.insert_one(user_dict)
    token = create_token(user.id, user.email, user.role)
    
    return TokenResponse(
        access_token=token,
        user={"id": user.id, "email": user.email, "name": user.name, "role": user.role}
    )

@api_router.post("/auth/login", response_model=TokenResponse)
async def login(credentials: UserLogin):
    user = await db.users.find_one({"email": credentials.email}, {"_id": 0})
    if not user or not verify_password(credentials.password, user['password_hash']):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_token(user['id'], user['email'], user['role'])
    return TokenResponse(
        access_token=token,
        user={"id": user['id'], "email": user['email'], "name": user['name'], "role": user['role']}
    )

@api_router.get("/auth/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    user = await db.users.find_one({"id": current_user['sub']}, {"_id": 0, "password_hash": 0})
    return user

# ============= ANNOUNCEMENTS ROUTES =============

@api_router.get("/announcements", response_model=List[Announcement])
async def get_announcements(category: Optional[str] = None, limit: int = 50):
    query = {}
    if category:
        query["category"] = category
    announcements = await db.announcements.find(query, {"_id": 0}).sort("date", -1).limit(limit).to_list(limit)
    for a in announcements:
        if isinstance(a['date'], str):
            a['date'] = datetime.fromisoformat(a['date'])
    return announcements

@api_router.post("/announcements", response_model=Announcement)
async def create_announcement(data: AnnouncementCreate, current_user: dict = Depends(get_current_user)):
    announcement = Announcement(**data.model_dump())
    doc = announcement.model_dump()
    doc['date'] = doc['date'].isoformat()
    await db.announcements.insert_one(doc)
    return announcement

@api_router.delete("/announcements/{announcement_id}")
async def delete_announcement(announcement_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.announcements.delete_one({"id": announcement_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Announcement not found")
    return {"status": "deleted"}

# ============= M&A ROUTES =============

@api_router.get("/ma-activities", response_model=List[MAActivity])
async def get_ma_activities(status: Optional[str] = None, limit: int = 50):
    query = {}
    if status:
        query["status"] = status
    activities = await db.ma_activities.find(query, {"_id": 0}).sort("announced_date", -1).limit(limit).to_list(limit)
    for a in activities:
        if isinstance(a['announced_date'], str):
            a['announced_date'] = datetime.fromisoformat(a['announced_date'])
    return activities

@api_router.get("/ma-activities/historical", response_model=List[MAActivity])
async def get_ma_historical(
    acquirer: Optional[str] = None,
    year: Optional[int] = None,
    deal_type: Optional[str] = None,
    limit: int = 200
):
    """Return all M&A activities for the historical 5-year table view."""
    query: dict = {}
    if acquirer:
        query["acquirer"] = {"$regex": acquirer, "$options": "i"}
    if deal_type:
        query["deal_type"] = deal_type
    if year:
        from_dt = datetime(year, 1, 1, tzinfo=timezone.utc).isoformat()
        to_dt = datetime(year, 12, 31, 23, 59, 59, tzinfo=timezone.utc).isoformat()
        query["announced_date"] = {"$gte": from_dt, "$lte": to_dt}
    activities = await db.ma_activities.find(query, {"_id": 0}).sort("announced_date", -1).limit(limit).to_list(limit)
    for a in activities:
        if isinstance(a['announced_date'], str):
            a['announced_date'] = datetime.fromisoformat(a['announced_date'])
    return activities

@api_router.post("/ma-activities", response_model=MAActivity)
async def create_ma_activity(data: MAActivityCreate, current_user: dict = Depends(get_current_user)):
    activity = MAActivity(**data.model_dump())
    doc = activity.model_dump()
    doc['announced_date'] = doc['announced_date'].isoformat()
    await db.ma_activities.insert_one(doc)
    return activity

@api_router.delete("/ma-activities/{activity_id}")
async def delete_ma_activity(activity_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.ma_activities.delete_one({"id": activity_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Activity not found")
    return {"status": "deleted"}

@api_router.post("/ma-activities/scrape")
async def trigger_ma_scrape(current_user: dict = Depends(get_current_user)):
    """Manually trigger the M&A scraper job."""
    result = await run_ma_scraper_job()
    return result

# ============= DEFENSE PLAYERS ROUTES =============

@api_router.get("/defense-players", response_model=List[DefensePlayer])
async def get_defense_players(country: Optional[str] = None):
    query = {}
    if country:
        query["country"] = country
    players = await db.defense_players.find(query, {"_id": 0}).sort("market_cap", -1).to_list(100)
    for p in players:
        if isinstance(p.get('updated_at'), str):
            p['updated_at'] = datetime.fromisoformat(p['updated_at'])
    return players

@api_router.post("/defense-players", response_model=DefensePlayer)
async def create_defense_player(data: DefensePlayerCreate, current_user: dict = Depends(get_current_user)):
    player = DefensePlayer(**data.model_dump())
    doc = player.model_dump()
    doc['updated_at'] = doc['updated_at'].isoformat()
    await db.defense_players.insert_one(doc)
    return player

@api_router.put("/defense-players/{player_id}", response_model=DefensePlayer)
async def update_defense_player(player_id: str, data: DefensePlayerCreate, current_user: dict = Depends(get_current_user)):
    doc = data.model_dump()
    doc['updated_at'] = datetime.now(timezone.utc).isoformat()
    result = await db.defense_players.update_one({"id": player_id}, {"$set": doc})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Player not found")
    updated = await db.defense_players.find_one({"id": player_id}, {"_id": 0})
    return updated

@api_router.delete("/defense-players/{player_id}")
async def delete_defense_player(player_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.defense_players.delete_one({"id": player_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Player not found")
    return {"status": "deleted"}

# ============= EXPENDITURES ROUTES =============

@api_router.get("/expenditures", response_model=List[Expenditure])
async def get_expenditures(year: Optional[int] = None, region: Optional[str] = None):
    query = {}
    if year:
        query["year"] = year
    if region:
        query["region"] = region
    return await db.expenditures.find(query, {"_id": 0}).sort("expenditure", -1).to_list(500)

@api_router.post("/expenditures", response_model=Expenditure)
async def create_expenditure(data: ExpenditureCreate, current_user: dict = Depends(get_current_user)):
    expenditure = Expenditure(**data.model_dump())
    await db.expenditures.insert_one(expenditure.model_dump())
    return expenditure

@api_router.delete("/expenditures/{expenditure_id}")
async def delete_expenditure(expenditure_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.expenditures.delete_one({"id": expenditure_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Expenditure not found")
    return {"status": "deleted"}

# ============= REGULATIONS ROUTES =============

@api_router.get("/regulations", response_model=List[Regulation])
async def get_regulations(category: Optional[str] = None, country: Optional[str] = None):
    query = {}
    if category:
        query["category"] = category
    if country:
        query["country"] = country
    return await db.regulations.find(query, {"_id": 0}).to_list(200)

@api_router.post("/regulations", response_model=Regulation)
async def create_regulation(data: RegulationCreate, current_user: dict = Depends(get_current_user)):
    regulation = Regulation(**data.model_dump())
    await db.regulations.insert_one(regulation.model_dump())
    return regulation

@api_router.delete("/regulations/{regulation_id}")
async def delete_regulation(regulation_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.regulations.delete_one({"id": regulation_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Regulation not found")
    return {"status": "deleted"}

# ============= PRODUCTS ROUTES =============

@api_router.get("/products", response_model=List[Product])
async def get_products(category: Optional[str] = None, manufacturer: Optional[str] = None):
    query = {}
    if category:
        query["category"] = category
    if manufacturer:
        query["manufacturer"] = manufacturer
    return await db.products.find(query, {"_id": 0}).to_list(500)

@api_router.post("/products", response_model=Product)
async def create_product(data: ProductCreate, current_user: dict = Depends(get_current_user)):
    product = Product(**data.model_dump())
    await db.products.insert_one(product.model_dump())
    return product

@api_router.put("/products/{product_id}", response_model=Product)
async def update_product(product_id: str, data: ProductCreate, current_user: dict = Depends(get_current_user)):
    result = await db.products.update_one({"id": product_id}, {"$set": data.model_dump()})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    updated = await db.products.find_one({"id": product_id}, {"_id": 0})
    return updated

@api_router.delete("/products/{product_id}")
async def delete_product(product_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.products.delete_one({"id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"status": "deleted"}

# ============= DASHBOARD STATS =============

@api_router.get("/dashboard/stats")
async def get_dashboard_stats():
    players_count = await db.defense_players.count_documents({})
    announcements_count = await db.announcements.count_documents({})
    ma_count = await db.ma_activities.count_documents({})
    products_count = await db.products.count_documents({})
    
    # Get total market cap
    pipeline = [{"$group": {"_id": None, "total": {"$sum": "$market_cap"}}}]
    market_cap_result = await db.defense_players.aggregate(pipeline).to_list(1)
    total_market_cap = market_cap_result[0]['total'] if market_cap_result else 0
    
    # Get total expenditure for latest year
    expenditure_pipeline = [
        {"$group": {"_id": "$year", "total": {"$sum": "$expenditure"}}},
        {"$sort": {"_id": -1}},
        {"$limit": 1}
    ]
    exp_result = await db.expenditures.aggregate(expenditure_pipeline).to_list(1)
    total_expenditure = exp_result[0]['total'] if exp_result else 0
    latest_year = exp_result[0]['_id'] if exp_result else 2024
    
    return {
        "players_count": players_count,
        "announcements_count": announcements_count,
        "ma_count": ma_count,
        "products_count": products_count,
        "total_market_cap": total_market_cap,
        "total_expenditure": total_expenditure,
        "expenditure_year": latest_year
    }

# ============= SEED DATA ENDPOINT =============

@api_router.post("/seed-data")
async def seed_data():
    from data.seed_data import DEFENSE_COMPANIES, ANNOUNCEMENTS_DATA, MA_DATA, MA_EXTRA_DEALS, EXPENDITURES_DATA, REGULATIONS_DATA, PRODUCTS_DATA
    
    # Seed Defense Players (250+ companies)
    for p in DEFENSE_COMPANIES:
        existing = await db.defense_players.find_one({"ticker": p['ticker']})
        if not existing:
            player = DefensePlayer(**p)
            doc = player.model_dump()
            doc['updated_at'] = doc['updated_at'].isoformat()
            await db.defense_players.insert_one(doc)
    
    # Seed Announcements
    for a in ANNOUNCEMENTS_DATA:
        existing = await db.announcements.find_one({"title": a['title']})
        if not existing:
            announcement = Announcement(**a)
            doc = announcement.model_dump()
            doc['date'] = doc['date'].isoformat()
            await db.announcements.insert_one(doc)
    
    # Seed M&A Activities — upsert so enriched fields are applied to existing docs
    for m in MA_DATA + MA_EXTRA_DEALS:
        activity = MAActivity(**m)
        doc = activity.model_dump()
        doc['announced_date'] = doc['announced_date'].isoformat()
        await db.ma_activities.update_one(
            {"acquirer": m['acquirer'], "target": m['target']},
            {"$set": doc},
            upsert=True,
        )
    
    # Seed Expenditures
    for e in EXPENDITURES_DATA:
        existing = await db.expenditures.find_one({"country_code": e['country_code'], "year": e['year']})
        if not existing:
            expenditure = Expenditure(**e)
            await db.expenditures.insert_one(expenditure.model_dump())
    
    # Seed Regulations
    for r in REGULATIONS_DATA:
        existing = await db.regulations.find_one({"title": r['title']})
        if not existing:
            regulation = Regulation(**r)
            await db.regulations.insert_one(regulation.model_dump())
    
    # Seed Products (insert new, update image_url for existing)
    for p in PRODUCTS_DATA:
        existing = await db.products.find_one({"name": p['name']})
        if not existing:
            product = Product(**p)
            await db.products.insert_one(product.model_dump())
        elif p.get('image_url') and existing.get('image_url') != p.get('image_url'):
            await db.products.update_one(
                {"name": p['name']},
                {"$set": {"image_url": p['image_url']}}
            )
    
    # Get counts
    players_count = await db.defense_players.count_documents({})
    announcements_count = await db.announcements.count_documents({})
    
    return {"status": "Data seeded successfully", "companies": players_count, "announcements": announcements_count}

# ============= NEWS SCRAPER JOB =============

async def run_news_scraper_job() -> dict:
    """Run the scraper pipeline, deduplicate, and upsert results into MongoDB."""
    from services.news_scraper import scrape_all_sources, deduplicate_articles

    # Sources whose content is defence-focused — no minimum score required
    _SPECIALTY_SOURCES = {
        "Breaking Defense", "The Defense Post", "Defense News",
        "Defense Industry Daily", "Opex360", "Meta-Défense", "NATO", "Janes",
    }
    _FR_SOURCES = {"Opex360", "Meta-Défense", "Le Monde", "Le Figaro", "Les Echos"}
    _SOURCE_REGION = {
        "Breaking Defense": "us",   "Defense News": "us",   "Defense Industry Daily": "us",
        "Opex360": "europe",        "Meta-Défense": "europe",
        "Le Monde": "europe",       "Le Figaro": "europe",  "Les Echos": "europe",
        "NATO": "europe",
        "The Defense Post": "global", "BBC News": "global",
        "The Guardian": "global",     "Janes": "global",
    }

    logger.info("News scraper job started")
    try:
        raw_articles = await asyncio.to_thread(scrape_all_sources)
        articles_found = len(raw_articles)

        unique_articles = deduplicate_articles(raw_articles)
        duplicates_removed = articles_found - len(unique_articles)

        # Drop clearly off-topic articles from mainstream sources
        MIN_MAINSTREAM_SCORE = 20
        unique_articles = [
            a for a in unique_articles
            if a.get("source") in _SPECIALTY_SOURCES
            or a.get("relevanceScore", 0) >= MIN_MAINSTREAM_SCORE
        ]

        # Sort by relevance (desc) then date (desc), keep top 40
        unique_articles.sort(
            key=lambda x: (
                x.get("relevanceScore", 0),
                x.get("publishedAt", datetime.min.replace(tzinfo=timezone.utc)),
            ),
            reverse=True,
        )
        unique_articles = unique_articles[:40]

        scraped_at = datetime.now(timezone.utc)
        saved = 0
        for article in unique_articles:
            try:
                pub_at = article.get("publishedAt", scraped_at)
                src    = article.get("source", "")
                lang   = article.get("language") or ("fr" if src in _FR_SOURCES else "en")
                region = article.get("region")   or _SOURCE_REGION.get(src, "global")
                doc = {
                    "title":          article.get("title", ""),
                    "url":            article.get("url", ""),
                    "image":          article.get("image"),
                    "summary":        article.get("summary", ""),
                    "source":         src,
                    "publishedAt":    pub_at.isoformat() if isinstance(pub_at, datetime) else pub_at,
                    "scrapedAt":      scraped_at.isoformat(),
                    "category":       article.get("category", "INDUSTRY"),
                    "relevanceScore": article.get("relevanceScore", 0),
                    "language":       lang,
                    "region":         region,
                }
                await db.news_articles.update_one(
                    {"url": doc["url"]},
                    {"$set": doc},
                    upsert=True,
                )
                saved += 1
            except Exception as exc:
                logger.error("Error saving article '%s': %s", article.get("title", ""), exc)

        stats = {
            "sources_attempted":  len(_SPECIALTY_SOURCES) + 3,  # specialty + mainstream
            "articles_found":     articles_found,
            "duplicates_removed": duplicates_removed,
            "articles_saved":     saved,
        }
        logger.info("News scraper job complete: %s", stats)
        return stats

    except Exception as exc:
        logger.error("News scraper job failed: %s", exc)
        raise

# ============= NEWS ROUTES =============

# Source-level metadata used both for query fallback and response normalisation
_FR_SOURCES     = ["Opex360", "Meta-Défense", "Le Monde", "Le Figaro", "Les Echos"]
_FR_SOURCES_SET = set(_FR_SOURCES)
_SOURCE_REGION_MAP: dict = {
    "Breaking Defense": "us",   "Defense News": "us",   "Defense Industry Daily": "us",
    "Opex360": "europe",        "Meta-Défense": "europe",
    "Le Monde": "europe",       "Le Figaro": "europe",  "Les Echos": "europe",
    "NATO": "europe",
    "The Defense Post": "global", "BBC News": "global",
    "The Guardian": "global",     "Janes": "global",
}
# Invert: region → list of sources whose default region is that value
_REGION_SOURCES: dict = {}
for _src, _rgn in _SOURCE_REGION_MAP.items():
    _REGION_SOURCES.setdefault(_rgn, []).append(_src)


# Specialty sources are defence-focused — show even if relevance score is low.
# Mainstream sources (BBC, Le Monde, etc.) must cross the relevance threshold.
_SPECIALTY_SOURCES_LIST = [
    "Breaking Defense", "The Defense Post", "Defense News",
    "Defense Industry Daily", "Opex360", "Meta-Défense", "NATO", "Janes",
]
_MIN_MAINSTREAM_SCORE = 15


def _build_news_query(
    language: Optional[str],
    region: Optional[str],
    cutoff: str,
) -> dict:
    """
    Build a MongoDB query that works for both new articles (with language/region fields)
    and old articles (without those fields, identified by source name).
    """
    conditions: list = [{"scrapedAt": {"$gte": cutoff}}]

    # Always enforce: specialty sources OR sufficient relevance score
    conditions.append({"$or": [
        {"source": {"$in": _SPECIALTY_SOURCES_LIST}},
        {"relevanceScore": {"$gte": _MIN_MAINSTREAM_SCORE}},
    ]})

    if language == "fr":
        conditions.append({"$or": [
            {"language": "fr"},
            {"source": {"$in": _FR_SOURCES}, "language": {"$exists": False}},
        ]})
    elif language == "en":
        conditions.append({"$or": [
            {"language": "en"},
            {"source": {"$nin": _FR_SOURCES}, "language": {"$exists": False}},
        ]})

    if region and region != "all":
        src_for_region = _REGION_SOURCES.get(region, [])
        region_or: list = [{"region": region}]
        if src_for_region:
            region_or.append({"source": {"$in": src_for_region}, "region": {"$exists": False}})
        conditions.append({"$or": region_or})

    return {"$and": conditions} if len(conditions) > 1 else conditions[0]


def _normalise_article(a: dict) -> dict:
    """Ensure every article has correct datetime, language, and region fields."""
    for field in ("publishedAt", "scrapedAt"):
        val = a.get(field)
        if isinstance(val, str):
            try:
                a[field] = datetime.fromisoformat(val)
            except Exception:
                a[field] = datetime.now(timezone.utc)
    a.setdefault("relevanceScore", 0)
    # Derive language from source name when the field is absent (old articles)
    src = a.get("source", "")
    if not a.get("language"):
        a["language"] = "fr" if src in _FR_SOURCES_SET else "en"
    # Derive region from source name when the field is absent
    if not a.get("region"):
        a["region"] = _SOURCE_REGION_MAP.get(src, "global")
    return a


@api_router.get("/news")
async def get_news(
    language: Optional[str] = None,
    region: Optional[str] = None,
    limit: int = 30,
):
    """
    Return up to `limit` articles (max 50) sorted by relevance then date.
    Optional filters: language ("en"|"fr"), region ("us"|"europe"|"asia-pacific"|…).
    Falls back to the most recent batch when no fresh articles match.
    """
    limit = min(max(limit, 1), 50)
    cutoff = (datetime.now(timezone.utc) - timedelta(hours=24)).isoformat()

    query = _build_news_query(language, region, cutoff)
    articles = await db.news_articles.find(
        query, {"_id": 0}
    ).sort([("relevanceScore", -1), ("publishedAt", -1)]).limit(limit).to_list(limit)

    if not articles:
        # Fallback: ignore time window but keep lang/region filters
        fb_query = _build_news_query(language, region, "1970-01-01T00:00:00+00:00")
        articles = await db.news_articles.find(
            fb_query, {"_id": 0}
        ).sort([("relevanceScore", -1), ("publishedAt", -1)]).limit(limit).to_list(limit)

    return [_normalise_article(a) for a in articles]


# ============= BOOKMARKS =============

class BookmarkIn(BaseModel):
    article: dict

@api_router.get("/bookmarks")
async def get_bookmarks(current_user: dict = Depends(get_current_user)):
    """Return all bookmarks for the authenticated user."""
    user_id = current_user["sub"]
    bookmarks = await db.bookmarks.find(
        {"userId": user_id}, {"_id": 0}
    ).sort("bookmarkedAt", -1).to_list(200)
    return bookmarks

@api_router.post("/bookmarks", status_code=201)
async def add_bookmark(data: BookmarkIn, current_user: dict = Depends(get_current_user)):
    """Bookmark an article (idempotent — returns 201 or 200 if already exists)."""
    user_id = current_user["sub"]
    url = data.article.get("url", "")
    if not url:
        raise HTTPException(status_code=400, detail="Article URL is required")
    existing = await db.bookmarks.find_one({"userId": user_id, "article.url": url})
    if existing:
        return {"status": "exists"}
    await db.bookmarks.insert_one({
        "id": str(uuid.uuid4()),
        "userId": user_id,
        "article": data.article,
        "bookmarkedAt": datetime.now(timezone.utc).isoformat(),
    })
    return {"status": "created"}

@api_router.delete("/bookmarks")
async def remove_bookmark(url: str, current_user: dict = Depends(get_current_user)):
    """Remove a bookmarked article by URL."""
    user_id = current_user["sub"]
    await db.bookmarks.delete_one({"userId": user_id, "article.url": url})
    return {"status": "deleted"}


# ============= AI SUMMARY =============

class AISummaryIn(BaseModel):
    url: str
    title: str
    summary: str = ""

@api_router.post("/news/ai-summary")
async def get_ai_summary(data: AISummaryIn, current_user: dict = Depends(get_current_user)):
    """
    Generate a 3-bullet AI brief for an article using Claude.
    Result is cached in the news_articles document.
    """
    # Check cache first
    cached = await db.news_articles.find_one({"url": data.url}, {"aiSummary": 1})
    if cached and cached.get("aiSummary"):
        return {"bullets": cached["aiSummary"]}

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        raise HTTPException(status_code=503, detail="AI summary not configured (missing ANTHROPIC_API_KEY)")

    try:
        import anthropic
        client = anthropic.Anthropic(api_key=api_key)
        message = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=300,
            messages=[{
                "role": "user",
                "content": (
                    "You are a defense intelligence analyst. "
                    "Given this article, provide exactly 3 concise key takeaways as bullet points. "
                    "Be factual and specific. Return only the 3 lines, each starting with '• '.\n\n"
                    f"Title: {data.title}\n"
                    f"Summary: {data.summary}"
                ),
            }]
        )
        raw = message.content[0].text.strip()
        bullets = [
            line.lstrip("•").lstrip("-").strip()
            for line in raw.split("\n")
            if line.strip() and not line.strip().isspace()
        ][:3]

        # Cache in DB
        await db.news_articles.update_one(
            {"url": data.url},
            {"$set": {"aiSummary": bullets}},
        )
        return {"bullets": bullets}

    except Exception as exc:
        logger.error("AI summary error: %s", exc)
        raise HTTPException(status_code=500, detail=f"AI summary failed: {exc}")


@api_router.post("/admin/scrape-news")
async def trigger_scrape(current_user: dict = Depends(get_current_user)):
    """Manually trigger the news scraper (requires authentication)."""
    stats = await run_news_scraper_job()
    return {"status": "ok", **stats}

# ============= M&A SCRAPER JOB =============

async def run_ma_scraper_job() -> dict:
    """Scrape defense M&A signals from RSS feeds, deduplicate, and upsert into MongoDB."""
    from services.ma_scraper import scrape_ma_signals, deduplicate_ma_signals

    logger.info("M&A scraper job started")
    try:
        raw_signals = await asyncio.to_thread(scrape_ma_signals)
        signals_found = len(raw_signals)

        unique_signals = deduplicate_ma_signals(raw_signals)
        duplicates_removed = signals_found - len(unique_signals)

        scraped_at = datetime.now(timezone.utc)
        saved = 0
        for signal in unique_signals:
            try:
                # Upsert by (acquirer_norm, target_norm) key — never create hallucinated entries
                key = {
                    "acquirer_norm": signal.get("acquirer_norm", ""),
                    "target_norm": signal.get("target_norm", ""),
                }
                if not key["acquirer_norm"] or not key["target_norm"]:
                    continue  # skip if extraction failed

                # Build the MAActivity doc — only fields extracted from real text
                activity = MAActivity(
                    acquirer=signal["acquirer"],
                    target=signal["target"],
                    deal_value=signal.get("deal_value", 0),
                    status=signal.get("status", "announced"),
                    deal_type=signal.get("deal_type", "acquisition"),
                    description=signal.get("description", ""),
                    announced_date=signal.get("announced_date", scraped_at),
                    source_url=signal.get("source_url"),
                    rationale=signal.get("rationale"),
                    acquirer_country=signal.get("acquirer_country"),
                    target_country=signal.get("target_country"),
                    acquirer_logo_domain=signal.get("acquirer_logo_domain"),
                    target_logo_domain=signal.get("target_logo_domain"),
                )
                doc = activity.model_dump()
                doc["announced_date"] = doc["announced_date"].isoformat()
                doc["acquirer_norm"] = key["acquirer_norm"]
                doc["target_norm"] = key["target_norm"]
                doc["scraped_at"] = scraped_at.isoformat()

                existing = await db.ma_activities.find_one(key, {"_id": 0})
                if not existing:
                    await db.ma_activities.insert_one(doc)
                    saved += 1
                # Don't overwrite manually curated entries
            except Exception as exc:
                logger.error("Error saving M&A signal '%s': %s", signal.get("acquirer", ""), exc)

        stats = {
            "signals_found": signals_found,
            "duplicates_removed": duplicates_removed,
            "new_deals_saved": saved,
        }
        logger.info("M&A scraper job complete: %s", stats)
        return stats

    except Exception as exc:
        logger.error("M&A scraper job failed: %s", exc)
        return {"error": str(exc)}

# ============= ROOT =============

@api_router.get("/")
async def root():
    return {"message": "Defense Dashboard API"}

@app.get("/health")
async def health():
    return {"status": "ok"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

async def _initial_scrape_if_empty():
    """Run one scrape in the background on cold start when the collection is empty."""
    try:
        count = await db.news_articles.count_documents({})
        if count == 0:
            logger.info("news_articles collection is empty — running initial scrape")
            await run_news_scraper_job()
    except Exception as exc:
        logger.error("Initial scrape error: %s", exc)

async def _migrate_ma_enrichments():
    """
    On startup, apply the latest seed-data enrichments to any existing MA documents.
    Triggered whenever any document is missing the acquirer_country field (old format).
    """
    try:
        stale = await db.ma_activities.count_documents({"acquirer_country": {"$exists": False}})
        if stale == 0:
            return
        logger.info("MA migration: %d stale documents — applying enrichments from seed data", stale)
        from data.seed_data import MA_DATA, MA_EXTRA_DEALS
        all_deals = MA_DATA + MA_EXTRA_DEALS
        for m in all_deals:
            activity = MAActivity(**m)
            doc = activity.model_dump()
            doc["announced_date"] = doc["announced_date"].isoformat()
            await db.ma_activities.update_one(
                {"acquirer": m["acquirer"], "target": m["target"]},
                {"$set": doc},
                upsert=True,
            )
        logger.info("MA migration complete — enrichments applied")
    except Exception as exc:
        logger.error("MA migration error: %s", exc)

@app.on_event("startup")
async def startup_event():
    """Create news_articles indexes, start scheduler, and auto-scrape if empty."""
    try:
        await db.news_articles.create_index([("url", 1)], unique=True)
        await db.news_articles.create_index([("publishedAt", -1)])
        await db.news_articles.create_index([("scrapedAt", -1)])
        await db.news_articles.create_index([("language", 1)])
        await db.news_articles.create_index([("region", 1)])
        await db.bookmarks.create_index([("userId", 1)])
        await db.bookmarks.create_index([("userId", 1), ("article.url", 1)], unique=True)
        logger.info("news_articles + bookmarks indexes ready")
    except Exception as exc:
        logger.warning("Index creation warning: %s", exc)

    scheduler.add_job(run_news_scraper_job, "cron", hour=7, minute=0, id="daily_news_scraper")
    scheduler.add_job(run_ma_scraper_job, "cron", hour=8, minute=0, id="daily_ma_scraper")
    scheduler.start()
    logger.info("Schedulers started — news at 07:00 UTC, M&A at 08:00 UTC")

    # Kick off a background scrape so articles appear immediately on first deploy
    asyncio.create_task(_initial_scrape_if_empty())
    # Apply MA enrichments (dates, countries, logos, rationale) to any stale DB docs
    asyncio.create_task(_migrate_ma_enrichments())

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
    scheduler.shutdown(wait=False)

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)

# Serve React frontend (catch-all — must be last)
STATIC_DIR = Path(__file__).parent / "static"

@app.get("/{full_path:path}")
async def serve_frontend(full_path: str):
    if not STATIC_DIR.exists():
        raise HTTPException(status_code=404, detail="Frontend not built")
    file_path = STATIC_DIR / full_path
    # Prevent path traversal
    if STATIC_DIR in file_path.parents and file_path.exists() and file_path.is_file():
        return FileResponse(str(file_path))
    return FileResponse(str(STATIC_DIR / "index.html"))
