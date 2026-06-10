import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { fallbackCategories, fallbackProducts } from "@/lib/fallback-data";
import { getCategories, getProductsByCategorySlug } from "@/lib/catalog";

type PageProps = {
  params: Promise<{ category: string }>;
};

export default async function Page({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const dbCategories = await getCategories();
  const categories = dbCategories.length ? dbCategories : fallbackCategories;
  const category = categories.find((item) => item.slug === categorySlug);

  if (!category) {
    notFound();
  }

  const dbProducts = await getProductsByCategorySlug(categorySlug);
  const products = dbProducts.length ? dbProducts : fallbackProducts.filter((product) => product.category_id === category.id);

  return (
    <>
      <Header />
      <main className="mx-auto grid max-w-[1280px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-12 lg:px-8">
        <aside className="lg:col-span-3">
          <div className="sticky top-24 rounded border border-slate-200 bg-white p-5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-700">Filters</p>
            <div className="mt-5 grid gap-4 text-sm">
              <label className="flex items-center gap-2"><input type="checkbox" /> In stock</label>
              <label className="flex items-center gap-2"><input type="checkbox" /> Request price</label>
              <label className="flex items-center gap-2"><input type="checkbox" /> Bulk supply</label>
            </div>
          </div>
        </aside>
        <section className="lg:col-span-9">
          <h1 className="text-4xl font-extrabold tracking-normal text-slate-950">{category.name}</h1>
          <p className="mt-3 max-w-2xl text-slate-600">{category.description}</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => <ProductCard product={product} key={product.id} />)}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
