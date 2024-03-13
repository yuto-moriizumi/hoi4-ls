import { Diagnostic } from "vscode-languageserver";
import { Pair } from "../../parser/syntax/Pair";
import { Pairs } from "../../parser/syntax/Pairs";
import {
  Context,
  NormalizedRule,
  Rule,
  RuleContainerDict,
  Value,
} from "./types";
import { effects } from "./effects";

/** The rule class for handling rule related logics in unified manner
 * Every plain rules will be transformed into this class */
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
    if (value instanceof Pairs) {
      if (this.children === undefined && this.provide === undefined) {
        const diagnostic: Diagnostic = {
          range: key.getRange(),
          message: `The rule ${key.value} is not supposed to have children`,
        };
        return [diagnostic];
      }
      let mergedRuleDict: RuleContainerDict = {};
      if (this.children)
        mergedRuleDict = { ...mergedRuleDict, ...this.children };
      if (this.provide) {
        if (this.provide.context === Context.EFFECT)
          mergedRuleDict = { ...mergedRuleDict, ...effectRules };
      }
      return value.validate(mergedRuleDict, key);
    }

    return [];
  }
}

const effectRules = Object.fromEntries(
  Object.entries(effects).map(([k, v]) => [
    k,
    new RuleContainer({ ...v, cardinality: [0, "inf"] }),
  ])
);
