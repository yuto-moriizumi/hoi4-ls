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
} from "./types";

export function ref(tag: string | string[]): ReferenceToDescriptor {
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
export function Enum(values: string[]): EnumValueDescriptor;
export function Enum(key: string): EnumValueDescriptor | ReferenceToDescriptor;
export function Enum(keyOrValues: string | string[]) {
  if (keyOrValues instanceof Array)
    return { type: Value.ENUM, values: keyOrValues };
  if (keyOrValues in EnumDict)
    return { type: Value.ENUM, values: EnumDict[keyOrValues] };
  return ref(keyOrValues);
}

/** To be updated with enums.ts */
const EnumDict: Record<string, string[]> = {
  something: ["a", "b", "c"],
};

export function valueSet(tag: string): UnquotedValueDescriptor {
  return { type: Value.UNQUOTED, referencedBy: tag };
}

export function float(): FloatValueDescriptor {
  return { type: Value.FLOAT };
}
export const number = float;

export function literal(literal: string): UnquotedLiteralValueDescriptor {
  return { type: Value.UNQUOTED_LITERAL, literal };
}

export function localisation(): SimpleValueDescriptor {
  return { type: Value.LOCALISATION };
}

export function int(): IntValueDescriptor {
  return { type: Value.INT };
}

export function datetime_field(): SimpleValueDescriptor {
  return { type: Value.DATETIME };
}

export function scalar(): UnquotedValueDescriptor {
  return { type: Value.UNQUOTED };
}
