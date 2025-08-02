import { ChangeEvent, useState } from "react";
import { IAst } from "./type";
import nearley from "nearley";
import grammar from "../math-grammar/math.js";

export function useMathematicalExpressionParser() {
  const [value, setValue] = useState("");
  const [ast, setAst] = useState<IAst | null>(null);
  const result = ast?.value;
  const [error, setError] = useState("");
  const [syntaxError, setSyntaxError] = useState("");

  const errorMessage =
    "Parse failed.\nThis parser can handle both arithmetic operations and comparison operators, following the rules of operator precedence and proper evaluation.\nPlease check your input.";
  const parser = new nearley.Parser(
    nearley.Grammar.fromCompiled(grammar as nearley.CompiledRules)
  );

  function parse() {
    try {
      parser.feed(value);

      const results = parser.results;
      if (results.length) {
        setAst(results[0]);
        setError("");
        setSyntaxError("");
      } else {
        setError(errorMessage);
        setSyntaxError(`Your input ${value} is not a mathematical expression`);
      }
    } catch (error: unknown) {
      let message = "Parse failed. ";
      if (error instanceof Error) {
        message += "Error.message:" + error.message;
        const syntaxError = error.message.substring(
          0,
          error.message.indexOf("Instead, I was expecting to see")
        );
        setSyntaxError(syntaxError);
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

  function handleChangeValue(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return {
    handleKeyDown,
    handleChangeValue,
    parse,
    value,
    ast,
    result,
    error,
    syntaxError,
  };
}
