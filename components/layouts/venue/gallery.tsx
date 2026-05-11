"use client";
import { useState } from "react";

export default function Gallery({ images }: { images: string[] }) {
  const [mainImg, setMainImg] = useState(images[0]);

  return (
    <div className="flex gap-3 mb-6 animate-fade-up stagger-1">
      {/* Main image */}
      <div className="flex-1 min-w-0 relative rounded-2xl overflow-hidden" style={{ height: 400 }}>
        <img
          src={mainImg}
          alt="Venue main"
          className="gallery-main w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="hidden sm:flex flex-col gap-2 w-36 lg:w-44">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`thumb rounded-xl overflow-hidden flex-1 ${img === mainImg ? "active" : ""}`}
            onClick={() => setMainImg(img)}
          >
            <img
              src={img}
              alt={`thumb ${idx + 1}`}
              className="w-full h-full object-cover"
              style={{ minHeight: 60 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}