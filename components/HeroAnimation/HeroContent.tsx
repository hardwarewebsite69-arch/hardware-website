"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";

const popularSearches = [ "Cement", "Power Tools",  "Paint"];

const trustMetrics = [
  { value: "1,200+", label: "Contractors", icon: "groups" },
  { value: "10,000+", label: "Genuine SKUs", icon: "inventory_2" },
  { value: "Under 24hr", label: "Quotation SLA", icon: "schedule" },
  { value: "Nationwide", label: "Site Delivery", icon: "local_shipping" },
];

interface HeroContentProps {
  showContent: boolean;
}

/**
 * Animated numerical statistics counter.
 * Parses strings like "1,200+" or "Under 24hr" and animates the count upward.
 */
function StatsCounter({ value, trigger, delay }: { value: string; trigger: boolean; delay: number }) {
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!trigger) return;

    // Matches digits and commas
    const match = value.match(/([\d,]+)/);
    if (!match) {
      // Non-numeric metric (e.g. "Nationwide"), show it after delay
      const timeout = setTimeout(() => {
        setDisplayValue(value);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }

    const numStr = match[1].replace(/,/g, "");
    const targetNum = parseInt(numStr, 10);
    const prefix = value.substring(0, value.indexOf(match[1]));
    const suffix = value.substring(value.indexOf(match[1]) + match[1].length);

    const obj = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: targetNum,
        duration: 1.5,
        ease: "power2.out",
        delay: delay,
        onUpdate: () => {
          const formatted = Math.floor(obj.val).toLocaleString();
          setDisplayValue(`${prefix}${formatted}${suffix}`);
        },
      });
    });

    return () => ctx.revert();
  }, [value, trigger, delay]);

  return <span>{displayValue}</span>;
}

export function HeroContent({ showContent }: HeroContentProps) {
  // Trigger entrance animations when showContent is true
  const triggerEntrance = showContent;

  // Base Framer Motion variants
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 25 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // Custom cubic-bezier (ease-out-expo)
        delay: delay,
      },
    }),
  };

  const scaleInVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (delay: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        delay: delay,
      },
    }),
  };

  const slideInRightVariant = {
    hidden: { opacity: 0, x: 40 },
    visible: (delay: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        delay: delay,
      },
    }),
  };

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 relative z-10 pt-12 pb-12 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-32 font-sans select-none">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left Column: Branding and Actions */}
        <div className="flex flex-col gap-6 lg:col-span-7 lg:gap-8">
          
          {/* 1. Headline fades up */}
          <motion.h1
            custom={0}
            variants={fadeUpVariant}
            initial="hidden"
            animate={triggerEntrance ? "visible" : "hidden"}
            className="text-4xl font-black leading-[1.08] tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl font-display"
          >
            The Material Backbone of{" "}
            <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Kenyan Projects.
            </span>
          </motion.h1>

          {/* 2. Paragraph fades up */}
          <motion.p
            custom={0.15}
            variants={fadeUpVariant}
            initial="hidden"
            animate={triggerEntrance ? "visible" : "hidden"}
            className="max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg font-medium"
          >
            Supplying certified structural steels, electrical panels, industrial piping, and professional machinery directly to project sites across Kenya.
          </motion.p>

          {/* 3. Search bar expands/fades up */}
          <motion.form
            action="/search"
            custom={0.3}
            variants={scaleInVariant}
            initial="hidden"
            animate={triggerEntrance ? "visible" : "hidden"}
            className="flex w-full max-w-xl overflow-hidden rounded-full border-2 border-neutral-300 bg-white p-1.5 shadow-lg shadow-neutral-900/5 transition-all duration-300 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/15"
          >
            <div className="flex flex-1 items-center px-3">
              <span className="material-symbols-outlined text-neutral-400 text-xl select-none">search</span>
              <input
                className="w-full bg-transparent px-2.5 py-2.5 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 font-sans"
                name="q"
                placeholder="Search 10,000+ products, SKUs, or materials..."
                type="search"
                required
              />
            </div>
            <button
              className="rounded-full bg-orange-600 px-6 py-2.5 text-xs font-bold text-white transition-all duration-300 hover:bg-orange-700 active:scale-95 shadow-md cursor-pointer"
              type="submit"
            >
              Search
            </button>
          </motion.form>

          {/* 4. Popular category chips fade in */}
          <motion.div
            custom={0.45}
            variants={fadeUpVariant}
            initial="hidden"
            animate={triggerEntrance ? "visible" : "hidden"}
            className="flex flex-wrap items-center gap-2 text-xs"
          >
            <span className="font-bold text-neutral-400">Popular:</span>
            {popularSearches.map((tag) => (
              <Link
                key={tag}
                href={`/search?q=${encodeURIComponent(tag)}`}
                className="rounded-full border border-neutral-200 bg-white px-3 py-1 font-semibold text-neutral-700 transition-all duration-300 hover:border-orange-500 hover:text-orange-600 hover:shadow-sm"
              >
                {tag}
              </Link>
            ))}
          </motion.div>

          {/* CTAs Wrapper */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* 5. Primary CTA button scales in */}
            <motion.div
              custom={0.6}
              variants={scaleInVariant}
              initial="hidden"
              animate={triggerEntrance ? "visible" : "hidden"}
            >
              <Link
                className="group flex h-12 items-center justify-center gap-2 rounded-full bg-orange-600 px-8 text-sm font-bold text-white shadow-lg shadow-orange-600/15 transition-all duration-300 hover:scale-[1.02] hover:bg-orange-700 active:scale-95"
                href="/quote"
              >
                Get Custom Quote
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:translate-x-1">
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </div>
              </Link>
            </motion.div>

            {/* 6. Secondary CTA fades in */}
            <motion.div
              custom={0.7}
              variants={fadeUpVariant}
              initial="hidden"
              animate={triggerEntrance ? "visible" : "hidden"}
            >
              <Link
                className="flex h-12 items-center justify-center rounded-full border border-neutral-300 bg-white px-8 text-sm font-bold text-neutral-800 transition-all duration-300 hover:bg-neutral-50 hover:border-neutral-300 active:scale-95"
                href="/shop"
              >
                Browse Materials
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Interactive BOQ Upload Widget (Desktop Only) */}
        {/* 7. BOQ upload card slides in from the right */}
        <motion.div
          custom={0.85}
          variants={slideInRightVariant}
          initial="hidden"
          animate={triggerEntrance ? "visible" : "hidden"}
          className="hidden lg:block lg:col-span-5"
        >
          <div className="double-bezel-card w-full">
            <div className="double-bezel-card-inner flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600/5 text-orange-600">
                  <span className="material-symbols-outlined">cloud_upload</span>
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-neutral-900">Direct BOQ Sourcing</h3>
                  <p className="text-[11px] font-semibold text-neutral-400">PDF, Excel, or Image Lists</p>
                </div>
              </div>

              <div className="border border-dashed border-neutral-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 bg-neutral-50/50 hover:bg-neutral-50 hover:border-orange-500/30 transition-all cursor-pointer group">
                <span className="material-symbols-outlined text-4xl text-neutral-300 group-hover:text-orange-500 group-hover:scale-105 transition-all duration-300">description</span>
                <div className="text-center font-sans">
                  <p className="text-xs font-bold text-neutral-800">Drag & drop your materials list</p>
                  <p className="text-[10px] text-neutral-400 mt-1">Accepts PDF, Excel, Word documents</p>
                </div>
                <Link
                  href="/quote/upload"
                  className="rounded-full bg-neutral-900 px-4 py-1.5 text-[10px] font-bold text-white hover:bg-neutral-800 active:scale-95 transition-all"
                >
                  Select File
                </Link>
              </div>

              <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-500 border-t border-neutral-100 pt-4">
                <span className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  24h Response
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    {/* 8. Trust badges fade in & 9. Statistics count upward */}
<motion.div
  custom={1.0}
  variants={fadeUpVariant}
  initial="hidden"
  animate={triggerEntrance ? "visible" : "hidden"}
  className="mt-6 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-neutral-300/60 pt-6 sm:mt-12 sm:pt-8 sm:grid-cols-4 sm:gap-y-0 sm:divide-x sm:divide-neutral-300/40"
>
  {trustMetrics.map((m, i) => (
    <div 
      key={m.label} 
      className="flex items-start gap-3.5 sm:first:pl-0 sm:pl-6"
    >
      {/* Icon Container: Increased background opacity to pop against the busy image background */}
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-600/12 text-orange-600 shadow-sm backdrop-blur-[2px]">
        <span className="material-symbols-outlined text-xl select-none" aria-hidden="true">
          {m.icon}
        </span>
      </div>
      
      {/* Text Container */}
      <div className="flex flex-col pt-0.5">
        <span className="text-lg font-bold tracking-tight text-neutral-900 leading-none tabular-nums">
          {/* Statistics count upward delay starts at 1.15s */}
          <StatsCounter
            value={m.value}
            trigger={triggerEntrance}
            delay={1.15 + i * 0.1}
          />
        </span>
        {/* Darkened from neutral-400 to neutral-600 for WCAG AA contrast compliance over the image */}
        <span className="mt-1 text-xs font-medium text-neutral-600 tracking-wide">
          {m.label}
        </span>
      </div>
    </div>
  ))}
</motion.div>
    </div>
  );
}

export default HeroContent;
