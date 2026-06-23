"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HeroOverlay } from "../HeroAnimation/HeroOverlay";
import { HeroContent } from "../HeroAnimation/HeroContent";
import { heroOpenerVideos } from "@/lib/site-config";

const MOBILE_MEDIA_QUERY = "(max-width: 767px)";

export function HeroSection() {
  const [isIntroActive, setIsIntroActive] = useState(true);
  const [checkingSession, setCheckingSession] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [posterUrl, setPosterUrl] = useState<string>(
    heroOpenerVideos.desktop.poster,
  );
  const [videoSrc, setVideoSrc] = useState<string>(
    heroOpenerVideos.desktop.mp4,
  );
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleIntroComplete = useCallback(() => {
    setIsIntroActive(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("hasPlayedIntro", "true");
    }
  }, []);

  // Initialize and check session storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasPlayed = sessionStorage.getItem("hasPlayedIntro");
      if (hasPlayed === "true") {
        setIsIntroActive(false);
      }
      setCheckingSession(false);
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    const updateMedia = () => {
      const isMobile = mediaQuery.matches;
      setPosterUrl(
        isMobile
          ? heroOpenerVideos.mobile.poster
          : heroOpenerVideos.desktop.poster,
      );
      // MP4 only — Safari/iOS does not play WebM and <source media=""> is unreliable on mobile.
      setVideoSrc(
        isMobile
          ? heroOpenerVideos.mobile.mp4
          : heroOpenerVideos.desktop.mp4,
      );
    };
    updateMedia();
    mediaQuery.addEventListener("change", updateMedia);
    return () => mediaQuery.removeEventListener("change", updateMedia);
  }, []);

  // Handle body scroll locking
  useEffect(() => {
    if (isIntroActive && !checkingSession) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isIntroActive, checkingSession]);

  // Fail-safe when video stalls, errors, or never starts (common on real mobile devices).
  useEffect(() => {
    if (!isIntroActive) return;

    const safetyTimeout = window.setTimeout(() => {
      const video = videoRef.current;
      const stalled =
        !video ||
        video.error != null ||
        (video.currentTime < 0.1 && video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA);

      if (stalled) {
        console.warn("Opener video failed to start in 4s. Bypassing intro.");
        handleIntroComplete();
      }
    }, 4000);

    return () => window.clearTimeout(safetyTimeout);
  }, [isIntroActive, handleIntroComplete]);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  // If we are still checking the session storage on initial SSR/mount,
  // return a clean black placeholder to prevent visual flash of the homepage content.
  if (checkingSession) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <>
      {/* 1. Cinematic Opener Video Overlay */}
      <AnimatePresence>
        {isIntroActive && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9990] bg-black select-none flex items-center justify-center overflow-hidden"
          >
            {/* The Video Player */}
            <video
              ref={videoRef}
              key={videoSrc}
              src={videoSrc}
              autoPlay
              muted={isMuted}
              playsInline
              preload="auto"
              poster={posterUrl}
              onEnded={handleIntroComplete}
              onError={handleIntroComplete}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />

            {/* Subtle Overlay to enhance cinematic branding text readability */}
            <div className="absolute inset-0 bg-black/35 z-10" />

            {/* Cinematic Branding Text Animation */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.95, 1, 1, 1.05],
                  y: [15, 0, 0, -10],
                }}
                transition={{
                  duration: 4.2,
                  times: [0, 0.3, 0.8, 1],
                  ease: "easeInOut",
                }}
                className="flex flex-col items-center gap-3 text-center"
              >
                <h2 className="text-4xl sm:text-6xl font-black tracking-[0.25em] text-white font-display uppercase drop-shadow-xl">
                  Amroz Traders
                </h2>
                <div className="h-[2px] w-24 bg-orange-600 rounded-full" />
                <p className="text-xs sm:text-sm tracking-[0.4em] text-orange-500 font-bold uppercase drop-shadow-md">
                  Industrial Hardware & Supplies
                </p>
              </motion.div>
            </div>

            {/* Controls Layer */}
            <div className="absolute bottom-8 left-8 right-8 z-30 flex items-center justify-between pointer-events-auto">
              {/* Volume Toggle */}
              <button
                onClick={toggleMute}
                className="flex items-center justify-center p-3.5 rounded-full bg-black/45 backdrop-blur-md border border-white/15 text-white hover:bg-black/65 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl cursor-pointer"
                title={isMuted ? "Unmute Intro" : "Mute Intro"}
              >
                <span className="material-symbols-outlined text-xl select-none">
                  {isMuted ? "volume_off" : "volume_up"}
                </span>
              </button>

              {/* Skip Button */}
              <button
                onClick={handleIntroComplete}
                className="group flex items-center gap-2 px-6 py-3 rounded-full bg-black/45 backdrop-blur-md border border-white/15 text-white font-bold text-xs tracking-widest uppercase hover:bg-black/65 hover:border-orange-500/40 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl cursor-pointer"
              >
                Skip Intro
                <span className="material-symbols-outlined text-sm transition-transform duration-300 group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Normal Hero Section Content */}
      <section className="relative z-0 overflow-hidden pt-16 pb-4 sm:pt-20 sm:pb-8 lg:pt-28 lg:pb-12 font-sans min-h-[auto] sm:min-h-screen flex items-center">
        {/* Underlying clean static background and dark ink linear mask */}
        <HeroOverlay />

        {/* Fully editable UI Content overlaid on top */}
        <HeroContent showContent={!isIntroActive} />
      </section>
    </>
  );
}

export default HeroSection;
