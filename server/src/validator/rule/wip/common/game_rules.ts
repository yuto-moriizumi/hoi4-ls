const types: Rule = {
  children: {
    type: {
      children: {
        path: { type: Value.UNQUOTED },
        path_strict: { type: Value.BOOL },
      },
      provide: { context: Context.GAME_RULE, scope: Scope.GLOBAL },
    },
  },
};

const game_rule: Rule = {
  children: {
    name: { type: Value.UNQUOTED },
    required_dlc: { type: Value.UNQUOTED, cardinality: [0, 1] },
    desc: { type: Value.UNQUOTED, cardinality: [0, 1] },
    group: { type: Value.UNQUOTED },
    icon: { type: Value.UNQUOTED, cardinality: [0, 1] },
    option: {
      type: Value.ARRAY,
      children: {
        name: { type: Value.UNQUOTED },
        text: { type: Value.UNQUOTED },
        desc: { type: Value.UNQUOTED },
        allow_achievements: { type: Value.BOOL, cardinality: [0, 1] },
        required_dlc: { type: Value.UNQUOTED, cardinality: [0, 1] },
      },
      cardinality: [0, "inf"],
    },
    default: {
      children: {
        name: { type: Value.UNQUOTED },
        text: { type: Value.UNQUOTED },
        desc: { type: Value.UNQUOTED },
        allow_achievements: { type: Value.BOOL, cardinality: [0, 1] },
        required_dlc: { type: Value.UNQUOTED, cardinality: [0, 1] },
      },
      cardinality: [0, 1],
    },
  },
};