import { Token } from "moo";

type Value = boolean | number | string | Token | unknown[];
export function isToken(value: Value): value is Token {
  if (typeof value !== "object") return false;
  return "lineBreaks" in value;
}
