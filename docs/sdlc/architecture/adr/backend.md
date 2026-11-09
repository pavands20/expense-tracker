<!-- sdlc:auto:start adr -->
# ADR-0002: Use FastAPI 0.115 for Backend

Status: Accepted  
Date: 2026-11-09

## Context and Problem Statement

Which Backend technology does the project use? Decided in architecture v1.

## Considered Options

- FastAPI 0.115
- Django
- NestJS

## Decision Outcome

Chosen option: FastAPI 0.115, because Approved stack. A single API holds the workflow state machine, the visibility policy, opaque-token sessions, receipt checks, presigned links and CSV streaming. Pydantic models give the field-level validation messages required by AC-031 and NFR-014.

## Consequences

Sessions are custom code rather than a framework auth module. This keeps the design simple and fully revocable, at the cost of one database lookup per request, which is negligible at 50 users.
<!-- sdlc:auto:end adr -->