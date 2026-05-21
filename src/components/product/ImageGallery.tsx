"use client";

import { useState } from "react";
import Image from "next/image";
import { getProductImage } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const validImages = images.filter(
    (img) => img.startsWith("http://") || img.startsWith("https://"),
  );

  if (validImages.length === 0) {
    return (
      <div className="aspect-square rounded-xl bg-void-100 flex items-center justify-center">
        <span className="text-text-muted text-sm">No image available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-void-100">
        <Image
          src={validImages[selectedIndex]}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {validImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                index === selectedIndex
                  ? "border-cyan"
                  : "border-border hover:border-void-300"
              }`}
            >
              <Image
                src={img}
                alt={`${title} ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
