"use client";

import { useState } from "react";
import nearley from "nearley";
import grammar from "../math-grammar/math.js"; // compiled grammar
import { IAst } from "./type.js";

export function MathematicalExpressionParser() {
  const [value, setValue] = useState("");
  const [ast, setAst] = useState<IAst | null>(null);
  const result = ast?.value;
  const [error, setError] = useState("");

  const parser = new nearley.Parser(
    nearley.Grammar.fromCompiled(grammar as nearley.CompiledRules)
  );
  const errorMessage =
    "Parse failed.\nThis parser can handle both arithmetic operations and comparison operators, following the rules of operator precedence and proper evaluation.\nPlease check your input.";

  function parse() {
    try {
      parser.feed(value);

      const results = parser.results;
      if (results.length) {
        setAst(results[0]);
        setError("");
      } else {
        setError(errorMessage);
      }
    } catch (error: unknown) {
      let message = "Parse failed. ";
      if (error instanceof Error) {
        message += "Error.message:" + error.message;
      } else {
        message += JSON.stringify(error);
      }
      console.error(message);

      setError(errorMessage);
      setAst(null);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      parse();
    }
  }

  return (
    <div className="flex flex-col bg-gray-100 p-6 min-h-[600px] max-w-xl w-full">
      <h1 className="text-2xl font-bold text-gray-700">
        Mathematical Expressions Parser
      </h1>

      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full max-w-xl mx-auto mt-6">
        <input
          type="text"
          value={value}
          placeholder="Type your mathematical expression"
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          data-testid="input"
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={parse}
          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition w-full sm:w-auto"
          data-testid="parser-button"
        >
          Parse
        </button>
      </div>

      {(result === true || result === false) && (
        <div className="mt-6 bg-green-100  border border-green-300 rounded-lg px-4 py-3 shadow">
          <span>Parsing Result:</span>{" "}
          <b
            className={`${result ? "text-green-800" : "text-red-800"}`}
            data-testid="result"
          >
            {result?.toString()}
          </b>
        </div>
      )}

      {ast && (
        <pre className="mt-6 bg-gray-100 rounded text-sm overflow-x-auto">
          <b>AST:</b>{" "}
          <div data-testid="ast">{JSON.stringify(ast, null, 4)}</div>
        </pre>
      )}

      {error && (
        <div className="mt-6 w-full bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 shadow whitespace-pre-line">
          <b>Error:</b> <div data-testid="error">{error}</div>
        </div>
      )}
    </div>
  );
}
