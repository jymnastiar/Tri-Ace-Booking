import { createServerSupabase } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import vanueData from '@/data/vanue.json';
import Badge from '@/components/ui/badge';

interface Booking {
  booking_group: string;
  venue_id: string;
  olahraga_slug: string;
  tanggal: string;
  ri: number;
  ci: number;
  status: string;
}

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const { bookingId } = await params;

  const supabase = createServerSupabase();
  const { data: bookings } = await supabase
    .from('bookings')
    .select('*')
    .eq('booking_group', bookingId)
    .eq('status', 'confirmed')
    .returns<Booking[]>();

  if (!bookings?.length) notFound();

  const venue    = vanueData.find((v) => v.id === bookings[0].venue_id);
  const olahraga = venue?.olahraga.find((sport) => sport.slug === bookings[0].olahraga_slug);
  const kodeBooking = bookings[0].booking_group.slice(0, 11);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">

        {/* Success banner */}
        <div className="bg-linear-to-r from-emerald-500 to-emerald-600 rounded-2xl p-5 mb-6 shadow-lg shadow-emerald-200 text-white text-center">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <p className="font-extrabold text-lg leading-tight">Pemesanan Berhasil!</p>
          <p className="text-emerald-100 text-sm mt-1">Tiket kamu sudah siap digunakan</p>
          <Badge variant="hero" icon="/icons/calender.svg" className='mt-2'>
            {kodeBooking}
          </Badge>
        </div>

        {/* Ticket card */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden mb-4">

          {/* Ticket header */}
          <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-6 py-4 flex items-center justify-between">
            <div>
              <p className="font-bold text-[#0F172A] text-base">Tiket Digital</p>
              <p className="text-xs text-[#94A3B8] mt-0.5">Tunjukkan ke petugas di lokasi</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#E0F2FE] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round">
                <path d="M20 12v6a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h6"/>
                <path d="M15 3h6v6M10 14L21 3"/>
              </svg>
            </div>
          </div>

          {/* Ticket body */}
          <div className="px-6 py-5 space-y-4">

            {/* Venue */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#E0F2FE] flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round">
                  <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <circle cx="12" cy="11" r="3"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-[#94A3B8] font-medium">Venue</p>
                <p className="font-bold text-[#0F172A] text-sm">{venue?.nama ?? '-'}</p>
              </div>
            </div>

            {/* Olahraga */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#E0F2FE] flex items-center justify-center shrink-0 text-base">
                🏸
              </div>
              <div>
                <p className="text-xs text-[#94A3B8] font-medium">Olahraga</p>
                <p className="font-semibold text-[#0F172A] text-sm">
                  {olahraga?.nama ?? bookings[0].olahraga_slug}
                </p>
              </div>
            </div>

            {/* Tanggal */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#E0F2FE] flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-[#94A3B8] font-medium">Tanggal</p>
                <p className="font-semibold text-[#0F172A] text-sm">{bookings[0].tanggal}</p>
              </div>
            </div>

            {/* Slots */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#E0F2FE] flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                  <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-[#94A3B8] font-medium">Slot Lapangan</p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {bookings.map((b) => (
                    <span
                      key={`${b.ci}-${b.ri}`}
                      className="inline-flex items-center bg-[#E0F2FE] text-[#0284C7] text-xs font-semibold px-2.5 py-1 rounded-full"
                    >
                      Lap {b.ci + 1} · Jam ke-{b.ri + 1}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Dashed divider (ticket tear) */}
          <div className="relative flex items-center px-4 my-1">
            <div className="w-5 h-5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] absolute -left-2.5"></div>
            <div className="flex-1 border-t-2 border-dashed border-[#E2E8F0]"></div>
            <div className="w-5 h-5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] absolute -right-2.5"></div>
          </div>

          {/* QR Code section */}
          <div className="px-6 py-5 flex flex-col items-center">
            <div className="w-36 h-36 rounded-2xl bg-[#F8FAFC] border-2 border-dashed border-[#E2E8F0] flex flex-col items-center justify-center gap-2 mb-3">
              {/* QR placeholder grid */}
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="30" height="30" rx="4" stroke="#CBD5E1" strokeWidth="2" fill="none"/>
                <rect x="8" y="8" width="18" height="18" rx="2" fill="#CBD5E1"/>
                <rect x="48" y="2" width="30" height="30" rx="4" stroke="#CBD5E1" strokeWidth="2" fill="none"/>
                <rect x="54" y="8" width="18" height="18" rx="2" fill="#CBD5E1"/>
                <rect x="2" y="48" width="30" height="30" rx="4" stroke="#CBD5E1" strokeWidth="2" fill="none"/>
                <rect x="8" y="54" width="18" height="18" rx="2" fill="#CBD5E1"/>
                <rect x="48" y="48" width="8" height="8" rx="1" fill="#CBD5E1"/>
                <rect x="60" y="48" width="8" height="8" rx="1" fill="#CBD5E1"/>
                <rect x="48" y="60" width="8" height="8" rx="1" fill="#CBD5E1"/>
                <rect x="60" y="60" width="18" height="8" rx="1" fill="#CBD5E1"/>
                <rect x="60" y="72" width="18" height="6" rx="1" fill="#CBD5E1"/>
              </svg>
              <p className="text-[10px] text-[#94A3B8] font-medium">QR Code</p>
            </div>
            <p className="text-xs text-[#94A3B8] text-center leading-relaxed">
              Tampilkan kode ini ke petugas yang ada di lokasi
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-[#E2E8F0] text-body text-sm font-semibold hover:bg-white hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            Simpan Tiket
          </button>
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0EA5E9] text-white text-sm font-bold hover:bg-[#0284C7] transition-colors shadow-md shadow-sky-200"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            Kembali ke Beranda
          </Link>
        </div>

      </div>
    </div>
  );
}
