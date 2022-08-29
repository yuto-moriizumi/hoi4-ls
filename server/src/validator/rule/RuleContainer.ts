import { Diagnostic } from "vscode-languageserver";
import { Pair } from "../../parser/syntax/Pair";
import { Pairs } from "../../parser/syntax/Pairs";
import { NormalizedRule, Rule, RuleContainerDict, Value } from "./types";

export class RuleContainer implements NormalizedRule {
  readonly type;
  readonly cardinality;
  readonly provide;
  readonly children?: RuleContainerDict;

  constructor(rule: Rule) {
    this.type = (rule.type ?? Value.OBJECT) as Value;
    this.cardinality = rule.cardinality ?? [1, 1];
    if ("provide" in rule) this.provide = rule.provide;
    if (!("children" in rule && rule.children !== undefined)) return;
    const { children } = rule;
    this.children = Object.fromEntries(
      Object.entries(children).map(([k, v]) => [
        k,
        v instanceof Array
          ? v.map((r) => new RuleContainer(r))
          : new RuleContainer(v),
      ])
    );
  }

  public validate(pair: Pair): Diagnostic[] {
    const { key, value } = pair;
    // Type check
    const actualType = pair.getValueType();
    const expectedType = this.type;
    if (actualType !== expectedType) {
      const diagnostic: Diagnostic = {
        range: key.getRange(),
        message: `Wrong type for ${key.value}, expected ${expectedType} but ${actualType}`,
      };
      return [diagnostic];
    }
    if (value instanceof Pairs)
      return value.validate(this.children as RuleContainerDict, key);

    return [];
  }
}
