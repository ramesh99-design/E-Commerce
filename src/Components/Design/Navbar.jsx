import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  Heart,
  User,
  LogOut,
  Wrench,
  Laptop,
  BookOpen,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Home,
  Sun,
  Moon,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Link, NavLink } from "react-router-dom";
import { logout } from "../../Services/AuthServices";
import { toast } from "react-toastify";
import { useTheme } from "../Functional/ThemeContext";

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { theme, toggleTheme, isDark } = useTheme();

  // Redux state extraction
  const { totalQuantity, totalPrice } = useSelector((state) => state.cart);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  // Add shadow and border highlight on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.info("Signed out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
      toast.error("Failed to log out");
    }
  };

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/electronics", label: "Electronics", icon: Laptop },
    { to: "/books", label: "Books", icon: BookOpen },
    { to: "/admin/products", label: "Manage", icon: Wrench },
  ];

  return (
    <>
      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-200 dark:border-slate-800/90 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/40"
            : "border-b border-slate-200/80 dark:border-slate-800/50 bg-white/75 dark:bg-slate-950/75 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Brand Logo */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 text-xl font-extrabold tracking-tight transition-opacity hover:opacity-90"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-fuchsia-500 font-bold text-white shadow-md shadow-violet-500/30 transition-transform duration-300 group-hover:scale-105">
              <Sparkles className="h-5 w-5 text-white" />
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-0 blur transition-opacity duration-300 group-hover:opacity-60 -z-10" />
            </div>
            <div className="flex flex-col">
              <span className="leading-tight font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-lg">
                EZ-Cart<span className="text-violet-500">.</span>
              </span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Store
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 rounded-full border border-slate-200 dark:border-slate-800/80 bg-slate-100/80 dark:bg-slate-900/60 p-1.5 backdrop-blur-sm shadow-inner">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive =
                link.to === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(link.to);
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-600/30"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? "text-white" : "text-violet-500 dark:text-violet-400"}`} />
                  {link.label}
                </NavLink>
              );
            })}
          </div>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button (Light/Dark) */}
            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-100 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 transition-all hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white active:scale-90"
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
              title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
            >
              {isDark ? (
                <Sun className="h-4 w-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon className="h-4 w-4 text-violet-600 transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-100 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 transition-all hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 active:scale-95"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <Heart className="h-4 w-4 text-rose-500 dark:text-rose-400 transition-transform duration-200 hover:scale-110" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white shadow-md shadow-rose-500/40 animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Link with Badge */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-100 dark:bg-slate-900/60 px-3 py-2 text-slate-700 dark:text-slate-300 transition-all hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 active:scale-95"
              aria-label="Shopping Cart"
              title="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-1 text-[9px] font-extrabold text-white shadow-sm shadow-violet-500/50">
                    {totalQuantity}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-bold text-slate-800 dark:text-slate-200">
                ${totalPrice.toFixed(2)}
              </span>
            </Link>

            {/* Profile Dropdown / Login Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-100 dark:bg-slate-900/80 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 transition-all hover:bg-slate-200 dark:hover:bg-slate-800 focus:outline-none"
                  aria-expanded={isProfileOpen}
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 text-xs font-bold text-white shadow-sm">
                    {user.name ? (
                      user.name.charAt(0).toUpperCase()
                    ) : (
                      <User className="h-3.5 w-3.5" />
                    )}
                  </div>
                  <span className="hidden md:inline font-semibold text-slate-800 dark:text-slate-200 max-w-[100px] truncate">
                    {user.name || "Account"}
                  </span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-2 shadow-2xl shadow-black/10 dark:shadow-black/80 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150 z-50 text-slate-800 dark:text-slate-200"
                    onMouseLeave={() => setIsProfileOpen(false)}
                  >
                    <div className="rounded-xl bg-slate-100 dark:bg-slate-950/60 p-3 border border-slate-200 dark:border-slate-800/60 mb-2">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {user.name || "Logged In User"}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {user.email}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <Link
                        to="/wishlist"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <Heart className="h-3.5 w-3.5 text-rose-500" />
                        My Wishlist ({wishlistCount})
                      </Link>

                      <Link
                        to="/admin/products"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <Wrench className="h-3.5 w-3.5 text-amber-500" />
                        Manage Products
                      </Link>

                      <div className="my-1 border-t border-slate-200 dark:border-slate-800" />

                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-violet-600/20 hover:from-violet-500 hover:to-indigo-500 transition-all active:scale-95"
                >
                  Sign In
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 transition-all hover:bg-slate-200 dark:hover:bg-slate-800 lg:hidden"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 right-0 w-full max-w-xs border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200 z-50 text-slate-900 dark:text-slate-100">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-600 to-fuchsia-500 text-white font-bold text-xs">
                    EZ
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white text-base">EZ-Cart</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Theme Toggle In Mobile Drawer */}
              <div className="mt-4 flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  {isDark ? <Moon className="h-4 w-4 text-violet-400" /> : <Sun className="h-4 w-4 text-amber-500" />}
                  Appearance: {isDark ? "Dark Mode" : "Light Mode"}
                </span>
                <button
                  onClick={toggleTheme}
                  className="rounded-lg bg-slate-200 dark:bg-slate-800 px-3 py-1 text-xs font-bold text-slate-800 dark:text-slate-200"
                >
                  Toggle
                </button>
              </div>

              {/* Navigation Links */}
              <div className="mt-6 flex flex-col gap-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive =
                    link.to === "/"
                      ? location.pathname === "/"
                      : location.pathname.startsWith(link.to);
                  return (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-violet-500 dark:text-violet-400"}`} />
                      {link.label}
                    </NavLink>
                  );
                })}

                <NavLink
                  to="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                    location.pathname === "/wishlist"
                      ? "bg-violet-600 text-white"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Heart className="h-4 w-4 text-rose-500" />
                    Wishlist
                  </div>
                  {wishlistCount > 0 && (
                    <span className="rounded-full bg-rose-500 px-2 py-0.5 text-xs text-white">
                      {wishlistCount}
                    </span>
                  )}
                </NavLink>

                <NavLink
                  to="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                    location.pathname === "/cart"
                      ? "bg-violet-600 text-white"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="h-4 w-4 text-violet-500" />
                    Cart
                  </div>
                  <span className="rounded-full bg-violet-600 px-2 py-0.5 text-xs text-white font-bold">
                    {totalQuantity} items (${totalPrice.toFixed(2)})
                  </span>
                </NavLink>
              </div>
            </div>

            {/* Bottom User Area */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
              {user ? (
                <div className="space-y-3">
                  <div className="rounded-xl bg-slate-100 dark:bg-slate-900 p-3">
                    <p className="text-xs font-semibold text-slate-900 dark:text-white">{user.name}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-300 py-2.5 text-xs font-semibold hover:bg-rose-500/20 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center rounded-xl bg-violet-600 py-2.5 text-xs font-semibold text-white shadow-md shadow-violet-600/30"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Create Account
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
