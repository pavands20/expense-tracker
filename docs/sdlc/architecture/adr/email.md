<!-- sdlc:auto:start adr -->
# ADR-0006: Use SMTP server for Email

Status: Accepted  
Date: 2026-11-09

## Context and Problem Statement

Which Email technology does the project use? Decided in architecture v1.

## Considered Options

- SMTP server
- SendGrid

## Decision Outcome

Chosen option: SMTP server, because Approved service: Amazon SES is used through its SMTP interface for password-reset emails only. Python's standard smtplib is enough, so no extra library is needed.

## Consequences

The domain must be verified and SES moved out of sandbox before real use. Sending happens in the request path, which is fine at this volume.
<!-- sdlc:auto:end adr -->