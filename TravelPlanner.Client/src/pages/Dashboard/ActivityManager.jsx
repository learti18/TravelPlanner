import React, { useState, useEffect } from "react";
import { Plus, Loader2 } from "lucide-react";
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
import ActivityForm from "./components/forms/ActivityForm";
import useActivities from "@/hooks/useActivities";

export default function ActivityManager({ destination }) {
  const [editingActivity, setEditingActivity] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    activities,  
    isLoading, 
    addActivity, 
    updateActivity, 
    deleteActivity 
  } = useActivities(destination.id);

  const handleSubmit = async (formData) => {
    try {
      if (editingActivity) {
        await updateActivity(destination.id, editingActivity.id, formData);
      } else {
        await addActivity(destination.id, formData);
      }
      setIsDialogOpen(false);
      setEditingActivity(null);
    } catch (error) {
      console.error('Failed to save activity:', error);
    }
  };
  
  return (
    <div className="space-y-6">
      <Dialog 
        open={isDialogOpen} 
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingActivity(null);
        }}
      >
        <DialogTrigger asChild>
          <Button onClick={() => setEditingActivity(null)}>
            <Plus className="mr-2 h-4 w-4" /> Add Activity
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingActivity ? "Edit Activity" : "Add New Activity"}
            </DialogTitle>
            <DialogDescription>
              {editingActivity
                ? "Update activity details"
                : `Add a new activity to ${destination.name}`}
            </DialogDescription>
          </DialogHeader>
          <ActivityForm
            activity={editingActivity}
            onSubmit={handleSubmit}
            isEditing={!!editingActivity}
            destinationId={destination.id}
          />
        </DialogContent>
      </Dialog>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activities.map((activity) => (
          <Card key={activity.id}>
            <CardHeader>
              <CardTitle>{activity.name}</CardTitle>
              <CardDescription>
                {activity.time} • {activity.duration} hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video mb-4">
                <img
                  src={`http://localhost:5120${activity.imageUrl}`}
                  alt={activity.name}
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {activity.description}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setEditingActivity(activity);
                    setIsDialogOpen(true);
                  }}
                  disabled={isLoading}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex-1"
                  onClick={() => deleteActivity(destination.id,activity.id)}
                  disabled={isLoading}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {activities.length === 0 && !isLoading && (
          <div className="col-span-full text-center text-muted-foreground">
            No activities found. Add your first activity!
          </div>
        )}
      </div>
    </div>
  );
}
