import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "./ImageUpload";

export default function DestinationForm({
  destination,
  onSubmit,
  isEditing = false,
}) {

  const [formData, setFormData] = useState(
    destination || {
      name: "",
      description: "",
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
            <Label htmlFor="name">Destination Name</Label>
            <Input
              id="name"
              required
              placeholder="e.g., Paris"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            required
            placeholder="Describe the destination..."
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label>Destination Image</Label>
          <ImageUpload
            value={formData.imageFile ? URL.createObjectURL(formData.imageFile) : null}
            onChange={(file) =>
              setFormData((prev) => ({ ...prev, imageFile: file }))
            }
            onRemove={() => setFormData((prev) => ({ ...prev, imageFile: null }))}
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        {isEditing ? "Update Destination" : "Create Destination"}
      </Button>
    </form>
  );
}
