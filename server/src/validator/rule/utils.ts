import { Cardinality, Entries, Value } from "./types";

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
