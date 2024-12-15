import React, { useEffect, useState } from 'react';
import PlacesToVisit from './PlacesToVisit';
import Hotels from './Hotels';
import { useLocation, useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import InfoSection from './InfoSection';

export default function ViewDestination() {
  const [selectedActivities, setSelectedActivities] = useState({});
  const [selectedHotel, setSelectedHotel] = useState(null);
  const {destinationId} = useParams()
  const [destination,setDestination] = useState({})
  const location = useLocation()

  const getDestinationData =  () => {
    setDestination({
        id:1,
        destinationName: "New York",
        noOfDays: 3,
        budget: "Moderate",
        traveler: 2,
        hotels: [
            {
                id: 1,
                name: "Acqualina Resort & Residences",
                address: "17875 Collins Ave, Sunny Isles Beach",
                price: "$1,200",
                rating: 5.0,
                image:"/images/hotel1.jpg"
            },
            {
                id: 2,
                name: "The Langham, Chicago",
                address: "330 N Wabash Ave, Chicago, IL 60611",
                price: "$550",
                rating: 4.8,
                image:"/images/hotel2.jpg"
            },
            {
                id: 3,
                name: "The Peninsula Beverly Hills",
                address: "9882 S Santa Monica Blvd, Beverly Hills",
                price: "$850",
                rating: 4.9,
                image:"/images/hotel3.jpg"
            },
            {
                id: 4,
                name: "Montage Laguna Beach",
                address: "30801 S Coast Hwy, Laguna Beach",
                price: "$950",
                rating: 4.7,
                image:"/images/hotel1.jpg"
            },
            {
                id: 5,
                name: "Four Seasons Resort Maui Wailea",
                address: "3900 Wailea Alanui Dr, Wailea, HI 96753",
                price: "$1,400",
                rating: 4.9,
                image:"/images/hotel2.jpg"
            }
        ],
        itinerary: [
            {
                day: 1,
                activities: [
                    { 
                        time: "9:00 AM", 
                        place: "Central Park", 
                        description: "Stroll through the iconic park and visit landmarks like Bethesda Terrace.", 
                        image:"/images/park.jpg"
                    },
                    { 
                        time: "12:00 PM", 
                        place: "Times Square", 
                        description: "Explore the bustling heart of New York with giant screens and vibrant crowds.",
                        image:"/images/paris.jpg"
                    },
                    { 
                        time: "7:00 PM", 
                        place: "Broadway Show", 
                        description: "Experience a world-class Broadway performance.",
                        image:"/images/newyork.jpg" 
                    },
                    { 
                        time: "10:00 AM", 
                        place: "Museum of Modern Art", 
                        description: "Admire modern masterpieces by artists like Picasso and Warhol.",
                        image:"/images/restaurant1.jpg" 
                    },
                    { 
                        time: "1:00 PM", 
                        place: "Top of the Rock", 
                        description: "Take in breathtaking views of New York from the observation deck.",
                        image:"/images/newyork.jpg" 
                    },
                ]
            },
            {
                day: 2,
                activities: [
                    { 
                        time: "10:00 AM", 
                        place: "Museum of Modern Art", 
                        description: "Admire modern masterpieces by artists like Picasso and Warhol.",
                        image:"/images/restaurant1.jpg" 
                    },
                    { 
                        time: "1:00 PM", 
                        place: "Top of the Rock", 
                        description: "Take in breathtaking views of New York from the observation deck.",
                        image:"/images/newyork.jpg" 
                    },
                    { 
                        time: "3:00 PM", 
                        place: "SoHo", 
                        description: "Shop and explore trendy boutiques in the vibrant SoHo district.",
                        image:"/images/restaurant2.jpg" 
                    },
                    { 
                        time: "12:00 PM", 
                        place: "Times Square", 
                        description: "Explore the bustling heart of New York with giant screens and vibrant crowds.",
                        image:"/images/paris.jpg"
                    },
                    { 
                        time: "7:00 PM", 
                        place: "Broadway Show", 
                        description: "Experience a world-class Broadway performance.",
                        image:"/images/newyork.jpg" 
                    }
                ]
            },
            {
                day: 3,
                activities: [
                    { 
                        time: "9:00 AM",
                        place: "Statue of Liberty", 
                        description: "Take a ferry to Liberty Island and visit the iconic statue.",
                        image:"/images/tokyo.jpg"
                    },
                    { 
                        time: "1:00 PM",
                        place: "Brooklyn Bridge", 
                        description: "Walk across the bridge for stunning views of the city skyline.",
                        image:"/images/beach.jpg" 
                    },
                    { 
                        time: "4:00 PM",
                        place: "Chinatown", 
                        description: "Discover the sights, sounds, and flavors of Chinatown.",
                        image:"/images/park.jpg" 
                    },
                    { 
                        time: "1:00 PM", 
                        place: "Top of the Rock", 
                        description: "Take in breathtaking views of New York from the observation deck.",
                        image:"/images/newyork.jpg" 
                    },
                    { 
                        time: "3:00 PM", 
                        place: "SoHo", 
                        description: "Shop and explore trendy boutiques in the vibrant SoHo district.",
                        image:"/images/restaurant2.jpg" 
                    },
                    { 
                        time: "12:00 PM", 
                        place: "Times Square", 
                        description: "Explore the bustling heart of New York with giant screens and vibrant crowds.",
                        image:"/images/paris.jpg"
                    }
                ]
            }
        ]
    });  
    }
  
    useEffect(()=>{
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
      />
    </div>
  );
}
