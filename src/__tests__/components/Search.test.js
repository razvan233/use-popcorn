import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "../../components/Search";

describe("Search Component", () => {
  test("renders search input field", () => {
    render(<Search onSearch={() => {}} />);
    const input = screen.getByPlaceholderText("Search movies...");
    expect(input).toBeInTheDocument();
  });

  test("has search CSS class", () => {
    render(<Search onSearch={() => {}} />);
    const searchInput = screen.getByPlaceholderText("Search movies...");
    expect(searchInput).toBeInTheDocument();
  });

  test("calls onSearch when input value changes", async () => {
    const handleSearch = jest.fn();
    render(<Search onSearch={handleSearch} />);

    const input = screen.getByPlaceholderText("Search movies...");
    await userEvent.type(input, "The Matrix");

    expect(handleSearch).toHaveBeenCalledWith("T");
    expect(handleSearch).toHaveBeenCalledWith("The Matrix");
  });

  test("calls onSearch when Enter key is pressed", async () => {
    const handleSearch = jest.fn();
    render(<Search onSearch={handleSearch} query="" />);

    const input = screen.getByPlaceholderText("Search movies...");
    await userEvent.type(input, "Inception{Enter}");

    expect(handleSearch).toHaveBeenCalled();
  });

  test("input type is text", () => {
    render(<Search onSearch={() => {}} />);
    const input = screen.getByPlaceholderText("Search movies...");
    expect(input).toHaveAttribute("type", "text");
  });

  test("placeholder text is correct", () => {
    render(<Search onSearch={() => {}} />);
    const input = screen.getByPlaceholderText("Search movies...");
    expect(input).toHaveAttribute("placeholder", "Search movies...");
  });
});
