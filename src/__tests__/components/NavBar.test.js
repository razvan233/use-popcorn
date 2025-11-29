import { render, screen } from "@testing-library/react";
import NavBar from "../../components/NavBar";

describe("NavBar Component", () => {
  test("renders nav element", () => {
    render(
      <NavBar>
        <p>Test content</p>
      </NavBar>
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  test("renders children", () => {
    render(
      <NavBar>
        <p>Test content</p>
      </NavBar>
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  test("has nav-bar CSS class", () => {
    render(
      <NavBar>
        <p>Test</p>
      </NavBar>
    );
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  test("renders multiple children", () => {
    render(
      <NavBar>
        <p>Child 1</p>
        <p>Child 2</p>
        <p>Child 3</p>
      </NavBar>
    );
    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
    expect(screen.getByText("Child 3")).toBeInTheDocument();
  });
});
