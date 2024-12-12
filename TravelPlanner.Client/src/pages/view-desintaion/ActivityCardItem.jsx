import React from 'react'

export default function ActivityCardItem({activity}) {
  return (
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all cursor-pointer hover:shadow-md'>
        <img src={activity?.image} className='w-[130px] h-[130px] rounded-xl'/>
        <div>
            <h2 className='font-bold text-lg'>{activity.place}</h2>
            <p className='text-sm text-gray-400'>{activity.description}</p>
            {/* <Button size="sm" font="sm">
                Add activity
                <CirclePlus size={18}/>
            </Button> */}
        </div>
    </div>
  )
}
