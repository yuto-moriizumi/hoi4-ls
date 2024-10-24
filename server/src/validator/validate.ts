import { TextDocument } from "vscode-languageserver-textdocument";
import { parse, ParseFailError } from "../parser/parse";
import { Context, Settings } from "../server";
import { abilityType } from "./rule/common/abilities";

export async function validateTextDocument(
  context: Context,
  setting: Settings,
  textDocument: TextDocument,
): Promise<void> {
  // The validator creates diagnostics for all uppercase words length 2 and more
  const text = textDocument.getText();
  const ast = parse(text);

  if (ast instanceof ParseFailError) {
    return context.connection.sendDiagnostics({
      uri: textDocument.uri,
      diagnostics: [
        {
          range: {
            start: { character: 0, line: 0 },
            end: { character: 0, line: 0 },
          },
          message: "Failed to parse",
        },
      ],
    });
  }

  const rootTypes = [abilityType];
  rootTypes.filter((type) => {
    console.log({ type: type.path, uri: textDocument.uri });
  });

  // // Send the computed diagnostics to VSCode.
  // context.connection.sendDiagnostics({
  //   uri: textDocument.uri,
  //   diagnostics: ast.validate(rules, undefined),
  // });
}
