import { getCategories } from "@/lib/catalog";
import { AdminShell } from "@/components/AdminShell";
import { ProductForm } from "@/components/ProductForm";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <AdminShell active="/admin/products" title="Add New Product" subtitle="Fill in the details below to create a new product entry in the inventory.">
      <div className="max-w-4xl">
        <ProductForm categories={categories} />
      </div>
    </AdminShell>
  );
}
