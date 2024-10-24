import { TextDocument } from "vscode-languageserver-textdocument";
import { parse } from "../parser/parse";
import { Context, Settings } from "../server";
import { abilityType } from "./rule/common/abilities";

export async function validateTextDocument(
  context: Context,
  setting: Settings,
  textDocument: TextDocument,
): Promise<void> {
  // return;
  // The validator creates diagnostics for all uppercase words length 2 and more
  const text = textDocument.getText();
  const ast = parse(text);
  if (ast === undefined) return;
  if (ast instanceof Error) {
    context.connection.console.error(JSON.stringify(ast));
    return context.connection.sendDiagnostics({
      uri: textDocument.uri,
      diagnostics: [
        {
          range: {
            start: { character: ast.col, line: ast.line },
            end: { character: ast.col + 1, line: ast.line },
          },
          message: "Failed to parse",
        },
      ],
    });
  }

  const rootTypes = [abilityType];
  rootTypes.filter((type) => {
    context.connection.console.log(
      JSON.stringify({ type: type.path, uri: textDocument.uri }),
    );
  });

  // // Send the computed diagnostics to VSCode.
  // context.connection.sendDiagnostics({
  //   uri: textDocument.uri,
  //   diagnostics: ast.validate(rules, undefined),
  // });
}
