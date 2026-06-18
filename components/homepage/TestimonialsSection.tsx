const testimonials = [
  {
    name: "Mohammed Salim",
    role: "Contractor",
    location: "Mombasa",
    text: "They delivered our entire BOQ within 18 hours. No other supplier in the coast region comes close to their speed and reliability.",
    rating: 5,
  },
  {
    name: "Said Omar",
    role: "Procurement Officer",
    location: "Nairobi",
    text: "Saved us over Ksh 200,000 on our hotel renovation project. Their bulk pricing is unbeatable and the quality is always genuine.",
    rating: 5,
  },
  {
    name: "Amar Salim",
    role: "Civil Engineer",
    location: "Malindi",
    text: "Most reliable hardware supplier we've worked with. Genuine products, fair prices, and they actually pick up the phone when you call.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16 md:py-20">
      <h2 className="mb-3 text-center text-2xl font-bold tracking-tight text-[#111827] md:text-[28px]">
        What Our Clients Say
      </h2>
      <p className="mx-auto mb-10 max-w-md text-center text-sm text-[#6b7280]">
        Trusted by contractors, engineers, and procurement teams across Kenya
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="flex flex-col rounded-xl border border-[#e5e7eb] bg-white p-6 transition-all hover:border-[#ea580c]/20 hover:shadow-lg"
          >
            {/* Stars */}
            <div className="mb-4 text-[#f59e0b]">
              {"★".repeat(t.rating)}
            </div>

            {/* Quote */}
            <p className="mb-6 flex-1 text-sm leading-relaxed text-[#374151]">
              &ldquo;{t.text}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 border-t border-[#f3f4f6] pt-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ea580c]/10 text-sm font-bold text-[#ea580c]">
                {t.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="text-sm font-bold text-[#111827]">{t.name}</p>
                <p className="text-xs text-[#6b7280]">{t.role} · {t.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
