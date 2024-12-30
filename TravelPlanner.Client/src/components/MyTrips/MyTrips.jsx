import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function MyTrips() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tripData, setTripData] = useState(null);

  useEffect(() => {
    // If data is passed from Questionnaire page, use it
    if (location.state) {
      setTripData(location.state);
    } else {
      // Fetch data from API if available (use your .NET API for this)
      fetchTripData();
    }
  }, [location]);

  const fetchTripData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/"); // Replace with your .NET API endpoint
      const data = await response.json();
      setTripData(data);
    } catch (error) {
      console.error("Failed to fetch trip data:", error);
    }
  };

  const handleEditTrip = () => {
    navigate("/edit-trip", { state: tripData });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-md space-y-6">
        {tripData ? (
          <>
            <h1 className="text-3xl font-semibold text-center text-gray-800">
              Your Trip Details
            </h1>
            <Card className="space-y-4 p-4">
              <h2 className="text-xl font-medium text-gray-700">Trip Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  <span className="text-sm font-semibold text-gray-600">Destination</span>
                  <p className="text-lg text-gray-800">{tripData.destination}</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="text-sm font-semibold text-gray-600">Dates</span>
                  <p className="text-lg text-gray-800">
                    {new Date(tripData.startDate).toLocaleDateString()} -{" "}
                    {new Date(tripData.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="text-sm font-semibold text-gray-600">Travel Type</span>
                  <p className="text-lg text-gray-800">{tripData.travelType}</p>
                </div>
              </div>
            </Card>
            <Card className="space-y-4 p-4">
              <h2 className="text-xl font-medium text-gray-700">Additional Details</h2>
              <div className="space-y-2">
                <span className="text-sm font-semibold text-gray-600">Hotels</span>
                <p className="text-lg text-gray-800">{tripData.hotels.length} hotels booked</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-semibold text-gray-600">Activities</span>
                <p className="text-lg text-gray-800">{tripData.activities.length} activities planned</p>
              </div>
            </Card>
            <div className="flex justify-center mt-6 space-x-4">
              <Button onClick={handleEditTrip} variant="secondary">
                Edit Trip
              </Button>
              <Button variant="destructive">Cancel Trip</Button>
            </div>
          </>
        ) : (
          <div className="text-center text-xl text-gray-600">Loading trip details...</div>
        )}
      </div>
    </div>
  );
}
