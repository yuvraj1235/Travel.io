from fastapi import APIRouter
from src.database import db
from pydantic import BaseModel

router = APIRouter()

@router.get("/{trip_id}")
async def get_itinerary(trip_id: int):
    return await db.itineraryitem.find_many(
        where={'tripId': trip_id},
        order={'startTime': 'asc'}
    )

@router.post("/")
async def add_activity(data: dict):
    return await db.itineraryitem.create(
        data={
            'tripId': int(data['tripId']),
            'title': data['title'],
            'itemType': data['type'],
            'cost': float(data.get('cost', 0))
        }
    )