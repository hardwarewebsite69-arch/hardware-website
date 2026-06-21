const testimonials = [
  {
    name: "Mohammed Salim",
    role: "General Contractor",
    location: "Mombasa",
    text: "Amroz Traders delivered our entire BOQ within 18 hours. No other supplier in the coast region comes close to their speed and reliability.",
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
    <section className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 py-24 md:py-32 font-sans">
      
      {/* Header */}
      <div className="mb-12 text-center">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 block mb-2">Social Proof</span>
        <h2 className="text-3xl font-black tracking-tight text-neutral-900 md:text-4xl font-display">
          What Our Clients Say
        </h2>
        <p className="mx-auto mt-2 max-w-md text-xs font-semibold text-neutral-450 leading-relaxed">
          Trusted by developers, contractors, and procurement teams across East Africa
        </p>
      </div>

      {/* Grid of Double-Bezel Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="double-bezel-card flex flex-col group h-full"
          >
            <div className="double-bezel-card-inner flex-1 flex flex-col justify-between">
              
              <div>
                {/* Rating Stars */}
                <div className="mb-4 text-orange-500 flex items-center gap-0.5">
                  {"★".repeat(t.rating)}
                </div>

                {/* Testimonial Quote */}
                <p className="text-sm font-semibold leading-relaxed text-neutral-600 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              {/* Author Details */}
              <div className="flex items-center gap-3 border-t border-neutral-100 pt-4 mt-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-600/10 text-xs font-black text-orange-600 uppercase font-mono">
                  {t.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-extrabold text-neutral-900 leading-tight truncate">{t.name}</p>
                  <p className="mt-0.5 text-[10px] font-semibold text-neutral-400 truncate">{t.role} · {t.location}</p>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
