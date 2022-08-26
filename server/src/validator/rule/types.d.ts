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

export type Rule = PrimitiveRule | RequireOne<RawObjectRule>;

type PrimitiveRule = BaseRule & {
  type: Omit<Value, Value.OBJECT>;
};

type RawObjectRule = BaseRule & {
  type: Value.OBJECT;
  syntax: Record<string, Rule | Rule[]>;
  provide: { context: Context; scope: Scope };
};

type NormalizedObjectRule = BaseRule & {
  type: Value.OBJECT;
  syntax?: Record<string, Rule | Rule[]>;
};

type BaseRule = {
  cardinality?: [number, number | "inf"]; // default is [1,1]
};

// type NormalizedRule = PrimitiveRule | NormalizedObjectRule;

interface NormalizedRule extends PrimitiveRule {
  type: Value;
  syntax?: Record<string, Rule | Rule[]>;
}

type A = B & {
  _type: string;
  _cardinality?: [number, number | "inf"]; // default is [1,1]
  _provide?: { context: Context; scope: Scope };
};

type B = {
  [key: string]: A;
};

type RequireOne<T, K extends keyof T = keyof T> = K extends keyof T
  ? PartialRequire<T, K>
  : never;
type PartialRequire<O, K extends keyof O> = {
  [P in K]-?: O[P];
} & O;
