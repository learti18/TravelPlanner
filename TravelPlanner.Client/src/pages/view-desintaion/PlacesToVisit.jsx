import React, { useEffect, useState } from 'react';
import ActivityCardItem from './ActivityCardItem';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import useActivities from '@/hooks/useActivities';
import { useItinerary } from '@/hooks/useItinerary';
import { DateTime } from 'luxon';

export default function PlacesToVisit({ destination, noOfDays, selectedActivities, onActivitySelect }) {
  const MAX_ACTIVITIES_PER_DAY = 3;
  const { activities } = useActivities(destination.id);
  const {itineraries} = useItinerary(activities, noOfDays);

  const handleActivitySelect = (day, activity) => {
    const currentDaySelections = selectedActivities[day] || [];
    const isAlreadySelected = currentDaySelections.some((a) => a.name === activity.name);

    let updatedDaySelections;
    if (isAlreadySelected) {
      updatedDaySelections = currentDaySelections.filter((a) => a.name !== activity.name);
    } else if (currentDaySelections.length < MAX_ACTIVITIES_PER_DAY) {
      updatedDaySelections = [...currentDaySelections, activity];
    } else {
      return;
    }

    onActivitySelect(day, updatedDaySelections); 
  };

  return (
    <div className="mt-5">
      <h2 className="font-bold text-lg">Choose up to 3 activities per day for each day of your trip!</h2>
      <div>
        {itineraries.map((dayPlan) => (
          <div key={dayPlan.day}>
            <Accordion type="single" collapsible>
              <AccordionItem value={`day-${dayPlan.day}`}>
                <AccordionTrigger className="flex flex-row justify-between w-full shadow-md p-2 px-5 rounded-lg">
                  <h2 className="font-bold text-lg">Day {dayPlan.day}</h2>
                  {selectedActivities[dayPlan.day]?.length === MAX_ACTIVITIES_PER_DAY && (
                    <div className="text-sm text-gray-500 mt-2">
                      You have selected the maximum of {MAX_ACTIVITIES_PER_DAY} activities for this day.
                    </div>
                  )}
                  <ChevronDown />
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid md:grid-cols-2 gap-5 my-4">
                    {dayPlan.activities.map((activity, index) => {
                      const isSelected = selectedActivities[dayPlan.day]?.some(
                        (a) => a.name === activity.name
                      );

                      const isDisabled =
                        !isSelected &&
                        selectedActivities[dayPlan.day]?.length === MAX_ACTIVITIES_PER_DAY;

                      return (
                        <div
                          key={index}
                          onClick={() => {
                            if (!isDisabled) {
                              handleActivitySelect(dayPlan.day, activity);
                            }
                          }}
                        >
                          <p className='text-orange-400 font-semibold'>  
                            {DateTime.fromISO(activity.time).toFormat('HH:mm')}
                          </p>
                          <ActivityCardItem
                            activity={activity}
                            isSelected={isSelected}
                            isDisabled={isDisabled}
                          />
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}
