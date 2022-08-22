import { Token } from "moo";
import { Comment } from "./Comment";
import { Pairs } from "./Pairs";

type Value = Pairs | string | boolean | number;
export class Pair {
  private readonly key: string;
  private readonly value: Value;

  constructor(key: Token | string, value: Value | Token) {
    this.key = typeof key === "object" ? key.text : key;
    if (
      value instanceof Array &&
      value.length > 0 &&
      (value[0] instanceof Comment || value[0] instanceof Pair)
    ) {
      this.value = new Pairs(value);
      return;
    }
    if (
      typeof value === "string" ||
      typeof value === "boolean" ||
      typeof value === "number" ||
      value instanceof Pairs
    ) {
      this.value = value;
      return;
    }
    this.value = value.text;
  }

  public format(indent: number) {
    const res = "\t".repeat(indent) + this.key + " = ";
    if (typeof this.value === "string" || typeof this.value === "number")
      return res + this.value + "\n";
    if (typeof this.value === "boolean")
      return res + (this.value ? "yes" : "no") + "\n";
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
