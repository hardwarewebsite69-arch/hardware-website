"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.innerWidth < 768;

    const lenis = new Lenis({
      duration: isMobile ? 0.6 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: isMobile ? 0.8 : 1,
    });

    lenisRef.current = lenis;

    // Link Lenis scroll event to ScrollTrigger
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Sync Lenis frame updates with GSAP Ticker
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(updateTicker);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
      lenisRef.current = null;
    };
  }, []);

  // Handle client-side routing redirects
  useEffect(() => {
    if (!lenisRef.current) return;

    // Force scroll position reset to top
    lenisRef.current.scrollTo(0, { immediate: true });

    // Allow Next.js route transition to complete and DOM to update before refreshing ScrollTrigger
    const timeoutId = setTimeout(() => {
      ScrollTrigger.clearScrollMemory();
      ScrollTrigger.refresh(true);
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return <>{children}</>;
}

export default SmoothScrollProvider;
