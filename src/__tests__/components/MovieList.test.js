import { render, screen } from "@testing-library/react";
import MovieList from "../../components/MovieList";

describe("MovieList Component", () => {
  const mockMovies = [
    {
      imdbID: "tt0111161",
      Title: "The Shawshank Redemption",
      Year: "1994",
      Type: "movie",
      Poster: "https://example.com/shawshank.jpg",
    },
    {
      imdbID: "tt0068646",
      Title: "The Godfather",
      Year: "1972",
      Type: "movie",
      Poster: "https://example.com/godfather.jpg",
    },
  ];

  test("renders list element", () => {
    render(<MovieList movies={mockMovies} onMovieSelect={() => {}} />);
    const listItems = screen.getAllByRole("heading");
    expect(listItems.length).toBeGreaterThan(0);
  });

  test("renders all movies", () => {
    render(<MovieList movies={mockMovies} onMovieSelect={() => {}} />);
    expect(screen.getByText("The Shawshank Redemption")).toBeInTheDocument();
    expect(screen.getByText("The Godfather")).toBeInTheDocument();
  });

  test("renders correct number of movies", () => {
    render(<MovieList movies={mockMovies} onMovieSelect={() => {}} />);
    const headings = screen.getAllByRole("heading");
    expect(headings).toHaveLength(2);
  });

  test("renders empty list when no movies provided", () => {
    render(<MovieList movies={[]} onMovieSelect={() => {}} />);
    const headings = screen.queryAllByRole("heading");
    expect(headings).toHaveLength(0);
  });

  test("renders movie posters", () => {
    render(<MovieList movies={mockMovies} onMovieSelect={() => {}} />);
    const posters = screen.getAllByAltText(/poster/);
    expect(posters).toHaveLength(2);
  });
});
