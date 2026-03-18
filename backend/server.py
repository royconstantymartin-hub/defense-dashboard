from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
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
import jwt
import bcrypt
import requests
import xml.etree.ElementTree as ET
import re
from email.utils import parsedate_to_datetime
from html import unescape
from urllib.parse import quote_plus
from rss_feed import router as rss_feed_router

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT Configuration
JWT_SECRET = os.environ.get('JWT_SECRET', 'defense-dashboard-secret-key-2024')
JWT_ALGORITHM = "HS256"

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")
security = HTTPBearer()

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
    source_url: Optional[str] = None
    date: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# M&A Model
class MAActivityCreate(BaseModel):
    acquirer: str
    target: str
    deal_value: float  # in millions USD
    status: str  # announced, pending, completed, cancelled
    deal_type: str  # acquisition, merger, joint_venture
    description: str
    source: Optional[str] = None
    source_url: Optional[str] = None

class MAActivity(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    acquirer: str
    target: str
    deal_value: float
    status: str
    deal_type: str
    description: str
    source: Optional[str] = None
    source_url: Optional[str] = None
    announced_date: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

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


class DataQualitySummary(BaseModel):
    source_provider: str
    dataset_policy: str
    coverage: dict
    freshness: dict
    generated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ExternalMAItem(BaseModel):
    title: str
    link: str
    published_at: Optional[datetime] = None
    source: str = "The Defense Post"
    deal_type: str = "acquisition"
    status: str = "announced"
    acquirer: Optional[str] = None
    target: Optional[str] = None
    confidence: str = "low"
    notes: str


class MAImportRequest(BaseModel):
    items: List[ExternalMAItem]


class MAImportResult(BaseModel):
    imported: int
    duplicates: int
    skipped: int


DEFENSE_POST_RSS_URL = "https://thedefensepost.com/feed/"
MA_KEYWORDS = (
    "acquire",
    "acquires",
    "acquired",
    "acquisition",
    "merger",
    "m&a",
    "buyout",
    "takes stake",
)

DEFENSE_INTEL_SOURCES = (
    {"source": "The Defense Post", "url": "https://thedefensepost.com/feed/", "translate": False},
    {"source": "Opex News", "url": "https://opex360.com/feed/", "translate": True},
    {"source": "Les Echos", "url": "https://www.lesechos.fr/rss/rss_une.xml", "translate": True},
)

DEFENSE_KEYWORDS = (
    "defense",
    "défense",
    "military",
    "armée",
    "armement",
    "missile",
    "drone",
    "navy",
    "air force",
    "space force",
    "nato",
)

SOURCE_SEARCH_URLS = {
    "The Defense Post": "https://thedefensepost.com/?s={query}",
    "Defense Post": "https://thedefensepost.com/?s={query}",
    "Opex News": "https://opex360.com/?s={query}",
    "Les Echos": "https://www.lesechos.fr/recherche?q={query}",
}


def _looks_like_ma(text: str) -> bool:
    value = (text or "").lower()
    return any(keyword in value for keyword in MA_KEYWORDS)


def _extract_companies_from_title(title: str) -> tuple[Optional[str], Optional[str], str]:
    cleaned = (title or "").strip()
    patterns = [
        r"^(?P<acquirer>.+?)\s+acquires\s+(?P<target>.+)$",
        r"^(?P<acquirer>.+?)\s+to\s+acquire\s+(?P<target>.+)$",
        r"^(?P<acquirer>.+?)\s+completes\s+acquisition\s+of\s+(?P<target>.+)$",
        r"^(?P<acquirer>.+?)\s+to\s+buy\s+(?P<target>.+)$",
    ]
    for raw_pattern in patterns:
        match = re.match(raw_pattern, cleaned, re.IGNORECASE)
        if match:
            acquirer = match.group("acquirer").strip(" -:")
            target = match.group("target").strip(" -:")
            return acquirer, target, "medium"
    return None, None, "low"


def _parse_pub_date(value: Optional[str]) -> Optional[datetime]:
    if not value:
        return None
    value = value.strip()
    # RFC 822 date format used by RSS feeds (e.g., Tue, 18 Mar 2025 12:00:00 +0000)
    try:
        return datetime.strptime(value, "%a, %d %b %Y %H:%M:%S %z")
    except ValueError:
        return None


def _parse_rss_item_datetime(item: ET.Element) -> Optional[datetime]:
    raw_value = (
        item.findtext("pubDate")
        or item.findtext("{http://purl.org/dc/elements/1.1/}date")
        or item.findtext("date")
    )
    if not raw_value:
        return None

    try:
        parsed = parsedate_to_datetime(raw_value)
    except (TypeError, ValueError):
        try:
            parsed = datetime.fromisoformat(raw_value.replace("Z", "+00:00"))
        except ValueError:
            return None

    if parsed.tzinfo is None:
        return parsed.replace(tzinfo=timezone.utc)
    return parsed.astimezone(timezone.utc)


def _clean_text(value: Optional[str]) -> str:
    if not value:
        return ""
    normalized = unescape(value)
    normalized = re.sub(r"<[^>]+>", " ", normalized)
    normalized = re.sub(r"\s+", " ", normalized)
    return normalized.strip()


def _extract_excerpt(item: ET.Element) -> str:
    return (
        _clean_text(item.findtext("description"))
        or _clean_text(item.findtext("{http://purl.org/rss/1.0/modules/content/}encoded"))
        or _clean_text(item.findtext("summary"))
    )


def _is_defense_related(text: str) -> bool:
    sample = (text or "").lower()
    return any(keyword in sample for keyword in DEFENSE_KEYWORDS)


def _translate_to_english(text: str) -> str:
    cleaned = (text or "").strip()
    if not cleaned:
        return cleaned
    try:
        response = requests.get(
            "https://translate.googleapis.com/translate_a/single",
            params={
                "client": "gtx",
                "sl": "auto",
                "tl": "en",
                "dt": "t",
                "q": cleaned,
            },
            timeout=10,
        )
        response.raise_for_status()
        payload = response.json()
        translated_chunks = [chunk[0] for chunk in payload[0] if chunk and chunk[0]]
        translated = "".join(translated_chunks).strip()
        return translated or cleaned
    except (requests.RequestException, ValueError, TypeError, IndexError):
        return cleaned


def fetch_recent_intel_preview(hours: int = 24, limit: int = 12) -> List[Announcement]:
    now = datetime.now(timezone.utc)
    cutoff = now - timedelta(hours=hours)
    per_source_limit = max(3, min(limit, 30))
    collected: List[Announcement] = []

    for source_cfg in DEFENSE_INTEL_SOURCES:
        source = source_cfg["source"]
        try:
            response = requests.get(source_cfg["url"], timeout=15)
            response.raise_for_status()
            root = ET.fromstring(response.content)
        except (requests.RequestException, ET.ParseError):
            logging.warning("Recent intel source unavailable: %s", source, exc_info=True)
            continue

        items = root.findall("./channel/item")
        source_count = 0
        for item in items:
            published_at = _parse_rss_item_datetime(item)
            if published_at and published_at < cutoff:
                continue

            title = _clean_text(item.findtext("title"))
            if not title:
                continue

            summary = _extract_excerpt(item)
            combined_text = f"{title} {summary}"
            if source == "Les Echos" and not _is_defense_related(combined_text):
                continue

            if source_cfg["translate"]:
                title = _translate_to_english(title)
                summary = _translate_to_english(summary)

            content = summary or "Summary unavailable from source feed."
            link = (item.findtext("link") or "").strip() or None
            collected.append(
                Announcement(
                    title=title,
                    content=content,
                    source=source,
                    source_url=link,
                    category="regulatory" if _is_defense_related(combined_text) else "contract",
                    date=published_at or now,
                )
            )
            source_count += 1
            if source_count >= per_source_limit:
                break

    collected.sort(key=lambda x: x.date, reverse=True)
    return collected[:limit]


def _build_source_search_url(source: str, title: str) -> Optional[str]:
    template = SOURCE_SEARCH_URLS.get(source)
    if not template or not title:
        return None
    return template.format(query=quote_plus(title))


def fetch_the_defense_post_ma_preview(limit: int = 20) -> List[ExternalMAItem]:
    response = requests.get(DEFENSE_POST_RSS_URL, timeout=15)
    response.raise_for_status()
    root = ET.fromstring(response.content)
    items = root.findall("./channel/item")
    results: List[ExternalMAItem] = []

    for item in items:
        title = item.findtext("title", default="").strip()
        link = item.findtext("link", default="").strip()
        pub_date = _parse_pub_date(item.findtext("pubDate"))
        if not _looks_like_ma(title):
            continue

        acquirer, target, confidence = _extract_companies_from_title(title)
        results.append(
            ExternalMAItem(
                title=title,
                link=link,
                published_at=pub_date,
                acquirer=acquirer,
                target=target,
                confidence=confidence,
                notes=(
                    "Extraction automatique depuis le flux RSS public. "
                    "Validation humaine recommandée avant insertion finale."
                ),
            )
        )
        if len(results) >= limit:
            break

    return results


def _normalize_company_name(value: Optional[str]) -> Optional[str]:
    if not value:
        return None
    cleaned = value.strip(" -:|")
    return cleaned or None


def _build_ma_activity_from_external(item: ExternalMAItem) -> Optional[MAActivity]:
    acquirer = _normalize_company_name(item.acquirer)
    target = _normalize_company_name(item.target)
    if not acquirer or not target:
        return None

    return MAActivity(
        acquirer=acquirer,
        target=target,
        deal_value=0.0,
        status=item.status or "announced",
        deal_type=item.deal_type or "acquisition",
        description=item.title,
        source=item.source or "The Defense Post",
        source_url=item.link,
        announced_date=item.published_at or datetime.now(timezone.utc),
    )

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


@api_router.get("/announcements/external-preview", response_model=List[Announcement])
async def get_external_announcements_preview(hours: int = 24, limit: int = 12):
    safe_hours = max(1, min(hours, 72))
    safe_limit = max(1, min(limit, 30))