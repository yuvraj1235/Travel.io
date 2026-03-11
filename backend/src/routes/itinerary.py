from pydantic import BaseModel, Field # Add Field
from typing import Optional

class ItineraryCreate(BaseModel):
    tripId: int
    title: str
    # Use Field to allow 'itemType' from frontend to map to 'itemType' in Python
    itemType: str = Field(..., alias="itemType") 
    cost: Optional[float] = 0.0

    class Config:
        # This allows the model to work even if you pass data as a dictionary
        populate_by_name = True

@router.post("/item")
async def add_itinerary_item(data: ItineraryCreate):
    try:
        # Use data.itemType here - Pydantic will have mapped it
        item = await db.itineraryitem.create(
            data={
                "tripId": data.tripId,
                "title": data.title,
                "type": data.itemType, # Make sure 'type' matches your schema.prisma
                "cost": data.cost
            }
        )
        return item
    except Exception as e:
        print(f"Detailed Backend Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/{trip_id}")
async def get_itinerary(trip_id: int):
    # Returns all activities for a specific trip
    return await db.itineraryitem.find_many(
        where={'tripId': trip_id}
    )