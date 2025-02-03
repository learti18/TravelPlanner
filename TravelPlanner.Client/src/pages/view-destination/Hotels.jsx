import React from 'react';
import { CheckCircle2, MapPin, Star } from 'lucide-react';

export default function Hotels({ destination, selectedHotel, onHotelSelect }) {
  const handleHotelClick = (hotel) => {
    // Toggle the hotel selection: if already selected, deselect it; otherwise, select it
    onHotelSelect((prevSelectedHotel) =>
      prevSelectedHotel?.id === hotel.id ? null : hotel
    );
  };

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Select the hotel you will be staying at</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-3 relative">
        {destination?.hotels?.map((hotel) => (
          <div
            key={hotel.id} // Use hotel.id as the key for better performance
            className={`hover:scale-105 transition-all cursor-pointer p-2 rounded-lg relative ${
              selectedHotel?.id && selectedHotel.id !== hotel.id
                ? 'opacity-50 cursor-not-allowed'
                : 'opacity-100 cursor-pointer'
            }`}
            onClick={() => handleHotelClick(hotel)}
            style={{
              pointerEvents: selectedHotel?.id && selectedHotel.id !== hotel.id ? 'none' : 'auto',
            }}
          >
            <img src={`http://localhost:5000${hotel.imageUrl}`} className="rounded-xl" alt={hotel.name} />
            <div className="my-2 flex flex-col gap-2">
              <h2 className="font-medium flex items-center justify-between">
                {hotel.name}
                {selectedHotel?.id === hotel.id && (
                  <CheckCircle2 size={26} className="text-green-500 absolute bottom-21 right-3" />
                )}
              </h2>
              <h2 className="text-xs text-gray-500 flex items-center gap-1">
                <MapPin size={16} />
                {hotel.address}
              </h2>
              <div className="flex flex-row items-center justify-between">
                <h2 className="text-md font-semibold">
                  {hotel.price}$<span className="text-gray-400">/Night</span>
                </h2>
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
