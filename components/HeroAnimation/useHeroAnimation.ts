import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { preloadFrames } from "./preloadFrames";

export type AnimationPhase = "loading" | "playing" | "hold" | "crossfade" | "complete";

// Register ScrollTrigger on client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseHeroAnimationProps {
  containerRef: React.RefObject<HTMLElement | null>;
  totalFrames?: number;
}

export function useHeroAnimation({ containerRef, totalFrames = 170 }: UseHeroAnimationProps) {
  const [phase, setPhase] = useState<AnimationPhase>("loading");
  const [currentFrame, setCurrentFrame] = useState<number>(1);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [canvasOpacity, setCanvasOpacity] = useState<number>(1);

  const isStartedRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (isStartedRef.current) return;
    isStartedRef.current = true;

    let active = true;
    let ctx: gsap.Context | null = null;

    async function initScrollSequence() {
      try {
        const targetContainer = containerRef.current;
        if (!targetContainer) return;

        setPhase("loading");

        // 1. Initialize the GSAP scroll timeline IMMEDIATELY to lock layout & pinning
        ctx = gsap.context(() => {
          const frameObj = { frame: 1 };
          const opacityObj = { value: 1 };
          const scrollDistance = Math.max(2000, totalFrames * 50);

          // Create the ScrollTrigger timeline
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: targetContainer,
              start: "top top",
              end: `+=${scrollDistance}`, // Pinned scroll distance (scrubbing space)
              scrub: 0.5,    // Smooth scrub to avoid mouse jitter
              pin: true,     // Pin the hero section
              anticipatePin: 1,
              onUpdate: (self) => {
                if (!active) return;
                const progress = self.progress;

                // Phase transitions based on scroll progress:
                // 0.0 -> 0.5: playing frames
                // 0.5 -> 0.65: hold last frame
                // 0.65 -> 0.90: crossfade (fade canvas opacity)
                // 0.90 -> 1.00: complete
                if (progress >= 0.9) {
                  setPhase("complete");
                } else if (progress >= 0.65) {
                  setPhase("crossfade");
                } else if (progress >= 0.5) {
                  setPhase("hold");
                } else {
                  setPhase("playing");
                }
              },
            },
          });

          timelineRef.current = tl;

          // 1. Scrub frames (0% to 50% scroll progress)
          tl.to(
            frameObj,
            {
              frame: totalFrames,
              ease: "none",
              duration: 1.0, // relative duration share
              onUpdate: () => {
                if (active) {
                  setCurrentFrame(Math.floor(frameObj.frame));
                }
              },
            },
            0 // Start at timeline timestamp 0
          );

          // 2. Hold last frame (50% to 65% scroll progress)
          tl.to(
            {},
            {
              duration: 0.3, // holds on last frame
            },
            1.0 // relative timeline position
          );

          // 3. Crossfade (65% to 90% scroll progress)
          tl.to(
            opacityObj,
            {
              value: 0,
              ease: "power1.inOut",
              duration: 0.5, // fades canvas opacity to 0
              onUpdate: () => {
                if (active) {
                  setCanvasOpacity(opacityObj.value);
                }
              },
            },
            1.3 // relative timeline position
          );

          // 4. End margin padding (90% to 100% scroll progress)
          tl.to(
            {},
            {
              duration: 0.2, // padding space at end
            },
            1.8 // relative timeline position
          );
        }, targetContainer);

        // Force ScrollTrigger to calculate initial bounds immediately to prevent layout jumps
        ScrollTrigger.refresh();

        // 2. Preload frames in the background
        const loadedImages = await preloadFrames(1, totalFrames);
        
        if (!active) return;
        setImages(loadedImages);

        // Sync initial phase state with current scroll progress after load completes
        if (timelineRef.current && timelineRef.current.scrollTrigger) {
          const progress = timelineRef.current.scrollTrigger.progress;
          if (progress >= 0.9) {
            setPhase("complete");
          } else if (progress >= 0.65) {
            setPhase("crossfade");
          } else if (progress >= 0.5) {
            setPhase("hold");
          } else {
            setPhase("playing");
          }
        } else {
          setPhase("playing");
        }

      } catch (error) {
        console.error("Failed to initialize scroll sequence", error);
        if (active) setPhase("complete");
      }
    }

    // Delay initialization slightly to ensure Next.js has mounted and layouts are stable
    const timeoutId = setTimeout(() => {
      initScrollSequence();
    }, 100);

    return () => {
      active = false;
      clearTimeout(timeoutId);
      if (ctx) {
        ctx.revert(); // Reverts and cleans up all GSAP & ScrollTriggers created in context
      }
      ScrollTrigger.refresh();
      isStartedRef.current = false; // Reset start indicator for remounting!
    };
  }, [containerRef, totalFrames]);

  return {
    phase,
    currentFrame,
    images,
    canvasOpacity,
    isLoaded: phase !== "loading",
  };
}
