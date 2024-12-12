import React, { useEffect, useState } from 'react'
import ActivityCardItem from './ActivityCardItem'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion'
import { ArrowDown, ChevronDown, ChevronsDown } from 'lucide-react'

export default function PlacesToVisit({destination,noOfDays}) {
    const [activities,setActivities] = useState()
    
    useEffect(()=>{
        const days = new Array(noOfDays)
        setActivities(days.map(day => ({activityId1:"",activityId2:"",activityId3:""})))    
    },[])

    useEffect(()=>{
        console.log(activities)
        console.log(noOfDays)
    },[activities])
    // function handleSelectActivity(day,activity){
    //     setActivities((prevState)=>(
           
    //     ))
    // }

  return (
    <div className='mt-5'>
        <h2 className='font-bold text-lg'>Places to Visit</h2>
        <div>
            {destination?.itinerary?.map((item,index) => (
                <div key={index}>
                    <Accordion type='single' collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className='flex flex-row justify-between w-full shadow-md p-2 px-5 rounded-lg'>
                                <h2 className='font-bold text-lg'>Day {item.day}</h2>
                                <ChevronDown/>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className='grid md:grid-cols-2 gap-5 my-4'>
                                    {item?.activities?.map((activity,index) => (
                                        <div className='' key={index}>
                                            <h2 className='font-medium text-sm text-orange-600'>{activity.time}</h2>
                                            <ActivityCardItem activity={activity }  />
                                        </div>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            ))}
        </div>
    </div>
  )
}
