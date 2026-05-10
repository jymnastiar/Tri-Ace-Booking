import Badge from './badge';
import type { VenueItem } from '@/types/venueItem';
import Link from 'next/link';

interface VenueListProps {
  items: VenueItem[];
  isLoading?: boolean;
  skeletonCount?: number;
}

function SkeletonCard() {
  return (
    <div className="venue-card bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
      <div className="relative overflow-hidden h-44 bg-gray-200 animate-pulse">
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="h-6 w-20 rounded-full bg-gray-300 animate-pulse inline-block" />
          <span className="h-6 w-16 rounded-full bg-gray-300 animate-pulse inline-block" />
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <div className="h-4 w-3/4 rounded-md bg-gray-200 animate-pulse mb-1" />

        <div className="flex items-center gap-2">
          <div className="h-3 w-8 rounded bg-gray-200 animate-pulse" />
          <div className="h-3 w-32 rounded bg-gray-200 animate-pulse" />
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="h-4 w-28 rounded bg-gray-200 animate-pulse" />
          <div className="h-6 w-16 rounded-full bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function VenueCardSkeleton({ count = 9 }: { count?: number }) {
  return (
    <div className="cards-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export default function VenueCard({ items, isLoading = false, skeletonCount = 9 }: VenueListProps) {
  if (isLoading) {
    return <VenueCardSkeleton count={skeletonCount} />;
  }

  if (!items || items.length === 0) return null;

  return (
    <div className="cards-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {items.map((item: VenueItem) => {
        return (
          <Link href={`/vanue/${item.id}`} key={item.id} className="venue-card bg-white rounded-2xl border border-border shadow-sm overflow-hidden cursor-pointer animate-fade-up">
            <div className="relative overflow-hidden h-44">
              <img src={item.foto[0]} alt={item.slug} className="card-img w-full h-full object-cover" />
              <div className="absolute top-3 left-3 flex gap-1">
                {item.jenis_olahraga.map((sport: string, i: number) => (
                  <Badge key={i} variant='category' icon={`/icons/${sport}.svg`}>{sport}</Badge>
                ))}
              </div>
            </div>

            <div className="p-4 flex flex-col gap-2">
              <h3 className="font-bold text-title text-sm mb-1">{item.nama}</h3>
              <div className="flex items-center gap-1 mb-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
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
        );
      })}
    </div>
  );
}