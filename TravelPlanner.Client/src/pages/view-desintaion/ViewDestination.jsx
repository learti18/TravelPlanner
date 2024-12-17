import React, { useEffect, useState } from 'react';
import PlacesToVisit from './PlacesToVisit';
import Hotels from './Hotels';
import { useLocation, useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import InfoSection from './InfoSection';
import apiClient from '@/services/Api';

export default function ViewDestination() {
  const [selectedActivities, setSelectedActivities] = useState({});
  const [selectedHotel, setSelectedHotel] = useState(null);
  const {destinationId} = useParams()
  const [destination,setDestination] = useState({})
  const location = useLocation()

  
  
    useEffect(()=>{
        const getDestinationData = async () => {
            try{
                const response = await apiClient.get(`destinations/${destinationId}`)
                setDestination(response.data)
            }catch(error){
                console.log(error)
            }
        }

        getDestinationData()
    },[])

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

    // Replace with your API call
    // fetch('/api/saveTrip', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload),
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log('Successfully saved:', data))
    //   .catch((error) => console.error('Error:', error));
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
