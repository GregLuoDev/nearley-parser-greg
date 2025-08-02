@{%
const moo = require("moo");

const lexer = moo.compile({
    ws:     /[ \t]+/,
    number: {match:/[0-9]+/, value:(str)=>+str},
    times:  "*",
    divide: "/",
    plus: "+",
    minus: "-",
    equal: "=",
    notEqual: "!=",
});
%}

@lexer lexer

start -> _ equalComparison _ {% d => d[1] %} | _ notEqualComparison _ {% d => d[1] %} 

equalComparison -> plusAndMinusOperation _ %equal _ plusAndMinusOperation {% ([first, , , , second]) => ({ type: "Equal Comparison", first, second, value: first.value == second.value }) %} 
notEqualComparison -> plusAndMinusOperation _ %notEqual _ plusAndMinusOperation {% ([first, , , , second]) => ({ type: "Not Equal Comparison", first, second, value: first.value != second.value }) %}

plusAndMinusOperation -> plusAndMinusOperation _ %plus _ timesAndDivideOperation {% ([first, , , , second]) => ({ type: "Addition", first, second, value: first.value + second.value }) %} 
                | plusAndMinusOperation _ %minus _ timesAndDivideOperation {% ([first, , , , second]) => ({ type: "Subtraction", first, second, value: first.value - second.value }) %} 
                | timesAndDivideOperation {% id %}

timesAndDivideOperation -> num _ %times _ timesAndDivideOperation {% ([first, , , , second]) => ({ type: "Multiply", first, second, value: first.value * second.value }) %} 
                | num _ %divide _ timesAndDivideOperation {% ([first, , , , second]) => ({ type: "Division", first, second, value: first.value / second.value }) %} 
                | num {% id %}  
                       
num -> %number {% d => ({ type: "Number", value: d[0].value }) %}                       
_ -> %ws:?
