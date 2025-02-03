import React from "react";

export default function HotelModal({ hotel, onClose }) {
  if (!hotel) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        <div className="relative">
          <img
            src={hotel.imageUrl?.startsWith('/') 
              ? `http://localhost:5000${hotel.imageUrl}`
              : hotel.imageUrl}
            alt={hotel.name}
            className="w-full h-96 object-cover rounded-t-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{hotel.name}</h2>
              <p className="text-gray-600 mt-2">{hotel.address}</p>
              <p className="font-semibold text-xl">
                ${hotel.price}
                <span className="text-sm text-gray-500">/night</span>
                </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(hotel.rating || 0)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-600">{hotel.review} </span>
          </div>
        </div>
      </div>
    </div>
  );
}
