<!-- sdlc:auto:start adr -->
# ADR-0005: Use Amazon S3 for File storage

Status: Accepted  
Date: 2026-11-09

## Context and Problem Statement

Which File storage technology does the project use? Decided in architecture v1.

## Considered Options

- Amazon S3
- Storing receipts as PostgreSQL bytea

## Decision Outcome

Chosen option: Amazon S3, because Approved service. PostgreSQL could hold blobs but cannot issue the short-lived, expiring links the requirements ask for. S3 presigned URLs do this natively with a private bucket.

## Consequences

Two stores must be kept consistent. The API writes S3 before committing the line and deletes replaced or orphaned objects.
<!-- sdlc:auto:end adr -->