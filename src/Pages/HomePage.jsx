import React from "react";
import { Link } from "react-router-dom";
import {
  Laptop,
  BookOpen,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  Clock,
  CheckCircle2,
  Headphones,
  CreditCard,
  Award,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800/80 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-16 sm:py-24 transition-colors">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-tr from-violet-600/10 via-fuchsia-600/10 to-transparent blur-3xl pointer-events-none -z-0" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Headline Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3.5 py-1 text-xs font-bold text-violet-600 dark:text-violet-300 backdrop-blur-md mb-6">
                <Sparkles className="h-3.5 w-3.5 text-violet-500 dark:text-violet-400" />
                <span>Next-Generation Online Store</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Elevate Your Lifestyle with{" "}
                <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Premium Gear
                </span>{" "}
                & Iconic Books.
              </h1>

              <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400 max-w-xl">
                Discover flagship electronics engineered for top performance, alongside
                hand-picked literary classics. Fast global shipping, verified authentic
                quality, and frictionless Razorpay checkout.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/electronics"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-600 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-xl shadow-violet-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Laptop className="h-4 w-4" />
                  Shop Electronics
                </Link>

                <Link
                  to="/books"
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 transition-all hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-[0.98] shadow-sm"
                >
                  <BookOpen className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                  Explore Library
                </Link>
              </div>

              {/* Stats Highlights */}
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-slate-200 dark:border-slate-800/80 pt-6">
                <div>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">50k+</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Happy Shoppers</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">4.9 ★</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Store Rating</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">24h</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Fast Dispatch</p>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Banner */}
            <div className="lg:col-span-5">
              <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-2 shadow-2xl backdrop-blur-xl">
                <img
                  src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg"
                  alt="Flagship Electronics and Lifestyle"
                  className="h-full w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 rounded-3xl" />

                {/* Floating Overlay Badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="rounded-full bg-violet-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-300 border border-violet-500/30 backdrop-blur-md">
                    Featured Collection
                  </span>
                  <h3 className="mt-2 text-lg sm:text-xl font-bold text-white leading-snug">
                    Next-Gen Flagship Hardware & Literary Gems
                  </h3>
                  <Link
                    to="/electronics"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-violet-300 hover:text-white transition-colors"
                  >
                    View Categories <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Department Portals */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
            Explore Our Departments
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Choose Your Destination
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Select a catalog below to explore all items, filter by specifications, and place your order.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Electronics Category Portal Card */}
          <Link
            to="/electronics"
            className="group relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-8 sm:p-10 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/10"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-600 dark:text-violet-400 border border-violet-500/30">
                <Laptop className="h-7 w-7" />
              </div>
              <span className="rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 px-3.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                Laptops, Cameras, Gear
              </span>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                Electronics Department
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Browse our curated selection of flagship laptops, smartphones, high-resolution cameras,
                and pro gaming controllers with verified brand warranties.
              </p>
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-6">
              <span className="text-xs font-bold text-violet-600 dark:text-violet-400 group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
                Browse All Electronics <ArrowRight className="h-4 w-4" />
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
                Instant Delivery
              </span>
            </div>
          </Link>

          {/* Books Category Portal Card */}
          <Link
            to="/books"
            className="group relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-8 sm:p-10 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-500/50 hover:shadow-2xl hover:shadow-fuchsia-500/10"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400 border border-fuchsia-500/30">
                <BookOpen className="h-7 w-7" />
              </div>
              <span className="rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 px-3.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                Hardcover & Classics
              </span>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-300 transition-colors">
                Books & Literature Library
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Immerse yourself in celebrated literary masterworks penned by Harper Lee, George Orwell,
                and timeless authors. Premium hardcover print quality and archival paper.
              </p>
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-6">
              <span className="text-xs font-bold text-fuchsia-600 dark:text-fuchsia-400 group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
                Browse Full Library <ArrowRight className="h-4 w-4" />
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
                Archival Hardcovers
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Why Shop With Us Pillars */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 p-8 sm:p-12 backdrop-blur-xl shadow-xl">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
              The EZ-Cart Standard
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Why Discerning Shoppers Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 mb-4">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Free Express Shipping</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Enjoy fast dispatch and complimentary express delivery on orders over $50.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">100% Authentic Guarantee</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                All devices and volumes are sourced directly from verified manufacturers and publishers.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-4">
                <RotateCcw className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">30-Day Money Back</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Hassle-free return policy with instant refunds if you are not fully delighted.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Secure Razorpay Gateway</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                End-to-end 256-bit encrypted checkout supporting Cards, UPI, Net Banking, and COD.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Limited Deal Promo Banner */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-violet-500/30 bg-gradient-to-r from-violet-900 via-slate-900 to-indigo-950 p-8 sm:p-12 shadow-2xl text-white">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300">
                <Clock className="h-3.5 w-3.5" />
                Limited Time Promo
              </span>
              <h3 className="mt-3 text-2xl sm:text-4xl font-extrabold text-white">
                Get 20% Off Your Entire Cart
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Use discount code <span className="font-mono font-bold text-amber-400">EZCART20</span> at
                checkout. Applies automatically to all electronics, accessories, and hardcover editions.
              </p>
            </div>

            <Link
              to="/electronics"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-950 shadow-xl transition-all hover:bg-slate-100 active:scale-95 shrink-0"
            >
              Shop With Discount
              <ArrowRight className="h-4 w-4 text-slate-950" />
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Social Proof */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
            Customer Stories
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Loved By Shoppers Everywhere
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-1 text-amber-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              "The laptop arrived in less than 48 hours, immaculate packaging, and runs flawlessly.
              The checkout with Razorpay was instantaneous!"
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
              <span className="text-xs font-bold text-slate-900 dark:text-white">Alex M.</span>
              <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Verified Buyer
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-1 text-amber-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              "Found classic hardcovers that were out of stock everywhere else. The paper quality
              and binding are museum grade. Will buy again!"
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
              <span className="text-xs font-bold text-slate-900 dark:text-white">Sophia R.</span>
              <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Verified Buyer
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-1 text-amber-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              "Super clean UI! Switching between dark and light themes is buttery smooth, and
              the checkout flow is effortless."
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
              <span className="text-xs font-bold text-slate-900 dark:text-white">David K.</span>
              <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Verified Buyer
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
