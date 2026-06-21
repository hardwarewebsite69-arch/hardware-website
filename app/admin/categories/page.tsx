import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/AdminShell";
import { fallbackCategories } from "@/lib/fallback-data";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { getCategories, deleteCategory } from "@/lib/catalog";
import { DeleteCategoryButton } from "@/components/DeleteCategoryButton";

export default async function Page() {
  const supabase = createClient(await cookies());
  const dbCategories = await getCategories(supabase);
  const categories = dbCategories;

  // Server Action to handle item deletion safely from the dashboard context
  async function handleDelete(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (id) {
      await deleteCategory(id);
      redirect("/admin/categories");
    }
  }

  return (
    <AdminShell active="/admin/categories" title="Categories" subtitle="Catalog grouping and storefront navigation">
      {/* Top action header bar */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">All Categories ({categories.length})</h2>
        <Link 
          href="/admin/categories/new" 
          className="rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 transition-colors"
        >
          Create Category
        </Link>
      </div>

      {categories.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
          <span className="material-symbols-outlined text-4xl text-slate-300 mb-4 block">category</span>
          <p className="text-sm font-semibold text-slate-700">No categories found</p>
          <p className="text-xs text-slate-500 mt-1">Get started by creating a new category for your inventory catalog.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {categories.map((category) => (
            <article className="flex flex-col justify-between rounded border border-slate-200 bg-white p-5 shadow-sm" key={category.id}>
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* Category Image Thumbnail */}
                    {category.image_url ? (
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                        <Image src={category.image_url} alt={category.name} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50">
                        <span className="material-symbols-outlined text-xl text-slate-300">image</span>
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-extrabold text-slate-950">{category.name}</h2>
                        {!category.is_active && (
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">Hidden</span>
                        )}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{category.description ?? "No description provided."}</p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">Pos #{category.sort_order}</span>
                </div>
              </div>

              {/* Admin Management Actions Panel */}
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <Link className="text-sm font-bold text-orange-700 hover:underline" href={`/shop/${category.slug}`}>
                  View Products
                </Link>
                
                <div className="flex items-center gap-4">
                  <Link 
                    className="text-sm font-medium text-slate-600 hover:text-slate-900" 
                    href={`/admin/categories/new?id=${category.id}`}
                  >
                    Edit
                  </Link>
                  
                  <DeleteCategoryButton id={category.id} onDeleteAction={handleDelete} />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </AdminShell>
  );
}