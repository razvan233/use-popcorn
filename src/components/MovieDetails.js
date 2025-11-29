import { useEffect, useState } from "react";
import Box from "./Box";
import { API_KEY, BASE_URL } from "../utils/api";
import StarRating from "./StarRating";
import Loader from "./Loader";

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

  const handleOnClick = () => {
    onMarkAsWatched((watchedMovies) => {
      if (isInWatchList)
        return watchedMovies.filter((wm) => wm.imdbID !== selectedID);
      return [
        ...watchedMovies,
        {
          imdbID: movieDetails?.imdbID,
          Title: movieDetails?.Title,
          Year: movieDetails?.Year,
          Poster: movieDetails?.Poster,
          runtime: Number(movieDetails?.Runtime.split(" ")[0]) || 0,
          imdbRating: Number(movieDetails?.imdbRating),
          userRating: Number(rating),
        },
      ];
    });
  };

  useEffect(() => {
    setRating(currentRating);
  }, [selectedID, currentRating]);

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      const url = `${BASE_URL}/?apikey=${API_KEY}&i=${selectedID}`;
      if (!BASE_URL || !API_KEY) {
        console.error("Missing API configuration:", { BASE_URL, API_KEY });
        return;
      }
      fetch(url)
        .then(async (res) => {
          const data = await res.json();
          console.log(data);
          if (data.Response === "False") throw new Error("Movie not found");
          setMovieDetails(data);
        })
        .catch((err) => {
          console.error("Fetch error:", err);
        })
        .finally(() => setIsLoading(false));
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

  if (isLoading) {
    return <Loader />;
  }

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
