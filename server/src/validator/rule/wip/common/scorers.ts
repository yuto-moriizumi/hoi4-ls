const types: Rule = {
  children: {
    type: {
      cardinality: [0, "inf"],
      context: Context.COUNTRY_SCORER,
      scope: Scope.COUNTRY,
      path: "game/common/scorers/country",
    },
  },
};

const country_scorer: Rule = {
  children: {
    targets: {
      cardinality: [0, 1],
      children: {
        targets_dynamic: { type: Value.BOOL, cardinality: [0, 1] },
        target_non_existing: { type: Value.BOOL, cardinality: [0, 1] },
        target_array: [
          { type: Value.UNQUOTED, cardinality: [0, "inf"] },
          { type: Value.UNQUOTED, cardinality: [0, "inf"] },
        ],
        targets: {
          cardinality: [0, 1],
          children: {
            enum: [{ type: Value.UNQUOTED, cardinality: [0, "inf"] }],
            value: [{ type: Value.UNQUOTED, cardinality: [0, "inf"] }],
            variable_field: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
            scope: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
          },
        },
        target_root_trigger: {
          cardinality: [0, 1],
          provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
        },
        target_trigger: {
          cardinality: [0, 1],
          provide: { context: Context.TRIGGER, scope: Scope.COUNTRY },
        },
        score: {
          cardinality: [0, 1],
          children: {
            enum: { type: Value.UNQUOTED, cardinality: [0, "inf"] },
            provide: { context: Context.MODIFIER_RULE, scope: Scope.COUNTRY },
          },
        },
      },
    },
  },
};