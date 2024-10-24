import { program } from "@commander-js/extra-typings";
import { convertAll } from "./convertAll";
import { convert } from "./convert";
import { parse } from "./parse";

program
  .command("parse")
  .argument("<filePath>", "Relative path to the file")
  .action(parse);

program
  .command("convert")
  .argument("<filePath>", "Relative path to the file")
  .action(convert);

program.command("convert-all").action(convertAll);

program.parse();
