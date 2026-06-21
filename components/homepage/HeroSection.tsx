"use client";

import React from "react";
import { useHeroAnimation } from "../HeroAnimation/useHeroAnimation";
import { CanvasPlayer } from "../HeroAnimation/CanvasPlayer";
import { HeroOverlay } from "../HeroAnimation/HeroOverlay";
import { HeroContent } from "../HeroAnimation/HeroContent";

export function HeroSection() {
  const { phase, currentFrame, images, canvasOpacity } = useHeroAnimation();

  return (
    <section className="relative z-0 overflow-hidden pt-16 pb-24 lg:pt-20 lg:pb-32 font-sans min-h-[500px] lg:min-h-[600px] flex items-center">
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
