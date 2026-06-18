"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { saveCategoryAction, uploadImageAction } from "@/lib/catalog";
import type { Category } from "@/lib/types";
import type { CloudinaryUploadResult } from "@/lib/cloudinary";

interface CategoryFormProps {
  initialData?: Category;
}

export function CategoryForm({ initialData }: CategoryFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  // Image state — single image for category cover
  const [image, setImage] = useState<CloudinaryUploadResult | null>(
    initialData?.image_url && initialData?.image_public_id
      ? {
          url: initialData.image_url,
          public_id: initialData.image_public_id,
          metadata: {},
        }
      : null
  );
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const result = await uploadImageAction(file);
      setImage(result);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = (formData.get("description") as string) || null;
    const sortOrderStr = formData.get("sort_order") as string;
    const is_active = formData.get("is_active") === "true";

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    const sort_order = parseInt(sortOrderStr, 10) || 0;

    try {
      await saveCategoryAction(
        {
          id: initialData?.id,
          name,
          slug,
          description,
          sort_order,
          is_active,
          // Pass existing image data if no new upload happened
          image_url: image?.url ?? initialData?.image_url ?? null,
          image_public_id: image?.public_id ?? initialData?.image_public_id ?? null,
        },
        // Only pass uploadedImage if it differs from the initial one
        image && image.public_id !== initialData?.image_public_id ? image : null
      );
      router.push("/admin/categories");
      router.refresh();
    } catch (error) {
      console.error("Failed to save category:", error);
      alert("Error saving category. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const isEditMode = !!initialData;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold text-slate-900">Basic Information</h2>

        {/* Category Name */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
            Category Name *
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            defaultValue={initialData?.name ?? ""}
            placeholder="e.g., Fasteners & Screws"
            className="w-full rounded-md border border-slate-300 px-4 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>

        {/* Sort Order */}
        <div className="mb-6">
          <label htmlFor="sort_order" className="block text-sm font-medium text-slate-700 mb-2">
            Display Priority (Sort Order)
          </label>
          <input
            type="number"
            name="sort_order"
            id="sort_order"
            min="0"
            defaultValue={initialData?.sort_order ?? 0}
            placeholder="0"
            className="w-full rounded-md border border-slate-300 px-4 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
          <p className="mt-1 text-xs text-slate-400">
            Lower numbers take front placement priority inside store menus.
          </p>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
            Description Summary
          </label>
          <textarea
            name="description"
            id="description"
            rows={4}
            defaultValue={initialData?.description ?? ""}
            placeholder="Briefly describe what kind of inventory items fall under this category..."
            className="w-full rounded-md border border-slate-300 px-4 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 resize-none"
          />
        </div>

        {/* Status */}
        <div>
          <label htmlFor="is_active" className="block text-sm font-medium text-slate-700 mb-2">
            Navigation Visibility
          </label>
          <select
            name="is_active"
            id="is_active"
            defaultValue={initialData?.is_active?.toString() ?? "true"}
            className="w-full rounded-md border border-slate-300 px-4 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white"
          >
            <option value="true">Active (Exposed inside search filters and menus)</option>
            <option value="false">Hidden (Draft / Archived state)</option>
          </select>
        </div>
      </div>

      {/* Category Image */}
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Category Image</h2>
          <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500">
            Cover image for category card
          </span>
        </div>

        <div className="flex gap-4">
          {/* Image Preview */}
          {image && (
            <div className="group relative aspect-square w-40 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-sm">
              <Image src={image.url} alt="Category preview" fill className="object-cover" />
              <button
                type="button"
                onClick={removeImage}
                className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 opacity-0 shadow-sm transition-all hover:border-red-100 hover:text-red-600 group-hover:opacity-100"
                title="Remove image"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {/* Upload Trigger */}
          {!image && (
            <label
              className={`relative flex aspect-square w-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
                isUploading
                  ? "border-slate-200 bg-slate-50"
                  : "border-slate-300 bg-white hover:border-orange-400 hover:bg-slate-50"
              }`}
            >
              {isUploading ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-600 border-t-transparent" />
                  <span className="text-xs font-medium text-slate-500">Uploading...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1 text-slate-500">
                  <svg className="h-8 w-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                disabled={isUploading}
                className="hidden"
              />
            </label>
          )}
        </div>

        {!image && !isUploading && (
          <p className="mt-4 rounded-lg border border-dashed border-slate-200 bg-slate-50 py-3 text-center text-sm text-slate-500">
            No image uploaded. Add a cover image for this category.
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pb-6">
        <Link
          href="/admin/categories"
          className="rounded-md border border-slate-300 bg-white px-6 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 rounded-md bg-orange-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          )}
          {isEditMode ? "Save Changes" : "Save Category"}
        </button>
      </div>
    </form>
  );
}
