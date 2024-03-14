import { Cardinality, NormalizedRule, Rule, RuleDict, Value } from "./types";

/** Normalize rules with inserting default values and converting single item into arrays */
export function normalize(
  rule: Rule,
  defaultCardinality: Cardinality = [1, 1],
): NormalizedRule {
  return {
    ...rule,
    type: rule.type ?? Value.OBJECT,
    cardinality: rule.cardinality ?? defaultCardinality,
    ...{
      children:
        "children" in rule && rule.children
          ? normalizeRuleDict(rule.children, defaultCardinality)
          : {},
    },
  };
}

export function normalizeRuleDict(
  ruleDict: RuleDict,
  defaultCardinality: Cardinality = [1, 1],
) {
  return Object.fromEntries(
    Object.entries(ruleDict).map(([k, v]) => [
      k,
      (v instanceof Array ? v : [v]).map((r) =>
        normalize(r, defaultCardinality),
      ),
    ]),
  );
}
