import Link from "next/link";
import type { Product } from "@/lib/types";
import { siteConfig } from "@/lib/site-config";

export function formatPrice(price: number | null, requestPrice: boolean) {
  if (requestPrice || price === null) {
    return "Price on Inquiry";
  }

  return new Intl.NumberFormat("en-KE", {
    currency: "KES",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(price);
}

export function ProductCard({ product }: { product: Product }) {
  const imageUrl = `https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400&q=80&sig=${product.id}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white transition-all hover:border-neutral-300 hover:shadow-xl">
      <Link className="relative aspect-square overflow-hidden bg-neutral-50" href={`/product/${product.slug}`}>
        <img
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={imageUrl}
        />
        {product.request_price && (
          <div className="absolute left-4 top-4 rounded-sm bg-[#111827] px-2 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-sm">
            Bulk Quote
          </div>
        )}
      </Link>
      
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <Link className="flex-1" href={`/product/${product.slug}`}>
            <h3 className="text-lg font-black leading-tight text-[#111827] group-hover:text-[#ea580c] transition-colors">
              {product.name}
            </h3>
          </Link>
          {product.sku && (
            <span className="shrink-0 rounded-sm bg-neutral-100 px-2 py-0.5 text-[10px] font-bold text-neutral-500">
              {product.sku}
            </span>
          )}
        </div>
        
        <p className="mt-2 line-clamp-2 text-sm font-medium text-neutral-500">
          {product.description}
        </p>
        
        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between border-t border-neutral-100 pt-4">
            <span className="text-xl font-black text-[#111827]">
              {formatPrice(product.price, product.request_price)}
            </span>
            <div className="flex items-center gap-2">
              <a 
                href={siteConfig.whatsappHref}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25d366]/10 text-[#25d366] transition-all hover:bg-[#25d366] hover:text-white"
                title="Inquire on WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-xl font-bold">chat</span>
              </a>
              <Link 
                href={`/product/${product.slug}`}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-400 transition-all hover:bg-[#111827] hover:text-white"
              >
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

