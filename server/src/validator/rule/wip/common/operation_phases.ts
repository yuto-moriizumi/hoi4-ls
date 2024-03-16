const operation_phase: Rule = {
  children: {
    name: { type: Value.UNQUOTED },
    desc: { type: Value.UNQUOTED },
    icon: { type: Value.UNQUOTED },
    picture: { type: Value.UNQUOTED },
    outcome: { type: Value.UNQUOTED, cardinality: [0, 1] },
    map_icon: { type: Value.UNQUOTED, cardinality: [0, 1] },
    outcome_extra: { type: Value.UNQUOTED, cardinality: [0, 1] },
    risk_extra: { type: Value.UNQUOTED, cardinality: [0, 1] },
    requirements: {
      cardinality: [0, "inf"],
      provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
    },
    return_on_complete: { type: Value.BOOL, cardinality: [0, 1], defaultValue: false },
    equipment: {
      cardinality: [0, 1],
      children: {
        equipment: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
        civilian_factories: [
          { type: Value.UNQUOTED, cardinality: [0, "inf"] },
          {
            children: {
              amount: { type: Value.UNQUOTED },
              days: { type: Value.UNQUOTED },
            },
            cardinality: [0, "inf"],
          },
        ],
      },
    },
  },
};

const types: Rule = {
  children: {
    type: {
      provide: { context: Context.OPERATION_PHASE, scope: Scope.GAME },
      cardinality: [0, "inf"],
    },
  },
};