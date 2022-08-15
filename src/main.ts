import { Jomini } from "jomini";
import fs from "fs";
import { GenericSyntax } from "./GenericSyntax";

// async function main() {
//   console.log("hi");
//   const client = await Jomini.initialize();
//   const text = fs.readFileSync("ssw_ACO copy.txt");
//   const ast = client.parseText(text);
//   console.dir(ast, { depth: null });

//   const convertedAst = new GenericSyntax(ast);
//   console.dir(convertedAst, { depth: null });
//   // client.write((writer) => {
//   //   writer.
//   // });
// }
import nearley from "nearley";

async function main() {
  console.log("hi");
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const grammar = require("../clausewitz.js");
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  // eslint-disable-next-line no-useless-escape
  parser.feed("add_namespace = SSW_ACO");
  console.dir(parser.results, { depth: null });
}

main();
