import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Hotel, Compass, Users } from "lucide-react";

export default function DashboardOverview() {
  const stats = [
    {
      title: "Total Destinations",
      value: "12",
      icon: <MapPin className="h-6 w-6" />,
      description: "Active destinations",
    },
    {
      title: "Total Hotels",
      value: "48",
      icon: <Hotel className="h-6 w-6" />,
      description: "Across all destinations",
    },
    {
      title: "Total Activities",
      value: "156",
      icon: <Compass className="h-6 w-6" />,
      description: "Available activities",
    },
    {
      title: "Total Bookings",
      value: "2,345",
      icon: <Users className="h-6 w-6" />,
      description: "Trip bookings",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Dashboard Overview
        </h2>
        <p className="text-muted-foreground">
          Your travel business at a glance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Destinations</CardTitle>
          </CardHeader>
          <CardContent>{/* Add recent destinations list */}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>{/* Add recent bookings list */}</CardContent>
        </Card>
      </div>
    </div>
  );
}
