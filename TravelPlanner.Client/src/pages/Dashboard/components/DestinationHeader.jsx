import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DestinationHeader({ destination, onBack }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <div>
          <h2 className="text-2xl font-bold">{destination.name}</h2>
          <p className="text-muted-foreground">{destination.description}</p>
        </div>
      </div>

      <div className="relative h-[300px] rounded-xl overflow-hidden">
        <img
          src={`http://localhost:5120${destination.imageUrl}`}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex gap-4">
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3">
              <span className="text-2xl font-bold block">
                {destination.hotels.length}
              </span>
              <span className="text-sm opacity-80">Hotels</span>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3">
              <span className="text-2xl font-bold block">
                {destination.activities.length}
              </span>
              <span className="text-sm opacity-80">Activities</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
