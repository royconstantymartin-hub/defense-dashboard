# Defense Intelligence Hub

Defense Intelligence Hub is a full-stack analytics platform for defense industry intelligence.

## Modules

- Dashboard
- Announcements
- M&A tracker
- Companies database
- Defense expenditures by country
- Regulations and offset policies
- Defense product catalog

## Tech Stack

- **Frontend:** Next.js (App Router, TypeScript)
- **Backend:** FastAPI
- **Database:** PostgreSQL

## Project Structure

```
.
├── backend/                # FastAPI service
├── db/                     # Database schema and migrations
└── frontend/               # Next.js web application
```

## Quick Start

### 1) Database

```bash
docker run --name dih-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=defense_intel -p 5432:5432 -d postgres:16
```

### 2) Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 3) Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:3000` and backend API on `http://localhost:8000`.
