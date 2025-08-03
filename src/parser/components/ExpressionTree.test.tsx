import React from "react";
import { render, screen } from "@testing-library/react";
import { ExpressionTree } from "./ExpressionTree";
import { IAst } from "../type";

const mockAst: IAst = {
  type: "Equal Comparison",
  first: {
    type: "Multiply",
    first: {
      type: "Number",
      value: 2,
    },
    second: {
      type: "Number",
      value: 3,
    },
    value: 6,
  },
  second: {
    type: "Number",
    value: 6,
  },
  value: true,
};

describe("ExpressionTree", () => {
  it("should not render anything if ast is null", () => {
    const { container } = render(<ExpressionTree ast={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("should render the SVG and Expression Tree heading when ast is provided", () => {
    render(<ExpressionTree ast={mockAst} />);

    expect(screen.getByText("Expression Tree")).toBeInTheDocument();

    const svg = screen.getByRole("img");
    expect(svg).toBeInTheDocument();
  });

  it("should render D3-generated nodes in the SVG", () => {
    const { container } = render(<ExpressionTree ast={mockAst} />);

    const circles = container.querySelectorAll("circle");
    const texts = container.querySelectorAll("text");

    expect(circles.length).toBeGreaterThan(0);
    expect(texts.length).toBeGreaterThan(0);

    const labelFound = Array.from(texts).some((text) =>
      text.textContent?.includes("Equal Comparison")
    );
    expect(labelFound).toBe(true);
  });
});
