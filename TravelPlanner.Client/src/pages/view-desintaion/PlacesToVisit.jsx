import React from 'react';
import ActivityCardItem from './ActivityCardItem';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

export default function PlacesToVisit({ destination, selectedActivities, onActivitySelect }) {
  const MAX_ACTIVITIES_PER_DAY = 3;

  const handleActivitySelect = (day, activity) => {
    const currentDayActivities = selectedActivities[day] || [];
    let updatedActivities;

    if (currentDayActivities.find((a) => a.place === activity.place)) {
        
      updatedActivities = currentDayActivities.filter((a) => a.place !== activity.place);
    } else if (currentDayActivities.length < MAX_ACTIVITIES_PER_DAY) {

      updatedActivities = [...currentDayActivities, activity];
    } else {
      updatedActivities = currentDayActivities;
    }

    onActivitySelect(day, updatedActivities);
  };

  return (
    <div className="mt-5">
      <h2 className="font-bold text-lg">Places to Visit</h2>
      <div>
        {destination?.itinerary?.map((item, index) => (
          <div key={index}>
            <Accordion type="single" collapsible>
              <AccordionItem value={`day-${item.day}`}>
                <AccordionTrigger className="flex flex-row justify-between w-full shadow-md p-2 px-5 rounded-lg">
                  <h2 className="font-bold text-lg">Day {item.day}</h2>
                  {selectedActivities[item.day]?.length === MAX_ACTIVITIES_PER_DAY && (
                    <div className="text-sm text-gray-500 mt-2">
                      You have selected the maximum of {MAX_ACTIVITIES_PER_DAY} activities for this day.
                    </div>
                  )}
                  <ChevronDown />
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid md:grid-cols-2 gap-5 my-4">
                    {item?.activities?.map((activity, index) => {
                      const isSelected = selectedActivities[item.day]?.find(
                        (a) => a.place === activity.place
                      );
                      const isDisabled =
                        !isSelected &&
                        selectedActivities[item.day]?.length === MAX_ACTIVITIES_PER_DAY;

                      return (
                        <div
                          key={index}
                          onClick={
                            isDisabled ? undefined : () => handleActivitySelect(item.day, activity)
                          }
                        >
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
