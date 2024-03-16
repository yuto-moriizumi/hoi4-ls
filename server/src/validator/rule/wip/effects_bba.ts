const rule: Rule = {
  children: {
    set_power_balance: {
      provide: { context: Context.EFFECT_SET_POWER_BALANCE, scope: Scope.COUNTRY },
      children: {
        id: { type: Value.UNQUOTED },
        set_default: { type: Value.BOOL, cardinality: [0, 1] },
        right_side: { type: Value.UNQUOTED, cardinality: [0, 1] },
        left_side: { type: Value.UNQUOTED, cardinality: [0, 1] },
        set_value: { type: Value.UNQUOTED, cardinality: [0, 1] },
      },
    },
    remove_power_balance: {
      provide: { context: Context.EFFECT_REMOVE_POWER_BALANCE, scope: Scope.COUNTRY },
      children: {
        id: { type: Value.UNQUOTED },
      },
    },
    add_power_balance_side: {
      provide: { context: Context.EFFECT_ADD_POWER_BALANCE_SIDE, scope: Scope.COUNTRY },
      children: {
        id: { type: Value.UNQUOTED },
        side: { type: Value.UNQUOTED },
      },
    },
    remove_power_balance_side: {
      provide: { context: Context.EFFECT_REMOVE_POWER_BALANCE_SIDE, scope: Scope.COUNTRY },
      children: {
        id: { type: Value.UNQUOTED },
        side: { type: Value.UNQUOTED },
      },
    },
    add_power_balance_value: {
      provide: { context: Context.EFFECT_ADD_POWER_BALANCE_VALUE, scope: Scope.COUNTRY },
      children: {
        id: { type: Value.UNQUOTED },
        value: { type: Value.UNQUOTED },
        tooltip_side: { type: Value.UNQUOTED, cardinality: [0, 1] },
      },
    },
    set_power_balance_gfx: {
      provide: { context: Context.EFFECT_SET_POWER_BALANCE_GFX, scope: Scope.COUNTRY },
      children: {
        id: { type: Value.UNQUOTED },
        side: { type: Value.UNQUOTED },
        gfx: { type: Value.UNQUOTED },
      },
    },
    add_power_balance_modifier: {
      provide: { context: Context.EFFECT_ADD_POWER_BALANCE_MODIFIER, scope: Scope.COUNTRY },
      children: {
        id: { type: Value.UNQUOTED },
        modifier: { type: Value.UNQUOTED },
      },
    },
    remove_power_balance_modifier: {
      provide: { context: Context.EFFECT_REMOVE_POWER_BALANCE_MODIFIER, scope: Scope.COUNTRY },
      children: {
        id: { type: Value.UNQUOTED },
        modifier: { type: Value.UNQUOTED },
      },
    },
    remove_all_power_balance_modifiers: {
      provide: { context: Context.EFFECT_REMOVE_ALL_POWER_BALANCE_MODIFIERS, scope: Scope.COUNTRY },
      children: {
        id: { type: Value.UNQUOTED },
      },
    },
    add_random_valid_trait_from_unit: {
      provide: { context: Context.EFFECT_ADD_RANDOM_VALID_TRAIT_FROM_UNIT, scope: Scope.UNIT },
      children: {
        character: [
          { type: Value.UNQUOTED },
          { type: Value.UNQUOTED },
          { type: Value.UNQUOTED },
          { type: Value.UNQUOTED },
          { type: Value.UNQUOTED },
          { type: Value.UNQUOTED },
        ],
      },
    },
    set_can_be_fired_in_advisor_role: {
      provide: { context: Context.EFFECT_SET_CAN_BE_FIRED_IN_ADVISOR_ROLE, scope: Scope.COUNTRY_CHARACTER },
      children: {
        character: [
          { type: Value.UNQUOTED, cardinality: [0, 1] },
          { type: Value.UNQUOTED, cardinality: [0, 1] },
          { type: Value.UNQUOTED, cardinality: [0, 1] },
          { type: Value.UNQUOTED, cardinality: [0, 1] },
          { type: Value.UNQUOTED, cardinality: [0, 1] },
          { type: Value.UNQUOTED, cardinality: [0, 1] },
        ],
        slot: { type: Value.UNQUOTED, cardinality: [0, 1] },
        value: { type: Value.BOOL, cardinality: [0, 1] },
      },
    },
    every_country_division: {
      provide: { context: Context.EFFECT_EVERY_COUNTRY_DIVISION, scope: Scope.COUNTRY_UNIT },
      children: {
        random_select_amount: { type: Value.UNQUOTED, cardinality: [0, 1] },
        display_individual_scopes: { type: Value.BOOL, cardinality: [0, 1] },
        limit: { provide: { context: Context.TRIGGER, scope: Scope.UNIT }, children: {} },
        tooltip: { type: Value.UNQUOTED, cardinality: [0, 1] },
      },
    },
    every_state_division: {
      provide: { context: Context.EFFECT_EVERY_STATE_DIVISION, scope: Scope.STATE_UNIT },
      children: {
        random_select_amount: { type: Value.UNQUOTED, cardinality: [0, 1] },
        display_individual_scopes: { type: Value.BOOL, cardinality: [0, 1] },
        limit: { provide: { context: Context.TRIGGER, scope: Scope.UNIT }, children: {} },
        tooltip: { type: Value.UNQUOTED, cardinality: [0, 1] },
      },
    },
    random_state_division: {
      provide: { context: Context.EFFECT_RANDOM_STATE_DIVISION, scope: Scope.STATE_UNIT },
      children: {
        limit: { provide: { context: Context.TRIGGER, scope: Scope.UNIT }, children: {} },
        tooltip: { type: Value.UNQUOTED, cardinality: [0, 1] },
      },
    },
    change_division_template: {
      provide: { context: Context.EFFECT_CHANGE_DIVISION_TEMPLATE, scope: Scope.UNIT },
      children: {
        division_template: { type: Value.UNQUOTED },
      },
    },
    set_unit_organization: {
      provide: { context: Context.EFFECT_SET_UNIT_ORGANIZATION, scope: Scope.UNIT },
      children: {},
    },
    remove_civil_war_target: [
      {
        provide: { context: Context.EFFECT_REMOVE_CIVIL_WAR_TARGET, scope: Scope.COUNTRY },
        children: {},
      },
      {
        provide: { context: Context.EFFECT_REMOVE_CIVIL_WAR_TARGET, scope: Scope.COUNTRY },
        children: {},
      }
    ],
  },
};