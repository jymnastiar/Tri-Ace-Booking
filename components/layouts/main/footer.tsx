import Logo from "@/public/icons/logo";
import { Instagram,Facebook } from "@/src/brands";
import Link from "next/link";

export default function MainFooter() {
  return (
    <footer className="bg-[url(/images/bg-footer.webp)] bg-cover bg-center bg-no-repeat brightness-90 mt-16 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Logo/>
                <span className="font-extrabold text-xl tracking-tight">TRI-ACE BOOKING</span>
              </div>
              <p className=" text-sm max-w-xs">Platform booking lapangan olahraga terpercaya, mudah, dan cepat.</p>
            </div>
          </div>

          {/* Social links */}
          <div className="flex flex-col gap-3">
            <Link href="#" className="flex items-center gap-3 hover:text-white transition-colors group">
              <Instagram className=""/>
              <span className="text-sm font-medium">Follow us on Instagram</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 hover:text-white transition-colors group">
              <Facebook className=""/>
              <span className="text-sm font-medium">Follow us on Facebook</span>
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-300">
          <span>© 2026 tri-ace_booking. All Rights Reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Syarat &amp; Ketentuan</Link>
            <Link href="/faq" className="hover:text-white transition-colors">Bantuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}