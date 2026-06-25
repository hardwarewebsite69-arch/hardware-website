"use client";

import { useState, useEffect } from "react";
import {
  motion,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";

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

function TestimonialCard({
  testimonial,
  active = false,
}: {
  testimonial: (typeof testimonials)[number];
  active?: boolean;
}) {
  return (
    <div
      className={`double-bezel-card h-full transition-all duration-500 ${
        active
          ? "ring-1 ring-orange-500/20 shadow-[0_30px_80px_-20px_rgba(234,88,12,.25)]"
          : ""
      }`}
    >
      <div className="double-bezel-card-inner flex h-full flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="mb-5 flex items-center gap-1">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <span key={i} className="text-orange-500 text-base">
                ★
              </span>
            ))}
          </div>

          {/* Quote */}
          <blockquote className="text-[15px] leading-relaxed font-semibold text-neutral-600 italic">
            &ldquo;{testimonial.text}&rdquo;
          </blockquote>
        </div>

        {/* Footer */}
        <div className="mt-8 border-t border-neutral-100 pt-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-600/10 text-xs font-black uppercase text-orange-600">
              {testimonial.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-black text-neutral-900">
                {testimonial.name}
              </p>

              <p className="truncate text-xs font-semibold text-neutral-500">
                {testimonial.role}
              </p>

              <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wider text-orange-600">
                {testimonial.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  // Auto-advance the mobile carousel every 4 s, looping back to 0 infinitely.
  // The interval is cleared on unmount to prevent memory leaks.
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 py-24 md:py-32 font-sans">
      {/* Header */}
      <div className="mb-12 text-center">
        <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">
          Social Proof
        </span>

        <h2 className="font-display text-3xl font-black tracking-tight text-neutral-900 md:text-4xl">
          What Our Clients Say
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm font-medium leading-relaxed text-neutral-500">
          Trusted by developers, contractors, and procurement teams across East
          Africa
        </p>
      </div>

      {/*
        ── MOBILE CAROUSEL ──────────────────────────────────────────────────
        Fix 1 (prev): min-h-[290px] + mode="popLayout" — stops section
        collapsing to 0px between card transitions (CLS / layout shift).

        Fix 2 (this): Two further changes to stop the FloatingActions bar
        from visually co-animating every time cards cross-fade:

        A. `[contain:layout_paint_style]` on the wrapper
           Without CSS containment, Framer Motion's per-frame
           `transform: translateX()` writes have no boundary — the browser
           treats them as document-level changes and triggers a full
           compositor flush on every animation frame. That flush rebuilds
           the GPU layer tree, which momentarily repositions every
           composited element including the `position:fixed` bar.

           `contain: layout paint style` creates a hard paint boundary:
           all repaints and layer promotions inside this div are scoped
           entirely to it. Nothing leaks out to the document compositor.

        B. Opacity-only animation (no `x` translation)
           `transform: translateX()` causes the browser to:
             – promote the element to a new compositor layer (layer tree
               rebuild → visible as a 1-frame flash on the fixed bar)
             – run the animation on the main thread (not compositor thread)
             – de-promote the layer when the animation ends (another flash)

           `opacity` animations run 100% on the **compositor thread**.
           No layout, no layer-tree changes, no side-effects on any other
           element. The fixed bar never sees a flush.
        ─────────────────────────────────────────────────────────────────── */}
      <div
        className="md:hidden relative w-full min-h-[290px] flex flex-col [contain:layout_paint_style]"
        role="region"
        aria-label="Testimonials carousel"
        aria-live="polite"
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.35,
              ease: "easeInOut",
            }}
            className="w-full"
          >
            <TestimonialCard
              testimonial={testimonials[activeIndex]}
              active={true}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* DESKTOP GRID — untouched */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.name}
            className="group h-full transition-transform duration-500 hover:-translate-y-1"
          >
            <TestimonialCard testimonial={testimonial} active />
          </div>
        ))}
      </div>
    </section>
  );
}