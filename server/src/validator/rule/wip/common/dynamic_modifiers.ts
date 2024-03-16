const types: Rule = {
  children: {
    type: {
      cardinality: [0, "inf"],
      provide: { context: Context.DYNAMIC_MODIFIER, scope: Scope.GAME },
      children: {
        path: { type: Value.UNQUOTED },
        path_strict: { type: Value.BOOL, defaultValue: true },
      },
    },
  },
};

const dynamic_modifier: Rule = {
  children: {
    icon: { type: Value.UNQUOTED, cardinality: [0, 1] },
    attacker_modifier: { type: Value.BOOL, cardinality: [0, 1], defaultValue: true },
    enable: {
      cardinality: [0, "inf"],
      provide: { context: Context.TRIGGER, scope: Scope.MODIFIER },
    },
    remove_trigger: {
      cardinality: [0, "inf"],
      provide: { context: Context.TRIGGER, scope: Scope.MODIFIER },
    },
    alias_keys_field: [
      { type: Value.UNQUOTED, cardinality: [0, "inf"] },
      { type: Value.UNQUOTED, cardinality: [0, "inf"] },
    ],
  },
};