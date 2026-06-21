/**
 * Pads a number with leading zeros to match the file naming convention (e.g., 0001)
 */
export function padZero(num: number, size: number = 4): string {
  let s = num.toString();
  while (s.length < size) s = "0" + s;
  return s;
}

/**
 * Preloads and decodes an image asynchronously.
 * Uses image.decode() if available to decode images off-thread, avoiding main-thread jank.
 */
export function preloadAndDecodeImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;

    const handleLoad = () => {
      if ("decode" in img && typeof img.decode === "function") {
        img
          .decode()
          .then(() => resolve(img))
          .catch((err) => {
            console.warn(`Failed off-thread decode for ${src}, falling back.`, err);
            resolve(img); // Fallback to standard load
          });
      } else {
        resolve(img);
      }
    };

    if (img.complete) {
      handleLoad();
    } else {
      img.onload = handleLoad;
      img.onerror = () => {
        console.error(`Failed to load image frame: ${src}`);
        reject(new Error(`Failed to load image frame: ${src}`));
      };
    }
  });
}

/**
 * Preloads all frames from startFrame to endFrame and decodes them.
 */
export async function preloadFrames(
  startFrame: number,
  endFrame: number
): Promise<HTMLImageElement[]> {
  const promises: Promise<HTMLImageElement>[] = [];

  for (let i = startFrame; i <= endFrame; i++) {
    const frameName = `output_frame_${padZero(i)}.jpg`;
    const path = `/hero-frames/${frameName}`;
    promises.push(preloadAndDecodeImage(path));
  }

  return Promise.all(promises);
}
