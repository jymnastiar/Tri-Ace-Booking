"use server";
import { redirect } from "next/navigation";
import {
  createServerSupabase,
  createAuthSupabase,
} from "@/lib/supabase/server";

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
  const authClient = await createAuthSupabase();
  const {
    data: { user },
    error: authError,
  } = await authClient.auth.getUser();
  if (authError || !user) {
    redirect("/login");
  }

  const supabase = createServerSupabase();

  const bookingGroupId = crypto.randomUUID();

  const bookings = selectedSlots.map(([ri, ci]) => ({
    booking_group: bookingGroupId,
    venue_id: venueId,
    olahraga_slug: olahragaSlug,
    tanggal,
    ri,
    ci,
    user_id: user.id,
    status: "pending",
  }));

  const { error } = await supabase.from("bookings").insert(bookings);

  if (error) {
    throw new Error(`Gagal membuat booking: ${error.message}`);
  }

  return bookingGroupId;
}

export async function confirmBookingPayment(
  bookingGroupId: string,
): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerSupabase();

  const { error } = await supabase
    .from("bookings")
    .update({ status: "confirmed" })
    .eq("booking_group", bookingGroupId);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function getBookedSlots(
  venueId: string,
  olahragaSlug: string,
  tanggal: string,
): Promise<[number, number][]> {
  const supabase = createServerSupabase();

  const { data, error } = await supabase
    .from("bookings")
    .select("ri, ci")
    .eq("venue_id", venueId)
    .eq("olahraga_slug", olahragaSlug)
    .eq("tanggal", tanggal)
    .eq("status", "confirmed");

  if (error) return [];
  return data?.map((b) => [b.ri, b.ci] as [number, number]) ?? [];
}
