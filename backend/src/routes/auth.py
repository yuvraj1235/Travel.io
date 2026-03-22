from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional
import bcrypt

router = APIRouter()

# ===== MOCK DATA FOR LOCAL DEVELOPMENT =====
# In production, this will be stored in database
MOCK_USERS = {
    "test@example.com": {
        "id": 1,
        "email": "test@example.com",
        "password": bcrypt.hashpw(b"password123", bcrypt.gensalt()).decode(),
        "fullName": "Test User"
    }
}

MOCK_PREFERENCES = {}

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
# 🔐 HELPER FUNCTIONS
# =========================

def hash_password(password: str):
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

def verify_password(plain, hashed):
    try:
        return bcrypt.checkpw(plain.encode(), hashed.encode())
    except:
        return False

# =========================
# 🔐 SIGNUP (EMAIL)
# =========================

@router.post("/signup")
async def signup(data: SignupSchema):
    """Register a new user"""
    
    # Check if user already exists
    if data.email in MOCK_USERS:
        raise HTTPException(status_code=400, detail="User already exists")

    # Create new user
    new_id = len(MOCK_USERS) + 1
    hashed_password = hash_password(data.password)
    
    MOCK_USERS[data.email] = {
        "id": new_id,
        "email": data.email,
        "password": hashed_password,
        "fullName": data.email.split("@")[0]
    }

    return {
        "message": "Signup successful",
        "user_id": new_id
    }

# =========================
# 🔐 LOGIN (EMAIL)
# =========================

@router.post("/login")
async def login(data: LoginSchema):
    """Login with email and password"""
    
    user = MOCK_USERS.get(data.email)
    
    if not user:
        raise HTTPException(status_code=400, detail="User not found. Try signing up!")

    if not verify_password(data.password, user["password"]):
        raise HTTPException(status_code=400, detail="Invalid password")

    return {
        "message": "Login successful",
        "user_id": user["id"],
        "email": user["email"]
    }

# =========================
# 🔐 GOOGLE LOGIN
# =========================

@router.post("/google")
async def google_auth(data: GoogleAuthSchema):
    """Google OAuth - creates or updates user"""
    
    user = MOCK_USERS.get(data.email)

    if not user:
        # Create new user from Google
        new_id = len(MOCK_USERS) + 1
        MOCK_USERS[data.email] = {
            "id": new_id,
            "email": data.email,
            "password": None,  # Google auth users have no password
            "fullName": data.name
        }
        return {
            "status": "success",
            "user_id": new_id,
            "message": "New user created via Google"
        }
    
    return {
        "status": "success",
        "user_id": user["id"],
        "message": "Logged in via Google"
    }

# =========================
# ⚙️ USER PREFERENCES
# =========================

@router.post("/preferences")
async def save_preferences(email: str, data: dict):
    """Save user preferences"""
    
    if email not in MOCK_USERS:
        raise HTTPException(status_code=404, detail="User not found")

    MOCK_PREFERENCES[email] = {
        "preferredClimate": data.get("climate"),
        "budgetLevel": data.get("budget"),
        "activities": data.get("activities", [])
    }

    return {"message": "Preferences saved successfully"}

@router.get("/preferences/{email}")
async def get_preferences(email: str):
    """Get user preferences"""
    
    prefs = MOCK_PREFERENCES.get(email, {})
    return prefs or {"message": "No preferences set yet"}
