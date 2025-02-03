import { useState, useEffect } from "react";
import apiClient from "@/services/Api";
import { toast } from "sonner";

export function useTrips() {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTrips = async () => {
    try {
      setIsLoading(true);
      const { data } = await apiClient.get("/trips");
      setTrips(data);
    } catch (error) {
      console.error('Error fetching trips:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to fetch trips");
    } finally {
      setIsLoading(false);
    }
  };

  const createTrip = async (tripData) => {
    try {
      const { data } = await apiClient.post("/trips", tripData);
      setTrips((prev) => [...prev, data]);
      toast.success("Trip created successfully!");
      return data;
    } catch (error) {
      console.error('Error creating trip:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to create trip");
      throw error;
    }
  };

  const deleteTrip = async (tripId) => {
    try {
      await apiClient.delete(`/trips/${tripId}`);
      setTrips((prev) => prev.filter((trip) => trip.id !== tripId));
      toast.success("Trip deleted successfully");
    } catch (error) {
      console.error('Error deleting trip:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to delete trip");
      throw error;
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return {
    trips,
    isLoading,
    createTrip,
    deleteTrip,
  };
}
