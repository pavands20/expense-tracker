# Data Model

<!-- sdlc:auto:start entities -->
### users

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| email | varchar(320) unique (stored lower-cased) | False | — | False |
| full_name | varchar(200) | False | — | False |
| role | enum(employee, manager, finance) | False | — | False |
| manager_id | uuid, check manager_id <> id | False | users.id | True |
| password_hash | varchar(255) argon2id | False | — | False |
| is_active | boolean default true | False | — | False |
| deactivated_at | timestamptz | False | — | True |
| created_at | timestamptz | False | — | False |
| updated_at | timestamptz | False | — | False |

### sessions

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| user_id | uuid | False | users.id | False |
| token_hash | char(64) unique sha256 | False | — | False |
| created_at | timestamptz | False | — | False |
| last_seen_at | timestamptz | False | — | False |
| expires_at | timestamptz | False | — | False |
| revoked_at | timestamptz | False | — | True |

### password_reset_tokens

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| user_id | uuid | False | users.id | False |
| token_hash | char(64) unique sha256 | False | — | False |
| expires_at | timestamptz | False | — | False |
| used_at | timestamptz | False | — | True |
| created_at | timestamptz | False | — | False |

### categories

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| name | varchar(100) unique | False | — | False |
| per_line_limit | numeric(12,2) check > 0 | False | — | True |
| is_active | boolean default true | False | — | False |
| created_at | timestamptz | False | — | False |

### claims

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| owner_id | uuid | False | users.id | False |
| title | varchar(200) | False | — | True |
| status | enum(draft, submitted, manager_approved, approved, paid) | False | — | False |
| total_amount | numeric(12,2) default 0 | False | — | False |
| last_rejection_comment | text | False | — | True |
| submitted_at | timestamptz | False | — | True |
| paid_at | timestamptz | False | — | True |
| paid_by_id | uuid | False | users.id | True |
| created_at | timestamptz | False | — | False |
| updated_at | timestamptz | False | — | False |

### claim_lines

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| claim_id | uuid on delete cascade | False | claims.id | False |
| line_date | date | False | — | False |
| category_id | uuid | False | categories.id | False |
| amount | numeric(12,2) check > 0 | False | — | False |
| description | varchar(500) | False | — | False |
| receipt_key | varchar(500) | False | — | True |
| receipt_content_type | varchar(50) | False | — | True |
| receipt_size_bytes | integer check <= 5242880 | False | — | True |
| receipt_filename | varchar(255) | False | — | True |
| position | integer | False | — | False |

### claim_decisions

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| claim_id | uuid | False | claims.id | False |
| step | enum(submission, manager, finance, payment) | False | — | False |
| decision | enum(submitted, approved, rejected, paid) | False | — | False |
| actor_id | uuid | False | users.id | False |
| actor_name | varchar(200) snapshot | False | — | False |
| comment | text | False | — | True |
| created_at | timestamptz | False | — | False |
<!-- sdlc:auto:end entities -->

<!-- sdlc:auto:start relationships -->
| Source | Target | Type |
|---|---|---|
| users | users | one-to-many |
| users | sessions | one-to-many |
| users | password_reset_tokens | one-to-many |
| users | claims | one-to-many |
| claims | claim_lines | one-to-many |
| categories | claim_lines | one-to-many |
| claims | claim_decisions | one-to-many |
| users | claim_decisions | one-to-many |
<!-- sdlc:auto:end relationships -->

<!-- sdlc:auto:start er-diagram -->
```mermaid
erDiagram
  users {
    uuid id PK
    varchar_320__unique__stored_lower_cased_ email
    varchar_200_ full_name
    enum_employee__manager__finance_ role
    uuid__check_manager_id____id manager_id FK
    varchar_255__argon2id password_hash
    boolean_default_true is_active
    timestamptz deactivated_at
    timestamptz created_at
    timestamptz updated_at
  }
  sessions {
    uuid id PK
    uuid user_id FK
    char_64__unique_sha256 token_hash
    timestamptz created_at
    timestamptz last_seen_at
    timestamptz expires_at
    timestamptz revoked_at
  }
  password_reset_tokens {
    uuid id PK
    uuid user_id FK
    char_64__unique_sha256 token_hash
    timestamptz expires_at
    timestamptz used_at
    timestamptz created_at
  }
  categories {
    uuid id PK
    varchar_100__unique name
    numeric_12_2__check___0 per_line_limit
    boolean_default_true is_active
    timestamptz created_at
  }
  claims {
    uuid id PK
    uuid owner_id FK
    varchar_200_ title
    enum_draft__submitted__manager_approved__approved__paid_ status
    numeric_12_2__default_0 total_amount
    text last_rejection_comment
    timestamptz submitted_at
    timestamptz paid_at
    uuid paid_by_id FK
    timestamptz created_at
    timestamptz updated_at
  }
  claim_lines {
    uuid id PK
    uuid_on_delete_cascade claim_id FK
    date line_date
    uuid category_id FK
    numeric_12_2__check___0 amount
    varchar_500_ description
    varchar_500_ receipt_key
    varchar_50_ receipt_content_type
    integer_check____5242880 receipt_size_bytes
    varchar_255_ receipt_filename
    integer position
  }
  claim_decisions {
    uuid id PK
    uuid claim_id FK
    enum_submission__manager__finance__payment_ step
    enum_submitted__approved__rejected__paid_ decision
    uuid actor_id FK
    varchar_200__snapshot actor_name
    text comment
    timestamptz created_at
  }
  users ||--o{ users : "one-to-many"
  users ||--o{ sessions : "one-to-many"
  users ||--o{ password_reset_tokens : "one-to-many"
  users ||--o{ claims : "one-to-many"
  claims ||--o{ claim_lines : "one-to-many"
  categories ||--o{ claim_lines : "one-to-many"
  claims ||--o{ claim_decisions : "one-to-many"
  users ||--o{ claim_decisions : "one-to-many"
```
<!-- sdlc:auto:end er-diagram -->
