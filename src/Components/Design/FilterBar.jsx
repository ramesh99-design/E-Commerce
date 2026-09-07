import React from "react";
import { Filter, RotateCcw } from "lucide-react";

export default function FilterBar({
  priceFilter,
  setPriceFilter,
  inStockOnly,
  setInStockOnly,
  resetFilters,
  priceOptions = [],
}) {
  const hasActiveFilters = Boolean(priceFilter || inStockOnly);

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {/* Price Filter Dropdown */}
      <div className="relative inline-flex items-center">
        <div className="pointer-events-none absolute left-3 flex items-center text-slate-400">
          <Filter className="h-3.5 w-3.5" />
        </div>
        <select
          className="h-10 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/90 pl-9 pr-8 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-sm outline-none transition-all hover:border-slate-400 dark:hover:border-slate-700 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 cursor-pointer appearance-none"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          aria-label="Filter by price"
        >
          <option value="" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-300">All Prices</option>
          {priceOptions.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-300">
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* In Stock Toggle Pill */}
      <button
        type="button"
        onClick={() => setInStockOnly(!inStockOnly)}
        className={`flex h-10 items-center gap-2 rounded-xl px-3.5 text-xs font-semibold transition-all ${
          inStockOnly
            ? "border border-emerald-500/40 bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 shadow-sm"
            : "border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
        }`}
      >
        <span
          className={`h-2 w-2 rounded-full ${
            inStockOnly ? "bg-emerald-500 animate-pulse" : "bg-slate-400 dark:bg-slate-600"
          }`}
        />
        In Stock
      </button>

      {/* Reset Filters Button */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={resetFilters}
          className="flex h-10 items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 text-xs font-semibold text-rose-600 dark:text-rose-300 transition-all hover:bg-rose-500/20 active:scale-95"
          title="Reset Filters"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      )}
    </div>
  );
}
