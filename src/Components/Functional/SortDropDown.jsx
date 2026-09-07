import React from "react";
import { ArrowUpDown } from "lucide-react";

export default function SortDropDown({ sortOption, setSortOption }) {
  return (
    <div className="relative inline-flex items-center">
      <div className="pointer-events-none absolute left-3 flex items-center text-slate-400">
        <ArrowUpDown className="h-3.5 w-3.5" />
      </div>
      <select
        className="h-10 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/90 pl-9 pr-8 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-sm outline-none transition-all hover:border-slate-400 dark:hover:border-slate-700 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 cursor-pointer appearance-none"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        aria-label="Sort products"
      >
        <option value="" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-300">Sort By: Default</option>
        <option value="priceLowHigh" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-300">Price: Low to High</option>
        <option value="priceHighLow" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-300">Price: High to Low</option>
        <option value="nameAToZ" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-300">Name: A → Z</option>
        <option value="nameZToA" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-300">Name: Z → A</option>
      </select>
    </div>
  );
}
