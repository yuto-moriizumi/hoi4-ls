/* eslint-disable @typescript-eslint/no-explicit-any */
export class GenericSyntax {
  [key: string]: unknown;

  constructor(obj: Record<string, any>) {
    this.parseObj(obj);
  }

  public parseObj(obj: Record<string, any>) {
    const keys = Object.keys(obj);
    keys.forEach((key) => {
      const value = obj[key];
      this[key] = GenericSyntax.parseValue(value);
    });
  }

  public static parseValue(value: MyType): MyType2 {
    if (
      typeof value === "string" ||
      typeof value === "boolean" ||
      typeof value === "number"
    )
      return value;
    else if (value instanceof Array)
      return value.map((v: MyType) => GenericSyntax.parseValue(v));
    else if (typeof value === "object") {
      return new GenericSyntax(value);
    }
    throw new Error("Unexpected value type: " + typeof value);
  }
}

type MyType = string | boolean | number | MyType[] | Record<string, unknown>;

type MyType2 = string | boolean | number | MyType[] | GenericSyntax;
