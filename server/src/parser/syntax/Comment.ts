import { Writer } from "jomini/dist/umd/jomini";

export class Comment {
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  public format(writer: Writer) {
    writer.write_unquoted(this.value);
  }
}
