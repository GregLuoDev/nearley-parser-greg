import { render, screen, fireEvent } from "@testing-library/react";
import { InputBoxAndParseButton } from "./InputBoxAndParseButton"; // adjust path
import "@testing-library/jest-dom";

describe("InputBoxAndParseButton", () => {
  const mockChange = jest.fn();
  const mockKeyDown = jest.fn();
  const mockParse = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders input with value and button", () => {
    render(
      <InputBoxAndParseButton
        value="2 + 2"
        handleChangeValue={mockChange}
        handleKeyDown={mockKeyDown}
        parse={mockParse}
      />
    );

    const input = screen.getByTestId("input") as HTMLInputElement;
    const button = screen.getByTestId("parser-button");

    expect(input).toBeInTheDocument();
    expect(input.value).toBe("2 + 2");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Parse");
  });

  test("calls handleChangeValue when input changes", () => {
    render(
      <InputBoxAndParseButton
        value=""
        handleChangeValue={mockChange}
        handleKeyDown={mockKeyDown}
        parse={mockParse}
      />
    );

    const input = screen.getByTestId("input");
    fireEvent.change(input, { target: { value: "3 * 4" } });

    expect(mockChange).toHaveBeenCalledTimes(1);
  });

  test("calls handleKeyDown on key press", () => {
    render(
      <InputBoxAndParseButton
        value=""
        handleChangeValue={mockChange}
        handleKeyDown={mockKeyDown}
        parse={mockParse}
      />
    );

    const input = screen.getByTestId("input");
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockKeyDown).toHaveBeenCalledTimes(1);
  });

  test("calls parse when button is clicked", () => {
    render(
      <InputBoxAndParseButton
        value=""
        handleChangeValue={mockChange}
        handleKeyDown={mockKeyDown}
        parse={mockParse}
      />
    );

    const button = screen.getByTestId("parser-button");
    fireEvent.click(button);

    expect(mockParse).toHaveBeenCalledTimes(1);
  });
});
