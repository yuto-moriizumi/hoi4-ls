import { Writer } from "jomini/dist/umd/jomini";
import { Pairs } from "./Pairs";

type Value = Pairs | string | boolean | number;
export class Pair {
  public readonly key: string;
  public readonly value: Value;

  constructor(key: string, value: Value) {
    this.key = key;
    this.value = value;
  }

  public format(writer: Writer) {
    writer.write_unquoted(this.key);
    if (typeof this.value === "string") {
      writer.write_unquoted(this.value);
      return;
    }
    if (typeof this.value === "boolean") {
      writer.write_bool(this.value);
      return;
    }
    if (typeof this.value === "number") {
      writer.write_integer(this.value);
      return;
    }
    writer.write_object_start();
    this.value.format(writer);
    writer.write_end();
  }
}
