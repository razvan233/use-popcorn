import Movie from "./Movie";
import Box from "./Box";
import InfoAttribute from "./InfoAttribute";

function MovieList({ movies, onMovieSelect }) {
  return (
    <Box>
      <ul className="list list-movies">
        {movies?.map((movie, index) => (
          <Movie key={index} movie={movie} onMovieSelect={onMovieSelect}>
            <InfoAttribute
              info={{
                emoji: "🗓️",
                value: movie.Year,
              }}
            />
          </Movie>
        ))}
      </ul>
    </Box>
  );
}

export default MovieList;
