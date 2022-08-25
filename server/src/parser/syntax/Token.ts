export class Token {
  public readonly value: string;
  public readonly line: number;
  public readonly col: number;

  constructor(token: moo.Token) {
    this.value = token.text;
    this.line = token.line;
    this.col = token.col;
  }
}
