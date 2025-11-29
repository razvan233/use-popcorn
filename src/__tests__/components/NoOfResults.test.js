import { render, screen } from "@testing-library/react";
import NoOfResults from "../../components/NoOfResults";

describe("NoOfResults Component", () => {
  test("displays correct number of results", () => {
    render(<NoOfResults moviesLength={5} />);
    expect(screen.getByText(/Found/)).toHaveTextContent("5");
  });

  test("displays zero results", () => {
    render(<NoOfResults moviesLength={0} />);
    expect(screen.getByText(/Found/)).toHaveTextContent("0");
  });

  test("displays large number of results", () => {
    render(<NoOfResults moviesLength={250} />);
    expect(screen.getByText(/Found/)).toHaveTextContent("250");
  });

  test("displays 'Found' and 'results' text", () => {
    render(<NoOfResults moviesLength={10} />);
    const text = screen.getByText(/Found/);
    expect(text).toHaveTextContent("Found");
    expect(text).toHaveTextContent("results");
  });

  test("has num-results CSS class", () => {
    const { container } = render(<NoOfResults moviesLength={3} />);
    const element = container.querySelector(".num-results");
    expect(element).toBeInTheDocument();
  });
});
