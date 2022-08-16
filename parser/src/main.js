"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
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
const nearley_1 = __importDefault(require("nearley"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("hi");
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const grammar = require("../clausewitz.js");
        const parser = new nearley_1.default.Parser(nearley_1.default.Grammar.fromCompiled(grammar));
        // // eslint-disable-next-line no-useless-escape
        // parser.feed("id = SSW_ACO.1 id = SSW_ACO.2");
        const text = fs_1.default.readFileSync("_ssw_Fate_of_Countries_Eastern_Europe.txt").toString();
        // const text = fs.readFileSync("ssw_ACO.txt").toString();
        // const text = "a=yes b=yes c={a=yes}"
        parser.feed(text);
        console.dir(parser.results[0], { depth: 4 });
    });
}
main();
