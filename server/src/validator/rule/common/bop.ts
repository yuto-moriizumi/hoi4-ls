import { effect } from "../effects";
import { modifier } from "../modifiers";
import { trigger } from "../triggers";
import {
  root,
  obj,
  float,
  value,
  typeRef,
  country,
  valueSet,
  value_set,
} from "../utils";

export const balanceOfPowerType = root(
  { path: "/common/bop" },
  {
    balance_of_power: obj(
      {},
      {
        initial_value: float({ cardinality: [0, 1] }, -1, 1),
        left_side: value({}, "bop_side"),
        right_side: value({}, "bop_side"),
        decision_category: typeRef({}, "decision_category"),
        range: obj(
          { cardinality: [0, Infinity] },
          {
            id: valueSet("bop_range_id"),
            min: float({}, -1, 1),
            max: float({}, -1, 1),
            modifier: obj(
              {
                replace_scope: { this: country(), root: country() },
                cardinality: [0, 1],
              },
              {
                ...modifier,
              },
            ),
            on_activate: obj(
              {
                replace_scope: { this: country(), root: country() },
                cardinality: [0, 1],
              },
              {
                limit: obj(
                  { cardinality: [0, Infinity] },
                  {
                    ...trigger,
                  },
                ),
                ...effect,
              },
            ),
            on_deactivate: obj(
              {
                replace_scope: { this: country(), root: country() },
                cardinality: [0, 1],
              },
              {
                limit: obj(
                  { cardinality: [0, Infinity] },
                  {
                    ...trigger,
                  },
                ),
                ...effect,
              },
            ),
          },
        ),
        side: obj(
          { cardinality: [2, Infinity] },
          {
            id: value_set({}, "bop_side"),
            icon: typeRef({}, "spriteType"),
            range: obj(
              { cardinality: [1, Infinity] },
              {
                id: value_set({}, "bop_range_id"),
                min: float({}, -1, 1),
                max: float({}, -1, 1),
                modifier: obj(
                  {
                    replace_scope: { this: country(), root: country() },
                    cardinality: [0, 1],
                  },
                  {
                    ...modifier,
                  },
                ),
                on_activate: obj(
                  {
                    replace_scope: { this: country(), root: country() },
                    cardinality: [0, 1],
                  },
                  {
                    limit: obj(
                      { cardinality: [0, Infinity] },
                      {
                        ...trigger,
                      },
                    ),
                    ...effect,
                  },
                ),
                on_deactivate: obj(
                  {
                    replace_scope: { this: country(), root: country() },
                    cardinality: [0, 1],
                  },
                  {
                    limit: obj(
                      { cardinality: [0, Infinity] },
                      {
                        ...trigger,
                      },
                    ),
                    ...effect,
                  },
                ),
              },
            ),
          },
        ),
      },
    ),
  },
);
