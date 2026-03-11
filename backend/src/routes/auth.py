from fastapi import APIRouter, HTTPException
from src.database import db
from pydantic import BaseModel, EmailStr
from typing import Optional

router = APIRouter()

class GoogleAuthSchema(BaseModel):
    email: EmailStr
    name: str
    image: Optional[str] = None
    googleId: str

@router.post("/google")
async def google_auth(data: GoogleAuthSchema):
    try:
        user = await db.user.upsert(
            where={"email": data.email},
            data={
                "create": {
                    "email": data.email,
                    "fullName": data.name,
                    "profilePic": data.image,
                    "googleId": data.googleId,
                },
                "update": {
                    "fullName": data.name,
                    "profilePic": data.image,
                }
            }
        )
        return {"status": "success", "user_id": user.id}
    except Exception as e:
        print(f"Database Error: {e}")
        # ✅ Fix 3: return actual error message so you can debug
        raise HTTPException(status_code=500, detail=str(e))
# backend/src/routes/auth.py

@router.post("/preferences")
async def save_preferences(data: dict):
    # Find user by email first to get the ID
    user = await db.user.find_unique(where={"email": data["email"]})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Save preferences to the UserPreference table
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