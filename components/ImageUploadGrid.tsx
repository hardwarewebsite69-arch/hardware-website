"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { uploadImageAction } from "@/lib/catalog";
import type { CloudinaryUploadResult } from "@/lib/cloudinary";

interface ImageUploadGridProps {
  initialImages?: CloudinaryUploadResult[];
  onImagesChange: (images: CloudinaryUploadResult[]) => void;
}

export function ImageUploadGrid({ initialImages = [], onImagesChange }: ImageUploadGridProps) {
  const [images, setImages] = useState<CloudinaryUploadResult[]>(initialImages);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newFiles = Array.from(files);
    
    try {
      const uploadPromises = newFiles.map(file => uploadImageAction(file));
      const results = await Promise.all(uploadPromises);
      
      const updatedImages = [...images, ...results];
      setImages(updatedImages);
      onImagesChange(updatedImages);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload one or more images.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = (public_id: string) => {
    // Note: To delete from Cloudinary immediately, add a call to a deletion Server Action here.
    // Example: await deleteFromCloudinaryAction(public_id);
    
    const updatedImages = images.filter(img => img.public_id !== public_id);
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {images.map((image) => (
          <div key={image.public_id} className="relative group aspect-square rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
            <Image 
              src={image.url} 
              alt="Preview" 
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(image.public_id)}
              className="absolute top-2 right-2 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-red-600 hover:border-red-100 shadow-sm transition-all opacity-0 group-hover:opacity-100 z-10"
              title="Remove image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}

        {/* Upload Trigger */}
        {images.length < 5 && (
          <label className={`
            relative aspect-square flex flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors cursor-pointer
            ${isUploading ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-300 hover:bg-slate-50 hover:border-orange-400'}
          `}>
            {isUploading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-medium text-slate-500">Uploading...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1 text-slate-500">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-xs font-medium">Add Image</span>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              multiple
              disabled={isUploading}
              className="hidden"
            />
          </label>
        )}
      </div>

      {images.length === 0 && !isUploading && (
        <p className="text-sm text-slate-500 text-center py-4 bg-slate-50 rounded-lg border border-dashed border-slate-200">
          No images uploaded yet. Up to 5 images allowed.
        </p>
      )}
    </div>
  );
}
