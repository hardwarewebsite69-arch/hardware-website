import Link from "next/link";
import { AdminShell } from "@/components/AdminShell";
import { CategoryForm } from "@/components/CategoryForm";
import { getAllCategories } from "@/lib/catalog";

interface PageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function NewCategoryPage({ searchParams }: PageProps) {
  const { id } = await searchParams;

  // Fetch existing category if editing
  let existingCategory = null;
  if (id) {
    const categories = await getAllCategories();
    existingCategory = categories.find((c) => c.id === id) || null;
  }

  const isEditMode = !!existingCategory;

  return (
    <AdminShell
      active="/admin/categories"
      title={isEditMode ? "Modify Category" : "Create New Category"}
      subtitle={
        isEditMode
          ? `Updating fields for "${existingCategory?.name}"`
          : "Organize your storefront collections with a distinct structural hub"
      }
    >
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4" aria-label="Breadcrumb">
        <Link href="/admin/dashboard" className="hover:text-slate-900 font-medium transition-colors">
          Dashboard
        </Link>
        <svg className="h-3.5 w-3.5 text-slate-300" viewBox="0 0 16 16" fill="currentColor">
          <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z" clipRule="evenodd" />
        </svg>
        <Link href="/admin/categories" className="hover:text-slate-900 font-medium transition-colors">
          Categories
        </Link>
        <svg className="h-3.5 w-3.5 text-slate-300" viewBox="0 0 16 16" fill="currentColor">
          <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z" clipRule="evenodd" />
        </svg>
        <span className="text-slate-400 font-mono">{isEditMode ? existingCategory?.name : "New"}</span>
      </nav>
      <div className="max-w-2xl">
        <CategoryForm initialData={existingCategory ?? undefined} />
      </div>
    </AdminShell>
  );
}