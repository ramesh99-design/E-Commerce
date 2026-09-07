import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Eye,
  Sparkles,
} from "lucide-react";
import { addToCart } from "../Features/Cart/CartSlice";
import {
  removeFromWishlist,
  clearWishlist,
} from "../Features/Cart/WishListSlice";
import PriceDisplay from "../Components/Design/PriceDisplay";
import { toast } from "react-toastify";

export default function WishlistPage() {
  const wishlist = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMoveToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(removeFromWishlist(item.id));
    toast.success(`Moved "${item.name || item.title}" to cart! 🛍️`);
  };

  const handleRemove = (id, name) => {
    dispatch(removeFromWishlist(id));
    toast.info(`Removed "${name}" from wishlist`, { icon: "💔" });
  };

  if (wishlist.length === 0) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-16">
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-12 text-center backdrop-blur-sm max-w-md w-full shadow-sm dark:shadow-none">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20 mb-4">
            <Heart className="h-10 w-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Your Wishlist is Empty</h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Save your favorite laptops, accessories, and classic books here to track discounts and stock status!
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
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm"
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
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-rose-500 uppercase tracking-wider">
            <Heart className="h-4 w-4 fill-rose-500" />
            <span>Saved Favorites</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            My Wishlist ({wishlist.length})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              dispatch(clearWishlist());
              toast.info("Wishlist cleared");
            }}
            className="flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-600 dark:text-rose-300 hover:bg-rose-500/20 transition-all"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear Wishlist
          </button>
        </div>
      </div>

      {/* Grid of Wishlist Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => {
          const isBook = item.category?.toLowerCase() === "books";
          const detailUrl = isBook ? `/books/${item.id}` : `/electronics/${item.id}`;
          const currentStock = (item.stock !== undefined ? item.stock : item.quantityAvailable) || 0;

          return (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 backdrop-blur-sm shadow-sm dark:shadow-xl transition-all hover:border-violet-500/40 product-card-theme"
            >
              {/* Image & Remove button */}
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-950">
                <button
                  onClick={() => handleRemove(item.id, item.name || item.title)}
                  className="absolute right-3 top-3 z-10 rounded-full bg-white/80 dark:bg-slate-900/80 p-2 text-slate-500 dark:text-slate-400 hover:bg-rose-500 hover:text-white transition-all shadow-md"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                <img
                  src={item.imageLink || "/placeholder.png"}
                  alt={item.name || item.title}
                  onClick={() => navigate(detailUrl)}
                  className="h-full w-full cursor-pointer object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="mt-4 flex flex-1 flex-col justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                    {item.category || "Item"}
                  </span>
                  <h3
                    onClick={() => navigate(detailUrl)}
                    className="line-clamp-1 mt-0.5 cursor-pointer text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 transition-colors group-hover:text-violet-600 dark:group-hover:text-violet-300"
                  >
                    {item.name || item.title}
                  </h3>
                  {item.author && (
                    <p className="line-clamp-1 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      by {item.author}
                    </p>
                  )}
                </div>

                {/* Price & Stock */}
                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-2.5">
                  <div className="text-base font-bold text-slate-900 dark:text-white">
                    <PriceDisplay price={item.price} />
                  </div>
                  <span
                    className={`text-[11px] font-semibold ${
                      currentStock > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400"
                    }`}
                  >
                    {currentStock > 0 ? "In Stock" : "Unavailable"}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="mt-1 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => navigate(detailUrl)}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/60 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all active:scale-95"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Details
                  </button>

                  <button
                    onClick={() => handleMoveToCart(item)}
                    disabled={currentStock <= 0}
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-2 text-xs font-semibold text-white shadow-md shadow-violet-600/30 hover:from-violet-500 hover:to-indigo-500 transition-all active:scale-95 disabled:opacity-40"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    To Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
