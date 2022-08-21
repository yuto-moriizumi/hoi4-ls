import { Jomini } from "jomini";
import { Writer } from "jomini/dist/umd/jomini";
import { Comment } from "./Comment";
import { Pair } from "./Pair";

export class Pairs {
  public readonly pairs: (Pair | Comment)[];
  constructor(pairs: (Pair | Comment)[]) {
    this.pairs = pairs;
  }
  public format(writer: Writer) {
    this.pairs.forEach((pair) => pair.format(writer));
  }
}
