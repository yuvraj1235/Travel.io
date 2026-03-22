from prisma import Prisma
import os

db = Prisma()

async def connect_db():
    """Connect to database"""
    try:
        if not db.is_connected():
            await db.connect()
        print("✅ Database connected")
    except Exception as e:
        print(f"⚠️  Database connection warning: {e}")
        print("   This is OK for local development with mock data")

async def disconnect_db():
    """Disconnect from database"""
    if db.is_connected():
        await db.disconnect()
