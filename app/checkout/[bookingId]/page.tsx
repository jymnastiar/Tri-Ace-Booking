import { createServerSupabase } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import vanueData from '@/data/vanue.json';
import CheckoutUI from '@/components/layouts/checkout/checkoutUI';

export default async function CheckoutPage({ params }: { params: Promise<{ bookingId: string }> }) {
  const { bookingId } = await params;

  const supabase = createServerSupabase();
  const { data: bookings, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('booking_group', bookingId);

  if (error || !bookings?.length) notFound();

  const venue = vanueData.find((v) => v.id === bookings[0].venue_id) ?? null;
  const olahraga = venue?.olahraga.find(
    (o) => o.slug === bookings[0].olahraga_slug
  ) ?? null;
  const hargaPerJam = olahraga?.harga_per_jam ?? 0;
  const biayaLayanan = 5000;
  const totalSewa = hargaPerJam * bookings.length;
  const total = totalSewa + biayaLayanan;

  return (
    <CheckoutUI
      bookingId={bookingId}
      bookings={bookings}
      venue={venue ? { nama: venue.nama, id: venue.id } : null}
      olahraga={olahraga ? { nama: olahraga.nama, slug: olahraga.slug, ikon: olahraga.ikon } : null}
      totalSewa={totalSewa}
      biayaLayanan={biayaLayanan}
      total={total}
    />
  );
}