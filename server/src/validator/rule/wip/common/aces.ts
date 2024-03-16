const types: Rule = {
  children: {
    type: {
      children: {
        path: { type: Value.UNQUOTED },
        skip_root_key: { type: Value.UNQUOTED },
      },
      provide: { context: Context.ACE, scope: Scope.GAME },
    },
  },
};

const ace: Rule = {
  children: {
    type: [
      { type: Value.UNQUOTED },
      { type: Value.UNQUOTED, cardinality: [0, "inf"] },
    ],
    chance: { type: Value.UNQUOTED },
    effect: {
      provide: { context: Context.MODIFIER, scope: Scope.ACE },
    },
  },
};