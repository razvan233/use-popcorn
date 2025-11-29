function Movie({ movie, children, onMovieSelect }) {
  return (
    <li
      onClick={
        onMovieSelect
          ? () =>
              onMovieSelect((prevID) =>
                prevID === movie.imdbID ? null : movie.imdbID
              )
          : (e) => {
              e.stopPropagation();
              e.preventDefault();
            }
      }
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      {children}
    </li>
  );
}

export default Movie;
