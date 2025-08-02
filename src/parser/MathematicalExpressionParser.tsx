"use client";

import { useState } from "react";

import nearley from "nearley";
import grammar from "../math-grammar/math.js"; // compiled grammar
import { log } from "console";

export function MathematicalExpressionParser() {
  const [value, setValue] = useState("");
  const [ast, setAst] = useState<any>(null);
  const result = ast?.value;
  const [error, setError] = useState("");

  console.log("=====",result)

  const parser = new nearley.Parser(
    nearley.Grammar.fromCompiled(grammar as any)
  );

  function parse() {
    try {
      parser.feed(value);

      console.log(
        "Parse succeeded! parser.results",
        JSON.stringify(parser.results)
      );
      console.log(
        "Parse succeeded! parser.results[0]",
        JSON.stringify(parser.results[0])
      );

      const results = parser.results;
      if (results.length) {
        setAst(results[0]);
        setError("");
      } else {
        setError("Cannot parse this expression!");
      }
    } catch (error: any) {
      const message = "Parse failed. error.message:" + error.message;
      console.error(message);
      setError(`Parse failed.\nThis parser can  handle both arithmetic operations and comparison operators, adhering to the rules of operator precedence and proper evaluation. \nPlease check your input.`);
      setAst(null);
    }
  }

  return (
    <div className="flex flex-col bg-gray-100 p-6 min-h-[600px]">
      <h1 className="text-2xl font-bold text-gray-700">
        Mathematical Expressions Parser
      </h1>

      <div className="flex flex-row items-center gap-4 mt-6">
        <input
          type="text"
          value={value}
          placeholder="Type your mathematical expression"
          onChange={(e) => setValue(e.target.value)}
          className="w-full w-lg px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          data-testid='input'
        />

        <button
          onClick={parse}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Parse
        </button>
      </div>

      {(result === true || result===false) && (
        <div className="mt-6 bg-green-100  border border-green-300 rounded-lg px-4 py-3 shadow">
          <span>Parsing Result:</span> <b className={`${result? 'text-green-800':'text-red-800'}`} data-testid='result'>{result?.toString()}</b>
        </div>
      )}

      {ast && (
        <pre className="mt-6 bg-gray-100 rounded text-sm overflow-x-auto">
          <b>AST:</b> <div  data-testid='ast'>{JSON.stringify(ast, null, 2)}</div>
        </pre>
      )}

      {error && (
        <div className="mt-6 w-full bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 shadow whitespace-pre-line">
          <b>Error:</b> <div data-testid='error'>{error}</div>
        </div>
      )}
    </div>
  );
}
