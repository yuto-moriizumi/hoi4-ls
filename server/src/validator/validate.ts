import { Diagnostic } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { parse } from "../parser/parse";
import { Pair } from "../parser/syntax/Pair";
import { Context, Settings } from "../server";
import { country_event } from "./rule/country_event";

export async function validateTextDocument(
  context: Context,
  setting: Settings,
  textDocument: TextDocument
): Promise<void> {
  // The validator creates diagnostics for all uppercase words length 2 and more
  const text = textDocument.getText();
  const ast = parse(text);

  const rules = { country_event } as const;

  const diagnostics: Diagnostic[] = [];

  (ast.pairs.filter((pair) => pair instanceof Pair) as Pair[]).forEach(
    (pair) => {
      if (!(pair.key.value in rules)) {
        context.connection.console.log(
          "oh i found " +
            pair.value +
            " seems to be unexpected with " +
            pair.value.toString()
        );
        const diagnostic: Diagnostic = {
          range: pair.key.getRange(),
          message: "hi!",
        };
        diagnostics.push(diagnostic);
      }
    }
  );

  // Send the computed diagnostics to VSCode.
  context.connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}
