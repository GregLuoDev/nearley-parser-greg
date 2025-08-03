import { render, screen } from "@testing-library/react";
import { ParseError } from "./ParseError"; // Adjust path

describe("ParseError", () => {
  test("renders both error and syntaxError messages", () => {
    render(
      <ParseError
        error="Failed to parse"
      />
    );

    expect(screen.getByTestId("error")).toHaveTextContent("Failed to parse");
  });


  test("renders nothing when error is empty", () => {
    render(<ParseError error=""/>);

    expect(screen.queryByTestId("error")).not.toBeInTheDocument();
  });
});
