import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientSupabase } from "@/lib/supabase/client";
import { loginSchema } from "@/lib/validations/auth";

export function useLogin() {
  const router = useRouter();
  const supabase = createClientSupabase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [pressed, setPressed] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setGlobalError(null);

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as "email" | "password";
        if (field) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes("Login gagal")) {
        setGlobalError("Email atau kata sandi salah. Silakan coba lagi.");
      } else if (error.message.includes("Email not confirmed")) {
        setGlobalError("Email belum dikonfirmasi. Cek kotak masuk email kamu.");
      } else {
        setGlobalError(error.message);
      }
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  };

  return {
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
  };
}
