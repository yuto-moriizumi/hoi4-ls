import { effects } from "../effects";
import { modifiers } from "../modifiers";
import { triggers } from "../triggers";
import { RootObjectEntryDescriptor, Scope, Value } from "../types";

export const balance_of_power: RootObjectEntryDescriptor = {
  children: {
    initial_value: { type: Value.NUMBER, cardinality: [0, 1], range: [-1, 1] },
    left_side: Value.UNQUOTED,
    right_side: Value.UNQUOTED,
    decision_category: { type: Value.UNQUOTED },
    range: {
      cardinality: [0, "inf"],
      children: {
        id: Value.UNQUOTED,
        min: { type: Value.NUMBER, range: [-1, 1] },
        max: { type: Value.NUMBER, range: [-1, 1] },
        modifier: {
          replaceScope: {
            this: Scope.COUNTRY,
            root: Scope.COUNTRY,
          },
          cardinality: [0, 1],
          children: modifiers,
        },
        on_activate: {
          replaceScope: {
            this: Scope.COUNTRY,
            root: Scope.COUNTRY,
          },
          cardinality: [0, 1],
          children: {
            limit: {
              cardinality: [0, "inf"],
              children: triggers,
            },
            ...effects,
          },
        },
        on_deactivate: {
          replaceScope: {
            this: Scope.COUNTRY,
            root: Scope.COUNTRY,
          },
          cardinality: [0, 1],
          children: {
            limit: {
              cardinality: [0, "inf"],
              children: triggers,
            },
            ...effects,
          },
        },
      },
    },
    side: {
      cardinality: [2, "inf"],
      children: {
        id: Value.UNQUOTED,
        icon: { type: Value.UNQUOTED },
        range: {
          cardinality: [1, "inf"],
          children: {
            id: Value.UNQUOTED,
            min: { type: Value.NUMBER, range: [-1, 1] },
            max: { type: Value.NUMBER, range: [-1, 1] },
            modifier: {
              replaceScope: {
                this: Scope.COUNTRY,
                root: Scope.COUNTRY,
              },
              cardinality: [0, 1],
              children: modifiers,
            },
            on_activate: {
              replaceScope: {
                this: Scope.COUNTRY,
                root: Scope.COUNTRY,
              },
              cardinality: [0, 1],
              children: {
                limit: {
                  cardinality: [0, "inf"],
                  children: triggers,
                },
                ...effects,
              },
            },
            on_deactivate: {
              replaceScope: {
                this: Scope.COUNTRY,
                root: Scope.COUNTRY,
              },
              cardinality: [0, 1],
              children: {
                limit: {
                  cardinality: [0, "inf"],
                  children: triggers,
                },
                ...effects,
              },
            },
          },
        },
      },
    },
  },
};
