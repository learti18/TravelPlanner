import React, { useEffect, useState } from "react";
import PlacesToVisit from "./PlacesToVisit";
import Hotels from "./Hotels";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import InfoSection from "./InfoSection";
import useDestinations from "@/hooks/useDestinations";
import { useTrips } from "@/hooks/useTrips";
import { toast } from "sonner";

export default function ViewDestination() {
  const [selectedActivities, setSelectedActivities] = useState({});
  const [selectedHotel, setSelectedHotel] = useState(null);
  const { destinationId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { createTrip } = useTrips();

  const { destination } = useDestinations(destinationId);

  const { startDate, endDate, travelType } = location.state;
  const start = DateTime.fromISO(startDate);
  const end = DateTime.fromISO(endDate);

  const noOfDays = end.diff(start, "days").days;
  const handleActivitySelection = (day, activities) => {
    setSelectedActivities((prev) => ({ ...prev, [day]: activities }));
  };

  const handleHotelSelection = (hotel) => {
    setSelectedHotel(hotel);
  };

  const submitData = async () => {
    try {
      if (!selectedHotel) {
        toast.error("Please select a hotel");
        return;
      }

      if (Object.keys(selectedActivities).length === 0) {
        toast.error("Please select at least one activity");
        return;
      }

      const tripData = {
        destination: destination,
        activities: selectedActivities,
        hotel: selectedHotel, // Use the selectedHotel directly since it's already the full object
        startDate: startDate,
        endDate: endDate,
        travelType: travelType
      };

      await createTrip(tripData);
      navigate('/my-trips');
    } catch (error) {
      console.error('Error creating trip:', error);
      toast.error(error.response?.data?.message || "Failed to create trip");
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      <InfoSection
        destination={destination}
        noOfDays={noOfDays}
        travelType={travelType}
        submitData={submitData}
      />
      <Hotels
        destination={destination}
        selectedHotel={selectedHotel}
        onHotelSelect={handleHotelSelection}
      />
      <PlacesToVisit
        destination={destination}
        noOfDays={noOfDays}
        onActivitySelect={handleActivitySelection}
        selectedActivities={selectedActivities}
      />
    </div>
  );
}
