import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
} from "lucide-react";
import PriceDisplay from "../Components/Design/PriceDisplay";

export default function CheckoutPage() {
  const { items, totalPrice } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("checkoutForm"));
    return {
      name: saved?.name || user?.name || "",
      email: saved?.email || user?.email || "",
      phone: saved?.phone || "",
      address: saved?.address || "",
      city: saved?.city || "",
      postalCode: saved?.postalCode || "",
    };
  });

  useEffect(() => {
    localStorage.setItem("checkoutForm", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const proceedToPayment = (e) => {
    e.preventDefault();
    navigate("/payment", { state: { customer: formData } });
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-16">
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-800 bg-slate-900/40 p-12 text-center backdrop-blur-sm max-w-md w-full">
          <h2 className="text-2xl font-bold text-white">Your Cart is Empty</h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            Please add items to your cart before proceeding to checkout.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-violet-600/20 hover:bg-violet-500 transition-all"
          >
            Return to Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 min-h-screen">
      {/* Checkout Step Progression Bar */}
      <div className="mb-10 mx-auto max-w-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white shadow-md shadow-violet-600/30">
              ✓
            </span>
            <span className="text-xs font-semibold text-slate-300">Cart</span>
          </div>
          <div className="h-0.5 flex-1 bg-violet-600 mx-3" />

          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white shadow-md shadow-violet-600/30 ring-4 ring-violet-600/20">
              2
            </span>
            <span className="text-xs font-bold text-white">Shipping</span>
          </div>
          <div className="h-0.5 flex-1 bg-slate-800 mx-3" />

          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-slate-400">
              3
            </span>
            <span className="text-xs font-semibold text-slate-500">Payment</span>
          </div>
          <div className="h-0.5 flex-1 bg-slate-800 mx-3" />

          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-slate-400">
              4
            </span>
            <span className="text-xs font-semibold text-slate-500">Confirm</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Shipping Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Shipping & Delivery Address
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Where should we dispatch your order?
                </p>
              </div>
              <Lock className="h-4 w-4 text-emerald-400" />
            </div>

            <form onSubmit={proceedToPayment} className="mt-6 space-y-4">
              {/* Name */}
              <div>
                <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-2.5 pl-10 pr-4 text-xs font-medium text-white placeholder-slate-500 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-2.5 pl-10 pr-4 text-xs font-medium text-white placeholder-slate-500 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-2.5 pl-10 pr-4 text-xs font-medium text-white placeholder-slate-500 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block mb-1">
                  Street Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                  <textarea
                    name="address"
                    required
                    rows="2"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Apartment, suite, street address"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-2.5 pl-10 pr-4 text-xs font-medium text-white placeholder-slate-500 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all resize-none"
                  />
                </div>
              </div>

              {/* City & Postal Code */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block mb-1">
                    City / Town
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="New York"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-2.5 px-3.5 text-xs font-medium text-white placeholder-slate-500 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block mb-1">
                    Postal / Zip Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="10001"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-2.5 px-3.5 text-xs font-medium text-white placeholder-slate-500 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                  />
                </div>
              </div>

              {/* Navigation CTAs */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-800">
                <Link
                  to="/cart"
                  className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Cart
                </Link>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-violet-600/30 hover:opacity-95 transition-all active:scale-95"
                >
                  Continue to Payment
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sticky Order Review */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-2xl">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-4">
              Items in Order ({items.length})
            </h3>

            {/* Items list */}
            <div className="mt-4 max-h-72 overflow-y-auto space-y-3 pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <img
                      src={item.imageLink || "/placeholder.png"}
                      alt={item.name || item.title}
                      className="h-12 w-12 rounded-lg object-cover bg-slate-950 border border-slate-800 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-white truncate">
                        {item.name || item.title}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-200">
                    <PriceDisplay price={item.price} quantity={item.quantity} />
                  </span>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div className="mt-6 border-t border-slate-800/80 pt-4 space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-white font-semibold">
                  <PriceDisplay price={totalPrice} />
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Express Shipping</span>
                <span className="text-emerald-400 font-semibold">FREE</span>
              </div>
              <div className="border-t border-slate-800 pt-3 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">Total to Pay</span>
                <span className="text-xl font-black text-white">
                  <PriceDisplay price={totalPrice} />
                </span>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-800/80 bg-slate-950/60 p-3.5 flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
              <p className="text-[11px] text-slate-400 leading-snug">
                Your payment and personal details are encrypted and processed securely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
