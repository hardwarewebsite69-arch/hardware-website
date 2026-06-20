import { notFound } from "next/navigation";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { fallbackCategories, fallbackProducts, categoryImageFallback } from "@/lib/fallback-data";
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
          {/* Category Hero Banner */}
          <div className="relative mb-10 overflow-hidden rounded-xl border border-slate-200 bg-slate-950 text-white shadow-sm">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 z-0">
              <Image 
                src={category.image_url || categoryImageFallback(category.slug)} 
                alt={category.name} 
                fill 
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover opacity-40 transition-transform duration-700 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-900/30" />
            </div>

            {/* Banner Content */}
            <div className="relative z-10 px-6 py-12 md:py-16 md:px-10 max-w-2xl">
              <span className="inline-block rounded bg-[#ea580c] px-3 py-1 text-xs font-black uppercase tracking-widest text-white mb-4">
                Category Catalog
              </span>
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">{category.name}</h1>
              <p className="mt-4 text-base font-medium leading-relaxed text-slate-300">
                {category.description}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => <ProductCard product={product} key={product.id} />)}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
