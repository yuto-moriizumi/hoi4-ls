import { TextDocument } from "vscode-languageserver-textdocument";
import { Context, Settings } from "../server";
import { validateTextDocument } from "./validate";

describe("validate", () => {
  const context = {
    connection: { sendDiagnostics: jest.fn() },
  } as unknown as Context;

  it("should validate empty string", async () => {
    const textDocument = getTextDocument("");
    await validateTextDocument(context, {} as Settings, textDocument);
    expect(context.connection.sendDiagnostics).toHaveBeenCalledWith(
      expect.objectContaining({
        diagnostics: expect.arrayContaining([]),
      })
    );
  });

  it("should return unexpected syntax", async () => {
    const textDocument = getTextDocument(`hoge = yes`);
    await validateTextDocument(context, {} as Settings, textDocument);
    expect(context.connection.sendDiagnostics).toHaveBeenCalledWith(
      expect.objectContaining({
        diagnostics: expect.arrayContaining([
          {
            message: "Unknown syntax: hoge",
            range: {
              end: { character: 4, line: 0 },
              start: { character: 0, line: 0 },
            },
          },
        ]),
      })
    );
  });
});

function getTextDocument(text: string) {
  return {
    uri: "dummyURI",
    getText: () => text,
  } as unknown as TextDocument;
}
