import React from "react";
import Image from "next/image";

export function HeroOverlay() {
  return (
    <div className="absolute inset-0 -z-20 w-full h-full select-none pointer-events-none">
      {/* Static Background Images */}
      <Image
        src="/hero-bg2-clean.png"
        alt="Industrial warehouse"
        fill
        priority
        className="hidden object-cover object-right lg:block"
      />
      <Image
        src="/hero-mobile3.png"
        alt="Industrial warehouse mobile"
        fill
        priority
        className="block object-cover object-center lg:hidden"
      />

      {/* Radical dark ink linear mask for high readability */}
      {/* On desktop, a gradient from clear white-slate on the left to transparent on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/90 to-slate-50/0 hidden lg:block" />
      {/* On mobile, a high-density slate overlay for maximum copy readability */}
      <div className="absolute inset-0 bg-slate-50/90 block lg:hidden" />
    </div>
  );
}

export default HeroOverlay;
