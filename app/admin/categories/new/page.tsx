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
      <div className="max-w-2xl">
        <CategoryForm initialData={existingCategory ?? undefined} />
      </div>
    </AdminShell>
  );
}