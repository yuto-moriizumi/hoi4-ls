import { A, NormalizedRule, Rule, Value } from "./types";

export class RuleContainer {
  [key: string]: any;
  public readonly rule: NormalizedRule;
  constructor(rule: Rule) {
    super();
    rule.type = rule.type ?? Value.OBJECT;
    this.rule = rule as NormalizedRule;

    // this.set()
    // this.type = rule.type;

    const a = {} as A;
    a.hoge;

    this = rule;
  }
}
