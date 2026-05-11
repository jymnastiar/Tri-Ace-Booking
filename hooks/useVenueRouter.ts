"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useVenueRouter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearchChange = (value: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (value.trim()) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return {
    handleSearchChange,
    searchParams,
  };
}
