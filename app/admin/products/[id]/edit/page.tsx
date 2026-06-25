import Link from "next/link";
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
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4" aria-label="Breadcrumb">
        <Link href="/admin/dashboard" className="hover:text-slate-900 font-medium transition-colors">
          Dashboard
        </Link>
        <svg className="h-3.5 w-3.5 text-slate-300" viewBox="0 0 16 16" fill="currentColor">
          <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z" clipRule="evenodd" />
        </svg>
        <Link href="/admin/products" className="hover:text-slate-900 font-medium transition-colors">
          Products
        </Link>
        <svg className="h-3.5 w-3.5 text-slate-300" viewBox="0 0 16 16" fill="currentColor">
          <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z" clipRule="evenodd" />
        </svg>
        <span className="text-slate-400 font-mono">{product.name}</span>
      </nav>
      <div className="max-w-4xl">
        <ProductForm categories={categories} initialData={product} initialImages={initialImages} redirectTo={redirect} />
      </div>
    </AdminShell>
  );
}

