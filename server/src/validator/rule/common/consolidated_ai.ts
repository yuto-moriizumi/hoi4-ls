import { Value, RootObjectEntryDescriptor, Scope } from "../types";
import { Enum, float, literal, ref, valueSet } from "../utils";
import { triggers } from "../triggers";
import { modifier_rule } from "../modifier_rule";

export const ai_area: RootObjectEntryDescriptor = {
  children: {
    continents: {
      type: Value.ARRAY,
      cardinality: [0, 1],
      values: Enum("continents"),
    },
    strategic_regions: {
      type: Value.ARRAY,
      cardinality: [0, 1],
      values: {
        type: Value.REFERENCE_TO,
        tag: "strategic_region",
      },
    },
  },
};

export const ai_focus: RootObjectEntryDescriptor = {
  children: {
    research: {
      children: {},
      dynamicChildren: [
        {
          cardinality: [0, Infinity],
          key: Enum("ai_research_areas"),
          value: float(),
        },
        {
          cardinality: [0, Infinity],
          key: Enum("tech_category"),
          value: float(),
        },
      ],
    },
    ai_national_focuses: {
      type: Value.ARRAY,
      values: ref(["focus", "shared_focus"]),
    },
  },
};

export const ai_peace: RootObjectEntryDescriptor = {
  replaceScope: {
    this: Scope.COUNTRY,
    root: Scope.COUNTRY,
    from: Scope.COUNTRY,
  },
  children: {
    enable: {
      children: triggers,
    },
    build_temp_vars: {
      children: triggers,
      cardinality: [0, 1],
    },
    annex: {
      cardinality: [0, 1],
      children: {
        base_factor: { type: Value.FLOAT },
        ...modifier_rule,
      },
    },
    liberate: {
      cardinality: [0, 1],
      children: {
        base_factor: { type: Value.FLOAT },
        ...modifier_rule,
      },
    },
    puppet: {
      cardinality: [0, 1],
      children: {
        base_factor: { type: Value.FLOAT },
        ...modifier_rule,
      },
    },
    puppet_all: {
      cardinality: [0, 1],
      children: {
        base_factor: { type: Value.FLOAT },
        ...modifier_rule,
      },
    },
    puppet_state: {
      replaceScope: {
        this: Scope.STATE,
        root: Scope.STATE,
        from: Scope.COUNTRY,
        fromFrom: Scope.COUNTRY,
      },
      children: {
        base_factor: { type: Value.FLOAT },
        ...modifier_rule,
      },
    },
    take_states: {
      replaceScope: {
        this: Scope.COUNTRY,
        root: Scope.COUNTRY,
        from: Scope.STATE,
      },
      children: {
        base_factor: { type: Value.FLOAT },
        ...modifier_rule,
      },
    },
    force_government: {
      cardinality: [0, 1],
      children: {
        base_factor: { type: Value.FLOAT },
        ...modifier_rule,
      },
    },
  },
};

export const ai_template: RootObjectEntryDescriptor = {
  children: {
    roles: {
      type: Value.ARRAY,
      cardinality: [1, Infinity],
      values: ref("ai_roles"),
    },
    available_for: {
      type: Value.ARRAY,
      cardinality: [0, 1],
      values: {
        type: Value.REFERENCE_TO,
        tag: "country_tags",
      },
    },
    blocked_for: {
      type: Value.ARRAY,
      cardinality: [0, 1],
      values: {
        type: Value.REFERENCE_TO,
        tag: "country_tags",
      },
    },
    upgrade_prio: {
      children: { base_factor: { type: Value.FLOAT }, ...modifier_rule },
    },
    scalar: {
      cardinality: [1, 10],
      children: {
        upgrade_prio: {
          children: { base_factor: { type: Value.FLOAT }, ...modifier_rule },
        },
        production_prio: {
          cardinality: [0, 1],
          children: { base_factor: { type: Value.FLOAT }, ...modifier_rule },
        },
        can_upgrade_in_field: {
          cardinality: [0, 1],
          children: triggers,
        },
        custom_icon: { type: Value.INT, cardinality: [0, 1] },
        reinforce_prio: { type: Value.INT, cardinality: [0, 1] },
        target_width: { type: Value.FLOAT },
        width_weight: { type: Value.FLOAT },
        column_swap_factor: { type: Value.FLOAT },
        enable: {
          cardinality: [0, 1],
          children: triggers,
        },
        stat_weights: {
          type: Value.ARRAY,
          values: { type: Value.FLOAT, cardinality: [33, 33] },
        },
        target_template: {
          children: {
            weight: { type: Value.FLOAT },
            match_value: { type: Value.FLOAT },
            regiments: {
              cardinality: [1, 25],
              children: {},
              dynamicChildren: [
                {
                  key: ref("unit"),
                  value: { type: Value.INT, range: [0, 24] },
                },
              ],
            },
            support: {
              cardinality: [0, 1],
              children: {},
              dynamicChildren: [
                {
                  key: ref("unit"),
                  value: { type: Value.INT, range: [0, 4] },
                  cardinality: [0, 5],
                },
              ],
            },
          },
        },
        allowed_types: {
          type: Value.ARRAY,
          values: ref("unit"),
        },
        replace_at_match: { type: Value.FLOAT, cardinality: [0, 1] },
        replace_with: {
          type: Value.REFERENCE_TO,
          tag: "ai_templates",
          cardinality: [0, 1],
        },
        target_min_match: { type: Value.FLOAT, cardinality: [0, 1] },
      },
    },
  },
};

export const ai_equipment_design_group: RootObjectEntryDescriptor = {
  children: {
    category: Enum("equipment_categories"),
    blocked_for: {
      type: Value.ARRAY,
      cardinality: [0, 1],
      values: Enum("country_tags"),
    },
    available_for: {
      type: Value.ARRAY,
      cardinality: [0, 1],
      values: Enum("country_tags"),
    },
    roles: {
      type: Value.ARRAY,
      values: valueSet("ai_roles"),
    },
    priority: {
      cardinality: [0, 1],
      children: {
        base_factor: { type: Value.FLOAT },
        ...modifier_rule,
      },
    },
  },
  dynamicChildren: [
    {
      key: ref("ai_equipment_design.design"),
      value: {
        children: {
          priority: {
            cardinality: [0, 1],
            children: {
              base_factor: { type: Value.FLOAT },
              ...modifier_rule,
            },
          },
          name: { type: Value.UNQUOTED, cardinality: [0, 1] },
          role_icon_index: { type: Value.INT, cardinality: [0, 1] },
          enable: {
            cardinality: [0, 1],
            children: triggers,
          },
          visible: { type: Value.BOOL, cardinality: [0, 1] },
          target_variant: {
            children: {
              match_value: { type: Value.FLOAT, cardinality: [0, 1] },
              type: [
                ref("equipment"),
                ref("nsb_armor_variants"),
                ref("bba_air_variants"),
                Enum("md_unique_dupe_archetypes"),
              ],
              modules: {
                cardinality: [0, 1],
                children: {},
                dynamicChildren: [
                  {
                    key: Enum("module_slots"),
                    value: Enum("module_categories"),
                    cardinality: [0, Infinity],
                  },
                  {
                    key: Enum("module_slots"),
                    value: ref("module"),
                    cardinality: [0, Infinity],
                  },
                  {
                    key: Enum("module_slots"),
                    value: literal("empty"),
                    cardinality: [0, Infinity],
                  },
                  {
                    key: Enum("module_slots"),
                    cardinality: [0, Infinity],
                    value: {
                      children: {
                        module: [
                          Enum("module_categories"),
                          ref("module"),
                          literal("empty"),
                        ],
                        any_of: {
                          type: Value.ARRAY,
                          values: [ref("module"), Enum("module_categories")],
                        },
                        upgrade: {
                          type: Value.UNQUOTED_LITERAL,
                          cardinality: [0, 1],
                          literal: "current",
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
          requirements: {
            cardinality: [0, Infinity],
            children: {
              module: [
                Enum("module_categories"),
                { type: Value.REFERENCE_TO, tag: "module" },
              ],
            },
          },
          allowed_modules: {
            type: Value.ARRAY,
            cardinality: [0, 1],
            values: [Enum("module_categories"), ref("module_categories")],
          },
        },
      },
    },
  ],
};
