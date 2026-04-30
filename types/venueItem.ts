export interface VenueItem {
  id: string;
  nama: string;
  slug: string;
  alamat: string;
  status: "penuh" | "terbatas" | "tersedia";
  rating: number;
  harga_mulai: number;
  foto: string[];
  jenis_olahraga: string[];
}
