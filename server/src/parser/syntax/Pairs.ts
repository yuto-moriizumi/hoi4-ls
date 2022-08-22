import { Comment } from "./Comment";
import { Pair } from "./Pair";

export class Pairs {
  private readonly pairs: (Pair | Comment)[];
  constructor(pairs: (Pair | Comment)[]) {
    this.pairs = pairs;
  }
  public format(indent: number): string {
    return this.pairs.map((pair) => pair.format(indent)).join("");
  }
}
