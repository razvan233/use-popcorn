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
  const avgRuntime = average(watched.map((movie) => movie.runtime)).toFixed(2);
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
              { emoji: "⏳", value: avgRuntime },
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
                    { emoji: "⏳", value: movie.runtime },
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
