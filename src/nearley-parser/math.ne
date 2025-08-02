@{%
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
%}

@lexer lexer

start -> _ equalComparison _ {% d => d[1] %} | _ notEqualComparison _ {% d => d[1] %} 

equalComparison -> plusAndMinusOperation _ %equal _ plusAndMinusOperation {% ([first, , , , second]) => first === second %} 
notEqualComparison -> plusAndMinusOperation _ %notEqual _ plusAndMinusOperation {% ([first, , , , second]) => first != second %}

plusAndMinusOperation -> plusAndMinusOperation _ %plus _ timesAndDivideOperation {% ([first, , , , second]) => first + second %} 
                | plusAndMinusOperation _ %minus _ timesAndDivideOperation {% ([first, , , , second]) => first - second %} 
                | timesAndDivideOperation {% id %}

timesAndDivideOperation -> num _ %times _ timesAndDivideOperation {% ([first, , , , second]) => first * second %} 
                | num _ %divide _ timesAndDivideOperation {% ([first, , , , second]) => first / second %} 
                | num {% id %}  
                       
num -> %number {% d => d[0].value %}                       
_ -> %ws:?
