import { getProducts } from "../../Services/ProductServices";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchBar from "../../Components/Functional/SearchBar";
import SortDropDown from "../../Components/Functional/SortDropDown";
import FilterBar from "../../Components/Design/FilterBar";
import ProductCard from "../../Components/Design/ProductCard";

export default function BooksPage() {
  const navigate = useNavigate();

  const NavigateToProductDetails = (id) => {
    navigate(`/books/${id}`);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const [sortOption, setSortOption] = useState("");

  const [priceFilter, setPriceFilter] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      const books = data.filter((product) => product.category === "books");
      setProducts(books);
      setLoading(false);
    }

    loadProducts();
  }, []);

  let filtered = products.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (priceFilter === "under 30") {
    filtered = filtered.filter((item) => item.price < 30);
  }
  if (priceFilter === "30 - 50") {
    filtered = filtered.filter((item) => item.price >= 30 && item.price <= 50);
  }
  if (priceFilter === "above 50") {
    filtered = filtered.filter((item) => item.price > 50);
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
  if (loading) {
    return (
      <div className="container" style={{ textAlign: "center" }}>
        Loading Books...
      </div>
    );
  }

  return (
    <div>
      <div className="card-header">
        <h1>Books</h1>
        <Link
          to="/"
        >
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
          placeholder="Search Books..."
        />
        <SortDropDown sortOption={sortOption} setSortOption={setSortOption} />
        <FilterBar
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
          inStockOnly={inStockOnly}
          setInStockOnly={setInStockOnly}
          resetFilters={resetFilters}
          priceOptions={[
            { value: "under 30", label: "Under 30" },
            { value: "30 - 50", label: "30 - 50" },
            { value: "above 50", label: "Above 50" },
          ]}
        />
      </div>
      <div className="card-grid">
        {filtered.length === 0 ? (
          <h2 style={{ textAlign: "center" }}>😕 No books found.</h2>
        ) : (
          sortedProducts.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              title={item.name}
              detailLabel="Title"
              onView={NavigateToProductDetails}
            />
          ))
        )}
      </div>
    </div>
  );
}
