import React from "react";

export default function HomeSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 min-h-screen">
      {/* Title Placeholder */}
      <div className="mx-auto mb-8 h-10 w-72 sm:w-96 rounded-xl bg-slate-800/60 animate-pulse border border-slate-800/80" />

      {/* Hero / Main Section Grid */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Banner Skeleton */}
        <div className="relative aspect-[16/9] w-full lg:w-2/3 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm shadow-xl">
          <div className="h-full w-full rounded-xl bg-slate-800/60 animate-pulse flex flex-col justify-end p-6 gap-3">
            <div className="h-6 w-1/3 rounded-lg bg-slate-700/50 animate-pulse" />
            <div className="h-4 w-2/3 rounded-lg bg-slate-700/30 animate-pulse" />
          </div>
        </div>

        {/* Categories Sidebar Skeleton */}
        <div className="w-full lg:w-1/3 min-w-[260px] rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm shadow-xl flex flex-col gap-4">
          {/* Category Header */}
          <div className="h-8 w-44 rounded-lg bg-slate-800/80 animate-pulse mb-2 border-b border-slate-800 pb-2" />

          {/* Category Links Placeholder Items */}
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-xl border border-slate-800/50 bg-slate-950/40 p-3"
              >
                <div className="h-5 w-28 rounded-md bg-slate-800/80 animate-pulse" />
                <div className="h-4 w-4 rounded-full bg-slate-800/60 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
