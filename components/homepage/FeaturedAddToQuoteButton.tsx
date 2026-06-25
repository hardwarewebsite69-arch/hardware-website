"use client";

import { useState, useCallback } from "react";
import { useQuoteCart } from "@/components/QuoteCartContext";
import type { Product } from "@/lib/types";

interface FeaturedAddToQuoteButtonProps {
  /** Minimal product-shaped object built by FeaturedProductsSection */
  product: Product;
}

/**
 * Isolated "Add to Quote" CTA for the Featured Products grid.
 *
 * Rendered client-side so it can call useQuoteCart() while its parent
 * (FeaturedProductsSection) stays an async Server Component.
 *
 * UX: button flips to a checkmark for 1.5 s on click, then resets.
 */
export function FeaturedAddToQuoteButton({ product }: FeaturedAddToQuoteButtonProps) {
  const { addToCart } = useQuoteCart();
  const [added, setAdded] = useState(false);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (added) return;
      addToCart(product);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    },
    [added, addToCart, product],
  );

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={added ? "Added to quote" : "Add to quote"}
      className={[
        // Base geometry — compact for 2-col mobile grid
        "flex h-8 w-full items-center justify-center gap-1.5 rounded-lg text-[11px] font-black uppercase tracking-wide transition-all duration-300 active:scale-95",
        // State colours
        added
          ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/30"
          : "bg-orange-600/10 text-orange-600 hover:bg-orange-600 hover:text-white hover:shadow-sm hover:shadow-orange-600/20",
      ].join(" ")}
    >
      <span className="material-symbols-outlined text-[15px] leading-none">
        {added ? "check_circle" : "add_shopping_cart"}
      </span>
      <span>{added ? "Added" : "Add to Quote"}</span>
    </button>
  );
}
