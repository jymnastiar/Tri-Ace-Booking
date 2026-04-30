"use client";

import type { Olahraga, JamOperasional } from "@/types/availability";
import { useAvailability } from "@/hooks/useAvailability";

export default function AvailabilityTable({
  olahraga,
  jamOperasional,
  initialBookedSlots = [],
}: {
  olahraga: Olahraga[];
  jamOperasional: JamOperasional;
  initialBookedSlots?: [number, number][];
}) {
  const {
    selectedIdx,
    setSelectedIdx,
    activeOlahraga,
    slots,
    isUnavailable,
    isSelectedTemp,
    toggleSlot,
    handleCheckout
  } = useAvailability({ olahraga, jamOperasional, initialBookedSlots });

  return (
    <div className="animate-fade-up stagger-5" id="ketersediaan">
      <h2 className="font-bold text-title text-xl mb-1">Cek Ketersediaan</h2>
      <p className="text-sm text-body mb-5">Periksa ketersediaan untuk tanggal dan waktu yang Anda pilih.</p>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-title mb-1.5">Tanggal</label>
          <input
            type="date"
            defaultValue="2026-04-29"
            className="w-full px-3 py-2.5 bg-white border border-border rounded-xl text-sm text-title focus:outline-none focus:border-primary transition-colors shadow-sm custom-date-input"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-semibold text-title mb-1.5">Pilih Olahraga</label>
          <select
            className="w-full px-3 py-2.5 bg-white border border-border rounded-xl text-sm text-title focus:outline-none focus:border-primary transition-colors shadow-sm custom-select"
            value={selectedIdx}
            onChange={(e) => setSelectedIdx(Number(e.target.value))}
          >
            {olahraga.map((o, idx) => (
              <option key={o.slug} value={idx}>
                {o.ikon} {o.nama} – Rp {o.harga_per_jam.toLocaleString("id-ID")}/jam
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-wrapper rounded-2xl border border-border shadow-sm overflow-hidden">
        <table className="w-full min-w-[640px] border-collapse text-sm">
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
                        className={`slot-cell ${cellClass} rounded-xl px-2 py-2 text-center mx-auto max-w-[120px] ${
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

      <div className="flex flex-wrap gap-4 mt-3">
        <div className="flex items-center gap-1.5 text-xs text-body">
          <div className="w-3 h-3 rounded bg-white border border-border" /> Tersedia
        </div>
        <div className="flex items-center gap-1.5 text-xs text-body">
          <div className="w-3 h-3 rounded bg-[#0EA5E9]" /> Dipilih
        </div>
        <div className="flex items-center gap-1.5 text-xs text-body">
          <div className="w-3 h-3 rounded bg-surface border border-border" /> Dibooking/Tidak Tersedia
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleCheckout}
          className="inline-flex items-center gap-2 bg-primary text-white font-semibold text-sm px-7 py-3 rounded-btn shadow-lg shadow-primary/30 hover:bg-primary-dark transition-colors"
        >
          Cek Pembayaran
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}