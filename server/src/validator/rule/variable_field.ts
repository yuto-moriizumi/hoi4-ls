import { EntryDescriptor, Value } from "./types";

// TODO: Rename this to float_variable_field or something better
export const variable_field: EntryDescriptor[] = [
  { type: Value.FLOAT },
  { type: Value.REFERENCE_TO, tag: "variable" },
];

export const int_variable_field: EntryDescriptor[] = [
  { type: Value.INT },
  { type: Value.REFERENCE_TO, tag: "variable" },
];
