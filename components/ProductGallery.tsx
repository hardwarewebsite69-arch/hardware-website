"use client";

import { useState } from "react";

type GalleryImage = {
  id: string;
  url: string;
};

export function ProductGallery({ images }: { images: GalleryImage[] }) {
  const [selected, setSelected] = useState(0);
  const current = images[selected];

  return (
    <div>
      <div
        className="aspect-square w-full rounded-xl bg-cover bg-center bg-neutral-100"
        style={{ backgroundImage: `url(${current.url})` }}
      />
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setSelected(i)}
              className={`aspect-square rounded-lg bg-cover bg-center bg-neutral-100 border-2 transition-all ${
                i === selected
                  ? "border-orange-500 ring-2 ring-orange-500/20"
                  : "border-slate-200 hover:border-slate-300"
              }`}
              style={{ backgroundImage: `url(${img.url})` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
