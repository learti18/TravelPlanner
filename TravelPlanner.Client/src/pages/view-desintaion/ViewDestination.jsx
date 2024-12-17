import React, { useEffect, useState } from 'react';
import PlacesToVisit from './PlacesToVisit';
import Hotels from './Hotels';
import { useLocation, useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import InfoSection from './InfoSection';
import useDestinations from '@/hooks/useDestinations';

export default function ViewDestination() {
  const [selectedActivities, setSelectedActivities] = useState({});
  const [selectedHotel, setSelectedHotel] = useState(null);
  const {destinationId} = useParams()
  const location = useLocation()
  
  const { destination } = useDestinations(destinationId)

  const {startDate,endDate,travelType} = location.state
  const start = DateTime.fromISO(startDate)
  const end = DateTime.fromISO(endDate)

  const noOfDays = end.diff(start,'days').days
  const handleActivitySelection = (day, activities) => {
    setSelectedActivities((prev) => ({ ...prev, [day]: activities }));
  };

  const handleHotelSelection = (hotel) => {
    setSelectedHotel(hotel);
  };

  const submitData = () => {
    const payload = {
      destination: destination.destinationName,
      activities: selectedActivities,
      hotel: selectedHotel,
    };
    console.log('Submitting Data:', payload);
  };

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      <InfoSection destination={destination} noOfDays={noOfDays} travelType={travelType} submitData={submitData}/>
      <Hotels
        destination={destination}
        selectedHotel={selectedHotel}
        onHotelSelect={handleHotelSelection}
      />
      <PlacesToVisit
        destination={destination}
        selectedActivities={selectedActivities}
        onActivitySelect={handleActivitySelection}
        noOfDays={noOfDays}
      />
    </div>
  );
}
