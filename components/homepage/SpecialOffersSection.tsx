import Link from "next/link";

export function SpecialOffersSection() {
  return (
    <section className="w-full bg-gradient-to-r from-[#111827] via-[#1e293b] to-[#111827] py-5 md:py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 md:grid-cols-2">
        {/* Offer 1 */}
        <div className="promo-pulse flex items-center justify-between rounded-xl border border-[#ea580c]/20 bg-[#ea580c]/5 p-6 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-3xl text-[#ea580c]">local_offer</span>
            <div>
              <p className="text-sm font-bold text-[#ea580c]">Today&apos;s Offer</p>
              <p className="text-lg font-extrabold text-white">10% OFF Power Tools</p>
              <p className="text-xs text-[#94a3b8]">Ends Friday</p>
            </div>
          </div>
          <Link href="/shop/power-tools" className="rounded-lg bg-[#ea580c] px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-[#c2410c]">
            Shop Now
          </Link>
        </div>

        {/* Offer 2 */}
        <div className="flex items-center justify-between rounded-xl border border-[#22c55e]/20 bg-[#22c55e]/5 p-6 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-3xl text-[#22c55e]">local_shipping</span>
            <div>
              <p className="text-sm font-bold text-[#22c55e]">Free Delivery</p>
              <p className="text-lg font-extrabold text-white">Orders Above Ksh 20,000</p>
              <p className="text-xs text-[#94a3b8]">Nationwide — no minimum order quantity</p>
            </div>
          </div>
          <Link href="/shop" className="rounded-lg border border-[#374151] px-5 py-2.5 text-xs font-bold text-[#d1d5db] transition-all hover:bg-white/10">
            Browse
          </Link>
        </div>
      </div>
    </section>
  );
}
