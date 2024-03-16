const ai_strategy: Rule = {
  children: {
    allowed: {
      cardinality: [0, 1],
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    target_array: [
      { type: Value.UNQUOTED, cardinality: [0, 1] },
      { type: Value.UNQUOTED, cardinality: [0, 1] },
    ],
    targets: {
      cardinality: [0, "inf"],
      children: {
        scope: { type: Value.UNQUOTED, cardinality: ["~1", "inf"] },
      },
    },
    enable_reverse: {
      cardinality: [0, 1],
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    enable: {
      cardinality: [0, 1],
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    abort: {
      cardinality: [0, 1],
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    abort_when_not_enabled: { type: Value.BOOL, cardinality: [0, 1] },
    reversed: { type: Value.BOOL, cardinality: [0, 1] },
    provide: { context: Context.AI_STRATEGY_RULE, scope: Scope.COUNTRY },
  },
};

const ai_strategy_plan: Rule = {
  children: {
    name: { type: Value.UNQUOTED, cardinality: [0, 1] },
    desc: { type: Value.UNQUOTED, cardinality: [0, 1] },
    allowed: {
      cardinality: [0, 1],
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    enable: {
      cardinality: [0, 1],
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    abort: {
      cardinality: [0, 1],
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    ai_national_focuses: {
      cardinality: [0, "inf"],
      children: {
        focus: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
        shared_focus: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
      },
    },
    focus_factors: {
      cardinality: [0, "inf"],
      children: {
        focus: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
        shared_focus: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
      },
    },
    research: {
      cardinality: [0, 1],
      children: {
        enum: { type: Value.UNQUOTED, cardinality: ["~1", "inf"] },
      },
    },
    ideas: {
      cardinality: [0, "inf"],
      children: {
        enum: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
        value: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
      },
    },
    traits: {
      cardinality: [0, 1],
      children: {
        country_leader_trait: { type: Value.UNQUOTED, cardinality: ["~1", "inf"] },
      },
    },
    provide: { context: Context.AI_STRATEGY_RULE, scope: Scope.COUNTRY },
    weight: {
      cardinality: [0, 1],
      children: {
        enum: { type: Value.UNQUOTED, cardinality: [0, 1] },
        provide: { context: Context.MODIFIER_RULE, scope: Scope.COUNTRY },
      },
    },
  },
};

const alias: Rule = {
  children: {
    ai_strategy_rule: {
      cardinality: [0, "inf"],
      provide: { context: Context.AI_STRATEGY_RULE, scope: Scope.COUNTRY },
    },
  },
};

const types: Rule = {
  children: {
    type: [
      {
        cardinality: [0, "inf"],
        children: {
          path: { type: Value.UNQUOTED },
          path_strict: { type: Value.BOOL },
        },
      },
      {
        cardinality: [0, "inf"],
        children: {
          path: { type: Value.UNQUOTED },
        },
      },
    ],
  },
};