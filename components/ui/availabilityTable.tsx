"use client";

import type { Olahraga, JamOperasional } from "@/types/availability";
import { useAvailability } from "@/hooks/useAvailability";
import Image from "next/image";
import { useState } from "react";
import AlertModal from "@/components/ui/alertModal";
import { useRef } from 'react';

const OLAHRAGA_ICON_MAP: Record<string, string> = {
  badminton: "badminton.svg",
  volley: "volley.svg",
  basket: "basket.svg",
  football: "football.svg",
  tennis: "tennis.svg",
  bowling: "bowling.svg",
};

export default function AvailabilityTable({
  olahraga,
  jamOperasional,
  initialBookedSlots = [],
  tanggal,
  onTanggalChange,
  onOlahragaChange,
  onCheckout,
}: {
  olahraga: Olahraga[];
  jamOperasional: JamOperasional;
  initialBookedSlots?: [number, number][];
  venueId: string;
  tanggal: string;
  onTanggalChange: (tgl: string) => void;
  onOlahragaChange: (slug: string) => void;
  onCheckout: (selectedSlots: [number, number][], olahragaSlug: string) => Promise<void> | void;
}) {
  const {
    selectedIdx,
    setSelectedIdx,
    activeOlahraga,
    slots,
    isUnavailable,
    isSelectedTemp,
    toggleSlot,
    handleCheckout,
    slotLimitAlert,
    setSlotLimitAlert,
    emptySlotAlert,
    setEmptySlotAlert,
    simulationAlert,
    setSimulationAlert,
    isCheckingOut,
  } = useAvailability({ olahraga, jamOperasional, initialBookedSlots, onCheckout });

  const dateRef = useRef<HTMLInputElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleOlahragaSelect = (idx: number) => {
    setSelectedIdx(idx);
    onOlahragaChange(olahraga[idx].slug);
    setDropdownOpen(false);
  };

  return (
    <div className="animate-fade-up stagger-5" id="ketersediaan">
      <h2 className="font-bold text-title text-xl mb-1">Cek Ketersediaan</h2>
      <p className="text-sm text-body mb-5">Periksa ketersediaan untuk tanggal dan waktu yang Anda pilih.</p>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-title mb-1.5">Tanggal</label>
          <input
            placeholder="Pilih Tanggal"
            type="date"
            value={tanggal}
            onChange={(e) => onTanggalChange(e.target.value)}
            ref={dateRef}
            onClick={() => dateRef.current?.showPicker()}
            className="w-full py-2.5 bg-white border border-border rounded-xl text-sm text-title focus:outline-none focus:border-primary transition-colors shadow-sm custom-date-input"
          />
        </div>
        <div className="flex-1 relative">
          <label className="block text-xs font-semibold text-title mb-1.5">Pilih Olahraga</label>
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="w-full flex items-center gap-2 px-3 py-2.5 bg-white border border-border rounded-xl text-sm text-title focus:outline-none focus:border-primary transition-colors shadow-sm text-left"
          >
            {OLAHRAGA_ICON_MAP[olahraga[selectedIdx]?.slug] && (
              <Image
                src={`/icons/${OLAHRAGA_ICON_MAP[olahraga[selectedIdx].slug]}`}
                alt={olahraga[selectedIdx].nama}
                width={16}
                height={16}
              />
            )}
            <span className="flex-1 truncate">
              {olahraga[selectedIdx]?.nama} – Rp {olahraga[selectedIdx]?.harga_per_jam.toLocaleString("id-ID")}/jam
            </span>
            <Image src="/icons/dropdown.svg" alt="Dropdown" width={16} height={16} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}/>
          </button>
          {dropdownOpen && (
            <ul className="absolute z-20 mt-1 w-full bg-white border border-border rounded-xl shadow-lg overflow-hidden">
              {olahraga.map((o, idx) => (
                <li key={o.slug}>
                  <button
                    type="button"
                    onClick={() => handleOlahragaSelect(idx)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-left hover:bg-surface transition-colors ${
                      idx === selectedIdx ? "bg-surface font-semibold text-primary" : "text-title"
                    }`}
                  >
                    {OLAHRAGA_ICON_MAP[o.slug] && (
                      <Image
                        src={`/icons/${OLAHRAGA_ICON_MAP[o.slug]}`}
                        alt={o.nama}
                        width={16}
                        height={16}
                      />
                    )}
                    <span>{o.nama} – Rp {o.harga_per_jam.toLocaleString("id-ID")}/jam</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="table-wrapper rounded-2xl border border-border shadow-sm overflow-hidden">
        <table className="w-full min-w-160 border-collapse text-sm">
          <thead>
            <tr className="tbl-head text-white">
              <th className="py-3 px-4 text-left font-semibold text-xs w-24">Waktu</th>
              {activeOlahraga.courts.map((court) => (
                <th key={court.id} className="py-3 px-3 text-center font-semibold text-xs">
                  {court.nama}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slots.map((row, ri) => (
              <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-surface/60"}>
                <td className="py-3 px-4 text-xs font-semibold text-body whitespace-pre-line w-24 border-b border-border/60">
                  {row.time}
                </td>
                {row.avail.map((_, ci) => {
                  const booked = isUnavailable(ri, ci);
                  const selectedTemp = isSelectedTemp(ri, ci);
                  const cellClass = selectedTemp ? "selected" : booked ? "unavailable" : "";

                  return (
                    <td key={ci} className="py-2.5 px-2 border-b border-border/60">
                      <div
                        className={`slot-cell ${cellClass} rounded-xl px-2 py-2 text-center mx-auto max-w-30 ${
                          booked
                            ? "border border-dashed border-border bg-surface"
                            : "border border-border/60 bg-white"
                        } ${selectedTemp ? "border-transparent" : ""}`}
                        onClick={() => !booked && toggleSlot(ri, ci)}
                      >
                        <p className={`slot-price font-bold text-xs ${booked ? "text-muted" : "text-title"}`}>
                          Rp {activeOlahraga.harga_per_jam.toLocaleString("id-ID")}
                        </p>
                        <p className={`slot-status text-[10px] font-medium mt-0.5 ${booked ? "text-muted" : "text-primary"}`}>
                          {selectedTemp ? "Dipilih" : booked ? "Dibooking" : "Tersedia"}
                        </p>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <button
          onClick={handleCheckout}
          disabled={isCheckingOut}
          className={`inline-flex items-center gap-2 font-semibold text-sm px-7 py-3 rounded-btn shadow-lg transition-all ${
            isCheckingOut
              ? "bg-primary/70 text-white cursor-not-allowed shadow-primary/20"
              : "cursor-pointer bg-primary text-white hover:bg-primary-dark shadow-primary/30"
          }`}
        >
          {isCheckingOut ? (
            <>
              <svg
                className="checkout-spinner"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                width={16}
                height={16}
              >
                <circle
                  className="opacity-25"
                  cx="12" cy="12" r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Memproses...
            </>
          ) : (
            <>
              Cek Pembayaran
              <Image src="/icons/right-arrow.svg" alt="arrow" width={16} height={16} className="brightness-0 invert" />
            </>
          )}
        </button>
      </div>

      <AlertModal
        open={slotLimitAlert}
        message="Maksimal 2 slot per lapangan yang bisa kamu pilih."
        onClose={() => setSlotLimitAlert(false)}
        type="warning"
      />
      <AlertModal
        open={emptySlotAlert}
        message="Silakan pilih minimal satu slot waktu sebelum melanjutkan ke pembayaran."
        onClose={() => setEmptySlotAlert(false)}
        type="info"
      />
      <AlertModal
        open={simulationAlert}
        message="Slot berhasil dibooking dalam mode simulasi. Belum terhubung ke server."
        onClose={() => setSimulationAlert(false)}
        type="success"
      />
    </div>
  );
}