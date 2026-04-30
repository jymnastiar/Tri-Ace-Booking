export default function SearchBar() {
  return (
    <div className="relative mb-6 animate-fade-up">
      <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <input type="text" placeholder="Cari lapangan, lokasi, atau jenis olahraga…"
        className="search-input w-full pl-11 pr-4 py-3.5 bg-white border border-border rounded-xl text-sm text-title placeholder-muted transition-shadow shadow-sm" />
    </div>
  )
}