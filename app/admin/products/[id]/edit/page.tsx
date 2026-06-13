import { getCategories } from "@/lib/catalog";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/AdminShell";
import { ProductForm } from "@/components/ProductForm";

interface EditPageProps {
  params: Promise<{ id: string }>;
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
      <div className="max-w-4xl">
        <ProductForm categories={categories} initialData={product} />
      </div>
    </AdminShell>
  );
}
