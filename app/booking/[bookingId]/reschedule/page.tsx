'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { createClientSupabase } from '@/lib/supabase/client';

export default function ReschedulePage({params,}: {params: Promise<{ bookingId: string }>;}) {
  const { bookingId } = use(params);    
  const router = useRouter();
  const supabase = createClientSupabase();

  const [tanggal, setTanggal] = useState('');
  const [waktu, setWaktu] = useState('');

  const handleReschedule = async () => {
    if (!tanggal || !waktu) {
      alert('Silakan pilih tanggal dan waktu baru.');
      return;
    }
    const { error } = await supabase
      .from('bookings')
      .update({ tanggal })
      .eq('booking_group', bookingId);

    if (error) {
      alert('Gagal reschedule');
      return;
    }
    router.push(`/booking/${bookingId}/detail`);
  };

  return (
    <main className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Reschedule Booking</h1>
      <div className="bg-white rounded-xl border p-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Pilih Tanggal</label>
          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:border-primary shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Pilih Waktu</label>
          <select
            value={waktu}
            onChange={(e) => setWaktu(e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:border-primary shadow-sm"
          >
            <option value="">-- Pilih Waktu --</option>
            <option value="08:00">08:00</option>
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="12:00">12:00</option>
          </select>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            onClick={handleReschedule}
            className="flex-1 py-3 rounded-btn bg-primary text-white text-sm font-semibold hover:bg-primary-dark"
          >
            Konfirmasi
          </button>
          <button
            onClick={() => router.push(`/booking/${bookingId}/detail`)}
            className="flex-1 py-3 rounded-btn border border-border text-sm font-semibold hover:bg-gray-50"
          >
            Kembali
          </button>
        </div>
      </div>
    </main>
  );
}