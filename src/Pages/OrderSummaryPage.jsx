import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  CheckCircle2,
  Copy,
  Printer,
  ShoppingBag,
  Truck,
  Package,
  Calendar,
  CreditCard,
  MapPin,
  Check,
} from "lucide-react";
import PriceDisplay from "../Components/Design/PriceDisplay";
import { clearCart } from "../Features/Cart/CartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function OrderSummaryPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [copied, setCopied] = useState(false);

  // Fix: safely read string key "lastOrder" from localStorage
  const order = useMemo(() => {
    try {
      const savedOrder = localStorage.getItem("lastOrder");
      return savedOrder ? JSON.parse(savedOrder) : null;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    if (!order) {
      navigate("/", { replace: true });
      return;
    }
    dispatch(clearCart());
  }, [order, dispatch, navigate]);

  if (!order) return null;

  const copyOrderId = () => {
    if (order?.id) {
      navigator.clipboard.writeText(order.id);
      setCopied(true);
      toast.success("Order ID copied to clipboard! 📋");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Calculate estimated delivery date: 3 days ahead
  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 3);
  const formattedDelivery = estimatedDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 min-h-screen">
      {/* Top Celebration Card */}
      <div className="text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-xl shadow-emerald-500/10 mb-4 animate-bounce">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
          Order Placed Successfully!
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-400">
          Thank you for your purchase. We've sent an order confirmation and tracking details to{" "}
          <span className="text-white font-semibold">{order.customer.email}</span>.
        </p>

        {/* Order ID Pill */}
        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-4 py-2 text-xs text-slate-300 backdrop-blur-md">
          <span className="font-semibold text-slate-400">Order Reference:</span>
          <span className="font-mono font-bold text-violet-400">{order.id}</span>
          <button
            onClick={copyOrderId}
            className="ml-1 text-slate-400 hover:text-white transition-colors"
            title="Copy Order ID"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Delivery Tracking Progress Simulation */}
      <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <Truck className="h-4 w-4 text-violet-400" />
            <span>Estimated Delivery By:</span>
            <span className="font-bold text-violet-400">{formattedDelivery}</span>
          </div>
          <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-[11px] font-bold text-emerald-400 self-start sm:self-auto">
            Confirmed & Queued
          </span>
        </div>

        {/* 4-Step Progress Bar */}
        <div className="mt-8 grid grid-cols-4 gap-2 text-center text-xs">
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-white font-bold shadow-md shadow-violet-600/30">
              ✓
            </div>
            <span className="font-semibold text-white text-[11px]">Confirmed</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-bold">
              2
            </div>
            <span className="font-semibold text-slate-400 text-[11px]">Packaging</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-bold">
              3
            </div>
            <span className="font-semibold text-slate-400 text-[11px]">Dispatched</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-bold">
              4
            </div>
            <span className="font-semibold text-slate-400 text-[11px]">Delivered</span>
          </div>
        </div>
      </div>

      {/* Order Details & Summary Breakdown */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Customer & Shipping Summary */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-3">
            Customer & Delivery Details
          </h3>
          <div className="mt-4 space-y-3 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Name:</span>
              <span className="font-semibold text-white">{order.customer.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Email:</span>
              <span className="font-semibold text-white">{order.customer.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Phone:</span>
              <span className="font-semibold text-white">{order.customer.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Shipping Address:</span>
              <span className="font-semibold text-white text-right max-w-[200px]">
                {order.customer.address}
                {order.customer.city ? `, ${order.customer.city}` : ""}
              </span>
            </div>
            <div className="flex justify-between border-t border-slate-800 pt-3">
              <span className="text-slate-400">Payment Gateway:</span>
              <span className="font-semibold text-emerald-400">
                {order.payment?.method || "Verified"}
              </span>
            </div>
            {order.payment?.paymentId && (
              <div className="flex justify-between">
                <span className="text-slate-400">Gateway Transaction ID:</span>
                <span className="font-mono text-slate-300 text-[11px]">
                  {order.payment.paymentId}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Ordered Items List */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-3">
              Purchased Items ({order.cart.length})
            </h3>
            <div className="mt-4 max-h-56 overflow-y-auto space-y-3 pr-1">
              {order.cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.imageLink || "/placeholder.png"}
                      alt={item.name || item.title}
                      className="h-10 w-10 rounded-lg object-cover bg-slate-950 border border-slate-800 shrink-0"
                    />
                    <div>
                      <p className="font-semibold text-white line-clamp-1">
                        {item.name || item.title}
                      </p>
                      <p className="text-[11px] text-slate-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-white">
                    <PriceDisplay price={item.price} quantity={item.quantity} />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-slate-800 pt-4 flex justify-between items-baseline">
            <span className="text-sm font-bold text-white">Total Amount Paid</span>
            <span className="text-2xl font-black text-white">
              <PriceDisplay price={order.total} />
            </span>
          </div>
        </div>
      </div>

      {/* Action CTAs */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-800 px-6 py-3.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-all shadow-md active:scale-95"
        >
          <Printer className="h-4 w-4" />
          Print Receipt
        </button>

        <Link
          to="/"
          className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-600 px-6 py-3.5 text-xs font-bold text-white shadow-xl shadow-violet-600/30 hover:opacity-95 transition-all active:scale-95"
        >
          <ShoppingBag className="h-4 w-4" />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
