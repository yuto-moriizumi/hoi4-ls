const types: Rule = {
  children: {
    type: {
      cardinality: [0, "inf"],
      children: {
        path: { type: Value.UNQUOTED },
      },
      provide: { context: Context.MTTH, scope: Scope.GAME },
    },
    mtth: {
      children: {
        enum: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
        modifier_rule: {
          provide: { context: Context.MODIFIER_RULE, scope: Scope.MTTH },
        },
      },
    },
  },
};