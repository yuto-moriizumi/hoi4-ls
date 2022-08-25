import { NormalizedRule, Rule, Value } from "./types";

export class RuleContainer {
  public readonly rule: NormalizedRule;
  constructor(rule: Rule) {
    rule.type = rule.type ?? Value.OBJECT;
    this.rule = rule as NormalizedRule;
  }
}
