import { createServerSupabase } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import vanueData from '@/data/vanue.json';

interface Booking {
  booking_group: string;
  venue_id: string;
  olahraga_slug: string;
  tanggal: string;
  ri: number;
  ci: number;
  status: string;
}

export default async function BookingDetailPage({params,}: {params: Promise<{ bookingId: string }>}) {
  const { bookingId } = await params;

  const supabase = createServerSupabase();
  const { data: bookings } = await supabase
    .from('bookings')
    .select('*')
    .eq('booking_group', bookingId)
    .eq('status', 'confirmed')
    .returns<Booking[]>();

  if (!bookings?.length) notFound();

  const venue = vanueData.find((v) => v.id === bookings[0].venue_id);
  const olahraga = venue?.olahraga.find((sport) => sport.slug === bookings[0].olahraga_slug);
  const kodeBooking = bookings[0].booking_group.slice(0, 11);

  return (
    <main className="max-w-2xl mx-auto px-4 py-10 text-center">
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
        <p className="text-green-700 font-bold text-lg mb-1">
          Pemesanan Berhasil
        </p>
        <p className="text-sm text-green-600">
          Kode Booking: {kodeBooking}
        </p>
      </div>

      <div className="bg-white rounded-xl border p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">Tiket Digital</h2>
        <div className="space-y-2 text-sm text-left">
          <p><strong>{venue?.nama ?? '-'}</strong></p>
          <p>{olahraga?.nama ?? bookings[0].olahraga_slug}</p>
          <p>{bookings[0].tanggal}</p>
          <p>
            Slot:{' '}
            {bookings
              .map((b) => `Lap ${b.ci + 1} Jam ke-${b.ri + 1}`)
              .join(', ')}
          </p>
        </div>
        <div className="mt-6 flex justify-center">
          <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-muted">
            QR Code
          </div>
        </div>
        <p className="text-xs text-muted mt-2">
          Tampilkan kode ini ke petugas yang ada di lokasi
        </p>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 py-3 rounded-btn border border-border text-sm font-semibold hover:bg-gray-50">
          Simpan Tiket
        </button>
        <Link
          href="/"
          className="flex-1 py-3 rounded-btn bg-primary text-white text-sm font-semibold hover:bg-primary-dark"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}