import React from 'react'
import { CalendarDays, CircleDollarSign, Users,Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function InfoSection({destination,noOfDays,travelType}) {
  return (
    <div>
        <img src="/images/placeholder.jpg" alt="" className='h-[360px] w-full object-cover rounded-xl' />
        
        <div className='flex justify-between items-center'>
          <div className='my-5 flex flex-col gap-2'>
              <h2 className='font-bold text-2xl'>{destination.location}</h2>
              <div className='flex flex-row gap-2'>
                  <h2 className='flex items-center gap-2 p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-base'>
                    <CalendarDays size={18}/>
                    {`${noOfDays} Day${noOfDays>1 ? "s":""}`}  
                  </h2>
                  {/* <h2 className='flex items-center gap-2 p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-base'>
                    <CircleDollarSign size={18}/>
                    {destination.budget} Budget
                  </h2> */}
                  <h2 className='flex items-center gap-2 p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-base'>
                    <Users size={18} />
                    {travelType}
                  </h2>
              </div>
          </div>
          <Button>Create Trip</Button>
        </div>
    </div>
  )
}
