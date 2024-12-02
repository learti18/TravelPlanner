import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import apiClient from '../../services/Api'

export default function ListTrips() {
  const [trips, setTrips] = useState([]);

  const getTrips = async () => {
    try {
      const response = await apiClient.get('trips');
      const data = response.data;
      setTrips(data);
    } catch (error) {
      console.log("Error getting trips: " + error);
    }
  };

  useEffect(() => {
    getTrips(); 
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8 mt-10">
      <NavLink 
        to="/createTrip"
        className="px-6 py-3 bg-indigo-600 text-white rounded-md shadow-lg hover:bg-indigo-700 transition-colors mb-6"
      >
        Create a Trip
      </NavLink>

      <div className="flex flex-wrap gap-6 justify-center w-full px-4">
        {trips.map((trip) => (
          <div key={trip.id} className="bg-white p-6 rounded-lg shadow-lg w-80 transform transition-transform hover:scale-105 cursor-pointer">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">{trip.name}</h2>
            <p className="text-lg text-gray-700 mb-3">
              <strong>Destination:</strong> {trip.destination}
            </p>
            <p className="text-lg text-gray-700 mb-3">
              <strong>Departure:</strong> {new Date(trip.startDate).toLocaleDateString()}
            </p>
            <p className="text-lg text-gray-700 mb-3">
              <strong>Return:</strong> {new Date(trip.endDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
