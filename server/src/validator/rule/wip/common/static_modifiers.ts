const types: Rule = {
  children: {
    type: {
      cardinality: [0, "inf"],
      children: {
        path: { type: Value.UNQUOTED },
        path_strict: { type: Value.BOOL, defaultValue: true },
        subtype: {
          cardinality: [0, "inf"],
          provide: { context: Context.RELATION_MODIFIER, scope: Scope.TYPE },
          children: {
            valid_relation_trigger: {},
          },
        },
      },
      provide: [
        { context: Context.MODIFIER, scope: Scope.TYPE },
        { context: Context.UNIT_STAT, scope: Scope.TYPE },
        { context: Context.AIR_STAT, scope: Scope.TYPE },
        { context: Context.NAVAL_STAT, scope: Scope.TYPE },
      ],
    },
  },
};