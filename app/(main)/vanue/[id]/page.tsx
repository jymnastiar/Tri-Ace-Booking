import vanueData from '@/data/vanue.json';
import { notFound } from 'next/navigation';
import { createServerSupabase } from '@/lib/supabase/server';

import MobileCTA from '@/components/layouts/venue/mobileCTA';
import Gallery from '@/components/layouts/venue/gallery';
import VenueBookingSection from '@/components/layouts/booking/venuebook';
import VenueBreadcrumb from '@/components/layouts/venue/VenueBreadcrumb';
import VenueHeader from '@/components/layouts/venue/VenueHeader';
import VenueDescription from '@/components/layouts/venue/VenueDescription';
import VenueRules from '@/components/layouts/venue/VenueRules';
import VenueSidebar from '@/components/layouts/venue/VenueSidebar';

async function getVenueData(id: string) {
  const vanue = vanueData.find((item) => id === item.id);
  if (!vanue) return null;

  const supabase = createServerSupabase();
  const today = new Date().toISOString().split("T")[0];
  const { data: bookedData } = await supabase
    .from('bookings')
    .select('ri, ci')
    .eq('venue_id', vanue.id)
    .eq('tanggal', today)
    .in('status', ['pending', 'confirmed']);
    
  const initialBookedSlots = bookedData?.map(b => [b.ri, b.ci] as [number, number]) ?? [];
  
  return {
    vanue,
    initialBookedSlots
  };
}

export default async function VanueDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const data = await getVenueData(id);
  
  if (!data) return notFound();
  
  const { vanue, initialBookedSlots } = data;

  return (
    <section>
      <VenueBreadcrumb name={vanue.nama} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="flex-1 min-w-0">
            <Gallery images={vanue.foto} />

            <VenueHeader 
              name={vanue.nama}
              rating={vanue.rating}
              address={vanue.alamat}
              sports={vanue.jenis_olahraga}
              whatsapp={vanue.whatsapp_admin}
            />

            <hr className="section-divider" />
            <VenueDescription description={vanue.deskripsi} />

            <hr className="section-divider" />
            <VenueRules rules={vanue.aturan} />

            <hr className="section-divider" />
            <VenueBookingSection
              venueId={vanue.id}
              olahraga={vanue.olahraga}
              jamOperasional={vanue.jam_operasional}
              initialBookedSlots={initialBookedSlots}
            />
          </div>

          {/* Right Column (sticky booking card) */}
          <VenueSidebar 
            price={vanue.harga_mulai}
            description={vanue.deskripsi}
            facilities={vanue.fasilitas}
            address={vanue.alamat}
          />
        </div>
      </main>

      <MobileCTA harga={vanue.harga_mulai} />
    </section>
  );
}
