import {
  Cardinality,
  Entries,
  EnumValueDescriptor,
  IntValueDescriptor,
  FloatValueDescriptor,
  ReferenceToDescriptor,
  SimpleValueDescriptor,
  UnquotedLiteralValueDescriptor,
  UnquotedValueDescriptor,
  Value,
  Scope,
  PairDescriptor,
  ObjectValueDescriptor,
  BoolValueDescriptor,
  RootObjectPairDescriptor,
  ArrayValueDescriptor,
  ArrayItem,
  EntryDescriptor,
  RootObjectEntryDescriptor,
  ValueDescriptor,
} from "./types";

export function ref(tag: string | string[]): ReferenceToDescriptor {
  return { type: Value.REFERENCE_TO, tag };
}
// export function typeRef(type: string) {
//   return ref(type);
// }

export function typeRef(type: string): ReferenceToDescriptor;
export function typeRef(
  entryDescriptor: PairDescriptor,
  type: string,
): ReferenceToDescriptor;

export function typeRef(
  typeOrEntryDescriptor: string | PairDescriptor,
  type?: string,
): ReferenceToDescriptor {
  if (typeof typeOrEntryDescriptor === "string")
    return ref(typeOrEntryDescriptor);
  return {
    type: Value.REFERENCE_TO,
    tag: type as string,
  };
}

/** Register this value to the speficied tag storage */
export function typeDefKey(tag: string) {
  return JSON.stringify({
    type: Value.UNQUOTED,
    referencedBy: tag,
  } satisfies UnquotedValueDescriptor);
}
export function typeRefKey(tag: string) {
  return JSON.stringify({
    type: Value.REFERENCE_TO,
    tag,
  } satisfies ReferenceToDescriptor);
}

export function entryMap(entries: Entries, cardinality: Cardinality): Entries {
  return Object.fromEntries(
    Object.entries(entries).map(([key, value]) => {
      if (Array.isArray(value)) throw new Error("Array is not supported");
      if (typeof value === "object") return [key, { ...value, cardinality }];
      if (isUnquotedLiteral(value))
        return [
          key,
          { type: Value.UNQUOTED_LITERAL, literal: value, cardinality },
        ];
      return [key, { type: value, cardinality }];
    }),
  );
}

function isUnquotedLiteral(str: string) {
  return str in Value;
}

export function subtype(type: string) {
  return type;
}

/** Enum can be statically resolved if it's defined within rules.
 * However this dynamic resolution function is nice to have for the ease of conversion with AI */
export function Enum(values: string[]): EnumValueDescriptor;
export function Enum(key: string): EnumValueDescriptor | ReferenceToDescriptor;
export function Enum(keyOrValues: string | string[]) {
  if (keyOrValues instanceof Array)
    return { type: Value.ENUM, values: keyOrValues };
  if (keyOrValues in EnumDict)
    return { type: Value.ENUM, values: EnumDict[keyOrValues] };
  return ref(keyOrValues);
}

export function enumRef(key: string): ReferenceToDescriptor;
export function enumRef(values: string[]): ReferenceToDescriptor;
export function enumRef(
  pairDescriptor: PairDescriptor,
  key: string,
): ReferenceToDescriptor;
export function enumRef(
  pairDescriptor: PairDescriptor,
  values: string[],
): EnumValueDescriptor;

export function enumRef(
  keyOrValuesOrPairDescriptor: string | string[] | PairDescriptor,
  keyOrValues?: string | string[],
) {
  if (keyOrValuesOrPairDescriptor instanceof Array)
    return ref(keyOrValuesOrPairDescriptor);
  if (typeof keyOrValuesOrPairDescriptor === "string")
    return ref(keyOrValuesOrPairDescriptor);
  if (keyOrValues instanceof Array) {
    return {
      type: Value.ENUM,
      values: keyOrValues,
      ...keyOrValuesOrPairDescriptor,
    } satisfies EnumValueDescriptor;
  }
  return {
    type: Value.REFERENCE_TO,
    tag: keyOrValues as string,
    ...keyOrValuesOrPairDescriptor,
  };
}
export const valueRef = enumRef;
export const value = enumRef;
export const scopeRef = enumRef;

/** To be updated with enums.ts */
const EnumDict: Record<string, string[]> = {
  something: ["a", "b", "c"],
};
export function enumRefKey(key: string) {
  return JSON.stringify(enumRef(key));
}
export function valueRefKey(key: string) {
  return JSON.stringify(enumRef(key));
}

export function valueSet(tag: string): UnquotedValueDescriptor {
  return { type: Value.UNQUOTED, referencedBy: tag };
}

export function value_set(entryDescriptor: PairDescriptor, tag: string) {
  return { type: Value.UNQUOTED, referencedBy: tag, ...entryDescriptor };
}

export function float(
  pairDescriptor?: PairDescriptor,
  min?: number,
  max?: number,
): FloatValueDescriptor {
  if (min === undefined) return { type: Value.FLOAT, ...pairDescriptor };
  return { type: Value.FLOAT, ...pairDescriptor, range: [min, max!] };
}

export const number = float;
export const percentage_field = float;

export function literal(
  literal: string | number,
): UnquotedLiteralValueDescriptor;
export function literal(
  pairDescriptor: PairDescriptor,
  literal: string | number,
): UnquotedLiteralValueDescriptor;
export function literal(
  literalOrPairDescriptor?: PairDescriptor | string | number,
  literal?: string | number,
): UnquotedLiteralValueDescriptor {
  if (
    typeof literalOrPairDescriptor === "string" ||
    typeof literalOrPairDescriptor === "number"
  )
    return { type: Value.UNQUOTED_LITERAL, literal: literalOrPairDescriptor };
  return {
    type: Value.UNQUOTED_LITERAL,
    literal: literal!,
    ...literalOrPairDescriptor,
  };
}

export function localisation(
  pairDescriptor?: PairDescriptor,
): SimpleValueDescriptor {
  return { type: Value.LOCALISATION, ...pairDescriptor };
}
export const localisation_inline = localisation;

export function int(
  pairDescriptor?: PairDescriptor,
  min?: number,
  max?: number,
): IntValueDescriptor {
  if (min === undefined) return { type: Value.INT, ...pairDescriptor };
  return { type: Value.INT, ...pairDescriptor, range: [min, max!] };
}

export function bool(
  pairDescriptor?: PairDescriptor,
  defaultValue?: boolean,
): BoolValueDescriptor {
  return { type: Value.BOOL, ...pairDescriptor, defaultValue };
}

export function datetime_field(
  entryDescriptor?: PairDescriptor,
): SimpleValueDescriptor {
  return { type: Value.DATETIME, ...entryDescriptor };
}

export function scalar(
  entryDescriptor?: PairDescriptor,
): UnquotedValueDescriptor {
  return { type: Value.UNQUOTED, ...entryDescriptor };
}

export function unitLeader() {
  return Scope.UNIT_LEADER;
}

export function unit_leader() {
  return Scope.UNIT_LEADER;
}

export function operative() {
  return Scope.OPERATIVE;
}

export function country() {
  return Scope.COUNTRY;
}

export function state() {
  return Scope.STATE;
}

export function purchase_contract() {
  return Scope.PURCHASE_CONTRACT;
}

export function military_industrial_organization() {
  return Scope.MILITARY_INDUSTRIAL_ORGANIZATION;
}

export function obj(
  entryDescriptor: PairDescriptor,
  children: Entries,
): ObjectValueDescriptor {
  return {
    type: Value.OBJECT,
    ...entryDescriptor,
    children,
  };
}

export function root(
  pairDescriptor: RootObjectPairDescriptor,
  children: Entries,
): RootObjectEntryDescriptor {
  return {
    type: Value.OBJECT,
    ...pairDescriptor,
    children,
  };
}

export function array(
  pairDescriptor: PairDescriptor,
  items: ArrayItem[],
): ArrayValueDescriptor {
  return {
    type: Value.ARRAY,
    values: items,
    ...pairDescriptor,
  };
}

export function either(...items: EntryDescriptor<ValueDescriptor>[]) {
  return items;
}

export function air() {
  return Scope.AIR;
}

export function character() {
  return Scope.CHARACTER;
}

export function any() {
  return Scope.ANY;
}

export function variable_field(
  entryDescriptor?: PairDescriptor,
  min?: number,
  max?: number,
) {
  return either(float(entryDescriptor, min, max), {
    type: Value.REFERENCE_TO,
    tag: "variable",
    ...entryDescriptor,
  });
}
export const int_variable_field = variable_field;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function filepath(entryDescriptor?: PairDescriptor, _?: string) {
  return {
    type: Value.QUOTED,
    ...entryDescriptor,
  };
}

export const date_field = filepath;

export function combat() {
  return Scope.COMBAT;
}

export function unit() {
  return Scope.UNIT;
}

export function national_spirt() {
  return {
    type: Value.QUOTED,
  };
}
