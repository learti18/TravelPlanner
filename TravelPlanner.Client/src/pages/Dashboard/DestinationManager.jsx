import React, { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import DestinationCard from "@/components/destinations/DestinationCard";
import useDestinations from "@/hooks/useDestinations";

export default function DestinationManager() {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState(null);
  const { destinations, addDestination, updateDestination, deleteDestination, isLoading } = useDestinations();

  const handleSubmit = async (formData) => {
    try {
      if (editingDestination) {
        await updateDestination(editingDestination.id, formData);
      } else {
        await addDestination(formData);
      }
      setIsDialogOpen(false);
      setEditingDestination(null);
    } catch (error) {
      console.error('Failed to save destination:', error);
    }
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Destinations</h2>
          <p className="text-muted-foreground">Manage your travel destinations here</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingDestination(null)}>
              <Plus className="mr-2 h-4 w-4" /> Add Destination
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingDestination ? "Edit Destination" : "Add New Destination"}
              </DialogTitle>
              <DialogDescription>
                {editingDestination ? "Update destination details" : "Create a new destination for travelers"}
              </DialogDescription>
            </DialogHeader>
            <DestinationForm
              destination={editingDestination || { name: "", description: "", imageFile: null }}
              onSubmit={handleSubmit}
              isEditing={!!editingDestination}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            destination={destination}
            onEdit={(dest) => {
              setEditingDestination(dest);
              setIsDialogOpen(true);
            }}
            onDelete={deleteDestination}
            onClick={setSelectedDestination}
          />
        ))}
      </div>
    </div>
  );
}
