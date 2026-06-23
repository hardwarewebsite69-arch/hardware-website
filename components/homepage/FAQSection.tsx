const faqItems = [
  {
    q: "How fast can you deliver?",
    a: "We offer same-day dispatch for orders placed before 2 PM. Delivery within Mombasa and Nairobi is typically within 24 hours. Nationwide delivery to all 47 counties takes 2–5 business days depending on location.",
  },
  {
    q: "Do you offer bulk discounts?",
    a: "Yes — we offer volume-based discounts of up to 25% for bulk orders. Upload your BOQ or contact our sales team for a customized quotation. The larger the order, the better the price.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept M-Pesa, bank transfers (KCB, Equity, Co-op), Visa/Mastercard, and cash on delivery for select areas. For businesses, we also offer credit account facilities with approved terms.",
  },
  {
    q: "Can I get a quote for my BOQ?",
    a: "Absolutely. Upload your Bill of Quantities (BOQ) in PDF, Excel, or CSV format through our website. You'll receive a comprehensive, itemized quotation within 24 hours — often sooner.",
  },
  {
    q: "Do you deliver outside Nairobi?",
    a: "Yes. We deliver nationwide across all 47 counties in Kenya. We have established logistics partnerships that allow us to reach even remote project sites reliably.",
  },
  {
    q: "What is your return policy?",
    a: "We offer hassle-free returns on unused items within 14 days of purchase. All products come with manufacturer warranties. Defective items are replaced immediately at no extra cost.",
  },
];

export function FAQSection() {
  return (
    <section className="w-full bg-neutral-50/50 py-12 md:py-32 font-sans border-t border-neutral-200/60">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 block mb-2">Common Queries</span>
          <h2 className="text-3xl font-black tracking-tight text-neutral-900 md:text-4xl font-display">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm font-semibold text-neutral-600 leading-relaxed">
            Quick answers for contractors and procurement teams regarding supply logistics
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqItems.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-neutral-200/80 bg-white transition-all duration-300 hover:border-orange-500/25 hover:shadow-sm open:border-orange-500/30 open:shadow-md"
            >
              <summary className="flex cursor-pointer items-center justify-between px-6 py-4.5 select-none">
                <span className="text-sm font-extrabold text-neutral-900 pr-4 font-sans">{item.q}</span>
                <span className="material-symbols-outlined faq-chevron shrink-0 text-lg text-neutral-400 select-none">
                  expand_more
                </span>
              </summary>
              <div className="faq-answer px-6 pb-5 pt-1">
                <p className="text-xs sm:text-sm font-medium leading-relaxed text-neutral-600">{item.a}</p>
              </div>
            </details>
          ))}
        </div>

      </div>
    </section>
  );
}
