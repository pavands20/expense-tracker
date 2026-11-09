# Traceability Matrix

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start legend -->
Built from recorded links, not written by a model: requirement key → plan item (`source_stable_key`) → development ticket (`stable_key`) → the ticket's test steps → the last live deployment that started after the work finished. **AC tests** counts the story's acceptance criteria that have a test case, and those whose test cases all passed in the latest finished E2E run.
<!-- sdlc:auto:end legend -->

<!-- sdlc:auto:start matrix -->
| Requirement | Epic | Title | Plan items | Sprint | Design | Code | Commits | Ticket | Tests | AC tests | Deployed |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-001 | EPIC-001 | Sign in with email and password | US-001 | 1 | GET /auth/me, POST /auth/login, api, db, sessions, users, web | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-002 | EPIC-001 | Sign out and session expiry | US-002 | 1 | POST /auth/logout, api, sessions, users, web | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-003 | EPIC-001 | Passwords stored securely | US-003 | 1 | api, db, users | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-004 | EPIC-001 | Reset a forgotten password by email | US-004 | 2 | POST /auth/password-reset/confirm, POST /auth/password-reset/request, api, db, email, password_reset_tokens, users, web | — | — | not started | not run | 0/5 tested · 0/5 passing | — |
| US-005 | EPIC-002 | Finance creates user accounts | US-005 | 1 | GET /users, POST /users, api, db, users, web | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-006 | EPIC-002 | Finance changes a user's manager or role | US-006 | 1 | PATCH /users/{id}, api, users, web | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-007 | EPIC-002 | Finance deactivates users | US-007 | 2 | POST /users/{id}/deactivate, POST /users/{id}/reactivate, api, db, sessions, users, web | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-008 | EPIC-002 | Role-based visibility of claims | US-008 | 3 | GET /claims, GET /claims/{id}, api, claims, db, users | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-009 | EPIC-002 | Data protection basics | US-009 | 5 | GET /health, api, db, receipt_store, web | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-010 | EPIC-003 | Create a draft claim with multiple lines | US-010, US-010-T1, US-010-T2, US-010-T3 | 2 | DELETE /claims/{id}/lines/{line_id}, GET /claims/{id}, POST /claims, POST /claims/{id}/lines, api, categories, claim_lines, claims, db, web | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-011 | EPIC-003 | Edit and delete draft claims | US-011 | 2 | DELETE /claims/{id}, PATCH /claims/{id}, PATCH /claims/{id}/lines/{line_id}, api, claim_lines, claims, web | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-012 | EPIC-003 | Submit a claim and lock it | US-012 | 3 | POST /claims/{id}/submit, api, claims, web | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-013 | EPIC-003 | My claims list and claim detail | US-013 | 3 | GET /claims, GET /claims/{id}, api, claim_decisions, claim_lines, claims, web | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-014 | EPIC-004 | Attach a receipt to a claim line | US-014 | 3 | DELETE /claims/{id}/lines/{line_id}/receipt, PUT /claims/{id}/lines/{line_id}/receipt, api, claim_lines, receipt_store, web | — | — | not started | not run | 0/5 tested · 0/5 passing | — |
| US-015 | EPIC-004 | View receipts through short-lived private links | US-015 | 4 | GET /claims/{id}/lines/{line_id}/receipt-url, api, claim_lines, receipt_store, web | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-016 | EPIC-005 | Manager approves or rejects a direct report's claim | US-016 | 4 | POST /claims/{id}/manager-decision, api, claim_decisions, claims, db, web | — | — | not started | not run | 0/5 tested · 0/5 passing | — |
| US-017 | EPIC-005 | Finance approves or rejects manager-approved claims | US-017 | 4 | POST /claims/{id}/finance-decision, api, claim_decisions, claims, web | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-018 | EPIC-005 | No self-approval | US-018 | 5 | POST /claims/{id}/finance-decision, POST /claims/{id}/manager-decision, api, claim_decisions, claims | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-019 | EPIC-005 | Resubmit a rejected claim | US-019 | 5 | POST /claims/{id}/submit, api, claim_decisions, claims, web | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-020 | EPIC-005 | Finance marks approved claims as paid | US-020 | 5 | POST /claims/{id}/mark-paid, api, claim_decisions, claims, web | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-021 | EPIC-005 | Approval queues | US-021 | 4 | GET /approvals/queue, api, claims, users, web | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-022 | EPIC-006 | Seeded expense categories | US-022 | 1 | GET /categories, api, categories, db | — | — | not started | not run | 0/1 tested · 0/1 passing | — |
| US-023 | EPIC-006 | Finance manages categories and limits | US-023 | 5 | PATCH /categories/{id}, POST /categories, api, categories, web | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-024 | EPIC-006 | Flag over-limit lines for approvers | US-024 | 5 | GET /claims/{id}, api, categories, claim_lines, web | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-025 | EPIC-007 | Employee dashboard of own claims by status | US-025 | 6 | GET /dashboard/me, api, claim_lines, claims, web | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-026 | EPIC-007 | Finance totals by category and month | US-026 | 6 | GET /reports/finance-totals, api, categories, claim_lines, claims, web | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-027 | EPIC-007 | Export approved claims as CSV | US-027 | 6 | GET /reports/approved-claims.csv, api, categories, claim_lines, claims, users, web | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-028 | EPIC-008 | Setup documentation | US-028 | 6 | — | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-029 | EPIC-008 | Usage guide | US-029 | 6 | — | — | — | not started | not run | 0/1 tested · 0/1 passing | — |
<!-- sdlc:auto:end matrix -->
