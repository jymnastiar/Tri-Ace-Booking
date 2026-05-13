"use client";
import { useState, useEffect } from "react";
import Lightbox from "./lightBox";

export default function Gallery({ images }: { images: string[] }) {
  const [mainImg, setMainImg] = useState(images[0]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
  if (isLightboxOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
  return () => { document.body.style.overflow = ''; };
}, [isLightboxOpen]);

  return (
    <div className="flex gap-3 mb-6 animate-fade-up stagger-1">
      {/* Main image */}
      <div
        className="flex-1 min-w-0 relative rounded-2xl overflow-hidden h-112.5 cursor-pointer"
        onClick={() => {
          setLightboxIndex(images.indexOf(mainImg));
          setIsLightboxOpen(true);
        }}
      >
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
              className="w-full h-full object-cover min-h-15"
            />
          </div>
        ))}
      </div>

      {isLightboxOpen && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setIsLightboxOpen(false)}
          onPrev={() =>
            setLightboxIndex((prev) =>
              prev > 0 ? prev - 1 : images.length - 1
            )
          }
          onNext={() =>
            setLightboxIndex((prev) =>
              prev < images.length - 1 ? prev + 1 : 0
            )
          }
        />
      )}

    </div>
  );
}