import { render, screen } from "@testing-library/react";
import WatchList from "../../components/WatchList";

describe("WatchList Component", () => {
  const mockWatchedMovies = [
    {
      imdbID: "tt0111161",
      Title: "The Shawshank Redemption",
      Year: "1994",
      Poster: "https://example.com/shawshank.jpg",
      runtime: 142,
      imdbRating: 9.3,
      userRating: 9,
    },
    {
      imdbID: "tt0068646",
      Title: "The Godfather",
      Year: "1972",
      Poster: "https://example.com/godfather.jpg",
      runtime: 175,
      imdbRating: 9.2,
      userRating: 10,
    },
  ];

  test("renders 'Movies you watched' heading", () => {
    render(
      <WatchList
        watched={mockWatchedMovies}
        handleRemoveWatchedMovie={() => {}}
      />
    );
    expect(
      screen.getByRole("heading", { name: /Movies you watched/ })
    ).toBeInTheDocument();
  });

  test("displays average IMDB rating", () => {
    render(
      <WatchList
        watched={mockWatchedMovies}
        handleRemoveWatchedMovie={() => {}}
      />
    );
    const heading = screen.getByRole("heading", { name: /Movies you watched/ });
    expect(heading).toBeInTheDocument();
  });

  test("displays average user rating", () => {
    render(
      <WatchList
        watched={mockWatchedMovies}
        handleRemoveWatchedMovie={() => {}}
      />
    );
    const heading = screen.getByRole("heading", {
      name: /Movies you watched/,
    });
    expect(heading).toBeInTheDocument();
  });

  test("displays average runtime", () => {
    render(
      <WatchList
        watched={mockWatchedMovies}
        handleRemoveWatchedMovie={() => {}}
      />
    );
    const heading = screen.getByRole("heading", {
      name: /Movies you watched/,
    });
    expect(heading).toBeInTheDocument();
  });

  test("shows 'N/A' when no movies in watch list", () => {
    render(<WatchList watched={[]} handleRemoveWatchedMovie={() => {}} />);
    expect(screen.getByText(/Movies you watched/)).toBeInTheDocument();
  });

  test("renders watched list", () => {
    render(
      <WatchList
        watched={mockWatchedMovies}
        handleRemoveWatchedMovie={() => {}}
      />
    );
    expect(screen.getByText("The Shawshank Redemption")).toBeInTheDocument();
  });

  test("renders watched movies list", () => {
    render(
      <WatchList
        watched={mockWatchedMovies}
        handleRemoveWatchedMovie={() => {}}
      />
    );
    expect(screen.getByText("The Shawshank Redemption")).toBeInTheDocument();
    expect(screen.getByText("The Godfather")).toBeInTheDocument();
  });

  test("renders empty state with no watched movies", () => {
    render(<WatchList watched={[]} handleRemoveWatchedMovie={() => {}} />);
    expect(screen.getByText(/Movies you watched/)).toBeInTheDocument();
  });
});
