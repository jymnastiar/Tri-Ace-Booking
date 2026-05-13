"use client";

import ComingSoon from "@/components/layouts/development/coming-soon";
import Link from "next/link";
import { useState } from "react";

export default function ReschedulePage() {
  const [development, setDevelopment] = useState(true)

  return development ? <ComingSoon/> :
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#E0F2FE] mb-4">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <path d="M16 2v4M8 2v4M3 10h18"/>
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-heading tracking-tight">Reschedule Booking</h1>
          <p className="text-sm text-body mt-1">Pilih jadwal baru untuk booking kamu</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#E2E8F0]">

            {/* Current booking info */}
            <div>
              <div className="bg-linear-to-r from-primary to-primary/80 px-6 py-4">
                <p className="text-white font-bold text-sm">Booking Saat Ini</p>
                <p className="text-sky-100 text-xs mt-0.5">Detail jadwal yang ingin diubah</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E0F2FE] flex items-center justify-center shrink-0 text-base">
                    🏸
                  </div>
                  <div>
                    <p className="text-xs text-[#94A3B8] font-medium">Olahraga</p>
                    <p className="text-sm font-semibold text-[#0F172A]">Badminton</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E0F2FE] flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round">
                      <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <circle cx="12" cy="11" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-[#94A3B8] font-medium">Venue</p>
                    <p className="text-sm font-semibold text-[#0F172A]">GOR Sport Center</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E0F2FE] flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-[#94A3B8] font-medium">Jadwal</p>
                    <p className="text-sm font-semibold text-[#0F172A]">16 Mei 2026, Pukul 19:00</p>
                  </div>
                </div>

                {/* Info box */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mt-2">
                  <div className="flex gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" className="shrink-0 mt-0.5">
                      <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
                    </svg>
                    <p className="text-xs text-amber-700 leading-relaxed">
                      Reschedule hanya bisa dilakukan maksimal <strong>24 jam</strong> sebelum jadwal berlangsung.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* New schedule form */}
            <div>
              <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-6 py-4">
                <p className="text-[#0F172A] font-bold text-sm">Jadwal Baru</p>
                <p className="text-[#94A3B8] text-xs mt-0.5">Tentukan tanggal dan waktu pengganti</p>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-2">Pilih Tanggal</label>
                  <div className="relative">
                    <input
                      aria-label="reschedule-date"
                      type="date"
                      className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 bg-white text-sm text-[#0F172A] focus:outline-none focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 transition-all"/>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-2">Pilih Waktu</label>
                  <div className="relative">
                    <input
                      aria-label="reschedule-time"
                      type="time"
                      className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 bg-white text-sm text-[#0F172A] focus:outline-none focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Placeholder availability hint */}
                <div className="bg-[#E0F2FE] rounded-xl px-4 py-3">
                  <p className="text-xs text-[#0284C7] font-medium">
                    💡 Pilih tanggal untuk melihat ketersediaan slot lapangan.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 px-6 py-5 border-t border-[#E2E8F0] bg-[#F8FAFC]">
            <Link
              href="/booking"
              className="flex-1 flex items-center justify-center gap-2 bg-[#0EA5E9] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#0284C7] transition-colors shadow-md shadow-sky-200">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
              Konfirmasi Reschedule
            </Link>
            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 border-2 border-[#E2E8F0] text-body py-3 rounded-xl font-semibold text-sm hover:bg-white hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
}
