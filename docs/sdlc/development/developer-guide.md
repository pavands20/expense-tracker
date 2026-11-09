# Developer Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start status -->
_Up to date._
<!-- sdlc:auto:end status -->

<!-- sdlc:auto:start source -->
Generated from commit `27b3f70` · model `auto`
<!-- sdlc:auto:end source -->

<!-- sdlc:auto:start overview -->
Expense Tracker (ExpenseTrack) is a generated monorepo for an employee expense-claims app with Employee, Manager and Finance roles. It contains two applications. `frontend/` is a Vite 6 + React 19 + TypeScript SPA styled with Tailwind CSS v4 and routed with react-router-dom v7; its screens currently render seeded sample data rather than calling the API. `backend/` is a FastAPI 0.115 service using SQLAlchemy 2.0 and Pydantic 2. Its only real route is `GET /health`. It defaults to a local SQLite file (`sqlite:///./app.db`), can point at PostgreSQL through `DATABASE_URL`, and creates tables from the models at startup because it has no migrations. `docker-compose.yml` provides a PostgreSQL 16 container, and `backend/Dockerfile` packages the API on Python 3.12. `frontend/src/lib/api.ts` (`apiFetch`) is the intended connection point for wiring screens to the API.
<!-- sdlc:auto:end overview -->

<!-- sdlc:auto:start prerequisites -->
- Node.js with npm (for the Vite/React frontend)
- Python 3.12 with pip (matches the backend Dockerfile base image `python:3.12-slim`)
- Docker with Docker Compose (optional: only needed for the PostgreSQL 16 database or to build the backend image)
- Playwright Chromium browser (optional: only for end-to-end tests; installed via `npm run test:e2e:install`)
<!-- sdlc:auto:end prerequisites -->

<!-- sdlc:auto:start setup -->
1. cd backend
2. python3.12 -m venv .venv
3. .venv/bin/pip install -r requirements.txt
4. .venv/bin/python -m uvicorn app.main:app --reload
5. (new terminal, from the repo root) cd frontend
6. npm install
7. npm run dev
8. Optional, PostgreSQL instead of SQLite: from the repo root run `docker compose up -d db`, then start the backend with `DATABASE_URL=postgresql+psycopg://app:app@localhost:5432/app` set (credentials from docker-compose.yml; the driver is psycopg 3 from requirements.txt)
9. Optional, point the frontend at a non-default API: set `VITE_API_BASE_URL` (defaults to http://localhost:8000) before `npm run dev` or `npm run build`
<!-- sdlc:auto:end setup -->

<!-- sdlc:auto:start run -->
| Name | Command | Description |
|---|---|---|
| backend dev | `cd backend && uvicorn app.main:app --reload` | Runs the FastAPI service with auto-reload on http://localhost:8000. Tables are created from the models on startup. |
| frontend dev | `cd frontend && npm run dev` | Starts the Vite dev server, which is http://localhost:5173 by default and is the origin the backend's CORS allows. |
| frontend build | `cd frontend && npm run build` | Bundles the SPA with `vite build`. This does not typecheck. |
| frontend preview | `cd frontend && npm run preview` | Serves the production build locally. |
| typecheck | `cd frontend && npm run typecheck` | Runs `tsc --noEmit` over `src/`. |
| lint (frontend) | `cd frontend && npm run lint` | ESLint over the whole frontend. The platform uses this as a gate, so keep it green. `npm run lint:fix` applies the fixes it can. |
| format (frontend) | `cd frontend && npm run format` | Prettier write. `npm run format:check` checks without writing. |
| lint (backend) | `cd backend && ruff check .` | Ruff lint using backend/ruff.toml. |
| format (backend) | `cd backend && ruff format .` | Ruff formatter. |
| database | `docker compose up -d db` | Starts PostgreSQL 16 on localhost:5432 (user/password/db: app/app/app) with a persistent `db-data` volume. |
| backend image | `docker build -t expense-tracker-backend backend` | Builds the backend container. It runs uvicorn on port 8000 as an unprivileged user and has a `/health` HEALTHCHECK. |
<!-- sdlc:auto:end run -->

<!-- sdlc:auto:start structure -->
| Path | Purpose |
|---|---|
| `.devcontainer/` | Dev container configuration (devcontainer.json). |
| `.quorq/` | Quorq platform metadata (handoff.json). This is not application code. |
| `backend/` | FastAPI service. Contains requirements.txt, the Dockerfile, pytest.ini and ruff.toml. |
| `backend/app/` | Application package. `main.py` holds the app, lifespan, CORS and /health. `database.py` holds the engine, `SessionLocal`, `Base` and `get_db`. `models.py` holds the SQLAlchemy models (none yet). `schemas.py` holds the Pydantic models, including `StubResponse`. `routers/` holds the generated routers (empty so far). |
| `backend/tests/` | Pytest suite: `conftest.py` and `test_health.py`. |
| `frontend/` | Vite + React SPA. Contains package.json, vite/tsconfig/eslint/prettier/playwright configs and index.html. |
| `frontend/src/` | App source. `main.tsx` is the entry point (BrowserRouter + `@/App`) and `index.css` holds the styles. `lib/` contains the API client (`api.ts`), the UI/icon component vocabulary (`ui.tsx`, `icons.tsx`) and `navigate.ts`. `test-setup.ts` is the Vitest setup file. |
| `frontend/e2e/` | Playwright end-to-end specs (`example.spec.ts`). |
<!-- sdlc:auto:end structure -->

<!-- sdlc:auto:start conventions -->
- Frontend imports use the `@/` alias for `frontend/src`, configured in both vite.config.ts and tsconfig.json.
- Component tests (`*.test.ts(x)` / `*.spec.ts(x)`) live beside the components under `src/`. Vitest only collects `src/**`, so specs in `e2e/` are left to Playwright.
- TypeScript runs in `strict` mode but with `noImplicitAny` and `strictNullChecks` turned off.
- Styling uses Tailwind CSS v4 via `@tailwindcss/vite`. Formatting is Prettier, and linting is ESLint 9 flat config with eslint-config-prettier.
- Screens render seeded sample data. Real API calls should go through `apiFetch` in `src/lib/api.ts`.
- `apiFetch` sends a bearer token: the session token in localStorage (`session_token`, set via `setSessionToken`) if present, otherwise `VITE_API_SECRET_KEY`. Login is token-in-response-body, not cookie-based.
- Backend layout is one router module per architecture component in `app/routers/`. Unimplemented routes return a typed `StubResponse` instead of raising.
- Every SQLAlchemy model inherits `app.database.Base` and lives in `app/models.py`, which `main.py` imports before `create_all`.
- Database sessions are request-scoped through the `get_db` dependency.
- Backend configuration is read from environment variables: `DATABASE_URL` (default SQLite) and `ALLOWED_ORIGINS` (comma-separated CORS origins; defaults to the Vite dev server on port 5173).
- Schema is created with `Base.metadata.create_all` at startup. There are no migrations; the code says to replace this with Alembic before storing real data.
<!-- sdlc:auto:end conventions -->

<!-- sdlc:auto:start testing -->
| Name | Command | Description |
|---|---|---|
| frontend unit | `cd frontend && npm test` | Vitest component tests in jsdom (`vitest run --passWithNoTests`). |
| e2e browser install | `cd frontend && npm run test:e2e:install` | Downloads Playwright's Chromium. Run this once before the e2e tests. |
| e2e | `cd frontend && npm run test:e2e` | Runs the Playwright specs in `e2e/`. Without `E2E_BASE_URL`, it starts the backend from `backend/.venv` on port 8000 and a built preview of the frontend on port 4173. With `E2E_BASE_URL` set, it tests that deployed URL instead. |
| backend tests | `cd backend && pytest` | Runs `backend/tests`. pytest.ini adds `.` to the path so `import app` works. |
| backend coverage | `cd backend && pytest --cov=app` | Same tests with a coverage report (pytest-cov is in requirements.txt). |
<!-- sdlc:auto:end testing -->

<!-- sdlc:auto:start troubleshooting -->
| Problem | Solution |
|---|---|
| `npm run test:e2e` fails to start the backend web server. | The Playwright config runs `../backend/.venv/bin/python -m uvicorn ...`. Create `backend/.venv` and install `requirements.txt` into it first (see the setup steps). |
| Browser shows CORS errors when calling the API. | By default only http://localhost:5173 and http://127.0.0.1:5173 are allowed. If the frontend runs on another origin (for example preview on 4173), set `ALLOWED_ORIGINS` to a comma-separated list of origins and restart the backend. |
| Backend fails on startup with a database connection error. | `create_all` runs at startup against `DATABASE_URL`. Make sure Postgres is running (`docker compose up -d db`) and healthy, or unset `DATABASE_URL` to fall back to SQLite. |
| `npm run build` succeeds but deployment or `npm run typecheck` fails. | `vite build` does not typecheck. Run `npm run typecheck` and fix the errors; the README notes that untyped `useState({})` is a common cause. |
| Build fails because `@/App` cannot be resolved. | `src/main.tsx` imports `@/App`, but `src/App.tsx` does not appear in the provided file tree. The frontend README also lists `src/screens/` and `src/lib/brand.ts`, which are not in the tree either. Check that these files exist in your checkout. |
| Chromium crashes during e2e runs inside a container. | The config already passes `--disable-dev-shm-usage`. If crashes continue, give the container more shared memory or resources. |
| Stale or unexpected local data in SQLite. | The default database is `app.db` in the backend's working directory. Delete it and restart the backend to recreate the tables. |
<!-- sdlc:auto:end troubleshooting -->
