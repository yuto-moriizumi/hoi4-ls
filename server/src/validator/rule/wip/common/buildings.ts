const types: Rule = {
  children: {
    type: [
      {
        provide: { context: Context.BUILDING, scope: Scope.GLOBAL },
        children: {
          path: { type: Value.UNQUOTED },
          skip_root_key: { type: Value.UNQUOTED },
          localisation: {
            children: {
              name: { type: Value.UNQUOTED, cardinality: [1, 1] },
              desc: { type: Value.UNQUOTED, cardinality: [1, 1] },
            },
          },
          subtype: [
            {
              provide: { context: Context.PROVINCIAL, scope: Scope.COUNTRY },
              children: {
                provincial: { type: Value.BOOL, defaultValue: true },
              },
            },
            {
              provide: { context: Context.STATE, scope: Scope.COUNTRY },
              children: {
                provincial: { type: Value.BOOL, defaultValue: false },
              },
            },
            { provide: { context: Context.STATE, scope: Scope.COUNTRY } },
          ],
        },
      },
    ],
  },
};

const building: Rule = {
  children: {
    base_cost: { type: Value.INT },
    base_cost_conversion: { type: Value.INT, cardinality: [0, 1] },
    per_level_extra_cost: { type: Value.INT, cardinality: [0, 1] },
    max_level: { type: Value.INT, cardinality: [0, 1] },
    value: { type: Value.INT, cardinality: [0, 1] },
    icon_frame: { type: Value.INT },
    show_on_map: { type: Value.INT, cardinality: [0, 1] },
    show_on_map_meshes: { type: Value.INT, cardinality: [0, 1] },
    always_shown: { type: Value.BOOL, cardinality: [0, 1] },
    has_destroyed_mesh: { type: Value.BOOL, cardinality: [0, 1] },
    allied_build: { type: Value.BOOL, cardinality: [0, 1] },
    centered: { type: Value.BOOL, cardinality: [0, 1] },
    supply_node: { type: Value.BOOL, cardinality: [0, 1] },
    shares_slots: { type: Value.BOOL, cardinality: [0, 1] },
    infrastructure_construction_effect: { type: Value.BOOL, cardinality: [0, 1] },
    provincial: { type: Value.BOOL, cardinality: [0, 1] },
    damage_factor: { type: Value.FLOAT, cardinality: [0, 1] },
    only_costal: { type: Value.BOOL, cardinality: [0, 1] },
    disabled_in_dmz: { type: Value.BOOL, cardinality: [0, 1] },
    infrastructure: { type: Value.BOOL, cardinality: [0, 1] },
    air_base: { type: Value.BOOL, cardinality: [0, 1] },
    is_port: { type: Value.BOOL, cardinality: [0, 1] },
    anti_air: { type: Value.BOOL, cardinality: [0, 1] },
    refinery: { type: Value.BOOL, defaultValue: true, cardinality: [0, 1] },
    radar: { type: Value.BOOL, cardinality: [0, 1] },
    nuclear_reactor: { type: Value.BOOL, cardinality: [0, 1] },
    military_production: { type: Value.FLOAT, cardinality: [0, 1] },
    general_production: { type: Value.FLOAT, cardinality: [0, 1] },
    naval_production: { type: Value.FLOAT, cardinality: [0, 1] },
    land_fort: { type: Value.INT, cardinality: [0, 1] },
    naval_fort: { type: Value.INT, cardinality: [0, 1] },
    rocket_production: { type: Value.INT, cardinality: [0, 1] },
    rocket_launch_capacity: { type: Value.INT, cardinality: [0, 1] },
    air_defence: { type: Value.INT, cardinality: [0, 1] },
    subtype: {
      provide: { context: Context.MODIFIER, scope: Scope.COUNTRY },
    },
    show_modifier: { type: Value.BOOL, defaultValue: true, cardinality: [0, 1] },
    max_fuel_building: { type: Value.FLOAT, cardinality: [0, 1] },
    fuel_silo: { type: Value.BOOL, defaultValue: true, cardinality: [0, 1] },
    fuel_gain_from_states: { type: Value.FLOAT, cardinality: [0, 1] },
  },
};