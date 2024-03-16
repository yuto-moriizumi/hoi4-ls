const rules: Rule = {
  children: {
    has_power_balance: {
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    has_any_power_balance: {
      type: Value.BOOL,
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    has_power_balance_modifier: {
      children: {
        id: { type: Value.UNQUOTED },
        modifier: { type: Value.UNQUOTED },
      },
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    is_power_balance_in_range: {
      children: {
        id: { type: Value.UNQUOTED },
        range: { type: Value.UNQUOTED },
      },
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    power_balance_value: {
      children: {
        id: { type: Value.UNQUOTED },
        value: { type: Value.FLOAT, cardinality: [-1, 1] },
      },
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    power_balance_daily_change: {
      children: {
        id: { type: Value.UNQUOTED },
        value: { type: Value.FLOAT, cardinality: [-1, 1] },
      },
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    power_balance_weekly_change: {
      children: {
        id: { type: Value.UNQUOTED },
        value: { type: Value.FLOAT, cardinality: [-1, 1] },
      },
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    is_power_balance_side_active: {
      children: {
        id: { type: Value.UNQUOTED },
        side: { type: Value.UNQUOTED },
      },
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    division_has_majority_template: {
      provide: { context: Context.TRIGGER, scope: Scope.UNIT },
    },
    any_country_division: {
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY, pushScope: Scope.UNIT },
    },
    any_state_division: {
      provide: { context: Context.TRIGGER, scope: Scope.STATE, pushScope: Scope.UNIT },
    },
    division_has_battalion_in_template: {
      provide: { context: Context.TRIGGER, scope: Scope.UNIT },
    },
    num_divisions_in_states: {
      children: {
        count: { type: Value.INT },
        states: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
        types: { type: Value.UNQUOTED, cardinality: [0, 1] },
        exclude: { type: Value.UNQUOTED, cardinality: [0, 1] },
      },
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    num_battalions_in_states: {
      children: {
        count: { type: Value.INT },
        states: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
        types: { type: Value.UNQUOTED, cardinality: [0, 1] },
        exclude: { type: Value.UNQUOTED, cardinality: [0, 1] },
      },
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    has_war_with_major: {
      type: Value.BOOL,
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    has_railway_connection: {
      children: {
        start_state: { type: Value.UNQUOTED },
        target_state: { type: Value.UNQUOTED },
        start_province: { type: Value.ENUM, cardinality: [0, 1], enumScope: "provinces" },
        target_province: { type: Value.ENUM, cardinality: [0, 1], enumScope: "provinces" },
      },
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    pc_is_loser: {
      type: Value.BOOL,
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    pc_is_winner: {
      type: Value.BOOL,
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    has_war_with_wargoal_against: {
      children: {
        target: { type: Value.UNQUOTED, cardinality: [1, 3] },
        type: { type: Value.UNQUOTED, cardinality: [0, 1] },
      },
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    is_hired_as_advisor: {
      type: Value.BOOL,
      provide: { context: Context.TRIGGER, scope: Scope.CHARACTER },
    },
    has_completed_custom_achievement: {
      children: {
        mod: { type: Value.ENUM, enumScope: "mod_achievement_id" },
        achievement: { type: Value.UNQUOTED },
      },
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
  },
};