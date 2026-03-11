// frontend/src/app/api/api.ts

const API_BASE_URL = "http://localhost:8000/api";

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(error.detail || "API Error");
  }
  return res.json();
};

export const tripApi = {
  getUserTrips: (userId: number) => 
    fetch(`${API_BASE_URL}/trips/user/${userId}`).then(handleResponse),

  getTripDetails: (tripId: string | number) => 
    fetch(`${API_BASE_URL}/trips/details/${tripId}`).then(handleResponse),

  createTrip: (tripData: any) => 
    fetch(`${API_BASE_URL}/trips/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tripData),
    }).then(handleResponse),
};

// frontend/src/app/api/api.ts

export const itineraryApi = {
  getItinerary: (tripId: string | number) => 
    fetch(`${API_BASE_URL}/itinerary/${tripId}`).then(handleResponse),

  // FIX: Pass the object directly so 'itemType' isn't lost or renamed
  addActivity: (activity: { tripId: number; title: string; itemType: string; cost: number }) => 
    fetch(`${API_BASE_URL}/itinerary/item`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activity), // This will send {"itemType": "..."}
    }).then(handleResponse),

  deleteActivity: (itemId: number) =>
    fetch(`${API_BASE_URL}/itinerary/item/${itemId}`, {
      method: "DELETE",
    }).then(handleResponse),
};