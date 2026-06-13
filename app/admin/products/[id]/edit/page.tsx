import { getCategories, upsertProduct } from "@/lib/catalog";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AdminShell } from "@/components/AdminShell";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

async function handleCreateProduct(formData: FormData) {
  "use server";

  const name = formData.get("name") as string;
  const category_id = formData.get("category_id") as string;
  const sku = formData.get("sku") as string || null;
  const description = formData.get("description") as string || null;
  const priceStr = formData.get("price") as string;
  const request_price = formData.get("request_price") === "true";
  const is_active = formData.get("is_active") === "true";
  const featured_image_id = formData.get("featured_image_id") as string || null;

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  const price = parseFloat(priceStr) || 0;

  await upsertProduct({
    category_id,
    name,
    slug,
    sku,
    description,
    price,
    request_price,
    is_active,
    featured_image_id,
  });

  redirect("/admin/products");
}

export default async function EditProductPage({ params }: EditPageProps) {
  const categories = await getCategories();

  const { id } = await params;
  const supabase = createClient(await cookies());

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (!product) {
    notFound();
  }

  return (
    <AdminShell active="/admin/products" title="Edit Product" subtitle="Update the product details below.">
      <form action={handleCreateProduct} className="space-y-6 max-w-4xl">

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
              placeholder="e.g. Ergonomic Office Chair"
              defaultValue={product.name}
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
                defaultValue={product.category_id || ""}
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
                placeholder="e.g. FUR-CH-891"
                defaultValue={product.sku || ""}
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
                placeholder="0.00"
                defaultValue={product.price || ""}
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
              placeholder="Detailed product description..."
              maxLength={500}
              defaultValue={product.description || ""}
              className="w-full px-4 py-2 border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 resize-none"
            />
            <div className="text-right text-xs text-slate-500 mt-1">{(product.description || "").length}/500</div>
          </div>
        </div>

        {/* Product Images Section */}
        <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Product Images</h2>
            <a href="#" className="text-sm text-orange-600 hover:text-orange-700">Up to 5 Images</a>
          </div>

          {/* Upload Area */}
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-slate-900">Click to upload or drag and drop</p>
                <p className="text-sm text-slate-500 mt-1">PNG, SVG, JPG, GIF (Max 5 MB)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden fields for request_price and is_active */}
        <input type="hidden" name="request_price" value="false" />
        <input type="hidden" name="is_active" value="true" />

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
            className="px-6 py-2 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-500 transition-colors flex items-center gap-2 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Update Product
          </button>
        </div>

      </form>
    </AdminShell>
  );
}
