import { redirect } from "next/navigation";
import Link from "next/link";
import { AdminShell } from "@/components/AdminShell";
import { getCategories, upsertProduct } from "@/lib/catalog";

export default async function NewProductPage() {
  const categories = await getCategories();

  // Next.js Server Action to handle form submission securely
  async function handleCreateProduct(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const category_id = formData.get("category_id") as string;
    const sku = formData.get("sku") as string || null;
    const description = formData.get("description") as string || null;
    const priceStr = formData.get("price") as string;
    const request_price = formData.get("request_price") === "true";
    const is_active = formData.get("is_active") === "true";

    // Sluggify product name (e.g., "Heavy Duty Bearing 200" -> "heavy-duty-bearing-200")
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
    });

    // Bounce back out to inventory dashboard instantly
    redirect("/admin/products");
  }

  return (
    <AdminShell active="/admin/products" title="Create New Product" subtitle="Add a brand-new item to your digital storefront catalog">
      <div className="max-w-2xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <form action={handleCreateProduct} className="space-y-6">
          
          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">Product Name *</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="e.g., Industrial Ball Bearing Grade 5"
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Category Dropdown */}
            <div>
              <label htmlFor="category_id" className="block text-sm font-medium text-slate-700">Category *</label>
              <select
                name="category_id"
                id="category_id"
                required
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white"
              >
                <option value="">Select a Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* SKU Input */}
            <div>
              <label htmlFor="sku" className="block text-sm font-medium text-slate-700">SKU / Model Number</label>
              <input
                type="text"
                name="sku"
                id="sku"
                placeholder="e.g., BRG-1029-X"
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Pricing Config block */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 bg-slate-50 p-4 rounded-md border border-slate-100">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-slate-700">Base Unit Price</label>
              <input
                type="number"
                name="price"
                id="price"
                step="0.01"
                min="0"
                placeholder="0.00"
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div>
              <label htmlFor="request_price" className="block text-sm font-medium text-slate-700">Pricing Toggle</label>
              <select
                name="request_price"
                id="request_price"
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white"
              >
                <option value="false">Show standard price listed on left</option>
                <option value="true">Hide price & display &quot;Request Quote&quot;</option>
              </select>
            </div>
          </div>

          {/* Product Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
            <textarea
              name="description"
              id="description"
              rows={4}
              placeholder="Provide functional specifications, compatibility notes, or sizing charts..."
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          {/* Visibility Controls */}
          <div>
            <label htmlFor="is_active" className="block text-sm font-medium text-slate-700">Store Visibility</label>
            <select
              name="is_active"
              id="is_active"
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white"
            >
              <option value="true">Active (Visible immediately across the catalog)</option>
              <option value="false">Draft / Hidden (Save but don&apos;t publish yet)</option>
            </select>
          </div>

          {/* Form Form Submission Actions */}
          <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
            <Link
              href="/admin/products"
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500"
            >
              Publish Product
            </button>
          </div>

        </form>
      </div>
    </AdminShell>
  );
}