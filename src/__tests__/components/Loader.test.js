import { render, screen } from "@testing-library/react";
import Loader from "../../components/Loader";

describe("Loader Component", () => {
  test("renders loading text", () => {
    render(<Loader />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("has loader CSS class", () => {
    const { container } = render(<Loader />);
    const loaderElement = container.querySelector(".loader");
    expect(loaderElement).toBeInTheDocument();
  });

  test("has correct text content", () => {
    render(<Loader />);
    const loaderParagraph = screen.getByText("Loading...");
    expect(loaderParagraph.tagName).toBe("P");
  });

  test("wrapped in Box component", () => {
    const { container } = render(<Loader />);
    const boxElement = container.querySelector(".box");
    expect(boxElement).toBeInTheDocument();
  });
});
