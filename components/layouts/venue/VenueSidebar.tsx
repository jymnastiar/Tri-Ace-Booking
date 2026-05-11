import Button from '@/components/ui/button';
import MapPlaceholder from '@/components/ui/mapPlaceholder';
import { facEmoji } from '@/lib/facEmoji';

interface VenueSidebarProps {
  price: number;
  description: string;
  facilities: string[];
  address: string;
}

export default function VenueSidebar({ price, description, facilities, address }: VenueSidebarProps) {
  return (
    <div className="lg:w-72 xl:w-80 shrink-0">
      <div className="booking-card">
        {/* Booking card */}
        <div className="bg-white rounded-2xl border border-border shadow-lg p-5 mb-4 animate-fade-up stagger-1">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              </div>
              <span className="text-xs text-muted font-medium">Mulai dari</span>
            </div>
          </div>
          <p className="price-display font-extrabold text-3xl text-title transition-colors mb-1">
            Rp {price.toLocaleString('id-ID')}
          </p>
          <p className="text-xs text-muted mb-4 leading-relaxed">
            {description.substring(0, 100)}...
          </p>
          <Button variant="primary" size="md" href="#ketersediaan">
            Booking Lapangan
          </Button>
        </div>

        {/* Fasilitas */}
        <div className="bg-white rounded-2xl border border-border shadow-sm p-5 mb-4 animate-fade-up stagger-2">
          <h3 className="font-bold text-title text-base mb-3">Fasilitas Venue</h3>
          <ul className="space-y-1">
            {facilities.map((fac, i) => (
              <li key={i} className="fac-item flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm text-body">
                <span className="w-7 h-7 rounded-lg bg-primary-light flex items-center justify-center shrink-0 text-base">
                  {facEmoji(fac)}
                </span>
                {fac}
              </li>
            ))}
          </ul>
        </div>

        {/* Map placeholder */}
        <MapPlaceholder alamat={address} />
      </div>
    </div>
  );
}
