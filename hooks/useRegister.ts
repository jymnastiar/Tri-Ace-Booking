import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientSupabase } from "@/lib/supabase/client";
import { registerSchema } from "@/lib/validations/auth";

export function useRegister() {
  const router = useRouter();
  const supabase = createClientSupabase();

  const [namaDepan, setNamaDepan] = useState("");
  const [namaBelakang, setNamaBelakang] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    namaDepan?: string;
    email?: string;
    password?: string;
    konfirmasi?: string;
  }>({});
  const [sukses, setSukses] = useState(false);
  const [pressed, setPressed] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setGlobalError(null);

    const result = registerSchema.safeParse({
      namaDepan,
      namaBelakang,
      email,
      password,
      konfirmasi,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (field) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: `${namaDepan} ${namaBelakang}`.trim(),
          first_name: namaDepan,
          last_name: namaBelakang,
        },
      },
    });

    if (error) {
      if (error.message.includes("sudah terdatar")) {
        setGlobalError(
          "Email ini sudah terdaftar. Silakan masuk atau gunakan email lain.",
        );
      } else if (error.message.includes("Password harus")) {
        setGlobalError(
          "Kata sandi terlalu lemah. Gunakan kombinasi huruf dan angka.",
        );
      } else {
        setGlobalError(error.message);
      }
      setLoading(false);
      return;
    }

    setSukses(true);
    setLoading(false);

    router.push("/");
    router.refresh();
  };

  return {
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
    sukses,
    pressed,
    setPressed,
    handleRegister,
  };
}
