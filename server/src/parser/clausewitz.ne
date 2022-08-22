@preprocessor typescript
@{%
import { Comment } from "./syntax/Comment";
import { Pair } from "./syntax/Pair";
import { compile } from "moo";
import { extractArray } from "./postProcess";

const lexer = compile({
    space: { match: /\s+/, lineBreaks: true },
    number: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,
    quoted: /"(?:\\["bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/,
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
quoted -> %quoted {% (d) => d[0] %}
unquoted -> %unquoted {% (d) => d[0].value %}
boolean -> "yes" {% () => true %} | "no" {% () => false %}

object -> "{" _ "}" {% (d) => d[0] ? [d[0]] : [] %}
    | "{" root "}" {% (d) => d[1] %}

array -> "[" _ value (_ "," _ value):* _ "]" {% extractArray %}

pair -> unquoted _ "=" _ value {% (d) => [new Pair(d[0], d[4])] %}

pairs -> pair (__ pair):* {% extractPairs %}

comment -> %comment {% (d) => new Comment(d[0].text) %}

# Null allowed space
_ -> null | __ {% (d) => d[0] || null %} 

# Non-null space
__ -> %space {% () => null %} | _ comment _ {% extractComments %}

@{%
function extractRoot(d: any[]) {
    const output = [];
    if(d[0]) output.push(...d[0]);
    output.push(...d[1]);
    if(d[2]) output.push(...d[2]);
    return output;
}

function extractPair(kv: any[], output: any[]) {
    if(kv[0]) { output.push(kv[0]); }
}

function extractPairs(d: any[]) {
    const output: any[] = [];
    extractPair(d[0], output);
    if(d[1]) {
        d[1].forEach((e: any) => {
            if(e[0]) output.push(...e[0]);
            extractPair(e[1], output);
        });
    }
    return output;
}

function extractComments(d: any[]) {
    const output: any[] = [];
    if(d[0]) output.push(...d[0]);
    output.push(d[1]);
    if(d[2]) output.push(...d[2]);
    return output;
}
%}