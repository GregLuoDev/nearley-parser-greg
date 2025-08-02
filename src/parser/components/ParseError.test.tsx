import { render, screen } from "@testing-library/react";
import { ParseError } from "./ParseError"; // Adjust path

describe("ParseError", () => {
  test("renders both error and syntaxError messages", () => {
    render(
      <ParseError
        error="Failed to parse"
        syntaxError="Syntax error near '+'"
      />
    );

    expect(screen.getByTestId("error")).toHaveTextContent("Failed to parse");
    expect(screen.getByText("Syntax error near '+'")).toBeInTheDocument();
  });

  test("renders only error when syntaxError is empty", () => {
    render(<ParseError error="Something went wrong" syntaxError="" />);

    expect(screen.getByTestId("error")).toHaveTextContent(
      "Something went wrong"
    );
    expect(screen.queryByText("Syntax error near")).not.toBeInTheDocument();
  });

  test("renders nothing when error is empty", () => {
    render(<ParseError error="" syntaxError="Some syntax problem" />);

    expect(screen.queryByTestId("error")).not.toBeInTheDocument();
    expect(screen.queryByText("Some syntax problem")).not.toBeInTheDocument();
  });
});
