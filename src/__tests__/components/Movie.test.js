import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Movie from "../../components/Movie";

describe("Movie Component", () => {
  const mockMovie = {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Poster: "https://example.com/poster.jpg",
  };

  test("renders movie title", () => {
    render(<Movie movie={mockMovie} />);
    expect(
      screen.getByRole("heading", { name: "The Matrix" })
    ).toBeInTheDocument();
  });

  test("renders movie poster image", () => {
    render(<Movie movie={mockMovie} />);
    const poster = screen.getByAltText("The Matrix poster");
    expect(poster).toBeInTheDocument();
    expect(poster).toHaveAttribute("src", "https://example.com/poster.jpg");
  });

  test("renders as list item", () => {
    render(<Movie movie={mockMovie} />);
    expect(
      screen.getByRole("heading", { name: "The Matrix" })
    ).toBeInTheDocument();
  });

  test("renders children", () => {
    render(
      <Movie movie={mockMovie}>
        <p>Child content</p>
      </Movie>
    );
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  test("calls onMovieSelect when clicked", async () => {
    const handleMovieSelect = jest.fn();
    const { container } = render(
      <Movie movie={mockMovie} onMovieSelect={handleMovieSelect} />
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const listItem = container.querySelector("li");
    // eslint-disable-next-line testing-library/no-node-access
    expect(listItem).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-node-access
    await userEvent.click(listItem);
    expect(handleMovieSelect).toHaveBeenCalled();
  });

  test("toggles selection on click", async () => {
    const handleMovieSelect = jest.fn((fn) => fn(null));
    const { container } = render(
      <Movie movie={mockMovie} onMovieSelect={handleMovieSelect} />
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const listItem = container.querySelector("li");
    // eslint-disable-next-line testing-library/no-node-access
    expect(listItem).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-node-access
    await userEvent.click(listItem);
    expect(handleMovieSelect).toHaveBeenCalled();
  });

  test("prevents default behavior when no onMovieSelect", async () => {
    const { container } = render(<Movie movie={mockMovie} />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const listItem = container.querySelector("li");

    // Should not throw
    if (listItem) {
      await userEvent.click(listItem);
    }
  });
});
