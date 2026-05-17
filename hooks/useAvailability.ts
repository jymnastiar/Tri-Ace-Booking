import { useState, useMemo } from "react";
import type { Olahraga, JamOperasional } from "@/types/availability";
import { generateSlots } from "@/lib/availability";

export function useAvailability({
  olahraga,
  jamOperasional,
  initialBookedSlots = [],
  onCheckout,
}: {
  olahraga: Olahraga[];
  jamOperasional: JamOperasional;
  initialBookedSlots?: [number, number][];
  onCheckout?: (selected: [number, number][], olahragaSlug: string) => Promise<void> | void;
}) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeOlahraga = olahraga[selectedIdx] ?? olahraga[0];

  const [bookedSlots, setBookedSlots] =
    useState<[number, number][]>(initialBookedSlots);
  const [prevInitialBookedSlots, setPrevInitialBookedSlots] = useState(initialBookedSlots);

  if (initialBookedSlots !== prevInitialBookedSlots) {
    setPrevInitialBookedSlots(initialBookedSlots);
    setBookedSlots(initialBookedSlots);
  }

  const slots = useMemo(
    () =>
      generateSlots(
        jamOperasional.buka,
        jamOperasional.tutup,
        jamOperasional.slot_durasi_menit,
        activeOlahraga.courts.length,
      ),
    [activeOlahraga, jamOperasional],
  );

  const [selected, setSelected] = useState<[number, number][]>([]);
  const [prevSelectedIdxState, setPrevSelectedIdxState] = useState(selectedIdx);

  if (selectedIdx !== prevSelectedIdxState) {
    setPrevSelectedIdxState(selectedIdx);
    setSelected([]);
  }

  /** State untuk popup "Maksimal 2 slot per lapangan" */
  const [slotLimitAlert, setSlotLimitAlert] = useState(false);

  /** State untuk popup "Silakan pilih slot waktu terlebih dahulu" */
  const [emptySlotAlert, setEmptySlotAlert] = useState(false);

  /** State untuk popup simulasi booking berhasil */
  const [simulationAlert, setSimulationAlert] = useState(false);

  /** State loading saat proses checkout berlangsung */
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const isUnavailable = (ri: number, ci: number) => {
    if (!slots[ri]?.avail[ci]) return true;
    return bookedSlots.some(([row, col]) => row === ri && col === ci);
  };

  const isSelectedTemp = (ri: number, ci: number) =>
    selected.some(([row, col]) => row === ri && col === ci);

  const toggleSlot = (ri: number, ci: number) => {
    if (isUnavailable(ri, ci)) return;
    setSelected((prev) => {
      const idx = prev.findIndex(([r, c]) => r === ri && c === ci);
      if (idx !== -1) {
        return prev.filter((_, i) => i !== idx);
      } else {
        const countInColumn = prev.filter(([, c]) => c === ci).length;
        if (countInColumn >= 2) {
          setSlotLimitAlert(true);
          return prev;
        }
        return [...prev, [ri, ci]];
      }
    });
  };

  const handleCheckout = async () => {
    if (selected.length === 0) {
      setEmptySlotAlert(true);
      return;
    }

    if (onCheckout) {
      setIsCheckingOut(true);
      try {
        await onCheckout(selected, activeOlahraga.slug);
      } finally {
        setIsCheckingOut(false);
      }
    } else {
      setBookedSlots((prev) => [...prev, ...selected]);
      setSelected([]);
      setSimulationAlert(true);
    }
  };

  return {
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
  };
}
