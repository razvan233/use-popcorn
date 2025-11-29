import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Main from "./Main";
import Logo from "./Logo";
import NoOfResults from "./NoOfResults";
import Search from "./Search";
import MovieList from "./MovieList";
import WatchList from "./WatchList";
import { API_KEY, BASE_URL } from "../utils/api";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import MovieDetails from "./MovieDetails";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(() => {
    const watchedMovies = localStorage.getItem("watchedMovies");
    if (watchedMovies === null) return;
    return JSON.parse(watchedMovies);
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [query, setQuery] = useState("");
  const [selectedID, setSelectedID] = useState(null);

  useEffect(() => {
    setErrorMessage("");
    const reqController = new AbortController();

    const fetchMovies = () => {
      const url = `${BASE_URL}/?apikey=${API_KEY}&s=${query}`;
      if (!BASE_URL || !API_KEY) {
        console.error("Missing API configuration:", { BASE_URL, API_KEY });
        return;
      }
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

    setSelectedID(0);
    fetchMovies();

    return () => reqController.abort();
  }, [query]);

  useEffect(() => {
    const eventHandler = (e) => {
      if (e.key === "Escape") setSelectedID(0);
    };
    document.addEventListener("keydown", eventHandler);
    return () => document.removeEventListener("keydown", eventHandler);
  }, []);

  useEffect(() => {
    localStorage.setItem("watchedMovies", JSON.stringify(watched));
  }, [watched]);

  return (
    <>
      <NavBar>
        <Logo />
        <Search onSearch={setQuery} />
        <NoOfResults moviesLength={movies.length} />
      </NavBar>
      <Main>
        {isLoading && <Loader />}
        {!isLoading && !errorMessage && (
          <MovieList movies={movies} onMovieSelect={setSelectedID} />
        )}
        {errorMessage && <ErrorMessage message={errorMessage} />}
        {selectedID ? (
          <MovieDetails
            selectedID={selectedID}
            onCloseDetails={() => setSelectedID(null)}
            onMarkAsWatched={setWatched}
            isInWatchList={
              watched.filter((wm) => wm.imdbID === selectedID).length === 1
            }
            currentRating={
              watched.filter((wm) => wm.imdbID === selectedID)[0]?.userRating
            }
          />
        ) : (
          <WatchList
            watched={watched}
            handleRemoveWatchedMovie={(imdbID) => {
              setWatched((m) => m.filter((wm) => wm.imdbID !== imdbID));
            }}
          />
        )}
      </Main>
    </>
  );
}
