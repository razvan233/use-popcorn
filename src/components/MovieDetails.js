import { useEffect, useRef, useState } from "react";
import Box from "./Box";
import { API_KEY, BASE_URL } from "../utils/api";
import StarRating from "./StarRating";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

function MovieDetails({
  selectedID,
  onCloseDetails,
  onMarkAsWatched,
  isInWatchList,
  currentRating = 0,
}) {
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(currentRating);
  const [errorMessage, setErrorMessage] = useState(null);

  const countRef = useRef(0);

  const handleOnClick = () => {
    try {
      // Safely extract runtime (in minutes) if available
      const runtime = movieDetails?.Runtime
        ? Number(String(movieDetails.Runtime).split(" ")[0]) || 0
        : 0;

      onMarkAsWatched((watchedMovies) => {
        let result;
        if (isInWatchList)
          result = watchedMovies.filter((wm) => wm.imdbID !== selectedID);
        result = [
          ...watchedMovies,
          {
            imdbID: movieDetails?.imdbID,
            Title: movieDetails?.Title,
            Year: movieDetails?.Year,
            Poster: movieDetails?.Poster,
            runtime,
            imdbRating: Number(movieDetails?.imdbRating) || 0,
            userRating: Number(rating) || 0,
            countRatingDecisions: countRef.current,
          },
        ];
        return result;
      });
      // clear any previous error on successful add/remove
      if (errorMessage) setErrorMessage(null);
    } catch (err) {
      setErrorMessage(err?.message || String(err));
    }
  };

  useEffect(() => {
    if (!rating) return;
    countRef.current += 1;
  }, [rating]);

  useEffect(() => {
    setRating(currentRating);
  }, [selectedID, currentRating]);

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        if (!BASE_URL || !API_KEY) {
          throw new Error(
            "Missing API configuration: set REACT_APP_BASE_URL and REACT_APP_API_KEY"
          );
        }
        const url = `${BASE_URL}/?apikey=${API_KEY}&i=${selectedID}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.Response === "False")
          throw new Error(data.Error || "Movie not found");
        setMovieDetails(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setErrorMessage(err?.message || String(err));
      } finally {
        setIsLoading(false);
      }
    };
    getMovieDetails();
  }, [selectedID]);

  useEffect(() => {
    onMarkAsWatched((wm) =>
      wm.map((m) =>
        m.imdbID === selectedID ? { ...m, userRating: rating } : m
      )
    );
  }, [rating, selectedID, onMarkAsWatched]);

  useEffect(() => {
    document.title = `MOVIE | ${movieDetails?.Title}`;

    return () => (document.title = "usePopcorn");
  }, [movieDetails]);

  if (isLoading) {
    return <Loader />;
  }
  if (errorMessage) return <ErrorMessage message={errorMessage} />;
  return (
    <Box>
      <div className="details">
        <header>
          <button className="btn-back" onClick={onCloseDetails}>
            &larr;
          </button>
          <img
            src={movieDetails?.Poster}
            alt={`Poster of  ${movieDetails.Title} movie`}
          />
          <div className="details-overview">
            <h2>{movieDetails?.Title}</h2>
            <p>
              {movieDetails?.Released} &bull; {movieDetails?.Runtime}
            </p>
            <p>{movieDetails?.Genre}</p>
            <p>
              <span>⭐</span>
              {movieDetails?.imdbRating} IMDb Rating
            </p>
          </div>
        </header>

        <section>
          <div className={"rating"}>
            <StarRating
              maxRating={10}
              defaultRating={rating}
              size={24}
              onSetRating={setRating}
            />
            <button
              className={"btn-add"}
              style={isInWatchList ? { backgroundColor: "red" } : {}}
              onClick={handleOnClick}
            >
              {isInWatchList ? "- Remove from list" : "+ Add to list"}
            </button>
          </div>
          <p>
            <em>{movieDetails?.Plot}</em>
          </p>
          <p>Starring {movieDetails?.Actors}</p>
          <p>Directed by {movieDetails?.Director}</p>
        </section>
      </div>
    </Box>
  );
}

export default MovieDetails;
