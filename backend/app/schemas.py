"""Pydantic request and response models. Never include password_hash."""

import uuid
from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    full_name: str
    email: str
    role: Literal["Employee", "Manager", "Finance"]
    manager_id: uuid.UUID | None
    is_active: bool


class LoginResponse(BaseModel):
    token: str
    token_type: Literal["bearer"] = "bearer"
    expires_at: datetime
    user: UserOut
