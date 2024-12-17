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
import ActivityForm from "./components/forms/ActivityForm";

export default function ActivityManager({ destination }) {
  const [activities, setActivities] = useState(destination.activities || []);
  const [editingActivity, setEditingActivity] = useState(null);

  const handleAddActivity = async (formData) => {
    const newActivity = {
      id: activities.length + 1,
      destinationId: destination.id,
      ...formData,
    };

    try{
      const response = await apiClient.post("activities", newActivity)
      console.log(response.data)
      setActivities((prev) => [...prev, response.data]);
    }catch(error){
      console.log(error)
    }

    setActivities((prev) => [...prev, newActivity]);
    destination.activities = [...activities, newActivity];
  };

  const handleEditActivity = (formData) => {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === editingActivity.id
          ? { ...activity, ...formData }
          : activity
      )
    );
    setEditingActivity(null);
  };

  const handleDeleteActivity = (activityId) => {
    setActivities((prev) =>
      prev.filter((activity) => activity.id !== activityId)
    );
    destination.activities = activities.filter(
      (activity) => activity.id !== activityId
    );
  };

  return (
    <div className="space-y-6">
      <Dialog onOpenChange={(open) => !open && setEditingActivity(null)}>
        <DialogTrigger asChild>
          <Button>
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
            onSubmit={editingActivity ? handleEditActivity : handleAddActivity}
            isEditing={!!editingActivity}
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
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="text-white font-semibold">
                    ${activity.price}
                  </div>
                </div>
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
                    document.querySelector('[role="dialog"] button').click();
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleDeleteActivity(activity.id)}
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
