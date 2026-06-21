import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { preloadFrames } from "./preloadFrames";

export type AnimationPhase = "loading" | "playing" | "hold" | "crossfade" | "complete";

export function useHeroAnimation() {
  const [phase, setPhase] = useState<AnimationPhase>("loading");
  const [currentFrame, setCurrentFrame] = useState<number>(1);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  
  // Opacity of the canvas during crossfade
  const [canvasOpacity, setCanvasOpacity] = useState<number>(1);

  const isStartedRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (isStartedRef.current) return;
    isStartedRef.current = true;

    let active = true;

    async function loadSequence() {
      try {
        setPhase("loading");
        
        // Preload frames 1 to 37
        const loadedImages = await preloadFrames(1, 200);
        
        if (!active) return;
        setImages(loadedImages);
        setPhase("playing");

        // Object for GSAP to tween the frame property
        const frameObj = { frame: 1 };
        
        // Create GSAP Timeline for orchestrating the transition
        const tl = gsap.timeline({
          onComplete: () => {
            if (active) setPhase("complete");
          }
        });

        timelineRef.current = tl;

        // Stage 1: Play image sequence (1.2 seconds for 37 frames)
        tl.to(frameObj, {
          frame: 200,
          snap: "frame",
          ease: "none",
          duration: 8.0,
          onUpdate: () => {
            if (active) {
              setCurrentFrame(Math.floor(frameObj.frame));
            }
          }
        });

        // Stage 2: Hold on frame 37 (400ms hold)
        tl.to({}, { duration: 0.4 }, "+=0.0");

        // Stage 3: Crossfade (Canvas opacity fades out to reveal clean background)
        // Transition starts crossfade phase
        tl.add(() => {
          if (active) setPhase("crossfade");
        });

        // Fade canvas out over 700ms
        const opacityObj = { value: 1 };
        tl.to(opacityObj, {
          value: 0,
          duration: 0.7,
          ease: "power2.out",
          onUpdate: () => {
            if (active) {
              setCanvasOpacity(opacityObj.value);
            }
          }
        });

      } catch (error) {
        console.error("Failed to preload hero sequence frames", error);
        // Fallback directly to complete if error occurs
        if (active) setPhase("complete");
      }
    }

    loadSequence();

    return () => {
      active = false;
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  return {
    phase,
    currentFrame,
    images,
    canvasOpacity,
    isLoaded: phase !== "loading",
  };
}
