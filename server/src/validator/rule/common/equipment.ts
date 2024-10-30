import { modifier_rule } from "../modifier_rule";
import { air_stat, naval_stat } from "../temp_modifiers";
import { trigger } from "../triggers";
import { unit_stat } from "../unit_stats";
import {
  obj,
  scalar,
  array,
  enumRef,
  root,
  typeDefKey,
  either,
  bool,
  value_set,
  typeRef,
  literal,
  int,
  enumRefKey,
  float,
  country,
  localisation,
  typeRefKey,
} from "../utils";

export const equip_group_by = ["archetype", "type"];
export const interface_category = [
  "interface_category_land",
  "interface_category_armor",
  "interface_category_capital_ships",
  "interface_category_screen_ships",
  "interface_category_other_ships",
  "interface_category_air",
  "missile",
];
export const allowed_ai_type_planes = [
  "cv_fighter",
  "cv_interceptor",
  "cv_cas",
  "cv_naval_bomber",
  "cv_suicide",
  "heavy_fighter",
  "interceptor",
];

const equipment = obj(
  {},
  {
    year: int({ cardinality: [0, 1] }),
    is_archetype: bool({ cardinality: [0, 1] }),
    is_buildable: bool({ cardinality: [0, 1] }),
    is_convertable: bool({ cardinality: [0, 1] }),
    one_use_only: bool({ cardinality: [0, 1] }),
    active: bool({ cardinality: [0, 1] }),
    can_license: bool({ cardinality: [0, 1] }),
    sprite: scalar({ cardinality: [0, 1] }),
    alias: typeRef({ cardinality: [0, 1] }, "unit"),
    interface_category: enumRef({ cardinality: [0, 1] }, "interface_category"),
    priority: either(
      int({ cardinality: [0, 1] }),
      obj(
        { cardinality: [0, 1] },
        {
          [enumRefKey("base_factor")]: float(),
          ...modifier_rule,
        },
      ),
    ),
    can_be_produced: obj(
      { replace_scope: { this: country(), root: country() } },
      { ...trigger },
    ),
    can_be_lend_leased: obj(
      { replace_scope: { this: country(), root: country() } },
      { ...trigger },
    ),
    supply_truck: bool({ cardinality: [0, 1] }),
    subtype: either(
      obj(
        {},
        {
          picture: scalar(),
          group_by: enumRef({}, "equip_group_by"),
          family: typeRef({ cardinality: [0, 1] }, "equipment.archetype_equip"),
          interface_category: enumRef({}, "interface_category"),
          only_duplicate_archetype: bool({ cardinality: [0, 1] }, true),
          variant_name: obj(
            { cardinality: [0, 1] },
            {
              value_set: value_set(
                { cardinality: [1, Infinity] },
                "equipment_variant",
              ),
            },
          ),
          module_slots: literal("none"),
          for_each: obj(
            {},
            {
              [enumRefKey("allowed_air_unit_missions")]: obj(
                {},
                {
                  set: float(),
                },
              ),
              variant_name: obj(
                {},
                {
                  find_and_replace: array({ cardinality: [0, Infinity] }, [
                    scalar(),
                  ]),
                },
              ),
              [enumRefKey("equipment_stat")]: obj(
                {},
                {
                  set: float(),
                },
              ),
            },
          ),
          forbid_mission_type: enumRef(
            { cardinality: [1, Infinity] },
            "allowed_air_unit_missions",
          ),
        },
      ),
      obj(
        {},
        {
          carrier_capable: bool({ cardinality: [0, 1] }, true),
          air_map_icon_frame: int(),
          interface_overview_category_index: int(),
          allowed_types: either(
            enumRef({ cardinality: [0, 1] }, "air_units"),
            array({ cardinality: [1, Infinity] }, [
              enumRef({ cardinality: [1, Infinity] }, "air_units"),
            ]),
          ),
          allow_mission_type: either(
            enumRef({ cardinality: [0, 1] }, "allowed_air_unit_missions"),
            array({ cardinality: [1, Infinity] }, [
              enumRef(
                { cardinality: [1, Infinity] },
                "allowed_air_unit_missions",
              ),
            ]),
          ),
          type_override: enumRef({ cardinality: [0, 1] }, "module_slots"),
          substitute: typeRef({ cardinality: [0, 1] }, "equipment.air_equip"),
          derived_variant_name: localisation({ cardinality: [0, 1] }),
          ai_type: enumRef({ cardinality: [0, 1] }, "allowed_ai_type_planes"),
        },
      ),
      obj(
        {},
        {
          abbreviation: localisation({ cardinality: [0, 1] }),
          derived_variant_name: localisation({ cardinality: [0, 1] }),
          archetype: typeRef(
            { cardinality: [0, 1] },
            "equipment.archetype_equip",
          ),
          parent: typeRef({ cardinality: [0, 1] }, "equipment.regular_equip"),
          visual_level: int({ cardinality: [0, 1] }),
          one_use_only: bool({ cardinality: [0, 1] }),
          family: typeRef({ cardinality: [0, 1] }, "equipment.regular_equip"),
          can_convert_from: array({ cardinality: [1, Infinity] }, [
            typeRef({}, "equipment.regular_equip"),
          ]),
        },
      ),
      obj(
        {},
        {
          is_frame: bool({ cardinality: [0, 1] }),
          module_slots: obj(
            { cardinality: [0, 1] },
            {
              [enumRefKey("module_slots")]: obj(
                {},
                {
                  required: bool(),
                  allowed_module_categories: array(
                    { cardinality: [0, Infinity] },
                    [enumRef({}, "module_categories")],
                  ),
                  gfx: scalar({ cardinality: [0, 1] }),
                },
              ),
              [enumRefKey("module_slots")]: enumRef({}, "module_slots"),
              [enumRefKey("module_slots")]: literal("inherit"),
            },
          ),
          module_count_limit: array({ cardinality: [0, Infinity] }, [
            obj(
              {},
              {
                category: enumRef({ cardinality: [0, 1] }, "module_categories"),
                module: typeRef({ cardinality: [0, 1] }, "module"),
                count: int(),
              },
            ),
          ]),
          default_modules: array({ cardinality: [0, Infinity] }, [
            enumRef({}, "module_slots"),
            literal("empty"),
            literal("inherit"),
          ]),
        },
      ),
      obj(
        {},
        {
          visual_tech_level_addition: int({ cardinality: [0, 1] }),
          model: scalar({ cardinality: [0, 1] }),
        },
      ),
      obj(
        {},
        {
          derived_variant_name: localisation({ cardinality: [0, 1] }),
        },
      ),
    ),
    type: either(
      enumRef({ cardinality: [0, 1] }, "unit_types"),
      array({ cardinality: [1, Infinity] }, [
        enumRef({ cardinality: [1, Infinity] }, "unit_types"),
      ]),
    ),
    ...unit_stat,
    ...naval_stat,
    ...air_stat,
    offensive_weapons: bool({ cardinality: [0, 1] }),
    resources: obj(
      { cardinality: [1, Infinity] },
      {
        [typeRefKey("resource")]: int(),
      },
    ),
    upgrades: array({ cardinality: [0, 3] }, [
      typeRef({ cardinality: [1, Infinity] }, "upgrade"),
    ]),
  },
);

// TODO: Support this
// const equipmentsEither = either(
//   obj(
//     { cardinality: [0, 1] },
//     {
//       is_archetype: bool({ cardinality: [0, 1] }),
//       only_duplicate_archetype: bool({ cardinality: [0, 1] }, true),
//       is_chassis: bool({ cardinality: [0, 1] }),
//       variant_name: obj(
//         { cardinality: [0, 1] },
//         {
//           value_set: value_set(
//             { cardinality: [1, Infinity] },
//             "equipment_variant",
//           ),
//         },
//       ),
//     },
//   ),
//   obj(
//     { cardinality: [0, 1] },
//     {
//       is_archetype: bool({ cardinality: [0, 1] }, false),
//     },
//   ),
//   obj(
//     { cardinality: [0, 1] },
//     {
//       type: either(
//         enumRef({ cardinality: [0, 1] }, "ship_units"),
//         array({ cardinality: [1, Infinity] }, [
//           enumRef({ cardinality: [1, Infinity] }, "ship_units"),
//         ]),
//       ),
//       archetype: typeRef(
//         { cardinality: [0, 1] },
//         "equipment.naval_equip",
//       ),
//     },
//   ),
//   obj(
//     { cardinality: [0, 1] },
//     {
//       type: either(
//         literal("armor"),
//         array({ cardinality: [1, Infinity] }, [
//           enumRef({ cardinality: [1, Infinity] }, "land_units"),
//         ]),
//       ),
//       archetype: typeRef(
//         { cardinality: [0, 1] },
//         "equipment.armor_equip",
//       ),
//     },
//   ),
//   obj(
//     { cardinality: [0, 1] },
//     {
//       type: either(
//         enumRef({ cardinality: [0, 1] }, "air_units"),
//         array({ cardinality: [1, Infinity] }, [
//           enumRef({ cardinality: [1, Infinity] }, "air_units"),
//         ]),
//       ),
//       archetype: typeRef(
//         { cardinality: [0, 1] },
//         "equipment.air_equip",
//       ),
//     },
//   ),
//   obj(
//     { cardinality: [0, 1] },
//     {
//       module_slots: either(obj({}, {}), literal("inherit")),
//     },
//   ),
//   obj(
//     {},
//     {
//       archetype: literal("railway_gun_equipment"),
//     },
//   ),
// );

export const equipmentType = root(
  { path: "/common/units/equipment" },
  {
    equipments: obj(
      {},
      {
        [typeDefKey("equipment")]: equipment,
      },
    ),
    duplicate_archetypes: obj(
      {},
      {
        [typeDefKey("duplicate_archetypes")]: equipment,
      },
    ),
  },
);

const upgrade = obj(
  {},
  {
    abbreviation: localisation({ cardinality: [0, 1] }),
    max_level: int(),
    ...unit_stat,
    subtype: either(
      obj(
        {},
        {
          cost: literal("naval"),
          ...naval_stat,
        },
      ),
      obj(
        {},
        {
          cost: literal("air"),
          ...air_stat,
        },
      ),
      obj(
        {},
        {
          cost: literal("land"),
          level_requirement: obj(
            { cardinality: [0, 1] },
            {
              int: array({ cardinality: [0, Infinity] }, [
                obj(
                  {},
                  {
                    ...trigger,
                  },
                ),
              ]),
            },
          ),
        },
      ),
    ),
    linear_cost: obj(
      { cardinality: [0, 1] },
      {
        cost_by_level: int({ cardinality: [0, 1] }),
        cost_by_level_for_licensed_equipment: int({ cardinality: [0, 1] }),
      },
    ),
    level_requirements: obj(
      { cardinality: [0, 1] },
      {
        int: array({ cardinality: [1, Infinity] }, [
          obj(
            {},
            {
              ...trigger,
            },
          ),
        ]),
      },
    ),
    resource_cost_thresholds: array({ cardinality: [0, Infinity] }, [
      obj(
        {},
        {
          int: array({ cardinality: [1, 10] }, [
            obj(
              {},
              {
                [typeRefKey("resource")]: int(),
              },
            ),
          ]),
        },
      ),
    ]),
    add_stats: obj(
      { cardinality: [0, 1] },
      {
        ...unit_stat,
        ...naval_stat,
        ...air_stat,
        build_cost_ic: float({ cardinality: [0, 1] }),
      },
    ),
    multiply_stats: obj(
      { cardinality: [0, 1] },
      {
        ...unit_stat,
        ...naval_stat,
        ...air_stat,
        build_cost_ic: float({ cardinality: [0, 1] }),
      },
    ),
  },
);

export const upgradeType = root(
  { path: "/common/units/equipment" },
  {
    upgrades: obj({}, { [typeDefKey("upgrade")]: upgrade }),
  },
);

const module = obj(
  {},
  {
    abbreviation: localisation({ cardinality: [0, 1] }),
    category: enumRef({}, "module_categories"),
    gui_category: either(
      enumRef({ cardinality: [0, 1] }, "module_categories"),
      literal("plane_special_module_electronics"),
    ),
    parent: typeRef({ cardinality: [0, 1] }, "module"),
    gfx: scalar({ cardinality: [0, 1] }),
    sfx: scalar({ cardinality: [0, 1] }),
    allow_equipment_type: enumRef({ cardinality: [0, 1] }, "unit_types"),
    forbid_equipment_type_exact_match: enumRef(
      { cardinality: [0, 1] },
      "unit_types",
    ),
    forbid_equipment_type: either(
      enumRef({ cardinality: [0, 1] }, "unit_types"),
      array({ cardinality: [1, Infinity] }, [
        enumRef({ cardinality: [1, Infinity] }, "unit_types"),
      ]),
    ),
    forbid_equipment_type_exact_match_for_category: obj(
      { cardinality: [0, 1] },
      {
        [enumRefKey("module_categories")]: enumRef({}, "unit_types"),
      },
    ),
    add_equipment_type: either(
      enumRef({ cardinality: [0, 1] }, "unit_types"),
      array({ cardinality: [0, Infinity] }, [
        enumRef({ cardinality: [1, Infinity] }, "unit_types"),
      ]),
    ),
    add_stats: obj(
      { cardinality: [0, 1] },
      {
        [enumRefKey("equipment_stat")]: float(),
      },
    ),
    manpower: int({ cardinality: [0, 1] }),
    build_cost_resources: obj(
      { cardinality: [0, 10] },
      {
        [typeRefKey("resource")]: int(),
      },
    ),
    add_average_stats: obj(
      { cardinality: [0, 1] },
      {
        [enumRefKey("equipment_stat")]: float(),
      },
    ),
    multiply_stats: obj(
      { cardinality: [0, Infinity] },
      {
        [enumRefKey("equipment_stat")]: float(),
      },
    ),
    forbid_module_categories: array({ cardinality: [1, Infinity] }, [
      enumRef({}, "module_categories"),
    ]),
    can_convert_from: array({ cardinality: [0, 10] }, [
      obj(
        { cardinality: [0, 1] },
        {
          module_category: enumRef(
            { cardinality: [0, 1] },
            "module_categories",
          ),
          module: typeRef({ cardinality: [0, 1] }, "module"),
          convert_cost_ic: float(),
          convert_cost_resources: obj(
            { cardinality: [0, 1] },
            {
              [typeRefKey("resource")]: int({ cardinality: [1, 10] }),
            },
          ),
        },
      ),
    ]),
    critical_parts: array({ cardinality: [0, Infinity] }, [
      typeRef({}, "critical_part"),
    ]),
    dismantle_cost_ic: float({ cardinality: [0, 1] }),
    dismantle_cost_resources: obj(
      { cardinality: [0, 1] },
      {
        [typeRefKey("resource")]: int({ cardinality: [1, 10] }),
      },
    ),
    allowed_module_categories: obj(
      { cardinality: [0, 1] },
      {
        [enumRefKey("module_slots")]: array({ cardinality: [0, Infinity] }, [
          enumRef({}, "module_categories"),
        ]),
      },
    ),
    allow_mission_type: either(
      enumRef({ cardinality: [0, 1] }, "allowed_air_unit_missions"),
      array({ cardinality: [1, Infinity] }, [
        enumRef({ cardinality: [1, Infinity] }, "allowed_air_unit_missions"),
      ]),
    ),
    mission_type_stats: array({ cardinality: [0, Infinity] }, [
      obj(
        {},
        {
          limit: array({ cardinality: [1, Infinity] }, [
            enumRef(
              { cardinality: [1, Infinity] },
              "allowed_air_unit_missions",
            ),
          ]),
          add_stats: obj(
            { cardinality: [0, 1] },
            {
              ...unit_stat,
              ...naval_stat,
              ...air_stat,
              build_cost_ic: float({ cardinality: [0, 1] }),
            },
          ),
          add_average_stats: obj(
            { cardinality: [0, 1] },
            {
              ...unit_stat,
              ...naval_stat,
              ...air_stat,
            },
          ),
          multiply_stats: obj(
            { cardinality: [0, 1] },
            {
              ...unit_stat,
              ...naval_stat,
              ...air_stat,
            },
          ),
        },
      ),
    ]),
    xp_cost: int({ cardinality: [0, 1] }),
  },
);
export const moduleType = root(
  { path: "/common/units/equipment/modules" },
  {
    equipment_modules: obj({}, { [typeDefKey("module")]: module }),
  },
);

const critical_part = obj(
  {},
  {
    icon: typeRef({}, "spriteType"),
    frame: int(),
    stat_penalties: obj({ cardinality: [0, 1] }, naval_stat),
    modifier: obj({ cardinality: [0, 1] }, naval_stat),
    str_damage: float({ cardinality: [0, 1] }),
    org_damage: float({ cardinality: [0, 1] }),
    str_damage_multiplier: float({ cardinality: [0, 1] }),
    org_damage_multiplier: float({ cardinality: [0, 1] }),
    chance: float({ cardinality: [0, 1] }),
    base_damage_instance: float({ cardinality: [0, 1] }),
    damage_instance_per_added_module: float({ cardinality: [0, 1] }),
    max_damage_instance: float({ cardinality: [0, 1] }),
  },
);
export const criticalPartType = root(
  { path: "/common/units/equipment/modules" },
  {
    critical_parts: obj({}, { [typeDefKey("critical_part")]: critical_part }),
  },
);
