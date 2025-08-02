// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const moo = require("moo");

const lexer = moo.compile({
    ws:     /[ \t]+/,
    number: {match:/[0-9]+/, value:(str)=>+str},
    times:  /\*/,
    divide: "/",
    plus: "+",
    minus: "-",
    equal: "=",
    notEqual: "!=",
});
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "start", "symbols": ["_", "equalComparison", "_"], "postprocess": d => d[1]},
    {"name": "start", "symbols": ["_", "notEqualComparison", "_"], "postprocess": d => d[1]},
    {"name": "equalComparison", "symbols": ["plusAndMinusOperation", "_", (lexer.has("equal") ? {type: "equal"} : equal), "_", "plusAndMinusOperation"], "postprocess": ([first, , , , second]) => first === second},
    {"name": "notEqualComparison", "symbols": ["plusAndMinusOperation", "_", (lexer.has("notEqual") ? {type: "notEqual"} : notEqual), "_", "plusAndMinusOperation"], "postprocess": ([first, , , , second]) => first != second},
    {"name": "plusAndMinusOperation", "symbols": ["plusAndMinusOperation", "_", (lexer.has("plus") ? {type: "plus"} : plus), "_", "timesAndDivideOperation"], "postprocess": ([first, , , , second]) => first + second},
    {"name": "plusAndMinusOperation", "symbols": ["plusAndMinusOperation", "_", (lexer.has("minus") ? {type: "minus"} : minus), "_", "timesAndDivideOperation"], "postprocess": ([first, , , , second]) => first - second},
    {"name": "plusAndMinusOperation", "symbols": ["timesAndDivideOperation"], "postprocess": id},
    {"name": "timesAndDivideOperation", "symbols": ["num", "_", (lexer.has("times") ? {type: "times"} : times), "_", "timesAndDivideOperation"], "postprocess": ([first, , , , second]) => first * second},
    {"name": "timesAndDivideOperation", "symbols": ["num", "_", (lexer.has("divide") ? {type: "divide"} : divide), "_", "timesAndDivideOperation"], "postprocess": ([first, , , , second]) => first / second},
    {"name": "timesAndDivideOperation", "symbols": ["num"], "postprocess": id},
    {"name": "num", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": d => d[0].value},
    {"name": "_$ebnf$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "_$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "_", "symbols": ["_$ebnf$1"]}
]
  , ParserStart: "start"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
