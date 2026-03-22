from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes import auth, trips, itinerary
import os
from dotenv import load_dotenv

load_dotenv() # This loads the variables from the .env file

app = FastAPI(
    title="Travel Planner API",
    description="Local development API - No external services needed",
    version="1.0.0"
)

# --- CORS (Allow Frontend Connection) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Include Routes ---
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(trips.router, prefix="/api/trips", tags=["Trips"])
app.include_router(itinerary.router, prefix="/api/itinerary", tags=["Itinerary"])

@app.get("/")
def home():
    return {
        "message": "✅ Travel Planner Backend is Running!",
        "docs": "Visit http://localhost:8000/docs",
        "mode": "LOCAL DEVELOPMENT (Mock Data)"
    }

@app.get("/health")
def health():
    return {"status": "healthy"}
