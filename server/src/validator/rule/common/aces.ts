import { air_units } from "../enums";
import { modifiers } from "../modifiers";
import { Value, Scope, RootObjectEntryDescriptor } from "../types";

export const ace: RootObjectEntryDescriptor = {
  children: {
    type: [air_units, { type: Value.ARRAY, values: air_units }],
    chance: Value.NUMBER,
    effect: {
      replaceScope: {
        root: Scope.AIR,
        this: Scope.AIR,
      },
      children: modifiers,
    },
  },
};
