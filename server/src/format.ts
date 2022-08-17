import { DocumentFormattingParams, TextEdit } from "vscode-languageserver";
import { Context } from "./server";

export const format = (context: Context, params: DocumentFormattingParams) => {
  context.connection.console.log("received format request");
  const document = context.documents.get(params.textDocument.uri);
  if (document === undefined) return undefined;
  const textEdit: TextEdit = {
    range: {
      start: { line: 0, character: 0 },
      end: { line: document.lineCount, character: 0 },
    },
    newText: "hi!",
  };
  return [textEdit];
};
