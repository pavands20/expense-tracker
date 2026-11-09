"""US-001 security checks: AC-001..AC-009, NFR-001..003."""

import logging
import uuid
from datetime import UTC, datetime, timedelta

import pytest
from fastapi.routing import APIRoute
from sqlalchemy import select

from app.main import app
from app.models import Session, User
from app.security import hash_password, hash_token

PW = "pw12345678"
PUBLIC = {"/health", "/auth/login"}


def make_user(db, email="q@example.com", password=PW, active=True):
    u = User(
        email=email,
        full_name="Q",
        role="Employee",
        password_hash=hash_password(password),
        is_active=active,
    )
    db.add(u)
    db.commit()
    return u


def login(client, email="q@example.com", password=PW):
    return client.post("/auth/login", json={"email": email, "password": password})


def bearer(t):
    return {"Authorization": f"Bearer {t}"}


def test_ac001_login_returns_token_and_me_works(client, db_session):
    make_user(db_session)
    r = login(client)
    assert r.status_code == 200 and r.json()["token"]
    me = client.get("/auth/me", headers=bearer(r.json()["token"]))
    assert me.status_code == 200 and me.json()["email"] == "q@example.com"


def test_ac002_failures_byte_identical(client, db_session):
    make_user(db_session)
    make_user(db_session, "off@example.com", active=False)
    bodies = [
        login(client, password="wrong-password"),
        login(client, email="nobody@example.com"),
        login(client, email="off@example.com"),
    ]
    assert all(r.status_code == 401 for r in bodies)
    assert len({r.content for r in bodies}) == 1


def _non_public_routes():
    out = []
    for r in app.routes:
        if isinstance(r, APIRoute) and r.path not in PUBLIC:
            for m in r.methods - {"HEAD", "OPTIONS"}:
                out.append((m, r.path))
    return out


def test_ac003_nfr002_every_non_public_endpoint_requires_auth(client):
    routes = _non_public_routes()
    assert routes
    for method, path in routes:
        url = path
        for seg in [s for s in path.split("/") if s.startswith("{")]:
            url = url.replace(seg, str(uuid.uuid4()))
        for headers in ({}, bearer("garbage-token")):
            r = client.request(method, url, headers=headers)
            assert r.status_code == 401, (method, path, headers, r.status_code)


def test_ac004_no_register_route(client):
    paths = client.get("/openapi.json").json()["paths"]
    bad = [
        p for p in paths if any(k in p.lower() for k in ("regist", "sign-up", "signup", "sign_up"))
    ]
    assert bad == []


def test_ac005_logout_ends_session(client, db_session):
    make_user(db_session)
    t = login(client).json()["token"]
    assert client.post("/auth/logout", headers=bearer(t)).status_code == 204
    assert client.get("/auth/me", headers=bearer(t)).status_code == 401


def test_ac006_nfr001_expired_session_refused(client, db_session):
    make_user(db_session)
    t = login(client).json()["token"]
    s = db_session.scalar(select(Session))
    s.expires_at = datetime.now(UTC) - timedelta(minutes=1)
    db_session.commit()
    assert client.get("/auth/me", headers=bearer(t)).status_code == 401


def test_ac007_nfr001_deactivation_refuses_and_revokes(client, db_session):
    u = make_user(db_session)
    t = login(client).json()["token"]
    u.is_active = False
    db_session.commit()
    assert client.get("/auth/me", headers=bearer(t)).status_code == 401
    rows = db_session.scalars(select(Session)).all()
    assert rows and all(s.revoked_at is not None for s in rows)
    assert login(client).status_code == 401


def test_ac008_password_hashes_argon2_and_salted(client, db_session):
    a = make_user(db_session, "a1@example.com")
    b = make_user(db_session, "b1@example.com")
    for u in (a, b):
        assert u.password_hash.startswith("$argon2")
        assert u.password_hash != PW
    assert a.password_hash != b.password_hash


def test_ac008_session_token_stored_hashed(client, db_session):
    make_user(db_session)
    t = login(client).json()["token"]
    for s in db_session.scalars(select(Session)):
        assert s.token_hash != t
        assert s.token_hash == hash_token(t)


def test_ac009_nfr003_no_secrets_in_auth_responses(client, db_session):
    make_user(db_session)
    responses = [
        login(client),
        login(client, password="wrong"),
        client.post("/auth/login", json={"email": "bad", "password": PW}),
    ]
    t = responses[0].json()["token"]
    responses.append(client.get("/auth/me", headers=bearer(t)))
    for r in responses:
        assert "password_hash" not in r.text
        assert PW not in r.text
        assert '"password"' not in r.text
        assert "$argon2" not in r.text


def test_ac009_nfr003_logs_contain_no_password_or_token(client, db_session, caplog):
    make_user(db_session)
    with caplog.at_level(logging.DEBUG):
        r = login(client)
        t = r.json()["token"]
        client.get("/auth/me", headers=bearer(t))
        login(client, password="another-wrong-pw")
    assert PW not in caplog.text
    assert "another-wrong-pw" not in caplog.text
    assert t not in caplog.text


@pytest.mark.parametrize("email", ["", "not-an-email"])
def test_ac002_malformed_email_rejected_without_echo(client, email):
    r = client.post("/auth/login", json={"email": email, "password": "secret-xyz"})
    assert r.status_code in (401, 422)
    assert "secret-xyz" not in r.text
