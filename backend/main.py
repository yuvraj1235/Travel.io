from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from prisma import Prisma
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
prisma = Prisma()

# --- Middleware (Member 8: Crucial for Frontend connection) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await prisma.connect()

@app.on_event("shutdown")
async def shutdown():
    await prisma.disconnect()

# --- Auth Endpoint (Members 3 & 4) ---
@app.post("/api/auth/google")
async def google_login(data: dict):
    # In a real app, verify the token with google-auth library here
    # For now, we find or create the user in NeonDB
    user = await prisma.user.upsert(
        where={'googleId': data['googleId']},
        data={
            'create': {
                'googleId': data['googleId'],
                'email': data['email'],
                'fullName': data['name'],
                'profilePic': data['image']
            },
            'update': {
                'fullName': data['name'],
                'profilePic': data['image']
            }
        }
    )
    return user

# --- Trip Endpoints (Members 3 & 4) ---
@app.post("/api/trips")
async def create_trip(data: dict):
    try:
        new_trip = await prisma.trip.create(
            data={
                'userId': data['userId'],
                'destination': data['destination'],
                'budgetLimit': float(data['budget']),
                'startDate': data['startDate'],
                'endDate': data['endDate'],
                'source': 'manual'
            }
        )
        return new_trip
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/trips/{user_id}")
async def get_user_trips(user_id: int):
    return await prisma.trip.find_many(
        where={'userId': user_id},
        order={'createdAt': 'desc'}
    )

# --- Itinerary Endpoints (Members 5 & 6) ---
@app.get("/api/itinerary/{trip_id}")
async def get_itinerary(trip_id: int):
    # Fetches all events (flights, hotels) for a specific trip
    return await prisma.itineraryitem.find_many(
        where={'tripId': trip_id},
        order={'startTime': 'asc'}
    )

@app.post("/api/itinerary")
async def add_item(data: dict):
    return await prisma.itineraryitem.create(
        data={
            'tripId': data['tripId'],
            'title': data['title'],
            'itemType': data['type'],
            'cost': float(data.get('cost', 0)),
            'googlePlaceId': data.get('placeId')
        }
    )