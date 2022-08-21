import { Writer } from "jomini/dist/umd/jomini";

export class Pair {
  public key!: string;
  public value!: { format: () => void } | any;
  public format(writer: Writer) {
    writer.write_unquoted(this.key);
    this.value.format();
    writer.write_end();
  }
}
