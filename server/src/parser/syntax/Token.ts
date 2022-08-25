import { Pairs } from "./Pairs";

type Value = string | boolean | number;
export class Token {
  public readonly value: Value;
  public readonly line: number;
  public readonly col: number;

  constructor(token: moo.Token) {
    this.value = token.text;
    this.line = token.line;
    this.col = token.col;
  }
}
