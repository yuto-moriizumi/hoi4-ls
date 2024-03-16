import { effects } from "../effects";
import { modifiers } from "../modifiers";
import { triggers } from "../triggers";
import { RootObjectEntryDescriptor, Scope, Value } from "../types";
import { ref, valueSet } from "../utils";

export const balance_of_power: RootObjectEntryDescriptor = {
  children: {
    initial_value: { type: Value.FLOAT, cardinality: [0, 1], range: [-1, 1] },
    left_side: ref("bop_side"),
    right_side: ref("bop_side"),
    decision_category: ref("decision_category"),
    range: {
      cardinality: [0, Infinity],
      children: {
        id: valueSet("bop_range_id"),
        min: { type: Value.FLOAT, range: [-1, 1] },
        max: { type: Value.FLOAT, range: [-1, 1] },
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
              cardinality: [0, Infinity],
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
              cardinality: [0, Infinity],
              children: triggers,
            },
            ...effects,
          },
        },
      },
    },
    side: {
      cardinality: [2, Infinity],
      children: {
        id: valueSet("bop_side"),
        icon: { type: Value.UNQUOTED },
        range: {
          cardinality: [1, Infinity],
          children: {
            id: valueSet("bop_range_id"),
            min: { type: Value.FLOAT, range: [-1, 1] },
            max: { type: Value.FLOAT, range: [-1, 1] },
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
                  cardinality: [0, Infinity],
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
                  cardinality: [0, Infinity],
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
