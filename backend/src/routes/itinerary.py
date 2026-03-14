from fastapi import APIRouter, HTTPException
from prisma import Prisma
from pydantic import BaseModel, Field
from typing import Optional

router = APIRouter()
db = Prisma()


class ItineraryCreate(BaseModel):
    tripId: int
    title: str
    itemType: str = Field(..., alias="itemType")
    cost: Optional[float] = 0.0

    class Config:
        populate_by_name = True


@router.post("/item")
async def add_itinerary_item(data: ItineraryCreate):
    try:
        if not db.is_connected():
            await db.connect()

        item = await db.itineraryitem.create(
            data={
                "tripId": data.tripId,
                "title": data.title,
                "itemType": data.itemType,
                "cost": data.cost
            }
        )

        return item

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{trip_id}")
async def get_itinerary(trip_id: int):
    try:
        if not db.is_connected():
            await db.connect()

        items = await db.itineraryitem.find_many(
            where={"tripId": trip_id}
        )

        return items

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))