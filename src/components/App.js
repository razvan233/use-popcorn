import { useState } from "react";
import NavBar from "./NavBar";
import Main from "./Main";
import { tempMovieData, tempWatchedData } from "../utils/initialData";
import Logo from "./Logo";
import NoOfResults from "./NoOfResults";
import Search from "./Search";
import MovieList from "./MovieList";
import WatchList from "./WatchList";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NoOfResults moviesLength={movies.length} />
      </NavBar>
      <Main>
        <MovieList movies={movies} />
        <WatchList watched={watched} />
      </Main>
    </>
  );
}
