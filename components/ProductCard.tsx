import Link from "next/link";
import type { Product } from "@/lib/types";
import { productImageFor } from "@/lib/fallback-data";

export function formatPrice(price: number | null, requestPrice: boolean) {
  if (requestPrice || price === null) {
    return "Request price";
  }

  return new Intl.NumberFormat("en-KE", {
    currency: "KES",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(price);
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <Link href={`/product/${product.slug}`}>
        <div
          className="aspect-[4/3] bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(15,23,42,.08), rgba(15,23,42,.2)), url(${productImageFor(product.slug)})` }}
        />
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-bold text-slate-950 group-hover:text-orange-700">{product.name}</h3>
            {product.sku ? <span className="rounded bg-slate-100 px-2 py-1 text-[11px] font-bold text-slate-500">{product.sku}</span> : null}
          </div>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{product.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="font-extrabold text-slate-950">{formatPrice(product.price, product.request_price)}</span>
            <span className="material-symbols-outlined text-orange-600">arrow_forward</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
