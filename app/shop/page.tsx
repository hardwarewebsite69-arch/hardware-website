import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { fallbackCategories, fallbackProducts } from "@/lib/fallback-data";
import { getCategories, getProducts } from "@/lib/catalog";

export default async function Page() {
  const [dbCategories, dbProducts] = await Promise.all([getCategories(), getProducts()]);
  const categories = dbCategories.length ? dbCategories : fallbackCategories;
  const products = dbProducts.length ? dbProducts : fallbackProducts;

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-700">Catalog</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-normal text-slate-950">Shop categories</h1>
        <p className="mt-4 max-w-2xl text-slate-600">Choose a category to browse active products and request bulk pricing.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {categories.map((category) => {
            const count = products.filter((product) => product.category_id === category.id).length;
            return (
              <Link className="hover-lift rounded border border-slate-200 bg-white p-6" href={`/shop/${category.slug}`} key={category.id}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-950">{category.name}</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{category.description}</p>
                  </div>
                  <span className="rounded bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{count} items</span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
