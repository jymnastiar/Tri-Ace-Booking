import Link from "next/link";

export default function MapPlaceholder({ alamat }: { alamat: string }) {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden animate-fade-up stagger-3">
      <div className="map-placeholder h-44 flex justify-center items-center relative text-center">
        gambar peta <br/> (disesuaikan saja nanti)
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-semibold text-title text-sm mb-0.5">Lokasi Venue</p>
            <p className="text-xs text-body">{alamat}</p>
          </div>
          <Link
            href=""
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-dark transition-colors shrink-0 mt-0.5"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <circle cx="12" cy="11" r="3" />
            </svg>
            Lihat Peta
          </Link>
        </div>
      </div>
    </div>
  );
}