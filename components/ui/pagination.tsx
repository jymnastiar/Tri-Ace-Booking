"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Logic to show limited page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + maxVisible - 1);

      if (end === totalPages) {
        start = Math.max(1, end - maxVisible + 1);
      }

      for (let i = start; i <= end; i++) pages.push(i);
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mt-10 animate-fade-up stagger-3">
      {/* Previous */}
      <button
        aria-label="previous"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="cursor-pointer page-btn w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-white text-body hover:bg-surface hover:border-primary/30 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Page numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`cursor-pointer page-btn w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${
            page === currentPage
              ? "bg-primary text-white shadow-lg shadow-sky-200"
              : "border border-border bg-white text-body hover:bg-surface hover:border-primary/30"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        aria-label="next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="cursor-pointer page-btn w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-white text-body hover:bg-surface hover:border-primary/30 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
