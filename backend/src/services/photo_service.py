# backend/src/services/photo_service.py
import os

async def get_city_photo(city_name: str):
    """
    Returns a mock city photo URL for local development.
    Later, replace with Unsplash API or your own image service.
    """
    
    # Mock images for common cities
    mock_images = {
        "paris": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
        "tokyo": "https://images.unsplash.com/photo-1540959375944-7049f642e9a9?w=800",
        "new york": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800",
        "london": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
        "sydney": "https://images.unsplash.com/photo-1506973404046-a178043e3466?w=800",
        "dubai": "https://images.unsplash.com/photo-1512453563560-53c55ac8e4a8?w=800",
        "bali": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        "barcelona": "https://images.unsplash.com/photo-1583422409516-2895a77f3df8?w=800",
    }
    
    city_lower = city_name.lower()
    
    # Return mock image for known cities
    if city_lower in mock_images:
        return mock_images[city_lower]
    
    # Default fallback image for any unknown city
    return "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800"