"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuoteCart } from "./QuoteCartContext";

export function FloatingQuoteBadge() {
  const pathname = usePathname();
  const { items } = useQuoteCart();
  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);

  if (totalCount === 0 || pathname.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-bounce duration-1000">
      <Link
        href="/quote"
        className="flex items-center gap-3 bg-[#111827] text-white px-5 py-3.5 rounded-full shadow-2xl hover:bg-orange-600 transition-all border border-slate-800/50 hover:border-orange-500 hover:scale-105 group"
      >
        <span className="relative flex h-5 w-5 items-center justify-center">
          <span className="material-symbols-outlined text-[22px] group-hover:rotate-6 transition-transform">
            request_quote
          </span>
          <span className="absolute -top-2.5 -right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-[10px] font-black text-white group-hover:bg-white group-hover:text-orange-600 transition-colors shadow-sm">
            {totalCount}
          </span>
        </span>
        <span className="text-xs font-bold uppercase tracking-wider">
          Request Quote
        </span>
      </Link>
    </div>
  );
}
