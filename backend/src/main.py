from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.database import connect_db, disconnect_db
from src.routes import auth, trips, itinerary

app = FastAPI(title="AI Travel Planner API")

# --- CORS (Crucial for Next.js Connection) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Database Lifecycle ---
@app.on_event("startup")
async def startup():
    await connect_db()

@app.on_event("shutdown")
async def shutdown():
    await disconnect_db()

# --- Include Routes ---
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(trips.router, prefix="/api/trips", tags=["Trips"])
app.include_router(itinerary.router, prefix="/api/itinerary", tags=["Itinerary"])

@app.get("/")
def home():
    return {"message": "Travel Planner Backend is Live"}