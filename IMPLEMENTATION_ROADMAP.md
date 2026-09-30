# Platform improvement programme

## Implemented in this branch (not deployed)
- Remove the World Monitor navigation, page, routes and scheduled collector.
- Remove fabricated stock histories; show unavailable data explicitly.
- Historical M&A: load all pages, dynamic years, chronological ordering, error visibility.
- Preserve transactions with different dates/types between the same parties in seed upserts, ingestion and display.
- Source-backed Isembard profile and corrected Series A, with unknown fundamentals left null.
- Archive the precisely identified incorrect legacy Isembard record before removing it.
- Add two foundational mergers (Lockheed/Martin Marietta and British Aerospace/MES).
- Display profile sources, review date and unresolved data limitations.
- Remove automatic high confidence for manual extraction.
- Require a non-default JWT secret; disable admin promotion unless separately configured.

## Deployment gates
1. Back up MongoDB and verify restoration before any production deployment.
2. Configure a unique JWT_SECRET of at least 32 characters. ADMIN_SETUP_KEY is optional; without it self-service admin promotion is disabled.
3. Run the full frontend build and integration suite. Network restrictions prevented dependency installation in the editing environment.
4. Review seed migrations on a restored database, especially existing duplicate legacy records. No production DB was accessed.
5. Review/merge the draft PR only after these gates. Do not disable Railway beforehand.

## Still to implement
### Data quality and historical depth
- Review all historical records, not only Isembard; no claim of exhaustive or fully validated coverage.
- Expand foundational transactions and annual coverage from authoritative filings.
- Replace legacy first-word trust exemptions and delete-based cleanup with a review quarantine.
- Add stable event IDs, entity aliases, documented corrections and per-field provenance.
- Separate agreement/announcement/closing dates and allow genuinely unknown dates.
- Reconcile repeated reports into one event without losing follow-on funding rounds.
- Publish coverage metrics by geography, capability, year, source and review age.
- Audit issuer/division financial scope, currencies, valuation basis and fiscal years.
- Establish a prioritized company universe and add missing profiles only with sources.

### Product and visual design
- Six main areas: synthesis, events, companies, markets/programmes, capabilities, personal watch.
- Shared entity search and persistent/shareable filters.
- Source-linked event summaries with separately labeled analysis and open questions.
- Company comparison, programme links and export/localization partnerships.
- Accessible keyboard/mobile layouts; test in-browser with actual production-shaped data.
- Replace decorative news imagery and duplicate home/market information.

### Hosting and operations
- Obtain Railway service-level invoice and CPU/RAM/egress measurements.
- Separate scheduled ingestion from read-only delivery; persist collection health and freshness.
- Cache public datasets; retain private storage/API for users and bookmarks.
- Evaluate a low-cost deployment against actual quotas, workload and data size.
- Migrate in parallel with rollback and restore rehearsal; no provider change yet.
- Make builds reproducible with an authoritative lockfile and aligned Node versions.
- Refactor large domain modules incrementally after regression coverage.

## Acceptance criteria
- No synthetic observations or inferred financial values presented as facts.
- Every new priority record has a specific source and review context.
- Distinct rounds remain visible; historical request failures are explicit.
- Budget and update cadence are measured, not promised.
- Private user data never enters public static exports.
