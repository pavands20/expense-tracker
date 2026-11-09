# Sprint Plan

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start sprints -->
## Sprint 1: Sprint 1

Secure sign-in, sessions, Finance-created accounts and seeded categories

Capacity: 20 points · Committed: 18

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-001 | Story | Sign in with email and password | 5 | backend-agent | US-003 |
| US-002 | Story | Sign out and session expiry | 3 | backend-agent | US-001 |
| US-003 | Story | Passwords stored securely | 2 | security-agent | — |
| US-005 | Story | Finance creates user accounts | 5 | backend-agent | US-001, US-003 |
| US-006 | Story | Finance changes a user's manager or role | 2 | backend-agent | US-005 |
| US-022 | Story | Seeded expense categories | 1 | backend-agent | — |

## Sprint 2: Sprint 2

Password reset, user deactivation, and creating and editing draft claims with lines

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-004 | Story | Reset a forgotten password by email | 5 | integration-agent | US-001, US-003 |
| US-007 | Story | Finance deactivates users | 3 | backend-agent | US-005, US-002 |
| US-010 | Story | Create a draft claim with multiple lines | 8 | backend-agent | US-001, US-022 |
| ↳ US-010-T1 | Task | Add claims and claim_lines migration | — | backend-agent | — |
| ↳ US-010-T2 | Task | Implement claim and line creation endpoints | — | backend-agent | — |
| ↳ US-010-T3 | Task | Build multi-line claim editor screen | — | frontend-agent | — |
| US-011 | Story | Edit and delete draft claims | 3 | backend-agent | US-010 |

## Sprint 3: Sprint 3

Role-based claim visibility, submission and locking, My claims screens and receipt upload

Capacity: 20 points · Committed: 18

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-008 | Story | Role-based visibility of claims | 5 | security-agent | US-005, US-010 |
| US-012 | Story | Submit a claim and lock it | 3 | backend-agent | US-010, US-011 |
| US-013 | Story | My claims list and claim detail | 5 | frontend-agent | US-008, US-010 |
| US-014 | Story | Attach a receipt to a claim line | 5 | integration-agent | US-011 |

## Sprint 4: Sprint 4

Secure receipt viewing, manager and Finance approval decisions, and approval queues

Capacity: 20 points · Committed: 16

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-015 | Story | View receipts through short-lived private links | 3 | integration-agent | US-014, US-008 |
| US-016 | Story | Manager approves or rejects a direct report's claim | 5 | backend-agent | US-012, US-008 |
| US-017 | Story | Finance approves or rejects manager-approved claims | 3 | backend-agent | US-016 |
| US-021 | Story | Approval queues | 5 | frontend-agent | US-012, US-008 |

## Sprint 5: Sprint 5

No-self-approval rules, rejection and resubmission, mark paid, category limits with flags, and data-protection hardening

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-009 | Story | Data protection basics | 5 | devops-agent | US-001 |
| US-018 | Story | No self-approval | 3 | security-agent | US-016, US-017 |
| US-019 | Story | Resubmit a rejected claim | 2 | frontend-agent | US-016, US-017 |
| US-020 | Story | Finance marks approved claims as paid | 3 | backend-agent | US-017 |
| US-023 | Story | Finance manages categories and limits | 3 | backend-agent | US-022, US-005 |
| US-024 | Story | Flag over-limit lines for approvers | 3 | frontend-agent | US-023, US-013 |

## Sprint 6: Sprint 6

Employee and Finance dashboards, CSV export, and setup and usage documentation

Capacity: 20 points · Committed: 13

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-025 | Story | Employee dashboard of own claims by status | 3 | frontend-agent | US-012 |
| US-026 | Story | Finance totals by category and month | 3 | backend-agent | US-020 |
| US-027 | Story | Export approved claims as CSV | 3 | backend-agent | US-017 |
| US-028 | Story | Setup documentation | 2 | devops-agent | US-009 |
| US-029 | Story | Usage guide | 2 | frontend-agent | US-020, US-023, US-027 |

## Unscheduled

_Nothing unscheduled._
<!-- sdlc:auto:end sprints -->
