"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X, Copy, Wallet, Check } from "lucide-react";
import Link from "next/link";
import { createClientSupabase } from "@/lib/supabase/client";

interface ConfirmDesignProps {
  bookingId: string;
  total: number;
}

export default function ConfirmDesign({ bookingId, total }: ConfirmDesignProps) {
  const router = useRouter();
  const supabase = createClientSupabase();
  const searchParams = useSearchParams();
  const methodId = searchParams.get("method") || "BCA";

  const [timeLeft, setTimeLeft] = useState(21533); // 5 jam 58 menit 53 detik
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h} jam ${m} menit ${s} detik`;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const paymentData: Record<string, { name: string; acc: string }> = {
    BCA: { name: "Bank BCA", acc: "123009876543789765" },
    BRI: { name: "Bank BRI", acc: "002109876543112234" },
    BNI: { name: "Bank BNI", acc: "004409876543998871" },
    DANA: { name: "DANA", acc: "081234567890" },
    OVO: { name: "OVO", acc: "081234567890" },
    GOPAY: { name: "GOPAY", acc: "081234567890" },
    QRIS: { name: "QRIS", acc: "QR_CODE" },
  };

  const activeMethod = paymentData[methodId] || paymentData.BCA;

  const handleSelesai = async () => {
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
    <div className="h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100 flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="bg-[#30A9E3] text-white px-8 py-4 flex justify-between items-center shrink-0">
          <div className="w-full text-center text-xl md:text-2xl font-bold">
            Konfirmasi Pembayaran
          </div>
          <Link href={`/checkout/${bookingId}`}>
            <X size={24} />
          </Link>
        </div>

        {/* Sub-header */}
        <div className="bg-[#EBF8FF] px-8 py-3 flex items-center gap-3 text-[#2B6CB0] font-bold border-b border-blue-100 shrink-0">
          <Wallet size={20} /> <span className="text-sm md:text-base">Kirim Uang</span>
        </div>

        {/* Konten */}
        <div className="p-6 md:p-8 space-y-4 overflow-y-auto">
          {/* ⬇️ GUNAKAN props total */}
          <div className="flex justify-between border-b pb-4 text-lg md:text-xl">
            <span>Total Pembayaran</span>
            <span className="text-[#C53030] font-bold">
              Rp {total.toLocaleString("id-ID")}
            </span>
          </div>

          <div className="flex justify-between border-b pb-4 text-lg md:text-xl">
            <span>Bayar Dalam</span>
            <span className="text-[#C53030] font-bold">{formatTime(timeLeft)}</span>
          </div>

          {methodId === "QRIS" ? (
            <div className="py-4 flex flex-col items-center">
              <p className="font-bold text-lg mb-4 text-gray-800">Scan QR Code untuk membayar</p>
              <div className="p-4 border-2 border-gray-50 rounded-2xl shadow-inner bg-white">
                <img
                  src="/images/payment/qr-code.png"
                  alt="QR Code"
                  className="w-40 h-40 md:w-52 md:h-52 object-contain"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 gap-2">
              <span className="text-lg">{activeMethod.name} Virtual Account</span>
              <div className="flex items-center gap-4">
                <span className="text-[#C53030] font-bold text-xl md:text-2xl tracking-widest">
                  {activeMethod.acc}
                </span>
                <button
                  onClick={() => handleCopy(activeMethod.acc)}
                  className={`flex items-center gap-2 text-sm font-bold border-2 px-3 py-1 rounded-lg transition-all ${
                    isCopied
                      ? "bg-green-500 border-green-500 text-white"
                      : "text-[#38A169] border-[#38A169] hover:bg-green-50"
                  }`}
                >
                  {isCopied ? <Check size={16} /> : <Copy size={16} />}
                  {isCopied ? "Tersalin" : "Salin"}
                </button>
              </div>
            </div>
          )}

          <p className="text-[#38A169] text-center font-bold text-base py-2 italic">
            Proses Verifikasi kurang dari 10 menit setelah pembayaran berhasil
          </p>

          <div className="flex justify-between text-gray-400 font-medium pt-4 border-t border-gray-100 text-[10px] md:text-xs italic">
            <span>Pastikan kamu mentransfer ke rekening yang tertera di atas.</span>
            <span>Hanya menerima dari {activeMethod.name}</span>
          </div>

          <div className="pt-4">
            <button
              onClick={handleSelesai}
              className="w-full max-w-xs mx-auto block bg-[#30A9E3] text-white py-3 rounded-xl font-bold text-xl text-center hover:bg-[#2898cc] transition-all shadow-lg active:scale-95"
            >
              Selesai
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}