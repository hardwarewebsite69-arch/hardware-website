const whyItems = [
  { icon: "verified", title: "Genuine Products", desc: "Certified & warranty-backed" },
  { icon: "local_shipping", title: "Same Day Dispatch", desc: "Orders before 2 PM" },
  { icon: "savings", title: "Bulk Discounts", desc: "Up to 25% off volume" },
  { icon: "description", title: "BOQ Specialists", desc: "Upload & get quoted" },
  { icon: "inventory_2", title: "10,000+ Products", desc: "Everything you need" },
  { icon: "public", title: "Nationwide Delivery", desc: "All 47 counties" },
  { icon: "account_balance", title: "Credit Accounts", desc: "For qualified businesses" },
  { icon: "phone_android", title: "M-Pesa Payments", desc: "Pay instantly" },
];

export function WhyChooseUsSection() {
  return (
    <section className="w-full bg-[#f9fafb] py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-[#111827] md:mb-10 md:text-[28px]">
          Why Contractors Choose Us
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {whyItems.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 rounded-lg border border-[#e5e7eb] bg-white p-4 transition-all hover:border-[#ea580c]/30 hover:shadow-sm"
            >
              <span className="material-symbols-outlined mt-0.5 text-xl text-[#ea580c]">{item.icon}</span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-[#111827] leading-tight">{item.title}</p>
                <p className="mt-0.5 text-xs text-[#6b7280]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
