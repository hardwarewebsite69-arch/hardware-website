import Link from "next/link";
import { AdminShell } from "@/components/AdminShell";
import { formatPrice } from "@/components/ProductCard";
import { fallbackProducts } from "@/lib/fallback-data";
import { getProducts } from "@/lib/catalog";

export default async function Page() {
  const dbProducts = await getProducts();
  const products = dbProducts.length ? dbProducts : fallbackProducts;

  return (
    <AdminShell active="/admin/products" title="Products" subtitle="Inventory and catalog publishing">
      <div className="overflow-x-auto rounded border border-slate-200 bg-white">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr><th className="p-4">Product</th><th className="p-4">SKU</th><th className="p-4">Price</th><th className="p-4">Status</th><th className="p-4">Action</th></tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr className="border-t border-slate-100" key={product.id}>
                <td className="p-4 font-bold text-slate-950">{product.name}</td>
                <td className="p-4 text-slate-600">{product.sku ?? "None"}</td>
                <td className="p-4">{formatPrice(product.price, product.request_price)}</td>
                <td className="p-4">{product.is_active ? "Active" : "Hidden"}</td>
                <td className="p-4"><Link className="font-bold text-orange-700" href={`/product/${product.slug}`}>View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
