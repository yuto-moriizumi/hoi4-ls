export class Comment {
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  public format(indent: number) {
    return "\t".repeat(indent) + this.value + "\n";
  }
}
