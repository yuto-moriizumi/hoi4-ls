// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "input", "symbols": ["value"], "postprocess": id},
    {"name": "value", "symbols": ["number"], "postprocess": id},
    {"name": "value", "symbols": ["boolean"], "postprocess": id},
    {"name": "value", "symbols": ["quoted"], "postprocess": id},
    {"name": "value", "symbols": ["standard_characters"], "postprocess": (data, _, reject) => data[0] === "yes" ? reject : `"${data[0]}"`},
    {"name": "value", "symbols": ["array"], "postprocess": id},
    {"name": "number", "symbols": ["digits", {"literal":"."}, "digits"], "postprocess": (data) => Number(data.join(""))},
    {"name": "number", "symbols": ["digits"], "postprocess": (data) => Number(data.join(""))},
    {"name": "digits", "symbols": ["digit"], "postprocess": id},
    {"name": "digits", "symbols": ["digit", "digits"], "postprocess": (data) => Number(data.join(""))},
    {"name": "digit", "symbols": [/[0-9]/], "postprocess": id},
    {"name": "boolean$string$1", "symbols": [{"literal":"y"}, {"literal":"e"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "boolean", "symbols": ["boolean$string$1"], "postprocess": () => true},
    {"name": "boolean$string$2", "symbols": [{"literal":"n"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "boolean", "symbols": ["boolean$string$2"], "postprocess": () => false},
    {"name": "quoted", "symbols": [{"literal":"\""}, "any_characters", {"literal":"\""}], "postprocess": (data) => data[1]},
    {"name": "any_characters", "symbols": ["any_character"], "postprocess": id},
    {"name": "any_characters", "symbols": ["any_character", "any_characters"], "postprocess": (data) => data[0] + data[1]},
    {"name": "any_character", "symbols": [/[^\"]/]},
    {"name": "standard_characters", "symbols": ["standard_character"], "postprocess": id},
    {"name": "standard_characters", "symbols": ["standard_character", "standard_characters"], "postprocess": (data) => data[0] + data[1]},
    {"name": "standard_character", "symbols": [/[a-zA-Z]/]},
    {"name": "array", "symbols": [{"literal":"["}, "array_items", {"literal":"]"}], "postprocess": (data) => data[1]},
    {"name": "array_items", "symbols": ["value"], "postprocess": (data) => [data[0]]},
    {"name": "array_items", "symbols": ["value", {"literal":","}, "array_items"], "postprocess": (data) => [data[0], ...data[2]]}
]
  , ParserStart: "input"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
