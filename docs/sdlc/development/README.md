# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### DEV-PLAN-V3 · approved · source: plan:v3

The development plan for Expense Tracker is approved at version 3. It covers 6 sprints of capacity 20 each and 8 epics with 29 stories. The input reports no implementation progress.

- Plan status: approved, version 3. No approver or approval date is given in the input.
- Sprints: Sprint 1 to Sprint 6, capacity 20 each (120 total).
- Epics: EPIC-001 to EPIC-008. All epics are unassigned and have no points.
- Stories: US-001 to US-029, totalling 103 story points.
- Tasks: US-010-T1, US-010-T2 and US-010-T3. They have no points and are the only tasks defined.
- Roles used: backend-agent, frontend-agent, security-agent, integration-agent, devops-agent.
- Out of scope (from the project description): currency conversion, mileage, card feeds, accounting integrations.
- Stack (from the project description): React, FastAPI, PostgreSQL, S3 for receipts, on AWS. English only.
- Progress: the input contains no completed tickets, merged code, test results or sprint outcomes.

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004, EPIC-005, EPIC-006, EPIC-007, EPIC-008

### DEV-SPRINT-1 · approved · source: plan:Sprint 1

Sprint 1 covers secure sign-in, sessions, Finance-created accounts and seeded categories. Capacity is 20.

- Goal (verbatim): Secure sign-in, sessions, Finance-created accounts and seeded categories.
- Capacity: 20.
- Linked stories are inferred from the goal wording; the plan does not assign them explicitly:
  - US-001 Sign in with email and password (5, backend-agent)
  - US-002 Sign out and session expiry (3, backend-agent)
  - US-003 Passwords stored securely (2, security-agent)
  - US-005 Finance creates user accounts (5, backend-agent)
  - US-022 Seeded expense categories (1, backend-agent)
- Inferred load: 16 of 20 points.
- Status: no completion data provided.

**Related:** US-001, US-002, US-003, US-005, US-022

### DEV-SPRINT-2 · approved · source: plan:Sprint 2

Sprint 2 covers password reset, user deactivation, and creating and editing draft claims with lines. Capacity is 20.

- Goal (verbatim): Password reset, user deactivation, and creating and editing draft claims with lines.
- Capacity: 20.
- Linked stories are inferred from the goal wording:
  - US-004 Reset a forgotten password by email (5, integration-agent)
  - US-007 Finance deactivates users (3, backend-agent)
  - US-010 Create a draft claim with multiple lines (8, backend-agent), with these tasks:
    - T1: claims and claim_lines migration
    - T2: claim and line creation endpoints
    - T3: multi-line claim editor screen (frontend-agent)
  - US-011 Edit and delete draft claims (3, backend-agent)
- Inferred load: 19 of 20 points.
- Status: no completion data provided.

**Related:** US-004, US-007, US-010, US-010-T1, US-010-T2, US-010-T3, US-011

### DEV-SPRINT-3 · approved · source: plan:Sprint 3

Sprint 3 covers role-based claim visibility, submission and locking, the My claims screens and receipt upload. Capacity is 20.

- Goal (verbatim): Role-based claim visibility, submission and locking, My claims screens and receipt upload.
- Capacity: 20.
- Linked stories are inferred from the goal wording:
  - US-008 Role-based visibility of claims (5, security-agent)
  - US-012 Submit a claim and lock it (3, backend-agent)
  - US-013 My claims list and claim detail (5, frontend-agent)
  - US-014 Attach a receipt to a claim line (5, integration-agent). Per the project description, a receipt is an image or PDF of up to 5 MB, one per line.
- Inferred load: 18 of 20 points.
- Status: no completion data provided.

**Related:** US-008, US-012, US-013, US-014

### DEV-SPRINT-4 · approved · source: plan:Sprint 4

Sprint 4 covers secure receipt viewing, manager and Finance approval decisions, and approval queues. Capacity is 20.

- Goal (verbatim): Secure receipt viewing, manager and Finance approval decisions, and approval queues.
- Capacity: 20.
- Linked stories are inferred from the goal wording:
  - US-015 View receipts through short-lived private links (3, integration-agent)
  - US-016 Manager approves or rejects a direct report's claim (5, backend-agent)
  - US-017 Finance approves or rejects manager-approved claims (3, backend-agent)
  - US-021 Approval queues (5, frontend-agent)
- Inferred load: 16 of 20 points.
- Status: no completion data provided.

**Related:** US-015, US-016, US-017, US-021

### DEV-SPRINT-5 · approved · source: plan:Sprint 5

Sprint 5 covers no-self-approval rules, rejection and resubmission, mark paid, category limits with flags, and data-protection hardening. Capacity is 20.

- Goal (verbatim): No-self-approval rules, rejection and resubmission, mark paid, category limits with flags, and data-protection hardening.
- Capacity: 20.
- Linked stories are inferred from the goal wording:
  - US-018 No self-approval (3, security-agent)
  - US-019 Resubmit a rejected claim (2, frontend-agent)
  - US-020 Finance marks approved claims as paid (3, backend-agent)
  - US-023 Finance manages categories and limits (3, backend-agent)
  - US-024 Flag over-limit lines for approvers (3, frontend-agent)
  - US-009 Data protection basics (5, devops-agent)
- Inferred load: 19 of 20 points.
- Status: no completion data provided.

**Related:** US-009, US-018, US-019, US-020, US-023, US-024

### DEV-SPRINT-6 · approved · source: plan:Sprint 6

Sprint 6 covers the Employee and Finance dashboards, CSV export, and setup and usage documentation. Capacity is 20.

- Goal (verbatim): Employee and Finance dashboards, CSV export, and setup and usage documentation.
- Capacity: 20.
- Linked stories are inferred from the goal wording:
  - US-025 Employee dashboard of own claims by status (3, frontend-agent)
  - US-026 Finance totals by category and month (3, backend-agent)
  - US-027 Export approved claims as CSV (3, backend-agent)
  - US-028 Setup documentation (2, devops-agent)
  - US-029 Usage guide (2, frontend-agent)
- Inferred load: 13 of 20 points.
- Status: no completion data provided.

**Related:** US-025, US-026, US-027, US-028, US-029

### DEV-EPIC-001 · approved · source: plan:EPIC-001

EPIC-001 covers sign-in, sessions and password reset: 4 stories, 15 points.

- EPIC-001: unassigned, no points.
- Stories:
  - US-001 Sign in with email and password (5, backend-agent)
  - US-002 Sign out and session expiry (3, backend-agent)
  - US-003 Passwords stored securely (2, security-agent)
  - US-004 Reset a forgotten password by email (5, integration-agent)

**Related:** US-001, US-002, US-003, US-004

### DEV-EPIC-002 · approved · source: plan:EPIC-002

EPIC-002 covers user accounts, roles and visibility: 5 stories, 20 points.

- EPIC-002: unassigned, no points.
- Stories:
  - US-005 Finance creates user accounts (5, backend-agent)
  - US-006 Finance changes a user's manager or role (2, backend-agent)
  - US-007 Finance deactivates users (3, backend-agent)
  - US-008 Role-based visibility of claims (5, security-agent)
  - US-009 Data protection basics (5, devops-agent)
- Context from the project description: there is no self sign-up, and Finance creates accounts and assigns managers.

**Related:** US-005, US-006, US-007, US-008, US-009

### DEV-EPIC-003 · approved · source: plan:EPIC-003

EPIC-003 covers expense claims and lines: 4 stories (19 points) and 3 tasks under US-010.

- EPIC-003: unassigned, no points.
- Stories:
  - US-010 Create a draft claim with multiple lines (8, backend-agent), with these tasks:
    - US-010-T1 Add claims and claim_lines migration (backend-agent)
    - US-010-T2 Implement claim and line creation endpoints (backend-agent)
    - US-010-T3 Build multi-line claim editor screen (frontend-agent)
  - US-011 Edit and delete draft claims (3, backend-agent)
  - US-012 Submit a claim and lock it (3, backend-agent)
  - US-013 My claims list and claim detail (5, frontend-agent)

**Related:** US-010, US-010-T1, US-010-T2, US-010-T3, US-011, US-012, US-013

### DEV-EPIC-004 · approved · source: plan:EPIC-004

EPIC-004 covers receipts: 2 stories, 8 points.

- EPIC-004: unassigned, no points.
- Stories:
  - US-014 Attach a receipt to a claim line (5, integration-agent)
  - US-015 View receipts through short-lived private links (3, integration-agent)
- Receipts are stored in S3 (from the project stack).

**Related:** US-014, US-015

### DEV-EPIC-005 · approved · source: plan:EPIC-005

EPIC-005 covers two-step approval and payment: 6 stories, 21 points.

- EPIC-005: unassigned, no points.
- Stories:
  - US-016 Manager approves or rejects a direct report's claim (5, backend-agent)
  - US-017 Finance approves or rejects manager-approved claims (3, backend-agent)
  - US-018 No self-approval (3, security-agent)
  - US-019 Resubmit a rejected claim (2, frontend-agent)
  - US-020 Finance marks approved claims as paid (3, backend-agent)
  - US-021 Approval queues (5, frontend-agent)

**Related:** US-016, US-017, US-018, US-019, US-020, US-021

### DEV-EPIC-006 · approved · source: plan:EPIC-006

EPIC-006 covers categories and per-line limits: 3 stories, 7 points.

- EPIC-006: unassigned, no points.
- Stories:
  - US-022 Seeded expense categories (1, backend-agent)
  - US-023 Finance manages categories and limits (3, backend-agent)
  - US-024 Flag over-limit lines for approvers (3, frontend-agent)
- Seed categories (from the project description): Travel, Meals, Equipment, Other.

**Related:** US-022, US-023, US-024

### DEV-EPIC-007 · approved · source: plan:EPIC-007

EPIC-007 covers dashboards and CSV export: 3 stories, 9 points.

- EPIC-007: unassigned, no points.
- Stories:
  - US-025 Employee dashboard of own claims by status (3, frontend-agent)
  - US-026 Finance totals by category and month (3, backend-agent)
  - US-027 Export approved claims as CSV (3, backend-agent)

**Related:** US-025, US-026, US-027

### DEV-EPIC-008 · approved · source: plan:EPIC-008

EPIC-008 covers basic setup and usage documentation: 2 stories, 4 points.

- EPIC-008: unassigned, no points.
- Stories:
  - US-028 Setup documentation (2, devops-agent)
  - US-029 Usage guide (2, frontend-agent)

**Related:** US-028, US-029

### DEV-OBS-001 · draft · source: plan:v3

Observations from reviewing the plan. US-006 is not reflected in any sprint goal, and the plan does not assign stories to sprints explicitly. A human should confirm both points.

- No sprint goal mentions US-006 (Finance changes a user's manager or role, 2 points). Its scheduling is unknown.
- The plan does not record which sprint each story belongs to. All sprint-to-story links in DEV-SPRINT-1 to DEV-SPRINT-6 are inferred from goal wording.
- Inferred sprint loads are 16, 19, 18, 16, 19 and 13 points (101 total). Adding the unmapped US-006 gives 103, against 120 total capacity.
- Only US-010 is broken into tasks. The other stories have no task breakdown in the input.
- The input has no development execution data: no ticket status, PRs, builds or dates. The user guide is not produced because development has not completed.

**Related:** US-006, DEV-PLAN-V3
<!-- sdlc:auto:end narrative -->
