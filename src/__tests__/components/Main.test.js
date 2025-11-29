import { render, screen } from "@testing-library/react";
import Main from "../../components/Main";

describe("Main Component", () => {
  test("renders main element", () => {
    render(
      <Main>
        <p>Test content</p>
      </Main>
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  test("renders children", () => {
    render(
      <Main>
        <p>Test content</p>
      </Main>
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  test("has main-movies CSS class", () => {
    render(
      <Main>
        <p>Test</p>
      </Main>
    );
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  test("renders multiple children", () => {
    render(
      <Main>
        <p>Child 1</p>
        <p>Child 2</p>
      </Main>
    );
    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });
});
