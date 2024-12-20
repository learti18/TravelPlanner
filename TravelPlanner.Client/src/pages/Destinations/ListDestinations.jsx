import useDestinations from '@/hooks/useDestinations';
import apiClient from '@/services/Api';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';

// const destinations = [
//   { id:1, name: 'Paris', image: '/images/paris.jpg', description: 'The City of Light.' },
//   { id:2, name: 'New York', image: '/images/newyork.jpg', description: 'The city that never sleeps.' },
//   { id:3, name: 'Tokyo', image: '/images/tokyo.jpg', description: 'A perfect blend of tradition and modernity.' },
//   { id:4, name: 'Paris', image: '/images/paris.jpg', description: 'The City of Light.' },
//   { id:5, name: 'New York', image: '/images/newyork.jpg', description: 'The city that never sleeps.' },
//   { id:6, name: 'Tokyo', image: '/images/tokyo.jpg', description: 'A perfect blend of tradition and modernity.' },
  
//   // Add more destinations as needed
// ];

const ListDestinations = () => {
  const { destinations,isLoading } = useDestinations()
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen md:px-16 lg:px-36 xl:px-44 mb-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Popular Destinations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img src={`http://localhost:5120${destination.imageUrl}`} alt={destination.name} className="w-full h-60 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold">{destination.name}</h2>
              <p className="text-gray-600 mb-4 overflow-hidden h-12">{destination.description}</p>
              <NavLink
                to={`/questionnaire?destination=${destination.id}`}
                className="flex justify-center mt-4 px-4 py-2 bg-black text-white rounded hover:bg-zinc-800"
              >
                Choose
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListDestinations;