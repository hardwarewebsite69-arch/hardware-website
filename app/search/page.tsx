import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { fallbackProducts } from "@/lib/fallback-data";
import { searchProducts } from "@/lib/catalog";

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const query = (await searchParams).q?.trim() ?? "";
  const dbResults = query ? await searchProducts(query) : [];
  const products = dbResults.length ? dbResults : query ? fallbackProducts.filter((product) => `${product.name} ${product.sku} ${product.description}`.toLowerCase().includes(query.toLowerCase())) : [];

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-normal text-slate-950">Search results</h1>
        <p className="mt-3 text-slate-600">{query ? `Showing matches for "${query}"` : "Enter a term in the search bar to find catalog items."}</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => <ProductCard product={product} key={product.id} />)}
        </div>
        {query && products.length === 0 ? <p className="mt-8 rounded border border-slate-200 bg-white p-6 text-slate-600">No products matched your search.</p> : null}
      </main>
      <Footer />
    </>
  );
}
