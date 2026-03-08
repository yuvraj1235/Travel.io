from fastapi import APIRouter
from src.database import db

router = APIRouter()

@router.post("/google")
async def google_auth(data: dict):

    user = await db.user.find_unique(
        where={"email": data["email"]}
    )
