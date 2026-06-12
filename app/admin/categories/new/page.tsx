import { redirect } from "next/navigation";
import Link from "next/link";
import { AdminShell } from "@/components/AdminShell";
import { getCategories, upsertCategory } from "@/lib/catalog";

interface PageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function NewCategoryPage({ searchParams }: PageProps) {
  const { id } = await searchParams;
  
  // Try to find target category data if an edit ID query string is active
  let existingCategory = null;
  if (id) {
    const categories = await getCategories();
    // (Note: getCategories default filters by is_active, replace or create a custom query function if you need to fetch hidden ones directly)
    existingCategory = categories.find((c) => c.id === id) || null;
  }

  const isEditMode = !!existingCategory;

  // Next.js Server Action targeting single source mutation logic
  async function handleSaveCategory(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const description = formData.get("description") as string || null;
    const sortOrderStr = formData.get("sort_order") as string;
    const is_active = formData.get("is_active") === "true";

    // Sluggify category name ("Power Tools" -> "power-tools")
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    const sort_order = parseInt(sortOrderStr, 10) || 0;

    await upsertCategory({
      id: id || undefined, // Passing undefined causes Supabase to generate a new entry
      name,
      slug,
      description,
      sort_order,
      is_active,
    });

    redirect("/admin/categories");
  }

  return (
    <AdminShell 
      active="/admin/categories" 
      title={isEditMode ? "Modify Category" : "Create New Category"} 
      subtitle={isEditMode ? `Updating fields for "${existingCategory?.name}"` : "Organize your storefront collections with a distinct structural hub"}
    >
      <div className="max-w-2xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <form action={handleSaveCategory} className="space-y-6">
          
          {/* Category Display Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">Category Name *</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              defaultValue={existingCategory?.name ?? ""}
              placeholder="e.g., Fasteners & Screws"
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          {/* Sort Order Index placement */}
          <div>
            <label htmlFor="sort_order" className="block text-sm font-medium text-slate-700">Display Priority (Sort Order)</label>
            <input
              type="number"
              name="sort_order"
              id="sort_order"
              min="0"
              defaultValue={existingCategory?.sort_order ?? 0}
              placeholder="0"
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
            <p className="mt-1 text-xs text-slate-400">Lower numbers take front placement priority inside store menus.</p>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description Summary</label>
            <textarea
              name="description"
              id="description"
              rows={4}
              defaultValue={existingCategory?.description ?? ""}
              placeholder="Briefly describe what kind of inventory items fall under this umbrella category grouping..."
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          {/* Status Flag dropdown */}
          <div>
            <label htmlFor="is_active" className="block text-sm font-medium text-slate-700">Navigation Visibility</label>
            <select
              name="is_active"
              id="is_active"
              defaultValue={existingCategory?.is_active?.toString() ?? "true"}
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white"
            >
              <option value="true">Active (Exposed inside search filters and menus)</option>
              <option value="false">Hidden (Draft / Archived state)</option>
            </select>
          </div>

          {/* Form control actions row */}
          <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
            <Link
              href="/admin/categories"
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500"
            >
              {isEditMode ? "Save Changes" : "Save Category"}
            </button>
          </div>

        </form>
      </div>
    </AdminShell>
  );
}