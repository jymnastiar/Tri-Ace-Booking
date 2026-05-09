import Logo from "@/public/icons/logo";
import Link from "next/link";
import NotFoundLogo from "@/components/ui/404-notfound"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 mb-14 group">
        <Logo/>
        <span className="font-extrabold text-[#0F172A] text-xl tracking-tight">
          TRI-ACE <span className="text-[#0EA5E9]">BOOKING</span>
        </span>
      </Link>

      {/* 404 Illustration */}
      <NotFoundLogo/>

      <div className="text-center max-w-md mb-10">
        <h1 className="font-extrabold text-[#0F172A] text-2xl sm:text-3xl mb-3 tracking-tight">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-body text-sm sm:text-base leading-relaxed">
          Aduh, sepertinya lapangan yang kamu cari sudah penuh atau tidak tersedia.
          Yuk kembali ke beranda dan cari lapangan lainnya!
        </p>
      </div>

      <Link href="/" className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#0EA5E9] text-white font-bold text-sm hover:bg-[#0284C7] transition-all shadow-lg shadow-sky-200 active:scale-[.97]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
        Kembali ke Beranda
      </Link>
    </div>
  );
}
