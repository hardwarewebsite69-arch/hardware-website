import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { AdminShell } from "@/components/AdminShell";
import { formatPrice } from "@/lib/utils";
import { getProducts } from "@/lib/catalog";
import { DeleteProductButton } from "@/components/DeleteProductButton";

type PageProps = {
  searchParams: Promise<{
    page?: string;
    featured?: string;
    status?: string;
  }>;
};

const FILTER_GROUPS = {
  featured: {
    label: "Featured",
    options: [
      { value: "all", label: "All" },
      { value: "featured", label: "Featured" },
      { value: "non-featured", label: "Non-Featured" },
    ] as const,
  },
  status: {
    label: "Status",
    options: [
      { value: "all", label: "All" },
      { value: "active", label: "Active" },
      { value: "hidden", label: "Hidden" },
    ] as const,
  },
} as const;

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = params.page ? parseInt(params.page, 10) : 1;
  const limit = 10;
  const featuredFilter = params.featured ?? "all";
  const statusFilter = params.status ?? "all";

  const isFeatured = featuredFilter === "featured" ? true : featuredFilter === "non-featured" ? false : undefined;
  const isActive = statusFilter === "active" ? true : statusFilter === "hidden" ? false : undefined;

  const supabase = createClient(await cookies());

  let countQuery = supabase.from("products").select("id", { count: "exact", head: true });
  if (isFeatured !== undefined) countQuery = countQuery.eq("is_featured", isFeatured);
  if (isActive !== undefined) countQuery = countQuery.eq("is_active", isActive);
  const { count } = await countQuery;
  const totalCount = count ?? 0;

  const products = await getProducts({ isFeatured, isActive, page: currentPage, limit }, supabase);
  const displayTotalPages = Math.ceil(totalCount / limit);

  const currentQueryString = new URLSearchParams();
  if (featuredFilter !== "all") currentQueryString.set("featured", featuredFilter);
  if (statusFilter !== "all") currentQueryString.set("status", statusFilter);
  if (currentPage > 1) currentQueryString.set("page", String(currentPage));
  const backToQueryParams = currentQueryString.toString()
    ? `?${currentQueryString.toString()}`
    : "";

  const withParam = (overrides: Record<string, string>) => {
    const sp = new URLSearchParams();
    if (featuredFilter && featuredFilter !== "all") sp.set("featured", featuredFilter);
    if (statusFilter && statusFilter !== "all") sp.set("status", statusFilter);
    if (currentPage > 1) sp.set("page", String(currentPage));

    Object.entries(overrides).forEach(([k, v]) => {
      if (v === "all" || v === "" || (k === "page" && v === "1")) {
        sp.delete(k);
      } else {
        sp.set(k, v);
      }
    });

    const qs = sp.toString();
    return `/admin/products${qs ? `?${qs}` : ""}`;
  };

  return (
    <AdminShell active="/admin/products" title="Products" subtitle="Inventory and catalog publishing">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">All Products ({totalCount})</h2>
        <Link
          href="/admin/products/new"
          className="rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 transition-colors"
        >
          Create Product
        </Link>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-6 rounded border border-slate-200 bg-white px-5 py-3">
        {(Object.keys(FILTER_GROUPS) as (keyof typeof FILTER_GROUPS)[]).map((group) => (
          <div className="flex items-center gap-2" key={group}>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {FILTER_GROUPS[group].label}
            </span>
            <div className="flex rounded-md border border-slate-200 overflow-hidden">
              {FILTER_GROUPS[group].options.map((opt) => {
                const currentValue = group === "featured" ? featuredFilter : statusFilter;
                const active = currentValue === opt.value;
                return (
                  <Link
                    key={opt.value}
                    href={withParam({ [group]: opt.value, page: "1" })}
                    className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                      active
                        ? "bg-orange-600 text-white"
                        : "bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {opt.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
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
                  No products found matching the current filters.
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
                      href={`/admin/products/${product.id}/edit?redirect=${encodeURIComponent("/admin/products" + backToQueryParams)}`}
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

      {displayTotalPages > 1 && (
        <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-sm text-slate-600">
          <p>
            Showing <span className="font-bold">{(currentPage - 1) * limit + 1}</span> to{" "}
            <span className="font-bold">
              {Math.min(currentPage * limit, totalCount)}
            </span>{" "}
            of <span className="font-bold">{totalCount}</span> products
          </p>
          <div className="flex gap-2">
            <Link
              href={withParam({ page: String(currentPage - 1) })}
              className={`rounded border border-slate-200 px-3 py-1.5 text-xs font-semibold hover:bg-slate-50 ${
                currentPage <= 1 ? "pointer-events-none opacity-40 shadow-none bg-slate-50" : "bg-white"
              }`}
            >
              Previous
            </Link>
            <Link
              href={withParam({ page: String(currentPage + 1) })}
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
