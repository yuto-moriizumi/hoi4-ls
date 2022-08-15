@{%
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
%}
@lexer lexer

root -> _ pairs _  {% (d) => d[1] %}

value -> number {% id %} | boolean {% id %} | quoted {% id %} | unquoted {% id %} | array {% id %} | object {% id %}

number -> %number {% (d) => parseFloat(d[0].value) %}
quoted -> %quoted {% (d) => JSON.parse(d[0].value) %}
unquoted -> %unquoted {% (d) => d[0].value %}
boolean -> "yes" {% () => true %} | "no" {% () => false %}

object -> "{" _ "}" {% () => {} %}
    | "{" root "}" {% (d) => d[1] %}

array -> "[" _ value (_ "," _ value):* _ "]" {% extractArray %}

pair -> key _ "=" _ value {% (d) => [d[0], d[4]] %}
pairs -> pair (%space pair):* {% extractPairs %}

key -> unquoted {% id %}

_ -> null | %space {% () => null %}

@{%

function extractPair(kv, output) {
    if(kv[0]) { output.push([kv[0], kv[1]]); }
}

function extractPairs(d) {
    let output = [];
    extractPair(d[0], output);
    for (let i in d[1]) {
        extractPair(d[1][i][1], output);
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

%}