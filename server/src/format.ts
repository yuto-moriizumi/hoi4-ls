import { DocumentFormattingParams, TextEdit } from "vscode-languageserver";
import { parse } from "./parser/parse";
import { Context } from "./server";

export const format = (context: Context, params: DocumentFormattingParams) => {
  context.connection.console.log("received format request");
  const document = context.documents.get(params.textDocument.uri);
  if (document === undefined) return undefined;
  const ast = parse(document.getText());
  const newText = ast.format();
  // const newText = "hi";
  const textEdit: TextEdit = {
    range: {
      start: { line: 0, character: 0 },
      end: { line: document.lineCount, character: 0 },
    },
    newText: newText,
  };
  return [textEdit];
};
