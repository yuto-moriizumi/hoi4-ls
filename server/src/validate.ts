import { Diagnostic, DiagnosticSeverity } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { hasDiagnosticRelatedInformationCapability } from "./initialize";
import { Context, getDocumentSettings, Settings } from "./server";

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

  const diagnostics: Diagnostic[] = [];


  // Send the computed diagnostics to VSCode.
  context.connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}
