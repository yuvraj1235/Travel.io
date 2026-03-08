# backend/src/services/photo_service.py
import httpx
import os

UNSPLASH_KEY = os.getenv("UNSPLASH_ACCESS_KEY")

async def get_city_photo(city_name: str):
    url = f"https://api.unsplash.com/search/photos?query={city_name}&client_id={UNSPLASH_KEY}&orientation=landscape&per_page=1"
    
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        if response.status_code == 200:
            data = response.json()
            if data['results']:
                # Returns the regular sized image URL
                return data['results'][0]['urls']['regular']
        
    # Fallback image if Unsplash fails
    return "https://images.unsplash.com/photo-1488646953014-85cb44e25828"