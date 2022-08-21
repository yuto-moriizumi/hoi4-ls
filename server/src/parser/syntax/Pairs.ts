import { Jomini } from "jomini";
import { Writer } from "jomini/dist/umd/jomini";
import { Pair } from "./Pair";

export class Pairs {
  public pairs!: Pair[];
  public async format(writer: Writer) {
    this.pairs.forEach((pair) => pair.format(writer));
  }
}
