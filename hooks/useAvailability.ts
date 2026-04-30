import { useState, useMemo, useEffect } from "react";
import type { Olahraga, JamOperasional } from "@/types/availability";
import { generateSlots } from "@/lib/availability";

export function useAvailability({
  olahraga,
  jamOperasional,
  initialBookedSlots = [],
}: {
  olahraga: Olahraga[];
  jamOperasional: JamOperasional;
  initialBookedSlots?: [number, number][];
}) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeOlahraga = olahraga[selectedIdx] ?? olahraga[0];

  const [bookedSlots, setBookedSlots] = useState<[number, number][]>(initialBookedSlots);

  const slots = useMemo(
    () => generateSlots(jamOperasional.buka, jamOperasional.tutup, jamOperasional.slot_durasi_menit, activeOlahraga.courts.length),
    [activeOlahraga, jamOperasional]
  );

  const [selected, setSelected] = useState<[number, number][]>([]);

  const isUnavailable = (ri: number, ci: number) => {
    if (!slots[ri]?.avail[ci]) return true;
    return bookedSlots.some(([r, c]) => r === ri && c === ci);
  };

  const isSelectedTemp = (ri: number, ci: number) =>
    selected.some(([r, c]) => r === ri && c === ci);

  const toggleSlot = (ri: number, ci: number) => {
    if (isUnavailable(ri, ci)) return;
    setSelected((prev) => {
      const idx = prev.findIndex(([r, c]) => r === ri && c === ci);
      if (idx !== -1) {
        return prev.filter((_, i) => i !== idx);
      } else {
        const countInColumn = prev.filter(([r, c]) => c === ci).length;
        if (countInColumn >= 2) {
          alert("Maksimal 2 slot per lapangan.");
          return prev;
        }
        return [...prev, [ri, ci]];
      }
    });
  };

  const handleCheckout = () => {
    if (selected.length === 0) {
      alert("Silakan pilih slot waktu terlebih dahulu.");
      return;
    }
    setBookedSlots((prev) => [...prev, ...selected]);
    setSelected([]);
    alert("Pembayaran berhasil! Slot telah dibooking.");
  };

  useEffect(() => {
    setSelected([]);
  }, [selectedIdx]);

  return {
    selectedIdx,
    setSelectedIdx,
    activeOlahraga,
    slots,
    isUnavailable,
    isSelectedTemp,
    toggleSlot,
    handleCheckout
  };
}
