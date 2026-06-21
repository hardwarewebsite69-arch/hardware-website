import React, { useRef, useEffect, useState } from "react";
import { useCanvasSequence } from "./useCanvasSequence";

interface CanvasPlayerProps {
  images: HTMLImageElement[];
  currentFrame: number;
  opacity: number;
}

export function CanvasPlayer({ images, currentFrame, opacity }: CanvasPlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [firstFrameImage, setFirstFrameImage] = useState<HTMLImageElement | null>(null);

  // Load first frame immediately on mount to show it instantly
  useEffect(() => {
    const img = new Image();
    img.src = "/hero-frames/output_frame_0001.webp";
    
    const handleLoad = () => {
      if ("decode" in img && typeof img.decode === "function") {
        img.decode().then(() => setFirstFrameImage(img)).catch(() => setFirstFrameImage(img));
      } else {
        setFirstFrameImage(img);
      }
    };

    if (img.complete) {
      handleLoad();
    } else {
      img.onload = handleLoad;
    }
  }, []);

  // Determine active frame array and active index
  // If full images list is loaded, use it. Otherwise, use the single first frame image.
  const activeImages = images.length > 0 ? images : (firstFrameImage ? [firstFrameImage] : []);
  const activeIndex = images.length > 0 ? currentFrame : 1;

  // Use the canvas sequence drawer hook
  useCanvasSequence({
    canvasRef,
    images: activeImages,
    currentIndex: activeIndex,
  });

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden -z-10 select-none pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-cover transition-opacity duration-75"
        style={{
          opacity: opacity,
        }}
      />
    </div>
  );
}
export default CanvasPlayer;
