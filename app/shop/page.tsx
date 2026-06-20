import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { fallbackCategories, fallbackProducts, categoryImageFallback } from "@/lib/fallback-data";
import { getCategories, getProducts } from "@/lib/catalog";

export default async function Page() {
  const [dbCategories, dbProducts] = await Promise.all([getCategories(), getProducts()]);
  const categories = dbCategories.length ? dbCategories : fallbackCategories;
  const products = dbProducts.length ? dbProducts : fallbackProducts;

  return (
    <div className="min-h-screen bg-white font-sans text-[#111827]">
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
        <div className="mb-16 border-b border-neutral-100 pb-10">
          <p className="text-xs font-black uppercase tracking-widest text-[#ea580c]">Product Catalog</p>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-[#111827] sm:text-6xl">Shop Categories</h1>
          <p className="mt-6 max-w-2xl text-lg font-medium text-[#4b5563]">
            Explore our specialized inventory. Select a category to view high-quality industrial and building materials.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          {categories.map((category) => {
            const count = products.filter((product) => product.category_id === category.id).length;
            const imageUrl = category.image_url || categoryImageFallback(category.slug);
            return (
              <Link 
                className="group flex flex-col md:flex-row overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all hover:border-neutral-300 hover:shadow-xl" 
                href={`/shop/${category.slug}`} 
                key={category.id}
              >
                <div className="flex flex-1 flex-col justify-between p-8">
                  <div>
                    <div className="flex items-start justify-between gap-6">
                      <h2 className="text-3xl font-black text-[#111827] group-hover:text-[#ea580c] transition-colors">{category.name}</h2>
                      <span className="shrink-0 rounded-full bg-neutral-100 px-4 py-1.5 text-xs font-black text-[#111827]">
                        {count} {count === 1 ? 'Item' : 'Items'}
                      </span>
                    </div>
                    <p className="mt-4 text-base font-medium leading-relaxed text-[#4b5563]">{category.description}</p>
                  </div>
                  <div className="mt-10 flex items-center gap-2 text-sm font-black uppercase tracking-wider text-[#ea580c]">
                    Browse Inventory
                    <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                  </div>
                </div>

                {/* Visual Cover Column */}
                <div className="relative h-48 w-full shrink-0 overflow-hidden bg-neutral-50 border-t border-neutral-100 md:h-auto md:w-48 md:border-t-0 md:border-l lg:w-56">
                  <Image 
                    src={imageUrl} 
                    alt={category.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 192px, 224px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}

