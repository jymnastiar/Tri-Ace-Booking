"use server";

import { createServerSupabase } from "@/lib/supabase/server";

interface CreateBookingParams {
  venueId: string;
  olahragaSlug: string;
  tanggal: string;
  selectedSlots: [number, number][];
}

export async function createBookingReturnId({
  venueId,
  olahragaSlug,
  tanggal,
  selectedSlots,
}: CreateBookingParams): Promise<string> {
  const supabase = createServerSupabase();

  const bookingGroupId = crypto.randomUUID();

  const bookings = selectedSlots.map(([ri, ci]) => ({
    booking_group: bookingGroupId,
    venue_id: venueId,
    olahraga_slug: olahragaSlug,
    tanggal,
    ri,
    ci,
    user_id: "guest",
    status: "pending",
  }));

  const { error } = await supabase.from("bookings").insert(bookings);

  if (error) {
    throw new Error(`Gagal membuat booking: ${error.message}`);
  }

  return bookingGroupId;
}
