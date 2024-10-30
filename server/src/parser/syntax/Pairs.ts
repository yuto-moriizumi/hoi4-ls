import { Diagnostic } from "vscode-languageserver";
// import { NormalizedRuleDict } from "../../validator/rule/types";
import { PairOrCommentArr } from "../postProcess";
import { Pair } from "./Pair";
import { Token } from "./Token";
import {
  EntryDescriptor,
  ObjectValueDescriptor,
} from "../../validator/rule/types";

/**
 * Lexical token for object entries and comments
 * contains a list of {@link Pair} and {@link Comment}
 */
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
   * @param superkey The token that owns this pairs. If undefined, that means current scope is root.
   */
  public validate(
    objectRule: EntryDescriptor<ObjectValueDescriptor>,
    superkey: Token | undefined,
  ): Diagnostic[] {
    const children =
      objectRule.children instanceof Array
        ? objectRule.children[0]
        : objectRule.children;

    let diagnostics: Diagnostic[] = [];
    const count = new Map<string, number>();

    // Calc expected cardinality
    const expectedCardinality = Object.fromEntries(
      Object.entries(children).map(([k, v]) => {
        // TODO: fix here, it only refers to the very first rule
        const value = v instanceof Array ? v[0] : v;
        return [k, value.cardinality];
      }),
    );
    (this.pairs.filter((pair) => pair instanceof Pair) as Pair[]).forEach(
      (pair) => {
        const { key } = pair;
        count.set(key.value, (count.get(key.value) ?? 0) + 1);
        if (!(key.value in children)) {
          const diagnostic: Diagnostic = {
            range: key.getRange(),
            message: `Unknown syntax: ${key.value}, expected one of ${Object.keys(children)}`,
          };
          diagnostics.push(diagnostic);
          return;
        }

        const rule = children[key.value];
        diagnostics = [
          ...diagnostics, // TODO: Fix here, it only refers to the very first rule
          ...pair.validate(rule instanceof Array ? rule[0] : rule),
        ];
      },
    );
    // Validate cardinality
    // If superkey is undefined, that means current scope is root. So no cardinality check.
    if (superkey === undefined) return diagnostics;
    Object.entries(expectedCardinality).forEach(([k, v]) => {
      const actual = count.get(k) ?? 0;
      const [min, max] = v ?? [0, Infinity];
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
      if (max === Infinity) return;
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
