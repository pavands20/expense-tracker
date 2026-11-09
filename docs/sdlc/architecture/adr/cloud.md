<!-- sdlc:auto:start adr -->
# ADR-0004: Use AWS for Cloud

Status: Accepted  
Date: 2026-11-09

## Context and Problem Statement

Which Cloud technology does the project use? Decided in architecture v1.

## Considered Options

- AWS
- Azure
- GCP

## Decision Outcome

Chosen option: AWS, because Approved stack. Everything runs in eu-west-2 London: S3 and CloudFront for the SPA, ALB and ECS Fargate for the API, RDS for PostgreSQL 16, a private encrypted S3 bucket for receipts, and SES for reset email.

## Consequences

Fargate with an ALB is slightly more setup than a single VM, but gives managed TLS and container deploys. A single AZ and single region are accepted for 50 users (NFR-013).
<!-- sdlc:auto:end adr -->