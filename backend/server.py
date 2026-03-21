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
from datetime import datetime, timezone
import jwt
import bcrypt

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
    from data.seed_data import DEFENSE_COMPANIES, ANNOUNCEMENTS_DATA, MA_DATA, EXPENDITURES_DATA, REGULATIONS_DATA, PRODUCTS_DATA
    
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
    
    # Seed M&A Activities
    for m in MA_DATA:
        existing = await db.ma_activities.find_one({"acquirer": m['acquirer'], "target": m['target']})
        if not existing:
            activity = MAActivity(**m)
            doc = activity.model_dump()
            doc['announced_date'] = doc['announced_date'].isoformat()
            await db.ma_activities.insert_one(doc)
    
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
    
    # Seed Products
    for p in PRODUCTS_DATA:
        existing = await db.products.find_one({"name": p['name']})
        if not existing:
            product = Product(**p)
            await db.products.insert_one(product.model_dump())
    
    # Get counts
    players_count = await db.defense_players.count_documents({})
    announcements_count = await db.announcements.count_documents({})
    
    return {"status": "Data seeded successfully", "companies": players_count, "announcements": announcements_count}

# ============= ROOT =============

@api_router.get("/")
async def root():
    return {"message": "Defense Dashboard API"}

@app.get("/")
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

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
