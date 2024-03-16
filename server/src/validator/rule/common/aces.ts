import { modifiers } from "../modifiers";
import { Value, Scope, RootObjectEntryDescriptor } from "../types";
import { Enum, float } from "../utils";

export const ace: RootObjectEntryDescriptor = {
  rootKey: "modifiers",
  children: {
    type: [Enum("air_units"), { type: Value.ARRAY, values: Enum("air_units") }],
    chance: float(),
    effect: {
      replaceScope: {
        root: Scope.AIR,
        this: Scope.AIR,
      },
      children: modifiers,
    },
  },
};
