// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const moo = require('moo');
const lexer = moo.compile({
    space: {match: /\s+/, lineBreaks: true},
    number: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,
    quoted: /"(?:\\["bfnrt\/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/,
    '{': '{',
    '}': '}',
    '[': '[',
    ']': ']',
    '=': '=',
    yes: 'yes',
    no: 'no',
    unquoted: /(?:[^"\\\n\s])+/,
});



function extractPair(kv, output) {
    if(kv[0]) { output[kv[0]] = kv[1]; }
}

function extractPairs(d) {
    let output = {};
    extractPair(d[0], output);
    for (let i in d[1]) {
        extractPair(d[1][i][1], output);
    }
    return output;
}

function extractObject(d) {
    let output = {};

    extractPair(d[2], output);

    for (let i in d[3]) {
        extractPair(d[3][i][3], output);
    }

    return output;
}

function extractArray(d) {
    let output = [d[2]];

    for (let i in d[3]) {
        output.push(d[3][i][3]);
    }

    return output;
}

var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "input", "symbols": ["_", "pairs", "_"], "postprocess": (d) => d[1]},
    {"name": "value", "symbols": ["number"], "postprocess": id},
    {"name": "value", "symbols": ["boolean"], "postprocess": id},
    {"name": "value", "symbols": ["quoted"], "postprocess": id},
    {"name": "value", "symbols": ["unquoted"], "postprocess": id},
    {"name": "value", "symbols": ["array"], "postprocess": id},
    {"name": "value", "symbols": ["object"], "postprocess": id},
    {"name": "number", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": (d) => parseFloat(d[0].value)},
    {"name": "quoted", "symbols": [(lexer.has("quoted") ? {type: "quoted"} : quoted)], "postprocess": (d) => JSON.parse(d[0].value)},
    {"name": "unquoted", "symbols": [(lexer.has("unquoted") ? {type: "unquoted"} : unquoted)], "postprocess": (d) => d[0].value},
    {"name": "boolean", "symbols": [{"literal":"yes"}], "postprocess": () => true},
    {"name": "boolean", "symbols": [{"literal":"no"}], "postprocess": () => false},
    {"name": "object", "symbols": [{"literal":"{"}, "_", {"literal":"}"}], "postprocess": () => {}},
    {"name": "object", "symbols": [{"literal":"{"}, "_", "pairs", "_", {"literal":"}"}], "postprocess": (d) => d[2]},
    {"name": "array$ebnf$1", "symbols": []},
    {"name": "array$ebnf$1$subexpression$1", "symbols": ["_", {"literal":","}, "_", "value"]},
    {"name": "array$ebnf$1", "symbols": ["array$ebnf$1", "array$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "array", "symbols": [{"literal":"["}, "_", "value", "array$ebnf$1", "_", {"literal":"]"}], "postprocess": extractArray},
    {"name": "pair", "symbols": ["key", "_", {"literal":"="}, "_", "value"], "postprocess": (d) => [d[0], d[4]]},
    {"name": "pairs$ebnf$1", "symbols": []},
    {"name": "pairs$ebnf$1$subexpression$1", "symbols": [(lexer.has("space") ? {type: "space"} : space), "pair"]},
    {"name": "pairs$ebnf$1", "symbols": ["pairs$ebnf$1", "pairs$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "pairs", "symbols": ["pair", "pairs$ebnf$1"], "postprocess": extractPairs},
    {"name": "key", "symbols": ["unquoted"], "postprocess": id},
    {"name": "_", "symbols": []},
    {"name": "_", "symbols": [(lexer.has("space") ? {type: "space"} : space)], "postprocess": () => null}
]
  , ParserStart: "input"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
