import Link from "next/link";

const offers = [
  {
    accent: "#ea580c",
    bg: "#ea580c",
    borderOpacity: "20",
    icon: "local_offer",
    tag: "Today's Offer",
    headline: "10% OFF Power Tools",
    sub: "Ends Friday — limited stock",
    href: "/shop/power-tools",
    cta: "Shop Now",
    ctaVariant: "solid" as const,
  },
  {
    accent: "#22c55e",
    bg: "#22c55e",
    borderOpacity: "20",
    icon: "local_shipping",
    tag: "Free Delivery",
    headline: "Orders Above Ksh 20,000",
    sub: "Nationwide — no minimum qty",
    href: "/shop",
    cta: "Browse",
    ctaVariant: "ghost" as const,
  },
] as const;

export function SpecialOffersSection() {
  return (
    <section className="w-full bg-gradient-to-r from-[#111827] via-[#1e293b] to-[#111827] py-4 md:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/*
         * Mobile: horizontal snap-scroll strip (saves vertical real estate).
         * Desktop: standard 2-col grid.
         */}
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 md:gap-5 md:overflow-visible">
          {offers.map((offer) => (
            <div
              key={offer.tag}
              className={[
                "promo-pulse snap-start shrink-0 w-[80vw] sm:w-[60vw] md:w-auto",
                "flex items-center justify-between rounded-xl border p-4 md:p-5 backdrop-blur-sm",
              ].join(" ")}
              style={{
                borderColor: `${offer.bg}33`,
                backgroundColor: `${offer.bg}0d`,
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="material-symbols-outlined text-2xl md:text-3xl shrink-0"
                  style={{ color: offer.accent }}
                >
                  {offer.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold" style={{ color: offer.accent }}>
                    {offer.tag}
                  </p>
                  <p className="text-sm md:text-base font-extrabold text-white leading-tight">
                    {offer.headline}
                  </p>
                  <p className="text-[11px] text-[#94a3b8] mt-0.5 leading-snug">{offer.sub}</p>
                </div>
              </div>

              {offer.ctaVariant === "solid" ? (
                <Link
                  href={offer.href}
                  className="ml-3 shrink-0 rounded-lg bg-[#ea580c] px-4 py-2 text-[11px] font-bold text-white transition-all hover:bg-[#c2410c] active:scale-95"
                >
                  {offer.cta}
                </Link>
              ) : (
                <Link
                  href={offer.href}
                  className="ml-3 shrink-0 rounded-lg border border-[#374151] px-4 py-2 text-[11px] font-bold text-[#d1d5db] transition-all hover:bg-white/10 active:scale-95"
                >
                  {offer.cta}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
