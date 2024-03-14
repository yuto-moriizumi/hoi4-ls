import { Diagnostic } from "vscode-languageserver";
import { NormalizedRuleDict } from "../../validator/rule/types";
import { PairOrCommentArr } from "../postProcess";
import { Pair } from "./Pair";
import { Token } from "./Token";

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

  /**
   * @param ruleDict Dict of expected keys and corresponding rules
   * @param superkey The token that owns this pairs. If undefined, that means current scope is root.
   */
  public validate(
    ruleDict: NormalizedRuleDict,
    superkey: Token | undefined,
  ): Diagnostic[] {
    let diagnostics: Diagnostic[] = [];
    const count = new Map<string, number>();

    // Calc expected cardinality
    const expectedCardinality = Object.fromEntries(
      Object.entries(ruleDict).map(([k, v]) => {
        // TODO: fix here, it only refers to the very first rule
        return [k, v[0].cardinality];
      }),
    );
    (this.pairs.filter((pair) => pair instanceof Pair) as Pair[]).forEach(
      (pair) => {
        const { key } = pair;
        count.set(key.value, (count.get(key.value) ?? 0) + 1);
        if (!(key.value in ruleDict)) {
          const diagnostic: Diagnostic = {
            range: key.getRange(),
            message: `Unknown syntax: ${key.value}`,
          };
          diagnostics.push(diagnostic);
          return;
        }

        const rule = ruleDict[key.value];
        // TODO: Fix here, it only refers to the very first rule
        diagnostics = [...diagnostics, ...pair.validate(rule[0])];
      },
    );
    // Validate cardinality
    // If superkey is undefined, that means current scope is root. So no cardinality check.
    if (superkey === undefined) return diagnostics;
    Object.entries(expectedCardinality).forEach(([k, v]) => {
      const actual = count.get(k) ?? 0;
      const [min, max] = v;
      // Validate min cardinality
      if (actual < min) {
        const diagnostic: Diagnostic = {
          range: superkey.getRange(),
          message: `Insufficient ${k} syntax for ${
            superkey.value
          }, it's needed at least ${min} but there is ${actual}: ${superkey.getRange()}`,
        };
        diagnostics.push(diagnostic);
        return;
      }
      if (max === "inf") return;
      if (max < actual) {
        const diagnostic: Diagnostic = {
          range: superkey.getRange(),
          message: `Too much ${k} syntax for ${
            superkey.value
          }, it's limited to ${max} but there are ${actual}: ${superkey.getRange()}`,
        };
        diagnostics.push(diagnostic);
        return;
      }
    });
    return diagnostics;
  }
}
