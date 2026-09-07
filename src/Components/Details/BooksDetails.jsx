import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ShoppingBag,
  Zap,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
  CheckCircle2,
  AlertCircle,
  Wrench,
  BookOpen,
} from "lucide-react";
import { addToCart } from "../../Features/Cart/CartSlice";
import { addToWishlist, removeFromWishlist } from "../../Features/Cart/WishListSlice";
import PriceDisplay from "../Design/PriceDisplay";
import { toast } from "react-toastify";

export default function BooksDetails({ product }) {
  const { id, name, title, author, price, stock, imageLink, description } = product;
  const bookTitle = name || title;

  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishListed = wishlistItems.some((p) => p.id === id);

  const cartItems = useSelector((state) => state.cart.items);
  const inCart = cartItems.find((p) => p.id === id);
  const currentStock = (stock !== undefined ? stock : 12);

  const isOutOfStock = currentStock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    toast.success(`Added ${quantity}x "${bookTitle}" to cart! 📚`);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    dispatch(addToCart(product));
    navigate("/checkout");
  };

  const handleWishlist = () => {
    if (isWishListed) {
      dispatch(removeFromWishlist(id));
      toast.info("Removed from wishlist", { icon: "💔" });
    } else {
      dispatch(addToWishlist(product));
      toast.success("Added to wishlist! ❤️", { icon: "❤️" });
    }
  };

  const originalPrice = (price * 1.25).toFixed(2);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      {/* Book Cover Image Stage */}
      <div className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 p-6 flex items-center justify-center shadow-md dark:shadow-2xl">
        <div className="absolute top-4 left-4 z-10">
          <span className="rounded-full border border-fuchsia-500/30 bg-fuchsia-500/15 dark:bg-fuchsia-500/20 px-3 py-1 text-xs font-bold text-fuchsia-700 dark:text-fuchsia-300 backdrop-blur-md uppercase tracking-wider">
            Hardcover Edition
          </span>
        </div>

        <button
          onClick={handleWishlist}
          className={`absolute top-4 right-4 z-10 rounded-full p-3 backdrop-blur-md transition-all active:scale-90 ${
            isWishListed
              ? "bg-rose-500 text-white shadow-lg shadow-rose-500/40"
              : "border border-slate-200 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800"
          }`}
          aria-label="Toggle Wishlist"
        >
          <Heart className={`h-5 w-5 ${isWishListed ? "fill-current" : ""}`} />
        </button>

        <img
          src={imageLink || "/placeholder.png"}
          alt={bookTitle}
          className="max-h-[90%] max-w-[85%] object-contain rounded-xl shadow-2xl transition-transform duration-700 hover:scale-105"
        />
      </div>

      {/* Book Details Section */}
      <div className="flex flex-col justify-between">
        <div>
          {/* Rating & Stock Pill */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
              <Star className="h-3.5 w-3.5 fill-amber-500 dark:fill-amber-400" />
              <span>4.95 (96 reviews)</span>
            </div>

            {currentStock > 0 ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                In Stock ({currentStock} copies)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-500 dark:text-rose-400">
                <AlertCircle className="h-3.5 w-3.5" />
                Out of Stock
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {bookTitle}
          </h1>

          {/* Author */}
          {author && (
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Written by <span className="font-semibold text-violet-600 dark:text-violet-400">{author}</span>
            </p>
          )}

          {/* Pricing */}
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              <PriceDisplay price={price} />
            </span>
            <span className="text-sm font-semibold text-slate-400 dark:text-slate-500 line-through">
              ${originalPrice}
            </span>
            <span className="rounded-md bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              20% Discount
            </span>
          </div>

          {/* Synopsis */}
          <div className="mt-6 border-t border-slate-200 dark:border-slate-800/80 pt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Book Synopsis
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {description ||
                `A celebrated literary masterpiece penned by ${author || "the author"}. Features stunning hardcover typography, archival-grade paper, and timeless prose that captivates generations of readers.`}
            </p>
          </div>

          {/* Publishing Info Cards */}
          <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-3">
              <span className="text-slate-500 dark:text-slate-400">Language & Format</span>
              <p className="mt-1 font-semibold text-slate-900 dark:text-white">English • Hardcover</p>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-3">
              <span className="text-slate-500 dark:text-slate-400">Print Quality</span>
              <p className="mt-1 font-semibold text-slate-900 dark:text-white">Acid-Free Archival Paper</p>
            </div>
          </div>
        </div>

        {/* Purchase Controls */}
        <div className="mt-8 border-t border-slate-200 dark:border-slate-800/80 pt-6">
          {/* Quantity Selector */}
          <div className="mb-4 flex items-center gap-4">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Quantity:</span>
            <div className="flex items-center rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-9 w-9 items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-l-xl transition-colors"
              >
                -
              </button>
              <span className="flex h-9 w-10 items-center justify-center text-xs font-bold text-slate-900 dark:text-white">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                disabled={quantity >= currentStock}
                className="flex h-9 w-9 items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-r-xl transition-colors disabled:opacity-30"
              >
                +
              </button>
            </div>
            {inCart && (
              <span className="text-xs text-violet-600 dark:text-violet-400 font-medium">
                ({inCart.quantity} in cart)
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-bold transition-all shadow-lg active:scale-95 ${
                isOutOfStock
                  ? "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 shadow-violet-600/30"
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`flex items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-bold transition-all shadow-lg active:scale-95 ${
                isOutOfStock
                  ? "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white hover:from-fuchsia-500 hover:to-pink-500 shadow-fuchsia-600/30"
              }`}
            >
              <Zap className="h-4 w-4" />
              Buy Now
            </button>
          </div>

          {/* Admin Edit Shortcut */}
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => navigate(`/admin/products?id=${id}`)}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            >
              <Wrench className="h-3.5 w-3.5" />
              Edit in Admin Panel
            </button>

            <button
              onClick={() => navigate("/books")}
              className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              ← Back to Books
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-8 grid grid-cols-3 gap-3 border-t border-slate-200 dark:border-slate-800/80 pt-6 text-center">
            <div className="flex flex-col items-center gap-1">
              <Truck className="h-4 w-4 text-violet-600 dark:text-violet-400" />
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Fast Book Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw className="h-4 w-4 text-sky-600 dark:text-sky-400" />
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Easy Replacement</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <BookOpen className="h-4 w-4 text-fuchsia-600 dark:text-fuchsia-400" />
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Original Print</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
