types: {
  children: {
    type: {
      children: {
        path: { type: Value.UNQUOTED },
        path_strict: { type: Value.BOOL, defaultValue: true },
        unique: { type: Value.BOOL, defaultValue: true },
      },
    },
  },
};

operation: {
  children: {
    icon: { type: Value.UNQUOTED },
    map_icon: { type: Value.UNQUOTED },
    name: { type: Value.UNQUOTED },
    desc: { type: Value.UNQUOTED },
    priority: { type: Value.UNQUOTED, cardinality: [0, 1] },
    days: { type: Value.UNQUOTED },
    danger_level: { type: Value.UNQUOTED, cardinality: [0, 1] },
    operatives: { type: Value.UNQUOTED },
    is_captured_cipher: { type: Value.BOOL, cardinality: [0, 1] },
    network_strength: { type: Value.UNQUOTED },
    prevent_captured_operative_to_die: { type: Value.BOOL, cardinality: [0, 1] },
    is_staged_coup: { type: Value.BOOL, defaultValue: true },
    cost_multiplier: { type: Value.UNQUOTED, cardinality: [0, 1] },
    experience: { type: Value.UNQUOTED, cardinality: [0, 1] },
    scale_cost_independent_of_target: { type: Value.BOOL, cardinality: [0, 1] },
    phases: {
      children: {
        "<operation_phase>": {
          cardinality: [1, "inf"],
          children: {
            enum: { type: Value.UNQUOTED, cardinality: [0, 1] },
            provide: { context: Context.MODIFIER_RULE, scope: Scope.COUNTRY },
          },
        },
      },
    },
    ai_will_do: {
      children: {
        enum: { type: Value.UNQUOTED, cardinality: [0, 1] },
        provide: { context: Context.MODIFIER_RULE, scope: Scope.COUNTRY },
      },
    },
    allowed: {
      cardinality: [0, 1],
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    available: {
      cardinality: [0, 1],
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    visible: {
      cardinality: [0, 1],
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    risk_chance: { type: Value.UNQUOTED, cardinality: [0, 1] },
    risk_modifiers: {
      children: {},
    },
    awarded_tokens: {
      children: {
        "<operation_token>": { cardinality: [1, "inf"] },
      },
    },
    cost_modifiers: {
      children: {},
    },
    operation_target: {
      children: {
        targets: {
          cardinality: [1, "inf"],
          children: {
            scope: { type: Value.UNQUOTED },
          },
        },
      },
    },
    selection_target: {
      children: {
        targets: {
          cardinality: [1, "inf"],
          children: {
            scope: { type: Value.UNQUOTED },
          },
        },
      },
    },
    selection_target_state: {
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    target_type: { type: Value.UNQUOTED, cardinality: [0, 1], defaultValue: "strategic_region" },
    equipment: {
      children: {
        "<equipment>": { type: Value.UNQUOTED },
        civilian_factories: {
          cardinality: [0, "inf"],
          children: {
            amount: { type: Value.UNQUOTED },
            days: { type: Value.UNQUOTED },
          },
        },
      },
    },
    required_tokens: {
      children: {
        "<operation_token>": { cardinality: [0, "inf"] },
      },
    },
    target_weight: {
      children: {
        enum: { type: Value.UNQUOTED, cardinality: [0, 1] },
        provide: { context: Context.MODIFIER_RULE, scope: Scope.COUNTRY },
      },
    },
    requirements: {
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    return_on_complete: { type: Value.BOOL, defaultValue: true },
    on_start: {
      provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
    },
    outcome_potential: {
      provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
    },
    outcome_extra_chance: { type: Value.UNQUOTED, cardinality: [0, 1] },
    outcome_modifiers: {
      children: {},
    },
    outcome_execute: {
      provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
    },
    outcome_extra_execute: {
      provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
    },
    will_lead_to_war_with: { type: Value.BOOL, cardinality: [0, 1] },
  },
};