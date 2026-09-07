import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingBag, Eye, AlertCircle, Star } from "lucide-react";
import { addToCart } from "../../Features/Cart/CartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../Features/Cart/WishListSlice";
import PriceDisplay from "../Design/PriceDisplay";
import { toast } from "react-toastify";

export default function ProductCard({ item, title, detailLabel, onView }) {
  const dispatch = useDispatch();

  // Redux state selectors
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishListed = wishlistItems.some((product) => product.id === item.id);

  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find((i) => i.id === item.id);

  // Stock availability validation logic
  const isOutOfStock = cartItem
    ? cartItem.quantity >= (item.stock || item.quantityAvailable || 0)
    : (item.stock || item.quantityAvailable || 0) <= 0;

  const currentStock = (item.stock !== undefined ? item.stock : item.quantityAvailable) || 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    dispatch(addToCart(item));
    toast.success(`Added "${title || item.name || item.title}" to cart! 🛍️`, {
      icon: "🛒",
    });
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    if (isWishListed) {
      dispatch(removeFromWishlist(item.id));
      toast.info(`Removed from wishlist`, { icon: "💔" });
    } else {
      dispatch(addToWishlist(item));
      toast.success(`Added to wishlist! ❤️`, { icon: "❤️" });
    }
  };

  const rating = item.rating || 4.8;
  const originalPrice = item.price ? (item.price * 1.25).toFixed(2) : null;

  return (
    <div
      onClick={() => onView && onView(item.id)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/10 cursor-pointer shadow-sm dark:shadow-none"
    >
      {/* Media Header & Badges */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-950">
        {/* Out of stock or Sale badge */}
        {isOutOfStock ? (
          <span className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full border border-rose-500/30 bg-rose-500/20 px-2.5 py-1 text-[11px] font-bold text-rose-500 dark:text-rose-300 backdrop-blur-md">
            <AlertCircle className="h-3 w-3" />
            Out of Stock
          </span>
        ) : currentStock <= 5 ? (
          <span className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/20 px-2.5 py-1 text-[10px] font-bold text-amber-600 dark:text-amber-300 backdrop-blur-md">
            Only {currentStock} Left!
          </span>
        ) : (
          <span className="absolute left-3 top-3 z-10 rounded-full border border-violet-500/30 bg-violet-500/20 px-2.5 py-0.5 text-[10px] font-bold text-violet-600 dark:text-violet-300 backdrop-blur-md uppercase tracking-wide">
            Save 20%
          </span>
        )}

        {/* Interactive Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label={isWishListed ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute right-3 top-3 z-10 rounded-full p-2.5 backdrop-blur-md transition-all duration-200 active:scale-90 ${
            isWishListed
              ? "bg-rose-500 text-white shadow-lg shadow-rose-500/40"
              : "bg-white/80 dark:bg-slate-950/70 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800"
          }`}
        >
          <Heart className={`h-4 w-4 ${isWishListed ? "fill-current" : ""}`} />
        </button>

        {/* Product Image */}
        <img
          src={item.imageLink || "/placeholder.png"}
          alt={title || item.name || item.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content Body */}
      <div className="mt-4 flex flex-1 flex-col justify-between gap-3">
        <div>
          {/* Category Chip & Rating */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-violet-600 dark:text-violet-400 uppercase">
              {detailLabel || item.category || "Featured"}
            </span>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-500 dark:text-amber-400">
              <Star className="h-3 w-3 fill-amber-500 dark:fill-amber-400" />
              <span>{rating}</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="line-clamp-1 mt-1 text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 transition-colors group-hover:text-violet-600 dark:group-hover:text-violet-300">
            {title || item.name || item.title}
          </h3>

          {item.author && (
            <p className="line-clamp-1 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              by <span className="text-slate-700 dark:text-slate-300 font-medium">{item.author}</span>
            </p>
          )}
        </div>

        {/* Pricing & Stock Status */}
        <div className="flex items-end justify-between border-t border-slate-100 dark:border-slate-800/80 pt-2.5">
          <div className="flex flex-col">
            {originalPrice && (
              <span className="text-[11px] text-slate-400 dark:text-slate-500 line-through">
                ${originalPrice}
              </span>
            )}
            <div className="text-base font-extrabold text-slate-900 dark:text-white">
              <PriceDisplay price={item.price} />
            </div>
          </div>

          <div className="text-right">
            <span
              className={`inline-flex items-center text-[11px] font-semibold ${
                currentStock > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400"
              }`}
            >
              {currentStock > 0 ? `${currentStock} in stock` : "Unavailable"}
            </span>
          </div>
        </div>

        {/* Action Button Group */}
        <div className="mt-1 grid grid-cols-2 gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onView && onView(item.id)}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-100 dark:bg-slate-800/50 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all active:scale-95"
          >
            <Eye className="h-3.5 w-3.5" />
            Details
          </button>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold text-white transition-all shadow-md active:scale-95 ${
              isOutOfStock
                ? "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-50 shadow-none"
                : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-violet-600/30"
            }`}
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
