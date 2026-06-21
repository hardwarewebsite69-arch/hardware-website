import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { AdminShell } from "@/components/AdminShell";
import { formatPrice } from "@/lib/utils";
import { fallbackProducts } from "@/lib/fallback-data";
import { getProducts } from "@/lib/catalog";
import { DeleteProductButton } from "@/components/DeleteProductButton";

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const pageStr = (await searchParams).page;
  const currentPage = pageStr ? parseInt(pageStr, 10) : 1;
  const limit = 10;

  const supabase = createClient(await cookies());
  const { count } = await supabase
    .from("products")
    .select("id", { count: "exact", head: true });
  
  const totalCount = count ?? 0;
  const dbProducts = await getProducts({
    isActive: undefined, // fetch both active and inactive
    page: currentPage,
    limit,
  }, supabase);

  const products = dbProducts;
  const displayTotalCount = totalCount;
  const displayTotalPages = Math.ceil(displayTotalCount / limit);

  return (
    <AdminShell active="/admin/products" title="Products" subtitle="Inventory and catalog publishing">
      {/* Action Header Bar */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">All Products ({displayTotalCount})</h2>
        <Link 
          href="/admin/products/new" 
          className="rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 transition-colors"
        >
          Create Product
        </Link>
      </div>

      <div className="overflow-x-auto rounded border border-slate-200 bg-white">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right pr-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td className="p-8 text-center text-slate-500 font-medium" colSpan={5}>
                  No products found in the database. Click "Create Product" to add your first item.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr className="border-t border-slate-100 hover:bg-slate-50 transition-colors" key={product.id}>
                  <td className="p-4 font-bold text-slate-950">
                    <div>
                      {product.name}
                      {product.is_featured && (
                        <span className="ml-2 inline-flex items-center rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-800 ring-1 ring-inset ring-amber-600/20">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-slate-600">{product.sku ?? "None"}</td>
                  <td className="p-4">{formatPrice(product.price, product.request_price)}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                      product.is_active ? "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20" : "bg-slate-50 text-slate-600 ring-1 ring-inset ring-slate-500/10"
                    }`}>
                      {product.is_active ? "Active" : "Hidden"}
                    </span>
                  </td>
                  <td className="p-4 text-right pr-6 flex items-center justify-end gap-3">
                    <Link 
                      className="font-bold text-orange-700 hover:text-orange-600 transition-colors" 
                      href={`/product/${product.slug}`}
                      target="_blank"
                    >
                      View
                    </Link>
                    <Link 
                      className="font-bold text-orange-700 hover:text-orange-600 transition-colors" 
                      href={`/admin/products/${product.id}/edit`}
                    >
                      Edit
                    </Link>
                    <DeleteProductButton 
                      productId={product.id} 
                      productSlug={product.slug} 
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {displayTotalPages > 1 && (
        <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-sm text-slate-600">
          <p>
            Showing <span className="font-bold">{(currentPage - 1) * limit + 1}</span> to{" "}
            <span className="font-bold">
              {Math.min(currentPage * limit, displayTotalCount)}
            </span>{" "}
            of <span className="font-bold">{displayTotalCount}</span> products
          </p>
          <div className="flex gap-2">
            <Link
              href={`/admin/products?page=${currentPage - 1}`}
              className={`rounded border border-slate-200 px-3 py-1.5 text-xs font-semibold hover:bg-slate-50 ${
                currentPage <= 1 ? "pointer-events-none opacity-40 shadow-none bg-slate-50" : "bg-white"
              }`}
            >
              Previous
            </Link>
            <Link
              href={`/admin/products?page=${currentPage + 1}`}
              className={`rounded border border-slate-200 px-3 py-1.5 text-xs font-semibold hover:bg-slate-50 ${
                currentPage >= displayTotalPages ? "pointer-events-none opacity-40 shadow-none bg-slate-50" : "bg-white"
              }`}
            >
              Next
            </Link>
          </div>
        </div>
      )}
    </AdminShell>
  );
}