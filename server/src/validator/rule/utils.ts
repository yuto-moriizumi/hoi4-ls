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
  BaseEntryDescriptor,
  ObjectValueDescriptor,
  BoolValueDescriptor,
  RootObjectEntryDescriptor,
  ArrayValueDescriptor,
  ArrayItem,
  EntryDescriptor,
} from "./types";

export function ref(tag: string | string[]): ReferenceToDescriptor {
  return { type: Value.REFERENCE_TO, tag };
}
// export function typeRef(type: string) {
//   return ref(type);
// }

export function typeRef(type: string): ReferenceToDescriptor;
export function typeRef(
  entryDescriptor: BaseEntryDescriptor,
  type: string,
): ReferenceToDescriptor;

export function typeRef(
  typeOrEntryDescriptor: string | BaseEntryDescriptor,
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
  entryDescriptor: BaseEntryDescriptor,
  key: string,
): ReferenceToDescriptor;
export function enumRef(
  entryDescriptor: BaseEntryDescriptor,
  values: string[],
): EnumValueDescriptor;

export function enumRef(
  keyOrValuesOrEntryDescriptor: string | string[] | BaseEntryDescriptor,
  keyOrValues?: string | string[],
) {
  if (keyOrValuesOrEntryDescriptor instanceof Array)
    return ref(keyOrValuesOrEntryDescriptor);
  if (typeof keyOrValuesOrEntryDescriptor === "string")
    return ref(keyOrValuesOrEntryDescriptor);
  if (keyOrValues instanceof Array) {
    return {
      type: Value.ENUM,
      values: keyOrValues,
      ...keyOrValuesOrEntryDescriptor,
    } satisfies EnumValueDescriptor;
  }
  return {
    type: Value.REFERENCE_TO,
    tag: keyOrValues as string,
    ...keyOrValuesOrEntryDescriptor,
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

export function value_set(entryDescriptor: BaseEntryDescriptor, tag: string) {
  return { type: Value.UNQUOTED, referencedBy: tag, ...entryDescriptor };
}

export function float(
  entryDescriptor?: BaseEntryDescriptor,
  min?: number,
  max?: number,
): FloatValueDescriptor {
  if (min === undefined) return { type: Value.FLOAT, ...entryDescriptor };
  return { type: Value.FLOAT, ...entryDescriptor, range: [min, max!] };
}

export const number = float;

export function literal(
  literal: string | number,
): UnquotedLiteralValueDescriptor;
export function literal(
  entryDescriptor: BaseEntryDescriptor,
  literal: string | number,
): UnquotedLiteralValueDescriptor;
export function literal(
  literalOrEntryDescriptor?: BaseEntryDescriptor | string | number,
  literal?: string | number,
): UnquotedLiteralValueDescriptor {
  if (
    typeof literalOrEntryDescriptor === "string" ||
    typeof literalOrEntryDescriptor === "number"
  )
    return { type: Value.UNQUOTED_LITERAL, literal: literalOrEntryDescriptor };
  return {
    type: Value.UNQUOTED_LITERAL,
    literal: literal!,
    ...literalOrEntryDescriptor,
  };
}

export function localisation(
  entryDescriptor?: BaseEntryDescriptor,
): SimpleValueDescriptor {
  return { type: Value.LOCALISATION, ...entryDescriptor };
}

export function int(
  entryDescriptor?: BaseEntryDescriptor,
  min?: number,
  max?: number,
): IntValueDescriptor {
  if (min === undefined) return { type: Value.INT, ...entryDescriptor };
  return { type: Value.INT, ...entryDescriptor, range: [min, max!] };
}

export function bool(
  entryDescriptor?: BaseEntryDescriptor,
  defaultValue?: boolean,
): BoolValueDescriptor {
  return { type: Value.BOOL, ...entryDescriptor, defaultValue };
}

export function datetime_field(
  entryDescriptor?: BaseEntryDescriptor,
): SimpleValueDescriptor {
  return { type: Value.DATETIME, ...entryDescriptor };
}

export function scalar(
  entryDescriptor?: BaseEntryDescriptor,
): UnquotedValueDescriptor {
  return { type: Value.UNQUOTED, ...entryDescriptor };
}

export function unitLeader() {
  return Scope.UNIT_LEADER;
}

export function unit_leader() {
  return Scope.UNIT_LEADER;
}

export function country() {
  return Scope.COUNTRY;
}

export function state() {
  return Scope.STATE;
}

export function military_industrial_organization() {
  return Scope.MILITARY_INDUSTRIAL_ORGANIZATION;
}

export function obj(
  entryDescriptor: BaseEntryDescriptor,
  children: Entries,
): ObjectValueDescriptor {
  return {
    type: Value.OBJECT,
    ...entryDescriptor,
    children,
  };
}

export function root(
  entryDescriptor: RootObjectEntryDescriptor,
  children: Entries,
): RootObjectEntryDescriptor & ObjectValueDescriptor {
  return {
    type: Value.OBJECT,
    ...entryDescriptor,
    children,
  };
}

export function array(
  entryDescriptor: BaseEntryDescriptor,
  items: ArrayItem[],
): ArrayValueDescriptor {
  return {
    type: Value.ARRAY,
    values: items,
    ...entryDescriptor,
  };
}

export function either(...items: EntryDescriptor[]) {
  return items;
}

export function air() {
  return Scope.AIR;
}

export function variable_field(entryDescriptor?: BaseEntryDescriptor) {
  return either(float(entryDescriptor), {
    type: Value.REFERENCE_TO,
    tag: "variable",
    ...entryDescriptor,
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function filepath(entryDescriptor: BaseEntryDescriptor, _: string) {
  return {
    type: Value.QUOTED,
    ...entryDescriptor,
  };
}

export function combat() {
  return Scope.COMBAT;
}

export function national_spirt() {
  return {
    type: Value.QUOTED,
  };
}
