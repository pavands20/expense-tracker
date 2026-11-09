# Deployment

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### DEP-185299aba2a4 · draft · source: deployment:185299aba2a4

ExpenseTrack version 185299aba2a4 is reported as live. The release has one frontend endpoint and one backend endpoint.

- Status: live
- Version: 185299aba2a4
- Frontend URL: https://pd6a24a9258c4.d3j61xaup4zgrx.amplifyapp.com
- Backend URL: https://44-224-244-62.sslip.io/apps/d6a24a9258c4/
- Not provided in the input, so not recorded:
  - deployment date
  - who deployed or approved the release
  - environment name (e.g. staging or production)
  - release notes or change list
  - post-deploy verification or smoke-test results
  - rollback plan
- Requirement coverage: the input does not state which user stories (US-001 to US-029) are included in this version. No requirement links have been asserted.
- Entry status is draft: 'live' confirms the release is running, but no approval was recorded.

**Related:** DEP-185299aba2a4-FE, DEP-185299aba2a4-BE

### DEP-185299aba2a4-FE · draft · source: deployment:185299aba2a4

This is the frontend endpoint for release 185299aba2a4. The project describes the frontend as a React application.

- URL: https://pd6a24a9258c4.d3j61xaup4zgrx.amplifyapp.com
- Part of version 185299aba2a4 (status: live)
- Stack per project description: React, hosted on AWS.
- The hostname is under amplifyapp.com, which indicates AWS Amplify hosting. This is read from the URL only; the input does not state the hosting service explicitly.
- Not provided: build configuration, custom domain, environment variables, verification results.

**Related:** DEP-185299aba2a4

### DEP-185299aba2a4-BE · draft · source: deployment:185299aba2a4

This is the backend API endpoint for release 185299aba2a4. The project describes the backend as a FastAPI service backed by PostgreSQL, with receipts stored in S3.

- URL: https://44-224-244-62.sslip.io/apps/d6a24a9258c4/
- Part of version 185299aba2a4 (status: live)
- Stack per project description:
  - FastAPI
  - PostgreSQL
  - S3 for receipt files
  - hosted on AWS
- The hostname uses sslip.io wildcard DNS that maps to IP 44.224.244.62, served under the path /apps/d6a24a9258c4/. This is read from the URL; no other hosting details were given.
- Not provided:
  - database instance details
  - S3 bucket configuration
  - TLS or certificate details
  - health-check results
  - scaling or backup configuration

**Related:** DEP-185299aba2a4
<!-- sdlc:auto:end narrative -->
