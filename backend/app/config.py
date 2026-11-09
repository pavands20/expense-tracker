"""Settings the platform provides, each read with a working local default."""

import os

# The frontend's origin(s) for CORS, comma separated.
ALLOWED_ORIGINS: list[str] = [
    o.strip() for o in os.getenv("ALLOWED_ORIGINS", "").split(",") if o.strip()
]

# Shared API bearer the generated frontend sends. It is public: never sign anything with it.
SECRET_KEY: str = os.getenv("SECRET_KEY", "dev-shared-bearer")

# Private. Signs anything that must not be forgeable.
JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "dev-only-private-key")

# Writable directory that survives redeploys; receipts live here when S3_BUCKET is unset.
MEDIA_ROOT: str = os.getenv("MEDIA_ROOT", "./media")

# Receipt storage: S3 when S3_BUCKET is set, MEDIA_ROOT otherwise.
S3_BUCKET: str | None = os.getenv("S3_BUCKET") or None
AWS_REGION: str | None = os.getenv("AWS_REGION") or None

# First Finance user, seeded on startup only when both are set.
BOOTSTRAP_ADMIN_EMAIL: str | None = os.getenv("BOOTSTRAP_ADMIN_EMAIL") or None
BOOTSTRAP_ADMIN_PASSWORD: str | None = os.getenv("BOOTSTRAP_ADMIN_PASSWORD") or None

# Session lifetime in minutes.
SESSION_LIFETIME_MINUTES: int = int(os.getenv("SESSION_LIFETIME_MINUTES", "480"))

# Initial Finance admin (falls back to the platform's BOOTSTRAP_ADMIN_* names).
SEED_ADMIN_EMAIL: str | None = os.getenv("SEED_ADMIN_EMAIL") or BOOTSTRAP_ADMIN_EMAIL
SEED_ADMIN_PASSWORD: str | None = os.getenv("SEED_ADMIN_PASSWORD") or BOOTSTRAP_ADMIN_PASSWORD

# Password-reset email (SES via SMTP).
SMTP_HOST: str | None = os.getenv("SMTP_HOST") or None
SMTP_PORT: int = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER: str | None = os.getenv("SMTP_USER") or None
SMTP_PASSWORD: str | None = os.getenv("SMTP_PASSWORD") or None
SMTP_FROM: str | None = os.getenv("SMTP_FROM") or None
