import { createBrowserClient } from "@supabase/ssr";

/**
 * Client untuk dipakai di komponen browser ("use client").
 * Menggunakan @supabase/ssr agar session tersimpan sebagai COOKIE
 * (bukan localStorage), sehingga middleware bisa membacanya.
 */
export function createClientSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
