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

pair -> key _ "=" _ value {% (d) => [d[0], d[4]] %}
pairs -> pair (__ pair):* {% extractPairs %}

key -> unquoted {% id %}

comment -> %comment {% (d) => ["comment", d[0].value] %}
# comments -> comment comments {% (d) => [d[0], ...d[1]] %}

# inline_comment -> %space comment {% (d) => d[1] %}

_ -> null | %space {% () => null %} | _ comment _ {% () => null %}

__ -> %space {% () => null %} | _ comment _ {% () => null %}

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
    //extractPair(d[1], output);
    for (let i in d[1]) {
        extractPair(d[1][i][1], output);
    }
    return output;
}

function extractComments(d) {
    let output = [...d[0]];
    if(d[1]) output.push(d[1]);
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