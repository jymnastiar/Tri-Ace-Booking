"use client";

import { useRouter } from "next/navigation";
import AvailabilityTable from "@/components/ui/availabilityTable";
import { createBookingReturnId } from "@/app/actions/booking";
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

  const handleCheckout = async (selectedSlots: [number, number][], olahragaSlug: string) => {
    
    const bookingGroupId = await createBookingReturnId({
      venueId,
      olahragaSlug,
      tanggal: new Date().toISOString().split("T")[0],
      selectedSlots,
    });

    router.push(`/checkout/${bookingGroupId}`);
  };

  return (
    <AvailabilityTable
      olahraga={olahraga}
      jamOperasional={jamOperasional}
      initialBookedSlots={initialBookedSlots}
      venueId={venueId}
      tanggal={new Date().toISOString().split("T")[0]}
      onCheckout={handleCheckout}
    />
  );
}