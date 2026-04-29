export default function MainContent() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-7">

        {/* <!-- ─── Sidebar Filter ─── --> */}
        <aside className="lg:w-56 xl:w-64 shrink-0">
          <div className="bg-white rounded-2xl border border-border shadow-sm p-5 sticky top-24">
            <h2 className="font-bold text-title text-base mb-5 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2.5" strokeLinecap="round"><path d="M3 6h18M6 12h12M9 18h6"/></svg>
              Filter Venue
            </h2>

            {/* <!-- Lokasi --> */}
            <div className="mb-4">
              <label className="filter-label block mb-1.5">Pilih Lokasi</label>
              <select className="filter-select w-full px-3 py-2.5">
                <option value="">Lokasi</option>
                <option>Jakarta Selatan</option>
                <option>Jakarta Pusat</option>
                <option>Tangerang</option>
                <option>Bandung</option>
              </select>
            </div>

            {/* <!-- Jenis Olahraga --> */}
            <div className="mb-4">
              <label className="filter-label block mb-1.5">Pilih Jenis Olahraga</label>
              <select className="filter-select w-full px-3 py-2.5">
                <option value="">Jenis Olahraga</option>
                <option>Badminton</option>
                <option>Basket</option>
                <option>Soccer</option>
                <option>Tennis</option>
                <option>Volleyball</option>
                <option>Bowling</option>
              </select>
            </div>

            {/* <!-- Tanggal --> */}
            <div className="mb-4">
              <label className="filter-label block mb-1.5">Pilih Tanggal</label>
              <div className="relative">
                <select className="filter-select w-full px-3 py-2.5 pr-8">
                  <option value="">HH/BB/TTTT</option>
                </select>
              </div>
            </div>

            {/* <!-- Waktu --> */}
            <div className="mb-5">
              <label className="filter-label block mb-1.5">Pilih Waktu</label>
              <select className="filter-select w-full px-3 py-2.5">
                <option value="">Jam XX:XX</option>
                <option>06:00</option><option>07:00</option><option>08:00</option>
                <option>09:00</option><option>10:00</option><option>15:00</option>
                <option>17:00</option><option>19:00</option><option>20:00</option>
              </select>
            </div>

            {/* <!-- Harga --> */}
            <div className="mb-5">
              <label className="filter-label block mb-2">Harga</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted font-semibold">Rp</span>
                  <input type="number" placeholder="Terendah" className="w-full pl-7 pr-2 py-2.5 text-xs border-1.5 border-border rounded-lg focus:outline-none focus:border-primary bg-white text-body placeholder-muted" style={{border:"1.5px solid #E2E8F0"}}/>
                </div>
                <div className="relative flex-1">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted font-semibold">Rp</span>
                  <input type="number" placeholder="Tertinggi" className="w-full pl-7 pr-2 py-2.5 text-xs border-1.5 border-border rounded-lg focus:outline-none focus:border-primary bg-white text-body placeholder-muted" style={{border:"1.5px solid #E2E8F0"}}/>
                </div>
              </div>
            </div>

            <button className="w-full py-2.5 rounded-btn bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors shadow-md shadow-primary/25">
              Terapkan Filter
            </button>
            <button className="w-full py-2 mt-2 rounded-btn border border-border text-body text-sm font-medium hover:bg-surface transition-colors">
              Reset
            </button>
          </div>
        </aside>

        {/* <!-- ─── Right: Search + Grid ─── --> */}
        <div className="flex-1 min-w-0">

          {/* <!-- Search bar --> */}
          <div className="relative mb-6 animate-fade-up" style={{animationDelay:"0.5s"}}>
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input type="text" placeholder="Cari lapangan, lokasi, atau jenis olahraga…"
              className="search-input w-full pl-11 pr-4 py-3.5 bg-white border border-border rounded-xl text-sm text-title placeholder-muted transition-shadow shadow-sm" />
          </div>

          {/* <!-- Section title --> */}
          <div className="flex items-center justify-between mb-4 animate-fade-up" style={{animationDelay:".08s"}}>
            <h2 className="font-bold text-title text-lg">Semua Lapangan <span className="text-muted font-medium text-base">(108)</span></h2>
            <select className="filter-select px-3 py-2 text-sm" >
              <option>Terpopuler</option>
              <option>Harga Terendah</option>
              <option>Harga Tertinggi</option>
              <option>Rating Tertinggi</option>
            </select>
          </div>

          {/* <!-- Cards Grid --> */}
          <div className="cards-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

            {/* <!-- Card 1: Brickhouse Kalibata --> */}
            <article className="venue-card bg-white rounded-2xl border border-border shadow-sm overflow-hidden cursor-pointer animate-fade-up">
              <div className="relative overflow-hidden h-44">
                <img src="https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80" alt="Brickhouse 1.0 Kalibata" className="card-img w-full h-full object-cover" />
                <div className="absolute top-3 left-3">
                  <span className="sport-badge inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold px-2.5 py-1 rounded-full border border-primary/20 shadow-sm">
                    🏀 Basket
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-title text-sm mb-1">Brickhouse 1.0 Kalibata</h3>
                <div className="flex items-center gap-1 mb-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <span className="text-xs font-semibold text-title">4.7</span>
                  <span className="text-xs text-muted">• Jl. Kalibata Utara II No.25, Kota Jakarta Selatan</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="price-tag font-bold text-sm">Mulai <strong>Rp65.000</strong><span className="font-normal text-muted text-xs">/sesi</span></span>
                  <span className="text-xs text-primary font-semibold bg-primary-light px-2 py-0.5 rounded-full">Tersedia</span>
                </div>
              </div>
            </article>

            {/* <!-- Card 2: Grand Bowling --> */}
            <article className="venue-card bg-white rounded-2xl border border-border shadow-sm overflow-hidden cursor-pointer animate-fade-up">
              <div className="relative overflow-hidden h-44">
                <img src="https://images.unsplash.com/photo-1541774995-4b8a1e6fbcbc?w=600&q=80" alt="Grand Bowling" className="card-img w-full h-full object-cover" />
                <div className="absolute top-3 left-3">
                  <span className="sport-badge inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-sky-600 text-xs font-semibold px-2.5 py-1 rounded-full border border-sky-100 shadow-sm">
                    🎳 Bowling
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-title text-sm mb-1">Grand Bowling</h3>
                <div className="flex items-center gap-1 mb-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <span className="text-xs font-semibold text-title">4.2</span>
                  <span className="text-xs text-muted">• Jl. Raya Serpong Kilometer 7, Kota Tangerang</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="price-tag font-bold text-sm">Mulai <strong>Rp60.000</strong><span className="font-normal text-muted text-xs">/sesi</span></span>
                  <span className="text-xs text-primary font-semibold bg-primary-light px-2 py-0.5 rounded-full">Tersedia</span>
                </div>
              </div>
            </article>

            {/* <!-- Card 3: Gor Badminton Aswaja --> */}
            <article className="venue-card bg-white rounded-2xl border border-border shadow-sm overflow-hidden cursor-pointer animate-fade-up">
              <div className="relative overflow-hidden h-44">
                <img src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&q=80" alt="Gor Badminton Aswaja Center" className="card-img w-full h-full object-cover" />
                <div className="absolute top-3 left-3">
                  <span className="sport-badge inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-green-600 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-100 shadow-sm">
                    🏸 Badminton
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-title text-sm mb-1">Gor Badminton Aswaja Center</h3>
                <div className="flex items-center gap-1 mb-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <span className="text-xs font-semibold text-title">4.6</span>
                  <span className="text-xs text-muted">• Jl. Sumber Sari No.72, Kota Bandung</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="price-tag font-bold text-sm">Mulai <strong>Rp40.000</strong><span className="font-normal text-muted text-xs">/sesi</span></span>
                  <span className="text-xs text-primary font-semibold bg-primary-light px-2 py-0.5 rounded-full">Tersedia</span>
                </div>
              </div>
            </article>

            {/* <!-- Card 4: GRIT Sports Club Baltos --> */}
            <article className="venue-card bg-white rounded-2xl border border-border shadow-sm overflow-hidden cursor-pointer animate-fade-up">
              <div className="relative overflow-hidden h-44">
                <img src="https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&q=80" alt="GRIT Sports Club Baltos" className="card-img w-full h-full object-cover" />
                <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                  <span className="sport-badge inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-green-600 text-xs font-semibold px-2 py-0.5 rounded-full border border-green-100 shadow-sm">🏸 Badminton</span>
                  <span className="sport-badge inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-emerald-600 text-xs font-semibold px-2 py-0.5 rounded-full border border-emerald-100 shadow-sm">⚽ Soccer</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-title text-sm mb-1">GRIT Sports Club Baltos</h3>
                <div className="flex items-center gap-1 mb-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <span className="text-xs font-semibold text-title">4.7</span>
                  <span className="text-xs text-muted">• Baltos Mall, Tamansari Lantai 3, Kota Bandung</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="price-tag font-bold text-sm">Mulai <strong>Rp45.000</strong><span className="font-normal text-muted text-xs">/sesi</span></span>
                  <span className="text-xs text-primary font-semibold bg-primary-light px-2 py-0.5 rounded-full">Tersedia</span>
                </div>
              </div>
            </article>

            {/* <!-- Card 5: GOR Sport Center --> */}
            <article className="venue-card bg-white rounded-2xl border border-border shadow-sm overflow-hidden cursor-pointer animate-fade-up">
              <div className="relative overflow-hidden h-44">
                <img src="https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&q=80" alt="GOR Sport Center" className="card-img w-full h-full object-cover" />
                <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                  <span className="sport-badge inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-green-600 text-xs font-semibold px-2 py-0.5 rounded-full border border-green-100 shadow-sm">🏸 Badminton</span>
                  <span className="sport-badge inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-orange-600 text-xs font-semibold px-2 py-0.5 rounded-full border border-orange-100 shadow-sm">🏐 VollyBall</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-title text-sm mb-1">GOR Sport Center</h3>
                <div className="flex items-center gap-1 mb-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <span className="text-xs font-semibold text-title">4.7</span>
                  <span className="text-xs text-muted">• Jl. Pegadaian No.2, Jakarta Pusat</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="price-tag font-bold text-sm">Mulai <strong>Rp65.000</strong><span className="font-normal text-muted text-xs">/sesi</span></span>
                  <span className="text-xs text-primary font-semibold bg-primary-light px-2 py-0.5 rounded-full">Tersedia</span>
                </div>
              </div>
            </article>

            {/* <!-- Card 6: Soccer Court C --> */}
            <article className="venue-card bg-white rounded-2xl border border-border shadow-sm overflow-hidden cursor-pointer animate-fade-up">
              <div className="relative overflow-hidden h-44">
                <img src="https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&q=80" alt="Soccer Court C" className="card-img w-full h-full object-cover" />
                <div className="absolute top-3 left-3">
                  <span className="sport-badge inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-emerald-600 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-100 shadow-sm">
                    ⚽ Soccer
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-title text-sm mb-1">Soccer Court C</h3>
                <div className="flex items-center gap-1 mb-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <span className="text-xs font-semibold text-title">4.7</span>
                  <span className="text-xs text-muted">• Jl. Stadion Senayan No.1.3, Kota Jakarta Pusat</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="price-tag font-bold text-sm">Mulai <strong>Rp70.000</strong><span className="font-normal text-muted text-xs">/sesi</span></span>
                  <span className="text-xs text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded-full">Hampir Penuh</span>
                </div>
              </div>
            </article>

            {/* <!-- Card 7: House of Tennis Gading Serpong --> */}
            <article className="venue-card bg-white rounded-2xl border border-border shadow-sm overflow-hidden cursor-pointer animate-fade-up">
              <div className="relative overflow-hidden h-44">
                <img src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&q=80" alt="House of Tennis Gading Serpong" className="card-img w-full h-full object-cover" />
                <div className="absolute top-3 left-3">
                  <span className="sport-badge inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-blue-600 text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-100 shadow-sm">
                    🎾 Tennis
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-title text-sm mb-1">House of Tennis Gading Serpong</h3>
                <div className="flex items-center gap-1 mb-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <span className="text-xs font-semibold text-title">4.8</span>
                  <span className="text-xs text-muted">• Jl. Skki Priyang, RT.008/RW.002, Tangerang</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="price-tag font-bold text-sm">Mulai <strong>Rp60.000</strong><span className="font-normal text-muted text-xs">/sesi</span></span>
                  <span className="text-xs text-primary font-semibold bg-primary-light px-2 py-0.5 rounded-full">Tersedia</span>
                </div>
              </div>
            </article>

            {/* <!-- Card 8: Tarantula Soccer Field --> */}
            <article className="venue-card bg-white rounded-2xl border border-border shadow-sm overflow-hidden cursor-pointer animate-fade-up">
              <div className="relative overflow-hidden h-44">
                <img src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&q=80" alt="Tarantula Soccer Field" className="card-img w-full h-full object-cover" />
                <div className="absolute top-3 left-3">
                  <span className="sport-badge inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-emerald-600 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-100 shadow-sm">
                    ⚽ Soccer
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-title text-sm mb-1">Tarantula Soccer Field</h3>
                <div className="flex items-center gap-1 mb-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <span className="text-xs font-semibold text-title">4.7</span>
                  <span className="text-xs text-muted">• Jl. Salak No.2, Kota Bandung</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="price-tag font-bold text-sm">Mulai <strong>Rp55.000</strong><span className="font-normal text-muted text-xs">/sesi</span></span>
                  <span className="text-xs text-primary font-semibold bg-primary-light px-2 py-0.5 rounded-full">Tersedia</span>
                </div>
              </div>
            </article>

            {/* <!-- Card 9: Siliwangi Basketball Court --> */}
            <article className="venue-card bg-white rounded-2xl border border-border shadow-sm overflow-hidden cursor-pointer animate-fade-up">
              <div className="relative overflow-hidden h-44">
                <img src="https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80&sat=-80" alt="Siliwangi Basketball Court" className="card-img w-full h-full object-cover" />
                <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                  <span className="sport-badge inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-blue-600 text-xs font-semibold px-2 py-0.5 rounded-full border border-blue-100 shadow-sm">🎾 Tennis</span>
                  <span className="sport-badge inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-orange-600 text-xs font-semibold px-2 py-0.5 rounded-full border border-orange-100 shadow-sm">🏐 VollyBall</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-title text-sm mb-1">Siliwangi Basketball Court</h3>
                <div className="flex items-center gap-1 mb-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <span className="text-xs font-semibold text-title">4.7</span>
                  <span className="text-xs text-muted">• Jl. Menado No.33, Kota Bandung</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="price-tag font-bold text-sm">Mulai <strong>Rp35.000</strong><span className="font-normal text-muted text-xs">/sesi</span></span>
                  <span className="text-xs text-primary font-semibold bg-primary-light px-2 py-0.5 rounded-full">Tersedia</span>
                </div>
              </div>
            </article>

          </div>
          {/* <!-- End Cards Grid --> */}

          {/* <!-- ─── Pagination ─── --> */}
          <div className="flex items-center justify-center gap-2 mt-10 animate-fade-up" style={{animationDelay:".5s"}}>
            <button className="page-btn w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-white text-body hover:bg-surface hover:border-primary/30 transition-all text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button className="page-btn w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-white text-body hover:bg-surface transition-all text-sm font-medium">1</button>
            <button className="page-btn active w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold">2</button>
            <button className="page-btn w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-white text-body hover:bg-surface transition-all text-sm font-medium">3</button>
            <span className="text-muted text-sm px-1">…</span>
            <button className="page-btn w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-white text-body hover:bg-surface transition-all text-sm font-medium">11</button>
            <button className="page-btn w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-white text-body hover:bg-surface hover:border-primary/30 transition-all text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>

        </div>
        {/* <!-- End Right column --> */}

      </div>
    </main>
  );
}   