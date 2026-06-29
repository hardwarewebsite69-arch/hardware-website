import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CategoryProductGrid } from "@/components/CategoryProductGrid";
import { fallbackCategories, fallbackProducts, categoryImageFallback } from "@/lib/fallback-data";
import { getCategories, getProductsByCategorySlug } from "@/lib/catalog";

type PageProps = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const dbCategories = await getCategories();
  const categories = dbCategories.length ? dbCategories : fallbackCategories;
  const category = categories.find((item) => item.slug === categorySlug);

  if (!category) {
    return {
      title: "Category Not Found | Amroz Traders",
    };
  }

  const title = `Buy ${category.name} | Amroz Traders`;
  const description = category.description || `Explore our high-quality selection of ${category.name} at Amroz Traders. Instant bulk quotes and nationwide delivery.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: category.image_url || categoryImageFallback(category.slug),
          alt: category.name,
        },
      ],
    },
  };
}


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
      <div className="bg-neutral-50">
      <main className="mx-auto max-w-[1280px] px-4 py-8 sm:py-10 sm:px-6 lg:px-8">
        {/* Category Hero Banner */}
        <div className="relative mb-6 sm:mb-10 overflow-hidden rounded-xl border border-slate-200 bg-slate-950 text-white shadow-sm">
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
          <div className="relative z-10 px-5 sm:px-10 py-8 sm:py-16 max-w-2xl">
            <span className="inline-block rounded bg-[#ea580c] px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-black uppercase tracking-widest text-white mb-3 sm:mb-4">
              {category.name}
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">{category.name}</h1>
            {category.description && (
              <p className="mt-2 sm:mt-4 text-sm sm:text-base font-medium leading-relaxed text-slate-300">
                {category.description}
              </p>
            )}
          </div>
        </div>

        {/* Category Navigation Pills */}
        <nav className="mb-6 sm:mb-10 -mx-4 sm:mx-0 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 px-4 sm:px-0 pb-2 min-w-max">
            <Link
              href="/shop"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 whitespace-nowrap"
            >
              All Categories
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop/${cat.slug}`}
                className={`rounded-full border px-4 py-2 text-sm font-bold whitespace-nowrap transition-colors ${
                  cat.slug === categorySlug
                    ? "border-orange-600 bg-orange-600 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Client-Side Interactive Filter and Grid */}
        <CategoryProductGrid initialProducts={products} />
      </main>
      </div>
      <Footer />
    </>
  );
}

