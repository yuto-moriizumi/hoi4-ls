export const enum Value {
  QUOTED = "quoted",
  UNQUOTED = "unquoted",
  NUMBER = "number",
  BOOL = "bool",
}

export type Rule =
  | (
      | {
          type: Value;
        }
      | {
          syntax: Record<string, Rule>;
        }
    ) & {
      optional?: true;
    };
