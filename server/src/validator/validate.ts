import { Diagnostic } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { parse } from "../parser/parse";
import { Pair } from "../parser/syntax/Pair";
import { Context, Settings } from "../server";
import { country_event } from "./rule/country_event";
import { RuleContainer } from "./rule/RuleContainer";
import { Rule } from "./rule/types";

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

  const diagnostics: Diagnostic[] = [];

  (ast.pairs.filter((pair) => pair instanceof Pair) as Pair[]).forEach(
    (pair) => {
      const { key, value } = pair;
      if (!(key.value in rules)) {
        const diagnostic: Diagnostic = {
          range: key.getRange(),
          message: `Unknown syntax: ${key.value} ${key.getRange()}`,
        };
        diagnostics.push(diagnostic);
        return;
      }
      // Type check
      const actualType = pair.getValueType();
      const rule = rules[key.value];
      const expectedType = rule.type;
      if (actualType !== expectedType) {
        const diagnostic: Diagnostic = {
          range: key.getRange(),
          message: `Wrong type for ${key.value}, expected ${expectedType} but ${actualType}`,
        };
        diagnostics.push(diagnostic);
        return;
      }
    }
  );

  // Send the computed diagnostics to VSCode.
  context.connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}
