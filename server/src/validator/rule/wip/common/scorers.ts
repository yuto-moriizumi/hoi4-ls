const types: Rule = {
  children: {
    type: {
      cardinality: [0, Infinity],
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
          { type: Value.UNQUOTED, cardinality: [0, Infinity] },
          { type: Value.UNQUOTED, cardinality: [0, Infinity] },
        ],
        targets: {
          cardinality: [0, 1],
          children: {
            enum: [{ type: Value.UNQUOTED, cardinality: [0, Infinity] }],
            value: [{ type: Value.UNQUOTED, cardinality: [0, Infinity] }],
            variable_field: {
              type: Value.UNQUOTED,
              cardinality: [0, Infinity],
            },
            scope: { type: Value.UNQUOTED, cardinality: [0, Infinity] },
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
            enum: { type: Value.UNQUOTED, cardinality: [0, Infinity] },
            provide: { context: Context.MODIFIER_RULE, scope: Scope.COUNTRY },
          },
        },
      },
    },
  },
};
