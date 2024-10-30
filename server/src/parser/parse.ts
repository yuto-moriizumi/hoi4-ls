import { Grammar, Parser } from "nearley";
import { Root } from "./syntax/Root";
import grammar from "./clausewitz";
import { ParseFailError, NearleyParseError } from "./ParseFailError";

export function parse(text: string) {
  const parser = new Parser(Grammar.fromCompiled(grammar));
  try {
    parser.feed(text);
    if (parser.results.length === 0) return;
    const result = new Root(parser.results[0]);
    return result;
  } catch (error) {
    return new ParseFailError(error as NearleyParseError);
  }
}
