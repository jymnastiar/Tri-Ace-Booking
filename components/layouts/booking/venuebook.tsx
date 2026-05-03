"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AvailabilityTable from "@/components/ui/availabilityTable";
import { createBookingReturnId, getBookedSlots } from "@/app/actions/booking";
import type { Olahraga, JamOperasional } from "@/types/availability";

export default function VenueBookingSection({
  venueId,
  olahraga,
  jamOperasional,
  initialBookedSlots,
}: {
  venueId: string;
  olahraga: Olahraga[];
  jamOperasional: JamOperasional;
  initialBookedSlots: [number, number][];
}) {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];
  const [tanggal, setTanggal] = useState(today);
  const [activeOlahraga, setActiveOlahraga] = useState(olahraga[0]?.slug ?? "");
  const [bookedSlots, setBookedSlots] = useState<[number, number][]>(initialBookedSlots);

  useEffect(() => {
    async function refresh() {
      const slots = await getBookedSlots(venueId, activeOlahraga, tanggal);
      setBookedSlots(slots);
    }
    refresh();
  }, [tanggal, activeOlahraga, venueId]);

  const handleCheckout = async (selectedSlots: [number, number][], olahragaSlug: string) => {
    const bookingGroupId = await createBookingReturnId({
      venueId,
      olahragaSlug,
      tanggal,
      selectedSlots,
    });
    router.push(`/checkout/${bookingGroupId}`);
  };

  return (
    <AvailabilityTable
      olahraga={olahraga}
      jamOperasional={jamOperasional}
      initialBookedSlots={bookedSlots}
      venueId={venueId}
      tanggal={tanggal}
      onTanggalChange={setTanggal}
      onOlahragaChange={setActiveOlahraga}
      onCheckout={handleCheckout}
    />
  );
}