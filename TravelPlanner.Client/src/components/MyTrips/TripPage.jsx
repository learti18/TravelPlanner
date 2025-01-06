import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoSection from '../../pages/view-destination/InfoSection';  // Your InfoSection component
import Hotels from '../../pages/view-destination/Hotels';  // Your Hotels component


export default function TripPage() {
  const navigate = useNavigate();
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedActivities, setSelectedActivities] = useState({});
  const [destination, setDestination] = useState({
    id: 1,
    name: 'Paris',
    imageUrl: '/images/paris.jpg',
  });
  const [noOfDays, setNoOfDays] = useState(7);
  const [travelType, setTravelType] = useState('Solo');

  const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel);
  };

  const handleActivitySelect = (day, updatedActivities) => {
    setSelectedActivities((prevActivities) => ({
      ...prevActivities,
      [day]: updatedActivities,
    }));
  };

  const handleSubmit = async () => {
    const tripData = {
      HotelId: selectedHotel ? selectedHotel.id : 0,
      ActivityIds: Object.values(selectedActivities).flat().map(activity => activity.id),
      StartDate: new Date(),
      EndDate: new Date(),
    };

    try {
      const response = await fetch('http://localhost:5000/api/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tripData),
      });

      if (response.ok) {
        const trip = await response.json();
        console.log('Trip created:', trip);

        // Navigate to MyTrips page after successful trip creation
        navigate('/mytrips');
      } else {
        console.error('Failed to create trip:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating trip:', error);
    }
  };

  // Automatically submit the trip when all selections are made
  React.useEffect(() => {
    if (selectedHotel && Object.keys(selectedActivities).length === noOfDays) {
      handleSubmit();
    }
  }, [selectedHotel, selectedActivities]);

  return (
    <div>
      <InfoSection
        destination={destination}
        noOfDays={noOfDays}
        travelType={travelType}
        submitData={handleSubmit}  // You can remove the button from here too if needed
      />
      <Hotels
        destination={destination}
        selectedHotel={selectedHotel}
        onHotelSelect={handleHotelSelect}
      />
      <PlacesToVisit
        destination={destination}
        noOfDays={noOfDays}
        selectedActivities={selectedActivities}
        onActivitySelect={handleActivitySelect}
      />
    </div>
  );
}
