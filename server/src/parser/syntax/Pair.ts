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
    if (typeof this.value === "string" || typeof this.value === "number")
      return res + this.value + "\n";
    if (typeof this.value === "boolean")
      return res + (this.value ? "yes" : "no") + "\n";
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
}
