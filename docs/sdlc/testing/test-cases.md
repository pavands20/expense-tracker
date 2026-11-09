# Tests

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start summary -->
34 tests · Passed 34 · Failed 0 · Skipped 0 · Not run 0

Acceptance criteria covered: 9/89 · passing: 9/89
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start tests -->
## Sprint 1

### US-001: Sign in with email and password

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| AC-001 | test_ac001_login_and_me | Integration | Passed | `backend/tests/integration/test_auth.py` |
| AC-002 | test_ac002_generic_failures | Integration | Passed | `backend/tests/integration/test_auth.py` |
| AC-003 | test_ac003_requires_token | Integration | Passed | `backend/tests/integration/test_auth.py` |
| AC-004 | test_ac004_no_register | Integration | Passed | `backend/tests/integration/test_auth.py` |
| AC-005 | test_ac005_logout_revokes | Integration | Passed | `backend/tests/integration/test_auth.py` |
| AC-006 | test_ac006_expired | Integration | Passed | `backend/tests/integration/test_auth.py` |
| AC-007 | test_ac007_deactivated | Integration | Passed | `backend/tests/integration/test_auth.py` |
| AC-007 | test_ac007_revoke_user_sessions_helper | Integration | Passed | `backend/tests/integration/test_auth.py` |
| AC-008 | test_ac008_hashes_only | Integration | Passed | `backend/tests/integration/test_auth.py` |
| AC-009 | test_ac009_log_redaction | Integration | Passed | `backend/tests/integration/test_auth.py` |
| AC-009 | test_ac009_no_secrets_in_responses | Integration | Passed | `backend/tests/integration/test_auth.py` |
| — | test_require_role_403 | Integration | Passed | `backend/tests/integration/test_auth.py` |
| — | test_seed_admin_idempotent | Integration | Passed | `backend/tests/integration/test_auth.py` |
| AC-001 | test_ac001_login_returns_token_and_me_works | Integration | Passed | `backend/tests/integration/test_auth_security.py` |
| AC-002 | test_ac002_failures_byte_identical | Integration | Passed | `backend/tests/integration/test_auth_security.py` |
| AC-002 | test_ac002_malformed_email_rejected_without_echo[] | Integration | Passed | `backend/tests/integration/test_auth_security.py` |
| AC-002 | test_ac002_malformed_email_rejected_without_echo[not-an-email] | Integration | Passed | `backend/tests/integration/test_auth_security.py` |
| AC-003 | test_ac003_nfr002_every_non_public_endpoint_requires_auth | Integration | Passed | `backend/tests/integration/test_auth_security.py` |
| AC-004 | test_ac004_no_register_route | Integration | Passed | `backend/tests/integration/test_auth_security.py` |
| AC-005 | test_ac005_logout_ends_session | Integration | Passed | `backend/tests/integration/test_auth_security.py` |
| AC-006 | test_ac006_nfr001_expired_session_refused | Integration | Passed | `backend/tests/integration/test_auth_security.py` |
| AC-007 | test_ac007_nfr001_deactivation_refuses_and_revokes | Integration | Passed | `backend/tests/integration/test_auth_security.py` |
| AC-008 | test_ac008_password_hashes_argon2_and_salted | Integration | Passed | `backend/tests/integration/test_auth_security.py` |
| AC-008 | test_ac008_session_token_stored_hashed | Integration | Passed | `backend/tests/integration/test_auth_security.py` |
| AC-009 | test_ac009_nfr003_logs_contain_no_password_or_token | Integration | Passed | `backend/tests/integration/test_auth_security.py` |
| AC-009 | test_ac009_nfr003_no_secrets_in_auth_responses | Integration | Passed | `backend/tests/integration/test_auth_security.py` |
| AC-001 | [AC-001] valid sign-in lands on the dashboard | E2E | Passed | `frontend/e2e/auth.spec.ts` |
| AC-002 | [AC-002] invalid credentials show one generic error | E2E | Passed | `frontend/e2e/auth.spec.ts` |
| AC-003 | [AC-003] opening /claims signed out redirects to /sign-in | E2E | Passed | `frontend/e2e/auth.spec.ts` |
| AC-004 | [AC-004] sign-in page has no create-account option | E2E | Passed | `frontend/e2e/auth.spec.ts` |
| AC-005 | [AC-005] Sign out returns to /sign-in and back does not show protected pages | E2E | Passed | `frontend/e2e/auth.spec.ts` |

## Project setup

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| — | test_health_reports_ok | Unit | Passed | `backend/tests/test_health.py` |
| — | test_the_openapi_document_builds | Unit | Passed | `backend/tests/test_health.py` |
| — | the app loads | E2E | Passed | `frontend/e2e/example.spec.ts` |
<!-- sdlc:auto:end tests -->
