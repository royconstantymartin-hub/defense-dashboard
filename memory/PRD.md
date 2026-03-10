# Defense Industry Dashboard PRD

## Original Problem Statement
Build a dashboard with all announcements in defense industry, all recent M&A activities, market cap of main players, defense expenditures data by country, different regulations (offset, etc), and defense product portfolio with characteristics/materials by industry player/product type. Added: Follow page for social media posts and product comparison feature.

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Shadcn UI + Recharts
- **Backend**: FastAPI + Motor (async MongoDB driver)
- **Database**: MongoDB
- **Auth**: JWT-based authentication

## User Personas
1. **Defense Analyst** - Researches market data, expenditures, regulations
2. **Investor** - Tracks M&A activities, market caps, company news
3. **Procurement Officer** - Compares products, checks regulations/offset requirements
4. **Industry Researcher** - Follows social media intel, tracks announcements

## Core Requirements (Static)
- Dashboard with key metrics overview
- Defense industry announcements feed
- M&A activity tracker
- Market data for major defense players
- Defense expenditures by country with charts
- Regulations database (offset, export controls, ITAR)
- Product portfolio with technical specifications
- Admin panel for CRUD operations
- JWT authentication

## What's Been Implemented (Jan 2026)

### Phase 1 - MVP Complete
- ✅ Dashboard home with metrics (market cap, expenditure, players, M&A count)
- ✅ Market Leaders table with company data
- ✅ Regional spending pie chart
- ✅ Announcements page with category filters
- ✅ M&A Activity page with status filters and deal details
- ✅ Market Data page with player table and charts
- ✅ Expenditures page with country data and regional distribution
- ✅ Regulations page with accordion-style database
- ✅ Products page with portfolio grid
- ✅ Login/Register with JWT auth
- ✅ Admin panel with CRUD for all entities
- ✅ Dark theme "Performance Pro" design
- ✅ Responsive navigation sidebar

### Phase 2 - New Features (Jan 2026)
- ✅ Follow page - Social media feed (X/Twitter + LinkedIn)
  - Mock data for demo (ready for API integration)
  - Platform tabs filtering
  - Account type filtering (Institutional, Company, Analyst, Media)
  - Search functionality
- ✅ Product Comparison feature
  - Compare mode toggle
  - Select 2-3 products
  - Side-by-side comparison modal
  - Specs, materials, category comparison

## Prioritized Backlog

### P0 - Critical
- None currently

### P1 - High Priority
- Twitter/X API integration for real-time posts (requires API keys)
- LinkedIn integration (limited - no public API for scraping)
- Real data sources for defense expenditures (SIPRI API)
- Real-time stock price updates

### P2 - Medium Priority
- Export comparison as PDF/Excel
- Saved comparison lists
- Notification system for new announcements
- User favorites/watchlist
- Advanced search across all entities

### P3 - Low Priority
- Mobile app version
- Multi-language support
- Dark/Light theme toggle
- Custom dashboard widgets
- API rate limiting and caching

## Next Tasks
1. Obtain Twitter/X Developer API keys for Follow page
2. Consider news API integration for announcements (NewsAPI, Defense News RSS)
3. Add export functionality for comparisons
4. Implement user watchlist/favorites
