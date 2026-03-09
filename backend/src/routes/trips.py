from fastapi import APIRouter, HTTPException
from src.database import db
from pydantic import BaseModel
from datetime import date
from typing import Optional
from src.services.photo_service import get_city_photo
router = APIRouter()

# Schema for Trip Creation
class TripCreateRequest(BaseModel):
    userId: int
    destination: str
    budgetLimit: float
    startDate: date
    endDate: date

# backend/src/routes/trips.py

# backend/src/routes/trips.py

@router.post("/")
async def create_trip(data: TripCreateRequest):
    # Ensure the photo service is imported and working
    photo_url = await get_city_photo(data.destination)
    
    # Helper to convert date to full ISO-8601 DateTime string
    def to_iso_datetime(d):
        return f"{d.isoformat()}T00:00:00Z"

    new_trip = await db.trip.create(
        data={
            'destination': data.destination,
            'budgetLimit': data.budgetLimit,
            'startDate': to_iso_datetime(data.startDate),
            'endDate': to_iso_datetime(data.endDate),
            'photoUrl': photo_url,
            # Fix: Connect to the user relation instead of just passing userId
            'user': {
                'connect': {
                    'id': data.userId
                }
            }
        }
    )
    return new_trip
@router.get("/details/{trip_id}")
async def get_trip_details(trip_id: int):
    trip = await db.trip.find_unique(where={'id': trip_id})
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    return {
        "destination": trip.destination,
        "image": trip.photoUrl,
        "price": trip.budgetLimit,
        "date": trip.startDate.strftime("%m/%d/%Y") if trip.startDate else "TBD"
    }

@router.get("/user/{user_id}")
async def get_user_trips(user_id: int):
    return await db.trip.find_many(where={'userId': user_id})