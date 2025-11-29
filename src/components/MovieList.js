import Movie from "./Movie";
import Box from "./Box";
import InfoAttribute from "./InfoAttribute";

function MovieList({ movies }) {
  return (
    <Box>
      <ul className="list">
        {movies?.map((movie) => (
          <Movie key={movie.imdbID} movie={movie}>
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
