import { add_factor } from "./enums";
import { triggers } from "./triggers";
import { Entries, Value } from "./types";

export const modifier_rule: Entries = {
  modifier: {
    children: triggers,
    dynamicChildren: [
      {
        key: { type: Value.ENUM, values: add_factor },
        value: Value.FLOAT,
        cardinality: [0, Infinity],
      },
    ],
  },
};
