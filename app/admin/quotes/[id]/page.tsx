import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/AdminShell";
import { getQuoteById, getQuoteItems } from "@/lib/admin";
import { siteConfig } from "@/lib/site-config";
import { QuoteStatusSelect } from "@/components/QuoteStatusSelect";
import { CopyIdButton } from "@/components/CopyIdButton";
import { QuotationEditor } from "@/components/QuotationEditor";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const quote = await getQuoteById(id);

  if (!quote) {
    notFound();
  }

  const items = await getQuoteItems(id);
  const shortId = quote.id.slice(0, 8) + "…";
  const whatsappText = encodeURIComponent(`Hello ${quote.customer_name}, we are reviewing your Amroz Traders quote request.`);

  return (
    <AdminShell active="/admin/quotes" title="Quote detail" subtitle={`Request #${shortId}`}>
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4" aria-label="Breadcrumb">
        <Link href="/admin/dashboard" className="hover:text-slate-900 font-medium transition-colors">
          Dashboard
        </Link>
        <svg className="h-3.5 w-3.5 text-slate-300" viewBox="0 0 16 16" fill="currentColor">
          <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z" clipRule="evenodd" />
        </svg>
        <Link href="/admin/quotes" className="hover:text-slate-900 font-medium transition-colors">
          Quotes
        </Link>
        <svg className="h-3.5 w-3.5 text-slate-300" viewBox="0 0 16 16" fill="currentColor">
          <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z" clipRule="evenodd" />
        </svg>
        <span className="text-slate-400 font-mono">#{shortId}</span>
      </nav>

      {/* ID badge row */}
      <div className="mb-6">
        <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-mono font-medium text-slate-500">
          {quote.id}
          <CopyIdButton id={quote.id} />
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Left — Requested Items */}
        <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h2 className="text-base font-extrabold text-slate-900">Requested items</h2>
            {items.length > 0 && (
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">
                {items.length}
              </span>
            )}
          </div>

          {items.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {items.map((item) => (
                <div key={item.id} className="px-5 py-4">
                  <p className="font-semibold text-slate-900">{item.item_name}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                      Qty: {item.quantity ?? "N/A"} {item.unit ?? ""}
                    </span>
                    {item.notes && (
                      <span className="text-xs text-slate-500 italic">{item.notes}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-5 py-8 text-center">
              <span className="material-symbols-outlined text-2xl text-slate-300">inventory_2</span>
              <p className="mt-2 text-sm text-slate-500">No line items were attached.</p>
            </div>
          )}

          {quote.upload_url && (
            <div className="border-t border-slate-100 px-5 py-4">
              <a
                href={quote.upload_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8.75 1.75a.75.75 0 00-1.5 0v5.69L5.03 5.22a.75.75 0 00-1.06 1.06l3.5 3.5a.75.75 0 001.06 0l3.5-3.5a.75.75 0 00-1.06-1.06L8.75 7.44V1.75z" />
                  <path d="M3.5 9.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 15h6.5A2.75 2.75 0 0014 12.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                </svg>
                Download uploaded list
              </a>
            </div>
          )}

          <QuotationEditor quote={quote} initialItems={items} />
        </section>

        {/* Right — Customer Sidebar */}
        <aside className="rounded-lg border border-slate-200 bg-white shadow-sm">
          {/* Customer Header */}
          <div className="border-b border-slate-100 px-5 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-sm font-extrabold text-orange-700">
              {quote.customer_name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>
            <h2 className="mt-3 text-lg font-extrabold text-slate-950">{quote.customer_name}</h2>
            {quote.message && (
              <p className="mt-3 rounded bg-slate-50 p-3 text-sm leading-relaxed text-slate-600">
                {quote.message}
              </p>
            )}
          </div>

          {/* Details */}
          <dl className="space-y-4 px-5 py-4 text-sm">
            <div className="flex items-center justify-between gap-3">
              <dt className="font-semibold text-slate-500">Phone</dt>
              <dd className="font-bold text-slate-900">{quote.phone}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="font-semibold text-slate-500">Email</dt>
              <dd className="font-bold text-slate-900 truncate">{quote.email ?? <span className="text-slate-400">Not provided</span>}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="font-semibold text-slate-500">Mode</dt>
              <dd className="inline-flex items-center gap-1.5 text-xs font-bold capitalize text-slate-700 bg-slate-100 rounded-full px-2.5 py-0.5">
                <span className="material-symbols-outlined text-[14px] text-slate-500">
                  {quote.mode === "upload" ? "upload_file" : "edit_note"}
                </span>
                {quote.mode}
              </dd>
            </div>
            <QuoteStatusSelect quoteId={quote.id} currentStatus={quote.status} />
          </dl>

          {/* Action Buttons */}
          <div className="border-t border-slate-100 px-5 py-4 grid gap-2">
            <a
              href={`${siteConfig.whatsappHref}?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-green-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-green-600 transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Respond on WhatsApp
            </a>
            {quote.email && (
              <a
                href={`mailto:${quote.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2.5 3A1.5 1.5 0 001 4.5v7A1.5 1.5 0 002.5 13h11a1.5 1.5 0 001.5-1.5v-7A1.5 1.5 0 0013.5 3h-11zm.207 1.793l5.293 3.762 5.293-3.762a.5.5 0 01.207.414v.036l-5.5 3.92a.5.5 0 01-.5 0l-5.5-3.92v-.036a.5.5 0 01.207-.414z" />
                </svg>
                Send email
              </a>
            )}
          </div>
        </aside>
      </div>
    </AdminShell>
  );
}
