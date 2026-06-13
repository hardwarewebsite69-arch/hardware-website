"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ImageUploadGrid } from "./ImageUploadGrid";
import { saveProductAction } from "@/lib/catalog";
import type { Category, Product } from "@/lib/types";
import type { CloudinaryUploadResult } from "@/lib/cloudinary";

interface ProductFormProps {
  categories: Category[];
  initialData?: Product;
}

export function ProductForm({ categories, initialData }: ProductFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<CloudinaryUploadResult[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const category_id = formData.get("category_id") as string;
    const sku = formData.get("sku") as string || null;
    const description = formData.get("description") as string || null;
    const priceStr = formData.get("price") as string;
    const price = parseFloat(priceStr) || 0;

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    try {
      await saveProductAction(
        {
          id: initialData?.id,
          category_id,
          name,
          slug,
          sku,
          description,
          price,
          request_price: false,
          is_active: true,
        },
        uploadedImages
      );
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error("Failed to save product:", error);
      alert("Error saving product. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information Section */}
      <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-6">Basic Information</h2>

        {/* Product Name */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            defaultValue={initialData?.name}
            placeholder="e.g. Ergonomic Office Chair"
            className="w-full px-4 py-2 border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        {/* Category and SKU Row */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="category_id" className="block text-sm font-medium text-slate-700 mb-2">Category</label>
            <select
              name="category_id"
              id="category_id"
              required
              defaultValue={initialData?.category_id || ""}
              className="w-full px-4 py-2 border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 bg-white"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="sku" className="block text-sm font-medium text-slate-700 mb-2">SKU (Stock Keeping Unit)</label>
            <input
              type="text"
              name="sku"
              id="sku"
              defaultValue={initialData?.sku || ""}
              placeholder="e.g. FUR-CH-891"
              className="w-full px-4 py-2 border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        {/* Base Price */}
        <div className="mb-6">
          <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-2">Base Price</label>
          <div className="flex items-center">
            <span className="text-slate-500 mr-2">$</span>
            <input
              type="number"
              name="price"
              id="price"
              step="0.01"
              min="0"
              defaultValue={initialData?.price || ""}
              placeholder="0.00"
              className="flex-1 px-4 py-2 border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">Description</label>
          <textarea
            name="description"
            id="description"
            rows={5}
            defaultValue={initialData?.description || ""}
            placeholder="Detailed product description..."
            maxLength={500}
            className="w-full px-4 py-2 border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 resize-none"
          />
        </div>
      </div>

      {/* Product Images Section */}
      <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-900">Product Images</h2>
          <span className="text-xs text-slate-500 font-medium px-2 py-1 bg-slate-100 rounded">Up to 5 Images</span>
        </div>

        <ImageUploadGrid onImagesChange={setUploadedImages} />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pb-6">
        <Link
          href="/admin/products"
          className="px-6 py-2 border border-slate-300 rounded-md text-slate-700 font-medium bg-white hover:bg-slate-50 transition-colors shadow-sm"
        >
          Discard
        </Link>
        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-2 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-500 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          )}
          {initialData ? "Update Product" : "Save Product"}
        </button>
      </div>
    </form>
  );
}
