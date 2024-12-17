import React, { useEffect, useState } from "react";
import { Plus, ArrowLeft, ArrowRight, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import DestinationHeader from "./components/DestinationHeader";
import DestinationTabs from "./components/DestinationTabs";
import DestinationForm from "./components/forms/DestinationForm";
import apiClient from "@/services/Api";

export default function DestinationManager() {
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [newDestination, setNewDestination] = useState({
    name: "",
    description: "",
    imageFile: null,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Manage dialog visibility

  useEffect(() => {
    const getDestinations = async () => {
      const response = await apiClient.get("destinations");
      setDestinations(response.data);
    };
    getDestinations();
  }, []);

  const handleAddDestination = async (formData) => {
    try {
      const response = await apiClient.post("destinations", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      // After adding a destination, update the list
      setDestinations((prevDestinations) => [...prevDestinations, response.data]);
      setIsDialogOpen(false); // Close dialog after adding
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditDestination = (e, destination) => {
    e.stopPropagation();

    setNewDestination({
      id: destination.id,
      name: destination.name,
      description: destination.description,
      imageFile: null, 
    });
    setIsDialogOpen(true);
  };

  const handleUpdateDestination = async (formData) => {
    try {
      const response = await apiClient.put(
        `destinations/${newDestination.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("destination updated successfully", response.data);

      setDestinations((prevDestinations) =>
        prevDestinations.map((destination) =>
          destination.id === newDestination.id ? response.data : destination
        )
      );
      setIsDialogOpen(false); 
      setNewDestination({ name: "", description: "", imageFile: null });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteDestination = async (e, destinationId) => {
    e.stopPropagation();

    try {
      const response = await apiClient.delete(`destinations/${destinationId}`);
      console.log("destination deleted successfully", response.data);

      setDestinations((prevDestinations) =>
        prevDestinations.filter((destination) => destination.id !== destinationId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddNewDestinationClick = () => {
    setNewDestination({ name: "", description: "", imageFile: null });
    setIsDialogOpen(true);
  };

  if (selectedDestination) {
    return (
      <div className="space-y-8">
        <DestinationHeader
          destination={selectedDestination}
          onBack={() => setSelectedDestination(null)}
        />
        <DestinationTabs destination={selectedDestination} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Destinations</h2>
          <p className="text-muted-foreground">
            Manage your travel destinations here
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button id="destinationDialog" onClick={handleAddNewDestinationClick}>
              <Plus className="mr-2 h-4 w-4" /> Add Destination
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {newDestination.id ? "Edit Destination" : "Add New Destination"}
              </DialogTitle>
              <DialogDescription>
                {newDestination.id
                  ? "Update destination details"
                  : "Create a new destination for travelers"}
              </DialogDescription>
            </DialogHeader>
            <DestinationForm
              destination={newDestination}
              onSubmit={(formData) => {
                if (newDestination.id) {
                  handleUpdateDestination(formData); // Update the destination
                } else {
                  handleAddDestination(formData); // Add a new destination
                }
              }}
              isEditing={!!newDestination.id}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {destinations.map((destination) => (
          <Card
            key={destination.id}
            className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedDestination(destination)}
          >
            <div className="relative h-48">
              <img
                src={`http://localhost:5120${destination.imageUrl}`}
                alt={destination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 hover:scale-105"
                  onClick={(e) => handleEditDestination(e, destination)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8 hover:scale-105"
                  onClick={(e) => handleDeleteDestination(e, destination.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">
                {destination.description}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <span className="text-2xl font-bold block">
                    {destination.hotels?.length || 0}
                  </span>
                  <span className="text-xs text-muted-foreground">Hotels</span>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <span className="text-2xl font-bold block">
                    {destination.activities.length || 0}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Activities
                  </span>
                </div>
              </div>

              <Button
                variant="ghost"
                className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground"
              >
                View Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
