import Link from "next/link";
import { AdminShell } from "@/components/AdminShell";
import { formatPrice } from "@/components/ProductCard";
import { fallbackProducts } from "@/lib/fallback-data";
import { getProducts } from "@/lib/catalog";
import { DeleteProductButton } from "@/components/DeleteProductButton";

export default async function Page() {
  const dbProducts = await getProducts();
  const products = dbProducts.length ? dbProducts : fallbackProducts;

  return (
    <AdminShell active="/admin/products" title="Products" subtitle="Inventory and catalog publishing">
      {/* Action Header Bar */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">All Products ({products.length})</h2>
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
            {products.map((product) => (
              <tr className="border-t border-slate-100 hover:bg-slate-50 transition-colors" key={product.id}>
                <td className="p-4 font-bold text-slate-950">{product.name}</td>
                <td className="p-4 text-slate-600">{product.sku ?? "None"}</td>
                <td className="p-4">{formatPrice(product.price, product.request_price)}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                    product.is_active ? "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20" : "bg-slate-50 text-slate-600 ring-1 ring-inset ring-slate-500/10"
                  }`}>
                    {product.is_active ? "Active" : "Hidden"}
                  </span>
                </td>
                <td className="p-4 text-right pr-6 flex items-center justify-end space-x-4">
                  <Link 
                    className="font-bold text-slate-600 hover:text-slate-900 transition-colors" 
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
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}