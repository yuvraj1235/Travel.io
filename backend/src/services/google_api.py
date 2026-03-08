# backend/src/services/google_api.py
import httpx
import os

GOOGLE_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")

async def get_destination_photo(city_name: str):
    """
    Fetches a photo URL from Google Places API for a given city.
    """
    # 1. Search for the place to get the photo reference
    search_url = f"https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input={city_name}&inputtype=textquery&fields=photos&key={GOOGLE_API_KEY}"
    
    async with httpx.AsyncClient() as client:
        response = await client.get(search_url)
        data = response.json()
        
        if data.get('candidates') and data['candidates'][0].get('photos'):
            photo_ref = data['candidates'][0]['photos'][0]['photo_reference']
            # 2. Construct the direct image URL
            return f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference={photo_ref}&key={GOOGLE_API_KEY}"
    
    # Fallback if no photo is found
    return "https://images.unsplash.com/photo-1488646953014-85cb44e25828"