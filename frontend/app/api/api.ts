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
// frontend/src/lib/api.ts
export const itineraryApi = {
  // ... other methods
  addActivity: async (activity: { tripId: number; title: string; type: string; cost: number }) => {
    const response = await fetch(`http://localhost:8000/api/itinerary/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activity),
    });
    if (!response.ok) throw new Error("Failed to add activity");
    return response.json();
  },
};