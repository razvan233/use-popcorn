import { average } from "../utils/functions";
import Box from "./Box";
import Movie from "./Movie";
import MovieInfo from "./MovieInfo";
function WatchList({ watched, handleRemoveWatchedMovie }) {
  const avgImdbRating = average(
    watched.map((movie) => movie.imdbRating)
  ).toFixed(2);
  const avgUserRating = average(
    watched.map((movie) => movie.userRating)
  ).toFixed(2);
  // Consider only movies with a positive runtime when averaging.
  // Some movies may have `runtime` missing or set to 0 — exclude those.
  const runtimes = watched
    .map((movie) => Number(movie.runtime))
    .filter((rt) => rt > 0);
  const avgRuntime = runtimes.length ? average(runtimes).toFixed(2) : "N/A";
  return (
    <Box>
      <>
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
