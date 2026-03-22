# backend/src/services/amadeus_api.py
import os
from dotenv import load_dotenv

load_dotenv()

# Amadeus API integration
# Note: Requires amadeus library: pip install amadeus
# For now, returning empty flights. Install amadeus when ready to use flights.

async def search_flights(origin: str, destination: str, departure_date: str):
    """
    Search for flights using Amadeus API.
    
    Args:
        origin: 3-letter IATA code (e.g., JFK, LHR)
        destination: 3-letter IATA code
        departure_date: Date in YYYY-MM-DD format
    
    Returns:
        List of flight offers
    """
    # TODO: Uncomment when amadeus library is installed
    # from amadeus import Client, ResponseError
    # amadeus = Client(
    #     client_id=os.getenv("AMADEUS_CLIENT_ID"),
    #     client_secret=os.getenv("AMADEUS_CLIENT_SECRET")
    # )
    # try:
    #     response = amadeus.shopping.flight_offers_search.get(
    #         originLocationCode=origin,
    #         destinationLocationCode=destination,
    #         departureDate=departure_date,
    #         adults=1
    #     )
    #     return response.data
    # except ResponseError as error:
    #     print(f"Amadeus Error: {error}")
    #     return []
    
    return []