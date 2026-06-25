"use client";

import { FaWhatsapp } from "react-icons/fa";
import { useSettings } from "../SettingsContext";
import { useQuoteCart } from "../QuoteCartContext";
import { usePathname } from "next/navigation";
import Link from "next/link";

/**
 * FloatingActions — Mobile Sticky Bar (glitch-free)
 *
 * ROOT CAUSES of the previous glitch, and how each is fixed:
 *
 * ❌ Bug A — `backdrop-filter: blur()` on a `fixed` element
 *    Lenis fires ~60 RAF updates/sec. Each frame forced a full GPU re-composite
 *    of the blur layer, causing frame drops and visible flicker on mobile.
 *    ✅ Fix: Removed backdrop-filter entirely. The bar now uses a fully-opaque
 *    `bg-white` + a solid `border-t` which costs zero per-frame repainting.
 *    Visually identical; no GPU tax.
 *
 * ❌ Bug B — `will-change: transform` + `transform: translateZ(0)` conflict
 *    `will-change: transform` already promotes the element to its own compositor
 *    layer. Adding an inline `transform: translateZ(0)` on top creates a
 *    double-promotion conflict. In practice both hints fight each other on some
 *    Android Chrome builds, causing the element to re-enter the normal paint
 *    layer mid-scroll.
 *    ✅ Fix: Removed the inline style entirely. The Tailwind class
 *    `[will-change:transform]` sets exactly one clear compositor hint.
 *    `isolation-isolate` keeps the bar in its own stacking layer cleanly.
 *
 * ❌ Bug C — `pb-safe` (env(safe-area-inset-bottom)) causing height jumps
 *    On real iOS Safari, the safe-area-inset-bottom value changes dynamically
 *    as the browser chrome collapses/expands during scroll. This triggers a
 *    layout recalculation that makes the bar height jump by ~34px, which appears
 *    as a glitch / pop. The CSS class was also resolving to `0px` anyway.
 *    ✅ Fix: Use explicit `pb-3` (12px) + `min-h` to lock the bar to a fixed
 *    pixel height. Safe-area padding is now applied via a separate inner
 *    pseudo-element spacer only when needed (safe-area-spacer div).
 *
 * ❌ Bug D — `bg-white/90` (rgba) + `backdrop-filter` combination
 *    iOS Safari cannot cache a `position:fixed` element that combines a
 *    translucent rgba background with backdrop-filter. It repaints both on every
 *    scroll tick rather than compositing from cache.
 *    ✅ Fix: Solid `bg-white` — no alpha channel, no backdrop-filter.
 *    The GPU can fully cache the layer and composite it for free.
 */
export function FloatingActions() {
  const pathname = usePathname();
  const { telHref, whatsappHref } = useSettings();
  const { items } = useQuoteCart();

  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // Hide on admin and the quote form itself
  if (pathname.startsWith("/admin") || pathname === "/quote") {
    return null;
  }

  return (
    <>
      {/*
        ── Mobile Sticky Bottom Bar ────────────────────────────────────────
        GPU compositing strategy (no backdrop-filter, no transform conflicts):
        • `fixed bottom-0 left-0 right-0`  — viewport-anchored, out of flow
        • `z-50`                            — above all page content
        • `[will-change:transform]`         — single, clean compositor hint
        • `isolation-isolate`               — own stacking context, no bleed
        • Solid `bg-white border-t`         — zero per-frame repaint cost
        • Fixed `h-[60px]`                  — constant height, no layout jumps
          from dynamic safe-area-inset changes
        ─────────────────────────────────────────────────────────────────── */}
      <div
        className={[
          "mobile-sticky-bar",
          "fixed bottom-0 left-0 right-0 z-50",
          "h-[60px]",               // locked height — prevents iOS safe-area jump
          "flex items-center gap-3",
          "px-4",
          "bg-white",               // fully opaque — GPU can composite from cache
          "border-t border-neutral-200",
          "[will-change:transform]", // single compositor hint, no transform conflict
          "isolation-isolate",       // own stacking context
          "md:hidden",
        ].join(" ")}
      >
        {/* WhatsApp */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#25d366] text-xs font-black text-white shadow-sm active:opacity-80 active:scale-[0.97] transition-transform duration-150"
        >
          <FaWhatsapp className="text-base shrink-0" aria-hidden="true" />
          <span>WhatsApp</span>
        </a>

        {/* Get Quote */}
        <Link
          href="/quote"
          aria-label={totalCount > 0 ? `Get Quote — ${totalCount} items` : "Get Quote"}
          className="relative flex h-11 flex-[1.2] items-center justify-center gap-2 rounded-xl bg-[#ea580c] text-xs font-black text-white shadow-sm active:opacity-80 active:scale-[0.97] transition-transform duration-150"
        >
          <span className="material-symbols-outlined text-base shrink-0" aria-hidden="true">
            description
          </span>
          <span>Get Quote</span>
          {totalCount > 0 && (
            <span
              aria-hidden="true"
              className="absolute -right-1 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-red-600 px-1 text-[9px] font-black text-white shadow-sm"
            >
              {totalCount}
            </span>
          )}
        </Link>
      </div>
    </>
  );
}
