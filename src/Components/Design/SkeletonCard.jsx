import React from "react";

export default function SkeletonCard() {
  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-4 backdrop-blur-sm shadow-sm dark:shadow-lg">
      {/* Image Skeleton */}
      <div className="aspect-square w-full rounded-xl bg-slate-200 dark:bg-slate-800/60 animate-pulse" />

      {/* Details Skeleton */}
      <div className="mt-4 flex flex-col gap-2.5">
        <div className="h-3.5 w-20 rounded bg-violet-500/20 animate-pulse" />
        <div className="h-4.5 w-3/4 rounded bg-slate-200 dark:bg-slate-700/60 animate-pulse" />
        
        {/* Rating & Stock */}
        <div className="flex items-center justify-between pt-2">
          <div className="h-3 w-16 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
          <div className="h-3 w-14 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
        </div>

        {/* Price Skeleton */}
        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-3 mt-1">
          <div className="h-5 w-20 rounded bg-slate-300 dark:bg-slate-700/70 animate-pulse" />
          <div className="h-3.5 w-16 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
        </div>

        {/* Buttons Skeleton */}
        <div className="mt-2 grid grid-cols-2 gap-2">
          <div className="h-9 rounded-xl bg-slate-200 dark:bg-slate-800/80 animate-pulse" />
          <div className="h-9 rounded-xl bg-violet-500/20 dark:bg-violet-600/30 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
