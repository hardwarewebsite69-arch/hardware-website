"use client";

import { FaWhatsapp } from "react-icons/fa";
import { useSettings } from "../SettingsContext";
import { useQuoteCart } from "../QuoteCartContext";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function FloatingActions() {
  const pathname = usePathname();
  const { telHref, whatsappHref } = useSettings();
  const { items } = useQuoteCart();
  
  // Calculate total items in the cart
  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // Hide the floating widget on admin screens and on the quote form page itself
  if (pathname.startsWith("/admin") || pathname === "/quote") {
    return null;
  }

  return (
    <>
      {/* Desktop Floating Buttons — hidden on mobile and desktop ,redudant to header get quote and whatsapp on desktop */}
      <div className="fixed bottom-8 right-8 z-50 hidden flex-col gap-3 items-end md:flex md:hidden">
        {/* Get Quote */}
        <Link
          href="/quote"
          className="relative flex h-12 items-center gap-2 rounded-full bg-[#ea580c] px-6 text-white shadow-2xl transition-all hover:scale-105 hover:shadow-[0_8px_30px_rgba(234,88,12,0.4)] active:scale-95 group"
        >
          <span className="material-symbols-outlined text-lg">description</span>
          <span className="text-sm font-bold">Get Quote</span>
          {totalCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-black text-white border-2 border-white shadow-sm transition-transform group-hover:scale-110">
              {totalCount}
            </span>
          )}
        </Link>

        {/* Call */}
        <a
          href={telHref}
          className="flex h-12 items-center gap-2.5 rounded-full bg-[#111827] px-5 text-white shadow-2xl transition-all hover:scale-105 active:scale-95 group"
        >
          <span className="material-symbols-outlined text-lg">call</span>
          <span className="text-sm font-bold hidden group-hover:block">Call Now</span>
        </a>

        {/* WhatsApp */}
        <a
          href={whatsappHref}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-2xl transition-all hover:scale-110 active:scale-95"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp className="text-3xl" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 animate-ping rounded-full bg-[#25d366] opacity-75" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 rounded-full bg-[#25d366] border-2 border-white" />
        </a>
      </div>

      {/* Mobile Sticky Bottom Bar — visible on mobile only */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-neutral-200/80 px-4 py-3 md:hidden flex items-center gap-3">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex h-11 items-center justify-center gap-2 rounded-xl bg-[#25d366] text-white text-xs font-black shadow-md hover:bg-[#20ba5a] active:scale-95 transition-all duration-300"
        >
          <FaWhatsapp className="text-base" />
          <span>WhatsApp</span>
        </a>
        
        <Link
          href="/quote"
          className="flex-[1.2] relative flex h-11 items-center justify-center gap-2 rounded-xl bg-[#ea580c] text-white text-xs font-black shadow-md hover:bg-[#c2410c] active:scale-95 transition-all duration-300"
        >
          <span className="material-symbols-outlined text-base">description</span>
          <span>Get Quote</span>
          {totalCount > 0 && (
            <span className="absolute -top-1.5 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[9px] font-black text-white border-2 border-white shadow-sm">
              {totalCount}
            </span>
          )}
        </Link>
      </div>
    </>
  );
}
