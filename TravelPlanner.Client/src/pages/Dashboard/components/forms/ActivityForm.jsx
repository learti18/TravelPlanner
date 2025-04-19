import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "./ImageUpload";

export default function ActivityForm({
  activity,
  onSubmit,
  isEditing = false,
  destinationId
}) {
  const [formData, setFormData] = useState(
    activity || {
      name: "",
      description: "",
      location: "",
      time: "",
      imageFile: null,
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Activity Name</Label>
            <Input
              id="name"
              required
              placeholder="e.g., City Tour"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Start Time</Label>
            <Input
              id="time"
              type="time"
              required
              value={formData.time}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, time: e.target.value }))
              }
            />
          </div>
        </div>

        <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              type="location"
              required
              value={formData.location}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, location: e.target.value }))
              }
            />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            required
            placeholder="Describe the activity..."
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label>Activity Image</Label>
          <ImageUpload
            value={formData.imageFile ? URL.createObjectURL(formData.imageFile) : null}
            onChange={(file) =>
              setFormData((prev) => ({ ...prev, imageFile: file}))
            }
            onRemove={() => setFormData((prev) => ({ ...prev, imageFile: null }))}
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        {isEditing ? "Update Activity" : "Add Activity"}
      </Button>
    </form>
  );
}
