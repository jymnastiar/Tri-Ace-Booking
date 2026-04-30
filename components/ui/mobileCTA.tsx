"use client";

export default function MobileCTA({ harga }: { harga: number }) {
  const scrollTo = () =>
    document.getElementById("ketersediaan")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="mobile-cta fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border px-4 py-3 items-center justify-between gap-3 shadow-lg">
      <div>
        <p className="text-xs text-muted">Mulai dari</p>
        <p className="font-bold text-title text-lg">
          Rp {harga.toLocaleString("id-ID")}{" "}
          <span className="text-xs font-normal text-muted">/sesi</span>
        </p>
      </div>
      <button
        onClick={scrollTo}
        className="flex-1 py-3 cursor-pointer rounded-btn bg-primary text-white font-bold text-sm shadow-md shadow-primary/30 hover:bg-primary-dark transition-colors max-w-xs"
      >
        Booking Lapangan
      </button>
    </div>
  );
}