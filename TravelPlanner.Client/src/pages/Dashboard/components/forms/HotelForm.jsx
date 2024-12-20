import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { ImageUpload } from "./ImageUpload";

const RatingStars = ({ rating, onHover, onSelect, interactive = false }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 transition-colors duration-150 ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-muted text-muted"
          } ${
            interactive &&
            "cursor-pointer hover:fill-yellow-200 hover:text-yellow-200"
          }`}
          onMouseEnter={() => interactive && onHover?.(star)}
          onClick={() => interactive && onSelect?.(star)}
        />
      ))}
    </div>
  );
};

export default function HotelForm({ hotel, onSubmit, isEditing = false ,destinationId}) {
  const [formData, setFormData] = useState(
    hotel || {
      name: "",
      address: "",
      price: "",
      rating: 0,
      imageFile: null,
    }
  );
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingSelect = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating: rating,
    }));
    setHoverRating(0);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Hotel Name</Label>
            <Input
              id="name"
              required
              placeholder="e.g., Grand Hotel"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <div className="flex items-center gap-4 p-2 border rounded-md">
              <RatingStars
                rating={hoverRating || parseInt(formData.rating) || 0}
                onHover={setHoverRating}
                onSelect={handleRatingSelect}
                interactive={true}
              />
              <span className="text-sm text-muted-foreground">
                {hoverRating || formData.rating || "Select rating"}
                {(hoverRating || formData.rating) && " Stars"}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            required
            placeholder="Enter hotel address"
            value={formData.address}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, address: e.target.value }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price per Night ($)</Label>
          <Input
            id="price"
            type="number"
            required
            placeholder="e.g., 200"
            value={formData.price}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                price: e.target.value,
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Hotel Image</Label>
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
        {isEditing ? "Update Hotel" : "Add Hotel"}
      </Button>
    </form>
  );
}
