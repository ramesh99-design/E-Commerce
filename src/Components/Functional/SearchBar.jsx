export default function SearchBar({ searchTerm, setSearchTerm, placeholder }) {
  return (
    <input
      type="text"
      className="search-input"
      placeholder={placeholder}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
