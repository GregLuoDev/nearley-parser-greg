import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MathematicalExpressionParser } from "./MathematicalExpressionParser";

describe("MathematicalExpressionParser should render correctly", () => {
  beforeEach(() => {
    render(<MathematicalExpressionParser />);
  });

  test("should match snapshot", () => {
    const { container } = render(<MathematicalExpressionParser />);
    expect(container).toMatchSnapshot();
  });

  test("renders input box and parser button", () => {
    const input = screen.getByTestId("input");
    const button = screen.getByTestId("parser-button");

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});

describe("MathematicalExpressionParser shows result and AST for valid expressions without error", () => {
  beforeEach(() => {
    render(<MathematicalExpressionParser />);
  });

  test.each([
    ["1+2=3", true],
    [" 1+2=3 ", true],
    ["1 + 2 = 3", true],
    ["   1   +   2   = 3   ", true],
    ["6 = 10 / 2 + 1", true],
    ["12 + 3 != 4 / 2 + 5", true],
    ["2 + 3 * 2 = 10", false],
    ["2 * 3 + 4 != 10", false],
    [" 10 - 4 = 100 / 10 - 10 + 3 * 2 ", true],
    ["10 - 4 != 100 / 10 - 10 + 3 * 2 ", false],
    [" 10 - 4 != 100 / 10 - 10 + 3 * 2 +1", true],
    [" 2 * 3 + 4 = 20 - 5 -10 + 3 + 2 * 1 ", true],
    ["2 * 3 + 4 != 20 - 5 -10 + 3 + 2 * 1 ", false],
    [" 2 * 3 + 4 != 20 - 5 -10 + 3 + 2 * 1 +1", true],
    [" 8 / 2 = 2 * 2 ", true],
    ["8 / 2 != 2 * 2 ", false],
    [" 8 / 2 != 2 * 2 +1", true],
  ])("parses '%s' to be %s with result and AST.", async (expression, expectedResult) => {
    const input = screen.getByTestId("input");
    const button = screen.getByTestId("parser-button");

    fireEvent.change(input, { target: { value: expression } });
    fireEvent.click(button);

    const result = await screen.findByTestId("result");
    const ast = await screen.findByTestId("ast");

    expect(result).toBeInTheDocument();
    expect(result).toHaveTextContent(expectedResult.toString());
    expect(ast).toBeInTheDocument();

    const error = screen.queryByTestId("error");
    expect(error).not.toBeInTheDocument();
  });
});

describe("MathematicalExpressionParser shows error for invalid expressions without result and AST.", () => {
  beforeEach(() => {
    render(<MathematicalExpressionParser />);
  });

  test.each([
    [""],
    ["  "],
    ["123"],
    ["#1+2=3"],
    [" 1+(2=3 "],
    ["1 + 2 = 3*"],
    ["   1   +   2   =    "],
    ["^6 = 10 / 2 + 1"],
    ["12 + 3 != 4 / 2 + 5%"],
    ["2 + 3 * 2 = 10="],
    ["*2 * 3 + 4 != 10"],
    [" 10  4 = 100 / 10 - 10 + 3 * 2 "],
    [" 10 - 4 !3= 100 / 10 - 10 + 3 * 2 "],
    [" 10 - 4 != 100 / 10  10 + 3 * 2 +1"],
    [" 2 * 3 + 4 = 20 - 5 --10 + 3 + 2 * 1 "],
    [" 2 * 3 + 4 != 20 - 5 -10 + 3 + 2 * 1 * "],
    [" 2 * 3 + 4 != 20 - 5 -10 + 3 + 2 * 1 +1 $"],
    [" 8 / 2  2 * 2 "],
    [" 8  2 != 2 * 2 "],
    ["- 8 / 2 != 2 * 2 +1"],
  ])("parses '%s' failed with error message without result and AST", async (expression) => {
    const input = screen.getByTestId("input");
    const button = screen.getByTestId("parser-button");

    fireEvent.change(input, { target: { value: expression } });
    fireEvent.click(button);

    const error = await screen.findByTestId("error");

    expect(error).toBeInTheDocument();
    expect(error.textContent).toMatch(/Parse failed/i);

    const result = screen.queryByTestId("result");
    const ast = screen.queryByTestId("ast");
    expect(result).not.toBeInTheDocument();
    expect(ast).not.toBeInTheDocument();
  });
});
