<!-- sdlc:auto:start adr -->
# ADR-0003: Use PostgreSQL 16 for Database

Status: Accepted  
Date: 2026-11-09

## Context and Problem Statement

Which Database technology does the project use? Decided in architecture v1.

## Considered Options

- PostgreSQL 16
- MySQL

## Decision Outcome

Chosen option: PostgreSQL 16, because Approved stack. NUMERIC(12,2) keeps GBP exact, row locks make status transitions safe, and plain GROUP BY queries produce the dashboards. Sessions and reset tokens also live here, so no separate cache or session store is needed.

## Consequences

Sessions are checked against the database on every request instead of with stateless JWTs. This is accepted because it makes immediate revocation on sign-out and deactivation trivial.
<!-- sdlc:auto:end adr -->