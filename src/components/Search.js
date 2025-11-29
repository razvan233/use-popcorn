function Search({ query, onSearch }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSearch(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSearch(e.target.value);
        }
      }}
    />
  );
}

export default Search;
