import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PackageSearch, BookOpen } from "lucide-react";
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

export default function BooksPage() {
  const navigate = useNavigate();

  const navigateToProductDetails = (id) => {
    navigate(`/books/${id}`);
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
        const books = data.filter(
          (product) => product.category?.toLowerCase() === "books"
        );
        setProducts(books);
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
      const titleMatch = (item.name || item.title || "").toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      const authorMatch = (item.author || "").toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      return titleMatch || authorMatch;
    });

    if (priceFilter === "under 50") {
      result = result.filter((item) => item.price < 50);
    } else if (priceFilter === "50 - 70") {
      result = result.filter(
        (item) => item.price >= 50 && item.price <= 70
      );
    } else if (priceFilter === "above 70") {
      result = result.filter((item) => item.price > 70);
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
        sorted.sort((a, b) => (a.name || a.title || "").localeCompare(b.name || b.title || ""));
        break;
      case "nameZToA":
        sorted.sort((a, b) => (b.name || b.title || "").localeCompare(a.name || a.title || ""));
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
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-fuchsia-950/30 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-fuchsia-600/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold text-fuchsia-300">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Literary Masterpieces</span>
            </div>
            <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Curated Books Collection
            </h1>
            <p className="mt-2 max-w-xl text-xs sm:text-sm text-slate-400">
              Immerse yourself in timeless literature, modern classics, and insightful
              masterworks penned by world-renowned authors.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2 text-xs font-semibold text-slate-300">
              {sortedProducts.length} Titles Available
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
            placeholder="Search by title or author..."
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
              { value: "under 50", label: "Under $50" },
              { value: "50 - 70", label: "$50 - $70" },
              { value: "above 70", label: "Above $70" },
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
            No Books Found
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-sm">
            We couldn't find books matching your current search or filters. Try
            clearing the filters or searching a different keyword.
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
              title={item.name || item.title}
              detailLabel="Book"
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