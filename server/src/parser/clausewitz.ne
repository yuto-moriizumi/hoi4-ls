@preprocessor typescript
@{%
import { Comment } from "./syntax/Comment";
import { Pair } from "./syntax/Pair";
import { Token } from "./syntax/Token";
import { compile } from "moo";
import { extractArray, extractRoot, extractPairs, extractComments } from "./postProcess";

const lexer = compile({
    space: { match: /\s+/, lineBreaks: true },
    number: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,
    quoted: /"(?:\\["bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/,
    '{': '{',
    '}': '}',
    '=': '=',
    yes: 'yes',
    no: 'no',
    unquoted: /(?:[^"\\\n\s#={}[\],])+/,
    comment: /#.*$/,
});
%}
@lexer lexer

root -> _ pairs _  {% extractRoot %}

value -> number {% id %} | boolean {% id %} | quoted {% id %} | unquoted {% id %} | object {% id %}
    # | array {% id %}

number -> %number {% (d) => parseFloat(d[0].value) %}
quoted -> %quoted {% (d) => d[0].value %}
unquoted -> %unquoted {% (d) => new Token(d[0]) %}
boolean -> "yes" {% () => true %} | "no" {% () => false %}

object -> "{" _ "}" {% (d) => d[0] ? [d[0]] : [] %}
    | "{" root "}" {% (d) => d[1] %}

# array -> "[" _ value (_ "," _ value):* _ "]" {% extractArray %}

pair -> unquoted _ "=" _ value {% (d) => new Pair(d[0], d[4]) %}

pairs -> pair (__ pair):* {% extractPairs %}

comment -> %comment {% (d) => new Comment(d[0].text) %}

# Null allowed space
_ -> null | __ {% (d) => d[0] || null %} 

# Non-null space
__ -> %space {% () => null %} | _ comment _ {% extractComments %}
