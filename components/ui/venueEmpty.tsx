import IllustrationVanueEmpty from "./illustrationVanueEmpty";

export default function VenueEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-6 text-center">

      {/* ── ilustrasi ── */}
      <IllustrationVanueEmpty/>

      <h3 className="font-extrabold text-[#0F172A] text-xl tracking-tight mb-2">
        Venue Tidak Ditemukan
      </h3>

      <p className="text-sm text-body max-w-xs leading-relaxed mb-7">
        Tidak ada lapangan yang sesuai dengan filter atau pencarian kamu. Coba ubah atau reset pencarian.
      </p>
    </div>
  );
}
