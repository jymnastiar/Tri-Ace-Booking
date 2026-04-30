"use client";

import Pagination from '@/components/ui/pagination';
import SearchBar from '@/components/ui/searchbar';
import SidebarFilter from '@/components/ui/sidebarFilter';
import VanueCard from '@/components/ui/vanueCard';
import vanueData from '@/data/vanue.json';
import { usePagination } from '@/hooks/usePagination';
import type { VenueItem } from '@/types/venueItem';

const ITEMS_PER_PAGE = 9;

const vanue = vanueData as VenueItem[];

export default function MainContent() {
  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
  } = usePagination({ data: vanue, itemsPerPage: ITEMS_PER_PAGE });
  
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-7">
        <SidebarFilter/>

        <div className="flex-1 min-w-0">
          <SearchBar/>
          <VanueCard items={paginatedData}/>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage}/>
        </div>

      </div>
    </main>
  );
}