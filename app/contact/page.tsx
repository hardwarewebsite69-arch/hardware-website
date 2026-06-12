import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteForm } from "@/components/QuoteForm";
import { siteConfig } from "@/lib/site-config";

export default function Page() {
  return (
    <>
      <Header />
      <main className="mx-auto grid max-w-[1180px] gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
        <section>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-700">Contact</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-normal text-slate-950">Talk to Amroz Traders.</h1>
          <div className="mt-6 grid gap-3 text-slate-700">
            <a className="rounded border border-slate-200 bg-white p-4 font-bold" href={siteConfig.telHref}>{siteConfig.phone}</a>
            <a className="rounded border border-slate-200 bg-white p-4 font-bold" href={siteConfig.whatsappHref}>WhatsApp support</a>
          </div>
        </section>
        <QuoteForm defaultMode="upload" />
      </main>
      <Footer />
    </>
  );
}
