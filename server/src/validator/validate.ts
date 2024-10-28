import { TextDocument } from "vscode-languageserver-textdocument";
import { parse } from "../parser/parse";
import { Context, Settings } from "../server";
import { abilityType } from "./rule/common/abilities";
import { join } from "path";
import { existsSync } from "fs";
import { MyNotificationType } from "common";
import { WorkspaceFolder } from "vscode-languageserver";

export async function validateTextDocument(
  context: Context,
  setting: Settings,
  textDocument: TextDocument,
): Promise<void> {
  const { connection } = context;

  // The validator creates diagnostics for all uppercase words length 2 and more
  const text = textDocument.getText();
  const ast = parse(text);
  if (ast === undefined) return;
  if (ast instanceof Error) {
    connection.console.error(JSON.stringify(ast));
    return connection.sendDiagnostics({
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

  // Get first workspace folder
  const folders = await connection.workspace.getWorkspaceFolders();
  if (folders === null) return;
  // TODO: Support multiple workspace folders
  const folder = folders[0];

  // Check if the folder is a hoi4 mod project root folder
  const isRoot = isHoi4ModRootFolder(folder);
  if (!isRoot)
    return connection.sendNotification(MyNotificationType, {
      msg: "descriptor.mod was not found in workspace root",
    });

  // Find the applicable root rules
  // TODO: Implement root rule finding
  const rootTypes = [abilityType];
  rootTypes.filter((type) => {
    connection.console.log(
      JSON.stringify({ type: type.path, uri: textDocument.uri }),
    );
  });

  // Validate
  // TODO: Implement validation

  // Send the computed diagnostics to VSCode.
  // TODO: Implement diagnostics

  // context.connection.sendDiagnostics({
  //   uri: textDocument.uri,
  //   diagnostics: ast.validate(rules, undefined),
  // });
}

/**
 * Returns if the given folder is considered as hoi4 mod project root folder
 * Uses the existence of `descriptor.mod` file to determine if the folder is a hoi4 mod project root folder
 */
function isHoi4ModRootFolder(folder: WorkspaceFolder) {
  const MOD_FILE = "descriptor.mod";
  const url = new URL(join(folder.uri, MOD_FILE));
  // The uri from language server has `/` prefix, which needs to be removed
  const path = decodeURIComponent(url.pathname).slice(1);
  const hasModFile = existsSync(path);
  return hasModFile;
}
