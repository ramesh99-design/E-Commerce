import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, Navigate, Link } from "react-router-dom";
import {
  CreditCard,
  Banknote,
  ShieldCheck,
  Lock,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import PriceDisplay from "../Components/Design/PriceDisplay";

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-checkout-script")) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-checkout-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}
const RAZOR_TEST_KEY = "rzp_test_TDISihyRPXCh8H";

export default function PaymentPages() {
  const { items, totalPrice } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const location = useLocation();

  const customer = location.state?.customer;

  const [method, setMethod] = useState("online");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  if (!customer) {
    return <Navigate to="/checkout" replace />;
  }

  const finalizeOrder = (paymentDetails) => {
    const order = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      customer,
      cart: items,
      total: totalPrice,
      payment: paymentDetails,
    };

    localStorage.setItem("lastOrder", JSON.stringify(order));
    localStorage.removeItem("checkoutForm");
    navigate("/order-success");
  };

  const handleOnlinePayment = async () => {
    setError("");
    setProcessing(true);

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setError("Could not load Razorpay gateway. Check your connection or try Cash on Delivery.");
      setProcessing(false);
      return;
    }

    const options = {
      key: RAZOR_TEST_KEY,
      amount: Math.round(totalPrice * 100),
      currency: "INR",
      name: "EZ-Cart Store",
      description: `Payment for ${items.length} item(s)`,
      prefill: {
        name: customer.name,
        email: customer.email,
        contact: customer.phone,
      },
      theme: { color: "#7c3aed" },
      handler: (response) => {
        finalizeOrder({
          method: "Online Payment (Razorpay)",
          status: "Paid",
          paymentId: response.razorpay_payment_id,
        });
      },
      modal: {
        ondismiss: () => {
          setProcessing(false);
          setError("Payment was cancelled. You can retry or choose Cash on Delivery.");
        },
      },
    };

    try {
      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", (response) => {
        setProcessing(false);
        setError(`Payment failed: ${response.error.description}`);
      });
      razorpay.open();
    } catch (err) {
      setProcessing(false);
      setError("Failed to open Razorpay modal. Please try again.");
    }
  };

  const handleCashOnDelivery = () => {
    finalizeOrder({
      method: "Cash On Delivery",
      status: "Pending (Pay on Arrival)",
      paymentId: null,
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 min-h-screen">
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
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white shadow-md shadow-violet-600/30">
              ✓
            </span>
            <span className="text-xs font-semibold text-slate-300">Shipping</span>
          </div>
          <div className="h-0.5 flex-1 bg-violet-600 mx-3" />

          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white shadow-md shadow-violet-600/30 ring-4 ring-violet-600/20">
              3
            </span>
            <span className="text-xs font-bold text-white">Payment</span>
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

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Payment Options */}
        <div className="md:col-span-7">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            <h2 className="text-xl font-bold text-white">Choose Payment Method</h2>
            <p className="text-xs text-slate-400 mt-1">
              Select your preferred gateway to complete your transaction
            </p>

            {/* Selector Cards */}
            <div className="mt-6 space-y-3">
              {/* Option 1: Razorpay Online */}
              <div
                onClick={() => setMethod("online")}
                className={`flex items-center justify-between rounded-2xl border p-4 cursor-pointer transition-all ${
                  method === "online"
                    ? "border-violet-500 bg-violet-600/10 shadow-lg shadow-violet-600/10"
                    : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      Online Payment (Cards / UPI / NetBanking)
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Fast and encrypted via Razorpay
                    </p>
                  </div>
                </div>

                <div
                  className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                    method === "online"
                      ? "border-violet-500 bg-violet-600"
                      : "border-slate-700 bg-slate-900"
                  }`}
                >
                  {method === "online" && (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                </div>
              </div>

              {/* Option 2: Cash on Delivery */}
              <div
                onClick={() => setMethod("COD")}
                className={`flex items-center justify-between rounded-2xl border p-4 cursor-pointer transition-all ${
                  method === "COD"
                    ? "border-violet-500 bg-violet-600/10 shadow-lg shadow-violet-600/10"
                    : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
                    <Banknote className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      Cash On Delivery (COD)
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Pay in cash or UPI when package arrives
                    </p>
                  </div>
                </div>

                <div
                  className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                    method === "COD"
                      ? "border-violet-500 bg-violet-600"
                      : "border-slate-700 bg-slate-900"
                  }`}
                >
                  {method === "COD" && (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 pt-5 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => navigate("/checkout")}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Details
              </button>

              {method === "online" ? (
                <button
                  onClick={handleOnlinePayment}
                  disabled={processing}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-violet-600/30 hover:opacity-95 transition-all active:scale-95 disabled:opacity-50"
                >
                  {processing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Opening Gateway...
                    </>
                  ) : (
                    <>Pay with Razorpay</>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleCashOnDelivery}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-600/30 hover:opacity-95 transition-all active:scale-95"
                >
                  Confirm Order (COD)
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary Brief */}
        <div className="md:col-span-5">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-2xl">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-4">
              Order Total
            </h3>

            <div className="mt-4 space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Shipping Recipient</span>
                <span className="text-white font-semibold">{customer.name}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Address</span>
                <span className="text-white font-semibold truncate max-w-[160px]">
                  {customer.address}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Items Count</span>
                <span className="text-white font-semibold">{items.length} product(s)</span>
              </div>
              <div className="border-t border-slate-800 pt-3 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">Amount Due</span>
                <span className="text-2xl font-black text-white">
                  <PriceDisplay price={totalPrice} />
                </span>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-800/80 bg-slate-950/60 p-3.5 flex items-center gap-3">
              <Lock className="h-5 w-5 text-violet-400 shrink-0" />
              <p className="text-[11px] text-slate-400 leading-snug">
                Official Razorpay Sandbox test environment. You will not be charged real money in test mode.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
