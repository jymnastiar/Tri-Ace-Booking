# Tri-Ace Booking 🏸

**Tri-Ace Booking** adalah platform pemesanan lapangan olahraga berbasis web yang dirancang untuk memudahkan komunitas olahraga dalam mencari, mengecek ketersediaan, dan memesan lapangan secara instan.

Mulai dari Badminton, Basket, Futsal, hingga Tenis dan Bowling, Tri-Ace Booking menghubungkan pengguna dengan berbagai venue olahraga terbaik di Jakarta, Bandung, dan sekitarnya dengan sistem pembayaran yang aman dan tiket digital yang praktis.

---

## ✨ Fitur Utama

### 🔍 Eksplorasi Venue yang Cerdas
- **Pencarian & Filter Presisi**: Temukan lapangan berdasarkan jenis olahraga (Badminton, Basket, Voli, Futsal, Tenis, Bowling), rentang harga, kota, hingga status ketersediaan.
- **Visual yang Informatif**: Dilengkapi dengan galeri foto venue, daftar fasilitas lengkap (Parkir, Wi-Fi, Shower, dll), serta aturan venue untuk kenyamanan bersama.
- **Status Real-time**: Indikator status venue (Tersedia, Terbatas, atau Penuh) memudahkan Anda mengambil keputusan dengan cepat.

### 📅 Sistem Booking Interaktif
- **Tabel Ketersediaan Visual**: Pilih slot waktu dan nomor lapangan secara langsung melalui grid interaktif yang intuitif.
- **Validasi Cerdas**: Sistem mencegah pemilihan slot yang sudah dipesan orang lain dan memberikan peringatan jika melebihi batas pemesanan.
- **Multi-slot Booking**: Pesan beberapa jam atau lapangan sekaligus dalam satu transaksi.

### 💳 Pembayaran & Konfirmasi Otomatis
- **Berbagai Metode Pembayaran**: Mendukung transfer bank (BCA, BNI, BRI) dan e-wallet populer (DANA, OVO, GoPay, QRIS).
- **Countdown Pembayaran**: Fitur pengingat waktu pembayaran untuk menjaga keadilan alokasi slot lapangan.
- **Konfirmasi Instan**: Status booking otomatis berubah menjadi 'Terkonfirmasi' setelah pembayaran divalidasi.

### 🎫 Manajemen Pesanan & Tiket Digital
- **Riwayat Booking Lengkap**: Pantau semua status pesanan Anda (Pembayaran, Terkonfirmasi, Selesai, atau Dibatalkan) dalam satu halaman.
- **Tiket Digital & QR Code**: Dapatkan tiket digital lengkap dengan QR Code unik untuk kemudahan verifikasi saat tiba di lokasi (check-in).
- **Reschedule Fleksibel**: Ajukan perubahan jadwal secara mandiri sesuai dengan kebijakan waktu yang berlaku di venue.

---

## 🚀 Teknologi yang Digunakan

| Teknologi | Keterangan |
|---|---|
| **Next.js 16 (App Router)** | Framework React untuk performa maksimal dan SEO-friendly. |
| **React 19** | Library UI terbaru untuk antarmuka yang responsif dan interaktif. |
| **TypeScript** | Memastikan keamanan kode dan meminimalisir error saat pengembangan. |
| **Tailwind CSS 4** | Styling modern dengan pendekatan utility-first untuk desain yang bersih dan responsif. |
| **Supabase** | Backend-as-a-Service untuk manajemen Database PostgreSQL dan Autentikasi yang aman. |
| **Zod** | Validasi skema data yang ketat untuk input form dan integrasi API. |

---

## ⚙️ Cara Menjalankan Proyek

### 1. Persiapan
Pastikan Anda sudah menginstal [Node.js](https://nodejs.org) dan [pnpm](https://pnpm.io).

```bash
# Clone repository
git clone <repo-url>

# Masuk ke direktori
cd tri-ace-booking

# Instal dependensi
pnpm install
```

### 2. Konfigurasi
Buat file `.env.local` dan masukkan kredensial Supabase Anda:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Jalankan Aplikasi
```bash
# Mode pengembangan
pnpm dev

# Build untuk produksi
pnpm build
pnpm start
```

Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000).

---

## 🔀 Alur Pengguna (User Flow)
1. **Cari**: Filter lapangan favorit di halaman utama.
2. **Pilih**: Lihat detail venue dan tentukan slot jam/lapangan yang tersedia.
3. **Bayar**: Lakukan pembayaran melalui metode pilihan Anda sebelum batas waktu habis.
4. **Main**: Tunjukkan tiket digital di lokasi dan selamat berolahraga!
