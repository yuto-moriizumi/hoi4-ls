import { unit_stat, naval_stat, air_stat } from "../temp_modifiers";
import { trigger } from "../triggers";
import {
  obj,
  array,
  enumRef,
  root,
  typeDefKey,
  either,
  literal,
  scalar,
  int,
  bool,
  float,
  typeRef,
  typeRefKey,
  value,
  localisation,
} from "../utils";

export const land_map_icons = ["infantry", "armored", "other"];
export const ship_map_icons = ["ship", "transport", "uboat"];
export const unit_groups = ["infantry", "support", "mobile", "armor"];
export const unit_types = [
  "infantry",
  "support",
  "artillery",
  "rocket",
  "anti_tank",
  "anti_air",
  "motorized",
  "cavalry",
  "mechanized",
  "armor",
  "fighter",
  "cas",
  "naval_bomber",
  "interceptor",
  "suicide",
  "tactical_bomber",
  "strategic_bomber",
  "air_transport",
  "missile",
  "submarine",
  "screen_ship",
  "capital_ship",
  "carrier",
  "convoy",
  "paratroopers",
  "scout_plane",
  "floating_harbor",
  "railway_gun",
  "train",
  "flame",
  "maritime_patrol_plane",
  "cv_naval_bomber",
  "cv_cas",
  "cv_fighter",
  "cv_interceptor",
  "heavy_fighter",
  "amphibious",
];
export const land_units = [
  "infantry",
  "support",
  "artillery",
  "rocket",
  "anti_tank",
  "anti_air",
  "motorized",
  "mechanized",
  "armor",
  "amphibious",
  "flame",
  "railway_gun",
];
export const air_units = [
  "air_transport",
  "cas",
  "fighter",
  "interceptor",
  "missile",
  "naval_bomber",
  "scout_plane",
  "strategic_bomber",
  "suicide",
  "tactical_bomber",
  "maritime_patrol_plane",
  "heavy_fighter",
];
export const ship_units = [
  "battle_cruiser",
  "battleship",
  "capital_ship",
  "carrier",
  "convoy",
  "destroyer",
  "heavy_cruiser",
  "light_cruiser",
  "screen_ship",
  "submarine",
  "corvette",
  "frigate",
  "attack_submarine",
  "missile_submarine",
  "helicopter_operator",
  "stealth_destroyer",
  "anti_air",
  "artillery",
];
export const allowed_air_unit_missions = [
  "paradrop",
  "air_supply",
  "air_superiority",
  "interception",
  "naval_bomber",
  "port_strike",
  "naval_patrol",
  "strategic_bomber",
  "cas",
  "attack_logistics",
  "naval_kamikaze",
  "naval_mines_planting",
  "naval_mines_sweeping",
  "recon",
  "training",
];

// export const unit_category = complexEnum(
//   { path: "game/common/unit_tags", start_from_root: true },
//   {
//     name: obj(
//       {},
//       {
//         sub_unit_categories: array({}, [enumRef({}, "enum_name")]),
//       },
//     ),
//   },
// );

// export const sub_unit_modifiers = complexEnum(
//   { path: "game/common/units/unit_modifiers", start_from_root: true },
//   {
//     name: obj(
//       {},
//       {
//         sub_unit_modifiers: array({}, [enumRef({}, "enum_name")]),
//       },
//     ),
//   },
// );

const unit = obj(
  {},
  {
    abbreviation: scalar({ cardinality: [0, 1] }),
    sprite: scalar(),
    priority: int(),
    active: bool(),
    own_equipment_fuel_consumption_mult: float({ cardinality: [0, 1] }),
    essential: array({ cardinality: [0, 1] }, [
      typeRef({ cardinality: [1, Infinity] }, "equipment"),
    ]),
    categories: array({ cardinality: [0, 1] }, [
      enumRef({ cardinality: [1, Infinity] }, "unit_category"),
    ]),
    ...unit_stat,
    subtype: either(
      obj(
        {},
        {
          group: literal("infantry"),
          need: obj(
            {},
            {
              [typeRefKey("equipment")]: int({ cardinality: [1, Infinity] }),
              value: value(
                { cardinality: [0, Infinity] },
                "nsb_armor_variants",
              ),
            },
          ),
          ai_priority: int(),
          map_icon_category: enumRef({}, "land_map_icons"),
          cavalry: bool({ cardinality: [0, 1] }),
          special_forces: bool({ cardinality: [0, 1] }),
          marines: bool({ cardinality: [0, 1] }),
          mountaineers: bool({ cardinality: [0, 1] }),
          can_be_parachuted: bool({ cardinality: [0, 1] }),
          can_exfiltrate_from_coast: bool({ cardinality: [0, 1] }),
          affects_speed: bool({ cardinality: [0, 1] }),
          transport: typeRef({ cardinality: [0, 1] }, "equipment"),
          type: array({ cardinality: [1, Infinity] }, [
            enumRef({}, "land_units"),
          ]),
        },
      ),
      obj(
        {},
        {
          group: literal("armor"),
          need: obj(
            {},
            {
              [typeRefKey("equipment")]: int({ cardinality: [1, Infinity] }),
              value: value(
                { cardinality: [0, Infinity] },
                "nsb_armor_variants",
              ),
            },
          ),
          ai_priority: int(),
          map_icon_category: enumRef({}, "land_map_icons"),
          cavalry: bool({ cardinality: [0, 1] }),
          special_forces: bool({ cardinality: [0, 1] }),
          marines: bool({ cardinality: [0, 1] }),
          mountaineers: bool({ cardinality: [0, 1] }),
          can_be_parachuted: bool({ cardinality: [0, 1] }),
          can_exfiltrate_from_coast: bool({ cardinality: [0, 1] }),
          affects_speed: bool({ cardinality: [0, 1] }),
          transport: typeRef({ cardinality: [0, 1] }, "equipment"),
          type: array({ cardinality: [1, Infinity] }, [
            enumRef({}, "land_units"),
          ]),
        },
      ),
      obj(
        {},
        {
          group: literal("mobile"),
          need: obj(
            {},
            {
              [typeRefKey("equipment")]: int({ cardinality: [1, Infinity] }),
              value: value(
                { cardinality: [0, Infinity] },
                "nsb_armor_variants",
              ),
            },
          ),
          ai_priority: int(),
          map_icon_category: enumRef({}, "land_map_icons"),
          cavalry: bool({ cardinality: [0, 1] }),
          special_forces: bool({ cardinality: [0, 1] }),
          marines: bool({ cardinality: [0, 1] }),
          mountaineers: bool({ cardinality: [0, 1] }),
          can_be_parachuted: bool({ cardinality: [0, 1] }),
          can_exfiltrate_from_coast: bool({ cardinality: [0, 1] }),
          affects_speed: bool({ cardinality: [0, 1] }),
          transport: typeRef({ cardinality: [0, 1] }, "equipment"),
          type: array({ cardinality: [1, Infinity] }, [
            enumRef({}, "land_units"),
          ]),
        },
      ),
      obj(
        {},
        {
          group: literal("combat_support"),
          need: obj(
            {},
            {
              [typeRefKey("equipment")]: int({ cardinality: [1, Infinity] }),
              value: value(
                { cardinality: [0, Infinity] },
                "nsb_armor_variants",
              ),
            },
          ),
          ai_priority: int(),
          map_icon_category: enumRef({}, "land_map_icons"),
          cavalry: bool({ cardinality: [0, 1] }),
          special_forces: bool({ cardinality: [0, 1] }),
          marines: bool({ cardinality: [0, 1] }),
          mountaineers: bool({ cardinality: [0, 1] }),
          can_be_parachuted: bool({ cardinality: [0, 1] }),
          can_exfiltrate_from_coast: bool({ cardinality: [0, 1] }),
          affects_speed: bool({ cardinality: [0, 1] }),
          transport: typeRef({ cardinality: [0, 1] }, "equipment"),
          type: array({ cardinality: [1, Infinity] }, [
            enumRef({}, "land_units"),
          ]),
        },
      ),
      obj(
        {},
        {
          group: literal("armor_combat_support"),
          need: obj(
            {},
            {
              [typeRefKey("equipment")]: int({ cardinality: [1, Infinity] }),
              value: value(
                { cardinality: [0, Infinity] },
                "nsb_armor_variants",
              ),
            },
          ),
          ai_priority: int(),
          map_icon_category: enumRef({}, "land_map_icons"),
          cavalry: bool({ cardinality: [0, 1] }),
          special_forces: bool({ cardinality: [0, 1] }),
          marines: bool({ cardinality: [0, 1] }),
          mountaineers: bool({ cardinality: [0, 1] }),
          can_be_parachuted: bool({ cardinality: [0, 1] }),
          can_exfiltrate_from_coast: bool({ cardinality: [0, 1] }),
          affects_speed: bool({ cardinality: [0, 1] }),
          transport: typeRef({ cardinality: [0, 1] }, "equipment"),
          type: array({ cardinality: [1, Infinity] }, [
            enumRef({}, "land_units"),
          ]),
        },
      ),
      obj(
        {},
        {
          group: literal("mobile_combat_support"),
          need: obj(
            {},
            {
              [typeRefKey("equipment")]: int({ cardinality: [1, Infinity] }),
              value: value(
                { cardinality: [0, Infinity] },
                "nsb_armor_variants",
              ),
            },
          ),
          ai_priority: int(),
          map_icon_category: enumRef({}, "land_map_icons"),
          cavalry: bool({ cardinality: [0, 1] }),
          special_forces: bool({ cardinality: [0, 1] }),
          marines: bool({ cardinality: [0, 1] }),
          mountaineers: bool({ cardinality: [0, 1] }),
          can_be_parachuted: bool({ cardinality: [0, 1] }),
          can_exfiltrate_from_coast: bool({ cardinality: [0, 1] }),
          affects_speed: bool({ cardinality: [0, 1] }),
          transport: typeRef({ cardinality: [0, 1] }, "equipment"),
          type: array({ cardinality: [1, Infinity] }, [
            enumRef({}, "land_units"),
          ]),
        },
      ),
      obj(
        {},
        {
          group: literal("support"),
          need: obj(
            {},
            {
              [typeRefKey("equipment")]: int({ cardinality: [1, Infinity] }),
            },
          ),
          ai_priority: int(),
          map_icon_category: enumRef({}, "land_map_icons"),
          cavalry: bool({ cardinality: [0, 1] }),
          special_forces: bool({ cardinality: [0, 1] }),
          marines: bool({ cardinality: [0, 1] }),
          mountaineers: bool({ cardinality: [0, 1] }),
          can_be_parachuted: bool({ cardinality: [0, 1] }),
          can_exfiltrate_from_coast: bool({ cardinality: [0, 1] }),
          affects_speed: bool({ cardinality: [0, 1] }, false),
          same_support_type: either(
            typeRef({ cardinality: [0, 1] }, "unit.support_unit"),
            enumRef({ cardinality: [0, 1] }, "land_units"),
          ),
          battalion_mult: array({ cardinality: [0, 1] }, [
            obj(
              {},
              {
                category: enumRef(
                  { cardinality: [1, Infinity] },
                  "unit_category",
                ),
                ...unit_stat,
                add: bool({ cardinality: [0, 1] }),
              },
            ),
          ]),
        },
      ),
      obj(
        {},
        {
          need: obj(
            {},
            {
              [typeRefKey("equipment")]: int({ cardinality: [1, Infinity] }),
            },
          ),
          need_equipment: obj(
            { cardinality: [0, 1] },
            {
              [typeRefKey("equipment")]: int({ cardinality: [1, Infinity] }),
            },
          ),
          need_equipment_modules: obj(
            { cardinality: [0, 1] },
            {
              any: obj(
                {},
                {
                  [typeRefKey("module")]: int({ cardinality: [1, Infinity] }),
                },
              ),
            },
          ),
          map_icon_category: enumRef({}, "ship_map_icons"),
          type: array({ cardinality: [1, Infinity] }, [
            enumRef({}, "ship_units"),
          ]),
          ...naval_stat,
          critical_parts: array({}, [
            typeRef({ cardinality: [1, Infinity] }, "critical_part"),
          ]),
          critical_part_damage_chance_mult: float(),
          hit_profile_mult: float(),
        },
      ),
      obj(
        {},
        {
          need: obj(
            {},
            {
              [typeRefKey("equipment")]: int({ cardinality: [1, Infinity] }),
              value: value({ cardinality: [0, 1] }, "bba_air_variants"),
            },
          ),
          type: either(
            enumRef({}, "air_units"),
            array({ cardinality: [1, Infinity] }, [enumRef({}, "air_units")]),
          ),
          ...air_stat,
          land_air_wing_size: int({ cardinality: [0, 1] }),
          carrier_air_wing_size: int({ cardinality: [0, 1] }),
        },
      ),
      obj({}, { test: int() }),
    ),
  },
);

const ship_name = obj(
  {},
  {
    name: localisation(),
    for_countries: array({ cardinality: [0, 1] }, [
      enumRef({ cardinality: [1, Infinity] }, "country_tags"),
    ]),
    can_use: obj({ cardinality: [0, 1] }, { ...trigger }),
    type: typeRef({}, "ship"),
    ship_types: array({ cardinality: [0, 1] }, [
      typeRef({ cardinality: [1, Infinity] }, "equipment.naval_equip"),
      typeRef({ cardinality: [1, Infinity] }, "unit.ship_unit"),
      enumRef({ cardinality: [1, Infinity] }, "ship_units"),
    ]),
    link_numbering_with: array({ cardinality: [0, 1] }, [
      typeRef({ cardinality: [1, Infinity] }, "ship_name"),
    ]),
    prefix: scalar({ cardinality: [0, 1] }),
    fallback_name: scalar({ cardinality: [0, 1] }),
    unique: array({ cardinality: [0, 1] }, [
      scalar({ cardinality: [1, Infinity] }),
    ]),
    unordered: obj(
      { cardinality: [0, 1] },
      {
        int: array({}, [scalar()]),
      },
    ),
    ordered: obj(
      { cardinality: [0, 1] },
      {
        int: array({}, [scalar({ cardinality: [1, 2] })]),
      },
    ),
  },
);

const division_name = obj(
  {},
  {
    name: localisation(),
    for_countries: array({}, [
      enumRef({ cardinality: [1, Infinity] }, "country_tags"),
    ]),
    can_use: obj({ cardinality: [0, 1] }, { ...trigger }),
    division_types: array({ cardinality: [0, 1] }, [
      typeRef({ cardinality: [1, Infinity] }, "unit"),
    ]),
    link_numbering_with: array({ cardinality: [0, 1] }, [
      typeRef({ cardinality: [1, Infinity] }, "division_name"),
    ]),
    fallback_name: scalar({ cardinality: [0, 1] }),
    unordered: obj(
      { cardinality: [0, 1] },
      {
        int: array({}, [scalar()]),
      },
    ),
    ordered: obj(
      { cardinality: [0, 1] },
      {
        int: array({}, [scalar({ cardinality: [1, 2] })]),
      },
    ),
  },
);

export const unitType = root(
  { path: "game/common/units" },
  {
    unit,
    // sub_units: obj(
    //   {},
    //   {
    //     [typeDefKey("unit")]: either(
    //       obj({}, { group: literal("infantry") }),
    //       array({}, [literal("infantry")]),
    //       obj({}, { group: literal("armor") }),
    //       obj({}, { group: literal("mobile") }),
    //       obj({}, { group: literal("combat_support") }),
    //       obj({}, { group: literal("armor_combat_support") }),
    //       obj({}, { group: literal("mobile_combat_support") }),
    //       obj({}, { group: literal("support") }),
    //       obj(
    //         {},
    //         {
    //           type: either(
    //             enumRef({}, "air_units"),
    //             array({ cardinality: [1, 10] }, [enumRef({}, "air_units")]),
    //           ),
    //         },
    //       ),
    //       obj({}, { map_icon_category: enumRef({}, "ship_map_icons") }),
    //     ),
    //   },
    // ),
  },
);

export const divisionNameType = root(
  { path: "game/common/units/names_divisions" },
  {
    [typeDefKey("division_name")]: division_name,
  },
);

export const shipNameType = root(
  { path: "game/common/units/names_ships" },
  {
    [typeDefKey("ship_name")]: ship_name,
  },
);
