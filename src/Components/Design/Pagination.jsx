import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      {/* Previous Page Button */}
      <button
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-xs font-semibold text-slate-300 transition-all ${
          currentPage === 1
            ? "cursor-not-allowed opacity-40"
            : "hover:border-slate-700 hover:bg-slate-800 hover:text-white active:scale-95"
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNum) => {
        const isActive = pageNum === currentPage;
        return (
          <button
            key={pageNum}
            onClick={() => setCurrentPage(pageNum)}
            className={`flex h-9 min-w-9 items-center justify-center rounded-xl px-2.5 text-xs font-bold transition-all active:scale-95 ${
              isActive
                ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-600/30 border border-violet-500/30"
                : "border border-slate-800 bg-slate-900/70 text-slate-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      {/* Next Page Button */}
      <button
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-xs font-semibold text-slate-300 transition-all ${
          currentPage === totalPages
            ? "cursor-not-allowed opacity-40"
            : "hover:border-slate-700 hover:bg-slate-800 hover:text-white active:scale-95"
        }`}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}