// frontend/src/lib/api.ts

const API_BASE_URL = "http://localhost:8000/api";

export const tripApi = {
  // Create a new trip
  createTrip: async (tripData: any) => {
    const response = await fetch(`${API_BASE_URL}/trips/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tripData),
    });
    if (!response.ok) throw new Error("Failed to create trip");
    return response.json();
  },

  // Get all trips for a user
  getUserTrips: async (userId: number) => {
    const response = await fetch(`${API_BASE_URL}/trips/${userId}`);
    return response.json();
  }
};