import { render, screen } from "@testing-library/react";
import { ParseResult } from "./ParseResult"; // adjust path as needed

describe("ParseResult", () => {
  test("renders true result with green text", () => {
    render(<ParseResult result={true} />);
    const resultEl = screen.getByTestId("result");
    expect(resultEl).toBeInTheDocument();
    expect(resultEl).toHaveTextContent("true");
    expect(resultEl).toHaveClass("text-green-800");
  });

  test("renders false result with red text", () => {
    render(<ParseResult result={false} />);
    const resultEl = screen.getByTestId("result");
    expect(resultEl).toBeInTheDocument();
    expect(resultEl).toHaveTextContent("false");
    expect(resultEl).toHaveClass("text-red-800");
  });

  test("renders nothing when result is undefined", () => {
    render(<ParseResult result={undefined} />);
    const resultEl = screen.queryByTestId("result");
    expect(resultEl).not.toBeInTheDocument();
  });
});
