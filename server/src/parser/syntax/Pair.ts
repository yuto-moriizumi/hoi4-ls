import { Diagnostic } from "vscode-languageserver";
import {
  EntryDescriptor,
  ValueDescriptor,
  Value as ValueType,
} from "../../validator/rule/types";
import { PairOrCommentArr } from "../postProcess";
import { Pairs } from "./Pairs";
import { Token } from "./Token";

type Value = Pairs | string | boolean | number | Token;
/**
 * Lexical token for the key-value pair
 */
export class Pair {
  public readonly key: Token;
  public readonly value: Value;

  constructor(key: Token, value: Value | PairOrCommentArr) {
    this.key = key;
    // generate pairs here to improve performance
    this.value = value instanceof Array ? new Pairs(value) : value;
  }

  public format(indent: number) {
    const res = "\t".repeat(indent) + this.key.value + " = ";
    const type = typeof this.value;
    if (type === "string" || type === "number") return res + this.value + "\n";
    if (type === "boolean") return res + (this.value ? "yes" : "no") + "\n";
    if (this.value instanceof Token) return res + this.value.value + "\n";
    if (this.value instanceof Pairs)
      return (
        res +
        "{\n" +
        this.value.format(indent + 1) +
        "\t".repeat(indent) +
        "}\n"
      );
    throw new Error("unexpected value type: " + this.value);
  }

  public getValueType() {
    if (this.value instanceof Token) return ValueType.UNQUOTED;
    const type = typeof this.value;
    if (type === "boolean") return ValueType.BOOL;
    if (type === "number") {
      if (Number.isInteger(this.value)) return ValueType.INT;
      return ValueType.FLOAT;
    }
    if (type === "object") return ValueType.OBJECT;
    if (type === "string") return ValueType.QUOTED;
    throw new Error("Unexpected type");
  }

  public toString() {
    return JSON.stringify(this);
  }

  public validate(rule: EntryDescriptor<ValueDescriptor>): Diagnostic[] {
    const { key, value } = this;
    // Type check
    const actualType = this.getValueType();
    const expectedType = rule.type;
    if (expectedType === ValueType.ENUM && actualType !== "object") {
      // check if value is in the enum
      // if the value is object there is no need to check
      if (!rule.values.includes(value.toString()))
        return [
          {
            range: {
              start: key.getRange().end,
              end: {
                line: key.getRange().end.line,
                character: key.getRange().end.character + 1,
              },
            },
            message: `値 ${key.value} が間違っています。次の値のうちいずれかである必要があります。 ${rule.values.join(",")}`,
          },
        ];
    } else if (actualType !== expectedType) {
      const diagnostic: Diagnostic = {
        range: key.getRange(),
        message: `キー ${key.value} の型は ${expectedType} である必要がありますが、 ${actualType} になっています`,
      };
      return [diagnostic];
    }
    // if value is Pairs, it means value is an object
    if (value instanceof Pairs) {
      if (!("children" in rule)) {
        const diagnostic: Diagnostic = {
          range: key.getRange(),
          message: `キー ${key.value} が{}のカタマリを持つことはできません`,
        };
        return [diagnostic];
      }
      return value.validate(rule, key);
    }

    return [];
  }
}
