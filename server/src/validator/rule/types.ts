export const Value = {
  QUOTED: "quoted",
  UNQUOTED: "unquoted",
  UNQUOTED_LITERAL: "unquoted_literal",
  LOCALISATION: "localisation",
  DATETIME: "datetime",
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
  CHARACTER = "character",
}

export const enum Context {
  TRIGGER = "trigger",
  EFFECT = "effect",
  MODIFIER = "modifier",
  UNIT_STAT = "unit_stat",
}

export type Cardinality = [number, number];

type BaseEntryDescriptor = {
  /** Defines how many times can this entry appear. Default value is [1,1] (required) */
  cardinality?: Cardinality;
  replaceScope?: { this?: Scope; root: Scope; from?: Scope };
};

type SimpleValue =
  | typeof Value.QUOTED
  | typeof Value.LOCALISATION
  | typeof Value.DATETIME
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

export type UnquotedValueDescriptor =
  | {
      type: typeof Value.UNQUOTED;
      /** By setting key, this value will be referenced by the dynamic value */
      referencedBy?: string;
    }
  // shorthand for { type: typeof Value.UNQUOTED }
  | typeof Value.UNQUOTED;

/** Aseert the specified value is in the `values`.
 * The set of values are statically defined in the rules. */
export type EnumValueDescriptor =
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

export type ObjectValueDescriptor = {
  type?: typeof Value.OBJECT;
  /** properties for the object. multiple descriptors can be specified as an array since there might be several ways to express the same stuff */
  children?: Entries | OneOf<Entries>;
  dynamicChildren?: {
    key: EnumValueDescriptor | ReferenceToDescriptor | UnquotedValueDescriptor;
    value: ValueDescriptor;
    cardinality?: Cardinality;
  }[];
};

/** Assert the value exists in the sets of tag defined with ReferencedByRule
 * This can be used both for key and value */
export type ReferenceToDescriptor = {
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
  ObjectValueDescriptor & {
    /** The top level key of the rule
     * By default, the variable name of the rule will be used
     * ex. export const aces = { ... }; will have `aces` as the root key */
    rootKey?: string;
    /** Path of the files to apply this rule
     * By default, it will be applied to all files which has the path of the rule in their paths
     * ex. common/aces.ts will be applied to all files which has common/aces in their paths */
    path?: string;
  };
