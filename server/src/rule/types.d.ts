export const enum Value {
  QUOTED = "quoted",
  UNQUOTED = "unquoted",
  NUMBER = "number",
  BOOL = "bool",
}

export const enum Scope {
  COUNTRY = "country",
}

export const enum Context {
  CONDITION = "condition",
  EFFECT = "effect",
}

export type Rule =
  | (
      | {
          type: Value;
        }
      | {
          syntax?: Record<string, Rule | Rule[]>;
        }
    ) & {
      cardinality?: [number, number | "inf"]; // default is [1,1]
      provide?: { context: Context; scope: Scope };
    };
