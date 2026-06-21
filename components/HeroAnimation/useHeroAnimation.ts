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
}

export function useHeroAnimation({ containerRef }: UseHeroAnimationProps) {
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

    async function initScrollSequence() {
      try {
        setPhase("loading");
        
        // Preload frames 1 to 37
        const loadedImages = await preloadFrames(1, 37);
        
        if (!active) return;
        setImages(loadedImages);
        setPhase("playing");

        const targetContainer = containerRef.current;
        if (!targetContainer) return;

        const frameObj = { frame: 1 };
        const opacityObj = { value: 1 };

        // Create the ScrollTrigger timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: targetContainer,
            start: "top top",
            end: "+=2000", // Pinned scroll distance (scrubbing space)
            scrub: 0.5,    // Smooth scrub to avoid mouse jitter
            pin: true,     // Pin the hero section
            anticipatePin: 1,
            onUpdate: (self) => {
              if (!active) return;
              const progress = self.progress;

              // Phase transitions based on scroll progress:
              // 0.0 -> 0.5: playing frames
              // 0.5 -> 0.65: hold frame 37
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

        // Force ScrollTrigger to calculate initial bounds immediately
        ScrollTrigger.refresh();

        // 1. Scrub frames (0% to 50% scroll progress)
        tl.to(
          frameObj,
          {
            frame: 37,
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

        // 2. Hold frame 37 (50% to 65% scroll progress)
        tl.to(
          {},
          {
            duration: 0.3, // holds on frame 37
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
      if (timelineRef.current) {
        if (timelineRef.current.scrollTrigger) {
          timelineRef.current.scrollTrigger.kill(true); // Revert layout pinning and spacers!
        }
        timelineRef.current.kill();
      }
      ScrollTrigger.refresh();
      isStartedRef.current = false; // Reset start indicator for remounting!
    };
  }, [containerRef]);

  return {
    phase,
    currentFrame,
    images,
    canvasOpacity,
    isLoaded: phase !== "loading",
  };
}
