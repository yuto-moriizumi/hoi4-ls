const types: Rule = {
  children: {
    type: [
      {
        wargoal: {
          children: {
            path: { type: Value.UNQUOTED },
            skip_root_key: { type: Value.UNQUOTED },
          },
        },
      },
    ],
  },
};

const wargoal: Rule = {
  children: {
    war_name: { type: Value.UNQUOTED, cardinality: [0, 1] },
    allowed: {
      cardinality: [0, "inf"],
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    available: {
      cardinality: [0, "inf"],
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    take_states: {
      cardinality: [0, "inf"],
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY, replaceScope: { this: Scope.STATE, root: Scope.COUNTRY, prev: Scope.COUNTRY } },
    },
    puppet: {
      cardinality: [0, "inf"],
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    liberate: {
      cardinality: [0, "inf"],
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    generate_base_cost: { type: Value.UNQUOTED, cardinality: [0, 1] },
    generate_per_state_cost: { type: Value.UNQUOTED, cardinality: [0, 1] },
    take_states_limit: { type: Value.UNQUOTED, cardinality: [0, 1] },
    take_states_cost: { type: Value.UNQUOTED, cardinality: [0, 1] },
    puppet_cost: { type: Value.UNQUOTED, cardinality: [0, 1] },
    annex_threat_factor: { type: Value.UNQUOTED, cardinality: [0, 1] },
    annex_cost: { type: Value.UNQUOTED, cardinality: [0, 1] },
    force_government_cost: { type: Value.UNQUOTED, cardinality: [0, 1] },
    take_states_threat_factor: { type: Value.UNQUOTED, cardinality: [0, 1] },
    expire: { type: Value.UNQUOTED, cardinality: [0, 1] },
    threat: { type: Value.UNQUOTED, cardinality: [0, 1] },
  },
};