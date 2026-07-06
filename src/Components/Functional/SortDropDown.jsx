export default function SortDropDown({ sortOption, setSortOption }) {
  return (
    <select
      className="sort-select"
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
    >
      <option value="">Sort By</option>
      <option value="priceLowHigh">Price: Low → High</option>
      <option value="priceHighLow">Price: High → Low</option>
      <option value="nameAZ">A → Z</option>
      <option value="nameZA">Z → A</option>
    </select>
  );
}
