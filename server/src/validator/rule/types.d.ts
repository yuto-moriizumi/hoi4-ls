export const enum Value {
  QUOTED = "quoted",
  UNQUOTED = "unquoted",
  NUMBER = "number",
  BOOL = "bool",
  OBJECT = "object",
}

export const enum Scope {
  COUNTRY = "country",
}

export const enum Context {
  CONDITION = "condition",
  EFFECT = "effect",
}

export type Rule = PrimitiveRule | RawObjectRule;

type PrimitiveRule = BaseRule & {
  type: Omit<Value, Value.OBJECT>;
};

type RawObjectRule = BaseRule & {
  type?: Value.OBJECT;
  syntax?: Record<string, Rule | Rule[]>;
};

type NormalizedObjectRule = BaseRule & {
  type: Value.OBJECT;
  syntax?: Record<string, Rule | Rule[]>;
};

type BaseRule = {
  cardinality?: [number, number | "inf"]; // default is [1,1]
  provide?: { context: Context; scope: Scope };
};

type NormalizedRule = PrimitiveRule | NormalizedObjectRule;
