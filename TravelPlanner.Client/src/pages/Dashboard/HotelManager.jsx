import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import HotelForm from "./components/forms/HotelForm";

export default function HotelManager({ destination }) {
  const [hotels, setHotels] = useState(destination.hotels || []);
  const [editingHotel, setEditingHotel] = useState(null);

  const handleAddHotel = (formData) => {
    const newHotel = {
      id: hotels.length + 1,
      destinationId: destination.id,
      ...formData,
    };

    setHotels((prev) => [...prev, newHotel]);
  };

  const handleEditHotel = (formData) => {
    setHotels((prev) =>
      prev.map((hotel) =>
        hotel.id === editingHotel.id ? { ...hotel, ...formData } : hotel
      )
    );
    setEditingHotel(null);
  };

  const handleDeleteHotel = (hotelId) => {
    setHotels((prev) => prev.filter((hotel) => hotel.id !== hotelId));
    destination.hotels = hotels.filter((hotel) => hotel.id !== hotelId);
  };

  return (
    <div className="space-y-6">
      <Dialog onOpenChange={(open) => !open && setEditingHotel(null)}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Hotel
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingHotel ? "Edit Hotel" : "Add New Hotel"}
            </DialogTitle>
            <DialogDescription>
              {editingHotel
                ? "Update hotel details"
                : `Add a new hotel to ${destination.name}`}
            </DialogDescription>
          </DialogHeader>
          <HotelForm
            hotel={editingHotel}
            onSubmit={editingHotel ? handleEditHotel : handleAddHotel}
            isEditing={!!editingHotel}
          />
        </DialogContent>
      </Dialog>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {hotels.map((hotel) => (
          <Card key={hotel.id}>
            <CardHeader>
              <CardTitle>{hotel.name}</CardTitle>
              <CardDescription>{hotel.address}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video mb-4">
                <img
                  src={`http://localhost:5120${hotel.imageUrl}`}
                  alt={hotel.name}
                  className="rounded-lg object-cover w-full h-full"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="flex justify-between items-center text-white">
                    <span className="font-semibold">
                      ${hotel.pricePerNight}/night
                    </span>
                    <div className="flex items-center gap-1">
                      <span>★</span>
                      <span>{hotel.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {hotel.description}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setEditingHotel(hotel);
                    document.querySelector('[role="dialog"] button').click();
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleDeleteHotel(hotel.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
