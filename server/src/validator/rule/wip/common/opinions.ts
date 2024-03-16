const types: Rule = {
  children: {
    type: {
      children: {
        path: { type: Value.UNQUOTED },
        skip_root_key: { type: Value.UNQUOTED },
      },
      provide: { context: Context.OPINION, scope: Scope.GAME },
    },
  },
};

const opinion: Rule = {
  children: {
    value: { type: Value.UNQUOTED },
    trade: { type: Value.BOOL, cardinality: [0, 1] },
    decay: { type: Value.UNQUOTED, cardinality: [0, 1] },
    min_trust: { type: Value.UNQUOTED, cardinality: [0, 1] },
    max_trust: { type: Value.UNQUOTED, cardinality: [0, 1] },
    target: { type: Value.BOOL, cardinality: [0, 1] },
    enum: {
      children: {
        days: { type: Value.UNQUOTED },
        months: { type: Value.UNQUOTED },
        years: { type: Value.UNQUOTED },
      },
      provide: { context: Context.OPINION_TIMER, scope: Scope.ENUM },
    },
  },
};

const enums: Rule = {
  children: {
    enum: {
      children: {
        days: { type: Value.UNQUOTED },
        months: { type: Value.UNQUOTED },
        years: { type: Value.UNQUOTED },
      },
      provide: { context: Context.OPINION_TIMER, scope: Scope.ENUM },
    },
  },
};