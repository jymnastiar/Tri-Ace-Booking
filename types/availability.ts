export interface Court {
  id: string;
  nama: string;
}

export interface Olahraga {
  slug: string;
  nama: string;
  ikon: string;
  harga_per_jam: number;
  courts: Court[];
}

export interface JamOperasional {
  buka: string;
  tutup: string;
  slot_durasi_menit: number;
}

export interface Slot {
  time: string;
  avail: boolean[];
}
