# Tri-Ace Booking 🏸

Platform pemesanan lapangan olahraga berbasis web yang memungkinkan pengguna mencari, melihat ketersediaan, dan memesan lapangan olahraga secara online.

---

## 🚀 Tech Stack

| Teknologi | Versi | Keterangan |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.2.4 | App Router, Server Components |
| [React](https://react.dev) | 19 | UI library |
| [TypeScript](https://www.typescriptlang.org) | ^5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | ^4 | Styling utility-first |
| [Supabase](https://supabase.com) | ^2 | Database & Auth (PostgreSQL) |
| [Lucide React](https://lucide.dev) | ^1 | Icon library |

---

## ✨ Fitur Utama

### 🏠 Halaman Utama (Venue Discovery)
- Grid venue dengan **skeleton loading** saat data sedang di-fetch
- **Filter sidebar** berdasarkan jenis olahraga, harga, dan status ketersediaan
- **Search bar** untuk mencari venue berdasarkan nama
- **Pagination** untuk navigasi halaman venue
- Badge status ketersediaan: Tersedia / Terbatas / Penuh

### 🏟️ Detail Venue
- Galeri foto venue
- Tabel ketersediaan lapangan interaktif (pilih slot per jam & lapangan)
- Informasi olahraga yang tersedia, harga per sesi, rating, dan alamat
- Batasan maksimum slot yang bisa dipilih
- Alert modal ketika slot penuh atau checkout tanpa memilih slot

### 📋 Riwayat Booking (`/booking`)
- Tampilan tabel responsif (desktop) dan card (mobile)
- Status booking: **Terkonfirmasi**, **Menunggu Pembayaran**, **Dibatalkan**, **Selesai**
- Aksi per booking: Detail, Bayar, Reschedule, Batalkan
- Empty state ketika belum ada booking

### 🔖 Detail Booking (`/booking/[bookingId]/detail`)
- Tiket digital dengan informasi lengkap venue, olahraga, tanggal, dan slot
- QR Code placeholder untuk verifikasi petugas
- Kode booking unik

### 🔁 Reschedule (`/booking/[bookingId]/reschedule`)
- Form pilih tanggal dan waktu baru
- Informasi booking aktif saat ini
- Info batas waktu reschedule (24 jam sebelum jadwal)

### 💳 Checkout (`/checkout/[bookingId]`)
- Ringkasan pesanan (venue, olahraga, tanggal, slot)
- Rincian biaya (sewa lapangan + biaya layanan)
- Pilih metode pembayaran: BCA, BRI, BNI, DANA, OVO, GoPay, QRIS

### ✅ Konfirmasi Pembayaran (`/checkout/[bookingId]/confirm`)
- Countdown timer batas waktu pembayaran
- Nomor Virtual Account per metode pembayaran
- Salin nomor rekening otomatis ke clipboard
- QRIS scan untuk metode QRIS
- Konfirmasi selesai yang mengupdate status booking ke `confirmed`

---

## 📁 Struktur Proyek

```
tri-ace-booking/
├── app/
│   ├── (main)/                  # Route group halaman utama
│   │   ├── page.tsx             # Halaman beranda (venue listing)
│   │   └── vanue/[id]/          # Halaman detail venue
│   ├── booking/
│   │   ├── page.tsx             # Riwayat booking
│   │   └── [bookingId]/
│   │       ├── detail/          # Tiket digital
│   │       └── reschedule/      # Form reschedule
│   ├── checkout/
│   │   └── [bookingId]/
│   │       ├── page.tsx         # Halaman pembayaran
│   │       └── confirm/         # Konfirmasi & instruksi bayar
│   └── (auth)/                  # Route group autentikasi
│
├── components/
│   ├── ui/                      # Komponen reusable
│   │   ├── vanueCard.tsx        # Card venue + skeleton loading
│   │   ├── availabilityTable.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── pagination.tsx
│   │   ├── searchbar.tsx
│   │   ├── sidebarFilter.tsx
│   │   ├── gallery.tsx
│   │   ├── alertModal.tsx
│   │   └── navlink.tsx
│   └── layouts/                 # Komponen layout per section
│       ├── main/
│       ├── checkout/
│       └── booking/
│
├── data/
│   ├── vanue.json               # Data venue (lokal)
│   ├── payment.json             # Daftar metode pembayaran
│   └── filter.json              # Opsi filter sidebar
│
├── hooks/
│   ├── useAvailability.ts       # Logika booking slot lapangan
│   └── usePagination.ts         # Logika pagination
│
├── lib/
│   ├── supabase/                # Client & server Supabase
│   ├── availability.ts
│   └── facEmoji.ts
│
└── types/
    └── venueItem.ts             # TypeScript types
```

---

## 🗄️ Database (Supabase)

Tabel `bookings`:

| Kolom | Tipe | Keterangan |
|---|---|---|
| `booking_group` | `text` | ID unik per sesi booking |
| `venue_id` | `text` | Referensi ke venue di `vanue.json` |
| `olahraga_slug` | `text` | Slug jenis olahraga |
| `tanggal` | `text` | Tanggal booking (YYYY-MM-DD) |
| `ri` | `int` | Indeks baris (jam) pada tabel ketersediaan |
| `ci` | `int` | Indeks kolom (lapangan) pada tabel ketersediaan |
| `status` | `text` | `pending` / `confirmed` / `cancelled` / `done` |
| `created_at` | `timestamp` | Waktu pembuatan booking |

---

## ⚙️ Setup & Menjalankan Proyek

### 1. Clone & Install

```bash
git clone <repo-url>
cd tri-ace-booking
pnpm install
```

### 2. Konfigurasi Environment

Buat file `.env.local` di root proyek:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Jalankan Development Server

```bash
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### 4. Build Production

```bash
pnpm build
pnpm start
```

---

## 📜 Scripts

| Script | Keterangan |
|---|---|
| `pnpm dev` | Jalankan development server |
| `pnpm build` | Build untuk production |
| `pnpm start` | Jalankan production server |
| `pnpm lint` | Cek kode dengan ESLint |

---

## 🔀 Alur Pemesanan

```
Halaman Utama → Detail Venue → Pilih Slot → Checkout → Konfirmasi Bayar → Tiket Digital
```

1. **Browse** venue di halaman utama, filter sesuai kebutuhan
2. **Klik venue** untuk melihat detail dan tabel ketersediaan
3. **Pilih slot** (lapangan + jam) yang diinginkan
4. **Checkout** — pilih metode pembayaran
5. **Bayar** sesuai instruksi (Virtual Account / QRIS)
6. **Tiket digital** siap ditunjukkan ke petugas di lokasi
