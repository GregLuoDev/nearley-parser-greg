"use client";

import { ExpressionTree } from "./components/ExpressionTree";
import { InputBoxAndParseButton } from "./components/InputBoxAndParseButton";
import { ASTView } from "./components/ASTView";
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
  } = useMathematicalExpressionParser();

  return (
    <>
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

      <ExpressionTree ast={ast} />
      <ASTView ast={ast} />

      <ParseError error={error} />
    </>
  );
}
