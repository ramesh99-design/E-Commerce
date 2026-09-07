import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Home, PackageSearch, Laptop, Sparkles } from "lucide-react";
import { getProducts } from "../../Services/ProductServices";
import SearchBar from "../../Components/Functional/SearchBar";
import SortDropDown from "../../Components/Functional/SortDropDown";
import FilterBar from "../../Components/Design/FilterBar";
import ProductCard from "../../Components/Design/ProductCard";
import Pagination from "../../Components/Design/Pagination";
import LoadingSkeletonCard from "../../Components/Design/LoadingSkeletonCard";

function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function ElectronicsPage() {
  const navigate = useNavigate();

  const navigateToProductDetails = (id) => {
    navigate(`/electronics/${id}`);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const [sortOption, setSortOption] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Load products once on mount
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        const electronics = data.filter(
          (product) => product.category?.toLowerCase() === "electronics"
        );
        setProducts(electronics);
      } catch (error) {
        console.error("Failed to Load Products", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Filter and sort products memoized
  const sortedProducts = useMemo(() => {
    let result = products.filter((item) => {
      const nameMatch = (item.name || "").toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      const descMatch = (item.description || "").toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      return nameMatch || descMatch;
    });

    if (priceFilter === "under 500") {
      result = result.filter((item) => item.price < 500);
    } else if (priceFilter === "500 - 1000") {
      result = result.filter(
        (item) => item.price >= 500 && item.price <= 1000
      );
    } else if (priceFilter === "above 1000") {
      result = result.filter((item) => item.price > 1000);
    }

    if (inStockOnly) {
      result = result.filter((item) => (item.stock || item.quantityAvailable || 0) > 0);
    }

    const sorted = [...result];
    switch (sortOption) {
      case "priceLowHigh":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "priceHighLow":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "nameAToZ":
        sorted.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case "nameZToA":
        sorted.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
        break;
      default:
        break;
    }

    return sorted;
  }, [products, debouncedSearchTerm, priceFilter, inStockOnly, sortOption]);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    setCurrentPage(1);
  };

  const handlePriceChange = (value) => {
    setPriceFilter(value);
    setCurrentPage(1);
  };

  const handleStockChange = (value) => {
    setInStockOnly(value);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSortOption("");
    setPriceFilter("");
    setInStockOnly(false);
    setCurrentPage(1);
  };

  const itemsPerPage = 8;
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 min-h-screen">
      {/* Category Hero Banner */}
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-violet-950/40 via-slate-900 to-indigo-950/40 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
              <Laptop className="h-3.5 w-3.5" />
              <span>Next-Gen Hardware</span>
            </div>
            <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Electronics Collection
            </h1>
            <p className="mt-2 max-w-xl text-xs sm:text-sm text-slate-400">
              Explore flagship laptops, smartphones, high-resolution cameras, and gaming
              peripherals engineered for maximum power and refined aesthetics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2 text-xs font-semibold text-slate-300">
              {sortedProducts.length} Items Available
            </span>
          </div>
        </div>
      </div>

      {/* Filter Bar Toolbar */}
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 backdrop-blur-sm shadow-md dark:shadow-xl">
        <div className="flex-1 max-w-md">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={handleSearchChange}
            placeholder="Search laptops, phones, gear..."
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <SortDropDown
            sortOption={sortOption}
            setSortOption={handleSortChange}
          />
          <FilterBar
            priceFilter={priceFilter}
            setPriceFilter={handlePriceChange}
            inStockOnly={inStockOnly}
            setInStockOnly={handleStockChange}
            resetFilters={resetFilters}
            priceOptions={[
              { value: "under 500", label: "Under $500" },
              { value: "500 - 1000", label: "$500 - $1000" },
              { value: "above 1000", label: "Above $1000" },
            ]}
          />
        </div>
      </div>

      {/* Product Grid Area */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <LoadingSkeletonCard count={8} />
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="my-16 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/40 p-12 text-center backdrop-blur-sm">
          <PackageSearch className="mb-4 h-12 w-12 text-slate-400 dark:text-slate-600" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-200">
            No Electronics Found
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-sm">
            We couldn't find matches for your current filter query. Try clearing
            filters or altering your search.
          </p>
          <button
            onClick={resetFilters}
            className="mt-5 rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-violet-600/20 hover:bg-violet-500 active:scale-95 transition-all"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentItems.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              title={item.name}
              detailLabel="Electronics"
              onView={navigateToProductDetails}
            />
          ))}
        </div>
      )}

      {/* Pagination Container */}
      {!loading && sortedProducts.length > 0 && (
        <div className="mt-12 flex justify-center border-t border-slate-800/80 pt-8">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
}