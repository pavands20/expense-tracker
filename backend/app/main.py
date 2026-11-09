"""Application entrypoint.

Generated from the approved architecture: one router per component that owns
endpoints, one route per endpoint the API spec declares. Every generated route
is a stub that returns a typed placeholder, so the service starts, serves its
OpenAPI document and passes its tests before a single handler is implemented.
"""

import logging
import os
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app import models  # noqa: F401 -- imported so the tables register before create_all
from app.database import SessionLocal
from app.routers import auth
from app.security import RedactFilter, seed_admin

for _name in ("", "uvicorn", "uvicorn.error", "uvicorn.access"):
    logging.getLogger(_name).addFilter(RedactFilter())


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """Startup hook. The schema is changed only through Alembic migrations
    (`alembic upgrade head`, run before the server starts), never created here.

    This runs on startup and not at import, so importing the application never opens a
    connection and a test can point `get_db` at a database of its own.
    """
    with SessionLocal() as db:
        seed_admin(db)
    yield


app = FastAPI(
    title="Expense Tracker",
    description="ExpenseTrack handles employee expense claims for a 5\u201350 person company.\n\nRoles: Employee, Manager, Finance. No self sign-up \u2014 Finance creates accounts and assigns each employee a manager.\n\nSign-in: email and password, sign-out, and password reset by email.\n\nClaims: an employee creates a claim with one or more lines (date, category, amount in GBP, description), attaches a receipt image or PDF per line (up to 5 MB), and submits it. A draft can be edited; a submitted claim cannot.\n\nApproval: a manager approves or rejects their direct reports' submitted claims with a comment. Finance then approves or rejects manager-approved claims and marks approved ones paid. Nobody can approve their own claim.\n\nCategories: Finance manages categories (Travel, Meals, Equipment, Other), each with an optional per-line limit. Lines over the limit are flagged for the approver.\n\nDashboard: employees see their claims by status. Finance sees totals by category and month, and can export approved claims as CSV.\n\nOut of scope: currency conversion, mileage, card feeds, accounting integrations.\n\nStack: React, FastAPI, PostgreSQL, S3 for receipts, on AWS. English only,",
    version="0.1.0",
    lifespan=lifespan,
)

# The SPA runs on a different origin than the API, so the browser refuses its calls
# unless that origin is allowed here. In development that is the Vite dev server; when
# deployed, the platform injects the frontend's real URL as ALLOWED_ORIGINS (comma
# separated). Point ALLOWED_ORIGINS at the real thing and nothing else has to change.
_dev_origins = ["http://localhost:5173", "http://127.0.0.1:5173"]
_allowed_origins = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "").split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins or _dev_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health() -> dict[str, str]:
    """Liveness probe, and the only route here that is not a stub."""
    return {"status": "ok"}


app.include_router(auth.router)


@app.exception_handler(RequestValidationError)
async def validation_error(request: Request, exc: RequestValidationError) -> JSONResponse:
    """422 without echoing the submitted input (it may hold a password)."""
    errors = [{k: v for k, v in e.items() if k not in ("input", "ctx")} for e in exc.errors()]
    return JSONResponse(status_code=422, content={"detail": jsonable_encoder(errors)})
