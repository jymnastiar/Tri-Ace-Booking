import { BadmintonIcon } from "@/src/icons";
import Link from "next/link";

export default function EmptyBooking() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-title tracking-tight">
          Booking Saya
        </h1>
      </div>
      <div className="bg-white rounded-2xl border border-border shadow-sm flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary-light flex items-center justify-center mb-4 text-3xl">
          <BadmintonIcon className="w-10 h-10"/>
        </div>
        <p className="text-title font-semibold text-lg mb-1">Belum ada booking</p>
        <p className="text-muted text-sm mb-6 max-w-xs">
          Kamu belum pernah melakukan pemesanan lapangan. Yuk, mulai booking sekarang!
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-btn bg-primary text-white text-sm font-semibold shadow-md shadow-primary/25 hover:bg-primary-dark transition-colors duration-200"
        >
          Cari Venue
        </Link>
      </div>
    </main>
  );
}