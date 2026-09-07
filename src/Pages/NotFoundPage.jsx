import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Compass, Home, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="relative mb-6">
        <span className="text-8xl sm:text-9xl font-black tracking-widest text-slate-800/80 select-none">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600/20 text-violet-400 border border-violet-500/30 backdrop-blur-md shadow-2xl">
            <Compass className="h-8 w-8 animate-spin" style={{ animationDuration: "12s" }} />
          </div>
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
        Lost in Cyberspace?
      </h1>
      <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-sm">
        The page or product you're looking for doesn't exist, was moved, or had its URL altered.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-all active:scale-95"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </button>

        <Link
          to="/"
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-violet-600/30 hover:opacity-95 transition-all active:scale-95"
        >
          <Home className="h-4 w-4" />
          Return Home
        </Link>
      </div>
    </div>
  );
}
