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
import re
import jwt
import bcrypt
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from services.stock_service import get_bulk_prices, get_stock_history as fetch_stock_history, invalidate_cache as invalidate_stock_cache

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
    deal_value: float  # equity value in millions USD (convention: equity, not EV)
    status: str  # announced, pending, under_review, completed, active, cancelled, dissolved, exited
    deal_type: str  # acquisition, merger, joint_venture, strategic_investment, minority_stake, funding_round, asset_acquisition, investment
    description: str
    announced_date: Optional[datetime] = None   # if None, defaults to now in MAActivity
    closed_date: Optional[datetime] = None      # actual closing date (None until deal completes)
    acquirer_country: Optional[str] = None      # ISO 3166-1 alpha-2
    target_country: Optional[str] = None
    acquirer_logo_domain: Optional[str] = None
    target_logo_domain: Optional[str] = None
    source_url: Optional[str] = None
    rationale: Optional[str] = None             # 2-3 sentence strategic context
    notes: Optional[str] = None                 # deal structure notes (CVR, earnout, etc.)
    confidence: Optional[str] = None            # high / medium / low
    # Enriched deal metadata
    stake_percentage: Optional[float] = None    # % of capital acquired/invested (minority deals)
    round_type: Optional[str] = None            # seed / series_a / series_b / series_c / growth / buyout
    is_disclosed: bool = True                   # False when deal value is undisclosed
    valuation: Optional[float] = None           # Post-money valuation in millions USD
    # Regulatory fields
    regulatory_status: Optional[str] = None
    regulatory_body: Optional[str] = None
    regulatory_notes: Optional[str] = None
    # Sector classification
    sector: Optional[str] = None  # cyber, space, uas_drones, missiles_munitions, naval, land_systems, c2_electronics, aircraft, services_it, other

class MAActivity(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    acquirer: str
    target: str
    deal_value: float  # equity value in millions USD — see DATA_CONVENTIONS.md
    status: str
    deal_type: str
    description: str
    announced_date: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    closed_date: Optional[datetime] = None
    acquirer_country: Optional[str] = None
    target_country: Optional[str] = None
    acquirer_logo_domain: Optional[str] = None
    target_logo_domain: Optional[str] = None
    source_url: Optional[str] = None
    rationale: Optional[str] = None
    notes: Optional[str] = None
    confidence: Optional[str] = None
    # Enriched deal metadata
    stake_percentage: Optional[float] = None
    round_type: Optional[str] = None
    is_disclosed: bool = True
    valuation: Optional[float] = None           # Post-money valuation in millions USD
    # Regulatory fields
    regulatory_status: Optional[str] = None    # pending_cfius, pending_eu_comp, pending_uk_cma, cleared, blocked, not_required
    regulatory_body: Optional[str] = None      # CFIUS, EU DG COMP, UK CMA, Multiple
    regulatory_notes: Optional[str] = None
    # Sector classification
    sector: Optional[str] = None  # cyber, space, uas_drones, missiles_munitions, naval, land_systems, c2_electronics, aircraft, services_it, other

# JV Program Model
class JVProgram(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    party1: str
    p1_iso: str
    party2: str
    p2_iso: str
    party3: Optional[str] = None
    p3_iso: Optional[str] = None
    products: str
    year: int
    description: Optional[str] = None

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
    # Enrichment fields (Crunchbase-style profile)
    founded_year: Optional[int] = None
    headquarters: Optional[str] = None
    website: Optional[str] = None
    linkedin: Optional[str] = None
    funding_stage: Optional[str] = None
    is_public: Optional[bool] = None
    description: Optional[str] = None
    programs: Optional[List[str]] = None
    export_countries: Optional[List[str]] = None
    aliases: Optional[List[str]] = None   # alternative names for matching (news, deals, profile lookup)
    multinational_for: Optional[List[str]] = None  # countries that see this company in the multinational tab
    company_type: Optional[str] = None   # "cluster" for state industrial conglomerates

# Defense Expenditure Model
class ExpenditureCreate(BaseModel):
    country: str
    country_code: str
    year: int
    expenditure: float  # in billions USD
    gdp_percent: float
    region: str
    source: Optional[str] = None

class Expenditure(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    country: str
    country_code: str
    year: int
    expenditure: float
    gdp_percent: float
    region: str
    source: Optional[str] = None

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

# ── Defense Contract Model ─────────────────────────────────────────────────
class ContractCreate(BaseModel):
    title: str
    description: str
    contracting_authority: str          # "DGA", "DoD", "MoD UK", "NATO NSPA"…
    authority_country: str              # "France", "USA", "UK", "NATO", "EU"
    authority_type: str                 # national | nato | eu | bilateral
    category: str                       # aerospace | naval | land | cyber | services | logistics | space
    amount_min: Optional[float] = None  # millions USD
    amount_max: Optional[float] = None  # millions USD
    status: str                         # open | awarded | closed | cancelled
    publication_date: str               # ISO date string
    deadline: Optional[str] = None      # ISO date — relevant for open tenders
    awarded_to: Optional[str] = None    # company name when status = awarded
    program: Optional[str] = None       # programme name (FCAS, MGCS, F-35…)
    source_url: Optional[str] = None
    reliability: str = "confirmed"      # confirmed | estimated

class Contract(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    contracting_authority: str
    authority_country: str
    authority_type: str
    category: str
    amount_min: Optional[float] = None
    amount_max: Optional[float] = None
    status: str
    publication_date: str
    deadline: Optional[str] = None
    awarded_to: Optional[str] = None
    program: Optional[str] = None
    source_url: Optional[str] = None
    reliability: str = "confirmed"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# ── Analyst Notes Models ───────────────────────────────────────────────────
class NoteCreate(BaseModel):
    company_name: str
    content: str

class CompanyNote(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    company_name: str
    content: str
    user_id: str = ""
    user_name: str = ""
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# ── Watchlist Models ────────────────────────────────────────────────────────
class WatchlistEntry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    company_name: str
    added_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

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

# ── Simple in-memory rate limiter for auth endpoints ──────────────────────
# Tracks failed attempts per IP: {ip: {"count": int, "reset_at": datetime}}
_auth_attempts: dict = {}
_AUTH_LIMIT = 10          # max attempts
_AUTH_WINDOW = timedelta(minutes=15)

def _check_rate_limit(request_ip: str):
    now = datetime.now(timezone.utc)
    entry = _auth_attempts.get(request_ip)
    if entry:
        if now < entry["reset_at"]:
            if entry["count"] >= _AUTH_LIMIT:
                raise HTTPException(
                    status_code=429,
                    detail=f"Too many attempts. Try again in {int((entry['reset_at'] - now).total_seconds() // 60) + 1} minutes."
                )
        else:
            del _auth_attempts[request_ip]

def _record_failed_attempt(request_ip: str):
    now = datetime.now(timezone.utc)
    entry = _auth_attempts.get(request_ip)
    if entry and now < entry["reset_at"]:
        entry["count"] += 1
    else:
        _auth_attempts[request_ip] = {"count": 1, "reset_at": now + _AUTH_WINDOW}

# ============= AUTH ROUTES =============

from fastapi import Request

@api_router.post("/auth/register", response_model=TokenResponse)
async def register(user_data: UserCreate, request: Request):
    _check_rate_limit(request.client.host)
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
async def login(credentials: UserLogin, request: Request):
    _check_rate_limit(request.client.host)
    user = await db.users.find_one({"email": credentials.email}, {"_id": 0})
    if not user or not verify_password(credentials.password, user['password_hash']):
        _record_failed_attempt(request.client.host)
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

class AdminSetupBody(BaseModel):
    setup_key: str

@api_router.post("/auth/promote-admin", response_model=TokenResponse)
async def promote_admin(body: AdminSetupBody, current_user: dict = Depends(get_current_user)):
    """Promotes the current logged-in user to admin role.
    Requires the ADMIN_SETUP_KEY env var (falls back to JWT_SECRET).
    One-time setup for dashboard owners.
    """
    expected_key = os.environ.get("ADMIN_SETUP_KEY", JWT_SECRET)
    if body.setup_key != expected_key:
        raise HTTPException(status_code=403, detail="Invalid setup key")
    user_id = current_user.get("sub")
    await db.users.update_one({"id": user_id}, {"$set": {"role": "admin"}})
    user = await db.users.find_one({"id": user_id}, {"_id": 0, "password_hash": 0})
    token = create_token(user["id"], user["email"], "admin")
    return TokenResponse(
        access_token=token,
        user={"id": user["id"], "email": user["email"], "name": user["name"], "role": "admin"}
    )

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
async def get_ma_activities(
    status: Optional[str] = None,
    limit: int = 50,
    offset: int = 0,
    days: Optional[int] = 30,
):
    """
    Return M&A deals sorted by announced_date DESC.
    - days=30  (default) → last 30 days only
    - days=0             → no date filter (all recent deals)
    - offset             → skip N records (for pagination)
    """
    query: dict = {}
    if status:
        query["status"] = status
    if days and days > 0:
        cutoff = (datetime.now(timezone.utc) - timedelta(days=days)).isoformat()
        query["announced_date"] = {"$gte": cutoff}
    activities = await db.ma_activities.find(query, {"_id": 0}).sort("announced_date", -1).skip(offset).limit(limit).to_list(limit)
    for a in activities:
        if isinstance(a['announced_date'], str):
            a['announced_date'] = datetime.fromisoformat(a['announced_date'])
    return activities

@api_router.get("/ma-activities/meta")
async def get_ma_meta():
    """Return total deal count and last scrape timestamp."""
    total = await db.ma_activities.count_documents({})
    latest = await db.ma_activities.find_one(
        {"scraped_at": {"$exists": True}},
        {"_id": 0, "scraped_at": 1},
        sort=[("scraped_at", -1)],
    )
    last_scraped_at = latest.get("scraped_at") if latest else None
    return {"total": total, "last_scraped_at": last_scraped_at}

@api_router.get("/ma-activities/historical", response_model=List[MAActivity])
async def get_ma_historical(
    acquirer: Optional[str] = None,
    year: Optional[int] = None,
    deal_type: Optional[str] = None,
    limit: int = 100,
    offset: int = 0,
):
    """Return M&A activities for the historical table view, with pagination."""
    query: dict = {}
    if acquirer:
        query["acquirer"] = {"$regex": acquirer, "$options": "i"}
    if deal_type:
        query["deal_type"] = deal_type
    if year:
        from_dt = datetime(year, 1, 1, tzinfo=timezone.utc).isoformat()
        to_dt = datetime(year, 12, 31, 23, 59, 59, tzinfo=timezone.utc).isoformat()
        query["announced_date"] = {"$gte": from_dt, "$lte": to_dt}
    activities = await db.ma_activities.find(query, {"_id": 0}).sort("announced_date", -1).skip(offset).limit(limit).to_list(limit)
    for a in activities:
        if isinstance(a['announced_date'], str):
            a['announced_date'] = datetime.fromisoformat(a['announced_date'])
    return activities

def is_specific_article_url(url: str) -> bool:
    """Return True if the URL appears to point to a specific article/press-release (not just a homepage)."""
    if not url:
        return False
    ARTICLE_RE = re.compile(
        r"/20\d{2}[/-]|press-release|news-release|newsroom/20|mediaroom|"
        r"prnewswire\.com|businesswire\.com|reuters\.com/|bloomberg\.com/news|"
        r"breakingdefense|defensenews|janes\.com|aviationweek|spaceflightnow",
        re.IGNORECASE,
    )
    return bool(ARTICLE_RE.search(url))

@api_router.post("/ma-activities", response_model=MAActivity)
async def create_ma_activity(data: MAActivityCreate, current_user: dict = Depends(get_current_user)):
    dump = data.model_dump()
    # If caller supplied an announced_date, keep it; otherwise MAActivity defaults to now
    if dump.get("announced_date") is None:
        dump.pop("announced_date", None)
    activity = MAActivity(**dump)
    doc = activity.model_dump()
    doc['announced_date'] = doc['announced_date'].isoformat()
    await db.ma_activities.insert_one(doc)
    result = activity.model_dump()
    # Warn if source_url doesn't look like a specific article
    if dump.get("source_url") and not is_specific_article_url(dump["source_url"]):
        result["source_url_warning"] = "URL may not point to a specific article"
    return result

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

@api_router.post("/ma-activities/extract")
async def extract_deal_from_source(request: Request, current_user: dict = Depends(get_current_user)):
    """
    Extract M&A deal fields from an article URL or base64 screenshot using Claude.
    Body: { "url": "https://..." }  OR  { "image_base64": "...", "image_media_type": "image/jpeg" }
    Returns a pre-filled deal object ready to POST to /ma-activities.
    """
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin role required")

    body = await request.json()
    url        = (body.get("url") or "").strip()
    image_b64  = (body.get("image_base64") or "").strip()
    media_type = body.get("image_media_type") or "image/jpeg"

    if not url and not image_b64:
        raise HTTPException(status_code=400, detail="Provide 'url' or 'image_base64'")

    SCHEMA_PROMPT = """\
Extract the M&A / investment deal from the source and return ONLY a JSON object — no markdown, no prose — with exactly these keys:

{
  "acquirer": "string",
  "target": "string",
  "deal_value": <number in USD millions, 0 if undisclosed>,
  "is_disclosed": <true|false>,
  "status": "<announced|completed|pending|under_review|cancelled>",
  "deal_type": "<acquisition|merger|joint_venture|strategic_investment|minority_stake|funding_round>",
  "round_type": "<seed|series_a|series_b|series_c|series_d|growth|buyout|null>",
  "stake_percentage": <number or null>,
  "acquirer_country": "<ISO-2 code or null>",
  "target_country": "<ISO-2 code or null>",
  "announced_date": "<YYYY-MM-DD, today if unknown>",
  "description": "<one-sentence summary>",
  "rationale": "<2–3 sentence strategic context>",
  "source_url": "<url or null>"
}"""

    import anthropic, json, re as _re
    client = anthropic.Anthropic()

    if url:
        import requests as _req
        article_text = f"(URL: {url})"
        try:
            r = _req.get(url, timeout=10, allow_redirects=True,
                         headers={"User-Agent": "Mozilla/5.0"})
            stripped = _re.sub(r"<[^>]+>", " ", r.text)
            article_text = _re.sub(r"\s+", " ", stripped).strip()[:7000]
        except Exception as e:
            logger.warning("extract_deal: fetch failed for %s — %s", url, e)

        user_content = f"{SCHEMA_PROMPT}\n\nArticle (from {url}):\n{article_text}"
        messages = [{"role": "user", "content": user_content}]
    else:
        messages = [{
            "role": "user",
            "content": [
                {"type": "image", "source": {
                    "type": "base64", "media_type": media_type, "data": image_b64}},
                {"type": "text", "text": SCHEMA_PROMPT},
            ],
        }]

    try:
        msg = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=700,
            messages=messages,
        )
    except Exception as e:
        logger.error("extract_deal: Claude error — %s", e)
        raise HTTPException(status_code=502, detail=f"Claude API error: {e}")

    raw = msg.content[0].text.strip()
    # Strip markdown fences if present
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.lower().startswith("json"):
            raw = raw[4:]
        raw = raw.strip()

    try:
        data = json.loads(raw)
    except json.JSONDecodeError:
        raise HTTPException(status_code=422, detail=f"Non-JSON from Claude: {raw[:300]}")

    if url and not data.get("source_url"):
        data["source_url"] = url

    return data

@api_router.post("/ma-activities/seed-pilot")
async def seed_ma_pilot(current_user: dict = Depends(get_current_user)):
    """Drop all M&A entries and seed exactly the 9 hand-curated pilot deals."""
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin role required")
    from data.seed_data import MA_PILOT_10
    import re as _re

    def _norm(s: str) -> str:
        return _re.sub(r"\s+", " ", s.lower().strip())

    await db.ma_activities.delete_many({})

    for m in MA_PILOT_10:
        activity = MAActivity(**m)
        doc = activity.model_dump()
        doc["announced_date"] = doc["announced_date"].isoformat()
        doc["acquirer_norm"] = _norm(m["acquirer"])
        doc["target_norm"] = _norm(m["target"])
        await db.ma_activities.insert_one(doc)

    count = await db.ma_activities.count_documents({})
    return {"status": "Pilot seeded", "deals": count, "message": f"{count} deals chargés — scraper ignoré"}

# ============= JV PROGRAMS ROUTES =============

@api_router.get("/jv-programs")
async def get_jv_programs():
    """Return all JV programs sorted by year descending."""
    programs = await db.jv_programs.find({}, {"_id": 0}).sort("year", -1).to_list(None)
    return programs

# ============= DEFENSE PLAYERS ROUTES =============

@api_router.get("/defense-players", response_model=List[DefensePlayer])
async def get_defense_players(country: Optional[str] = None):
    query = {}
    if country:
        query["country"] = country
    players = await db.defense_players.find(query, {"_id": 0}).sort("market_cap", -1).to_list(None)
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

# ── Stock price helpers ────────────────────────────────────────────────────

@api_router.get("/stock-history/{ticker}")
async def get_stock_history_route(ticker: str, period: str = "1d"):
    """Return real price history from Yahoo Finance (via stock_service).
    Returns data_source='live' when data is available, 'unavailable' otherwise.
    Private companies (ticker <= 0 or marked PRIV) always return empty data."""
    player = await db.defense_players.find_one(
        {"ticker": {"$regex": f"^{re.escape(ticker)}$", "$options": "i"}}, {"_id": 0}
    )
    base_price = float(player["stock_price"]) if player and player.get("stock_price") else 0.0
    # Private companies — no market data
    if base_price <= 0 or "PRIV" in ticker.upper():
        return {"ticker": ticker, "period": period, "data": [], "data_source": "private"}

    data = await fetch_stock_history(ticker, period)

    if not data:
        return {
            "ticker": ticker,
            "period": period,
            "data": [],
            "data_source": "unavailable",
            "message": "Données de marché indisponibles pour ce ticker. Vérifiez que la valeur est cotée sur Yahoo Finance."
        }

    return {"ticker": ticker, "period": period, "data": data, "data_source": "live"}

@api_router.get("/stock-prices")
async def get_stock_prices(tickers: str = ""):
    """Return current price data for a comma-separated list of tickers.
    Public tickers are fetched live from Yahoo Finance (via stock_service, 5-min cache).
    Private companies (stock_price <= 0 or ticker contains PRIV) fall back to DB seed data.
    """
    ticker_list = [t.strip() for t in tickers.split(",") if t.strip()]
    if not ticker_list:
        return {}

    # Load DB records to identify private companies
    players = await db.defense_players.find(
        {"ticker": {"$in": ticker_list}}, {"_id": 0, "ticker": 1, "stock_price": 1, "change_percent": 1}
    ).to_list(len(ticker_list))
    db_map = {p["ticker"]: p for p in players}

    public_tickers = [
        t for t in ticker_list
        if "PRIV" not in t.upper() and float((db_map.get(t) or {}).get("stock_price", 0) or 0) > 0
    ]
    private_tickers = [t for t in ticker_list if t not in public_tickers]

    # Fetch live prices for public tickers
    live_data = await get_bulk_prices(public_tickers) if public_tickers else {}

    result = {}
    # Live prices take priority
    for t, data in live_data.items():
        result[t] = {
            "price": data["price"],
            "change_percent": data["change_percent"],
            "week_change_percent": data.get("week_change_percent", data["change_percent"]),
            "prev_close": data.get("prev_close", data["price"]),
            "open_price": data.get("open_price"),
            "change_since_open": data.get("change_since_open"),
        }
    # Fallback to DB for any public ticker that yfinance couldn't resolve + all private
    for t in public_tickers:
        if t not in result and t in db_map:
            p = db_map[t]
            price = p.get("stock_price", 0)
            change = p.get("change_percent", 0)
            if price > 0:
                result[t] = {
                    "price": price,
                    "change_percent": change,
                    "prev_close": round(price / (1 + change / 100), 2) if change else price,
                }
    for t in private_tickers:
        if t in db_map:
            p = db_map[t]
            price = p.get("stock_price", 0)
            change = p.get("change_percent", 0)
            if price > 0:
                result[t] = {
                    "price": price,
                    "change_percent": change,
                    "prev_close": round(price / (1 + change / 100), 2) if change else price,
                }
    return result

@api_router.get("/companies/{name}")
async def get_company_profile(name: str):
    """Return Crunchbase-style company profile + related M&A activity.
    Lookup order: 1) exact name, 2) name regex, 3) aliases array.
    """
    esc = re.escape(name)
    player = await db.defense_players.find_one(
        {"name": {"$regex": f"^{esc}$", "$options": "i"}}, {"_id": 0}
    )
    if not player:
        # Partial name match
        player = await db.defense_players.find_one(
            {"name": {"$regex": esc, "$options": "i"}}, {"_id": 0}
        )
    if not player:
        # Alias match (any element of aliases[] matches the requested name)
        player = await db.defense_players.find_one(
            {"aliases": {"$elemMatch": {"$regex": esc, "$options": "i"}}}, {"_id": 0}
        )
    if player and isinstance(player.get("updated_at"), str):
        player["updated_at"] = datetime.fromisoformat(player["updated_at"])

    # Build all name variants for M&A lookup (canonical name + aliases)
    name_variants = [name]
    if player:
        name_variants.append(player.get("name", name))
        name_variants += player.get("aliases") or []
    name_variants = list(dict.fromkeys(name_variants))  # dedupe, preserve order

    ma_or_clauses = []
    for v in name_variants:
        v_esc = re.escape(v)
        ma_or_clauses += [
            {"acquirer": {"$regex": v_esc, "$options": "i"}},
            {"target":   {"$regex": v_esc, "$options": "i"}},
        ]
    ma = await db.ma_activities.find(
        {"$or": ma_or_clauses}, {"_id": 0}
    ).sort("announced_date", -1).limit(10).to_list(10)
    for a in ma:
        if isinstance(a.get("announced_date"), str):
            a["announced_date"] = datetime.fromisoformat(a["announced_date"])

    return {"profile": player, "ma_activities": ma}

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

# ============= CONTRACTS ROUTES =============

@api_router.get("/contracts", response_model=List[Contract])
async def get_contracts(
    status: Optional[str] = None,
    authority_type: Optional[str] = None,
    category: Optional[str] = None,
    authority_country: Optional[str] = None,
):
    query = {}
    if status and status != "all":
        query["status"] = status
    if authority_type and authority_type != "all":
        query["authority_type"] = authority_type
    if category and category != "all":
        query["category"] = category
    if authority_country and authority_country != "all":
        query["authority_country"] = authority_country
    contracts = await db.contracts.find(query, {"_id": 0}).sort("publication_date", -1).to_list(500)
    for c in contracts:
        if isinstance(c.get("created_at"), str):
            c["created_at"] = datetime.fromisoformat(c["created_at"])
    return contracts

@api_router.post("/contracts", response_model=Contract)
async def create_contract(data: ContractCreate, current_user: dict = Depends(get_current_user)):
    contract = Contract(**data.model_dump())
    doc = contract.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.contracts.insert_one(doc)
    return contract

@api_router.delete("/contracts/{contract_id}")
async def delete_contract(contract_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.contracts.delete_one({"id": contract_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Contract not found")
    return {"status": "deleted"}

# ============= COUNTRY PROFILE =============

def _fetch_rss_country_news(country_name: str, limit: int = 5) -> list:
    """Fetch recent defense news mentioning country_name from RSS feeds.

    All feeds are fetched in parallel with a 5-second per-feed timeout and an
    8-second wall-clock cap so the worst-case wait is ~8s regardless of how
    many feeds are slow or unreachable.
    """
    import feedparser as _fp
    import requests as _req
    from concurrent.futures import ThreadPoolExecutor, as_completed as _as_completed

    feeds = [
        {"name": "Defense News",     "url": "https://www.defensenews.com/arc/outboundfeeds/rss/"},
        {"name": "The Defense Post", "url": "https://thedefensepost.com/feed/"},
        {"name": "Breaking Defense", "url": "https://breakingdefense.com/feed/"},
    ]
    term = country_name.lower()
    _headers = {"User-Agent": "Mozilla/5.0"}

    def _fetch_one(feed_meta: dict) -> list:
        try:
            resp = _req.get(feed_meta["url"], timeout=5, headers=_headers)
            feed = _fp.parse(resp.content)
            results = []
            for entry in feed.entries:
                text = f"{entry.get('title', '')} {entry.get('summary', '')}".lower()
                if term in text:
                    results.append({
                        "title":       entry.get("title", ""),
                        "url":         entry.get("link", ""),
                        "source":      feed_meta["name"],
                        "publishedAt": entry.get("published", ""),
                        "description": entry.get("summary", "")[:220] if entry.get("summary") else "",
                        "image":       None,
                    })
            return results
        except Exception:
            return []

    articles = []
    with ThreadPoolExecutor(max_workers=len(feeds)) as pool:
        futures = {pool.submit(_fetch_one, f): f for f in feeds}
        for future in _as_completed(futures, timeout=8):
            try:
                articles.extend(future.result())
            except Exception:
                pass
    return articles[:limit]


@api_router.get("/country-profile")
async def get_country_profile(country_name: str):
    """
    Returns a rich profile for a given country:
    - military_branches: static data
    - contracts: top 5 contracts from DB (by authority_country)
    - companies: top 6 defense companies from DB
    - news: up to 5 recent articles (DB-first, RSS fallback)
    """
    from data.military_branches import MILITARY_BRANCHES, COUNTRY_TO_PLAYER_COUNTRY

    # --- Branches ---
    branches = MILITARY_BRANCHES.get(country_name, [])

    # --- Contracts ---
    contracts_raw = await db.contracts.find(
        {"authority_country": country_name}, {"_id": 0}
    ).sort("publication_date", -1).limit(5).to_list(5)
    # Also try alternate spellings (UK / United Kingdom)
    if not contracts_raw and country_name == "United Kingdom":
        contracts_raw = await db.contracts.find(
            {"authority_country": "UK"}, {"_id": 0}
        ).sort("publication_date", -1).limit(5).to_list(5)
    if not contracts_raw and country_name == "United States":
        contracts_raw = await db.contracts.find(
            {"authority_country": "USA"}, {"_id": 0}
        ).sort("publication_date", -1).limit(5).to_list(5)

    contracts = [
        {
            "id":           c.get("id", ""),
            "title":        c.get("title", ""),
            "category":     c.get("category", ""),
            "status":       c.get("status", ""),
            "amount_min":   c.get("amount_min"),
            "amount_max":   c.get("amount_max"),
            "awarded_to":   c.get("awarded_to", ""),
            "program":      c.get("program", ""),
            "publication_date": c.get("publication_date", ""),
        }
        for c in contracts_raw
    ]

    # --- Companies (national + EU multinationals for European countries) ---
    player_countries = COUNTRY_TO_PLAYER_COUNTRY.get(country_name, [country_name])
    national_raw = await db.defense_players.find(
        {"country": {"$in": player_countries}}, {"_id": 0}
    ).sort("market_cap", -1).limit(20).to_list(20)

    # Multinationals: only companies that explicitly list this country as a member
    eu_raw = await db.defense_players.find(
        {"country": "EU", "multinational_for": country_name}, {"_id": 0}
    ).sort("market_cap", -1).limit(6).to_list(6)

    def _shape(p, is_national):
        return {
            "name":            p.get("name", ""),
            "ticker":          p.get("ticker", ""),
            "market_cap":      p.get("market_cap", 0),
            "revenue":         p.get("revenue", 0),
            "specializations": p.get("specializations", []),
            "stock_price":     p.get("stock_price", 0),
            "change_percent":  p.get("change_percent", 0),
            "is_national":     is_national,
            "company_type":    p.get("company_type", "company"),
        }

    companies = [_shape(p, True) for p in national_raw] + [_shape(p, False) for p in eu_raw]

    # --- News (DB first — English only, RSS fallback) ---
    esc = re.escape(country_name)
    _news_proj = {"_id": 0, "title": 1, "url": 1, "source": 1, "publishedAt": 1, "description": 1, "image": 1}

    # Try English-only first
    db_news = await db.news_articles.find(
        {"title": {"$regex": esc, "$options": "i"}, "language": "en"},
        _news_proj
    ).sort("publishedAt", -1).limit(6).to_list(6)

    # Fall back to any language if not enough English articles
    if len(db_news) < 3:
        db_news_any = await db.news_articles.find(
            {"title": {"$regex": esc, "$options": "i"}, "language": {"$ne": "fr"}},
            _news_proj
        ).sort("publishedAt", -1).limit(6).to_list(6)
        # Merge, deduplicate by URL
        seen_urls = {a.get("url") for a in db_news}
        for a in db_news_any:
            if a.get("url") not in seen_urls:
                db_news.append(a)
                seen_urls.add(a.get("url"))
        db_news = db_news[:6]

    def _shape_article(a):
        return {
            "title":       a.get("title", ""),
            "url":         a.get("url", ""),
            "source":      a.get("source", ""),
            "publishedAt": a.get("publishedAt", ""),
            "description": a.get("description", ""),
            "image":       a.get("image"),
        }

    news = [_shape_article(a) for a in db_news]

    if len(news) < 3:
        try:
            rss_articles = await asyncio.to_thread(_fetch_rss_country_news, country_name, 6 - len(news))
            news.extend(rss_articles)
        except Exception:
            pass

    return {
        "country_name":      country_name,
        "military_branches": branches,
        "contracts":         contracts,
        "companies":         companies,
        "news":              news,
    }


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

# ============= DATA CONSISTENCY HEALTH CHECK =============

@api_router.get("/health/data-consistency")
async def data_consistency_check():
    """
    Checks internal consistency of the ma_activities collection.
    Returns counts by type/status, and flags blocker issues.
    Usable as a monitoring probe and as a sanity check in CI.
    """
    from datetime import timezone as _tz

    docs = await db.ma_activities.find({}, {"_id": 0}).to_list(5000)
    total = len(docs)

    by_type: dict[str, int] = {}
    by_status: dict[str, int] = {}
    blockers: list[str] = []
    warnings_list: list[str] = []

    for doc in docs:
        dt = doc.get("deal_type", "unknown")
        st = doc.get("status", "unknown")
        by_type[dt] = by_type.get(dt, 0) + 1
        by_status[st] = by_status.get(st, 0) + 1

        label = f"{doc.get('acquirer','?')} → {doc.get('target','?')}"

        # closed_date < announced_date
        ann_raw = doc.get("announced_date")
        cl_raw  = doc.get("closed_date")
        if ann_raw and cl_raw:
            try:
                ann = ann_raw if isinstance(ann_raw, datetime) else datetime.fromisoformat(str(ann_raw).replace("Z", "+00:00"))
                cl  = cl_raw  if isinstance(cl_raw,  datetime) else datetime.fromisoformat(str(cl_raw).replace("Z", "+00:00"))
                if cl < ann:
                    blockers.append(f"{label}: closed_date {cl.date()} < announced_date {ann.date()}")
            except Exception:
                pass

        # completed without closed_date
        if st == "completed" and not cl_raw:
            warnings_list.append(f"{label}: status=completed but no closed_date")

        # no source
        if not doc.get("source_url") and not doc.get("sources"):
            blockers.append(f"{label}: no source")

        # aberrant value
        val = doc.get("deal_value", 0) or 0
        if val > 100_000:
            blockers.append(f"{label}: deal_value ${val}M > $100B")

    ok = len(blockers) == 0
    return {
        "status": "ok" if ok else "error",
        "total_deals": total,
        "by_type": by_type,
        "by_status": by_status,
        "blockers": blockers,
        "warnings": warnings_list,
        "checked_at": datetime.now(timezone.utc).isoformat(),
    }

# ============= SEED DATA ENDPOINT =============

async def _run_seed() -> dict:
    """Idempotent seed — safe to call on every startup."""
    from data.seed_data import DEFENSE_COMPANIES, ANNOUNCEMENTS_DATA, MA_DATA, MA_EXTRA_DEALS, MA_EUROPE_DEALS, MA_PILOT_10, EXPENDITURES_DATA, REGULATIONS_DATA, PRODUCTS_DATA, CONTRACTS_DATA

    # Remove duplicate defense players by name — keep the entry matching the seed ticker
    seed_ticker_by_name = {p['name']: p['ticker'] for p in DEFENSE_COMPANIES}
    all_players = await db.defense_players.find({}, {"_id": 0, "id": 1, "name": 1, "ticker": 1}).to_list(None)
    seen_player_names: dict = {}
    for player in all_players:
        name = player.get('name', '')
        if name in seen_player_names:
            prev = seen_player_names[name]
            correct_ticker = seed_ticker_by_name.get(name)
            if player.get('ticker') == correct_ticker:
                await db.defense_players.delete_one({"id": prev['id']})
                seen_player_names[name] = player
            else:
                await db.defense_players.delete_one({"id": player['id']})
        else:
            seen_player_names[name] = player

    # Seed Defense Players — check by name OR ticker to prevent duplicates
    for p in DEFENSE_COMPANIES:
        existing = await db.defense_players.find_one(
            {"$or": [{"ticker": p['ticker']}, {"name": p['name']}]}
        )
        if not existing:
            player = DefensePlayer(**p)
            doc = player.model_dump()
            doc['updated_at'] = doc['updated_at'].isoformat()
            await db.defense_players.insert_one(doc)
        else:
            # Patch newly-introduced fields onto existing records so a re-seed
            # propagates multinational_for and company_type without a full drop.
            patch = {}
            if 'multinational_for' in p:
                patch['multinational_for'] = p['multinational_for']
            if 'company_type' in p:
                patch['company_type'] = p['company_type']
            if patch:
                await db.defense_players.update_one({"name": p['name']}, {"$set": patch})

    # Seed Announcements
    for a in ANNOUNCEMENTS_DATA:
        existing = await db.announcements.find_one({"title": a['title']})
        if not existing:
            announcement = Announcement(**a)
            doc = announcement.model_dump()
            doc['date'] = doc['date'].isoformat()
            await db.announcements.insert_one(doc)

    # Purge known-incorrect M&A entries before seeding correct data
    for stale in _STALE_MA_DEALS:
        await db.ma_activities.delete_many(stale)

    # Seed M&A Activities — upsert so enriched fields are applied to existing docs
    import re as _re

    def _norm(s: str) -> str:
        return _re.sub(r"\s+", " ", s.lower().strip())

    # Build a set of (acq_first_word, tgt_first_word) tuples to identify scraper duplicates
    seed_acq_tgt_first: set = set()
    for m in MA_DATA + MA_EXTRA_DEALS + MA_EUROPE_DEALS + MA_PILOT_10:
        acq_words = _norm(m['acquirer']).split()
        tgt_words = _norm(m['target']).split()
        if acq_words and tgt_words:
            seed_acq_tgt_first.add((acq_words[0], tgt_words[0]))

    # Also build full set of seed target words (>3 chars) for broader matching
    seed_tgt_words: set = set()
    for m in MA_DATA + MA_EXTRA_DEALS + MA_EUROPE_DEALS + MA_PILOT_10:
        for w in _norm(m['target']).split():
            if len(w) > 3:
                seed_tgt_words.add(w)

    # Also build full set of seed acquirer first words for looser matching
    seed_acq_first_words: set = {p[0] for p in seed_acq_tgt_first}

    # Generic words that indicate a hallucinated/misextracted scraper target
    _HALLUCINATION_TARGETS = frozenset({
        "formation", "multiple", "various", "new", "combined",
        "subsidiary", "unit", "division", "program", "programme",
        "targets", "companies", "businesses", "assets", "operations",
        "group", "consortium", "venture", "unit", "holdings",
        "international", "technologies", "systems", "solutions",
    })

    # Delete ALL scraper-created entries that duplicate or corrupt seeded deals.
    # A scraper entry is removed when it has scraped_at AND any of:
    #   1. Exact (acq_first, tgt_first) pair matches a seed entry
    #   2. Acquirer matches a seed acquirer AND target contains a hallucination word
    #   3. Acquirer matches a seed acquirer AND any target word overlaps known seed targets
    #   4. No source_url at all (unsourced scraper noise)
    all_scraped = await db.ma_activities.find(
        {"scraped_at": {"$exists": True}},
        {"_id": 0, "id": 1, "acquirer": 1, "target": 1, "source_url": 1}
    ).to_list(2000)

    for entry in all_scraped:
        acq_words = _norm(entry.get("acquirer", "")).split()
        tgt_words = _norm(entry.get("target", "")).split()
        if not acq_words or not tgt_words:
            await db.ma_activities.delete_one({"id": entry["id"]})
            continue

        exact_match = (acq_words[0], tgt_words[0]) in seed_acq_tgt_first
        acq_matches_any_seed = acq_words[0] in seed_acq_first_words
        tgt_is_generic = any(w in _HALLUCINATION_TARGETS for w in tgt_words)
        tgt_overlaps_seed = any(w in seed_tgt_words for w in tgt_words if len(w) > 3)
        no_source = not entry.get("source_url")

        if exact_match or (acq_matches_any_seed and (tgt_is_generic or tgt_overlaps_seed or no_source)):
            await db.ma_activities.delete_one({"id": entry["id"]})

    # Also purge ALL scraper entries with no source URL regardless of acquirer match —
    # unsourced scraper noise has no place in the curated dataset.
    await db.ma_activities.delete_many({"scraped_at": {"$exists": True}, "source_url": {"$in": [None, ""]}})

    # Seed MA_DATA + MA_EXTRA_DEALS, then MA_PILOT_10 last so its enriched fields win on conflict
    for m in MA_DATA + MA_EXTRA_DEALS + MA_EUROPE_DEALS + MA_PILOT_10:
        activity = MAActivity(**m)
        doc = activity.model_dump()
        doc['announced_date'] = doc['announced_date'].isoformat()
        if doc.get('closed_date') and isinstance(doc['closed_date'], datetime):
            doc['closed_date'] = doc['closed_date'].isoformat()
        # Set normalized names so scraper deduplication recognises these entries
        doc['acquirer_norm'] = _norm(m['acquirer'])
        doc['target_norm'] = _norm(m['target'])
        new_id = doc.pop('id')  # preserve existing id on update; only set on insert
        await db.ma_activities.update_one(
            {"acquirer": m['acquirer'], "target": m['target']},
            {"$set": doc, "$setOnInsert": {"id": new_id}},
            upsert=True,
        )

    # After upserting seeds, purge any scraper entries whose first words match a seed pair.
    # Scraper runs can create near-duplicate entries (e.g. "Bombardier" vs "Bombardier C Series")
    # between seed runs; this pass cleans them up immediately after every seed.
    all_scraped_post = await db.ma_activities.find(
        {"scraped_at": {"$exists": True}},
        {"_id": 0, "id": 1, "acquirer": 1, "target": 1, "source_url": 1}
    ).to_list(2000)
    for entry in all_scraped_post:
        acq_words = _norm(entry.get("acquirer", "")).split()
        tgt_words = _norm(entry.get("target", "")).split()
        if not acq_words or not tgt_words:
            await db.ma_activities.delete_one({"id": entry["id"]})
            continue
        if (acq_words[0], tgt_words[0]) in seed_acq_tgt_first:
            await db.ma_activities.delete_one({"id": entry["id"]})

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

    # Remove products that have been consolidated or corrected
    PRODUCTS_TO_DELETE = [
        "Harmattan Layered Air Defense",
        "Harmattan EW Suite",
        "Harmattan C2 Platform",
        "Harmattan Combat Drone",      # remplacé par les vrais produits Gobi/Sahara/Sonora
        "Heron Systems AI Dogfighter",  # mis-attributed to Helsing
        "SSBN Le Terrible",            # bateau de la classe Le Triomphant, pas une classe
        "Barracuda-class Submarine",   # doublon de Suffren-class
    ]
    for name in PRODUCTS_TO_DELETE:
        await db.products.delete_one({"name": name})

    # Seed Products (insert new, update image_url + specifications + manufacturer for existing)
    for p in PRODUCTS_DATA:
        existing = await db.products.find_one({"name": p['name']})
        if not existing:
            product = Product(**p)
            await db.products.insert_one(product.model_dump())
        else:
            updates = {}
            if p.get('image_url') and existing.get('image_url') != p.get('image_url'):
                updates['image_url'] = p['image_url']
            if p.get('specifications') and existing.get('specifications') != p.get('specifications'):
                updates['specifications'] = p['specifications']
            if p.get('manufacturer') and existing.get('manufacturer') != p.get('manufacturer'):
                updates['manufacturer'] = p['manufacturer']
            if updates:
                await db.products.update_one({"name": p['name']}, {"$set": updates})

    # Seed Contracts — upsert by stable key so re-seeding updates existing records
    # (e.g. title translations, source_url fixes) without creating duplicates.
    for c in CONTRACTS_DATA:
        contract = Contract(**c)
        doc = contract.model_dump()
        if c.get("program"):
            match = {"program": c["program"], "authority_country": c["authority_country"]}
        else:
            match = {"contracting_authority": c["contracting_authority"], "category": c["category"]}
        await db.contracts.replace_one(match, doc, upsert=True)

    # Seed JV Programs — check by party1+party2+year to avoid duplicates
    from data.jv_programs_data import JV_EU_PROGRAMS_DATA
    for jv in JV_EU_PROGRAMS_DATA:
        existing = await db.jv_programs.find_one({
            "party1": jv["party1"], "party2": jv["party2"], "year": jv["year"]
        })
        if not existing:
            program = JVProgram(**jv)
            await db.jv_programs.insert_one(program.model_dump())

    players_count = await db.defense_players.count_documents({})
    announcements_count = await db.announcements.count_documents({})
    contracts_count = await db.contracts.count_documents({})
    jv_count = await db.jv_programs.count_documents({})
    return {"status": "Data seeded successfully", "companies": players_count, "announcements": announcements_count, "contracts": contracts_count, "jv_programs": jv_count}


@api_router.post("/seed-data")
async def seed_data(current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin role required")
    return await _run_seed()


@api_router.post("/news/reindex-companies")
async def reindex_company_tags(current_user: dict = Depends(get_current_user)):
    """
    Admin utility: scan every article in news_articles that has no `companies`
    field (or an empty list) and back-fill it using the canonical alias map.
    Safe to run multiple times (idempotent).
    """
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin role required")

    from services.news_scraper import detect_companies

    cursor = db.news_articles.find(
        {"$or": [{"companies": {"$exists": False}}, {"companies": []}]},
        {"_id": 1, "title": 1, "summary": 1},
    )
    updated = 0
    async for doc in cursor:
        title   = doc.get("title", "")
        summary = doc.get("summary", "")
        tags    = detect_companies(title, summary)
        if tags:
            await db.news_articles.update_one(
                {"_id": doc["_id"]},
                {"$set": {"companies": tags}},
            )
            updated += 1

    return {"status": "ok", "articles_updated": updated}


# ============= NEWS SCRAPER JOB =============

async def run_news_scraper_job() -> dict:
    """Run the scraper pipeline, deduplicate, and upsert results into MongoDB."""
    from services.news_scraper import scrape_all_sources, cluster_articles

    # Sources whose content is defence-focused — no minimum score required
    _SPECIALTY_SOURCES = {
        "Breaking Defense", "The Defense Post", "Defense News",
        "Defense Industry Daily", "Opex360", "Meta-Défense", "NATO", "Janes",
        "The War Zone", "Defense One", "Aviation Week",
        "Army Technology", "Naval Technology", "Airforce Technology",
        "C4ISRNET", "National Defense Magazine", "Air Force Magazine",
        "Shephard Media", "Air & Cosmos", "Usine Nouvelle", "La Tribune Défense",
        "Le Point", "USNI News", "Task & Purpose",
        # New specialty sources
        "The Aviationist", "Naval News", "War on the Rocks", "Real Clear Defense",
        "Army Times", "Navy Times", "Air Force Times", "Marine Corps Times",
        "Stars and Stripes", "TTU", "Mer et Marine", "UK Ministry of Defence",
        "Flight Global",
        # French specialty sources
        "Forces Operations", "Secret Défense", "Lignes de Défense",
        "Ministère des Armées", "Aerobuzz", "EuroDéfense",
        # Defense acquisition & programs
        "Warrior Maven", "DoD News", "Federal News Network",
        "Defense Aerospace", "CSIS Defense", "Scout Warrior",
        # Added in news-scraping improvement — must be here to bypass score threshold
        "Military.com", "Military Times", "The Hill Defense",
        "ASPI Strategist", "Modern War Institute", "Small Wars Journal",
        "The Cipher Brief", "Just Security", "Lawfare",
        "Forces.net", "DefenceWeb", "Euromaidan Press", "Defense Express",
        "Sandboxx", "ELN", "Arms Control", "Stimson Center",
        "Kyiv Independent", "Defence Connect",
    }
    _FR_SOURCES = {
        "Opex360", "Meta-Défense", "Le Monde", "Le Figaro", "Les Echos",
        "Usine Nouvelle", "Challenges", "La Tribune", "Le Point",
        "TTU", "Mer et Marine", "Air & Cosmos", "La Tribune Défense",
        "Forces Operations", "Secret Défense", "Lignes de Défense",
        "Ministère des Armées", "Aerobuzz", "EuroDéfense",
    }
    _SOURCE_REGION = {
        "Breaking Defense": "us",     "Defense News": "us",   "Defense Industry Daily": "us",
        "Defense One": "us",
        "Opex360": "europe",          "Meta-Défense": "europe",
        "Le Monde": "europe",         "Le Figaro": "europe",  "Les Echos": "europe",
        "Usine Nouvelle": "europe",   "Challenges": "europe", "La Tribune": "europe",
        "NATO": "europe",
        "The Defense Post": "global", "BBC News": "global",
        "The Guardian": "global",     "Janes": "global",
        "The War Zone": "global",     "Aviation Week": "global",
        "Army Technology": "global",  "Naval Technology": "global",
    }

    logger.info("News scraper job started")
    try:
        raw_articles = await asyncio.to_thread(scrape_all_sources)
        articles_found = len(raw_articles)

        unique_articles = cluster_articles(raw_articles)
        duplicates_removed = articles_found - len(unique_articles)

        # Drop clearly off-topic articles — specialty sources pass freely,
        # mainstream sources need score >= 20
        MIN_SPECIALTY_SCORE  = 0
        MIN_MAINSTREAM_SCORE = 20
        unique_articles = [
            a for a in unique_articles
            if (a.get("source") in _SPECIALTY_SOURCES
                and a.get("relevanceScore", 0) >= MIN_SPECIALTY_SCORE)
            or a.get("relevanceScore", 0) >= MIN_MAINSTREAM_SCORE
        ]

        # Sort by relevance (desc) then date (desc), keep top 500
        unique_articles.sort(
            key=lambda x: (
                x.get("relevanceScore", 0),
                x.get("publishedAt", datetime.min.replace(tzinfo=timezone.utc)),
            ),
            reverse=True,
        )
        unique_articles = unique_articles[:500]

        # Cap per source to prevent any single outlet flooding the DB.
        # Articles are already sorted by relevance desc, so we keep the best ones.
        _src_counts: dict = {}
        _MAX_PER_SOURCE = 15
        _capped: list = []
        for a in unique_articles:
            src = a.get("source", "")
            if _src_counts.get(src, 0) < _MAX_PER_SOURCE:
                _capped.append(a)
                _src_counts[src] = _src_counts.get(src, 0) + 1
        unique_articles = _capped

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
                    "source_count":   article.get("source_count", 1),
                    "covered_by":     article.get("covered_by", [src]),
                    "companies":      article.get("companies", []),
                }
                pub_at_value = doc.pop("publishedAt")
                await db.news_articles.update_one(
                    {"url": doc["url"]},
                    {
                        "$set": doc,
                        "$min": {"publishedAt": pub_at_value},
                    },
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
_FR_SOURCES     = ["Opex360", "Meta-Défense", "Le Monde", "Le Figaro", "Les Echos",
                   "Usine Nouvelle", "Challenges", "La Tribune", "La Tribune Défense",
                   "Air & Cosmos", "L'Agefi", "Capital", "BFM Business", "Le Point",
                   "TTU", "Mer et Marine", "Forces Operations", "Secret Défense",
                   "Lignes de Défense", "Ministère des Armées", "Aerobuzz", "EuroDéfense"]
_FR_SOURCES_SET = set(_FR_SOURCES)
_SOURCE_REGION_MAP: dict = {
    "Breaking Defense": "us",     "Defense News": "us",          "Defense Industry Daily": "us",
    "Defense One": "us",          "C4ISRNET": "us",              "National Defense Magazine": "us",
    "Air Force Magazine": "us",   "Army Times": "us",            "Navy Times": "us",
    "Air Force Times": "us",      "Marine Corps Times": "us",    "Stars and Stripes": "us",
    "USNI News": "us",            "Task & Purpose": "us",
    "Opex360": "europe",          "Meta-Défense": "europe",      "Air & Cosmos": "europe",
    "Le Monde": "europe",         "Le Figaro": "europe",         "Les Echos": "europe",
    "Usine Nouvelle": "europe",   "Challenges": "europe",        "La Tribune": "europe",
    "La Tribune Défense": "europe", "L'Agefi": "europe",         "Capital": "europe",
    "BFM Business": "europe",     "NATO": "europe",              "Le Point": "europe",
    "TTU": "europe",              "Mer et Marine": "europe",     "UK Ministry of Defence": "europe",
    "Forces Operations": "europe", "Secret Défense": "europe",  "Lignes de Défense": "europe",
    "Ministère des Armées": "europe", "Aerobuzz": "europe",     "EuroDéfense": "europe",
    "The Defense Post": "global", "BBC News": "global",
    "The Guardian": "global",     "Janes": "global",
    "The War Zone": "global",     "Aviation Week": "global",
    "Army Technology": "global",  "Naval Technology": "global",  "Airforce Technology": "global",
    "Shephard Media": "global",   "Flight Global": "global",     "SpaceNews": "global",
    "The Guardian Defence": "global",
    "The Aviationist": "global",  "Naval News": "global",        "War on the Rocks": "global",
    "Real Clear Defense": "global", "Foreign Policy": "global",  "Bellingcat": "global",
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
    "The War Zone", "Defense One", "Aviation Week",
    "Army Technology", "Naval Technology", "Airforce Technology",
    "C4ISRNET", "National Defense Magazine", "Air Force Magazine",
    "Shephard Media", "Air & Cosmos", "Usine Nouvelle", "La Tribune Défense", "Le Point",
    "USNI News", "Task & Purpose", "The Guardian Defence",
    # New specialty sources
    "The Aviationist", "Naval News", "War on the Rocks", "Real Clear Defense",
    "Army Times", "Navy Times", "Air Force Times", "Marine Corps Times",
    "Stars and Stripes", "TTU", "Mer et Marine", "UK Ministry of Defence",
    "Flight Global",
    # French specialty sources
    "Forces Operations", "Secret Défense", "Lignes de Défense",
    "Ministère des Armées", "Aerobuzz", "EuroDéfense",
    # Defense acquisition & programs
    "Warrior Maven", "DoD News", "Federal News Network",
    "Defense Aerospace", "CSIS Defense", "Scout Warrior",
    # Added in news-scraping improvement
    "Military.com", "Military Times", "The Hill Defense",
    "ASPI Strategist", "Modern War Institute", "Small Wars Journal",
    "The Cipher Brief", "Just Security", "Lawfare",
    "Forces.net", "DefenceWeb", "Euromaidan Press", "Defense Express",
    "Sandboxx", "ELN", "Arms Control", "Stimson Center",
    "Kyiv Independent", "Defence Connect",
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
    conditions: list = [{"publishedAt": {"$gte": cutoff}}]

    # Always exclude admin-rejected articles from the public feed
    conditions.append({"adminRejected": {"$ne": True}})

    # Company-specific Google News articles belong on company profile pages only
    conditions.append({"isCompanySpecific": {"$ne": True}})

    # Always enforce: specialty sources need score >= 5, mainstream need >= _MIN_MAINSTREAM_SCORE
    conditions.append({"$or": [
        {"source": {"$in": _SPECIALTY_SOURCES_LIST}, "relevanceScore": {"$gte": 5}},
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


def _interleave_sources(articles: list) -> list:
    """
    Round-robin interleave articles across sources so no single outlet
    dominates the visible feed. Each source's articles stay in their
    original relevance order relative to each other.
    """
    from collections import defaultdict
    buckets: dict = defaultdict(list)
    for a in articles:
        buckets[a.get("source", "")].append(a)

    source_order = list(buckets.keys())
    result: list = []
    while source_order:
        for src in source_order:
            if buckets[src]:
                result.append(buckets[src].pop(0))
        source_order = [s for s in source_order if buckets[s]]
    return result


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
    hours: int = 168,
    offset: int = 0,
):
    """
    Return up to `limit` articles (max 150) sorted by relevance then date.
    Optional filters: language ("en"|"fr"), region ("us"|"europe"|"asia-pacific"|…).
    `hours`: time window in hours (default 168 = 7 days). Use 0 for no time limit.
    `offset`: skip first N results (for pagination).
    Falls back to the most recent batch when no fresh articles match.
    """
    limit = min(max(limit, 1), 300)
    hours = max(0, min(hours, 8760))  # cap at 1 year
    offset = max(0, offset)

    if hours == 0:
        cutoff = "1970-01-01T00:00:00+00:00"
    else:
        cutoff = (datetime.now(timezone.utc) - timedelta(hours=hours)).isoformat()

    query = _build_news_query(language, region, cutoff)
    articles = await db.news_articles.find(
        query, {"_id": 0}
    ).sort([("relevanceScore", -1), ("publishedAt", -1)]).skip(offset).limit(limit).to_list(limit)

    if not articles and offset == 0:
        # Fallback: ignore time window but keep lang/region filters
        fb_query = _build_news_query(language, region, "1970-01-01T00:00:00+00:00")
        articles = await db.news_articles.find(
            fb_query, {"_id": 0}
        ).sort([("relevanceScore", -1), ("publishedAt", -1)]).limit(limit).to_list(limit)

    normalised = [_normalise_article(a) for a in articles]
    return _interleave_sources(normalised)


@api_router.get("/news/company")
async def get_company_news(name: str, limit: int = 5):
    """
    Return articles about a specific company.

    Matching strategy (strict — no noise):
      1. Look up the company's aliases from defense_players.
      2. An article is included only when the company name OR one of its aliases
         appears in the article TITLE (score >= 3 threshold).
      3. Fallback: canonical name in the pre-tagged `companies` array.
      4. Returns [] rather than unrelated articles — "0 news" is better than
         articles about a different company that happens to share a keyword.

    Sorted by publishedAt DESC. Max 20 articles.
    """
    limit = min(max(limit, 1), 20)
    esc = re.escape(name)

    # Resolve canonical name + aliases from DB
    player = await db.defense_players.find_one(
        {"$or": [
            {"name":    {"$regex": f"^{esc}$", "$options": "i"}},
            {"name":    {"$regex": esc, "$options": "i"}},
            {"aliases": {"$elemMatch": {"$regex": esc, "$options": "i"}}},
        ]},
        {"_id": 0, "name": 1, "aliases": 1},
    )
    canonical = player.get("name", name) if player else name
    aliases   = player.get("aliases") or [] if player else []
    all_names = list(dict.fromkeys([canonical] + aliases + [name]))

    # Build title-match query (strict: company must appear in article TITLE)
    title_clauses = [
        {"title": {"$regex": re.escape(n), "$options": "i"}}
        for n in all_names
    ]
    title_query = {"$or": title_clauses}
    articles = await db.news_articles.find(
        title_query, {"_id": 0}
    ).sort("publishedAt", -1).limit(limit).to_list(limit)

    if articles:
        return [_normalise_article(a) for a in articles]

    # Fallback: check pre-tagged companies[] field (set at scrape time)
    tagged_clauses = [{"companies": n} for n in all_names]
    tagged = await db.news_articles.find(
        {"$or": tagged_clauses}, {"_id": 0}
    ).sort("publishedAt", -1).limit(limit).to_list(limit)

    return [_normalise_article(a) for a in tagged]


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

# ── Analyst Notes Routes ───────────────────────────────────────────────────

@api_router.get("/notes")
async def get_notes(company_name: str, current_user: dict = Depends(get_current_user)):
    """Return all analyst notes for a company (all team members)."""
    notes = await db.company_notes.find(
        {"company_name": company_name}, {"_id": 0}
    ).sort("created_at", -1).to_list(100)
    return notes

@api_router.post("/notes", status_code=201)
async def create_note(data: NoteCreate, current_user: dict = Depends(get_current_user)):
    note = CompanyNote(
        company_name=data.company_name,
        content=data.content.strip(),
        user_id=current_user["sub"],
        user_name=current_user.get("name", ""),
    )
    doc = note.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.company_notes.insert_one(doc)
    return doc

@api_router.delete("/notes/{note_id}")
async def delete_note(note_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.company_notes.delete_one(
        {"id": note_id, "user_id": current_user["sub"]}  # owner only
    )
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Note not found or not yours")
    return {"status": "deleted"}

# ── Watchlist Routes ────────────────────────────────────────────────────────

@api_router.get("/watchlist")
async def get_watchlist(current_user: dict = Depends(get_current_user)):
    entries = await db.watchlist.find(
        {"user_id": current_user["sub"]}, {"_id": 0}
    ).to_list(500)
    return [e["company_name"] for e in entries]

@api_router.post("/watchlist", status_code=201)
async def add_to_watchlist(company_name: str, current_user: dict = Depends(get_current_user)):
    user_id = current_user["sub"]
    existing = await db.watchlist.find_one({"user_id": user_id, "company_name": company_name})
    if existing:
        return {"status": "exists"}
    entry = WatchlistEntry(user_id=user_id, company_name=company_name)
    doc = entry.model_dump()
    doc["added_at"] = doc["added_at"].isoformat()
    await db.watchlist.insert_one(doc)
    return {"status": "added"}

@api_router.delete("/watchlist")
async def remove_from_watchlist(company_name: str, current_user: dict = Depends(get_current_user)):
    await db.watchlist.delete_one({"user_id": current_user["sub"], "company_name": company_name})
    return {"status": "removed"}

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


@api_router.get("/news/og-image")
async def get_article_og_image(url: str):
    """
    Return the OG/Twitter Card image URL for a given article URL.
    Checks the DB cache first; fetches from the source page if missing.
    The result is written back to the DB so subsequent calls are instant.
    """
    import asyncio
    from services.news_scraper import _fetch_og_image

    article = await db.news_articles.find_one({"url": url}, {"_id": 0, "image": 1})
    if article and article.get("image"):
        return {"image": article["image"]}

    img = await asyncio.to_thread(_fetch_og_image, url)
    if img:
        await db.news_articles.update_one({"url": url}, {"$set": {"image": img}})
        return {"image": img}

    return {"image": None}


@api_router.post("/admin/purge-stock-photo-images")
async def purge_stock_photo_images(current_user: dict = Depends(get_current_user)):
    """
    Null-out image fields that point to known stock-photo hosting domains
    (Unsplash, Getty, Shutterstock, iStock, Pexels, etc.) so the frontend
    falls back to defence-themed category placeholders.
    """
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin role required")

    STOCK_DOMAINS = [
        "unsplash.com", "gettyimages.com", "istockphoto.com", "shutterstock.com",
        "depositphotos.com", "pexels.com", "dreamstime.com", "123rf.com",
        "alamy.com", "stock.adobe.com", "pixabay.com", "stocksy.com",
        "canstockphoto.com",
    ]
    regex_pattern = "|".join(re.escape(d) for d in STOCK_DOMAINS)
    result = await db.news_articles.update_many(
        {"image": {"$regex": regex_pattern, "$options": "i"}},
        {"$set": {"image": None}},
    )
    return {"purged": result.modified_count}


@api_router.post("/admin/refresh-article-images")
async def refresh_article_images(current_user: dict = Depends(get_current_user)):
    """
    Re-enrich images for all news articles that currently lack one.
    Uses the same OG-image fetcher as the news scraper. Admin only.
    Returns how many articles were updated out of those processed.
    """
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin role required")

    import asyncio
    from services.news_scraper import _enrich_images

    raw = await db.news_articles.find(
        {"$or": [{"image": None}, {"image": {"$exists": False}}]},
        {"_id": 0, "url": 1}
    ).limit(500).to_list(500)

    if not raw:
        return {"updated": 0, "processed": 0}

    articles = [{"url": a["url"], "image": None} for a in raw]
    await asyncio.to_thread(_enrich_images, articles)

    updated = 0
    for a in articles:
        if a.get("image"):
            await db.news_articles.update_one(
                {"url": a["url"]},
                {"$set": {"image": a["image"]}}
            )
            updated += 1

    return {"updated": updated, "processed": len(articles)}


# ── News moderation models ──────────────────────────────────────────────────

class NewsModerationAction(BaseModel):
    url: str
    action: str  # "approve" | "reject" | "reset" | "recategorize" | "pin" | "unpin"
    category: Optional[str] = None

BREAKING_INTEL_MAX_SLOTS = 3


@api_router.get("/admin/news")
async def admin_get_news(
    moderation: Optional[str] = None,
    limit: int = 50,
    offset: int = 0,
    current_user: dict = Depends(get_current_user),
):
    """Return articles with moderation metadata (admin only).
    moderation filter: 'approved' | 'rejected' | 'pending' | None (all)
    """
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin role required")
    limit  = min(max(limit, 1), 200)
    offset = max(0, offset)
    query: dict = {}
    if moderation == "approved":
        query["adminApproved"] = True
    elif moderation == "rejected":
        query["adminRejected"] = True
    elif moderation == "pending":
        query["adminApproved"] = {"$ne": True}
        query["adminRejected"] = {"$ne": True}
    articles = await db.news_articles.find(
        query, {"_id": 0}
    ).sort([("scrapedAt", -1)]).skip(offset).limit(limit).to_list(limit)
    return [_normalise_article(a) for a in articles]


@api_router.get("/admin/breaking-intel")
async def get_breaking_intel_slots(
    current_user: dict = Depends(get_current_user),
):
    """Return the current Breaking Intel pinned articles (admin only)."""
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin role required")
    articles = await db.news_articles.find(
        {"breakingIntel": True}, {"_id": 0}
    ).sort([("breakingIntelSetAt", 1)]).to_list(BREAKING_INTEL_MAX_SLOTS)
    return [_normalise_article(a) for a in articles]


@api_router.patch("/admin/news/moderate")
async def moderate_news_article(
    data: NewsModerationAction,
    current_user: dict = Depends(get_current_user),
):
    """Approve, reject, reset, recategorize, pin, or unpin a news article (admin only)."""
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin role required")
    exists = await db.news_articles.find_one({"url": data.url}, {"_id": 1})
    if not exists:
        raise HTTPException(status_code=404, detail="Article not found")
    if data.action == "approve":
        update = {"$set": {"adminApproved": True}, "$unset": {"adminRejected": ""}}
    elif data.action == "reject":
        update = {"$set": {"adminRejected": True}, "$unset": {"adminApproved": ""}}
    elif data.action == "reset":
        update = {"$unset": {"adminApproved": "", "adminRejected": ""}}
    elif data.action == "recategorize":
        if not data.category:
            raise HTTPException(status_code=400, detail="category is required for recategorize")
        update = {"$set": {"category": data.category}}
    elif data.action == "pin":
        # Enforce max 3 slots
        current_count = await db.news_articles.count_documents({"breakingIntel": True})
        if current_count >= BREAKING_INTEL_MAX_SLOTS:
            raise HTTPException(
                status_code=409,
                detail=f"Breaking Intel is full ({BREAKING_INTEL_MAX_SLOTS}/{BREAKING_INTEL_MAX_SLOTS} slots). Unpin an article first.",
            )
        update = {
            "$set": {
                "breakingIntel": True,
                "breakingIntelSetAt": datetime.now(timezone.utc).isoformat(),
            }
        }
    elif data.action == "unpin":
        update = {"$unset": {"breakingIntel": "", "breakingIntelSetAt": ""}}
    else:
        raise HTTPException(status_code=400, detail=f"Unknown action: {data.action}")
    await db.news_articles.update_one({"url": data.url}, update)
    return {"ok": True}


async def clear_breaking_intel_job():
    """Clear Breaking Intel pins — called at 07:00 and 19:00 UTC (every half-day)."""
    result = await db.news_articles.update_many(
        {"breakingIntel": True},
        {"$unset": {"breakingIntel": "", "breakingIntelSetAt": ""}},
    )
    logger.info("Breaking Intel slots cleared: %d articles unpinned", result.modified_count)


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

                # 1. Exact (acquirer_norm, target_norm) match
                existing = await db.ma_activities.find_one(key, {"_id": 0, "id": 1})

                if not existing:
                    # 2. First-word prefix match — catches "Bombardier C Series" vs "Bombardier"
                    acq_words = key["acquirer_norm"].split()
                    tgt_words = key["target_norm"].split()
                    acq_first = acq_words[0] if acq_words else ""
                    tgt_first = tgt_words[0] if tgt_words else ""
                    if acq_first and tgt_first:
                        first_word_match = await db.ma_activities.find_one(
                            {
                                "acquirer_norm": {"$regex": f"^{re.escape(acq_first)}"},
                                "target_norm":   {"$regex": f"^{re.escape(tgt_first)}"},
                            },
                            {"_id": 0, "id": 1},
                        )
                        if first_word_match:
                            existing = first_word_match

                if not existing:
                    # 3. Raw name match — catches entries seeded before norm fields existed
                    name_match = await db.ma_activities.find_one(
                        {"acquirer": signal["acquirer"], "target": signal["target"]},
                        {"_id": 0, "id": 1},
                    )
                    if name_match:
                        existing = name_match

                if not existing:
                    # 4. Guard against generic/low-quality targets (e.g. "Formation", "Multiple targets")
                    target_raw = signal.get("target", "")
                    generic_targets = {"formation", "multiple targets", "various targets", "undisclosed", "unknown"}
                    if target_raw.lower().strip() in generic_targets:
                        logger.warning("Skipping scraper signal with generic target '%s'", target_raw)
                        continue

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

# ============= COMPANY NEWS SCRAPER JOB =============

async def _enrich_article_image_bg(article_url: str, article_title: str) -> None:
    """Background task: fetch og:image for a single article and patch its DB record.

    Called with asyncio.create_task() right after a new article is inserted so the
    main scraper loop is never blocked.  Uses a 3 s timeout to keep things snappy.
    Only writes to the DB when an image is found AND the document still has none
    (avoids racing with a concurrent scrape that already set an image).
    """
    from services.news_scraper import _fetch_og_image
    try:
        img = await asyncio.to_thread(_fetch_og_image, article_url, 3)
        if img:
            await db.news_articles.update_one(
                {"url": article_url, "image": None},
                {"$set": {"image": img}},
            )
    except Exception as exc:
        logger.debug("Image enrichment for '%s' failed: %s", article_title, exc)


async def run_company_news_scraper_job() -> dict:
    """
    Every 6 hours: for each company in defense_players, fetch the 5 most
    recent Google News articles and insert new ones into news_articles.

    Deduplication is URL-based: articles that already exist in the collection
    are skipped entirely (no overwrite of curated fields).
    """
    from services.company_news_scraper import scrape_company_news

    logger.info("Company news scraper job started")
    try:
        # Fetch every tracked company name
        players = await db.defense_players.find({}, {"_id": 0, "name": 1}).to_list(None)
        company_names = [p["name"] for p in players if p.get("name")]
        if not company_names:
            logger.warning("Company news scraper: no companies found in defense_players")
            return {"status": "no_companies"}

        logger.info("Company news scraper: processing %d companies", len(company_names))

        # Run synchronous HTTP calls in a thread to avoid blocking the event loop
        raw_articles = await asyncio.to_thread(scrape_company_news, company_names)

        scraped_at = datetime.now(timezone.utc)
        saved = 0
        skipped = 0

        for article in raw_articles:
            url = article.get("url", "")
            if not url:
                continue
            try:
                pub_at = article.get("publishedAt", scraped_at)
                # Fields set only on first insert (stable metadata)
                on_insert = {
                    "url":               url,
                    "image":             article.get("image"),
                    "publishedAt":       pub_at.isoformat() if isinstance(pub_at, datetime) else pub_at,
                    "scrapedAt":         scraped_at.isoformat(),
                    "language":          "en",
                    "region":            article.get("region", "global"),
                    "source_count":      1,
                    "covered_by":        [article.get("source", "")],
                    "companies":         article.get("companies", []),
                    "companyTag":        article.get("companyTag", ""),
                    "isCompanySpecific": True,
                }
                # Display fields always refreshed so re-scraped articles pick up
                # the cleaned title / real outlet from _parse_google_title.
                always_set = {
                    "title":          article.get("title", ""),
                    "summary":        article.get("summary", ""),
                    "source":         article.get("source", ""),
                    "realSource":     article.get("realSource", ""),
                    "sourceLogo":     article.get("sourceLogo", ""),
                    "category":       article.get("category", "INDUSTRY"),
                    "relevanceScore": article.get("relevanceScore", 0),
                }
                result = await db.news_articles.update_one(
                    {"url": url},
                    {"$setOnInsert": on_insert, "$set": always_set},
                    upsert=True,
                )
                if result.upserted_id is not None:
                    saved += 1
                    if not article.get("image"):
                        asyncio.create_task(
                            _enrich_article_image_bg(url, article.get("title", ""))
                        )
                else:
                    skipped += 1
            except Exception as exc:
                logger.error("Company news: error saving '%s': %s", article.get("title", ""), exc)

        stats = {
            "companies_processed": len(company_names),
            "articles_found":      len(raw_articles),
            "articles_saved":      saved,
            "articles_skipped":    skipped,
        }
        logger.info("Company news scraper job complete: %s", stats)
        return stats

    except Exception as exc:
        logger.error("Company news scraper job failed: %s", exc)
        return {"error": str(exc)}


@api_router.post("/news/scrape-company-news")
async def trigger_company_news_scraper(current_user: dict = Depends(get_current_user)):
    """Admin endpoint: manually trigger the company-specific news scraper."""
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    result = await run_company_news_scraper_job()
    return result


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

async def _apply_company_enrichments():
    """Upsert profile fields (founded_year, headquarters, website, …) from COMPANY_ENRICHMENTS."""
    try:
        from data.seed_data import COMPANY_ENRICHMENTS
        for name, fields in COMPANY_ENRICHMENTS.items():
            await db.defense_players.update_one(
                {"name": {"$regex": f"^{re.escape(name)}$", "$options": "i"}},
                {"$set": fields},
            )
        logger.info("Company enrichments applied: %d entries", len(COMPANY_ENRICHMENTS))
    except Exception as exc:
        logger.error("Company enrichments error: %s", exc)

# Known-incorrect M&A entries that must be purged from the DB.
# These crept in via old seeds or scraper hallucinations and have the wrong acquirer.
_STALE_MA_DEALS = [
    {"acquirer": "Thales", "target": "Preligens"},         # acquired by Safran, not Thales
    {"acquirer": "Dassault Aviation", "target": "Harmattan.ai"},   # renamed target to "Harmattan AI"
    # phase1.1 corrections:
    {"acquirer": "RTX", "target": "Nightwing Group"},      # RTX was seller; corrected to Blackstone acq.
    {"acquirer": "L3Harris", "target": "Aerojet Rocketdyne"},  # old short-name dup
    {"acquirer": "Hanwha Ocean", "target": "Daewoo Shipbuilding & Marine Engineering"},  # wrong acquirer name
    # phase1.5 corrections:
    # SCAF/FCAS Phase 2.3 duplicate (different acquirer string + target name)
    {"acquirer": "Airbus + Dassault + Indra", "target": "FCAS / SCAF Industrial JV"},
    # Old SCAF entry with "active" status and Jan 2022 date (replaced by corrected entry)
    {"acquirer": "Airbus + Dassault Aviation + Indra", "target": "SCAF/FCAS Industrial JV"},
    # Old MGCS entry with 2-party acquirer string (replaced by full 4-party Phase 2.3 entry)
    {"acquirer": "KNDS + Rheinmetall", "target": "MGCS Programme JV"},
    # Guard against L3Harris merger duplicate (scraper may inject "L3Harris Technologies" as acquirer)
    {"acquirer": "L3Harris Technologies", "target": "L3 Technologies"},
    # Stale short-name variant of the Hanwha/DSME deal (superseded by "Hanwha Group" entry)
    {"acquirer": "Hanwha", "target": "Daewoo Shipbuilding"},
]

_HIGH_CONF_URL_RE = re.compile(
    r"businesswire\.com|prnewswire\.com|reuters\.com|bloomberg\.com|"
    r"spaceflightnow\.com|defensenews\.com|breakingdefense\.com|"
    r"aviationweek\.com|janes\.com|flightglobal\.com|"
    r"/newsroom/press-release|/press-releases?/|/news-releases?[/\?]|"
    r"/completes-acquisition|/completes-merger|/completes-takeover|"
    r"/finalizes-acquisition|/signs-agreement|/signs-definitive|"
    r"mediaroom\.com|"
    r"/\d{4}/\d{2}/",   # dated path like /2024/07/
    re.I,
)


async def _migrate_ma_enrichments():
    """
    On startup, unconditionally upsert all seed-data enrichments into MA documents.
    Runs every restart so that new fields (logo domains, source_url, rationale) are
    always applied even if older enrichments already existed on the documents.
    """
    try:
        logger.info("MA migration: applying enrichments from seed data")
        from data.seed_data import MA_DATA, MA_EXTRA_DEALS, MA_EUROPE_DEALS

        # Purge known-incorrect entries before upserting correct ones
        for stale in _STALE_MA_DEALS:
            result = await db.ma_activities.delete_many(stale)
            if result.deleted_count:
                logger.info("MA migration: removed %d stale entry/entries %s", result.deleted_count, stale)

        all_deals = MA_DATA + MA_EXTRA_DEALS + MA_EUROPE_DEALS
        for m in all_deals:
            activity = MAActivity(**m)
            doc = activity.model_dump()
            doc["announced_date"] = doc["announced_date"].isoformat()
            if doc.get("closed_date") and isinstance(doc["closed_date"], datetime):
                doc["closed_date"] = doc["closed_date"].isoformat()
            await db.ma_activities.update_one(
                {"acquirer": m["acquirer"], "target": m["target"]},
                {"$set": doc},
                upsert=True,
            )
        logger.info("MA migration complete — %d deals upserted", len(all_deals))

        # Apply confidence defaults for deals that don't have it explicitly set in seed data.
        # "high"   → specific press-release URL (dated path, wire service, or known trade press)
        # "medium" → everything else (generic newsroom homepage, company website, etc.)
        high_result = await db.ma_activities.update_many(
            {
                "confidence": None,
                "source_url": {"$regex": _HIGH_CONF_URL_RE.pattern, "$options": "i"},
            },
            {"$set": {"confidence": "high"}},
        )
        medium_result = await db.ma_activities.update_many(
            {"confidence": None},
            {"$set": {"confidence": "medium"}},
        )
        logger.info(
            "MA migration: confidence defaults — %d high, %d medium",
            high_result.modified_count,
            medium_result.modified_count,
        )
    except Exception as exc:
        logger.error("MA migration error: %s", exc)

async def _apply_product_images():
    """
    Fetch a Wikipedia thumbnail for every product and store it in the DB.
    Runs on every startup; replaces any existing image_url so broken Wikimedia
    hash-prefix URLs get corrected automatically.
    Uses the Wikipedia REST summary API which always returns valid thumbnail URLs.
    """
    import asyncio
    import requests as _req

    # Some product names don't match Wikipedia article titles — map them here
    WIKI_TITLE_OVERRIDES = {
        "F-35 Lightning II": "Lockheed Martin F-35 Lightning II",
        "F-22 Raptor": "Lockheed Martin F-22 Raptor",
        "Rafale F4": "Dassault Rafale",
        "Eurofighter Typhoon": "Eurofighter Typhoon",
        "Gripen E": "Saab JAS 39 Gripen",
        "KF-21 Boramae": "KAI KF-21 Boramae",
        "Patriot PAC-3": "MIM-104 Patriot",
        "S-400 Triumf": "S-400 missile system",
        "Iron Dome": "Iron Dome",
        "THAAD": "Terminal High Altitude Area Defense",
        "Virginia-class Submarine": "Virginia-class submarine",
        "Astute-class Submarine": "Astute-class submarine",
        "Barracuda-class Submarine": "Suffren-class submarine",
        "M1A2 Abrams SEPv3": "M1 Abrams",
        "Leopard 2A7+": "Leopard 2",
        "K2 Black Panther": "K2 Black Panther",
        "Leclerc": "AMX-56 Leclerc",
        "MQ-9 Reaper": "General Atomics MQ-9 Reaper",
        "Bayraktar TB2": "Bayraktar TB2",
        "K9 Thunder": "K9 Thunder",
        "CAESAR": "CAESAR howitzer",
        "PzH 2000": "Panzerhaubitze 2000",
        "Type 26 Frigate": "Type 26 frigate",
        "FREMM Frigate": "FREMM multipurpose frigate",
        "F-15EX Eagle II": "McDonnell Douglas F-15 Eagle",
        "F/A-18E/F Super Hornet": "Boeing F/A-18E/F Super Hornet",
        "Su-57 Felon": "Sukhoi Su-57",
        "J-20 Mighty Dragon": "Chengdu J-20",
        "HAL Tejas Mk2": "HAL Tejas",
        "B-21 Raider": "Northrop Grumman B-21 Raider",
        "B-2 Spirit": "Northrop Grumman B-2 Spirit",
        "A-10 Thunderbolt II": "Fairchild Republic A-10 Thunderbolt II",
        "AH-64E Apache Guardian": "Boeing AH-64 Apache",
        "UH-60M Black Hawk": "Sikorsky UH-60 Black Hawk",
        "NH90": "NHIndustries NH90",
        "Tigre HAD": "Eurocopter Tiger",
        "CH-47F Chinook": "Boeing CH-47 Chinook",
        "V-22 Osprey": "Bell Boeing V-22 Osprey",
        "C-17 Globemaster III": "Boeing C-17 Globemaster III",
        "A400M Atlas": "Airbus A400M Atlas",
        "KC-46 Pegasus": "Boeing KC-46 Pegasus",
        "MQ-4C Triton": "Northrop Grumman MQ-4C Triton",
        "RQ-4 Global Hawk": "Northrop Grumman RQ-4 Global Hawk",
        "XQ-58 Valkyrie": "Kratos XQ-58 Valkyrie",
        "Bayraktar TB3": "Bayraktar TB3",
        "Bayraktar Kizilelma": "Bayraktar Kızılelma",
        "Shahed-136": "Shahed-136",
        "Switchblade 600": "AeroVironment Switchblade",
        "Tomahawk Block V": "Tomahawk (missile)",
        "SCALP/Storm Shadow": "Storm Shadow",
        "AGM-158 JASSM-ER": "AGM-158 JASSM",
        "Meteor BVRAAM": "MBDA Meteor",
        "AIM-120D AMRAAM": "AIM-120 AMRAAM",
        "Hellfire AGM-114R": "AGM-114 Hellfire",
        "Javelin FGM-148": "FGM-148 Javelin",
        "NSM Naval Strike Missile": "Naval Strike Missile",
        "Harpoon Block II": "AGM-84 Harpoon",
        "ASTER 30 SAMP/T": "Aster 30",
        "NASAMS": "NASAMS",
        "David's Sling": "David's Sling",
        "AGM-183A ARRW": "AGM-183 ARRW",
        "Kinzhal": "Kh-47M2 Kinzhal",
        "Arleigh Burke Flight III": "Arleigh Burke-class destroyer",
        "Type 45 Daring-class": "Type 45 destroyer",
        "Horizon-class Frigate": "Horizon-class frigate",
        "Mistral-class LHD": "Mistral-class amphibious assault ship",
        "Gerald R. Ford-class": "Gerald R. Ford-class aircraft carrier",
        "Queen Elizabeth-class": "Queen Elizabeth-class aircraft carrier",
        "Charles de Gaulle": "French aircraft carrier Charles de Gaulle",
        "Columbia-class Submarine": "Columbia-class submarine",
        "Le Triomphant-class": "Le Triomphant-class submarine",
        "Challenger 3": "Challenger 2",
        "T-14 Armata": "T-14 Armata",
        "Merkava Mk 4M": "Merkava",
        "VBCI": "VBCI",
        "CV90 Mk IV": "CV90",
        "Puma IFV": "Puma (IFV)",
        "Boxer MRAV": "Boxer (armoured fighting vehicle)",
        "Stryker ICVV": "Stryker",
        "M270 MLRS": "M270 Multiple Launch Rocket System",
        "HIMARS": "M142 HIMARS",
        "ARCHER 155mm": "Archer artillery system",
        "GPS III Satellite": "GPS Block III",
        "SBIRS GEO": "Space Based Infrared System",
        "X-37B Space Plane": "Boeing X-37",
        "AN/ALQ-99 Jammer": "EA-18G Growler",
        "F-16 Block 70/72": "General Dynamics F-16 Fighting Falcon",
        "E-7A Wedgetail": "Boeing E-7",
        "P-8A Poseidon": "Boeing P-8 Poseidon",
        "E-2D Advanced Hawkeye": "Northrop Grumman E-2 Hawkeye",
        "KC-135 Stratotanker": "Boeing KC-135 Stratotanker",
        "MQ-1C Gray Eagle": "General Atomics MQ-1C Gray Eagle",
        "AN/TPS-80 G/ATOR": "AN/TPS-80 G/ATOR",
        "Namer APC": "Namer",
        "Bradley M2A4": "M2 Bradley",
        "Zumwalt-class Destroyer": "Zumwalt-class destroyer",
        "LRASM AGM-158C": "AGM-158C LRASM",
        "Starstreak HVM": "Starstreak",
        "BrahMos": "BrahMos",
        "SM-6 Standard Missile": "RIM-174 Standard ERAM",
        "Arjun Mk-1A": "Arjun (tank)",
        "Su-35S Flanker-E": "Sukhoi Su-35",
        "Tornado IDS": "Panavia Tornado",
        "AV-8B Harrier II": "McDonnell Douglas AV-8B Harrier II",
        "Heron TP": "IAI Heron",
        "Wing Loong II": "CAIG Wing Loong II",
        "AC-130J Ghostrider": "Lockheed AC-130",
        "Taurus KEPD 350": "Taurus (missile)",
        "IRIS-T SLM": "IRIS-T",
        "Arrow 3": "Arrow 3",
        "Barak 8 LRSAM": "Barak 8",
        "RIM-161 SM-3": "RIM-161 Standard Missile 3",
        "Type 055 Destroyer": "Type 055 destroyer",
        "INS Vikrant": "INS Vikrant (2013)",
        "K21 IFV": "K21 infantry fighting vehicle",
        "JLTV": "Joint Light Tactical Vehicle",
        "M109A7 Paladin": "M109 howitzer",
        "AS-90 Braveheart": "AS-90",
        "Ground Master 400": "Thales Ground Master 400",
        "SPY-6 AMDR": "AN/SPY-6",
        "AN/TPY-2": "AN/TPY-2",
        "EA-18G Growler": "Boeing EA-18G Growler",
        "RC-135V/W Rivet Joint": "Boeing RC-135",
        "Watchkeeper WK450": "Thales Watchkeeper",
        "Crotale NG": "Crotale (missile)",
        "Exocet MM40 Block 3": "Exocet",
        "RBS-15 Mk4": "RBS-15",
        "Visby-class Corvette": "Visby-class corvette",
        "Type 212 Submarine": "Type 212 submarine",
        "Soryu-class Submarine": "Sōryū-class submarine",
        "AGM-88G AARGM-ER": "AGM-88 HARM",
        "SSBN Le Terrible": "Le Triomphant-class submarine",
        "Marder IFV": "Marder (IFV)",
        "AMX-10RC": "AMX-10 RC",
        "Altay Tank": "Altay (tank)",
        "VT-4 Tank": "VT-4",
        "Constellation-class Frigate": "Constellation-class frigate",
        "Gowind-class Corvette": "Gowind-class corvette",
        "Sa'ar 6 Corvette": "Sa'ar 6-class corvette",
    }

    def _fetch_wiki_thumb(product_name: str) -> Optional[str]:
        """Synchronous Wikipedia REST API call — run in thread pool."""
        title = WIKI_TITLE_OVERRIDES.get(product_name, product_name)
        encoded = title.replace(" ", "_")
        url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{encoded}"
        headers = {"User-Agent": "DefenseIntelligenceHub/1.0 (internal dashboard)"}
        try:
            resp = _req.get(url, headers=headers, timeout=6)
            if resp.status_code == 200:
                data = resp.json()
                if data.get("thumbnail"):
                    src = data["thumbnail"]["source"]
                    # Upscale thumbnail to ~600px for better quality
                    for size in ["/320px-", "/200px-", "/150px-", "/100px-"]:
                        src = src.replace(size, "/600px-")
                    return src
        except Exception:
            pass
        return None

    try:
        products = await db.products.find({}).to_list(None)
        logger.info("Wikipedia image migration: fetching images for %d products", len(products))
        updated = 0
        sem = asyncio.Semaphore(8)  # max 8 concurrent requests

        async def update_one(p):
            nonlocal updated
            async with sem:
                img = await asyncio.to_thread(_fetch_wiki_thumb, p["name"])
                if img:
                    await db.products.update_one({"_id": p["_id"]}, {"$set": {"image_url": img}})
                    updated += 1

        await asyncio.gather(*[update_one(p) for p in products])
        logger.info("Wikipedia image migration complete — %d/%d products updated", updated, len(products))
    except Exception as exc:
        logger.error("Product image migration error: %s", exc)

async def _purge_scraper_junk():
    """
    Run on every startup — remove hallucinated / duplicate scraper M&A entries.
    Uses direct MongoDB queries so no Python-side iteration needed for the
    most obvious cases. Then does a cross-reference pass against seed data.
    """
    try:
        import re as _re

        # ── Pass 1: delete scraper entries with no source URL ─────────────────
        r1 = await db.ma_activities.delete_many({
            "scraped_at": {"$exists": True},
            "$or": [{"source_url": None}, {"source_url": ""}],
        })

        # ── Pass 2: delete entries whose target is a known hallucination ──────
        _HALLUC_RE = (
            r"^(formation|multiple\s+targets?|multiple\s+(uae\s+)?defense\s+companies?|"
            r"various|combined|new\s+\w+|subsidiary|unnamed|undisclosed(\s+target)?|"
            r"strategic\s+assets?|portfolio\s+(companies?|co\.?)|defense\s+assets?|"
            r"aerospace\s+assets?|target\s+company|several\s+companies?|"
            r"multiple|various\s+companies?)$"
        )
        r2 = await db.ma_activities.delete_many({
            "scraped_at": {"$exists": True},
            "target": {"$regex": _HALLUC_RE, "$options": "i"},
        })

        # ── Pass 3: cross-reference against seeded (acquirer, target) pairs ───
        from data.seed_data import MA_DATA, MA_EXTRA_DEALS, MA_EUROPE_DEALS, MA_PILOT_10

        def _norm(s: str) -> str:
            return _re.sub(r"\s+", " ", s.lower().strip())

        # Build lookup: first word of acquirer → set of first words of targets
        seed_pairs: set = set()
        seed_tgt_words: set = set()
        seed_acq_first: set = set()
        for m in MA_DATA + MA_EXTRA_DEALS + MA_EUROPE_DEALS + MA_PILOT_10:
            aw = _norm(m["acquirer"]).split()
            tw = _norm(m["target"]).split()
            if aw and tw:
                seed_pairs.add((aw[0], tw[0]))
                seed_acq_first.add(aw[0])
            for w in tw:
                if len(w) > 3:
                    seed_tgt_words.add(w)

        scraped = await db.ma_activities.find(
            {"scraped_at": {"$exists": True}},
            {"_id": 0, "id": 1, "acquirer": 1, "target": 1},
        ).to_list(5000)

        r3 = 0
        for e in scraped:
            aw = _norm(e.get("acquirer", "")).split()
            tw = _norm(e.get("target", "")).split()
            if not aw or not tw:
                await db.ma_activities.delete_one({"id": e["id"]}); r3 += 1; continue
            exact = (aw[0], tw[0]) in seed_pairs
            acq_known = aw[0] in seed_acq_first
            tgt_dup = any(w in seed_tgt_words for w in tw if len(w) > 3)
            if exact or (acq_known and tgt_dup):
                await db.ma_activities.delete_one({"id": e["id"]}); r3 += 1

        logger.info(
            "M&A scraper junk purge: %d no-source, %d hallucinated target, %d duplicates removed",
            r1.deleted_count, r2.deleted_count, r3,
        )
    except Exception as exc:
        logger.warning("M&A scraper junk purge failed (non-fatal): %s", exc)


async def _auto_seed():
    """Silently seed reference data on startup. Errors are logged, never raised."""
    try:
        result = await _run_seed()
        logger.info("Auto-seed complete: %s", result)
    except Exception as exc:
        logger.warning("Auto-seed failed (non-fatal): %s", exc)


async def _migrate_google_news_sources() -> None:
    """Back-fill realSource / sourceLogo on articles that were inserted before
    this logic existed.

    Two passes:
    1. Company-specific articles: parse title suffix to extract real outlet.
    2. All other articles missing sourceLogo: derive logo from existing source name.

    Safe to re-run (idempotent): each pass only touches documents still missing
    the field, so both exit immediately once all articles are migrated.
    """
    from services.company_news_scraper import (
        _parse_google_title,
        _source_to_clearbit_domain,
        _GOOGLE_NEWS_LOGO,
    )

    # ── Pass 1: company-specific — parse title to extract outlet ─────────────
    pending = await db.news_articles.count_documents({
        "isCompanySpecific": True,
        "$or": [{"realSource": {"$exists": False}}, {"realSource": ""}],
    })
    if pending > 0:
        logger.info("Google News source migration (company): %d articles to update", pending)
        cursor = db.news_articles.find(
            {"isCompanySpecific": True, "$or": [{"realSource": {"$exists": False}}, {"realSource": ""}]},
            {"_id": 1, "url": 1, "title": 1, "image": 1},
        )
        updated = 0
        async for article in cursor:
            raw_title    = article.get("title", "")
            clean_title, real_source = _parse_google_title(raw_title)
            domain       = _source_to_clearbit_domain(real_source) if real_source else ""
            source_logo  = f"https://logo.clearbit.com/{domain}" if domain else _GOOGLE_NEWS_LOGO
            await db.news_articles.update_one(
                {"_id": article["_id"]},
                {"$set": {
                    "title":      clean_title,
                    "source":     real_source or article.get("source", ""),
                    "realSource": real_source,
                    "sourceLogo": source_logo,
                }},
            )
            updated += 1
            if not article.get("image") and article.get("url"):
                asyncio.create_task(_enrich_article_image_bg(article["url"], clean_title))
        logger.info("Google News source migration (company) complete: %d updated", updated)

    # ── Pass 2: all articles missing sourceLogo — derive from source name ─────
    pending2 = await db.news_articles.count_documents({
        "$or": [{"sourceLogo": {"$exists": False}}, {"sourceLogo": ""}],
    })
    if pending2 > 0:
        logger.info("Source logo migration (all): %d articles to update", pending2)
        cursor2 = db.news_articles.find(
            {"$or": [{"sourceLogo": {"$exists": False}}, {"sourceLogo": ""}]},
            {"_id": 1, "source": 1, "url": 1, "image": 1, "title": 1},
        )
        updated2 = 0
        async for article in cursor2:
            src_name    = article.get("source", "")
            domain      = _source_to_clearbit_domain(src_name) if src_name else ""
            source_logo = f"https://logo.clearbit.com/{domain}" if domain else ""
            await db.news_articles.update_one(
                {"_id": article["_id"]},
                {"$set": {"sourceLogo": source_logo, "realSource": src_name}},
            )
            updated2 += 1
            if not article.get("image") and article.get("url"):
                asyncio.create_task(_enrich_article_image_bg(article["url"], article.get("title", "")))
        logger.info("Source logo migration (all) complete: %d updated", updated2)


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
        await db.news_articles.create_index([("companyTag", 1)])
        await db.news_articles.create_index([("isCompanySpecific", 1)])
        logger.info("news_articles + bookmarks indexes ready")
    except Exception as exc:
        logger.warning("Index creation warning: %s", exc)

    # One-time data migration: remove legacy Nexter Systems (superseded by KNDS)
    try:
        result = await db.defense_players.delete_one({"name": "Nexter Systems"})
        if result.deleted_count:
            logger.info("Migration: removed legacy 'Nexter Systems' company (replaced by KNDS)")
    except Exception as exc:
        logger.warning("Migration cleanup warning: %s", exc)

    # News scraper: 4× per day (every 6 hours) — 01:00, 07:00, 13:00, 19:00 UTC
    scheduler.add_job(run_news_scraper_job,       "cron", hour=1,  minute=0, id="night_news_scraper")
    scheduler.add_job(run_news_scraper_job,       "cron", hour=7,  minute=0, id="morning_news_scraper")
    scheduler.add_job(run_news_scraper_job,       "cron", hour=13, minute=0, id="midday_news_scraper")
    scheduler.add_job(run_news_scraper_job,       "cron", hour=19, minute=0, id="evening_news_scraper")
    scheduler.add_job(clear_breaking_intel_job,   "cron", hour=1,  minute=5, id="night_breaking_intel_clear")
    scheduler.add_job(clear_breaking_intel_job,   "cron", hour=7,  minute=5, id="morning_breaking_intel_clear")
    scheduler.add_job(clear_breaking_intel_job,   "cron", hour=13, minute=5, id="midday_breaking_intel_clear")
    scheduler.add_job(clear_breaking_intel_job,   "cron", hour=19, minute=5, id="evening_breaking_intel_clear")
    scheduler.add_job(run_ma_scraper_job,         "interval", hours=6,       id="ma_scraper")
    scheduler.add_job(
        run_company_news_scraper_job,
        "interval",
        hours=6,
        id="company_news_scraper",
        # First run 10 minutes after startup — avoids hammering APIs at boot
        next_run_time=datetime.now(timezone.utc) + timedelta(minutes=10),
    )
    scheduler.start()
    logger.info("Schedulers started — news at 01:00/07:00/13:00/19:00 UTC, Breaking Intel clear +5 min, M&A every 6 h, company news every 6 h (first run +10 min)")

    # Kick off a background scrape so articles appear immediately on first deploy
    asyncio.create_task(_initial_scrape_if_empty())
    # Apply MA enrichments (dates, countries, logos, rationale) to any stale DB docs
    asyncio.create_task(_migrate_ma_enrichments())
    # Apply company profile enrichments (founded_year, headquarters, website, …)
    asyncio.create_task(_apply_company_enrichments())
    # Apply image URLs to products that are missing them
    asyncio.create_task(_apply_product_images())
    # Always start with a fresh stock cache so stale values never survive restarts
    invalidate_stock_cache()
    logger.info("Stock price cache cleared on startup")
    # Auto-seed reference data on every startup (idempotent — skips existing rows)
    asyncio.create_task(_auto_seed())
    # Purge scraper junk immediately — no button click needed
    asyncio.create_task(_purge_scraper_junk())
    # Back-fill realSource / sourceLogo on old Google News articles (runs once)
    asyncio.create_task(_migrate_google_news_sources())

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
