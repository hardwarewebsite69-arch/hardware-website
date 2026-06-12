import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteForm } from "@/components/QuoteForm";

export default function Page() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-4xl font-extrabold tracking-normal text-slate-950">Upload quote list</h1>
        <QuoteForm defaultMode="upload" />
      </main>
      <Footer />
    </>
  );
}
