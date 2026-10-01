import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Check,
  CheckCircle2,
  Copy,
  Printer,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import PriceDisplay from "../Components/Design/PriceDisplay";
import { clearCart } from "../Features/Cart/CartSlice";

export default function OrderSummaryPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [copied, setCopied] = useState(false);

  // --------------------------------------------------
  // Get the last order from localStorage
  // --------------------------------------------------
  const order = useMemo(() => {
    try {
      const savedOrder = localStorage.getItem("lastOrder");

      if (!savedOrder) {
        return null;
      }

      return JSON.parse(savedOrder);
    } catch (error) {
      console.error("Failed to load order:", error);
      return null;
    }
  }, []);

  // --------------------------------------------------
  // Redirect if there is no order
  // --------------------------------------------------
  useEffect(() => {
    if (!order) {
      navigate("/", { replace: true });
      return;
    }

    // Clear the Redux cart after the order has been created.
    dispatch(clearCart());
  }, [order, dispatch, navigate]);

  // --------------------------------------------------
  // Calculate total from the actual purchased items
  // --------------------------------------------------
  const calculatedTotal = useMemo(() => {
    if (!Array.isArray(order?.cart)) {
      return 0;
    }

    return order.cart.reduce((total, item) => {
      const price = Number(item?.price) || 0;
      const quantity = Number(item?.quantity) || 0;

      return total + price * quantity;
    }, 0);
  }, [order]);

  // --------------------------------------------------
  // Copy Order ID
  // --------------------------------------------------
  const copyOrderId = async () => {
    if (!order?.id) {
      return;
    }

    try {
      await navigator.clipboard.writeText(order.id);

      setCopied(true);
      toast.success("Order ID copied to clipboard! 📋");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy Order ID:", error);
      toast.error("Unable to copy Order ID.");
    }
  };

  // --------------------------------------------------
  // Print receipt
  // --------------------------------------------------
  const handlePrint = () => {
    window.print();
  };

  // --------------------------------------------------
  // Estimated delivery date
  // --------------------------------------------------
  const formattedDelivery = useMemo(() => {
    const estimatedDate = new Date();

    estimatedDate.setDate(estimatedDate.getDate() + 3);

    return estimatedDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  }, []);

  // --------------------------------------------------
  // Prevent rendering before redirect
  // --------------------------------------------------
  if (!order) {
    return null;
  }

  const customer = order.customer || {};
  const cart = Array.isArray(order.cart) ? order.cart : [];

  return (
    <div className="min-h-screen mx-auto max-w-4xl px-4 py-12 sm:px-6">
      {/* ==================================================
          SUCCESS HEADER
      ================================================== */}
      <div className="text-center">
        {/* Success Icon */}
        <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 shadow-xl shadow-emerald-500/10 animate-bounce">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-black tracking-tight text-dark-200 sm:text-4xl">
          Order Placed Successfully!
        </h1>

        {/* Confirmation Message */}
        <p className="mt-2 text-xs text-slate-400 sm:text-sm">
          Thank you for your purchase. We've sent an order confirmation and
          tracking details to{" "}
          <span className="font-semibold text-white">
            {customer.email || "your email"}
          </span>
          .
        </p>

        {/* ==================================================
            ORDER REFERENCE
        ================================================== */}
        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-4 py-2 text-xs text-slate-300 backdrop-blur-md">
          <span className="font-semibold text-slate-400">Order Reference:</span>

          <span className="font-mono font-bold text-violet-400">
            {order.id || "N/A"}
          </span>

          <button
            type="button"
            onClick={copyOrderId}
            className="ml-1 text-slate-400 transition-colors hover:text-white"
            title="Copy Order ID"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* ==================================================
          DELIVERY STATUS
      ================================================== */}
      <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        {/* Delivery Header */}
        <div className="flex flex-col gap-2 border-b border-slate-800 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <Truck className="h-4 w-4 text-violet-400" />

            <span>Estimated Delivery By:</span>

            <span className="font-bold text-violet-400">
              {formattedDelivery}
            </span>
          </div>

          <span className="self-start rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-[11px] font-bold text-emerald-400 sm:self-auto">
            Confirmed & Queued
          </span>
        </div>

        {/* ==================================================
            ORDER PROGRESS
        ================================================== */}
        <div className="mt-8 grid grid-cols-4 gap-2 text-center text-xs">
          {/* Confirmed */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 font-bold text-white shadow-md shadow-violet-600/30">
              <Check className="h-4 w-4" />
            </div>

            <span className="text-[11px] font-semibold text-white">
              Confirmed
            </span>
          </div>

          {/* Packaging */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800 font-bold text-slate-300">
              2
            </div>

            <span className="text-[11px] font-semibold text-slate-400">
              Packaging
            </span>
          </div>

          {/* Dispatched */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800 font-bold text-slate-300">
              3
            </div>

            <span className="text-[11px] font-semibold text-slate-400">
              Dispatched
            </span>
          </div>

          {/* Delivered */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800 font-bold text-slate-300">
              4
            </div>

            <span className="text-[11px] font-semibold text-slate-400">
              Delivered
            </span>
          </div>
        </div>
      </div>

      {/* ==================================================
          ORDER INFORMATION
      ================================================== */}
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* ==================================================
            CUSTOMER DETAILS
        ================================================== */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-xl">
          <h3 className="border-b border-slate-800 pb-3 text-sm font-bold uppercase tracking-wider text-slate-400">
            Customer & Delivery Details
          </h3>

          <div className="mt-4 space-y-3 text-xs">
            {/* Name */}
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Name:</span>

              <span className="text-right font-semibold text-white">
                {customer.name || "N/A"}
              </span>
            </div>

            {/* Email */}
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Email:</span>

              <span className="text-right font-semibold text-white">
                {customer.email || "N/A"}
              </span>
            </div>

            {/* Phone */}
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Phone:</span>

              <span className="text-right font-semibold text-white">
                {customer.phone || "N/A"}
              </span>
            </div>

            {/* Address */}
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Shipping Address:</span>

              <span className="max-w-[200px] text-right font-semibold text-white">
                {customer.address || "N/A"}
                {customer.city ? `, ${customer.city}` : ""}
              </span>
            </div>

            {/* Payment */}
            <div className="flex justify-between gap-4 border-t border-slate-800 pt-3">
              <span className="text-slate-400">Payment Gateway:</span>

              <span className="text-right font-semibold text-emerald-400">
                {order.payment?.method || "Verified"}
              </span>
            </div>

            {/* Transaction ID */}
            {order.payment?.paymentId && (
              <div className="flex justify-between gap-4">
                <span className="text-slate-400">Gateway Transaction ID:</span>

                <span className="max-w-[200px] break-all text-right font-mono text-[11px] text-slate-300">
                  {order.payment.paymentId}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ==================================================
            PURCHASED ITEMS
        ================================================== */}
        <div className="flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-xl">
          <div>
            <h3 className="border-b border-slate-800 pb-3 text-sm font-bold uppercase tracking-wider text-slate-400">
              Purchased Items ({cart.length})
            </h3>

            {/* Items */}
            <div className="mt-4 max-h-56 space-y-3 overflow-y-auto pr-1">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 text-xs"
                  >
                    {/* Product */}
                    <div className="flex min-w-0 items-center gap-3">
                      <img
                        src={item.imageLink || "/placeholder.png"}
                        alt={item.name || item.title || "Product"}
                        className="h-10 w-10 shrink-0 rounded-lg border border-slate-800 bg-slate-950 object-cover"
                      />

                      <div className="min-w-0">
                        <p className="line-clamp-1 font-semibold text-white">
                          {item.name || item.title || "Product"}
                        </p>

                        <p className="text-[11px] text-slate-400">
                          Qty: {Number(item.quantity) || 0}
                        </p>
                      </div>
                    </div>

                    {/* Item Total */}
                    <span className="shrink-0 font-bold text-white">
                      <PriceDisplay
                        price={Number(item.price) || 0}
                        quantity={Number(item.quantity) || 0}
                      />
                    </span>
                  </div>
                ))
              ) : (
                <p className="py-6 text-center text-xs text-slate-500">
                  No purchased items found.
                </p>
              )}
            </div>
          </div>

          {/* ==================================================
              GRAND TOTAL
          ================================================== */}
          <div className="mt-6 flex items-baseline justify-between border-t border-slate-800 pt-4">
            <span className="text-sm font-bold text-white">
              Total Amount Paid
            </span>

            <span className="text-2xl font-black text-white">
              <PriceDisplay price={calculatedTotal} />
            </span>
          </div>
        </div>
      </div>

      {/* ==================================================
          ACTION BUTTONS
      ================================================== */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        {/* Print */}
        <button
          type="button"
          onClick={handlePrint}
          className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-800 px-6 py-3.5 text-xs font-semibold text-slate-200 shadow-md transition-all hover:bg-slate-700 hover:text-white active:scale-95"
        >
          <Printer className="h-4 w-4" />
          Print Receipt
        </button>

        {/* Continue Shopping */}
        <Link
          to="/"
          className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-600 px-6 py-3.5 text-xs font-bold text-white shadow-xl shadow-violet-600/30 transition-all hover:opacity-95 active:scale-95"
        >
          <ShoppingBag className="h-4 w-4" />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
