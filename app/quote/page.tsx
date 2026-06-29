import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteForm } from "@/components/QuoteForm";

export default function Page() {
  return (
    <>
      <Header />
      <main className="mx-auto grid max-w-[1180px] gap-6 sm:gap-10 px-4 py-6 sm:py-10 sm:px-6 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
        <section>
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-orange-700">Request a quote</p>
          <h1 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-normal text-slate-950">Upload a list or build one manually.</h1>
          <p className="mt-2 sm:mt-4 text-sm sm:text-lg leading-6 sm:leading-8 text-slate-600">
            Send your product list, bill of quantities, or manual item request. We will confirm availability, pricing, and delivery details.
          </p>
          <div className="mt-4 sm:mt-8 grid gap-3 sm:gap-4 text-sm text-slate-700">
            <div className="rounded-lg border border-slate-200 bg-white p-3 sm:p-4"><strong>Fast response:</strong> WhatsApp and phone support for urgent requests.</div>
            <div className="rounded-lg border border-slate-200 bg-white p-3 sm:p-4"><strong>Bulk pricing:</strong> Better rates for contractors and recurring supply.</div>
            <div className="rounded-lg border border-slate-200 bg-white p-3 sm:p-4"><strong>Flexible lists:</strong> Upload a link or enter line items directly.</div>
          </div>
        </section>
        <QuoteForm defaultMode="upload" />
      </main>
      <Footer />
    </>
  );
}
