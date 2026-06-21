import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteForm } from "@/components/QuoteForm";
import { getSettings } from "@/lib/catalog";

export default async function Page() {
  const settings = await getSettings();

  const cleanPhone = settings.phone.replace(/[^0-9+]/g, "");
  const telHref = `tel:${cleanPhone}`;

  const cleanWhatsappDigits = settings.whatsapp_number.replace(/[^0-9]/g, "");
  const formattedWhatsappNumber = cleanWhatsappDigits.startsWith("0")
    ? `254${cleanWhatsappDigits.slice(1)}`
    : cleanWhatsappDigits;
  const whatsappHref = `https://wa.me/${formattedWhatsappNumber}`;

  return (
    <>
      <Header />
      <main className="mx-auto grid max-w-[1180px] gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
        <section>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-700">Contact</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-normal text-slate-950">Talk to {settings.business_name}.</h1>
          <div className="mt-6 grid gap-3 text-slate-700">
            <a className="rounded border border-slate-200 bg-white p-4 font-bold hover:border-slate-300 transition-colors" href={telHref}>
              Call Us: {settings.phone}
            </a>
            <a className="rounded border border-slate-200 bg-white p-4 font-bold hover:border-slate-300 transition-colors" href={whatsappHref} target="_blank" rel="noopener noreferrer">
              WhatsApp Support
            </a>
          </div>
        </section>
        <QuoteForm defaultMode="upload" />
      </main>
      <Footer />
    </>
  );
}

