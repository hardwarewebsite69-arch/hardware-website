import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { formatPrice } from "@/lib/utils";
import { fallbackProducts, productImageFor } from "@/lib/fallback-data";
import { getProductBySlug, getProductImages, getProducts, getAllCategories } from "@/lib/catalog";
import { ProductDetailActions } from "@/components/ProductDetailActions";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const dbProduct = await getProductBySlug(slug);
  const product = dbProduct ?? fallbackProducts.find((item) => item.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found | Amroz Traders",
    };
  }

  // Resolve product image for OpenGraph tags
  let imageUrl = productImageFor(product.slug);
  try {
    const images = await getProductImages(product.id);
    if (images.length > 0) {
      imageUrl = images[0].url;
    }
  } catch (error) {
    console.error("Error fetching product images for metadata:", error);
  }

  const title = `${product.name} | Amroz Traders`;
  const description = product.description || `Buy ${product.name} at Amroz Traders. High-quality hardware products with instant quote requests and fast delivery.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          alt: product.name,
        },
      ],
    },
  };
}


export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const dbProduct = await getProductBySlug(slug);
  const product = dbProduct ?? fallbackProducts.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const [images, dbProducts, categories] = await Promise.all([
    getProductImages(product.id),
    getProducts(),
    getAllCategories(),
  ]);
  const related = (dbProducts.length ? dbProducts : fallbackProducts).filter((item) => item.slug !== product.slug).slice(0, 3);
  const allImages = images.length ? images : [{ id: "fallback", url: productImageFor(product.slug) }];
  const category = categories.find((c) => c.id === product.category_id);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:py-10 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 mb-6 sm:mb-8">
          <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
          <span className="text-slate-300">/</span>
          <Link href="/shop" className="hover:text-orange-600 transition-colors">Shop</Link>
          {category && (
            <>
              <span className="text-slate-300">/</span>
              <Link href={`/shop/${category.slug}`} className="hover:text-orange-600 transition-colors">{category.name}</Link>
            </>
          )}
          <span className="text-slate-300">/</span>
          <span className="text-slate-600 truncate max-w-[160px] sm:max-w-[240px]">{product.name}</span>
        </nav>

        <div className="grid gap-6 sm:gap-10 lg:grid-cols-2">
          <ProductGallery images={allImages.slice(0, 4).map((img) => ({ id: img.id, url: img.url }))} />
          <section>
            <div className="flex items-center gap-3 mb-3">
              {product.sku ? <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-orange-700">{product.sku}</span> : null}
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                In Stock
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-normal text-slate-950">{product.name}</h1>
            {product.description && (
              <p className="mt-3 sm:mt-4 text-sm sm:text-lg leading-6 sm:leading-8 text-slate-600">{product.description}</p>
            )}
            <p className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-extrabold text-slate-950">{formatPrice(product.price, product.request_price)}</p>
            <ProductDetailActions product={product} />
            <dl className="mt-6 sm:mt-10 divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white text-sm">
              <div className="flex items-center justify-between px-4 sm:px-5 py-3.5">
                <dt className="font-semibold text-slate-500">SKU</dt>
                <dd className="font-bold text-slate-900">{product.sku ?? "On request"}</dd>
              </div>
              <div className="flex items-center justify-between px-4 sm:px-5 py-3.5">
                <dt className="font-semibold text-slate-500">Category</dt>
                <dd className="font-bold text-slate-900">
                  {category ? (
                    <Link href={`/shop/${category.slug}`} className="text-orange-600 hover:text-orange-700 hover:underline transition-colors">{category.name}</Link>
                  ) : "General"}
                </dd>
              </div>
              <div className="flex items-center justify-between px-4 sm:px-5 py-3.5">
                <dt className="font-semibold text-slate-500">Availability</dt>
                <dd className="flex items-center gap-1.5 font-bold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  In Stock
                </dd>
              </div>
              <div className="flex items-center justify-between px-4 sm:px-5 py-3.5">
                <dt className="font-semibold text-slate-500">Quote support</dt>
                <dd className="flex items-center gap-1.5 font-bold text-slate-900">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50">
                    <span className="material-symbols-outlined text-[14px] text-emerald-600">check</span>
                  </span>
                  WhatsApp, phone, email
                </dd>
              </div>
            </dl>
          </section>
        </div>
        <section className="mt-10 sm:mt-14">
          <h2 className="text-lg sm:text-2xl font-extrabold text-slate-950">Related items</h2>
          <div className="mt-4 sm:mt-6 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => <ProductCard product={item} key={item.id} />)}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
