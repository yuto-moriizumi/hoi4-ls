import { Token } from "moo";

type Value = boolean | number | string | Token | any[];
export const extractArray = (
  d: [string, any, Value, [any, string, any, Value], any, string]
) => [d[2], ...d[3].map((arr) => arr[3])];

export function extractRoot(d: any[]) {
  const output = [];
  if (d[0]) output.push(...d[0]);
  output.push(...d[1]);
  if (d[2]) output.push(...d[2]);
  return output;
}

export function extractPair(kv: any[], output: any[]) {
  if (kv[0]) {
    output.push(kv[0]);
  }
}

export function extractPairs(d: any[]) {
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

export function extractComments(d: any[]) {
  const output: any[] = [];
  if (d[0]) output.push(...d[0]);
  output.push(d[1]);
  if (d[2]) output.push(...d[2]);
  return output;
}
