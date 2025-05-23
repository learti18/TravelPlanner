import React, { useCallback } from "react";
import { ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";

export function ImageUpload({ value, onChange, onRemove }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        // Create a new File object to ensure consistency
        const imageFile = new File([file], file.name, {
          type: file.type,
          lastModified: file.lastModified,
        });
        
        // Create URL for preview
        const imageUrl = URL.createObjectURL(imageFile);
        
        // Pass both the file and preview URL
        onChange(imageFile);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  return (
    <div className="space-y-4">
      {value ? (
        <div className="relative">
          <img
            src={typeof value === 'string' ? value : URL.createObjectURL(value)}
            alt="Preview"
            className="rounded-lg w-full h-[200px] object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={onRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 transition cursor-pointer
            ${
              isDragActive
                ? "border-primary bg-primary/10"
                : "border-muted-foreground/25 hover:bg-muted/50"
            }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="p-3 rounded-full bg-muted">
              <ImagePlus className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="font-medium text-sm">
                Drop your image here, or click to select
              </p>
              <p className="text-xs text-muted-foreground">
                Maximum file size: 5MB
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
