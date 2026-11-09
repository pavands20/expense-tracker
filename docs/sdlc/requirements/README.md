# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-SCOPE · draft · source: requirements:scope

Requirements version 1 with lightweight delivery scope. The scope covers sign-in, user and role administration, multi-line claims with receipts, two-step approval and payment status, categories with limits, dashboards and CSV export.

- Delivery scope: lightweight. Requirements version: 1.
- Capabilities listed in scope:
  - Email/password sign-in and sign-out
  - Admin-created accounts (no self sign-up)
  - Multi-line claims (date, category, GBP amount, description)
  - Seeded categories (Travel, Meals, Equipment, Other)
  - Editable drafts
  - Submission with locking
  - My claims list and claim detail
  - Employee dashboard by status
  - Basic setup and usage documentation
- Additional requirements stated by the product owner:
  - Roles Employee, Manager and Finance, with deactivation that keeps history
  - Two-step approval, with no self-approval and a different Finance user required for a Finance user's own claim
  - Rejected claims return as drafts
  - Mark paid
  - Receipts: JPEG, PNG or PDF up to 5 MB, in private S3, viewed through short-lived links
  - Password reset by email
  - Categories with optional per-line limits and over-limit flags
  - Finance totals by category and month
  - CSV export with a date-range filter
- Note: the 'Capabilities in scope' list is narrower than the additional requirements and the epics. It omits approval, receipts, password reset, Finance dashboard and CSV export. Both are recorded here; the epics and stories cover the full set.
- Note: the project description says Finance assigns each employee a manager. EPIC-002 states that every user, including Managers and Finance users, gets an assigned manager.
- Out of scope: currency conversion, mileage claims, card feeds, accounting integrations.
- English only. At most 50 users. Single AWS region.

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004, EPIC-005, EPIC-006, EPIC-007, EPIC-008

### REQ-STACK · approved · source: requirements:technology-stack

Technology stack approved by the product owner: FastAPI 0.115, React 19, PostgreSQL 16 and AWS. Design must use exactly these, with no substitutions.

- Backend: FastAPI 0.115.
  - Rationale: the hard parts are server-side rules: no self-approval, a Finance claim needs a different Finance user, submitted claims are locked, managers see only direct reports.
  - Also handles sign-in, 5 MB upload checks, presigned S3 links and CSV export.
- Cloud: AWS.
  - Receipts in a private S3 bucket, served by short-lived links.
  - Password-reset email through Amazon SES.
  - Encryption in transit and at rest for UK GDPR.
  - Single region is enough for at most 50 users; London (eu-west-2) keeps personal data in the UK.
- Database: PostgreSQL 16.
  - Closely related records: claims, lines, categories, users, approval history.
  - Category/month totals are plain queries.
  - Exact decimal types for GBP.
  - Transactions keep a claim and its status changes consistent.
  - Deactivate users rather than delete them.
- Frontend: React 19.
  - Forms and tables: claim lines, uploads, approval queues, Finance dashboard and CSV export.
  - One interface shows role-specific screens.

**Related:** NFR-005, NFR-006, NFR-009, NFR-012, NFR-013

### REQ-SERVICES · approved · source: requirements:services

Approved runtime services: Amazon S3 for receipt storage, and an SMTP server (Amazon SES via SMTP) for password-reset email. Lists the required environment variables.

- File storage: Amazon S3 (saas).
  - Env: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, S3_BUCKET.
  - Receipts (JPEG, PNG or PDF, up to 5 MB) stored in a private bucket and viewed only through short-lived links.
- Email: SMTP server (saas).
  - Env: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD.
  - Amazon SES used through its standard SMTP connection; the catalog has no direct SES option.
  - Sends only password-reset emails from a verified domain.
  - SendGrid is the stated alternative if the owner does not want to verify a domain in AWS.
- Required keys: AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY, S3_BUCKET, SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER.

**Related:** EPIC-004, US-004, US-014, US-015

### EPIC-001 · draft · source: requirements:EPIC-001

Sign-in, sessions and password reset for an English-only web app. Email and password sign-in, with no self sign-up.

- Assumption: reset emails are sent via Amazon SES, which needs a verified sender domain and AWS credentials.
- Password reset is the only email the app sends. There are no approval or other notification emails.
- Session vs token authentication is a design choice; requirements are stated as outcomes only.
- At most 50 users, so a single-region AWS deployment with no special scaling.

**Related:** US-001, US-002, US-003, US-004

### US-001 · draft · source: requirements:US-001

[critical] Users (Employee, Manager, Finance) sign in with email and password and see only the pages their role allows.

- AC-001: Active account + correct email/password -> signed in, sees pages allowed for their role.
- AC-002: Wrong password or unknown email -> refused with a generic error that does not reveal which part was wrong.
- AC-003: Not signed in -> any claim page or direct API call is refused, and the user is asked to sign in.
- AC-004: Login page has no self sign-up option.

**Related:** EPIC-001, NFR-001, NFR-002

### US-002 · draft · source: requirements:US-002

[high] Users can sign out, and sessions expire. Ended sessions are refused, including at the API.

- AC-005: Sign out ends the session; reusing it, including via the API, is refused.
- AC-006: Session older than the configured lifetime -> next request asks the user to sign in again.
- AC-007: Finance deactivates the account while the user is signed in -> next request is refused and the session ends.

**Related:** EPIC-001, NFR-001, US-007

### US-003 · draft · source: requirements:US-003

[high] Passwords are never stored or shown in readable form.

- AC-008: The database holds only salted password hashes, never plain text.
- AC-009: No password or hash appears on any screen, in any API response or in any log.

**Related:** EPIC-001, NFR-003

### US-004 · draft · source: requirements:US-004

[high] A user who forgot their password can request a single-use, expiring reset link by email.

- AC-010: Active account -> reset link sent to that address via Amazon SES.
- AC-011: Email with no active account -> same neutral confirmation, no email sent.
- AC-012: New password set via the link works; the old password does not; the link cannot be reused.
- AC-013: Expired link is refused, and the user can request a new one.
- AC-014: Deactivated account -> no email is sent and the account still cannot sign in.

**Related:** EPIC-001, NFR-004, NFR-016, REQ-SERVICES

### EPIC-002 · draft · source: requirements:EPIC-002

User accounts, roles (Employee, Manager, Finance) and claim visibility. Finance creates accounts and assigns every user a manager.

- Managers and Finance users also get an assigned manager, e.g. a director.
- Open decision: Finance sets an initial password or sends an invite link. The exact choice is to be settled in design.
- Deactivated users cannot sign in; their history is kept.
- UK GDPR basics: encryption in transit and at rest, role-based access. No specific retention period.

**Related:** US-005, US-006, US-007, US-008, US-009

### US-005 · draft · source: requirements:US-005

[critical] Finance creates user accounts with name, email, role and assigned manager. There is no self sign-up.

- AC-015: Finance creates a user with name, unique email, role and assigned manager. The user gets access via an initial password or an invite link (choice open).
- AC-016: Duplicate email -> refused with a clear message.
- AC-017: Employees and Managers cannot create or edit users.
- AC-018: A user cannot be assigned as their own manager.

**Related:** EPIC-002, NFR-005

### US-006 · draft · source: requirements:US-006

[medium] Finance can change a user's role and assigned manager so approval routing stays correct.

- AC-019: When the manager changes, the new manager sees the user's claims from then on and the previous manager no longer does.
- AC-020: Approval history already recorded by a previous manager is unchanged.

**Related:** EPIC-002, NFR-011

### US-007 · draft · source: requirements:US-007

[high] Finance deactivates leavers, which blocks access and keeps their history. Finance can also reactivate them.

- AC-021: A deactivated user cannot sign in and any session ends. Their claims and approval history stay visible to authorised roles.
- AC-022: A reactivated user can sign in again.

**Related:** EPIC-002, NFR-001, NFR-011

### US-008 · draft · source: requirements:US-008

[critical] Users see only the claims and receipts their role permits.

- AC-023: Employees see and open only their own claims, including when requesting another user's claim by ID.
- AC-024: Managers see their own claims and their direct reports' claims only.
- AC-025: Finance sees all claims.
- AC-026: A receipt request for a claim the user may not view is refused.

**Related:** EPIC-002, NFR-005, NFR-007

### US-009 · draft · source: requirements:US-009

[high] Personal data and receipts are protected in transit and at rest, to meet basic UK GDPR expectations.

- AC-027: All traffic, including to the API, uses HTTPS.
- AC-028: Encryption at rest is enabled for the database and receipt storage.
- AC-029: No automatic deletion; the retention period is recorded as undecided.

**Related:** EPIC-002, NFR-009, NFR-010

### EPIC-003 · draft · source: requirements:EPIC-003

Expense claims and lines. Any user can create claims with one or more lines. Drafts are editable; submitted claims are locked.

- Each line has date, category, GBP amount and description.
- GBP only.
- Excluded: currency conversion, mileage, card feeds, accounting integrations.

**Related:** US-010, US-011, US-012, US-013

### US-010 · draft · source: requirements:US-010

[critical] Create a draft claim with one or more itemised lines and a GBP total.

- AC-030: Lines with date, category (from the list), GBP amount and description are saved as a draft with a GBP total.
- AC-031: A missing field, a zero or negative amount, or more than 2 decimal places -> rejected with a field-level message.
- AC-032: Adding or removing lines updates the total.

**Related:** EPIC-003, NFR-012, NFR-014

### US-011 · draft · source: requirements:US-011

[high] Owners can edit or delete their own draft claims only.

- AC-033: Changes to a draft (change, add or remove lines, delete the claim) are saved.
- AC-034: Editing or deleting a non-draft claim is refused, including via the API.
- AC-035: Editing someone else's claim is refused.

**Related:** EPIC-003, NFR-006

### US-012 · draft · source: requirements:US-012

[critical] Submitting a draft sends it for approval and locks it.

- AC-036: A draft with at least one valid line becomes Submitted and read-only, including its receipts.
- AC-037: Submitting a draft with no lines is refused with a message.
- AC-038: Changes to a submitted claim are refused.
- AC-039: A submitted claim appears to the assigned manager for first-level approval. No notification email is sent.

**Related:** EPIC-003, NFR-006, NFR-016, US-016

### US-013 · draft · source: requirements:US-013

[high] My claims list and claim detail screens.

- AC-040: The list shows each claim's date, GBP total and status, with a status filter.
- AC-041: The detail screen shows lines, receipts, status, and each approver's decision, comment and date.
- AC-042: Over-limit lines show a flag.

**Related:** EPIC-003, US-024

### EPIC-004 · draft · source: requirements:EPIC-004

Receipts: one receipt per claim line (JPEG, PNG or PDF, up to 5 MB).

- Assumption: receipts are held in a private S3 bucket and viewed via short-lived presigned links.
- The type check covers JPEG, PNG and PDF.

**Related:** US-014, US-015, REQ-SERVICES

### US-014 · draft · source: requirements:US-014

[high] Attach, replace or remove one receipt per line on a draft claim.

- AC-043: A JPEG, PNG or PDF of 5 MB or less is attached to the line.
- AC-044: A file over 5 MB or of another type is rejected with a clear message and nothing is stored. The type is checked on file content, not only the name.
- AC-045: A new upload replaces the existing receipt.
- AC-046: Adding, replacing or removing a receipt on a submitted claim is refused.
- AC-047: Removing a receipt leaves the line with no receipt.

**Related:** EPIC-004, NFR-008, NFR-006

### US-015 · draft · source: requirements:US-015

[high] Authorised viewers (owner, assigned manager, Finance) open receipts through short-lived private links.

- AC-048: Receipts are served via a short-lived link that stops working after it expires.
- AC-049: Direct bucket access without a link is denied; the bucket is private.
- AC-050: Unauthorised users are issued no link.

**Related:** EPIC-004, NFR-007, US-008

### EPIC-005 · draft · source: requirements:EPIC-005

Two-step approval: the assigned manager decides first, then Finance, and Finance marks approved claims paid. Nobody approves their own claim.

- A Finance user's claim needs a different Finance user at the Finance step.
- Rejection at either step returns the claim as an editable draft with the approver's comment.
- Decision: the earlier option of copying a rejected claim into a new draft is not included. Return-as-draft is the agreed behaviour.
- 'Mark paid' is a status change only. No money moves and there is no payment provider.
- No notification emails.

**Related:** US-016, US-017, US-018, US-019, US-020, US-021

### US-016 · draft · source: requirements:US-016

[critical] A Manager approves or rejects direct reports' submitted claims with a comment.

- AC-051: Approve -> status becomes Manager approved; decision, comment, name and time are recorded.
- AC-052: Reject -> claim returns to the claimant as an editable draft with the comment; the rejection stays in history.
- AC-053: Rejecting without a comment is refused.
- AC-054: Deciding on a claim from someone who is not a direct report is refused.
- AC-055: Over-limit lines are flagged, and approval is still allowed.
- Note: the wording differs across inputs. AC-051 says 'approve it with a comment', while the functional summary says 'A comment is required to reject' and does not say a comment is required to approve. Both versions are recorded here.

**Related:** EPIC-005, NFR-006, US-024

### US-017 · draft · source: requirements:US-017

[critical] Finance approves or rejects manager-approved claims with a comment.

- AC-056: Approve -> status becomes Approved and the decision is recorded.
- AC-057: Reject -> claim returns as an editable draft with the comment; the rejection stays in history.
- AC-058: Approving a claim that is Submitted but not manager-approved is refused.
- AC-059: Over-limit lines are flagged.

**Related:** EPIC-005, NFR-006

### US-018 · draft · source: requirements:US-018

[critical] Nobody can approve their own claim at either step.

- AC-060: Deciding on your own claim as manager is refused, including via the API.
- AC-061: A Finance user cannot decide on their own claim at the Finance step; a different Finance user can.
- AC-062: Claims from Managers and Finance users route to their assigned manager (e.g. a director) at step 1.

**Related:** EPIC-005, NFR-006

### US-019 · draft · source: requirements:US-019

[high] A rejected claim returns as an editable draft with the approver's comment and can be resubmitted.

- AC-063: A rejected claim opens as an editable draft showing the rejecting approver's comment.
- AC-064: A resubmitted claim restarts at manager approval (step 1).

**Related:** EPIC-005, US-016, US-017

### US-020 · draft · source: requirements:US-020

[high] Finance marks Approved claims as Paid. This is a status change only.

- AC-065: Approved -> Paid, with date and name recorded. No payment is made by the app.
- AC-066: Marking a claim paid that is not Approved is refused.
- AC-067 (as stated): marking your own claim paid is refused unless it was approved by a different Finance user, in which case another Finance user performs it. The wording is ambiguous; it should be confirmed in design.
- AC-068: Any change to a Paid claim's status or content is refused.

**Related:** EPIC-005, NFR-006

### US-021 · draft · source: requirements:US-021

[high] Approval queues for Managers and Finance.

- AC-069: The Manager queue shows direct reports' Submitted claims, excluding the manager's own.
- AC-070: The Finance queue shows Manager approved claims the user may decide, plus Approved claims awaiting payment.

**Related:** EPIC-005, US-016, US-017, US-020

### EPIC-006 · draft · source: requirements:EPIC-006

Categories (seeded Travel, Meals, Equipment, Other) with optional per-line GBP limits managed by Finance.

- Assumption: over-limit lines are flagged for the approver but not blocked.

**Related:** US-022, US-023, US-024

### US-022 · draft · source: requirements:US-022

[high] Travel, Meals, Equipment and Other are available from first install.

- AC-071: On a fresh installation, all four categories are selectable when adding a claim line.

**Related:** EPIC-006

### US-023 · draft · source: requirements:US-023

[high] Finance adds, renames and deactivates categories and sets optional per-line limits.

- AC-072: A category added with or without a limit is available for new lines.
- AC-073: Changing or clearing a limit applies to flag evaluation from then on.
- AC-074: A deactivated category is not selectable for new lines but still displays on existing claims.
- AC-075: Non-Finance users are refused.

**Related:** EPIC-006, NFR-005

### US-024 · draft · source: requirements:US-024

[medium] Lines over their category limit are flagged for approvers but not blocked.

- AC-076: An amount greater than £X (the category limit) is flagged on the detail and approval screens, showing the limit.
- AC-077: Saving or submitting is not blocked.
- AC-078: A category with no limit never flags.

**Related:** EPIC-006, US-013, US-016, US-017

### EPIC-007 · draft · source: requirements:EPIC-007

Employee dashboard by status, Finance totals by category and month, and CSV export of approved claims.

- Assumption: totals count Approved and Paid claims.
- CSV fields: claim, line, category, amount, employee, date. Filterable by date range.

**Related:** US-025, US-026, US-027

### US-025 · draft · source: requirements:US-025

[high] Dashboard showing the count and GBP total of the user's own claims per status.

- AC-079: Count and GBP total per status (Draft, Submitted, Manager approved, Approved, Paid), covering own claims only.
- AC-080: With no claims, zero values or an empty-state message are shown.

**Related:** EPIC-007, NFR-012

### US-026 · draft · source: requirements:US-026

[medium] Finance sees GBP totals per category per month for Approved and Paid claims.

- AC-081: Totals include only Approved and Paid claims.
- AC-082: Draft, Submitted, Manager approved and rejected claims are excluded.
- AC-083: Non-Finance users are refused.

**Related:** EPIC-007, NFR-005, NFR-012

### US-027 · draft · source: requirements:US-027

[medium] Finance exports approved claims to CSV for a date range.

- AC-084: One row per line: claim ID, line ID, category, GBP amount, employee, line date. Approved claims in the range only.
- AC-085: No matches -> headers only.
- AC-086: Non-Finance users are refused.
- Note: the AC says 'approved claims' only. The Finance dashboard (US-026) counts Approved and Paid. Whether Paid claims are included in the export is not stated.

**Related:** EPIC-007, NFR-005

### EPIC-008 · draft · source: requirements:EPIC-008

Lightweight setup and usage documentation delivered with the app.

- Deployment is single-region AWS with no special scaling.

**Related:** US-028, US-029

### US-028 · draft · source: requirements:US-028

[medium] Setup documentation for configuration and AWS deployment.

- AC-087: Following the guide deploys the app and creates the first Finance user. Required settings listed: database, private S3 bucket, Amazon SES verified sender domain, AWS credentials.
- AC-088: The guide states the seeded categories, and that no retention period or notification emails are configured.

**Related:** EPIC-008, NFR-015

### US-029 · draft · source: requirements:US-029

[low] A short usage guide per role.

- AC-089: Covers submitting claims with receipts, approval steps, and rejection and resubmission.
- The Finance section adds users, categories, mark paid and CSV export.

**Related:** EPIC-008, NFR-015

### NFR-001 · draft · source: requirements:NFR-001

[security] Sessions end on sign-out, expiry or deactivation.

- After a session ends, any request, including a direct API call, is refused and the user is asked to sign in again.

**Related:** US-001, US-002, US-007

### NFR-002 · draft · source: requirements:NFR-002

[security] Access is refused unless the user is signed in.

- Every claim page and API call requires sign-in.
- Sign-in errors are generic.
- No self sign-up.

**Related:** US-001

### NFR-003 · draft · source: requirements:NFR-003

[security] Passwords are stored as salted hashes and never shown.

- No password or hash appears on any screen, in any API response or in any log.

**Related:** US-003

### NFR-004 · draft · source: requirements:NFR-004

[security] Password-reset links are safe.

- Links expire and are single-use.
- No link is sent for unknown or deactivated emails.
- The confirmation is identical either way, so it does not reveal which emails are registered.

**Related:** US-004

### NFR-005 · draft · source: requirements:NFR-005

[security] Role-based access is enforced on the server for every request.

- Employees see their own claims; Managers see their own plus direct reports'; Finance sees all.
- Only Finance manages users, categories, the Finance dashboard and CSV export.
- Enforced on direct API calls and on claim requests by ID.

**Related:** US-005, US-008, US-023, US-026, US-027

### NFR-006 · draft · source: requirements:NFR-006

[security] Approval rules cannot be bypassed.

- No self-decision at either step.
- A Finance user's claim is decided by a different Finance user.
- Submitted and Paid claims are immutable.
- These rules hold for direct API calls.

**Related:** US-011, US-012, US-016, US-017, US-018, US-020

### NFR-007 · draft · source: requirements:NFR-007

[security] Receipts are private and served by short-lived links.

- The bucket is not directly reachable.
- Links are issued only to the owner, the assigned manager or Finance, and expire.

**Related:** US-015, US-008

### NFR-008 · draft · source: requirements:NFR-008

[security] Receipt upload type and size checks.

- Target: maximum 5 MB; JPEG, PNG or PDF only.
- Type is checked on file content, not the name.
- Rejected files are not stored.

**Related:** US-014

### NFR-009 · draft · source: requirements:NFR-009

[privacy] Encryption in transit and at rest, with UK hosting.

- HTTPS for all traffic, including the API.
- Encryption at rest for the database and receipt storage.
- Basic UK GDPR expectations; hosted in the UK.

**Related:** US-009

### NFR-010 · draft · source: requirements:NFR-010

[compliance] (accepted risk) Data retention period is left undecided.

- No retention period is set and no automatic deletion happens.
- Decision recorded as undecided.
- Claims and approval history are kept for audit.

**Related:** US-009

### NFR-011 · draft · source: requirements:NFR-011

[compliance] History is kept when users change or leave.

- Deactivation or a manager change does not remove or alter claims or approval history.
- Authorised roles can still see this history.

**Related:** US-006, US-007

### NFR-012 · draft · source: requirements:NFR-012

[maintainability] Accurate GBP amounts.

- GBP only, greater than 0, at most 2 decimal places.
- Claim and dashboard totals are exact, with no rounding errors.

**Related:** US-010, US-025, US-026

### NFR-013 · draft · source: requirements:NFR-013

[scalability] (accepted risk) Small scale, single region.

- Target: at most 50 users.
- Single AWS region, no special scaling.
- Applies to the whole system.

**Related:** REQ-STACK

### NFR-014 · draft · source: requirements:NFR-014

[usability] English-only interface.

- English only.
- Forms show clear field-level messages when input is rejected.

**Related:** US-010

### NFR-015 · draft · source: requirements:NFR-015

[maintainability] Setup and usage documentation.

- Setup covers deployment, settings and the first Finance user.
- States the seeded categories, no retention period and no notification emails.
- A short usage guide per role.

**Related:** US-028, US-029

### NFR-016 · draft · source: requirements:NFR-016

[compliance] (accepted risk) No notification emails.

- Password reset is the only email the app sends.
- Deliberate decision for this version.

**Related:** US-012, US-004
<!-- sdlc:auto:end narrative -->

<!-- sdlc:auto:start summary -->
**Requirements version:** v1  
**Delivery scope:** lightweight  
**Approved:** 2026-11-09

**Capabilities in scope:** Email and password sign-in and sign-out, Employee accounts created by an administrator (no self sign-up), Expense claim creation with multiple lines, Claim lines with date, category, GBP amount and description, Seeded categories (Travel, Meals, Equipment, Other), Editable draft claims, Claim submission with locking of submitted claims, My claims list and claim detail screens, Employee dashboard of own claims by status, Basic setup and usage documentation

**Additional requirements:**

- Roles: Employee, Manager and Finance. Finance creates accounts, assigns each user a manager, and can deactivate users (history kept). Employees see their own claims, managers their direct reports' claims, Finance all claims.
- Two-step approval: the assigned manager approves or rejects a submitted claim with a comment, then Finance approves or rejects and marks it paid. Nobody approves their own claim; a Finance user's claim needs a different Finance user. A rejected claim goes back to the employee as a draft with the approver's comment.
- Receipt upload per claim line: JPEG, PNG or PDF, up to 5 MB, stored in a private S3 bucket and viewed through short-lived links. Password reset by email. Finance manages categories with an optional per-line limit (over-limit lines are flagged for approvers), sees totals of approved and paid claims by category and month, and exports approved claims as CSV with a date-range filter.

**Approved technology stack:**

| Layer | Choice | Rationale |
|---|---|---|
| backend | FastAPI | You specified FastAPI. The hard parts of this product are rules: nobody approves their own claim, a Finance claim needs a different Finance user, submitted claims are locked, and managers see only their direct reports. These belong in one server-side API. FastAPI also handles the sign-in, 5 MB receipt upload checks, presigned S3 links and CSV export that you described. |
| cloud | AWS | You specified AWS. Receipts go in a private S3 bucket and are served by short-lived links. Password-reset email goes through Amazon SES, and encryption in transit and at rest for UK GDPR is available as standard. A single-region deployment is enough for at most 50 users. Choosing the London region (eu-west-2) keeps personal data in the UK. |
| database | PostgreSQL | You specified PostgreSQL. Claims, lines, categories, users and approval history are closely related records. Finance needs totals by category and month, which are plain database queries. Exact decimal types keep GBP amounts correct, and transactions keep a claim and its status changes consistent. Your history-must-be-kept rule fits with deactivating users instead of deleting them. |
| frontend | React | You specified React. The app is forms and tables: claim lines, receipt uploads, approval queues, and a Finance dashboard with CSV export. React handles these well. It also lets one interface show different screens to Employees, Managers and Finance. |
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start epics -->
## EPIC-001: Sign-in, sessions and password reset

English-only web app. Sign-in by email and password; no self sign-up. Assumptions: password-reset emails are sent via Amazon SES (needs a verified sender domain and AWS credentials). The only email the app sends is password reset; there are no claim-awaiting-approval or other notification emails. Auth mechanism (session or token) is a design choice; requirements are stated as outcomes only. Scale is at most 50 users, so single-region AWS deployment with no special scaling is sufficient.

### US-001: Sign in with email and password

**Priority:** critical

> As a user (Employee, Manager or Finance), I want to sign in with my email and password, so that I can access my expense claims securely.

| ID | Given | When | Then |
|---|---|---|---|
| AC-001 | an active account with a known password | I submit my correct email and password | I am signed in and see the pages my role allows |
| AC-002 | an account exists | I submit a wrong password or an unknown email | sign-in is refused with a generic error that does not reveal which part was wrong |
| AC-003 | I am not signed in | I try to open any claim page or call the API directly | access is refused and I am asked to sign in |
| AC-004 | the login page | I look for a way to register | there is no self sign-up option |

### US-002: Sign out and session expiry

**Priority:** high

> As a signed-in user, I want to sign out and have idle sessions expire, so that my account is protected on shared or unattended devices.

| ID | Given | When | Then |
|---|---|---|---|
| AC-005 | I am signed in | I choose Sign out | my session ends and reusing it, including via the API, is refused |
| AC-006 | I have been signed in longer than the configured session lifetime | I make a further request | I am asked to sign in again |
| AC-007 | Finance deactivates my account while I am signed in | I make my next request | it is refused and my session is ended |

### US-003: Passwords stored securely

**Priority:** high

> As a Finance user, I want passwords never to be stored or shown in readable form, so that a data leak does not expose user credentials.

| ID | Given | When | Then |
|---|---|---|---|
| AC-008 | users with passwords set | the database contents are inspected | only salted password hashes are present, no plain-text passwords |
| AC-009 | any screen, API response or log | it is reviewed | no password or hash is displayed |

### US-004: Reset a forgotten password by email

**Priority:** high

> As a user who forgot my password, I want to request a password reset email, so that I can regain access without asking someone to read my password.

| ID | Given | When | Then |
|---|---|---|---|
| AC-010 | an active account | I request a reset with my email | a reset link is sent via Amazon SES to that address |
| AC-011 | an email not belonging to any active account | I request a reset | the same neutral confirmation is shown and no email is sent |
| AC-012 | a reset link I received | I set a new password through it | the new password works, the old one does not, and the link cannot be reused |
| AC-013 | a reset link past its expiry time | I open it | it is refused and I can request a new one |
| AC-014 | a deactivated account | a reset is requested | no email is sent and the account stays unable to sign in |

## EPIC-002: User accounts, roles and visibility

Roles: Employee, Manager, Finance. Finance creates accounts and assigns every user a manager (Managers and Finance users also get an assigned manager, e.g. a director). Assumptions: Finance sets an initial password or sends an invite link (exact choice to be settled in design). Deactivated users cannot sign in and their history is kept. UK GDPR basics apply: encryption in transit and at rest and role-based access; no specific retention period is set.

### US-005: Finance creates user accounts

**Priority:** critical

> As a Finance user, I want to create accounts with name, email, role and assigned manager, so that staff can use the app without self sign-up.

| ID | Given | When | Then |
|---|---|---|---|
| AC-015 | I am signed in as Finance | I create a user with name, unique email, role and an assigned manager | the account is created and the user can obtain access via an initial password I set or an invite link |
| AC-016 | an email already in use | I try to create another user with it | creation is refused with a clear message |
| AC-017 | I am an Employee or Manager | I try to create or edit users | access is refused |
| AC-018 | I am creating a user | I choose an assigned manager | I cannot assign the user as their own manager |

### US-006: Finance changes a user's manager or role

**Priority:** medium

> As a Finance user, I want to edit a user's role and assigned manager, so that approval routing stays correct as staff change.

| ID | Given | When | Then |
|---|---|---|---|
| AC-019 | an existing user | I change their assigned manager | the new manager sees that user's claims from then on and the previous manager no longer does |
| AC-020 | a claim already approved by a previous manager | the user's manager changes | the recorded approval history is unchanged |

### US-007: Finance deactivates users

**Priority:** high

> As a Finance user, I want to deactivate a user, so that leavers cannot access the app while their claim history is kept.

| ID | Given | When | Then |
|---|---|---|---|
| AC-021 | an active user | I deactivate them | they can no longer sign in, any existing session ends, and their claims and approval history remain visible to authorised roles |
| AC-022 | a deactivated user | I reactivate them | they can sign in again |

### US-008: Role-based visibility of claims

**Priority:** critical

> As a user, I want to see only the claims my role permits, so that personal and financial data is protected.

| ID | Given | When | Then |
|---|---|---|---|
| AC-023 | I am signed in as an Employee | I list or open claims, or request another user's claim by its ID | I see and can open only my own claims |
| AC-024 | I am a Manager | I list claims | I see my own claims and those of my direct reports only |
| AC-025 | I am Finance | I list claims | I can see all claims |
| AC-026 | any role | I request a receipt for a claim I may not view | it is refused |

### US-009: Data protection basics

**Priority:** high

> As a company owner, I want personal data and receipts protected in transit and at rest, so that we meet basic UK GDPR expectations.

| ID | Given | When | Then |
|---|---|---|---|
| AC-027 | the deployed app | it is accessed | all traffic, including to the API, uses HTTPS |
| AC-028 | the database and receipt storage | their configuration is inspected | encryption at rest is enabled |
| AC-029 | this version | retention is considered | no automatic deletion is performed and the retention period is recorded as undecided |

## EPIC-003: Expense claims and lines

Any user (Employee, Manager or Finance) can create claims. A claim has one or more lines, each with date, category, GBP amount and description. Drafts are editable; submitted claims are locked. Currency is GBP only; no currency conversion, mileage, card feeds or accounting integrations.

### US-010: Create a draft claim with multiple lines

**Priority:** critical

> As a user, I want to create a claim with one or more lines, each having date, category, GBP amount and description, so that I can itemise what I spent.

| ID | Given | When | Then |
|---|---|---|---|
| AC-030 | I am signed in | I create a claim and add lines with date, category (from the category list), GBP amount and description | the claim is saved as a draft with those lines and a total in GBP |
| AC-031 | a line with a missing field, an amount that is zero or negative, or more than two decimal places | I save | it is rejected with a field-level message |
| AC-032 | a draft claim | I add or remove lines | the claim total updates accordingly |

### US-011: Edit and delete draft claims

**Priority:** high

> As a claim owner, I want to edit or delete my draft claims, so that I can correct them before submitting.

| ID | Given | When | Then |
|---|---|---|---|
| AC-033 | my claim is a draft | I change, add or remove lines or delete the claim | the changes are saved |
| AC-034 | a claim that is not a draft | I try to edit or delete it, including via the API | it is refused |
| AC-035 | a claim belonging to someone else | I try to edit it | it is refused |

### US-012: Submit a claim and lock it

**Priority:** critical

> As a claim owner, I want to submit my draft claim for approval, so that it enters the approval process.

| ID | Given | When | Then |
|---|---|---|---|
| AC-036 | a draft with at least one valid line | I submit it | its status becomes Submitted and it becomes read-only, including its receipts |
| AC-037 | a draft with no lines | I submit it | submission is refused with a message |
| AC-038 | a submitted claim | I try to change it | the change is refused |
| AC-039 | a claim is submitted | my assigned manager views their claims | it appears for first-level approval; no notification email is sent |

### US-013: My claims list and claim detail

**Priority:** high

> As a user, I want a list of my claims and a detail screen for each, so that I can track what I have claimed and its status.

| ID | Given | When | Then |
|---|---|---|---|
| AC-040 | I have claims | I open My claims | I see each claim's date, total in GBP and status, and can filter by status |
| AC-041 | I open a claim | the detail screen loads | I see its lines, receipts, status, and each approver's decision and comment with date |
| AC-042 | a line is over its category limit | I view the claim | the line shows an over-limit flag |

## EPIC-004: Receipts

Each claim line can carry one receipt (JPEG, PNG or PDF, up to 5 MB). Assumption: receipts are held in a private S3 bucket and viewed through short-lived presigned links; the type check covers JPEG, PNG and PDF.

### US-014: Attach a receipt to a claim line

**Priority:** high

> As a claim owner, I want to attach one receipt file to a line of my draft claim, so that approvers can verify the expense.

| ID | Given | When | Then |
|---|---|---|---|
| AC-043 | a line on my draft claim | I upload a JPEG, PNG or PDF of 5 MB or less | the receipt is attached to that line |
| AC-044 | a file larger than 5 MB or of another type | I upload it | it is rejected with a clear message and nothing is stored; the type is checked on the file content, not only the name |
| AC-045 | a line already has a receipt | I upload another | it replaces the existing receipt |
| AC-046 | my claim is submitted | I try to add, replace or remove a receipt | it is refused |
| AC-047 | a line on my draft claim | I remove its receipt | the line has no receipt |

### US-015: View receipts through short-lived private links

**Priority:** high

> As a authorised viewer (owner, assigned manager, or Finance), I want to open a line's receipt, so that I can check the expense.

| ID | Given | When | Then |
|---|---|---|---|
| AC-048 | I am allowed to view the claim | I open a receipt | it is served through a short-lived link that stops working after it expires |
| AC-049 | the receipt storage bucket | it is accessed directly without a link | access is denied; the bucket is private |
| AC-050 | I am not allowed to view the claim | I request its receipt link | no link is issued |

## EPIC-005: Two-step approval and payment

Step 1: the claimant's assigned manager approves or rejects a submitted claim with a comment. Step 2: Finance approves or rejects manager-approved claims and marks approved ones paid. Nobody approves their own claim; a Finance user's claim needs a different Finance user at the Finance step. Rejection by either step returns the claim to the claimant as an editable draft with the approver's comment. Assumptions: the previously discussed option of copying a rejected claim into a new draft is not included; return-as-draft is the agreed behaviour. 'Mark paid' is only a status change; the app moves no money and has no payment provider. No notification emails are sent.

### US-016: Manager approves or rejects a direct report's claim

**Priority:** critical

> As a Manager, I want to approve or reject submitted claims of my direct reports with a comment, so that only valid claims reach Finance.

| ID | Given | When | Then |
|---|---|---|---|
| AC-051 | a Submitted claim from my direct report | I approve it with a comment | its status becomes Manager approved and the decision, comment, my name and time are recorded |
| AC-052 | a Submitted claim from my direct report | I reject it with a comment | its status returns it to the claimant as an editable draft carrying my comment, and the rejection is kept in the claim history |
| AC-053 | I try to reject without a comment | I submit the decision | it is refused and a comment is required |
| AC-054 | a claim from someone who is not my direct report | I try to decide on it | it is refused |
| AC-055 | a claim with over-limit lines | I review it | over-limit lines are flagged, and I can still approve |

### US-017: Finance approves or rejects manager-approved claims

**Priority:** critical

> As a Finance user, I want to approve or reject manager-approved claims with a comment, so that there is a final check before payment.

| ID | Given | When | Then |
|---|---|---|---|
| AC-056 | a Manager approved claim | I approve it with a comment | its status becomes Approved and the decision is recorded |
| AC-057 | a Manager approved claim | I reject it with a comment | it returns to the claimant as an editable draft carrying my comment; the rejection stays in history |
| AC-058 | a claim that is Submitted and not yet manager-approved | I try to approve it at the Finance step | it is refused |
| AC-059 | over-limit lines on the claim | I review it | they are flagged for me |

### US-018: No self-approval

**Priority:** critical

> As a company owner, I want nobody to be able to approve their own claim at either step, so that expenses are independently checked.

| ID | Given | When | Then |
|---|---|---|---|
| AC-060 | a claim I submitted | I try to approve or reject it as manager, including via the API | it is refused |
| AC-061 | a claim submitted by a Finance user | that same Finance user tries to decide at the Finance step | it is refused, and a different Finance user can decide |
| AC-062 | a Manager or Finance user submits a claim | it is routed | it goes to their assigned manager (e.g. a director) at step 1 |

### US-019: Resubmit a rejected claim

**Priority:** high

> As a claim owner, I want my rejected claim to come back as a draft with the approver's comment, so that I can fix it and resubmit.

| ID | Given | When | Then |
|---|---|---|---|
| AC-063 | my claim was rejected | I open it | it is a draft, editable, and shows the rejecting approver's comment |
| AC-064 | I edit and resubmit it | it is submitted | it goes through manager approval again from step 1 |

### US-020: Finance marks approved claims as paid

**Priority:** high

> As a Finance user, I want to mark an Approved claim as Paid, so that everyone can see it has been reimbursed.

| ID | Given | When | Then |
|---|---|---|---|
| AC-065 | an Approved claim | I mark it paid | its status becomes Paid with the date and my name recorded; no payment is made by the app |
| AC-066 | a claim not in Approved status | I try to mark it paid | it is refused |
| AC-067 | a claim I submitted myself | I try to mark it paid | it is refused unless it was approved by a different Finance user, in which case another Finance user performs it |
| AC-068 | a Paid claim | anyone tries to change its status or content | it is refused |

### US-021: Approval queues

**Priority:** high

> As a Manager or Finance user, I want a list of claims waiting for my decision, so that I can find and review them quickly.

| ID | Given | When | Then |
|---|---|---|---|
| AC-069 | I am a Manager | I open my approval queue | I see Submitted claims of my direct reports, excluding my own |
| AC-070 | I am Finance | I open the Finance queue | I see Manager approved claims I may decide, and Approved claims awaiting payment |

## EPIC-006: Categories and per-line limits

Seeded with Travel, Meals, Equipment, Other. Finance manages categories, each with an optional per-line limit in GBP. Assumption: over-limit lines are flagged for the approver but not blocked.

### US-022: Seeded expense categories

**Priority:** high

> As a user, I want Travel, Meals, Equipment and Other to be available from the start, so that I can categorise lines immediately.

| ID | Given | When | Then |
|---|---|---|---|
| AC-071 | a fresh installation | I add a claim line | Travel, Meals, Equipment and Other are selectable |

### US-023: Finance manages categories and limits

**Priority:** high

> As a Finance user, I want to add, rename and deactivate categories and set an optional per-line limit, so that claims follow company policy.

| ID | Given | When | Then |
|---|---|---|---|
| AC-072 | I am Finance | I add a category with or without a limit | it is available for new lines |
| AC-073 | a category | I change or clear its limit | the flag applies to evaluation from then on |
| AC-074 | a category used by existing lines | I deactivate it | it is no longer selectable for new lines but existing claims still display it |
| AC-075 | I am not Finance | I try to change categories | it is refused |

### US-024: Flag over-limit lines for approvers

**Priority:** medium

> As a approver, I want lines over their category limit to be flagged, so that I can look at them more closely.

| ID | Given | When | Then |
|---|---|---|---|
| AC-076 | a category with a limit of £X | a line in that category has an amount greater than £X | it is flagged as over limit on the claim detail and approval screens, showing the limit |
| AC-077 | a line over the limit | the owner saves or submits the claim | it is not blocked |
| AC-078 | a category with no limit | a line is saved | it is never flagged |

## EPIC-007: Dashboards and CSV export

Employee dashboard shows own claims by status. Finance dashboard shows totals by category and month. Assumption: totals count Approved and Paid claims. CSV export covers approved claims with claim, line, category, amount, employee and date fields, filterable by date range.

### US-025: Employee dashboard of own claims by status

**Priority:** high

> As a user, I want a dashboard showing the number and GBP total of my claims in each status, so that I can see where my claims stand.

| ID | Given | When | Then |
|---|---|---|---|
| AC-079 | I have claims in several statuses | I open my dashboard | I see a count and GBP total per status (Draft, Submitted, Manager approved, Approved, Paid) covering only my claims |
| AC-080 | I have no claims | I open my dashboard | zero values or an empty-state message are shown |

### US-026: Finance totals by category and month

**Priority:** medium

> As a Finance user, I want totals of approved and paid claims by category and month, so that I can see where money is being spent.

| ID | Given | When | Then |
|---|---|---|---|
| AC-081 | approved and paid claims exist | I open the Finance dashboard | I see GBP totals per category per month including only Approved and Paid claims |
| AC-082 | claims in Draft, Submitted, Manager approved or rejected state | totals are calculated | they are excluded |
| AC-083 | I am not Finance | I try to open the Finance dashboard | access is refused |

### US-027: Export approved claims as CSV

**Priority:** medium

> As a Finance user, I want to export approved claims to CSV for a date range, so that I can use the data in other tools.

| ID | Given | When | Then |
|---|---|---|---|
| AC-084 | I choose a start and end date | I export | I receive a CSV with a row per line containing claim ID, line ID, category, GBP amount, employee, and line date, for approved claims in that range only |
| AC-085 | no claims match | I export | the CSV has headers only |
| AC-086 | I am not Finance | I try to export | it is refused |

## EPIC-008: Basic setup and usage documentation

Lightweight documentation delivered with the app. Deployment is single-region AWS with no special scaling.

### US-028: Setup documentation

**Priority:** medium

> As a administrator or developer, I want setup instructions covering configuration and deployment, so that I can run the app on AWS.

| ID | Given | When | Then |
|---|---|---|---|
| AC-087 | a new environment | I follow the setup document | I can deploy the app and create the first Finance user, with the required settings listed (database, private S3 bucket, Amazon SES verified sender domain and AWS credentials) |
| AC-088 | the document | I read it | it states the seeded categories and that no retention period or notification emails are configured |

### US-029: Usage guide

**Priority:** low

> As a Employee, Manager or Finance user, I want a short usage guide for my role, so that I can submit, approve and manage claims without training.

| ID | Given | When | Then |
|---|---|---|---|
| AC-089 | the usage guide | I read my role's section | it explains submitting claims with receipts, the approval steps, rejection and resubmission, and for Finance, users, categories, mark paid and CSV export |
<!-- sdlc:auto:end epics -->
