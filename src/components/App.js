import { useCallback, useEffect, useState } from "react";
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
import { useMovies } from "../hooks/useMovies";

export default function App() {
  const [watched, setWatched] = useState(() => {
    const watchedMovies = localStorage.getItem("watchedMovies");
    if (watchedMovies === null) return;
    return JSON.parse(watchedMovies);
  });
  const [query, setQuery] = useState("");
  const [selectedID, setSelectedID] = useState(null);

  const handleSelectMovie = useCallback(() => setSelectedID(0), []);

  const { movies, isLoading, errorMessage } = useMovies(
    query,
    BASE_URL,
    API_KEY,
    handleSelectMovie
  );

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
