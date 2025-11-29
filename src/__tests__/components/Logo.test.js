import { render, screen } from "@testing-library/react";
import Logo from "../../components/Logo";

describe("Logo Component", () => {
  test("renders logo with popcorn emoji", () => {
    render(<Logo />);
    const emoji = screen.getByRole("img");
    expect(emoji).toHaveTextContent("🍿");
  });

  test("renders usePopcorn heading", () => {
    render(<Logo />);
    const heading = screen.getByRole("heading", { name: /usePopcorn/i });
    expect(heading).toBeInTheDocument();
  });

  test("has correct CSS class", () => {
    const { container } = render(<Logo />);
    const logoDiv = container.querySelector(".logo");
    expect(logoDiv).toBeInTheDocument();
  });
});
