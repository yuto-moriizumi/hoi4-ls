const event: Rule = {
  children: {
    id: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
    title: [
      { type: Value.UNQUOTED, cardinality: [0, "inf"] },
      {
        cardinality: [0, "inf"],
        children: {
          trigger: {
            provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
          },
          text: { type: Value.UNQUOTED },
        },
      },
    ],
    picture: { type: Value.UNQUOTED, cardinality: [0, 1] },
    desc: [
      { type: Value.UNQUOTED, cardinality: [0, "inf"] },
      {
        cardinality: [0, "inf"],
        children: {
          trigger: {
            provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
          },
          text: { type: Value.UNQUOTED },
        },
      },
    ],
    hidden: { type: Value.BOOL, cardinality: [0, 1], defaultValue: false },
    major: { type: Value.BOOL, cardinality: [0, 1], defaultValue: false },
    fire_only_once: { type: Value.BOOL, cardinality: [0, 1], defaultValue: false },
    is_triggered_only: { type: Value.BOOL, cardinality: [0, 1], defaultValue: false },
    minor_flavor: { type: Value.BOOL, cardinality: [0, 1], defaultValue: false },
    timeout_days: { type: Value.INT, cardinality: [0, 1] },
    trigger: {
      cardinality: [0, 1],
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    show_major: {
      cardinality: [0, 1],
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    fire_for_sender: { type: Value.BOOL, cardinality: [0, 1] },
    mean_time_to_happen: {
      cardinality: [0, 1],
      children: {
        days: { type: Value.INT, cardinality: [0, 1] },
        months: { type: Value.INT, cardinality: [0, 1] },
        years: { type: Value.INT, cardinality: [0, 1] },
        modifier_rule: {
          cardinality: [0, "inf"],
          provide: { context: Context.MODIFIER_RULE, scope: Scope.COUNTRY },
        },
      },
    },
    immediate: {
      cardinality: [0, "inf"],
      provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
    },
    option: {
      cardinality: [0, "inf"],
      children: {
        name: { type: Value.UNQUOTED, cardinality: [0, 1] },
        trigger: {
          cardinality: [0, 1],
          provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
        },
        effect: {
          cardinality: [0, "inf"],
          provide: { context: Context.EFFECT, scope: Scope.COUNTRY },
        },
        ai_chance: {
          cardinality: [0, 1],
          children: {
            base: { type: Value.VARIABLE_FIELD, cardinality: [0, "inf"] },
            factor: { type: Value.VARIABLE_FIELD, cardinality: [0, "inf"] },
            modifier_rule: {
              cardinality: [0, "inf"],
              provide: { context: Context.MODIFIER_RULE, scope: Scope.COUNTRY },
            },
          },
        },
      },
    },
  },
};