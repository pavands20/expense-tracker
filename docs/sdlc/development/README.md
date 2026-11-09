# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### DEV-PLAN-V3 · approved · source: plan:v3

Plan version 3 is approved. It runs 6 sprints with a capacity of 20 points each (120 points total) against a backlog of 8 epics and 29 stories (103 story points).

- Plan status: approved, version 3.
- Sprint 1 goals (capacity 20):
  - Secure sign-in and sessions.
  - Finance-created accounts.
  - Seeded categories.
- Sprint 2 goals (capacity 20):
  - Password reset.
  - User deactivation.
  - Creating and editing draft claims with lines.
- Sprint 3 goals (capacity 20):
  - Role-based claim visibility.
  - Submission and locking.
  - My claims screens.
  - Receipt upload.
- Sprint 4 goals (capacity 20):
  - Secure receipt viewing.
  - Manager and Finance approval decisions.
  - Approval queues.
- Sprint 5 goals (capacity 20):
  - No-self-approval rules.
  - Rejection and resubmission.
  - Mark paid.
  - Category limits with flags.
  - Data-protection hardening.
- Sprint 6 goals (capacity 20):
  - Employee and Finance dashboards.
  - CSV export.
  - Setup and usage documentation.
- Backlog points by epic:
  - EPIC-001: 15
  - EPIC-002: 20
  - EPIC-003: 19
  - EPIC-004: 8
  - EPIC-005: 21
  - EPIC-006: 7
  - EPIC-007: 9
  - EPIC-008: 4
  - Total: 103.
- The input does not state an explicit story-to-sprint assignment, only sprint goal text.

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004, EPIC-005, EPIC-006, EPIC-007, EPIC-008

### EPIC-001 · approved · source: plan:EPIC-001

Epic covering sign-in, sessions and password reset. It has 4 stories totalling 15 points.

- US-001 Sign in with email and password: 5 pts, backend-agent.
- US-002 Sign out and session expiry: 3 pts, backend-agent.
- US-003 Passwords stored securely: 2 pts, security-agent.
- US-004 Reset a forgotten password by email: 5 pts, integration-agent.
- Epic owner: unassigned.
- Sprint mapping by goal text:
  - Sign-in and sessions: Sprint 1.
  - Password reset: Sprint 2.

**Related:** US-001, US-002, US-003, US-004

### EPIC-002 · approved · source: plan:EPIC-002

Epic covering user accounts, roles and visibility. It has 5 stories totalling 20 points.

- US-005 Finance creates user accounts: 5 pts, backend-agent.
- US-006 Finance changes a user's manager or role: 2 pts, backend-agent.
- US-007 Finance deactivates users: 3 pts, backend-agent.
- US-008 Role-based visibility of claims: 5 pts, security-agent.
- US-009 Data protection basics: 5 pts, devops-agent.
- Epic owner: unassigned.
- Sprint mapping by goal text:
  - Finance-created accounts: Sprint 1.
  - Deactivation: Sprint 2.
  - Visibility: Sprint 3.
  - Data-protection hardening: Sprint 5.

**Related:** US-005, US-006, US-007, US-008, US-009

### EPIC-003 · approved · source: plan:EPIC-003

Epic covering expense claims and lines. It has 4 stories totalling 19 points, and US-010 is broken into 3 tasks.

- US-010 Create a draft claim with multiple lines: 8 pts, backend-agent.
  - US-010-T1 Add claims and claim_lines migration: backend-agent.
  - US-010-T2 Implement claim and line creation endpoints: backend-agent.
  - US-010-T3 Build multi-line claim editor screen: frontend-agent.
- US-011 Edit and delete draft claims: 3 pts, backend-agent.
- US-012 Submit a claim and lock it: 3 pts, backend-agent.
- US-013 My claims list and claim detail: 5 pts, frontend-agent.
- Epic owner: unassigned. Tasks have no point estimates.
- Sprint mapping by goal text:
  - Draft create/edit: Sprint 2.
  - Submission, locking and My claims screens: Sprint 3.

**Related:** US-010, US-010-T1, US-010-T2, US-010-T3, US-011, US-012, US-013

### EPIC-004 · approved · source: plan:EPIC-004

Epic covering receipts. It has 2 stories totalling 8 points.

- US-014 Attach a receipt to a claim line: 5 pts, integration-agent.
- US-015 View receipts through short-lived private links: 3 pts, integration-agent.
- Epic owner: unassigned.
- Sprint mapping by goal text:
  - Receipt upload: Sprint 3.
  - Secure receipt viewing: Sprint 4.

**Related:** US-014, US-015

### EPIC-005 · approved · source: plan:EPIC-005

Epic covering two-step approval and payment. It has 6 stories totalling 21 points.

- US-016 Manager approves or rejects a direct report's claim: 5 pts, backend-agent.
- US-017 Finance approves or rejects manager-approved claims: 3 pts, backend-agent.
- US-018 No self-approval: 3 pts, security-agent.
- US-019 Resubmit a rejected claim: 2 pts, frontend-agent.
- US-020 Finance marks approved claims as paid: 3 pts, backend-agent.
- US-021 Approval queues: 5 pts, frontend-agent.
- Epic owner: unassigned.
- Sprint mapping by goal text:
  - Approval decisions and queues: Sprint 4.
  - No-self-approval, resubmission and mark paid: Sprint 5.

**Related:** US-016, US-017, US-018, US-019, US-020, US-021

### EPIC-006 · approved · source: plan:EPIC-006

Epic covering categories and per-line limits. It has 3 stories totalling 7 points.

- US-022 Seeded expense categories: 1 pt, backend-agent.
- US-023 Finance manages categories and limits: 3 pts, backend-agent.
- US-024 Flag over-limit lines for approvers: 3 pts, frontend-agent.
- Epic owner: unassigned.
- Sprint mapping by goal text:
  - Seeded categories: Sprint 1.
  - Category limits with flags: Sprint 5.

**Related:** US-022, US-023, US-024

### EPIC-007 · approved · source: plan:EPIC-007

Epic covering dashboards and CSV export. It has 3 stories totalling 9 points.

- US-025 Employee dashboard of own claims by status: 3 pts, frontend-agent.
- US-026 Finance totals by category and month: 3 pts, backend-agent.
- US-027 Export approved claims as CSV: 3 pts, backend-agent.
- Epic owner: unassigned.
- Sprint mapping by goal text: Sprint 6.

**Related:** US-025, US-026, US-027

### EPIC-008 · approved · source: plan:EPIC-008

Epic covering basic setup and usage documentation. It has 2 stories totalling 4 points.

- US-028 Setup documentation: 2 pts, devops-agent.
- US-029 Usage guide: 2 pts, frontend-agent.
- Epic owner: unassigned.
- Sprint mapping by goal text: Sprint 6.

**Related:** US-028, US-029

### DEV-RUN · draft · source: dev:run

The development run reports status 'completed', but only 6 tickets have results. Three were delivered, two failed and one was skipped.

- Run status as reported: completed.
- Ticket outcomes:
  - Delivered: US-001, US-002, US-003, all in commit 60cef9035ac32e135c360268704f5ca5c36d7ea6 (10 pts).
  - Failed: US-005, US-022.
  - Skipped: US-006.
- Conflict recorded, not resolved:
  - The run status is 'completed'.
  - However, only 3 of 29 planned stories (10 of 103 pts) are reported delivered.
  - 23 stories have no ticket result (see DEV-UNREPORTED).
- Sprint 1 goal impact:
  - The Sprint 1 goal includes Finance-created accounts and seeded categories.
  - The matching stories US-005 and US-022 are reported failed.
- No reasons for failure or skip, test results, reviewers or dates were provided.

**Related:** DEV-PLAN-V3, US-001, US-002, US-003, US-005, US-006, US-022

### DEV-US-001 · draft · source: dev:US-001

Sign in with email and password was delivered.

- Status: delivered.
- Commit: 60cef9035ac32e135c360268704f5ca5c36d7ea6 (shared with US-002 and US-003).
- Plan: 5 pts, backend-agent.
- No test or review results provided.

**Related:** US-001, EPIC-001

### DEV-US-002 · draft · source: dev:US-002

Sign out and session expiry was delivered.

- Status: delivered.
- Commit: 60cef9035ac32e135c360268704f5ca5c36d7ea6 (shared with US-001 and US-003).
- Plan: 3 pts, backend-agent.
- No test or review results provided.

**Related:** US-002, EPIC-001

### DEV-US-003 · draft · source: dev:US-003

Secure password storage was delivered.

- Status: delivered.
- Commit: 60cef9035ac32e135c360268704f5ca5c36d7ea6 (shared with US-001 and US-002).
- Plan: 2 pts, security-agent.
- No test or review results, and no hashing approach, were provided.

**Related:** US-003, EPIC-001

### DEV-US-005 · draft · source: dev:US-005

Finance creates user accounts failed, and no commit was recorded.

- Status: failed.
- Commit: none.
- Plan: 5 pts, backend-agent.
- No failure reason was provided.
- This was part of the Sprint 1 goal.
- The product has no self sign-up, so accounts depend on this capability. That dependency is stated in the project description, not in the run.

**Related:** US-005, EPIC-002

### DEV-US-006 · draft · source: dev:US-006

Finance changes a user's manager or role was skipped, and no commit was recorded.

- Status: skipped.
- Commit: none.
- Plan: 2 pts, backend-agent.
- No reason for skipping was provided.

**Related:** US-006, EPIC-002

### DEV-US-022 · draft · source: dev:US-022

Seeded expense categories failed, and no commit was recorded.

- Status: failed.
- Commit: none.
- Plan: 1 pt, backend-agent.
- No failure reason was provided.
- This was part of the Sprint 1 goal (seeded categories).

**Related:** US-022, EPIC-006

### DEV-UNREPORTED · draft · source: dev:run

23 planned stories have no ticket outcome in the development run. Their delivery state is unknown and is not assumed here.

- Stories with no reported ticket:
  - US-004 and US-007 through US-021.
  - US-023 through US-029.
  - US-010 tasks T1, T2 and T3 are also not reported.
- These stories make up 93 of the 103 planned points. This includes:
  - Claims, receipts, approvals and payment.
  - Category management and limits.
  - Dashboards and CSV export.
  - Documentation.
- They are not recorded as delivered, failed or pending; the input does not say.

**Related:** US-004, US-007, US-008, US-009, US-010, US-011, US-012, US-013, US-014, US-015, US-016, US-017, US-018, US-019, US-020, US-021, US-023, US-024, US-025, US-026, US-027, US-028, US-029
<!-- sdlc:auto:end narrative -->
