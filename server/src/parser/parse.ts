// import { Jomini } from "jomini";
// import { readFileSync } from "fs";
import { readFileSync } from "fs";
import { Grammar, Parser } from "nearley";
import { Root } from "./syntax/Root";

export async function parse() {
  // text: string
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const grammar = require("./clausewitz.js");
  const parser = new Parser(Grammar.fromCompiled(grammar));
  // const text = readFileSync(
  //   "./src/parser/_ssw_Fate_of_Countries_Eastern_Europe.txt"
  // ).toString();
  const text = readFileSync("./src/parser/ssw_ACO copy.txt").toString();
  parser.feed(text);
  const result = new Root(parser.results[0]);
  console.dir(result, { depth: null });
}

parse();
