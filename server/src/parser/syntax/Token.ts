import { Range } from "vscode-languageserver";

export class Token {
  public readonly value: string;
  public readonly line: number;
  public readonly col: number;

  constructor(token: moo.Token) {
    this.value = token.text;
    this.line = token.line;
    this.col = token.col;
  }

  public getRange(): Range {
    return {
      start: { line: this.line, character: this.col },
      end: { line: this.line, character: this.col + this.value.length },
    };
  }

  public toString() {
    return this.value;
  }
}
