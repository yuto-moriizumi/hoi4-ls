import { modifier } from "../modifiers";
import { root, obj, typeDefKey, bool, int, float } from "../utils";

const building = obj(
  {},
  {
    base_cost: int(),
    base_cost_conversion: int({ cardinality: [0, 1] }),
    per_level_extra_cost: int({ cardinality: [0, 1] }),
    max_level: int({ cardinality: [0, 1] }),
    value: int({ cardinality: [0, 1] }),
    icon_frame: int(),
    show_on_map: int({ cardinality: [0, 1] }),
    show_on_map_meshes: int({ cardinality: [0, 1] }),
    always_shown: bool({ cardinality: [0, 1] }),
    has_destroyed_mesh: bool({ cardinality: [0, 1] }),
    allied_build: bool({ cardinality: [0, 1] }),
    centered: bool({ cardinality: [0, 1] }),
    supply_node: bool({ cardinality: [0, 1] }),
    shares_slots: bool({ cardinality: [0, 1] }),
    infrastructure_construction_effect: bool({ cardinality: [0, 1] }),
    provincial: bool({ cardinality: [0, 1] }),
    damage_factor: float({ cardinality: [0, 1] }),
    only_costal: bool({ cardinality: [0, 1] }),
    disabled_in_dmz: bool({ cardinality: [0, 1] }),
    infrastructure: bool({ cardinality: [0, 1] }),
    air_base: bool({ cardinality: [0, 1] }),
    is_port: bool({ cardinality: [0, 1] }),
    anti_air: bool({ cardinality: [0, 1] }),
    refinery: bool({ cardinality: [0, 1] }, true),
    radar: bool({ cardinality: [0, 1] }),
    nuclear_reactor: bool({ cardinality: [0, 1] }),
    military_production: float({ cardinality: [0, 1] }),
    general_production: float({ cardinality: [0, 1] }),
    naval_production: float({ cardinality: [0, 1] }),
    land_fort: int({ cardinality: [0, 1] }),
    naval_fort: int({ cardinality: [0, 1] }),
    rocket_production: int({ cardinality: [0, 1] }),
    rocket_launch_capacity: int({ cardinality: [0, 1] }),
    air_defence: int({ cardinality: [0, 1] }),
    subtype: obj(
      {},
      {
        ...modifier,
      },
    ),
    show_modifier: bool({ cardinality: [0, 1] }, true),
    max_fuel_building: float({ cardinality: [0, 1] }),
    fuel_silo: bool({ cardinality: [0, 1] }, true),
    fuel_gain_from_states: float({ cardinality: [0, 1] }),
  },
);

export const buildingType = root(
  { path: "/common/buildings" },
  {
    buildings: obj(
      {},
      {
        [typeDefKey("building")]: building,
      },
    ),
  },
);
