import { Writer } from "jomini/dist/umd/jomini";
import { Pair } from "./Pair";

export class Comment extends Pair {
  public readonly key = "comment";
  public readonly value: string;

  constructor(value: string) {
    super();
    this.value = value;
  }

  public format(writer: Writer) {
    writer.write_unquoted(this.value);
  }
}
