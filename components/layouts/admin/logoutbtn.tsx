"use client";

import { useRouter } from "next/navigation";
import { createClientSupabase } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClientSupabase();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center justify-center px-4 py-2 rounded-btn border-2 border-primary text-sm text-primary font-semibold hover:bg-primary-light transition-colors duration-200"
    >
      Logout
    </button>
  );
}