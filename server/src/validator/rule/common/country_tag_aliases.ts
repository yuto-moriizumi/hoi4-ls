import { modifier_rule } from "../modifier_rule";
import { triggers } from "../triggers";
import { Value, RootObjectEntryDescriptor, Scope } from "../types";
import { Enum, ref } from "../utils";

export const country_tag_alias: RootObjectEntryDescriptor = {
  replaceScope: {
    root: Scope.COUNTRY,
    this: Scope.COUNTRY,
  },
  children: {
    subtype: [
      {
        key: "variable",
        children: {
          variable: { type: Value.UNQUOTED, values: ref("variable_field") },
        },
      },
      {
        key: "global_event_target",
        children: {
          global_event_target: {
            type: Value.UNQUOTED,
            values: ref("global_event_target"),
          },
        },
      },
      {
        key: "event_target",
        children: {
          event_target: { type: Value.UNQUOTED, values: ref("event_target") },
        },
      },
      {
        key: "triggered",
        children: {
          original_tag: {
            type: Enum("explicit_country_tags"),
            cardinality: [0, 1],
          },
          targets: {
            cardinality: [0, Infinity],
            children: [
              { key: Enum("explicit_country_tags") },
              { key: Value.VARIABLE, values: ref("variable") },
              { key: Value.UNQUOTED, values: ref("variable_field") },
            ],
          },
          target_array: [
            { type: Value.UNQUOTED, cardinality: [0, 1] },
            ref("variable_field"),
          ],
          country_score: {
            cardinality: [0, 1],
            children: {
              base_factor: {
                type: Value.UNQUOTED,
                values: ref("variable_field"),
              },
              ...modifier_rule,
            },
          },
          fallback: {
            type: Enum("explicit_country_tags"),
            cardinality: [0, 1],
          },
          ...triggers,
        },
      },
    ],
    fallback: [
      { type: Enum("explicit_country_tags"), cardinality: [0, 1] },
      { type: Enum("country_tags"), cardinality: [0, 1] },
    ],
  },
};

export const types: RootObjectEntryDescriptor = {
  children: {
    type: [
      {
        path: { type: Value.UNQUOTED },
        subtype: [
          {
            key: "variable",
            children: {
              variable: { type: Value.UNQUOTED, values: ref("variable_field") },
            },
          },
          {
            key: "global_event_target",
            children: {
              global_event_target: {
                type: Value.UNQUOTED,
                values: ref("global_event_target"),
              },
            },
          },
          {
            key: "event_target",
            children: {
              event_target: {
                type: Value.UNQUOTED,
                values: ref("event_target"),
              },
            },
          },
          {
            key: "triggered",
            children: {},
          },
        ],
      },
    ],
  },
};

export const enums: RootObjectEntryDescriptor = {
  children: {
    country_tags: {
      path: { type: Value.UNQUOTED, values: "game/common/country_tag_aliases" },
      start_from_root: { type: Value.BOOL, values: true },
      name: {
        children: {
          enum_name: {},
        },
      },
    },
  },
};
