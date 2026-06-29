"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import type { Product } from "@/lib/types";
import { useQuoteCart } from "./QuoteCartContext";
import { productImageFor } from "@/lib/fallback-data";
import { useSettings } from "./SettingsContext";
import { formatPrice } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useQuoteCart();
  const { whatsappHref } = useSettings();
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = useCallback(() => {
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  }, [addToCart, product]);

  // Use database product image if available, else use fallback
  const imageUrl = product.product_images?.[0]?.url ?? productImageFor(product.slug);

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-all hover:border-neutral-300 hover:shadow-xl">
      <Link 
        href={`/product/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-neutral-100 border-b border-neutral-100"
      >
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
        
        <div className="mt-auto pt-4 sm:pt-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 border-t border-neutral-100 pt-4">
            <span
              className={
                product.request_price || product.price === null
                  ? "text-sm font-semibold leading-snug line-clamp-2 text-slate-600"
                  : "text-base sm:text-xl font-black text-[#111827]"
              }
            >
              {formatPrice(product.price, product.request_price)}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAdd}
                className={`flex h-10 px-2.5 sm:px-3 items-center justify-center gap-1 rounded-full font-bold text-xs active:scale-90 transition-all shadow-sm ${
                  justAdded
                    ? "bg-emerald-600/10 text-emerald-600"
                    : "bg-orange-600/10 text-orange-600 hover:bg-orange-600 hover:text-white"
                }`}
                title="Add to Quote list"
              >
                {justAdded ? (
                  <>
                    <span className="material-symbols-outlined text-[18px]">check</span>
                    <span className="sm:hidden">Added</span>
                    <span className="hidden sm:inline">Added</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">add_circle</span>
                    <span className="sm:hidden">Add</span>
                    <span className="hidden sm:inline">Add to Quote</span>
                  </>
                )}
              </button>
              <a 
                href={whatsappHref}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25d366]/10 text-[#25d366] transition-all hover:bg-[#25d366] hover:text-white active:scale-90"
                title="Inquire on WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-xl"><FaWhatsapp /></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}


