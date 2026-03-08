# backend/seed.py
import asyncio
from backend.src.database import db

async def seed():
    await db.connect()
    
    # 1. Create a dummy user
    user = await db.user.upsert(
        where={'email': 'testuser@gmail.com'},
        data={
            'create': {
                'googleId': '12345',
                'email': 'testuser@gmail.com',
                'fullName': 'Test Traveler',
            },
            'update': {}
        }
    )
    
    # 2. Create a dummy trip for this user
    await db.trip.create(
        data={
            'userId': user.id,
            'destination': 'Paris, France',
            'budgetLimit': 2000.0,
            'startDate': '2026-06-01T00:00:00Z',
            'endDate': '2026-06-07T00:00:00Z',
        }
    )
    
    print("✅ Database Seeded with a Test Trip!")
    await db.disconnect()

if __name__ == "__main__":
    asyncio.run(seed())