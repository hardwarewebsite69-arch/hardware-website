import Link from "next/link";
import { AdminShell } from "@/components/AdminShell";
import { fallbackCategories } from "@/lib/fallback-data";
import { getCategories } from "@/lib/catalog";

export default async function Page() {
  const dbCategories = await getCategories();
  const categories = dbCategories.length ? dbCategories : fallbackCategories;

  return (
    <AdminShell active="/admin/categories" title="Categories" subtitle="Catalog grouping and storefront navigation">
      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((category) => (
          <article className="rounded border border-slate-200 bg-white p-5" key={category.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-950">{category.name}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{category.description}</p>
              </div>
              <span className="rounded bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">#{category.sort_order}</span>
            </div>
            <Link className="mt-4 inline-flex text-sm font-bold text-orange-700" href={`/shop/${category.slug}`}>Open category</Link>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
