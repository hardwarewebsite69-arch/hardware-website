import Link from "next/link";
import { AdminShell } from "@/components/AdminShell";
import { getAllQuotes, getQuotesCount } from "@/lib/admin";
import { QuotesTable } from "@/components/QuotesTable";

type PageProps = {
  searchParams: Promise<{
    page?: string;
    status?: string;
    mode?: string;
  }>;
};

const FILTER_GROUPS = {
  status: {
    label: "Status",
    options: [
      { value: "all", label: "All" },
      { value: "pending", label: "Pending" },
      { value: "in_review", label: "In Review" },
      { value: "responded", label: "Responded" },
      { value: "closed", label: "Closed" },
    ] as const,
  },
  mode: {
    label: "Mode",
    options: [
      { value: "all", label: "All" },
      { value: "manual", label: "Manual" },
      { value: "upload", label: "Upload" },
    ] as const,
  },
} as const;

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = params.page ? parseInt(params.page, 10) : 1;
  const limit = 10;
  const statusFilter = params.status ?? "all";
  const modeFilter = params.mode ?? "all";

  const filterOpts = {
    status: statusFilter !== "all" ? statusFilter : undefined,
    mode: modeFilter !== "all" ? modeFilter : undefined,
  };

  const [totalCount, quotes] = await Promise.all([
    getQuotesCount(filterOpts),
    getAllQuotes({ ...filterOpts, page: currentPage, limit }),
  ]);

  const displayTotalPages = Math.ceil(totalCount / limit);

  const withParam = (overrides: Record<string, string>) => {
    const sp = new URLSearchParams();
    if (statusFilter && statusFilter !== "all") sp.set("status", statusFilter);
    if (modeFilter && modeFilter !== "all") sp.set("mode", modeFilter);
    if (currentPage > 1) sp.set("page", String(currentPage));

    Object.entries(overrides).forEach(([k, v]) => {
      if (v === "all" || v === "" || (k === "page" && v === "1")) {
        sp.delete(k);
      } else {
        sp.set(k, v);
      }
    });

    const qs = sp.toString();
    return `/admin/quotes${qs ? `?${qs}` : ""}`;
  };

  return (
    <AdminShell active="/admin/quotes" title="Quotes" subtitle="Review uploaded and manually entered quote requests">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">All Quotes ({totalCount})</h2>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-6 rounded border border-slate-200 bg-white px-5 py-3">
        {(Object.keys(FILTER_GROUPS) as (keyof typeof FILTER_GROUPS)[]).map((group) => (
          <div className="flex items-center gap-2" key={group}>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {FILTER_GROUPS[group].label}
            </span>
            <div className="flex rounded-md border border-slate-200 overflow-hidden">
              {FILTER_GROUPS[group].options.map((opt) => {
                const currentValue = group === "status" ? statusFilter : modeFilter;
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
