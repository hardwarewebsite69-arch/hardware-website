import { notFound } from "next/navigation";
import { AdminShell } from "@/components/AdminShell";
import { getQuoteById, getQuoteItems } from "@/lib/admin";
import { siteConfig } from "@/lib/site-config";

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
  const whatsappText = encodeURIComponent(`Hello ${quote.customer_name}, we are reviewing your Amroz Traders quote request.`);

  return (
    <AdminShell active="/admin/quotes" title="Quote detail" subtitle={`Request ${quote.id}`}>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="rounded border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-extrabold text-slate-950">Requested items</h2>
          {quote.upload_url ? <a className="mt-4 inline-flex rounded bg-slate-950 px-4 py-2 text-sm font-bold text-white" href={quote.upload_url}>Download uploaded list</a> : null}
          <div className="mt-5 grid gap-3">
            {items.map((item) => (
              <div className="rounded border border-slate-200 p-4" key={item.id}>
                <p className="font-bold text-slate-950">{item.item_name}</p>
                <p className="mt-1 text-sm text-slate-600">Qty: {item.quantity ?? "N/A"} {item.unit ?? ""}</p>
                {item.notes ? <p className="mt-2 text-sm text-slate-600">{item.notes}</p> : null}
              </div>
            ))}
            {items.length === 0 && !quote.upload_url ? <p className="text-sm text-slate-500">No line items were attached.</p> : null}
          </div>
        </section>
        <aside className="rounded border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-extrabold text-slate-950">{quote.customer_name}</h2>
          <dl className="mt-4 grid gap-3 text-sm">
            <div><dt className="font-semibold text-slate-500">Phone</dt><dd className="font-bold">{quote.phone}</dd></div>
            <div><dt className="font-semibold text-slate-500">Email</dt><dd className="font-bold">{quote.email ?? "Not provided"}</dd></div>
            <div><dt className="font-semibold text-slate-500">Mode</dt><dd className="font-bold capitalize">{quote.mode}</dd></div>
            <div><dt className="font-semibold text-slate-500">Status</dt><dd className="font-bold capitalize">{quote.status.replace("_", " ")}</dd></div>
          </dl>
          {quote.message ? <p className="mt-5 rounded bg-slate-50 p-3 text-sm text-slate-700">{quote.message}</p> : null}
          <div className="mt-6 grid gap-2">
            <a className="rounded bg-green-700 px-4 py-2 text-center text-sm font-bold text-white" href={`${siteConfig.whatsappHref}?text=${whatsappText}`}>Respond on WhatsApp</a>
            {quote.email ? <a className="rounded border border-slate-300 px-4 py-2 text-center text-sm font-bold" href={`mailto:${quote.email}`}>Send email</a> : null}
          </div>
        </aside>
      </div>
    </AdminShell>
  );
}
