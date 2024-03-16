const types: Rule = {
  children: {
    type: [
      {
        type: Value.UNQUOTED,
        children: {
          path: { type: Value.UNQUOTED },
        },
      },
      {
        type: Value.UNQUOTED,
        children: {
          path: { type: Value.UNQUOTED },
          skip_root_key: { type: Value.UNQUOTED },
        },
      },
    ],
  },
};

const intelligence_agency_upgrade: Rule = {
  children: {
    picture: { type: Value.UNQUOTED },
    frame: { type: Value.UNQUOTED, cardinality: [0, 1] },
    sound: { type: Value.UNQUOTED, cardinality: [0, 1] },
    ai_will_do: {
      cardinality: [0, 1],
      children: {
        base_factor: { type: Value.UNQUOTED, cardinality: [0, 1] },
        provide: { context: Context.MODIFIER_RULE, scope: Scope.COUNTRY },
      },
    },
    modifiers_during_progress: {
      cardinality: [0, 1],
      provide: { context: Context.MODIFIER, scope: Scope.COUNTRY },
    },
    available: {
      cardinality: [0, 1],
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    visible: {
      cardinality: [0, 1],
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    level: {
      cardinality: [1, "inf"],
      children: {
        modifier: {
          cardinality: [0, 1],
          provide: { context: Context.MODIFIER, scope: Scope.COUNTRY },
        },
        complete_effect: {
          cardinality: [0, 1],
          provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
        },
      },
    },
  },
};