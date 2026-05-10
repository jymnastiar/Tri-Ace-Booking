"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/public/icons/logo";
import { createClientSupabase } from "@/lib/supabase/client";

export default function SignUpPage() {
  const router = useRouter();
  const supabase = createClientSupabase();

  // ── State form ──
  const [namaDepan, setNamaDepan] = useState("");
  const [namaBelakang, setNamaBelakang] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ── State UI ──
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sukses, setSukses] = useState(false);
  const [pressed, setPressed] = useState(false);

  // ── Fungsi Register ──
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // cegah reload halaman
    setError(null);

    // Validasi sederhana
    if (!namaDepan || !email || !password || !konfirmasi) {
      setError("Semua kolom wajib diisi.");
      return;
    }
    if (password.length < 8) {
      setError("Kata sandi minimal 8 karakter.");
      return;
    }
    if (password !== konfirmasi) {
      setError("Kata sandi dan konfirmasi tidak cocok.");
      return;
    }

    setLoading(true);

    // Kirim ke Supabase
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          // Simpan nama lengkap di profil user
          full_name: `${namaDepan} ${namaBelakang}`.trim(),
          first_name: namaDepan,
          last_name: namaBelakang,
        },
      },
    });

    if (error) {
      if (error.message.includes("already registered")) {
        setError("Email ini sudah terdaftar. Silakan masuk atau gunakan email lain.");
      } else if (error.message.includes("Password should be")) {
        setError("Kata sandi terlalu lemah. Gunakan kombinasi huruf dan angka.");
      } else {
        setError(error.message);
      }
      setLoading(false);
      return;
    }

    // Berhasil → tampilkan pesan sukses
    setSukses(true);
    setLoading(false);
  };

  // ── Tampilan setelah berhasil daftar ──
  if (sukses) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <div className="w-full max-w-md text-center animate-fade-up">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 text-4xl">
            ✅
          </div>
          <h1 className="text-2xl font-extrabold text-[#0F172A] mb-3">Akun berhasil dibuat!</h1>
          <p className="text-[#64748B] text-sm leading-relaxed mb-2">
            Kami mengirim email konfirmasi ke:
          </p>
          <p className="font-bold text-[#0EA5E9] mb-6">{email}</p>
          <p className="text-[#64748B] text-sm mb-8">
            Buka email tersebut dan klik link konfirmasi sebelum bisa masuk.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#0EA5E9] text-white font-bold text-sm hover:bg-[#0284C7] transition-colors shadow-lg shadow-sky-200"
          >
            Pergi ke halaman Masuk
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* ── LEFT PANEL — White form ── */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 py-10 order-2 lg:order-1">
        <form
          onSubmit={handleRegister}
          className="w-full max-w-md animate-fade-up"
        >
          <div className="mb-7">
            <h1 className="text-3xl font-extrabold text-primary-dark mb-1.5 tracking-tight">Buat akun baru ✨</h1>
            <p className="text-[#64748B] text-sm leading-relaxed">
              Selamat datang di{" "}
              <span className="font-semibold text-[#0EA5E9]">Tri-Ace Booking!</span>{" "}
              Kami senang membantu Anda bergabung.
            </p>
          </div>

          <div className="space-y-4">

            {/* Pesan Error */}
            {error && (
              <div className="flex items-start gap-2.5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            {/* Nama Depan + Belakang */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">Nama Depan</label>
                <input
                  type="text"
                  placeholder="John"
                  value={namaDepan}
                  onChange={(e) => setNamaDepan(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F1F5F9] border-2 border-transparent rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0EA5E9] focus:bg-white transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">Nama Belakang</label>
                <input
                  type="text"
                  placeholder="Doe"
                  value={namaBelakang}
                  onChange={(e) => setNamaBelakang(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F1F5F9] border-2 border-transparent rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0EA5E9] focus:bg-white transition-all duration-200"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">Alamat Email</label>
              <input
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#F1F5F9] border-2 border-transparent rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0EA5E9] focus:bg-white transition-all duration-200"
              />
            </div>

            {/* Kata Sandi + Konfirmasi */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">Kata Sandi</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 karakter"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-10 bg-[#F1F5F9] border-2 border-transparent rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0EA5E9] focus:bg-white transition-all duration-200"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0EA5E9] transition-colors">
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">Konfirmasi</label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Ulangi sandi"
                    value={konfirmasi}
                    onChange={(e) => setKonfirmasi(e.target.value)}
                    className="w-full px-4 py-3 pr-10 bg-[#F1F5F9] border-2 border-transparent rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0EA5E9] focus:bg-white transition-all duration-200"
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0EA5E9] transition-colors">
                    {showConfirm ? (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              onMouseDown={() => setPressed(true)}
              onMouseUp={() => setPressed(false)}
              onMouseLeave={() => setPressed(false)}
              style={{
                transform: pressed && !loading ? "scale(0.97)" : "scale(1)",
                transition: "transform 0.12s ease, background-color 0.2s ease, box-shadow 0.2s ease",
                boxShadow: pressed ? "0 2px 8px rgba(14,165,233,0.25)" : "0 6px 20px rgba(14,165,233,0.35)",
              }}
              className="w-full py-3.5 mt-1 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  Memproses...
                </>
              ) : "Buat Akun"}
            </button>

            {/* Login link */}
            <Link
              href="/login"
              className="w-full flex items-center justify-center py-3.5 rounded-xl border-2 border-[#0EA5E9] text-[#0EA5E9] font-semibold text-sm hover:bg-[#E0F2FE] active:scale-[.98] transition-all duration-150"
            >
              Sudah punya akun?&nbsp;<span className="font-bold">Masuk sekarang!</span>
            </Link>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#E2E8F0]" />
            <span className="text-xs text-[#94A3B8] font-medium shrink-0">atau daftar dengan</span>
            <div className="flex-1 h-px bg-[#E2E8F0]" />
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button type="button" className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-[#E2E8F0] text-[#334155] text-sm font-semibold hover:border-[#0EA5E9] hover:text-[#0EA5E9] hover:bg-[#F0F9FF] active:scale-[.97] transition-all duration-150">
              <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>
            <button type="button" className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-[#E2E8F0] text-[#334155] text-sm font-semibold hover:border-[#0EA5E9] hover:text-[#0EA5E9] hover:bg-[#F0F9FF] active:scale-[.97] transition-all duration-150">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Apple
            </button>
          </div>
        </form>
      </div>

      {/* ── RIGHT PANEL — Illustration background ── */}
      <div className="relative lg:w-1/2 h-52 lg:h-auto shrink-0 overflow-hidden order-1 lg:order-2">
        <Image
          src="/images/background/bg-sign-up.png"
          alt="Sign Up Background"
          fill
          className="object-contain object-bottom lg:object-center"
          priority
        />
        <div className="absolute top-5 right-6 z-10">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="font-extrabold text-body text-base tracking-tight drop-shadow">
              TRI-ACE <span className="text-primary">BOOKING</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
