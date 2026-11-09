"""Sign-in, sign-out and current user."""

from datetime import UTC, datetime

from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy import select
from sqlalchemy.orm import Session as DbSession

from app.database import get_db
from app.models import Session, User
from app.schemas import LoginRequest, LoginResponse, UserOut
from app.security import (
    DUMMY_HASH,
    create_session,
    get_current_session,
    get_current_user,
    verify_password,
)

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=LoginResponse)
def login(body: LoginRequest, db: DbSession = Depends(get_db)) -> LoginResponse:
    user = db.scalar(select(User).where(User.email == body.email.strip().lower()))
    ok = verify_password(user.password_hash if user else DUMMY_HASH, body.password)
    if user is None or not ok or not user.is_active:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token, row = create_session(db, user)
    return LoginResponse(token=token, expires_at=row.expires_at, user=UserOut.model_validate(user))


@router.post("/logout", status_code=204)
def logout(
    pair: tuple[User, Session] = Depends(get_current_session), db: DbSession = Depends(get_db)
) -> Response:
    pair[1].revoked_at = datetime.now(UTC)
    db.add(pair[1])
    db.commit()
    return Response(status_code=204)


@router.get("/me", response_model=UserOut)
def me(user: User = Depends(get_current_user)) -> User:
    return user
