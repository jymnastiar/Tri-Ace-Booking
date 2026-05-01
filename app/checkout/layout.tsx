import Logo from "@/public/icons/logo";
import Link from "next/link";

export default function CheckoutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Checkout Header (Simplified) */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo width={30} height={30} />
            <span className="font-bold text-title text-base tracking-tight">
              TRI-ACE<span className="text-primary"> BOOKING</span>
            </span>
          </Link>
          
          <div className="text-sm font-semibold text-green-600 flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Checkout Aman
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-border py-6 mt-10 bg-white">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <span>© 2026 tri-ace_booking. All Rights Reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-primary transition-colors">Kebijakan Privasi</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Syarat &amp; Ketentuan</Link>
            <Link href="/faq" className="hover:text-primary transition-colors">Bantuan</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
