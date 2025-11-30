import { useEffect, useRef } from "react";
function Search({ query, onSearch }) {
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyEvent = (e) => {
      if (!inputRef.current) return;
      if (document.activeElement === inputRef.current) return;
      if (e.key === "Enter") {
        inputRef.current.focus();
        onSearch("");
      }
    };
    inputRef?.current.focus();
    document.addEventListener("keydown", handleKeyEvent);
    return () => document.removeEventListener("keydown", handleKeyEvent);
  }, [onSearch]);

  return (
    <input
      ref={inputRef}
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
