"use client";

import Link from "next/link";
import { Loader } from "@/src/icons";
import AuthLayout from "@/components/layouts/auth/AuthLayout";
import AuthFormHeader from "@/components/layouts/auth/AuthFormHeader";
import AuthDivider from "@/components/layouts/auth/AuthDivider";
import AuthSocialButtons from "@/components/layouts/auth/AuthSocialButtons";
import GlobalError from "@/components/ui/auth/GlobalError";
import FormField from "@/components/ui/auth/FormField";
import PasswordInput from "@/components/ui/auth/PasswordInput";
import { useRegister } from "@/hooks/useRegister";

export default function SignUpPage() {
  const {
    namaDepan,
    setNamaDepan,
    namaBelakang,
    setNamaBelakang,
    email,
    setEmail,
    password,
    setPassword,
    konfirmasi,
    setKonfirmasi,
    loading,
    globalError,
    errors,
    pressed,
    setPressed,
    handleRegister,
  } = useRegister();

  return (
    <AuthLayout
      imageSrc="/images/background/bg-sign-up.png"
      imageAlt="Sign Up Background"
      imageSide="right"
      logoSide="right"
    >
      <form onSubmit={handleRegister}>
        <AuthFormHeader
          title="Buat akun baru"
          subtitle={
            <>
              Selamat datang di <span className="font-semibold text-primary">Tri-Ace Booking!</span>{" "}
              Kami senang membantu Anda bergabung.
            </>
          }
          className="mb-7"
        />

        <div className="space-y-4">
          <GlobalError error={globalError} />

          <div className="grid grid-cols-2 gap-3">
            <FormField
              label="Nama Depan"
              placeholder="John"
              value={namaDepan}
              onChange={(e) => setNamaDepan(e.target.value)}
              error={errors.namaDepan}
            />
            <FormField
              label="Nama Belakang"
              placeholder="Doe"
              value={namaBelakang}
              onChange={(e) => setNamaBelakang(e.target.value)}
            />
          </div>

          <FormField
            label="Alamat Email"
            type="email"
            placeholder="nama@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          <div className="grid grid-cols-2 gap-3">
            <PasswordInput
              label="Kata Sandi"
              placeholder="Min. 8 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
            <PasswordInput
              label="Konfirmasi"
              placeholder="Ulangi sandi"
              value={konfirmasi}
              onChange={(e) => setKonfirmasi(e.target.value)}
              error={errors.konfirmasi}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            onMouseLeave={() => setPressed(false)}
            className={`btn-press-effect ${
              pressed && !loading ? "btn-pressed" : ""
            } w-full py-3.5 rounded-xl bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer`}
          >
            {loading ? (
              <>
                <Loader className="animate-spin" width="16" height="16" />
                Memproses...
              </>
            ) : (
              "Buat Akun"
            )}
          </button>

          <Link
            href="/login"
            className="w-full flex items-center justify-center py-3.5 rounded-xl border-2 border-input-focus-border text-input-focus-border font-semibold text-sm hover:bg-[#E0F2FE] active:scale-[.98] transition-all duration-150"
          >
            Sudah punya akun?&nbsp;<span className="font-bold">Masuk sekarang!</span>
          </Link>
        </div>

        {/* Fitur masih dalam pengembangan */}
        {/* <AuthDivider text="atau masuk dengan" />
        <AuthSocialButtons /> */}
      </form>
    </AuthLayout>
  );
}
