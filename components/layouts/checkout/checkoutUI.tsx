"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Trophy } from 'lucide-react';
import paymentMethods from '@/data/payment.json';

interface BookingData {
  id: string;
  venue_id: string;
  olahraga_slug: string;
  tanggal: string;
  ri: number;
  ci: number;
  status: string;
}

interface VenueInfo {
  nama: string;
  id: string;
}

interface OlahragaInfo {
  nama: string;
  slug: string;
  ikon: string;
}

interface CheckoutUIProps {
  bookingId: string;
  bookings: BookingData[];
  venue: VenueInfo | null;
  olahraga: OlahragaInfo | null;
  hargaPerJam: number;
  totalSewa: number;
  biayaLayanan: number;
  total: number;
}

export default function CheckoutUI({
  bookingId,
  bookings,
  venue,
  olahraga,
  hargaPerJam,
  totalSewa,
  biayaLayanan,
  total,
}: CheckoutUIProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  // Format slot (misal: "Lapangan 1, Jam ke-2")
  const slotList = bookings
    .map((b) => `Lapangan ${b.ci + 1}, Jam ke-${b.ri + 1}`)
    .join(', ');

  return (
    <div className="h-screen bg-[#F8F9FA] font-sans flex flex-col overflow-hidden">
      {/* <header className="h-[10vh] flex justify-center items-center px-6 bg-white shadow-sm shrink-0">
      </header> */}

      <main className="flex-1 max-w-6xl mx-auto w-full p-6 flex gap-6 flex-col justify-center overflow-y-auto">
        <h1 className="text-3xl font-bold self-center text-gray-900">Pembayaran</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ringkasan Pesanan */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-fit">
            <h2 className="bg-[#30A9E3] text-white px-6 py-3 text-lg font-bold">
              Ringkasan Pesanan
            </h2>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Trophy className="text-[#30A9E3]" size={20} />
                <span>{olahraga?.nama ?? bookings[0].olahraga_slug}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-[#30A9E3]" size={20} />
                <span>{venue?.nama ?? '-'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="text-[#30A9E3]" size={20} />
                <span>{bookings[0].tanggal} – {slotList}</span>
              </div>
            </div>
          </section>

          {/* Detail Harga */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-fit">
            <h2 className="bg-[#30A9E3] text-white px-6 py-3 text-lg font-bold">
              Detail Harga
            </h2>
            <div className="p-6 space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Sewa Lapangan ({bookings.length} slot)</span>
                <span>Rp {totalSewa.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Biaya Layanan</span>
                <span>Rp {biayaLayanan.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-gray-900 text-lg font-bold border-t pt-3">
                <span>Total Pembayaran</span>
                <span>Rp {total.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </section>
        </div>

        {/* Metode Pembayaran */}
        <section className="mt-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Pilih Metode Pembayaran
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className="flex flex-col items-center gap-2 group transition-transform active:scale-95">
                <div
                  className={`w-full aspect-4/3 bg-white rounded-lg flex items-center justify-center p-4 border-2 transition-all ${
                    selectedMethod === method.id
                      ? 'border-[#30A9E3] bg-blue-50'
                      : 'border-transparent group-hover:border-blue-100 shadow-sm'}`}>
                  <img
                    src={method.logo}
                    alt={method.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <span
                  className={`text-[10px] md:text-xs font-semibold ${
                    selectedMethod === method.id
                      ? 'text-[#30A9E3]'
                      : 'text-gray-500'}`}>
                  {method.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Tombol Aksi */}
        <div className="flex gap-4 mt-4 pb-2">
          <Link
            href={`/vanue/${venue?.id ?? ''}`}
            className="flex-1 border-2 border-[#30A9E3] text-[#30A9E3] py-3 rounded-lg font-bold text-lg text-center hover:bg-blue-50 transition-colors">
            Batalkan
          </Link>
          <Link
            href={
              selectedMethod
                ? `/checkout/${bookingId}/confirm?method=${selectedMethod}`
                : '#'
            }
            className={`flex-1 py-3 rounded-lg font-bold text-lg shadow-md text-center transition-all ${
              selectedMethod
                ? 'bg-[#30A9E3] text-white hover:bg-[#2898cc]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={(e) => {
              if (!selectedMethod) e.preventDefault();
            }}>
            Bayar Sekarang
          </Link>
        </div>
      </main>
    </div>
  );
}