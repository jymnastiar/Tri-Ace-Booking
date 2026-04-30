import type { Slot } from "@/types/availability";

export function generateSlots(buka: string, tutup: string, durationMin: number, courtCount: number): Slot[] {
  const slots: Slot[] = [];
  const start = parseInt(buka.split(":")[0], 10);
  const end = parseInt(tutup.split(":")[0], 10);
  for (let h = start; h < end; h += durationMin / 60) {
    const nextH = h + durationMin / 60;
    const timeStr = `${String(h).padStart(2, "0")}:00\n${String(nextH).padStart(2, "0")}:00`;
    const avail = Array.from({ length: courtCount }, () => true);
    slots.push({ time: timeStr, avail });
  }
  return slots;
}
