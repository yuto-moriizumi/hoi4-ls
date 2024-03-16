import { EntryDescriptor, Value } from "./types";

export const variable_field: EntryDescriptor[] = [
  { type: Value.FLOAT },
  { type: Value.REFERENCE_TO, tag: "variable" },
];
