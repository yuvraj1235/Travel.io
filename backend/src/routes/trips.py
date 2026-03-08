# backend/src/routes/trips.py
from fastapi import APIRouter
from src.database import db
from src.schemas.request_models import TripCreateRequest
from src.services.google_api import get_destination_photo

router = APIRouter()

@router.post("/")
async def create_trip(data: TripCreateRequest):
    # Automatically get a photo for the trip card
    photo_url = await get_destination_photo(data.destination)
    
    new_trip = await db.trip.create(
        data={
            'userId': data.userId,
            'destination': data.destination,
            'budgetLimit': data.budgetLimit,
            'startDate': data.startDate,
            'endDate': data.endDate,
            'photoUrl': photo_url # Make sure to add this to your Prisma schema!
        }
    )
    return new_trip