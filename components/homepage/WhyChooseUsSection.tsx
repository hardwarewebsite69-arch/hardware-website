/**
 * WhyChooseUsSection
 *
 * Mobile-optimised trust grid. Key changes vs previous version:
 *  • py-12 (was py-12 md:py-32) — less vertical real estate consumed on mobile
 *  • Items already in a 2×4 grid on mobile (grid-cols-2); descriptions trimmed to ≤12 words
 *  • Card inner padding reduced for denser, more punchier visual rhythm
 *  • KEBS & M-Pesa positioning preserved
 */

const whyItems = [
  { icon: "verified",         title: "Genuine Products",    desc: "KEBS-certified, direct warranties" },
  { icon: "local_shipping",   title: "Same Day Dispatch",   desc: "In-stock orders placed before 2 PM" },
  { icon: "savings",          title: "Bulk Discounts",      desc: "Up to 25% volume savings" },
  { icon: "description",      title: "BOQ Specialists",     desc: "Detailed estimates in under 24 hrs" },
  { icon: "inventory_2",      title: "10,000+ Products",    desc: "Structural, electrical & piping" },
  { icon: "public",           title: "Nationwide Fleet",    desc: "Delivery to all 47 counties" },
  { icon: "account_balance",  title: "Credit Accounts",     desc: "30-day terms for vetted companies" },
  { icon: "phone_android",    title: "M-Pesa Payments",     desc: "Instant paybill checkout" },
] as const;

export function WhyChooseUsSection() {
  return (
    <section className="w-full bg-neutral-50/50 py-10 md:py-20 font-sans border-y border-neutral-200/60">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">

        {/* Header — tighter on mobile */}
        <div className="mb-6 md:mb-10 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 block mb-1.5">
            Our Capabilities
          </span>
          <h2 className="text-xl md:text-4xl font-black tracking-tight text-neutral-900 font-display">
            Why Contractors Partner With Us
          </h2>
        </div>

        {/* 2×4 grid on mobile, 4×2 on desktop */}
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-4">
          {whyItems.map((item) => (
            <div
              key={item.title}
              className="double-bezel-card group flex flex-col h-full"
            >
              <div className="double-bezel-card-inner flex-1 flex flex-col gap-2.5 p-3 md:p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-600/5 text-orange-600 group-hover:scale-105 transition-transform duration-300">
                  <span className="material-symbols-outlined text-lg select-none">{item.icon}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs md:text-sm font-extrabold text-neutral-900 leading-tight">{item.title}</p>
                  <p className="mt-1 text-[11px] md:text-xs font-semibold text-neutral-500 leading-snug">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
