"use client";

import { useState } from "react";

import nearley from "nearley";
import grammar from "../math-grammar/math.js"; // compiled grammar

export function Parser() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<boolean|null>(null);
  const [error, setError] = useState("");

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
        setResult(results[0]);
        setError("");
      } else {
        setError("Cannot parse this expression!");
      }
    } catch (error: any) {
      const message = "Parse failed. error.message:" + error.message;
      console.error(message);
      setError(message);
      setResult(null);
    }
  }

  function handleClick(): void {
    parse();
  }

  return (
    <div className="flex flex-col items-center  min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">
        Mathematical Expressions Parser
      </h1>

      <input
        type="text"
        value={value}
        placeholder="Type your mathematical expression"
        onChange={(e) => setValue(e.target.value)}
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />

      <button
        onClick={handleClick}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Parse
      </button>

      {result!==null && (
        <div className="mt-6 w-full max-w-md bg-green-100 text-green-800 border border-green-300 rounded-lg px-4 py-3 shadow">
          <strong>Result:</strong> {result?.toString()}
        </div>
      )}

      {error && (
        <div className="mt-4 w-full max-w-md bg-red-100 text-red-800 border border-red-300 rounded-lg px-4 py-3 shadow">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}
