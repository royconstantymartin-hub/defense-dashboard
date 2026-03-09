# Backend (FastAPI)

Run locally:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

API endpoints:
- `GET /`
- `GET /api/v1/health`
- `GET /api/v1/modules`
