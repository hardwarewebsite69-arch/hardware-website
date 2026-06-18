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
    <section className="w-full bg-[#f9fafb] py-1 md:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-3 text-center text-2xl font-bold tracking-tight text-[#111827] md:text-[28px]">
          Frequently Asked Questions
        </h2>
        <p className="mx-auto mb-10 max-w-md text-center text-sm text-[#6b7280]">
          Quick answers for contractors and procurement teams
        </p>

        <div className="space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.q}
              className="group rounded-lg border border-[#e5e7eb] bg-white transition-all hover:border-[#d1d5db] open:border-[#ea580c]/30 open:shadow-sm"
            >
              <summary className="flex cursor-pointer items-center justify-between px-6 py-4">
                <span className="text-sm font-semibold text-[#111827] pr-4">{item.q}</span>
                <span className="material-symbols-outlined faq-chevron shrink-0 text-lg text-[#9ca3af]">
                  expand_more
                </span>
              </summary>
              <div className="faq-answer px-6 pb-4">
                <p className="text-sm leading-relaxed text-[#6b7280]">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
