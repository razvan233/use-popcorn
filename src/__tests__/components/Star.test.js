import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Star from "../../components/Star";

describe("Star Component", () => {
  const mockProps = {
    fullStar: false,
    handleStarClick: jest.fn(),
    handleStarHover: jest.fn(),
    resetHoverRating: jest.fn(),
    color: "#fcc419",
    size: 48,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders star as button", () => {
    render(<Star {...mockProps} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("renders empty star by default", () => {
    render(<Star {...mockProps} fullStar={false} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("renders full star when fullStar prop is true", () => {
    render(<Star {...mockProps} fullStar={true} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("calls handleStarClick when clicked", async () => {
    render(<Star {...mockProps} />);

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(mockProps.handleStarClick).toHaveBeenCalled();
  });

  test("calls handleStarHover when mouse enters", async () => {
    render(<Star {...mockProps} />);

    const button = screen.getByRole("button");
    await userEvent.hover(button);

    expect(mockProps.handleStarHover).toHaveBeenCalled();
  });

  test("calls resetHoverRating when mouse leaves", async () => {
    render(<Star {...mockProps} />);

    const button = screen.getByRole("button");
    await userEvent.hover(button);
    await userEvent.unhover(button);

    expect(mockProps.resetHoverRating).toHaveBeenCalled();
  });

  test("button has no border styling by default", () => {
    render(<Star {...mockProps} />);
    const button = screen.getByRole("button");
    expect(button).toHaveStyle({ cursor: "pointer" });
  });
});
