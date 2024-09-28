import { program } from "@commander-js/extra-typings";
import { convertAll } from "./convertAll";
import { convert } from "./convert";

program.command("parse").action(() => {
  console.log("im parse");
});

program
  .command("convert")
  .argument("<filePath>", "Relative path to the file")
  .action((filePath) => {
    convert(filePath);
  });

program.command("convert-all").action(convertAll);

program.parse();
