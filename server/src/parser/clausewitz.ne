@{%
const moo = require('moo');
const lexer = moo.compile({
    space: { match: /\s+/, lineBreaks: true },
    number: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,
    quoted: /"(?:\\["bfnrt\/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/,
    '{': '{',
    '}': '}',
    '[': '[',
    ']': ']',
    '=': '=',
    yes: 'yes',
    no: 'no',
    unquoted: /(?:[^"\\\n\s#=])+/,
    comment: /#.*$/,
});
%}
@lexer lexer

# input -> comments:? root {% (d) => [d[0],d[1]] %}

root -> _ pairs _  {% extractRoot %}

value -> number {% id %} | boolean {% id %} | quoted {% id %} | unquoted {% id %} | array {% id %} | object {% id %}

number -> %number {% (d) => parseFloat(d[0].value) %}
quoted -> %quoted {% (d) => JSON.parse(d[0].value) %}
unquoted -> %unquoted {% (d) => d[0].value %}
boolean -> "yes" {% () => true %} | "no" {% () => false %}

object -> "{" _ "}" {% (d) => d[0] ? [d[0]] : [] %}
    | "{" root "}" {% (d) => d[1] %}

array -> "[" _ value (_ "," _ value):* _ "]" {% extractArray %}

pair -> unquoted _ "=" _ value {% (d) => [d[0], d[4]] %}
pairs -> pair (__ pair):* {% extractPairs %}

# comment -> %comment {% (d) => ["comment", d[0].value] %}
comment -> %comment {% (d) => d[0] %}

# Null allowed space
_ -> null | __ {% (d) => d[0] || null %} 

# Non-null space
__ -> %space {% () => null %} | _ comment _ {% extractComments %}

@{%

function extractRoot(d) {
    const output = [];
    if(d[0]) output.push(...d[0]);
    output.push(...d[1]);
    if(d[2]) output.push(...d[2]);
    return output;
}

function extractPair(kv, output) {
    if(kv[0]) { output.push([kv[0], kv[1]]); }
}

function extractPairs(d) {
    let output = [];
    extractPair(d[0], output);
    d[1].forEach(e => {
        if(e[0]) output.push(...e[0]);
        extractPair(e[1], output);
    });
    return output;
}

function extractComments(d) {
    let output = [];
    if(d[0]) output.push(...d[0]);
    output.push(d[1]);
    if(d[2]) output.push(...d[2]);
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