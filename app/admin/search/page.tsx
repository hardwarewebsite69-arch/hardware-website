import Link from "next/link";
import { AdminShell } from "@/components/AdminShell";
import { getProducts, getAllCategories } from "@/lib/catalog";
import { getAllQuotes } from "@/lib/admin";
import { formatPrice } from "@/lib/utils";
import { DeleteProductButton } from "@/components/DeleteProductButton";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function Page({ searchParams }: SearchPageProps) {
  const query = (await searchParams).q?.trim() ?? "";
  const lowerQuery = query.toLowerCase();

  // Query all items for in-memory matching so we find both active and hidden catalog items
  const [allProducts, allCategories, allQuotes] = await Promise.all([
    getProducts({ isActive: undefined }),
    getAllCategories(),
    getAllQuotes(),
  ]);

  const matchedProducts = query
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerQuery) ||
          p.sku?.toLowerCase().includes(lowerQuery) ||
          p.description?.toLowerCase().includes(lowerQuery)
      )
    : [];

  const matchedCategories = query
    ? allCategories.filter(
        (c) =>
          c.name.toLowerCase().includes(lowerQuery) ||
          c.description?.toLowerCase().includes(lowerQuery)
      )
    : [];

  const matchedQuotes = query
    ? allQuotes.filter(
        (q) =>
          q.customer_name.toLowerCase().includes(lowerQuery) ||
          q.phone.toLowerCase().includes(lowerQuery) ||
          q.email?.toLowerCase().includes(lowerQuery) ||
          q.message?.toLowerCase().includes(lowerQuery)
      )
    : [];

  const totalMatches = matchedProducts.length + matchedCategories.length + matchedQuotes.length;

  return (
    <AdminShell active="/admin/search" title="Admin Search" subtitle={query ? `Search results for "${query}"` : "Enter a search query in the header"}>
      {!query ? (
        <div className="rounded-lg border border-dashed border-slate-200 bg-white p-12 text-center text-slate-500">
          <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">search</span>
          <p className="text-base font-medium">Use the search box in the header to search across products, categories, or quotes.</p>
        </div>
      ) : totalMatches === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-200 bg-white p-12 text-center text-slate-500">
          <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">search_off</span>
          <p className="text-base font-medium">No admin records found matching "{query}".</p>
          <p className="text-sm mt-1">Try searching for other terms like "Cement", "Paints", or customer names.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Summary Banner */}
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm text-sm text-slate-700 flex items-center gap-2">
            <span className="font-bold text-slate-900">{totalMatches} matches found:</span>
            <span>{matchedProducts.length} Products,</span>
            <span>{matchedCategories.length} Categories,</span>
            <span>{matchedQuotes.length} Quotes</span>
          </div>

          {/* Products matches */}
          {matchedProducts.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-600 text-xl">inventory_2</span>
                Products ({matchedProducts.length})
              </h2>
              <div className="overflow-x-auto rounded border border-slate-200 bg-white">
                <table className="w-full min-w-[720px] text-left text-sm">
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
                    {matchedProducts.map((product) => (
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
                          {product.is_featured && (
                            <span className="ml-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20">
                              Featured
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-right pr-6 flex items-center justify-end space-x-4">
                          <Link className="font-bold text-orange-700 hover:text-orange-600 transition-colors" href={`/admin/products/${product.id}/edit`}>
                            Edit
                          </Link>
                          <DeleteProductButton productId={product.id} productSlug={product.slug} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Categories matches */}
          {matchedCategories.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-600 text-xl">category</span>
                Categories ({matchedCategories.length})
              </h2>
              <div className="overflow-x-auto rounded border border-slate-200 bg-white">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                    <tr>
                      <th className="p-4">Name</th>
                      <th className="p-4">Slug</th>
                      <th className="p-4">Order</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right pr-6">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matchedCategories.map((category) => (
                      <tr className="border-t border-slate-100 hover:bg-slate-50 transition-colors" key={category.id}>
                        <td className="p-4 font-bold text-slate-900">{category.name}</td>
                        <td className="p-4 text-slate-600">/shop/{category.slug}</td>
                        <td className="p-4 text-slate-500">{category.sort_order}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                            category.is_active ? "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20" : "bg-slate-50 text-slate-600 ring-1 ring-inset ring-slate-500/10"
                          }`}>
                            {category.is_active ? "Active" : "Hidden"}
                          </span>
                        </td>
                        <td className="p-4 text-right pr-6">
                          <Link className="font-bold text-orange-700 hover:text-orange-600" href={`/admin/categories/${category.id}`}>
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Quotes matches */}
          {matchedQuotes.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-600 text-xl">request_quote</span>
                Quotes ({matchedQuotes.length})
              </h2>
              <div className="overflow-x-auto rounded border border-slate-200 bg-white">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                    <tr>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Phone</th>
                      <th className="p-4">Mode</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Created</th>
                      <th className="p-4 text-right pr-6">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matchedQuotes.map((quote) => (
                      <tr className="border-t border-slate-100 hover:bg-slate-50 transition-colors" key={quote.id}>
                        <td className="p-4 font-bold text-slate-900">{quote.customer_name}</td>
                        <td className="p-4 text-slate-700">{quote.phone}</td>
                        <td className="p-4 capitalize">{quote.mode}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                            quote.status === "pending" ? "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20" : "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20"
                          }`}>
                            {quote.status.replace("_", " ")}
                          </span>
                        </td>
                        <td className="p-4 text-slate-500">{new Date(quote.created_at).toLocaleDateString()}</td>
                        <td className="p-4 text-right pr-6">
                          <Link className="font-bold text-orange-700 hover:text-orange-600" href={`/admin/quotes/${quote.id}`}>
                            Review
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      )}
    </AdminShell>
  );
}
