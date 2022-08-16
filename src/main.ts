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
  // // eslint-disable-next-line no-useless-escape
  // parser.feed("id = SSW_ACO.1 id = SSW_ACO.2");

  const text = fs.readFileSync("_ssw_Fate_of_Countries_Eastern_Europe.txt").toString();
  // const text = fs.readFileSync("ssw_ACO.txt").toString();
  // const text = "a=yes b=yes c={a=yes}"
  parser.feed(text);
  console.dir(parser.results[0], { depth: 4 });
}

main();
