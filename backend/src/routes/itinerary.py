from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Optional

router = APIRouter()

# ===== MOCK DATA FOR LOCAL DEVELOPMENT =====
MOCK_ITINERARY_ITEMS = {}
NEXT_ITEM_ID = 1

class ItineraryCreate(BaseModel):
    tripId: int
    title: str
    itemType: str = Field(..., alias="itemType")
    cost: Optional[float] = 0.0

    class Config:
        populate_by_name = True


@router.post("/item")
async def add_itinerary_item(data: ItineraryCreate):
    """Add an activity/item to trip itinerary"""
    global NEXT_ITEM_ID
    
    item_id = NEXT_ITEM_ID
    NEXT_ITEM_ID += 1
    
    item = {
        "id": item_id,
        "tripId": data.tripId,
        "title": data.title,
        "itemType": data.itemType,
        "cost": data.cost
    }
    
    MOCK_ITINERARY_ITEMS[item_id] = item
    return item


@router.get("/{trip_id}")
async def get_itinerary(trip_id: int):
    """Get all itinerary items for a trip"""
    items = [item for item in MOCK_ITINERARY_ITEMS.values() if item['tripId'] == trip_id]
    return items


@router.delete("/item/{item_id}")
async def delete_itinerary_item(item_id: int):
    """Delete an itinerary item"""
    if item_id not in MOCK_ITINERARY_ITEMS:
        raise HTTPException(status_code=404, detail="Item not found")
    
    del MOCK_ITINERARY_ITEMS[item_id]
    return {"message": "Item deleted successfully"}
