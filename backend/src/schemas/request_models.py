# backend/src/schemas/request_models.py
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# --- Auth Schemas ---
class GoogleAuthRequest(BaseModel):
    googleId: str
    email: EmailStr
    name: str
    image: Optional[str] = None

# --- Trip Schemas ---
class TripCreateRequest(BaseModel):
    userId: int
    destination: str
    budgetLimit: float
    startDate: datetime
    endDate: datetime

# --- Itinerary Schemas ---
class ItineraryItemCreate(BaseModel):
    tripId: int
    title: str
    itemType: str  # Valid values: 'flight', 'hotel', 'activity'
    cost: Optional[float] = 0.0
    startTime: Optional[datetime] = None
    endTime: Optional[datetime] = None
    googlePlaceId: Optional[str] = None