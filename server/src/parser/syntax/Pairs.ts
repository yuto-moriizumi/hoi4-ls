import { Diagnostic } from "vscode-languageserver";
import { RuleContainer } from "../../validator/rule/RuleContainer";
import { Rule, RuleContainerDict } from "../../validator/rule/types";
import { PairOrCommentArr } from "../postProcess";
import { Pair } from "./Pair";

export class Pairs {
  public readonly pairs: PairOrCommentArr;
  constructor(pairs: PairOrCommentArr) {
    this.pairs = pairs;
  }
  public format(indent: number): string {
    return this.pairs.map((pair) => pair.format(indent)).join("");
  }
  public toString() {
    return JSON.stringify(this.pairs);
  }
  public validate(ruleDict: RuleContainerDict): Diagnostic[] {
    let diagnostics: Diagnostic[] = [];
    const count = new Map<string, number>();
    (this.pairs.filter((pair) => pair instanceof Pair) as Pair[]).forEach(
      (pair) => {
        const { key } = pair;
        count.set(key.value, (count.get(key.value) ?? 0) + 1);
        if (!(key.value in ruleDict)) {
          const diagnostic: Diagnostic = {
            range: key.getRange(),
            message: `Unknown syntax: ${key.value} ${key.getRange()}`,
          };
          diagnostics.push(diagnostic);
          return;
        }
        const rule = ruleDict[key.value];

        const res =
          rule instanceof Array
            ? rule.reduce(
                (acc, r) => [...acc, ...r.validate(pair)],
                [] as Diagnostic[]
              )
            : rule.validate(pair);
        diagnostics = [...diagnostics, ...res];
      }
    );
    return diagnostics;
  }
}
