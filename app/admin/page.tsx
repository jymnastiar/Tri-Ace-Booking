import Link from "next/link";
import { redirect } from "next/navigation";
import Logo from "@/public/icons/logo";
import { createAuthSupabase } from "@/lib/supabase/server";
import LogoutButton from "@/components/layouts/admin/logoutbtn";

export default async function AdminDashboardPage() {
  const supabase = await createAuthSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.user_metadata?.role !== 'admin') {
    redirect('/login');
  }

  const stats = [
    { label: "Total Bookings", value: 1247, icon: "📅" },
    { label: "Venues Aktif", value: 45, icon: "🏟️" },
    { label: "Pendapatan Bulan Ini", value: "Rp 12.5M", icon: "💰" },
    { label: "Users Terdaftar", value: 892, icon: "👥" },
  ];

  const menuItems = [
    {
      title: "Kelola Venues",
      description: "Tambah, edit, dan lihat semua venue mitra.",
      href: "/admin/venues",
      icon: "🏟️",
    },
    {
      title: "Kelola Bookings",
      description: "Pantau semua booking dan statusnya.",
      href: "/admin/bookings",
      icon: "📋",
    },
    {
      title: "Kelola Users",
      description: "Kelola user, member, dan pemilik lapangan.",
      href: "/admin/users",
      icon: "👥",
    },
    {
      title: "Laporan",
      description: "Lihat pendapatan, komisi, dan statistik.",
      href: "/admin/reports",
      icon: "📊",
    },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <header className="navbar sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 shrink-0 animate-fade-in">
            <Logo width={30} height={30} />
            <span className="font-bold text-title text-base tracking-tight">
              TRI-ACE<span className="text-primary"> BOOKING</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            <Link href="/admin/venues" className="nav-link text-sm font-semibold text-primary">
              Kelola Venues
            </Link>
            <Link href="/admin/bookings" className="nav-link text-sm font-medium text-body hover:text-title transition-colors">
              Kelola Bookings
            </Link>
            <Link href="/admin/users" className="nav-link text-sm font-medium text-body hover:text-title transition-colors">
              Kelola Users
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-2.5 animate-fade-in">
            <span className="text-sm text-body">Admin Panel</span>
            <LogoutButton/>
          </div>

          <div className="md:hidden">
            <LogoutButton/>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl border border-border shadow-sm p-4 animate-fade-up">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{stat.icon}</div>
                <div>
                  <p className="text-xs font-medium text-muted">{stat.label}</p>
                  <p className="text-2xl font-bold text-title">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden animate-fade-up">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-lg font-bold text-title">Menu Admin</h2>
            <p className="text-sm text-body mt-1">Pilih area manajemen untuk mengatur venue, booking, user, dan laporan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-2xl border border-border bg-surface p-5 transition hover:border-primary hover:bg-white"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-title">{item.title}</h3>
                    <p className="mt-2 text-sm text-body">{item.description}</p>
                  </div>
                  <span className="text-3xl">{item.icon}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer className="my-10 flex justify-center">
        <span className="italic text-text-caption text-sm">------- Tampilan hanya sementara -------</span>
      </footer>
    </div>
  );
}