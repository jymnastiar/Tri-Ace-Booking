import { createAuthSupabase, createServerSupabase } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import BookingListClient from '@/components/layouts/booking/BookingListClient';
import EmptyBooking from '@/components/layouts/booking/EmptyBooking';
import { LeftArrowIcon } from '@/src/icons';

interface Booking {
  booking_group: string;
  venue_id: string;
  olahraga_slug: string;
  tanggal: string;
  ri: number;
  ci: number;
  status: string;
}

export default async function BookingPage() {
  // Auth client untuk ambil identitas user
  const authClient = await createAuthSupabase();
  const { data: { user } } = await authClient.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  // Service-role client untuk query database (bypass RLS)
  const supabase = createServerSupabase();
  const { data: bookings, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .returns<Booking[]>();

  if (error || !bookings?.length) {
    return <EmptyBooking />;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

      <div className="mb-4">
        <Link href="/" className="inline-flex stagger-1 animate-fade-up items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors duration-200 group">
          <LeftArrowIcon className='transition-transform duration-200 group-hover:-translate-x-1'/>
          Kembali ke Beranda
        </Link>
      </div>

      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-title tracking-tight animate-fade-up stagger-2">
          Booking Saya
        </h1>
      </div>

      <BookingListClient initialBookings={bookings} />

    </main>
  );
}
