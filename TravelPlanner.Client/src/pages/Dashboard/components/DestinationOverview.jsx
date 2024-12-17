import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Calendar, CircleDollarSign } from "lucide-react";

export default function DestinationOverview({ destination }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Location</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{destination.name}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Season</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Spring</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Budget</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,200</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Popular Hotels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {destination.hotels.slice(0, 3).map((hotel) => (
                <div key={hotel.id} className="flex items-center gap-4">
                  <img
                    src={`http://localhost:5120${hotel.imageUrl}`}
                    alt={hotel.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{hotel.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      ${hotel.pricePerNight}/night
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {destination.activities.slice(0, 3).map((activity) => (
                <div key={activity.id} className="flex items-center gap-4">
                  <img
                    src={`http://localhost:5120${activity.imageUrl}`}
                    alt={activity.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{activity.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      ${activity.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
