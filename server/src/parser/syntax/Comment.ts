import { Token } from "moo";

export class Comment {
  private readonly value!: string;

  constructor(token: Token) {
    this.value = token.text;
  }

  public format(indent: number) {
    return "\t".repeat(indent) + this.value + "\n";
  }
}
