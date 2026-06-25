"use client";

import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { useState } from "react";

const projects = [
  {
    title: "Nyali Residential Complex",
    location: "Mombasa",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop",
    supplied: ["D12 & D16 Rebar", "Bamburi Tembo Cement", "Class 3 PVC Drainage Pipes"],
    duration: "6 Months Supply",
    value: "Ksh 12.8M",
  },
  {
    title: "Kilimani Office Tower",
    location: "Nairobi",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop",
    supplied: ["S275 Structural H-Beams", "Legrand Distribution Boards", "10 AWG Copper Cabling"],
    duration: "9 Months Supply",
    value: "Ksh 24.5M",
  },
  {
    title: "Mombasa Port Warehouse",
    location: "Mombasa",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
    supplied: ["AZ150 Pre-painted Roofing Sheets", "High-Spec Structural Fasteners", "Safety PPE Kits"],
    duration: "3 Months Supply",
    value: "Ksh 8.2M",
  },
];

function ProjectCard({
  p,
  active = false,
}: {
  p: (typeof projects)[number];
  active?: boolean;
}) {
  return (
    <div className={`double-bezel-card flex flex-col group h-full transition-all duration-300 ${
      active
        ? "ring-1 ring-orange-500/30 shadow-[0_30px_80px_-20px_rgba(234,88,12,.35)]"
        : ""
    }`}>
      <div className="double-bezel-card-inner flex-1 flex flex-col gap-4">
        
        {/* Image box */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-neutral-950">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />
          <Image 
            fill 
            className="absolute inset-0 h-full w-full object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-105" 
            src={p.image} 
            alt={p.title} 
          />
          <div className="absolute bottom-4 left-4 z-20">
            <span className="text-[9px] font-bold text-orange-400 uppercase tracking-widest">{p.location}</span>
            <h3 className="text-base font-bold text-white font-display leading-tight mt-0.5">{p.title}</h3>
          </div>
        </div>

        {/* Materials List */}
        <div className="flex-1 flex flex-col justify-between pt-2">
          <div>
            <h4 className="text-xs font-bold text-neutral-600 uppercase tracking-wider mb-2">Materials Supplied</h4>
            <ul className="space-y-1.5">
              {p.supplied.map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs font-semibold text-neutral-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-600 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] sm:text-xs font-bold text-neutral-600">
            <span>{p.duration}</span>
            <span className="text-neutral-900 font-extrabold">{p.value} Contract</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export function RecentProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: any
  ) => {
    const swipe = info.offset.x;
    const velocity = info.velocity.x;

    if (swipe < -60 || velocity < -500) {
      setActiveIndex((prev) =>
        Math.min(prev + 1, projects.length - 1)
      );
    }

    if (swipe > 60 || velocity > 500) {
      setActiveIndex((prev) =>
        Math.max(prev - 1, 0)
      );
    }
  };
  return (
    <section id="projects" className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 py-12 md:py-32 font-sans scroll-mt-20">
      
      {/* Section Header */}
      <div className="mb-12 flex items-end justify-between border-b border-neutral-200 pb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 block mb-2">Proof of Delivery</span>
          <h2 className="text-3xl font-black tracking-tight text-neutral-900 md:text-4xl font-display">
            Recent Projects Supplied
          </h2>
        </div>
      </div>

      {/* MOBILE CAROUSEL */}
      <div className="md:hidden">
        <div 
          className="relative"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight")
              setActiveIndex((i) =>
                Math.min(i + 1, projects.length - 1)
              );
            if (e.key === "ArrowLeft")
              setActiveIndex((i) =>
                Math.max(i - 1, 0)
              );
          }}
          tabIndex={0}
          role="region"
          aria-label="Project carousel"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -100 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
              drag="x"
              dragElastic={0.3}
              onDragEnd={handleDragEnd}
              dragConstraints={{ left: 0, right: 0 }}
            >
              <ProjectCard
                p={projects[activeIndex]}
                active={true}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className="relative h-2"
              aria-label={`Go to project ${index + 1}`}
              aria-current={index === activeIndex}
            >
              <div className="h-2 w-2 rounded-full bg-neutral-300 transition-all duration-300" />
              {index === activeIndex && (
                <motion.div
                  layoutId="carousel-indicator"
                  className="absolute inset-0 h-2 w-2 rounded-full bg-orange-600"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-3 gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </div>

    </section>
  );
}
