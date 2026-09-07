import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Mail,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import { toast } from "react-toastify";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Thank you for subscribing to our VIP newsletter!");
    setEmail("");
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 transition-colors">
      {/* Trust Badges Bar */}
      <div className="border-b border-slate-200 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Free Express Shipping
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  On all orders over $50
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  100% Secure Checkout
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Razorpay & 256-bit encryption
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                <RotateCcw className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  30-Day Easy Returns
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Hassle-free money back
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <Headphones className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  24/7 Dedicated Support
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Always here to assist you
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-slate-900 dark:text-white"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-fuchsia-500 text-white font-bold shadow-md shadow-violet-500/20">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
                EZ-Cart<span className="text-violet-500">.</span>
              </span>
            </Link>
            <p className="mt-4 text-xs leading-relaxed text-slate-500 dark:text-slate-400 max-w-sm">
              Your premier destination for next-generation consumer electronics,
              cutting-edge tech gadgets, and hand-picked literary masterworks. Designed
              with passion for discerning shoppers.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="mt-6 max-w-sm">
              <p className="text-xs font-bold text-slate-900 dark:text-white mb-2">
                Subscribe to VIP Offers & Drops
              </p>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/80 py-2.5 pl-10 pr-24 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-violet-500 active:scale-95 shadow-sm shadow-violet-600/30"
                >
                  Join
                </button>
              </div>
            </form>
          </div>

          {/* Catalog Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Shop Categories
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link to="/electronics" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Flagship Electronics
                </Link>
              </li>
              <li>
                <Link to="/books" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Curated Books
                </Link>
              </li>
              <li>
                <Link to="/electronics" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Featured Hardware
                </Link>
              </li>
              <li>
                <Link to="/books" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Classic Literature
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Saved Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Help */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Customer Care
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link to="/cart" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  View Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Fast Checkout
                </Link>
              </li>
              <li>
                <Link to="/admin/products" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Inventory Manager
                </Link>
              </li>
              <li>
                <a href="#support" onClick={(e) => { e.preventDefault(); toast.info("Support line: support@ezcart.io"); }} className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Help Center & FAQs
                </a>
              </li>
              <li>
                <a href="#shipping" onClick={(e) => { e.preventDefault(); toast.info("Orders ship within 24-48 business hours."); }} className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Delivery Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* Security & Badges */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Payment & Trust
            </h4>
            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              We support verified digital payments via Razorpay, UPI, Net Banking, and Major Credit Cards.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/80 px-2.5 py-1 text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                Razorpay
              </span>
              <span className="rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/80 px-2.5 py-1 text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                UPI / QR
              </span>
              <span className="rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/80 px-2.5 py-1 text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                Visa / MC
              </span>
              <span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                COD Available
              </span>
            </div>
          </div>
        </div>

        {/* Copyright & Sub-links */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800/80 pt-8 sm:flex-row text-xs text-slate-500">
          <p>© {new Date().getFullYear()} EZ-Cart Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-700 dark:hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-700 dark:hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-700 dark:hover:text-slate-400 cursor-pointer">Security Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
