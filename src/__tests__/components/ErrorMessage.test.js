import { render, screen } from "@testing-library/react";
import ErrorMessage from "../../components/ErrorMessage";

describe("ErrorMessage Component", () => {
  test("renders error message with emoji", () => {
    render(<ErrorMessage message="Test error" />);
    expect(screen.getByText(/❌/)).toBeInTheDocument();
  });

  test("displays the error message text", () => {
    const errorMsg = "Movie not found";
    render(<ErrorMessage message={errorMsg} />);
    expect(screen.getByText(new RegExp(errorMsg))).toBeInTheDocument();
  });

  test("has error CSS class", () => {
    const { container } = render(<ErrorMessage message="Error occurred" />);
    const errorElement = container.querySelector(".error");
    expect(errorElement).toBeInTheDocument();
  });

  test("renders different error messages", () => {
    const { rerender } = render(<ErrorMessage message="Error 1" />);
    expect(screen.getByText(/Error 1/)).toBeInTheDocument();

    rerender(<ErrorMessage message="Error 2" />);
    expect(screen.getByText(/Error 2/)).toBeInTheDocument();
  });

  test("wrapped in Box component (has box class)", () => {
    const { container } = render(<ErrorMessage message="Test" />);
    const boxElement = container.querySelector(".box");
    expect(boxElement).toBeInTheDocument();
  });
});
