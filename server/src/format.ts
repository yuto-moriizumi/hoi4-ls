import { DocumentFormattingParams, TextEdit } from "vscode-languageserver";
import { parse } from "./parser/parse";
import { Context } from "./server";

export const format = (context: Context, params: DocumentFormattingParams) => {
  try {
    context.connection.console.log("received format request");
    const document = context.documents.get(params.textDocument.uri);
    if (document === undefined) return undefined;
    const ast = parse(document.getText());
    if (ast === undefined || ast instanceof Error) return [];
    const newText = ast.format();
    const textEdit: TextEdit = {
      range: {
        start: { line: 0, character: 0 },
        end: { line: document.lineCount, character: 0 },
      },
      newText: newText,
    };
    return [textEdit];
  } catch (error) {
    const errObj = error as Error;
    context.connection.console.error(errObj.stack ?? String(errObj));
    return null;
  }
};
