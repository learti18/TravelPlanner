import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HotelManager from "../HotelManager";
import ActivityManager from "../ActivityManager";
import DestinationOverview from "./DestinationOverview";

export default function DestinationTabs({ destination }) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="hotels">Hotels</TabsTrigger>
        <TabsTrigger value="activities">Activities</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-6">
        <DestinationOverview destination={destination} />
      </TabsContent>

      <TabsContent value="hotels" className="mt-6">
        <HotelManager destination={destination} />
      </TabsContent>

      <TabsContent value="activities" className="mt-6">
        <ActivityManager destination={destination} />
      </TabsContent>
    </Tabs>
  );
}
