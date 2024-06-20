import { program } from "@commander-js/extra-typings";
import { convertAll } from "./convertAll";
import { convert } from "./convert";

const command = program
  .option("--all")
  .argument("<filePath>", "Relative path to the file")
  .parse();
const options = command.opts();

if (options.all) convertAll();
else convert(command.processedArgs[0]);
