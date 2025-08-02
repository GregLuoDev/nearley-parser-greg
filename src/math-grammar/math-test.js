/* eslint-disable @typescript-eslint/no-require-imports */
const nearley = require("nearley");
const grammar = require("./math.js");

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

try {
   parser.feed("1+2=3");
   // parser.feed("1 +     2    = 3");
   // parser.feed(" 1 + 2 = 3 ");
   // parser.feed("6 = 10 / 2 + 1");
   // parser.feed("12 + 3 != 4 / 2 + 5");
   // parser.feed("2 + 3 * 2 = 10");
   // parser.feed("2 * 3 + 4 != 10");
   console.log("Parse succeeded! parser.results",JSON.stringify(parser.results))
   console.log("Parse succeeded! parser.results[0]",JSON.stringify(parser.results[0]))
} catch (error) {
   console.error("Parse failed. error.message:", error.message);
}

