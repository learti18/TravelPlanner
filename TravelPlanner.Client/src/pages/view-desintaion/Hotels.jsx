import React from 'react';
import { CheckCircle2, MapPin, Star } from 'lucide-react';

export default function Hotels({ destination, selectedHotel, onHotelSelect }) {
  const handleHotelClick = (hotel) => {
    onHotelSelect((prevSelectedHotel) =>
      prevSelectedHotel === hotel ? null : hotel
    );
  };

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-3">
        {destination?.hotels?.map((hotel, index) => (
          <div
            key={index}
            className={`hover:scale-105 transition-all cursor-pointer p-2 rounded-lg relative ${
              selectedHotel && selectedHotel !== hotel.name
                ? 'opacity-50 cursor-not-allowed'
                : 'opacity-100 cursor-pointer'
            }`}
            onClick={() => handleHotelClick(hotel.name)}
            style={{
              pointerEvents: selectedHotel && selectedHotel !== hotel.name ? 'none' : 'auto',
            }}
          >
            <img src={`http://localhost:5120${hotel.imageUrl}`} className="rounded-xl" alt={hotel.name} />
            <div className="my-2 flex flex-col gap-2">
              <h2 className="font-medium flex items-center justify-between">
                {hotel.name}
                {selectedHotel === hotel.name && (
                  <CheckCircle2 size={26} className="bg-green-600 rounded-full text-white absolute top-5 right-5" />
                )}
              </h2>
              <h2 className="text-xs text-gray-500 flex items-center gap-1">
                <MapPin size={16} />
                {hotel.address}
              </h2>
              <div className="flex flex-row items-center justify-between">
                <h2 className="text-sm">{hotel.price}</h2>
                <h2 className="text-sm flex items-center gap-1">
                  {hotel.rating}
                  <Star size={16} />
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
