/**
 * This file contains the types for the rules
 * Each part of hoi4 syntax has name for identification
 * ```
 * key = {
 *  ### cardinarity = 1
 *  key2 = value2
 * }
 * ```
 * The rules for value is called `ValueDescriptor`
 * The rules for key is called `KeyDescriptor`
 * The rules for the pair of key and value is called `PairDescriptor`
 * The rule containing all rules for the key, value and pair is called `EntryDescriptor`
 */

export const Value = {
  QUOTED: "quoted",
  UNQUOTED: "unquoted",
  UNQUOTED_LITERAL: "unquoted_literal",
  LOCALISATION: "localisation",
  DATETIME: "datetime",
  FLOAT: "float", // number literal or variables
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
  COMBAT = "combat",
  MILITARY_INDUSTRIAL_ORGANIZATION = "military_industrial_organization",
  OPERATION = "operation",
  UNIT = "unit",
  PURCHASE_CONTRACT = "purchase_contract",
  OPERATIVE = "operative",
  ANY = "any",
}

export const enum Context {
  TRIGGER = "trigger",
  EFFECT = "effect",
  MODIFIER = "modifier",
  UNIT_STAT = "unit_stat",
}

export type Cardinality = [number, number];

export interface PairDescriptor {
  /** Defines how many times can this entry appear. Default value is [1,1] (required) */
  cardinality?: Cardinality;
  replace_scope?: {
    this?: Scope;
    root?: Scope;
    from?: Scope;
    fromfrom?: Scope;
    prev?: Scope;
  };
  replaceScope?: { this?: Scope; root: Scope; from?: Scope; fromfrom?: Scope };
  push_scope?: Scope;
  /** Currently not used */
  severity?: string;
  scope?: Scope | Scope[];
}

export interface NumberValueDescriptor {
  range?: [number, number];
}

export interface IntValueDescriptor extends NumberValueDescriptor {
  type: typeof Value.INT;
}

export interface FloatValueDescriptor extends NumberValueDescriptor {
  type: typeof Value.FLOAT;
}

export interface SimpleValueDescriptor {
  type: typeof Value.QUOTED | typeof Value.LOCALISATION | typeof Value.DATETIME;
}

export interface BoolValueDescriptor {
  type: typeof Value.BOOL;
  defaultValue?: boolean;
}

export interface UnquotedLiteralValueDescriptor {
  type: typeof Value.UNQUOTED_LITERAL;
  literal: string | number;
}
// shorthand for { type: typeof Value.UNQUOTED_LITERAL}
// | string;

export interface UnquotedValueDescriptor {
  type: typeof Value.UNQUOTED;
  /** By setting key, this value will be referenced by the dynamic value */
  referencedBy?: string;
}
// shorthand for { type: typeof Value.UNQUOTED }
// | typeof Value.UNQUOTED;

/** Assert the specified value is in the `values`.
 * The set of values are statically defined in the rules. */
export interface EnumValueDescriptor {
  type: typeof Value.ENUM;
  values: string[];
}
// shorthand for { type: typeof Value.ENUM, values: string[] }
// | string[];

/** Assert the specified values are in the `values` */
export interface ArrayValueDescriptor {
  type: typeof Value.ARRAY;
  values: ArrayItem | ArrayItem[];
}

export type ArrayItem =
  | EnumValueDescriptor
  | ReferenceToDescriptor
  | ArrayFloatItem
  | ArrayIntItem
  | UnquotedValueDescriptor
  | EntryDescriptor<ValueDescriptor>;

interface ArrayNumberItem {
  /** Defines how many times can this entry appear. Default value is [1,1] (required) */
  cardinality?: Cardinality;
}
interface ArrayFloatItem extends ArrayNumberItem, FloatValueDescriptor {}
interface ArrayIntItem extends ArrayNumberItem, IntValueDescriptor {}

export interface ObjectValueDescriptor {
  type?: typeof Value.OBJECT;
  /** properties for the object. multiple descriptors can be specified as an array since there might be several ways to express the same stuff */
  children: Entries | OneOf<Entries>;
  dynamicChildren?: {
    key: EnumValueDescriptor | ReferenceToDescriptor | UnquotedValueDescriptor;
    value: ValueDescriptor;
    cardinality?: Cardinality;
  }[];
}

/** Assert the value exists in the sets of tag defined with ReferencedByRule
 * This can be used both for key and value */
export interface ReferenceToDescriptor {
  type: typeof Value.REFERENCE_TO;
  tag: string | string[];
}

/** Register this value to the tag storage, can be used both for key and value */
// interface ReferencedByDescriptor {
//   type: typeof Value.REFERENCED_BY;
//   tag: string;
//   /** define if this value can be used as Scope */
//   isScope?: boolean;
// }

type OneOf<T> = T[];
export type ValueDescriptor =
  | UnquotedLiteralValueDescriptor
  | UnquotedValueDescriptor
  | SimpleValueDescriptor
  | FloatValueDescriptor
  | IntValueDescriptor
  | BoolValueDescriptor
  | EnumValueDescriptor
  | ArrayValueDescriptor
  | ReferenceToDescriptor
  | ObjectValueDescriptor;

export type EntryDescriptor<VD extends ValueDescriptor> = PairDescriptor & VD;
export type Entries = {
  [key: string]:
    | EntryDescriptor<ValueDescriptor>
    | OneOf<EntryDescriptor<ValueDescriptor>>;
};

/** The topmost object representing entire file as an object */
export interface RootObjectPairDescriptor extends PairDescriptor {
  /** Path of the files to apply this rule
   * By default, it will be applied to all files which has the path of the rule in their paths
   * ex. common/aces.ts will be applied to all files which has common/aces in their paths */
  path: string;
  // Currently not used
  unique?: boolean;
  // Currently not used
  path_strict?: boolean;
  // Currently not used
  start_from_root?: boolean;
}
export interface RootObjectEntryDescriptor
  extends RootObjectPairDescriptor,
    ObjectValueDescriptor {}
