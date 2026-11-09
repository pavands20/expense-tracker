<!-- sdlc:auto:start adr -->
# ADR-0001: Use React 19 for Frontend

Status: Accepted  
Date: 2026-11-09

## Context and Problem Statement

Which Frontend technology does the project use? Decided in architecture v1.

## Considered Options

- React 19
- Vue
- Angular

## Decision Outcome

Chosen option: React 19, because Approved stack. The app is a TypeScript SPA built with Vite and deployed as static files to its own origin. Role-aware routing shows Employee, Manager and Finance screens from one bundle, while all real enforcement stays on the API.

## Consequences

Every authorisation decision must still be made server-side, and the SPA only hides controls. Tokens in sessionStorage need XSS discipline: no dangerouslySetInnerHTML and a strict CSP on CloudFront.
<!-- sdlc:auto:end adr -->