const types: Rule = {
  children: {
    type: {
      provide: { context: Context.DIFFICULTY_SETTING, scope: Scope.GLOBAL },
      cardinality: [0, "inf"],
      path: { type: Value.UNQUOTED },
      skip_root_key: { type: Value.UNQUOTED },
    },
  },
};

const difficulty_setting: Rule = {
  children: {
    key: { type: Value.UNQUOTED },
    modifier: { type: Value.UNQUOTED },
    countries: {
      cardinality: [0, "inf"],
      children: {
        enum: { type: Value.UNQUOTED },
      },
    },
    multiplier: { type: Value.FLOAT },
  },
};