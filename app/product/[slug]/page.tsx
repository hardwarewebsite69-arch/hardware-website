import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice } from "@/lib/utils";
import { fallbackProducts, productImageFor } from "@/lib/fallback-data";
import { getProductBySlug, getProductImages, getProducts } from "@/lib/catalog";
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

  const [images, dbProducts] = await Promise.all([getProductImages(product.id), getProducts()]);
  const related = (dbProducts.length ? dbProducts : fallbackProducts).filter((item) => item.slug !== product.slug).slice(0, 3);
  const heroImage = images[0]?.url ?? productImageFor(product.slug);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="aspect-square rounded bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />
            <div className="mt-3 grid grid-cols-4 gap-3">
              {(images.length ? images : [{ id: "fallback", url: heroImage }]).slice(0, 4).map((image) => (
                <div className="aspect-square rounded border border-slate-200 bg-cover bg-center" key={image.id} style={{ backgroundImage: `url(${image.url})` }} />
              ))}
            </div>
          </div>
          <section>
            {product.sku ? <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-700">{product.sku}</p> : null}
            <h1 className="mt-2 text-4xl font-extrabold tracking-normal text-slate-950">{product.name}</h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">{product.description}</p>
            <p className="mt-6 text-3xl font-extrabold text-slate-950">{formatPrice(product.price, product.request_price)}</p>
            <ProductDetailActions product={product} />
            <dl className="mt-10 grid gap-3 rounded border border-slate-200 bg-white p-5 text-sm">
              <div className="flex justify-between gap-4"><dt className="font-semibold text-slate-500">SKU</dt><dd className="font-bold">{product.sku ?? "On request"}</dd></div>
              <div className="flex justify-between gap-4"><dt className="font-semibold text-slate-500">Status</dt><dd className="font-bold">Active catalog item</dd></div>
              <div className="flex justify-between gap-4"><dt className="font-semibold text-slate-500">Quote support</dt><dd className="font-bold">WhatsApp, phone, email</dd></div>
            </dl>
          </section>
        </div>
        <section className="mt-14">
          <h2 className="text-2xl font-extrabold text-slate-950">Related items</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => <ProductCard product={item} key={item.id} />)}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
