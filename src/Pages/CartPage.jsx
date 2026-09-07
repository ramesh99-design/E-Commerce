import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  ArrowLeft,
  Tag,
  CheckCircle2,
} from "lucide-react";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../Features/Cart/CartSlice";
import PriceDisplay from "../Components/Design/PriceDisplay";
import { toast } from "react-toastify";

export default function CartPage() {
  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const freeShippingThreshold = 50;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - totalPrice);
  const progressPercent = Math.min(100, (totalPrice / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === "EZCART20") {
      setDiscount(totalPrice * 0.2);
      setCouponApplied(true);
      toast.success("Promo code 'EZCART20' applied: 20% Discount! 🎉");
    } else {
      toast.error("Invalid coupon code. Try 'EZCART20'");
    }
  };

  const handleRemove = (id, name) => {
    dispatch(removeFromCart(id));
    toast.info(`Removed "${name}" from cart`, { icon: "🗑️" });
  };

  const finalTotal = Math.max(0, totalPrice - discount);

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-16">
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-800 bg-slate-900/40 p-12 text-center backdrop-blur-sm max-w-md w-full">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-600/10 text-violet-400 border border-violet-500/20 mb-4">
            <ShoppingBag className="h-10 w-10" />
          </div>
          <h2 className="text-2xl font-bold text-white">Your Cart is Empty</h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            Looks like you haven't added anything to your cart yet. Explore our top gear and books to get started!
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full justify-center">
            <Link
              to="/electronics"
              className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-violet-600/20 hover:bg-violet-500 transition-all"
            >
              Shop Electronics
            </Link>
            <Link
              to="/books"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
            >
              Browse Books
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Shopping Cart
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            You have {totalQuantity} {totalQuantity === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              dispatch(clearCart());
              toast.info("Cart cleared");
            }}
            className="flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-2 text-xs font-semibold text-rose-600 dark:text-rose-300 hover:bg-rose-500/20 transition-all"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear Cart
          </button>
          <Link
            to="/"
            className="flex items-center gap-1.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* Free Shipping Progress Bar */}
      <div className="mb-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 backdrop-blur-sm shadow-sm dark:shadow-md">
        <div className="flex items-center justify-between text-xs font-semibold mb-2">
          <span className="flex items-center gap-1.5 text-slate-900 dark:text-white">
            <Truck className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            {amountToFreeShipping > 0
              ? `Add $${amountToFreeShipping.toFixed(2)} more to unlock Free Shipping!`
              : "🎉 Congratulations! You have unlocked Free Express Shipping!"}
          </span>
          <span className="text-violet-600 dark:text-violet-400">{Math.round(progressPercent)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Grid: Items List + Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-4 backdrop-blur-sm shadow-sm dark:shadow-lg transition-all hover:border-slate-300 dark:hover:border-slate-700"
            >
              {/* Product Thumbnail & Details */}
              <div className="flex items-center gap-4 flex-1">
                <img
                  src={item.imageLink || "/placeholder.png"}
                  alt={item.name || item.title}
                  className="h-20 w-20 rounded-xl object-cover bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shrink-0"
                />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                    {item.category || "Item"}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white line-clamp-1">
                    {item.name || item.title}
                  </h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Price: <PriceDisplay price={item.price} />
                  </div>
                </div>
              </div>

              {/* Quantity Stepper & Subtotal */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-slate-100 dark:border-slate-800 pt-3 sm:pt-0">
                {/* Stepper */}
                <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950">
                  <button
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    className="flex h-8 w-8 items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-l-xl transition-colors"
                  >
                    -
                  </button>
                  <span className="flex h-8 w-8 items-center justify-center text-xs font-bold text-slate-900 dark:text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    className="flex h-8 w-8 items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-r-xl transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-[70px]">
                  <p className="text-[10px] uppercase text-slate-400 dark:text-slate-500 font-semibold">Total</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    <PriceDisplay price={item.price} quantity={item.quantity} />
                  </p>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleRemove(item.id, item.name || item.title)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-rose-500/10 hover:text-rose-500 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sticky Card */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl dark:shadow-2xl">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4">
              Order Summary
            </h2>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="mt-5">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                Promo Code
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Try 'EZCART20'"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 outline-none focus:border-violet-500"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-xl bg-slate-800 px-3 py-2 text-xs font-bold text-slate-200 hover:bg-slate-700 transition-colors"
                >
                  Apply
                </button>
              </div>
            </form>

            {/* Price Calculations */}
            <div className="mt-6 space-y-3 text-xs border-t border-slate-800/80 pt-5">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal ({totalQuantity} items)</span>
                <span className="text-white font-semibold">
                  <PriceDisplay price={totalPrice} />
                </span>
              </div>

              {couponApplied && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Promo Discount (20%)</span>
                  <span>-<PriceDisplay price={discount} /></span>
                </div>
              )}

              <div className="flex justify-between text-slate-400">
                <span>Shipping</span>
                <span className="text-emerald-400 font-semibold">
                  {amountToFreeShipping === 0 ? "FREE" : "$9.99"}
                </span>
              </div>

              <div className="flex justify-between text-slate-400">
                <span>Estimated Taxes</span>
                <span className="text-white font-semibold">Included</span>
              </div>

              <div className="border-t border-slate-800 pt-4 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">Estimated Total</span>
                <span className="text-xl font-black text-white">
                  <PriceDisplay price={finalTotal} />
                </span>
              </div>
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              onClick={() => navigate("/checkout")}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-600 py-3.5 text-xs sm:text-sm font-bold text-white shadow-xl shadow-violet-600/30 transition-all hover:opacity-95 active:scale-95"
            >
              Proceed to Checkout
              <ArrowRight className="h-4 w-4" />
            </button>

            {/* Security Guarantee */}
            <div className="mt-5 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>256-bit Secure Razorpay Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
