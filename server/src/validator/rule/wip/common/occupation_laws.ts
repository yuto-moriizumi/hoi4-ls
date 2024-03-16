const types: Rule = {
  children: {
    type: { 
      type: Value.UNQUOTED,
      children: {
        path: { type: Value.UNQUOTED },
      },
      provide: { context: Context.OCCUPATION_LAW, scope: Scope.FILES },
    },
  },
};

const occupation_law: Rule = {
  children: {
    tooltip: { type: Value.UNQUOTED, cardinality: [0, 1] },
    icon: [
      { type: Value.UNQUOTED, cardinality: [0, 1] },
      { type: Value.INT, cardinality: [0, 1] },
    ],
    sound_effect: { type: Value.UNQUOTED, cardinality: [0, 1] },
    visible: {
      cardinality: [0, 1],
      children: {
        provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
      },
    },
    available: {
      cardinality: [0, 1],
      children: {
        provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
      },
    },
    fallback_law: { type: Value.UNQUOTED, cardinality: [0, 1] },
    default_law: { type: Value.BOOL, cardinality: [0, 1] },
    starting_law: { type: Value.BOOL, cardinality: [0, 1] },
    main_fallback_law: { type: Value.BOOL, cardinality: [0, 1] },
    state_modifier: {
      cardinality: [0, 1],
      children: {
        provide: { context: Context.MODIFIER, scope: Scope.STATE },
      },
    },
    suppressed_state_modifier: {
      cardinality: [0, 1],
      children: {
        provide: { context: Context.MODIFIER, scope: Scope.STATE },
      },
    },
    gui_order: { type: Value.INT, cardinality: [0, 1] },
    ai_will_do: {
      cardinality: [0, 1],
      children: {
        base_factor: { type: Value.FLOAT, cardinality: [0, 1] },
        provide: { context: Context.MODIFIER_RULE, scope: Scope.COUNTRY },
      },
    },
  },
};