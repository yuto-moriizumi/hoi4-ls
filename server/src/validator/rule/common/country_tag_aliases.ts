import { modifier_rule } from "../modifier_rule";
import { triggers } from "../triggers";
import { Value, RootObjectEntryDescriptor, Scope, Entries } from "../types";
import { Enum, ref, scalar } from "../utils";

const fallbackEntry: Entries = {
  fallback: [
    { ...Enum("explicit_country_tags"), cardinality: [0, 1] },
    { ...Enum("country_tags"), cardinality: [0, 1] },
  ],
};
export const country_tag_alias: RootObjectEntryDescriptor = {
  replaceScope: {
    root: Scope.COUNTRY,
    this: Scope.COUNTRY,
  },
  children: [
    {
      ...fallbackEntry,
      variable: scalar(),
    },
    {
      ...fallbackEntry,
      global_event_target: ref("global_event_target"),
    },
    {
      ...fallbackEntry,
      event_target: ref("event_target"),
    },
    {
      ...fallbackEntry,
      original_tag: {
        ...Enum("explicit_country_tags"),
        cardinality: [0, 1],
      },
      targets: {
        type: Value.ARRAY,
        cardinality: [0, Infinity],
        values: [Enum("explicit_country_tags"), ref("variable"), scalar()],
      },
      target_array: [
        { type: Value.UNQUOTED, cardinality: [0, 1] },
        ref("variable_field"),
      ],
      country_score: {
        cardinality: [0, 1],
        children: modifier_rule,
        dynamicChildren: [
          {
            key: Enum("base_factor"),
            value: scalar(),
          },
        ],
      },
      ...triggers,
    },
  ],
};
