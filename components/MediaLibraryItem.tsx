"use client";

import { useState } from "react";
import { ConfirmationModal } from "./ConfirmationModal";
import { deleteMediaAction } from "@/lib/catalog";
import type { ProductImage } from "@/lib/types";

interface MediaLibraryItemProps {
  image: ProductImage;
}

export function MediaLibraryItem({ image }: MediaLibraryItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteMediaAction(image.id, image.public_id);
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete media item.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className={`
        relative group overflow-hidden rounded-lg border border-slate-200 bg-slate-50 transition-all
        ${isDeleting ? "opacity-50 grayscale" : "hover:shadow-md hover:border-orange-200"}
      `}>
        <div 
          className="aspect-square bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
          style={{ backgroundImage: `url(${image.url})` }} 
        />
        
        <div className="p-3 text-sm text-slate-700">
          <p className="truncate font-semibold text-slate-900">{image.public_id}</p>
          <p className="mt-1 text-xs text-slate-500 font-mono">ID: {image.id.split('-')[0]}...</p>
        </div>

        {/* Delete Trigger */}
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={isDeleting}
          className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full text-slate-400 hover:text-red-600 hover:border-red-100 shadow-sm transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
          title="Delete asset"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>

        {isDeleting && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-[1px]">
            <div className="w-6 h-6 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Are you sure?"
        message="This action cannot be undone. This will permanently delete the image from Cloudinary and your database."
        confirmText="Confirm Delete"
        isDestructive={true}
      />
    </>
  );
}
