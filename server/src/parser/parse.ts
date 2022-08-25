import { Grammar, Parser } from "nearley";
import { Root } from "./syntax/Root";
import grammar from "./clausewitz";

export function parse(text: string) {
  const parser = new Parser(Grammar.fromCompiled(grammar));
  parser.feed(text);
  const result = new Root(parser.results[0]);
  console.dir(result, { depth: null });
  return result;
}
