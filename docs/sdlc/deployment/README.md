# Deployment

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### DEP-d02e9ec1635d · draft · source: deployment:d02e9ec1635d

Expense Tracker version d02e9ec1635d is reported as live. It has a separately hosted frontend and backend. No deployment date, approver, or verification results were provided.

- Reported status: live
- Version identifier: d02e9ec1635d
- Frontend URL: https://pd6a24a9258c4.d3j61xaup4zgrx.amplifyapp.com
- Backend URL: https://44-224-244-62.sslip.io/apps/d6a24a9258c4/
- Entry status is 'draft' because the input records no approval or release sign-off. 'Live' is the reported runtime state, not a recorded approval.
- Not provided in input:
  - deployment date or time
  - who deployed or approved the release
  - environment name (e.g. prod or staging)
  - smoke or post-deploy test results
  - PostgreSQL and S3 receipt-storage configuration
  - rollback plan
  - which user stories (US-001 to US-029) are included in this version
- Project context (from project description, not deployment input): planned stack is React, FastAPI, PostgreSQL, and S3 for receipts on AWS.

**Related:** DEP-d02e9ec1635d-FE, DEP-d02e9ec1635d-BE

### DEP-d02e9ec1635d-FE · draft · source: deployment:d02e9ec1635d

The frontend for version d02e9ec1635d is reachable at an amplifyapp.com URL. This is the end-user entry point for the web application.

- URL: https://pd6a24a9258c4.d3j61xaup4zgrx.amplifyapp.com
- Observation: the amplifyapp.com domain suggests AWS Amplify hosting. This is inferred from the URL only; the input does not state the hosting service.
- Project description names React as the frontend technology. The deployment input does not confirm the build.
- No availability check, TLS or custom-domain details, or access-restriction details were provided.

**Related:** DEP-d02e9ec1635d

### DEP-d02e9ec1635d-BE · draft · source: deployment:d02e9ec1635d

The backend for version d02e9ec1635d is exposed at an sslip.io-based HTTPS URL under the path /apps/d6a24a9258c4/. No health-check or configuration details were provided.

- URL: https://44-224-244-62.sslip.io/apps/d6a24a9258c4/
- Observation: sslip.io hostnames resolve to the IP address embedded in the name (here 44.224.244.62). This is inferred from the URL format, not stated in the input.
- Project description names FastAPI as the backend, PostgreSQL as the database, and S3 for receipts. The deployment input does not confirm how any of these were provisioned or configured.
- Not provided:
  - health-check endpoint or result
  - database migration status
  - receipt storage bucket configuration
  - email (password-reset) delivery configuration

**Related:** DEP-d02e9ec1635d
<!-- sdlc:auto:end narrative -->
