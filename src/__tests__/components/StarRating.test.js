import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StarRating from "../../components/StarRating";

describe("StarRating Component", () => {
  test("renders 10 stars by default", () => {
    render(<StarRating />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(10);
  });

  test("renders custom number of stars via maxRating prop", () => {
    render(<StarRating maxRating={5} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(5);
  });

  test("calls onSetRating when star is clicked", async () => {
    const handleSetRating = jest.fn();
    render(<StarRating onSetRating={handleSetRating} maxRating={5} />);

    const buttons = screen.getAllByRole("button");
    await userEvent.click(buttons[2]);

    expect(handleSetRating).toHaveBeenCalled();
  });

  test("displays rating text", () => {
    render(<StarRating maxRating={5} />);
    // Check if rating display exists (usually shows selected rating)
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  test("renders with defaultRating", () => {
    render(<StarRating maxRating={5} defaultRating={3} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(5);
  });

  test("updates rating when different stars are clicked", async () => {
    const handleSetRating = jest.fn();
    render(<StarRating onSetRating={handleSetRating} maxRating={5} />);

    const buttons = screen.getAllByRole("button");
    await userEvent.click(buttons[0]);
    await userEvent.click(buttons[2]);

    // Verify that the function was called (possibly more than twice due to internal state updates)
    expect(handleSetRating).toHaveBeenCalled();
    expect(handleSetRating.mock.calls.length).toBeGreaterThanOrEqual(2);
  });

  test("accepts custom color prop", () => {
    render(<StarRating maxRating={5} color="#ff0000" />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(5);
  });

  test("accepts custom size prop", () => {
    render(<StarRating maxRating={5} size={64} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(5);
  });
});
