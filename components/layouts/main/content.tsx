"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/ui/pagination";
import SearchBar from "@/components/ui/searchbar";
import SidebarFilter from "@/components/ui/sidebarFilter";
import VanueCard from "@/components/ui/vanueCard";
import { usePagination } from "@/hooks/usePagination";
import type { VenueItem } from "@/types/venueItem";

const ITEMS_PER_PAGE = 9;

export default function MainContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams?.get("q") ?? "";

  const [allVenue, setAllVenue] = useState<VenueItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const city = searchParams?.get("lokasi") ?? "";
  const sport = searchParams?.get("olahraga") ?? "";
  const hargaMin = searchParams?.get("harga_min") ?? "";
  const hargaMax = searchParams?.get("harga_max") ?? "";

  useEffect(() => {
    import("@/data/vanue.json").then((mod) => {
      setAllVenue(mod.default as VenueItem[]);
      setIsLoading(false);
    });
  }, []);

  const filteredData = allVenue.filter((v) => {
    // Filter pencarian nama
    if (query.trim() && !v.nama.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }
    // Filter lokasi (kota)
    if (city && v.kota.toLowerCase() !== city.toLowerCase()) {
      return false;
    }
    // Filter jenis olahraga
    if (sport && !v.jenis_olahraga.some((o) => o.toLowerCase() === sport.toLowerCase())) {
      return false;
    }
    // Filter harga minimal
    if (hargaMin && v.harga_mulai < parseInt(hargaMin)) {
      return false;
    }
    // Filter harga maksimal
    if (hargaMax && v.harga_mulai > parseInt(hargaMax)) {
      return false;
    }
    return true;
  });

  const { currentPage, totalPages, paginatedData, goToPage } = usePagination({
    data: filteredData,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  const handleSearchChange = (value: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (value.trim()) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-7">
        <SidebarFilter />

        <div className="flex-1 min-w-0">
          <SearchBar value={query} onChange={handleSearchChange} />
          <VanueCard
            items={paginatedData}
            isLoading={isLoading}
            skeletonCount={ITEMS_PER_PAGE}
          />
          {!isLoading && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
            />
          )}
        </div>
      </div>
    </main>
  );
}