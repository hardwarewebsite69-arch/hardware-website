import { Metadata } from "next";
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
      <main className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">
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

        {/* Client-Side Interactive Filter and Grid */}
        <CategoryProductGrid initialProducts={products} />
      </main>
      <Footer />
    </>
  );
}

