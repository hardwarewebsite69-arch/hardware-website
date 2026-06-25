import Link from "next/link";
import { getCategories } from "@/lib/catalog";
import { AdminShell } from "@/components/AdminShell";
import { ProductForm } from "@/components/ProductForm";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <AdminShell active="/admin/products" title="Add New Product" subtitle="Fill in the details below to create a new product entry in the inventory.">
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
        <span className="text-slate-400 font-mono">New</span>
      </nav>
      <div className="max-w-4xl">
        <ProductForm categories={categories} />
      </div>
    </AdminShell>
  );
}
