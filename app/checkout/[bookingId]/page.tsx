import { createServerSupabase } from '@/lib/supabase/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import vanueData from '@/data/vanue.json';

export default async function CheckoutPage({ params }: { params: Promise<{ bookingId: string }> }) {
  const { bookingId } = await params;  
  const supabase = createServerSupabase();
  const { data: bookings, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('booking_group', bookingId);

  if (error || !bookings?.length) notFound();

  const venue = vanueData.find((v) => v.id === bookings[0].venue_id);
  const olahraga = venue?.olahraga.find((o) => o.slug === bookings[0].olahraga_slug);
  const hargaPerJam = olahraga?.harga_per_jam ?? 0;
  const biayaLayanan = 5000;
  const totalSewa = hargaPerJam * bookings.length;
  const total = totalSewa + biayaLayanan;

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {/* Ringkasan */}
      <div className="bg-white rounded-xl border p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">Ringkasan Pesanan</h2>
        <div className="space-y-2 text-sm">
          <p><strong>Venue:</strong> {venue?.nama ?? '-'}</p>
          <p><strong>Olahraga:</strong> {olahraga?.nama ?? bookings[0].olahraga_slug}</p>
          <p><strong>Tanggal:</strong> {bookings[0].tanggal}</p>
          <p><strong>Slot:</strong></p>
          <ul className="list-disc list-inside ml-2">
            {bookings.map((b, i) => (
              <li key={i}>
                Lapangan {b.ci + 1}, Jam ke-{b.ri + 1} — Rp {hargaPerJam.toLocaleString('id-ID')}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Harga */}
      <div className="bg-white rounded-xl border p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">Detail Harga</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Sewa Lapangan ({bookings.length} slot)</span>
            <span>Rp {totalSewa.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between">
            <span>Biaya Layanan</span>
            <span>Rp {biayaLayanan.toLocaleString('id-ID')}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-bold text-base">
            <span>Total</span>
            <span>Rp {total.toLocaleString('id-ID')}</span>
          </div>
        </div>
      </div>

      {/* Metode Pembayaran */}
      <div className="bg-white rounded-xl border p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">Pilih Metode Pembayaran</h2>
        <div className="grid grid-cols-2 gap-3">
          {['Bank BCA', 'Bank BRI', 'DANA', 'OVO'].map((m) => (
            <button
              key={m}
              className="border border-border rounded-lg py-2 px-4 text-sm hover:bg-gray-50"
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          href={`/vanue/${bookings[0].venue_id}`}
          className="flex-1 py-3 rounded-btn border border-border text-center text-sm font-semibold hover:bg-gray-50"
        >
          Batalkan
        </Link>
        <Link
          href={`/checkout/${bookingId}/confirm`}
          className="flex-1 py-3 rounded-btn bg-primary text-white text-center text-sm font-semibold hover:bg-primary-dark"
        >
          Bayar Sekarang
        </Link>
      </div>
    </main>
  );
}