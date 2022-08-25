import { Diagnostic, DiagnosticSeverity } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { hasDiagnosticRelatedInformationCapability } from "../initialize";
import { parse } from "../parser/parse";
import { Pair } from "../parser/syntax/Pair";
import { Context, getDocumentSettings, Settings } from "../server";
import { country_event } from "./rule/country_event";

export async function validateTextDocument(
  context: Context,
  setting: Settings,
  textDocument: TextDocument
): Promise<void> {
  // In this simple example we get the settings for every validate run.
  // const settings = await getDocumentSettings(
  //   context,
  //   setting,
  //   textDocument.uri
  // );

  // The validator creates diagnostics for all uppercase words length 2 and more
  const text = textDocument.getText();
  const ast = parse(text);

  const rules = { country_event } as const;

  const diagnostics: Diagnostic[] = [];

  // (ast.pairs.filter((pair) => pair instanceof Pair) as Pair[]).forEach(
  //   (pair) => {
  //     if (!(pair.key in rules)) {

  //     }
  //   }
  // );

  // Send the computed diagnostics to VSCode.
  context.connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}
