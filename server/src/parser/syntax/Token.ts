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
      start: { line: this.line - 1, character: this.col - 1 },
      end: { line: this.line - 1, character: this.col + this.value.length - 1 },
    };
  }

  public toString() {
    return this.value;
  }
}
