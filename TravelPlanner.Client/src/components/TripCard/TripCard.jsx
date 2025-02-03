import React, { useState } from "react";
import { DateTime } from "luxon";
import ActivityModal from "../ActivityModal/ActivityModal";
import HotelModal from "../HotelModal/HotelModal";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop";

export default function TripCard({ trip, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showHotelDetails, setShowHotelDetails] = useState(false);

  const handleImageError = (e) => {
    e.target.src = DEFAULT_IMAGE;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="relative">
          <img
            src={trip.destination?.imageUrl?.startsWith('/') 
              ? `http://localhost:5000${trip.destination.imageUrl}`
              : trip.destination?.imageUrl || DEFAULT_IMAGE}
            alt={trip.destination?.name}
            onError={handleImageError}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Delete Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm('Are you sure you want to delete this trip?')) {
                onDelete?.(trip.id);
              }
            }}
            className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-full transition-all duration-200 transform hover:scale-105 group shadow-lg hover:shadow-xl"
            title="Delete trip"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>

          <div className="absolute bottom-0 left-0 p-4 text-white">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold">{trip.destination?.name}</h2>
                <span className="px-2 py-1 bg-black/30 rounded-full text-sm capitalize">
                  {trip.travelType}
                </span>
              </div>
              <p className="text-sm opacity-90">
                {DateTime.fromISO(trip.startDate).toFormat("dd MMM")} -{" "}
                {DateTime.fromISO(trip.endDate).toFormat("dd MMM yyyy")}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-4 space-y-4">
            {/* Destination Description */}
            <div>
              <p className={`text-gray-600 text-sm ${!showFullDescription && 'line-clamp-2'}`}>
                {trip.destination?.description}
              </p>
              {trip.destination?.description?.length > 100 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-sm text-blue-600 hover:text-blue-800 mt-1"
                >
                  {showFullDescription ? 'Show Less' : 'Read More'}
                </button>
              )}
            </div>

            {/* Hotel Section */}
            <div className="border rounded-lg p-3">
              <h3 className="font-medium text-gray-900 mb-2">Hotel</h3>
              <button
                onClick={() => setShowHotelDetails(true)}
                className="w-full flex items-center gap-3 hover:bg-gray-50 transition-colors rounded-lg group"
              >
                <img
                  src={trip.hotel?.imageUrl?.startsWith('/') 
                    ? `http://localhost:5000${trip.hotel.imageUrl}`
                    : trip.hotel?.imageUrl || DEFAULT_IMAGE}
                  alt={trip.hotel?.name}
                  onError={handleImageError}
                  className="w-24 h-24 rounded-md object-cover flex-shrink-0"
                />
                <div className="flex-1 text-left min-w-0">
                  <div className="flex justify-between gap-1 items-start">
                    <p className="font-medium text-gray-800 group-hover:text-gray-900">{trip.hotel?.name}</p>
                    <p className="text-lg font-semibold">
                      {formatPrice(trip.hotel?.price)} <span className="text-sm text-gray-500">/night</span>
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{trip.hotel?.address}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(trip.hotel?.rating || 0)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <svg 
                  className="w-5 h-5 text-gray-400 flex-shrink-0 group-hover:text-gray-900" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Activities Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">Daily Activities</h3>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  {isExpanded ? "Show Less" : "Show More"}
                </button>
              </div>
              
              <div className={`space-y-4 transition-all duration-300 ${isExpanded ? 'block' : 'hidden'}`}>
                {Object.entries(trip.activities || {}).map(([day, activities]) => (
                  <div key={day} className="border rounded-lg p-3">
                    <p className="font-medium text-gray-800 mb-2">Day {day}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {activities.map((activity) => (
                        <button
                          key={activity.id}
                          onClick={() => setSelectedActivity(activity)}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left w-full group"
                        >
                          <img
                            src={activity.imageUrl?.startsWith('/') 
                              ? `http://localhost:5000${activity.imageUrl}`
                              : activity.imageUrl || DEFAULT_IMAGE}
                            alt={activity.name}
                            onError={handleImageError}
                            className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 truncate group-hover:text-gray-900">
                              {activity.name}
                            </p>
                            <p className="text-sm text-gray-500">{activity.time}</p>
                          </div>
                          <svg 
                            className="w-5 h-5 text-gray-400 ml-auto flex-shrink-0 group-hover:text-gray-900" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Modal */}
      {selectedActivity && (
        <ActivityModal
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
        />
      )}

      {/* Hotel Modal */}
      {showHotelDetails && (
        <HotelModal
          hotel={trip.hotel}
          onClose={() => setShowHotelDetails(false)}
        />
      )}
    </>
  );
}
