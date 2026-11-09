# Developer Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start status -->
_Up to date._
<!-- sdlc:auto:end status -->

<!-- sdlc:auto:start source -->
Generated from commit `d02e9ec` · model `auto`
<!-- sdlc:auto:end source -->

<!-- sdlc:auto:start overview -->
Expense Tracker (ExpenseTrack) is a generated monorepo for employee expense claims, with Employee, Manager and Finance roles. It has two applications. `frontend/` is a Vite + React 19 + TypeScript single-page app styled with Tailwind CSS 4 and routed with react-router-dom 7. Its screens are Sign in, Dashboard, Claims, Claim edit, Claim detail and Users, and they still render seeded sample data. `frontend/src/lib/api.ts` provides `apiFetch` as the place to wire them to the real API. `backend/` is a FastAPI 0.115 service using SQLAlchemy 2 and Alembic migrations. It currently implements a `/health` liveness check and bearer-token auth (`POST /auth/login`, `POST /auth/logout`, `GET /auth/me`), backed by `users` and `sessions` tables. The backend defaults to SQLite (`sqlite:///./app.db`) unless `DATABASE_URL` points elsewhere. A docker-compose file provides PostgreSQL 16 for local use. Deployment runs through a GitHub Actions workflow: it pushes the backend image to AWS ECR and publishes the frontend build to AWS Amplify.
<!-- sdlc:auto:end overview -->

<!-- sdlc:auto:start prerequisites -->
- Python 3.12 (the version in backend/Dockerfile) with pip
- Node.js with npm (no version is pinned in package.json; Vite 6 and React 19 need a current LTS)
- Docker with Compose (optional, for the local PostgreSQL 16 database in docker-compose.yml)
- Playwright's Chromium browser (only for e2e tests; installed via `npm run test:e2e:install`)
<!-- sdlc:auto:end prerequisites -->

<!-- sdlc:auto:start setup -->
1. cd backend
2. python -m venv .venv && . .venv/bin/activate
3. pip install -r requirements.txt
4. (Optional, to use PostgreSQL instead of the default SQLite) from the repo root run `docker compose up -d db`, then in backend/ run `export DATABASE_URL=postgresql+psycopg://app:app@localhost:5432/app`
5. alembic upgrade head
6. uvicorn app.main:app --reload
7. In a second terminal: cd frontend
8. npm install
9. npm run dev
<!-- sdlc:auto:end setup -->

<!-- sdlc:auto:start run -->
| Name | Command | Description |
|---|---|---|
| backend dev | `cd backend && uvicorn app.main:app --reload` | Runs the FastAPI API with auto-reload on http://localhost:8000. CORS allows http://localhost:5173 by default. |
| migrate | `cd backend && alembic upgrade head` | Applies Alembic migrations to DATABASE_URL (SQLite ./app.db by default). Tables are never created at startup, so run this first. |
| database | `docker compose up -d db` | Starts a local PostgreSQL 16 database (user/password/db: app/app/app) on port 5432. |
| frontend dev | `cd frontend && npm run dev` | Starts the Vite dev server for the React SPA. |
| build | `cd frontend && npm run build` | Builds the production bundle into frontend/dist. This does not typecheck. |
| preview | `cd frontend && npm run preview` | Serves the built bundle locally. |
| typecheck | `cd frontend && npm run typecheck` | Runs `tsc --noEmit` over src/. |
| backend container | `cd backend && docker build -t expense-tracker-api . && docker run -p 8000:8000 expense-tracker-api` | Builds the backend image and runs it. The container applies `alembic upgrade head`, then serves uvicorn on port 8000 as a non-root user. |
<!-- sdlc:auto:end run -->

<!-- sdlc:auto:start structure -->
| Path | Purpose |
|---|---|
| `.devcontainer/` | Dev container configuration (devcontainer.json). |
| `.github/workflows/` | deploy.yml: on push to main, builds and pushes the backend image to ECR, then builds the frontend and deploys it to AWS Amplify via OIDC. |
| `.quorq/` | Quorq platform metadata (handoff.json, prepared.json). |
| `backend/` | FastAPI service: requirements.txt, Dockerfile, alembic.ini, pytest.ini, ruff.toml. |
| `backend/app/` | Application code: main.py (app, CORS, lifespan admin seeding, /health), config.py, database.py (engine, SessionLocal, get_db), models.py (User, Session), schemas.py (Pydantic I/O), security.py (password/session helpers, log redaction), routers/ (auth.py). |
| `backend/migrations/` | Alembic environment and versions/ (0001_users_sessions.py). |
| `backend/scripts/` | Utility scripts (check_connections.py). |
| `backend/tests/` | Pytest suite: conftest.py, test_health.py, and integration/ auth and auth-security tests. |
| `frontend/` | Vite + React SPA: package.json, vite.config.ts, tsconfig.json, eslint.config.js, .prettierrc, playwright.config.ts. |
| `frontend/e2e/` | Playwright acceptance specs (auth.spec.ts, example.spec.ts). |
| `frontend/src/` | App source: main.tsx (router bootstrap), App.tsx (nav shell and route table), screens/ (one module per approved screen), lib/ (api.ts client, auth, ui/icons vocabulary, brand tokens), index.css, and colocated Vitest tests. |
<!-- sdlc:auto:end structure -->

<!-- sdlc:auto:start conventions -->
- Backend: one APIRouter per component under app/routers/ with a path prefix and tags (e.g. `/auth`), registered in main.py via `app.include_router`.
- Backend: schema changes ship only as Alembic migrations in backend/migrations/versions/. The app never calls create_all.
- Backend: SQLAlchemy 2 typed models (`Mapped[...]`, `mapped_column`) with UUID primary keys and timezone-aware UTC timestamps. A request-scoped session comes from the `get_db` dependency.
- Backend: Pydantic v2 schemas in schemas.py never expose `password_hash`. Validation errors return 422 without echoing submitted input, and logs pass through RedactFilter.
- Backend: auth uses bearer session tokens returned in the `/auth/login` body (stored server-side as `token_hash` in `sessions`), not cookies. Login returns a generic 401 for unknown, wrong-password or inactive users.
- Backend: configuration comes from env vars: `DATABASE_URL` (default SQLite) and `ALLOWED_ORIGINS` (comma-separated, default the Vite dev origins). Lint and format with ruff.
- Frontend: TypeScript with the `@/` alias for `src/`, Tailwind utility classes plus `--brand-*` CSS variables, and screens in src/screens/ routed in App.tsx behind an auth-guarded shell layout.
- Frontend: all API calls should go through `apiFetch` in src/lib/api.ts. It uses `VITE_API_BASE_URL` (default http://localhost:8000), sends the sessionStorage token (or `VITE_API_SECRET_KEY`) as the bearer, and throws `ApiError`.
- Frontend: Vitest component tests sit beside components in src/. Playwright specs live in e2e/. ESLint must stay green (the platform gates on `npm run lint`), and Prettier handles formatting.
<!-- sdlc:auto:end conventions -->

<!-- sdlc:auto:start testing -->
| Name | Command | Description |
|---|---|---|
| backend tests | `cd backend && pytest` | Runs the pytest suite in backend/tests (health and auth integration/security tests). |
| backend lint | `cd backend && ruff check .` | Lints the backend with ruff. |
| backend format | `cd backend && ruff format .` | Formats the backend with ruff. |
| frontend unit | `cd frontend && npm test` | Runs Vitest component tests under src/ in jsdom. |
| frontend lint | `cd frontend && npm run lint` | Runs ESLint over the app (`npm run lint:fix` to auto-fix). |
| frontend format check | `cd frontend && npm run format:check` | Checks Prettier formatting (`npm run format` to write). |
| e2e install | `cd frontend && npm run test:e2e:install` | Installs Playwright's Chromium browser. |
| e2e | `cd frontend && npm run test:e2e` | Runs the Playwright specs in e2e/. Without E2E_BASE_URL it migrates and boots the backend from backend/.venv on port 8000, builds and previews the frontend on port 4173, then tests against them. With E2E_BASE_URL set it tests that deployed URL. |
<!-- sdlc:auto:end testing -->

<!-- sdlc:auto:start troubleshooting -->
| Problem | Solution |
|---|---|
| The backend fails on startup with a missing 'users' table (or similar) error. | The schema is never created automatically, and startup seeds an admin user. Run `alembic upgrade head` in backend/ against the same DATABASE_URL before starting uvicorn. |
| `pytest` cannot `import app`. | Run pytest from inside backend/, where pytest.ini sets `pythonpath = .`. |
| The browser blocks API calls with a CORS error. | By default only http://localhost:5173 and http://127.0.0.1:5173 are allowed. Use the Vite dev server on that port, or set `ALLOWED_ORIGINS` (comma-separated) to your frontend's origin. |
| Playwright e2e fails to start the backend web server. | The config runs `.venv/bin/alembic` and `.venv/bin/python` from backend/. Create the venv at backend/.venv and install requirements.txt into it, and run `npm run test:e2e:install` for Chromium. |
| The deployed frontend calls localhost, or `npm run build` passes but `npm run typecheck` fails. | VITE_API_BASE_URL is inlined at build time, so set it before `npm run build`. The build does not typecheck; fix tsc errors (often untyped `useState({})`) with `npm run typecheck`. |
| Screens show sample data even though the backend is running. | This is expected. The generated screens still use seeded data, so wire each one to the API via `apiFetch` in src/lib/api.ts. |
| The deploy workflow contains a hard-coded API secret value in plain text. | .github/workflows/deploy.yml sets `VITE_API_SECRET_KEY` and `NEXT_PUBLIC_API_SECRET_KEY` as literals, and they are baked into the public bundle. Treat that value as exposed. Rotate it, and move it to a GitHub secret or remove it from the build env. |
<!-- sdlc:auto:end troubleshooting -->
