import Logo from "@/public/icons/logo";
import Link from "next/link";
import Button from "@/components/ui/button";
import Badge from "@/components/ui/badge";

export default function ComingSoon() {
  return (
    <div className="min-h-screen py-10 flex flex-col items-center justify-center px-6 relative overflow-hidden bg-white">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 mb-14 group z-10">
        <Logo />
        <span className="font-extrabold text-title text-xl tracking-tight">
          TRI-ACE <span className="text-primary">BOOKING</span>
        </span>
      </Link>


      <div className="text-center mb-10 z-10 px-4">
        <h1 className="font-extrabold text-title text-2xl sm:text-3xl mb-15">
          Halaman Dalam Pengembangan
        </h1>

        {/* Illustration Section */}
        <div className="relative inline-flex items-center justify-center mb-7 select-none">

          <div className="absolute inset-0 rounded-full pointer-events-none bg-[radial-gradient(circle,#E0F2FE_0%,transparent_70%)]"/>
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-sky-200 scale-[1.35] opacity-50" />

          {/* Circle */}
          <div className="relative w-40 h-40 rounded-full flex items-center justify-center border border-sky-200 bg-[linear-gradient(145deg,#F0F9FF_0%,#E0F2FE_100%)]">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Gear / cog */}
              <circle cx="40" cy="40" r="12" stroke="#38BDF8" strokeWidth="3"/>
              <circle cx="40" cy="40" r="5" fill="#BAE6FD"/>
              {/* Gear teeth */}
              {[0,45,90,135,180,225,270,315].map((deg, i) => {
                const rad = (deg * Math.PI) / 180;
                const x1 = 40 + 15 * Math.cos(rad);
                const y1 = 40 + 15 * Math.sin(rad);
                const x2 = 40 + 21 * Math.cos(rad);
                const y2 = 40 + 21 * Math.sin(rad);
                return (
                  <line
                    key={i}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="#0EA5E9" strokeWidth="3.5" strokeLinecap="round"
                  />
                );
              })}

              {/* Sparkle dots */}
              <circle cx="58" cy="20" r="2.5" fill="#38BDF8" opacity=".7"/>
              <circle cx="64" cy="32" r="1.5" fill="#7DD3FC" opacity=".6"/>
              <circle cx="18" cy="26" r="2" fill="#BAE6FD" opacity=".8"/>
            </svg>

            {/* Status badge */}
            <Badge dot={true} variant="category" className="absolute -top-2 -right-2">Dev</Badge>
          </div>

          {/* Floating tool pills */}
          <Badge variant="category" className="absolute -left-8 top-8">🔧</Badge>
          <Badge variant="category" className="absolute -right-7 top-10">⚙️</Badge>
          <Badge variant="category" className="absolute -left-4 bottom-2">🛠️</Badge>
        </div>

        <p className="text-[#64748B] max-w-md text-sm sm:text-base leading-relaxed mt-10">
          Kami sedang menyiapkan fitur keren ini khusus buat kamu. 
          Sabar ya, kami akan segera kembali dengan pengalaman yang lebih baik!
        </p>
      </div>

      <Button variant="primary" size="xl" href="/" className="px-10 z-10 shadow-lg shadow-sky-200">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
        Kembali ke Beranda
      </Button>

      {/* Footer note */}
      <p className="mt-16 text-[10px] font-medium text-[#94A3B8] tracking-[0.2em] z-10">
        © 2026 tri-ace_booking. All Rights Reserved.
      </p>
    </div>
  );
}
