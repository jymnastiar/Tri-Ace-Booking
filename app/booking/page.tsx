import { createServerSupabase } from '@/lib/supabase/server';
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

export default async function BookingPage() {
  const supabase = createServerSupabase();
  const { data: bookings, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false })
    .returns<Booking[]>();

  if (error || !bookings?.length) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">Booking Saya</h1>
        <p className="text-muted">Belum ada booking.</p>
        <Link href="/" className="text-primary underline mt-4 inline-block">
          Cari Venue
        </Link>
      </main>
    );
  }

  const grouped = bookings.reduce((acc, curr) => {
    acc[curr.booking_group] = [...(acc[curr.booking_group] || []), curr];
    return acc;
  }, {} as Record<string, Booking[]>);

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Booking Saya</h1>
      <div className="space-y-4">
        {Object.entries(grouped).map(([groupId, items]) => {
          const venue = vanueData.find((v) => v.id === items[0].venue_id);
          const olahraga = venue?.olahraga.find(
            (o) => o.slug === items[0].olahraga_slug
          );
          const status = items[0].status;

          return (
            <div key={groupId} className="bg-white rounded-xl border p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold">{venue?.nama ?? '-'}</p>
                  <p className="text-sm text-body">
                    {olahraga?.nama ?? items[0].olahraga_slug} •{' '}
                    {items[0].tanggal}
                  </p>
                  <p className="text-xs text-muted">
                    {items.length} slot •{' '}
                    {items
                      .map((b) => `Lap ${b.ci + 1} Jam ke-${b.ri + 1}`)
                      .join(', ')}
                  </p>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    status === 'confirmed'
                      ? 'bg-green-50 text-green-700'
                      : status === 'pending'
                      ? 'bg-yellow-50 text-yellow-700'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {status === 'confirmed'
                    ? 'Aktif'
                    : status === 'pending'
                    ? 'Menunggu'
                    : 'Dibatalkan'}
                </span>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/booking/${groupId}/detail`}
                  className="flex-1 py-2 rounded-btn border border-border text-center text-sm font-medium hover:bg-gray-50"
                >
                  Detail
                </Link>
                {status === 'confirmed' && (
                  <Link
                    href={`/booking/${groupId}/reschedule`}
                    className="flex-1 py-2 rounded-btn bg-primary text-white text-center text-sm font-medium hover:bg-primary-dark"
                  >
                    Reschedule
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}