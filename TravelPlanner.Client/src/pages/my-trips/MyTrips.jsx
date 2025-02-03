import React from "react";
import { useTrips } from "@/hooks/useTrips";
import TripCard from "@/components/TripCard/TripCard";
import { useNavigate } from "react-router-dom";

export default function MyTrips() {
  const { trips, isLoading, deleteTrip } = useTrips();
  const navigate = useNavigate();

  const handleDeleteTrip = async (tripId) => {
    try {
      await deleteTrip(tripId);
    } catch (error) {
      // Error is already handled in the hook with toast
      console.error('Error in handleDeleteTrip:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (trips.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">My Trips</h1>
          <p className="text-gray-600">Start planning your next adventure!</p>
        </div>
        <button
          onClick={() => navigate("/list-destinations")}
          className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          Plan a Trip
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Trips</h1>
          <p className="text-gray-600">Manage and view your planned adventures</p>
        </div>
        <button
          onClick={() => navigate("/list-destinations")}
          className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          Plan New Trip
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} onDelete={handleDeleteTrip} />
        ))}
      </div>
    </div>
  );
}
