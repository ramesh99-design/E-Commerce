export default function FilterBar({
  priceFilter,
  setPriceFilter,
  inStockOnly,
  setInStockOnly,
  resetFilters,
  priceOptions,
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.8rem",
        flexWrap: "wrap",
      }}
    >
      <select
        className="sort-select"
        value={priceFilter}
        onChange={(e) => setPriceFilter(e.target.value)}
      >
        <option value="">All Prices</option>
        {priceOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <label
        style={{
          display: "flex",
          gap: "0.4rem",
          fontSize: "0.95rem",
          whiteSpace: "nowrap",
        }}
      >
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => setInStockOnly(e.target.checked)}
        />
        In Stock
      </label>
      <button
        className="btn-danger-link"
        style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}
        onClick={resetFilters}
      >
        Reset
      </button>
    </div>
  );
}
