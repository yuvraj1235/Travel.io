# backend/src/services/amadeus_api.py
from amadeus import Client, ResponseError
import os
from dotenv import load_dotenv

load_dotenv()

amadeus = Client(
    client_id=os.getenv("AMADEUS_CLIENT_ID"),
    client_secret=os.getenv("AMADEUS_CLIENT_SECRET")
)

async def search_flights(origin: str, destination: str, departure_date: str):
    try:
        # origin/destination must be 3-letter IATA codes (e.g., JFK, LHR)
        response = amadeus.shopping.flight_offers_search.get(
            originLocationCode=origin,
            destinationLocationCode=destination,
            departureDate=departure_date,
            adults=1
        )
        return response.data
    except ResponseError as error:
        print(f"Amadeus Error: {error}")
        return []