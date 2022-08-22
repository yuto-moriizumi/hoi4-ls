// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.

function id(d: any[]): any {
  return d[0];
}
declare let number: any;
declare let quoted: any;
declare let unquoted: any;
declare let comment: any;
declare let space: any;

import { Comment } from "./syntax/Comment";
import { Pair } from "./syntax/Pair";
import { compile } from "moo";
const lexer = compile({
  space: { match: /\s+/, lineBreaks: true },
  number: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,
  quoted: /"(?:\\["bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/,
  "{": "{",
  "}": "}",
  "[": "[",
  "]": "]",
  "=": "=",
  yes: "yes",
  no: "no",
  unquoted: /(?:[^"\\\n\s#=])+/,
  comment: /#.*$/,
});

function extractRoot(d: any[]) {
  const output = [];
  if (d[0]) output.push(...d[0]);
  output.push(...d[1]);
  if (d[2]) output.push(...d[2]);
  return output;
}

function extractPair(kv: any[], output: any[]) {
  if (kv[0]) {
    output.push(kv[0]);
  }
}

function extractPairs(d: any[]) {
  const output: any[] = [];
  extractPair(d[0], output);
  if (d[1]) {
    d[1].forEach((e: any) => {
      if (e[0]) output.push(...e[0]);
      extractPair(e[1], output);
    });
  }
  return output;
}

function extractComments(d: any[]) {
  const output: any[] = [];
  if (d[0]) output.push(...d[0]);
  output.push(d[1]);
  if (d[2]) output.push(...d[2]);
  return output;
}

function extractArray(d: any[]) {
  const output: any[] = [d[2]];

  for (const i in d[3]) {
    output.push(d[3][i][3]);
  }

  return output;
}

interface NearleyToken {
  value: any;
  [key: string]: any;
}

interface NearleyLexer {
  reset: (chunk: string, info: any) => void;
  next: () => NearleyToken | undefined;
  save: () => any;
  formatError: (token: never) => string;
  has: (tokenType: string) => boolean;
}

interface NearleyRule {
  name: string;
  symbols: NearleySymbol[];
  postprocess?: (
    d: any[],
    loc?: number,
    reject?: Record<string, unknown>
  ) => any;
}

type NearleySymbol =
  | string
  | { literal: any }
  | { test: (token: any) => boolean };

interface Grammar {
  Lexer: NearleyLexer | undefined;
  ParserRules: NearleyRule[];
  ParserStart: string;
}

const grammar: Grammar = {
  Lexer: lexer,
  ParserRules: [
    { name: "root", symbols: ["_", "pairs", "_"], postprocess: extractRoot },
    { name: "value", symbols: ["number"], postprocess: id },
    { name: "value", symbols: ["boolean"], postprocess: id },
    { name: "value", symbols: ["quoted"], postprocess: id },
    { name: "value", symbols: ["unquoted"], postprocess: id },
    { name: "value", symbols: ["array"], postprocess: id },
    { name: "value", symbols: ["object"], postprocess: id },
    {
      name: "number",
      symbols: [lexer.has("number") ? { type: "number" } : number],
      postprocess: (d) => parseFloat(d[0].value),
    },
    {
      name: "quoted",
      symbols: [lexer.has("quoted") ? { type: "quoted" } : quoted],
      postprocess: (d) => JSON.parse(d[0].value),
    },
    {
      name: "unquoted",
      symbols: [lexer.has("unquoted") ? { type: "unquoted" } : unquoted],
      postprocess: (d) => d[0].value,
    },
    { name: "boolean", symbols: [{ literal: "yes" }], postprocess: () => true },
    { name: "boolean", symbols: [{ literal: "no" }], postprocess: () => false },
    {
      name: "object",
      symbols: [{ literal: "{" }, "_", { literal: "}" }],
      postprocess: (d) => (d[0] ? [d[0]] : []),
    },
    {
      name: "object",
      symbols: [{ literal: "{" }, "root", { literal: "}" }],
      postprocess: (d) => d[1],
    },
    { name: "array$ebnf$1", symbols: [] },
    {
      name: "array$ebnf$1$subexpression$1",
      symbols: ["_", { literal: "," }, "_", "value"],
    },
    {
      name: "array$ebnf$1",
      symbols: ["array$ebnf$1", "array$ebnf$1$subexpression$1"],
      postprocess: (d) => d[0].concat([d[1]]),
    },
    {
      name: "array",
      symbols: [
        { literal: "[" },
        "_",
        "value",
        "array$ebnf$1",
        "_",
        { literal: "]" },
      ],
      postprocess: extractArray,
    },
    {
      name: "pair",
      symbols: ["unquoted", "_", { literal: "=" }, "_", "value"],
      postprocess: (d) => [new Pair(d[0], d[4])],
    },
    { name: "pairs$ebnf$1", symbols: [] },
    { name: "pairs$ebnf$1$subexpression$1", symbols: ["__", "pair"] },
    {
      name: "pairs$ebnf$1",
      symbols: ["pairs$ebnf$1", "pairs$ebnf$1$subexpression$1"],
      postprocess: (d) => d[0].concat([d[1]]),
    },
    {
      name: "pairs",
      symbols: ["pair", "pairs$ebnf$1"],
      postprocess: extractPairs,
    },
    {
      name: "comment",
      symbols: [lexer.has("comment") ? { type: "comment" } : comment],
      postprocess: (d) => new Comment(d[0].text),
    },
    { name: "_", symbols: [] },
    { name: "_", symbols: ["__"], postprocess: (d) => d[0] || null },
    {
      name: "__",
      symbols: [lexer.has("space") ? { type: "space" } : space],
      postprocess: () => null,
    },
    {
      name: "__",
      symbols: ["_", "comment", "_"],
      postprocess: extractComments,
    },
  ],
  ParserStart: "root",
};

export default grammar;
