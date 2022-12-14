import { Token } from "moo";

export class Comment {
  public readonly value: string;

  constructor(token: Token | string) {
    this.value = typeof token === "object" ? token.text : token;
  }

  public format(indent: number) {
    return "\t".repeat(indent) + this.value + "\n";
  }
  public toString() {
    return this.value;
  }
}
