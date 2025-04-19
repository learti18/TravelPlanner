import { useState, useEffect } from 'react';

export function useItinerary(activities, noOfDays) {
  const [itineraries, setItineraries] = useState([]);

  useEffect(() => {
    if (activities && activities.length > 0) {
      const generateItineraries = () => {
        let itineraries = [];
        for (let day = 1; day <= noOfDays; day++) {
          let availableActivities = [...activities];
          let dayActivities = [];

          for (let j = 0; j < 5 && availableActivities.length > 0; j++) {
            const randomIndex = Math.floor(Math.random() * availableActivities.length);
            const selectedActivity = availableActivities.splice(randomIndex, 1)[0];
            if (selectedActivity) {
              dayActivities.push(selectedActivity);
            }
          }

          itineraries.push({ day, activities: dayActivities });
        }
        return itineraries;
      };

      setItineraries(generateItineraries());
    }
  }, [activities, noOfDays]);

  return { itineraries };
}
