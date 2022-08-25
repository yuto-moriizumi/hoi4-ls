import { PairOrCommentArr } from "../postProcess";

export class Pairs {
  public readonly pairs: PairOrCommentArr;
  constructor(pairs: PairOrCommentArr) {
    this.pairs = pairs;
  }
  public format(indent: number): string {
    return this.pairs.map((pair) => pair.format(indent)).join("");
  }
}
