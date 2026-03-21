# Stage 1: Build React frontend
FROM node:18-slim AS frontend-build

WORKDIR /frontend

COPY frontend/package.json ./
RUN npm install --legacy-peer-deps

COPY frontend/ .

ENV REACT_APP_BACKEND_URL=""
ENV CI=false
ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max-old-space-size=2048
RUN npm run build

# Stage 2: Python backend
FROM python:3.11-slim

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .

# Copy React build output
COPY --from=frontend-build /frontend/build ./static

CMD uvicorn server:app --host 0.0.0.0 --port ${PORT:-8000}
