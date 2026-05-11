// components/main/MainContent.tsx
"use client";

import SearchBar from "@/components/ui/searchbar";
import SidebarFilter from "@/components/ui/sidebarFilter";
import VanueCard from "@/components/ui/vanueCard";
import Pagination from "@/components/ui/pagination";
import { useVenueFilter } from "@/hooks/useVenueFilter";
import { useVenueRouter } from "@/hooks/useVenueRouter";
import { usePagination } from "@/hooks/usePagination";

const ITEMS_PER_PAGE = 9;

export default function MainContent() {
  const { filteredData, isLoading, query } = useVenueFilter();
  const { handleSearchChange } = useVenueRouter();
  
  const { currentPage, totalPages, paginatedData, goToPage } = usePagination({
    data: filteredData,
    itemsPerPage: ITEMS_PER_PAGE,
  });

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