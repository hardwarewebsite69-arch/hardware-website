"use client";

import { FaWhatsapp } from "react-icons/fa";
import { useSettings } from "../SettingsContext";
import { useQuoteCart } from "../QuoteCartContext";
import { usePathname } from "next/navigation";
import Link from "next/link";

/**
 * FloatingActions
 *
 * Mobile sticky bar — stabilised against scroll jitter:
 *  • `fixed bottom-0 left-0 right-0 z-50` with explicit `will-change-transform` to
 *    promote to its own compositor layer so iOS Safari doesn't repaint on scroll.
 *  • `pb-safe` (env(safe-area-inset-bottom)) prevents iPhone home-bar overlay.
 *  • `translate-z-0` forces GPU compositing to eliminate jitter on Android Chrome.
 *  • Body padding offset is handled by the `.mobile-sticky-bar` class already
 *    defined in globals.css so page content is never obscured.
 *
 * Desktop floating buttons — kept hidden (md:hidden) as they duplicate header CTA.
 */
export function FloatingActions() {
  const pathname = usePathname();
  const { telHref, whatsappHref } = useSettings();
  const { items } = useQuoteCart();

  // Total items in the quote cart
  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // Hide on admin and the quote form itself
  if (pathname.startsWith("/admin") || pathname === "/quote") {
    return null;
  }

  return (
    <>
      {/* ── Mobile Sticky Bottom Bar ─────────────────────────────────────────
          Compositor-layer tricks used here:
          1. `fixed`              — removes from flow, no reflow on scroll
          2. `translate-z-0`     — GPU layer promotion (Android Chrome)
          3. `will-change: transform` (via inline style) — compositor hint
          4. `pb-safe`           — safe-area inset so bar clears iPhone home bar
          5. `border-t` divider  — crisp visual boundary vs page content
      ──────────────────────────────────────────────────────────────────────── */}
      <div
        className="mobile-sticky-bar fixed bottom-0 left-0 right-0 z-50 flex items-center gap-3 border-t border-neutral-200/80 bg-white/90 px-4 pt-3 pb-safe backdrop-blur-md md:hidden"
        style={{ willChange: "transform", transform: "translateZ(0)" }}
      >
        {/* WhatsApp */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#25d366] text-xs font-black text-white shadow-md transition-all duration-300 hover:bg-[#20ba5a] active:scale-95"
        >
          <FaWhatsapp className="text-base shrink-0" />
          <span>WhatsApp</span>
        </a>

        {/* Get Quote */}
        <Link
          href="/quote"
          className="relative flex h-11 flex-[1.2] items-center justify-center gap-2 rounded-xl bg-[#ea580c] text-xs font-black text-white shadow-md transition-all duration-300 hover:bg-[#c2410c] active:scale-95"
        >
          <span className="material-symbols-outlined text-base shrink-0">description</span>
          <span>Get Quote</span>
          {totalCount > 0 && (
            <span className="absolute -right-1 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-red-600 px-1 text-[9px] font-black text-white shadow-sm">
              {totalCount}
            </span>
          )}
        </Link>
      </div>

      {/* ── Do not put Desktop Floating Buttons ───────────────────────── */}
    </>
  );
}
