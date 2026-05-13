"use client";

import { useState } from "react";
import { toPng } from "html-to-image";
import Link from "next/link";
import { Loader } from "@/src/icons";

export default function TicketActions({ bookingId }: { bookingId: string }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    const ticketElement = document.getElementById("digital-ticket");
    if (!ticketElement) return;

    setLoading(true);
    try {
      // Menunggu sedikit agar resource render sempurna
      const dataUrl = await toPng(ticketElement, {
        cacheBust: true,
        backgroundColor: "#F8FAFC", // Menyesuaikan bg luar agar tidak transparan di sudut rounded
        style: {
          borderRadius: "0px", // Kadang rounded di ujung file gambar terlihat aneh jika bg tidak pas
        }
      });

      const link = document.createElement("a");
      link.download = `tiket-tri-ace-${bookingId.slice(0, 8)}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Gagal mengunduh tiket:", err);
      alert("Maaf, gagal mengunduh tiket. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={handleDownload}
        disabled={loading}
        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-[#E2E8F0] text-body text-sm font-semibold hover:bg-white hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader className="animate-spin" width="15" height="15" />
            Menyiapkan...
          </>
        ) : (
          <>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            Simpan Tiket
          </>
        )}
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
  );
}
