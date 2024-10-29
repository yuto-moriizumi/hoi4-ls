import { modifier_rule } from "../modifier_rule";
import { trigger } from "../triggers";
import {
  either,
  obj,
  variable_field,
  value,
  enumRef,
  array,
  enumRefKey,
  root,
  typeDefKey,
} from "../utils";

const country_tag_alias = either(
  obj(
    {},
    {
      variable: obj(
        {},
        {
          variable: variable_field(),
        },
      ),
      global_event_target: obj(
        {},
        {
          global_event_target: value({}, "global_event_target"),
        },
      ),
      event_target: obj(
        {},
        {
          event_target: value({}, "event_target"),
        },
      ),
      triggered: obj(
        {},
        {
          original_tag: enumRef(
            { cardinality: [0, 1] },
            "explicit_country_tags",
          ),
          targets: array({ cardinality: [0, 1] }, [
            enumRef({ cardinality: [0, Infinity] }, "explicit_country_tags"),
            value({ cardinality: [0, Infinity] }, "variable"),
            ...variable_field({ cardinality: [0, Infinity] }),
          ]),
          target_array: either(
            value({ cardinality: [0, 1] }, "array"),
            ...variable_field({ cardinality: [0, 1] }),
          ),
          country_score: obj(
            { cardinality: [0, 1] },
            {
              [enumRefKey("base_factor")]: variable_field({
                cardinality: [0, 1],
              }),
              ...modifier_rule,
            },
          ),
          fallback: enumRef({ cardinality: [0, 1] }, "explicit_country_tags"),
          ...trigger,
        },
      ),
      fallback: either(
        enumRef({ cardinality: [0, 1] }, "explicit_country_tags"),
        enumRef({ cardinality: [0, 1] }, "country_tags"),
      ),
    },
  ),
);

export const countryTagAliasType = root(
  { path: "/common/country_tag_aliases" },
  {
    [typeDefKey("country_tag_alias")]: country_tag_alias,
  },
);
