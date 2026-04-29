export default function MainHero() {
  return (
    <section className="hero-bg py-16 sm:py-20 lg:py-28 text-white relative">
      <div className="hero-grid"></div>
      {/* <!-- Blobs --> */}
      <div className="blob absolute top-1/2 right-0 w-96 h-96 bg-sky-500/20 rounded-full -translate-y-1/2 translate-x-1/3"></div>
      <div className="blob absolute bottom-0 left-0 w-72 h-72 bg-sky-400/10 rounded-full translate-y-1/2 -translate-x-1/4"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* <!-- Badge --> */}
        <div className="hero-badge animate-fade-up inline-flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3.5 py-1.5 text-xs font-semibold text-sky-200 mb-5 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
          100+ Lapangan Tersedia
        </div>
        <h1 className="hero-title animate-fade-up font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight mb-4">
          BOOKING LAPANGAN<br/>
          <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-300 to-sky-500">OLAHRAGA</span>
        </h1>
        <p className="hero-sub animate-fade-up text-sky-100/80 text-base sm:text-lg max-w-lg mx-auto mb-8">
          Booking Lapangan di Tri-Ace Booking sat-set gak pake ribet!!
        </p>

        {/* <!-- Quick stat pills --> */}
        <div className="animate-fade-up flex flex-wrap justify-center gap-3">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2 text-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span className="text-sky-100 font-medium">4.8 Rating</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2 text-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span className="text-sky-100 font-medium">50k+ Pengguna</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2 text-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            <span className="text-sky-100 font-medium">Booking 24/7</span>
          </div>
        </div>
      </div>
    </section>
  );
}   