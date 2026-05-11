import Badge from "@/components/ui/badge";
import { Star } from "@/src/icons";

export default function MainHero() {
  return (
    <section className="hero-bg py-16 sm:py-20 lg:py-28 text-white relative">
      <div className="hero-grid"></div>
      {/* <!-- Blobs --> */}
      <div className="blob absolute top-1/2 right-0 w-96 h-96 bg-sky-500/20 rounded-full -translate-y-1/2 translate-x-1/3"></div>
      <div className="blob absolute bottom-0 left-0 w-72 h-72 bg-sky-400/10 rounded-full translate-y-1/2 -translate-x-1/4"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* <!-- Badge --> */}
        <Badge variant="hero" dot={true} className="mb-5 animate-fade-up">
          100+ Lapangan Tersedia
        </Badge>
        <h1 className="hero-title animate-fade-up font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight mb-4">
          BOOKING LAPANGAN<br/>
          <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-300 to-sky-500">OLAHRAGA</span>
        </h1>
        <p className="hero-sub animate-fade-up text-sky-100/80 text-base sm:text-lg max-w-lg mx-auto mb-8">
          Booking Lapangan di Tri-Ace Booking sat-set gak pake ribet!!
        </p>

        {/* <!-- Quick stat pills --> */}
        <div className="animate-fade-up flex flex-wrap justify-center gap-3">
          <Badge variant="stats" icon={<Star color="#FACC15" width={18} height={18}/>}>
            4.8 Rating
          </Badge>
          <Badge variant="stats" icon="/icons/userstat.svg">
            50k+ Pengguna
          </Badge>
          <Badge variant="stats" icon="/icons/calender.svg">
            Booking 24/7
          </Badge>
        </div>
      </div>
    </section>
  );
}   