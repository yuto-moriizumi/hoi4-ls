const types: Rule = {
  children: {
    type: {
      cardinality: [0, "inf"],
      children: {
        path: { type: Value.UNQUOTED },
        skip_root_key: { type: Value.UNQUOTED },
        path_file: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
        subtype: {
          cardinality: [0, "inf"],
          children: {
            movement_cost: { type: Value.UNQUOTED, cardinality: [0, 0] },
            is_water: { type: Value.BOOL, cardinality: [0, 1], defaultValue: false },
            naval_terrain: { type: Value.BOOL },
          },
        },
      },
    },
  },
};

const terrain: Rule = {
  children: {
    color: {
      cardinality: [3, 3],
      type: Value.UNQUOTED,
    },
    subtype: {
      cardinality: [0, "inf"],
      children: {
        movement_cost: { type: Value.UNQUOTED },
        sound_type: { type: Value.UNQUOTED },
        naval_terrain: { type: Value.BOOL, cardinality: [0, 1] },
        is_water: { type: Value.BOOL, cardinality: [0, 1] },
        units: {
          cardinality: [0, "inf"],
          children: {
            provide: [
              { context: Context.UNIT_STAT, scope: Scope.COUNTRY },
              { context: Context.NAVAL_STAT, scope: Scope.COUNTRY },
            ],
          },
        },
        enum: {
          type: Value.UNQUOTED,
          cardinality: [0, "inf"],
        },
        ai_terrain_importance_factor: { type: Value.UNQUOTED },
        match_value: { type: Value.UNQUOTED },
      },
    },
  },
};

const graphical_terrain: Rule = {
  children: {
    type: { type: Value.UNQUOTED },
    color: {
      type: Value.UNQUOTED,
      cardinality: [0, "inf"],
    },
    texture: { type: Value.UNQUOTED },
    spawn_city: { type: Value.BOOL, cardinality: [0, 1] },
    perm_snow: { type: Value.BOOL, cardinality: [0, 1] },
  },
};

const enums: Rule = {
  children: {
    enum: {
      cardinality: [0, "inf"],
      children: {
        combat_width: { type: Value.UNQUOTED },
        combat_support_width: { type: Value.UNQUOTED },
        supply_flow_penalty_factor: { type: Value.UNQUOTED },
        truck_attrition_factor: { type: Value.UNQUOTED },
        attrition: { type: Value.UNQUOTED },
        enemy_army_bonus_air_superiority_factor: { type: Value.UNQUOTED },
        sickness_chance: { type: Value.UNQUOTED },
      },
    },
  },
};