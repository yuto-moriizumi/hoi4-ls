import {
  ai_diplo_strats,
  ai_role_strats,
  ai_xp_targets,
  base_factor,
  equipment_strats,
  pp_strats,
  pp_targets,
  unit_strats,
  unit_types,
} from "../enums";
import { modifier_rule } from "../modifier_rule";
import { triggers } from "../triggers";
import { Entries, RootObjectEntryDescriptor, Value } from "../types";
import { ref } from "../utils";

const ai_strategy_rule: Entries = {
  ai_strategy: {
    children: [
      {
        type: ai_role_strats,
        id: ref("ai_roles"),
        value: Value.INT,
      } satisfies Entries,
      {
        type: unit_strats,
        id: [ref("unit"), unit_types, ref("ai_roles")],
        value: Value.INT,
      } satisfies Entries,
      {
        type: equipment_strats,
        id: [ref("equipment"), unit_types],
        value: Value.INT,
      } satisfies Entries,
      {
        type: pp_strats,
        id: pp_targets,
        value: Value.INT,
      } satisfies Entries,
      {
        type: [
          "land_xp_spend_priority",
          "air_xp_spend_priority",
          "navy_xp_spend_priority",
        ],
        id: ai_xp_targets,
        value: Value.INT,
      } satisfies Entries,
      {
        type: "area_priority",
        id: { type: Value.REFERENCE_TO, tag: "ai_area" },
        value: Value.INT,
      } satisfies Entries,
      {
        type: ai_diplo_strats,
        id: [ref("country_tags"), ref("country")],
        value: Value.INT,
      } satisfies Entries,
      {
        type: ai_diplo_strats,
        target: ref("ai_area"),
        value: Value.INT,
      } satisfies Entries,
      {
        type: "dont_join_wars_with",
        id: [ref("country_tags"), ref("country")],
        target_country: [
          {
            cardinality: [0, 1],
            type: Value.REFERENCE_TO,
            tag: "country_tags",
          },
          {
            cardinality: [0, 1],
            type: Value.REFERENCE_TO,
            tag: "country",
          },
        ],
        value: Value.INT,
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
      cardinality: [0, "inf"],
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
    ai_strategy_rule,
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
      cardinality: [0, "inf"],
      type: Value.ARRAY,
      values: { type: Value.REFERENCE_TO, tag: ["focus", "shared_focus"] },
    },
    focus_factors: {
      cardinality: [0, "inf"],
      dynamicChildren: [
        {
          key: ref("focus"),
          value: Value.NUMBER,
          cardinality: [0, "inf"],
        },
        {
          key: ref("shared_focus"),
          value: Value.NUMBER,
          cardinality: [0, "inf"],
        },
      ],
    },
    research: {
      cardinality: [0, 1],
      dynamicChildren: [
        {
          key: ref("tech_category"),
          value: Value.NUMBER,
        },
      ],
    },
    ideas: {
      cardinality: [0, 1],
      dynamicChildren: [
        {
          key: ref("idea_name"),
          value: Value.INT,
          cardinality: [0, "inf"],
        },
        {
          key: ref("advisor_token"),
          value: Value.INT,
          cardinality: [0, "inf"],
        },
      ],
    },
    traits: {
      cardinality: [0, 1],
      dynamicChildren: [
        {
          key: ref("country_leader_trait"),
          value: Value.INT,
          cardinality: [0, "inf"],
        },
      ],
    },
    ...ai_strategy_rule,
    weight: {
      cardinality: [0, 1],
      children: modifier_rule,
      dynamicChildren: [
        {
          key: base_factor,
          value: Value.NUMBER,
        },
      ],
    },
  },
};

export const alias: RootObjectEntryDescriptor = {
  children: {
    ai_strategy_rule: {
      cardinality: [0, "inf"],
    },
  },
};

export const types: RootObjectEntryDescriptor = {
  children: {
    type: [
      {
        cardinality: [0, "inf"],
        children: {
          path: { type: Value.UNQUOTED },
          path_strict: { type: Value.BOOL },
        },
      },
      {
        cardinality: [0, "inf"],
        children: {
          path: { type: Value.UNQUOTED },
        },
      },
    ],
  },
};
