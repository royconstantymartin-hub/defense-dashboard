# CLAUDE.md — Defense Intelligence Hub

## User Learning Preference

**IMPORTANT — Always apply this rule:**
After every code change, explain what was done in plain, accessible French (or the language the user writes in). The user is learning to code. For each piece of code written:
- Explain what it does in simple words (no jargon without definition)
- Use analogies when helpful
- Break it into small logical chunks
- Point to the exact file and line numbers



## Project Overview

A full-stack defense industry intelligence dashboard ("Defense Intelligence Hub") for tracking market data, M&A activity, contracts, regulations, products, and announcements across the global defense sector.

**Tech Stack:**
- **Frontend:** React 19, React Router v7, TailwindCSS v3, Shadcn/UI (Radix), Recharts, Lucide icons, CRACO
- **Backend:** FastAPI (Python 3.11), Motor (async MongoDB driver), APScheduler, PyJWT, bcrypt
- **Database:** MongoDB (async via Motor)
- **Auth:** JWT Bearer tokens, stored in `localStorage`
- **Deployment:** Docker (multi-stage build), Railway (`railway.toml`)
- **Package manager:** Yarn 1.22 (frontend), pip (backend)

---

## Repository Structure

```
defense-dashboard/
├── backend/
│   ├── server.py              # FastAPI app — all routes, models, auth, scheduler
│   ├── requirements.txt
│   ├── data/
│   │   ├── companies.py       # Static company data
│   │   └── seed_data.py       # Database seed: 118 companies, 140 products, etc.
│   ├── services/
│   │   ├── stock_service.py   # yfinance live prices + 1-hour in-memory cache
│   │   ├── news_scraper.py    # RSS/web scraping for announcements
│   │   └── ma_scraper.py      # M&A deal scraping
│   └── tests/
│       └── test_defense_dashboard.py  # Integration tests (pytest + requests)
├── frontend/
│   ├── src/
│   │   ├── App.js             # Router, AuthContext/Provider, global API base URL
│   │   ├── index.css          # CSS variables, fonts (Chivo, Inter, JetBrains Mono)
│   │   ├── components/
│   │   │   ├── Layout.jsx     # Sidebar nav, header, Outlet wrapper
│   │   │   ├── CompanyProfileSheet.jsx
│   │   │   └── ui/            # Shadcn/UI component library (do not hand-edit)
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Announcements.jsx
│   │   │   ├── MAActivity.jsx
│   │   │   ├── MarketData.jsx
│   │   │   ├── Expenditures.jsx
│   │   │   ├── Regulations.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Follow.jsx
│   │   │   ├── Contracts.jsx
│   │   │   ├── Bookmarks.jsx
│   │   │   ├── Admin.jsx
│   │   │   └── Login.jsx
│   │   ├── hooks/
│   │   │   └── use-toast.js
│   │   └── lib/
│   │       └── utils.js       # cn() helper (clsx + tailwind-merge)
│   ├── package.json
│   ├── craco.config.js        # Webpack aliases, ESLint config, visual-edits plugin
│   ├── tailwind.config.js     # Shadcn CSS variables, tailwindcss-animate
│   ├── components.json        # Shadcn/UI config
│   └── plugins/health-check/  # Optional dev-server health endpoint plugin
├── memory/
│   └── PRD.md                 # Product Requirements Document (feature history)
├── test_reports/              # JSON/XML test run artifacts
├── Dockerfile                 # Multi-stage: Node build → Python runtime
├── railway.toml               # Railway deployment config
├── design_guidelines.json     # Design system spec (colors, typography, components)
└── backend_test.py            # Standalone test runner script
```

---

## Development Workflows

### Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt

# Required environment variables (create a .env file in backend/):
# MONGO_URL=mongodb://...
# DB_NAME=defense_dashboard
# JWT_SECRET=<your-secret>   (optional, has a default)

uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

**Seeding the database:** Use the Admin panel UI ("Seed Data" button) or call `POST /api/seed-data` directly. Auto-seeding on startup was intentionally removed.

### Frontend (React)

```bash
cd frontend
yarn install
# Create frontend/.env:
# REACT_APP_BACKEND_URL=http://localhost:8000

yarn start    # Dev server (CRACO, port 3000)
yarn build    # Production build
yarn test     # Run tests
```

### Running Tests

```bash
# Backend integration tests (requires a running backend + seeded DB)
cd backend
REACT_APP_BACKEND_URL=http://localhost:8000 pytest tests/test_defense_dashboard.py -v

# Or use the root-level script:
python backend_test.py
```

### Docker Build

```bash
docker build -t defense-dashboard .
docker run -e MONGO_URL=... -e DB_NAME=... -e PORT=8000 -p 8000:8000 defense-dashboard
```

---

## Key Conventions

### Frontend

**Path alias:** `@/` maps to `frontend/src/`. Always use `@/` for imports, not relative paths.

**Auth:** Import `useAuth` from `@/App` to access `{ user, token, login, register, logout, loading }`. The auth token is stored in `localStorage` and attached as `Authorization: Bearer <token>` header on API calls.

**API base URL:** `API` is exported from `App.js` as `${REACT_APP_BACKEND_URL}/api`. Import it for all backend calls:
```js
import { API } from "@/App";
// Usage: axios.get(`${API}/defense-players`)
```

**UI Components:** Use the Shadcn/UI components in `@/components/ui/`. Do not hand-edit these files — regenerate via `shadcn` CLI if updates are needed. The `cn()` utility in `@/lib/utils.js` merges Tailwind classes.

**Routing:** All authenticated pages are children of the `Layout` route at `/`. Add new pages by:
1. Creating the page component in `src/pages/`
2. Adding the route in `App.js`
3. Adding the nav entry in `Layout.jsx`'s `navItems` array

### Backend

**All routes** are mounted under the `/api` prefix via `api_router = APIRouter(prefix="/api")`, then included in `app`.

**MongoDB patterns:**
- Always exclude the `_id` field: `.find(query, {"_id": 0})`
- Use `model_config = ConfigDict(extra="ignore")` on Pydantic models to safely ignore extra fields from MongoDB
- IDs are UUID strings (not ObjectIds), generated via `Field(default_factory=lambda: str(uuid.uuid4()))`
- Datetimes are stored as ISO strings in MongoDB and parsed back on read

**Authentication:** Protected routes use `Depends(get_current_user)`. The dependency returns the JWT payload dict with keys `sub` (user id), `email`, `role`.

**Rate limiting:** Auth endpoints have an in-memory rate limiter: 10 failed attempts per 15-minute window per IP.

**Stock prices:** `stock_service.py` fetches live data from Yahoo Finance via `yfinance` with a 1-hour in-memory cache. The scheduler (`APScheduler`) refreshes prices periodically.

### Design System

The canonical design spec lives in `design_guidelines.json`. Key rules:

- **Theme:** Light only — `bg-slate-50` app background, `bg-white` card surfaces
- **Primary accent:** Blue-800 (`#1e40af`) — buttons, active states, focus rings (Intel Blue — OSINT/defense palette)
- **Typography:**
  - Headings: `font-heading` → Chivo (bold)
  - Body: `font-sans` → Inter
  - Code/data: `font-mono` → JetBrains Mono
- **Cards:** `bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]` with hover `shadow-lg hover:border-blue-200`
- **No dark mode classes** — do not add `dark:` variants
- **No gradients** on backgrounds — keep flat and clean
- **Flags:** `https://flagcdn.com/w40/{code}.png` (ISO 3166-1 alpha-2 lowercase)
- **Company logos:** `https://logo.clearbit.com/{domain}` with fallback icon on error
- **Status colors:** success=emerald-600, warning=amber-600, error=rose-600

### Data Models (API)

| Collection | Key fields |
|---|---|
| `users` | id, email, name, role, password_hash |
| `announcements` | id, title, content, source, category, company, date |
| `ma_activities` | id, acquirer, target, deal_value, status, deal_type, announced_date |
| `defense_players` | id, name, ticker, country, market_cap, stock_price, change_percent, revenue, employees, specializations |
| `expenditures` | id, country, country_code, year, expenditure, gdp_percent, region |
| `regulations` | id, title, country, category, description, requirements, effective_date |
| `contracts` | id, title, contracting_authority, authority_country, authority_type, category, status, amount_min/max |
| `products` | id, name, manufacturer, category, product_type, specifications, materials, status |

---

## API Endpoints Summary

### Public
- `GET /api/` — health check
- `POST /api/seed-data` — seed database (admin intent, no auth guard currently)
- `GET /api/dashboard/stats`

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` — requires Bearer token

### Data (GET = public, POST/DELETE = authenticated)
- `/api/announcements`
- `/api/ma-activities`, `/api/ma-activities/historical`
- `/api/defense-players`
- `/api/expenditures`
- `/api/regulations`
- `/api/products`
- `/api/contracts`

### Stock (live data)
- `GET /api/stocks/prices?tickers=LMT,BA,...`
- `GET /api/stocks/{ticker}/history?period=1d|1w|1mo|1y`

---

## Known Limitations & Pending Work

- **Social media feed (`Follow` page):** Uses mock data — real Twitter/X API keys not configured
- **Company logos:** Some Clearbit CDN URLs fail — fallback shield icons are shown
- **250-company target:** Currently 118 companies in the dataset
- **Interactive map (Expenditures):** Not yet implemented (bento grid placeholder)
- **User watchlist / export / email alerts:** Backlog (P2)

---

## Testing

Backend tests are integration tests (not unit tests) that hit a live HTTP server:
- `TestHealthAndDashboard` — `/api/` and `/api/dashboard/stats`
- `TestDefensePlayers` — list and data structure validation
- `TestExpenditures`, `TestProducts`, `TestAnnouncements`, `TestMAActivities`, `TestRegulations`

Set `REACT_APP_BACKEND_URL` before running. Last known passing: 27/27 tests (Dec 2024).

---

## Deployment

The app deploys to **Railway** as a single Docker container:
1. Multi-stage build: Node 18 compiles the React app into `/frontend/build`
2. Python 3.11 runtime serves the FastAPI app + static files from `./static`
3. `uvicorn server:app --host 0.0.0.0 --port ${PORT:-8000}`
4. Health check: `GET /health` (timeout 30s)

Required Railway env vars: `MONGO_URL`, `DB_NAME`, `JWT_SECRET`, `PORT`.
