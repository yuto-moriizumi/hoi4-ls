import { NormalizedRule, Rule, Value } from "./types";

export class RuleContainer implements NormalizedRule {
  readonly type;
  readonly cardinality;
  readonly provide;
  readonly children?: Record<string, RuleContainer | RuleContainer[]>;

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
}
