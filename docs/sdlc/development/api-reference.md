# API Reference

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start endpoints -->
| Method | Path | Handler | Source | Summary |
|---|---|---|---|---|
| POST | /auth/login | login | `backend/app/routers/auth.py:23` | — |
| POST | /auth/logout | logout | `backend/app/routers/auth.py:33` | — |
| GET | /auth/me | me | `backend/app/routers/auth.py:43` | — |
| GET | /health | health | `backend/app/main.py:64` | Liveness probe, and the only route here that is not a stub. |
<!-- sdlc:auto:end endpoints -->

<!-- sdlc:auto:start drift -->
**Designed but missing:**

- DELETE /claims/{id}
- DELETE /claims/{id}/lines/{line_id}
- DELETE /claims/{id}/lines/{line_id}/receipt
- GET /approvals/queue
- GET /categories
- GET /claims
- GET /claims/{id}
- GET /claims/{id}/lines/{line_id}/receipt-url
- GET /dashboard/me
- GET /reports/approved-claims.csv
- GET /reports/finance-totals
- GET /users
- PATCH /categories/{id}
- PATCH /claims/{id}
- PATCH /claims/{id}/lines/{line_id}
- PATCH /users/{id}
- POST /auth/password-reset/confirm
- POST /auth/password-reset/request
- POST /categories
- POST /claims
- POST /claims/{id}/finance-decision
- POST /claims/{id}/lines
- POST /claims/{id}/manager-decision
- POST /claims/{id}/mark-paid
- POST /claims/{id}/submit
- POST /users
- POST /users/{id}/deactivate
- POST /users/{id}/reactivate
- PUT /claims/{id}/lines/{line_id}/receipt
<!-- sdlc:auto:end drift -->

<!-- sdlc:auto:start source -->
Generated from commit `d02e9ec`
<!-- sdlc:auto:end source -->
