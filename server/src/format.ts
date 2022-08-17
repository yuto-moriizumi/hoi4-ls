import { DocumentFormattingParams, TextEdit } from "vscode-languageserver";
import { connection, documents } from "./server";

export const format = (params: DocumentFormattingParams) => {
  connection.console.log("received format request");
  const document = documents.get(params.textDocument.uri);
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
