const types: Rule = {
  children: {
    type: {
      cardinality: ["0", "inf"],
      children: {
        path: { type: Value.UNQUOTED },
        path_file: { type: Value.UNQUOTED },
        subtype: {
          cardinality: ["0", "inf"],
          children: {
            attacker: {
              children: {
                is_attacker: { type: Value.BOOL, defaultValue: true },
              },
            },
            defender: {
              children: {
                is_attacker: { type: Value.BOOL, defaultValue: false },
              },
            },
          },
        },
      },
    },
  },
};

const combat_tactic: Rule = {
  children: {
    only_show_for: { type: Value.UNQUOTED, cardinality: [0, 1] },
    is_attacker: { type: Value.BOOL },
    trigger: {
      children: {
        is_attacker: { type: Value.BOOL },
        phase: { type: Value.UNQUOTED },
        provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
      },
    },
    active: { type: Value.BOOL, cardinality: [0, 1] },
    base: {
      cardinality: [0, 1],
      children: {
        enum_base_factor: { type: Value.FLOAT, cardinality: [0, 1] },
        provide: { context: Context.MODIFIER_RULE, scope: Scope.COUNTRY },
      },
    },
    picture: { type: Value.UNQUOTED },
    countered_by: { type: Value.UNQUOTED, cardinality: [0, 1] },
    phase: { type: Value.UNQUOTED, cardinality: [0, 1] },
    display_phase: { type: Value.UNQUOTED, cardinality: [0, 1] },
    enum_attack_defend: { type: Value.FLOAT, cardinality: [1, 2] },
    attacker_movement_speed: { type: Value.FLOAT, cardinality: [0, 1] },
    provide: { context: Context.UNIT_STAT, scope: Scope.COUNTRY },
  },
};

const enums: Rule = {
  children: {
    phases: {
      children: {
        no: { type: Value.UNQUOTED },
        close_combat: { type: Value.UNQUOTED },
        tactical_withdrawal: { type: Value.UNQUOTED },
        seize_bridge: { type: Value.UNQUOTED },
        hold_bridge: { type: Value.UNQUOTED },
        main: { type: Value.UNQUOTED },
        city_combat: { type: Value.UNQUOTED },
      },
    },
    attack_defend: {
      children: {
        attacker: { type: Value.UNQUOTED },
        defender: { type: Value.UNQUOTED },
      },
    },
  },
};