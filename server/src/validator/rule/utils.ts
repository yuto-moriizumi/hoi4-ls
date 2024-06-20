import {
  Cardinality,
  Entries,
  EnumValueDescriptor,
  ReferenceToDescriptor,
  UnquotedValueDescriptor,
  Value,
} from "./types";

export function ref(tag: string) {
  return { type: Value.REFERENCE_TO, tag };
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
export function Enum(key: string): EnumValueDescriptor | ReferenceToDescriptor {
  if (key in EnumDict) return { type: Value.ENUM, values: EnumDict[key] };
  return ref(key);
}

/** To be updated with enums.ts */
const EnumDict: Record<string, string[]> = {
  something: ["a", "b", "c"],
};

export function valueSet(tag: string): UnquotedValueDescriptor {
  return { type: Value.UNQUOTED, referencedBy: tag };
}
