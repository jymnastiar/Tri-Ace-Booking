// app/checkout/[bookingId]/confirm/page.tsx
import { createServerSupabase } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import vanueData from '@/data/vanue.json';
import ConfirmDesign from '@/components/layouts/booking/confirmDesign';
import { Suspense } from 'react';

export default async function ConfirmPage({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const { bookingId } = await params;
  const supabase = createServerSupabase();

  const { data: bookings, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('booking_group', bookingId);

  if (error || !bookings?.length) notFound();

  const venue = vanueData.find((v) => v.id === bookings[0].venue_id);
  const olahraga = venue?.olahraga.find(
    (o) => o.slug === bookings[0].olahraga_slug
  );
  const hargaPerJam = olahraga?.harga_per_jam ?? 0;
  const biayaLayanan = 5000;
  const totalSewa = hargaPerJam * bookings.length;
  const total = totalSewa + biayaLayanan;

  return (
    <Suspense>
      <ConfirmDesign
        bookingId={bookingId}
        total={total}
      />
    </Suspense>
  );
}