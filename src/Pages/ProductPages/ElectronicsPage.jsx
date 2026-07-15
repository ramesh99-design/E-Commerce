import { getProducts } from "../../Services/ProductServices";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchBar from "../../Components/Functional/SearchBar";
import SortDropDown from "../../Components/Functional/SortDropDown";
import FilterBar from "../../Components/Design/FilterBar";
import ProductCard from "../../Components/Design/ProductCard";
import Pagination from "../../Components/Design/Pagination";
import LoadingSkeletonCard from "../../Components/Design/LoadingSkeletonCard";

export default function ElectronicsPage() {
  const navigate = useNavigate();

  const NavigateToProductDetails = (id) => {
    navigate(`/electronics/${id}`);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [priceFilter, setPriceFilter] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();

      await new Promise((resolve) => setTimeout(resolve, 500));

      const electronics = data.filter(
        (product) => product.category === "electronics",
      );
      setProducts(electronics);
      setLoading(false);
      setCurrentPage(1);
    }

    loadProducts();
  }, []);

  let filtered = products.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (priceFilter === "under 500") {
    filtered = filtered.filter((item) => item.price < 500);
  }
  if (priceFilter === "500 - 1000") {
    filtered = filtered.filter(
      (item) => item.price >= 500 && item.price <= 1000,
    );
  }
  if (priceFilter === "above 1000") {
    filtered = filtered.filter((item) => item.price > 1000);
  }

  if (inStockOnly) {
    filtered = filtered.filter((item) => item.stock > 0);
  }
  const sortedProducts = [...filtered];
  const resetFilters = () => {
    setSearchTerm("");
    setSortOption("");
    setPriceFilter("");
    setInStockOnly(false);
  };

  switch (sortOption) {
    case "priceLowHigh":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case "priceHighLow":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case "nameAZ":
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "nameZA":
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      break;
  }
  const itemsPerPage = 6;
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sortedProducts.slice(startIndex, endIndex);

  return (
    <div>
      <div className="card-header">
        <h1>Electronics</h1>
        <Link to="/">
          <button
            className="btn-primary-link"
            style={{ alignItems: "flex-end", marginLeft: "1rem" }}
          >
            🏠 Home
          </button>
        </Link>
      </div>
      <div className="filter-bar">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search Electronics..."
        />
        <SortDropDown sortOption={sortOption} setSortOption={setSortOption} />
        <FilterBar
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
          inStockOnly={inStockOnly}
          setInStockOnly={setInStockOnly}
          resetFilters={resetFilters}
          priceOptions={[
            { value: "under 500", label: "Under 500" },
            { value: "500 - 1000", label: "500 - 1000" },
            { value: "above 1000", label: "Above 1000" },
          ]}
        />
      </div>
      <div className="card-grid">
        {loading ? (
          <LoadingSkeletonCard count={6} />
        ) : sortedProducts.length === 0 ? (
          <h2 style={{ textAlign: "center" }}> No Products found</h2>
        ) : (
          currentItems.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              title={item.name}
              detailLabel="Product"
              onView={NavigateToProductDetails}
            />
          ))
        )}
        <div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
}
