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
        <button className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-title text-xs font-semibold px-3 py-1.5 rounded-lg shadow hover:bg-white transition-colors border border-border">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          Lihat semua foto
        </button>
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