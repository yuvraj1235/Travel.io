from fastapi import APIRouter, HTTPException
from src.database import db

router = APIRouter()

@app.post("/google")
async def google_auth(data: dict):
    # 'data' comes from NextAuth on the frontend
    user = await db.user.upsert(
        where={'googleId': data['googleId']},
        data={
            'create': {
                'googleId': data['googleId'],
                'email': data['email'],
                'fullName': data['name'],
                'profilePic': data['image']
            },
            'update': {
                'fullName': data['name'],
                'profilePic': data['image']
            }
        }
    )
    return user