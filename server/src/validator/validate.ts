import { TextDocument } from "vscode-languageserver-textdocument";
import { parse } from "../parser/parse";
import { Context, Settings } from "../server";
import country_event from "./rule/country_event";
import { normalizeRuleDict } from "./rule/normalizer";

export async function validateTextDocument(
  context: Context,
  setting: Settings,
  textDocument: TextDocument,
): Promise<void> {
  // The validator creates diagnostics for all uppercase words length 2 and more
  const text = textDocument.getText();
  const ast = parse(text);

  // Convert raw rules to Rule Objects
  const rawRules = { country_event };
  const rules = normalizeRuleDict(rawRules);

  // Send the computed diagnostics to VSCode.
  context.connection.sendDiagnostics({
    uri: textDocument.uri,
    diagnostics: ast?.validate(rules, undefined) ?? [],
  });
}
