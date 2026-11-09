"""Password hashing, opaque session tokens, auth dependencies, log redaction."""

import hashlib
import logging
import re
import secrets
from collections.abc import Callable
from datetime import UTC, datetime, timedelta

from argon2 import PasswordHasher
from argon2.exceptions import InvalidHashError, VerificationError
from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy import select, update
from sqlalchemy.orm import Session as DbSession

from app import config
from app.database import get_db
from app.models import Session, User

_hasher = PasswordHasher()
_bearer = HTTPBearer(auto_error=False)
DUMMY_HASH = _hasher.hash("not-a-real-password")


def hash_password(password: str) -> str:
    return _hasher.hash(password)


def verify_password(password_hash: str, password: str) -> bool:
    try:
        return _hasher.verify(password_hash, password)
    except (VerificationError, InvalidHashError):
        return False


def hash_token(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()


def _aware(dt: datetime) -> datetime:
    return dt if dt.tzinfo else dt.replace(tzinfo=UTC)


def create_session(db: DbSession, user: User) -> tuple[str, Session]:
    token = secrets.token_urlsafe(32)
    now = datetime.now(UTC)
    row = Session(
        user_id=user.id,
        token_hash=hash_token(token),
        created_at=now,
        last_seen_at=now,
        expires_at=now + timedelta(minutes=config.SESSION_LIFETIME_MINUTES),
    )
    db.add(row)
    db.commit()
    return token, row


def revoke_user_sessions(db: DbSession, user_id) -> None:
    """End every live session of a user (used on deactivation)."""
    db.execute(
        update(Session)
        .where(Session.user_id == user_id, Session.revoked_at.is_(None))
        .values(revoked_at=datetime.now(UTC))
    )
    db.commit()


def _unauthorized() -> HTTPException:
    return HTTPException(status_code=401, detail="Not authenticated")


def get_current_session(
    creds: HTTPAuthorizationCredentials | None = Depends(_bearer),
    db: DbSession = Depends(get_db),
) -> tuple[User, Session]:
    if creds is None or not creds.credentials:
        raise _unauthorized()
    row = db.scalar(select(Session).where(Session.token_hash == hash_token(creds.credentials)))
    if row is None or row.revoked_at is not None:
        raise _unauthorized()
    now = datetime.now(UTC)
    if _aware(row.expires_at) <= now:
        raise _unauthorized()
    user = db.get(User, row.user_id)
    if user is None:
        raise _unauthorized()
    if not user.is_active:
        revoke_user_sessions(db, user.id)
        raise _unauthorized()
    row.last_seen_at = now
    db.commit()
    return user, row


def get_current_user(pair: tuple[User, Session] = Depends(get_current_session)) -> User:
    return pair[0]


def require_role(*roles: str) -> Callable[..., User]:
    def dependency(user: User = Depends(get_current_user)) -> User:
        if user.role not in roles:
            raise HTTPException(status_code=403, detail="Forbidden")
        return user

    return dependency


def seed_admin(db: DbSession) -> None:
    email, password = config.SEED_ADMIN_EMAIL, config.SEED_ADMIN_PASSWORD
    if not email or not password:
        return
    email = email.strip().lower()
    if db.scalar(select(User).where(User.email == email)):
        return
    db.add(
        User(
            email=email,
            full_name="Finance Admin",
            role="Finance",
            manager_id=None,
            password_hash=hash_password(password),
            is_active=True,
        )
    )
    db.commit()


_SENSITIVE = re.compile(
    r"""(["']?(?:password|new_password|token|password_hash|authorization)["']?\s*[:=]\s*)"""
    r"""(?:"[^"]*"|'[^']*'|(?:Bearer\s+)?[^\s,&}]+)""",
    re.IGNORECASE,
)


class RedactFilter(logging.Filter):
    def filter(self, record: logging.LogRecord) -> bool:
        record.msg = _SENSITIVE.sub(r"\1[redacted]", record.getMessage())
        record.args = None
        return True
