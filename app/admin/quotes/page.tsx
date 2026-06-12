import Link from "next/link";
import { AdminShell } from "@/components/AdminShell";
import { getAllQuotes } from "@/lib/admin";

export default async function Page() {
  const quotes = await getAllQuotes();

  return (
    <AdminShell active="/admin/quotes" title="Quotes" subtitle="Review uploaded and manually entered quote requests">
      <div className="overflow-x-auto rounded border border-slate-200 bg-white">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr><th className="p-4">Customer</th><th className="p-4">Phone</th><th className="p-4">Mode</th><th className="p-4">Status</th><th className="p-4">Created</th><th className="p-4">Action</th></tr>
          </thead>
          <tbody>
            {quotes.map((quote) => (
              <tr className="border-t border-slate-100" key={quote.id}>
                <td className="p-4 font-bold">{quote.customer_name}</td>
                <td className="p-4">{quote.phone}</td>
                <td className="p-4 capitalize">{quote.mode}</td>
                <td className="p-4 capitalize">{quote.status.replace("_", " ")}</td>
                <td className="p-4">{new Date(quote.created_at).toLocaleString()}</td>
                <td className="p-4"><Link className="font-bold text-orange-700" href={`/admin/quotes/${quote.id}`}>Review</Link></td>
              </tr>
            ))}
            {quotes.length === 0 ? <tr><td className="p-6 text-slate-500" colSpan={6}>No quotes are visible for this session.</td></tr> : null}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
