import Link from "next/link";
import { AdminShell } from "@/components/AdminShell";
import { getAllQuotes } from "@/lib/admin";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { getCategories, getProducts } from "@/lib/catalog";
import type { QuoteStatus } from "@/lib/types";

const STATUS_STYLES: Record<QuoteStatus, { label: string; ring: string; bg: string; text: string; dot: string }> = {
  pending: {
    label: "Pending",
    ring: "ring-amber-600/20",
    bg: "bg-amber-50",
    text: "text-amber-800",
    dot: "bg-amber-500",
  },
  in_review: {
    label: "In Review",
    ring: "ring-blue-600/20",
    bg: "bg-blue-50",
    text: "text-blue-800",
    dot: "bg-blue-500",
  },
  responded: {
    label: "Responded",
    ring: "ring-green-600/20",
    bg: "bg-green-50",
    text: "text-green-800",
    dot: "bg-green-500",
  },
  closed: {
    label: "Closed",
    ring: "ring-slate-600/20",
    bg: "bg-slate-50",
    text: "text-slate-700",
    dot: "bg-slate-400",
  },
};

const MODE_STYLES: Record<string, { label: string; icon: string }> = {
  manual: { label: "Manual", icon: "edit_note" },
  upload: { label: "Upload", icon: "upload_file" },
};

export default async function Page() {
  const supabase = createClient(await cookies());
  const [dbCategories, dbProducts, quotes] = await Promise.all([
    getCategories(supabase),
    getProducts({ isActive: undefined }, supabase),
    getAllQuotes(),
  ]);

  const products = dbProducts;
  const categories = dbCategories;
  const pendingQuotes = quotes.filter((q) => q.status === "pending");
  const recentQuotes = quotes.slice(0, 6);

  const activeProducts = products.filter((p) => p.is_active);
  const hiddenProducts = products.filter((p) => !p.is_active);

  return (
    <AdminShell active="/admin/dashboard" title="Dashboard" subtitle="Catalog, quote, and inventory overview">
      {/* Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          icon="inventory_2"
          iconBg="bg-blue-50"
          iconColor="text-blue-700"
          value={products.length}
          label="Total Products"
          metadata={
            <span className="flex items-center gap-1.5">
              {activeProducts.length > 0 && (
                <span className="inline-flex items-center gap-1 rounded bg-green-50 px-1.5 py-0.5 text-[11px] font-semibold text-green-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  {activeProducts.length} active
                </span>
              )}
              {hiddenProducts.length > 0 && (
                <span className="text-[11px] text-slate-400">
                  {hiddenProducts.length} hidden
                </span>
              )}
            </span>
          }
        />
        <MetricCard
          icon="category"
          iconBg="bg-purple-50"
          iconColor="text-purple-700"
          value={categories.length}
          label="Categories"
          metadata={
            <span className="text-[11px] text-slate-400">
              {categories.filter((c) => c.is_active).length} active in storefront
            </span>
          }
        />
        <MetricCard
          icon="request_quote"
          iconBg="bg-amber-50"
          iconColor="text-amber-700"
          value={pendingQuotes.length}
          label="Pending Quotes"
          metadata={
            pendingQuotes.length > 0 ? (
              <span className="inline-flex items-center gap-1.5 rounded bg-amber-50 px-1.5 py-0.5 text-[11px] font-semibold text-amber-700">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-500" />
                </span>
                Needs review
              </span>
            ) : (
              <span className="text-[11px] text-slate-400">All caught up</span>
            )
          }
        />
      </div>

      {/* Recent Quotes Table */}
      <section className="mt-8 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Recent quotes</h2>
            <p className="mt-0.5 text-xs text-slate-500">
              {pendingQuotes.length} pending · {quotes.length} total
            </p>
          </div>
          <Link
            href="/admin/quotes"
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
          >
            View all
            <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 4l4 4-4 4" />
            </svg>
          </Link>
        </div>

        {quotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
            <span className="material-symbols-outlined text-3xl text-slate-300">inbox</span>
            <p className="mt-3 text-sm font-semibold text-slate-700">No quote records available</p>
            <p className="mt-1 text-xs text-slate-500">Customer quote requests will appear here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Customer</th>
                  <th className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Mode</th>
                  <th className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                  <th className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Created</th>
                </tr>
              </thead>
              <tbody>
                {recentQuotes.map((quote, i) => {
                  const statusStyle = STATUS_STYLES[quote.status] ?? STATUS_STYLES.pending;
                  const modeStyle = MODE_STYLES[quote.mode] ?? MODE_STYLES.manual;
                  return (
                    <tr
                      key={quote.id}
                      className={`group transition-colors hover:bg-slate-50 ${i < recentQuotes.length - 1 ? "border-b border-slate-100" : ""}`}
                    >
                      <td className="px-5 py-3.5">
                        <Link
                          href={`/admin/quotes/${quote.id}`}
                          className="font-bold text-slate-900 hover:text-orange-700 transition-colors"
                        >
                          {quote.customer_name}
                        </Link>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600">
                          <span className="material-symbols-outlined text-[16px] text-slate-400">{modeStyle.icon}</span>
                          {modeStyle.label}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${statusStyle.bg} ${statusStyle.text} ${statusStyle.ring} ring-1 ring-inset`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`} />
                          {statusStyle.label}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-500">
                        {new Date(quote.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </AdminShell>
  );
}

function MetricCard({
  icon,
  iconBg,
  iconColor,
  value,
  label,
  metadata,
}: {
  icon: string;
  iconBg: string;
  iconColor: string;
  value: number;
  label: string;
  metadata: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBg}`}>
          <span className={`material-symbols-outlined text-xl ${iconColor}`}>{icon}</span>
        </div>
      </div>
      <p className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950">{value}</p>
      <p className="mt-0.5 text-sm font-semibold text-slate-500">{label}</p>
      <div className="mt-2">{metadata}</div>
    </div>
  );
}
