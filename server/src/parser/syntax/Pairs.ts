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

    // check if children has dynamic keys.
    // As the dynamic key is built with JSON.stringify, it should start with "{"
    // TODO: There might be multiple dynamicKeys
    const dynamicKey = Object.keys(children).find((key) => key.startsWith("{"));

    const diagnostics: Diagnostic[] = [];
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
        const isKeyExist = key.value in children;
        if (isKeyExist) {
          const rule = children[key.value];
          diagnostics.push(
            // TODO: Fix here, it only refers to the very first rule
            ...pair.validate(rule instanceof Array ? rule[0] : rule),
          );
          return;
        }
        if (dynamicKey !== undefined) {
          // assume the key is dynamicKey
          const rule = children[dynamicKey];
          diagnostics.push(
            // TODO: Fix here, it only refers to the very first rule
            ...pair.validate(rule instanceof Array ? rule[0] : rule),
          );
          return;
        }
        const diagnostic: Diagnostic = {
          range: key.getRange(),
          message: `キー ${key.value} は、 ${superkey?.value} には存在しません。ありえるのは、次のいずれかです ${Object.keys(children)}`,
        };
        diagnostics.push(diagnostic);
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
          message: `キー ${k} の数が足りません。 ${
            superkey.value
          } の中に少なくとも ${min} 個必要ですが、${actual}個しかありません`,
        };
        diagnostics.push(diagnostic);
        return;
      }
      if (max === Infinity) return;
      if (max < actual) {
        const diagnostic: Diagnostic = {
          range: superkey.getRange(),
          message: `キー ${k} の数が多すぎます。 ${
            superkey.value
          } は最大 ${max} 個の ${k} を持てますが、${actual}個あります。`,
        };
        diagnostics.push(diagnostic);
        return;
      }
    });
    return diagnostics;
  }
}
