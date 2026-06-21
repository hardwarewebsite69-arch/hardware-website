import { useEffect, useRef, useCallback } from "react";

interface UseCanvasSequenceProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  images: HTMLImageElement[];
  currentIndex: number;
}

export function useCanvasSequence({
  canvasRef,
  images,
  currentIndex,
}: UseCanvasSequenceProps) {
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  // Cover calculation: object-fit cover equivalent for canvas
  const drawImageProp = useCallback((
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement
  ) => {
    const canvas = ctx.canvas;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    const imgWidth = img.naturalWidth || img.width;
    const imgHeight = img.naturalHeight || img.height;

    if (imgWidth === 0 || imgHeight === 0) return;

    const canvasRatio = canvasWidth / canvasHeight;
    const imgRatio = imgWidth / imgHeight;

    let sWidth = imgWidth;
    let sHeight = imgHeight;
    let sx = 0;
    let sy = 0;

    // Cover logic
    if (canvasRatio > imgRatio) {
      // Canvas is wider than image aspect ratio, crop vertically
      sHeight = imgWidth / canvasRatio;
      sy = (imgHeight - sHeight) / 2;
    } else {
      // Canvas is taller than image aspect ratio, crop horizontally
      sWidth = imgHeight * canvasRatio;
      sx = (imgWidth - sWidth) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, canvasWidth, canvasHeight);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    contextRef.current = ctx;

    // Get the dimensions of the parent container to prevent layout shifts
    const rect = canvas.parentElement?.getBoundingClientRect() || {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Device Pixel Ratio scaling for Retina displays
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    
    // Scale context to match physical pixel resolution
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Set CSS dimensions to match layout
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Reset scales
    ctx.scale(1, 1);

    // Draw active frame after resize
    const activeImage = images[currentIndex - 1];
    if (activeImage) {
      drawImageProp(ctx, activeImage);
    }
  }, [canvasRef, images, currentIndex, drawImageProp]);

  // Handle draw operations on index change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let ctx = contextRef.current;
    if (!ctx) {
      ctx = canvas.getContext("2d");
      contextRef.current = ctx;
    }

    if (!ctx) return;

    const activeImage = images[currentIndex - 1];
    if (activeImage) {
      drawImageProp(ctx, activeImage);
    }
  }, [currentIndex, images, drawImageProp, canvasRef]);

  // Setup resize listeners
  useEffect(() => {
    if (typeof window === "undefined") return;

    resizeCanvas();
    
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [resizeCanvas]);

  return {
    resizeCanvas,
  };
}
