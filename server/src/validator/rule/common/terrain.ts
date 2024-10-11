import { unit_stat, naval_stat } from "../temp_modifiers";
import {
  root,
  either,
  obj,
  float,
  bool,
  scalar,
  typeRefKey,
  enumRefKey,
} from "../utils";

export const terrainModifiers = [
  "combat_width",
  "combat_support_width",
  "supply_flow_penalty_factor",
  "truck_attrition_factor",
  "attrition",
  "enemy_army_bonus_air_superiority_factor",
  "sickness_chance",
];

export const terrainType = root(
  { path: "game/common/terrain" },
  {
    categories: either(
      obj({ cardinality: [0, 0] }, { movement_cost: float() }),
      obj({}, { is_water: bool({}, true) }),
      obj({}, { naval_terrain: bool({}, true) }),
      obj({}, { is_water: bool({ cardinality: [0, 1] }, false) }),
    ),
  },
);

export const acclimatizationType = root(
  { path: "game/common/acclimatation.txt" },
  {},
);

const terrain = either(
  obj({}, { movement_cost: float(), sound_type: scalar() }),
  obj(
    {},
    {
      naval_terrain: bool({ cardinality: [0, 1] }, true),
      is_water: bool({ cardinality: [0, 1] }, true),
      [typeRefKey("unit.ship_unit")]: obj(
        { cardinality: [0, Infinity] },
        {
          units: obj({ cardinality: [0, 1] }, { ...unit_stat }),
          ...naval_stat,
        },
      ),
      ...unit_stat,
    },
  ),
  obj(
    {},
    {
      naval_terrain: bool({}, true),
      is_water: bool({}, true),
      [typeRefKey("unit.ship_unit")]: obj(
        { cardinality: [0, Infinity] },
        {
          units: obj({ cardinality: [0, 1] }, { ...unit_stat }),
          ...naval_stat,
        },
      ),
      ...unit_stat,
    },
  ),
  obj(
    {},
    {
      [enumRefKey("terrain_modifiers")]: float({
        cardinality: [0, Infinity],
      }),
      ai_terrain_importance_factor: float(),
      match_value: float(),
      units: obj({ cardinality: [0, 1] }, { ...unit_stat }),
    },
  ),
);

export const graphicalTerrainType = root(
  { path: "game/common/terrain" },
  {
    terrain,
  },
);

// const graphical_terrain = obj(
//   {},
//   {
//     type: typeRef({}, "terrain"),
//     color: array({}, [int()]),
//     texture: int(),
//     spawn_city: bool({ cardinality: [0, 1] }, true),
//     perm_snow: bool({ cardinality: [0, 1] }, true),
//   },
// );
