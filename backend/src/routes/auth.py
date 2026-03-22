from fastapi import APIRouter, HTTPException
from src.database import db
from pydantic import BaseModel, EmailStr
from typing import Optional
import hashlib

router = APIRouter()


# =========================
# 🔐 SCHEMAS
# =========================

class SignupSchema(BaseModel):
    email: EmailStr
    password: str


class LoginSchema(BaseModel):
    email: EmailStr
    password: str


class GoogleAuthSchema(BaseModel):
    email: EmailStr
    name: str
    image: Optional[str] = None
    googleId: str


# =========================
# 🔐 HELPER FUNCTIONS (NO BCRYPT)
# =========================

def hash_password(password: str):
    return hashlib.sha256(password.encode()).hexdigest()


def verify_password(plain, hashed):
    return hashlib.sha256(plain.encode()).hexdigest() == hashed


# =========================
# 🔐 SIGNUP (EMAIL)
# =========================

@router.post("/signup")
async def signup(data: SignupSchema):
    existing_user = await db.user.find_unique(where={"email": data.email})

    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = hash_password(data.password)

    user = await db.user.create(
        data={
            "email": data.email,
            "password": hashed_password,
        }
    )

    return {
        "message": "Signup successful",
        "user_id": user.id
    }


# =========================
# 🔐 LOGIN (EMAIL)
# =========================

@router.post("/login")
async def login(data: LoginSchema):
    user = await db.user.find_unique(where={"email": data.email})

    if not user:
        raise HTTPException(status_code=400, detail="User not found")

    if not user.password:
        raise HTTPException(status_code=400, detail="Use Google login")

    if not verify_password(data.password, user.password):
        raise HTTPException(status_code=400, detail="Invalid password")

    return {
        "message": "Login successful",
        "user_id": user.id
    }


# =========================
# 🔐 GOOGLE LOGIN (UNCHANGED)
# =========================

@router.post("/google")
async def google_auth(data: GoogleAuthSchema):
    user = await db.user.find_unique(where={"email": data.email})

    if not user:
        raise HTTPException(
            status_code=400,
            detail="User not registered. Please signup first."
        )

    return {
        "status": "success",
        "user_id": user.id
    }


# =========================
# ⚙️ USER PREFERENCES
# =========================

@router.post("/preferences")
async def save_preferences(data: dict):
    user = await db.user.find_unique(where={"email": data["email"]})

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    prefs = await db.userpreference.upsert(
        where={"userId": user.id},
        data={
            "create": {
                "userId": user.id,
                "preferredClimate": data["climate"],
                "budgetLevel": data["budget"],
                "activities": data["activities"]
            },
            "update": {
                "preferredClimate": data["climate"],
                "budgetLevel": data["budget"],
                "activities": data["activities"]
            }
        }
    )

    return {"message": "Preferences saved successfully"}