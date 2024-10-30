import { modifier_rule } from "../modifier_rule";
import { trigger } from "../triggers";
import {
  obj,
  array,
  enumRef,
  typeRef,
  either,
  enumRefKey,
  float,
  country,
  int,
  state,
  valueSet,
  typeRefKey,
  scalar,
  bool,
  value,
  literal,
  root,
  typeDefKey,
} from "../utils";

const ai_area = obj(
  {},
  {
    continents: array({ cardinality: [0, 1] }, [
      enumRef({ cardinality: [1, Infinity] }, "continents"),
    ]),
    strategic_regions: array({ cardinality: [0, 1] }, [
      typeRef({ cardinality: [1, Infinity] }, "strategic_region"),
    ]),
  },
);

const ai_focus = either(
  obj(
    {},
    {
      research: obj(
        {},
        {
          research: obj(
            {},
            {
              [enumRefKey("ai_research_areas")]: float({
                cardinality: [0, Infinity],
              }),
              [enumRefKey("tech_category")]: float({
                cardinality: [0, Infinity],
              }),
            },
          ),
        },
      ),
    },
  ),
  obj(
    {},
    {
      ai_national_focuses: array({}, [
        typeRef({ cardinality: [0, Infinity] }, "focus"),
        typeRef({ cardinality: [0, Infinity] }, "shared_focus"),
      ]),
    },
  ),
);

const ai_peace = obj(
  { replace_scope: { this: country(), root: country(), from: country() } },
  {
    enable: obj({}, { ...trigger }),
    annex_randomness: int(),
    liberate_randomness: int(),
    puppet_randomness: int(),
    take_states_randomness: int(),
    force_government_randomness: int(),
    build_temp_vars: obj({ cardinality: [0, 1] }, { ...trigger }),
    annex: obj(
      {},
      {
        [enumRefKey("base_factor")]: float({ cardinality: [0, 1] }),
        ...modifier_rule,
      },
    ),
    liberate: obj(
      {},
      {
        [enumRefKey("base_factor")]: float({ cardinality: [0, 1] }),
        ...modifier_rule,
      },
    ),
    puppet: obj(
      {},
      {
        [enumRefKey("base_factor")]: float({ cardinality: [0, 1] }),
        ...modifier_rule,
      },
    ),
    puppet_all: obj(
      {},
      {
        [enumRefKey("base_factor")]: float({ cardinality: [0, 1] }),
        ...modifier_rule,
      },
    ),
    puppet_state: obj(
      {
        replace_scope: {
          this: state(),
          root: state(),
          from: country(),
          fromfrom: country(),
        },
      },
      {
        [enumRefKey("base_factor")]: float({ cardinality: [0, 1] }),
        ...modifier_rule,
      },
    ),
    take_states: obj(
      { replace_scope: { this: country(), root: country(), from: state() } },
      {
        [enumRefKey("base_factor")]: float({ cardinality: [0, 1] }),
        ...modifier_rule,
      },
    ),
    force_government: obj(
      {},
      {
        [enumRefKey("base_factor")]: float({ cardinality: [0, 1] }),
        ...modifier_rule,
      },
    ),
  },
);

const ai_template = obj(
  {},
  {
    roles: array({ cardinality: [1, Infinity] }, [
      valueSet("ai_template_roles"),
    ]),
    available_for: array({ cardinality: [0, 1] }, [
      enumRef({ cardinality: [1, Infinity] }, "country_tags"),
    ]),
    blocked_for: array({ cardinality: [0, 1] }, [
      enumRef({ cardinality: [1, Infinity] }, "country_tags"),
    ]),
    match_to_count: float(),
    upgrade_prio: obj(
      {},
      {
        [enumRefKey("base_factor")]: float(),
        ...modifier_rule,
      },
    ),
    scalar: obj(
      { cardinality: [1, 10] },
      {
        upgrade_prio: obj(
          {},
          {
            [enumRefKey("base_factor")]: float(),
            ...modifier_rule,
          },
        ),
        production_prio: obj(
          { cardinality: [0, 1] },
          {
            [enumRefKey("base_factor")]: float(),
            ...modifier_rule,
          },
        ),
        can_upgrade_in_field: obj({ cardinality: [0, 1] }, { ...trigger }),
        custom_icon: int({ cardinality: [0, 1] }),
        reinforce_prio: int({ cardinality: [0, 1] }),
        target_width: float(),
        width_weight: float(),
        column_swap_factor: float(),
        enable: obj({ cardinality: [0, 1] }, { ...trigger }),
        stat_weights: array({ cardinality: [33, 33] }, [float()]),
        target_template: obj(
          {},
          {
            weight: float(),
            match_value: float(),
            regiments: obj(
              { cardinality: [1, 25] },
              {
                [typeRefKey("unit")]: int({}, 0, 24),
              },
            ),
            support: obj(
              { cardinality: [0, 1] },
              {
                [typeRefKey("unit")]: int({}, 0, 4),
              },
            ),
          },
        ),
        allowed_types: array({ cardinality: [1, Infinity] }, [
          typeRef({}, "unit"),
        ]),
        replace_at_match: float({ cardinality: [0, 1] }),
        replace_with: enumRef({ cardinality: [0, 1] }, "ai_templates"),
        target_min_match: float({ cardinality: [0, 1] }),
      },
    ),
  },
);

const ai_equipment_design_group = obj(
  {},
  {
    category: enumRef({}, "equipment_categories"),
    blocked_for: array({ cardinality: [0, 1] }, [
      enumRef({ cardinality: [1, Infinity] }, "country_tags"),
    ]),
    available_for: array({ cardinality: [0, 1] }, [
      enumRef({ cardinality: [1, Infinity] }, "country_tags"),
    ]),
    roles: array({}, [valueSet("ai_equipment_roles")]),
    priority: obj(
      {},
      {
        [enumRefKey("base_factor")]: float({ cardinality: [0, 1] }),
        ...modifier_rule,
      },
    ),
    [typeDefKey("ai_equipment_design")]: obj(
      { cardinality: [1, Infinity] },
      {
        priority: obj(
          { cardinality: [0, 1] },
          {
            [enumRefKey("base_factor")]: float(),
            ...modifier_rule,
          },
        ),
        name: scalar({ cardinality: [0, 1] }),
        role_icon_index: int({ cardinality: [0, 1] }),
        enable: obj({ cardinality: [0, 1] }, { ...trigger }),
        visible: bool({ cardinality: [0, 1] }),
        target_variant: obj(
          {},
          {
            match_value: float({ cardinality: [0, 1] }),
            type: either(
              typeRef({}, "equipment"),
              value({}, "nsb_armor_variants"),
              value({}, "bba_air_variants"),
              enumRef({}, "md_unique_dupe_archetypes"),
              enumRef({}, "equipment_bonus_type"),
            ),
            modules: obj(
              { cardinality: [0, 1] },
              {
                [enumRefKey("module_slots")]: either(
                  enumRef({}, "module_categories"),
                  typeRef({}, "module"),
                  literal({}, "empty"),
                  obj(
                    {},
                    {
                      module: either(
                        enumRef({}, "module_categories"),
                        typeRef({}, "module"),
                        literal({}, "empty"),
                      ),
                      any_of: array({}, [
                        typeRef({}, "module"),
                        enumRef({}, "module_categories"),
                      ]),
                      upgrade: literal({}, "current"),
                    },
                  ),
                ),
              },
            ),
            upgrades: obj(
              { cardinality: [0, 1] },
              {
                [typeRefKey("upgrade")]: int({
                  cardinality: [0, Infinity],
                }),
                [typeRefKey("upgrade")]: obj(
                  { cardinality: [0, Infinity] },
                  {
                    [enumRefKey("base_factor")]: int(),
                    modifier: obj(
                      {},
                      {
                        ...trigger,
                        [enumRefKey("add_factor")]: int(),
                      },
                    ),
                  },
                ),
              },
            ),
          },
        ),
        requirements: obj(
          { cardinality: [0, 1] },
          {
            module: either(
              enumRef({}, "module_categories"),
              typeRef({}, "module"),
            ),
          },
        ),
        allowed_modules: array({ cardinality: [0, Infinity] }, [
          typeRef({}, "module"),
          enumRef({}, "module_categories"),
        ]),
      },
    ),
  },
);

export const aiTemplateRoles = [
  "infantry",
  "anti_tank",
  "artillery",
  "bicycle_battalion",
  "cavalry",
  "garrison",
  "marines",
  "mechanized",
  "militia",
  "mobile",
  "motorized",
  "mountaineers",
  "paratroopers",
  "suppression",
  "fake_intel_unit",
  "armor",
  "light_armor",
  "medium_armor",
  "heavy_armor",
  "modern_armor",
];

export const aiEquipmentRoles = [
  "fighter",
  "cas",
  "naval_bomber",
  "tactical_bomber",
  "heavy_fighter",
  "interceptor",
  "scout_plane",
  "suicide",
  "strategic_bomber",
  "cv_fighter",
  "cv_cas",
  "cv_naval_bomber",
  "cv_suicide",
  "cv_interceptor",
  "naval_capital",
  "naval_carrier",
  "naval_screen",
  "naval_sub",
];

export const aiResearchAreas = [
  "defensive",
  "offensive",
  "carrier",
  "battleship",
  "cruiser",
];

export const aiAreaType = root(
  { path: "/common/ai_areas" },
  {
    areas: obj(
      {},
      {
        [typeDefKey("ai_area")]: ai_area,
      },
    ),
  },
);

export const aiFocusType = root(
  { path: "/common/ai_focuses" },
  { [typeDefKey("ai_focus")]: ai_focus },
);

export const aiPeaceType = root(
  { path: "/common/ai_peace" },
  { [typeDefKey("ai_peace")]: ai_peace },
);

export const aiTemplates = root(
  { path: "/common/ai_templates" },
  { [typeDefKey("ai_templates")]: ai_template },
);

export const aiEquipment = root(
  { path: "/common/ai_equipment" },
  {
    [typeDefKey("ai_equipment_design_group")]: ai_equipment_design_group,
  },
);
