"use client";

import { InputBoxAndParseButton } from "./components/InputBoxAndParseButton";
import { ParseAST } from "./components/ParseAST";
import { ParseError } from "./components/ParseError";
import { ParseResult } from "./components/ParseResult";
import { useMathematicalExpressionParser } from "./useMathematicalExpressionParser";

export function MathematicalExpressionParser() {
  const {
    handleKeyDown,
    handleChangeValue,
    parse,
    value,
    ast,
    result,
    error,
    syntaxError,
  } = useMathematicalExpressionParser();

  return (
    <div className="flex flex-col bg-gray-100 p-6 min-h-[600px] max-w-xl w-full">
      <h1 className="text-2xl font-bold text-gray-700">
        Mathematical Expressions Parser
      </h1>

      <InputBoxAndParseButton
        value={value}
        handleChangeValue={handleChangeValue}
        handleKeyDown={handleKeyDown}
        parse={parse}
      />

      <ParseResult result={result} />

      <ParseAST ast={ast} />

      <ParseError error={error} syntaxError={syntaxError} />
    </div>
  );
}
