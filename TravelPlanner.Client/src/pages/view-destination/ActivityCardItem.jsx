import React from 'react';
import { CheckCircle, CheckCircle2 } from 'lucide-react';

export default function ActivityCardItem({ activity, isSelected, isDisabled }) {
  return (
    <div
      className={`border rounded-xl p-3 mt-2 flex gap-5 transition-all relative
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 cursor-pointer hover:shadow-md'}
        ${isSelected ? 'bg-green-50 ' : 'border-gray-300'}`}
    >
      <img
        src={`http://localhost:5000${activity.imageUrl}`}
        className="w-[130px] h-[130px] rounded-xl"
        alt={activity.place}
      />
      <div className="flex-1">
        <h2 className="font-bold text-lg">{activity.name}</h2>
        <p className="text-sm text-gray-400">{activity.description}</p>
      </div>
      {isSelected && (
        <CheckCircle2
          size={24}
          className="text-green-500 self-start mt-2 absolute bottom-3 right-3"
        />
      )}
    </div>
  );
}
