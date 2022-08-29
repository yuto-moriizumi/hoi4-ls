import { RuleContainer } from "./RuleContainer";

export const enum Value {
  QUOTED = "quoted",
  UNQUOTED = "unquoted",
  LOCALISATION = "localisation",
  NUMBER = "number", // number literal or variables
  INT = "int",
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

type BaseRule = {
  cardinality?: [number, number | "inf"]; // default is [1,1]
};

type PrimitiveRule = {
  type: Omit<Value, Value.OBJECT>;
};

type ObjectRule = {
  type?: Value.OBJECT;
  provide?: { context: Context; scope: Scope };
  children?: Record<string, Rule | Rule[]>;
};

export type Rule = BaseRule & (ObjectRule | PrimitiveRule);

export interface NormalizedRule extends Required<BaseRule> {
  type: Value;
  provide?: { context: Context; scope: Scope };
  children?: Record<string, Rule | Rule[]>;
}

export type RuleContainerDict = Record<string, RuleContainer | RuleContainer[]>;
