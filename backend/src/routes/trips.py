# backend/src/routes/trips.py
from pydantic import BaseModel, EmailStr
from datetime import date, datetime
from fastapi import APIRouter, HTTPException
from src.services.photo_service import get_city_photo
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

# ===== MOCK DATA FOR LOCAL DEVELOPMENT =====
MOCK_TRIPS = {}
NEXT_TRIP_ID = 1

class TripCreateRequest(BaseModel):
    userEmail: EmailStr
    destination: str
    budgetLimit: float
    startDate: date
    endDate: date

@router.post("/")
async def create_trip(data: TripCreateRequest):
    """Create a new trip"""
    global NEXT_TRIP_ID
    
    # Fetch the photo
    photo_url = await get_city_photo(data.destination)

    # Create the Trip
    trip_id = NEXT_TRIP_ID
    NEXT_TRIP_ID += 1
    
    new_trip = {
        'id': trip_id,
        'destination': data.destination,
        'budgetLimit': data.budgetLimit,
        'startDate': datetime.combine(data.startDate, datetime.min.time()),
        'endDate': datetime.combine(data.endDate, datetime.min.time()),
        'photoUrl': photo_url,
        'userEmail': data.userEmail,
        'totalSpent': 0.0,
        'createdAt': datetime.now()
    }
    
    MOCK_TRIPS[trip_id] = new_trip
    return new_trip

@router.get("/user/{user_email}")
async def get_user_trips(user_email: str):
    """Get all trips for a user"""
    user_trips = [trip for trip in MOCK_TRIPS.values() if trip['userEmail'] == user_email]
    return user_trips

@router.get("/details/{trip_id}")
async def get_trip_details(trip_id: int):
    """Get trip details"""
    trip = MOCK_TRIPS.get(trip_id)
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    return {
        "destination": trip['destination'],
        "image": trip['photoUrl'],
        "price": trip['budgetLimit'],
        "date": trip['startDate'].strftime("%m/%d/%Y") if trip['startDate'] else "TBD"
    }
