"use client";

import React, { useRef } from "react";
import { useHeroAnimation } from "../HeroAnimation/useHeroAnimation";
import { CanvasPlayer } from "../HeroAnimation/CanvasPlayer";
import { HeroOverlay } from "../HeroAnimation/HeroOverlay";
import { HeroContent } from "../HeroAnimation/HeroContent";

export function HeroSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const { phase, currentFrame, images, canvasOpacity } = useHeroAnimation({
    containerRef,
  });

  return (
    <section
      ref={containerRef}
      className="relative z-0 overflow-hidden pt-16 pb-24 lg:pt-20 lg:pb-32 font-sans min-h-screen flex items-center"
    >
      {/* 1. Underlying clean static background and dark ink linear mask */}
      <HeroOverlay />

      {/* 2. Top-layered Canvas rendering the frame-by-frame image sequence */}
      <CanvasPlayer
        images={images}
        currentFrame={currentFrame}
        opacity={canvasOpacity}
      />

      {/* 3. Fully editable UI Content overlaid on top */}
      <HeroContent phase={phase} />
    </section>
  );
}

export default HeroSection;
