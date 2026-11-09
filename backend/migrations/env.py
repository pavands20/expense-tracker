"""Alembic environment: schema changes go through migrations only.

The URL is `DATABASE_URL` (via app.database), and the target metadata is the
application's own `Base`, so `alembic revision --autogenerate` sees every model
registered in `app.models`.
"""

from alembic import context
from sqlalchemy import engine_from_config, pool

from app import models  # noqa: F401 -- registers the tables on Base.metadata
from app.database import DATABASE_URL, Base

config = context.config
target_metadata = Base.metadata


def run_migrations_offline() -> None:
    context.configure(
        url=DATABASE_URL,
        target_metadata=target_metadata,
        literal_binds=True,
        compare_type=True,
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    section = config.get_section(config.config_ini_section) or {}
    section["sqlalchemy.url"] = DATABASE_URL
    connectable = engine_from_config(section, prefix="sqlalchemy.", poolclass=pool.NullPool)
    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata, compare_type=True)
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
