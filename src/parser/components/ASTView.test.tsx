import { render, screen } from "@testing-library/react";
import { ASTView } from "./ASTView"; 

describe("ParseAST", () => {
  test("renders AST when provided", () => {
    const sampleAst = {
      type: "Addition",
      first: { type: "Number", value: 1 },
      second: { type: "Number", value: 2 },
      value: 3,
    };

    render(<ASTView ast={sampleAst} />);

    const astEl = screen.getByTestId("ast");
    expect(astEl).toBeInTheDocument();
    expect(astEl).toHaveTextContent("Addition");
  });

  test("does not render anything when ast is null", () => {
    render(<ASTView ast={null} />);

    const astEl = screen.queryByTestId("ast");
    expect(astEl).not.toBeInTheDocument();
  });
});
