import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  // Buat Supabase client yang bisa baca & tulis cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Ambil data user yang sedang login
  const { data: { user } } = await supabase.auth.getUser();

  // Proteksi /admin — hanya user dengan role "admin" yang boleh masuk
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!user) {
      // Belum login → arahkan ke halaman login
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (user.user_metadata?.role !== "admin") {
      // Sudah login tapi bukan admin → arahkan ke halaman utama
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return response;
}

export const config = {
  // Middleware hanya aktif untuk route /admin dan semua sub-routenya
  matcher: ["/admin/:path*"],
};
