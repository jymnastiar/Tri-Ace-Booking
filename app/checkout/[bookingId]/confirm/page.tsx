"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { createClientSupabase } from "@/lib/supabase/client";

export default function ConfirmPage({ params }: { params: Promise<{ bookingId: string }> }) {
  const { bookingId } = use(params);
  const router = useRouter();
  const supabase = createClientSupabase();

  // Timer demo 60 detik
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h} jam ${m} menit ${s} detik`;
  };

  const handleConfirm = async () => {
    const { error } = await supabase
      .from("bookings")
      .update({ status: "confirmed" })
      .eq("booking_group", bookingId);

    if (error) {
      alert("Gagal mengkonfirmasi pembayaran.");
      return;
    }

    router.push(`/booking/${bookingId}/detail`);
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="bg-white rounded-xl border p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">Konfirmasi Pembayaran</h1>
        <p className="text-muted text-sm mb-6">Kirim Uang</p>

        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <p className="text-sm text-muted">Total Pembayaran</p>
          <p className="text-3xl font-extrabold text-title">Rp55.000</p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <p className="text-sm text-muted">Bayar Dalam</p>
          <p className="text-lg font-bold text-primary">{formatTime(timeLeft)}</p>
        </div>

        <div className="bg-white border rounded-lg p-4 mb-6">
          <p className="text-xs text-muted mb-1">Bank BCA No.Rek/Virtual Account</p>
          <p className="text-lg font-mono font-bold tracking-wider">12 30 0987 6543 78976 5</p>
          <button
            onClick={() => navigator.clipboard.writeText("123009876543789765")}
            className="text-primary text-xs mt-2 underline"
          >
            Salin
          </button>
        </div>

        <p className="text-xs text-muted mb-6">
          Proses verifikasi kurang dari 10 menit setelah pembayaran berhasil.
        </p>

        <button
          onClick={handleConfirm}
          className="w-full py-3 rounded-btn bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-colors"
        >
          OK
        </button>
      </div>
    </main>
  );
}