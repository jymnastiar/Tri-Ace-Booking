"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-10 animate-fade-up" style={{ animationDelay: ".5s" }}>
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="cursor-pointer page-btn w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-white text-body hover:bg-surface hover:border-primary/30 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>

      {/* Page numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`cursor-pointer page-btn w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
            page === currentPage
              ? 'bg-primary text-white shadow'
              : 'border border-border bg-white text-body hover:bg-surface'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="cursor-pointer page-btn w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-white text-body hover:bg-surface hover:border-primary/30 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    </div>
  );
}