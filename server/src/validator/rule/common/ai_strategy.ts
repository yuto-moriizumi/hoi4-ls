import { modifier_rule } from "../modifier_rule";
import { triggers } from "../triggers";
import { Entries, RootObjectEntryDescriptor, Value } from "../types";
import { Enum, int, literal, number, ref } from "../utils";

const ai_strategy_rule: Entries = {
  ai_strategy: {
    children: [
      {
        type: Enum("ai_role_strats"),
        id: ref("ai_roles"),
        value: int(),
      } satisfies Entries,
      {
        type: Enum("unit_strats"),
        id: [ref("unit"), Enum("unit_types"), ref("ai_roles")],
        value: int(),
      } satisfies Entries,
      {
        type: Enum("equipment_strats"),
        id: [ref("equipment"), Enum("unit_types")],
        value: int(),
      } satisfies Entries,
      {
        type: Enum("pp_strats"),
        id: Enum("pp_targets"),
        value: int(),
      } satisfies Entries,
      {
        type: Enum([
          "land_xp_spend_priority",
          "air_xp_spend_priority",
          "navy_xp_spend_priority",
        ]),
        id: Enum("ai_xp_targets"),
        value: int(),
      } satisfies Entries,
      {
        type: literal("area_priority"),
        id: ref("ai_area"),
        value: int(),
      } satisfies Entries,
      {
        type: Enum("ai_diplo_strats"),
        id: [ref("country_tags"), ref("country")],
        value: int(),
      } satisfies Entries,
      {
        type: Enum("ai_diplo_strats"),
        target: ref("ai_area"),
        value: int(),
      } satisfies Entries,
      {
        type: literal("dont_join_wars_with"),
        id: [ref("country_tags"), ref("country")],
        target_country: [
          {
            cardinality: [0, 1],
            ...ref("country_tags"),
          },
          {
            cardinality: [0, 1],
            ...ref("country"),
          },
        ],
        value: int(),
      } satisfies Entries,
    ],
  },
};

export const ai_strategy: RootObjectEntryDescriptor = {
  children: {
    allowed: {
      cardinality: [0, 1],
      children: triggers,
    },
    target_array: { type: Value.UNQUOTED, cardinality: [0, 1] },
    targets: {
      cardinality: [0, Infinity],
      type: Value.ARRAY,
      values: ref("country"),
    },
    enable_reverse: {
      cardinality: [0, 1],
      children: triggers,
    },
    enable: {
      cardinality: [0, 1],
      children: triggers,
    },
    abort: {
      cardinality: [0, 1],
      children: triggers,
    },
    abort_when_not_enabled: { type: Value.BOOL, cardinality: [0, 1] },
    reversed: { type: Value.BOOL, cardinality: [0, 1] },
    ...ai_strategy_rule,
  },
};

export const ai_strategy_plan: RootObjectEntryDescriptor = {
  children: {
    name: { type: Value.UNQUOTED, cardinality: [0, 1] },
    desc: { type: Value.LOCALISATION, cardinality: [0, 1] },
    allowed: { cardinality: [0, 1], children: triggers },
    enable: { children: triggers },
    abort: {
      cardinality: [0, 1],
      children: triggers,
    },
    ai_national_focuses: {
      cardinality: [0, Infinity],
      type: Value.ARRAY,
      values: ref(["focus", "shared_focus"]),
    },
    focus_factors: {
      cardinality: [0, Infinity],
      children: {},
      dynamicChildren: [
        {
          key: ref("focus"),
          value: number(),
          cardinality: [0, Infinity],
        },
        {
          key: ref("shared_focus"),
          value: number(),
          cardinality: [0, Infinity],
        },
      ],
    },
    research: {
      cardinality: [0, 1],
      children: {},
      dynamicChildren: [
        {
          key: ref("tech_category"),
          value: number(),
        },
      ],
    },
    ideas: {
      cardinality: [0, 1],
      children: {},
      dynamicChildren: [
        {
          key: ref("idea_name"),
          value: int(),
          cardinality: [0, Infinity],
        },
        {
          key: ref("advisor_token"),
          value: int(),
          cardinality: [0, Infinity],
        },
      ],
    },
    traits: {
      cardinality: [0, 1],
      children: {},
      dynamicChildren: [
        {
          key: ref("country_leader_trait"),
          value: int(),
          cardinality: [0, Infinity],
        },
      ],
    },
    ...ai_strategy_rule,
    weight: {
      cardinality: [0, 1],
      children: modifier_rule,
      dynamicChildren: [
        {
          key: Enum("base_factor"),
          value: number(),
        },
      ],
    },
  },
};

export const types: RootObjectEntryDescriptor = {
  children: {
    type: [
      {
        cardinality: [0, Infinity],
        children: {
          path: { type: Value.UNQUOTED },
          path_strict: { type: Value.BOOL },
        },
      },
      {
        cardinality: [0, Infinity],
        children: {
          path: { type: Value.UNQUOTED },
        },
      },
    ],
  },
};
