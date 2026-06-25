import { getCategories, getProductImages } from "@/lib/catalog";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/AdminShell";
import { ProductForm } from "@/components/ProductForm";
import type { CloudinaryUploadResult } from "@/lib/cloudinary";

interface EditPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ redirect?: string }>;
}

export default async function EditProductPage({ params, searchParams }: EditPageProps) {
  const categories = await getCategories();

  const { id } = await params;
  const { redirect } = await searchParams;
  const supabase = createClient(await cookies());

  const [productResponse, dbImages] = await Promise.all([
    supabase.from("products").select("*").eq("id", id).single(),
    getProductImages(id),
  ]);

  const product = productResponse.data;

  if (!product) {
    notFound();
  }

  const initialImages: CloudinaryUploadResult[] = dbImages.map((img) => ({
    url: img.url,
    public_id: img.public_id,
    metadata: img.metadata || {},
  }));

  return (
    <AdminShell active="/admin/products" title="Edit Product" subtitle="Update the product details below.">
      <div className="max-w-4xl">
        <ProductForm categories={categories} initialData={product} initialImages={initialImages} redirectTo={redirect} />
      </div>
    </AdminShell>
  );
}

