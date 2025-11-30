import { useState, useEffect } from "react";

export const useMovies = (query, BASE_URL, API_KEY, callback) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    setErrorMessage("");
    callback?.();
    const reqController = new AbortController();

    const fetchMovies = () => {
      if (!BASE_URL || !API_KEY) {
        console.error("Missing API configuration:", { BASE_URL, API_KEY });
        setErrorMessage("Missing API configuration");
        setIsLoading(false);
        return;
      }
      const url = `${BASE_URL}/?apikey=${API_KEY}&s=${query}`;
      fetch(url, { signal: reqController.signal })
        .then(async (res) => {
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
        })
        .catch((err) => {
          if (err.name === "AbortError") return;
          setErrorMessage(err.message);
          console.error("Fetch error:", err);
        })
        .finally(() => setIsLoading(false));
    };

    if (query.length < 3) {
      setMovies([]);
      setIsLoading(false);
      return;
    }
    fetchMovies();
    return () => reqController.abort();
  }, [query, BASE_URL, API_KEY, callback]);

  return { movies, isLoading, errorMessage };
};
