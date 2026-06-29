"use client";

import Link from "next/link";
import { useQuoteCart } from "./QuoteCartContext";
import type { Product } from "@/lib/types";

export function ProductDetailActions({ product }: { product: Product }) {
  const { addToCart } = useQuoteCart();

  return (
    <div className="mt-6 sm:mt-8 flex flex-wrap gap-3">
      <button
        onClick={() => {
          addToCart(product);
        }}
        className="rounded bg-orange-600 px-5 py-3.5 text-sm font-extrabold text-white hover:bg-orange-500 transition-colors shadow-md flex items-center gap-2 cursor-pointer min-h-[44px]"
      >
        <span className="material-symbols-outlined text-[18px]">add_circle</span>
        Add to Quote List
      </button>
      <Link
        className="rounded border border-slate-300 px-5 py-3.5 text-sm font-extrabold text-slate-950 hover:bg-slate-50 transition-colors bg-white min-h-[44px] flex items-center"
        href="/quote"
      >
        Request Bulk Pricing
      </Link>
    </div>
  );
}
