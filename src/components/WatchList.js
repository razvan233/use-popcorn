import { useState } from "react";
import { average } from "../utils/functions";
import Box from "./Box";
import Movie from "./Movie";
import MovieInfo from "./MovieInfo";
import ErrorMessage from "./ErrorMessage";
function WatchList({ watched, handleRemoveWatchedMovie }) {
  const [errorMessage, setErrorMessage] = useState(null);

  let avgImdbRating = "N/A";
  let avgUserRating = "N/A";
  let avgRuntime = "N/A";

  // Compute aggregates defensively and surface any errors to the UI
  try {
    const imdbRatings = watched
      .map((m) => Number(m.imdbRating))
      .filter((r) => !Number.isNaN(r));
    avgImdbRating = imdbRatings.length
      ? average(imdbRatings).toFixed(2)
      : "N/A";

    const userRatings = watched
      .map((m) => Number(m.userRating))
      .filter((r) => !Number.isNaN(r));
    avgUserRating = userRatings.length
      ? average(userRatings).toFixed(2)
      : "N/A";

    // Consider only movies with a positive runtime when averaging.
    // Some movies may have `runtime` missing or set to 0 — exclude those.
    const runtimes = watched
      .map((movie) => Number(movie.runtime))
      .filter((rt) => rt > 0);
    avgRuntime = runtimes.length ? average(runtimes).toFixed(2) : "N/A";

    // Clear previous errors if computation succeeds
    if (errorMessage) setErrorMessage(null);
  } catch (err) {
    setErrorMessage(err?.message || String(err));
    // leave the averages as "N/A" so UI renders safely
  }
  return (
    <Box>
      <>
        {errorMessage && <ErrorMessage message={errorMessage} />}
        <div className="summary">
          <h2>Movies you watched</h2>
          <MovieInfo
            infos={[
              { emoji: "#️⃣", value: watched.length },
              { emoji: "⭐️", value: avgImdbRating },
              { emoji: "🌟", value: avgUserRating },
              {
                emoji: "⏳",
                value: avgRuntime === "N/A" ? "N/A" : `${avgRuntime} min`,
              },
            ]}
          />
        </div>
        <ul className="list">
          {watched.map((movie) => (
            <Movie key={movie.imdbID} movie={movie}>
              <>
                <MovieInfo
                  infos={[
                    { emoji: "⭐️", value: movie.imdbRating },
                    { emoji: "🌟", value: movie.userRating },
                    {
                      emoji: "⏳",
                      value:
                        Number(movie.runtime) > 0
                          ? `${movie.runtime} min`
                          : "N/A",
                    },
                  ]}
                />
                <button
                  className="btn-delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveWatchedMovie(movie.imdbID);
                  }}
                >
                  X
                </button>
              </>
            </Movie>
          ))}
        </ul>
      </>
    </Box>
  );
}

export default WatchList;
