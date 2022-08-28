import { Value as ValueType } from "../../validator/rule/types";
import { PairOrCommentArr } from "../postProcess";
import { Pairs } from "./Pairs";
import { Token } from "./Token";

type Value = Pairs | string | boolean | number | Token;
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

  public getValueType(): ValueType {
    const type = typeof this.value;
    if (type === "boolean") return ValueType.BOOL;
    if (type === "number") return ValueType.NUMBER;
    if (type === "object") return ValueType.OBJECT;
    if (type === "string")
      return (this.value as string).startsWith('"')
        ? ValueType.QUOTED
        : ValueType.UNQUOTED;
    throw new Error("Unexpected type");
  }

  public toString() {
    return JSON.stringify(this);
  }
}
