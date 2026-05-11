"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { VenueItem } from "@/types/venueItem";

export function useVenueFilter() {
  const searchParams = useSearchParams();
  const query = searchParams?.get("q") ?? "";
  const city = searchParams?.get("lokasi") ?? "";
  const sport = searchParams?.get("olahraga") ?? "";
  const hargaMin = searchParams?.get("harga_min") ?? "";
  const hargaMax = searchParams?.get("harga_max") ?? "";

  const [allVenue, setAllVenue] = useState<VenueItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    import("@/data/vanue.json").then((mod) => {
      setAllVenue(mod.default as VenueItem[]);
      setIsLoading(false);
    });
  }, []);

  const filteredData = allVenue.filter((v) => {
    if (query.trim() && !v.nama.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }
    if (city && v.kota.toLowerCase() !== city.toLowerCase()) {
      return false;
    }
    if (
      sport &&
      !v.jenis_olahraga.some((o) => o.toLowerCase() === sport.toLowerCase())
    ) {
      return false;
    }
    if (hargaMin && v.harga_mulai < parseInt(hargaMin)) {
      return false;
    }
    if (hargaMax && v.harga_mulai > parseInt(hargaMax)) {
      return false;
    }
    return true;
  });

  return {
    allVenue,
    isLoading,
    filteredData,
    query,
  };
}
