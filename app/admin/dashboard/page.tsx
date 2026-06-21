import Link from "next/link";
import { AdminShell } from "@/components/AdminShell";
import { fallbackCategories, fallbackProducts } from "@/lib/fallback-data";
import { getAllQuotes } from "@/lib/admin";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { getCategories, getProducts } from "@/lib/catalog";

export default async function Page() {
  const supabase = createClient(await cookies());
  const [dbCategories, dbProducts, quotes] = await Promise.all([
    getCategories(supabase),
    getProducts({ isActive: undefined }, supabase),
    getAllQuotes()
  ]);
  const categories = dbCategories;
  const products = dbProducts;
  const pendingQuotes = quotes.filter((quote) => quote.status === "pending").length;

  return (
    <AdminShell active="/admin/dashboard" title="Dashboard" subtitle="Catalog, quote, and inventory overview">
      <div className="grid gap-4 sm:grid-cols-3">
        <Metric label="Total products" value={products.length} icon="inventory_2" />
        <Metric label="Categories" value={categories.length} icon="category" />
        <Metric label="Pending quotes" value={pendingQuotes} icon="request_quote" />
      </div>
      <section className="mt-8 rounded border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <h2 className="text-lg font-extrabold text-slate-950">Recent quotes</h2>
          <Link className="text-sm font-bold text-orange-700" href="/admin/quotes">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr><th className="p-4">Customer</th><th className="p-4">Mode</th><th className="p-4">Status</th><th className="p-4">Created</th></tr>
            </thead>
            <tbody>
              {quotes.slice(0, 6).map((quote) => (
                <tr className="border-t border-slate-100" key={quote.id}>
                  <td className="p-4 font-bold"><Link href={`/admin/quotes/${quote.id}`}>{quote.customer_name}</Link></td>
                  <td className="p-4 capitalize">{quote.mode}</td>
                  <td className="p-4 capitalize">{quote.status.replace("_", " ")}</td>
                  <td className="p-4">{new Date(quote.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {quotes.length === 0 ? <tr><td className="p-6 text-slate-500" colSpan={4}>No quote records available.</td></tr> : null}
            </tbody>
          </table>
        </div>
      </section>
    </AdminShell>
  );
}

function Metric({ icon, label, value }: { icon: string; label: string; value: number }) {
  return (
    <div className="rounded border border-slate-200 bg-white p-5">
      <span className="material-symbols-outlined text-orange-600">{icon}</span>
      <p className="mt-4 text-3xl font-extrabold text-slate-950">{value}</p>
      <p className="text-sm font-semibold text-slate-500">{label}</p>
    </div>
  );
}
