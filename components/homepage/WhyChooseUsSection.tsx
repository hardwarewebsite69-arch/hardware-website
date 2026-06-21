const whyItems = [
  { icon: "verified", title: "Genuine Products", desc: "Certified and backed by direct warranties" },
  { icon: "local_shipping", title: "Same Day Dispatch", desc: "For all in-stock orders placed before 2 PM" },
  { icon: "savings", title: "Bulk Discounts", desc: "Up to 25% volume-based savings applied" },
  { icon: "description", title: "BOQ Specialists", desc: "Detailed estimations back in under 24 hours" },
  { icon: "inventory_2", title: "10,000+ Products", desc: "Complete structural, electrical and piping inventory" },
  { icon: "public", title: "Nationwide Fleet", desc: "Reliable delivery direct to site in all 47 counties" },
  { icon: "account_balance", title: "Credit Accounts", desc: "30-day payment accounts for vetted companies" },
  { icon: "phone_android", title: "M-Pesa Payments", desc: "Instant checkout and business paybill confirmation" },
];

export function WhyChooseUsSection() {
  return (
    <section className="w-full bg-neutral-50/50 py-24 md:py-32 font-sans border-y border-neutral-200/60">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 block mb-2">Our Capabilities</span>
          <h2 className="text-3xl font-black tracking-tight text-neutral-900 md:text-4xl font-display">
            Why Contractors Partner With Us
          </h2>
        </div>

        {/* Double-Bezel Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {whyItems.map((item) => (
            <div
              key={item.title}
              className="double-bezel-card group flex flex-col h-full"
            >
              <div className="double-bezel-card-inner flex-1 flex flex-col gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600/5 text-orange-600 group-hover:scale-105 transition-transform duration-300">
                  <span className="material-symbols-outlined text-xl select-none">{item.icon}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-extrabold text-neutral-900 leading-tight">{item.title}</p>
                  <p className="mt-1.5 text-xs font-semibold text-neutral-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
