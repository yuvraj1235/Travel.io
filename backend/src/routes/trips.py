# backend/src/routes/trips.py
from pydantic import BaseModel, EmailStr
from datetime import date, datetime
from fastapi import APIRouter, HTTPException
from src.database import db
from src.services.photo_service import get_city_photo

router = APIRouter()

class TripCreateRequest(BaseModel):
    userEmail: EmailStr
    destination: str
    budgetLimit: float
    startDate: date
    endDate: date

@router.post("/")
async def create_trip(data: TripCreateRequest):
    # 1. Find the real User ID based on the email from the session
    user = await db.user.find_unique(where={'email': data.userEmail})
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found. Please log in again.")

    # 2. Fetch the photo (ensure your service returns a string URL)
    photo_url = await get_city_photo(data.destination)

    # 3. Create the Trip linked to the User
    # Note: We convert date to datetime objects for Prisma compatibility
    new_trip = await db.trip.create(
        data={
            'destination': data.destination,
            'budgetLimit': data.budgetLimit,
            'startDate': datetime.combine(data.startDate, datetime.min.time()),
            'endDate': datetime.combine(data.endDate, datetime.min.time()),
            'photoUrl': photo_url,
            'user': {
                'connect': {
                    'id': user.id 
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