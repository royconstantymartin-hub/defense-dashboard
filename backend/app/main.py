from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import router as v1_router
from app.core.config import settings
from app.routers.rss_feed import router as rss_router

app = FastAPI(title=settings.app_name, version=settings.app_version)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.include_router(v1_router, prefix='/api/v1', tags=['v1'])
app.include_router(rss_router, prefix='/api', tags=['intel'])


@app.get('/')
def root() -> dict[str, str]:
    return {'message': 'Defense Intelligence Hub API'}
