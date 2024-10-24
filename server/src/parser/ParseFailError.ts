import { Token } from "moo";

/** For absorbing Nearely & Moo internal errors */

export class ParseFailError extends Error {
  /** The line number of the beginning of the match, starting from 0. */
  public readonly line: number;
  public readonly col: number;
  public readonly offsetNearley: number;
  public readonly offsetMoo: number;
  constructor(error: NearleyParseError) {
    super("Failed to parse");
    // console.log(error);
    this.line = error.token.line - 1;
    this.col = error.token.col;
    this.offsetNearley = error.offset;
    this.offsetMoo = error.token.offset;
  }
}
export interface NearleyParseError {
  offset: number;
  token: Token;
}
