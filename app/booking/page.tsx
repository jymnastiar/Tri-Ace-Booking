import { createAuthSupabase, createServerSupabase } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import BookingListClient from '@/components/layouts/booking/BookingListClient';

interface Booking {
  booking_group: string;
  venue_id: string;
  olahraga_slug: string;
  tanggal: string;
  ri: number;
  ci: number;
  status: string;
}

function EmptyState() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-title tracking-tight">
          Booking Saya
        </h1>
      </div>
      <div className="bg-white rounded-2xl border border-border shadow-sm flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary-light flex items-center justify-center mb-4 text-3xl">
          🏸
        </div>
        <p className="text-title font-semibold text-lg mb-1">Belum ada booking</p>
        <p className="text-muted text-sm mb-6 max-w-xs">
          Kamu belum pernah melakukan pemesanan lapangan. Yuk, mulai booking sekarang!
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-btn bg-primary text-white text-sm font-semibold shadow-md shadow-primary/25 hover:bg-primary-dark transition-colors duration-200"
        >
          Cari Venue
        </Link>
      </div>
    </main>
  );
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
    return <EmptyState />;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

      <div className="mb-4">
        <Link
          href="/"
          className="inline-flex stagger-1 animate-fade-up items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors duration-200 group"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200 group-hover:-translate-x-1">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
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
