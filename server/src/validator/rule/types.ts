export const Value = {
  QUOTED: "quoted",
  UNQUOTED: "unquoted",
  LOCALISATION: "localisation",
  NUMBER: "number", // number literal or variables
  INT: "int",
  BOOL: "bool",
  OBJECT: "object",
} as const;
export type Value = (typeof Value)[keyof typeof Value];

export const enum Scope {
  COUNTRY = "country",
}

export const enum Context {
  TRIGGER = "trigger",
  EFFECT = "effect",
}

export type Cardinality = [number, number | "inf"];

type BaseRule = {
  cardinality?: Cardinality;
};

type PrimitiveRule = {
  type: Exclude<Value, typeof Value.OBJECT | typeof Value.BOOL>;
};

type BoolRule = {
  type: typeof Value.BOOL;
  defaultValue: boolean;
};

export type RuleDict = Record<string, Rule | Rule[]>;

type ObjectRule = {
  type?: typeof Value.OBJECT;
  provide?: { context: Context; scope: Scope };
  /** properties for the object. rule can be specified multiple times for the same key since there might be several ways to express the same stuff */
  children?: RuleDict;
};

export type Rule = BaseRule & (ObjectRule | BoolRule | PrimitiveRule);

/** The normalized rule used by validaters.
 * All of raw rules, including effects, modifiers and other syntaxes will be transformed into this so that validators can work without deep knowledge of syntaxes. */
export interface NormalizedRule {
  type: Value;
  cardinality: Cardinality;
  provide?: { context: Context; scope: Scope };
  children?: Record<string, NormalizedRule[]>;
}

export type NormalizedRuleDict = Record<string, NormalizedRule[]>;
