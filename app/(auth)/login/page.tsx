"use client";

import Link from "next/link";
import { Check, Loader } from "@/src/icons";
import Button from "@/components/ui/button";
import AuthLayout from "@/components/layouts/auth/AuthLayout";
import AuthFormHeader from "@/components/layouts/auth/AuthFormHeader";
import AuthDivider from "@/components/layouts/auth/AuthDivider";
import AuthSocialButtons from "@/components/layouts/auth/AuthSocialButtons";
import GlobalError from "@/components/ui/auth/GlobalError";
import FormField from "@/components/ui/auth/FormField";
import PasswordInput from "@/components/ui/auth/PasswordInput";
import { useLogin } from "@/hooks/useLogin";

export default function SignInPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    loading,
    globalError,
    errors,
    pressed,
    setPressed,
    handleLogin,
  } = useLogin();

  return (
    <AuthLayout
      imageSrc="/images/background/bg-sign-in.png"
      imageAlt="Sign In Background"
      imageSide="left"
      logoSide="left"
    >
      <form onSubmit={handleLogin}>
        <AuthFormHeader
          title="Halo!"
          subtitle="Selamat datang kembali. Kami senang melihat Anda lagi."
        />

        <div className="space-y-4">
          <GlobalError error={globalError} />

          <FormField
            label="Alamat Email"
            type="email"
            placeholder="nama@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          <PasswordInput
            label="Kata Sandi"
            placeholder="Masukan kata sandi Anda"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setRememberMe(!rememberMe)}
              className="flex items-center gap-2 group"
            >
              <span
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all shrink-0 ${
                  rememberMe
                    ? "bg-primary border-primary"
                    : "border-primary-light group-hover:border-primary"
                }`}
              >
                {rememberMe && <Check width="9" height="9" stroke="white" />}
              </span>
              <span className="text-sm text-text-caption select-none">Ingatkan saya</span>
            </button>
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              Lupa Kata Sandi?
            </Link>
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
              "Masuk"
            )}
          </button>

          <Button size="xl" variant="secondary" href="/register">
            Belum punya akun?<span className="font-bold">Daftar</span>
          </Button>
        </div>

        <AuthDivider text="atau masuk dengan" />
        <AuthSocialButtons />
      </form>
    </AuthLayout>
  );
}
