export const Value = {
  QUOTED: "quoted",
  UNQUOTED: "unquoted",
  UNQUOTED_LITERAL: "unquoted_literal",
  LOCALISATION: "localisation",
  NUMBER: "number", // number literal or variables
  INT: "int",
  BOOL: "bool",
  OBJECT: "object",
  ENUM: "enum",
  ARRAY: "array",
  REFERENCE_TO: "reference_to",
  REFERENCED_BY: "referennced_by",
} as const;
export type Value = (typeof Value)[keyof typeof Value];

export const enum Scope {
  COUNTRY = "country",
  STATE = "state",
  UNIT_LEADER = "unit_leader",
  STRATEGIC_REGION = "strategic_region",
  AIR = "AIR",
}

export const enum Context {
  TRIGGER = "trigger",
  EFFECT = "effect",
  MODIFIER = "modifier",
  UNIT_STAT = "unit_stat",
}

export type Cardinality = [number, number | "inf"];

type BaseEntryDescriptor = {
  /** Defines how many times can this entry appear. Default value is [1,1] (required) */
  cardinality?: Cardinality;
  replaceScope?: { this?: Scope; root: Scope; from?: Scope };
};

type SimpleValue =
  | typeof Value.QUOTED
  | typeof Value.LOCALISATION
  | typeof Value.INT;

type NumberValueDescriptor =
  | {
      type: typeof Value.NUMBER;
      range?: [number, number];
    }
  // shorthand for { type: typeof Value.NUMBER }
  | typeof Value.NUMBER;

type SimpleValueDescriptor =
  | { type: SimpleValue }
  // shorthand for { type: SimpleValue }
  | SimpleValue;

type BoolValueDescriptor = {
  type: typeof Value.BOOL;
  defaultValue?: boolean;
};

type UnquotedLiteralValueDescriptor =
  | {
      type: typeof Value.UNQUOTED_LITERAL;
      literal: string;
    }
  // shorthand for { type: typeof Value.UNQUOTED_LITERAL}
  | string;

type UnquotedValueDescriptor =
  | {
      type: typeof Value.UNQUOTED;
      /** By setting key, this value will be referenced by the dynamic value */
      referencedBy?: string;
    }
  // shorthand for { type: typeof Value.UNQUOTED }
  | typeof Value.UNQUOTED;

/** Aseert the specified value is in the `values`.
 * The set of values are statically defined in the rules. */
type EnumValueDescriptor =
  | {
      type: typeof Value.ENUM;
      values: string[];
    }
  // shorthand for { type: typeof Value.ENUM, values: string[] }
  | string[];

/** Aseert the specified values are in the `values` */
type ArrayValueDescriptor = {
  type: typeof Value.ARRAY;
  values: EnumValueDescriptor | ReferenceToDescriptor;
};

type ObjectValueDescriptor = {
  type?: typeof Value.OBJECT;
  /** properties for the object. multiple descriptors can be specified as an array since there might be several ways to express the same stuff */
  children?: Entries | OneOf<Entries>;
  dynamicChildren?: {
    key: EnumValueDescriptor | ReferenceToDescriptor;
    value: ValueDescriptor;
    cardinality?: Cardinality;
  }[];
};

/** Assert the value exists in the sets of tag defined with ReferencedByRule
 * This can be used both for key and value */
type ReferenceToDescriptor = {
  type: typeof Value.REFERENCE_TO;
  tag: string | string[];
};

/** Register this value to the tag storage, can be used both for key and value */
// type ReferencedByDescriptor = {
//   type: typeof Value.REFERENCED_BY;
//   tag: string;
//   /** define if this value can be used as Scope */
//   isScope?: boolean;
// };

type OneOf<T> = T[];
type ValueDescriptor =
  | UnquotedLiteralValueDescriptor
  | UnquotedValueDescriptor
  | SimpleValueDescriptor
  | NumberValueDescriptor
  | BoolValueDescriptor
  | EnumValueDescriptor
  | ArrayValueDescriptor
  | ReferenceToDescriptor
  | ObjectValueDescriptor;

export type EntryDescriptor = BaseEntryDescriptor & ValueDescriptor;
export type Entries = {
  [key: string]: EntryDescriptor | OneOf<EntryDescriptor>;
};
export type RootObjectEntryDescriptor = BaseEntryDescriptor &
  ObjectValueDescriptor;
