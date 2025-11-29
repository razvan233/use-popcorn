import { average } from "../../utils/functions";

describe("average utility function", () => {
  test("calculates average of positive numbers", () => {
    const result = average([10, 20, 30]);
    expect(result).toBeCloseTo(20, 1);
  });

  test("calculates average of single number", () => {
    const result = average([5]);
    expect(result).toBeCloseTo(5, 1);
  });

  test("calculates average of decimal numbers", () => {
    const result = average([1.5, 2.5, 3.5]);
    expect(result).toBeCloseTo(2.5, 1);
  });

  test("calculates average of negative numbers", () => {
    const result = average([-10, -20, -30]);
    expect(result).toBeCloseTo(-20, 1);
  });

  test("calculates average with mixed positive and negative", () => {
    const result = average([-5, 0, 5]);
    expect(result).toBeCloseTo(0, 1);
  });

  test("calculates average of two numbers", () => {
    const result = average([10, 20]);
    expect(result).toBeCloseTo(15, 1);
  });

  test("handles zeros in array", () => {
    const result = average([0, 0, 0]);
    expect(result).toBeCloseTo(0, 1);
  });

  test("calculates average correctly with large numbers", () => {
    const result = average([1000, 2000, 3000]);
    expect(result).toBeCloseTo(2000, 1);
  });
});
