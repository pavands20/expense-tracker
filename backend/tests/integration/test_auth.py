import logging
from datetime import UTC, datetime, timedelta

import pytest
from fastapi import Depends
from sqlalchemy import select

from app import config
from app.main import app
from app.models import Session, User
from app.security import (
    RedactFilter,
    hash_password,
    hash_token,
    require_role,
    revoke_user_sessions,
    seed_admin,
)

GENERIC = {"detail": "Invalid email or password"}


@pytest.fixture
def user(db_session):
    u = User(
        email="a@example.com",
        full_name="A",
        role="Finance",
        password_hash=hash_password("pw12345678"),
        is_active=True,
    )
    db_session.add(u)
    db_session.commit()
    return u


def login(client, email="a@example.com", password="pw12345678"):
    return client.post("/auth/login", json={"email": email, "password": password})


def auth(token):
    return {"Authorization": f"Bearer {token}"}


def test_ac001_login_and_me(client, user):
    r = login(client)
    assert r.status_code == 200
    body = r.json()
    assert body["token_type"] == "bearer"
    assert set(body["user"]) == {"id", "full_name", "email", "role", "manager_id", "is_active"}
    assert client.get("/auth/me", headers=auth(body["token"])).json()["email"] == "a@example.com"


def test_ac002_generic_failures(client, user, db_session):
    assert login(client, password="wrong").json() == GENERIC
    assert login(client, email="x@example.com").json() == GENERIC
    user.is_active = False
    db_session.commit()
    r = login(client)
    assert r.status_code == 401 and r.json() == GENERIC


def test_ac003_requires_token(client):
    assert client.get("/auth/me").status_code == 401
    assert client.post("/auth/logout").status_code == 401
    assert client.get("/auth/me", headers=auth("junk")).status_code == 401


def test_ac004_no_register(client):
    paths = client.get("/openapi.json").json()["paths"]
    assert not [p for p in paths if "regist" in p or "sign-up" in p or "signup" in p]


def test_ac005_logout_revokes(client, user):
    t = login(client).json()["token"]
    assert client.post("/auth/logout", headers=auth(t)).status_code == 204
    assert client.get("/auth/me", headers=auth(t)).status_code == 401


def test_ac006_expired(client, user, db_session):
    t = login(client).json()["token"]
    s = db_session.scalar(select(Session))
    s.expires_at = datetime.now(UTC) - timedelta(seconds=1)
    db_session.commit()
    assert client.get("/auth/me", headers=auth(t)).status_code == 401


def test_ac007_deactivated(client, user, db_session):
    t = login(client).json()["token"]
    user.is_active = False
    db_session.commit()
    assert client.get("/auth/me", headers=auth(t)).status_code == 401
    assert all(s.revoked_at for s in db_session.scalars(select(Session)))


def test_ac007_revoke_user_sessions_helper(client, user, db_session):
    t = login(client).json()["token"]
    revoke_user_sessions(db_session, user.id)
    assert client.get("/auth/me", headers=auth(t)).status_code == 401


def test_ac008_hashes_only(client, user, db_session):
    t = login(client).json()["token"]
    assert user.password_hash.startswith("$argon2")
    assert "pw12345678" not in user.password_hash
    s = db_session.scalar(select(Session))
    assert s.token_hash == hash_token(t) and s.token_hash != t


def test_ac009_no_secrets_in_responses(client, user):
    r = client.post("/auth/login", json={"email": "bad", "password": "secretpw"})
    assert r.status_code == 422 and "secretpw" not in r.text
    assert "password_hash" not in login(client).text


def test_ac009_log_redaction():
    rec = logging.LogRecord("x", logging.INFO, "", 0, 'body {"password": "hunter2"}', None, None)
    RedactFilter().filter(rec)
    assert "hunter2" not in rec.msg


def test_require_role_403(client, user):
    manager_only = Depends(require_role("Manager"))
    app.add_api_route("/_t", lambda u=manager_only: 1)
    t = login(client).json()["token"]
    assert client.get("/_t", headers=auth(t)).status_code == 403
    assert client.get("/_t").status_code == 401


def test_seed_admin_idempotent(db_session, monkeypatch):
    monkeypatch.setattr(config, "SEED_ADMIN_EMAIL", "Boss@Example.com")
    monkeypatch.setattr(config, "SEED_ADMIN_PASSWORD", "pw12345678")
    seed_admin(db_session)
    seed_admin(db_session)
    users = db_session.scalars(select(User)).all()
    assert len(users) == 1 and users[0].role == "Finance" and users[0].manager_id is None
