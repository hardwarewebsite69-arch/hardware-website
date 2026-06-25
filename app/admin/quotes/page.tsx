import Link from "next/link";
import { AdminShell } from "@/components/AdminShell";
import { getAllQuotes, getQuotesCount } from "@/lib/admin";
import { QuotesTable } from "@/components/QuotesTable";

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const pageStr = (await searchParams).page;
  const currentPage = pageStr ? parseInt(pageStr, 10) : 1;
  const limit = 10;

  const [totalCount, quotes] = await Promise.all([
    getQuotesCount(),
    getAllQuotes({ page: currentPage, limit }),
  ]);

  const displayTotalPages = Math.ceil(totalCount / limit);

  const withParam = (overrides: Record<string, string>) => {
    const sp = new URLSearchParams();
    if (currentPage > 1) sp.set("page", String(currentPage));
    Object.entries(overrides).forEach(([k, v]) => {
      if (v === "1" && k === "page") sp.delete(k);
      else sp.set(k, v);
    });
    const qs = sp.toString();
    return `/admin/quotes${qs ? `?${qs}` : ""}`;
  };

  return (
    <AdminShell active="/admin/quotes" title="Quotes" subtitle="Review uploaded and manually entered quote requests">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">All Quotes ({totalCount})</h2>
      </div>

      <QuotesTable quotes={quotes} />

      {displayTotalPages > 1 && (
        <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-sm text-slate-600">
          <p>
            Showing <span className="font-bold">{(currentPage - 1) * limit + 1}</span> to{" "}
            <span className="font-bold">
              {Math.min(currentPage * limit, totalCount)}
            </span>{" "}
            of <span className="font-bold">{totalCount}</span> quotes
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
