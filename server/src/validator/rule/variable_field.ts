import { EntryDescriptor, Value } from "./types";

export const variable_field: EntryDescriptor[] = [
  { type: Value.NUMBER },
  { type: Value.REFERENCE_TO, tag: "variable" },
];
