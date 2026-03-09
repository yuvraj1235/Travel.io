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