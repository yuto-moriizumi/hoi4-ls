import { air_units } from "../enums";
import { modifiers } from "../modifiers";
import { Value, Scope, RootObjectEntryDescriptor } from "../types";

export const ace: RootObjectEntryDescriptor = {
  rootKey: "modifiers",
  dynamicChildren: [
    {
      key: { type: Value.UNQUOTED, referencedBy: "ace" },
      value: {
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
      },
    },
  ],
};
