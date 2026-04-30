import Image from 'next/image';
import Badge from './badge';
import type { VenueItem } from '@/types/venueItem';
import Link from 'next/link';

interface VenueListProps {
  items: VenueItem[];
}

export default function VenueCard({ items }: VenueListProps ) {
  if (!items || items.length === 0) return null;

  return(
    <div className="cards-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {items.map((item: VenueItem) => {
        return(
          <Link href={`/vanue/${item.id}`} key={item.id} className="venue-card bg-white rounded-2xl border border-border shadow-sm overflow-hidden cursor-pointer animate-fade-up">
            <div className="relative overflow-hidden h-44">
              <img src={item.foto[0]} alt={item.slug} className="card-img w-full h-full object-cover"/>
              <div className="absolute top-3 left-3">
                {item.jenis_olahraga.map((sport: string, i: number) => (
                  <span key={i} className="mr-1 mb-1 inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold px-2.5 py-1 rounded-full border border-primary/20 shadow-sm">
                    <Image src={`/icons/${sport}.svg`} alt="" width={16} height={16} />
                    {sport}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="p-4 flex flex-col gap-2">
              <h3 className="font-bold text-title text-sm mb-1">{item.nama}</h3>
              <div className="flex items-center gap-1 mb-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <span className="text-xs font-semibold text-title">{item.rating}</span>
                <span className="text-xs text-muted truncate">• {item.alamat}</span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="price-tag font-bold text-sm">Mulai <strong>Rp{item.harga_mulai.toLocaleString('ID-id')}</strong><span className="font-normal text-muted text-xs">/sesi</span></span>
                <Badge variant='status' variantStatus={item.status as "penuh" | "terbatas" | "tersedia"}>
                  {item.status == "tersedia" ? "Tersedia" : item.status == "terbatas" ? "Terbatas" : "Penuh"}
                </Badge>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  );
};