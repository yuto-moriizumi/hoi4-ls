import { Diagnostic } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { parse } from "../parser/parse";
import { Context, Settings } from "../server";
import { country_event } from "./rule/country_event";
import { RuleContainer } from "./rule/RuleContainer";
import { Rule } from "./rule/types";
import { effects } from "./rule/effects";

export async function validateTextDocument(
  context: Context,
  setting: Settings,
  textDocument: TextDocument
): Promise<void> {
  // The validator creates diagnostics for all uppercase words length 2 and more
  const text = textDocument.getText();
  const ast = parse(text);

  // Convert raw rules to Rule Objects
  const rawRules: Record<string, Rule> = { country_event };
  const rules = Object.fromEntries(
    Object.entries(rawRules).map(([k, v]) => [k, new RuleContainer(v)])
  );

  // Send the computed diagnostics to VSCode.
  context.connection.sendDiagnostics({
    uri: textDocument.uri,
    diagnostics: ast.validate(rules, undefined),
  });
}
