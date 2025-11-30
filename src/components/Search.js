import { useRef, useCallback } from "react";
import { useKey } from "../hooks/useKey";

function Search({ query, onSearch }) {
  const inputRef = useRef(null);

  const handleKeyEvent = (e) => {
    if (!inputRef.current) return;
    if (document.activeElement === inputRef.current) return;
    if (e.key === "Enter") {
      inputRef.current.focus();
      onSearch("");
    }
  };

  const focusRef = useCallback(() => inputRef?.current.focus(), []);
  useKey("keydown", handleKeyEvent, focusRef);

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
