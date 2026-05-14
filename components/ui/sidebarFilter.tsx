"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { sports, cities } from "@/data/filter.json";
import Button from "./button";
import { Filter } from "@/src/icons";

export default function SidebarFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCity = searchParams?.get("lokasi") ?? "";
  const selectedSport = searchParams?.get("olahraga") ?? "";
  const hargaMin = searchParams?.get("harga_min") ?? "";
  const hargaMax = searchParams?.get("harga_max") ?? "";

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (value.trim()) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const resetFilters = () => {
    router.replace("?", { scroll: false });
  };

  return (
    <aside className="lg:w-56 xl:w-64 shrink-0">
      <div className="bg-white rounded-2xl border border-border shadow-sm p-5 sticky top-24">
        <h2 className="font-bold text-title text-base mb-5 flex items-center gap-2">
          <Filter/>
          Filter Venue
        </h2>

        {/* Lokasi */}
        <div className="mb-4">
          <label className="filter-label block mb-1.5">Pilih Lokasi</label>
          <select
            aria-label="opsi-lokasi"
            className="filter-select w-full px-3 py-2.5"
            value={selectedCity}
            onChange={(e) => updateParam("lokasi", e.target.value)}
          >
            <option value="">Lokasi</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Jenis Olahraga */}
        <div className="mb-4">
          <label className="filter-label block mb-1.5">Pilih Jenis Olahraga</label>
          <select
            aria-label="opsi-olahraga"
            className="filter-select w-full px-3 py-2.5"
            value={selectedSport}
            onChange={(e) => updateParam("olahraga", e.target.value)}
          >
            <option value="">Jenis Olahraga</option>
            {sports.map((sport) => (
              <option key={sport} value={sport}>{sport}</option>
            ))}
          </select>
        </div>

        {/* Harga */}
        <div className="mb-5">
          <label className="filter-label block mb-2">Harga</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted font-semibold">Rp</span>
              <input
                type="number"
                placeholder="Terendah"
                value={hargaMin}
                onChange={(e) => updateParam("harga_min", e.target.value)}
                className="w-full pl-7 pr-2 py-2.5 text-xs border-2 border-border rounded-lg focus:outline-none focus:border-primary bg-white text-body placeholder-muted"
              />
            </div>
            <div className="relative flex-1">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted font-semibold">Rp</span>
              <input
                type="number"
                placeholder="Tertinggi"
                value={hargaMax}
                onChange={(e) => updateParam("harga_max", e.target.value)}
                className="w-full pl-7 pr-2 py-2.5 text-xs border-2 border-1.5 border-border rounded-lg focus:outline-none focus:border-primary bg-white text-body placeholder-muted"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button variant="secondary" onClick={resetFilters}>Reset</Button>
        </div>
      </div>
    </aside>
  );
}