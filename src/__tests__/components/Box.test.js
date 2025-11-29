import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Box from "../../components/Box";

describe("Box Component", () => {
  test("renders children by default", () => {
    render(
      <Box>
        <p>Test content</p>
      </Box>
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  test("has box CSS class", () => {
    render(<Box>Content</Box>);
    const boxElement = screen.getByText("Content");
    expect(boxElement).toBeInTheDocument();
  });

  test("toggle button shows minus sign initially", () => {
    render(<Box>Content</Box>);
    const toggleButton = screen.getByRole("button");
    expect(toggleButton).toHaveTextContent("–");
  });

  test("toggle button has btn-toggle CSS class", () => {
    render(<Box>Content</Box>);
    const toggleButton = screen.getByRole("button");
    expect(toggleButton).toBeInTheDocument();
  });

  test("hides children when toggle button is clicked", async () => {
    render(
      <Box>
        <p>Test content</p>
      </Box>
    );

    const toggleButton = screen.getByRole("button");
    await userEvent.click(toggleButton);

    expect(screen.queryByText("Test content")).not.toBeInTheDocument();
  });

  test("shows plus sign after clicking toggle", async () => {
    render(<Box>Content</Box>);

    const toggleButton = screen.getByRole("button");
    await userEvent.click(toggleButton);

    expect(toggleButton).toHaveTextContent("+");
  });

  test("shows children again after clicking toggle twice", async () => {
    render(
      <Box>
        <p>Test content</p>
      </Box>
    );

    const toggleButton = screen.getByRole("button");
    await userEvent.click(toggleButton);
    expect(screen.queryByText("Test content")).not.toBeInTheDocument();

    await userEvent.click(toggleButton);
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });
});
