import { modifier_rule } from "../modifier_rule";
import { trigger } from "../triggers";
import {
  root,
  obj,
  bool,
  either,
  value,
  variable_field,
  array,
  enumRef,
  scopeRef,
  country,
  enumRefKey,
} from "../utils";

export const countryScorerType = root(
  { path: "/common/scorers/country" },
  {
    country_scorer: obj(
      {},
      {
        targets: obj(
          {},
          {
            targets_dynamic: bool({ cardinality: [0, 1] }),
            target_non_existing: bool({ cardinality: [0, 1] }, false),
            target_array: either(
              value({ cardinality: [0, Infinity] }, "array"),
              ...variable_field({ cardinality: [0, Infinity] }),
            ),
            targets: array({ cardinality: [0, Infinity] }, [
              enumRef({ cardinality: [0, Infinity] }, "country_tags"),
              value({ cardinality: [0, Infinity] }, "variable"),
              ...variable_field({ cardinality: [0, Infinity] }),
              scopeRef({ cardinality: [0, Infinity] }, "country"),
              enumRef({ cardinality: [0, Infinity] }, "country_tags"),
              value({ cardinality: [0, Infinity] }, "variable"),
              ...variable_field({ cardinality: [0, Infinity] }),
              scopeRef({ cardinality: [0, Infinity] }, "country"),
            ]),
            target_root_trigger: obj(
              {
                replace_scope: { this: country(), root: country() },
                cardinality: [1, Infinity],
              },
              { ...trigger },
            ),
            target_trigger: obj(
              {
                replace_scope: {
                  this: country(),
                  root: country(),
                  from: country(),
                },
                cardinality: [1, Infinity],
              },
              { ...trigger },
            ),
            score: obj(
              {
                replace_scope: {
                  this: country(),
                  root: country(),
                  from: country(),
                },
                cardinality: [0, 1],
              },
              {
                [enumRefKey("base_factor")]: variable_field(),
                ...modifier_rule,
              },
            ),
          },
        ),
      },
    ),
  },
);
