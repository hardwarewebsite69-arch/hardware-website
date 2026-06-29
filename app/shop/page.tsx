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
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-20 lg:py-24">
        <div className="mb-10 sm:mb-16 border-b border-neutral-100 pb-6 sm:pb-10">
          <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#ea580c]">Product Catalog</p>
          <h1 className="mt-3 sm:mt-4 text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#111827]">Shop Categories</h1>
          <p className="mt-3 sm:mt-6 max-w-2xl text-sm sm:text-lg font-medium text-[#4b5563]">
            Explore our specialized inventory. Select a category to view high-quality industrial and building materials.
          </p>
        </div>
        
        <div className="grid gap-4 sm:gap-8 md:grid-cols-2">
          {categories.map((category) => {
            const count = products.filter((product) => product.category_id === category.id).length;
            const imageUrl = category.image_url || categoryImageFallback(category.slug);
            return (
              <Link 
                className="group flex flex-col md:flex-row overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all hover:border-neutral-300 hover:shadow-xl" 
                href={`/shop/${category.slug}`} 
                key={category.id}
              >
                <div className="flex flex-1 flex-col justify-between p-5 sm:p-8">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-xl sm:text-3xl font-black text-[#111827] group-hover:text-[#ea580c] transition-colors">{category.name}</h2>
                      <span className="shrink-0 rounded-full bg-neutral-100 px-3 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs font-black text-[#111827]">
                        {count} {count === 1 ? 'Item' : 'Items'}
                      </span>
                    </div>
                    <p className="mt-2 sm:mt-4 text-sm sm:text-base font-medium leading-relaxed text-[#4b5563]">{category.description}</p>
                  </div>
                  <div className="mt-6 sm:mt-10 flex items-center gap-2 text-[11px] sm:text-sm font-black uppercase tracking-wider text-[#ea580c]">
                    Browse Inventory
                    <span className="material-symbols-outlined text-lg sm:text-[22px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                  </div>
                </div>

                {/* Visual Cover Column */}
                <div className="relative h-36 sm:h-48 w-full shrink-0 overflow-hidden bg-neutral-50 border-t border-neutral-100 md:h-auto md:w-48 md:border-t-0 md:border-l lg:w-56">
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

